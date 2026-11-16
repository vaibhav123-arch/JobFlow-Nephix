import "dotenv/config"
import express from "express";
import jobRoutes from "./routes/job.routes.js";
import connectDB from "./config/database.js";

const app = express();
app.use(express.json());

const PORT = 5000 ;

app.get('/',(req,res)=>{
res.send("Welcome to JobFlow Api!");
});

app.get('/api/health',(req,res)=>{
    res.json({status : "OK"});
});


app.use('/api/jobs',jobRoutes);

const startServer = async()=>{
    await connectDB();

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
});
};

startServer();
