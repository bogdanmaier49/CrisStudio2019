import * as React from 'react';
import ViewContainer from 'src/components/ViewContainer';
import { withRouter } from 'react-router';
import { USER_DETAILS_TITLE, EMAIL, FIRST_NAME, LAST_NAME, PHONE, COUNTRY, REGION, CITY, STREET, PERSONAL_INFO_SUBTITLE, DATE_ADDED, LOADING, ADDRESS_INFO_SUBTITLE, ROLE, STAUTS} from 'src/service/labels';
import { User, getUserFromToken } from 'src/service/client';

interface UserDetailsViewState {
    user?: User;
}

class UserDetailsView extends React.Component<any, UserDetailsViewState> {

    public constructor (props: any) {
        super (props);

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

    private renderInfoRow = (label: string, value?: string) => {
        return (
            <div className='info-row'>
                <div className='info-row-label'>
                    {label}
                </div>
                <div className='info-row-value'>
                    <span> {value} </span>
                </div>
            </div>
        );
    }

    public render () { 

        return (
            <ViewContainer>
                <div className='user-details-view bottom-shadow margin-top-45 content-container'>

                        <div className='user-details-title center-container '>
                            <h1> {USER_DETAILS_TITLE} </h1>
                        </div>
                        { this.state.user !== undefined && this.state.user.address !== undefined && this.state.user.role !== undefined ?                         
                            <div className='user-details-container'>
                                
                                <div className='subtitle'> <h3> { PERSONAL_INFO_SUBTITLE } </h3> </div>

                                {this.renderInfoRow(EMAIL, this.state.user.email)}
                                {this.renderInfoRow(FIRST_NAME, this.state.user.first_name)}
                                {this.renderInfoRow(LAST_NAME, this.state.user.last_name)}
                                {this.renderInfoRow(PHONE, this.state.user.phone)}
                                {this.renderInfoRow(DATE_ADDED, this.state.user.created_date)}

                                <div className='subtitle'> <h3> { ADDRESS_INFO_SUBTITLE } </h3> </div>

                                {this.renderInfoRow(COUNTRY, this.state.user.address.country)}
                                {this.renderInfoRow(REGION, this.state.user.address.region)}
                                {this.renderInfoRow(CITY, this.state.user.address.city)}
                                {this.renderInfoRow(STREET, this.state.user.address.street)}

                                <div className='subtitle'> <h3> { STAUTS } </h3> </div>

                                {this.renderInfoRow(ROLE, this.state.user.role.name)}

                            </div> 
                            : <div className='center-container'> {LOADING} </div> 
                        }

                </div>
            </ViewContainer>
        ); 
    }
}

export default withRouter(UserDetailsView);