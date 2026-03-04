const loginSection = document.getElementById('loginSection');
const cmsSection = document.getElementById('cmsSection');
const loginForm = document.getElementById('loginForm');
const imageList = document.getElementById('imageList');
const searchInput = document.getElementById('searchInput');
const loginMessage = document.getElementById('loginMessage');
const cmsMessage = document.getElementById('cmsMessage');
const logoutBtn = document.getElementById('logoutBtn');

const TOKEN_KEY = 'cms_admin_token';
let token = localStorage.getItem(TOKEN_KEY) || '';
let allImages = [];

function setMessage(element, text, type) {
    element.textContent = text || '';
    element.classList.remove('success', 'error');
    if (type) {
        element.classList.add(type);
    }
}

function encodePath(path) {
    return path.split('/').map(encodeURIComponent).join('/');
}

function getAuthHeaders() {
    return {
        Authorization: `Bearer ${token}`
    };
}

async function login(username, password) {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại.');
    }

    token = data.token;
    localStorage.setItem(TOKEN_KEY, token);
}

async function fetchImages() {
    const res = await fetch('/api/images', {
        headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Không tải được danh sách ảnh.');
    }
    allImages = data.images || [];
    renderImages();
}

function renderImages() {
    const keyword = searchInput.value.trim().toLowerCase();
    const filtered = allImages.filter((img) => img.fileName.toLowerCase().includes(keyword));

    if (!filtered.length) {
        imageList.innerHTML = '<p>Không tìm thấy ảnh phù hợp.</p>';
        return;
    }

    imageList.innerHTML = filtered.map((img) => {
        const preview = `${encodePath(img.path)}?v=${img.version || Date.now()}`;
        return `
            <div class="image-item" data-file="${img.fileName}">
                <img src="${preview}" alt="${img.fileName}">
                <div>
                    <div class="file-name">${img.fileName}</div>
                </div>
                <div class="replace-area">
                    <input type="file" accept="image/*" class="file-input">
                    <button class="replace-btn">Thay thế</button>
                    <button class="upload-btn" disabled>Upload</button>
                </div>
            </div>
        `;
    }).join('');
}

async function replaceImage(target, file) {
    const formData = new FormData();
    formData.append('target', target);
    formData.append('file', file);

    const res = await fetch('/api/images/replace', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Không thể thay ảnh.');
    }
    return data;
}

function showCMS() {
    loginSection.classList.add('hidden');
    cmsSection.classList.remove('hidden');
}

function showLogin() {
    loginSection.classList.remove('hidden');
    cmsSection.classList.add('hidden');
}

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    setMessage(loginMessage, 'Đang đăng nhập...', '');

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    try {
        await login(username, password);
        setMessage(loginMessage, 'Đăng nhập thành công.', 'success');
        showCMS();
        await fetchImages();
    } catch (error) {
        setMessage(loginMessage, error.message, 'error');
    }
});

searchInput.addEventListener('input', renderImages);

imageList.addEventListener('click', async (event) => {
    const replaceButton = event.target.closest('.replace-btn');
    const uploadButton = event.target.closest('.upload-btn');

    if (!replaceButton && !uploadButton) {
        return;
    }

    const button = replaceButton || uploadButton;
    const item = button.closest('.image-item');
    const input = item.querySelector('.file-input');
    const uploadBtn = item.querySelector('.upload-btn');

    if (replaceButton) {
        input.click();
        return;
    }

    const file = input.files[0];
    const target = item.getAttribute('data-file');
    if (!file) {
        setMessage(cmsMessage, 'Bạn cần bấm Thay thế và chọn ảnh mới trước khi Upload.', 'error');
        return;
    }

    uploadBtn.disabled = true;
    uploadBtn.textContent = 'Đang upload...';

    try {
        await replaceImage(target, file);
        setMessage(cmsMessage, `Đã thay ảnh ${target} thành công. Website cập nhật ngay.`, 'success');
        await fetchImages();
    } catch (error) {
        setMessage(cmsMessage, error.message, 'error');
    } finally {
        uploadBtn.disabled = false;
        uploadBtn.textContent = 'Upload';
        input.value = '';
    }
});

imageList.addEventListener('change', (event) => {
    const input = event.target.closest('.file-input');
    if (!input) {
        return;
    }

    const item = input.closest('.image-item');
    const uploadBtn = item.querySelector('.upload-btn');
    uploadBtn.disabled = !input.files[0];
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem(TOKEN_KEY);
    token = '';
    allImages = [];
    imageList.innerHTML = '';
    setMessage(cmsMessage, '', '');
    showLogin();
});

async function bootstrap() {
    if (!token) {
        showLogin();
        return;
    }

    try {
        showCMS();
        await fetchImages();
    } catch (error) {
        localStorage.removeItem(TOKEN_KEY);
        token = '';
        showLogin();
    }
}

bootstrap();