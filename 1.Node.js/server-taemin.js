const http = require("http"); //사용자의 요청에 응답을 해줄 수 있게 만들어 줌
const os = require("os");

const htmlTemplate = `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OS Information</title>
    <style>
      body {
        height: 100%;
        font-family: 'Inter', 'Noto Sans KR', system-ui, -apple-system,
          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
          'Open Sans', 'Helvetica Neue', sans-serif;
      }
      .wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .title {
        font-size: 2.5rem;
        background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .sub-title {
        font-size: 1.25rem;
      }
      .card {
        border-radius: 16px;
        padding: 1rem 2rem;
        background-color: #eee;
      }
    </style>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="wrapper">
      <h1 class="title">About OS</h1>
      <section class="card">
        <p>
          <h2 class="sub-title">OS Type</h2>
          {{type}}
        </p>
        <p>
          <h2 class="sub-title">Name</h2>
          {{hostname}}
        </p>
        <p>
          <h2 class="sub-title">CPU Number</h2>
          {{cpu_num}} Core
        </p>
        <p>
          <h2 class="sub-title">Total Memory</h2>
          {{total_mem}}
        </p>
      </section>
    </div>
  </body>
</html>
`;

const newosType = os.type();
const hostname = os.hostname();
const cpu_num = os.cpus().length;
const total_mem = os.totalmem()/(1024**3) + 'GB';

let html = htmlTemplate.replace("{{type}}", newosType)
                        .replace("{{hostname}}", hostname)
                        .replace("{{cpu_num}}", cpu_num)
                        .replace("{{total_mem}}", total_mem);
//웹서버를 생성함
const server = http.createServer(function(request,response){
    response. writeHead(200, {"Content-Type": "text/html"});
    response.end(html);
});                        
//웹 서버를 3000번 포트로 실행함
server.listen(3000, function(){
    console.log("3000번 포트로 서버가 실행되었음");
});

server.on("request", function(code){
    console.log("클라이언트가 요청중입니다.....");
});

setTimeout(() => {
    server.close(()=>{
        console.log("서버가 정상적으로 종료되었음.");
        process.exit(0);
    });
},10000);

server.on("close", function(code){
    console.log("서버가 종료되었습니다.....");
});