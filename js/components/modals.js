// components/modals.js - النوافذ المنبثقة

function initModals() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
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