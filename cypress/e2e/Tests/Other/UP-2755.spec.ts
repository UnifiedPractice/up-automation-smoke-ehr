import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import Calendar from "../../PageObject/calendar";
import ProductSale from "../../PageObject/product-sale";
import PaymentList from "../../PageObject/billing/payment-list";

    describe('Automation test for UP-2755', () => {
        const login = new LoginPage();
        const navigate = new SideBarNavigate();
        const calendar = new Calendar();
        const productSale = new ProductSale();
        const paymentList = new PaymentList();

        it("UP-2755", function () {

            login.goToStaging();
            login.loginAutomation();

            navigate.extendMenu()

            navigate.selectProductSale()
            productSale.findAndSelectPatient('test alexandru')
            productSale.findAndSelectProduct('test product')

            productSale.receivePayment()
            productSale.continueReceivePaymentforRefund();

            navigate.selectBillingfromProductSale('Payment List')

            paymentList.proceedRefund();

        })

    })