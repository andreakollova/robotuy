// Chapter 2.5 – Lekcia 8: Task Space and Workspace
// Full lesson content - DO NOT SHORTEN

export const ch25Content = `# Lekcia 8: Task Space and Workspace

Doteraz sme sa v Chapter 2 pozerali najmä na **configuration space (C-space)**. C-space opisuje robota ako celý mechanický systém. Ak má robotické rameno napríklad sedem rotačných joints, jedna jeho configuration môže byť opísaná siedmimi joint angles:

**θ = (θ1, θ2, θ3, θ4, θ5, θ6, θ7)**

Keď poznáme všetkých sedem hodnôt, vieme určiť, ako je celý robot nastavený.

Pri reálnej práci s robotom nás však veľmi často nezaujíma detailné nastavenie každého jointu.

Predstav si priemyselné rameno, ktoré má uchopiť pohár zo stola. Človek, ktorý zadáva úlohu, pravdepodobne nebude rozmýšľať:

„Prvý joint nastav na 32°, druhý na -15°, tretí na 61°..."

Oveľa prirodzenejšie povie:

**„Dostaň gripper sem."**

Prípadne:

**„Dostaň gripper sem a natoč ho týmto smerom."**

Tým sa na robota začíname pozerať z úplne iného pohľadu.

C-space odpovedá na otázku:

**„Ako je nastavený celý robot?"**

Pri vykonávaní úlohy nás však často viac zaujíma:

**„Kde je nástroj na konci robota a čo tam má robiť?"**

A práve z tohto rozdielu vznikajú dva dôležité pojmy:

**task space**

a

**workspace**.

Tieto pojmy znejú podobne a oba súvisia s end-effectorom, ale neznamenajú to isté. Task space opisuje, **aké veličiny potrebujeme na opis úlohy**, zatiaľ čo workspace opisuje, **ktoré z týchto stavov end-effectora konkrétny robot skutočne dokáže dosiahnuť**.

---

## 01. Prečo vôbec potrebujeme niečo iné než C-space

Predstav si robotické rameno so šiestimi rotačnými joints.

Jeho configuration opisujeme:

**θ1, θ2, θ3, θ4, θ5, θ6**

Takýto opis je veľmi užitočný, pretože presne určuje stav celého mechanizmu. Robot však dostane úlohu:

**„Dotkni sa gripperom bodu na stole."**

Na opis tejto úlohy nepotrebujeme šesť joint angles.

Stačí nám povedať, kde sa požadovaný bod nachádza.

Napríklad:

**x = 40 cm, y = 20 cm, z = 10 cm**

Úloha je teda formulovaná pomocou polohy end-effectora, nie pomocou vnútorného nastavenia robota.

Toto je veľmi dôležitý posun v uvažovaní.

C-space je prirodzený pre opis **robota**.

Task space je prirodzený pre opis **toho, čo má robot vykonať**.

A tieto dva opisy nemusia mať rovnaký počet dimensions ani rovnaké coordinates.

---

## 02. Čo je end-effector

Keď hovoríme o task space a workspace, veľmi často sa sústreďujeme na **end-effector**.

End-effector je časť robota, ktorá priamo vykonáva úlohu.

Môže to byť napríklad:

- gripper, ktorý uchopuje predmet,
- zvárací horák,
- špička pera,
- paint spray nozzle,
- vrták,
- kamera,
- laser pointer.

Predstav si robotické rameno ako ľudskú ruku.

Shoulder, elbow a wrist zodpovedajú rôznym joints a links.

Ale ak je úlohou zobrať pohár, výsledok práce vykonáva hlavne ruka alebo prsty na konci reťazca.

Podobne v robotike často nepotrebujeme pri formulácii úlohy opisovať celý mechanizmus. Stačí nám opísať stav jeho end-effectora.

---

## 03. Čo presne znamená task space

Teraz môžeme zaviesť prvý nový pojem.

**Task space je priestor veličín, pomocou ktorých prirodzene opisujeme úlohu robota.**

Najdôležitejšie slovo v tejto definícii je:

**úloha.**

Task space teda neurčuje automaticky samotný robot.

Najprv sa musíme opýtať:

**„Čo presne potrebujem vedieť, aby som vedela povedať, že robot úlohu splnil?"**

Podľa odpovede vyberieme vhodné coordinates task space.

Ak robot kreslí bod na papier, možno potrebujeme iba position špičky pera:

**x, y**

Ak manipuluje predmetom v priestore, pravdepodobne potrebujeme:

**position + orientation**

Ak drží laser pointer a zaujíma nás iba to, kam lúč smeruje, môže nás zaujímať iba **direction**.

Takže task space nie je jednoducho „priestor okolo robota".

Je to matematický priestor vytvorený z tých veličín, ktoré sú dôležité pre konkrétnu task.

---

## 04. Príklad: robot kreslí na papier

Predstav si robotické rameno, ktoré drží pero a kreslí na papier ležiaci na stole.

Robot môže mať napríklad šesť joints.

Jeho C-space by teda mohol byť šesťdimenzionálny.

Ale čo potrebujeme vedieť na opis kresby?

Ak predpokladáme, že pero zostáva správne priložené k papieru a zaujíma nás iba miesto špičky pera na ploche, potrebujeme dve coordinates:

**x** a **y**

To znamená, že task space má dve dimensions.

Môžeme ho označiť:

**R2**

Čo znamená R2?

Symbol **R** označuje množinu reálnych čísel.

Jedna hodnota x môže byť akékoľvek reálne číslo v určitom rozsahu.

Rovnako y.

Dvojica:

**(x, y)**

preto leží v priestore:

**R2**

čo si môžeme geometricky predstaviť ako rovinu.

Dôležité však je, že R2 tu nevzniklo preto, že robot má dva joints.

Vzniklo preto, že na opis **tejto konkrétnej úlohy** potrebujeme dve nezávislé hodnoty.

Robot môže mať šesť, sedem alebo desať joints a task space kreslenia môže byť stále iba dvojrozmerný.

---

## 05. Task space závisí od úlohy, nie od počtu joints

Toto je jedna z najdôležitejších myšlienok celej lekcie.

Predstav si, že máme stále presne to isté robotické rameno.

Robot nemeníme.

Nepridáme žiadny joint.

Neodstránime žiadny link.

Zmeníme iba jeho úlohu.

Najskôr robot drží pero a kreslí na rovný papier.

Ak nás zaujíma iba poloha špičky:

**task space = R2**

Potom tomu istému robotovi dáme laser pointer.

Teraz nás nemusí zaujímať position samotného laseru, ale iba smer, ktorým lúč ukazuje.

Task space je teda iný.

Nakoniec tomu istému robotovi dáme do grippera súčiastku, ktorú musí presne vložiť do otvoru.

Teraz nás zaujíma:

- kde sa predmet nachádza,
- ako je natočený.

Zrazu potrebujeme bohatší task space.

Robot je stále rovnaký.

Jeho C-space sa nezmenil.

Zmenila sa iba úloha.

Preto sa v Modern Robotics zdôrazňuje, že task space je **driven by the task** — jeho podoba vychádza z toho, čo je pre konkrétnu úlohu podstatné.

---

## 06. Manipulácia s rigid body v 3D priestore

Veľmi častou úlohou robota je manipulácia s predmetom.

Predstav si priemyselné rameno, ktoré drží kovovú súčiastku a musí ju vložiť do stroja.

Nestačí nám vedieť iba:

**„Súčiastka sa nachádza tu."**

Predmet môže byť na správnom mieste, ale otočený nesprávnym smerom.

Ak má napríklad obdĺžnikový diel vojsť do presného otvoru, jeho orientation je rovnako dôležitá ako position.

Rigid body vo voľnom trojrozmernom priestore má:

**3 DOF pre position**

a

**3 DOF pre orientation**

Spolu teda:

**6 DOF**

Position opisujeme pomocou:

**x, y, z**

Orientation potrebujeme opísať ďalšími tromi nezávislými parametrami.

Pre všeobecnú manipulačnú úlohu je preto prirodzené, aby task space opisoval kompletnú configuration end-effectora:

**position + orientation**

Môžeme si predstaviť, že na gripper robota pripevníme malý coordinate frame.

Úloha potom hovorí:

**„Dostaň tento frame na požadované miesto a natoč ho požadovaným spôsobom."**

Toto je veľmi bežný pohľad na task space pri robotických manipulátoroch.

---

## 07. Task space nemusí obsahovať všetky freedoms end-effectora

Tu sa ľahko spraví chybný záver:

**„Ak má rigid end-effector v priestore 6 DOF, task space musí mať vždy 6 DOF."**

Nemusí.

Task space obsahuje iba to, čo je podstatné pre konkrétnu úlohu.

Predstav si paint spray nozzle.

Jej úplná configuration v priestore by zahŕňala:

- tri parametre position,
- tri parametre orientation.

Lenže pri striekaní farby nás môže zaujímať iba:

**kde tryska je**

a

**ktorým smerom strieka.**

Predstav si valcovú trysku.

Ak ju otočíme okolo jej vlastnej osi, ale smer výstreku farby zostane rovnaký, výsledok práce sa nemusí vôbec zmeniť.

Takáto rotácia preto nie je pre task relevantná.

Pre position potrebujeme:

**3 DOF**

Pre smer v priestore:

**2 DOF**

Spolu:

**5 DOF**

Task space preto môže mať tvar:

**R3 x S2**

---

## 08. Čo znamená R3 x S2

Tento zápis môže pôsobiť abstraktne, takže si ho rozoberme.

**R3**

opisuje všetky možné positions v trojrozmernom priestore:

**(x, y, z)**

Potrebujeme tri numbers, preto tri dimensions.

**S2**

opisuje všetky možné directions v 3D priestore.

Prečo S2?

Predstav si jednotkovú guľu.

Každý smer z jej stredu môžeme reprezentovať bodom na jej povrchu.

Smer doprava zodpovedá jednému bodu.

Smer nahor inému.

Smer šikmo dopredu ďalšiemu.

Povrch gule označujeme:

**S2**

Hoci je guľa vložená v 3D priestore, jej povrch má iba dve degrees of freedom.

Na určenie bodu na povrchu nám stačia napríklad dva angles.

Preto:

**R3 x S2**

znamená:

**ľubovoľná position v 3D priestore + ľubovoľný smer v priestore.**

To presne zodpovedá tomu, čo potrebujeme pri spray nozzle.

---

## 09. Laser pointer: keď task space opisuje iba smer

Predstav si teraz robotické rameno, ktoré drží laser pointer.

Úloha znie:

**„Namier laser týmto smerom."**

Predpokladajme, že position laseru nás vôbec nezaujíma.

Nezaujíma nás ani to, ako je laser otočený okolo vlastnej osi.

Jediné, čo potrebujeme vedieť, je:

**direction lúča.**

Ako sme si vysvetlili, všetky možné directions v 3D priestore môžeme reprezentovať bodmi na povrchu jednotkovej gule.

Task space je preto:

**S2**

Má 2 DOF.

Tento príklad pekne ukazuje, že task space môže mať oveľa menej dimensions než C-space robota.

Robot môže mať napríklad 7 DOF.

Úloha však môže potrebovať iba 2 DOF.

---

## 10. Task space teda nie je automaticky fyzický priestor okolo robota

Slovo „space" môže zvádzať k predstave nejakej oblasti v miestnosti.

Ale task space nemusí opisovať iba position.

Môže obsahovať:

- position,
- orientation,
- direction,
- alebo inú veličinu relevantnú pre task.

Pri kreslení je task space rovina positions.

Pri laser pointeri je to priestor directions.

Pri manipulácii je to kombinácia position a orientation.

Pri spray paintingu je to kombinácia position a direction.

Preto je dobré task space chápať všeobecnejšie:

**Je to priestor výsledkov alebo stavov end-effectora, ktoré používame na opis úlohy.**

---

## 11. Čo je workspace

Teraz sa dostávame k druhému hlavnému pojmu.

Task space nám povedal:

**„Ako chceme úlohu opisovať?"**

Workspace rieši inú otázku:

**„Ktoré stavy end-effectora vie tento konkrétny robot skutočne vytvoriť?"**

**Workspace je množina reachable configurations end-effectora.**

Slovo **reachable — dosiahnuteľné** je tu rozhodujúce.

Predstav si robotické rameno pripevnené k stolu.

Úlohu môžeme pokojne opísať pomocou x, y a z v celej miestnosti.

To však neznamená, že rameno dosiahne kamkoľvek.

Jeho links majú konečnú dĺžku.

Joints majú určitú geometriu.

Môžu mať joint limits.

Robot preto dokáže vytvoriť iba určitú množinu positions alebo orientations end-effectora.

Táto množina tvorí jeho **workspace**.

---

## 12. Task space a workspace sa pýtajú na dve odlišné veci

Predstav si veľkú tabuľu na stene.

Robot má na ňu kresliť.

Na opis úlohy používame:

**x, y**

Task space môže teda opisovať celú plochu tabule.

Teraz si predstav, že robot má krátke links.

Na ľavú polovicu tabule dosiahne.

Na pravú nie.

Pravá polovica však neprestáva byť zmysluplnou súčasťou úlohy.

Stále vieme povedať:

**„Chcem nakresliť bod tu."**

Taký bod existuje v task space.

Lenže konkrétny robot ho nevie dosiahnuť.

Preto nepatrí do jeho workspace.

Takže:

**Task space opisuje, čo môžeme v rámci úlohy požadovať.**

**Workspace opisuje, čo z toho konkrétny robot dokáže fyzicky dosiahnuť.**

Toto je hlavný rozdiel medzi týmito dvoma pojmami.

---

## 13. Workspace ako obraz C-space cez robota

Workspace si môžeme predstaviť ešte jedným užitočným spôsobom.

Robot má všetky svoje možné configurations v C-space.

Pre každú jednu configuration môžeme vypočítať, kde sa nachádza end-effector.

Takže máme proces:

**configuration robota** → určí → **configuration end-effectora**

Ak vezmeme všetky možné configurations robota a pozrieme sa, kam pri nich end-effector skončí, dostaneme všetky reachable states end-effectora.

To je workspace.

Táto predstava bude neskôr veľmi dôležitá pri **forward kinematics**.

Forward kinematics rieši:

**„Keď poznám joint values, kde bude end-effector?"**

Ak túto otázku položíme pre všetky možné joint configurations, postupne vytvoríme workspace.

---

## 14. Príklad: planar 2R robot

![Workspaces rôznych robotov](/book/ch2/fig2-12.png)

Predstav si veľmi jednoduché planar robotické rameno s dvoma rotačnými joints.

Označujeme ho:

**2R robot**

pretože má:

- R — revolute joint
- R — revolute joint

Oba links sa pohybujú v rovine.

Predpokladajme, že nás zaujíma iba position špičky druhého linku.

Potom ju môžeme opísať pomocou:

**x, y**

Priestor všetkých možných bodov v rovine je R2.

Ale robot samozrejme nedosiahne každý bod R2.

Ak majú oba links dĺžku 3, maximálnu vzdialenosť špičky od base dostaneme vtedy, keď sú oba links úplne vystreté v rovnakom smere:

**3 + 3 = 6**

Robot teda nemôže dosiahnuť bod vzdialený od base napríklad 100 jednotiek.

Jeho geometria mu to nedovolí.

Workspace je preto iba určitá oblasť v R2.

---

## 15. Pri 2R robote záleží aj na minimálnom dosahu

Je užitočné ísť o krok ďalej.

Predstav si všeobecný 2R robot s dĺžkami links:

**L1** a **L2**

Maximálny dosah je:

**L1 + L2**

pretože oba links môžeme vystrieť rovnakým smerom.

Ale čo najmenšia vzdialenosť od base?

Ak jeden link zložíme proti druhému, najmenšia možná vzdialenosť je:

**|L1 - L2|**

Ak majú links rovnakú dĺžku, napríklad:

**L1 = 3, L2 = 3**

potom:

**|3 - 3| = 0**

Robot sa teda môže dostať až k base.

Pri neobmedzených revolute joints preto position workspace takéhoto 2R robota tvorí kruhová oblasť s maximálnym radiusom 6.

Ak by však jeden link bol oveľa dlhší než druhý, v strede by mohla zostať oblasť, ktorú robot nedosiahne.

Toto pekne ukazuje, že workspace vzniká priamo z geometrie robota.

---

## 16. Joint limits môžu workspace ďalej zmenšiť

Doteraz sme predpokladali, že revolute joints sa môžu voľne otáčať.

Reálne roboty však často majú **joint limits**.

Napríklad joint sa možno môže pohybovať iba:

**od -90° do +90°**

namiesto plnej rotácie 360°.

To znamená, že niektoré configurations, ktoré by geometricky boli možné pri neobmedzenom jointe, už nie sú fyzicky dovolené.

A keď odstránime časť C-space, automaticky môžeme odstrániť aj časť reachable end-effector states.

Workspace teda závisí nielen od:

**dĺžok links**

ale aj od:

**usporiadania joints a ich rozsahov pohybu.**

---

## 17. Každý bod workspace musí byť dosiahnuteľný

Definícia workspace obsahuje veľmi jednoduchú, ale dôležitú podmienku.

Ak určitý bod alebo end-effector state patrí do workspace, musí existovať **aspoň jedna configuration robota**, ktorá ho vytvorí.

Predstav si point:

**p**

v workspace.

Potom musí existovať aspoň jedno:

**q**

v C-space také, že pri configuration q sa end-effector dostane do p.

Nemusí existovať iba jedna.

Môžu existovať dve, tri alebo dokonca nekonečne veľa rôznych robot configurations, ktoré dávajú rovnaký end-effector state.

Ale aspoň jedna existovať musí.

Ak neexistuje ani jedna, daný point nie je reachable a nepatrí do workspace.

---

## 18. Jeden bod workspace môže zodpovedať viacerým configurations

Toto je ďalší zásadný rozdiel medzi C-space a workspace.

Predstav si svoju ruku.

Polož dlaň na jedno konkrétne miesto na stole.

Teraz skús mierne presúvať lakeť, pričom dlaň necháš približne na tom istom mieste.

Celková configuration tvojej ruky sa mení.

Shoulder môže byť nastavené trochu inak.

Elbow môže mať iný uhol.

Wrist môže zmenu vykompenzovať.

Napriek tomu môže dlaň zostať na rovnakom mieste.

V robotike sa deje presne to isté.

Môžeme mať:

- **configuration q1** → end-effector v bode p
- **configuration q2** → ten istý end-effector v bode p
- **configuration q3** → opäť ten istý end-effector v bode p

Takže mapping z C-space do workspace vo všeobecnosti nemusí byť one-to-one.

Jeden bod workspace nemusí jednoznačne určiť configuration robota.

---

## 19. Prečo je to dôležité pre inverse kinematics

Tento problém sa neskôr objaví pri **inverse kinematics**.

Forward kinematics rieši:

**„Poznám joint values. Kde bude end-effector?"**

Inverse kinematics rieši opačnú otázku:

**„Chcem end-effector sem. Aké joint values to dosiahnu?"**

A práve tu nastáva problém.

Na jednu požadovanú end-effector configuration nemusí existovať iba jedna odpoveď.

Môžu existovať:

- žiadne riešenia,
- jedno riešenie,
- viac riešení.

Ak bod neleží vo workspace:

**riešenie neexistuje.**

Ak leží vo workspace:

**existuje aspoň jedna robot configuration.**

Ale často ich môže byť viac.

---

## 20. Jednoduchý príklad viacerých inverse-kinematic riešení

Predstav si planar 2R arm, ktorý sa má dotknúť určitého bodu.

V mnohých prípadoch ho môže dosiahnuť dvomi spôsobmi.

Jeden môžeme intuitívne nazvať:

**elbow-up**

a druhý:

**elbow-down**

End-effector skončí presne na rovnakom mieste.

Ale joint angles sú iné.

Takže v workspace máme jeden bod.

V C-space však máme dva rôzne body.

To veľmi dobre ukazuje, prečo C-space a workspace nesmieme zamieňať.

---

## 21. Redundancia robota

Situácia je ešte výraznejšia, ak má robot viac DOF, než task potrebuje.

Predstav si 7-DOF arm.

Ak od jeho end-effectora požadujeme úplnú 6-DOF pose:

**3 DOF position + 3 DOF orientation**

robot má stále jeden joint degree of freedom navyše.

Takýto robot nazývame v danom tasku **redundant**.

To znamená, že môže meniť časť svojej internal configuration bez toho, aby zmenil požadovaný end-effector state.

Podobne ako keď držíš ruku na rovnakom mieste, ale dokážeš hýbať lakťom.

Redundancy môže byť veľmi užitočná.

Robot môže napríklad udržať gripper na rovnakom mieste a pritom:

- obísť prekážku lakťom,
- vyhnúť sa joint limits,
- zvoliť pohodlnejšiu configuration.

---

## 22. Rozdielny C-space, rovnaký workspace

Teraz si predstavme dva planar roboty.

Prvý je:

**2R robot** s dvoma links dĺžky: **3 + 3**

Druhý je:

**3R robot** s tromi links dĺžky: **2 + 2 + 2**

Ich C-spaces sú rozdielne.

2R robot má dve joint variables: **2 DOF**

3R robot má tri: **3 DOF**

Ich vnútorné možnosti konfigurácie teda nie sú rovnaké.

Ak však sledujeme iba **Cartesian position end-effectora** a predpokladáme vhodný rozsah joints, oba majú maximálny dosah:

**6**

Prvý: **3 + 3 = 6**

Druhý: **2 + 2 + 2 = 6**

V situácii uvedenej v podklade môžu ich end-effectory pokryť rovnakú planar oblasť.

Takže:

**rozdielny C-space nemusí znamenať rozdielny workspace.**

Roboty môžu byť vnútorne veľmi odlišné, ale z pohľadu určitej task môžu dosahovať rovnakú množinu end-effector positions.

---

## 23. Prečo rovnaký maximálny dosah sám osebe nestačí

Je dobré byť pri predchádzajúcom príklade presný.

Samotné:

**L1 + L2 = L1 + L2 + L3**

nestačí automaticky na tvrdenie, že dva roboty majú rovnaký celý workspace.

Rovnaký maximálny dosah znamená iba, že ich najvzdialenejší reachable point môže byť rovnako ďaleko.

Celý tvar workspace však závisí aj od:

- dĺžok jednotlivých links,
- joint limits,
- geometrického usporiadania osí,
- toho, akú časť end-effector configuration sledujeme.

V konkrétnom príklade z podkladu sú roboty zvolené tak, aby ich position workspaces boli rovnaké.

Toto je dôležité preto, aby sme si z príkladu neodniesli nesprávne všeobecné pravidlo.

---

## 24. Rovnaký C-space neznamená rovnaký workspace

Teraz obráťme situáciu.

Predstav si dva roboty, z ktorých každý má dva revolute joints.

Ak môžu oba joints vykonať plnú rotáciu, ich configuration space môže mať rovnakú topologickú štruktúru:

**S1 x S1**

čo je torus:

**T2**

To znamená, že z pohľadu joint coordinates majú podobný C-space.

Ale predstav si, že prvý robot má osi usporiadané tak, že sa oba links pohybujú v jednej rovine.

Jeho end-effector vytvára planar workspace.

Druhý robot môže mať osi usporiadané úplne inak, takže end-effector sa pohybuje napríklad po povrchu sféry.

Joint variables sú stále dva angles.

C-space môže mať rovnakú topológiu.

Ale fyzický pohyb end-effectora je úplne iný.

Preto:

**C-space sám osebe neurčuje tvar workspace.**

Potrebujeme poznať aj geometrické usporiadanie robota.

---

## 25. Prečo C-space a workspace opisujú odlišné veci

C-space odpovedá:

**„Aké internal configurations robota existujú?"**

Workspace odpovedá:

**„Aké výsledné states end-effectora tieto configurations vytvoria?"**

Preto môžu dva veľmi rozdielne mechanismy vytvárať rovnakú množinu end-effector positions.

A naopak dva mechanismy s podobnými joint variables môžu mať úplne rozdielne workspaces.

Tento rozdiel je veľmi dôležitý.

C-space opisuje **vnútorný stav systému**.

Workspace opisuje **vonkajší výsledok pohybu end-effectora**.

---

## 26. 3R wrist: position sa nemení, orientation áno

Veľmi dobrým príkladom je **3R wrist mechanism**.

Predstav si tri revolute joints, ktorých osi sa pretínajú v jednom spoločnom bode.

Tento spoločný bod zostáva počas rotácií na rovnakom mieste.

Joints však umožňujú meniť orientation end-effectora.

Takže:

**position end-effectora sa nemení**

ale

**orientation sa meniť môže.**

Ak by sme workspace definovali iba pomocou Cartesian position:

**x, y, z**

dostali by sme prakticky jediný bod.

Taká definícia workspace by nám o schopnostiach mechanizmu povedala veľmi málo.

Skutočnou schopnosťou tohto wristu je meniť orientation.

Preto je oveľa prirodzenejšie sledovať jeho **orientation workspace**.

---

## 27. Prečo orientation workspace 3R wristu nie je len „bod"

Configuration space samotného 3R wristu môžeme pri troch plne rotačných joints predstaviť ako:

**T3**

pretože máme tri angular variables.

Ale výsledok pohybu, ktorý nás zaujíma, je orientation end-effectora.

V podklade je orientation workspace opísaný ako:

**S2 x S1**

Tento zápis môžeme intuitívne chápať takto:

**S2** opisuje, kam smeruje určitá os end-effectora.

Keď už smer tejto osi poznáme, zostáva ešte jedna rotácia:

**S1**

— otočenie okolo samotnej osi.

Spolu teda dostávame tri rotational freedoms.

Tento príklad opäť ukazuje, že C-space a workspace môžu mať úplne odlišný matematický zápis, hoci opisujú ten istý mechanizmus z dvoch rôznych pohľadov.

---

## 28. Workspace nemusí znamenať iba reachable position

Pri slove workspace si človek často predstaví obrázok robota a farebnú oblasť okolo neho:

**„Sem robot dosiahne."**

Toto je veľmi častý význam, ale nie jediný.

Workspace môžeme definovať podľa toho, ktoré end-effector quantities nás zaujímajú.

Môžeme mať:

- **position workspace** — všetky reachable positions,
- **orientation workspace** — všetky reachable orientations,
- alebo **pose workspace** — reachable combinations position + orientation.

Preto keď niekto povie „workspace", je dobré vedieť, **čo presne doň zahrnul**.

---

## 29. Prečo môžeme niektoré freedoms pri workspace ignorovať

Predstav si robota, ktorý dokáže v každom reachable bode natočiť gripper ľubovoľným požadovaným spôsobom.

Ak nás v konkrétnej analýze zaujíma iba:

**„Kam fyzicky dosiahne?"**

nemusíme kresliť celý priestor position + orientation.

Môžeme definovať workspace iba ako množinu reachable positions.

To neznamená, že orientation neexistuje.

Iba ju pre konkrétny účel **projekujeme preč**, pretože nás momentálne nezaujíma.

Podobne sme postupovali pri task space.

V oboch prípadoch treba vždy povedať, ktoré quantities sledujeme.

---

## 30. SCARA robot

![SCARA robot](/book/ch2/fig2-13.png)

Teraz sa pozrime na konkrétny priemyselný príklad.

**SCARA robot** sa často používa na pick-and-place operácie, montáž alebo presúvanie komponentov.

Robot z podkladu má joints:

**R — R — R — P**

Tri revolute joints a jeden prismatic joint.

Preto ide o:

**RRRP open chain**

Jeho end-effector môže meniť:

**x, y, z**

a zároveň jednu orientation:

**φ**

Túto orientation môžeme chápať ako rotáciu end-effectora v horizontálnej rovine.

Preto prirodzený task space môže byť:

**R3 x S1**

---

## 31. Prečo R3 x S1 pri SCARA

**R3** predstavuje:

**x, y, z**

čiže Cartesian position end-effectora.

**S1** predstavuje jednu angular variable:

**φ**

S1 si môžeme predstaviť ako kružnicu všetkých možných uhlov.

Napríklad:

**0°, 90°, 180°, 270°**

a po 360° sa vraciame do rovnakej orientation.

Preto rotation o jednej angular freedom prirodzene súvisí so S1.

Task space SCARA teda opisuje:

**kde je end-effector + ako je natočený okolo vertikálnej osi.**

---

## 32. Workspace SCARA môžeme definovať jednoduchšie

Predstav si, že nás pri SCARA zaujíma hlavne:

**„Na ktoré body vo výrobnom priestore dokáže položiť súčiastku?"**

Vtedy môžeme sledovať iba:

**x, y, z**

a orientation φ pre túto analýzu ignorovať.

Workspace potom môžeme zobraziť ako 3D oblasť reachable positions.

Prečo je to užitočné?

Pretože takáto predstava nám okamžite ukáže, kam umiestniť napríklad:

- dopravník,
- zásobník,
- pracovný prípravok.

Nemusíme pritom vizualizovať ďalšiu angular dimension.

---

## 33. Spray-painting robot

![Spray-painting robot](/book/ch2/fig2-14.png)

Vráťme sa ešte k priemyselnému 6R manipulátoru s paint spray nozzle.

Robot má:

**6 revolute joints**

Jeho C-space teda môže mať:

**6 DOF**

Úloha spray paintingu však nepotrebuje úplnú 6-DOF orientation nozzle.

Potrebujeme:

**position trysky: x, y, z**

a

**direction striekania**

ktorý má 2 DOF.

Takže:

**3 + 2 = 5 DOF**

a task space môžeme zapísať:

**R3 x S2**

---

## 34. Prečo rotáciu trysky okolo vlastnej osi ignorujeme

Predstav si jednoduchú symetrickú trysku smerujúcu kolmo na povrch auta.

Ak ju otočíme o 30° okolo osi, pozdĺž ktorej strieka farba, ale direction samotného prúdu sa nezmení, výsledok môže zostať rovnaký.

Takáto rotation teda nemá význam pre daný task.

Preto ju nemusíme zahrnúť do task space.

Toto je dobrý príklad všeobecného pravidla:

**DOF robota a DOF tasku nie sú automaticky rovnaké.**

Task si vyberá iba freedoms, ktoré ovplyvňujú výsledok práce.

---

## 35. Dva možné pohľady na workspace spray-painting robota

Aj workspace môžeme pri tomto robotovi definovať rôznymi spôsobmi podľa toho, čo chceme analyzovať.

Ak nás zaujíma kompletná schopnosť vykonať spray task, môžeme sledovať:

**reachable position + reachable direction**

Teda určitú časť:

**R3 x S2**

Ak nás však zaujíma iba:

**„Kam sa tryska dokáže fyzicky dostať?"**

môžeme sledovať iba position:

**R3**

Oba pohľady sú užitočné.

Len odpovedajú na trochu inú otázku.

Preto je pri slove workspace vždy dôležité vedieť, **aké end-effector variables doň zahŕňame**.

---

## 36. C-space, task space a workspace vedľa seba

Teraz už máme všetky tri pojmy a môžeme ich porovnať.

**Configuration space — C-space**

C-space opisuje configuration **celého robota**.

Pýtame sa: **„Ako sú nastavené všetky časti mechanizmu?"**

Pri n-joint robotickom ramene môžu coordinates C-space tvoriť: **θ1, θ2, ..., θn**

**Task space**

Task space opisuje **výsledok relevantný pre konkrétnu úlohu**.

Pýtame sa: **„Aké quantities potrebujem poznať, aby som vedela opísať, čo má robot vykonať?"**

- Pri kreslení: **x, y**
- Pri manipulácii rigid body: **position + orientation**
- Pri laser pointeri: **direction**
- Pri spray paintingu: **position + direction**

Task space teda vychádza najmä z **tasku**.

**Workspace**

Workspace opisuje: **„Ktoré end-effector states dokáže konkrétny robot skutočne dosiahnuť?"**

Je ovplyvnený napríklad: **dĺžkami links, joint geometry, joint limits** a celkovou konštrukciou robota.

Workspace teda vychádza najmä zo **schopností konkrétneho robota**.

---

## 37. Jeden príklad, ktorý spája všetky tri pojmy

Predstav si robotické rameno, ktoré má kresliť na tabuľu.

Má šesť rotačných joints.

**C-space:**

Na opis celého robota potrebujeme: **θ1, θ2, θ3, θ4, θ5, θ6**

To je jeho internal configuration.

**Task space:**

Ak chceme kresliť body na rovine tabule a ostatné freedoms nás nezaujímajú, task opisujeme: **x, y**

To je prirodzený priestor úlohy.

**Workspace:**

Robot však nemusí dosiahnuť každý bod tabule.

Množina tých x, y, ktoré reálne dosiahne, tvorí jeho workspace pre túto task reprezentáciu.

Takže môžeme mať napríklad:

**task space = celá tabuľa**

ale:

**workspace = iba stredná časť tabule**

---

## 38. Ako spolu C-space a task space súvisia

Medzi C-space a task space existuje mapping.

Každá configuration robota:

**q**

vytvorí určitý task-space state:

**x**

Napríklad:

joint angles robota → určia → position grippera.

Tento vzťah môžeme symbolicky chápať ako:

**q → x**

Neskôr ho budeme formalizovať pomocou **forward kinematics**.

Dôležité je, že rôzne q môžu viesť k rovnakému x.

Preto mapping nemusí byť one-to-one.

---

## 39. Prečo task-space point nemusí mať riešenie v C-space

Predstav si požadovanú position grippera:

**x***

Chceme nájsť configuration robota q takú, aby sa gripper dostal na x*.

Ak x* leží vo workspace, aspoň jedno také q existuje.

Ak x* neleží vo workspace, nenájdeme žiadne q.

Robot môže dostať úplne zrozumiteľnú požiadavku v task space, ktorú však jeho mechanika nedokáže splniť.

Napríklad:

**„Dotkni sa bodu desať metrov od base."**

Task-space point je matematicky úplne normálny.

Ale pre malé robotické rameno nie je reachable.

---

## 40. Prečo môže mať task-space point viac riešení

Ak požadovaný point vo workspace je, stále nemusíme dostať jednoznačnú robot configuration.

Ako sme videli pri elbow-up a elbow-down:

**jeden end-effector state**

môže zodpovedať:

**viacerým q v C-space.**

Pri redundantnom robotovi môže byť takých configurations dokonca celé kontinuum.

To je dôvod, prečo inverse kinematics nie je vždy jednoduché „prevrátenie" forward kinematics.

Musíme niekedy vybrať jedno riešenie z viacerých možností.

---

## 41. Typická chyba: „Task space je workspace"

Nie.

Predstav si, že task space je R2.

To hovorí, že úlohu prirodzene opisujeme dvojicou:

**(x, y)**

Nehovorí to však, že robot dokáže dosiahnuť každý bod R2.

Workspace môže byť iba malá oblasť tohto priestoru.

Takže:

**Task-space representation neurčuje automaticky reachability.**

To, že vieme určitý cieľ zapísať, ešte neznamená, že ho robot dokáže dosiahnuť.

---

## 42. Typická chyba: „Workspace je vždy menší task space"

Ako mentálna predstava to často funguje, ale treba byť opatrný.

Workspace aj task space musíme najskôr definovať pomocou rovnakých sledovaných quantities, aby sme ich takto priamo porovnávali.

Ak task space opisuje:

**position + direction**

ale workspace sme sa rozhodli zobrazovať iba ako:

**reachable position**

potom nejde jednoducho o dve množiny v úplne rovnakom priestore.

Preto vždy sleduj:

**Čo presne je coordinate task space?**

a

**Čo presne sme sa rozhodli zahrnúť do workspace?**

---

## 43. Typická chyba: „Viac DOF robota znamená väčší workspace"

Ani toto nemusí platiť.

Predstav si 3R robot s veľmi krátkymi links a 2R robot s dlhšími links.

3R robot má viac DOF, ale jeho position workspace môže byť menší.

Ďalší DOF môže namiesto väčšieho dosahu priniesť napríklad:

- väčšiu orientačnú flexibilitu,
- redundancy,
- viac možností, ako dosiahnuť ten istý bod.

Počet DOF a fyzická veľkosť workspace preto nie sú to isté.

---

## 44. Typická chyba: „Ak poznám workspace point, poznám configuration robota"

Opäť nie.

Workspace point opisuje end-effector.

C-space point opisuje celý robot.

Rôzne internal configurations môžu vytvoriť rovnaký end-effector state.

Preto:

**workspace point → nemusí jednoznačne určovať C-space point.**

Toto je jedna z hlavných myšlienok, ktoré si treba odniesť do inverse kinematics.

---

## 45. Prečo je task space užitočný pri programovaní robota

Predstav si, že by operátor pri každej úlohe musel ručne zadávať všetky joint angles.

To by bolo veľmi nepraktické.

Človek prirodzene rozmýšľa skôr takto:

**„Vezmi tento predmet."**

**„Polož ho sem."**

**„Veď trysku po tejto krivke."**

**„Namier kameru týmto smerom."**

To sú požiadavky prirodzene formulované v task space.

Robotický systém ich potom musí previesť na zodpovedajúci pohyb v C-space.

Preto je task space akýmsi rozhraním medzi:

**tým, čo chceme dosiahnuť**

a

**tým, ako sa musí robot mechanicky nastaviť.**

---

## 46. Súvis s forward kinematics

**Forward kinematics** rieši otázku:

**„Keď poznám configuration robota, aký bude stav end-effectora?"**

Teda:

**C-space → task/end-effector space**

Napríklad:

**(θ1, θ2)** → **(x, y)**

pri planar 2R robote.

Forward kinematics nám teda vytvára matematické spojenie medzi internal joint configuration a výsledkom viditeľným na end-effectore.

---

## 47. Súvis s inverse kinematics

**Inverse kinematics** ide opačným smerom.

Máme požadovaný end-effector state:

**(x, y, z, ...)**

a hľadáme:

**joint variables θ**

ktoré ho vytvoria.

Teda:

**task-space goal → C-space solution**

A tu sa workspace stáva kritický.

Ak target neleží vo workspace:

**inverse-kinematic solution neexistuje.**

Ak vo workspace leží:

môže existovať jedno alebo viac riešení.

---

## 48. Súvis s motion planning

Pri **motion planning** nestačí vedieť iba to, že cieľový end-effector state je reachable.

Robot musí nájsť aj fyzicky realizovateľnú cestu medzi počiatočnou a cieľovou configuration.

Task môže povedať:

**„Gripper má skončiť tu."**

Inverse kinematics môže nájsť vhodnú final configuration.

Motion planning potom rieši:

**„Ako sa robot do tejto configuration dostane bez kolízie a pri rešpektovaní svojich constraints?"**

Takže pojmy z tejto lekcie tvoria základ pre ďalšie časti robotiky.

---

## 49. Rekapitulácia najdôležitejších pojmov

- **Configuration** — Opisuje aktuálny stav celého robota alebo mechanizmu. Pri robotickom ramene ju často tvoria hodnoty jednotlivých joint variables.
- **Configuration space (C-space)** — Priestor všetkých možných configurations celého robota. Jeden bod C-space predstavuje jednu kompletnú configuration mechanizmu.
- **End-effector** — Časť robota, ktorá priamo vykonáva task — napríklad gripper, pero, kamera, laser alebo spray nozzle.
- **Task space** — Priestor veličín, pomocou ktorých prirodzene opisujeme výsledok úlohy. Jeho podoba závisí od toho, čo je pre konkrétnu task relevantné.
- **Workspace** — Množina end-effector states, ktoré konkrétny robot dokáže reálne dosiahnuť aspoň jednou svojou configuration.
- **R2** — Dvojrozmerný priestor dvojíc reálnych čísel, napríklad positions (x,y) v rovine.
- **R3** — Trojrozmerný priestor positions (x,y,z).
- **S1** — Kružnica, ktorá prirodzene reprezentuje jednu angular freedom.
- **S2** — Povrch gule, ktorý môžeme použiť na reprezentáciu všetkých directions v 3D priestore.
- **R3 x S2** — Kombinácia 3D position a direction. Typický task space napríklad pre paint spray nozzle, ak rotation okolo vlastnej osi nie je dôležitá.
- **Reachable state** — Taký end-effector state, pre ktorý existuje aspoň jedna configuration robota, ktorá ho vytvorí.
- **Redundancy** — Situácia, keď má robot viac degrees of freedom, než potrebuje task. Potom môže existovať viac robot configurations pre rovnaký end-effector state.
- **Forward kinematics** — Výpočet end-effector state z configuration robota.
- **Inverse kinematics** — Hľadanie robot configuration, ktorá vytvorí požadovaný end-effector state.

---

## 50. Čo si z tejto lekcie odniesť

Najdôležitejšie je nezamieňať tri rôzne pohľady na ten istý robot.

**C-space sa pozerá dovnútra robota.**

Zaujíma nás, ako sú nastavené všetky jeho joints a aké configurations celého mechanizmu existujú.

**Task space sa pozerá na úlohu.**

Pýtame sa, aké quantities potrebujeme na to, aby sme vedeli opísať požadovaný výsledok. Niekedy je to iba position. Inokedy position a orientation. Pri inom tasku možno iba direction.

**Workspace sa pozerá na schopnosti konkrétneho robota.**

Pýtame sa, ktoré end-effector states dokáže tento robot vzhľadom na svoju geometriu, links, joints a joint limits skutočne vytvoriť.

Preto môže existovať cieľ, ktorý je úplne zmysluplný v task space, ale neleží vo workspace.

A preto môže jeden bod workspace zodpovedať viacerým bodom C-space.

Najjednoduchšie si to môžeš predstaviť takto:

**C-space:** „Ako môže byť nastavený celý robot?"

**Task space:** „Ako opíšeme to, čo od robota chceme?"

**Workspace:** „Ktoré z týchto výsledkov konkrétny robot skutočne dokáže dosiahnuť?"

A práve spojenie medzi týmito tromi priestormi bude neskôr základom pre **forward kinematics, inverse kinematics, motion planning a robot control**.

---

:::summary

**Configuration space (C-space)** opisuje celý robot — všetky možné konfigurácie všetkých jeho pohyblivých častí. **Task space** opisuje to, čo je dôležité pre úlohu — napríklad position a orientation end-effectora. **Workspace** je množina konfigurácií end-effectora, ktoré konkrétny robot skutočne dokáže dosiahnuť.

Task space závisí od úlohy, nie od konštrukcie robota. Ten istý robot môže mať rôzny task space pri rôznych úlohách. Pri kreslení na papier stačí **R2**. Pri manipulácii predmetom potrebujeme position + orientation. Pri spray paintingu stačí position + direction, teda **R3 x S2**. Pri laser pointeri stačí iba direction, teda **S2**.

Workspace závisí od konštrukcie robota — od dĺžky links, usporiadania joints a ich rozsahov. Dva roboty s rozdielnym C-space môžu mať rovnaký workspace a naopak — rovnaký C-space nezaručuje rovnaký workspace.

Jeden bod workspace môže zodpovedať viacerým configurations robota. To bude neskôr dôležité pri **inverse kinematics**. Ak požadovaný end-effector state neleží vo workspace, riešenie neexistuje. Ak leží, môže existovať jedno alebo viac riešení.

Najdôležitejší rozdiel:

- **C-space = celý robot**
- **Task space = čo požaduje úloha**
- **Workspace = čo robot skutočne dosiahne**

A práve spojenie medzi týmito tromi priestormi tvorí základ pre **forward kinematics, inverse kinematics, motion planning a robot control**.

:::`;
