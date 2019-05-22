import React, {Component} from 'react';
import './css/Players.css';
class Players extends Component {

    render() {

        return (
            <div className="players-list">
                <ul>
                    {this.props.players.filter(x => x.name).map(p => (
                        <li key={p.id}>
                            <span>{p.name}</span>
                        </li>

                    ))}
                </ul>
            </div>
        );
    }
}

export default Players;
