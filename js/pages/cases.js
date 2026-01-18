// pages/cases.js - صفحة القضايا

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

function viewCaseDetails(caseId) {
    showNotification(`عرض تفاصيل القضية ${caseId}`, 'info');
}

function initCaseFilters() {
    // تهيئة فلاتر القضايا
}