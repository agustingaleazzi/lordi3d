import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { emailSignInStart, googleSignInStart } from '../../redux/User/user.actions';


import './styles.scss';

import Button from '../Forms/Button/Button';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../Forms/FormInput/FormInput';


const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const Signin = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    //acceso a dispatch
    const { currentUser } = useSelector(mapState);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (currentUser) {
            console.log('exito');
            resetForm();
            history.push('/')
        }
    }, [currentUser]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(emailSignInStart({ email, password }));
    }
    const handleGoogleSignIn = () => {
        dispatch(googleSignInStart());
    }
    const configAuthWrapper = {
        headline: 'Iniciar sesión'
    };
    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="signin">
                <div className="wrap">
                    <div className="formWrap">
                        <form onSubmit={handleSubmit}>
                            <FormInput
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                handleChange={e => setEmail(e.target.value)}
                            />
                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Contraseña"
                                handleChange={e => setPassword(e.target.value)}
                            />
                            <Button type="submit">
                                Entrar
                            </Button>
                            <div className="socialSignin">
                                <div className="row">
                                    <Button onClick={handleGoogleSignIn}>
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

export default Signin;