import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from '../components/Header';
import ChatPage from '../components/ChatPage';

export const PrivateRoute = ({
    isAuthenticated,
    component:Component,
    ...rest
}) => (
    <div>
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                Component != ChatPage ? (
                <div>
                    <Header />
                    <Component {...props}/>
                </div>
                ) : ( <Component {...props}/> )
            ) : (
                <Redirect to="/" />
            )
        )} />
    </div>
)

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PrivateRoute);