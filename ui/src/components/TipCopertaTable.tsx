import * as React from 'react';
import {TipCoperta, BASE_LINK_TIP_COPERTA } from 'src/service/client';

interface ITipCopertaTableProps {
    tipuriCoperta: TipCoperta[];

    onUserClick : (tip: TipCoperta) => void;
}

export default class TipCopertaTable extends React.Component<ITipCopertaTableProps> {

    public constructor (props: ITipCopertaTableProps) {
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
                    {this.props.tipuriCoperta.map((tip) => {
                            return (
                                <tr className='tr-clickable' key={'mat-' + tip.id} onClick={() => {this.props.onUserClick(tip)}}>
                                    <td> {tip.id} </td>
                                    <td> <img src={BASE_LINK_TIP_COPERTA + '/Icons/' + tip.imagine} style={imgStyle}/> </td>
                                    <td> {tip.nume} </td>
                                    <td> {tip.descriere} </td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        );
    }

}