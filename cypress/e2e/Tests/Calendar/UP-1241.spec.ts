import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
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

        calendar.createNewAppointmentASAP();


    })

})
