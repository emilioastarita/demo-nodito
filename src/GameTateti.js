import React, {Component} from 'react';
import './css/App.css';
import PlayerTurn from "./PlayerTurn";
import './css/Tateti.css';
class GameTateti extends Component {

    renderCell(cell, x, y) {
        const {answer, questions} = this.props;
        const k = [x, y].join('_');
        const q = questions
            .find(q => q.cmd === "move" && q.x === x && q.y === y);
        if (q) {
            return (
                <td key={k} className="square click" onClick={answer(q)}>

                </td>
            )
        } else if (cell === 2) {
            return (
                <td key={k} className="square empty">

                </td>
            )
        } else {
            return (
                <td key={k} className={'square square' + ((cell === 0) ? 'X' : 'O')}>
                    <span>{(cell === 0) ? 'X' : 'O'}</span>
                </td>
            )
        }
    }

    render() {
        const {board, player, opponent} = this.props;
        return (
            <div className={'tateti'}>
                <PlayerTurn player={opponent} />
                <table>
                    <tbody>
                    {board.map((row, x) => (<tr key={x}>
                        {row.map((cell, y) => (this.renderCell(cell, x, y)))}
                    </tr>))}
                    </tbody>
                </table>
                <PlayerTurn player={player} />
            </div>
        );
    }
}

export default GameTateti;
