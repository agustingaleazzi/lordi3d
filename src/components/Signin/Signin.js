import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './styles.scss';
import { signInWithGoogle, auth } from './../../firebase/utils';

import Button from '../Forms/Button/Button';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../Forms/FormInput/FormInput';


const initialState = {
    email: '',
    password: ''
}

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                ...initialState
            })
        } catch (err) {
            console.log(err)
        }
    }
    render() {
        const { email, password } = this.state;
        const configAuthWrapper = {
            headline: 'Iniciar sesión'
        };
        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="signin">
                    <div className="wrap">
                        <div className="formWrap">
                            <form onSubmit={this.handleSubmit}>
                                <FormInput
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Email"
                                    handleChange={this.handleChange}
                                />
                                <FormInput
                                    type="password"
                                    name="password"
                                    value={password}
                                    placeholder="Contraseña"
                                    handleChange={this.handleChange}
                                />
                                <Button type="submit">
                                    Entrar
                                </Button>
                                <div className="socialSignin">
                                    <div className="row">
                                        <Button onClick={signInWithGoogle}>
                                            Iniciar sesión con Google
                                        </Button>
                                    </div>
                                </div>
                                <div className="links">
                                    <Link to="/recovery">
                                        Resetear contraseña
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AuthWrapper>
        )
    }
}

export default Signin;