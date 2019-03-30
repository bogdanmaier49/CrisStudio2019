import * as React from 'react';

export interface Item {
    name?: string;
    imagePath?: string;
    object?: any;
}

interface IItemPickerProps {
    items: Item[];
}

interface IItemPickerState {
    items: Item[];
}

class ItemPicker extends React.Component <IItemPickerProps, IItemPickerState> {
    public constructor (props: IItemPickerProps) {
        super(props);

        this.state = {
            items: this.props.items
        };
    }

    render () {
        return (
            <div className='item-picker'>
                
            </div>
        );
    }
}

export default ItemPicker;