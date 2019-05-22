import React, {Component} from 'react';
import './css/App.css';
import Dialog from "./Dialog";
import Button from "./Button";
import Input from "./Input";


class ModalName extends Component {

    render() {
        const {open, name} = this.props.modalName;
        const {close, save, change} = this.props;
        return (
                <Dialog open={open} onClose={close}>
                    <div>
                        <h1 className="dialog-title">¡Tu Nombre para Jugar!</h1>
                        <div>
                            <form onSubmit={save}>
                                <Input autoFocus={true}
                                       type="text" value={name}
                                       onChange={change} />

                                <div className="actions">
                                    <Button className={'cancel'} type="button" onClick={close}>Cancelar</Button>
                                    <Button className={'primary'} type="submit">Guardar</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Dialog>
        );
    }
}

export default ModalName;
