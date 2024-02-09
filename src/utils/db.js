import { connect } from "mongoose"

const dbConnection = async () => {
 try {
   await connect(process.env.UPPER_SNAKE_CASE)
   console.log("database connected");
 } catch (error) {
   console.log(error);
 } 
}

export default dbConnection
