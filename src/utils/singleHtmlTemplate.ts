export function getStandaloneSingleHtml(): string {
  return `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>STAR REWARDS ⭐ - Mukofot Yig'ish Websayti</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Outfit', sans-serif;
    }
    body {
      background-color: #030712;
      color: #f8fafc;
      min-height: 100vh;
      overflow-x: hidden;
      line-height: 1.5;
    }
    /* Header */
    header {
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(3, 7, 18, 0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.3rem;
      font-weight: 900;
      color: #ffffff;
      cursor: pointer;
    }
    .brand span.star {
      color: #fbbf24;
      animation: pulse 2s infinite;
    }
    .nav-links {
      display: flex;
      gap: 8px;
      background: rgba(15, 23, 42, 0.7);
      padding: 6px;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .nav-btn {
      background: transparent;
      border: none;
      color: #94a3b8;
      padding: 8px 16px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .nav-btn.active {
      background: linear-gradient(135deg, #f59e0b, #eab308);
      color: #020617;
      font-weight: 700;
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }
    .balance-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.3);
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 800;
      color: #fde047;
      font-size: 15px;
    }
    /* Containers */
    .container {
      max-width: 1024px;
      margin: 0 auto;
      padding: 32px 16px 64px 16px;
    }
    .tab-content {
      display: none;
      animation: fadeIn 0.3s ease-in-out;
    }
    .tab-content.active {
      display: block;
    }
    /* Hero Banner */
    .hero-card {
      background: radial-gradient(circle at top, rgba(245, 158, 11, 0.15), transparent 70%), linear-gradient(180deg, #0f172a, #020617);
      border: 1px solid rgba(245, 158, 11, 0.3);
      border-radius: 28px;
      padding: 48px 24px;
      text-align: center;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
      margin-bottom: 32px;
      position: relative;
    }
    .star-clicker {
      font-size: 80px;
      cursor: pointer;
      display: inline-block;
      transition: transform 0.15s;
      user-select: none;
      filter: drop-shadow(0 0 25px rgba(245, 158, 11, 0.6));
    }
    .star-clicker:active {
      transform: scale(0.92);
    }
    .balance-title {
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 2px;
      color: #94a3b8;
      font-weight: 700;
      margin-top: 16px;
    }
    .balance-number {
      font-size: 52px;
      font-weight: 900;
      color: #fde047;
      margin: 4px 0;
      text-shadow: 0 4px 20px rgba(245, 158, 11, 0.4);
    }
    .hero-desc {
      color: #cbd5e1;
      font-size: 15px;
      max-width: 480px;
      margin: 0 auto 24px auto;
    }
    .btn-row {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .btn-primary {
      background: linear-gradient(135deg, #f59e0b, #eab308);
      color: #020617;
      border: none;
      padding: 12px 28px;
      border-radius: 14px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(245, 158, 11, 0.3);
      transition: transform 0.15s;
    }
    .btn-secondary {
      background: rgba(30, 41, 59, 0.8);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 12px 28px;
      border-radius: 14px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
    }
    .btn-primary:active, .btn-secondary:active {
      transform: scale(0.97);
    }
    /* Grid */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 24px;
    }
    .card {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 24px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s, border-color 0.2s;
    }
    .card:hover {
      transform: translateY(-4px);
      border-color: rgba(245, 158, 11, 0.4);
    }
    .card-emoji {
      font-size: 48px;
      margin-bottom: 12px;
      text-align: center;
      background: rgba(2, 6, 23, 0.5);
      border-radius: 18px;
      padding: 16px;
    }
    .card-title {
      font-size: 18px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 4px;
    }
    .card-desc {
      font-size: 12px;
      color: #94a3b8;
      margin-bottom: 16px;
      min-height: 36px;
    }
    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }
    .card-price {
      font-size: 16px;
      font-weight: 800;
      color: #fde047;
    }
    .action-btn {
      background: #f59e0b;
      color: #020617;
      border: none;
      padding: 8px 16px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
    }
    .action-btn:disabled {
      background: #334155;
      color: #64748b;
      cursor: not-allowed;
    }
    /* Promo Box */
    .promo-form {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
    .promo-input {
      flex: 1;
      background: #020617;
      border: 1px solid #334155;
      padding: 10px 14px;
      border-radius: 12px;
      color: #fff;
      font-weight: 700;
      text-transform: uppercase;
      outline: none;
    }
    /* Toast */
    #toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #10b981;
      color: #020617;
      padding: 12px 20px;
      border-radius: 14px;
      font-weight: 800;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      display: none;
      z-index: 100;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
    @media (max-width: 640px) {
      header { flex-direction: column; gap: 12px; }
      .nav-links { overflow-x: auto; width: 100%; justify-content: center; }
      .balance-number { font-size: 40px; }
    }
  </style>
</head>
<body>

  <!-- Header -->
  <header>
    <div class="brand" onclick="switchTab('home')">
      <span>STAR REWARDS</span>
      <span class="star">⭐</span>
    </div>

    <div class="nav-links">
      <button class="nav-btn active" onclick="switchTab('home')">Bosh sahifa</button>
      <button class="nav-btn" onclick="switchTab('earn')">⭐ Yulduz yig‘ish</button>
      <button class="nav-btn" onclick="switchTab('shop')">🎁 Sovg‘alar</button>
      <button class="nav-btn" onclick="switchTab('gifts')">📦 Sovg‘alarim</button>
      <button class="nav-btn" onclick="switchTab('profile')">👤 Profil</button>
    </div>

    <div class="balance-pill" onclick="switchTab('earn')" style="cursor:pointer;" title="Ko'proq yig'ish">
      <span>⭐</span>
      <span id="headerStars">23</span>
      <span style="font-size:11px;color:#cbd5e1;">yulduz</span>
    </div>
  </header>

  <div class="container">

    <!-- TAB 1: Bosh sahifa -->
    <div id="tab-home" class="tab-content active">
      <div class="hero-card">
        <div class="star-clicker" onclick="clickStarBonus()" title="Bonus olish uchun bosing!">⭐</div>
        <div class="balance-title">Mavjud Yulduzchalaringiz</div>
        <div class="balance-number" id="mainStars">⭐ 23 yulduzcha</div>
        <p class="hero-desc">
          Topshiriqlarni bajaring, yulduzchalar yig‘ing va sevimli virtual shirinlik hamda sovg‘alarga almashtiring!
        </p>
        <div class="btn-row">
          <button class="btn-primary" onclick="switchTab('earn')">⭐ Yulduzcha yig‘ish</button>
          <button class="btn-secondary" onclick="switchTab('shop')">🎁 Sovg‘alar bo‘limi</button>
          <button class="btn-secondary" onclick="switchTab('gifts')">📦 Mening sovg‘alarim</button>
        </div>
      </div>

      <h3 style="font-size:20px; font-weight:800; margin-bottom:12px;">Tezkor Imkoniyatlar</h3>
      <div class="grid">
        <div class="card" onclick="switchTab('earn')" style="cursor:pointer;">
          <div class="card-emoji">🎁</div>
          <div class="card-title">Kunlik Bonus (+5 ⭐)</div>
          <div class="card-desc">Har 24 soatda faqat bir marta olinadigan bepul yulduzchalar to‘plami.</div>
          <span style="color:#f59e0b; font-weight:700; font-size:13px;">Olish uchun bosing →</span>
        </div>

        <div class="card" onclick="switchTab('shop')" style="cursor:pointer;">
          <div class="card-emoji">🍫</div>
          <div class="card-title">Shirinliklar Do‘koni</div>
          <div class="card-desc">Snickers, Twix, KitKat va Coca-Cola sovg‘alarini sotib oling.</div>
          <span style="color:#f59e0b; font-weight:700; font-size:13px;">Do‘konga o‘tish →</span>
        </div>

        <div class="card" onclick="switchTab('gifts')" style="cursor:pointer;">
          <div class="card-emoji">📦</div>
          <div class="card-title">Mening Sovg‘alarim</div>
          <div class="card-desc">Sotib olingan barcha sovg‘alar va faol promokodlar ro‘yxati.</div>
          <span style="color:#f59e0b; font-weight:700; font-size:13px;">Ko‘rish →</span>
        </div>
      </div>
    </div>

    <!-- TAB 2: Yulduzcha yig'ish -->
    <div id="tab-earn" class="tab-content">
      <h2 style="font-size:28px; font-weight:900; margin-bottom:8px; text-align:center;">Topshiriqlar orqali Yulduzcha Yig‘ish ⭐</h2>
      <p style="text-align:center; color:#94a3b8; font-size:14px; margin-bottom:28px;">
        Vazifalarni bajaring va hisobingizni to‘ldiring!
      </p>

      <div class="grid">
        <!-- 1. Saytga kirish (+1 ⭐) -->
        <div class="card">
          <div>
            <div style="font-size:32px; margin-bottom:8px;">🚀</div>
            <div class="card-title">1. Saytga kirish</div>
            <div class="card-desc">Har bir tashrif uchun rag‘batlantiruvchi yulduzcha.</div>
          </div>
          <div class="card-footer">
            <span class="card-price">+1 ⭐</span>
            <button class="action-btn" id="btn-login" onclick="claimLoginStar()">Qabul qilish</button>
          </div>
        </div>

        <!-- 2. Kunlik bonus (+5 ⭐) -->
        <div class="card">
          <div>
            <div style="font-size:32px; margin-bottom:8px;">🎁</div>
            <div class="card-title">2. Kunlik bonus</div>
            <div class="card-desc">Bir kunda faqat bir marta olish mumkin bo‘lgan sovg‘a!</div>
          </div>
          <div class="card-footer">
            <span class="card-price">+5 ⭐</span>
            <button class="action-btn" id="btn-daily" onclick="claimDailyBonus()">Bonusni olish</button>
          </div>
        </div>

        <!-- 3. Topshiriq bajarish (+3 ⭐) -->
        <div class="card">
          <div>
            <div style="font-size:32px; margin-bottom:8px;">🎯</div>
            <div class="card-title">3. Topshiriq bajarish</div>
            <div class="card-desc">Do‘stlaringiz bilan sayt havolasini ulashing va mukofot oling.</div>
          </div>
          <div class="card-footer">
            <span class="card-price">+3 ⭐</span>
            <button class="action-btn" id="btn-task" onclick="claimShareTask()">Ulashish</button>
          </div>
        </div>

        <!-- 4. Maxsus bonus (+10 ⭐) -->
        <div class="card">
          <div>
            <div style="font-size:32px; margin-bottom:8px;">✨</div>
            <div class="card-title">4. Maxsus bonus (Promo-kod)</div>
            <div class="card-desc">STAR2026 yoki OMAD kodini kiriting va +10 ⭐ yulduz oling!</div>
            <div class="promo-form">
              <input type="text" id="promoInput" class="promo-input" placeholder="STAR2026">
              <button class="action-btn" onclick="submitPromo()">Kiritish</button>
            </div>
          </div>
          <div class="card-footer" style="margin-top:12px;">
            <span class="card-price">+10 ⭐</span>
            <span style="font-size:12px; color:#94a3b8;">Maxsus kod</span>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: Sovg'alar Do'koni -->
    <div id="tab-shop" class="tab-content">
      <h2 style="font-size:28px; font-weight:900; margin-bottom:8px; text-align:center;">Sovg‘alar Do‘koni 🍫</h2>
      <p style="text-align:center; color:#94a3b8; font-size:14px; margin-bottom:28px;">
        To‘plangan yulduzchalarni mazali va qiziqarli sovg‘alarga almashtiring.
      </p>

      <div class="grid">
        <!-- Snickers — 15 ⭐ -->
        <div class="card">
          <div class="card-emoji">🍫</div>
          <div class="card-title">Snickers</div>
          <div class="card-desc">Yeryong‘oq va karamelli to‘yimli shokolad.</div>
          <div class="card-footer">
            <span class="card-price">15 ⭐</span>
            <button class="action-btn" onclick="buyGift('Snickers', 15, '🍫')">Sotib olish</button>
          </div>
        </div>

        <!-- Twix — 20 ⭐ -->
        <div class="card">
          <div class="card-emoji">🍫</div>
          <div class="card-title">Twix</div>
          <div class="card-desc">Qarsildoq pechenye va shirin karamel juftligi.</div>
          <div class="card-footer">
            <span class="card-price">20 ⭐</span>
            <button class="action-btn" onclick="buyGift('Twix', 20, '🍫')">Sotib olish</button>
          </div>
        </div>

        <!-- KitKat — 25 ⭐ -->
        <div class="card">
          <div class="card-emoji">🍫</div>
          <div class="card-title">KitKat</div>
          <div class="card-desc">Klassik to‘rt qatorli qarsildoq vafli shokolad.</div>
          <div class="card-footer">
            <span class="card-price">25 ⭐</span>
            <button class="action-btn" onclick="buyGift('KitKat', 25, '🍫')">Sotib olish</button>
          </div>
        </div>

        <!-- Coca-Cola — 30 ⭐ -->
        <div class="card">
          <div class="card-emoji">🥤</div>
          <div class="card-title">Coca-Cola</div>
          <div class="card-desc">Muzdek, tetiklantiruvchi klassik gazli ichimlik.</div>
          <div class="card-footer">
            <span class="card-price">30 ⭐</span>
            <button class="action-btn" onclick="buyGift('Coca-Cola', 30, '🥤')">Sotib olish</button>
          </div>
        </div>

        <!-- Mystery Box — 50 ⭐ -->
        <div class="card" style="border-color: rgba(168, 85, 247, 0.4);">
          <div class="card-emoji">🎁</div>
          <div class="card-title">Mystery Box</div>
          <div class="card-desc">Kutilmagan yutuqlar sandig‘i! 30 dan 100 tagacha ⭐ chiqishi mumkin!</div>
          <div class="card-footer">
            <span class="card-price" style="color:#c084fc;">50 ⭐</span>
            <button class="action-btn" style="background:#a855f7; color:#fff;" onclick="buyGift('Mystery Box', 50, '🎁', true)">Sotib olish</button>
          </div>
        </div>

        <!-- Super Gift — 100 ⭐ -->
        <div class="card" style="border-color: rgba(234, 179, 8, 0.4);">
          <div class="card-emoji">🏆</div>
          <div class="card-title">Super Gift</div>
          <div class="card-desc">VIP Oltin sovg‘alar to‘plami va chempionlik kubogi!</div>
          <div class="card-footer">
            <span class="card-price" style="color:#fde047;">100 ⭐</span>
            <button class="action-btn" onclick="buyGift('Super Gift', 100, '🏆')">Sotib olish</button>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 4: Mening sovg'alarim -->
    <div id="tab-gifts" class="tab-content">
      <h2 style="font-size:28px; font-weight:900; margin-bottom:8px; text-align:center;">Mening Sovg‘alarim 📦</h2>
      <p style="text-align:center; color:#94a3b8; font-size:14px; margin-bottom:28px;">
        Sotib olingan barcha sovg‘alaringiz va promokodlar.
      </p>

      <div id="giftsContainer" class="grid">
        <!-- Rendered by JS -->
      </div>
    </div>

    <!-- TAB 5: Profil -->
    <div id="tab-profile" class="tab-content">
      <h2 style="font-size:28px; font-weight:900; margin-bottom:8px; text-align:center;">Foydalanuvchi Profili 👤</h2>
      <div class="hero-card" style="max-width:540px; margin: 0 auto 24px auto;">
        <div style="font-size:60px; margin-bottom:8px;">👨‍🚀</div>
        <h3 id="profileName" style="font-size:24px; font-weight:800; color:#fff;">Yulduzchi</h3>
        <p style="font-size:13px; color:#f59e0b; font-weight:700; margin-bottom:20px;">⭐ 1-Darajali Yulduzlar Sayyohi</p>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; text-align:left; background:rgba(2,6,23,0.5); padding:16px; border-radius:18px;">
          <div>
            <div style="font-size:11px; color:#94a3b8;">Jami to‘plangan:</div>
            <div id="profTotalStars" style="font-size:18px; font-weight:800; color:#10b981;">23 ⭐</div>
          </div>
          <div>
            <div style="font-size:11px; color:#94a3b8;">Sarflangan:</div>
            <div id="profSpentStars" style="font-size:18px; font-weight:800; color:#f43f5e;">0 ⭐</div>
          </div>
        </div>

        <button class="btn-secondary" style="margin-top:20px; width:100%;" onclick="resetAppData()">
          Ma‘lumotlarni qayta tiklash
        </button>
      </div>
    </div>

  </div>

  <div id="toast"></div>

  <script>
    // LocalStorage State Manager
    const STATE_KEY = 'star_rewards_data';
    
    let state = {
      stars: 23,
      totalEarned: 23,
      totalSpent: 0,
      lastDaily: null,
      gifts: [],
      redeemedCodes: []
    };

    function loadState() {
      try {
        const raw = localStorage.getItem(STATE_KEY);
        if (raw) {
          state = Object.assign(state, JSON.parse(raw));
        }
      } catch (e) {
        console.error(e);
      }
      updateUI();
    }

    function saveState() {
      try {
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
      } catch (e) {}
      updateUI();
    }

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.innerText = msg;
      t.style.display = 'block';
      setTimeout(() => { t.style.display = 'none'; }, 3000);
    }

    function updateUI() {
      document.getElementById('headerStars').innerText = state.stars;
      document.getElementById('mainStars').innerText = '⭐ ' + state.stars + ' yulduzcha';
      document.getElementById('profTotalStars').innerText = state.totalEarned + ' ⭐';
      document.getElementById('profSpentStars').innerText = state.totalSpent + ' ⭐';

      // Check daily bonus 24 hours
      const dailyBtn = document.getElementById('btn-daily');
      if (state.lastDaily) {
        const diff = Date.now() - new Date(state.lastDaily).getTime();
        if (diff < 24 * 60 * 60 * 1000) {
          dailyBtn.disabled = true;
          dailyBtn.innerText = 'Bugun olindi ✓';
        } else {
          dailyBtn.disabled = false;
          dailyBtn.innerText = 'Bonusni olish';
        }
      }

      renderGifts();
    }

    function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
      
      const tab = document.getElementById('tab-' + tabId);
      if (tab) tab.classList.add('active');

      const btns = document.querySelectorAll('.nav-btn');
      const map = { 'home': 0, 'earn': 1, 'shop': 2, 'gifts': 3, 'profile': 4 };
      if (btns[map[tabId]]) btns[map[tabId]].classList.add('active');

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function clickStarBonus() {
      state.stars += 1;
      state.totalEarned += 1;
      saveState();
      showToast('+1 ⭐ Yulduzcha qo‘shildi!');
    }

    function claimLoginStar() {
      state.stars += 1;
      state.totalEarned += 1;
      saveState();
      showToast('1. Saytga kirish: +1 ⭐ qabul qilindi!');
    }

    function claimDailyBonus() {
      state.stars += 5;
      state.totalEarned += 5;
      state.lastDaily = new Date().toISOString();
      saveState();
      showToast('2. Kunlik bonus: +5 ⭐ qo‘shildi!');
    }

    function claimShareTask() {
      state.stars += 3;
      state.totalEarned += 3;
      saveState();
      showToast('3. Topshiriq: +3 ⭐ qo‘shildi!');
    }

    function submitPromo() {
      const input = document.getElementById('promoInput');
      const code = (input.value || '').trim().toUpperCase();
      if (!code) return;

      if (state.redeemedCodes.includes(code)) {
        alert('Bu promo-kod allaqachon ishlatilgan!');
        return;
      }

      if (code === 'STAR2026' || code === 'OMAD' || code === 'SUPERBONUS') {
        state.stars += 10;
        state.totalEarned += 10;
        state.redeemedCodes.push(code);
        saveState();
        input.value = '';
        showToast('4. Maxsus bonus: +10 ⭐ faollashtirildi!');
      } else {
        alert('Noto‘g‘ri kod! Sinab ko‘ring: STAR2026');
      }
    }

    function buyGift(name, cost, emoji, isMystery = false) {
      if (state.stars < cost) {
        alert('Yulduzchalaringiz yetarli emas! Sizga yana ' + (cost - state.stars) + ' ⭐ kerak.');
        return;
      }

      state.stars -= cost;
      state.totalSpent += cost;

      const randomCode = 'STAR-' + Math.floor(1000 + Math.random() * 9000);
      state.gifts.push({
        id: Date.now(),
        name: name,
        cost: cost,
        emoji: emoji,
        code: randomCode,
        isMystery: isMystery,
        opened: false,
        date: new Date().toLocaleDateString('uz-UZ')
      });

      saveState();
      showToast('Tabriklaymiz! ' + name + ' sotib olindi!');
      switchTab('gifts');
    }

    function openMystery(id) {
      const item = state.gifts.find(g => g.id === id);
      if (!item || item.opened) return;

      const bonusStars = Math.floor(60 + Math.random() * 40);
      state.stars += bonusStars;
      state.totalEarned += bonusStars;
      item.opened = true;
      item.name = 'Mystery Box (+ ' + bonusStars + ' ⭐)';

      saveState();
      showToast('🎉 Kutilmagan yutuq! +' + bonusStars + ' ⭐ chiqdi!');
    }

    function renderGifts() {
      const c = document.getElementById('giftsContainer');
      if (!c) return;

      if (state.gifts.length === 0) {
        c.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:48px 0; color:#94a3b8;">' +
                      '<div style="font-size:48px;margin-bottom:8px;">🎁</div>' +
                      'Hali sovg‘alar yo‘q. Do‘kondan xarid qiling!</div>';
        return;
      }

      c.innerHTML = state.gifts.map(g => {
        return '<div class="card">' +
                 '<div class="card-emoji">' + g.emoji + '</div>' +
                 '<div class="card-title">' + g.name + '</div>' +
                 '<div class="card-desc">Sana: ' + g.date + '<br>Kupon: <strong>' + g.code + '</strong></div>' +
                 '<div class="card-footer">' +
                   (g.isMystery && !g.opened 
                     ? '<button class="action-btn" style="background:#a855f7;color:#fff;" onclick="openMystery(' + g.id + ')">🎁 Ochish</button>'
                     : '<span style="color:#10b981;font-size:12px;font-weight:700;">Faol kupon ✓</span>') +
                 '</div>' +
               '</div>';
      }).join('');
    }

    function resetAppData() {
      if (confirm('Barcha ma‘lumotlarni boshlang‘ich holatga qaytarishni xohlaysizmi?')) {
        localStorage.removeItem(STATE_KEY);
        state = {
          stars: 23,
          totalEarned: 23,
          totalSpent: 0,
          lastDaily: null,
          gifts: [],
          redeemedCodes: []
        };
        saveState();
        showToast('Ma‘lumotlar qayta tiklandi');
      }
    }

    // Initialize on load
    window.addEventListener('DOMContentLoaded', loadState);
  </script>
</body>
</html>`;
}
