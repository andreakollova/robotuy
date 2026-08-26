// Chapter 2.3.2 – Lekcia 6: Reprezentácia konfiguračného priestoru
// Full lesson content - DO NOT SHORTEN

export const ch232Content = `# Lekcia 6: Reprezentácia konfiguračného priestoru

V predchádzajúcej časti sme sa venovali topológii configuration space. Zistili sme, že dva systémy môžu mať rovnaký počet degrees of freedom, ale ich configuration spaces môžu mať úplne odlišný tvar. Rovina a povrch gule sú napríklad oba dvojrozmerné priestory, no z pohľadu topológie nie sú rovnaké.

V robotike však nestačí vedieť, aký configuration space robot má. Ak chceme jeho konfiguráciu uložiť v počítači, vypočítať jeho pohyb alebo neskôr riadiť jeho end-effector, každú konfiguráciu musíme vedieť vyjadriť konkrétnymi číslami. Spôsob, akým tieto čísla zvolíme, nazývame **representation** – reprezentácia configuration space.

Pri jednoduchých priestoroch je reprezentácia pomerne priamočiara. Pri zakrivených priestoroch však vzniká zaujímavý problém: najjednoduchší zápis nemusí byť zároveň najpraktickejší. Práve preto sa v robotike používajú dva dôležité prístupy – **explicit parametrization** a **implicit representation**.

---

## 01. Configuration space a jeho reprezentácia nie sú to isté

Configuration space opisuje všetky konfigurácie, ktoré môže systém nadobudnúť. Reprezentácia určuje, akými číslami budeme jednu konkrétnu konfiguráciu zapisovať.

Tento rozdiel je dôležitý, pretože rovnakú fyzickú konfiguráciu môžeme zapísať viacerými spôsobmi. Ak napríklad opisujeme polohu robota v miestnosti, môžeme si zvoliť coordinate frame v jednom rohu miestnosti. Poloha robota potom dostane určité súradnice x a y. Ak začiatok coordinate frame presunieme do stredu miestnosti, robot dostane iné hodnoty x a y, hoci sa fyzicky vôbec nepohol.

Rovnako môžeme vzdialenosť zapisovať v metroch alebo milimetroch. Hodnota 1 meter a hodnota 1000 milimetrov vyzerajú číselne úplne inak, ale opisujú rovnakú vzdialenosť.

Reprezentácia teda závisí od našej voľby. Configuration space samotný nie.

To je zároveň rozdiel oproti topology. Topológia opisuje základný tvar priestoru a nemení sa podľa toho, aké súradnice si vyberieme. Reprezentácia je iba matematický spôsob, ktorým tento priestor opíšeme.

---

## 02. Prečo vôbec potrebujeme číselnú reprezentáciu

Robotický systém potrebuje s konfiguráciou pracovať numericky. Riadiaci program musí napríklad poznať aktuálnu polohu jednotlivých joints, vypočítať novú konfiguráciu, sledovať pohyb alebo určiť polohu a orientation end-effectora.

Preto potrebujeme každému bodu configuration space priradiť konkrétne čísla.

Pri Euclidean spaces je to jednoduché. Polohu na priamke môžeme určiť jedným číslom x. Polohu v rovine dvomi číslami x a y. Polohu v trojrozmernom priestore tromi číslami x, y a z.

Tieto hodnoty môžeme následne uložiť do vectora a používať pri matematických výpočtoch.

Ak teda pracujeme s R3, trojica x, y, z je veľmi prirodzená reprezentácia. Každú z týchto troch hodnôt môžeme meniť nezávisle a každá trojica reálnych čísel predstavuje nejaký bod v priestore.

Pri configuration spaces, ktoré majú zakrivený alebo uzavretý tvar, to však už nemusí byť také jednoduché.

---

## 03. Dva degrees of freedom nemusia znamenať obyčajné dve súradnice

Dobrým príkladom je povrch gule. Na určenie miesta na povrchu Zeme bežne používame dve hodnoty – latitude a longitude, teda zemepisnú šírku a dĺžku.

Potrebujeme dve nezávislé hodnoty, pretože povrch gule je dvojrozmerný. Má teda 2 DOF. Podobne aj obyčajná rovina má 2 DOF a bod na nej môžeme opísať pomocou x a y.

Napriek tomu medzi týmito dvoma priestormi existuje zásadný rozdiel.

Na rovine môžeme súradnice x a y používať bez problémov všade. Neexistuje miesto, kde by x alebo y náhle prestalo dávať zmysel. Povrch gule je však uzavretý a zakrivený. Keď sa ho pokúsime celý opísať iba dvomi súradnicami latitude a longitude, objavia sa miesta, kde sa tieto súradnice prestanú správať dobre.

Najvýraznejšie je to na severnom a južnom póle.

---

## 04. Čo je singularita reprezentácie

Longitude určuje polohu v smere východ – západ. Na väčšine Zeme funguje bez problémov. Na póloch sa však všetky poludníky stretávajú v jednom bode.

Na severnom póle preto nemáme jednoznačnú longitude. Môžeme sa k nemu dostať po poludníku s longitude 0°, 30°, 90° alebo prakticky akoukoľvek inou hodnotou – stále skončíme v tom istom bode.

Samotný povrch Zeme pritom v tomto mieste nemá žiadnu chybu. Keby sme po ňom pohybovali robotom, mohol by cez pól prejsť úplne plynulo. Problém vznikol iba preto, že sme si na opis jeho polohy vybrali latitude a longitude.

Takémuto problémovému miestu v zvolenom spôsobe zápisu hovoríme **singularity of the representation** – singularita reprezentácie.

Toto rozlíšenie je v robotike veľmi dôležité. Singularita nemusí znamenať, že sa so samotným robotom alebo jeho configuration space deje niečo zvláštne. Niekedy je problém iba v číslach, ktorými sme konfiguráciu reprezentovali.

---

## 05. Prečo je singularita problémom pri pohybe

Problém sa ešte výraznejšie ukáže, keď začneme sledovať velocity.

Uvažujme pohyb po povrchu gule, ktorý prechádza cez oblasť veľmi blízko pólu. Skutočná rýchlosť pohybu môže byť po celý čas rovnaká a samotná trajektória môže byť úplne plynulá. Longitude sa však v blízkosti pólu môže meniť veľmi rýchlo, pretože jednotlivé poludníky sa tam nachádzajú veľmi blízko pri sebe.

Výsledkom je zvláštna situácia: fyzický pohyb je pokojný a plynulý, ale čísla použité na jeho opis sa môžu meniť veľmi prudko.

To je nepríjemné najmä vtedy, keď velocity počítame ako zmenu súradníc v čase. V blízkosti singularity môže takáto číselná velocity nadobúdať extrémne hodnoty, hoci skutočný bod sa nepohybuje nijako extrémne.

Ak vieme, že sa náš systém nikdy nedostane do blízkosti singularity, nemusí nám to prekážať. Ak však potrebujeme reprezentáciu použiteľnú v celom configuration space, musíme problém vyriešiť.

Máme na to dva hlavné prístupy.

---

## 06. Explicit parametrization

Prvým prístupom je **explicit parametrization**.

Jej základná myšlienka je veľmi jednoduchá: configuration space reprezentujeme najmenším možným počtom nezávislých čísel.

Ak má priestor n degrees of freedom, použijeme n parametrov.

Povrch gule má 2 DOF, preto ho môžeme reprezentovať dvomi parametrami – latitude a longitude. Rovinný rigid body má 3 DOF, preto jeho konfiguráciu môžeme reprezentovať tromi hodnotami: dvomi pre position a jedným uhlom pre orientation.

Výhodou explicit parametrization je teda úspornosť. Každé číslo predstavuje jeden nezávislý parameter a nepoužívame viac hodnôt, než potrebujeme.

Musíme však zároveň určiť, aký rozsah jednotlivé parametre môžu nadobúdať. Pri latitude môžeme používať rozsah od -90° do +90° a pri longitude napríklad od -180° do +180°.

Práve na hraniciach a v určitých miestach takéhoto zápisu sa však môže prejaviť topology priestoru. Longitude sa po celej otočke vracia na začiatok a na póloch vzniká singularita.

Explicit parametrization teda používa minimum čísel, ale pri niektorých configuration spaces nemusí existovať jedna takáto reprezentácia, ktorá sa bez singularity správa dobre úplne všade.

---

## 07. Coordinate charts – jeden priestor môžeme opísať viacerými súradnicami

Jedným riešením je rozdeliť configuration space na oblasti a pre každú používať vhodnú reprezentáciu.

Jednej takejto lokálnej reprezentácii hovoríme **coordinate chart**.

Coordinate chart nemusí pokrývať celý configuration space. Stačí, ak dobre reprezentuje určitú jeho časť a v tejto oblasti nemá singularitu.

Pri povrchu gule by sme napríklad mohli používať jednu sústavu súradníc pre veľkú časť povrchu. Keď sa dostaneme do oblasti, kde sa táto reprezentácia začína správať zle, môžeme prejsť na inú sústavu súradníc, ktorá je pre danú oblasť vhodnejšia.

Samotný bod sa pri tomto prepnutí nikam nepremiestni. Zmeníme iba čísla, ktorými ho opisujeme.

Je to podobný princíp ako pri coordinate frames v robotike. Jeden fyzický bod môže mať rôzne súradnice podľa toho, vzhľadom na ktorý frame jeho polohu vyjadrujeme.

---

## 08. Atlas spája viac coordinate charts

Ak máme viac coordinate charts, ktoré sa navzájom prekrývajú a spolu dokážu pokryť celý configuration space, nazývame ich **atlas**.

Názov pochádza z rovnakého princípu ako geografický atlas. Namiesto toho, aby jedna mapa musela dokonale zobrazovať celý povrch Zeme, používame viac máp jednotlivých oblastí.

Matematický atlas funguje podobne. Každý chart opisuje určitú časť configuration space a oblasti jednotlivých charts sa prekrývajú, aby sme medzi nimi mohli prechádzať.

Veľkou výhodou tohto prístupu je, že stále používame minimálny počet parametrov. Ak má configuration space 2 DOF, každý chart môže používať iba dve čísla.

Nevýhodou je komplikovanejšia práca. Program musí vedieť, ktorý chart práve používa, kedy je vhodné prejsť na iný a ako prepočítať súradnice medzi nimi.

Pri obyčajnom Euclidean space tento problém nemáme. Napríklad celé R3 môžeme reprezentovať jedinou trojicou x, y, z bez potreby prepínať medzi viacerými charts.

---

## 09. Druhé riešenie – implicit representation

Druhou možnosťou je zvoliť úplne iný prístup. Namiesto toho, aby sme za každú cenu používali minimálny počet parametrov, dovolíme si použiť viac čísel, než má systém degrees of freedom.

Tieto čísla však nemôžu nadobúdať ľubovoľné hodnoty. Musia spĺňať určité constraints.

Tomuto spôsobu hovoríme **implicit representation**.

Opäť si môžeme pomôcť povrchom jednotkovej gule. Vieme, že má 2 DOF. Namiesto latitude a longitude však môžeme polohu bodu reprezentovať tromi Cartesian coordinates:

**x, y, z**

Na prvý pohľad to vyzerá, akoby sme zrazu mali 3 DOF. Nemáme. Hodnoty x, y a z totiž nie sú nezávislé.

Aby bod zostal na povrchu jednotkovej gule, musí vždy platiť:

$$x^2 + y^2 + z^2 = 1$$

Máme teda tri čísla, ale zároveň jednu nezávislú constraint. Z troch možných nezávislých hodnôt nám preto zostávajú iba dve.

**3 premenné - 1 nezávislá constraint = 2 DOF**

A to presne zodpovedá povrchu gule.

---

## 10. Počet čísel v reprezentácii nie je počet DOF

Toto je veľmi dôležité pravidlo, pretože sa s ním budeme v ďalších kapitolách stretávať opakovane.

**Počet čísel, ktorými konfiguráciu zapisujeme, nemusí byť rovnaký ako počet degrees of freedom systému.**

Ak máme tri čísla x, y, z, ale sú spojené podmienkou x2 + y2 + z2 = 1, nemôžeme ich meniť všetky nezávisle. Ak zvolíme x a y, možnosti pre z sú už obmedzené tak, aby výsledný bod zostal na guli.

Preto stále existujú iba dve nezávislé možnosti pohybu.

Všeobecne platí, že ak configuration space s n DOF reprezentujeme pomocou m čísel, pričom m je väčšie alebo rovné n, potrebujeme m - n nezávislých constraints.

Napríklad pri 2 DOF môžeme použiť tri čísla a jednu constraint. Pri 3 DOF by sme mohli použiť štyri čísla a jednu constraint alebo napríklad deväť čísel a šesť nezávislých constraints.

Rozhodujúce teda nie je, koľko čísel vidíme v zápise, ale koľko z nich môžeme meniť nezávisle.

---

## 11. Configuration space môže byť vložený do väčšieho priestoru

Implicit representation môžeme pochopiť aj geometricky.

Povrch gule je dvojrozmerný, ale nachádza sa v trojrozmernom priestore. Na opis jeho bodov preto používame tri súradnice x, y, z, pričom constraint zabezpečuje, že sa môžeme nachádzať iba na povrchu gule.

Hovoríme, že dvojrozmerný surface je **embedded** – vložený – do trojrozmerného priestoru.

Podobne môžeme configuration space robota reprezentovať ako určitý surface vo väčšom Euclidean space. Väčší priestor nám poskytne jednoduché súradnice a constraints určia, ktoré body tohto priestoru skutočne predstavujú platné konfigurácie robota.

To je presne podstata implicit representation.

Namiesto hľadania minimálneho počtu súradníc povieme približne: „Použijem viac jednoduchých čísel a potom matematicky určím, ktoré ich kombinácie sú dovolené."

Tento prístup bude veľmi užitočný aj pri closed-chain robots, pretože tam môžeme použiť všetky joint coordinates a pomocou loop-closure constraints určiť, ktoré kombinácie joint positions sú fyzicky možné.

---

## 12. Prečo je implicit representation užitočná

Mohlo by sa zdať, že používanie väčšieho počtu čísel je zbytočne komplikované. Ak má systém 2 DOF, prečo nepoužiť jednoducho dve čísla?

Dôvodom je, že minimálny počet čísel nemusí znamenať najlepšiu reprezentáciu pre výpočty.

Latitude a longitude používajú iba dve čísla, ale majú singularities. Reprezentácia x, y, z používa tri čísla, no bod sa môže po celej guli pohybovať plynulo a jeho súradnice sa budú meniť plynulo aj pri prechode cez póly.

Nemusíme prepínať medzi viacerými coordinate charts. Rovnaký zápis funguje na celom povrchu.

Za jedno číslo navyše sme teda získali veľmi dôležitú vlastnosť: **singularity-free representation**.

To je dôvod, prečo sa v robotike často oplatí použiť redundantnú reprezentáciu – teda reprezentáciu obsahujúcu viac čísel, než je samotný počet DOF.

---

## 13. Explicit a implicit representation riešia rovnaký problém inak

Rozdiel medzi týmito prístupmi si môžeme zhrnúť na povrchu gule.

Pri **explicit parametrization** použijeme latitude a longitude. Máme dve čísla pre 2 DOF. Je to minimálny zápis, ale jedna takáto reprezentácia má problematické miesta.

Pri **implicit representation** použijeme x, y, z a pridáme constraint x2 + y2 + z2 = 1. Používame tri čísla pre 2 DOF, ale získame jednu reprezentáciu, ktorá funguje plynulo na celom povrchu.

Ani jeden prístup nie je automaticky „správny" a druhý „nesprávny". Ide o kompromis.

Explicit parametrization šetrí počet parametrov, ale pri komplikovanejších spaces môže vyžadovať viac coordinate charts.

Implicit representation používa viac čísel a musí dodržiavať constraints, ale často poskytuje jednoduchší a plynulejší spôsob výpočtov.

V Modern Robotics sa preto bude veľmi často používať práve implicit representation.

---

## 14. Dôležitý príklad v robotike – orientation rigid body

Celá táto téma začne byť veľmi praktická už v nasledujúcej kapitole, keď budeme potrebovať reprezentovať orientation rigid body v 3D priestore.

Rigid body má v priestore celkovo 6 DOF:
- 3 translational DOF určujú jeho position
- a 3 rotational DOF určujú jeho orientation

Na samotnú orientation teda potrebujeme tri nezávislé hodnoty.

Mohli by sme preto očakávať, že najlepším riešením bude vždy reprezentovať orientation tromi číslami. Existujú aj takéto reprezentácie – napríklad roll, pitch a yaw angles alebo rôzne Euler angles.

Používajú presne tri parametre, takže ide o minimálne reprezentácie.

Majú však podobný problém, aký sme videli pri latitude a longitude: obsahujú **singularities**.

Pri určitých orientations sa zvolená trojica uhlov začne správať problematicky. Samotné rigid body môže byť v úplne normálnej orientation; problém opäť vzniká iba v spôsobe, akým sme ju zapísali.

Pre robotiku, kde chceme s orientations neustále počítať, to môže byť nepraktické.

---

## 15. Rotation matrix – deväť čísel pre tri degrees of freedom

Modern Robotics preto používa na reprezentáciu orientation predovšetkým **rotation matrix**.

Rotation matrix má veľkosť 3 x 3, takže obsahuje deväť čísel.

To môže byť spočiatku mätúce. Orientation rigid body má iba 3 rotational DOF, tak prečo používame deväť hodnôt?

Pretože týchto deväť hodnôt nie je nezávislých.

Rotation matrix musí spĺňať určité matematické constraints. Tieto constraints zabezpečujú, že jej riadky a stĺpce predstavujú správne orientované jednotkové osi coordinate frame.

Z deviatich hodnôt preto zostávajú iba tri nezávislé degrees of freedom.

Môžeme si to predstaviť rovnakým spôsobom ako pri guli:
- povrch gule → 3 čísla, 1 constraint → 2 DOF
- orientation rigid body → 9 čísel, 6 nezávislých constraints → 3 DOF

Rotation matrix je teda **implicit representation** orientation.

---

## 16. Prečo používať deväť čísel, keď by stačili tri

Na prvý pohľad môže deväť čísel pôsobiť ako horšie riešenie než tri angles. Z pohľadu množstva uložených dát skutočne používame viac hodnôt.

Lenže v robotike nám rotation matrix poskytuje veľmi dôležité výhody.

Predovšetkým nemá coordinate singularities typu, ktorý vzniká pri trojparametrových reprezentáciách, ako sú roll-pitch-yaw angles. Rovnakú rotation matrix môžeme používať bez toho, aby sme pri určitých orientations museli prechádzať na úplne inú reprezentáciu.

Rotation matrices sa zároveň veľmi prirodzene spájajú s linear algebra. Pomocou nich môžeme napríklad otáčať vectors alebo prepočítavať ich vyjadrenie medzi rôznymi coordinate frames.

A presne tieto operácie budeme v robotike robiť neustále.

Preto sa tu ukazuje dôležitá praktická myšlienka:

**Najmenší počet čísel nemusí znamenať najjednoduchšie výpočty.**

Niekedy je výhodnejšie použiť viac hodnôt, ak tým získame reprezentáciu, s ktorou sa pracuje jednoduchšie a spoľahlivejšie.

---

## 17. Existuje aj quaternion representation

Rotation matrix nie je jediná možnosť, ako sa vyhnúť problémom trojparametrových reprezentácií.

Ďalším známym spôsobom je **unit quaternion**.

Unit quaternion používa štyri čísla, ktoré musia spĺňať jednu podmienku – ich 4D vector musí mať jednotkovú dĺžku. Opäť teda používame viac čísel, než máme rotational DOF, ale tieto čísla nie sú všetky nezávislé.

Unit quaternions sú tiež singularity-free representation orientation a používajú menej čísel než rotation matrices.

Majú však jednu zaujímavú vlastnosť: každú fyzickú orientation reprezentujú dva unit quaternions. Hovoríme preto, že quaternion representation je **double covering** priestoru orientations.

V tejto knihe však bude hlavnou reprezentáciou rotation matrix, pretože veľmi dobre zapadá do ďalších nástrojov, ktoré budeme používať pri rigid-body motions.

---

## 18. Implicit representation je užitočná aj pri closed-chain robots

Význam implicit representation nekončí pri orientation.

Predstav si mechanizmus obsahujúci closed loop. Jeho joints sa nemôžu pohybovať úplne nezávisle, pretože links musia zostať navzájom spojené a slučka sa nesmie „roztrhnúť".

Nájsť minimálny počet parametrov, ktoré by priamo a bez problémov opisovali všetky možné konfigurácie takéhoto mechanizmu, môže byť veľmi komplikované.

Implicit representation ponúka jednoduchší prístup.

Môžeme použiť všetky joint coordinates a potom pridať equations, ktoré hovoria, že closed loops musia zostať uzavreté.

Nie každá ľubovoľná kombinácia joint coordinates potom predstavuje platnú konfiguráciu. Platné sú iba tie kombinácie, ktoré spĺňajú všetky constraints.

Takéto rovnice budeme v ďalšej časti nazývať **loop-closure equations**.

A práve preto je pochopenie implicit representation dôležité ešte pred kapitolou o configuration and velocity constraints.

---

## 19. Hlavný rozdiel, ktorý si z tejto lekcie treba odniesť

Pri reprezentovaní configuration space máme teda dve základné možnosti.

**Explicit parametrization** sa snaží použiť presne toľko nezávislých parametrov, koľko má systém DOF. Je úsporná, ale pri niektorých zakrivených configuration spaces môže mať singularities. Ak chceme taký priestor pokryť bez problémov celý, môžeme potrebovať viac coordinate charts, ktoré spolu vytvoria atlas.

**Implicit representation** používa viac čísel, než je počet DOF, ale tieto čísla musia spĺňať constraints. Výsledkom môže byť reprezentácia bez coordinate singularities, ktorá funguje rovnakým spôsobom v celom priestore.

Najjednoduchší príklad je povrch jednotkovej gule:

**latitude + longitude** → 2 parametre → explicit parametrization

oproti

**x, y, z + podmienka x2 + y2 + z2 = 1** → implicit representation

Oba zápisy opisujú ten istý dvojrozmerný priestor. Rozdiel je iba v tom, ako jeho body reprezentujeme.

---

## 20. Prečo je táto lekcia dôležitá pre ďalšiu robotiku

Táto časť môže na prvý pohľad pôsobiť ako čisto matematická téma, ale v skutočnosti pripravuje základ pre takmer všetko, čo príde ďalej.

V Chapter 3 budeme potrebovať presne reprezentovať position a orientation rigid body. Pri orientation použijeme rotation matrices – teda implicit representation.

Neskôr budeme pomocou týchto reprezentácií opisovať pohyb end-effectora, meniť coordinate frames, počítať forward kinematics a pracovať s velocities.

Pri closed-chain mechanisms sa zasa implicit representation objaví v podobe joint coordinates spojených loop-closure constraints.

Hlavná myšlienka preto nie je zapamätať si iba pojmy explicit a implicit.

Dôležité je pochopiť **prečo** vôbec existujú dva prístupy.

Configuration space je geometrický priestor všetkých možných konfigurácií. Aby s ním mohol pracovať počítač, musíme jeho body previesť na čísla. Pri jednoduchých Euclidean spaces to dokážeme priamo. Pri zakrivených spaces však minimálny počet súradníc môže vytvárať singularities.

Máme preto na výber: buď používame minimálny počet parametrov a podľa potreby viac coordinate charts, alebo použijeme viac čísel spojených constraints a získame implicit representation.

A práve druhý prístup bude v Modern Robotics mimoriadne dôležitý.

---

## Zapamätaj si

- **Configuration space** = všetky možné konfigurácie systému.
- **Representation** = čísla, ktorými konkrétnu konfiguráciu zapisujeme.
- **Explicit parametrization** = používame minimálny počet parametrov zodpovedajúci počtu DOF.
- **Coordinate chart** = jedna lokálna parametrizácia určitej časti priestoru.
- **Atlas** = viac prekrývajúcich sa coordinate charts, ktoré spolu pokrývajú celý priestor.
- **Singularity of representation** = problém zvolených súradníc, nie nutne problém samotného configuration space.
- **Implicit representation** = používame viac čísel a pridáme constraints, ktoré určujú, ktoré kombinácie sú platné.
- **Rotation matrix** = dôležitý príklad implicit representation; používa 9 čísel podliehajúcich 6 nezávislým constraints na reprezentáciu 3 rotational DOF.
- **Unit quaternion** = ďalšia singularity-free implicit representation orientation; používa 4 čísla s podmienkou jednotkovej dĺžky.`;
