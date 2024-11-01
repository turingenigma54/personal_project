import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        {duration: '30s', target: 50},
        {duration:'1m', target: 50},
        {duration: '30s', target: 0}
    ],
};

export default function () {
    const url = 'http://app:3000/ingest';
    const payload = JSON.stringify({
        timestampt: new Date().toISOString(),
        level: 'INFO',
        message: 'Load test message',
        meta: {
            userId: 'load-test-user',
            ipAddress: '127.0.0.1',
        },
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.post(url, payload, params);

    check(res, {
        'status was 200': (r) => r.status === 200,
    });

    sleep(1);
}