// === 1. 模拟数据库 (所有商品数据都在这里改) ===
const productsDB = [
    {
        id: 1,
        name: "Miao Xiaoban - Levitating Ver.",
        price: 2599,
        image: "https://images.unsplash.com/photo-1620641788421-7f1c338e85a4?q=80&w=800",
        desc: "旗舰级悬浮版。结合磁悬浮技术与全息显示，内置AI语音交互芯片。赛博国潮的巅峰之作。",
        category: "Exclusives"
    },
    {
        id: 2,
        name: "Miao Xiaoban - Basic",
        price: 899,
        image: "https://images.unsplash.com/photo-1616788494707-ec28f09d05a1?q=80&w=800",
        desc: "入门款智能手办。具备基础语音对话功能，不含悬浮底座，适合桌面陪伴。",
        category: "Toys"
    },
    {
        id: 3,
        name: "Imperial Cat Blind Box",
        price: 69,
        image: "https://images.unsplash.com/photo-1535581652167-3d6b98c5f2b8?q=80&w=800",
        desc: "紫禁御喵房盲盒系列。共12款常规+1款隐藏，不仅是玩具，更是宫廷文化的缩影。",
        category: "Blind Box"
    },
    {
        id: 4,
        name: "NFC Unlock Card - Rare",
        price: 39,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800",
        desc: "稀有级NFC解锁卡。刷入设备可解锁隐藏性格“傲娇贵妃”及专属语音包。",
        category: "Accessories"
    },
    {
        id: 5,
        name: "Cyber Hoodie 2026",
        price: 499,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800",
        desc: "AI造物局联名卫衣，反光材质，夜间发光。",
        category: "Apparel"
    }
];

// === 2. 初始化：加载Header和Footer (避免每个页面都写一遍) ===
document.addEventListener('DOMContentLoaded', () => {
    loadHeaderFooter();
    updateCartCount();
    
    // 判断当前是哪个页面，执行对应逻辑
    if (document.getElementById('product-list')) renderShop();
    if (document.getElementById('product-detail')) renderDetail();
    if (document.getElementById('cart-items')) renderCart();
});

function loadHeaderFooter() {
    const headerHTML = `
        <div class="logo"><a href="index.html">AI CREATION</a></div>
        <nav class="nav-menu">
            <a href="shop.html">Shop All</a>
            <a href="shop.html?cat=Toys">Toys</a>
            <a href="shop.html?cat=Exclusives" style="color:var(--brand-gold)">Exclusives</a>
            <a href="#">Blog</a>
        </nav>
        <div class="nav-icons">
            <a href="#"><i class="fa-solid fa-magnifying-glass"></i></a>
            <a href="cart.html"><i class="fa-solid fa-cart-shopping"></i><span class="cart-count">0</span></a>
        </div>
    `;
    document.querySelector('header').innerHTML = headerHTML;
    
    // Footer 也可以类似加载，这里暂略以保持简洁
}

// === 3. 渲染商店列表 (Shop Page) ===
function renderShop() {
    const container = document.getElementById('product-list');
    let html = '';
    productsDB.forEach(p => {
        html += `
            <div class="product-card">
                <a href="product.html?id=${p.id}">
                    <div class="p-img-box"><img src="${p.image}" alt="${p.name}"></div>
                    <div class="p-info">
                        <div class="p-title">${p.name}</div>
                        <div class="p-price">¥${p.price}</div>
                    </div>
                </a>
            </div>
        `;
    });
    container.innerHTML = html;
}

// === 4. 渲染详情页 (Detail Page) ===
function renderDetail() {
    // 获取URL参数中的 id
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = productsDB.find(p => p.id === id);

    if (!product) {
        document.getElementById('product-detail').innerHTML = '<h2>Product Not Found</h2>';
        return;
    }

    // 填充内容
    document.getElementById('detail-img').src = product.image;
    document.getElementById('detail-title').innerText = product.name;
    document.getElementById('detail-price').innerText = '¥' + product.price;
    document.getElementById('detail-desc').innerText = product.desc;
    
    // 绑定添加到购物车按钮
    document.getElementById('add-to-cart').onclick = () => addToCart(product);
}

// === 5. 购物车逻辑 (LocalStorage) ===
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('ai_cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    const qty = parseInt(document.getElementById('qty').value) || 1;

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ ...product, qty: qty });
    }

    localStorage.setItem('ai_cart', JSON.stringify(cart));
    updateCartCount();
    alert('已加入购物车！');
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('ai_cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.querySelector('.cart-count');
    if (badge) badge.innerText = count;
}

function renderCart() {
    let cart = JSON.parse(localStorage.getItem('ai_cart')) || [];
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        container.innerHTML = '<tr><td colspan="4" style="text-align:center;">购物车是空的</td></tr>';
        totalEl.innerText = '¥0.00';
        return;
    }

    let html = '';
    let total = 0;
    cart.forEach((item, index) => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        html += `
            <tr>
                <td><img src="${item.image}" width="80" style="border:1px solid #eee;"></td>
                <td>
                    <b>${item.name}</b><br>
                    <small style="color:#888;">${item.category}</small>
                </td>
                <td>¥${item.price} x ${item.qty}</td>
                <td>
                    <button onclick="removeFromCart(${index})" style="background:red; color:#fff; border:none; padding:5px 10px; cursor:pointer;">删除</button>
                </td>
            </tr>
        `;
    });
    
    container.innerHTML = html;
    totalEl.innerText = '¥' + total.toFixed(2);
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('ai_cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('ai_cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}