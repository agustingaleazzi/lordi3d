import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

const Header = props => {
    return (
        <header className="header">
            <Link to="/"><h1 className="logo">
                Impresiones 3d
            </h1>
            </Link>
            <div className="menu">
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
            </div>
        </header>
    )
}

export default Header;