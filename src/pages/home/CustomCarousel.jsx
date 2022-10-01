import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './home.css';
import { faChevronLeft, faChevronRight, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomCarousel = () => {

    const [index, setIndex] = useState(0);


    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };


    return (

        <Carousel activeIndex={index} onSelect={handleSelect} interval={2000} nextIcon={<FontAwesomeIcon icon={faChevronRight} className="fa-5x discount left text-center" />}
        prevIcon={<FontAwesomeIcon icon={faChevronLeft} className="fa-5x discount left text-center" />}>
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    src="./carousel/skypark1.jpg"
                    alt="First slide"

                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 "
                    src="./carousel/skypark2.jpg"
                    alt="Second slide"

                />

            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="./carousel/skypark3.jpg"
                    alt="Third slide"

                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100 "
                    src="./carousel/skypark4.jpg"
                    alt="Fourth slide"

                />

            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100 "
                    src="./carousel/skypark5.jpg"
                    alt="Sixth slide"

                />

            </Carousel.Item>


            <Carousel.Item>
                <img
                    className="d-block w-100 "
                    src="./carousel/skypark6.jpg"
                    alt="Seventh slide"

                />

            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100 "
                    src="./carousel/skypark7.jpg"
                    alt="Eight slide"

                />

            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100 "
                    src="./carousel/skypark8.jpg"
                    alt="Ninth slide"

                />

            </Carousel.Item>


        </Carousel>
    )
}

export { CustomCarousel };