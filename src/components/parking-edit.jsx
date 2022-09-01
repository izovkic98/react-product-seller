import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useState, useRef } from 'react';

import { Modal } from 'react-bootstrap';
import Parking from '../models/parking';
import { ParkingStatus } from '../models/parkingStatus';
import ParkingService from '../services/parking.service';
import { ParkingType } from './../models/parkingType';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { I18nProvider, LOCALES } from "../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";


const ParkingEdit = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        //interaction with parent
        showParkingModal() {
            setTimeout(() => {
                setShow(true);
            }, 0);
        }
    }));

    useEffect(() => {
        setParking(props.parking);

    }, [props.parking]);

    const [parking, setParking] = useState(new Parking('', '', ''));
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [show, setShow] = useState(false);
    const ref0 = useRef();
    const ref1 = useRef();

    const saveParking = (e) => {
        e.preventDefault();

        setSubmitted(true);

        if (!parking.parkingStatus || !parking.parkingType) {
            console.log("returnalo me");
            return;
        }

        ParkingService.updateParking(parking).then(response => {
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

    const handleChangeDropdown = (event, value, ref) => {

        if (value === null) {
            return;
        }

        setParking((prevState => {
            return {
                ...prevState,
                [ref]: value.label
            };
        }));
    };

    return (
        <Modal centered={true} show={show}>
            <form onSubmit={(e) => saveParking(e)}
                noValidate
                className={submitted ? 'was-validated' : ''}>

                <div className="modal-header">
                    <h5 className="modal-title"><FormattedMessage id='park_details' /></h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>

                <div className="modal-body">

                    {errorMessage &&
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    }

                    <div className="form-group" style={{ marginBottom: 10 }}>
                        <Autocomplete
                            name='parkingStatus'
                            ref={ref0}
                            getOptionLabel={(option) => option.label}
                            disablePortal
                            onChange={(event, value, ref) => handleChangeDropdown(event, value, ref0.current.getAttribute("name"))}
                            options={parkingStatus}
                            sx={{ width: 300 }}
                            defaultValue={{ label: parking.parkingStatus }}
                            renderInput={(params) => <TextField {...params} label={<FormattedMessage id='park_status' />} />}
                            required
                        />
                        <div className="invalid-feedback">
                            <FormattedMessage id='req_field' />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 10 }}>
                        <Autocomplete
                            name="parkingType"
                            ref={ref1}
                            getOptionLabel={(option) => option.label}
                            disablePortal
                            onChange={(event, value, ref) => handleChangeDropdown(event, value, ref1.current.getAttribute("name"))}
                            options={parkingTypes}
                            sx={{ width: 300 }}
                            defaultValue={{ label: parking.parkingType }}
                            renderInput={(params) => <TextField {...params} label={<FormattedMessage id='park_type' />} />}
                            required
                        />
                        <div className="invalid-feedback">
                            <FormattedMessage id='req_field' />
                        </div>
                    </div>

                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}><FormattedMessage id='close' /></button>
                    <button type="submit" className="btn btn-primary"><FormattedMessage id='save' /></button>
                </div>
            </form>
        </Modal>
    );

});

export { ParkingEdit };

export const parkingTypes = [
    { label: ParkingType.I_ZONE },
    { label: ParkingType.II_ZONE },
];

export const parkingStatus = [
    { label: ParkingStatus.Free },
    { label: ParkingStatus.Occupied },
];

