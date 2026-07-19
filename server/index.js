import express from 'express';
// Force restart
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://code-reviewer-f9pag9bho-freeza-dbzs-projects.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});