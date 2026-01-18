// app.js - ملف التحكم الرئيسي

// ==========================================
// تهيئة التطبيق
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    initNavigation();
    initTabs();
    initModals();
    initForms();
    initFileUpload();
    initStepper();
    initCaseFilters();
    renderInitialContent();
}

// ==========================================
// البيانات
// ==========================================
const AppData = {
    currentSection: 'home',
    currentStep: 1,
    totalSteps: 4,
    
    caseTypes: [
        { id: 1, name: 'دعاوى الاستحقاق', icon: '📋' },
        { id: 2, name: 'إلغاء القرار الإداري', icon: '❌' },
        { id: 3, name: 'التعويض', icon: '💰' },
        { id: 4, name: 'العقود الإدارية', icon: '📝' },
        { id: 5, name: 'الدعاوى التأديبية', icon: '⚖️' }
    ],
    
    cases: [
        {
            id: 'QC-2025-001542',
            type: 'إلغاء قرار إداري',
            court: 'المحكمة الإدارية بالرياض',
            status: 'active',
            statusText: 'جارية',
            filingDate: '2025-01-10',
            nextSession: '2025-01-25',
            sessionTime: '09:30 صباحاً',
            plaintiff: 'محمد أحمد العمري',
            defendant: 'وزارة الموارد البشرية'
        },
        {
            id: 'QC-2025-001328',
            type: 'تعويض',
            court: 'المحكمة الإدارية بجدة',
            status: 'pending',
            statusText: 'في انتظار الجلسة',
            filingDate: '2025-01-05',
            nextSession: '2025-02-01',
            sessionTime: '11:00 صباحاً',
            plaintiff: 'شركة النور للمقاولات',
            defendant: 'أمانة منطقة مكة المكرمة'
        },
        {
            id: 'QC-2024-008721',
            type: 'عقد إداري',
            court: 'المحكمة الإدارية بالدمام',
            status: 'completed',
            statusText: 'صدر الحكم',
            filingDate: '2024-11-15',
            verdictDate: '2025-01-12',
            plaintiff: 'مؤسسة الفجر التجارية',
            defendant: 'وزارة المالية'
        }
    ],
    
    verdicts: [
        {
            id: 'VRD-2025-0542',
            caseId: 'QC-2024-008721',
            type: 'حكم ابتدائي',
            date: '2025-01-12',
            court: 'المحكمة الإدارية بالدمام',
            result: 'قبول الدعوى',
            summary: 'حكمت المحكمة بإلزام المدعى عليها بدفع مبلغ وقدره (500,000) خمسمائة ألف ريال للمدعية، مع إلزامها بدفع أتعاب المحاماة.',
            canAppeal: true,
            appealDeadline: '2025-02-12'
        }
    ],
    
    objectionReasons: [
        { id: 1, name: 'مخالفة أحكام الشريعة الإسلامية' },
        { id: 2, name: 'مخالفة النظام' },
        { id: 3, name: 'الخطأ في تطبيق النظام' },
        { id: 4, name: 'عدم الاختصاص' },
        { id: 5, name: 'تنازع الاختصاص' },
        { id: 6, name: 'القصور في التسبيب' },
        { id: 7, name: 'الإخلال بحق الدفاع' }
    ],
    
    uploadedFiles: []
};

// ==========================================
// التنقل
// ==========================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            navigateTo(section);
        });
    });
}

function navigateTo(section) {
    AppData.currentSection = section;
    
    // تحديث التنقل النشط
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.querySelector('a').dataset.section === section) {
            item.classList.add('active');
        }
    });
    
    // تحديث المحتوى
    renderContent(section);
}

function renderContent(section) {
    const mainContent = document.getElementById('main-content');
    
    switch(section) {
        case 'home':
            mainContent.innerHTML = renderHomePage();
            break;
        case 'requests':
            mainContent.innerHTML = renderRequestsPage();
            initStepper();
            initFileUpload();
            break;
        case 'cases':
            mainContent.innerHTML = renderCasesPage();
            initCaseFilters();
            break;
        case 'verdicts':
            mainContent.innerHTML = renderVerdictsPage();
            break;
        default:
            mainContent.innerHTML = renderHomePage();
    }
    
    // إعادة تهيئة المكونات
    initModals();
    initForms();
}

