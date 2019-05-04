import * as React from 'react';
import { withRouter } from 'react-router';
import { OrderAlbum, POST_orderAlbum } from 'src/service/client';
import ViewContainer from 'src/components/ViewContainer';
import OrderContainer from 'src/components/OrderContainer';
import Error from 'src/components/Error';
import { LoadComponent } from 'src/components/LoadComponent';

interface IConfirmareComandaState {
    order?: OrderAlbum;
    error?: string;

    loading: boolean;
}

class ConfirmareComanda extends React.Component<any, IConfirmareComandaState> {

    public constructor (props: any) {
        super(props);
        
        this.state = this.props.location.state;
    }

    private onConfirmClick = () => {
        let token: any = localStorage.getItem('token');
        this.setState({loading:true}, () => {

            if (this.state.order && token)
            POST_orderAlbum(token, this.state.order).then((res) => {

                if (res.data.code === 201) {
                    this.props.history.push('/success');
                } else {
                    this.setState({error: res.data.message});
                }

            }).catch((err) => {
                    this.setState({error: err});
            });

        });
    }

    render () {

        if (this.state.loading)
            return <LoadComponent />

        return (
            <ViewContainer>
                {this.state.order ? 
                    <div className='confirm-order-view bottom-shadow'>
                        <div className='center-container form-title'>
                            <h1> Confirmare Comanda </h1>
                        </div>
                        {this.state.error !== undefined ? 
                            <Error title='Comanda nu poate fii efectuata' message={this.state.error} onClose={()=>{this.setState({error: undefined})}}/> :
                            <> </>
                        }
                        <OrderContainer order={this.state.order} previewOnly={false} showClientInfo={true} showDates={false}/>
                        <div className='button-container'>                   
                            <button className='center-container' onClick={() => {this.props.history.push('/order')}}>
                                <i className="material-icons">keyboard_arrow_left</i>
                                <span> Inapoi </span>
                            </button>
                            <button className='center-container' onClick={this.onConfirmClick}> 
                                <span> Confirmare </span>
                                <i className="material-icons">keyboard_arrow_right</i>
                            </button>
                        </div>
                    </div> 
                : <> ERROR </>}
            </ViewContainer>
        );
    }
}

export default withRouter(ConfirmareComanda);