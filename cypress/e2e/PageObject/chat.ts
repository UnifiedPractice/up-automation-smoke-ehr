/// <reference types="cypress" />
import "cypress-localstorage-commands"
import {getDayMonthHour} from "./patient-list";

class Chat  {

    private plusButtonSelector: string = '.add-channels-btn.ng-star-inserted';
    private fieldSearchingNameSelector: string = '.dx-texteditor-input-container';
    private startChatButtonSelector: string ='.mat-focus-indicator.mat-flat-button.mat-button-base.mat-primary'
    private currentEmailInUse: string = 'automation22';
    private attachmentButtonSelector: string = '.rfu-file-input';

    sendMessageFromEHR():void{
        cy.contains('Conversations').should('be.visible').get(this.plusButtonSelector).click();
        cy.contains('Start a Chat').should('be.visible')
        cy.intercept('https://staging.unifiedpractice.com/Public/coreapi/api/clinic/patients?Page=1&Count=10&SearchTerm=test&HasPatientPortalAccount=true').as('listPatientIntercept')
        cy.get(this.fieldSearchingNameSelector).click().clear().type('test');
        cy.wait('@listPatientIntercept')
        cy.contains(this.currentEmailInUse).click()
        cy.get(this.startChatButtonSelector).click();
        cy.contains('Conversations').should('be.visible');
        cy.get('.rta').click().type('The next time will be automatically generated to verify that the message was sent to the EHR: ' + getDayMonthHour).trigger('keydown', {
            key: 'Enter',})
    }
    checkMessageInEHR():void{
        cy.wait(3500).get('.mat-button-base').click().wait(1500);
        cy.get('.text-ellipsis').eq(0).click();
        cy.contains('generated to verify that the message was sent to the EHR:' + getDayMonthHour).should('be.visible');
    }

    checkMessageAsFrontDesk():void{
        cy.contains('.flex.flex-row.p-4.w-full.flex-grow.gap-2.cursor-pointer.place-content-start.items-center','test test').should('be.visible').click()
        cy.contains(getDayMonthHour).should('be.visible');
    }

}

export default Chat
