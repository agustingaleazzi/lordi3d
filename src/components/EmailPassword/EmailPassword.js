import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import { auth } from './../../firebase/utils';

import Button from '../Forms/Button/Button';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../Forms/FormInput/FormInput';


const initialState = {
    email: '',
    errors: []
};

class EmailPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...initialState
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { email } = this.state;
            const config = {
                //CAMBIAR LUEGO
                url: 'http://localhost:3000/login'
            };
            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    this.props.history.push('/login');
                })
                .catch(() => {
                    const err = ['Email no encontrado, por favor intente nuevamente.'];
                    this.setState({
                        errors: err
                    });
                });
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        const { email, errors } = this.state;
        const configAuthWrapper = {
            headline: 'Email Password'
        };
        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) => {
                                return (
                                    <li key={index}>
                                        {err}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    <form onSubmit={this.handleSubmit}>
                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}
                        />
                        <Button type="submit">
                            Email Password
                        </Button>
                    </form>
                </div>

            </AuthWrapper>
        );
    }
}
//gives access to the history stored in react router
export default withRouter(EmailPassword);