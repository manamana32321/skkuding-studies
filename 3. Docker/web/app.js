const express = require('express');
const os = require('os');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });
  res.json(user);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user && await bcrypt.compare(password, user.password)) {
    res.json(user);
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

app.get("/os", (req, res) => {
  res.send(JSON.stringify({
    type: os.type(),
    hostname: os.hostname(),
    cpu_num: os.cpus().length,
    total_mem: `${(os.totalmem() / (1024 * 1024)).toFixed(0)}MB`
  }))
})

// 404 에러 처리 미들웨어
app.use((req, res, next) => {
  res.status(404).json({ error: 'Sorry, we could not find that!' });
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});