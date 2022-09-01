import { BASE_API_URL } from '../common/constants';
import axios from 'axios';
import { authHeader } from './base.service';

const API_URL = BASE_API_URL + '/api/discounts';

class DiscountService {


    getDiscountOfAUser() {
        return axios.get(API_URL + '/' , {headers: authHeader()});
    }

}

export default new DiscountService();