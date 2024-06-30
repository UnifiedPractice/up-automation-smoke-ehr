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
import { setThisTestFirstName } from "./new-patient";
import { getThisTestFirstName } from "./new-patient";
export const confirm = Math.floor(Math.random() * 22)

class Calendar extends BasePage {

    private thisTestFirstName: string = '';
    public plusButton: string = '.c-flyout';
    public flyOutSelectorElement: string = '.flyout__entry-name';
    public iconSelectorPreBooking: string = '.dx-dropdowneditor-icon';
    public calendarModal: string= '.dx-overlay-content.dx-popup-normal.dx-resizable.dx-popup-inherit-height';
    public dateField: string = '.dx-calendar-cell';
    public dateFieldToday: string = '.dx-calendar-contoured-date';
    public inputField : string = '.dx-texteditor-input';
    public patientFromList : string = '.select-patient__result.dx-template-wrapper.dx-item-content.dx-list-item-content';
    public newWindow : string = '.mat-dialog-container';
    public dropDownArrow : string ='.dx-button-normal.dx-button-mode-contained.dx-widget.dx-dropdowneditor-button';
    public itemFromList: string = '.dx-template-wrapper.dx-item-content.dx-list-item-content';
    public arrowMenu: string = '.icon.hamburger.hamburger-arrow-left';
    public selectService: string = '.dx-item-content.dx-list-item-content';
    public hourSelector = '.dx-item.dx-list-item';
    public hourSelectorinDropDown: string ='.dx-item-content.dx-list-item-content';
    public calendarCellSelector: string = 'span.upscheduler__app-name';
    public editCalendarButton: string = '.event-popup__top-actionsbtn:nth-of-type(1) .material-icons';
    public saveThisOccurrence: string ='.o-button.o-button--classic.recurrence-appointment-footer-action';
    public cancelFromCalendar: string = 'span.dx-button-text:contains("Cancel Appointment")';
    public cancelAppointment: string = 'dx-button.cancel-appointment-footer-action .dx-button-content:eq(1)';
    public addNewPatient: string = 'button[up-cy-test="cta-add-patient"]';
    public patientFirstName: string ='input.dx-texteditor-input:eq(0)';
    public patientLastName: string ='input.dx-texteditor-input:eq(2)';
    public patientMail: string ='input.dx-texteditor-input:eq(3)';
    public createPatientContinue: string = 'span.dx-button-text:contains("Continue")';
    public closeAppointment: string = '#modal_layout up-modal-layout up-modal-header .col-md-3.text-right.mod-head-close i';
    public cancelAppointmentCharge: string = 'input[autocomplete="off"][inputmode="decimal"].dx-texteditor-input[type="text"][min="0"][max="2"][step="1"][tabindex="0"][aria-valuenow="2"][role="spinbutton"]';
    public editRepeatEnds: string = '#endCondition > div.row.align-items-center.mb-1 > div.col-2.occurrences-form > dx-number-box > div > div.dx-texteditor-input-container > input';
    public cancelRepeatAll: string = 'div.dx-item.dx-radiobutton[role="radio"][aria-selected="false"][aria-checked="false"]:eq(2)';
    public editRepeatAll: string ='div.dx-item.dx-radiobutton[role="radio"][aria-selected="false"][aria-checked="false"]:eq(1)';


