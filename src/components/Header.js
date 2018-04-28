import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header className="header">
      <div className="content-container">
        <div className="header-content">
            <div className="header-main">
                <Link to="/dashboard" className="header-main__title">
                    <h1>Storyclub</h1>
                </Link>
                <span className="header-main__icon display-for-mobile">&#9776;</span>
            </div>
            <ul className="header-sub">
                <li className="dropdown">
                    <button className="button button--link" >Chat room</button>
                    <div className="dropdown__content">
                        <div className="room-actions">
                            <h3>Join Chat Rooms</h3>
                            <button>Create new</button>
                        </div>
                        <input className="room-search" type="text" placeholder="Search chat rooms" />
                        <ul className="room-list">
                            <li>
                                <h4>Heritage talent<button>Join</button></h4>
                                <span><img src="https://avatars0.githubusercontent.com/u/26858253?v=4" />1 member</span>
                            </li>
                            <li>
                                <h4>Chhapra<button>Join</button></h4>
                                <span><img src="https://avatars0.githubusercontent.com/u/26858253?v=4"/>1 member</span>
                            </li>
                        </ul>
                    </div>
                </li>
                <li onClick={startLogout}><button className="button button--link">Logout</button></li>
            </ul>
          </div>
      </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header);