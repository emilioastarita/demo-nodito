import React, {Component} from 'react';
import './css/App.css';
import {client} from "./FayeClient";
import {execMessage} from "./execMessage";
import Players from "./Players";
import ModalName from "./ModalName";
import {nameModalNameChange, nameModalNameClose, nameModalNameOpen, nameModalNameSave} from "./upaters/modalName";
import {createRoomGameTypeChange, createRoomClose, createRoomSave, createRoomOpen} from "./upaters/modalCreateRoom";
import ModalCreateRoom from "./ModalCreateRoom";
import Rooms from "./Rooms";
import {enterRoom} from "./upaters/room";
import ModalGenericAlert from "./ModalGenericAlert";
import {genericAlertClose, genericAlertOpen} from "./upaters/genericAlert";
import GameTateti from "./GameTateti";
import Button from "./Button";
import Chat from "./Chat";
import {chatMessageChange, sendChat} from "./upaters/chat";
import GamePPT from "./GamePPT";
window.client = client;
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            player: {
                id: null,
                name: null,
            },
            players: [],
            rooms: [],
            modalName: {
                name: '',
                open: false,
            },
            modalCreateRoom: {
                gameType: 'tateti',
                gameTypes: [['tateti', 'Tateti'], ['ppt', 'Piedra Papel y Tijera']],
                open: false,
            },
            genericAlert: {
                title: '',
                description: '',
                open: false,
                onClose: null,
            },
            board: [],
            pptStatus: [],
            questions: [],
            chat: [],
            chatMessage: '',
        };
        this.answer = this.answer.bind(this);
    }

    componentDidMount() {
        const onError = (err) => {
            genericAlertOpen(this)({
                title: 'No pudimos conectar al servidor',
                message: err.toString(),
            },() => { window.location.reload();});
        };
        client.configure(execMessage(this), onError).then(() => {
            client.send({type: "ping"});
            client.send({type: "info"});
            client.send({type: "status"});
            setInterval(() => {
                client.send({type: "ping"});
            }, 10 * 1000)
        }).catch(onError);
    }

    answer(q) {
        return (ev) => {
            ev.preventDefault();
            this.setState({questions: []});
            client.send({type: "playGame", answer: q});
        }
    }

    render() {
        const {state} = this;
        return (
            <React.Fragment>
                <div className="App">
                    <header className="material-primary row">
                        <div className="column">
                            <h1 className="topbar">
                                <a href="/">Nodito Juegos</a>
                            </h1>
                        </div>
                        <div className="column">
                            {!state.isPlaying ? <Button className={'big secondary'} onClick={createRoomOpen(this)} >Crear Sala</Button> : null }
                        </div>
                    </header>


                    {state.isPlaying ? this.renderGame() : this.renderLobby()}

                    <ModalName close={nameModalNameClose(this)}
                               change={nameModalNameChange(this)}
                               save={nameModalNameSave(this, client)}
                               modalName={state.modalName}/>

                    <ModalCreateRoom close={createRoomClose(this)}
                                     change={createRoomGameTypeChange(this)}
                                     save={createRoomSave(this, client)}
                                     createRoom={state.modalCreateRoom}/>

                    <ModalGenericAlert close={genericAlertClose(this)}
                                       alert={state.genericAlert}
                    />
                </div>
                <footer>
                    <p>
                        Demo de la implementación de juegos por turnos utilizando <a target="_blank" rel="noopener noreferrer" href="https://github.com/emilioastarita/nodito">nodito</a>.
                    </p>
                    <p>
                        Código fuente de la demo <a target="_blank" rel="noopener noreferrer" href="https://github.com/emilioastarita/demo-nodito">demo-nodito</a>.
                    </p>
                    <p>Realizado por Emilio Astarita y Oski Scotto.</p>
                </footer>
            </React.Fragment>
        );
    }

    renderLobby() {
        const {state} = this;
        return (<main className={"row"}>
            <div className=" column playersContainer">
                <div className={'row'}>
                    <div className={'column players'}>
                        <div className="player-info material-secondary">
                            <h3>
                                Sos {state.player.name} <button className="small primary" href="#change" onClick={nameModalNameOpen(this)}>Cambiar</button>
                            </h3>
                        </div>

                        <Players players={state.players}/>
                    </div>
                    <div className={'column'}>
                        <Chat chat={state.chat}
                              chatMessage={state.chatMessage}
                              send={sendChat(this, client)}
                              change={chatMessageChange(this)} />
                    </div>
                </div>
            </div>

            <div className="column roomsContainer">
                <Rooms rooms={state.rooms} player={state.player} enter={enterRoom(this, client)}/>
            </div>

        </main>)
    }

    renderGame() {
        const {state} = this;

        if (state.game === 'tateti') {
            return (
                <main>
                    <GameTateti answer={this.answer}
                                questions={state.questions}
                                board={state.board}
                                player={state.player}
                                opponent={state.opponent}
                    />
                </main>
            )
        } else {
            return (
                <main>
                    <GamePPT answer={this.answer}
                             questions={state.questions}
                             pptStatus={state.pptStatus}
                             player={state.player}
                             opponent={state.opponent}
                    />
                </main>
            )
        }


    }


}

export default App;
