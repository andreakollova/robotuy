// Chapter 2.4 – Lekcia 7: Configuration and Velocity Constraints
// Full lesson content - DO NOT SHORTEN

export const ch24Content = `# Lekcia 7: Configuration and Velocity Constraints

V predchádzajúcej lekcii sme sa naučili, že configuration space nemusíme vždy opisovať minimálnym počtom nezávislých súradníc. Niekedy je praktickejšie použiť viac premenných a pomocou constraints — obmedzení určiť, ktoré kombinácie týchto premenných predstavujú skutočne možné konfigurácie systému. Takýto spôsob sme nazvali implicit representation.

Teraz túto myšlienku posunieme ďalej. Constraints totiž nemusia obmedzovať iba to, kde sa robot môže nachádzať. Môžu obmedzovať aj to, ako sa robot môže v danom okamihu pohybovať.

To sú dve rozdielne veci. Predstav si bod, ktorý je mechanicky pripevnený ku kruhovej dráhe. Tento bod sa mimo kružnice jednoducho nemôže nachádzať. Jeho možné configurations sú teda priamo obmedzené. Potom si predstav auto. Auto sa môže nachádzať na mieste ležiacom napravo od svojej aktuálnej polohy, ale nedokáže sa tam okamžite posunúť priamo bokom. Musí sa tam dostať vhodnou kombináciou jazdy dopredu, dozadu a zatáčania. Cieľová configuration teda môže byť možná, hoci určitý okamžitý smer pohybu možný nie je.

Prvý prípad nás privedie k **holonomic constraints**. Druhý k **nonholonomic constraints**.

Rozdiel medzi nimi patrí medzi základné myšlienky robotickej kinematiky.

---

## 01. Closed-chain robot nemôže mať ľubovoľné joint coordinates

Začnime známym **four-bar linkage** — štvorčlánkovým mechanizmom. Tvoria ho štyri links spojené revolute joints do uzavretej mechanickej slučky. Jeden link predstavuje ground a zostáva pevný, zatiaľ čo ostatné sa voči nemu pohybujú.

Každému revolute jointu môžeme priradiť jeden joint angle. Ak teda mechanizmus obsahuje štyri revolute joints, môžeme jeho stav zapísať pomocou štyroch uhlov, napríklad θ1, θ2, θ3 a θ4.

To však neznamená, že všetky štyri uhly môžeme nastavovať nezávisle.

Links majú pevné dĺžky a ich konce musia zostať spojené. Keď zmeníme jeden joint angle, ostatné časti mechanizmu sa musia pohybovať tak, aby sa uzavretá slučka nerozpojila. Ak by sme jednoducho vybrali štyri ľubovoľné hodnoty uhlov, vo väčšine prípadov by sme dostali geometricky nemožnú situáciu — posledné links by sa už nestretli v spoločnom jointe.

Closed-chain mechanism preto potrebuje matematické podmienky, ktoré hovoria:

**„Po prejdení celej mechanickej slučky sa musíme dostať presne tam, kde sme začali."**

Tieto podmienky nazývame **loop-closure equations**.

![Štvorkĺbový mechanizmus](/book/ch2/fig2-10.png)

---

## 02. Čo loop-closure equations skutočne vyjadrujú

Predstav si, že si na four-bar linkage vyberieme jeden bod a začneme od neho postupovať po mechanizme. Prejdeme prvým linkom, potom druhým, tretím a nakoniec štvrtým.

Každý link má určitú dĺžku a orientation. Prechod cez jeden link preto môžeme chápať ako určitý posun v priestore. Keďže však ide o uzavretú slučku, po prejdení všetkých links sa musíme dostať presne späť do počiatočného bodu.

Pri planar four-bar linkage to znamená, že po prejdení slučky nesmie zostať žiadny výsledný posun v smere x ani v smere y. Zároveň musí správne sedieť aj orientation jednotlivých links, aby sa mechanizmus geometricky uzavrel.

Z toho vzniknú tri nezávislé podmienky: dve súvisiace s position a jedna s orientation.

Ich konkrétny trigonometrický zápis teraz nie je najdôležitejší. Oveľa dôležitejšie je pochopiť, čo tieto rovnice predstavujú.

**Loop-closure equations** nie sú umelé matematické pravidlá pridané k robotovi zvonka. Sú iba matematickým zápisom fyzickej skutočnosti, že links sú spojené a počas pohybu musia zostať spojené.

---

## 03. Štyri joint angles neznamenajú štyri DOF

Four-bar linkage môžeme teda reprezentovať pomocou štyroch hodnôt:

**θ = [θ1, θ2, θ3, θ4]**

Na jeho zápis používame štyri čísla. Ako sme sa však naučili v predchádzajúcej lekcii, počet čísel v reprezentácii nie je automaticky počet degrees of freedom.

Tieto štyri joint angles totiž musia spĺňať tri nezávislé loop-closure constraints. Preto zostáva iba jedna hodnota, ktorú môžeme meniť nezávisle.

Môžeme si to predstaviť veľmi jednoducho:

**4 configuration variables - 3 independent constraints = 1 DOF**

Ak teda zvolíme jednu vhodnú nezávislú hodnotu, napríklad uhol jedného linku, ostatné joint angles už nemôžeme zvoliť ľubovoľne. Musia sa prispôsobiť tak, aby mechanizmus zostal uzavretý.

Preto má four-bar linkage iba **1 DOF**, hoci pri implicitnej reprezentácii jeho configuration používame štyri joint angles.

---

## 04. Constraints vyberajú možné konfigurácie z väčšieho priestoru

Na four-bar linkage sa môžeme pozrieť ešte jedným spôsobom.

Keď používame štyri joint angles, matematicky si môžeme predstaviť veľký priestor obsahujúci všetky možné kombinácie θ1, θ2, θ3 a θ4. Každá štvorica čísel predstavuje jeden bod v tomto väčšom priestore joint coordinates.

Väčšina týchto bodov však nezodpovedá skutočnému four-bar linkage.

Predstavovali by konfigurácie, pri ktorých by sa mechanizmus fyzicky nedokázal uzavrieť. Links by sa museli natiahnuť, skrátiť alebo od seba odpojiť.

Platné sú iba tie body, ktoré spĺňajú všetky loop-closure equations.

Skutočný configuration space mechanizmu preto tvorí iba menšiu jednorozmernú množinu vloženú do väčšieho priestoru štyroch joint coordinates.

Nemusíme si vedieť štvorrozmerný priestor vizualizovať. Dôležitá je samotná logika:

**Joint coordinates vytvoria väčší priestor možností a constraints z neho vyberú iba fyzicky možné configurations.**

Presne to je princíp implicit representation.

---

## 05. Všeobecný zápis configuration constraints

Pri komplikovanejšom robotovi môžeme mať desiatky configuration variables. Namiesto ich neustáleho vypisovania ich preto spojíme do jedného vectora.

Môžeme napríklad písať:

**θ = [θ1, θ2, ..., θn]**

Vector θ teda predstavuje celú configuration robota v zvolenej reprezentácii.

Ak musí robot zároveň spĺňať niekoľko constraints, môžeme ich spojiť do jednej vector-valued function, ktorú označíme g. Potom môžeme všetky configuration constraints kompaktne zapísať:

**g(θ) = 0**

Tento zápis znamená, že configuration θ je povolená iba vtedy, keď spĺňa všetky podmienky obsiahnuté vo funkcii g.

Ak máme n configuration variables a k nezávislých configuration constraints, potom za bežných podmienok zostáva:

**n - k DOF**

Configuration space teda môžeme chápať ako priestor s dimenziou n - k vložený do väčšieho n-rozmerného priestoru použitých configuration variables.

---

## 06. Holonomic constraints obmedzujú samotnú configuration

Configuration constraints, ktoré môžeme vyjadriť priamo ako vzťah medzi configuration variables, nazývame **holonomic constraints**.

Typický zápis je:

**g(θ) = 0**

Holonomic constraint teda priamo hovorí, ktoré configurations sú možné a ktoré nie.

Four-bar linkage je typickým príkladom. Loop-closure equations hovoria, ktoré kombinácie joint angles dokážu vytvoriť uzavretý mechanizmus. Ostatné kombinácie nie sú súčasťou jeho configuration space.

Ďalší príklad už poznáme z rigid body. Ak rigid body reprezentujeme pomocou polôh niekoľkých bodov, vzdialenosti medzi týmito bodmi musia zostať konštantné. Nemôžeme napríklad posunúť jeden bod nezávisle tak, aby sa teleso natiahlo. Distance constraints určujú, ktoré kombinácie polôh bodov skutočne predstavujú jedno rigid body.

Holonomic constraint preto nerieši iba to, ako sa systém práve pohybuje. Odstraňuje celé configurations, ktoré systém fyzicky nemôže nadobudnúť.

A tým **znižuje dimension jeho configuration space**.

---

## 07. Pohyb znamená, že configuration závisí od času

Doteraz sme configuration opisovali ako jeden bod θ. Robot však nezostáva nehybný. Pri pohybe sa jeho configuration postupne mení.

Preto môžeme písať:

**θ(t)**

Tento zápis jednoducho znamená, že configuration závisí od času.

Ak napríklad θ1 predstavuje joint angle, môže mať v čase t = 0 hodnotu 20°, o sekundu neskôr 25° a potom 30°. Hodnota θ1 sa teda v čase mení.

Ak však robot podlieha holonomic constraint, nestačí, aby ho spĺňal iba na začiatku a na konci pohybu. Musí ho spĺňať v každom okamihu.

Preto musí počas celej trajectory platiť:

**g(θ(t)) = 0**

Robot sa teda môže pohybovať iba po configuration space vytvorenom týmto constraintom. Nemôže z neho počas pohybu „odskočiť" a neskôr sa naň vrátiť.

A práve z tejto požiadavky prirodzene vznikajú **velocity constraints**.

---

## 08. Configuration constraint automaticky obmedzí aj velocity

Najjednoduchšie to uvidíme na bode, ktorý sa môže pohybovať iba po kružnici s polomerom r.

Jeho position môžeme opísať dvoma hodnotami x a y. Ak však musí zostať na kružnici, nemôžu byť x a y ľubovoľné. Musí vždy platiť:

$$x^2 + y^2 = r^2$$

Toto je configuration constraint. Hovorí nám, kde sa bod môže nachádzať.

Teraz si predstav, že sa bod začne pohybovať.

Ak má stále zostať na kružnici, nemôže mať ľubovoľnú velocity. Predstav si napríklad bod úplne na pravej strane kružnice. Ak by sa v tom okamihu začal pohybovať doprava, okamžite by kružnicu opustil.

V tomto bode sa môže pohybovať iba pozdĺž kružnice — teda v smere jej dotyčnice.

To znamená, že constraint na position automaticky vytvoril aj constraint na velocity.

A matematicky sa z jedného k druhému dostaneme pomocou derivácie podľa času.

---

## 09. Derivácia constraintu krok za krokom

Začíname configuration constraintom:

$$x^2 + y^2 = r^2$$

Keď sa bod pohybuje, x aj y sú funkciami času. Môžeme teda písať x(t) a y(t). Polomer r sa nemení, pretože kružnica má stále rovnakú veľkosť.

Teraz celú rovnicu derivujeme podľa času.

Derivácia x2 je 2x*x_dot a derivácia y2 je 2y*y_dot. Pravá strana r2 je konštanta, takže jej derivácia je nula.

Dostaneme:

**2x*x_dot + 2y*y_dot = 0**

Po vydelení dvomi:

**x*x_dot + y*y_dot = 0**

Symbol x_dot znamená velocity v smere x a y_dot velocity v smere y.

Nová rovnica už teda nehovorí, kde sa bod nachádza. Hovorí, aké velocities môže mať v konkrétnej position.

Predstavme si, že sa nachádza úplne napravo na kružnici. Vtedy platí:

**x = r, y = 0**

Dosadíme:

**r*x_dot + 0*y_dot = 0**

Keďže r nie je nula:

**x_dot = 0**

Bod teda v tejto position nemôže mať okamžitú velocity v smere x. Môže sa pohybovať iba v smere y, teda hore alebo dole pozdĺž dotyčnice ku kružnici.

Pôvodná equation hovorila: **„Zostaň na kružnici."**

Jej derivácia hovorí: **„Pohybuj sa takým smerom, aby si kružnicu neopustil."**

To je najdôležitejšia intuícia za prechodom od configuration constraints k velocity constraints.

---

## 10. Všeobecný prechod od configuration k velocity

Rovnaký princíp platí pre všeobecný holonomic constraint:

**g(θ) = 0**

Keď sa robot pohybuje:

**g(θ(t)) = 0**

Túto rovnicu derivujeme podľa času. Pomocou chain rule dostaneme:

**(dg/dθ) * θ_dot = 0**

Symbol θ_dot označuje vector joint velocities. Ak θ obsahuje napríklad päť joint coordinates, θ_dot obsahuje informáciu o tom, ako rýchlo sa každá z týchto piatich hodnôt práve mení.

Výraz dg/dθ opisuje, ako citlivo sa jednotlivé constraints menia pri malých zmenách jednotlivých configuration variables. Ak máme viac constraints a viac configuration variables, tento výraz je matrix.

Neskôr sa s podobnými matrices budeme veľmi často stretávať pod názvom **Jacobian matrix**.

Celý vzťah:

**(dg/dθ) * θ_dot = 0**

teda znamená, že joint velocities nemôžu byť ľubovoľné. Musia byť zvolené tak, aby sa robot pri svojom pohybe stále nachádzal medzi configurations spĺňajúcimi g(θ) = 0.

---

## 11. Pfaffian velocity constraints

Velocity constraints sa často zapisujú všeobecnejšie ako:

**A(θ) * θ_dot = 0**

Takémuto tvaru hovoríme **Pfaffian constraint**.

Matrix A závisí od aktuálnej configuration systému a určuje, ktoré okamžité velocities sú v tejto configuration povolené.

Pri holonomic constraint, ktorý sme práve derivovali, by platilo:

**A(θ) = dg/dθ**

Nie každý Pfaffian velocity constraint však musí vzniknúť týmto spôsobom.

A práve toto je kľúčový bod celej lekcie.

Môžeme mať velocity constraint, ktorý vznikol derivovaním configuration constraintu. Ale môžeme mať aj velocity constraint, za ktorým žiadna ekvivalentná configuration equation neexistuje.

Rozdiel medzi týmito dvoma prípadmi nás vedie k pojmom **integrable** a **nonintegrable** constraints.

---

## 12. Čo znamená integrable constraint

Vráťme sa ešte raz ku kružnici.

Po derivovaní sme dostali velocity constraint:

**x*x_dot + y*y_dot = 0**

Predstav si teraz, že by sme dostali iba túto rovnicu a nevedeli by sme, odkiaľ pochádza.

Mohli by sme sa opýtať:

Existuje nejaká trvalá podmienka na x a y, ktorej derivovaním dostaneme práve tento velocity constraint?

Áno.

Vieme, že:

**d/dt (x2 + y2) = 2x*x_dot + 2y*y_dot**

Ak teda platí:

**x*x_dot + y*y_dot = 0**

potom sa hodnota x2 + y2 počas pohybu nemení.

Môžeme preto písať:

**x2 + y2 = konštanta**

Ak bola táto konštanta na začiatku r2, potom zostane r2 počas celého pohybu.

Bod teda zostáva na tej istej kružnici.

Velocity constraint sme tak dokázali „poskladať späť" do constraintu na samotnú configuration.

A práve toto znamená, že je **integrable**.

---

## 13. Holonomic constraints a integrability

Teraz môžeme rovnakú myšlienku preniesť na všeobecný robot.

Začali sme holonomic constraintom:

**g(θ) = 0**

Derivovaním sme dostali:

**(dg/dθ) * θ_dot = 0**

Ak označíme:

**A(θ) = dg/dθ**

môžeme písať:

**A(θ) * θ_dot = 0**

V tomto prípade vieme, že velocity constraint pochádza z určitej funkcie g. Za obmedzením velocity teda existuje trvalá podmienka na configuration.

Preto je takýto velocity constraint **integrable**.

Pri integrácii nemusíme vždy dostať presne g(θ) = 0. Všeobecnejšie môžeme dostať:

**g(θ) = konštanta**

Konkrétna hodnota konštanty závisí od počiatočnej configuration.

Fyzický význam je však rovnaký. Systém zostáva počas pohybu na určitej množine configurations a velocity constraint iba zabezpečuje, že z tejto množiny neodíde.

Preto sú holonomic constraints spojené s integrable velocity constraints.

---

## 14. Nie každý velocity constraint pochádza z configuration constraintu

Teraz prichádza druhý prípad.

Existujú systémy, pri ktorých vieme presne povedať, aké okamžité velocities sú povolené, ale tieto obmedzenia nevieme previesť na jednoduchú podmienku typu:

**g(q) = 0**

ktorá by určovala zakázanú časť configuration space.

Typickým príkladom je **rolling without slipping** — kotúľanie bez šmyku.

![Minca kotúľajúca sa po rovine bez šmyku](/book/ch2/fig2-11.png)

Predstav si mincu stojacu na hrane a kotúľajúcu sa po rovnej podlahe.

Jej configuration môžeme opísať štyrmi hodnotami. Súradnice x a y určujú jej polohu na podlahe, uhol φ určuje smer, ktorým je minca orientovaná, a uhol θ určuje, o koľko sa minca otočila okolo svojej vlastnej osi.

Configuration môžeme zapísať:

**q = (x, y, φ, θ)**

Minca má teda štvorrozmerný configuration space a **4 DOF**.

Ak však požadujeme, aby sa kotúľala bez šmyku, jej okamžitý pohyb už nie je ľubovoľný.

---

## 15. Rolling without slipping obmedzuje okamžitý pohyb

Predstav si mincu otočenú určitým smerom φ.

Ak sa kotúľa bez šmyku, nemôže sa v tom istom okamihu ľubovoľne posúvať do strán. Jej translational velocity musí smerovať v smere, v ktorom sa kotúľa.

Ak je smer mince daný uhlom φ, jednotkový smer dopredu v rovine môžeme vyjadriť pomocou:

**cos φ, sin φ**

Zároveň musí existovať vzťah medzi tým, ako rýchlo sa minca otáča, a tým, ako rýchlo postupuje po podlahe.

Ak má radius r a angular velocity θ_dot, potom pri rolling without slipping je jej forward speed:

**r * θ_dot**

Pre jednotlivé zložky velocity teda dostaneme:

**x_dot = r * θ_dot * cos φ**
**y_dot = r * θ_dot * sin φ**

Tieto rovnice hovoria, že x-ová a y-ová velocity nemôžu byť vybrané nezávisle od orientation a rotation mince.

Minca teda nemôže mať v každom okamihu ľubovoľnú velocity.

To však ešte neznamená, že má menej configurations.

---

## 16. Obmedzená velocity neznamená automaticky menej DOF

Toto je jedna z najdôležitejších častí celej lekcie.

Minca má configuration:

**q = (x, y, φ, θ)**

a jej configuration space má štyri dimenzie.

Rolling constraint však znamená, že v konkrétnej configuration nie sú všetky možné velocity directions okamžite dostupné.

Mohlo by sa preto zdať, že constraints znižujú počet DOF mince.

Podľa definície používanej v Modern Robotics však **degrees of freedom znamenajú dimension configuration space**, nie počet smerov, ktorými sa systém dokáže pohnúť práve v tomto okamihu.

A vhodnou postupnosťou povolených pohybov sa minca môže dostať do configurations, ktoré nemôže dosiahnuť jediným okamžitým pohybom.

Preto rolling constraint nemusí zmenšiť jej configuration space.

Minca môže mať stále **4 DOF**, hoci jej instantaneous velocity je obmedzená.

---

## 17. Auto ukazuje rozdiel medzi „teraz" a „nikdy"

Tento rozdiel je ešte intuitívnejší na aute.

Predstav si auto stojace na parkovisku. Miesto priamo napravo od auta môže byť úplne platnou configuration. Auto tam fyzicky môže stáť.

Napriek tomu sa tam nedokáže dostať tak, že sa jednoducho posunie o dva metre bokom. Bežné kolesá sa pri **rolling without slipping** kotúľajú dopredu a dozadu, ale nedovoľujú okamžitý bočný pohyb.

To však neznamená, že sa auto na miesto napravo nikdy nedostane.

Môže sa pohnúť dopredu, zatočiť, cúvnuť, opäť zatočiť a postupne zmeniť svoju position aj orientation. Paralelné parkovanie je praktickým príkladom presne tohto princípu.

Preto musíme rozlišovať dve tvrdenia:

**„Týmto smerom sa nemôžem pohnúť práve teraz."**

a

**„Do tejto configuration sa vôbec nemôžem dostať."**

Nie sú to rovnaké tvrdenia.

Holonomic constraints súvisia predovšetkým s druhým. Nonholonomic constraints môžu vytvoriť prvý prípad bez toho, aby automaticky vytvorili druhý.

---

## 18. Nonholonomic constraints

Velocity constraint, ktorý nemožno integrovať na ekvivalentný configuration constraint, nazývame **nonholonomic constraint** alebo **nonintegrable constraint**.

**Rolling without slipping** je klasickým príkladom.

Constraint obmedzuje okamžitú velocity mince alebo kolesa. Nehovorí však, že existuje určitá jednoduchá časť configuration space, do ktorej sa systém nikdy nemôže dostať.

Preto nonholonomic constraint obmedzuje **instantaneous motion**, ale nemusí znižovať **dimension reachable configuration space**.

Toto je zásadný rozdiel oproti holonomic constraint.

Pri holonomic constraint sú niektoré configurations priamo vylúčené.

Pri nonholonomic constraint môžu byť configurations dosiahnuteľné, ale systém sa medzi nimi musí pohybovať určitým spôsobom.

---

## 19. Prečo rolling constraint nie je configuration constraint

Pri bode na kružnici sme mali jasný vzťah:

$$x^2 + y^2 = r^2$$

Nezáleží na tom, akou cestou sa bod po kružnici pohyboval. Jeho position musí vždy spĺňať túto rovnicu.

Pri rolling coin situácia vyzerá inak.

To, ako sa zmenia x, y, φ a θ, závisí od celej trajectory, ktorú minca vykoná.

Minca môže najskôr zmeniť smer, potom sa kotúľať, opäť zmeniť smer a pokračovať inak. Výsledná configuration teda nevzniká iba z jedného jednoduchého algebraického vzťahu medzi aktuálnymi hodnotami x, y, φ a θ.

Dôležitá je cesta, ktorou sa systém do tejto configuration dostal.

Preto rolling velocity constraints vo všeobecnosti nemožno jednoducho nahradiť ekvivalentnou configuration equation typu g(q) = 0.

Sú **nonintegrable**, a preto ich označujeme ako **nonholonomic**.

---

## 20. Holonomic a nonholonomic constraints robia odlišné veci

Teraz môžeme oba typy constraints porovnať priamo.

Pri **holonomic constraint** existuje podmienka na samotnú configuration. Bod musí napríklad zostať na kružnici alebo links closed-chain robota musia zostať spojené. Niektoré configurations sú tým úplne odstránené z configuration space. Holonomic constraints preto **znižujú dimension configuration space**.

Pri **nonholonomic constraint** nemusí byť určitá configuration zakázaná. Constraint namiesto toho určuje, akými okamžitými smermi sa systém môže pohybovať. Systém teda môže mať menej instantaneous velocity directions, ale vhodnou kombináciou povolených pohybov môže stále dosiahnuť configurations, ktoré neležia priamo v smere jeho aktuálnej velocity.

Preto napríklad plánovanie pohybu auta vyzerá úplne inak než plánovanie pohybu objektu, ktorý sa môže ľubovoľne posúvať dopredu, dozadu aj do strán.

---

## 21. Rovnaká equation môže skrývať dva rozdielne prípady

Velocity constraints môžeme všeobecne zapisovať:

**A(q) * q_dot = 0**

Tento zápis sám osebe ešte nehovorí, či máme holonomic alebo nonholonomic systém.

Rozhodujúca otázka znie:

**Existuje configuration constraint g(q), z ktorého môžeme tento velocity constraint získať derivovaním?**

Ak áno, velocity constraint je **integrable**. Za obmedzením velocity existuje zodpovedajúca podmienka na samotnú configuration a constraint súvisí s holonomic constraintom.

Ak nie, velocity constraint je **nonintegrable** a ide o nonholonomic constraint.

Samotný tvar A(q)*q_dot = 0 teda nestačí. Rozhodujúca je jeho **integrability**.

---

## 22. Prečo sú nonholonomic constraints v robotike také dôležité

**Nonholonomic constraints** sa veľmi často objavujú pri **wheeled mobile robots** — kolesových mobilných robotoch.

Bežné koleso sa môže jednoducho kotúľať dopredu alebo dozadu. Pri ideálnom rolling without slipping však nemôže mať ľubovoľnú bočnú velocity.

Preto napríklad car-like robot nedokáže okamžite zmeniť svoju position ľubovoľným smerom.

Podobne differential-drive robot s dvoma poháňanými kolesami nedokáže okamžite vykonať čistý bočný posun. Musí svoju position a orientation meniť pomocou pohybov, ktoré jeho kolesá mechanicky umožňujú.

To zásadne ovplyvňuje **motion planning**. Nestačí nájsť geometricky voľnú čiaru medzi počiatočnou a cieľovou configuration. Musíme zároveň nájsť trajectory, ktorú robot vzhľadom na svoje velocity constraints dokáže fyzicky vykonať.

Nonholonomic constraints sa preto stanú veľmi dôležité pri štúdiu wheeled mobile robots.

---

## 23. Configuration a velocity nesmieme zamieňať

Celá lekcia sa v skutočnosti dá postaviť na jednom základnom rozdiele.

**Configuration** odpovedá na otázku: **„V akom stave alebo polohe sa systém nachádza?"**

**Velocity** odpovedá na otázku: **„Ako sa táto configuration práve teraz mení?"**

Holonomic constraint obmedzuje samotné možné configurations. Keď ho derivujeme podľa času, prirodzene dostaneme aj velocity constraint, pretože robot sa musí pohybovať tak, aby medzi povolenými configurations zostal.

Nonholonomic constraint funguje inak. Nemusí vylučovať cieľovú configuration. Môže iba obmedzovať, akým spôsobom sa k nej systém dokáže dostať.

Preto môže mať systém napríklad štvorrozmerný configuration space, ale v jednom konkrétnom bode nemusí mať k dispozícii štyri nezávislé instantaneous velocity directions.

Tento rozdiel je zásadný pre pochopenie mobilnej robotiky.

---

## 24. Dva príklady, podľa ktorých si rozdiel zapamätáš

Ak sa ti niekedy začnú pojmy holonomic a nonholonomic pliesť, stačí sa vrátiť k dvom základným príkladom.

**Bod na kružnici — holonomic constraint**

Bod musí vždy spĺňať: x2 + y2 = r2

Nemôže sa nachádzať mimo kružnice. Configuration space je preto priamo obmedzený.

Keď túto podmienku derivujeme, dostaneme: x*x_dot + y*y_dot = 0

Velocity musí byť taká, aby bod kružnicu neopustil. Tento velocity constraint vieme spätne spojiť s configuration constraintom, preto je **integrable**.

**Koleso alebo minca bez šmyku — nonholonomic constraint**

Koleso sa nemôže okamžite pohybovať ľubovoľným smerom. Rolling without slipping teda vytvára velocity constraint.

To však neznamená, že všetky body ležiace bokom od kolesa sú navždy nedosiahnuteľné. Systém môže pomocou vhodnej postupnosti pohybov zmeniť orientation a postupne sa na také miesto dostať.

Constraint teda obmedzuje **ako** sa systém pohybuje, nie nevyhnutne **kam** sa môže dostať.

Preto je **nonintegrable** a nazývame ho nonholonomic.

---

:::summary

Pri robotických systémoch musíme rozlišovať medzi **configuration constraints** a **velocity constraints**. Configuration constraint určuje, ktoré konfigurácie sú fyzicky možné. Velocity constraint určuje, akým spôsobom sa configuration môže v konkrétnom okamihu meniť.

Pri closed-chain mechanisms vznikajú **loop-closure equations**, pretože links musia zostať spojené do uzavretej slučky. Four-bar linkage môžeme napríklad reprezentovať štyrmi joint angles, ale tri nezávislé loop-closure constraints spôsobia, že mechanizmus má iba 1 DOF.

Všeobecný configuration constraint môžeme zapísať:

**g(θ) = 0**

Takýto constraint nazývame **holonomic constraint**. Pri n configuration variables a k nezávislých holonomic constraints má configuration space za bežných podmienok dimenziu:

**n - k**

Keď sa robot pohybuje, jeho configuration zapisujeme ako θ(t). Holonomic constraint musí platiť počas celého pohybu:

**g(θ(t)) = 0**

Derivovaním podľa času dostaneme velocity constraint:

**(dg/dθ) * θ_dot = 0**

Všeobecnejšie môžeme velocity constraints zapisovať v **Pfaffian form**:

**A(θ) * θ_dot = 0**

Ak tento velocity constraint vznikol derivovaním configuration constraintu a môžeme ho spätne integrovať na vzťah typu g(θ) = konštanta, nazývame ho **integrable**. Práve s takýmito velocity constraints sú spojené holonomic constraints.

Nie každý velocity constraint je však integrable. Pri **rolling without slipping** môže byť okamžitý pohyb kolesa alebo mince obmedzený bez toho, aby existovala ekvivalentná configuration equation odstraňujúca časť reachable configuration space. Takýto constraint nazývame **nonholonomic** alebo **nonintegrable**.

Najdôležitejší rozdiel preto môžeme vyjadriť veľmi jednoducho:

**Holonomic constraint obmedzuje, kde systém môže byť.**

**Nonholonomic constraint môže namiesto toho obmedzovať, ako sa systém môže pohybovať a ako sa do určitej configuration dostane.**

Auto je najlepším intuitívnym príkladom. Nemôže sa okamžite posunúť bokom, ale vhodnou kombináciou jazdy a zatáčania sa môže dostať na miesto vedľa svojej pôvodnej polohy. Jeho okamžité velocity directions sú obmedzené, ale z toho automaticky nevyplýva zmenšenie dimension jeho reachable configuration space.

A práve toto rozlíšenie medzi configuration a velocity je základom pre ďalšie štúdium robotického pohybu, motion planningu a kinematiky wheeled mobile robots.

:::`;
