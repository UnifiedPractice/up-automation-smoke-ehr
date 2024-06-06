import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"
import Chat from "../../PageObject/chat";


describe('Automation test for UP-4134', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const chat = new Chat();


    it("UP-4134", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();
        navigate.selectLiveChat();
        chat.sendMessageFromEHR();

        navigate.goToCalendarAndPPfromChat();

        pp.openPP();
        pp.checkLogin();
        pp.proceedLogin();
        pp.openChat();
        pp.checkMessageInEHR();


    })

})
