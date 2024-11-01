import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';

const app = express();

const port = process.env.Port || 3000;
app.use(bodyParser.json());

app.get('/', (_req, res) => {
    res.send('Cribl Project!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.post('/ingest', (req: Request, res: Response) => {
    const data = req.body;

    console.log('Received data: ', data);

    res.status(200).json({ message: 'Data processed successfully!' });
})