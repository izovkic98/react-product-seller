import { useState, useEffect, useRef } from 'react';
import ReservationService from '../../services/reservation.service';
import { ReservationEdit } from '../../components/reservation-edit';
import Reservation from '../../models/reservation';
import { ReservationStatus } from '../../models/reservationStatus';
import { ReservationDelete } from '../../components/reservation-delete';
import { types } from './../../components/reservation-edit';
import { manufacturers } from './../../components/reservation-edit';
import Pagination from './pagination';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import './admin.page.css'
import UserService from '../../services/user.service';
import User from './../../models/user';
import Alert from 'react-bootstrap/Alert';
import { parkingTypes } from './../parkingCalculator/parking.calculator';
import { ParkingType } from '../../models/parkingType';
import moment from 'moment';
import { Button, Table } from 'react-bootstrap';
import { I18nProvider, LOCALES } from "../../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";

const AdminPage = () => {

    const [reservationList, setReservationList] = useState([]);
    const [userList, setUserList] = useState([]);

    const [selectedReservation, setSelectedReservation] = useState(new Reservation('', '', '', '', '', '', '', ''));
    const [errorMessage, setErrorMessage] = useState('');
    const [formerrorMessage, setFormerrorMessage] = useState('');


    const saveComponent = useRef();
    const deleteComponent = useRef();
    const reservationCreationRef = useRef();

    const [currentPage, setCurrentPage] = useState(1);
    const [reservationsPerPage] = useState(5)

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [calculatedPrice, setCalculatedPrice] = useState('');
    const [zoneType, setZoneType] = useState('');
    const [resetButton, setResetButton] = useState(false);
    const dateFromMoment = moment(dateFrom);
    const dateToMoment = moment(dateTo);

    const [reservation, setReservation] = useState(new Reservation('', '', '', '', '', '', '', ''));

    useEffect(() => {
        ReservationService.getAllReservations().then((response) => {
            setReservationList(response.data);
        })

        UserService.getAllUsers().then((response) => {
            setUserList(response.data)
        })


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

    }, [calculatedPrice]);


    const editReservationRequest = (item) => {
        setSelectedReservation(Object.assign({}, item));
        saveComponent.current?.showReservationModal();
    };

    const saveReservationWatcher = (reservation) => {
        let itemIndex = reservationList.findIndex(item => item.id === reservation.id);

        if (itemIndex !== -1) {
            const newList = reservationList.map((item) => {
                if (item.id === reservation.id) {
                    return reservation;
                }
                return item;
            });
            setReservationList(newList);
        } else {
            const newList = reservationList.concat(reservation);
            setReservationList(newList);
        }
    };

    const changeReservationStatus = (reservationId) => {
        var tempReservation;
        ReservationService.getReservationById(reservationId).then((res) => {
            tempReservation = res.data;
            if (tempReservation.reservationStatus === ReservationStatus.APPROVED) tempReservation.reservationStatus = ReservationStatus.IN_PROCESS;
            else tempReservation.reservationStatus = ReservationStatus.APPROVED;
            ReservationService.changeReservationStatus(tempReservation).then((res) => {
                ReservationService.getAllReservations().then((res) => {
                    setReservationList(res.data);
                })
            }).catch(err => {
                setErrorMessage('Unexpected error occurred, most likely parking is full.');
                console.log(err);
            });

        })

    }

    const deleteReservationRequest = (reservation) => {
        setSelectedReservation(reservation);
        deleteComponent.current?.showDeleteModal();
    };


    const deleteReservation = () => {
        console.log(selectedReservation)
        ReservationService.deleteReservation(selectedReservation).then(_ => {
            setReservationList(reservationList.filter(x => x.id !== selectedReservation.id));
        }).catch(err => {
            setErrorMessage('Unexpected error occurred, most likely parking is full.');
            console.log(err);
        });
    };


    //PAGINATION PART (RESERVATIONS)
    const indexOfLastReservation = currentPage * reservationsPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
    const currentReservations = reservationList?.slice(indexOfFirstReservation, indexOfLastReservation);
    const totalPagesNum = Math.ceil(reservationList?.length / reservationsPerPage);




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

        console.log(showResCreation);

        if (showResCreation) {
            x.style.display = "block";
            setResCreation(false)
        } else {
            x.style.display = "none";
            setResCreation(true)
        }
    }

    const showRegistratedUsersTable = () => {

        if (firstNameInput && lastNameInput) {
            setFirstNameInput(false)
            setLastNameInput(false)
        } else {
            setFirstNameInput(true)
            setLastNameInput(true)
        }
        if (showUsersTable) {
            setShowUsersTable(false);
        } else {
            setShowUsersTable(true);
        }
    }

    const selectUser = (userId) => {
        UserService.getUserById(userId).then((res) => {
            setSelectedUser(res.data);
        })

        setReservation((prevState => {
            return {
                ...prevState,
                "user": { "id": userId }
            };
        }));

        console.log(reservation)

        setShowUsersTable(false);
        setDisabledCheckBox(true)

    }

    const deselect = () => {
        setShowUsersTable(true);
        setDisabledCheckBox(false);
    }


    const saveReservation = (e) => {
        console.log("okinulo sejvanje rezervacije")
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

            ReservationService.getAllReservations().then((res) => {
                setReservationList(res.data);
            })

            document.getElementById("reservationForm").reset();
            setResCreation(true)
            setShowSuccessAlert(true)

            reset()
            setDisabledCheckBox(false);
            setFirstNameInput(false);
            setLastNameInput(false)

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


    // SEARCH BAR

    const [query, setQuery] = useState("")
    const reservationKeys = ["user?.firstName", "user?.lastName", "vehicleModel", "vehicleManufacturer"]
    const [queryUsers, setQueryUsers] = useState("")
    const userKeys = ["firstName", "lastName", "username", "email"]

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

        <I18nProvider locale={localStorage.getItem("language")}>
            <div>
                <div className="container" >
                    <div className="pt-5">

                        {errorMessage &&
                            <div className="alert alert-danger">
                                {errorMessage}
                            </div>
                        }

                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-6">
                                        <h3><FormattedMessage id='all_res' /></h3>
                                    </div>
                                    <div className="col-6 text-end">
                                        <FormattedMessage id='search'>
                                            {(msg) => (
                                                <input type="text" placeholder={msg}
                                                    onChange={e => setQuery(e.target.value)} />
                                            )}
                                        </FormattedMessage>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">

                                <table className="table table-striped table-dark">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col"><FormattedMessage id='fName_lName_w' /></th>
                                            <th scope="col"><FormattedMessage id='veh_model' /></th>
                                            <th scope="col"><FormattedMessage id='veh_manuf' /></th>
                                            <th scope="col"><FormattedMessage id='date_from' /></th>
                                            <th scope="col"><FormattedMessage id='date_to' /></th>
                                            <th scope="col"><FormattedMessage id='date_of_res' /></th>
                                            <th scope="col"><FormattedMessage id='price' /> (HRK)</th>
                                            <th scope="col"><FormattedMessage id='park_type' /></th>
                                            <th scope="col"><FormattedMessage id='res_status' /></th>
                                            <th scope="col"><FormattedMessage id='action' /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!query ? (currentReservations.map((reservation, ind) =>
                                            <tr key={reservation.id}>
                                                <th scope="row">{ind + 1}</th>
                                                <td>{reservation?.user?.firstName} {reservation?.user?.lastName}</td>
                                                <td>{reservation.vehicleModel}</td>
                                                <td>{reservation.vehicleManufacturer}</td>
                                                <td>{new Date(reservation.dateFrom).toLocaleDateString()}</td>
                                                <td>{new Date(reservation.dateTo).toLocaleDateString()}</td>
                                                <td>{new Date(reservation.reservationDate).toLocaleDateString()}</td>
                                                <td>{reservation.price}</td>
                                                <td>{reservation.parkingType}</td>
                                                <td>{reservation.reservationStatus}</td>
                                                <td>
                                                    <button hidden={(reservation.reservationStatus === ReservationStatus.APPROVED)} onClick={() => changeReservationStatus(reservation.id)} className="btn btn-success me-1" >
                                                        <FormattedMessage id='approve' />
                                                    </button>

                                                    <button hidden={(reservation.reservationStatus === ReservationStatus.IN_PROCESS)} onClick={() => changeReservationStatus(reservation.id)} className="btn btn-secondary me-1" >
                                                        <FormattedMessage id='deny' />
                                                    </button>

                                                    <button className="btn btn-light me-1" onClick={() => editReservationRequest(reservation)} >
                                                        <FormattedMessage id='edit' />
                                                    </button>

                                                    <button className="btn btn-danger" onClick={() => deleteReservationRequest(reservation)} >
                                                        <FormattedMessage id='delete' />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                            :
                                            (reservationList.filter((item) => reservationKeys.some((key) =>
                                                item[key]?.toLowerCase().includes(query))).map((reservation, ind) =>
                                                    <tr key={reservation.id}>
                                                        <th scope="row">{ind + 1}</th>
                                                        <td>{reservation?.user?.firstName} {reservation?.user?.lastName}</td>
                                                        <td>{reservation.vehicleModel}</td>
                                                        <td>{reservation.vehicleManufacturer}</td>
                                                        <td>{new Date(reservation.dateFrom).toLocaleDateString()}</td>
                                                        <td>{new Date(reservation.dateTo).toLocaleDateString()}</td>
                                                        <td>{new Date(reservation.reservationDate).toLocaleDateString()}</td>
                                                        <td>{reservation.price}</td>
                                                        <td>{reservation.parkingType}</td>
                                                        <td>{reservation.reservationStatus}</td>
                                                        <td>
                                                            <button hidden={(reservation.reservationStatus === ReservationStatus.APPROVED)} onClick={() => changeReservationStatus(reservation.id)} className="btn btn-success me-1" >
                                                                <FormattedMessage id='approve' />
                                                            </button>

                                                            <button hidden={(reservation.reservationStatus === ReservationStatus.IN_PROCESS)} onClick={() => changeReservationStatus(reservation.id)} className="btn btn-secondary me-1" >
                                                                <FormattedMessage id='deny' />
                                                            </button>

                                                            <button className="btn btn-light me-1" onClick={() => editReservationRequest(reservation)} >
                                                                <FormattedMessage id='edit' />
                                                            </button>

                                                            <button className="btn btn-danger" onClick={() => deleteReservationRequest(reservation)} >
                                                                <FormattedMessage id='delete' />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                        }
                                    </tbody>
                                </table>
                                {!query &&
                                    <Pagination pages={totalPagesNum}
                                        setCurrentPage={setCurrentPage}
                                        currentObjects={currentReservations}
                                        sortedObjects={reservationList} />
                                }
                            </div>
                        </div>
                    </div>

                    {/*RESERVATION CREATION DIV  */}
                    {showResCreation &&
                        <div className="col-6 text-end">
                            <button className="btn btn-primary" onClick={() => showCreateReservation()}>
                                <FormattedMessage id='new_rez' />
                            </button>
                        </div>
                    }

                    {showSuccessAlert &&

                        <Alert className='alert-success' variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                            <Alert.Heading><FormattedMessage id='res_succ' /></Alert.Heading>
                        </Alert>
                    }

                </div>

                <ReservationEdit ref={saveComponent} reservation={selectedReservation} onSaved={(p) => saveReservationWatcher(p)} />
                <ReservationDelete ref={deleteComponent} onConfirmed={() => deleteReservation()} />


                <div className='container--narrow'>
                    <div ref={reservationCreationRef} >
                        <div className="modal-header" style={{ marginBottom: 40 }} />
                        <form id='reservationForm' onSubmit={(e) => saveReservation(e)}
                            noValidate
                            className={submitted ? 'was-validated' : ''}>
                            <h4 style={{ marginLeft: 15 }} ><FormattedMessage id='res_details' /> </h4>

                            <div className="modal-body">

                                {formerrorMessage &&
                                    <div className="alert alert-danger">
                                        {formerrorMessage}
                                    </div>
                                }

                                <div className="form-group mt-3">
                                    <label htmlFor="vehicleModel"><FormattedMessage id='veh_model' /> </label>
                                    <FormattedMessage id='veh_model'>
                                        {(msg) => (
                                            <input
                                                type="text"
                                                name="vehicleModel"
                                                onChange={(e) => handleChange(e)}
                                                placeholder={msg}
                                                className="form-control input-width"
                                                style={{ width: 50 + '%' }}
                                                required
                                            />
                                        )}
                                    </FormattedMessage>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='req_field' />
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
                                        renderInput={(params) => <TextField {...params} label={<FormattedMessage id='veh_manuf' />} />}
                                        required
                                        key={submitted}
                                    />
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='req_field' />
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
                                        renderInput={(params) => <TextField {...params} label={<FormattedMessage id='veh_type' />} />}
                                        required
                                        key={submitted}
                                    />
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='req_field' />
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
                                        renderInput={(params) => <TextField {...params} label={<FormattedMessage id='park_type' />} />}
                                        required
                                        key={submitted}
                                        disabled={resetButton}
                                        readOnly={resetButton}
                                    />
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='req_field' />
                                    </div>
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="dateFrom"><FormattedMessage id='date_from' /> </label>
                                    <FormattedMessage id='date_from'>
                                        {(msg) => (
                                            <input
                                                type='date'
                                                name="dateFrom"
                                                placeholder={msg}
                                                className="form-control"
                                                onChange={(e) => handleChange(e)}
                                                style={{ width: 50 + '%' }}
                                                required
                                                readOnly={resetButton}
                                            />
                                        )}
                                    </FormattedMessage>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='req_field' />
                                    </div>
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="dateTo"><FormattedMessage id='date_to' /> </label>
                                    <FormattedMessage id='date_to'>
                                        {(msg) => (
                                            <input
                                                type='date'
                                                name="dateTo"
                                                placeholder={msg}
                                                className="form-control"
                                                onChange={(e) => handleChange(e)}
                                                style={{ width: 50 + '%' }}
                                                required
                                                readOnly={resetButton}
                                            />
                                        )}
                                    </FormattedMessage>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='req_field' />
                                    </div>
                                </div>
                                {!resetButton &&
                                    <Button type='button' className="btn mt-4" onClick={() => handleCalculation()}>
                                        <FormattedMessage id='calculate' />
                                    </Button>
                                }

                                {resetButton &&
                                    <button className="btn btn-danger me-1 mt-4" type='button' onClick={() => reset()} >
                                        <FormattedMessage id='reset' />
                                    </button>
                                }
                                <div className="form-group mt-3" >
                                    <label htmlFor="price"><FormattedMessage id='price' />(HRK) </label>
                                    <FormattedMessage id='price'>
                                        {(msg) => (
                                            <input
                                                type='text'
                                                name="price"
                                                placeholder={msg}
                                                className="form-control"
                                                style={{ width: 50 + '%' }}
                                                required
                                                onChange={(e) => handleChange(e)}
                                                value={calculatedPrice}
                                                readOnly
                                            />
                                        )}
                                    </FormattedMessage>
                                    <span ><span style={{ color: 'red', fontWeight: 'bold', marginTop: 10 + 'px' }}>*</span> <FormattedMessage id='rez_info' /></span>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='req_field' />
                                    </div>
                                </div>


                                <div className="modal-header" style={{ marginBottom: 40, marginTop: 30 }} />
                                <h4 style={{ marginLeft: 15 }} ><FormattedMessage id='user_details' /></h4>
                                <div className="form-check mt-5" >
                                    <input className="form-check-input" type="checkbox" disabled={disabledCheckBox} onClick={() => showRegistratedUsersTable()} id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        <FormattedMessage id='reg_user' />
                                    </label>
                                </div>

                                {!showUsersTable &&
                                    <div className="form-group mt-3">
                                        <label htmlFor="firstName"><FormattedMessage id='first_name_w' /></label>
                                        <FormattedMessage id='first_name_w'>
                                            {(msg) => (
                                                <input
                                                    type='text'
                                                    name="firstName"
                                                    placeholder={disabledCheckBox ? selectedUser.firstName : msg}
                                                    className="form-control"
                                                    onChange={(e) => handleChange(e)}
                                                    disabled={firstNameInput}
                                                    style={{ width: 50 + '%' }}
                                                    required
                                                />
                                            )}
                                        </FormattedMessage>
                                        <div className="invalid-feedback">
                                            <FormattedMessage id='req_field' />
                                        </div>
                                    </div>
                                }

                                {!showUsersTable &&
                                    <div className="form-group mt-3">
                                        <label htmlFor="lastName"><FormattedMessage id='last_name_w' /></label>
                                        <FormattedMessage id='last_name_w'>
                                            {(msg) => (
                                                <input
                                                    type='text'
                                                    name="lastName"
                                                    placeholder={disabledCheckBox ? selectedUser.lastName : msg}
                                                    className="form-control"
                                                    onChange={(e) => handleChange(e)}
                                                    disabled={lastNameInput}
                                                    style={{ width: 50 + '%' }}
                                                    required
                                                />
                                            )}
                                        </FormattedMessage>
                                        <div className="invalid-feedback">
                                            <FormattedMessage id='req_field' />
                                        </div>
                                    </div>
                                }

                                {(!showUsersTable && disabledCheckBox) &&

                                    <button className="btn btn-danger me-1 mt-4" type='button' onClick={() => deselect()} >
                                        <FormattedMessage id='reset' />
                                    </button>
                                }

                                {/*USER TABLE  */}

                                {showUsersTable &&
                                    <div className="card mt-5">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-6">
                                                    <h3><FormattedMessage id='all_users' /></h3>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <FormattedMessage id='search'>
                                                        {(msg) => (
                                                            <input type="text" placeholder={msg}
                                                                onChange={e => setQueryUsers(e.target.value)} />
                                                        )}
                                                    </FormattedMessage>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">

                                            <table className="table table-striped table-dark">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col"><FormattedMessage id='fName_lName_w' /></th>
                                                        <th scope="col"><FormattedMessage id='username_w' /></th>
                                                        <th scope="col"><FormattedMessage id='email_w' /></th>
                                                        <th scope="col"><FormattedMessage id='phone_number_w' /></th>
                                                        <th scope="col"><FormattedMessage id='action' /></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {!queryUsers ? (currentUsers.map((user, ind) =>
                                                        <tr key={user.id}>
                                                            <th scope="row">{ind + 1}</th>
                                                            <td>{user.firstName} {user.lastName}</td>
                                                            <td>{user.username}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.phoneNumber}</td>
                                                            <td>
                                                                <button className="btn btn-info me-1" type='button' onClick={() => selectUser(user.id)} >
                                                                    <FormattedMessage id='select' />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )) :
                                                        (userList.filter((item) => userKeys.some((key) =>
                                                            item[key].toLowerCase().includes(queryUsers))).map((user, ind) =>
                                                                <tr key={user.id}>
                                                                    <th scope="row">{ind + 1}</th>
                                                                    <td>{user.firstName} {user.lastName}</td>
                                                                    <td>{user.username}</td>
                                                                    <td>{user.email}</td>
                                                                    <td>{user.phoneNumber}</td>
                                                                    <td>
                                                                        <button className="btn btn-info me-1" type='button' onClick={() => selectUser(user.id)} >
                                                                            <FormattedMessage id='select' />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))


                                                    }
                                                </tbody>
                                            </table>
                                            {!queryUsers &&
                                                <Pagination pages={totalPagesNumUsers}
                                                    setCurrentPage={setCurrentUsersPage}
                                                    currentObjects={currentUsers}
                                                    sortedObjects={userList} />
                                            }
                                        </div>
                                    </div>

                                }


                                {/*USER TABLE  */}

                            </div>

                            <div className="modal-footer" style={{ marginTop: 40 }}>
                                <button type="button" className="btn btn-secondary" onClick={() => showCreateReservation()} ><FormattedMessage id='close' /></button>
                                <button type="submit" className="btn btn-primary"><FormattedMessage id='save' /></button>
                            </div>
                        </form>
                    </div>
                </div>
                <hr style={{ marginTop: 50 + 'px' }} />
                <footer>
                    <p>© 2022 - SkyPark d.o.o.</p>
                </footer>
            </div>
        </I18nProvider>

    )
}

export { AdminPage };