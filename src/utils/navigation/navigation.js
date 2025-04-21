// utils/navigation.js
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const navigate = (path, options) => {
  history.push(path, options);
};

export default history;