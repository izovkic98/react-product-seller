import { Jumbotron, Button, Container } from "react-bootstrap";
import { CustomCarousel } from "./CustomCarousel";
import './home.css';
import React, { Component } from "react";



const HomePage = () => {
    return (

        <div className="container-xxl test"  >
            <CustomCarousel />
            <div className="container-sm" style={{ backgroundColor: 'whitesmoke', marginTop: 20 + 'px', maxWidth: 1000 + 'px' }}>
                <h1 className="skypark-title">
                    SKYPARK
                </h1>

                <h2 className="skypark-subtitle">YOUR VACATION STARTS HERE</h2>

                <h2 className="skypark-sub-subtitle">Parking/Transfer/Safety</h2>
                <hr style={{width:700+'px', margin: 'auto', marginBottom:50 + 'px',  marginTop:50 + 'px'}} className="hr" />

                <h6 className="">
                    <div style={{marginBottom:20+'px', marginRight:20 +'px', marginRight:20 +'px',marginLeft:20 +'px'}}>
                        SkyPark Zagreb je privatno parkiralište u blizini Zračne luke Franjo Tuđman svega 1 kilometar udaljen. Naša uloga je da Vama pružimo siguran  i jeftin smještaj za Vaše vozilo dok ste vi na putu. Također nudimo besplatan transfer do zračne luke, te povratak do  automobila. Parking je ograđen, asfaltiran te pokriven video nadzorom, kako bi mogli bezbrižno putovati, bez nepotrebne brige za vaše vozilo.

                    </div>
                    <div style={{ marginRight:20 +'px',marginLeft:20 +'px'}}>
                        OPIS USLUGE

                        <div>
                            Vi dolazite na parking, gdje Vas čeka parking mjesto za Vašeg limenog ljubimca. Ostavljate auto kod nas, mi vas i vašu prtljagu smjestimo u naše vozilo te  odvezemo na zračnu luku. Prilikom povratka kontaktirate nas i mi dolazimo na zračnu luku i vraćamo Vas do  vozila.

                        </div>
                    </div>

                </h6>

            </div>
        </div>

    )
}

export { HomePage };