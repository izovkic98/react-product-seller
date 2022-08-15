import {createContext, useEffect, useState} from 'react';
import ReservationService from '../services/reservation.service'

export const ReservationContext = createContext("")

const ReservationContextProvider  = (props) => {

    const [reservationList1, setReservationList] = useState([]);

useEffect(()=> {
    ReservationService.getAllReservations().then((response) => {
        setReservationList(response.data);
    })
},[])

// useEffect(() => {
//     localStorage.setItem('employees', JSON.stringify(employees));
// })



const sortedReservations = reservationList1.sort((a,b)=>(a.lastname < b.last_name ? -1 : 1));


    return (
        <ReservationContext.Provider value={{reservationList1}}>
            {props.children}
        </ReservationContext.Provider>
    )
}

export default ReservationContextProvider;