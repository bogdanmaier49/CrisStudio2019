import * as React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { BASE_LINK_IMAGES } from 'src/service/client';

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
                            <Image src={ BASE_LINK_IMAGES + image } />
                        </Carousel.Item>    
                    )}
                </Carousel>
            </div>
        );
    }
}