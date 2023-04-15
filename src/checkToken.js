import { redirect } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from "axios";

const token = Cookies.get('authToken');
if (!token) {
  redirect('/login');
}

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
