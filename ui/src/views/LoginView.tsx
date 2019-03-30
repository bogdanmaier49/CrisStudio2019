import * as React from 'react';
import { doLogIn } from 'src/service/client';
import ViewContainer from 'src/components/ViewContainer';
import Error from 'src/components/Error';
import { LOGIN_TITLE, EMAIL, PASSWORD, CONTINUE_BUTTON, CREATE_ACCOUNT_BUTTON, WRONG_EMAIL_OR_PASSWORD, FAIL_TO_AUTEHNTICATE, ALL_FIELDS_ARE_MANDATORY } from 'src/service/labels';

interface ILoginViewState {
    email?: string;
    password?: string;
    loginError?: string;
}

export default class LoginView extends React.Component<any, ILoginViewState> {
    public constructor (props: any)  {
        super (props);
        this.state = {
            email: '',
            password: ''
        }
    }

	public doLogin = (email?: string, password?: string) => {
		if (email && password) {
			// Generate token from email and password.
			doLogIn(email, password,
				(token?: string) => {
					
					if (token) {
                        localStorage.setItem('token', token);
                        this.props.history.push('/');
					} else {
						this.setState({loginError: WRONG_EMAIL_OR_PASSWORD });	
					}

				},
				(err: string) => {
					this.setState({loginError: FAIL_TO_AUTEHNTICATE });	
				}
			);
		} else {
            this.setState({loginError: ALL_FIELDS_ARE_MANDATORY });	
		}
	}

    public render () {
        return (
            <ViewContainer>
                <div className='login-view-form bottom-shadow'>
                    <div className='header-image'>
                    </div>

                    <div className='login-view-container'>
                        <h1> {LOGIN_TITLE} </h1>
                        
                        { this.state.loginError ?
                        <Error 
                            title='Autentificare esuata' 
                            message={this.state.loginError} 
                            onClose={() => {this.setState({loginError: undefined})}} /> :
                        <> </> }


                        <div className='input-label'>
                            {EMAIL}
                        </div>
                        <input type='email' placeholder='example@email.com' onChange={(event)=>{
                            this.setState({
                                email: event.target.value
                            });
                        }}/>
                        <div className='input-label'>
                            {PASSWORD}
                        </div>
                        <input type='password' placeholder='password' onChange={(event)=>{
                            this.setState({
                                password: event.target.value
                            });
                        }}/>
                        <div className='center-container'>
                            <button onClick={() => {
                                this.doLogin(this.state.email, this.state.password);
                            }}> {CONTINUE_BUTTON} </button>
                        </div>
                        <div className='register-button-container center-container'>
                            <a onClick={() => {this.props.history.push('/register');}}> {CREATE_ACCOUNT_BUTTON} </a>
                        </div>
                    </div>
                </div>
            </ViewContainer>
        );
    }
}