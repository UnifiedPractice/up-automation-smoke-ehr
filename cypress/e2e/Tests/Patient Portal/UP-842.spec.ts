import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"
import ClinicStaff from "../../PageObject/clinic-settings/clinic-staff"
import ClinicServices from "../../PageObject/clinic-settings/clinic-services"
import DrawerModal from "../../PageObject/drawer-modal";
import ClinicLocations from "../../PageObject/clinic-settings/clinic-locations";
import BasePage from "../../PageObject/base-page";


describe('Automation test for UP-842', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const clinicLocations = new ClinicLocations();
    const drawerModal = new DrawerModal();
    const basePage = new BasePage();
    const clinicServices = new ClinicServices();
    const clinicStaff = new ClinicStaff();


    it("UP-842", function () {

        login.goToStaging();
        login.loginAutomationPP();

        navigate.extendMenu();

        navigate.selectCS('Clinic Staff');
        clinicStaff.clickOnDetails('Automation Tests');
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AllowOnlineScheduling')
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AutoAcceptAppointments')
        clinicStaff.saveButton();
        navigate.extendMenu();
        navigate.selectCS('Clinic Staff');
        clinicStaff.clickOnDetails('Automation Engineer');
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AllowOnlineScheduling')
        clinicStaff.checkBoxSliderSetOn('#PractitionerInfo_AutoAcceptAppointments')
        clinicStaff.saveButton();

        navigate.selectCS('Locations');
        clinicLocations.chooseAutomation();
        basePage.setToOn('Clinic location is active?');
        basePage.setToOn('Allow Online Scheduling?');
        drawerModal.saveButton();

        navigate.selectCS('Clinic Services');
        clinicServices.chooseService('Automation with CCPE')
        clinicServices.checkBoxSliderSetOn('#Service_IsActive')
        clinicServices.checkBoxSliderSetOn('#Service_AllowOnlineScheduling')
        drawerModal.saveButton();

        navigate.selectPP();

        pp.setToOn('Allow patients to book appointments online');
        pp.roundAvailabilities('30 min');
        pp.saveButton();
        pp.openPP();
        pp.checkLogin();
        pp.proceedLogin();
        pp.checkRoundAvailabilities();
        pp.setAvailabilitiesIntervalToCheckFor30Minutes();
        pp.proceedFinishAppointmentAfterCheckInterval();
    })

})
