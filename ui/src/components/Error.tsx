import * as React from 'react';

interface IErrorProps {
    title: string;
    message: string;
    onClose: () => void;
}

export default class Error extends React.Component <IErrorProps> {

    public constructor (props: IErrorProps) {
        super(props);
    }

    render () {
        return (
            <div className='error'>
                <h3> {this.props.title} </h3>
                <div className='error-message'>
                    <p> {this.props.message} </p>
                </div>
                <a className='error-close-button' onClick={this.props.onClose}> <i className="material-icons">close</i> </a>
            </div>
        );
    }

}