    public cardSelectDropdown: string = '#modal_layout > up-modal-layout > div > ng-component > up-create-appointment > div.create-appointment__container > div:nth-child(3) > div:nth-child(2) > up-billing-details > div > div.patient-card-form > up-patient-credit-card > form > div > div > up-custom-box > div > div > div > dx-select-box > div > div > div.dx-texteditor-input-container > input';
    public cardSelect: string = 'div.dx-template-wrapper.dx-item-content.dx-list-item-content > span';
    public cardNewName: string ='input.form-control.fs-form-control:eq(0)';
    public cardNewZip: string ='input.form-control.fs-form-control:eq(1)';
    //These don't work V V V V
        public cardNewCard: string = '#fullsteam-hosted-card-number-div';
    public cardNewMonthDropdown: string = '#fullsteam-hosted-expiration-month-div';
    public cardNewYearDropdown: string = '#fullsteam-hosted-expiration-year-div';
    public cardNewCVV: string = '#fullsteam-hosted-cvv-div';
    //These don't work ^ ^ ^ ^
    public cardNewSave: string = 'input#fullsteam-submit-button';
    public saveAppointment: string ='#modal_layout > up-modal-layout > div > ng-component > up-create-appointment > div.create-appointment__footer > div > div > dx-button > div > span';
    public cardNumberIframeSelector: string = '#fullsteam-hosted-card-number-frame';
    public cardNumberInputSelector: string = 'input#card-number'; // Use the appropriate input selector



// @ts-ignore
    createNewAppointment(time: string, serviceText: string, inputText: string): void {
        cy.get(this.plusButton).click();
        cy.get(this.flyOutSelectorElement).eq(0).click();
        cy.get(this.addNewPatient).should('be.visible');
        cy.get(this.iconSelectorPreBooking).eq(0).click();
        cy.get(this.dateFieldToday).click();
        cy.get(this.iconSelectorPreBooking).eq(1).click();
        cy.get(this.hourSelector).contains(this.hourSelectorinDropDown, time).click();
        cy.get(this.inputField).eq(2).click().type(inputText || this.thisTestFirstName);
        cy.get(this.patientFromList).eq(0).click();
        // Calendar appointment window

        // Select service dropdown
        cy.get(this.dropDownArrow).eq(2).click();
        cy.get(this.selectService).contains(serviceText).click({force: true});
        cy.contains('Reason For Visit').next().click().type('test');
        cy.get('.o-switch').eq(0).click();
        cy.get(this.dropDownArrow).eq(3).click();
        cy.get(this.itemFromList).eq(0).click();
        cy.contains('Save').click({force: true});
        this.checkForConflicts();
        cy.get(this.arrowMenu).click();
        cy.get('div.toast.toast-success').should('be.visible');
    }

    createNewAppointmentRepeatMultiple(time: string, serviceText: string, inputText: string): void {
            cy.get(this.plusButton).click();
            cy.get(this.flyOutSelectorElement).eq(0).click();
            cy.get(this.iconSelectorPreBooking).eq(0).click();
            cy.get(this.dateFieldToday).click();
            cy.get(this.iconSelectorPreBooking).eq(1).click();
            cy.get(this.hourSelector).contains(this.hourSelectorinDropDown, time).click();
            cy.get(this.inputField).eq(2).click().type(inputText || this.thisTestFirstName).wait(2000);
            cy.get(this.patientFromList).eq(0).click();
            // Calendar appointment window

            // Select service dropdown
            cy.get(this.dropDownArrow).eq(2).click();
            cy.get(this.selectService).contains(serviceText).click({force: true});
            cy.contains('Reason For Visit').next().click().type('test');
            cy.get('.o-switch').eq(0).click().wait(300);
            cy.get(this.editRepeatEnds).click().clear().type(2);
            cy.get(this.dropDownArrow).eq(3).click();
            cy.get(this.itemFromList).eq(0).click();
            cy.contains('Save').click();
            this.checkForConflicts();
            cy.get(this.arrowMenu).click();
            cy.get('div.toast.toast-success').should('be.visible');
        }

    createNewAppointmentUniversity(time: string, serviceText: string, inputText: string): void {
            cy.get(this.plusButton).click();
            cy.get(this.flyOutSelectorElement).eq(0).click();
            cy.get(this.iconSelectorPreBooking).eq(0).click();
            cy.get(this.dateFieldToday).click();
            cy.get(this.iconSelectorPreBooking).eq(1).click();
            // cy.get(this.hourSelectorinDropDown).eq(Math.floor(Math.random() * 2)+1).click()
            cy.get(this.hourSelector).contains(this.hourSelectorinDropDown, time).click();
            cy.get(this.inputField).eq(2).click().type(inputText || this.thisTestFirstName);
            cy.get(this.patientFromList).eq(0).click();
            // Calendar appointment window

            // Select service dropdown
            cy.get(this.dropDownArrow).eq(2).click();
            cy.get(this.selectService).contains(serviceText).click();
            cy.contains('Reason For Visit').next().click().type('test');
            cy.get('.o-switch').eq(0).click();
            cy.get(this.dropDownArrow).eq(3).click();
            cy.get(this.itemFromList).eq(0).click();
            cy.contains('Save').click();
            this.checkForConflicts();
            cy.get('div.toast.toast-success').should('be.visible');
        }


