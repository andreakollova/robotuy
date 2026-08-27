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

## 05. Prečo nemusíme sledovať každý bod tuhého telesa zvlášť

Na prvý pohľad môže pôsobiť zvláštne, že celé tuhé teleso dokážeme opísať iba niekoľkými číslami. Veď napríklad telefón alebo robotický link obsahuje obrovské množstvo bodov a každý z nich má vlastnú polohu v priestore. Mohlo by sa teda zdať, že na presný opis telesa musíme poznať súradnice každého jedného bodu.

Pri **rigid body** — tuhom telese to však nie je potrebné. Dôvodom je jeho rigidita. Jednotlivé body telesa sa síce pri pohybe presúvajú, ale ich vzájomné vzdialenosti zostávajú rovnaké. Body sa teda nemôžu pohybovať nezávisle od seba.

Predstav si pevný trojuholníkový kus kartónu a na jeho rohoch označ body A, B a C. Keby A, B a C boli tri samostatné bodky nakreslené na stole, každú z nich by sme mohli premiestniť kamkoľvek bez ohľadu na ostatné. Každý bod v rovine potrebuje dve súradnice, takže tri nezávislé body by spolu potrebovali šesť hodnôt:

A = (xa, ya), B = (xb, yb), C = (xc, yc)

![Tri body na minci a ich constraints](/book/ch2/fig2-2.png)

Tri úplne nezávislé body by teda mali spolu **6 DOF**.

Lenže ak sú tieto tri body rohmi jedného pevného kusu kartónu, situácia sa zmení. Keď posunieš A, nemôžeš nechať B a C ľubovoľne na pôvodnom mieste. Kartón by sa musel natiahnuť alebo roztrhnúť. Vzdialenosti A–B, A–C a B–C musia zostať rovnaké.

Práve tieto pevné geometrické vzťahy nazývame **constraints — obmedzenia**. Constraints spôsobujú, že pohyb jedného bodu ovplyvňuje, kde sa môžu nachádzať ostatné body.

To je základná myšlienka rigid body: jeho body nemajú vlastnú nezávislú voľnosť pohybu. Pohybujú sa spolu ako jeden celok.

Preto nepotrebujeme poznať súradnice každého bodu zvlášť. Stačí nám dostatok informácií na určenie polohy a natočenia celého telesa a z toho už vieme odvodiť polohu všetkých jeho ostatných bodov.

---

## 06. Ako jeden bod určí polohu a druhý natočenie

Pozrime sa teraz na rovnaké teleso krok za krokom.

Začneme bodom A. Teleso sa nachádza v rovine, takže bod A môžeme položiť kdekoľvek na stole. Na určenie jeho polohy potrebujeme dve súradnice, napríklad x a y.

Bod A nám teda pridá:

**2 DOF**

Teraz však ešte stále nevieme, ako je teleso natočené. Predstav si napríklad pravítko. Ak poznáme iba polohu jedného jeho konca, druhý koniec môže smerovať doprava, nahor, šikmo alebo ľubovoľným iným smerom. Jeden bod teda určí, kde teleso je, ale neurčí jeho orientation.

Preto pridáme bod B.

B však už nemôžeme položiť kdekoľvek. Keďže A a B patria k tomu istému tuhému telesu, ich vzdialenosť je pevná. Ak je A–B = 10 cm, B musí zostať presne 10 cm od A.

Predstav si, že bod A zapichneme špendlíkom do papiera a k nemu priviažeme 10 cm dlhú šnúrku. Druhý koniec šnúrky sa môže pohybovať po kružnici okolo A. Presne tak vyzerajú možné polohy bodu B.

B už preto nepotrebuje dve nezávislé súradnice. Keď poznáme A a pevnú vzdialenosť A–B, stačí nám povedať, v akom smere od A bod B leží. Na to potrebujeme iba jeden uhol.

Bod B teda pridá:

**1 DOF**

Spolu máme:

**2 + 1 = 3 DOF**

A to už stačí na úplný opis tuhého telesa v rovine. Poloha A nám určila position a smer od A k B nám určil orientation.

