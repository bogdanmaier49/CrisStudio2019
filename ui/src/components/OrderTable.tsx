import * as React from 'react';
import { OrderAlbum, BASE_LINK_MATERIALE_COPERTA, BASE_LINK_TIP_COPERTA } from 'src/service/client';
import ReactTable from "react-table";
import 'react-table/react-table.css';

interface IOrderTableProps {
	orders: OrderAlbum[];

	onFinishButtonClick?: (order: OrderAlbum) => void;
	onViewDetailsClick?: (order: OrderAlbum) => void;
}

export default class OrderTable extends React.Component<IOrderTableProps> {

	public constructor(props: IOrderTableProps) {
		super(props);
	}

	private renderImageColumn = (value: string, image: string): JSX.Element => {
		let imgStyle = {
			width: '40px',
			height: '40px'
		}

		return (
			<>
				<div>
					<img src={image} style={imgStyle} />
				</div>
				<div>
					{value}
				</div>
			</>);
	}

	render() {

		const columns = [{
			id: 'id',
			Header: 'ID',
			accessor: (o: any) => o.id,
			Cell: (props: any) => {
				return <div>
					<span> {props.original.id} </span>
					{this.props.onFinishButtonClick ? <button onClick={() => {
						this.props.onFinishButtonClick ? this.props.onFinishButtonClick(props.original) : {}
					}}> Finalizare </button> : <> </>}
					{this.props.onViewDetailsClick ?
						<button onClick={
							() => {
								this.props.onViewDetailsClick ? this.props.onViewDetailsClick(props.original) : {}
							}}
						>
							Detailii
						</button> : <> </>}
				</div>
			},
			width: 256
		}, {
			id: 'materialCoperta',
			Header: 'Material Coperta',
			accessor: (o: any) => o.album.materialCoperta,
			Cell: (props: any) => this.renderImageColumn(props.value.nume, BASE_LINK_MATERIALE_COPERTA + '/Icons/' + props.value.imagine)
		}, {
			id: 'tipCoperta',
			Header: 'Tip Coperta',
			accessor: (o: any) => o.album.tipCoperta,
			Cell: (props: any) => {
				return this.renderImageColumn(props.value.nume, BASE_LINK_TIP_COPERTA + '/Icons/' + props.value.imagine)
			}
		}, {
			id: 'textCoperta',
			Header: 'Text Coperta',
			accessor: (o: any) => o.album.textCoperta
		}, {
			id: 'dataPlasare',
			Header: 'Data Plasare',
			accessor: (o: any) => o.dataPlasare,
			width: 136
		}, {
			id: 'dataTerminare',
			Header: 'Data Finalizare',
			accessor: (o: any) => o.dataTerminare,
			width: 136
		}, {
			id: 'nume',
			Header: 'Nume',
			accessor: (o: any) => o.user.last_name
		}, {
			id: 'prenume',
			Header: 'Prenume',
			accessor: (o: any) => o.user.first_name
		}, {
			id: 'email',
			Header: 'Email',
			accessor: (o: any) => o.user.email,
			width: 254
		}]

		return (
			<ReactTable
				data={this.props.orders}
				columns={columns}
				filterable
				defaultPageSize={5}
				showPageSizeOptions={false}
			/>
		);
	}

}