// import { FaTimes } from 'react-icons/fa'
// import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div className = {`task ${task.reminder ? 'reminder':''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>
                {task.text} <DeleteIcon style={{ color: 'red', cursor:'pointer' }} onClick={()=>onDelete(task.id)}/>
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
