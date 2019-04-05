import * as React from 'react';
import { ContentBox } from 'src/components/ContentBox';
import ViewContainer from 'src/components/ViewContainer';
import MessageBox from 'src/components/MessageBox';
import MCarousel from 'src/components/Carousel';

interface IHomeViewState { 
    showOrderSuccessDialog: boolean;
}

class HomeView extends React.Component<any, IHomeViewState> {

    public constructor (props: any) {
        super(props);

        this.state = {
            showOrderSuccessDialog:  this.props.location.state && this.props.location.state.showOrderSuccessDialog !== undefined ? this.props.location.state.showOrderSuccessDialog : false
        };
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

    render () {
        return (
            <>
                <MessageBox show={this.state.showOrderSuccessDialog} title='Comanda efectuata' message='Comanda dumneavoastra a fost efectuata cu success.' onCloseClick={() => {this.setState({showOrderSuccessDialog: false})}}/>
                <ViewContainer>
                    <div className='margin-top-45'>
                        <div className='container-grid'>
                            {this.displayTile('Albume', '/images/albume/DSC_2170.jpg', 'Albume', ()=>{this.props.history.push('/albume')})}
                            {this.displayTile('Cutii Albume', '/images/home/cutiialbume.jpg', 'CutiiAlbume', ()=>{this.props.history.push('/cutiialbume')})}

                            {this.displayTile('Cutii stickuri', '/images/home/cutiilemn.jpg', 'CutiiStickuri', ()=>{this.props.history.push('/cutiistickuri')})}
                            {this.displayTile('Mape stickuri', '/images/home/cutiistickuri.jpg', 'MapeStickuri', ()=>{this.props.history.push('/mapestickuri')})}
                            {this.displayTile('Printuri', '/images/home/login-image.jpg', 'Printuri', ()=>{this.props.history.push('/printuri')})}
                            {this.displayTile('Tablouri', '/images/albume/tablouri.jpg', 'Tablouri', ()=>{this.props.history.push('/tablouri')})}

                            <div className='HomeCarousel'>
                                <MCarousel images={[
                                    '/Albume/DSC_2170.jpg',
                                    '/Albume/DSC_2177.jpg',
                                    '/Albume/DSC_2184.jpg',
                                    '/Albume/DSC_2188.jpg',
                                    '/Albume/DSC_2196.jpg',
                                    '/Albume/DSC_2200.jpg',
                                    '/Albume/DSC_2204.jpg',
                                    '/Albume/DSC_2206.jpg'
                                    ]} 
                                />
                            </div>
                        </div>
                    </div>
                </ViewContainer>
            </>
        );
    }

}

export default HomeView;