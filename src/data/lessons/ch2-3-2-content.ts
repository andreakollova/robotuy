// Chapter 2.3.2 – Lekcia 6: Reprezentácia konfiguračného priestoru
// Full lesson content - DO NOT SHORTEN

export const ch232Content = `# Lekcia 6: Reprezentácia konfiguračného priestoru

V predchádzajúcej lekcii sme sa venovali topológii konfiguračného priestoru (configuration space). Už vieme, že počet stupňov voľnosti, teda degrees of freedom (DOF), nám hovorí, koľko nezávislých hodnôt potrebujeme na určenie konfigurácie systému.

Samotný počet DOF nám však ešte nepovie, ako máme konkrétnu konfiguráciu zapísať do počítača.

Predstav si napríklad robota pohybujúceho sa po rovnej podlahe. Jeho polohu môžeme jednoducho zapísať pomocou dvoch čísel:

**x = 2 m, y = 3 m**

To znamená, že robot sa nachádza 2 metre v jednom smere a 3 metre v druhom. Pri jednoduchom priestore, akým je rovina, je takýto zápis prirodzený.

Lenže nie každý konfiguračný priestor je rovina. Môže mať tvar kružnice, gule, torusu alebo ešte komplikovanejšieho priestoru. A práve vtedy vzniká zaujímavá otázka:

**Ako bod z takéhoto priestoru čo najlepšie zapíšeme pomocou čísel?**

Spôsob, akým konfiguráciu systému zapisujeme pomocou čísel, nazývame **representation — reprezentácia**.

A tu sa dostávame k hlavnej myšlienke tejto lekcie: **počet čísel, ktoré používame na zápis konfigurácie, nemusí byť rovnaký ako počet DOF systému.**

---

## 01. Configuration space a representation nie sú to isté

Najskôr je dôležité oddeliť dva pojmy, ktoré sa ľahko zamieňajú.

**Configuration space** je množina všetkých konfigurácií, ktoré môže systém fyzicky nadobudnúť.

**Representation** je iba spôsob, akým jednu konkrétnu konfiguráciu zapíšeme pomocou čísel.

Predstav si mobilného robota stojaceho v miestnosti. Ak umiestnime začiatok súradnicovej sústavy do ľavého dolného rohu miestnosti, jeho poloha môže byť:

**(2, 3)**

Ak však začiatok súradnicovej sústavy presunieme do stredu miestnosti, ten istý robot môže mať napríklad súradnice:

**(-1, 0.5)**

Robot sa pritom vôbec nepohol. Zmenil sa iba spôsob, akým jeho polohu zapisujeme.

Podobne môžeme tú istú vzdialenosť zapísať ako 1 meter, 100 centimetrov alebo 1000 milimetrov. Fyzická realita zostáva rovnaká, menia sa iba čísla, ktoré používame na jej opis.

Preto je dobré si zapamätať:

**Configuration je fyzický stav systému. Representation je jeho matematický zápis.**

---

## 02. Prečo robot vôbec potrebuje reprezentáciu?

Robotický program nedokáže pracovať s myšlienkou „rameno je trochu otočené doprava". Potrebuje konkrétne čísla.

Musí vedieť napríklad, že prvý kĺb má uhol 30°, druhý 45° a tretí -10°. Z týchto hodnôt potom môže vypočítať polohu end-effectora, rýchlosť pohybu alebo ďalší príkaz pre motory.

Pri jednoduchých euklidovských priestoroch je reprezentácia veľmi prirodzená.

Bod na priamke: **x**

Bod v rovine: **(x, y)**

Bod v trojrozmernom priestore: **(x, y, z)**

Pri bode v R3 máme tri DOF a zároveň používame tri čísla. Navyše môžeme x, y a z meniť nezávisle. Prakticky každá trojica reálnych čísel predstavuje nejaký bod v priestore.

Mohlo by sa preto zdať, že všeobecne platí:

**3 DOF = 3 čísla**

**2 DOF = 2 čísla**

Také jednoduché to však nie je.

---

## 03. Problém sa ukáže na povrchu Zeme

![Štyri topologicky rozdielne 2D configuration spaces a ich reprezentácie](/book/ch2/table2-2.png)

Predstav si, že nechceme opisovať bod vo voľnom 3D priestore, ale iba miesto na povrchu Zeme.

Na určenie polohy nám stačia dve hodnoty:

- zemepisná šírka (latitude)
- zemepisná dĺžka (longitude)

Povrch gule má teda 2 DOF. Nemôžeme sa pohybovať smerom dovnútra alebo von z gule, iba po jej povrchu.

Na prvý pohľad je všetko perfektné:

**2 DOF → 2 čísla**

Problém sa objaví na póloch.

Predstav si severný pól. Všetky poludníky sa tam stretávajú. To znamená, že longitude 0°, 30°, 90° aj 180° môžu označovať presne ten istý fyzický bod.

Samotný povrch Zeme pritom nie je nijako poškodený alebo zvláštny. Cez severný pól sa môžeš normálne prejsť.

Problém je iba v súradniciach, ktoré sme si zvolili.

Takéto problematické miesto nazývame **singularity of representation — singularita reprezentácie**.

---

## 04. Singularita nie je chyba fyzického priestoru

Toto rozlíšenie je v robotike veľmi dôležité.

Ak má reprezentácia singularitu, neznamená to automaticky, že samotný robot alebo jeho configuration space má problém.

Predstav si lietadlo letiace cez severný pól. Lietadlo sa môže pohybovať úplne plynulo a konštantnou rýchlosťou.

Jeho longitude sa však môže začať meniť veľmi rýchlo. Dôvodom nie je zrýchlenie lietadla. Dôvodom je to, že poludníky sú pri póle stále bližšie pri sebe.

Môže sa teda stať, že fyzický pohyb je veľmi malý, ale hodnota jednej zo súradníc urobí obrovský skok.

A to je pri robotických výpočtoch nepríjemné. Ak zmenu súradnice používame na výpočet velocity, môžeme dostať veľmi veľké číslo napriek tomu, že skutočný pohyb robota je pokojný.

Potrebujeme preto lepší spôsob reprezentácie.

---

## 05. Prvý prístup: explicit parametrization

Jednou možnosťou je používať presne toľko parametrov, koľko má systém stupňov voľnosti.

Tomuto prístupu hovoríme **explicit parametrization — explicitná parametrizácia**.

Ak má systém 2 DOF, používame dve nezávislé čísla. Ak má 3 DOF, používame tri.

Napríklad rigid body pohybujúce sa v rovine môžeme zapísať ako:

**q = (x, y, θ)**

kde:

- x určuje polohu v jednom smere,
- y určuje polohu v druhom smere,
- θ určuje natočenie.

Takéto teleso má 3 DOF a používame presne tri parametre.

Výhodou explicitnej parametrizácie je, že je úsporná. Nepoužívame žiadne zbytočné čísla.

Nevýhodou je, že pri zakrivených priestoroch nemusí existovať jedna minimálna reprezentácia, ktorá bude dobre fungovať všade.

Presne to sme videli pri latitude a longitude.

---

## 06. Coordinate charts: keď jedna mapa nestačí

Jedným riešením problému je prestať sa snažiť opísať celý configuration space jedinou sústavou súradníc.

Namiesto toho ho môžeme rozdeliť na oblasti a pre každú používať súradnice, ktoré v nej fungujú dobre.

Takejto lokálnej reprezentácii hovoríme **coordinate chart**.

Veľmi dobrá analógia je obyčajná mapa Zeme. Nesnažíme sa celý guľatý povrch planéty dokonale preniesť na jeden plochý papier. Namiesto toho môžeme mať mapu Európy, mapu Ázie, mapu Ameriky a ďalšie mapy.

Každá funguje dobre vo svojej oblasti.

Keď viac takýchto charts spolu pokrýva celý priestor, nazývame ich **atlas**.

Matematický atlas teda funguje podobne ako geografický atlas: namiesto jednej dokonalej mapy máme viac lokálnych máp.

Stále môžeme používať minimálny počet súradníc, ale za cenu toho, že program musí vedieť, ktorý chart práve používa a kedy má prejsť na iný.

Existuje však aj druhá cesta.

---

## 07. Druhý prístup: použime viac čísel

Vráťme sa k povrchu gule.

Vieme, že má 2 DOF. Namiesto latitude a longitude však môžeme bod na guli opísať úplne obyčajnými 3D súradnicami:

**(x, y, z)**

Používame teda tri čísla.

Na prvý pohľad to vyzerá nesprávne. Veď povrch gule má iba 2 DOF.

Rozdiel je v tom, že x, y a z nemôžeme voliť ľubovoľne.

Ak ide o jednotkovú guľu, musia vždy spĺňať:

**x² + y² + z² = 1**

Toto je **constraint — obmedzenie**.

Napríklad bod:

**(1, 0, 0)**

je platný, pretože: 1² + 0² + 0² = 1

Ale bod:

**(1, 1, 1)**

na povrchu jednotkovej gule neleží, pretože: 1² + 1² + 1² = 3

Máme teda tri čísla, ale nemôžeme ich meniť úplne nezávisle.

Práve preto zostávajú iba **2 DOF**.

---

## 08. Implicit representation

Tento druhý spôsob nazývame **implicit representation — implicitná reprezentácia**.

Myšlienka je jednoduchá:

**Namiesto toho, aby sme hľadali minimálny počet súradníc, použijeme viac čísel, ale pridáme matematické podmienky, ktoré určujú, ktoré kombinácie sú platné.**

Pri povrchu jednotkovej gule máme:

- 3 čísla: x, y, z
- 1 constraint: x² + y² + z² = 1

Výsledkom sú:

**3 premenné - 1 nezávislé obmedzenie = 2 DOF**

A to presne zodpovedá povrchu gule.

Toto je jedna z najdôležitejších myšlienok celej lekcie:

**Počet čísel v reprezentácii nie je automaticky počet DOF. DOF hovoria o tom, koľko hodnôt môžeme meniť nezávisle.**

---

## 09. Prečo by sme dobrovoľne používali viac čísel?

Mohlo by sa zdať, že používať tri čísla namiesto dvoch je zbytočné.

Lenže porovnajme oba zápisy.

Pri latitude a longitude používame iba dve čísla, ale na póloch máme problém.

Pri x, y, z používame tri čísla, no bod môže plynulo prejsť cez severný pól a nič zvláštne sa nestane. Hodnoty x, y a z sa jednoducho ďalej plynulo menia.

Za jedno číslo navyše sme teda získali reprezentáciu, ktorá sa môže správať oveľa príjemnejšie.

To je v robotike veľmi častý trade-off:

- **menej parametrov** → úspornejší zápis, ale potenciálne komplikovanejšie správanie
- **viac parametrov + constraints** → redundantnejší zápis, ale často jednoduchšie a stabilnejšie výpočty

Preto **minimum čísel nemusí znamenať najlepšiu reprezentáciu**.

---

## 10. Embedded configuration space

![Konfigurácia dverí, bodu v rovine a mince](/book/ch2/fig2-1.png)

Na implicitnú reprezentáciu sa môžeme pozrieť ešte jedným veľmi užitočným spôsobom.

Povrch gule je dvojrozmerný, ale nachádza sa v trojrozmernom priestore R3.

Hovoríme preto, že je do R3 **embedded — vložený**.

Predstav si jednoducho nafúknutý balón v miestnosti. Miestnosť je trojrozmerná. Samotný povrch balóna je však dvojrozmerný, pretože ak sa pohybuješ iba po jeho povrchu, máš dve nezávislé možnosti pohybu.

Súradnice x, y, z opisujú celý priestor okolo balóna.

Constraint: **x² + y² + z² = 1**

z tohto veľkého priestoru vyberie iba body, ktoré ležia na povrchu gule.

Pre implicitnú reprezentáciu si preto môžeš zapamätať veľmi jednoduchú predstavu:

**väčší jednoduchý priestor + constraints = skutočný configuration space**

Tento princíp sa neskôr objaví aj pri oveľa komplikovanejších robotoch.

---

## 11. Najdôležitejší robotický príklad: orientation

Teraz sa dostávame k dôvodu, prečo je táto téma pre robotiku taká dôležitá.

Voľné rigid body v 3D priestore má 6 DOF:

- 3 DOF pre position
- 3 DOF pre orientation

Samotná orientácia telesa má teda tri stupne voľnosti.

Mohli by sme ju preto reprezentovať tromi uhlami, napríklad:

**roll, pitch, yaw**

To je explicitná parametrizácia: **3 DOF → 3 čísla**

Je úsporná a intuitívna.

Má však podobný problém ako latitude a longitude. Pri určitých orientáciách sa táto reprezentácia dostane do singularity.

Teleso pritom nemusí byť v žiadnej fyzicky zvláštnej polohe. Problém je opäť iba v spôsobe, akým sme jeho orientáciu zapísali.

Pre robotiku, kde orientácie neustále skladáme, meníme a používame vo výpočtoch, to môže byť nepraktické.

A preto Modern Robotics používa predovšetkým inú reprezentáciu.

---

## 12. Rotation matrix

Orientáciu rigid body môžeme reprezentovať pomocou **rotation matrix — rotačnej matice**.

Tá má veľkosť 3 x 3:

**R =**
**r11  r12  r13**
**r21  r22  r23**
**r31  r32  r33**

Má teda spolu **9 čísel**.

Tu by sa mala okamžite rozsvietiť kontrolka:

**Ako môže orientation s 3 DOF potrebovať 9 čísel?**

Odpoveď už poznáme.

Tých deväť čísel nie je nezávislých.

Stĺpce rotation matrix reprezentujú osi jedného coordinate frame vyjadrené v inom frame. Tieto osi musia mať jednotkovú dĺžku a musia byť navzájom kolmé. Matica navyše musí reprezentovať skutočnú rotáciu, nie napríklad zrkadlenie.

Máme teda veľa čísel, ale zároveň constraints.

Po zohľadnení všetkých týchto obmedzení zostávajú iba:

**3 nezávislé rotational DOF**

Rotation matrix je preto krásnym príkladom **implicit representation**.

---

## 13. Prečo používať 9 čísel, keď by mohli stačiť 3?

Pretože rotation matrices majú obrovskú praktickú výhodu: veľmi prirodzene zapadajú do lineárnej algebry.

Pomocou matíc môžeme jednoducho otáčať vektory, skladať viac rotácií za sebou a meniť vyjadrenie veličín medzi rôznymi coordinate frames.

Ak máme dve rotácie:

**R1 a R2**

môžeme ich kombinovať násobením matíc.

A presne takéto operácie budeme v robotike robiť neustále.

Preto je často výhodnejšie uložiť deväť navzájom previazaných čísel než tri minimálne parametre, s ktorými by boli výpočty problematickejšie.

Opäť sa vraciame k rovnakému pravidlu:

**Najmenší počet parametrov nemusí znamenať najjednoduchšiu matematiku.**

---

## 14. Unit quaternion: ešte jedna možnosť

Rotation matrix nie je jediný spôsob reprezentácie orientácie.

Veľmi často sa používa aj **unit quaternion**.

Quaternion reprezentuje orientáciu pomocou **4 čísel**.

Orientácia má však stále iba 3 DOF. Preto ani tieto štyri čísla nemôžu byť úplne nezávislé. Musia spĺňať podmienku jednotkovej dĺžky.

Zjednodušene:

**4 čísla - 1 constraint = 3 DOF**

Aj quaternion je teda **implicitná reprezentácia**.

Oproti rotation matrix používa menej čísel a zároveň sa vyhýba singularitám typickým pre Euler angles.

Má však jednu zaujímavú vlastnosť: quaternion q a quaternion -q predstavujú rovnakú fyzickú orientáciu.

V Modern Robotics sa však budeme sústreďovať najmä na rotation matrices, pretože veľmi prirodzene nadväzujú na transformácie rigid bodies.

---

## 15. Rovnaká myšlienka pri closed-chain robotoch

Implicitná reprezentácia nie je užitočná iba pri orientácii.

Predstav si closed-chain mechanism, teda mechanizmus, v ktorom kĺby a články vytvárajú uzavretú slučku.

Pri obyčajnom otvorenom robotickom ramene môžeme jednotlivé joint angles často meniť nezávisle.

V uzavretom mechanizme to tak byť nemusí. Keď pohneš jedným kĺbom, ostatné sa musia prispôsobiť tak, aby sa mechanická slučka neroztrhla.

Mohli by sme sa snažiť nájsť iba minimálny počet nezávislých joint coordinates.

Často je však jednoduchšie urobiť niečo iné:

**zapíšeme všetky joint coordinates a pridáme constraints, ktoré zabezpečia uzavretie mechanizmu.**

Tým dostaneme rovnakú myšlienku ako pri guli.

Pri guli sme mali: **x, y, z + constraint**

Pri closed-chain robotovi máme: **všetky joint coordinates + loop-closure constraints**

V oboch prípadoch používame väčší priestor a constraints z neho vyberajú iba fyzicky možné konfigurácie.

---

## 16. Explicit vs. implicit — aký je teda skutočný rozdiel?

Teraz už môžeme oba prístupy porovnať veľmi jednoducho.

Pri **explicit parametrization** používame minimálny počet nezávislých parametrov.

Napríklad povrch Zeme: **latitude + longitude**

Máme 2 DOF a používame 2 čísla.

Výhodou je úspornosť. Nevýhodou môže byť singularita alebo potreba používať viac coordinate charts.

Pri **implicit representation** použijeme viac čísel, ale spojíme ich constraints.

Napríklad povrch jednotkovej gule: **x, y, z**

s podmienkou: **x² + y² + z² = 1**

Používame tri čísla, ale stále máme iba 2 DOF.

Ani jeden prístup nemení samotný configuration space. Mení sa iba spôsob, akým jeho body zapisujeme.

---

## 17. Ako si to celé predstaviť

Ak si máš z tejto lekcie odniesť jednu mentálnu predstavu, nech je to povrch Zeme.

Miesto na Zemi môžeš opísať dvoma spôsobmi.

**Možnosť A — minimum čísel**

Použiješ: **latitude, longitude**

To je explicit parametrization.

Potrebuješ iba dve čísla pre 2 DOF, ale na póloch sa súradnice správajú problematicky.

**Možnosť B — viac čísel**

Použiješ: **x, y, z**

a pridáš: **x² + y² + z² = 1**

To je implicit representation.

Potrebuješ síce tri čísla, ale reprezentácia sa môže správať plynulo po celom povrchu.

Presne rovnaké rozhodnutie budeme neskôr robiť pri orientácii robotov.

Môžeme použiť minimálne tri uhly, napríklad roll, pitch a yaw, alebo redundantnejšiu rotation matrix s deviatimi hodnotami a constraints.

A práve rotation matrices budú pre ďalšie kapitoly Modern Robotics mimoriadne dôležité.

---

:::summary

**Configuration space** opisuje všetky možné konfigurácie systému. **Representation** hovorí, akými číslami konkrétnu konfiguráciu zapíšeme.

Tieto dve veci preto nesmieme zamieňať. Fyzický configuration space sa nemení podľa toho, aké súradnice si vyberieme.

Pri jednoduchých priestoroch je reprezentácia priamočiara. Bod v R3 zapíšeme ako (x, y, z) a všetky tri hodnoty môžeme meniť nezávisle.

Pri zakrivených priestoroch môže byť situácia komplikovanejšia. Povrch gule má 2 DOF, takže ho môžeme explicitne reprezentovať pomocou latitude a longitude. Takáto minimálna reprezentácia však obsahuje singularity na póloch.

Jedným riešením je používať viac lokálnych coordinate charts. Súbor charts pokrývajúcich celý priestor nazývame **atlas**.

Druhou možnosťou je **implicit representation**. Použijeme viac čísel, ale pridáme constraints. Povrch jednotkovej gule môžeme napríklad zapísať pomocou x, y, z, pričom musí platiť:

**x² + y² + z² = 1**

Máme tri čísla, ale stále iba 2 DOF, pretože tieto tri hodnoty nie sú nezávislé.

Rovnaký princíp sa objavuje pri orientácii rigid body. Orientácia má 3 DOF, ale **rotation matrix** používa 9 čísel, ktoré sú navzájom previazané constraints. **Unit quaternion** používa 4 čísla a tiež obsahuje constraint.

A rovnakú logiku môžeme použiť pri closed-chain mechanizmoch: namiesto hľadania minimálneho počtu súradníc môžeme použiť všetky joint coordinates a pomocou loop-closure constraints určiť, ktoré kombinácie sú fyzicky možné.

Najdôležitejšie pravidlo celej lekcie je preto:

**Počet čísel v reprezentácii nemusí byť rovnaký ako počet DOF. DOF určuje počet hodnôt, ktoré môžeme meniť nezávisle.**

A z praktického pohľadu ešte dôležitejšie:

**Minimum parametrov nemusí znamenať najlepšiu reprezentáciu. Niekedy sa oplatí použiť viac čísel, ak tým získame jednoduchšie, plynulejšie a stabilnejšie výpočty.**

:::`;
