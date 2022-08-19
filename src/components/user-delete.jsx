import { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal } from 'react-bootstrap';


const UserDelete = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({

        showDeleteModal() {
            setShow(true);
        }

    }));

    const deleteUser = () => {
        props.onConfirmed();
        setShow(false);
    };

    return (
        <Modal show={show}>

            <div className="modal-header">
                <h5 className="modal-title">Confirmation</h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
            </div>

            <div className="modal-body">
               <span style={{color:"red", fontWeight:"bold" }}>Warning!</span> Deleting this user will delete all reservations tied to him. Do you want to proceed ?
            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={() => deleteUser()}>I'm sure!</button>
            </div>

        </Modal>
    );

});

export {UserDelete};