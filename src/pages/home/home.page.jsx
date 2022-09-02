import { Jumbotron, Button, Container, Table } from "react-bootstrap";
import { CustomCarousel } from "./CustomCarousel";
import './home.css';
import React, { Component } from "react";
import { Email } from "./Email";
import { I18nProvider, LOCALES } from "../../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";




const HomePage = () => {
    return (
        <I18nProvider locale={localStorage.getItem("language")}>

            <div className="container-xxl test"  >
                <CustomCarousel />
                <div className="container-sm" style={{ backgroundColor: 'whitesmoke', marginTop: 20 + 'px', maxWidth: 1000 + 'px' }}>
                    <h1 className="skypark-title">
                        SKYPARK
                    </h1>

                    <h2 className="skypark-subtitle">YOUR VACATION STARTS HERE</h2>

                    <h2 className="skypark-sub-subtitle">Parking/Transfer/Safety</h2>
                    <hr style={{ width: 700 + 'px', margin: 'auto', marginBottom: 50 + 'px', marginTop: 50 + 'px' }} className="hr" />

                    <h6 className="">
                        <div style={{ marginBottom: 20 + 'px', marginRight: 20 + 'px', marginRight: 40 + 'px', marginLeft: 40 + 'px' }}>
                            SkyPark Zagreb je privatno parkiralište u blizini Zračne luke Franjo Tuđman svega 1 kilometar udaljen.
                            Naša uloga je da Vama pružimo siguran  i jeftin smještaj za Vaše vozilo dok ste vi na putu.
                            Također nudimo besplatan transfer do zračne luke, te povratak do  automobila.
                            Parking je ograđen, asfaltiran te pokriven video nadzorom, kako bi mogli bezbrižno putovati, bez nepotrebne brige za vaše vozilo.
                        </div>
                        <div style={{ marginRight: 40 + 'px', marginLeft: 40 + 'px' }}>
                            OPIS USLUGE
                            <div>
                                Vi dolazite na parking, gdje Vas čeka parking mjesto za Vašeg limenog ljubimca.
                                Ostavljate auto kod nas, mi vas i vašu prtljagu smjestimo u naše vozilo te  odvezemo na zračnu luku.
                                Prilikom povratka kontaktirate nas i mi dolazimo na zračnu luku i vraćamo Vas do  vozila.
                            </div>
                        </div>
                    </h6>

                    <hr style={{ width: 700 + 'px', margin: 'auto', marginBottom: 50 + 'px', marginTop: 50 + 'px' }} className="hr" />

                    <div>
                        <h2 className="skypark-subtitle">Pošaljite upit</h2>

                        <Email />
                    </div>

                    <hr style={{ width: 700 + 'px', margin: 'auto', marginBottom: 50 + 'px', marginTop: 50 + 'px' }} className="hr" />

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
                                <thead>
                                    <tr>
                                        <th><FormattedMessage id='num_of_days' /></th>
                                        <th><FormattedMessage id='price_first_zone' /></th>
                                        <th><FormattedMessage id='price_second_zone' /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>0</td>
                                        <td>75.00</td>
                                        <td>75.00</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>80.00</td>
                                        <td>85.00</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>120.00</td>
                                        <td>130.00</td>
                                    </tr>
                                    <tr>
                                        <td >3</td>
                                        <td>160.00</td>
                                        <td>175.00</td>
                                    </tr>
                                    <tr>
                                        <td >4</td>
                                        <td>200.00</td>
                                        <td>220.00</td>
                                    </tr>
                                    <tr>
                                        <td >5</td>
                                        <td>240.00</td>
                                        <td>265.00</td>
                                    </tr>
                                    <tr>
                                        <td >6</td>
                                        <td>280.00</td>
                                        <td>310.00</td>
                                    </tr>
                                    <tr>
                                        <td >7</td>
                                        <td>320.00</td>
                                        <td>355.00</td>
                                    </tr>
                                    <tr>
                                        <td ><FormattedMessage id='every_add_day' /></td>
                                        <td>+35.00</td>
                                        <td>+47.00</td>
                                    </tr>
                                </tbody>
                            </Table>

                        </div>
                    </div>
                    {/*OVDJE IDU POPUSTI  */}
                    <div style={{marginLeft:50 + 'px'}}>

                        <div class="card" style={{width: 18 + 'rem', marginRight: 3 + 'px'}}>
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="card-link">Card link</a>
                                <a href="#" class="card-link">Another link</a>
                            </div>
                        </div>

                        <div class="card" style={{width: 18 + 'rem', marginRight: 3 + 'px'}}>
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="card-link">Card link</a>
                                <a href="#" class="card-link">Another link</a>
                            </div>
                        </div>

                        <div class="card" style={{width: 18 + 'rem', marginRight: 3 + 'px'}}>
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="card-link">Card link</a>
                                <a href="#" class="card-link">Another link</a>
                            </div>
                        </div>
                    </div>



                </div>

            </div>
        </I18nProvider>
    )
}

export { HomePage };