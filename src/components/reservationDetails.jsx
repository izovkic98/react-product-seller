import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { Modal } from 'react-bootstrap';
import UserService from '../services/user.service';
import Reservation from './../models/reservation';
import User from '../models/user';
import { ReservationStatus } from '../models/reservationStatus';


const ReservationDetails = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        //interaction with parent
        showReservationModal() {
            setTimeout(() => {
                setShow(true);
            }, 0);
        }
    }));

    useEffect(() => {
        setUser(props.user);
        setReservation(props.reservation)

    }, [props.reservation]);

    const [reservation, setReservation] = useState(new Reservation('', '', '', '', '', '', '', ''));
    const [user, setUser] = useState(new User('', '', '', '', '', '', '', ''));
    const [show, setShow] = useState(false);


    return (
        <Modal centered={true} show={show}>

            <div className="modal-header">
                <h5 className="modal-title">Reservation details</h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
            </div>
            <div className="modal-body" style={{ marginTop: 0 + 'px', marginBottom: 0 + 'px' }}>
                <p></p>
                <p>Datum rezervacije: {reservation.reservationDate}</p>
                <p>Od datuma: {reservation.dateFrom}</p>
                <p>Do datuma: {reservation.dateTo}</p>
                <p>Model auta: {reservation.vehicleModel}</p>
                <p>Marka auta: {reservation.vehicleManufacturer}</p>
                <p>Tip auta: {reservation.vehicleType}</p>
                <p><b>Status: <span className={`${reservation.reservationStatus === ReservationStatus.APPROVED ? 'icon-success' : 'icon-process'}`}>{reservation.reservationStatus}</span> </b></p>
                <p></p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
            </div>
        </Modal>
    );

});

export { ReservationDetails };