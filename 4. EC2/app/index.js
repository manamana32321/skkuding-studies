const express = require("express")
const os = require("os")
const fs = require("fs")
const app = express()
const port = 3000

class FileDB {
  constructor(_filePath = "db.json") {
    this._filePath = _filePath
    this._data = JSON.parse(fs.readFileSync(this._filePath, "utf8"))
  }

  // json 파일의 key, value 변경
  setValue(key, value) {
    this._data[key] = value
    fs.writeFileSync(this._filePath, JSON.stringify(this._data, null, 2), "utf8")
    return value
  }

  // json 파일의 key로 value 읽기
  getValue(key) {
    return JSON.parse(fs.readFileSync(this._filePath, "utf8"))[key]
  }
}

const db = new FileDB()
app.use(express.json());
app.get("/", (req, res) => {
  res.send(fs.readFileSync("index.html", "utf8"))
})

app.post("/api/signup", (req, res) => {
  const body = req.body

  // validate
  if (!body.username || !body.password || !body.email) {
    res.status(400).send({ detail: "Missing credentials" })
  }

  db.setValue("username", body.username)
  db.setValue("password", body.password)
  db.setValue("email", body.email)
  res.status(201).send({
    username: db.getValue("username"),
    email: db.getValue("email")
  })
})

app.post("/api/login", (req, res) => {
  const body = req.body

  // validate
  if (!body.username || !body.password) {
    return res.status(400).send({ detail: "Missing credentials" })
  }

  if (body.username !== db.getValue("username") || body.password !== db.getValue("password")) {
    return res.status(401).send({ detail: "Invalid credentials "})
  }
  res.send({ detail: "Login successful "})
})

app.get("/api/users", (req, res) => {
  const body = req.body
  
  db.setValue("username", body.username)
  db.setValue("password", body.password)
  db.setValue("email", body.email)
  res.send(JSON.stringify({
    username: db.getValue("username"),
    email: db.getValue("email")
  }))
})

app.get("/api/os", (req, res) => {
  res.send({
    type: os.type(),
    hostname: os.hostname(),
    cpu_num: os.cpus().length,
    total_mem: `${(os.totalmem() / (1024 * 1024)).toFixed(0)}MB`
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})