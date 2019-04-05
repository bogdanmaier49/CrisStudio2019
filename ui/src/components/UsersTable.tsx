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
    }

}