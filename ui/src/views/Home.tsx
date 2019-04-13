import * as React from 'react';
import { ContentBox } from 'src/components/ContentBox';
import ViewContainer from 'src/components/ViewContainer';
import MessageBox from 'src/components/MessageBox';
import MCarousel from 'src/components/Carousel';
import { Image, GET_GaleryPhotosFromFolder, DIRECTORY_CAROUSEL, BASE_LINK_IMAGES, FACEBOOK_LINK } from 'src/service/client';
import { LoadComponent } from 'src/components/LoadComponent';

interface IHomeViewState { 
    showOrderSuccessDialog: boolean;
    carouselImages?: Image[];
    loading: boolean;
}

class HomeView extends React.Component<any, IHomeViewState> {

    public constructor (props: any) {
        super(props);

        this.state = {
            showOrderSuccessDialog:  this.props.location.state && this.props.location.state.showOrderSuccessDialog !== undefined ? this.props.location.state.showOrderSuccessDialog : false,
            loading: true
        };
    }

    async loadData () {
        await GET_GaleryPhotosFromFolder(DIRECTORY_CAROUSEL).then((res) => {
            if (res && res.data && res.data.body) {
                let images: Image[] = res.data.body.map((fileName: string) => {
                    let image: Image = {
                        fileName: fileName,
                        path: BASE_LINK_IMAGES + '/' + DIRECTORY_CAROUSEL
                    }

                    return image;
                });

                this.setState({carouselImages: images});
            }
        });
    }

    componentWillMount () {
        this.loadData().then(()=>{this.setState({loading: false})});
    }

    private displayTile = (title: string, image: string, className: string, onClick:()=>void) => {
        return (
            <div className={className}>
                <ContentBox 
                    title={title}
                    content=''
                    backgroundImage={image}
                    width='100%'
                    onButtonClick={onClick}
                />
            </div>
        );
    }

    private displayFacebookButton = (onClick: () => void):JSX.Element => (
        <div className='fb-button center-container margin-top-45'>
            <img src='/facebooklogo.svg' onClick={onClick}/>
        </div>
    )

    render () {

        if (this.state.loading) {
            return <LoadComponent />
        }

        let carouselImages: string[] = [];
        if (this.state.carouselImages)
            carouselImages = this.state.carouselImages.map ((image: Image) => {
                return image.path + '/Icons/' + image.fileName;
            });

        return (
            <>
                <MessageBox show={this.state.showOrderSuccessDialog} title='Comanda efectuata' message='Comanda dumneavoastra a fost efectuata cu success.' onCloseClick={() => {this.setState({showOrderSuccessDialog: false})}}/>
                <ViewContainer>
                    <div className='margin-top-45 noselect'>
                        <div className='container-grid'>
                            <div className='HomeCarousel'>
                                { this.state.loading === false ? <MCarousel images={carouselImages} /> : <> </> }
                            </div>

                            {this.displayTile('Albume', '/images/home/albume.jpg', 'Albume', ()=>{this.props.history.push('/albume')})}
                            {this.displayTile('Cutii Albume', '/images/home/cutiialbume.jpg', 'CutiiAlbume', ()=>{this.props.history.push('/cutiialbume')})}

                            {this.displayTile('Cutii stick', '/images/home/cutiilemn.jpg', 'CutiiStickuri', ()=>{this.props.history.push('/cutiistickuri')})}
                            {this.displayTile('Mape stick', '/images/home/cutiistickuri.jpg', 'MapeStickuri', ()=>{this.props.history.push('/mapestickuri')})}
                            {this.displayTile('Printuri', '/images/home/login-image.jpg', 'Printuri', ()=>{this.props.history.push('/printuri')})}
                            {this.displayTile('Tablouri', '/images/home/tablouri.jpg', 'Tablouri', ()=>{this.props.history.push('/tablouri')})}
                        </div>

                        {this.displayFacebookButton(() => {
                            window.location.href = FACEBOOK_LINK;
                        })}
                    </div>
                </ViewContainer>
            </>
        );
    }

}

export default HomeView;