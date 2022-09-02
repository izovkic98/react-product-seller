import { Jumbotron, Button, Container } from "react-bootstrap";
import { CustomCarousel } from "./CustomCarousel";
import './home.css';
import React, { Component } from "react";



const HomePage = () => {
    return (




        <div className="container-xxl test"  >
                <CustomCarousel />
                <div className="container-sm"  style={{backgroundColor:'whitesmoke', marginTop: 20 + 'px', maxWidth:1000 + 'px'}}>
                    <h1 className="skypark-title">
                        SKYPARK
                    </h1>
                </div>
        </div>

    )
}

export { HomePage };