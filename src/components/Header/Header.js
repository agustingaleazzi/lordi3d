import React from 'react';
import './styles.scss';

const Header = props => {
    return (
        <header className="header">
        <h1 className="logo">
            Impresiones 3d
        </h1>
        <div className="menu">
            <h2>
                Registrarse
            </h2>
        </div>
        </header>
    )
}

export default Header;