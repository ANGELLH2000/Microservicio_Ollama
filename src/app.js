import express from 'express';
import { ollamaRoutesManager } from './routes/ollama.routes.js';
import { authApiKey } from './middleware/authApiKey.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de API Key: protege TODAS las rutas que se definan a continuación
app.use(authApiKey);

app.use('/api/llama3.1',ollamaRoutesManager('llama3.1'))
app.use('/api/gemma2',ollamaRoutesManager('gemma2'))
app.use('/api/llama2',ollamaRoutesManager('llama2'))

app.get('/',(req,res)=>{
    res.send("Microservicio Ollama Online")
})
export default app;