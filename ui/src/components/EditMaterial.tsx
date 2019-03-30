import * as React from 'react';
import { MaterialCoperta, BASE_LINK_MATERIALE_COPERTA } from 'src/service/client';
import { Modal } from 'react-bootstrap';
import Error from './Error';

interface IEditMaterialeProps {
    material: MaterialCoperta;
    show?: boolean;
    onClose: () => void;
    onSubmit: (newMat: MaterialCoperta) => void;
    error?: string;
}

interface IEditMaterialeState {
    mat: MaterialCoperta;
    validDesc: boolean;
}

export default class EditMateriale extends React.Component <IEditMaterialeProps, IEditMaterialeState> {

    public constructor (props: IEditMaterialeProps) {
        super(props);

        
        this.state = {
            mat: props.material,
            validDesc: true
        };
    }

    public validateDescription = (): boolean => {
        if (this.state.mat.descriere && this.state.mat.descriere.length > 20) {
            return false;
        }

        return true;
    }

    public render () { 
        let invalidInputStyle = {
            border: '1px solid red'
        };

        let imageStyle = {
            width:'330px',
            padding: '10px',
            border: '1px solid lightgray'
        };

        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                <Modal.Title> {'Modifica ' + this.props.material.nume} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='m-flex-column'>
                        {this.props.error ? 
                            <Error title='Materialul nu poate fi modificat' message={this.props.error} onClose={() => {}}/> : 
                            <> </> 
                        }
                        <h4> Nume </h4>
                        <input type='text' value={this.state.mat.nume} onChange={(evt) => {
                            let newMat: MaterialCoperta = this.state.mat;
                            newMat.nume = evt.target.value;
                            this.setState({mat: newMat});
                        }}/>

                        <h4> Descriere </h4>
                        <input style={this.state.validDesc === false ? invalidInputStyle : {}} type='text' value={this.state.mat.descriere} onChange={(evt) => {
                            let newMat: MaterialCoperta = this.state.mat;
                            newMat.descriere = evt.target.value;
                            this.setState({mat: newMat, validDesc: this.validateDescription()});
                        }}/>

                        <h4> Imagine </h4>
                        <div className='center-container'>
                            <img style={imageStyle} src={BASE_LINK_MATERIALE_COPERTA + '/Icons/' + this.state.mat.imagine} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={this.props.onClose}>
                        Inchide
                    </button>
                    <button onClick={() => {
                        if (this.state.validDesc) {
                            let mat: MaterialCoperta = this.state.mat;
                            this.props.onSubmit(mat);
                        }
                    }}>
                        Modifica
                    </button>
                </Modal.Footer>
            </Modal>
        );
        
    }

}