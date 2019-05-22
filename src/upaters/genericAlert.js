
export const genericAlertOpen = (x) => {
    return (message, onClose = () => {}) => {
        x.setState(({genericAlert}) => ({
            genericAlert: {
                ...genericAlert,
                ...message,
                open: true,
                onClose
            }
        }));
    };
};

export const genericAlertClose = (x) => {
    return () => {
        if (x.state.genericAlert.onClose) {
            x.state.genericAlert.onClose();
        }
        x.setState(({genericAlert}) => ({
            genericAlert: {
                ...genericAlert,
                open: false,
                onClose: null,
            }
        }));
    };
};