Inými slovami, pri **planar rigid body** potrebujeme vedieť iba: **kde sa teleso nachádza + ako je natočené**, čo môžeme zapísať napríklad ako:

**q = (x, y, θ)**

Preto má planar rigid body **3 DOF**.

---

## 07. Na čo potom potrebujeme tretí bod C?

Možno sa teraz natíska otázka: Ak body A a B už určujú polohu aj natočenie telesa, prečo vôbec pridávame bod C?

Bod C nám pomáha ukázať, ako silno rigidita obmedzuje ďalšie body telesa.

Predstav si pevný trojuholník A–B–C. Polohu A už poznáme a poznáme aj polohu B. Zároveň vieme, že vzdialenosť A–C aj vzdialenosť B–C sú pevné.

Kde teda môže byť C?

Najskôr sa pozrime iba na podmienku vzdialenosti od A. Ak musí byť C napríklad 5 cm od A, všetky možné polohy C ležia na kružnici okolo A.

Potom pridáme druhú podmienku. C musí byť zároveň napríklad 4 cm od B. To vytvorí druhú kružnicu, tentoraz okolo B.

Bod C musí ležať na oboch kružniciach súčasne.

Kružnice sa za bežných podmienok pretínajú iba v dvoch bodoch. To znamená, že po určení A a B už C nemá voľnosť pohybovať sa plynulo niekam ďalej. Zostanú iba dve možné zrkadlové polohy.

Preto C nepridáva ďalší spojitý DOF.

Toto je podstata celej myšlienky. Prvý bod sme mohli umiestniť kdekoľvek. Druhý už bol obmedzený na kružnicu. Tretí je obmedzený ešte viac — už zostáva iba niekoľko konkrétnych možností.

**Rigidita teda postupne „odoberá" voľnosť jednotlivým bodom.**

---

## 08. Prečo dve možné polohy neznamenajú ďalší DOF

Pri bode C nám zostali dve zrkadlové možnosti. Mohlo by sa zdať, že keď máme na výber z dvoch možností, mali by sme pridať ďalší degree of freedom.

Nie je to tak, pretože degrees of freedom v tomto kontexte opisujú **spojité nezávislé parametre**.

Predstav si súradnicu x. Môže mať hodnotu 1, potom 1,1, potom 1,11 a medzi ktorýmikoľvek dvoma hodnotami existuje nekonečne veľa ďalších možností. Rovnako môžeme plynulo meniť uhol θ.

Takáto veličina je **continuous — spojitá**.

Pri bode C však máme iba dve oddelené možnosti. Nemôžeme ho pri zachovaní všetkých pevných vzdialeností plynulo presúvať z jednej zrkadlovej polohy do druhej. Museli by sme porušiť geometriu telesa alebo ho „preklopiť" mimo nášho planar modelu.

Takáto voľba je **discrete — diskrétna**.

Dobrým príkladom je vypínač. Môže byť zapnutý alebo vypnutý. Má dva možné stavy, ale nie je to spojitý degree of freedom v rovnakom zmysle ako poloha alebo uhol.

Podobne minca môže byť heads up alebo tails up. Sú to dve možnosti, ale samotná táto voľba nepridáva ďalší spojitý DOF.

Preto **planar rigid body** zostáva systémom s **3 DOF**.

---

## 09. Čo sú independent a redundant constraints

Teraz si predstav, že na rigid body označíme ešte ďalší bod D.

Keď už poznáme position a orientation celého telesa, D je automaticky na konkrétnom mieste. Nemá žiadnu vlastnú nezávislú voľnosť.

Jeho polohu môžeme opísať viacerými pravidlami. Môžeme napríklad povedať, že D musí byť 5 cm od A, 7 cm od B a 4 cm od C.

Na prvý pohľad máme tri constraints. To však ešte neznamená, že každý z nich odoberá nový DOF.

Predstav si jednoduchší príklad. Poviem ti:

„Číslo x sa musí rovnať 5."

A potom pridám:

„Číslo x musí byť zároveň väčšie ako 4."

Druhá informácia už v podstate neprináša nič nové. Ak vieme, že x = 5, automaticky vieme, že x > 4.

