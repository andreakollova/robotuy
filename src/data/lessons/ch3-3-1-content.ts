// Chapter 3.3.1 – Homogeneous Transformation Matrices
// Full lesson content - DO NOT SHORTEN

export const ch331Content = `# Modern Robotics – Chapter 3.3.1

# Homogeneous Transformation Matrices

Doteraz sme sa pri pohybe tuhého telesa sústredili najmä na jeho **orientáciu**. Naučili sme sa používať rotation matrix R, pomocou ktorej vieme opísať, ako je jedno teleso alebo súradnicový systém natočený vzhľadom na iný. V reálnom robotickom systéme však samotná orientácia nestačí. Robotické rameno, kamera, gripper alebo mobilný robot sa môže nielen otáčať, ale aj meniť svoju polohu v priestore.

Predstav si robotický gripper nad stolom. Môže smerovať presne správnym smerom, ale ak sa nachádza pol metra vedľa predmetu, ktorý má uchopiť, jeho orientácia nám veľmi nepomôže. Na úplný opis jeho configuration potrebujeme vedieť dve veci naraz: **kde sa nachádza a ako je natočený**.

Práve preto teraz spojíme rotation matrix R a position vector p do jednej spoločnej reprezentácie. Výsledkom bude **homogeneous transformation matrix**, označovaná T. Táto jedna matica nám umožní opisovať celú configuration tuhého telesa, meniť súradnice medzi reference frames a skladať viac pohybov za sebou.

---

## 1. Prečo už samotná rotation matrix nestačí

Predstav si na stole dve rovnaké knihy. Obe sú natočené úplne rovnako: ich horné hrany smerujú tým istým smerom a ich bočné hrany sú navzájom rovnobežné. Z pohľadu orientation teda majú rovnakú rotation matrix R.

Jedna kniha však leží na ľavej strane stola a druhá na pravej.

Rotation matrix tento rozdiel nevidí. Opisuje totiž iba **natočenie**, nie **polohu**.

Ak chceme opísať úplnú configuration knihy, potrebujeme k R pridať position vector p. Ten určuje, kde sa nachádza origin súradnicového systému pripevneného ku knihe vzhľadom na origin nášho pevného systému.

Máme teda dve časti:

**R - ako je teleso natočené**

a

**p - kde sa teleso nachádza**

Pri rigid body v 3D priestore má R tri rotačné DOF a p tri translačné DOF. Spolu teda opisujú všetkých:

**3 + 3 = 6 DOF**

spatial rigid body.

Doteraz sme tieto dve informácie mohli zapisovať ako dvojicu:

**(R, p)**

Teraz ich spojíme do jednej matice.

---

## 2. Homogeneous transformation matrix spája polohu a orientáciu

Úplnú configuration jedného reference frame vzhľadom na druhý budeme reprezentovať maticou:

$$T =$$
$$[ R  p ]$$
$$[ 0 0 0  1 ]$$

Presnejšie ide o 4 x 4 maticu. Jej horná ľavá časť je 3 x 3 rotation matrix R a napravo od nej sa nachádza 3 x 1 position vector p. Posledný riadok je vždy:

**0 0 0 1**

Ak si to rozpíšeme úplne:

$$[ r11  r12  r13  p1 ]$$
$$[ r21  r22  r23  p2 ]$$
$$[ r31  r32  r33  p3 ]$$
$$[ 0  0  0  1 ]$$

Horných deväť čísel patrí rotation matrix R. Tri čísla p1, p2 a p3 určujú position.

Na prvý pohľad môže pôsobiť zvláštne, že na opis telesa so 6 DOF používame až šestnásť čísel. Nie všetkých šestnásť však môžeme voliť nezávisle. Posledný riadok je pevne daný a rotation matrix R musí spĺňať svoje vlastné podmienky, napríklad RT R = I a det(R) = 1.

Ide teda opäť o **implicit representation**. Používame viac čísel než je skutočný počet DOF, pretože takýto zápis výrazne zjednodušuje ďalšie výpočty.

---

## 3. Čo jednotlivé časti T fyzicky znamenajú

Predstav si robotické rameno stojace na stole. K jeho základni pripevníme pevný reference frame {s} a ku gripperu frame {b}.

Rotation matrix R nám povie:

**„Ako sú osi grippera natočené vzhľadom na osi základne robota?"**

Position vector p nám povie:

**„Kde sa nachádza origin frame grippera vzhľadom na origin základne?"**

Homogeneous transformation matrix T obsahuje obe odpovede naraz.

Ak teda poznáme:

**Tsb**

čítame to ako configuration frame {b} vzhľadom na frame {s}.

Prvý subscript s označuje frame, **v ktorom výsledok vyjadrujeme**, a druhý b označuje frame, **ktorého configuration opisujeme**.

Túto logiku sme už videli pri rotation matrices. Rsb opisovalo orientation {b} vzhľadom na {s}. Teraz iba pridávame aj position.

![Three reference frames in space with a point v described in different coordinates](/book/ch3/fig3-14.png)

Preto:

**Tsb =**

$$[ Rsb  psb ]$$
$$[ 0 0 0  1 ]$$

opisuje celú configuration {b} vzhľadom na {s}.

---

## 4. Prečo používame práve 4 x 4 maticu

Mohli by sme si položiť veľmi rozumnú otázku: prečo vôbec potrebujeme 4 x 4 maticu? Prečo jednoducho nepoužívame R a p oddelene?

Dôvodom je, že rotation a translation sa správajú matematicky odlišne.

Rotation vectora môžeme zapísať:

**x' = Rx**

To je obyčajné matrix multiplication.

Ak však chceme vector zároveň posunúť, dostaneme:

**x' = Rx + p**

Najprv ho otočíme pomocou R a potom k výsledku pripočítame translation p. Už teda nejde iba o jedno matrix multiplication.

To je nepraktické najmä v robotike, kde často skladáme veľa transformations za sebou. Napríklad potrebujeme prejsť z kamery do grippera, z grippera do robotického ramena a z ramena do základne robota. Keby sme museli pri každom kroku osobitne sledovať rotations a translations, zápis by sa rýchlo skomplikoval.

Homogeneous coordinates nám umožnia rotation aj translation vložiť do jednej matrix operácie.

---

## 5. Homogeneous coordinates - prečo k bodu pridávame číslo 1

Bežný point v 3D priestore môžeme zapísať:

**x = (x1, x2, x3)**

Pri homogeneous coordinates k nemu pridáme ešte jednu component:

**xh = (x1, x2, x3, 1)**

Fyzický priestor sa tým nestáva štvorrozmerným. Štvrtá component je matematická pomôcka, ktorá nám umožní zahrnúť translation do matrix multiplication.

Teraz použijeme:

**T xh**

čiže:

$$[ R  p ]$$
$$[ 0 0 0  1 ]$$

krát:

$$[ x ]$$
$$[ 1 ]$$

Výsledkom je:

$$[ Rx + p ]$$
$$[ 1 ]$$

Horná časť teda presne vytvorí:

**Rx + p**

Najprv sa point otočí pomocou R a potom sa posunie pomocou p.

Posledná jednotka zabezpečí, že translation vector p sa do výsledku skutočne pripočíta. Bez tejto dodatočnej component by sme translation nedokázali zapísať ako súčasť obyčajného matrix multiplication.

To je hlavný dôvod, prečo homogeneous transformation matrix používa rozmer 4 x 4.

---

## 6. Jednoduchý fyzický príklad

Predstav si malý robot na podlahe. Na jeho prednej strane je bod vzdialený jeden meter od stredu robota v smere jeho vlastnej x-axis.

V coordinates robota má tento point:

**xb = (1, 0, 0)**

Robot je však v miestnosti otočený o 90° okolo z-axis. Jeho vlastná x-axis preto smeruje pozdĺž world y-axis. Zároveň sa stred robota nachádza na position:

**p = (2, 3, 0)**

vzhľadom na world frame.

Najprv rotation prevedie:

**(1, 0, 0)**

na:

**(0, 1, 0)**

Potom pridáme position robota:

**(0, 1, 0) + (2, 3, 0)**

a dostaneme:

**(2, 4, 0)**

To znamená, že point nachádzajúci sa jeden meter pred robotom má vo world coordinates position:

**(2, 4, 0)**

Presne túto dvojicu operácií vykonáva transformation:

**xs = Rsb xb + psb**

A pomocou homogeneous coordinates ju môžeme zapísať jednou matrix multiplication:

**xs,h = Tsb xb,h**

---

## 7. Homogeneous transformation matrix patrí do SE(3)

Pri rotations sme zaviedli množinu:

**SO(3)**

ktorá obsahuje všetky platné 3D rotation matrices.

Keď k rotation pridáme translation, dostávame množinu:

**SE(3)**

čiže **Special Euclidean Group v 3D**.

Každá matrix:

$$T =$$
$$[ R  p ]$$
$$[ 0 0 0  1 ]$$

kde:

**R ∈ SO(3)**

a p je ľubovoľný 3D position vector, patrí do:

**SE(3)**.

Fyzicky teda môžeme SE(3) chápať ako **priestor všetkých možných configurations spatial rigid body**. Každý jeho prvok opisuje jednu konkrétnu kombináciu position a orientation.

Rigid body má 6 DOF, takže SE(3) je 6-dimensional configuration space, hoci jeho prvky zapisujeme pomocou 4 x 4 matrices.

---

## 8. Planárny prípad SE(2)

Rovnaká myšlienka funguje aj v rovine.

Planar rigid body má tri DOF: dve translations x a y a jednu rotation θ. Jeho rotation matrix má rozmer 2 x 2 a position vector má dve components.

Homogeneous transformation potom vyzerá:

$$T =$$
$$[ R  p ]$$
$$[ 0 0  1 ]$$

čo je 3 x 3 matrix.

Takéto transformations patria do:

**SE(2)**.

Predstav si robotický vysávač jazdiaci po podlahe. Jeho configuration môžeme opísať pomocou x, y a θ. Homogeneous transformation matrix v SE(2) obsahuje presne tie isté informácie, iba v matrix forme vhodnej na skladanie transformations.

Rozdiel je teda jednoduchý:

**SE(2)** používame pre rigid-body motion v rovine,

zatiaľ čo:

**SE(3)** používame pre rigid-body motion v trojrozmernom priestore.

---

## 9. Transformation nemení tvar rigid body

Homogeneous transformation môže point otočiť a posunúť, ale nesmie teleso natiahnuť, stlačiť alebo zdeformovať.

Predstav si kovový trojuholník. Ak na všetky jeho points použijeme rovnakú transformation T, celý trojuholník sa môže presunúť na inú position a môže sa natočiť. Dĺžky jeho strán sa však nezmenia a nezmenia sa ani angles medzi nimi.

Preto sa takáto transformation nazýva **rigid-body transformation** alebo **isometry**.

Ak boli dva points pred transformation vzdialené 20 cm, po transformation budú stále vzdialené 20 cm.

Dôvod je v tom, že rotation matrix R zachováva lengths a angles a translation p posunie všetky points o rovnakú hodnotu. Translation teda nemení vzájomné vzdialenosti medzi points.

To presne zodpovedá predstave rigid body: teleso sa pohybuje, ale nemení svoj tvar.

---

## 10. Inverse transformation - ako sa vrátime opačným smerom

Predstav si, že poznáme:

**Tsb**

a teda vieme previesť coordinates z body frame {b} do space frame {s}.

Máme napríklad point zapísaný ako xb a pomocou transformation získame:

**xs = Rsb xb + psb**

Teraz však chceme urobiť opačný problém. Poznáme coordinates pointu vo frame {s} a chceme zistiť jeho coordinates vo frame {b}.

Potrebujeme inverse transformation:

**Tbs = Tsb-1**

Odvodíme si ju postupne, aby bolo jasné, odkiaľ jej tvar pochádza.

Začneme:

**xs = Rsb xb + psb**

Najprv od oboch strán odčítame psb:

**xs - psb = Rsb xb**

Teraz chceme odstrániť Rsb. Keďže ide o rotation matrix:

**Rsb-1 = RsbT**

Vynásobíme teda obe strany zľava RsbT:

**xb = RsbT(xs - psb)**

Roznásobíme:

**xb = RsbT xs - RsbT psb**

A z toho už vidíme inverse transformation:

$$Tsb-1 =$$
$$[ RsbT  -RsbT psb ]$$
$$[ 0 0 0  1 ]$$

Toto je veľmi dôležitý vzorec.

---

## 11. Prečo inverse translation nie je jednoducho -p

Začiatočník môže prirodzene očakávať, že ak pôvodná transformation obsahuje translation p, inverse bude obsahovať jednoducho -p.

To však vo všeobecnosti neplatí.

Správny člen je:

**-RT p**

Prečo?

Predstav si, že sa najprv otočíš o 90° a potom spravíš krok dopredu. Ak sa chceš vrátiť presne späť, nestačí povedať „urob krok dozadu" vo world coordinates. Direction tvojho kroku závisí od toho, ako si bol otočený.

Translation p bola vyjadrená v jednom reference frame. Keď vytvárame inverse transformation, potrebujeme túto translation vyjadriť v opačnom frame. Preto ju najprv transformujeme pomocou RT a až potom zmeníme znamienko.

Výraz:

**-RT p**

teda nie je náhodná komplikácia. Je dôsledkom toho, že rotation a translation sú navzájom prepojené cez reference frames.

---

## 12. Skladanie transformations

Jednou z najväčších výhod homogeneous transformation matrices je, že ich môžeme jednoducho násobiť.

Predstav si tri frames:

**{a}, {b}, {c}**

Poznáme configuration {b} vzhľadom na {a}:

**Tab**

a configuration {c} vzhľadom na {b}:

**Tbc**

Chceme zistiť configuration {c} priamo vzhľadom na {a}.

Použijeme:

**Tac = Tab Tbc**

Toto je presne rovnaká logika, akú sme používali pri rotation matrices.

Subscripts si môžeme intuitívne čítať ako reťaz:

**a <- b <- c**

Prostredné b sa „spojí" a zostane:

**a <- c**

preto:

**Tab Tbc = Tac**

Nie je to formálne algebraické rušenie písmen, ale veľmi užitočná pomôcka na kontrolu správneho poradia transformations.

---

## 13. Prečo pri skladaní vzniká R1 p2 + p1

Rozpíšme si dve transformations:

$$T1 =$$
$$[ R1  p1 ]$$
$$[ 0  1 ]$$

a:

$$T2 =$$
$$[ R2  p2 ]$$
$$[ 0  1 ]$$

Ich súčin je:

$$T1 T2 =$$
$$[ R1 R2  R1 p2 + p1 ]$$
$$[ 0  1 ]$$

Rotation časť:

**R1 R2**

už poznáme z predchádzajúcich lekcií. Orientations sa skladajú násobením rotation matrices.

Zaujímavejšia je position:

**R1 p2 + p1**

Prečo jednoducho nesčítame p1 + p2?

Pretože p2 je vyjadrené v coordinates druhého frame. Predtým, než ho môžeme pripočítať k p1, musíme ho vyjadriť v rovnakom reference frame.

A presne to robí:

**R1 p2**

Najprv teda rotation R1 prevedie p2 do správneho frame a až potom môžeme pridať p1.

---

## 14. Príklad s robotickým ramenom

Predstav si robotické rameno. Frame {s} je na základni robota, frame {b} je na konci ramena a frame {c} je na kamere pripevnenej ku gripperu.

Poznáme:

**Tsb**

teda configuration grippera vzhľadom na základňu.

Zároveň poznáme:

**Tbc**

teda configuration kamery vzhľadom na gripper.

Chceme zistiť, kde sa kamera nachádza a ako je natočená vzhľadom na základňu robota.

Použijeme:

**Tsc = Tsb Tbc**

Toto je v robotike úplne bežná situácia. Kamera síce „pozná" points vo svojom vlastnom coordinate frame, ale robotické rameno potrebuje vedieť, kde sa tieto points nachádzajú vzhľadom na jeho základňu.

Homogeneous transformations nám umožňujú prechádzať cez celý reťazec frames bez toho, aby sme zvlášť riešili každú rotation a translation.

---

## 15. Transformation môže mať tri rôzne významy

Rovnako ako pri rotation matrices, aj pri homogeneous transformation matrices musíme rozlišovať tri veľmi podobné použitia. Matematicky môžu vyzerať takmer rovnako, ale fyzicky odpovedajú na rozdielne otázky.

Prvé použitie je **opis configuration**. Matrix Tab nám povie, kde sa frame {b} nachádza a ako je natočený vzhľadom na {a}.

Druhé použitie je **change of reference frame**. Máme jeden fyzický point, ale chceme zmeniť coordinates, ktorými ho opisujeme. Point sa fyzicky nepohol; iba sme zmenili reference frame.

Tretie použitie je **rigid-body displacement**. V tomto prípade sa point alebo celé teleso skutočne fyzicky presunie a otočí.

Tento rozdiel je veľmi dôležitý. Rovnaká matematická operácia môže predstavovať buď zmenu opisu toho istého objektu, alebo skutočný pohyb objektu.

---

## 16. Change of reference frame - point sa fyzicky nehýbe

Predstav si hrnček na stole. Jeho position môžeme merať vzhľadom na ľavý roh stola alebo vzhľadom na kameru stojacu nad stolom.

Hrnček zostáva celý čas na tom istom mieste. Menia sa iba čísla, ktorými jeho position opisujeme.

Ak máme coordinates pointu vo frame {b} a chceme ich vyjadriť vo frame {a}, použijeme:

**xa = Tab xb**

v homogeneous coordinates.

Transformation teda neznamená, že sme point fyzicky presunuli. Iba sme jeho rovnakú physical position zapísali pomocou iných coordinate axes a iného originu.

Toto je **passive interpretation** transformation.

---

## 17. Rigid-body displacement - objekt sa skutočne pohne

Teraz si predstav, že hrnček naozaj vezmeš do ruky, otočíš ho a položíš na iné miesto.

Tentoraz nemeníme iba coordinate description. Mení sa samotná physical configuration hrnčeka.

Rovnaká transformation T môže matematicky opísať aj tento motion.

Ak point na telese mal pred motion position x, po transformation bude:

**x' = Rx + p**

Rotation R ho otočí a translation p ho následne posunie.

Toto je **active interpretation** transformation.

Rozdiel medzi active a passive interpretation teda nie je nevyhnutne v samotnej matrix. Rozdiel je v otázke, ktorú riešime:

**„Zmenili sme reference frame?"**

alebo:

**„Zmenili sme physical configuration telesa?"**

---

## 18. Pre-multiplication a post-multiplication

Teraz sa dostávame k jednej z častí, pri ktorej sa poradie matrices veľmi ľahko pomýli.

Predstav si rigid body s aktuálnou configuration:

**Tsb**

a chceme naň aplikovať ďalšiu transformation T.

Môžeme ju aplikovať zľava:

**T Tsb**

alebo sprava:

**Tsb T**

Tieto dva výsledky vo všeobecnosti nie sú rovnaké.

Dôvodom je, že matrix multiplication nie je commutative:

**T1 T2 ≠ T2 T1**

Poradie zároveň určuje, **v ktorom frame interpretujeme novú transformation**.

---

## 19. Pre-multiplication - motion vyjadrený vo fixed frame

Ak transformation aplikujeme zľava:

**T Tsb**

interpretujeme ju vzhľadom na fixed, teda space frame.

Predstav si robotický gripper a world axes nakreslené na podlahe. Ak mu prikážeš:

**„Posuň sa o jeden meter v smere world x-axis."**

direction zostáva viazaný na world frame bez ohľadu na to, kam je gripper práve otočený.

Podobne rotation vykonaná týmto spôsobom používa axis vyjadrenú vo fixed frame.

Pre-multiplication teda prirodzene zodpovedá transformation opísanej pomocou fixed coordinates.

---

## 20. Post-multiplication - motion vyjadrený v body frame

Ak transformation aplikujeme sprava:

**Tsb T**

nový motion interpretujeme vzhľadom na body frame.

Predstav si mobilného robota. Robot je otočený smerom na severovýchod a dostane príkaz:

**„Choď jeden meter dopredu."**

„Dopredu" tu neznamená world x-axis. Znamená smer jeho vlastnej x-axis.

Ak sa robot predtým otočí, zmení sa aj direction, ktorým preňho znamená „dopredu".

To je presne myšlienka post-multiplication. Transformation je viazaná na body coordinates.

Tento rozdiel je veľmi dôležitý pri robotických ramenách. Príkaz „otoč gripper okolo world z-axis" a príkaz „otoč gripper okolo jeho vlastnej z-axis" môžu viesť k úplne iným výsledkom.

![Fixed-frame vs body-frame transformation: pre-multiplication and post-multiplication](/book/ch3/fig3-15.png)

---

## 21. Prečo na poradí rotation a translation záleží

Predstav si knihu položenú na stole.

V prvom prípade ju najprv otočíš o 90° okolo originu a potom ju posunieš doprava.

V druhom prípade ju najprv posunieš doprava a až potom ju otočíš o 90° okolo originu.

Výsledná position knihy nebude rovnaká.

Práve preto transformations vo všeobecnosti nekomutujú:

**T1 T2 ≠ T2 T1**

Pri rotations sme túto vlastnosť už videli v SO(3). V SE(3) je ešte výraznejšia, pretože teraz sa navzájom ovplyvňujú rotations aj translations.

Poradie transformations teda nie je iba detail zápisu. Určuje fyzický motion.

---

## 22. Subscript cancellation ako praktická kontrola

Pri väčšom množstve frames sa človek veľmi ľahko stratí. Preto je užitočné sledovať subscripts.

Ak máme:

**Tab**

a:

**Tbc**

potom môžeme vytvoriť:

**Tab Tbc = Tac**

Pre point alebo vector funguje podobná logika:

**Tab xb = xa**

Subscripts nám teda hovoria, odkiaľ kam coordinates transformujeme.

Predstav si ich ako cestu:

**c - b - a**

Ak sa transformations správne napoja, výsledkom je cesta:

**c - a**

Ak sa vnútorné subscripts nezhodujú, je to silný signál, že sme matrices zoradili nesprávne.

---

## 23. Komplexnejší príklad: kamera, robot a objekt

Predstav si mobilného robota s robotickým ramenom. Na ramene je kamera a pred robotom leží objekt.

Máme niekoľko reference frames. Frame {a} môže byť spojený s okolím, {d} s mobilnou platformou, {b} s ramenom, {c} s kamerou a {e} s objektom.

V praxi môžeme poznať transformations medzi niektorými susednými frames, ale potrebujeme vypočítať configuration objektu vzhľadom na kameru.

Podklad používa vzťah:

**Tce = (Tad Tdb Tbc)-1 Tad Tde**

Na prvý pohľad môže tento výraz vyzerať komplikovane. Rozoberme si však jeho logiku.

Súčin:

**Tad Tdb Tbc**

vytvára transformation z frame {c} do frame {a}. Podľa subscriptov:

**a <- d <- b <- c**

takže výsledkom je:

**Tac**

Jeho inverse:

**(Tad Tdb Tbc)-1**

je preto:

**Tca**

a umožňuje nám prejsť z frame {a} do frame {c}.

Druhá časť:

**Tad Tde**

vytvára:

**Tae**

pretože:

**a <- d <- e**

Teraz ich spojíme:

**Tca Tae = Tce**

Výsledok teda opisuje configuration objektu {e} vzhľadom na kameru {c}.

Takéto výpočty sú presne dôvodom, prečo sú homogeneous transformations v robotike také dôležité. V reálnom systéme máme množstvo frames - základňa, jednotlivé links, gripper, kamera, nástroj, objekt - a potrebujeme medzi nimi systematicky prechádzať.

![Reference frame assignment for a complex robot example with multiple frames](/book/ch3/fig3-16.png)

---

## 24. Prečo je tento zápis taký silný pri robotických ramenách

Predstav si šesťkĺbové robotické rameno. Každý link má svoj coordinate frame. Configuration jedného linku vzhľadom na predchádzajúci môžeme opísať homogeneous transformation matrix.

Ak poznáme transformations:

**T01, T12, T23, T34, T45, T56**

potom configuration posledného linku alebo grippera vzhľadom na základňu získame jednoducho:

**T06 = T01 T12 T23 T34 T45 T56**

Každá matrix nesie rotation aj translation daného kroku.

Takto sa z lokálnych vzťahov medzi susednými links postupne zostaví celá configuration robotického ramena. Toto je jeden zo základných princípov **forward kinematics**.

Homogeneous transformation matrices teda nie sú iba pohodlným zápisom. Sú základným nástrojom, pomocou ktorého dokážeme systematicky sledovať geometriu komplexného robota.

---

## 25. SO(3) a SE(3) - čo majú spoločné a v čom sa líšia

Tieto dve množiny sa veľmi ľahko zamieňajú, pretože spolu úzko súvisia.

**SO(3)** obsahuje iba rotations. Jeden prvok R nám povie, ako je frame natočený, ale nepovie nám, kde sa jeho origin nachádza.

**SE(3)** obsahuje celú rigid-body configuration. Jeden prvok T obsahuje rotation R aj translation p.

Môžeme si to predstaviť na drone. Ak poznáme iba R, vieme napríklad, že drone je naklonený dopredu a otočený smerom na sever. Stále však nevieme, či je meter nad zemou alebo sto metrov vysoko.

Ak poznáme T, máme oboje: jeho orientation aj position.

Preto:

**R ∈ SO(3)**

opisuje orientation,

zatiaľ čo:

**T ∈ SE(3)**

opisuje celú spatial configuration.

---

## 26. Prečo má SE(3) šesť DOF, hoci T má šestnásť entries

Táto otázka priamo nadväzuje na configuration space z Chapter 2.

T má 16 entries, ale spatial rigid body má iba 6 DOF.

Ako je to možné?

Rotation časť R má deväť entries, ale iba tri rotačné DOF, pretože jej columns musia byť unit vectors, musia byť navzájom perpendicular a musí platiť správna handedness. Position p obsahuje tri nezávislé numbers. Posledný riadok T je navyše vždy pevne:

**0 0 0 1**

Počet zapísaných numbers teda nie je to isté ako počet DOF.

To je presne rovnaká myšlienka ako pri rotation matrix. Reprezentácia môže používať viac numbers než je dimension configuration space, ak sú tieto numbers navzájom previazané constraints.

SE(3) má preto dimension 6, aj keď jeho prvky zapisujeme 4 x 4 matrices.

---

## 27. Ako táto téma nadväzuje na exponential coordinates

V predchádzajúcej lekcii sme sa naučili, že finite rotation môžeme reprezentovať pomocou exponential coordinates:

**omega-hat θ**

a matrix exponential ich prevedie na:

**R ∈ SO(3)**

Teraz sme rotation rozšírili o translation a dostali:

**T ∈ SE(3)**

To pripravuje pôdu pre veľmi podobnú myšlienku pri celom rigid-body motion.

Namiesto samotnej rotation axis budeme používať **screw axis**. Namiesto čistej angular velocity sa objaví **twist**. A namiesto exponential coordinates rotation omega-hat θ budeme mať exponential coordinates celého rigid-body motion.

Štruktúra bude veľmi podobná tomu, čo už poznáme zo SO(3), iba teraz bude opisovať rotation a translation spoločne.

---

## Rekapitulácia najdôležitejších pojmov

**Homogeneous transformation matrix T** je 4 x 4 matrix, ktorá spája rotation R a position p do jednej reprezentácie. Opisuje celú configuration spatial rigid body alebo vzťah medzi dvoma reference frames.

**Rotation matrix R** je horná ľavá 3 x 3 časť T. Určuje orientation jedného frame vzhľadom na druhý.

**Position vector p** je horná pravá 3 x 1 časť T. Určuje position originu jedného frame vzhľadom na druhý.

**Homogeneous coordinates** - point (x1,x2,x3) rozšírime na (x1,x2,x3,1). Vďaka tomu môžeme rotation aj translation vykonať jednou matrix multiplication.

**SE(3)** je množina všetkých 3D rigid-body transformations. Jeden prvok SE(3) obsahuje rotation aj translation a opisuje 6-DOF spatial configuration.

**SE(2)** je planárna verzia SE(3). Opisuje dve translations a jednu rotation, teda 3 DOF planar rigid body.

**Inverse transformation** - ak Tab prevádza coordinates z {b} do {a}, potom Tab-1 = Tba prevádza opačným smerom. Pre T = (R,p) obsahuje inverse rotation RT a translation -RT p.

**Composition of transformations** - viac transformations môžeme skladať matrix multiplication. Platí napríklad Tab Tbc = Tac.

**Subscript cancellation** je praktický spôsob kontroly poradia transformations. Reťaz a <- b <- c vedie k transformation a <- c.

**Change of reference frame** - meníme coordinates, ktorými opisujeme ten istý fyzický point. Point sa v priestore nepohol.

**Rigid-body displacement** - objekt sa fyzicky otočí a/alebo posunie. Matematicky môže používať rovnakú transformation, ale fyzický význam je iný.

**Pre-multiplication** - transformation aplikovaná zľava sa prirodzene interpretuje vzhľadom na fixed alebo space frame.

**Post-multiplication** - transformation aplikovaná sprava sa prirodzene interpretuje vzhľadom na body frame.

**Isometry** - rigid-body transformation zachováva distances a angles. Teleso sa môže presunúť a otočiť, ale nemení svoj tvar.

---

## Čo si z tejto lekcie odniesť

Rotation matrix R vyriešila iba polovicu problému spatial rigid body. Vedeli sme pomocou nej povedať, **ako je teleso natočené**, ale nie **kde sa nachádza**. Preto sme k R pridali position vector p a obe informácie spojili do jednej homogeneous transformation matrix T.

Hlavný tvar je:

$$T =$$
$$[ R  p ]$$
$$[ 0 0 0  1 ]$$

R opisuje orientation a p position. Posledný riadok spolu s homogeneous coordinates umožňuje, aby sme rotation aj translation zapísali ako jednu matrix multiplication. Point sa potom transformuje podľa známej geometrickej myšlienky:

**x' = Rx + p**

čiže najprv sa otočí a potom posunie.

Veľkou výhodou tohto zápisu je skladanie transformations. Ak poznáme vzťahy medzi viacerými frames, môžeme ich jednoducho reťaziť:

**Tab Tbc = Tac**

Práve preto môžeme napríklad z transformations jednotlivých links vypočítať configuration grippera vzhľadom na základňu robota alebo previesť position objektu z camera frame do robot base frame.

Zároveň je dôležité stále sledovať, **čo transformation fyzicky znamená**. Rovnaká matrix môže opisovať configuration frame, zmenu reference frame alebo skutočný displacement telesa. Rovnako musíme sledovať poradie multiplication. Transformation vykonaná vzhľadom na fixed frame a transformation vykonaná vzhľadom na body frame vo všeobecnosti nevedú k rovnakému výsledku.

Celá kapitola zároveň vytvára prirodzený prechod od **SO(3)** k **SE(3)**. SO(3) opisovalo iba orientations. SE(3) opisuje celé configurations spatial rigid body - tri rotačné a tri translačné DOF. V ďalších častiach sa rovnaká logika, ktorú sme pri rotations spájali s angular velocity, so(3) a exponential coordinates, rozšíri na celý rigid-body motion. Objaví sa **twist**, priestor **se(3)** a **screw motion**, vďaka čomu budeme vedieť opisovať rotation a translation ako jeden spoločný pohyb.`;
