import { test, expect, Locator } from '@playwright/test';
import { chromium } from 'playwright-core';
import { LoginPage } from '../pages/practiceLoginPage';
import testData from '../testdata/testdata.json';

test.describe('Automation for login', async() =>{

    let page, browser, context;

    test.describe.configure({mode: 'serial'});

    test('Login Page Automation', async({}) =>{

        await test.step('Create Browser', async() => {
            browser = await chromium.launch();
            context = await browser.newContext();
            page = await context.newPage();
        });

        await test.step('Go to URL', async() => {
            await page.goto('https://practicetestautomation.com/practice-test-login/');
        });

        await test.step('Login Testcase to automate negative scenarios', async() => {

            let loginPage = new LoginPage(page);

            const locator: Locator = await loginPage.getTestLoginHeading();
            expect(await locator.innerText()).toEqual('Test login');

            // Testcase with invalid username 

            await loginPage.setUsername(testData.InvalidUsername);
            await loginPage.setPassword(testData.ValidPassword);
            await loginPage.clickSubmit();
        
            expect(await page.locator('#error')).toHaveText('Your username is invalid!');

            await page.waitForTimeout(5000);

            // Testcase with invalid password

            await loginPage.setUsername(testData.ValidUsername);
            await loginPage.setPassword(testData.InvalidPassword);
            await loginPage.clickSubmit();
        
            expect(await page.locator('#error')).toHaveText('Your password is invalid!');

            await page.waitForTimeout(5000);
        });

        await test.step('Login Testcase to automate Positive scenarios', async() => {

            let loginPage = new LoginPage(page);

            // Testcase with valid Username and Password

            const locator: Locator = await loginPage.getTestLoginHeading();
            expect(await locator.innerText()).toEqual('Test login');

            await loginPage.setUsername(testData.ValidUsername);
            await loginPage.setPassword(testData.ValidPassword);
            await loginPage.clickSubmit();
        
            expect(await page.locator('.post-title')).toHaveText('Logged In Successfully');

            await page.screenshot({ path: 'screenshot.png', fullPage: true });

            await page.waitForTimeout(5000);
        });
    });
});