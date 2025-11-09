const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const apiRoutes = require('./Routers/routes');

app.use(express.json());
app.use(cors());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  
});

process.on('uncaughtException', (err) => {
    
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    
    process.exit(1);
});
