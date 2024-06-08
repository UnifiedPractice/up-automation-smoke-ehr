import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"
import PatientList from "../../PageObject/patient-list";
import OnboardingForms from "../../PageObject/clinic-settings/clinic-onboarding-forms";
import Calendar from "../../PageObject/calendar";
import ProductSale from "../../PageObject/product-sale";

describe('Automation test for UP-1272', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const patientList = new PatientList();
    const onboardingForms = new OnboardingForms();
    const calendar = new Calendar();
    const productSale = new ProductSale();



    it("UP-1272", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu()

        navigate.selectProductSale()
        productSale.findAndSelectPatient('test alexandru')
        productSale.findAndSelectProduct('test product')

        productSale.receivePayment()




    })

})
