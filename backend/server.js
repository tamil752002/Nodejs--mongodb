const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes');
const fileUploadRoutes = require('./Routes/fileUploadRoutes');

const app = express();
app.use(cors()); 

const PORT = process.env.PORT || 7000;
app.use(express.json()); 

connectDb();

app.use('/api', authRoutes);
app.use('/api/file',fileUploadRoutes)


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
