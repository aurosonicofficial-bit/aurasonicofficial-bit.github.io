// BACKSTAGE / KULİS — Bölüm 1: "Gösteriden Önceki Gece"
// Karakterler Aura Sonic sanatçıları; çalan şarkılar gerçek kayıtların kesitleri (medya_hazirla.py).
// Her metin iki dilde yazılır: L(İngilizce, Türkçe). {ad} = oyuncunun adı, {s:jaxen} = oyuncunun Jaxen için seçtiği şarkı.
(function (kok) {
  "use strict";
  var L = function (en, tr) { return { en: en, tr: tr }; };
  var anlati = function (en, tr) { return { t: "anlati", m: L(en, tr) }; };
  var de = function (k, en, tr) { return { t: "gelen", k: k, m: L(en, tr) }; };
  var ben = function (en, tr) { return { t: "giden", m: L(en, tr) }; };
  var foto = function (k, f) { return { t: "foto", k: k, f: "medya/" + f + ".jpg" }; };
  var sarki = function (s) { return { t: "sarki", s: s }; };
  var sohbet = function (k, en, tr) { return { t: "sohbet", k: k, bildirim: en ? L(en, tr) : null }; };
  var eger = function (kosul, adim) { adim.eger = kosul; return adim; };   // önceki seçime bağlı adım
  var durum = function (k, en, tr) { return { t: "durum", k: k, m: L(en, tr) }; };
  var secim = function (secenekler, soruEn, soruTr) { return { t: "secim", s: secenekler, soru: soruEn ? L(soruEn, soruTr) : null }; };
  // seçenek: metin, ek = { p: {karakter: puan}, b: {bayrak: değer}, sonra: [adımlar], git: "düğüm", sessiz: true }
  var s = function (en, tr, ek) { var o = { m: L(en, tr) }; for (var k in (ek || {})) o[k] = ek[k]; return o; };

  kok.BOLUM = {
    id: "b1",
    baslangic: "giris",
    oyun: L("BACKSTAGE", "KULİS"),
    altbaslik: L("An Aura Sonic story", "Bir Aura Sonic hikâyesi"),
    baslik: L("Episode 1 — The Night Before", "Bölüm 1 — Gösteriden Önceki Gece"),
    tanitim: L(
      "Your first day at a record label. Three artists. Three songs by midnight. One of them never answers.",
      "Bir plak şirketinde ilk günün. Üç sanatçı. Gece yarısına kadar üç şarkı. Biri hiç cevap vermez."),
    sonraki: L("Episode 2 — Row Two", "Bölüm 2 — İkinci Sıra"),
    varsayilanAd: L("Sam", "Deniz"),
    gorevSirasi: ["maria", "jaxen", "kael"],

    kanallar: {
      hq: { ad: L("Aura Sonic HQ", "Aura Sonic Merkez"), simge: "AS", renk: "#9aa3b2", durum: L("label office", "şirket merkezi") },
      maria: { ad: L("Maria Mel", "Maria Mel"), avatar: "medya/maria_av.jpg", renk: "#35b783", durum: L("online", "çevrimiçi") },
      jaxen: { ad: L("Jaxen Moon", "Jaxen Moon"), avatar: "medya/jaxen_av.jpg", renk: "#e0a04a", durum: L("online", "çevrimiçi") },
      kael: { ad: L("Kael Voss", "Kael Voss"), avatar: "medya/kael_av.jpg", renk: "#cf5563", durum: L("last seen Saturday", "son görülme cumartesi") },
      kilit: { ad: L("11:58 PM", "23:58"), simge: "🔒", renk: "#9aa3b2", durum: L("lock screen", "kilit ekranı") }
    },

    sarkilar: {
      cry: { k: "maria", ad: "I Won't Cry Anymore", dosya: "medya/cry.mp3" },
      tide: { k: "jaxen", ad: "Stay Until the Tide", dosya: "medya/tide.mp3" },
      salt: { k: "jaxen", ad: "Salt & Smoke", dosya: "medya/salt.mp3" },
      echo: { k: "kael", ad: "Echo of You", dosya: "medya/echo.mp3" }
    },

    dugumler: {

      // ───────────────────────── 18:42 — görev
      giris: [
        sohbet("hq"),
        anlati("Monday, 6:42 PM. Your first day at Aura Sonic Records ended an hour ago. Nobody told your phone.",
               "Pazartesi, 18:42. Aura Sonic Records'taki ilk günün bir saat önce bitti. Telefonunun bundan haberi yok."),
        de("hq", "Welcome aboard, {ad}. I hope today was gentle, because tonight won't be.",
                 "Aramıza hoş geldin {ad}. Umarım gün sakin geçmiştir, çünkü gece öyle geçmeyecek."),
        de("hq", "Tomorrow night is the label showcase. Three artists, one stage, a room full of press.",
                 "Yarın gece şirketin tanıtım konseri var. Üç sanatçı, tek sahne, salon dolusu basın."),
        de("hq", "Each of them has to lock ONE song by midnight: Maria Mel, Jaxen Moon, Kael Voss.",
                 "Üçünün de gece yarısına kadar TEK şarkıda karar kılması gerekiyor: Maria Mel, Jaxen Moon, Kael Voss."),
        de("hq", "Maria will answer. Jaxen will answer late. Kael won't answer.",
                 "Maria cevap verir. Jaxen geç cevap verir. Kael cevap vermez."),
        de("hq", "Get me three titles. That's the whole job.",
                 "Bana üç şarkı adı getir. İşin tamamı bu."),
        secim([
          s("Three titles by midnight. On it.", "Gece yarısına kadar üç şarkı. Hallediyorum.", { sonra: [
            de("hq", "That's what I like to hear.", "İşte duymak istediğim cevap.")] }),
          s("And if Kael doesn't answer?", "Peki Kael cevap vermezse?", { sonra: [
            de("hq", "Then you'll be the fourth coordinator this year who couldn't get him to. No pressure.",
                     "O zaman bu yıl ondan cevap alamayan dördüncü koordinatör olursun. Baskı yok.")] }),
          s("Is it always like this?", "Burada işler hep böyle mi?", { sonra: [
            de("hq", "No. Usually it's worse. 🙂", "Hayır. Genelde daha kötü. 🙂")] })
        ]),
        anlati("You haven't even put the phone down when it lights up again.",
               "Telefonu daha elinden bırakmadan ekran yeniden yanıyor."),
        { t: "git", d: "maria1" }
      ],

      // ───────────────────────── 18:50 — Maria
      maria1: [
        sohbet("maria", "So YOU'RE the new one. 👀", "Demek yeni gelen SENSİN. 👀"),
        de("maria", "So YOU'RE the new one. 👀", "Demek yeni gelen SENSİN. 👀"),
        de("maria", "I'm Maria. I'm the one who will actually reply to your messages, so remember me kindly.",
                    "Ben Maria. Mesajlarına gerçekten cevap verecek tek kişi benim, o yüzden beni iyi hatırla."),
        de("maria", "Let me guess — they gave you The List. Three songs by midnight?",
                    "Dur tahmin edeyim — sana Liste'yi verdiler. Gece yarısına kadar üç şarkı?"),
        secim([
          s("Is it that obvious?", "O kadar belli mi?", { p: { maria: 1 }, sonra: [
            de("maria", "Darling, everyone gets The List on day one. It's a hazing ritual with paperwork.",
                        "Canım, ilk gün herkese Liste verilir. Evrak işiyle yapılan bir çaylak şakası.")] }),
          s("I'm not supposed to discuss internal tasks.", "Şirket içi görevleri konuşmamam gerekiyor.", { sonra: [
            de("maria", "Oh, a professional. We'll fix that. 😌", "Ooo, kuralcıymışız. Onu hallederiz. 😌")] }),
          s("Yes. Please tell me you've already chosen.", "Evet. Lütfen çoktan seçtiğini söyle.", { p: { maria: 1 }, sonra: [
            de("maria", "I chose three weeks ago. I'm the easy one. Enjoy me while it lasts.",
                        "Ben üç hafta önce seçtim. Kolay olan benim. Tadını çıkar.")] })
        ]),
        de("maria", "I'm getting ready for the press dinner. Tell me the truth.",
                    "Basın yemeğine hazırlanıyorum. Bana doğruyu söyle."),
        foto("maria", "maria_ayna"),
        de("maria", "Too much for a Monday?", "Pazartesi akşamı için fazla mı?"),
        secim([
          s("There's no such thing as too much on you.", "Sende 'fazla' diye bir şey olmaz.", { p: { maria: 2 }, sonra: [
            de("maria", "Careful. I keep the people who talk like that.", "Dikkat et. Böyle konuşanları yanımda tutarım.")] }),
          s("It's perfect. Nobody in that room will look at anyone else.", "Kusursuz. Salonda kimse başkasına bakamayacak.", { p: { maria: 1 }, sonra: [
            de("maria", "That's the idea. 💚", "Amaç da o zaten. 💚")] }),
          s("Honestly? The earrings are doing all the talking.", "Açık konuşayım mı? Bütün işi küpeler yapıyor.", { p: { maria: 1 }, sonra: [
            de("maria", "FINALLY someone notices the earrings. You can stay.", "NİHAYET küpeleri fark eden biri. Kalabilirsin.")] })
        ]),
        de("maria", "That's for dinner. The stage is another question.", "Bu yemek için. Sahne başka mesele."),
        foto("maria", "maria_siyah"),
        de("maria", "The black one, from the album shoot. Green or black tomorrow? You have ten seconds.",
                    "Siyah olan, albüm çekiminden. Yarın yeşil mi siyah mı? On saniyen var."),
        secim([
          s("Black. The front rows won't recover.", "Siyah. Ön sıralar toparlanamaz.", { p: { maria: 1 }, b: { elbise: "siyah" }, sonra: [
            foto("maria", "maria_siyah_yakin"),
            de("maria", "Then this is the face they get.", "O zaman karşılarında bu yüzü görecekler.")] }),
          s("Green. You look like yourself in it.", "Yeşil. Onun içinde kendin gibisin.", { p: { maria: 2 }, b: { elbise: "yesil" }, sonra: [
            foto("maria", "maria_kupe"),
            de("maria", "…Nobody has said that to me in a while. Green it is.", "…Bunu bana epeydir kimse söylememişti. Yeşil olsun.")] })
        ], "Which dress for the stage?", "Sahnede hangi elbise?"),
        de("maria", "Alright, business. My song for tomorrow:", "Neyse, işimize bakalım. Yarınki şarkım:"),
        sarki("cry"),
        de("maria", "I didn't write that one. I survived it. Two years ago I couldn't get through the second verse without my voice breaking.",
                    "O şarkıyı yazmadım. O şarkıyı atlattım. İki yıl önce ikinci kıtaya gelince sesim titrer, bitiremezdim."),
        de("maria", "Tomorrow I'm singing it in front of the man it's about. He'll be in row two. He doesn't know that I know.",
                    "Yarın onu, bana o şarkıyı yazdıran adamın önünde söyleyeceğim. İkinci sırada oturacak. Bildiğimi bilmiyor."),
        secim([
          s("Then sing it straight at row two.", "O zaman gözünü ikinci sıradan ayırmadan söyle.", { p: { maria: 2 }, sonra: [
            de("maria", "…Oh, I like you. That's exactly what I'm going to do.", "…Seni sevdim. Aynen öyle yapacağım."),
            foto("maria", "maria_bakis"),
            de("maria", "With this look. I've had it ready since the album shoot.", "Şu bakışla. Albüm çekiminden beri hazır.")] }),
          s("Are you sure you want that on a night like tomorrow?", "Yarın gibi bir gecede bunu istediğine emin misin?", { sonra: [
            de("maria", "No. That's exactly why it has to be tomorrow.", "Değilim. Tam da bu yüzden yarın olmak zorunda.")] }),
          s("Who is he?", "Kim o?", { p: { maria: 1 }, sonra: [
            de("maria", "Ask me after the second glass of wine. Not before.", "İkinci kadehten sonra sor. Önce olmaz.")] })
        ]),
        de("maria", "Put it on your list: I Won't Cry Anymore. One down.", "Listene yaz: I Won't Cry Anymore. Biri tamam."),
        { t: "gorev", k: "maria", s: "cry" },
        de("maria", "Now, free advice — because I've decided you're mine.",
                    "Şimdi sana bedava tavsiye — çünkü seni sahiplenmeye karar verdim."),
        de("maria", "Jaxen will say yes to everything and choose nothing. Make him pick. He'll thank you.",
                    "Jaxen her şeye evet der, hiçbirini seçmez. Ona sen seçtir. Sonra teşekkür eder."),
        de("maria", "And Kael…", "Kael'e gelince…"),
        de("maria", "Kael hasn't left his hotel room in two days. Don't take the silence personally. Nobody's had a full sentence out of him since the album.",
                    "Kael iki gündür otel odasından çıkmıyor. Sessizliğini üstüne alınma. Albümden beri kimse ondan tam bir cümle alamadı."),
        secim([
          s("What happened with the album?", "Albümde ne oldu?", { sonra: [
            de("maria", "Not my story to tell. But listen to Echo of You before you text him. Really listen.",
                        "Anlatmak bana düşmez. Ama ona yazmadan önce Echo of You'yu dinle. Gerçekten dinle.")] }),
          s("I'll get a sentence out of him.", "Ben ondan o cümleyi alırım.", { p: { maria: 1 }, sonra: [
            de("maria", "Ha! I'd bet my earrings you won't. …Actually, no. Not the earrings.",
                        "Ha! Alamayacağına küpelerim üzerine bahse girerim. …Yok, vazgeçtim. Küpeler olmaz.")] })
        ]),
        de("maria", "My car's here. Go get your songs, {ad}. And report back. I want EVERYTHING.",
                    "Arabam geldi. Git şarkılarını topla {ad}. Sonra bana rapor ver. HER ŞEYİ bilmek istiyorum."),
        foto("maria", "maria_teras"),
        anlati("7:15 PM. One down. You text Jaxen Moon. You text Kael Voss. One of them answers.",
               "19:15. Biri tamam. Jaxen Moon'a yazıyorsun. Kael Voss'a yazıyorsun. Biri cevap veriyor."),
        { t: "git", d: "jaxen1" }
      ],

      // ───────────────────────── 19:15 — Jaxen
      jaxen1: [
        sohbet("jaxen", "hey {ad}! welcome to the family", "selam {ad}! aileye hoş geldin"),
        ben("Hi Jaxen, this is {ad}, the new coordinator at Aura Sonic. I need your final song for tomorrow's showcase by midnight.",
            "Merhaba Jaxen, ben {ad}, Aura Sonic'in yeni koordinatörü. Yarınki konser için seçtiğin şarkıyı gece yarısına kadar almam gerekiyor."),
        de("jaxen", "hey {ad}! welcome to the family", "selam {ad}! aileye hoş geldin"),
        de("jaxen", "funny thing", "komik bir durum var"),
        de("jaxen", "I'm supposed to be at the studio right now and I think I've been walking the opposite way",
                    "şu an stüdyoda olmam gerekiyordu ama galiba ters yöne yürüyorum"),
        foto("jaxen", "jaxen_arkadan"),
        de("jaxen", "does this look like Alder Street to you", "sence burası Alder Sokağı'na benziyor mu"),
        secim([
          s("That is definitely not Alder Street.", "Orası kesinlikle Alder Sokağı değil.", { p: { jaxen: 1 }, sonra: [
            de("jaxen", "yeah, the street agreed with you about four blocks ago", "evet, sokak da dört blok önce seninle aynı fikirdeydi"),
            foto("jaxen", "jaxen_tabela"),
            de("jaxen", "this is my reading-street-signs face", "bu benim tabela okuma yüzüm")] }),
          s("Send me your location. I'll get you there.", "Konumunu gönder. Seni oraya ben götürürüm.", { p: { jaxen: 2 }, sonra: [
            de("jaxen", "see, this is why they hired you. ten minutes in and I'm already less lost",
                        "işte seni bu yüzden işe almışlar. on dakikadır varsın, şimdiden daha az kaybolmuş hissediyorum"),
            foto("jaxen", "jaxen_yuruyus"),
            de("jaxen", "walking. tell me when to turn", "yürüyorum. nerede döneceğimi söyle")] }),
          s("The studio had you booked for 7. It's 7:15.", "Stüdyo seni 19:00'a yazmış. Saat 19:15.", { sonra: [
            de("jaxen", "the songs don't know what time it is and neither do I. but point taken, boss",
                        "şarkılar saati bilmez, ben de bilmem. ama haklısın patron"),
            foto("jaxen", "jaxen_duvar"),
            de("jaxen", "standing still until you tell me where to go", "sen yolu söyleyene kadar yerimden kıpırdamıyorum")] })
        ]),
        anlati("You open the map and talk him through it. Left at the bakery. Past the mural. He introduces you to every dog he meets on the way.",
               "Haritayı açıp ona yolu tarif ediyorsun. Fırından sola. Duvar resmini geç. Yolda karşılaştığı her köpeği sana tek tek tanıtıyor."),
        de("jaxen", "found it. you're good at this", "buldum. bu işte iyisin"),
        foto("jaxen", "jaxen_sokak"),
        de("jaxen", "so. one song. that's the cruel part", "evet. tek şarkı. işin acımasız kısmı bu"),
        de("jaxen", "I've got two and they won't stop arguing", "elimde iki tane var ve kavga etmeyi bırakmıyorlar"),
        de("jaxen", "this one's the ocean talking", "bu, denizin konuştuğu"),
        sarki("tide"),
        { t: "dur" },
        de("jaxen", "and this one's the fire answering", "bu da ateşin cevabı"),
        sarki("salt"),
        { t: "dur" },
        de("jaxen", "I wrote Tide for someone who stayed. I wrote Salt & Smoke for someone who didn't.",
                    "Tide'ı kalan biri için yazdım. Salt & Smoke'u kalmayan biri için."),
        de("jaxen", "you pick. I trust first-day ears. they haven't learned to be polite yet",
                    "sen seç. ilk gün kulaklarına güvenirim. henüz kibar olmayı öğrenmemişlerdir"),
        secim([
          s("Stay Until the Tide. Let the room breathe.", "Stay Until the Tide. Salon bir nefes alsın.", { p: { jaxen: 2 }, b: { jaxen: "tide" }, sonra: [
            de("jaxen", "the one who stayed. alright. …that says something nice about you",
                        "kalan için olan. peki. …bu senin hakkında güzel bir şey söylüyor")] }),
          s("Salt & Smoke. Leave them a little burned.", "Salt & Smoke. Salonu biraz yanık bırak.", { p: { jaxen: 2 }, b: { jaxen: "salt" }, sonra: [
            de("jaxen", "ha. the one who left. you're braver than you text", "ha. giden için olan. yazdığından daha cesursun")] })
        ], "Which song should Jaxen play?", "Jaxen hangisini çalsın?"),
        de("jaxen", "locked. write it down before I change my mind", "karar verildi. ben fikrimi değiştirmeden yaz"),
        { t: "gorev", k: "jaxen", bayrak: "jaxen" },
        eger({ jaxen: "tide" }, foto("jaxen", "jaxen_studyo")),
        eger({ jaxen: "tide" }, de("jaxen", "last of the daylight. it suits the song", "günün son ışığı. şarkıya yakışıyor")),
        eger({ jaxen: "salt" }, foto("jaxen", "jaxen_mum")),
        eger({ jaxen: "salt" }, de("jaxen", "the candles are the engineer's idea. but they suit the song", "mumlar ses mühendisinin fikri. ama şarkıya yakışıyor")),
        de("jaxen", "soundcheck. this is where I'd play it for you, if you were here",
                    "ses provası. burada olsaydın sana tam şurada çalardım"),
        secim([
          s("Play it anyway. I'm listening.", "Yine de çal. Dinliyorum.", { p: { jaxen: 2 }, sonra: [
            de("jaxen", "then this take's yours", "o zaman bu kayıt senin"),
            eger({ jaxen: "tide" }, foto("jaxen", "jaxen_mum")),
            eger({ jaxen: "salt" }, foto("jaxen", "jaxen_studyo")),
            de("jaxen", "second take. nobody else gets this one", "ikinci kayıt. bunu başka kimse duymayacak")] }),
          s("Maybe tomorrow I will be.", "Belki yarın orada olurum.", { p: { jaxen: 1 }, sonra: [
            de("jaxen", "I'll save you the good chair. the one by the window", "sana iyi sandalyeyi ayırırım. pencerenin yanındakini")] }),
          s("Eyes on your soundcheck, Moon.", "Sen provana bak Moon.", { p: { jaxen: 1 }, sonra: [
            de("jaxen", "yes boss. …you smiled when you typed that. I can tell", "emredersin patron. …bunu yazarken gülümsedin. anlıyorum")] })
        ]),
        de("jaxen", "hey. you texted Kael yet?", "bu arada. Kael'e yazdın mı?"),
        ben("Two hours ago. Nothing.", "İki saat önce. Ses yok."),
        de("jaxen", "go easy on him. he's not cold. he's just been somewhere else since she left. the songs are the only door in",
                    "üstüne gitme. soğuk biri değil. o gittiğinden beri aklı başka yerde, o kadar. ona açılan tek kapı şarkıları"),
        sohbet("maria", "Report. Now.", "Rapor. Hemen."),
        de("maria", "Report. Now.", "Rapor. Hemen."),
        foto("maria", "maria_araba"),
        de("maria", "Rain, traffic, and a driver who hates my playlist. Did Jaxen choose?",
                    "Yağmur, trafik ve çalma listemden nefret eden bir şoför. Jaxen seçti mi?"),
        ben("{s:jaxen}. Locked.", "{s:jaxen}. Karar verildi."),
        de("maria", "I'm impressed. And Kael?", "Etkilendim. Peki Kael?"),
        secim([
          s("Nothing. Two hours of “Delivered”.", "Hiç. İki saattir “İletildi”.", { sonra: [
            de("maria", "Don't ask him for the song. Ask him about anything else. The rain, even.",
                        "Ondan şarkıyı isteme. Başka ne olursa onu sor. Yağmuru bile.")] }),
          s("I'm about to try again.", "Şimdi bir daha deneyeceğim.", { p: { maria: 1 }, sonra: [
            de("maria", "Brave. Don't open with the deadline. He's allergic to deadlines.",
                        "Cesursun. Söze son saatle girme. Son saatlere alerjisi var.")] })
        ]),
        anlati("9:40 PM. Two down. Your message to Kael Voss has said “Delivered” for two hours and twenty-five minutes. Outside, it starts to rain.",
               "21:40. İkisi tamam. Kael Voss'a yazdığın mesajın altında iki saat yirmi beş dakikadır “İletildi” yazıyor. Dışarıda yağmur başlıyor."),
        { t: "git", d: "kael1" }
      ],

      // ───────────────────────── 21:40 — Kael
      kael1: [
        sohbet("kael"),
        ben("Hi Kael, this is {ad}, the new coordinator at Aura Sonic. I need your song for tomorrow by midnight.",
            "Merhaba Kael, ben {ad}, Aura Sonic'in yeni koordinatörü. Yarınki şarkını gece yarısına kadar almam gerekiyor."),
        anlati("Delivered · 7:15 PM", "İletildi · 19:15"),
        secim([
          s("A reminder, Mr. Voss: I need your song by midnight.", "Hatırlatma, Bay Voss: şarkınızı gece yarısına kadar almam gerekiyor.", { b: { k1: "hatirlat" }, sonra: [
            durum("kael", "online", "çevrimiçi"),
            de("kael", "No.", "Hayır."),
            ben("No, you haven't chosen — or no, you won't play?", "Hayır, seçmedin mi — yoksa hayır, çalmayacak mısın?"),
            de("kael", "Pick one.", "Birini seç.")] }),
          s("I listened to Echo of You tonight. Twice.", "Bu akşam Echo of You'yu dinledim. İki kere.", { p: { kael: 2 }, b: { k1: "iki" }, sonra: [
            durum("kael", "online", "çevrimiçi"),
            de("kael", "Why twice.", "Neden iki kere."),
            ben("The first time I was listening to the song. The second time I was listening to you.",
                "İlkinde şarkıyı dinliyordum. İkincisinde seni."),
            de("kael", "That's a dangerous thing to say to a stranger.", "Bir yabancıya söylemek için tehlikeli bir cümle."),
            foto("kael", "kael_masa"),
            de("kael", "I've been at this table with it since Saturday.", "Cumartesiden beri bu masada, o şarkıyla oturuyorum.")] }),
          s("It's raining on your side of the city too, isn't it?", "Şehrin senin tarafında da yağmur yağıyor, değil mi?", { p: { kael: 1 }, b: { k1: "yagmur" }, sonra: [
            durum("kael", "online", "çevrimiçi"),
            de("kael", "It's been raining here for two days.", "Burada iki gündür yağıyor."),
            foto("kael", "kael_pencere"),
            de("kael", "See for yourself.", "Kendin gör."),
            ben("Maria said you haven't left the room.", "Maria odadan çıkmadığını söyledi."),
            de("kael", "Maria says many things.", "Maria çok şey söyler.")] })
        ], "Break the silence", "Sessizliği boz"),
        de("kael", "So you're the new coordinator.", "Demek yeni koordinatör sensin."),
        de("kael", "They send a new one every few months. Every one of them wants a title by midnight.",
                   "Birkaç ayda bir yenisini gönderirler. Hepsi gece yarısına kadar bir şarkı adı ister."),
        eger({ k1: ["hatirlat", "iki"] }, foto("kael", "kael_pencere")),
        eger({ k1: ["hatirlat", "iki"] }, de("kael", "That's the view. It's the only thing in this city that isn't asking me for something.",
                   "Manzara bu. Bu şehirde benden bir şey istemeyen tek şey.")),
        eger({ k1: "yagmur" }, de("kael", "That window is the only thing in this city that isn't asking me for something.",
                   "O pencere, bu şehirde benden bir şey istemeyen tek şey.")),
        secim([
          s("I'm not asking for a title. I'm asking which song you can bear to sing.",
            "Senden şarkı adı istemiyorum. Hangi şarkıyı söylemeye dayanabileceğini soruyorum.", { p: { kael: 2 }, sonra: [
            de("kael", "…That's a different question.", "…Bu başka bir soru.")] }),
          s("It's a beautiful view. A lonely one.", "Güzel bir manzara. Ama yalnız.", { p: { kael: 1 }, sonra: [
            de("kael", "Lonely is quiet. I've made my peace with quiet.", "Yalnızlık sessizdir. Ben sessizlikle barıştım.")] }),
          s("I still need the title, Kael.", "Yine de o adı almam gerek Kael.", { sonra: [
            de("kael", "At least you're honest about it.", "En azından dürüstsün.")] })
        ]),
        de("kael", "They want Echo of You. The single. The one everybody films on their phones.",
                   "Echo of You'yu istiyorlar. Çıkış şarkısını. Herkesin telefonla çektiği şarkıyı."),
        sarki("echo"),
        de("kael", "“You're just an echo now.” I wrote that line in one take. I've had to mean it three hundred times since.",
                   "“You're just an echo now.” O dizeyi tek seferde yazdım. O günden beri üç yüz kere inanarak söylemek zorunda kaldım."),
        de("kael", "Tomorrow she'll be in that room. Second row. With him.", "Yarın o da o salonda olacak. İkinci sırada. Onunla birlikte."),
        de("kael", "So no. I don't have a title for you.", "Yani hayır. Sana verecek bir şarkı adım yok."),
        secim([
          s("Then don't sing it to her. Sing it to the three hundred people who needed it.",
            "O zaman ona söyleme. O şarkıya ihtiyacı olan üç yüz kişiye söyle.", { p: { kael: 2 }, sonra: [
            de("kael", "…", "…"),
            de("kael", "Nobody has put it that way.", "Kimse böyle söylememişti.")] }),
          s("Then play something else. I'll handle the label.", "O zaman başka bir şarkı çal. Şirketle ben uğraşırım.", { p: { kael: 2 }, sonra: [
            de("kael", "You'd pick that fight on your first day?", "İlk gününde bu kavgaya girer misin?"),
            ben("It's already my first day. I might as well make it count.", "Zaten ilk günüm. Bari bir işe yarasın."),
            de("kael", "Hm.", "Hm.")] }),
          s("You wrote it. You decide what it means now.", "Onu sen yazdın. Artık ne anlama geldiğine de sen karar verirsin.", { p: { kael: 1 }, sonra: [
            de("kael", "The last coordinator said the same. You typed it like you believe it.",
                       "Önceki koordinatör de aynısını söylemişti. Sen inanarak yazmışsın.")] })
        ]),
        de("kael", "It's almost eleven. You have your other two. Why are you still here?",
                   "Saat on bire geliyor. Diğer ikisini aldın. Neden hâlâ buradasın?"),
        secim([
          s("Because you answered.", "Çünkü cevap verdin.", { p: { kael: 2 }, sonra: [
            de("kael", "…Fair.", "…Haklısın."),
            foto("kael", "kael_koridor"),
            de("kael", "I walked the corridor. First time in two days. Your fault.", "Koridora çıktım. İki gün sonra ilk kez. Senin yüzünden.")] }),
          s("Because it's my job.", "Çünkü işim bu.", { sonra: [
            de("kael", "Then you're better at it than the others.", "O zaman bu işi diğerlerinden iyi yapıyorsun.")] }),
          s("Because nobody should be alone with that song tonight.", "Çünkü bu gece kimse o şarkıyla yalnız kalmamalı.", { p: { kael: 2 }, sonra: [
            de("kael", "Careful, {ad}.", "Dikkat et {ad}."),
            de("kael", "I might start answering your messages.", "Mesajlarına cevap vermeye başlayabilirim."),
            foto("kael", "kael_oda"),
            de("kael", "This is what alone with that song looks like.", "O şarkıyla yalnız kalmak böyle bir şey.")] })
        ]),
        { t: "kilitli", k: "kael", f: "medya/kael_karanlik.jpg" },
        de("kael", "Proof of life. For your report.", "Hayatta olduğumun kanıtı. Raporuna eklersin."),
        de("kael", "Echo of You.", "Echo of You."),
        de("kael", "Put it on your list. I'll sing it. Once.", "Listene yaz. Söyleyeceğim. Bir kere."),
        { t: "gorev", k: "kael", s: "echo" },
        de("kael", "One condition. You stand where I can see you. Side of the stage. Not the back of the room.",
                   "Tek şartım var. Seni görebileceğim bir yerde duracaksın. Sahnenin yanında. Salonun arkasında değil."),
        secim([
          s("I'll be there.", "Orada olacağım.", { p: { kael: 2 }, sonra: [
            de("kael", "Good.", "Güzel.")] }),
          s("Is that a condition or a request?", "Bu bir şart mı, yoksa rica mı?", { p: { kael: 1 }, sonra: [
            de("kael", "Find out tomorrow.", "Yarın anlarsın.")] })
        ]),
        anlati("11:52 PM. Three titles. Eight minutes to spare. You send the list to HQ.",
               "23:52. Üç şarkı. Sekiz dakika erken. Listeyi merkeze gönderiyorsun."),
        { t: "git", d: "final" }
      ],

      // ───────────────────────── 23:52 — liste + üç mesaj
      final: [
        sohbet("hq"),
        ben("Maria Mel — I Won't Cry Anymore\nJaxen Moon — {s:jaxen}\nKael Voss — Echo of You",
            "Maria Mel — I Won't Cry Anymore\nJaxen Moon — {s:jaxen}\nKael Voss — Echo of You"),
        de("hq", "…Kael answered?", "…Kael cevap mı verdi?"),
        de("hq", "Who ARE you?", "Sen KİMSİN?"),
        de("hq", "Go to sleep. Tomorrow will be a long night.", "Git uyu. Yarın uzun bir gece olacak."),
        anlati("You put the phone face down. It buzzes. Then again. Then again.",
               "Telefonu ters çevirip bırakıyorsun. Titriyor. Bir daha. Bir daha."),
        sohbet("kilit"),
        { t: "kart", k: "maria", m: L("{ad}. I just saw the seating chart. Row two. Do you know who he's bringing?! CALL ME.",
                                      "{ad}. Oturma planını şimdi gördüm. İkinci sıra. Yanında kimi getiriyor biliyor musun?! ARA BENİ.") },
        { t: "kart", k: "jaxen", m: L("you up? I wrote a new verse tonight. you're in it",
                                      "uyanık mısın? bu gece yeni bir kıta yazdım. içinde sen varsın") },
        { t: "kart", k: "kael", f: "medya/kael_cati.jpg", m: L("The rain stopped. I'm on the roof. Some things I'd rather say than type.",
                                                               "Yağmur dindi. Çatıdayım. Bazı şeyleri yazmak yerine söylemeyi tercih ederim.") },
        anlati("Three messages. One midnight.", "Üç mesaj. Tek gece yarısı."),
        secim([
          s("Maria", "Maria", { p: { maria: 1 }, b: { ilk: "maria" }, sessiz: true, sonra: [
            sohbet("maria"),
            foto("maria", "maria_masa"),
            de("maria", "I'm at the dinner. He's two tables away and he just raised his glass at me. Sit down, {ad}. This will take a while.",
                        "Yemekteyim. İki masa ötede ve az önce bana kadeh kaldırdı. Otur {ad}. Bu uzun sürecek.")] }),
          s("Jaxen", "Jaxen", { p: { jaxen: 1 }, b: { ilk: "jaxen" }, sessiz: true, sonra: [
            sohbet("jaxen"),
            foto("jaxen", "jaxen_gece"),
            de("jaxen", "knew you'd still be up. okay. the first line goes like this", "uyumadığını biliyordum. peki. ilk dize şöyle")] }),
          s("Kael", "Kael", { p: { kael: 1 }, b: { ilk: "kael" }, sessiz: true, sonra: [
            sohbet("kael"),
            foto("kael", "kael_cati"),
            de("kael", "You answered me first.", "Önce bana cevap verdin."),
            de("kael", "Good. Stay on the line.", "Güzel. Hattan ayrılma.")] })
        ], "Who do you answer first?", "Önce kime cevap veriyorsun?"),
        { t: "dur" },
        { t: "son" }
      ]
    }
  };
})(typeof window !== "undefined" ? window : this);
