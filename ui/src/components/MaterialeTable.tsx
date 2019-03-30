import * as React from 'react';
import { MaterialCoperta, BASE_LINK_MATERIALE_COPERTA } from 'src/service/client';

interface IMaterialeTableProps {
    materiale: MaterialCoperta[];

    onUserClick : (material: MaterialCoperta) => void;
}

export default class MaterialeTable extends React.Component<IMaterialeTableProps> {

    public constructor (props: IMaterialeTableProps) {
        super(props);
    }

    render () {
        let imgStyle = {
            width: '40px',
            height: '40px'
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imagine</th>
                        <th>Nume</th>
                        <th>Descriere</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.materiale.map((mat) => {
                            return (
                                <tr className='tr-clickable' key={'mat-' + mat.id} onClick={() => {this.props.onUserClick(mat)}}>
                                    <td> {mat.id} </td>
                                    <td> <img src={BASE_LINK_MATERIALE_COPERTA + '/Icons/' + mat.imagine} style={imgStyle}/> </td>
                                    <td> {mat.nume} </td>
                                    <td> {mat.descriere} </td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        );
    }

}