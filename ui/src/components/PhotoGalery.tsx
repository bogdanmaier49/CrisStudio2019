import * as React from 'react'

interface IPhotoGaleryProps {
    title: string;
    images: string[];
}

export default class PhotoGalery extends React.Component<IPhotoGaleryProps> {

    public constructor (props: IPhotoGaleryProps) {
        super (props);
    }

    render() {
        return (
            <div className='photo-galery'>
                <h2> {this.props.title} </h2>
                <div className='photo-galery'>
                    
                </div>
            </div>
        )
    }
}
