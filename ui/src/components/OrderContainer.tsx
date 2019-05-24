import * as React from 'react';
import { OrderAlbum, BASE_LINK_TIP_COPERTA, BASE_LINK_MATERIALE_COPERTA} from 'src/service/client';
import Card from './Card';

interface IOrderContainerProps {
    order: OrderAlbum;
    previewOnly: boolean;
    showClientInfo: boolean;
    showDates: boolean;
}


export default class OrderContainer extends React.Component<IOrderContainerProps> {
    public constructor (props: IOrderContainerProps) {
        super(props);
    }

    private renderString = (title: string, value?: string | number) => {
        return (
            <div className='order-container-value'>
                <h4> {title} : </h4>
                <span> {value} </span>
            </div>
        );
    }

    private renderMoreInfo = ():JSX.Element => {
        return (
            <>
                <div className='m-row m-row-stretch white-background m-row-margin-top'>
                    <div className='order-subtitle width100'> <h3> Configurare albume </h3> </div>

                    {this.renderString('Dimensiuni Album', this.props.order.album && this.props.order.album.dimensiuniCoperta ? this.props.order.album.dimensiuniCoperta.dimensiuni : '')}
                    {this.renderString('Numar Pagini', this.props.order.album ? this.props.order.album.numarPagini : '')}
                    {this.renderString('Numar Albume',  this.props.order.numarBucati)}


                    {this.renderString('Coltare Metal', this.props.order.album ? this.props.order.album.coltareMetal : '')}
                    {this.renderString('Cutie Album', this.props.order.cutieAlbum)}
                    {this.renderString('Face Off', this.props.order.faceOff)}


                    {this.renderString('Coperta Buretata',  this.props.order.copertaBuretata)}
                    {this.renderString('Paspartou', this.props.order.paspartou)}
                    {this.renderString('Machetare', this.props.order.machetare)}
                </div>

                <div className='m-row m-row-stretch white-background m-row-margin-top'>
                    <div className='order-subtitle width100'> <h3> Replici </h3> </div>

                    {this.renderString('Dimensiuni Replica',  this.props.order.dimensiuniReplica)}
                    {this.renderString('Numar Replici', this.props.order.numarReplici)}
                </div>

                <div className='m-row m-row-stretch white-background m-row-margin-top'>
                    <div className='order-subtitle width100'> <h3> Tablouri </h3> </div>

                    {this.renderString('Material Tablou',  this.props.order.materialTablou)}
                    {this.renderString('Dimensiuni Tablou', this.props.order.dimensiuneTablou)}
                    {this.renderString('Numar Tablouri', this.props.order.numarTablouri)}
                </div>

                <div className='m-row m-row-stretch white-background m-row-margin-top'>
                    <div className='order-subtitle width100'> <h3> Stickuri </h3> </div>

                    {this.renderString('Cutie Stick',  this.props.order.cutieStick)}
                    {this.renderString('Mapa Stick', this.props.order.mapaStick)}
                </div>

                { this.props.order.mentiuni ? <div className='m-row m-row-stretch white-background m-row-margin-top'>
                    <div className='order-subtitle width100'> <h3> Mentiuni </h3> </div>
                    <p> {this.props.order.mentiuni} </p>
                </div> : <> </>}

            </>
        );
    }

    render () {

        return (
            <div className='order-container'>


                <div className='m-row m-row-stretch white-background'>
                        { this.props.order.album && this.props.order.album.tipCoperta ? 
                        <Card 
                            imagePath={BASE_LINK_TIP_COPERTA + '/Icons/' + this.props.order.album.tipCoperta.imagine}
                            title={this.props.order.album.tipCoperta.nume}
                            description={this.props.order.album.tipCoperta.descriere}
                            width='100px'
                            height='150px'
                        /> : <> </> }
                    
                        { this.props.order.album && this.props.order.album.materialCoperta ? 
                        <Card 
                            imagePath={BASE_LINK_MATERIALE_COPERTA + '/Icons/' + this.props.order.album.materialCoperta.imagine}
                            title={this.props.order.album.materialCoperta.nume}
                            description={this.props.order.album.materialCoperta.descriere}
                            width='100px'
                            height='150px'
                        /> : <> </> }

                        <div className='m-flex m-flex-center-vertical m-flex-order-column'>
                            {this.renderString('Text Coperta', this.props.order.album ? this.props.order.album.textCoperta : '')} 
                            {this.renderString('Link Poze', this.props.order.album ? this.props.order.album.linkPoze : '')}        
                            {this.props.showDates ? this.renderString('Data Plasare', this.props.order.dataPlasare ? this.props.order.dataPlasare : '') : <> </>} 
                            {this.props.showDates ? this.renderString('Data Finalizare', this.props.order.dataTerminare ? this.props.order.dataTerminare : '-- / -- / ----') : <> </>}        
                        </div>
                        { this.props.showClientInfo ? <div className='m-flex m-flex-center-vertical m-flex-order-column border margin-left-5 margin-top-5 margin-bottom-5'>
                            {this.renderString('Nume client', this.props.order.user ? this.props.order.user.first_name : 'Eroare')} 
                            {this.renderString('Prenume client', this.props.order.user ? this.props.order.user.last_name : 'Eroare')}
                            {this.renderString('Telefon client', this.props.order.user ? this.props.order.user.phone : 'Eroare')}        
                            {this.renderString('Email client', this.props.order.user ? this.props.order.user.email : 'Eroare')}      
                        </div> : <> </> }
                </div>

                { this.props.previewOnly !== true ? 
                    this.renderMoreInfo() : <> </> }

            </div>
        );
    }
}