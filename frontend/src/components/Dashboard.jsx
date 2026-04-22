import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await api.get('tasks/');
            setTasks(res.data);
        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.clear();
                navigate('/');
            }
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        await api.post('tasks/', { title });
        setTitle('');
        fetchTasks();
    };

    const handleDelete = async (id) => {
        await api.delete(`tasks/${id}/`);
        fetchTasks();
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Task Dashboard</h2>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                        Logout
                    </button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-100">
                    <form onSubmit={handleCreate} className="flex gap-4">
                        <input 
                            value={title} 
                            onChange={e => setTitle(e.target.value)} 
                            placeholder="What needs to be done?" 
                            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required 
                        />
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                            Add Task
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    {tasks.length === 0 ? (
                        <p className="p-6 text-center text-gray-500">No tasks yet. Create one above!</p>
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {tasks.map(task => (
                                <li key={task.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition">
                                    <span className="text-gray-700">{task.title}</span>
                                    <button 
                                        onClick={() => handleDelete(task.id)} 
                                        className="text-red-500 hover:text-red-700 font-medium text-sm"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}