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
import { VehicleManufacturer } from './../../models/vehicleManufacturer';
import { ReservationStatus } from './../../models/reservationStatus';

const UsersCard = () => {
    const currentUser = useSelector(state => state.user);
    const [reservationList, setReservationList] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const reservationsPerPage = 2;
    const pagesVisited = pageNumber * reservationsPerPage;

    const displayReservations =
        reservationList.slice(pagesVisited, pagesVisited + reservationsPerPage)
            .map((reservation) => {
                return (

                    <div id="Content_gwCard_DXDataCard0" className="col-md-6 col-lg-6">
                        <div className={`${reservation.reservationStatus === ReservationStatus.APPROVED ? 'tata-panelApproved dxbs-card panel-primary' : 'panel-fanel dxbs-card panel-primary'}`}>
                            <div id="Content_gwCard_tcch0" className="panel-heading">
                                <span>Ime i prezime: {currentUser.firstName} {currentUser.lastName}</span>
                            </div>
                            <div className="panel-body" style={{ height: 156 + 'px' }}>
                                <div id="Content_gwCard_tccv0">
                                    <div style={{marginLeft:10}}>
                                        <span>Od: {reservation.dateFrom}</span>
                                        <br />
                                        <span>Do: {reservation.dateTo}</span>
                                        <br />
                                        <div className="address">
                                            <span><p><b>Status: <span className="icon-success">{reservation.reservationStatus}</span> </b></p></span>
                                        </div>
                                        <button type="button" className="btn btn-info" style={{marginRight:10}} >Detalji</button>
                                        <button type="button" className="btn btn-warning" >Ispis</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });


    useEffect(() => {
        ReservationService.getAllReservations().then((response) => {
            setReservationList(response.data);
        })
    }, []);



    return (
        <div className='row'>
            {displayReservations}
        </div>
    )
}

export { UsersCard };