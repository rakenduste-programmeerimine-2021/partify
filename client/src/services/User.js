import axios from 'axios';
import authRoutes from '../../../server/src/routes/auth.routes';
import AuthHeader from './Auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class userService {
    getPublicContent() {
        return axios.get(API_URL + 'all')
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: AuthHeader() })
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: AuthHeader() })
    }
}

export default new userService()
