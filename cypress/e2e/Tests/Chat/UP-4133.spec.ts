import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"


describe('Automation test for UP-4133', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();

 
    it("UP-4133", function () {

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
        pp.openChatwithPractitioner()

    })

})