    editAppointment (serviceText: string): void{
        this.checkForShowCancelled();
        cy.get(this.calendarCellSelector).contains(serviceText).click({force: true});
        cy.get(this.editCalendarButton).click();
        cy.get(this.inputField).eq(6).click().type(' EDIT');
        cy.contains('Save').click();
        this.checkForConflicts();
        cy.get(this.saveThisOccurrence).click({ force: true });
        cy.get('div.toast.toast-success').should('be.visible');
    }

    editAppointmentRepeat (serviceText: string): void{
        this.checkForShowCancelled();
        cy.get(this.calendarCellSelector).contains(serviceText).click({force: true}).wait(2000);
        cy.get(this.editCalendarButton).click();
        cy.get(this.inputField).eq(6).click().type(' EDIT');
        cy.contains('Save').click();
        this.checkForConflicts();
        cy.get(this.editRepeatAll).click({ force: true });
        cy.get(this.saveThisOccurrence).click();
        cy.get('div.toast.toast-success').should('be.visible');
    }

    deleteAppointment(appointmentText: string): void {
        this.checkForShowCancelled();
        cy.get(this.calendarCellSelector).contains(appointmentText).click({ force: true }).click({force: true});
        cy.get(this.cancelFromCalendar).click();
        cy.get(this.cancelAppointment).click();
        cy.get('div.toast.toast-success').should('be.visible');
    }

    editAppointmentUniversity (serviceText: string): void{
        this.checkForShowCancelled();
        cy.get(this.calendarCellSelector).contains(serviceText).click({force: true});
        cy.get(this.editCalendarButton).click();
        cy.get(this.inputField).eq(6).click().type(' EDIT');
        cy.contains('Save').click();
        this.checkForConflicts();
        cy.get(this.editRepeatAll).click({ force: true });
        cy.get(this.saveThisOccurrence).click();
        cy.get('div.toast.toast-success').should('be.visible');
    }

    deleteAppointmentMultiple(appointmentText: string): void {
        this.checkForShowCancelled();
        cy.get(this.calendarCellSelector).contains(appointmentText).click({ force: true }).click({force: true});
        cy.get(this.cancelFromCalendar).click();
        cy.get(this.cancelRepeatAll).click();
        cy.get(this.cancelAppointment).click();
        cy.get('div.toast.toast-success').should('be.visible');
    }

    deleteAppointment1By1(time: string, serviceText: string, inputText: string): void {
        cy.get(this.plusButton).click();
        cy.get(this.flyOutSelectorElement).eq(0).click();
        cy.get(this.iconSelectorPreBooking).eq(0).click();
        cy.get(this.dateFieldToday).click();
        cy.get(this.iconSelectorPreBooking).eq(1).click();
        cy.get(this.hourSelector).contains(this.hourSelectorinDropDown, time).click();
        cy.get(this.inputField).eq(2).click().type(inputText || this.thisTestFirstName);
        cy.get(this.patientFromList).eq(0).click();
        cy.get(this.dropDownArrow).eq(2).click();
        cy.get(this.selectService).contains(serviceText).click();
        cy.contains('Reason For Visit').next().click().type('test');
        cy.get('.o-switch').eq(0).click().wait(300);
        cy.get(this.dropDownArrow).eq(3).click();
        cy.wait(1000).get(this.itemFromList).eq(0).click();
        cy.contains('Save').click();
        this.checkForConflicts();
        cy.get(this.arrowMenu).click();
        cy.get('div.toast.toast-success').should('be.visible');
        this.checkForShowCancelled();
        cy.get(this.calendarCellSelector).contains(serviceText).click({ force: true }).click({force: true});
        cy.get(this.cancelFromCalendar).click();
        cy.get(this.cancelAppointment).click();
        cy.get('div.toast.toast-success').should('be.visible');
    }

    deleteAppointmentCharge(appointmentText: string): void {
        this.checkForShowCancelled();
        cy.get(this.calendarCellSelector).contains(appointmentText).click({ force: true }).click({force: true});
        cy.get(this.cancelFromCalendar).click();
        cy.get(this.cancelAppointmentCharge).click().clear().type('0.01');
        cy.get(this.cancelAppointment).click();
        cy.get('div.toast.toast-success').should('be.visible');
    }

