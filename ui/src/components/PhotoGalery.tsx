import * as React from 'react'

interface IPhotoGaleryProps {
    images: string[];
    imagesPerPage?: number;
    className?: string;
}

interface IPhotoGaleryState {
    currentPage: number;
}

export default class PhotoGalery extends React.Component<IPhotoGaleryProps, IPhotoGaleryState> {

    public constructor (props: IPhotoGaleryProps) {
        super (props);

        this.state = {
            currentPage: 1
        };
    }

    renderPhotos = (): JSX.Element[] => {
        let imagesPerPage: number = this.props.imagesPerPage ? this.props.imagesPerPage : 4;

        const indexOfLastImage = this.state.currentPage * imagesPerPage;
        const indexOfFirstImage = indexOfLastImage - imagesPerPage;
        const currentImages = this.props.images.slice(indexOfFirstImage, indexOfLastImage);

        return currentImages.map((image: string, index: number) => {
            return (
                <div className='image-container bottom-shadow' key={'photo-' + index}>
                    <img src={image} />
                </div>
            );
        })
    };

    onNextPhotoClick = () => {
        let nextPage: number = this.state.currentPage;
        let imagesPerPage: number = this.props.imagesPerPage ? this.props.imagesPerPage : 4;

        if (nextPage < imagesPerPage - 1) {
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
        )
    }
}
