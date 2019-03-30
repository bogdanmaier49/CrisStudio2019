import * as React from 'react';
import { User } from 'src/service/client';
import ReactTable from 'react-table';

interface IUsersTableProps {
    users: User[];

    onUserClick : (user: User) => void;
    onUpdateRoleClick : (user: User) => void;
}

export default class UsersTable extends React.Component<IUsersTableProps> {

    public constructor (props: IUsersTableProps) {
        super(props);
    }

    render () {

        const columns = [{
			id: 'id',
			Header: 'ID',
			accessor: (o: any) => o.id
		}, {
			id: 'email',
			Header: 'Email',
			accessor: (o: any) => o.email
		}, {
			id: 'created_date',
			Header: 'Data Inregistraii',
			accessor: (o: any) => o.created_date,
			width: 136
		}, {
			id: 'Nume',
			Header: 'Nume',
			accessor: (o: any) => o.last_name,
			width: 136
		}, {
			id: 'Prenume',
			Header: 'Prenume',
			accessor: (o: any) => o.first_name
		}, {
			id: 'Telefon',
			Header: 'Telefon',
			accessor: (o: any) => o.phone
		}, {
			id: 'Tara',
			Header: 'Tara',
			accessor: (o: any) => o.address.country
		}, {
			id: 'Judet',
			Header: 'Judet',
			accessor: (o: any) => o.address.region
		}, {
			id: 'Oras',
			Header: 'Oras',
			accessor: (o: any) => o.address.city
		}, {
			id: 'Strada',
			Header: 'Strada',
			accessor: (o: any) => o.address.street
		}, {
			id: 'Status',
			Header: 'Status',
			accessor: (o: any) => o.role.name
		}, {
			id: 'Actiuni',
			Header: 'Actiuni',
            Cell: (props: any) => <button className='camera-button' onClick={()=>this.props.onUpdateRoleClick(props.original)}> <i className="material-icons">camera_alt</i> </button>
		}]

		return (
			<ReactTable
				data={this.props.users}
				columns={columns}
				filterable
				defaultPageSize={5}
				showPageSizeOptions={false}
			/>
		);

        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Data Inregistrarii</th>
                        <th>Nume</th>
                        <th>Prenume</th>
                        <th>Telefon</th>
                        <th>Tara</th>
                        <th>Judet</th>
                        <th>Oras</th>
                        <th>Strada</th>
                        <th>Status</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.users.map((user) => {
                            let roleId: number = 1;
                            if (user.role && user.role.id) {
                                roleId = user.role.id;
                            }

                            let extraClass: string = roleId === 3 ? ' green' : '';

                            return (
                                <tr className={'tr-clickable' + extraClass}
                                    key={'user-' + user.id} onClick={() => {this.props.onUserClick(user)}}>
                                    <td> {user.id} </td>
                                    <td> {user.email} </td>
                                    <td> {user.created_date} </td>
                                    <td> {user.last_name} </td>
                                    <td> {user.first_name} </td>
                                    <td> {user.phone} </td>
                                    <td> {user.address !== undefined ? user.address.country : 'nedefinit'} </td>
                                    <td> {user.address !== undefined ? user.address.region : 'nedefinit'} </td>
                                    <td> {user.address !== undefined ? user.address.city : 'nedefinit'} </td>
                                    <td> {user.address !== undefined ? user.address.street : 'nedefinit'} </td>
                                    <td> {user.role !== undefined ? user.role.name : 'nedefinit'} </td>
                                    <td> <button className='camera-button' onClick={()=>this.props.onUpdateRoleClick(user)}> <i className="material-icons">camera_alt</i> </button> </td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        );
    }

}