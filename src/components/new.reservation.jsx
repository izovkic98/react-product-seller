import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useState, useRef } from 'react';
import Reservation from '../models/reservation'
import ReservationService from '../services/reservation.service';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { VehicleManufacturer } from '../models/vehicleManufacturer';
import { VehicleType } from '../models/vehicleType';
import { parkingTypes } from './../pages/parkingCalculator/parking.calculator';


const NewReservation = forwardRef((props, ref) => {

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
    const ref2 = useRef();

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

        if (value === null) {
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
        <div>
           <h1>
            Nova rezervacija
           </h1>
        </div>

    );

});

export { NewReservation };