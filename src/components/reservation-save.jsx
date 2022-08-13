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

    const [reservation, setReservation] = useState(new Reservation('', '', '', '', '', '', '', ''));
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [show, setShow] = useState(false);

    const saveReservation = (e) => {
        e.preventDefault();

        setSubmitted(true);

        if (!reservation.user.firstName || !reservation.user.lastName || !reservation.user.id
            || !reservation.vehicleModel
            || !reservation.vehicleManufacturer || !reservation.vehicleType || !reservation.dateFrom
            || !reservation.dateTo  || !reservation.price ) {
                console.log(reservation.user.firstName)
                console.log(reservation.user.lastName);
                console.log(reservation.user.id)
                console.log(reservation.vehicleModel);
                console.log(reservation.vehicleManufacturer)
                console.log(reservation.vehicleType);
                console.log(reservation.dateFrom)
                console.log(reservation.dateTo);
                console.log(reservation.price)
                console.log("karina");
            return;
        }

        ReservationService.saveReservation(reservation).then(response => {
            //...
            props.onSaved(response.data);
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
                        <label htmlFor="firstName">First name </label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            className="form-control"
                            value={reservation.user.firstName}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            First name is required.
                        </div>
                    </div>
 
                    <div className="form-group">
                        <label htmlFor="lastName">Last name </label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className="form-control"
                            value={reservation.user.lastName}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Last name is required.
                        </div>
                    </div>

                    
                    <div className="form-group">
                        <label htmlFor="id">User id </label>
                        <input
                            type="text"
                            name="id"
                            placeholder="User id"
                            className="form-control"
                            value={reservation.user.id}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            User id is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="vehicleModel">Vehicle model </label>
                        <input
                            type="text"
                            name="vehicleModel"
                            placeholder="Vehicle model {e.g. Passat}"
                            className="form-control"
                            value={reservation.vehicleModel}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Vehicle model is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="vehicleManufacturer">Vehicle manufacturer </label>
                        <input
                            type="text"
                            name="vehicleManufacturer"
                            placeholder="Vehicle manufacturer"
                            className="form-control"
                            value={reservation.vehicleManufacturer}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Vehicle manufacturer is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="vehicleType">Vehicle type </label>
                        <input
                            type="text"
                            name="vehicleType"
                            placeholder="Vehicle type"
                            className="form-control"
                            value={reservation.vehicleType}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Vehicle type is required.
                        </div>
                    </div>
 
                    <div className="form-group">
                        <label htmlFor="dateFrom">Date from </label>
                        <input
                            type='text'
                            name="dateFrom"
                            placeholder="Date from"
                            className="form-control"
                            value={reservation.dateFrom}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Date from is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dateTo">Date to </label>
                        <input
                            type='text'
                            name="dateTo"
                            placeholder="Date to"
                            className="form-control"
                            value={reservation.dateTo}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Date to is required.
                        </div>
                    </div> 

                    <div className="form-group">
                        <label htmlFor="price">Price </label>
                        <input
                            type='text'
                            name="price"
                            placeholder="Price (EUR)"
                            className="form-control"
                            value={reservation.price}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            price is required.
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
                    </div>   */}

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