/*import { Task } from "../types";

interface TaskProps {
    Item: Task;
    Amount: Task;
    Date: Task;
}

function ExpenseComponent({Item, Amount, Date}: TaskProps) {
    return (
        <tr>
            <td>{task.item}</td>
        </tr>
    )
}*/

import { Task } from "../types";

interface TaskProps {
  task: Task;
}

function TaskComponent({ task, }: TaskProps) {
  return (
    <tr>
      <td>{task.title}</td>
    
    </tr>
  );
  
}
export default TaskComponent;