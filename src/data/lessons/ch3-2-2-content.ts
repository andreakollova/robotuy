// Chapter 3.2.2 – Angular Velocities
// Full lesson content - DO NOT SHORTEN

export const ch322Content = `# Chapter 3.2.2 – Angular Velocities

V predchádzajúcich lekciách sme sa naučili reprezentovať **orientation rigid body** pomocou rotation matrix R. Vedeli sme teda odpovedať na otázku, ako je teleso natočené vzhľadom na zvolený reference frame. Teraz však chceme ísť o krok ďalej. Nestačí nám vedieť, akú orientation má robotický gripper alebo dron v konkrétnom okamihu. Chceme vedieť aj to, **ako sa táto orientation práve mení**.

Presne tu vzniká pojem **angular velocity**. Je to rotational obdoba linear velocity. Ak position hovorí, kde sa bod nachádza, linear velocity hovorí, ako rýchlo sa jeho position mení. Podobne rotation matrix hovorí, akú orientation rigid body práve má, zatiaľ čo angular velocity opisuje, **ako rýchlo a okolo akej osi sa táto orientation mení**.

Táto lekcia preto spája dve doteraz oddelené myšlienky: rotation matrix ako opis orientation a velocity ako okamžitú zmenu configuration. Uvidíme, že derivácia rotation matrix má veľmi špeciálnu štruktúru a že angular velocity sa dá reprezentovať nielen 3D vectorom, ale aj **skew-symmetric matrix**. Práve tento krok nás pripraví na exponential coordinates v ďalšej časti Chapter 3.

---

## 1. Orientation a angular velocity opisujú dve rôzne veci

Predstav si dva identické ventilátory. V určitom okamihu majú lopatky oboch ventilátorov presne rovnakú orientation. Jedna lopatka na každom ventilátore smeruje napríklad presne nahor. Ak by sme tento okamih odfotili, z fotografie by sme nevedeli rozlíšiť, ktorý ventilátor je zapnutý.

Prvý ventilátor môže byť úplne zastavený. Druhý sa môže otáčať vysokou rýchlosťou. V danom okamihu však majú rovnakú orientation.

To ukazuje, že **orientation sama osebe neobsahuje informáciu o motion**.

Rotation matrix R odpovedá na otázku:

**„Ako je rigid body práve natočené?"**

Angular velocity omega odpovedá:

**„Ako sa jeho orientation práve teraz mení?"**

Je to rovnaký rozdiel, aký sme už videli medzi configuration a velocity. Configuration opisuje stav systému v konkrétnom okamihu, velocity opisuje smer a rýchlosť jeho okamžitej zmeny.

Ak je teleso úplne nehybné, jeho orientation môže byť akákoľvek, ale angular velocity bude:

**omega = 0**

Ak sa teleso otáča, omega bude nenulové.

---

## 2. Ako si angular velocity predstaviť fyzicky

Najjednoduchšie je začať kolesom bicykla. Koleso sa otáča okolo osi prechádzajúcej jeho nábojom. Na úplný opis tejto rotation potrebujeme dve informácie.

Prvou je **axis of rotation**. Tá nám hovorí, okolo akej priamky sa teleso otáča. Jej direction môžeme reprezentovať unit vectorom:

**omega-hat**

Strieška nad omega znamená, že ide o unit vector, teda vector s length 1.

Druhou informáciou je, ako rýchlo sa rotation angle mení. Ak angle označíme:

**theta**

potom jeho časovú zmenu označíme:

**theta-dot**

a čítame ju ako „theta dot". Fyzicky ide o angular speed, typicky v jednotkách rad/s.

Tieto dve informácie môžeme spojiť do jedného vectora:

**omega = omega-hat theta-dot**

Direction vectora omega teda určuje instantaneous rotation axis a jeho magnitude určuje angular speed.

Ak sa napríklad teleso otáča rýchlosťou 2 rad/s okolo positive z-axis, potom:

**omega-hat = (0, 0, 1)**

a:

**theta-dot = 2**

takže:

**omega = (0, 0, 2)**

Ak obrátime smer rotation, dostaneme:

**omega = (0, 0, -2)**

Angular velocity teda obsahuje informáciu nielen o rýchlosti, ale aj o smere rotation podľa **right-hand rule**.

---

## 3. Prečo angular velocity smeruje pozdĺž osi a nie v smere pohybu bodov

Toto môže byť spočiatku trochu zvláštne. Predstav si opäť koleso. Bod na jeho hornom okraji sa môže v konkrétnom okamihu pohybovať dopredu. Bod na spodnom okraji sa zároveň pohybuje dozadu. Iné body majú zase úplne iné linear velocities.

Angular velocity však musí byť jedna spoločná quantity pre celé rigid body.

Preto jej direction neukazuje direction pohybu konkrétneho bodu. Ukazuje **axis, okolo ktorej sa celé teleso otáča**.

Predstav si os bicyklového kolesa ako šípku prechádzajúcu nábojom. Ak sa koleso otáča, angular velocity vector leží pozdĺž tejto osi. Jeho direction určíme right-hand rule: prsty pravej ruky zatočíme v smere rotation a palec ukáže direction omega.

Takto dostávame jeden vector, ktorý opisuje rotational motion celého rigid body, hoci jednotlivé body telesa majú rôzne linear velocities.

---

## 4. Angular velocity v 3D nemusí smerovať pozdĺž jednej coordinate axis

Pri jednoduchých príkladoch často hovoríme o rotation okolo x, y alebo z-axis. V skutočnom 3D motion však instantaneous rotation axis môže smerovať úplne ľubovoľne.

Angular velocity preto zapisujeme ako 3D vector:

**omega = (omega1, omega2, omega3)**

Tieto tri components sú vyjadrené vzhľadom na zvolený reference frame.

Predstav si dron, ktorý súčasne robí mierny roll a yaw. Jeho rotational motion nie je potrebné chápať ako dve úplne oddelené rotations. V jednom konkrétnom okamihu existuje výsledná angular velocity omega, ktorá predstavuje kombináciu všetkých rotational components.

Jej direction určuje instantaneous axis, okolo ktorej sa dá aktuálny motion lokálne chápať, a jej magnitude určuje, ako rýchlo rotation prebieha.

Toto je dôležité aj z pohľadu C-space. Orientation space SO(3) nie je obyčajný vector space, ale **instantaneous angular velocities môžeme reprezentovať obyčajnými 3D vectors**.

---

## 5. Ako angular velocity súvisí s rotation matrix

Teraz chceme angular velocity spojiť s tým, čo už poznáme.

Rotation matrix R reprezentuje orientation body frame. Jej columns môžeme zapísať ako:

**R = [r1 r2 r3]**

Každý column je jedna body-frame axis vyjadrená v space coordinates.

Ak sa rigid body nehýbe, columns zostávajú rovnaké. Ak sa rigid body otáča, axes sa otáčajú spolu s ním a ich coordinate representations sa v čase menia.

Preto môžeme rotation matrix písať presnejšie ako:

**R(t)**

Čas t nám pripomína, že orientation sa môže meniť.

Derivácia podľa času je:

**Rdot**

a tá obsahuje derivatives jednotlivých columns:

**Rdot = [rdot1 rdot2 rdot3]**

Aby sme pochopili význam Rdot, potrebujeme najskôr pochopiť, ako sa pri rotation mení **jeden vector**.

---

## 6. Jeden vector pevne pripojený k rotujúcemu telesu

Predstav si vinylovú platňu otáčajúcu sa na gramofóne. Zo stredu platne nakreslíme šípku k bodu na jej okraji. Túto šípku označíme vectorom:

**r**

Keď sa platňa otáča, length vectora r sa nemení. Mení sa iba jeho direction.

Jeho koncový bod sa pohybuje po kružnici. Instantaneous direction pohybu je tangentná ku kružnici, takže je perpendicular na r.

Ak má platňa angular velocity omega, platí veľmi dôležitý vzťah:

**rdot = omega x r**

Na ľavej strane máme **rdot**, teda ako rýchlo sa vector r mení.

Na pravej strane máme **omega x r**, cross product angular velocity a aktuálneho vectora r.

Tento vzťah spája angular motion telesa s linear change konkrétneho vectora, ktorý je na teleso pevne pripojený.

---

## 7. Prečo sa tu objavuje cross product

Cross product nie je v tomto vzťahu náhodný.

Vector:

**omega x r**

má direction perpendicular na omega aj r.

To presne potrebujeme. Ak sa point pohybuje po kružnici okolo rotation axis, jeho instantaneous velocity musí byť tangentná ku kružnici. Tangentný smer je perpendicular na radius r aj na rotation axis omega.

Magnitude cross product je:

**||omega x r|| = ||omega|| ||r|| sin alpha**

kde alpha je angle medzi omega a r.

Tento výraz tiež presne zodpovedá fyzike rotation.

Ak je r perpendicular na rotation axis, potom alpha = 90° a:

**sin 90° = 1**

takže point má maximálnu linear speed:

**||rdot|| = ||omega|| ||r||**

Čím ďalej je point od osi, tým rýchlejšie sa pohybuje.

Ak však r leží priamo pozdĺž rotation axis, potom alpha = 0° a:

**sin 0° = 0**

takže:

**rdot = 0**

To tiež dáva fyzický zmysel. Bod ležiaci priamo na osi rotation sa pri čistej rotation neposúva.

Vzťah:

**rdot = omega x r**

teda v jednom jednoduchom výraze zachytáva direction aj magnitude okamžitého pohybu bodu na rotujúcom rigid body.

---

## 8. Konkrétny príklad s rotujúcim kolesom

Predstav si koleso otáčajúce sa okolo z-axis angular speed:

**2 rad/s**

Takže:

**omega = (0, 0, 2)**

Vyberieme point, ktorý sa momentálne nachádza jeden meter v positive x direction od osi:

**r = (1, 0, 0)**

Jeho instantaneous velocity získame:

**rdot = omega x r**

Dosadíme:

**(0, 0, 2) x (1, 0, 0)**

Výsledkom je:

**rdot = (0, 2, 0)**

Point sa teda momentálne pohybuje v positive y direction rýchlosťou 2 m/s.

To zodpovedá geometrickej predstave kruhového motion. Point je práve napravo od center a pri positive rotation okolo z-axis sa pohybuje smerom nahor v x-y plane.

---

## 9. Rovnaké pravidlo platí pre všetky tri axes body frame

Columns rotation matrix sú vectors:

**r1, r2, r3**

Každý z nich je pevne spojený s rigid body. Keď sa teleso otáča s angular velocity omega-s vyjadrenou v space frame, pre každý column platí:

**rdot1 = omega-s x r1**

**rdot2 = omega-s x r2**

**rdot3 = omega-s x r3**

Subscript s pri omega-s znamená, že components angular velocity sú vyjadrené v **space frame {s}**.

Toto je dôležité. Samotná physical angular velocity je tá istá, ale jej coordinates budú v rôznych reference frames rôzne.

Podobne ako pri vectoroch v predchádzajúcej lekcii, vždy potrebujeme vedieť, **v ktorom frame angular velocity reprezentujeme**.

---

## 10. Cross product môžeme zapísať ako matrix multiplication

Pri práci s rotation matrices by bolo nepraktické stále zapisovať cross product pre každý column samostatne. Preto cross product vectora x reprezentujeme pomocou špeciálnej 3 x 3 matrix.

Pre:

**x = (x1, x2, x3)**

definujeme:

\`\`\`
[x] =
|  0  | -x3 |  x2 |
|  x3 |  0  | -x1 |
| -x2 |  x1 |  0  |
\`\`\`

Táto matrix má vlastnosť:

**[x]y = x x y**

pre ľubovoľný vector y.

Hranaté zátvorky teda znamenajú:

> vezmi 3D vector x a vytvor z neho matrix, ktorá pri multiplication s iným vectorom vykoná cross product.

Toto je veľmi praktický trik. Operáciu s cross productom tým prevedieme na obyčajnú matrix multiplication.

---

## 11. Prečo má táto matrix taký zvláštny tvar

Pozrime sa na obyčajný cross product dvoch vectors:

**x = (x1, x2, x3)**

a:

**y = (y1, y2, y3)**

Ich cross product je:

**x x y =**

**(x2 y3 - x3 y2,
x3 y1 - x1 y3,
x1 y2 - x2 y1)**

Teraz vynásobme matrix [x] vectorom y:

\`\`\`
|  0  | -x3 |  x2 |
|  x3 |  0  | -x1 |
| -x2 |  x1 |  0  |
\`\`\`

krát:

**(y1, y2, y3)**

Prvý row dá:

**-x3 y2 + x2 y3**

čo je:

**x2 y3 - x3 y2**

Druhý dá:

**x3 y1 - x1 y3**

a tretí:

**-x2 y1 + x1 y2**

čiže:

**x1 y2 - x2 y1**

Presne dostávame cross product.

Takže:

**[x]y = x x y**

nie je nová operation. Je to iba matrixový zápis toho istého cross productu.

---

## 12. Skew-symmetric matrix

Matrix [x] má zvláštnu vlastnosť. Keď ju transponujeme, dostaneme jej zápornú hodnotu:

**[x]T = -[x]**

Také matrices sa nazývajú **skew-symmetric matrices**.

Všimni si ich štruktúru. Na diagonal sú vždy zeros. Hodnota nad diagonal má oproti zodpovedajúcej hodnote pod diagonal opačné znamienko.

Napríklad ak je:

**x = (1, 2, 3)**

potom:

\`\`\`
[x] =
|  0 | -3 |  2 |
|  3 |  0 | -1 |
| -2 |  1 |  0 |
\`\`\`

Transpose je:

\`\`\`
|  0 |  3 | -2 |
| -3 |  0 |  1 |
|  2 | -1 |  0 |
\`\`\`

čo je presne:

**-[x]**

Každý 3D vector teda môžeme jednoznačne spojiť s jednou 3 x 3 skew-symmetric matrix.

---

## 13. Čo je so(3)

V predchádzajúcej lekcii sme sa stretli s:

**SO(3)**

čo je množina všetkých platných 3D rotation matrices.

Teraz sa objaví veľmi podobné označenie:

**so(3)**

s malým písmenom.

**so(3)** je množina všetkých 3 x 3 skew-symmetric matrices.

Každá matrix v so(3) má tvar:

**[omega]**

pre nejaký 3D vector omega.

Tu je dôležité nezamieňať:

**SO(3)** - orientations, teda rotation matrices

a

**so(3)** - objects spojené s instantaneous angular velocities.

Veľké a malé písmená nie sú kozmetický rozdiel. Označujú dve rôzne, ale úzko prepojené matematické množiny.

Neskôr pri exponential coordinates uvidíme, že práve matrix exponential vytvorí veľmi dôležité spojenie:

**so(3) - SO(3)**

teda z representation angular motion vytvoríme finite rotation.

---

## 14. Z rdot = omega x r dostaneme matrixový zápis

Keďže:

**omega x r = [omega]r**

môžeme základný vzťah prepísať:

**rdot = [omega]r**

Teraz to použijeme pre všetky tri columns rotation matrix.

Máme:

**rdot1 = [omega-s]r1**

**rdot2 = [omega-s]r2**

**rdot3 = [omega-s]r3**

Keď tieto tri equations opäť spojíme do jednej matrix, dostaneme:

**Rdot = [omega-s]R**

Toto je jeden z hlavných výsledkov tejto lekcie.

Na ľavej strane je **Rdot**, teda instantaneous zmena orientation.

Na pravej strane je **[omega-s]**, skew-symmetric matrix vytvorená zo space angular velocity, násobená aktuálnou orientation R.

Vzťah nám teda ukazuje, ako angular velocity vytvára okamžitú zmenu rotation matrix.

---

## 15. Ako z R a Rdot získame angular velocity

Vzťah:

**Rdot = [omega-s]R**

môžeme upraviť tak, aby sme izolovali [omega-s].

Vynásobíme obe strany sprava inverse matrix R-1:

**Rdot R-1 = [omega-s]R R-1**

Keďže:

**R R-1 = I**

dostaneme:

**Rdot R-1 = [omega-s]**

čiže:

**[omega-s] = Rdot R-1**

A pretože pre rotation matrix platí:

**R-1 = RT**

môžeme písať aj:

**[omega-s] = Rdot RT**

Toto je veľmi dôležitý vzťah. Ak poznáme aktuálnu rotation matrix R a jej time derivative Rdot, môžeme z nich vypočítať angular velocity rigid body vyjadrenú v space frame.

---

## 16. Prečo musí byť Rdot R-1 skew-symmetric

Možno sa pýtaš, prečo výsledok:

**Rdot R-1**

naozaj musí mať skew-symmetric tvar.

Vyplýva to priamo z constraint, ktorý rotation matrix vždy spĺňa:

**R RT = I**

Identity matrix sa v čase nemení, takže jej derivative je zero:

**d/dt(I) = 0**

Teraz derivujeme ľavú stranu. Pri product dvoch časovo závislých matrices použijeme product rule:

**Rdot RT + R RdotT = 0**

Všimni si teraz prvý člen:

**Rdot RT**

Jeho transpose je:

**(Rdot RT)T = R RdotT**

Z predchádzajúcej equation však vieme:

**R RdotT = -Rdot RT**

Preto:

**(Rdot RT)T = -Rdot RT**

A to je presne definícia skew-symmetric matrix.

Takže **Rdot RT** nie je náhodou skew-symmetric. Táto vlastnosť priamo vyplýva z toho, že R musí počas celého motion zostať platnou rotation matrix.

---

## 17. Čo tento výsledok znamená geometricky

Toto veľmi pekne nadväzuje na myšlienky z Chapter 2.

Rotation matrix R sa musí vždy nachádzať v **SO(3)**. Nemôže sa meniť ľubovoľným smerom v priestore všetkých 3 x 3 matrices, pretože by potom prestala spĺňať:

**RT R = I**

Jej možná instantaneous zmena je preto obmedzená.

Výraz:

**Rdot R-1**

má vždy skew-symmetric tvar a patrí do **so(3)**.

Intuitívne teda môžeme povedať, že SO(3) opisuje možné orientations, zatiaľ čo so(3) opisuje lokálne directions, ktorými sa z danej orientation môžeme pohybovať.

Je to analogické k tangent-space myšlienke zo sphere v Chapter 2. Sphere samotná nie je flat vector space, ale instantaneous velocities v konkrétnom point ležia v tangent plane.

Podobne SO(3) nie je obyčajný vector space, no instantaneous rotational velocities vieme reprezentovať cez so(3).

---

## 18. Space angular velocity omega-s

Doteraz sme používali:

**omega-s**

Subscript s znamená, že components angular velocity sú vyjadrené v **space frame**.

Predstav si dron, ktorý je naklonený a otáča sa okolo určitej physical axis.

Pozorovateľ stojaci v miestnosti môže túto axis opísať pomocou world x, y a z directions. Tak dostane components:

**omega-s**

Napríklad:

**omega-s = (0, 0, 2)**

znamená rotation 2 rad/s okolo z-axis space frame.

Ale rovnakú physical angular velocity môžeme opísať aj pomocou axes body frame dronu.

Dostaneme inú coordinate representation:

**omega-b**

To vedie k ďalšiemu dôležitému rozdielu.

---

## 19. Body angular velocity omega-b

**omega-b** nepredstavuje inú fyzickú angular velocity.

Teleso má v danom okamihu jednu physical angular velocity. My ju však môžeme vyjadriť pomocou rôznych coordinate frames.

Je to presne rovnaký princíp ako pri vectoroch v Rotation Matrices Part 2.

Ak physical vector v jednom frame vyzerá napríklad:

**(1, 0, 0)**

v inom otočenom frame môže mať úplne iné components.

Podobne angular velocity môže mať space representation:

**omega-s**

a body representation:

**omega-b**

Hlavný rozdiel teda nie je v physical motion, ale v coordinates.

---

## 20. Ako prepočítame omega-s na omega-b

Ak rotation matrix:

**R = Rsb**

opisuje orientation body frame vzhľadom na space frame, potom vieme vectors prevádzať medzi frames.

Z predchádzajúcej lekcie poznáme:

**vs = Rsb vb**

A opačne:

**vb = RsbT vs**

Pre angular velocity platí to isté:

**omega-b = RT omega-s**

Prečo?

Pretože angular velocity je physical vector. Samotná omega sa nemení, iba jej coordinate representation.

RT premieňa coordinates zo space frame do body frame.

Ak chceme opačný smer:

**omega-s = R omega-b**

---

## 21. Konkrétny príklad space vs. body angular velocity

Predstav si dron otočený tak, že jeho body x-axis momentálne smeruje pozdĺž world y-axis.

Dron sa fyzicky otáča okolo svojej body x-axis rýchlosťou:

**2 rad/s**

V body coordinates preto môže byť:

**omega-b = (2, 0, 0)**

Keďže však body x-axis momentálne smeruje pozdĺž world y-axis, tá istá physical rotation bude v space coordinates vyzerať:

**omega-s = (0, 2, 0)**

Motion sa nezmenil.

Zmenil sa iba reference frame, v ktorom angular velocity zapisujeme.

Toto je presne rovnaký rozdiel ako medzi pa a pb pri obyčajnom vector.

---

## 22. Body angular velocity môžeme získať priamo z R

Pre space angular velocity sme získali:

**[omega-s] = Rdot R-1**

Teraz chceme podobný vzťah pre body angular velocity.

Vieme, že:

**omega-b = R-1 omega-s**

Pre skew-symmetric matrices existuje veľmi užitočná property:

**R[omega]RT = [R omega]**

Jej význam je jednoduchý. Ak vector omega otočíme pomocou R, zodpovedajúca skew-symmetric matrix sa transformuje rovnakým geometrickým spôsobom.

Pre body representation nakoniec dostaneme:

**[omega-b] = R-1 Rdot**

Keďže:

**R-1 = RT**

môžeme písať:

**[omega-b] = RT Rdot**

Tak máme dve veľmi dôležité equations:

**[omega-s] = Rdot R-1**

**[omega-b] = R-1 Rdot**

Vyzerajú takmer rovnako, ale poradie matrices je opačné.

A pri matrices na poradí záleží.

---

## 23. Prečo je raz Rdot R-1 a inokedy R-1 Rdot

Tento rozdiel sa ľahko pomýli, preto je dobré pochopiť jeho geometrický význam namiesto memorovania.

Pri **space angular velocity** chceme rotational velocity vyjadrenú vo fixed coordinates. Výsledkom je:

**[omega-s] = Rdot R-1**

Pri **body angular velocity** chceme ten istý physical motion vyjadrený pomocou axes body frame. Preto dostávame:

**[omega-b] = R-1 Rdot**

Je to veľmi podobné fixed-frame a body-frame rotations z predchádzajúcej lekcie. Left a right multiplication nie sú náhodné technické detaily. Odráža sa v nich **reference frame, v ktorom motion opisujeme**.

---

## 24. Property R[omega]RT = [R omega]

Táto property si zaslúži samostatnú pozornosť:

**R[omega]RT = [R omega]**

Na pravej strane máme vector:

**R omega**

čo znamená, že sme coordinates omega otočili pomocou rotation matrix R.

Potom z tohto nového vectora vytvoríme skew-symmetric matrix:

**[R omega]**

Ľavá strana robí ten istý proces priamo na matrix representation angular velocity.

Tento vzťah nám hovorí, že representation pomocou skew-symmetric matrices rešpektuje rotations reference frame. Preto môžeme medzi vector formou omega a matrix formou [omega] bezpečne prechádzať.

---

## 25. Angular velocity vyjadrená v ľubovoľnom frame

Space frame a body frame sú iba dva najčastejšie prípady. V robotike však môžeme mať mnoho ďalších frames: camera frame, gripper frame, sensor frame alebo frame jednotlivého linku.

Ak máme angular velocity vyjadrenú vo frame {d}:

**omega-d**

a chceme ju vyjadriť vo frame {c}, použijeme rotation matrix medzi frames:

**omega-c = Rcd omega-d**

Je to obyčajný **change of reference frame** pre vector.

To je veľmi dôležitá myšlienka: angular velocity sa síce týka rotation, ale **samotná omega sa transformuje ako 3D vector**.

---

## 26. Častá chyba: body angular velocity nie je velocity „videná z rotujúceho pozorovateľa"

Modern Robotics tu používa svoju špecifickú frame convention, ktorú sme spomínali už v úvode Chapter 3.

Keď hovoríme o:

**omega-b**

neznamená to, že analyzujeme fyziku z rotujúceho, non-inertial observera pripevneného k telesu.

omega-b znamená:

> physical angular velocity vyjadrenú pomocou coordinates stationary frame, ktorý je v danom okamihu coincident s body frame.

To je jemný, ale dôležitý rozdiel.

Body subscript teda v tejto kapitole primárne hovorí o **coordinate representation**, nie o tom, že sme prešli do non-inertial dynamics.

---

## 27. Rotation matrix opisuje configuration, angular velocity jej instantaneous zmenu

Teraz môžeme veľmi presne spojiť rotation matrix s angular velocity.

Rotation matrix:

**R ∈ SO(3)**

opisuje orientation.

Skew-symmetric matrix:

**[omega] ∈ so(3)**

opisuje instantaneous angular motion.

Ak poznáme R(t), môžeme vypočítať Rdot a z dvojice R a Rdot získať angular velocity:

**[omega-s] = Rdot RT**

alebo:

**[omega-b] = RT Rdot**

Naopak, ak poznáme angular velocity a aktuálnu orientation, vieme opísať, ako sa rotation matrix instantaneous mení:

**Rdot = [omega-s]R**

alebo ekvivalentne:

**Rdot = R[omega-b]**

Toto je veľmi dôležitý most medzi **configuration** a **velocity**.

---

## 28. Prečo je tento vzťah dôležitý pre robotiku

Predstav si robotické rameno, ktorého end-effector drží kameru. Controller v každom okamihu pozná orientation kamery:

**R(t)**

Ak sa end-effector pohybuje, controller potrebuje vedieť aj angular velocity, aby mohol riadiť motion, stabilizovať kameru alebo plánovať ďalšiu trajectory.

Samotné rozdiely entries rotation matrix medzi dvoma časovými okamihmi nie sú veľmi intuitívne. Angular velocity nám však dá jednoduchý 3D vector s jasným fyzickým významom.

To isté platí pri dronoch. Flight controller potrebuje pracovať s angular velocity okolo jednotlivých axes, pretože práve tá určuje, ako rýchlo sa orientation dronu mení.

Angular velocity je preto praktické spojenie medzi geometrickou reprezentáciou orientation a reálnym motion systému.

---

## 29. Prepojenie s exponential coordinates

Táto lekcia pripravuje pôdu pre ďalšiu tému: **exponential coordinates of rotation**.

Teraz už vieme, že instantaneous angular velocity môžeme reprezentovať skew-symmetric matrix:

**[omega] ∈ so(3)**

a orientation:

**R ∈ SO(3)**

Ďalšia otázka prirodzene znie:

> Ak mám constant angular velocity alebo axis rotation, ako z nej získam konečnú rotation matrix po určitom čase alebo angle?

To bude úloha **matrix exponential**.

V ďalšej lekcii uvidíme, že môžeme začať s axis-angle description:

**omega-hat theta**

vytvoriť skew-symmetric matrix:

**[omega-hat]theta**

a pomocou matrix exponential dostať:

**R = e^[omega-hat]theta**

Tým sa instantaneous motion reprezentované v so(3) prepojí s finite orientation v SO(3).

---

## Rekapitulácia najdôležitejších pojmov

**Angular velocity omega** opisuje instantaneous rotational motion rigid body. Jej direction určuje rotation axis podľa right-hand rule a magnitude určuje angular speed.

**omega = omega-hat theta-dot** spája unit rotation axis omega-hat s rýchlosťou zmeny rotation angle theta-dot.

**rdot = omega x r** opisuje, ako sa mení vector pevne pripojený k rotujúcemu telesu. Výsledný direction je tangentný k jeho kruhovému motion.

**Skew-symmetric matrix [omega]** je matrix representation angular velocity, pre ktorú platí **[omega]r = omega x r**. Má vlastnosť **[omega]T = -[omega]**.

**so(3)** je množina všetkých 3 x 3 skew-symmetric matrices. Úzko súvisí s instantaneous rotational velocities.

**SO(3)** je množina platných 3D rotation matrices a reprezentuje orientations. SO(3) a so(3) teda nie sú to isté.

**Rdot = [omega-s]R** opisuje, ako space angular velocity spôsobuje instantaneous zmenu rotation matrix.

**[omega-s] = Rdot R-1 = Rdot RT** umožňuje z aktuálnej orientation a jej derivative získať angular velocity vyjadrenú v space frame.

**Space angular velocity omega-s** je physical angular velocity vyjadrená pomocou axes space frame.

**Body angular velocity omega-b** je tá istá physical angular velocity vyjadrená pomocou axes body frame.

**omega-b = RT omega-s** je change of reference frame zo space representation do body representation.

**[omega-b] = R-1 Rdot = RT Rdot** dáva matrix representation body angular velocity.

**R[omega]RT = [R omega]** ukazuje, ako sa skew-symmetric representation angular velocity mení pri rotation coordinates.

---

## Čo si z tejto lekcie odniesť

Rotation matrix a angular velocity opisujú dve stránky toho istého rotational motion. Rotation matrix R nám hovorí, **akú orientation teleso práve má**, zatiaľ čo angular velocity omega nám hovorí, **ako sa táto orientation v danom okamihu mení**. Dve telesá preto môžu mať v rovnakom okamihu rovnakú R, ale úplne odlišnú omega.

Angular velocity je 3D vector. Jej direction ukazuje instantaneous rotation axis a magnitude angular speed. Keď sa vector r pevne spojený s telesom otáča, jeho instantaneous change opisuje vzťah **rdot = omega x r**. Keďže columns rotation matrix sú práve takéto vectors, rovnakú myšlienku môžeme aplikovať na celú matrix a dostať **Rdot = [omega-s]R**.

Cross product sme pritom previedli na matrix multiplication pomocou skew-symmetric matrix [omega]. Tým vzniká veľmi dôležité rozlíšenie: **R patrí do SO(3) a reprezentuje orientation, zatiaľ čo [omega] patrí do so(3) a reprezentuje instantaneous angular motion**. Je to rotational verzia rozdielu medzi configuration a velocity, ktorý sme riešili už v Chapter 2.

Napokon musíme vždy sledovať reference frame. Teleso má jednu physical angular velocity, ale môžeme ju zapísať ako **omega-s** v space coordinates alebo **omega-b** v body coordinates. Ide o tú istú rotation, iba opísanú inými axes. Preto platí **omega-b = RT omega-s**. Z rotation matrix a jej derivative potom môžeme získať oba zápisy: **[omega-s] = Rdot RT** a **[omega-b] = RT Rdot**.

Tým sme vytvorili presné spojenie medzi orientation a jej instantaneous velocity. V ďalšej časti už môžeme položiť opačnú otázku: **Ak poznáme rotation axis a množstvo rotation, ako z nich zostrojíme konečnú rotation matrix?** Práve na to budú slúžiť **exponential coordinates of rotation a matrix exponential**.`;
