import * as React from 'react';
import { Carousel, Image } from 'react-bootstrap';

interface ICarouselProps {
    images: String[];
}

export default class MCarousel extends React.Component<ICarouselProps>  {

    render () {
        return (
            <div className='m-carousel bottom-shadow'>
                <Carousel>
                    {this.props.images.map((image, index) => 
                        <Carousel.Item key={image + '_' + index}>
                            <Image src={ image.toString() } />
                        </Carousel.Item>    
                    )}
                </Carousel>
            </div>
        );
    }
}