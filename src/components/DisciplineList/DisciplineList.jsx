import React, { useCallback, useEffect, useState, memo } from 'react';


const DisciplineList = (props) => {
    const { employee_name } = props;

    const [disciplines, setDisciplines] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const disciplines = await EmployeeService.getDiscipline(employee_name);
            setDisciplines(disciplines);
        };

        fetch();
    }, [employee_name]);
}