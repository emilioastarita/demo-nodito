import Faye from 'faye';

class Client {
    clientId = '';
    token = '';
    faye = null;
    subscription = null;

    constructor() {
        this.faye = new Faye.Client('/faye');
    }

    async configure(callback, onError) {
        const response = await fetch('/create', {method: 'POST'});
        if (response.status !== 200) {
            throw new Error('Failed to create client on server');
        }
        const res = await response.json();
        this.clientId = res.clientId;
        this.token = res.token;
        this.subscription = await this.faye.subscribe('/' + this.token, message => {
            callback(message);
        });
        this.faye.on('transport:down', () => onError('Connection down'));
    }

    send(msg) {
        msg.token = this.token;
        msg.clientId = this.clientId;
        this.faye.publish('/toServer_' + this.clientId, msg);
    }
}


export const client = new Client();