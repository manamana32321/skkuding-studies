const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'week1.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Internal Server Error\n');
      return;
    }

    const memAsMB = `${(os.totalmem() / (1024 * 1024)).toFixed(2)}MB`
    const context = {
      type: os.type(),
      hostname: os.hostname(),
      cpu_num: os.cpus().length,
      total_mem: memAsMB
    };

    data = render(data, context)

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
  });
});

runserver()


function runserver(port=3000) {
  try {
    server.listen(port, '127.0.0.1', () => {
      console.log(`서버가 http://127.0.0.1:${port}/ 에서 실행 중입니다.`);
    });
  } catch (e) {
    if (e.code === 'EADDRINUSE') {
      runserver(port + 1)
    }
    throw e
  }
}

function render(data, context) {
  Object.entries(context).map(([_key, value]) => {
    const key = `{{${_key}}}`
    if (data.includes(key)) {
      console.log(`replace ${key} with ${value}`)
      data = data.replace(key, value)
    } else {
      console.warn(`${key} is not found and skipped`)
    }
  })
  return data
}