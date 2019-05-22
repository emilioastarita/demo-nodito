export const enterRoom = (x, client) => {
    return (r) => {
        console.log('r', r);
        client.send({type: "joinRoom", roomId: r.id});
    };
};

