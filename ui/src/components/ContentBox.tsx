import * as React from 'react';

interface IContentBoxProps {
    title: string;
    content: string;
    width?: string;
    backgroundImage?: string;
    onButtonClick?: () => void;
}

export class ContentBox extends React.Component<IContentBoxProps> {
    public constructor (props: IContentBoxProps) {
        super(props);
    }

    public render () {

        let inlineStyle = {
            // backgroundImage: 'url(' + this.props.backgroundImage + ')',
            width: this.props.width !== undefined ? this.props.width : '400px'
        };

        return (
            <div className='content-box bottom-shadow' style={inlineStyle}>
                {this.props.backgroundImage && <img className='background' src={this.props.backgroundImage} /> }
                <div className='content-box-container'>
                    <div className='title center-container'>
                        <h1> {this.props.title} </h1>
                    </div>
                    <div className='center-container content-box-button-container'>
                        <button onClick={this.props.onButtonClick} className='center-container'> 
                        <i className="material-icons">arrow_forward_ios</i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}