import React, {Component} from 'react';
import './css/App.css';
import Dialog from "./Dialog";
import Button from "./Button";

class ModalGenericAlert extends Component {

    render() {
        return (
            <Dialog open={this.props.alert.open} onClose={this.props.alert.close}>
                <div>
                    <h2 className="dialog-title">{this.props.alert.title ? this.props.alert.title : '¡Atención!'}</h2>
                    <div>
                            {this.props.alert.message}
                            <div className="actions">
                                <Button type="button" onClick={this.props.close}>Cerrar</Button>
                            </div>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default ModalGenericAlert;
