// KULİS — JAXEN MOON dünyası · Bölüm 1: "Stay Until the Tide"
// Sahneler eski "üç sanatçı, tek gece" bölümünden taşındı (arsiv/). Oyuncu: şirketin yeni koordinatörü.
// Flört: oyuncu DENEYEBİLİR; Jaxen ancak güveni yeterliyse karşılık verir (`olc` adımı → flort: evet/hayir).
// Puan: g = güven, m = müzik uyumu, c = cesaret. "sert/sakin" şarkı ayrımı medya/dunyalar_enerji.json ölçümüne dayanır (zayıf ölçüm).
(function (kok) {
  "use strict";
  var L = kok.KULIS.L, K = "jaxen";
  var anlati = function (en, tr) { return { t: "anlati", m: L(en, tr) }; };
  var de = function (en, tr) { return { t: "gelen", k: K, m: L(en, tr) }; };
  var ben = function (en, tr) { return { t: "giden", m: L(en, tr) }; };
  var foto = function (f) { return { t: "foto", k: K, f: "medya/" + f + ".jpg" }; };
  var sarki = function (s) { return { t: "sarki", s: s }; };
  var mekan = function (h, gosterme) { return { t: "mekan", k: K, h: h, gosterme: !!gosterme }; };
  var eger = function (kosul, adim) { adim.eger = kosul; return adim; };
  var secim = function (secenekler, soruEn, soruTr) { return { t: "secim", s: secenekler, soru: soruEn ? L(soruEn, soruTr) : null }; };
  var s = function (en, tr, ek) { var o = { m: L(en, tr) }; for (var k in (ek || {})) o[k] = ek[k]; return o; };

  kok.KULIS.dunyalar.jaxen = {
    id: "jaxen",
    surum: 1,
    ad: L("Jaxen Moon", "Jaxen Moon"),
    tur: L("Americana · folk-rock", "Americana · folk-rock"),
    cumle: L("Lost on the way to the studio, with two songs that won't stop arguing.", "Stüdyoya giderken kaybolmuş; elinde kavga eden iki şarkı var."),
    bolumAdi: L("Chapter 1 — Stay Until the Tide", "Bölüm 1 — Stay Until the Tide"),
    renk: "#e0a04a",
    kart: "medya/jaxen_gece.jpg",
    avatar: "medya/jaxen_av.jpg",
    baslangic: "giris",
    baslangicElmas: 1,
    kilitBedeli: 2,
    kilitYan: "kare",

    gorevler: [
      { id: "studyo", ad: L("Get Jaxen to the studio", "Jaxen'i stüdyoya ulaştır") },
      { id: "sarki", ad: L("Make him pick one song for tomorrow", "Yarın için tek şarkı seçtir") }
    ],
    yanGorevler: [
      { id: "kayit", ad: L("Get a private take from Jaxen", "Jaxen'den sana özel bir kayıt al") },
      { id: "kare", ad: L("Open the candlelit studio shot", "Mum ışığındaki stüdyo karesini aç") },
      { id: "sohbet", ad: L("Ask him for a song in Talk Mode", "Sohbette ondan bir şarkı iste") }
    ],
    sonlar: [
      { id: "dusuk", ad: L("Still deciding", "Hâlâ karar veremedi") },
      { id: "orta", ad: L("See you tomorrow, boss", "Yarın görüşürüz patron") },
      { id: "yuksek", ad: L("The chair by the window", "Pencerenin yanındaki sandalye") },
      { id: "gizli", ad: L("Secret Encore — the new verse", "Gizli Encore — yeni kıta"), gizli: true }
    ],
    odak: {
      "medya/jaxen_studyo.jpg": "70% 50%",
      "medya/jaxen_mum.jpg": "72% 50%",
      "medya/jaxen_gece.jpg": "50% 30%"
    },

    kanallar: {
      jaxen: { ad: L("Jaxen Moon", "Jaxen Moon"), avatar: "medya/jaxen_av.jpg", renk: "#e0a04a", durum: L("online", "çevrimiçi"), ilkMekan: "sokak",
               havuz: { sokak: ["medya/jaxen_profil.jpg", "medya/jaxen_bakis.jpg", "medya/jaxen_yan.jpg", "medya/jaxen_yakin.jpg", "medya/jaxen_ruzgar.jpg", "medya/jaxen_profil2.jpg"],
                        studyo: ["medya/jaxen_studyo.jpg", "medya/jaxen_gece.jpg", "medya/jaxen_mum.jpg"] } }
    },

    sarkilar: {
      tide: { k: K, ad: "Stay Until the Tide", dosya: "medya/tide.mp3" },
      salt: { k: K, ad: "Salt & Smoke", dosya: "medya/salt.mp3" },
      jaxen_nomap: { k: K, ad: "No Map for the Night", dosya: "medya/jaxen_nomap.mp3" },
      jaxen_wild: { k: K, ad: "Wild Thing, Slow Fire", dosya: "medya/jaxen_wild.mp3" },
      jaxen_run: { k: K, ad: "Run with the Weather", dosya: "medya/jaxen_run.mp3" }
    },

    konusma: {
      k: K,
      giris: L("break time. ask me anything, or tell me what you feel like hearing", "mola. ne istersen sor, ya da canının ne dinlemek istediğini söyle"),
      yaz: L("Write to Jaxen…", "Jaxen'e yaz…"),
      cikis: L("Back to the soundcheck", "Provaya dön"),
      oneriler: [
        L("Play me something with more road in it", "Bana içinde daha çok yol olan bir şey aç"),
        L("Something quiet", "Sakin bir şey"),
        L("Which song should I hear first?", "Önce hangisini dinleyeyim?")
      ],
      sira: ["veda", "sert", "sakin", "yol", "hikaye", "kimsin", "tesekkur", "oneri", "selam"],
      niyetler: {
        sert: { anahtar: ["sert", "hizli", "enerj", "hareketli", "hard", "loud", "fast", "more road", "daha cok yol"],
                soz: [L("windows down then", "o zaman camları açıyoruz")], sarkilar: ["jaxen_run", "jaxen_wild"] },
        sakin: { anahtar: ["sakin", "yavas", "huzun", "duygusal", "sessiz", "slow", "calm", "sad", "soft", "quiet"],
                 soz: [L("easy. I've got a few that barely raise their voice", "kolay. sesini neredeyse hiç yükseltmeyen birkaç tane var")], sarkilar: ["tide", "jaxen_nomap"] },
        yol: { anahtar: ["yol", "gece", "harita", "kaybol", "road", "night", "map", "lost"],
               soz: [L("funny you'd ask a man who can't find Alder Street", "bunu Alder Sokağı'nı bulamayan adama sorman komik")], sarkilar: ["jaxen_nomap", "jaxen_run"] },
        hikaye: { anahtar: ["nasil yazd", "hikaye", "neden yazd", "kim icin", "ne anlat", "how did you write", "story", "why did you", "who is it", "about"],
                  soz: [L("one's for somebody who stayed, one's for somebody who didn't. you'll know which is which", "biri kalan biri için, öbürü kalmayan biri için. hangisi hangisi, dinleyince anlarsın")], sarkilar: ["tide", "salt"] },
        kimsin: { anahtar: ["kimsin", "kendinden", "sen kim", "who are you", "yourself"],
                  soz: [L("a man with a guitar and a bad sense of direction", "bir gitarı ve berbat bir yön duygusu olan bir adam")] },
        tesekkur: { anahtar: ["tesekkur", "sag ol", "thank"], soz: [L("anytime, boss", "ne demek patron")] },
        oneri: { anahtar: ["oner", "ne dinle", "hangisi", "cal", "dinlemek", "sarki", "play", "recommend", "suggest", "listen", "song", "which", "first"],
                 soz: [L("start anywhere. these three get along", "nereden istersen başla. bu üçü iyi geçinir")], sarkilar: ["tide", "jaxen_nomap", "jaxen_wild"] },
        selam: { anahtar: ["selam", "merhaba", "hello", "hey"], soz: [L("hey you. still here, still found", "selam. hâlâ buradayım, hâlâ kaybolmadım")] },
        veda: { anahtar: ["gorusuruz", "hosca", "provaya don", "geri don", "bye", "go back"], soz: [L("yes boss. back to work", "emredersin patron. işe dönüyorum")], cik: true },
        sarkiAdi: { soz: [L("you know my songs. that's nice to hear", "şarkılarımı biliyorsun. bunu duymak güzel")] },
        bilinmeyen: { soz: [
          L("I lost you there. tell me a mood: more road, or quiet?", "orada seni kaybettim. bir hava söyle: daha çok yol mu, sakin mi?"),
          L("say that again, slower. or just ask for a song", "bir daha söyle, daha yavaş. ya da bir şarkı iste")] }
      }
    },

    dugumler: {

      giris: [
        { t: "sahne",
          zaman: L("MONDAY · 7:15 PM", "PAZARTESİ · 19:15"),
          baslik: L("He was due at the studio at seven. He says yes to everything and chooses nothing.", "Saat yedide stüdyoda olması gerekiyordu. Her şeye evet der, hiçbirini seçmez."),
          kadro: [{ k: K, f: "medya/jaxen_gece.jpg", m: L("Answers late.", "Geç cevap verir.") }],
          ozet: L("Your mission: get him to the studio and make him pick one song.", "Görevin: onu stüdyoya ulaştır ve tek şarkı seçtir."),
          dugme: L("Open the chat", "Sohbeti aç") },
        { t: "sohbet", k: K },
        anlati("Your first week at the label. The note on your desk says: “Jaxen Moon — one title by midnight. He will agree to everything. Do not let him.”",
               "Şirketteki ilk haftan. Masandaki notta şu yazıyor: “Jaxen Moon — gece yarısına kadar bir şarkı adı. Her şeye evet diyecek. İzin verme.”"),
        { t: "hatirla", k: K, anahtar: "kapanis",
          m: L("hey, it's you again. last time you made me pick {onceki}. no regrets", "aa yine sen. geçen sefer bana {onceki} seçtirmiştin. pişman değilim") },
        de("hey {ad}! you're the new coordinator. welcome to the family", "selam {ad}! yeni koordinatör sensin. aileye hoş geldin"),
        de("I heard about you. they finally hired somebody who answers messages. I'm the reason that was necessary",
           "seni duydum. sonunda mesajlara cevap veren birini işe almışlar. buna gerek duyulmasının sebebi benim"),
        de("funny thing. I'm supposed to be at the studio right now and I think I've been walking the opposite way",
           "komik bir durum var. şu an stüdyoda olmam gerekiyordu ama galiba ters yöne yürüyorum"),
        foto("jaxen_arkadan"),
        de("I had the address written on my hand. then I washed my hands. that's my whole career in one sentence",
           "adresi elime yazmıştım. sonra ellerimi yıkadım. bütün kariyerim tek cümlede bu"),
        de("does this look like Alder Street to you", "sence burası Alder Sokağı'na benziyor mu"),
        secim([
          s("That is definitely not Alder Street.", "Orası kesinlikle Alder Sokağı değil.", { p: { c: 1 }, sonra: [
            de("yeah, the street agreed with you about four blocks ago", "evet, sokak da dört blok önce seninle aynı fikirdeydi"),
            foto("jaxen_tabela"),
            de("this is my reading-street-signs face", "bu benim tabela okuma yüzüm")] }),
          s("Send me your location. I'll get you there.", "Konumunu gönder. Seni oraya ben götürürüm.", { p: { g: 2 }, sonra: [
            de("see, this is why they hired you. ten minutes in and I'm already less lost", "işte seni bu yüzden işe almışlar. on dakikadır varsın, şimdiden daha az kaybolmuş hissediyorum"),
            foto("jaxen_yuruyus"),
            de("walking. tell me when to turn", "yürüyorum. nerede döneceğimi söyle")] }),
          s("The studio had you booked for 7. It's 7:15.", "Stüdyo seni 19:00'a yazmış. Saat 19:15.", { p: { c: 1, m: 1 }, sonra: [
            de("the songs don't know what time it is and neither do I. but point taken, boss", "şarkılar saati bilmez, ben de bilmem. ama haklısın patron"),
            foto("jaxen_duvar"),
            de("standing still until you tell me where to go", "sen yolu söyleyene kadar yerimden kıpırdamıyorum")] })
        ]),
        anlati("You open the map and talk him through it. Left at the bakery. Past the mural. He introduces you to every dog he meets on the way.",
               "Haritayı açıp ona yolu tarif ediyorsun. Fırından sola. Duvar resmini geç. Yolda karşılaştığı her köpeği sana tek tek tanıtıyor."),
        de("hold on. there's a guy with a banjo on this corner and he's playing better than me. I'm stopping",
           "dur. bu köşede banjo çalan biri var ve benden iyi çalıyor. duruyorum"),
        secim([
          s("Two minutes. Then you walk.", "İki dakika. Sonra yürüyorsun.", { p: { g: 1, m: 1 }, b: { sokakta: "dinle" }, sonra: [
            de("deal. he just showed me a turnaround I'm stealing", "anlaştık. az önce bana çalacağım bir geçiş gösterdi")] }),
          s("Jaxen. Studio. Now.", "Jaxen. Stüdyo. Hemen.", { p: { c: 1 }, b: { sokakta: "yuru" }, sonra: [
            de("yes boss. I tipped him for both of us", "emredersin patron. ikimiz adına bahşiş bıraktım")] }),
          s("Play one with him. I'll cover for you.", "Onunla bir şarkı çal. Seni idare ederim.", { p: { c: 1, g: 1 }, b: { sokakta: "cal" }, sonra: [
            de("you're a bad influence and I like it. one song", "kötü örneksin ve hoşuma gidiyor. tek şarkı")] })
        ], "The busker on the corner", "Köşedeki sokak müzisyeni"),
        de("I hum this one when I walk. it keeps my feet honest", "yürürken bunu mırıldanırım. ayaklarımı dürüst tutar"),
        sarki("jaxen_nomap"),
        de("you know the best part of being lost? I always find something better than where I was going", "kaybolmanın en iyi yanı ne biliyor musun? hep gideceğim yerden daha iyi bir şey buluyorum"),
        de("last month I found a diner that only plays one record. I stayed four hours", "geçen ay yalnız tek plak çalan bir lokanta buldum. dört saat kaldım"),
        foto("jaxen_sokak"),
        de("found it. you're good at this", "buldum. bu işte iyisin"),
        { t: "gorev", id: "studyo" },
        { t: "git", d: "sarki" }
      ],

      sarki: [
        anlati("The studio smells like coffee and old carpet. The engineer waves without looking up.", "Stüdyo kahve ve eski halı kokuyor. Ses mühendisi başını kaldırmadan el sallıyor."),
        de("this room's older than me. every scratch on the floor is somebody's good take", "bu oda benden yaşlı. yerdeki her çizik birinin iyi kaydı"),
        de("the stool by the window is the good one. everybody fights over it. I was late, so I get the bad stool",
           "pencerenin yanındaki tabure iyi olanı. herkes onun için kavga eder. geç kaldım, kötü tabure bana düştü"),
        de("before I pick anything, listen to what happened yesterday. I ran out of road halfway through this one",
           "bir şey seçmeden önce dün ne olduğunu dinle. bunun yarısında yolum bitti"),
        sarki("jaxen_run"),
        de("Run with the Weather. I stopped at the bridge because I forgot what I was running from", "Run with the Weather. köprüde durdum çünkü neyden kaçtığımı unuttum"),
        secim([
          s("Then finish it tomorrow. On stage.", "O zaman yarın bitir. Sahnede.", { p: { c: 2 }, b: { dun: "sahne" }, sonra: [
            de("in front of people? that's either brave or stupid. …I'm in", "insanların önünde mi? bu ya cesaret ya aptallık. …varım")] }),
          s("Leave it unfinished. Some songs are.", "Yarım bırak. Bazı şarkılar öyledir.", { p: { m: 1, g: 1 }, b: { dun: "yarim" }, sonra: [
            de("that's the kindest thing anyone's ever said about my deadlines", "teslim tarihlerim hakkında söylenmiş en nazik şey bu")] }),
          s("What were you running from?", "Neyden kaçıyordun?", { p: { g: 2 }, b: { dun: "sor" }, sonra: [
            de("a town with one stoplight and a lot of opinions. another time, boss", "tek trafik ışığı ve bir sürü fikri olan bir kasabadan. başka zaman patron")] })
        ], "Yesterday's unfinished take", "Dünün yarım kalan kaydı"),
        de("so. one song for tomorrow. that's the cruel part. I've got two and they won't stop arguing",
           "evet. yarın için tek şarkı. işin acımasız kısmı bu. elimde iki tane var ve kavga etmeyi bırakmıyorlar"),
        de("this one's the ocean talking", "bu, denizin konuştuğu"),
        sarki("tide"),
        de("and this one's the fire answering", "bu da ateşin cevabı"),
        sarki("salt"),
        de("I wrote the first one on a porch and the second one in a parking lot. you can probably hear which is which",
           "ilkini bir verandada, ikincisini bir otoparkta yazdım. hangisi hangisi, herhalde duyuluyordur"),
        de("you pick. I trust first-week ears. they haven't learned to be polite yet", "sen seç. ilk hafta kulaklarına güvenirim. henüz kibar olmayı öğrenmemişlerdir"),
        secim([
          s("Stay Until the Tide", "Stay Until the Tide", { p: { m: 2 }, b: { kapanis: "tide" }, sarki: "tide", sonra: [
            de("the one who stayed. alright. …that says something nice about you", "kalan için olan. peki. …bu senin hakkında güzel bir şey söylüyor"), { t: "gorev", id: "sarki" }] }),
          s("Salt & Smoke", "Salt & Smoke", { p: { m: 1, c: 1 }, b: { kapanis: "salt" }, sarki: "salt", sonra: [
            de("ha. the one who left. you're braver than you text", "ha. giden için olan. yazdığından daha cesursun"), { t: "gorev", id: "sarki" }] }),
          s("Play both and let the room decide.", "İkisini de çal, salon karar versin.", { p: { g: 1 }, b: { kapanis: "yok" }, sonra: [
            de("that's what I always do. that's the problem, boss", "ben de hep bunu yapıyorum. sorun da bu zaten patron"), { t: "gorev", id: "sarki", basarisiz: true }] })
        ], "Which song should Jaxen play?", "Jaxen hangisini çalsın?"),
        de("engineer's asking how I want it tomorrow. just me, or the band behind me", "ses mühendisi yarın nasıl istediğimi soruyor. tek ben mi, arkamda grup mu"),
        secim([
          s("Just you and the guitar.", "Yalnız sen ve gitar.", { p: { m: 1, g: 1 }, b: { duzen: "tek" }, sonra: [
            de("then they'll hear every mistake. good. keeps me awake", "o zaman her hatamı duyarlar. iyi. beni uyanık tutar")] }),
          s("The band. Let it roll.", "Grup. Bırak aksın.", { p: { m: 1, c: 1 }, b: { duzen: "grup" }, sonra: [
            de("the drummer's going to hug you tomorrow", "davulcu yarın sana sarılacak")] }),
          s("Ask the engineer. He knows the room.", "Mühendise sor. Odayı o biliyor.", { p: { g: 1 }, b: { duzen: "muhendis" }, sonra: [
            de("he says thanks. and that nobody ever asks him", "teşekkür ediyor. bir de ona hiç kimsenin sormadığını söylüyor")] })
        ], "Tomorrow's arrangement", "Yarının düzenlemesi"),
        mekan("studyo", true),
        foto("jaxen_studyo"),
        de("soundcheck. this is where I'd play it for you, if you were here", "ses provası. burada olsaydın sana tam şurada çalardım"),
        secim([
          s("Play it anyway. I'm listening.", "Yine de çal. Dinliyorum.", { p: { g: 1, m: 1 }, b: { prova: "cal" }, y: "kayit", sonra: [
            de("then this take's yours. nobody else gets this one", "o zaman bu kayıt senin. bunu başka kimse duymayacak")] }),
          // flört denemesi: karşılık ancak Jaxen kabul ederse (güven ≥ 3)
          s("Save me the chair. I want to watch you play it.", "Bana bir sandalye ayır. Onu çalarken seni izlemek istiyorum.", { p: { c: 1 }, b: { prova: "sandalye" }, sonra: [
            { t: "olc", enaz: { g: 3 }, bayrak: { flort: "evet" }, yoksa: { flort: "hayir" } },
            eger({ flort: "evet" }, de("the good chair, by the window. it's yours. …I'll play better knowing it's taken", "iyi sandalye, pencerenin yanındaki. senin. …dolu olduğunu bilince daha iyi çalarım")),
            eger({ flort: "hayir" }, de("ha. easy now. let me get through soundcheck first, then we'll see about chairs", "ha. yavaş ol. önce provayı bitireyim, sandalye işine sonra bakarız"))] }),
          s("Eyes on your soundcheck, Moon.", "Sen provana bak Moon.", { p: { c: 1 }, b: { prova: "is" }, sonra: [
            de("yes boss. …you smiled when you typed that. I can tell", "emredersin patron. …bunu yazarken gülümsedin. anlıyorum")] })
        ]),
        anlati("Through the phone you hear him tune one string, then another, humming under his breath.", "Telefondan bir teli, sonra öbürünü akort ettiğini duyuyorsun; dudaklarının arasından bir şey mırıldanıyor."),
        de("sorry. tuning. it's the only thing I do on time", "pardon. akort. vaktinde yaptığım tek şey bu"),
        de("the engineer lit candles. his idea, not mine. want to see?", "ses mühendisi mum yaktı. onun fikri, benim değil. görmek ister misin?"),
        { t: "kilitli", k: K, f: "medya/jaxen_mum.jpg" },
        { t: "konus", k: K },
        { t: "git", d: "kita" }
      ],

      kita: [
        anlati("Soundcheck ends. The engineer starts coiling cables. Jaxen stays on his stool.", "Prova bitiyor. Ses mühendisi kabloları sarmaya başlıyor. Jaxen taburesinde kalıyor."),
        de("you know what I like about tonight? nobody's asked me to be on time for the last hour", "bu geceyi neden sevdim biliyor musun? son bir saattir kimse benden vaktinde olmamı istemedi"),
        de("my grandfather used to say a song's finished when you stop being able to make it worse", "dedem derdi ki, bir şarkı artık onu daha kötü yapamadığın zaman biter"),
        de("one more thing. I wrote a new verse on the walk here. it's got today in it", "bir şey daha. buraya yürürken yeni bir kıta yazdım. içinde bugün var"),
        de("keep it, or cut it?", "kalsın mı, çıkarayım mı?"),
        secim([
          s("Keep it. Today deserves a verse.", "Kalsın. Bugün bir kıtayı hak ediyor.", { p: { g: 2 }, b: { kita: "kalsin" }, sonra: [
            de("then it stays. you're in it, by the way. the part about the map", "o zaman kalıyor. bu arada içinde sen de varsın. harita kısmında")] }),
          s("Cut it. The song is about the tide, not about tonight.", "Çıkar. Şarkı bu geceyle değil, gelgitle ilgili.", { p: { m: 2 }, b: { kita: "cikar" }, sonra: [
            de("ouch. and right. that's why I asked you", "ah. ve haklısın. sana bu yüzden sordum")] }),
          s("That's your call, not mine.", "Buna ben değil, sen karar verirsin.", { p: { c: 1 }, b: { kita: "sen" }, sonra: [
            de("I was hoping you wouldn't say that", "bunu söylemeyeceğini umuyordum")] })
        ]),
        de("alright. that's the song, the sound and the verse. look at us, deciding things", "tamam. şarkı, düzen ve kıta. bak bize, kararlar veriyoruz"),
        de("the engineer says come by tomorrow before doors. he's got a spare lanyard with your name misspelled on it",
           "ses mühendisi yarın kapılar açılmadan uğra diyor. üstünde adın yanlış yazılmış bir yaka kartı varmış"),
        ben("How is it misspelled?", "Nasıl yanlış yazılmış?"),
        de("badly. you'll love it", "kötü. bayılacaksın"),
        { t: "karar",
          yollar: [
            { bayrak: { kapanis: "tide", prova: "cal", kita: "kalsin" }, enaz: { g: 4 }, git: "son_gizli" },
            { bayrak: { kapanis: ["tide", "salt"] }, enaz: { g: 5 }, toplam: 12, git: "son_yuksek" },
            { bayrak: { kapanis: ["tide", "salt"] }, git: "son_orta" }
          ],
          yoksa: "son_dusuk" }
      ],

      son_dusuk: [
        de("I'll text you the title in the morning. probably. if I can choose", "sabah sana şarkının adını yazarım. herhalde. seçebilirsem"),
        de("don't be mad. I'm told it's part of my charm", "kızma. cazibemin bir parçası olduğunu söylüyorlar"),
        anlati("Midnight passes. His line on your list is still empty.", "Gece yarısı geçiyor. Listendeki satırı hâlâ boş."),
        { t: "son", id: "dusuk" }
      ],
      son_orta: [
        de("locked. write it down before I change my mind. see you tomorrow, boss", "karar verildi. ben fikrimi değiştirmeden yaz. yarın görüşürüz patron"),
        anlati("He sends one last photo: the studio door, half open, a light still on.", "Son bir fotoğraf gönderiyor: stüdyonun kapısı, yarı açık, içeride bir ışık hâlâ yanıyor."),
        { t: "son", id: "orta" }
      ],
      son_yuksek: [
        foto("jaxen_gece"),
        de("locked. and tomorrow there's a chair by the window with your name on it", "karar verildi. yarın da pencerenin yanında, üstünde adın yazan bir sandalye olacak"),
        de("best seat in the house. you earned it somewhere around the bakery", "salonun en iyi yeri. onu fırının oralarda bir yerde hak ettin"),
        { t: "son", id: "yuksek" }
      ],
      son_gizli: [
        foto("jaxen_mum"),
        anlati("After the soundcheck. The engineer has gone home. The candles are still lit.", "Provadan sonra. Ses mühendisi evine gitti. Mumlar hâlâ yanıyor."),
        de("you kept the verse. so you get to hear where it's going. nobody's heard this one yet", "kıtayı tuttun. o zaman nereye gittiğini de duy. bunu daha kimse dinlemedi"),
        sarki("jaxen_wild"),
        de("Wild Thing, Slow Fire. that one's for the people who help me find the street", "Wild Thing, Slow Fire. bu, sokağı bulmama yardım edenler için"),
        { t: "son", id: "gizli" }
      ]
    }
  };
})(typeof window !== "undefined" ? window : this);
