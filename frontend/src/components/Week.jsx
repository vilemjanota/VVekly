import Habit from './Habit'
import '../styles/Week.css'

function Week({ habits, deleteHabit }) {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const formatDay = (day) => {
        return day.charAt(0).toUpperCase() + day.slice(1);
    }

    return (
        <div>
            <h1>Your Week:</h1>
            <div className='week'>
                {days.map((day, index) => (
                    // Return a div for each day.
                    <div className='day' key={index}>
                        {formatDay(day)}
                        {/* Filter out habits where day is true */}
                        {habits.filter(habit => habit[day]).map(habit => (
                            <Habit key={habit.id} habit={habit} onDelete={deleteHabit} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Week