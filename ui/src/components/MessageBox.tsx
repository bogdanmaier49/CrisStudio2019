import * as React from 'react';
import { Modal } from 'react-bootstrap';

interface IMessageBoxProps {
    title: string;
    message?: string;
    onContinueClick?: () => any;
    onCloseClick: () => any;
    show: boolean;
}

export default class MessageBox extends React.Component<IMessageBoxProps> {

    constructor (props: IMessageBoxProps) {
        super(props);
    }

    render () {
        return (
            <Modal show={this.props.show} onHide={this.props.onCloseClick}>
                <Modal.Header closeButton>
                <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.message ? <p> {this.props.message} </p> : <> </> }
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    {this.props.onContinueClick ? <button onClick={this.props.onContinueClick}>
                        Continua
                    </button> : <> </> }
                    <button onClick={this.props.onCloseClick}>
                        Inchide
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }

}