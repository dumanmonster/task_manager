import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteTask } from '../../storage/useLocalStorage';

export default function DeleteConfirm() {

    const navigate = useNavigate();
    const { id } = useParams();

    function deleteTaskFromStorage(id) {
        deleteTask(id);
        navigate('/home');
    }

    return (
        <div className='delete-confirm'>
            <div><i className="fa-solid fa-circle-exclamation fa-3x"></i></div>
            <div><h4>Вы уверены?</h4></div>
            <div><h5>Вы не сможете восстановить это</h5></div>
            <div className='buttons'>
                <button onClick={() => deleteTaskFromStorage(id)} className='confirm' >Да, удалить</button>
                <button onClick={() => navigate(-1)} className='cancel' >Отмена</button>
            </div>
        </div>

    )
}
