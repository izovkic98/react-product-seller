
import './profile.page.css';
import { useDispatch, useSelector } from 'react-redux';

const ProfileUserData = () => {

    const currentUser = useSelector(state => state.user);


    return (
        <div class="content">
            <div class="dxbs-fl form-horizontal" id="Content_FormLayoutDataBinding">
                <div class="row">
                    <div id="Content_FormLayoutDataBinding_1" class="col-lg-8">
                        <div class="form-group">
                            <label class="control-label dxbs-fl-cpt" for="Content_FormLayoutDataBinding_teDisplayName_I" style={{fontWeight:700}}>Ime i prezime</label>
                            <div class="dxbs-textbox dxbs-fl-ctrl" id="Content_FormLayoutDataBinding_teDisplayName">
                                <div>
                                    <input id="Content_FormLayoutDataBinding_teDisplayName_I" class="form-control" type="text" name="ctl00$Content$FormLayoutDataBinding$teDisplayName" value={currentUser.firstName + " " + currentUser.lastName} readonly="readonly" autocomplete="off" />
                                </div>
                            </div>

                        </div>
                    </div><div id="Content_FormLayoutDataBinding_2" class="col-lg-8">
                        <div class="form-group">
                            <label class="control-label dxbs-fl-cpt" for="Content_FormLayoutDataBinding_tePhone_I" style={{fontWeight:700}}>Telefon</label>
                            <div class="dxbs-textbox dxbs-fl-ctrl" id="Content_FormLayoutDataBinding_tePhone">
                                <div>
                                    <input id="Content_FormLayoutDataBinding_tePhone_I" class="form-control" type="text" value={currentUser.phoneNumber} name="ctl00$Content$FormLayoutDataBinding$tePhone" readonly="readonly" autocomplete="off" />
                                </div>
                            </div>

                        </div>
                    </div><div id="Content_FormLayoutDataBinding_3" class="col-lg-8">
                        <div class="form-group">
                            <label class="control-label dxbs-fl-cpt" for="Content_FormLayoutDataBinding_teEmail_I" style={{fontWeight:700}}>Email</label>
                            <div class="dxbs-textbox dxbs-fl-ctrl" id="Content_FormLayoutDataBinding_teEmail">
                                <div>
                                    <input id="Content_FormLayoutDataBinding_teEmail_I" class="form-control" type="text" value={currentUser.email} name="ctl00$Content$FormLayoutDataBinding$teEmail" readonly="readonly" autocomplete="off" />
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
