// pages/requests.js - صفحة تقديم الطلبات مع المساعد الذكي

// بيانات المساعد الذكي
const SmartAssistantData = {
    isActive: false,
    currentQuestion: 0,
    answers: {},
    questions: [
        {
            id: 'problem_type',
            question: 'ما هي طبيعة المشكلة التي تواجهها؟',
            icon: '🤔',
            options: [
                { value: 'decision', label: 'صدر قرار إداري ضدي', icon: '📋' },
                { value: 'employment', label: 'مشكلة وظيفية (ترقية، راتب، فصل)', icon: '💼' },
                { value: 'contract', label: 'خلاف على عقد مع جهة حكومية', icon: '📝' },
                { value: 'compensation', label: 'أطالب بتعويض من جهة حكومية', icon: '💰' },
                { value: 'service', label: 'حُرمت من خدمة أو رخصة', icon: '🚫' },
                { value: 'disciplinary', label: 'صدر بحقي جزاء تأديبي', icon: '⚠️' }
            ]
        },
        {
            id: 'entity_type',
            question: 'ما هي الجهة التي لديك مشكلة معها؟',
            icon: '🏛️',
            options: [
                { value: 'ministry', label: 'وزارة', icon: '🏢' },
                { value: 'municipality', label: 'أمانة أو بلدية', icon: '🏙️' },
                { value: 'university', label: 'جامعة أو مؤسسة تعليمية', icon: '🎓' },
                { value: 'hospital', label: 'مستشفى أو جهة صحية حكومية', icon: '🏥' },
                { value: 'security', label: 'جهة أمنية', icon: '🛡️' },
                { value: 'other_gov', label: 'جهة حكومية أخرى', icon: '🏛️' }
            ]
        },
        {
            id: 'time_passed',
            question: 'متى حدثت المشكلة أو صدر القرار؟',
            icon: '📅',
            options: [
                { value: 'recent', label: 'خلال آخر 60 يوماً', icon: '✅' },
                { value: 'months', label: 'من 60 يوم إلى 6 أشهر', icon: '⚠️' },
                { value: 'long', label: 'أكثر من 6 أشهر', icon: '❌' }
            ]
        },
        {
            id: 'grievance_filed',
            question: 'هل تقدمت بتظلم للجهة الإدارية؟',
            icon: '📨',
            options: [
                { value: 'yes_responded', label: 'نعم، وتم الرد علي', icon: '📬' },
                { value: 'yes_no_response', label: 'نعم، ولم يتم الرد خلال 60 يوماً', icon: '⏳' },
                { value: 'no', label: 'لا، لم أتقدم بتظلم', icon: '❌' }
            ]
        },
        {
            id: 'request_type',
            question: 'ماذا تريد من المحكمة؟',
            icon: '⚖️',
            options: [
                { value: 'cancel', label: 'إلغاء القرار الصادر ضدي', icon: '🚫' },
                { value: 'compensation', label: 'تعويض مالي عن الضرر', icon: '💵' },
                { value: 'both', label: 'إلغاء القرار والتعويض معاً', icon: '📋💰' },
                { value: 'enforce', label: 'إلزام الجهة بتنفيذ شيء معين', icon: '✅' }
            ]
        }
    ],
    caseTypeMapping: {
        // تحديد نوع الدعوى بناءً على الإجابات
        'decision': { primary: 1, name: 'إلغاء قرار إداري', icon: '📋' },
        'employment': { primary: 2, name: 'دعوى وظيفية', icon: '💼' },
        'contract': { primary: 3, name: 'عقود إدارية', icon: '📝' },
        'compensation': { primary: 4, name: 'تعويضات', icon: '💰' },
        'service': { primary: 1, name: 'إلغاء قرار إداري', icon: '📋' },
        'disciplinary': { primary: 5, name: 'دعوى تأديبية', icon: '⚖️' }
    }
};

