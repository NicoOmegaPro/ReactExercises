import { useState, useEffect, useRef } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import Alert from "./components/Alert.jsx";

import { nanoid } from "nanoid";

export default function App() {
  const [expenses, setExpenses] = useState(
    localStorage.getItem("expenses-react-app")
      ? JSON.parse(localStorage.getItem("expenses-react-app"))
      : []
  );

  const [amount, setAmount] = useState("");
  const [charge, setCharge] = useState("");
  const [edit, setEdit] = useState(false);
  const [alert, setAlert] = useState({ show: false });

  const idRef = useRef(0);

  useEffect(() => {
    localStorage.setItem("expenses-react-app", JSON.stringify(expenses));
  }, [expenses]);

  function handleAlert({ type, text }) {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false }, 3000);
    });
  }

  function clearItems() {
    setExpenses([]), handleAlert({ type: "danger", text: "Todo deleted" });
  }

  function handleCharge(e) {
    setCharge(e.target.value)
  }

  function handleAmount(e) {
    let amount = e.target.value;
    amount?setAmount(parseInt(e.target.value)):setAmount(amount);

  }

  function handleSubmit(e) {
    e.preventDefault();
    if (charge!="" && amount>0) {
      if (edit) {
        setExpenses(expenses.map(expense => {
          return expense.id==idRef.current?{...expense,charge,amount}:expense
        }));
        setEdit(false)
        idRef.current = 0;
      }
      else {
        const newExpense = {id:nanoid(),charge,amount};
        setExpenses([...expenses, newExpense]);
        handleAlert({ type: "succes", text: "Expense added" });
      }
    } else {
        handleAlert({ type: "danger", text: "Charge cant be empty and amount must be > 0" });
    }
    setCharge("")
    setAmount("")
  }

  function handleDelete(id) {
    setExpenses(expenses.filter(expense => expense.id!=id)), 
    handleAlert({ type: "danger", text: "Expense deleted" });
  }

  function handleEdit(id) {
    let expense = expenses.find(expense => expense.id == id);
    let {charge, amount} = expense
    setEdit(true);
    setCharge(charge)
    setAmount(amount);
    idRef.current = id;
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>Total Spending:&nbsp;
      <span className="total">{expenses.reduce((acc, curr) =>   acc += curr.amount, 0)} $</span></h1>
    </>
  );
}