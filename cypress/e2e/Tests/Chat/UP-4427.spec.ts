import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"
import patientList from "../../PageObject/patient-list";
import Chat from "../../PageObject/chat";


describe('Automation test for UP-4427', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const chat = new Chat();

    it("UP-4427", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu();
        navigate.selectPP();

        pp.setToOn('Allow patients to book appointments online');
        pp.setToOn('Chat messages for your patients available in Patient Portal (file sharing remains available)')
        pp.saveButton();
        pp.openPP();
        pp.checkLogin();
        pp.proceedLogin();
        pp.openChat();
        pp.openChatwithFrontdesk();
        pp.sendRandomMessageinChat();
        pp.backtoEHR();

        login.logoutFromEHR();
        login.loginFrontDesk();

        navigate.extendMenu();
        navigate.selectLiveChat();

        chat.checkMessageAsFrontDesk();

    })

})