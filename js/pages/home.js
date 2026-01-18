// pages/home.js - الصفحة الرئيسية

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