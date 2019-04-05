import * as React from 'react';
import { Image } from 'src/service/client';

interface IPhotoGaleryProps {
    images: Image[];
    imagesPerPage?: number;
    className?: string;
    onImageClick: (image: Image) => void;
}

interface IPhotoGaleryState {
    currentPage: number;
    imageToDisplay?: Image;
}

export default class PhotoGalery extends React.Component<IPhotoGaleryProps, IPhotoGaleryState> {

    public constructor (props: IPhotoGaleryProps) {
        super (props);

        this.state = {
            currentPage: 1
        };
    }

    onImageIsClicked = (image: Image) => {
        this.setState({
            imageToDisplay: image
        });
    }

    renderPhotos = (): JSX.Element[] => {
        let imagesPerPage: number = this.props.imagesPerPage ? this.props.imagesPerPage : 4;

        const indexOfLastImage = this.state.currentPage * imagesPerPage;
        const indexOfFirstImage = indexOfLastImage - imagesPerPage;
        const currentImages = this.props.images.slice(indexOfFirstImage, indexOfLastImage);

        return currentImages.map((image: Image, index: number) => {
            return (
                <div className='image-container bottom-shadow' key={'photo-' + index} onClick={() => {this.props.onImageClick(image)}}>
                    <img src={image.path + '/Icons/' + image.fileName} />
                </div>
            );
        })
    };

    onNextPhotoClick = () => {
        let nextPage: number = this.state.currentPage;

        if (nextPage < this.calculateTotalNumberOfPages()) {
            nextPage ++;
        }
        this.setState({
            currentPage: nextPage
        })
    }

    onPrevPhotoClick = () => {
        let prevPage: number = this.state.currentPage;
        if (prevPage > 1) {
            prevPage --;
        }
        this.setState({
            currentPage: prevPage
        })
    }

    private calculateTotalNumberOfPages = () => {
        let imagesPerPage: number = this.props.imagesPerPage ? this.props.imagesPerPage : 4;
        return Math.ceil(this.props.images.length / imagesPerPage);
    }

    private PaginationTag = () => (
        // <div className='pagination-container'>
            <div className='pagination'> 
                {this.state.currentPage} / {this.calculateTotalNumberOfPages()} 
            </div>
        // </div>
    )

    render() {

        let className = this.props.className ? ' ' + this.props.className : '';

        return (
            <>
            <div className={'photo-galery' + className}>
                <div className='photo-galery-content'>
                    {this.renderPhotos()}
                </div>
                <div className='control-burttons'>
                    <button onClick={this.onPrevPhotoClick}> <i className="material-icons">keyboard_arrow_left</i> </button>
                    <this.PaginationTag />
                    <button onClick={this.onNextPhotoClick}> <i className="material-icons">keyboard_arrow_right</i> </button>
                </div>
            </div>
            </>
        )
    }
}
