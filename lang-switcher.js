(function () {
    var LANG_KEY = 'molesh_lang';
    var COOKIE_NAME = 'googtrans';
    var SOURCE_LANG = '/id';
    var TARGET_LANG = '/en';
    var HOME_PATHS = {
        '/molesh/': true,
        '/molesh/index.html': true,
        '/': true,
        '/index.html': true
    };

    var PAGE_TITLES = {
        '/molesh/': { id: 'Moklet Leadership', en: 'Moklet Leadership' },
        '/molesh/index.html': { id: 'Moklet Leadership', en: 'Moklet Leadership' },
        '/molesh/manajemen.html': { id: 'About Manajemen Sekolah | Moklet Leadership', en: 'About School Management | Moklet Leadership' },
        '/molesh/survey.html': { id: 'Survey Karakter Pemimpin | Moklet Leadership', en: 'Leadership Character Survey | Moklet Leadership' },
        '/molesh/presentasi.html': { id: 'MOLESH Sesi 1', en: 'MOLESH Session 1' },
        '/molesh/sesi2.html': { id: 'MOLESH Sesi 2', en: 'MOLESH Session 2' },
        '/molesh/sesi3.html': { id: 'MOLESH Sesi 3', en: 'MOLESH Session 3' },
        '/molesh/sesi4.html': { id: 'MOLESH Sesi 4', en: 'MOLESH Session 4' },
        '/molesh/sesi5.html': { id: 'MOLESH Sesi 5', en: 'MOLESH Session 5' },
        '/molesh/sesi6.html': { id: 'MOLESH Sesi 6', en: 'MOLESH Session 6' },
        '/molesh/profil.html': { id: 'Profil | Moklet Leadership', en: 'Profile | Moklet Leadership' },
        '/molesh/mentor.html': { id: 'Mentor AI MOLESH', en: 'MOLESH AI Mentor' },
        '/molesh/admin.html': { id: 'Admin Panel | Moklet Leadership', en: 'Admin Panel | Moklet Leadership' }
    };

    function getCookie(name) {
        var match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&') + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : '';
    }

    function setCookie(value) {
        document.cookie = COOKIE_NAME + '=' + encodeURIComponent(value) + ';path=/;SameSite=Lax;max-age=31536000';
    }

    function getLang() {
        var cookie = getCookie(COOKIE_NAME);
        if (cookie === SOURCE_LANG + TARGET_LANG) return 'en';
        var stored = localStorage.getItem(LANG_KEY);
        return stored === 'en' ? 'en' : 'id';
    }

    function setLang(lang) {
        if (lang === 'en') {
            setCookie(SOURCE_LANG + TARGET_LANG);
        } else {
            setCookie(SOURCE_LANG + SOURCE_LANG);
        }
        localStorage.setItem(LANG_KEY, lang);
        document.documentElement.lang = lang;
    }

    function isHomePage() {
        return !!HOME_PATHS[location.pathname];
    }

    function applyTitle(lang) {
        var key = location.pathname;
        var map = PAGE_TITLES[key] || PAGE_TITLES['/molesh/index.html'];
        document.title = map[lang] || map.id;
    }

    function injectGoogleTranslate() {
        if (document.getElementById('google_translate_element')) return;
        var holder = document.createElement('div');
        holder.id = 'google_translate_element';
        holder.style.display = 'none';
        document.body.appendChild(holder);

        window.googleTranslateElementInit = function () {
            try {
                new google.translate.TranslateElement({
                    pageLanguage: 'id',
                    autoDisplay: false,
                    includedLanguages: 'id,en'
                }, 'google_translate_element');
            } catch (e) { }
        };

        if (!document.getElementById('gt-script')) {
            var script = document.createElement('script');
            script.id = 'gt-script';
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.body.appendChild(script);
        }
    }

    function placeButton() {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ml-lang-toggle notranslate';
        btn.setAttribute('translate', 'no');
        btn.setAttribute('aria-label', 'Toggle language');
        btn.addEventListener('click', function () {
            var next = getLang() === 'en' ? 'id' : 'en';
            setLang(next);
            applyTitle(next);
            btn.textContent = '🌐';
            btn.title = next === 'en' ? 'Switch to Indonesian' : 'Switch to English';
            location.reload();
        });

        var hasThemeToggle = !!document.querySelector('.theme-toggle');
        btn.style.position = 'fixed';
        btn.style.zIndex = '10001';
        btn.style.right = '16px';
        btn.style.top = hasThemeToggle ? '64px' : '16px';
        btn.style.width = '52px';
        btn.style.height = '52px';
        btn.style.padding = '0';
        btn.style.borderRadius = '999px';
        btn.style.border = '1px solid rgba(125, 211, 252, .22)';
        btn.style.background = 'rgba(15, 23, 42, .74)';
        btn.style.color = '#e2e8f0';
        btn.style.backdropFilter = 'blur(14px)';
        btn.style.webkitBackdropFilter = 'blur(14px)';
        btn.style.fontFamily = "'Plus Jakarta Sans', system-ui, sans-serif";
        btn.style.fontSize = '1.05rem';
        btn.style.fontWeight = '800';
        btn.style.lineHeight = '1';
        btn.style.cursor = 'pointer';
        btn.style.boxShadow = '0 8px 24px rgba(0,0,0,.18)';
        btn.style.transition = 'transform .18s ease, background .18s ease, border-color .18s ease';
        btn.textContent = '🌐';
        btn.title = getLang() === 'en' ? 'Switch to Indonesian' : 'Switch to English';
        btn.addEventListener('mouseenter', function () {
            btn.style.transform = 'translateY(-1px)';
            btn.style.background = 'rgba(30, 41, 59, .86)';
        });
        btn.addEventListener('mouseleave', function () {
            btn.style.transform = 'translateY(0)';
            syncButtonTheme(btn);
        });
        document.body.appendChild(btn);
        syncButtonTheme(btn);

        var observer = new MutationObserver(function () {
            syncButtonTheme(btn);
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }

    function placeManagementButton() {
        if (!isHomePage()) return;
        if (document.querySelector('.ml-management-link')) return;

        var link = document.createElement('a');
        link.href = 'manajemen.html';
        link.className = 'ml-management-link';
        link.setAttribute('aria-label', 'Buka About Manajemen');
        link.title = 'Buka About Manajemen';
        link.textContent = '🏫';
        link.style.position = 'fixed';
        link.style.zIndex = '10000';
        link.style.right = '16px';
        link.style.top = document.querySelector('.theme-toggle') ? '108px' : '60px';
        link.style.width = '52px';
        link.style.height = '52px';
        link.style.padding = '0';
        link.style.display = 'inline-flex';
        link.style.alignItems = 'center';
        link.style.justifyContent = 'center';
        link.style.borderRadius = '999px';
        link.style.border = '1px solid rgba(255, 255, 255, .16)';
        link.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, .92), rgba(37, 99, 235, .92))';
        link.style.color = '#f8fafc';
        link.style.backdropFilter = 'blur(14px)';
        link.style.webkitBackdropFilter = 'blur(14px)';
        link.style.fontFamily = "'Plus Jakarta Sans', system-ui, sans-serif";
        link.style.fontSize = '1rem';
        link.style.fontWeight = '800';
        link.style.lineHeight = '1';
        link.style.textDecoration = 'none';
        link.style.boxShadow = '0 8px 24px rgba(0,0,0,.2)';
        link.style.transition = 'transform .18s ease, filter .18s ease, box-shadow .18s ease';
        link.addEventListener('mouseenter', function () {
            link.style.transform = 'translateY(-1px)';
            link.style.filter = 'saturate(1.08) brightness(1.03)';
            link.style.boxShadow = '0 12px 30px rgba(0,0,0,.26)';
        });
        link.addEventListener('mouseleave', function () {
            link.style.transform = 'translateY(0)';
            link.style.filter = 'none';
            link.style.boxShadow = '0 8px 24px rgba(0,0,0,.2)';
        });
        document.body.appendChild(link);
    }

    function syncButtonTheme(btn) {
        if (!btn) return;
        if (document.documentElement.classList.contains('theme-light')) {
            btn.style.background = 'rgba(255, 255, 255, .88)';
            btn.style.color = '#0f172a';
            btn.style.borderColor = 'rgba(15, 23, 42, .1)';
        } else {
            btn.style.background = 'rgba(15, 23, 42, .74)';
            btn.style.color = '#e2e8f0';
            btn.style.borderColor = 'rgba(125, 211, 252, .22)';
        }
    }

    function init() {
        var lang = getLang();
        setLang(lang);
        applyTitle(lang);
        injectGoogleTranslate();
        placeButton();
        placeManagementButton();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
