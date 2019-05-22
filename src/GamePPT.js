import React, {Component} from 'react';
import './css/App.css';
import PlayerTurn from "./PlayerTurn";
import './css/PiedraPapelTijera.css';


const chooses = {
    0: 'piedra',
    1: 'papel',
    2: 'tijera',
};

class GamePPT extends Component {

    img(choose) {
        return <img src={'/img/' + chooses[choose] + '.png'} alt={chooses[choose]}/>
    }

    renderPlayed(pptStatus) {
        if (!pptStatus) {
            return null;
        }
        const last = pptStatus[pptStatus.length - 1];
        if (!last) {
            return null;
        }
        return (
            <div className={'played row'}>
                <div className="column me">
                    <div className="hand">
                        {this.img(last.me)}
                    </div>
                </div>
                <div className="column">
                    vs

                    {last.win === 'me' ?
                        <span className="result win">Ganaste</span> :
                        last.win === 'op' ?
                            <span className="result lose">Perdiste</span> :
                            last.win === 'tie' ?
                                <span className="result tie">Empate</span> : ''
                    }


                </div>
                <div className="column op">
                    <div className="hand">
                        {last.op !== null ? this.img(last.op) : '?'}
                    </div>
                </div>
            </div>
        )
    }

    renderStatus(pptStatus) {
        if (!pptStatus || !pptStatus.length) {
            return null;
        }
        return (<div className="ppt-score">
            <table>
                <caption>Gana el mejor de 3!</caption>
                <tbody>
                <tr className="material-primary text-white">
                    <th>Mano</th>
                    <th>Vos</th>
                    <th>Oponente</th>
                </tr>
                {pptStatus.map((x, idx) => (
                    <tr key={idx} className={"game-"+x.win}>
                        <th>{idx + 1}</th>
                        <td className="me">{this.img(x.me)}</td>
                        <td className="op">{x.op !== null ? this.img(x.op) : ''} </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>)
    }

    renderQuestions(questions, answer) {
        if (questions.length === 0) {
            return null;
        }
        return (
            <ul className={'questions'}>
                {questions.map((q, x) => (
                    <li key={chooses[q.choose]} onClick={answer(q)} className="hand hand-selectable">
                        {this.img(q.choose)}
                    </li>
                ))}
            </ul>
        )
    }

    render() {
        const {questions, player, opponent, answer, pptStatus} = this.props;
        return (
            <div className={'ppt'}>
                <div className={'ppt-board'}>
                    <PlayerTurn player={opponent}/>
                    {questions.length > 0 ? this.renderQuestions(questions, answer) : this.renderPlayed(pptStatus)}
                    <PlayerTurn player={player}/>
                </div>
                {this.renderStatus(pptStatus)}
            </div>
        );
    }
}

export default GamePPT;
