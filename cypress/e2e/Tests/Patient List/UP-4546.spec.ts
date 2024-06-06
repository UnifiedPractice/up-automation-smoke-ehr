import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import Calendar from "../../PageObject/calendar";
import PatientList from "../../PageObject/patient-list";


describe('Automation test for UP-4546', () => {
    const login = new LoginPage();
    const navigate = new SideBarNavigate();
    const calendar= new Calendar();
    const patientList= new PatientList();

    it("UP-4546", function () {
        cy.viewport(1920,1080)
        login.goToStaging();
        login.loginAutomationSmokeUniversity();

        navigate.extendMenu();
        navigate.selectCalendar()
        calendar.CreateNewAppointmentOnUniversities();
        navigate.extendMenuforUniversities();
        navigate.selectMyPatientsOnUniversities();
    })

})
