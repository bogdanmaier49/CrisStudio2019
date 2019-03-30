import * as React from 'react'; 

interface IFullScreenProps {
    title: string;
    imagePath: string;
    onCloseClick: () => any;
}

export default class FullScreenImage extends React.Component <IFullScreenProps> {
    
    public constructor (props: IFullScreenProps) {
        super (props);
    }

    render () {
        return (
            <div className='full-screen-image'>
                <h3> {this.props.title} </h3>
                <img src={this.props.imagePath} />
                <button onClick={this.props.onCloseClick}> Inchide </button>
            </div>
        );
    }

}