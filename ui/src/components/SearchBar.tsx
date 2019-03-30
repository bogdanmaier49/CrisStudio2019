import * as React from 'react';

interface ISearchBarProps {
    onChange: (value: String) => void;
}

interface ISearchBarState {
    value: string;
}

export default class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
    public constructor (props: ISearchBarProps) {
        super (props);

        this.state = {
            value: ''
        }
    }

    public render () {
        return (
            <div className='search-bar'>
                <input type='text' placeholder='Cauta ...' onChange={(evt: any) => {
                    this.setState({value: evt.target.value});
                    this.props.onChange(evt.target.value);
                }}/>
            </div>
        );
    }


}