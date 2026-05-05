/* Moklet Leadership — persistent mobile app frame (top bar + bottom nav) */
(function () {
    if (window.__MOLESH_BOTTOM_NAV_LOADED__) return;
    window.__MOLESH_BOTTOM_NAV_LOADED__ = true;

    var STYLE_ID = 'molesh-bottom-nav-style';
    var NAV_ID = 'mobileBottomNav';
    var TOP_ID = 'mobileTopBar';

    var css = '' +
        '@media (max-width: 480px) {' +
        '  body {' +
        '    padding-top: calc(58px + env(safe-area-inset-top, 0px)) !important;' +
        '    padding-bottom: calc(96px + env(safe-area-inset-bottom, 0px)) !important;' +
        '  }' +
        '  #' + TOP_ID + ' { display: flex !important; }' +
        '  #' + NAV_ID + ' { display: flex !important; }' +
        '  body > .theme-toggle, body > #themeToggle {' +
        '    top: calc(env(safe-area-inset-top, 0px) + 10px) !important;' +
        '    right: 10px !important;' +
        '    z-index: 9100 !important;' +
        '    min-width: 38px !important;' +
        '    min-height: 38px !important;' +
        '    padding: 6px !important;' +
        '    font-size: .9rem !important;' +
        '  }' +
        '}' +

        /* ── Top app bar ── */
        '#' + TOP_ID + ' {' +
        '  display: none;' +
        '  position: fixed;' +
        '  top: env(safe-area-inset-top, 0px);' +
        '  left: 0;' +
        '  right: 0;' +
        '  z-index: 9000;' +
        '  align-items: center;' +
        '  gap: 10px;' +
        '  padding: 10px 14px;' +
        '  background: rgba(11, 11, 26, .82);' +
        '  -webkit-backdrop-filter: blur(18px);' +
        '  backdrop-filter: blur(18px);' +
        '  border-bottom: 1px solid rgba(255, 255, 255, .08);' +
        '  font-family: "Plus Jakarta Sans", system-ui, sans-serif;' +
        '  box-shadow: 0 2px 12px rgba(0, 0, 0, .25);' +
        '}' +
        '#' + TOP_ID + ' .mtb-logo {' +
        '  width: 34px; height: 34px;' +
        '  border-radius: 10px;' +
        '  background: linear-gradient(135deg, #7c3aed, #06b6d4);' +
        '  display: flex; align-items: center; justify-content: center;' +
        '  color: #fff; font-weight: 800; font-size: .82rem;' +
        '  letter-spacing: .5px;' +
        '  box-shadow: 0 4px 12px rgba(124, 58, 237, .35);' +
        '  flex-shrink: 0;' +
        '}' +
        '#' + TOP_ID + ' .mtb-text { display: flex; flex-direction: column; line-height: 1.1; min-width: 0; flex: 1; }' +
        '#' + TOP_ID + ' .mtb-title {' +
        '  font-size: .98rem; font-weight: 800;' +
        '  background: linear-gradient(90deg, #fff 30%, #7dd3fc);' +
        '  -webkit-background-clip: text; background-clip: text;' +
        '  -webkit-text-fill-color: transparent;' +
        '  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;' +
        '}' +
        '#' + TOP_ID + ' .mtb-sub {' +
        '  font-size: .62rem; font-weight: 600;' +
        '  color: rgba(226, 232, 240, .55);' +
        '  text-transform: uppercase; letter-spacing: .8px;' +
        '  margin-top: 2px;' +
        '  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;' +
        '}' +
        'html.theme-light #' + TOP_ID + ' {' +
        '  background: rgba(255, 255, 255, .92);' +
        '  border-bottom-color: rgba(15, 23, 42, .08);' +
        '  box-shadow: 0 2px 12px rgba(15, 23, 42, .08);' +
        '}' +
        'html.theme-light #' + TOP_ID + ' .mtb-title {' +
        '  background: linear-gradient(90deg, #1f2937 20%, #0e7490);' +
        '  -webkit-background-clip: text; background-clip: text;' +
        '  -webkit-text-fill-color: transparent;' +
        '}' +
        'html.theme-light #' + TOP_ID + ' .mtb-sub { color: rgba(31, 41, 55, .55); }' +

        /* ── Bottom nav ── */
        '#' + NAV_ID + ' {' +
        '  display: none;' +
        '  position: fixed;' +
        '  left: 8px;' +
        '  right: 8px;' +
        '  bottom: calc(8px + env(safe-area-inset-bottom, 0px));' +
        '  z-index: 9000;' +
        '  justify-content: space-around;' +
        '  align-items: stretch;' +
        '  gap: 2px;' +
        '  padding: 6px 4px;' +
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
        '  padding: 6px 2px;' +
        '  color: rgba(226, 232, 240, .6);' +
        '  text-decoration: none;' +
        '  font-size: .6rem;' +
        '  font-weight: 600;' +
        '  background: transparent;' +
        '  border: 0;' +
        '  border-radius: 14px;' +
        '  cursor: pointer;' +
        '  transition: color .2s ease, background .2s ease, transform .15s ease;' +
        '  min-height: 52px;' +
        '  -webkit-tap-highlight-color: transparent;' +
        '  min-width: 0;' +
        '}' +
        '#' + NAV_ID + ' .mbn-item:active { transform: scale(.94); }' +
        '#' + NAV_ID + ' .mbn-icon { font-size: 1.15rem; line-height: 1; }' +
        '#' + NAV_ID + ' .mbn-label {' +
        '  line-height: 1; letter-spacing: .1px;' +
        '  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;' +
        '  max-width: 100%;' +
        '}' +
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

    /* Pages where the "Teman" link goes to the dashboard's class-care anchor. */
    var TEMAN_HREF = 'index.html#classCareSection';

    var items = [
        { page: 'beranda', href: 'index.html',      icon: '🏠', label: 'Beranda' },
        { page: 'materi',  href: 'presentasi.html', icon: '📚', label: 'Materi'  },
        { page: 'teman',   href: TEMAN_HREF,        icon: '🤝', label: 'Teman'   },
        { page: 'mentor',  href: 'mentor.html',     icon: '🤖', label: 'Mentor'  },
        { page: 'profil',  href: 'profil.html',     icon: '👤', label: 'Profil'  }
    ];

    function inject() {
        if (document.getElementById(NAV_ID) && document.getElementById(TOP_ID)) return;

        if (!document.getElementById(STYLE_ID)) {
            var style = document.createElement('style');
            style.id = STYLE_ID;
            style.textContent = css;
            document.head.appendChild(style);
        }

        var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        var current = pageMap[path] || '';
        if (path === 'index.html' && location.hash === '#classCareSection') current = 'teman';

        /* Top bar */
        if (!document.getElementById(TOP_ID)) {
            var top = document.createElement('header');
            top.id = TOP_ID;
            top.setAttribute('role', 'banner');
            top.innerHTML =
                '<div class="mtb-logo" aria-hidden="true">ML</div>' +
                '<div class="mtb-text">' +
                '  <div class="mtb-title">Moklet Leadership</div>' +
                '  <div class="mtb-sub">SMK Telkom Malang</div>' +
                '</div>';
            document.body.appendChild(top);
        }

        /* Bottom nav */
        if (!document.getElementById(NAV_ID)) {
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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }
})();