Podobná vec môže nastať pri geometrických constraints.

Ak už dve nezávislé podmienky jednoznačne určia polohu bodu D, tretia môže iba potvrdzovať to, čo už z prvých dvoch vyplýva. Takému constraintu hovoríme **redundant constraint**.

Naopak **independent constraint — nezávislé obmedzenie** prináša novú informáciu a skutočne odoberá systému ďalšiu možnosť pohybu.

Preto pri počítaní DOF nestačí povedať: „Napísala som päť rovníc, takže som odobrala päť DOF." Musíme zistiť, koľko z týchto rovníc prináša skutočne nezávislé obmedzenia.

---

## 10. Najjednoduchší spôsob, ako nad DOF rozmýšľať

Celú predchádzajúcu časť môžeme zhrnúť jednoduchou otázkou:

**Koľko vecí môžem zmeniť nezávisle bez toho, aby som porušila pravidlá systému?**

To je v praxi často najlepší spôsob, ako nad DOF premýšľať.

Tri samostatné body v rovine majú veľa voľnosti, pretože každý môže ísť vlastným smerom. Ak ich však spojíme do pevného trojuholníka, už ich nemôžeme posúvať nezávisle. Pevné vzdialenosti medzi nimi vytvoria constraints a z troch samostatných bodov vznikne jeden rigidný objekt.

Pri jednoduchých prípadoch preto môžeme myslieť na vzťah:

**DOF = pôvodná voľnosť - nezávislé constraints**

Dôležité však nie je mechanicky odčítavať čísla. Dôležité je vždy pochopiť, ktorá možnosť pohybu je skutočne nezávislá a ktorá už vyplýva z ostatných.

Presne túto logiku neskôr použijeme pri robotických joints. Joint môžeme totiž chápať ako mechanické pravidlo medzi dvoma links. Určitý pohyb dovolí, ale ostatné možnosti pohybu odstráni.

---

## 11. Čo sa zmení, keď teleso pustíme do 3D priestoru

Doteraz sme teleso držali na stole. Mohlo sa teda pohybovať iba v jednej rovine. Teraz si predstav, že ho zo stola zdvihneme a necháme ho voľne pohybovať v priestore.

Použime opäť telefón.

Ak nás zatiaľ zaujíma iba jeho **position — poloha**, potrebujeme tri súradnice. Telefón môžeme posúvať doľava a doprava, dopredu a dozadu a hore a dole.

Jeho position môžeme preto zapísať pomocou:

**x, y, z**

Tieto tri hodnoty sa môžu meniť nezávisle, takže position v 3D priestore má:

**3 translačné DOF**

Predstav si to ako bod označujúci stred telefónu. Tri čísla x, y a z nám presne povedia, kde sa tento bod nachádza.

Stále však nevieme, ako je telefón natočený.

---

## 12. Prečo orientation potrebuje ďalšie tri DOF

Teraz nechaj stred telefónu približne na rovnakom mieste vo vzduchu a začni meniť iba jeho orientation.

Môžeš ho napríklad otočiť ako volant. Potom ho môžeš nakloniť dopredu a dozadu. A môžeš ho nakloniť aj do strán.

Ide o tri nezávislé rotačné možnosti.

Na úplné určenie orientation voľného rigid body v 3D priestore preto potrebujeme ďalšie:

**3 rotačné DOF**

Spolu dostávame:

**3 translačné DOF + 3 rotačné DOF = 6 DOF**

Voľné **spatial rigid body** má teda **6 degrees of freedom**.

Veľmi užitočná pomôcka je:

**3 DOF určujú kde teleso je.**

**3 DOF určujú ako je natočené.**

Spolu tvoria jeho úplnú **pose — polohu a orientáciu**.

---

## 13. Prečo vyjde 6 DOF aj pomocou troch bodov

Rovnaký výsledok si môžeme overiť pomocou bodov A, B a C. Tentoraz však body nie sú na stole, ale v trojrozmernom priestore.

Začneme bodom A. Ten môžeme položiť kamkoľvek v priestore, preto potrebujeme tri súradnice (x, y, z).

A nám teda dá: **3 DOF**

