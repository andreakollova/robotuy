// Chapter 2.1 – Lekcia 3: Stupne voľnosti tuhého telesa
// Full lesson content - DO NOT SHORTEN

export const ch21Content = `# Lekcia 3: Stupne voľnosti tuhého telesa

V predchádzajúcej lekcii sme si vysvetlili, že **configuration — konfigurácia** opisuje úplný stav mechanického systému a že počet nezávislých hodnôt potrebných na jej určenie nazývame **degrees of freedom — stupne voľnosti**, skrátene **DOF**.

Teraz sa na túto myšlienku pozrieme podrobnejšie a položíme si konkrétnu otázku: **Koľko stupňov voľnosti má jedno tuhé teleso?**

Táto otázka je pre robotiku veľmi dôležitá. Jednotlivé pevné časti robota — jeho links — totiž modelujeme ako **rigid bodies, teda tuhé telesá**. Ak pochopíme, ako sa môže pohybovať jedno voľné teleso, neskôr môžeme začať viac takýchto telies spájať pomocou joints a zisťovať, koľko stupňov voľnosti zostane celému robotickému mechanizmu.

Výsledok, ku ktorému sa v tejto lekcii dostaneme, je jednoduchý: **tuhé teleso pohybujúce sa v rovine má 3 DOF a tuhé teleso voľne sa pohybujúce v trojrozmernom priestore má 6 DOF**.

Samotné čísla však nie sú to najdôležitejšie. Podstatné je pochopiť, **prečo** práve tri a šesť — a ako sa k týmto hodnotám môžeme dostať systematicky.

![Konfigurácia dverí, bodu v rovine a mince](/book/ch2/fig2-1.png)

---

## 01. Najskôr si musíme zjednodušiť skutočný svet

Skutočné objekty nie sú dokonale pevné. Kovové rameno robota sa môže pri veľkom zaťažení nepatrne ohnúť, plast sa môže deformovať a dokonca aj oceľ pri pôsobení sily mierne zmení svoj tvar.

Keby sme však pri každom pohybe robota museli sledovať deformáciu každého milimetra materiálu, aj veľmi jednoduchá analýza by sa rýchlo stala extrémne komplikovanou. Pri základnej robotike preto používame zjednodušený model a pevné časti robota považujeme za **rigid bodies — tuhé telesá**.

Rigid body je idealizovaný objekt, ktorého tvar a rozmery považujeme za nemenné. Teleso sa môže presúvať a otáčať, ale v našom modeli sa nenaťahuje, neskracuje ani neohýba.

Predstav si napríklad kovový link robotického ramena. Na jeho povrchu označíme dva body A a B. Keď sa rameno pohne, oba body môžu skončiť na úplne inom mieste v priestore. Jedna vec sa však nezmení — **vzdialenosť medzi A a B zostane rovnaká**.

Ak je ich vzdialenosť 20 cm, potom bez ohľadu na to, ako teleso presunieme alebo otočíme, musí stále platiť:

**vzdialenosť A–B = 20 cm**

Práve toto je základná vlastnosť rigid body.

Táto predstava nám výrazne zjednodušuje opis pohybu. Keď poznáme konfiguráciu tuhého telesa, nemusíme samostatne určovať polohu každého jeho bodu. Pretože všetky body sú medzi sebou pevne geometricky prepojené, z polohy a orientácie celého telesa vieme odvodiť polohu ktoréhokoľvek jeho bodu.

Robotický link môže fyzicky obsahovať obrovské množstvo bodov, ale na úplný opis voľného rigidného telesa v 3D priestore nám bude stačiť iba **šesť nezávislých hodnôt**.

A práve rigidita je dôvod, prečo je to možné.

---

## 02. Čo presne znamená degree of freedom

**Degree of freedom — DOF** môžeme intuitívne chápať ako jednu nezávislú možnosť, ktorou môžeme meniť konfiguráciu systému.

Predstav si napríklad výťah. Kabína sa môže pohybovať hore alebo dole, ale za normálnych okolností sa nemôže posúvať doľava, doprava ani sa otáčať. Na určenie jej polohy stačí jedna hodnota — napríklad výška.

Výťah preto môžeme považovať za systém s **1 DOF**.

Je pritom dôležité uvedomiť si, že pohyb hore a pohyb dole nie sú dva rôzne stupne voľnosti. Ide stále o jednu nezávislú súradnicu, ktorá sa môže meniť v dvoch smeroch.

Ak napríklad označíme výšku kabíny ako h, hodnota h môže rásť alebo klesať. Stále však potrebujeme iba jedno číslo.

Teraz si predstav geometrický bod voľne sa pohybujúci po stole. Jeho polohu môžeme meniť v dvoch nezávislých smeroch — napríklad pomocou súradníc x a y. Na úplné určenie jeho polohy potrebujeme dve hodnoty, takže má **2 DOF**.

Presnejšie preto môžeme povedať:

**Počet stupňov voľnosti je najmenší počet nezávislých reálnych hodnôt potrebných na úplné určenie konfigurácie systému.**

Slovo **nezávislých** je tu zásadné. Ak je jedna hodnota automaticky určená ostatnými, nepridáva systému ďalší stupeň voľnosti.

---

## 03. Poloha a orientácia opisujú dve rôzne veci

Predstav si telefón položený presne v strede stola. Ak poviem iba to, kde sa nachádza jeho stred, ešte stále nevieme úplne určiť, ako telefón leží.

Môže byť hornou hranou otočený smerom k tebe, môže byť otočený o 90° alebo môže ležať šikmo. Jeho stred sa pritom môže stále nachádzať na rovnakom mieste.

V robotike preto rozlišujeme dva základné pojmy: **position — poloha** a **orientation — orientácia**.

Position odpovedá na otázku **kde sa teleso nachádza**. Orientation odpovedá na otázku **ako je teleso natočené**.

Pri samotnom geometrickom bode orientáciu riešiť nemusíme. Bod nemá žiadny tvar, takže jeho otočenie nič nemení. Rigid body však tvar má. Preto pri úplnom opise jeho konfigurácie väčšinou potrebujeme poznať polohu aj orientáciu.

Toto rozlíšenie sa bude v robotike objavovať neustále. Robotický gripper môže byť na správnom mieste, ale ak je nesprávne natočený, úlohu nemusí vedieť vykonať. Pri uchopení predmetu, skrutkovaní alebo zváraní preto často nestačí kontrolovať iba position — potrebujeme správnu aj orientation.

---

## 04. Tuhé teleso pohybujúce sa v rovine

Začnime jednoduchším prípadom a obmedzme pohyb telesa na jednu rovinu.

Predstav si mincu položenú naplocho na stole. Minca musí počas celého pohybu zostať na stole. Nemôžeme ju zdvihnúť, prevrátiť ani nakloniť mimo roviny.

Aké nezávislé pohyby môže vykonať?

Môžeme ju posunúť v jednom smere po stole, napríklad doľava alebo doprava. Nezávisle od toho ju môžeme posunúť v druhom smere, napríklad dopredu alebo dozadu. A napokon ju môžeme na mieste otáčať.

Máme teda **dva translačné stupne voľnosti** a **jeden rotačný stupeň voľnosti**.

Výsledok je:

**2 translácie + 1 rotácia = 3 DOF**

Tuhé teleso, ktorého pohyb je obmedzený na rovinu, preto nazývame **planar rigid body** a má **3 degrees of freedom**.

Jeho konfiguráciu môžeme napríklad zapísať ako:

**q = (x, y, θ)**

Súradnice x a y určujú polohu telesa v rovine a θ určuje jeho orientáciu.

Veľmi jednoduchý spôsob, ako si to predstaviť, je položiť dlaň naplocho na stôl. Bez toho, aby si ju zdvihla alebo naklonila, ju môžeš posunúť doľava alebo doprava, dopredu alebo dozadu a môžeš ju otočiť na mieste. Každá ďalšia poloha dlane v rovine sa dá vytvoriť kombináciou týchto troch možností.

Žiadny štvrtý nezávislý pohyb v tej istej rovine už neexistuje.

Je tiež dôležité pochopiť, že označenie **planar rigid body** neznamená, že samotný objekt je fyzicky dvojrozmerný. Telefón, mobilný robot alebo kovová súčiastka sú stále trojrozmerné objekty. Slovo planar hovorí iba o tom, že **ich povolený pohyb je obmedzený na jednu rovinu**.

---

## 05. Prečo tri body na telese nemajú šesť stupňov voľnosti

Teraz sa na rovnaký problém pozrieme iným spôsobom. Tento pohľad nám ukáže, prečo rigidita telesa znižuje počet nezávislých možností.

Predstav si, že na minci označíme tri rôzne body A, B a C.

![Tri body na minci a ich constraints](/book/ch2/fig2-2.png)

Ak by tieto body neboli súčasťou jedného telesa a mohli sa po stole pohybovať úplne nezávisle, každý z nich by potreboval dve súradnice na určenie svojej polohy.

Bod A by mal 2 DOF, bod B ďalšie 2 DOF a bod C ďalšie 2 DOF.

Spolu by teda tri úplne nezávislé body mali:

**2 + 2 + 2 = 6 DOF**

Lenže naše body nie sú nezávislé. Sú súčasťou jednej pevnej mince.

Ak pohneme bodom A, body B a C sa musia pohybovať spolu s ním. Nemôžeme napríklad posunúť A doprava a nechať B na pôvodnom mieste, pretože tým by sme zmenili vzdialenosť medzi A a B — a minca by sa musela natiahnuť alebo deformovať.

Pri rigid body sa však vzdialenosti medzi bodmi meniť nesmú.

Preto zostávajú pevné vzdialenosti:

**A–B**, **B–C** a **A–C**.

Tieto pevné geometrické vzťahy predstavujú **constraints — obmedzenia**. Constraints hovoria, ktoré kombinácie polôh bodov sú dovolené a ktoré nie.

Práve vďaka nim nemá trojica bodov na pevnom telese šesť nezávislých stupňov voľnosti.

---

## 06. Umiestnime body A, B a C krok za krokom

Najskôr umiestnime bod A.

Pretože sa pohybujeme v rovine, môžeme A položiť kamkoľvek na stôl. Na určenie jeho polohy potrebujeme dve nezávislé hodnoty — napríklad x a y.

Bod A nám teda dáva:

**2 DOF**

Teraz chceme umiestniť bod B. Ten už však nemôžeme položiť ľubovoľne. B je súčasťou toho istého rigidného telesa a jeho vzdialenosť od A musí zostať pevná.

Predstav si napríklad, že vzdialenosť medzi A a B je 3 cm. Keď už poznáme polohu A, bod B sa musí nachádzať presne 3 cm od neho.

Všetky body v rovine, ktoré sú vzdialené presne 3 cm od A, vytvárajú kružnicu.

B teda nemôže byť kdekoľvek na stole. Môže sa nachádzať iba niekde na tejto kružnici.

Na výber konkrétneho miesta na kružnici nám stačí jedna hodnota — môžeme si ju predstaviť ako uhol okolo bodu A.

Bod B preto pridáva iba:

**1 DOF**

Dohromady máme:

**2 + 1 = 3 DOF**

A tým sme už v podstate určili polohu aj orientáciu rigidného telesa v rovine.

---

## 07. Prečo bod C nepridáva ďalší spojitý DOF

Zostáva nám bod C.

C musí zostať v pevnej vzdialenosti od A a zároveň v pevnej vzdialenosti od B.

Predstav si najskôr kružnicu so stredom v A. Tá predstavuje všetky možné body, ktoré majú správnu vzdialenosť od A. Potom si predstav druhú kružnicu so stredom v B, ktorá predstavuje všetky body so správnou vzdialenosťou od B.

C musí ležať na oboch kružniciach súčasne.

V bežnom prípade sa tieto dve kružnice pretínajú v dvoch bodoch. Dostaneme teda dve možné zrkadlové usporiadania trojice A, B a C.

To však neznamená, že C získal ďalší **spojitý** stupeň voľnosti. Nemôžeme ho plynulo posúvať po nejakej novej osi alebo krivke bez toho, aby sme porušili pevnú vzdialenosť od A alebo B.

Keď navyše vieme, ktorou stranou teleso smeruje, správna poloha C je už jednoznačne určená.

C teda nepridáva nový spojitý DOF.

Výsledkom zostáva:

**planar rigid body = 3 DOF**

Tento príklad zároveň ukazuje, akú veľkú úlohu pri určovaní stupňov voľnosti zohrávajú constraints. Keby body A, B a C mohli meniť svoju vzájomnú vzdialenosť, mali by spolu šesť stupňov voľnosti. Pretože však tvoria rigid body, ich pohyb je navzájom previazaný.

---

## 08. Prečo heads alebo tails nie je ďalší stupeň voľnosti

Pri predchádzajúcom príklade nám zostali dve možné zrkadlové polohy bodu C. Pri minci si ich môžeme intuitívne predstaviť ako situáciu, keď leží jednou alebo druhou stranou nahor.

Mohli by sme sa preto opýtať: Ak môže byť minca **heads up** alebo **tails up**, nemala by mať ďalší stupeň voľnosti?

Nie.

Dôvodom je rozdiel medzi **continuous** a **discrete** možnosťou.

Poloha mince sa môže meniť spojito. Môžeme ju posunúť o 1 cm, potom o 1,1 cm, 1,11 cm a medzi týmito hodnotami existujú ďalšie možné polohy. Rovnako môžeme jej orientáciu meniť o ľubovoľne malý uhol.

Heads a tails však tvoria dve oddelené možnosti. Pokiaľ požadujeme, aby minca stále ležala naplocho na stole, neexistuje plynulý stav „trochu heads" alebo „polovica heads a polovica tails".

Ide teda o **discrete variable — diskrétnu premennú**.

DOF v tomto kontexte počíta počet potrebných **spojitých reálnych parametrov**, nie počet všetkých možných diskrétnych stavov systému.

Preto minca stále zostáva systémom s **3 DOF**.

---

## 09. Čo ak na teleso pridáme ďalší bod?

Predstav si, že na mincu pridáme štvrtý bod D.

Samostatný bod v rovine by potreboval dve súradnice. Mohlo by sa teda zdať, že sme systému pridali ďalšie 2 DOF.

Lenže D je opäť pevnou súčasťou toho istého rigidného telesa. Jeho poloha voči A, B a C je daná. Keď už poznáme konfiguráciu mince, poloha D je automaticky určená.

Môžeme pritom zapísať viacero constraints — napríklad pevnú vzdialenosť D od A, D od B a D od C. Tu sa však objavuje ďalšia dôležitá myšlienka: **nie všetky constraints musia byť nezávislé**.

Predstav si, že už máme dostatok informácií na jednoznačné určenie polohy bodu D. Ďalšia rovnica môže iba potvrdiť informáciu, ktorá už vyplýva z predchádzajúcich constraints. Takéto obmedzenie označujeme ako **redundantné**.

Pri počítaní stupňov voľnosti preto nemôžeme jednoducho spočítať každé pravidlo alebo každú rovnicu, ktorú dokážeme napísať. Zaujíma nás počet **independent constraints — nezávislých obmedzení**.

Táto myšlienka bude pri zložitejších robotoch veľmi dôležitá. Mechanizmus môže obsahovať veľké množstvo geometrických vzťahov, ale nie každý z nich odoberá ďalší stupeň voľnosti.

---

## 10. Základný princíp: voľnosť mínus obmedzenia

Teraz už môžeme sformulovať všeobecnú myšlienku, ktorá sa bude používať aj pri ďalších robotických mechanizmoch.

Najskôr si predstavíme, koľko nezávislých možností by systém mal bez určitých väzieb. Potom sa pozrieme na constraints, ktoré niektoré z týchto možností zakazujú.

Pre jednoduché prípady môžeme uvažovať:

**DOF = počet nezávislých premenných - počet nezávislých obmedzení**

Podstatná však nie je samotná formulka, ale spôsob premýšľania.

**Degrees of freedom predstavujú voľnosť systému. Constraints túto voľnosť obmedzujú.**

Presne tak sa môžeme pozerať aj na joints robota.

Pánt dverí na prvý pohľad vnímame ako mechanizmus, ktorý **umožňuje rotáciu**. Z pohľadu počítania DOF je však rovnako dôležité všimnúť si všetky pohyby, ktoré pánt **neumožňuje**.

Dvere by sa bez pántov mohli voľne premiestňovať a otáčať v priestore. Po pripevnení pántom väčšinu týchto pohybov stratia a zostane im iba rotácia okolo jednej osi.

Joint teda nie je iba „miesto, kde sa robot môže pohybovať". Z matematického pohľadu zároveň predstavuje súbor constraints, ktoré niektoré relatívne pohyby medzi linkmi zakazujú.

Práve tento pohľad budeme potrebovať pri počítaní stupňov voľnosti celých robotov.

---

## 11. Z roviny sa presunieme do trojrozmerného priestoru

Doteraz sme teleso držali na stole. Teraz toto obmedzenie odstránime a necháme ho voľne sa pohybovať v priestore.

Predstav si napríklad telefón, ktorý držíš vo vzduchu.

Najskôr sa sústreďme iba na jeho **position — polohu**.

V trojrozmernom priestore sa môže nezávisle presúvať v troch smeroch. Môže sa pohybovať doľava alebo doprava, dopredu alebo dozadu a hore alebo dole.

Na určenie jeho polohy preto potrebujeme tri nezávislé súradnice, napríklad:

**x, y, z**

Voľné teleso v priestore má teda:

**3 translačné DOF**

Tieto tri hodnoty však určujú iba to, kde sa teleso nachádza. Stále nevieme, ako je natočené.

A preto musíme pridať orientáciu.

---

## 12. V 3D priestore má teleso aj tri rotačné stupne voľnosti

Drž telefón pred sebou vo vzduchu a bez toho, aby si výrazne zmenila polohu jeho stredu, začni meniť jeho orientáciu.

Môžeš ho nakloniť dopredu alebo dozadu. Môžeš ho nakloniť doľava alebo doprava. A môžeš ho otočiť okolo ďalšej osi tak, akoby si ho otáčala na stole.

Na úplné určenie orientácie voľného rigidného telesa v 3D priestore potrebujeme **tri nezávislé rotačné parametre**.

K trom translačným stupňom voľnosti preto pridáme tri rotačné:

**3 translačné DOF + 3 rotačné DOF = 6 DOF**

Voľné rigidné teleso v trojrozmernom priestore má teda:

**6 degrees of freedom**

Tento výsledok patrí medzi najdôležitejšie základné fakty robotiky.

Môžeme si ho zapamätať veľmi intuitívne:

**3 DOF hovoria, kde teleso je. Ďalšie 3 DOF hovoria, ako je natočené.**

Spolu máme úplný opis jeho konfigurácie v priestore.

---

## 13. Prečo je to práve 6 DOF: dôkaz pomocou bodov A, B a C

K rovnakému výsledku sa môžeme dostať aj pomocou bodov A, B a C. Tento pohľad nám zároveň ukáže, ako rigidita postupne obmedzuje pohyb jednotlivých bodov.

Začneme bodom A.

V trojrozmernom priestore ho môžeme umiestniť kamkoľvek. Na jeho polohu potrebujeme tri súradnice — napríklad x, y a z.

Bod A preto poskytuje:

**3 DOF**

Teraz pridáme bod B. Keďže B patrí k tomu istému rigidnému telesu, jeho vzdialenosť od A musí zostať pevná.

Ak je napríklad vzdialenosť A–B rovná 10 cm, B sa musí nachádzať presne 10 cm od A.

V trojrozmernom priestore tvoria všetky body vzdialené 10 cm od A **povrch gule**.

B teda už nemôžeme umiestniť ľubovoľne v celom priestore. Môžeme ho vybrať iba niekde na povrchu tejto gule.

Na určenie konkrétneho bodu na povrchu gule potrebujeme dve nezávislé hodnoty. Intuitívne si ich môžeš predstaviť podobne ako zemepisnú šírku a zemepisnú dĺžku na povrchu Zeme.

Bod B preto pridáva:

**2 DOF**

Zatiaľ máme:

**3 + 2 = 5 DOF**

Nakoniec pridáme bod C. C musí zostať v pevnej vzdialenosti od A a zároveň v pevnej vzdialenosti od B.

Prvá podmienka ho obmedzí na povrch jednej gule a druhá na povrch druhej gule. Prienikom týchto dvoch povrchov je v bežnom prípade **kružnica**.

C sa teda už nemôže pohybovať po celej guli. Môže sa pohybovať iba po tejto kružnici.

Na výber konkrétneho miesta na kružnici potrebujeme už len jednu hodnotu.

Bod C preto pridáva:

**1 DOF**

A výsledok je:

**3 + 2 + 1 = 6 DOF**

Takto sme nezávisle od predchádzajúcej predstavy troch translácií a troch rotácií opäť dostali šesť stupňov voľnosti.

Je pritom dôležité, aby body A, B a C neležali na jednej priamke. Tri vhodne zvolené nekolineárne body dokážu jednoznačne určiť polohu aj orientáciu rigidného telesa.

---

## 14. Planar rigid body a spatial rigid body

Teraz už môžeme presne rozlíšiť dva pojmy, s ktorými sa budeme v Modern Robotics stretávať veľmi často.

**Planar rigid body** je tuhé teleso, ktorého pohyb je obmedzený na jednu rovinu. Má dva translačné a jeden rotačný stupeň voľnosti, teda spolu:

**planar rigid body = 3 DOF**

Typickým príkladom môže byť objekt, ktorý sa môže voľne posúvať a otáčať po stole, ale nemôže sa zdvihnúť ani nakloniť.

**Spatial rigid body** je tuhé teleso, ktoré sa môže voľne pohybovať v trojrozmernom priestore. Má tri translačné a tri rotačné stupne voľnosti:

**spatial rigid body = 6 DOF**

Typickým príkladom je voľný objekt pohybujúci sa vo vzduchu.

Dôležité je uvedomiť si, že planar rigid body je stále fyzicky trojrozmerný objekt. Rozdiel je iba v tom, že jeho pohyb je pomocou constraints obmedzený.

Na spatial rigid body sa preto môžeme pozerať ako na teleso so šiestimi možnosťami pohybu. Ak mu mechanickými obmedzeniami zakážeme tri z nich a dovolíme mu zostať iba v jednej rovine, dostaneme planar rigid body s tromi stupňami voľnosti.

Tento spôsob uvažovania bude veľmi užitočný aj pri joints: **najskôr sa pozrieme na všetky možné pohyby a potom zisťujeme, ktoré z nich mechanické väzby odstránia.**

---

## 15. Prečo je 6 DOF v robotike také dôležité

Šesť stupňov voľnosti sa v robotike objavuje veľmi často, pretože práve šesť nezávislých hodnôt potrebujeme na úplný opis konfigurácie voľného rigidného telesa v trojrozmernom priestore.

Predstav si robotické rameno s gripperom.

Ak chceme gripper dostať k predmetu, potrebujeme určiť jeho polohu. Môžeme napríklad požadovať, aby sa nachádzal presne 20 cm nad konkrétnym miestom na stole.

Samotná poloha však často nestačí.

Ak má gripper uchopiť fľašu zhora, musí mať inú orientáciu, než keby ju mal uchopiť zboku. Pri zváraní musí byť nástroj natočený správnym smerom voči povrchu. Pri skrutkovaní musí os skrutkovača smerovať pozdĺž osi skrutky.

Pre úplný opis **pose — polohy a orientácie** end-effectora v 3D priestore preto vo všeobecnosti potrebujeme:

**3 DOF pre position + 3 DOF pre orientation = 6 DOF**

To je jeden z dôvodov, prečo má veľa priemyselných robotických ramien šesť riadených osí. Šesť vhodne usporiadaných stupňov voľnosti môže robotu umožniť nastavovať polohu aj orientáciu end-effectora v rámci jeho pracovného priestoru.

Treba však dávať pozor na jednu vec: **robot so šiestimi joints automaticky nemusí dosiahnuť každú možnú polohu a orientáciu v priestore**. Záleží na konštrukcii robota, rozsahoch kĺbov, dĺžkach linkov, singularitách a ďalších obmedzeniach.

Rovnako platí, že viac DOF automaticky neznamená „lepší robot".

Robot môže mať napríklad sedem stupňov voľnosti a stále pracovať v šesťrozmernom priestore polohy a orientácie end-effectora. V takom prípade môže existovať viacero rôznych konfigurácií robota, ktoré vedú k rovnakému pose end-effectora.

Takýto jav nazývame **kinematic redundancy — kinematická redundancia** a vrátime sa k nemu neskôr.

---

## 16. Ako premýšľať nad stupňami voľnosti

Najdôležitejším výsledkom tejto lekcie nie sú samotné čísla 3 a 6. Oveľa dôležitejší je spôsob premýšľania, ktorý sme pri ich odvodzovaní použili.

Najskôr sa pozeráme na systém a zisťujeme, koľko nezávislých možností by mal bez určitých obmedzení. Potom identifikujeme constraints a sledujeme, ktoré z týchto možností nám odoberajú.

Pri rigid body vznikajú constraints preto, že vzdialenosti medzi jednotlivými bodmi telesa zostávajú pevné. Body sa preto nemôžu pohybovať nezávisle.

Rovnakú logiku budeme môcť použiť pri celom robotovi.

Ak máme viacero samostatných rigid bodies, každé z nich by malo určitý počet stupňov voľnosti. Keď ich však spojíme pomocou joints, pohyb už nebude úplne voľný. Každý joint dovolí iba určité relatívne pohyby a ostatné zakáže.

Namiesto otázky:

**„Koľko pohybov tento joint umožňuje?"**

je preto často užitočné položiť si aj opačnú otázku:

**„Ktoré pohyby tento joint odoberá?"**

Práve tento pohľad nás privedie k systematickému počítaniu stupňov voľnosti celých mechanizmov.

---

## Zhrnutie lekcie

**Rigid body — tuhé teleso** je idealizovaný objekt, ktorého tvar a rozmery sa počas pohybu nemenia. Jednotlivé body telesa sa môžu presúvať v priestore, ale ich vzájomné vzdialenosti zostávajú konštantné. Vďaka tomu nemusíme sledovať každý bod zvlášť — konfiguráciu celého telesa dokážeme opísať malým počtom nezávislých hodnôt.

**Degree of freedom — DOF** predstavuje jednu nezávislú reálnu hodnotu potrebnú na opis konfigurácie systému. Nejde o počet smerov, ako napríklad „hore" a „dole", ale o počet nezávislých súradníc, ktoré môžeme meniť.

Pri rigidnom telese zároveň rozlišujeme **position — polohu** a **orientation — orientáciu**. Poloha hovorí, kde sa teleso nachádza, zatiaľ čo orientácia určuje, ako je natočené.

**Planar rigid body** sa môže pohybovať iba v jednej rovine. Má dve nezávislé translácie a jednu rotáciu:

**2 translačné DOF + 1 rotačný DOF = 3 DOF**

**Spatial rigid body** sa môže voľne pohybovať v trojrozmernom priestore. Má tri nezávislé translácie a tri nezávislé rotácie:

**3 translačné DOF + 3 rotačné DOF = 6 DOF**

Rovnaký výsledok môžeme odvodiť pomocou troch bodov A, B a C. V 3D priestore dostane A tri stupne voľnosti, B vďaka pevnej vzdialenosti od A pridá iba dva a C vďaka pevnej vzdialenosti od A aj B pridá už len jeden:

**3 + 2 + 1 = 6 DOF**

Kľúčovú úlohu pritom zohrávajú **constraints — obmedzenia**. Tie prepájajú jednotlivé premenné a odoberajú systému nezávislé možnosti pohybu. Pri počítaní DOF nás zaujímajú iba **independent constraints**, teda obmedzenia, ktoré prinášajú skutočne novú informáciu.

Najdôležitejší mentálny model tejto lekcie je preto veľmi jednoduchý:

**voľný pohyb → pridáme constraints → zostanú degrees of freedom**

V ďalšej lekcii môžeme tento princíp preniesť z jedného rigidného telesa na **celého robota**. Namiesto pevných vzdialeností medzi bodmi budeme sledovať links a joints a ukážeme si, ako z nich systematicky vypočítať počet stupňov voľnosti robotického mechanizmu.`;
