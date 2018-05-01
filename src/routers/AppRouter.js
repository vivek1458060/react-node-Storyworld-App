import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import createHistory from 'history/createBrowserHistory'
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import StoryModal from '../components/StoryModal';
import ProfilePage from '../components/ProfilePage';
import ChatPage from '../components/ChatPage';

export const history = createHistory();

const AppRouter = () => ( 
    <Router history={history}>
        <div>
            <StoryModal />
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={DashboardPage} /> 
                <PrivateRoute path="/profile/:uid" component={ProfilePage} /> 
                <PrivateRoute path="/chat" component={ChatPage} /> 
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
