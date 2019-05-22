import React, {Component} from 'react';
import Input from "./Input";
import './css/Chat.css';

class Chat extends Component {

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        if (this.messagesEnd) {
            this.messagesEnd.scrollIntoView({block: "end"});
        }
    }

    render() {
        const {send, change, chatMessage} = this.props;
        return (
            <div className="chat">
                <ul>
                    {this.props.chat.map(p => (
                        <li key={p.timestamp}>
                            <span className="name">{p.who.name}</span>
                            <span className="message">{p.message}</span>
                        </li>
                    ))}
                    <li ref={(el) => { this.messagesEnd = el;}}></li>
                </ul>
                <form onSubmit={send}>
                    <Input placeholder="Saluda a la gente!" type={"text"} onChange={change} value={chatMessage}/>
                </form>
            </div>
        );
    }
}

export default Chat;
