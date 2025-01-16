import React, { useState, useEffect } from 'react';
import { NotebookText, Calendar, Star, Map, Handshake, Plus, Info, ChevronDown, Bell, RefreshCcw, Circle, LayoutGrid, Menu, MoonStar, Search, X, Trash } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Content = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { 
        id: 1, 
        text: "Buy Groceries", 
        completed: false, 
        priority: "medium", 
        isStarred: false, 
        description: "", 
        dueDate: null,
        steps: [],
        reminder: null,
        repeat: null,
        notes: "",
        createdAt: new Date().toISOString()
      }
    ];
  });
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [newStep, setNewStep] = useState('');
  const [showAddStep, setShowAddStep] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const getTaskStats = () => {
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.filter(task => !task.completed).length;
    return [
      { name: 'Completed', value: completed },
      { name: 'Pending', value: pending }
    ];
  };

  const COLORS = ['#152F15', '#3F9143'];

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority: priority,
      isStarred: false,
      description: "",
      dueDate: null,
      steps: [],
      reminder: null,
      repeat: null,
      notes: "",
      createdAt: new Date().toISOString()
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleStar = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, isStarred: !task.isStarred } : task
    ));
  };

  const updateTaskDetails = (taskId, updates) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
    setSelectedTask(prev => prev ? { ...prev, ...updates } : null);
  };

  const addStep = (taskId, stepText) => {
    if (!stepText.trim()) return;
    
    const newStepObj = {
      id: Date.now(),
      text: stepText,
      completed: false
    };

    updateTaskDetails(taskId, {
      steps: [...(selectedTask.steps || []), newStepObj]
    });
    setNewStep('');
    setShowAddStep(false);
  };

  const toggleStepComplete = (taskId, stepId) => {
    const updatedSteps = selectedTask.steps.map(step =>
      step.id === stepId ? { ...step, completed: !step.completed } : step
    );
    updateTaskDetails(taskId, { steps: updatedSteps });
  };

  const deleteStep = (taskId, stepId) => {
    const updatedSteps = selectedTask.steps.filter(step => step.id !== stepId);
    updateTaskDetails(taskId, { steps: updatedSteps });
  };

  const setTaskReminder = (taskId, date) => {
    updateTaskDetails(taskId, { reminder: date });
  };

  const setTaskDueDate = (taskId, date) => {
    updateTaskDetails(taskId, { dueDate: date });
  };

  const setTaskRepeat = (taskId, repeatPattern) => {
    updateTaskDetails(taskId, { repeat: repeatPattern });
  };

  const updateNotes = (taskId, notes) => {
    updateTaskDetails(taskId, { notes: notes });
  };

  // Task Details Sidebar Component
  const TaskDetailsSidebar = ({ task, onClose }) => {
    if (!task) return null;

    const formatDate = (date) => {
      if (!date) return '';
      return new Date(date).toLocaleDateString();
    };

    return (
      <div className="bg-[#EFF6EF] w-full h-full p-6 border-[#D9DFDA] lg:block">
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col gap-5 p-5'>
            <div className='border-t border-b border-[#D9DFDA] py-8 flex gap-5 font-semilight tracking-wide items-center'>
              <input 
                type="checkbox" 
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className='h-5 w-5'
              />
              <label>{task.text}</label>
            </div>

            <div>
              {task.steps?.map(step => (
                <div key={step.id} className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={step.completed}
                    onChange={() => toggleStepComplete(task.id, step.id)}
                    className="h-4 w-4"
                  />
                  <span className={step.completed ? 'line-through' : ''}>{step.text}</span>
                  <button onClick={() => deleteStep(task.id, step.id)} className="ml-auto">×</button>
                </div>
              ))}
            </div>

            {showAddStep ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newStep}
                  onChange={(e) => setNewStep(e.target.value)}
                  placeholder="New step"
                  className="flex-1 p-1 border rounded"
                />
                <button onClick={() => addStep(task.id, newStep)} className="px-2 py-1 bg-green-100 rounded">Add</button>
                <button onClick={() => setShowAddStep(false)} className="px-2 py-1">Cancel</button>
              </div>
            ) : (
              <div className='flex border-b border-[#D9DFDA] gap-5 pb-5 pt-1 items-center cursor-pointer' onClick={() => setShowAddStep(true)}>
                <Plus />
                <p>Add Step</p>
              </div>
            )}

            <div className='flex border-b border-[#D9DFDA] pb-5 pt-1 gap-5 py-3'>
              <Bell/>
              <input
                type="time"
                value={task.reminder || ''}
                onChange={(e) => setTaskReminder(task.id, e.target.value)}
                className="bg-transparent"
              />
            </div>

            <div className='flex border-b border-[#D9DFDA] pb-5 pt-1 gap-5 py-3'>
              <Calendar />
              <input
                type="date"
                value={task.dueDate || ''}
                onChange={(e) => setTaskDueDate(task.id, e.target.value)}
                className="bg-transparent"
              />
            </div>

            <div className='flex border-b border-[#D9DFDA] pb-5 pt-1 gap-5 py-3'>
              <RefreshCcw/>
              <select
                value={task.repeat || ''}
                onChange={(e) => setTaskRepeat(task.id, e.target.value)}
                className="bg-transparent"
              >
                <option value="">No repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <textarea
                value={task.notes || ''}
                onChange={(e) => updateNotes(task.id, e.target.value)}
                className="w-full p-2 rounded bg-transparent flex gap-2 px-10 text-gray-500"
                rows="3"
                placeholder="Add Notes"
              />
            </div>
          </div>

          <div className='flex border-t border-[#D9DFDA] justify-between p-5 pb-5 pt-8 items-center'>
            <X size={20} className="cursor-pointer" onClick={onClose}/>
            <p className='text-gray-400 text-sm font-light'>
              Created {formatDate(task.createdAt)}
            </p>
            <Trash 
              size={20} 
              className="cursor-pointer"
              onClick={() => handleDeleteTask(task.id)}
            />
          </div>
        </div>
      </div>
    );
  };

  const TaskCard = ({ task }) => (
    <div 
      className="bg-white p-6 rounded-lg shadow border border-gray-100 flex flex-col justify-between cursor-pointer"
      onClick={() => setSelectedTask(task)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => {
              e.stopPropagation();
              toggleComplete(task.id);
            }}
            className="h-4 w-4"
          />
          <span className={`${
            task.priority === 'high' ? 'text-red-600' :
            task.priority === 'medium' ? 'text-gray-700' :
            'text-green-600'
          }`}>
            {task.text}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteTask(task.id);
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Priority: {task.priority}</span>
        <Star
          onClick={(e) => {
            e.stopPropagation();
            toggleStar(task.id);
          }}
          className={`cursor-pointer ${task.isStarred ? "fill-yellow-400" : ""}`}
          size={18}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className='flex justify-between w-full items-center p-4 lg:pr-16 lg:pl-16'>
        <div className='flex gap-7 items-center'>
          <Menu className="cursor-pointer lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          <div className='flex gap-1 text-2xl items-center text-[#3f9143] font-semibold'>
            <Circle size={30} />
            <p>DoIt</p>
          </div>
        </div>
        <div className='flex gap-7 items-center'>
          <Search className="hidden lg:block" />
          <LayoutGrid 
            className="cursor-pointer hidden lg:block" 
            onClick={() => setIsGridView(!isGridView)}
          />
          <MoonStar className="hidden lg:block" />
          <button
            onClick={handleLogout}
            className="text-[#498b4c] hover:text-[#357937]"
            >
            Logout
            </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 lg:mt-16 ${selectedTask?"gap-.5":"gap-8"} lg:pl-16 lg:-translate-y-10`}>
        {/* Left Sidebar */}
        <div className={`lg:col-span-3 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'} bg-[#EFF6EF] p-4 lg:px-7 translate-y-16`}>
          <div className="flex flex-col gap-6 -translate-y-24">
            {/* Profile Section */}
            <div className="flex flex-col items-center justify-center gap-3 py-6">
              <div className="rounded-full bg-green-300 h-10 w-10 p-16"></div>
              <p className="flex">Hey, ABCD</p>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white flex flex-col justify-start gap-5 p-10 pt-7 pb-7 px-20">
              <p className="flex gap-5 -translate-x-16 items-center tracking-wider">
                <NotebookText size={25} />All Tasks
              </p>
              <p className="flex gap-5 -translate-x-16 items-center tracking-wider">
                <Calendar size={25} />Today
              </p>
              <p className="flex gap-5 -translate-x-16 items-center tracking-wider">
                <Star size={25} />Important
              </p>
              <p className="flex gap-5 -translate-x-16 items-center tracking-wider">
                <Map size={25} />Planned
              </p>
              <p className="flex gap-5 -translate-x-16 items-center tracking-wider">
                <Handshake size={25} />Assigned to me
              </p>
            </div>

            {/* Add List Button */}
            <div className="mt-2">
              <div className="flex gap-3 bg-white py-7 px-5 items-center">
                <Plus size={35} />
                <p>Add List</p>
              </div>
            </div>

            {/* Task Statistics with Donut Chart */}
            <div className="bg-white p-5 px-0 mt-2">
              <div className="flex gap-1 justify-between pb-7 mb-4 border-b border-gray-200 items-center px-5">
                <p>Task Overview</p>
                <Info size={17}/>
              </div>
              <div className="flex flex-col items-center">
                <PieChart width={150} height={150}>
                  <Pie
                    data={getTaskStats()}
                    cx={75}
                    cy={75}
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {getTaskStats().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="flex gap-4 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#357937] rounded-full"></div>
                    <span className="text-sm">Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#CEE0CF] rounded-full"></div>
                    <span className="text-sm">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className={`${selectedTask ? 'lg:col-span-6' : 'lg:col-span-9'} p-4 lg:-translate-y-6 ${!selectedTask ? 'lg:pr-16' : ''}`}>
          <div>
            {/* Task Header */}
            <div className="border-b flex text-xs items-center gap-2 text-gray-400 font-semibold pb-2 tracking-wider">
              <p>To Do</p>
              <ChevronDown size={16} className="fill-gray-100" />
            </div>

            {/* Add Task Form */}
            <div className="flex flex-col mt-5 gap-4 p-4 lg:p-10 lg:pl-6 pb-5 border-b border-gray-100 bg-gradient-to-b from-[#F7FDF8] to-[#E6F0E7]">
              <form onSubmit={handleAddTask} className="w-full">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add A Task"
                  className="w-full bg-transparent text-gray-500 outline-none"
                />
                <div className="flex flex-col lg:flex-row justify-between pt-10 items-center gap-4 lg:gap-0">
                  <div className="flex gap-7 items-center flex-wrap justify-center lg:justify-start">
                    <Bell />
                    <RefreshCcw />
                    <Calendar />
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="bg-transparent border border-[#D9DFDA] rounded px-2 py-1 text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#CEE0CF] text-[#357937] p-2 px-3 font-medium rounded-lg"
                  >
                    ADD TASK
                  </button>
                </div>
              </form>
            </div>

            {/* Active Tasks */}
            {isGridView ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
                {tasks
                  .filter(task => !task.completed)
                  .map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
              </div>
            ) : (
              <div className="space-y-2">
                {tasks
                  .filter(task => !task.completed)
                  .map(task => (
                    <div 
                      key={task.id} 
                      className="flex justify-between p-4 lg:p-5 lg:py-8 border-b font-semilight tracking-wide cursor-pointer items-center"
                      onClick={() => setSelectedTask(task)}
                    >
                      <div className="flex gap-5 items-center">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleComplete(task.id);
                          }}
                          className="p-5 h-5 w-5"
                        />
                        <label className={`flex items-center gap-2 ${
                          task.priority === 'high' ? 'text-red-600' :
                          task.priority === 'medium' ? 'text-gray-700' :
                          'text-green-600'
                        }`}>
                          {task.text}
                        </label>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTask(task.id);
                          }}
                          className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                          ×
                        </button>
                      </div>
                      <Star
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(task.id);
                        }}
                        className={`cursor-pointer ${task.isStarred ? "fill-black" : ""}`}
                      />
                    </div>
                  ))}
              </div>
            )}

            {/* Completed Tasks */}
            <div>
              <p className="pb-7 pt-7 pl-5 font-light text-sm tracking-widest">
                Completed
              </p>
              <div className="space-y-2">
                {tasks
                  .filter(task => task.completed)
                  .map(task => (
                    <div 
                      key={task.id} 
                      className="flex justify-between p-4 lg:p-5 border-b font-semilight tracking-wide cursor-pointer items-center"
                      onClick={() => setSelectedTask(task)}
                    >
                      <div className="flex gap-5 items-center">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleComplete(task.id);
                          }}
                          className="p-5 h-5 w-5"
                        />
                        <label className="line-through text-gray-400">{task.text}</label>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTask(task.id);
                          }}
                          className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                          ×
                        </button>
                      </div>
                      <Star
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(task.id);
                        }}
                        className={`cursor-pointer ${task.isStarred ? "fill-yellow-400" : ""}`}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Task Details */}
        {selectedTask && (
          <div className="lg:col-span-3 lg:-translate-y-6 fixed inset-0 lg:relative lg:inset-auto bg-white lg:bg-transparent z-50">
            <TaskDetailsSidebar
              task={selectedTask}
              onClose={() => setSelectedTask(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;