/// <reference types="cypress" />
import { format } from 'date-fns'
import SideBarNavigate from "../PageObject/side-bar-menu"
import Calendar from "./calendar";
import calendar from "./calendar";
export const getDayMonthHour: string = format(new Date(), "MMMMddhmm")
const navigate = new SideBarNavigate();

class PatientList {

    private tabSelector: string = '.ui-tabs-anchor';
    private appointmentsIdSelector: string = '#ui-id-3';
    private billingIdSelector: string = '#ui-id-4';
    private formsIdSelector: string = '#ui-id-5';
    private insuranceIdSelector: string = '#ui-id-6';
    private personalIdSelector: string = '#ui-id-7';
    private messagesIdSelector: string = '#ui-id-8';
    private medicalIdSelector: string = '#ui-id-9';
    private filesIdSelector: string = '#ui-id-10';
    private emailField: string = '#emailAddPatient';
    private sendInviteModalSelector: string = '.js-send_pp_invite_btn';
    private sendInviteButtonSelector : string = '.js-sendInvite'
    private buttonPrimarySelector: string = '.btn-primary';
    private mainMenuPatientSelector: string = '.main-menu';
    private beginIntakeButton : string = '.intake-button.intake-none.js-beginIntake';
    private continueIntakeButton: string = '.intake-button.intake-opened.js-continueIntake.intake-arrive-ontime.js-intakeActionOnTime'
    private onTimeButton: string = '.intake-arrive-status.intake-arrive-ontime.js-intakeActionOnTime';
    private patientSelect: string = '.appointment-details';
    private greyBullet : string = '.appointment-status.status-none';
    private appointmentTab: string = '.js-appointmentInfo.clickable';
    private checkBoxBilling: string = '.select-box';
    private tabSelector: string = '.ui-tabs-anchor';
    private sendReminderSelector: string = '#btnSendReminder_PatientFile';
    private billingInfoSaveSelector: string ='.btn.button.default.no-select.pull-right.js-btnSave.js-btnSaveFooter'
    private receivePaymentSelector: string = '.button.default.no-select.js-receive_payment_btn';
    private applyCurrentVisitSelector: string = '.button.no-select.default.js-apply_to_current_visit';
    private superbillSelector: string = '.btn.button.default.superbill.no-select.pull-right.js-btn_superbill';
    private cancelButtonSelector: string = '.btn.button.no-select.pull-right.js-btnCancel';
    private cptFieldSelector : string = '#billingCPT_autocomplete';
    private dropdownCptSelector: string = '.tt-dropdown-menu';
    private chatIconSelector: string = '.icon-comment';
    private payerTypeSelector: string = '.btn-group.bootstrap-select.form-control.js-payerType';
    private methodTypeSelector: string = '.btn-group.bootstrap-select.form-control.js-paymentMethodType';
    private saveButtonPaymentModalSelector: string = '.button.no-select.default.js-save';
    private listCardSavedSelector: string = '.btn-group.bootstrap-select.form-control.js-savedCards';
    private chargeCardSelector: string = '.js-existingCardChargeBtn';


    const calendar= new Calendar();

    checkContinueBeginIntake(): void {
        cy.get('body').then($box => {
            const continueIntake = $box.text().includes('Continue Intake')
            if (continueIntake) {
                cy.get(this.continueIntakeButton).eq(0).click()
            }
            if(!continueIntake) {
                cy.get(this.beginIntakeButton).eq(0).click()
                cy.get(this.onTimeButton).eq(0).click()
            }
        }
        )}


    searchPatient(name: any): void{
        cy.get('.ui-state-default.ui-corner-top').eq(1).click()
        cy.intercept('https://staging.unifiedpractice.com/Public/PatientManagement/PatientList?PartialName=*').as('waiting')//here it will be implemented a intercept method for get all patients
        cy.get('#patientHint').click().type(name)
        cy.wait('@waiting')
        cy.wait(400)
        cy.get('.patient-box').eq(0).click().wait(1500)

    }

    addNewPatient(): void {
        cy.intercept('https://staging.unifiedpractice.com/Public/PatientManagement/AddPatient?_=*').as('patient');
        cy.contains('Add Patient').click();
        cy.wait('@patient')
        this.completeField('First Name','Automation Smoke'+getDayMonthHour);
        this.completeField('Last Name','Engineer'+getDayMonthHour);
        cy.get(this.emailField).click().type('engineer'+getDayMonthHour+'@email.com');
        cy.contains('Save').click()
        cy.contains('Patient added').should('be.visible');
    }

