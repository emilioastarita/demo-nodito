import React, {Component} from 'react';
import './css/Dialog.css';

class Dialog extends Component {
    render() {
        const {children, open, onClose} = this.props;
        if (!open) {
            return null;
        }
        return (
                <div className="dialog">
                    <div className="dialog-content">
                        {children}
                    </div>
                    <div className="dialog-mask" onClick={onClose}></div>
                </div>
        );
    }
}

export default Dialog;
