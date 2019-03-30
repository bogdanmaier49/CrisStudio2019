import * as React from 'react';
import ViewContainer from 'src/components/ViewContainer';
import { withRouter } from 'react-router';
import { User, doRegister } from 'src/service/client';
import Error from 'src/components/Error';
import { ACCOUNT_COULD_NOT_BE_CREATED, REGISTER_TITLE, PERSONAL_INFO_SUBTITLE, ADDRESS_INFO_SUBTITLE, CONTINUE_BUTTON, ALL_FIELDS_ARE_MANDATORY, EMAIL, FIRST_NAME, LAST_NAME, PHONE, COUNTRY, REGION, CITY, STREET, PASSWORD } from 'src/service/labels';

interface ILoginViewState {
    error?: string;
    user: User;
}

class RegisterView extends React.Component<any, ILoginViewState> {
    public constructor (props: any)  {
        super (props);

        this.state = {
            error: undefined,
            user: {
                address: {},
                role: {}
            }
        };
    }

    private renderTextField = (type: string, label: string, placeholder?: string, onChange?: (event: any) => void): JSX.Element => {
        return (
            <div className='form-field'>
                <div className='form-field-label width100'> <span> {label} </span> </div>
                <input className='width100' type={type} placeholder={placeholder !== undefined ? placeholder : ''} onChange={onChange}/>
            </div>
        );
    }
    
    public render () {
        return (
            <ViewContainer>

                <div className='form-container content-container bottom-shadow'>
                    <div className='center-container form-title'>
                        <h1> { REGISTER_TITLE } </h1>
                    </div>

                    {this.state.error ? <Error 
                        title= { ACCOUNT_COULD_NOT_BE_CREATED }
                        message={this.state.error}
                        onClose={() => {this.setState({error: undefined})}}
                    /> : <> </>}

                    <form onSubmit={(event) => {event.preventDefault()}}>
                        <div className='form-subtitle'> <h3> {PERSONAL_INFO_SUBTITLE} </h3> </div>

                        {this.renderTextField('email', EMAIL, 'exemplu@email.com', this.onEmailChange)}
                        {this.renderTextField('password', PASSWORD, '12345689', this.onPasswordChange)}
                        <div className='form-area width100'>
                            {this.renderTextField('text', FIRST_NAME, 'Prenume', this.onFirstNameChange)}
                            {this.renderTextField('text', LAST_NAME, 'Nume', this.onLastNameChange)}
                        </div>
                        {this.renderTextField('text', PHONE, '0740 123 456', this.onPhoneChange)}

                        <div className='form-subtitle'> <h3> { ADDRESS_INFO_SUBTITLE } </h3> </div>

                        <div className='form-area width100'>
                            {this.renderTextField('text', COUNTRY, 'Romania', this.onCountryChange)}
                            {this.renderTextField('text', REGION, 'Maramures', this.onRegionChange)}
                        </div>
                        {this.renderTextField('text', CITY, 'Baia Mare', this.onCityChange)}
                        {this.renderTextField('text', STREET, 'Strada nr. 275', this.onStreetChange)}

                        <button className='form-button' onClick={this.onSubmit}> { CONTINUE_BUTTON } </button>
                    </form>
                </div>

            </ViewContainer>
        );
    }

    private onEmailChange = (event: any) => {
        let user: User = this.state.user;
        user.email = event.target.value;
        this.setState({user: user});
    }

    private onPasswordChange = (event: any) => {
        let user: User = this.state.user;
        user.password = event.target.value;
        this.setState({user: user});
    }

    private onLastNameChange = (event: any) => {
        let user: User = this.state.user;
        user.last_name = event.target.value;
        this.setState({user: user});
    } 

    private onFirstNameChange = (event: any) => {
        let user: User = this.state.user;
        user.first_name = event.target.value;
        this.setState({user: user});
    }

    private onPhoneChange = (event: any) => {
        let user: User = this.state.user;
        user.phone = event.target.value;
        this.setState({user: user});
    }

    private onCountryChange = (event: any) => {
        let user: User = this.state.user;
        if (user.address)
            user.address.country = event.target.value;
        this.setState({user: user});
    }

    private onRegionChange = (event: any) => {
        let user: User = this.state.user;
        if (user.address)
            user.address.region = event.target.value;
        this.setState({user: user});
    }

    private onCityChange = (event: any) => {
        let user: User = this.state.user;
        if (user.address)
            user.address.city = event.target.value;
        this.setState({user: user});
    }

    private onStreetChange = (event: any) => {
        let user: User = this.state.user;
        if (user.address)
            user.address.street = event.target.value;
        this.setState({user: user});
    }

    private validUser = (user: User): boolean => {
        if (!user.email || !user.password || !user.first_name || !user.last_name || !user.phone || !user.address || 
            !user.address.country || !user.address.city || !user.address.region || !user.address.street)
            return false;

        return true;
    }

    private onSubmit = () => {
        let user: User = this.state.user;

        if (this.validUser(user)) {

            doRegister(user, 
                (res: any) => {
                    if (res.code !== 201) {
                        this.setState({error: res.message});
                    } else {
                        this.props.history.push('/login');
                    }
                }, 
                (err: string) => {
                    this.setState({error: err});
                }
            );

        } else {
            this.setState({error: ALL_FIELDS_ARE_MANDATORY  });
        }
    }

}

export default withRouter(RegisterView);