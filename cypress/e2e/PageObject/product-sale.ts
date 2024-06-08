/// <reference types="cypress" />
import "cypress-localstorage-commands"

class ProductSale  {
    public fieldSelector: string = '.dx-texteditor-input';
    public dropDownElementSelector: string = '.dx-template-wrapper.dx-item-content.dx-list-item-content'
    public closePopupProductSale: string = '.dx-icon.dx-icon-close';
    public leftArrowMenuSelector: string = '.icon.hamburger.hamburger-arrow-left';

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
        cy.contains('Receive $').should('be.visible').invoke('removeAttr', 'target').click();
        cy.contains('Payment received').should('be.visible');
    }
    continueReceivePaymentforRefund(): void{
        cy.get(this.closePopupProductSale).eq(1).click();
        cy.get(this.leftArrowMenuSelector).should('be.visible').click()
    }

    selectCashMethod(): void{
        // cy.get('.dx-overlay-content.dx-popup-normal.dx-resizable').within()
        // cy.get('.dx-texteditor-input').eq(0).should('be.visible').click();
        cy.contains('Payment Method').should('be.visible').next().click();
    }

}

export default ProductSale
