export const sendChat = (x, client) => {
    return (ev) => {
        ev.preventDefault();
        x.setState(({chatMessage}) => ({
            chatMessage: '',
        }));
        client.send({type: "chat", message: x.state.chatMessage});
    };
};

export const chatMessageChange = (x) => {
    return (ev) => {
        const val = ev.target.value;
        x.setState(({chatMessage}) => ({
            chatMessage: val,
        }));
    };
};