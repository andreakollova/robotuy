// Chapter 3.3.3 – Exponential Coordinates of Rigid-Body Motion
// Full lesson content - DO NOT SHORTEN

export const ch333Content = `# Modern Robotics – Chapter 3.3.3

# Exponential Coordinates of Rigid-Body Motion

V predchádzajúcich lekciách sme sa naučili dva veľmi dôležité spôsoby, ako pracovať s rigid-body motion. Najprv sme si ukázali **homogeneous transformation matrix T**, ktorá opisuje configuration rigid body v jednom kompaktnom zápise. Potom sme prešli k **twists**, ktoré opisujú instantaneous velocity rigid body.

Teraz sa dostávame k tretej veľkej téme tejto kapitoly. Chceme odpovedať na otázku:

**„Ak poznáme twist a chceme sa pozdĺž neho pohybovať o určitú veľkosť, aká bude výsledná configuration?"**

Inými slovami, chceme nájsť spôsob, ako z twistu vytvoriť **finite rigid-body motion**. Presne rovnakú úlohu sme riešili pri rotations, keď sme z angular velocity omega a angle theta vypočítali rotation matrix R pomocou matrix exponential. Teraz urobíme to isté, ale pre celý rigid-body motion zahŕňajúci rotation aj translation.

Výsledkom bude **matrix exponential pre SE(3)**, ktorý z prvku se(3) vytvorí prvok SE(3).

---

## 1. Pripomenutie: čo sme robili pri rotations

Pri rotations sme mali dve reprezentácie tej istej veci.

Na jednej strane stála **rotation matrix R ∈ SO(3)**, ktorá opisovala orientation.

Na druhej strane bola **exponential coordinate representation**: unit vector omega-hat určujúci rotation axis a scalar theta určujúci rotation angle. Spolu tvorili exponential coordinate vector:

**omega-hat theta**

Matrix exponential nám umožnil prejsť z jednej reprezentácie do druhej:

**R = e^[omega-hat]theta**

kde [omega-hat] je skew-symmetric matrix vytvorená z unit vectora omega-hat.

Na výpočet sme používali Rodrigues' formula:

**e^[omega-hat]theta = I + sin(theta)[omega-hat] + (1 - cos(theta))[omega-hat]^2**

Matrix logarithm robil opačnú cestu: z R nám dal [omega-hat]theta.

Teraz chceme celú túto štruktúru rozšíriť z rotations na celé rigid-body motions.

---

## 2. Čo je exponential coordinate representation pre rigid-body motion

Pri rotation sme celý motion opísali šiestimi slovami: **„otoč okolo tejto osi o tento angle."**

Pri rigid-body motion chceme povedať niečo podobné, ale bohatšie: **„pohybuj sa pozdĺž tejto screw axis o túto veľkosť."**

V lekcii o twists sme videli, že instantaneous rigid-body motion môžeme zapísať ako 6D twist:

**V = [omega; v]**

Exponential coordinates pre rigid-body motion budú mať tvar:

**S theta**

kde S je **unit twist** (normalizovaný twist) a theta je scalar, ktorý hovorí, **ako ďaleko** sa pozdĺž tohto twistu pohybujeme.

Presne tak, ako omega-hat theta pri rotations.

---

## 3. Čo je unit twist S

Unit twist je twist, ktorý spĺňa jednu z dvoch normalizačných podmienok.

Prvá možnosť: ak twist obsahuje nenulový angular component, normalizujeme ho tak, aby:

**||omega|| = 1**

Takýto unit twist zapisujeme:

**S = [omega-hat; v]**

kde omega-hat je unit vector a v je linear časť, ktorá závisí od geometry screw axis.

Druhá možnosť: ak angular component je zero (čistá translation), normalizujeme podľa linear časti:

**||v|| = 1**

V tomto prípade:

**S = [0; v-hat]**

kde v-hat je unit vector v smere translation.

Prečo dva prípady? Pretože pri čistej translation nemáme rotation axis, podľa ktorej by sme mohli normalizovať. Musíme preto normalizovať podľa linear časti.

---

## 4. Význam theta pri rotation case

Ak omega-hat ≠ 0, potom theta je **rotation angle**.

Predstav si robotický joint, ktorý sa otáča. S opisuje smer a geometry screw axis a theta hovorí, o koľko radiánov sa joint otočil.

Výsledná configuration po otočení o theta bude:

**T = e^[S]theta**

Toto je presne tá formula, ktorú chceme odvodiť.

---

## 5. Význam theta pri translation case

Ak omega = 0 a ||v-hat|| = 1, potom theta je **translation distance**.

Predstav si prismatic joint na robotickom ramene. Nevykonáva rotation, iba sa posúva v jednom smere. Theta potom hovorí, o koľko metrov sa joint vysunul.

Aj v tomto prípade platí:

**T = e^[S]theta**

a výsledkom bude homogeneous transformation opisujúca čistú translation.

---

## 6. Matrix representation unit twistu [S]

Rovnako ako sme z omega vectora vytvárali skew-symmetric matrix [omega], aj z twistu S vytvoríme 4 x 4 matrix:

\`\`\`
[S] =
| [omega] | v   |
| 0 0 0   | 0   |
\`\`\`

Táto matrix patrí do se(3).

Pri unit twist s ||omega|| = 1 je horná ľavá časť [omega-hat], čo je 3 x 3 skew-symmetric matrix unit vectora.

Pri unit twist s omega = 0 je horná ľavá časť nulová matrix a horný pravý stĺpec je v-hat.

---

## 7. Prečo chceme matrix exponential e^[S]theta

Máme twist S a parameter theta. Chceme vypočítať výslednú transformation matrix T.

Matrix exponential nám poskytuje priamu cestu:

**T = e^[S]theta**

Toto je veľmi elegantný vzťah. Hovorí:

**„Ak sa rigid body pohybuje pozdĺž screw axis opísanej twistom S o veľkosť theta, výsledná configuration je e^[S]theta."**

Je to priama generalizácia vzťahu:

**R = e^[omega-hat]theta**

z rotations na celé rigid-body motions.

---

## 8. Formálna definícia matrix exponential pre SE(3)

Matrix exponential 4 x 4 matrix [S]theta definujeme pomocou power series:

**e^[S]theta = I + [S]theta + ([S]theta)^2 / 2! + ([S]theta)^3 / 3! + ...**

kde I je 4 x 4 identity matrix.

Táto definícia je úplne analogická s definíciou matrix exponential pre so(3), len pracujeme so 4 x 4 matrices namiesto 3 x 3.

Matematicky je táto series vždy konvergentná. V praxi ju však nepočítame nekonečným sčítaním, ale použijeme uzavretú formulu.

---

## 9. Uzavretá formula pre prípad s rotation

Ak ||omega|| = 1 (twist obsahuje rotation), matrix exponential má uzavretú formu:

\`\`\`
e^[S]theta =
| e^[omega-hat]theta | G(theta) v |
| 0 0 0               | 1          |
\`\`\`

Rozbalíme si, čo to znamená.

Horná ľavá časť je nám už známa:

**e^[omega-hat]theta**

To je rotation matrix vypočítaná Rodrigues' formula. Je to presne tá istá rotation matrix, akú sme mali v kapitole o exponential coordinates of rotation.

Horná pravá časť je:

**G(theta) v**

kde G(theta) je nová matrix, ktorú ešte musíme definovať, a v je linear časť unit twistu S.

Spodný riadok je rovnaký ako v každej homogeneous transformation: [0 0 0 1].

---

## 10. Čo je matrix G(theta)

Matrix G(theta) je 3 x 3 matrix definovaná ako:

**G(theta) = I theta + (1 - cos(theta))[omega-hat] + (theta - sin(theta))[omega-hat]^2**

kde I je 3 x 3 identity matrix a [omega-hat] je skew-symmetric matrix unit rotation axis.

Túto formulu si nemusíme pamätať nazapamäť, ale je veľmi dôležité pochopiť, čo robí.

G(theta) transformuje linear časť twistu v na **translation vector p**, ktorý sa objaví v homogeneous transformation matrix.

Preto:

**p = G(theta) v**

Predstav si to takto: pri čistej rotation by sa body origin pohyboval po oblúku. Translation časť twistu v spolu s G(theta) presne opisujú, aký net displacement vznikne kombináciou rotation a translation pozdĺž screw axis.

---

## 11. Prečo G(theta) vyzerá tak, ako vyzerá

G(theta) v skutočnosti vznikne z power series matrix exponential.

Keď rozvinieme e^[S]theta do power series a pozrieme sa na hornú pravú časť 4 x 4 výsledku, dostaneme:

**I theta v + [omega-hat]v theta^2/2! + [omega-hat]^2 v theta^3/3! + ...**

Ak si vytkneme v, zostane nám:

**(I theta + [omega-hat] theta^2/2! + [omega-hat]^2 theta^3/3! + ...) v**

Po sčítaní series s využitím toho, že [omega-hat]^3 = -[omega-hat], dostaneme presne:

**G(theta) = I theta + (1 - cos(theta))[omega-hat] + (theta - sin(theta))[omega-hat]^2**

Je to teda uzavretá forma nekonečnej power series.

---

## 12. Porovnanie s Rodrigues' formula

Rodrigues' formula pre rotation matrix bola:

**e^[omega-hat]theta = I + sin(theta)[omega-hat] + (1 - cos(theta))[omega-hat]^2**

Formula pre G(theta) je:

**G(theta) = I theta + (1 - cos(theta))[omega-hat] + (theta - sin(theta))[omega-hat]^2**

Vidíme jasné podobnosti. Obe formuly majú tri členy a obe používajú [omega-hat] a [omega-hat]^2. Líšia sa však v koeficientoch.

V Rodrigues' formula figurujú:

**1, sin(theta), (1 - cos(theta))**

V G(theta) figurujú:

**theta, (1 - cos(theta)), (theta - sin(theta))**

Toto nie je náhoda. Koeficienty v G(theta) sú vlastne integrály koeficientov z Rodrigues' formula.

---

## 13. Príklad: čistá rotation okolo osi prechádzajúcej originom

Pozrime sa najprv na jednoduchý prípad. Rigid body rotuje okolo osi prechádzajúcej originom space frame. Žiadna translation pozdĺž axis neprebieha.

V tomto prípade screw axis prechádza originom, takže linear časť unit twistu je:

**v = 0**

Preto:

**G(theta) v = G(theta) 0 = 0**

a translation v výslednej T je zero:

**p = 0**

Výsledok:

\`\`\`
T =
| R | 0 |
| 0 | 1 |
\`\`\`

To dáva zmysel. Ak teleso iba rotuje okolo osi prechádzajúcej originom, jeho configuration po rotation je iba nová orientation bez translation.

---

## 14. Príklad: screw motion s rotation aj translation

Teraz si vezmime screw motion: rotation okolo osi a zároveň translation pozdĺž tej istej osi.

Predstav si skrutku. Keď ju otáčaš, zároveň sa posúva dopredu.

Unit twist S bude mať:

**omega-hat** - unit vector pozdĺž screw axis

**v** - bude obsahovať informáciu aj o translation pozdĺž axis aj o position axis

Theta bude rotation angle.

Po dosadení do formuly dostaneme T, ktorej rotation časť bude otočená o theta okolo axis a translation časť bude kombinácia pohybu po oblúku a posunutia pozdĺž axis.

---

## 15. Uzavretá formula pre prípad čistej translation

Ak omega = 0, situácia je omnoho jednoduchšia.

Unit twist má tvar:

**S = [0; v-hat]**

kde ||v-hat|| = 1.

Matrix [S]theta je:

\`\`\`
[S]theta =
| 0   | v-hat theta |
| 0 0 0 | 0           |
\`\`\`

kde horná ľavá 3 x 3 časť je nulová matrix.

Power series pre e^[S]theta:

**e^[S]theta = I + [S]theta + 0 + 0 + ...**

pretože ([S]theta)^2 = 0 v tomto prípade.

Preto:

\`\`\`
e^[S]theta =
| I         | v-hat theta |
| 0 0 0     | 1           |
\`\`\`

To je jednoducho homogeneous transformation matrix pre čistú translation o vector v-hat theta.

Žiadna rotation (R = I) a position vector p = v-hat theta.

---

## 16. Prečo pri čistej translation vypadne G(theta)

Keď omega = 0, nemôžeme použiť G(theta), pretože G(theta) je definovaná pomocou [omega-hat] a tá by bola nulová matrix.

Namiesto toho pri omega = 0 dostaneme priamo:

**p = v-hat theta**

Toto je intuitívne správne. Ak sa teleso posúva v smere v-hat o vzdialenosť theta, jeho position sa zmení o v-hat theta.

G(theta) teda nepotrebujeme. Je to presne analógia situácie pri rotation, kde pri theta = 0 bola e^[omega-hat]theta = I bez potreby Rodrigues' formula.

---

## 17. Celková formula matrix exponential pre SE(3)

Zhrnieme oba prípady.

Ak ||omega|| = 1 (rotation case):

\`\`\`
e^[S]theta =
| e^[omega-hat]theta | G(theta) v |
| 0 0 0               | 1          |
\`\`\`

kde:

**e^[omega-hat]theta = I + sin(theta)[omega-hat] + (1 - cos(theta))[omega-hat]^2**

**G(theta) = I theta + (1 - cos(theta))[omega-hat] + (theta - sin(theta))[omega-hat]^2**

Ak omega = 0 a ||v|| = 1 (pure translation case):

\`\`\`
e^[S]theta =
| I         | v theta |
| 0 0 0     | 1       |
\`\`\`

Tieto dve formuly nám umožňujú pre ľubovoľný unit twist S a parameter theta vypočítať výslednú homogeneous transformation T.

---

## 18. Súvislosť so screw motion

V lekcii o twists sme videli, že každý twist zodpovedá motion pozdĺž screw axis. Matrix exponential teraz túto myšlienku dotvárame.

Ak máme screw axis a chceme vedieť, aká bude configuration rigid body po tom, ako sa pootočí o theta okolo tejto axis (a prípadne sa posunie pozdĺž nej), stačí:

1. Zapísať screw axis ako unit twist S
2. Vypočítať e^[S]theta

Výsledok je priamo homogeneous transformation matrix T opisujúca novú configuration.

To je veľmi silná myšlienka. Screw motion, ktorý geometricky kombinuje rotation a translation, algebraicky zodpovedá jednoduchému matrix exponential.

---

## 19. Prečo exponential coordinates fungujú pre joints

V robotike má každý joint svoju axis. Revolute joint rotuje okolo osi a prismatic joint sa posúva pozdĺž osi.

Oba tipy joints zodpovedajú screw motions.

Revolute joint je screw motion s omega ≠ 0. Ak joint nemá pitch (h = 0), ide o čistú rotation okolo axis. Ak má nenulový pitch, rotation aj translation prebiehajú súčasne.

Prismatic joint je screw motion s omega = 0. Je to čistá translation pozdĺž axis jointu.

Preto:

**Configuration vyvolaná jointom o theta = e^[Si]thetai**

kde Si je unit twist prislúchajúci i-tému jointu.

Toto je základ **product of exponentials formula**, ktorú uvidíme v ďalších kapitolách pri forward kinematics.

---

## 20. Revolute joint ako exponential

Revolute joint sa otáča okolo osi. Ak poznáme:

- **omega-hat** - unit vector pozdĺž rotation axis
- **q** - ľubovoľný point na rotation axis

potom unit twist pre revolute joint je:

**S = [omega-hat; -omega-hat x q]**

Linear časť v = -omega-hat x q vyplýva z toho, že rotation okolo osi neprechádzajúcej originom vytvára translation body originu.

Theta je rotation angle jointu.

Po dosadení do matrix exponential:

**T = e^[S]theta**

dostaneme configuration rigid body po otočení jointu o angle theta.

---

## 21. Prismatic joint ako exponential

Prismatic joint sa posúva pozdĺž osi. Nemá rotation.

Unit twist:

**S = [0; v-hat]**

kde v-hat je unit vector v smere translation.

Theta je translation distance.

Matrix exponential:

\`\`\`
e^[S]theta =
| I       | v-hat theta |
| 0 0 0   | 1           |
\`\`\`

To je jednoducho translation o v-hat theta.

Prismatic joint teda neprináša žiadnu rotation, iba position change.

---

## 22. Matrix logarithm pre SE(3) - opačný smer

Rovnako ako pri rotations, aj tu chceme vedieť ísť opačným smerom.

Máme homogeneous transformation matrix T ∈ SE(3) a chceme nájsť unit twist S a parameter theta také, aby:

**T = e^[S]theta**

Operácia, ktorá toto robí, sa nazýva **matrix logarithm pre SE(3)**.

Zapisujeme:

**[S]theta = log(T)**

Výsledkom je 4 x 4 matrix patriaca do se(3), z ktorej môžeme extrahovať S a theta.

---

## 23. Matrix logarithm - prípad čistej translation

Najjednoduchší prípad nastane, keď T nemá rotation:

\`\`\`
T =
| I | p |
| 0 | 1 |
\`\`\`

Rotation matrix je identity, takže omega = 0. Ide o čistú translation.

V tomto prípade:

**theta = ||p||**

**v-hat = p / ||p||**

a unit twist je:

**S = [0; v-hat]**

Matrix logarithm je:

\`\`\`
[S]theta =
| 0     | p |
| 0 0 0 | 0 |
\`\`\`

To dáva intuitívny zmysel. Ak configuration je čistá translation o vector p, príslušný motion je translation v smere p o vzdialenosť ||p||.

---

## 24. Matrix logarithm - prípad s rotation

Ak R ≠ I, situácia je zložitejšia, ale stále zvládnuteľná.

Najprv z rotation časti R získame omega-hat a theta pomocou matrix logarithm pre SO(3), ktorý už poznáme z predchádzajúcej lekcie.

Použijeme:

**[omega-hat]theta = log(R)**

To nám dá rotation axis omega-hat a rotation angle theta.

Zostáva ešte nájsť linear časť v twistu.

---

## 25. Ako získať v z translation časti

Z formuly pre matrix exponential vieme, že:

**p = G(theta) v**

kde p je translation vector z T.

Preto:

**v = G(theta)^-1 p**

Musíme teda invertovať matrix G(theta).

Inverse G(theta) existuje a má uzavretú formu:

**G(theta)^-1 = (1/theta) I - (1/2)[omega-hat] + ((1/theta) - (1/2)cot(theta/2))[omega-hat]^2**

kde cot(theta/2) = cos(theta/2) / sin(theta/2).

Po výpočte v = G(theta)^-1 p máme kompletný unit twist S = [omega-hat; v] a parameter theta.

---

## 26. Celkový algoritmus matrix logarithm pre SE(3)

Zhrnieme postup pre matrix logarithm.

Vstup: T ∈ SE(3)

Krok 1: Extrahuj R a p z T.

Krok 2: Ak R = I, potom omega = 0, theta = ||p||, v = p/||p|| a:

\`\`\`
[S]theta =
| 0     | p |
| 0 0 0 | 0 |
\`\`\`

Krok 3: Ak R ≠ I, použij matrix logarithm pre SO(3) na R a získaj [omega-hat] a theta.

Krok 4: Vypočítaj v = G(theta)^-1 p.

Krok 5: Zostav:

\`\`\`
[S]theta =
| [omega-hat]theta | v theta |
| 0 0 0             | 0       |
\`\`\`

Výstup: [S]theta ∈ se(3)

---

## 27. Príklad matrix logarithm pri čistej translation

Majme:

\`\`\`
T =
| 1 0 0 | 3 |
| 0 1 0 | 0 |
| 0 0 1 | 4 |
| 0 0 0 | 1 |
\`\`\`

R = I, takže omega = 0.

p = (3, 0, 4).

theta = ||p|| = sqrt(9 + 0 + 16) = sqrt(25) = 5.

v-hat = (3/5, 0, 4/5) = (0.6, 0, 0.8).

Unit twist: S = [0, 0, 0, 0.6, 0, 0.8].

Interpretation: teleso sa posunulo o 5 jednotiek v smere (0.6, 0, 0.8).

---

## 28. Prečo logarithm nie je vždy jednoznačný

Rovnako ako pri rotations, aj tu musíme byť opatrní.

Ak R = I a p ≠ 0, logarithm je jednoznačný (až na znak theta, kde berieme kladné).

Ak R ≠ I, theta nie je jednoznačné, pretože rotation o theta a o theta + 2k pi dáva tú istú R. Zvyčajne berieme theta ∈ (0, pi].

Špeciálny prípad theta = pi vyžaduje opatrnejšie zaobchádzanie, rovnako ako pri matrix logarithm pre SO(3).

---

## 29. Exponential a logarithm sú vzájomne inverzné operácie

Platí:

**log(e^[S]theta) = [S]theta**

a:

**e^log(T) = T**

Sú to teda vzájomne inverzné operácie medzi se(3) a SE(3):

**se(3) --exp--> SE(3)**

**SE(3) --log--> se(3)**

Rovnaká štruktúra ako:

**so(3) --exp--> SO(3)**

**SO(3) --log--> so(3)**

Toto je veľmi pekná matematická symetria.

---

## 30. Geometrický význam: Chasles' theorem

Jedným z najdôležitejších výsledkov v mechanike je **Chasles' theorem** (niekedy Mozzi-Chasles). Tento teorém hovorí:

**Každý rigid-body motion (okrem čistej translation) je ekvivalentný rotation okolo nejakej osi kombinovanej s translation pozdĺž tej istej osi.**

Inými slovami, každý rigid-body motion je screw motion.

Matrix exponential presne toto realizuje. Parametrizuje screw motion pomocou S a theta, a logarithm nám pre ľubovoľné T nájde príslušnú screw axis a parameter.

Čistá translation je limitný prípad, keď rotation angle je zero a „screw axis" je v nekonečne.

---

## 31. Paralela medzi SO(3)/so(3) a SE(3)/se(3)

Teraz môžeme vidieť kompletnú štruktúru.

Pre rotations:

- Configuration: R ∈ SO(3)
- Instantaneous motion: [omega] ∈ so(3)
- Exponential: R = e^[omega-hat]theta
- Logarithm: [omega-hat]theta = log(R)

Pre rigid-body motions:

- Configuration: T ∈ SE(3)
- Instantaneous motion: [V] ∈ se(3)
- Exponential: T = e^[S]theta
- Logarithm: [S]theta = log(T)

Celá teória rigid-body motion je teda elegantnou generalizáciou teórie rotations.

---

## 32. Ako exponential coordinates popisujú jointový pohyb

Každý joint v robotickom ramene má svoju screw axis Si. Keď sa joint pootočí (alebo vysunie) o thetai, výsledná transformation je:

**e^[Si]thetai**

Pri sériovom ramene s n joints celková configuration end-effectora závisí od všetkých joint positions. Keď tieto exponentials zložíme za sebou, dostaneme veľmi elegantnú formulu pre forward kinematics.

Tým sa budeme zaoberať v nasledujúcich kapitolách, ale je dôležité vedieť, že exponential coordinates sú presne tým nástrojom, ktorý to umožňuje.

---

## 33. [S]theta vs S theta - matrix vs vector forma

Musíme byť opatrní s notáciou.

**S theta** je 6D vector. Je to exponential coordinate vector pre rigid-body motion. Jeho prvé tri components sú omega-hat theta a posledné tri sú v theta.

**[S]theta** je 4 x 4 matrix v se(3). Vznikne z S theta rovnako ako [omega] vzniká z omega: je to matrix representation.

**[S theta]** je to isté ako **[S]theta** - bracket notation aplikovaná na celý 6D vector.

V praxi:

\`\`\`
[S]theta = [S theta] =
| [omega-hat]theta | v theta |
| 0 0 0             | 0       |
\`\`\`

Matrix exponential berieme z tejto 4 x 4 matrix.

---

## 34. Exponential coordinates v space frame vs body frame

Doteraz sme pracovali so space frame interpretáciou. Unit twist S bol vyjadrený v space frame a e^[S]theta opisoval motion v space frame.

Rovnako dobre však môžeme pracovať v body frame. Ak máme unit twist Sb vyjadrený v body frame, platí:

**T = e^[Sb]theta**

Toto je body frame verzia tej istej transformácie.

Rozdiel medzi space a body frame verzami je rovnaký ako pri twists: ide o ten istý physical motion, iba vyjadrený v rôznych reference frames.

---

## 35. Prečo je matrix exponential pre robotiku tak dôležitý

Matrix exponential pre SE(3) je jedným z najdôležitejších nástrojov v Modern Robotics. Dôvody:

1. Umožňuje elegantnú formuláciu forward kinematics pomocou product of exponentials
2. Každý joint priamo zodpovedá jednému exponential termu
3. Geometrická interpretácia cez screw motions je veľmi intuitívna
4. Logarithm umožňuje z configuration naspäť získať screw parameters
5. Celý formalizmus je konzistentný s teóriou rotations

V praxi to znamená, že namiesto toho, aby sme pre každý robot individuálne odvodzovali kinematické rovnice, stačí poznať screw axes joints a referenčnú configuration. Zvyšok je matrix algebra.

---

## 36. Čo musíme vedieť na výpočet

Pre praktický výpočet matrix exponential e^[S]theta potrebujeme:

1. Rozlíšiť, či ||omega|| = 1 (rotation case) alebo omega = 0 (translation case)

2. Ak rotation case: použiť Rodrigues' formula na e^[omega-hat]theta a formula pre G(theta) na výpočet translation časti

3. Ak translation case: výsledok je priamo T = [I, v-hat theta; 0, 1]

Pre matrix logarithm log(T):

1. Extrahujeme R a p z T

2. Ak R = I: omega = 0, theta = ||p||, v = p/||p||

3. Ak R ≠ I: nájdeme omega-hat a theta z log(R), potom v = G(theta)^-1 p

---

## 37. Spojenie s predchádzajúcimi lekciami

Celá kapitola 3 buduje systematickú štruktúru.

V 3.3.1 sme definovali homogeneous transformation T, ktorá opisuje configuration.

V 3.3.2 sme definovali twist V, ktorý opisuje instantaneous motion.

Teraz v 3.3.3 sme ukázali, ako twist a theta spolu cez matrix exponential vytvárajú finite motion:

**T = e^[S]theta**

a ako cez logarithm extrahujeme z T naspäť screw parameters:

**[S]theta = log(T)**

Toto trojica - configuration, velocity, exponential map - tvorí jadro kinematiky v Modern Robotics.

V ďalších kapitolách tieto nástroje aplikujeme na reálne robotické ramená a odvodíme product of exponentials formula pre forward kinematics.

---

## Rekapitulácia najdôležitejších pojmov

**Exponential coordinates S theta** sú 6D representation rigid-body motion. S je unit twist a theta je scalar (rotation angle alebo translation distance).

**Unit twist S** je normalizovaný twist. Ak omega ≠ 0, normalizujeme podľa ||omega|| = 1. Ak omega = 0, normalizujeme podľa ||v|| = 1.

**Matrix exponential e^[S]theta** prevádza prvok se(3) na prvok SE(3). Pri rotation case je výsledok T s rotation časťou e^[omega-hat]theta a translation časťou G(theta)v.

**G(theta)** je 3 x 3 matrix: G(theta) = I theta + (1 - cos(theta))[omega-hat] + (theta - sin(theta))[omega-hat]^2. Transformuje linear časť twistu na translation vector.

**Pure translation case** je jednoduchší: e^[S]theta = [I, v-hat theta; 0, 1]. G(theta) sa nepoužíva.

**Matrix logarithm log(T)** je inverzná operácia k matrix exponential. Z T ∈ SE(3) extrahuje [S]theta ∈ se(3). Pri R = I je omega = 0 a theta = ||p||. Pri R ≠ I najprv použijeme log(R) a potom v = G(theta)^-1 p.

**Revolute joint** zodpovedá exponential e^[S]theta s omega ≠ 0. Unit twist S = [omega-hat; -omega-hat x q].

**Prismatic joint** zodpovedá exponential e^[S]theta s omega = 0. Unit twist S = [0; v-hat].

**Chasles' theorem** hovorí, že každý rigid-body motion je screw motion. Matrix exponential toto realizuje algebraicky.

**Paralela SO(3)/se(3)** - celá štruktúra (exponential, logarithm, Lie group, Lie algebra) sa opakuje z rotations na rigid-body motions.

---

## Čo si z tejto lekcie odniesť

Matrix exponential pre SE(3) je priamou generalizáciou matrix exponential pre SO(3). Tak ako sme z rotation axis a angle pomocou Rodrigues' formula vypočítali rotation matrix, teraz z unit twistu S a parametra theta pomocou uzavretej formuly vypočítame celú homogeneous transformation matrix T.

Kľúčový nový prvok je matrix **G(theta)**, ktorá sa stará o translation časť výsledku. Pri čistej translation G(theta) nepotrebujeme, pretože výsledok je triviálny.

Matrix logarithm nám umožňuje ísť opačným smerom: z T nájsť S a theta. Postup závisí od toho, či T obsahuje rotation alebo nie.

Celá teória má krásnu geometrickú interpretáciu cez **Chasles' theorem**: každý rigid-body motion je screw motion, a matrix exponential je algebraický spôsob, ako tento screw motion vypočítať.

Pre robotiku je najdôležitejšie, že **každý joint zodpovedá jednému exponential termu**. Revolute joint je exponential s rotation, prismatic joint je exponential bez rotation. Toto je základ pre product of exponentials formula v forward kinematics, ktorú budeme odvádzať v ďalších kapitolách.`;
