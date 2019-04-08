import * as React from 'react';
import { withRouter } from 'react-router';
import ViewContainer from 'src/components/ViewContainer';
import { Subtitle } from 'src/components/Subtitle';
import PhotoGalery from 'src/components/PhotoGalery';
import { Image, GET_GaleryPhotosFromFolder, BASE_LINK_IMAGES } from 'src/service/client';
import FullScreenImage from 'src/components/FullScreenImage';
import Overlay from 'src/components/Overlay';
import { LoadComponent } from 'src/components/LoadComponent';

interface IContentViewState {
    galeryPhotos?: Image[];
    showImage?: boolean;
    imgSrc?: string;

    loading: boolean;
}

class ContentView extends React.Component<any, IContentViewState> {

    public constructor (props: any) {
        super(props);

        this.state = {
            loading: true
        }
    }

    private async loadData () {
        if (this.props.imagesFolder) {
            await GET_GaleryPhotosFromFolder (this.props.imagesFolder).then((res: any) => {
                if (res && res.data && res.data.body) {
                    let images: Image[] = res.data.body.map((fileName: string) => {
                        let image: Image = {
                            fileName: fileName,
                            path: BASE_LINK_IMAGES + '/' + this.props.imagesFolder
                        }
    
                        return image;
                    });
    
                    this.setState({galeryPhotos: images});
                }
            })
        }
    }

    public componentWillMount () {
        this.loadData().then(() => {this.setState({loading: false});});
    }

    public ContentViewGalery = ():JSX.Element => (
        <>
            <Subtitle title='Galerie' />

            <PhotoGalery images={this.state.galeryPhotos ? this.state.galeryPhotos : []} onImageClick={(image: Image) => {
                this.setState({
                    imgSrc: image.path + '/Full/' + image.fileName,
                    showImage: true
                });
            }}/>
        </>
    )

    private displayImage = () => {
        return (
            <Overlay>
                <FullScreenImage title={this.props.title} imagePath={this.state.imgSrc ? this.state.imgSrc : ''} onCloseClick={() => {
                    this.setState({showImage: false, imgSrc: ''});
                }} />
            </Overlay>
        );
    }

    render () {

        if (this.state.loading) {
            return <LoadComponent />
        }

        return(
            <>
                {this.state.showImage ? this.displayImage() : <> </>}
                <ViewContainer>
                    <div className='content-view margin-top-45 bottom-shadow'>
                        <div className='content-view-title center-container width100 noselect'>
                            <h1> {this.props.title} </h1>
                        </div>

                        <div className='content-view-content width100'>
                            <p className='width100 margin-bottom-45'> {this.props.content} </p>

                            {
                                this.props.children
                            }
                            
                            {this.props.imagesFolder ? <this.ContentViewGalery /> : <> </>}

                        </div>

                        { ! this.props.dontShowButton ? <div className='center-container width100 margin-top-45'>
                            <button className='order-button' onClick={() => {this.props.history.push('/order')}}> Comanda </button>
                        </div> : <> </> }
                        
                    </div>
                </ViewContainer>
            </>
        )
    }

}

export default withRouter(ContentView);