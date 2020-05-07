import React from 'react';


const addEmployee = () => {
    return (
        <form>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Введите ФИО">
                </input>
            </div>
        </form>
    );
};

export default addEmployee;