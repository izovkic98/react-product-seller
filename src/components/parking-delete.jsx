import { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal } from 'react-bootstrap';


const ParkingDelete = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({

        showDeleteModal() {
            setShow(true);
        }

    }));

    const deleteParking = () => {
        props.onConfirmed();
        setShow(false);
    };

    return (
        <Modal centered={true} show={show}>

            <div className="modal-header">
                <h5 className="modal-title">Confirmation</h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
            </div>

            <div className="modal-body">
                Do you want to proceed ?
            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={() => deleteParking()}>I'm sure!</button>
            </div>

        </Modal>
    );

});

export { ParkingDelete };