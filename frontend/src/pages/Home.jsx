import { useState, useEffect } from "react"
import api from "../api"
import Habit from "../components/Habit"

function Home() {
    const [habits, setHabits] = useState([])
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        getHabits()
    }, [])

    const getHabits = () => {
        api
            .get('/api/habits/')
            .then(response => response.data)
            .then(data => { setHabits(data), console.log(data) })
            .catch(error => alert(error))
    }

    const addHabit = (event) => {
        event.preventDefault()
        api
            .post('/api/habits/', { title, description })
            .then((response) => {
                if (response.status === 201) alert('Habit added successfully')
                else alert('Failed to add habit')
                getHabits()
            })
            .catch(error => alert(error))
    }

    const deleteHabit = (id) => {
        api
            .delete(`/api/habits/delete/${id}/`)
            .then((response) => {
                if (response.status === 204) alert('Habit deleted successfully')
                else alert('Failed to delete habit')
                getHabits()
            })
            .catch(error => alert(error))
    }

    return (
        <div>
            <div>
                <h1>Habits</h1>
                {habits.map(habit => (
                    <Habit key={habit.id} habit={habit} onDelete={deleteHabit} />
                ))}
            </div>
            <form onSubmit={addHabit}>
                <label htmlFor='title'>Title:</label>
                <br />
                <input type='text' id='title' name='title' value={title} required onChange={event => setTitle(event.target.value)} />
                <br />
                <label htmlFor='description'>Description:</label>
                <br />
                <input type='text' id='description' name='description' value={description} required onChange={event => setDescription(event.target.value)} />
                <br />
                <input type='submit' value='Submit'></input>
            </form>
        </div>
    );
}

export default Home