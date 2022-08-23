import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useState, useRef } from 'react';
import Reservation from '../models/reservation'
import ReservationService from '../services/reservation.service';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { VehicleManufacturer } from '../models/vehicleManufacturer';
import { VehicleType } from '../models/vehicleType';

const ReservationEdit = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        //interaction with parent
        showReservationModal() {
            setTimeout(() => {
                setShow(true);
            }, 0);
        }
    }));


    const ref0 = useRef();
    const ref1 = useRef();

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

        if (!reservation.vehicleModel || !reservation.vehicleManufacturer || !reservation.vehicleType || !reservation.dateFrom
            || !reservation.dateTo || !reservation.price) {
            console.log("returnalo me");
            return;
        }

        ReservationService.updateReservation(reservation).then(response => {
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

    const handleChangeDropdown = (event, value, ref) => {

        if(value===null){
            return;
        }

        setReservation((prevState => {
            return {
                ...prevState,
                [ref]: value.label
            };
        }));
    };

    return (
        <Modal centered={true} show={show}>
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
                        <label htmlFor="vehicleModel">Vehicle model </label>
                        <input
                            type="text"
                            name="vehicleModel"
                            onChange={(e) => handleChange(e)}
                            placeholder="Vehicle model {e.g. Passat}"
                            className="form-control"
                            value={reservation?.vehicleModel}
                            required
                        />
                        <div className="invalid-feedback">
                            Vehicle model is required.
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 10 }}>
                        <Autocomplete
                            name='vehicleManufacturer'
                            ref={ref0}
                            getOptionLabel={(option) => option.label}
                            disablePortal
                            onChange={(event, value, ref) => handleChangeDropdown(event, value, ref0.current.getAttribute("name"))}
                            options={manufacturers}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Vehicle manufacturer" />}
                            required
                        />
                        <div className="invalid-feedback">
                            Vehicle manufacturer is required.
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 10 }}>
                        <Autocomplete
                            name="vehicleType"
                            ref={ref1}
                            getOptionLabel={(option) => option.label}
                            disablePortal
                            onChange={(event, value, ref) => handleChangeDropdown(event, value, ref1.current.getAttribute("name"))}
                            options={types}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Vehicle type" />}
                            required
                        />
                        <div className="invalid-feedback">
                            Vehicle type is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dateFrom">Date from </label>
                        <input
                            type='date'
                            name="dateFrom"
                            placeholder="Date from"
                            className="form-control"
                            value={reservation?.dateFrom}
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
                            type='date'
                            name="dateTo"
                            placeholder="Date to"
                            className="form-control"
                            value={reservation?.dateTo}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Date to is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price (HRK) </label>
                        <input
                            type='text'
                            name="price"
                            placeholder="Price (EUR)"
                            className="form-control"
                            value={reservation?.price}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            price is required.
                        </div>
                    </div>

                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </Modal>
    );

});

export { ReservationEdit };

export const types = [
    { label: VehicleType.CABRIOLET },
    { label: VehicleType.COUPE },
    { label: VehicleType.HATCHBACK },
    { label: VehicleType.MINIVAN },
    { label: VehicleType.PICKUP },
    { label: VehicleType.SEDAN },
    { label: VehicleType.SUPERCAR },
    { label: VehicleType.SUV },
    { label: VehicleType.TOURING },


];

export const manufacturers = [
    { label: VehicleManufacturer.Abarth },
    { label: VehicleManufacturer.Audi },
    { label: VehicleManufacturer.Bentley },
    { label: VehicleManufacturer.Cadillac },
    { label: VehicleManufacturer.Chevrolet },
    { label: VehicleManufacturer.Chrysler },
    { label: VehicleManufacturer.Citroën },
    { label: VehicleManufacturer.Cupra },
    { label: VehicleManufacturer.DFSK },
    { label: VehicleManufacturer.DS_Automobiles },
    { label: VehicleManufacturer.Dacia },
    { label: VehicleManufacturer.Daewoo },
    { label: VehicleManufacturer.Daihatsu },
    { label: VehicleManufacturer.Dodge },
    { label: VehicleManufacturer.Ferrari },
    { label: VehicleManufacturer.Fiat },
    { label: VehicleManufacturer.Fisker },
    { label: VehicleManufacturer.Ford },
    { label: VehicleManufacturer.GMC },
    { label: VehicleManufacturer.Great_Wall_Motor },
    { label: VehicleManufacturer.Honda },
    { label: VehicleManufacturer.Hummer },
    { label: VehicleManufacturer.Hyundai },
    { label: VehicleManufacturer.Infiniti },
    { label: VehicleManufacturer.Isuzu },
    { label: VehicleManufacturer.Iveco },
    { label: VehicleManufacturer.Jaguar },
    { label: VehicleManufacturer.Jeep },
    { label: VehicleManufacturer.Kia },
    { label: VehicleManufacturer.Lada },
    { label: VehicleManufacturer.Lamborghini },
    { label: VehicleManufacturer.Lancia },
    { label: VehicleManufacturer.Land_Rover },
    { label: VehicleManufacturer.Lexus },
    { label: VehicleManufacturer.Lincoln },
    { label: VehicleManufacturer.Lotus },
    { label: VehicleManufacturer.Mahindra },
    { label: VehicleManufacturer.Maserati },
    { label: VehicleManufacturer.Mazda },
    { label: VehicleManufacturer.Mercedes_Benz },
    { label: VehicleManufacturer.Mitsubishi },
    { label: VehicleManufacturer.MG },
    { label: VehicleManufacturer.MINI },
    { label: VehicleManufacturer.Nissan },
    { label: VehicleManufacturer.Opel },
    { label: VehicleManufacturer.Peugeot },
    { label: VehicleManufacturer.Polestar },
    { label: VehicleManufacturer.Pontiac },
    { label: VehicleManufacturer.Porsche },
    { label: VehicleManufacturer.Puch },
    { label: VehicleManufacturer.Renault },
    { label: VehicleManufacturer.Rolls_Royce },
    { label: VehicleManufacturer.Rover },
    { label: VehicleManufacturer.Saab },
    { label: VehicleManufacturer.Seat },
    { label: VehicleManufacturer.Smart },
    { label: VehicleManufacturer.Ssang_Yong },
    { label: VehicleManufacturer.Subaru },
    { label: VehicleManufacturer.Suzuki },
    { label: VehicleManufacturer.Škoda },
    { label: VehicleManufacturer.Tesla },
    { label: VehicleManufacturer.Toyota },
    { label: VehicleManufacturer.UAZ },
    { label: VehicleManufacturer.Volvo },
    { label: VehicleManufacturer.VW },
    { label: VehicleManufacturer.Wartburg },
    { label: VehicleManufacturer.XEV },
    { label: VehicleManufacturer.Yugo },
    { label: VehicleManufacturer.Zastava },

];
