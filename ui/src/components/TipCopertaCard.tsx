import * as React from 'react';
import { TipCoperta } from 'src/service/client';

interface IMaterialCopertaProps {
    tipCoperta: TipCoperta;
}

interface IMaterialCopertaState {
    tipCoperta: TipCoperta;
}

export default class TipCopertaCard extends React.Component<IMaterialCopertaProps, IMaterialCopertaState> {

    public constructor (props: IMaterialCopertaProps) {
        super(props);

        this.state = {
            tipCoperta: this.props.tipCoperta
        };
    }

    private onNumeChange = (event:any) => {
        let newTip: TipCoperta = this.state.tipCoperta;
        newTip.nume = event.target.value;
        this.setState ({tipCoperta: newTip});
    }   

    private onDescriereChange = (event: any) => {
        let newTip: TipCoperta = this.state.tipCoperta;
        newTip.descriere = event.target.value;
        this.setState ({tipCoperta: newTip});
    }

    private onImageChange = (event: any) => {
        let newTip: TipCoperta = this.state.tipCoperta;
        newTip.imagine = event.target.value;
        this.setState ({tipCoperta: newTip});
    }

    public render () {
        let style = {
            border: '1px solid lightgray',
            width: '100%',
            marginBottom: '10px',
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'space-evenly',
            padding: '10px'
        }
        return (
            <div style={style} className='bottom-shadow'>
                <h4> Id: {this.state.tipCoperta.id} </h4>
                <div>
                    <h4> Nume </h4>
                    <input value={this.state.tipCoperta.nume ? this.state.tipCoperta.nume : ''} onChange={this.onNumeChange}/>
                </div>
                <div>
                    <h4> Descriere </h4>
                    <input value={this.state.tipCoperta.descriere ? this.state.tipCoperta.descriere : ''} onChange={this.onDescriereChange}/>
                </div>
                <div>
                    <h4> Imagine </h4> 
                    <input value={this.state.tipCoperta.imagine ? this.state.tipCoperta.imagine : ''} onChange={this.onImageChange}/>
                </div>
            </div>
        );
    }

}