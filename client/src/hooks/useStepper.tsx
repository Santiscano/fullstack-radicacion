import { useState } from 'react'

const useStepper = () => {
  //-------------------- var --------------------------------//
  const [steps, setSteps] = useState<string[]>([]) // este valor se define con la lista de titulos
  const stepStyle = {
    flexWrap:"wrap",
    marginBottom:"20px",
    "& .Mui-active": {
      "& .MuiStepIcon-root": {
        color: "#3c7461",
      }
    },
    "& .MuiStepLabel-label": {},
    "& .Mui-completed":{
      "& .MuiStepIcon-root": {
        color: "#3c7461",
      },
      "& .MuiStepLabel-label":{
        color: "#3c7461",
        fontWeight: "700"
      },
    },
  };
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  //-------------------- methods ----------------------------//
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return {
    steps,
    setSteps,
    stepStyle,
    activeStep,
    isStepSkipped,
    isStepOptional,
    handleReset,
    handleBack,
    handleNext,
    handleSkip,
  }
}

export default useStepper
