import React, {Component} from 'react';
import './css/App.css';

class PlayerTurn extends Component {

    isInTurn(player) {
        return player.turn && player.turn.turn;
    }

    render() {
        const {player} = this.props;
        if (!player) {
            return null;
        }
        return (
            <div className={this.isInTurn(player) ? 'player-turn material-secondary' : 'player-turn material-disabled'}>
                <h4>{player.name}</h4>
                { this.isInTurn(player) ? <h5>Tiempo: {player.turn.seconds}</h5> : '' }
            </div>
        );
    }
}

export default PlayerTurn;
