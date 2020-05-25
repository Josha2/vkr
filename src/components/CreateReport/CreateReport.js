import React, { useCallback, useEffect, useState, memo } from 'react';
import dateFormat from 'dateformat';
import {usePrevious} from '../../helpers/usePrevious';
import CreateDocument from '../../print-document/print-document';
import DisciplineList from '../DisciplineList/DisciplineList';
import HoursList from '../HoursList/HoursList';

const mapHoursToMultiplier = {
    'ассистент': 180,
    'старший преподаватель': 280,
    'доцент': 380,
    'профессор': 480,
}

function CreateReport(props) {
    const {selectedEmployee} = props;
    const {
        employee_id, 
        employee_name, 
        employee_skill, 
        employee_number,
        employee_start,
    } = selectedEmployee;

    const [currentDiscipline, setCurrentDiscipline] = useState(null);
    const [hoursInfo, setHoursInfo] = useState([]);
    const [print, readyToPrint] = useState(false);

    const previousEmployeeName = usePrevious(employee_name);
    useEffect(() => {
        if(employee_name !== previousEmployeeName) {
            readyToPrint(false);
        }

    }, [previousEmployeeName, employee_name]);

    let arrayHours = hoursInfo.map(item => item.hours);

    const printDoc = useCallback(() => {
        if(!print) {
            return null;
        }
        return (
            <>
                <CreateDocument 
                    name={employee_name}
                    position={employee_skill}
                    contractNumber={employee_number}
                    contractStart={dateFormat(employee_start, 'dd.mm.yyyy')}
                    multiplier={mapHoursToMultiplier[employee_skill]}
                    lecturesHours={arrayHours[0] ?? ''}
                    seminarHours={arrayHours[1] ?? ''}
                    diplomaHours={arrayHours[2] ?? ''}
                    setsHours={arrayHours[3] ?? ''}
                    examsHours={arrayHours[4] ?? ''}
                    consultationHours={arrayHours[5] ?? ''}
                    otherHours={arrayHours[6] ?? ''}
                /> 
            </> 
        );
    }, [arrayHours, employee_name, employee_skill, print]);
    console.log(hoursInfo);
    return (
        <>
            <DisciplineList 
                employee_name={employee_name}
                employee_id={employee_id}
                currentDiscipline={currentDiscipline}
                setCurrentDiscipline={setCurrentDiscipline}
            />
            <HoursList
                employee_id={employee_id}
                discipline_id={currentDiscipline}
                throwBackHoursInfo={setHoursInfo}
                readyToPrint={readyToPrint}
            />
            {printDoc()}
        </>
    )
};

export default memo(CreateReport);