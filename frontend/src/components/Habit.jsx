import React from 'react';
import '../styles/Habit.css';

function Habit({habit, onDelete}) {

    return (
        <div className='habit-container'>
            <div>
                <p className='habit-title'><b>{habit.title}</b></p>
                <div className='habit-days'>
                    <p className='habit-monday'>{habit.monday ? <b>Mo</b> : <strike>Mo</strike>}</p>
                    <p className='habit-tuesday'>{habit.tuesday ? <b>Tu</b> : <strike>Tu</strike>}</p>
                    <p className='habit-wednesday'>{habit.wednesday ? <b>We</b> : <strike>We</strike>}</p>
                    <p className='habit-thursday'>{habit.thursday ? <b>Th</b> : <strike>Th</strike>}</p>
                    <p className='habit-friday'>{habit.friday ? <b>Fr</b> : <strike>Fr</strike>}</p>
                    <p className='habit-saturday'>{habit.saturday ? <b>Sa</b> : <strike>Sa</strike>}</p>
                    <p className='habit-sunday'>{habit.sunday ? <b>Su</b> : <strike>Su</strike>}</p>
                </div>
            </div>
            <button className='delete-button' onClick={() => onDelete(habit.id)}>❌</button>
        </div>
    );
}

export default Habit