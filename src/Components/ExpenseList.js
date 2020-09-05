import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";
const ExpenseList = ({
  expenses,
  handleClearItems,
  handleDelete,
  handleEdit,
}) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <Item
              key={expense.id}
              expense={expense}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            ></Item>
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={handleClearItems}>
          clear expenses
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
