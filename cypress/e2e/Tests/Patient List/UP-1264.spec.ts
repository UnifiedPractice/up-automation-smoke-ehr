import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"
import ClinicLocations from "../../PageObject/clinic-settings/clinic-locations"
import BasePage from "../../PageObject/base-page"
import DrawerModal from "../../PageObject/drawer-modal"
import Calendar from "../../PageObject/calendar";
import PatientList from "../../PageObject/patient-list";


describe('Automation test for UP-1264', () => {
    const login = new LoginPage();
    const navigate = new SideBarNavigate();
    const calendar= new Calendar();
    const patientList= new PatientList();

    it("UP-1264", function () {
        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();
        navigate.selectCalendar()
        calendar.CreateNewAppointmentASAP();
        navigate.selectMyPatientsfromCalendarWindow();

        patientList.beginIntakeAndPrint();




    })

})
