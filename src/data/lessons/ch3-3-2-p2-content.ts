// Chapter 3.3.2 – Twists (Part 2 of 2)
// Full lesson content - DO NOT SHORTEN

export const ch332p2Content = `# Modern Robotics – Chapter 3.3.2

# Twists – Part 2 of 2

V prvej časti sme si vytvorili základnú predstavu o tom, čo je **twist**. Naučili sme sa, že twist je 6D vector, ktorý opisuje instantaneous motion rigid body. Poznáme dve jeho formy: body twist Vb a spatial twist Vs. Vieme, odkiaľ pochádzajú vzťahy:

**[Vb] = T-1 Tdot**

a:

**[Vs] = Tdot T-1**

a chápeme, že angular časti omega-b a omega-s sú tá istá fyzická angular velocity vyjadrená v rôznych frames, zatiaľ čo linear časti vb a vs majú odlišné geometrické interpretácie.

Teraz sa posunieme ďalej. V tejto časti sa naučíme tri veľmi dôležité veci:

Ako prechádzať medzi body a spatial twistom pomocou **Adjoint transformation**.

Ako twist geometricky chápať ako pohyb okolo **screw axis**.

A ako twist správne **normalizovať** a pracovať s pojmami **pitch** a **screw motion**.

---

## 1. Adjoint representation of SE(3)

V prvej časti sme videli, že body twist a spatial twist opisujú ten istý physical motion. Preto musí existovať spôsob, ako jeden previesť na druhý.

Tento prevod sa nazýva **Adjoint transformation** a zapisujeme ho:

**Vs = [AdT] Vb**

kde [AdT] je 6 x 6 matrix odvodená z homogeneous transformation T.

Prečo 6 x 6? Pretože twist je 6D vector a transformácia medzi dvoma 6D vektormi vyžaduje 6 x 6 matrix.

Adjoint transformation nie je iba jednoduchá rotation. Obsahuje v sebe rotation aj translation, pretože pri premene twistu medzi frames musíme brať do úvahy obe zložky.

---

## 2. Tvar Adjoint matrix

Ak máme transformation:

\`\`\`
T =
| R | p |
| 0 | 1 |
\`\`\`

potom Adjoint matrix je:

\`\`\`
[AdT] =
| R      | 0   |
| [p]R   | R   |
\`\`\`

kde [p] je skew-symmetric matrix vectora p.

Táto matrix má teda štyri bloky. V hornom ľavom rohu je rotation matrix R. V hornom pravom rohu je nulová 3 x 3 matrix. V dolnom ľavom rohu je súčin [p]R. A v dolnom pravom rohu je opäť R.

Všimni si, že R sa objaví trikrát. To nie je náhoda. Rotation ovplyvňuje obe časti twistu a navyše translation prispieva k premene linear časti.

---

## 3. Prečo Adjoint matrix vyzerá práve takto

Pozrime sa na to intuitívne.

Angular časti omega-b a omega-s sú tá istá angular velocity v rôznych frames. Preto na premenu angular časti stačí rotation:

**omega-s = R omega-b**

To vysvetľuje horný riadok [AdT]: R vľavo a 0 vpravo.

Linear časti vb a vs však nie sú jednoducho rovnaká velocity v rôznych coordinates. Preto nestačí iba rotovať vb. Musíme pridať ešte príspevok od angular velocity a position:

**vs = R vb + [p] R omega-b**

To je presne to, čo robí dolný riadok [AdT]: [p]R vľavo a R vpravo.

Celkovo teda:

\`\`\`
| omega-s |   | R    | 0 | | omega-b |
| vs      | = | [p]R | R | | vb      |
\`\`\`

---

## 4. Adjoint transformation funguje aj opačne

Ak vieme previesť body twist na spatial twist pomocou:

**Vs = [AdTsb] Vb**

potom opačne:

**Vb = [AdTbs] Vs**

kde Tbs = Tsb-1.

Preto:

**[AdT-1] = [AdT]-1**

Inverse Adjoint je Adjoint inverse transformation. To je veľmi elegantné a praktické.

V robotike často potrebujeme prepočítavať twisty medzi rôznymi frames. Napríklad pri robotickom ramene poznáme twist v space frame a potrebujeme ho vyjadriť v body frame end-effectora.

---

## 5. Adjoint pre ľubovoľné dva frames

Adjoint transformation nie je obmedzená na body a space frame.

Ak máme dva ľubovoľné frames {a} a {b} a poznáme transformation Tab, potom:

**Va = [AdTab] Vb**

prevedie twist vyjadrený vo frame {b} na twist vyjadrený vo frame {a}.

Toto je všeobecná vlastnosť. Body twist a spatial twist sú iba špeciálne prípady, kde {a} = {s} a {b} = {b}.

Preto [AdT] nazývame Adjoint representation of SE(3). Je to spôsob, akým SE(3) pôsobí na priestor twists.

---

## 6. Vlastnosti Adjoint transformation

Adjoint má niekoľko dôležitých vlastností.

Prvá: je lineárna. Ak máme twist V a scalar c, potom:

**[AdT](cV) = c [AdT]V**

Druhá: zachováva skladanie. Ak máme T1 a T2, potom:

**[AdT1 T2] = [AdT1][AdT2]**

Tretia: inverse Adjoint je Adjoint inverse:

**[AdT]-1 = [AdT-1]**

Tieto vlastnosti znamenajú, že Adjoint je korektná reprezentácia grupy SE(3) na priestore twists. V jazyku algebry hovoríme, že ide o grupovú akciu.

---

## 7. Príklad Adjoint transformation

Predstav si robotické rameno. Body frame {b} je na gripperi a space frame {s} je na základni.

Nech:

\`\`\`
Tsb =
| I | p |
| 0 | 1 |
\`\`\`

kde R = I (orientation je rovnaká) a p = (1, 0, 0).

Teda gripper je posunutý o 1 m pozdĺž x-axis, ale má rovnakú orientation ako base.

Adjoint matrix je:

\`\`\`
[AdTsb] =
| I    | 0 |
| [p]I | I |
\`\`\`

Keďže R = I, dostávame:

\`\`\`
[AdTsb] =
| I   | 0 |
| [p] | I |
\`\`\`

Ak body twist je:

**Vb = (0, 0, 1, 0, 0, 0)**

čo znamená čistú rotation okolo body z-axis, potom spatial twist bude:

**Vs = [AdTsb] Vb**

Angular časť: omega-s = I omega-b = (0, 0, 1)

Linear časť: vs = [p] omega-b + I vb = [p](0,0,1) + 0

Pre p = (1,0,0):

**[p](0,0,1) = p x (0,0,1) = (0, -1, 0) x ... = (0·0 - 0·1, 0·0 - 1·0, 1·1 - 0·0)**

Počítajme cross product (1,0,0) x (0,0,1):

**(0·1 - 0·0, 0·0 - 1·1, 1·0 - 0·0) = (0, -1, 0)**

Takže:

**Vs = (0, 0, 1, 0, -1, 0)**

Spatial twist hovorí: rotation okolo z-axis a linear component vs = (0, -1, 0).

---

## 8. Čo je screw motion

Teraz prichádzame k jednej z najkrajších myšlienok celej kapitoly.

Každý twist môžeme geometricky interpretovať ako **screw motion**. To je pohyb, pri ktorom sa rigid body súčasne otáča okolo nejakej osi a zároveň sa posúva pozdĺž tej istej osi.

Predstav si skrutku. Keď ju zaskrutkujete, otáča sa a zároveň postupuje dopredu. Toto je screw motion.

Chaslesov teorém hovorí, že každý instantaneous rigid-body motion možno opísať ako screw motion. Čiže pre každý twist existuje os, okolo ktorej sa teleso otáča, a pozdĺž ktorej sa posúva.

Ak sa teleso iba otáča, je to špeciálny prípad screw motion s nulovým posunom pozdĺž osi. Ak sa iba posúva, je to špeciálny prípad, kde os udáva smer posunu a pitch je nekonečný.

---

## 9. Screw axis

Os, okolo ktorej a pozdĺž ktorej sa rigid body pohybuje, sa nazýva **screw axis** a označujeme ju:

**S**

Screw axis je definovaná:

- Point q na osi
- Unit vector s-hat udávajúci smer osi
- Scalar h nazývaný **pitch**

Tieto tri informácie spolu popisujú celú geometriu screw motion.

Ak poznáme screw axis S a scalar theta-dot, vieme napísať twist:

**V = S theta-dot**

kde S je normalizovaný twist a theta-dot je rýchlosť pohybu pozdĺž screw axis.

---

## 10. Pitch screw axis

Pitch h je pomer linear motion pozdĺž osi k angular motion okolo osi:

**h = linear displacement pozdĺž osi / angular displacement okolo osi**

Ak h = 0, rigid body sa iba otáča okolo osi bez posunu pozdĺž nej. To je čistá rotation.

Ak h je konečné nenulové číslo, rigid body sa súčasne otáča aj posúva. Väčší pitch znamená väčší posun na jednu otáčku.

Ak h = infinity, angular velocity je zero a rigid body sa iba posúva pozdĺž osi. To je čistá translation.

Predstav si rôzne typy skrutiek. Jemná skrutka má malý pitch: veľa otáčania, málo posunu. Hrubá skrutka má veľký pitch: menej otáčania, viac posunu.

---

## 11. Twist vyjadrený pomocou screw axis parametrov

Pre konečný pitch (omega ≠ 0) môžeme twist zapísať:

\`\`\`
omega = s-hat
v = -s-hat x q + h s-hat
\`\`\`

kde s-hat je unit direction vector osi, q je point na osi a h je pitch.

Prvý člen -s-hat x q vzniká z toho, že os nemusí prechádzať originom. Ak by os prechádzala originom, q = 0 a tento člen zmizne.

Druhý člen h s-hat je translation pozdĺž osi. Ak h = 0, tento člen zmizne a zostane čistá rotation.

Celý twist teda obsahuje informáciu o osi rotation, o jej vzdialenosti od originu a o miere translation pozdĺž nej.

---

## 12. Čistá rotation ako screw s h = 0

Ak pitch h = 0, twist má tvar:

\`\`\`
omega = s-hat
v = -s-hat x q
\`\`\`

Linear časť twistu nie je zero (pokiaľ os neprechádza originom), ale celý motion je čistá rotation.

Prečo linear časť nie je zero? Pretože twist je vyjadrený v space frame. Ak sa rigid body otáča okolo osi, ktorá neprechádza space originom, spatial twist musí mať nenulovú linear časť, aby správne opísal, kde sa os nachádza.

Toto úzko súvisí s poznatkom z prvej časti: vs nie je velocity body originu, ale velocity pointu rozšíreného rigid body v space origin.

---

## 13. Čistá translation ako screw s h = infinity

Ak pitch h = infinity, angular velocity je zero a twist má tvar:

**V = (0, 0, 0, v1, v2, v3)**

Tu omega = 0 a linear časť udáva smer a rýchlosť translation.

V tomto prípade nemôžeme definovať pitch ako pomer, pretože by sme delili nulou. Namiesto toho hovoríme, že pitch je nekonečný.

Screw axis pre čistú translation je priamka v smere v-hat, kde v-hat je unit vector v smere translation. Point q na osi nie je jednoznačne definovaný, pretože každá rovnobežná priamka opisuje ten istý motion.

---

## 14. Normalizovaný twist pre omega ≠ 0

Keď omega ≠ 0, normalizujeme twist tak, aby angular časť mala jednotkovú veľkosť:

**||omega|| = 1**

Normalizovaný twist teda vyzerá:

**S = [s-hat; v]**

kde s-hat je unit vector.

V tomto prípade theta-dot je angular speed a twist získame ako:

**V = S theta-dot**

Normalizácia je veľmi užitočná, pretože oddelí geometriu motion (kam a okolo čoho) od rýchlosti motion (ako rýchlo).

S opisuje screw axis a theta-dot opisuje, ako rýchlo sa rigid body pozdĺž tejto osi pohybuje.

---

## 15. Normalizovaný twist pre omega = 0

Ak omega = 0, angular časť je zero vector a normalizácia podľa omega nedáva zmysel.

V tomto prípade normalizujeme podľa linear časti:

**||v|| = 1**

Normalizovaný twist pre čistú translation je teda:

**S = [0; v-hat]**

kde v-hat je unit vector v smere translation.

Theta-dot v tomto prípade nie je angular speed, ale linear speed.

Opäť platí:

**V = S theta-dot**

ale tentokrát theta-dot má rozmer m/s, nie rad/s.

---

## 16. Prečo rozlišujeme dva typy normalizácie

Máme teda dve konvencie:

Ak omega ≠ 0: normalizujeme omega na jednotkový vector. Theta-dot je angular speed.

Ak omega = 0: normalizujeme v na jednotkový vector. Theta-dot je linear speed.

Prečo nemáme jednu univerzálnu normalizáciu?

Pretože twist spája dva rôzne druhy quantities. Angular velocity má rozmer rad/s a linear velocity má rozmer m/s. Nemôžeme ich jednoducho porovnávať alebo sčítavať.

Keď normalizujeme omega, theta-dot má rozmer angular speed a pitch h hovorí, koľko metrov sa teleso posunie na jeden radián otáčania.

Keď normalizujeme v, theta-dot má rozmer linear speed a angular čast je zero.

Táto dvojitá konvencia je praktická a v Modern Robotics sa dôsledne dodržiava.

---

## 17. Screw axis S ako normalizovaný twist

Zhrňme si: screw axis S je normalizovaný twist.

Pre omega ≠ 0:

\`\`\`
S = (s-hat, -s-hat x q + h s-hat)
\`\`\`

kde ||s-hat|| = 1.

Pre omega = 0:

\`\`\`
S = (0, v-hat)
\`\`\`

kde ||v-hat|| = 1.

V oboch prípadoch:

**V = S theta-dot**

Screw axis S teda obsahuje geometriu pohybu a theta-dot jeho rýchlosť.

Toto je veľmi podobné tomu, čo sme mali pri angular velocity:

**omega = omega-hat theta-dot**

kde omega-hat je unit rotation axis a theta-dot je angular speed. Twist rozširuje túto myšlienku na celý rigid-body motion.

---

## 18. Matrix exponential a screw motion

V prvej časti o rotations sme videli, že:

**R = e^([omega-hat] theta)**

kde [omega-hat] je skew-symmetric matrix a theta je rotation angle.

Teraz máme úplne analogicky:

**T = e^([S] theta)**

kde [S] je matrix representation normalizovaného twistu S a theta je scalar.

Ak S má omega ≠ 0, theta je rotation angle. Ak S má omega = 0, theta je translation distance.

Toto je matrix exponential pre SE(3). Mapuje z se(3) do SE(3), teda z instantaneous motion do finite configuration.

---

## 19. Čo matrix exponential geometricky robí

Predstav si, že máme screw axis S a scalar theta.

Matrix exponential:

**e^([S] theta)**

vypočíta transformation T, ktorá zodpovedá motion: otočenie o theta okolo screw axis a posun o h theta pozdĺž nej.

Ak h = 0, je to čistá rotation o theta.

Ak h = infinity (omega = 0), je to čistá translation o theta v smere v-hat.

V oboch prípadoch exponential mapuje instantaneous description motion na jeho výsledný efekt po konečnom čase.

Toto je presne to isté, čo robil exponential pre rotations, iba rozšírené na celý rigid-body motion.

---

## 20. Rodriguesova formula pre SE(3)

Pre rotations sme mali Rodriguesovu formulu na výpočet e^([omega-hat] theta).

Pre SE(3) existuje analogická formula.

Ak omega ≠ 0:

\`\`\`
e^([S] theta) =
| e^([omega-hat] theta) | G(theta) v |
| 0                     | 1          |
\`\`\`

kde:

**G(theta) = I theta + (1 - cos theta)[omega-hat] + (theta - sin theta)[omega-hat]^2**

Rotation časť je tá istá Rodriguesova formula, ktorú už poznáme.

Translation časť G(theta) v kombinuje linear komponent twistu s rotáciou. Nie je to jednoducho v theta, pretože pri screw motion sa translation a rotation navzájom ovplyvňujú.

---

## 21. Logarithm: z T späť na screw parameters

Ak exponential mapuje z se(3) do SE(3), logarithm robí opak:

**[S] theta = log T**

Ak poznáme transformation T, logarithm nám dá screw axis S a angle theta, ktoré túto transformation generujú.

Pre rotation časť: najprv extrahujeme R z T a nájdeme omega-hat a theta pomocou logarithmu pre SO(3).

Pre translation časť: z G(theta) a hornej pravej časti T vypočítame v.

Toto je veľmi užitočné v praxi. Ak poznáme desired configuration robota, logarithm nám povie, aký screw motion tam vedie.

---

## 22. Kedy exponential a logarithm zlyhávajú

Rovnako ako pri rotations, logarithm nie je vždy jednoznačný.

Ak theta = 0, transformation je identity a screw axis nie je jednoznačne určený. Teleso sa nepohybuje, takže neexistuje preferovaná os.

Ak theta = pi, rotation axis má znamienkovú nejednoznačnosť.

Pre praktické výpočty sa tieto špeciálne prípady ošetrujú osobitne.

Exponential je naopak vždy dobre definovaný. Pre ľubovoľné S a theta vždy dostaneme validnú transformation T ∈ SE(3).

---

## 23. Vzťah medzi twist a wrench

Twist opisuje instantaneous motion rigid body. Existuje však aj duálny pojem:

**Wrench F = [m; f]**

kde m je moment (torque) a f je force.

Wrench je 6D vector, ktorý opisuje sily pôsobiace na rigid body, rovnako ako twist opisuje jeho motion.

Dôležitý vzťah medzi nimi je, že power (výkon) sa vypočíta ako:

**P = FT V**

kde FT je transpose wrench a V je twist.

Toto je rozšírenie vzťahu P = f · v z klasickej mechaniky na celý rigid-body motion.

Adjoint transformation platí aj pre wrenches, ale v transponovanej forme:

**Fs = [AdTbs]T Fb**

---

## 24. Pre-multiplication a post-multiplication

Pri práci s twistami v robotike sa často stretávame s otázkou, či multiplication vykonávame zľava alebo sprava.

Ak máme transformation Tsa a chceme aplikovať twist vyjadrený vo frame {a}:

**Tsa' = Tsa e^([Va] delta-t)**

Twist vo frame {a} sa násobí sprava. To preto, že twist je vyjadrený v coordinates frame, ku ktorému je T „priľahlé" sprava.

Naopak, ak máme spatial twist:

**Tsa' = e^([Vs] delta-t) Tsa**

Spatial twist sa násobí zľava.

Toto pravidlo je konzistentné s tým, čo sme videli pri rotations:

**Pre-multiplication = zmena v space frame**

**Post-multiplication = zmena v body frame**

---

## 25. Prečo je poradie násobenia dôležité

Predstav si, že máš dve po sebe nasledujúce transformations.

Ak obe vyjadrujeme vzhľadom na space frame, násobíme zľava:

**T' = T2 T1**

kde T2 sa aplikuje po T1, ale v zápise stojí vľavo.

Ak druhú transformation vyjadrujeme vzhľadom na body frame (po prvej transformation), násobíme sprava:

**T' = T1 T2**

Rovnaká logika platí pre twists.

Toto sa môže spočiatku zdať mätúce, ale je to konzistentná konvencia v celej robotike. Kľúčové pravidlo je:

**Space frame reference = pre-multiply (zľava)**

**Body frame reference = post-multiply (sprava)**

---

## 26. Twist coordinates vs. screw parameters

Dôležité je rozlišovať medzi dvoma spôsobmi opisu twistu.

**Twist coordinates** sú šestica numbers:

**V = (omega1, omega2, omega3, v1, v2, v3)**

To je priamy zápis twistu ako 6D vectora.

**Screw parameters** sú geometrický opis:

**(q, s-hat, h, theta-dot)**

kde q je point na osi, s-hat je smer osi, h je pitch a theta-dot je speed.

Oba opisy nesú rovnakú informáciu. Z jedného vieme vypočítať druhý:

\`\`\`
omega = s-hat theta-dot
v = (-s-hat x q + h s-hat) theta-dot
\`\`\`

Twist coordinates sú kompaktnejšie pre výpočty. Screw parameters sú lepšie pre geometrickú intuíciu.

---

## 27. Ako z twist coordinates získať screw parameters

Ak máme twist V = (omega, v):

Prípad 1: omega ≠ 0

**s-hat = omega / ||omega||**

**theta-dot = ||omega||**

**h = s-hat · v / theta-dot = (omega · v) / ||omega||^2**

Point q na osi:

**q = (omega x v) / ||omega||^2**

Prípad 2: omega = 0

**s-hat = v / ||v||**

**theta-dot = ||v||**

**h = infinity**

**q nie je jednoznačne definovaný**

Tieto vzťahy umožňujú z ľubovoľného nenulového twistu extrahovať kompletné screw parameters.

---

## 28. Príklad: screw parameters z daného twistu

Majme twist:

**V = (0, 0, 2, 4, 0, 0)**

Angular časť: omega = (0, 0, 2)

||omega|| = 2, takže theta-dot = 2

s-hat = omega / 2 = (0, 0, 1)

Pitch:

**h = (omega · v) / ||omega||^2 = (0·4 + 0·0 + 2·0) / 4 = 0**

Takže pitch je nula. Je to čistá rotation.

Point na osi:

**q = (omega x v) / ||omega||^2 = ((0,0,2) x (4,0,0)) / 4**

Cross product (0,0,2) x (4,0,0):

**(0·0 - 2·0, 2·4 - 0·0, 0·0 - 0·4) = (0, 8, 0)**

q = (0, 8, 0) / 4 = (0, 2, 0)

Takže screw axis prechádza bodom (0, 2, 0) v smere z-axis. Teleso rotuje okolo tejto osi angular speed 2 rad/s bez translation pozdĺž nej.

---

## 29. Chaslesov teorém

Chaslesov teorém je jeden z najdôležitejších výsledkov v kinematike rigid body.

Hovorí:

**Každý rigid-body motion možno opísať ako rotation okolo nejakej osi kombinovanú s translation pozdĺž tej istej osi.**

Inými slovami, každý twist zodpovedá screw motion.

Špeciálne prípady:

Ak je motion čistá rotation, pitch je nula.

Ak je motion čistá translation, pitch je nekonečný.

Ak je motion kombinácia rotation a translation, pitch je konečný a nenulový.

Tento teorém zaručuje, že screw interpretation twistu nie je iba matematický trik, ale skutočný geometrický fakt o pohybe rigid bodies.

---

## 30. Praktické využitie screw theory v robotike

Screw theory je mimoriadne užitočná v robotike z viacerých dôvodov.

Každý joint robota definuje screw axis. Revolute joint má screw axis s h = 0. Prismatic joint má screw axis s h = infinity.

Forward kinematics robota pomocou Product of Exponentials formula:

**T = e^([S1] theta1) e^([S2] theta2) ... e^([Sn] thetan) M**

kde Si sú screw axes jointov a M je home configuration.

Táto formula priamo používa matrix exponentials twist representations jointov. Preto je twist tak fundamentálny v robotike.

Jacobian robota spája joint velocities s twistom end-effectora:

**V = J(theta) theta-dot**

kde J je Jacobian matrix a theta-dot je vector joint velocities.

---

## 31. Celkový pohľad na twist, screw a Adjoint

Teraz môžeme vidieť celý obraz.

Twist V opisuje instantaneous motion rigid body. Má angular časť omega a linear časť v.

Existujú dva reference frames: body twist Vb a spatial twist Vs. Medzi nimi prechádzame pomocou Adjoint transformation:

**Vs = [AdTsb] Vb**

Každý twist zodpovedá screw motion. Screw axis S je normalizovaný twist a theta-dot je rýchlosť.

Matrix exponential prevádza screw parameters na transformation:

**T = e^([S] theta)**

A logarithm robí opačný prevod:

**[S] theta = log T**

Tieto nástroje spolu tvoria ucelený jazyk na opis motion rigid body. V ďalších kapitolách ich budeme intenzívne používať pri forward kinematics, inverse kinematics, Jacobians a dynamike robotov.

---

## Rekapitulácia najdôležitejších pojmov

**Adjoint transformation [AdT]** je 6 x 6 matrix, ktorá prevádza twist medzi rôznymi reference frames. Platí Vs = [AdTsb] Vb.

**Adjoint matrix** má tvar s R vľavo hore, 0 vpravo hore, [p]R vľavo dole a R vpravo dole.

**Screw motion** je pohyb, pri ktorom sa rigid body otáča okolo osi a súčasne sa posúva pozdĺž nej. Chaslesov teorém zaručuje, že každý rigid-body motion je screw motion.

**Screw axis S** je normalizovaný twist. Definovaná point q na osi, unit direction s-hat a pitch h.

**Pitch h** je pomer linear a angular displacement. h = 0 je čistá rotation, h = infinity je čistá translation.

**Normalizácia twistu**: ak omega ≠ 0, normalizujeme ||omega|| = 1 a theta-dot je angular speed. Ak omega = 0, normalizujeme ||v|| = 1 a theta-dot je linear speed.

**Matrix exponential** e^([S] theta) mapuje screw parameters na transformation T ∈ SE(3).

**Logarithm** log T dáva screw axis a angle [S] theta z transformation T.

**Pre-multiplication** zodpovedá spatial frame reference, **post-multiplication** zodpovedá body frame reference.

**Wrench F = [m; f]** je duálny objekt k twistu. Power je P = FT V.

**Twist coordinates** (omega, v) sú priamy 6D zápis. **Screw parameters** (q, s-hat, h, theta-dot) sú geometrický opis. Oba nesú rovnakú informáciu.

---

## Čo si z tejto lekcie odniesť

V prvej časti sme twist zaviedli ako 6D vector opisujúci instantaneous motion rigid body. V tejto druhej časti sme pridali tri kľúčové nástroje.

**Adjoint transformation** nám umožňuje prechádzať medzi body a spatial twistom. Je to 6 x 6 matrix odvodená z homogeneous transformation T. Angular časti sa premieňajú jednoduchou rotation, ale linear časti vyžadujú zložitejší prevod zahŕňajúci position aj rotation.

**Screw interpretation** ukazuje, že každý twist zodpovedá pohybu okolo a pozdĺž jednej osi. Táto geometrická interpretácia dáva twistu veľmi konkrétny fyzický význam. Pitch h určuje pomer translation a rotation, pričom krajné prípady h = 0 a h = infinity zodpovedajú čistej rotation a čistej translation.

**Normalizácia a exponential** spájajú instantaneous description s finite motion. Normalizovaný twist S je screw axis a theta je extent motion. Matrix exponential e^([S] theta) vypočíta výslednú transformation, čo je priame rozšírenie exponential map pre rotations na celý rigid-body motion.

Tieto koncepty sú jadrom Product of Exponentials formula pre forward kinematics, ktorej sa budeme venovať v nasledujúcich kapitolách. Každý joint robota definuje screw axis a celá kinematika ramena sa elegantne zapíše ako súčin exponentials.`;
