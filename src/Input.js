import React, {Component} from 'react';
import './css/Input.css';

class Input extends Component {

    render() {
        const {children, ...other} = this.props;
        return (
            <input {...other}>{children}</input>
        );
    }
}

export default Input;
