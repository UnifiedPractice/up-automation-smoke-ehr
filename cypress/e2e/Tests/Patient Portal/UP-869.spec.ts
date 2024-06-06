import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"


describe('Automation test for UP-869', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();

 
    it("UP-869", function () {

        login.goToStaging();
        login.loginAutomationPP();

        navigate.extendMenu();

        navigate.extendMenu()
        navigate.selectPP();
        pp.openPP();
        pp.checkLogin();
        pp.proceedLogin();
        pp.goToMyAccount();
        pp.activateSMSNotifications();

    })

})
