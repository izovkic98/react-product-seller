import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import './profile.page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercentage } from '@fortawesome/free-solid-svg-icons';
import { faParking } from '@fortawesome/free-solid-svg-icons';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ProfileUserData } from './profile.user.data';
import ReservationService from '../../services/reservation.service';


const ProfilePage = () => {
  const currentUser = useSelector(state => state.user);
  const [reservationList, setReservationList] = useState([]);

  useEffect(() => {
    ReservationService.getAllReservations().then((response) => {
        setReservationList(response.data);
    })
}, []);

  

  return (

    <><ProfileUserData /><div className="content">
      <div className="container-fluid">
        <div className="row" style={{ marginTop: 25 }}>
          <div className="col-lg-6 col-sm-6">
            <div className="card">
              <div className="content">
                <div className="row">
                  <div className="col-xs-7">
                    <div className="numbers">
                      <FontAwesomeIcon icon={faPercentage} className="icon-big discount left text-center" />
                      <p>Ukupno</p>
                      27
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <hr />
                  <div className="stats">
                    <FontAwesomeIcon icon={faArrowRight} /> Trenutni popust
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-6">
            <div className="card">
              <div className="content">
                <div className="row">
                  <div className="col-xs-7">
                    <div className="numbers">
                      <FontAwesomeIcon icon={faParking} className="icon-big discount left text-center" />

                      <p>Ostalo</p>
                      20
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <hr />
                  <div className="stats">
                    <FontAwesomeIcon icon={faArrowRight} /> Broj slobodnih parkirnih mjesta
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-6">
            <div className="card">
              <div className="content">
                <div className="row">
                  <div className="col-xs-7">
                    <div className="numbers">
                      <FontAwesomeIcon icon={faHourglassHalf} className="icon-big discount left text-center" />
                      <p>Ukupno</p>
                      0
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <hr />
                  <div className="stats">
                    <FontAwesomeIcon icon={faArrowRight} /> Broj preostalih dana tekuće rezervacije
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-6">
            <div className="card">
              <div className="content">
                <div className="row">
                  <div className="col-xs-7">
                    <div className="numbers">
                      <FontAwesomeIcon icon={faQuestion} className="icon-big discount left text-center" />
                      <p>Testni</p>
                      0
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <hr />
                  <div className="stats">
                    <FontAwesomeIcon icon={faArrowRight} /> Testni
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-sm-9">
            <p>* stari godišnji morate iskoristiti do kraja trećeg mjeseca 2022 godine.</p>
          </div>
        </div>



        {/*DIO VEZAN ZA ISPIS REZERVACIJA NA PROFILU */}
        <div className='dxbs-cardview'>
          <div className='panel panel-default'>
            <div className='panel panel-default'>
              <div className="panel-body row dxbs-content">


                {/*1.KARTICA */}
                <div id="Content_gwCard_DXDataCard0" className="col-md-6 col-lg-6">
                  <div className="panel panel-default dxbs-card panel-primary" >
                    <div id="Content_gwCard_tcch0" className="panel-heading">
                      <span>Godišnji odmor - MARKO ZOVKIĆ</span>
                    </div>
                    <div className="panel-body" style={{ color: `rgb(${0, 97, 0})`, backgroundColor: `rgb(${198, 239, 206})`, height: 156 + 'px' }}>
                      <div id="Content_gwCard_tccv0">
                        <div className="info">
                          <span>Od: 25.7.2022.</span>
                          <br />
                          <span>Do: 25.7.2022.</span>
                          <br />
                          <div className="address">
                            <span>Zamjena: LUKA SAKOMAN</span>
                            <br />
                            <span><p><b>Status: <span className="icon-success">Odobreno</span> </b></p></span>
                          </div>
                          <button type="button" className="btn btn-info" onClick="ShowDialog(3893)">Detalji</button>
                          <button type="button" className="btn btn-warning" onClick="ShowReport(this, 3893)">Ispis</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>



                {/*2.KARTICA */}
                <div id="Content_gwCard_DXDataCard1" className="col-md-6 col-lg-6">
                  <div className="panel panel-default dxbs-card panel-primary" >
                    <div id="Content_gwCard_tcch1" className="panel-heading " style={{ backgroundColor: `rgb(${0, 0, 0})` }}>
                      <span>Godišnji odmor - MARKO ZOVKIĆ</span>
                    </div><div className="panel-body" style={{ color: `rgb(${0, 97, 0})`, backgroundColor: `rgb(${198, 239, 206})`, height: 156 + 'px' }}>
                      <div id="Content_gwCard_tccv1">
                        <div className="info">
                          <span>Od: 8.8.2022.</span>
                          <br />
                          <span>Do: 12.8.2022.</span>
                          <br />
                          <div className="address">
                            <span>Zamjena: LUKA SAKOMAN</span>
                            <br />
                            <span><p><b>Status: <span className="icon-success">Odobreno</span> </b></p></span>
                          </div>
                          <button type="button" className="btn btn-info" onClick="ShowDialog(3875)">Detalji</button>
                          <button type="button" className="btn btn-warning" onClick="ShowReport(this, 3875)">Ispis</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>







              </div>
            </div>
          </div>
        </div>



      </div>
    </div></>



  )
}

export { ProfilePage };
