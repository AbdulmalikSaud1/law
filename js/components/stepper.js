// components/stepper.js - خطوات المعالج

function initStepper() {
    updateStepperUI();
}

function updateStepperUI() {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < AppData.currentStep) {
            step.classList.add('completed');
        } else if (index + 1 === AppData.currentStep) {
            step.classList.add('active');
        }
    });
    
    // تحديث أزرار التنقل
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.style.visibility = AppData.currentStep === 1 ? 'hidden' : 'visible';
    }
    
    if (nextBtn) {
        if (AppData.currentStep === AppData.totalSteps) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'inline-flex';
        }
    }
}

function nextStep() {
    if (AppData.currentStep < AppData.totalSteps) {
        AppData.currentStep++;
        updateStepContent();
        updateStepperUI();
    }
}

function prevStep() {
    if (AppData.currentStep > 1) {
        AppData.currentStep--;
        updateStepContent();
        updateStepperUI();
    }
}

function updateStepContent() {
    const stepContent = document.getElementById('step-content');
    switch(AppData.currentStep) {
        case 1:
            stepContent.innerHTML = renderStep1();
            break;
        case 2:
            stepContent.innerHTML = renderStep2();
            break;
        case 3:
            stepContent.innerHTML = renderStep3();
            initFileUpload();
            break;
        case 4:
            stepContent.innerHTML = renderStep4();
            break;
    }
}