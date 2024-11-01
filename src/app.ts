import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import client from 'prom-client';

const app = express();

const collectDefaultMetrics = client.collectDefaultMetrics
collectDefaultMetrics();
const port = process.env.PORT || 3000;

const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [50, 100, 200, 300, 400, 500],
});

app.use(bodyParser.json());

app.get('/', (_req, res) => {
    res.send('Cribl Project!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.post('/ingest', (req: Request, res: Response) => {

    const end = httpRequestDurationMicroseconds.startTimer();
    const route = req.route.path;

    const data = req.body;

    console.log('Received data: ', data);

    res.status(200).json({ message: 'Data processed successfully!' });

    end({ method: req.method, route, status_code: res.statusCode });
})

app.get('/metrics', async (_req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

