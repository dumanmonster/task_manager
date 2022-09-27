import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom/dist";

import TaskItem from "../components/Task/TaskItem";
import { getListTasks } from "../storage/useLocalStorage";

export default function MainBar() {
  const tasksPerPage = 5;
  const path = window.location.pathname;
  const [Tasks, setTasks] = useState(getListTasks);
  const [next, setNext] = useState(tasksPerPage);
  const [searchParams, setSearchParams] = useSearchParams({ replace: true });

  const handleMoreTask = () => {
    setNext(next + tasksPerPage);
    console.log(next);
  };

  const FILTER_MAP = {
    "/home": (task) => task.completed === false && task.remove === false,
    "/major": (task) =>
      task.completed === false &&
      task.remove === false &&
      task.major === "true",
    "/completed": (task) => task.completed === true && task.remove === false,
    "/removed": (task) => task.remove === true,
    "/productivity": (task) =>
      task.completed === false &&
      task.remove === false &&
      task.productivity === "true",
    "/education": (task) =>
      task.completed === false &&
      task.remove === false &&
      task.education === "true",
    "/health": (task) =>
      task.completed === false &&
      task.remove === false &&
      task.health === "true",
    "/due": (task) =>
      task.completed === false && task.remove === false && task.due === "true",
  };

  const moveTaskListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = Tasks[dragIndex];
      const hoverItem = Tasks[hoverIndex];
      setTasks((Tasks) => {
        const updatedTasks = [...Tasks];
        updatedTasks[dragIndex] = hoverItem;
        updatedTasks[hoverIndex] = dragItem;
        return updatedTasks;
      });
    },
    [Tasks]
  );

  return (
    <div className="main-tasks">
      <input
        className="main-tasks-input"
        placeholder="Поиск"
        value={searchParams.get("filter") || ""}
        onChange={(event) => {
          let filter = event.target.value;
          if (filter) {
            setSearchParams({ filter }, { replace: true });
          } else {
            setSearchParams({}, { replace: true });
          }
        }}
      />
      <div className="main-content">
        {Tasks.length > 0 ? (
          Tasks.filter(FILTER_MAP[path])
            .filter((task) => {
              let filter = searchParams.get("filter");
              if (!filter) return true;
              let name = task.taskname.toLowerCase();
              return name.includes(filter.toLowerCase().trim());
            })
            .slice(0, next)
            .map((Task, index) => (
              <TaskItem
                Task={Task}
                key={Task.id}
                setTasks={setTasks}
                index={index}
                moveTaskListItem={moveTaskListItem}
              />
            ))
        ) : (
          <h3>Список задач пуст</h3>
        )}
      </div>
      {next <= Tasks.length && Tasks.length > 0 ? (
        <div className="main-content--button">
          <button onClick={() => handleMoreTask()}>показать еще 5 задач</button>
        </div>
      ) : (
        <div className="main-content--button">
          <h3>Задач больше нет</h3>
        </div>
      )}
    </div>
  );
}
