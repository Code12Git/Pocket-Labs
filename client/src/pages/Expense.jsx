import React from 'react'
import CreateExpense from '../components/Expense/CreateExpense'
import Expenses from '../components/Expense/Expenses'
import Navbar from '../base/Navbar'

const Expense = () => {
  return (
    <>
    <Navbar />
    <CreateExpense />
    <Expenses />
    </>
  )
}

export default Expense