import express from 'express';
import { ollamaRoutesManager } from './routes/ollama.routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/llama3.1',ollamaRoutesManager('llama3.1'))
app.use('/api/gemma2',ollamaRoutesManager('gemma2'))
app.use('/api/llama2',ollamaRoutesManager('llama2'))

app.get('/',(req,res)=>{
    res.send("Microservicio Ollama Online")
})
export default app;