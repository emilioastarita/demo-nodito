import {nameModalNameOpen} from "./upaters/modalName";
import {genericAlertOpen} from "./upaters/genericAlert";

export const execMessage = (x) => {
    return (msg) => {
        if (exec[msg.type]) {
            exec[msg.type](msg, x);
        } else {
            console.warn('Message not implemented', msg);
        }
    }
};

const exec = {
    _timerTurn: {},
    _cleanTimer(name) {
        if (this._timerTurn[name]) {
            clearInterval(this._timerTurn[name]);
        }
    },
    updateState(msg, x) {
        const change = (state, props) => (msg.data);
        x.setState(change)
    },

    playStatus(msg, x) {
        this.updateState(msg, x);
        this.turn(msg.data, x);
    },

    rooms(msg, x) {
        const change = (state, props) => ({
            rooms: msg.rooms
        });
        x.setState(change);
    },

    chat(msg, x) {
        const change = (state, props) => ({
            chat: state.chat.concat([msg]).slice(-50)
        });
        x.setState(change);
    },

    players(msg, x) {
        const change = (state, props) => ({
            players: msg.players
        });
        x.setState(change)
    },

    turn(data, x) {
        const turns = ['player', 'opponent'];
        turns.forEach((name) => {
            const turn = data[name].turn;
            this._cleanTimer(name);
            if (!turn.turn) {
                return;
            }
            let seconds = turn.seconds - 1;
            this._timerTurn[name] = setInterval(() => {
                x.setState((state, props) => ({
                    [name]: {
                        ...state[name],
                        turn: {
                            ...turn,
                            seconds: seconds--
                        }
                    }
                }));
                if (seconds < 0) {
                    this._cleanTimer(name);
                }
            }, 1000);
        });

    },

    pong(msg) {
    },

    startGame(msg, x) {
        x.setState({isPlaying: true});
    },

    info(msg, x) {
        if (!msg.info.name) {
            nameModalNameOpen(x)();
        } else {
            x.setState(({modalName, player}) => ({
                isPlaying: msg.info.isPlaying,
                player: {
                    ...player,
                    id: msg.info.id,
                    name: msg.info.name
                },
                modalName: {
                    ...modalName,
                    name: msg.info.name,
                }
            }));
        }
    },

    genericAlert(msg, x) {
        genericAlertOpen(x)(msg);
    },

    winGame(msg, x) {
        this._cleanTimer();
        const onClose = () => {
            x.setState({isPlaying: false});
        };
        genericAlertOpen(x)({message: "Ganaste el partido :)"}, onClose);
    },

    tieGame(msg, x) {
        this._cleanTimer();
        const onClose = () => {
            x.setState({isPlaying: false});
        };
        genericAlertOpen(x)({message: "Empataron :|"}, onClose);
    },

    loseGame(msg, x) {
        this._cleanTimer();
        const onClose = () => {
            x.setState({isPlaying: false});
        };
        genericAlertOpen(x)({message: "Perdiste el partido :("}, onClose);
    },

    abandonGame(msg, x) {
        this._cleanTimer();
        const onClose = () => {
            x.setState({isPlaying: false});
        };
        if (msg.you) {
            genericAlertOpen(x)({message: "Abandonaste el partido! :("}, onClose);
        } else {
            genericAlertOpen(x)({message: msg.who.name + " abondonó el partido!"}, onClose);
        }
    }

};