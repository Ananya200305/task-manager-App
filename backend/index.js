let express = require("express")
const app = express();
require("dotenv").config();
require("./models/db")
const PORT = process.env.PORT || 3000
const taskRouter = require('./routes/taskRouter');
const bodyParser = require("body-parser");
const cors = require("cors");

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use(cors())
app.use(bodyParser.json())
app.use('/tasks', taskRouter)


app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})

