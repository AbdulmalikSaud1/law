// components/fileUpload.js - رفع الملفات

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