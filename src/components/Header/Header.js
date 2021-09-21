import React from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase/utils';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const Header = props => {

    //user selector function to set the current user on the component. it uses mapstate
    const { currentUser } = useSelector(mapState);

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
                            <Link to="/dashboard">
                                My account
                            </Link>
                        </li>
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



//conectando el header a redux
export default Header;