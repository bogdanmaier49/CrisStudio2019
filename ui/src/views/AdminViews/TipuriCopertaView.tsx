import * as React from 'react'
import { GET_tipCoperta, TipCoperta } from 'src/service/client';
import TipCopertaTable from 'src/components/TipCopertaTable';
import { LoadComponent } from 'src/components/LoadComponent';

interface ITipuriCopertaViewProps {
    token: string;
}

interface ITipuriCopertaViewState {
    tips?: TipCoperta[],
    loading: boolean
}

export default class TipCopertaView extends React.Component<ITipuriCopertaViewProps, ITipuriCopertaViewState> {

    public constructor (props: ITipuriCopertaViewProps) {
        super (props);

        this.state = {
            loading: true
        };
    }

    private async loadData () {
        await GET_tipCoperta().then((res: any) => {
            this.setState({tips: res.data.body});
        });
    }

    componentDidMount () {
        this.loadData().then(() => {this.setState({loading: false})})
    }

    render() {

        if (this.state.loading) {
            return <LoadComponent />
        }

        if (this.state.tips)
            return (
                <div>
                    <TipCopertaTable tipuriCoperta={this.state.tips} onUserClick={(tip: TipCoperta) => {
                        console.log(tip);
                    }} />
                </div>
            )

        return (<h4> Eroare la afisarea materialelor de coperta </h4>);
    }
}