    calendarSendReminder (serviceText: string): void{
            this.checkForShowCancelled();
            cy.get(this.calendarCellSelector).contains(serviceText).click({force: true});
            cy.get(this.editCalendarButton).click();
            cy.contains('Send Reminder').click();
    }

    bookTimeOff (name: string): void{
        const randomName = this.generateRandomString(10);
        setThisTestFirstName(randomName);
        const bookTimeOffName = getThisTestFirstName();
        cy.get(this.plusButton).click();
        cy.get(this.flyOutSelectorElement).eq(1).click();
        cy.get('input.dx-texteditor-input[type="text"][autocomplete="off"]:eq(0)').click().type(bookTimeOffName);
        cy.get('.book-timeoff__container .row.ng-star-inserted dx-tag-box .dx-texteditor-input-container.dx-tag-container.dx-native-click').click();
        cy.get('div.dx-list-select-all-checkbox').click();
        cy.get('input.dx-texteditor-input[type="text"][autocomplete="off"]:eq(0)').click()
        cy.get('div.dx-button-normal.dx-button-mode-contained.dx-widget.dx-dropdowneditor-button[role="button"][aria-label="Select"]:eq(0)').click();
        cy.get('td.dx-calendar-cell.dx-calendar-today.dx-calendar-contoured-date').click();
        cy.get('input.dx-texteditor-input[type="text"][autocomplete="off"]:eq(3)').click().type('12:00').wait(500);
        cy.get('div.dx-button-normal.dx-button-mode-contained.dx-widget.dx-dropdowneditor-button[role="button"][aria-label="Select"]:eq(3)').click();
        cy.get('div.dx-item-content.dx-list-item-content').contains('Location 1').click();
        cy.get('input.dx-texteditor-input[type="text"][autocomplete="off"]:eq(4)').click().type('12:30').wait(500);
        cy.get('span.dx-button-text').contains('Book Time-Off').click();
        cy.get('div.toast.toast-success').should('be.visible');
        }

    editTimeOff (name: string): void{
        const bookTimeOffName = getThisTestFirstName();
        cy.get('.upscheduler__app-desc-transposed').contains(bookTimeOffName).click();
        cy.get('button.event-popup__top-actionsbtn:has(i.material-icons:contains("edit"))').click();
        cy.get('input.dx-texteditor-input[type="text"][autocomplete="off"]:eq(3)').click().clear().type('12:15').wait(500);
        cy.get('span.dx-button-text').contains('Update Time-Off').click();
        cy.get('div.toast.toast-success').should('be.visible');
        }

    cancelTimeOff (name: string): void{
        const bookTimeOffName = getThisTestFirstName();
        cy.get('.upscheduler__app-desc-transposed').contains(bookTimeOffName).click();
        cy.get('button.event-popup__top-actionsbtn:has(i.material-icons:contains("edit"))').click();
        cy.contains('Cancel Time off').click();
        cy.contains('Yes').click();
        }

    bookTimeOffRepeat (name: string): void{
        const randomName = this.generateRandomString(10);
        setThisTestFirstName(randomName);
        const bookTimeOffName = getThisTestFirstName();
        cy.get(this.plusButton).click();
        cy.get(this.flyOutSelectorElement).eq(1).click();
        cy.get('input.dx-texteditor-input[type="text"][autocomplete="off"]:eq(0)').click().type(bookTimeOffName);
        cy.get('.book-timeoff__container .row.ng-star-inserted dx-tag-box .dx-texteditor-input-container.dx-tag-container.dx-native-click').click();
        cy.get('div.dx-list-select-all-checkbox').click();
        cy.get('input.dx-texteditor-input[type="text"][autocomplete="off"]:eq(0)').click()
        cy.get('div.dx-button-normal.dx-button-mode-contained.dx-widget.dx-dropdowneditor-button[role="button"][aria-label="Select"]:eq(0)').click();
        cy.get('td.dx-calendar-cell.dx-calendar-today.dx-calendar-contoured-date').click();
        cy.get('input.dx-texteditor-input[type="text"][autocomplete="off"]:eq(3)').click().type('02:00').wait(1000);
        cy.get('div.dx-button-normal.dx-button-mode-contained.dx-widget.dx-dropdowneditor-button[role="button"][aria-label="Select"]:eq(3)').click();
        cy.get('div.dx-item-content.dx-list-item-content').contains('Location 1').click();
        cy.get('input.dx-texteditor-input[type="text"][autocomplete="off"]:eq(4)').click().type('02:30').wait(1000);
        cy.get('label.o-switch').trigger('mouseover').wait(300).click();
        cy.get('span.dx-button-text').contains('Book Time-Off').click();
        cy.get('div.toast.toast-success').should('be.visible');
        }

