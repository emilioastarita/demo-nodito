
export const nameModalNameChange = (x) => {
    return (ev) => {
        const val = ev.target.value;
        x.setState(({modalName}) => ({
            modalName: {
                ...modalName,
                name: val,
            }
        }));
    };
};

export const nameModalNameOpen = (x) => {
    return () => {
        x.setState(({modalName}) => ({
            modalName: {
                ...modalName,
                open: true,
            }
        }));
    };
};

export const nameModalNameClose = (x) => {
    return () => {
        x.setState(({modalName}) => ({
            modalName: {
                ...modalName,
                open: false,
            }
        }));
    };
};

export const nameModalNameSave = (x, client) => {
    return (ev) => {
        if (ev) {
            ev.preventDefault();
        }
        client.send({type: "info", name: x.state.modalName.name});
        nameModalNameClose(x)();
    };
};

