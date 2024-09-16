
import mongoose from 'mongoose'
import { DB_NAME } from '../constant'


const connectionDB= async () => {
    
    const connection= await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`)
    console.log(DB_NAME)
    console.log(`\n connection db port:  ${connection.connection.port}`)
    console.log(`\n host:  ${connection.connection.host}`)
    // console.log(connection);

    try {
        
    } catch (error) {
        console.log("Error while Connection with Mongo DB :: ", error)
        process.exit(1)
    }

}

export default connectionDB;