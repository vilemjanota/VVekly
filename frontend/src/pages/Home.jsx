import { useState, useEffect } from "react"
import api from "../api"
import Habit from "../components/Habit"
import '../styles/Home.css'

function Home() {
    const [habits, setHabits] = useState([])
    const [monday, setMonday] = useState(false)
    const [tuesday, setTuesday] = useState(false)
    const [wednesday, setWednesday] = useState(false)
    const [thursday, setThursday] = useState(false)
    const [friday, setFriday] = useState(false)
    const [saturday, setSaturday] = useState(false)
    const [sunday, setSunday] = useState(false)
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
            .post('/api/habits/', { title, monday, tuesday, wednesday, thursday, friday, saturday, sunday })
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
                <div className="habit-list">
                    {habits.map(habit => (
                        <Habit key={habit.id} habit={habit} onDelete={deleteHabit} />
                    ))}
                </div>
            </div>
            <form onSubmit={addHabit}>
                <label htmlFor='title'>Title:</label>
                <br />
                <input type='text' id='title' name='title' value={title} required onChange={event => setTitle(event.target.value)} />
                <br />
                <input type='checkbox' id='monday' name='monday' checked={monday} onChange={() => setMonday(monday => !monday)} />
                <label htmlFor='monday'>Monday</label>
                <br />
                <input type='checkbox' id='tuesday' name='tuesday' checked={tuesday} onChange={() => setTuesday(tuesday => !tuesday)} />
                <label htmlFor='tuesday'>Tuesday</label>
                <br />
                <input type='checkbox' id='wednesday' name='wednesday' checked={wednesday} onChange={() => setWednesday(wednesday => !wednesday)} />
                <label htmlFor='wednesday'>Wednesday</label>
                <br />
                <input type='checkbox' id='thursday' name='thursday' checked={thursday} onChange={() => setThursday(thursday => !thursday)} />
                <label htmlFor='thursday'>Thursday</label>
                <br />
                <input type='checkbox' id='friday' name='friday' checked={friday} onChange={() => setFriday(friday => !friday)} />
                <label htmlFor='friday'>Friday</label>
                <br />
                <input type='checkbox' id='saturday' name='saturday' checked={saturday} onChange={() => setSaturday(saturday => !saturday)} />
                <label htmlFor='saturday'>Saturday</label>
                <br />
                <input type='checkbox' id='sunday' name='sunday' checked={sunday} onChange={() => setSunday(sunday => !sunday)} />
                <label htmlFor='sunday'>Sunday</label>
                <br />
                <input type='submit' value='Submit'></input>
            </form>
        </div>
    );
}

export default Home