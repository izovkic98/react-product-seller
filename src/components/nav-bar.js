import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentUser } from '../store/actions/user';
import { Role } from '../models/role';
import logo from './Skypark_logo.png';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {

    const currentUser = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearCurrentUser());
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="https://reactjs.org" className="navbar-brand ms-1">
                <img src={logo} className="App-logo" alt="logo" />
            </a>

            <div className="navbar-nav me-auto">
                {currentUser?.role === Role.ADMIN &&
                    <NavDropdown title="Admin" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/admin-reservations">Reservations</NavDropdown.Item>
                        <NavDropdown.Item href="/admin-users">Users</NavDropdown.Item>
                    </NavDropdown>
                }

                <li className="nav-item">
                    <NavLink to="/home" className="nav-link">
                        Home
                    </NavLink>
                </li>
            </div>

            {!currentUser &&
                <div className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink to="/register" className="nav-link">
                            Sign Up
                        </NavLink>
                    </li>
                    <li className="nav-item" style={{ marginRight: 20, marginLeft: 20 }}>
                        <NavLink to="/login" className="nav-link">
                            Sign In
                        </NavLink>
                    </li>
                </div>
            }

            {currentUser &&
                <div className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink to="/profile" className="nav-link">
                            {currentUser.username}
                            {currentUser?.role === Role.ADMIN && <span> (admin)</span>}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link" style={{ marginRight: 20, marginLeft: 20 }} onClick={() => logout()}>
                            Sign Out
                        </a>
                    </li>
                </div>
            }

        </nav>
    );
};

export { NavBar };