function renderInitialContent() {
    renderContent('home');
}

// ==========================================
// الصفحة الرئيسية
// ==========================================
function renderHomePage() {
    return `
        <div class="hero-banner">
            <div class="hero-content">
                <h2 class="hero-title">مرحباً بك في نظام الخدمات القضائية الإلكترونية</h2>
                <p class="hero-subtitle">منصة متكاملة لتقديم الدعاوى ومتابعة القضايا والأحكام إلكترونياً</p>
                <button class="btn btn-secondary" onclick="navigateTo('requests')">
                    <span>📝</span>
                    ابدأ بتقديم دعوى جديدة
                </button>
            </div>
        </div>
        
        <div class="services-grid">
            <div class="service-card" onclick="navigateTo('requests')">
                <div class="service-icon">📝</div>
                <h3 class="service-title">تقديم الطلبات</h3>
                <p class="service-desc">قدّم دعواك الإدارية إلكترونياً بخطوات بسيطة وواضحة</p>
                <div class="service-features">
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>تقديم دعوى جديدة</span>
                    </div>
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>إرفاق المستندات</span>
                    </div>
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>تعديل بيانات التبليغ</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-block">
                    ابدأ الآن
                    <span>←</span>
                </button>
            </div>
            
            <div class="service-card" onclick="navigateTo('cases')">
                <div class="service-icon">📂</div>
                <h3 class="service-title">القضايا</h3>
                <p class="service-desc">تابع سير قضاياك واطلع على مواعيد الجلسات</p>
                <div class="service-features">
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>متابعة حالة القضية</span>
                    </div>
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>حضور الجلسات إلكترونياً</span>
                    </div>
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>تقديم المذكرات</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-block">
                    عرض القضايا
                    <span>←</span>
                </button>
            </div>
            
            <div class="service-card" onclick="navigateTo('verdicts')">
                <div class="service-icon">⚖️</div>
                <h3 class="service-title">الأحكام</h3>
                <p class="service-desc">اطلع على الأحكام الصادرة وقدّم طلبات التنفيذ والاعتراض</p>
                <div class="service-features">
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>استعراض صك الحكم</span>
                    </div>
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>طلب التنفيذ</span>
                    </div>
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>تقديم الاعتراض</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-block">
                    عرض الأحكام
                    <span>←</span>
                </button>
            </div>
        </div>
        
        <!-- إحصائيات سريعة -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">📊 ملخص قضاياك</h3>
            </div>
            <div class="card-body">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div style="text-align: center; padding: 20px; background: var(--info-100); border-radius: 12px;">
                        <div style="font-size: 32px; font-weight: 700; color: var(--info-500);">2</div>
                        <div style="color: var(--gray-600);">قضايا جارية</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: var(--warning-100); border-radius: 12px;">
                        <div style="font-size: 32px; font-weight: 700; color: var(--warning-500);">1</div>
                        <div style="color: var(--gray-600);">في انتظار الجلسة</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: var(--success-100); border-radius: 12px;">
                        <div style="font-size: 32px; font-weight: 700; color: var(--success-500);">1</div>
                        <div style="color: var(--gray-600);">أحكام صادرة</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: var(--primary-100); border-radius: 12px;">
                        <div style="font-size: 32px; font-weight: 700; color: var(--primary-600);">3</div>
                        <div style="color: var(--gray-600);">إجمالي القضايا</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// صفحة تقديم الطلبات
// ==========================================
function renderRequestsPage() {
    return `
        <div class="hero-banner" style="padding: 24px 48px;">
            <div class="hero-content">
                <h2 class="hero-title">تقديم دعوى جديدة</h2>
                <p class="hero-subtitle">أكمل الخطوات التالية لتقديم دعواك الإدارية</p>
            </div>
        </div>
        
        <!-- خطوات المعالج -->
        <div class="stepper" id="stepper">
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
                <div class="step-label">التحقق والإرسال</div>
            </div>
        </div>
        
        <!-- محتوى الخطوات -->
        <div id="step-content">
            ${renderStep1()}
        </div>
        
        <!-- أزرار التنقل -->
        <div class="form-section" style="display: flex; justify-content: space-between;">
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
    return `
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">📋</div>
                تصنيف الدعوى
            </h3>
            <div class="form-group">
                <label class="form-label required">نوع الدعوى</label>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 12px;">
                    ${AppData.caseTypes.map(type => `
                        <label class="party-card" style="cursor: pointer; margin: 0; padding: 16px;">
                            <input type="radio" name="case-type" value="${type.id}" style="display: none;">
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
                ${renderFileList()}
            </div>
        </div>
        
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">📑</div>
                وصف المستندات
            </h3>
            <div id="file-descriptions">
                ${AppData.uploadedFiles.map((file, index) => `
                    <div class="form-group">
                        <label class="form-label">${file.name}</label>
                        <input type="text" class="form-control" placeholder="وصف المستند">
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderStep4() {
    return `
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">✅</div>
                مراجعة البيانات والتأكيد
            </h3>
            
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
                        <div style="font-weight: 600;">${AppData.uploadedFiles.length} ملفات</div>
                    </div>
                </div>
            </div>
            
            <div class="checkbox-group" style="margin-top: 20px;">
                <input type="checkbox" class="checkbox" id="terms-agree" required>
                <label for="terms-agree">أقر بصحة جميع البيانات المدخلة وأتحمل المسؤولية الكاملة عن ذلك</label>
            </div>
            
            <div class="checkbox-group">
                <input type="checkbox" class="checkbox" id="notify-agree">
                <label for="notify-agree">أوافق على استلام الإشعارات عبر البريد الإلكتروني والرسائل النصية</label>
            </div>
        </div>
        
        <div class="form-section" style="text-align: center;">
            <button class="btn btn-success btn-lg" onclick="submitCase()">
                <span>✅</span>
                تقديم الدعوى
            </button>
        </div>
    `;
}

function renderFileList() {
    if (AppData.uploadedFiles.length === 0) return '';
    
    return AppData.uploadedFiles.map((file, index) => `
        <div class="file-item">
            <div class="file-info">
                <span class="file-icon">📄</span>
                <div>
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${formatFileSize(file.size)}</div>
                </div>
            </div>
            <span class="file-remove" onclick="removeFile(${index})">🗑️</span>
        </div>
    `).join('');
}

// ==========================================
// صفحة القضايا
// ==========================================
function renderCasesPage() {
    return `
        <div class="hero-banner" style="padding: 24px 48px;">
            <div class="hero-content">
                <h2 class="hero-title">القضايا</h2>
                <p class="hero-subtitle">تابع سير قضاياك واطلع على مواعيد الجلسات</p>
            </div>
        </div>
        
        <!-- فلاتر -->
        <div class="card" style="margin-bottom: 24px;">
            <div class="card-body">
                <div class="form-row">
                    <div class="form-group" style="margin-bottom: 0;">
                        <input type="text" class="form-control" placeholder="🔍 البحث برقم القضية...">
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <select class="form-control form-select">
                            <option value="">جميع الحالات</option>
                            <option value="active">جارية</option>
                            <option value="pending">في الانتظار</option>
                            <option value="completed">منتهية</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <select class="form-control form-select">
                            <option value="">جميع المحاكم</option>
                            <option value="riyadh">الرياض</option>
                            <option value="jeddah">جدة</option>
                            <option value="dammam">الدمام</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- قائمة القضايا -->
        <div class="cases-list">
            ${AppData.cases.map(caseItem => renderCaseCard(caseItem)).join('')}
        </div>
    `;
}

function renderCaseCard(caseItem) {
    const statusClass = caseItem.status === 'active' ? 'active' : 
                       caseItem.status === 'pending' ? 'pending' : 'completed';
    
    return `
        <div class="case-card">
            <div class="case-header">
                <div class="case-number">📁 ${caseItem.id}</div>
                <span class="case-status ${statusClass}">${caseItem.statusText}</span>
            </div>
            <div class="case-details">
                <div class="case-detail">
                    <span class="case-detail-label">نوع الدعوى</span>
                    <span class="case-detail-value">${caseItem.type}</span>
                </div>
                <div class="case-detail">
                    <span class="case-detail-label">المحكمة</span>
                    <span class="case-detail-value">${caseItem.court}</span>
                </div>
                <div class="case-detail">
                    <span class="case-detail-label">المدعي</span>
                    <span class="case-detail-value">${caseItem.plaintiff}</span>
                </div>
                <div class="case-detail">
                    <span class="case-detail-label">المدعى عليه</span>
                    <span class="case-detail-value">${caseItem.defendant}</span>
                </div>
                ${caseItem.nextSession ? `
                    <div class="case-detail">
                        <span class="case-detail-label">الجلسة القادمة</span>
                        <span class="case-detail-value">${caseItem.nextSession} - ${caseItem.sessionTime}</span>
                    </div>
                ` : ''}
            </div>
            <div class="case-actions">
                <button class="btn btn-primary btn-sm" onclick="viewCaseDetails('${caseItem.id}')">
                    <span>👁️</span>
                    عرض التفاصيل
                </button>
                ${caseItem.nextSession ? `
                    <button class="btn btn-success btn-sm">
                        <span>🎥</span>
                        رابط الجلسة
                    </button>
                ` : ''}
                <button class="btn btn-outline btn-sm">
                    <span>📝</span>
                    تقديم مذكرة
                </button>
            </div>
        </div>
    `;
}

// ==========================================
// صفحة الأحكام
// ==========================================
function renderVerdictsPage() {
    return `
        <div class="hero-banner" style="padding: 24px 48px;">
            <div class="hero-content">
                <h2 class="hero-title">الأحكام</h2>
                <p class="hero-subtitle">استعرض الأحكام الصادرة وقدّم طلبات التنفيذ أو الاعتراض</p>
            </div>
        </div>
        
        <!-- قائمة الأحكام -->
        ${AppData.verdicts.map(verdict => renderVerdictCard(verdict)).join('')}
        
        ${AppData.verdicts.length === 0 ? `
            <div class="empty-state">
                <div class="empty-state-icon">⚖️</div>
                <h3 class="empty-state-title">لا توجد أحكام</h3>
                <p class="empty-state-text">لم تصدر أي أحكام في قضاياك حتى الآن</p>
            </div>
        ` : ''}
    `;
}

function renderVerdictCard(verdict) {
    return `
        <div class="verdict-card">
            <div class="verdict-header">
                <h3 class="verdict-title">⚖️ ${verdict.type}</h3>
                <div class="verdict-meta">
                    <span>📋 رقم الحكم: ${verdict.id}</span>
                    <span>📅 تاريخ الصدور: ${verdict.date}</span>
                    <span>🏛️ ${verdict.court}</span>
                </div>
            </div>
            <div class="verdict-body">
                <div class="verdict-content">
                    <strong>منطوق الحكم:</strong><br>
                    ${verdict.summary}
                </div>
                
                ${verdict.canAppeal ? `
                    <div class="alert alert-warning">
                        <span>⏰</span>
                        <div>
                            <strong>مهلة الاعتراض:</strong> ينتهي موعد الاعتراض في ${verdict.appealDeadline}
                        </div>
                    </div>
                ` : ''}
                
                <div class="verdict-actions">
                    <button class="btn btn-primary" onclick="viewVerdictDocument('${verdict.id}')">
                        <span>📄</span>
                        عرض صك الحكم
                    </button>
                    <button class="btn btn-success" onclick="requestExecution('${verdict.id}')">
                        <span>✅</span>
                        طلب التنفيذ
                    </button>
                    ${verdict.canAppeal ? `
                        <button class="btn btn-outline" onclick="openObjectionModal('${verdict.id}')">
                            <span>📝</span>
                            تقديم اعتراض
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// وظائف مساعدة
// ==========================================
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

function toggleAgentForm() {
    const agentForm = document.getElementById('agent-form');
    const checkbox = document.getElementById('has-agent');
    agentForm.style.display = checkbox.checked ? 'block' : 'none';
}

function addDefendant() {
    showNotification('سيتم إضافة نموذج مدعى عليه إضافي', 'info');
}

function initFileUpload() {
    const uploadArea = document.getElementById('file-upload-area');
    const fileInput = document.getElementById('file-input');
    
    if (!uploadArea || !fileInput) return;
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
    
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
}

function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.size <= 10 * 1024 * 1024) {
            AppData.uploadedFiles.push(file);
        } else {
            showNotification('حجم الملف يتجاوز الحد المسموح (10 ميجابايت)', 'error');
        }
    });
    updateFileList();
}

function updateFileList() {
    const fileList = document.getElementById('file-list');
    if (fileList) {
        fileList.innerHTML = renderFileList();
    }
}

function removeFile(index) {
    AppData.uploadedFiles.splice(index, 1);
    updateFileList();
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' بايت';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' ك.ب';
    return (bytes / (1024 * 1024)).toFixed(1) + ' م.ب';
}

function submitCase() {
    const termsCheckbox = document.getElementById('terms-agree');
    if (!termsCheckbox || !termsCheckbox.checked) {
        showNotification('يجب الموافقة على الإقرار قبل تقديم الدعوى', 'error');
        return;
    }
    
    // محاكاة تقديم الطلب
    showNotification('جاري تقديم الدعوى...', 'info');
    
    setTimeout(() => {
        showSuccessModal();
    }, 1500);
}

function showSuccessModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header" style="background: var(--success-500); color: white;">
                <h3 class="modal-title">✅ تم تقديم الدعوى بنجاح</h3>
            </div>
            <div class="modal-body" style="text-align: center;">
                <div style="font-size: 64px; margin-bottom: 20px;">🎉</div>
                <h3 style="margin-bottom: 12px;">تهانينا!</h3>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">
                    تم تقديم دعواك بنجاح وسيتم مراجعتها من قبل المحكمة المختصة
                </p>
                <div class="party-card" style="text-align: right;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                        <span style="color: var(--text-muted);">رقم الطلب:</span>
                        <strong style="color: var(--primary-700);">REQ-2025-001987</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--text-muted);">تاريخ التقديم:</span>
                        <strong>${new Date().toLocaleDateString('ar-SA')}</strong>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove(); navigateTo('cases');">
                    متابعة القضايا
                </button>
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove(); navigateTo('home');">
                    العودة للرئيسية
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function viewCaseDetails(caseId) {
    showNotification(`عرض تفاصيل القضية ${caseId}`, 'info');
}

function viewVerdictDocument(verdictId) {
    showNotification('جاري تحميل صك الحكم...', 'info');
}

function requestExecution(verdictId) {
    showNotification('جاري فتح نموذج طلب التنفيذ...', 'info');
}

function openObjectionModal(verdictId) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">📝 تقديم اعتراض</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label required">جهة الاعتراض</label>
                    <select class="form-control form-select">
                        <option value="">اختر جهة الاعتراض</option>
                        <option value="appeal">محكمة الاستئناف الإدارية</option>
                        <option value="supreme">المحكمة الإدارية العليا</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label required">أسباب الاعتراض</label>
                    ${AppData.objectionReasons.map(reason => `
                        <div class="checkbox-group" style="margin-bottom: 8px;">
                            <input type="checkbox" class="checkbox" id="reason-${reason.id}">
                            <label for="reason-${reason.id}">${reason.name}</label>
                        </div>
                    `).join('')}
                </div>
                <div class="form-group">
                    <label class="form-label required">تفاصيل الاعتراض</label>
                    <textarea class="form-control" rows="4" placeholder="اشرح أسباب اعتراضك بالتفصيل..."></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="submitObjection(); this.closest('.modal-overlay').remove();">
                    تقديم الاعتراض
                </button>
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove();">
                    إلغاء
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function submitObjection() {
    showNotification('تم تقديم الاعتراض بنجاح', 'success');
}

function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabGroup = this.parentElement;
            tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function initModals() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
}

function initForms() {
    // تهيئة التحقق من النماذج
}

function initCaseFilters() {
    // تهيئة فلاتر القضايا
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        min-width: 300px;
        animation: slideDown 0.3s ease;
    `;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <span>${icons[type] || icons.info}</span>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// إضافة CSS للرسوم المتحركة
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    @keyframes slideUp {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
`;
document.head.appendChild(style);