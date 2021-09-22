import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import { resetPassword, resetAllAuthForms } from '../../redux/User/user.actions';

import Button from '../Forms/Button/Button';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../Forms/FormInput/FormInput';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
})

const EmailPassword = props => {
    const {resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [ email, setEmail ] = useState('');
    const [ errors, setErrors] = useState([]);

    useEffect(()=> {
        if(resetPasswordSuccess){
            console.log('exito')
            dispatch(resetAllAuthForms());
            props.history.push('/login');
        }
    },[resetPasswordSuccess])

    useEffect(()=> {
        if(Array.isArray(resetPasswordError) && resetPasswordError.length>0){
            setErrors(resetPasswordError);
        }
    },[resetPasswordError])


    /*const resetForm = () => {
        setErrors([]);
        setEmail('');
    }*/

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword({email}));        
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