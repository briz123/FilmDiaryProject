import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import './db.mjs';
import mongoose from 'mongoose';
import sanitize from 'mongo-sanitize';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(process.env.PORT || 3000);
