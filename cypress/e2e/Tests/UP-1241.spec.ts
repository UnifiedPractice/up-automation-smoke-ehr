import LoginPage from "../PageObject/login-page"
import SideBarNavigate from "../PageObject/side-bar-menu"
import PatientPortal from "../PageObject/patient-portal"
import ClinicLocations from "../PageObject/clinic-settings/clinic-locations"
import BasePage from "../PageObject/base-page"
import DrawerModal from "../PageObject/drawer-modal"
import Calendar from "../PageObject/calendar";


describe('Automation test for UP-1241', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicLocations = new ClinicLocations();
    const basePage = new BasePage();
    const drawerModal = new DrawerModal();
    const calendar= new Calendar();

    it("UP-1241", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();
        navigate.selectCalendar();

        calendar.CreateNewAppointmentASAP();

        cy.wait(30000);
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

})
