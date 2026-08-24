// Chapter 2.3.1 – Configuration Space Topology
// Full lesson content - DO NOT SHORTEN

export const ch231Content = `# Chapter 2.3.1 – Configuration Space Topology

## Topológia konfiguračného priestoru

V predchádzajúcich častiach sme sa naučili rozmýšľať nad robotom pomocou jeho degrees of freedom (DOF). Počet DOF nám hovorí, koľko nezávislých hodnôt potrebujeme na úplný opis konfigurácie systému. Napríklad bod pohybujúci sa po rovine má 2 DOF, pretože potrebujeme poznať jeho polohu v dvoch smeroch. Planar rigid body má 3 DOF, pretože okrem polohy potrebujeme poznať aj jeho orientáciu.

Keď poznáme počet DOF, poznáme zároveň dimenziu configuration space (C-space). Robot s dvomi DOF má dvojrozmerný C-space, robot s tromi DOF trojrozmerný C-space a podobne. Samotná dimenzia nám však ešte nepovie, ako je tento priestor usporiadaný. Dva systémy môžu mať rovnaký počet DOF, a teda rovnako veľa dimenzií, ale ich configuration spaces môžu mať úplne odlišnú štruktúru.

Práve túto vlastnosť opisuje **topology** – topológia. V robotike nám topológia pomáha pochopiť základný „tvar" configuration space: či priestor pokračuje do nekonečna, či má hranice, či sa uzatvára sám do seba a ktoré konfigurácie sa v ňom nachádzajú vedľa seba. To bude dôležité nielen pri matematickom opise robotov, ale neskôr aj pri reprezentácii konfigurácie a plánovaní pohybu.

---

## 01. Rovnaká dimenzia, rozdielny configuration space

Predstav si bod, ktorý sa môže pohybovať kdekoľvek po nekonečnej rovnej ploche. Na určenie jeho polohy potrebujeme dve hodnoty, napríklad x a y. Bod má preto 2 DOF a jeho configuration space je dvojrozmerný.

Teraz si predstav bod, ktorý sa môže pohybovať iba po povrchu gule. Aj tu potrebujeme na určenie polohy dve nezávislé hodnoty. Na Zemi by sme napríklad mohli použiť zemepisnú šírku a zemepisnú dĺžku. Tento systém má teda tiež 2 DOF a jeho configuration space je tiež dvojrozmerný.

Tieto dva priestory sa však správajú rozdielne. Rovina pokračuje do nekonečna. Ak sa po nej pohybuješ stále rovnakým smerom, môžeš pokračovať ďalej a ďalej. Povrch gule sa naopak uzatvára sám do seba. Ak by si sa po Zemi pohybovala vhodným smerom dostatočne dlho, môžeš obísť celú Zem a vrátiť sa na miesto, z ktorého si vyšla.

Oba priestory majú rovnakú dimenziu, ale nemajú rovnakú topológiu. Počet DOF nám teda odpovedá na otázku „koľko nezávislých hodnôt potrebujem?", zatiaľ čo topológia nám pomáha odpovedať na otázku „akú štruktúru má priestor všetkých týchto možností?".

To je hlavná myšlienka tejto kapitoly.

---

## 02. Čo znamená topológia

Topológia je samostatná oblasť matematiky a dá sa študovať veľmi do hĺbky. Pre túto časť robotiky však nepotrebujeme jej formálnu matematickú definíciu. Stačí nám intuitívna predstava, ktorú používa aj Modern Robotics.

Dva priestory budeme považovať za **topologicky ekvivalentné**, ak môžeme jeden plynulo zdeformovať na druhý bez toho, aby sme ho museli rozrezať alebo zlepiť časti, ktoré predtým spojené neboli. Môžeme ho naťahovať, stláčať, ohýbať alebo meniť jeho veľkosť. Podstatné je, aby sme nemenili jeho základný spôsob prepojenia.

Predstav si napríklad povrch malej gumenej lopty. Môžeš ju nafúknuť a dostať väčšiu guľu. Z pohľadu geometrie sa zmenila jej veľkosť, ale z pohľadu topológie sa nič podstatné nestalo. Rovnako ju môžeš natiahnuť do oválneho tvaru podobného lopte na americký futbal. Povrch už geometricky nie je guľový, ale stále sme nič nerozrezali ani neprilepili.

Preto majú povrch malej gule, povrch veľkej gule a povrch oválnej lopty rovnakú topológiu. Ich presný geometrický tvar je rozdielny, ale základná štruktúra priestoru je rovnaká.

Pri robotike je toto rozlíšenie užitočné. **Geometry** rieši presné vzdialenosti, rozmery, uhly a tvary. **Topology** sa pozerá na základnú štruktúru priestoru bez ohľadu na jeho presné rozmery.

---

## 03. Prečo rovina a povrch gule nie sú to isté

Skúsme teraz rovnakú úvahu použiť na rovinu a povrch gule. Guľu môžeme zväčšovať, zmenšovať alebo naťahovať, ale stále zostane uzavretým povrchom. Ak z nej chceme vytvoriť obyčajnú rovinu, niekde ju musíme otvoriť.

Dobrou predstavou je mapa Zeme. Zem má približne guľový povrch, ale mapu chceme vytlačiť na rovný papier. Celý povrch Zeme nedokážeme jednoducho „položiť" na papier bez toho, aby sme ho určitým spôsobom rozdelili alebo skreslili. Práve preto existujú rôzne mapové projekcie a každá niečo deformuje.

Rovina a povrch gule teda môžu byť oba dvojrozmerné, ale nie sú topologicky ekvivalentné. Jeden priestor je otvorený a pokračuje do nekonečna, zatiaľ čo druhý sa uzatvára sám do seba.

Pre robotiku z toho vyplýva dôležité pravidlo: keď povieme, že robot má napríklad 2 DOF, ešte sme nepovedali všetko o jeho configuration space. Potrebujeme vedieť aj to, aký typ priestoru tieto dve dimenzie vytvárajú.

---

## 04. Rozdiely vidíme už pri jednorozmerných priestoroch

Nemusíme začínať guľami a komplikovanými robotmi. Rovnaký princíp môžeme pochopiť na troch veľmi jednoduchých jednorozmerných priestoroch: nekonečnej priamke, kružnici a konečnom úseku priamky.

V každom prípade potrebujeme na určenie konfigurácie iba jednu hodnotu. Všetky tieto priestory majú teda jednu dimenziu. Napriek tomu sa správajú úplne odlišne.

Nekonečná priamka nemá koniec. Kružnica sa uzatvára sama do seba. Úsek priamky má dva konce. Dimenzia všetkých troch priestorov je 1, ale ich topológia je rozdielna.

Práve tieto jednoduché priestory sa pritom v robotike objavujú veľmi prirodzene.

---

## 05. Nekonečná priamka a priestor R

Predstav si objekt, ktorý sa môže pohybovať iba doľava a doprava po jednej nekonečnej osi. Na opis jeho konfigurácie nám stačí jedno číslo. Môže byť napríklad na pozícii -2, 0, 4,5 alebo 100.

Takýto priestor môžeme stotožniť s množinou všetkých reálnych čísel a označujeme ho **R** alebo presnejšie **R1**.

R1 je teda obyčajná nekonečná číselná os. Nemá ľavý ani pravý koniec. Nech sa nachádzaš kdekoľvek, môžeš pokračovať ďalej oboma smermi.

V robotike by podobný priestor mohol opisovať ideálny prismatic joint bez joint limits. Ak by sa mohol vysúvať a zasúvať bez akéhokoľvek fyzického obmedzenia, jeho pozíciu by sme mohli opísať ľubovoľným reálnym číslom.

Samozrejme, reálny prismatic joint nebude nekonečný. Tento model však bude užitočný pri matematickom opise.

---

## 06. Kružnica a priestor S1

Teraz si namiesto lineárneho pohybu predstav rotáciu. Máme revolute joint, ktorý sa môže voľne otáčať okolo svojej osi bez joint limits.

Na opis jeho konfigurácie opäť potrebujeme iba jednu hodnotu – uhol. Joint má preto 1 DOF.

Mohlo by sa zdať, že jeho configuration space je rovnaký ako pri prismatic jointe. Oba predsa potrebujú jedno číslo. Rozdiel si však všimneme pri celej otáčke.

Ak joint otočíme z 0° na 90°, dostali sme inú konfiguráciu. Pri 180° máme opäť inú konfiguráciu. Ale keď pokračujeme až na 360°, nedostali sme nový fyzický stav. Joint sa vrátil do rovnakej orientácie ako pri 0°.

Inými slovami: **0° a 360° predstavujú tú istú konfiguráciu.**

Rovnako 10° a 370° opisujú rovnakú orientáciu. Uhol sa po jednej celej otáčke opakuje.

Configuration space takéhoto revolute jointu preto nie je nekonečná priamka. Je to kružnica, ktorá sa označuje **S1**.

Toto je veľmi dôležitý rozdiel medzi lineárnym a rotačným pohybom. Prismatic joint bez limits môžeme modelovať pomocou R, zatiaľ čo revolute joint s neobmedzenou rotáciou pomocou S1. Oba majú 1 DOF, ale ich C-spaces majú inú topológiu.

---

## 07. Ktoré rotačné konfigurácie sú v skutočnosti blízko seba

Kruhová topológia má praktický dôsledok, ktorý sa oplatí pochopiť.

Predstav si dve konfigurácie revolute jointu. V prvej je uhol 1°. V druhej je 359°.

Ak by sme sa pozerali iba na čísla na obyčajnej číselnej osi, rozdiel medzi 1 a 359 je 358. Mohlo by teda vyzerať, že tieto konfigurácie sú od seba veľmi vzdialené.

Fyzicky však stačí joint otočiť o 2° cez hranicu medzi 359°, 360° a 1°. Konfigurácie sú teda v skutočnosti veľmi blízko.

To je presne informácia, ktorú zachytáva kružnica S1. Na kružnici sa totiž „začiatok" a „koniec" uhlového zápisu stretávajú.

Toto bude neskôr dôležité napríklad pri motion planning. Ak chceme naplánovať najkratší pohyb rotačného jointu, musíme vedieť, že cesta z 359° na 1° nemusí viesť takmer celou otáčkou. Môže viesť iba dva stupne opačným smerom.

---

## 08. Closed interval – priestor s dvomi hranicami

Tretím jednoduchým príkladom je uzavretý interval. Predstav si reálny prismatic joint, ktorý sa môže vysunúť od 0 cm do 30 cm.

Jeho možné konfigurácie môžeme zapísať ako interval: **[0, 30]**

Hranaté zátvorky znamenajú, že hodnoty 0 aj 30 sú súčasťou priestoru. Joint môže byť úplne zasunutý aj úplne vysunutý.

Tento configuration space má opäť jednu dimenziu, ale na rozdiel od R má dva konce. Ak sme na 30 cm, nemôžeme pokračovať na 31 cm. A na rozdiel od S1 sa tieto konce navzájom nespájajú. Z maximálneho vysunutia sa nemôžeme ďalším pohybom rovnakým smerom zrazu dostať na minimálne vysunutie.

Takýto priestor nazývame **closed interval** – uzavretý interval.

Vidíme teda tri rôzne možnosti pre 1 DOF: R nemá konce, S1 sa uzatvára do kruhu a closed interval má dva koncové body. Počet DOF je vo všetkých prípadoch rovnaký, no spôsob usporiadania konfigurácií je iný.

---

## 09. Open interval a closed interval

Pri intervaloch budeme rozlišovať medzi closed interval a open interval.

**Closed interval** zapisujeme: **[a, b]** a oba body a aj b doň patria.

**Open interval** zapisujeme: **(a, b)** a body a a b doň nepatria. Môžeme sa k nim približovať akokoľvek blízko, ale samotné koncové hodnoty nie sú súčasťou priestoru.

Zaujímavým výsledkom je, že open interval je topologicky ekvivalentný nekonečnej priamke R.

Najskôr to môže znieť nesprávne. Interval medzi dvomi hodnotami predsa vyzerá konečne, zatiaľ čo R pokračuje do nekonečna. Topológia však nerieši fyzickú dĺžku priestoru.

Predstav si open interval ako dokonale pružnú gumu. Jeho stred môžeme ponechať približne na mieste, ale čím viac sa približujeme k ľavému koncu, tým viac priestor naťahujeme smerom doľava. Podobne pravú časť naťahujeme smerom doprava. Pretože samotné koncové body a a b v priestore nie sú, môžeme sa k nim približovať stále viac a ich obraz posúvať stále ďalej.

Takýmto plynulým naťahovaním môžeme open interval zmeniť na celú nekonečnú priamku.

Pri closed intervale to nefunguje, pretože jeho dva koncové body sú skutočnou súčasťou priestoru. Nemôžeme ich jednoducho nechať „zmiznúť v nekonečne" a stále tvrdiť, že ide o rovnaký topologický priestor.

---

## 10. Rn – Euclidean spaces

Symbol R môžeme používať aj vo viacerých dimenziách.

- **R1** je nekonečná priamka.
- **R2** je nekonečná rovina.
- **R3** je bežný trojrozmerný priestor.

Všeobecne **Rn** označuje **n-dimensional Euclidean space**.

Pre R2 môžeme každý bod opísať dvojicou čísel, napríklad x a y. Pre R3 potrebujeme tri čísla, napríklad x, y a z. Pre R6 by sme potrebovali šesť nezávislých reálnych hodnôt.

R6 si už nedokážeme nakresliť ani priamo predstaviť, ale matematicky s ním môžeme pracovať rovnako ako s R2 alebo R3. To je v robotike bežné, pretože configuration spaces môžu mať mnoho dimenzií.

Euclidean spaces sú „ploché" priestory, ktoré poznáme zo základnej analytickej geometrie. Dôležité však je, že nie každý configuration space je Euclidean space. Rotácie nám už ukázali jednoduchý príklad – S1 nie je to isté ako R1.

---

## 11. Sn – kružnice a sféry

Druhou dôležitou rodinou priestorov je **Sn**.

- **S1** je jednorozmerná kružnica.
- **S2** je dvojrozmerný povrch gule.

Pri S2 je dôležité slovo povrch. Nehovoríme o celom objeme gule. Myslíme iba jej vonkajší povrch, podobne ako povrch Zeme.

Prečo sa povrch gule nazýva S2, keď sa nachádza v trojrozmernom priestore? Pretože index označuje dimenziu samotného povrchu. Na určenie bodu na povrchu gule potrebujeme dve nezávislé hodnoty. Preto má povrch dve dimenzie.

Podobne kružnica S1 leží v dvojrozmernej rovine, ale samotná kružnica má iba jednu dimenziu. Na určenie bodu na nej stačí jedna nezávislá hodnota.

Všeobecne je **Sn** n-dimensional surface of a sphere v priestore s n + 1 dimenziami.

---

## 12. Topológia a súradnice nie sú to isté

Teraz prichádza jedna z najdôležitejších myšlienok celej podkapitoly.

**Configuration space existuje nezávisle od toho, aké čísla použijeme na jeho opis.**

Vráťme sa ku kružnici S1. Bod na kružnici môžeme opísať pomocou jedného uhla. Napríklad môžeme povedať, že jeho poloha zodpovedá uhlu 60°.

Ale existuje aj iný spôsob. Kružnicu môžeme vložiť do roviny a bod na nej opísať pomocou dvoch súradníc x a y. V takom prípade používame dve čísla namiesto jedného. Tieto dve čísla však nie sú nezávislé – musia spĺňať podmienku, že bod naozaj leží na kružnici.

Máme teda dve rôzne matematické reprezentácie toho istého priestoru.

V jednom prípade používame jeden uhol. V druhom používame dve čísla s obmedzením. Samotný configuration space je však stále tá istá kružnica S1.

To znamená, že **topológia je vlastnosť priestoru**, zatiaľ čo **súradnice sú nástroj**, ktorý sme si vybrali na jeho opis.

Tento rozdiel bude základom nasledujúcej kapitoly 2.3.2, kde budeme riešiť explicitné a implicitné reprezentácie configuration space.

---

## 13. Cartesian product – spájanie jednoduchších priestorov

Configuration space robota často nie je iba jedno R alebo jedno S1. Robot môže mať viac nezávislých častí konfigurácie a každá z nich môže patriť do iného typu priestoru.

Na spojenie takýchto priestorov používame **Cartesian product** – kartézsky súčin, ktorý zapisujeme symbolom **x**.

Predstav si, že jedna časť konfigurácie môže nadobúdať hodnoty z priestoru A a druhá nezávislá časť z priestoru B. Celá konfigurácia potom musí obsahovať informáciu z A aj z B. Configuration space zapíšeme ako: **A x B**

Najjednoduchší príklad poznáš zo súradnicovej roviny. Jedna súradnica x patrí do R a druhá súradnica y tiež patrí do R. Spoločne vytvárajú: **R x R = R2**

Pri robotike však môžeme kombinovať aj priestory s rozdielnou topológiou. Môžeme napríklad spojiť lineárny priestor R s kruhovým priestorom S1. Práve vtedy začína byť Cartesian product veľmi užitočný.

---

## 14. Configuration space planar rigid body

Predstav si malého mobilného robota na nekonečnej rovnej podlahe. Robot nie je iba bod. Má určitý smer, ktorým je otočený.

Na úplný opis jeho configuration potrebujeme tri informácie. Dve určujú jeho polohu na podlahe a jedna jeho orientation.

Poloha môže byť kdekoľvek na rovine. Preto patrí do: **R2**

Orientation sa však správa cyklicky. Po otočení o celú otáčku máme opäť rovnakú orientáciu. Preto patrí do: **S1**

Celý configuration space planar rigid body je teda: **R2 x S1**

Tento zápis nám dáva viac informácií než jednoduché tvrdenie „robot má 3 DOF".

Áno, priestor má tri dimenzie. Ale teraz zároveň vieme, aké tieto dimenzie sú. Dve sú lineárne a tvoria rovinu, zatiaľ čo tretia je rotačná a uzatvára sa do kruhu.

Práve toto je výhoda topologického opisu C-space.

---

## 15. PR robot – rovnaké 2 DOF, ale nie obyčajná rovina

Predstav si robot s dvomi joints. Prvý je prismatic joint P a druhý revolute joint R.

Ak zatiaľ ignorujeme joint limits, konfigurácia prismatic jointu patrí do R. Môžeme si ju predstaviť ako pozíciu na nekonečnej číselnej osi.

Konfigurácia revolute jointu patrí do S1, pretože po celej otáčke sa jeho uhol opakuje.

Configuration space celého PR robota je preto: **R x S1**

Robot má 2 DOF, takže C-space je dvojrozmerný. Nie je však topologicky rovnaký ako obyčajná rovina R2.

Intuitívne si R x S1 môžeš predstaviť ako povrch nekonečne dlhého valca. V jednom smere môžeš pokračovať stále ďalej – to zodpovedá R. V druhom smere môžeš obísť celý valec a vrátiť sa na rovnaké miesto – to zodpovedá S1.

Toto je veľmi dobrý príklad významu topológie. PR robot má 2 DOF rovnako ako bod na rovine, ale jeho C-space nemá rovnaký tvar ako rovina.

---

## 16. Joint limits môžu tento priestor zmeniť

V predchádzajúcom príklade sme joint limits zámerne ignorovali. Reálne robotické joints však zvyčajne majú obmedzený rozsah.

Predstav si, že prismatic joint sa môže pohybovať iba od 0 do 20 cm. Namiesto celého R máme closed interval [0, 20].

Ak sa zároveň revolute joint môže otáčať iba od -90° do +90°, ani jeho konfigurácia už netvorí celú kružnicu S1. Máme opäť interval.

Configuration space robota je potom Cartesian product dvoch intervalov. Intuitívne si ho môžeme predstaviť ako obdĺžnikovú oblasť: jeden smer predstavuje možné polohy prismatic jointu a druhý možné uhly revolute jointu.

Preto pri určovaní topológie C-space nestačí poznať iba názov jointu. Musíme tiež vedieť, či má joint limits a aké konfigurácie sú skutočne povolené.

---

## 17. 2R robot – dva uhly vytvoria torus

Teraz si predstav planar robotické rameno s dvomi revolute joints. Takýto robot označujeme **2R robot**.

Ak oba joints môžu vykonať celú rotáciu a joint limits ignorujeme, prvý joint má configuration space S1. Druhý joint má tiež configuration space S1.

Celý robot preto má: **S1 x S1**

Tento priestor označujeme: **T2** a nazývame ho **two-dimensional torus** – dvojrozmerný torus.

Torus si môžeš predstaviť ako povrch nafukovacieho kruhu alebo šišky s dierou uprostred.

Na prvý pohľad je to zvláštne. Robotické rameno predsa fyzicky nemá tvar šišky. Torus však nepredstavuje fyzický tvar robota. Predstavuje priestor všetkých možných kombinácií jeho dvoch joint angles.

Každý jeden bod na tomto abstraktnom toruse predstavuje jednu konkrétnu konfiguráciu 2R robota.

---

## 18. Prečo z dvoch rotačných joints vznikne torus

Tento výsledok sa dá pochopiť veľmi pekne bez zložitej matematiky.

Predstav si tabuľku. Horizontálny smer predstavuje uhol prvého jointu a vertikálny smer uhol druhého jointu.

Na prvý pohľad máme štvorec všetkých kombinácií dvoch uhlov.

Lenže pri prvom uhle sú 0° a 360° tá istá konfigurácia. Ľavý a pravý okraj našej tabuľky preto v skutočnosti predstavujú rovnaké stavy. Ak ich spojíme, štvorec sa zvinie do valca.

Stále však zostávajú dva okraje valca. Tie zodpovedajú 0° a 360° druhého jointu. Aj tieto hodnoty predstavujú rovnaké konfigurácie, takže musíme spojiť aj tieto dva okraje.

Keď spojíme oba konce valca, vznikne: **torus.**

Preto platí: **S1 x S1 = T2**

Torus má dve dimenzie, rovnako ako rovina alebo povrch gule. Napriek tomu má inú topológiu než oba tieto priestory.

---

## 19. Torus Tn

Myšlienku môžeme rozšíriť na viac revolute joints.

- Jeden neobmedzený revolute joint má C-space: **S1**
- Dva takéto joints vytvoria: **S1 x S1 = T2**
- Tri nezávislé revolute joints vytvoria: **S1 x S1 x S1 = T3**

A všeobecne Cartesian product n kružníc označujeme: **Tn**

Tn nazývame **n-dimensional torus**.

Tu si treba zapamätať dôležitý rozdiel:

**S1 x S1 nie je S2.**

S2 je povrch gule. S1 x S1 je T2, teda torus.

Oba priestory majú dve dimenzie, ale ich topológia je odlišná. Na toruse je „diera", zatiaľ čo povrch gule ju nemá. Jeden teda nemožno plynulo zmeniť na druhý bez rozrezania alebo zlepenia.

---

## 20. Mobilný robot s 2R ramenom

Teraz už dokážeme poskladať configuration space zložitejšieho robota.

Predstav si mobilnú základňu, ktorá sa môže voľne pohybovať po rovine a otáčať sa. Ako sme už zistili, jej configuration space je: **R2 x S1**

Na základňu teraz namontujeme 2R robotické rameno. Jeho dva revolute joints pridávajú: **S1 x S1**

Celý configuration space teda je: **R2 x S1 x S1 x S1**

Tri kruhové časti môžeme zapísať ako T3, takže dostaneme: **R2 x T3**

Robot má spolu 5 DOF. Dve opisujú polohu mobilnej základne na rovine, jedna jej orientation a ďalšie dve joint angles robotického ramena.

Ale povedať iba „5 DOF" by nám opäť nedalo celý obraz. C-space nie je jednoducho obyčajné R5. Obsahuje dve lineárne dimensions a tri cyklické dimensions.

---

## 21. Configuration space spatial rigid body

V Chapter 2.1 sme odvodili, že rigid body pohybujúce sa voľne v trojrozmernom priestore má 6 DOF.

Tri DOF potrebujeme na jeho position. Tú môžeme reprezentovať tromi súradnicami, takže pozičná časť patrí do: **R3**

Pri odvodení v Chapter 2.1 sme potom použili tri nekolineárne body A, B a C. Po určení polohy bodu A sme polohu bodu B mohli vybrať na povrchu sféry okolo A. Na určenie jeho smeru sme teda potrebovali dve nezávislé hodnoty, čo zodpovedá priestoru **S2**.

Po určení A a B zostávala ešte jedna rotačná freedom pre bod C. Tá sa správa ako kružnica **S1**.

V topologickom opise uvedenom v tejto časti knihy tak dostávame: **R3 x S2 x S1**

Počet dimenzií si môžeme skontrolovať. R3 má tri dimenzie, S2 dve a S1 jednu. Spolu: **3 + 2 + 1 = 6**, čo zodpovedá šiestim degrees of freedom spatial rigid body.

Dôležitá pointa však opäť nie je iba číslo 6. Tento príklad ukazuje, že šesťrozmerný configuration space nemusí byť obyčajný Euclidean space R6. Rotačná časť má inú štruktúru než jednoduché translácie.

---

## 22. Čo nám topológia o robotovi hovorí

Po tejto kapitole sa na počet DOF môžeme pozerať presnejšie.

Keď povieme: „Robot má 2 DOF," vieme iba to, že na jeho konfiguráciu potrebujeme dve nezávislé hodnoty.

Stále však nevieme, aký configuration space tieto dve hodnoty vytvárajú.

Môže to byť napríklad rovina R2. Môže to byť kombinácia R x S1. Môže to byť torus T2. Alebo môže ísť o povrch sféry S2.

Všetky tieto priestory sú dvojrozmerné, ale ich konfigurácie sú navzájom usporiadané iným spôsobom.

Preto pri robotike rozlišujeme dve otázky:
- **Dimension:** Koľko nezávislých hodnôt potrebujem?
- **Topology:** Akú základnú štruktúru má priestor všetkých možných hodnôt?

Obe informácie sú dôležité.

---

## 23. Prečo nás to bude zaujímať pri reprezentácii C-space

Možno sa teraz pýtaš, prečo vôbec potrebujeme vedieť, či je C-space rovina, kružnica, sféra alebo torus.

Dôvod uvidíme hneď v Chapter 2.3.2.

Počítač potrebuje configuration reprezentovať pomocou čísel. Pri Euclidean space je to jednoduché. Bod v R2 môžeme zapísať dvomi číslami a bod v R3 tromi.

Pri zakrivených alebo uzavretých priestoroch je situácia komplikovanejšia.

Kružnicu môžeme reprezentovať jedným uhlom, ale potom máme zvláštnosť pri prechode medzi 359° a 0°. Povrch Zeme môžeme reprezentovať latitude a longitude, ale pri póloch vznikajú problémy so súradnicami. Alebo môžeme použiť viac čísel a pridať medzi ne constraints.

Topológia priestoru teda ovplyvňuje to, aké matematické reprezentácie sú preň vhodné a aké problémy pri nich môžu vzniknúť.

A presne to bude témou nasledujúcej časti – Configuration Space Representation.

---

## Zhrnutie Chapter 2.3.1

Configuration space je množina všetkých možných konfigurácií systému a jeho dimension sa rovná počtu DOF. Poznať iba dimenziu však nestačí na úplný opis priestoru, pretože priestory s rovnakou dimenziou môžu mať rozdielnu topológiu.

**Topology** opisuje základnú štruktúru priestoru. Dva priestory sú topologicky ekvivalentné, ak môžeme jeden plynulo zdeformovať na druhý bez rezania alebo zlepovania. Preto majú napríklad malá guľa, veľká guľa a oválna lopta rovnakú topológiu, zatiaľ čo rovina a povrch gule ju rovnakú nemajú.

Pri robotike sa často stretávame s priestormi **Rn**, ktoré predstavujú n-dimensional Euclidean spaces, a **Sn**, ktoré predstavujú n-dimensional sféry. S1 je kružnica a S2 je povrch gule. Open interval je topologicky ekvivalentný R, zatiaľ čo closed interval má vlastné koncové body a nie je topologicky ekvivalentný celej priamke.

Configuration spaces môžeme skladať pomocou **Cartesian product**. Planar rigid body má C-space R2 x S1. PR robot bez joint limits má R x S1. 2R robot má S1 x S1 = T2, teda torus. Mobilná planar základňa s 2R ramenom má R2 x T3.

Najdôležitejšia myšlienka je preto jednoduchá: **DOF nám hovorí, koľko dimenzií configuration space má. Topológia nám hovorí, akú štruktúru tento priestor má.** A samotná topológia sa nemení podľa toho, aké súradnice si neskôr vyberieme na jej matematickú reprezentáciu.`;
