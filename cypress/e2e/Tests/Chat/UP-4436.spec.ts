import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"
import patientList from "../../PageObject/patient-list";
import Chat from "../../PageObject/chat";
import Calendar from "../../PageObject/calendar";
import PatientList from "../../PageObject/patient-list";


describe('Automation test for UP-4436', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const chat = new Chat();
    const calendar = new Calendar();
    const patientList = new PatientList() ;

    it("UP-4436", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();
        navigate.selectCalendar()
        calendar.createNewAppointmentwithPPPatient();







    })

})
