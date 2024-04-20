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
// @ts-ignore
    CreateNewAppointmentASAP(): void{
        cy.get(this.plusButton).click().wait(1000);
        cy.get(this.flyOutSelectorElement).eq(0).click();
        cy.get(this.iconSelectorPreBooking).eq(0).click();
        cy.get(this.dateFieldToday).click();
        cy.get(this.iconSelectorPreBooking).eq(1).click();
        cy.get(this.hourSelectorinDropDown).eq(Math.floor(Math.random() * 2)+1).click()
        cy.get(this.inputField).eq(2).click().type('test').wait(2000)
        cy.get(this.patientFromList).eq(0).click().wait(2000)
        cy.contains('Reason For Visit').next().click().type('test')
        cy.get('.o-switch').eq(0).click()
        cy.get(this.dropDownArrow).eq(3).click();
        cy.wait(1000).get(this.itemFromList).eq(0).click();
        cy.contains('Save').click().wait(3500);
        this.checkForConflicts();
        cy.get(this.arrowMenu).click().wait(2000);
    }

    checkForConflicts():void{
        cy.get(this.newWindow).then($box => {
                const conflictExists = $box.text().includes('Continue and Save')
                if (conflictExists) {
                    cy.contains('Continue and Save').click();
                    cy.wait(3000)
                }
            }
        )
    }



}
export default Calendar


