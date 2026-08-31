// Chapter 3.4 – Wrenches
// Full lesson content - DO NOT SHORTEN

export const ch34Content = `# Modern Robotics – Chapter 3.4

# Wrenches

Doteraz sme sa v Chapter 3 pozerali najmä na to, **ako sa rigid body nachádza a ako sa pohybuje**. Configuration sme opisovali pomocou homogeneous transformation matrix T a instantaneous motion pomocou twistu V. Všetko sa zatiaľ točilo okolo kinematiky, teda geometrie a rýchlosti pohybu.

Teraz prichádza na rad otázka:

**"Čo spôsobuje, že sa rigid body pohybuje?"**

Odpoveď je: sily a momenty. V tejto lekcii sa naučíme, ako ich spojiť do jedného 6D objektu, ktorý nazývame **wrench**. Wrench je pre sily a momenty presne to, čo twist je pre angular a linear velocity.

---

## 1. Prečo potrebujeme spojiť force a moment

Keď pracujeme s rigid body, samotná force nestačí na úplný opis interakcie. Force pôsobí na nejaký point a spôsobuje translation. Moment spôsobuje rotation. Vo všeobecnosti na rigid body pôsobí oboje naraz.

Predstav si robotický gripper, ktorý drží predmet. Na predmet pôsobí gravitačná sila smerom nadol a zároveň moment, ktorý sa ho snaží prevrátiť. Ak by sme tieto dve veci popisovali oddelene, museli by sme stále sledovať dva rôzne vectory.

Presne rovnako ako twist spojil angular velocity a linear velocity do jedného 6D vectora, wrench spojí moment a force do jedného 6D vectora.

---

## 2. Force pôsobiaca na rigid body

Začnime silou.

Force acting on a point of a rigid body je 3D vector:

**f = (f1, f2, f3)**

Tento vector hovorí, akým smerom a akou veľkosťou sila pôsobí.

Napríklad gravitačná sila pôsobiaca na 2 kg predmet v space frame, kde z-axis smeruje nahor, je:

**f = (0, 0, -19.62)**

v jednotkách Newtonov.

Force sama o sebe spôsobuje translačné zrýchlenie rigid body. Ak by neexistoval žiaden constraint, sila by celé teleso posúvala v smere f.

---

## 3. Moment pôsobiaci na rigid body

Moment, niekedy nazývaný torque, je tiež 3D vector:

**m = (m1, m2, m3)**

Moment opisuje tendenciu otáčať rigid body okolo určitej osi.

Smer vectora m udáva os rotation a veľkosť udáva intenzitu momentu.

Napríklad motor v kĺbe robotického ramena vytvára moment, ktorý otáča nasledujúci link okolo joint axis. Ak je joint axis pozdĺž z-axis a motor vytvára moment 5 Nm:

**m = (0, 0, 5)**

Moment teda robí pre rotation niečo analogické tomu, čo force robí pre translation.

---

## 4. Moment vzniká aj z force pôsobiacej mimo centre

Veľmi dôležitá vlastnosť je, že force pôsobiaca na rigid body v pointe, ktorý neleží na osi prechádzajúcej referenčným bodom, vytvára moment okolo tohto referenčného bodu.

Ak force f pôsobí v pointe s position vectorom r vzhľadom na referenčný bod, vzniká moment:

**m = r x f**

kde x značí cross product.

Predstav si kľúč, ktorým uťahujeme skrutku. Sila pôsobí na konci kľúča a vytvára moment okolo skrutky. Čím dlhší kľúč, tým väčší moment pri rovnakej sile.

Tento vzťah je zásadný pre pochopenie wrenchov.

---

## 5. Wrench ako 6D vector

Teraz spojíme moment a force do jedného objektu.

Definujeme wrench:

**F = [m; f]**

kde m je 3D moment vector a f je 3D force vector.

Wrench teda obsahuje šesť components. Prvé tri sú moments a posledné tri sú forces.

Všimni si poradie: moment je hore a force dole. Toto je rovnaké usporiadanie ako pri twiste, kde angular časť omega je hore a linear časť v dole:

**V = [omega; v]**

Toto nie je náhoda. Wrench a twist sú duálne objekty a ich štruktúra je zámerne symetrická.

---

## 6. Prečo práve toto poradie

Poradie [m; f] nie je iba estetická voľba. Je zvolené tak, aby wrench a twist spolu pekne fungovali vo vzťahoch pre power a energy.

Neskôr uvidíme, že power je:

**P = F^T V**

teda jednoduchý dot product wrenchu a twistu. Aby tento vzťah nadobudol správny tvar, moment musí byť v hornej časti wrenchu a force v dolnej, rovnako ako omega je v hornej časti twistu a v je v dolnej.

Keby sme poradie obrátili, museli by sme do vzorca pre power pridávať prešmyčky a vzťah by stratil svoju jednoduchosť.

---

## 7. Wrench vyjadrený v rôznych frames

Rovnako ako twist môžeme vyjadriť v body frame alebo v space frame, aj wrench môžeme vyjadriť v rôznych reference frames.

Wrench vyjadrený v body frame zapíšeme:

**Fb = [mb; fb]**

Wrench vyjadrený v space frame zapíšeme:

**Fs = [ms; fs]**

Moment mb je moment vyjadrený v body coordinates a fb je force vyjadrená v body coordinates. Analogicky pre space frame.

Ak robotický gripper stláča predmet, force a moment pôsobiace na predmet môžeme opísať buď v coordinates grippera, alebo v world coordinates.

---

## 8. Príklad: gravitácia pôsobiaca na robotický link

Predstav si robotický link s hmotnosťou 3 kg. Gravitácia pôsobí na jeho centre of mass.

V space frame, kde z-axis smeruje nahor, je gravitačná sila:

**fs = (0, 0, -29.43)**

Ak centre of mass leží na position:

**r = (0.2, 0, 0.1)**

vzhľadom na space origin, gravitácia vytvára moment okolo space originu:

**ms = r x fs = (0 x (-29.43) - 0.1 x 0, 0.1 x 0 - 0.2 x (-29.43), 0.2 x 0 - 0 x 0)**

Teda:

**ms = (0, 5.886, 0)**

Wrench v space frame je potom:

**Fs = (0, 5.886, 0, 0, 0, -29.43)**

Prvé tri čísla sú moment a posledné tri sú force.

---

## 9. Wrench je duálny objekt k twistu

Teraz prichádzame k veľmi dôležitej myšlienke.

Twist opisuje motion. Wrench opisuje forces a moments.

Tieto dva objekty sú navzájom duálne. To znamená, že ich kombináciou vzniká skalár, konkrétne power.

Dualita v matematickom zmysle znamená, že wrench žije v duálnom priestore k priestoru twistov. V praxi to znamená, že wrench a twist majú rovnakú štruktúru (oba sú 6D vectory), ale ich fyzikálny význam je odlišný a komplementárny.

Twist hovorí: ako sa teleso pohybuje.

Wrench hovorí: čo na teleso pôsobí.

---

## 10. Power ako dot product twistu a wrenchu

Najdôležitejší vzťah medzi twistom a wrenchom je výpočet power.

Power je:

**P = F^T V**

kde F je wrench a V je twist, oba vyjadrené v rovnakom reference frame.

Rozpisime si to:

**P = [m; f]^T [omega; v] = m^T omega + f^T v**

Prvý člen:

**m^T omega**

je power vyplývajúci z momentu a angular velocity. Motor v kĺbe, ktorý vytvára moment m a otáča sa angular velocity omega, dodáva práve tento power.

Druhý člen:

**f^T v**

je power vyplývajúci z force a linear velocity. Sila posúvajúca teleso lineárnou rýchlosťou v dodáva tento power.

Celkový power je súčet oboch príspevkov.

---

## 11. Príklad výpočtu power

Robotický kĺb vytvára moment:

**m = (0, 0, 3)**

Nm a angular velocity kĺbu je:

**omega = (0, 0, 4)**

rad/s.

Zároveň na link nepôsobí žiadna net linear force a link sa neposúva (iba rotuje), takže f = 0 a v = 0.

Wrench je:

**F = (0, 0, 3, 0, 0, 0)**

Twist je:

**V = (0, 0, 4, 0, 0, 0)**

Power je:

**P = F^T V = 0 x 0 + 0 x 0 + 3 x 4 + 0 x 0 + 0 x 0 + 0 x 0 = 12**

Teda 12 W. Motor dodáva 12 wattov mechanického power.

---

## 12. Power je invariantný voči reference frame

Veľmi dôležitá vlastnosť power je, že nezávisí od toho, v akom frame wrench a twist vyjadrujeme.

To znamená:

**Fb^T Vb = Fs^T Vs**

Power je fyzikálna veličina. Motor dodáva 12 W bez ohľadu na to, či si to spočítame v body alebo space frame.

Táto invariancia nie je samozrejmá. Wrench a twist vyzerajú v rôznych frames rôzne, ale ich dot product dáva vždy rovnaký skalár.

Práve preto bola štruktúra wrenchu a twistu zvolená tak, ako je. Poradie [m; f] pre wrench a [omega; v] pre twist zabezpečuje, že jednoduchý dot product dáva správny, frame-invariantný power.

---

## 13. Prečo je frame-invariancia power dôležitá

V robotike často prepíname medzi rôznymi reference frames. Niekedy je pohodlnejšie pracovať v space frame, inokedy v body frame end-effectora.

Ak by power závisel od frame, museli by sme vždy kontrolovať, v akom frame počítame, a pridávať korekčné faktory. To by bolo nepraktické a náchylné na chyby.

Vďaka tomu, že power je invariantný, máme slobodu:

Pracuj v tom frame, v ktorom je to najjednoduchšie, a power bude vždy správny.

Toto je jeden z hlavných dôvodov, prečo je wrench definovaný práve tak, ako je.

---

## 14. Analógia s obyčajnou mechanikou

V základnej mechanike poznáme:

**P = F . v**

Power je dot product sily a velocity.

Pri rigid body motion je situácia bohatšia, pretože máme aj rotation. Vzťah:

**P = F^T V = m^T omega + f^T v**

je preto rozšírením klasického vzorca. Prvý člen pridáva príspevok od rotačného motion a rotačných forces (moments).

Táto analógia pomáha budovať intuíciu. Wrench je pre rigid body to, čo force je pre point mass. Twist je pre rigid body to, čo velocity je pre point mass. A power je ich dot product v oboch prípadoch.

---

## 15. Transformácia wrenchu medzi frames

Teraz prichádzame k otázke: ako wrench transformovať z jedného frame do druhého?

Pri twistoch sme používali Adjoint representation:

**Vs = [Ad-Tsb] Vb**

Pri wrenchoch budeme používať transpose Adjoint:

**Fb = [Ad-Tsb]^T Fs**

Všimni si dva dôležité rozdiely.

Po prvé, smer transformácie je opačný. Adjoint transformuje twist z body do space, ale transpose Adjoint transformuje wrench zo space do body.

Po druhé, používame transpose matice, nie samotnú maticu.

Tieto rozdiely nie sú náhodné. Vyplývajú z duality medzi twistom a wrenchom.

---

## 16. Prečo práve transpose Adjoint

Dôvod je priamo spojený s invarianciou power.

Vieme, že:

**Fs^T Vs = Fb^T Vb**

Ak twist transformujeme pomocou:

**Vs = [Ad] Vb**

potom:

**Fs^T [Ad] Vb = Fb^T Vb**

Aby to platilo pre každý Vb, musí platiť:

**Fb = [Ad]^T Fs**

Toto je elegantný matematický dôvod, prečo wrench používa transpose Adjoint. Nie je to nová nezávislá definícia. Vyplýva priamo z požiadavky, aby power bol frame-invariantný.

---

## 17. Čo je Adjoint matrix

Pripomeňme si Adjoint representation.

Pre transformation:

\`\`\`
T =
| R | p |
| 0 | 1 |
\`\`\`

je Adjoint matrix 6 x 6 matrix:

\`\`\`
[Ad-T] =
| R        | 0   |
| [p]R     | R   |
\`\`\`

kde [p] je skew-symmetric matrix vectora p.

Transpose tejto matice je:

\`\`\`
[Ad-T]^T =
| R^T       | ([p]R)^T |
| 0         | R^T      |
\`\`\`

Keďže:

**([p]R)^T = R^T [p]^T = -R^T [p]**

dostaneme:

\`\`\`
[Ad-T]^T =
| R^T          | -R^T [p] |
| 0            | R^T      |
\`\`\`

Táto matrix transformuje wrench medzi frames.

---

## 18. Príklad transformácie wrenchu

Predstav si, že na end-effector robotického ramena pôsobí wrench vyjadrený v space frame:

**Fs = (0, 0, 0, 0, 0, -10)**

To znamená: žiadny moment a force 10 N smerom nadol (pozdĺž zápornej z-axis).

Body frame end-effectora je natočený o 90° okolo x-axis vzhľadom na space frame a jeho origin je na position:

**p = (1, 0, 0)**

Na výpočet Fb by sme použili:

**Fb = [Ad-Tsb]^T Fs**

Po dosadení R, p a výpočte by sme dostali wrench vyjadrený v coordinates end-effectora. Force by mala rovnakú veľkosť, ale iný smer v body coordinates, pretože body axes sú natočené.

Zároveň by sa mohol objaviť moment v body frame, pretože force neprechádza cez body origin.

---

## 19. Wrench pri kontaktoch

V robotike sú wrenchy obzvlášť dôležité pri kontaktoch medzi robotom a prostredím.

Keď robot uchopí predmet, medzi gripperom a predmetom vzniká kontaktná sila a moment. Tieto kontaktné forces a moments popisujeme ako wrench.

Keď robotická noha šliapne na zem, reakcia podložky je wrench.

Keď robotická ruka tlačí na dvere, interakcia medzi rukou a dverami je wrench.

Vo všetkých týchto prípadoch je wrench najprirozenejší spôsob, ako opísať mechanickú interakciu medzi dvoma telesami.

---

## 20. Force/torque senzory

Na meranie wrenchov sa v robotike používajú **force/torque senzory**.

Tieto senzory sa typicky umiestňujú medzi posledný kĺb robotického ramena a end-effector. Merajú tri zložky sily a tri zložky momentu, teda celý 6D wrench.

Výstup senzora je:

**F-sensor = [mx, my, mz, fx, fy, fz]**

Senzor meria wrench vo svojom vlastnom reference frame. Ak chceme wrench vyjadriť v inom frame, musíme použiť transpose Adjoint transformation.

Force/torque senzory sú kľúčové pre:

- Force control, kde robot prispôsobuje svoje motion na základe meraných forces
- Detekciu kolízií
- Jemné manipulačné úlohy ako montáž alebo leštenie
- Bezpečné interakcie s ľuďmi

---

## 21. Príklad force/torque senzora na robotickom ramene

Predstav si 6-axis force/torque senzor na zápästí robotického ramena.

Senzor meria:

**F-sensor = (0.1, -0.05, 2.0, 0.5, 0.3, -8.0)**

To znamená, že senzor detekuje momenty mx = 0.1 Nm, my = -0.05 Nm, mz = 2.0 Nm a sily fx = 0.5 N, fy = 0.3 N, fz = -8.0 N.

Tieto hodnoty sú v coordinates senzorového frame. Ak potrebujeme vedieť, aký wrench pôsobí v space frame, musíme transformovať:

**Fs = [Ad-Tsensor,s]^(-T) F-sensor**

alebo ekvivalentne použiť vzťah s transpose Adjoint.

Práve takáto transformácia je v robotike bežná rutina pri spracovaní údajov zo senzorov.

---

## 22. Wrench a equilibrium

Rigid body je v statickom equilibriu, keď celkový wrench pôsobiaci na neho je zero:

**F-total = 0**

To znamená:

**m-total = 0**

a:

**f-total = 0**

Teda súčet všetkých momentov je zero a súčet všetkých síl je zero.

Toto je rozšírenie klasických podmienok equilibria z basic mechanics. Pri point mass stačila podmienka sum of forces = 0. Pri rigid body potrebujeme aj sum of moments = 0, pretože teleso sa môže otáčať.

Wrench nám umožňuje obe podmienky zapísať jednou rovnicou.

---

## 23. Príklad equilibria robotického ramena

Predstav si jednoduchý robotický link, ktorý je v horizontálnej polohe a drží ho motor v kĺbe.

Na link pôsobí gravitácia v jeho centre of mass. Táto gravitácia vytvára wrench.

Motor v kĺbe musí vytvárať presne opačný wrench, aby link zostal v equilibriu.

Ak je gravitačný wrench vzhľadom na kĺb:

**F-gravity = (0, -14.7, 0, 0, 0, -29.4)**

potom motor musí vytvárať:

**F-motor = (0, 14.7, 0, 0, 0, 29.4)**

aby:

**F-gravity + F-motor = 0**

Toto je princíp, na ktorom funguje gravity compensation v robotických ramenách.

---

## 24. Wrench a Newton-Euler rovnice

Pri dynamike rigid body platia Newton-Euler rovnice:

**F = M A**

kde F je wrench, M je spatial inertia matrix (6 x 6) a A obsahuje angular a linear acceleration.

Toto je rozšírenie Newtonovho zákona F = ma na rigid body.

Pre point mass má F a a rovnaké dimenzie (3D) a m je skalár.

Pre rigid body má F šesť components (wrench), A šesť components a M je 6 x 6 matrix.

Spatial inertia matrix M spája celý wrench s celým acceleration vectorom. Obsahuje informácie o hmotnosti telesa, polohe centre of mass a rozložení hmoty.

---

## 25. Wrench na screw axis

Podobne ako twist môžeme interpretovať ako motion pozdĺž screw axis, aj wrench má geometrickú interpretáciu spojenú so screw.

Ľubovoľný wrench F = [m; f] s f ≠ 0 môžeme rozložiť na:

- Force f pôsobiacu pozdĺž určitej priamky v priestore
- Moment m-parallel pozdĺž rovnakej priamky

kde m-parallel je zložka m v smere f.

Zvyšná časť momentu (kolmá na f) určuje position tejto priamky v priestore.

Toto je presne duálna štruktúra k interpretácii twistu ako motion pozdĺž screw axis. Pri twiste sme mali rotation okolo osi a translation pozdĺž nej. Pri wrenchi máme force pozdĺž osi a moment okolo nej.

---

## 26. Pitch wrenchu

Pri twiste sme definovali pitch h ako pomer translation speed ku angular speed:

**h = v-parallel / omega**

Analogicky pri wrenchi definujeme pitch ako pomer momentu pozdĺž osi ku force:

**h = m-parallel / |f|**

kde m-parallel je zložka momentu v smere force.

Zaujímavé je, že pitch wrenchu a pitch twistu sa objavujú v rovnakom vzťahu.

Wrench s nulovým pitch je čistá sila (žiadny moment pozdĺž osi sily). Wrench s nekonečným pitch je čistý moment (žiadna sila), analogicky ako twist s nekonečným pitch je čistá translation.

---

## 27. Superpozícia wrenchov

Dôležitá vlastnosť wrenchov je, že sa sčítajú lineárne.

Ak na rigid body pôsobí viacero wrenchov:

**F1, F2, ..., Fn**

celkový wrench je ich súčet:

**F-total = F1 + F2 + ... + Fn**

za predpokladu, že všetky wrenchy sú vyjadrené v rovnakom reference frame.

Toto je priamy dôsledok princípu superpozície v mechanike. Sily sa sčítajú a momenty sa sčítajú, teda aj wrenchy sa sčítajú.

V robotike to znamená, že ak na end-effector pôsobí gravitácia, kontaktná sila a sila od motora, celkový wrench jednoducho sčítame.

---

## 28. Reciprocity twistu a wrenchu

Twist a wrench majú ešte jednu dôležitú vzájomnú vlastnosť nazývanú reciprocity.

Hovoríme, že twist V a wrench F sú reciprocal, ak:

**F^T V = 0**

To znamená, že power je zero. Fyzikálne to znamená, že wrench nevykonáva žiadnu prácu pri tomto motion.

Napríklad ak sa teleso pohybuje čisto horizontálne (twist má iba horizontálnu linear velocity) a pôsobí naň iba vertikálna sila (wrench má iba vertikálnu force), power je zero. Tieto dva objekty sú reciprocal.

Reciprocita je dôležitá pri analýze constraints v robotike. Constraint force nevykonáva prácu pri povolenom motion, preto je constraint wrench reciprocal k povolenom twistu.

---

## 29. Constraints a wrenchy

V robotike sa rigid body často pohybuje pod vplyvom constraints. Kĺb obmedzuje motion linku. Podlaha obmedzuje motion nohy.

Každý constraint generuje reaction wrench, ktorý zabraňuje motion v zakázaných smeroch.

Napríklad revolute joint umožňuje iba rotation okolo jednej osi. Constraint wrenchy v tomto kĺbe pokrývajú všetkých päť zakázaných DOF.

Tieto constraint wrenchy sú vždy reciprocal k povoleným twistom. To je matematicky elegantný spôsob, ako opísať vzťah medzi tým, čo kĺb dovoľuje a čo zakazuje.

---

## 30. Wrench space a twist space

Pre každý kĺb alebo mechanizmus môžeme definovať:

**Twist space**: množina všetkých povolených twistov

**Wrench space**: množina všetkých constraint wrenchov

Tieto dva priestory sú navzájom reciprocal. To znamená, že každý wrench z wrench space je reciprocal ku každému twistu z twist space.

Ak twist space má dimenziu k (kĺb má k DOF), potom wrench space má dimenziu 6 - k.

Napríklad:

- Revolute joint: twist space má dimenziu 1, wrench space má dimenziu 5
- Prismatic joint: twist space má dimenziu 1, wrench space má dimenziu 5
- Spherical joint: twist space má dimenziu 3, wrench space má dimenziu 3
- Free joint (žiadny constraint): twist space má dimenziu 6, wrench space má dimenziu 0

---

## 31. Dualita medzi twistom a wrenchom - prehľad

Teraz sa pozrime na úplný obraz duality medzi twistom a wrenchom.

Twist V = [omega; v] opisuje motion:
- omega je angular velocity
- v je linear velocity (s interpretáciou závislou od body/spatial frame)

Wrench F = [m; f] opisuje forces:
- m je moment
- f je force

Power spája oba:
- P = F^T V = m^T omega + f^T v

Transformation:
- Twist sa transformuje pomocou [Ad-T]
- Wrench sa transformuje pomocou [Ad-T]^(-T)

Táto dualita nie je náhodná. Je to dôsledok hlbokej geometrickej štruktúry mechaniky rigid body.

---

## 32. Adjoint transpose podrobnejšie

Vráťme sa k transformácii wrenchu a pozrime sa na ňu podrobnejšie.

Máme wrench Fa v frame {a} a chceme ho vyjadriť v frame {b}.

Platí:

**Fb = [Ad-Tab]^T Fa**

kde Tab je transformation z frame {a} do frame {b}.

Rozpisime, čo sa deje s jednotlivými časťami wrenchu.

Force sa transformuje podľa:

**fb = R^T fa**

To je jednoducho zmena coordinates force vectora, rovnako ako pri transformácii ľubovoľného free vectora.

Moment sa transformuje podľa:

**mb = R^T ma - R^T [p] fa**

Prvý člen mení coordinates momentu. Druhý člen pridáva moment, ktorý force fa vytvára kvôli posunu medzi originmi frames.

Toto je presne to, čo očakávame z fyziky. Keď zmeníme referenčný bod, moment sily sa zmení, pretože rameno sily sa zmení.

---

## 33. Prečo sa moment mení pri zmene referenčného bodu

Toto je kľúčová fyzikálna myšlienka.

Predstav si silu pôsobiacu na konci tyče. Moment tejto sily závisí od toho, okolo ktorého bodu moment počítame.

Ak referenčný bod leží na osi sily, moment je zero.

Ak referenčný bod je ďaleko od osi sily, moment je veľký.

Preto pri zmene reference frame sa moment-component wrenchu mení nielen kvôli zmene orientácie axes (to robí R^T), ale aj kvôli zmene position referenčného bodu (to robí člen s [p]).

Force sa naopak nemení podľa referenčného bodu. Force je free vector - závisí iba od smeru a veľkosti, nie od bodu pôsobenia.

---

## 34. Porovnanie transformácií twistu a wrenchu

Porovnajme teraz transformácie twistu a wrenchu vedľa seba.

Twist z body do space:
**Vs = [Ad-Tsb] Vb**

Wrench zo space do body:
**Fb = [Ad-Tsb]^T Fs**

Všimnime si:
- Adjoint [Ad] transformuje twist jedným smerom
- Transpose Adjoint [Ad]^T transformuje wrench opačným smerom

Toto je typická vlastnosť duálnych objektov v matematike. Ak máme lineárnu transformáciu pre jeden objekt, duálny objekt sa transformuje pomocou transpose v opačnom smere.

V robotike to znamená, že ak vieme transformovať twisty, automaticky vieme transformovať aj wrenchy. Stačí transponovať maticu a obrátiť smer.

---

## 35. Statics robotického ramena

Wrenchy sú kľúčové pre statickú analýzu robotických ramien.

Ak na end-effector pôsobí wrench F-tip, chceme vedieť, aké joint torques tau musia motory vytvárať, aby rameno zostalo v equilibriu.

Tento vzťah vyjadruje rovnica:

**tau = J^T F-tip**

kde J je Jacobian ramena a J^T je jeho transpose.

Všimni si, že Jacobian sa pri twistoch používa priamo:

**V-tip = J theta-dot**

a pri wrenchoch sa objavuje jeho transpose:

**tau = J^T F-tip**

To je opäť dualita: velocity ide cez J, force ide cez J^T.

Túto rovnicu budeme podrobne odvádzať v neskorších kapitolách o Jacobianoch.

---

## 36. Príklad statiky: robot drží predmet

Robot drží 1 kg predmet v horizontálnej polohe. Na predmet pôsobí gravitačný wrench:

**F-tip = (0, -0.49, 0, 0, 0, -9.81)**

v space frame (moment okolo y-axis kvôli offsetu centre of mass a sila nadol).

Ak poznáme Jacobian J ramena v tejto configuration, joint torques sú:

**tau = J^T F-tip**

Každý joint motor musí vytvárať príslušný torque, aby robot udržal predmet v equilibriu.

Pri zmene configuration sa mení J a teda aj potrebné joint torques. Preto aj keď sa predmet nemení, motory musia neustále prispôsobovať torques podľa aktuálnej configuration.

---

## 37. Wrench pri hybridnom force/motion control

V pokročilej robotike sa často používa hybridný prístup:

V niektorých smeroch robot riadi position (motion control) a v iných smeroch riadi force.

Napríklad pri leštení povrchu:

- V smere kolmom na povrch robot udržuje konštantnú force (force control)
- V smeroch pozdĺž povrchu robot vykonáva požadovaný motion (motion control)

Wrench je kľúčový pre force control časť. Senzor meria wrench, controller ho porovnáva s požadovaným wrenchom a prispôsobuje torques motorov.

Twist je kľúčový pre motion control časť. Controller sleduje požadovaný twist a prispôsobuje motion.

Dualita wrenchu a twistu sa tu prejavuje veľmi prakticky.

---

## 38. Wrench cone

Pri kontaktoch s trením sa objavuje koncept wrench cone.

Ak robot tlačí na povrch, reakcia povrchu musí ležať v určitom kuželi (cone) wrenchov. Tento cone je daný Coulombovým zákonom trenia.

Ak normálová sila je fn, maximálna trecia sila je:

**ft-max = mu fn**

kde mu je koeficient trenia.

Množina všetkých prípustných kontaktných wrenchov tvorí cone v 6D wrench space.

Ak požadovaný wrench leží mimo tento cone, kontakt sa naruší (teleso skĺzne alebo sa oddelí). Analýza wrench cones je preto dôležitá pri plánovaní uchopení a manipulácie.

---

## 39. Wrench v kontexte celej kapitoly 3

Pozrime sa teraz, ako wrench zapadá do celkového obrazu Chapter 3.

Začali sme configurations rigid body (T ∈ SE(3)).

Potom sme prešli na instantaneous motion (twist V ∈ se(3)).

Teraz sme pridali forces a moments (wrench F).

Tieto tri koncepty tvoria ucelený rámec:

- T hovorí, kde teleso je
- V hovorí, ako sa pohybuje
- F hovorí, čo na neho pôsobí

Configuration, velocity a force. To je základná trojica mechaniky, teraz rozšírená na rigid body v 3D priestore.

A vzťah medzi nimi:

- P = F^T V spája force s velocity cez power
- F = M A spája force s acceleration cez dynamiku

---

## 40. Duálne veličiny - prehľad

V Modern Robotics sa opakovane objavuje princíp duality. Zosumarizujme duálne páry:

**Angular velocity omega** je duálna k **moment m**.

**Linear velocity v** je duálna k **force f**.

**Twist V = [omega; v]** je duálny k **wrench F = [m; f]**.

**Adjoint [Ad]** transformuje twisty, **[Ad]^T** transformuje wrenchy.

**Jacobian J** mapuje joint velocities na twisty, **J^T** mapuje wrenchy na joint torques.

Power F^T V je invariant, ktorý tieto duálne objekty spája.

Toto systematické párovanie nie je iba matematická hračka. Poskytuje praktický nástroj: kedykoľvek odvodíme vzťah pre kinematiku (velocities), automaticky vieme, ako vyzerá zodpovedajúci vzťah pre statiku (forces).

---

## 41. Porovnanie s point mass mechanikou

Pre úplnosť porovnajme rigid-body a point-mass prístupy.

**Point mass:**
- Configuration: position x (3D)
- Velocity: dx/dt (3D)
- Force: f (3D)
- Power: P = f^T v
- Dynamics: f = m a

**Rigid body:**
- Configuration: T ∈ SE(3) (4 x 4)
- Velocity: twist V (6D)
- Force: wrench F (6D)
- Power: P = F^T V
- Dynamics: F = M A (6 x 6 system)

Štruktúra je rovnaká, iba dimenzie a zložitosť sú väčšie. Všetky vzťahy z point mass mechaniky majú svoj rigid-body analóg.

---

## 42. Prečo je wrench dôležitý pre prax

Wrench nie je len teoretický koncept. Je to štandardný jazyk, ktorým robotici opisujú interakcie.

Každý priemyselný robot má force/torque senzor, ktorý meria wrench.

Každý motion controller, ktorý musí rešpektovať kontaktné sily, pracuje s wrenchmi.

Každý algoritmus pre grasping a manipulation analyzuje wrenchy na kontaktných bodoch.

Bez wrenchu by sme museli sily a momenty sledovať oddelene a ručne zabezpečovať konzistentnosť pri zmene frames. Wrench toto všetko zjednocuje do jedného 6D objektu s jasnou transformačnou logikou.

---

## Rekapitulácia najdôležitejších pojmov

**Wrench F = [m; f]** je 6D vector spájajúci moment m a force f. Je to duálny objekt k twistu.

**Power P = F^T V** je dot product wrenchu a twistu. Rozpisuje sa ako P = m^T omega + f^T v a je invariantný voči reference frame.

**Transformácia wrenchu** používa transpose Adjoint: Fb = [Ad-Tsb]^T Fs. Smer transformácie je opačný ako pri twistoch.

**Force/torque senzor** meria celý 6D wrench vo svojom vlastnom frame. Na prepočet do iného frame sa používa transpose Adjoint.

**Equilibrium** nastáva, keď celkový wrench je zero: F-total = 0.

**Reciprocity** twistu a wrenchu: F^T V = 0 znamená, že wrench nevykonáva prácu pri danom motion.

**Wrench space a twist space** sú navzájom reciprocal. Pre kĺb s k DOF má twist space dimenziu k a wrench space dimenziu 6 - k.

**Statics robotického ramena** spája tip wrench s joint torques cez tau = J^T F-tip, čo je duálne k V = J theta-dot.

**Duálne páry** v robotike: velocity/force, twist/wrench, Adjoint/transpose Adjoint, Jacobian/transpose Jacobian.

---

## Čo si z tejto lekcie odniesť

Wrench F = [m; f] je pre forces a moments to, čo twist V = [omega; v] je pre angular a linear velocity. Oba sú 6D vectory, oba majú body aj spatial verziu a oba sa transformujú medzi frames pomocou Adjoint - twist priamo a wrench cez transpose.

Kľúčovým spojením medzi nimi je power P = F^T V. Tento skalár je invariantný voči reference frame, čo znamená, že si môžeme vybrať najpohodlnejší frame pre výpočet a výsledok bude vždy správny. Práve z požiadavky na túto invarianciu vyplýva, že wrench sa transformuje pomocou transpose Adjoint.

V praxi wrenchy stretávame pri force/torque senzoroch, pri statickej analýze robotických ramien, pri force control a pri analýze kontaktov a uchopení. Vzťah tau = J^T F-tip, kde Jacobian transpose prevádza tip wrench na joint torques, bude jedným z ústredných vzťahov neskorších kapitol.

Celkovo sme teraz v Chapter 3 vybudovali tri piliere: configuration T, velocity twist V a force wrench F. Tieto tri objekty spolu s ich transformáciami a vzájomnými vzťahmi tvoria kompletný jazyk pre opis kinematiky a statiky rigid body v 3D priestore.`;
