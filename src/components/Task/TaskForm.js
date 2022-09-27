import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useForm } from "../../hooks/useForm";
import { addTask, editTask, getTaskById } from "../../storage/useLocalStorage";

function TaskForm({ id, ...props }) {
  const navigate = useNavigate();
  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    taskname: "",
    description: "",
    deadline: "",
    major: false,
    productivity: false,
    health: false,
    education: false,
    due: false,
    remove: false,
    completed: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    id ? editTask(id, inputValues) : addTask({ id: uuid(), ...inputValues });
    resetForm();
    navigate(-1);
  };

  useEffect(() => {
    setTimeout(() => {
      let form = document.getElementById("form");
      form.className = "task-form task-form--isVisible";
    }, 1);
    if (id) {
      const taskToEdit = getTaskById(id);
      setForm(taskToEdit);
    }
  }, [id]);

  function toDeleteConfirm() {
    navigate(`/delete/${id}`);
  }

  return (
    <>
      <Outlet />
      <form
        onSubmit={handleSubmit}
        id="form"
        className="task-form task-form--isHidden"
      >
        <div className="form-head">
          <h5>Название</h5>
          <button onClick={() => navigate(-1)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div>
          <input
            className="form-text form-input"
            type="text"
            name="taskname"
            onChange={handleInputChange}
            value={inputValues.tasName}
            placeholder="Название задачи"
            required
          />
        </div>
        <div>
          <h5>Описание</h5>
        </div>
        <div>
          <textarea
            name="description"
            type="text"
            onChange={handleInputChange}
            rows={4}
            value={inputValues.description}
            placeholder="Описание задачи"
            required
          />
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            id="major"
            name="major"
            checked={inputValues.major === "true"}
            value={inputValues.major === "true" ? false : true}
            onChange={handleInputChange}
          />
          <label htmlFor="major">Важная задача</label>
        </div>

        <div>
          <h5>Дата и время окончания</h5>
        </div>
        <div>
          <input
            className="form-input"
            type="date"
            name="deadline"
            value={inputValues.deadline}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <h5>Тэги</h5>
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="productivity"
                name="productivity"
                checked={inputValues.productivity === "true"}
                value={inputValues.productivity === "true" ? false : true}
                onChange={handleInputChange}
              />
              <label htmlFor="productivity">Продуктивность</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="education"
                name="education"
                checked={inputValues.education === "true"}
                value={inputValues.education === "true" ? false : true}
                onChange={handleInputChange}
              />
              <label htmlFor="education">Образование</label>
            </div>
          </div>

          <div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="health"
                name="health"
                checked={inputValues.health === "true"}
                value={inputValues.health === "true" ? false : true}
                onChange={handleInputChange}
              />
              <label htmlFor="health">Здоровье</label>
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                id="due"
                name="due"
                checked={inputValues.due === "true"}
                value={inputValues.due === "true" ? false : true}
                onChange={handleInputChange}
              />
              <label htmlFor="due">Срочно</label>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button type="submit">{id ? "Изменить" : "Добавить"}</button>
          {id ? (
            <button onClick={() => toDeleteConfirm()} className="delete-button">
              Удалить
            </button>
          ) : (
            <button onClick={() => navigate(-1)} className="delete-button">
              Отмена
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default TaskForm;
