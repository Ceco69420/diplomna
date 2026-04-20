const API_URL = 'http://localhost:3000';
let allItems = [];

// Функция за затваряне на модалните прозорци
function closeModal(id) { 
    document.getElementById(id).style.display = "none"; 
}

// Зареждане на обявите от сървъра
async function loadItems() {
    try {
        const res = await fetch(`${API_URL}/items`);
        allItems = await res.json();
        displayItems(allItems);
    } catch(e) {
        document.getElementById('itemsContainer').innerHTML = "<p>Сървърът не е стартиран или няма връзка.</p>";
    }
}

// Показване на обявите в мрежата
function displayItems(items) {
    const container = document.getElementById('itemsContainer');
    container.innerHTML = items.length === 0 ? '<p>Няма намерени обяви.</p>' : '';
    
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerHTML = `
            <img src="${item.imageUrl || 'https://placehold.co/250x200/ffe5ec/c9184a?text=Snimka'}" class="item-img">
            <div class="item-info">
                <h3 class="item-title">${item.title}</h3>
                <p class="item-price">${item.price} лв.</p>
                <div class="item-meta">
                    <span><i class="fa-solid fa-location-dot"></i> ${item.city}</span>
                    <span><i class="fa-solid fa-tag"></i> ${item.category}</span>
                </div>
            </div>
        `;
        div.onclick = () => openDetails(item.id);
        container.appendChild(div);
    });
}

// Отваряне на детайли за конкретна обява
async function openDetails(id) {
    const res = await fetch(`${API_URL}/items/${id}`);
    const item = await res.json();
    document.getElementById('detailsContent').innerHTML = `
        <img src="${item.imageUrl || 'https://placehold.co/800x400/ffe5ec/c9184a?text=Snimka'}" class="details-img">
        <div class="details-body">
            <h2 style="margin-bottom:10px;">${item.title}</h2>
            <p style="color:#c9184a; font-weight:700; font-size:24px; margin-bottom:15px;">${item.price} лв.</p>
            <p style="margin-bottom:20px; line-height:1.6;">${item.description}</p>
            <div class="seller-info" style="background:#fff0f3; padding:15px; border-radius:8px;">
                <p><strong>Град:</strong> ${item.city}</p>
                <p><strong>Категория:</strong> ${item.category}</p>
                <p><strong>Състояние:</strong> ${item.condition}</p>
            </div>
        </div>
    `;
    document.getElementById('detailsModal').style.display = "block";
}

// Основна логика при зареждане на страницата
window.onload = () => {
    const token = localStorage.getItem('token');
    
    // Проверка дали потребителят е логнат
    if (token) {
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('registerBtn').style.display = 'none';
        document.getElementById('addAdBtn').style.display = 'inline-block';
        document.getElementById('logoutBtn').style.display = 'inline-block';
    }

    loadItems();

    // --- ЛОГИКА ЗА ТЪРСАЧКАТА ---
    document.getElementById('searchBtn').onclick = () => {
        const term = document.getElementById('searchInput').value.toLowerCase();
        const filtered = term === "" 
            ? allItems 
            : allItems.filter(i => 
                i.title.toLowerCase().includes(term) || 
                i.description.toLowerCase().includes(term)
            );
        displayItems(filtered);
    };

    // Отваряне на модали
    document.getElementById('loginBtn').onclick = () => document.getElementById('loginModal').style.display = "block";
    document.getElementById('registerBtn').onclick = () => document.getElementById('registerModal').style.display = "block";
    document.getElementById('addAdBtn').onclick = () => document.getElementById('addAdModal').style.display = "block";
    
    // Изход
    document.getElementById('logoutBtn').onclick = () => {
        localStorage.removeItem('token');
        location.reload();
    };

    // Форма за Вход
    document.getElementById('loginForm').onsubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: document.getElementById('loginEmail').value, 
                password: document.getElementById('loginPassword').value 
            })
        });
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('token', data.access_token);
            location.reload();
        } else {
            alert("Грешен имейл или парола!");
        }
    };

    // Форма за Регистрация
    document.getElementById('registerForm').onsubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: document.getElementById('regFirstName').value,
                lastName: document.getElementById('regLastName').value,
                email: document.getElementById('regEmail').value,
                passwordPlain: document.getElementById('regPassword').value,
                phone: document.getElementById('regPhone').value
            })
        });
        if (res.ok) {
            alert("Регистрацията е успешна! Вече можете да влезете.");
            location.reload();
        } else {
            alert("Грешка при регистрация. Възможно е имейлът да е зает.");
        }
    };

    // Форма за Добавяне на обява
    document.getElementById('addAdForm').onsubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('title', document.getElementById('itemTitle').value);
        fd.append('description', document.getElementById('itemDesc').value);
        fd.append('price', document.getElementById('itemPrice').value);
        fd.append('category', document.getElementById('itemCategory').value);
        fd.append('city', document.getElementById('itemCity').value);
        fd.append('condition', document.getElementById('itemCondition').value);
        
        const fileInput = document.getElementById('itemFile');
        if (fileInput.files[0]) {
            fd.append('file', fileInput.files[0]);
        }

        const res = await fetch(`${API_URL}/items`, { 
            method: 'POST', 
            headers: { 'Authorization': `Bearer ${token}` }, 
            body: fd 
        });

        if (res.ok) {
            location.reload();
        } else {
            alert("Грешка при публикуване на обявата.");
        }
    };
};