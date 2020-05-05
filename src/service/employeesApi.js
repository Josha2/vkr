export default class ApiService {
    _transformPerson = (person) => {
        return {
            id: person.employee_id,
            name: person.employee_name,
            skill: person.employee_skill
        };
    };

    getEmployees = async () => {
        const result = await fetch('http://localhost:4000/employees');
        if(!result.ok) {
            throw new Error(`Could not fetch url, received ${result.status}`);
        };
        const body = await result.json();
        return body.data;
    };

    getEmployee = async (name) => {
        const result = await fetch(`http://localhost:4000/employees/employee?employee_name=${name}`);
        if(!result.ok) {
            throw new Error(`Could not fetch url, received ${result.status}`);
        };
        const body = await result.json();
        return body.data[0];
    };
    
    getHistory = async () => {
        const result = await fetch('http://localhost:4000/history');
        if(!result.ok) {
            throw new Error(`Could not fetch url, received ${result.status}`);
        };
        const body = await result.json();
        return body.data;
    };

    getDiscipline = async (name) => {
        const result = await fetch(`http://localhost:4000/employees/discipline?employee_name=${name}`);
        if(!result.ok) {
            throw new Error(`Could not fetch url, received ${result.status}`);
        };
        const body = await result.json();
        return body.data;
    };

    getDisciplineInfo = async (id_e, id_d) => {
        const result = await fetch(`http://localhost:4000/employees/discipline/info?employee_id=${id_e}&discipline_id=${id_d}`);
        if(!result.ok) {
            throw new Error(`Could not fetch url, received ${result.status}`);
        };
        const body = await result.json();
        return body.data[0];
    };
    
};