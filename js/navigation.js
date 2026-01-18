// navigation.js - التنقل

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