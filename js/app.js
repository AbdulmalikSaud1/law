// app.js - ملف التهيئة الرئيسي

document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    initAnimations();
    initNavigation();
    initTabs();
    initModals();
    initForms();
    renderInitialContent();
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

function initForms() {
    // تهيئة التحقق من النماذج
}