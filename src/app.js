import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import {login, logout} from './actions/auth';
import {startSetStories} from './actions/stories';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';
import axios from 'axios';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

const onAuthStateChanged = () => {
    const authToken = localStorage.getItem('x-auth');
    axios({
        method:'get',
        url:'/users/me',
        headers: {'x-auth': authToken}
      }).then((response) => {
        store.dispatch(login({
            uid: response.data._id,
            fullName: response.data.fullName,
            email: response.data.email,
            authToken
        }))
        store.dispatch(startSetStories()).then(() => {
            renderApp();
            if(history.location.pathname === '/') {
                history.push('/dashboard');
            }
        })
      }).catch((e) => {
        store.dispatch(logout());
        renderApp();
        history.push('/');
      });
}

onAuthStateChanged();
export default onAuthStateChanged;