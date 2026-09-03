// Chapter 3.2.1 – Rotation Matrices (Part 2 of 2)
// Full lesson content - DO NOT SHORTEN

export const ch321p2Content = `# Rotation Matrices - Part 2: Co s rotation matrix dokážeme robit?

## 1. Jedna rotation matrix, ale tri rôzne významy

V prvej časti sme rotation matrix používali na opis orientacie. Ak máme napriklad **Rₛᵦ**, vieme pomocou nej povedat, ako je frame {b} orientovaný vzhľadom na frame {s}. V druhej časti však prichadza velmi dolezita myslienka: ta istá rotation matrix sa da použiť tromi roznymi spôsobmi a podľa kontextu môže matematicka operacia znamenať nieco ine.

Tri pouzitia rotation matrix:

**1. Represent an orientation (opisat orientaciu)**

**2. Change reference frame (zmenit suradnicovu sustavu)**

**3. Rotate a vector or frame (otocit vektor alebo frame)**

Prve už poznáme. Matrix samotna môže opisovať orientáciu jedného frame vzhľadom na druhy. Nove a ovela dôležitéjsie pre tuto lekciu sú body 2 a 3.

Prečo ich vobec potrebujeme rozlišovať? Pretoze robotika je plná rôznych coordinate frames. Kamera vidi svet vo svojom frame, robotické rameno počíta vo svojom frame a mapa miestnosti používa dalsi frame. Niekedy teda potrebujeme ten istý fyzicky objekt iba opísať z iného pohladu. Inokedy však chceme objekt skutočne otocit. Matematika môže vyzerat podobne, ale fyzikálne ide o dve úplne odlišné situácie.

---

## 2. Fyzicky vector a cisla, ktorymi ho opisujeme, nie sú to iste

Toto je základ celej druhej casti.

Predstav si, že stojíš na futbalovom ihrisku a ukazuješ rukou smerom k brane. Tvoja vystretá ruka predstavuje jeden fyzicky vector. Trener stojaci pri postrannej ciare môže povedat: "Ukazuje približne smerom na sever." Ty však môžeš povedat: "Ukazujem presne doprava odo mna."

Tvoja ruka sa medzi tymito dvoma vyrokmi vobec nepohla. Zmenil sa iba coordinate frame, pomocou ktoreho jej smer opisujeme.

V matematike preto musime rozlišovať samotny geometrický vector **p** a jeho coordinates. Ak ho opisujeme pomocou frame {b}, môžeme jeho coordinates označiť **pᵦ**. Ak presne ten istý vector opíšeme pomocou frame {s}, dostaneme **pₛ**.

Moze teda pokojne platit:

**pᵦ = (1, 0, 0)**

a zaroven:

**pₛ = (0, 1, 0)**

Nie je to rozpor. Fyzicky môže ísť o tu istú sipku.

Predstav si auto smerujúce na sever. Ak jeho x̂ᵦ axis znamena "dopredu", smer jazdy je z pohladu auta pᵦ = (1, 0, 0). Ak však mapa používa ŷₛ ako sever, presne ten istý smer je z pohľadu mapy pₛ = (0, 1, 0).

Prečo sú čísla ine? Pretoze čísla vo vektore nehovoria iba "kam vector smeruje". Hovoria koľko z tohto vectora ide pozdĺž jednotlivých osi coordinate frame, ktory práve pouzivame. Ked zmeníme osi, voči ktorym vector meriame, prirodzene sa zmenia aj cisla.

---

## 3. Change of reference frame: objekt necháme na pokoji, zmeníme jeho opis

Teraz prichadza druhe použitie rotation matrix:

**Change reference frame (zmena vztaznej sustavy)**

Predstav si autonómne auto. Auto má svoj body frame {b} a celé mesto alebo mapa má world frame {s}. Senzor auta zisti prekážku a povie, že vector smerujuci k prekazke má v coordinates auta hodnotu **pᵦ**.

Navigacny system však vsetko počíta v world frame {s}. Potrebuje preto odpoveď na otázku: "Dobre, viem, ako tuto prekážku opisuje auto. Ako by ten istý smer opisala mapa?"

Ak poznáme orientation auta **Rₛᵦ**, môžeme vypočítat:

**pₛ = Rₛᵦ · pᵦ**

Prečo práve multiplication rotation matrix? Pretoze pᵦ nam hovori, koľko vectora lezi v smeroch x̂ᵦ, ŷᵦ, ẑᵦ, zatiaľ co Rₛᵦ nam hovori, ako tieto tri smery vyzeraju v coordinate frame {s}. Nasobenim teda v podstate prekladáme jednotlive "kusky" vectora z jazyka {b} do jazyka {s}.

Fyzicky vector sa pritom ani o milimeter nepohol. Prekazka zostala tam, kde bola. Auto zostalo tam, kde bolo. Zmenili sme iba cisla, ktorymi ten istý geometrický smer opisujeme.

To je presne význam change of reference frame.

---

## 4. Prečo matematicky funguje pₛ = Rₛᵦ · pᵦ?

Povedzme, že kamera alebo robot nam da:

**pᵦ = (2, 3, 1)**

Co tieto tri čísla skutočne znamenaju? Znamenaju, že vector je zlozeny ako:

**p = 2 · x̂ᵦ + 3 · ŷᵦ + 1 · ẑᵦ**

Teda "vezmi dva diely smeru x̂ᵦ, tri diely smeru ŷᵦ a jeden diel smeru ẑᵦ".

Lenze my ho chceme opísať pomocou x̂ₛ, ŷₛ, ẑₛ. Rotation matrix Rₛᵦ už obsahuje informaciu o tom, ako vyzeraju x̂ᵦ, ŷᵦ, ẑᵦ v {s}. Preto keď vypočítame Rₛᵦ · pᵦ, matrix multiplication automaticky vytvorí kombinaciu 2 · x̂ᵦ + 3 · ŷᵦ + 1 · ẑᵦ, pricom jednotlive body axes sú už zapisane pomocou coordinates {s}.

Preto vysledkom sú presne coordinates **pₛ**.

Takze rotation matrix tu môžeš chapat ako prekladac coordinate languages. Dostane vetu napisanu pomocou x̂ᵦ, ŷᵦ, ẑᵦ a prepise ju pomocou x̂ₛ, ŷₛ, ẑₛ, pricom fyzicky význam vety zostane rovnaky.

---

## 5. Subscript cancellation - ako vediet, ktoru matrix pouzit

Velmi užitočné pravidlo. Predstav si, že mas **pᵦ** a potrebujes **pₛ**. Pouzijes:

**Rₛᵦ · pᵦ = pₛ**

Mozes si to mentálne prečítať tak, že dve susedne **b** sa akoby zrusia a zostane **s**.

Prečo toto pravidlo funguje? Pretoze indexy v skutocnosti opisuju cestu medzi coordinate frames. pᵦ je informácia momentálne napísaná v {b}. Rₛᵦ vie tuto informaciu previesť do {s}. Preto na konci zostane pₛ.

Je to velmi podobne prevodu jednotiek. Ak mas vzdialenosť v centimetroch a faktor, ktory prevádza centimetre na metre, "centimetre" sa pri vypocte odstránia a výsledok zostane v metroch.

---

## 6. Prečo potrebujeme treti frame {c}?

![Tri coordinate frames - {s}, {b} a {c} s rotacnymi transformaciami medzi nimi](/book/ch3/fig3-4.png)

Na obrazku už nie sú iba {s} a {b}, ale pribudol frame **{c}**. Toto nie je komplikácia vytvorená len kvôli matematike. V reálnych robotoch je práve toto úplne normálna situacia.

Predstav si robotické rameno. Jeho základňa má frame {s}. Na konci ramena je wrist s frame {b}. Na wrist je namontovaná kamera s vlastným frame {c}.

Takze mame:

**{s} = base robota**

**{b} = wrist**

**{c} = kamera**

Vyrobca vie, ako je kamera namontovaná na wrist, takze poznáme **Rᵦc**. Robot zároveň zo svojich joint angles vie, ako je wrist momentálne orientovaný vzhľadom na base: **Rₛᵦ**.

Lenze teraz chceme odpovedat na praktickú otázku: **Ako je kamera orientovaná vzhľadom na základňu robota?** Potrebujeme teda **Rₛc**.

---

## 7. Prečo plati Rₛc = Rₛᵦ · Rᵦc?

Máme Rᵦc, co opisuje frame {c} pomocou {b}. Lenze potrebujeme frame {c} opisany pomocou {s}. Máme našťastie aj Rₛᵦ, ktora vie prejst z {b} representation do {s} representation.

Preto môžeme urobit cestu:

**c → b → s**

Najprv vezmeme informaciu z {c} a vyjadrime ju cez {b}. Potom výsledok vyjadrime cez {s}.

Matematicky:

**Rₛc = Rₛᵦ · Rᵦc**

Prečo multiplication? Pretoze robime dve transformácie za sebou. Matrix multiplication je matematicky spôsob skladania lineárnych transformacii. Prava matrix posobi prva a lava druha. Preto Rᵦc najprv riesi vztah c → b a potom Rₛᵦ pokracuje b → s.

Indexy nam to krásne skontroluju - prostredne frames sa zhoduju a výsledok je Rₛc.

---

## 8. Predstav si to ako cestovanie s prestupom

Predstav si, že sa potrebujes dostat z malej dediny do Bratislavy, ale neexistuje priame spojenie. Najprv ides:

**dedina → Trnava**

a potom:

**Trnava → Bratislava**

Keď obe cesty spojis, dostanes:

**dedina → Bratislava**

Trnava bola potrebna ako intermediate point, ale v konecnom oznaceni cesty už nie je.

Presne toto robi Rₛᵦ · Rᵦc. Máme c → b a b → s. Po spojeni: c → s. Preto výsledok musi byt Rₛc.

V robotike môže byt takychto "prestupov" obrovské množstvo. Roboticke rameno môže mat base, shoulder, upper arm, elbow, forearm, wrist a gripper. Nemusime poznat priamy vztah base → gripper. Môžeme skladat male transformácie medzi susednými castami.

To je jeden z hlavných dôvodov, prečo sú matrices pre robotiku také užitočné.

---

## 9. Prečo zalezi na poradi matrices?

Toto je velmi dôležité:

**Rₛᵦ · Rᵦc ≠ Rᵦc · Rₛᵦ**

vo vseobecnosti.

Pri obycajnych cislach sme zvyknuti, že 2 · 3 = 3 · 2. Pri matrices však vseobecne **AB ≠ BA**.

Prečo to fyzicky dava zmysel? Predstav si telefon. Najprv ho otoc o 90° doprava a potom ho preklop dopredu. Teraz zacni od povodnej polohy a urob operacie opacne: najprv telefon preklop dopredu a az potom ho otoc doprava. Telefon vo vseobecnosti skonci v inej orientation.

Rotacie v 3D teda zavisia od poradia.

Aj indexy nam okamžite ukazu, prečo je Rₛᵦ · Rᵦc logicke. Prostredne frames sa zhoduju. Pri opacnom poradi by sme mali Rᵦc · Rₛᵦ, cizie medzi c a s nemame správne nadvazenie.

---

## 10. Co presne robi výpočet na obrazku?

Na obrazku mame:

$$Rᵦc =$$
$$[  0   0  -1 ]$$
$$[  0   1   0 ]$$
$$[  1   0   0 ]$$

Táto matrix opisuje orientation frame {c} pomocou frame {b}.

Z predchádzajúcej časti máme určitú matrix Rₛᵦ, ktorá opisuje {b} pomocou {s}. Video potom vypočíta:

**Rₛc = Rₛᵦ · Rᵦc**

a dostane:

$$Rₛc =$$
$$[  0  -1   0 ]$$
$$[  0   0  -1 ]$$
$$[  1   0   0 ]$$

Co sme tym fyzicky urobili? **Frame {c} sme vobec nepohli.** To je extrémne dôležité.

Neotocili sme kameru. Neotočili sme robota. Nic fyzicke sa nestalo. Frame {c} zostal presne tak orientovany, ako bol.

Pred vypoctom sme jeho orientation poznali v jazyku {b}: Rᵦc. Po vypocte poznáme tu istú orientation, ale v jazyku {s}: Rₛc.

Preto video hovori **change reference frame**. Zmenili sme pozorovatela, nie objekt.

---

## 11. Realny priklad: kamera na dronovi

Predstav si dron letiaci nad polom. World frame {s} je pevné spojeny so Zemou. Dron má body frame {b}. Kamera namontovaná pod dronom má camera frame {c}.

Kamera je namontovaná napriklad tak, že smeruje trochu nadol. Tento pevny vztah poznáme ako **Rᵦc**.

Dron sa však pocas letu naklana a otaca. Jeho aktuálnu orientation voči Zemi poznáme ako **Rₛᵦ**.

Teraz kamera zaznamená objekt. Aby autopilot vedel, akým smerom vzhľadom na Zem sa kamera pozera, potrebuje orientation kamery vo world frame:

**Rₛc = Rₛᵦ · Rᵦc**

Toto sa deje preto, že orientation kamery voči Zemi závisí od dvoch veci: ako je kamera namontovaná na drone a ako je samotny dron otočený voči Zemi. Ak sa kamera na drone vobec nepohne, ale celý dron sa nakloní o 30°, kamera sa voči Zemi samozrejme tiez nakloni. Preto potrebujeme oba vztahy skombinovat.

---

## 12. Druha úplne odlišná operacia: Rotate a vector

Teraz prichadza najvacsi rozdiel celej lekcie.

Rotation matrix môžeme použiť aj na to, aby sme vector **skutocne otocili**.

Predstav si šípku nakreslenú na otočnej doske. Coordinate axes miestnosti zostávajú pevne. Chytíš dosku a otočíš ju o 90°. Šípka fyzicky zmenila smer.

Predtym sme pri change reference frame robili presný opak: šípka zostala na mieste a menili sme iba coordinate system, pomocou ktoreho sme ju opisovali.

Takze máme dva scenáre:

**Change reference frame** - Objekt zostáva rovnaky. Coordinate description sa meni.

**Rotate vector** - Coordinate frame zostáva rovnaky. Samotny vector meni smer.

A hoci sa v oboch prípadoch objavuje rotation matrix, geometrický význam je úplne iny.

![Pasivna vs aktivna transformacia - change of frame vs rotation](/book/ch3/fig3-5.png)

---

## 13. Prečo môže ta istá matrix robit obe veci?

Toto môže pôsobiť zvlastne. Ako môže jedna matrix raz menit coordinates a inokedy skutočne otáčať vector?

Pretoze matrix sama o sebe opisuje vztah medzi smermi. To, ako tento vztah interpretujeme, závisí od toho, na ake coordinates ju aplikujeme.

Ak máme **pᵦ** a vypočítame **Rₛᵦ · pᵦ**, indexy krásne nadväzujú a výsledok je ten istý vector v inom coordinate frame.

Ak však máme vector už vyjadreny v {s}, teda **pₛ**, a vypočítame **Rₛᵦ · pₛ**, indexy sa takto zrusit nedaju. Nemame "preklad z b do s", pretoze vstup už je v {s}. Matrix teraz interpretujeme ako **rotation operator**, ktory vytvorí nový geometrický vector:

**p'ₛ = R · pₛ**

Apostrof pri p' je dolezity. Hovori: **Toto už nie je iba iny zapis povodneho p. Toto je novy, otočený vector.**

---

## 14. Fyzicky priklad: kompasova rucicka

Predstav si kompasovu rucicku ležiacu na stole a coordinate axes namaľované priamo na stole.

**Prva situacia:** Rucicka smeruje na sever. Ty sa presunies na druhu stranu stola a začneš používať inak orientované coordinate axes. Rucicky si sa nedotkla. Jej coordinates sa zmenili, ale fyzicky smer zostal rovnaky. To je **change reference frame**.

**Druha situacia:** Coordinate axes na stole necháš presne rovnake. Chytíš rucicku a otočíš ju zo severu na zapad. Teraz sa zmenil samotny fyzicky vector. To je **rotate vector**.

Keď si nebudeš ista, co konkrétny výpočet znamena, polož si otázku: **Pohla sa sipka, alebo som iba zmenila sposob, akým ju opisujem?**

Táto otazka vyrieši velku cast zmätku okolo rotation matrices.

---

## 15. Rotation matrix môže otocit aj celý frame

Rovnaky princip nemusíme aplikovať iba na jeden vector. Môžeme otocit celý coordinate frame.

Predstav si malu kartónovú dosku, na ktorej mas nakreslené tri axes x, y, z. Ked dosku fyzicky otočíš, všetky tri axes sa otočia spolu.

Matematicky môžeme orientation frame reprezentovat rotation matrix R. Ak na celý frame aplikujeme ďalšiu rotaciu, dostaneme novu orientation.

A tu vznika dalsia velmi dolezita otazka: **Otaname vzhľadom na fixed space frame alebo vzhľadom na body frame?**

To rozhoduje o tom, z ktorej strany rotation matrix nasobime.

![Pre-multiplication vs post-multiplication: fixed-frame a body-frame rotation](/book/ch3/fig3-9.png)

---

## 16. Premultiplication vs. postmultiplication

Ak máme orientation **Rₛᵦ** a chceme na nu aplikovať ďalšiu rotáciu **R**, môžeme dostat dva rôzne vysledky:

**R · Rₛᵦ** (premultiplication)

alebo

**Rₛᵦ · R** (postmultiplication)

Tieto výsledky vo vseobecnosti nie sú rovnake.

Preco?

Pretoze v prvom pripade interpretujeme rotation axes vzhľadom na **space frame**, zatiaľ co v druhom pripade vzhľadom na **body frame**.

Zjednodusene:

**Premultiply → rotation about space-frame axes**

**Postmultiply → rotation about body-frame axes**

Predstav si lietadlo. Mas world axes pevné vzhľadom na Zem a zároveň axes pripevnené k lietadlu. Ked sa lietadlo začne otacat, jeho vlastne axes sa otáčajú spolu s nim. Preto príkaz "otoc sa okolo world x-axis" nie je po niekoľkých rotáciách to isté ako "otoc sa okolo svojho vlastneho x-axis".

---

## 17. Realny priklad s telefonom

Vezmi si telefon a drz ho pred sebou.

Predstav si, že miestnost má pevné osi. Vertikalny smer miestnosti zostáva stale rovnaký bez ohladu na to, ako telefon otocis.

Telefon však má aj vlastne axes: napriklad jeho dlha hrana môže byt ŷᵦ, kratka hrana x̂ᵦ a smer von z displeja ẑᵦ.

Teraz telefon najprv naklon. Po tomto nakloneni už jeho vlastna x̂ᵦ axis nie je zarovnana s world x̂ₛ.

Ak teraz poviem: "Otoc telefon okolo world x̂ₛ," je to ina operacia nez: "Otoc telefon okolo jeho vlastnej x̂ᵦ."

Preto musime pri skladani rotácií vediet, v akom frame je nova rotation definovana. A preto zalezi na tom, či matrix násobíme zlava alebo sprava.

---

## 18. Prečo je toto vsetko v robotike take dôležité?

Predstav si robotické rameno, ktore má zdvihnúť pohar.

**Kamera povie:** "Pohar je týmto smerom odo mna." Táto informácia vznikne v camera frame.

**Roboticke rameno však potrebuje vediet:** "Kde je pohár vzhľadom na moju zakladnu?" Musíme teda urobit **change of reference frame**.

Nasledne robot vypočíta, ako má otocit wrist, aby gripper správne uchopil pohar. Tu už nejde iba o prepis coordinates. Robot chce skutočne zmeniť orientation grippera. To je **rotate a frame**.

V jednom jedinom robotickom pohybe sa teda mozu použiť obe interpretácie rotation matrices. Najprv nimi prekladáme informácie medzi senzormi a robotom a potom pomocou rotácií vypočítavame požadovanú orientation jednotlivých časti robota.

---

## 19. Celu lekciu si predstav ako tri rôzne otázky

Keď uvidis rotation matrix, nesnaz sa okamžite nieco nasobit. Najprv sa spytaj:

**"Chcem iba opísať orientation?"** Potom rotation matrix používam ako representation of orientation: Rₛᵦ. Hovorim napriklad: "Takto je kamera orientovaná vzhľadom na robota."

**"Mam tu istú vec, ale potrebujem ju vyjadrit v inom coordinate frame?"** Potom robim change of reference frame: **pₛ = Rₛᵦ · pᵦ**. Fyzicky vector zostáva rovnaky. Alebo pri frames: **Rₛc = Rₛᵦ · Rᵦc**. Frame {c} zostáva fyzicky rovnako orientovany. Iba ho teraz opisujem pomocou {s}.

**"Chcem objekt skutočne otocit?"** Potom rotation matrix používam ako rotation operator: **p'ₛ = R · pₛ**. Tu už vznika nový vector p'.

Toto rozlíšenie je ovela dôležitéjsie nez naucit sa jednotlive rovnice naspamäť.

---

## Na co pamatat

**Fyzicky vector a jeho coordinates nie sú to iste.** Ten istý vector môže mat rôzne čísla podľa toho, v akom coordinate frame ho opisujeme. Preto mozu pᵦ a pₛ vyzerat úplne inak a stale predstavovat tu istú fyzicku sipku.

**Change of reference frame** - objekt sa nemeni, mení sa iba jeho matematicky opis: **pₛ = Rₛᵦ · pᵦ**

**Skladanie transformacii** - ak máme viac frames, transformácie môžeme skladat: **Rₛc = Rₛᵦ · Rᵦc** (cesta c → b → s)

**Subscript cancellation** - prostredne frames sa zhoduju a pomahaju kontrolovat správne poradie

**Poradie je dôležité** - AB ≠ BA. Fyzicky to dava zmysel, pretoze dve 3D rotacie v opacnom poradi mozu viest k úplne inej orientation.

**Premultiply = space frame axes. Postmultiply = body frame axes.**

**Nezamienaj change reference frame a rotate vector.** Pri prvom zostáva fyzicka šípka rovnaká a meníš iba pohlad. Pri druhom zostáva coordinate frame rovnaký a fyzicky meníš smer sipky.

**R⁻¹ = Rᵀ** - inverse rotation matrix je jej transpose. Ak poznas Rₛᵦ, automaticky poznas aj Rᵦₛ = Rₛᵦᵀ.`;
