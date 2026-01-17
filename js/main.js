// =================================================================
// 1. 商品数据库 (使用 Pollinations AI 实时生成赛博国潮图片)
// =================================================================
const productsDB = [
    {
        id: 1,
        name: "喵小伴 - 悬浮旗舰版",
        price: 2599,
        // Prompt: 3d render cute robotic cat toy wearing imperial chinese robe floating levitating cyberpunk product photography white background
        image: "https://image.pollinations.ai/prompt/3d%20render%20cute%20robotic%20cat%20toy%20wearing%20imperial%20chinese%20robe%20floating%20levitating%20cyberpunk%20product%20photography%20white%20background?width=800&height=800&nologo=true",
        desc: "旗舰级悬浮版。结合磁悬浮技术与全息显示，内置AI语音交互芯片。赛博国潮的巅峰之作。",
        category: "Toys"
    },
    {
        id: 2,
        name: "喵小伴 - 基础款",
        price: 899,
        // Prompt: cute futuristic robot cat toy sitting matte black and gold finish studio lighting product shot
        image: "https://image.pollinations.ai/prompt/cute%20futuristic%20robot%20cat%20toy%20sitting%20matte%20black%20and%20gold%20finish%20studio%20lighting%20product%20shot?width=800&height=800&nologo=true",
        desc: "入门款智能手办。具备基础语音对话功能，不含悬浮底座，适合桌面陪伴。",
        category: "Toys"
    },
    {
        id: 3,
        name: "宫廷御猫 - 盲盒系列",
        price: 69,
        // Prompt: set of cute chibi cats toys wearing ancient chinese dynasty costumes pop mart style blind box toys 3d render isometric
        image: "https://image.pollinations.ai/prompt/set%20of%20cute%20chibi%20cats%20toys%20wearing%20ancient%20chinese%20dynasty%20costumes%20pop%20mart%20style%20blind%20box%203d%20render%20isometric?width=800&height=800&nologo=true",
        desc: "紫禁御喵房盲盒系列。共12款常规+1款隐藏，不仅是玩具，更是宫廷文化的缩影。",
        category: "Blind Box"
    },
    {
        id: 4,
        name: "NFC 隐藏性格解锁卡",
        price: 39,
        // Prompt: futuristic transparent glass access card with glowing golden chinese dragon hologram chip cyberpunk prop product shot
        image: "https://image.pollinations.ai/prompt/futuristic%20transparent%20glass%20access%20card%20with%20glowing%20golden%20chinese%20dragon%20hologram%20chip%20cyberpunk%20prop%20product%20shot?width=800&height=800&nologo=true",
        desc: "稀有级NFC解锁卡。刷入设备可解锁隐藏性格“傲娇贵妃”及专属语音包。",
        category: "Accessories"
    },
    {
        id: 5,
        name: "赛博龙纹卫衣 2026",
        price: 499,
        // Prompt: futuristic streetwear hoodie black with neon gold dragon embroidery pattern cyberpunk fashion photography
        image: "https://image.pollinations.ai/prompt/futuristic%20streetwear%20hoodie%20black%20with%20neon%20gold%20dragon%20embroidery%20pattern%20cyberpunk%20fashion%20photography?width=800&height=800&nologo=true",
        desc: "AI造物局联名卫衣，反光材质，夜间发光，街头潮流必备。",
        category: "Apparel"
    },
    {
        id: 6,
        name: "全息展示底座",
        price: 299,
        // Prompt: sci-fi magnetic levitation display base with blue neon ring lights product render
        image: "https://image.pollinations.ai/prompt/sci-fi%20magnetic%20levitation%20display%20base%20with%20blue%20neon%20ring%20lights%20product%20render?width=800&height=800&nologo=true",
        desc: "通用型磁悬浮底座，支持所有 AI 造物局系列手办，带有RGB光效。",
        category: "Accessories"
    }
];

// =================================================================
// 2. 页面初始化逻辑
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 检查 header 是否为空，如果是空的（如 shop.html），则自动填充
    // 如果不为空（如 index.html），则保留原本的手写结构
    const header = document.querySelector('header');
    if (header && header.innerHTML.trim() === '') {
        loadHeaderFooter();
    }
    
    // 更新购物车角标数量
    updateCartCount();
    
    // 根据页面 ID 执行对应的渲染逻辑
    if (document.getElementById('product-list')) renderShop();
    if (document.getElementById('product-detail')) renderDetail();
    if (document.getElementById('cart-items')) renderCart();
});

