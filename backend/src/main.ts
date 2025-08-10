import "reflect-metadata";
import server from "./framework/http/server"

(async () => {
    try {
        await server.start();
    } catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
})();

