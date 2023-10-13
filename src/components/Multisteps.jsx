import { useState } from "react";
import Stepper from "./multistep/Stepper";
import StepperControl from "./multistep/StepperControl";
import { UseContextProvider } from "../context/StepperContext";
import BookingPayment from './BookingPayment';
import { Link, useParams } from 'react-router-dom';
import Payment from './Payment';

import Final from "./multistep/steps/Final";

function  Multisteps() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Account Information",
   
    "Payment",
   
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <BookingPayment />;
      case 2:
        return <Payment />;
     
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="mx-auto rounded-2xl bg-primary pb-2 shadow-xl md:w-full">
      {/* Stepper */}
      <div className="horizontal container mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className=" ">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>
      </div>

      {/* navigation button */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>
  );
}

export default Multisteps;
