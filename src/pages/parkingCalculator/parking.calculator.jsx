import TextField from '@material-ui/core/TextField';
import { useState, useEffect, useRef } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, Table } from 'react-bootstrap';
import { ParkingType } from '../../models/parkingType';
import moment from 'moment';
import './parking.calculator.css';
import { useDispatch, useSelector } from 'react-redux';

const ParkingCalculator = () => {

    const ref5 = useRef();
    const currentUser = useSelector(state => state.user);

    const [submitted, setSubmitted] = useState(false);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [calculatedPrice, setCalculatedPrice] = useState('');
    const [zoneType, setZoneType] = useState('');

    const dateFromMoment = moment(dateFrom);
    const dateToMoment = moment(dateTo);

    const handleChangeDropdown = (event, value, ref) => {


        if (value === null) {
            return;
        }

        if(errorMessage){
            setErrorMessage(false)
        }
        setZoneType(value.label);

    };

    const handleSubmit = () => {
        
        if (!zoneType) {
            setErrorMessage("Zone type is missing");
            return;
        }

        let diff = 0;
        let secondZoneUp = 0;

        if (zoneType === ParkingType.II_ZONE) {
            secondZoneUp = 5;
        }

        if ((dateFromMoment.year() - dateToMoment.year()) === -1) {

            diff = ((365 - dateFromMoment.dayOfYear()) + dateToMoment.dayOfYear());
            console.log("prelazak: " + diff)

        } else {
            diff = dateToMoment.dayOfYear() - dateFromMoment.dayOfYear();
            console.log("neprelazak: " + diff)
        }

        if (diff === 1) {
            setCalculatedPrice(80.00 + secondZoneUp)
        } else if (diff > 1 && diff < 8) {
            const daysBelowEight = 80.00 + ((diff - 1) * 40.00);
            setCalculatedPrice(daysBelowEight + (diff * secondZoneUp));

        } else if (diff === 8) {
            setCalculatedPrice(355.00 + (8 * secondZoneUp))
        } else {
            const daysAboveEight = 355.00 + ((diff - 8) * 35);
            setCalculatedPrice(daysAboveEight + (diff * secondZoneUp));
        }

    };


    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'dateFrom') {
            setDateFrom(value);
        } else {
            setDateTo(value);
        }


    };


    return (

        <div >
            <div className="container mt-5" style={{ display: 'flex' }} >
                <div style={{ width: 'inherit', marginLeft: 50 + 'px' }}>
                    <div >
                        <div className="form-group mt-1" style={{ marginBottom: 10 }}>
                            <Autocomplete
                                name="parkingType"
                                ref={ref5}
                                getOptionLabel={(option) => option.label}
                                disablePortal
                                onChange={(event, value, ref) => handleChangeDropdown(event, value, ref5.current.getAttribute("name"))}
                                options={parkingTypes}
                                sx={{ width: 300 }}
                                style={{ width: 50 + '%' }}
                                renderInput={(params) => <TextField {...params} label="Parking type" />}
                                required
                                key={submitted}
                            />
                            <div className="invalid-feedback">
                                Parking type is required.
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="dateFrom">Date from </label>
                            <input
                                type='date'
                                name="dateFrom"
                                placeholder="Date to"
                                className="form-control"
                                onChange={(e) => handleChange(e)}
                                style={{ width: 50 + '%' }}
                                required
                            />
                            <div className="invalid-feedback">
                                Date from is required.
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="dateTo">Date to </label>
                            <input
                                type='date'
                                name="dateTo"
                                placeholder="Date to"
                                className="form-control"
                                onChange={(e) => handleChange(e)}
                                style={{ width: 50 + '%' }}
                                required
                            />
                            <div className="invalid-feedback">
                                Date to is required.
                            </div>
                        </div>
                        <Button type='button' size='lg' className='mt-4' onClick={() => handleSubmit()}>
                            Izračunaj
                        </Button>
                    </div>

                    {errorMessage &&
                        <div className="alert alert-danger mt-4" style={{ width:300 + 'px'}} >
                            {errorMessage}
                        </div>
                    }
                    {calculatedPrice &&
                        <p className='p-caclucator output' id="parkingOutput" style={{ display: 'block' }}>Cijena za platiti iznosi {calculatedPrice},00 HRK </p>
                    }

                </div>

                <div style={{ marginLeft: 'auto', marginRight: 100 + 'px', width: 'auto' }}>
                    <Table striped bordered hover style={{ width: 380 + 'px' }} variant="dark" >
                        <thead>
                            <tr>
                                <th>Broj dana</th>
                                <th>Cijena I. Zona (HRK)</th>
                                <th>Cijena II. Zona (HRK)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0</td>
                                <td>75.00</td>
                                <td>75.00</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>80.00</td>
                                <td>85.00</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>120.00</td>
                                <td>130.00</td>
                            </tr>
                            <tr>
                                <td >3</td>
                                <td>160.00</td>
                                <td>175.00</td>
                            </tr>
                            <tr>
                                <td >4</td>
                                <td>200.00</td>
                                <td>220.00</td>
                            </tr>
                            <tr>
                                <td >5</td>
                                <td>240.00</td>
                                <td>265.00</td>
                            </tr>
                            <tr>
                                <td >6</td>
                                <td>280.00</td>
                                <td>310.00</td>
                            </tr>
                            <tr>
                                <td >7</td>
                                <td>320.00</td>
                                <td>355.00</td>
                            </tr>
                            <tr>
                                <td >Svaki dodatni dan (8+)</td>
                                <td>+35.00</td>
                                <td>+47.00</td>
                            </tr>
                        </tbody>
                    </Table>

                    <p>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>*</span> Natkriveni parking (II. Zona) se naplaćuje 5 kn više po danu osim ako se ostaje manje od jednog dana u tom slučaju je ista cijena (75 HRK)
                    </p>

                </div>
            </div>
            <hr style={{ marginTop: 50 + 'px' }} />
            <footer>
                <p>© 2022 - SkyPark d.o.o.</p>
            </footer>
        </div>

    )

};

export { ParkingCalculator };

export const parkingTypes = [
    { label: ParkingType.I_ZONE },
    { label: ParkingType.II_ZONE },
];