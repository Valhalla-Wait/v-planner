import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import useStep from "../../hooks/useStep";
import VendorAboutCompanyForm from "../Forms/Vendor/VendorAboutCompanyForm";
import VendorCompanyInformationForm from "../Forms/Vendor/VendorCompanyInformationForm";
import VendorCreatePasswordForm from "../Forms/Vendor/VendorCreatePasswordForm";
import VendorPersonalInfarmationForm from "../Forms/Vendor/VendorPersonalInfarmationForm";
import VendorPhotoAndVideoForm from "../Forms/Vendor/VendorPhotoAndVideoForm";
import VendorServiceDetailsForm from "../Forms/Vendor/VendorServiceDetailsForm";
import VendorSocialNetvorksForm from "../Forms/Vendor/VendorSocialNetvorksForm";
import Logo from "../UI/Logo";
import ModalMiddleContent from "../UI/Modal/ModalMiddleContent";
import { Step, StepProgress, StepContent, StepTab } from "../UI/Step";
import { useState } from "react";
import SignInVendorModal from "./SignInVendorModal";
import SignUpUserModal from "./SignUpUserModal";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../../Store/Actions/VendorSignUp";
import axios from "axios";

const SignUpVendorModal = () => {
  const auth = useContext(AuthContext);
  const modal = useContext(ModalContext);
  const dispatch = useDispatch();
  const step = useStep();
  const [step1, setStep1] = useState("");
  const [step2, setStep2] = useState("");
  const [step3, setStep3] = useState("");
  const [step4, setStep4] = useState("");
  const [step5, setStep5] = useState("");
  const [step6, setStep6] = useState("");
  const signInVendor = () => modal.setContent(<SignInVendorModal />);
  const signUpUser = () => modal.setContent(<SignUpUserModal />);

  const laoding = useSelector(state => state.vendorInfo.loading)

  console.log(step3)

  const nextStep = (number) => {
    step.nextStep(number);
  };

  const vendorData = useSelector((state) => state.vendorInfo.vendorData);

  const relogin = (email, password) => {
    auth.login(email, password)
  }

  const signIn = (data) => {
    const req = {
      ...step1,
      ...step2,
      ...step3,
      ...step4,
      images: step5,
      ...step6,
      ...data,
    };
    // debugger
    console.log('SIGNIN DATA', req)
    dispatch(signUpAction(req, relogin));
    if(!laoding) {
      modal.destroy();
    }
    
  };

  console.log(step1)


  const serviceTypes = [
    {
      value: [{
        id: 1,
        name: "Photographer"
      }],
      label: "Photographer"
    },
    {
      value: [{
        id: 2,
        name: "Engineer"
      }],
      label: "Engineer"
    },
    {
      value: [{
        id: 3,
        name: "Seller"
      }],
      label: "Seller"
    }
  ]
  // console.log(serviceTypes)

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: `${process.env.REACT_APP_API_URL}/service-type/get-all`,
  //     headers: { "Content-Type": "multipart/form-data", "Access-Control-Allow-Origin": "*", Authorization: `Bearer ${localStorage.getItem("token")}` },
  //   }).then((res) => setServiceTypes(res.data.result))
  // }, [])


  const titleList = [
    "Personal Information",
    "Company",
    "Service Details",
    "About Company",
    "Photo And Video",
    "Social Networks",
    "Create Password",
  ];

  const subTitleList = [
    "All fields are required",
    "All fields are required",
    "You can fill in these fields later",
    "You can fill in these fields later",
    "You can fill in these fields later",
    "You can fill in these fields later",
    "All fields are required",
  ];

  return (
    <ModalMiddleContent>
      <div className="middle-modal__header">
        <Logo className="middle-modal__logo" />
        <h4 className="middle-modal__title">{titleList[step.currentStep]}</h4>
      </div>
      <div className="middle-modal__body">
        <Step>
          <StepProgress
            stepCount={7}
            currentStep={step.currentStep}
            text={subTitleList[step.currentStep]}
          />
          <StepContent stepCount={7} currentStep={step.currentStep}>
            <StepTab stepNumber={0} currentStep={step.currentStep}>
              <VendorPersonalInfarmationForm
                onCallback={(data) => {
                  console.log(data)
                  setStep1(data);
                  nextStep(1);
                }}
              />
            </StepTab>
            <StepTab stepNumber={1} currentStep={step.currentStep}>
              <VendorCompanyInformationForm
                onCallback={(data) => {
                  setStep2(data);
                  nextStep(2);
                }}
                onBack={() => nextStep(0)}
                serviceTypes={serviceTypes}
              />
            </StepTab>
            <StepTab stepNumber={2} currentStep={step.currentStep}>
              <VendorServiceDetailsForm
                onCallback={(data) => {
                  console.log("data in step 3", data);
                  setStep3(data);
                  nextStep(3);
                }}
                onNext={() => nextStep(3)}
                onBack={() => nextStep(1)}
                serviceTypes={serviceTypes}
              />
            </StepTab>
            <StepTab stepNumber={3} currentStep={step.currentStep}>
              <VendorAboutCompanyForm
                onCallback={(data) => {
                  console.log("data in step 3", data);
                  setStep4(data);
                  nextStep(4);
                }}
                onBack={() => nextStep(2)}
              />
            </StepTab>
            <StepTab stepNumber={4} currentStep={step.currentStep}>
              <VendorPhotoAndVideoForm
                onCallback={(data) => {
                  setStep5(data);

                  console.log("data in step 4", data);
                  nextStep(5);
                }}
                onBack={() => nextStep(3)}
              />
            </StepTab>
            <StepTab stepNumber={5} currentStep={step.currentStep}>
              <VendorSocialNetvorksForm
                onCallback={(data) => {
                  setStep6(data);

                  console.log("data in step 5", data);
                  nextStep(6);
                }}
                onBack={() => nextStep(4)}
              />
            </StepTab>
            <StepTab stepNumber={6} currentStep={step.currentStep}>
              <VendorCreatePasswordForm
                onCallback={signIn}
                onBack={() => nextStep(5)}
              />
            </StepTab>
          </StepContent>
        </Step>
      </div>
      {step.currentStep === 0 && (
        <div className="middle-modal__footer">
          <div>
            Already a member?{" "}
            <span className="middle-modal__link" onClick={signInVendor}>
              Sign In
            </span>
          </div>
          <div>
            Sign up as{" "}
            <span className="middle-modal__link" onClick={signUpUser}>
              User
            </span>
          </div>
        </div>
      )}
    </ModalMiddleContent>
  );
};

export default SignUpVendorModal;
