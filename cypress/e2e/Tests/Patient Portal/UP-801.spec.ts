import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"
import ClinicLocations from "../../PageObject/clinic-settings/clinic-locations"
import BasePage from "../../PageObject/base-page"
import DrawerModal from "../../PageObject/drawer-modal"


describe('Automation test for UP-801', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicLocations = new ClinicLocations();
    const basePage = new BasePage();
    const drawerModal = new DrawerModal();

    it("UP-801", function () {
        login.goToStaging();
        login.loginAutomationPP();

        navigate.extendMenu();
        navigate.selectCS('Locations');
        clinicLocations.chooseAutomation();

        basePage.setToOn('Clinic location is active?');
        basePage.setToOn('Allow Online Scheduling?');

        drawerModal.saveButton();

        navigate.extendMenu();

        navigate.selectPP();
        pp.openPP();

        cy.log('Have you been to any of our clinics before? (Select YES)');
        pp.checkLogin();
        pp.selectRadio(1);
        pp.shouldBeVisible('Automation Location')

    })



       // pp.openPP();
       // pp.checkLogin();
        //pp.loginCredentials('testalex12@test.com','password')
        //pp.pressLogin();
       // pp.checkSuccessLogin();


          // END OF UP-801


    // it("UP-802", function() {
    //     const pp = new PatientPortal() ;
    //     const navigate = new SideBarNavigate();
    //     const clinicLocations = new ClinicLocations();
    //     const login = new LoginPage();

    //     login.goToStaging();
    //     login.loginPPNCFPCCPE();
    //     cy.contains('Login').click();
    //     navigate.selectCS('Locations');
    //     cy.wait(1300);
    //             //clinicLocations.editLocation(0);
    //             //cy.wait(2500);
    //     clinicLocations.chooseAutomation();
    //     clinicLocations.setToOff(0);
    //     clinicLocations.saveButton();
    //     navigate.extendMenu();
    //     navigate.selectPP();
    //     pp.openPP();
    //     pp.checkLogin();
    //     pp.selectRadio(1);
    //     pp.shouldNotBeVisible('Automation Location')
        

    // })

})
