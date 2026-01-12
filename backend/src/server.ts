import express from 'express';
import cors from 'cors';
import { ProductController } from './interfaces/http/controllers/ProductController';
import { SalesController } from './interfaces/http/controllers/SalesController';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'backend', timestamp: new Date().toISOString() });
});

// Productos
app.get('/products', ProductController.list);
app.post('/products', ProductController.create);
app.post('/products/:id/increase', ProductController.increaseStock);
app.post('/products/:id/decrease', ProductController.decreaseStock);

// Ventas
app.get('/sales', SalesController.list);
app.post('/sales', SalesController.create);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
