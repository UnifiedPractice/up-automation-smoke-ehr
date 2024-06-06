/// <reference types="cypress" />
import "cypress-localstorage-commands"

class SideBarNavigate  {
    public level1Selector: string = '.menu-level-1';
    public level2Selector: string = '.menu-level-2';
    public arrowSelector: string = '.hamburger-arrow-left';

    selectCalendar() : void {
        cy.intercept('https://staging.unifiedpractice.com/Public/app/').as('selectCalendarIntercept')
        cy.get(this.level1Selector).eq(1).click();
        cy.wait('@selectCalendarIntercept')
    }

    selectReports(name: string) : void {
        cy.get(this.level2Selector).contains(name).click({force:true});
    }

    selectBilling(name: string) : void {
        cy.wait(2500).get(this.level2Selector).contains(name).click({force:true});
    }
    extendMenu() : void{
        cy.get('.navbar-header-left').should('be.visible').then(($el) => {
            if ($el.hasClass('small')) {
                cy.get(this.arrowSelector).click({force:true})
            }
        })
    }
    extendMenuforUniversities() : void{
        cy.wait(600).get('.navbar__content-parent').then(($el) => {
            if (!$el.hasClass('extended')) {
                cy.get(this.arrowSelector).click({force:true})
            }
        })
    }

    selectMyPatientsfromCalendarWindow() : void {
       // cy.intercept('https://staging.unifiedpractice.com/Public/PatientManagement/ClinicPatients').as('listPatientIntercept')
        cy.get('.site-menu-item').eq(2).click();
        cy.contains('Clinic Patients').should('be.visible').click()

        cy.contains('All Clinic Patients').should('be.visible')

        //cy.wait('@listPatientIntercept')
    }

    selectMyPatients() : void {
        //cy.intercept('https://staging.unifiedpractice.com/Public/PatientManagement/ClinicPatients').as('listPatientIntercept')
        cy.get('.menu-level-1').eq(2).click();
        cy.contains('Clinic Patients').should('be.visible').click()

        cy.contains('All Clinic Patients').should('be.visible')
        // cy.wait('@listPatientIntercept')
    }

    selectMyPatientsSecondSelector(): void{
        cy.get('.site-menu-title').eq(2).click();
        cy.contains('Clinic Patients').should('be.visible').click()
    }


    selectPP(): void {
       // cy.intercept('https://data.pendo.io/data/ptm.gif/',{statusCode: 200, fixture: 'avoid'}).as('url')
        cy.get(this.level1Selector).eq(9).click()
        cy.wait(1100)
    }

    selectCS(name: string) : void {

        cy.wait(2500).get(this.level1Selector).eq(10).click({force:true});
        cy.wait(2500).get(this.level2Selector).contains(name).click({force:true});

    }

    selectLiveChat(): void{
        cy.visit('https://staging.unifiedpractice.com/Public/app/#/chat')
        cy.get('.mat-button-wrapper').click();
    }

    goToCalendarAndPPfromChat(): void{
        cy.intercept('https://staging.unifiedpractice.com/Public/coreapi/api/clinic/practitioners?IncludeInactive=true').as('openCalendarIntercept')
        cy.contains('.site-menu-title', 'Calendar').should('be.visible').click();
        cy.wait('@openCalendarIntercept')
        cy.get('.upscheduler__filters-today').should('be.visible')
        cy.contains('.site-menu-title', 'Patient Portal').should('be.visible').click();

    }

}

export default SideBarNavigate
