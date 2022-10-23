import { Jumbotron, Button, Container, Table } from "react-bootstrap";
import { CustomCarousel } from "./CustomCarousel";
import './home.css';
import React, { Component } from "react";
import { Email } from "./Email";
import { I18nProvider, LOCALES } from "../../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";
import { Footer } from "antd/lib/layout/layout";
import { CustomStreetMap } from "./custom.street.map";

const HomePage = () => {
    return (
        <I18nProvider locale={localStorage.getItem("language")}>
            <div className="ex1">
                <CustomCarousel />
            </div>
            <Container className="container-xxl test" >
                <Container className="container-xl" style={{ backgroundColor: 'white', marginTop: 20 + 'px', maxWidth: 1320 + 'px' }} >
                    <div>
                        <h1 className="skypark-title">
                            SKYPARK
                        </h1>

                        <h2 className="skypark-subtitle">YOUR VACATION STARTS HERE</h2>

                        <h2 className="skypark-sub-subtitle">Parking/Transfer/Safety</h2>
                        <hr style={{ width: 700 + 'px', margin: 'auto', marginBottom: 50 + 'px', marginTop: 50 + 'px' }} className="hr" />

                        <h3 className="skypark-subtitle">O nama</h3>
                        <h6 className="">
                            <div style={{ marginBottom: 20 + 'px', marginRight: 20 + 'px', marginRight: 40 + 'px', marginLeft: 40 + 'px' }}>
                                <FormattedMessage id="aboutSkyPark"></FormattedMessage>
                            </div>
                            <div style={{ marginRight: 40 + 'px', marginLeft: 40 + 'px' }}>
                                <h3 className="skypark-subtitle">Opis usluge</h3>
                                <div>
                                    <FormattedMessage id="serviceDesc"></FormattedMessage>
                                </div>
                            </div>
                        </h6>

                        <hr style={{ width: 700 + 'px', margin: 'auto', marginBottom: 50 + 'px', marginTop: 50 + 'px' }} className="hr" />

                        <div>
                            <h3 className="skypark-subtitle">Pošaljite upit</h3>
                            <Email />
                        </div>
                    </div>

                </Container>
                {/* <hr style={{ width: 700 + 'px', margin: 'auto', marginBottom: 50 + 'px', marginTop: 50 + 'px' }} className="hr" /> */}


                <Container className="container-xl" style={{ backgroundColor: 'white', marginTop: 20 + 'px', maxWidth: 1320 + 'px' }} >

                    <h2 className="skypark-subtitle">Cjenik i popusti</h2>

                    <div className="container mt-5" style={{ display: 'flex' }} >
                        <div style={{ width: 'inherit', marginLeft: 50 + 'px' }}>
                            <div style={{ marginRight: 5 + 'px' }}>
                                <p>
                                    <span style={{ color: 'red', fontWeight: 'bold' }}>*</span><FormattedMessage id='park_w_roof' />
                                </p>

                            </div>

                        </div>

                        <div style={{ marginLeft: 'auto', marginRight: 100 + 'px', width: 'auto' }}>
                            <Table striped bordered hover style={{ width: 380 + 'px' }} variant="dark" >
                                <thead className="text-center">
                                    <tr>
                                        <th><FormattedMessage id='num_of_days' /></th>
                                        <th><FormattedMessage id='price' /></th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <td>1</td>
                                        <td>80.00 (20 €)</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>120.00 (20 €)</td>
                                    </tr>
                                    <tr>
                                        <td >3</td>
                                        <td>160.00 (20 €)</td>
                                    </tr>
                                    <tr>
                                        <td >4</td>
                                        <td>200.00 (20 €)</td>
                                    </tr>
                                    <tr>
                                        <td >5</td>
                                        <td>240.00 (20 €)</td>
                                    </tr>
                                    <tr>
                                        <td >6</td>
                                        <td>280.00 (20 €)</td>
                                    </tr>
                                    <tr>
                                        <td >7</td>
                                        <td>320.00 (20 €)</td>
                                    </tr>
                                    <tr>
                                        <td ><FormattedMessage id='every_add_day' /></td>
                                        <td>+35.00 (20 €)</td>
                                    </tr>
                                </tbody>
                            </Table>

                        </div>
                    </div>
                    {/*OVDJE IDU POPUSTI  */}

                    <div>
                        <div style={{ marginLeft: 50 + 'px', display: 'flex' }}>

                            <div className="card" style={{ width: 18 + 'rem', marginRight: 3 + 'px' }}>
                                <div className="card-body">
                                    <h5 className="card-title silver">SILVER</h5>
                                    <p className="card-text">"Silver" značka se dobija ako imate više od 5 a manje od 10 loyalty bodova.
                                        Dobivanjem "silver" značke ostvarujete popoust od 10 % na rezervacije. </p>
                                </div>
                            </div>

                            <div className="card" style={{ width: 18 + 'rem', marginRight: 3 + 'px' }}>
                                <div className="card-body">
                                    <h5 className="card-title gold">GOLD</h5>
                                    <p className="card-text">"Gold" značka se dobija ako imate više od 10 a manje od 20 loyalty bodova.
                                        Dobivanjem "gold" značke ostvarujete popoust od 15 % na rezervacije.</p>
                                </div>
                            </div>

                            <div className="card" style={{ width: 18 + 'rem', marginRight: 3 + 'px' }}>
                                <div className="card-body">
                                    <h5 className="card-title platinum">PLATINUM</h5>
                                    <p className="card-text">"Platinum" značka se dobija ako imate više od 20 loyalty bodova.
                                        Dobivanjem "platinum" značke ostvarujete popoust od 25 % na rezervacije.</p>
                                </div>
                            </div>
                        </div>
                        <p style={{ marginRight: 40 + 'px', marginLeft: 40 + 'px' }}>
                            <span style={{ color: 'red', fontWeight: 'bold' }}>* </span>
                            Kupovinom rezervacije koja je iznad 100 kn se dobija po jedan loyalty bod za svakih idućih 100 potrošenih kuna.
                            Npr. kupovina rezervacije ispod 100 kn ne donosi bodove, a kupovina od 300 kn nosi 3 loyalty boda.
                        </p>
                    </div>
                    <hr style={{ width: 700 + 'px', margin: 'auto', marginBottom: 50 + 'px', marginTop: 50 + 'px' }} className="hr" />
                    <h2 className="skypark-subtitle">Mapa Parkinga</h2>
                    <div>
                        <img src="./carousel/skypark.jpg" alt="logo" style={{ width: 100 + '%' }} />
                    </div>

                    <hr style={{ width: 700 + 'px', margin: 'auto', marginBottom: 50 + 'px', marginTop: 50 + 'px' }} className="hr" />
                    <h2 className="skypark-subtitle">Kontakt</h2>
                    <div className={{ width: 100 + '%', height: 30 + 'vh' }}>
                        <CustomStreetMap />
                    </div>

                    <div style={{ marginLeft: 50 + 'px', display: 'flex' }}>
                        <div style={{ width: 30 + '%', fontWeight: 'bold', marginBottom: 25 + 'px' }}>
                            <h3>Važni kontakti:</h3>
                            <div>
                                <label>Email: ivan.zovki98@gmail.com</label>
                                <label>Tel.: 095 888 7449</label>
                                <label>Adresa: Petina 10, Velika Gorica 10410</label>
                            </div>
                        </div>
                        <div style={{ marginLeft: 'auto', marginRight: 100 + 'px', width: 'auto', textAlignLast: 'end' }}>
                            <h3>Pratite nas:</h3>
                            <div>
                                <a href="https://www.facebook.com/SkyParkZG/">
                                    <img src="./carousel/facebook.png" alt="logo" style={{ width: 10 + '%', marginRight: 5 + 'px' }} />
                                </a>
                                <a href="https://www.instagram.com/skypark_zagreb/">
                                    <img src="./carousel/instagram.png" alt="logo" style={{ width: 10 + '%' }} />
                                </a>
                            </div>
                        </div>

                    </div>
                </Container>

                <hr style={{ marginTop: 50 + 'px' }} />

                <Footer>
                    <p>© 2022 - SkyPark d.o.o.</p>
                </Footer>

            </Container>

        </I18nProvider>
    )
}

export { HomePage };