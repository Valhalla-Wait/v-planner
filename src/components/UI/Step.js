export const Step = ({ children }) => {
  return (
    <div className="step">{ children }</div>
  )
}

export const StepProgress = ({ stepCount, currentStep, text }) => {
  return (
    <div className="step__progress progress-step">
      <div className="progress-step__title">{ text }</div>
      <div className="progress-step__list">
        {
          Array.from(new Array(stepCount)).map((_, i) => {
            const classes = i > currentStep ? "progress-step__item" : "progress-step__item  active"
            return (
              <div
                className={classes}
                key={i}
              ></div>
            )
          })
        }
      </div>
    </div>
  )
}

export default StepProgress

export const StepContent = ({ stepCount, currentStep, children }) => {
  const marginLeft =  `-${100 * currentStep}%`
  const width = `${100 * stepCount}%`
  return (
    <div className="step__content">
      <div className="step__screens" style={{marginLeft, width}}>
        { children }
      </div>
    </div>
  )
}

export const StepTab = ({ stepNumber, currentStep, children }) => {
  const classes = stepNumber === currentStep ? "step__tab active" : "step__tab"
  return (
    <div className={classes}>{ children }</div>
  )
}