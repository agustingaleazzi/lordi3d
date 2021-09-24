import React from 'react';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from '../../redux/User/user.actions';
import { Link } from 'react-router-dom';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const Header = props => {
    const dispatch = useDispatch();

    //user selector function to set the current user on the component. it uses mapstate
    const { currentUser } = useSelector(mapState);

    const signOut = () => {
        dispatch(signOutUserStart());
    };

    return (
        <header className="header">
            <Link to="/"><h1 className="logo">
                Imp3D
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
                            <span onClick={() => signOut()}>
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