/// <reference types="cypress" />

import {
    PP_API,
    PP_API_URL,
    FINAL_API,
    API_URL,
    API_BASEPP_URL,
    FINAL_API_STAGING_PP,
    FINAL_API_STAGING_PP_UNIVERSITY
} from "../../constants";
import BasePage from "./base-page";
import 'cypress-wait-until';
import { format, addDays} from 'date-fns';
import {getDayMonthHour} from "./patient-list";
import base = Mocha.reporters.base;
import basePage from "./base-page";
const { uniqueNamesGenerator, Config, adjectives, colors } = require('unique-names-generator');
export const confirm = Math.floor(Math.random() * 22)

class Calendar extends BasePage {

    public plusButton: string = '.c-flyout';
    public flyOutSelectorElement: string = '.flyout__entry-name';
    public iconSelectorPreBooking: string = '.dx-dropdowneditor-icon';
    public calendarModal: string= '.dx-overlay-content.dx-popup-normal.dx-resizable.dx-popup-inherit-height';
    public dateField: string = '.dx-calendar-cell';
    public dateFieldToday: string = '.dx-calendar-contoured-date';
    public hourSelectorinDropDown: string ='.dx-item-content.dx-list-item-content'
    public inputField : string = '.dx-texteditor-input';
    public patientFromList : string = '.select-patient__result.dx-template-wrapper.dx-item-content.dx-list-item-content'
    public newWindow : string = '.mat-dialog-container'
    public dropDownArrow : string ='.dx-button-normal.dx-button-mode-contained.dx-widget.dx-dropdowneditor-button'
    public itemFromList: string = '.dx-template-wrapper.dx-item-content.dx-list-item-content'
    public arrowMenu: string = '.icon.hamburger.hamburger-arrow-left'
    public selectService: string = '.dx-item-content.dx-list-item-content'
    public chatButton: string = '.o-button.o-button--classicsimple.edit-appointment__footer-action.dx-button.dx-button-normal.dx-button-mode-contained.dx-widget.dx-button-has-text.ng-star-inserted';
    public saveButtonAppointmentWindow : string = '.o-button.o-button--classic.create-appointment__footer-action.dx-button.dx-button-normal.dx-button-mode-contained.dx-widget.dx-button-has-text'
// @ts-ignore
    createNewAppointmentASAP(): void{
        cy.get(this.plusButton).click();
        cy.intercept('https://data.pendo.io/data/guide.js/**').as('modalCalendarIntercept')
        cy.get(this.flyOutSelectorElement).eq(0).click({force:true});
        cy.wait('@modalCalendarIntercept')
        cy.get(this.iconSelectorPreBooking).eq(0).click({force:true});
        cy.get(this.dateFieldToday).click();
        cy.get(this.iconSelectorPreBooking).eq(1).click();
        cy.get(this.hourSelectorinDropDown).eq(Math.floor(Math.random() * 4)+1).click()
        cy.intercept('https://staging.unifiedpractice.com/Public/coreapi/api/clinic/patients?**').as('listPatientIntercept')
        cy.get(this.inputField).eq(2).click().type('test alexandru')
        cy.wait('@listPatientIntercept')
        cy.get(this.patientFromList).eq(0).click()
        //Calendar appointment window

            //Select service dropdown
        cy.get(this.dropDownArrow).eq(2).click({force:true})
        cy.get(this.selectService).eq(0).click({force:true})

        cy.contains('Reason For Visit').next().click().type('test')
        cy.get('.o-switch').eq(0).click()
        cy.get(this.dropDownArrow).eq(3).click();
        cy.get(this.itemFromList).eq(0).click();
        cy.intercept('https://staging.unifiedpractice.com/Public/coreapi/api/scheduling/calendar/events/appointments/scheduling-conflicts').as('conflictIntercept')
        cy.contains('Save').click()
        cy.wait('@conflictIntercept').then((interception) => {
            if (interception) {
                cy.get('body').then($box => {
                    const conflictExists = $box.text().includes('Continue and Save');
                    if (conflictExists) {
                        cy.contains('Continue and Save').click();
                    }
                });
            }
        })
        cy.get(this.arrowMenu).should('be.visible').click()
    }

