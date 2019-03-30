import * as React from 'react';

interface IScrollContainerProps {
    noWrap?: boolean;
}

export default class ScrollContainer extends React.Component<IScrollContainerProps> {
    public constructor(props: IScrollContainerProps) {
        super (props);
    }

    render () {
        let style = {
            display: 'inherit'
        };

        return (
            <div style={this.props.noWrap ? style : {}} className='scroll-container scroll-y'> 
                {
                    this.props.children
                }
            </div>
        );
    }
}