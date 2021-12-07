import axios from 'axios';
import { loginURL } from './url';
export function loginReq(data) {
  return axios.post(loginURL, data);
}
