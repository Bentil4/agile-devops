let requestCount = 0;
let errorCount = 0;
const startTime = Date.now();

const healthCheck = (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  const healthStatus = {
    status: 'healthy',
    uptime: `${uptime} seconds`,
    timestamp: new Date().toISOString(),
    service: 'Todo API',
    version: '1.0.0'
  };
  
  requestCount++;
  res.json(healthStatus);
};

const metrics = (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  const metricsData = {
    totalRequests: requestCount,
    errorCount: errorCount,
    uptime: `${uptime} seconds`,
    memoryUsage: process.memoryUsage(),
    timestamp: new Date().toISOString()
  };
  
  requestCount++;
  res.json(metricsData);
};

const incrementErrorCount = () => {
  errorCount++;
};

module.exports = {
  healthCheck,
  metrics,
  incrementErrorCount
};
