import React from 'react';
import { Link } from 'react-router-dom';

export const Card1 = () => {
    return (
        <div className="col-sm-6">
            <div className="card" style={{'width': '31rem'}}>
                <div className="card-body">
                    <h5 className="card-title">Отчёт</h5>
                    <p className="card-text">Дополнительное соглашение с преподавателем ТГУ</p>
                    <Link 
                        className="nav-link" 
                        to="reports/report1">
                        <button 
                            className="btn btn-primary">
                            Создать
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};


export const Card2 = () => {
    return (
        <div className="col-sm-6">
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
