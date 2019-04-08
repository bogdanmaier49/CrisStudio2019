import * as React from 'react';
import { withRouter, Redirect } from 'react-router';
import ViewContainer from 'src/components/ViewContainer';
import Error from 'src/components/Error';
import { CONTINUE_BUTTON } from 'src/service/labels';
import DropBox from 'src/components/DropBox';
import { OrderAlbum, MaterialCoperta, TipCoperta, DimensiuniCoperta, GET_materialeCoperta, GET_tipCoperta, GET_dimensiuniCoperta, getUserFromToken, User } from 'src/service/client';
import { LoadComponent } from 'src/components/LoadComponent';

interface Validators {
    tipCoperta: boolean;
    materialCoperta: boolean;
    dimensiuniAlbum: boolean;
    textCoperta: boolean;
    numarColaje: boolean;
    numarAlbume: boolean;
    linkPoze: boolean;
    materialTablou: boolean;
    dimensiuneTablou: boolean;
    numarTablouri: boolean;
}

interface IOrderViewState {
    error?: string;
    order: OrderAlbum;

    materialeCoperta?: MaterialCoperta[];
    tipuriCoperta?: TipCoperta[];
    dimensiuniCoperta?: DimensiuniCoperta[];
    loading: boolean;

    user?: User;

    validators: Validators;

}

class OrderView extends React.Component <any, IOrderViewState> {
    [x: string]: any;

    public constructor (props: any) {
        super(props);

        this.state = {
            error: undefined,
            materialeCoperta: undefined,
            tipuriCoperta: undefined,
            dimensiuniCoperta: undefined,
            loading: true,
            order: {
                album: {
                    coltareMetal: 'NU'
                },
                user: {
                },
                cutieAlbum: 'NU',
                faceOff: 'NU',
                copertaAlbum: 'NU',
                copertaBuretata: 'NU',
                paspartou: 'NU',
                machetare: 'NU',
                cutieStick: 'NU',
                mapaStick: 'NU'
            },
            validators: {
                tipCoperta: false,
                materialCoperta: false,
                dimensiuniAlbum: false,
                textCoperta: false,
                numarColaje: false,
                numarAlbume: false,
                linkPoze: false,
                materialTablou: true,
                dimensiuneTablou: true,
                numarTablouri: true
            }
            
        };
    }

    private async loadData () {
        await GET_materialeCoperta().then((res) => {
            if (res.data) {
                this.setState({materialeCoperta: res.data.body});
            }
        });


        await GET_tipCoperta().then((res) => {
            if (res.data) {
                this.setState({tipuriCoperta: res.data.body});
            }
        });

        await GET_dimensiuniCoperta().then((res) => {
            if (res.data) {
                this.setState({dimensiuniCoperta: res.data.body});
            }
        });
    }

