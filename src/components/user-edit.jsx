import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { Modal } from 'react-bootstrap';
import User from '../models/user';
import UserService from '../services/user.service';
import { I18nProvider, LOCALES } from "../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";


const UserEdit = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        //interaction with parent
        showUserModal() {
            setTimeout(() => {
                setShow(true);
            }, 0);
        }
    }));

    useEffect(() => {
        setUser(props.user);

    }, [props.user]);

    const [user, setUser] = useState(new User('', '', '', '', '', '', '', '', '', ''));
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [show, setShow] = useState(false);

    const saveUser = (e) => {
        e.preventDefault();

        setSubmitted(true);

        if (!user.firstName || !user.lastName || !user.username || !user.phoneNumber
            || !user.email || !user.role) {
            console.log("returnalo me");
            return;
        }

        UserService.updateUser(user).then(response => {
            //...
            props.onSaved(response.data);
            setShow(false);
            setSubmitted(false);
        }).catch(err => {
            setErrorMessage('Unexpected error occurred.');
            console.log(err);
        });
    };

    //<input name="x" value="y">
    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((prevState => {
            return {
                ...prevState,
                [name]: value
            };
        }));
    };

    return (
        <Modal centered={true} show={show}>
            <form onSubmit={(e) => saveUser(e)}
                noValidate
                className={submitted ? 'was-validated' : ''}>

                <div className="modal-header">
                    <h5 className="modal-title"><FormattedMessage id='user_details' /></h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>

                <div className="modal-body">

                    {errorMessage &&
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    }

                    <div className="form-group">
                        <label htmlFor="firstName"><FormattedMessage id='first_name' /></label>
                        <FormattedMessage id='first_name_w'>
                            {(msg) => (
                                <input
                                    type="text"
                                    name="firstName"
                                    onChange={(e) => handleChange(e)}
                                    placeholder={msg}
                                    className="form-control"
                                    value={user?.firstName}

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
                                    onChange={(e) => handleChange(e)}
                                    placeholder={msg}
                                    className="form-control"
                                    value={user?.lastName}

                                />
                            )}
                        </FormattedMessage>
                        <div className="invalid-feedback">
                            <FormattedMessage id='req_field' />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="username"><FormattedMessage id='username' /> </label>
                        <FormattedMessage id='username_w'>
                            {(msg) => (
                                <input
                                    type="text"
                                    name="username"
                                    onChange={(e) => handleChange(e)}
                                    placeholder={msg}
                                    className="form-control"
                                    value={user?.username}

                                />
                            )}
                        </FormattedMessage>
                        <div className="invalid-feedback">
                            <FormattedMessage id='req_field' />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email"><FormattedMessage id='email' /> </label>
                        <FormattedMessage id='email_w'>
                                {(msg) => (
                        <input
                            type="text"
                            name="email"
                            onChange={(e) => handleChange(e)}
                            placeholder={msg}
                            className="form-control"
                            value={user?.email}

                        />
                        )}
                        </FormattedMessage>
                        <div className="invalid-feedback">
                            <FormattedMessage id='req_field' />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber"><FormattedMessage id='phone_number' /> </label>
                        <FormattedMessage id='phone_number_w'>
                                {(msg) => (
                        <input
                            type="text"
                            name="phoneNumber"
                            onChange={(e) => handleChange(e)}
                            placeholder={msg}
                            className="form-control"
                            value={user?.phoneNumber}

                        />
                        )}
                        </FormattedMessage>
                        <div className="invalid-feedback">
                            <FormattedMessage id='req_field' />
                        </div>
                    </div>

                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}><FormattedMessage id='close' /></button>
                    <button type="submit" className="btn btn-primary"><FormattedMessage id='save' /></button>
                </div>
            </form>
        </Modal>
    );

});

export { UserEdit };