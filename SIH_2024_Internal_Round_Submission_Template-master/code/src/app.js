import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);
console.log(__filename);


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "100kb"}))
app.use(urlencoded({extended: true, limit: "100kb"}))

app.use(express.static(path.join(__dirname, 'dist')));
// app.use((req,res,next)=>res.sendFile(path.join(__dirname,'dist','index.html')))


app.use(cookieParser())


import userRouter from "./routes/user.routes.js"
import sheetRouter from "./routes/sheet.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/sheets", sheetRouter)
app.get('*', (req, res) => {
  // Check if the request path starts with '/api' to skip sending React index.html
  if (!req.originalUrl.startsWith('/api')) {
    res.sendFile(path.join(__dirname,'dist','index.html'))
  }
})
export {app}