    createNewAppointmentOnUniversities(): void{
        cy.get(this.plusButton).should('be.visible').click();
        cy.get(this.flyOutSelectorElement).eq(0).should('be.visible').click({force:true});
        cy.get(this.iconSelectorPreBooking).eq(0).click({force:true});
        cy.get(this.dateFieldToday).click();
        cy.get(this.iconSelectorPreBooking).eq(1).click();
        cy.get(this.hourSelectorinDropDown).eq(Math.floor(Math.random() * 4)+1).click()
        cy.intercept('https://staging.unifiedpractice.com/Public/coreapi/api/clinic/patients?**').as('listPatientIntercept')
        cy.get(this.inputField).eq(2).click().type('test')
        cy.wait('@listPatientIntercept')
        cy.get(this.patientFromList).eq(0).click()
        //Calendar appointment window

        //Select service dropdown
        cy.get(this.dropDownArrow).eq(2).click({force:true})
        cy.get(this.selectService).eq(0).click({force:true})

        cy.contains('Reason For Visit').next().click().type('test')
        cy.get('.o-switch').eq(0).click()
        cy.get(this.dropDownArrow).eq(3).click();
        cy.get(this.itemFromList).eq(0).click();
        cy.intercept('https://staging.unifiedpractice.com/Public/coreapi/api/scheduling/calendar/events/appointments/scheduling-conflicts').as('conflictInterceptUniv')
        cy.wait(300).contains('Save').click({force:true})
        cy.wait('@conflictInterceptUniv').then((interception) => {
            if (interception) {
                cy.get('body').then($box => {
                    const conflictExists = $box.text().includes('Continue and Save');
                    if (conflictExists) {
                        cy.contains('Continue and Save').click();
                    }
                });
            }
        })
        //cy.get(this.arrowMenu).should('be.visible').click()
    }

    createNewAppointmentForInsurance(): void{
        cy.get(this.plusButton).click();
        cy.intercept('https://data.pendo.io/data/guide.js/**').as('modalCalendarIntercept')
        cy.get(this.flyOutSelectorElement).eq(0).click({force:true});
        cy.wait('@modalCalendarIntercept')
        cy.get(this.iconSelectorPreBooking).eq(0).click({force:true});
        cy.get(this.dateFieldToday).click();
        cy.get(this.iconSelectorPreBooking).eq(1).click();
        cy.get(this.hourSelectorinDropDown).eq(Math.floor(Math.random() * 4)+1).click()
        cy.intercept('https://staging.unifiedpractice.com/Public/coreapi/api/clinic/patients?**').as('listPatientIntercept')
        cy.get(this.inputField).eq(2).click().type('Alexandru Cristian')
        cy.wait('@listPatientIntercept')
        cy.get(this.patientFromList).eq(0).click()
        //Calendar appointment window

        //Select service dropdown
        cy.get(this.dropDownArrow).eq(2).click({force:true})
        cy.get(this.selectService).eq(0).click({force:true})

        cy.contains('Reason For Visit').next().click().type('test')
        cy.get('.o-switch').eq(0).click()
        cy.get(this.dropDownArrow).eq(3).click();
        cy.get(this.itemFromList).eq(0).click();
        cy.intercept('https://staging.unifiedpractice.com/Public/coreapi/api/scheduling/calendar/events/appointments/scheduling-conflicts').as('conflictIntercept')
        cy.contains('Save').click()
        cy.wait('@conflictIntercept').then((interception) => {
            if (interception) {
                cy.get('body').then($box => {
                    const conflictExists = $box.text().includes('Continue and Save');
                    if (conflictExists) {
                        cy.contains('Continue and Save').click();
                    }
                });
            }
        })
         cy.get(this.arrowMenu).should('be.visible').click()
    }

