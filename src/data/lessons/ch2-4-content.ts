// Chapter 2.4 – Configuration and Velocity Constraints
// Full lesson content - DO NOT SHORTEN

export const ch24Content = `# Chapter 2.4 – Configuration and Velocity Constraints

V predchádzajúcej časti sme sa naučili, že configuration space môžeme reprezentovať aj implicitne. Namiesto toho, aby sme hľadali minimálny počet nezávislých súradníc, môžeme použiť viac premenných a pomocou constraints určiť, ktoré ich kombinácie sú skutočne možné.

Teraz túto myšlienku rozvinieme ďalej. Pri robotoch totiž existujú dva zásadne odlišné druhy obmedzení. Niektoré obmedzujú samotnú configuration – určujú, v akých konfiguráciách sa systém vôbec môže nachádzať. Iné obmedzujú iba velocity – určujú, akým spôsobom sa systém môže pohybovať v konkrétnom okamihu.

Rozdiel medzi nimi je veľmi dôležitý. Práve na ňom stoja pojmy **holonomic constraints** a **nonholonomic constraints**.

---

## 01. Prečo closed-chain robot potrebuje configuration constraints

Začnime so four-bar linkage, teda štvorčlánkovým mechanizmom. Tvoria ho štyri links spojené revolute joints do uzavretej slučky. Jeden z links pritom predstavuje ground a zostáva pevný.

Každému revolute joint môžeme priradiť určitý uhol. Ak máme štyri joint angles, mohlo by sa na prvý pohľad zdať, že môžeme každý z nich nastaviť nezávisle. Pri closed chain to však nie je možné.

Dôvodom je samotná mechanická konštrukcia. Links majú pevné dĺžky a sú navzájom spojené. Keď sa pohne jeden link, ostatné sa mu musia prispôsobiť tak, aby všetky joints zostali spojené a mechanizmus zostal uzavretý.

Predstav si napríklad skutočný kovový four-bar mechanism. Nemôžeš otočiť jeden joint do ľubovoľnej polohy a potom úplne nezávisle nastaviť všetky ostatné. V určitom momente by sa posledné dva links už nedokázali spojiť. Taká kombinácia joint angles jednoducho nie je fyzicky možnou configuration mechanizmu.

Potrebujeme preto equations, ktoré vyjadrujú podmienku, že uzavretá slučka musí zostať uzavretá. Nazývame ich **loop-closure equations**.

---

## 02. Ako vznikajú loop-closure equations

Pri four-bar linkage si môžeme zvoliť jeden bod ako začiatok a matematicky prejsť postupne cez všetky štyri links.

Každý link má určitú dĺžku a určitý smer. Keď prejdeme prvým linkom, posunieme sa o určitú vzdialenosť v smere jeho orientation. Potom pokračujeme druhým, tretím a štvrtým linkom.

Keďže ide o closed chain, po prejdení celej slučky sa musíme dostať presne späť do východiskového bodu.

To znamená, že celkový posun v smere x musí byť nulový a rovnako musí byť nulový celkový posun v smere y.

Zároveň musí po prejdení slučky správne sedieť aj výsledná orientation. Pri four-bar linkage tak získame tri nezávislé podmienky: dve pre position a jednu pre orientation.

V knihe sú zapísané pomocou dĺžok links L1 až L4 a joint angles theta1 až theta4. Ich konkrétny trigonometrický tvar teraz nie je najdôležitejší. Podstatné je pochopiť, odkiaľ tieto equations pochádzajú.

Nie sú to umelo pridané matematické pravidlá. Sú matematickým zápisom fyzickej skutočnosti: **„Links sú spojené do uzavretej slučky a táto slučka sa pri pohybe nesmie rozpojiť."**

---

## 03. Four-bar linkage má štyri joint angles, ale iba jeden DOF

Teraz môžeme lepšie pochopiť aj implicit representation z predchádzajúcej lekcie.

Four-bar linkage môžeme reprezentovať pomocou štyroch joint angles: theta1, theta2, theta3, theta4

To sú štyri čísla. Neznamená to však, že mechanizmus má 4 DOF, pretože tieto štyri hodnoty nemôžeme meniť nezávisle.

Musia spĺňať tri nezávislé loop-closure equations.

Preto dostávame: **4 premenné - 3 nezávislé constraints = 1 DOF**

To znamená, že ak zvolíme jednu vhodnú nezávislú hodnotu, napríklad polohu jedného jointu, pohyb zvyšku mechanizmu je už obmedzený jeho geometriou.

Presne preto sa four-bar linkage dokáže pohybovať, ale má iba jeden degree of freedom.

---

## 04. Configuration space ako menšia časť väčšieho priestoru

Tento príklad nám zároveň ukazuje, čo implicit representation znamená geometricky.

Máme štyri joint angles, takže môžeme uvažovať veľký štvorrozmerný priestor všetkých možných kombinácií theta1, theta2, theta3 a theta4.

Lenže väčšina bodov v tomto priestore nepredstavuje skutočnú configuration four-bar linkage. Predstavovali by kombinácie uhlov, pri ktorých by sa links už nedokázali spojiť.

Platné sú iba tie body, ktoré spĺňajú všetky tri loop-closure constraints.

Preto skutočný configuration space tvorí iba jednorozmernú množinu vo vnútri štvorrozmerného priestoru joint coordinates.

Nemusíš si vedieť štvorrozmerný priestor predstaviť. Dôležitý je princíp: **Joint coordinates vytvárajú väčší priestor možností. Constraints z neho vyberajú iba fyzicky možné configurations.**

Toto je presne implicit representation, ktorú sme riešili v Chapter 2.3.2.

---

## 05. Všeobecný zápis configuration constraints

Pri zložitejšom robotovi môže byť joint coordinates oveľa viac. Namiesto toho, aby sme ich zakaždým vypisovali jednotlivo, spojíme ich do jedného vectora:

**theta = [theta1, theta2, ..., thetan]**

theta teda jednoducho predstavuje celú sadu joint coordinates robota.

Ak robot musí spĺňať niekoľko configuration constraints, môžeme ich podobne spojiť do funkcie g. Potom ich zapíšeme veľmi kompaktne:

**g(theta) = 0**

Tento zápis znamená: „Configuration theta je povolená iba vtedy, ak spĺňa všetky constraints obsiahnuté v g."

Ak máme n joint coordinates a k nezávislých configuration constraints, zostáva nám: **n - k degrees of freedom.**

Configuration space teda môžeme chápať ako priestor s dimenziou n - k vložený do väčšieho n-rozmerného priestoru joint coordinates.

---

## 06. Holonomic constraints

Configuration constraints, ktoré môžeme zapísať priamo vo forme:

**g(theta) = 0**

nazývame **holonomic constraints**.

Najjednoduchšie povedané, holonomic constraint určuje vzťah medzi samotnými configuration variables.

Nehovorí iba, ako rýchlo sa robot smie práve teraz pohybovať. Hovorí, ktoré configurations sú vôbec možné.

Four-bar linkage je typický príklad. Jeho loop-closure equations priamo vylučujú určité kombinácie joint angles. Robot sa do nich nemôže dostať, pretože by to vyžadovalo rozpojenie alebo deformovanie links.

Holonomic constraints preto **zmenšujú dimension configuration space**.

Ak máme napríklad štyri configuration variables a tri nezávislé holonomic constraints, configuration space má iba jeden DOF.

Podobný princíp sme videli aj pri rigid body. Keď sme rigid body opisovali pomocou viacerých bodov, vzdialenosti medzi nimi museli zostať konštantné. Aj tieto distance constraints sú holonomic constraints – priamo určujú, ktoré polohy bodov môžu spolu tvoriť jeden rigid body.

---

## 07. Keď sa configuration mení v čase

Doteraz sme sa pozerali na robot v jednom konkrétnom okamihu. Robot sa však pohybuje, takže jeho configuration sa mení s časom.

Môžeme ju preto zapísať ako: **theta(t)**

To jednoducho znamená, že joint coordinates závisia od času.

Napríklad theta1 môže mať teraz hodnotu 20°, o sekundu 25° a neskôr 30°.

Ak však robot podlieha holonomic constraint, musí ho spĺňať počas celého pohybu, nielen na jeho začiatku alebo konci.

Preto musí v každom čase platiť: **g(theta(t)) = 0**

Robot sa teda pri pohybe nemôže z configuration space „odtrhnúť". Jeho trajectory musí celý čas zostať medzi configurations, ktoré spĺňajú constraint.

A práve tu vzniká spojenie medzi configuration constraints a velocity constraints.

---

## 08. Prečo z configuration constraint vzniká velocity constraint

Toto je miesto, kde je dôležité pochopiť význam derivácie, nie iba vzorec.

Predstav si jednoduchý príklad bodu, ktorý je mechanicky nútený zostať na kružnici s polomerom r.

Jeho position opisujú x a y, ale musí vždy platiť: **x2 + y2 = r2**

Toto je configuration constraint. Hovorí nám, kde sa bod smie nachádzať.

Teraz sa bod začne pohybovať.

Ak má stále zostať na kružnici, jeho x a y sa nemôžu meniť úplne ľubovoľne. Napríklad v pravom krajnom bode kružnice sa bod nemôže okamžite rozbehnúť ešte viac doprava, pretože by kružnicu opustil. Môže sa tam pohybovať iba v smere dotyčnice ku kružnici – teda nahor alebo nadol.

Configuration constraint teda automaticky vytvára obmedzenie aj na okamžitú velocity.

A derivácia je presne matematický nástroj, ktorým z podmienky týkajúcej sa position získame podmienku týkajúcu sa jej zmeny v čase.

---

## 09. Derivácia constraintu krok za krokom

Máme podmienku kružnice: **x2 + y2 = r2**

Keď sa bod pohybuje, x aj y závisia od času. Derivujeme preto obe strany podľa času.

Dostaneme: **2x*x_dot + 2y*y_dot = 0**

Po vydelení dvomi: **x*x_dot + y*y_dot = 0**

Čo nám táto equation hovorí?

x_dot je velocity v smere x a y_dot je velocity v smere y. Rovnica teda určuje, aké kombinácie x-ovej a y-ovej velocity sú v danej position povolené.

Ak sa napríklad bod nachádza úplne napravo na kružnici, máme x = r a y = 0.

Constraint sa zjednoduší na: **r*x_dot = 0**, a teda: **x_dot = 0**

V tomto konkrétnom bode teda bod nemôže mať okamžitú velocity smerujúcu doprava alebo doľava. Jeho okamžitý pohyb musí smerovať pozdĺž kružnice – nahor alebo nadol.

Teraz už vidíme, čo derivácia urobila.

Pôvodná equation nám povedala: **„Musíš zostať na kružnici."**

Jej derivácia nám povedala: **„Ak si na kružnici, tvoja okamžitá velocity musí smerovať tak, aby si ju neopustila."**

---

## 10. Rovnaký princíp platí pre robota

Presne to isté môžeme urobiť s všeobecným holonomic constraint: **g(theta) = 0**

Keď sa robot pohybuje, máme: **g(theta(t)) = 0**

Derivovaním podľa času dostaneme vzťah medzi joint positions a joint velocities.

Výsledok môžeme zapísať: **dg/dtheta * theta_dot = 0**

Symbol theta_dot znamená vector joint velocities – teda ako rýchlo sa jednotlivé joint coordinates práve menia.

Výraz dg/dtheta opisuje, ako sa jednotlivé constraints menia pri malých zmenách jednotlivých joint coordinates. Ide o matrix parciálnych derivácií, ktorú budeme neskôr poznávať ako určitý typ Jacobian matrix.

Celá equation teda hovorí: **Joint velocities nemôžu byť ľubovoľné. Musia byť také, aby robot pri pohybe naďalej spĺňal svoje configuration constraints.**

---

## 11. Pfaffian velocity constraints

Velocity constraints sa v robotike často zapisujú vo všeobecnej forme:

**A(theta) * theta_dot = 0**

Takýmto constraints hovoríme **Pfaffian constraints**.

Matrix A závisí od aktuálnej configuration robota a určuje, ktoré velocity sú v tejto configuration povolené.

Dôležité je pochopiť, že tento zápis sám o sebe ešte nehovorí, odkiaľ constraint pochádza.

Môže vzniknúť derivovaním holonomic configuration constraint. Ale môže existovať aj velocity constraint, ktorý nepochádza zo žiadnej configuration equation.

A práve medzi týmito dvomi prípadmi je zásadný rozdiel.

---

## 12. Čo znamená, že constraint je integrable

Vráťme sa ku kružnici, pretože na nej je tento pojem oveľa jednoduchšie pochopiť.

Velocity constraint sme mali: **x*x_dot + y*y_dot = 0**

Keby sme dostali iba túto equation a nepoznali jej pôvod, mohli by sme sa opýtať: Existuje nejaká podmienka na position x a y, z ktorej tento velocity constraint pochádza?

Áno. Je to: **x2 + y2 = konštanta**

Velocity constraint nám teda v skutočnosti hovorí, že hodnota x2 + y2 sa počas pohybu nemení. Ak bola na začiatku rovná r2, zostane rovná r2 stále.

Preto pohyb zostáva na tej istej kružnici.

Toto je význam slova **integrable**.

Velocity constraint môžeme „poskladať späť" do configuration constraint. Neobmedzuje iba okamžitú velocity – za týmto obmedzením existuje trvalé pravidlo určujúce, na akej množine configurations sa systém nachádza.

---

## 13. Prečo sa holonomic constraints nazývajú integrable

Teraz môžeme pochopiť všeobecný prípad.

Začali sme configuration constraintom: **g(theta) = 0**

Derivovaním sme získali: **dg/dtheta * theta_dot = 0**

Ak si matrix: **A(theta) = dg/dtheta**

môžeme velocity constraint zapísať ako: **A(theta) * theta_dot = 0**

V tomto prípade presne vieme, že velocity constraint vznikol z funkcie g.

To znamená, že za ním existuje configuration constraint. Keby sme poznali iba velocity equation, za vhodných podmienok ju môžeme integrovať a dostať späť vzťah typu: **g(theta) = konštanta**

Konkrétna konštanta závisí od počiatočnej configuration systému.

Preto sa takýto velocity constraint nazýva **integrable**.

A preto sú holonomic constraints spojené s integrable velocity constraints.

Nie je to teda iba matematický názov. Fyzicky to znamená: **Obmedzenie okamžitej velocity vzniká preto, že systém musí zostať na určitej časti configuration space.**

Pri bode na kružnici musí velocity smerovať pozdĺž kružnice preto, že bod je viazaný na kružnicu. Pri closed-chain robote musia joint velocities navzájom súvisieť preto, že links musia počas pohybu zostať spojené.

---

## 14. Nie každý velocity constraint však môžeme integrovať

Teraz prichádza zásadný rozdiel.

Existujú systémy, pri ktorých máme jasné obmedzenia na okamžitú velocity, ale neexistuje zodpovedajúca configuration constraint, ktorá by vylučovala určitú časť configuration space.

Najznámejším príkladom je koleso alebo minca kotúľajúca sa po rovine bez šmyku.

Predstav si mincu stojacu na hrane.

Jej configuration môžeme opísať štyrmi hodnotami:
- **x** a **y** určujú miesto kontaktu s podložkou
- **phi** určuje smer, ktorým je minca natočená
- **theta** určuje, o koľko sa minca otočila okolo svojej osi

Configuration space má preto **4 DOF**.

Teraz však pridáme fyzikálnu podmienku: **minca sa kotúľa bez šmyku.**

A tá vytvorí velocity constraints.

---

## 15. Čo znamená rolling without slipping

Ak je minca otočená určitým smerom, nemôže sa v danom okamihu pohybovať ľubovoľným smerom po podlahe.

Musí sa kotúľať v smere svojej roviny.

Ak smer mince určuje angle phi, smer jej pohybu v rovine môžeme vyjadriť pomocou cos phi a sin phi.

Zároveň musí byť translational speed mince spojená s tým, ako rýchlo sa otáča.

Ak má minca radius r a angular velocity theta_dot, jej forward speed je: **r * theta_dot**

To je známy vzťah z kotúľania bez šmyku. Keď sa koleso otočí o určitý uhol, prejde vzdialenosť zodpovedajúcu časti jeho obvodu.

Preto platí:
- **x_dot = r * theta_dot * cos phi**
- **y_dot = r * theta_dot * sin phi**

Tieto equations obmedzujú okamžitú velocity mince.

---

## 16. Minca má 4 DOF, hoci jej okamžitý pohyb je obmedzený

Toto je veľmi dôležité.

Minca má configuration: x, y, phi, theta a teda **4-dimensional configuration space**: R2 x T2

Napriek tomu sa v jednom konkrétnom okamihu nemôže pohybovať všetkými možnými smermi v tomto štvorrozmernom priestore.

Rolling without slipping jej okamžitú velocity obmedzuje.

Mohlo by sa preto zdať, že constraints znižujú počet DOF mince.

Podľa definície používanej v Modern Robotics však **DOF znamená dimension configuration space**, nie počet okamžite dostupných velocity directions.

A minca sa pri vhodnej postupnosti pohybov môže dostať do ľubovoľnej configuration svojho štvorrozmerného C-space.

Preto má stále **4 DOF**.

---

## 17. Ako môže minca dosiahnuť configuration, do ktorej sa nemôže pohnúť priamo

Toto je najlepšie pochopiteľné na aute.

Auto sa pri normálnej jazde nemôže okamžite pohnúť bokom. Jeho wheels sa kotúľajú dopredu a dozadu a no-slip condition zabraňuje bočnému pohybu.

Napriek tomu môžeš auto zaparkovať na miesto, ktoré sa nachádza vedľa jeho pôvodnej polohy.

Ako?

Neposunieš ho priamo bokom. Urobíš sériu povolených pohybov: pohneš sa dopredu, zatočíš, cúvneš, znovu zatočíš a postupne sa dostaneš na požadované miesto.

Takže: **„Nemôžem sa týmto smerom pohnúť práve teraz"** nie je to isté ako: **„Nemôžem sa do tejto configuration nikdy dostať."**

A presne tento rozdiel je základom nonholonomic constraints.

---

## 18. Nonholonomic constraints

Velocity constraint, ktorý nie je možné integrovať na ekvivalentný configuration constraint, nazývame:

**nonholonomic constraint** alebo **nonintegrable constraint**.

Rolling without slipping je typický príklad.

Constraint mince obmedzuje, aké velocities môže mať v danom okamihu, ale nevytvára jednoduchú podmienku typu g(q) = 0, ktorá by povedala, že určitá časť jej configuration space je úplne zakázaná.

Preto nonholonomic constraint:
- **znižuje množstvo okamžite možných velocities**
- ale **neznižuje dimension reachable configuration space**

Toto je zásadný rozdiel oproti holonomic constraint.

---

## 19. Prečo rolling constraint nemožno jednoducho previesť na configuration constraint

Pri kružnici sme mali jasnú trvalú väzbu: x2 + y2 = r2

Bez ohľadu na to, ako sa bod po kružnici pohybuje, jeho position musí túto podmienku stále spĺňať.

Pri rolling coin nič podobné medzi x, y, phi a theta vo všeobecnosti neexistuje.

To, kde minca skončí, totiž nezávisí iba od jej počiatočnej a konečnej orientation. Záleží aj na **ceste, ktorou sa tam dostala**.

Môže sa otočiť, kotúľať iným smerom, znovu zmeniť smer a tak postupne dosiahnuť configurations, ktoré by jedným okamžitým pohybom dosiahnuť nemohla.

Preto velocity constraints pri rolling without slipping nemožno jednoducho „zhrnúť" do jednej configuration equation, ktorá by rozdelila C-space na povolenú a zakázanú časť.

Matematicky povedané, pre takýto constraint neexistuje vhodná funkcia g, ktorej derivácie by vytvorili danú matrix A.

Preto je constraint **nonintegrable**, a teda **nonholonomic**.

---

## 20. Holonomic a nonholonomic constraints teda robia dve rôzne veci

Teraz môžeme oba prípady postaviť vedľa seba.

Pri **holonomic constraint** existuje podmienka na samotnú configuration. Napríklad bod musí zostať na kružnici alebo links closed-chain robota musia zostať spojené. Niektoré configurations sú preto úplne vylúčené. Holonomic constraints teda **znižujú dimension configuration space**.

Pri **nonholonomic constraint** nie je určitá časť C-space týmto spôsobom odstránená. Constraint namiesto toho hovorí, aké velocities sú v konkrétnom okamihu povolené. Systém môže mať menej okamžitých možností pohybu, ale kombináciou týchto pohybov môže stále dosiahnuť oveľa väčšiu časť configuration space.

To je dôvod, prečo je napríklad plánovanie pohybu auta odlišné od plánovania pohybu robota, ktorý sa môže okamžite pohybovať ľubovoľným smerom.

---

## 21. Rovnaký zápis môže predstavovať dva veľmi odlišné prípady

Velocity constraints oboch typov môžeme zapísať ako: **A(q) * q_dot = 0**

Samotný vzhľad equation nám teda nestačí na určenie, či je constraint holonomic alebo nonholonomic.

Musíme sa pýtať: **Existuje configuration constraint g(q), z ktorého tento velocity constraint vznikne derivovaním?**

Ak áno, constraint je **integrable** a súvisí s holonomic constraint.

Ak nie, ide o **nonintegrable** – nonholonomic constraint.

Toto je hlavný matematický rozdiel medzi nimi.

---

## 22. Prečo sú nonholonomic constraints dôležité v robotike

Nonholonomic constraints sa veľmi často objavujú pri **wheeled mobile robots**.

Bežné koleso sa ľahko kotúľa dopredu a dozadu, ale pri ideálnom rolling without slipping sa nemôže okamžite posúvať do strany.

Preto majú napríklad car-like robots alebo differential-drive robots obmedzené okamžité directions of motion.

To však neznamená, že sa nedokážu dostať na miesto ležiace bokom od nich. Potrebujú iba vhodnú trajectory.

Nonholonomic constraints sa môžu objavovať aj pri ďalších robotických problémoch, napríklad pri grasp contact kinematics alebo pri systémoch, kde hrá úlohu conservation of momentum.

Modern Robotics sa k nim podrobnejšie vráti v Chapter 13 pri wheeled mobile robots.

---

## 23. Najdôležitejšie je nezamieňať configuration a velocity

Celá lekcia stojí na jednom rozdiele.

**Configuration** hovorí: „Kde sa systém nachádza?"

**Velocity** hovorí: „Ako sa jeho configuration práve teraz mení?"

Constraint môže obmedziť prvú vec, druhú vec alebo oboje.

Ak constraint priamo určuje, ktoré configurations sú možné, máme **holonomic constraint**. Keď ho derivujeme podľa času, prirodzene získame aj obmedzenie velocity, pretože systém musí počas pohybu zostať medzi povolenými configurations.

Pri **nonholonomic constraint** je situácia iná. Configuration môže byť dosiahnuteľná, ale systém sa k nej nemusí vedieť pohnúť priamo. Obmedzený je spôsob pohybu, nie samotná existencia cieľovej configuration.

A preto môže mať systém napríklad 4 DOF, hoci má v jednom okamihu menej než štyri nezávislé velocity directions.

---

## 24. Dva príklady, ktoré si stačí zapamätať

Ak sa ti pojmy holonomic a nonholonomic začnú pliesť, pomôžu dva základné príklady.

**Bod na kružnici → holonomic**

Bod je fyzicky obmedzený na kružnicu. Platí configuration constraint: x2 + y2 = r2. Niektoré positions teda vôbec nie sú možné. Derivovaním dostaneme velocity constraint: x*x_dot + y*y_dot = 0. Velocity musí smerovať pozdĺž kružnice. Tento velocity constraint vieme spätne spojiť s configuration constraintom, preto je **integrable**.

**Koleso alebo minca bez šmyku → nonholonomic**

Koleso sa nemôže okamžite pohybovať do strany. Má teda velocity constraint. To však neznamená, že sa nemôže neskôr dostať na miesto ležiace vedľa neho. Môže sa tam dostať kombináciou jazdy a otáčania. Constraint preto neznižuje reachable configuration space rovnakým spôsobom ako kružnica. Je **nonintegrable**, a teda **nonholonomic**.

---

## 25. Zapamätaj si

- **Configuration constraint** obmedzuje configurations, v ktorých sa systém môže nachádzať.
- **Loop-closure equations** zabezpečujú, že links closed-chain mechanism zostávajú počas pohybu spojené.
- **Holonomic constraint** môžeme zapísať ako podmienku na samotnú configuration, napríklad g(theta) = 0.
- Ak máme n configuration variables a k nezávislých holonomic constraints, configuration space má za bežných podmienok dimenziu **n - k**.
- Keď configuration závisí od času, zapisujeme ju ako **theta(t)** a jej derivative **theta_dot** predstavuje velocity.
- Derivovaním holonomic constraint získame velocity constraint: **dg/dtheta * theta_dot = 0**
- Všeobecný zápis **A(theta) * theta_dot = 0** sa nazýva **Pfaffian constraint**.
- Ak velocity constraint pochádza z configuration constraint a môžeme ho spätne integrovať na podmienku configuration, je **integrable**.
- Holonomic constraints sú spojené s integrable velocity constraints.
- Ak velocity constraint nemožno previesť na ekvivalentný configuration constraint, je **nonintegrable**, teda **nonholonomic**.
- Nonholonomic constraint obmedzuje okamžité velocities, ale nemusí znižovať dimension reachable configuration space.
- Najdôležitejší príklad je **rolling without slipping**. Koleso alebo minca sa nemôže okamžite pohybovať ľubovoľným smerom, ale vhodnou postupnosťou povolených pohybov môže dosiahnuť configurations, ku ktorým sa nedokáže dostať priamym pohybom.

A práve toto je najdôležitejšia myšlienka Chapter 2.4:

**Holonomic constraint obmedzuje, kde systém môže byť. Nonholonomic constraint môže namiesto toho obmedzovať, ako sa tam môže dostať.**`;
