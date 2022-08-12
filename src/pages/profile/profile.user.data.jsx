
import './profile.page.css';
import { useDispatch, useSelector } from 'react-redux';

const ProfileUserData = () => {

    const currentUser = useSelector(state => state.user);


    return (
        <div className="content">
            <div className="dxbs-fl form-horizontal" id="Content_FormLayoutDataBinding">
                <div className="row">
                    <div id="Content_FormLayoutDataBinding_1" className="col-lg-8">
                        <div className="form-group">
                            <label className="control-label dxbs-fl-cpt" htmlFor="Content_FormLayoutDataBinding_teDisplayName_I" style={{fontWeight:700}}>Ime i prezime</label>
                            <div className="dxbs-textbox dxbs-fl-ctrl" id="Content_FormLayoutDataBinding_teDisplayName">
                                <div>
                                    <input id="Content_FormLayoutDataBinding_teDisplayName_I" className="form-control" type="text" name="ctl00$Content$FormLayoutDataBinding$teDisplayName" value={currentUser.firstName + " " + currentUser.lastName} readOnly="readonly" autoComplete="off" />
                                </div>
                            </div>

                        </div>
                    </div><div id="Content_FormLayoutDataBinding_2" className="col-lg-8">
                        <div className="form-group">
                            <label className="control-label dxbs-fl-cpt" htmlFor="Content_FormLayoutDataBinding_tePhone_I" style={{fontWeight:700}}>Telefon</label>
                            <div className="dxbs-textbox dxbs-fl-ctrl" id="Content_FormLayoutDataBinding_tePhone">
                                <div>
                                    <input id="Content_FormLayoutDataBinding_tePhone_I" className="form-control" type="text" value={currentUser.phoneNumber} name="ctl00$Content$FormLayoutDataBinding$tePhone" readOnly="readonly" autoComplete="off" />
                                </div>
                            </div>

                        </div>
                    </div><div id="Content_FormLayoutDataBinding_3" className="col-lg-8">
                        <div className="form-group">
                            <label className="control-label dxbs-fl-cpt" htmlFor="Content_FormLayoutDataBinding_teEmail_I" style={{fontWeight:700}}>Email</label>
                            <div className="dxbs-textbox dxbs-fl-ctrl" id="Content_FormLayoutDataBinding_teEmail">
                                <div>
                                    <input id="Content_FormLayoutDataBinding_teEmail_I" className="form-control" type="text" value={currentUser.email} name="ctl00$Content$FormLayoutDataBinding$teEmail" readOnly="readonly" autoComplete="off" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ProfileUserData };
