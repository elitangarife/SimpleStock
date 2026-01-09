import express from 'express'
import cors from 'cors'
import { ProductController } from './interfaces/http/controllers/ProductController'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', 
  "service": "backend", "timestamp": new Date().toISOString() })
})

app.get('/products', ProductController.list)
app.post('/products', ProductController.create)

const PORT = process.env.PORT || 3001 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
