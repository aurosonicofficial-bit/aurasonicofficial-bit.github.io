// KULİS — AŞKIN ÖZTÜRK dünyası · Bölüm 1: "Geceye Yazdım Seni"
// ✅ Aşkın Öztürk kendi ağzından yazılan cümleleri 6 Eki 2026'da onayladı ("benim sözlere de ok").
//    Aynı gün bölüm 7–8 dakikaya uzatıldı; "6 Eki eki" yorumuyla işaretli cümleler onaydan SONRA eklendi, bir kez daha okumasında fayda var.
// Şarkılar gerçek kayıtların kesitleri (medya_askin.py). Şarkı sözü alıntısı ve şarkıların "nasıl yazıldığına" dair uydurma bilgi YOK.
// Puan: g = güven, m = müzik uyumu, c = cesaret. Son, toplam puana değil kararların bileşimine göre belirlenir (en alttaki `karar`).
(function (kok) {
  "use strict";
  var L = kok.KULIS.L;
  var anlati = function (en, tr) { return { t: "anlati", m: L(en, tr) }; };
  var de = function (en, tr) { return { t: "gelen", k: "askin", m: L(en, tr) }; };
  var foto = function (f) { return { t: "foto", k: "askin", f: "medya/" + f + ".jpg" }; };
  var sarki = function (s) { return { t: "sarki", s: s }; };
  var mekan = function (h, gosterme) { return { t: "mekan", k: "askin", h: h, gosterme: !!gosterme }; };
  var eger = function (kosul, adim) { adim.eger = kosul; return adim; };
  var secim = function (secenekler, soruEn, soruTr) { return { t: "secim", s: secenekler, soru: soruEn ? L(soruEn, soruTr) : null }; };
  var s = function (en, tr, ek) { var o = { m: L(en, tr) }; for (var k in (ek || {})) o[k] = ek[k]; return o; };

  // açılış şarkısı seçenekleri (iki yerde kullanılıyor)
  var acNumara = s("Kayıtlı Numara", "Kayıtlı Numara", { p: { m: 1 }, b: { acilis: "numara" }, sarki: "numara", sonra: [
    sarki("numara"),
    de("A song for people who learned to live without deleting. A good opener.", "Silmeden yaşamayı öğrenenlerin şarkısı. İyi açılış.")] });
  var acGorulme = s("Son Görülme", "Son Görülme", { p: { m: 1 }, b: { acilis: "gorulme" }, sarki: "gorulme", sonra: [
    sarki("gorulme"),
    de("A song for the ones who wait. The room goes quiet. Good.", "Bekleyenlerin şarkısı. Salon sessizleşir. İyi.")] });

  kok.KULIS.dunyalar.askin = {
    id: "askin",
    surum: 1,
    ad: L("Aşkın Öztürk", "Aşkın Öztürk"),
    tur: L("Emotional pop-rock · words & music", "Duygusal pop-rock · söz-müzik"),
    cumle: L("The studio, the night before the concert.", "Konserden önceki gece, stüdyo."),
    bolumAdi: L("Chapter 1 — I Wrote You Into the Night", "Bölüm 1 — Geceye Yazdım Seni"),
    renk: "#d2a94e",
    kart: "medya/askin_kart2.jpg",
    avatar: "medya/askin_av2.jpg",
    baslangic: "giris",
    baslangicElmas: 1,
    kilitBedeli: 1,
    kilitYan: "kare",

    gorevler: [
      { id: "sayfa", ad: L("Find the missing lyric page", "Kayıp söz sayfasını bul") },
      { id: "kapanis", ad: L("Decide tomorrow's closing song", "Yarının kapanış şarkısına karar ver") }
    ],
    yanGorevler: [
      { id: "ilkte", ad: L("Find the page on the first try", "Sayfayı ilk seferde bul") },
      { id: "kare", ad: L("Open the private studio shot", "Özel stüdyo karesini aç") },
      { id: "sohbet", ad: L("Ask him for a song in Talk Mode", "Sohbette ondan bir şarkı iste") }
    ],
    sonlar: [
      { id: "dusuk", ad: L("The door closes", "Kapı kapanır") },
      { id: "orta", ad: L("Your name at the backstage door", "Kuliste adın var") },
      { id: "yuksek", ad: L("The last song is yours", "Son şarkı senin") },
      { id: "gizli", ad: L("Secret Encore", "Gizli Encore"), gizli: true }
    ],

    odak: {
      "medya/askin_sahne.jpg": "50% 30%",
      "medya/askin_soyluyor.jpg": "50% 30%"
    },

    kanallar: {
      askin: { ad: L("Aşkın Öztürk", "Aşkın Öztürk"), avatar: "medya/askin_av2.jpg", renk: "#d2a94e", durum: L("in the studio", "stüdyoda"), ilkMekan: "studyo",
               havuz: { // 7 Eki 2026: Aşkın "gözlüksüz" kararı + ilk fotoğraf teslimi → havuz yeni karelerden (eski gözlüklü kareler çıkarıldı)
                        studyo: ["medya/kare_AS_002.jpg", "medya/kare_AS_006.jpg", "medya/kare_AS_007.jpg", "medya/kare_AS_009.jpg", "medya/kare_AS_008.jpg", "medya/kare_AS_019.jpg", "medya/kare_AS_025.jpg", "medya/kare_AS_026.jpg", "medya/kare_AS_028.jpg", "medya/kare_AS_030.jpg", "medya/kare_AS_032.jpg", "medya/kare_AS_033.jpg", "medya/kare_AS_035.jpg", "medya/kare_AS_044.jpg"],
                        sahne: ["medya/askin_sahne.jpg", "medya/askin_soyluyor.jpg"],
                        sokak: ["medya/askin_yagmur.jpg", "medya/askin_iskele.jpg", "medya/askin_gidiyor.jpg"] } }
    },

    // katalog: yalnız gerçek eserler; Talk Mode buradan başka şarkı öneremez
    sarkilar: {
      numara: { k: "askin", ad: "Kayıtlı Numara", dosya: "medya/askin_numara.mp3" },
      gorulme: { k: "askin", ad: "Son Görülme", dosya: "medya/askin_gorulme.mp3" },
      gece: { k: "askin", ad: "Geceye Yazdım Seni", dosya: "medya/askin_gece.mp3" },
      ragmen: { k: "askin", ad: "Bana Rağmen", dosya: "medya/askin_ragmen.mp3" },
      neon: { k: "askin", ad: "Neon Altında", dosya: "medya/askin_neon.mp3" },
      engel: { k: "askin", ad: "Engellendin — Son Mesaj", dosya: "medya/askin_engel.mp3" },
      cevrimici: { k: "askin", ad: "Çevrimiçi — Ama Bana Değil", dosya: "medya/askin_cevrimici.mp3" }
    },

    // ── TALK MODE: oyuncu serbest yazar; sistem niyeti tanır; cevap buradaki yazılı sesten ve katalogdan gelir ──
    // "sert / sakin" ayrımı medya/askin_enerji.json ölçümüne dayanıyor (zayıf ölçüm: yalnız Son Görülme ve Çevrimiçi belirgin yumuşak çıktı).
    konusma: {
      k: "askin",
      giris: L("Go on. Ask, or tell me what you want to hear.", "Hadi. Sor ya da ne dinlemek istediğini söyle."),
      yaz: L("Write to Aşkın…", "Aşkın'a yaz…"),
      cikis: L("Back to the backstage", "Kulise dön"),
      oneriler: [
        L("Play me something harder", "Bana daha sert bir şey aç"),
        L("Something quiet tonight", "Bu gece sakin bir şey"),
        L("What should I hear first?", "Önce hangisini dinleyeyim?")
      ],
      sira: ["veda", "sert", "sakin", "gece", "hikaye", "kimsin", "tesekkur", "oneri", "selam"],
      niyetler: {
        sert: { anahtar: ["sert", "hizli", "rock", "enerj", "hareketli", "hard", "heavy", "loud", "fast", "harder"],
                soz: [L("Then we don't start quietly.", "O zaman sakin başlamıyoruz.")], sarkilar: ["neon", "engel", "ragmen"] },
        sakin: { anahtar: ["sakin", "yavas", "huzun", "duygusal", "sessiz", "slow", "calm", "sad", "soft", "quiet"],
                 soz: [L("Then let's turn the lamp down.", "O zaman lambayı kısalım.")], sarkilar: ["gorulme", "cevrimici"] },
        gece: { anahtar: ["gece", "karanlik", "night", "dark"],
                soz: [L("The night has its own song in this room.", "Gecenin bu odada kendi şarkısı var.")], sarkilar: ["gece", "neon"] },
        hikaye: { anahtar: ["nasil yazd", "hikaye", "neden yazd", "ilham", "ne anlat", "how did you write", "story", "why did you", "inspir", "about"],
                  soz: [L("If I explain a song, I take it away from you. Listen first; then you tell me what it was about.",
                          "Bir şarkıyı anlatırsam onu senden almış olurum. Önce dinle; neyi anlattığını sen söyle.")], sarkilar: ["numara", "gorulme"] },
        kimsin: { anahtar: ["kimsin", "kendinden", "sen kim", "who are you", "yourself"],
                  soz: [L("Someone who writes the words and the music, then stands behind both.", "Sözünü de müziğini de yazan, sonra ikisinin de arkasında duran biri.")] },
        tesekkur: { anahtar: ["tesekkur", "sag ol", "thank"],
                    soz: [L("Thank the song, not me.", "Bana değil, şarkıya teşekkür et.")] },
        oneri: { anahtar: ["oner", "ne dinle", "hangisi", "cal", "dinlemek", "sarki", "play", "recommend", "suggest", "listen", "song", "which", "first"],
                 soz: [L("Three doors. Pick one.", "Üç kapı var. Birini seç.")], sarkilar: ["gece", "numara", "ragmen"] },
        selam: { anahtar: ["selam", "merhaba", "hello", "hey"],
                 soz: [L("Hello. The pen is down. I'm listening.", "Merhaba. Kalem masada. Dinliyorum.")] },
        veda: { anahtar: ["gorusuruz", "hosca", "kulise don", "geri don", "bye", "go back"],
                soz: [L("Alright. Back to work.", "Peki. İşe dönelim.")], cik: true },
        sarkiAdi: { soz: [L("You know what you want. Here.", "Ne istediğini biliyorsun. Al bakalım.")] },
        bilinmeyen: { soz: [
          L("I'd answer that with a song. Tell me the mood: harder, or quieter?", "Buna bir şarkıyla cevap veririm. Havayı söyle: daha sert mi, daha sakin mi?"),
          L("Words are my job and I still missed that one. Try me again, or ask for a song.", "İşim söz ama bunu yakalayamadım. Bir daha dene ya da bir şarkı iste.")] }
      }
    },

    dugumler: {

      // ───────────── kapı
      giris: [
        { t: "sahne",
          zaman: L("FRIDAY · 11:10 PM", "CUMA · 23:10"),
          baslik: L("The concert is tomorrow. Tonight the studio door is open to you.", "Yarın konser var. Bu gece stüdyonun kapısı sana açık."),
          kadro: [{ k: "askin", f: "medya/askin_kart2.jpg", m: L("Songwriter. The end of the set is still empty.", "Söz yazarı. Setin sonu hâlâ boş.") }],
          ozet: L("Your mission: find the missing lyric page and decide the closing song.", "Görevin: kayıp söz sayfasını bul ve kapanış şarkısına karar ver."),
          dugme: L("Enter the backstage", "Kulise gir") },
        { t: "sohbet", k: "askin" },
        anlati("The door is ajar. Inside: one lamp, and the glow of the mixing desk.", "Kapı aralık. İçeride tek bir lamba, bir de kayıt masasının ışıkları yanıyor."),
        { t: "hatirla", k: "askin", anahtar: "kapanis",
          m: L("Last time you closed the night with {onceki}. Let's see if you're the same person tonight.",
               "Geçen sefer geceyi {onceki} ile kapatmıştın. Bakalım bu gece aynı kişi misin.") },
        de("So you came, {ad}. Come in and pull the door; let the night stay inside.", "Geldin demek {ad}. Gir, kapıyı çek; gece içeride kalsın."),
        de("I'm on stage tomorrow and the end of the set is still empty.", "Yarın sahneye çıkıyorum ve setin sonu hâlâ boş."),
        secim([
          s("I came to fill that gap.", "O boşluğu doldurmaya geldim.", { p: { c: 1, g: 1 }, sonra: [
            de("Bold. I like that. Let's see if your ear is as sure as your mouth.", "İddialısın. Severim. Bakalım kulağın da dilin kadar emin mi.")] }),
          s("I only came to listen.", "Ben sadece dinlemeye geldim.", { p: { g: 2 }, sonra: [
            de("That's the hardest job in this room. Most people only wait for their turn to talk.", "Bu odadaki en zor iş o. Çoğu kişi dinlerken konuşma sırasını bekler.")] }),
          s("Show me around the studio first.", "Önce bana stüdyoyu gezdir.", { p: { m: 1 }, sonra: [
            de("Fine. But ask before you touch anything.", "Olur. Ama bir şeye dokunmadan önce sor.")] })
        ]),
        // ── 6 Eki eki: stüdyo turu ──
        { t: "dur" },                                           // (eski gözlüklü kare kalktı; satırlar kendi karesini gösteriyor)
        anlati("He walks you through the room. Every object in here has a job.", "Seni odada gezdiriyor. Buradaki her eşyanın bir işi var."),
        de("This desk hears everything first. Before the band, before the audience; if I'm honest, before me.",
           "Bu masa her şeyi ilk duyan yer. Gruptan önce, seyirciden önce; dürüst olayım, benden de önce."),
        de("The guitars on the wall aren't decoration. Each one knows a different kind of evening.", "Duvardaki gitarlar süs değil. Her biri başka türlü bir akşamı bilir."),
        de("And that chair is where songs get stuck. I've spent more nights in it than I'd admit.", "Şu sandalye de şarkıların takıldığı yer. İtiraf edeceğimden çok gece geçirdim üstünde."),
        secim([
          s("Which guitar knows tonight?", "Bu geceyi hangi gitar biliyor?", { p: { m: 1 }, sonra: [
            de("The dark one. It doesn't forgive a lazy hand.", "Koyu renkli olan. Tembel eli affetmez.")] }),
          s("Where does a stuck song go?", "Takılan şarkı nereye gider?", { p: { g: 1 }, sonra: [
            de("Into the drawer. Some come back years later with a better last line.", "Çekmeceye. Bazısı yıllar sonra daha iyi bir son satırla geri gelir.")] }),
          s("Can I sit in that chair?", "O sandalyeye oturabilir miyim?", { p: { c: 1 }, sonra: [
            de("Sit. If you get stuck too, at least there'll be two of us.", "Otur. Sen de takılırsan en azından iki kişi oluruz.")] })
        ]),
        anlati("Somewhere below, a door closes. The building is empty except for the two of you and the hum of the equipment.",
               "Aşağıda bir yerde bir kapı kapanıyor. Binada ikinizden ve cihazların uğultusundan başka kimse yok."),
        { t: "git", d: "acilis" }
      ],

      // ───────────── açılış şarkısı
      acilis: [
        { t: "dur" },
        // ── 6 Eki eki ──
        anlati("The studio smells of coffee and old cables. One lamp is on, over the desk.", "Stüdyo kahve ve eski kablo kokuyor. Tek lamba yanıyor; masanın üstünde."),
        de("Sit there. That's where the bass player sits when he pretends not to have opinions.", "Şuraya otur. Basçı, fikri yokmuş gibi yaparken orada oturur."),
        de("I've left the opener between two songs. Both came out of the same phone.", "Açılışı iki şarkı arasında bıraktım. İkisi de aynı telefonun içinden çıktı."),
        de("One is a number that never gets deleted. The other is a timestamp you keep checking.", "Biri bir türlü silinmeyen bir numara. Öbürü bakılıp durulan bir saat."),
        secim([
          acNumara,
          acGorulme,
          s("Tell me about both first.", "Önce bana ikisini de anlat.", { p: { g: 1 }, sonra: [
            de("If I explain them, we won't need the songs. Pick one, listen, and then you tell me.", "Anlatırsam şarkıya gerek kalmaz. Birini seç, dinle; sonra sen anlat."),
            secim([acNumara, acGorulme], "Which one opens the night?", "Geceyi hangisi açsın?")] })
        ], "Which one opens the night?", "Geceyi hangisi açsın?"),
        de("While that plays… a frame from last night's take. Nobody has seen it.", "O çalarken… dün geceki kayıttan bir kare. Kimse görmedi."),
        { t: "kilitli", k: "askin", f: "medya/askin_mikrofon2.jpg" },
        // ── 6 Eki eki: setin ortası ──
        de("Tomorrow's room holds three hundred. A small room is harder than a big one; you can see who looked away.",
           "Yarınki salon üç yüz kişilik. Küçük salon büyükten zordur; kimin gözünü kaçırdığını görürsün."),
        de("That's why the middle of the set matters. This is what I put there:", "O yüzden setin ortası önemli. Oraya bunu koydum:"),
        sarki("cevrimici"),
        de("How should it go tomorrow: just me and one guitar, or the full band?", "Yarın nasıl olsun: yalnız ben ve tek gitar mı, yoksa tam grup mu?"),
        secim([
          s("Just you and one guitar.", "Yalnız sen ve tek gitar.", { p: { m: 1, g: 1 }, b: { orta: "tek" }, sonra: [
            de("Then nobody can hide. Not them, not me.", "O zaman kimse saklanamaz. Ne onlar, ne ben.")] }),
          s("Full band. Let it hit.", "Tam grup. Vursun.", { p: { m: 1, c: 1 }, b: { orta: "grup" }, sonra: [
            de("Then the walls do half the work. I'll take it.", "O zaman işin yarısını duvarlar yapar. Kabul.")] }),
          s("Start alone. Let the band come in.", "Tek başla. Grup sonradan girsin.", { p: { m: 2 }, b: { orta: "ikisi" }, sonra: [
            de("…That's the arrangement. You just wrote the arrangement.", "…Düzenleme bu. Az önce düzenlemeyi yazdın.")] })
        ], "How should the middle of the set sound?", "Setin ortası nasıl olsun?"),
        de("I'm writing that on the setlist in pen. Don't make me regret the pen.", "Bunu setlist'e tükenmezle yazıyorum. Beni tükenmeze pişman etme."),
        { t: "git", d: "sayfa" }
      ],

      // ───────────── kayıp söz sayfası
      sayfa: [
        // ── 6 Eki eki ──
        anlati("The song fades. For a moment neither of you says anything.", "Şarkı sönüyor. Bir an ikiniz de konuşmuyorsunuz."),
        de("That quiet after a song is what I really write for. Not the applause. The second before it.",
           "Bir şarkıdan sonraki o sessizlik için yazarım aslında. Alkış için değil. Alkıştan önceki saniye için."),
        de("If the room goes silent tomorrow, don't panic. That's the sound of it working.", "Yarın salon susarsa telaşlanma. O, işe yaradığının sesidir."),
        de("One more problem. I wrote the last verse of the closing song on a sheet of paper. The paper is gone.",
           "Bir derdim daha var. Kapanış şarkısının son kıtasını bir kâğıda yazmıştım. Kâğıt yok."),
        de("It's somewhere in this room. Where would you look?", "Bu odada bir yerde. Sen olsan nereye bakardın?"),
        secim([
          s("The pocket of the guitar case.", "Gitar kılıfının cebine.", { p: { m: 1 }, b: { yer: "kilif" }, sonra: [
            anlati("In the pocket: a pick, a spare string, an old ticket. No paper.", "Cepte bir pena, yedek bir tel, eski bir bilet. Kâğıt yok."),
            de("That was logical. I'm not that tidy.", "Mantıklıydı. Ben o kadar düzenli değilim.")] }),
          s("Under the mixing desk.", "Kayıt masasının altına.", { p: { c: 1 }, b: { yer: "masa" }, sonra: [
            anlati("Under the desk: cables and dust. No paper.", "Masanın altında kablolar ve toz. Kâğıt yok."),
            de("I don't know when I last looked down there. Brave of you.", "Oraya en son ne zaman baktım, bilmiyorum. Cesursun.")] }),
          s("The inside pocket of your jacket.", "Ceketinin iç cebine.", { p: { g: 2 }, b: { yer: "ceket" }, y: "ilkte", sonra: [
            anlati("His hand goes to the inside pocket. Stops. Comes out with a folded sheet.", "Eli iç cebine gidiyor. Duruyor. Katlanmış bir kâğıtla çıkıyor."),
            de("…It was on me. It was on me all day.", "…Üstümdeymiş. Bütün gün üstümdeymiş.")] })
        ], "Where is the missing lyric page?", "Kayıp söz sayfası nerede?"),
        eger({ yer: ["kilif", "masa"] }, anlati("He lifts his jacket off the chair. A folded sheet slides out of the inside pocket.",
                                                "Ceketini sandalyeden alıyor. İç cebinden katlanmış bir kâğıt kayıp düşüyor.")),
        eger({ yer: ["kilif", "masa"] }, de("…It was on me the whole time. Don't tell anyone.", "…Baştan beri üstümdeymiş. Kimseye söyleme.")),
        { t: "gorev", id: "sayfa" },
        { t: "dur" },
        // ── 6 Eki eki ──
        anlati("He unfolds the sheet. Handwriting, crossed-out lines, a coffee ring in one corner.", "Kâğıdı açıyor. El yazısı, üstü çizilmiş satırlar, bir köşede kahve lekesi."),
        de("I cross out more than I keep. What stays on the page is what refused to leave.", "Tuttuğumdan fazlasını çizerim. Kâğıtta kalan, gitmeyi reddedendir."),
        de("This verse took three weeks. Two words changed on the last day and suddenly it was a different song.",
           "Bu kıta üç hafta sürdü. Son gün iki kelime değişti ve birden başka bir şarkı oldu."),
        de("The last verse is here. But I'm not sure about the last line.", "Son kıta burada. Ama son satırdan emin değilim."),
        de("I won't read it to you. I'll only ask this: should a song end on an open question, or on an answer?",
           "Sana okumayacağım. Yalnız şunu soracağım: bir şarkı açık bir soruyla mı bitmeli, cevapla mı?"),
        secim([
          s("On a question. Let the room answer it.", "Soruyla. Cevabı salon versin.", { p: { c: 1, m: 1 }, b: { bitis: "soru" }, sonra: [
            de("Risky. People go home carrying the question. …I like that.", "Riskli. Seyirci eve soruyla gider. …Bunu seviyorum.")] }),
          s("On an answer. People come here to close something.", "Cevapla. İnsanlar buraya bir şeyi kapatmaya geliyor.", { p: { g: 1, m: 1 }, b: { bitis: "cevap" }, sonra: [
            de("You may be right. Everybody has something to close.", "Haklı olabilirsin. Herkesin kapatacağı bir şey var.")] }),
          s("Leave it the way you wrote it.", "Sen nasıl yazdıysan öyle kalsın.", { p: { g: 1 }, b: { bitis: "kalsin" }, sonra: [
            de("A polite answer. I asked for the honest one, but fine.", "Kibar cevap. Ben dürüst olanı sormuştum ama olsun.")] })
        ]),
        { t: "git", d: "sohbet" }
      ],

      // ───────────── Talk Mode
      sohbet: [
        // ── 6 Eki eki ──
        de("You've been here an hour and you haven't asked for a photo or a signature. I noticed.", "Bir saattir buradasın; ne fotoğraf istedin ne imza. Fark ettim."),
        de("Most people come to see the singer. You came to see the work.", "Çoğu insan şarkıcıyı görmeye gelir. Sen işi görmeye geldin."),
        de("I'm putting the pen down. Five minutes are yours: ask what you want, tell me what you want to hear.",
           "Kalemi bırakıyorum. Beş dakika senin: ne sormak istersen sor, ne dinlemek istersen söyle."),
        { t: "konus", k: "askin" },
        // ── 6 Eki eki: konserden önceki on dakika ──
        anlati("He pours two glasses of tea without asking whether you want one.", "İsteyip istemediğini sormadan iki bardak çay koyuyor."),
        de("Tomorrow at this hour it will be over. The best and the worst thing about a concert is that it ends.",
           "Yarın bu saatte bitmiş olacak. Bir konserin en iyi yanı da en kötü yanı da bitmesidir."),
        de("Nobody sees the ten minutes before. I don't talk to anyone. I read the first line of the first song as if I'd never seen it.",
           "Öncesindeki on dakikayı kimse görmez. Kimseyle konuşmam. İlk şarkının ilk satırını hiç görmemişim gibi okurum."),
        de("Then somebody opens the door and says “ready”. I'm never ready. I go anyway.", "Sonra biri kapıyı açıp “hazır” der. Hiç hazır olmam. Yine de çıkarım."),
        secim([
          s("I'll keep that door closed for your ten minutes.", "O on dakika boyunca kapıyı ben kapalı tutarım.", { p: { g: 2 }, b: { onDk: "kapi" }, sonra: [
            de("That's the most useful thing anyone has offered me this year.", "Bu yıl bana teklif edilen en işe yarar şey bu.")] }),
          s("I'll stand where you can see me from the stage.", "Sahneden beni görebileceğin bir yerde dururum.", { p: { c: 1, g: 1 }, b: { onDk: "gorun" }, sonra: [
            de("Left side. The light is kinder there and I look that way when I forget a word.", "Sol taraf. Işık orada daha insaflı; bir kelimeyi unutunca o yöne bakarım.")] }),
          s("I'll read the room for you: who's listening, who's filming.", "Salonu senin yerine ben okurum: kim dinliyor, kim çekiyor.", { p: { m: 1, c: 1 }, b: { onDk: "salon" }, sonra: [
            de("Tell me only about the ones who are listening. The others can keep their phones.", "Bana yalnız dinleyenleri söyle. Ötekiler telefonlarıyla kalsın.")] })
        ], "What will you do for him tomorrow?", "Yarın onun için ne yapacaksın?"),
        anlati("The tea goes cold while you talk. Neither of you notices.", "Konuşurken çay soğuyor. İkiniz de fark etmiyorsunuz."),
        { t: "git", d: "kapanis" }
      ],

      // ───────────── kapanış şarkısı + son kararı
      kapanis: [
        // ── 6 Eki eki ──
        anlati("It's past midnight. The desk lights are the only thing in the building still awake.", "Gece yarısını geçti. Binada uyanık kalan yalnız masanın ışıkları."),
        de("People think the first song decides the night. It doesn't. They forget the first one. They take the last one home.",
           "İnsanlar geceyi ilk şarkının belirlediğini sanır. Belirlemez. İlkini unuturlar. Eve sonuncusunu götürürler."),
        de("So I never choose the last song lightly. Tonight I'm choosing it with you.", "O yüzden son şarkıyı asla hafife almam. Bu gece onu seninle seçiyorum."),
        de("Now the real decision. Which song closes tomorrow night?", "Şimdi asıl karar. Yarın gece son şarkı hangisi olsun?"),
        secim([
          s("Geceye Yazdım Seni", "Geceye Yazdım Seni", { p: { m: 2 }, b: { kapanis: "gece" }, sarki: "gece", sonra: [
            sarki("gece"),
            de("Closing the night with the night. The circle closes.", "Geceyi geceyle kapatmak. Daire tamamlanır."),
            { t: "gorev", id: "kapanis" }] }),
          s("Bana Rağmen", "Bana Rağmen", { p: { m: 1, c: 1 }, b: { kapanis: "ragmen" }, sarki: "ragmen", sonra: [
            sarki("ragmen"),
            de("A stubborn ending. The room finishes on its feet.", "İnatçı bir kapanış. Salon ayakta biter."),
            { t: "gorev", id: "kapanis" }] }),
          s("You choose. I'll be in the front row.", "Sen seç. Ben ön sırada olacağım.", { p: { g: 1 }, b: { kapanis: "sen" }, sonra: [
            de("Not choosing is a choice too. Noted.", "Seçmemek de bir seçimdir. Not ettim."),
            { t: "gorev", id: "kapanis", basarisiz: true }] })
        ], "Which song closes the night?", "Geceyi hangi şarkı kapatsın?"),
        { t: "karar",
          yollar: [
            { bayrak: { yer: "ceket", bitis: "soru", kapanis: "gece" }, enaz: { g: 3 }, git: "son_gizli" },
            { bayrak: { kapanis: ["gece", "ragmen"] }, enaz: { m: 6, g: 4 }, git: "son_yuksek" },
            { bayrak: { kapanis: ["gece", "ragmen"] }, git: "son_orta" }
          ],
          yoksa: "son_dusuk" }
      ],

      // ───────────── sonlar
      son_dusuk: [
        de("That's it for tonight. Pull the door on your way out.", "Bu gece buraya kadar. Çıkarken kapıyı çek."),
        mekan("sokak", true),
        foto("askin_gidiyor"),
        anlati("The door closes. The end of the set is still empty.", "Kapı kapanıyor. Setin sonu hâlâ boş."),
        anlati("On the street the rain has started. You realise you never asked him which song he would have picked.",
               "Sokakta yağmur başlamış. Ona hangi şarkıyı seçeceğini hiç sormadığını fark ediyorsun."),
        { t: "son", id: "dusuk" }
      ],
      son_orta: [
        de("Come to the concert tomorrow. Your name will be at the backstage door.", "Yarın konsere gel. Kulis kapısında adın yazacak."),
        mekan("sokak", true),
        foto("askin_yagmur"),
        de("Knock. I'll open.", "Kapıyı çal. Açarım."),
        anlati("He walks off into the rain with the setlist in his pocket. The last line has a title on it now.",
               "Setlist cebinde, yağmurun içine yürüyor. Son satırda artık bir şarkı adı yazıyor."),
        { t: "son", id: "orta" }
      ],
      son_yuksek: [
        mekan("sahne", true),
        foto("askin_sahne"),
        anlati("The next night. You're standing at the side of the stage.", "Ertesi gece. Sahnenin yanında duruyorsun."),
        de("The setlist is here. The last line is blank.", "Setlist burada. Son satırı boş."),
        de("You pick the last song.", "Son şarkıyı sen seç."),
        anlati("Three hundred people are waiting on the other side of the curtain. He hands you the pen.",
               "Perdenin öbür yanında üç yüz kişi bekliyor. Kalemi sana uzatıyor."),
        { t: "son", id: "yuksek" }
      ],
      son_gizli: [
        mekan("sahne", true),
        foto("askin_sahne"),
        anlati("The next night. The lights are down and the room is emptying.", "Ertesi gece. Işıklar söndü, salon dağılıyor."),
        de("Stay. This one isn't on the list.", "Kal. Bu, listede yok."),
        foto("askin_soyluyor"),
        sarki("neon"),
        de("You found the page, you asked for the question, you closed with the night. This one is for you.",
           "Sayfayı buldun, soruyu istedin, geceyi geceyle kapattın. Bu da senin için."),
        { t: "son", id: "gizli" }
      ]
    }
  };
})(typeof window !== "undefined" ? window : this);
