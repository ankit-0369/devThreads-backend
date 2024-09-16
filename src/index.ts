
import 'dotenv/config'
import connectionDB from './db';
import app from './app';


app.get('/', (req, res)=>{
    res.send("Welcome to the new project");
})

const PORT= process.env.PORT || 3000;

connectionDB()
.then(()=>{
    app.listen(PORT, () => {
        console.log("Server is listening at port: ", PORT)
    })
    app.on('error', (error) => {
        console.log("Error while listening in the app :: ", error);
    })
}).catch((err)=>{
    console.log("error while DB connection :: ", err);
    
})





// app.listen(process.env.PORT || 3000, ()=>{
//     console.log("server started at", PORT);
// })