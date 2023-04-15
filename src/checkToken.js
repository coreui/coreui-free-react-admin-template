import Cookies from "js-cookie";
import axios from "axios";

const token = Cookies.get('authToken');

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
