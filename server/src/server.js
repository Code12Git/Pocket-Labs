const express = require('express');
const { fromEnv } = require('./utils');
const logger  = require('./utils/logger');
const routes = require('./routes');
const cors = require('cors');
const connectDB = require('./db')
const app = express();
const PORT = fromEnv('PORT') || 3001;

const allowedOrigins = [
  'https://pocket-labs.vercel.app/',
  'https://pocket-labs-etry.vercel.app/',
  /\.vercel\.app$/, 
  /\.now\.sh$/,    
  'http://localhost:5173', 
  
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
     if (!origin) return callback(null, true);
    
     if (allowedOrigins.some(pattern => {
      if (typeof pattern === 'string') {
        return origin === pattern;
      } else if (pattern instanceof RegExp) {
        return pattern.test(origin);
      }
      return false;
    })) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
};


connectDB()
app.use(cors(corsOptions));
app.use(express.json()); 
app.use('/api', routes);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'Pocket Rocket Labs'
  });
});

app.listen(PORT, () => {
  logger.info(`🚀 Server running at http://localhost:${PORT}`);
});

module.exports = app;