    componentWillMount () {
        let token = localStorage.getItem('token');
        if (token) {
            getUserFromToken (token, 
                (user?: User) => {
                    if (user) {
                        let order: OrderAlbum = this.state.order;
                        order.user = user;
                        this.setState({user: user, order});
                        this.loadData().then(() => {this.setState({loading: false})});
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

    private renderTextField = (type: string, label: string, placeholder?: string, onChange?: (event: any) => void, isValid: boolean = true): JSX.Element => {
        let invalidInputStyle = {
            border: '1px solid red'
        };

        return (
            <div className='form-field'>
                <div className='form-field-label width100'> <span> {label} </span> </div>
                <input style={isValid === false ? invalidInputStyle : {}} className='width100' type={type} placeholder={placeholder !== undefined ? placeholder : ''} onChange={onChange}/>
            </div>
        );
    }

    private validateOrder = (): boolean => {

        let v = this.state.validators;
        return v.dimensiuneTablou && v.dimensiuniAlbum && v.linkPoze && v.materialCoperta &&
            v.materialTablou && v.numarAlbume && v.numarColaje && v.numarTablouri && v.textCoperta &&
            v.tipCoperta;

    }

    private onSubmit = () => {
        window.scrollTo(0, 0);
        if (this.validateOrder()) {

            if (this.state.order.materialTablou === undefined) {
                this.state.order.numarTablouri = undefined;
                this.state.order.dimensiuneTablou = undefined;
            }

            let token = localStorage.getItem('token');
            if (token) {
                this.props.history.push({pathname: '/confirmare', state: {order: this.state.order}});
            }

        } else {
            this.setState({error: 'Toate campurile sunt obligatorii'});
        }
    }

    render () {
        if (this.state.loading) {
            return <LoadComponent />
        }

        if (this.state.user !== undefined) {
            if (this.state.user.role !== undefined && (this.state.user.role.name === 'fotograf' || this.state.user.role.name === 'admin')) {
            return (
                <ViewContainer>

                        { this.state.loading === false ? 
                        <div className='order-view form-container content-container bottom-shadow'>
                            <div className='center-container form-title noselect'>
                                <h1> Comanda </h1>
                            </div>

                            {this.state.error ? <Error 
                                title= 'Comanda nu poate fi efectuata'
                                message={this.state.error}
                                onClose={() => {this.setState({error: undefined})}}
                            /> : <> </>}

                            <form onSubmit={(event) => {event.preventDefault()}}>
                                <div className='form-subtitle'> <h3> Configurare Album </h3> </div>

                                
                                <div className='form-area width100'>
                                    <div className='form-field'>
                                        <div className='form-field-label width100'> <span> Tip Coperta </span> </div>
                                        <DropBox
                                            currentItem = {this.state.order.album !== undefined && this.state.order.album.tipCoperta ? this.state.order.album.tipCoperta : 'Selecteaza ...'}
                                            itemSet={this.state.tipuriCoperta ? this.state.tipuriCoperta : []} 
                                            onChange={this.onTipCopertaChange}
                                            isValid={this.state.validators.tipCoperta}
                                        />
                                    </div>
                                    <div className='form-field'>
                                        <div className='form-field-label width100'> <span> Material Coperta </span> </div>
                                        <DropBox 
                                            currentItem = {this.state.order.album !== undefined && this.state.order.album.materialCoperta ? this.state.order.album.materialCoperta : 'Selecteaza ...'}
                                            itemSet={this.state.materialeCoperta ? this.state.materialeCoperta : []} 
                                            onChange={this.onMaterialeCopertaChange} 
                                            isValid={this.state.validators.materialCoperta}
                                        />
                                    </div>
                                    <div className='form-field'>
                                        <div className='form-field-label width100'> <span> Dimensiuni Album </span> </div>
                                        <DropBox 
                                            currentItem = {this.state.order.album !== undefined && this.state.order.album.dimensiuniCoperta ? this.state.order.album.dimensiuniCoperta : 'Selecteaza ...'}
                                            itemSet={this.state.dimensiuniCoperta ? this.state.dimensiuniCoperta : []} 
                                            onChange={this.onDimensiuniCoprtaChange} 
                                            isValid={this.state.validators.dimensiuniAlbum}
                                        />
                                    </div>
                                </div>

                                {this.renderTextField('text', 'Text Coperta', 'Coperta', this.onTextCopertaChange, this.state.validators.textCoperta)}

                                <div className='form-area width100'>
                                    {this.renderTextField('text', 'Numar Colaje', 'ex: 20', this.onNumarPaginiChange, this.state.validators.numarColaje)}
                                    {this.renderTextField('text', 'Numar Albume', 'ex: 20', this.onNumarBucatiChange, this.state.validators.numarAlbume)}
                                </div>

                                {this.renderTextField('text', 'Link Poze', 'https://wetransfer.com/...', this.onLinkPozeChange, this.state.validators.linkPoze)}

                                <div className='form-area width100'>
                                    <div className='form-field'>
                                        <div className='form-field-label width100'> <span> Cutie Album </span> </div>
                                        <DropBox 
                                            currentItem = {'NU'}
                                            itemSet={['DA', 'NU']} 
                                            onChange={this.onCutieAlbumChange} 
                                        />
                                    </div>
                                    <div className='form-field'>
                                        <div className='form-field-label width100'> <span> Face off </span> </div>
                                        <DropBox 
                                            currentItem = {'NU'}
                                            itemSet={['DA', 'NU']} 
                                            onChange={this.onFaceOffChange} 
                                        />
                                    </div>
                                    <div className='form-field'>
                                        <div className='form-field-label width100'> <span> Coperta buretata </span> </div>
                                        <DropBox 
                                            currentItem = {'NU'}
                                            itemSet={['DA', 'NU']} 
                                            onChange={this.onCopertaBuretataChange} 
                                        />
                                    </div>
                                </div>

                                <div className='form-area width100'>
                                    <div className='form-field'>
                                        <div className='form-field-label width100'> <span> Coltare metal </span> </div>
                                        <DropBox 
                                            currentItem = {'NU'}
                                            itemSet={['DA', 'NU']} 
                                            onChange={this.onColtareMetalChanged} 
                                        />
                                    </div>
                                    <div className='form-field'>
                                        <div className='form-field-label width100'> <span> Paspartu </span> </div>
                                        <DropBox 
                                            currentItem = {'NU'}
                                            itemSet={['DA', 'NU']} 
                                            onChange={this.onPaspartuChange} 
                                        />
                                    </div>
                                    <div className='form-field'>
                                        <div className='form-field-label width100'> <span> Machetare </span> </div>
                                        <DropBox 
                                            currentItem = {'NU'}
                                            itemSet={['DA', 'NU']} 
                                            onChange={this.onMachetareChange} 
                                        />
                                    </div>    
                                </div>

                                <div className='form-subtitle'> <h3> Configurare Tablouri </h3> </div>

                                <div className='form-area width100'>
                                    <div className='form-field'>
                                        <div className='form-field-label width100'> <span> Material tablou </span> </div>
                                        <DropBox 
                                            currentItem = {'Selecteaza ...'}
                                            itemSet={['Nu doresc tablou', 'Hartie', 'Canvas']} 
                                            onChange={this.onMaterialTabliuChange} 
                                            isValid={this.state.validators.materialTablou}
                                        />
                                    </div>
                                    {this.renderTextField('text', 'Dimensiune tablou', 'ex: 20x20', this.onDimensiuneTablouChange, this.state.validators.dimensiuneTablou)}
                                    {this.renderTextField('text', 'Numar tablouri', 'ex: 20', this.onNumarTablouriChange, this.state.validators.numarTablouri)}
                                </div>

                                <div className='form-subtitle'> <h3> Altele </h3> </div>

                                <div className='form-area width100'>
                                    <div className='form-field'>
                                        <div className='form-field-label width100'> <span> Cutie Stick </span> </div>
                                        <DropBox 
                                            currentItem = {'NU'}
                                            itemSet={['DA', 'NU']} 
                                            onChange={this.onCutieStickChange} 
                                        />
                                    </div>
                                    <div className='form-field'>
                                        <div className='form-field-label width100'> <span> Mapa Stick </span> </div>
                                        <DropBox 
                                            currentItem = {'NU'}
                                            itemSet={['DA', 'NU']} 
                                            onChange={this.onMapaStickChange} 
                                        />
                                    </div>
                                </div>
                            
                                <div className='form-subtitle'> <h3> Mentiuni </h3> </div>

                                <div className='form-field'>
                                    <textarea onChange={this.onMentiuniChange} />
                                </div>
                                
                                <button className='form-button' onClick={this.onSubmit}> { CONTINUE_BUTTON } </button>
                            </form> 

                        </div> : <LoadComponent /> }


                </ViewContainer>
            );
            } else {
                return <Redirect to='/notverified' />
            }
        }

        return <Redirect to='/login' />
    }

    private onMaterialeCopertaChange = (obj: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        let validators: Validators = this.state.validators;
        if (order.album !== undefined) {
            order.album.materialCoperta = obj;
            validators.materialCoperta = order.album.materialCoperta !== undefined;
        }
        this.setState({order:order});
    }

    private onTipCopertaChange = (obj: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        let validators: Validators = this.state.validators;
        if (order.album !== undefined) {
            order.album.tipCoperta = obj;
            validators.tipCoperta = order.album.tipCoperta !== undefined;
        }
        this.setState({order:order});
    }

    private onDimensiuniCoprtaChange = (obj: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        let validators: Validators = this.state.validators;
        if (order.album !== undefined) {
            order.album.dimensiuniCoperta = obj;
            validators.dimensiuniAlbum = order.album.dimensiuniCoperta !== undefined;
        }
        this.setState({order:order});
    }

    private onTextCopertaChange = (evt: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        let validators: Validators = this.state.validators;
        if (order.album !== undefined) {
            order.album.textCoperta = evt.target.value;
            validators.textCoperta = order.album.textCoperta !== undefined && order.album.textCoperta.length > 0;
        }
        this.setState({order:order, validators: validators});
    }

    private onNumarPaginiChange = (evt: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        let validators: Validators = this.state.validators;
        if (order.album !== undefined) {
            order.album.numarPagini = evt.target.value;
            validators.numarColaje = order.album.numarPagini !== undefined && String(order.album.numarPagini).length > 0 && /^\d+$/.test(String(order.album.numarPagini));
        }
        this.setState({order:order, validators: validators});
    }

    private onLinkPozeChange = (evt: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        let validators: Validators = this.state.validators;
        if (order.album !== undefined) {
            order.album.linkPoze = evt.target.value;
            validators.linkPoze = order.album.linkPoze !== undefined && order.album.linkPoze.length > 0;
        }
        this.setState({order:order});
    }

    private onNumarBucatiChange = (evt: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        order.numarBucati = evt.target.value;
        let validators: Validators = this.state.validators;
        validators.numarAlbume = order.numarBucati !== undefined && String(order.numarBucati).length > 0 && /^\d+$/.test(String(order.numarBucati));

        this.setState({order:order});
    }

    private onFaceOffChange = (evt: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        order.faceOff = evt;
        this.setState({order:order});
    }

    private onCopertaBuretataChange = (evt: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        order.copertaBuretata = evt;
        this.setState({order:order});
    }

    private onCutieAlbumChange = (evt: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        order.cutieAlbum = evt;
        this.setState({order:order});
    }

    private onPaspartuChange = (evt: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        order.paspartou = evt;
        this.setState({order:order});
    }

    private onMachetareChange = (evt: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        order.machetare = evt;
        this.setState({order:order});
    }

    private onMaterialTabliuChange = (evt: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        let validators: Validators = this.state.validators;
        if (evt === 'Nu doresc tablou') {
            order.materialTablou = undefined;
            validators.materialTablou = order.materialTablou !== undefined;
            validators.dimensiuneTablou = true;
            validators.numarTablouri = true;
            validators.materialTablou = true;
        } else {
            order.materialTablou = evt;
            validators.dimensiuneTablou = order.materialTablou !== undefined && order.dimensiuneTablou !== undefined && order.dimensiuneTablou.length > 0 && /([0-9]+x[0-9]+)/.test(order.dimensiuneTablou);
            validators.numarTablouri = order.numarTablouri !== undefined && String(order.numarTablouri).length > 0 && /^\d+$/.test(String(order.numarTablouri));
        }

        this.setState({order:order});
    }

    private onCutieStickChange = (evt: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        order.cutieStick = evt;
        this.setState({order:order});
    }

    private onMapaStickChange = (evt: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        order.mapaStick = evt;
        this.setState({order:order});
    }

    private onDimensiuneTablouChange = (evt: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        let validators: Validators = this.state.validators;
        order.dimensiuneTablou = evt.target.value;
        validators.dimensiuneTablou = order.materialTablou !== undefined && order.dimensiuneTablou !== undefined && order.dimensiuneTablou.length > 0 && /([0-9]+x[0-9]+)/.test(order.dimensiuneTablou);
        this.setState({order:order});
    }

    private onNumarTablouriChange = (evt: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        let validators: Validators = this.state.validators;
        order.numarTablouri = evt.target.value;
        validators.numarTablouri = order.numarTablouri !== undefined && String(order.numarTablouri).length > 0 && /^\d+$/.test(String(order.numarTablouri));
        this.setState({order:order});
    }

    private onColtareMetalChanged = (evt: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        if (order.album !== undefined) {
            order.album.coltareMetal = evt;
        }
        this.setState({order:order});
    }

    private onMentiuniChange = (evt: any) => {
        let order:OrderAlbum = this.state.order !== undefined ? this.state.order : {};
        order.mentiuni = evt.target.value;
        this.setState({order:order});
    }
}

export default withRouter(OrderView);