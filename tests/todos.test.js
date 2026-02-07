const request = require('supertest');
const app = require('../src/app');
const { resetTodos } = require('../src/controllers/todoController');

describe('Todo API Endpoints', () => {
  beforeEach(() => {
    resetTodos();
  });

  describe('GET /api/todos', () => {
    test('should return all todos', async () => {
      const response = await request(app).get('/api/todos');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(3);
    });

    test('should filter todos by completed status', async () => {
      const response = await request(app).get('/api/todos?completed=true');
      
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data.every(todo => todo.completed)).toBe(true);
    });

    test('should filter todos by priority', async () => {
      const response = await request(app).get('/api/todos?priority=high');
      
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data.every(todo => todo.priority === 'high')).toBe(true);
    });
  });

  describe('GET /api/todos/:id', () => {
    test('should return a specific todo', async () => {
      const response = await request(app).get('/api/todos/1');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', 1);
      expect(response.body.data).toHaveProperty('title');
    });

    test('should return 404 for non-existent todo', async () => {
      const response = await request(app).get('/api/todos/999');
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Todo not found');
    });
  });

  describe('POST /api/todos', () => {
    test('should create a new todo', async () => {
      const newTodo = {
        title: 'New test todo',
        priority: 'low'
      };
      
      const response = await request(app)
        .post('/api/todos')
        .send(newTodo);
      
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.title).toBe('New test todo');
      expect(response.body.data.completed).toBe(false);
      expect(response.body.data.priority).toBe('low');
    });

    test('should return 400 if title is missing', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({});
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Title is required');
    });

    test('should use default priority if not provided', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ title: 'Test todo' });
      
      expect(response.status).toBe(201);
      expect(response.body.data.priority).toBe('medium');
    });
  });

  describe('PUT /api/todos/:id', () => {
    test('should update a todo', async () => {
      const updates = {
        title: 'Updated title',
        completed: true,
        priority: 'high'
      };
      
      const response = await request(app)
        .put('/api/todos/1')
        .send(updates);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Updated title');
      expect(response.body.data.completed).toBe(true);
      expect(response.body.data.priority).toBe('high');
    });

    test('should partially update a todo', async () => {
      const response = await request(app)
        .put('/api/todos/1')
        .send({ completed: true });
      
      expect(response.status).toBe(200);
      expect(response.body.data.completed).toBe(true);
    });

    test('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .put('/api/todos/999')
        .send({ completed: true });
      
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Todo not found');
    });
  });

  describe('DELETE /api/todos/:id', () => {
    test('should delete a todo', async () => {
      const response = await request(app).delete('/api/todos/1');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', 1);
    });

    test('should return 404 for non-existent todo', async () => {
      const response = await request(app).delete('/api/todos/999');
      
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Todo not found');
    });

    test('todo should not exist after deletion', async () => {
      await request(app).delete('/api/todos/1');
      const response = await request(app).get('/api/todos/1');
      
      expect(response.status).toBe(404);
    });
  });
});
