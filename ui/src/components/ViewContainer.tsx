import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import { withRouter } from 'react-router';
import { getUserFromToken, User } from 'src/service/client';

interface IViewContainerState {
    user?: User;
}

class ViewContainer extends React.Component<any, IViewContainerState> {

    public constructor (props: any) {
        super(props);

        this.state = {
            user: undefined
        };
    }

    componentDidMount () {
        let token = localStorage.getItem('token');
        if (token) {
            getUserFromToken (token, 
                (user?: User) => {
                    if (user) {
                        this.setState({user: user});
                    } else {
                        localStorage.removeItem('token');
                    }
                },
                (err) => {
                    localStorage.removeItem('token');
                }
            );
        }
    }

    public render () {

        if (! localStorage.getItem('token') && this.state.user !== undefined) {
            this.setState({user: undefined});
        }

        return (
            <div className='main-container'>
                <Header 
                    onLogoClick={()=>{this.props.history.push('/')}}
                    onRightButtonClick={()=>{this.state.user !== undefined ? this.props.history.push('/account') : this.props.history.push('/login')}}
                    rightButtonLabel={this.state.user !== undefined ? this.state.user.first_name + ' ' + this.state.user.last_name : 'Autentificare'}
                    onLogoutClick={() => {
                        localStorage.removeItem('token');
                        this.setState({user: undefined}, () => {this.props.history.push('/');});
                    }}
                    showLogout={this.state.user !== undefined ? true : false}
                />
                <div className='view'>
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }

}

export default withRouter(ViewContainer);