import * as React from 'react';
import { MaterialCoperta, BASE_LINK_IMAGES } from 'src/service/client';

interface IMaterialCopertaProps {
    materialCoperta: MaterialCoperta;
    onUpdateClick: (modifiedMat: MaterialCoperta) => void;
}

interface IMaterialCopertaState {
    materialCoperta: MaterialCoperta;
}

export default class MaterialCopertaCard extends React.Component<IMaterialCopertaProps, IMaterialCopertaState> {

    public constructor (props: IMaterialCopertaProps) {
        super(props);

        this.state = {
            materialCoperta: this.props.materialCoperta
        };
    }

    private onNumeChange = (event:any) => {
        let newMat: MaterialCoperta = this.state.materialCoperta;
        newMat.nume = event.target.value;
        this.setState ({materialCoperta: newMat});
    }   

    private onDescriereChange = (event: any) => {
        let newMat: MaterialCoperta = this.state.materialCoperta;
        newMat.descriere = event.target.value;
        this.setState ({materialCoperta: newMat});
    }

    private onImageChange = (event: any) => {
        let newMat: MaterialCoperta = this.state.materialCoperta;
        newMat.imagine = event.target.value;
        this.setState ({materialCoperta: newMat});
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

        let imgStyle = {
            width: '100px',
            height: '100px'

        }
        return (
            <div style={style} className='bottom-shadow'>
                <h4> Id: {this.state.materialCoperta.id} </h4>
                <img style={imgStyle} src={BASE_LINK_IMAGES + '/MaterialeIcons/' + this.state.materialCoperta.imagine}/>
                <div>
                    <h4> Nume </h4>
                    <input value={this.state.materialCoperta.nume ? this.state.materialCoperta.nume : ''} onChange={this.onNumeChange}/>
                </div>
                <div>
                    <h4> Descriere </h4>
                    <input value={this.state.materialCoperta.descriere ? this.state.materialCoperta.descriere : ''} onChange={this.onDescriereChange}/>
                </div>
                <div>
                    <h4> Imagine </h4> 
                    <input value={this.state.materialCoperta.imagine ? this.state.materialCoperta.imagine : ''} onChange={this.onImageChange}/>
                </div>
                <div>
                    <button onClick={() => this.props.onUpdateClick(this.state.materialCoperta)} > Update </button>
                </div>
            </div>
        );
    }

}