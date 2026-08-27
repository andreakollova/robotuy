// Chapter 2.1 – Lekcia 3: Stupne voľnosti tuhého telesa
// Full lesson content - DO NOT SHORTEN

export const ch21Content = `# Lekcia 3: Stupne voľnosti tuhého telesa

V predchádzajúcej lekcii sme si vysvetlili, že **configuration — konfigurácia** opisuje úplný stav mechanického systému a že počet nezávislých hodnôt potrebných na jej určenie nazývame **degrees of freedom — stupne voľnosti**, skrátene **DOF**.

Teraz sa zameriame na jeden z najzákladnejších objektov robotiky — **rigid body**, teda tuhé teleso. Práve takto totiž pri kinematickej analýze modelujeme jednotlivé pevné časti robota, jeho links. Ak pochopíme, koľko stupňov voľnosti má jedno samostatné tuhé teleso a prečo, neskôr bude oveľa jednoduchšie pochopiť, čo sa stane, keď viac takýchto telies spojíme pomocou joints do jedného mechanizmu.

V tejto lekcii sa dostaneme k dvom dôležitým výsledkom. **Tuhé teleso, ktorého pohyb je obmedzený na rovinu, má 3 DOF.** Voľné tuhé teleso pohybujúce sa v trojrozmernom priestore má **6 DOF**. Samotné čísla sú však iba výsledkom. Oveľa dôležitejšie je pochopiť, odkiaľ sa berú a ako súvisia s polohou, orientáciou a mechanickými obmedzeniami.

![Konfigurácia dverí, bodu v rovine a mince](/book/ch2/fig2-1.png)

---

:::recap

## 01. Čo je rigid body

Skutočné predmety nie sú dokonale pevné. Kovové rameno robota sa môže pri zaťažení nepatrne ohnúť, plast sa môže deformovať a aj oceľ pri pôsobení sily mierne zmení svoj tvar. Ak by sme však pri každom pohybe robota museli počítať aj tieto malé deformácie, už veľmi jednoduchý mechanický model by sa rýchlo stal neprehľadným.

Pri základnej robotike preto používame idealizáciu a pevné časti robota považujeme za **rigid bodies — tuhé telesá**. Rigid body je objekt, ktorého tvar a rozmery sa počas pohybu nemenia. Môže sa presúvať alebo otáčať, ale v našom modeli sa nenaťahuje, neskracuje ani neohýba.

Predstav si kovový link robotického ramena a vyber na ňom dva body A a B. Keď sa link pohne, oba body sa môžu ocitnúť na úplne inom mieste v priestore. Ich vzájomná vzdialenosť však zostáva rovnaká. Ak sú od seba vzdialené 20 cm, táto vzdialenosť zostane 20 cm pri každej konfigurácii telesa.

Práve táto vlastnosť je kľúčová. Body rigidného telesa sa nepohybujú nezávisle — sú navzájom pevne geometricky previazané. Vďaka tomu nemusíme sledovať polohu každého bodu zvlášť. Ak poznáme polohu a orientáciu celého telesa, vieme z nich odvodiť polohu ktoréhokoľvek bodu na jeho povrchu.

---

## 02. Čo presne znamená degree of freedom

**Degree of freedom — stupeň voľnosti** predstavuje jednu nezávislú hodnotu, ktorú potrebujeme na úplné určenie konfigurácie systému.

Najjednoduchším príkladom je výťah. Kabína sa môže pohybovať hore alebo dole po jednej zvislej dráhe. Na určenie jej polohy nám stačí jediná hodnota, napríklad výška h. Výťah preto môžeme považovať za systém s **1 DOF**.

Je dôležité, že pohyb hore a pohyb dole nie sú dva rôzne stupne voľnosti. Ide stále o jednu súradnicu, ktorá sa môže zväčšovať alebo zmenšovať.

Ak sa naopak geometrický bod môže voľne pohybovať po stole, na určenie jeho polohy potrebujeme dve nezávislé súradnice, napríklad x a y. Bod preto má **2 DOF**. Hodnotu x môžeme meniť bez toho, aby sme museli meniť y, a naopak.

Presnejšie teda môžeme povedať, že počet DOF je **najmenší počet nezávislých reálnych hodnôt potrebných na úplné určenie konfigurácie systému**.

Slovo **nezávislých** je zásadné. Ak je jedna hodnota automaticky určená ostatnými, nepridáva systému nový stupeň voľnosti.

---

## 03. Pri telese potrebujeme polohu aj orientáciu

Pri samotnom bode nám stačí vedieť, kde sa nachádza. Pri tuhom telese to už nestačí.

Predstav si telefón položený v strede stola. Jeho stred môže zostať na rovnakom mieste, ale telefón môže byť otočený smerom k tebe, otočený o 90° alebo položený šikmo. Poloha jeho stredu sa nemení, no konfigurácia telefónu áno.

Preto v robotike rozlišujeme **position — polohu** a **orientation — orientáciu**. Position odpovedá na otázku, kde sa teleso nachádza. Orientation opisuje, ako je natočené.

Pri rigid body tvorí úplnú konfiguráciu kombinácia oboch informácií. To je dôležité aj prakticky. Robotický gripper môže byť presne na správnom mieste, ale ak je nesprávne orientovaný, nemusí vedieť predmet uchopiť. Pri skrutkovaní musí byť nástroj správne zarovnaný s osou skrutky a pri zváraní musí byť vhodne natočený voči povrchu.

Poloha a orientácia teda opisujú dve rôzne, ale rovnako dôležité časti konfigurácie tuhého telesa.

## 04. Planar rigid body má 3 DOF

Najskôr si pohyb telesa zjednodušíme a obmedzíme ho na jednu rovinu.

Predstav si mincu položenú naplocho na stole. Môže sa po stole voľne posúvať a otáčať, ale nesmie sa zdvihnúť, prevrátiť ani nakloniť mimo roviny.

Na určenie jej polohy potrebujeme dve hodnoty — napríklad x a y, ktoré určujú polohu jej stredu na stole. Tieto dve súradnice však ešte neurčujú, ako je minca natočená. Preto potrebujeme ešte uhol θ.

Konfiguráciu môžeme zapísať ako:

**q = (x, y, θ)**

Minca sa teda môže nezávisle posúvať v dvoch smeroch roviny a zároveň sa môže otáčať.

Má preto:

**2 translačné DOF + 1 rotačný DOF = 3 DOF**

Takéto teleso nazývame **planar rigid body**.

Slovo planar pritom neznamená, že teleso je fyzicky dvojrozmerné. Telefón, mobilný robot alebo kovová súčiastka sú stále trojrozmerné objekty. Planar znamená iba to, že ich povolený pohyb je obmedzený na jednu rovinu.

:::

---

## 05. Prečo rigid body nepotrebuje samostatné súradnice pre každý bod

K rovnakému výsledku sa môžeme dostať aj iným spôsobom. Ten nám zároveň lepšie ukáže, prečo je rigidita taká dôležitá.

Predstav si, že na minci označíme tri body A, B a C. Keby tieto tri body neboli spojené a mohli sa po stole pohybovať nezávisle, každý by potreboval dve súradnice.

![Tri body na minci a ich constraints](/book/ch2/fig2-2.png)

Tri nezávislé body by teda mali:

**2 + 2 + 2 = 6 DOF**

Naše body však patria k jednému rigidnému telesu. Nemôžeme posunúť A doprava a nechať B na pôvodnom mieste, pretože by sa zmenila vzdialenosť A–B. To by znamenalo, že sa teleso natiahlo alebo zdeformovalo, čo pri rigid body nepripúšťame.

Vzdialenosti A–B, A–C a B–C preto zostávajú pevné. Tieto pevné geometrické vzťahy predstavujú **constraints — obmedzenia**.

Práve constraints spôsobujú, že jednotlivé body tuhého telesa nemajú vlastnú nezávislú voľnosť pohybu. Keď sa pohne teleso, pohyb všetkých jeho bodov je navzájom previazaný.

---

## 06. Ako body A a B určia planar rigid body

Začnime bodom A. V rovine ho môžeme umiestniť kamkoľvek, takže na jeho polohu potrebujeme dve nezávislé súradnice. Bod A nám teda poskytuje **2 DOF**.

Keď už poznáme A, bod B nemôžeme umiestniť ľubovoľne. Jeho vzdialenosť od A je pevná. Ak je napríklad A–B = 3 cm, všetky možné polohy B ležia na kružnici s polomerom 3 cm a stredom v A.

Na výber konkrétneho bodu na tejto kružnici nám stačí jeden parameter — napríklad uhol okolo A. Bod B preto pridáva už iba **1 DOF**.

Spolu dostaneme:

**2 + 1 = 3 DOF**

A to stačí na určenie polohy aj orientácie telesa v rovine. Bod A nám hovorí, kde sa teleso nachádza, a smer od A k B určuje jeho natočenie.

---

## 07. Prečo bod C nepridáva nový spojitý DOF

Bod C musí zostať v pevnej vzdialenosti od A aj od B. Ak si nakreslíme kružnicu so stredom v A a ďalšiu so stredom v B, bod C musí ležať na oboch súčasne.

V bežnom prípade sa tieto dve kružnice pretínajú v dvoch bodoch. Dostaneme teda dve zrkadlové možnosti usporiadania A, B a C.

To však neznamená, že C pridáva ďalší spojitý stupeň voľnosti. Nemôžeme ho plynulo posúvať po novej osi alebo krivke bez toho, aby sme porušili jednu z pevných vzdialeností.

Po určení A a B je poloha C daná až na diskrétnu voľbu medzi dvoma zrkadlovými konfiguráciami.

Preto bod C nepridáva nový spojitý DOF a **planar rigid body** zostáva systémom s **3 DOF**.

---

## 08. Diskrétna voľba nie je stupeň voľnosti

Dve možné polohy bodu C nám ukazujú ďalší dôležitý rozdiel — rozdiel medzi **continuous** a **discrete** premennou.

Súradnicu x môžeme meniť plynulo. Môže mať hodnotu 1, potom 1,1, 1,11 a medzi týmito hodnotami existuje nekonečne veľa ďalších možností. To isté platí pre y alebo uhol θ.

Diskrétna voľba funguje inak. Máme napríklad jednu alebo druhú zrkadlovú konfiguráciu. Neexistuje plynulý parameter, ktorým by sme medzi nimi mohli prechádzať pri zachovaní všetkých constraints.

Podobne si môžeme predstaviť mincu ležiacu jednou alebo druhou stranou nahor. Heads a tails predstavujú dva stavy, ale samotná voľba medzi nimi nepridáva ďalší spojitý DOF.

Degrees of freedom teda v tomto kontexte počítajú **nezávislé spojité reálne parametre**, nie počet všetkých možných stavov systému.

---

## 09. Nie všetky constraints sú nezávislé

Predstav si, že na rovnaké rigid body pridáme ešte bod D. Jeho poloha voči A, B a C je pevná, takže keď už poznáme konfiguráciu telesa, poloha D je automaticky určená.

Mohli by sme zapísať constraint na vzdialenosť D od A, ďalší na vzdialenosť D od B a ďalší na vzdialenosť D od C. To však neznamená, že každý z nich odoberá nový stupeň voľnosti.

Ak už dve podmienky jednoznačne určujú polohu D, tretia môže byť iba dôsledkom tých predchádzajúcich. Takéto obmedzenie nazývame **redundant constraint — redundantné obmedzenie**.

Pri počítaní DOF preto nemôžeme jednoducho spočítať všetky rovnice, ktoré vieme zapísať. Zaujíma nás počet **independent constraints — nezávislých obmedzení**, teda takých, ktoré systému prinášajú skutočne nové obmedzenie.

Táto myšlienka bude neskôr veľmi dôležitá pri zložitejších mechanizmoch.

---

## 10. Ako nad DOF premýšľať

Z predchádzajúcich príkladov vyplýva jednoduchý spôsob uvažovania. Najskôr si predstavíme, koľko nezávislej voľnosti by systém mal bez určitých väzieb. Potom zohľadníme constraints, ktoré časť tejto voľnosti odstránia.

Pri jednoduchých prípadoch môžeme túto myšlienku zapísať ako:

**DOF = počet nezávislých premenných - počet nezávislých constraints**

Samotný vzorec však nie je to najdôležitejšie. Dôležitá je predstava, že **constraints prepájajú pôvodne nezávislé možnosti pohybu**.

Pri rigid body sú takýmito constraints pevné vzdialenosti medzi jeho bodmi. Pri robotických mechanizmoch budú podobnú úlohu zohrávať joints. Tie určité relatívne pohyby medzi links dovolia a iné zakážu.

Práve preto bude pri ďalšej analýze užitočné pýtať sa nielen „Aký pohyb tento joint umožňuje?", ale aj **„Ktoré pohyby týmto spojením prestávajú byť možné?"**

---

## 11. Spatial rigid body má tri translačné DOF

Teraz odstránime obmedzenie pohybu na rovinu a necháme teleso voľne sa pohybovať v trojrozmernom priestore.

Predstav si telefón, ktorý držíš vo vzduchu.

Najskôr riešme iba jeho **position**. V priestore sa môže nezávisle presúvať v troch smeroch. Na jeho polohu preto potrebujeme tri súradnice:

**x, y, z**

To znamená, že position voľného telesa v 3D priestore má **3 translačné DOF**.

Tieto tri hodnoty nám však stále nepovedia, ako je teleso natočené. Telefón môže zostať na rovnakom mieste a pritom meniť orientation.

Pre úplnú konfiguráciu preto potrebujeme pridať ešte rotačné stupne voľnosti.

---

## 12. Orientation v 3D pridáva ďalšie tri DOF

Ak telefón držíš približne na rovnakom mieste vo vzduchu, stále ho môžeš rôzne natáčať. Môžeš ho nakloniť dopredu alebo dozadu, nakloniť doľava alebo doprava a otočiť okolo tretej osi.

Na úplné určenie orientation rigid body v 3D priestore preto potrebujeme **tri nezávislé rotačné parametre**.

K trom translačným DOF pridáme tri rotačné:

**3 translácie + 3 rotácie = 6 DOF**

Voľné tuhé teleso v trojrozmernom priestore, teda **spatial rigid body**, má preto **6 DOF**.

Veľmi intuitívne si to môžeme zapamätať takto: **tri hodnoty hovoria, kde teleso je, a ďalšie tri hovoria, ako je natočené**.

Spolu opisujú jeho úplnú **pose — polohu a orientáciu**.

---

## 13. Šesť DOF môžeme odvodiť aj pomocou bodov

Rovnaký výsledok môžeme získať pomocou troch bodov A, B a C pevne spojených s telesom.

Bod A môžeme v 3D priestore umiestniť kamkoľvek. Na jeho polohu potrebujeme tri súradnice, takže A pridáva **3 DOF**.

Bod B musí zostať v pevnej vzdialenosti od A. Ak je vzdialenosť A–B napríklad 10 cm, všetky možné polohy B ležia na povrchu gule s polomerom 10 cm a stredom v A.

Povrch gule je dvojrozmerný, takže na určenie konkrétnej polohy B potrebujeme dve nezávislé hodnoty. Bod B preto pridáva ďalšie **2 DOF**.

Máme spolu:

**3 + 2 = 5 DOF**

Bod C musí mať pevnú vzdialenosť od A aj od B. Jedna podmienka ho obmedzí na povrch jednej gule a druhá na povrch druhej. Prienikom týchto dvoch povrchov je za bežných podmienok kružnica.

Na výber bodu na kružnici nám stačí jedna hodnota, takže C pridáva ešte **1 DOF**.

Výsledok je:

**3 + 2 + 1 = 6 DOF**

Rovnakých šesť stupňov voľnosti sme teda dostali druhým, geometrickým spôsobom.

---

## 14. Prečo musia byť body nekolineárne

Pri tomto odvodení je dôležité, aby body A, B a C neležali na jednej priamke.

Ak by všetky tri body ležali na tej istej osi, teleso by sa mohlo otáčať okolo tejto osi a polohy všetkých troch bodov by pritom zostali rovnaké.

Z ich polôh by sme preto nedokázali jednoznačne určiť orientation celého telesa.

Tri **non-collinear points — nekolineárne body** však jednoznačne určia jeho polohu aj orientáciu.

To je dôvod, prečo pri geometrickom opise rigid body používame vhodne zvolené body, ktoré neležia na jednej priamke.

---

## 15. Planar rigid body verzus spatial rigid body

Teraz už môžeme oba prípady postaviť vedľa seba.

**Planar rigid body** sa môže pohybovať iba v jednej rovine. Jeho konfiguráciu môžeme zapísať ako:

**q = (x, y, θ)**

Dve hodnoty určujú position a jedna orientation. Má teda **3 DOF**.

**Spatial rigid body** sa môže voľne pohybovať v trojrozmernom priestore. Potrebuje tri hodnoty pre position a tri pre orientation, takže má **6 DOF**.

Rozdiel nespočíva v tom, že planar body by bolo fyzicky dvojrozmerné. Rozdiel je v povolenom pohybe. Ak trojrozmernému telesu constraints zabránia zdvihnúť sa z roviny alebo sa nakláňať mimo nej, z pôvodných šiestich DOF mu zostanú tri.

Tento spôsob uvažovania bude veľmi dôležitý pri joints. Joint totiž môžeme chápať práve ako mechanické spojenie, ktoré niektoré relatívne pohyby medzi rigid bodies povoľuje a ostatné odoberá.

---

## 16. Prečo sa v robotike stále objavuje 6 DOF

Šesť stupňov voľnosti je v robotike veľmi dôležitých, pretože všeobecnú **pose** rigid body v trojrozmernom priestore určujeme práve šiestimi nezávislými hodnotami.

Predstav si gripper robotického ramena. Ak má uchopiť predmet, nestačí dostať ho na správne miesto. Musí byť aj správne natočený.

Pri uchopení fľaše zhora potrebuje inú orientation než pri uchopení zboku. Pri skrutkovaní musí os nástroja smerovať pozdĺž osi skrutky. Pri zváraní musí byť nástroj správne orientovaný voči povrchu.

Pre úplný opis pose end-effectora preto všeobecne potrebujeme:

**3 DOF pre position + 3 DOF pre orientation = 6 DOF**

Aj preto má mnoho priemyselných robotických ramien šesť riadených osí.

Treba však rozlišovať medzi počtom DOF a tým, aké poses robot skutočne dokáže dosiahnuť. Robot so šiestimi joints nemusí automaticky dosiahnuť každú position a orientation. Záleží na geometrii mechanizmu, dĺžkach links, joint limits, singularities a ďalších obmedzeniach.

---

## 17. Čo znamená viac ako 6 DOF

Niektoré robotické ramená majú sedem alebo viac stupňov voľnosti.

End-effector pritom stále pracuje v priestore, kde jeho všeobecnú pose určujeme šiestimi hodnotami. Ak má samotný robot viac nezávislých joint coordinates, môže existovať viacero rôznych konfigurácií ramena, ktoré vedú k rovnakej pose end-effectora.

Tento jav nazývame **kinematic redundancy — kinematická redundancia**.

Dobrou predstavou je ľudská ruka. Dlaň môže zostať približne na rovnakom mieste, zatiaľ čo lakeť mierne presunieme. Position a orientation dlane sa veľmi nezmenia, ale configuration celej ruky áno.

Redundancia je v robotike užitočná. Robot môže napríklad zmeniť polohu svojich links tak, aby obišiel prekážku alebo sa vyhol joint limits, pričom end-effector zostane v požadovanej pose.

---

## 18. Hlavná myšlienka lekcie

Najdôležitejším výsledkom tejto lekcie nie je iba zapamätať si, že **planar rigid body má 3 DOF** a **spatial rigid body 6 DOF**.

Dôležitejší je spôsob, akým sme tieto výsledky získali.

Najskôr určujeme, ktoré hodnoty sa môžu meniť nezávisle. Potom sledujeme constraints, ktoré ich vzájomne prepájajú a časť pôvodnej voľnosti odstránia.

Pri rigid body sú základným constraintom pevné vzdialenosti medzi jeho bodmi. Preto sa jednotlivé body nemôžu pohybovať nezávisle.

Keď túto logiku prenesieme na celý robot, namiesto bodov budeme pracovať s rigid links a joints. Každý joint určité relatívne pohyby ponechá a iné zakáže.

A tým sa dostávame k prirodzenému pokračovaniu:

**Ako spočítame degrees of freedom celého robota vytvoreného z viacerých links a joints?**

---

## Zhrnutie lekcie

**Rigid body** je idealizované tuhé teleso, ktorého tvar a rozmery sa počas pohybu nemenia. Jeho jednotlivé body sa síce v priestore pohybujú, ale ich vzájomné vzdialenosti zostávajú pevné. Vďaka tomu nemusíme opisovať každý bod samostatne — configuration celého telesa dokážeme určiť pomocou malého počtu nezávislých hodnôt.

**Degree of freedom** predstavuje jednu nezávislú reálnu hodnotu potrebnú na určenie configuration systému. Pri rigid body rozlišujeme **position** a **orientation**, pretože samotná poloha jedného bodu nestačí na opis jeho úplného stavu.

**Planar rigid body** môžeme opísať pomocou:

**q = (x, y, θ)**

Má preto dve translačné a jednu rotačnú freedom, spolu **3 DOF**.

**Spatial rigid body** potrebuje tri hodnoty pre position a tri pre orientation, a preto má **6 DOF**.

Rovnaký výsledok môžeme odvodiť pomocou troch nekolineárnych bodov. V 3D priestore bod A pridá 3 DOF, bod B pri pevnej vzdialenosti od A ďalšie 2 a bod C pri pevných vzdialenostiach od A aj B ešte 1:

**3 + 2 + 1 = 6 DOF**

Pri určovaní stupňov voľnosti sú dôležité **constraints**. Tie prepájajú jednotlivé premenné a znižujú počet nezávislých možností pohybu. Nie každá napísaná podmienka však musí byť nezávislá; **redundantný constraint** nepridáva nové obmedzenie.

Najdôležitejší spôsob uvažovania preto je:

**najskôr zistím, koľko voľnosti systém má → potom zohľadním nezávislé constraints → zostane skutočný počet DOF**

Práve tento princíp budeme v ďalšej lekcii používať pri celých robotických mechanizmoch zložených z links a joints.`;
