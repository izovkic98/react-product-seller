import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { Modal } from 'react-bootstrap';
import User from '../models/user';
import UserService from '../services/user.service';


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
                    <h5 className="modal-title">User details</h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>

                <div className="modal-body">

                    {errorMessage &&
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    }

                    <div className="form-group">
                        <label htmlFor="firstName">First name </label>
                        <input
                            type="text"
                            name="firstName"
                            onChange={(e) => handleChange(e)}
                            placeholder="First name"
                            className="form-control"
                            value={user?.firstName}

                        />
                        <div className="invalid-feedback">
                            First name is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last name </label>
                        <input
                            type="text"
                            name="lastName"
                            onChange={(e) => handleChange(e)}
                            placeholder="Last name"
                            className="form-control"
                            value={user?.lastName}

                        />
                        <div className="invalid-feedback">
                            Last name is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username </label>
                        <input
                            type="text"
                            name="username"
                            onChange={(e) => handleChange(e)}
                            placeholder="Username"
                            className="form-control"
                            value={user?.username}

                        />
                        <div className="invalid-feedback">
                            Username is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email </label>
                        <input
                            type="text"
                            name="email"
                            onChange={(e) => handleChange(e)}
                            placeholder="Email"
                            className="form-control"
                            value={user?.email}

                        />
                        <div className="invalid-feedback">
                            Email is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone number </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            onChange={(e) => handleChange(e)}
                            placeholder="Phone number"
                            className="form-control"
                            value={user?.phoneNumber}

                        />
                        <div className="invalid-feedback">
                            Phone number is required.
                        </div>
                    </div>

                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </Modal>
    );

});

export { UserEdit };