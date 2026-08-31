// Chapter 3 – Introduction to Rigid-Body Motions
// Full lesson content - DO NOT SHORTEN

export const ch3IntroContent = `# Chapter 3 – Introduction to Rigid-Body Motions

V predchádzajúcej kapitole sme sa naučili rozmýšľať o robotoch cez **configuration space (C-space)**. Zaujímalo nás, koľko nezávislých údajov potrebujeme na to, aby sme úplne opísali configuration robota alebo rigid body. Pri voľnom rigid body v trojrozmernom priestore sme dospeli k výsledku, že potrebuje **6 degrees of freedom (DOF)**. Tri z nich určujú jeho position a ďalšie tri orientation.

To nám však zatiaľ hovorí iba to, **koľko informácií potrebujeme**. Ešte sme si nevytvorili praktický matematický jazyk, pomocou ktorého by sme vedeli s position a orientation počítať. A práve to je hlavná téma Chapter 3.

Predstav si robotické rameno, ktoré má uchopiť predmet zo stola. Kamera dokáže zistiť, kde predmet leží, ale robot potrebuje vedieť oveľa viac než iba jeho vzdialenosť. Potrebuje poznať aj to, ako je predmet natočený, ako je natočený samotný gripper, ako sú kamera a robot umiestnené voči sebe a ako tieto informácie medzi sebou prepočítať. To všetko musí byť zapísané spôsobom, ktorý je presný a zároveň vhodný na výpočty.

Chapter 3 preto vytvára spoločný jazyk pre **position, orientation, velocity, rigid-body motion a forces**.

---

## 1. Prečo pri rigid body nestačí poznať iba position

Predstav si dron letiaci v miestnosti. Ak povieme, že jeho stred sa nachádza v bode

**x = 3 m, y = 2 m, z = 1,5 m,**

poznáme jeho position. Stále však nepoznáme jeho celú configuration.

Dron môže byť v tomto istom bode otočený nosom k oknu, k dverám alebo k stene. Môže byť naklonený dopredu, dozadu alebo nabok. Jeho stred zostáva na rovnakom mieste, ale samotný dron má zakaždým inú orientation.

Pre spatial rigid body preto musíme vždy rozlišovať dve časti configuration:

**position** - kde sa teleso nachádza,

a **orientation** - ako je teleso natočené.

Position má tri nezávislé components a orientation ďalšie tri. Preto:

**3 position DOF + 3 orientation DOF = 6 DOF.**

V Chapter 2 sme riešili hlavne to, prečo je výsledkom práve šesť. Teraz chceme vedieť, **ako týchto šesť DOF reprezentovať tak, aby sme s nimi mohli efektívne počítať**.

---

## 2. Základný nápad: pripevníme k telesu reference frame

Namiesto toho, aby sme sledovali každý bod rigid body zvlášť, pripevníme k telesu vlastný **reference frame**.

Predstav si malý trojrozmerný súradnicový systém s osami x, y a z, ktorý pevne prilepíme na dron. Keď dron letí, frame sa pohybuje spolu s ním. Keď sa dron otočí, otočia sa spolu s ním aj osi frame.

Toto funguje práve preto, že ide o **rigid body**. Jeho body nemenia svoju vzájomnú polohu. Ak teda poznáme configuration jedného frame, ktorý je s telesom pevne spojený, poznáme tým configuration celého telesa.

V robotike si preto často zvolíme dva základné frames. Prvý je **space frame {s}**, teda pevný reference frame prostredia. Môžeme si ho predstaviť napríklad v rohu miestnosti alebo na základni robota. Druhý je **body frame {b}**, ktorý je spojený s pohybujúcim sa telesom, napríklad s dronom alebo s end-effectorom robotického ramena.

Potom už nemusíme hovoriť všeobecne „kde je dron". Môžeme položiť presnejšiu otázku:

**Kde sa nachádza a ako je natočený body frame {b} vzhľadom na space frame {s}?**

Odpoveď na túto otázku určuje configuration rigid body.

---

## 3. Body frame nemusí byť priamo „vo vnútri" telesa

Reference frame je matematická pomôcka, nie fyzická súčiastka. Jeho origin preto nemusí ležať presne v strede telesa a dokonca nemusí byť ani na samotnom telese.

Predstav si robotický gripper. Mohli by sme jeho body frame umiestniť priamo medzi prsty grippera. V praxi je však často užitočnejšie umiestniť origin frame napríklad niekoľko centimetrov pred gripper, do bodu, v ktorom chceme uchopiť predmet.

Na tomto mieste fyzicky nemusí byť žiadny kus robota. To neprekáža. Podstatné je iba to, aby bola position a orientation tohto frame voči gripperu stále rovnaká.

Keď sa gripper pohne, tento imaginárny frame sa musí pohnúť presne spolu s ním.

Toto je veľmi praktické. Reference frames si môžeme umiestniť tam, kde nám dávajú najväčší zmysel pre konkrétnu úlohu.

---

## 4. Jeden fyzický bod môže mať rôzne coordinates

Toto je jedna z najdôležitejších myšlienok Chapter 3.

Predstav si loptu ležiacu na podlahe. Lopta je na jednom konkrétnom mieste. Označme tento bod **p**.

Teraz do miestnosti umiestnime reference frame {a}. Jeho origin je napríklad v ľavom rohu miestnosti. V tomto frame môže mať bod p coordinates

**pa = (1, 2).**

Potom si vytvoríme druhý frame {b}. Je umiestnený na inom mieste a jeho osi sú navyše otočené iným smerom. Ten istý bod p môže mať v tomto frame coordinates

**pb = (4, -2).**

Bod sa nepohol. Lopta je stále na rovnakom fyzickom mieste. Zmenil sa iba spôsob, akým jej polohu opisujeme.

Je to podobné, ako keď dvaja ľudia stoja na rôznych miestach na námestí a opisujú polohu fontány. Jeden povie, že fontána je „desať metrov napravo", druhý povie, že je „päť metrov dozadu a tri metre doľava". Obaja hovoria o tej istej fontáne. Rozdiel vzniká iba preto, že používajú iný referenčný bod a iné smery.

V robotike preto čísla bez uvedenia reference frame často nestačia. Ak povieme:

**p = (2, 3, 1),**

musíme vedieť, **v ktorom frame sú tieto coordinates vyjadrené**.

![Point p represented in two different reference frames {a} and {b}](/book/ch3/fig3-1.png)

---

## 5. Fyzický vector a jeho číselná reprezentácia

Predstav si dron letiaci určitou velocity. Túto velocity si môžeme predstaviť ako šípku. Dĺžka šípky predstavuje speed a smer šípky predstavuje direction of motion.

Takýto geometrický objekt nazývame **free vector**. Hovoríme mu „free", pretože nie je pevne pripútaný ku konkrétnemu bodu. Ak šípku paralelne presunieme bez toho, aby sme zmenili jej dĺžku alebo smer, stále reprezentuje tú istú fyzickú veličinu.

Samotná velocity teda existuje nezávisle od coordinate systemu. Až keď si vyberieme reference frame, môžeme povedať, aké má components.

V jednom frame môže byť napríklad:

**va = (3, 1, 0).**

Ak však rovnakú fyzickú velocity opíšeme v inom, otočenom frame, môžeme dostať:

**vb = (1, -3, 0).**

Dron nezačal letieť inak. Zmenili sa iba coordinates velocity.

Preto sa hovorí, že samotný geometrický vector je **coordinate-free**, zatiaľ čo jeho číselná reprezentácia závisí od zvoleného reference frame.

Tento rozdiel bude v Chapter 3 veľmi dôležitý, pretože budeme často opisovať tú istú fyzickú velocity, force alebo orientation v rôznych frames.

---

## 6. Aj point v priestore môžeme reprezentovať vectorom

Podobný princíp platí aj pre point.

Predstav si svetlo na strope miestnosti. Svetlo existuje na jednom konkrétnom mieste v physical space. Ak si však zvolíme reference frame, môžeme vytvoriť vector od origin frame k svetlu a jeho coordinates použiť na reprezentáciu position svetla.

Ak frame presunieme alebo otočíme, tento vector sa zmení. Samotné svetlo však zostane na mieste.

Preto je dôležité rozlišovať medzi:

**fyzickým pointom p**

a

**vectorom p, ktorý predstavuje coordinates tohto bodu v určitom frame.**

V bežnom zápise sa tieto dve veci často označujú rovnakým písmenom, preto musí byť vždy jasné, z akého reference frame sa na problém pozeráme.

---

## 7. Prečo je change of reference frame v robotike nevyhnutný

Predstav si robotické rameno s kamerou upevnenou nad pracovným stolom. Kamera rozpozná skrutku a vypočíta:

**„Skrutka je 30 cm predo mnou a 10 cm doprava."**

To sú coordinates skrutky v **camera frame**.

Robotické rameno však nemusí plánovať svoje pohyby v camera frame. Jeho controller môže používať frame pripevnený k základni robota.

Controller preto potrebuje prepočítať otázku:

**Ak kamera vidí skrutku na tomto mieste, kde sa skrutka nachádza vzhľadom na základňu robota?**

Skrutka sa pri tom nikam nepohne. Meníme iba frame, v ktorom ju opisujeme.

Takýto **change of reference frame** je v robotike úplne základná operácia. Kamery, joints, end-effector, mobilná platforma a objekty v prostredí môžu mať každý vlastný frame. Aby robot dokázal ich informácie kombinovať, potrebuje medzi týmito frames systematicky prechádzať.

Práve na to budeme používať rotation matrices a homogeneous transformation matrices.

---

## 8. Space frame {s} a body frame {b}

Modern Robotics používa pomerne konzistentné označovanie.

**Space frame {s}** je pevný reference frame. Môžeme si ho predstaviť ako súradnicový systém pripevnený k miestnosti alebo k základni robota.

**Body frame {b}** je frame spojený s rigid body.

Ak máme napríklad dron letiaci miestnosťou, space frame {s} môže zostať pevne v rohu miestnosti. Body frame {b} sleduje dron. Keď sa dron posunie, zmení sa position {b} vzhľadom na {s}. Keď sa dron otočí, zmení sa orientation {b} vzhľadom na {s}.

Configuration rigid body teda môžeme formulovať veľmi presne:

**Configuration rigid body je configuration jeho body frame vzhľadom na space frame.**

Toto bude základná geometrická predstava celej kapitoly.

---

## 9. Dôležitá konvencia knihy: všetky frames sa formálne považujú za stationary

Intuitívne budeme hovoriť, že body frame je „pripevnený k pohybujúcemu sa telesu". Takto si ho môžeme pokojne predstavovať.

Formálne však Modern Robotics interpretuje body frame {b} ako **stationary inertial frame, ktorý je v konkrétnom okamihu presne coincident s frame pripevneným k pohybujúcemu sa telesu**.

Predstav si dron v konkrétnom okamihu. Na dron si predstavíme namaľované osi. Teraz vytvoríme nehybný reference frame, ktorý má v tomto okamihu presne rovnaký origin a rovnakú orientation ako tieto osi.

Práve tento frame označujeme ako {b}.

Táto konvencia bude dôležitá najmä v časti o angular velocities a twists. Kniha tým zabraňuje tomu, aby sme si body-frame representation velocity pomýlili s fyzikou pozorovanou z rotujúceho non-inertial frame.

Intuitívne teda stále môžeme hovoriť „frame pripevnený k robotu", ale pri formálnych výpočtoch máme na pamäti túto presnú interpretáciu.

---

## 10. Right-handed reference frames a smer rotation

V Modern Robotics sa používa **right-handed coordinate system**, teda pravotočivý súradnicový systém. Znie to odborne, ale v skutočnosti ide iba o pravidlo, ktoré nám hovorí, **ako majú byť osi x, y a z navzájom orientované**.

Najjednoduchšie si to predstav pomocou pravej ruky. Roztiahni **palec, ukazovák a prostredník** tak, aby každý smeroval iným smerom. Predstav si, že **ukazovák ukazuje kladný smer osi x** a **prostredník kladný smer osi y**. Keď ich takto nastavíš, **palec ti ukáže kladný smer osi z**.

Pointa je teda veľmi jednoduchá: keď už vieme, kam smeruje +x a +y, smer +z si nemôžeme vybrať ľubovoľne. Pri right-handed coordinate system je jeho smer určený práve týmto pravidlom pravej ruky.

Matematicky sa tento vzťah zapisuje:

**x̂ × ŷ = ẑ**

Symbol **×** znamená cross product. V tomto prípade si z neho stačí predstaviť: **ak vezmeme smer +x a smer +y, pravidlo cross productu nám ukáže smer +z.**

Toto pravidlo však neurčuje iba rozloženie osí. Pravú ruku používame aj na určenie toho, **ktorým smerom je kladná rotation okolo určitej osi**.

Tu už nepotrebuješ tri prsty. Predstav si napríklad rotation okolo z-axis. **Palec pravej ruky nasmeruj v kladnom smere osi z.** Ostatné prsty prirodzene zohni okolo tejto osi. **Smer, ktorým sa tvoje prsty stáčajú, je kladný smer rotation.**

Predstav si napríklad ceruzku postavenú kolmo na stôl. Ceruzka predstavuje z-axis a jej špička smeruje do +z. Pravý palec nasmeruješ hore pozdĺž ceruzky. Ostatné prsty sa okolo nej zatočia určitým smerom. Práve tento smer nazývame **kladná rotation okolo z-axis**.

Preto keď v robotike dostaneš:

**θ = +30° okolo z-axis**

znamienko **+** neznamená iba „30 je kladné číslo". Hovorí nám, **ktorým smerom sa má teleso otočiť**. Nasmeruješ pravý palec do +z a zahnuté prsty ti ukážu smer rotation.

Ak by sme mali:

**θ = −30° okolo z-axis**

rotation by prebehla **opačným smerom**.

Dobrý konkrétny príklad je rotation z x-axis smerom k y-axis. Pri bežnom right-handed coordinate system platí, že kladná rotation okolo +z-axis otáča +x smerom k +y:

**+x - +y**

Ak by sme rotation vykonali záporným smerom, išli by sme opačne:

**+y - +x**

Right-handed coordinate system a right-hand rule teda riešia dve súvisiace veci. **Prvé pravidlo nám pomáha určiť, ako sú orientované osi x, y a z. Druhé nám podľa zvolenej osi ukazuje, ktorým smerom považujeme rotation za kladnú.**

Najjednoduchšia pomôcka je preto:

**Tri prsty - pomáhajú určiť smery osí x, y, z.**

**Palec + zahnuté prsty - palec ukazuje kladný smer rotation axis a zahnuté prsty ukazujú kladný smer rotation okolo nej.**

Takže ak uvidíš napríklad **+90° okolo z-axis**, predstav si pravý palec smerujúci do +z. Smer zahnutých prstov ti okamžite povie, ktorým smerom sa má teleso otočiť.

![Right-handed reference frame and right-hand rule for positive rotation](/book/ch3/fig3-2.png)

---

## 11. Position body frame môžeme opísať vectorom

Predstav si, že máme v miestnosti položeného robota. Aby sme vedeli povedať, **kde sa robot nachádza**, potrebujeme nejaký pevný súradnicový systém, podľa ktorého budeme jeho position merať.

Preto si vytvoríme **space frame {s}**. Môžeš si ho predstaviť ako coordinate system pevne pripevnený k miestnosti. Má svoj origin a axes x, y, z a počas pohybu robota zostáva stále na rovnakom mieste.

Robot má zároveň svoj vlastný **body frame {b}**. Ten je pripevnený priamo k robotovi, takže keď sa robot pohne alebo otočí, body frame sa pohybuje a otáča spolu s ním.

Máme teda dva coordinate frames:

**space frame {s}** - stojí na mieste,

**body frame {b}** - je pripevnený k telesu a pohybuje sa spolu s ním.

Teraz chceme ako prvé zistiť iba to, **kde sa body frame nachádza**. Zatiaľ nás nezaujíma, ako je otočený.

Na to použijeme vector **p**.

Vector p začína v origine space frame a smeruje do originu body frame. Inými slovami nám ukazuje:

**„Kam sa musím zo space origin posunúť, aby som sa dostala do body origin?"**

Predstav si napríklad miestnosť, v ktorej je space origin v jednom bode na podlahe a robot sa nachádza niekoľko metrov od neho. Ak je:

**p = (2, 1, 3)**

znamená to, že body origin sa vzhľadom na space frame nachádza:

**2 jednotky v smere x,
1 jednotku v smere y,
3 jednotky v smere z.**

Vector p teda odpovedá iba na otázku:

**Kde sa origin body frame nachádza?**

A toto rozlíšenie je dôležité. Z p ešte **nevieme, ako je robot otočený**.

Predstav si napríklad dron, ktorý sa vznáša na jednom konkrétnom mieste. Dron môže smerovať dopredu, potom sa na mieste otočiť o 90° doprava a jeho position sa pritom vôbec nemusí zmeniť.

Vector p zostane rovnaký, pretože origin dronu zostal na rovnakom mieste. Zmenila sa však jeho **orientation**.

Pre úplný opis configuration rigid body teda samotný p nestačí.

Potrebujeme vedieť dve veci:

**p - kde sa body frame nachádza**

**R - ako je body frame otočený**

---

## 12. Orientation opíšeme pomocou smerov body axes

Teraz už vieme, kde sa body frame nachádza. Potrebujeme ešte zistiť, **ako je otočený vzhľadom na space frame**.

Body frame má svoje vlastné tri axes:

**x̂b, ŷb, ẑb**

a space frame má:

**x̂s, ŷs, ẑs**

Najjednoduchšie je opäť predstaviť si dron.

Na dron si pomyselne nakreslíme tri šípky. Jeho **body x-axis** môže smerovať cez nos dronu dopredu, **body y-axis** do strany a **body z-axis** nahor.

Tieto šípky sú pripevnené k dronu. Keď sa dron otočí, otočia sa spolu s ním.

Space frame je však stále pevne pripevnený k miestnosti.

Ak je dron na začiatku dokonale zarovnaný s miestnosťou, jeho body x-axis môže smerovať rovnakým smerom ako space x-axis. Podobne body y-axis smeruje rovnako ako space y-axis a body z-axis rovnako ako space z-axis.

Teraz dron otočíme.

Jeho body x-axis už možno nebude smerovať rovnakým smerom ako space x-axis. Napríklad po otočení o 90° môže smerovať tam, kam v miestnosti smeruje +y.

A práve toto potrebujeme matematicky zachytiť.

Pre každú body axis sa preto opýtame:

**„Kam táto axis smeruje, keď jej smer opíšem pomocou coordinate systému miestnosti, teda space frame?"**

Začneme body x-axis.

Povedzme, že po otočení dronu smeruje body x-axis úplne v smere +y space frame. Jej smer teda môžeme v space coordinates zapísať:

**x̂b = (0, 1, 0)**

Tento zápis znamená:

**0 v smere space x,
1 v smere space y,
0 v smere space z.**

Potom rovnakým spôsobom opíšeme, kam smeruje body y-axis a body z-axis.

Nakoniec teda máme tri vectors:

**x̂b - smer body x-axis vyjadrený v space frame**

**ŷb - smer body y-axis vyjadrený v space frame**

**ẑb - smer body z-axis vyjadrený v space frame**

Tieto tri vectors uložíme vedľa seba ako columns jednej matrix:

**R = [ x̂b  ŷb  ẑb ]**

A práve toto je **rotation matrix R**.

![Describing the position and orientation of a rigid body using a reference frame in 3D](/book/ch3/fig3-6.png)

Jej význam je teda oveľa jednoduchší, než môže na prvý pohľad pôsobiť:

**Rotation matrix nám hovorí, kam smerujú tri axes body frame, keď sa na ne pozeráme zo space frame.**

Každý column má konkrétny význam:

**1. column - kam smeruje body x-axis**

**2. column - kam smeruje body y-axis**

**3. column - kam smeruje body z-axis**

---

### Jednoduchý príklad

Predstav si, že body frame a space frame sú na začiatku úplne zarovnané.

Body x-axis smeruje rovnako ako space x-axis:

**x̂b = (1, 0, 0)**

Body y-axis smeruje rovnako ako space y-axis:

**ŷb = (0, 1, 0)**

A body z-axis smeruje rovnako ako space z-axis:

**ẑb = (0, 0, 1)**

Keď tieto tri vectors vložíme ako columns do R, dostaneme:

$$[ 1  0  0 ]$$
$$[ 0  1  0 ]$$
$$[ 0  0  1 ]$$

To je **identity matrix I**.

A dáva to fyzický zmysel: body frame nie je vzhľadom na space frame vôbec otočený.

Teraz si predstav, že body frame otočíme o 90° okolo +z-axis.

Body x-axis, ktorá predtým smerovala do +x, teraz smeruje do +y:

**x̂b = (0, 1, 0)**

Body y-axis sa po tej istej rotation dostane do smeru -x:

**ŷb = (-1, 0, 0)**

Body z-axis zostáva nezmenená, pretože rotujeme práve okolo nej:

**ẑb = (0, 0, 1)**

Keď ich opäť vložíme ako columns:

$$[  0  -1   0 ]$$
$$[  1   0   0 ]$$
$$[  0   0   1 ]$$

dostaneme rotation matrix pre rotation o +90° okolo z-axis.

Teraz už je možné vidieť, **odkiaľ čísla v rotation matrix vlastne pochádzajú**. Nie sú to náhodné čísla ani vzorec, ktorý vznikol bez fyzického významu. Každý column jednoducho opisuje smer jednej body axis z pohľadu space frame.

---

## Position a orientation sú dve rozdielne informácie

Toto rozdelenie je veľmi dôležité.

Vector **p** nám hovorí:

**„Kde je body frame?"**

Rotation matrix **R** nám hovorí:

**„Ako je body frame otočený?"**

Predstav si dron, ktorý stojí na jednom mieste a iba sa otáča. Vtedy sa **R mení, ale p môže zostať rovnaké**.

Ak naopak dron letí rovno dopredu bez toho, aby sa otáčal, mení sa **p, ale R môže zostať rovnaká**.

A ak dron zároveň letí aj mení svoj smer, menia sa **p aj R**.

Preto na úplný opis configuration rigid body v 3D potrebujeme obidve informácie:

**position - p**

**orientation - R**

V ďalšom kroku ich budeme vedieť spojiť do jednej reprezentácie, ktorá bude opisovať **position aj orientation body frame naraz**.

---

## 13. Prečo rotation matrix používa deväť čísel, keď orientation má iba 3 DOF

Rotation matrix má 9 čísel, pretože opisuje smer troch osí body frame:

**x-axis potrebuje 3 čísla - (x, y, z)**

**y-axis potrebuje 3 čísla - (x, y, z)**

**z-axis potrebuje 3 čísla - (x, y, z)**

Spolu teda **3 × 3 = 9 čísel**.

Ale týchto 9 čísel si nemôžeme vybrať ľubovoľne.

Predstav si tri šípky pripevnené k robotovi, ktoré predstavujú jeho x, y a z axes. Keď určíš, kam smeruje x-axis a kam smeruje y-axis, z-axis už nemôže smerovať hocikam. Musí byť kolmá na obe a musí byť orientovaná správnym smerom podľa right-hand rule.

Napríklad ak:

**x-axis - doprava**

a

**y-axis - dopredu**

potom z-axis už nemôžeš otočiť napríklad doľava. Musí smerovať **hore**.

Čiže rotation matrix síce uchováva 9 čísel, ale tie sú medzi sebou previazané pravidlami. V skutočnosti má orientation iba **3 nezávislé možnosti pohybu = 3 DOF**.

Preto rotation matrix nazývame **implicit representation**: používame viac čísel, než skutočne potrebujeme, ale tie čísla musia spĺňať určité constraints.

---

## 14. Prečo vôbec používame redundantnú rotation matrix

Mohli by sme sa spýtať: ak orientation potrebuje iba tri numbers, prečo ju nereprezentujeme jednoducho tromi numbers?

Také reprezentácie existujú. Neskôr sa stretneme napríklad s exponential coordinates a existujú aj Euler angles, roll-pitch-yaw angles či quaternions.

Rotation matrix má však obrovskú praktickú výhodu. Umožňuje nám robiť dôležité geometrické operácie pomocou obyčajnej **matrix multiplication**.

Pomocou jednej rotation matrix môžeme reprezentovať orientation, meniť vector z jedného reference frame do druhého, rotovať vector alebo skladať viac rotations za sebou.

Práve preto robotika často uprednostňuje reprezentáciu, ktorá používa viac numbers, ale robí výpočty jednoduchšie a systematickejšie.

---

## 15. Position a orientation spojíme do homogeneous transformation matrix

Na úplnú configuration rigid body potrebujeme:

**R - orientation**

a

**p - position.**

Mohli by sme ich zapisovať ako dvojicu:

**(R, p).**

V robotike je však veľmi užitočné spojiť ich do jednej **4 x 4 homogeneous transformation matrix T**.

Jej všeobecný tvar je:

$$T =$$
$$[ r11  r12  r13  p1 ]$$
$$[ r21  r22  r23  p2 ]$$
$$[ r31  r32  r33  p3 ]$$
$$[  0    0    0    1  ]$$

Horná ľavá časť je rotation matrix **R**. Pravý column obsahuje position vector **p**. Spodný row **0 0 0 1** umožňuje spojiť rotation a translation do jedného matrix operation.

Takáto matrix bude neskôr označovať celú configuration rigid body.

---

## 16. Prečo 4 x 4 matrix neznamená 16 DOF

Homogeneous transformation matrix obsahuje šestnásť entries. Rigid body však stále má iba **6 DOF**.

Nie je tu žiadny rozpor.

Všeobecná 4 x 4 matrix síce obsahuje šestnásť ľubovoľných real numbers, ale transformation matrix reprezentujúca rigid-body configuration nemôže obsahovať ľubovoľné hodnoty.

Jej rotation časť musí byť platná rotation matrix a spodný row musí mať presne určený tvar.

Podklad to opisuje tak, že z 16-dimensional priestoru všeobecných 4 x 4 matrices nás desať constraints obmedzí na skutočný 6-dimensional priestor rigid-body configurations:

**16 - 10 = 6 DOF.**

To je ďalší príklad implicit representation.

Používame viac numbers, než je minimum, pretože takáto reprezentácia má veľmi výhodné algebraické vlastnosti.

---

## 17. Transformation matrix bude mať tri rôzne významy

Jedna z najdôležitejších vecí v Chapter 3 je pochopiť, že tá istá matrix môže byť použitá rôznymi spôsobmi.

Prvý spôsob je **representing a configuration**. Matrix T môže jednoducho hovoriť, kde sa body frame nachádza a ako je natočený vzhľadom na space frame.

Druhý spôsob je **changing the reference frame**. Máme point alebo vector opísaný v jednom frame a chceme jeho coordinates vyjadriť v inom frame. Fyzický objekt sa pri tom nepohybuje.

Tretí spôsob je **displacing a point or frame**. V tomto prípade transformation matrix interpretujeme ako operation, ktorá point alebo frame skutočne matematicky otočí a posunie.

Tieto tri situácie môžu používať veľmi podobné rovnice, ale fyzikálne znamenajú niečo iné. Práve preto sa im bude kapitola venovať samostatne.

---

## 18. Prečo sa orientation nespráva ako obyčajný flat vector space

V Chapter 2 sme videli, že C-space nemusí byť obyčajný Euclidean priestor.

Orientation je jeden z najlepších príkladov.

Predstav si rotation okolo jednej osi. Začneme pri:

**0°.**

Postupne sa otáčame:

**90° - 180° - 270° - 360°.**

Pri 360° sme späť v tej istej orientation ako pri 0°.

To je veľmi odlišné od obyčajnej position na rovnej číselnej osi. Ak sa posúvame:

**0 m - 1 m - 2 m - 3 m,**

nevrátime sa automaticky do pôvodného bodu.

Pri rotations sa teda configurations „zabaľujú" späť na seba. Preto priestor orientations nie je obyčajný flat vector space.

Táto non-Euclidean geometria je jeden z dôvodov, prečo používame špeciálne matrix representations.

---

## 19. Velocity rigid body sa dá opísať jednoduchšie než jeho configuration

Predstav si dron.

Jeho configuration hovorí, kde sa dron nachádza a ako je natočený. Na to potrebujeme position p a rotation matrix R.

Velocity však odpovedá na inú otázku:

**„Ako sa dron práve teraz pohybuje?"**

V jednom okamihu môže dron robiť dva druhy pohybu naraz. Môže sa presúvať - napríklad doprava, dopredu alebo hore. To opisuje linear velocity, ktorá má 3 components:

**v = (vx, vy, vz)**

Zároveň sa môže otáčať - napríklad nakláňať dopredu, do strany alebo sa otáčať okolo zvislej osi. To opisuje angular velocity, ktorá má tiež 3 components:

**ω = (ωx, ωy, ωz)**

Ak chceme vedieť úplne všetko o tom, ako sa dron v danom okamihu pohybuje, potrebujeme teda:

**3 čísla pre jeho posúvanie + 3 čísla pre jeho otáčanie = 6 čísel.**

Tieto dve časti môžeme spojiť do jedného 6-dimensional vectora, ktorý sa nazýva **twist**.

Napríklad dron môže práve teraz letieť dopredu a hore a zároveň sa otáčať doľava. Twist dokáže všetky tieto pohyby opísať naraz.

Takže najjednoduchšie:

**Configuration** - Kde som a ako som natočený?

**Twist** - Ako sa práve teraz pohybujem a otáčam?

A preto má twist 6 components: **3 pre rotation + 3 pre translation**.

---

## 20. Ako môže byť velocity vector space, keď C-space nie je flat

Na prvý pohľad to môže vyzerať zvláštne. Ak C-space nie je vector space, prečo velocity môže byť?

Pomôže sphere.

Predstav si point, ktorý sa musí pohybovať po povrchu sphere. Jeho C-space je:

**S2.**

Sphere nie je flat plane. Nemožno ju ako celok považovať za obyčajný 2D vector space.

Teraz však vyber jeden konkrétny point na povrchu.

Ak sa point začne pohybovať bez toho, aby opustil sphere, jeho instantaneous velocity musí smerovať **tangentne k surface**. Nemôže smerovať priamo von zo sphere.

V tomto jednom point môžeme všetky možné instantaneous velocities predstaviť ako tangent plane dotýkajúcu sa sphere.

Táto tangent plane už je vector space.

To je všeobecný princíp, ktorý sme začali vidieť už pri velocity constraints v Chapter 2. Configuration odpovedá na otázku:

**„Kde systém môže byť?"**

Velocity odpovedá na inú otázku:

**„Ako sa môže z tejto konkrétnej configuration práve teraz pohybovať?"**

Aj keď je celý C-space geometricky komplikovaný, lokálny priestor možných velocities má jednoduchšiu vector-space štruktúru.

---

## 21. Screw motion ako prirodzený pohyb rigid body

Ďalšou veľkou myšlienkou Chapter 3 je **screw motion**.

Najjednoduchšie si ho predstavíš na obyčajnej skrutke. Keď skrutku zaskrutkuješ, súčasne sa:

**otáča okolo svojej osi**

a

**posúva pozdĺž tej istej osi.**

To je screw motion.

Na prvý pohľad by sa mohlo zdať, že ide iba o jeden špecifický druh pohybu. V skutočnosti má screw motion v robotike oveľa hlbší význam.

**Chasles-Mozzi theorem** hovorí, že každý rigid-body displacement v 3D možno reprezentovať ako vhodnú rotation okolo určitej fixed axis spolu s translation pozdĺž tej istej axis.

To znamená, že aj keď sa výsledný pohyb rigid body javí veľmi komplikovane, vždy existuje vhodná screw axis, pomocou ktorej môžeme celý displacement opísať.

---

## 22. Ako si screw motion predstaviť prakticky

Predstav si knihu položenú na stole. Chceš ju dostať z jednej configuration do druhej - na iné miesto a zároveň ju otočiť.

Mohol by si tento motion opísať ako sériu krokov: trochu ju otočiť, potom posunúť, znova otočiť a ešte trochu posunúť.

Screw theory sa na problém pozerá inak.

Hovorí, že pre výsledný rigid-body displacement existuje určitá axis v priestore, okolo ktorej môžeme knihu otočiť a zároveň ju pozdĺž tejto axis posúvať tak, aby sme dostali presne rovnakú konečnú configuration.

Čistá rotation je špeciálny prípad screw motion, pri ktorom translation pozdĺž osi nie je prítomná. Čistá translation sa tiež dá interpretovať ako limitný prípad screw motion.

Tak získavame veľmi jednotný spôsob, ako rozmýšľať o rigid-body motions.

---

## 23. Exponential coordinates: axis a množstvo motion

Screw motion prirodzene vedie k ďalšiemu spôsobu reprezentácie configuration.

Pri rotation môžeme opísať motion pomocou:

**rotation axis omega-hat**

a

**rotation angle theta.**

Spolu môžeme tieto quantities zapísať ako:

**omega-hat theta.**

Toto sa nazýva **exponential coordinate representation of rotation**.

Pri celom rigid-body motion použijeme podobnú myšlienku. Screw axis označíme **S** a quantity **theta** určuje, ako ďaleko sa po tomto screw motion máme pohybovať.

Dostaneme:

**S theta ∈ R6.**

Ak screw motion obsahuje rotation, theta predstavuje rotation angle. Pri čistej translation predstavuje theta linear distance.

Takto získame šesťparametrovú reprezentáciu rigid-body displacement.

---

## 24. Ako spolu súvisia twist a screw motion

Twist môžeme chápať ako **instantaneous version of screw motion**.

Predstav si rigid body, ktorý sa práve teraz otáča okolo určitej axis a zároveň sa pozdĺž nej pohybuje.

Jeho angular a linear velocity spojíme do twistu.

Ak je screw axis označená **S** a rýchlosť pohybu po nej označíme **theta-dot**, potom twist môžeme vyjadriť ako:

**V = S theta-dot.**

To je veľmi podobné rotation:

**omega = omega-hat theta-dot.**

V oboch prípadoch máme geometric direction pohybu a scalar, ktorý určuje jeho rýchlosť.

Ak potom určitý constant twist „vykonávame" určitý čas, dostaneme konečný rigid-body displacement.

Tým sa začne prepájať velocity s configuration.

---

## 25. Matrix exponential: z motion k výslednej configuration

Práve na spojenie velocity a konečnej configuration budeme používať **matrix exponential**.

Predstav si, že poznáš axis rotation a constant angular velocity. Chceš vedieť, akú orientation bude mať rigid body po určitom čase.

Alebo poznáš screw axis a constant twist a chceš vedieť, kde rigid body skončí.

Matrix exponential rieši presne tento smer problému:

**instantaneous motion - finite motion - final configuration.**

Pri rotations bude premieňať vhodnú reprezentáciu angular motion na rotation matrix.

Pri rigid-body motions bude premieňať screw motion na homogeneous transformation matrix.

---

## 26. Matrix logarithm rieši opačný problém

Matrix logarithm robí opačný krok.

Predstav si robotické rameno, ktoré je v jednej configuration, a poznáš požadovanú final configuration.

Teraz sa pýtaš:

**„Aká axis a aké množstvo motion by ma z počiatočnej configuration dostali do tejto konečnej?"**

Matrix logarithm vezme výslednú rotation matrix alebo transformation matrix a nájde zodpovedajúce exponential coordinates.

Schematicky:

**matrix exponential:**
motion - configuration

**matrix logarithm:**
configuration - motion description

Toto bude neskôr veľmi užitočné pri kinematics a motion planning.

---

## 27. SO(3), SE(3), so(3) a se(3)

V ďalších lessons sa budú veľmi často objavovať štyri podobné označenia.

**SO(3)** je množina všetkých platných 3 x 3 rotation matrices. Reprezentuje spatial orientations.

**SE(3)** je množina všetkých platných 4 x 4 homogeneous transformation matrices. Reprezentuje celé spatial rigid-body configurations, teda position aj orientation.

Potom sa stretneme s označeniami:

**so(3)**

a

**se(3).**

Malé písmená majú iný význam než veľké.

Zatiaľ si ich môžeme predstaviť ako matrix spaces spojené s **instantaneous angular velocities a twists**.

Presný význam sa ukáže prirodzene, keď budeme derivovať rotation matrices a transformation matrices podľa času.

Veľké:

**SO(3), SE(3)**

budú opisovať configurations.

Malé:

**so(3), se(3)**

budú úzko súvisieť s velocities.

---

## 28. Wrench: spoločný opis force a momentu

Poslednou veľkou témou kapitoly sú **forces**.

Predstav si robotické rameno, ktoré drží ťažký predmet.

Gravity na predmet pôsobí force smerom nadol. Táto force však nemusí iba „ťahať dole". Ak pôsobí v určitej vzdialenosti od reference pointu, vytvára zároveň **moment alebo torque**.

Pri rigid body preto často potrebujeme opisovať force a moment naraz.

Modern Robotics ich spojí do jedného 6-dimensional vectora:

**wrench.**

Wrench obsahuje:

**3 moment components**

a

**3 force components.**

Je to veľmi podobná myšlienka ako pri twiste.

Twist spája:

**angular velocity + linear velocity.**

Wrench spája:

**moment + force.**

Tak získavame paralelný matematický jazyk pre motion aj forces.

---

## 29. Prečo je wrench praktický

Predstav si robotický gripper držiaci jablko.

Na jablko pôsobí gravity. Ak sa pozeráme na celý systém vzhľadom na force-torque sensor v zápästí robota, gravity vytvára nielen force, ale podľa geometrie môže vytvárať aj moment okolo sensoru.

Sensor preto často nemeria iba tri force components. Moderné six-axis force-torque senzory merajú:

**Fx, Fy, Fz**

a zároveň

**Mx, My, Mz.**

Presne takýto šesťprvkový údaj je wrench.

Tento pojem bude neskôr veľmi dôležitý pri robot dynamics, contact forces a manipulation.

---

## 30. Ako je postavený celý Chapter 3

Celá kapitola má veľmi logickú štruktúru.

Najprv sa naučíme reprezentovať **orientation** pomocou rotation matrices.

Potom sa pozrieme na **angular velocity** a na to, čo sa deje s rotation matrix, keď sa teleso otáča.

Ďalej vytvoríme **exponential coordinates of rotation**, ktoré nám umožnia prechádzať medzi axis-angle representation a rotation matrix.

Potom k orientation pridáme position a dostaneme **homogeneous transformation matrices**.

Následne spojíme angular a linear velocity do **twistu**.

Twist interpretujeme cez **screw axis**, a pomocou exponential coordinates budeme schopní opisovať celé rigid-body motions.

Na záver analogicky spojíme force a moment do **wrenchu**.

Výsledkom je jeden súvislý matematický jazyk pre:

**orientation, position, velocity, motion a forces rigid body.**

---

## Rekapitulácia najdôležitejších pojmov

**Rigid body** je teleso, pri ktorom sa vzájomné vzdialenosti medzi jeho bodmi nemenia. Voľný rigid body v 3D má 6 DOF: tri pre position a tri pre orientation.

**Reference frame** je súradnicový systém, pomocou ktorého opisujeme position, orientation, vectors a ďalšie fyzikálne veličiny. Ten istý fyzický objekt môže mať rôzne coordinates v rôznych frames.

**Space frame {s}** je pevný reference frame prostredia. **Body frame {b}** je frame spojený s rigid body a jeho configuration vzhľadom na space frame opisuje configuration celého telesa.

**Free vector** je geometrický vector určený length a direction. Samotný vector je coordinate-free, ale jeho číselné components závisia od zvoleného reference frame.

**Right-handed frame** používa konvenciu, pri ktorej platí **x̂ x ŷ = ẑ**. Kladný smer rotation sa určuje pomocou right-hand rule.

**Rotation matrix R** je 3 x 3 matrix reprezentujúca orientation. Jej columns opisujú smery axes jedného frame vyjadrené v coordinates druhého frame.

**Homogeneous transformation matrix T** je 4 x 4 matrix, ktorá spája rotation R a position p a reprezentuje celú rigid-body configuration.

**Implicit representation** používa viac numbers než je skutočný počet DOF, ale tieto numbers sú zviazané constraints. Rotation matrices a homogeneous transformation matrices sú typické príklady.

**Twist** je 6-dimensional representation spatial velocity rigid body. Spája angular velocity a linear velocity.

**Screw motion** je motion pozostávajúci z rotation okolo osi a translation pozdĺž tej istej osi. Chasles-Mozzi theorem hovorí, že každý rigid-body displacement možno reprezentovať vhodným screw motion.

**Exponential coordinates** opisujú rotation alebo rigid-body motion pomocou axis a množstva motion vykonaného okolo alebo pozdĺž tejto axis.

**SO(3)** predstavuje množinu spatial rotation matrices. **SE(3)** predstavuje množinu homogeneous transformation matrices pre spatial rigid-body configurations.

**Wrench** je 6-dimensional spatial force, ktorý spája moment a force.

---

## Čo si z tejto lekcie odniesť

V Chapter 2 sme zistili, že spatial rigid body potrebuje na úplný opis configuration šesť nezávislých parameters. Chapter 3 teraz rieši praktickejší problém: **ako tieto configurations, motions a forces reprezentovať tak, aby s nimi robot mohol systematicky počítať.**

Základom je reference frame. Ak k rigid body pevne priradíme body frame, nemusíme sledovať každý bod telesa zvlášť. Stačí vedieť, kde sa tento frame nachádza a ako je natočený vzhľadom na fixed space frame. Position budeme opisovať vectorom p a orientation rotation matrix R. Neskôr ich spojíme do jednej homogeneous transformation matrix T.

Veľmi dôležité je zároveň rozlišovať medzi fyzickou veličinou a jej coordinate representation. Bod, velocity alebo force existujú vo fyzickom priestore nezávisle od toho, aký frame si zvolíme. Keď frame zmeníme, nemení sa samotná fyzikálna situácia - menia sa iba čísla, ktorými ju reprezentujeme.

Configuration rigid body má komplikovanejšiu geometriu než obyčajný vector space, ale jeho instantaneous velocity sa dá reprezentovať šiestimi components. Tie spojíme do twistu. Každý konečný rigid-body displacement zase môžeme interpretovať ako screw motion, čo nás prirodzene privedie k exponential coordinates, matrix exponential a matrix logarithm.

Na druhej strane budeme podobným spôsobom pracovať s forces. Force a moment spojíme do wrenchu. Chapter 3 tak vytvorí spoločný geometrický jazyk, ktorý budeme používať v ďalších kapitolách pri kinematics, dynamics, motion planning aj robot manipulation.`;
