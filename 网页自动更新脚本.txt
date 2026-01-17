<# :
@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================================
echo        AI造物局 · 全站重构与发布工具 (Memphis Pop版)
echo ========================================================
echo.
echo [1/3] 正在初始化目录结构...
if not exist "css" mkdir css
if not exist "js" mkdir js

echo [2/3] 正在写入核心代码文件 (PowerShell)...
powershell -NoProfile -Command "iex (Get-Content '%~f0' -Raw)"

echo [3/3] 正在同步到 GitHub...
git add .
git commit -m "Refactor: Memphis Pop Style Update %date% %time%"
git push origin main

echo.
echo ========================================================
echo               ★ 大功告成 ★
echo ========================================================
echo 请等待 1-2 分钟后访问: http://www.aizwj.top
echo.
pause
goto :eof
#>

# --- 下面是 PowerShell 脚本部分，用于生成文件内容 ---

$styles = @"
/* === AI Creation Bureau Memphis Pop Style === */
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Noto+Sans+SC:wght@500;700;900&display=swap');

:root {
    --pop-red: #FF3B30; --pop-yellow: #FFCC00; --pop-blue: #007AFF;
    --pop-black: #000000; --pop-white: #FFFFFF;
    --border-width: 4px; --border-radius: 24px;
    --hard-shadow: 8px 8px 0px var(--pop-black);
    --hover-shadow: 12px 12px 0px var(--pop-black);
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: 'Noto Sans SC', sans-serif; color: var(--pop-black);
    background-color: #f8f8f8; line-height: 1.5;
    background-image: radial-gradient(var(--pop-black) 1px, transparent 1px); background-size: 30px 30px;
}
a { text-decoration: none; color: inherit; transition: 0.2s; }
ul { list-style: none; }

/* Header */
.site-header {
    position: sticky; top: 0; z-index: 1000; background: rgba(255, 255, 255, 0.98);
    border-bottom: var(--border-width) solid var(--pop-black); padding: 15px 40px;
    display: flex; justify-content: space-between; align-items: center;
}
.nav-link {
    font-weight: 900; text-transform: uppercase; font-size: 15px; padding: 8px 20px;
    border-radius: 50px; border: 2px solid transparent; transition: 0.2s;
}
.nav-link:hover {
    background: var(--pop-yellow); border-color: var(--pop-black);
    box-shadow: 4px 4px 0 var(--pop-black); transform: translate(-2px, -2px);
}
.logo {
    font-family: 'Anton', sans-serif; font-size: 2.2rem; color: var(--pop-black);
    background: var(--pop-yellow); padding: 5px 25px; border: var(--border-width) solid var(--pop-black);
    border-radius: 16px; box-shadow: 5px 5px 0 var(--pop-black); transform: rotate(-3deg);
    display: inline-block; transition: 0.3s;
}
.logo:hover { transform: rotate(0deg) scale(1.05); box-shadow: 8px 8px 0 var(--pop-black); }

/* Buttons */
.btn-primary {
    display: inline-block; background: var(--pop-black); color: var(--pop-white);
    padding: 15px 35px; font-weight: 900; font-size: 1.1rem; text-transform: uppercase;
    border: var(--border-width) solid var(--pop-black); border-radius: 50px;
    box-shadow: var(--hard-shadow); transition: 0.2s; cursor: pointer; text-align: center;
}
.btn-primary:hover {
    transform: translate(-4px, -4px); box-shadow: var(--hover-shadow); background: var(--pop-blue); color: #fff;
}
.btn-secondary { background: var(--pop-white); color: var(--pop-black); }
.btn-secondary:hover { background: var(--pop-yellow); }

