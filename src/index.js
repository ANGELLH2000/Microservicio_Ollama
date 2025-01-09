import 'dotenv/config';
import app from './app.js';

const PORT = process.env.ENVPORT || 3000;
app.listen(PORT,()=>{
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
})