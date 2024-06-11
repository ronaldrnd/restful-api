import express from 'express';
import config from 'config';
import connect from './utils/connect';
import log from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';
import cors from 'cors';

const port = config.get<number>('port')

const app = express();

// CORS options
const corsOptions = {
    origin: '*', // Update with your client's URL
  };

app.use(cors(corsOptions))

app.use(express.json());

app.use(deserializeUser)


app.listen(port, async () => {
    log.info(`app listening on 1337 http://127.0.0.1:${port}`);

    await connect();
    
})

routes(app)
