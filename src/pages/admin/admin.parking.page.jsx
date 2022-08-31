import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Pagination from './pagination';
import './admin.page.css'
import ParkingService from '../../services/parking.service';
import Parking from '../../models/parking';
import { ParkingEdit, parkingStatus } from '../../components/parking-edit';
import { ParkingDelete } from '../../components/parking-delete';
import { parkingTypes } from './../../components/parking-edit';
import Alert from 'react-bootstrap/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import parkingService from '../../services/parking.service';

// TABLE SEARCH

const AdminParkingsPage = () => {

    const [currentParkingsPage, setCurrentParkingsPage] = useState(1);
    const [parkingsPerPage] = useState(5)
    const [parkingList, setParkingList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [formerrorMessage, setFormerrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [parking, setParking] = useState(new Parking('', ''));
    const [showParkCreation, setParkCreation] = useState();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const indexOfLastParking = currentParkingsPage * parkingsPerPage;
    const indexOfFirstParking = indexOfLastParking - parkingsPerPage;
    const currentParkings = parkingList?.slice(indexOfFirstParking, indexOfLastParking);
    const totalPagesNumParkings = Math.ceil(parkingList?.length / parkingsPerPage);

    const ref0 = useRef();
    const ref1 = useRef();
    const parkingCreationRef = useRef();

    useEffect(() => {
        ParkingService.getAllParkings().then((response) => {
            setParkingList(response.data)
        })


    }, []);

    const saveParkingWatcher = (parking) => {
        let itemIndex = parkingList.findIndex(item => item.id === parking.id);

        if (itemIndex !== -1) {
            const newList = parkingList.map((item) => {
                if (item.id === parking.id) {
                    return parking;
                }
                return item;
            });
            setParkingList(newList);
        } else {
            const newList = parkingList.concat(parking);
            setParkingList(newList);
        }
    };

    // SEARCH BAR

    const [query, setQuery] = useState("")
    const keys = ["parkingType", "parkingStatus"]

    // EDITIRANJE Parkinga

    const [selectedParking, setSelectedParking] = useState(new Parking('', '', ''));
    const saveComponent = useRef();


    const editParkingRequest = (item) => {
        setSelectedParking(Object.assign({}, item));
        saveComponent.current?.showParkingModal();
    };




    // BRISANJE Parkinga

    const deleteComponent = useRef();

    const deleteParking = () => {
        console.log(selectedParking)
        ParkingService.deleteParking(selectedParking).then(_ => {
            setParkingList(parkingList.filter(x => x.id !== selectedParking.id));
        }).catch(err => {
            setErrorMessage('Unexpected error occurred.');
            console.log(err);
        });
    };

    const deleteParkingRequest = (parking) => {
        setSelectedParking(parking);
        deleteComponent.current?.showDeleteModal();
    };

    // SEJVANJE PARKINGA

    const saveParking = (e) => {
        console.log("okinulo sejvanje parkinga")
        e.preventDefault();
        setSubmitted(true);
        setFormerrorMessage(false);
        console.log("parking.parkingType " + parking.parkingType)
        console.log("parking.parkingStatus " + parking.parkingStatus)


        if (!parking.parkingType || !parking.parkingStatus ) {
            setFormerrorMessage("Some mandatory fields are empty")
            return;
        }

        parkingService.saveParking(parking).then(response => {
            setSubmitted(false);

            var x = parkingCreationRef.current;
            x.style.display = "none";

            parkingService.getAllParkings().then((res) => {
                setParkingList(res.data);
            })

            document.getElementById("parkingForm").reset();
            setParkCreation(true)
            setShowSuccessAlert(true)

        }).catch(err => {
            setFormerrorMessage('Unexpected error occurred.');
            console.log(err);
        });
    };


    const showCreateParking = () => {
        var x = parkingCreationRef.current;

        console.log(showParkCreation);

        if (showParkCreation) {
            x.style.display = "block";
            setParkCreation(false)
        } else {
            x.style.display = "none";
            setParkCreation(true)
        }
    }

    const handleChangeDropdown = (event, value, ref) => {

        if (value === null) {
            return;
        }
        console.log(ref)
        console.log(value.label)
        console.log(value.label)

        setParking((prevState => {
            return {
                ...prevState,
                [ref]: value.label
            };
        }));
    };


    return (

        <div>
            <div className="container">
                <div className="card mt-5">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6">
                                <h3>All parkings</h3>
                            </div>
                            <div className="col-6 text-end">
                                <input type="text" placeholder='Search...'
                                    onChange={e => setQuery(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="card-body">

                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Parking status</th>
                                    <th scope="col">Parking type</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!query ? (currentParkings.map((parking, ind) =>
                                    <tr key={parking.id}>
                                        <th scope="row">{ind + 1}</th>
                                        <td>{parking.parkingStatus}</td>
                                        <td>{parking.parkingType}</td>
                                        <td>
                                            <button className="btn btn-light me-1" type='button' onClick={() => editParkingRequest(parking)} >
                                                Edit
                                            </button>
                                            <button  className="btn btn-danger me-1" type='button' onClick={() => deleteParkingRequest(parking)}  >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )) :

                                    (parkingList.filter((item) => keys.some((key) => item[key]?.toLowerCase().includes(query))).map((parking, ind) =>
                                        <tr key={parking.id}>
                                            <th scope="row">{ind + 1}</th>
                                            <td>{parking.parkingStatus}</td>
                                            <td>{parking.parkingType}</td>
                                            <td>
                                                <button className="btn btn-light me-1" type='button' onClick={() => editParkingRequest(parking)} >
                                                    Edit
                                                </button>
                                                <button className="btn btn-danger me-1" type='button' onClick={() => deleteParkingRequest(parking)}  >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))

                                }


                            </tbody>
                        </table>
                        {!query &&
                            <Pagination pages={totalPagesNumParkings}
                                setCurrentPage={setCurrentParkingsPage}
                                currentObjects={currentParkings}
                                sortedObjects={parkingList} />
                        }
                    </div>
                </div>


                {/*PARKING CREATION DIV  */}
                {showParkCreation &&
                    <div className="col-6 text-end">
                        <button className="btn btn-primary" onClick={() => showCreateParking()}>
                            Create Parking »
                        </button>
                    </div>
                }

                {showSuccessAlert &&

                    <Alert className='alert-success' variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                        <Alert.Heading>Parking successfuly saved !</Alert.Heading>
                    </Alert>
                }


            </div>
            <ParkingEdit ref={saveComponent} parking={selectedParking} onSaved={(p) => saveParkingWatcher(p)} />
            <ParkingDelete ref={deleteComponent} onConfirmed={() => deleteParking()} />


            <div className='container--narrow'>
                <div ref={parkingCreationRef} >
                    <div className="modal-header" style={{ marginBottom: 40 }} />
                    <form id='parkingForm' onSubmit={(e) => saveParking(e)}
                        noValidate
                        className={submitted ? 'was-validated' : ''}>
                        <h4 style={{ marginLeft: 15 }} >Parking details </h4>

                        <div className="modal-body">

                            {formerrorMessage &&
                                <div className="alert alert-danger">
                                    {formerrorMessage}
                                </div>
                            }

                            <div className="form-group mt-1" style={{ marginBottom: 10 }}>
                                <Autocomplete
                                    name='parkingType'
                                    ref={ref0}
                                    getOptionLabel={(option) => option.label}
                                    disablePortal
                                    onChange={(event, value, ref) => handleChangeDropdown(event, value, ref0.current.getAttribute("name"))}
                                    options={parkingTypes}
                                    sx={{ width: 300 }}
                                    style={{ width: 50 + '%' }}
                                    renderInput={(params) => <TextField {...params} label="Parking type" />}
                                    required
                                    key={submitted}
                                />
                                <div className="invalid-feedback">
                                    Vehicle manufacturer is required.
                                </div>
                            </div>

                            <div className="form-group mt-1" style={{ marginBottom: 10 }}>
                                <Autocomplete
                                    name="parkingStatus"
                                    ref={ref1}
                                    getOptionLabel={(option) => option.label}
                                    disablePortal
                                    onChange={(event, value, ref) => handleChangeDropdown(event, value, ref1.current.getAttribute("name"))}
                                    options={parkingStatus}
                                    sx={{ width: 300 }}
                                    style={{ width: 50 + '%' }}
                                    renderInput={(params) => <TextField {...params} label="Parking status" />}
                                    required
                                    key={submitted}
                                />
                                <div className="invalid-feedback">
                                    Vehicle type is required.
                                </div>
                            </div>   
                        </div>

                        <div className="modal-footer" style={{ marginTop: 40 }}>
                            <button type="button" className="btn btn-secondary" onClick={() => showCreateParking()} >Close</button>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
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

export { AdminParkingsPage };