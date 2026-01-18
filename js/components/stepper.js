// components/stepper.js - خطوات المعالج

function initStepper() {
    AppData.currentStep = 1; // إعادة تعيين الخطوة عند فتح الصفحة
    AppData.verificationStatus.status = 'pending'; // إعادة تعيين حالة التحقق
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
            
            // التحقق من إمكانية المتابعة في خطوة التحقق
            if (AppData.currentStep === 4) {
                const isVerified = AppData.verificationStatus.status === 'verified';
                nextBtn.disabled = !isVerified;
                nextBtn.style.opacity = isVerified ? '1' : '0.5';
                nextBtn.style.cursor = isVerified ? 'pointer' : 'not-allowed';
                nextBtn.title = isVerified ? '' : 'يجب إتمام التحقق أولاً';
            } else {
                nextBtn.disabled = false;
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
                nextBtn.title = '';
            }
        }
    }
}

function nextStep() {
    // منع المتابعة إذا لم يتم التحقق في الخطوة 4
    if (AppData.currentStep === 4 && AppData.verificationStatus.status !== 'verified') {
        showNotification('يجب إتمام التحقق قبل المتابعة', 'warning');
        return;
    }
    
    if (AppData.currentStep < AppData.totalSteps) {
        AppData.currentStep++;
        updateStepContent();
        updateStepperUI();
        
        // التمرير لأعلى الصفحة
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function prevStep() {
    if (AppData.currentStep > 1) {
        AppData.currentStep--;
        updateStepContent();
        updateStepperUI();
        
        // التمرير لأعلى الصفحة
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        case 5:
            stepContent.innerHTML = renderStep5();
            break;
    }
}