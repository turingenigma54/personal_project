import { de } from '@faker-js/faker';
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: './tests',
    timeout: 30000,
    reporter: [['html', { outputFolder: 'playwright-report' }]],
    use : {
        baseURL: 'http://app:3000/'
    },
};

export default config;