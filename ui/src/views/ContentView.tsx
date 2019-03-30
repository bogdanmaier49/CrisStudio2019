import * as React from 'react';
import { withRouter } from 'react-router';
import ViewContainer from 'src/components/ViewContainer';

interface IContentViewProps {
    title?: string;
    content?: string;
    orderPageLink?: string;
}

class ContentView extends React.Component<any> {

    public constructor (props: IContentViewProps) {
        super(props);
    }

    render () {
        return(
            <ViewContainer>
                <div className='content-view margin-top-45 bottom-shadow'>
                    <div className='content-view-title center-container width100'>
                        <h1> {this.props.title} </h1>
                    </div>

                    <div className='content-view-content width100'>
                        <p className='width100 margin-bottom-45'> {this.props.content} </p>

                        {
                            this.props.children
                        }

                        
                    </div>

                    <div className='center-container width100'>
                        <button className='order-button' onClick={() => {this.props.history.push('/order')}}> Comanda </button>
                    </div>
                    
                </div>
            </ViewContainer>
        )
    }

}

export default withRouter(ContentView);