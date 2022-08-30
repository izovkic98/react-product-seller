import { useState, useEffect } from 'react';
import './profile.page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercentage } from '@fortawesome/free-solid-svg-icons';
import { faParking } from '@fortawesome/free-solid-svg-icons';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ProfileUserData } from './profile.user.data';
import ReservationService from '../../services/reservation.service';
import { UsersCard } from './users-card';
import ParkingService from '../../services/parking.service';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';


const ProfilePage = () => {

  const [firstZoneFreeList, setFirstZoneFree] = useState([]);
  const [secondZoneFree, setSecondZoneFree] = useState([]);
  const [activeRes, setActiveRes] = useState([]);

  useEffect(() => {

    ParkingService.getAllFreeParkingsFirstZone().then((response) => {
      setFirstZoneFree(response.data);
    })

    ParkingService.getAllFreeParkingsSecondZone().then((response) => {
      setSecondZoneFree(response.data);
    })

    ReservationService.getAllCurrentReservationOfAUser().then((response) => {
      setActiveRes(response.data);
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
                      {firstZoneFreeList.length}
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <hr />
                  <div className="stats">
                    <FontAwesomeIcon icon={faArrowRight} /> Broj slobodnih parkirnih mjesta u I. Zoni (Vanjski parking)
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
                      {activeRes.length}
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <hr />
                  <div className="stats">
                    <FontAwesomeIcon icon={faArrowRight} /> Broj tekućih rezervacija (u obradi i potvrđene)
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
                      <FontAwesomeIcon icon={faWarehouse} className="icon-big discount left text-center" />
                      <p>Ostalo</p>
                      {secondZoneFree.length}
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <hr />
                  <div className="stats">
                    <FontAwesomeIcon icon={faArrowRight} /> Broj slobodnih parkirnih mjesta u II. Zoni (Unutarnji parking)
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
        {/*DIO VEZAN ZA ISPIS REZERVACIJA NA PROFILU */}
        <p>
          <Button type='button' component={Link} to="/new-reservation" className="btn btn-primary mt-4" style={{color:'white'}} >
            Nova rezervacija »
          </Button>
        </p>
      </div>

      <hr style={{ marginTop: 50 + 'px' }} />
      <footer>
        <p>© 2022 - SkyPark d.o.o.</p>
      </footer>
    </div></>



  )
}

export { ProfilePage };
