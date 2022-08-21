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
import ReactPaginate from 'react-paginate';
import { UsersCard } from './users-card';


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
          <div className='panel-default'>
            <div className='tata-panel panel-default'>
              <div className="panel-body row dxbs-content">
                <UsersCard />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div></>



  )
}

export { ProfilePage };
