import * as React from 'react';
import ViewContainer from 'src/components/ViewContainer';
import { withRouter } from 'react-router';
import { USER_DETAILS_TITLE, EMAIL, FIRST_NAME, LAST_NAME, PHONE, COUNTRY, REGION, CITY, STREET, PERSONAL_INFO_SUBTITLE, DATE_ADDED, ADDRESS_INFO_SUBTITLE, ROLE, STAUTS} from 'src/service/labels';
import { User, getUserFromToken, OrderAlbum, GET_orderAlbumForUser } from 'src/service/client';
import { LoadComponent } from 'src/components/LoadComponent';
import { Subtitle } from 'src/components/Subtitle';
import ScrollContainer from 'src/components/ScrollContainer';
import OrderContainer from 'src/components/OrderContainer';
import MessageBox from 'src/components/MessageBox';

interface UserDetailsViewState {
    user?: User;
    loading: boolean;

    finishedOrders?: OrderAlbum[];
    unfinishedOrders?: OrderAlbum[];

    detailedOrder?: OrderAlbum;
}

class UserDetailsView extends React.Component<any, UserDetailsViewState> {

    public constructor (props: any) {
        super (props);

        this.state = {
            user: undefined,
            loading: true
        };
    }

    async loadData () {
        let token = localStorage.getItem('token');
        if (this.state.user && this.state.user.id && token) {
            GET_orderAlbumForUser(token, this.state.user.id).then((res) => {
                if (res.data.code === 200 && res.data.body) {
                    let orders: OrderAlbum[] = res.data.body;
    
                    let fOrderns: OrderAlbum[] = orders.filter((order: OrderAlbum) => {
                        return order.dataTerminare;
                    })
    
                    let uOrderns: OrderAlbum[] = orders.filter((order: OrderAlbum) => {
                        return !order.dataTerminare;
                    })
    
                    this.setState({
                        unfinishedOrders: uOrderns,
                        finishedOrders: fOrderns
                    });
                }
            })
        }
    }

    componentDidMount () {
        let token = localStorage.getItem('token');
        if (token) {
            getUserFromToken (token, 
                (user?: User) => {
                    if (user) {
                        this.setState({user: user}, () => {
                            this.loadData().then(() => {this.setState({loading: false})}) 
                        });
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

    private onAdminAreaClick = () => {
        this.props.history.push('/admin');
    }

    public render () { 

        if (this.state.loading) {
            return <LoadComponent />
        }

        return (
            <>
            {this.state.detailedOrder ? 
                <MessageBox title={'Comanda cu numaru: ' + this.state.detailedOrder.id} onCloseClick={() => {this.setState({detailedOrder: undefined})}} show={this.state.detailedOrder !== undefined}>
                    <OrderContainer order={this.state.detailedOrder} previewOnly={false} showClientInfo={true} showDates={true}/>
                </MessageBox>
            : <> </>}
            <ViewContainer>
                <div className='content-view bottom-shadow margin-top-45 content-container'>

                        <div className='user-details-title center-container '>
                            <h1> {USER_DETAILS_TITLE} </h1>
                        </div>
                        { this.state.user !== undefined && this.state.user.address !== undefined && this.state.user.role !== undefined ?                         
                        <>
                            <div className='user-details-container'>
                                
                                <div className='user-details-section'>
                                    <div className='subtitle'> <h3> { PERSONAL_INFO_SUBTITLE } </h3> </div>

                                    {this.renderInfoRow(EMAIL, this.state.user.email)}
                                    {this.renderInfoRow(FIRST_NAME, this.state.user.first_name)}
                                    {this.renderInfoRow(LAST_NAME, this.state.user.last_name)}
                                    {this.renderInfoRow(PHONE, this.state.user.phone)}
                                    {this.renderInfoRow(DATE_ADDED, this.state.user.created_date)}
                                </div>

                                <div className='user-details-section'>
                                    <div className='subtitle'> <h3> { ADDRESS_INFO_SUBTITLE } </h3> </div>

                                    {this.renderInfoRow(COUNTRY, this.state.user.address.country)}
                                    {this.renderInfoRow(REGION, this.state.user.address.region)}
                                    {this.renderInfoRow(CITY, this.state.user.address.city)}
                                    {this.renderInfoRow(STREET, this.state.user.address.street)}
                                </div>

                                <div className='user-details-section'>
                                    <div className='subtitle'> <h3> { STAUTS } </h3> </div>

                                    {this.renderInfoRow(ROLE, this.state.user.role.name)}
                                    {this.state.user.role.name === 'admin' ? <button onClick={this.onAdminAreaClick}> Panou Adminsitrare </button> : <> </>}
                                </div>

                            </div> 
                            <Subtitle title='Comenzi actuale' />
                            <ScrollContainer>
                                {this.state.unfinishedOrders ? this.state.unfinishedOrders.map((order: OrderAlbum, index: number) => {
                                    return (
                                        <div key={'unfinished-' + index} className='order-row' onClick={() => {this.setState({detailedOrder: order})}}> 
                                            <OrderContainer previewOnly={true} showClientInfo = {false} showDates = {true} order={order} />
                                        </div> 
                                    );
                                }) : <> Nici o comanda </>}
                            </ScrollContainer>
                            <Subtitle title='Comenzi finalizate' />
                            <ScrollContainer>
                                {this.state.finishedOrders ? this.state.finishedOrders.map((order: OrderAlbum, index: number) => {
                                    return (
                                        <div key={'finished-' + index} className='order-row' onClick={() => {this.setState({detailedOrder: order})}}> 
                                            <OrderContainer previewOnly={true} showClientInfo = {false} showDates = {true} order={order} />
                                        </div> 
                                    );
                                }) : <> Nici o comanda </>}
                            </ScrollContainer>
                        </>
                            : <LoadComponent />
                        }

                </div>
            </ViewContainer>
            </>
        ); 
    }
}

export default withRouter(UserDetailsView);