// KULİS — KAEL VOSS dünyası · Bölüm 1: "Echo of You"
// Sahneler eski "üç sanatçı, tek gece" bölümünden taşındı (arsiv/). Oyuncu: şirketin yeni koordinatörü.
// Flört: oyuncu DENEYEBİLİR; Kael ancak güveni yeterliyse karşılık verir (`olc` adımı → flort: evet/hayir).
// Puan: g = güven, m = müzik uyumu, c = cesaret. "sert/sakin" şarkı ayrımı medya/dunyalar_enerji.json ölçümüne dayanır (zayıf ölçüm).
(function (kok) {
  "use strict";
  var L = kok.KULIS.L, K = "kael";
  var anlati = function (en, tr) { return { t: "anlati", m: L(en, tr) }; };
  var de = function (en, tr) { return { t: "gelen", k: K, m: L(en, tr) }; };
  var ben = function (en, tr) { return { t: "giden", m: L(en, tr) }; };
  var foto = function (f) { return { t: "foto", k: K, f: "medya/" + f + ".jpg" }; };
  var sarki = function (s) { return { t: "sarki", s: s }; };
  var mekan = function (h, gosterme) { return { t: "mekan", k: K, h: h, gosterme: !!gosterme }; };
  var durum = function (en, tr) { return { t: "durum", k: K, m: L(en, tr) }; };
  var eger = function (kosul, adim) { adim.eger = kosul; return adim; };
  var secim = function (secenekler, soruEn, soruTr) { return { t: "secim", s: secenekler, soru: soruEn ? L(soruEn, soruTr) : null }; };
  var s = function (en, tr, ek) { var o = { m: L(en, tr) }; for (var k in (ek || {})) o[k] = ek[k]; return o; };

  kok.KULIS.dunyalar.kael = {
    id: "kael",
    surum: 1,
    ad: L("Kael Voss", "Kael Voss"),
    tur: L("Cinematic alternative rock", "Sinematik alternatif rock"),
    cumle: L("A hotel room, two days of rain, one song he won't sing.", "Bir otel odası, iki günlük yağmur, söylemek istemediği bir şarkı."),
    bolumAdi: L("Chapter 1 — Echo of You", "Bölüm 1 — Echo of You"),
    renk: "#cf5563",
    kart: "medya/kael_karanlik.jpg",
    avatar: "medya/kael_av.jpg",
    baslangic: "giris",
    baslangicElmas: 1,
    kilitBedeli: 2,
    kilitYan: "foto",

    gorevler: [
      { id: "cevap", ad: L("Break Kael's silence", "Kael'in sessizliğini boz") },
      { id: "sarki", ad: L("Lock his song for tomorrow's showcase", "Yarınki konser için şarkısını kesinleştir") }
    ],
    yanGorevler: [
      { id: "koridor", ad: L("Get Kael out of his room", "Kael'i odasından çıkar") },
      { id: "foto", ad: L("Open the private photo", "Özel fotoğrafı aç") },
      { id: "sohbet", ad: L("Ask him for a song in Talk Mode", "Sohbette ondan bir şarkı iste") }
    ],
    sonlar: [
      { id: "dusuk", ad: L("Not tonight", "Bu gece olmaz") },
      { id: "orta", ad: L("One title on the list", "Listede bir şarkı") },
      { id: "yuksek", ad: L("Side of the stage", "Sahnenin yanı") },
      { id: "gizli", ad: L("Secret Encore — the roof", "Gizli Encore — çatı"), gizli: true }
    ],
    odak: { "medya/kael_karanlik.jpg": "52% 30%" },

    kanallar: {
      kael: { ad: L("Kael Voss", "Kael Voss"), avatar: "medya/kael_av.jpg", renk: "#cf5563", durum: L("last seen Saturday", "son görülme cumartesi"), bekleme: "medya/duvar_gece.jpg",
              havuz: { oda: ["medya/kael_oda.jpg", "medya/kael_masa.jpg", "medya/kael_pencere.jpg", "medya/kael_yakin.jpg", "medya/kael_oda2.jpg", "medya/kael_oda7.jpg", "medya/kael_oda3.jpg",
                             "medya/kael_oda5.jpg", "medya/kael_oda8.jpg", "medya/kael_oda4.jpg", "medya/kael_oda6.jpg", "medya/kael_oda9.jpg", "medya/kael_oda10.jpg"],
                       cati: ["medya/kael_cati.jpg"] } }
    },

    sarkilar: {
      echo: { k: K, ad: "Echo of You", dosya: "medya/echo.mp3" },
      kael_ghost: { k: K, ad: "Ghost Lane", dosya: "medya/kael_ghost.mp3" },
      kael_born: { k: K, ad: "Born to Burn", dosya: "medya/kael_born.mp3" },
      kael_other: { k: K, ad: "The Other Side", dosya: "medya/kael_other.mp3" }
    },

    konusma: {
      k: K,
      giris: L("Ask. I answer short.", "Sor. Kısa cevap veririm."),
      yaz: L("Write to Kael…", "Kael'e yaz…"),
      cikis: L("Back to the song", "Şarkıya dön"),
      oneriler: [
        L("Play me something harder", "Bana daha sert bir şey aç"),
        L("Something quiet for the rain", "Yağmura uygun sakin bir şey"),
        L("Which song should I hear first?", "Önce hangisini dinleyeyim?")
      ],
      sira: ["veda", "sert", "sakin", "yagmur", "hikaye", "kimsin", "tesekkur", "oneri", "selam"],
      niyetler: {
        sert: { anahtar: ["sert", "hizli", "rock", "enerj", "hard", "heavy", "loud", "fast", "harder"],
                soz: [L("Then turn it up before you ask twice.", "O zaman ikinci kez sormadan sesi aç.")], sarkilar: ["kael_born", "kael_other"] },
        sakin: { anahtar: ["sakin", "yavas", "huzun", "duygusal", "sessiz", "slow", "calm", "sad", "soft", "quiet"],
                 soz: [L("Quiet isn't soft. Listen.", "Sakin, yumuşak demek değildir. Dinle.")], sarkilar: ["echo", "kael_ghost"] },
        yagmur: { anahtar: ["yagmur", "gece", "karanlik", "rain", "night", "dark"],
                  soz: [L("This one sounds like the window does right now.", "Bu, şu an pencerenin çıkardığı sese benziyor.")], sarkilar: ["kael_ghost", "echo"] },
        hikaye: { anahtar: ["nasil yazd", "hikaye", "neden yazd", "kim icin", "ne anlat", "how did you write", "story", "why did you", "who is it", "about"],
                  soz: [L("Songs explain me better than I do. Pick one.", "Şarkılar beni benden iyi anlatır. Birini seç.")], sarkilar: ["echo", "kael_other"] },
        kimsin: { anahtar: ["kimsin", "kendinden", "sen kim", "who are you", "yourself"],
                  soz: [L("The one who sings it. The rest is the song's business.", "Onu söyleyen kişiyim. Gerisi şarkının işi.")] },
        tesekkur: { anahtar: ["tesekkur", "sag ol", "thank"], soz: [L("Don't thank me yet.", "Henüz teşekkür etme.")] },
        oneri: { anahtar: ["oner", "ne dinle", "hangisi", "cal", "dinlemek", "sarki", "play", "recommend", "suggest", "listen", "song", "which", "first"],
                 soz: [L("Three. In this order, if you ask me.", "Üç tane. Bana sorarsan bu sırayla.")], sarkilar: ["echo", "kael_ghost", "kael_born"] },
        selam: { anahtar: ["selam", "merhaba", "hello", "hey"], soz: [L("You're still here. Good.", "Hâlâ buradasın. İyi.")] },
        veda: { anahtar: ["gorusuruz", "hosca", "sarkiya don", "geri don", "bye", "go back"], soz: [L("Fine. Back to it.", "Peki. Devam.")], cik: true },
        sarkiAdi: { soz: [L("You came prepared.", "Hazırlıklı gelmişsin.")] },
        bilinmeyen: { soz: [
          L("I don't do small talk. Ask for a song: harder, or quieter?", "Havadan sudan konuşmam. Bir şarkı iste: daha sert mi, daha sakin mi?"),
          L("Say it plainer. Or name a mood.", "Daha açık söyle. Ya da bir hava söyle.")] }
      }
    },

    dugumler: {

      giris: [
        { t: "sahne",
          zaman: L("MONDAY · 9:40 PM", "PAZARTESİ · 21:40"),
          baslik: L("He hasn't left his hotel room in two days. Tomorrow he has to be on stage.", "İki gündür otel odasından çıkmıyor. Yarın sahnede olması gerekiyor."),
          kadro: [{ k: K, f: "medya/kael_karanlik.jpg", m: L("Doesn't answer.", "Cevap vermez.") }],
          ozet: L("Your mission: break the silence and lock his song for tomorrow.", "Görevin: sessizliği boz ve yarınki şarkısını kesinleştir."),
          dugme: L("Write to him", "Ona yaz") },
        { t: "sohbet", k: K },
        anlati("The office emptied an hour ago. The note on your desk says: “Kael Voss — one title by midnight. Good luck. You're the fourth this year.”",
               "Ofis bir saat önce boşaldı. Masandaki notta şu yazıyor: “Kael Voss — gece yarısına kadar bir şarkı adı. Kolay gelsin. Bu yıl dördüncüsün.”"),
        anlati("You've read his file. Three albums. No interviews since the last one. A hotel on the river.", "Dosyasını okudun. Üç albüm. Sonuncusundan beri röportaj yok. Nehir kenarında bir otel."),
        anlati("You're the label's new coordinator. Your message has said “Delivered” for two hours. Outside, it starts to rain.",
               "Şirketin yeni koordinatörüsün. Mesajının altında iki saattir “İletildi” yazıyor. Dışarıda yağmur başlıyor."),
        anlati("The last coordinator left you one line in the handover: “He reads everything. He answers nothing. Don't take it personally.”",
               "Önceki koordinatör devir notuna tek satır bırakmış: “Her şeyi okur. Hiçbirine cevap vermez. Üstüne alınma.”"),
        anlati("You take it a little personally. You start typing.", "Biraz üstüne alınıyorsun. Yazmaya başlıyorsun."),
        { t: "hatirla", k: K, anahtar: "kapanis",
          m: L("You again. Last time you left with {onceki} on the list.", "Yine sen. Geçen sefer listeye {onceki} yazıp gitmiştin.") },
        secim([
          s("A reminder, Mr. Voss: I need your song by midnight.", "Hatırlatma, Bay Voss: şarkınızı gece yarısına kadar almam gerekiyor.", { b: { k1: "hatirlat" }, sonra: [
            mekan("oda"), durum("online", "çevrimiçi"),
            de("No.", "Hayır."),
            ben("No, you haven't chosen — or no, you won't play?", "Hayır, seçmedin mi — yoksa hayır, çalmayacak mısın?"),
            de("Pick one.", "Birini seç.")] }),
          s("I listened to Echo of You tonight. Twice.", "Bu akşam Echo of You'yu dinledim. İki kere.", { p: { g: 1, m: 2 }, b: { k1: "iki" }, sonra: [
            mekan("oda"), durum("online", "çevrimiçi"),
            de("Why twice.", "Neden iki kere."),
            ben("The first time I was listening to the song. The second time I was listening to you.", "İlkinde şarkıyı dinliyordum. İkincisinde seni."),
            de("That's a dangerous thing to say to a stranger.", "Bir yabancıya söylemek için tehlikeli bir cümle."),
            foto("kael_masa"),
            de("I've been at this table with it since Saturday.", "Cumartesiden beri bu masada, o şarkıyla oturuyorum.")] }),
          s("It's raining on your side of the city too, isn't it?", "Şehrin senin tarafında da yağmur yağıyor, değil mi?", { p: { g: 1, c: 1 }, b: { k1: "yagmur" }, sonra: [
            mekan("oda"), durum("online", "çevrimiçi"),
            de("It's been raining here for two days.", "Burada iki gündür yağıyor."),
            foto("kael_pencere"),
            de("See for yourself.", "Kendin gör.")] })
        ], "Break the silence", "Sessizliği boz"),
        { t: "gorev", id: "cevap" },
        anlati("Three dots appear. Disappear. Appear again.", "Üç nokta beliriyor. Kayboluyor. Yeniden beliriyor."),
        de("Two days in this room. The minibar is empty and the curtains have opinions about me.", "İki gündür bu odadayım. Minibar boş, perdelerin de benim hakkımda fikirleri var."),
        de("The label thinks I'm hiding. I'm not hiding. I'm deciding.", "Şirket saklandığımı sanıyor. Saklanmıyorum. Karar veriyorum."),
        de("So you're the new coordinator. They send a new one every few months. Every one of them wants a title by midnight.",
           "Demek yeni koordinatör sensin. Birkaç ayda bir yenisini gönderirler. Hepsi gece yarısına kadar bir şarkı adı ister."),
        de("Let me save you time. I've read the showcase brief. Six minutes, one song, smile at the sponsors.", "Sana zaman kazandırayım. Konser yazısını okudum. Altı dakika, tek şarkı, sponsorlara gülümse."),
        de("I can do six minutes. I can do one song. The third thing is negotiable.", "Altı dakikayı yaparım. Tek şarkıyı yaparım. Üçüncüsü pazarlığa açık."),
        secim([
          s("I'm not asking for a title. I'm asking which song you can bear to sing.", "Senden şarkı adı istemiyorum. Hangi şarkıyı söylemeye dayanabileceğini soruyorum.", { p: { g: 2 }, sonra: [
            de("…That's a different question.", "…Bu başka bir soru.")] }),
          s("Then I'll be the one who doesn't. Tell me about the song.", "O zaman istemeyen ben olayım. Bana şarkıyı anlat.", { p: { m: 1, g: 1 }, sonra: [
            de("I don't tell. I play.", "Anlatmam. Çalarım.")] }),
          s("I still need the title, Kael.", "Yine de o adı almam gerek Kael.", { p: { c: 1 }, sonra: [
            de("At least you're honest about it.", "En azından dürüstsün.")] })
        ]),
        de("Since you're still here: tomorrow they want lights, smoke, the whole circus.", "Madem hâlâ buradasın: yarın ışık, duman, bütün sirki istiyorlar."),
        de("I want one lamp and a room that has to lean in to hear.", "Ben tek lamba ve duymak için öne eğilmek zorunda kalan bir salon istiyorum."),
        secim([
          s("One lamp. Make them lean in.", "Tek lamba. Bırak öne eğilsinler.", { p: { m: 1, g: 1 }, b: { isik: "tek" }, sonra: [
            de("Finally. Someone on the payroll with ears.", "Nihayet. Bordroda kulağı olan biri.")] }),
          s("Give them the circus once. Then the lamp.", "Sirki bir kere ver. Sonra lamba.", { p: { c: 1, m: 1 }, b: { isik: "ikisi" }, sonra: [
            de("A trade. I can live with a trade.", "Bir takas. Takasla yaşayabilirim.")] }),
          s("That's between you and the lighting crew.", "O, ışıkçılarla senin aranda.", { b: { isik: "yok" }, sonra: [
            de("A coward's answer. A polite one.", "Korkak cevabı. Ama kibar.")] })
        ], "Tomorrow's stage", "Yarının sahnesi"),
        de("There's one they never ask for. I play it for myself when the room is empty:", "Hiç istemedikleri bir tane var. Salon boşken onu kendime çalarım:"),
        sarki("kael_ghost"),
        de("Ghost Lane. No video, no phones in the air. That's why it still belongs to me.", "Ghost Lane. Klibi yok, havada telefon yok. O yüzden hâlâ benim."),
        anlati("Outside his window a siren passes and fades. He doesn't mention it. Neither do you.", "Penceresinin önünden bir siren geçip uzaklaşıyor. O bahsetmiyor. Sen de."),
        { t: "git", d: "sarki" }
      ],

      sarki: [
        anlati("He goes quiet for a minute. You watch the rain on your own window and wait.", "Bir dakika susuyor. Kendi pencerendeki yağmuru izleyip bekliyorsun."),
        de("Do you play anything?", "Bir şey çalar mısın?"),
        ben("Badly. Three chords.", "Kötü. Üç akor."),
        de("Three is enough. Most of my songs are three chords and a grudge.", "Üç yeter. Şarkılarımın çoğu üç akor ve bir kırgınlıktan ibaret."),
        de("Don't put that in the press release.", "Bunu basın bültenine yazma."),
        de("They want Echo of You. The single. The one everybody films on their phones.", "Echo of You'yu istiyorlar. Çıkış şarkısını. Herkesin telefonla çektiği şarkıyı."),
        sarki("echo"),
        de("Listen to the second verse, not the chorus. Everyone quotes the chorus.", "Nakaratı değil, ikinci kıtayı dinle. Herkes nakaratı alıntılar."),
        de("The second verse is where I'm actually talking.", "Gerçekten konuştuğum yer ikinci kıta."),
        de("I've had to mean it three hundred times since I wrote it.", "Yazdığımdan beri onu üç yüz kere inanarak söylemek zorunda kaldım."),
        de("Tomorrow she'll be in that room. Second row. So no. I don't have a title for you.", "Yarın o da o salonda olacak. İkinci sırada. Yani hayır. Sana verecek bir şarkı adım yok."),
        secim([
          s("Then don't sing it to her. Sing it to the three hundred who needed it.", "O zaman ona söyleme. O şarkıya ihtiyacı olan üç yüz kişiye söyle.", { p: { m: 2 }, b: { k3: "ucyuz" }, sonra: [
            de("…Nobody has put it that way.", "…Kimse böyle söylememişti.")] }),
          s("Then play something else. I'll handle the label.", "O zaman başka bir şarkı çal. Şirketle ben uğraşırım.", { p: { c: 2 }, b: { k3: "baska" }, sonra: [
            de("You'd pick that fight on your first week? …Which one, then.", "İlk haftanda bu kavgaya girer misin? …Hangisi olsun o zaman."),
            secim([
              s("Ghost Lane", "Ghost Lane", { p: { m: 1 }, b: { alt: "kael_ghost" }, sarki: "kael_ghost", sonra: [sarki("kael_ghost"), de("Empty streets. It could work.", "Boş sokaklar. Olabilir.")] }),
              s("Born to Burn", "Born to Burn", { p: { m: 1 }, b: { alt: "kael_born" }, sarki: "kael_born", sonra: [sarki("kael_born"), de("Louder than the room expects. It could work.", "Salonun beklediğinden gürültülü. Olabilir.")] })
            ], "Which song instead?", "Onun yerine hangisi?")] }),
          s("You wrote it. You decide what it means now.", "Onu sen yazdın. Artık ne anlama geldiğine de sen karar verirsin.", { p: { g: 1 }, b: { k3: "sen" }, sonra: [
            de("The last coordinator said the same. You typed it like you believe it.", "Önceki koordinatör de aynısını söylemişti. Sen inanarak yazmışsın.")] })
        ]),
        anlati("The typing indicator stops for a long time. When he comes back, the sentences are longer.", "Yazıyor işareti uzun süre duruyor. Geri geldiğinde cümleleri daha uzun."),
        de("You're the first one who stayed past the part where I say no.", "'Hayır' dediğim yerden sonra kalan ilk kişi sensin."),
        de("The others sent a contract clause. One of them sent a fruit basket.", "Diğerleri sözleşme maddesi gönderdi. Biri meyve sepeti yolladı."),
        de("It's almost eleven. Ask what you came to ask.", "Saat on bire geliyor. Sormaya geldiğin şeyi sor."),
        { t: "konus", k: K },
        anlati("He forwards you a screenshot. The band's group chat: forty unread messages.", "Sana bir ekran görüntüsü iletiyor. Grubun sohbeti: kırk okunmamış mesaj."),
        de("They've been asking where I am since Saturday. I answer you instead. Don't read into it.", "Cumartesiden beri nerede olduğumu soruyorlar. Onlara değil, sana cevap veriyorum. Bundan anlam çıkarma."),
        de("The drummer wants the setlist. The bassist wants to know if I'm alive. Fair questions.", "Davulcu setlist'i istiyor. Basçı hayatta mıyım diye soruyor. Haklı sorular."),
        secim([
          s("I'll tell them you're alive and choosing.", "Onlara hayatta olduğunu ve seçtiğini söylerim.", { p: { g: 1 }, b: { grup: "ben" }, sonra: [
            de("“Choosing.” They'll assume the worst. Send it.", "“Seçiyor.” En kötüsünü düşünürler. Gönder.")] }),
          s("Answer them yourself. One word is enough.", "Onlara kendin cevap ver. Tek kelime yeter.", { p: { c: 2 }, b: { grup: "kendin" }, sonra: [
            de("…I sent “alive”. The drummer replied with eleven exclamation marks.", "…“Hayattayım” yazdım. Davulcu on bir ünlemle cevap verdi.")] }),
          s("Send them the song you just played me.", "Az önce bana çaldığın şarkıyı onlara gönder.", { p: { m: 2 }, b: { grup: "sarki" }, sonra: [
            de("Ghost Lane in the group chat. They'll think I've been replaced.", "Grup sohbetinde Ghost Lane. Yerime başkası geçti sanacaklar.")] })
        ], "The band is waiting", "Grup bekliyor"),
        de("You ask for small things. One word. One lamp. It adds up.", "Küçük şeyler istiyorsun. Tek kelime. Tek lamba. Birikiyor."),
        de("Second row. Everyone who works with me asks who she is. You didn't.", "İkinci sıra. Benimle çalışan herkes onun kim olduğunu sorar. Sen sormadın."),
        de("That's the first thing you've done that surprised me.", "Beni şaşırtan ilk hareketin bu oldu."),
        { t: "git", d: "neden" }
      ],

      neden: [
        anlati("11:20 PM. He sends a photo of a notebook page, turned face down.", "23:20. Ters çevrilmiş bir defter sayfasının fotoğrafını gönderiyor."),
        de("That's the first draft. I don't show it to anyone. I'm only telling you it exists.", "İlk taslak bu. Kimseye göstermem. Yalnız var olduğunu söylüyorum."),
        de("People think the song is about leaving. It's about the week after, when the apartment still smells like someone.",
           "İnsanlar şarkının gitmekle ilgili olduğunu sanıyor. Sonraki haftayla ilgili; evin hâlâ biri gibi koktuğu haftayla."),
        de("I wrote it in one sitting. Then I didn't touch a guitar for a month.", "Tek oturuşta yazdım. Sonra bir ay gitara dokunmadım."),
        ben("And now they want it under smoke machines.", "Şimdi de onu duman makinelerinin altında istiyorlar."),
        de("Now they want it under smoke machines. You see the problem.", "Şimdi onu duman makinelerinin altında istiyorlar. Sorunu görüyorsun."),
        de("You have what you need for your report. Why are you still here?", "Raporun için gerekeni aldın. Neden hâlâ buradasın?"),
        secim([
          s("Because you answered.", "Çünkü cevap verdin.", { p: { g: 2 }, y: "koridor", sonra: [
            de("…Fair.", "…Haklısın."),
            foto("kael_koridor"),
            de("I walked the corridor. First time in two days. Your fault.", "Koridora çıktım. İki gün sonra ilk kez. Senin yüzünden.")] }),
          s("Because it's my job.", "Çünkü işim bu.", { p: { c: 1 }, sonra: [
            de("Then you're better at it than the others.", "O zaman bu işi diğerlerinden iyi yapıyorsun.")] }),
          // flört denemesi: karşılık ancak Kael kabul ederse (güven ≥ 4)
          s("Because I'd rather be here than anywhere else tonight.", "Çünkü bu gece başka hiçbir yerde olmak istemezdim.", { p: { c: 1 }, sonra: [
            { t: "olc", enaz: { g: 4 }, bayrak: { flort: "evet" }, yoksa: { flort: "hayir" } },
            eger({ flort: "evet" }, de("…Careful, {ad}. I might start answering your messages.", "…Dikkat et {ad}. Mesajlarına cevap vermeye başlayabilirim.")),
            eger({ flort: "evet" }, foto("kael_yakin")),
            eger({ flort: "evet" }, de("Stay on the line a little longer, then.", "O zaman hatta biraz daha kal.")),
            eger({ flort: "hayir" }, de("You don't know me well enough to mean that. Ask me again when you do.", "Bunu kastedecek kadar tanımıyorsun beni. Tanıdığında yine söylersin.")),
            eger({ flort: "hayir" }, de("Work first.", "Önce iş."))] })
        ]),
        de("Proof of life. For your report.", "Hayatta olduğumun kanıtı. Raporuna eklersin."),
        { t: "kilitli", k: K, f: "medya/kael_karanlik.jpg" },
        anlati("11:40 PM. Twenty minutes to your deadline.", "23:40. Teslim saatine yirmi dakika var."),
        de("If I sing tomorrow, I sing it my way. No backing track. No second chorus for the cameras.", "Yarın söylersem kendi bildiğim gibi söylerim. Altyapı kaydı yok. Kameralar için ikinci nakarat yok."),
        de("And you tell the label that before I walk out there. Not after.", "Bunu da şirkete ben sahneye çıkmadan söylersin. Sonra değil."),
        ben("I'll tell them tonight.", "Bu gece söylerim."),
        de("Midnight is close. Say it: what do I sing tomorrow?", "Gece yarısı yaklaşıyor. Söyle: yarın ne söylüyorum?"),
        secim([
          s("Echo of You. Once.", "Echo of You. Bir kere.", { p: { m: 2 }, b: { kapanis: "echo" }, sonra: [
            de("Once. Put it on your list.", "Bir kere. Listene yaz."), { t: "gorev", id: "sarki" }] }),
          s("The other one. Leave Echo for a night that's yours.", "Öbürü. Echo'yu sana ait bir geceye sakla.", { p: { c: 1, g: 1 }, b: { kapanis: "kael_ghost" }, sonra: [
            de("Ghost Lane, then. Put it on your list.", "O zaman Ghost Lane. Listene yaz."), { t: "gorev", id: "sarki" }] }),
          s("That's yours to decide, not mine.", "Buna ben değil, sen karar verirsin.", { p: { g: 1 }, b: { kapanis: "yok" }, sonra: [
            de("Then there's no title. Not tonight.", "O zaman şarkı adı yok. Bu gece olmaz."), { t: "gorev", id: "sarki", basarisiz: true }] })
        ], "Which song goes on the list?", "Listeye hangi şarkı yazılsın?"),
        { t: "karar",
          yollar: [
            { bayrak: { k1: "iki", k3: "ucyuz", kapanis: "echo" }, enaz: { g: 4 }, git: "son_gizli" },
            { bayrak: { kapanis: ["echo", "kael_ghost"] }, enaz: { g: 5 }, toplam: 12, git: "son_yuksek" },
            { bayrak: { kapanis: ["echo", "kael_ghost"] }, git: "son_orta" }
          ],
          yoksa: "son_dusuk" }
      ],

      son_dusuk: [
        durum("last seen just now", "son görülme az önce"),
        de("Ask me tomorrow. In person. Not through a screen.", "Yarın sor. Yüz yüze. Ekranın arkasından değil."),
        anlati("11:52 PM. One empty line on the list. You send it anyway.", "23:52. Listede bir boş satır. Yine de gönderiyorsun."),
        anlati("The reply from the office comes in seconds: “Fifth coordinator starts Monday?” You don't answer that one.",
               "Ofisten cevap saniyeler içinde geliyor: “Beşinci koordinatör pazartesi mi başlıyor?” Ona cevap yazmıyorsun."),
        { t: "son", id: "dusuk" }
      ],
      son_orta: [
        de("You have your title. Go to sleep.", "Şarkı adın oldu. Git uyu."),
        de("And tell whoever sent the fruit basket that I ate the pears.", "Meyve sepetini gönderene de söyle, armutları yedim."),
        anlati("11:52 PM. The list is complete. He goes offline before you can answer.", "23:52. Liste tamam. Sen cevap yazamadan çevrimdışı oluyor."),
        { t: "son", id: "orta" }
      ],
      son_yuksek: [
        de("One condition. Tomorrow you stand where I can see you. Side of the stage. Not the back of the room.",
           "Tek şartım var. Yarın seni görebileceğim bir yerde duracaksın. Sahnenin yanında. Salonun arkasında değil."),
        ben("I'll be there.", "Orada olacağım."),
        de("Good.", "Güzel."),
        anlati("11:58 PM. The list is complete. For the first time in two days, his status says “online” and stays that way.",
               "23:58. Liste tamam. İki gün sonra ilk kez durumunda “çevrimiçi” yazıyor ve öyle kalıyor."),
        { t: "son", id: "yuksek" }
      ],
      son_gizli: [
        de("The rain stopped. Come up to the roof. Some things I'd rather play than type.", "Yağmur dindi. Çatıya gel. Bazı şeyleri yazmak yerine çalmayı tercih ederim."),
        mekan("cati", true),
        foto("kael_cati"),
        anlati("Midnight. The city is wet and quiet. He has a guitar and nobody to film him.", "Gece yarısı. Şehir ıslak ve sessiz. Elinde bir gitar var, onu çeken kimse yok."),
        sarki("kael_other"),
        de("I haven't played for one person since I was nineteen. I'd forgotten it's harder than three hundred.",
           "On dokuz yaşımdan beri tek kişiye çalmadım. Üç yüz kişiden zor olduğunu unutmuşum."),
        de("Nobody's heard this one from this close. Tomorrow I sing Echo for three hundred. Tonight this is for one.",
           "Bunu kimse bu kadar yakından dinlemedi. Yarın Echo'yu üç yüz kişiye söylerim. Bu gece bu, bir kişi için."),
        { t: "son", id: "gizli" }
      ]
    }
  };
})(typeof window !== "undefined" ? window : this);
