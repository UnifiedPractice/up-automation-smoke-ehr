import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"

describe('Automation test for UP-3007', () => {
    const login = new LoginPage();
    const navigate = new SideBarNavigate();


    it("UP-3007", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu()

        navigate.selectBilling('Merchant Track')
    })

})