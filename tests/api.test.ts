import {test, expect} from '@playwright/test';

test.describe('API Tests', () => {
    test('GET / should return Cribl Project!', async ({ request }) => {
        const response = await request.get('/');
        expect(response.ok()).toBeTruthy();
        const body = await response.text();
        expect(body).toBe('Cribl Project!');
    });

    test('POST /ingest should process data sucessfully!', async ({ request}) => {
        const data = {
            timestamp: new Date().toISOString(),
            level: 'INFO',
            message: 'Test message',
            meta: {
                userId: '12345',
                ipAddress: '127.0.0.1',
            },
    };

    const response = await request.post('/ingest', { data });
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody).toEqual({ message: 'Data processed successfully!' });
});
});