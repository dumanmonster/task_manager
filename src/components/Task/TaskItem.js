import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { editTask, getListTasks } from "../../storage/useLocalStorage";

export default function TaskItem({ Task, setTasks, moveTaskListItem, index }) {
  const {
    id,
    taskname,
    deadline,
    description,
    major,
    productivity,
    health,
    education,
    due,
    remove,
    completed,
  } = Task;

  const navigate = useNavigate();

  function removeTask(id) {
    const newTask = {
      id: uuid(),
      taskname,
      deadline,
      description,
      major,
      productivity,
      health,
      education,
      due,
      remove: true,
      completed,
    };
    editTask(id, newTask);
    setTasks(getListTasks());
  }

  function unRemoveTask(id) {
    const newTask = {
      id: uuid(),
      taskname,
      deadline,
      description,
      major,
      productivity,
      health,
      education,
      due,
      remove: false,
      completed,
    };
    editTask(id, newTask);
    setTasks(getListTasks());
  }

  function completeTask(id) {
    const newTask = {
      id: uuid(),
      taskname,
      deadline,
      description,
      major,
      productivity,
      health,
      education,
      due,
      remove,
      completed: true,
    };
    editTask(id, newTask);
    setTasks(getListTasks());
  }

  function unCompleteTask(id) {
    const newTask = {
      id: uuid(),
      taskname,
      deadline,
      description,
      major,
      productivity,
      health,
      education,
      due,
      remove,
      completed: false,
    };
    editTask(id, newTask);
    setTasks(getListTasks());
  }

  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [spec, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveTaskListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <>
      <div className="task-item" ref={dragDropRef}>
        <div className="checkbox">
          {Task.remove === false ? (
            Task.completed ? (
              <input
                type="checkbox"
                checked
                onChange={() => unCompleteTask(id)}
              />
            ) : (
              <input type="checkbox" onChange={() => completeTask(id)} />
            )
          ) : (
            <></>
          )}
          {major === "true" ? (
            <label
              style={{ color: "yellow" }}
              onClick={() => navigate(`/edit/${id}`)}
            >
              {taskname}
            </label>
          ) : (
            <label onClick={() => navigate(`/edit/${id}`)}>{taskname}</label>
          )}
        </div>
        <div className="right-items">
          {productivity === "true" && (
            <p className="productivity">Продуктивность</p>
          )}
          {health === "true" && <p className="health">Здоровье</p>}
          {education === "true" && <p className="education">Образование</p>}
          {due === "true" && <p className="due">Срочно</p>}
          <h5>{deadline}</h5>
          {Task.remove === false ? (
            <button onClick={() => removeTask(id)}>
              <i className="fa-solid fa-trash"></i>
            </button>
          ) : (
            <button onClick={() => unRemoveTask(id)}>
              <i className="fa-solid fa-rotate-right"></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
