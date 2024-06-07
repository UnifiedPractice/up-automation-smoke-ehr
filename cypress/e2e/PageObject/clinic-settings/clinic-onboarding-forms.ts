/// <reference types="cypress" />

class OnboardingForms{

    private sectionSelector: string = '.upform';
    private idScreeningForm: string ='#servicesDropDown_583'
    private dropdownOpener: string = '.dropdown-menu.open'
    private saveButton = 'Save & Continue';
    private nameFormSelector: string = '#ClinicForm_Name';
    private dropdownFormSelector : string = '.btn.dropdown-toggle.selectpicker.btn-default'

    changeServiceOnScreeningForm(){

        //cy.wait(800).get(this.sectionSelector).contains('testscreening').parent().click()
        cy.get('.dropdown-toggle').contains('testscreening').parent().click()

    }


    changeStateCCPEScreeningForms(): void {
        cy.contains('testscreening').next().next().click().within(() => {cy.get('.text').eq(1).click({force:true})})
        cy.wait(300)
    }

    changeExistingPatientScreeningForms(): void {
        cy.contains('testscreening').next().click().within(() => {cy.get('.text').eq(2).click({force:true})})
        cy.wait(300)
    }

    changeNewPatientScreeningForms(): void {
        cy.contains('testscreening').next().click().within(() => {cy.get('.text').eq(1).click({force:true})})
        cy.wait(300)
    }

    visibilityForAllScreeningForms(): void {
    cy.contains('testscreening').next().click().within(() => {cy.get('.text').eq(0).click({force:true})})
    cy.wait(300)
    }

    activateScreeningForms(): void{
        cy.get('[type="checkbox"]').check()
        cy.contains('testscreening').next().next().next().click().within(() => {cy.get('.text').eq(0).click({force:true})})
        cy.wait(300)
    }

    addNewFormandActivate(): void{
        cy.get('.button.default.no-select.pull-right').eq(0).should('be.visible').click({force:true})
        cy.get(this.nameFormSelector).should('be.visible').click().type('testform'+Math.floor(Math.random() * 9999))
        cy.get(this.dropdownFormSelector).eq(1).click();
        cy.contains('li[rel="1"] a', 'Is Active').should('be.visible').click()
        cy.contains('Save').should('be.visible').click()
    }

    openTutorial(): void{
        cy.contains('Forms tutorial').should('be.visible').click();
    }

    checkReminderEmail():void{
        cy.visit('https://staging.unifiedpractice.com/dirlisting/d379136412c1476d9397f9ee3b606448/notifications')
        cy.contains('emails').invoke('removeAttr', 'target').click();
        cy.wait(500)
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('div').contains('Complete Forms').should('be.visible')
    }

}

export default OnboardingForms
