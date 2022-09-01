import { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { I18nProvider, LOCALES } from "../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";


const ReservationDelete = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({

        showDeleteModal() {
            setShow(true);
        }

    }));

    const deleteReservation = () => {
        props.onConfirmed();
        setShow(false);
    };

    return (
        <Modal centered={true} show={show}>

            <div className="modal-header">
                <h5 className="modal-title"><FormattedMessage id='confirmation' /></h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
            </div>

            <div className="modal-body">
                <FormattedMessage id='del_res' />
            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}><FormattedMessage id='cancel' /></button>
                <button type="button" className="btn btn-danger" onClick={() => deleteReservation()}><FormattedMessage id='im_sure' /></button>
            </div>

        </Modal>
    );

});

export { ReservationDelete };