import {Game, UserManager, RoomManager, ClientMessageFactory} from "nodito";
import {TatetiPlayer} from "./TatetiPlayer";
import {TatetiRoom} from "./TatetiRoom";
import {PPTRoom} from "./PPTRoom";
import {PPTPlayer} from "./PPTPlayer";
import * as express from "express";
import * as crypto from "crypto";
import * as  session  from "express-session";

const app = express();
const faye = require('faye');
const portServer = 3001;

app.use(session({
    secret: 'session secret demo',
    name: 'demo-nodito',
    resave: true,
    saveUninitialized: true,
}));

const server = app.listen(portServer, () => {
    console.log(`Server running in port ${portServer}!!`);
});

const bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});
bayeux.attach(server);

// nodito configuration
const sentToClient = (id, msg) => {
    bayeux.getClient().publish('/' + game.signToken(id), msg);
};
const userManager = new UserManager(sentToClient);
const roomsManager = new RoomManager((
    {
        "tateti": TatetiRoom,
        "ppt": PPTRoom,
    }),
    ({
        "tateti": TatetiPlayer,
        "ppt": PPTPlayer,
    })
);
const factory = new ClientMessageFactory();
const game = new Game(userManager, roomsManager, factory, "xxx");

app.post('/create', (req, res) => {
    let data = req.session;
    if (!data.clientId) {
        data.clientId = crypto.randomBytes(3 * 4).toString("base64");
    }
    const player = game.findOrCreate(data.clientId);
    return res.json({clientId: data.clientId, token: player.getToken(), name: player.getName()});
});

bayeux.addExtension({
    incoming: (message, callback) => {
        if (message.channel.indexOf('/toServer_') === 0) {
            game.exec(message.data)
        }
        callback(message);
    },
});
