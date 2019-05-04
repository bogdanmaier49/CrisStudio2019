import * as React from 'react';
import { withRouter, Redirect } from 'react-router';
import ViewContainer from 'src/components/ViewContainer';
import { User, getUserFromToken, GET_materialeCoperta, MaterialCoperta, TipCoperta, OrderAlbum, GET_allUsers, GET_tipCoperta, GET_comenziAlbume, GET_Import } from 'src/service/client';
import { Tabs, Tab } from 'react-bootstrap';
import UsersView from './AdminViews/UsersView';
import OrdersView from './AdminViews/OrdersView';

interface AdminViewState {
    adminUser?: User;
    users?: User[];
    materialeCoperta?: MaterialCoperta[];
    tipCoperta?: MaterialCoperta[];
    comenzi?: OrderAlbum[];

    filteredUsers?: User[];
    filteredMateriale?: MaterialCoperta[];
    filteredTipuri?: TipCoperta[];
    
    matToEdit?: MaterialCoperta;
    matEditErr?: string;

    loading: boolean;
}

class AdminView extends React.Component<any, AdminViewState> {

    buttonStyle = {
        padding: '0px',
        paddingLeft: '10px',
        paddingRight: '10px'
    };

    public constructor(props: any) {
        super(props);

        this.state = {
            adminUser: undefined,
            users: undefined,
            materialeCoperta: undefined,
            tipCoperta: undefined,
            comenzi: undefined,

            filteredUsers: undefined,
            filteredMateriale: undefined,
            filteredTipuri:undefined,

            loading: true
        }
    }


    private async loadAdminData (token: string) {
        await GET_allUsers(token).then((res: any) => {
            this.setState({users: res.data.body, filteredUsers: res.data.body});
        });
        await GET_comenziAlbume(token).then((res: any) => {
            this.setState({comenzi: res.data.body});
        });
        await GET_materialeCoperta().then((res: any) => {
            this.setState({materialeCoperta: res.data.body, filteredMateriale: res.data.body});
        });
        await GET_tipCoperta().then((res: any) => {
            this.setState({tipCoperta: res.data.body, filteredTipuri: res.data.body});
        });
    }


    componentDidMount () {
        let token = localStorage.getItem('token');
        
        if (token) {
            getUserFromToken (token, 
                (user?: User) => {
                    if (user) {
                        this.setState({adminUser: user}, () => {
                            if (token) {
                                this.loadAdminData(token).then(() => {this.setState({loading: false})});
                            }
                        });
                    } else {
                        localStorage.removeItem('token');
                    }
                },
                (err) => {
                    localStorage.removeItem('token');
                }
            )
        }
    }

    public render () {

        if (!this.state.loading) {
            if (this.state.adminUser !== undefined && this.state.adminUser.role && this.state.adminUser.role.name && this.state.adminUser.role.name === 'admin') {
                let token = localStorage.getItem('token');
                return (
                    <ViewContainer>
                        
                        <div className='bottom-shadow margin-top-45 admin-view'>

                            <Tabs defaultActiveKey={2} id="admin-view-tabs">
                                <Tab eventKey={1} title="Utilizatori">
                                    <div className='margin-top-25'>
                                        { token ? <UsersView token={token}/> : <> Eroare la afisarea clientilor </> }
                                    </div>
                                </Tab>
                                <Tab eventKey={2} title="Comenzi Albume">
                                    <div className='margin-top-25'>
                                        { token ? <OrdersView token={token}/> : <> Eroare la afisarea comenzilor </> }
                                    </div>
                                </Tab>
                                {/* <Tab eventKey={2} title="Materiale Coperta">
                                    <div className='margin-top-25'>
                                        { token ? <MaterialeView token={token}/> : <> Eroare la afisarea materialelor </> }
                                    </div>
                                </Tab>
                                <Tab eventKey={3} title="Tipuri Coperta">
                                    <div className='margin-top-25'>
                                        { token ? <TipCopertaView token={token}/> : <> Eroare la afisarea materialelor </> }
                                    </div>
                                </Tab>
                                <Tab eventKey={4} title="Dimensiuni Albume">
                                    <div className='margin-top-25'>

                                    </div>
                                </Tab> */}
                                <Tab eventKey={3} title="Support">
                                    <div className='margin-top-25'>
                                        <button onClick={() => {
                                            let token = localStorage.getItem('token');
                                            if (token) {
                                                GET_Import(token, 'mat').then((res: any) => {
                                                    if (res) {
                                                        console.log(res.data.body);
                                                    }
                                                });
                                            }
                                        }}> Import Materiale Din Folder Imagini </button>

                                        <button onClick={() => {
                                            let token = localStorage.getItem('token');
                                            if (token) {
                                                GET_Import(token, 'tip').then((res: any) => {
                                                    if (res) {
                                                        console.log(res.data.body);
                                                    }
                                                });
                                            }
                                        }}> Import Tipuri Coperta Din Folder Imagini </button>
                                    </div>
                                </Tab>
                            </Tabs>

                        </div>

                    </ViewContainer>
                );
            } else {
                return <Redirect to='/login' />
            }
        }
        return <> Incarcare ... </>
    }

}

export default withRouter(AdminView);