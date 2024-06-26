import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import Calendar from "../../PageObject/calendar";
import PatientList from "../../PageObject/patient-list";


describe('Automation test for UP-2017', () => {
    const login = new LoginPage();
    const navigate = new SideBarNavigate();
    const calendar= new Calendar();
    const patientList= new PatientList();

    it("UP-2017", function () {
        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();
        navigate.selectCalendar()
        calendar.CreateNewAppointmentASAP();
        navigate.selectMyPatientsfromCalendarWindow();
        patientList.sendReminder();
    })

})
