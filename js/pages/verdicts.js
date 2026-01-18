// pages/verdicts.js - صفحة الأحكام

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

function viewVerdictDocument(verdictId) {
    showNotification('جاري تحميل صك الحكم...', 'info');
}

function requestExecution(verdictId) {
    showNotification('جاري فتح نموذج طلب التنفيذ...', 'info');
}

function submitObjection() {
    showNotification('تم تقديم الاعتراض بنجاح', 'success');
}