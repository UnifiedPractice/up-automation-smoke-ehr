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

// @ts-ignore
    CreateNewAppointmentASAP(): void{
        cy.get(this.plusButton).click();
        cy.intercept('https://data.pendo.io/data/guide.js/**').as('modalCalendarIntercept')
        cy.get(this.flyOutSelectorElement).eq(0).click({force:true});
        cy.wait('@modalCalendarIntercept')
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
       // cy.get(this.arrowMenu).should('be.visible').click()
    }

    CreateNewAppointmentOnUniversities(): void{
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

    CreateNewAppointmentForInsurance(): void{
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
        // cy.get(this.arrowMenu).should('be.visible').click()
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


