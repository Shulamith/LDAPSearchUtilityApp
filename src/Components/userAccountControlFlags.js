import { Table } from 'antd';
import React, { Component } from 'react';


const AccountControlFlagsTable = (props) => {
     //let dataSource = JSON.parse(props.dataSource);
     const data = Object.fromEntries(Object.entries(JSON.parse(props.dataSource)).map(([accountControl, value]) => [accountControl, value]))
     return (
     <div>
     <Table dataSource = {JSON.parse(props.dataSource)} columns = {props.columns}/>
     </div>);
};
export default AccountControlFlagsTable;