function renderRequestsPage() {
    return `
        <div class="hero-banner" style="padding: 24px 48px;">
            <div class="hero-content">
                <h2 class="hero-title">تقديم دعوى جديدة</h2>
                <p class="hero-subtitle">أكمل الخطوات التالية لتقديم دعواك الإدارية</p>
            </div>
        </div>
        
        <!-- اختيار طريقة تقديم الطلب -->
        <div id="submission-method-selection" class="form-section">
            <h3 class="section-title">
                <div class="section-icon">🚀</div>
                اختر طريقة تقديم الطلب
            </h3>
            <div class="submission-methods">
                <div class="method-card" onclick="selectSubmissionMethod('smart')">
                    <div class="method-icon">🤖</div>
                    <h4 class="method-title">المساعد الذكي</h4>
                    <p class="method-description">أجب على بعض الأسئلة البسيطة وسنساعدك في تحديد نوع الدعوى المناسبة وملء البيانات</p>
                    <div class="method-badge recommended">موصى به</div>
                </div>
                <div class="method-card" onclick="selectSubmissionMethod('manual')">
                    <div class="method-icon">📝</div>
                    <h4 class="method-title">التقديم اليدوي</h4>
                    <p class="method-description">قم بملء جميع البيانات والخطوات يدوياً إذا كنت تعرف نوع الدعوى المطلوبة</p>
                    <div class="method-badge">للمتقدمين</div>
                </div>
            </div>
        </div>
        
        <!-- واجهة المساعد الذكي -->
        <div id="smart-assistant-container" style="display: none;">
            ${renderSmartAssistant()}
        </div>
        
        <!-- خطوات المعالج - 5 خطوات -->
        <div class="stepper" id="stepper" style="display: none;">
            <div class="step active" data-step="1">
                <div class="step-number">1</div>
                <div class="step-label">بيانات الأطراف</div>
            </div>
            <div class="step" data-step="2">
                <div class="step-number">2</div>
                <div class="step-label">تصنيف الدعوى</div>
            </div>
            <div class="step" data-step="3">
                <div class="step-number">3</div>
                <div class="step-label">المستندات</div>
            </div>
            <div class="step" data-step="4">
                <div class="step-number">4</div>
                <div class="step-label">التحقق</div>
            </div>
            <div class="step" data-step="5">
                <div class="step-number">5</div>
                <div class="step-label">الإرسال</div>
            </div>
        </div>
        
        <!-- محتوى الخطوات -->
        <div id="step-content" style="display: none;">
            ${renderStep1()}
        </div>
        
        <!-- أزرار التنقل -->
        <div class="form-section" style="display: none; justify-content: space-between;" id="navigation-buttons">
            <button class="btn btn-secondary" id="prev-btn" onclick="prevStep()" style="visibility: hidden;">
                <span>→</span>
                السابق
            </button>
            <button class="btn btn-primary" id="next-btn" onclick="nextStep()">
                التالي
                <span>←</span>
            </button>
        </div>
    `;
}

function renderSmartAssistant() {
    return `
        <div class="smart-assistant-wrapper">
            <!-- رأس المساعد الذكي -->
            <div class="assistant-header">
                <div class="assistant-avatar">
                    <div class="avatar-icon">🤖</div>
                    <div class="avatar-pulse"></div>
                </div>
                <div class="assistant-info">
                    <h3>المساعد الذكي</h3>
                    <p>سأساعدك في تحديد نوع الدعوى المناسبة لحالتك</p>
                </div>
                <button class="btn btn-outline btn-sm" onclick="exitSmartAssistant()">
                    <span>✕</span>
                    إلغاء
                </button>
            </div>
            
            <!-- شريط التقدم -->
            <div class="assistant-progress">
                <div class="progress-bar">
                    <div class="progress-fill" id="assistant-progress-fill" style="width: 0%"></div>
                </div>
                <div class="progress-text" id="assistant-progress-text">السؤال 1 من ${SmartAssistantData.questions.length}</div>
            </div>
            
            <!-- محتوى السؤال -->
            <div id="assistant-question-container">
                ${renderAssistantQuestion(0)}
            </div>
            
            <!-- أزرار التنقل -->
            <div class="assistant-navigation">
                <button class="btn btn-secondary" id="assistant-prev-btn" onclick="prevAssistantQuestion()" style="visibility: hidden;">
                    <span>→</span>
                    السابق
                </button>
                <button class="btn btn-primary" id="assistant-next-btn" onclick="nextAssistantQuestion()" disabled>
                    التالي
                    <span>←</span>
                </button>
            </div>
        </div>
    `;
}