    addNewPatientforMatchingError(): void {
        cy.intercept('https://staging.unifiedpractice.com/Public/PatientManagement/AddPatient?_=*').as('patient');
        cy.contains('Add Patient').click();
        cy.wait('@patient')
        this.completeField('First Name','Automation'+getDayMonthHour);
        this.completeField('Last Name','Engineer'+getDayMonthHour);
        cy.get(this.emailField).click().clear().type('engineer'+getDayMonthHour+'@email.com');
        cy.contains('Save').click();

        navigate.selectAllClinicPatients();

        cy.wait(2500);
        cy.contains('Add Patient').click();
        cy.wait(1500);
        this.completeField('First Name','Automation'+getDayMonthHour+'1');
        this.completeField('Last Name','Engineer'+getDayMonthHour+'1');
        cy.get(this.emailField).click().clear().type('engineer'+getDayMonthHour+'@email.com');
        cy.contains('Save').click()

    }

    sendInviteForPP(): void {
        cy.wait(2600).get(this.sendInviteModalSelector).click();
        cy.wait(1600).get(this.sendInviteButtonSelector).click()
    }

    validateNewPPAccountEmail(): void{
        //Go to staging emails
        cy.visit('https://staging.unifiedpractice.com/dirlisting/d379136412c1476d9397f9ee3b606448/notifications')
        cy.contains('emails').invoke('removeAttr', 'target').click();
        cy.wait(500)
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('a').eq(7).invoke('removeAttr', 'target').click()
        cy.get('a').eq(0).invoke('removeAttr', 'target').click()
        
        this.completeField('Password', 'password')
        this.completeField('Confirm Password', 'password')
        cy.wait(5000)
        cy.get(this.buttonPrimarySelector).click({force:true})
    }

    completeField(name: string, content: any): void
    {
        cy.contains(name).next({force:true}).type(content);
    }

    goToFormsTab(): void {
        cy.get(this.mainMenuPatientSelector).within(() =>
            cy.get(this.formsIdSelector).click({force:true})
        )
    }

    goToMedicalTab(): void {
        cy.get(this.mainMenuPatientSelector).within(() =>
            cy.get(this.medicalIdSelector).click({force:true})
        )
    }

    goToPersonalTab(): void{
        cy.wait(3000).get(this.mainMenuPatientSelector).within(() =>
            cy.wait(3500).get(this.personalIdSelector).click({force:true})
        )

    }

    selectFirstPatientByDate(): void{
        cy.get(this.greyBullet).eq(0).should('be.visible').click()
    }

    selectPatientAlexandru(): void{
        cy.contains('.appointment-box.clearfix','test alexandru').should('be.visible').click()
    }

    beginIntakeAndCloseAndSign() : void {
        this.selectFirstPatientByDate();
        cy.intercept('https://staging.unifiedpractice.com/Public/Intake/BeginIntake?CalendarAppointmentId=**').as('intakeIntercept')
        this.checkContinueBeginIntake();
        cy.contains('Close and Sign').should('be.visible').click()
        cy.wait('@intakeIntercept')
        cy.contains('Unlock').should('be.visible')
    }


    beginIntakeAndPrint(): void {
        this.selectFirstPatientByDate();
        cy.intercept('https://staging.unifiedpractice.com/Public/Intake/BeginIntake?CalendarAppointmentId=**').as('intakeIntercept')
        this.checkContinueBeginIntake();
        cy.contains('Close and Sign').click()
        cy.wait('@intakeIntercept')
        cy.contains('Print').click();
    }

    printSuperbills(): void {
        this.selectFirstPatientByDate();
        cy.intercept('https://staging.unifiedpractice.com/Public/PatientManagement/GetAppointmentInfo?calendarAppointmentId=**').as('apptIntercept')
        cy.get(this.appointmentTab).eq(0).click()
        cy.wait('@apptIntercept')
        cy.contains('Superbill').click();

    }

    checkVisibilityPersonalDetails(details:string) : void {
        cy.wait(500).contains(details).should('exist')
    }

    generateStatements(): void{
        this.selectFirstPatientByDate();
        cy.intercept('https://staging.unifiedpractice.com/Public/PatientManagement/PatientFileBillingTab?patientId=**').as('billingIntercept')
        cy.intercept('https://staging.unifiedpractice.com/Public/Billing/BootgridBillingListByAppointment').as('visitsIntercept')
        cy.get(this.tabSelector).eq(3).click({force:true})
        cy.wait('@billingIntercept')
        cy.wait('@visitsIntercept')
        cy.get(this.checkBoxBilling).eq(0).check({force:true});
        cy.contains('Generate patient statements').click();
    }

