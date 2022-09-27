import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

export default function SideBar() {

    return (

        <div className='MainApp'>
            <div className='sidebar'>
                <NavLink activeclassname="active-button" to={"/add"} className="button" > Новая задача</NavLink>
                <NavLink activeclassname="active" to={"/home"} ><i className="fa-regular fa-envelope"></i> Мои задачи</NavLink>
                <NavLink activeclassname="active" to={"/major"} ><i className="fa-regular fa-star"></i> Важные</NavLink>
                <NavLink activeclassname="active" to={"/completed"} ><i className="fa-solid fa-check"></i> Выполненные</NavLink>
                <NavLink activeclassname="active" to={"/removed"} ><i className="fa-solid fa-trash"></i> Удаленные</NavLink>
                <p >Тэги</p>
                <NavLink to={"/productivity"} ><i className="fa-solid fa-circle sidebar--productivity fa-2xs"></i><span> Продуктивность</span></NavLink>
                <NavLink to={"/education"} ><i className="fa-solid fa-circle sidebar--education fa-2xs"></i><span> Образование</span></NavLink>
                <NavLink to={"/health"} ><i className="fa-solid fa-circle sidebar--health fa-2xs"></i><span> Здоровье</span></NavLink>
                <NavLink to={"/due"} ><i className="fa-solid fa-circle sidebar--due fa-2xs"></i><span> Срочно</span></NavLink>
            </div>
            <div className='mainbar'>
                <Outlet />
            </div>
        </div>

    )
}
