import axios from 'axios';
import { faker } from '@faker-js/faker'

const generateData = () => {
    return {
        timestamp: new Date().toISOString(),
        level: faker.helpers.arrayElement(['INFO', 'WARN', 'ERROR']),
        message: faker.lorem.sentence(),
        meta: {
            userId: faker.string.uuid(),
            ipAddress: faker.internet.ip()
        },
    };
};

const sendData = async () => {
    try {
        const data = generateData();
        const response = await axios.post('http://localhost:3000/ingest', data);
        console.log('Data sent: ', data);
        console.log('Response: ', response.data);
    } catch (error) {
        console.error('Error sending data: ', error);
    }
};

setInterval(sendData, 1000);
