import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Reservation from '../models/reservation'
import ReservationService from '../services/reservation.service';
import { Modal } from 'react-bootstrap';

const ReservationSave = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        //interaction with parent
        showReservationModal() {
            setTimeout(() => {
                setShow(true);
            }, 0);
        }
    }));


    useEffect(() => {
        setReservation(props.reservation);

    }, [props.reservation]);

    const [reservation, setReservation] = useState(new Reservation('', '', '', '', '', '', '', 0, ''));
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [show, setShow] = useState(false);

    const saveReservation = (e) => {
        e.preventDefault();

        setSubmitted(true);

        if (!reservation.user.firstName || !reservation.user.lastName || !reservation.vehicleModel
            || !reservation.vehicleManufacturer || !reservation.vehicleType || !reservation.dateFrom
            || !reservation.dateTo || !reservation.reservationDate
            || !reservation.price || !reservation.reservationStatus) {
            return;
        }

        ReservationService.saveReservation(reservation).then(response => {
            //...
            setShow(false);
            setSubmitted(false);
        }).catch(err => {
            setErrorMessage('Unexpected error occurred.');
            console.log(err);
        });
    };

    //<input name="x" value="y">
    const handleChange = (e) => {
        const { name, value } = e.target;

        setReservation((prevState => {
            return {
                ...prevState,
                [name]: value
            };
        }));
    };

    return (
        <Modal show={show}>
            <form onSubmit={(e) => saveReservation(e)}
                noValidate
                className={submitted ? 'was-validated' : ''}>

                <div className="modal-header">
                    <h5 className="modal-title">Reservation details</h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>

                <div className="modal-body">

                    {errorMessage &&
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    }

                     <div className="form-group">
                        <label htmlFor="firstName">First name: </label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            className="form-control"
                            value={reservation?.user?.firstName}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            First name is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last name: </label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className="form-control"
                            value={reservation?.user?.lastName}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Last name is required.
                        </div>
                    </div> 

                     <div className="form-group">
                        <label htmlFor="vehicleModel">Vehicle model: </label>
                        <input
                            type="text"
                            name="vehicleModel"
                            placeholder="Vehicle model {e.g. Passat}"
                            className="form-control"
                            value={reservation?.vehicleModel}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Vehicle model is required.
                        </div>
                    </div>

                    {/* <div class="btn-group">
                        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Action
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Separated link</a>
                        </div>
                    </div>  */}

                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </Modal>
    );

});

export { ReservationSave };