import { test, expect } from './test'

test('requires login', async ({ page }) => {
    await page.goto('http://localhost:4000/')
    await page.waitForSelector('testId=incorrect-user-panel')
    // TODO test cleanup https://playwright.dev/docs/best-practices#dont-use-manual-assertions
    expect(await page.textContent('testId=incorrect-user-panel')).toContain('Please log in');
    expect(await page.$('testId=login-link')).not.toBeNull()
});
