export interface BookSection {
  id: string;
  title: string;
  content: string; // markdown-like content, images as ![alt](/book/ch2/fig2-1.png)
}

export interface BookChapter {
  courseId: string;
  title: string;
  sections: BookSection[];
}

import { ch1BookSections } from './lessons/ch1-preview-book';

export const bookChapters: BookChapter[] = [
  {
    courseId: 'ch1-preview',
    title: 'Chapter 1: Preview',
    sections: ch1BookSections,
  },
  {
    courseId: 'ch2-intro',
    title: 'Chapter 2: Configuration Space',
    sections: [
      {
        id: 'intro',
        title: 'Konfiguračný priestor - Úvod',
        content: `Robot je mechanicky poskladaný z pevných telies, ktorým hovoríme **linky** (links). Tieto linky sú navzájom prepojené rôznymi typmi **kĺbov** (joints). Motory alebo iné pohony (actuators) dodávajú sily a momenty, ktoré spôsobujú pohyb linkov. Na konkrétny link je zvyčajne pripevnený **end-efector** - napríklad chápadlo alebo ruka na uchopovanie predmetov.

Asi najzákladnejšia otázka, ktorú sa môžeš opýtať o robotovi, je: **Kde sa nachádza?**

Odpoveď dáva **konfigurácia** robota - teda presné určenie polohy všetkých jeho bodov. Keďže linky robota sú tuhé a majú známy tvar, na popis konfigurácie stačí len niekoľko čísel.

**Príklady:**
- **Dvere** - ich konfiguráciu popisuje jediné číslo: uhol θ okolo pántu
- **Bod v rovine** - potrebujeme dve súradnice (x, y)
- **Minca ležiaca na stole** hlavou nahor - potrebujeme tri súradnice: polohu (x, y) nejakého bodu na minci a uhol θ, ktorý určuje orientáciu mince

![Konfigurácia dverí, bodu v rovine a mince](/book/ch2/fig2-1.png)
*Obrázok 2.1: (a) Konfigurácia dverí je daná uhlom θ. (b) Konfigurácia bodu v rovine je daná súradnicami (x, y). (c) Konfigurácia mince na stole je daná (x, y, θ).*

Všetky tieto súradnice nadobúdajú hodnoty z nejakého spojitého rozsahu reálnych čísel. **Počet stupňov voľnosti** (degrees of freedom, skrátene dof) robota je najmenší počet reálnych súradníc potrebných na vyjadrenie jeho konfigurácie.

V príklade vyššie majú dvere **jeden** stupeň voľnosti. Minca ležiaca hlavou nahor na stole má **tri** stupne voľnosti. Aj keby minca mohla ležať hlavou aj zadnou stranou nahor, jej konfiguračný priestor by mal stále len tri stupne voľnosti - štvrtá premenná (hlava/znak) nadobúda hodnoty z diskrétnej množiny {hlava, znak}, nie zo spojitého rozsahu.

> **Definícia:** Konfigurácia robota je úplná špecifikácia polohy každého bodu robota. Minimálny počet n reálnych súradníc potrebných na jej vyjadrenie je počet stupňov voľnosti (dof). N-rozmerný priestor obsahujúci všetky možné konfigurácie sa nazýva **konfiguračný priestor** (C-space). Konfigurácia robota je reprezentovaná bodom v jeho C-space.

V tejto kapitole sa budeme zaoberať C-space a stupňami voľnosti robotov. Keďže naše roboty sú poskladané z tuhých linkov, najprv preskúmame stupne voľnosti jedného tuhého telesa a potom stupne voľnosti zložitejších robotov s viacerými linkami.`,
      },
      {
        id: 'rigid-body-dof',
        title: '2.1 Stupne voľnosti tuhého telesa',
        content: `Vráťme sa k príkladu mince na stole. Vyber si na minci tri body A, B a C.

![Tri body na minci](/book/ch2/fig2-2.png)
*Obrázok 2.2: (a) Tri body zafixované na minci. (b) Keď zvolíš polohu bodu A, bod B musí ležať na kružnici s polomerom d_AB. Po zvolení B musí C ležať v jednom z dvoch priesečníkov kružníc. (c) Konfigurácia mince v 3D priestore.*

Keď k rovine pripevníme súradnicový systém x-y, polohy týchto bodov zapíšeme ako (x_A, y_A), (x_B, y_B) a (x_C, y_C). Keby sme body mohli umiestniť nezávisle kamkoľvek do roviny, minca by mala šesť stupňov voľnosti - dva pre každý bod.

Ale podľa definície tuhého telesa musí byť vzdialenosť medzi bodmi A a B vždy konštantná. Rovnako vzdialenosti d(B,C) a d(A,C). Tieto tri podmienky sa dajú zapísať:

\`\`\`
d(A, B) = √((x_A - x_B)² + (y_A - y_B)²) = d_AB
d(B, C) = √((x_B - x_C)² + (y_B - y_C)²) = d_BC
d(A, C) = √((x_A - x_C)² + (y_A - y_C)²) = d_AC
\`\`\`

**Ako zistíme počet stupňov voľnosti?**

1. Najprv zvol polohu bodu A v rovine - máš **2 voľnosti** na výber (x_A, y_A)
2. Keď je A zvolené, podmienka d(A,B) = d_AB obmedzuje bod B na kružnicu okolo A - zostáva **1 voľnosť** (uhol na kružnici)
3. Keď sú A aj B zvolené, C musí ležať v priesečníku dvoch kružníc - má len **2 možné polohy** (hlava alebo znak), takže **0 spojitých voľností**

Celkovo: 2 + 1 + 0 = **3 stupne voľnosti** v rovine, vyjadrené napríklad ako (x_A, y_A, φ_AB).

Keby sme pridali ďalší bod D, priniesli by sme 2 nové súradnice, ale aj 2 nové nezávislé obmedzenia - takže čistý prírastok voľností je nula.

**Všeobecné pravidlo:**

\`\`\`
stupne voľnosti = (súčet voľností bodov) - (počet nezávislých obmedzení)
\`\`\`

Alebo ekvivalentne:

\`\`\`
stupne voľnosti = (počet premenných) - (počet nezávislých rovníc)
\`\`\`

**A čo v 3D priestore?** Predstav si, že minca už nie je na stole ale voľne v priestore.

1. Bod A - umiestnime kamkoľvek v 3D: **3 voľnosti**
2. Bod B - musí ležať na sfére okolo A s polomerom d_AB: **2 voľnosti** (zemepisná šírka a dĺžka na sfére)
3. Bod C - musí ležať na priesečníku dvoch sfér (okolo A aj B), čo je kružnica: **1 voľnosť**

Celkovo: 3 + 2 + 1 = **6 stupňov voľnosti** v 3D priestore.

> **Zhrnutie:** Tuhé teleso v 3D priestore (priestorové tuhé teleso) má **6 stupňov voľnosti**. Tuhé teleso pohybujúce sa v rovine (rovinné tuhé teleso) má **3 stupne voľnosti**.

Rovinné tuhé teleso s 3 dof sa dá odvodiť aj z priestorového (6 dof) tak, že pridáme 3 nezávislé podmienky: z_A = z_B = z_C = 0.

Pre roboty zložené z tuhých telies platí:

\`\`\`
dof = (súčet voľností všetkých telies) - (počet nezávislých obmedzení)
\`\`\`

Toto je základ pre výpočet stupňov voľnosti zložitejších robotov v nasledujúcej sekcii.`,
      },
      {
        id: 'robot-dof',
        title: '2.2 Stupne voľnosti robota',
        content: `Vráťme sa k príkladu dverí z úvodu. Dvere sú jedno tuhé teleso pripojené ku stene pántovým kĺbom. Bez kĺbu by sa dvere mohli voľne pohybovať v 3D priestore a mali by 6 stupňov voľnosti. Pripojením dverí ku stene pántovým kĺbom sa vytvára 5 nezávislých obmedzení, takže ostáva len 1 nezávislá súradnica (uhol θ).

Alternatívne: pri pohľade zhora sú dvere rovinné teleso (3 dof), pánt pridáva 2 obmedzenia, takže opäť ostáva 1 dof.

Kĺby teda **obmedzujú** pohyb tuhého telesa a znižujú celkový počet stupňov voľnosti. To naznačuje, že existuje vzorec na výpočet dof robota - stačí spočítať počet tuhých telies a kĺbov.

### 2.2.1 Typy kĺbov

![Základné typy kĺbov](/book/ch2/fig2-3.png)
*Obrázok 2.3: Bežné typy kĺbov v robotike.*

Každý kĺb spája presne **dva** linky. Kĺby spájajúce tri alebo viac linkov nie sú povolené.

**Kĺby s 1 stupňom voľnosti:**
- **Rotačný kĺb (R)** - revolute/hinge joint - umožňuje rotáciu okolo osi kĺbu
- **Posuvný kĺb (P)** - prismatic/sliding joint - umožňuje posuv pozdĺž osi kĺbu
- **Skrutkový kĺb (H)** - helical/screw joint - súčasná rotácia a posun okolo osi

**Kĺby s 2 stupňami voľnosti:**
- **Valcový kĺb (C)** - cylindrical joint - nezávislý posuv a rotácia okolo jednej osi
- **Univerzálny kĺb (U)** - universal joint - dva rotačné kĺby s kolmými osami

**Kĺb s 3 stupňami voľnosti:**
- **Guľový kĺb (S)** - spherical/ball-and-socket joint - funguje ako ramenný kĺb, rotácia v troch smeroch

Na kĺb sa dá pozerať dvoma spôsobmi:
1. **Poskytuje voľnosti** - koľko voľných pohybov umožňuje
2. **Vytvára obmedzenia** - koľko pohybov zakazuje

Pre priestorové teleso (6 dof): počet voľností kĺbu + počet obmedzení = 6
Pre rovinné teleso (3 dof): počet voľností kĺbu + počet obmedzení = 3

| Kĺb | Voľnosti (f) | Obmedzenia priestorové (c) | Obmedzenia rovinné (c) |
|------|:---:|:---:|:---:|
| Rotačný (R) | 1 | 5 | 2 |
| Posuvný (P) | 1 | 5 | 2 |
| Skrutkový (H) | 1 | 5 | - |
| Valcový (C) | 2 | 4 | - |
| Univerzálny (U) | 2 | 4 | - |
| Guľový (S) | 3 | 3 | - |`,
      },
      {
        id: 'grubler',
        title: '2.2.2 Grüblerova formula',
        content: `Teraz máme všetko potrebné na odvodenie vzorca pre výpočet stupňov voľnosti ľubovoľného robota.

> **Grüblerova formula:**
> Nech mechanizmus pozostáva z N linkov (vrátane základne/zeme), J kĺbov, pričom m je počet dof tuhého telesa (m = 3 pre rovinné, m = 6 pre priestorové mechanizmy), a f_i je počet voľností i-tého kĺbu. Potom:

\`\`\`
dof = m(N - 1 - J) + Σ f_i
\`\`\`

Táto formula funguje len ak sú všetky obmedzenia nezávislé. Ak nie sú, formula dáva **dolný odhad** skutočného počtu dof.

Rozlišujeme dva typy mechanizmov:
- **Otvorený reťazec** (open chain / serial) - žiadna uzavretá slučka, napr. tvoja ruka voľne v priestore
- **Uzavretý reťazec** (closed chain) - obsahuje uzavretú slučku, napr. človek stojaci oboma nohami na zemi

![Štvorkĺbový mechanizmus a kľukový mechanizmus](/book/ch2/fig2-4.png)
*Obrázok 2.4: (a) Rovinný štvorkĺbový mechanizmus. (b) Kľukový mechanizmus (slider-crank).*

### Príklady

**Štvorkĺbový mechanizmus (four-bar linkage):**
Štyri linky (vrátane zeme) v uzavretej slučke, spojené štyrmi rotačnými kĺbmi. Všetko je rovinné (m = 3).

\`\`\`
N = 4, J = 4, f_i = 1 pre každý kĺb
dof = 3(4 - 1 - 4) + 4 × 1 = 3(-1) + 4 = 1
\`\`\`

Výsledok: **1 stupeň voľnosti** - pohybom jedného linku sa pohne celý mechanizmus.

**Kľukový mechanizmus (slider-crank):**
Dá sa analyzovať dvoma spôsobmi:
- 3 rotačné + 1 posuvný kĺb (J = 4, každý f_i = 1), 4 linky: dof = 3(4-1-4) + 4 = 1
- 2 rotačné kĺby + 1 kombinovaný RP kĺb (f = 2), 3 linky: dof = 3(3-1-3) + 2 + 2 = 1

Oba prístupy dávajú rovnaký výsledok: **1 dof**.

![Sériový reťazec a ďalšie mechanizmy](/book/ch2/fig2-5.png)
*Obrázok 2.5: (a) k-článkový rovinný sériový reťazec. (b) Päťkĺbový mechanizmus. (c) Stephensonov šesťkĺbový mechanizmus. (d) Wattov šesťkĺbový mechanizmus.*

**k-článkový rovinný sériový reťazec:**
N = k + 1 (k linkov + zem), J = k, všetky kĺby rotačné (f_i = 1).
\`\`\`
dof = 3((k+1) - 1 - k) + k = 3(0) + k = k
\`\`\`
Teda k rotačných kĺbov = k stupňov voľnosti. Logické!

**Rovinný päťkĺbový mechanizmus:**
N = 5, J = 5, všetky rotačné:
\`\`\`
dof = 3(5 - 1 - 5) + 5 = -3 + 5 = 2
\`\`\`

**Stephensonov aj Wattov šesťkĺbový mechanizmus:**
N = 6, J = 7, všetky rotačné:
\`\`\`
dof = 3(6 - 1 - 7) + 7 = -6 + 7 = 1
\`\`\`

### Prekrývajúce sa kĺby

![Mechanizmus s prekrývajúcimi sa kĺbmi](/book/ch2/fig2-6.png)
*Obrázok 2.6: Rovinný mechanizmus s prekrývajúcimi sa kĺbmi.*

Keď sa v jednom bode stretávajú tri linky, nie je to jeden kĺb ale **dva prekrývajúce sa kĺby** (každý kĺb spája presne dva linky).

Pre mechanizmus na obrázku 2.6: N = 8, 8 rotačných + 1 posuvný kĺb (J = 9):
\`\`\`
dof = 3(8 - 1 - 9) + 9 = -6 + 9 = 3
\`\`\`

### Redundantné obmedzenia a singularity

![Paralelogramový mechanizmus a singulárna konfigurácia](/book/ch2/fig2-7.png)
*Obrázok 2.7: (a) Paralelogramový mechanizmus. (b) Päťkĺbový mechanizmus v normálnej a singulárnej konfigurácii.*

**Paralelogramový mechanizmus:** N = 5, J = 6, všetky rotačné.
\`\`\`
dof = 3(5 - 1 - 6) + 6 = -6 + 6 = 0
\`\`\`

Nula dof znamená tuhú konštrukciu. Ale v skutočnosti sa tento mechanizmus **môže pohybovať** s jedným stupňom voľnosti! Problém je, že jeden z troch rovnobežných linkov so svojimi kĺbmi nemá žiadny vplyv na pohyb - jeho obmedzenia sú **redundantné** (závislé). Správny výpočet by bol: dof = 3(4-1-4) + 4 = 1.

Grüblerova formula dáva v takýchto prípadoch iba **dolný odhad** skutočných dof.

### Príklad: Delta robot

![Delta robot](/book/ch2/fig2-8.png)
*Obrázok 2.8: Delta robot.*

Delta robot pozostáva z dvoch platforiem (horná pevná, dolná pohyblivá) spojených troma nohami. Každá noha obsahuje paralelogramový uzavretý reťazec.

Celkovo: N = 17, J = 21 (9 rotačných + 12 guľových):
\`\`\`
dof = 6(17 - 1 - 21) + 9(1) + 12(3) = -30 + 9 + 36 = 15
\`\`\`

Z týchto 15 dof je na end-efektore viditeľných len **3** - paralelogramový dizajn zabezpečuje, že dolná platforma zostáva vždy rovnobežná s hornou. Delta robot teda funguje ako kartéziánsky x-y-z polohovací systém. Zvyšných 12 interných dof sú torzie linkov v paralelogramoch.

### Príklad: Stewart-Goughova platforma

Tento mechanizmus pozostáva z dvoch platforiem spojených šiestimi UPS (univerzálny-posuvný-guľový) nohami.

N = 14, J = 18: 6 univerzálnych (f=2) + 6 posuvných (f=1) + 6 guľových (f=3):
\`\`\`
dof = 6(14 - 1 - 18) + 6(1) + 6(2) + 6(3) = -30 + 6 + 12 + 18 = 6
\`\`\`

Šesť stupňov voľnosti - platforma sa môže pohybovať so všetkými šiestimi dof tuhého telesa. Preto sa často používa v letových a jazdných simulátoroch.`,
      },
      {
        id: 'topology',
        title: '2.3 Topológia a reprezentácia C-space',
        content: `### 2.3.1 Topológia konfiguračného priestoru

Doteraz sme sa sústredili na **dimenziu** C-space (počet dof). Ale dôležitý je aj jeho **tvar**.

Uvažuj bod pohybujúci sa po povrchu gule - jeho C-space je dvojrozmerný (zemepisná šírka a dĺžka). Bod pohybujúci sa v rovine má tiež dvojrozmerný C-space (x, y). Oba priestory sú dvojrozmerné, ale majú zjavne **odlišný tvar** - rovina sa rozprestiera do nekonečna, zatiaľ čo guľa sa "zabalí" sama do seba.

Väčšia guľa má rovnaký tvar ako menšia - len inú veľkosť. Dokonca aj americký futbal má podobný tvar - je to len natiahnutá guľa. Myšlienka, že tieto povrchy majú rovnaký "druh tvaru", sa vyjadruje ich **topológiou**.

Dva priestory sú **topologicky ekvivalentné** ak sa jeden dá spojito deformovať na druhý bez rezania alebo lepenia. Guľu vieš natiahnuť na futbal bez rezania - sú topologicky ekvivalentné. Ale guľu nevieš spraviť z roviny bez rezania - nie sú ekvivalentné.

![Otvorený interval a priamka](/book/ch2/fig2-9.png)
*Obrázok 2.9: Otvorený interval reálnej priamky sa dá deformovať na celú priamku - sú topologicky ekvivalentné.*

**Základné jednorozmerné priestory:**
- **S^1** (kružnica) - "jednorozmerná guľa"
- **R^1** (priamka) - jednorozmerný euklidovský priestor
- **[a, b]** (uzavretý interval) - časť priamky s koncovými bodmi

Otvorený interval (a, b) bez koncových bodov je topologicky ekvivalentný priamke. Uzavretý interval [a, b] nie.

**Vo vyšších dimenziách:**
- **R^n** - n-rozmerný euklidovský priestor
- **S^n** - n-rozmerný povrch gule v (n+1)-rozmernom priestore
  - S^1 = kružnica
  - S^2 = povrch gule v 3D

Topológia je vlastnosť samotného priestoru a nezávisí od toho, aké súradnice si vyberieme.

**Príklady C-priestorov ako kartéziánske súčiny:**

- **Tuhé teleso v rovine:** R^2 × S^1 (poloha (x,y) + orientácia θ)
- **PR robot:** R^1 × S^1 (posun + rotácia)
- **2R robot:** S^1 × S^1 = T^2 (torus - povrch šišky)
- **Rovinné teleso + 2R rameno:** R^2 × S^1 × T^2 = R^2 × T^3
- **Tuhé teleso v 3D:** R^3 × S^2 × S^1

Dôležité: S^1 × S^1 × ... × S^1 (n kópií) = T^n (n-rozmerný torus), **nie** S^n. Guľa S^2 a torus T^2 nie sú topologicky ekvivalentné!

### 2.3.2 Reprezentácia konfiguračného priestoru

Na výpočty potrebujeme číselné vyjadrenie priestoru. Dôležité je pamätať, že **reprezentácia zahŕňa voľbu** a nie je taká fundamentálna ako topológia.

**Explicitná parametrizácia** - použijeme n súradníc pre n-rozmerný priestor. Napríklad zemepisná šírka a dĺžka pre guľu. Platí v určitom rozsahu parametrov ([-90°, 90°] pre šírku, [-180°, 180°) pre dĺžku).

Problém: Na severnom a južnom póle (šírka ±90°) môže malinký krok spôsobiť obrovskú zmenu v súradniciach. Tieto body sú **singularity parametrizácie** - sú problémom zvolenej reprezentácie, nie samotnej gule.

Singularity sú obzvlášť problematické pri výpočte rýchlostí - rýchlosti vyjadrené cez zmenu súradníc môžu ísť do nekonečna v blízkosti singularít, aj keď sa bod na guli pohybuje konštantnou rýchlosťou.

**Dva spôsoby ako sa vyhnúť singularitám:**

**1. Viaceré mapy súradníc (atlas)**
Použijeme viac rôznych parametrizácií, každá pokrýva len časť priestoru bez singularít. Keď sa konfigurácia blíži k singularite jednej mapy, prepneme na inú. Výhoda: vždy minimum čísel. Nevýhoda: treba sledovať prepínanie medzi mapami.

**2. Implicitná reprezentácia**
Vnorenie n-rozmerného priestoru do euklidovského priestoru vyššej dimenzie s obmedzeniami. Napríklad jednotková guľa v 3D: používame súradnice (x, y, z) s obmedzením x² + y² + z² = 1.

Nevýhoda: viac čísel ako dof. Výhoda: žiadne singularity - bod pohybujúci sa po guli má vždy hladko sa meniace (x, y, z), aj na póloch. Nepotrebujeme viaceré mapy.

V tejto knihe budeme používať prevažne **implicitné reprezentácie**. Konkrétne používame 9 čísel (s 6 obmedzeniami) na reprezentáciu 3 orientačných dof tuhého telesa v priestore - toto sa nazýva **rotačná matica**. Na rozdiel od trojparametrových reprezentácií (roll-pitch-yaw uhly) je rotačná matica bez singularít a umožňuje využitie lineárnej algebry.`,
      },
      {
        id: 'constraints',
        title: '2.4 Obmedzenia konfigurácie a rýchlosti',
        content: `Pre roboty s uzavretými slučkami je zvyčajne jednoduchšie získať implicitnú reprezentáciu ako explicitnú parametrizáciu.

### Rovnice uzavretých slučiek

Uvažujme rovinný štvorkĺbový mechanizmus s jedným stupňom voľnosti.

![Štvorkĺbový mechanizmus s označeniami](/book/ch2/fig2-10.png)
*Obrázok 2.10: Štvorkĺbový mechanizmus.*

Podmienka, že štyri linky vždy tvoria uzavretú slučku, sa dá zapísať tromi rovnicami:

\`\`\`
L₁ cos θ₁ + L₂ cos(θ₁ + θ₂) + ... + L₄ cos(θ₁ + ... + θ₄) = 0
L₁ sin θ₁ + L₂ sin(θ₁ + θ₂) + ... + L₄ sin(θ₁ + ... + θ₄) = 0
θ₁ + θ₂ + θ₃ + θ₄ - 2π = 0
\`\`\`

Tieto sa nazývajú **rovnice uzavretej slučky** (loop-closure equations). Pre štvorkĺbový mechanizmus sú to 3 rovnice so 4 neznámymi. Množina všetkých riešení tvorí jednorozmernú krivku v 4-rozmernom priestore kĺbových premenných - a tá krivka je konfiguračný priestor.

**Všeobecne** pre roboty s uzavretými slučkami sa C-space dá implicitne reprezentovať vektorom θ = [θ₁ ... θ_n]^T ∈ R^n a rovnicami uzavretých slučiek:

\`\`\`
g(θ) = [g₁(θ₁,...,θ_n), ..., g_k(θ₁,...,θ_n)]^T = 0
\`\`\`

kde k je počet nezávislých rovníc (k ≤ n). Takéto obmedzenia sa nazývajú **holonomné obmedzenia** - znižujú dimenziu C-space. C-space sa dá chápať ako povrch dimenzie (n - k) vnorený v R^n.

### Rýchlostné obmedzenia

Ak sa robot s holonomnými obmedzeniami g(θ) = 0 pohybuje v čase t, deriváciou oboch strán podľa t dostaneme:

\`\`\`
∂g/∂θ (θ) · θ̇ = 0
\`\`\`

Toto sa dá zapísať maticovo:

\`\`\`
A(θ) · θ̇ = 0
\`\`\`

kde A(θ) je matica k × n. Obmedzenia tohto tvaru sa nazývajú **Pfaffianove obmedzenia**.

### Neholonomné obmedzenia

Teraz si ukážeme zásadne odlišný typ obmedzení.

![Minca kotúľajúca sa po rovine](/book/ch2/fig2-11.png)
*Obrázok 2.11: Minca kotúľajúca sa po rovine bez šmýkania.*

Uvažujme vzpriamenú mincu s polomerom r, ktorá sa kotúľa po rovine. Jej konfigurácia je daná: kontaktným bodom (x, y), uhlom riadenia φ a uhlom rotácie θ. C-space je teda R^2 × T^2 - štvorrozmerný.

Podmienka kotúľania bez šmýkania znamená, že minca sa musí pohybovať v smere (cos φ, sin φ) rýchlosťou r·θ̇:

\`\`\`
ẋ = rθ̇ cos φ
ẏ = rθ̇ sin φ
\`\`\`

V maticovom tvare A(q)·q̇ = 0:

\`\`\`
[1  0  0  -r cos q₃] [q̇₁]   [0]
[0  1  0  -r sin q₃] [q̇₂] = [0]
                      [q̇₃]
                      [q̇₄]
\`\`\`

Tieto Pfaffianove obmedzenia sú **neintegrovateľné** - neexistuje funkcia g(q) taká, že ∂g/∂q = A(q). Dá sa to ukázať tak, že ak by taká g₁(q) existovala, musela by simultánne splniť:

\`\`\`
∂g₁/∂q₁ = 1      → g₁ = q₁ + h₁(q₂, q₃, q₄)
∂g₁/∂q₂ = 0      → g₁ = h₂(q₁, q₃, q₄)
∂g₁/∂q₃ = 0      → g₁ = h₃(q₁, q₂, q₄)
∂g₁/∂q₄ = -r cos q₃  → g₁ = -rq₄ cos q₃ + h₄(q₁, q₂, q₃)
\`\`\`

Je jasné, že žiadna taká g₁ neexistuje.

Neintegrovateľné Pfaffianove obmedzenie sa nazýva **neholonomné obmedzenie**. Kľúčová vlastnosť: neholonomné obmedzenia **zmenšujú priestor prípustných rýchlostí**, ale **nezmenšujú dimenzie dosiahnuteľného C-space**. Kotúľajúca sa minca môže dosiahnuť ľubovoľnú konfiguráciu vo svojom 4-rozmernom C-space napriek dvom obmedzeniam na rýchlosť.

> **Holonomné** obmedzenia = zmenšujú C-space (menej polôh)
> **Neholonomné** obmedzenia = zmenšujú priestor rýchlostí (menej okamžitých smerov pohybu, ale všetky polohy sú dosiahnuteľné)

Neholonomné obmedzenia sa v robotike vyskytujú pri zachovaní hybnosti a pri kotúľaní bez šmýkania - napríklad pri kolových robotoch.`,
      },
      {
        id: 'task-workspace',
        title: '2.5 Task space a Workspace',
        content: `Teraz si zavedieme dva ďalšie pojmy súvisiace s konfiguráciou robota: **task space** (priestor úlohy) a **workspace** (pracovný priestor). Oba sa týkajú konfigurácie **end-efektora** robota, nie celého robota.

### Task space

Task space je priestor, v ktorom sa úloha robota dá prirodzene vyjadriť.

**Príklady:**
- Robot kreslí perom na papier → task space je **R^2** (rovina papiera)
- Robot manipuluje s predmetom → task space je **C-space tuhého telesa** (poloha + orientácia end-efektora)
- Robot strieká farbu → záleží na polohe trysky + smer striekania, ale rotácia okolo osi trysky nie je dôležitá → task space je **R^3 × S^2**

Voľba task space závisí od **úlohy**, nie od robota.

### Workspace

Workspace je množina konfigurácií, ktoré end-efektor robota **dokáže dosiahnuť**. Závisí hlavne od **štruktúry robota**, nie od úlohy.

![Príklady workspace](/book/ch2/fig2-12.png)
*Obrázok 2.12: Workspace pre rôzne roboty: (a) rovinný 2R, (b) rovinný 3R, (c) sférický 2R, (d) 3R orientačný mechanizmus.*

Dôležité rozdiely medzi task space, workspace a C-space:
- Jeden bod v task space alebo workspace môže byť dosiahnuteľný **viacerými konfiguráciami** robota
- Nie všetky body v task space musia byť dosiahnuteľné robotom
- Všetky body vo workspace sú dosiahnuteľné aspoň jednou konfiguráciou

**Zaujímavé pozorovania:**
- Dva mechanizmy s **rôznym C-space** môžu mať **rovnaký workspace**: rovinný 2R s linkami dĺžky 3 a rovinný 3R s linkami dĺžky 2 majú rovnaký kruhový workspace (polomer 6)
- Dva mechanizmy s **rovnakým C-space** môžu mať **rôzny workspace**: rovinný 2R (disk) vs sférický 2R (povrch gule)

### Príklad: SCARA robot

![SCARA robot](/book/ch2/fig2-13.png)
*Obrázok 2.13: SCARA robot.*

SCARA robot je RRRP otvorený reťazec používaný na pick-and-place úlohy. Konfigurácia end-efektora je (x, y, z, φ) - poloha plus orientácia v rovine x-y. Task space: R^3 × S^1. Workspace: dosiahnuteľné body v (x, y, z), keďže všetky orientácie φ sú dosiahnuteľné v každom bode.

### Príklad: Lakovací robot

![Lakovací robot](/book/ch2/fig2-14.png)
*Obrázok 2.14: Robot na lakovanie.*

Šesťkĺbový priemyselný robot prispôsobený na lakovanie. Dôležitá je poloha trysky (x, y, z) a smer striekania (θ, φ) - rotácia okolo osi trysky je nepodstatná. Task space: **R^3 × S^2** (5 rozmerov namiesto plných 6 dof).`,
      },
      {
        id: 'summary',
        title: '2.6 Zhrnutie',
        content: `Tu sú kľúčové myšlienky tejto kapitoly:

**Robot a jeho časti:**
- Robot sa skladá z **linkov** (tuhé telesá) spojených **kĺbmi**
- **End-efektor** (chápadlo, ruka) je pripevnený na konkrétny link
- **Pohony** (motory) dodávajú sily a momenty do kĺbov

**Typy kĺbov:**
- 1-dof: rotačný (R), posuvný (P), skrutkový (H)
- 2-dof: valcový (C), univerzálny (U)
- 3-dof: guľový (S) / ball-and-socket

**Konfigurácia a C-space:**
- Konfigurácia = presné určenie polohy všetkých bodov robota
- Rovinné tuhé teleso: 3 dof
- Priestorové tuhé teleso: 6 dof
- C-space = množina všetkých možných konfigurácií
- Dimenzia C-space = počet stupňov voľnosti

**Grüblerova formula:**

\`\`\`
dof = m(N - 1 - J) + Σ f_i
\`\`\`

kde m = 3 (rovinné) alebo 6 (priestorové), N = počet linkov, J = počet kĺbov, f_i = dof i-tého kĺbu.

**Reprezentácia C-space:**
- **Explicitná parametrizácia** - n súradníc pre n-dof systém, môže mať singularity
- **Implicitná reprezentácia** - m ≥ n súradníc s (m - n) obmedzeniami, bez singularít
- **Rotačná matica** - 9 čísel s 6 obmedzeniami pre 3 orientačné dof - preferovaná implicitná reprezentácia

**Obmedzenia:**
- **Holonomné** - rovnice tvaru g(θ) = 0 - zmenšujú C-space
- **Neholonomné** - Pfaffianove obmedzenia A(θ)θ̇ = 0, ktoré nie sú integrovateľné - obmedzujú rýchlosti ale nie dosah
- Príklad neholonomných obmedzení: kotúľanie bez šmýkania (kolové roboty)

**Task space vs Workspace:**
- **Task space** - priestor definovaný úlohou (nie robotom)
- **Workspace** - množina dosiahnuteľných konfigurácií end-efektora (definovaný robotom)
- Odlišné od C-space - bod v task space/workspace môže zodpovedať viacerým konfiguráciám robota`,
      },
      {
        id: 'exercises',
        title: '2.8 Cvičenia',
        content: `**Cvičenie 2.1** Pomocou metód z časti 2.1 odvoď vzorec pre počet stupňov voľnosti tuhého telesa v n-rozmernom priestore. Koľko z nich sú translačné a koľko rotačné? Popíš topológiu C-space.

**Cvičenie 2.2** Zisti počet stupňov voľnosti tvojej ruky od trupu po dlaň (bez prstov). Drž stred ramenného kĺbu na mieste. Urči dof dvoma spôsobmi:
(a) Sčítaj dof v ramennom, lakťovom a zápästnom kĺbe
(b) Polož dlaň na stôl a zisti, koľkými spôsobmi vieš ešte pohybovať rukou

![Robot na rehabilitáciu ľudskej ruky](/book/ch2/fig2-15.png)
*Obrázok 2.15: Robot na rehabilitáciu ruky.*

**Cvičenie 2.3** Modeluj svoju ruku (od ramena po dlaň) ako mechanizmus s kĺbmi a vypočítaj dof pomocou Grüblerovej formuly. Predlaktie má v skutočnosti dve kosti (radius a ulna), ktoré tvoria uzavretý reťazec.

**Cvičenie 2.4** Predpokladaj, že každá ruka má n dof. Šoféruješ auto, trup je nehybný (bezpečnostný pás!) a obe ruky pevne držia volant. Koľko dof má systém ruky + volant?

**Cvičenie 2.5** Robot na rehabilitáciu ľudskej ruky na obrázku 2.15. Urči počet dof reťazca tvoreného ľudskou rukou a robotom.

**Cvičenie 2.6** Mobilný manipulátor na obrázku 2.16 pozostáva zo 6R ramena a viacprstovej ruky na mobilnej základni s jedným kolesom.

![Mobilný manipulátor](/book/ch2/fig2-16.png)
*Obrázok 2.16: Mobilný manipulátor.*

(a) Popíš C-space mobilného manipulátora (bez ruky).
(b) Robot rukou uchopí dvere chladničky a otvorí ich len pomocou ramena. Koľko dof má mechanizmus rameno + otvorené dvere?
(c) Príde druhý identický robot a tiež uchopí kľučku. Koľko dof má systém dvoch ramien + dvere?

**Cvičenie 2.7** Tri identické SRS ramená uchopujú spoločný objekt (obrázok 2.17).

![Tri SRS ramená](/book/ch2/fig2-17.png)
*Obrázok 2.17: Tri spolupracujúce SRS ramená.*

(a) Nájdi dof systému.
(b) Koľko dof ak je n takýchto ramien?
(c) Čo ak guľový kĺb v každom ramene nahradíme univerzálnym?

**Cvičenie 2.8** Priestorový paralelný mechanizmus: pohyblivá doska spojená s pevnou doskou n identickými nohami. Koľko dof musí mať každá noha aby pohyblivá doska mala 6 dof?

**Cvičenie 2.9** Pomocou rovinnej Grüblerovej formuly urči dof mechanizmov na obrázku 2.18.

![Zbierka rovinných mechanizmov 1](/book/ch2/fig2-18.png)
*Obrázok 2.18: Prvá zbierka rovinných mechanizmov.*

**Cvičenie 2.10** Urči dof mechanizmov na obrázku 2.19.

![Zbierka rovinných mechanizmov 2](/book/ch2/fig2-19.png)
*Obrázok 2.19: Druhá zbierka rovinných mechanizmov.*

**Cvičenie 2.11** Pomocou priestorovej Grüblerovej formuly urči dof mechanizmov na obrázku 2.20.

![Priestorové mechanizmy 1](/book/ch2/fig2-20.png)
*Obrázok 2.20: Prvá zbierka priestorových paralelných mechanizmov.*

**Cvičenie 2.12** Urči dof mechanizmov na obrázku 2.21.

![Priestorové mechanizmy 2](/book/ch2/fig2-21.png)
*Obrázok 2.21: Druhá zbierka priestorových paralelných mechanizmov.*

**Cvičenie 2.13** Paralelný mechanizmus na obrázku 2.22: šesť nôh rovnakej dĺžky spojených guľovými kĺbmi. Urči dof a ukáž možné pohyby.

![6×SS platforma](/book/ch2/fig2-22.png)
*Obrázok 2.22: 6×SS platforma.*

**Cvičenie 2.14** 3×UPU platforma (obrázok 2.23).
(a) Over, že má 3 dof.
(b) Postav fyzický model. Zamkni P kĺby - stane sa konštrukcia tuhá ako predpovedá formula?

![3×UPU platforma](/book/ch2/fig2-23.png)
*Obrázok 2.23: 3×UPU platforma.*

**Cvičenie 2.15** Mechanizmy zo šiestich štvorcov (obrázok 2.24).
(a) Šesť štvorcov v jednej slučke - urči dof.
(b) Iné usporiadanie šiestich štvorcov - urči dof.

**Cvičenie 2.16** Sférický štvorkĺbový mechanizmus (obrázok 2.25) - štyri linky spojené rotačnými kĺbmi na sfére.

![Sférický štvorkĺbový mechanizmus](/book/ch2/fig2-25.png)
*Obrázok 2.25: Sférický štvorkĺbový mechanizmus.*

(a) Urči dof a zdôvodni výber formuly.
(b) Popíš C-space.
(c) Popíš workspace stredného linku.

**Cvičenie 2.17** Chirurgický robot (obrázok 2.26).

![Chirurgický manipulátor](/book/ch2/fig2-26.png)
*Obrázok 2.26: Chirurgický manipulátor.*

(a) Urči dof mechanizmu.
(b) Ak nástroj musí vždy prechádzať bodom A, koľko dof?
(c) Nohy nahradené RRRR nohami s osami prechádzajúcimi bodom A - urči dof.

**Cvičenie 2.18** 3×PUP platforma (obrázok 2.27). Urči dof.

![3×PUP platforma](/book/ch2/fig2-27.png)
*Obrázok 2.27: 3×PUP platforma.*

**Cvičenie 2.19** Dvojramenný robot na obrázku 2.28 drží krabicu, ktorá sa môže len posúvať po stole. Koľko dof?

![Dvojramenný robot](/book/ch2/fig2-28.png)
*Obrázok 2.28: Dvojramenný robot.*

**Cvičenie 2.20** Robot vážka (obrázok 2.29) s telom, štyrmi nohami a štyrmi krídlami. Urči dof keď: (a) telo fixné, (b) robot letí, (c) stojí všetkými nohami na zemi.

![Robot vážka](/book/ch2/fig2-29.png)
*Obrázok 2.29: Robot vážka.*

**Cvičenie 2.21** Robot húsenica (obrázok 2.30). Urči dof keď: (a) visí za chvost, (b) lezie (všetky segmenty na liste), (c) lezie (len prvý a posledný segment na liste).

![Robot húsenica](/book/ch2/fig2-30.png)
*Obrázok 2.30: Robot húsenica.*

**Cvičenie 2.22** Štvorprstová ruka (obrázok 2.31). Urči dof pre rôzne kontakty prstov so stolom a s uchopením elipsoidného objektu.

![Štvorprstová ruka](/book/ch2/fig2-31.png)
*Obrázok 2.31: (a) Štvorprstová ruka. (b) Uchopenie elipsoidu. (c) Zaoblený konček prsta.*

**Cvičenie 2.23** Kľukový mechanizmus (obrázok 2.4b): dva linky rovnakej dĺžky. Urči C-space a nakresli jeho projekciu.

**Cvičenie 2.24** Rovinný štvorkĺbový mechanizmus voľne v priestore. Odvoď implicitnú parametrizáciu C-space.

**Cvičenie 2.25** Podrobná analýza C-space štvorkĺbového mechanizmu (obrázok 2.32). Odvoď vzťah medzi vstupným a výstupným uhlom pre rôzne dĺžky linkov.

![Štvorkĺbový mechanizmus s označeniami](/book/ch2/fig2-32.png)
*Obrázok 2.32: Rovinný štvorkĺbový mechanizmus s označeniami.*

**Cvičenie 2.26** 2R rovinný robot (obrázok 2.33). Súradnice koncového bodu sú x = 2 cos θ₁ + cos(θ₁ + θ₂), y = 2 sin θ₁ + sin(θ₁ + θ₂).
(a) Čo je C-space?
(b) Čo je workspace?
(c) Aký je voľný C-space ak sú bariéry na x = 1 a x = -1?

![2R rovinný robot](/book/ch2/fig2-33.png)
*Obrázok 2.33: 2R rovinný otvorený reťazec.*

**Cvičenie 2.27** Workspace rovinného 3R reťazca. Porovnaj workspace pre dĺžky linkov (5, 2, 1) vs (1, 2, 5).

**Cvičenie 2.28** Popíš task space pre: (a) robot píšuci na tabuľu, (b) robot točiaci palicou.

**Cvičenie 2.29** Popíš topológiu C-space pre: auto na rovine, auto na asteroide, auto s RRPR ramenom, voľne letiaci objekt so 6R ramenom.

**Cvičenie 2.30** Navrhni algoritmus, ktorý dostane kotúľajúcu sa mincu z ľubovoľnej počiatočnej konfigurácie do ľubovoľnej cieľovej konfigurácie, napriek neholonomným obmedzeniam.

**Cvičenie 2.31** Diferenciálny podvozok s dvoma kolesami (obrázok 2.34). Odvoď riadkové vektorové polia, Pfaffianove obmedzenia a urči, či sú holonomné alebo neholonomné.

![Diferenciálny podvozok](/book/ch2/fig2-34.png)
*Obrázok 2.34: Robot s diferenciálnym podvozkom.*

**Cvičenie 2.32** Rozhodni, či dané diferenciálne obmedzenia sú holonomné alebo neholonomné.`,
      },
    ],
  },
];