Teraz pridáme bod B. Jeho vzdialenosť od A musí zostať pevná. Predstav si, že medzi A a B máme neviditeľnú pevnú tyčku dlhú 10 cm.

Ak držíme A na mieste, kde všade môže byť B? Nie na kružnici ako v 2D, ale kdekoľvek na povrchu gule s polomerom 10 cm okolo A.

Aby sme vybrali jeden konkrétny bod na povrchu gule, potrebujeme dve nezávislé hodnoty. Podobne ako na Zemi potrebujeme latitude a longitude.

B preto pridáva: **2 DOF**

Zatiaľ máme: **3 + 2 = 5 DOF**

Teraz pridáme C. Jeho vzdialenosť od A je pevná a zároveň jeho vzdialenosť od B je pevná.

Prvá podmienka hovorí, že C musí ležať na povrchu jednej gule. Druhá hovorí, že musí zároveň ležať na povrchu druhej gule.

Prienik dvoch povrchov gulí je za bežných podmienok kružnica.

C sa teda môže pohybovať už iba po tejto kružnici. Na výber konkrétneho bodu na nej potrebujeme jedinú hodnotu.

C preto pridáva: **1 DOF**

A dostaneme:

**3 + 2 + 1 = 6 DOF**

To je rovnaký výsledok ako pri rozdelení na tri translácie a tri rotácie.

---

## 14. Prečo body A, B a C nesmú ležať na jednej priamke

Pri tomto geometrickom vysvetlení je dôležitý jeden detail. Body A, B a C musia byť **non-collinear — nekolineárne**, teda nesmú všetky ležať na jednej priamke.

Predstav si dlhú ceruzku a označ na jej stredovej osi tri body. Ak ceruzku otočíš okolo jej vlastnej pozdĺžnej osi, polohy všetkých troch označených bodov zostanú rovnaké.

To znamená, že z ich polohy nedokážeme zistiť, či bola ceruzka okolo tejto osi otočená.

Tri body na jednej priamke teda nestačia na úplné určenie orientation telesa.

Ak však vyberieme tri body, ktoré vytvárajú trojuholník, ich poloha už určí orientation telesa jednoznačne.

Preto sa pri tomto odvodení používajú tri **nekolineárne body**.

---

## 15. Čo si z planar a spatial rigid body zapamätať

Teraz už môžeme oba prípady porovnať veľmi jednoducho.

Pri **planar rigid body** je pohyb obmedzený na jednu rovinu. Potrebujeme dve hodnoty na position a jednu na orientation:

**q = (x, y, θ)**

Preto:

**planar rigid body = 3 DOF**

Pri **spatial rigid body** sa teleso môže voľne pohybovať v 3D priestore. Potrebujeme tri hodnoty na position a tri na orientation:

**spatial rigid body = 6 DOF**

Planar body pritom nie je „plochý 2D objekt". Môže ísť o normálny trojrozmerný robot alebo telefón. Rozdiel je iba v tom, že jeho pohyb je obmedzený.

Napríklad mobilný robot jazdiaci po podlahe je fyzicky trojrozmerný, ale ak predpokladáme, že sa nemôže zdvihnúť ani prevrátiť, jeho pohyb môžeme modelovať ako planar.

Ak chceš túto časť pochopiť úplne intuitívne, najlepšie je držať v hlave tieto dva obrazy:

**Planar rigid body**: predstav si telefón položený na stole. Môžeš ho posunúť do dvoch smerov a otočiť. To sú 3 DOF.

**Spatial rigid body**: zdvihni ten istý telefón zo stola. K trom pôvodným možnostiam pribudne pohyb hore/dole a ďalšie dva spôsoby nakláňania. Spolu dostaneš 6 DOF.

A celý argument s bodmi A, B a C je v podstate iba matematický spôsob, ako dokázať to isté: keď body spojíme do jedného rigidného telesa, ich pohyby už nie sú nezávislé. Pevné vzdialenosti medzi nimi postupne odoberajú voľnosť, až zostane presne toľko nezávislých hodnôt, koľko potrebujeme na polohu a orientáciu celého telesa.

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
