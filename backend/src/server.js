import 'dotenv/config';
import app from './app.js';
import connectDB from './config/database.js';


const port = process.env.PORT || 3000;
connectDB();

app.listen(port, () => {
    console.log(`Server is live at port ${port}`);
});