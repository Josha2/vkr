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
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #c9c9c9;
    margin-bottom: 10px;
    > button {
        margin: 10px 0; 
        :focus { 
            outline: none; 
        }
    }
`;

const ReportCard= styled.div`
    padding-bottom: 10px;
`;

const ReportList = () => {
    const [currentId, setCurrentId] = useState(1);
    const [reportList, setReportList] = useState([]); 

    const deleteItem = (id) => {
        setReportList(reportList.filter(item => item.id !== id));
    };

    const createItem = () => {
        setCurrentId(currentId + 1);
        return {
            id: currentId,
            content: <Report 
                        panelId={currentId}
                        deleteItem={deleteItem}/>
        };

    };

    const addItem = useCallback(() => {
        setReportList([...reportList, createItem()]);
    });


    const renderReportList = () => {
        return reportList.map((item, i) => {
            return (
                <ReportCard 
                    key={i}>
                    {item.content}
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
                    style={{backgroundColor: '#4F9DDD'}}
                    color="primary"
                    onClick={addItem}
                >
                    + Добавить отчёт
                </Button>
                <Button 
                    variant="contained" 
                    size="large" 
                    color="primary"
                    style={{backgroundColor: '#4fdd81'}}
                    onClick={() => {}}
                >
                   ↓ Скачать
                </Button>
            </Content>
            {renderReportList()}
        </div>
    );
};

export default ReportList;