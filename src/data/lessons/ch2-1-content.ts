// Chapter 2.1 – Lekcia 3: Stupne voľnosti tuhého telesa
// Full lesson content - DO NOT SHORTEN

export const ch21Content = `# Lekcia 3: Stupne voľnosti tuhého telesa

## Stupne voľnosti tuhého telesa

V tejto časti sa naučíme, koľkými spôsobmi sa môže pohybovať tuhé teleso a ako z toho určíme jeho počet stupňov voľnosti. Toto je jeden zo základov robotiky, pretože jednotlivé pevné časti robota môžeme považovať za tuhé telesá. Keď pochopíme pohyb jedného telesa, neskôr môžeme začať tieto telesá spájať kĺbmi a zisťovať, ako sa môže pohybovať celý robot.

Najdôležitejšie čísla, ku ktorým sa dostaneme, sú jednoduché: tuhé teleso v rovine má 3 stupne voľnosti a tuhé teleso v trojrozmernom priestore má 6 stupňov voľnosti. Dôležitejšie než zapamätať si tieto čísla je však pochopiť, prečo to tak je.

---

## Ako opísať pohyb tuhého telesa

Predstav si, že pred tebou na stole leží telefón. Posunieš ho doprava. Potom ho posunieš smerom od seba. Nakoniec ho na tom istom mieste otočíš o 90°.

Urobila si tri rôzne zmeny jeho konfigurácie. Telefón sa pritom nezmenil – stále má rovnaký tvar a rozmery. Menilo sa iba kde sa nachádza a ako je otočený.

A presne tým sa začína robotika.

Keď chceme riadiť robotické rameno, mobilného robota alebo napríklad dron, počítač musí mať spôsob, ako matematicky opísať ich stav. Nemôžeme mu jednoducho povedať, že „rameno je trochu vpravo". Potrebujeme presne určiť, koľko nezávislých hodnôt je potrebných na opis jeho konfigurácie.

Tieto nezávislé možnosti nazývame **degrees of freedom** – stupne voľnosti (**DOF**).

![Konfigurácia dverí, bodu v rovine a mince](/book/ch2/fig2-1.png)

---

## 01. Najskôr potrebujeme zjednodušiť skutočný svet

Reálne objekty nie sú dokonale pevné. Kovové rameno robota sa pri veľkom zaťažení môže nepatrne ohnúť, plast sa môže deformovať a dokonca aj oceľ sa pod silou mierne mení.

Ak by sme však pri každom pohybe robota museli počítať deformáciu každého milimetra materiálu, aj jednoduché problémy by sa veľmi rýchlo stali zložité.

Preto si v základnej robotike vytvárame zjednodušený model a jednotlivé pevné časti robota považujeme za **rigid bodies** – tuhé telesá.

Tuhé teleso je objekt, ktorého tvar a rozmery považujeme za nemenné. Môže sa presúvať a otáčať, ale nemôže sa naťahovať, skracovať ani ohýbať.

Predstav si, že na kovovej časti robota označíme dva body A a B. Robot sa môže pohnúť a oba body môžu skončiť úplne inde. Jedna vec však zostáva rovnaká:

**vzdialenosť medzi A a B.**

To je podstata modelu rigid body.

Prečo je to také užitočné?

Pretože potom nemusíme samostatne sledovať každý bod robota.

Ak poznáme polohu a orientáciu jedného tuhého článku, automaticky vieme, kde sa nachádzajú všetky jeho body.

To je obrovské zjednodušenie.

> Robot môže mať milióny fyzických bodov, ale na opis jedného voľného tuhého článku ich nepotrebujeme milióny. V trojrozmernom priestore nám na úplný opis jeho konfigurácie stačí šesť nezávislých hodnôt. Práve rigidita telesa umožňuje zredukovať obrovské množstvo informácií na niekoľko čísel.

---

## 02. Čo vlastne znamená degree of freedom?

Degree of freedom (DOF) môžeme na začiatku chápať ako jednu nezávislú možnosť, ktorou môžeme meniť konfiguráciu objektu.

Predstav si výťah. Kabína sa môže pohybovať hore alebo dole. Nemôže sa normálne pohybovať doľava, doprava ani sa otáčať.

Výťah má preto **1 DOF**.

Hore a dole pritom nie sú dva stupne voľnosti. Ide o jeden pohyb, ktorý môže prebiehať dvoma smermi.

Teraz si predstav bod na stole. Môžeme ho posúvať doľava a doprava a nezávisle od toho dopredu a dozadu. Potrebujeme teda dve hodnoty na určenie jeho polohy.

Takýto bod má **2 DOF**.

Ešte presnejšie preto môžeme povedať:

> **Počet stupňov voľnosti je najmenší počet nezávislých reálnych hodnôt, ktoré potrebujeme na úplný opis konfigurácie systému.**

Slovo nezávislých je veľmi dôležité. Ak zmena jednej hodnoty automaticky určuje inú, potom tieto dve hodnoty nepredstavujú dve nezávislé možnosti.

---

## 03. Poloha nie je to isté ako orientácia

Predstav si telefón položený na stole.

Povieš mi: „Je presne v strede stola."

Viem už úplne presne, ako telefón leží?

Nie.

Môže byť displejom smerom k tebe, môže byť otočený o 90° alebo môže byť otočený šikmo. Jeho position – poloha môže byť rovnaká, zatiaľ čo jeho orientation – orientácia je iná.

Toto rozdelenie bude v robotike veľmi dôležité.

**Position** odpovedá na otázku: Kde sa objekt nachádza?

**Orientation** odpovedá na otázku: Ako je objekt otočený?

Keď chceme úplne opísať konfiguráciu tuhého telesa, väčšinou potrebujeme poznať oboje.

---

## 04. Tuhé teleso pohybujúce sa v rovine

Začnime jednoduchším svetom – pohybom v 2D rovine.

Predstav si mincu položenú naplocho na stole. Minca musí zostať na stole, nesmieme ju zdvihnúť ani nakloniť.

Čo všetko s ňou môžeme urobiť?

- Môžeme ju posúvať doľava a doprava. To je jedna nezávislá možnosť.
- Môžeme ju posúvať dopredu a dozadu. To je druhá.
- A môžeme ju na stole otáčať. To je tretia.

Máme teda:

**2 translačné DOF + 1 rotačný DOF = 3 DOF.**

Tuhé teleso pohybujúce sa v rovine má preto tri stupne voľnosti.

Jeho konfiguráciu môžeme opísať napríklad tromi hodnotami: prvé dve povedia, kde sa nachádza, a tretia povie, ako je otočené.

Nemusíme zatiaľ riešiť konkrétne matematické značenie. Podstatná je predstava: **kde som + ako som otočený**.

> **Malý mentálny experiment:** Polož si dlaň naplocho na stôl a predstav si, že ju nesmieš zdvihnúť. Posuň ju doprava. Posuň ju dopredu. Otoč ju na mieste. To sú tri nezávislé pohyby. Teraz skús urobiť štvrtý pohyb bez toho, aby si dlaň zdvihla alebo naklonila mimo roviny stola. Nenájdeš ho. Každá ďalšia poloha dlane na stole sa dá vytvoriť kombináciou týchto troch možností. To je intuitívny význam 3 DOF v rovine.

> **Poznámka:** 2D robot nemusí byť fyzicky plochý. Keď v robotike hovoríme o planar robot alebo **planar rigid body**, neznamená to, že samotný robot musí byť dvojrozmerný. Reálny robot je samozrejme 3D objekt. Ide o to, že jeho povolený pohyb je obmedzený na jednu rovinu.

---

## 05. Prečo rigidita znižuje počet nezávislých hodnôt?

Teraz sa na rovnakú mincu pozrieme trochu hlbšie.

Označme na nej tri body: A, B a C.

![Tri body na minci a ich constraints](/book/ch2/fig2-2.png)

Keby to boli tri samostatné bodky, ktoré môžeme ľubovoľne presúvať po stole, každý bod by potreboval dve hodnoty na určenie svojej polohy.

Tri nezávislé body by teda mali spolu: **2 + 2 + 2 = 6 DOF.**

Lenže naše body nie sú nezávislé.

Sú súčasťou jednej pevnej mince.

Ak posunieš A, nemôže B zostať na pôvodnom mieste, pretože by sa minca musela natiahnuť. Ak pohneš B, musí sa zodpovedajúcim spôsobom pohnúť aj C.

Prečo?

Pretože vzdialenosti medzi bodmi musia zostať rovnaké.

- Vzdialenosť A–B je pevná.
- Vzdialenosť B–C je pevná.
- Vzdialenosť A–C je pevná.

Takéto pravidlo, ktoré obmedzuje možné konfigurácie systému, nazývame **constraint** – obmedzenie alebo väzba.

A práve constraints nám postupne odoberajú možnosti, ktoré by samostatné body mali.

---

## 06. Umiestnime mincu krok za krokom

Najskôr vyberieme, kde bude bod A.

A môžeme položiť kamkoľvek na stôl. Na určenie jeho polohy potrebujeme dve nezávislé hodnoty.

Máme teda prvé: **2 DOF.**

Teraz chceme umiestniť B.

B však nemôžeme položiť hocikam. Je pevnou súčasťou mince a musí zostať v rovnakej vzdialenosti od A.

Predstav si, že vzdialenosť A–B je 3 cm. Keď už poznáme A, všetky možné miesta vzdialené presne 3 cm od A vytvoria kružnicu okolo A.

B môže byť kdekoľvek na tejto kružnici.

Na výber konkrétneho miesta nám stačí jedna ďalšia hodnota – môžeme si ju predstaviť ako uhol okolo A.

B teda pridá: **1 DOF.**

Dokopy máme: **2 + 1 = 3 DOF.**

A tým sme už v podstate určili, kde minca leží a ako je otočená.

---

## 07. Prečo bod C nepridá ďalšie DOF?

Zostáva bod C.

Ten musí byť v správnej vzdialenosti od A a zároveň v správnej vzdialenosti od B.

Predstav si kružnicu okolo A, ktorá určuje všetky možné miesta C podľa jeho vzdialenosti od A. Potom druhú kružnicu okolo B, ktorá určuje všetky možné miesta C podľa jeho vzdialenosti od B.

C musí spĺňať obe podmienky naraz.

Preto sa nemôže voľne pohybovať po stole.

V bežnej situácii dostaneme dve možné polohy – dve zrkadlové verzie toho istého usporiadania. Pri minci si ich môžeme predstaviť ako rozdiel medzi jednou a druhou stranou mince.

Ak však už vieme, ktorou stranou minca leží nahor, poloha C je určená.

C teda nepridáva ďalší spojitý stupeň voľnosti.

Preto má minca stále iba **3 DOF**, hoci pozostáva z obrovského množstva bodov.

---

## 08. Heads alebo tails nie je ďalší DOF

Tu sa objavuje jeden detail, ktorý je dobré pochopiť hneď.

Minca môže ležať: **heads up** alebo **tails up**.

Prečo teda nepovieme, že toto je štvrtý stupeň voľnosti?

Pretože DOF v tejto definícii opisujú spojité možnosti.

Napríklad polohu mince môžeš meniť plynulo. Môže byť 10 cm od okraja, potom 10,1 cm, 10,2 cm a tak ďalej. Aj jej uhol môžeš meniť plynulo.

Heads/tails je však iba voľba medzi dvoma oddelenými stavmi.

Nemáme niečo ako: heads → trochu heads → polovica heads → skoro tails → tails, pokiaľ stále požadujeme, aby minca ležala naplocho na stole.

Preto táto diskrétna voľba nezvyšuje počet stupňov voľnosti.

---

## 09. Čo sa stane, keď pridáme ďalší bod?

Pridajme na mincu bod D.

Keďže bod v rovine má dve súradnice, mohlo by sa zdať, že sme pridali ďalšie dva stupne voľnosti.

Lenže D je opäť pevnou súčasťou mince.

Jeho vzdialenosť od ostatných bodov je daná. Keď už poznáme konfiguráciu mince, poloha D je automaticky určená.

Môžeme dokonca napísať viacero constraints – napríklad pevnú vzdialenosť D od A, B a C. Nie všetky však musia poskytovať novú informáciu.

Tu sa stretávame s pojmom **independent constraint** – nezávislé obmedzenie.

Ak jedno obmedzenie iba opakuje informáciu, ktorú už vieme z ostatných, je redundantné. Pri počítaní DOF preto nestačí slepo spočítať všetky možné constraints. Musíme vedieť, koľko z nich je skutočne nezávislých.

Táto myšlienka bude veľmi dôležitá pri zložitejších robotických mechanizmoch.

---

## 10. Z toho vzniká základné pravidlo

Teraz môžeme formulovať jeden z hlavných princípov tejto kapitoly.

Ak máme systém s určitým počtom možností a potom naň pridáme nezávislé constraints, tieto constraints mu niektoré možnosti odoberú.

Preto môžeme uvažovať:

**DOF = pôvodný počet možností - počet nezávislých constraints.**

Alebo matematickejšie:

**DOF = počet premenných - počet nezávislých rovníc, ktoré ich obmedzujú.**

Toto pravidlo si zapamätaj hlavne významovo.

Predstav si DOF ako slobodu pohybu a constraints ako pravidlá, ktoré časť tejto slobody odoberajú.

Neskôr urobíme presne to isté s robotom. Jednotlivé linky budú mať určité možnosti pohybu a joints medzi nimi tieto možnosti obmedzia.

> **Poznámka:** Kĺb robotovi pohyb nielen umožňuje, ale zároveň ho aj zakazuje. Keď sa pozrieš na pánt dverí, intuitívne vidíš, že dverám umožňuje otáčanie. Z pohľadu robotiky je však rovnako dôležité to, že im zároveň zakazuje ostatné pohyby. Práve takýto pohľad na joints vedie k počítaniu stupňov voľnosti celých robotov.

---

## 11. Z roviny sa presunieme do 3D priestoru

Teraz mincu zdvihneme zo stola.

Už nie je obmedzená na jednu rovinu a môže sa voľne pohybovať vo vzduchu.

Najskôr riešme iba jej position – polohu.

V 3D priestore ju môžeme posúvať v troch nezávislých smeroch:
- doľava a doprava
- dopredu a dozadu
- hore a dole

Na presné určenie polohy teda potrebujeme 3 hodnoty.

To znamená: **3 translačné DOF.**

Lenže poloha stále nehovorí nič o tom, ako je minca otočená.

---

## 12. V priestore máme aj tri možnosti rotácie

Predstav si teraz namiesto mince mobil, ktorý držíš vo vzduchu.

- Môžeš ho nakloniť dopredu a dozadu.
- Môžeš ho nakloniť do strán.
- A môžeš ho otočiť okolo ďalšej osi.

Na úplné určenie jeho orientácie v priestore preto potrebujeme ďalšie tri nezávislé rotačné DOF.

Celkový výsledok je:

**3 translačné DOF + 3 rotačné DOF = 6 DOF.**

Tuhé teleso voľne sa pohybujúce v trojrozmernom priestore má teda: **6 degrees of freedom.**

Toto číslo sa bude v robotike objavovať neustále.

Napríklad keď budeme neskôr hovoriť o robotickom ramene, ktoré dokáže ľubovoľne nastaviť polohu aj orientáciu svojho end-effectora, veľmi často budeme hovoriť práve o úlohe so šiestimi stupňami voľnosti.

---

## 13. Rovnakých 6 DOF vieme odvodiť pomocou bodov A, B a C

Kniha opäť používa body A, B a C, pretože nám ukazujú, prečo dostaneme práve číslo šesť.

Najskôr umiestnime **bod A**. Keďže sme v trojrozmernom priestore, A môžeme umiestniť kdekoľvek – doprava alebo doľava, dopredu alebo dozadu a hore alebo dole. Preto A poskytuje: **3 DOF.**

Potom umiestnime **bod B**. B musí zostať v pevnej vzdialenosti od A. Predstav si A v strede neviditeľnej gule. B môže byť kdekoľvek na povrchu tejto gule. Na výber miesta na povrchu gule potrebujeme dve nezávislé hodnoty. Intuitívne si ich môžeš predstaviť ako zemepisnú šírku a dĺžku na Zemi. B teda pridáva: **2 DOF.**

Nakoniec umiestnime **bod C**. C musí byť v správnej vzdialenosti od A aj od B. Tieto dve podmienky ho obmedzia tak, že sa v bežnom prípade môže pohybovať už iba po určitej kružnici. Na výber miesta na kružnici stačí jedna hodnota. C preto pridáva: **1 DOF.**

A dostávame:

**3 + 2 + 1 = 6 DOF.**

Tri vybrané body pritom nesmú ležať na jednej priamke. Potrebujeme ich rozložené tak, aby skutočne dokázali určiť orientáciu celého telesa.

---

## 14. Planar vs. spatial rigid body

Teraz už môžeme jasne rozlíšiť dva pojmy, ktoré sa budú v Modern Robotics používať ďalej.

**Planar rigid body** je tuhé teleso, ktorého pohyb je obmedzený na rovinu. Má: **2 translačné DOF + 1 rotačný DOF = 3 DOF.** Typickým príkladom je predmet, ktorý sa môže voľne posúvať a otáčať po stole.

**Spatial rigid body** je tuhé teleso, ktoré sa môže voľne pohybovať v trojrozmernom priestore. Má: **3 translačné DOF + 3 rotačné DOF = 6 DOF.** Typickým príkladom môže byť voľne letiaci objekt.

Dá sa na to pozrieť ešte jedným veľmi užitočným spôsobom. Planárne teleso je stále fyzicky trojrozmerné teleso. Len sme mu pomocou constraints zakázali tri z jeho šiestich možností pohybu.

Preto:
- spatial rigid body → 6 DOF
- planar rigid body → 3 DOF

---

## 15. Prečo je práve 6 DOF v robotike také dôležité?

Predstav si robotické rameno s gripperom.

Ak chceme gripper dostať k predmetu, potrebujeme určiť jeho position – napríklad aby sa nachádzal presne nad predmetom.

Často však nestačí byť iba na správnom mieste. Gripper musí mať aj správnu orientation. Ak chceme chytiť fľašu zhora, gripper musí byť otočený inak, než keby ju chytal zboku.

Pre úplnú konfiguráciu voľného rigid body v priestore preto riešime: **3 DOF pre position + 3 DOF pre orientation.**

To je jeden z dôvodov, prečo má mnoho priemyselných robotických ramien práve šesť riadených osí. Šesť vhodne usporiadaných stupňov voľnosti umožňuje end-effectoru dosiahnuť všeobecnú polohu a orientáciu v 3D priestore v rámci pracovného priestoru robota.

Viac DOF však nemusí znamenať „lepší robot". Ak má robot napríklad sedem stupňov voľnosti, môže mať pre rovnakú požadovanú polohu a orientáciu end-effectora viacero možných konfigurácií. Tomu sa neskôr budeme venovať ako kinematic redundancy.

---

## 16. Najdôležitejšia myšlienka celej lekcie

Pointou Chapter 2.1 nie je iba naučiť sa naspamäť čísla 3 a 6.

Dôležitejšie je pochopiť spôsob uvažovania.

Najskôr sa pozrieme na systém a predstavíme si, aké možnosti by mal, keby neexistovali žiadne obmedzenia.

Potom sa pozrieme na constraints a zisťujeme, ktoré možnosti pohybu systému odoberajú.

To, čo zostane, predstavuje jeho degrees of freedom.

Pri rigid body sú constraints spôsobené tým, že vzdialenosti medzi jeho bodmi sa nesmú meniť.

V ďalšej kapitole už nebudeme skúmať iba jedno teleso. Začneme spájať viac rigid bodies pomocou joints.

A zrazu budeme môcť rovnakú myšlienku použiť na celý robot: **Koľko možností pohybu by jednotlivé linky mali samostatne a koľko z nich im odoberú kĺby?**

Práve z tejto otázky vznikne Grüblerova formula, ktorú budeme používať v Chapter 2.2 – Degrees of Freedom of a Robot.

---

## Čo by ti po tejto lekcii malo zostať v hlave

- Keď uvidíš pojem **rigid body**, predstav si pevný objekt, ktorého tvar sa počas pohybu nemení.
- Keď uvidíš **degree of freedom**, rozmýšľaj nad jednou nezávislou hodnotou potrebnou na opis konfigurácie.
- Keď uvidíš **planar rigid body**, myslí na: 2 posunutia + 1 otočenie = **3 DOF**.
- Keď uvidíš **spatial rigid body**, myslí na: 3 posunutia + 3 otočenia = **6 DOF**.
- A keď uvidíš **constraint**, predstav si pravidlo, ktoré systému niektorú možnosť pohybu odoberá.

Ak toto chápeš, máš presne ten základ, ktorý potrebuješ na ďalšiu časť Chapter 2.2.`;
