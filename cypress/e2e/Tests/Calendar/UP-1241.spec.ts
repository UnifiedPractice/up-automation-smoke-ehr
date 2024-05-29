import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"
import ClinicLocations from "../../PageObject/clinic-settings/clinic-locations"
import BasePage from "../../PageObject/base-page"
import DrawerModal from "../../PageObject/drawer-modal"
import Calendar from "../../PageObject/calendar";


describe('Automation test for UP-1241', () => {
    const login = new LoginPage();
    const navigate = new SideBarNavigate();
    const calendar= new Calendar();

    it("UP-1241", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();
        navigate.selectCalendar();

        calendar.CreateNewAppointmentASAP();


    })

})
