/// <reference types="cypress" />

 class LoginPage{

    private StagingLink: string = 'https://staging.unifiedpractice.com/Public/Account/Login'
   // private StagingLink: string = 'https://staging.unifiedpractice.com/PublicRelease/Account/Login'
    private username: string = 'input[name="Parameter.UserName"]';
    private password: string = 'input[name="Parameter.Password"]';

    goToStaging(): void {
        cy.visit(this.StagingLink)
    }

    loginPPNCFPCCPE(): void {
        cy.intercept('https://staging.unifiedpractice.com/Public/Account/CollectPendoAndHubspotStats?_=*').as('login')
        cy.get(this.username).type('PPNCFPCCPE');
        cy.get(this.password).type('password');
        cy.contains('Login').click();
        cy.wait('@login')
    }

    loginAutomation(): void{
        cy.intercept('https://staging.unifiedpractice.com/Public/Account/CollectPendoAndHubspotStats?_=*').as('login')
        cy.get(this.username).type('automationsmokecypress');
        cy.get(this.password).type('password');
        cy.contains('Login').click();
        cy.wait('@login')
    }

     loginPPNCFPCCPE(): void{
         cy.intercept('https://staging.unifiedpractice.com/Public/Account/CollectPendoAndHubspotStats?_=*').as('login')
         cy.get(this.username).type('PPNCFPCCPE');
         cy.get(this.password).type('password');
         cy.contains('Login').click();
         cy.wait('@login')
     }
     loginAutomationUniversity(): void{
         cy.intercept('https://staging.unifiedpractice.com/Public/Account/CollectPendoAndHubspotStats?_=*').as('login')
         cy.get(this.username).type('automationsmokecypressuniversity');
         cy.get(this.password).type('password');
         cy.contains('Login').click();
         cy.wait('@login')
     }

    



}
export default LoginPage
