import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import './profile.page.css';
import ReservationService from '../../services/reservation.service';
import ReactPaginate from 'react-paginate';
import { ReservationStatus } from './../../models/reservationStatus';
import { ReservationDetails } from '../../components/reservationDetails';
import Reservation from '../../models/reservation';
import { FormattedMessage, IntlProvider } from "react-intl";
import { I18nProvider, LOCALES } from "../../i18n";

const UsersCard = () => {
    const currentUser = useSelector(state => state.user);
    const [reservationList, setReservationList] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [selectedReservation, setSelectedReservation] = useState(new Reservation('', '', '', '', '', '', '', ''));

    const detailsComponent = useRef();
    const reservationsPerPage = 2;
    const pagesVisited = pageNumber * reservationsPerPage;

    const displayReservations =
        reservationList.slice(pagesVisited, pagesVisited + reservationsPerPage)
            .map((reservation) => {
                return (

                    <div className="col-md-6 col-lg-6">
                        <div className={`${reservation.reservationStatus === ReservationStatus.APPROVED ? 'tata-panelApproved dxbs-card panel-primary' : 'panel-fanel dxbs-card panel-primary'}`}>
                            <div className="panel-heading">
                                <span><FormattedMessage id='fName_lName'/> {currentUser.firstName} {currentUser.lastName}</span>
                            </div>
                            <div className="panel-body" style={{ height: 156 + 'px' }}>
                                <div >
                                    <div style={{ marginLeft: 10 }}>
                                        <span><FormattedMessage id='from' /> {reservation.dateFrom}</span>
                                        <br />
                                        <span><FormattedMessage id='to'/> {reservation.dateTo}</span>
                                        <br />
                                        <div className="address">
                                            <span><p><b><FormattedMessage id='status'/>  <span className={`${reservation.reservationStatus === ReservationStatus.APPROVED ? 'icon-success' : 'icon-process'}`}>{reservation.reservationStatus}</span> </b></p></span>
                                        </div>
                                        <button type="button" className="btn btn-info" style={{ marginRight: 10 }} onClick={() => detailsReservationRequest(reservation)}><FormattedMessage id='details'/> </button>
                                        <button type="button" disabled={reservation.reservationStatus === ReservationStatus.IN_PROCESS} className="btn btn-warning" onClick={() => printReservation(reservation.id)}><FormattedMessage id='download'/> </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ReservationDetails ref={detailsComponent} user={currentUser} reservation={selectedReservation} />
                    </div>
                );
            });


    const pageCount = Math.ceil(reservationList.length / reservationsPerPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const detailsReservationRequest = (item) => {
        setSelectedReservation(Object.assign({}, item));
        detailsComponent.current?.showReservationModal();
    };

    useEffect(() => {
        ReservationService.getAllReservationsOfAUser().then((response) => {
            setReservationList(response.data);
        })


    }, []);

    // PRINTANJE REZERVACIJE
    const printReservation = ((reservationId) => {
        ReservationService.printReservation(reservationId).then((response) => {
            console.log("printanje pokrenuto");
        })
    })



    return (
        <I18nProvider locale={localStorage.getItem("language")}>
            <div className='row'>
                {displayReservations}
                <hr />
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination"}
                    previousLinkClassName={"page-link"}
                    nextLinkClassName={"page-link"}
                    disabledClassName={"page-item disabled "}
                    activeClassName={"page-item active"}
                    breakLinkClassName={"page-link"}
                    pageLinkClassName={"page-link"}
                />
            </div>
        </I18nProvider>
    )
}

export { UsersCard };