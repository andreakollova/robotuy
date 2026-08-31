// Chapter 3.2.1 – Rotation Matrices (Part 2 of 2)
// Full lesson content - DO NOT SHORTEN

export const ch321p2Content = `# Modern Robotics – Chapter 3.2.1: Rotation Matrices

## Part 2 of 2 – Ako rotation matrix používame v praxi

V prvej časti sme riešili najmä to, čo rotation matrix je a prečo má práve takú štruktúru. Videli sme, že 3D orientation môžeme reprezentovať pomocou troch navzájom kolmých unit axes uložených ako columns matice. Z toho vznikli podmienky RT R = I a det R = 1, ktoré definujú skupinu SO(3).

Teraz sa posunieme k praktickejšej otázke. Keď už rotation matrix R máme, čo s ňou vlastne môžeme robiť?

Tu vzniká jedna z najdôležitejších myšlienok celej kapitoly. Rovnaká rotation matrix sa môže objaviť v troch situáciách, ktoré matematicky vyzerajú veľmi podobne, ale fyzicky znamenajú niečo iné. Môže opisovať orientation jedného frame vzhľadom na druhý, môže nám umožniť prepísať coordinates toho istého objektu do iného reference frame, alebo môže objekt skutočne otočiť.

Práve rozlíšenie týchto troch významov je hlavnou témou tejto časti.

---

## 1. Jeden fyzický priestor môžeme opisovať z rôznych reference frames

Predstav si robotické rameno stojace v miestnosti. Na podlahe máme pevný space frame {s}. Jeho x-axis môže smerovať napríklad doprava, y-axis dopredu a z-axis nahor.

Na gripper robota však môžeme pripevniť ďalší coordinate frame {b}. Keď sa gripper otočí, jeho axes už nemusia smerovať rovnakými smermi ako axes miestnosti. Jeho x-axis môže smerovať dopredu, y-axis doľava a z-axis stále nahor.

Dôležité je, že fyzický priestor sa nezmenil. Máme stále tú istú miestnosť, toho istého robota a tie isté objekty. Zmenil sa iba coordinate system, pomocou ktorého ich opisujeme.

To je podobné, ako keby dvaja ľudia stáli pri stole z rôznych strán. Na stole leží telefón. Jeden človek môže povedať:

„Telefón je odo mňa doprava."

Človek stojaci oproti nemu však môže povedať:

„Telefón je odo mňa doľava."

Telefón sa medzičasom nikam nepohol. Rozdiel vznikol preto, že obaja opisujú ten istý fyzický objekt vzhľadom na inú orientáciu svojho coordinate frame.

V robotike preto nestačí vidieť vector ako trojicu numbers. Musíme vedieť aj to, v ktorom frame sú tieto numbers vyjadrené.

![Three reference frames in the same physical space with point p having different coordinates in each](/book/ch3/fig3-7.png)

---

## 2. Fyzický vector a jeho coordinates nie sú to isté

Predstav si bod p v priestore. Môže to byť napríklad poloha špičky nástroja robota.

Samotný fyzický bod existuje nezávisle od toho, aký coordinate system si zvolíme. Ak však chceme jeho polohu zapísať pomocou numbers, potrebujeme reference frame.

V jednom frame môže mať bod coordinates:

**pa = (1, 1, 0)**

V inom otočenom frame môže mať ten istý bod napríklad:

**pb = (1, -1, 0)**

To neznamená, že existujú dva body. Je to jeden fyzický bod p, iba opísaný dvoma rôznymi spôsobmi.

Preto sa pri vectors v tejto kapitole začnú objavovať subscripts:

**pa**

**pb**

**pc**

Subscript nám hovorí:

„V coordinates ktorého frame je tento vector zapísaný?"

To bude veľmi dôležité. Samotné (1, 1, 0) bez informácie o reference frame môže byť v robotike nejednoznačné.

---

## 3. Prvé použitie rotation matrix: reprezentácia orientation

Začnime najjednoduchším použitím.

Predstav si dva frames {a} a {b}, ktoré majú spoločný origin, ale {b} je oproti {a} otočený.

Chceme odpovedať na otázku:

**Ako je frame {b} orientovaný vzhľadom na frame {a}?**

Na to použijeme rotation matrix:

**Rab**

Notation má presný význam:

prvý subscript a hovorí, v akom frame orientation opisujeme,

druhý subscript b hovorí, ktorý frame opisujeme.

Teda:

**Rab = orientation frame {b} vyjadrená vzhľadom na frame {a}.**

Môžeš si to čítať ako:

„b v a"

Toto je veľmi užitočný spôsob čítania notation.

Napríklad:

**Rsb**

znamená:

orientation body frame {b} vzhľadom na space frame {s}.

Ak má robot na konci ramena gripper, Rsb nám teda hovorí, ako je gripper natočený vzhľadom na svet.

---

## 4. Čo presne sa nachádza v Rab

Z prvej časti už vieme, že columns rotation matrix predstavujú coordinate axes jedného frame vyjadrené v druhom frame. Teraz túto myšlienku spojíme s notation Rab.

V matrix:

**Rab**

sú uložené axes frame {b}, ale ich directions sú zapísané pomocou coordinates frame {a}.

Schematicky:

**Rab = [ x̂b ŷb ẑb ] vyjadrené v {a}**

Prvý column teda odpovedá:

Kam smeruje x-axis frame {b}, keď sa na ňu pozerám pomocou axes frame {a}?

Druhý column robí to isté pre y-axis a tretí pre z-axis.

Predstav si kameru namontovanú na robotovi. Kamera má vlastné axes. Ak poznáme rotation matrix medzi kamerou a robotom, vieme presne povedať, ako sú axes kamery orientované vzhľadom na axes robota.

Rotation matrix teda nie je iba tabuľka numbers. Je to veľmi konkrétny geometrický opis vzájomnej orientation dvoch coordinate frames.

---

## 5. Opačný pohľad na tie isté dva frames

Teraz prichádza veľmi užitočná vlastnosť.

Ak poznáme:

**Rab**

teda orientation {b} vzhľadom na {a}, môžeme sa opýtať na opačnú otázku:

**Ako vyzerá {a} vzhľadom na {b}?**

To zapisujeme:

**Rba**

Keď obrátime smer vzťahu medzi frames, potrebujeme inverse rotation:

**Rba = Rab-1**

Z prvej časti však vieme, že pre rotation matrix platí:

**R-1 = RT**

Preto:

**Rba = RabT**

Toto má veľmi prirodzený fyzický význam.

Predstav si, že stojíš oproti kamarátovi. Najprv opisuješ, ako je on natočený vzhľadom na teba. Potom sa otázka otočí a chceme vedieť, ako si ty natočená vzhľadom na neho.

Ide o tie isté dva frames, ale smer vzťahu sme obrátili. Preto používame inverse transformation.

---

## 6. Druhé použitie rotation matrix: change of reference frame

Teraz sa dostávame k veľmi dôležitému rozdielu.

Rotation matrix nemusí znamenať, že niečo fyzicky otáčame. Môžeme ju použiť iba na to, aby sme ten istý vector opísali v inom coordinate frame.

Predstav si opäť bod p.

Jeho coordinates poznáme vo frame {b}:

**pb**

Chceme však vedieť, aké coordinates bude mať ten istý fyzický bod vo frame {a}.

Ak poznáme orientation {b} vzhľadom na {a}, teda Rab, platí:

**pa = Rab pb**

Čo sa tu fyzicky stalo?

Nič sa nepohlo.

Bod p zostal presne na tom istom mieste. Zmenil sa iba spôsob, akým jeho vector zapisujeme.

To je change of reference frame.

Je to podobné, ako keď tú istú teplotu prepíšeš z °C na °F. Fyzický stav sa nezmenil; zmenila sa jeho reprezentácia. Pri coordinate frames nejde o inú jednotku, ale o inú orientation coordinate axes.

---

## 7. Prečo funguje pa = Rab pb

Pozrime sa na to bez preskakovania krokov.

Predstav si, že vo frame {b} máme:

**pb = (2, 1, 0)**

To znamená, že vector p môžeme geometricky zostaviť ako:

2 x x-axis frame {b} + 1 x y-axis frame {b}

Lenže my chceme vedieť jeho coordinates vo frame {a}.

Rotation matrix Rab obsahuje práve informáciu o tom, ako xb, yb a zb vyzerajú v coordinates frame {a}.

Keď teda vypočítame:

**Rab pb**

matrix multiplication v skutočnosti urobí toto:

vezme príslušné množstvo prvého columnu, príslušné množstvo druhého columnu a príslušné množstvo tretieho columnu a spočíta ich.

Ak:

**pb = (2, 1, 0)**

výsledok je geometricky:

2 x prvý column Rab + 1 x druhý column Rab + 0 x tretí column Rab

A keďže columns predstavujú axes {b} vyjadrené v {a}, výsledkom sú coordinates toho istého vectora vo frame {a}.

Preto vzťah

**pa = Rab pb**

nie je náhodné pravidlo. Priamo vychádza z geometrického významu columns rotation matrix.

---

## 8. Jednoduchý číselný príklad

Predstavme si, že frame {b} je oproti {a} otočený o +90° okolo z-axis.

Potom:

$$Rab =$$
$$[ 0  -1  0 ]$$
$$[ 1  0  0 ]$$
$$[ 0  0  1 ]$$

Vo frame {b} máme vector:

**pb = (1, 0, 0)**

To znamená, že vector smeruje presne pozdĺž +xb.

Ale x-axis frame {b} je po otočení o 90° nasmerovaná pozdĺž +ya.

Preto očakávame:

**pa = (0, 1, 0)**

A skutočne:

**pa = Rab pb**

dá:

**pa = (0, 1, 0)**

Vector sa fyzicky nepohol. Iba sme ho opísali pomocou iných axes.

---

## 9. Subscript cancellation rule

Pri väčšom množstve frames sa veľmi ľahko pomýli poradie matrices. Modern Robotics preto používa praktické pravidlo, ktoré pomáha skontrolovať, či násobenie dáva zmysel.

Predstav si tri frames:

**{a}, {b}, {c}**

Poznáme orientation {b} vzhľadom na {a}:

**Rab**

a orientation {c} vzhľadom na {b}:

**Rbc**

Chceme orientation {c} vzhľadom na {a}.

Platí:

**Rac = Rab Rbc**

Všimni si vnútorné subscripts:

**Rab Rbc**

Máme tam:

b - b

Tieto dva subscripts si môžeme predstaviť ako „zrušené":

a <- b <- c

a zostane:

a <- c

teda:

**Rac**

Toto sa nazýva **subscript cancellation rule**.

Nie je to matematické krátenie ako pri zlomkoch. Je to pomôcka, ktorá odráža logiku transformations medzi frames.

![Three reference frames {a}, {b}, {c} with rotation transformations between them](/book/ch3/fig3-4.png)

---

## 10. Prečo musí byť poradie Rab Rbc práve takéto

Predstav si kameru {c} pripevnenú ku gripperu {b}. Robot stojí v miestnosti reprezentovanej frame {a}.

Poznáme:

**Rbc**

čiže orientation kamery vzhľadom na gripper.

Poznáme tiež:

**Rab**

čiže orientation grippera vzhľadom na miestnosť.

Chceme orientation kamery vzhľadom na miestnosť.

Najprv máme informáciu vyjadrenú cez gripper:

c - b

Potom ju prevedieme z grippera do miestnosti:

b - a

Celá cesta teda vyzerá:

c - b - a

A matematicky:

**Rab Rbc = Rac**

Toto bude neskôr v robotike všade. Robot môže mať frame na base, jednotlivých links, end-effectori, kamere aj objekte. Potom budeme transformations skladať do reťazca.

Preto je správne poradie matrices zásadné.

---

## 11. Rovnaké pravidlo funguje aj pre vectors

Subscript cancellation môžeme použiť aj pri vectoroch.

Ak máme vector:

**pb**

a chceme ho vyjadriť vo frame {a}, použijeme:

**pa = Rab pb**

Opäť si môžeme predstaviť:

**Rab pb**

Vnútorné b sa spoja a výsledkom je:

**pa**

Táto notation nám teda často sama napovie, ktorú rotation matrix potrebujeme.

Ak máš pb a chceš pa, potrebuješ transformation, ktorá vedie:

b - a

čiže:

**Rab**

---

## 12. Tretie použitie rotation matrix: skutočné otočenie vectora

Teraz sa dostávame k situácii, ktorá vyzerá matematicky skoro rovnako, ale fyzicky je úplne iná.

Predstav si šípku položenú na stole. Tentoraz nemeníme coordinate system. Máme stále ten istý frame.

Šípku však fyzicky otočíme.

Pôvodný vector označíme:

**v**

Po rotation dostaneme nový vector:

**v'**

Ak rotation opisuje matrix R, platí:

**v' = Rv**

Na prvý pohľad to vyzerá takmer rovnako ako:

**pa = Rab pb**

Rozdiel však nie je v matrix multiplication. Rozdiel je v tom, čo fyzicky interpretujeme ako zmenu.

Pri change of reference frame:

objekt zostáva rovnaký, meníme coordinate system.

Pri rotation operator:

coordinate system zostáva rovnaký, objekt sa skutočne otočí.

Toto je jeden z najdôležitejších rozdielov v celej téme rotation matrices.

---

## 13. Pasívna a aktívna interpretácia

Tento rozdiel sa niekedy opisuje ako passive vs. active transformation.

Pri passive transformation nemeníme fyzický vector. Meníme iba reference frame, v ktorom ho opisujeme.

Pri active transformation nechávame reference frame na mieste a fyzicky otáčame vector alebo rigid body.

Predstav si šálku s rúčkou smerujúcou doprava.

V passive prípade sa šálky vôbec nedotkneš. Len sa presunieš na inú stranu stola a začneš jej direction opisovať pomocou iných axes.

V active prípade zostávaš stáť na rovnakom mieste, ale šálku fyzicky otočíš.

Numbers môžu byť transformované podobnou matrix operation, ale geometrický príbeh je úplne iný.

![Rigid-body displacement interpreted as a screw motion](/book/ch3/fig3-5.png)

---

## 14. Rotation operator Rot(omega-hat, theta)

Keď chceme zdôrazniť, že matrix používame ako rotation operator, Modern Robotics používa notation:

**R = Rot(omega-hat, theta)**

Symbol omega-hat označuje unit vector určujúci axis of rotation.

Symbol theta označuje angle, o ktorý otáčame.

Napríklad:

**Rot(z-hat, 90°)**

znamená:

otoč o 90° okolo z-axis.

Smer positive rotation určujeme pomocou right-hand rule. Ak palec pravej ruky nasmerujeme pozdĺž positive direction rotation axis, smer zatočených prstov určuje positive rotation.

![Rotation of a frame by angle theta about axis omega-hat](/book/ch3/fig3-8.png)

---

## 15. Rotation okolo x-axis

Predstav si, že otáčame objekt okolo x-axis.

Samotná x-axis sa pri rotation nemení. Preto má matrix tvar:

$$Rot(x-hat, theta) =$$
$$[ 1  0  0 ]$$
$$[ 0  cos theta  -sin theta ]$$
$$[ 0  sin theta  cos theta ]$$

Prečo zostáva v prvom riadku a columne jednotka?

Pretože rotation okolo x-axis nemení x-component. Pohyb prebieha v y-z plane.

Je to podobné ako otáčanie kolesa nasadeného na os. Os zostáva na mieste, zatiaľ čo body okolo nej opisujú kružnice.

---

## 16. Rotation okolo y-axis

Pre rotation okolo y-axis používame:

$$Rot(y-hat, theta) =$$
$$[ cos theta  0  sin theta ]$$
$$[ 0  1  0 ]$$
$$[ -sin theta  0  cos theta ]$$

Tentoraz zostáva nezmenená y-component, pretože práve y-axis je axis of rotation.

Pohyb prebieha v x-z plane.

Predstav si kameru na gimbale, ktorá sa nakláňa hore a dole okolo horizontálnej y-axis. Kamera mení smer v x-z plane, ale samotná rotation axis zostáva zachovaná.

---

## 17. Rotation okolo z-axis

Pre rotation okolo z-axis dostávame:

$$Rot(z-hat, theta) =$$
$$[ cos theta  -sin theta  0 ]$$
$$[ sin theta  cos theta  0 ]$$
$$[ 0  0  1 ]$$

Toto je v podstate planar rotation matrix rozšírená do 3D.

z-component sa nemení a rotation prebieha v x-y plane.

Predstav si človeka stojaceho vzpriamene na mieste. Ak sa otočí doľava alebo doprava bez nakláňania, približne vykonáva rotation okolo vertikálnej z-axis.

---

## 18. Rotation nemusí prebiehať iba okolo coordinate axes

x, y a z sú jednoduché prípady, ale rigid body sa môže otáčať okolo ľubovoľnej axis v priestore.

Môžeme mať napríklad unit vector:

**omega-hat = (omega1, omega2, omega3)**

ktorý smeruje šikmo cez priestor.

Potom:

**Rot(omega-hat, theta)**

predstavuje rotation o theta okolo tejto axis.

To je dôležité napríklad pri robotickom ramene. Joint axis nemusí byť zarovnaná so svetovou x, y alebo z-axis. Môže smerovať ľubovoľne podľa konštrukcie robota.

Preto potrebujeme všeobecný spôsob reprezentácie rotation pomocou axis + angle.

Podklad uvádza aj úplný všeobecný matrix expression pre Rot(omega-hat, theta). Je pomerne rozsiahly, ale jeho význam je jednoduchší než jeho vzhľad: dostane unit direction rotation axis omega-hat a angle theta a vytvorí rotation matrix, ktorá vykoná presne túto rotation. Neskôr sa k tomuto vzťahu vrátime oveľa systematickejšie cez exponential coordinates a Rodriguesovu formulu.

---

## 19. Rovnaké numbers omega-hat nemusia označovať rovnakú fyzickú axis

Tu prichádza ďalší veľmi dôležitý problém reference frames.

Predstav si:

**omega-hat = (0, 0, 1)**

Na prvý pohľad by sme mohli povedať:

„To je z-axis."

Lenže z-axis ktorého frame?

Ak {s} a {b} nie sú aligned, potom:

**zs ≠ zb**

vo fyzickom priestore.

Numerický vector (0,0,1) teda znamená:

„z-axis toho frame, v ktorom sú tieto coordinates vyjadrené."

Ak ho interpretujeme v space frame, dostaneme jednu fyzickú axis. Ak rovnaké numbers interpretujeme v body frame, môžeme dostať úplne inú axis.

Preto musíme pri rotations vedieť nielen o koľko otáčame, ale aj v ktorom frame je rotation axis vyjadrená.

---

## 20. Fixed-frame rotation

Majme body frame {b}, ktorého súčasnú orientation vzhľadom na space frame {s} opisuje:

**Rsb**

Teraz ho chceme otočiť pomocou:

**R = Rot(omega-hat, theta)**

a omega-hat interpretujeme v space frame {s}.

Výsledná orientation bude:

**Rsb' = R Rsb**

Novú rotation teda násobíme zľava.

Tomu hovoríme **premultiplication**.

Fyzicky to znamená, že rotation axis je fixovaná vo svete.

Predstav si dron letiaci v miestnosti. V miestnosti je definovaná pevná vertical z-axis. Ak povieme:

„Otoč dron o 90° okolo z-axis miestnosti,"

rotation axis zostáva rovnaká bez ohľadu na to, ako bol dron predtým natočený.

To je fixed-frame rotation.

---

## 21. Body-frame rotation

Teraz použijeme rovnakú numerical rotation matrix R, ale rotation axis interpretujeme v body frame {b}.

Výsledok je:

**Rsb'' = Rsb R**

Tentoraz násobíme sprava.

Ide o **postmultiplication**.

Fyzicky rotation axis cestuje spolu s telesom.

Predstav si lietadlo. Jeho vlastná x-axis smeruje cez nos lietadla. Keď pilot vykoná roll, lietadlo sa otáča okolo svojej vlastnej longitudinal axis.

Ak je lietadlo už predtým natočené vzhľadom na svet, jeho body x-axis nemusí vôbec smerovať pozdĺž world x-axis.

Preto:

rotation okolo world x-axis

a

rotation okolo body x-axis

môžu byť dve úplne odlišné fyzické rotations.

---

## 22. Prečo sa pri fixed-frame rotation násobí zľava

Vzťah:

**Rsb' = R Rsb**

sa dá pochopiť cez to, čo robíme s axes body frame.

Rsb už opisuje súčasné directions body axes vo world coordinates.

Ak teraz chceme všetky tieto directions otočiť pomocou rotation R vyjadrenej vo world frame, aplikujeme R na každý column Rsb.

Matrix multiplication:

**R Rsb**

presne toto vykoná.

Predstav si, že Rsb obsahuje tri šípky predstavujúce body x, y a z axes. Rotation R vezme každú z nich a fyzicky ju otočí okolo axis definovanej vo fixed frame.

Preto sa R objaví zľava.

---

## 23. Prečo sa pri body-frame rotation násobí sprava

Pri:

**Rsb'' = Rsb R**

je situácia iná.

Rotation R teraz opisujeme pomocou body axes. Nehovoríme teda:

„Otoč okolo world z-axis."

Hovoríme:

„Otoč okolo tvojej vlastnej body z-axis."

Matrix Rsb následne preloží výslednú orientation body axes do space coordinates.

Preto sa body-frame rotation prirodzene skladá ako:

**Rsb R**

Tento rozdiel je mimoriadne dôležitý pri robotických joints, manipulátoroch, dronoch aj mobile robots, pretože príkaz „otoč sa okolo z-axis" nie je úplný, kým nepovieme, z-axis ktorého frame máme na mysli.

---

## 24. Premultiplication a postmultiplication na konkrétnom príklade

Predstav si dron, ktorý je už naklonený tak, že jeho vlastná z-axis smeruje šikmo.

Teraz máme rotation:

**R = Rot(z-hat, 90°)**

Ak vypočítame:

**R Rsb**

z-hat interpretujeme ako z-axis fixed frame. Dron sa teda otočí okolo vertikálnej world axis.

Ak však vypočítame:

**Rsb R**

z-hat interpretujeme ako z-axis body frame. Keďže dron je naklonený, táto axis smeruje šikmo a dron sa otočí okolo nej.

Numericky sme použili tú istú R.

Fyzický výsledok však môže byť úplne iný.

Preto pri matrix multiplication v robotike záleží nielen na matrices, ale aj na poradí a reference frames, ku ktorým sa vzťahujú.

![Pre-multiplication vs post-multiplication: fixed-frame and body-frame rotation](/book/ch3/fig3-9.png)

---

## 25. Prečo sú 3D rotations noncommutative

Teraz môžeme lepšie pochopiť vlastnosť z prvej časti:

**R1 R2 ≠ R2 R1**

vo všeobecnosti.

Nejde iba o abstraktnú vlastnosť matrix multiplication. Má veľmi konkrétny geometrický dôvod.

V 3D môžeme otáčať okolo rôznych axes. Keď vykonáme prvú rotation, orientation telesa sa zmení. Druhá rotation teda môže pôsobiť na teleso, ktoré je už orientované úplne inak.

Predstav si mobilný telefón.

Najprv ho otoč o 90° okolo jednej axis a potom o 90° okolo druhej. Pozri sa, kam smeruje displej.

Vráť telefón do pôvodnej orientation a vykonaj tie isté dve rotations v opačnom poradí.

Vo všeobecnosti skončí displej otočený inak.

Preto:

**R1 R2 ≠ R2 R1**

Poradie rotations je súčasťou pohybu.

---

## 26. Prečo je SO(2) v tomto smere jednoduchšie

Pri planar rotations je situácia špeciálna.

Všetky rotations v rovine prebiehajú okolo tej istej axis kolmej na rovinu. Ak teda najprv otočíme o alpha a potom o beta, výsledok je jednoducho:

**alpha + beta**

Ak poradie obrátime:

**beta + alpha**

a keďže:

**alpha + beta = beta + alpha**

výsledok je rovnaký.

Preto rotations v SO(2) komutujú.

V SO(3) však môžeme otáčať okolo rôznych axes, takže táto jednoduchá vlastnosť vo všeobecnosti neplatí.

---

## 27. Orientation matrix a rotation operator: rovnaká matrix, iná otázka

Toto je miesto, kde sa oplatí spojiť celú lekciu.

Majme jednu numerical matrix R.

Keď ju interpretujeme ako orientation, odpovedá na otázku:

**Ako je jeden frame orientovaný vzhľadom na druhý?**

Keď ju použijeme na change of coordinates, odpovedá:

**Aké coordinates má ten istý vector v inom reference frame?**

Keď ju použijeme ako rotation operator, odpovedá:

**Kam sa vector alebo frame dostane, keď ho fyzicky otočíme?**

Matematický objekt je rovnaký.

Mení sa jeho úloha v konkrétnom probléme.

Toto je dôvod, prečo sa pri rotation matrices nedá pracovať iba mechanickým násobením numbers. Vždy musí byť jasné, čo jednotlivé matrices reprezentujú a v ktorých frames sú quantities vyjadrené.

---

## 28. Typická chyba: change of coordinates nie je motion

Predstav si robotickú kameru, ktorá vidí objekt.

Kamera vypočíta coordinates objektu:

**pc**

Robotický controller však potrebuje coordinates objektu vo frame základne robota:

**ps**

Použijeme príslušnú rotation matrix a prevedieme coordinates.

Objekt sa pritom nepohol ani o milimeter.

Zmenili sme iba jeho mathematical representation.

Ak by sme však zobrali fyzický gripper a pomocou rotation matrix mu prikázali zmeniť orientation, ide o skutočný motion.

Tieto dve operácie môžu matematicky obsahovať podobné multiplication, ale fyzicky riešia úplne iný problém.

---

## 29. Prečo je toto dôležité v skutočnej robotike

Predstav si robotické rameno s kamerou na end-effectori.

Kamera deteguje skrutku a povie:

„Skrutka sa nachádza týmto smerom vzhľadom na môj camera frame."

Robot však svoje joints riadi vzhľadom na base frame. Controller preto potrebuje údaj z kamery transformovať do coordinate systému robota.

Rotation matrices nám umožňujú prepájať tieto rôzne pohľady na ten istý svet.

Zároveň nimi reprezentujeme orientation end-effectora. A keď chceme end-effector otočiť, rotation matrices používame aj ako operators opisujúce samotný motion.

Preto jeden matematický nástroj rieši tri veľmi praktické problémy:

Ako som natočený?

Ako tú istú vec opíšem z iného frame?

Ako ju otočím?

---

## 30. Ako si vybrať správne poradie matrices

Keď vidíš viac rotation matrices, nezačínaj tým, že sa snažíš zapamätať poradie naspamäť. Najprv si povedz, odkiaľ kam potrebujem dostať representation.

Ak chceš prejsť:

{c} - {b} - {a}

potrebuješ:

**Rab Rbc**

a dostaneš:

**Rac**

Subscripts ti umožňujú skontrolovať cestu.

Ak však ide o fyzickú rotation už existujúceho frame Rsb, polož si inú otázku:

**Je rotation axis definovaná vo fixed frame alebo body frame?**

Ak vo fixed frame:

**Rnew = R Rsb**

Ak v body frame:

**Rnew = Rsb R**

Toto rozdelenie je omnoho spoľahlivejšie než slepé memorovanie „left alebo right".

---

## Rekapitulácia najdôležitejších pojmov

**Rab - relative orientation** - Rotation matrix Rab opisuje orientation frame {b} vzhľadom na frame {a}. Môžeme si ju čítať ako „b vyjadrené v a".

**Inverse orientation** - Ak chceme obrátiť smer medzi frames, použijeme inverse rotation. Pre rotation matrices platí Rba = Rab-1 = RabT.

**Change of reference frame** - Ten istý fyzický vector môže mať rôzne coordinates v rôznych frames. Vzťah pa = Rab pb nemení fyzický vector, iba jeho coordinate representation.

**Subscript cancellation rule** - Pri skladaní transformations nám subscripts pomáhajú kontrolovať správne poradie. Napríklad Rab Rbc = Rac.

**Rotation operator** - Matrix R môžeme použiť aj na skutočné otočenie vectora: v' = Rv. V tomto prípade sa nemení reference frame, ale samotný vector.

**Passive transformation** - Fyzický objekt zostáva rovnaký a meníme coordinate frame, pomocou ktorého ho opisujeme.

**Active transformation** - Reference frame zostáva rovnaký a fyzicky otáčame vector alebo rigid body.

**Rot(omega-hat, theta)** - Rotation operator definovaný unit axis omega-hat a rotation angle theta.

**Fixed-frame rotation** - Ak je rotation axis vyjadrená vo fixed frame, novú rotation premultiplikujeme: Rsb' = R Rsb.

**Body-frame rotation** - Ak je rotation axis vyjadrená v body frame, rotation postmultiplikujeme: Rsb'' = Rsb R.

**Premultiplication** - Násobenie novej rotation zľava. V tomto kontexte zodpovedá rotation okolo axis definovanej vo fixed frame.

**Postmultiplication** - Násobenie novej rotation sprava. V tomto kontexte zodpovedá rotation okolo axis definovanej v body frame.

**Noncommutativity** - V 3D vo všeobecnosti platí R1 R2 ≠ R2 R1. Poradie rotations môže zmeniť final orientation.

**SO(2) vs. SO(3)** - Planar rotations v SO(2) komutujú, pretože všetky prebiehajú okolo tej istej axis. Spatial rotations v SO(3) môžu prebiehať okolo rôznych axes, takže poradie je dôležité.

---

## Čo si z tejto lekcie odniesť

Rotation matrix nie je iba spôsob, ako uložiť orientation do deviatich numbers. Je to nástroj, ktorý prepája coordinate frames, representations a samotné rotations. Aby sme s ním vedeli správne pracovať, vždy musíme vedieť, čo jednotlivé frames znamenajú.

Ak máme Rab, opisujeme tým, ako je frame {b} orientovaný vzhľadom na {a}. Ak potom použijeme pa = Rab pb, fyzický vector p sa nikam nepohol. Iba sme jeho coordinates prepísali z frame {b} do frame {a}. Ak však použijeme v' = Rv a R interpretujeme ako rotation operator, reference frame zostáva rovnaký a fyzicky meníme direction vectora.

Keď sa objaví viac frames, veľmi pomáha sledovať subscripts. Vzťah Rab Rbc = Rac môžeme chápať ako cestu c - b - a. Práve toto skladanie transformations bude neskôr základom opisovania celého robotického ramena.

A napokon pri skutočných rotations musíme vedieť, v ktorom frame je definovaná rotation axis. Rotation okolo world z-axis a rotation okolo body z-axis nie sú vo všeobecnosti to isté. Preto fixed-frame rotation zapisujeme R Rsb, zatiaľ čo body-frame rotation zapisujeme Rsb R.

Celá lekcia sa teda dá spojiť jednou myšlienkou: numbers samy osebe nestačia. V robotike musíme vždy vedieť, vzhľadom na ktorý reference frame majú význam. Práve táto schopnosť presne pracovať s frames nám umožní v ďalších častiach prejsť od samotnej orientation k angular velocity, a neskôr k úplnému opisu pohybu rigid body.`;
