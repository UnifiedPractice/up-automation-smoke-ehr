import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import Calendar from "../../PageObject/calendar";

    describe('Automation test for UP-3006', () => {
        const login = new LoginPage();
        const navigate = new SideBarNavigate();
        const calendar = new Calendar();

        it("UP-3006", function () {
            login.goToStaging();
            login.loginAutomation();

            navigate.extendMenu();
            navigate.selectCalendar();

            calendar.createandCancelAppointmentwithCCPE();
        })
    })
