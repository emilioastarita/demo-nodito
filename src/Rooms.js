import React, {Component} from 'react';
import Button from "./Button";
import './css/Rooms.css';

class Rooms extends Component {

    render() {
        return (
            <div className="Rooms">
                <ul>
                    {this.props.rooms.map(r =>
                        <li key={r.id} className="material-secondary">
                            <h5>
                                {
                                    r.owner.id !== this.props.player.id ?
                                    'Sala de ' + r.owner.name :
                                    'Tu sala'
                                }
                            </h5>
                            <h6>
                                <span>{r.type}</span>
                                &nbsp;
                                <span className="count">{r.count}/{r.total}</span>
                            </h6>


                            {(r.owner.id !== this.props.player.id && r.isPlaying === false) ?
                                <Button variant="contained"
                                        className={'primary small'}
                                        onClick={() => {this.props.enter(r)}}
                                >Entrar!</Button> : null}


                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Rooms;
