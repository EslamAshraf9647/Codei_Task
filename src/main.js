import express from "express"
import {config} from "dotenv"
import { database_connection } from "./DB/connection.js"
import routerhandler from "./Utils/router-handler.utils.js"
config()




const bootStrap = async () => {
      const app = express()
      app.use(express.json())
      await database_connection()
      routerhandler(app , express)



      const port = process.env.PORT
      app.listen(port, () => {
          console.log(`Server is running on port ${port}!`);
      })
}


export default bootStrap