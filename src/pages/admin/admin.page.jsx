import { useState, useEffect, useRef } from 'react';
import ReservationService from '../../services/reservation.service';
import { ReservationEdit } from '../../components/reservation-edit';
import Reservation from '../../models/reservation';
import { ReservationStatus } from '../../models/reservationStatus';

const AdminPage = () => {

    const [reservationList, setReservationList] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(new Reservation('', '', '', '', '', '', '', ''));
    const [errorMessage, setErrorMessage] = useState('');

    const saveComponent = useRef();

    useEffect(() => {
        ReservationService.getAllReservations().then((response) => {
            setReservationList(response.data);
        })
    }, []);

    const createReservationRequest = () => {
        setSelectedReservation(new Reservation('', '', '', '', '', '', '', ''));
        saveComponent.current?.showReservationModal();
    };

    const editReservationRequest = (item) => {
        setSelectedReservation(Object.assign({}, item));
          saveComponent.current?.showReservationModal();
      };

    const saveReservationWatcher = (reservation) => {
        let itemIndex = reservationList.findIndex(item => item.id === reservation.id);

        if (itemIndex !== -1) {
            const newList = reservationList.map((item) => {
                if (item.id === reservation.id) {
                    return reservation;
                }
                return item;
            });
            setReservationList(newList);
        } else {
            const newList = reservationList.concat(reservation);
            setReservationList(newList);
        }
    };

    const changeReservationStatus = (reservationId) => {
        var tempReservation;
        ReservationService.getReservationById(reservationId).then((res) => {
            tempReservation = res.data;
            if (tempReservation.reservationStatus === ReservationStatus.APPROVED) tempReservation.reservationStatus = ReservationStatus.IN_PROCESS;
            else tempReservation.reservationStatus = ReservationStatus.APPROVED;
            ReservationService.updateReservation(tempReservation).then((res)=>{
                ReservationService.getAllReservations().then((res)=>{
                    setReservationList(res.data);
                })
            })

        })

    }

    return (

        <div>
            <div className="container">
                <div className="pt-5">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-6">
                                    <h3>All Reservations</h3>
                                </div>

                                <div className="col-6 text-end">
                                    <button className="btn btn-primary" onClick={() => createReservationRequest()}>
                                        Create Reservation
                                    </button>
                                </div>

                            </div>
                        </div>
                        <div className="card-body">

                            <table className="table table-striped table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Full name</th>
                                        <th scope="col">Vehicle model</th>
                                        <th scope="col">Vehicle manufacturer</th>
                                        <th scope="col">Date from </th>
                                        <th scope="col">Date to </th>
                                        <th scope="col">Date of reservation</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Reservation status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservationList.map((reservation, ind) =>
                                        <tr key={reservation.id}>
                                            <th scope="row">{ind + 1}</th>
                                            <td>{reservation.user.firstName} {reservation.user.lastName}</td>
                                            <td>{reservation.vehicleModel}</td>
                                            <td>{reservation.vehicleManufacturer}</td>
                                            <td>{new Date(reservation.dateFrom).toLocaleDateString()}</td>
                                            <td>{new Date(reservation.dateTo).toLocaleDateString()}</td>
                                            <td>{new Date(reservation.reservationDate).toLocaleDateString()}</td>
                                            <td>{`$ ${reservation.price}`}</td>
                                            <td>{reservation.reservationStatus}</td>
                                            <td>
                                                <button hidden={(reservation.reservationStatus === ReservationStatus.APPROVED)}   onClick={() => changeReservationStatus(reservation.id)} className="btn btn-success me-1" >
                                                    Approve
                                                </button>
                                            
                                                <button hidden={(reservation.reservationStatus === ReservationStatus.IN_PROCESS)}  onClick={() => changeReservationStatus(reservation.id)} className="btn btn-secondary me-1" >
                                                    Deny
                                                </button>

                                                <button className="btn btn-light me-1" onClick={() => editReservationRequest(reservation)} >
                                                    Edit
                                                </button>

                                                <button className="btn btn-danger" >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            <ReservationEdit ref={saveComponent} reservation={selectedReservation} onSaved={(p) => saveReservationWatcher(p)} />

        </div>


    )
}

export { AdminPage };