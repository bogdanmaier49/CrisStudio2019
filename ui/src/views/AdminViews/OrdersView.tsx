import * as React from 'react'
import { OrderAlbum, GET_comenziAlbume, PATCH_orderAlbum } from 'src/service/client';
import OrderTable from 'src/components/OrderTable';
import MessageBox from 'src/components/MessageBox';
import OrderContainer from 'src/components/OrderContainer';

interface IOrdersViewProps {
    token: string;
}

interface IOrdersViewState {
    unfinsihedOrders?: OrderAlbum[];
    finishedOrders?: OrderAlbum[];

    error?: string;

    loading: boolean;

    orderToFinish ?: OrderAlbum;
    expandOrder ?: OrderAlbum;
}

export default class OrdersView extends React.Component<IOrdersViewProps, IOrdersViewState> {

    public constructor (props: IOrdersViewProps)  {
        super (props);

        this.state = {
            finishedOrders: undefined,
            unfinsihedOrders: undefined,
            error: undefined,
            loading: true,
            orderToFinish: undefined
        };
    }

    private async loadData () {
        await GET_comenziAlbume (this.props.token).then((res: any) => {
            if (res.data.code === 200 && res.data.body) {
                let orders: OrderAlbum[] = res.data.body;

                let fOrderns: OrderAlbum[] = orders.filter((order: OrderAlbum) => {
                    return order.dataTerminare;
                })

                let uOrderns: OrderAlbum[] = orders.filter((order: OrderAlbum) => {
                    return !order.dataTerminare;
                })

                this.setState({
                    unfinsihedOrders: uOrderns,
                    finishedOrders: fOrderns
                });
            } else {
                this.setState({error: 'comenzile nu pot fii incarcate'});
            }
        }).catch((err) => {
            this.setState({error: 'comenzile nu pot fii incarcate'});
        });
    }

    private async finishOrder (order: OrderAlbum) {
        if (order.id) {
            await PATCH_orderAlbum(this.props.token, order.id).then((res: any) => {
                this.setState({loading: true}, ()=> {               
                    this.loadData().then(
                        () => {
                            this.setState({loading: false});
                        }
                    )
                });
            })
        }
    }

    componentDidMount () {
        this.loadData().then(() => {this.setState({loading: false})});
    }

    render() {
        if (this.state.loading) {
            return <h4> Comenzile se incarca ... </h4>
        }

        if (this.state.finishedOrders && this.state.unfinsihedOrders) {
            return (
                <div>
                    { this.state.orderToFinish ? <MessageBox 
                        title = 'Finalizare comanda'
                        message = { 'Doriti sa finalizati comanda: ' + this.state.orderToFinish.id + ' ?' }
                        onCloseClick = {() => {this.setState({orderToFinish: undefined})}}
                        onContinueClick = {() => {
                            if (this.state.orderToFinish) {
                                this.finishOrder(this.state.orderToFinish).then(() => {this.setState({
                                    orderToFinish: undefined
                                })});
                            }
                        }}
                        show = {this.state.orderToFinish ? true : false} 
                        > 
                            <OrderContainer 
                                order={this.state.orderToFinish}
                                previewOnly = {true}
                                showClientInfo = {true}
                                showDates = {true}
                            />
                        </MessageBox>
                        :  
                        <> </> 
                    }

                    {
                        this.state.expandOrder ? 
                        <MessageBox title={'Comanda: ' + this.state.expandOrder.id} onCloseClick = {() => {this.setState({expandOrder: undefined})}} show = {this.state.expandOrder ? true : false} >
                            <OrderContainer 
                                order={this.state.expandOrder}
                                previewOnly = {false}
                                showClientInfo = {true}
                                showDates = {true}
                            />
                        </MessageBox> 
                        : <> </>
                    }

                    <h4> Comenzi Nefinalizate </h4>
                    <OrderTable orders={this.state.unfinsihedOrders} 
                        onViewDetailsClick={(order: OrderAlbum) => {
                            this.setState({expandOrder: order});
                        }} 
                        onFinishButtonClick={(order:OrderAlbum) => {
                            this.setState({orderToFinish: order});
                        }}
                    />

                    <h4> Comenzi Finalizate </h4>
                    <OrderTable orders={this.state.finishedOrders} onViewDetailsClick={(order: OrderAlbum) => {
                        this.setState({expandOrder: order});
                    }}/>
                </div>
            );
        }

        return <h4> Eroare la incarcarea comenzilor </h4>
    }
}
