const env=require("../configs/env")
const logger=require("../configs/logger")
const startServer=async (app)=>{
    const server=app.listen(env.PORT,()=>{
        console.log(`🚀 Server listening on http://localhost:${env.PORT} 🚀`);
    })
    process.on("unhandledRejection", (reason) => {
        throw reason;
    });
    process.on("uncaughtException", (err) => {
        logger.error(err);        
        server.close(() => {
            console.log("Stopped server due to uncaughtException");
            process.exit(1);
        });
    });

    process.on("SIGTERM", () => {
        console.log("SIGTERM signal recieved, Stopping server");
        server.close(() => {
            console.log("Stopped server");
            process.exit(1);
        });
    });

    return `🚀 database sync successfully 🚀`;
}

module.exports=startServer