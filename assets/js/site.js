/* ==========================================================================
   Pfandly site.js — shared behavior for pfandlybon.com
   1. Mobile hamburger menu
   2. Lightweight i18n (EN default, auto-detect German, remembered)
   No dependencies. Loaded in <head> so window.PfI18n exists before the
   page's own inline scripts (e.g. the /i claim page) run.
   ========================================================================== */
(function () {
  'use strict';

  /* ---- 1. Language resolution ------------------------------------------ */
  // Priority: explicit user choice (localStorage) > page-locked lang
  // (support-de/-en declare it) > browser auto-detect > English.
  var STORE_KEY = 'pf_lang';

  function detect() {
    var langs = navigator.languages || [navigator.language || 'en'];
    for (var i = 0; i < langs.length; i++) {
      var l = String(langs[i] || '');
      // German speaker, or locale region is DE / AT / CH
      if (/^de\b/i.test(l) || /[-_](DE|AT|CH)$/i.test(l)) return 'de';
    }
    return 'en';
  }

  function stored() {
    try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  }
  function remember(l) {
    try { localStorage.setItem(STORE_KEY, l); } catch (e) {}
  }

  var htmlEl = document.documentElement;
  var locked = htmlEl.getAttribute('data-page-lang'); // 'en' | 'de' on support pages
  var lang = stored() || locked || detect();
  if (lang !== 'de' && lang !== 'en') lang = 'en';

  /* ---- 2. Dictionaries -------------------------------------------------- */
  var DICT = {
    en: {
      'nav.how': 'How it works',
      'nav.features': 'Features',
      'nav.support': 'Support',
      'nav.privacy': 'Privacy',
      'nav.get': 'Get the app',
      'foot.home': 'Home',
      'foot.support': 'Support',
      'foot.privacy': 'Privacy',
      'foot.impressum': 'Impressum',
      'foot.contact': 'Contact',
      'foot.made': 'Made with ❤️ in Berlin · © 2026 Pfandly',

      'hero.eyebrow': 'Pfand, sorted',
      'hero.h1': 'Your Pfand,<br>in your pocket.',
      'hero.lead': 'Stop losing paper deposit receipts. Pfandly turns every Pfandbon into a tidy digital wallet — scan it once, see what it’s worth, and show the barcode at any self-checkout to cash it in. No account, no server, no fuss.',
      'badge.appstore.small': 'Download on the',
      'badge.appstore.strong': 'App Store',
      'badge.play.small': 'GET IT ON',
      'badge.play.strong': 'Google Play',

      'how.eyebrow': 'Three simple steps',
      'how.title': 'How Pfandly works',
      'how.s1.t': 'Return your bottles',
      'how.s1.b': 'Take your empty bottles to any supermarket return machine. Grab the printed Pfandbon the machine hands you — that’s your deposit receipt.',
      'how.s2.t': 'Scan the paper bon',
      'how.s2.b': 'Tap <strong>+</strong> in Pfandly and point your camera at the receipt. The AI scanner reads the value and barcode automatically. Your bon is saved — paper safely binned.',
      'how.s3.t': 'Redeem at checkout',
      'how.s3.b': 'At any self-checkout that accepts Pfandbons, open Pfandly and show the barcode. The cashier or machine scans it and the value comes off your total.',

      'feat.eyebrow': 'Everything you need',
      'feat.title': 'Built for how you actually shop',
      'feat.ai.t': 'AI receipt scanner',
      'feat.ai.b': 'Point the camera and let the AI do the work. It reads the whole bon — value, barcode, store — and saves it instantly, even for tricky or faded receipts.',
      'feat.priv.t': 'Fully private',
      'feat.priv.b': 'Everything is stored locally on your device. No account needed, no sign-up, no data sent to any server. Your bons are yours alone.',
      'feat.pot.t': 'Pfand pot',
      'feat.pot.b': 'See your running total at a glance — how much Pfand you have waiting and how many bons you’ve collected. Never lose track again.',
      'feat.map.t': 'Store map',
      'feat.map.b': 'Not sure where to redeem? The built-in map shows nearby supermarkets that accept Pfandbons, so you can find the most convenient stop on your route.',
      'feat.hist.t': 'History & stats',
      'feat.hist.b': 'Browse your full scan history and see your lifetime Pfand saved. A satisfying record of every bottle returned and every cent recovered.',
      'feat.stores.t': 'Your stores',
      'feat.stores.b': 'Works with Rewe, Edeka, Aldi, Kaufland, Lidl, and more. Add any custom store if your local supermarket isn’t on the list yet.',

      'show.eyebrow': 'See it in action',
      'show.title': 'Clean, fast, intuitive',
      'show.cap1': 'Scan the bon',
      'show.cap2': 'Bon details',
      'show.cap3': 'Redeem at checkout',
      'show.cap4': 'Find a store',

      'pteaser.eyebrow': 'Your data stays yours',
      'pteaser.text': 'No account. Your bons never leave your phone.',
      'pteaser.btn': 'Read our privacy policy',

      'cta.eyebrow': 'Available now',
      'cta.title': 'Start saving your Pfand',
      'cta.lead': 'Download Pfandly free and turn every paper receipt into a permanent digital record in seconds.',
      'cta.note': 'Free · Germany & Austria',

      'hub.h1': 'Pfandly Support',
      'hub.lead': 'Need help with Pfandly? Choose your language below to read the full guide.',
      'hub.contact.t': 'Still need help?',
      'hub.contact.b': 'Email us at',
      'hub.contact.b2': 'and we’ll get back to you.',
      'hub.privacy': 'Read our',
      'hub.privacy.link': 'Privacy Policy',
      'hub.privacy.b2': 'to learn how Pfandly handles your data.',

      '404.lead': 'This page rolled away.',
      '404.btn': 'Back to Pfandly',

      'claim.pill': 'A friend sent you a Pfand 🍾',
      'claim.from': 'from',
      'claim.bottle': 'bottle',
      'claim.bottles': 'bottles',
      'claim.redeem': 'Show this barcode at any self-checkout to redeem the deposit.',
      'claim.open': 'Open in Pfandly',
      'claim.getlabel': 'Don’t have the app? Get Pfandly to save & manage it.',
      'claim.err.t': 'This link looks broken',
      'claim.err.b': 'The link appears to be empty or invalid. Ask your friend to share it again from the Pfandly app.',
      'claim.err.btn': 'Go to Pfandly'
    },
    de: {
      'nav.how': 'So funktioniert’s',
      'nav.features': 'Funktionen',
      'nav.support': 'Hilfe',
      'nav.privacy': 'Datenschutz',
      'nav.get': 'App holen',
      'foot.home': 'Start',
      'foot.support': 'Hilfe',
      'foot.privacy': 'Datenschutz',
      'foot.impressum': 'Impressum',
      'foot.contact': 'Kontakt',
      'foot.made': 'Mit ❤️ in Berlin gemacht · © 2026 Pfandly',

      'hero.eyebrow': 'Pfand, sortiert',
      'hero.h1': 'Dein Pfand,<br>immer dabei.',
      'hero.lead': 'Schluss mit verlorenen Papier-Pfandbons. Pfandly macht aus jedem Bon ein aufgeräumtes digitales Wallet — einmal scannen, den Wert sehen und den Barcode an jeder SB-Kasse zum Einlösen zeigen. Kein Konto, kein Server, kein Stress.',
      'badge.appstore.small': 'Laden im',
      'badge.appstore.strong': 'App Store',
      'badge.play.small': 'JETZT BEI',
      'badge.play.strong': 'Google Play',

      'how.eyebrow': 'Drei einfache Schritte',
      'how.title': 'So funktioniert Pfandly',
      'how.s1.t': 'Flaschen zurückgeben',
      'how.s1.b': 'Bring dein Leergut zum Pfandautomaten im Supermarkt. Nimm den gedruckten Pfandbon mit, den der Automat ausgibt — das ist dein Beleg.',
      'how.s2.t': 'Papierbon scannen',
      'how.s2.b': 'Tippe in Pfandly auf <strong>+</strong> und richte die Kamera auf den Bon. Der KI-Scanner liest Wert und Barcode automatisch. Dein Bon ist gespeichert — Papier kann weg.',
      'how.s3.t': 'An der Kasse einlösen',
      'how.s3.b': 'Öffne Pfandly an jeder SB-Kasse, die Pfandbons annimmt, und zeige den Barcode. Die Kasse scannt ihn und der Wert wird von deiner Rechnung abgezogen.',

      'feat.eyebrow': 'Alles, was du brauchst',
      'feat.title': 'Gebaut für deinen Einkaufsalltag',
      'feat.ai.t': 'KI-Beleg-Scanner',
      'feat.ai.b': 'Kamera drauf, KI macht den Rest. Sie liest den ganzen Bon — Wert, Barcode, Geschäft — und speichert ihn sofort, auch bei kniffligen oder verblassten Belegen.',
      'feat.priv.t': 'Voll privat',
      'feat.priv.b': 'Alles wird lokal auf deinem Gerät gespeichert. Kein Konto, keine Anmeldung, keine Daten an einen Server. Deine Bons gehören nur dir.',
      'feat.pot.t': 'Pfand-Topf',
      'feat.pot.b': 'Deine Summe auf einen Blick — wie viel Pfand auf dich wartet und wie viele Bons du gesammelt hast. Nie wieder den Überblick verlieren.',
      'feat.map.t': 'Geschäfte-Karte',
      'feat.map.b': 'Nicht sicher, wo einlösen? Die integrierte Karte zeigt nahe Supermärkte, die Pfandbons annehmen — so findest du den passenden Stopp auf deinem Weg.',
      'feat.hist.t': 'Verlauf & Statistik',
      'feat.hist.b': 'Durchstöbere deinen ganzen Scan-Verlauf und sieh dein gespartes Pfand auf Lebenszeit. Ein schöner Nachweis jeder zurückgegebenen Flasche.',
      'feat.stores.t': 'Deine Geschäfte',
      'feat.stores.b': 'Funktioniert mit Rewe, Edeka, Aldi, Kaufland, Lidl und mehr. Füge eigene Geschäfte hinzu, falls dein Supermarkt noch fehlt.',

      'show.eyebrow': 'So sieht’s aus',
      'show.title': 'Klar, schnell, intuitiv',
      'show.cap1': 'Bon scannen',
      'show.cap2': 'Bon-Details',
      'show.cap3': 'An der Kasse einlösen',
      'show.cap4': 'Geschäft finden',

      'pteaser.eyebrow': 'Deine Daten bleiben deine',
      'pteaser.text': 'Kein Konto. Deine Bons verlassen nie dein Handy.',
      'pteaser.btn': 'Datenschutz lesen',

      'cta.eyebrow': 'Jetzt verfügbar',
      'cta.title': 'Sichere dir dein Pfand',
      'cta.lead': 'Lade Pfandly kostenlos und mach aus jedem Papierbon in Sekunden einen dauerhaften digitalen Eintrag.',
      'cta.note': 'Kostenlos · Deutschland & Österreich',

      'hub.h1': 'Pfandly Hilfe',
      'hub.lead': 'Brauchst du Hilfe mit Pfandly? Wähle unten deine Sprache für die ausführliche Anleitung.',
      'hub.contact.t': 'Noch Fragen?',
      'hub.contact.b': 'Schreib uns an',
      'hub.contact.b2': 'und wir melden uns.',
      'hub.privacy': 'Lies unsere',
      'hub.privacy.link': 'Datenschutzerklärung',
      'hub.privacy.b2': ', um zu erfahren, wie Pfandly mit deinen Daten umgeht.',

      '404.lead': 'Diese Seite ist weggerollt.',
      '404.btn': 'Zurück zu Pfandly',

      'claim.pill': 'Ein Freund hat dir Pfand geschickt 🍾',
      'claim.from': 'von',
      'claim.bottle': 'Flasche',
      'claim.bottles': 'Flaschen',
      'claim.redeem': 'Zeige diesen Barcode an jeder SB-Kasse, um das Pfand einzulösen.',
      'claim.open': 'In Pfandly öffnen',
      'claim.getlabel': 'Noch keine App? Hol dir Pfandly zum Speichern & Verwalten.',
      'claim.err.t': 'Dieser Link ist ungültig',
      'claim.err.b': 'Der Link ist leer oder ungültig. Bitte deinen Freund, ihn noch einmal aus der Pfandly-App zu teilen.',
      'claim.err.btn': 'Zu Pfandly'
    }
  };

  function t(key) {
    var d = DICT[lang] || DICT.en;
    return (key in d) ? d[key] : (DICT.en[key] != null ? DICT.en[key] : key);
  }

  /* ---- 3. Public API (available synchronously for inline scripts) ------- */
  window.PfI18n = {
    get lang() { return lang; },
    t: t
  };

  /* ---- 4. Apply translations + wire UI on DOM ready -------------------- */
  function apply() {
    htmlEl.setAttribute('lang', lang);

    // text / html nodes
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var val = t(el.getAttribute('data-i18n'));
      if (el.hasAttribute('data-i18n-html')) el.innerHTML = val;
      else el.textContent = val;
    }
    // attributes:  data-i18n-attr="aria-label:key;title:key2"
    var attrNodes = document.querySelectorAll('[data-i18n-attr]');
    for (var j = 0; j < attrNodes.length; j++) {
      var pairs = attrNodes[j].getAttribute('data-i18n-attr').split(';');
      for (var k = 0; k < pairs.length; k++) {
        var p = pairs[k].split(':');
        if (p.length === 2) attrNodes[j].setAttribute(p[0].trim(), t(p[1].trim()));
      }
    }

    // "Support" nav links point at the language-specific guide, preserving
    // any directory prefix (e.g. "../" on the /i claim page).
    var target = lang === 'de' ? 'support-de.html' : 'support-en.html';
    var supportLinks = document.querySelectorAll('[data-nav-support]');
    for (var s = 0; s < supportLinks.length; s++) {
      var cur = supportLinks[s].getAttribute('href') || '';
      var prefix = cur.replace(/support-(en|de)\.html$/, '');
      supportLinks[s].setAttribute('href', prefix + target);
    }

    // reflect active language on the switch
    var btns = document.querySelectorAll('.lang-switch [data-lang]');
    for (var b = 0; b < btns.length; b++) {
      var on = btns[b].getAttribute('data-lang') === lang;
      btns[b].classList.toggle('is-active', on);
      btns[b].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  function onLangButton(e) {
    var choice = e.currentTarget.getAttribute('data-lang');
    if (!choice || choice === lang) {
      // even if unchanged, on a locked support page DE/EN means "go there"
    }
    remember(choice);
    // Support pages are separate documents — navigate instead of re-render.
    if (locked) {
      if (choice !== locked) {
        window.location.href = (choice === 'de') ? 'support-de.html' : 'support-en.html';
        return;
      }
    }
    lang = choice;
    apply();
    // let the claim page (or others) react if they registered a hook
    if (typeof window.PfOnLangChange === 'function') window.PfOnLangChange(lang);
  }

  function wire() {
    // hamburger
    var toggle = document.querySelector('.nav__toggle');
    var menu = document.getElementById('navmenu');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var open = menu.classList.toggle('is-open');
        toggle.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      // close after tapping any link inside
      menu.addEventListener('click', function (e) {
        if (e.target.closest('a')) {
          menu.classList.remove('is-open');
          toggle.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
    // language buttons
    var lb = document.querySelectorAll('.lang-switch [data-lang]');
    for (var i = 0; i < lb.length; i++) lb[i].addEventListener('click', onLangButton);

    apply();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();
