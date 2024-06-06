//This class will be used for any test written throughout the project;
// the general methods are written here

/// <reference types="cypress" />
import { cloneWith } from "../../../node_modules/cypress/types/lodash/index";
import ClinicLocations from "./clinic-settings/clinic-locations";
import DrawerModal from "./drawer-modal";
import SideBarNavigate from "./side-bar-menu";


class BasePage {

public formSelector: string = '.row.justify-content-between.align-items-center';
public sliderSelector: string = '.o-switch';
public exportSelector: string = '.btn.btn-outline.btn-primary.custom-transparent-btn'


    chooseService(name:string) : void {
        cy.get('.cmtContent-update').contains(name).parent().find('.col-sm-1').click();
        }

    chooseStaff(name:string) : void {
        cy.get('.staff-row').contains(name).parent().find('.col-sm-1').click();
        }

    setToOn(name: string): void {
        cy.wait(1200)
        cy.get(this.formSelector).contains(name).parent().find(this.sliderSelector).then(($button) => {
            if ($button.hasClass('redClass')) {
                cy.get(this.formSelector).contains(name).parent().find(this.sliderSelector).click({force:true});
            } 
          })
    }
    
     setToOff(name: string): any {
         cy.wait(1200)
         cy.get(this.formSelector).contains(name).parent().find(this.sliderSelector).then(($button) => {
            if ($button.hasClass('greenClass')) {
                cy.get(this.formSelector).contains(name).parent().find(this.sliderSelector).click({force:true});
            } 
          })
     }

    completeField(name: string, content: any): void
    {
        cy.contains(name).next().click().type(content, { force: true });
        cy.wait(2000);
    }

    exportElement(): void{
        cy.get(this.exportSelector).click().wait(3000);
    }
     backtoEHR(): void{
        cy.visit('https://staging.unifiedpractice.com/Public/Dashboard/Index')
     }



}
export default BasePage
