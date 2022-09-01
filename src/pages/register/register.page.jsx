import { useEffect, useState } from 'react';
import User from '../../models/user';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationService from '../../services/authentication.service';
import './register.page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { I18nProvider, LOCALES } from "../../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";


const RegisterPage = () => {

    const [user, setUser] = useState(new User('', '', '', '', '', '', '', '', '', ''));
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const currentUser = useSelector(state => state.user);

    const navigate = useNavigate();

    //mounted component
    useEffect(() => {
        if (currentUser?.id) {
            //navigate
            navigate('/profile');
        }
    }, []);

    //<input name="x" value="y" onChange=(event) => handleChange(event)>
    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((prevState => {
            //e.g: prevState ({user: x, pass: x}) + newKeyValue ({user: xy}) => ({user: xy, pass: x})
            return {
                ...prevState,
                [name]: value
            };
        }));
    };

    const handleRegister = (e) => {

        e.preventDefault();

        setSubmitted(true);

        if (!user.firstName || !user.lastName || !user.username || !user.password
            || !user.address || !user.email || !user.phoneNumber) {
            return;
        }

        setLoading(true);

        AuthenticationService.register(user).then(_ => {
            navigate('/login');
        }).catch(error => {
            console.log(error);
            if (error?.response?.status === 409) {
                setErrorMessage('username or password is not valid.');
            } else {
                setErrorMessage('Unexpected error occurred.');
            }
            setLoading(false);
        });
    };

    return (
        <I18nProvider locale={localStorage.getItem("language")}>
            <div className="container mt-5">
                <div className="card ms-auto me-auto p-3 shadow-lg custom-card">

                    <FontAwesomeIcon icon={faUserCircle} className="ms-auto me-auto user-icon" />

                    {errorMessage &&
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    }

                    <form
                        onSubmit={(e) => handleRegister(e)}
                        noValidate
                        className={submitted ? 'was-validated' : ''}
                    >

                        <div className="form-group">
                            <label htmlFor="firstName"><FormattedMessage id='first_name' /></label>
                            <FormattedMessage id='first_name_w'>
                                {(msg) => (
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        placeholder={msg}
                                        value={user.firstName}
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />
                                )}
                            </FormattedMessage>
                            <div className="invalid-feedback">
                                <FormattedMessage id='req_field' />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName"><FormattedMessage id='last_name' /></label>
                            <FormattedMessage id='last_name_w'>
                                {(msg) => (
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        placeholder={msg}
                                        value={user.lastName}
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />)}
                            </FormattedMessage>
                            <div className="invalid-feedback">
                                <FormattedMessage id='req_field' />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="address"><FormattedMessage id='address' /></label>
                            <FormattedMessage id='address_w'>
                                {(msg) => (
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        placeholder={msg}
                                        value={user.address}
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />)}
                            </FormattedMessage>
                            <div className="invalid-feedback">
                                <FormattedMessage id='req_field' />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email"><FormattedMessage id='email' /></label>
                            <FormattedMessage id='email_w'>
                                {(msg) => (
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        placeholder={msg}
                                        value={user.email}
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />)}
                            </FormattedMessage>
                            <div className="invalid-feedback">
                                <FormattedMessage id='req_field' />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber"><FormattedMessage id='phone_number' /></label>
                            <FormattedMessage id='phone_number_w'>
                                {(msg) => (
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        className="form-control"
                                        placeholder={msg}
                                        value={user.phoneNumber}
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />)}
                            </FormattedMessage>
                            <div className="invalid-feedback">
                                <FormattedMessage id='req_field' />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="username"><FormattedMessage id='username' /></label>
                            <FormattedMessage id='username_w'>
                                {(msg) => (
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder={msg}
                                        value={user.username}
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />)}
                            </FormattedMessage>
                            <div className="invalid-feedback">
                                <FormattedMessage id='req_field' />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password"><FormattedMessage id='password' /></label>
                            <FormattedMessage id='password_w'>
                                {(msg) => (
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder={msg}
                                        value={user.password}
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />)}
                            </FormattedMessage>
                            <div className="invalid-feedback">
                                <FormattedMessage id='req_field' />
                            </div>
                        </div>

                        <button className="btn btn-dark w-20 mt-3" style={{ marginLeft: 120 }} disabled={loading}>
                            <FormattedMessage id='sign_up' />
                        </button>

                    </form>

                    <Link to="/login" className="btn btn-link" style={{ color: 'darkgray' }}>
                        <FormattedMessage id='i_have_acc' />
                    </Link>

                </div>
            </div>
        </I18nProvider>
    );
};

export { RegisterPage };
