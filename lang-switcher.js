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
        '/molesh/sesi1.html': { id: 'MOLESH Sesi 1', en: 'MOLESH Session 1' },
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

    function createOrGetFabGroup() {
        var g = document.getElementById('ml-fab-group');
        if (g) return g;

        g = document.createElement('div');
        g.id = 'ml-fab-group';
        g.style.cssText = [
            'position:fixed', 'top:14px', 'right:14px', 'z-index:10002',
            'display:flex', 'flex-direction:column', 'align-items:center', 'gap:3px',
            'padding:5px',
            'border-radius:999px',
            'background:rgba(13,20,40,.72)',
            'border:1px solid rgba(255,255,255,.10)',
            'backdrop-filter:blur(18px)', '-webkit-backdrop-filter:blur(18px)',
            'box-shadow:0 6px 28px rgba(0,0,0,.32)',
            'transition:background .25s,border-color .25s'
        ].join(';');
        document.body.appendChild(g);

        // Absorb .theme-toggle into the group
        var toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.style.cssText = [
                'position:static', 'top:auto', 'right:auto', 'z-index:auto',
                'width:38px', 'height:38px', 'min-width:0', 'min-height:0',
                'padding:0', 'border:none', 'background:transparent',
                'box-shadow:none', 'backdrop-filter:none', '-webkit-backdrop-filter:none',
                'border-radius:999px', 'font-family:inherit', 'font-size:.88rem',
                'font-weight:700', 'cursor:pointer', 'line-height:1',
                'transition:transform .18s ease,background .18s ease',
                'display:flex', 'align-items:center', 'justify-content:center'
            ].join(';');
            g.appendChild(toggle);
        }

        syncGroupTheme(g);
        var obs = new MutationObserver(function () { syncGroupTheme(g); });
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return g;
    }

    function syncGroupTheme(g) {
        if (!g) return;
        if (document.documentElement.classList.contains('theme-light')) {
            g.style.background = 'rgba(255,255,255,.92)';
            g.style.borderColor = 'rgba(15,23,42,.10)';
            g.style.boxShadow = '0 4px 20px rgba(15,23,42,.14)';
        } else {
            g.style.background = 'rgba(13,20,40,.72)';
            g.style.borderColor = 'rgba(255,255,255,.10)';
            g.style.boxShadow = '0 6px 28px rgba(0,0,0,.32)';
        }
    }

    function fabBtnStyle() {
        return [
            'width:38px', 'height:38px', 'padding:0',
            'border-radius:999px', 'border:none', 'background:transparent',
            'font-family:inherit', 'font-size:.88rem', 'font-weight:800',
            'line-height:1', 'cursor:pointer',
            'transition:transform .18s ease,background .18s ease',
            'display:inline-flex', 'align-items:center', 'justify-content:center'
        ].join(';');
    }

    function placeButton() {
        if (document.querySelector('.ml-lang-toggle')) return;
        var g = createOrGetFabGroup();

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ml-lang-toggle notranslate';
        btn.setAttribute('translate', 'no');
        btn.setAttribute('aria-label', 'Toggle language');
        btn.textContent = '🌐';
        btn.title = getLang() === 'en' ? 'Switch to Indonesian' : 'Switch to English';
        btn.style.cssText = fabBtnStyle();
        syncButtonTheme(btn);

        btn.addEventListener('click', function () {
            var next = getLang() === 'en' ? 'id' : 'en';
            setLang(next);
            applyTitle(next);
            btn.title = next === 'en' ? 'Switch to Indonesian' : 'Switch to English';
            location.reload();
        });
        btn.addEventListener('mouseenter', function () {
            btn.style.transform = 'scale(1.12)';
            btn.style.background = 'rgba(255,255,255,.12)';
        });
        btn.addEventListener('mouseleave', function () {
            btn.style.transform = 'scale(1)';
            btn.style.background = 'transparent';
        });

        g.appendChild(btn);

        var obs = new MutationObserver(function () { syncButtonTheme(btn); });
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }

    function placeManagementButton() {
        if (!isHomePage()) return;
        if (document.querySelector('.ml-management-link')) return;
        var g = createOrGetFabGroup();

        var link = document.createElement('a');
        link.href = 'manajemen.html';
        link.className = 'ml-management-link notranslate';
        link.setAttribute('translate', 'no');
        link.setAttribute('aria-label', 'Buka About Manajemen');
        link.title = 'Buka About Manajemen';
        link.textContent = '🏫';
        link.style.cssText = fabBtnStyle() + ';text-decoration:none;color:#f8fafc';

        link.addEventListener('mouseenter', function () {
            link.style.transform = 'scale(1.12)';
            link.style.background = 'rgba(255,255,255,.12)';
        });
        link.addEventListener('mouseleave', function () {
            link.style.transform = 'scale(1)';
            link.style.background = 'transparent';
        });

        g.appendChild(link);
    }

    function syncButtonTheme(btn) {
        if (!btn) return;
        if (document.documentElement.classList.contains('theme-light')) {
            btn.style.color = '#0f172a';
        } else {
            btn.style.color = '#e2e8f0';
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