    createNewAppointmentwithPPPatient(): void{
        cy.get(this.plusButton).click();
        cy.intercept('https://data.pendo.io/data/guide.js/**').as('modalCalendarIntercept')
        cy.get(this.flyOutSelectorElement).eq(0).click({force:true});
        cy.wait('@modalCalendarIntercept')
        cy.get(this.iconSelectorPreBooking).eq(0).click({force:true});
        cy.get(this.dateFieldToday).click();
        cy.get(this.iconSelectorPreBooking).eq(1).click();
        cy.get(this.hourSelectorinDropDown).eq(Math.floor(Math.random() * 4)+1).click()
        cy.intercept('https://staging.unifiedpractice.com/Public/coreapi/api/clinic/patients?**').as('listPatientIntercept')
        cy.get(this.inputField).eq(2).click().type('test alexandru')
        cy.wait('@listPatientIntercept')
        cy.get(this.patientFromList).eq(0).click()
        //Calendar appointment window

        cy.get(this.chatButton).should('be.visible').click()
    }

    createNewAppointmentforReminder(): void{
        cy.get(this.plusButton).click();
        cy.intercept('https://data.pendo.io/data/guide.js/**').as('modalCalendarIntercept')
        cy.get(this.flyOutSelectorElement).eq(0).click({force:true});
        cy.wait('@modalCalendarIntercept')
        cy.get(this.iconSelectorPreBooking).eq(0).click({force:true});
        cy.get(this.dateFieldToday).click();
        cy.get(this.iconSelectorPreBooking).eq(1).click();
        cy.get(this.hourSelectorinDropDown).eq(Math.floor(Math.random() * 4)+1).click()
        cy.intercept('https://staging.unifiedpractice.com/Public/coreapi/api/clinic/patients?**').as('listPatientIntercept')
        cy.get(this.inputField).eq(2).click().type('test alexandru')
        cy.wait('@listPatientIntercept')
        cy.get(this.patientFromList).eq(0).click()
        //Calendar appointment window

        //Select service dropdown
        cy.get(this.dropDownArrow).eq(2).click({force:true})
        cy.get(this.selectService).eq(0).click({force:true})

        cy.contains('Reason For Visit').next().click().type('test')
        cy.get('.o-switch').eq(0).click()
        cy.get(this.dropDownArrow).eq(3).click();
        cy.get(this.itemFromList).eq(0).click();
        cy.intercept('https://staging.unifiedpractice.com/Public/coreapi/api/scheduling/calendar/events/appointments/scheduling-conflicts').as('conflictIntercept')
        cy.contains('Save').click()
        cy.wait('@conflictIntercept').then((interception) => {
            if (interception) {
                cy.get('body').then($box => {
                    const conflictExists = $box.text().includes('Continue and Save');
                    if (conflictExists) {
                        cy.contains('Continue and Save').click();
                    }
                });
            }
        })
    }

    addNewPatientandInviteforPP(): void{
        cy.get(this.plusButton).click();
        cy.intercept('https://data.pendo.io/data/guide.js/**').as('modalCalendarIntercept')
        cy.get(this.flyOutSelectorElement).eq(0).click({force:true});
        cy.wait('@modalCalendarIntercept')
        cy.get(this.iconSelectorPreBooking).eq(0).click({force:true});
        cy.get(this.dateFieldToday).click();
        // cy.get(this.iconSelectorPreBooking).eq(1).click();
        cy.contains('Add New Patient').should('be.visible').click();
        cy.get('.user-box__input').eq(0).should('be.visible').click().type('Automation Smoke'+getDayMonthHour);
        cy.get('.user-box__input').eq(2).should('be.visible').click().type('Automation Smoke Last'+getDayMonthHour);
        cy.get('.user-box__input').eq(3).should('be.visible').click().type('engineer'+getDayMonthHour+'@email.com');
        cy.contains('Continue').should('be.visible').click()
        cy.contains('Invite').should('be.visible').click();
        cy.contains('Invite was sent').should('be.visible');

        //Go to staging emails
        cy.visit('https://staging.unifiedpractice.com/dirlisting/d379136412c1476d9397f9ee3b606448/notifications')
        cy.contains('emails').invoke('removeAttr', 'target').click();
        cy.wait(500)
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.contains('Patient Portal Invite').should('be.visible')
    }

