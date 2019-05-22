import React, {Component} from 'react';
import './css/App.css';
import Dialog from "./Dialog";
import Button from "./Button";
import Input from "./Input";

class CreateRoom extends Component {

    render() {
        const {close, save, change} = this.props;
        const {gameTypes, gameType, open} = this.props.createRoom;
        return (
            <Dialog open={open} onClose={close}>
                <div>
                    <h1 className="dialog-title">¡Crea una sala!</h1>
                    <div>
                        <form onSubmit={save}>
                            {gameTypes.map(([type, name]) => (
                                <label key={type}>
                                    <Input onChange={change} type="radio" value={type} name="gameType" checked={gameType === type} />
                                    {name}
                                </label>
                            ))}
                            <div className="actions">
                                <Button className={'cancel'} type="button" onClick={close}>Cancelar</Button>
                                <Button className={'primary'} type="submit" onClick={save}>Crear Sala</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default CreateRoom;
