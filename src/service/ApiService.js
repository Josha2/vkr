const getEmployees = async () => {
    const result = await fetch('http://localhost:4000/employees');
    if(!result.ok) {
        throw new Error(`Could not fetch url, received ${result.status}`);
    };
    const body = await result.json();
    return body.data;
};

const getEmployee = async (name) => {
    const result = await fetch(`http://localhost:4000/employees/employee?employee_name=${name}`);
    if(!result.ok) {
        throw new Error(`Could not fetch url, received ${result.status}`);
    };
    const body = await result.json();
    return body.data[0];
};

const getHistory = async () => {
    const result = await fetch('http://localhost:4000/history');
    if(!result.ok) {
        throw new Error(`Could not fetch url, received ${result.status}`);
    };
    const body = await result.json();
    return body.data;
};

const getDiscipline = async (name) => {
    const result = await fetch(`http://localhost:4000/employees/discipline?employee_name=${name}`);
    if(!result.ok) {
        throw new Error(`Could not fetch url, received ${result.status}`);
    };
    const body = await result.json();
    return body.data;
};

const getDisciplineInfo = async (id_e, id_d) => {
    const result = await fetch(`http://localhost:4000/employees/discipline/info?employee_id=${id_e}&discipline_id=${id_d}`);
    if(!result.ok) {
        throw new Error(`Could not fetch url, received ${result.status}`);
    };
    const body = await result.json();
    return body.data[0];
};

const getDisciplines = async () => {
    const result = await fetch('http://localhost:4000/disciplines');
    if(!result.ok) {
        throw new Error(`Could not fetch url, received ${result.status}`);
    };
    const body = await result.json();
    return body.data;
};

const updateEmployee = async (employee_name, employee_skill, employee_number, employee_start, employee_end, employee_id) => {
    const result = await fetch(`http://localhost:4000/employees/update?employee_name=${employee_name}&employee_skill=${employee_skill}&employee_number=${employee_number}&employee_start=${employee_start}&employee_end=${employee_end}&employee_id=${employee_id}`);
    if(!result.ok) {
        throw new Error(`Could not fetch url, received ${result.status}`);
    };
};

const insertDisciplineHours = async (employee_id, discipline_id, lectures, seminar, diploma, sets, exams, consultations, other) => {
    const result = await fetch(`http://localhost:4000/employees/discipline/add?employee_id=${employee_id}&discipline_id=${discipline_id}&lectures=${lectures}&seminar=${seminar}&diploma=${diploma}&sets=${sets}&exams=${exams}&consultations=${consultations}&other=${other})`);
    if(!result.ok) {
        throw new Error(`Could not fetch url, received ${result.status}`);
    };
};

export default {
    getEmployees,
    getEmployee,
    getHistory,
    getDiscipline,
    getDisciplineInfo,
    getDisciplines,
    updateEmployee,
    insertDisciplineHours
};