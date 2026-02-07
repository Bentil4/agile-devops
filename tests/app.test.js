const request = require('supertest');
const app = require('../src/app');

describe('API Root Endpoint', () => {
  test('GET / should return API information', async () => {
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('endpoints');
  });
});

describe('Health Check Endpoint', () => {
  test('GET /health should return health status', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'healthy');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('service', 'Todo API');
  });
});

describe('Metrics Endpoint', () => {
  test('GET /metrics should return metrics data', async () => {
    const response = await request(app).get('/metrics');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('totalRequests');
    expect(response.body).toHaveProperty('errorCount');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('memoryUsage');
  });
});
