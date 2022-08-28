import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Pagination from './pagination';
import './admin.page.css'
import ParkingService from '../../services/parking.service';
import Parking from '../../models/parking';
import { ParkingEdit } from '../../components/parking-edit';
import { ParkingDelete } from '../../components/parking-delete';

// TABLE SEARCH

const AdminParkingsPage = () => {

    const [currentParkingsPage, setCurrentParkingsPage] = useState(1);
    const [parkingsPerPage] = useState(5)
    const [parkingList, setParkingList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(1);

    const indexOfLastParking = currentParkingsPage * parkingsPerPage;
    const indexOfFirstParking = indexOfLastParking - parkingsPerPage;
    const currentParkings = parkingList?.slice(indexOfFirstParking, indexOfLastParking);
    const totalPagesNumParkings = Math.ceil(parkingList?.length / parkingsPerPage);

    const currentUser = useSelector(state => state.user);

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
                                            <button disabled={true} className="btn btn-light me-1" type='button' onClick={() => editParkingRequest(parking)} >
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
                                                <button disabled={true} className="btn btn-light me-1" type='button' onClick={() => editParkingRequest(parking)} >
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

            </div>
            <ParkingEdit ref={saveComponent} parking={selectedParking} onSaved={(p) => saveParkingWatcher(p)} />
            <ParkingDelete ref={deleteComponent} onConfirmed={() => deleteParking()} />
        </div>


    )
}

export { AdminParkingsPage };