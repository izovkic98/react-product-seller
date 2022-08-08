import store from '../store';
import axios from 'axios';
import { clearCurrentUser } from '../store/actions/user';
import { history } from '../common/history';

export const authHeader = () => {
    const currentUser = store.getState().user;
  
    return {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + currentUser?.token,
    };
  };