import React, {Component} from 'react';
import './styles.scss';
import Button from '../Forms/Button/Button';

const Signin = props => {
    return (
        <div className="signin">
            <div className="wrap">
                <h1>login page</h1>
                <div className="formWrap">
                    <form>
                    <div className="socialSignin">
                    <div className="row">
                    <Button>
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

export default Signin;