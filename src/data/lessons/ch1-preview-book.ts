import { BookSection } from '@/data/book-content';

export const ch1BookSections: BookSection[] = [
  {
    id: 'ch1-intro',
    title: 'Úvod do Modern Robotics',
    content: `Robotika je ako vedný odbor pomerne mladá, no jej ambície sú obrovské - vytvárať stroje schopné pohybovať sa, vnímať a interagovať s fyzickým svetom. Táto snaha nás prirodzene vedie k otázkam o nás samých - prečo sú naše telá zostavené tak ako sú, ako koordinujeme pohyby a ako sa učíme zložité úlohy.

Táto kniha sa zameriava na **mechaniku, plánovanie pohybu a riadenie** robotických mechanizmov. Robotické ramená sú jeden známy príklad. Rovnako aj kolové vozidlá, alebo ramená namontované na kolových vozidlách.

Základný princíp: mechanizmus sa vytvára spojením tuhých telies (**linkov**) pomocou **kĺbov**, čo umožňuje relatívny pohyb medzi susednými linkmi. Pohon kĺbov (typicky elektrickými motormi) potom spôsobuje požadovaný pohyb robota.

![Open-chain a closed-chain mechanizmy](/book/ch1/fig1-1.png)
*Obrázok 1.1: (a) Priemyselný manipulátor s otvoreným reťazcom. (b) Stewart-Goughova platforma s uzavretými slučkami.*

Linky robota môžu byť usporiadané **sériovo** (otvorený reťazec) ako klasické robotické rameno, alebo môžu tvoriť **uzavreté slučky** ako Stewart-Goughova platforma. Pri otvorenom reťazci sú všetky kĺby poháňané, pri uzavretých slučkách môže byť poháňaná len podmnožina kĺbov.`,
  },
  {
    id: 'ch1-technology',
    title: 'Technológia robotických mechanizmov',
    content: `### Pohony (Actuators)

Linky robota sú uvádzané do pohybu **pohonmi** (actuators). Najčastejšie sú **elektricky poháňané** (DC/AC motory, krokové motory, zliatiny s tvarovou pamäťou), ale môžu byť aj pneumatické alebo hydraulické.

Ideálny motor pre robotiku by mal byť ľahký, pracovať pri relatívne nízkych otáčkach (stovky RPM) a vytvárať veľké sily a krútiace momenty. Väčšina dostupných motorov však pracuje pri vysokých otáčkach a nízkom krútiacom momente, preto je potrebná **redukcia rýchlosti a zosilnenie momentu**.

### Prevody (Transmissions)

Príklady prevodov: ozubené kolesá, lankové pohony, remene a kladky, reťaze a reťazové kolesá. Tieto zariadenia by mali mať čo najmenšie **prešmykovanie** a **vôľu** (backlash - množstvo rotácie na výstupe prevodu bez pohybu na vstupe).

K robotovi môžu byť pripojené aj **brzdy** na rýchle zastavenie alebo udržanie polohy.

### Senzory

Roboty sú vybavené senzormi na meranie pohybu v kĺboch:
- **Encodery, potenciometre, resolvery** - merajú polohu kĺbu
- **Tachometre** - merajú rýchlosť
- **Force-torque senzory** - merajú sily a momenty na kĺboch alebo end-efektore

Ďalšie senzory pomáhajú lokalizovať objekty alebo samotného robota:
- **RGB kamery** - farebný obraz
- **RGB-D kamery** - farba + hĺbka ku každému pixelu
- **Laserové diaľkomery (LiDAR)**
- **Akustické senzory**`,
  },
  {
    id: 'ch1-ch2-preview',
    title: 'Chapter 2: Configuration Space',
    content: `Kapitola 2 sa zameriava na **reprezentáciu konfigurácie** robotického systému - teda špecifikáciu polohy každého bodu robota.

Keďže robot pozostáva z tuhých telies spojených kĺbmi, začíname pochopením konfigurácie jedného tuhého telesa:
- **Rovinné tuhé teleso**: 3 premenné (2 pre polohu, 1 pre orientáciu) = **3 DOF**
- **Priestorové tuhé teleso**: 6 premenných (3 pre polohu, 3 pre orientáciu) = **6 DOF**

**DOF robota** = súčet DOF jeho tuhých telies mínus počet obmedzení od kĺbov.

Dva najpoužívanejšie kĺby:
- **Rotačný (revolute)** - 1 DOF rotácie
- **Posuvný (prismatic)** - 1 DOF translácie

Každý z nich poskytuje 5 obmedzení na priestorové tuhé teleso.

Z toho odvodíme **Grüblerovu formulu** na výpočet DOF mechanizmov.

**Topológia C-space** - dva priestory rovnakej dimenzie môžu mať rôzne tvary (rovina vs guľa). To ovplyvňuje reprezentáciu.

**Explicitná parametrizácia** - minimálny počet súradníc (napr. šírka/dĺžka pre guľu).
**Implicitná reprezentácia** - viac súradníc s obmedzeniami (napr. (x,y,z) s x²+y²+z²=1). Kniha preferuje implicitnú reprezentáciu.

**Task space** - priestor polôh a orientácií end-efektora. **Workspace** - podmnožina task space, ktorú robot dokáže dosiahnuť.`,
  },
  {
    id: 'ch1-ch3-preview',
    title: 'Chapter 3: Rigid-Body Motions',
    content: `Táto kapitola rieši matematický opis pohybu tuhého telesa v 3D priestore.

K telesu pripevníme **referenčný rámec** a opisujeme jeho polohu a orientáciu. Orientáciu reprezentujeme **rotačnou maticou** (3×3 matica).

**Exponenciálne súradnice rotácie**: ku každej rotačnej matici R existuje jednotkový vektor ω̂ (os rotácie) a uhol θ, takže rotácia sa dá získať otočením o θ okolo ω̂.

Tento prístup vedie priamo k exponenciálnemu opisu všeobecných pohybov tuhého telesa a k modernej geometrickej interpretácii klasickej **screw theory** (teórie skrutky).

Kľúčové pojmy:
- **Twist** (priestorová rýchlosť) - 6-rozmerný objekt spájajúci lineárnu a uhlovú rýchlosť
- **Wrench** (priestorová sila) - 6-rozmerný objekt spájajúci silu a krútiaci moment`,
  },
  {
    id: 'ch1-ch4-preview',
    title: 'Chapter 4: Forward Kinematics',
    content: `Pre otvorený reťazec sú poloha a orientácia end-efektora jednoznačne určené hodnotami kĺbov. **Forward kinematics** je problém nájdenia konfigurácie end-efektora zo zadaných hodnôt kĺbov.

Kniha prezentuje **Product of Exponentials (PoE)** formulu. Výhody:
- Priamo odvodená z exponenciálnych súradníc
- Intuitívna interpretácia (twisty osí kĺbov)
- Nepotrebuje rámce na každom linku (stačí základný rámec a rámec end-efektora)

Alternatívny prístup **Denavit-Hartenberg** (D-H) je v prílohe - používa menej parametrov, ale vyžaduje priradenie rámcov ku každému linku podľa špeciálnych pravidiel.`,
  },
  {
    id: 'ch1-ch5-preview',
    title: 'Chapter 5: Velocity Kinematics and Statics',
    content: `**Velocity kinematics** opisuje vzťah medzi rýchlosťami kĺbov a rýchlosťou end-efektora. Centrálnym objektom je **Jacobián** forward kinematics.

Vynásobením vektora rýchlostí kĺbov touto maticou (závislou od konfigurácie) dostaneme twist end-efektora.

**Kinematické singularity** - konfigurácie, v ktorých end-efektor stráca schopnosť pohybu v jednom alebo viacerých smeroch. Zodpovedajú konfiguráciám, kde Jacobián nemá maximálnu hodnosť.

**Elipsoid manipulovateľnosti** - jeho tvar ukazuje, ako ľahko sa robot môže pohybovať v rôznych smeroch.

Jacobián je kľúčový aj pre **statickú analýzu síl** - určuje, aké sily a momenty v kĺboch sú potrebné na vytvorenie požadovaného wrenchu na end-efektore.`,
  },
  {
    id: 'ch1-ch6-preview',
    title: 'Chapter 6: Inverse Kinematics',
    content: `**Inverse kinematics** je opačný problém - nájsť hodnoty kĺbov pre požadovanú konfiguráciu end-efektora.

Pre otvorené reťazce je to všeobecne komplikovanejšie ako forward kinematics:
- Pre zadané kĺby: zvyčajne **jedno** riešenie end-efektora
- Pre zadaný end-efektor: môže byť **viacero riešení**, alebo **žiadne**

Najprv sa skúmajú 6-DOF štruktúry s **analytickým riešením** v uzavretom tvare. Potom iteratívne numerické algoritmy využívajúce inverz Jacobiánu.

Pre **kinematicky redundantné** roboty (viac kĺbov ako dimenzia task space) sa používa **pseudoinverz** Jacobiánu.`,
  },
  {
    id: 'ch1-ch7-preview',
    title: 'Chapter 7: Kinematics of Closed Chains',
    content: `Uzavreté reťazce majú špecifické vlastnosti:
- Často **viacero riešení** forward kinematics
- Niekedy aj viacero riešení inverse kinematics
- Niektoré kĺby sú **pasívne** (nepoháňané)
- Analýza singularít je zložitejšia

Kapitola začína prípadovými štúdiami (rovinný päťkĺbový mechanizmus, Stewart-Goughova platforma) a potom zovšeobecňuje na systematickú metodológiu.`,
  },
  {
    id: 'ch1-ch8-preview',
    title: 'Chapter 8: Dynamics of Open Chains',
    content: `**Dynamika** študuje pohyb s ohľadom na sily a momenty, ktoré ho spôsobujú.

**Forward dynamics**: dané sily/momenty → výsledné zrýchlenia
**Inverse dynamics**: požadované zrýchlenia → potrebné sily/momenty

Dynamické rovnice sú sústava diferenciálnych rovníc druhého rádu.

**Dva prístupy odvodenia:**

**Lagrangeov prístup** - vychádza z energií. Zvolíme zovšeobecnené súradnice, vyjadríme kinetickú a potenciálnu energiu, aplikujeme Euler-Lagrangeove rovnice.

**Newton-Eulerov prístup** - vychádza zo zovšeobecneného f = ma. Propagácia rýchlostí a zrýchlení od základne ku koncu, potom výpočet síl smerom späť.

Vďaka otvorenej reťazcovej štruktúre sa dynamika dá formulovať **rekurzívne**.`,
  },
  {
    id: 'ch1-ch9-preview',
    title: 'Chapter 9: Trajectory Generation',
    content: `Robot by mal byť ľahko preprogramovateľný na rôzne úlohy. Bolo by nepraktické, keby užívateľ musel špecifikovať celú históriu každého kĺbu.

**Trajektória** = **cesta** (geometrická postupnosť konfigurácií) + **časovanie** (kedy sa konfigurácie dosiahnu)

Vstupné dáta: usporiadaná množina kĺbových hodnôt (**riadiace body**) s príslušnými časmi.

Tri hlavné prípady:
1. **Priamočiare trajektórie** bod-bod (v priestore kĺbov aj úloh)
2. **Hladké trajektórie** cez postupnosť medzibodov
3. **Časovo optimálne trajektórie** rešpektujúce dynamiku a limity pohonov`,
  },
  {
    id: 'ch1-ch10-preview',
    title: 'Chapter 10: Motion Planning',
    content: `Hľadanie bezkolízneho pohybu robotom cez zaplnený priestor, s vyhýbaním sa limitom kĺbov, limitom pohonov a ďalším fyzikálnym obmedzeniam.

**Path planning** je podproblém - hľadanie bezkolíznej cesty bez ohľadu na dynamiku alebo trvanie.

Neexistuje jeden univerzálny plánovač. Tri základné prístupy:
- **Grid-based metódy** - diskretizácia priestoru
- **Sampling metódy** - náhodné vzorkovanie C-space
- **Virtual potential fields** - virtuálne silové polia`,
  },
  {
    id: 'ch1-ch11-preview',
    title: 'Chapter 11: Robot Control',
    content: `Robot môže vykazovať rôzne správania:
- **Motion/position control** - presné sledovanie trajektórie
- **Force control** - riadenie kontaktnej sily
- **Hybrid motion-force control** - sila v niektorých smeroch, pohyb v iných
- **Impedance control** - robot sa správa ako programovateľná pružina/tlmič

**Fundamentálne obmedzenie**: robot nemôže nezávisle riadiť pohyb aj silu v tom istom smere. Ak robot určí pohyb, silu určí prostredie, a naopak.

Väčšina praktických schém používa **feedback control** na kompenzáciu neistôt. Pre rýchle systémy sa kombinuje dynamický model s feedbackom (**computed torque control**).`,
  },
  {
    id: 'ch1-ch12-preview',
    title: 'Chapter 12: Grasping and Manipulation',
    content: `Modelovanie **kontaktu** medzi robotom a objektom:
- Obmedzenia pohybu objektu kontaktom
- Sily prenesiteľné cez trenie

**Form closure** - geometria kontaktov sama zabraňuje pohybu
**Force closure** - vhodné kontaktné sily dokážu objekt stabilne udržať

Aplikácie aj mimo uchopenia: tlačenie objektov, dynamické prenášanie, testovanie stability konštrukcií.`,
  },
  {
    id: 'ch1-ch13-preview',
    title: 'Chapter 13: Wheeled Mobile Robots',
    content: `Posledná kapitola pokrýva kinematiku, plánovanie pohybu a riadenie kolesových mobilných robotov.

**Omnidirekcionálne roboty** (s omniwheels/mecanum wheels) - pohyb v ľubovoľnom smere vrátane rotácie na mieste.

**Neholonomné roboty** (klasické autá, diferenciálne podvozky) - kolesá sa nešmýkajú bočne. Tieto **neholonomné obmedzenia** sú zásadne odlišné od holonomných obmedzení uzavretých slučiek - obmedzujú rýchlosti, nie konfigurácie.

**Odometria** - odhad konfigurácie podvozku z dát encoderov kolies. Rovnaký postup pre oba typy robotov.

**Mobilná manipulácia** - rameno na kolesovom podvozku. Jacobián mapuje rýchlosti kolies aj kĺbov na twist end-efektora.`,
  },
];
