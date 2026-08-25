// Lekcia 1: Konfigurácia robota, stupne voľnosti a konfiguračný priestor
// Full lesson content - DO NOT SHORTEN

export const course1IntroContent = `# Lekcia 1: Konfigurácia robota, stupne voľnosti a konfiguračný priestor

Kapitola o **Configuration Space** začína otázkou, ktorá na prvý pohľad vyzerá veľmi jednoducho: **Kde sa robot nachádza?** V robotike však odpoveď na túto otázku nie je taká jednoduchá ako povedať, že robot stojí na určitom mieste v miestnosti. Robot sa skladá z viacerých pohyblivých častí a dve robotické ramená môžu mať napríklad koniec ruky na presne rovnakom mieste, ale zvyšok ramena môže byť usporiadaný úplne inak. Ak chceme robot presne matematicky opísať, potrebujeme preto zachytiť stav celého mechanizmu.

Práve na to slúžia tri základné pojmy tejto kapitoly: **configuration**, **degrees of freedom** a **configuration space**. Sú základom pre ďalšie témy robotiky, pretože bez nich by sme nemohli presne opisovať polohu robota, plánovať jeho pohyb, určovať, ktoré polohy dokáže dosiahnuť, ani neskôr počítať jeho rýchlosti.

---

## 01. Robot ako mechanický systém

Robot môže mať veľmi komplikovaný vzhľad, ale z mechanického hľadiska ho môžeme rozložiť na niekoľko základných stavebných prvkov. Najdôležitejšie z nich sú **links**, teda články, a **joints**, teda kĺby.

**Link** je pevná mechanická časť robota. Pri priemyselnom robotickom ramene sú linkmi napríklad jednotlivé pevné segmenty medzi kĺbmi. Pri robotickej nohe nimi môžu byť časti pripomínajúce stehno alebo predkolenie. Link nemusí mať tvar jednoduchej tyče — môže ísť o pomerne komplikovanú konštrukciu. Podstatné je, že ho pri matematickom modelovaní považujeme za jeden pevný celok.

V Modern Robotics sa linky modelujú ako **rigid bodies — tuhé telesá**. Tuhé teleso je idealizované teleso, ktorého tvar sa počas pohybu nemení. Ak na jednom linku vyberieme dva ľubovoľné body (A) a (B), ich polohy vo svete sa pri pohybe robota môžu meniť, ale vzdialenosť medzi nimi zostáva rovnaká:

$$d(A,B) = \\text{konštanta}$$

Predstav si kovovú tyč dlhú 30 cm. Môžeš ju presunúť doprava, zdvihnúť, otočiť alebo prevrátiť, ale ak ju považujeme za dokonale tuhé teleso, jej dva konce zostávajú stále 30 cm od seba. Mení sa teda **poloha telesa v priestore**, nie jeho vnútorná geometria.

V skutočnom svete samozrejme dokonale tuhé telesá neexistujú. Kov sa môže veľmi mierne ohýbať, plast deformovať a jednotlivé súčiastky majú vôľu. Pre veľké množstvo robotických úloh sú však tieto deformácie natoľko malé, že ich môžeme zanedbať. Model tuhého telesa nám potom výrazne zjednoduší matematiku bez toho, aby sme stratili informácie dôležité pre danú úlohu.

Jednotlivé linky robota sú spojené pomocou **joints — kĺbov**. Kĺb určuje, aký relatívny pohyb je medzi dvoma linkmi dovolený. Niektoré kĺby umožňujú otáčanie, iné posúvanie a existujú aj kĺby umožňujúce viacero druhov pohybu. Neskôr si jednotlivé typy rozoberieme presne, ale už teraz je dôležité pochopiť základný princíp: **link je pevná časť a joint určuje, ako sa môže jeden link pohybovať vzhľadom na druhý**.

Pohyb však nevznikne iba tým, že mechanizmus určitý pohyb umožňuje. Potrebujeme niečo, čo vytvorí potrebnú silu alebo krútiaci moment. Túto úlohu majú **actuators — pohony alebo akčné členy**. Typickým actuatorom je elektrický motor. Motor môže vytvárať **torque**, teda krútiaci moment, ktorým otáča kĺbom, alebo môže mechanizmus vytvárať lineárnu silu potrebnú na posun.

Je preto užitočné od začiatku odlišovať dve veci. **Joint určuje, aký pohyb je mechanicky možný. Actuator vytvára silu alebo moment potrebný na uskutočnenie pohybu.** Tieto pojmy nie sú synonymá.

Na niektorom z linkov, často na poslednom článku robotického ramena, býva pripevnený **end-effector**. Je to časť robota, ktorá priamo vykonáva požadovanú úlohu. End-effectorom môže byť gripper na uchopenie predmetov, zváracia hlavica, skrutkovač, chirurgický nástroj, kamera, prísavka alebo striekacia tryska.

Robotické rameno si teda môžeme v základnom modeli predstaviť približne ako reťaz:

$$\\text{ground} \\rightarrow \\text{joint} \\rightarrow \\text{link} \\rightarrow \\text{joint} \\rightarrow \\text{link} \\rightarrow \\cdots \\rightarrow \\text{end-effector}$$

Toto zjednodušenie je veľmi dôležité. Namiesto toho, aby sme robot vnímali ako tisíce skrutiek, káblov, krytov a elektronických súčiastok, pre mechanickú analýzu ho môžeme chápať ako **systém tuhých telies spojených kĺbmi**.

---

## 02. Čo znamená konfigurácia robota

Keď už máme mechanický model robota, môžeme sa vrátiť k otázke: **Kde robot je?**

Pri jednoduchom objekte by sme možno odpovedali jeho súradnicami. Pri robotovi to však často nestačí. Predstav si robotické rameno s niekoľkými kĺbmi. Jeho gripper môže byť na určitom mieste nad stolom, ale lakeť robota môže smerovať nahor alebo nadol. V oboch prípadoch môže byť gripper na rovnakom mieste, hoci celý robot má inú polohu.

Potrebujeme preto pojem, ktorý opisuje celý mechanický stav robota. Týmto pojmom je **configuration — konfigurácia**.

Formálne je konfigurácia definovaná ako:

> **úplná špecifikácia polohy každého bodu robota.**

Táto definícia je presnejšia, než sa na prvý pohľad zdá. Nehovorí iba o polohe end-effectora. Nehovorí iba o polohe stredu robota. Hovorí o stave **celého robota**.

Keby sme túto definíciu interpretovali úplne doslovne, mohlo by sa zdať, že musíme poznať súradnice obrovského množstva bodov. Ak by sme napríklad modelovali kovový link v trojrozmernom priestore, mohli by sme sa pokúsiť zapísať súradnice každého jeho bodu. To by však bolo úplne nepraktické.

Práve tu využijeme predpoklad, že link je **rigid body**. Pretože poznáme jeho tvar a vzdialenosti medzi jeho bodmi sa nemenia, jeho body sa nemôžu pohybovať nezávisle. Ak dostatočne presne určíme polohu a orientáciu celého rigidného telesa, poloha všetkých jeho bodov je už jednoznačne daná.

To je jedna z najdôležitejších myšlienok tejto kapitoly:

**Kompletná konfigurácia môže opisovať polohu obrovského množstva bodov, ale na jej reprezentáciu často potrebujeme iba niekoľko nezávislých čísel.**

Ak sa napríklad otočia dvere okolo pántu, každý bod na dverách zmení svoju polohu. Napriek tomu nepotrebujeme sledovať každý bod zvlášť. Ak poznáme rozmery dverí, polohu pántu a uhol otvorenia, vieme určiť polohu všetkých ich bodov.

Práve hľadanie minimálneho počtu takýchto čísel nás privedie k pojmu **degrees of freedom**.

---

## 03. Najjednoduchší príklad konfigurácie: dvere

![Konfigurácia dverí, bodu v rovine a mince na stole](/book/ch2/fig2-1.png)

Predstav si obyčajné dvere pripevnené k stene pomocou pántu. Dvere sa nemôžu ľubovoľne pohybovať po miestnosti. Nemôžeme ich bez odpojenia od pántov posunúť o meter doprava, zdvihnúť k stropu alebo otočiť okolo ľubovoľnej osi.

Pánt obmedzuje ich pohyb tak, že zostáva iba jedna nezávislá možnosť: **rotácia okolo osi pántu**.

Na opis konfigurácie dverí preto stačí jeden uhol:

$$\\theta$$

Ak poznáme θ, vieme, ako veľmi sú dvere otvorené. Pretože poznáme aj ich tvar a umiestnenie pántu, z tejto jednej hodnoty môžeme odvodiť polohu každého bodu dverí.

Môžeme teda zapísať:

$$q = \\theta$$

kde symbol q budeme používať pre konfiguráciu systému.

Napríklad hodnoty

$$\\theta = 0°, \\quad \\theta = 30°, \\quad \\theta = 90°$$

predstavujú tri rôzne konfigurácie tých istých dverí.

Všimni si podstatnú vec: dvere sú fyzický objekt existujúci v trojrozmernom svete, ale na opis ich konfigurácie potrebujeme iba **jedno číslo**. Počet parametrov konfigurácie preto nie je automaticky rovnaký ako počet rozmerov fyzického priestoru, v ktorom sa objekt nachádza. Rozhodujúce je, **koľkými nezávislými spôsobmi sa systém môže pohybovať vzhľadom na svoje obmedzenia**.

---

## 04. Bod pohybujúci sa v rovine

Teraz si predstav bod, ktorý sa môže voľne pohybovať po rovnej ploche. Na rozdiel od dverí nie je pripútaný k jednému pántu. Môže meniť svoju polohu v dvoch nezávislých smeroch.

Jeho konfiguráciu môžeme opísať dvojicou súradníc:

$$q = (x, y)$$

Súradnica x určuje jeho polohu v jednom smere a y v druhom. Ak poznáme obe hodnoty, poloha bodu v rovine je úplne určená.

Dôležité je, že x a y sú **nezávislé**. Ak zmeníme x, nemusíme automaticky zmeniť y. Bod sa môže posunúť horizontálne bez vertikálneho pohybu alebo vertikálne bez horizontálneho pohybu.

Preto potrebujeme dve nezávislé čísla.

Pri samotnom geometrickom bode nemusíme riešiť orientáciu. Bod nemá prednú alebo zadnú stranu a jeho otočenie nemení jeho geometrický stav. To sa však zmení, keď bod nahradíme telesom.

---

## 05. Prečo pri telese nestačí iba jeho poloha

Predstav si mincu položenú lícom nahor na stole. Najskôr vyberieme jeden konkrétny bod mince, napríklad jej stred. Polohu tohto bodu môžeme opísať pomocou:

$$(x, y)$$

Mohlo by sa zdať, že tým poznáme konfiguráciu mince. Nie je to však pravda.

Polož dve rovnaké mince tak, aby ich stredy boli na presne rovnakom mieste. Jednu nechaj otočenú tak, že Lincoln na americkej minci „pozerá" smerom nahor, a druhú otoč o 90°. Obe mince majú rovnaké (x, y), ale očividne nie sú v rovnakej konfigurácii.

Chýba nám totiž informácia o **orientation — orientácii**.

Preto konfiguráciu mince zapíšeme:

$$q = (x, y, \\theta)$$

kde x a y opisujú polohu zvoleného bodu a θ opisuje natočenie mince.

Tento príklad ukazuje veľmi dôležité rozlíšenie medzi **position** a **configuration**. Poloha hovorí, kde sa určitý bod nachádza. Konfigurácia musí obsahovať všetky informácie potrebné na úplné určenie stavu telesa.

Pre robotiku je to zásadné. End-effector robotického ramena môže byť na správnom mieste, ale môže byť otočený nesprávnym smerom. Ak robot drží skrutkovač, nestačí dostať jeho hrot na správnu súradnicu. Skrutkovač musí mať aj správnu orientáciu vzhľadom na skrutku.

Preto budeme v robotike veľmi často pracovať súčasne s **position** aj **orientation**.

---

## 06. Degrees of Freedom – stupne voľnosti

Teraz máme všetko potrebné na zavedenie jedného z najdôležitejších pojmov celej robotiky: **degree of freedom**, skrátene **DOF**, po slovensky **stupeň voľnosti**.

Formálna definícia hovorí:

> **Počet stupňov voľnosti systému je najmenší počet reálnych súradníc potrebných na úplné opísanie jeho konfigurácie.**

Slovo **najmenší** je v tejto definícii zásadné. Nezaujíma nás, koľko čísel dokážeme pri opisovaní systému vymyslieť. Zaujíma nás minimálny počet **nezávislých** hodnôt, ktoré potrebujeme.

Pri dverách potrebujeme iba:

$$q = \\theta$$

Preto majú dvere jeden stupeň voľnosti: **1 DOF**.

Pri bode v rovine potrebujeme:

$$q = (x, y)$$

takže má: **2 DOF**.

Pri minci na stole potrebujeme:

$$q = (x, y, \\theta)$$

a preto má: **3 DOF**.

Intuitívne môžeme DOF chápať ako počet **nezávislých spôsobov, ktorými môžeme meniť konfiguráciu systému**. Minca sa môže v rovine nezávisle posúvať v dvoch smeroch a otáčať. Preto má tri stupne voľnosti.

Treba si však dávať pozor na príliš jednoduché pravidlo typu „jeden druh pohybu = jeden DOF". Presnejšia definícia je vždy založená na počte nezávislých reálnych parametrov potrebných na opis konfigurácie. Neskôr sa stretneme s mechanizmami, pri ktorých jednoduché vizuálne počítanie pohybov nestačí.

---

## 07. Prečo počet súradníc nemusí byť počet DOF

Toto je veľmi dôležitý bod, pretože na ňom bude postavená nasledujúca časť kapitoly.

Predstav si, že bod sa môže pohybovať iba po kružnici s polomerom r. Jeho polohu stále môžeme zapísať dvoma súradnicami:

$$(x, y)$$

Má teda dva stupne voľnosti?

Nie.

Súradnice totiž nemôžeme voliť nezávisle. Musia vždy spĺňať rovnicu kružnice:

$$x^2 + y^2 = r^2$$

Ak zvolíme x, hodnota y už nemôže byť úplne ľubovoľná. Obe premenné sú navzájom previazané **constraintom — obmedzením**.

Rovnaký bod môžeme oveľa úspornejšie opísať jediným uhlom:

$$\\theta$$

Potom:

$$x = r \\cos\\theta$$
$$y = r \\sin\\theta$$

Na určenie konfigurácie teda v skutočnosti stačí jeden nezávislý parameter. Bod pohybujúci sa po kružnici má preto: **1 DOF**, hoci sme jeho polohu pôvodne reprezentovali dvoma číslami (x, y).

To nám ukazuje rozdiel medzi **počtom čísel použitých v reprezentácii** a **skutočným počtom stupňov voľnosti systému**.

Tento rozdiel bude v Modern Robotics veľmi dôležitý. Neskôr napríklad budeme orientáciu rigidného telesa reprezentovať pomocou **rotation matrix**, ktorá obsahuje deväť čísel. To však neznamená, že orientácia telesa má deväť DOF. Týchto deväť čísel musí spĺňať určité constraints a v skutočnosti reprezentuje iba tri nezávislé rotačné stupne voľnosti.

Práve preto je definícia DOF založená na **minimálnom počte nezávislých parametrov**, nie jednoducho na počte hodnôt, ktoré máme zapísané v nejakej tabuľke alebo matici.

---

## 08. Constraints odoberajú voľnosť

Predchádzajúci príklad nám ukazuje všeobecnú myšlienku, ktorá sa bude opakovať v celej kapitole.

Ak by bod mohol byť kdekoľvek v rovine, mal by dve nezávislé súradnice:

$$(x, y)$$

a teda dva DOF.

Ak mu však prikážeme:

$$x^2 + y^2 = r^2$$

už nemôže byť kdekoľvek. Musí zostať na kružnici.

Pridali sme **constraint**, ktorý zmenšil množinu dovolených konfigurácií.

Podobný princíp platí pri robotoch. Voľný rigidný objekt môže mať veľa možností pohybu. Keď ho však pripojíme k ďalšiemu telesu pomocou kĺbu, kĺb niektoré pohyby zakáže.

Dvere bez pántov by sme mohli zobrať a voľne premiestňovať v priestore. Po pripevnení k stene pomocou pántov už väčšina týchto pohybov nie je možná. Pánt vytvoril mechanické constraints a ponechal iba rotáciu okolo svojej osi.

Túto myšlienku neskôr zapíšeme veľmi dôležitým pravidlom:

$$\\text{DOF} = \\text{počet premenných} - \\text{počet nezávislých constraints}$$

Zatiaľ ho nemusíš používať na výpočty. Dôležité je pochopiť jeho význam: **každé nezávislé obmedzenie môže systému odobrať určitú voľnosť**.

V ďalšej časti kapitoly presne týmto spôsobom odvodíme, prečo má rigidné teleso pohybujúce sa v rovine tri DOF a rigidné teleso voľne sa pohybujúce v trojrozmernom priestore šesť DOF.

---

## 09. Spojité a diskrétne informácie nie sú to isté

Vráťme sa ešte raz k minci na stole. Jej konfiguráciu sme opísali ako:

$$q = (x, y, \\theta)$$

Predpokladali sme pritom, že minca leží napríklad hlavou nahor. Teraz však dovolíme, aby mohla ležať buď **heads up**, alebo **tails up**.

Na úplné určenie jej stavu teraz potrebujeme vedieť:

$$x, \\quad y, \\quad \\theta, \\quad \\text{heads/tails}$$

Mohlo by sa zdať, že sme pridali štvrtý stupeň voľnosti. Nie je to však tak.

Prvé tri hodnoty sa môžu meniť **spojito**. Súradnica x môže byť napríklad 1, 1.1, 1.11, 1.111 a ľubovoľná ďalšia reálna hodnota v povolenom rozsahu. Podobne sa môže spojito meniť y a uhol θ.

Informácia heads/tails je však iného typu. Má iba dve oddelené možnosti:

\$\${\\text{heads}, \\text{tails}}\$\$

Ide o **discrete variable — diskrétnu premennú**.

Definícia DOF v tejto kapitole počíta minimálny počet **real-valued coordinates**, teda reálnych spojitých parametrov potrebných na reprezentáciu konfigurácie. Diskrétna voľba medzi dvoma oddelenými stavmi preto nepridáva ďalší DOF.

Minca má stále: **3 DOF**.

Jej priestor možných konfigurácií však môže mať viac oddelených častí — jednu zodpovedajúcu heads up a druhú tails up. To je prvý malý náznak toho, že pri configuration space nás nebude zaujímať iba jeho dimenzia, ale neskôr aj jeho **tvar a topológia**.

---

## 10. Configuration Space – priestor všetkých možných stavov robota

Doteraz sme hovorili o jednej konkrétnej konfigurácii. Robot sa však môže nachádzať v mnohých rôznych konfiguráciách.

Množinu **všetkých možných konfigurácií robota** nazývame:

**Configuration Space** alebo skrátene **C-space**.

Toto je ústredný pojem celej kapitoly.

Najdôležitejšia predstava je nasledujúca:

> **Jedna konfigurácia robota je jeden bod v jeho configuration space.**

Robot samotný môže byť veľký mechanický systém s množstvom článkov. V C-space však celý jeho stav reprezentujeme jediným bodom.

Ak má robot konfiguráciu:

$$q = (q_1, q_2, \\ldots, q_n)$$

potom konkrétne hodnoty všetkých q_i určujú jeden bod v C-space.

Keď robot pohne kĺbmi, hodnoty q_i sa zmenia. Bod reprezentujúci konfiguráciu sa preto presunie na iné miesto v C-space.

To vedie k veľmi silnej abstrakcii:

**Fyzický pohyb celého robota môžeme matematicky chápať ako pohyb jedného bodu cez jeho configuration space.**

Táto myšlienka bude neskôr základom motion planningu. Namiesto otázky „ako má každý článok robota prejsť okolo prekážky?" môžeme problém transformovať na otázku „akú cestu má bod reprezentujúci konfiguráciu robota prejsť cez C-space?"

---

## 11. C-space dverí

Vráťme sa k dverám. Ich konfiguráciu určuje jediný parameter:

$$q = \\theta$$

Ak by sa teoreticky mohli otáčať o celý kruh, možné hodnoty uhla by prechádzali od 0 do 2π.

Každá hodnota θ predstavuje inú konfiguráciu dverí. Všetky možné hodnoty spolu tvoria ich C-space.

V reálnom svete však stena alebo mechanický doraz pravdepodobne obmedzí rozsah pohybu. Dvere sa môžu napríklad otvárať iba medzi:

$$0° \\leq \\theta \\leq 120°$$

Potom ich C-space tvorí práve tento povolený rozsah uhlov.

Pretože na identifikáciu bodu v tomto C-space potrebujeme iba jedno číslo, priestor je **jednorozmerný**.

Dvere teda majú 1 DOF a ich C-space má 1 dimension.

---

## 12. C-space bodu v rovine

Bod pohybujúci sa voľne v rovine má konfiguráciu:

$$q = (x, y)$$

Každá dvojica (x, y) predstavuje jednu konfiguráciu. Ak pohyb nie je nijako obmedzený, všetky možné dvojice vytvoria celú dvojrozmernú rovinu.

Preto je jeho C-space dvojrozmerný:

$$\\dim(\\mathcal{C}) = 2$$

A systém má 2 DOF.

Tu už vidíme základný vzťah medzi stupňami voľnosti a configuration space:

$$\\text{number of DOF} = \\text{dimension of C-space}$$

Toto nie sú dve nezávislé vlastnosti. Počet stupňov voľnosti **je práve dimenzia konfiguračného priestoru**.

---

## 13. C-space mince na stole

Pri minci potrebujeme:

$$q = (x, y, \\theta)$$

Prvé dve súradnice určujú polohu mince na stole a tretia jej orientáciu.

Preto má minca 3 DOF a jej C-space je trojrozmerný.

Tu si však treba dať pozor na jednu vec. Hoci používame tri parametre, C-space mince nie je úplne rovnaký ako obyčajný trojrozmerný priestor R³.

Dôvodom je uhol θ.

Ak mincu otočíme o 360°, dostaneme rovnakú orientáciu ako pri 0°.

Takže θ = 0 a θ = 2π nepredstavujú dve rôzne orientácie. Predstavujú ten istý stav.

Uhlová súradnica sa teda **wraps around — cyklicky uzatvára**.

Práve toto je jeden z dôvodov, prečo bude neskôr dôležité skúmať nielen dimenziu C-space, ale aj jeho **topológiu**, teda jeho základný tvar.

Pre mincu na nekonečnej rovine budeme neskôr jej C-space zapisovať ako:

$$\\mathbb{R}^2 \\times S^1$$

kde R² reprezentuje polohu (x, y) a S¹ reprezentuje kruhový priestor orientácie θ.

Toto zatiaľ nemusíš vedieť matematicky používať. Dôležitá je intuícia: **uhol nie je obyčajná nekonečná číselná os, pretože po jednej celej otáčke sa vrátime do rovnakej orientácie.**

---

## 14. Dimenzia C-space a počet DOF

Teraz môžeme spojiť všetky predchádzajúce myšlienky.

Ak na opis konfigurácie potrebujeme minimálne n nezávislých reálnych parametrov, potom robot má n DOF. A priestor všetkých jeho konfigurácií má dimenziu n.

Teda:

$$\\text{DOF} = \\dim(\\mathcal{C})$$

Ak má robot jeden DOF, jeho configuration space je jednorozmerný. Ak má dva DOF, je dvojrozmerný. Ak má šesť DOF, jeho C-space je šesťrozmerný.

To neznamená, že šesťrozmerný priestor musíme vedieť fyzicky predstaviť. Naše oči a mozog sú zvyknuté na tri priestorové rozmery, ale matematika bez problémov pracuje s vektormi obsahujúcimi šesť, sedem alebo sto súradníc.

Napríklad robot so šiestimi nezávislými kĺbovými uhlami môže mať konfiguráciu:

$$q = (\\theta_1, \\theta_2, \\theta_3, \\theta_4, \\theta_5, \\theta_6)$$

Jedna konkrétna šestica hodnôt predstavuje jeden bod v šesťrozmernom C-space.

Ak robot zmení kĺby z q_A na q_B, matematicky môžeme jeho pohyb interpretovať ako trajektóriu medzi dvoma bodmi v tomto šesťrozmernom priestore.

---

## 15. Fyzický priestor a configuration space nie sú to isté

Toto rozlíšenie je veľmi dôležité.

Robot existuje vo fyzickom trojrozmernom svete. Jeho **configuration space však nemusí byť trojrozmerný**.

Dvere existujú v 3D svete, ale ich C-space môže byť jednorozmerný.

Mobilný robot pohybujúci sa po podlahe môže existovať v 3D miestnosti, ale ak zostáva na podlahe a jeho konfiguráciu určujeme pomocou (x, y, θ), má trojrozmerný C-space.

Robotické rameno so siedmimi nezávislými rotačnými kĺbmi môže fyzicky existovať v tom istom 3D priestore, ale jeho configuration space môže byť sedemrozmerný.

Preto si tieto dva priestory nesmieme zamieňať:

$$\\text{physical space} \\neq \\text{configuration space}$$

Fyzický priestor opisuje, kde sa nachádzajú fyzické objekty.

Configuration space opisuje **všetky možné stavy celého mechanického systému**.

---

## 16. Poloha end-effectora nie je konfigurácia celého robota

Veľmi častá chyba pri prvom kontakte s robotikou je predstava, že ak poznáme polohu end-effectora, poznáme konfiguráciu robota.

Vo všeobecnosti to neplatí.

Predstav si ľudskú ruku. Polož dlaň na konkrétny bod stola. Bez toho, aby si výrazne zmenila polohu dlane, môžeš v určitom rozsahu meniť polohu lakťa a ramena. Rovnaká poloha dlane teda môže zodpovedať viacerým konfiguráciám celej ruky.

Podobne robotické rameno môže dostať gripper na rovnaké miesto pomocou rôznych nastavení kĺbov.

Napríklad dve konfigurácie q_A = (θ₁, θ₂) a q_B = (θ₁', θ₂') môžu v niektorých mechanizmoch umiestniť koniec robota do rovnakého bodu.

Preto:

$$\\text{end-effector position} \\neq \\text{robot configuration}$$

Konfigurácia opisuje celý robot. Poloha end-effectora opisuje iba určitý aspekt jeho výsledného stavu.

Tento rozdiel nás neskôr privedie k pojmom **task space** a **workspace**.

---

## 17. Prečo je configuration space v robotike taký užitočný

Configuration space nie je iba abstraktná matematická definícia. Je to spôsob, ako transformovať komplikovaný fyzický problém do formy, s ktorou sa dá matematicky pracovať.

Predstav si robotické rameno pohybujúce sa medzi prekážkami. Vo fyzickom priestore musíme sledovať veľa vecí naraz: jeden link môže naraziť do stola, druhý do steny, gripper do objektu a jednotlivé časti robota sa pritom všetky pohybujú súčasne.

V C-space však celý robot reprezentujeme jediným bodom q.

Počiatočná konfigurácia je q_start, cieľová konfigurácia q_goal.

Pohyb robota potom môžeme chápať ako hľadanie trajektórie q(t) spájajúcej tieto konfigurácie.

Nie všetky body C-space musia byť povolené. Niektoré konfigurácie môžu viesť ku kolízii so stenou, iné môžu porušovať limity kĺbov a ďalšie môžu byť mechanicky nemožné. Motion planning sa potom dá formulovať ako hľadanie cesty cez povolenú časť C-space.

To je jedna z najsilnejších myšlienok modernej robotiky:

**Namiesto plánovania pohybu mnohých fyzických častí môžeme plánovať pohyb jedného abstraktného bodu v configuration space.**

---

## 18. Čo presne znamená zápis q

V robotike sa konfigurácia často označuje symbolom q.

Ak má systém n stupňov voľnosti, môžeme ju všeobecne zapísať ako:

$$q = (q_1, q_2, \\ldots, q_n)$$

Jednotlivé q_i sú **configuration coordinates — konfiguračné súradnice**.

Nemusia všetky predstavovať rovnaký typ veličiny. Jedna môže byť vzdialenosť, druhá uhol, tretia poloha a podobne.

Pri minci: q = (x, y, θ).
Pri jednoduchých dverách: q = θ.
Pri dvojkĺbovom rotačnom ramene: q = (θ₁, θ₂).

Keď sa robot pohybuje, konfigurácia sa mení v čase, takže môžeme písať q(t). To znamená „konfigurácia robota v čase t".

Neskôr budeme derivovať konfiguráciu podľa času a dostaneme q̇(t), čo bude súvisieť s **rýchlosťou konfigurácie**. Preto je veľmi dôležité už teraz chápať, čo samotné q znamená.

---

## 19. Najdôležitejší mentálny model celej lekcie

Celú prvú časť Chapter 2 si môžeš spojiť do jedného reťazca.

Máme fyzického robota vytvoreného z **links + joints**.

V určitom okamihu sa všetky jeho časti nachádzajú v konkrétnom usporiadaní. Toto usporiadanie nazývame **configuration q**.

Na úplné určenie konfigurácie potrebujeme určitý minimálny počet nezávislých reálnych parametrov. Tento počet nazývame **degrees of freedom**.

Ak zozbierame všetky konfigurácie, ktoré môže robot nadobudnúť, dostaneme **configuration space C**.

Každá konfigurácia q je jeden bod v C.

A platí:

$$\\dim(\\mathcal{C}) = \\text{DOF}$$

Keď sa robot pohybuje, jeho konfigurácia sa mení: q(t), čo môžeme chápať ako pohyb bodu cez C-space.

Toto je základný jazyk, ktorým Modern Robotics začne odteraz opisovať robotické mechanizmy.

---

## Zhrnutie lekcie

Robot je z mechanického pohľadu sústava **rigidných linkov spojených joints**. Kĺby určujú, aké relatívne pohyby sú medzi linkmi možné, zatiaľ čo actuators vytvárajú sily alebo krútiace momenty potrebné na ich pohyb. Časť robota, ktorá vykonáva samotnú úlohu, nazývame end-effector.

**Konfigurácia** je úplný opis polohy všetkých bodov robota. Pretože linky modelujeme ako rigid bodies, nemusíme zapisovať polohu každého bodu samostatne. Vďaka pevným geometrickým vzťahom medzi bodmi často stačí malý počet nezávislých parametrov.

Najmenší počet nezávislých reálnych parametrov potrebných na úplné určenie konfigurácie nazývame **degrees of freedom — DOF**. Dvere na pánte majú 1 DOF, bod voľne sa pohybujúci v rovine 2 DOF a rigidná minca ležiaca na stole 3 DOF, pretože potrebuje dve súradnice polohy a jednu súradnicu orientácie.

Počet čísel použitých v nejakej reprezentácii nemusí byť rovnaký ako počet DOF. Ak medzi premennými existujú **constraints**, nemôžeme ich voliť nezávisle. Bod na kružnici môžeme napríklad reprezentovať dvoma súradnicami (x, y), ale constraint x² + y² = r² znamená, že systém má v skutočnosti iba jeden stupeň voľnosti.

Množinu všetkých možných konfigurácií nazývame **configuration space alebo C-space**. Jedna konkrétna konfigurácia robota predstavuje jeden bod v tomto priestore a jeho dimenzia sa rovná počtu stupňov voľnosti:

$$\\text{DOF} = \\dim(\\mathcal{C})$$

Keď sa robot pohybuje, jeho konfigurácia q(t) opisuje trajektóriu v C-space. Táto abstrakcia je základom veľkej časti robotiky, pretože umožňuje previesť komplikovaný pohyb celého mechanizmu na matematický problém pohybu jedného bodu v konfiguračnom priestore.

V ďalšej časti už na tomto základe môžeme presne odvodiť, **prečo planar rigid body má 3 DOF a spatial rigid body 6 DOF**. Tam sa prvýkrát naplno použije princíp:

$$\\text{DOF} = \\text{variables} - \\text{independent constraints}$$

a na bodoch A, B a C si ukážeme, prečo pevné vzdialenosti vo vnútri rigidného telesa postupne odoberajú zdanlivé stupne voľnosti.`;