    sendReminder(): void {
        this.selectFirstPatientByDate();
        cy.intercept('https://staging.unifiedpractice.com/Public/PatientManagement/PatientFileFormsTab?patientId=**').as('formsIntercept')
        cy.get(this.tabSelector).eq(4).click({force:true})
        cy.wait('@formsIntercept');
        cy.get(this.sendReminderSelector).should('be.visible').click();
        cy.contains('Reminder was sent').should('be.visible')
    }

    addCPTCodeAndReceivePayment():void {
        this.selectFirstPatientByDate();
        cy.get(this.appointmentTab).eq(0).click()
        cy.contains('Billing Status').should('be.visible')
        cy.get(this.cptFieldSelector).click({force:true}).type('97810');
        cy.get(this.dropdownCptSelector).each(() => {
            cy.contains('Acupuncture').first().should('be.visible').click({force:true});
        })
        cy.get(this.billingInfoSaveSelector).click();
        cy.contains('The changes have been saved').should('be.visible')
        cy.get(this.receivePaymentSelector).click();
        //Receive payment window
        cy.get(this.payerTypeSelector).should('be.visible').click();

        cy.get('.js-receivePaymentForm').within(() => {
            cy.contains('li', 'Patient').within(() => {
                cy.get('a').click();
            });

        cy.get(this.methodTypeSelector).should('be.visible').click();
            cy.contains('li', 'Cash').within(() => {
                cy.get('a').click();
            });

        });
        cy.wait(500).get(this.applyCurrentVisitSelector).should('be.visible').click();

        cy.get('.form-control.js-amountApplied.js-amountAppliedServices.text-right').scrollIntoView().should('be.visible').click().type('10');
        cy.get(this.saveButtonPaymentModalSelector).should('be.visible').click();
    }

    addCPTCodeAndReceivePaymentwithCard():void {
        this.selectFirstPatientByDate();
        cy.get(this.appointmentTab).eq(0).click()
        cy.contains('Billing Status').should('be.visible')
        cy.get(this.cptFieldSelector).click({force:true}).type('97810');
        cy.get(this.dropdownCptSelector).each(() => {
            cy.contains('Acupuncture').first().should('be.visible').click({force:true});
        })
        cy.get(this.billingInfoSaveSelector).click();
        cy.contains('The changes have been saved').should('be.visible')
        cy.get(this.receivePaymentSelector).click();
        //Receive payment window
        cy.get(this.payerTypeSelector).should('be.visible').click();

        cy.get('.js-receivePaymentForm').within(() => {
            cy.contains('li', 'Patient').within(() => {
                cy.get('a').click();
            });

            cy.get(this.methodTypeSelector).should('be.visible').click();
            cy.contains('li', 'Credit/Debit Card').within(() => {
                cy.get('a').click();
            });

            cy.get(this.listCardSavedSelector).should('be.visible').click();
            cy.contains('li', 'Card-4422').within(() => {
                cy.get('a').click();
            });
            cy.get(this.chargeCardSelector).should('be.visible').click()

        });
        cy.wait(500).get(this.applyCurrentVisitSelector).should('be.visible').click();

        cy.get('.form-control.js-amountApplied.js-amountAppliedServices.text-right').scrollIntoView().should('be.visible').click().type('1');
        cy.get(this.saveButtonPaymentModalSelector).should('be.visible').click();
        // cy.wait(500).get(this.applyCurrentVisitSelector).should('be.visible').click();

    }


    createClaim():void {
        this.selectFirstPatientByDate();
        cy.intercept('https://staging.unifiedpractice.com/Public/PatientManagement/GetAppointmentInfo?calendarAppointmentId=**').as('apptIntercept')
        cy.get(this.appointmentTab).eq(0).should('be.visible').click()
        cy.wait('@apptIntercept')
        cy.get(this.cancelButtonSelector).scrollIntoView()
        cy.contains('View Claim', { timeout: 0 }).then($viewClaim => {
            if ($viewClaim.length > 0 && $viewClaim.is(':visible')) {
                cy.wrap($viewClaim).click();
            } else {
                cy.contains('Create Claim').click();
                cy.contains('Claim successfully created').should('be.visible');
            }
        });
    }

    generateSuperbill():void {
        this.selectFirstPatientByDate();
        cy.intercept('https://staging.unifiedpractice.com/Public/PatientManagement/GetAppointmentInfo?calendarAppointmentId=**').as('apptIntercept')
        cy.get(this.appointmentTab).eq(0).click()
        cy.wait('@apptIntercept')
        cy.get(this.cancelButtonSelector).scrollIntoView()
        cy.get(this.superbillSelector).click();
    }

    clickOnChatIcon(): void {
        cy.get(this.chatIconSelector).should('be.visible').click({force:true});
    }

}

export default PatientList
