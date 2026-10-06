// KULİS — MARIA MEL dünyası · Bölüm 1: "I Won't Cry Anymore"
// Sahneler eski "üç sanatçı, tek gece" bölümünden taşındı (arsiv/). Oyuncu: şirketin yeni koordinatörü.
// Flört: oyuncu DENEYEBİLİR; Maria ancak güveni yeterliyse karşılık verir (`olc` adımı → flort: evet/hayir).
// Puan: g = güven, m = müzik uyumu, c = cesaret. "sert/sakin" şarkı ayrımı medya/dunyalar_enerji.json ölçümüne dayanır (zayıf ölçüm).
(function (kok) {
  "use strict";
  var L = kok.KULIS.L, K = "maria";
  var anlati = function (en, tr) { return { t: "anlati", m: L(en, tr) }; };
  var de = function (en, tr) { return { t: "gelen", k: K, m: L(en, tr) }; };
  var foto = function (f) { return { t: "foto", k: K, f: "medya/" + f + ".jpg" }; };
  var sarki = function (s) { return { t: "sarki", s: s }; };
  var mekan = function (h, gosterme) { return { t: "mekan", k: K, h: h, gosterme: !!gosterme }; };
  var eger = function (kosul, adim) { adim.eger = kosul; return adim; };
  var secim = function (secenekler, soruEn, soruTr) { return { t: "secim", s: secenekler, soru: soruEn ? L(soruEn, soruTr) : null }; };
  var s = function (en, tr, ek) { var o = { m: L(en, tr) }; for (var k in (ek || {})) o[k] = ek[k]; return o; };

  kok.KULIS.dunyalar.maria = {
    id: "maria",
    surum: 1,
    ad: L("Maria Mel", "Maria Mel"),
    tur: L("Emotional soul-pop", "Duygusal soul-pop"),
    cumle: L("A dress, a press dinner, and a song aimed at row two.", "Bir elbise, bir basın yemeği ve ikinci sıraya söylenecek bir şarkı."),
    bolumAdi: L("Chapter 1 — I Won't Cry Anymore", "Bölüm 1 — I Won't Cry Anymore"),
    renk: "#35b783",
    kart: "medya/maria_siyah_yakin.jpg",
    avatar: "medya/maria_av.jpg",
    baslangic: "giris",
    baslangicElmas: 1,
    kilitBedeli: 2,
    kilitYan: "kare",

    gorevler: [
      { id: "elbise", ad: L("Choose her stage dress", "Sahne elbisesini seç") },
      { id: "sarki", ad: L("Lock her song for tomorrow's showcase", "Yarınki konser için şarkısını kesinleştir") }
    ],
    yanGorevler: [
      { id: "sir", ad: L("Ask about the man in row two", "İkinci sıradaki adamı sor") },
      { id: "kare", ad: L("Open the photo from the car", "Arabadan gelen fotoğrafı aç") },
      { id: "sohbet", ad: L("Ask her for a song in Talk Mode", "Sohbette ondan bir şarkı iste") }
    ],
    sonlar: [
      { id: "dusuk", ad: L("We'll talk later", "Sonra konuşuruz") },
      { id: "orta", ad: L("Report back", "Rapor bekliyorum") },
      { id: "yuksek", ad: L("A seat at her table", "Masasında bir yer") },
      { id: "gizli", ad: L("Secret Encore — after midnight", "Gizli Encore — gece yarısından sonra"), gizli: true }
    ],
    odak: {
      "medya/maria_siyah_yakin.jpg": "62% 30%",
      "medya/maria_bakis.jpg": "40% 30%"
    },

    kanallar: {
      maria: { ad: L("Maria Mel", "Maria Mel"), avatar: "medya/maria_av.jpg", renk: "#35b783", durum: L("online", "çevrimiçi"), ilkMekan: "ev",
               havuz: { ev: ["medya/maria_ev2.jpg", "medya/maria_ayna.jpg", "medya/maria_kupe.jpg", "medya/maria_ev3.jpg"],
                        siyah: ["medya/maria_sehir.jpg", "medya/maria_balkon.jpg", "medya/maria_profil.jpg", "medya/maria_siyah.jpg", "medya/maria_siyah2.jpg", "medya/maria_profil2.jpg"],
                        araba: ["medya/maria_araba2.jpg", "medya/maria_araba.jpg", "medya/maria_araba3.jpg"],
                        masa: ["medya/maria_masa.jpg", "medya/maria_masa2.jpg"] } }
    },

    sarkilar: {
      cry: { k: K, ad: "I Won't Cry Anymore", dosya: "medya/cry.mp3" },
      maria_queen: { k: K, ad: "Queen of the Ashes", dosya: "medya/maria_queen.mp3" },
      maria_midnight: { k: K, ad: "After Midnight", dosya: "medya/maria_midnight.mp3" },
      maria_burn: { k: K, ad: "Burn and Go", dosya: "medya/maria_burn.mp3" }
    },

    konusma: {
      k: K,
      giris: L("Traffic. I'm all yours for five minutes. Ask me anything, or tell me what you want to hear.",
               "Trafik. Beş dakika tamamen seninim. İstediğini sor ya da ne dinlemek istediğini söyle."),
      yaz: L("Write to Maria…", "Maria'ya yaz…"),
      cikis: L("Back to the evening", "Akşama dön"),
      oneriler: [
        L("Play me something with fire", "Bana ateşli bir şey aç"),
        L("Something soft for the ride", "Yol için yumuşak bir şey"),
        L("Which song should I hear first?", "Önce hangisini dinleyeyim?")
      ],
      sira: ["veda", "sert", "sakin", "gece", "hikaye", "kimsin", "tesekkur", "oneri", "selam"],
      niyetler: {
        sert: { anahtar: ["sert", "hizli", "atesli", "enerj", "hareketli", "guclu", "hard", "fire", "loud", "fast", "strong"],
                soz: [L("Oh, you want the ones with teeth. Good.", "Ooo, dişli olanları istiyorsun. Güzel.")], sarkilar: ["maria_queen", "maria_burn"] },
        sakin: { anahtar: ["sakin", "yavas", "huzun", "duygusal", "yumusak", "slow", "calm", "sad", "soft", "quiet"],
                 soz: [L("Soft. Fine. But don't mistake soft for harmless.", "Yumuşak. Olur. Ama yumuşağı zararsız sanma.")], sarkilar: ["maria_midnight", "cry"] },
        gece: { anahtar: ["gece", "karanlik", "night", "dark", "midnight"],
                soz: [L("There's one I only like after dark.", "Yalnız hava kararınca sevdiğim bir tane var.")], sarkilar: ["maria_midnight"] },
        hikaye: { anahtar: ["nasil yazd", "hikaye", "neden yazd", "kim icin", "ne anlat", "how did you write", "story", "why did you", "who is it", "about"],
                  soz: [L("Not before the second glass of wine. Listen instead; you'll guess most of it.", "İkinci kadehten önce olmaz. Onun yerine dinle; çoğunu tahmin edersin.")], sarkilar: ["cry", "maria_queen"] },
        kimsin: { anahtar: ["kimsin", "kendinden", "sen kim", "who are you", "yourself"],
                  soz: [L("The one who actually replies to your messages. Remember me kindly.", "Mesajlarına gerçekten cevap veren kişi. Beni iyi hatırla.")] },
        tesekkur: { anahtar: ["tesekkur", "sag ol", "thank"], soz: [L("Keep that manner. It suits you.", "Bu nezaketi koru. Sana yakışıyor.")] },
        oneri: { anahtar: ["oner", "ne dinle", "hangisi", "cal", "dinlemek", "sarki", "play", "recommend", "suggest", "listen", "song", "which", "first"],
                 soz: [L("Three moods. Pick the one you're in.", "Üç ruh hâli. Hangisindeysen onu seç.")], sarkilar: ["cry", "maria_queen", "maria_midnight"] },
        selam: { anahtar: ["selam", "merhaba", "hello", "hey"], soz: [L("Hello again, darling. Yes, still in traffic.", "Yine merhaba canım. Evet, hâlâ trafikteyim.")] },
        veda: { anahtar: ["gorusuruz", "hosca", "aksama don", "geri don", "bye", "go back"], soz: [L("Go. Report back.", "Git. Sonra rapor ver.")], cik: true },
        sarkiAdi: { soz: [L("Someone did their homework.", "Biri ödevini yapmış.")] },
        bilinmeyen: { soz: [
          L("Darling, I didn't catch that over the rain. Tell me a mood: fire, or soft?", "Canım, yağmurdan duyamadım. Bana bir hava söyle: ateşli mi, yumuşak mı?"),
          L("Try again. Or just ask me for a song.", "Bir daha dene. Ya da benden bir şarkı iste.")] }
      }
    },

    dugumler: {

      giris: [
        { t: "sahne",
          zaman: L("MONDAY · 6:50 PM", "PAZARTESİ · 18:50"),
          baslik: L("She's getting ready for the press dinner. Tomorrow she sings in front of the man the song is about.",
                    "Basın yemeğine hazırlanıyor. Yarın o şarkıyı, şarkıyı yazdıran adamın önünde söyleyecek."),
          kadro: [{ k: K, f: "medya/maria_siyah_yakin.jpg", m: L("Answers. Always.", "Cevap verir. Her zaman.") }],
          ozet: L("Your mission: choose her stage dress and lock her song for tomorrow.", "Görevin: sahne elbisesini seç ve yarınki şarkısını kesinleştir."),
          dugme: L("Open the chat", "Sohbeti aç") },
        { t: "sohbet", k: K },
        anlati("Your first week at the label. The note on your desk says: “Maria Mel — one title by midnight. She's the easy one. Enjoy it while it lasts.”",
               "Şirketteki ilk haftan. Masandaki notta şu yazıyor: “Maria Mel — gece yarısına kadar bir şarkı adı. Kolay olan o. Tadını çıkar.”"),
        { t: "hatirla", k: K, anahtar: "kapanis",
          m: L("You again! Last time you made me sing {onceki}. Let's see what you do tonight.", "Yine sen! Geçen sefer bana {onceki} söyletmiştin. Bakalım bu gece ne yapacaksın.") },
        de("So YOU'RE the new coordinator. I'm Maria. I'm the one who will actually reply to your messages, so remember me kindly.",
           "Demek yeni koordinatör SENSİN. Ben Maria. Mesajlarına gerçekten cevap verecek tek kişi benim, o yüzden beni iyi hatırla."),
        de("Let me guess: they gave you The List. One song from me by midnight?", "Dur tahmin edeyim: sana Liste'yi verdiler. Gece yarısına kadar benden bir şarkı?"),
        secim([
          s("Is it that obvious?", "O kadar belli mi?", { p: { g: 1 }, sonra: [
            de("Darling, everyone gets The List in their first week. It's a hazing ritual with paperwork.", "Canım, ilk hafta herkese Liste verilir. Evrak işiyle yapılan bir çaylak şakası.")] }),
          s("I'm not supposed to discuss internal tasks.", "Şirket içi görevleri konuşmamam gerekiyor.", { p: { c: 1 }, sonra: [
            de("Oh, a professional. We'll fix that.", "Ooo, kuralcıymışız. Onu hallederiz.")] }),
          s("Yes. And I'd rather hear the song than just its name.", "Evet. Ama adını değil, şarkının kendisini duymak isterim.", { p: { m: 2 }, sonra: [
            de("Finally. Someone who came for the music.", "Nihayet. Müzik için gelen biri.")] })
        ]),
        de("Rule one of this label: Jaxen is late, Kael is silent, and I am on time and overdressed.", "Bu şirketin birinci kuralı: Jaxen geç kalır, Kael susar, ben de vaktinde gelir ve fazla şık olurum."),
        de("Rule two: whoever holds The List gets blamed for all three of us. Congratulations.", "İkinci kural: Liste kimdeyse üçümüzün suçu da ondadır. Tebrikler."),
        de("I'm getting ready for the press dinner. Tell me the truth.", "Basın yemeğine hazırlanıyorum. Bana doğruyu söyle."),
        foto("maria_ayna"),
        de("Too much for a Monday?", "Pazartesi akşamı için fazla mı?"),
        secim([
          // flört denemesi: karşılık ancak Maria kabul ederse (ilk cevapta güven kazanıldıysa)
          s("There's no such thing as too much on you.", "Sende 'fazla' diye bir şey olmaz.", { p: { c: 1 }, sonra: [
            { t: "olc", enaz: { g: 1 }, bayrak: { flort: "evet" }, yoksa: { flort: "hayir" } },
            eger({ flort: "evet" }, de("Careful. I keep the people who talk like that.", "Dikkat et. Böyle konuşanları yanımda tutarım.")),
            eger({ flort: "hayir" }, de("Smooth. But you met me four minutes ago, darling. Earn it.", "Tatlı dil. Ama beni dört dakika önce tanıdın canım. Önce hak et."))] }),
          s("It's right for a room full of press.", "Basın dolu bir salon için tam yerinde.", { p: { g: 1 }, sonra: [
            de("A straight answer. I can work with that.", "Düz bir cevap. Bununla çalışabilirim.")] }),
          s("Honestly? The earrings are doing all the talking.", "Açık konuşayım mı? Bütün işi küpeler yapıyor.", { p: { g: 1, m: 1 }, sonra: [
            de("FINALLY someone notices the earrings. You can stay.", "NİHAYET küpeleri fark eden biri. Kalabilirsin.")] })
        ]),
        { t: "git", d: "elbise" }
      ],

      elbise: [
        de("While I do my eyes, tell me something. Your first week: who scared you more, the boss or the coffee machine?",
           "Ben gözlerimi yaparken bir şey söyle. İlk haftan: seni kim daha çok korkuttu, patron mu kahve makinesi mi?"),
        secim([
          s("The boss.", "Patron.", { p: { g: 1 }, sonra: [
            de("Correct. The coffee machine only burns you once.", "Doğru cevap. Kahve makinesi insanı yalnız bir kere yakar.")] }),
          s("The coffee machine.", "Kahve makinesi.", { p: { c: 1 }, sonra: [
            de("Brave to admit. It hisses at me too.", "Bunu itiraf etmek cesaret ister. Bana da tıslıyor.")] }),
          s("You, a little.", "Biraz da sen.", { p: { c: 1, g: 1 }, sonra: [
            de("Good. A little is exactly the right amount.", "Güzel. Biraz, tam olması gereken miktar.")] })
        ]),
        de("That's for dinner. The stage is another question.", "Bu yemek için. Sahne başka mesele."),
        foto("maria_siyah"),
        de("The black one, from the album shoot. Green or black tomorrow? You have ten seconds.", "Siyah olan, albüm çekiminden. Yarın yeşil mi siyah mı? On saniyen var."),
        secim([
          s("Black. The front rows won't recover.", "Siyah. Ön sıralar toparlanamaz.", { p: { c: 1 }, b: { elbise: "siyah" }, sonra: [
            mekan("siyah", true),
            foto("maria_siyah_yakin"),
            de("Then this is the face they get.", "O zaman karşılarında bu yüzü görecekler.")] }),
          s("Green. You look like yourself in it.", "Yeşil. Onun içinde kendin gibisin.", { p: { g: 2 }, b: { elbise: "yesil" }, sonra: [
            foto("maria_kupe"),
            de("…Nobody has said that to me in a while. Green it is.", "…Bunu bana epeydir kimse söylememişti. Yeşil olsun.")] })
        ], "Which dress for the stage?", "Sahnede hangi elbise?"),
        { t: "gorev", id: "elbise" },
        de("Good. One decision down. My stylist will cry, but she cries at everything.", "Güzel. Bir karar tamam. Stilistim ağlayacak ama o her şeye ağlar."),
        anlati("A minute passes. Then three messages arrive at once.", "Bir dakika geçiyor. Sonra üç mesaj birden geliyor."),
        de("Shoes: done. Hair: done. Nerves: we do not discuss my nerves.", "Ayakkabı: tamam. Saç: tamam. Sinirler: sinirlerimi konuşmuyoruz."),
        { t: "git", d: "sarki" }
      ],

      sarki: [
        anlati("She disappears for five minutes. When she comes back, the tone is different.", "Beş dakika ortadan kayboluyor. Geri geldiğinde sesi başka."),
        de("Sorry. I had to practise smiling at a man I'd like to push into a fountain.", "Kusura bakma. Havuza itmek istediğim bir adama gülümsemeyi çalışmam gerekiyordu."),
        de("It's a skill. They should teach it at the conservatory.", "Bu bir beceri. Konservatuvarda öğretmeleri lazım."),
        de("Now, business. This is the one they expect from me:", "Şimdi işimize bakalım. Benden bekledikleri şarkı bu:"),
        sarki("cry"),
        de("I didn't write that one. I survived it. Two years ago I couldn't get through the second verse without my voice breaking.",
           "O şarkıyı yazmadım. O şarkıyı atlattım. İki yıl önce ikinci kıtaya gelince sesim titrer, bitiremezdim."),
        de("Tomorrow the man it's about will be in row two. He doesn't know that I know.", "Yarın o şarkıyı yazdıran adam ikinci sırada oturacak. Bildiğimi bilmiyor."),
        secim([
          s("Then sing it straight at row two.", "O zaman gözünü ikinci sıradan ayırmadan söyle.", { p: { c: 2 }, b: { sira2: "soyle" }, sonra: [
            de("…Oh, I like you. That's exactly what I'm going to do.", "…Seni sevdim. Aynen öyle yapacağım."),
            foto("maria_bakis"),
            de("With this look. I've had it ready since the album shoot.", "Şu bakışla. Albüm çekiminden beri hazır.")] }),
          s("Are you sure you want that on a night like tomorrow?", "Yarın gibi bir gecede bunu istediğine emin misin?", { p: { g: 1 }, b: { sira2: "emin" }, sonra: [
            de("No. That's exactly why it has to be tomorrow.", "Değilim. Tam da bu yüzden yarın olmak zorunda.")] }),
          s("Who is he?", "Kim o?", { p: { g: 1 }, b: { sira2: "kim" }, y: "sir", sonra: [
            de("Ask me after the second glass of wine. Not before.", "İkinci kadehten sonra sor. Önce olmaz.")] })
        ]),
        de("Do you know the worst part of a breakup song? You have to rehearse it.", "Ayrılık şarkısının en kötü yanı ne, biliyor musun? Prova etmek zorundasın."),
        de("Forty times in a cold room, until it stops being about him and starts being about breath control.", "Soğuk bir odada kırk kere; ondan çıkıp nefes kontrolüne dönüşene kadar."),
        de("That's the trick nobody tells you. You don't get over it. You get good at it.", "Kimsenin söylemediği numara bu. Atlatmazsın. Onda ustalaşırsın."),
        de("Or I burn the plan and open with this instead:", "Ya da planı yakar, onun yerine bununla açarım:"),
        sarki("maria_queen"),
        de("You're the coordinator. Which one goes on your list?", "Koordinatör sensin. Listene hangisi yazılsın?"),
        secim([
          s("I Won't Cry Anymore", "I Won't Cry Anymore", { p: { m: 2 }, b: { kapanis: "cry" }, sarki: "cry", sonra: [
            de("The one I survived. Write it down.", "Atlattığım şarkı. Yaz."), { t: "gorev", id: "sarki" }] }),
          s("Queen of the Ashes", "Queen of the Ashes", { p: { m: 1, c: 1 }, b: { kapanis: "maria_queen" }, sarki: "maria_queen", sonra: [
            de("Fire first. You're braver than you look. Write it down.", "Önce ateş. Göründüğünden cesursun. Yaz."), { t: "gorev", id: "sarki" }] }),
          s("I can't choose that for you.", "Bunu senin yerine seçemem.", { p: { g: 1 }, b: { kapanis: "yok" }, sonra: [
            de("Then your list stays empty tonight, darling. I don't choose under pressure.", "O zaman listen bu gece boş kalıyor canım. Ben baskı altında seçmem."), { t: "gorev", id: "sarki", basarisiz: true }] })
        ], "Which song goes on the list?", "Listeye hangi şarkı yazılsın?"),
        de("Since we're being honest tonight: I almost quit after the first album.", "Madem bu gece dürüstüz: ilk albümden sonra bırakmanın eşiğine geldim."),
        de("Not because of him. Because I was tired of singing sad songs beautifully.", "Onun yüzünden değil. Hüzünlü şarkıları güzel söylemekten yorulmuştum."),
        de("Then somebody in the front row cried at exactly the right line, and I thought: fine. One more year.",
           "Sonra ön sırada biri tam doğru satırda ağladı ve dedim ki: peki. Bir yıl daha."),
        de("That was four years ago. Don't tell the label I'm on a rolling contract with my own feelings.", "Bu dört yıl önceydi. Şirkete duygularımla yıllık sözleşme yaptığımı söyleme."),
        { t: "giden", m: L("Your secret is safe.", "Sırrın bende.") },
        { t: "git", d: "araba" }
      ],

      araba: [
        de("My car's here. Don't go anywhere.", "Arabam geldi. Bir yere kaybolma."),
        mekan("araba", true),
        foto("maria_teras"),
        anlati("Twenty minutes later your phone lights up again.", "Yirmi dakika sonra telefonun yeniden yanıyor."),
        de("My driver just asked if I'm “the one from the radio”. I said no, I'm the one with the earrings.", "Şoförüm az önce “radyodaki siz misiniz” diye sordu. Hayır dedim, küpeli olan benim."),
        de("Do you know why I like the car? It's the only room where nobody needs anything from me for twenty minutes.",
           "Arabayı neden severim, biliyor musun? Yirmi dakika boyunca kimsenin benden bir şey istemediği tek oda."),
        de("Every time I sing that song there's one line where my voice wants to crack. I let it. People think it's technique.",
           "O şarkıyı her söylediğimde sesimin çatlamak istediği bir satır var. Bırakıyorum çatlasın. İnsanlar teknik sanıyor."),
        de("Rain, traffic, and a driver who hates my playlist. A photo for your report:", "Yağmur, trafik ve çalma listemden nefret eden bir şoför. Raporun için bir fotoğraf:"),
        { t: "kilitli", k: K, f: "medya/maria_araba.jpg" },
        { t: "konus", k: K },
        anlati("The car slows. Through the rain you can almost hear the restaurant.", "Araba yavaşlıyor. Yağmurun arasından restoranın sesi neredeyse duyuluyor."),
        de("We're here. I can see him through the window. Row-two man. Table by the pillar.", "Geldik. Camdan onu görüyorum. İkinci sıra adamı. Sütunun yanındaki masada."),
        de("This is my warm-up song for moments exactly like this:", "Tam böyle anlar için ısınma şarkım bu:"),
        sarki("maria_burn"),
        de("Thirty seconds of that and I can walk into any room. Now. How do I walk into this one?", "Bundan otuz saniye, sonra her salona girerim. Şimdi. Bu salona nasıl gireyim?"),
        secim([
          s("Walk straight past his table. Don't look.", "Masasının yanından dümdüz geç. Bakma.", { p: { c: 1 }, b: { giris: "gec" }, sonra: [
            de("Cold. Elegant. I approve.", "Soğuk. Zarif. Onaylıyorum.")] }),
          s("Stop. Say hello first. Make him answer.", "Dur. Önce sen selam ver. Cevap vermek zorunda kalsın.", { p: { c: 2 }, b: { giris: "selam" }, sonra: [
            de("Oh, that's wicked. He'll choke on his wine.", "Ooo, bu şeytanca. Şarabı boğazına kaçar.")] }),
          s("Find your seat. Tonight isn't about him.", "Yerini bul. Bu gece onunla ilgili değil.", { p: { g: 2 }, b: { giris: "yer" }, sonra: [
            de("…You're right. It's about tomorrow.", "…Haklısın. Yarınla ilgili.")] })
        ], "How does she walk into the room?", "Salona nasıl girsin?"),
        de("Twenty steps to the table. I counted them last year, in this same restaurant, on a worse night.", "Masaya yirmi adım. Geçen yıl saymıştım; aynı restoranda, daha kötü bir gecede."),
        de("Tonight I walk them in better shoes.", "Bu gece o adımları daha iyi ayakkabılarla atıyorum."),
        anlati("The car door opens. For a moment all you get is the sound of rain and heels on wet stone.", "Arabanın kapısı açılıyor. Bir an yalnız yağmurun ve ıslak taşta topuk seslerinin sesi geliyor."),
        { t: "karar",
          yollar: [
            { bayrak: { elbise: "siyah", sira2: "soyle", kapanis: ["cry", "maria_queen"] }, enaz: { c: 3 }, git: "son_gizli" },
            { bayrak: { kapanis: ["cry", "maria_queen"] }, enaz: { g: 5 }, toplam: 10, git: "son_yuksek" },
            { bayrak: { kapanis: ["cry", "maria_queen"] }, git: "son_orta" }
          ],
          yoksa: "son_dusuk" }
      ],

      son_dusuk: [
        de("I'm in. We'll talk about your empty list later.", "İçerideyim. Boş listeni sonra konuşuruz."),
        anlati("She goes offline. You still owe the label one title.", "Çevrimdışı oluyor. Şirkete hâlâ bir şarkı adı borçlusun."),
        { t: "son", id: "dusuk" }
      ],
      son_orta: [
        de("I'm in. Go do your job, coordinator. And report back. I want EVERYTHING.", "İçerideyim. Git işini yap koordinatör. Sonra bana rapor ver. HER ŞEYİ bilmek istiyorum."),
        anlati("Her status changes to “at dinner”. Your list has one more line filled in.", "Durumu “yemekte” oluyor. Listende bir satır daha doldu."),
        { t: "son", id: "orta" }
      ],
      son_yuksek: [
        mekan("masa", true),
        foto("maria_masa"),
        de("I'm at the dinner. He's two tables away and he just raised his glass at me.", "Yemekteyim. İki masa ötede ve az önce bana kadeh kaldırdı."),
        de("There's an empty chair next to mine. Tomorrow night it has your name on it.", "Yanımda boş bir sandalye var. Yarın gece üstünde senin adın yazacak."),
        de("Bring a pen. People will ask me things and I'll need someone to write down my better answers.", "Kalem getir. İnsanlar bana bir şeyler soracak; iyi cevaplarımı yazacak biri lazım."),
        { t: "son", id: "yuksek" }
      ],
      son_gizli: [
        mekan("siyah", true),
        foto("maria_balkon"),
        anlati("After midnight. The dinner is over. A last message, from the terrace.", "Gece yarısından sonra. Yemek bitti. Terastan son bir mesaj geliyor."),
        de("You told me to sing it straight at him. So here's one nobody at that table gets to hear.", "Bana gözünü ayırmadan söyle demiştin. O masadaki kimsenin duymayacağı bir tane de sana."),
        sarki("maria_midnight"),
        de("After Midnight. Only for the people who stay late.", "After Midnight. Yalnız geç saate kalanlar için."),
        { t: "son", id: "gizli" }
      ]
    }
  };
})(typeof window !== "undefined" ? window : this);
