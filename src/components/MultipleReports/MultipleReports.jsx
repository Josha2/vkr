import React, { useState, useCallback }  from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import Report from '../Report/Report';

const Header = styled.div`
    text-align: center;
    margin-bottom: 50px;

    > h2 {
        font-size 34px;
    }
`;
const Content = styled.div`
    border-bottom: 1px solid #c9c9c9;
    margin-bottom: 10px;
    > button {
        margin: 10px 0;
    }
`;

const ReportCard= styled.div`
    padding-bottom: 10px;
`;

const MultipleReports = () => {
    const [currentId, setCurrentId] = useState(0);

    const [reportList, setReportList] = useState([{id: 0, content: Report}]);
    
    const createItem = () => {
        return {
            id: setCurrentId(currentId + 1),
            content: Report
        };
    };

    const addItem = useCallback(() => {
        setReportList([...reportList, createItem()]);
    });

    const renderReportList = () => {
        return reportList.map((item, i) => {
            const Component = item.content;
            return (
                <ReportCard 
                    key={i}>
                    <Component />
                </ReportCard>
            );
        });
    };

    return (
        <div className="container">
            <Header>
                <h2>Отчёты</h2>
            </Header>
            <Content>
                <Button 
                    variant="contained" 
                    size="large" 
                    color="primary"
                    style={{backgroundColor: '#4F9DDD'}}
                    onClick={addItem}
                >
                    + Добавить отчёт
                </Button>
            </Content>
            {renderReportList()}
        </div>
    );
};

export default MultipleReports;