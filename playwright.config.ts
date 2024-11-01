import { de } from '@faker-js/faker';
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: './tests',
    timeout: 30000,
    use : {
        baseURL: 'http://localhost:3000/'
    },
};

export default config;