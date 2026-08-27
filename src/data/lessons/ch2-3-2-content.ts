// Chapter 2.3.2 – Lekcia 6: Reprezentácia konfiguračného priestoru
// Full lesson content - DO NOT SHORTEN

export const ch232Content = `# Lekcia 6: Reprezentácia konfiguračného priestoru

V predchádzajúcej lekcii sme sa venovali **topology — topológii configuration space**. Zistili sme, že samotný počet degrees of freedom nám hovorí iba to, koľko dimenzií konfiguračný priestor má. Nehovorí nám však, akú má tento priestor štruktúru ani ako sú jeho jednotlivé configurations navzájom usporiadané.

Napríklad rovina R2 a povrch gule S2 sú oba dvojrozmerné priestory. Na určenie jedného bodu v oboch prípadoch potrebujeme dve nezávislé hodnoty. Napriek tomu sa správajú úplne inak. Rovina pokračuje do nekonečna, zatiaľ čo povrch gule sa uzatvára sám do seba.

Teraz však potrebujeme urobiť ďalší krok. V robotike nestačí vedieť, aký configuration space systém má. Ak chceme configuration robota uložiť do počítača, vypočítať jeho pohyb, sledovať jeho velocity alebo riadiť end-effector, každú konkrétnu configuration musíme vedieť zapísať pomocou čísel.

Spôsob, akým tieto čísla zvolíme, nazývame **representation — reprezentácia** configuration space.

Pri jednoduchých Euclidean spaces je to prirodzené. Bod na priamke opíšeme jedným číslom, bod v rovine dvomi a bod v trojrozmernom priestore tromi. Pri zakrivených alebo cyklických spaces však vzniká problém: najmenší počet čísel nemusí byť zároveň najpraktickejší spôsob, ako configuration reprezentovať.

Práve preto sa v robotike používajú dva hlavné prístupy — **explicit parametrization** a **implicit representation**.

---

## 01. Configuration space a representation nie sú to isté

Najskôr musíme veľmi presne oddeliť dve veci.

**Configuration space** je množina všetkých configurations, ktoré systém môže nadobudnúť. **Representation** je spôsob, akým jednu konkrétnu configuration zapíšeme pomocou čísel.

Rovnaký fyzický stav preto môžeme reprezentovať rôznymi spôsobmi.

Predstav si mobilného robota v miestnosti. Ak si coordinate frame zvolíme v ľavom dolnom rohu, robot môže mať súradnice napríklad x = 2 m a y = 3 m. Ak však coordinate frame presunieme do stredu miestnosti, jeho číselné súradnice sa zmenia, hoci sa robot fyzicky vôbec nepohol.

Podobne môžeme rovnakú vzdialenosť zapísať ako 1 meter alebo 1000 milimetrov. Čísla vyzerajú inak, ale fyzická realita je rovnaká.

To znamená, že representation závisí od našej voľby, ale configuration space samotný nie.

Topológia opisuje samotný priestor. Representation je iba matematický jazyk, ktorý používame na jeho zápis.

---

## 02. Prečo vôbec potrebujeme číselnú reprezentáciu

Robotický systém musí pracovať numericky. Riadiaci program potrebuje poznať aktuálne joint positions, porovnávať configurations, počítať ich zmenu v čase a určovať position alebo orientation end-effectora.

Preto každému bodu configuration space musíme priradiť určité čísla.

Pri Euclidean spaces je to jednoduché. Bod v R môžeme zapísať jedným číslom x. Bod v R2 dvojicou (x, y) a bod v R3 trojicou (x, y, z).

Dôležité je, že v R3 môžeme x, y aj z meniť nezávisle a každá trojica reálnych čísel predstavuje platný bod priestoru.

Pri zakrivených spaces to už nemusí fungovať rovnako jednoducho. Tam sa ukáže, že počet DOF a počet čísel použitých v reprezentácii nemusia byť totožné.

---

## 03. Dva DOF ešte neznamenajú dve bezproblémové súradnice

Predstav si povrch Zeme. Na určenie miesta na jej povrchu nám stačia dve hodnoty — napríklad **latitude** a **longitude**.

Povrch gule má preto 2 DOF.

Rovnako má 2 DOF aj bod pohybujúci sa po rovine. Tam používame x a y.

Na rovine fungujú x a y bez problémov všade. Neexistuje miesto, kde by jedna z týchto súradníc prestala dávať zmysel.

Pri latitude a longitude je situácia iná. Najvýraznejšie to vidíme na póloch.

Na severnom póle sa všetky poludníky stretávajú v jednom bode. Longitude preto prestáva byť jednoznačná. Hodnoty 0°, 30°, 90° alebo 180° môžu na póle označovať presne ten istý fyzický bod.

Samotný povrch Zeme nemá žiadny problém. Problém vznikol iba v súradniciach, ktoré sme si zvolili.

---

## 04. Singularity of representation

Miesto, kde sa zvolená reprezentácia prestane správať jednoznačne alebo stabilne, nazývame **singularity of the representation — singularita reprezentácie**.

Pri latitude a longitude je typickým príkladom pól.

Je veľmi dôležité pochopiť, že singularita reprezentácie nie je automaticky singularitou samotného configuration space.

Robot sa môže po povrchu gule cez severný pól pohybovať úplne plynulo. Fyzicky sa nemusí diať nič zvláštne.

Problém nastáva iba v číslach, ktoré používame na opis jeho position.

To je zásadné rozlíšenie, pretože neskôr sa v robotike stretneme aj s inými typmi singularities. Nie každá singularita znamená, že sa robot mechanicky dostal do „pokazeného" stavu. Niekedy zlyháva iba zvolený spôsob reprezentácie.

---

## 05. Prečo singularita komplikuje velocity

Problém sa ešte viac zvýrazní pri velocity.

Predstav si bod, ktorý sa po povrchu Zeme pohybuje rovnomernou rýchlosťou veľmi blízko severného pólu. Fyzicky sa pohybuje plynulo. Jeho skutočná speed nemusí byť vôbec veľká.

Longitude sa však môže meniť veľmi rýchlo, pretože poludníky sú v blízkosti pólu veľmi blízko pri sebe.

Bod sa teda môže fyzicky posunúť iba o malú vzdialenosť, ale číselná hodnota longitude môže urobiť veľký skok.

Ak velocity počítame ako zmenu súradníc v čase, môžeme tak dostať veľké hodnoty, hoci skutočný pohyb je pokojný.

Pre riadenie a výpočty je to nepríjemné. Ak chceme representation, ktorá sa dobre správa v celom configuration space, musíme problém vyriešiť.

A práve tu vstupujú do hry **explicit** a **implicit** representation.

---

## 06. Explicit parametrization

Pri **explicit parametrization** sa snažíme používať presne toľko nezávislých parametrov, koľko má systém DOF.

Ak má configuration space n DOF, použijeme n čísel.

Povrch gule má 2 DOF, takže môžeme použiť latitude a longitude. Planar rigid body má 3 DOF, preto ho môžeme reprezentovať ako q = (x, y, θ).

Výhodou explicit parametrization je úspornosť. Nepoužívame viac čísel, než potrebujeme, a každý parameter predstavuje jednu nezávislú zložku configuration.

Nevýhodou je, že pri zakrivených spaces nemusí existovať jedna jediná minimálna parametrizácia, ktorá sa dobre správa všade.

Pri guli sa napríklad objaví singularita na póloch. Pri rotačných reprezentáciách sa podobné problémy objavia pri určitých orientations.

Explicit parametrization teda používa minimum čísel, ale môže za to zaplatiť singularitami.

---

## 07. Coordinate chart

Jedným riešením je nepokúšať sa celý configuration space pokryť jedinou parametrizáciou.

Namiesto toho môžeme použiť viac lokálnych reprezentácií. Každá z nich dobre funguje iba v určitej časti priestoru.

Takúto lokálnu reprezentáciu nazývame **coordinate chart**.

Chart teda nemusí opisovať celý configuration space. Stačí, ak v určitej oblasti poskytuje dobré a jednoznačné súradnice.

Pri povrchu gule by sme napríklad mohli používať jednu sústavu súradníc v oblasti, kde funguje dobre. Keď sa dostaneme do blízkosti jej singularity, prejdeme na inú sústavu.

Fyzický bod zostáva rovnaký. Mení sa iba jeho číselný zápis.

Je to podobné ako pri coordinate frames. Jeden fyzický bod môže mať v jednom frame úplne iné coordinates než v inom frame.

---

## 08. Atlas

Ak viac coordinate charts spolu pokrýva celý configuration space, nazývame ich **atlas**.

Názov je veľmi výstižný. Geografický atlas tiež nepoužíva jednu jedinú mapu na všetko. Má viac máp jednotlivých oblastí.

Matematický atlas funguje podobne. Každý chart pokrýva určitú časť priestoru a jednotlivé charts sa prekrývajú, aby sme medzi nimi vedeli prechádzať.

Výhodou je, že v každom charte stále používame minimálny počet parametrov.

Nevýhodou je väčšia zložitosť. Program musí vedieť, ktorý chart práve používa, kedy sa blíži k jeho problematickej oblasti a ako prejsť na inú reprezentáciu.

Pri R3 nič také nepotrebujeme. Jedna trojica x, y, z funguje všade.

Pri zakrivených spaces však môže atlas predstavovať cenu za používanie minimálneho počtu parametrov.

---

## 09. Implicit representation

Druhým prístupom je **implicit representation**.

Tu sa vzdáme požiadavky používať minimum čísel. Namiesto toho použijeme viac premenných, ale pridáme constraints, ktoré určia, ktoré kombinácie hodnôt sú platné.

Predstav si povrch jednotkovej gule.

Vieme, že má 2 DOF.

Namiesto latitude a longitude môžeme bod opísať trojicou:

**(x, y, z)**

Používame tri čísla, ale x, y a z nemôžu byť ľubovoľné. Musia spĺňať:

**x2 + y2 + z2 = 1**

Táto equation zabezpečí, že bod zostane na povrchu jednotkovej gule.

Máme teda tri variables a jeden independent constraint. Zostávajú dve nezávislé možnosti.

Preto:

**3 premenné - 1 nezávislé obmedzenie = 2 DOF**

Presne toľko, koľko povrch gule skutočne má.

---

## 10. Počet čísel nie je počet DOF

Toto je jedna z najdôležitejších myšlienok celej lekcie.

**Počet čísel použitých v representation nemusí byť rovnaký ako počet DOF.**

Pri guli používame tri čísla x, y a z, ale stále máme iba 2 DOF.

Dôvod je jednoduchý: tieto tri hodnoty nie sú nezávislé.

Ak zvolíme x a y, z už nemôžeme nastaviť ľubovoľne. Musí spĺňať equation x2 + y2 + z2 = 1.

Všeobecne platí, že ak máme systém s n DOF a reprezentujeme ho pomocou m čísel, kde m je väčšie než n, musia medzi týmito číslami existovať constraints, ktoré zredukujú počet nezávislých hodnôt späť na n.

Pri 2 DOF môžeme použiť tri čísla a jeden constraint. Pri 3 DOF môžeme použiť štyri čísla a jeden constraint alebo napríklad viac hodnôt a viac independent constraints.

Rozhodujúca otázka preto nie je „koľko čísel zapisujeme", ale **koľko z nich môžeme meniť nezávisle**.

---

## 11. Embedded configuration space

Implicit representation môžeme chápať aj geometricky.

Povrch gule je dvojrozmerný, ale nachádza sa v R3. Je teda **embedded — vložený** do trojrozmerného priestoru.

Používame jednoduché coordinates x, y a z väčšieho priestoru a constraint nám určuje, ktoré body patria na samotný surface.

Rovnaký princíp sa používa aj pri robotoch.

Configuration space môže byť komplikovaný zakrivený priestor, ale môžeme ho reprezentovať vo väčšom Euclidean space. Potom použijeme jednoduché číselné coordinates a constraints vyberú iba fyzicky platné configurations.

Veľmi užitočná intuícia preto je:

**väčší jednoduchý priestor + constraints = skutočný configuration space**

Nemusíme vždy hľadať minimálne súradnice priamo na komplikovanom priestore. Niekedy je praktickejšie vložiť ho do väčšieho priestoru.

---

## 12. Prečo používať viac čísel

Na prvý pohľad môže implicit representation pôsobiť neefektívne.

Ak má povrch gule 2 DOF, prečo používať tri numbers?

Pretože minimum čísel nemusí znamenať maximum praktickosti.

Latitude a longitude používajú iba dve hodnoty, ale majú singularity.

Cartesian coordinates x, y, z používajú tri hodnoty, ale fungujú plynulo na celom povrchu gule. Bod môže prejsť cez severný pól a jeho x, y a z sa stále menia plynulo.

Nemusíme prepínať charts a nemusíme riešiť zlyhanie longitude.

Za jedno redundantné číslo teda získame veľmi užitočnú vlastnosť — **representation, ktorá funguje globálne bez coordinate singularity tohto typu**.

V robotike je to často výhodnejšie než striktne minimalizovať počet parametrov.

---

## 13. Explicit a implicit representation

Oba prístupy riešia rovnaký problém: ako previesť bod configuration space na čísla.

Pri **explicit parametrization** používame presne toľko independent parameters, koľko má priestor DOF.

Pri guli napríklad latitude a longitude.

Pri **implicit representation** používame viac čísel a pridáme constraints.

Pri guli napríklad x, y, z s podmienkou x2 + y2 + z2 = 1.

Oba zápisy opisujú ten istý configuration space. Rozdiel je iba v stratégii.

Explicit parametrization je úspornejšia, ale môže vyžadovať viac coordinate charts alebo môže obsahovať singularities.

Implicit representation obsahuje redundanciu, ale často dáva jednoduchšiu a globálnejšiu formu vhodnú na výpočty.

Nie je teda správne pýtať sa, ktorý prístup je vždy lepší. Ide o **trade-off**.

---

## 14. Orientation rigid body

Celá táto téma sa stane veľmi praktickou pri reprezentácii **orientation rigid body** v 3D priestore.

Voľné rigid body má 6 DOF. Tri patria position a tri orientation.

Samotná orientation má teda **3 rotational DOF**.

Mohli by sme očakávať, že najlepšia representation bude používať tri numbers.

Takéto reprezentácie existujú. Príkladom sú **roll, pitch, yaw angles** alebo rôzne **Euler angles**.

Používajú presne tri parametre, takže sú minimálne.

Majú však problém podobný latitude a longitude: pri určitých orientations vznikajú **singularities**.

Samotné teleso pritom môže byť vo fyzicky úplne normálnej orientation. Problém opäť vzniká iba v zvolenom číselnom zápise.

Pri robotike je to nepríjemné, pretože orientation často neustále meníme a používame v ďalších výpočtoch.

---

## 15. Rotation matrix

Modern Robotics preto používa na orientation najmä **rotation matrix**.

Rotation matrix má rozmer 3 × 3 a obsahuje deväť čísel.

To môže pôsobiť zvláštne. Orientation má iba 3 DOF, ale zapisujeme deväť values.

Týchto deväť hodnôt však nie je nezávislých.

Stĺpce rotation matrix predstavujú osi jedného coordinate frame vyjadrené v inom frame. Musia mať jednotkovú dĺžku a musia byť navzájom kolmé. Zároveň musí matrix predstavovať správnu orientation, nie zrkadlenie.

Tieto podmienky vytvárajú constraints.

Výsledkom je, že z deviatich numbers zostávajú iba **3 independent rotational DOF**.

Rotation matrix je teda typický príklad **implicit representation**.

Podobne ako pri guli používame viac čísel, ale constraints zabezpečujú správny počet nezávislých možností.

---

## 16. Prečo deväť čísel môže byť lepších než tri

Použiť deväť hodnôt namiesto troch môže vyzerať neefektívne, ale rotation matrix má veľké praktické výhody.

Predovšetkým sa vyhýba **coordinate singularities** typickým pre trojparametrové angle representations.

Zároveň veľmi dobre zapadá do **linear algebra**.

Rotation matrices môžeme jednoducho násobiť, skladať, používať na transformáciu vectorov a meniť pomocou nich vyjadrenie medzi coordinate frames.

A presne tieto operácie budeme v robotike robiť neustále.

Preto platí veľmi praktické pravidlo:

**Najmenší počet parametrov nemusí znamenať najjednoduchšiu matematiku.**

Niekedy je redundantná representation lepšia práve preto, že s ňou dokážeme pracovať čistejšie a stabilnejšie.

---

## 17. Unit quaternion

Rotation matrix nie je jediná možnosť.

Ďalšou známou reprezentáciou orientation je **unit quaternion**.

Quaternion používa štyri numbers.

Orientation však má stále 3 DOF, takže tieto štyri hodnoty nemôžu byť všetky nezávislé. Unit quaternion musí mať jednotkovú dĺžku.

Máme teda:

**4 čísla + 1 constraint → 3 DOF**

Aj quaternion je implicitná representation.

V porovnaní s rotation matrix používa menej hodnôt a zároveň sa vyhýba singularitám typickým pre Euler-angle representations.

Má však jednu zaujímavú vlastnosť: quaternion q a quaternion -q reprezentujú tú istú fyzickú orientation.

Preto hovoríme, že quaternion representation poskytuje **double cover** priestoru orientations.

Modern Robotics bude však hlavne používať rotation matrices, pretože prirodzene zapadajú do ďalšieho výkladu rigid-body motions.

---

## 18. Closed-chain robots

Implicit representation je veľmi užitočná aj pri **closed-chain mechanisms**.

Pri closed chain sa jednotlivé joint coordinates nemôžu meniť nezávisle. Ak zmeníme jeden joint, ostatné sa musia prispôsobiť tak, aby mechanická slučka zostala uzavretá.

Môžeme sa pokúsiť nájsť minimálny počet independent coordinates, ale pri komplikovanom mechanizme to môže byť veľmi nepraktické.

Jednoduchší prístup je použiť všetky joint coordinates.

Týchto čísel bude viac než skutočný počet DOF.

Potom však pridáme **loop-closure constraints**, ktoré určia, ktoré combinations joint positions sú fyzicky možné.

Skutočný configuration space closed-chain robota tak môžeme chápať ako priestor s menšou dimenziou vložený do väčšieho priestoru všetkých joint coordinates.

Je to presne rovnaký princíp ako pri povrchu gule vloženom do R3.

---

## 19. Explicit vs. implicit — čo je skutočný rozdiel

Teraz už môžeme oba prístupy porovnať bez zbytočných definícií.

Pri **explicit parametrization** používame minimum čísel. Každé zodpovedá jednej nezávislej freedom.

Výhodou je úspornosť.

Nevýhodou je, že pri zakrivených spaces môže vzniknúť singularita alebo potreba používať viac coordinate charts.

Pri **implicit representation** používame viac čísel, než je počet DOF, ale tieto numbers spájajú constraints.

Výhodou môže byť jedna globálna, plynulá representation vhodná na výpočty.

Nevýhodou je redundancia a potreba udržiavať constraints splnené.

Najjednoduchší príklad ostáva povrch gule:

**latitude, longitude → explicit**

**x, y, z + x2 + y2 + z2 = 1 → implicit**

Configuration space je v oboch prípadoch rovnaký. Mení sa iba spôsob, akým ho zapisujeme.

---

## 20. Prečo je táto lekcia dôležitá

Táto lekcia nie je iba matematická odbočka. Pripravuje základ pre ďalšiu časť robotiky.

Pri rigid-body motions budeme potrebovať presne reprezentovať position a orientation. Pri orientation použijeme **rotation matrices**, teda implicit representation.

Neskôr ich budeme používať pri transformáciách medzi coordinate frames, forward kinematics, velocities aj pri práci s end-effectorom.

Pri closed-chain robots sa implicit representation zasa objaví cez joint coordinates a **loop-closure constraints**.

Najdôležitejšia pointa preto nie je zapamätať si definície explicit a implicit.

Dôležité je pochopiť problém, ktorý riešia.

Configuration space je geometrický priestor všetkých možných configurations. Počítač však potrebuje čísla.

Pri jednoduchých Euclidean spaces ich môžeme zvoliť priamo. Pri zakrivených spaces môže minimálny počet coordinates vytvárať singularities.

Máme preto dve možnosti: buď používame minimum parametrov a podľa potreby viac lokálnych charts, alebo použijeme viac čísel spojených constraints.

A práve druhý prístup bude v robotike mimoriadne dôležitý.

---

:::summary

**Configuration space** je množina všetkých možných configurations systému. **Representation** je iba spôsob, akým konkrétnu configuration zapíšeme pomocou čísel. Rovnaký configuration space môžeme reprezentovať rôznymi spôsobmi bez toho, aby sa fyzický systém zmenil.

Pri jednoduchých Euclidean spaces je reprezentácia priamočiara. Bod v R3 zapíšeme pomocou x, y a z a všetky tri hodnoty sú nezávislé.

Pri zakrivených spaces môže minimálna representation vytvárať singularities. Povrch gule má 2 DOF a môžeme ho reprezentovať latitude a longitude. Ide o **explicit parametrization**, pretože používame presne dve independent values. Na póloch však longitude prestáva byť jednoznačná.

Jedným riešením sú **coordinate charts**. Viac charts, ktoré spolu pokrývajú celý priestor, tvorí **atlas**.

Druhým riešením je **implicit representation**. Pri nej používame viac numbers než je počet DOF, ale pridáme constraints. Povrch jednotkovej gule môžeme napríklad reprezentovať ako x, y, z s podmienkou x2 + y2 + z2 = 1. Máme tri numbers, ale stále iba 2 DOF.

Dôležitým robotickým príkladom je orientation rigid body. Má 3 rotational DOF, ale **rotation matrix** používa deväť numbers spojených constraints. **Unit quaternion** používa štyri numbers a jeden constraint.

Implicit representation sa veľmi prirodzene používa aj pri **closed-chain robots**, kde môžeme použiť všetky joint coordinates a constraints určia, ktoré combinations predstavujú fyzicky možné configurations.

Najdôležitejšia myšlienka celej lekcie je preto jednoduchá:

**Počet čísel použitých v representation nemusí byť rovnaký ako počet DOF. Rozhoduje počet nezávislých hodnôt.**

A ešte praktickejšie:

**Minimum parametrov nemusí znamenať najlepšiu reprezentáciu. Niekedy je výhodnejšie použiť viac čísel, ak tým získame stabilnejšiu a jednoduchšiu matematiku.**

:::`;
