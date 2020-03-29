import React, { Component } from 'react';
import Recaptcha from 'react-google-recaptcha';
import '../components/input.css';

class Input extends Component {

    componentDidMount() {
        this.captchaDemo ? this.captchaDemo.reset() : this.captchaDemo = false;
    }

    verifyCallback = recaptchaToken => {
        // Here you will get the final recaptchaToken!!!  
        const buttonDisable = document.querySelector('.buttonEnable');
        recaptchaToken ? buttonDisable.disabled = false : buttonDisable.disabled = true;
        console.log(recaptchaToken,'<--- token');
    }

    validateInput = event => {
        const fieldMessage = document.querySelector('.fieldError');        
        /[^a-zA-Z ]+/g.test(event.value) ? fieldMessage.hidden = false : fieldMessage.hidden = true;
    }

    onResetReCaptcha = () => {
        const buttonDisable = document.querySelector('.buttonEnable');
        buttonDisable.disabled = true;
        console.log("Captcha expirado");
        return this.recaptcha.reset();
    }

    render() {
        return( 
            <div className="inputContent">
                <div className="form-group">
                    <input className="form-control upperCase" type="text" placeholder='Write here...' onKeyPress={(e) => {e.target.value.toUpperCase()}}/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" placeholder='Write here...' onChange={(e) => {this.validateInput(e.target)}}/>
                    <small className="fieldError" hidden>Introduzca solo letras (A-Z)</small>
                </div>
                <button type="submit" className="btn btn-dark buttonEnable" disabled>Aceptar</button>
                <Recaptcha
                    ref={e => this.recaptcha = e}
                    render="explicit"
                    sitekey="6LcOZOQUAAAAABM1BWGqno2TX-8lGvMlBSI_mnR8"
                    onChange={this.verifyCallback}
                    onExpired={this.onResetReCaptcha}
                />
            </div>
    )}
}

Input.displayName = 'Input';

export default Input;