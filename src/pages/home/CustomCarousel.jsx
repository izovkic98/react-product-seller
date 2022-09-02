import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './home.css'

const CustomCarousel = () => {

    const [index, setIndex] = useState(0);


    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };


    return (

        <Carousel activeIndex={index} onSelect={handleSelect} interval={2000} >
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    src="./carousel/skypark1.jpg"
                    alt="First slide"

                />
                <Carousel.Caption>
                    <h3>Listaj dalje »</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 "
                    src="./carousel/skypark2.jpg"
                    alt="Second slide"

                />
                <Carousel.Caption>
                    <h3>Listaj dalje »</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="./carousel/skypark3.jpg"
                    alt="Third slide"

                />
                <Carousel.Caption>
                    <h3>Listaj dalje »</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100 "
                    src="./carousel/skypark4.jpg"
                    alt="Fourth slide"

                />
                <Carousel.Caption>
                    <h3>Listaj dalje »</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100 "
                    src="./carousel/skypark5.jpg"
                    alt="Sixth slide"

                />
                <Carousel.Caption>
                    <h3>Listaj dalje »</h3>
                </Carousel.Caption>
            </Carousel.Item>


            <Carousel.Item>
                <img
                    className="d-block w-100 "
                    src="./carousel/skypark6.jpg"
                    alt="Seventh slide"

                />
                <Carousel.Caption>
                    <h3>Listaj dalje »</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100 "
                    src="./carousel/skypark7.jpg"
                    alt="Eight slide"

                />
                <Carousel.Caption>
                    <h3>Listaj dalje »</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100 "
                    src="./carousel/skypark8.jpg"
                    alt="Ninth slide"

                />
                <Carousel.Caption>
                    <h3>Listaj dalje »</h3>
                </Carousel.Caption>
            </Carousel.Item>


        </Carousel>
    )
}

export { CustomCarousel };