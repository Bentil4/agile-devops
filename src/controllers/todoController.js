// In-memory data store
let todos = [
  { id: 1, title: 'Implement CI/CD pipeline', completed: true, priority: 'high' },
  { id: 2, title: 'Add automated tests', completed: true, priority: 'high' },
  { id: 3, title: 'Set up monitoring', completed: false, priority: 'medium' }
];

let nextId = 4;

const getAllTodos = (req, res) => {
  const { completed, priority } = req.query;
  let filteredTodos = [...todos];

  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    filteredTodos = filteredTodos.filter(todo => todo.completed === isCompleted);
  }

  if (priority) {
    filteredTodos = filteredTodos.filter(todo => todo.priority === priority);
  }

  res.json({ success: true, count: filteredTodos.length, data: filteredTodos });
};

const getTodoById = (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ success: false, error: 'Todo not found' });
  }

  res.json({ success: true, data: todo });
};

const createTodo = (req, res) => {
  const { title, priority = 'medium' } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ success: false, error: 'Title is required' });
  }

  const newTodo = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    priority
  };

  todos.push(newTodo);
  res.status(201).json({ success: true, data: newTodo });
};

const updateTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ success: false, error: 'Todo not found' });
  }

  const { title, completed, priority } = req.body;
  const updatedTodo = {
    ...todos[todoIndex],
    ...(title !== undefined && { title: title.trim() }),
    ...(completed !== undefined && { completed }),
    ...(priority !== undefined && { priority })
  };

  todos[todoIndex] = updatedTodo;
  res.json({ success: true, data: updatedTodo });
};

const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ success: false, error: 'Todo not found' });
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];
  res.json({ success: true, data: deletedTodo });
};

// For testing purposes
const resetTodos = () => {
  todos = [
    { id: 1, title: 'Implement CI/CD pipeline', completed: true, priority: 'high' },
    { id: 2, title: 'Add automated tests', completed: true, priority: 'high' },
    { id: 3, title: 'Set up monitoring', completed: false, priority: 'medium' }
  ];
  nextId = 4;
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  resetTodos
};
