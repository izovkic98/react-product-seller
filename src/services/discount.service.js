import { BASE_API_URL } from '../common/constants';
import axios from 'axios';
import { authHeader } from './base.service';

const API_URL = BASE_API_URL + '/api/discounts';

class DiscountService {


    getDiscountOfAUser() {
        return axios.get(API_URL + '/' , {headers: authHeader()});
    }

    getDiscountById(dicountId){
        return axios.get(API_URL + '/id/' + dicountId, {headers: authHeader()});
    }

    
    getAllDiscounts() {
        return axios.get(API_URL + '/all' , {headers: authHeader()});
    }

    updateDiscount(discount) {
        return axios.put(API_URL + '/update' ,discount,  {headers: authHeader()});
    }


}

export default new DiscountService();