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

Dôležité je, že slovo planar neznamená, že objekt je fyzicky dvojrozmerný. Telefón alebo mobilný robot sú stále trojrozmerné objekty. Planar znamená iba to, že ich pohyb je obmedzený na jednu rovinu.

:::

---

## 05. Prečo nemusíme sledovať každý bod zvlášť

Teraz sa na rovnaký problém pozrieme z iného pohľadu. Ten nám lepšie ukáže, prečo rigidita znižuje počet nezávislých možností pohybu.

Predstav si pevný trojuholník z kartónu a na jeho rohoch označ body A, B a C. Keby tieto body neboli navzájom spojené, každý by sa mohol po stole pohybovať úplne nezávisle. Každý bod by potreboval dve súradnice, takže tri samostatné body by spolu mali:

**2 + 2 + 2 = 6 DOF**

![Tri body na minci a ich constraints](/book/ch2/fig2-2.png)

Lenže naše body sú súčasťou jedného tuhého telesa. Nemôžeš posunúť A doprava a nechať B a C na pôvodnom mieste, pretože by si zmenila tvar trojuholníka. Vzdialenosti medzi A a B, medzi A a C a medzi B a C musia zostať rovnaké.

Tieto pevné geometrické vzťahy nazývame **constraints — obmedzenia**. Constraints spôsobujú, že pohyb jednotlivých bodov už nie je nezávislý. Keď sa pohne jedno rigid body, všetky jeho body sa pohybujú spolu.

Práve preto nemusíme zapisovať súradnice každého bodu telesa. Stačí nám niekoľko hodnôt, ktoré určia polohu a orientation celého objektu.

---

## 06. Ako dva body určia planar rigid body

Začnime bodom A. V rovine ho môžeme umiestniť kamkoľvek, takže na jeho polohu potrebujeme dve nezávislé hodnoty, napríklad x a y. Bod A nám teda určí, kde sa teleso nachádza.

Stále však nevieme, ako je natočené. Predstav si pravítko. Ak poznáš iba polohu jedného jeho konca, druhý koniec môže smerovať doprava, nahor, doľava alebo šikmo. Jeden bod teda nestačí na určenie orientation.

Preto pridáme bod B. Keďže A a B patria k tomu istému tuhému telesu, vzdialenosť medzi nimi je pevná. Ak je A–B = 10 cm, B sa musí nachádzať presne 10 cm od A. Všetky možné polohy B preto ležia na kružnici okolo A.

Na výber konkrétneho miesta na tejto kružnici nám stačí jedna hodnota — uhol. Bod B teda pridá už iba **1 DOF**.

Spolu dostaneme:

**2 + 1 = 3 DOF**

Bod A určil position a smer od A k B určil orientation. To je dôvod, prečo planar rigid body potrebuje práve tri nezávislé hodnoty.

---

## 07. Prečo tretí bod nepridáva nový DOF

Teraz pridajme bod C. Jeho vzdialenosť od A aj od B je pevná. Predstavme si, že C musí byť napríklad 6 cm od A a 8 cm od B.

Ak by sme poznali iba vzdialenosť od A, C by sa mohol nachádzať kdekoľvek na kružnici okolo A. Druhá podmienka však hovorí, že zároveň musí ležať na kružnici okolo B.

C teda musí byť v mieste, kde sa obe kružnice pretínajú.

V bežnom prípade dostaneme dve zrkadlové polohy. Dôležité však je, že C už nemá ďalší smer, po ktorom by sa mohol plynulo pohybovať. Po určení A a B je jeho poloha prakticky daná.

Preto C nepridáva ďalší spojitý stupeň voľnosti. **Planar rigid body** zostáva systémom s **3 DOF**.

Celý príklad môžeme zhrnúť jednoducho: prvý bod určí, kde sa teleso nachádza, druhý určí jeho natočenie a poloha všetkých ďalších bodov už vyplýva z pevného tvaru telesa.

---

## 08. Diskrétna voľba nie je ďalší DOF

Pri bode C nám zostali dve zrkadlové možnosti. Mohlo by sa preto zdať, že pribudla ďalšia freedom. Rozdiel je však v tom, že nejde o spojitú možnosť.

Súradnicu x môžeme meniť plynulo. Môže mať hodnotu 1, potom 1,1, potom 1,11 a medzi nimi existuje nekonečne veľa ďalších hodnôt. Rovnako môžeme plynulo meniť uhol θ.

Dve zrkadlové polohy bodu C sú však dve oddelené možnosti. Nemáme ďalší parameter, ktorý by sme mohli plynulo meniť pri zachovaní všetkých constraints.

Takúto voľbu nazývame **discrete — diskrétnu**.

Podobným príkladom je vypínač. Môže byť zapnutý alebo vypnutý, ale to ešte neznamená, že má spojitý degree of freedom. Pri DOF nás zaujímajú **nezávislé spojité parametre**, nie iba počet možných stavov.

---

## 09. Nie všetky constraints sú nezávislé

Predstav si, že na teleso pridáme ešte bod D. Keď už poznáme position a orientation celého objektu, poloha D je automaticky určená. Môžeme však stále zapísať viacero podmienok, napríklad vzdialenosť D od A, od B a od C.

To však neznamená, že každá z týchto podmienok odoberá nový DOF. Niektorá môže iba opakovať informáciu, ktorá už vyplýva z ostatných.

Jednoduchý príklad: ak vieme, že x = 5, potom podmienka x > 4 nám neprináša nič nové. Platí automaticky.

