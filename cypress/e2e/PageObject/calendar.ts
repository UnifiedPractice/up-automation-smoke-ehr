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

public PlusButton: string = '.c-flyout';
public FlyOutSelectorElement: string = '.flyout__entry-name';


CreateNewAppointmentASAP(): void{
    cy.get(this.PlusButton).click().wait(1000);
    cy.get(this.FlyOutSelectorElement).eq(0).click();
}


}
export default Calendar


