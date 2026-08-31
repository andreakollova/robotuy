// Chapter 3.2.3 Part 1 – Exponential Coordinates of Rotation
// Full lesson content - DO NOT SHORTEN

export const ch323p1Content = `# Chapter 3.2.3 Part 1 – Exponential Coordinates of Rotation

V predchádzajúcej časti Chapter 3 sme sa naučili opisovať orientáciu telesa pomocou **rotation matrix R** a jej okamžitú zmenu pomocou **angular velocity omega**. Vedeli sme teda povedať, akú orientation rigid body práve má, a ako sa táto orientation v danom okamihu mení. Teraz chceme urobiť ďalší krok. Chceme nájsť spôsob, ako z informácie o **osi a uhle rotation** priamo zostrojiť **konečnú rotation matrix**.

Táto myšlienka vedie k **exponential coordinates of rotation**. Namiesto deviatich entries rotation matrix stačia tri čísla: smer osi a veľkosť uhla. Z nich pomocou **matrix exponential** zostrojíme plnohodnotnú rotation matrix. Tým sa vytvára veľmi dôležité spojenie medzi priestorom instantaneous angular velocities **so(3)** a priestorom orientations **SO(3)**.

Táto lekcia je rozdelená na dve časti. V prvej časti zavedieme axis-angle representation, exponential coordinates, skew-symmetric matrix connection, matrix exponential a Rodriguesovu formulu. V druhej časti sa budeme venovať logarithm of rotation, singularitám a praktickým aspektom.

---

## 1. Axis-angle representation rotation

Každú rotation v 3D priestore si môžeme predstaviť ako otočenie okolo jednej pevnej osi o určitý uhol. Toto je podstata **Eulerovho rotation theorem**.

Aj keď sa teleso otáča okolo rôznych osí postupne, výsledná orientation sa vždy dá opísať jedinou rotation okolo jednej osi.

Na opis takejto rotation potrebujeme dve informácie.

Prvou je **rotation axis**. Tá je daná unit vectorom:

**omega-hat**

Strieška nad omega značí, že ide o vector s magnitude 1:

**||omega-hat|| = 1**

Druhou informáciou je **rotation angle**:

**theta**

udávaný v radiánoch.

Dvojica:

**(omega-hat, theta)**

sa nazýva **axis-angle representation** rotation.

---

## 2. Unit rotation axis omega-hat

Unit vector omega-hat má tri components:

**omega-hat = (omega1, omega2, omega3)**

a musí spĺňať:

**omega1^2 + omega2^2 + omega3^2 = 1**

Direction tohto vectora určuje os, okolo ktorej sa teleso otáča. Smer rotácie sa riadi **right-hand rule**: ak palec pravej ruky ukazuje v smere omega-hat, prsty sa zakrútia v smere positive rotation.

Napríklad ak je omega-hat = (0, 0, 1), rotation prebieha okolo z-axis. Ak omega-hat = (1, 0, 0), rotation je okolo x-axis.

Omega-hat však nemusí smerovať pozdĺž žiadnej coordinate axis. Môže to byť ľubovoľný unit vector v 3D priestore:

**omega-hat = (1/sqrt(3), 1/sqrt(3), 1/sqrt(3))**

Takáto os smeruje diagonálne rovnako ďaleko od všetkých troch coordinate axes.

---

## 3. Rotation angle theta

Angle theta udáva, o koľko sa teleso otočí okolo osi omega-hat.

Theta = 0 znamená žiadnu rotation. Identity matrix.

Theta = pi/2 je štvrťotáčka, teda 90 stupňov.

Theta = pi je otočenie o 180 stupňov.

Theta = 2pi je plná otáčka. Rigid body sa vráti do pôvodnej orientation.

Theta môže byť aj záporné. Záporná theta znamená rotation v opačnom smere, čo je ekvivalentné otočeniu smeru osi:

**(omega-hat, -theta) je rovnaké ako (-omega-hat, theta)**

Preto sa často volí konvencia, kde theta >= 0 a smer osi sa podľa toho upraví.

---

## 4. Prečo axis-angle nestačí samotné

Axis-angle representation (omega-hat, theta) je veľmi intuitívna. Ale pri práci s ňou sa objavia problémy.

Napríklad ak chceme **zreťaziť dve rotations**, nemôžeme jednoducho sčítať axis-angle pairs. Rotation okolo x-axis o 90 stupňov nasledovaná rotation okolo y-axis o 90 stupňov nedáva výsledok (x+y, 180°).

Composition rotations v axis-angle forme nie je priamočiara algebraická operácia.

Ďalším problémom je nejednoznačnosť. Rotation (omega-hat, theta) a (-omega-hat, -theta) opisujú tú istú physical rotation. Plná otáčka (omega-hat, 2pi) je rovnaká ako žiadna rotation (omega-hat, 0).

Preto potrebujeme **systematickejší matematický nástroj**, ktorý spája axis-angle representation s rotation matrices.

Tým nástrojom je **matrix exponential**.

---

## 5. Exponential coordinates of rotation

Namiesto dvojice (omega-hat, theta) môžeme axis a angle spojiť do jedného 3D vectora:

**omega-hat theta**

Tento vector má direction omega-hat a magnitude theta. Nazýva sa **exponential coordinate vector** rotation.

Tri components tohto vectora sú:

**(omega1 theta, omega2 theta, omega3 theta)**

Z exponential coordinate vectora vieme vždy spätne získať axis aj angle.

Magnitude vectora je:

**||omega-hat theta|| = theta**

pretože omega-hat je unit vector.

Direction vectora po normalizácii dáva:

**omega-hat = (omega-hat theta) / ||omega-hat theta||**

Exponential coordinates teda kompaktne kódujú rotation pomocou **troch čísiel** namiesto deviatich entries rotation matrix.

---

## 6. Prečo sa volajú exponential coordinates

Názov pochádza z toho, že z exponential coordinate vectora zostrojíme rotation matrix pomocou **matrix exponential**:

**R = e^[omega-hat]theta**

Na pravej strane je exponential funkcia, ale jej argument nie je obyčajné číslo. Je to **matrix**. Preto hovoríme o matrix exponential.

V hranaté zátvorke [omega-hat] je skew-symmetric matrix vytvorená z unit vectora omega-hat. Tú už poznáme z predchádzajúcej lekcie o angular velocities.

Celý výraz:

**[omega-hat]theta**

je element priestoru so(3), čiže 3 x 3 skew-symmetric matrix vynásobená scalárom theta.

Matrix exponential potom túto skew-symmetric matrix premení na rotation matrix, čiže element SO(3).

Takto vzniká presná mapa:

**so(3) → SO(3)**

z priestoru instantaneous angular velocities do priestoru orientations.

---

## 7. Pripomienka: skew-symmetric matrix [omega-hat]

Pre unit vector:

**omega-hat = (omega1, omega2, omega3)**

je skew-symmetric matrix:

\`\`\`
[omega-hat] =
|  0       | -omega3  |  omega2  |
|  omega3  |  0       | -omega1  |
| -omega2  |  omega1  |  0       |
\`\`\`

Táto matrix má vlastnosť:

**[omega-hat]T = -[omega-hat]**

a pre ľubovoľný vector v platí:

**[omega-hat]v = omega-hat x v**

kde x označuje cross product.

Skew-symmetric matrix teda kóduje cross product s omega-hat ako matrix multiplication.

---

## 8. Odkiaľ prichádza matrix exponential

Predstavme si rigid body, ktoré sa od začiatku otáča **constant angular velocity** okolo pevnej osi omega-hat rýchlosťou 1 rad/s.

V čase t = 0 je orientation:

**R(0) = I**

Orientation sa mení podľa diferenciálnej rovnice:

**Rdot(t) = [omega-hat] R(t)**

Toto je rovnica, ktorú sme odvodili v lekcii o angular velocities. Teraz ju však riešime pre **constant angular velocity**.

Pre skalárnu diferenciálnu rovnicu:

**xdot = a x**

poznáme riešenie:

**x(t) = e^(at) x(0)**

Analogicky pre matrixovú diferenciálnu rovnicu:

**Rdot = [omega-hat] R**

je riešenie:

**R(t) = e^([omega-hat]t) R(0)**

Keďže R(0) = I:

**R(t) = e^([omega-hat]t)**

V čase t = theta teda dostaneme:

**R(theta) = e^([omega-hat]theta)**

Matrix exponential teda vzniká ako riešenie rotation s constant angular velocity od identity orientation.

---

## 9. Definícia matrix exponential cez power series

Skalárna exponentiálna funkcia sa dá zapísať ako power series:

**e^x = 1 + x + x^2/2! + x^3/3! + ...**

Matrix exponential definujeme analogicky:

**e^A = I + A + A^2/2! + A^3/3! + ...**

kde A je štvorcová matrix.

Pre náš prípad:

**A = [omega-hat]theta**

dostaneme:

**e^([omega-hat]theta) = I + [omega-hat]theta + ([omega-hat]theta)^2/2! + ([omega-hat]theta)^3/3! + ...**

Táto nekonečná rada konverguje pre každú matrix A. Výsledkom je vždy platná rotation matrix, ak A je skew-symmetric.

V praxi by sme však nechceli sčítavať nekonečný rad. Preto existuje uzavretá formula.

---

## 10. Kľúčová vlastnosť [omega-hat]^3 = -[omega-hat]

Aby sme mohli power series zjednodušiť, potrebujeme jednu kľúčovú algebraickú vlastnosť.

Pre unit vector omega-hat platí:

**[omega-hat]^3 = -[omega-hat]**

To znamená, že tretia mocnina skew-symmetric matrix z unit vectora je záporná pôvodná matrix.

Z toho vyplýva cyklický pattern:

**[omega-hat]^1 = [omega-hat]**

**[omega-hat]^2 = [omega-hat]^2**

**[omega-hat]^3 = -[omega-hat]**

**[omega-hat]^4 = -[omega-hat]^2**

**[omega-hat]^5 = [omega-hat]**

**[omega-hat]^6 = [omega-hat]^2**

a tak ďalej.

Mocniny teda cyklicky opakujú dva vzory: [omega-hat] a [omega-hat]^2, striedavo s kladným a záporným znamienkom.

Toto pripomína cyklickosť mocnín imaginárnej jednotky i:

**i^1 = i, i^2 = -1, i^3 = -i, i^4 = 1**

A to nie je náhoda. Matrix exponential skew-symmetric matrix má veľmi podobnú štruktúru ako Eulerova formula pre komplexné čísla.

---

## 11. Rozdelenie power series na dve skupiny

Vďaka cyklickej vlastnosti mocnín [omega-hat] môžeme power series rozdeliť na dve skupiny.

Nepárne mocniny:

**[omega-hat]theta + [omega-hat]^3 theta^3/3! + [omega-hat]^5 theta^5/5! + ...**

keďže [omega-hat]^3 = -[omega-hat] a [omega-hat]^5 = [omega-hat], toto sa stáva:

**[omega-hat](theta - theta^3/3! + theta^5/5! - ...)**

Výraz v zátvorke je presne:

**sin theta**

Párne mocniny (okrem I):

**[omega-hat]^2 theta^2/2! + [omega-hat]^4 theta^4/4! + ...**

keďže [omega-hat]^4 = -[omega-hat]^2 a [omega-hat]^6 = [omega-hat]^2, toto sa stáva:

**[omega-hat]^2 (theta^2/2! - theta^4/4! + theta^6/6! - ...)**

Výraz v zátvorke je:

**1 - cos theta**

Celý matrix exponential sa teda zredukuje na tri členy.

---

## 12. Rodriguesova formula

Po zjednodušení power series dostaneme uzavretú formulu:

**e^([omega-hat]theta) = I + sin(theta)[omega-hat] + (1 - cos(theta))[omega-hat]^2**

Toto je **Rodriguesova formula** (Rodrigues' rotation formula).

Je to jedna z najdôležitejších formúl v tejto kapitole.

Na ľavej strane je matrix exponential skew-symmetric matrix. Na pravej strane sú tri jednoduché členy:

**I** je 3 x 3 identity matrix.

**sin(theta)[omega-hat]** je skew-symmetric matrix vynásobená sínusom uhla.

**(1 - cos(theta))[omega-hat]^2** je druhá mocnina skew-symmetric matrix vynásobená výrazom (1 - cos theta).

Výsledkom je vždy platná 3 x 3 rotation matrix patriaca do SO(3).

---

## 13. Prečo je Rodriguesova formula praktická

Rodriguesova formula je veľmi praktická, pretože na jej vyhodnotenie potrebujeme iba:

Skalárne funkcie sin a cos.

Matrix [omega-hat] a jej druhú mocninu [omega-hat]^2.

Žiadne nekonečné rady, žiadne iterácie. Jeden priamy výpočet.

Pre počítač alebo embedded controller v robotickom systéme je to výrazne jednoduchšie ako sčítavať členy power series.

Navyše Rodriguesova formula priamo ukazuje štruktúru rotation matrix. Sin a cos v nej jasne pripomínajú periodickú podstatu rotation. Ak zvýšime theta o 2pi, sin a cos sa vrátia na rovnaké hodnoty a dostaneme rovnakú rotation matrix.

---

## 14. Príklad: rotation okolo z-axis

Ukážeme si Rodriguesovu formulu na jednoduchom príklade. Chceme vytvoriť rotation matrix pre otočenie o uhol theta okolo z-axis.

Rotation axis je:

**omega-hat = (0, 0, 1)**

Skew-symmetric matrix je:

\`\`\`
[omega-hat] =
|  0 | -1 |  0 |
|  1 |  0 |  0 |
|  0 |  0 |  0 |
\`\`\`

Druhá mocnina:

\`\`\`
[omega-hat]^2 =
| -1 |  0 |  0 |
|  0 | -1 |  0 |
|  0 |  0 |  0 |
\`\`\`

Teraz dosadíme do Rodriguesovej formuly:

**R = I + sin(theta)[omega-hat] + (1 - cos(theta))[omega-hat]^2**

Identity matrix:

\`\`\`
I =
| 1 | 0 | 0 |
| 0 | 1 | 0 |
| 0 | 0 | 1 |
\`\`\`

Prvý člen sin(theta)[omega-hat]:

\`\`\`
|  0        | -sin(theta) |  0 |
|  sin(theta) |  0         |  0 |
|  0        |  0          |  0 |
\`\`\`

Druhý člen (1-cos(theta))[omega-hat]^2:

\`\`\`
| -(1-cos(theta)) |  0               |  0 |
|  0               | -(1-cos(theta)) |  0 |
|  0               |  0               |  0 |
\`\`\`

Sčítaním dostaneme:

\`\`\`
R =
|  cos(theta) | -sin(theta) | 0 |
|  sin(theta) |  cos(theta) | 0 |
|  0          |  0          | 1 |
\`\`\`

To je presne štandardná z-axis rotation matrix, ktorú už poznáme. Rodriguesova formula teda dáva správny výsledok.

---

## 15. Príklad: rotation okolo z-axis o 90 stupňov

Pre theta = pi/2:

**sin(pi/2) = 1**

**cos(pi/2) = 0**

Dosadením do predchádzajúceho výsledku:

\`\`\`
R =
|  0 | -1 | 0 |
|  1 |  0 | 0 |
|  0 |  0 | 1 |
\`\`\`

To je rotation, ktorá premení x-axis na y-axis a y-axis na negative x-axis. Presne quarter turn counter-clockwise okolo z-axis.

Pre theta = pi:

**sin(pi) = 0**

**cos(pi) = -1**

\`\`\`
R =
| -1 |  0 | 0 |
|  0 | -1 | 0 |
|  0 |  0 | 1 |
\`\`\`

To je 180-degree rotation okolo z-axis. Obe osi x a y sa obrátia.

---

## 16. Príklad: rotation okolo general axis

Uvažujme rotation o 120 stupňov okolo diagonálnej osi:

**omega-hat = (1/sqrt(3), 1/sqrt(3), 1/sqrt(3))**

**theta = 2pi/3**

Táto rotation cyklicky permutuje coordinate axes:

**x → y → z → x**

Exponential coordinates sú:

**omega-hat theta = (2pi/(3sqrt(3)), 2pi/(3sqrt(3)), 2pi/(3sqrt(3)))**

Tri čísla, z ktorých Rodriguesova formula vytvorí plnú 3 x 3 rotation matrix.

V praxi by sme postupovali: zostrojíme [omega-hat], vypočítame [omega-hat]^2, vyhodnotíme sin(2pi/3) a cos(2pi/3), a dosadíme do formuly.

Výsledná rotation matrix bude mať tvar permutation matrix, pretože cyklická permutácia axes je špeciálna rotation.

---

## 17. Exponential coordinates ako 3-parametrová representation

Rotation matrix R má 9 entries, ale iba 3 degrees of freedom. Exponential coordinates:

**omega-hat theta = (e1, e2, e3)**

priamo odrážajú tieto 3 degrees of freedom.

To je veľká výhoda oproti rotation matrix. Namiesto 9 čísiel s 6 constraints (ortonormality) máme 3 čísla bez additional constraints.

Ale pozor, exponential coordinates nie sú úplne bez problémov.

Ak theta = 0, rotation axis omega-hat je ľubovoľná. Ľubovoľný unit vector krát nula dáva nulový vector. Takže identity rotation zodpovedá nulovému exponential coordinate vectoru (0, 0, 0) bez ohľadu na axis.

Pre theta = pi existuje ďalšia nejednoznačnosť, pretože (omega-hat, pi) a (-omega-hat, pi) dávajú tú istú rotation matrix.

Tieto singularity sa budú podrobnejšie rozoberať v Part 2.

---

## 18. Spojenie s angular velocity

V lekcii o angular velocities sme videli, že angular velocity sa dá zapísať:

**omega = omega-hat theta-dot**

Ak sa teleso otáča constant angular speed 1 rad/s okolo osi omega-hat, potom theta-dot = 1 a:

**omega = omega-hat**

Po čase theta sekúnd sa teleso otočí o uhol theta a jeho orientation bude:

**R(theta) = e^([omega-hat]theta)**

Exponential coordinates teda môžeme chápať aj fyzikálne: sú to **angular velocity krát čas** pre constant-velocity rotation.

Ak sa teleso otáča constant omega = omega-hat po dobu theta sekúnd od identity orientation, výsledná orientation je daná matrix exponential.

---

## 19. Mapa exp: so(3) → SO(3)

Matrix exponential definuje zobrazenie:

**exp: so(3) → SO(3)**

Každému elementu so(3), čiže každej 3 x 3 skew-symmetric matrix [omega-hat]theta, priradí rotation matrix.

Toto zobrazenie je **surjective**: pre každú rotation matrix R existuje aspoň jeden element so(3), ktorého exponential je R.

Nie je však **injective**: rôzne elementy so(3) môžu dať rovnakú R. Napríklad [omega-hat]theta a [omega-hat](theta + 2pi) dávajú rovnakú rotation matrix.

Mapa exp je teda zobrazenie **z priestoru angular velocities do priestoru orientations**. Toto je presne ten most medzi so(3) a SO(3), ktorý sme avizovali.

---

## 20. Geometrická interpretácia exponential map

Exponential map si môžeme predstaviť nasledovne.

Začíname v identity rotation I v SO(3).

Vyberieme smer, ktorým sa chceme z I pohybovať. Tento smer je daný elementom so(3), čiže skew-symmetric matrix [omega-hat].

Potom sa pozdĺž tohto smeru posúvame o vzdialenosť theta.

Výsledok je rotation matrix R = e^([omega-hat]theta).

Toto je podobné myšlienke z Chapter 2 o C-space. Tam sme sa na sphere pohybovali po geodetickej z jedného bodu. Tu sa na SO(3) pohybujeme po geodetickej z identity.

Rozdiel je, že SO(3) nie je sphere, ale 3D rotation group. Geodetiky na SO(3) zodpovedajú constant-velocity rotations okolo pevnej osi.

---

## 21. Prečo exponential a nie obyčajné sčítanie

Mohlo by sa zdať, že na prechod z I do R stačí lineárna interpolácia:

**R(t) = I + t(R - I)**

Ale to nefunguje. Pre väčšinu t medzi 0 a 1 by výraz I + t(R - I) nebol platnou rotation matrix. Porušil by ortonormality conditions.

Exponential map automaticky zabezpečuje, že výsledok je vždy v SO(3). Matrix exponential skew-symmetric matrix je vždy orthogonal matrix s determinantom 1.

Preto exponential map nie je iba matematická konštrukcia. Je to **prirodzený spôsob generovania rotations**, ktorý rešpektuje geometriu SO(3).

---

## 22. Rodriguesova formula a Eulerova formula

Rodriguesova formula:

**e^([omega-hat]theta) = I + sin(theta)[omega-hat] + (1 - cos(theta))[omega-hat]^2**

pripomína Eulerovu formulu pre komplexné čísla:

**e^(i theta) = cos(theta) + i sin(theta)**

V Eulerovej formule i je imaginárna jednotka s vlastnosťou i^2 = -1.

V Rodriguesovej formule [omega-hat] má vlastnosť [omega-hat]^3 = -[omega-hat].

Oba prípady majú cyklické mocniny, ktoré vedú k sin a cos v exponential.

Eulerova formula opisuje rotations v 2D plane (unit circle v komplexnej rovine). Rodriguesova formula je jej 3D generalizácia na rotations v 3D priestore.

Toto nie je iba formálna analógia. V oboch prípadoch exponential premieňa element z algebra (imaginárne čísla resp. skew-symmetric matrices) na element z group (unit complex numbers resp. rotation matrices).

---

## 23. Overenie, že výsledok je platná rotation matrix

Rotation matrix R musí spĺňať:

**RT R = I**

**det R = 1**

Musíme overiť, že e^([omega-hat]theta) tieto podmienky spĺňa.

Pre prvú podmienku využijeme vlastnosť skew-symmetric matrix. Keďže [omega-hat]T = -[omega-hat], platí:

**(e^([omega-hat]theta))T = e^(-[omega-hat]theta)**

A pre matrix exponential platí:

**e^A e^(-A) = I**

Takže:

**(e^([omega-hat]theta))T e^([omega-hat]theta) = e^(-[omega-hat]theta) e^([omega-hat]theta) = I**

Pre determinant: exponential matrix s nulovou trace má determinant 1. Skew-symmetric matrix má vždy nulovú trace (diagonal entries sú nuly). Preto:

**det(e^([omega-hat]theta)) = e^(trace([omega-hat]theta)) = e^0 = 1**

Výsledok je teda vždy platná rotation matrix.

---

## 24. Čo je [omega-hat]^2 geometricky

Druhá mocnina skew-symmetric matrix z unit vectora omega-hat sa dá zapísať:

**[omega-hat]^2 = omega-hat omega-hatT - I**

kde omega-hat omega-hatT je outer product, čiže 3 x 3 matrix.

Výraz omega-hat omega-hatT je **projection matrix**. Pre ľubovoľný vector v:

**(omega-hat omega-hatT)v = omega-hat(omega-hatT v)**

čo je projection vectora v na smer omega-hat.

Preto:

**[omega-hat]^2 v = (omega-hat omega-hatT - I)v = projection(v na omega-hat) - v**

Geometricky [omega-hat]^2 teda odoberá z vectora v jeho component perpendicular na rotation axis a obráti ho.

Toto má priamy význam v Rodriguesovej formule: člen (1-cos(theta))[omega-hat]^2 opisuje, ako sa component vectora perpendicular na rotation axis otáča.

---

## 25. Rodriguesova formula pre rotation vectora

Rodriguesova formula sa dá použiť aj na rotation jedného vectora v bez toho, aby sme najprv konštruovali celú rotation matrix.

Rotation vectora v o uhol theta okolo osi omega-hat:

**v' = v cos(theta) + (omega-hat x v) sin(theta) + omega-hat(omega-hat . v)(1 - cos(theta))**

kde . je dot product.

Prvý člen škáluje pôvodný vector.

Druhý člen je contribution z cross product, čiže tangentná zložka rotation.

Tretí člen je projection na rotation axis, vynásobenú výrazom (1 - cos(theta)).

Táto formula je ekvivalentná maticovej verzii, ale niekedy je výpočtovo pohodlnejšia pre rotation jedného vectora.

---

## 26. Exponential coordinates a angular velocity: rozdiel

Je dôležité rozlíšiť:

**omega = omega-hat theta-dot**

a:

**omega-hat theta**

Prvý je **angular velocity** - vector, ktorý opisuje instantaneous rotational motion v danom čase.

Druhý sú **exponential coordinates** - vector, ktorý opisuje finite rotation od identity orientation.

Oba sú 3D vectory. Oba súvisia s rotation axis. Ale ich fyzikálny význam je odlišný.

Angular velocity je rate of change. Exponential coordinates sú celkový accumulated angle.

Ak si predstavíme analógiu s linear motion: angular velocity je ako linear velocity v, exponential coordinates sú ako displacement x.

Displacement = velocity x time, podobne exponential coordinates = angular velocity x time pri constant rotation.

---

## 27. Algebra so(3) a group SO(3)

Teraz môžeme presne definovať vzťah medzi so(3) a SO(3).

**SO(3)** je **Lie group** rotations. Je to množina všetkých 3 x 3 orthogonal matrices s determinantom 1. Operácia je matrix multiplication.

**so(3)** je **Lie algebra** asociovaná s SO(3). Je to množina všetkých 3 x 3 skew-symmetric matrices. Operácia v Lie algebra súvisí s Lie bracket, ale pre nás je hlavné, že so(3) opisuje infinitesimal rotations.

Matrix exponential je mapa z Lie algebra do Lie group:

**exp: so(3) → SO(3)**

Inverz tejto mapy sa nazýva logarithm:

**log: SO(3) → so(3)**

Exponential teda premieňa infinitesimal description (axis a angle) na finite rotation matrix.

---

## 28. Malé rotation: lineárna aproximácia

Pre veľmi malé theta (theta blízke nule) platí:

**sin(theta) ≈ theta**

**1 - cos(theta) ≈ theta^2/2 ≈ 0 pre veľmi malé theta**

Rodriguesova formula sa potom zjednoduší na:

**R ≈ I + theta[omega-hat]**

alebo ekvivalentne:

**R ≈ I + [omega-hat theta]**

Toto je **lineárna aproximácia** rotation matrix pre malé rotations.

Pre malé theta je teda rotation matrix takmer identity, s malou skew-symmetric perturbáciou.

Táto aproximácia je veľmi užitočná v praxi. Mnoho robotických controllerov pracuje s malými odchýlkami od desired orientation a používa linearizované modely.

Ak je napríklad theta = 0.01 rad (asi 0.57 stupňov), chyba aproximácie je rádovo theta^2 ≈ 0.0001, čo je zanedbateľné.

---

## 29. Malé rotation a angular velocity

Pre malé theta a krátky čas dt platí:

**R(dt) ≈ I + [omega]dt**

kde omega = omega-hat theta-dot.

Toto priamo súvisí s definíciou angular velocity. Ak sa teleso za krátky čas dt pootočí o malý uhol, zmena orientation je lineárne úmerná angular velocity a času.

Derivácia rotation matrix v čase t = 0:

**Rdot(0) = lim(dt→0) (R(dt) - I)/dt = [omega]**

Skew-symmetric matrix [omega] je teda presne instantaneous rate of change rotation matrix pri identity.

Toto uzatvára kruh: angular velocity z predchádzajúcej lekcie a exponential coordinates z tejto lekcie sú prepojené cez linearizáciu.

---

## 30. SO(3) a so(3) ako configuration a velocity space

Porovnajme so situáciou z Chapter 2.

V Chapter 2 sme mali **configuration space** (polohy systému) a **tangent space** (instantaneous velocities).

Teraz máme:

**SO(3)** je configuration space pre orientations.

**so(3)** je tangent space pri identity, opisujúci infinitesimal rotations.

Matrix exponential exp mapuje z tangent space do configuration space.

Logarithm log mapuje naspäť z configuration space do tangent space.

Pre malé rotations je exp takmer lineárna a rotation matrix je takmer I + skew-symmetric perturbácia.

Pre veľké rotations musíme použiť plnú Rodriguesovu formulu.

Toto je presne analogické k exponential map na sphere: pre malé pohyby je sphere takmer flat a exponential map takmer lineárna, pre veľké pohyby sa zakrivenie prejaví.

---

## 31. Prečo je exponential coordinates dôležitá pre robotiku

V robotike sú exponential coordinates všadeprítomné. Tu sú hlavné dôvody.

**Kompaktná representation.** Tri čísla namiesto deviatich. To je výhodné pre optimization, machine learning aj komunikačné protokoly.

**Interpolation.** Ak chceme plynule prejsť medzi dvoma orientáciami, exponential coordinates umožňujú lineárnu interpoláciu v so(3), z ktorej matrix exponential vytvorí smooth rotation path.

**Jacobians.** Pri výpočte robotických Jacobians sa exponential coordinates používajú na opis vzťahu medzi joint velocities a end-effector motion.

**Product of exponentials formula.** V ďalších kapitolách uvidíme, že celú kinematics robotického ramena môžeme zapísať ako product matrix exponentials, kde každý joint prispieva jedným exponential faktorom.

**Error representation.** Odchýlka aktuálnej orientation od desired orientation sa dá kompaktne opísať jedným 3D vectorom v exponential coordinates.

Exponential coordinates sú teda nie iba matematická kuriozita, ale **pracovný nástroj modernej robotiky**.

---

## Rekapitulácia najdôležitejších pojmov

**Axis-angle representation (omega-hat, theta)** opisuje rotation pomocou unit rotation axis omega-hat a rotation angle theta. Každá 3D rotation sa dá takto opísať.

**Exponential coordinates omega-hat theta** sú 3D vector, ktorý kombinuje axis a angle do jedného objektu. Jeho direction je rotation axis a magnitude je rotation angle.

**Skew-symmetric matrix [omega-hat]** prevádza cross product s omega-hat na matrix multiplication. Patrí do so(3) a je building block pre matrix exponential.

**Matrix exponential e^([omega-hat]theta)** premieňa element so(3) na rotation matrix v SO(3). Definuje sa ako power series analogická skalárnej exponential.

**Rodriguesova formula** je uzavretý tvar matrix exponential: **e^([omega-hat]theta) = I + sin(theta)[omega-hat] + (1 - cos(theta))[omega-hat]^2**. Umožňuje priamy výpočet bez nekonečných rád.

**Vlastnosť [omega-hat]^3 = -[omega-hat]** pre unit omega-hat je kľúčom k odvodeniu Rodriguesovej formuly. Cyklické mocniny vedú k sin a cos presne ako pri Eulerovej formule.

**Mapa exp: so(3) → SO(3)** je surjective ale nie injective. Každá rotation matrix sa dá zapísať ako matrix exponential, ale rôzne exponential coordinates môžu dať rovnakú rotation.

**Malá rotation aproximácia R ≈ I + [omega-hat theta]** linearizuje exponential map. Pre malé uhly je rotation matrix takmer identity plus skew-symmetric perturbácia.

**so(3) je Lie algebra** a **SO(3) je Lie group**. Exponential map ich spája podobne ako tangent space a configuration space v Chapter 2.

---

## Čo si z tejto lekcie odniesť

Každú 3D rotation môžeme opísať osou a uhlom. Unit vector omega-hat určuje os a scalár theta určuje uhol otočenia. Tieto dve informácie sa dajú spojiť do jedného 3D vectora omega-hat theta, ktorý nazývame exponential coordinates of rotation. Z tohto vectora zostrojíme rotation matrix pomocou matrix exponential: **R = e^([omega-hat]theta)**.

Matrix exponential definujeme ako power series analogickú skalárnej exponential. Vďaka cyklickej vlastnosti [omega-hat]^3 = -[omega-hat] sa nekonečná power series zredukuje na uzavretú Rodriguesovu formulu: **I + sin(theta)[omega-hat] + (1 - cos(theta))[omega-hat]^2**. Tá dáva priamy výpočet rotation matrix z osi a uhla bez akýchkoľvek iterácií.

Exponential map vytvára most medzi Lie algebra so(3) a Lie group SO(3). Každá skew-symmetric matrix [omega-hat]theta z so(3) sa cez exponential premení na rotation matrix v SO(3). Táto mapa je surjective, takže pokrýva všetky rotations, ale nie je injective, pretože rôzne exponential coordinates môžu dať rovnakú rotation. Pre malé uhly je exponential map takmer lineárna a rotation matrix sa dá aproximovať ako I + [omega-hat theta].

V druhej časti tejto lekcie sa budeme venovať **logarithm of rotation**, teda opačnej operácii: ako z danej rotation matrix R získať axis a angle. Uvidíme aj singularity pri theta = 0 a theta = pi a ich praktické dôsledky.`;
