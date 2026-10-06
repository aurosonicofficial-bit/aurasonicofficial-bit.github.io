// Hikâye çekirdeği: DOM'a dokunmayan saf mantık. Tarayıcıda window.CEKIRDEK, testte require().
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
            return { m: o.m, p: o.p, b: o.b, sessiz: o.sessiz, git: hedef };
          })
        });
        isle(devam, kalan);
        return;
      }
    }
    Object.keys(ham).forEach(function (ad) { isle(ad, ham[ad]); });
    return cik;
  }

  // Koşullu adım: { eger: { bayrak: değer | [değerler] } } — oyuncunun önceki seçimi tutuyorsa oynanır.
  function uyar(eger, bayrak) {
    return !eger || Object.keys(eger).every(function (k) {
      var istenen = eger[k];
      return Array.isArray(istenen) ? istenen.indexOf(bayrak[k]) >= 0 : bayrak[k] === istenen;
    });
  }

  // Yazım süresi: mesaj uzadıkça "yazıyor…" uzar (ms).
  function yazmaSuresi(metin) {
    return Math.max(700, Math.min(2300, 420 + metin.length * 26));
  }

  // Bölüm verisini denetler; bulduğu her sorunu metin olarak döndürür (boş liste = temiz).
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

    Object.keys(B.kanallar).forEach(function (k) {
      var c = B.kanallar[k];
      metin(c.ad, "kanal " + k + " ad");
      if (c.avatar) dosya(c.avatar, "kanal " + k);
    });
    Object.keys(B.sarkilar).forEach(function (s) {
      dosya(B.sarkilar[s].dosya, "şarkı " + s);
      kanal(B.sarkilar[s].k, "şarkı " + s);
    });
    if (!D[B.baslangic]) sorun.push("başlangıç düğümü yok: " + B.baslangic);
    var bayraklar = {};
    Object.keys(D).forEach(function (ad) {
      D[ad].forEach(function (a) {
        if (a.t === "secim") a.s.forEach(function (o) { Object.keys(o.b || {}).forEach(function (k) { (bayraklar[k] = bayraklar[k] || {})[o.b[k]] = 1; }); });
      });
    });

    Object.keys(D).forEach(function (ad) {
      var liste = D[ad];
      if (!liste.length) { sorun.push(ad + ": boş düğüm (seçimden sonra adım yok)"); return; }
      var son = liste[liste.length - 1];
      if (["git", "son", "secim"].indexOf(son.t) < 0) sorun.push(ad + ": düğüm git/son/seçim ile bitmiyor");
      liste.forEach(function (a, i) {
        var yer = ad + "[" + i + "] " + a.t;
        Object.keys(a.eger || {}).forEach(function (k) {
          if (!bayraklar[k]) { sorun.push(yer + ": koşul tanımsız bayrağa bakıyor '" + k + "'"); return; }
          [].concat(a.eger[k]).forEach(function (d) { if (!bayraklar[k][d]) sorun.push(yer + ": '" + k + "' hiçbir seçimde '" + d + "' olmuyor"); });
        });
        if (a.eger && (a.t === "secim" || a.t === "git" || a.t === "son")) sorun.push(yer + ": bu adım türü koşullu olamaz");
        switch (a.t) {
          case "gelen": kanal(a.k, yer); metin(a.m, yer); break;
          case "giden": case "anlati": metin(a.m, yer); break;
          case "foto": case "kilitli": kanal(a.k, yer); dosya(a.f, yer); break;
          case "kart": kanal(a.k, yer); metin(a.m, yer); if (a.f) dosya(a.f, yer); break;
          case "sarki": if (!B.sarkilar[a.s]) sorun.push(yer + ": tanımsız şarkı " + a.s); break;
          case "gorev":
            kanal(a.k, yer);
            if (a.s && !B.sarkilar[a.s]) sorun.push(yer + ": tanımsız şarkı " + a.s);
            if (!a.s && !a.bayrak) sorun.push(yer + ": şarkı ya da bayrak gerek");
            break;
          case "sohbet": kanal(a.k, yer); if (a.bildirim) metin(a.bildirim, yer); break;
          case "durum": kanal(a.k, yer); metin(a.m, yer); break;
          case "dur": case "son": break;
          case "git": if (!D[a.d]) sorun.push(yer + ": hedef düğüm yok '" + a.d + "'"); break;
          case "secim":
            if (i !== liste.length - 1) sorun.push(yer + ": seçim düğümün sonunda değil");
            if (a.soru) metin(a.soru, yer + " soru");
            a.s.forEach(function (o, j) {
              metin(o.m, yer + " seçenek " + j);
              if (!D[o.git]) sorun.push(yer + " seçenek " + j + ": hedef düğüm yok '" + o.git + "'");
              Object.keys(o.p || {}).forEach(function (k) { kanal(k, yer + " puan"); });
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
    var oz = { mesaj: 0, foto: 0, sarki: 0, secim: 0, ms: 0, bitti: false, puan: {}, bayrak: {} };
    while (guvenlik++ < 5000) {
      var a = D[dugum][i];
      if (!a) throw new Error("düğüm sonu: " + dugum);
      if (!uyar(a.eger, oz.bayrak)) { i++; continue; }
      if (a.t === "son") { oz.bitti = true; return oz; }
      if (a.t === "git") { dugum = a.d; i = 0; continue; }
      if (a.t === "secim") {
        var o = a.s[sec(a)];
        oz.secim++; oz.ms += 4000;
        Object.keys(o.p || {}).forEach(function (k) { oz.puan[k] = (oz.puan[k] || 0) + o.p[k]; });
        Object.keys(o.b || {}).forEach(function (k) { oz.bayrak[k] = o.b[k]; });
        dugum = o.git; i = 0; continue;
      }
      if (a.t === "gelen") { oz.mesaj++; oz.ms += yazmaSuresi(a.m.en) + 450 + a.m.en.length * 45; }
      else if (a.t === "giden") { oz.ms += 900 + a.m.en.length * 40; }
      else if (a.t === "anlati") { oz.ms += 1200 + a.m.en.length * 50; }
      else if (a.t === "foto" || a.t === "kilitli") { oz.foto++; oz.ms += 4500; }
      else if (a.t === "kart") { oz.ms += 2500; }
      else if (a.t === "sarki") { oz.sarki++; oz.ms += 12000; }
      else if (a.t === "sohbet") { oz.ms += a.bildirim ? 2500 : 300; }
      i++;
    }
    throw new Error("sonsuz döngü");
  }

  var api = { derle: derle, denetle: denetle, oyna: oyna, yazmaSuresi: yazmaSuresi, uyar: uyar };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else kok.CEKIRDEK = api;
})(typeof window !== "undefined" ? window : this);
