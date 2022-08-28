import { BASE_API_URL } from '../common/constants';
import axios from 'axios';
import { authHeader } from './base.service';

const API_URL = BASE_API_URL + '/api/parking-spots';

class ParkingService {

    deleteParking(parking) {
        return axios.delete(API_URL + '/' + parking.id, {headers: authHeader()});
    }

    getAllParkings() {
        return axios.get(API_URL + '/all' , {headers: authHeader()});
    }

    createParking(parking){
        return axios.post(API_URL  + '/', parking , {headers: authHeader()});
    }

    updateParking(parking){
        return axios.put(API_URL + '/', parking , {headers: authHeader()});
    }


}

export default new ParkingService();