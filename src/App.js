import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseList from "./Components/ExpenseList";
import ExpenseForm from "./Components/ExpenseForm";
import Alert from "./Components/Alert";
import { v4 as uuidv4 } from "uuid";
import { BiRupee } from "react-icons/bi";
// const initialsExpenses = [
//   { id: uuidv4(), charge: "rent", amount: 1600 },
//   { id: uuidv4(), charge: "car repair", amount: 400 },
//   { id: uuidv4(), charge: "credit card bill", amount: 900 },
// ];
const initialsExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
function App() {
  const [expenses, setExpenses] = useState(initialsExpenses);

  const [charge, setCharge] = useState("");

  const [amount, setAmount] = useState("");

  const [alert, setAlert] = useState({ show: false });

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    console.log("we call useEffect");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleCharge = (e) => {
    // console.log(`charge: ${e.target.value}`);
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    // console.log(`amount: ${e.target.value}`);
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(charge, amount);
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempexpense = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempexpense);
        setEdit(false);
        handleAlert({ type: "success", text: "item Edited" });
      } else {
        const singleExpense = { id: uuidv4(), charge, amount };
        setExpenses([singleExpense, ...expenses]);
        handleAlert({ type: "success", text: "item added" });
      }

      setCharge("");
      setAmount("");
    } else {
      //
      handleAlert({ type: "danger", text: "charge or amount is empty" });
    }
  };
  // console.log(expenses);
  const handleClearItems = () => {
    // console.log("Clear all Items");
    setExpenses([]);
    handleAlert({ type: "danger", text: "Clear All Items" });
  };
  const handleEdit = (id) => {
    // console.log(`Item Edited - ${id}`);
    let expense = expenses.find((item) => item.id === id);
    // console.log(expense);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };
  const handleDelete = (id) => {
    // console.log(`Item Deleted - ${id}`);
    let tempExpenses = expenses.filter((item) => item.id !== id);
    console.log(tempExpenses);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "Item Deleted" });
    setCharge("");
    setAmount("");
    setEdit(false);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert></Alert>
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        ></ExpenseForm>
        <ExpenseList
          expenses={expenses}
          handleClearItems={handleClearItems}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        ></ExpenseList>
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          <BiRupee />{" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
