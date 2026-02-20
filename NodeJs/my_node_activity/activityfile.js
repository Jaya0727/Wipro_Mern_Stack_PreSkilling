const http=require("http");
const fs=require("fs");
const path=require("path");
const server=http.createServer((req,res) => {
  if (req.url==="/login") {
    const employeeName="Jaya";
    const salary=45000;
    const dateTime=new Date().toLocaleString();
    const logDir=path.join(__dirname,"logs");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
    const logFilePath=path.join(logDir,"login.log");
    const logData=`Employee:${employeeName}, Salary:${salary}, Login Time:${dateTime}\n`;
    fs.appendFile(logFilePath,logData,(err) => {
      if (err) {
        res.end("Error creating log file");
        return;
      }
      res.end("Login successful.Log file created.");
    });
  } else {
    res.end("Use /login to login");
  }
});
server.listen(4000,() => {
  console.log("Server running at http://localhost:4000");
});
