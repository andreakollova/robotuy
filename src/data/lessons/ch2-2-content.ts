// Chapter 2.2 – Lekcia 4: Stupne voľnosti robota
// Full lesson content - DO NOT SHORTEN

export const ch22Content = `# Lekcia 4: Stupne voľnosti robota

V predchádzajúcej lekcii sme sa pozerali na jedno samostatné **rigid body — tuhé teleso**. Zistili sme, že voľné rigidné teleso pohybujúce sa v rovine má **3 degrees of freedom (DOF)**: dve nezávislé translácie a jednu rotáciu. Ak sa môže voľne pohybovať v trojrozmernom priestore, má **6 DOF**: tri translácie určujú jeho polohu a tri rotácie jeho orientáciu.

Robot sa však väčšinou neskladá z jedného telesa. Je vytvorený z viacerých pevných častí, ktoré nazývame **links — články**, a tie sú navzájom spojené pomocou **joints — kĺbov**. Práve joints rozhodujú o tom, ako sa jednotlivé links môžu voči sebe pohybovať. Zároveň však veľkú časť pohybu zakazujú.

To je pri počítaní stupňov voľnosti veľmi dôležitý pohľad. Joint nie je iba miesto, ktoré robotu „umožňuje pohyb". Mechanicky vytvára aj **constraints — obmedzenia**, ktoré určujú, aké relatívne pohyby medzi dvoma telesami možné nie sú.

Hlavná otázka tejto lekcie preto znie: **Ako zistíme, koľko nezávislých stupňov voľnosti má celý robotický mechanizmus?**

Základná myšlienka je podobná tej z predchádzajúcej lekcie. Najskôr si predstavíme, koľko voľnosti by mali jednotlivé links, keby neboli navzájom spojené. Potom zohľadníme joints a constraints, ktoré vytvárajú. To, čo po odobratí všetkých nezávislých obmedzení zostane, predstavuje **degrees of freedom celého mechanizmu**.

---

## 01. Joint pohyb umožňuje, ale zároveň ho obmedzuje

Najjednoduchším príkladom sú obyčajné dvere. Predstav si, že ešte nie sú namontované a voľne ich držíš vo vzduchu. Z mechanického pohľadu ich môžeme považovať za **spatial rigid body**, teda tuhé teleso voľne sa pohybujúce v trojrozmernom priestore.

Takéto voľné teleso má 6 DOF. Môžeme ho presúvať v troch nezávislých smeroch a zároveň ho môžeme tromi nezávislými spôsobmi otáčať. Keby teda dvere neboli k ničomu pripevnené, mohli by sme ich ľubovoľne premiestňovať aj orientovať.

Teraz ich však pomocou pántu pripevníme k stene. Ich pohyb sa dramaticky zmení. Už ich nemôžeme zdvihnúť, odsunúť od steny ani ľubovoľne nakláňať. Z pôvodných šiestich možností zostane jediná: **rotácia okolo osi pántu**.

Dvere teda po pripevnení majú **1 DOF**.

Môžeme sa na to pozrieť aj opačne. Pred pripevnením mali 6 DOF a pánt päť z nich odstránil. Mechanicky teda vytvoril **5 constraints**:

**6 pôvodných DOF - 5 constraints = 1 DOF**

Toto je jeden z najdôležitejších mentálnych modelov celej lekcie. Na joint sa môžeme pozerať z dvoch strán. Buď sa pýtame, **koľko relatívnych pohybov povoľuje**, alebo koľko z pôvodnej voľnosti **zakazuje**. Pri pánte môžeme povedať, že povoľuje 1 DOF, alebo že vytvára 5 constraints. Obe tvrdenia opisujú presne ten istý mechanický vzťah.

---

## 02. Nie každý mechanizmus musíme analyzovať v plnom 3D priestore

Dvere sú fyzicky trojrozmerný objekt, ale pri ich bežnom otváraní nemusíme analyzovať všetkých šesť možností pohybu. Ak sa na ne pozrieme zhora, ich pohyb môžeme modelovať ako pohyb v jednej rovine.

V takom prípade používame **planar model**. Voľné planar rigid body má 3 DOF: dve translácie a jednu rotáciu. Keď ho pripevníme pántom, obe translácie sa stanú nemožnými a zostane iba rotácia.

Dostaneme teda:

**3 pôvodné DOF - 2 constraints = 1 DOF**

Výsledok je rovnaký ako pri spatial modeli, len sme si problém zjednodušili tým, že sme od začiatku uvažovali iba pohyb relevantný pre daný mechanizmus.

To je v robotike veľmi užitočné. Ak sa všetky links a joints pohybujú v jednej rovine, nemusíme systém automaticky opisovať ako všeobecný 3D mechanizmus. Môžeme použiť planar model, pri ktorom má každé voľné rigid body 3 DOF. Pri všeobecnom pohybe v priestore používame spatial model, kde má voľné rigid body 6 DOF.

Výber správneho modelu je preto prvým krokom pred samotným počítaním.

---

## 03. Robot je systém links a joints

Predstav si jednoduché robotické rameno. Začína pevnou základňou, na ktorú je pripojený prvý pohyblivý segment. Za ním nasleduje ďalší joint, ďalší link a na konci môže byť napríklad gripper.

Pevné časti mechanizmu nazývame **links**. Každý link modelujeme ako rigid body. Nemusí pritom vyzerať ako jednoduchá tyč. Môže mať zložitý tvar, môže obsahovať motor, prevodovku, senzory alebo vnútornú elektroniku. Z pohľadu kinematiky je podstatné iba to, že sa jeho geometria pri pohybe nemení.

Miesta, ktoré spájajú dva links a povoľujú medzi nimi určitý relatívny pohyb, nazývame **joints**.

Ak by sme links robota od seba oddelili, každý by mal vlastnú voľnosť pohybu. Keď ich však spojíme pomocou joints, ich configurations už nemôžeme voliť nezávisle. Jeden link sa môže voči druhému pohybovať iba spôsobom, ktorý daný joint mechanicky povoľuje.

Robot preto nie je iba zbierka tuhých telies. Je to **systém rigid bodies, ktorých pohyb je navzájom previazaný pomocou joints a constraints**.

A práve preto počet links sám osebe nestačí na určenie DOF. Rovnako nestačí iba počet joints. Musíme poznať typ jednotlivých joints aj spôsob, akým je celý mechanizmus poskladaný.

---

## 04. Jeden joint spája dve telesá

Pri matematickom modelovaní budeme používať dôležitú konvenciu: **jeden joint spája presne dva links**.

Pri jednoduchom robotickom ramene je to prirodzené. Jeden link je rotačným alebo posuvným jointom pripojený k druhému.

Pri zložitejšom mechanizme však môže byť fyzická situácia menej jednoznačná. Predstav si napríklad jeden čap, na ktorom sú súčasne uložené tri links. Na fotografii alebo technickom výkrese môže celé spojenie vyzerať ako jeden joint.

Pri mechanickom modeli ho však musíme rozložiť na spojenia medzi dvojicami telies. Môže teda ísť napríklad o **dva revolute joints umiestnené na rovnakom fyzickom mieste**.

Prečo na tom záleží? Pretože neskôr budeme pri Grüblerovej formule explicitne počítať links aj joints. Ak fyzickú konštrukciu nesprávne preložíme do mechanického modelu, dostaneme nesprávny výsledok bez ohľadu na to, či samotnú formulu použijeme správne.

Pred akýmkoľvek výpočtom DOF si preto najskôr musíme správne odpovedať na dve otázky: **Koľko rigid links mechanizmus obsahuje a ktoré dvojice links spájajú jednotlivé joints?**

---

## 05. Revolute joint – rotačný kĺb

Jedným z najbežnejších jointov v robotike je **revolute joint**, označovaný písmenom **R**.

Najjednoduchším príkladom je opäť pánt dverí. Dve telesá sú spojené tak, že sa môžu voči sebe otáčať okolo jednej určenej osi. Ich vzájomná configuration sa preto dá opísať jediným uhlom.

Revolute joint má teda:

**1 DOF**

![Základné typy robotických kĺbov](/book/ch2/fig2-3.png)

Dôležité je, že rotácia v jednom a opačnom smere nie sú dva rôzne DOF. Uhol sa môže zväčšovať alebo zmenšovať, ale stále ide o jednu nezávislú configuration variable.

Pri spatial mechanisme by dve úplne voľné telesá mohli mať voči sebe 6 relatívnych DOF. Revolute joint z tejto voľnosti ponechá iba jednu rotáciu a päť ostatných možností pohybu zakáže.

Preto má:

**1 freedom + 5 constraints**

Revolute joint je typický pre ramená priemyselných robotov, rotačné mechanizmy alebo humanoidné joints, kde chceme pohyb približne podobný pántu.

---

## 06. Prismatic joint – posuvný kĺb

Druhým základným typom je **prismatic joint**, označovaný písmenom **P**.

Dobrou predstavou je zásuvka. Môžeme ju vysúvať a zasúvať po vodiacej koľajnici, ale nemôžeme ju pritom ľubovoľne otáčať alebo posúvať do strán.

Prismatic joint povoľuje presne tento typ pohybu: **transláciu pozdĺž jednej určenej osi**.

Jeho configuration môžeme opísať jednou vzdialenosťou, napríklad tým, o koľko je mechanizmus vysunutý.

Preto má:

**1 DOF**

Rovnako ako pri revolute jointe ani pohyb dopredu a dozadu nepredstavuje dva DOF. Obe možnosti sú iba dva smery zmeny jednej a tej istej hodnoty.

V spatial mechanisme prismatic joint ponecháva zo šiestich možných relatívnych pohybov jednu transláciu a zvyšných päť zakazuje. Aj on preto vytvára **5 constraints**.

Revolute a prismatic joint majú rovnaký počet DOF. Rozdiel je v tom, **aký druh pohybu povoľujú**.

---

## 07. Helical joint – rotácia aj translácia, ale stále iba 1 DOF

**Helical joint**, označovaný **H**, je veľmi dobrým príkladom toho, prečo DOF nemôžeme určovať iba podľa počtu pohybov, ktoré na mechanizme vizuálne vidíme.

Predstav si obyčajnú skrutku pohybujúcu sa v závite. Keď ju otáčame, zároveň sa posúva pozdĺž svojej osi. Vidíme teda rotáciu aj transláciu.

Mohli by sme preto intuitívne povedať, že má 2 DOF.

To by však nebolo správne.

Rotácia a translácia totiž nie sú nezávislé. Ak poznáme stúpanie závitu a vieme, o koľko sme skrutku otočili, jej posun je automaticky určený.

Ak napríklad jedna celá otáčka posunie skrutku o 2 mm, polovica otáčky ju posunie o 1 mm. Nemôžeme ľubovoľne zvoliť uhol otočenia a potom úplne nezávisle určiť posun.

Na configuration helical jointu preto stačí jedna nezávislá hodnota.

Má:

**1 DOF**

Helical joint nám veľmi pekne pripomína presnú definíciu DOF: **nezaujíma nás počet typov pohybu, ale počet nezávislých parametrov potrebných na opis configuration**.

---

## 08. Cylindrical joint – podobný pohyb, ale tentoraz 2 DOF

**Cylindrical joint**, označovaný **C**, na prvý pohľad pripomína helical joint. Aj on umožňuje rotáciu okolo osi a transláciu pozdĺž tej istej osi.

Rozdiel spočíva v nezávislosti pohybov.

Pri cylindrical jointe môžeme teleso posunúť bez toho, aby sme ho otočili. Môžeme ho otočiť bez toho, aby sme ho posunuli. A môžeme samozrejme vykonať aj obe zmeny naraz.

Potrebujeme preto dve configuration variables: jednu pre transláciu a jednu pre rotáciu.

Cylindrical joint má:

**2 DOF**

V spatial mechanisme zo šiestich možných relatívnych freedoms ponechá dva a štyri odstráni. Preto vytvára **4 constraints**.

Porovnanie helical a cylindrical jointu je veľmi dôležité. Oba dokážu vykonávať rotáciu aj transláciu, ale pri helical jointe sú tieto pohyby mechanicky previazané, zatiaľ čo pri cylindrical jointe sú nezávislé.

Preto:

**helical → 1 DOF**

**cylindrical → 2 DOF**

---

## 09. Universal joint – dve nezávislé rotácie

**Universal joint**, označovaný písmenom **U**, povoľuje dve nezávislé rotácie.

Môžeme si ho predstaviť ako dve rotačné osi usporiadané tak, že sú typicky navzájom kolmé. Jedno teleso sa teda môže voči druhému natáčať v dvoch nezávislých smeroch.

Na úplné určenie configuration potrebujeme dva uhly.

Universal joint preto má:

**2 DOF**

Je zaujímavé porovnať ho s cylindrical jointom. Oba majú dva stupne voľnosti, ale ich pohyb je úplne odlišný. Cylindrical joint povoľuje jednu transláciu a jednu rotáciu, zatiaľ čo universal joint povoľuje dve rotácie.

Rovnaký počet DOF teda vôbec neznamená rovnaké mechanické správanie.

V spatial mechanisme universal joint ponecháva dva relatívne DOF a štyri zakazuje, takže vytvára **4 constraints**.

---

## 10. Spherical joint – tri rotačné DOF

**Spherical joint**, označovaný písmenom **S**, poznáme aj ako **ball-and-socket joint**.

Intuitívne si ho môžeme predstaviť ako guľový kĺb. Jeden bod dvoch telies zostáva spojený, ale ich vzájomná orientation sa môže meniť v troch nezávislých rotačných smeroch.

Spherical joint preto povoľuje tri rotácie, ale žiadnu nezávislú transláciu.

Má:

**3 DOF**

Keďže v spatial mechanisme existuje medzi dvoma voľnými rigid bodies maximálne šesť relatívnych DOF, spherical joint ponechá tri a ďalšie tri zakáže.

Vytvára teda:

**3 constraints**

Aj tu je dôležité nečítať „3 DOF" iba ako „joint sa môže veľa otáčať". Znamená to presne to, že na úplný opis jeho relatívnej orientation potrebujeme tri nezávislé rotačné parametre.

---

## 11. Freedoms a constraints opisujú ten istý joint z dvoch strán

Teraz už môžeme jednotlivé joints spojiť do jedného všeobecného pravidla.

Pri spatial mechanisme existuje medzi dvoma úplne voľnými rigid bodies 6 relatívnych DOF. Joint určitú časť tejto voľnosti ponechá a zvyšok odstráni.

Preto pre spatial joint platí:

**freedoms jointu + constraints jointu = 6**

Revolute, prismatic aj helical joint majú po 1 DOF, takže každý vytvára 5 constraints. Cylindrical a universal joint majú 2 DOF a vytvárajú 4 constraints. Spherical joint má 3 DOF a vytvára 3 constraints.

Pri planar mechanisme používame rovnakú logiku, iba základným číslom nie je 6, ale **3**, pretože voľné planar rigid body má tri stupne voľnosti.

Toto pravidlo nás pripravuje na systematické počítanie stupňov voľnosti celého robota.

---

## 12. Ground sa pri počítaní považuje za link

Pred samotným výpočtom potrebujeme ešte jednu konvenciu: **ground sa počíta ako jeden z links**.

Ground nemusí byť doslova zem. Znamená pevné teleso, voči ktorému opisujeme pohyb mechanizmu.

Ak je robotické rameno pripevnené k pevnej základni, základňa je ground. Prvý pohyblivý link je s ňou spojený jointom, ďalší link s predchádzajúcim a podobne.

Dôvod, prečo ground počítame ako link, vyplýva z našej definície jointu. Joint vždy spája dve telesá. Aj prvý pohyblivý link teda musí byť pripojený k druhému telesu — a tým je ground.

Ground však sám mechanizmu nepridáva žiadnu voľnosť, pretože ho definujeme ako pevný.

Ak má preto mechanizmus celkovo N links vrátane ground, pohyblivých links je:

**N - 1**

Práve tento výraz sa objaví v Grüblerovej formule.

---

## 13. Grüblerova formula

Pri jednoduchom serial robotovi často stačí spočítať jednotlivé joint freedoms. Pri komplikovanejších mechanizmoch, najmä pri uzavretých slučkách, to však už nemusí fungovať.

Na systematické počítanie používame **Grüblerovu formulu**.

Označme si:

**N** — počet links vrátane ground,

**J** — počet joints,

**m** — počet DOF jedného voľného rigid body v danom modeli,

**fi** — počet freedoms konkrétneho jointu i.

Pre planar mechanism používame:

**m = 3**

Pre spatial mechanism:

**m = 6**

Grüblerova formula má tvar:

**DOF = m(N - 1 - J) + suma fi**

Symbol suma znamená, že spočítame freedoms všetkých joints.

Formula môže na prvý pohľad pôsobiť komplikovane, ale jej logika je v skutočnosti veľmi jednoduchá. Je iba matematickým zápisom myšlienky, ktorú používame od začiatku tejto lekcie: **najskôr spočítame všetku možnú voľnosť a potom odoberieme constraints vytvorené joints**.

---

## 14. Odkiaľ Grüblerova formula vzniká

Predstav si mechanizmus s N links vrátane ground. Keďže ground sa nepohybuje, zostáva N - 1 pohyblivých links.

Ak by neboli nijako spojené, každý z nich by sa mohol pohybovať ako samostatné voľné rigid body a mal by m DOF. Celková počiatočná voľnosť by teda bola:

**m(N - 1)**

Teraz medzi links pridáme joints.

Každý joint určitú časť relatívnej voľnosti ponechá. Ak má joint fi DOF, potom zo všetkých m relatívnych možností pohybu zakazuje:

**m - fi**

To je počet constraints vytvorených daným jointom.

Od celkovej počiatočnej voľnosti všetkých links teda odpočítame constraints všetkých joints. Po algebraickej úprave dostaneme:

**DOF = m(N - 1 - J) + suma fi**

Grüblerovu formulu preto nemusíme chápať ako vzorec, ktorý sa treba naspamäť naučiť bez súvislostí. Je to iba kompaktný zápis princípu:

**voľnosť samostatných telies - obmedzenia vytvorené joints = voľnosť mechanizmu**

---

## 15. Open-chain robot – jednoduchý prípad

Jedným zo základných typov robotov je **open-chain mechanism**, často nazývaný aj **serial mechanism**.

Predstav si klasické priemyselné robotické rameno. Začína na ground. Nasleduje joint, link, ďalší joint, ďalší link a tak ďalej až po end-effector. Nikde sa nevytvorí uzavretá mechanická slučka.

Ak sú joints nezávislé, počet DOF takéhoto mechanizmu býva jednoducho súčtom ich jednotlivých freedoms.

Planar robotické rameno s tromi revolute joints má:

**1 + 1 + 1 = 3 DOF**

Serial robot so šiestimi nezávislými jedno-DOF joints má typicky:

**6 DOF**

Práve preto je šesť jointov veľmi časté pri priemyselných manipulátoroch. Šesť vhodne usporiadaných nezávislých freedoms môže umožniť end-effectoru kontrolovať všeobecnú position aj orientation v 3D priestore.

---

## 16. kR serial robot

Všeobecným príkladom je **kR robot**. Písmeno R znamená revolute joint a k označuje počet takýchto joints.

![Sériový reťazec, päťkĺbový a šesťkĺbové mechanizmy](/book/ch2/fig2-5.png)

Ak má robot k nezávislých revolute joints a každý z nich má 1 DOF, intuitívne očakávame:

**DOF = k**

Rovnaký výsledok môžeme overiť Grüblerovou formulou. Robot má k pohyblivých links a jeden ground, takže N = k + 1. Počet joints je J = k. Pri planar modeli je m = 3 a každý joint má f = 1.

Po dosadení dostaneme opäť:

**DOF = k**

Tento príklad je dobrým testom, že formula sa pri jednoduchom open-chain robotovi správa presne tak, ako očakávame.

---

## 17. Closed-chain mechanism

Pri **closed-chain mechanism** vzniká aspoň jedna uzavretá mechanická slučka.

Predstav si, že začneš na ground, prejdeš cez sériu links a joints a inou cestou sa nakoniec vrátiš späť na ground. Takéto uzavretie vytvára ďalšie geometrické constraints.

Pri open chain môžeme jednotlivé joint coordinates často meniť nezávisle. Pri closed chain to už nemusí platiť. Keď sa zmení jeden joint, ostatné sa musia prispôsobiť tak, aby mechanická slučka zostala uzavretá.

Dobrým intuitívnym príkladom je človek stojaci oboma nohami na zemi. Môžeme sledovať cestu od ground cez jednu nohu, panvu a druhú nohu späť na ground. Vznikne closed chain. Keď jednu nohu zdvihneme, slučka sa otvorí.

Práve pri closed-chain mechanisms je veľmi dobre vidieť, prečo **počet joints nie je to isté ako počet DOF**.

---

## 18. Four-bar linkage – štyri joints a jeden DOF

Klasickým príkladom je **four-bar linkage**.

![Four-bar linkage a slider-crank mechanism](/book/ch2/fig2-4.png)

Ide o planar mechanism so štyrmi links vrátane ground a štyrmi revolute joints, ktoré vytvárajú uzavretú slučku.

Máme teda N = 4, J = 4, m = 3 a každý joint má f = 1.

Po použití Grüblerovej formule dostaneme:

**DOF = 1**

Mechanizmus teda obsahuje štyri jedno-DOF joints, ale celý systém má iba jeden nezávislý stupeň voľnosti.

Dôvodom je closed loop. Joint angles sa nemôžu meniť nezávisle. Keď zmeníme jeden z nich, ostatné sa musia geometricky prispôsobiť tak, aby všetky links zostali spojené.

Jedna nezávislá hodnota preto za bežných podmienok stačí na určenie configuration celého four-bar linkage.

---

## 19. Slider-crank mechanism

Ďalším klasickým closed-chain mechanizmom je **slider-crank**.

Tento mechanizmus premieňa rotačný pohyb na lineárny alebo naopak. Jeho princíp poznáme napríklad z piestového mechanizmu spaľovacieho motora.

V typickom planar modeli máme štyri links vrátane ground a štyri jedno-DOF joints: tri revolute a jeden prismatic.

Grüblerova formula dá:

**DOF = 1**

Ak poznáme napríklad uhol cranku, poloha slidera už nie je ďalšou nezávislou hodnotou. Je určená geometriou mechanizmu.

Slider sa teda fyzicky pohybuje, ale tento pohyb nepridáva ďalší DOF, pretože je previazaný s pohybom ostatných links.

---

## 20. Five-bar linkage a zložitejšie planar mechanisms

Pri **five-bar linkage** máme päť links vrátane ground a päť revolute joints. Grüblerova formula v bežnom prípade dá:

**DOF = 2**

Configuration takéhoto mechanizmu potrebuje dve nezávislé hodnoty.

Pri mechanizmoch ako **Stephenson six-bar linkage** alebo **Watt six-bar linkage** môžeme mať ešte viac links a joints, ale výsledný počet DOF môže zostať iba jeden.

To je veľmi dôležitá lekcia. Zložitosť mechanizmu sa nedá odhadovať podľa toho, koľko pohyblivých častí vidíme. Veľké množstvo links môže byť pomocou constraints previazané tak silno, že celý systém má iba jeden nezávislý pohyb.

---

## 21. Viac joints môže byť na jednom fyzickom mieste

![Mechanizmus s prekrývajúcimi sa kĺbmi](/book/ch2/fig2-6.png)

Pri komplikovanejších linkages je dôležité správne počítať joints.

Ak sa na jednom čape stretávajú napríklad tri links, vizuálne môžu pôsobiť ako jeden spoločný joint. V mechanickom modeli však jeden joint spája iba dve telesá.

Takéto spojenie preto môže predstavovať dva samostatné revolute joints uložené na rovnakom fyzickom mieste.

Táto konvencia je pri Grüblerovej formule zásadná. Formula pracuje iba s modelom, ktorý jej zadáme. Ak nesprávne rozdelíme mechanizmus na links a joints, výsledok nebude opisovať skutočný systém.

Pred samotným počítaním teda vždy najskôr musíme správne vytvoriť **kinematic model**.

---

## 22. Grüblerova formula má svoje predpoklady

Mohlo by sa zdať, že Grüblerova formula vyriešila celý problém. Spočítame links, joints, ich freedoms a výsledok máme.

V skutočnosti má však formula dôležitý predpoklad: **constraints vytvorené joints musia byť nezávislé**.

Ak dva rôzne constraints v skutočnosti zakazujú tú istú možnosť pohybu, druhý už systému neodoberá ďalší DOF. Hovoríme, že je **redundantný**.

Ak by sme ho napriek tomu pri výpočte odpočítali ako úplne nové obmedzenie, odobrali by sme príliš veľa voľnosti a formula by dala príliš nízky počet DOF.

Preto Grüblerova formula nie je náhradou za pochopenie geometrie mechanizmu. Je veľmi užitočná, ale jej výsledok treba interpretovať v kontexte jej predpokladov.

---

## 23. Parallelogram linkage a redundant constraints

![Paralelogramový mechanizmus a singulárna konfigurácia](/book/ch2/fig2-7.png)

Príkladom je **parallelogram linkage**.

Pri určitom mechanickom modeli môže jednoduché použitie Grüblerovej formule viesť k výsledku:

**DOF = 0**

Nula by znamenala, že mechanizmus je rigidná konštrukcia a nedokáže sa pohybovať.

V skutočnosti však vidíme, že parallelogram mechanism sa pohybovať môže a má:

**1 DOF**

Problémom nie je samotná matematika formule, ale to, že niektoré constraints nie sú nezávislé. Časť obmedzení iba opakuje informáciu, ktorá už vyplýva z ostatných väzieb.

Pri mechanickom počítaní sme ich teda odpočítali viackrát.

Tento príklad ukazuje, prečo musíme pri DOF rozumieť nielen formule, ale aj samotnému mechanizmu.

---

## 24. Singular configuration

S nezávislosťou constraints súvisí ďalší dôležitý pojem: **singular configuration**.

Mechanizmus môže mať vo väčšine configurations určitý počet DOF a constraints môžu byť normálne nezávislé. V jednej špeciálnej geometrickej polohe sa však niektoré links môžu zarovnať alebo prekryť.

Vtedy môžu constraints dočasne stratiť nezávislosť.

Mechanizmus sa tak môže v tejto konkrétnej configuration správať inak než vo väčšine svojho configuration space. Môže napríklad dočasne získať pohyb, ktorý inde nemá, alebo naopak stratiť schopnosť vytvárať určitý pohyb alebo silu.

Takéto configurations nazývame **singularities**.

Singularity budú neskôr v robotike veľmi dôležité, pretože ovplyvňujú kinematiku, velocities, forces aj riadenie robota.

---

## 25. Delta robot a internal degrees of freedom

![Delta robot](/book/ch2/fig2-8.png)

Zaujímavým príkladom zložitého closed-chain mechanizmu je **Delta robot**.

Má pevnú hornú základňu a pohyblivú pracovnú platformu, ktoré sú prepojené tromi ramenami. Súčasťou jednotlivých ramien bývajú parallelogram mechanisms.

Keď analyzujeme celý mechanický model vrátane všetkých links a joints, môžu sa objaviť **internal degrees of freedom — vnútorné stupne voľnosti**.

To znamená, že niektoré links sa môžu určitým spôsobom pohybovať bez toho, aby tým menili požadovanú position end-effectora.

Napríklad určitá tyč sa môže voľne otáčať okolo vlastnej pozdĺžnej osi. Z pohľadu celého mechanického modelu ide o skutočný DOF, ale pracovná platforma sa vďaka nemu nemusí posunúť ani otočiť.

Tento príklad nás učí veľmi dôležité rozlíšenie:

**DOF celého mechanizmu nemusí byť rovnaký ako DOF end-effectora.**

Robot môže obsahovať vnútorné pohyby, ktoré sa na výslednom task-space pohybe priamo neprejavia.

---

## 26. Stewart-Gough platform

Ďalším známym parallel closed-chain robotom je **Stewart-Gough platform**.

Pozostáva z pevnej spodnej platformy a pohyblivej hornej platformy, ktoré sú spojené šiestimi nastaviteľnými nohami.

Jedna bežná konštrukcia používa v každej nohe kombináciu:

**universal joint → prismatic joint → spherical joint**

skrátene **UPS**.

Pri vhodnom usporiadaní má pohyblivá platforma:

**6 DOF**

To znamená, že môže meniť všetky tri zložky position a všetky tri zložky orientation.

Stewart-Gough platform je preto vhodná napríklad pre motion simulators. Horná platforma sa môže zdvíhať, posúvať aj nakláňať a vytvárať tak pohyb podobný jazde autom alebo letu lietadla.

Parallel structure má zároveň mechanickú výhodu v tom, že zaťaženie platformy môže byť rozdelené medzi viacero nôh. Nevýhodou býva komplikovanejšia kinematika a často menší workspace než pri serial manipulátore.

---

## 27. Viac DOF v mechanizme neznamená viac DOF platformy

Ak pri Stewart-Gough platforme zmeníme typ niektorých joints, môžeme pridať ďalšie vnútorné freedoms.

To však automaticky neznamená, že horná platforma získala nové možnosti pohybu. Dodatočný DOF môže napríklad umožniť nohe rotovať okolo vlastnej osi bez toho, aby sa zmenila pose platformy.

Opäť teda platí:

**DOF mechanizmu ≠ automaticky DOF end-effectora**

Pri jednoduchom serial robotovi sa tieto čísla často zhodujú. Pri parallel alebo closed-chain mechanisms však môžu byť veľmi rozdielne.

To je jeden z dôvodov, prečo neskôr budeme rozlišovať medzi **configuration space** a **task space**.

---

## 28. Open chain a closed chain

Teraz môžeme oba základné typy mechanizmov postaviť vedľa seba.

Pri **open-chain robotovi** nevzniká uzavretá mechanická slučka. Ak sú joints nezávislé, počet DOF sa často rovná jednoduchému súčtu freedoms jednotlivých joints. Robot so šiestimi jedno-DOF joints tak môže mať 6 DOF.

Pri **closed-chain mechanism** slučky vytvárajú ďalšie geometrické constraints. Jednotlivé joint coordinates preto už nemusia byť nezávislé.

Four-bar linkage môže mať štyri jedno-DOF joints, ale iba 1 DOF mechanizmu. Five-bar linkage môže mať päť jedno-DOF joints, ale len 2 DOF.

Closed-chain analysis je preto náročnejšia. Nestačí iba spočítať joints. Musíme chápať constraints vytvorené ich vzájomným prepojením.

---

## 29. DOF nie je počet motorov

Nakoniec je veľmi dôležité oddeliť **degrees of freedom** od **actuation**.

DOF je mechanická vlastnosť systému. Hovorí, koľko nezávislých configuration variables potrebujeme na úplné určenie jeho configuration.

Actuator je zariadenie, ktoré mechanizmus poháňa — napríklad elektromotor alebo hydraulický valec.

Pri jednoduchom serial robotovi môže mať každý joint vlastný motor. Šesť jedno-DOF joints tak môže znamenať 6 DOF a zároveň šesť motorov.

Nie je to však všeobecné pravidlo.

Pri closed-chain mechanism môžu byť niektoré joints **passive**. Nemajú vlastný actuator a pohybujú sa iba preto, že ich k pohybu prinúti zvyšok mechanizmu.

Preto sa pri počítaní DOF nepýtame, koľko motorov robot má. Pýtame sa:

**Koľko nezávislých hodnôt potrebujem na úplné určenie configuration mechanizmu?**

---

## 30. Najdôležitejší spôsob uvažovania

Celá táto lekcia sa dá zhrnúť do jedného spôsobu premýšľania.

Najskôr si predstavíme všetky links ako úplne samostatné rigid bodies. Každé by malo určitú voľnosť — 3 DOF pri planar modeli alebo 6 DOF pri spatial modeli.

Potom medzi ne pridáme joints. Každý joint určité relatívne pohyby ponechá, ale iné odstráni. Vzniknú constraints, ktoré pohyb jednotlivých links navzájom previažu.

Po odpočítaní všetkých **nezávislých** constraints zostane skutočný počet nezávislých configuration variables.

To je **degree of freedom mechanizmu**.

Grüblerova formula je iba matematickým spôsobom, ako tento proces systematicky vykonať.

Najdôležitejší mentálny model teda je:

**voľné rigid bodies → pridáme joints → joints vytvoria constraints → zostanú DOF mechanizmu**

---

## Zhrnutie lekcie

Robot môžeme mechanicky modelovať ako systém **rigid links spojených joints**. Každý joint určitý relatívny pohyb povoľuje a zároveň ostatné možnosti pohybu zakazuje. Pri počítaní DOF preto môžeme pracovať buď s freedoms, ktoré joint ponecháva, alebo s constraints, ktoré vytvára.

Medzi základné joints patrí **revolute joint (R)** s 1 DOF, **prismatic joint (P)** s 1 DOF a **helical joint (H)** s 1 DOF. Helical joint síce vykonáva rotáciu aj transláciu, ale tieto pohyby sú mechanicky previazané a nie sú nezávislé.

**Cylindrical joint (C)** má 2 DOF, pretože jeho rotáciu a transláciu môžeme meniť nezávisle. **Universal joint (U)** má tiež 2 DOF, ale ide o dve nezávislé rotácie. **Spherical joint (S)** má 3 rotačné DOF.

Pri spatial mechanisme môže medzi dvoma voľnými rigid bodies existovať 6 relatívnych DOF. Ak joint ponechá f freedoms, zvyšných 6 - f predstavuje jeho constraints. Pri planar mechanisme používame rovnakú logiku so základnými 3 DOF.

Pri počítaní links zároveň nezabúdame, že **ground sa počíta ako link**, hoci sa nepohybuje. Ak máme N links vrátane ground, pohyblivých je N - 1.

Na systematické určenie DOF môžeme použiť **Grüblerovu formulu**:

**DOF = m(N - 1 - J) + suma fi**

Hodnota m je 3 pre planar mechanism a 6 pre spatial mechanism. N je počet links vrátane ground, J počet joints a fi počet freedoms jednotlivých joints.

Formula vychádza z jednoduchého princípu: najskôr spočítame voľnosť všetkých samostatných links a potom odpočítame constraints vytvorené joints.

Pri **open-chain mechanisms** sa počet DOF pri nezávislých joints často rovná súčtu ich freedoms. Pri **closed-chain mechanisms** však uzavreté slučky vytvárajú ďalšie geometrické väzby. Preto four-bar linkage môže mať štyri revolute joints, ale iba 1 DOF, a five-bar linkage môže mať päť jedno-DOF joints, ale iba 2 DOF.

Grüblerovu formulu však nemožno používať úplne mechanicky. Predpokladá, že constraints sú nezávislé. Pri **redundant constraints** môže formula odpočítať príliš veľa voľnosti. V špeciálnych **singular configurations** sa môže nezávislosť constraints meniť a mechanizmus sa môže lokálne správať inak než v bežných configurations.

Pri zložitejších robots zároveň rozlišujeme **DOF celého mechanizmu** a **DOF end-effectora**. Robot môže obsahovať internal degrees of freedom, ktoré nemenia výslednú pose pracovnej platformy.

Napokon, DOF nesmieme zamieňať s počtom actuatorov. **DOF opisuje mechanickú voľnosť. Actuator mechanizmus poháňa.** Passive joints sa môžu pohybovať aj bez vlastného motora.

Ak si z tejto lekcie odnesieš jednu hlavnú myšlienku, nech je to táto:

**Počet stupňov voľnosti robota nevzniká jednoduchým spočítaním jeho kĺbov. Vzniká z toho, koľko voľnosti majú jeho telesá a koľko z tejto voľnosti im vzájomné mechanické constraints odoberú.**`;
