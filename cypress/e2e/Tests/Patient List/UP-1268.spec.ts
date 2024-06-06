import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import Calendar from "../../PageObject/calendar";
import PatientList from "../../PageObject/patient-list";


describe('Automation test for UP-1268', () => {
    const login = new LoginPage();
    const navigate = new SideBarNavigate();
    const patientList= new PatientList();

    it("UP-1268", function () {
        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();
        navigate.selectMyPatients();
        patientList.addNewPatient();
    })

})
