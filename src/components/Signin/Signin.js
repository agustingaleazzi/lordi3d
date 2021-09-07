import React, {Component} from 'react';
import './styles.scss';
import Button from '../Forms/Button/Button';
import { signInWithGoogle } from './../../firebase/utils';

class Signin extends Component {
    handleSubmit = async e => {
        e.preventDefault();
    }
    render(){
    return (
        <div className="signin">
            <div className="wrap">
                <h1>Iniciar sesión</h1>
                <div className="formWrap">
                    <form onSubmit={this.handleSubmit}>
                    <div className="socialSignin">
                    <div className="row">
                    <Button onClick={signInWithGoogle}>
                        Sign in with Google
                    </Button>
                    </div>

                </div>
            </form>
        </div>

            </div >

        </div >
    )
    }
}

export default Signin;