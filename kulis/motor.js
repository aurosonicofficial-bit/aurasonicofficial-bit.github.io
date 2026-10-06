// Oyun motoru: bölüm verisini (window.BOLUM) sohbet ekranında oynatır.
// Kayıt tarayıcıda tutulur (sayfa yenilense de kaldığı yerden sürer). Adres sonuna ?hiz=0 → beklemesiz (deneme için).
(function () {
  "use strict";
  var B = window.BOLUM, C = window.CEKIRDEK;
  var DUGUM = C.derle(B.dugumler);
  var ANAHTAR = "aura_hikaye_" + B.id;
  var HIZLI = new URLSearchParams(location.search).get("hiz") === "0";
  var OLCUM = (window.AYAR && window.AYAR.olcum) || "";       // sayım adresi; boşsa olaylar yalnız cihazda kalır
  var SITE = "https://www.aurasonicofficial.com";

  var Y = {
    adEtiket: ["What should they call you?", "Sana ne desinler?"],
    basla: ["Start", "Başla"],
    bastan: ["Start over", "Baştan başla"],
    surdur: ["Continue where you left off", "Kaldığın yerden devam et"],
    sesNotu: ["🎧 Turn your sound on — real songs play in this story.", "🎧 Sesi aç — bu hikâyede gerçek şarkılar çalıyor."],
    yaziyor: ["typing…", "yazıyor…"],
    ipucu: ["tap the chat to speed up", "hızlandırmak için sohbete dokun"],
    liste: ["Tonight's list", "Bu gecenin listesi"],
    devam: ["Continue", "Devam"],
    ac: ["Open", "Aç"],
    simdi: ["now", "şimdi"],
    kilitYazi: ["Private photo", "Özel fotoğraf"],
    kilitSoru: ["sent a private photo", "özel bir fotoğraf gönderdi"],
    kilitAc: ["💎 Open (free in this preview)", "💎 Aç (denemede ücretsiz)"],
    kilitGec: ["Not now", "Şimdi değil"],
    cal: ["Play", "Çal"],
    bitti: ["EPISODE 1 COMPLETE", "BÖLÜM 1 BİTTİ"],
    devamEdecek: ["To be continued…", "Devam edecek…"],
    devamSoru: ["Do you want Episode 2?", "Bölüm 2 gelsin mi?"],
    evet: ["Yes — I need to know what happens", "Evet — devamını merak ediyorum"],
    hayir: ["Not for me", "Bana göre değil"],
    tesekkurEvet: ["Noted. Thank you for playing.", "Not aldık. Oynadığın için teşekkürler."],
    tesekkurHayir: ["Thank you for playing — an honest answer helps.", "Oynadığın için teşekkürler — dürüst cevabın işimize yarıyor."],
    calanlar: ["Songs in this episode", "Bu bölümde çalan şarkılar"],
    tamami: ["Listen to the full songs →", "Şarkıların tamamını dinle →"],
    yeniden: ["Play again", "Yeniden oyna"],
    sayimNotu: ["Preview build: we count plays anonymously (how far people get, which choices). No name or e-mail is collected.",
                "Deneme sürümü: oynanışı anonim olarak sayıyoruz (nereye kadar gelindiği, hangi seçimler). Ad ya da e-posta toplanmaz."]
  };
  var IKON_CAL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  var IKON_DUR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';

  var $ = function (s) { return document.querySelector(s); };
  var akis = $("#akis"), alt = $("#alt");
  var D = null;                                               // oyun durumu (kaydedilen her şey)
  var dil = (navigator.language || "en").toLowerCase().indexOf("tr") === 0 ? "tr" : "en";
  var aktif = null, kanalEl = {};

  function el(etiket, sinif, metin) {
    var e = document.createElement(etiket);
    if (sinif) e.className = sinif;
    if (metin != null) e.textContent = metin;
    return e;
  }
  function y(k) { return Y[k][dil === "tr" ? 1 : 0]; }
  function M(m) {
    var s = typeof m === "string" ? m : (m[dil] || m.en);
    return s.replace(/\{ad\}/g, D ? D.ad : "").replace(/\{s:(\w+)\}/g, function (_, k) {
      var sk = D && D.bayrak[k];
      return sk && B.sarkilar[sk] ? B.sarkilar[sk].ad : "—";
    });
  }

  // ── kayıt ──
  function kaydet() { try { localStorage.setItem(ANAHTAR, JSON.stringify(D)); } catch (e) { /* gizli sekme: kayıtsız oynanır */ } }
  function kayitli() {
    try { var d = JSON.parse(localStorage.getItem(ANAHTAR)); return d && d.v === 1 && DUGUM[d.dugum] ? d : null; } catch (e) { return null; }
  }
  function olay(ad, veri) {
    var o = { z: Math.round((Date.now() - D.bas) / 1000), ad: ad, v: veri || null };
    D.olay.push(o);
    if (OLCUM && navigator.sendBeacon) {
      try { navigator.sendBeacon(OLCUM, JSON.stringify({ k: D.kimlik, b: B.id, dil: D.dil, z: o.z, ad: ad, v: o.v })); } catch (e) { /* sayım oyunu durdurmaz */ }
    }
  }

  // ── bekleme (sohbete dokununca atlanır) ──
  var atla = null;
  function bekle(ms) {
    if (HIZLI) return Promise.resolve();
    return new Promise(function (coz) {
      var t = setTimeout(function () { atla = null; coz(); }, ms);
      atla = function () { clearTimeout(t); atla = null; coz(); };
    });
  }
  akis.addEventListener("click", function (e) {
    if (atla && !e.target.closest("button, .sarki")) atla();
  });

  function dibe(aninda) {
    requestAnimationFrame(function () {
      if (aninda) akis.style.scrollBehavior = "auto";
      akis.scrollTop = akis.scrollHeight;
      if (aninda) akis.style.scrollBehavior = "";
    });
  }
  function titre() { if (navigator.vibrate) { try { navigator.vibrate(25); } catch (e) { /* desteklenmiyor */ } } }

  // ── kanal (sohbet) ──
  function avatarEl(k) {
    var c = B.kanallar[k], a = el("div", "avatar");
    a.style.setProperty("--vurgu", c.renk);
    if (c.avatar) { var i = new Image(); i.src = c.avatar; i.alt = ""; a.appendChild(i); }
    else a.textContent = c.simge;
    return a;
  }
  function kanal(k) {
    if (!kanalEl[k]) {
      var d = el("div", "kanal");
      d.dataset.k = k; d.hidden = true;
      d.style.setProperty("--vurgu", B.kanallar[k].renk);
      akis.appendChild(d);
      kanalEl[k] = d;
    }
    return kanalEl[k];
  }
  function ustCiz(yaziyor) {
    var c = B.kanallar[aktif];
    $("#ust").style.setProperty("--vurgu", c.renk);
    $("#ustAvatar").replaceWith(Object.assign(avatarEl(aktif), { id: "ustAvatar" }));
    $("#ustAd").textContent = M(c.ad);
    var d = $("#ustDurum");
    d.textContent = yaziyor ? y("yaziyor") : M(D.durum[aktif] || c.durum);
    d.classList.toggle("yaziyor", !!yaziyor);
  }
  function kanalAc(k) {
    kanal(k);
    Object.keys(kanalEl).forEach(function (x) { kanalEl[x].hidden = x !== k; });
    aktif = k; D.kanal = k;
    ustCiz(false);
    dibe(true);
  }

  // ── akış öğeleri ──
  function fotoEl(f, kilitli) {
    var b = el("button", "foto" + (kilitli ? " kilitli" : ""));
    b.type = "button";
    var i = new Image(); i.alt = ""; i.onload = function () { dibe(); }; i.src = f;
    b.appendChild(i);
    if (kilitli) {
      var k = el("span", "kilit");
      k.appendChild(el("b", null, "🔒"));
      k.appendChild(el("span", null, y("kilitYazi")));
      b.appendChild(k);
    } else {
      b.onclick = function () { $("#buyuk img").src = f; $("#buyuk").hidden = false; };
    }
    return b;
  }
  function sarkiEl(s) {
    var S = B.sarkilar[s], e = el("div", "sarki");
    e.dataset.s = s;
    e.style.setProperty("--vurgu", B.kanallar[S.k].renk);
    var ust = el("div", "sarki-ust"), b = el("button", "cal"), yz = el("div");
    b.type = "button"; b.setAttribute("aria-label", y("cal") + ": " + S.ad); b.innerHTML = IKON_CAL;
    b.onclick = function () { cal(s, false); };
    yz.appendChild(el("div", "ad", S.ad));
    yz.appendChild(el("div", "kim", "♪ " + M(B.kanallar[S.k].ad)));
    ust.appendChild(b); ust.appendChild(yz); e.appendChild(ust);
    var c = el("div", "cubuk"); c.appendChild(el("i")); e.appendChild(c);
    return e;
  }
  function kartEl(o) {
    var e = el("div", "kart"), g = el("div", "govde"), ad = el("div", "ad", M(B.kanallar[o.k].ad));
    ad.appendChild(el("small", null, y("simdi")));
    g.appendChild(ad); g.appendChild(el("div", "metin", o.metin));
    e.appendChild(avatarEl(o.k)); e.appendChild(g);
    if (o.f) { var i = new Image(); i.className = "kucuk"; i.alt = ""; i.src = o.f; e.appendChild(i); }
    return e;
  }
  function ciz(o, canli) {
    var e;
    switch (o.tur) {
      case "gelen": e = el("div", "balon gelen", o.metin); break;
      case "giden": e = el("div", "balon giden", o.metin); break;
      case "anlati": e = el("div", "anlati", o.metin); break;
      case "gorev": e = el("div", "gorev-satir", o.metin); break;
      case "foto": e = fotoEl(o.f, false); break;
      case "kilitli": e = fotoEl(o.f, !o.acik); break;
      case "sarki": e = sarkiEl(o.s); break;
      case "kart": e = kartEl(o); break;
    }
    kanal(o.kanal).appendChild(e);
    if (o.kanal === aktif) dibe(!canli);
    return e;
  }
  function ekle(o) { o.kanal = aktif; D.kayit.push(o); return ciz(o, true); }

  async function yaziyorGoster(ms) {
    if (HIZLI) return;
    var b = el("div", "yaziyor-balon");
    b.innerHTML = "<i></i><i></i><i></i>";
    kanal(aktif).appendChild(b);
    ustCiz(true); dibe();
    await bekle(ms);
    b.remove(); ustCiz(false);
  }

  // ── şarkı ──
  var ses = new Audio(), calan = null;
  ses.preload = "auto";
  function cal(s, oto) {
    if (calan === s && !oto) {
      if (ses.paused) ses.play().catch(function () {}); else ses.pause();
      return;
    }
    calan = s;
    ses.src = B.sarkilar[s].dosya;
    var p = ses.play();
    if (p) p.catch(function () { sesSimge(); });        // tarayıcı otomatik çalmayı engellerse düğme çalışır
    olay("sarki_cal", { s: s, oto: !!oto });
  }
  function sesSimge() {
    document.querySelectorAll(".sarki").forEach(function (e) {
      var bu = e.dataset.s === calan;
      e.querySelector(".cal").innerHTML = bu && !ses.paused && !ses.ended ? IKON_DUR : IKON_CAL;
      if (!bu) e.querySelector(".cubuk i").style.width = "0";
    });
  }
  ["play", "pause", "ended"].forEach(function (o) { ses.addEventListener(o, sesSimge); });
  ses.addEventListener("ended", function () { if (D && calan) olay("sarki_bitti", { s: calan }); });
  ses.addEventListener("timeupdate", function () {
    if (!calan || !ses.duration) return;
    var oran = (ses.currentTime / ses.duration * 100).toFixed(1) + "%";
    document.querySelectorAll('.sarki[data-s="' + calan + '"] .cubuk i').forEach(function (i) { i.style.width = oran; });
  });
  function sesKilidiAc() {                                    // iOS: ilk dokunuşta ses öğesini bir kez çalıştır
    var ilk = Object.keys(B.sarkilar)[0];
    ses.muted = true; ses.src = B.sarkilar[ilk].dosya;
    var p = ses.play();
    var ac = function () { ses.pause(); ses.muted = false; };
    if (p) p.then(ac).catch(function () { ses.muted = false; }); else ac();
  }

  // ── alt alan ──
  function altBos() {
    alt.textContent = "";
    alt.appendChild(el("div", "bos", D && !D.bitti && !HIZLI ? y("ipucu") : ""));
  }
  function altSecenek(liste, soru) {
    return new Promise(function (coz) {
      alt.textContent = "";
      if (soru) alt.appendChild(el("p", "soru", soru));
      liste.forEach(function (o, j) {
        var b = el("button", "secenek" + (o.sinif ? " " + o.sinif : ""), o.metin);
        b.type = "button"; b.dataset.j = j;
        b.onclick = function () { altBos(); coz(o.deger); };
        alt.appendChild(b);
      });
      dibe();
    });
  }
  function bildirimGoster(k, metin) {
    return new Promise(function (coz) {
      var b = $("#bildirim"), g = el("span", "govde"), bitti = false;
      b.textContent = "";
      b.style.setProperty("--vurgu", B.kanallar[k].renk);
      g.appendChild(el("div", "ad", M(B.kanallar[k].ad)));
      g.appendChild(el("div", "metin", metin));
      b.appendChild(avatarEl(k)); b.appendChild(g); b.appendChild(el("span", "ac", y("ac")));
      b.hidden = false;
      titre();
      var t = setTimeout(kapat, HIZLI ? 0 : 6000);
      function kapat() { if (bitti) return; bitti = true; clearTimeout(t); b.hidden = true; coz(); }
      b.onclick = kapat;
    });
  }

  // ── görev listesi ──
  function gorevCiz(yeni) {
    var dugme = $("#gorevDugme"), panel = $("#gorevPanel");
    var tamam = B.gorevSirasi.filter(function (k) { return D.gorev[k]; }).length;
    dugme.textContent = "✓ " + tamam + "/" + B.gorevSirasi.length;
    dugme.setAttribute("aria-label", y("liste"));
    if (yeni) { dugme.classList.remove("yeni"); void dugme.offsetWidth; dugme.classList.add("yeni"); }
    panel.textContent = "";
    panel.appendChild(el("h2", null, y("liste")));
    var ul = el("ul");
    B.gorevSirasi.forEach(function (k) {
      var li = el("li", D.gorev[k] ? "tamam" : "");
      li.appendChild(el("span", "im", D.gorev[k] ? "✓" : "○"));
      var s = el("span", null, M(B.kanallar[k].ad) + " ");
      s.appendChild(el("span", "sarkiadi", D.gorev[k] ? "— " + B.sarkilar[D.gorev[k]].ad : "—"));
      li.appendChild(s); ul.appendChild(li);
    });
    panel.appendChild(ul);
  }
  $("#gorevDugme").onclick = function (e) {
    e.stopPropagation();
    var p = $("#gorevPanel"); p.hidden = !p.hidden;
    this.setAttribute("aria-expanded", String(!p.hidden));
  };
  document.addEventListener("click", function () { $("#gorevPanel").hidden = true; $("#gorevDugme").setAttribute("aria-expanded", "false"); });
  $("#buyuk").onclick = function () { this.hidden = true; };

  // ── adımlar ──
  async function kilitliAdim(a) {
    await bekle(380);
    await yaziyorGoster(1000);
    var gecici = fotoEl(a.f, true);
    kanal(aktif).appendChild(gecici); dibe();
    var ac = await altSecenek([
      { metin: y("kilitAc"), sinif: "vurgulu", deger: true },
      { metin: y("kilitGec"), sinif: "orta", deger: false }
    ], M(B.kanallar[a.k].ad) + " " + y("kilitSoru"));
    gecici.remove();
    D.bayrak.kilit = ac ? 1 : 0;
    olay("kilitli", { ac: ac });
    ekle({ tur: "kilitli", f: a.f, acik: ac });
    await bekle(ac ? 2200 : 600);
  }

  async function adim(a) {
    var t;
    if (a.k && a.k !== aktif && a.t !== "sohbet" && a.t !== "kart" && a.t !== "gorev" && a.t !== "durum") kanalAc(a.k);
    switch (a.t) {
      case "sohbet":
        if (aktif === a.k) break;
        if (a.bildirim) await bildirimGoster(a.k, M(a.bildirim)); else if (aktif) await bekle(700);
        kanalAc(a.k);
        await bekle(450);
        break;
      case "durum":
        D.durum[a.k] = a.m;
        if (aktif === a.k) ustCiz(false);
        await bekle(900);
        break;
      case "anlati":
        t = M(a.m);
        await bekle(500);
        ekle({ tur: "anlati", metin: t });
        await bekle(Math.min(4200, 900 + t.length * 38));
        break;
      case "gelen":
        t = M(a.m);
        await bekle(380);
        await yaziyorGoster(C.yazmaSuresi(t));
        ekle({ tur: "gelen", metin: t });
        await bekle(Math.min(2600, 350 + t.length * 24));
        break;
      case "giden":
        await bekle(500);
        ekle({ tur: "giden", metin: M(a.m) });
        await bekle(700);
        break;
      case "foto":
        await bekle(380);
        await yaziyorGoster(1100);
        ekle({ tur: "foto", f: a.f });
        await bekle(1900);
        break;
      case "kilitli": await kilitliAdim(a); break;
      case "sarki":
        await bekle(380);
        await yaziyorGoster(800);
        ekle({ tur: "sarki", s: a.s });
        cal(a.s, true);
        await bekle(2400);
        break;
      case "dur":
        await altSecenek([{ metin: y("devam"), sinif: "vurgulu", deger: 1 }]);
        break;
      case "gorev":
        var sk = a.s || D.bayrak[a.bayrak];
        D.gorev[a.k] = sk;
        await bekle(400);
        ekle({ tur: "gorev", metin: M(B.kanallar[a.k].ad) + " — " + B.sarkilar[sk].ad });
        gorevCiz(true);
        await bekle(1100);
        break;
      case "kart":
        await bekle(900);
        ekle({ tur: "kart", k: a.k, metin: M(a.m), f: a.f });
        titre();
        await bekle(1300);
        break;
    }
  }

  async function secimSor(a) {
    await bekle(300);
    var kisa = a.s.every(function (o) { return M(o.m).length < 12; });
    var j = await altSecenek(a.s.map(function (o, i) { return { metin: M(o.m), deger: i, sinif: kisa ? "orta" : "" }; }), a.soru ? M(a.soru) : null);
    var o = a.s[j];
    olay("secim", { d: D.dugum, j: j });
    if (!o.sessiz) ekle({ tur: "giden", metin: M(o.m) });
    Object.keys(o.p || {}).forEach(function (k) { D.puan[k] = (D.puan[k] || 0) + o.p[k]; });
    Object.keys(o.b || {}).forEach(function (k) { D.bayrak[k] = o.b[k]; });
    return o;
  }

  async function kos() {
    for (;;) {
      var a = DUGUM[D.dugum][D.i];
      if (!a) { console.error("düğüm bitti:", D.dugum, D.i); return; }
      if (!C.uyar(a.eger, D.bayrak)) { D.i++; continue; }
      if (a.t === "git") { D.dugum = a.d; D.i = 0; kaydet(); continue; }
      if (a.t === "son") {
        D.bitti = true;
        olay("bitti", { jaxen: D.bayrak.jaxen, ilk: D.bayrak.ilk, kilit: D.bayrak.kilit,
                        pm: D.puan.maria || 0, pj: D.puan.jaxen || 0, pk: D.puan.kael || 0 });
        kaydet(); sonEkran(); return;
      }
      if (a.t === "secim") { var o = await secimSor(a); D.dugum = o.git; D.i = 0; kaydet(); continue; }
      await adim(a);
      D.i++; kaydet();
    }
  }

  // ── bölüm sonu ──
  function sonEkran() {
    $("#oyun").hidden = true; $("#son").hidden = false;
    var ic = $("#sonIc");
    ic.textContent = "";
    ic.appendChild(el("p", "ustyazi", y("bitti")));
    ic.appendChild(el("h2", null, y("devamEdecek")));
    ic.appendChild(el("p", "sonraki", M(B.sonraki)));
    var ul = el("ul", "yakinlik");
    B.gorevSirasi.forEach(function (k) {
      var li = el("li"), n = Math.max(1, Math.min(5, Math.ceil((D.puan[k] || 0) / 2))), kalp = el("span", "kalp");
      li.style.setProperty("--vurgu", B.kanallar[k].renk);
      kalp.appendChild(document.createTextNode("♥".repeat(n)));
      if (n < 5) kalp.appendChild(el("s", null, "♥".repeat(5 - n)));
      kalp.setAttribute("aria-label", n + "/5");
      li.appendChild(avatarEl(k)); li.appendChild(el("span", "kimad", M(B.kanallar[k].ad))); li.appendChild(kalp);
      ul.appendChild(li);
    });
    ic.appendChild(ul);

    if (D.devam == null) {
      ic.appendChild(el("p", "soru", y("devamSoru")));
      [["evet", true, "ana"], ["hayir", false, "ikincil"]].forEach(function (x) {
        var b = el("button", x[2], y(x[0]));
        b.type = "button"; b.dataset.cevap = x[0];
        b.onclick = function () { D.devam = x[1]; olay("devam", { cevap: x[1] }); kaydet(); sonEkran(); };
        ic.appendChild(b);
      });
      return;
    }
    ic.appendChild(el("p", "tesekkur", y(D.devam ? "tesekkurEvet" : "tesekkurHayir")));
    var kutu = el("div", "calanlar");
    kutu.appendChild(el("h3", null, y("calanlar")));
    Object.keys(B.sarkilar).forEach(function (s) {
      var p = el("p", null, B.sarkilar[s].ad + " ");
      p.appendChild(el("span", null, "· " + M(B.kanallar[B.sarkilar[s].k].ad)));
      kutu.appendChild(p);
    });
    var a = el("a", null, y("tamami"));
    a.href = SITE; a.target = "_blank"; a.rel = "noopener";
    a.onclick = function () { olay("site"); kaydet(); };
    kutu.appendChild(a);
    ic.appendChild(kutu);
    var yb = el("button", "ikincil", y("yeniden"));
    yb.type = "button";
    yb.onclick = function () { try { localStorage.removeItem(ANAHTAR); } catch (e) { /* kayıt yoktu */ } location.reload(); };
    ic.appendChild(yb);
  }

  // ── açılış ──
  function acilisCiz() {
    document.documentElement.lang = dil;
    document.title = B.oyun[dil].charAt(0) + B.oyun[dil].slice(1).toLocaleLowerCase(dil) + " — Aura Sonic";
    $("#oyunAdi").textContent = B.oyun[dil];
    $("#altbaslik").textContent = B.altbaslik[dil];
    $("#bolumAdi").textContent = B.baslik[dil];
    $("#tanitim").textContent = B.tanitim[dil];
    $("#adEtiket").textContent = y("adEtiket");
    $("#ad").placeholder = B.varsayilanAd[dil];
    $("#sesNotu").textContent = y("sesNotu");
    $("#sayimNotu").textContent = OLCUM ? y("sayimNotu") : "";
    $("#sayimNotu").hidden = !OLCUM;
    document.querySelectorAll(".dil button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.dil === dil)); });
    var k = kayitli(), suren = k && !k.bitti;
    $("#basla").textContent = y(suren ? "bastan" : "basla");
    $("#basla").className = suren ? "ikincil" : "ana";
    var s = $("#surdur");
    s.hidden = !suren; s.textContent = y("surdur"); s.className = "ana";
    if (suren) $("#basla").before(s);
  }
  function oyunaGec() {
    $("#acilis").hidden = true; $("#oyun").hidden = false;
    gorevCiz(false); altBos();
    var gorulen = {};
    Object.keys(DUGUM).forEach(function (d) {
      DUGUM[d].forEach(function (a) { if (a.f && !gorulen[a.f]) { gorulen[a.f] = 1; new Image().src = a.f; } });
    });
  }
  function basla() {
    var ad = $("#ad").value.trim().replace(/\s+/g, " ") || B.varsayilanAd[dil];
    D = { v: 1, dil: dil, ad: ad, dugum: B.baslangic, i: 0, puan: {}, bayrak: {}, gorev: {}, durum: {}, kanal: null,
          kayit: [], olay: [], bas: Date.now(), kimlik: (HIZLI ? "T-" : "") + Math.random().toString(36).slice(2, 12), bitti: false, devam: null };
    olay("basla");
    kaydet(); sesKilidiAc(); oyunaGec(); kos();
  }
  function surdur() {
    D = kayitli(); dil = D.dil;
    sesKilidiAc(); oyunaGec();
    D.kayit.forEach(function (o) { ciz(o, false); });
    if (D.kanal) kanalAc(D.kanal);
    kos();
  }

  var yz = $("#yuzler");
  B.gorevSirasi.forEach(function (k) {
    var i = new Image(); i.src = B.kanallar[k].avatar; i.alt = B.kanallar[k].ad.en;
    i.style.setProperty("--c", B.kanallar[k].renk);
    yz.appendChild(i);
  });
  document.querySelectorAll(".dil button").forEach(function (b) { b.onclick = function () { dil = b.dataset.dil; acilisCiz(); }; });
  $("#basla").onclick = basla;
  $("#surdur").onclick = surdur;
  $("#ad").addEventListener("keydown", function (e) { if (e.key === "Enter") basla(); });
  acilisCiz();

  if (HIZLI) window.__oyun = { durum: function () { return D; } };
})();
