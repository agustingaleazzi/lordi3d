import React from 'react';
import imp1 from './../../assets/img1.png';
import imp2 from './../../assets/img2.png';
import './styles.scss';

const Homepage = props => {
    return (
        <section className="homepage">
            <img className="image1" src={imp1} alt="printer"></img>
            <img className="image2" src={imp2} alt="printer"></img>
            <h1>
                Impresiones 3d
            </h1>
            <p>
                Somos impresiones 3d, una empresa familiar dedicada a servicios de impresión y diseño de objetos 3d.
                Contamos con impresoras de filamento y de resina para cumplir con todas las especificidades de nuestros clientes.
                Además de los objetos que tenemos en la tienda, realizamos impresiones a pedido, asi que no dudes en contactarnos por presupuestos.
            </p>
            <div className="buttons">
                <div className="button-tienda">
                        Tienda
                </div>
                <div className="button-contacto">
                        Contacto
                </div>
            </div>
        </section>
    );
};

export default Homepage;