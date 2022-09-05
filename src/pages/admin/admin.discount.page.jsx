import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Pagination from './pagination';
import './admin.page.css'
import ParkingService from '../../services/parking.service';
import Parking from '../../models/parking';
import { ParkingEdit, parkingStatus } from '../../components/parking-edit';
import { ParkingDelete } from '../../components/parking-delete';
import { parkingTypes } from '../../components/parking-edit';
import Alert from 'react-bootstrap/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import parkingService from '../../services/parking.service';
import { I18nProvider, LOCALES } from "../../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";
import Discount from '../../models/discount';
import DiscountService from '../../services/discount.service';
import { Tier } from './../../models/tier';


// TABLE SEARCH

const AdminDiscountsPage = () => {

    const [currentDiscountsPage, setCurrentDiscountsPage] = useState(1);
    const [discountsPerPage] = useState(5)
    const [discountList, setDiscountList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [disount, setDisount] = useState(new Discount('', '', '', ''));

    const indexOfLastDiscount = currentDiscountsPage * discountsPerPage;
    const indexOfFirstDiscount = indexOfLastDiscount - discountsPerPage;
    const currentDiscounts = discountList?.slice(indexOfFirstDiscount, indexOfLastDiscount);
    const totalPagesNumDiscounts = Math.ceil(discountList?.length / discountsPerPage);

    const ref0 = useRef();
    const ref1 = useRef();
    const parkingCreationRef = useRef();

    useEffect(() => {

        DiscountService.getAllDiscounts().then((response) => {
            setDiscountList(response.data)
        })


    }, []);


    // SEARCH BAR

    const [query, setQuery] = useState("")
    const keys = ["code", "tier", "loyaltyPoints","user.username"];

    // EDITIRANJE POPUSTA

    const [selectedDiscount, setSelectedDiscount] = useState(new Discount('', '', '', ''));
    const saveComponent = useRef();


    const editDiscountRequest = (item) => {
        setSelectedDiscount(Object.assign({}, item));
        saveComponent.current?.showDiscountModal();
    };

    // RESETIRANJE KODA

    const resetCode = (discount) => {
        DiscountService.updateDiscount(discount).then(

            DiscountService.getAllDiscounts().then((res) => {
                setDiscountList(res.data);
            })

          

        ).catch(err => {
            setErrorMessage('Unexpected error occurred');
            console.log(err);
        });

        window.location.reload(false);
    }


    return (
        <I18nProvider locale={localStorage.getItem("language")}>
            <div>
                <div className="container">
                    <div className="card mt-5">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-6">
                                    <h3><FormattedMessage id='all_discounts' /></h3>
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
                                        <th scope="col"><FormattedMessage id='username_w' /></th>
                                        <th scope="col"><FormattedMessage id='loyalty_points' /></th>
                                        <th scope="col"><FormattedMessage id='tier' /></th>
                                        <th scope="col"><FormattedMessage id='code' /></th>
                                        <th scope="col"><FormattedMessage id='action' /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!query ? (currentDiscounts.map((discount, ind) =>
                                        <tr key={discount.id}>
                                            <th scope="row">{ind + 1}</th>
                                            <td>{discount?.user.firstName} {discount?.user.lastName}</td>
                                            <td>{discount?.user.username}</td>
                                            <td>{discount.loyaltyPoints}</td>
                                            <td>{discount.tier}</td>
                                            <td>{discount.code}</td>
                                            <td>
                                                <button className="btn btn-danger me-1" type='button' onClick={() => resetCode(discount)}  >
                                                    <FormattedMessage id='reset_code' />
                                                </button>
                                                {/* <button className="btn btn-light me-1" type='button' onClick={() => editDiscountRequest(discount)} >
                                                    <FormattedMessage id='edit' />
                                                </button> */}
                                            </td>
                                        </tr>
                                    )) :

                                        (discountList.filter((item) => keys.some((key) => typeof item[key] === "string" && item[key]?.toLowerCase().includes(query))).map((discount, ind) =>
                                            <tr key={discount.id}>
                                                <th scope="row">{ind + 1}</th>
                                                <td>{discount?.user.firstName} {discount?.user.lastName}</td>
                                                <td>{discount?.user.username}</td>
                                                <td>{discount.loyaltyPoints}</td>
                                                <td>{discount.tier}</td>
                                                <td>{discount.code}</td>
                                                <td>
                                                    <button className="btn btn-danger me-1" type='button' onClick={() => resetCode(discount)}  >
                                                        <FormattedMessage id='reset' />
                                                    </button>
                                                    {/* <button className="btn btn-light me-1" type='button' onClick={() => editDiscountRequest(discount)} >
                                                        <FormattedMessage id='edit' />
                                                    </button> */}
                                                </td>
                                            </tr>
                                        ))

                                    }


                                </tbody>
                            </table>
                            {!query &&
                                <Pagination pages={totalPagesNumDiscounts}
                                    setCurrentPage={setCurrentDiscountsPage}
                                    currentObjects={currentDiscounts}
                                    sortedObjects={discountList} />
                            }
                        </div>
                    </div>


                </div>
                {/* <ParkingEdit ref={saveComponent} parking={selectedParking} onSaved={(p) => saveParkingWatcher(p)} /> */}
                <hr style={{ marginTop: 50 + 'px' }} />
                <footer>
                    <p>© 2022 - SkyPark d.o.o.</p>
                </footer>
            </div>
        </I18nProvider>


    )
}

export { AdminDiscountsPage };