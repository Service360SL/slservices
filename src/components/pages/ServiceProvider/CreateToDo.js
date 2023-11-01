import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [taskAmount, setTaskAmount] = useState('');
    const [hourInputs, setHourInputs] = useState({}); // State to manage hours for each task

    const { id } = useParams();
    const todolistid = parseInt(id, 10);

    useEffect(() => {
        fetchTasks(); // Load tasks when the component mounts
    }, []);

    // useEffect = (() =>{
    //     console.log('"taskAmount"')
    // }, [])

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/auth/viewTodoListDetails');
            if (response.status === 200) {
                setTasks(response.data);
                console.log(tasks);
            } else {
                console.error('Failed to fetch tasks.');
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleAddTask = async () => {
        if (taskInput.trim() === '') {
            alert('Please enter a task before adding.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/auth/createTodoListDetails', {
                task: taskInput,
                amount: taskAmount,
                completed: false,

            });

            if (response.status === 200) {
                fetchTasks(); // Reload tasks
                setTaskInput('');
                setTaskAmount(0);
            } else {
                alert('Failed to add the task. Please try again.');
            }
        } catch (error) {
            console.error('Error adding task:', error);
            alert('An error occurred while adding the task. Please try again.');
        }
    };

    const handleToggleComplete = async (todolistdetailsid, completed) => {
        const formData = new FormData();
        formData.append('completed', !completed);
        formData.append('hours', hourInputs[todolistdetailsid]); 
        // formData.append('todolistId', todolistid); 


            const response = await axios.put(`http://localhost:8080/auth/viewTodoListDetails/${todolistdetailsid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.status === 200) {
                // Update the task's completion status on the frontend without modifying it
                const updatedTasks = tasks.map((task) => {
                    if (task.id === todolistdetailsid) {
                        return { ...task, completed: !completed };
                    } else {
                        return task;
                    }
                });
                setTasks(updatedTasks);
            } else {
                alert('Failed to update the task. Please try again.');
            }
        
    };
    
    return (

        <div className="custodo" style={{ width: "800px" }}>
            <h3>To-Do List</h3>
            <h4>Project Name </h4>
            <div>
                <div style={{ display: "flex" }}>
                    <input
                        type="text"
                        placeholder="Enter a task..."
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        style={{ marginBottom: "10px", width: "700px" }}
                    />
                </div>
                <div style={{ display: "flex" }}>
                    <input
                        type="text"
                        placeholder="Enter an Amount..."
                        value={taskAmount}
                        onChange={(e) => setTaskAmount(e.target.value)}
                        style={{ marginBottom: "10px", width: "300px" }} // Reduced width
                    />
                </div>
                <Button variant="secondary" style={{ background: "#292d32" }} onClick={handleAddTask}>Add Task</Button>

                <ul>
                {tasks.map((task, index) => (
    <li key={index} className="castodolist card" style={{ padding: '10px',width: "700px" }}>
       <div>
            <input
                    type="checkbox"
                    onChange={() => {
                        if (!task.completed) {
                            handleToggleComplete(task.todolistdetailsid, !task.completed);
                            // Reload the page
                             window.location.reload();
                        }
                        
                    }}
                    checked={task.completed}
                    
            />
            <span className={task.completed ? 'completed' : ''}>
                &nbsp;&nbsp;
                {task.task}
            </span>
            <br></br>
            <br></br>
            <span className={task.completed ? 'completed' : ''}>
                &nbsp;&nbsp;Amount: Rs.
                {task.amount}
            </span>
            &nbsp;&nbsp;
            <input
    type="text"
    placeholder="Enter hours..."
    value={task.completed ? task.workedHours.toString() : (hourInputs[task.todolistdetailsid] || '')}
    onChange={(e) => setHourInputs({ ...hourInputs, [task.todolistdetailsid]: e.target.value })}
    style={{ marginBottom: "5px", width: "150px", marginRight: "1000px", height: "35px" }}
/>
        </div>
    </li>
))}
                </ul>
            </div>
        </div>
    );
}

export default ToDoList;
