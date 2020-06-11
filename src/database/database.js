const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const SELECT_ALL_EMPLOYEES = 'SELECT * FROM employees';
const SELECT_ALL_HISTORY = `SELECT * FROM history`;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Menusourceauto123',
    database: 'uni',
    dateStrings: 'date'
});
app.use(express.static('public'));
app.use('/img', express.static('images'));

app.use(cors());

app.get('/', (req, res) => {
    res.send('HELLO?')
});

app.get('/employees', (req, res) => {
    connection.query(SELECT_ALL_EMPLOYEES,  (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    }) 
})

app.get('/employees/add', (req, res) => {
    const { employee_name, employee_skill} = req.query;
    const INSERT_EMPLOYEE = `INSERT INTO employees VALUES('${employee_name}', '${employee_skill}')`;
    connection.query(INSERT_EMPLOYEE, (err, results ) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send('Success');
        }
    })
})

//SELECT DISCIPLINE FOR CHOSEN EMPLOYEE
app.get('/employees/discipline', (req, res) => {
    const { employee_name, } = req.query;
    const SELECT_EMPLOYEE_DISCIPLINE = `SELECT D.discipline_id, D.discipline_name
                                        FROM discipline AS D
                                        JOIN employees_discipline AS ED ON ED.discipline_id = D.discipline_id
                                        JOIN employees AS E ON E.employee_id = ED.employee_id
                                        WHERE E.employee_name = '${employee_name}'`;
    connection.query(SELECT_EMPLOYEE_DISCIPLINE, (err, results ) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})

//SELECT ALL DISCIPLINES
app.get('/disciplines', (req, res) => {
    const SELECT_All_DISCIPLINE = `SELECT *
                                        FROM discipline`;
    connection.query(SELECT_All_DISCIPLINE, (err, results ) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})

//
app.get('/employees/employee', (req, res) => {
    const { employee_name, } = req.query;
    const SELECT_EMPLOYEE = `SELECT *
                             FROM employees
                             WHERE employee_name = '${employee_name}'`;
    connection.query(SELECT_EMPLOYEE, (err, results ) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})

//SELECT DISCIPLINES INFO
app.get('/employees/discipline/info', (req, res) => {
    const { employee_id, discipline_id} = req.query;
    const SELECT_DICIPLINE_INFO = `SELECT lectures, seminar, diploma,
                                   sets, exams, consultations, other
                                   FROM employees_discipline
                                   WHERE employee_id = ${employee_id}
                                   AND discipline_id = ${discipline_id}`
    connection.query(SELECT_DICIPLINE_INFO, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            });
        }
    });
});

//SELECT HISTORY TABLE
app.get('/history', (req, res) => {
    connection.query(SELECT_ALL_HISTORY, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            });
        }
    });
});

//UPDATE EMPLOYEE
app.get('/employees/update/', (req, res) => {
    const { 
        employee_id,
        employee_name, 
        employee_skill,
        employee_number, 
        employee_start, 
        employee_end  
        
    } = req.query;
    const UPDATE_EMPLOYEE = `UPDATE employees
                             SET employee_name = '${employee_name}',
                             employee_skill = '${employee_skill}',
                             employee_number = '${employee_number}',
                             employee_start = '${employee_start}',
                             employee_end = '${employee_end}'
                             WHERE (employee_id = '${employee_id}')`
    connection.query(UPDATE_EMPLOYEE, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            });
        }
    });
});

//INSERT DISCIPLINES HOURS
app.get('/employees/discipline/add', (req, res) => {
    const { employee_id, discipline_id, lectures, seminar, diploma, sets, exams, consultations, other} = req.query;
    const INSERT_DICIPLINE_INFO = `INSERT INTO employees_discipline
                                   VALUES (
                                    ${employee_id},
                                    ${discipline_id},
                                    ${lectures},
                                    ${seminar},
                                    ${diploma},
                                    ${sets},
                                    ${exams},
                                    ${consultations},
                                    ${other})`
    connection.query(INSERT_DICIPLINE_INFO, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            });
        }
    });
});

app.listen(4000, () => {
    console.log(`Connected`)
});