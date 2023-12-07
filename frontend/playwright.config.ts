import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    globalSetup: require.resolve('./specs/setup.ts'),
    timeout: 5 * 60 * 1000,
    forbidOnly: !!process.env.CI,
    use: {
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
    },
    workers: process.env.CI ? 10 : undefined,
    maxFailures: process.env.CI ? 3 : undefined,
}

export default config;
