// pages/requests.js - صفحة تقديم الطلبات

function renderRequestsPage() {
    return `
        <div class="hero-banner" style="padding: 24px 48px;">
            <div class="hero-content">
                <h2 class="hero-title">تقديم دعوى جديدة</h2>
                <p class="hero-subtitle">أكمل الخطوات التالية لتقديم دعواك الإدارية</p>
            </div>
        </div>
        
        <!-- خطوات المعالج - 5 خطوات -->
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
                <div class="step-label">التحقق</div>
            </div>
            <div class="step" data-step="5">
                <div class="step-number">5</div>
                <div class="step-label">الإرسال</div>
            </div>
        </div>
        
        <!-- محتوى الخطوات -->
        <div id="step-content">
            ${renderStep1()}
        </div>
        
        <!-- أزرار التنقل -->
        <div class="form-section" style="display: flex; justify-content: space-between;" id="navigation-buttons">
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

// ✅ الخطوة الجديدة - خطوة التحقق
function renderStep4() {
    const status = AppData.verificationStatus.status;
    
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
    const isVerified = AppData.verificationStatus.status === 'verified';
    
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
                        <div style="font-weight: 600;">${AppData.uploadedFiles.length} ملفات</div>
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
            AppData.verificationStatus.status = 'verified';
            updateVerificationUI();
            showNotification('تم التحقق بنجاح! يمكنك الآن المتابعة', 'success');
        } else {
            showNotification('رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى', 'error');
        }
    }, 1500);
}

function simulateVerification(status) {
    AppData.verificationStatus.status = status;
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
    if (statusContainer) {
        statusContainer.innerHTML = renderVerificationStatus(AppData.verificationStatus.status);
    }
    
    // تحديث أزرار التنقل
    updateNavigationButtons();
}

function retryVerification() {
    AppData.verificationStatus.status = 'pending';
    updateVerificationUI();
    showNotification('تم إعادة طلب التحقق، سيتواصل معك الموظف قريباً', 'info');
}

function goToStep(stepNumber) {
    AppData.currentStep = stepNumber;
    updateStepContent();
    updateStepperUI();
}

function updateNavigationButtons() {
    const nextBtn = document.getElementById('next-btn');
    
    // في خطوة التحقق، لا يمكن المتابعة إلا بعد التحقق
    if (AppData.currentStep === 4 && nextBtn) {
        const isVerified = AppData.verificationStatus.status === 'verified';
        nextBtn.disabled = !isVerified;
        nextBtn.style.opacity = isVerified ? '1' : '0.5';
        nextBtn.style.cursor = isVerified ? 'pointer' : 'not-allowed';
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

function submitCase() {
    // التحقق من حالة التحقق
    if (AppData.verificationStatus.status !== 'verified') {
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
        showSuccessModal();
    }, 1500);
}