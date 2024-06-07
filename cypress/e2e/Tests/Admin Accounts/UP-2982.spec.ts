import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"
import ClinicLocations from "../../PageObject/clinic-settings/clinic-locations"
import BasePage from "../../PageObject/base-page"
import DrawerModal from "../../PageObject/drawer-modal"
import Calendar from "../../PageObject/calendar";
import { getThisTestFirstName } from "../../PageObject/new-patient";

describe('Automation test for UP-2982', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicLocations = new ClinicLocations();
    const basePage = new BasePage();
    const drawerModal = new DrawerModal();
    const calendar= new Calendar();
    const firstName = getThisTestFirstName();

    it("UP-2982", function () {

        login.goToStaging();
        login.loginPPNCFPCCPE();

        navigate.extendMenu();
        navigate.selectCalendar();

        calendar.createNewPatient();
        calendar.createNewAppointmentCCPENewCard ('02:00 PM', 'Service with CCPE', firstName);

    })

})