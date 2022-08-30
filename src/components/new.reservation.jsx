import { useState, useEffect, useRef } from 'react';
import ReservationService from '../services/reservation.service';
import Reservation from '../models/reservation';
import { ReservationStatus } from '../models/reservationStatus';
import { types } from './../components/reservation-edit';
import { manufacturers } from './../components/reservation-edit';
import Pagination from '../pages/admin/pagination';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import '../pages/admin/admin.page.css'
import UserService from '../services/user.service';
import User from '../models/user';
import Alert from 'react-bootstrap/Alert';
import { parkingTypes } from './../pages/parkingCalculator/parking.calculator';
import { ParkingType } from '../models/parkingType';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom'
import ButtonCus from '@material-ui/core/Button';
import { useSelector } from 'react-redux';


const NewReservation = () => {


    const [reservationList, setReservationList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [formerrorMessage, setFormerrorMessage] = useState('');
    const reservationCreationRef = useRef();

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [calculatedPrice, setCalculatedPrice] = useState('');
    const [zoneType, setZoneType] = useState('');
    const [resetButton, setResetButton] = useState(false);
    const dateFromMoment = moment(dateFrom);
    const dateToMoment = moment(dateTo);

    const currentUser = useSelector(state => state.user);

    const [reservation, setReservation] = useState(new Reservation('', '', '', '', '', '', '', ''));

    useEffect(() => {


        setCalculatedPrice(calculatedPrice);

        setResCreation(false);

    }, []);


    useEffect(() => {
        if (calculatedPrice) {
            setReservation((prevState => {
                return {
                    ...prevState,
                    price: calculatedPrice
                };
            }));
        }

        setReservation((prevState => {
            return {
                ...prevState,
                user: { id: currentUser.id }
            };
        }));

        console.log("currentUser.id" + currentUser.id)
        

    }, [calculatedPrice]);


    // RESERVATION CREATION PART


    const [selectedUser, setSelectedUser] = useState(new User('', '', '', '', '', ''))
    const [submitted, setSubmitted] = useState(false);
    const [showResCreation, setResCreation] = useState();
    const [disabledCheckBox, setDisabledCheckBox] = useState();
    const [showUsersTable, setShowUsersTable] = useState(false);
    const [firstNameInput, setFirstNameInput] = useState(false);
    const [lastNameInput, setLastNameInput] = useState(false);

    const [currentUsersPage, setCurrentUsersPage] = useState(1);
    const [usersPerPage] = useState(5)

    const indexOfLastUser = currentUsersPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userList?.slice(indexOfFirstUser, indexOfLastUser);
    const totalPagesNumUsers = Math.ceil(userList?.length / usersPerPage);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const ref0 = useRef();
    const ref1 = useRef();
    const ref2 = useRef();

    const showCreateReservation = () => {
        var x = reservationCreationRef.current;

        setShowSuccessAlert(false)

        if (showResCreation) {
            x.style.display = "block";
            setResCreation(false)
        } else {
            x.style.display = "none";
            setResCreation(true)
        }
    }


    const saveReservation = (e) => {
        console.log("okinulo sejvanje rezervacije")
        console.log("currentUser.id" + currentUser.id)
        e.preventDefault();
        setSubmitted(true);
        setFormerrorMessage(false);

        console.log("dole " + reservation)

        if (!reservation.vehicleModel || !reservation.vehicleManufacturer || !reservation.vehicleType || !reservation.dateFrom
            || !reservation.dateTo || !reservation.price || !reservation.parkingType) {
            setFormerrorMessage("Some mandatory fields are empty")
            console.log(selectedUser.id);
            console.log(reservation.vehicleModel);
            console.log(reservation.vehicleManufacturer);
            console.log(reservation.vehicleType);
            console.log(reservation.dateFrom);
            console.log(reservation.dateTo);
            console.log(reservation.price);
            console.log(reservation.parkingType);

            return;



        }

        ReservationService.saveReservation(reservation).then(response => {
            setSubmitted(false);

            var x = reservationCreationRef.current;
            x.style.display = "none";

            ReservationService.getAllCurrentReservationOfAUser().then((res) => {
                setReservationList(res.data);
            })

            document.getElementById("reservationForm").reset();
            setResCreation(true)
            setShowSuccessAlert(true)

            reset();


        }).catch(err => {
            setFormerrorMessage('Unexpected error occurred.');
            console.log(err);
        });
        
    };


    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log("name: " + name)
        console.log("value: " + value)

        if (name === 'dateFrom') {
            setDateFrom(value);
        } else if (name === 'dateTo') {
            setDateTo(value);
        }

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
        console.log(ref)

        if (ref === 'parkingType') {
            setZoneType(value.label);
        }

        setReservation((prevState => {
            return {
                ...prevState,
                [ref]: value.label
            };
        }));
    };

    // KALKULACIJA CIJENE

    const handleCalculation = () => {
        console.log("handleCalculation")

        let diff = 0;
        let secondZoneUp = 0;

        if (!zoneType) {
            return;
        }

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

        setResetButton(true);

    };

    const reset = () => {
        setResetButton(false);
        setCalculatedPrice('');
    }

    return (
        <div>

            {showSuccessAlert &&

                <Alert className='alert-success' variant="success" onClose={() => showCreateReservation()} dismissible>
                    <Alert.Heading>Reservation successfuly saved !</Alert.Heading>
                </Alert>
            }

            <div className='container--narrow'>
                <div ref={reservationCreationRef} >
                    <form id='reservationForm' onSubmit={(e) => saveReservation(e)}
                        noValidate
                        className={submitted ? 'was-validated' : ''}
                        style={{ marginTop: 50 + 'px' }}>
                        <h4 style={{ marginLeft: 15 }} >Reservation details </h4>

                        <div className="modal-body">

                            {formerrorMessage &&
                                <div className="alert alert-danger">
                                    {formerrorMessage}
                                </div>
                            }

                            <div className="form-group mt-3">
                                <label htmlFor="vehicleModel">Vehicle model </label>
                                <input
                                    type="text"
                                    name="vehicleModel"
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Vehicle model {e.g. Passat}"
                                    className="form-control input-width"
                                    style={{ width: 50 + '%' }}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Vehicle model is required.
                                </div>
                            </div>

                            <div className="form-group mt-1" style={{ marginBottom: 10 }}>
                                <Autocomplete
                                    name='vehicleManufacturer'
                                    ref={ref0}
                                    getOptionLabel={(option) => option.label}
                                    disablePortal
                                    onChange={(event, value, ref) => handleChangeDropdown(event, value, ref0.current.getAttribute("name"))}
                                    options={manufacturers}
                                    sx={{ width: 300 }}
                                    style={{ width: 50 + '%' }}
                                    renderInput={(params) => <TextField {...params} label="Vehicle manufacturer" />}
                                    required
                                    key={submitted}
                                />
                                <div className="invalid-feedback">
                                    Vehicle manufacturer is required.
                                </div>
                            </div>

                            <div className="form-group mt-1" style={{ marginBottom: 10 }}>
                                <Autocomplete
                                    name="vehicleType"
                                    ref={ref1}
                                    getOptionLabel={(option) => option.label}
                                    disablePortal
                                    onChange={(event, value, ref) => handleChangeDropdown(event, value, ref1.current.getAttribute("name"))}
                                    options={types}
                                    sx={{ width: 300 }}
                                    style={{ width: 50 + '%' }}
                                    renderInput={(params) => <TextField {...params} label="Vehicle type" />}
                                    required
                                    key={submitted}
                                />
                                <div className="invalid-feedback">
                                    Vehicle type is required.
                                </div>
                            </div>
                            <div className="form-group mt-1" style={{ marginBottom: 10 }}>
                                <Autocomplete
                                    name="parkingType"
                                    ref={ref2}
                                    getOptionLabel={(option) => option.label}
                                    disablePortal
                                    onChange={(event, value, ref) => handleChangeDropdown(event, value, ref2.current.getAttribute("name"))}
                                    options={parkingTypes}
                                    sx={{ width: 300 }}
                                    style={{ width: 50 + '%' }}
                                    renderInput={(params) => <TextField {...params} label="Parking type" />}
                                    required
                                    key={submitted}
                                    disabled={resetButton}
                                    readOnly={resetButton}
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
                                    readOnly={resetButton}
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
                                    readOnly={resetButton}
                                />
                                <div className="invalid-feedback">
                                    Date to is required.
                                </div>
                            </div>
                            {!resetButton &&
                                <Button type='button' className="btn mt-4" onClick={() => handleCalculation()}>
                                    Calculate
                                </Button>
                            }

                            {resetButton &&
                                <button className="btn btn-danger me-1 mt-4" type='button' onClick={() => reset()} >
                                    Reset
                                </button>
                            }
                            <div className="form-group mt-3" >
                                <label htmlFor="price">Price (HRK) </label>
                                <input
                                    type='text'
                                    name="price"
                                    placeholder="Price (HRK)"
                                    className="form-control"
                                    style={{ width: 50 + '%' }}
                                    required
                                    onChange={(e) => handleChange(e)}
                                    value={calculatedPrice}
                                    readOnly
                                />
                                <span ><span style={{ color: 'red', fontWeight: 'bold', marginTop: 10 + 'px' }}>*</span> For details about price calculation check Calculator.</span>
                                <div className="invalid-feedback">
                                    price is required.
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer" style={{ marginTop: 40 }}>
                          
                            <ButtonCus type='button' variant='contained' component={Link} to="/profile" className="btn btn-secondary ml-4" style={{ color: 'black', marginRight:10+'px', marginTop:'auto' }} >
                                Back
                            </ButtonCus>
                            <ButtonCus type='submit' className="btn btn-primary mt-4" style={{ color: 'white' }} >
                                Save Changes »
                            </ButtonCus>
                            
                        </div>
                    </form>
                </div>
            </div>
            <hr style={{ marginTop: 50 + 'px' }} />
            <footer>
                <p>© 2022 - SkyPark d.o.o.</p>
            </footer>

        </div>

    )

}

export { NewReservation };