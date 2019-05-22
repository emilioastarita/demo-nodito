
export const createRoomGameTypeChange = (x) => {
    return (ev) => {
        const val = ev.target.value;
        x.setState(({modalCreateRoom}) => ({
            modalCreateRoom: {
                ...modalCreateRoom,
                gameType: val,
            }
        }));
    };
};

export const createRoomOpen = (x) => {
    return () => {
        x.setState(({modalCreateRoom}) => ({
            modalCreateRoom: {
                ...modalCreateRoom,
                open: true,
            }
        }));
    };
};

export const createRoomClose = (x) => {
    return () => {
        x.setState(({modalCreateRoom}) => ({
            modalCreateRoom: {
                ...modalCreateRoom,
                open: false,
            }
        }));
    };
};

export const createRoomSave = (x, client) => {
    return (ev) => {
        ev.preventDefault();
        client.send({type: "createRoom", gameType: x.state.modalCreateRoom.gameType, maxPlayers: 2});
        createRoomClose(x)();
    };
};

