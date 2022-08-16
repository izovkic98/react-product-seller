import { BASE_API_URL } from '../common/constants';
import axios from 'axios';
import { authHeader } from './base.service';

const API_URL = BASE_API_URL + '/api/user';

class UserService {

    deleteUser(user) {
        return axios.delete(API_URL + '/' + user.id, {headers: authHeader()});
    }

    getAllUsers() {
        return axios.get(API_URL + '/all', {headers: authHeader()});
    }

    getUserById(userId){
        return axios.get(API_URL + '/id/' + userId, {headers: authHeader()});
    }

    updateUser(user){
        return axios.put(API_URL , user , {headers: authHeader()});
    }

}

export default new UserService();