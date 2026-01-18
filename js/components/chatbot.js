// components/chatbot.js - الشات بوت التفاعلي بالخيارات

const ChatBot = {
    isOpen: false,
    currentFlow: 'main', // main, services, cases, help, contact
    conversationHistory: [],
    
    // هيكل الخيارات والتدفقات
    flows: {
        main: {
            message: 'أهلاً بك في ديوان المظالم 👋\nكيف يمكنني مساعدتك اليوم؟',
            options: [
                { id: 1, text: '📝 تقديم دعوى جديدة', action: 'navigate', target: 'requests' },
                { id: 2, text: '📂 متابعة قضاياي', action: 'navigate', target: 'cases' },
                { id: 3, text: '📄 الأحكام والاعتراضات', action: 'navigate', target: 'verdicts' },
                { id: 4, text: '📅 مواعيد الجلسات', action: 'navigate', target: 'sessions' },
                { id: 5, text: '❓ أسئلة شائعة', action: 'flow', target: 'faq' },
                { id: 6, text: '📞 تواصل معنا', action: 'flow', target: 'contact' },
                { id: 7, text: '🔍 البحث عن خدمة', action: 'flow', target: 'services' }
            ]
        },
        
        services: {
            message: 'اختر نوع الخدمة التي تبحث عنها:',
            options: [
                { id: 1, text: '⚖️ الدعاوى الإدارية', action: 'flow', target: 'admin_cases' },
                { id: 2, text: '📋 الدعاوى التأديبية', action: 'flow', target: 'disciplinary_cases' },
                { id: 3, text: '💰 دعاوى التعويض', action: 'flow', target: 'compensation_cases' },
                { id: 4, text: '📑 العقود الإدارية', action: 'flow', target: 'contract_cases' },
                { id: 0, text: '🔙 العودة للقائمة الرئيسية', action: 'flow', target: 'main' }
            ]
        },
        
        admin_cases: {
            message: 'الدعاوى الإدارية تشمل:\n\n• إلغاء القرارات الإدارية\n• دعاوى الاستحقاق الوظيفي\n• المنازعات الوظيفية\n\nماذا تريد أن تفعل؟',
            options: [
                { id: 1, text: '📝 تقديم دعوى إلغاء قرار', action: 'navigate', target: 'requests', params: { type: 'cancel' } },
                { id: 2, text: '📝 تقديم دعوى استحقاق', action: 'navigate', target: 'requests', params: { type: 'entitlement' } },
                { id: 3, text: '📖 معرفة الشروط والمتطلبات', action: 'info', target: 'admin_requirements' },
                { id: 0, text: '🔙 رجوع', action: 'flow', target: 'services' }
            ]
        },
        
        disciplinary_cases: {
            message: 'الدعاوى التأديبية تشمل:\n\n• الطعن في القرارات التأديبية\n• طلب إعادة النظر\n\nماذا تريد أن تفعل؟',
            options: [
                { id: 1, text: '📝 تقديم دعوى تأديبية', action: 'navigate', target: 'requests', params: { type: 'disciplinary' } },
                { id: 2, text: '📖 معرفة الشروط والمتطلبات', action: 'info', target: 'disciplinary_requirements' },
                { id: 0, text: '🔙 رجوع', action: 'flow', target: 'services' }
            ]
        },
        
        compensation_cases: {
            message: 'دعاوى التعويض تشمل:\n\n• التعويض عن القرارات الخاطئة\n• التعويض عن الأضرار\n\nماذا تريد أن تفعل؟',
            options: [
                { id: 1, text: '📝 تقديم دعوى تعويض', action: 'navigate', target: 'requests', params: { type: 'compensation' } },
                { id: 2, text: '📖 معرفة الشروط والمتطلبات', action: 'info', target: 'compensation_requirements' },
                { id: 0, text: '🔙 رجوع', action: 'flow', target: 'services' }
            ]
        },
        
        contract_cases: {
            message: 'دعاوى العقود الإدارية تشمل:\n\n• منازعات العقود الحكومية\n• المطالبات المالية\n\nماذا تريد أن تفعل؟',
            options: [
                { id: 1, text: '📝 تقديم دعوى عقد إداري', action: 'navigate', target: 'requests', params: { type: 'contract' } },
                { id: 2, text: '📖 معرفة الشروط والمتطلبات', action: 'info', target: 'contract_requirements' },
                { id: 0, text: '🔙 رجوع', action: 'flow', target: 'services' }
            ]
        },
        
        faq: {
            message: 'اختر السؤال الذي تبحث عن إجابته:',
            options: [
                { id: 1, text: '⏱️ كم مدة النظر في الدعوى؟', action: 'info', target: 'faq_duration' },
                { id: 2, text: '📋 ما المستندات المطلوبة؟', action: 'info', target: 'faq_documents' },
                { id: 3, text: '💰 هل هناك رسوم؟', action: 'info', target: 'faq_fees' },
                { id: 4, text: '🔄 كيف أتابع قضيتي؟', action: 'info', target: 'faq_tracking' },
                { id: 5, text: '⚖️ كيف أعترض على حكم؟', action: 'info', target: 'faq_appeal' },
                { id: 6, text: '📍 أين تقع المحاكم؟', action: 'info', target: 'faq_locations' },
                { id: 0, text: '🔙 العودة للقائمة الرئيسية', action: 'flow', target: 'main' }
            ]
        },
        
        contact: {
            message: 'اختر طريقة التواصل المناسبة:',
            options: [
                { id: 1, text: '📞 الاتصال بمركز الاتصال', action: 'info', target: 'contact_phone' },
                { id: 2, text: '📧 إرسال بريد إلكتروني', action: 'info', target: 'contact_email' },
                { id: 3, text: '🏢 زيارة أقرب فرع', action: 'info', target: 'contact_branches' },
                { id: 4, text: '📱 حسابات التواصل الاجتماعي', action: 'info', target: 'contact_social' },
                { id: 5, text: '💬 تقديم شكوى أو اقتراح', action: 'navigate', target: 'complaints' },
                { id: 0, text: '🔙 العودة للقائمة الرئيسية', action: 'flow', target: 'main' }
            ]
        },
        
        cases_menu: {
            message: 'اختر ما تريد معرفته عن قضاياك:',
            options: [
                { id: 1, text: '📋 عرض جميع القضايا', action: 'navigate', target: 'cases' },
                { id: 2, text: '🔍 البحث برقم القضية', action: 'flow', target: 'search_case' },
                { id: 3, text: '📊 القضايا الجارية', action: 'info', target: 'active_cases' },
                { id: 4, text: '✅ القضايا المنتهية', action: 'info', target: 'completed_cases' },
                { id: 0, text: '🔙 العودة للقائمة الرئيسية', action: 'flow', target: 'main' }
            ]
        },
        
        search_case: {
            message: 'للبحث عن قضية، يرجى إدخال رقم القضية:',
            options: [],
            inputMode: true,
            inputPlaceholder: 'مثال: QC-2025-001542',
            inputAction: 'searchCase'
        }
    },
    
    // المعلومات والردود
    infoResponses: {
        admin_requirements: {
            title: 'شروط الدعاوى الإدارية',
            content: `📋 **المستندات المطلوبة:**
            
• صورة من الهوية الوطنية
• صورة من القرار المطعون فيه
• ما يثبت تظلم المدعي للجهة الإدارية
• أي مستندات داعمة للدعوى

⏱️ **المدة النظامية:**
• يجب رفع الدعوى خلال 60 يوماً من تاريخ العلم بالقرار
• أو 60 يوماً من رفض التظلم`,
            options: [
                { id: 1, text: '📝 تقديم الدعوى الآن', action: 'navigate', target: 'requests' },
                { id: 0, text: '🔙 رجوع', action: 'flow', target: 'admin_cases' }
            ]
        },
        
        disciplinary_requirements: {
            title: 'شروط الدعاوى التأديبية',
            content: `📋 **المستندات المطلوبة:**
            
• صورة من الهوية الوطنية
• صورة من القرار التأديبي
• صورة من محضر التحقيق (إن وجد)

⏱️ **المدة النظامية:**
• يجب رفع الدعوى خلال 60 يوماً من تاريخ التبليغ بالقرار`,
            options: [
                { id: 1, text: '📝 تقديم الدعوى الآن', action: 'navigate', target: 'requests' },
                { id: 0, text: '🔙 رجوع', action: 'flow', target: 'disciplinary_cases' }
            ]
        },
        
        compensation_requirements: {
            title: 'شروط دعاوى التعويض',
            content: `📋 **المستندات المطلوبة:**
            
• صورة من الهوية الوطنية
• ما يثبت الضرر الواقع
• تقدير قيمة التعويض المطلوب
• أي مستندات داعمة

💡 **ملاحظة:**
• يجب إثبات العلاقة السببية بين الخطأ والضرر`,
            options: [
                { id: 1, text: '📝 تقديم الدعوى الآن', action: 'navigate', target: 'requests' },
                { id: 0, text: '🔙 رجوع', action: 'flow', target: 'compensation_cases' }
            ]
        },
        
        contract_requirements: {
            title: 'شروط دعاوى العقود الإدارية',
            content: `📋 **المستندات المطلوبة:**
            
• صورة من العقد الإداري
• صورة من السجل التجاري
• المراسلات بين الطرفين
• أي مستندات تثبت الإخلال

💰 **المطالبات المالية:**
• يجب تحديد المبالغ المطالب بها بدقة`,
            options: [
                { id: 1, text: '📝 تقديم الدعوى الآن', action: 'navigate', target: 'requests' },
                { id: 0, text: '🔙 رجوع', action: 'flow', target: 'contract_cases' }
            ]
        },
        
        faq_duration: {
            title: 'مدة النظر في الدعوى',
            content: `⏱️ **المدد الزمنية المتوقعة:**

• **القضايا البسيطة:** 3 - 6 أشهر
• **القضايا المتوسطة:** 6 - 12 شهر
• **القضايا المعقدة:** قد تستغرق أكثر

📊 **عوامل تؤثر على المدة:**
• تعقيد القضية
• اكتمال المستندات
• حضور الأطراف
• تعاون الجهة المدعى عليها`,
            options: [
                { id: 1, text: '❓ سؤال آخر', action: 'flow', target: 'faq' },
                { id: 0, text: '🔙 القائمة الرئيسية', action: 'flow', target: 'main' }
            ]
        },
        
        faq_documents: {
            title: 'المستندات المطلوبة',
            content: `📄 **المستندات الأساسية لجميع الدعاوى:**

✅ صورة الهوية الوطنية / الإقامة
✅ صورة من القرار المطعون فيه
✅ ما يثبت التظلم للجهة الإدارية
✅ الوكالة الشرعية (إن وجد وكيل)

📎 **مستندات إضافية حسب نوع الدعوى:**
• عقود / مراسلات / تقارير`,
            options: [
                { id: 1, text: '❓ سؤال آخر', action: 'flow', target: 'faq' },
                { id: 0, text: '🔙 القائمة الرئيسية', action: 'flow', target: 'main' }
            ]
        },
        
        faq_fees: {
            title: 'رسوم الدعاوى',
            content: `💰 **رسوم القضاء الإداري:**

✅ **الدعاوى الإدارية:** مجانية
✅ **دعاوى الموظفين:** مجانية
✅ **الاستئناف:** مجاني

📝 **ملاحظة:**
لا توجد رسوم على رفع الدعاوى أمام ديوان المظالم`,
            options: [
                { id: 1, text: '❓ سؤال آخر', action: 'flow', target: 'faq' },
                { id: 0, text: '🔙 القائمة الرئيسية', action: 'flow', target: 'main' }
            ]
        },
        
        faq_tracking: {
            title: 'متابعة القضية',
            content: `🔍 **طرق متابعة القضية:**

1️⃣ عبر البوابة الإلكترونية (قسم قضاياي)
2️⃣ تطبيق معين على الجوال
3️⃣ الاتصال بمركز الاتصال 1950
4️⃣ زيارة المحكمة شخصياً

📱 **الإشعارات:**
يتم إرسال تحديثات عبر الجوال والبريد`,
            options: [
                { id: 1, text: '📂 الذهاب لقضاياي', action: 'navigate', target: 'cases' },
                { id: 2, text: '❓ سؤال آخر', action: 'flow', target: 'faq' },
                { id: 0, text: '🔙 القائمة الرئيسية', action: 'flow', target: 'main' }
            ]
        },
        
        faq_appeal: {
            title: 'الاعتراض على الأحكام',
            content: `⚖️ **الاعتراض على الأحكام:**

⏱️ **مدة الاعتراض:** 30 يوماً من تاريخ الحكم

📋 **خطوات الاعتراض:**
1. الدخول على البوابة
2. اختيار الحكم المراد الاعتراض عليه
3. تقديم لائحة الاعتراض
4. إرفاق المستندات الداعمة

📝 **أسباب الاعتراض:**
• مخالفة النظام
• القصور في التسبيب
• الخطأ في تطبيق النظام`,
            options: [
                { id: 1, text: '📄 الذهاب للأحكام', action: 'navigate', target: 'verdicts' },
                { id: 2, text: '❓ سؤال آخر', action: 'flow', target: 'faq' },
                { id: 0, text: '🔙 القائمة الرئيسية', action: 'flow', target: 'main' }
            ]
        },
        
        faq_locations: {
            title: 'مواقع المحاكم',
            content: `🏛️ **المحاكم الإدارية:**

📍 **الرياض:** طريق الملك فهد
📍 **جدة:** حي الروضة
📍 **الدمام:** حي الفيصلية
📍 **مكة:** حي العزيزية
📍 **المدينة:** حي العنبرية

🕐 **أوقات العمل:**
الأحد - الخميس: 8 ص - 2:30 م`,
            options: [
                { id: 1, text: '❓ سؤال آخر', action: 'flow', target: 'faq' },
                { id: 0, text: '🔙 القائمة الرئيسية', action: 'flow', target: 'main' }
            ]
        },
        
        contact_phone: {
            title: 'الاتصال الهاتفي',
            content: `📞 **مركز الاتصال الموحد:**

☎️ **الرقم:** 1950

🕐 **أوقات العمل:**
• الأحد - الخميس
• 8:00 صباحاً - 8:00 مساءً

💡 **الخدمات المتاحة:**
• الاستفسارات العامة
• متابعة القضايا
• حجز المواعيد
• الدعم الفني`,
            options: [
                { id: 1, text: '📞 طريقة تواصل أخرى', action: 'flow', target: 'contact' },
                { id: 0, text: '🔙 القائمة الرئيسية', action: 'flow', target: 'main' }
            ]
        },
        
        contact_email: {
            title: 'البريد الإلكتروني',
            content: `📧 **التواصل عبر البريد:**

✉️ **البريد العام:**
info@bog.gov.sa

✉️ **الدعم الفني:**
support@bog.gov.sa

⏱️ **وقت الرد المتوقع:**
خلال 2-3 أيام عمل`,
            options: [
                { id: 1, text: '📞 طريقة تواصل أخرى', action: 'flow', target: 'contact' },
                { id: 0, text: '🔙 القائمة الرئيسية', action: 'flow', target: 'main' }
            ]
        },
        
        contact_branches: {
            title: 'فروع المحاكم',
            content: `🏢 **الفروع الرئيسية:**

🏛️ **المحكمة الإدارية بالرياض**
العنوان: طريق الملك فهد، حي المرسلات

🏛️ **المحكمة الإدارية بجدة**
العنوان: شارع الأمير محمد بن عبدالعزيز

🏛️ **المحكمة الإدارية بالدمام**
العنوان: طريق الملك فهد، حي الفيصلية

🕐 **مواعيد الاستقبال:**
8:00 ص - 2:30 م`,
            options: [
                { id: 1, text: '📞 طريقة تواصل أخرى', action: 'flow', target: 'contact' },
                { id: 0, text: '🔙 القائمة الرئيسية', action: 'flow', target: 'main' }
            ]
        },
        
        contact_social: {
            title: 'التواصل الاجتماعي',
            content: `📱 **حسابات التواصل الاجتماعي:**

🐦 **تويتر:** @BOaboraogsa
📘 **فيسبوك:** ديوان المظالم
📸 **انستغرام:** @bog_ksa
🎥 **يوتيوب:** ديوان المظالم

💡 **للاستفسارات السريعة:**
يمكنك إرسال رسالة خاصة عبر تويتر`,
            options: [
                { id: 1, text: '📞 طريقة تواصل أخرى', action: 'flow', target: 'contact' },
                { id: 0, text: '🔙 القائمة الرئيسية', action: 'flow', target: 'main' }
            ]
        },
        
        active_cases: {
            title: 'القضايا الجارية',
            content: `📊 **قضاياك الجارية:**

📋 **QC-2025-001542**
النوع: إلغاء قرار إداري
الحالة: جارية
الجلسة القادمة: 25 يناير 2025

📋 **QC-2025-001328**
النوع: تعويض
الحالة: في انتظار الجلسة
الجلسة القادمة: 1 فبراير 2025`,
            options: [
                { id: 1, text: '📂 عرض التفاصيل الكاملة', action: 'navigate', target: 'cases' },
                { id: 0, text: '🔙 رجوع', action: 'flow', target: 'cases_menu' }
            ]
        },
        
        completed_cases: {
            title: 'القضايا المنتهية',
            content: `✅ **قضاياك المنتهية:**

📋 **QC-2024-008721**
النوع: عقد إداري
الحالة: صدر الحكم ✅
تاريخ الحكم: 12 يناير 2025
النتيجة: قبول الدعوى`,
            options: [
                { id: 1, text: '📄 عرض الأحكام', action: 'navigate', target: 'verdicts' },
                { id: 0, text: '🔙 رجوع', action: 'flow', target: 'cases_menu' }
            ]
        }
    },
    
    // تهيئة الشات بوت
    init() {
        this.render();
        this.bindEvents();
    },
    
    // عرض واجهة الشات بوت
    render() {
        const chatbotHTML = `
            <!-- زر فتح الشات -->
            <button class="chatbot-fab" id="chatbot-fab" onclick="ChatBot.toggle()">
                <span class="fab-icon">💬</span>
                <span class="fab-badge" id="fab-badge" style="display: none;">1</span>
            </button>
            
            <!-- نافذة الشات -->
            <div class="chatbot-container" id="chatbot-container">
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <div class="chatbot-avatar">🤖</div>
                        <div class="chatbot-header-text">
                            <div class="chatbot-name">المساعد الذكي</div>
                            <div class="chatbot-status">
                                <span class="status-dot"></span>
                                متصل الآن
                            </div>
                        </div>
                    </div>
                    <div class="chatbot-header-actions">
                        <button class="chatbot-header-btn" onclick="ChatBot.restart()" title="بداية جديدة">🔄</button>
                        <button class="chatbot-header-btn" onclick="ChatBot.toggle()" title="إغلاق">✕</button>
                    </div>
                </div>
                
                <div class="chatbot-messages" id="chatbot-messages">
                    <!-- الرسائل ستظهر هنا -->
                </div>
                
                <div class="chatbot-input-area" id="chatbot-input-area" style="display: none;">
                    <input type="text" class="chatbot-input" id="chatbot-input" placeholder="اكتب رقم القضية...">
                    <button class="chatbot-send-btn" onclick="ChatBot.handleInput()">
                        <span>➤</span>
                    </button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    },
    
    // ربط الأحداث
    bindEvents() {
        // الضغط على Enter في حقل الإدخال
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.id === 'chatbot-input') {
                this.handleInput();
            }
        });
    },
    
    // فتح/إغلاق الشات
    toggle() {
        this.isOpen = !this.isOpen;
        const container = document.getElementById('chatbot-container');
        const fab = document.getElementById('chatbot-fab');
        
        if (this.isOpen) {
            container.classList.add('open');
            fab.classList.add('open');
            
            // عرض الرسالة الترحيبية إذا كان فارغاً
            if (this.conversationHistory.length === 0) {
                this.startConversation();
            }
        } else {
            container.classList.remove('open');
            fab.classList.remove('open');
        }
    },
    
    // بدء المحادثة
    startConversation() {
        this.showFlow('main');
    },
    
    // إعادة المحادثة من البداية
    restart() {
        this.conversationHistory = [];
        this.currentFlow = 'main';
        
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.innerHTML = '';
        
        this.hideInputArea();
        this.startConversation();
    },
    
    // عرض تدفق معين
    showFlow(flowId) {
        const flow = this.flows[flowId];
        if (!flow) return;
        
        this.currentFlow = flowId;
        
        // إضافة رسالة البوت
        this.addBotMessage(flow.message);
        
        // إضافة الخيارات
        if (flow.options && flow.options.length > 0) {
            this.showOptions(flow.options);
        }
        
        // إظهار حقل الإدخال إذا كان مطلوباً
        if (flow.inputMode) {
            this.showInputArea(flow.inputPlaceholder);
        } else {
            this.hideInputArea();
        }
    },
    
    // عرض معلومات
    showInfo(infoId) {
        const info = this.infoResponses[infoId];
        if (!info) return;
        
        // إضافة رسالة المعلومات
        this.addBotMessage(`**${info.title}**\n\n${info.content}`);
        
        // إضافة خيارات المتابعة
        if (info.options && info.options.length > 0) {
            this.showOptions(info.options);
        }
    },
    
    // إضافة رسالة من البوت
    addBotMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        
        const messageHTML = `
            <div class="chat-message bot-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-text">${this.formatMessage(message)}</div>
                    <div class="message-time">${this.getCurrentTime()}</div>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
        
        // حفظ في التاريخ
        this.conversationHistory.push({ type: 'bot', message });
    },
    
    // إضافة رسالة من المستخدم
    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        
        const messageHTML = `
            <div class="chat-message user-message">
                <div class="message-content">
                    <div class="message-text">${message}</div>
                    <div class="message-time">${this.getCurrentTime()}</div>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
        
        // حفظ في التاريخ
        this.conversationHistory.push({ type: 'user', message });
    },
    
    // عرض الخيارات
    showOptions(options) {
        const messagesContainer = document.getElementById('chatbot-messages');
        
        const optionsHTML = `
            <div class="chat-options">
                ${options.map(opt => `
                    <button class="chat-option-btn" onclick="ChatBot.handleOption(${JSON.stringify(opt).replace(/"/g, '&quot;')})">
                        <span class="option-number">${opt.id}</span>
                        <span class="option-text">${opt.text}</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', optionsHTML);
        this.scrollToBottom();
    },
    
    // معالجة اختيار خيار
    handleOption(option) {
        // إضافة رسالة المستخدم
        this.addUserMessage(option.text);
        
        // إزالة الخيارات السابقة
        this.removeOptions();
        
        // تنفيذ الإجراء
        setTimeout(() => {
            switch (option.action) {
                case 'navigate':
                    this.navigateTo(option.target, option.params);
                    break;
                case 'flow':
                    this.showFlow(option.target);
                    break;
                case 'info':
                    this.showInfo(option.target);
                    break;
            }
        }, 500);
    },
    
    // الانتقال لصفحة
    navigateTo(page, params) {
        this.addBotMessage(`جاري تحويلك إلى ${this.getPageName(page)}...`);
        
        setTimeout(() => {
            // إغلاق الشات
            this.toggle();
            
            // الانتقال للصفحة
            if (typeof navigateTo === 'function') {
                navigateTo(page);
            }
            
            // تطبيق المعلمات إذا وجدت
            if (params) {
                console.log('Params:', params);
            }
        }, 1000);
    },
    
    // معالجة إدخال المستخدم
    handleInput() {
        const input = document.getElementById('chatbot-input');
        const value = input.value.trim();
        
        if (!value) return;
        
        // إضافة رسالة المستخدم
        this.addUserMessage(value);
        input.value = '';
        
        // معالجة الإدخال حسب التدفق الحالي
        const flow = this.flows[this.currentFlow];
        if (flow && flow.inputAction === 'searchCase') {
            this.searchCase(value);
        }
    },
    
    // البحث عن قضية
    searchCase(caseNumber) {
        this.hideInputArea();
        
        // محاكاة البحث
        setTimeout(() => {
            const found = AppData.cases.find(c => c.id.toLowerCase() === caseNumber.toLowerCase());
            
            if (found) {
                this.addBotMessage(`✅ **تم العثور على القضية:**\n\n📋 **رقم القضية:** ${found.id}\n📂 **النوع:** ${found.type}\n🏛️ **المحكمة:** ${found.court}\n📊 **الحالة:** ${found.statusText}`);
                
                this.showOptions([
                    { id: 1, text: '📂 عرض تفاصيل القضية', action: 'navigate', target: 'cases' },
                    { id: 2, text: '🔍 البحث عن قضية أخرى', action: 'flow', target: 'search_case' },
                    { id: 0, text: '🔙 القائمة الرئيسية', action: 'flow', target: 'main' }
                ]);
            } else {
                this.addBotMessage(`❌ لم يتم العثور على قضية بهذا الرقم.\n\nتأكد من صحة رقم القضية وحاول مرة أخرى.`);
                
                this.showOptions([
                    { id: 1, text: '🔍 محاولة مرة أخرى', action: 'flow', target: 'search_case' },
                    { id: 0, text: '🔙 القائمة الرئيسية', action: 'flow', target: 'main' }
                ]);
            }
        }, 1000);
    },
    
    // إظهار حقل الإدخال
    showInputArea(placeholder) {
        const inputArea = document.getElementById('chatbot-input-area');
        const input = document.getElementById('chatbot-input');
        
        inputArea.style.display = 'flex';
        input.placeholder = placeholder || 'اكتب هنا...';
        input.focus();
    },
    
    // إخفاء حقل الإدخال
    hideInputArea() {
        const inputArea = document.getElementById('chatbot-input-area');
        inputArea.style.display = 'none';
    },
    
    // إزالة الخيارات
    removeOptions() {
        const options = document.querySelectorAll('.chat-options');
        options.forEach(opt => opt.remove());
    },
    
    // تنسيق الرسالة
    formatMessage(message) {
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    },
    
    // الحصول على اسم الصفحة
    getPageName(page) {
        const names = {
            'requests': 'صفحة تقديم الدعوى',
            'cases': 'صفحة القضايا',
            'verdicts': 'صفحة الأحكام',
            'sessions': 'صفحة الجلسات',
            'complaints': 'صفحة الشكاوى'
        };
        return names[page] || 'الصفحة المطلوبة';
    },
    
    // الحصول على الوقت الحالي
    getCurrentTime() {
        return new Date().toLocaleTimeString('ar-SA', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    },
    
    // التمرير للأسفل
    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
};

// تهيئة الشات بوت عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    ChatBot.init();
});