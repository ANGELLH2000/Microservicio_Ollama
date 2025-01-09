import 'dotenv/config';
import app from './app.js';

const PORT = process.env.ENVPORT || 4000;
app.listen(PORT,()=>{
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
})