    createNewAppointmentandAddNewCard(): void{
        cy.get(this.plusButton).click();
        cy.intercept('https://data.pendo.io/data/guide.js/**').as('modalCalendarIntercept')
        cy.get(this.flyOutSelectorElement).eq(0).click({force:true});
        cy.wait('@modalCalendarIntercept')
        cy.get(this.iconSelectorPreBooking).eq(0).click({force:true});
        cy.get(this.dateFieldToday).click();
        cy.get(this.iconSelectorPreBooking).eq(1).click();
        cy.get(this.hourSelectorinDropDown).eq(Math.floor(Math.random() * 4)+1).click()
        cy.intercept('https://staging.unifiedpractice.com/Public/coreapi/api/clinic/patients?**').as('listPatientIntercept')
        cy.get(this.inputField).eq(2).click().type('Alexandru Cristian')
        cy.wait('@listPatientIntercept')
        cy.get(this.patientFromList).eq(0).click()
        //Calendar appointment window

        //Select service dropdown
        cy.get(this.dropDownArrow).eq(2).click({force:true})
        cy.get(this.selectService).eq(0).click({force:true})

        cy.contains('Reason For Visit').next().click().type('test')
        cy.get('.o-switch').eq(0).click()
        cy.get(this.dropDownArrow).eq(3).click();
        cy.get(this.itemFromList).eq(0).click();

        //Start manipulate iframe from Fullsteam
        cy.get('.dx-texteditor-input-container').eq(12).scrollIntoView().should('be.visible').click();
        cy.contains('Add new card').should('be.visible').click({force:true})
        cy.contains('Zip Code').should('be.visible').next().click({force:true}).type('12322')

        cy.frameLoaded('#fullsteam-hosted-card-number-frame');
        cy.iframe('#fullsteam-hosted-card-number-frame')
            .find('input#card-number')
            .click()
            .type('5541-0320-0000-4422');

        cy.frameLoaded('#fullsteam-hosted-expiration-month-frame');
        cy.iframe('#fullsteam-hosted-expiration-month-frame')
            .find('#expiration-month')
            .should('be.visible')
            .select('12')

        cy.frameLoaded('#fullsteam-hosted-expiration-year-frame');
        cy.iframe('#fullsteam-hosted-expiration-year-frame')
            .find('#expiration-year')
            .should('be.visible')
            .select('2025')

        cy.frameLoaded('#fullsteam-hosted-cvv-frame');
        cy.iframe('#fullsteam-hosted-cvv-frame')
            .find('input#cvv')
            .click()
            .type('411');

        cy.intercept('https://hostedpayments-ext.fullsteampay.net/hostedcontrols/CardDetails').as('responseFromFullsteamIntercept')
        cy.get('#fullsteam-submit-button').should('be.visible').click()
        cy.wait('@responseFromFullsteamIntercept')


        cy.intercept('https://staging.unifiedpractice.com/Public/coreapi/api/scheduling/calendar/events/appointments/scheduling-conflicts').as('conflictIntercept')
        cy.get(this.saveButtonAppointmentWindow).scrollIntoView().should('be.visible').click()
        cy.wait('@conflictIntercept').then((interception) => {
            if (interception) {
                cy.get('body').then($box => {
                    const conflictExists = $box.text().includes('Continue and Save');
                    if (conflictExists) {
                        cy.contains('Continue and Save').click();
                    }
                });
            }
        })

        cy.contains('Appointment successfully updated').should('be.visible');
    }


    checkForConflicts():void{
        cy.get('body').then($box => {
                const conflictExists = $box.text().includes('Continue and Save')
                if (conflictExists) {
                    cy.contains('Continue and Save').click();
                }
            }
        )
    }






}
export default Calendar


