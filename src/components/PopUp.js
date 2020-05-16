import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import dateFormat from 'dateformat';


const PopUp = (props) => {
    const {show, hide, data, closeModal} = props;

    console.log(data);

    const dataRows = Object.values((item) => {
        return (
            <tr key={item.employee_id}>
                <td>{item.employee_name}</td>
                <td>{item.employee_department}</td>
                <td>{item.employee_skill}</td>
                <td>{item.employee_number}</td>
                <td>{dateFormat(item.employee_start, 'dd-mm-yyyy')}</td>
                <td>{dateFormat(item.employee_end, 'dd-mm-yyyy')}</td>
            </tr>
        )
    })

    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Подтвердите отправку отвара</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Отлично, почти всё готово!</p>
                <table className="table table-hover table-bordered">
                    <tbody>
                        <tr className="table-primary">
                            <td>Title</td>
                            <td>Price</td>
                            <td>Count</td>
                            <td>Total</td>
                        </tr>
                        {dataRows}
                    </tbody>
                </table>
            </Modal.Body>
            
            <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Отмена
                    </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PopUp;