import { expect, PlaywrightTestConfig } from '@playwright/test';
import { testConfig } from './testConfig';
const ENV = process.env.ENV;

const config: PlaywrightTestConfig = {

      use: {
        viewport: { width: 1250, height: 630},
        trace: 'on-first-retry',
      },

      timeout: 2400000,
      expect: {
        timeout: 300000,
      },

      /* Reporter to use. See https://playwright.dev/docs/test-reporters */
      reporter: [['html', { outputFolder: 'html-report', open:'never'}], ['junit', { outputFile: 'html-report/xmlReport.xml'}]],

      retries: 0,

      projects: [
      {
          name: 'chrome',
          use: {

              browserName: 'chromium',

              //chrome Browser Config
              //channel: 'chrome',

             baseURL: testConfig[process.env.ENV],

             headless: false,

             viewport: { width: 1280, height: 680},
             ignoreHTTPSErrors: true,

             trace: 'on',
             video: 'on',
             screenshot: 'on',

             actionTimeout: 90*1000,
             navigationTimeout: 120*1000,

             launchOptions: {
             slowMo: 500,
            }
          },
      },
  ],
};

export default config;