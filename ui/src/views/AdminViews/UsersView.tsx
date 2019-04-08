import * as React from 'react';
import { User, GET_allUsers, PATCH_user } from 'src/service/client';
import UsersTable from 'src/components/UsersTable';
import Error from 'src/components/Error';
import { LoadComponent } from 'src/components/LoadComponent';

interface IUsersViewProps {
    token: string;
}

interface IUsersViewState {
    users?: User[];
    filteredUsers?: User[];

    error?: string;

    loading: boolean;
}

export default class UsersView extends React.Component<IUsersViewProps, IUsersViewState>{

    public constructor (props: IUsersViewProps) {
        super (props);

        this.state = {
            users: undefined,
            filteredUsers: undefined,
            error: undefined,

            loading: true
        };
    }

    private async loadAllUsers () {
        await GET_allUsers(this.props.token).then((res: any) => {
            if (res.data.code === 200 && res.data.body) {
                let users: User[] = res.data.body;
                this.setState({users: users, filteredUsers: users});
            } else {
                this.setState({error: 'Erroare la incarcarea userilor'});
            }  
        });
    }

    private async updateUser (user: User) {
        await PATCH_user (this.props.token, user).then((res:any) => {
            if (res.data.code !== 202) {
                this.setState({error: 'Utilizatorul nu poate fii setat ca fotograf'});
            }
        } );
    }

    public componentDidMount () {
        this.loadAllUsers().then(() => {
            this.setState({loading: false});
        });
    }

    public render () {
        if (this.state.loading === true) {
            return <LoadComponent />
        }

        if (this.state.users && this.state.filteredUsers)
            return (
                <>
                    {this.state.error ? <Error title='Eroare' message={this.state.error} onClose={() => {this.setState({error: undefined})}} /> : <> </> }

                    <UsersTable users={this.state.users} 
                        onUserClick={(user: User) => {

                        }} 
                        onUpdateRoleClick={(user: User) => {
                            let role = user.role;
                            if (role) {
                                if (role.id === 1)
                                    role.id = 3;
                                else 
                                    role.id = 1;

                                role.name = '';
                                user.role = role;
                                this.updateUser(user).then(() => {
                                    this.setState({loading: true})
                                    this.loadAllUsers().then(() => {
                                        this.setState({loading: false});
                                    });
                                });
                            }
                        }}
                    />
                </>
            );

        return <h4> {this.state.error} </h4>; 
    }

}