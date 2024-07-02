import { useState, useEffect } from 'react'
import api from '../api'
import Habit from '../components/Habit'
import Week from '../components/Week'
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom'; // Ensure this is imported


function Home() {
    const navigate = useNavigate();

    const [userStatus, setUserStatus] = useState(null);
    const [habits, setHabits] = useState([])
    const [monday, setMonday] = useState(false)
    const [tuesday, setTuesday] = useState(false)
    const [wednesday, setWednesday] = useState(false)
    const [thursday, setThursday] = useState(false)
    const [friday, setFriday] = useState(false)
    const [saturday, setSaturday] = useState(false)
    const [sunday, setSunday] = useState(false)
    const [title, setTitle] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        const status = checkUserStatus();
        setUserStatus(status);
    }, [])

    useEffect(() => {
        // This effect now depends on userStatus, ensuring it runs after userStatus is set
        if (userStatus) {
            userStatus === "guest" ? getGuestHabits() : getHabits();
        }
    }, [userStatus]); // Dependency array includes userStatus


    const getGuestHabits = () => {
        const guestHabits = JSON.parse(sessionStorage.getItem('guestHabits')) || [];
        setHabits(guestHabits);
    }

    const getHabits = () => {
        api
            .get('/api/habits/')
            .then(response => response.data)
            .then(data => { setHabits(data) })
            .catch(error => alert(error))
    }

    const addGuestHabit = (event) => {
        event.preventDefault();
        //Retrieve existing habits from sessionStorage
        const existingHabits = JSON.parse(sessionStorage.getItem('guestHabits')) || [];
        //Create a new habit object
        const newHabit = {
            title,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
            id: existingHabits.length + 1,
        };
        //Update the habits array
        const updatedHabits = [...existingHabits, newHabit];
        //Store the updated array in sessionStorage
        sessionStorage.setItem('guestHabits', JSON.stringify(updatedHabits));
        getGuestHabits();
    }

    const addHabit = (event) => {
        event.preventDefault()
        api
            .post('/api/habits/', { title, monday, tuesday, wednesday, thursday, friday, saturday, sunday })
            .then((response) => {
                if (response.status !== 201) alert('Failed to add habit')
                getHabits()
            })
            .catch(error => alert(error))
    }

    const deleteGuestHabit = (id) => {
        const existingHabits = JSON.parse(sessionStorage.getItem('guestHabits')) || [];
        const updatedHabits = existingHabits.filter(habit => habit.id !== id);
        sessionStorage.setItem('guestHabits', JSON.stringify(updatedHabits));
        getGuestHabits();
    }

    const deleteHabit = (id) => {
        api
            .delete(`/api/habits/delete/${id}/`)
            .then((response) => {
                if (response.status !== 204) alert('Failed to delete habit')
                getHabits()
            })
            .catch(error => alert(error))
    }

    const checkUserStatus = () => {
        const userToken = localStorage.getItem('access')
        const guestSessionId = sessionStorage.getItem('session_id')
    
        if (userToken) {
            return "loggedIn";
        } else if (guestSessionId) {
            return "guest";
        } else {
            api.get('/api/session/guest/')
            .then(response => {
                const sessionId = response.data.session_id;
                sessionStorage.setItem('session_id', sessionId); // Store session ID
                navigate('/');
            })
            .catch(error => {
                console.error('Failed to initialize guest session', error);
            });
            return "guest";
        }
    }

    return (
        <div className='home'>
            <div className='top-row'>
                <div className='header'>
                    <h1>Track your habits!</h1>
                </div>
                <div>
                    {userStatus === "guest" ? 
                    <button className='login-out' onClick={() => navigate('/login')}>Login</button> : 
                    <button className='login-out' onClick={() => navigate('/logout')}>Logout</button>}
                </div>            
            </div>
            <div className='week-row'><Week habits={habits} deleteHabit={userStatus === "guest" ? deleteGuestHabit : deleteHabit} /></div>
            <div className='habit-form-row'>
                <h1>Add Habit:</h1>
                <form className='habit-form' onSubmit={userStatus === "guest" ? addGuestHabit : addHabit}>
                    <div className='habit-form-title'>
                        <label htmlFor='title'>Title:</label>
                        <input type='text' id='title' name='title' value={title} required onChange={event => setTitle(event.target.value)} />
                    </div>
                    <div className='habit-form-days'>
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
                    </div>
                    <input className='submit-button' type='submit' value='Submit'></input>
                </form>
            </div>
            <div className='habit-list-row'>
                <h1>Find Habits:</h1>
                <input type='text' id='search' name='search' value={search} onChange={event => setSearch(event.target.value)} placeholder='Search habits...' />
                <div className='habit-list'>
                {habits.filter(habit => habit.title.toLowerCase().includes(search.toLowerCase())).map(habit => (
                    <Habit key={habit.id} habit={habit} onDelete={userStatus === "guest" ? deleteGuestHabit : deleteHabit} />
                ))}
                </div>
            </div>
        </div>
    );
}

export default Home