    editTimeOffRepeat (name: string): void{
        const bookTimeOffName = getThisTestFirstName();
        cy.get('.upscheduler__app-desc-transposed').contains(bookTimeOffName).click();
        cy.get('button.event-popup__top-actionsbtn:has(i.material-icons:contains("edit"))').click();
        cy.get('input.dx-texteditor-input[type="text"][autocomplete="off"]:eq(3)').click().clear().type('02:15').wait(500);
        cy.get('span.dx-button-text').contains('Update Time-Off').click();
        cy.get('div.toast.toast-success').should('be.visible');
        }

    cancelTimeOff1By1 (name: string): void{
        const randomName = this.generateRandomString(10);
        setThisTestFirstName(randomName);
        const bookTimeOffName = getThisTestFirstName();
        cy.get(this.plusButton).click();
        cy.get(this.flyOutSelectorElement).eq(1).click();
        cy.get('input.dx-texteditor-input[type="text"][autocomplete="off"]:eq(0)').click().type(bookTimeOffName);
        cy.get('.book-timeoff__container .row.ng-star-inserted dx-tag-box .dx-texteditor-input-container.dx-tag-container.dx-native-click').click();
        cy.get('div.dx-list-select-all-checkbox').click({force: true});
        cy.get('input.dx-texteditor-input[type="text"][autocomplete="off"]:eq(0)').click();
        cy.get('div.dx-button-normal.dx-button-mode-contained.dx-widget.dx-dropdowneditor-button[role="button"][aria-label="Select"]:eq(0)').click();
        cy.get('td.dx-calendar-cell.dx-calendar-today.dx-calendar-contoured-date').click({force: true});
        cy.get('input.dx-texteditor-input[type="text"][autocomplete="off"]:eq(3)').click().type('05:00').wait(500);
        cy.get('div.dx-button-normal.dx-button-mode-contained.dx-widget.dx-dropdowneditor-button[role="button"][aria-label="Select"]:eq(3)').click();
        cy.get('div.dx-item-content.dx-list-item-content').contains('ocation').click();
        cy.get('input.dx-texteditor-input[type="text"][autocomplete="off"]:eq(4)').click().type('05:30').wait(500);
        cy.get('span.dx-button-text').contains('Book Time-Off').click().wait(5000);
        cy.get('.upscheduler__app-desc-transposed').contains(bookTimeOffName).click();
        cy.get('button.event-popup__top-actionsbtn:has(i.material-icons:contains("edit"))').click();
        cy.contains('Cancel Time off').click();
        cy.contains('Yes').click();
        cy.get('div.toast.toast-success').should('be.visible');


        }

    cancelTimeOffRepeat (name: string): void{
            const bookTimeOffName = getThisTestFirstName();
            cy.get('.upscheduler__app-desc-transposed').contains(bookTimeOffName).click();
            cy.get('button.event-popup__top-actionsbtn:has(i.material-icons:contains("edit"))').click();
            cy.contains('Cancel Time off').click();
            cy.contains('Yes').click();
            cy.get('div.toast.toast-success').should('be.visible');
            }

    printStatement(): void {
            cy.get(this.plusButton).click().wait(500);
            cy.get(this.flyOutSelectorElement).eq(2).click();
            cy.get('div.dx-texteditor-input-container input.dx-texteditor-input:eq(0)').click();
            cy.get('span.dx-checkbox-icon:eq(1)').click();
            cy.get('div.dx-dropdowneditor-icon:eq(0)').click();
            cy.get('td.dx-calendar-cell.dx-calendar-today.dx-calendar-contoured-date').click();
            cy.get('div.dx-dropdowneditor-icon:eq(1)').click().wait(200);
            cy.get('td.dx-calendar-cell.dx-calendar-today.dx-calendar-contoured-date:eq(1)').click();
            cy.get('div.dx-button-content > span.dx-button-text').contains('Print').click();
            }