/* Layout */
.container { max-width: 1400px; margin: 0 auto; }
.section-red { background-color: var(--pop-red); padding: 80px 5%; border-top: var(--border-width) solid #000; border-bottom: var(--border-width) solid #000; background-image: radial-gradient(rgba(0,0,0,0.15) 15%, transparent 16%); background-size: 20px 20px; }
.section-yellow { background-color: var(--pop-yellow); padding: 80px 5%; border-top: var(--border-width) solid #000; border-bottom: var(--border-width) solid #000; }
.section-white { background-color: var(--pop-white); padding: 80px 5%; border-bottom: var(--border-width) solid #000; }
.section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 50px; }
.section-title {
    font-family: 'Anton', sans-serif; font-size: 4rem; text-transform: uppercase; line-height: 1; margin: 0;
    -webkit-text-stroke: 2px var(--pop-black); color: var(--pop-white); text-shadow: 4px 4px 0 rgba(0,0,0,0.1);
}
.section-white .section-title { color: var(--pop-black); -webkit-text-stroke: 0px; text-shadow: none; }

/* Cards */
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 40px; }
.product-card {
    background: var(--pop-white); border: var(--border-width) solid var(--pop-black);
    border-radius: var(--border-radius); overflow: hidden; position: relative;
    transition: 0.3s; box-shadow: var(--hard-shadow);
}
.product-card:hover { transform: translate(-5px, -10px) rotate(1deg); box-shadow: var(--hover-shadow); z-index: 10; }
.p-img-box { height: 320px; overflow: hidden; border-bottom: var(--border-width) solid #000; background: #f0f0f0; position: relative; }
.p-img-box img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
.product-card:hover .p-img-box img { transform: scale(1.1); }
.price-tag {
    position: absolute; top: 15px; right: 15px; background: var(--pop-yellow); color: #000;
    font-weight: 900; font-family: monospace; font-size: 1.2rem; padding: 5px 15px;
    border: var(--border-width) solid #000; border-radius: 50px; box-shadow: 3px 3px 0 #000; z-index: 2;
}
.p-info { padding: 25px; text-align: center; }
.p-title { font-weight: 900; font-size: 1.3rem; margin-bottom: 15px; text-transform: uppercase; }
.p-btn {
    display: block; width: 100%; background: var(--pop-black); color: white; padding: 12px;
    border-radius: 12px; font-weight: 900; text-transform: uppercase; border: 2px solid #000; transition: 0.2s;
}
.product-card:hover .p-btn { background: var(--pop-blue); box-shadow: 4px 4px 0 #000; transform: translate(-2px, -2px); }

/* Detail & Cart */
.detail-container {
    background: #fff; border: var(--border-width) solid #000; border-radius: 30px;
    padding: 40px; box-shadow: var(--hard-shadow); display: flex; gap: 50px; flex-wrap: wrap;
}
.cart-table { width: 100%; border-collapse: separate; border-spacing: 0 15px; }
.cart-table td { background: #fff; border-top: 2px solid #000; border-bottom: 2px solid #000; padding: 20px; }
.cart-table td:first-child { border-left: 2px solid #000; border-radius: 15px 0 0 15px; }
.cart-table td:last-child { border-right: 2px solid #000; border-radius: 0 15px 15px 0; }

footer { background: var(--pop-black); color: var(--pop-white); padding: 80px 5%; border-top: 10px solid var(--pop-yellow); }
.footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; }
.footer-col h4 { color: var(--pop-yellow); font-family: 'Anton'; font-size: 1.5rem; margin-bottom: 25px; }
.footer-col a { color: #aaa; font-weight: 500; display: block; margin-bottom: 12px; }
.footer-col a:hover { color: var(--pop-white); padding-left: 8px; color: var(--pop-yellow); }
.cart-count { background: var(--pop-red); color: white; padding: 2px 6px; border-radius: 10px; border: 2px solid #000; position: relative; top: -10px; font-weight: bold; font-size: 12px; }

@media (max-width: 768px) { .site-header { padding: 15px 20px; } .nav-left { display: none; } .section-title { font-size: 2.5rem; } }
"@

$mainjs = @"
const productsDB = [
    { id: 1, name: "喵小伴 - 悬浮旗舰版", price: 2599, image: "https://image.pollinations.ai/prompt/3d%20render%20cute%20robotic%20cat%20toy%20wearing%20imperial%20chinese%20robe%20floating%20levitating%20cyberpunk%20product%20photography%20white%20background?width=800&height=800&nologo=true", desc: "旗舰级悬浮版。结合磁悬浮技术与全息显示，内置AI语音交互芯片。", category: "Toys" },
    { id: 2, name: "喵小伴 - 基础款", price: 899, image: "https://image.pollinations.ai/prompt/cute%20futuristic%20robot%20cat%20toy%20sitting%20matte%20black%20and%20gold%20finish%20studio%20lighting%20product%20shot?width=800&height=800&nologo=true", desc: "入门款智能手办。适合桌面陪伴。", category: "Toys" },
    { id: 3, name: "宫廷御猫 - 盲盒系列", price: 69, image: "https://image.pollinations.ai/prompt/set%20of%20cute%20chibi%20cats%20toys%20wearing%20ancient%20chinese%20dynasty%20costumes%20pop%20mart%20style%20blind%20box%203d%20render%20isometric?width=800&height=800&nologo=true", desc: "紫禁御喵房盲盒系列。12款常规+1款隐藏。", category: "Blind Box" },
    { id: 4, name: "NFC 隐藏性格解锁卡", price: 39, image: "https://image.pollinations.ai/prompt/futuristic%20transparent%20glass%20access%20card%20with%20glowing%20golden%20chinese%20dragon%20hologram%20chip%20cyberpunk%20prop%20product%20shot?width=800&height=800&nologo=true", desc: "解锁隐藏性格“傲娇贵妃”。", category: "Accessories" },
    { id: 5, name: "赛博龙纹卫衣 2026", price: 499, image: "https://image.pollinations.ai/prompt/futuristic%20streetwear%20hoodie%20black%20with%20neon%20gold%20dragon%20embroidery%20pattern%20cyberpunk%20fashion%20photography?width=800&height=800&nologo=true", desc: "AI造物局联名卫衣。", category: "Apparel" },
    { id: 6, name: "全息展示底座", price: 299, image: "https://image.pollinations.ai/prompt/sci-fi%20magnetic%20levitation%20display%20base%20with%20blue%20neon%20ring%20lights%20product%20render?width=800&height=800&nologo=true", desc: "通用型磁悬浮底座。", category: "Accessories" }
];

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    if (header && header.innerHTML.trim() === '') loadHeaderFooter();
    if (document.querySelector('footer') && document.querySelector('footer').innerHTML.trim() === '') loadFooter();
    updateCartCount();
    if (document.getElementById('product-list')) renderShop();
    if (document.getElementById('product-detail')) renderDetail();
    if (document.getElementById('cart-items')) renderCart();
});

function loadHeaderFooter() {
    document.querySelector('header').innerHTML = \`
        <div class="nav-left"><a href="shop.html" class="nav-link">全部商品</a><a href="shop.html?cat=Toys" class="nav-link">潮流玩具</a><a href="shop.html?cat=Apparel" class="nav-link" style="background:var(--pop-yellow); border-color:#000;">限定发售</a></div>
        <a href="index.html" class="logo">AI CREATION <span>造物局</span></a>
        <div class="nav-right"><a href="#" class="nav-link"><i class="fa-solid fa-magnifying-glass"></i></a><a href="cart.html" class="nav-link" style="background:var(--pop-blue); color:white; border-color:#000;"><i class="fa-solid fa-cart-shopping"></i> <span class="cart-count">0</span></a></div>
    \`;
    document.querySelector('header').className = 'site-header';
}
function loadFooter() {
    document.querySelector('footer').innerHTML = \`
        <div class="container footer-grid">
            <div class="footer-col"><h4>选购</h4><a href="shop.html">新品</a><a href="shop.html">热销</a></div>
            <div class="footer-col"><h4>服务</h4><a href="#">订单</a><a href="#">售后</a></div>
            <div class="footer-col"><h4>关于</h4><a href="#">故事</a><a href="#">联系</a></div>
            <div class="footer-col"><h4>订阅</h4><div style="display:flex;gap:10px;"><input type="email" placeholder="Email" style="padding:10px;border:2px solid #000;border-radius:10px;width:100%;"><button style="background:var(--pop-yellow);border:2px solid #000;border-radius:10px;font-weight:bold;padding:0 15px;">GO</button></div></div>
        </div>
        <div style="text-align:center; margin-top:50px; font-size:12px; color:#888;">&copy; 2026 AI CREATION BUREAU.</div>
    \`;
}
function renderShop() {
    const cat = new URLSearchParams(window.location.search).get('cat');
    const filtered = cat ? productsDB.filter(p => p.category === cat || (cat==='BlindBox' && p.category==='Blind Box')) : productsDB;
    let html = '';
    filtered.forEach(p => {
        html += \`<div class="product-card"><div class="price-tag">¥\${p.price}</div><a href="product.html?id=\${p.id}"><div class="p-img-box"><img src="\${p.image}"></div><div class="p-info"><div class="p-title">\${p.name}</div><div class="p-btn">加入购物车</div></div></a></div>\`;
    });
    document.getElementById('product-list').innerHTML = html;
}
function renderDetail() {
    const id = parseInt(new URLSearchParams(window.location.search).get('id'));
    const p = productsDB.find(x => x.id === id);
    if(!p) return document.getElementById('product-detail').innerHTML='<h2>未找到</h2>';
    document.getElementById('detail-img').src=p.image; document.getElementById('detail-title').innerText=p.name;
    document.getElementById('detail-price').innerText='¥'+p.price; document.getElementById('detail-desc').innerText=p.desc;
    document.getElementById('add-to-cart').onclick=()=>addToCart(p);
}
function addToCart(p) {
    let cart = JSON.parse(localStorage.getItem('ai_cart'))||[];
    let exist = cart.find(x=>x.id===p.id);
    let qty = parseInt(document.getElementById('qty')?.value||1);
    exist ? exist.qty+=qty : cart.push({...p, qty});
    localStorage.setItem('ai_cart', JSON.stringify(cart)); updateCartCount(); alert('已加入购物车');
}
function updateCartCount() {
    let count = (JSON.parse(localStorage.getItem('ai_cart'))||[]).reduce((s,i)=>s+i.qty,0);
    document.querySelectorAll('.cart-count').forEach(e=>e.innerText=count);
}
function renderCart() {
    let cart = JSON.parse(localStorage.getItem('ai_cart'))||[];
    let con = document.getElementById('cart-items');
    if(!cart.length) { con.innerHTML='<tr><td colspan="4" style="text-align:center;padding:30px;">购物车为空</td></tr>'; document.getElementById('cart-total').innerText='¥0.00'; return; }
    let html='', total=0;
    cart.forEach((i,idx)=>{
        total+=i.price*i.qty;
        html+=\`<tr><td><img src="\${i.image}" width="60" style="border:2px solid #000;border-radius:10px;"></td><td><b>\${i.name}</b></td><td>¥\${i.price} x \${i.qty}</td><td><button onclick="removeFromCart(\${idx})" style="background:#000;color:#fff;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;">删除</button></td></tr>\`;
    });
    con.innerHTML=html; document.getElementById('cart-total').innerText='¥'+total.toFixed(2);
}
function removeFromCart(i) {
    let cart = JSON.parse(localStorage.getItem('ai_cart'))||[]; cart.splice(i,1);
    localStorage.setItem('ai_cart', JSON.stringify(cart)); renderCart(); updateCartCount();
}
"@

$index = @"
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI造物局 | 首页</title>
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
<div style="background:var(--pop-yellow);border-bottom:3px solid #000;padding:10px;font-weight:900;text-align:center;">🎉 全场满 ¥500 免运费 /// 2026 赛博御猫限定发售</div>
<header class="site-header"></header>
<div style="padding:60px 5%;background:var(--pop-blue);background-image:radial-gradient(rgba(255,255,255,0.2) 20%,transparent 20%);background-size:30px 30px;border-bottom:4px solid #000;">
 <div style="max-width:1400px;margin:0 auto;background:#000;border-radius:40px;height:650px;position:relative;overflow:hidden;border:4px solid #000;box-shadow:12px 12px 0 rgba(0,0,0,0.2);">
  <div style="position:absolute;width:100%;height:100%;background:url('https://image.pollinations.ai/prompt/cyberpunk%20forbidden%20city%20beijing%20architecture%20neon%20lights%20futuristic%20night%208k%20wallpaper?width=1920&height=1080&nologo=true') center/cover;opacity:0.85;"></div>
  <div style="position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:center;padding-left:8%;width:100%;max-width:900px;">
   <div style="background:var(--pop-yellow);color:#000;display:inline-block;padding:10px 20px;font-weight:900;font-size:1.2rem;transform:rotate(-2deg);border:3px solid #000;border-radius:15px;box-shadow:5px 5px 0 #fff;margin-bottom:30px;">NEW DROP // 2026</div>
   <h1 style="font-family:'Anton';font-size:clamp(4rem,8vw,6.5rem);color:#fff;line-height:0.9;text-transform:uppercase;margin-bottom:30px;text-shadow:6px 6px 0 #000;-webkit-text-stroke:3px #000;">Levitating<br><span style="color:var(--pop-blue);text-shadow:6px 6px 0 #000;-webkit-text-stroke:3px #fff;">Future</span></h1>
   <a href="product.html?id=1" class="btn-primary" style="background:var(--pop-red);border-color:#000;align-self:flex-start;">立即抢购</a>
  </div>
 </div>
</div>
<section class="section-red">
 <div class="section-header container"><h2 class="section-title" style="color:#fff;">探索宇宙</h2><a href="shop.html" class="btn-primary btn-secondary">查看全部</a></div>
 <div class="container" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:40px;">
  <div class="product-card" style="height:450px;cursor:pointer;" onclick="window.location.href='shop.html?cat=BlindBox'"><img src="https://image.pollinations.ai/prompt/set%20of%20cute%20chibi%20cats%20toys%20wearing%20ancient%20chinese%20dynasty%20costumes%20pop%20mart%20style%20blind%20box%203d%20render%20isometric?width=800&height=800&nologo=true" style="width:100%;height:100%;object-fit:cover;"><div style="position:absolute;bottom:30px;left:30px;background:var(--pop-yellow);padding:10px 30px;border:3px solid #000;border-radius:50px;font-weight:900;font-size:1.5rem;box-shadow:6px 6px 0 #000;">盲盒系列</div></div>
  <div class="product-card" style="height:450px;cursor:pointer;" onclick="window.location.href='shop.html?cat=Apparel'"><img src="https://image.pollinations.ai/prompt/futuristic%20streetwear%20hoodie%20black%20with%20neon%20gold%20dragon%20embroidery%20pattern%20cyberpunk%20fashion%20photography?width=800&height=800&nologo=true" style="width:100%;height:100%;object-fit:cover;"><div style="position:absolute;bottom:30px;left:30px;background:var(--pop-blue);padding:10px 30px;border:3px solid #000;border-radius:50px;font-weight:900;font-size:1.5rem;color:#fff;box-shadow:6px 6px 0 #000;">潮流穿搭</div></div>
 </div>
</section>
<section class="section-white"><div class="container"><div class="section-header"><h2 class="section-title">当下热销 🔥</h2></div><div class="product-grid" id="home-products"><!-- JS Fill --></div></div></section>
<section class="section-yellow" style="border-bottom:none;"><div class="container" style="display:flex;gap:60px;align-items:center;"><div style="flex:1;"><h2 class="section-title" style="color:#000;text-shadow:none;-webkit-text-stroke:0;">科技遇见<br><span style="color:var(--pop-red);-webkit-text-stroke:2px #000;text-shadow:4px 4px 0 rgba(0,0,0,0.1);">紫禁城</span></h2><p style="font-size:1.3rem;font-weight:bold;margin:30px 0;">我们不制造冷冰冰的机器。AI造物局致力于将故宫传承百年的文化灵魂，注入最前沿的磁悬浮与AI技术中。</p><a href="shop.html" class="btn-primary">探索品牌</a></div><div style="flex:1;"><div style="border:4px solid #000;border-radius:40px;overflow:hidden;box-shadow:12px 12px 0 var(--pop-blue);transform:rotate(3deg);"><img src="https://image.pollinations.ai/prompt/traditional%20chinese%20temple%20interior%20mixed%20with%20server%20room%20cables%20cyberpunk%20aesthetic?width=800&height=600&nologo=true" style="width:100%;display:block;"></div></div></div></section>
<footer></footer>
<script src="js/main.js"></script>
<script>
// 首页手动填充热销 (因为 main.js 默认只填充 shop.html 的列表)
document.addEventListener('DOMContentLoaded', () => {
    const con = document.getElementById('home-products');
    if(con) {
        let html='';
        [productsDB[0], productsDB[2], productsDB[3]].forEach(p => {
            html += \`<div class="product-card"><div class="price-tag">¥\${p.price}</div><a href="product.html?id=\${p.id}"><div class="p-img-box"><img src="\${p.image}"></div><div class="p-info"><div class="p-title">\${p.name}</div><div class="p-btn">加入购物车</div></div></a></div>\`;
        });
        html += \`<div class="product-card" style="background:#f4f4f4;border:4px dashed #ccc;display:flex;align-items:center;justify-content:center;"><a href="shop.html" style="text-align:center;padding:40px;"><div style="font-size:3rem;margin-bottom:20px;color:#ccc;"><i class="fa-solid fa-arrow-right"></i></div><div style="font-weight:900;font-size:1.5rem;text-transform:uppercase;color:#999;">浏览全部</div></a></div>\`;
        con.innerHTML = html;
    }
});
</script>
</body>
</html>
"@

$shop = @"
<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>全部商品</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></head>
<body><header></header>
<div class="section-yellow" style="padding:60px 5%;text-align:center;"><h1 class="section-title" style="color:#000;text-shadow:none;-webkit-text-stroke:0;">SHOP ALL</h1><p style="font-weight:bold;font-size:1.2rem;margin-top:10px;">探索未来玩具与数字收藏品</p></div>
<div class="section-white" style="min-height:60vh;"><div class="container"><div id="product-list" class="product-grid"></div></div></div>
<footer></footer><script src="js/main.js"></script></body></html>
"@

$product = @"
<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>商品详情</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></head>
<body style="background-color:var(--pop-blue);"><header></header>
<div style="padding:60px 5%;"><div class="container"><a href="shop.html" style="display:inline-block;margin-bottom:20px;font-weight:bold;color:#fff;">&larr; 返回列表</a>
<div id="product-detail" class="detail-container"><div class="detail-img-box"><img id="detail-img" src=""></div><div class="detail-info">
<div style="background:var(--pop-yellow);display:inline-block;padding:5px 15px;border:3px solid #000;border-radius:50px;font-weight:900;margin-bottom:20px;">NEW ARRIVAL</div>
<h1 id="detail-title" style="font-family:'Anton';font-size:3rem;line-height:1;margin-bottom:20px;">Loading...</h1>
<div id="detail-price" style="font-size:2.5rem;color:var(--pop-red);font-family:monospace;font-weight:900;margin-bottom:30px;">...</div>
<p id="detail-desc" style="font-size:1.1rem;color:#666;line-height:1.8;margin-bottom:40px;">...</p>
<div style="display:flex;gap:20px;align-items:center;"><input type="number" id="qty" class="qty-input" value="1" min="1"><button id="add-to-cart" class="btn-primary" style="flex:1;">加入购物车</button></div>
</div></div></div></div><footer></footer><script src="js/main.js"></script></body></html>
"@

$cart = @"
<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>购物车</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></head>
<body style="background-color:var(--pop-red);"><header></header>
<div style="padding:60px 5%;min-height:70vh;"><div class="container"><h1 class="section-title" style="margin-bottom:30px;color:#fff;">YOUR CART</h1>
<div style="background:#fff;border:4px solid #000;border-radius:30px;padding:30px;box-shadow:10px 10px 0 #000;">
<table class="cart-table"><thead><tr><th width="15%">商品</th><th>名称</th><th>单价 / 数量</th><th>操作</th></tr></thead><tbody id="cart-items"></tbody></table>
<div style="margin-top:40px;text-align:right;border-top:4px solid #000;padding-top:30px;"><div style="font-size:1.5rem;font-weight:bold;margin-bottom:10px;">总计</div><div id="cart-total" style="font-size:3rem;font-family:monospace;color:var(--pop-blue);font-weight:900;margin-bottom:30px;">¥0.00</div><button class="btn-primary" onclick="alert('Demo Mode')">去结算 &rarr;</button></div>
</div></div></div><footer></footer><script src="js/main.js"></script></body></html>
"@

$styles | Out-File -Encoding UTF8 "css/style.css"
$mainjs | Out-File -Encoding UTF8 "js/main.js"
$index | Out-File -Encoding UTF8 "index.html"
$shop | Out-File -Encoding UTF8 "shop.html"
$product | Out-File -Encoding UTF8 "product.html"
$cart | Out-File -Encoding UTF8 "cart.html"