Podobne pri geometrii môže byť určitý constraint iba dôsledkom ostatných. Takéto obmedzenie nazývame **redundant constraint**.

Pri počítaní DOF preto nemôžeme iba spočítať počet rovníc. Dôležitý je počet **independent constraints — nezávislých obmedzení**, ktoré systému skutočne odoberajú ďalšiu voľnosť.

---

## 10. Ako nad DOF premýšľať

Najjednoduchšia otázka, ktorú si pri degrees of freedom môžeme položiť, je:

**Koľko vecí môžem meniť nezávisle od ostatných?**

Tri samostatné body v rovine môžeme pohybovať nezávisle. Keď ich však spojíme do jedného pevného trojuholníka, ich pohyby sa navzájom previažu a celý objekt sa začne správať ako jeden rigid body.

Pri jednoduchých prípadoch si preto môžeme predstaviť:

**DOF = pôvodná voľnosť - nezávislé constraints**

Dôležitejšie než samotný vzorec je však chápať, ktoré hodnoty sú naozaj nezávislé a ktoré už vyplývajú z ostatných.

Túto istú logiku neskôr použijeme pri robotických joints. Joint určitý pohyb dovolí, ale zároveň iné relatívne pohyby medzi dvoma links zakáže.

---

## 11. Spatial rigid body: poloha v 3D

Doteraz sme teleso držali na stole. Teraz ho zdvihneme a necháme voľne sa pohybovať v trojrozmernom priestore.

Predstav si opäť telefón, tentoraz vo vzduchu. Ak nás zatiaľ zaujíma iba jeho **position**, potrebujeme tri súradnice. Telefón môžeme posúvať doľava alebo doprava, dopredu alebo dozadu a hore alebo dole.

Position preto môžeme zapísať pomocou:

**x, y, z**

Tieto tri hodnoty sa môžu meniť nezávisle, takže poloha telesa v priestore má **3 translačné DOF**.

Stále však nevieme, ako je teleso natočené.

---

## 12. Orientation v 3D pridáva ďalšie tri DOF

Ak telefón držíš približne na jednom mieste, stále môžeš meniť jeho orientation. Môžeš ho otáčať do strán, nakláňať dopredu a dozadu a nakláňať aj do strán.

Na úplné určenie orientation v trojrozmernom priestore potrebujeme **tri nezávislé rotačné hodnoty**.

Máme teda:

**3 DOF pre position + 3 DOF pre orientation = 6 DOF**

Voľné tuhé teleso v 3D priestore, teda **spatial rigid body**, má preto **6 degrees of freedom**.

Najjednoduchšia pomôcka je: **tri hodnoty určujú, kde teleso je, a tri ďalšie určujú, ako je natočené**.

Spolu opisujú jeho **pose — polohu a orientáciu**.

---

## 13. Šesť DOF pomocou bodov A, B a C

Rovnaký výsledok môžeme dostať aj geometricky.

Bod A môžeme v 3D priestore umiestniť kamkoľvek. Potrebujeme na to tri súradnice, takže A pridáva **3 DOF**.

Bod B musí zostať v pevnej vzdialenosti od A. Ak je A–B = 10 cm, B sa môže nachádzať kdekoľvek na povrchu gule s polomerom 10 cm okolo A.

Na určenie jedného bodu na povrchu gule potrebujeme dve nezávislé hodnoty, podobne ako latitude a longitude. B preto pridáva **2 DOF**.

Máme spolu: **3 + 2 = 5 DOF**

Bod C musí byť zároveň v pevnej vzdialenosti od A aj od B. Jedna podmienka ho obmedzí na povrch jednej gule a druhá na povrch druhej. Prienik týchto dvoch povrchov je za bežných okolností kružnica.

Na výber konkrétneho bodu na kružnici stačí jedna hodnota, takže C pridáva **1 DOF**.

Výsledok je:

**3 + 2 + 1 = 6 DOF**

Rovnakých šesť stupňov voľnosti sme teda získali druhým, geometrickým spôsobom.

---

## 14. Prečo body nesmú ležať na jednej priamke

Pri tomto odvodení je dôležité, aby A, B a C neležali na jednej priamke.

Predstav si ceruzku a označ na jej pozdĺžnej osi tri body. Ak ceruzku otočíš okolo vlastnej osi, všetky tri označené body zostanú na rovnakom mieste. Z ich polôh by sme preto nevedeli zistiť, či sa teleso okolo tejto osi otočilo.

Ak však tri body neležia na jednej priamke, vytvoria trojuholník a jeho orientácia sa pri otočení telesa zmení. Takéto tri **non-collinear points — nekolineárne body** preto dokážu jednoznačne určiť polohu aj orientation telesa.

---

## 15. Planar a spatial rigid body

Teraz už môžeme oba prípady jednoducho porovnať.

**Planar rigid body** sa pohybuje iba v jednej rovine. Potrebuje dve hodnoty pre position a jednu pre orientation:

**q = (x, y, θ)**

Má teda **3 DOF**.

**Spatial rigid body** sa môže voľne pohybovať v 3D priestore. Potrebuje tri hodnoty pre position a tri pre orientation, takže má **6 DOF**.

Rozdiel nie je v tom, že planar body by bolo „2D teleso". Môže ísť o úplne normálny trojrozmerný objekt. Rozdiel je iba v tom, aký pohyb mu dovolíme.

Ak trojrozmernému telesu zakážeme zdvihnúť sa z roviny a nakláňať sa mimo nej, z pôvodných šiestich možností mu zostanú tri.

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
