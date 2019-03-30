import * as React from 'react';

interface ICardProps { 
    title?: string;
    description?: string;
    imagePath: string;
    onClick?: () => any;
    width?: string;
    height?: string;
}

export default class Card extends React.Component <ICardProps> {
    public constructor (props: ICardProps) {
        super(props);
    }

    render () {
        let imgStyle = {
            width: this.props.width !== undefined ? this.props.width : '100%',
            height: this.props.width !== undefined ? this.props.width : '100%',
            backgroundImage: 'url(' + this.props.imagePath + ')'
        }

        let style = {
            height: 'fit-content',
            padding: '10px',
            width: 'fit-content'
        }

        return (
            <div className='item-card bottom-shadow' onClick={this.props.onClick} style={style}>
                {/* <img style={imgStyle} src={this.props.imagePath}/> */}
                <div style={imgStyle} />
                { this.props.title ? <div className='item-card-title center-container'>
                    <h5> {this.props.title} </h5>
                </div> : <> </> }
                { this.props.description ? <div className='item-card-description center-container'>
                    <p> {this.props.description} </p>
                </div> : <> </> }
            </div>
        );
    }
}