    beginIntake(appointmentText: string): void{
        this.checkForShowCancelled();
        cy.get(this.calendarCellSelector).contains(appointmentText).click({force: true});
        cy.get('i.dx-icon.dx-icon-spindown.dx-icon-right:eq(2)').click().then(() => {
          cy.contains('On Time').then(($elem) => {
            if ($elem.length > 0) {
              cy.contains('On Time').click({ force: true });
            } else {
              cy.contains('Continue').click({ force: true });
            }
          });
        });
        cy.window().then(win => {
          win.close();
        });

        }

    dragAndDrop(appointmentText: string): void{
        this.checkForShowCancelled();
        cy.get('.upscheduler__app').contains(appointmentText)
            .trigger('mousedown', { button: 0, force: true })
            .trigger('mousemove', { clientX: 0, clientY: 50, force: true })
            .trigger('mouseup', { force: true });    // Release the mouse
        }

     createNewPatient(): void {
         // Generate a random first name and store it in thisTestFirstName
         //this.thisTestFirstName = this.generateRandomString(10);
         const thisTestFirstName = this.generateRandomString(10);
         setThisTestFirstName(thisTestFirstName);
         cy.get(this.plusButton).click();
         cy.get(this.flyOutSelectorElement).eq(0).click();
         cy.get(this.iconSelectorPreBooking).eq(0).click();
         cy.get(this.addNewPatient).click();

         // Clear the first name field and wait for it to be cleared
         cy.get(this.patientFirstName).click().clear().should('be.empty');

         // Type the generated first name into the input field
         cy.get(this.patientFirstName).type(thisTestFirstName).should('have.value', thisTestFirstName);

         // Continue with the rest of the patient creation process
         cy.get(this.patientLastName).click().type('Test');
         cy.get(this.patientMail).click().clear().type(`${thisTestFirstName}@test.com`);
         cy.get(this.createPatientContinue).click();

         // Close the appointment modal if needed
         cy.get(this.closeAppointment).click();

     }


    checkForConflicts():void{
        cy.wait(300);
        cy.get('body').then($box => {
                const conflictExists = $box.text().includes('Continue and Save')
                if (conflictExists) {
                    cy.contains('Continue and Save').click();
                }
            }
        )
    }

    checkForShowCancelled(): void {
        cy.get('#cmn-toggle-2').closest('.dx-checkbox').then($checkbox => {
                    // Check the state by inspecting the closest .dx-checkbox element for the aria-checked attribute
                    const isChecked = $checkbox.attr('aria-checked') === 'true';
                    if (isChecked) {
                        // If the checkbox is checked, click it to uncheck
                        cy.get('#cmn-toggle-2').click({ force: true });
                        cy.wait(200);
                    }
                });
            }

     generateRandomString (length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomString;
    }
    //Hall Of Shame
      createNewAppointmentCCPENewCard (time: string, serviceText: string, inputText: string): void {
              const thisTestFirstName = getThisTestFirstName();
              cy.get(this.plusButton).click().wait(1000);
              cy.get(this.flyOutSelectorElement).eq(0).click();
              cy.get(this.iconSelectorPreBooking).eq(0).click();
              cy.get(this.dateFieldToday).click();
              cy.get(this.iconSelectorPreBooking).eq(1).click();
              cy.get(this.hourSelector).contains(this.hourSelectorinDropDown, time).click();
              cy.get(this.inputField).eq(2).click().type(inputText || thisTestFirstName).wait(2000);
              cy.get(this.patientFromList).eq(0).click().wait(2000);
              // Calendar appointment window
              // Select service dropdown
              cy.get(this.dropDownArrow).eq(2).click().wait(2000);
              cy.get(this.selectService).contains(serviceText).click();
              cy.contains('Reason For Visit').next().click().type('test');
              cy.get('.o-switch').eq(0).click();
              cy.get(this.dropDownArrow).eq(3).click();
              cy.wait(1000).get(this.itemFromList).eq(0).click();
              cy.get(this.cardSelectDropdown).click();
              cy.get(this.cardSelect).contains('Add new card').click().wait(500);
              cy.get(this.cardNewName).click().clear().type('Alexandru Vlaicu').wait(500);
              cy.get(this.cardNewZip).click().type('30005').wait(500);
              cy.get(this.cardNewCard).click().wait(500).type('5556710470864589').wait(500)
              cy.get(this.cardNewCVV).click().type('508');
              cy.get(this.cardNewSave).click().wait(1000);
             }


}
export default Calendar;

