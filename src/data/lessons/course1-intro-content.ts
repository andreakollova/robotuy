// Lekcia 2: Konfigurácia robota, stupne voľnosti a konfiguračný priestor
// Full lesson content - DO NOT SHORTEN

export const course1IntroContent = `# Lekcia 2: Konfigurácia robota, stupne voľnosti a konfiguračný priestor

Keď sa pozeráme na robota, prirodzene nás napadne otázka: **Kde sa robot práve nachádza?** Pri jednoduchom objekte by možno stačilo uviesť jeho polohu v priestore. Pri robotovi je však situácia zložitejšia. Robotické rameno môže mať napríklad gripper na presne rovnakom mieste dvoma rôznymi spôsobmi — raz môže byť jeho „lakeť" otočený nahor a inokedy nadol. Poloha konca ramena je rovnaká, ale usporiadanie celého robota je odlišné.

Ak teda chceme robot matematicky opisovať, nestačí nám vedieť iba to, kde sa nachádza jedna jeho časť. Potrebujeme spôsob, ako zachytiť **celkový stav jeho mechanizmu**. Práve preto robotika používa pojmy **configuration (konfigurácia)**, **degrees of freedom (stupne voľnosti)** a **configuration space (konfiguračný priestor)**.

Tieto pojmy patria medzi úplné základy robotiky. Neskôr nám umožnia opisovať pohyb robota, počítať jeho rýchlosť, zisťovať, ktoré polohy dokáže dosiahnuť, alebo plánovať cestu robotického ramena medzi prekážkami. Najskôr si však musíme vytvoriť presnú predstavu o tom, čo vlastne znamená „stav robota".

---

## 01. Robot ako mechanický systém

Robot môže na prvý pohľad vyzerať ako veľmi komplikovaný stroj. Môže obsahovať stovky súčiastok, motory, káble, senzory, prevody, elektroniku a riadiace jednotky. Keď však skúmame jeho mechanický pohyb, nemusíme modelovať každú skrutku zvlášť. Celý systém si môžeme zjednodušiť na niekoľko základných stavebných prvkov.

Jedným z nich je **link**, teda článok robota. Link je pevná mechanická časť, ktorá sa pri pohybe robota pohybuje ako jeden celok. Pri priemyselnom robotickom ramene sú linkmi napríklad jednotlivé pevné segmenty medzi kĺbmi. Pri robotickej nohe môžeme za link považovať časť pripomínajúcu stehno alebo predkolenie. Link pritom nemusí vyzerať ako jednoduchá tyč. Môže mať pomerne komplikovaný tvar — dôležité je, že ho z pohľadu mechaniky považujeme za jeden pevný celok.

V robotike sa preto linky často modelujú ako **rigid bodies — tuhé telesá**. Tuhé teleso je idealizovaný objekt, ktorého tvar a rozmery sa počas pohybu nemenia. Ak si na jednom linku vyberieme dva body A a B, vzdialenosť medzi nimi zostáva rovnaká bez ohľadu na to, ako sa celý link pohybuje.

Napríklad kovová tyč dlhá 30 cm sa môže presúvať, otáčať alebo prevracať, ale v našom modeli zostáva vzdialenosť medzi jej koncami stále 30 cm. Mení sa teda poloha a orientácia tyče v priestore, nie jej vnútorná geometria.

V skutočnosti samozrejme dokonale tuhé telesá neexistujú. Kov sa môže mierne ohnúť, plast deformovať a mechanické súčiastky môžu mať určitú vôľu. Pri mnohých robotických úlohách sú však tieto deformácie také malé, že ich môžeme zanedbať. Predpoklad tuhého telesa nám výrazne zjednoduší matematický model robota bez toho, aby sme pri bežných úlohách stratili podstatné informácie.

Jednotlivé linky sú medzi sebou spojené pomocou **joints — kĺbov**. Kĺb určuje, aký relatívny pohyb je medzi dvoma linkmi povolený. Niektoré kĺby umožňujú otáčanie, iné posúvanie a niektoré komplikovanejšie kĺby umožňujú viacero pohybov súčasne. Kĺb teda neurčuje, ako silno sa robot pohne, ale **akým spôsobom sa jeho časti vôbec môžu voči sebe pohybovať**.

Samotný kĺb však pohyb nevytvára. Na to potrebujeme **actuator — pohon alebo akčný člen**. Typickým príkladom je elektrický motor, ktorý vytvára silu alebo **torque — krútiaci moment** potrebný na pohyb mechanizmu. Je preto dôležité odlišovať tieto dva pojmy: **joint určuje dovolený pohyb, zatiaľ čo actuator vytvára silu alebo moment potrebný na jeho uskutočnenie.**

Na konci robotického ramena sa často nachádza **end-effector**, teda časť robota, ktorá priamo vykonáva požadovanú úlohu. Môže to byť gripper na uchopenie predmetov, zváracia hlavica, skrutkovač, prísavka, kamera, chirurgický nástroj alebo napríklad striekacia tryska.

Robotické rameno si preto môžeme z mechanického pohľadu predstaviť ako postupnosť:

**základňa → kĺb → link → kĺb → link → ... → end-effector**

Takéto zjednodušenie je veľmi užitočné. Namiesto tisícov jednotlivých súčiastok môžeme robot pri analýze pohybu chápať ako **systém tuhých telies spojených kĺbmi**.

---

## 02. Čo znamená konfigurácia robota

Keď už máme základný mechanický model robota, môžeme sa vrátiť k pôvodnej otázke: **Ako presne opíšeme, kde sa robot nachádza?**

Pri robotovi väčšinou nestačí poznať polohu jedného bodu. Predstav si robotické rameno, ktorého gripper sa nachádza nad konkrétnym miestom na stole. Rameno môže túto polohu dosiahnuť s lakťom otočeným jedným smerom, ale pri vhodnej konštrukcii aj s lakťom otočeným iným smerom. Gripper môže zostať na rovnakom mieste, zatiaľ čo zvyšok robota má inú polohu.

Potrebujeme preto pojem, ktorý opisuje **celé usporiadanie mechanického systému**. Tento stav nazývame **configuration — konfigurácia**.

Konfiguráciu môžeme definovať ako **úplnú špecifikáciu polohy každého bodu robota**. Táto definícia zámerne nehovorí iba o end-effectore alebo o strede robota. Ak poznáme konfiguráciu, máme dostatok informácií na to, aby sme jednoznačne určili polohu celého mechanizmu.

Na prvý pohľad to môže znieť neprakticky. Robotické rameno obsahuje obrovské množstvo bodov. Znamená to, že musíme zapisovať súradnice každého z nich? Našťastie nie.

Práve tu využívame predpoklad rigidného telesa. Ak poznáme tvar linku a vieme, kde sa nachádza a ako je natočený, automaticky vieme určiť aj polohu všetkých jeho bodov. Nemusíme ich teda sledovať samostatne.

Predstav si obyčajné dvere. Pri otvorení sa pohne prakticky každý bod na ich povrchu. Napriek tomu nemusíme merať polohu každého centimetra dverí. Ak poznáme ich rozmery, polohu pántu a uhol otvorenia, vieme z týchto informácií odvodiť polohu všetkých ostatných bodov.

To nás privádza k jednej z najdôležitejších myšlienok tejto lekcie: **úplná konfigurácia môže opisovať obrovské množstvo bodov, ale na jej jednoznačné určenie často potrebujeme iba niekoľko nezávislých čísel.**

---

## 03. Najjednoduchší príklad konfigurácie: dvere

Predstav si obyčajné dvere pripevnené k stene pomocou pántov. Dvere existujú v trojrozmernom priestore, ale kvôli pántom sa nemôžu pohybovať ľubovoľne. Nemôžeme ich bez odpojenia zdvihnúť k stropu, posunúť o meter doprava ani otočiť okolo ľubovoľnej osi.

Pánty obmedzujú ich pohyb tak, že zostáva jediná nezávislá možnosť: **otáčanie okolo osi pántov**. Ak teda chceme presne určiť konfiguráciu dverí, stačí nám poznať jeden údaj — uhol ich otvorenia.

Tento uhol môžeme označiť θ. Konfiguráciu potom jednoducho zapíšeme:

**q = θ**

Symbol **q** sa v robotike veľmi často používa na označenie konfigurácie.

Ak je napríklad θ = 0°, dvere môžu byť zatvorené. Pri θ = 30° sú mierne otvorené a pri θ = 90° môžu byť otvorené kolmo na stenu. Každá hodnota uhla teda predstavuje inú konfiguráciu dverí.

Na tomto príklade si všimni jednu dôležitú vec. Dvere sú fyzický objekt nachádzajúci sa v trojrozmernom svete, ale na úplný opis ich konfigurácie potrebujeme iba **jedno číslo**. Počet parametrov potrebných na opis systému preto nezávisí iba od toho, či sa nachádza v 2D alebo 3D priestore. Závisí najmä od toho, **koľkými nezávislými spôsobmi sa systém môže pohybovať**.

![Konfigurácia dverí, bodu v rovine a mince na stole](/book/ch2/fig2-1.png)

---

## 04. Bod pohybujúci sa v rovine

Teraz si predstav jednoduchý bod, ktorý sa môže voľne pohybovať po rovnej ploche. Na rozdiel od dverí nie je pripevnený k pántu a môže meniť svoju polohu v dvoch nezávislých smeroch.

Jeho konfiguráciu môžeme opísať pomocou dvoch súradníc:

**q = (x, y)**

Hodnota x určuje polohu v jednom smere a hodnota y v druhom. Keď poznáme obe, poloha bodu v rovine je jednoznačne určená.

Podstatné je, že x a y sú **nezávislé**. Bod môžeme posunúť doprava bez toho, aby sme ho museli posunúť nahor. Rovnako môžeme meniť y bez toho, aby sme museli meniť x. Na úplný opis konfigurácie preto potrebujeme dve nezávislé hodnoty.

Pri samotnom geometrickom bode pritom nemusíme riešiť orientáciu. Bod nemá prednú ani zadnú stranu. Ak ho „otočíme", z geometrického hľadiska sa nič nezmení. Pri skutočnom telese to však už platiť nebude.

---

## 05. Prečo pri telese nestačí iba poloha

Predstav si mincu položenú na stole. Vyberieme si jej stred a jeho polohu zapíšeme pomocou súradníc x a y. Mohlo by sa zdať, že tým máme konfiguráciu mince úplne určenú. V skutočnosti nám však stále jedna informácia chýba.

Polož dve rovnaké mince tak, aby ich stredy ležali na presne rovnakom mieste. Jednu mincu potom otoč o 90°. Ich stredy majú stále rovnaké súradnice x a y, ale mince očividne nie sú v rovnakom stave. Rozdiel je v tom, **ako sú natočené**.

Okrem polohy preto potrebujeme poznať aj **orientation — orientáciu**. V rovine ju môžeme vyjadriť jediným uhlom θ. Konfigurácia mince je potom:

**q = (x, y, θ)**

Súradnice x a y nám hovoria, kde sa minca nachádza, zatiaľ čo θ určuje jej natočenie.

Tým sa dostávame k dôležitému rozdielu medzi **position** a **configuration**. Position opisuje polohu konkrétneho bodu. Configuration musí obsahovať všetky informácie potrebné na úplné určenie stavu celého telesa.

V robotike je tento rozdiel veľmi praktický. Ak robot drží skrutkovač, nestačí dostať jeho hrot na správne miesto. Skrutkovač musí byť zároveň správne natočený voči skrutke. Robot preto často potrebuje kontrolovať nielen **position**, ale aj **orientation** svojho end-effectora.

---

## 06. Degrees of Freedom – stupne voľnosti

Teraz môžeme zaviesť jeden z najdôležitejších pojmov celej robotiky: **degree of freedom**, skrátene **DOF**, po slovensky **stupeň voľnosti**.

Počet stupňov voľnosti systému je **najmenší počet nezávislých reálnych hodnôt, ktoré potrebujeme na úplné určenie jeho konfigurácie**.

Slovo **najmenší** je v tejto definícii veľmi dôležité. Nezaujíma nás, koľko rôznych čísel dokážeme pri opisovaní objektu zapísať. Zaujíma nás, koľko nezávislých hodnôt skutočne potrebujeme.

Pri dverách nám stačí jeden uhol θ, takže dvere majú **1 DOF**. Bod voľne sa pohybujúci v rovine potrebuje súradnice x a y, takže má **2 DOF**. Minca pohybujúca sa po stole potrebuje x, y a θ, preto má **3 DOF**.

Intuitívne si teda môžeš stupne voľnosti predstaviť ako počet nezávislých spôsobov, ktorými môžeme meniť konfiguráciu systému. Minca sa môže posúvať v jednom smere, posúvať v druhom smere a otáčať. Tieto tri možnosti môžeme meniť nezávisle, preto má tri stupne voľnosti.

Pri komplikovanejších mechanizmoch však už nemusí byť počet DOF na prvý pohľad zrejmý. Preto sa budeme držať presnej definície: **DOF je minimálny počet nezávislých reálnych parametrov potrebných na úplný opis konfigurácie.**

---

## 07. Počet súradníc nemusí byť počet DOF

Predstav si bod, ktorý sa nemôže pohybovať po celej rovine, ale iba po kružnici s polomerom r. Jeho polohu môžeme stále zapísať pomocou dvoch súradníc:

**q = (x, y)**

Na prvý pohľad by sme teda mohli povedať, že máme dve hodnoty a systém má dva stupne voľnosti. To by však nebolo správne, pretože x a y už nemôžeme voliť nezávisle.

Bod musí stále zostať na kružnici, takže jeho súradnice musia spĺňať podmienku:

$$x^2 + y^2 = r^2$$

Ak si zvolíme ľubovoľnú hodnotu x, nemôžeme potom zvoliť úplne ľubovoľné y. Obe hodnoty sú navzájom prepojené. Takúto podmienku nazývame **constraint — obmedzenie**.

Ten istý bod môžeme opísať oveľa jednoduchšie pomocou jediného uhla θ. Keď poznáme θ, jeho súradnice vieme vypočítať:

$$x = r cos(θ)$$
$$y = r sin(θ)$$

Na úplný opis konfigurácie teda v skutočnosti potrebujeme iba **jeden nezávislý parameter**. Bod pohybujúci sa po kružnici má preto **1 DOF**, aj keď sme jeho polohu pôvodne zapísali pomocou dvoch čísel.

Toto je veľmi dôležité rozlíšenie: **počet čísel použitých v reprezentácii nemusí byť rovnaký ako počet stupňov voľnosti systému**. Rozhoduje počet nezávislých informácií.

Neskôr sa s tým stretneme napríklad pri **rotation matrix — rotačnej matici**. Tá obsahuje deväť čísel, ale orientácia rigidného telesa v priestore nemá deväť stupňov voľnosti. Čísla v matici totiž nie sú všetky nezávislé a musia spĺňať určité constraints.

---

## 08. Constraints odoberajú systému voľnosť

Predchádzajúci príklad ukazuje všeobecný princíp. Ak sa bod môže pohybovať kdekoľvek v rovine, potrebujeme dve nezávislé súradnice x a y, a preto má 2 DOF. Ak však pridáme podmienku, že musí zostať na kružnici, množina jeho možných konfigurácií sa zmenší.

Práve takúto podmienku nazývame **constraint**. Constraint určuje, ktoré konfigurácie alebo pohyby už systém nemôže vykonať.

Rovnaký princíp funguje pri mechanických systémoch. Predstav si dvere, ktoré ešte nie sú pripevnené k stene. Môžeme ich premiestňovať a otáčať rôznymi spôsobmi. Keď ich však pripevníme pomocou pántov, väčšina týchto pohybov prestane byť možná. Pánty vytvoria mechanické constraints a ponechajú iba určitý dovolený pohyb — v tomto prípade rotáciu okolo osi pántov.

Pre jednoduché prípady môžeme túto myšlienku vyjadriť vzťahom:

**DOF = počet premenných - počet nezávislých obmedzení**

Zatiaľ tento vzťah nemusíš používať na komplikované výpočty. Dôležitá je jeho logika: **ak pridáme nezávislé obmedzenie, systému môžeme odobrať určitú časť jeho voľnosti**.

Práve tento princíp neskôr použijeme na vysvetlenie toho, prečo má rigidné teleso pohybujúce sa v rovine 3 DOF a rigidné teleso voľne sa pohybujúce v trojrozmernom priestore 6 DOF.

---

## 09. Spojité a diskrétne informácie nie sú to isté

Vráťme sa ešte raz k minci na stole. Jej konfiguráciu sme zatiaľ opisovali pomocou:

**q = (x, y, θ)**

Predstavme si však, že minca môže ležať na stole dvoma stranami — napríklad **heads up** alebo **tails up**. Na úplný opis jej stavu potom okrem x, y a θ potrebujeme vedieť aj to, ktorá strana smeruje nahor.

Mohlo by sa zdať, že sme práve pridali štvrtý stupeň voľnosti. Nie je to však tak.

Hodnoty x, y a θ sa môžu meniť **spojito**. Minca môže byť napríklad na x = 1, potom na x = 1,1, potom 1,11 a medzi týmito hodnotami existuje nekonečne veľa ďalších možností. Heads/tails je však iný typ informácie. Máme iba dve oddelené možnosti — jedna alebo druhá strana.

Takúto hodnotu nazývame **discrete variable — diskrétna premenná**.

Pri počítaní degrees of freedom nás zaujíma minimálny počet **spojitých reálnych súradníc** potrebných na opis konfigurácie. Diskrétna voľba medzi heads a tails preto nepridáva ďalší DOF. Minca má stále **3 DOF**.

Jej configuration space však môže obsahovať viac oddelených častí. Jedna časť môže reprezentovať konfigurácie, v ktorých je minca heads up, a druhá konfigurácie, v ktorých je tails up. To je prvý náznak toho, že pri configuration space nás nebude zaujímať iba jeho počet rozmerov, ale neskôr aj jeho **tvar a topológia**.

---

## 10. Configuration Space – priestor všetkých možných konfigurácií

Doteraz sme vždy opisovali jednu konkrétnu konfiguráciu systému. Robot sa však počas svojho fungovania môže nachádzať v obrovskom množstve rôznych konfigurácií.

Množinu **všetkých konfigurácií, ktoré môže systém nadobudnúť**, nazývame **Configuration Space**, skrátene **C-space**, po slovensky **konfiguračný priestor**.

Toto je ústredná myšlienka celej kapitoly. Jedna konkrétna konfigurácia robota predstavuje **jeden bod v jeho C-space**.

Ak má robot napríklad konfiguráciu:

$$q = (q1, q2, ..., qn)$$

potom konkrétna kombinácia hodnôt q1 až qn predstavuje jeden konkrétny stav robota, a teda jeden bod v jeho konfiguračnom priestore.

Keď robot pohne kĺbmi, hodnoty jeho konfiguračných súradníc sa zmenia. Tým sa zmení konfigurácia q a bod reprezentujúci robota sa v C-space presunie na iné miesto.

Práve tu vzniká veľmi silný mentálny model: **pohyb celého fyzického robota môžeme matematicky reprezentovať ako pohyb jediného bodu cez jeho configuration space**.

Robot môže mať niekoľko ramien, množstvo linkov a komplikovanú geometriu, ale jedna konkrétna kombinácia všetkých jeho konfiguračných súradníc je stále iba jeden bod q.

Táto abstrakcia bude neskôr mimoriadne dôležitá pri **motion planning — plánovaní pohybu**.

---

## 11. C-space dverí

Pri dverách sme zistili, že ich konfiguráciu môžeme opísať jediným uhlom:

**q = θ**

Každá povolená hodnota θ predstavuje inú konfiguráciu dverí. Množina všetkých povolených hodnôt θ preto tvorí ich configuration space.

Ak sa napríklad dvere môžu otvárať iba od 0° do 120°, ich C-space obsahuje všetky hodnoty v tomto rozsahu. Na určenie konkrétneho bodu v tomto priestore potrebujeme iba jedno číslo — θ.

Configuration space dverí je preto **jednorozmerný**.

Dvere majú 1 DOF a zároveň má ich C-space jednu dimenziu. Tento vzťah nie je náhodný. Práve počet stupňov voľnosti určuje dimenziu konfiguračného priestoru.

---

## 12. C-space bodu v rovine

Bod, ktorý sa môže voľne pohybovať po rovine, má konfiguráciu:

**q = (x, y)**

Každá dvojica hodnôt x a y predstavuje jednu možnú konfiguráciu. Ak pohyb bodu nijako neobmedzíme, všetky tieto konfigurácie spolu vytvoria celú dvojrozmernú rovinu.

Jeho C-space je teda dvojrozmerný a bod má **2 DOF**.

Tým sa dostávame k základnému vzťahu:

**počet DOF = dimenzia C-space**

Ak na opis konfigurácie potrebujeme dva nezávislé parametre, configuration space má dve dimenzie. Ak potrebujeme tri, má tri dimenzie. Rovnaký princíp platí aj pri robotoch s oveľa väčším počtom stupňov voľnosti.

---

## 13. C-space mince na stole

Minca pohybujúca sa po stole má konfiguráciu:

**q = (x, y, θ)**

Dve súradnice určujú jej polohu a tretia jej orientáciu. Minca preto má 3 DOF a jej configuration space je trojrozmerný.

Je tu však jedna zaujímavá vlastnosť. Súradnice x a y sa správajú ako obyčajné polohové súradnice, ale uhol θ je iný. Ak mincu otočíme o 360°, dostaneme sa späť do rovnakej orientácie, v akej bola pred otočením.

Orientácie θ = 0° a θ = 360° teda nepredstavujú dve rôzne konfigurácie orientácie. Predstavujú ten istý stav.

Uhlová súradnica sa preto správa **cyklicky**. Keď prejdeme celú jednu otáčku, vrátime sa na začiatok.

Matematicky sa preto configuration space takejto mince často zapisuje ako:

$$R² × S¹$$

R2 predstavuje všetky možné polohy x a y v rovine a S1 predstavuje kruhový priestor všetkých možných orientácií.

Tento zápis zatiaľ nemusíš vedieť používať. Dôležitá je myšlienka, ktorá sa za ním skrýva: **dva configuration spaces môžu mať rovnaký počet dimenzií, ale pritom môžu mať odlišný tvar**. Práve tým sa neskôr dostaneme k pojmu **topology — topológia**.

---

## 14. Dimenzia C-space a počet DOF

Teraz môžeme všetky predchádzajúce príklady spojiť do jedného všeobecného pravidla.

Ak potrebujeme na úplný opis konfigurácie systému minimálne n nezávislých reálnych parametrov, systém má **n degrees of freedom**. Configuration space takéhoto systému má zároveň **n dimenzií**.

Platí teda:

$$DOF = dim(C)$$

Robot so šiestimi nezávislými konfiguračnými súradnicami môže mať napríklad konfiguráciu:

$$q = (θ₁, θ₂, θ₃, θ₄, θ₅, θ₆)$$

Jedna konkrétna šestica hodnôt predstavuje jeden bod v šesťrozmernom configuration space.

Šesťrozmerný priestor si samozrejme nedokážeme predstaviť rovnakým spôsobom ako miestnosť okolo nás. To však matematike neprekáža. Konfiguráciu môžeme jednoducho chápať ako zoznam šiestich čísel, ktoré spolu určujú jeden konkrétny stav robota.

Ak robot prejde z konfigurácie qa do konfigurácie qb, jeho pohyb môžeme matematicky reprezentovať ako cestu medzi dvoma bodmi v tomto šesťrozmernom priestore.

---

## 15. Fyzický priestor a configuration space nie sú to isté

Jedna z najdôležitejších vecí, ktoré si treba z tejto lekcie odniesť, je rozdiel medzi **physical space** a **configuration space**.

Robot fyzicky existuje v trojrozmernom svete. To však vôbec neznamená, že jeho configuration space musí mať tri dimenzie.

Dvere existujú v 3D priestore, ale kvôli pántom majú iba 1 DOF, takže ich C-space je jednorozmerný. Mobilný robot jazdiaci po podlahe môže mať konfiguráciu (x, y, θ), a teda trojrozmerný C-space. Robotické rameno so siedmimi nezávislými kĺbmi môže stále fyzicky stáť v tej istej trojrozmernej miestnosti, ale jeho configuration space môže mať sedem dimenzií.

Preto platí:

$$physical space ≠ configuration space$$

Fyzický priestor opisuje prostredie, v ktorom sa robot a ostatné objekty nachádzajú. Configuration space opisuje **všetky možné konfigurácie celého mechanického systému**.

Toto rozlíšenie bude neskôr veľmi dôležité, pretože veľká časť robotickej matematiky sa nebude odohrávať priamo v priestore, ktorý vidíme okolo seba, ale práve v configuration space.

---

## 16. Poloha end-effectora nie je konfigurácia robota

Pri robotických ramenách je veľmi ľahké sústrediť sa iba na end-effector. Koniec ramena je napokon často tá časť, ktorá nás zaujíma najviac — má niečo uchopiť, zvárať, skrutkovať alebo presunúť.

Poloha end-effectora však vo všeobecnosti nestačí na určenie konfigurácie celého robota.

Predstav si vlastnú ruku. Polož dlaň na jedno konkrétne miesto na stole. V určitom rozsahu môžeš meniť polohu lakťa bez toho, aby si dlaň výrazne posunula. Rovnaká poloha dlane teda môže zodpovedať viacerým rôznym konfiguráciám celej ruky.

Rovnaký jav sa objavuje pri robotických ramenách. Dve rôzne kombinácie uhlov v kĺboch môžu v niektorých mechanizmoch dostať end-effector na rovnaké miesto.

Preto si treba zapamätať:

$$end-effector position ≠ robot configuration$$

Konfigurácia opisuje celý mechanizmus. Poloha a orientácia end-effectora opisujú iba výsledný stav jednej konkrétnej časti robota.

Tento rozdiel nás neskôr privedie k ďalším dôležitým pojmom, ako sú **task space** a **workspace**.

---

## 17. Prečo je configuration space taký užitočný

Configuration space môže na začiatku pôsobiť ako pomerne abstraktný matematický pojem. Jeho skutočná sila sa však ukáže pri riešení praktických problémov.

Predstav si robotické rameno pracujúce medzi stolom, stenou a ďalšími objektmi. Pri každom pohybe sa súčasne mení poloha viacerých linkov. Jeden link môže naraziť do stola, ďalší do steny a end-effector môže naraziť do objektu, ktorý sa robot snaží obísť.

Vo fyzickom priestore preto sledujeme komplikovaný pohyb celého mechanizmu. V configuration space však môžeme celý robot reprezentovať jediným bodom **q**.

Jeho počiatočný stav označíme napríklad ako **q_start** a cieľový stav ako **q_goal**. Pohyb robota potom môžeme chápať ako hľadanie cesty medzi týmito dvoma bodmi.

Nie každý bod v C-space musí byť povolený. Niektoré konfigurácie môžu znamenať, že robot narazil do prekážky. Iné môžu prekračovať mechanický rozsah kĺbov alebo môžu byť z iného dôvodu nedosiahnuteľné. Motion planning potom môžeme formulovať ako problém hľadania cesty cez tú časť configuration space, ktorá obsahuje iba dovolené konfigurácie.

Práve preto je C-space taký silný koncept: **namiesto sledovania pohybu mnohých fyzických častí môžeme analyzovať pohyb jedného abstraktného bodu v konfiguračnom priestore.**

---

## 18. Čo presne znamená symbol q

V robotike sa konfigurácia veľmi často označuje písmenom **q**. Pri jednoduchom systéme môže q predstavovať iba jednu hodnotu. Pri zložitejšom robotovi môže obsahovať viacero konfiguračných súradníc.

Všeobecne môžeme konfiguráciu zapísať:

$$q = (q1, q2, ..., qn)$$

Jednotlivé hodnoty q1, q2 až qn nazývame **configuration coordinates — konfiguračné súradnice**.

Nemusia pritom všetky predstavovať rovnaký typ veličiny. Niektoré môžu byť uhly, iné vzdialenosti alebo polohy.

Pri dverách máme napríklad: q = θ

Pri minci na stole: q = (x, y, θ)

A pri jednoduchom robotickom ramene s dvoma rotačnými kĺbmi môžeme mať: q = (θ1, θ2)

Keď sa robot pohybuje, jeho konfigurácia sa mení v čase. Preto môžeme písať **q(t)**, čo jednoducho znamená „konfigurácia robota v čase t".

Neskôr budeme sledovať aj to, **ako rýchlo sa konfigurácia mení**. Objaví sa preto zápis **q̇(t)**, teda časová derivácia konfigurácie. Aby však tento pojem dával zmysel, musíme najskôr veľmi dobre rozumieť tomu, čo predstavuje samotné q.

---

## 19. Najdôležitejší mentálny model celej lekcie

Celú lekciu si môžeme spojiť do jedného logického príbehu.

Robot z mechanického pohľadu modelujeme ako systém **rigidných linkov spojených joints**. Kĺby určujú, ako sa jednotlivé časti môžu voči sebe pohybovať, a tým zároveň obmedzujú možné stavy celého mechanizmu.

Jeden konkrétny stav robota nazývame **configuration** a označujeme ho symbolom q. Konfigurácia musí obsahovať dostatok informácií na úplné určenie polohy celého mechanizmu.

Na jej opis potrebujeme určitý minimálny počet nezávislých reálnych parametrov. Tento počet nazývame **degrees of freedom — DOF**.

Ak potom vezmeme všetky konfigurácie, ktoré robot môže nadobudnúť, dostaneme jeho **configuration space — C-space**. Každá konkrétna konfigurácia q predstavuje jeden bod v tomto priestore.

Počet stupňov voľnosti zároveň určuje počet dimenzií configuration space:

$$DOF = dim(C)$$

Keď sa robot začne pohybovať, jeho konfigurácia sa postupne mení. Namiesto jednej hodnoty q preto máme q(t). Z pohľadu configuration space môžeme tento proces chápať ako pohyb bodu po určitej trajektórii.

Toto je základný mentálny model, na ktorom bude stáť veľká časť ďalšej robotiky:

**robot → configuration q → degrees of freedom → configuration space → pohyb cez C-space**

---

## Zhrnutie lekcie

Robot môžeme pri mechanickej analýze zjednodušiť na systém **rigidných linkov spojených joints**. Link predstavuje pevnú časť mechanizmu, zatiaľ čo joint určuje, aký relatívny pohyb je medzi jednotlivými linkmi dovolený. Actuator vytvára silu alebo krútiaci moment potrebný na uskutočnenie pohybu a end-effector je časť robota, ktorá priamo vykonáva požadovanú úlohu.

**Configuration — konfigurácia** predstavuje úplný mechanický stav robota. Hoci formálne opisuje polohu všetkých jeho bodov, vďaka modelu rigidných telies nemusíme každý bod zapisovať samostatne. Celú konfiguráciu často dokážeme jednoznačne určiť pomocou relatívne malého počtu nezávislých parametrov.

Najmenší počet takýchto nezávislých reálnych parametrov nazývame **degrees of freedom — stupne voľnosti**. Dvere pripevnené pántom majú 1 DOF, bod pohybujúci sa voľne v rovine 2 DOF a minca pohybujúca sa po stole 3 DOF, pretože okrem polohy x a y potrebujeme poznať aj jej orientáciu θ.

Pri určovaní DOF nestačí jednoducho spočítať všetky čísla použité v nejakej reprezentácii. Niektoré z nich môžu byť navzájom prepojené pomocou **constraints — obmedzení**. Bod pohybujúci sa po kružnici môžeme napríklad reprezentovať dvojicou (x, y), ale pretože musí spĺňať podmienku x2 + y2 = r2, v skutočnosti potrebuje iba jeden nezávislý parameter a má 1 DOF.

Množinu všetkých možných konfigurácií systému nazývame **configuration space alebo C-space**. Jedna konfigurácia q predstavuje jeden bod v tomto priestore a počet stupňov voľnosti systému sa rovná dimenzii jeho C-space:

$$DOF = dim(C)$$

Keď sa robot pohybuje, jeho konfigurácia q(t) sa mení a v configuration space tak vzniká trajektória. Táto abstrakcia nám neskôr umožní riešiť komplikované robotické problémy oveľa jednoduchšie — namiesto sledovania každého linku samostatne môžeme pracovať s pohybom jedného bodu v konfiguračnom priestore.

V ďalšej lekcii môžeme na tomto základe presne odvodiť, **prečo má planar rigid body 3 DOF a spatial rigid body 6 DOF**. Práve tam sa naplno ukáže význam constraints a vzťahu medzi počtom použitých premenných a skutočným počtom nezávislých stupňov voľnosti.`;
