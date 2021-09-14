import React, {Component} from 'react';
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';
import {auth, handleUserProfile} from './../../firebase/utils';
import './styles.scss';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
}

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...initialState
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({[name]:value})
    }
    handleFormSubmit = async event => {
        //prevents the form to posting itself and reload the page
        event.preventDefault();
        //destructuring the values from the current state on submit.
        const { displayName, email, password, confirmPassword} = this.state;
        //checking that the password does match with the confirmation, creating an error if they do not.
        if(password !== confirmPassword){
            const err = ['La contraseña no concuerda'];
            this.setState({errors: err});
            return;
        } 
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, {displayName});
            this.setState({
                ...initialState
            })



        }catch(err){
            console.log(err)
        }

    }

    render(){
        const {displayName, email, password, confirmPassword, errors} = this.state
        return(
            <div className="signup">
                <div className="wrap">
                    <h1>
                        SignUp
                    </h1>

                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) => {
                                return(
                                    <li key={index}>
                                        {err}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <div className="formWrap">
                    <form onSubmit={this.handleFormSubmit}>
                        <FormInput 
                            type="text" 
                            name="displayName" 
                            value={displayName} 
                            placeholder="Nombre" 
                            onChange = {this.handleChange}
                        />
                        <FormInput 
                            type="email" 
                            name="email" 
                            value={email} 
                            placeholder="Email" 
                            onChange = {this.handleChange}
                        />
                        <FormInput 
                            type="password" 
                            name="password" 
                            value={password} 
                            placeholder="Password" 
                            onChange = {this.handleChange}
                        />
                        <FormInput 
                            type="password" 
                            name="confirmPassword" 
                            value={confirmPassword} 
                            placeholder="Confirmar password" 
                            onChange = {this.handleChange}
                        />
                        <Button>
                            Registrarse
                        </Button>
                    </form>
                    </div>
                </div>
            </div>

        );
    }

}

export default Signup;