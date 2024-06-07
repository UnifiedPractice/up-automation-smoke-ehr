import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"
import ClinicLocations from "../../PageObject/clinic-settings/clinic-locations"
import BasePage from "../../PageObject/base-page"
import DrawerModal from "../../PageObject/drawer-modal"
import Calendar from "../../PageObject/calendar";


describe('Automation test for UP-2487', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicLocations = new ClinicLocations();
    const basePage = new BasePage();
    const drawerModal = new DrawerModal();
    const calendar= new Calendar();

    it("UP-2487", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();
        navigate.selectCalendar();

        calendar.calendarSendReminder('Automation');


    })

})
