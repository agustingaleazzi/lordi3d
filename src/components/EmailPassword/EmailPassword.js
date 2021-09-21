import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import { auth } from './../../firebase/utils';

import Button from '../Forms/Button/Button';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../Forms/FormInput/FormInput';


const EmailPassword = props => {
    
    const [ email, setEmail ] = useState('');
    const [ errors, setErrors] = useState([]);

    /*const resetForm = () => {
        setErrors([]);
        setEmail('');
    }*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                //CAMBIAR LUEGO
                url: 'http://localhost:3000/login'
            };
            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    props.history.push('/login');
                })
                .catch(() => {
                    const err = ['Email no encontrado, por favor intente nuevamente.'];
                    setErrors(err)
                });
        } catch (err) {
            console.log(err);
        }
    }
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
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange={e => setEmail(e.target.value)}
                        />
                        <Button type="submit">
                            Enviar 
                        </Button>
                    </form>
                </div>

            </AuthWrapper>
        );
    }

//gives access to the history stored in react router
export default withRouter(EmailPassword);