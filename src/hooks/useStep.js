import { useState } from "react"

const useStep = () => {
  
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = number => setCurrentStep(number)
  const prevStep = number => setCurrentStep(number)

  return { currentStep, nextStep, prevStep }
}

export default useStep