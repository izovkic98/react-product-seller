import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { Modal } from 'react-bootstrap';
import UserService from '../services/user.service';
import Reservation from './../models/reservation';
import User from '../models/user';
import { ReservationStatus } from '../models/reservationStatus';
import { I18nProvider, LOCALES } from "../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";


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
                <h5 className="modal-title"><FormattedMessage id='res_details' /></h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
            </div>
            <div className="modal-body" style={{ marginTop: 0 + 'px', marginBottom: 0 + 'px' }}>
                <p></p>
                <p><FormattedMessage id='date_of_res' />: {reservation.reservationDate}</p>
                <p><FormattedMessage id='date_from' />: {reservation.dateFrom}</p>
                <p><FormattedMessage id='date_to' />: {reservation.dateTo}</p>
                <p><FormattedMessage id='veh_model' />: {reservation.vehicleModel}</p>
                <p><FormattedMessage id='veh_manuf' />: {reservation.vehicleManufacturer}</p>
                <p><FormattedMessage id='veh_type' />: {reservation.vehicleType}</p>
                <p><b><FormattedMessage id='res_status' />: <span className={`${reservation.reservationStatus === ReservationStatus.APPROVED ? 'icon-success' : 'icon-process'}`}>{reservation.reservationStatus}</span> </b></p>
                <p></p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}><FormattedMessage id='close' /></button>
            </div>
        </Modal>
    );

});

export { ReservationDetails };