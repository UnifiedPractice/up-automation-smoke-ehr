/// <reference types="cypress" />

 class LoginPage{

    private StagingLink: string = 'https://staging.unifiedpractice.com/Public/Account/Login'
   // private StagingLink: string = 'https://staging.unifiedpractice.com/PublicRelease/Account/Login'
    private username: string = 'input[name="Parameter.UserName"]';
    private password: string = 'input[name="Parameter.Password"]';

    goToStaging(): void {
        cy.visit(this.StagingLink)
    }

    logoutFromEHR(): void {
        cy.get('.fa.fa-chevron-down').should('be.visible').click({force:true});
        cy.contains('Logout').click();
        cy.contains('Forgot your password').should('be.visible');
    }

     logoutFromEHRAsFrontDesk(): void {
         cy.wait(1000).contains('Hi, frontdesk').should('be.visible').click()
         cy.contains('Logout').click();
         cy.contains('Forgot your password').should('be.visible');
     }
    loginPPNCFPCCPE(): void {
        cy.intercept('https://staging.unifiedpractice.com/Public/Account/CollectPendoAndHubspotStats?_=*').as('login')
        cy.get(this.username).type('PPNCFPCCPE');
        cy.get(this.password).type('password');
        cy.contains('Login').click();
        cy.wait('@login')
    }

    loginAutomation(): void{
        cy.get(this.username).type('automationsmokecypress');
        cy.get(this.password).type('password');
        cy.contains('Login').click();
    }

     loginFrontDesk(): void{
         cy.get(this.username).type('frontdesksmokecypress');
         cy.get(this.password).type('password');
         cy.contains('Login').click();
     }

     loginEnhanced(): void{
         cy.get(this.username).type('enhancedclinic');
         cy.get(this.password).type('password');
         cy.contains('Login').click();
     }

     loginAutomationPP(): void{
         cy.get(this.username).type('automationcypress');
         cy.get(this.password).type('password');
         cy.contains('Login').click();
     }

     loginAutomationSmokeUniversity(): void{
         cy.get(this.username).type('automationsmokecypressuniversity');
         cy.get(this.password).type('password');
         cy.contains('Login').click();
     }

     loginPPNCFPCCPE(): void{
         cy.get(this.username).type('PPNCFPCCPE');
         cy.get(this.password).type('password');
         cy.contains('Login').click();
     }
     loginAutomationUniversity(): void{
         cy.get(this.username).type('automationcypressuniversity');
         cy.get(this.password).type('password');
         cy.contains('Login').click();
     }

    



}
export default LoginPage
