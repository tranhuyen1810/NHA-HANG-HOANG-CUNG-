const loginSection = document.getElementById('loginSection');
const cmsSection = document.getElementById('cmsSection');
const loginForm = document.getElementById('loginForm');
const imageList = document.getElementById('imageList');
const searchInput = document.getElementById('searchInput');
const errorMessage = document.getElementById('errorMessage');
const cmsMessage = document.getElementById('cmsMessage');
const logoutBtn = document.getElementById('logoutBtn');
const rememberCheckbox = document.getElementById('remember');
const btnText = loginForm.querySelector('.btn-text');
const btnLoader = loginForm.querySelector('.btn-loader');
const submitBtn = loginForm.querySelector('button[type="submit"]');

const TOKEN_KEY = 'cms_admin_token';
const REMEMBER_KEY = 'cms_remember_username';
let token = localStorage.getItem(TOKEN_KEY) || '';

// Khôi phục tên đăng nhập nếu đã ghi nhớ
const savedUsername = localStorage.getItem(REMEMBER_KEY);
if (savedUsername) {
    document.getElementById('username').value = savedUsername;
    rememberCheckbox.checked = true;
}
let allImages = [];

function setMessage(element, text, type) {
    element.textContent = text || '';
    element.classList.remove('success', 'error');
    if (type) {
        element.classList.add(type);
    }
}

function showLoginError(text) {
    errorMessage.textContent = text;
    errorMessage.style.display = text ? 'block' : 'none';
}

function setLoginLoading(loading) {
    submitBtn.disabled = loading;
    btnText.style.display = loading ? 'none' : '';
    btnLoader.style.display = loading ? '' : 'none';
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
        const preview = `/${encodePath(img.path)}?v=${img.version || Date.now()}`;
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
    showLoginError('');
    setLoginLoading(false);
}

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    showLoginError('');
    setLoginLoading(true);

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    try {
        await login(username, password);
        // Lưu tên đăng nhập nếu chọn ghi nhớ
        if (rememberCheckbox.checked) {
            localStorage.setItem(REMEMBER_KEY, username);
        } else {
            localStorage.removeItem(REMEMBER_KEY);
        }
        showCMS();
        await fetchImages();
    } catch (error) {
        showLoginError(error.message);
    } finally {
        setLoginLoading(false);
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

// ===== TAB NAVIGATION =====
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
        this.classList.add('active');
        const target = document.getElementById('tab-' + this.dataset.tab);
        if (target) target.classList.remove('hidden');
    });
});

// ===== CONTENT MANAGEMENT =====

const CONTENT_BLOCKS = {
    chaca: {
        fields: ['title', 'desc', 'price', 'ingredients'],
        hasIngredients: true
    },
    team: {
        fields: ['desc'],
        hasIngredients: false
    },
    metcom: {
        fields: ['title', 'desc', 'price', 'ingredients'],
        hasIngredients: true
    }
};

function loadContentFromStorage() {
    Object.entries(CONTENT_BLOCKS).forEach(([block, config]) => {
        config.fields.forEach(field => {
            const saved = localStorage.getItem(`content_${block}_${field}`);
            const el = document.getElementById(`${block}-${field}`);
            if (saved !== null && el) {
                el.value = saved;
            }
        });
    });
}

function saveBlock(block) {
    const config = CONTENT_BLOCKS[block];
    if (!config) return;
    config.fields.forEach(field => {
        const el = document.getElementById(`${block}-${field}`);
        if (el) localStorage.setItem(`content_${block}_${field}`, el.value);
    });
    showContentMessage(`✅ Đã lưu "${getBlockLabel(block)}" thành công!`, 'success');
}

function getBlockLabel(block) {
    const labels = {
        chaca: 'Chả Cá Lã Vọng',
        team: 'Đội ngũ đầu bếp',
        metcom: 'Mẹt Cơm Nhà'
    };
    return labels[block] || block;
}

function buildPreviewHTML(block) {
    const get = id => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
    };

    if (block === 'team') {
        const desc = get('team-desc');
        return `
            <div class="preview-label">👁 Xem trước nội dung</div>
            <div class="preview-desc">${desc}</div>
        `;
    }

    const title = get(`${block}-title`);
    const desc = get(`${block}-desc`);
    const price = get(`${block}-price`);
    const ingredients = get(`${block}-ingredients`);
    const tags = ingredients
        .split('\n')
        .filter(l => l.trim())
        .map(l => `<span>${l.trim()}</span>`)
        .join('');

    return `
        <div class="preview-label">👁 Xem trước nội dung</div>
        <div class="preview-title">${title}</div>
        <div class="preview-desc">${desc}</div>
        ${price ? `<div class="preview-price">💰 ${price}</div>` : ''}
        ${tags ? `<div class="preview-tags">${tags}</div>` : ''}
    `;
}

document.querySelectorAll('.btn-save-block').forEach(btn => {
    btn.addEventListener('click', function () {
        saveBlock(this.dataset.block);
    });
});

document.querySelectorAll('.btn-preview-block').forEach(btn => {
    btn.addEventListener('click', function () {
        const block = this.dataset.block;
        const previewEl = document.getElementById(`${block}-preview`);
        if (!previewEl) return;

        const isVisible = !previewEl.classList.contains('hidden');
        if (isVisible) {
            previewEl.classList.add('hidden');
            return;
        }
        previewEl.innerHTML = buildPreviewHTML(block);
        previewEl.classList.remove('hidden');
    });
});

document.getElementById('saveAllBtn')?.addEventListener('click', function () {
    Object.keys(CONTENT_BLOCKS).forEach(block => saveBlock(block));
    showContentMessage('✅ Đã lưu tất cả nội dung thành công!', 'success');
});

function showContentMessage(text, type) {
    const el = document.getElementById('contentMessage');
    if (!el) return;
    el.textContent = text;
    el.className = `message ${type}`;
    clearTimeout(el._timer);
    el._timer = setTimeout(() => {
        el.textContent = '';
        el.className = 'message';
    }, 4000);
}

loadContentFromStorage();