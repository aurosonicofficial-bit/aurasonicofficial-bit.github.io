// Kulis çekirdeği: DOM'a dokunmayan saf mantık. Tarayıcıda window.CEKIRDEK, testte require().
// Bir "dünya" = bir sanatçının bölümü: kanallar (konuşanlar), şarkılar, görevler, düğümler (sahne akışı).
(function (kok) {
  "use strict";

  // Yazarın düğümlerini düz listelere çevirir: her seçimin "sonra" adımları kendi düğümü olur,
  // seçimden sonraki adımlar "devam" düğümüne taşınır. Böylece oyunun yeri (düğüm, sıra) ile kaydedilebilir.
  function derle(ham) {
    var cik = {};
    function isle(ad, adimlar) {
      var liste = [];
      cik[ad] = liste;
      for (var i = 0; i < adimlar.length; i++) {
        var a = adimlar[i];
        if (a.t !== "secim") { liste.push(a); continue; }
        var devam = ad + "~" + i;
        var kalan = adimlar.slice(i + 1);
        liste.push({
          t: "secim", soru: a.soru,
          s: a.s.map(function (o, j) {
            var hedef = o.git || devam;
            if (o.sonra && o.sonra.length) {
              hedef = ad + "~" + i + "." + j;
              isle(hedef, o.sonra.concat([{ t: "git", d: o.git || devam }]));
            }
            return { m: o.m, p: o.p, b: o.b, y: o.y, sarki: o.sarki, sessiz: o.sessiz, git: hedef };
          })
        });
        isle(devam, kalan);
        return;
      }
    }
    Object.keys(ham).forEach(function (ad) { isle(ad, ham[ad]); });
    return cik;
  }

  // Koşullu adım: { eger: { bayrak: değer | [değerler] } } — oyuncunun önceki kararı tutuyorsa oynanır.
  function uyar(eger, bayrak) {
    return !eger || Object.keys(eger).every(function (k) {
      var istenen = eger[k];
      return Array.isArray(istenen) ? istenen.indexOf(bayrak[k]) >= 0 : bayrak[k] === istenen;
    });
  }

  function toplam(puan) { return Object.keys(puan).reduce(function (t, k) { return t + (puan[k] || 0); }, 0); }
  function seviye(puan) { return Math.max(1, Math.min(5, 1 + Math.floor(toplam(puan) / 3))); }

  // Son kararı: { t: "karar", yollar: [{ bayrak: {...}, enaz: { g: 3 }, toplam: 7, git: "…" }, …], yoksa: "…" }
  // İlk tutan yol kazanır. Böylece son yalnız toplam puana değil, verilen kararların bileşimine de bağlıdır.
  function kararHedefi(a, puan, bayrak) {
    for (var i = 0; i < a.yollar.length; i++) {
      var y = a.yollar[i];
      if (!uyar(y.bayrak, bayrak)) continue;
      if (y.enaz && !Object.keys(y.enaz).every(function (k) { return (puan[k] || 0) >= y.enaz[k]; })) continue;
      if (y.toplam && toplam(puan) < y.toplam) continue;
      return y.git;
    }
    return a.yoksa;
  }

  // Ölçüm adımı: { t: "olc", enaz: { g: 3 }, bayrak: { flort: "evet" }, yoksa: { flort: "hayir" } }
  // Puan eşiği tutuyorsa `bayrak`, tutmuyorsa `yoksa` yazılır. Örn. flört: sanatçı ancak güveni yeterliyse karşılık verir.
  // cümlenin kalıcı anahtarı: İngilizce metnin özeti (kare_plani.js ile aynı hesap; cümleye bağlı kareler bununla bulunur)
  function anahtar(s) {
    var h = 5381, i;
    for (i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return h.toString(36);
  }
  function olcSonucu(a, puan) {
    return Object.keys(a.enaz || {}).every(function (k) { return (puan[k] || 0) >= a.enaz[k]; }) ? a.bayrak : a.yoksa;
  }

  var SON_ADIMLAR = ["git", "son", "secim", "karar"];

  // Bir dünyayı denetler; bulduğu her sorunu metin olarak döndürür (boş liste = temiz).
  function denetle(B, dosyaVar) {
    var sorun = [];
    var D = derle(B.dugumler);
    var diller = ["en", "tr"];
    function metin(m, yer) {
      if (!m) { sorun.push(yer + ": metin yok"); return; }
      diller.forEach(function (d) {
        if (typeof m[d] !== "string" || !m[d].trim()) sorun.push(yer + ": " + d + " metni boş");
      });
    }
    function kanal(k, yer) { if (!B.kanallar[k]) sorun.push(yer + ": tanımsız kanal '" + k + "'"); }
    function dosya(f, yer) { if (dosyaVar && !dosyaVar(f)) sorun.push(yer + ": dosya yok " + f); }
    function dugum(d, yer) { if (!D[d]) sorun.push(yer + ": hedef düğüm yok '" + d + "'"); }
    function sarki(s, yer) { if (!B.sarkilar[s]) sorun.push(yer + ": katalogda olmayan şarkı '" + s + "'"); }
    function listede(liste, id, ne, yer) { if (!(liste || []).some(function (g) { return g.id === id; })) sorun.push(yer + ": tanımsız " + ne + " '" + id + "'"); }

    ["ad", "tur", "cumle", "bolumAdi"].forEach(function (x) { metin(B[x], "dünya " + x); });
    ["kart", "avatar"].forEach(function (x) { if (B[x]) dosya(B[x], "dünya " + x); });
    Object.keys(B.kanallar).forEach(function (k) {
      var c = B.kanallar[k];
      metin(c.ad, "kanal " + k + " ad");
      ["avatar", "arka", "bekleme"].forEach(function (a) { if (c[a]) dosya(c[a], "kanal " + k + " " + a); });
      Object.keys(c.havuz || {}).forEach(function (h) {
        if (!c.havuz[h].length) sorun.push("kanal " + k + " havuz " + h + " boş");
        c.havuz[h].forEach(function (f) { dosya(f, "kanal " + k + " havuz " + h); });
      });
      if (c.ilkMekan && !(c.havuz || {})[c.ilkMekan]) sorun.push("kanal " + k + ": ilkMekan havuzda yok");
    });
    Object.keys(B.sarkilar).forEach(function (s) { dosya(B.sarkilar[s].dosya, "şarkı " + s); });
    if (B.muzik) { dosya(B.muzik.dosya, "fon müziği"); if (B.muzik.bildirim) dosya(B.muzik.bildirim, "bildirim sesi"); }
    (B.gorevler || []).forEach(function (g) { metin(g.ad, "görev " + g.id); });
    (B.yanGorevler || []).forEach(function (g) { metin(g.ad, "yan görev " + g.id); });
    (B.sonlar || []).forEach(function (g) { metin(g.ad, "son " + g.id); });
    if (!D[B.baslangic]) sorun.push("başlangıç düğümü yok: " + B.baslangic);

    // Talk Mode: her cevap iki dilde; önerilen her şarkı katalogda; izin listesi katalogdan
    if (B.konusma) {
      Object.keys(B.konusma.niyetler).forEach(function (n) {
        var x = B.konusma.niyetler[n];
        (x.soz || []).forEach(function (m, i) { metin(m, "konuşma " + n + "[" + i + "]"); });
        (x.sarkilar || []).forEach(function (s) { sarki(s, "konuşma " + n + " önerisi"); });
        if (!(x.soz || []).length) sorun.push("konuşma " + n + ": söz yok");
      });
      (B.konusma.oneriler || []).forEach(function (m, i) { metin(m, "konuşma önerisi " + i); });
      ["bilinmeyen", "selam"].forEach(function (n) { if (!B.konusma.niyetler[n]) sorun.push("konuşma: '" + n + "' niyeti zorunlu"); });
    }

    var bayraklar = {};
    Object.keys(D).forEach(function (ad) {
      D[ad].forEach(function (a) {
        if (a.t === "secim") a.s.forEach(function (o) { Object.keys(o.b || {}).forEach(function (k) { (bayraklar[k] = bayraklar[k] || {})[o.b[k]] = 1; }); });
        if (a.t === "bayrak") Object.keys(a.b).forEach(function (k) { (bayraklar[k] = bayraklar[k] || {})[a.b[k]] = 1; });
        if (a.t === "olc") [a.bayrak, a.yoksa].forEach(function (b) { Object.keys(b || {}).forEach(function (k) { (bayraklar[k] = bayraklar[k] || {})[b[k]] = 1; }); });
      });
    });
    function kosul(eger, yer) {
      Object.keys(eger || {}).forEach(function (k) {
        if (!bayraklar[k]) { sorun.push(yer + ": koşul tanımsız karara bakıyor '" + k + "'"); return; }
        [].concat(eger[k]).forEach(function (d) { if (!bayraklar[k][d]) sorun.push(yer + ": '" + k + "' hiçbir seçimde '" + d + "' olmuyor"); });
      });
    }

    Object.keys(D).forEach(function (ad) {
      var liste = D[ad];
      if (!liste.length) { sorun.push(ad + ": boş düğüm (seçimden sonra adım yok)"); return; }
      if (SON_ADIMLAR.indexOf(liste[liste.length - 1].t) < 0) sorun.push(ad + ": düğüm git/karar/son/seçim ile bitmiyor");
      liste.forEach(function (a, i) {
        var yer = ad + "[" + i + "] " + a.t;
        kosul(a.eger, yer);
        if (SON_ADIMLAR.indexOf(a.t) >= 0) {
          if (a.eger) sorun.push(yer + ": bu adım türü koşullu olamaz");
          if (i !== liste.length - 1) sorun.push(yer + ": düğümün sonunda değil");
        }
        switch (a.t) {
          case "gelen": kanal(a.k, yer); metin(a.m, yer); break;
          case "giden": case "anlati": metin(a.m, yer); break;
          case "hatirla": kanal(a.k, yer); metin(a.m, yer); break;
          case "foto": case "kilitli": kanal(a.k, yer); dosya(a.f, yer); break;
          case "kart": kanal(a.k, yer); metin(a.m, yer); if (a.f) dosya(a.f, yer); break;
          case "sarki": sarki(a.s, yer); break;
          case "gorev": listede(B.gorevler, a.id, "görev", yer); break;
          case "yan": listede(B.yanGorevler, a.id, "yan görev", yer); break;
          case "sohbet": case "konus": kanal(a.k, yer); if (a.t === "konus" && !B.konusma) sorun.push(yer + ": dünyada konuşma tanımı yok"); break;
          case "durum": kanal(a.k, yer); metin(a.m, yer); break;
          case "mekan":
            kanal(a.k, yer);
            if (!((B.kanallar[a.k] || {}).havuz || {})[a.h]) sorun.push(yer + ": '" + a.k + "' için havuz yok '" + a.h + "'");
            break;
          case "sahne":
            ["zaman", "baslik", "ozet", "dugme"].forEach(function (x) { metin(a[x], yer + " " + x); });
            (a.kadro || []).forEach(function (r) { kanal(r.k, yer); dosya(r.f, yer); metin(r.m, yer + " kadro"); });
            break;
          case "dur": case "bayrak": case "ton": break;
          case "olc": if (!a.enaz || !a.bayrak || !a.yoksa) sorun.push(yer + ": enaz + bayrak + yoksa gerek"); break;
          case "son": listede(B.sonlar, a.id, "son", yer); break;
          case "git": dugum(a.d, yer); break;
          case "karar":
            a.yollar.forEach(function (y, j) { dugum(y.git, yer + " yol " + j); kosul(y.bayrak, yer + " yol " + j); });
            dugum(a.yoksa, yer + " yoksa");
            break;
          case "secim":
            if (a.soru) metin(a.soru, yer + " soru");
            a.s.forEach(function (o, j) {
              metin(o.m, yer + " seçenek " + j);
              dugum(o.git, yer + " seçenek " + j);
              if (o.y) listede(B.yanGorevler, o.y, "yan görev", yer + " seçenek " + j);
              if (o.sarki) sarki(o.sarki, yer + " seçenek " + j);
            });
            break;
          default: sorun.push(yer + ": bilinmeyen adım türü");
        }
      });
    });
    return sorun;
  }

  // Bölümü baştan sona oynar; `sec(secimAdimi)` her seçimde bir sıra numarası döndürür.
  function oyna(B, sec) {
    var D = derle(B.dugumler);
    var dugum = B.baslangic, i = 0, guvenlik = 0;
    var oz = { satir: 0, foto: 0, sarki: {}, secim: 0, ms: 0, bitti: false, son: null, puan: {}, bayrak: {}, gorev: {}, yan: {}, konus: 0 };
    while (guvenlik++ < 5000) {
      var a = D[dugum][i];
      if (!a) throw new Error("düğüm sonu: " + dugum);
      if (!uyar(a.eger, oz.bayrak)) { i++; continue; }
      if (a.t === "son") { oz.bitti = true; oz.son = a.id; return oz; }
      if (a.t === "git") { dugum = a.d; i = 0; continue; }
      if (a.t === "karar") { dugum = kararHedefi(a, oz.puan, oz.bayrak); i = 0; continue; }
      if (a.t === "secim") {
        var o = a.s[sec(a)];
        oz.secim++; oz.ms += 4000;
        Object.keys(o.p || {}).forEach(function (k) { oz.puan[k] = (oz.puan[k] || 0) + o.p[k]; });
        Object.keys(o.b || {}).forEach(function (k) { oz.bayrak[k] = o.b[k]; });
        if (o.y) oz.yan[o.y] = 1;
        if (o.sarki) oz.sarki[o.sarki] = 1;
        dugum = o.git; i = 0; continue;
      }
      if (a.t === "gelen" || a.t === "giden" || a.t === "anlati") { oz.satir++; oz.ms += 1500 + a.m.en.length * 55; }
      else if (a.t === "foto" || a.t === "kilitli") { oz.foto++; oz.ms += 2500; }
      else if (a.t === "kart") { oz.ms += 2500; }
      else if (a.t === "sarki") { oz.sarki[a.s] = 1; oz.ms += 20000; }      // 38 sn'lik kesitin yaklaşık yarısı dinlenir varsayımı
      else if (a.t === "sahne") { oz.ms += 7000; }
      else if (a.t === "konus") { oz.konus++; oz.ms += 40000; }
      else if (a.t === "gorev") { oz.gorev[a.id] = a.basarisiz ? "x" : 1; }
      else if (a.t === "yan") { oz.yan[a.id] = 1; }
      else if (a.t === "bayrak") { for (var bk in a.b) oz.bayrak[bk] = a.b[bk]; }
      else if (a.t === "olc") { var ob = olcSonucu(a, oz.puan); for (var ok in ob) oz.bayrak[ok] = ob[ok]; }
      i++;
    }
    throw new Error("sonsuz döngü");
  }

  // ── Talk Mode: oyuncunun yazdığından niyet çıkarır (yapay zekâ yok; yalnız tanımlı niyetler) ──
  function sade(s) {
    return String(s).toLocaleLowerCase("tr").replace(/[âä]/g, "a").replace(/[îï]/g, "i").replace(/[ûü]/g, "u").replace(/ö/g, "o")
      .replace(/ç/g, "c").replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  }
  // Döner: { niyet, sarki? } — önce adı geçen gerçek şarkı, sonra tanımlı anahtar sözcükler, yoksa "bilinmeyen".
  function niyetBul(B, yazi) {
    var s = " " + sade(yazi) + " ", en = null;
    Object.keys(B.sarkilar).forEach(function (id) {
      var ad = sade(B.sarkilar[id].ad.split("—")[0]);
      if (ad.length >= 4 && s.indexOf(" " + ad + " ") >= 0 && (!en || ad.length > en.uz)) en = { id: id, uz: ad.length };
    });
    if (en) return { niyet: "sarkiAdi", sarki: en.id };
    var sira = B.konusma.sira || Object.keys(B.konusma.niyetler);
    for (var i = 0; i < sira.length; i++) {
      var n = B.konusma.niyetler[sira[i]];
      if ((n.anahtar || []).some(function (a) { return s.indexOf(sade(a)) >= 0; })) return { niyet: sira[i] };
    }
    return { niyet: "bilinmeyen" };
  }

  var api = { derle: derle, denetle: denetle, oyna: oyna, uyar: uyar, kararHedefi: kararHedefi, olcSonucu: olcSonucu, toplam: toplam, seviye: seviye, niyetBul: niyetBul, sade: sade, anahtar: anahtar };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else kok.CEKIRDEK = api;
})(typeof window !== "undefined" ? window : this);
