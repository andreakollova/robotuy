// Chapter 2.1 – Lekcia 3: Stupne voľnosti tuhého telesa
// Full lesson content - DO NOT SHORTEN

export const ch21Content = `# Lekcia 3: Stupne voľnosti tuhého telesa

V predchádzajúcej lekcii sme si vysvetlili, že **configuration — konfigurácia** predstavuje úplný stav mechanického systému. Zároveň sme zaviedli pojem **degrees of freedom — stupne voľnosti**, skrátene **DOF**, ktorý hovorí, koľko nezávislých hodnôt potrebujeme na jednoznačné určenie tejto konfigurácie.

Teraz túto myšlienku použijeme na jeden z najzákladnejších objektov robotiky — **rigid body**, teda tuhé teleso. Jednotlivé pevné časti robota, jeho links, totiž pri základnej kinematickej analýze modelujeme práve ako rigid bodies. Ak teda chceme neskôr rozumieť celému robotickému mechanizmu, najskôr potrebujeme vedieť, koľko voľnosti má jedno samostatné tuhé teleso.

V tejto lekcii sa dostaneme k dvom dôležitým výsledkom. **Tuhé teleso, ktorého pohyb je obmedzený na jednu rovinu, má 3 DOF.** Voľné tuhé teleso pohybujúce sa v trojrozmernom priestore má **6 DOF**. Dôležitejšie než samotné čísla však bude pochopiť, prečo práve tri a šesť a čo nám tieto stupne voľnosti fyzicky hovoria.

![Konfigurácia dverí, bodu v rovine a mince](/book/ch2/fig2-1.png)

---

## 01. Čo v robotike znamená rigid body

Skutočné predmety nie sú dokonale tuhé. Kovový link robotického ramena sa môže pri veľkom zaťažení mierne ohnúť, plast sa môže deformovať a aj oceľ sa pri pôsobení síl nepatrne mení. Ak by sme však pri každom pohybe robota museli sledovať všetky tieto malé deformácie, už jednoduchý mechanický model by bol veľmi komplikovaný.

Preto pri základnej robotike používame idealizáciu. Pevnú časť robota považujeme za **rigid body — tuhé teleso**, ktorého tvar a rozmery sa počas pohybu nemenia. Teleso sa môže presúvať a otáčať, ale v našom modeli sa nenaťahuje, neskracuje ani neohýba.

Predstav si napríklad kovový link robotického ramena a označ na ňom dva body A a B. Keď sa link pohne, oba body môžu zmeniť svoju polohu v priestore. Vzdialenosť medzi nimi sa však nemení. Ak je A od B vzdialené 20 cm, zostane táto vzdialenosť 20 cm pri každom povolenom pohybe telesa.

Práve pevné vzájomné vzdialenosti medzi bodmi robia z telesa rigid body. Vďaka tomu nemusíme samostatne opisovať každý jeho bod. Keď poznáme polohu a orientáciu celého telesa, vieme z nich odvodiť polohu ktoréhokoľvek bodu na ňom.

To je dôvod, prečo môžeme aj komplikovaný robotický link opísať pomocou malého počtu hodnôt namiesto sledovania miliónov bodov jeho povrchu.

---

## 02. Čo presne znamená degree of freedom

**Degree of freedom — stupeň voľnosti** predstavuje jednu nezávislú hodnotu, ktorú potrebujeme na úplné určenie konfigurácie systému.

Dôležité je slovo **nezávislú**.

Predstav si kabínu výťahu. Môže sa pohybovať hore alebo dole, ale jej pohyb je obmedzený na jednu zvislú dráhu. Na určenie jej polohy preto stačí jedna hodnota, napríklad výška h.

Výťah má teda **1 DOF**.

Pohyb hore a pohyb dole pritom nie sú dva rôzne stupne voľnosti. Ide o dve možnosti zmeny jednej a tej istej súradnice. Hodnota h môže rásť alebo klesať, ale stále nám stačí jediné číslo.

Teraz si predstav bod voľne sa pohybujúci po stole. Na jeho polohu potrebujeme dve nezávislé súradnice, napríklad x a y. Bod preto má **2 DOF**. Zmenu x môžeme vykonať bez toho, aby sme museli zmeniť y, a naopak.

Presnejšie teda môžeme povedať, že počet degrees of freedom je **najmenší počet nezávislých reálnych hodnôt potrebných na jednoznačné určenie konfigurácie systému**.

Táto definícia bude dôležitá neskôr. Nie vždy totiž bude platiť, že počet čísel, ktoré v nejakom zápise vidíme, je zároveň počet DOF. Niektoré z týchto hodnôt môžu byť navzájom previazané pomocou **constraints**.

---

## 03. Position a orientation sú dve rôzne informácie

Pri tuhom telese nestačí povedať iba to, kde sa nachádza jeden jeho bod. Musíme vedieť aj to, ako je teleso natočené.

Predstav si telefón položený na stole. Jeho stred môže byť presne v strede stola, ale telefón môže byť otočený obrazovkou smerom k tebe, otočený o 90° alebo položený šikmo. Poloha jeho stredu sa pritom nemení.

V robotike preto odlišujeme **position — polohu** a **orientation — orientáciu**.

Position odpovedá na otázku **kde sa teleso nachádza**. Orientation odpovedá na otázku **ako je natočené**.

Pri geometrickom bode orientáciu riešiť nemusíme, pretože bod nemá tvar. Pri rigid body však orientácia tvorí neoddeliteľnú súčasť konfigurácie.

Tento rozdiel je dôležitý aj pri robotickom end-effectore. Ak má robot vložiť skrutkovač do skrutky, nestačí dostať jeho špičku na správne miesto. Skrutkovač musí zároveň smerovať správnym smerom. Pri uchopení predmetu, zváraní alebo montáži preto robot často musí kontrolovať position aj orientation súčasne.

---

## 04. Planar rigid body má 3 DOF

Najskôr budeme uvažovať tuhé teleso, ktorého pohyb je obmedzený na jednu rovinu.

Predstav si mincu položenú naplocho na stole. Môže sa po stole pohybovať, ale nesmie sa zdvihnúť, prevrátiť ani nakloniť mimo roviny.

Na úplné určenie jej position potrebujeme dve hodnoty. Môžeme použiť napríklad súradnice x a y, ktoré určujú polohu jej stredu na stole.

Samotné x a y však nestačia. Minca sa môže na rovnakom mieste ešte otáčať. Potrebujeme preto tretí parameter θ, ktorý opisuje jej orientation.

Konfiguráciu môžeme zapísať:

**q = (x, y, θ)**

Minca sa teda môže nezávisle posúvať v jednom smere roviny, posúvať v druhom smere a otáčať.

Má preto:

**2 translačné DOF + 1 rotačný DOF = 3 DOF**

Tuhé teleso s pohybom obmedzeným na jednu rovinu nazývame **planar rigid body**.

Je pritom dôležité, že slovo planar neopisuje tvar objektu. Telefón alebo mobilný robot sú fyzicky trojrozmerné objekty. Planar znamená iba to, že ich povolený pohyb je obmedzený na jednu rovinu.

---

## 05. Prečo rigid body nemá DOF pre každý svoj bod

Výsledok 3 DOF sme zatiaľ získali jednoducho pomocou position a orientation. Teraz si ho odvodíme iným spôsobom, ktorý nám ukáže, akú úlohu zohráva rigidita.

Predstav si, že na minci označíme tri body A, B a C.

![Tri body na minci a ich constraints](/book/ch2/fig2-2.png)

Ak by išlo o tri úplne samostatné body pohybujúce sa po stole, každý by potreboval dve súradnice. Bod A by mal 2 DOF, bod B ďalšie 2 a bod C ďalšie 2.

Spolu by mali:

**2 + 2 + 2 = 6 DOF**

Lenže body A, B a C nie sú samostatné. Sú súčasťou jedného rigidného telesa, a preto sa ich vzájomné vzdialenosti nesmú meniť.

Ak pohneme bodom A, B a C sa musia pohybovať spolu s ním tak, aby vzdialenosti A–B, A–C a B–C zostali rovnaké.

Tieto pevné geometrické vzťahy predstavujú **constraints — obmedzenia**. Práve constraints spôsobujú, že jednotlivé body rigid body nemajú vlastnú nezávislú voľnosť pohybu.

---

## 06. Bod A určí position, bod B pridá orientation

Pozrime sa na umiestnenie bodov krok za krokom.

Bod A môžeme v rovine položiť kamkoľvek. Potrebujeme preto dve hodnoty, napríklad jeho súradnice x a y.

Bod A pridáva:

**2 DOF**

Keď už poznáme A, bod B nemôžeme položiť kamkoľvek. Vzdialenosť medzi A a B je pevná.

Ak je napríklad A–B = 3 cm, bod B sa musí nachádzať niekde na kružnici s polomerom 3 cm a stredom v A. Na výber konkrétneho miesta na tejto kružnici nám stačí jedna hodnota — uhol okolo bodu A.

B preto pridáva už iba:

**1 DOF**

Spolu máme:

**2 + 1 = 3 DOF**

A tým sme v skutočnosti určili position aj orientation telesa v rovine.

Bod A nám určil, kde teleso leží. Poloha bodu B voči A určila jeho natočenie.

---

## 07. Bod C už ďalší spojitý DOF nepridáva

Čo sa stane s bodom C?

Jeho vzdialenosť od A aj od B musí zostať pevná. Všetky body so správnou vzdialenosťou od A ležia na jednej kružnici. Všetky body so správnou vzdialenosťou od B ležia na druhej kružnici.

Bod C musí spĺňať obe podmienky súčasne.

V bežnom prípade sa dve kružnice pretínajú v dvoch bodoch. Dostaneme dve zrkadlové možnosti usporiadania A, B a C.

Bod C sa však už nemôže spojito pohybovať po nejakej novej osi alebo krivke. Jeho poloha je po určení A a B pevne daná až na túto diskrétnu voľbu medzi dvoma možnosťami.

Preto C nepridáva nový spojitý stupeň voľnosti.

**Planar rigid body** teda zostáva systémom s:

**3 DOF**

Toto odvodenie ukazuje, prečo rigidita tak výrazne znižuje počet nezávislých hodnôt. Veľké množstvo bodov telesa sa nepohybuje nezávisle. Ich positions sú navzájom previazané pevnou geometriou.

---

## 08. Diskrétna voľba nie je ďalší DOF

Pri bode C sme dostali dve možné zrkadlové polohy. Mohlo by sa zdať, že keď existujú dve možnosti, pribudol ďalší degree of freedom.

Nie je to tak.

Degrees of freedom v tomto kontexte počítajú **spojité reálne parametre**.

Súradnicu x môžeme meniť plynulo. Rovnako y alebo uhol θ. Medzi hodnotami 1 a 2 existuje nekonečne veľa ďalších hodnôt.

Dve zrkadlové configurations však predstavujú **discrete choice — diskrétnu voľbu**. Neexistuje plynulá ďalšia súradnica, ktorou by sme medzi nimi mohli pohybovať pri zachovaní rovnakých constraints.

Podobne si môžeme predstaviť mincu ležiacu jednou alebo druhou stranou nahor. Heads a tails sú dve rôzne možnosti, ale samotná voľba medzi nimi nepridáva ďalší spojitý DOF.

To je dôvod, prečo pri stupňoch voľnosti nepočítame všetky možné „stavy", ale počet nezávislých **spojitých** parametrov konfigurácie.

---

## 09. Nie každý constraint odoberá ďalší DOF

Predstav si teraz, že na rigid body označíme ešte štvrtý bod D.

Keď už poznáme configuration celého telesa, position bodu D je automaticky určená. Nepridáva nový DOF.

Mohli by sme pritom zapísať viac constraints — napríklad pevnú vzdialenosť D od A, D od B a D od C.

To však neznamená, že každý z týchto constraints odoberá ďalší DOF.

Ak už niektoré constraints jednoznačne určujú polohu bodu D, ďalšia podmienka môže iba potvrdiť informáciu, ktorá z nich už vyplýva. Takýto constraint označujeme ako **redundant constraint — redundantné obmedzenie**.

Pri počítaní degrees of freedom nás preto nezaujíma počet všetkých rovníc, ktoré vieme napísať. Zaujíma nás počet **independent constraints — nezávislých obmedzení**.

Táto myšlienka bude mimoriadne dôležitá pri robotických mechanizmoch. Pri zložitejšom systéme môžeme mať mnoho geometrických väzieb, ale iba niektoré z nich skutočne odoberajú ďalšiu nezávislú možnosť pohybu.

---

## 10. Voľnosť systému a constraints

Teraz už môžeme sformulovať všeobecný spôsob uvažovania.

Najskôr si predstavíme systém bez určitých väzieb a spočítame, koľko nezávislej voľnosti by mal. Potom pridáme constraints a sledujeme, ktoré z týchto možností pohybu odstránia.

Pri jednoduchých prípadoch preto môžeme uvažovať:

**DOF = počet nezávislých premenných - počet nezávislých constraints**

Dôležitejšia než samotný zápis je však myšlienka za ním: **constraints prepájajú pôvodne nezávislé možnosti a tým znižujú voľnosť systému**.

Pri rigid body sú constraints vytvorené tým, že vzdialenosti medzi bodmi zostávajú pevné.

Pri robotickom mechanizme budú podobnú úlohu plniť joints. Tie určité relatívne pohyby medzi links dovolia a ostatné zakážu.

Preto je pri analyzovaní jointu užitočné nepýtať sa iba „Aký pohyb umožňuje?", ale aj **„Ktoré možné pohyby odoberá?"**

---

## 11. Spatial rigid body: najskôr tri translácie

Doteraz sme pohyb rigid body obmedzovali na jednu rovinu. Teraz toto obmedzenie odstránime a necháme teleso voľne sa pohybovať v trojrozmernom priestore.

Predstav si telefón, ktorý držíš vo vzduchu.

Najskôr riešme iba jeho **position**. V 3D priestore sa môže nezávisle pohybovať v troch smeroch. Jeho polohu preto môžeme určiť tromi súradnicami:

**x, y, z**

To znamená:

**3 translačné DOF**

Tieto tri hodnoty nám presne povedia, kde sa teleso nachádza. Stále však nehovoria, ako je natočené.

Pre úplnú configuration preto musíme doplniť orientation.

---

## 12. Orientation v 3D potrebuje ďalšie tri DOF

Drž telefón na jednom mieste vo vzduchu a skús meniť iba jeho natočenie.

Môžeš ho nakloniť dopredu alebo dozadu, nakloniť doľava alebo doprava a zároveň ho môžeš otočiť okolo tretej osi.

Na úplné určenie orientation rigid body v trojrozmernom priestore potrebujeme **tri nezávislé rotačné parametre**.

K trom translačným DOF preto pridáme ďalšie tri rotačné:

**3 translácie + 3 rotácie = 6 DOF**

Voľné spatial rigid body má teda:

**6 DOF**

Tento výsledok si môžeme zapamätať veľmi jednoducho:

**3 DOF určujú, kde teleso je. Ďalšie 3 DOF určujú, ako je natočené.**

Spolu opisujú jeho úplnú **pose — polohu a orientáciu**.

---

## 13. Prečo 6 DOF vyjde aj pomocou bodov A, B a C

Výsledok šiestich stupňov voľnosti môžeme odvodiť aj bez rozdelenia na translácie a rotácie.

Opäť použijeme tri body A, B a C pevne spojené s rigid body.

Bod A môžeme v 3D priestore umiestniť kamkoľvek. Potrebujeme na to tri súradnice, takže A pridáva:

**3 DOF**

Bod B musí zostať v pevnej vzdialenosti od A. Ak je vzdialenosť A–B napríklad 10 cm, všetky možné polohy B ležia na povrchu gule s polomerom 10 cm a stredom v A.

Povrch gule je dvojrozmerný. Na určenie konkrétneho bodu na ňom potrebujeme dve nezávislé hodnoty.

B preto pridáva:

**2 DOF**

Máme spolu:

**3 + 2 = 5 DOF**

Bod C musí byť zároveň v pevnej vzdialenosti od A aj od B. Jedna podmienka ho obmedzí na povrch jednej gule a druhá na povrch druhej.

Prienikom dvoch takýchto povrchov je za bežných podmienok kružnica.

Na výber konkrétneho bodu na kružnici stačí jedna hodnota.

C preto pridáva:

**1 DOF**

Spolu dostaneme:

**3 + 2 + 1 = 6 DOF**

Rovnaký výsledok sme teda získali dvoma úplne rozdielnymi spôsobmi.

---

## 14. Prečo musia byť body A, B a C nekolineárne

Pri predchádzajúcom odvodení je jedna dôležitá podmienka: body A, B a C nesmú všetky ležať na jednej priamke.

Ak by boli kolineárne, ich poloha by nedokázala jednoznačne určiť rotation telesa okolo osi tejto priamky.

Predstav si napríklad tenkú tyč a tri body označené priamo na jej stredovej osi. Ak tyč otočíme okolo tejto osi, positions všetkých troch bodov zostanú rovnaké.

Z týchto troch bodov by sme preto nevedeli rozlíšiť rôzne orientations telesa.

Tri **non-collinear points — nekolineárne body** však jednoznačne určia nielen position, ale aj orientation rigid body.

To je dôvod, prečo sa pri podobných geometrických odvodeniach vyberajú body, ktoré neležia na jednej priamke.

---

## 15. Planar rigid body verzus spatial rigid body

Teraz už môžeme oba základné prípady postaviť vedľa seba.

**Planar rigid body** sa môže pohybovať iba v jednej rovine. Jeho configuration môžeme napríklad zapísať ako:

**q = (x, y, θ)**

Má dve translačné a jednu rotačnú freedom, teda:

**3 DOF**

**Spatial rigid body** sa môže voľne pohybovať v trojrozmernom priestore. Potrebuje tri hodnoty pre position a tri pre orientation, preto má:

**6 DOF**

Rozdiel nevzniká preto, že planar rigid body by bolo „2D teleso". Môže ísť o úplne normálny trojrozmerný objekt. Rozdiel vzniká tým, že jeho pohyb bol pomocou constraints obmedzený na rovinu.

Na planar rigid body sa teda môžeme pozerať aj tak, že začneme so spatial rigid body so 6 DOF a pomocou mechanických obmedzení mu tri možnosti pohybu odoberieme.

Zostanú 3 DOF.

Tento spôsob uvažovania bude veľmi užitočný pri joints a celých robotických mechanizmoch.

---

## 16. Prečo je 6 DOF v robotike také dôležité

Šesť stupňov voľnosti sa v robotike objavuje neustále, pretože všeobecná **pose** rigid body v 3D priestore má práve 6 DOF.

Predstav si robotické rameno s gripperom.

Ak má uchopiť fľašu, nestačí dostať gripper na správne miesto. Musí byť aj vhodne natočený. Inú orientation bude potrebovať pri uchopení fľaše zhora a inú pri uchopení zboku.

Pri skrutkovaní musí os skrutkovača smerovať pozdĺž osi skrutky. Pri zváraní musí byť nástroj správne orientovaný voči povrchu. Pri manipulácii s dielom môže byť požadované nielen presné miesto, ale aj jeho presné natočenie.

Pre úplný opis pose end-effectora preto všeobecne potrebujeme:

**3 DOF pre position + 3 DOF pre orientation = 6 DOF**

Aj preto má veľa priemyselných robotických ramien šesť riadených osí.

To však neznamená, že každý robot so šiestimi joints automaticky dosiahne akúkoľvek pose. Reálny pohyb stále závisí od geometrie robota, dĺžok links, rozsahov joints, kolízií a ďalších obmedzení.

Šesť DOF znamená mechanickú možnosť nezávisle opisovať šesť konfiguračných parametrov, nie záruku neobmedzeného pohybu v priestore.

---

## 17. Viac než 6 DOF a kinematic redundancy

Niektoré robotické ramená majú viac než šesť stupňov voľnosti.

Typickým príkladom je 7-DOF robotické rameno.

End-effector sa stále pohybuje v priestore, kde všeobecnú pose určujeme šiestimi hodnotami — tromi pre position a tromi pre orientation. Robot má však k dispozícii sedem nezávislých joint coordinates.

To znamená, že rovnakú pose end-effectora môže za určitých podmienok dosiahnuť viacerými rôznymi configurations celého ramena.

Takúto vlastnosť nazývame **kinematic redundancy — kinematická redundancia**.

Ľudská ruka je dobrým intuitívnym príkladom. Dlaň môžeme držať na približne rovnakom mieste, zatiaľ čo mierne meníme polohu lakťa.

Redundancia môže byť veľmi užitočná. Robot môže napríklad meniť configuration tak, aby obišiel prekážku, držal joints ďalej od limitov alebo našiel pohodlnejšiu polohu bez zmeny požadovanej pose end-effectora.

---

## 18. Čo si z tejto lekcie skutočne odniesť

Najdôležitejším výsledkom tejto lekcie nie je iba zapamätať si:

**planar rigid body = 3 DOF**

a

**spatial rigid body = 6 DOF**

Dôležitejší je spôsob, akým sme sa k týmto výsledkom dostali.

Najskôr zisťujeme, ktoré hodnoty môžeme meniť nezávisle. Potom hľadáme constraints, ktoré tieto možnosti navzájom previažu.

Pri rigid body sú najzákladnejšími constraints pevné vzdialenosti medzi jeho bodmi. Práve preto sa jednotlivé body nemôžu pohybovať nezávisle.

Keď túto logiku neskôr prenesieme na robota, namiesto jednotlivých bodov budeme pracovať s rigid links a joints. Každý joint určitý relatívny pohyb dovolí, ale zároveň iné pohyby zakáže.

Práve tým sa dostaneme k ďalšej otázke:

**Ak máme viac rigid bodies spojených joints, koľko DOF zostane celému robotickému mechanizmu?**

A to bude prirodzené pokračovanie tejto lekcie.

---

## Zhrnutie lekcie

**Rigid body — tuhé teleso** je idealizovaný objekt, ktorého tvar a rozmery sa počas pohybu nemenia. Jeho body sa môžu v priestore presúvať, ale vzájomné vzdialenosti medzi nimi zostávajú pevné. Práve vďaka tejto rigidite nemusíme polohu každého bodu opisovať samostatne.

**Degree of freedom — DOF** je jedna nezávislá reálna hodnota potrebná na určenie konfigurácie systému. Rozhodujúci je počet nezávislých hodnôt, nie počet všetkých čísel alebo smerov pohybu, ktoré dokážeme pomenovať.

Pri rigid body odlišujeme **position** a **orientation**. Position hovorí, kde sa teleso nachádza, orientation určuje jeho natočenie.

**Planar rigid body** potrebuje dve hodnoty pre position a jednu pre orientation:

**q = (x, y, θ)**

Preto má:

**3 DOF**

**Spatial rigid body** potrebuje tri hodnoty pre position a tri pre orientation:

**3 + 3 = 6 DOF**

Rovnakých 6 DOF môžeme odvodiť pomocou troch nekolineárnych bodov A, B a C. Bod A pridá 3 DOF, bod B pri pevnej vzdialenosti od A ďalšie 2 a bod C pri pevných vzdialenostiach od A a B už iba 1:

**3 + 2 + 1 = 6 DOF**

Dôležitú úlohu pri tomto počítaní zohrávajú **constraints**. Tie prepájajú premenné a odoberajú systému nezávislú voľnosť. Nie všetky constraints však musia byť nezávislé — **redundantný constraint** nepridáva nové obmedzenie.

Základný mentálny model preto je:

**najskôr určím možnú voľnosť → potom zohľadním constraints → zostanú degrees of freedom**

Tento princíp teraz môžeme preniesť z jedného rigid body na celý robotický mechanizmus vytvorený z viacerých links a joints.`;
