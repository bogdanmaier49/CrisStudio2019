import * as React from 'react';
import { Dropdown, MenuItem } from 'react-bootstrap';

interface IDropBoxProps {
    currentItem?: any;
    itemSet: any[];
    onChange: (item: any) => void;
    toggle?: string;
    isValid?: boolean;
}

interface IDropBoxState {
    currentItem?: any;
}

export default class DropBox extends React.Component<IDropBoxProps, IDropBoxState> {

    public constructor (props: any) {
        super(props);

        this.state = {
            currentItem: this.props.currentItem
        }
    }

    private itemToString = (item: any) => {
        let returnValue: string = item;

        if (item.nume !== undefined) {
            returnValue = item.nume;
        } else if (item.dimensiuni !== undefined) {
            returnValue = item.dimensiuni;
        }

        return returnValue;
    }

    private onChange = (item: any) => {
        this.props.onChange(item);
        this.setState({
            currentItem: item
        });
    }

    render () {

        let invalidInputStyle = {
            border: '1px solid red'
        };

        return (
            <Dropdown id='dropdown'>

                <Dropdown.Toggle id="dropdown-basic" style={this.props.isValid === false ? invalidInputStyle : {}}>
                    {this.state.currentItem !== undefined ? this.itemToString(this.state.currentItem) : this.props.toggle}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {this.props.itemSet !== undefined ? 
                        this.props.itemSet.map((item, index) => {
                            return (
                                <MenuItem key={'item-' + index} onSelect={() => {this.onChange(item)}}> {this.itemToString(item)} </MenuItem>
                            );
                        })
                    : <> </>}
                </Dropdown.Menu>

            </Dropdown>
        );
    }

}