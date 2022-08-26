import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import User from '../../models/user';
import UserService from '../../services/user.service';
import { clearCurrentUser, setCurrentUser } from '../../store/actions/user';

const UpdateUserPassword = () => {

    const [user, setUser] = useState(new User('', '', ''));
    const [submitted, setSubmitted] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmedNewPassword, setConfirmedNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const currentUser = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        e.preventDefault();
  
        setSubmitted(true);
  
        setLoading(true);
  
        UserService.updateUserPassword(oldPassword,newPassword,confirmedNewPassword).then(() => {
            //clear user from session.
            console.log("updateUserPassword")
            dispatch(clearCurrentUser());
            navigate('/login');
        }).catch(error => {
           console.log(error);
           setErrorMessage('Credentials are incorrect');
           setLoading(false);
        });


  
      };


      const handleNewPassChange = event => {
        setNewPassword(event.target.value);
        
      };

      const handleOldPassChange = event => {
        setOldPassword(event.target.value);
        
      };

      const handleNewConfirmedPassChange = event => {
        setConfirmedNewPassword(event.target.value);
        
      };

    return (

        <div className="container" style={{marginTop:30 + 'px'}}>

            <div className="accountHeader">

                <h2>Promjena lozinke</h2>
                <p>Koristite donji obrazac za promjenu loznike.</p>
                <p>Nove lozinke moraju biti duljine od najmanje 4 znaka.</p>
            </div>

            {errorMessage &&
                <div className="alert alert-danger" style={{width:250 + 'px'}}>
                    {errorMessage}
                </div>
                }

            <form
                    onSubmit={(e) => handlePasswordChange(e)}
                    noValidate
                    className={submitted ? 'was-validated' : ''}
                >

            <div className="dxbs-textbox" id="Content_tbCurrentPassword" style={{width:200 + 'px'}}>
                <label className="dxbs-edit-caption control-label" htmlFor="password">Stara loznika:<em>*</em></label><div>
                <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="password"
                            onChange={(e) => handleOldPassChange(e)}
                            autoComplete='on'
                            required
                        />                </div>
            </div>
            <div className="dxbs-textbox" id="Content_tbPassword" style={{width:200 + 'px'}}>
                <label className="dxbs-edit-caption control-label" htmlFor="newPassword">Nova Lozinka:<em>*</em></label><div>
                <input
                            type="password"
                            name="newPassword"
                            className="form-control"
                            placeholder="New password"
                            onChange={(e) => handleNewPassChange(e)}
                            autoComplete='on'
                            required
                        />                </div>
            </div>
            <div className="dxbs-textbox" id="Content_tbPassword" style={{width:200 + 'px'}}>
                <label className="dxbs-edit-caption control-label" htmlFor="newPassword">Potvrdi novu lozinku:<em>*</em></label><div>
                <input
                            type="password"
                            name="newPassword"
                            className="form-control"
                            placeholder="New password"
                            onChange={(e) => handleNewConfirmedPassChange(e)}
                            autoComplete='on'
                            required
                        />                </div>
            </div>
            <br />
            <button className="btn btn-primary dxbs-button" id="Content_btnChangePassword" type="submit" name="ctl00$Content$btnChangePassword" value="Promijeni lozniku">Promijeni lozniku</button>

            </form>

            <hr />

            <footer>
                <p>© 2022 - SkyPark d.o.o.</p>
            </footer>
        </div>
    )

};

export { UpdateUserPassword };