// 动态加载头部（用于 shop.html, product.html 等子页面）
function loadHeaderFooter() {
    const headerHTML = `
        <div class="site-header" style="display:flex; justify-content:space-between; align-items:center; height:100%; width:100%;">
            <div class="nav-left" style="display:flex; gap:20px;">
                <a href="shop.html" style="font-weight:900; font-size:15px; text-transform:uppercase;">全部商品</a>
                <a href="shop.html?cat=Toys" style="font-weight:900; font-size:15px; text-transform:uppercase;">潮流玩具</a>
                <a href="shop.html?cat=Apparel" style="font-weight:900; font-size:15px; text-transform:uppercase; color:#FFD700;">限定发售</a>
            </div>
            
            <a href="index.html" class="site-logo" style="font-family:'Anton'; font-size:2rem; border:3px solid #000; padding:0 10px; color:#000; text-decoration:none; transform: skew(-5deg); display:inline-block;">
                AI CREATION <span>造物局</span>
            </a>
            
            <div class="nav-right" style="display:flex; gap:20px; justify-content:flex-end;">
                <a href="#"><i class="fa-solid fa-magnifying-glass"></i></a>
                <a href="cart.html" style="font-weight:900;">购物车 (<span class="cart-count">0</span>)</a>
            </div>
        </div>
    `;
    
    const headerEl = document.querySelector('header');
    if(headerEl) {
        headerEl.innerHTML = headerHTML;
        // 确保样式与 style.css 中的 site-header 一致
        headerEl.className = 'site-header'; 
    }
}

// =================================================================
// 3. 商店列表页逻辑 (Shop Page)
// =================================================================
function renderShop() {
    const container = document.getElementById('product-list');
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    
    let html = '';
    let filteredProducts = productsDB;
    
    // 根据 URL 参数筛选分类
    if (cat) {
        filteredProducts = productsDB.filter(p => p.category === cat || (cat === 'BlindBox' && p.category === 'Blind Box'));
    }

    filteredProducts.forEach(p => {
        html += `
            <div class="product-card" style="border:2px solid #000; transition:0.3s; background:#fff; position:relative;">
                <a href="product.html?id=${p.id}" style="display:block; text-decoration:none; color:#000;">
                    <div class="p-img-box" style="height:300px; overflow:hidden; position:relative; border-bottom:2px solid #000;">
                        <img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; transition:0.5s;">
                    </div>
                    <div class="p-info" style="padding:20px; text-align:center;">
                        <div class="p-title" style="font-weight:900; text-transform:uppercase; margin-bottom:5px; font-size:1.1rem;">${p.name}</div>
                        <div class="p-price" style="font-family:monospace; color:#666; font-size:1.2rem; font-weight:bold;">¥${p.price}</div>
                    </div>
                </a>
            </div>
        `;
    });
    container.innerHTML = html;
}

// =================================================================
// 4. 商品详情页逻辑 (Detail Page)
// =================================================================
function renderDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = productsDB.find(p => p.id === id);

    if (!product) {
        document.getElementById('product-detail').innerHTML = '<h2 style="text-align:center; padding:50px;">商品不存在</h2>';
        return;
    }

    // 填充数据
    const imgEl = document.getElementById('detail-img');
    if(imgEl) imgEl.src = product.image;
    
    const titleEl = document.getElementById('detail-title');
    if(titleEl) titleEl.innerText = product.name;
    
    const priceEl = document.getElementById('detail-price');
    if(priceEl) priceEl.innerText = '¥' + product.price;
    
    const descEl = document.getElementById('detail-desc');
    if(descEl) descEl.innerText = product.desc;
    
    // 绑定加入购物车事件
    const btn = document.getElementById('add-to-cart');
    if(btn) {
        btn.onclick = () => addToCart(product);
    }
}

// =================================================================
// 5. 购物车逻辑 (LocalStorage)
// =================================================================
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('ai_cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    const qtyInput = document.getElementById('qty');
    const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ ...product, qty: qty });
    }

    localStorage.setItem('ai_cart', JSON.stringify(cart));
    updateCartCount();
    alert('已成功加入购物车！');
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('ai_cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(b => b.innerText = count);
}

function renderCart() {
    let cart = JSON.parse(localStorage.getItem('ai_cart')) || [];
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        container.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:50px; font-size:1.2rem;">您的购物车是空的</td></tr>';
        if(totalEl) totalEl.innerText = '¥0.00';
        return;
    }

    let html = '';
    let total = 0;
    cart.forEach((item, index) => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        html += `
            <tr>
                <td style="padding:20px; border-bottom:1px solid #eee;">
                    <img src="${item.image}" width="80" style="border:2px solid #000;">
                </td>
                <td style="padding:20px; border-bottom:1px solid #eee;">
                    <b style="font-size:1.1rem;">${item.name}</b><br>
                    <small style="color:#888;">分类: ${item.category}</small>
                </td>
                <td style="padding:20px; border-bottom:1px solid #eee; font-family:monospace; font-size:1.1rem;">
                    ¥${item.price} x ${item.qty}
                </td>
                <td style="padding:20px; border-bottom:1px solid #eee;">
                    <button onclick="removeFromCart(${index})" style="background:#000; color:#fff; border:none; padding:8px 15px; font-weight:bold; cursor:pointer;">删除</button>
                </td>
            </tr>
        `;
    });
    
    if(container) container.innerHTML = html;
    if(totalEl) totalEl.innerText = '¥' + total.toFixed(2);
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('ai_cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('ai_cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}