// KULİS motoru — oynanabilir sanatçı evreni.
// Akış: açılış → sanatçı seçimi → o sanatçının dünyası (GAME MODE sahneleri + TALK MODE sohbeti) → son → profil.
// GAME MODE: tam ekran fotoğraf, altta tek cümle, dokununca ilerler; kararlar üç boyutlu puanı ve sonu değiştirir.
// TALK MODE: oyuncu serbest yazar → niyet tanınır (cekirdek.niyetBul) → oyun durumu izin verirse şarkı açılır.
//            Sohbet tek başına son açamaz, görev bitiremez; verebileceği en çok: 1 müzik uyumu puanı + açılan şarkı.
// Kayıt: sanatçı başına ayrı oyun kaydı + ortak oyuncu profili (bulunan sonlar, açılan şarkılar, son ziyaret).
// Adres sonuna ?hiz=0 → beklemesiz (sınama için).
(function () {
  "use strict";
  var K = window.KULIS, C = window.CEKIRDEK;
  var B = null, DUGUM = null;                                 // seçilen sanatçının dünyası
  var PROFIL = "aura_kulis_profil", KAYIT = "aura_kulis_d_";
  var SURUM = 3;
  var HIZLI = new URLSearchParams(location.search).get("hiz") === "0";
  var OLCUM = (window.AYAR && window.AYAR.olcum) || "";       // sayım adresi; boşsa olaylar yalnız cihazda kalır
  var SITE = "https://www.aurasonicofficial.com";

  var Y = {
    adEtiket: ["What should they call you?", "Sana ne desinler?"],
    basla: ["Enter", "İçeri gir"],
    sesNotu: ["🎧 Turn your sound on — music and real songs play here.", "🎧 Sesi aç — burada müzik ve gerçek şarkılar çalıyor."],
    yakinda: ["Coming soon", "Yakında"],
    suruyor: ["In progress — continue", "Yarım kaldı — devam et"],
    ilerleme: ["endings", "son"],
    sarkiSay: ["songs", "şarkı"],
    liste: ["Missions", "Görevler"],
    yanBaslik: ["Side missions", "Yan görevler"],
    yanTamam: ["Side mission", "Yan görev"],
    gorevTamam: ["Mission complete", "Görev tamam"],
    gorevKaldi: ["Mission missed", "Görev kaldı"],
    seviye: ["Backstage level", "Kulis seviyesi"],
    simdi: ["now", "şimdi"],
    dokun: ["tap", "dokun"],
    dinle: ["playing — tap when you're ready", "çalıyor — hazır olunca dokun"],
    fotoDevam: ["Tap to continue", "Devam etmek için dokun"],
    kilitSoru: ["has a private shot for you", "sana özel bir kare gösteriyor"],
    kilitAc: ["Open the photo", "Fotoğrafı aç"],
    kilitGec: ["Not now", "Şimdi değil"],
    cal: ["Play / pause", "Çal / durdur"],
    muzik: ["Music on / off", "Müziği aç / kapat"],
    cikis: ["Back to the artists", "Sanatçılara dön"],
    acilanlar: ["Unlocked songs", "Açılan şarkılar"],
    tamami: ["Listen to the full songs →", "Şarkıların tamamını dinle →"],
    gonder: ["Send", "Gönder"],
    sonBaslik: ["ENDING", "SON"],
    sonlarBaslik: ["Endings found", "Bulunan sonlar"],
    gizliSon: ["??? — secret ending", "??? — gizli son"],
    bulunmadi: ["not found yet", "henüz bulunmadı"],
    yeniden: ["Play again for another ending", "Başka bir son için yeniden oyna"],
    baskaKulis: ["Enter another backstage", "Başka bir kulise gir"],
    devamSoru: ["Do you want the next chapter?", "Sonraki bölüm gelsin mi?"],
    evet: ["Yes — I want more", "Evet — devamını istiyorum"],
    hayir: ["Not for me", "Bana göre değil"],
    tesekkur: ["Noted. Thank you.", "Not aldık. Teşekkürler."],
    sayimNotu: ["Preview build: we count plays anonymously (which artist, how far, which choices). No name or e-mail is collected.",
                "Deneme sürümü: oynanışı anonim olarak sayıyoruz (hangi sanatçı, nereye kadar, hangi seçimler). Ad ya da e-posta toplanmaz."]
  };
  var IKON_CAL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  var IKON_DUR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';

  var $ = function (s) { return document.querySelector(s); };
  var P = null;                                               // oyuncu profili (bütün sanatçılar)
  var D = null;                                               // seçili dünyadaki oyunun durumu
  var dil = (navigator.language || "en").toLowerCase().indexOf("tr") === 0 ? "tr" : "en";
  var aktif = null, oturumBas = Date.now();

  function el(etiket, sinif, metin) {
    var e = document.createElement(etiket);
    if (sinif) e.className = sinif;
    if (metin != null) e.textContent = metin;
    return e;
  }
  function y(k) { return Y[k][dil === "tr" ? 1 : 0]; }
  function M(m) {
    var s = typeof m === "string" ? m : (m[dil] || m.en);
    return s.replace(/\{ad\}/g, P ? P.ad : "");
  }
  function ekran(ad) { ["acilis", "secim", "oyun", "son"].forEach(function (e) { $("#" + e).hidden = e !== ad; }); }

  // ── profil (OYUNCU × SANATÇI) + oyun kaydı + sayım ──
  function profilOku() { try { var p = JSON.parse(localStorage.getItem(PROFIL)); return p && p.v === 1 ? p : null; } catch (e) { return null; } }
  function profilYaz() { try { localStorage.setItem(PROFIL, JSON.stringify(P)); } catch (e) { /* gizli sekme: kayıtsız oynanır */ } }
  function pd(id) {
    return P.dunyalar[id] || (P.dunyalar[id] = { sonlar: [], sarkilar: [], yan: [], oynama: 0, bitirme: 0, sonZiyaret: 0, secim: {} });
  }
  function kaydet() { try { localStorage.setItem(KAYIT + B.id, JSON.stringify(D)); } catch (e) { /* kayıtsız */ } }
  function kayitli(id) {
    var w = K.dunyalar[id];
    try {
      var d = JSON.parse(localStorage.getItem(KAYIT + id));
      return d && d.v === SURUM && d.ds === w.surum && C.derle(w.dugumler)[d.dugum] ? d : null;
    } catch (e) { return null; }
  }
  function olay(ad, veri) {
    var o = { z: Math.round((Date.now() - oturumBas) / 1000), ad: ad, v: veri || null };
    if (D) D.olay.push(o);
    if (OLCUM && navigator.sendBeacon && P) {
      try { navigator.sendBeacon(OLCUM, JSON.stringify({ k: P.kimlik, b: B ? B.id : "-", dil: dil, z: o.z, ad: ad, v: o.v })); } catch (e) { /* sayım oyunu durdurmaz */ }
    }
  }

  // ── ilerleme: ekrana dokun ──
  var dokun = null, dokunZaman = 0;
  function dokunBekle() {
    if (HIZLI) return Promise.resolve();
    return new Promise(function (coz) { dokunZaman = Date.now(); dokun = coz; });
  }
  function ilerle() {
    if (!dokun || Date.now() - dokunZaman < 260) return;      // çift dokunuşla cümle atlanmasın
    var f = dokun; dokun = null; f();
  }
  $("#oyun").addEventListener("click", function (e) { if (!e.target.closest("button, input, form, .gorev-panel")) ilerle(); });
  document.addEventListener("keydown", function (e) {
    if ((e.key === " " || e.key === "Enter") && !$("#oyun").hidden && !e.target.closest("button, input")) { e.preventDefault(); ilerle(); }
  });
  function bekle(ms) { return HIZLI ? Promise.resolve() : new Promise(function (coz) { setTimeout(coz, ms); }); }
  function titre() { if (navigator.vibrate) { try { navigator.vibrate(25); } catch (e) { /* desteklenmiyor */ } } }

  // ── ses: fon müziği, bildirim, şarkılar ──
  var ses = new Audio(), fon = new Audio(), bip = new Audio(), calan = null, fonSayac = 0;
  ses.preload = "auto"; fon.loop = true; fon.volume = 0;
  function fonAyarla(hedef) {                                 // yumuşak ses geçişi
    var ben = ++fonSayac, bas = fon.volume, t0 = Date.now();
    (function adimla() {
      if (ben !== fonSayac) return;
      var o = Math.min(1, (Date.now() - t0) / 700);
      fon.volume = Math.max(0, Math.min(1, bas + (hedef - bas) * o));
      if (o < 1) setTimeout(adimla, 50);
    })();
  }
  function fonGuncelle() {                                    // şarkı çalarken ya da müzik kapalıyken fon susar
    if (!P) return;
    var acik = !P.muzikKapali && (ses.paused || ses.ended || ses.muted);
    if (acik && fon.paused) fon.play().catch(function () {});
    fonAyarla(acik ? K.muzik.ses : 0);
    $("#sesDugme").textContent = P.muzikKapali ? "🔇" : "♪";
    $("#sesDugme").setAttribute("aria-label", y("muzik"));
  }
  $("#sesDugme").onclick = function (e) { e.stopPropagation(); P.muzikKapali = !P.muzikKapali; fonGuncelle(); profilYaz(); };
  function bipCal() { if (HIZLI) return; try { bip.currentTime = 0; bip.play().catch(function () {}); } catch (e) { /* ses yok */ } }
  function sarkiAcildi(s) {                                   // profilde "açılan şarkılar"
    var d = pd(B.id);
    if (d.sarkilar.indexOf(s) < 0) { d.sarkilar.push(s); profilYaz(); }
  }
  function cal(s, nereden) {
    if (calan === s && nereden === "dugme") {
      if (ses.paused) ses.play().catch(function () {}); else ses.pause();
      return;
    }
    calan = s;
    ses.src = B.sarkilar[s].dosya;
    var p = ses.play();
    if (p) p.catch(function () { sesSimge(); });              // tarayıcı otomatik çalmayı engellerse düğme çalışır
    sarkiAcildi(s);
    olay("TRACK_STARTED", { s: s, n: nereden });
    sesSimge();
  }
  function sesSimge() {
    var kap = $("#calan");
    fonGuncelle();
    if (!calan || !B) { kap.hidden = true; return; }
    var S = B.sarkilar[calan];
    kap.hidden = false;
    kap.style.setProperty("--vurgu", B.renk);
    $("#calDugme").innerHTML = !ses.paused && !ses.ended ? IKON_DUR : IKON_CAL;
    $("#calDugme").setAttribute("aria-label", y("cal"));
    $("#calYazi").textContent = "♪ " + S.ad + " · " + M(B.ad);
  }
  $("#calDugme").onclick = function (e) { e.stopPropagation(); if (calan) cal(calan, "dugme"); };
  $("#calYazi").onclick = function (e) { e.stopPropagation(); playerAc(); };
  ["play", "pause", "ended"].forEach(function (o) { ses.addEventListener(o, sesSimge); });
  ses.addEventListener("ended", function () { if (calan) olay("TRACK_COMPLETED", { s: calan }); });
  ses.addEventListener("timeupdate", function () {
    if (calan && ses.duration) $("#calCubuk").style.width = (ses.currentTime / ses.duration * 100).toFixed(1) + "%";
  });
  function sesleriAc() {                                      // ilk dokunuşta ses öğelerini aç (iOS böyle ister)
    bip.src = K.muzik.bildirim; bip.volume = 0.45;
    ses.muted = true; ses.src = K.muzik.bildirim;
    var p = ses.play(), ac = function () { ses.pause(); ses.muted = false; };
    if (p) p.then(ac).catch(function () { ses.muted = false; }); else ac();
    fon.src = K.muzik.dosya;
    fonGuncelle();
  }
  function sesiDurdur() { ses.pause(); calan = null; sesSimge(); }

  // ── gömülü player: bu sanatçıda açılan şarkılar ──
  function playerAc() {
    var p = $("#playerPanel"), ul = el("ul");
    p.textContent = "";
    p.appendChild(el("h2", null, y("acilanlar") + " · " + M(B.ad)));
    pd(B.id).sarkilar.forEach(function (s) {
      if (!B.sarkilar[s]) return;
      var li = el("li"), b = el("button", "satir-dugme", (calan === s && !ses.paused ? "❚❚  " : "▶  ") + B.sarkilar[s].ad);
      b.type = "button";
      b.onclick = function (e) { e.stopPropagation(); olay("TRACK_SELECTED", { s: s, n: "player" }); cal(s, calan === s ? "dugme" : "player"); playerAc(); };
      li.appendChild(b); ul.appendChild(li);
    });
    p.appendChild(ul);
    var a = el("a", "dis", y("tamami"));
    a.href = SITE; a.target = "_blank"; a.rel = "noopener";
    a.onclick = function (e) { e.stopPropagation(); olay("EXTERNAL_MUSIC_CLICK"); };
    p.appendChild(a);
    p.hidden = false;
  }

  // ── arka plan (iki katman, yumuşak geçiş) ──
  var katman = 0, gosterilen = null, kadrajNo = 0;
  // aynı kare yeniden gelse de her cümlede kadraj başka: [yakınlık, yatay kayma %]
  var KADRAJ = [[1, 0], [1.08, -2], [1.04, 1], [1.12, 0], [1.06, 2], [1.02, -0.5], [1.1, -3], [1.05, 0]];
  function kadrajUygula(img) {
    var k = KADRAJ[kadrajNo % KADRAJ.length];
    img.style.setProperty("--yakin", k[0]);
    img.style.setProperty("--kay", k[1] + "%");
  }
  function kadraj() {                                         // ekrandaki karede kamerayı oynat
    if (D.bulanik) return;
    kadrajNo++;
    kadrajUygula($(katman ? "#arkaB" : "#arkaA"));
  }
  function onYukle(f) { if (f) { var i = new Image(); i.src = f; } }
  function cumleKaresi(a) {                                   // o cümle için özel çekilmiş kare (kareler.js); yoksa null
    var liste = (window.KULIS_KARELER || {})[B.id];
    return (liste && a.m && liste[C.anahtar(a.m.en)]) || null;
  }
  function yeniKare(k, ozel) {                                // sanatçının her cümlesinde: cümlenin karesi ya da sıradaki poz + yeni kadraj
    if (ozel) { D.tut = false; kadrajNo = 0; kilitKaldir(); arkaKoy(ozel); return bekle(260); }
    if (D.tut) { D.tut = false; kadraj(); return Promise.resolve(); }
    kadrajNo++;
    if (dondur(k)) return bekle(260);
    kadraj();
    return Promise.resolve();
  }
  function arkaKoy(f) {
    $("#arka").classList.toggle("bulanik", !!D.bulanik);
    $("#kilitOrtu").hidden = !D.bulanik;
    if (!f || gosterilen === f) { D.arka = f || D.arka; return; }
    D.arka = f; gosterilen = f;
    var yeni = $(katman ? "#arkaA" : "#arkaB"), eski = $(katman ? "#arkaB" : "#arkaA");
    katman = 1 - katman;
    yeni.onload = function () { yeni.classList.add("gor"); eski.classList.remove("gor"); };
    yeni.style.objectPosition = (B.odak && B.odak[f]) || "";
    yeni.style.transformOrigin = (B.odak && B.odak[f]) || "";
    kadrajUygula(yeni);
    yeni.src = f;
    if (yeni.complete && yeni.naturalWidth) yeni.onload();
  }
  function kilitKaldir() { D.bulanik = false; $("#arka").classList.remove("bulanik"); $("#kilitOrtu").hidden = true; }
  function dondur(k) {                                        // aynı mekânın havuzundan sıradaki poz
    var c = B.kanallar[k];
    if (!c.havuz || !D.mekan[k]) return false;
    var h = c.havuz[D.mekan[k]], i = D.sira[k] || 0, n = 0;
    do { i = (i + 1) % h.length; n++; } while (h[i] === D.arka && n < h.length);
    D.sira[k] = i;
    kilitKaldir(); arkaKoy(h[i]);
    onYukle(h[(i + 1) % h.length]);                           // sıradaki kare hazır beklesin
    return h.length > 1;
  }

  // ── üst çubuk, görevler ──
  function avatarEl(k, w) {
    var c = (w || B).kanallar[k], a = el("div", "avatar");
    a.style.setProperty("--vurgu", c.renk);
    if (c.avatar) { var i = new Image(); i.src = c.avatar; i.alt = ""; a.appendChild(i); }
    else a.textContent = c.simge;
    return a;
  }
  function ustCiz() {
    if (!aktif) return;
    var c = B.kanallar[aktif];
    $("#ustAvatar").replaceWith(Object.assign(avatarEl(aktif), { id: "ustAvatar" }));
    $("#ustAd").textContent = M(c.ad);
    $("#ustDurum").textContent = M(D.durum[aktif] || c.durum);
  }
  function kanalAc(k, arkaBekle) {
    aktif = k; D.kanal = k;
    D.kartlar = []; $("#kartlar").textContent = "";
    ustCiz();
    var c = B.kanallar[k];
    if (arkaBekle) return;                                    // hemen ardından hikâye kendi fotoğrafını koyacak
    kilitKaldir();
    if (c.arka) arkaKoy(c.arka);
    else if (c.havuz) {
      if (!D.mekan[k] && c.ilkMekan) { D.mekan[k] = c.ilkMekan; D.sira[k] = 0; }
      if (D.mekan[k]) arkaKoy(c.havuz[D.mekan[k]][D.sira[k] || 0]);
      else if (c.bekleme) arkaKoy(c.bekleme);
    }
    D.tut = true;
  }
  function elmasCiz(yeni) {
    var e = $("#elmas");
    e.textContent = "💎 " + D.elmas;
    if (yeni) { e.classList.remove("yeni"); void e.offsetWidth; e.classList.add("yeni"); }
  }
  function alinan() { return B.gorevler.filter(function (g) { return D.gorev[g.id] === 1; }).length; }
  function gorevCiz(yeni) {
    var dugme = $("#gorevDugme"), panel = $("#gorevPanel"), ul = el("ul"), ul2 = el("ul");
    dugme.textContent = "✓ " + alinan() + "/" + B.gorevler.length;
    dugme.setAttribute("aria-label", y("liste"));
    if (yeni) { dugme.classList.remove("yeni"); void dugme.offsetWidth; dugme.classList.add("yeni"); }
    panel.textContent = "";
    panel.appendChild(el("h2", null, y("seviye") + " " + C.seviye(D.puan) + " / 5"));
    panel.appendChild(el("h2", "ikinci", y("liste")));
    B.gorevler.forEach(function (g) {
      var d = D.gorev[g.id], li = el("li", d === 1 ? "tamam" : (d === "x" ? "kaldi" : ""));
      li.appendChild(el("span", "im", d === "x" ? "✗" : (d ? "✓" : "○")));
      li.appendChild(el("span", null, M(g.ad)));
      ul.appendChild(li);
    });
    panel.appendChild(ul);
    panel.appendChild(el("h2", "ikinci", y("yanBaslik")));
    B.yanGorevler.forEach(function (g) {
      var li = el("li", D.yan[g.id] ? "tamam yan" : "yan");
      li.appendChild(el("span", "im", D.yan[g.id] ? "★" : "☆"));
      li.appendChild(el("span", null, M(g.ad)));
      ul2.appendChild(li);
    });
    panel.appendChild(ul2);
  }
  $("#gorevDugme").onclick = function (e) {
    e.stopPropagation();
    var p = $("#gorevPanel"); p.hidden = !p.hidden; $("#playerPanel").hidden = true;
    this.setAttribute("aria-expanded", String(!p.hidden));
  };
  document.addEventListener("click", function () {
    $("#gorevPanel").hidden = true; $("#playerPanel").hidden = true; $("#gorevDugme").setAttribute("aria-expanded", "false");
  });
  $("#geriDugme").onclick = function (e) {                    // sanatçı seçimine dön (oyun kayıtlı kalır)
    e.stopPropagation();
    olay("ARTIST_SWITCH", { d: D.dugum });
    kaydet(); dokun = null; D = null; sesiDurdur();
    secimCiz();
  };

  var rozetSayac = 0;
  function rozet(metin, renk) {                               // kısa süreli bildirim: görev, yan görev, puan
    var r = $("#rozet"), ben = ++rozetSayac;
    r.textContent = metin;
    r.style.setProperty("--vurgu", renk || "");
    r.hidden = true; void r.offsetWidth; r.hidden = false;
    setTimeout(function () { if (ben === rozetSayac) r.hidden = true; }, 2600);
  }
  function yanTamam(id) {
    var g = B.yanGorevler.filter(function (x) { return x.id === id; })[0];
    if (!g || D.yan[id]) return false;
    D.yan[id] = 1; D.elmas += 1;
    var d = pd(B.id); if (d.yan.indexOf(id) < 0) { d.yan.push(id); profilYaz(); }
    elmasCiz(true); gorevCiz(true); bipCal();
    rozet("★ " + y("yanTamam") + ": " + M(g.ad) + "   +1 💎", "#e8c45a");
    return true;
  }
  function puanVer(p) {                                       // üç boyutlu puan; ekranda en çok artan boyut + seviye
    var once = C.seviye(D.puan), enK = null;
    Object.keys(p || {}).forEach(function (k) { D.puan[k] = (D.puan[k] || 0) + p[k]; if (!enK || p[k] > p[enK]) enK = k; });
    if (!enK) return false;
    var sonra = C.seviye(D.puan);
    rozet(M(K.statlar[enK]) + " +" + p[enK] + (sonra > once ? "   ·   " + y("seviye") + " " + sonra : ""), B.renk);
    gorevCiz(false);
    return true;
  }

  // ── konuşma kutusu + seçenekler ──
  function kutuGizle() { $("#kutu").hidden = true; if (D) D.kutu = null; }
  function kutuGoster(tur, ad, renk, metin, altYazi) {
    var k = $("#kutu"), m = $("#kutuMetin");
    k.hidden = false;
    k.className = "kutu" + (tur ? " " + tur : "");
    k.style.setProperty("--vurgu", renk || "");
    $("#kutuAd").textContent = ad || "";
    m.textContent = metin;
    if (altYazi) m.appendChild(el("small", null, altYazi));
    m.style.animation = "none"; void m.offsetWidth; m.style.animation = "";
    $("#kutuIpucu").className = "kutu-ipucu";
    $("#kutuIpucu").textContent = "";
    D.kutu = [tur, ad, renk, metin, altYazi];                 // yenilemede son cümle geri gelsin
  }
  function satir(tur, ad, renk, metin, altYazi) {             // bir cümle göster, dokunuşu bekle
    kutuGoster(tur, ad, renk, metin, altYazi);
    var i = $("#kutuIpucu");
    i.classList.add("tik");
    i.textContent = P.ipucuGoruldu ? "" : y("dokun");
    return dokunBekle().then(function () { P.ipucuGoruldu = 1; });
  }
  function secenekGoster(liste, soru) {
    return new Promise(function (coz) {
      var kap = $("#secenekler");
      kap.textContent = "";
      if (soru) kutuGoster("anlati", "", null, soru);
      liste.forEach(function (o, j) {
        var b = el("button", "secenek" + (o.sinif ? " " + o.sinif : ""), o.metin);
        b.type = "button"; b.dataset.j = j;
        if (o.kapali) b.disabled = true;
        b.onclick = function (e) { e.stopPropagation(); kap.textContent = ""; coz(o.deger); };
        kap.appendChild(b);
      });
    });
  }

  // ── özel adımlar ──
  function kartEkle(o) {
    var e = el("div", "kart"), g = el("div", "govde"), ad = el("div", "ad", M(B.kanallar[o.k].ad));
    ad.appendChild(el("small", null, y("simdi")));
    g.appendChild(ad); g.appendChild(el("div", "metin", o.metin));
    e.appendChild(avatarEl(o.k)); e.appendChild(g);
    if (o.f) { var i = new Image(); i.className = "kucuk"; i.alt = ""; i.src = o.f; e.appendChild(i); }
    $("#kartlar").appendChild(e);
  }
  function sahneGoster(a) {                                   // dünyaya giriş: sanatçı + görev
    return new Promise(function (coz) {
      var s = $("#sahne"), ust = el("div", "sahne-ust"), kadro = el("div", "sahne-kadro"), alt = el("div", "sahne-alt");
      s.textContent = "";
      ust.appendChild(el("p", "zaman", M(a.zaman)));
      ust.appendChild(el("h2", null, M(a.baslik)));
      a.kadro.forEach(function (r) {
        var sira = el("div", "sira"), yz = el("div", "yazi"), i = new Image();
        sira.style.setProperty("--vurgu", B.kanallar[r.k].renk);
        i.src = r.f; i.alt = "";
        yz.appendChild(el("div", "kim", M(B.kanallar[r.k].ad)));
        yz.appendChild(el("div", "ne", M(r.m)));
        sira.appendChild(i); sira.appendChild(yz); kadro.appendChild(sira);
      });
      alt.appendChild(el("p", "ozet", M(a.ozet)));
      var b = el("button", "ana", M(a.dugme));
      b.type = "button";
      b.onclick = function () { s.hidden = true; olay("MISSION_STARTED"); coz(); };
      alt.appendChild(b);
      s.appendChild(ust); s.appendChild(kadro); s.appendChild(alt);
      s.hidden = false;
      if (HIZLI) b.onclick();
    });
  }
  async function kilitliAdim(a) {
    if (aktif !== a.k) kanalAc(a.k, true);
    kutuGizle();
    D.bulanik = true;
    $("#kilitYazi").textContent = M(B.kanallar[a.k].ad) + " " + y("kilitSoru");
    arkaKoy(a.f);
    var ac = await secenekGoster([
      { metin: "💎 " + B.kilitBedeli + " · " + y("kilitAc"), sinif: "vurgulu", deger: true, kapali: D.elmas < B.kilitBedeli },
      { metin: y("kilitGec"), sinif: "orta", deger: false }
    ]);
    D.bayrak.kilit = ac ? "acik" : "kapali";
    olay("CHOICE_SELECTED", { d: D.dugum, kilit: ac });
    if (ac) {
      D.elmas -= B.kilitBedeli; elmasCiz(true);
      kilitKaldir();
      if (B.kilitYan) yanTamam(B.kilitYan);
      await satir("anlati", "", null, y("fotoDevam"));
    } else {
      D.tut = false;                                          // sıradaki cümlede başka kareye döner
    }
    if (ac) D.tut = true;                                     // açılan kare, hakkında konuşulurken ekranda kalır
  }

  // ── TALK MODE ──
  // PLAYER INPUT → niyetBul (konuşma katmanı) → oyun durumu denetimi → izinli eylem (cevap / şarkı önerisi / şarkıyı aç).
  function konusAdim(a) {
    return new Promise(function (coz) {
      var kon = B.konusma, c = B.kanallar[a.k], t0 = Date.now(), puanVerildi = false, bilinmeyen = 0, mesaj = 0;
      var form = $("#yaz"), girdi = $("#yazi"), kap = $("#secenekler");
      olay("TALK_MODE_OPENED");
      form.hidden = false; girdi.value = ""; girdi.placeholder = M(kon.yaz);
      $("#yazGonder").setAttribute("aria-label", y("gonder"));

      function ciz(soz, sarkilar) {
        kutuGoster("", M(c.ad), c.renk, soz);
        kap.textContent = "";
        (sarkilar || []).forEach(function (s) {                 // yalnız katalogdaki gerçek şarkılar önerilir
          if (!B.sarkilar[s]) return;
          olay("TRACK_OFFERED", { s: s });
          var b = el("button", "secenek sarki-oneri", "♪  " + B.sarkilar[s].ad);
          b.type = "button"; b.dataset.s = s;
          b.onclick = function (e) { e.stopPropagation(); sarkiSec(s); };
          kap.appendChild(b);
        });
        if (!(sarkilar || []).length) kon.oneriler.forEach(function (m) {
          var b = el("button", "secenek ipucu-oneri", M(m));
          b.type = "button";
          b.onclick = function (e) { e.stopPropagation(); yazildi(M(m)); };
          kap.appendChild(b);
        });
        var cik = el("button", "secenek orta cikis", M(kon.cikis));
        cik.type = "button";
        cik.onclick = function (e) { e.stopPropagation(); bitir(); };
        kap.appendChild(cik);
      }
      function sarkiSec(s) {                                    // izinli eylem: şarkıyı aç; sohbetin verebildiği tek puan burada
        olay("TRACK_SELECTED", { s: s, n: "talk" });
        cal(s, "talk");
        if (!yanTamam("sohbet") && !puanVerildi) puanVer({ m: 1 });
        else if (!puanVerildi) { D.puan.m = (D.puan.m || 0) + 1; gorevCiz(false); }
        puanVerildi = true;
        dondur(a.k);
        ciz("♪ " + B.sarkilar[s].ad, null);
        kaydet();
      }
      function yazildi(metin) {
        metin = String(metin).trim().slice(0, 200);
        if (!metin) return;
        mesaj++;
        var r = C.niyetBul(B, metin), n = kon.niyetler[r.niyet], soz;
        if (r.niyet === "bilinmeyen") soz = n.soz[bilinmeyen++ % n.soz.length];
        else soz = n.soz[Math.floor(Math.random() * n.soz.length)];
        olay("CHOICE_SELECTED", { talk: r.niyet });
        girdi.value = "";
        dondur(a.k);                                            // her cevapta fotoğraf değişir
        if (n.cik) { kutuGoster("", M(c.ad), c.renk, M(soz)); return setTimeout(bitir, HIZLI ? 0 : 900); }
        if (r.niyet === "sarkiAdi") { ciz(M(soz), [r.sarki]); return; }
        ciz(M(soz), n.sarkilar);
      }
      function bitir() {
        form.hidden = true; form.onsubmit = null; kap.textContent = "";
        olay("TALK_DURATION", { sn: Math.round((Date.now() - t0) / 1000), mesaj: mesaj });
        kutuGizle(); D.tut = false;
        coz();
      }
      form.onsubmit = function (e) { e.preventDefault(); e.stopPropagation(); yazildi(girdi.value); };
      ciz(M(kon.giris), null);
      if (HIZLI) {                                              // sınama: yaz → önerilen şarkıyı seç → çık
        yazildi(M(kon.oneriler[0]));
        var ilk = kap.querySelector(".sarki-oneri");
        if (ilk) ilk.click();
        bitir();
      }
    });
  }

  async function adim(a) {
    var c, S, g, sonraki, onceki;
    switch (a.t) {
      case "sahne": await sahneGoster(a); break;
      case "sohbet":
        if (aktif === a.k) break;
        sonraki = DUGUM[D.dugum][D.i + 1];
        kutuGizle();
        kanalAc(a.k, !!sonraki && sonraki.k === a.k && (sonraki.t === "foto" || (sonraki.t === "mekan" && !sonraki.gosterme)));
        if (B.kanallar[a.k].titresim) { titre(); bipCal(); }
        await bekle(550);
        break;
      case "mekan":
        D.mekan[a.k] = a.h; D.sira[a.k] = 0;
        if (!a.gosterme) {
          if (aktif !== a.k) kanalAc(a.k, true);
          kilitKaldir(); arkaKoy(B.kanallar[a.k].havuz[a.h][0]);
          D.tut = true;
          await bekle(450);
        }
        break;
      case "durum":
        D.durum[a.k] = a.m;
        if (aktif === a.k) ustCiz();
        break;
      case "bayrak": Object.keys(a.b).forEach(function (k) { D.bayrak[k] = a.b[k]; }); break;
      case "olc": (function (b) { Object.keys(b).forEach(function (k) { D.bayrak[k] = b[k]; }); })(C.olcSonucu(a, D.puan)); break;
      case "yan": yanTamam(a.id); break;
      case "anlati":                                          // anlatıcı satırının kendi karesi varsa o gösterilir
        if (cumleKaresi(a)) await yeniKare(aktif, cumleKaresi(a)); else kadraj();
        await satir("anlati", "", null, M(a.m));
        break;
      case "hatirla":                                         // oyuncu hafızası: bu sanatçıyla önceki oyunun kararı
        onceki = pd(B.id).secim[a.anahtar];
        if (pd(B.id).bitirme > 0 && onceki && B.sarkilar[onceki]) {
          c = B.kanallar[a.k];
          await satir("", M(c.ad), c.renk, M(a.m).replace("{onceki}", B.sarkilar[onceki].ad));
        }
        break;
      case "gelen":
        if (aktif !== a.k) kanalAc(a.k);
        await yeniKare(a.k, cumleKaresi(a));                    // cümlenin kendi karesi varsa o, yoksa sıradaki poz
        c = B.kanallar[a.k];
        await satir("", M(c.ad), c.renk, M(a.m));
        break;
      case "giden": kadraj(); await satir("ben", P.ad, null, M(a.m)); break;
      case "foto":
        if (aktif !== a.k) kanalAc(a.k, true);
        kutuGizle(); kilitKaldir();
        arkaKoy(a.f);
        D.tut = true;
        await bekle(950);                                     // fotoğraf bir an yazısız görünsün
        break;
      case "kilitli": await kilitliAdim(a); break;
      case "konus": await konusAdim(a); break;
      case "sarki":
        S = B.sarkilar[a.s]; c = B.kanallar[S.k];
        cal(a.s, "hikaye");
        if (aktif === S.k) await yeniKare(S.k);
        await satir("sarki", M(c.ad), c.renk, "♪ " + S.ad, y("dinle"));
        break;
      case "dur": break;
      case "gorev":
        g = B.gorevler.filter(function (x) { return x.id === a.id; })[0];
        if (a.basarisiz) {
          D.gorev[a.id] = "x";
          gorevCiz(true);
          rozet("✗ " + y("gorevKaldi") + ": " + M(g.ad), "#e2606c");
        } else {
          D.gorev[a.id] = 1; D.elmas += 1;
          gorevCiz(true); elmasCiz(true); bipCal();
          rozet("✓ " + y("gorevTamam") + ": " + M(g.ad) + "   +1 💎", B.renk);
          olay("MISSION_COMPLETED", { id: a.id });
        }
        await bekle(1300);
        break;
      case "kart":
        kutuGizle();
        D.kartlar.push({ k: a.k, metin: M(a.m), f: a.f });
        kartEkle(D.kartlar[D.kartlar.length - 1]);
        titre(); bipCal();
        await bekle(1100);
        break;
    }
  }

  async function secimSor(a) {
    var kisa = a.s.every(function (o) { return M(o.m).length < 12; });
    a.s.forEach(function (o) { if (o.sarki) olay("TRACK_OFFERED", { s: o.sarki }); });
    var j = await secenekGoster(a.s.map(function (o, i) { return { metin: (o.sarki ? "♪  " : "") + M(o.m), deger: i, sinif: kisa ? "orta" : "" }; }), a.soru ? M(a.soru) : null);
    var o = a.s[j];
    olay("CHOICE_SELECTED", { d: D.dugum, j: j });
    if (o.sarki) olay("TRACK_SELECTED", { s: o.sarki, n: "hikaye" });
    D.secimler.push(D.dugum + ":" + j);
    Object.keys(o.b || {}).forEach(function (k) { D.bayrak[k] = o.b[k]; });
    if (o.y && yanTamam(o.y)) Object.keys(o.p || {}).forEach(function (k) { D.puan[k] = (D.puan[k] || 0) + o.p[k]; });
    else puanVer(o.p);
    D.tut = false;                                            // her cevaptan sonra fotoğraf değişir
    kutuGizle();
    return o;
  }

  async function kos() {
    var benim = D;                                            // sanatçı değiştirilirse bu döngü durur
    for (;;) {
      if (D !== benim) return;
      var a = DUGUM[D.dugum][D.i];
      if (!a) { console.error("düğüm bitti:", D.dugum, D.i); return; }
      if (!C.uyar(a.eger, D.bayrak)) { D.i++; continue; }
      if (a.t === "git") { D.dugum = a.d; D.i = 0; olay("SCENE_REACHED", { d: a.d }); kaydet(); continue; }
      if (a.t === "karar") { D.dugum = C.kararHedefi(a, D.puan, D.bayrak); D.i = 0; olay("SCENE_REACHED", { d: D.dugum }); kaydet(); continue; }
      if (a.t === "son") { bitir(a.id); return; }
      if (a.t === "secim") { var o = await secimSor(a); if (D !== benim) return; D.dugum = o.git; D.i = 0; kaydet(); continue; }
      await adim(a);
      if (D !== benim) return;
      D.i++; D.adim++; kaydet();
    }
  }

  // ── son + profil ──
  function bitir(sonId) {
    var d = pd(B.id);
    D.bitti = true; D.son = sonId;
    if (d.sonlar.indexOf(sonId) < 0) d.sonlar.push(sonId);
    d.bitirme++; d.sonZiyaret = Date.now();
    d.secim = JSON.parse(JSON.stringify(D.bayrak));           // "geçen sefer bunu seçmiştin" için
    profilYaz();
    olay("ENDING_REACHED", { son: sonId, g: D.puan.g || 0, m: D.puan.m || 0, c: D.puan.c || 0, gorev: alinan(), yan: Object.keys(D.yan).length });
    kaydet(); sonEkran();
  }
  function sonEkran() {
    ekran("son");
    var ic = $("#sonIc"), d = pd(B.id), son = B.sonlar.filter(function (s) { return s.id === D.son; })[0];
    ic.textContent = "";
    ic.style.setProperty("--vurgu", B.renk);
    ic.appendChild(el("p", "ustyazi", M(B.ad).toLocaleUpperCase(dil) + " · " + y("sonBaslik")));
    ic.appendChild(el("h2", null, M(son.ad)));
    ic.appendChild(el("p", "sonraki", M(B.bolumAdi)));

    var karne = el("div", "karne");
    [[y("seviye"), C.seviye(D.puan) + " / 5"], [y("liste"), alinan() + " / " + B.gorevler.length], [y("yanBaslik"), Object.keys(D.yan).length + " / " + B.yanGorevler.length]].forEach(function (x) {
      var h = el("div", "hucre");
      h.appendChild(el("b", null, x[1])); h.appendChild(el("span", null, x[0]));
      karne.appendChild(h);
    });
    ic.appendChild(karne);
    var st = el("p", "statlar");
    ["g", "m", "c"].forEach(function (k) { st.appendChild(el("span", null, M(K.statlar[k]) + " " + (D.puan[k] || 0))); });
    ic.appendChild(st);

    var kutu = el("div", "calanlar");
    kutu.appendChild(el("h3", null, y("sonlarBaslik") + " · " + d.sonlar.length + " / " + B.sonlar.length));
    B.sonlar.forEach(function (s) {
      var buldu = d.sonlar.indexOf(s.id) >= 0;
      var p = el("p", buldu ? "" : "yok", (buldu ? "✓  " : "○  ") + (buldu ? M(s.ad) : (s.gizli ? y("gizliSon") : M(s.ad))));
      if (!buldu && !s.gizli) p.appendChild(el("span", null, " · " + y("bulunmadi")));
      kutu.appendChild(p);
    });
    kutu.appendChild(el("h3", "ikinci", y("acilanlar") + " · " + d.sarkilar.length + " / " + Object.keys(B.sarkilar).length));
    d.sarkilar.forEach(function (s) { if (B.sarkilar[s]) kutu.appendChild(el("p", null, "♪  " + B.sarkilar[s].ad)); });
    var a = el("a", null, y("tamami"));
    a.href = SITE; a.target = "_blank"; a.rel = "noopener";
    a.onclick = function () { olay("EXTERNAL_MUSIC_CLICK"); };
    kutu.appendChild(a);
    ic.appendChild(kutu);

    var yb = el("button", "ana", y("yeniden"));
    yb.type = "button"; yb.dataset.is = "yeniden";
    yb.onclick = function () { dunyaAc(B.id, true); };
    ic.appendChild(yb);
    var bk = el("button", "ikincil", y("baskaKulis"));
    bk.type = "button"; bk.dataset.is = "baska";
    bk.onclick = function () { olay("ARTIST_SWITCH", { d: "son" }); D = null; sesiDurdur(); secimCiz(); };
    ic.appendChild(bk);

    if (P.devam == null) {
      ic.appendChild(el("p", "soru", y("devamSoru")));
      [["evet", true], ["hayir", false]].forEach(function (x) {
        var b = el("button", "ikincil kucuk", y(x[0]));
        b.type = "button"; b.dataset.cevap = x[0];
        b.onclick = function () { P.devam = x[1]; profilYaz(); olay("CHOICE_SELECTED", { devam: x[1] }); sonEkran(); };
        ic.appendChild(b);
      });
    } else ic.appendChild(el("p", "tesekkur", y("tesekkur")));
  }

  // ── sanatçı seçimi ──
  function secimCiz() {
    ekran("secim");
    B = null; DUGUM = null; aktif = null;
    $("#secimSoru").textContent = M(K.soru);
    $("#secimAd").textContent = P.ad;
    var kap = $("#kartlarSecim");
    kap.textContent = "";
    K.sira.forEach(function (id) {
      var w = K.dunyalar[id], yk = K.yakinda[id], acik = !!w, x = w || yk;
      var b = el("button", "dunya" + (acik ? "" : " kapali")), yz = el("span", "yazi"), i = new Image();
      b.type = "button"; b.dataset.id = id; b.disabled = !acik;
      b.style.setProperty("--vurgu", x.renk);
      i.src = x.kart; i.alt = "";
      yz.appendChild(el("span", "kim", acik ? M(w.ad) : x.ad));
      yz.appendChild(el("span", "tur", M(x.tur)));
      if (acik) {
        var d = pd(id), k = kayitli(id);
        yz.appendChild(el("span", "cumle", M(w.cumle)));
        yz.appendChild(el("span", "ilerleme", k && !k.bitti ? y("suruyor")
          : d.sonlar.length + "/" + w.sonlar.length + " " + y("ilerleme") + " · " + d.sarkilar.length + "/" + Object.keys(w.sarkilar).length + " " + y("sarkiSay")));
        b.onclick = function () { dunyaAc(id, false); };
      } else yz.appendChild(el("span", "ilerleme", y("yakinda")));
      b.appendChild(i); b.appendChild(yz);
      kap.appendChild(b);
    });
  }
  function dunyaAc(id, yeniden) {
    B = K.dunyalar[id]; DUGUM = C.derle(B.dugumler);
    var d = pd(id), k = yeniden ? null : kayitli(id);
    ekran("oyun");
    $("#oyun").style.setProperty("--vurgu", B.renk);
    $("#kartlar").textContent = ""; $("#secenekler").textContent = ""; $("#yaz").hidden = true; $("#sahne").hidden = true;
    $("#kutu").hidden = true; $("#rozet").hidden = true;
    gosterilen = null; aktif = null;
    olay("ARTIST_SELECTED", { id: id });
    if (d.sonZiyaret && Date.now() - d.sonZiyaret > 6 * 3600 * 1000) olay("RETURN_VISIT", { saat: Math.round((Date.now() - d.sonZiyaret) / 3600000) });
    d.sonZiyaret = Date.now();
    if (k && !k.bitti) {                                      // yarım kalan oyun: kaldığı yerden
      D = k;
      aktif = D.kanal; ustCiz();
      arkaKoy(D.arka);
      (D.kartlar || []).forEach(kartEkle);
      if (D.kutu) kutuGoster.apply(null, D.kutu);
    } else {
      D = { v: SURUM, ds: B.surum, dugum: B.baslangic, i: 0, adim: 0, puan: {}, bayrak: {}, gorev: {}, yan: {}, durum: {}, secimler: [], kanal: null,
            arka: null, bulanik: false, mekan: {}, sira: {}, tut: false, elmas: B.baslangicElmas || 0, kartlar: [], kutu: null, olay: [], bitti: false, son: null };
      d.oynama++;
      olay(d.bitirme > 0 ? "REPLAY_STARTED" : "CHAPTER_STARTED", { oynama: d.oynama });
    }
    profilYaz();
    gorevCiz(false); elmasCiz(false); sesSimge();
    (JSON.stringify(B).match(/medya\/\w+\.jpg/g) || []).filter(function (f, i, l) { return l.indexOf(f) === i; })
      .forEach(function (f) { new Image().src = f; });       // fotoğraflar önden yüklensin
    kos();
  }

  // ── açılış ──
  function acilisCiz() {
    document.documentElement.lang = dil;
    document.title = K.oyun[dil].charAt(0) + K.oyun[dil].slice(1).toLocaleLowerCase(dil) + " — Aura Sonic";
    $("#oyunAdi").textContent = K.oyun[dil];
    $("#altbaslik").textContent = K.altbaslik[dil];
    $("#adEtiket").textContent = y("adEtiket");
    $("#ad").placeholder = K.varsayilanAd[dil];
    $("#basla").textContent = y("basla");
    $("#sesNotu").textContent = y("sesNotu");
    $("#sayimNotu").textContent = OLCUM ? y("sayimNotu") : "";
    $("#sayimNotu").hidden = !OLCUM;
    $("#geriDugme").setAttribute("aria-label", y("cikis"));
    document.querySelectorAll(".dil button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.dil === dil)); });
  }
  function basla() {
    var ad = $("#ad").value.trim().replace(/\s+/g, " ") || (P && P.ad) || K.varsayilanAd[dil];
    if (!P) P = { v: 1, kimlik: (HIZLI ? "T-" : "") + Math.random().toString(36).slice(2, 12), dunyalar: {}, muzikKapali: false, devam: null, ilk: Date.now() };
    P.ad = ad; P.dil = dil;
    profilYaz();
    sesleriAc();
    secimCiz();
  }

  P = profilOku();
  if (P) { dil = P.dil || dil; $("#ad").value = P.ad || ""; }
  document.querySelectorAll(".dil button").forEach(function (b) { b.onclick = function () { dil = b.dataset.dil; acilisCiz(); }; });
  $("#basla").onclick = basla;
  $("#ad").addEventListener("keydown", function (e) { if (e.key === "Enter") basla(); });
  acilisCiz();

  window.__oyun = { durum: function () { return D; }, profil: function () { return P; }, dunya: function () { return B; } };   // sınama betikleri buradan okur
})();
