import React from 'react';

import icon from './search.png';

const SearchBar = (props) => {
    const { search, total } = props;

    return (
        <div className="input-group mt-2" style={{'width': '350px'}}>
            <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
                <img src={icon} alt="" height="20" width="20"/>
                ({total})
            </span>
            </div>
            <input 
                type="text" 
                className="form-control" 
                placeholder="поиск по ФИО"
                style={{'width': '150px'}}
                onChange={search}/>
        </div>
    );
};

export default SearchBar;