import React from "react";
import styles from "./App.module.css";
import {useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {todoactions} from "./store/todo";
function App() {
  const inputref = useRef();

  const dispatch = useDispatch();
  const {items, error} = useSelector((state) => state.todo);
  let todo = [],
    completed = [];
  if (items.length > 0) {
    todo = items.filter((item) => item.todo === 1);
    completed = items.filter((item) => item.todo === 0);
  }
  const clickhandler = () => {
    console.log(inputref.current.value);
    if (inputref.current.value.length === 0) {
      dispatch(todoactions.errorhandler("You must enter something!"));
      return;
    }
    dispatch(todoactions.errorhandler(""));
    dispatch(
      todoactions.addtotodo({
        id: Math.random() * 10,
        todo: 1,
        task: inputref.current.value,
      })
    );
  };

  const deletehandler = (id) => {
    dispatch(todoactions.removetodo(id));
  };

  const completehandler = (id) => {
    dispatch(todoactions.markcompleted(id));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles["input"]}>
          <input type="text" ref={inputref} />
          <button onClick={clickhandler} className={styles.button}>
            Add
          </button>
        </div>
        
        {error && <div className={styles.error}>{error}</div>}
        {!error && <div className={styles["lists-container"]}>
          <div className={styles["lists-todo"]}>
            <ul className={styles["lists"]}>
              {!error && <p>ToDo</p>} {todo.length === 0 && !error && <p className={styles.message}>No Items Found</p>}
              {todo.length > 0 &&
                todo.map((item) => {
                  return (
                    <li key={item.id} className={styles["list-item"]}>
                      <h3>{item.task}</h3>
                      <div className={styles.btns}>
                      <button className={styles.completed} onClick={completehandler.bind(null, item.id)}>
                        Mark Completed
                      </button>
                      <button
                        onClick={deletehandler.bind(null, item.id)}
                        className={styles.deletebtn}
                      >
                        Delete
                      </button>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className={styles["lists-complete"]}>
            <ul className={styles["lists"]}>
              {!error && <p>Completed</p>}
              {completed.length === 0 && !error && <p className={styles.message}>No Items Found</p>}

              {completed.length > 0 &&
                completed.map((item) => {
                  return (
                    <li key={item.id} className={styles["list-item"]}>
                      <h3>{item.task}</h3>
                      <button
                        onClick={deletehandler.bind(null, item.id)}
                        className={styles.deletebtn}
                      >
                        Delete
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>}
      </div>
    </>
  );
}

export default App;
