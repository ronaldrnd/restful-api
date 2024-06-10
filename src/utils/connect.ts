import mongoose from "mongoose";
import config from "config";
import log from "./logger";

async function connect() {
    const dbUri = config.get<string>("dbUri");

    try {
       await mongoose.connect(dbUri)
        log.info('Connected to database');
    } catch (error) {
        console.error('Failed to connect to database ' + error);
        process.exit(1)  
    }
}

export default connect;