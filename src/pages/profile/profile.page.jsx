import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import { Tier } from '../../models/tier';
import User from '../../models/user';
import userService from '../../services/user.service';
import { useDispatch } from 'react-redux';
import { FormattedMessage, IntlProvider } from "react-intl";
import { I18nProvider, LOCALES } from "../../i18n";



const ProfilePage = () => {

  const [firstZoneFreeList, setFirstZoneFree] = useState([]);
  const [secondZoneFree, setSecondZoneFree] = useState([]);
  const [activeRes, setActiveRes] = useState([]);
  const [updatedUser, setUpdatedUser] = useState(new User('', '', '', '', '', '', '', '', '', ''));
  const currentUser = useSelector(state => state.user);


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

   
    <I18nProvider locale={localStorage.getItem("language")}>
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
                      <p>                                <FormattedMessage id='total' />
                      </p>
                      {(currentUser.tier === Tier.SILVER) &&
                        <span className='silver'>{currentUser.tier ? currentUser.tier : ''}: </span>
                      }
                      {(currentUser.tier === Tier.GOLD) &&
                        <span className='gold'>{currentUser.tier ? currentUser.tier : ''}: </span>
                      }
                      {(currentUser.tier === Tier.PLATINUM) &&
                        <span className='platinum'>{currentUser.tier ? currentUser.tier : ''}: </span>
                      }
                      {currentUser.loyaltyPoints !== null ? currentUser.loyaltyPoints : 0}
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <hr />
                  <div className="stats">
                    <FontAwesomeIcon icon={faArrowRight} /> <FormattedMessage id='current_loyalty_points' />
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

                      <p><FormattedMessage id='remaining' /></p>
                      {firstZoneFreeList.length}
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <hr />
                  <div className="stats">
                    <FontAwesomeIcon icon={faArrowRight} /> <FormattedMessage id='free_park_1_zone' />
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
                      <p><FormattedMessage id='total' /></p>
                      {activeRes.length}
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <hr />
                  <div className="stats">
                    <FontAwesomeIcon icon={faArrowRight} /> <FormattedMessage id='current_rez' />
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
                      <p><FormattedMessage id='remaining' /></p>
                      {secondZoneFree.length}
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <hr />
                  <div className="stats">
                    <FontAwesomeIcon icon={faArrowRight} /> <FormattedMessage id='free_park_2_zone' />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-sm-9">
            <p><FormattedMessage id='note_home_page' /></p>
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
          <Button type='button' component={Link} to="/new-reservation" className="btn btn-primary mt-4" style={{ color: 'white' }} >
            <FormattedMessage id='new_rez' />
          </Button>
        </p>
      </div>

      <hr style={{ marginTop: 50 + 'px' }} />
      <footer>
        <p>© 2022 - SkyPark d.o.o.</p>
      </footer>
    </div></>
    </I18nProvider>


  )
}

export { ProfilePage };
