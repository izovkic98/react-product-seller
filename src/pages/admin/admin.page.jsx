import { useState, useEffect, useRef, useContext } from 'react';
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

const AdminPage = () => {

    const [reservationList, setReservationList] = useState([]);
    const [userList, setUserList] = useState([]);

    const [selectedReservation, setSelectedReservation] = useState(new Reservation('', '', '', '', '', '', '', ''));
    const [errorMessage, setErrorMessage] = useState('');


    const saveComponent = useRef();
    const deleteComponent = useRef();
    const reservationCreationRef = useRef();

    const [currentPage, setCurrentPage] = useState(1);
    const [reservationsPerPage] = useState(5)

    useEffect(() => {
        ReservationService.getAllReservations().then((response) => {
            setReservationList(response.data);
        })

        UserService.getAllUsers().then((response) => {
            setUserList(response.data)
        })

        setResCreation(false);

    }, []);

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
            ReservationService.updateReservation(tempReservation).then((res) => {
                ReservationService.getAllReservations().then((res) => {
                    setReservationList(res.data);
                })
            })

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
            setErrorMessage('Unexpected error occurred.');
            console.log(err);
        });
    };


    //PAGINATION PART (RESERVATIONS)
    const indexOfLastReservation = currentPage * reservationsPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
    const currentReservations = reservationList?.slice(indexOfFirstReservation, indexOfLastReservation);
    const totalPagesNum = Math.ceil(reservationList?.length / reservationsPerPage);




    // RESERVATION CREATION PART

    const [reservation, setReservation] = useState(new Reservation('', '', '', '', '', '', '', ''));
    const [selectedUser, setSelectedUser] = useState(new User('', '', '', '', '', ''))
    const [errorMessageResCreation, setErrorMessageResCreation] = useState('');
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

    const ref0 = useRef();
    const ref1 = useRef();

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
                ["user"]: { "id": userId }
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

        if (!reservation.vehicleModel || !reservation.vehicleManufacturer || !reservation.vehicleType || !reservation.dateFrom
            || !reservation.dateTo || !reservation.price) {

            console.log(selectedUser.id);
            console.log(reservation.vehicleModel);
            console.log(reservation.vehicleManufacturer);
            console.log(reservation.vehicleType);
            console.log(reservation.dateFrom);
            console.log(reservation.dateTo);
            console.log(reservation.price);


            console.log("returnalo me");
            return;
        }

        ReservationService.saveReservation(reservation).then(response => {
            setSubmitted(false);

            var x = reservationCreationRef.current;
            x.style.display = "none";
            setResCreation(true)
        }).catch(err => {
            setErrorMessage('Unexpected error occurred.');
            console.log(err);
        });
    };


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
            <div className="container">
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
                                    <h3>All Reservations</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">

                            <table className="table table-striped table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Full name</th>
                                        <th scope="col">Vehicle model</th>
                                        <th scope="col">Vehicle manufacturer</th>
                                        <th scope="col">Date from </th>
                                        <th scope="col">Date to </th>
                                        <th scope="col">Date of reservation</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Reservation status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentReservations.map((reservation, ind) =>
                                        <tr key={reservation.id}>
                                            <th scope="row">{ind + 1}</th>
                                            <td>{reservation?.user?.firstName} {reservation?.user?.lastName}</td>
                                            <td>{reservation.vehicleModel}</td>
                                            <td>{reservation.vehicleManufacturer}</td>
                                            <td>{new Date(reservation.dateFrom).toLocaleDateString()}</td>
                                            <td>{new Date(reservation.dateTo).toLocaleDateString()}</td>
                                            <td>{new Date(reservation.reservationDate).toLocaleDateString()}</td>
                                            <td>{`$ ${reservation.price}`}</td>
                                            <td>{reservation.reservationStatus}</td>
                                            <td>
                                                <button hidden={(reservation.reservationStatus === ReservationStatus.APPROVED)} onClick={() => changeReservationStatus(reservation.id)} className="btn btn-success me-1" >
                                                    Approve
                                                </button>

                                                <button hidden={(reservation.reservationStatus === ReservationStatus.IN_PROCESS)} onClick={() => changeReservationStatus(reservation.id)} className="btn btn-secondary me-1" >
                                                    Deny
                                                </button>

                                                <button className="btn btn-light me-1" onClick={() => editReservationRequest(reservation)} >
                                                    Edit
                                                </button>

                                                <button className="btn btn-danger" onClick={() => deleteReservationRequest(reservation)} >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <Pagination pages={totalPagesNum}
                                setCurrentPage={setCurrentPage}
                                currentObjects={currentReservations}
                                sortedObjects={reservationList} />

                        </div>
                    </div>
                </div>

                {/*RESERVATION CREATION DIV  */}
                {(showResCreation === true) &&
                    <div className="col-6 text-end">
                        <button className="btn btn-primary" onClick={() => showCreateReservation()}>
                            Create Reservation
                        </button>
                    </div>
                }

            </div>

            <ReservationEdit ref={saveComponent} reservation={selectedReservation} onSaved={(p) => saveReservationWatcher(p)} />
            <ReservationDelete ref={deleteComponent} onConfirmed={() => deleteReservation()} />


            <div className='container--narrow'>
                <div ref={reservationCreationRef} >
                    <div className="modal-header" style={{ marginBottom: 40 }} />
                    <form onSubmit={(e) => saveReservation(e)}
                        noValidate
                        className={submitted ? 'was-validated' : ''}>
                        <h4 style={{ marginLeft: 15 }} >Reservation details </h4>

                        <div className="modal-body">

                            {errorMessage &&
                                <div className="alert alert-danger">
                                    {errorMessage}
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
                                />
                                <div className="invalid-feedback">
                                    Vehicle type is required.
                                </div>
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="dateFrom">Date from </label>
                                <input
                                    type='date'
                                    name="dateFrom"
                                    placeholder="Date from"
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

                            <div className="form-group mt-3">
                                <label htmlFor="price">Price (HRK) </label>
                                <input
                                    type='text'
                                    name="price"
                                    placeholder="Price (EUR)"
                                    className="form-control"
                                    onChange={(e) => handleChange(e)}
                                    style={{ width: 50 + '%' }}
                                    required
                                />
                                <div className="invalid-feedback">
                                    price is required.
                                </div>
                            </div>

                            <div className="modal-header" style={{ marginBottom: 40, marginTop: 30 }} />
                            <h4 style={{ marginLeft: 15 }} >User details </h4>
                            <div className="form-check mt-5" >
                                <input className="form-check-input" type="checkbox" disabled={disabledCheckBox} onClick={() => showRegistratedUsersTable()} id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Registered user
                                </label>
                            </div>

                            {!showUsersTable &&
                                <div className="form-group mt-3">
                                    <label htmlFor="firstName">First name</label>
                                    <input
                                        type='text'
                                        name="firstName"
                                        placeholder={disabledCheckBox ? selectedUser.firstName : "First name"}
                                        className="form-control"
                                        onChange={(e) => handleChange(e)}
                                        disabled={firstNameInput}
                                        style={{ width: 50 + '%' }}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        First name is required.
                                    </div>
                                </div>
                            }

                            {!showUsersTable &&
                                <div className="form-group mt-3">
                                    <label htmlFor="lastName">Last name</label>
                                    <input
                                        type='text'
                                        name="lastName"
                                        placeholder={disabledCheckBox ? selectedUser.lastName : "Last name"}
                                        className="form-control"
                                        onChange={(e) => handleChange(e)}
                                        disabled={lastNameInput}
                                        style={{ width: 50 + '%' }}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Last name is required.
                                    </div>
                                </div>
                            }

                            {(!showUsersTable && disabledCheckBox) &&

                                <button className="btn btn-danger me-1 mt-4" type='button' onClick={() => deselect()} >
                                    Deselect
                                </button>
                            }

                            {/*USER TABLE  */}

                            {showUsersTable &&
                                <div className="card mt-5">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-6">
                                                <h3>All users</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">

                                        <table className="table table-striped table-dark">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Full name</th>
                                                    <th scope="col">Username</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Phone number </th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentUsers.map((user, ind) =>
                                                    <tr key={user.id}>
                                                        <th scope="row">{ind + 1}</th>
                                                        <td>{user.firstName} {user.lastName}</td>
                                                        <td>{user.username}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.phoneNumber}</td>
                                                        <td>
                                                            <button className="btn btn-info me-1" type='button' onClick={() => selectUser(user.id)} >
                                                                Select
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>

                                        <Pagination pages={totalPagesNumUsers}
                                            setCurrentPage={setCurrentUsersPage}
                                            currentObjects={currentUsers}
                                            sortedObjects={userList} />

                                    </div>
                                </div>

                            }


                            {/*USER TABLE  */}

                        </div>

                        <div className="modal-footer" style={{ marginTop: 40 }}>
                            <button type="button" className="btn btn-secondary" onClick={() => showCreateReservation()} >Close</button>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>


        </div>


    )
}

export { AdminPage };