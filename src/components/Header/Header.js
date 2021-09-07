import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase/utils';


const Header = props => {
    const {currentUser} = props;
    return (
        <header className="header">
            <Link to="/"><h1 className="logo">
                Impresiones 3d
            </h1>
            </Link>
            <div className="menu">
                {currentUser && (
                    <ul>
                        <li>
                            <span onClick={() => auth.signOut()}>
                                Logout
                            </span>
                        </li>
                    </ul>
                )}
                {!currentUser && (
                    <ul>
                        <li>
                            <Link to="/registration">
                                Registrarse
                            </Link>
                        </li>
                        <li>
                            <Link to="/login">
                                Iniciar sesion
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null
};

export default Header;