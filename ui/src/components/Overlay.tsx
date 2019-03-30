import * as React from 'react';

export default class Overlay extends React.Component {

    public constructor (props: any) {
        super (props);
    }

    render () {
        return (
            <div className='overlay'>
                {this.props.children}
            </div>
        );
    }

}