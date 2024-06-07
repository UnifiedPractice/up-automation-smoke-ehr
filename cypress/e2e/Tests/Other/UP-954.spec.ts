import LoginPage from "../../PageObject/login-page"
import SideBarNavigate from "../../PageObject/side-bar-menu"
import PatientPortal from "../../PageObject/patient-portal"
import PatientList from "../../PageObject/patient-list";
import OnboardingForms from "../../PageObject/clinic-settings/clinic-onboarding-forms";
import Calendar from "../../PageObject/calendar";

describe('Automation test for UP-954', () => {
    const login = new LoginPage();
    const pp = new PatientPortal() ;
    const navigate = new SideBarNavigate();
    const patientList = new PatientList();
    const onboardingForms = new OnboardingForms();
    const calendar = new Calendar();


    it("UP-954", function () {

        login.goToStaging();
        login.loginAutomation();

        navigate.extendMenu()

        navigate.selectCS('Onboarding Forms');
        onboardingForms.addNewFormandActivate()

        navigate.selectCalendar();
        calendar.createNewAppointmentforReminder();

        navigate.selectMyPatientsfromCalendarWindow()
        patientList.sendReminder();
        onboardingForms.checkReminderEmail();



    })

})
