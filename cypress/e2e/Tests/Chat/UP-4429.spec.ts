import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"
import patientList from "../../PageObject/patient-list";
import Chat from "../../PageObject/chat";


describe('Automation test for UP-4429', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const chat = new Chat();

    it("UP-4429", function () {

        login.goToStaging();
        login.loginEnhanced();

        navigate.extendMenu();
        navigate.selectLiveChat();

        chat.sendMessageToTeammateasEnhanced();

    })

})
