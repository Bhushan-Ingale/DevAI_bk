'use client';

import { useState } from 'react';
import { Plus, MoreVertical, Clock, User, MessageSquare } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
  comments: number;
}

export default function Kanban() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design authentication flow',
      description: 'Create login and signup pages with validation',
      status: 'todo',
      priority: 'high',
      assignee: 'Alice',
      dueDate: '2024-03-20',
      comments: 3
    },
    {
      id: '2',
      title: 'Implement API endpoints',
      description: 'Create REST endpoints for user management',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Bob',
      dueDate: '2024-03-22',
      comments: 5
    },
    {
      id: '3',
      title: 'Code review for PR #42',
      description: 'Review authentication middleware',
      status: 'review',
      priority: 'medium',
      assignee: 'Charlie',
      dueDate: '2024-03-18',
      comments: 2
    },
    {
      id: '4',
      title: 'Update documentation',
      description: 'Add setup instructions to README',
      status: 'done',
      priority: 'low',
      assignee: 'Alice',
      dueDate: '2024-03-15',
      comments: 1
    }
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' as const });

  const columns = [
    { id: 'todo', title: 'To Do', color: '#ffde22' },
    { id: 'in-progress', title: 'In Progress', color: '#ff8928' },
    { id: 'review', title: 'Review', color: '#ff414e' },
    { id: 'done', title: 'Done', color: '#10b981' }
  ];

  const addTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: 'todo',
      priority: newTask.priority,
      comments: 0
    };
    
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', priority: 'medium' });
    setShowAddTask(false);
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return '#ff414e';
      case 'medium': return '#ff8928';
      default: return '#ffde22';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#ffffff' }}>Team Kanban</h2>
        <button
          onClick={() => setShowAddTask(true)}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #ffde22, #ff8928)',
            color: '#000',
            border: 'none',
            borderRadius: '0.75rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        {columns.map(column => (
          <div key={column.id} style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,222,34,0.1)',
            borderRadius: '1rem',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ color: column.color, margin: 0 }}>{column.title}</h3>
              <span style={{
                padding: '0.25rem 0.75rem',
                background: `${column.color}20`,
                color: column.color,
                borderRadius: '1rem',
                fontSize: '0.875rem'
              }}>
                {tasks.filter(t => t.status === column.id).length}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {tasks
                .filter(task => task.status === column.id)
                .map(task => (
                  <div
                    key={task.id}
                    style={{
                      padding: '1rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,222,34,0.1)',
                      borderRadius: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{
                        padding: '0.125rem 0.5rem',
                        background: `${getPriorityColor(task.priority)}20`,
                        color: getPriorityColor(task.priority),
                        borderRadius: '1rem',
                        fontSize: '0.75rem'
                      }}>
                        {task.priority}
                      </span>
                      <MoreVertical size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
                    </div>
                    
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: '0 0 0.25rem 0', color: '#ffffff' }}>{task.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', margin: '0 0 1rem 0' }}>
                      {task.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {task.assignee && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <User size={12} style={{ color: 'rgba(255,255,255,0.4)' }} />
                            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>{task.assignee}</span>
                          </div>
                        )}
                        {task.dueDate && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Clock size={12} style={{ color: 'rgba(255,255,255,0.4)' }} />
                            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                              {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MessageSquare size={12} style={{ color: 'rgba(255,255,255,0.4)' }} />
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>{task.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <>
          <div
            onClick={() => setShowAddTask(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              zIndex: 100
            }}
          />
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '500px',
            background: '#0a0a0a',
            border: '1px solid rgba(255,222,34,0.2)',
            borderRadius: '1rem',
            padding: '2rem',
            zIndex: 101
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#ffffff' }}>Create New Task</h3>
            
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginBottom: '1rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,222,34,0.2)',
                borderRadius: '0.75rem',
                color: '#fff'
              }}
            />
            
            <textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginBottom: '1rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,222,34,0.2)',
                borderRadius: '0.75rem',
                color: '#fff',
                resize: 'vertical'
              }}
            />
            
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginBottom: '1.5rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,222,34,0.2)',
                borderRadius: '0.75rem',
                color: '#fff'
              }}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={addTask}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #ffde22, #ff8928)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Create Task
              </button>
              <button
                onClick={() => setShowAddTask(false)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'transparent',
                  border: '1px solid rgba(255,222,34,0.3)',
                  color: '#fff',
                  borderRadius: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}