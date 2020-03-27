import React, { Component } from 'react';
import { ReCaptcha } from 'react-recaptcha-google';
import '../components/input.css';

class Input extends Component {

    componentDidMount() {
        if (this.captchaDemo) {
            console.log("started, just a second...")
            this.captchaDemo.reset();
        }
    }

    onLoadReCaptcha() {
        if (this.captchaDemo) {
            this.captchaDemo.reset();
        }
    }

    verifyCallback(recaptchaToken) {
        // Here you will get the final recaptchaToken!!!  
        const buttonDisable = document.querySelector('.buttonEnable')
        recaptchaToken ? buttonDisable.disabled = false : buttonDisable.disabled = true;
    }

    validateInput(event) {
        const fieldMessage = document.querySelector('.fieldError');        
        /[^a-zA-Z ]+/g.test(event.value) ? fieldMessage.hidden = false : fieldMessage.hidden = true;
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
                <ReCaptcha
                    render="explicit"
                    sitekey="6LcOZOQUAAAAABM1BWGqno2TX-8lGvMlBSI_mnR8"
                    onloadCallback={this.onLoadRecaptcha}
                    verifyCallback={this.verifyCallback}
                />
            </div>
    )}
}

Input.displayName = 'Input';

export default Input;