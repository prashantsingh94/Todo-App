import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getDataFromLocalStorage = () => {
  let list;
  if (localStorage.getItem("list")) {
    list = JSON.parse(localStorage.getItem("list"));
  } else {
    list = [];
  }

  return list;
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getDataFromLocalStorage());
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const removeItem = (id) => {
    showAlert(true, "Item has been removed from the list!", "danger");
    const filteredList = list.filter((item) => item.id !== id);
    setList(filteredList);
    setName("");
    setIsEditing(false);
    setEditId(null);
  };

  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setEditId(id);
    setName(editItem.title);
    setIsEditing(true);
  };

  const clearItems = () => {
    showAlert(true, "The List has been cleared!", "success");
    setList([]);
    setName("");
    setIsEditing(false);
    setEditId(null);
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("Form Submitted!");

    if (!name) {
      showAlert(true, "Please enter the value", "danger");
    } else if (editId && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setIsEditing(false);
      setEditId(null);
      showAlert(true, "The Item has been updated!", "success");
    } else {
      showAlert(true, "Item has been added to the list!", "success");
      const newItem = {
        id: list.length + 1,
        title: name,
      };

      setList([...list, newItem]);
      setName("");
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} showAlert={showAlert} />}
        <h3>Todo Application</h3>
        <div className="form-control">
          <input
            type="text"
            name="name"
            autoComplete="off"
            className="grocery"
            placeholder="Enter the task here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearItems}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
