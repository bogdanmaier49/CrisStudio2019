import * as React from 'react';
import { ContentBox } from 'src/components/ContentBox';
import ViewContainer from 'src/components/ViewContainer';
import { Grid, Col, Row } from 'react-bootstrap';
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

    private displayTile = (title: string, image: string, md: number, onClick:()=>void) => {
        return (
            <Col xs={12} md={md} className='margin-top-25'>
                <ContentBox 
                    title={title}
                    content=''
                    backgroundImage={image}
                    width='100%'
                    onButtonClick={onClick}
                />
            </Col>
        );
    }

    render () {
        return (
            <>
                <MessageBox show={this.state.showOrderSuccessDialog} title='Comanda efectuata' message='Comanda dumneavoastra a fost efectuata cu success.' onCloseClick={() => {this.setState({showOrderSuccessDialog: false})}}/>
                <ViewContainer>
                        <Grid className='width900px'>

                            <Row>
                                {this.displayTile('Albume', '/images/albume/DSC_2170.jpg', 6, ()=>{this.props.history.push('/albume')})}
                                {this.displayTile('Cutii Albume', '/images/home/cutiialbume.jpg', 6, ()=>{this.props.history.push('/cutiialbume')})}
                            </Row>
                            <Row>
                                {this.displayTile('Cutii stickuri', '/images/home/cutiilemn.jpg', 3, ()=>{this.props.history.push('/cutiistickuri')})}
                                {this.displayTile('Mape stickuri', '/images/home/cutiistickuri.jpg', 3, ()=>{this.props.history.push('/mapestickuri')})}
                                {this.displayTile('Printuri', '/images/home/login-image.jpg', 3, ()=>{this.props.history.push('/printuri')})}
                                {this.displayTile('Tablouri', '/images/albume/tablouri.jpg', 3, ()=>{this.props.history.push('/tablouri')})}
                            </Row>

                            <Row>
                                <Col sm={12} md={12} className='margin-top-45'>
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
                                </Col>
                            </Row>

                        </Grid>

                </ViewContainer>
            </>
        );
    }

}

export default HomeView;