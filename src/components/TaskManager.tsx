import { ChangeEvent, FormEvent, useState } from "react";
import { Task } from "../types";
import TaskComponent from "./TaskComponent";

function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [task, setTask] = useState("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.length === 0) return;

    addNewTask(task);
    setTask("");
  };

  const addNewTask = (title: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        title,
        done: false,
      },
    ]);
  };

  return (
    <>
      <h2>Add Expense</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Item:</label>
          <input
            type="text"
            value={task}
            onChange={onInputChange}
          ></input>
          <br />
          <label>Amount:</label>
          <input
            type="text"
            value={task}
            onChange={onInputChange}
          ></input>
          <br />
          <label>Date:</label>
          <input
            type="text"
            value={task}
            onChange={onInputChange}
          ></input>
          <button type="submit">Add</button>
        </form>
      </div>
      {tasks.length > 0 && (
        <div>
          <h2>Task List</h2>
          <table style={{ margin: "0 auto", width: "100%" }}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => {
                return <TaskComponent task={task} />;
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default TaskManager;
