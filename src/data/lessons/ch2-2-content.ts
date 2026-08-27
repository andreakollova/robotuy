// Chapter 2.2 – Lekcia 4: Stupne voľnosti robota
// Full lesson content - DO NOT SHORTEN

export const ch22Content = `# Lekcia 4: Stupne voľnosti robota

V predchádzajúcej lekcii sme sa pozerali na jedno samostatné **rigid body** — tuhé teleso. Zistili sme, že ak je jeho pohyb obmedzený na rovinu, ide o **planar rigid body** (tuhé teleso pohybujúce sa v rovine) a na opis jeho configuration potrebujeme tri nezávislé hodnoty. Dve určujú jeho position a jedna orientation, takže má **3 degrees of freedom (DOF)**. Ak sa rovnaké teleso môže voľne pohybovať v trojrozmernom priestore, ide o **spatial rigid body** (tuhé teleso pohybujúce sa v priestore). Vtedy potrebuje tri hodnoty na position a ďalšie tri na orientation, takže má **6 DOF**.

Robot je však zaujímavejší systém. Väčšinou sa neskladá z jedného rigid body, ale z viacerých pevných častí, ktoré nazývame **links — články**. Tie sú navzájom spojené pomocou **joints — kĺbov**. A práve joints určujú, ako sa jednotlivé links môžu voči sebe pohybovať.

Na prvý pohľad môže joint pôsobiť ako niečo, čo robotu pohyb pridáva. Napríklad lakeť robotického ramena umožní ďalšiemu linku otáčať sa. Z mechanického pohľadu je však rovnako dôležitá opačná stránka: joint zároveň množstvo iných pohybov zakazuje. Rotačný joint dovolí linku otáčať sa okolo jednej osi, ale nedovolí mu jednoducho odletieť od predchádzajúceho linku, posunúť sa do strany alebo sa ľubovoľne nakláňať.

Práve toto bude hlavnou myšlienkou lekcie. Ak chceme zistiť počet DOF celého robota, musíme pochopiť, koľko voľnosti by mali jeho links samostatne a ako túto voľnosť obmedzia joints, ktorými ich spojíme.

---

:::recap

## 01. Joint pohyb nielen umožňuje, ale aj obmedzuje

Začnime obyčajnými dverami. Predstav si, že ešte nie sú namontované a držíš ich voľne vo vzduchu. Z mechanického pohľadu ich môžeme modelovať ako **spatial rigid body**. Môžeš ich posunúť doprava alebo doľava, dopredu alebo dozadu a hore alebo dole. Zároveň ich môžeš rôznymi spôsobmi otáčať. Celkovo teda majú **6 DOF**.

Teraz tie isté dvere pripevníme pomocou pántov k pevnej stene. Dvere sa nezmenili, ale dramaticky sa zmenili ich možnosti pohybu. Už ich nemôžeš odniesť doprava, zdvihnúť nahor ani odsunúť od steny. Nemôžeš ich ani ľubovoľne nakláňať. Pánt ich drží na konkrétnom mieste a povoľuje iba jeden relatívny pohyb — otáčanie okolo osi pántu.

Po pripevnení preto dvere majú iba:

**1 DOF**

Môžeme povedať, že pánt ponechal jednu možnosť pohybu a päť ostatných odstránil. Týchto päť zakázaných nezávislých pohybov predstavuje **constraints — obmedzenia**.

Pre spatial model teda môžeme napísať:

**6 pôvodných DOF - 5 constraints = 1 DOF**

Toto je veľmi dôležitý spôsob uvažovania. Joint môžeme opisovať dvoma rovnocennými spôsobmi. Môžeme sa pýtať, koľko pohybu povoľuje, alebo koľko pohybu zakazuje. Pánt povoľuje 1 DOF a zároveň vytvára 5 constraints. Ide o dve strany toho istého mechanického vzťahu.

---

## 02. Nie každý problém musíme riešiť v plnom 3D

Dvere sú fyzicky trojrozmerný predmet, ale pri ich bežnom otváraní nás nemusí zaujímať všetkých šesť možných pohybov. Vieme, že zostávajú zvislé, nevyskočia z pántov a pohybujú sa iba okolo jednej osi. Ak sa na ne pozrieme zhora, ich pohyb môžeme analyzovať ako pohyb v jednej rovine.

Vtedy používame **planar model**. Samostatné planar rigid body má 3 DOF: môže sa posúvať v dvoch smeroch a otáčať v rovine. Keď ho pripevníme rotačným jointom, dve translácie sa stanú nemožnými a zostane iba rotácia.

Dostaneme:

**3 pôvodné DOF - 2 constraints = 1 DOF**

Výsledok je stále rovnaký — dvere majú jeden nezávislý pohyb. Rozdiel je iba v modeli, ktorý sme si zvolili.

To je v robotike bežné. Ak sa celý mechanizmus pohybuje iba v jednej rovine, často je zbytočné analyzovať ho ako všeobecný 3D systém. Použijeme planar model, v ktorom má každé voľné rigid body 3 DOF. Ak sa mechanizmus skutočne pohybuje v priestore, použijeme spatial model a začíname so 6 DOF na jedno voľné rigid body.

:::

---

## 03. Robot ako systém links a joints

Predstav si jednoduché robotické rameno. Dole má pevnú základňu. K nej je jointom pripojený prvý pohyblivý segment, za ním nasleduje ďalší joint a ďalší segment a na konci môže byť napríklad gripper.

Pevné časti mechanizmu nazývame **links**. Link nemusí vyzerať ako jednoduchá tyč. Môže mať komplikovaný tvar, obsahovať motor, prevodovku, senzory alebo elektroniku. Z pohľadu základnej kinematiky nás zaujíma najmä to, že ho môžeme aproximovať ako rigid body — pri pohybe nemení svoj tvar.

Miesta, v ktorých sú dva links mechanicky spojené a môžu sa voči sebe určitým spôsobom pohybovať, nazývame **joints**.

Predstav si teraz, že všetky joints robotického ramena rozpojíme a jednotlivé links položíme samostatne na stôl. Každý link by sa mohol pohybovať nezávisle od ostatných. Len čo ich však opäť spojíme joints, ich pohyb sa previaže. Druhý link už nemôžeme umiestniť kamkoľvek — musí zostať pripojený k prvému a môže sa voči nemu pohybovať iba spôsobom, ktorý povoľuje ich joint.

Robot teda môžeme chápať ako sústavu rigid bodies, ktorých pôvodná voľnosť je obmedzená mechanickými spojeniami. Preto počet links ani počet joints sám osebe nehovorí, koľko DOF robot má. Musíme vedieť, aké joints používame a ako sú links navzájom pospájané.

---

## 04. Revolute joint (rotačný kĺb)

**Revolute joint**, označovaný písmenom **R**, povoľuje rotáciu okolo jednej určenej osi. Najjednoduchším príkladom je pánt dverí.

Predstav si dva links spojené takýmto jointom. Druhý link sa môže voči prvému otáčať, ale nemôže sa od neho oddeliť, posunúť do strany ani sa začať ľubovoľne nakláňať. Na opis ich vzájomnej configuration nám stačí jediná hodnota — uhol jointu.

![Základné typy robotických kĺbov](/book/ch2/fig2-3.png)

Ak je napríklad uhol 0°, link môže smerovať rovno. Pri 45° bude otočený o 45° a pri 90° o pravý uhol. Na úplné určenie jeho polohy voči predchádzajúcemu linku nepotrebujeme ďalšiu nezávislú joint variable.

Revolute joint má preto:

**1 DOF**

Otáčanie v jednom a opačnom smere pritom nepredstavuje dva DOF. Je to podobné ako pohyb výťahu hore a dole. Meníme jednu hodnotu — v tomto prípade uhol — iba ju môžeme zväčšovať alebo zmenšovať.

V spatial modeli revolute joint ponechá z pôvodných šiestich relatívnych možností pohybu jednu a päť zakáže. Preto môžeme povedať, že má:

**1 freedom + 5 constraints**

---

## 05. Prismatic joint (posuvný kĺb)

**Prismatic joint**, označovaný písmenom **P**, namiesto rotácie povoľuje posun pozdĺž jednej určenej osi.

Predstav si zásuvku zasunutú vo vodiacej koľajnici. Zásuvku môžeš vysunúť alebo zasunúť, ale nemôžeš ju počas toho ľubovoľne otočiť, zdvihnúť ani posunúť nabok. Koľajnica presne určuje, kadiaľ sa môže pohybovať.

Na opis configuration takéhoto jointu stačí jedna hodnota — napríklad vzdialenosť, o ktorú je vysunutý. Ak je q = 0 cm, môže byť úplne zasunutý. Pri q = 10 cm je vysunutý o desať centimetrov.

Prismatic joint preto tiež má:

**1 DOF**

Rozdiel oproti revolute jointu teda nie je v počte DOF. Oba majú jeden stupeň voľnosti. Rozdiel je v type povoleného pohybu: **revolute joint** povoľuje jednu rotáciu, zatiaľ čo **prismatic joint** jednu transláciu.

---

## 06. Helical joint (skrutkový kĺb)

**Helical joint**, označovaný **H**, je veľmi dobrým príkladom toho, prečo DOF nemôžeme počítať podľa toho, koľko rôznych pohybov vidíme.

Predstav si skrutku v závite. Keď skrutku otáčaš, zároveň sa posúva dopredu alebo dozadu. Vidíme teda rotáciu aj transláciu. Mohlo by preto vyzerať, že máme dva DOF.

Nemáme.

Tieto dva pohyby totiž nie sú nezávislé. Závit medzi nimi vytvára presný vzťah. Ak má skrutka stúpanie 2 mm na jednu otáčku, potom jedna celá otáčka spôsobí posun o 2 mm, polovica otáčky o 1 mm a dve otáčky o 4 mm.

Nemôžeme si teda povedať: „Otočím skrutku o jednu otáčku, ale jej posun si potom zvolím ľubovoľne." Posun už vyplýva z rotácie.

Na úplné určenie configuration preto stále potrebujeme iba jednu nezávislú hodnotu.

Helical joint má:

**1 DOF**

Tento príklad veľmi dobre vystihuje význam DOF. **Nezaujíma nás počet pohybov, ktoré vidíme. Zaujíma nás počet pohybov, ktoré môžeme meniť nezávisle.**

---

## 07. Cylindrical joint (valcový kĺb)

**Cylindrical joint**, označovaný **C**, na prvý pohľad vyzerá podobne ako helical joint. Aj tu môže jedno teleso rotovať okolo osi a zároveň sa pozdĺž tej istej osi posúvať.

Rozdiel je však zásadný: tieto dva pohyby tentoraz **nie sú mechanicky previazané**.

Predstav si tyč zasunutú do vhodného valcového puzdra. Tyč môžeš zasunúť hlbšie bez toho, aby si ju otočila. Potom ju môžeš nechať na rovnakom mieste a iba ju otočiť. Môžeš samozrejme vykonať aj oba pohyby súčasne, ale jeden neurčuje druhý.

Na opis configuration preto potrebujeme dve nezávislé hodnoty: jednu pre posun a druhú pre uhol otočenia.

Cylindrical joint má:

**2 DOF**

Porovnanie s helical jointom je dôležité:

- **Helical joint**: rotácia určuje transláciu → 1 DOF
- **Cylindrical joint**: rotáciu a transláciu volíme nezávisle → 2 DOF

To je presne rozdiel medzi „mechanizmus vykonáva dva pohyby" a „mechanizmus má dva nezávislé stupne voľnosti".

---

## 08. Universal joint (univerzálny kĺb)

**Universal joint**, označovaný **U**, povoľuje dve nezávislé rotácie, zvyčajne okolo dvoch navzájom kolmých osí.

Predstav si napríklad teleso, ktoré môžeš nakloniť dopredu a dozadu a zároveň doľava a doprava. Uhol prvého pohybu môžeš zmeniť bez toho, aby si musela meniť druhý. Preto na opis configuration potrebuješ dva nezávislé uhly.

Universal joint má:

**2 DOF**

Je užitočné porovnať ho s cylindrical jointom. Oba majú 2 DOF, ale správajú sa úplne inak. Cylindrical joint povoľuje jednu transláciu a jednu rotáciu, zatiaľ čo universal joint povoľuje dve rotácie.

Počet DOF nám teda hovorí, koľko nezávislých configuration variables existuje. Sám osebe nám však nehovorí, akého typu tieto pohyby sú.

---

## 09. Spherical joint (guľový kĺb)

**Spherical joint**, označovaný **S**, si môžeme predstaviť podobne ako guľový kĺb v mechanike. Jeden spoločný bod zostáva pevne spojený, ale telesá môžu meniť svoju vzájomnú orientation.

Nemôžu sa od seba odsunúť, pretože spoločný bod musí zostať na rovnakom mieste. Môžu sa však okolo neho otáčať tromi nezávislými spôsobmi.

Na úplné určenie ich vzájomnej orientation preto potrebujeme tri nezávislé rotačné parametre.

Spherical joint má:

**3 DOF**

V spatial modeli sme začínali so šiestimi možnými relatívnymi DOF. Spherical joint ponechal tri rotačné a tri translačné odstránil. Vytvára teda **3 constraints**.

---

## 10. Freedoms a constraints sú dve strany toho istého jointu

Teraz môžeme jednotlivé príklady spojiť do jedného pravidla.

V spatial modeli majú dve úplne voľné rigid bodies voči sebe maximálne **6 relatívnych DOF**. Joint časť tejto voľnosti ponechá a zvyšok zakáže.

Preto platí:

**freedoms jointu + constraints jointu = 6**

Revolute joint má 1 DOF, takže vytvára 5 constraints. Prismatic a helical joint sú na tom rovnako. Cylindrical a universal joint majú 2 DOF, takže vytvárajú 4 constraints. Spherical joint má 3 DOF a vytvára 3 constraints.

Pri planar mechanizme je princíp rovnaký, iba nezačíname so šiestimi možnosťami, ale s tromi. Voľné planar rigid body má totiž iba 3 DOF.

Tento vzťah je dôležitý preto, že nám umožní prejsť od jedného jointu k celému mechanizmu.

---

## 11. Ground sa počíta ako link

Predstav si robotické rameno priskrutkované k stolu. Máme jeho pohyblivé links, ale úplne dole je ešte pevná základňa, ku ktorej je pripojený prvý joint.

Túto pevnú časť nazývame **ground**.

Ground nemusí byť doslova zem. Môže to byť stôl, rám stroja, základňa robota alebo akékoľvek iné teleso, ktoré v našom modeli považujeme za nepohyblivé.

Pri počítaní links sa ground počíta ako jeden link. Dôvod je jednoduchý: joint vždy spája dve telesá. Prvý joint robotického ramena teda nespája „link s ničím". Spája prvý pohyblivý link s ground.

Ak má mechanizmus celkovo N links vrátane ground, počet pohyblivých links je:

**N - 1**

Ground sám nepridáva DOF, pretože jeho configuration považujeme za pevnú.

---

## 12. Jeden joint v modeli spája dve telesá

Pri jednoduchom robotickom ramene je väčšinou jasné, ktoré dva links joint spája. Pri komplikovanejších mechanizmoch to však nemusí byť na prvý pohľad také zrejmé.

Predstav si jeden fyzický čap, na ktorom sú pripojené tri rôzne links. Keď sa na mechanizmus pozrieš, môže to vyzerať ako „jeden veľký joint".

V našom kinematickom modeli však joint chápeme ako spojenie medzi dvojicou telies. Ak sú teda na rovnakom čape spojené tri links, môže byť potrebné toto fyzické spojenie modelovať ako viac než jeden joint.

To je dôležité najmä pri zložitejších linkages. Formula sama nedokáže zistiť, že sme mechanizmus nesprávne nakreslili. Pred výpočtom preto musíme najskôr správne identifikovať links, ground a joints medzi jednotlivými dvojicami links.

---

## 13. Prečo vôbec potrebujeme formulu

Pri jednoduchom serial robotickom ramene môže byť počítanie veľmi ľahké. Ak máme tri nezávislé revolute joints a každý má 1 DOF, celý mechanizmus má často jednoducho:

**1 + 1 + 1 = 3 DOF**

Lenže toto prestane fungovať pri mechanizmoch, ktoré vytvárajú uzavreté slučky. Môžeme mať napríklad štyri pohyblivé joints, ale ich pohyby nemusia byť nezávislé. Pohyb jedného môže automaticky určovať pohyb ostatných.

Potrebujeme preto systematickejší spôsob, ktorý zohľadní nielen freedoms jednotlivých joints, ale aj constraints, ktoré ich spojenie vytvára.

Na to používame **Grüblerovu formulu**.

Označme:

- **N** — počet links vrátane ground
- **J** — počet joints
- **m** — počet DOF voľného rigid body v našom modeli
- **fi** — počet DOF konkrétneho jointu

Pre planar mechanizmus: **m = 3**

Pre spatial mechanizmus: **m = 6**

Potom:

**DOF = m(N - 1 - J) + suma fi**

Samotný vzorec však dáva oveľa väčší zmysel, keď si ho odvodíme.

---

## 14. Odkiaľ Grüblerova formula pochádza

Predstav si mechanizmus s N links vrátane ground. Ground je pevný, takže máme N - 1 pohyblivých links.

Teraz si predstav, že sme všetky joints rozpojili. Každý pohyblivý link je samostatný a môže sa voľne pohybovať. Ak ide o planar mechanizmus, každý má 3 DOF. Ak ide o spatial mechanizmus, každý má 6 DOF.

Počiatočná voľnosť všetkých pohyblivých links je preto:

**m(N - 1)**

Až potom začneme links spájať joints.

Predstav si spatial mechanizmus a revolute joint. Dve telesá by bez spojenia mohli mať voči sebe šesť relatívnych možností pohybu. Revolute joint ponechá iba jednu. Znamená to, že odstránil päť možností — vytvoril päť constraints.

Vo všeobecnosti joint s fi DOF odstráni:

**m - fi**

stupňov voľnosti.

Ak máme viac joints, od pôvodnej voľnosti links odpočítame constraints vytvorené všetkými joints. Dostávame:

**DOF = pôvodná voľnosť links - constraints joints**

Po matematickej úprave vznikne Grüblerova formula:

**DOF = m(N - 1 - J) + suma fi**

Vzorec teda nie je žiadne nové magické pravidlo. Je to iba skrátený zápis myšlienky, ktorú už poznáme:

**najskôr dáme telesám všetku voľnosť, ktorú by mali samostatne, a potom odoberieme pohyby, ktoré im joints zakážu.**

---

## 15. Open-chain robot

Predstav si klasické robotické rameno. Začíname na pevnej základni, potom nasleduje joint, link, ďalší joint, ďalší link a nakoniec end-effector.

Ak sa z ground vydáme cez links a joints smerom k end-effectoru, nikde sa nevrátime späť k linku, cez ktorý sme už prešli. Nevytvorí sa žiadna uzavretá slučka.

Takýto systém nazývame **open-chain mechanism** (mechanizmus s otvoreným kinematickým reťazcom) alebo **serial mechanism**.

Pri jednoduchom open chain sú jednotlivé joint variables často nezávislé. Ak má planar rameno tri revolute joints, môžeme meniť uhol prvého, druhého aj tretieho jointu. Na opis configuration preto potrebujeme tri uhly:

**q = (θ1, θ2, θ3)**

Robot má: **3 DOF**

Podobne robot so šiestimi nezávislými 1-DOF joints má typicky **6 DOF**.

Tu preto jednoduché sčítanie joint freedoms funguje.

---

## 16. kR serial robot

V robotike sa môžeme stretnúť so zápisom **kR robot**. Písmeno R znamená revolute joint a k hovorí, koľko takýchto joints robot obsahuje.

![Sériový reťazec, päťkĺbový a šesťkĺbové mechanizmy](/book/ch2/fig2-5.png)

Napríklad 3R robot má tri revolute joints. 6R robot ich má šesť.

Ak ide o jednoduchý serial robot a všetky joints sú nezávislé, každý revolute joint pridáva jednu joint variable. Preto kR robot má:

**DOF = k**

Napríklad planar 3R rameno potrebuje na opis svojej configuration tri uhly (θ1, θ2, θ3) a má teda **3 DOF**.

To je dobrý jednoduchý prípad, pri ktorom sa intuitívne počítanie zhoduje s Grüblerovou formulou.

---

## 17. Čo sa zmení, keď vytvoríme uzavretú slučku

Teraz si predstav, že links nepospájame iba do jedného otvoreného reťazca. Pridáme ďalšie spojenie tak, že sa mechanická cesta nakoniec uzavrie.

Vznikne **closed-chain mechanism** (mechanizmus s uzavretým kinematickým reťazcom).

Práve uzavretie slučky mení situáciu. Jednotlivé joint variables už nemusia byť nezávislé.

Predstav si napríklad pevný rám zo štyroch tyčiek spojených rotačnými joints. Ak pohneš jednou tyčkou, ostatné sa musia prispôsobiť tak, aby sa rám nerozpojil. Nemôžeš každému jointu jednoducho zvoliť ľubovoľný uhol.

Uzavretá slučka teda vytvára ďalšie geometrické **constraints**.

A práve preto pri closed chains neplatí: **počet joints = počet DOF**

---

## 18. Four-bar linkage: 4 joints, ale iba 1 DOF

Klasickým príkladom je **four-bar linkage** (štvorčlánkový mechanizmus).

![Four-bar linkage a slider-crank mechanism](/book/ch2/fig2-4.png)

Predstav si štyri pevné links spojené štyrmi revolute joints do uzavretého štvoruholníka. Jeden link je ground a ostatné tri sa môžu pohybovať.

Na prvý pohľad vidíme štyri revolute joints. Každý revolute joint má samostatne 1 DOF. Mohli by sme preto nesprávne usúdiť:

4 joints x 1 DOF = 4 DOF

Lenže mechanizmus je uzavretý.

Ak otočíš jeden link, nemôžeš potom ostatným trom joints nastaviť ľubovoľné uhly. Musia sa automaticky prispôsobiť tak, aby posledný link stále dosiahol k poslednému jointu a slučka zostala uzavretá.

Pre planar four-bar máme: N = 4, J = 4, m = 3, suma fi = 4

Dosadíme:

**DOF = 3(4 - 1 - 4) + 4 = 1**

Celý mechanizmus teda potrebuje iba jednu nezávislú hodnotu na určenie svojej configuration.

Toto je presne dôvod, prečo štyri joints neznamenajú štyri DOF.

---

## 19. Slider-crank: dva rôzne pohyby, ale iba 1 DOF

Ďalším výborným príkladom je **slider-crank mechanism** (kľukový mechanizmus s posúvačom), ktorý poznáme napríklad z piestového motora.

Crank sa otáča a slider sa pritom pohybuje dopredu a dozadu. Na prvý pohľad teda vidíme rotáciu aj lineárny pohyb.

Napriek tomu má celý mechanizmus iba:

**1 DOF**

Prečo?

Pretože tieto pohyby nie sú nezávislé. Keď poznáme uhol cranku a rozmery links, poloha slidera je už určená geometriou mechanizmu. Nemôžeme nastaviť crank na konkrétny uhol a potom si úplne nezávisle vybrať, kde bude slider.

Je to podobná myšlienka ako pri helical jointe. To, že mechanizmus obsahuje viac viditeľných pohybov, ešte neznamená, že každý z nich predstavuje samostatný DOF.

---

## 20. Five-bar linkage

Pri **five-bar linkage** (päťčlánkovom mechanizme) máme päť links vrátane ground a päť revolute joints usporiadaných do uzavretej slučky.

Pre planar model: N = 5, J = 5, m = 3, suma fi = 5

Dostaneme:

**DOF = 3(5 - 1 - 5) + 5 = 2**

Mechanizmus má teda **2 DOF**.

Na úplné určenie jeho configuration potrebujeme dve nezávislé hodnoty. Ostatné joint angles už musia byť také, aby zostala zachovaná geometria uzavretej slučky.

Tento príklad opäť ukazuje, že počet joints sám osebe nestačí. Five-bar má päť revolute joints, ale iba dva nezávislé stupne voľnosti.

---

## 21. Grüblerova formula predpokladá nezávislé constraints

Grüblerova formula funguje tak, že za každý joint odoberie určitý počet constraints. Tým však implicitne predpokladá, že každý z týchto constraints prináša nové nezávislé obmedzenie.

To nemusí byť vždy pravda.

Predstav si, že ti niekto povie:

**x = 5**

Tým je x úplne určené. Potom pridá:

**x < 10**

Dostali sme druhé pravidlo, ale ono už x nijako ďalej neobmedzilo. Keď x = 5, automaticky platí aj x < 10.

Druhý constraint teda nepriniesol novú nezávislú informáciu.

V mechanických systémoch sa môže stať niečo podobné. Dve rôzne mechanické väzby môžu v určitej geometrii obmedzovať tú istú možnosť pohybu. Ak ich obe odpočítame ako úplne nové constraints, odoberieme systému príliš veľa voľnosti.

Takéto obmedzenie nazývame **redundant constraint — nadbytočné obmedzenie**.

![Paralelogramový mechanizmus a singulárna konfigurácia](/book/ch2/fig2-7.png)

Preto Grüblerova formula nie je náhradou za pochopenie mechanizmu. Je to veľmi užitočný nástroj, ale musíme vedieť, za akých predpokladov ju používame.

---

## 22. Singular configuration

Aj mechanizmus, ktorý sa väčšinou správa normálne, sa môže dostať do špeciálnej geometrickej polohy, v ktorej sa vzťahy medzi jeho constraints zmenia.

Predstav si napríklad dve links robotického ramena, ktoré sa dostanú presne do jednej priamky. V tejto configuration môže mechanizmus stratiť schopnosť vytvoriť určitý pohyb alebo silu rovnakým spôsobom ako v okolí tejto polohy.

Takúto špeciálnu configuration nazývame **singular configuration** a samotný jav **singularity**.

Dôležité zatiaľ nie je vedieť singularities matematicky počítať. Stačí pochopiť, že správanie mechanizmu môže závisieť aj od jeho aktuálnej configuration. Niektoré constraints alebo možné smery pohybu sa môžu v špeciálnych polohách stať závislými.

K singularities sa v robotike ešte vrátime, pretože sú veľmi dôležité pri kinematike, velocities, forces aj riadení robotov.

---

## 23. Nie každý DOF musí pohybovať end-effectorom

Doteraz by mohlo vyzerať, že každý DOF robota automaticky znamená ďalšiu možnosť pohybu jeho end-effectora. Pri jednoduchom serial robotovi to často približne platí, ale pri komplikovanejších mechanizmoch už nie.

Predstav si tyč, ktorá sa môže voľne otáčať okolo vlastnej pozdĺžnej osi. Z pohľadu mechanizmu sa jej configuration mení — uhol otočenia môže mať rôzne hodnoty. Máme teda skutočný DOF.

Ak však táto rotácia nijako nezmení position ani orientation pracovnej platformy, end-effector tento pohyb „nevidí".

Takýto pohyb môže predstavovať **internal degree of freedom — vnútorný stupeň voľnosti**.

Preto musíme rozlišovať:

**DOF celého mechanizmu** — koľko nezávislých hodnôt potrebujeme na opis configuration všetkých jeho častí

a

**DOF end-effectora** — koľko nezávislých možností pohybu má pracovný bod alebo platforma, ktorá nás zaujíma.

Tieto dve čísla nemusia byť rovnaké.

---

## 24. Delta robot

![Delta robot](/book/ch2/fig2-8.png)

Dobrým príkladom je **Delta robot**, ktorý používa niekoľko paralelných ramien spájajúcich pevnú základňu s pohyblivou platformou.

Na rozdiel od klasického serial ramena nejde od základne k end-effectoru iba jedna cesta. Platforma je spojená so základňou viacerými mechanickými vetvami naraz. Ide teda o **parallel closed-chain mechanism**.

Niektoré links v jeho detailnom mechanickom modeli môžu mať vnútorné pohyby, ktoré priamo nemenia požadovaný pohyb platformy. Napríklad určitá tyč sa môže v konkrétnom modeli otáčať okolo vlastnej osi bez toho, aby sa tým zmenila position end-effectora.

Mechanizmus teda môže obsahovať DOF, ktorý je reálny z pohľadu configuration jednotlivých links, ale nepridáva ďalší nezávislý pohyb pracovnej platformy.

Práve preto pri zložitejších robotoch nestačí povedať iba „robot má X DOF". Musíme vedieť, čo presne počítame.

---

## 25. Stewart-Gough platform

Ďalším známym parallel robotom je **Stewart-Gough platform**. Má pevnú spodnú platformu a pohyblivú hornú platformu, ktoré sú prepojené šiestimi nastaviteľnými nohami.

Pri vhodnom mechanickom usporiadaní môže horná platforma meniť svoju position v troch smeroch a zároveň orientation tromi nezávislými spôsobmi.

Má teda:

**3 translačné DOF + 3 rotačné DOF = 6 DOF**

To je dôvod, prečo sa podobné platformy používajú napríklad v **motion simulators**. Platforma sa môže zdvihnúť, posunúť dopredu alebo do strany a zároveň sa nakláňať a otáčať.

Zaujímavé je, že celý vnútorný mechanizmus môže obsahovať množstvo links a joints. Napriek tomu nás pri pohybe hornej platformy môže zaujímať iba jej šesť nezávislých DOF.

Opäť vidíme rozdiel medzi zložitosťou mechanizmu a počtom nezávislých pohybov jeho end-effectora.

---

## 26. Krátke porovnanie

**Open-chain mechanism** (mechanizmus s otvoreným kinematickým reťazcom) nemá uzavretú mechanickú slučku. Od ground vedie cez joints a links otvorená cesta k end-effectoru. Typickým príkladom je klasické serial robotické rameno. Ak sú jeho joints nezávislé, počet DOF sa často jednoducho rovná súčtu ich freedoms.

**Closed-chain mechanism** (mechanizmus s uzavretým kinematickým reťazcom) obsahuje aspoň jednu uzavretú mechanickú slučku. Pohyb jednotlivých joints preto býva geometricky previazaný. Four-bar linkage môže mať štyri revolute joints, ale celý mechanizmus má iba 1 DOF, pretože joint angles nemožno voliť nezávisle.

Najjednoduchšie si rozdiel môžeš zapamätať takto: pri open chain môže byť každý joint ďalšou nezávislou možnosťou pohybu; pri closed chain slučka vytvára ďalšie constraints, takže pohyb jedného jointu môže určovať pohyb ostatných.

---

## 27. Mechanická voľnosť a actuation sú dve rôzne veci

Na záver je dôležité oddeliť **degrees of freedom** od počtu motorov.

DOF je mechanická vlastnosť systému. Hovorí nám, koľko nezávislých configuration variables potrebujeme na úplné určenie jeho configuration.

**Actuator** je zariadenie, ktoré vytvára pohyb — napríklad elektromotor, servo alebo hydraulický valec.

Pri jednoduchom serial robotovi môže mať každý joint vlastný motor. Robot so šiestimi revolute joints môže mať 6 DOF a zároveň šesť motorov. Preto sa môže zdať, že tieto dve čísla sú vždy rovnaké.

Nie sú.

Predstav si four-bar linkage s jedným motorom na vstupnom jointe. Mechanizmus má štyri revolute joints, ale iba 1 DOF. Keď motor otočí prvým linkom, ostatné links a joints sa musia pohybovať spolu s ním, pretože ich pohyb určuje geometria uzavretej slučky. Ostatné joints preto nemusia mať vlastný motor.

Takéto nepoháňané joints nazývame **passive joints**.

Pri určovaní DOF sa preto nepýtame: **Koľko motorov robot má?**

Pýtame sa: **Koľko nezávislých hodnôt potrebujeme na úplné určenie jeho configuration?**

---

## 28. Ako postupovať pri počítaní DOF

Keď dostaneš nový mechanizmus, nesnaž sa okamžite dosadzovať čísla do Grüblerovej formule. Najskôr si mechanizmus predstav fyzicky.

Najprv urči, či ho budeš modelovať ako planar alebo spatial. Potom identifikuj jednotlivé rigid links a nezabudni započítať ground. Následne si prejdi joints a pri každom si polož otázku: **Aký relatívny pohyb tento joint povoľuje?**

Až potom má zmysel začať počítať.

Pri jednoduchom open-chain robotovi často stačí spočítať nezávislé joint freedoms. Pri closed-chain mechanizme musíš navyše myslieť na geometrické constraints vytvorené uzavretými slučkami a v prípade potreby použiť Grüblerovu formulu.

Ak ti výsledok nedáva fyzický zmysel, nemala by byť prvá reakcia „asi som zle počítala". Najskôr sa vráť k samotnému modelu. Skontroluj, či si správne identifikovala links, joints, ground a typy jednotlivých spojení a či constraints, ktoré počítaš, skutočne predstavujú nezávislé obmedzenia.

---

## 29. Hlavná myšlienka lekcie

Najdôležitejšie nie je naučiť sa naspamäť tabuľku joints alebo Grüblerovu formulu. Dôležité je pochopiť mechanickú logiku, ktorá sa za nimi skrýva.

Predstav si najskôr všetky pohyblivé links robota ako samostatné rigid bodies. Bez spojení by mal každý z nich vlastnú voľnosť. V planar modeli by každý začínal s 3 DOF, v spatial modeli so 6 DOF.

Potom ich začneme spájať joints. Každý joint povie: tento pohyb medzi dvoma links je dovolený, ale tieto ostatné už nie. Tým vytvára constraints a pôvodnú voľnosť systému zmenšuje.

To, čo po zohľadnení všetkých nezávislých constraints zostane, je skutočný počet degrees of freedom mechanizmu.

Preto si môžeš celý proces predstaviť ako:

**voľné rigid bodies → pridáme joints → vzniknú constraints → zostanú DOF mechanizmu**

Grüblerova formula je iba matematický nástroj, ktorý túto myšlienku zapisuje kompaktnejšie.

---

## Zhrnutie lekcie

Robot môžeme z pohľadu kinematiky chápať ako sústavu **rigid links** spojených **joints**. Joint nie je iba miesto, ktoré pohyb umožňuje. Zároveň zakazuje ostatné relatívne pohyby medzi dvoma links, a tým vytvára constraints.

Základné typy joints sa líšia tým, aké nezávislé pohyby povoľujú. **Revolute joint** (rotačný kĺb) povoľuje jednu rotáciu a má 1 DOF. **Prismatic joint** (posuvný kĺb) povoľuje jednu transláciu a má tiež 1 DOF. **Helical joint** (skrutkový kĺb) kombinuje rotáciu s transláciou, ale pretože sú mechanicky previazané, stále má iba 1 DOF. **Cylindrical joint** (valcový kĺb) umožňuje nezávislú transláciu a rotáciu, preto má 2 DOF. **Universal joint** (univerzálny kĺb) má dve nezávislé rotácie a 2 DOF. **Spherical joint** (guľový kĺb) povoľuje tri nezávislé rotácie a má 3 DOF.

Pri spatial modeli začíname so šiestimi možnými relatívnymi DOF medzi dvoma voľnými rigid bodies. Joint časť z nich ponechá a zvyšok odstráni. Pri planar modeli používame rovnakú logiku, iba začíname s tromi DOF.

Pri celom mechanizme musíme správne identifikovať links, joints a ground. Ground sa počíta ako link, hoci sa nepohybuje. Na systematické počítanie môžeme použiť **Grüblerovu formulu**:

**DOF = m(N - 1 - J) + suma fi**

kde m = 3 pre planar mechanizmus a m = 6 pre spatial mechanizmus.

Pri jednoduchých **open-chain mechanisms** sa DOF často rovná súčtu nezávislých joint freedoms. Pri **closed-chain mechanisms** však uzavreté slučky vytvárajú ďalšie constraints. Preto môže mať four-bar linkage štyri revolute joints, ale iba 1 DOF.

Formulu zároveň nemôžeme používať úplne mechanicky. Musíme dávať pozor na **redundant constraints** a na špeciálne **singular configurations**, pri ktorých sa môže geometrické správanie mechanizmu zmeniť.

A napokon musíme rozlišovať medzi DOF mechanizmu, DOF end-effectora a počtom actuatorov. Sú to tri rôzne veci. Mechanizmus môže obsahovať **internal DOF**, ktoré nemenia pose end-effectora, a môže obsahovať **passive joints**, ktoré sa pohybujú bez vlastného motora.

Ak si z lekcie zapamätáš jednu vetu, nech je to táto:

**Počet DOF robota neurčuje počet jeho pohyblivých častí ani počet motorov. Určuje ho počet nezávislých možností pohybu, ktoré zostanú po zohľadnení všetkých mechanických constraints.**`;
