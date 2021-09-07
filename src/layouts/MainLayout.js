import React from 'react';
import Header from './../components/Header/Header';
import Footer from './../components/Footer/Footer.js';

const MainLayout = props => {
    return (
        <div>
            <Header {...props} />
            <div>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout;