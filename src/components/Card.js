import React from 'react';

export const Card1 = ({show}) => {
    return (
        <div class="col-sm-6">
            <div className="card" style={{'width': '31rem'}}>
                <div className="card-body">
                    <h5 className="card-title">Отчёт</h5>
                    <p className="card-text">Дополнительное соглашение с преподавателем ТГУ</p>
                    <button className="btn btn-primary" onClick={show}>Создать</button>
                </div>
            </div>
        </div>
    );
};


export const Card2 = () => {
    return (
        <div class="col-sm-6">
            <div className="card" style={{'width': '31rem'}}>
                <div className="card-body">
                    <h5 className="card-title">Справка</h5>
                    <p className="card-text">Об отсутствие на рабочем месте по уважительной причине</p>
                    <button className="btn btn-secondary" disabled>Создать</button>
                </div>
            </div>
        </div>
    );
};
