import * as React from 'react';
import { withRouter } from 'react-router';
import ScrollContainer from 'src/components/ScrollContainer';
import { GET_materialeCoperta, MaterialCoperta, TipCoperta, GET_tipCoperta, BASE_LINK_MATERIALE_COPERTA, BASE_LINK_TIP_COPERTA, DimensiuniCoperta, GET_dimensiuniCoperta, User, getUserFromToken, GET_AlbumeGaleryPhotos, Image, BASE_LINK_IMAGES, DIRECTORY_GALERY_ALBUME } from 'src/service/client';
import Card from 'src/components/Card';
import ContentView from './ContentView';
import Overlay from 'src/components/Overlay';
import FullScreenImage from 'src/components/FullScreenImage';
import PhotoGalery from 'src/components/PhotoGalery';
import { Subtitle } from 'src/components/Subtitle';
import { LoadComponent } from 'src/components/LoadComponent';

interface IAlbumeViewState {
    materialeCoperta?: MaterialCoperta[];
    tipuriCoperta?: TipCoperta[];
    dimensiuni?: DimensiuniCoperta[];
    user?: User;
    showImage: boolean;
    imgSrc?: string;
    imgTitle?: string;
    loading: boolean;
    galeryPhotos?: Image[];
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

        await GET_AlbumeGaleryPhotos().then((res: any) => {
            if (res) {
                let images: Image[] = res.data.body.map((fileName: string) => {
                    let image: Image = {
                        fileName: fileName,
                        path: BASE_LINK_IMAGES + '/' + DIRECTORY_GALERY_ALBUME
                    }

                    return image;
                });

                this.setState({galeryPhotos: images});
            }
        })
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

    private renderMateriale = (materiale: MaterialCoperta[]): JSX.Element[] => {
        let result = materiale
        .sort((mat1: MaterialCoperta, mat2: MaterialCoperta) => {
            let mat1Name: string = mat1.nume ? mat1.nume : '';
            let mat2Name: string = mat2.nume ? mat2.nume : '';

            if (mat1Name < mat2Name) return -1;
            if (mat1Name > mat2Name) return 1;

            return 0;
        })
        .map((mat:MaterialCoperta, index: number) => {
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
                                imgSrc: BASE_LINK_MATERIALE_COPERTA + '/Full/' + mat.imagine,
                                showImage: true, 
                                imgTitle: mat.nume
                            });
                        }}
                    />
                );
            
            return <> </>
        });

        return result;
    }

    private renderTipuri = (tipuriCoperta: TipCoperta[]): JSX.Element[] => {
        return tipuriCoperta
        .sort((tip1: TipCoperta, tip2: TipCoperta) => {
            let tip1Nume: string = tip1.nume ? tip1.nume : '';
            let tip2Nume: string = tip2.nume ? tip2.nume : '';

            if (tip1Nume < tip2Nume) return -1;
            if (tip1Nume > tip2Nume) return 1;

            return 0;
        })
        .map((tip:TipCoperta, index: number) => {
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
                                imgSrc: BASE_LINK_TIP_COPERTA + '/Full/' + tip.imagine,
                                showImage: true,
                                imgTitle: tip.nume
                            });
                        }}
                    />
                );
            
            return <> </>
        })   
    }

    render () {
        if (this.state.loading === true) {
            return <LoadComponent />
        }

        return (
            <>
            
            {this.state.showImage ? this.displayImage() : <> </>}
            <ContentView title='Albume'>
                <div className='m-row m-flex-align-center width100 m-flex-center-vertical margin-top-45'>
                    <div className='m-small-content'>

                        <Subtitle title='Materiale de coperta' />

                        <ScrollContainer>
                            {this.state.materialeCoperta !== undefined ? 
                                this.renderMateriale(this.state.materialeCoperta)  
                            : <> </>}
                        </ScrollContainer>
                    </div>

                    <div className='m-small-content'>

                        <Subtitle title='Tipuri de coperta' />
                        
                        <ScrollContainer>
                            {this.state.tipuriCoperta !== undefined ? 
                                this.renderTipuri(this.state.tipuriCoperta)
                            : <> </>}
                        </ScrollContainer>
                    </div>

                    <div className='m-small-content'>

                        <Subtitle title='Dimensiuni albume' />


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

                        <PhotoGalery images={this.state.galeryPhotos ? this.state.galeryPhotos : []} onImageClick={(image: Image) => {
                            this.setState({
                                imgSrc: image.path + '/Full/' + image.fileName,
                                showImage: true,
                                imgTitle: 'Productie Albume'
                            });
                        }}/>
                    </div>
                </div>
            </ContentView>
            </>
        );
    }
}

export default withRouter(AlbumeView);