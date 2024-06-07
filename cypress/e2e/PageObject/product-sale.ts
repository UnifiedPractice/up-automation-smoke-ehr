/// <reference types="cypress" />
import "cypress-localstorage-commands"

class ProductSale  {
    public fieldSelector: string = '.dx-texteditor-input';
    public dropDownElementSelector: string = '.dx-template-wrapper.dx-item-content.dx-list-item-content'

    findAndSelectPatient(name:string): void{
        cy.get(this.fieldSelector).eq(0).should('be.visible').click().type(name);
        cy.get(this.dropDownElementSelector).eq(0).should('be.visible').click()
    }

    findAndSelectProduct(name:string): void {
        cy.get(this.fieldSelector).eq(1).should('be.visible').click().type(name);
        cy.get(this.dropDownElementSelector).eq(0).should('be.visible').click({force:true})
    }

    receivePayment(): void {
        cy.contains('Receive Payment').should('be.visible').click()
        cy.contains('Payment Method').should('be.visible').next().click();
        cy.contains('Cash').should('be.visible').click({force:true});
        cy.contains('Receive $').should('be.visible').click();
        cy.contains('Payment received').should('be.visible').click();
    }

    selectCashMethod(): void{
        // cy.get('.dx-overlay-content.dx-popup-normal.dx-resizable').within()
        // cy.get('.dx-texteditor-input').eq(0).should('be.visible').click();
        cy.contains('Payment Method').should('be.visible').next().click();
    }

}

export default ProductSale