function renderAssistantQuestion(questionIndex) {
    const question = SmartAssistantData.questions[questionIndex];
    const selectedAnswer = SmartAssistantData.answers[question.id];
    
    return `
        <div class="assistant-question-card">
            <div class="question-header">
                <span class="question-icon">${question.icon}</span>
                <h3 class="question-text">${question.question}</h3>
            </div>
            <div class="options-grid">
                ${question.options.map(option => `
                    <div class="option-card ${selectedAnswer === option.value ? 'selected' : ''}" 
                         onclick="selectAssistantOption('${question.id}', '${option.value}')">
                        <div class="option-icon">${option.icon}</div>
                        <div class="option-label">${option.label}</div>
                        <div class="option-check">✓</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderAssistantResult() {
    const result = analyzeAnswers();
    
    return `
        <div class="assistant-result-card">
            <div class="result-header">
                <div class="result-icon">🎯</div>
                <h3>تحليل حالتك</h3>
            </div>
            
            <div class="result-recommendation">
                <div class="recommendation-badge">
                    <span>${result.caseType.icon}</span>
                    نوع الدعوى المقترح
                </div>
                <h2 class="recommendation-title">${result.caseType.name}</h2>
                <p class="recommendation-description">${result.description}</p>
            </div>
            
            ${result.warnings.length > 0 ? `
                <div class="result-warnings">
                    <h4>⚠️ تنبيهات مهمة</h4>
                    <ul>
                        ${result.warnings.map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${result.tips.length > 0 ? `
                <div class="result-tips">
                    <h4>💡 نصائح</h4>
                    <ul>
                        ${result.tips.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <div class="result-summary">
                <h4>📋 ملخص إجاباتك</h4>
                <div class="summary-grid">
                    ${Object.entries(SmartAssistantData.answers).map(([key, value]) => {
                        const question = SmartAssistantData.questions.find(q => q.id === key);
                        const option = question.options.find(o => o.value === value);
                        return `
                            <div class="summary-item">
                                <span class="summary-icon">${question.icon}</span>
                                <div class="summary-content">
                                    <div class="summary-label">${question.question}</div>
                                    <div class="summary-value">${option.label}</div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div class="result-actions">
                <button class="btn btn-primary btn-lg" onclick="proceedWithRecommendation(${result.caseType.primary})">
                    <span>✅</span>
                    متابعة تقديم الدعوى
                </button>
                <button class="btn btn-outline" onclick="restartAssistant()">
                    <span>🔄</span>
                    إعادة الأسئلة
                </button>
            </div>
        </div>
    `;
}

function analyzeAnswers() {
    const answers = SmartAssistantData.answers;
    const mapping = SmartAssistantData.caseTypeMapping;
    
    // تحديد نوع الدعوى الأساسي
    let caseType = mapping[answers.problem_type] || mapping['decision'];
    let warnings = [];
    let tips = [];
    let description = '';
    
    // تحليل الإجابات وتقديم النصائح
    switch(answers.problem_type) {
        case 'decision':
            description = 'دعوى لإلغاء قرار إداري صادر من جهة حكومية تراه مخالفاً للنظام أو مضراً بمصالحك.';
            break;
        case 'employment':
            description = 'دعوى متعلقة بحقوقك الوظيفية كموظف حكومي، سواء كانت ترقية أو راتب أو إنهاء خدمة.';
            break;
        case 'contract':
            description = 'دعوى تتعلق بعقد أبرمته مع جهة حكومية ونشأ خلاف حول تنفيذه أو تفسيره.';
            break;
        case 'compensation':
            description = 'دعوى للمطالبة بتعويض مالي عن ضرر لحق بك نتيجة تصرف أو قرار من جهة حكومية.';
            break;
        case 'service':
            description = 'دعوى لإلغاء قرار رفض منحك خدمة أو رخصة كان يحق لك الحصول عليها.';
            break;
        case 'disciplinary':
            description = 'دعوى للطعن في جزاء تأديبي صادر بحقك من جهة عملك الحكومية.';
            caseType = { primary: 5, name: 'دعوى تأديبية', icon: '⚖️' };
            break;
    }
    
    // تحذيرات بناءً على الوقت
    if (answers.time_passed === 'long') {
        warnings.push('مضى أكثر من 6 أشهر على القرار، قد يكون هناك مشكلة في قبول الدعوى من حيث المدة. ننصح باستشارة محامي.');
    } else if (answers.time_passed === 'months') {
        warnings.push('تأكد من تقديم الدعوى في أقرب وقت لتجنب مشاكل المدة النظامية.');
    }
    
    // تحذيرات بناءً على التظلم
    if (answers.grievance_filed === 'no') {
        warnings.push('في بعض الحالات يُشترط التظلم للجهة الإدارية قبل رفع الدعوى. ننصح بالتحقق من ذلك.');
        tips.push('يمكنك تقديم تظلم للجهة الإدارية أولاً وانتظار الرد قبل رفع الدعوى.');
    }
    
    // نصائح عامة
    tips.push('احتفظ بنسخ من جميع المستندات والمراسلات.');
    tips.push('تأكد من صحة بيانات الجهة المدعى عليها.');
    
    if (answers.request_type === 'compensation' || answers.request_type === 'both') {
        tips.push('قم بتوثيق جميع الأضرار المادية والمعنوية التي لحقت بك.');
    }
    
    return {
        caseType,
        description,
        warnings,
        tips
    };
}

// وظائف التحكم في المساعد الذكي
function selectSubmissionMethod(method) {
    const selectionDiv = document.getElementById('submission-method-selection');
    const assistantDiv = document.getElementById('smart-assistant-container');
    const stepperDiv = document.getElementById('stepper');
    const stepContentDiv = document.getElementById('step-content');
    const navButtonsDiv = document.getElementById('navigation-buttons');
    
    if (method === 'smart') {
        SmartAssistantData.isActive = true;
        SmartAssistantData.currentQuestion = 0;
        SmartAssistantData.answers = {};
        
        selectionDiv.style.display = 'none';
        assistantDiv.style.display = 'block';
        stepperDiv.style.display = 'none';
        stepContentDiv.style.display = 'none';
        navButtonsDiv.style.display = 'none';
    } else {
        SmartAssistantData.isActive = false;
        selectionDiv.style.display = 'none';
        assistantDiv.style.display = 'none';
        stepperDiv.style.display = 'flex';
        stepContentDiv.style.display = 'block';
        navButtonsDiv.style.display = 'flex';
    }
}

function exitSmartAssistant() {
    const selectionDiv = document.getElementById('submission-method-selection');
    const assistantDiv = document.getElementById('smart-assistant-container');
    
    SmartAssistantData.isActive = false;
    SmartAssistantData.currentQuestion = 0;
    SmartAssistantData.answers = {};
    
    selectionDiv.style.display = 'block';
    assistantDiv.style.display = 'none';
}

function selectAssistantOption(questionId, value) {
    SmartAssistantData.answers[questionId] = value;
    
    // تحديث واجهة الخيارات
    const container = document.getElementById('assistant-question-container');
    container.innerHTML = renderAssistantQuestion(SmartAssistantData.currentQuestion);
    
    // تفعيل زر التالي
    const nextBtn = document.getElementById('assistant-next-btn');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

function nextAssistantQuestion() {
    const currentQ = SmartAssistantData.questions[SmartAssistantData.currentQuestion];
    
    // التحقق من اختيار إجابة
    if (!SmartAssistantData.answers[currentQ.id]) {
        showNotification('الرجاء اختيار إجابة للمتابعة', 'error');
        return;
    }
    
    SmartAssistantData.currentQuestion++;
    
    if (SmartAssistantData.currentQuestion >= SmartAssistantData.questions.length) {
        // عرض النتيجة
        showAssistantResult();
    } else {
        updateAssistantUI();
    }
}

function prevAssistantQuestion() {
    if (SmartAssistantData.currentQuestion > 0) {
        SmartAssistantData.currentQuestion--;
        updateAssistantUI();
    }
}

function updateAssistantUI() {
    const container = document.getElementById('assistant-question-container');
    const progressFill = document.getElementById('assistant-progress-fill');
    const progressText = document.getElementById('assistant-progress-text');
    const prevBtn = document.getElementById('assistant-prev-btn');
    const nextBtn = document.getElementById('assistant-next-btn');
    
    const currentIndex = SmartAssistantData.currentQuestion;
    const totalQuestions = SmartAssistantData.questions.length;
    const currentQ = SmartAssistantData.questions[currentIndex];
    
    // تحديث المحتوى
    container.innerHTML = renderAssistantQuestion(currentIndex);
    
    // تحديث شريط التقدم
    const progress = ((currentIndex + 1) / totalQuestions) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `السؤال ${currentIndex + 1} من ${totalQuestions}`;
    
    // تحديث الأزرار
    prevBtn.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
    nextBtn.disabled = !SmartAssistantData.answers[currentQ.id];
    nextBtn.innerHTML = currentIndex === totalQuestions - 1 
        ? '<span>🎯</span> عرض النتيجة' 
        : 'التالي <span>←</span>';
}

function showAssistantResult() {
    const container = document.getElementById('assistant-question-container');
    const progressFill = document.getElementById('assistant-progress-fill');
    const progressText = document.getElementById('assistant-progress-text');
    const navDiv = document.querySelector('.assistant-navigation');
    
    // تحديث شريط التقدم
    progressFill.style.width = '100%';
    progressText.textContent = 'اكتمل التحليل ✅';
    
    // إخفاء أزرار التنقل
    navDiv.style.display = 'none';
    
    // عرض النتيجة
    container.innerHTML = renderAssistantResult();
}

function restartAssistant() {
    SmartAssistantData.currentQuestion = 0;
    SmartAssistantData.answers = {};
    
    const navDiv = document.querySelector('.assistant-navigation');
    navDiv.style.display = 'flex';
    
    updateAssistantUI();
}

function proceedWithRecommendation(caseTypeId) {
    // حفظ نوع الدعوى المختار
    if (typeof AppData !== 'undefined') {
        AppData.selectedCaseType = caseTypeId;
    }
    
    // الانتقال للنموذج العادي
    const assistantDiv = document.getElementById('smart-assistant-container');
    const stepperDiv = document.getElementById('stepper');
    const stepContentDiv = document.getElementById('step-content');
    const navButtonsDiv = document.getElementById('navigation-buttons');
    
    assistantDiv.style.display = 'none';
    stepperDiv.style.display = 'flex';
    stepContentDiv.style.display = 'block';
    navButtonsDiv.style.display = 'flex';
    
    // تحديث خطوة تصنيف الدعوى لتكون محددة مسبقاً
    showNotification('تم تحديد نوع الدعوى بناءً على إجاباتك. يمكنك تعديله إذا رغبت.', 'success');
}

function renderStep1() {
    return `
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">👤</div>
                بيانات المدعي
            </h3>
            <div class="party-card">
                <div class="party-header">
                    <div class="party-title">
                        <span>👤</span>
                        المدعي
                    </div>
                    <span class="party-badge">شخص طبيعي</span>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label required">رقم الهوية / الإقامة</label>
                        <input type="text" class="form-control" placeholder="أدخل رقم الهوية">
                    </div>
                    <div class="form-group">
                        <label class="form-label required">الاسم الكامل</label>
                        <input type="text" class="form-control" value="محمد أحمد العمري" readonly>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label required">رقم الجوال</label>
                        <input type="tel" class="form-control" placeholder="05xxxxxxxx">
                    </div>
                    <div class="form-group">
                        <label class="form-label required">البريد الإلكتروني</label>
                        <input type="email" class="form-control" placeholder="example@email.com">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label required">العنوان</label>
                    <input type="text" class="form-control" placeholder="المدينة، الحي، الشارع">
                </div>
            </div>
        </div>
        
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">👔</div>
                بيانات الوكيل (اختياري)
            </h3>
            <div class="checkbox-group" style="margin-bottom: 20px;">
                <input type="checkbox" class="checkbox" id="has-agent" onchange="toggleAgentForm()">
                <label for="has-agent">لدي وكيل / محامي</label>
            </div>
            <div id="agent-form" style="display: none;">
                <div class="party-card">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label required">رقم رخصة المحاماة</label>
                            <input type="text" class="form-control" placeholder="أدخل رقم الرخصة">
                        </div>
                        <div class="form-group">
                            <label class="form-label required">اسم المحامي</label>
                            <input type="text" class="form-control" placeholder="الاسم الكامل">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label required">رقم الجوال</label>
                            <input type="tel" class="form-control" placeholder="05xxxxxxxx">
                        </div>
                        <div class="form-group">
                            <label class="form-label">رقم الوكالة</label>
                            <input type="text" class="form-control" placeholder="رقم صك الوكالة">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">🏛️</div>
                بيانات المدعى عليه (الجهة الإدارية)
            </h3>
            <div class="party-card">
                <div class="party-header">
                    <div class="party-title">
                        <span>🏛️</span>
                        الجهة الإدارية
                    </div>
                    <span class="party-badge" style="background: var(--danger-100); color: var(--danger-500);">جهة حكومية</span>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label required">اسم الجهة</label>
                        <select class="form-control form-select">
                            <option value="">اختر الجهة الإدارية</option>
                            <option value="1">وزارة الموارد البشرية والتنمية الاجتماعية</option>
                            <option value="2">وزارة المالية</option>
                            <option value="3">وزارة التعليم</option>
                            <option value="4">وزارة الصحة</option>
                            <option value="5">أمانة منطقة الرياض</option>
                            <option value="6">أمانة منطقة مكة المكرمة</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">الإدارة / الفرع</label>
                        <input type="text" class="form-control" placeholder="اسم الإدارة أو الفرع">
                    </div>
                </div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="addDefendant()">
                <span>➕</span>
                إضافة مدعى عليه آخر
            </button>
        </div>
    `;
}

function renderStep2() {
    const selectedType = typeof AppData !== 'undefined' && AppData.selectedCaseType ? AppData.selectedCaseType : null;
    
    return `
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">📋</div>
                تصنيف الدعوى
            </h3>
            
            ${selectedType ? `
                <div class="alert alert-success" style="margin-bottom: 20px;">
                    <span>✅</span>
                    <div>تم تحديد نوع الدعوى بناءً على إجاباتك في المساعد الذكي. يمكنك تغييره إذا رغبت.</div>
                </div>
            ` : ''}
            
            <div class="form-group">
                <label class="form-label required">نوع الدعوى</label>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 12px;">
                    ${AppData.caseTypes.map(type => `
                        <label class="party-card ${selectedType === type.id ? 'selected-type' : ''}" style="cursor: pointer; margin: 0; padding: 16px;">
                            <input type="radio" name="case-type" value="${type.id}" style="display: none;" ${selectedType === type.id ? 'checked' : ''}>
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="font-size: 24px;">${type.icon}</span>
                                <span style="font-weight: 600;">${type.name}</span>
                            </div>
                        </label>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">📝</div>
                تفاصيل الدعوى
            </h3>
            <div class="form-group">
                <label class="form-label required">موضوع الدعوى</label>
                <input type="text" class="form-control" placeholder="اكتب عنواناً مختصراً للدعوى">
            </div>
            <div class="form-group">
                <label class="form-label required">وقائع الدعوى</label>
                <textarea class="form-control" rows="5" placeholder="اشرح تفاصيل الدعوى ووقائعها بشكل مفصل..."></textarea>
                <div class="form-hint">اذكر التسلسل الزمني للأحداث والوقائع المتعلقة بالدعوى</div>
            </div>
            <div class="form-group">
                <label class="form-label required">الطلبات</label>
                <textarea class="form-control" rows="3" placeholder="حدد طلباتك من المحكمة بشكل واضح..."></textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">رقم القرار المطعون فيه</label>
                    <input type="text" class="form-control" placeholder="إن وجد">
                </div>
                <div class="form-group">
                    <label class="form-label">تاريخ القرار</label>
                    <input type="date" class="form-control">
                </div>
            </div>
        </div>
    `;
}

function renderStep3() {
    return `
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">📎</div>
                المستندات والمرفقات
            </h3>
            
            <div class="alert alert-info">
                <span>ℹ️</span>
                <div>
                    <strong>المستندات المطلوبة:</strong>
                    صورة الهوية، صورة القرار المطعون فيه، أي مستندات داعمة للدعوى
                </div>
            </div>
            
            <div class="file-upload-area" id="file-upload-area">
                <div class="file-upload-icon">📁</div>
                <div class="file-upload-text">اسحب الملفات وأفلتها هنا أو انقر للاختيار</div>
                <div class="file-upload-hint">PDF, JPG, PNG - الحد الأقصى 10 ميجابايت لكل ملف</div>
                <input type="file" id="file-input" multiple accept=".pdf,.jpg,.jpeg,.png" style="display: none;">
            </div>
            
            <div class="file-list" id="file-list">
                ${typeof renderFileList === 'function' ? renderFileList() : ''}
            </div>
        </div>
        
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">📑</div>
                وصف المستندات
            </h3>
            <div id="file-descriptions">
                ${typeof AppData !== 'undefined' && AppData.uploadedFiles ? AppData.uploadedFiles.map((file, index) => `
                    <div class="form-group">
                        <label class="form-label">${file.name}</label>
                        <input type="text" class="form-control" placeholder="وصف المستند">
                    </div>
                `).join('') : ''}
            </div>
        </div>
    `;
}

// ✅ الخطوة الجديدة - خطوة التحقق
function renderStep4() {
    const status = typeof AppData !== 'undefined' ? AppData.verificationStatus.status : 'pending';
    
    return `
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">🔐</div>
                التحقق من البيانات
            </h3>
            
            <div class="alert alert-info">
                <span>ℹ️</span>
                <div>
                    <strong>خطوة التحقق:</strong>
                    سيتواصل معك أحد موظفي المحكمة للتحقق من بياناتك قبل إتمام تقديم الدعوى
                </div>
            </div>
            
            <!-- حالة الانتظار -->
            <div class="verification-status-card" id="verification-status">
                ${renderVerificationStatus(status)}
            </div>
            
            <!-- معلومات التواصل -->
            <div class="party-card" style="margin-top: 24px;">
                <h4 style="margin-bottom: 16px; color: var(--primary-700); display: flex; align-items: center; gap: 8px;">
                    <span>📱</span>
                    معلومات التواصل المسجلة
                </h4>
                <div class="form-row">
                    <div class="form-group" style="margin-bottom: 0;">
                        <label class="form-label">رقم الجوال</label>
                        <div style="font-weight: 600; font-size: 16px;">05xxxxxxxx</div>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label class="form-label">البريد الإلكتروني</label>
                        <div style="font-weight: 600; font-size: 16px;">m.alomari@email.com</div>
                    </div>
                </div>
                <div class="form-hint" style="margin-top: 12px;">
                    ⚠️ تأكد من صحة بيانات التواصل حتى يتمكن الموظف من الوصول إليك
                </div>
            </div>
            
            <!-- إدخال رمز التحقق -->
            <div class="party-card" style="margin-top: 24px;" id="verification-code-section">
                <h4 style="margin-bottom: 16px; color: var(--primary-700); display: flex; align-items: center; gap: 8px;">
                    <span>🔑</span>
                    رمز التحقق
                </h4>
                <div class="form-group">
                    <label class="form-label required">أدخل رمز التحقق المرسل من الموظف</label>
                    <div style="display: flex; gap: 12px; align-items: flex-start;">
                        <input type="text" class="form-control" id="verification-code-input" 
                               placeholder="أدخل الرمز المكون من 6 أرقام" 
                               maxlength="6" 
                               style="max-width: 300px; font-size: 18px; letter-spacing: 4px; text-align: center;">
                        <button class="btn btn-primary" onclick="verifyCode()">
                            <span>✅</span>
                            تحقق
                        </button>
                    </div>
                    <div class="form-hint">سيتم إرسال رمز التحقق عبر رسالة نصية أو الهاتف</div>
                </div>
            </div>
            
            <!-- ملاحظات إضافية -->
            <div class="party-card" style="margin-top: 24px; background: var(--warning-100); border-color: var(--warning-500);">
                <h4 style="margin-bottom: 12px; color: #92400e; display: flex; align-items: center; gap: 8px;">
                    <span>💡</span>
                    تعليمات مهمة
                </h4>
                <ul style="margin: 0; padding-right: 20px; color: #92400e; line-height: 1.8;">
                    <li>سيتواصل معك الموظف خلال ساعات العمل الرسمية (8 صباحاً - 4 مساءً)</li>
                    <li>تأكد من أن هاتفك متاح لاستقبال المكالمات</li>
                    <li>جهّز المستندات الأصلية للتحقق إن طُلب منك</li>
                    <li>في حال عدم التواصل خلال 24 ساعة، يرجى الاتصال بالدعم الفني</li>
                </ul>
            </div>
        </div>
        
        <!-- للمحاكاة: أزرار تغيير الحالة (يمكن إزالتها في الإنتاج) -->
        <div class="form-section" style="background: var(--gray-100); border: 2px dashed var(--gray-300);">
            <h4 style="margin-bottom: 16px; color: var(--text-muted);">🧪 محاكاة حالة التحقق (للتجربة فقط)</h4>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <button class="btn btn-sm btn-outline" onclick="simulateVerification('pending')">
                    ⏳ في الانتظار
                </button>
                <button class="btn btn-sm btn-outline" onclick="simulateVerification('in_progress')">
                    📞 جاري التواصل
                </button>
                <button class="btn btn-sm btn-success" onclick="simulateVerification('verified')">
                    ✅ تم التحقق
                </button>
                <button class="btn btn-sm btn-danger" onclick="simulateVerification('rejected')">
                    ❌ مرفوض
                </button>
            </div>
        </div>
    `;
}

function renderVerificationStatus(status) {
    const statusConfig = {
        pending: {
            icon: '⏳',
            title: 'في انتظار التواصل',
            description: 'طلبك قيد المراجعة وسيتواصل معك أحد الموظفين قريباً',
            color: 'var(--warning-500)',
            bgColor: 'var(--warning-100)',
            showLoader: true
        },
        in_progress: {
            icon: '📞',
            title: 'جاري التواصل',
            description: 'الموظف يحاول التواصل معك الآن، يرجى الرد على المكالمة',
            color: 'var(--info-500)',
            bgColor: 'var(--info-100)',
            showLoader: true
        },
        verified: {
            icon: '✅',
            title: 'تم التحقق بنجاح',
            description: 'تم التحقق من بياناتك بنجاح، يمكنك الآن إتمام تقديم الدعوى',
            color: 'var(--success-500)',
            bgColor: 'var(--success-100)',
            showLoader: false
        },
        rejected: {
            icon: '❌',
            title: 'لم يتم التحقق',
            description: 'تعذر التحقق من البيانات، يرجى مراجعة الملاحظات والمحاولة مرة أخرى',
            color: 'var(--danger-500)',
            bgColor: 'var(--danger-100)',
            showLoader: false
        }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return `
        <div style="background: ${config.bgColor}; border: 2px solid ${config.color}; border-radius: 16px; padding: 32px; text-align: center;">
            <div style="font-size: 64px; margin-bottom: 16px;">${config.icon}</div>
            <h3 style="color: ${config.color}; font-size: 24px; margin-bottom: 8px;">${config.title}</h3>
            <p style="color: var(--text-secondary); font-size: 16px; margin-bottom: 16px;">${config.description}</p>
            
            ${config.showLoader ? `
                <div style="display: flex; justify-content: center; margin-top: 20px;">
                    <div class="verification-loader"></div>
                </div>
                <p style="color: var(--text-muted); font-size: 14px; margin-top: 16px;">
                    رقم الطلب: <strong>REQ-2025-001987</strong>
                </p>
            ` : ''}
            
            ${status === 'verified' ? `
                <div style="margin-top: 20px; padding: 16px; background: var(--white); border-radius: 12px; display: inline-block;">
                    <div style="color: var(--text-muted); font-size: 13px;">تم التحقق بواسطة</div>
                    <div style="font-weight: 600; color: var(--text-primary);">أ. عبدالله المحمد</div>
                    <div style="color: var(--text-muted); font-size: 12px;">الساعة 10:30 صباحاً</div>
                </div>
            ` : ''}
            
            ${status === 'rejected' ? `
                <div style="margin-top: 20px; padding: 16px; background: var(--white); border-radius: 12px; text-align: right;">
                    <div style="color: var(--danger-500); font-weight: 600; margin-bottom: 8px;">سبب الرفض:</div>
                    <div style="color: var(--text-secondary);">لم يتم الرد على المكالمات المتكررة. يرجى التأكد من صحة رقم الجوال.</div>
                </div>
                <button class="btn btn-primary" style="margin-top: 16px;" onclick="retryVerification()">
                    <span>🔄</span>
                    إعادة طلب التحقق
                </button>
            ` : ''}
        </div>
    `;
}

// الخطوة الأخيرة - التأكيد والإرسال
function renderStep5() {
    // التحقق من حالة التحقق قبل السماح بالإرسال
    const isVerified = typeof AppData !== 'undefined' && AppData.verificationStatus.status === 'verified';
    
    return `
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">✅</div>
                مراجعة البيانات والتأكيد
            </h3>
            
            ${!isVerified ? `
                <div class="alert alert-danger">
                    <span>⚠️</span>
                    <div>
                        <strong>تنبيه:</strong> يجب إتمام خطوة التحقق قبل تقديم الدعوى. 
                        <a href="#" onclick="goToStep(4); return false;" style="color: inherit; text-decoration: underline;">العودة لخطوة التحقق</a>
                    </div>
                </div>
            ` : `
                <div class="alert alert-success">
                    <span>✅</span>
                    <div>تم التحقق من بياناتك بنجاح! يمكنك الآن إتمام تقديم الدعوى.</div>
                </div>
            `}
            
            <div class="alert alert-warning">
                <span>⚠️</span>
                <div>يرجى مراجعة جميع البيانات قبل إرسال الطلب. لن تتمكن من تعديل البيانات بعد الإرسال.</div>
            </div>
            
            <div class="party-card">
                <h4 style="margin-bottom: 16px; color: var(--primary-700);">📋 ملخص الدعوى</h4>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                    <div>
                        <div style="color: var(--text-muted); font-size: 13px;">المدعي</div>
                        <div style="font-weight: 600;">محمد أحمد العمري</div>
                    </div>
                    <div>
                        <div style="color: var(--text-muted); font-size: 13px;">المدعى عليه</div>
                        <div style="font-weight: 600;">وزارة الموارد البشرية</div>
                    </div>
                    <div>
                        <div style="color: var(--text-muted); font-size: 13px;">نوع الدعوى</div>
                        <div style="font-weight: 600;">إلغاء قرار إداري</div>
                    </div>
                    <div>
                        <div style="color: var(--text-muted); font-size: 13px;">عدد المرفقات</div>
                        <div style="font-weight: 600;">${typeof AppData !== 'undefined' && AppData.uploadedFiles ? AppData.uploadedFiles.length : 0} ملفات</div>
                    </div>
                    <div>
                        <div style="color: var(--text-muted); font-size: 13px;">حالة التحقق</div>
                        <div style="font-weight: 600; color: ${isVerified ? 'var(--success-500)' : 'var(--danger-500)'};">
                            ${isVerified ? '✅ تم التحقق' : '❌ لم يتم التحقق'}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="checkbox-group" style="margin-top: 20px;">
                <input type="checkbox" class="checkbox" id="terms-agree" required ${!isVerified ? 'disabled' : ''}>
                <label for="terms-agree">أقر بصحة جميع البيانات المدخلة وأتحمل المسؤولية الكاملة عن ذلك</label>
            </div>
            
            <div class="checkbox-group">
                <input type="checkbox" class="checkbox" id="notify-agree" ${!isVerified ? 'disabled' : ''}>
                <label for="notify-agree">أوافق على استلام الإشعارات عبر البريد الإلكتروني والرسائل النصية</label>
            </div>
        </div>
        
        <div class="form-section" style="text-align: center;">
            <button class="btn btn-success btn-lg" onclick="submitCase()" ${!isVerified ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                <span>✅</span>
                تقديم الدعوى
            </button>
            ${!isVerified ? '<p style="color: var(--text-muted); margin-top: 12px;">يجب إتمام التحقق أولاً</p>' : ''}
        </div>
    `;
}

// وظائف التحقق
function verifyCode() {
    const codeInput = document.getElementById('verification-code-input');
    const code = codeInput ? codeInput.value : '';
    
    if (code.length !== 6) {
        showNotification('يرجى إدخال رمز التحقق المكون من 6 أرقام', 'error');
        return;
    }
    
    // محاكاة التحقق من الرمز
    showNotification('جاري التحقق من الرمز...', 'info');
    
    setTimeout(() => {
        if (code === '123456') { // رمز تجريبي
            if (typeof AppData !== 'undefined') {
                AppData.verificationStatus.status = 'verified';
            }
            updateVerificationUI();
            showNotification('تم التحقق بنجاح! يمكنك الآن المتابعة', 'success');
        } else {
            showNotification('رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى', 'error');
        }
    }, 1500);
}

function simulateVerification(status) {
    if (typeof AppData !== 'undefined') {
        AppData.verificationStatus.status = status;
    }
    updateVerificationUI();
    
    const messages = {
        pending: 'تم تغيير الحالة إلى: في الانتظار',
        in_progress: 'تم تغيير الحالة إلى: جاري التواصل',
        verified: 'تم تغيير الحالة إلى: تم التحقق',
        rejected: 'تم تغيير الحالة إلى: مرفوض'
    };
    
    showNotification(messages[status], 'info');
}

function updateVerificationUI() {
    const statusContainer = document.getElementById('verification-status');
    if (statusContainer && typeof AppData !== 'undefined') {
        statusContainer.innerHTML = renderVerificationStatus(AppData.verificationStatus.status);
    }
    
    // تحديث أزرار التنقل
    updateNavigationButtons();
}

function retryVerification() {
    if (typeof AppData !== 'undefined') {
        AppData.verificationStatus.status = 'pending';
    }
    updateVerificationUI();
    showNotification('تم إعادة طلب التحقق، سيتواصل معك الموظف قريباً', 'info');
}

function goToStep(stepNumber) {
    if (typeof AppData !== 'undefined') {
        AppData.currentStep = stepNumber;
    }
    if (typeof updateStepContent === 'function') {
        updateStepContent();
    }
    if (typeof updateStepperUI === 'function') {
        updateStepperUI();
    }
}

function updateNavigationButtons() {
    const nextBtn = document.getElementById('next-btn');
    
    // في خطوة التحقق، لا يمكن المتابعة إلا بعد التحقق
    if (typeof AppData !== 'undefined' && AppData.currentStep === 4 && nextBtn) {
        const isVerified = AppData.verificationStatus.status === 'verified';
        nextBtn.disabled = !isVerified;
        nextBtn.style.opacity = isVerified ? '1' : '0.5';
        nextBtn.style.cursor = isVerified ? 'pointer' : 'not-allowed';
    }
}

function toggleAgentForm() {
    const agentForm = document.getElementById('agent-form');
    const checkbox = document.getElementById('has-agent');
    if (agentForm && checkbox) {
        agentForm.style.display = checkbox.checked ? 'block' : 'none';
    }
}

function addDefendant() {
    showNotification('سيتم إضافة نموذج مدعى عليه إضافي', 'info');
}

function submitCase() {
    // التحقق من حالة التحقق
    if (typeof AppData !== 'undefined' && AppData.verificationStatus.status !== 'verified') {
        showNotification('يجب إتمام خطوة التحقق قبل تقديم الدعوى', 'error');
        return;
    }
    
    const termsCheckbox = document.getElementById('terms-agree');
    if (!termsCheckbox || !termsCheckbox.checked) {
        showNotification('يجب الموافقة على الإقرار قبل تقديم الدعوى', 'error');
        return;
    }
    
    showNotification('جاري تقديم الدعوى...', 'info');
    
    setTimeout(() => {
        if (typeof showSuccessModal === 'function') {
            showSuccessModal();
        }
    }, 1500);
}

// دالة showNotification (في حال عدم وجودها)
function showNotification(message, type) {
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        alert(message);
    }
}