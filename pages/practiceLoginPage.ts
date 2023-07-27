import { Locator, Page } from '@playwright/test';

export class LoginPage {
    page: Page;
    
    constructor(page: Page){
        this.page = page;
    }

    public async getTestLoginHeading(): Promise<Locator>{
        return this.page.locator('h2:has-text("Test login")');
    }

    public async setUsername(username: string){
        await this.page.locator('#username').fill(username);
    }

    public async setPassword(password: string){
        await this.page.locator('#password').fill(password);
    }

    public async clickSubmit(){
        await this.page.locator('#submit').click();
    }
}