import { useState, useEffect, useRef } from 'react';
import ReservationService from '../../services/reservation.service';
import { ReservationSave } from '../../components/reservation-save';

const AdminPage = () => {

    const [reservationList, setReservationList] = useState([]);

    const saveComponent = useRef();

    useEffect(() => {
        ReservationService.getAllReservations().then((response) => {
            setReservationList(response.data);
        })
    }, []);

    const createReservationRequest = () => {
        saveComponent.current?.showReservationModal();
    };


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
                                    <button className="btn btn-primary"  onClick={()=>createReservationRequest()}>
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
                                                <button className="btn btn-primary me-1" >
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
            <ReservationSave ref={saveComponent} />
            
        </div>


    )
}

export { AdminPage };