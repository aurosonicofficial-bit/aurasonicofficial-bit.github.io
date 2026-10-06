// KULİS — oynanabilir sanatçı evreni: ortak ayarlar ve dünya listesi.
// Her sanatçı dünyası kendi dosyasında (dunya_<ad>.js) KULIS.dunyalar'a kaydolur. Yeni single = yeni bölüm dosyası.
(function (kok) {
  "use strict";
  var L = function (en, tr) { return { en: en, tr: tr }; };

  kok.KULIS = {
    L: L,
    oyun: L("BACKSTAGE", "KULİS"),
    altbaslik: L("Don't just listen to the artist. Enter their world.", "Sanatçıyı sadece dinleme. Dünyasına gir."),
    soru: L("Whose backstage do you want to enter tonight?", "Bu gece kimin kulisine girmek istiyorsun?"),
    varsayilanAd: L("Sam", "Deniz"),
    muzik: { dosya: "medya/fon.mp3", ses: 0.22, bildirim: "medya/bildirim.mp3" },
    // arkada tutulan üç boyut; oyuncuya sade "Kulis seviyesi" gösterilir
    statlar: { g: L("TRUST", "GÜVEN"), m: L("MUSIC MATCH", "MÜZİK UYUMU"), c: L("COURAGE", "CESARET") },
    sira: ["askin", "kael", "maria", "jaxen", "vael"],
    dunyalar: {},
    // sahneleri henüz kendi dünyasına taşınmamış sanatçılar: kartı görünür, girilemez
    yakinda: {
      vael: { ad: "Vael Cross", tur: L("Dark cinematic rock", "Karanlık sinematik rock"), kart: "medya/duvar_gece.jpg", renk: "#8f7bd6" }
    }
  };
})(typeof window !== "undefined" ? window : this);
