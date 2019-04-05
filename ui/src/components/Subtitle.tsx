import * as React from 'react';

interface ISubttileProps {
    title: string;
}

export const Subtitle = (props: ISubttileProps):JSX.Element => (
    <div className='hr-subtitle-container'>
        <div className='hr-before' />
            <h3 className='hr-subtitle-3'> {props.title} </h3>
        <div className='hr-after' />
    </div>
)