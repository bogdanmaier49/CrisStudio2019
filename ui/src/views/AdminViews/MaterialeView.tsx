import * as React from 'react'
import { GET_materialeCoperta, MaterialCoperta } from 'src/service/client';
import MaterialeTable from 'src/components/MaterialeTable';

interface IMaterialeViewProps {
    token: string;
}

interface IMaterialeViewState {
    mats?: MaterialCoperta[],
    loading: boolean
}

export default class MaterialeView extends React.Component<IMaterialeViewProps, IMaterialeViewState> {

    public constructor (props: IMaterialeViewProps) {
        super (props);

        this.state = {
            loading: true
        };
    }

    private async loadData () {
        await GET_materialeCoperta().then((res: any) => {
            this.setState({mats: res.data.body});
        });
    }

    componentDidMount () {
        this.loadData().then(() => {this.setState({loading: false})})
    }

    render() {

        if (this.state.loading) {
            return <h4> Se incarca materialele ... </h4>
        }

        if (this.state.mats)
            return (
                <div>
                    <MaterialeTable materiale={this.state.mats} onUserClick={(material: MaterialCoperta) => {
                        console.log(material);
                    }} />
                </div>
            )

        return (<h4> Eroare la afisarea materialelor de coperta </h4>);
    }
}
