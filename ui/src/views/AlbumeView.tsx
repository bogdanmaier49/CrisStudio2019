import * as React from 'react';
import { withRouter } from 'react-router';
import ScrollContainer from 'src/components/ScrollContainer';
import { GET_materialeCoperta, MaterialCoperta, TipCoperta, GET_tipCoperta, BASE_LINK_MATERIALE_COPERTA, BASE_LINK_TIP_COPERTA, DimensiuniCoperta, GET_dimensiuniCoperta, User, getUserFromToken } from 'src/service/client';
import Card from 'src/components/Card';
import ContentView from './ContentView';
import Overlay from 'src/components/Overlay';
import FullScreenImage from 'src/components/FullScreenImage';
import PhotoGalery from 'src/components/PhotoGalery';
import { Subtitle } from 'src/components/Subtitle';

interface IAlbumeViewState {
    materialeCoperta?: MaterialCoperta[];
    tipuriCoperta?: TipCoperta[];
    dimensiuni?: DimensiuniCoperta[];
    user?: User;
    showImage: boolean;
    imgSrc?: string;
    imgTitle?: string;
    loading: boolean; 
}

class AlbumeView extends React.Component <any, IAlbumeViewState> {
    public constructor (props: any) {
        super(props);

        this.state = {
            materialeCoperta: undefined,
            showImage: false,
            loading: true
        };
    }

    private async loadData () {
        await GET_materialeCoperta().then((res: any) => {
            if (res) {
                let materialeCoperta: MaterialCoperta[] = res.data.body;
                if (materialeCoperta) {
                    this.setState({materialeCoperta: materialeCoperta});
                }
            }
        });

        await GET_tipCoperta().then((res: any) => {
            if (res) {
                let tipCoperta: TipCoperta[] = res.data.body;
                if (tipCoperta) {
                    this.setState({tipuriCoperta: tipCoperta});
                }
            }
        });

        await GET_dimensiuniCoperta().then((res: any) => {
            if (res) {
                let dim: TipCoperta[] = res.data.body;
                if (dim) {
                    this.setState({dimensiuni: dim});
                }
            }
        });
    }

    componentWillMount () {
        
        this.loadData().then(() => {this.setState({loading: false})});

        let token = localStorage.getItem('token');
        if (token) {
            getUserFromToken (token, 
                (user?: User) => {
                    if (user) {
                        this.setState({user: user});
                    } else {
                        localStorage.removeItem('token');
                    }
                },
                (err) => {
                    localStorage.removeItem('token');
                }
            );
        }
    }

    private displayImage = () => {
        return (
            <Overlay>
                <FullScreenImage title={this.state.imgTitle ? this.state.imgTitle : ''} imagePath={this.state.imgSrc ? this.state.imgSrc : ''} onCloseClick={() => {
                    this.setState({showImage: false, imgTitle: '', imgSrc: ''});
                }} />
            </Overlay>
        );
    }

    render () {
        if (this.state.loading === true) {
            return <h1> Incarcare Date ... </h1>
        }

        return (
            <>
            
            {this.state.showImage ? this.displayImage() : <> </>}
            <ContentView title='Albume'>
                <div className='m-row m-flex-align-center width100 m-flex-center-vertical margin-top-45'>
                    <div className='m-small-content'>

                        <Subtitle title='Materiale de coperta disponibile' />

                        <ScrollContainer>
                            {this.state.materialeCoperta !== undefined ? 
                                this.state.materialeCoperta.map((mat:MaterialCoperta, index: number) => {
                                    if (mat.imagine)
                                        return (
                                            <Card 
                                                key={mat.nume + '_' + index}
                                                imagePath={BASE_LINK_MATERIALE_COPERTA + '/Icons/' + mat.imagine}
                                                title={mat.nume}
                                                description={mat.descriere}
                                                width='100px'
                                                height='150px'
                                                onClick={() => {
                                                    // Image to show on click
                                                    this.setState({
                                                        imgSrc: BASE_LINK_MATERIALE_COPERTA + '/Icons/' + mat.imagine,
                                                        showImage: true, 
                                                        imgTitle: mat.nume
                                                    });
                                                }}
                                            />
                                        );
                                    
                                    return <> </>
                                })   
                            : <> </>}
                        </ScrollContainer>
                    </div>

                    <div className='m-small-content'>

                        <Subtitle title='Tipuri de coperta disponibile' />
                        
                        <ScrollContainer>
                            {this.state.tipuriCoperta !== undefined ? 
                                this.state.tipuriCoperta.map((tip:TipCoperta, index: number) => {
                                    if (tip.imagine)
                                        return (
                                            <Card 
                                                key={tip.nume + '_' + index}
                                                imagePath={BASE_LINK_TIP_COPERTA + '/Icons/' + tip.imagine}
                                                title={tip.nume}
                                                description={tip.descriere}
                                                width='100px'
                                                height='150px'
                                                onClick={() => {
                                                    // Image to show on click
                                                    this.setState({
                                                        imgSrc: BASE_LINK_TIP_COPERTA + '/Icons/' + tip.imagine,
                                                        showImage: true,
                                                        imgTitle: tip.nume
                                                    });
                                                }}
                                            />
                                        );
                                    
                                    return <> </>
                                })   
                            : <> </>}
                        </ScrollContainer>
                    </div>

                    <div className='m-small-content'>

                        <Subtitle title='Dimensiuni albume disponibile' />


                        <div className='description'> Toate dimensiunie sunt exprimate in cm si reprezinta dimensiunea unui album inchis.</div>
                        <ScrollContainer>
                            {this.state.dimensiuni !== undefined ? 
                                this.state.dimensiuni.map((dim:DimensiuniCoperta, index: number) => {
                                    let marginIcon = {
                                        marginRight: '10px'
                                    }
                                    return (
                                        <div className='bottom-shadow dimensiuni-preview center-container' key={index}>
                                            <i style={marginIcon} className="material-icons">aspect_ratio</i>
                                            {dim.dimensiuni}
                                        </div>
                                    );
                                })   
                            : <> </>}
                        </ScrollContainer>
                    </div>
                                
                    <div className='m-small-content'>
                        <Subtitle title='Galerie Albume' />

                        <PhotoGalery images={[
                            '/images/home/image_3.jpg',
                            '/images/home/image_1.jpg',
                            '/images/home/image_5.jpg',
                            '/images/home/image_4.jpg',
                            '/images/home/image_5.jpg',
                            '/images/home/image_3.jpg',
                            '/images/home/image_1.jpg',
                            '/images/home/image_2.jpg',
                            '/images/home/image_4.jpg',
                            '/images/home/image_2.jpg'
                        ]} />
                    </div>
                </div>
            </ContentView>
            </>
        );
    }
}

export default withRouter(AlbumeView);