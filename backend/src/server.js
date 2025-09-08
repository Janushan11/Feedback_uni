import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { getPool } from './services/db.js';
import { ensureDatabaseAndSchema } from './migrations/init.js';

const app = express();

app.use(cors({ origin: (process.env.CORS_ORIGIN || '*').split(','), credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', async (req, res) => {
	try {
		const pool = await getPool();
		await pool.request().query('SELECT 1 as ok');
		res.json({ ok: true });
	} catch (err) {
		res.status(500).json({ ok: false, error: err.message });
	}
});

// Auth routes (placeholders)
app.post('/api/auth/register', async (req, res) => {
	res.status(501).json({ message: 'Not implemented yet' });
});
app.post('/api/auth/login', async (req, res) => {
	res.status(501).json({ message: 'Not implemented yet' });
});

// Feedback routes (placeholders)
app.post('/api/feedback', async (req, res) => {
	res.status(501).json({ message: 'Not implemented yet' });
});
app.get('/api/feedback/me', async (req, res) => {
	res.status(501).json({ message: 'Not implemented yet' });
});

// Admin routes (placeholders)
app.get('/api/admin/feedback', async (req, res) => {
	res.status(501).json({ message: 'Not implemented yet' });
});
app.patch('/api/admin/feedback/:id', async (req, res) => {
	res.status(501).json({ message: 'Not implemented yet' });
});

// Analytics (placeholders)
app.get('/api/analytics/averages', async (req, res) => {
	res.status(501).json({ message: 'Not implemented yet' });
});
app.get('/api/analytics/trends', async (req, res) => {
	res.status(501).json({ message: 'Not implemented yet' });
});

const port = process.env.PORT || 4000;

(async () => {
	await ensureDatabaseAndSchema();
	app.listen(port, () => {
		console.log(`Server running on http://localhost:${port}`);
	});
})();






