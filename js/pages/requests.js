// pages/requests.js - صفحة تقديم الطلبات

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

function toggleAgentForm() {
    const agentForm = document.getElementById('agent-form');
    const checkbox = document.getElementById('has-agent');
    agentForm.style.display = checkbox.checked ? 'block' : 'none';
}

function addDefendant() {
    showNotification('سيتم إضافة نموذج مدعى عليه إضافي', 'info');
}

function submitCase() {
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