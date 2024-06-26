import React from 'react';
import '../styles/Habit.css';

function Habit({habit, onDelete}) {

    return (
        <div className='habit-container'>
            <div className='habit-text'>
                <p className='habit-title'>{habit.title}</p>
                <p className='habit-description'>{habit.description}</p>
            </div>
            <button className='delete-button' onClick={() => onDelete(habit.id)}>❌</button>
        </div>
    );
}

export default Habit