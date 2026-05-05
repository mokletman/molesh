/* Moklet Leadership — persistent mobile bottom nav (native-app style frame) */
(function () {
    if (window.__MOLESH_BOTTOM_NAV_LOADED__) return;
    window.__MOLESH_BOTTOM_NAV_LOADED__ = true;

    var STYLE_ID = 'molesh-bottom-nav-style';
    var NAV_ID = 'mobileBottomNav';

    var css = '' +
        '@media (max-width: 480px) {' +
        '  body { padding-bottom: calc(84px + env(safe-area-inset-bottom, 0px)) !important; }' +
        '  #' + NAV_ID + ' { display: flex !important; }' +
        '}' +
        '#' + NAV_ID + ' {' +
        '  display: none;' +
        '  position: fixed;' +
        '  left: 10px;' +
        '  right: 10px;' +
        '  bottom: calc(10px + env(safe-area-inset-bottom, 0px));' +
        '  z-index: 9000;' +
        '  justify-content: space-around;' +
        '  align-items: stretch;' +
        '  gap: 4px;' +
        '  padding: 8px 6px;' +
        '  background: rgba(15, 23, 42, .82);' +
        '  -webkit-backdrop-filter: blur(18px);' +
        '  backdrop-filter: blur(18px);' +
        '  border: 1px solid rgba(255, 255, 255, .08);' +
        '  border-radius: 22px;' +
        '  box-shadow: 0 10px 30px rgba(0, 0, 0, .35), 0 2px 8px rgba(124, 58, 237, .12);' +
        '  font-family: "Plus Jakarta Sans", system-ui, sans-serif;' +
        '}' +
        '#' + NAV_ID + ' .mbn-item {' +
        '  flex: 1;' +
        '  display: flex;' +
        '  flex-direction: column;' +
        '  align-items: center;' +
        '  justify-content: center;' +
        '  gap: 3px;' +
        '  padding: 8px 4px;' +
        '  color: rgba(226, 232, 240, .6);' +
        '  text-decoration: none;' +
        '  font-size: .68rem;' +
        '  font-weight: 600;' +
        '  background: transparent;' +
        '  border: 0;' +
        '  border-radius: 16px;' +
        '  cursor: pointer;' +
        '  transition: color .2s ease, background .2s ease, transform .15s ease;' +
        '  min-height: 56px;' +
        '  -webkit-tap-highlight-color: transparent;' +
        '}' +
        '#' + NAV_ID + ' .mbn-item:active { transform: scale(.94); }' +
        '#' + NAV_ID + ' .mbn-icon { font-size: 1.25rem; line-height: 1; }' +
        '#' + NAV_ID + ' .mbn-label { line-height: 1; letter-spacing: .2px; }' +
        '#' + NAV_ID + ' .mbn-item.active {' +
        '  color: #7dd3fc;' +
        '  background: linear-gradient(135deg, rgba(124, 58, 237, .22), rgba(6, 182, 212, .18));' +
        '}' +
        'html.theme-light #' + NAV_ID + ' {' +
        '  background: rgba(255, 255, 255, .92);' +
        '  border-color: rgba(15, 23, 42, .08);' +
        '  box-shadow: 0 10px 30px rgba(15, 23, 42, .12), 0 2px 8px rgba(124, 58, 237, .08);' +
        '}' +
        'html.theme-light #' + NAV_ID + ' .mbn-item { color: rgba(31, 41, 55, .58); }' +
        'html.theme-light #' + NAV_ID + ' .mbn-item.active {' +
        '  color: #0e7490;' +
        '  background: linear-gradient(135deg, rgba(124, 58, 237, .14), rgba(6, 182, 212, .14));' +
        '}';

    var pageMap = {
        '': 'beranda',
        'index.html': 'beranda',
        'presentasi.html': 'materi',
        'sesi2.html': 'materi',
        'sesi3.html': 'materi',
        'sesi4.html': 'materi',
        'sesi5.html': 'materi',
        'sesi6.html': 'materi',
        'mentor.html': 'mentor',
        'profil.html': 'profil',
        'survey.html': 'profil',
        'manajemen.html': 'profil'
    };

    var items = [
        { page: 'beranda', href: 'index.html',     icon: '🏠', label: 'Beranda' },
        { page: 'materi',  href: 'presentasi.html', icon: '📚', label: 'Materi'  },
        { page: 'mentor',  href: 'mentor.html',    icon: '🤖', label: 'Mentor'  },
        { page: 'profil',  href: 'profil.html',    icon: '👤', label: 'Profil'  }
    ];

    function inject() {
        if (document.getElementById(NAV_ID)) return;

        if (!document.getElementById(STYLE_ID)) {
            var style = document.createElement('style');
            style.id = STYLE_ID;
            style.textContent = css;
            document.head.appendChild(style);
        }

        var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        var current = pageMap[path] || '';

        var nav = document.createElement('nav');
        nav.id = NAV_ID;
        nav.setAttribute('aria-label', 'Navigasi utama');

        items.forEach(function (it) {
            var a = document.createElement('a');
            a.className = 'mbn-item' + (it.page === current ? ' active' : '');
            a.href = it.href;
            a.setAttribute('aria-label', it.label);
            a.setAttribute('data-page', it.page);
            a.innerHTML =
                '<span class="mbn-icon" aria-hidden="true">' + it.icon + '</span>' +
                '<span class="mbn-label">' + it.label + '</span>';
            nav.appendChild(a);
        });

        document.body.appendChild(nav);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }
})();
