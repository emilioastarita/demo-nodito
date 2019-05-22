import React, {Component} from 'react';
import './css/Button.css';

class Button extends Component {

    render() {
        const {children, ...other} = this.props;
        return (
            <button {...other}>{children}</button>
        );
    }
}

export default Button;
