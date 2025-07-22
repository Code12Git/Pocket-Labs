import React from 'react';
import TotalExpense from '../components/TotalExpense';
import ExpensesOverTime from '../components/ExpensesOverTime';

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
    
        <TotalExpense />
     
      
        <ExpensesOverTime />
 
    </div>
  );
};

export default Dashboard;
