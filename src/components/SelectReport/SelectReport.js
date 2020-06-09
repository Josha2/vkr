import React from 'react';
import {Card1, Card2} from '../../common/components/Card';
import MultipleReports from '../MultipleReports/MultipleReports';
import CreateReport from '../CreateReport/CreateReport';


const SelectReport = () => {

    return (
        <div className="container pt-2">
            {/* <div className="row">
                <Card1/>
                <Card2/>
            </div> */}
            <MultipleReports/>
            {/* <CreateReport/> */}
        </div>
    );
};

export default SelectReport;