const API_URL = 'http://localhost:3000';
let allItems = [];
let activeCategory = 'Всички';

function closeModal(id) { 
    const m = document.getElementById(id);
    if(m) m.style.display = "none"; 
}

async function loadItems() {
    try {
        const res = await fetch(`${API_URL}/items`);
        allItems = await res.json();
        applyFiltersAndSort();
    } catch(e) {
        allItems = [
            { id: 101, title: "iPhone 13 Pro", price: 1150, category: "Електроника", city: "София", description: "Перфектен.", sellerEmail: "demo@mail.bg", img: null },
            { id: 102, title: "Маратонки Adidas", price: 90, category: "Спорт", city: "Варна", description: "Чисто нови.", sellerEmail: "user@mail.bg", img: null }
        ];
        applyFiltersAndSort();
    }
}

function displayItems(items) {
    const container = document.getElementById('itemsContainer');
    container.innerHTML = items.length === 0 ? '<p>Няма намерени обяви.</p>' : '';
    
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card';
        const imgHtml = item.img ? `<img src="${item.img}" alt="item">` : `<i class="fa-solid fa-image fa-2x" style="color:#ccc;"></i>`;

        div.innerHTML = `
            <div class="item-img-container">${imgHtml}</div>
            <div style="padding:15px;">
                <h3 style="font-size:1.1rem;">${item.title}</h3>
                <p style="color:#c9184a; font-weight:700; font-size:1.2rem;">${item.price} лв.</p>
                <p style="font-size:12px; color:#777;">${item.city} | ${item.category}</p>
            </div>
        `;
        div.onclick = () => openDetails(item.id);
        container.appendChild(div);
    });
    updateMyAdsCount();
}

function openDetails(id) {
    const item = allItems.find(i => i.id === id);
    if (!item) return;

    const imgHtml = item.img ? `<img src="${item.img}" style="width:100%; border-radius:12px; margin-bottom:15px; max-height:400px; object-fit:contain;">` : '';

    document.getElementById('detailsContent').innerHTML = `
        ${imgHtml}
        <h2 style="color:#c9184a;">${item.title}</h2>
        <p style="font-size:24px; font-weight:bold; margin:10px 0;">${item.price} лв.</p>
        <p><b>Град:</b> ${item.city}</p>
        <p><b>Категория:</b> ${item.category}</p>
        <hr style="margin:15px 0; border:0; border-top:1px solid #eee;">
        <p><b>Описание:</b></p>
        <p style="white-space: pre-wrap; line-height:1.6;">${item.description || 'Няма описание.'}</p>
        <div style="margin-top:20px; padding:15px; background:#f9f9f9; border-radius:8px;">
            <p><b>Продавач:</b> ${item.sellerEmail}</p>
        </div>
    `;
    document.getElementById('detailsModal').style.display = "block";
}

function applyFiltersAndSort() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const sort = document.getElementById('sortSelect').value;

    let filtered = allItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(term);
        const matchesCat = (activeCategory === 'Всички') || (item.category === activeCategory);
        return matchesSearch && matchesCat;
    });

    if (sort === 'priceAsc') filtered.sort((a,b) => a.price - b.price);
    else if (sort === 'priceDesc') filtered.sort((a,b) => b.price - a.price);

    displayItems(filtered);
}

function filterByCategory(cat) {
    activeCategory = cat;
    document.querySelectorAll('.sidebar li').forEach(li => {
        li.classList.remove('active');
        if (li.innerText.trim() === cat) li.classList.add('active');
    });
    applyFiltersAndSort();
}

function updateMyAdsCount() {
    const email = localStorage.getItem('userEmail');
    const myAds = allItems.filter(item => item.sellerEmail === email);
    const countEl = document.getElementById('myAdsCount');
    if (countEl) countEl.innerText = myAds.length;
}

window.onload = () => {
    if (localStorage.getItem('token')) {
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('registerBtn').style.display = 'none';
        document.getElementById('profileBtn').style.display = 'inline-block';
        document.getElementById('addAdBtn').style.display = 'inline-block';
        document.getElementById('logoutBtn').style.display = 'inline-block';
        
        document.getElementById('profileFullName').innerText = localStorage.getItem('userName');
        document.getElementById('displayEmail').innerText = localStorage.getItem('userEmail');
        document.getElementById('displayPhone').innerText = localStorage.getItem('userPhone');
    }

    loadItems();

    document.getElementById('searchBtn').onclick = () => applyFiltersAndSort();
    document.getElementById('loginBtn').onclick = () => document.getElementById('loginModal').style.display="block";
    document.getElementById('registerBtn').onclick = () => document.getElementById('registerModal').style.display="block";
    document.getElementById('profileBtn').onclick = () => document.getElementById('profileModal').style.display="block";
    document.getElementById('addAdBtn').onclick = () => document.getElementById('addAdModal').style.display="block";
    document.getElementById('logoutBtn').onclick = () => { localStorage.clear(); location.reload(); };

    document.getElementById('addAdForm').onsubmit = (e) => {
        e.preventDefault();
        const file = document.getElementById('itemFile').files[0];
        
        const saveAd = (imgBase64) => {
            const newAd = {
                id: Date.now(),
                title: document.getElementById('itemTitle').value,
                price: Number(document.getElementById('itemPrice').value),
                category: document.getElementById('itemCategory').value,
                city: document.getElementById('itemCity').value,
                description: document.getElementById('itemDesc').value,
                sellerEmail: localStorage.getItem('userEmail'),
                img: imgBase64
            };
            allItems.unshift(newAd);
            applyFiltersAndSort();
            alert("Обявата е добавена!");
            e.target.reset();
            closeModal('addAdModal');
        };

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => saveAd(event.target.result);
            reader.readAsDataURL(file);
        } else {
            saveAd(null);
        }
    };

    document.getElementById('registerForm').onsubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('sim_email', document.getElementById('regEmail').value.trim());
        localStorage.setItem('sim_pass', document.getElementById('regPassword').value);
        localStorage.setItem('sim_name', document.getElementById('regFirstName').value + " " + document.getElementById('regLastName').value);
        localStorage.setItem('sim_phone', document.getElementById('regPhone').value);
        alert("Успешна регистрация! Влезте в профила си.");
        closeModal('registerModal');
        document.getElementById('loginModal').style.display="block";
    };

    document.getElementById('loginForm').onsubmit = (e) => {
        e.preventDefault();
        const mail = document.getElementById('loginEmail').value.trim();
        const pass = document.getElementById('loginPassword').value;
        if (mail === localStorage.getItem('sim_email') && pass === localStorage.getItem('sim_pass')) {
            localStorage.setItem('token', 'active');
            localStorage.setItem('userEmail', mail);
            localStorage.setItem('userName', localStorage.getItem('sim_name'));
            localStorage.setItem('userPhone', localStorage.getItem('sim_phone'));
            location.reload();
        } else alert("Грешен вход!");
    };
};
