import dotenv from 'dotenv';
import Api from "./app";

dotenv.config();
const server = new Api();
server.start()