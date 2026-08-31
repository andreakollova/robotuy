// Chapter 3.3.2 – Twists (Part 1 of 2)
// Full lesson content - DO NOT SHORTEN

export const ch332p1Content = `# Modern Robotics – Chapter 3.3.2

# Twists – Part 1 of 2

V predchádzajúcej kapitole sme sa naučili opisovať **configuration rigid body** pomocou homogeneous transformation matrix T. Tá nám v jednom zápise povedala dve veci naraz: kde sa teleso nachádza a ako je natočené. Inými slovami, T odpovedá na otázku:

**„Akú má teleso práve teraz polohu a orientation?"**

Teraz však chceme riešiť inú otázku:

**„Ako sa táto configuration práve teraz mení?"**

To je zásadný rozdiel. Configuration opisuje stav telesa v konkrétnom okamihu. Velocity opisuje, ako sa z tohto stavu teleso práve pohybuje ďalej.

Predstav si robotický gripper. V jednom okamihu môže byť 50 cm nad stolom a natočený smerom k predmetu. To je jeho configuration. Zároveň sa však môže posúvať dopredu rýchlosťou 20 cm/s a súčasne sa otáčať. To už nie je informácia o configuration, ale o jeho instantaneous motion.

Keď sme riešili iba rotations, mali sme podobnú dvojicu pojmov. Rotation matrix R opisovala orientation a angular velocity omega opisovala, ako sa táto orientation práve mení. Teraz už však rigid body nerotuje iba na mieste. Môže sa súčasne **otáčať aj posúvať**.

Potrebujeme preto nový spôsob, ako tieto dve zložky pohybu spojiť do jedného celku. Tento opis sa nazýva **twist**.

---

## 1. Prečo samotná angular velocity nestačí

Predstav si dron letiaci cez miestnosť. Môže sa pohybovať dopredu a zároveň sa pomaly otáčať doľava. Ak by sme poznali iba jeho angular velocity, vedeli by sme, ako rýchlo sa mení jeho orientation, ale nevedeli by sme, ako rýchlo sa presúva jeho position.

Naopak, ak by sme poznali iba velocity jedného bodu na drone, napríklad jeho stredu, nevedeli by sme z toho úplne určiť, ako sa celý dron otáča.

Rigid body v 3D priestore má 6 DOF: tri translačné a tri rotačné. Je preto prirodzené, že aj jeho okamžitý pohyb potrebujeme opísať pomocou šiestich numbers.

Prvé tri numbers budú tvoriť angular velocity:

**omega = (omega1, omega2, omega3)**

a ďalšie tri numbers budú tvoriť linear časť pohybu:

**v = (v1, v2, v3)**

Spolu ich zapíšeme ako jeden 6D vector:

**V = [omega; v]**

Tento vector nazývame **twist**.

Dôležité však je nepredstavovať si v automaticky ako „velocity originu telesa". Pri jednom type twistu to takto interpretovať môžeme, pri druhom nie. Práve preto budeme rozlišovať **body twist** a **spatial twist**.

---

## 2. Najprv si pripomeňme, čo opisuje Tsb

Máme pevný space frame {s} a body frame {b} spojený s rigid body.

Configuration body frame vzhľadom na space frame zapisujeme:

\`\`\`
Tsb(t) =
| R(t)  | p(t) |
| 0 0 0 | 1    |
\`\`\`

Symbol t znamená čas. Keď sa teleso pohybuje, jeho configuration sa mení, takže sa mení aj R(t) a p(t).

Rotation matrix R(t) opisuje, ako je teleso natočené vzhľadom na space frame. Position vector p(t) opisuje, kde sa nachádza origin body frame vzhľadom na origin space frame.

Predstav si napríklad robotické rameno. Frame {s} je pevne na jeho základni a frame {b} je na gripperi. Keď sa robot pohybuje, gripper mení position aj orientation. Preto sa s časom mení celá matrix Tsb.

Ak chceme vedieť, ako rýchlo sa T mení, vezmeme jej časovú deriváciu.

Dostaneme:

\`\`\`
Tdot =
| Rdot  | pdot |
| 0 0 0 | 0    |
\`\`\`

Tu už vidíme dve rôzne časti. Derivácia pdot je intuitívna: opisuje velocity originu body frame vyjadrenú v space coordinates.

Pri Rdot je situácia zložitejšia. Rdot sama o sebe nie je angular velocity. Presne rovnaký problém sme riešili v lekcii o angular velocities.

---

## 3. Prečo samotná Tdot ešte nie je twist

Mohlo by sa zdať logické povedať:

„T opisuje configuration, takže Tdot musí byť velocity."

Nie je to úplne nesprávna myšlienka, ale Tdot ešte nemá formu, ktorú chceme použiť ako geometricky zmysluplnú velocity rigid body.

Pozrime sa najprv na jednoduchší prípad rotation.

Pri orientation sme mali:

**R(t)**

a jej deriváciu:

**Rdot(t)**

Ale angular velocity sme nezískali jednoducho tak, že by sme povedali:

**omega = Rdot**

To by ani nedávalo rozmerovo zmysel, pretože Rdot je 3 x 3 matrix, zatiaľ čo angular velocity je 3D vector.

Namiesto toho sme vytvorili dve kombinácie:

**[omega-b] = R-1 Rdot = RT Rdot**

a:

**[omega-s] = Rdot R-1 = Rdot RT**

Prvá nám dala angular velocity vyjadrenú v body frame, druhá tú istú fyzickú angular velocity vyjadrenú v space frame.

Teraz urobíme presne rovnakú vec s celou transformation T.

Získame tak dve verzie twistu:

**body twist Vb**

a

**spatial twist Vs**.

---

## 4. Body twist - ako sa teleso pohybuje vyjadrené v body frame

Začnime body twistom.

Definujeme:

**[Vb] = Tsb-1 Tdot-sb**

Zatiaľ si tento vzorec nemusíme pamätať. Oveľa dôležitejšie je pochopiť, prečo má práve takýto tvar.

Vieme, že:

\`\`\`
Tsb-1 =
| RT    | -RT p |
| 0 0 0 | 1     |
\`\`\`

a:

\`\`\`
Tdot =
| Rdot  | pdot |
| 0 0 0 | 0    |
\`\`\`

Keď tieto dve matrices vynásobíme, dostaneme:

\`\`\`
Tsb-1 Tdot =
| RT Rdot | RT pdot |
| 0 0 0   | 0       |
\`\`\`

Všimni si, že člen -RT p z inverse transformation sa v hornej pravej časti výsledku neobjaví. Je to preto, že sa násobí nulou z posledného riadku Tdot.

Výsledná matrix má preto veľmi čistú formu:

\`\`\`
[Vb] =
| [omega-b] | vb  |
| 0 0 0     | 0   |
\`\`\`

kde:

**[omega-b] = RT Rdot**

a:

**vb = RT pdot**

Toto už začína mať veľmi jasný fyzický význam.

---

## 5. Čo fyzicky znamená omega-b

Prvá časť body twistu je:

**omega-b**

Je to angular velocity rigid body vyjadrená v coordinates body frame.

Predstav si dron. Dron sa práve otáča okolo určitej osi. Tú istú fyzickú angular velocity môžeme opísať pomocou world axes alebo pomocou axes pripevnených k dronu.

Ak použijeme axes dronu, dostávame:

**omega-b**

Napríklad:

**omega-b = (0, 0, 2)**

znamená, že z pohľadu body coordinates sa dron momentálne otáča okolo svojej vlastnej z-axis angular speed 2 rad/s.

Dôležité je, že body frame v Modern Robotics neinterpretujeme ako nejakého človeka sediaceho v rotujúcom drone. Ide o coordinates stationary frame, ktorý je v danom okamihu zhodný s body-attached frame. Rovnakú konvenciu sme používali už pri angular velocities.

---

## 6. Čo fyzicky znamená vb

Druhá časť body twistu je:

**vb = RT pdot**

Teraz si tento vzťah rozoberme.

Vector p udáva position originu body frame v space coordinates. Preto:

**pdot**

je velocity originu body frame vyjadrená v space coordinates.

Predstav si gripper robotického ramena. Origin frame {b} môže byť napríklad v strede grippera. Ak sa gripper pohybuje doprava rýchlosťou 0,5 m/s podľa world x-axis, potom pdot túto velocity opisuje pomocou world coordinates.

Čo však robí multiplication:

**RT pdot**?

Vieme, že RT prevádza coordinates zo space frame do body frame. Preto pdot fyzicky nemeníme. Meníme iba coordinates, ktorými tú istú velocity opisujeme.

Takže:

**vb**

je **linear velocity originu body frame vyjadrená v body coordinates**.

To je veľmi dôležitá interpretácia a pri body twist je veľmi intuitívna.

---

## 7. Príklad body twistu na mobilnom robote

Predstav si mobilného robota, ktorý je natočený o 90° voči world x-axis. Jeho vlastná x-axis teda smeruje pozdĺž world y-axis.

Robot sa práve pohybuje dopredu po svojej vlastnej x-axis rýchlosťou 1 m/s.

V body coordinates je jeho linear velocity veľmi jednoduchá:

**vb = (1, 0, 0)**

Pre robota je to jednoducho „jeden meter za sekundu dopredu".

V space coordinates však tá istá physical velocity vyzerá:

**pdot = (0, 1, 0)**

pretože robotova x-axis je momentálne zarovnaná s world y-axis.

Toto krásne ukazuje, že body twist a spatial description nemusia mať rovnaké čísla, aj keď opisujú ten istý physical motion.

---

## 8. Twist ako 6D vector

Body twist teda zapisujeme:

**Vb = [omega-b; vb]**

Prvé tri components hovoria, ako sa teleso otáča, a posledné tri components hovoria, ako sa origin body frame pohybuje, pričom všetko je vyjadrené v body coordinates.

Ak napríklad máme:

**Vb = (0, 0, 2, 1, 0, 0)**

môžeme si to predstaviť tak, že teleso sa momentálne otáča okolo svojej z-axis angular speed 2 rad/s a zároveň sa jeho body origin pohybuje pozdĺž body x-axis rýchlosťou 1 m/s.

Twist teda robí pre celý rigid-body motion niečo veľmi podobné tomu, čo angular velocity robila pre rotation. Angular velocity spojila instantaneous rotation do jedného 3D vectora. Twist spojí instantaneous rotation a translation do jedného 6D vectora.

---

## 9. Prečo zapisujeme twist aj ako 4 x 4 matrix

Podobne ako sme angular velocity vector omega dokázali zapísať ako skew-symmetric matrix [omega], aj twist V môžeme previesť do matrix formy.

Ak:

**V = [omega; v]**

potom definujeme:

\`\`\`
[V] =
| [omega] | v   |
| 0 0 0   | 0   |
\`\`\`

Táto 4 x 4 matrix sa niekedy nazýva matrix representation twistu.

Jej horná ľavá časť je skew-symmetric matrix angular velocity a horný pravý column je linear časť v.

Presne takúto formu sme už dostali pri:

**T-1 Tdot**

Preto môžeme zapísať:

**[Vb] = T-1 Tdot**

Neskôr uvidíme, že táto matrix forma je veľmi užitočná pri matrix exponential a pri prechode medzi instantaneous velocity a finite rigid-body motion.

---

## 10. Priestor se(3)

Pri rotations sme mali dve úzko súvisiace množiny.

**SO(3)** obsahovalo rotation matrices, teda orientations.

**so(3)** obsahovalo 3 x 3 skew-symmetric matrices, ktoré používame na opis angular velocities a exponential coordinates rotations.

Pri rigid-body motion sa objaví rovnaká dvojica.

**SE(3)** obsahuje homogeneous transformation matrices T, teda configurations rigid body.

Zodpovedajúci priestor instantaneous motions sa nazýva:

**se(3)**

Jeho prvky majú tvar:

\`\`\`
[V] =
| [omega] | v   |
| 0 0 0   | 0   |
\`\`\`

Môžeme si teda vytvoriť paralelu:

**SO(3) <-> orientation**

**so(3) <-> angular motion**

a teraz:

**SE(3) <-> rigid-body configuration**

**se(3) <-> rigid-body instantaneous motion**

Tento vzťah bude v nasledujúcich lekciách veľmi dôležitý.

---

## 11. Spatial twist - ten istý motion z pohľadu space frame

Body twist nie je jediný spôsob, ako môžeme instantaneous motion rigid body opísať.

Môžeme ho vyjadriť aj vzhľadom na space frame.

Definujeme:

**[Vs] = Tdot Tsb-1**

Všimni si rozdiel v poradí.

Pri body twist sme mali:

**[Vb] = T-1 Tdot**

Pri spatial twist máme:

**[Vs] = Tdot T-1**

Toto poradie nie je náhodné. Je to presne rovnaká štruktúra ako pri angular velocity:

**[omega-b] = R-1 Rdot**

a:

**[omega-s] = Rdot R-1**

Rozdiel teda vychádza z toho, v ktorom frame chceme motion vyjadriť.

---

## 12. Odvodíme spatial twist krok za krokom

Máme:

\`\`\`
Tdot =
| Rdot | pdot |
| 0    | 0    |
\`\`\`

a:

\`\`\`
T-1 =
| RT | -RT p |
| 0  | 1     |
\`\`\`

Teraz vypočítame:

**Tdot T-1**

Horná ľavá časť je:

**Rdot RT**

To už poznáme:

**Rdot RT = [omega-s]**

Čiže angular časť je jednoducho space angular velocity.

Horná pravá časť však tentoraz nie je iba pdot.

Pri matrix multiplication dostaneme:

**Rdot(-RT p) + pdot**

teda:

**pdot - Rdot RT p**

Keďže:

**Rdot RT = [omega-s]**

môžeme napísať:

**vs = pdot - [omega-s]p**

A pretože:

**[omega-s]p = omega-s x p**

dostaneme:

**vs = pdot - omega-s x p**

Toto je jedna z najdôležitejších rovníc celej lekcie.

---

## 13. Prečo vs nie je jednoducho pdot

Tu sa objavuje veľmi častá chyba.

Pri body twist sme mali:

**vb = RT pdot**

a vb sme mohli interpretovať ako velocity body originu vyjadrenú v body coordinates.

Pri spatial twist však:

**vs ≠ pdot**

vo všeobecnosti.

Máme:

**vs = pdot - omega-s x p**

Prečo sa tam objaví ďalší člen?

Pretože spatial twist neopisuje linear časť motion rovnakým spôsobom ako body twist. Je zostavený tak, aby celý rigid-body motion bol vyjadrený vzhľadom na space frame.

Keď teleso rotuje a jeho body origin sa nenachádza v origin space frame, samotná rotation prispieva k velocity body originu. Preto musíme túto rotačnú časť oddeliť.

Práve to robí člen:

**omega-s x p**

---

## 14. Intuitívny príklad: tyč rotujúca okolo world originu

Predstav si dlhú tyč rotujúcu okolo world originu.

Na jej konci je body frame {b}. Jeho origin sa teda pohybuje po kružnici.

Povedzme, že position body originu je:

**p**

a angular velocity celej tyče je:

**omega-s**

Keď rigid body rotuje okolo originu, velocity pointu na position p je:

**pdot = omega-s x p**

To už poznáme z angular velocities.

Teraz tento výsledok dosadíme do spatial twist:

**vs = pdot - omega-s x p**

Dostaneme:

**vs = 0**

To je veľmi zaujímavé.

Body origin sa pritom fyzicky pohybuje po kružnici a jeho velocity pdot nie je zero. Spatial twist však má linear časť vs = 0.

Prečo?

Pretože celý motion je čistá rotation okolo space originu. Spatial twist tento motion veľmi prirodzene opisuje ako:

**angular velocity ≠ 0**

a:

**linear časť = 0**

Toto je perfektný príklad toho, prečo vs nemôžeme automaticky interpretovať ako velocity body originu.

---

## 15. Čo teda vs fyzicky znamená

Existuje veľmi pekná geometrická interpretácia.

Predstav si rigid body ako nekonečne rozšírené teleso. Nemusí nás zaujímať iba jeho fyzicky viditeľná časť. Matematicky si môžeme predstaviť všetky points pevne spojené s týmto rigid body.

Potom sa pozrieme na point tohto „rozšíreného telesa", ktorý sa v danom okamihu nachádza presne v origin space frame.

Jeho instantaneous linear velocity je práve:

**vs**

To môže spočiatku znieť zvláštne, ale na predchádzajúcom príklade to dáva dokonalý zmysel.

Ak teleso vykonáva čistú rotation okolo space originu, point telesa ležiaci práve v centre rotation má zero linear velocity. Preto:

**vs = 0**

Aj keď body origin niekde na tyči obieha po kružnici a jeho pdot je nenulové.

---

## 16. Body twist a spatial twist opisujú ten istý pohyb

Tu je veľmi dôležité nezískať dojem, že body twist a spatial twist opisujú dva rôzne motions.

Neopisujú.

Rigid body má v konkrétnom okamihu iba jeden physical instantaneous motion.

Rozdiel je v tom, **ako tento motion reprezentujeme**.

Body twist používa body coordinates:

**Vb = [omega-b; vb]**

Spatial twist používa space coordinates:

**Vs = [omega-s; vs]**

Angular časti omega-b a omega-s predstavujú tú istú fyzickú angular velocity, iba vyjadrenú v rôznych frames.

Pri linear častiach je rozdiel o niečo subtílnejší. vb je velocity body originu vyjadrená v body coordinates. vs má inú geometrickú interpretáciu - je linear velocity pointu rozšíreného rigid body, ktorý sa práve nachádza v space origin.

Preto nestačí povedať:

**„vs je vb vyjadrené vo world coordinates."**

Takéto tvrdenie by bolo nesprávne.

---

## 17. Porovnanie body twist a spatial twist na jednom príklade

Predstav si dlhú tyč rotujúcu v rovine okolo world originu. Body frame je pripevnený na jej konci.

Tyč sa otáča angular speed:

**1 rad/s**

okolo z-axis.

Body origin je vzdialený 2 m od centre rotation.

Jeho linear speed je preto:

**2 m/s**

pretože pri kruhovom motion platí:

**speed = radius x angular speed**

teda:

**2 x 1 = 2 m/s**

Body twist bude obsahovať túto velocity body originu, iba vyjadrenú v body coordinates.

Spatial twist však môže byť:

**Vs = (0, 0, 1, 0, 0, 0)**

Prečo sú posledné tri components zero?

Pretože teleso vykonáva čistú rotation okolo space originu. Spatial twist nepotrebuje osobitne pridávať linear velocity body originu - tá už automaticky vznikne z angular velocity a position pointu.

Ak chceme velocity body originu, použijeme:

**pdot = omega-s x p + vs**

V tomto prípade vs = 0, takže:

**pdot = omega-s x p**

Presne ako očakávame.

---

## 18. Všeobecný vzťah pre velocity pointu

Z rovnice:

**vs = pdot - omega-s x p**

môžeme jednoducho vyjadriť pdot.

Pripočítame omega-s x p na obe strany:

**pdot = omega-s x p + vs**

Tento vzťah má veľmi pekný fyzický význam.

Velocity ľubovoľného pointu rigid body môžeme chápať ako kombináciu dvoch príspevkov.

Prvý:

**omega-s x p**

vzniká kvôli rotation.

Druhý:

**vs**

je spoločná linear časť spatial twistu.

Predstav si napríklad pohybujúce sa koleso. Point na kolese môže mať velocity preto, že celé koleso postupuje dopredu, a zároveň ďalšiu velocity preto, že sa koleso otáča.

Práve tento druh skladania pohybov je ukrytý vo vzťahu:

**pdot = omega-s x p + vs**

---

## 19. Čistá translation ako jednoduchý twist

Pozrime sa teraz na opačný extrém.

Rigid body sa vôbec neotáča, iba sa posúva.

Vtedy:

**omega = 0**

a twist má tvar:

**V = [0; v]**

Predstav si výťah pohybujúci sa rovno nahor bez rotation. Každý point kabíny má rovnakú linear velocity a angular velocity je zero.

Ak sa kabína pohybuje nahor rýchlosťou 2 m/s, môžeme mať napríklad:

**Vs = (0, 0, 0, 0, 0, 2)**

Ak sú space a body axes momentálne rovnako orientované, rovnaké čísla dostaneme aj pre body twist.

Pri čistej translation sa teda význam linear časti twistu stáva veľmi intuitívny.

---

## 20. Čistá rotation ukazuje rozdiel ešte jasnejšie

Teraz si vezmime rigid body, ktoré čisto rotuje.

Ak centre rotation leží v space origin, spatial twist môže mať:

**Vs = [omega-s; 0]**

Linear časť je zero.

Ak však body origin neleží na rotation axis, fyzicky sa pohybuje a jeho velocity pdot bude nenulová.

To opäť ukazuje:

**vs nie je velocity body originu.**

Naopak pri body twist je vb vždy priamo velocity body originu vyjadrená v body coordinates.

Táto asymetria medzi body a spatial twist je jedna z najdôležitejších vecí, ktoré treba z tejto lekcie pochopiť.

---

## 21. Prečo majú vzorce opačné poradie

Teraz sa vráťme k dvojici:

**[Vb] = T-1 Tdot**

a:

**[Vs] = Tdot T-1**

Prečo raz stojí inverse matrix vľavo a raz vpravo?

Nie je to náhodná konvencia.

Rovnakú štruktúru sme mali pri rotations:

**[omega-b] = R-1 Rdot**

**[omega-s] = Rdot R-1**

Násobenie inverse z príslušnej strany spôsobí, že instantaneous change vyjadríme v inom reference frame.

Pri body twist výsledok prirodzene patrí k body coordinates.

Pri spatial twist výsledok prirodzene patrí k space coordinates.

Túto logiku budeme ešte používať aj pri transformations twists medzi rôznymi frames.

---

## 22. Configuration a twist nesmieme zamieňať

Je veľmi užitočné spojiť túto tému s Chapter 2.

Configuration odpovedá:

**„Kde rigid body je a ako je natočené?"**

Twist odpovedá:

**„Ako sa rigid body z tejto configuration práve teraz pohybuje?"**

Transformation matrix:

**T ∈ SE(3)**

je teda configuration.

Twist:

**V**

je instantaneous velocity.

Predstav si dve identické autá na rovnakom mieste a s rovnakým natočením. Majú rovnakú configuration T. Jedno však stojí a druhé sa pohybuje dopredu a zatáča.

Ich T môže byť v danom okamihu rovnaké, ale ich twists sú odlišné.

To je presne rovnaký rozdiel ako medzi position a velocity pri obyčajnom point mass.

---

## 23. SE(3) a se(3) - dve súvisiace, ale odlišné veci

Teraz už môžeme lepšie pochopiť rozdiel medzi:

**SE(3)**

a:

**se(3)**

SE(3) obsahuje transformations:

**T**

ktoré opisujú finite configurations rigid body.

se(3) obsahuje matrices:

**[V]**

ktoré opisujú instantaneous rigid-body motions.

Môžeme si to predstaviť takto:

**T hovorí, kde sme.**

**[V] hovorí, ktorým smerom a ako rýchlo sa z tejto configuration práve pohybujeme.**

Toto úzko súvisí s myšlienkou tangent space, ktorú sme už stretli pri configuration spaces. Configuration space nemusí byť obyčajný Euclidean vector space, ale instantaneous velocities pri konkrétnej configuration môžeme reprezentovať pomocou vectorov.

Twist je práve takýto velocity object pre rigid body.

---

## 24. Prečo sú twists v robotike praktické

Predstav si robotické rameno, ktoré vedie gripper k poháru.

Nestačí controlleru povedať iba:

„Gripper má byť na tejto position a v tejto orientation."

Počas motion potrebuje vedieť aj:

„Ako rýchlo sa má momentálne posúvať a ako rýchlo sa má otáčať?"

Twist poskytuje obidve informácie naraz.

To je veľmi užitočné pri riadení end-effectora, pri Jacobianoch, pri plánovaní motion aj pri práci s cameras a mobile robots.

Napríklad Jacobian robotického ramena bude neskôr spájať joint velocities s twistom end-effectora.

To znamená, že z velocities jednotlivých joints dokážeme vypočítať:

**„Aký instantaneous motion práve vykonáva gripper?"**

Twist je preto jeden zo základných jazykov robotickej kinematiky.

---

## 25. Najčastejšia chyba: vb a vs nie sú to isté čísla v inom frame

Toto si zaslúži samostatné upozornenie.

Mohlo by sa zdať, že keď:

**omega-b**

a:

**omega-s**

sú tá istá angular velocity vyjadrená v rôznych coordinates, potom aj:

**vb**

a:

**vs**

musia byť jednoducho rovnaká linear velocity vyjadrená v rôznych frames.

Nie je to tak.

Body linear component:

**vb**

je velocity body originu vyjadrená v body coordinates.

Spatial linear component:

**vs**

má inú geometrickú definíciu. Môžeme ju interpretovať ako velocity pointu rozšíreného rigid body, ktorý sa práve nachádza v space origin.

Preto napríklad pri čistej rotation okolo space origin môže byť:

**vs = 0**

aj keď:

**vb ≠ 0**

pretože body origin fyzicky obieha okolo axis.

Toto nie je rozpor. Obe quantities jednoducho reprezentujú linear časť twistu odlišným spôsobom.

---

## 26. Ako do seba zapadajú všetky doterajšie pojmy

Teraz sa začína ukazovať veľmi pekná štruktúra Modern Robotics.

Pri rotations sme mali:

**R ∈ SO(3)**

pre orientation,

a:

**[omega] ∈ so(3)**

pre angular velocity.

Pri celom rigid-body motion máme:

**T ∈ SE(3)**

pre configuration,

a:

**[V] ∈ se(3)**

pre twist.

Pri rotations sme vedeli získať angular velocity cez:

**RT Rdot**

alebo:

**Rdot RT**

Teraz máme úplne analogicky:

**T-1 Tdot**

alebo:

**Tdot T-1**

Toto nie sú dve náhodne podobné sady vzorcov. Ide o rovnakú geometrickú myšlienku, najprv aplikovanú iba na rotation a teraz rozšírenú na celý rigid-body motion.

---

## Rekapitulácia najdôležitejších pojmov

**Twist V** je 6D vector opisujúci instantaneous motion rigid body. Obsahuje angular časť omega a linear časť v.

**Body twist Vb** je twist vyjadrený vzhľadom na body frame. Platí [Vb] = T-1 Tdot.

**Spatial twist Vs** je twist vyjadrený vzhľadom na space frame. Platí [Vs] = Tdot T-1.

**Angular časť twistu omega** opisuje instantaneous rotation rigid body. omega-b a omega-s predstavujú tú istú fyzickú angular velocity, iba vyjadrenú v rôznych reference frames.

**vb** je linear časť body twistu. Je to velocity originu body frame vyjadrená v body coordinates: vb = RT pdot.

**vs** je linear časť spatial twistu. Platí: vs = pdot - omega-s x p. Vo všeobecnosti teda nejde jednoducho o velocity body originu v space coordinates.

**Velocity body originu** - zo spatial twistu ju môžeme vypočítať: pdot = omega-s x p + vs.

**Matrix representation twistu [V]** má tvar s [omega] vľavo hore a v napravo a patrí do se(3).

**SE(3)** je priestor rigid-body configurations reprezentovaných homogeneous transformation matrices.

**se(3)** je priestor matrix representations twists, teda instantaneous rigid-body motions.

**Configuration vs. twist** - configuration T hovorí, kde teleso je. Twist V hovorí, ako sa z tejto configuration práve pohybuje.

---

## Čo si z tejto lekcie odniesť

Homogeneous transformation matrix T nám umožnila spojiť position a orientation do jedného opisu rigid-body configuration. Keď však chceme opísať motion, potrebujeme analogický objekt pre velocity. Týmto objektom je **twist**.

Twist má šesť components. Tri opisujú angular velocity a tri linear časť motion. Najdôležitejšie však je, že twist môžeme reprezentovať dvoma spôsobmi podľa reference frame. Body twist získame pomocou:

**[Vb] = T-1 Tdot**

a spatial twist pomocou:

**[Vs] = Tdot T-1**

Body twist má veľmi prirodzenú interpretáciu: omega-b je angular velocity vyjadrená v body coordinates a vb je velocity body originu vyjadrená v body coordinates.

Pri spatial twist je linear časť menej intuitívna. Platí:

**vs = pdot - omega-s x p**

a preto vs vo všeobecnosti nie je velocity body originu. Najlepšie to vidíme pri rigid body, ktoré čisto rotuje okolo space originu. Body origin môže krúžiť veľkou rýchlosťou, ale spatial linear component môže byť zero, pretože celý motion je z pohľadu space frame čistá rotation okolo jeho originu.

Celá téma zároveň nadväzuje na predchádzajúce kapitoly veľmi systematicky. Rotation matrix R bola configuration orientation a angular velocity omega opisovala jej instantaneous change. Homogeneous transformation T teraz opisuje celú rigid-body configuration a twist V opisuje jej instantaneous change.

V ďalšej časti sa k twists pridá ďalšia veľmi dôležitá geometrická interpretácia. Uvidíme, ako medzi body a spatial twistom prechádzať pomocou **Adjoint transformation** a ako možno twist chápať ako motion okolo **screw axis**. Tým sa rotation a translation spoja nielen algebraicky, ale aj do veľmi konkrétnej geometrickej predstavy pohybu rigid body.`;
