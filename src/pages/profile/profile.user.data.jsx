
import './profile.page.css';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, IntlProvider } from "react-intl";
import { I18nProvider, LOCALES } from "../../i18n";

const ProfileUserData = () => {

    const currentUser = useSelector(state => state.user);


    return (
        <I18nProvider locale={localStorage.getItem("language")}>
            <div className="content">
                <div className="dxbs-fl form-horizontal" >
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="form-group">
                                <label className="control-label dxbs-fl-cpt" htmlFor="Content_FormLayoutDataBinding_teDisplayName_I" style={{ fontWeight: 700 }}><FormattedMessage id='fName_lName' /></label>
                                <div className="dxbs-textbox dxbs-fl-ctrl" >
                                    <div>
                                        <input className="form-control" type="text" name="ctl00$Content$FormLayoutDataBinding$teDisplayName" value={currentUser.firstName + " " + currentUser.lastName} readOnly="readonly" autoComplete="off" />
                                    </div>
                                </div>

                            </div>
                        </div><div className="col-lg-8">
                            <div className="form-group">
                                <label className="control-label dxbs-fl-cpt" htmlFor="Content_FormLayoutDataBinding_tePhone_I" style={{ fontWeight: 700 }}><FormattedMessage id='phone' /></label>
                                <div className="dxbs-textbox dxbs-fl-ctrl" >
                                    <div>
                                        <input className="form-control" type="text" value={currentUser.phoneNumber} name="ctl00$Content$FormLayoutDataBinding$tePhone" readOnly="readonly" autoComplete="off" />
                                    </div>
                                </div>

                            </div>
                        </div><div className="col-lg-8">
                            <div className="form-group">
                                <label className="control-label dxbs-fl-cpt" htmlFor="Content_FormLayoutDataBinding_teEmail_I" style={{ fontWeight: 700 }}><FormattedMessage id='email' /></label>
                                <div className="dxbs-textbox dxbs-fl-ctrl" >
                                    <div>
                                        <input className="form-control" type="text" value={currentUser.email} name="ctl00$Content$FormLayoutDataBinding$teEmail" readOnly="readonly" autoComplete="off" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </I18nProvider>
    )
}

export { ProfileUserData };
