// This class will be used for any test written throughout the project;
// the general methods are written here
//
// / <reference types="cypress" />
import { cloneWith } from "../../../node_modules/cypress/types/lodash/index";
import ClinicLocations from "./clinic-settings/clinic-locations";
import DrawerModal from "./drawer-modal";
import SideBarNavigate from "./side-bar-menu";


import {verifyDownloadTasks} from 'cy-verify-downloads';

class PaymentList {

    public tabSelector: string = '.table-row.table-row-with-action';
    public deleteIconSelector: string = '.fa.fa-trash-o.tooltip-info.js-delete';
    public refundIconSelector: string = '.actionItem.fa.fa-reply.js-refund';
    public refundButtonSelector: string = '.actionItem.fa.fa-reply.js-refund';

    public primaryButtonModalSelector: string = '.btn.btn-primary'

    proceedRefund(): void {
        cy.get(this.tabSelector).eq(0).should('be.visible').click();
        cy.get(this.deleteIconSelector).should('be.visible').click({force:true});
        cy.intercept('https://staging.unifiedpractice.com/Public/Billing/DeleteAllocations').as('deletePaymentIntercept')
        cy.get(this.primaryButtonModalSelector).should('be.visible').click();
        cy.wait('@deletePaymentIntercept')
        cy.wait(500).get(this.refundIconSelector).eq(0).should('be.visible').click({force:true});
        cy.get(this.primaryButtonModalSelector).should('be.visible').click();
        cy.contains('The refund was successful').should('be.visible')
    }
}
export default PaymentList
