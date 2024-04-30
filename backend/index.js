import express from 'express';
import dotenv from 'dotenv';
import "./src/database/database.js";
import cors from 'cors';
// import routes
import authRoutes from './src/routes/authRoutes.js';
import listRoutes from './src/routes/listRoutes.js';
import shoppingListRoutes from './src/routes/shoppingListRoutes.js';


const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
));

// routes
app.use("/auth", authRoutes)
app.use("/lists", listRoutes)
app.use("/shopping-list", shoppingListRoutes)


// port listening
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
