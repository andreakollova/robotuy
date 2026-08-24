// Chapter 1 Preview - Lesson: Veľký obraz modernej robotiky
// Full lesson content - DO NOT SHORTEN

export const ch1PreviewContent = `# Lekcia 1: Veľký obraz modernej robotiky

Robotika je relatívne mladý vedný odbor, no jej ciele sú mimoriadne ambiciózne. V najširšom zmysle sa snažíme vytvárať stroje, ktoré sa dokážu pohybovať vo fyzickom svete, vnímať svoje okolie, manipulovať s predmetmi, reagovať na zmeny a vykonávať čoraz zložitejšie úlohy. Konečná predstava inteligentného robota prirodzene pripomína človeka, a preto nás štúdium robotiky často vedie späť k otázkam o nás samých.

Keď chceme navrhnúť robotickú ruku, začneme premýšľať nad tým, prečo je ľudská ruka zostavená práve z ramena, lakťa, predlaktia a zápästia. Keď chceme, aby robot niečo uchopil, musíme riešiť, ako koordinovať viacero kĺbov naraz, ako určiť vhodnú silu úchopu a ako reagovať, ak predmet nie je presne tam, kde sme ho očakávali. Robotika preto nie je iba o stavbe strojov. Je zároveň štúdiom pohybu, mechaniky, rozhodovania a interakcie s fyzickým svetom.

Modern Robotics sa sústreďuje najmä na tri veľké oblasti: mechaniku, plánovanie pohybu a riadenie. Mechanika nám pomáha pochopiť, ako je robot zostavený a aké pohyby mu jeho konštrukcia umožňuje. Plánovanie rieši, akým spôsobom sa má robot dostať zo súčasného stavu do požadovaného stavu. Riadenie potom zabezpečuje, aby robot tento plánovaný pohyb naozaj vykonal.

Celý kurz si môžeš predstaviť ako postupné budovanie odpovede na jednu veľkú otázku: Ako presne opísať robota, naplánovať jeho pohyb a následne ho prinútiť, aby tento pohyb bezpečne a presne vykonal v skutočnom svete?

---

## 01. Robot je mechanický systém

Keď sa povie robot, veľa ľudí si ako prvé predstaví umelú inteligenciu alebo software. Robot však má jednu vlastnosť, ktorá ho od bežného programu zásadne odlišuje: má fyzické telo a pôsobí na fyzický svet.

Ak robotické rameno zdvíha krabicu, musí vytvoriť skutočnú silu. Ak mobilný robot prechádza miestnosťou, jeho kolesá sa musia fyzicky otáčať a prenášať silu na podlahu. Ak robot zvára, jeho nástroj musí byť na správnom mieste, v správnej orientácii a musí sledovať správnu trajektóriu.

Základný robotický mechanizmus môžeme opísať pomocou dvoch hlavných častí: linkov a kĺbov.

Link je pevná mechanická časť robota. Pri robotickom ramene môže byť jedným linkom napríklad segment medzi ramenom a lakťom a ďalším segment medzi lakťom a zápästím.

Kĺb, po anglicky joint, spája dva linky a určuje, akým spôsobom sa môžu pohybovať jeden vzhľadom na druhý. Niektorý kĺb môže umožňovať otáčanie, iný lineárny posun a ďalší môže umožňovať viacero druhov pohybu.

Samotný kĺb však robot nerozhýbe. Na to potrebujeme pohon, po anglicky actuator. Najčastejšie ide o elektrický motor, no roboty môžu používať aj hydraulické alebo pneumatické pohony.

Je dôležité rozlišovať medzi kĺbom a pohonom. Kĺb určuje, aký pohyb je mechanicky možný. Pohon vytvára silu alebo krútiaci moment, ktorý tento pohyb spôsobí.

Na konci robotického ramena sa často nachádza end-effector, teda koncový pracovný člen. Môže to byť napríklad chápadlo, zváracia hlavica, skrutkovač, kamera, prísavka alebo chirurgický nástroj. Je to časť robota, ktorá priamo vykonáva úlohu.

---

## 02. Prečo modelujeme linky ako tuhé telesá

Skutočný robot nie je dokonale tuhý. Kovové časti sa môžu pri veľkom zaťažení mierne deformovať, prevody môžu mať vôľu a v kĺboch vzniká trenie. Ak by sme však od začiatku modelovali každý takýto efekt, matematický opis robota by bol zbytočne komplikovaný.

Preto sa pri základnom štúdiu robotiky používa dôležité zjednodušenie: linky robota považujeme za tuhé telesá.

Tuhé teleso, po anglicky rigid body, je idealizované teleso, ktorého tvar sa počas pohybu nemení. Ak si na takom telese vyberieme dva ľubovoľné body, ich vzájomná vzdialenosť zostáva stále rovnaká.

Predstav si pevnú kovovú tyč dlhú 50 centimetrov. Môžeš ju presunúť, otočiť alebo zdvihnúť. Oba jej konce sa pri tom môžu nachádzať na úplne iných miestach ako predtým, ale ich vzájomná vzdialenosť zostane 50 centimetrov.

Práve to nám umožňuje robot veľmi výrazne zjednodušiť. Nemusíme sledovať polohu každého bodu na každom linku. Stačí nám poznať polohu a orientáciu celého tuhého telesa a z nich vieme odvodiť polohu všetkých jeho ostatných bodov.

Táto myšlienka bude základom ďalších tém, najmä konfigurácie robota, stupňov voľnosti a pohybu tuhých telies.

---

## 03. Open-chain roboty

Jednou z najbežnejších konštrukcií je open-chain mechanism, teda otvorený kinematický reťazec.

Typickým príkladom je priemyselné robotické rameno. Začíname pevnou základňou, z nej pokračujeme cez kĺb na prvý link, z neho cez ďalší kĺb na ďalší link a tak ďalej, až sa dostaneme k end-effectoru.

Ak ideš od základne smerom ku koncu robota, mechanická reťaz sa nikde nevracia späť a nevytvára slučku. Preto sa nazýva otvorená.

Takéto roboty sú veľmi rozšírené najmä preto, že ich pohyb sa dá relatívne prehľadne analyzovať. Pri klasickom sériovom manipulátore je každý kĺb zvyčajne ovládaný vlastným pohonom. Hodnoty jednotlivých kĺbov potom spoločne určujú konfiguráciu celého robota.

Keď sa neskôr budeme venovať forward kinematics, práve pri open-chain robotovi budeme riešiť otázku: Ak poznáme všetky uhly alebo posuny kĺbov, kde sa nachádza end-effector?

---

## 04. Closed-chain roboty

Nie všetky roboty sú otvorené reťazce. Niektoré obsahujú uzavreté mechanické slučky, a preto ich nazývame closed-chain mechanisms.

Typickým príkladom je Stewart–Gough platform. Pozostáva zo spodnej pevnej platformy a hornej pohyblivej platformy, ktoré sú prepojené viacerými nohami.

Ak začneš na spodnej platforme, prejdeš jednou nohou na hornú platformu a potom inou nohou späť na spodnú, vytvoríš uzavretú slučku.

Toto má významný dôsledok. V open-chain robotovi sa môžu jednotlivé kĺby často meniť pomerne nezávisle. V closed-chain mechanizme sú však jednotlivé časti navzájom geometricky previazané. Ak zmeníš polohu jednej časti, ostatné sa musia prispôsobiť tak, aby sa mechanická slučka stále uzatvárala.

To vytvára obmedzenia pohybu, teda constraints.

Closed-chain roboty môžu byť vďaka svojej konštrukcii veľmi pevné a schopné prenášať veľké zaťaženie. Ich matematická analýza je však zložitejšia, pretože jednotlivé kĺby nie sú úplne nezávislé.

Pri takýchto mechanizmoch navyše nemusí byť každý kĺb priamo poháňaný. Niektoré môžu byť pasívne a pohybujú sa iba ako dôsledok pohybu ostatných častí mechanizmu.

---

## 05. Pohony a problém vysokých otáčok

Robotický kĺb potrebuje niečo, čo vytvorí pohyb. Najčastejšie sa používajú elektrické motory, napríklad jednosmerné alebo striedavé motory či krokové motory. V niektorých systémoch sa využíva hydraulika alebo pneumatika.

Problém je, že vlastnosti bežného elektrického motora často nezodpovedajú tomu, čo potrebujeme priamo v robotickom kĺbe.

Mnohé motory pracujú efektívne pri vysokých otáčkach, často v tisícoch otáčok za minútu, ale vytvárajú relatívne malý krútiaci moment. Robotický kĺb zvyčajne potrebuje opačné vlastnosti: pohybovať sa pomalšie, ale vytvárať veľkú silu alebo veľký krútiaci moment.

Preto sa medzi motor a kĺb často pridáva prevod.

Prevod zníži rýchlosť otáčania a zároveň zvýši dostupný krútiaci moment. Môže používať ozubené kolesá, remene a remenice, reťaze, lankové systémy alebo iné mechanické riešenia.

Dobrý prevod by mal preniesť pohyb čo najpresnejšie a s čo najmenšími stratami. Práve tu však vznikajú niektoré praktické problémy.

---

## 06. Backlash, trenie a ďalšie rozdiely medzi modelom a realitou

Jedným z problémov mechanických prevodov je backlash, teda mechanická vôľa.

Predstav si dve ozubené kolesá. Medzi ich zubami musí byť malá medzera, aby sa mohli pohybovať. Keď motor zmení smer otáčania, môže sa preto najskôr mierne pohnúť bez toho, aby sa výstupný člen okamžite pohol.

Pri veľmi presnom robotovi môže aj malá vôľa spôsobovať chyby.

Podobne môže vzniknúť slippage, teda prešmykovanie, pri ktorom sa pohyb vstupu neprenesie dokonale na výstup.

Ďalej tu máme trenie, elasticitu materiálov alebo hysteréziu, pri ktorej správanie systému závisí aj od jeho predchádzajúceho stavu.

V základných kapitolách Modern Robotics sa väčšina týchto efektov zanedbáva. Nie preto, že by v skutočných robotoch neexistovali, ale preto, že sa najprv chceme naučiť základné zákonitosti pohybu.

Je to podobné ako vo fyzike, keď najskôr počítame pohyb bez odporu vzduchu a až neskôr pridávame realistickejšie efekty.

---

## 07. Prečo môže robot potrebovať brzdu

Robotický mechanizmus niekedy potrebuje nielen pohyb vytvoriť, ale aj bezpečne zastaviť alebo určitú polohu udržať.

Na to môžu slúžiť brzdy.

Predstav si veľké robotické rameno, ktoré drží ťažký predmet. Ak prestane motor vytvárať potrebný krútiaci moment, gravitácia môže začať rameno ťahať nadol. Mechanická brzda môže kĺb zablokovať a zabrániť nechcenému pohybu.

Brzdy môžu byť dôležité aj pri núdzovom zastavení robota.

Toto je pekný príklad toho, že robotika nie je iba o matematickom výpočte správneho pohybu. Reálny robot musí byť navrhnutý aj s ohľadom na bezpečnosť a fyzické limity.

---

## 08. Robot potrebuje senzory, aby vedel, čo sa naozaj stalo

Predstav si, že controller pošle motoru príkaz: „Otoč kĺb o 30 stupňov."

Bez senzora by robot iba predpokladal, že príkaz bol vykonaný presne. V skutočnosti však môže pôsobiť trenie, zaťaženie, vôľa v prevode alebo iná chyba.

Preto robot potrebuje spätnú väzbu.

Jednými z najdôležitejších senzorov sú senzory polohy kĺbov. Pri rotačnom kĺbe meriame jeho uhol. Pri lineárnom kĺbe meriame jeho vysunutie.

Na to sa používajú napríklad encodery, potenciometre alebo resolvery.

Encoder môže napríklad oznámiť, že požadovaný uhol kĺbu bol 50 stupňov, ale skutočný uhol je zatiaľ iba 47 stupňov.

Controller vidí rozdiel medzi požadovaným a skutočným stavom a môže podľa neho upraviť ďalší príkaz motoru.

Toto je základ feedback control, teda riadenia so spätnou väzbou.

Namiesto princípu: „Pošlem príkaz a dúfam, že sa vykonal" používame princíp: „Pošlem príkaz, zmeriam výsledok, porovnám ho s cieľom a podľa chyby upravím ďalšie riadenie."

Tento princíp sa bude neskôr objavovať prakticky v celej oblasti robotického riadenia.

---

## 09. Poloha, rýchlosť a zrýchlenie

Robotika nepracuje iba s tým, kde sa robot nachádza.

Ak označíme konfiguráciu robota symbolom q, potom nás bude zaujímať aj to, ako rýchlo sa konfigurácia mení a ako sa mení táto rýchlosť.

Postupne teda pracujeme s tromi úrovňami:
- **konfigurácia** – kde sa robot nachádza
- **rýchlosť** – ako rýchlo sa jeho stav mení
- **zrýchlenie** – ako rýchlo sa mení jeho rýchlosť

V matematike sa často zapisujú ako q, q̇ a q̈.

Toto rozlíšenie bude veľmi dôležité. Kinematika sa bude zaoberať najmä polohou a rýchlosťou. Dynamika potom pridá zrýchlenie, hmotnosť, sily a krútiace momenty.

---

## 10. Robot musí niekedy cítiť aj silu

Predstav si robotické rameno, ktoré leští karosériu auta.

Nestačí, aby jeho nástroj prechádzal po správnej geometrickej ceste. Musí zároveň tlačiť na povrch vhodnou silou.

Ak bude tlačiť príliš málo, leštenie nebude účinné. Ak príliš veľa, môže poškodiť povrch.

Preto sa pri niektorých robotoch používajú force–torque sensors, teda senzory sily a krútiaceho momentu.

Takýto senzor môže merať silu pôsobiacu v troch priestorových smeroch a zároveň krútiaci moment okolo troch osí. Spolu teda získavame šesť komponentov, ktoré opisujú, ako je end-effector mechanicky zaťažovaný.

Neskôr ich Modern Robotics spojí do jedného matematického objektu nazývaného wrench.

Zatiaľ je dôležitejšia intuitívna myšlienka: robot potrebuje niekedy vedieť nielen kde je, ale aj ako silno pôsobí na svoje okolie.

---

## 11. Robot potrebuje vnímať aj svoje okolie

Senzory nemusia sledovať iba samotného robota. Môžu mu pomáhať zisťovať, čo sa nachádza okolo neho.

Najjednoduchším príkladom je kamera. Klasická RGB kamera zaznamenáva farbu obrazu.

RGB-D kamera pridáva ku každému miestu obrazu aj informáciu o hĺbke, teda približnej vzdialenosti od kamery.

To je pre robota veľmi užitočné. Z obyčajnej fotografie môže byť náročné určiť, či je predmet vzdialený 30 centimetrov alebo dva metre. Hĺbková kamera poskytuje túto informáciu priamo.

Mobilné roboty často používajú aj LiDAR, ktorý pomocou laserového svetla meria vzdialenosť k okolitému prostrediu. Robot môže z týchto meraní vytvárať mapu, vyhľadávať prekážky alebo určovať svoju vlastnú polohu.

Existujú tiež akustické alebo ultrazvukové senzory.

Oblasti ako computer vision a artificial intelligence síce do robotiky patria, ale Modern Robotics sa sústreďuje najmä na mechanickú stránku: ako robot reprezentovať, ako počítať jeho pohyb, ako plánovať trajektórie a ako ho riadiť.

---

## 12. Configuration Space – prvý matematický model robota

Keď máme fyzického robota, prvá zásadná matematická otázka znie: Ako presne opíšeme jeho stav?

Tomu sa venuje Chapter 2 – Configuration Space.

Konfigurácia robota je úplný opis polohy všetkých jeho bodov. Keďže však linky považujeme za tuhé telesá, nepotrebujeme sledovať každý bod osobitne.

Voľné tuhé teleso v rovine môžeme opísať tromi nezávislými hodnotami: dve určujú jeho polohu a jedna jeho orientáciu. Má teda tri stupne voľnosti.

Voľné tuhé teleso v trojrozmernom priestore potrebuje šesť nezávislých hodnôt: tri pre polohu a tri pre orientáciu. Má teda šesť stupňov voľnosti.

Degree of freedom, skrátene DOF, znamená minimálny počet nezávislých reálnych parametrov potrebných na úplný opis konfigurácie.

Pri robotovi musíme následne zohľadniť joints. Kĺby obmedzujú pohyb jednotlivých linkov a tým znižujú celkový počet možných stupňov voľnosti.

Práve z tejto úvahy vznikne Grüblerova formula, pomocou ktorej dokážeme odhadovať počet DOF všeobecných robotických mechanizmov.

---

## 13. Configuration Space nie je iba zoznam čísel

Configuration space, skrátene C-space, je priestor všetkých možných konfigurácií robota.

Ak má robot dva stupne voľnosti, môžeme jeho konfiguráciu často reprezentovať dvomi súradnicami. Ak má šesť DOF, jeho C-space je šesťrozmerný.

Dôležité však je, že nestačí vedieť iba počet rozmerov. Záleží aj na tvare priestoru.

Predstav si obyčajnú rovinu a povrch zemegule. Oba priestory sú dvojrozmerné. Na označenie polohy na oboch môžeme použiť dve čísla. Ich geometrická štruktúra je však úplne odlišná. Rovina pokračuje do nekonečna. Povrch gule je uzavretý.

Práve takéto vlastnosti študuje topológia.

V robotike je to dôležité hlavne pri rotáciách. Uhol 0 stupňov a 360 stupňov predstavujú rovnakú orientáciu. Uhlová súradnica sa teda nespráva rovnako ako obyčajná nekonečná číselná os.

To ovplyvňuje reprezentáciu konfigurácií aj plánovanie pohybu.

---

## 14. Explicitná a implicitná reprezentácia

Jeden geometrický priestor môžeme matematicky reprezentovať viacerými spôsobmi.

Predstav si povrch Zeme.

Jednou možnosťou je použiť zemepisnú šírku a dĺžku. Na určenie bodu potrebujeme dve čísla. To je explicitná parametrizácia – používame priamo minimálny počet parametrov.

Existuje však aj iný spôsob. Zem môžeme vložiť do trojrozmerného priestoru a bod na jej povrchu opísať tromi súradnicami x, y a z. Tieto tri hodnoty však nemôžu byť ľubovoľné. Musia spĺňať rovnicu povrchu gule.

Používame teda viac čísel, ale pridáme matematické obmedzenie. To je implicitná reprezentácia.

Modern Robotics často používa práve takéto reprezentácie. Napríklad orientácia tuhého telesa v priestore má iba tri rotačné stupne voľnosti, ale budeme ju reprezentovať pomocou rotation matrix, ktorá obsahuje deväť čísel podliehajúcich určitým obmedzeniam.

Na prvý pohľad môže pôsobiť zvláštne používať deväť čísel namiesto troch. Výhodou je však veľmi čistá matematika, dobré vlastnosti pri výpočtoch a vyhnutie sa niektorým problémom, ktoré vznikajú pri minimálnych reprezentáciách.

---

## 15. Task space a workspace

Configuration space opisuje celý robot. Pri konkrétnej úlohe nás však často nezaujíma každý jeho joint.

Predstav si robotické rameno, ktoré má zdvihnúť pohár. Z pohľadu úlohy môže byť najdôležitejšie, aby gripper dosiahol správnu polohu a orientáciu. Nemusí nás priamo zaujímať, či je lakeť robota otočený trochu doprava alebo doľava, pokiaľ je výsledná poloha grippera správna.

Priestor, v ktorom prirodzene opisujeme samotnú úlohu, nazývame task space.

Je však možné, že niektoré požadované polohy v task space robot nedokáže dosiahnuť. Možno sú príliš ďaleko, príliš vysoko alebo im bráni jeho mechanická konštrukcia.

Množinu polôh a orientácií end-effectora, ktoré robot skutočne dokáže dosiahnuť, nazývame workspace.

Je preto dobré rozlišovať tri pojmy:
- **Configuration space** opisuje možné stavy celého robota.
- **Task space** opisuje veličiny, ktoré sú prirodzené pre konkrétnu úlohu.
- **Workspace** opisuje tú časť task space, ktorú robot skutočne dokáže dosiahnuť.

Medzi configuration space a task space navyše nemusí existovať jednoznačný vzťah. Rovnakú polohu end-effectora môže robot dosiahnuť viacerými rôznymi konfiguráciami.

---

## 16. Rigid-Body Motions – ako opíšeme polohu a orientáciu telesa

Keď už vieme, čo je konfigurácia, ďalšia otázka znie: Ako matematicky opíšeme polohu a orientáciu tuhého telesa v trojrozmernom priestore?

Tomu sa venuje Chapter 3.

Predstav si, že k robotickému linku pevne pripevníme malý súradnicový systém, teda reference frame. Keď sa link pohybuje, tento frame sa pohybuje spolu s ním.

Namiesto sledovania celého telesa potom môžeme sledovať polohu a orientáciu jeho frame.

Orientácia sa bude reprezentovať pomocou rotation matrix, teda rotačnej matice. Rotation matrix je matica veľkosti 3 × 3. Obsahuje deväť čísel, ale tieto čísla nie sú nezávislé. V skutočnosti reprezentuje iba tri rotačné stupne voľnosti.

Jej veľkou výhodou je, že pomocou bežnej lineárnej algebry dokážeme jednoducho opisovať rotácie a prechody medzi rôznymi reference frames.

---

## 17. Rotáciu môžeme chápať ako „os + uhol"

Veľmi intuitívny spôsob, ako si predstaviť trojrozmernú rotáciu, je určiť:
- **os**, okolo ktorej rotujeme
- **uhol**, o ktorý rotujeme

Predstav si ceruzku smerujúcu určitým smerom. Tá predstavuje os rotácie. Potom povieme napríklad: otoč teleso o 40 stupňov okolo tejto osi.

Modern Robotics túto myšlienku formalizuje pomocou exponential coordinates.

Dôvodom, prečo sú tieto súradnice dôležité, nie je iba reprezentácia samotnej rotácie. Rovnaká myšlienka sa neskôr rozšíri na všeobecný pohyb tuhého telesa a spojí sa s klasickou screw theory.

To je jedna z hlavných matematických tém knihy.

---

## 18. Twist – jednotný opis rýchlosti telesa

Tuhé teleso sa v 3D priestore môže súčasne posúvať aj otáčať.

Ak chceme opísať jeho okamžitý pohyb, potrebujeme teda dve veci:
- lineárnu rýchlosť
- uhlovú rýchlosť

Modern Robotics ich spojí do jedného šesťrozmerného objektu nazývaného twist.

Twist teda predstavuje kompletný opis okamžitého pohybu tuhého telesa.

Nemusíš si teraz pamätať jeho presnú matematickú podobu. Podstatné je pochopiť filozofiu: namiesto toho, aby sme transláciu a rotáciu neustále riešili oddelene, vytvoríme jeden matematický objekt, ktorý opisuje oboje naraz.

Podobný princíp použijeme pri silách. Lineárnu silu a krútiaci moment spojíme do objektu nazývaného wrench.

Twist teda opisuje pohyb a wrench opisuje mechanické pôsobenie. Tieto dva pojmy sa neskôr budú objavovať prakticky všade.

---

## 19. Forward Kinematics – keď poznáme kĺby a hľadáme end-effector

Teraz máme robotické rameno s niekoľkými joints.

Predstav si, že poznáme všetky ich hodnoty. Pri rotačných joints poznáme uhly, pri lineárnych poznáme ich vysunutie.

Otázka znie: Kde sa pri týchto hodnotách nachádza end-effector a ako je otočený?

To je problém forward kinematics.

Smer výpočtu je: **joint configuration → end-effector configuration**

Pri open-chain robotovi je tento problém typicky jednoznačný. Ak poznáme geometriu robota a všetky joint positions, výsledná poloha a orientácia end-effectora sú určené.

Modern Robotics bude forward kinematics opisovať pomocou Product of Exponentials formula, skrátene PoE.

Táto formulácia veľmi prirodzene nadväzuje na exponential coordinates z predchádzajúcej kapitoly.

---

## 20. Velocity Kinematics a Jacobian

Forward kinematics nám povie, kde end-effector je.

Ďalšia otázka však znie: Ako sa bude end-effector pohybovať, keď poznáme rýchlosti jednotlivých joints?

Predstav si dvojkĺbové rameno. Prvý joint sa otáča určitou rýchlosťou a druhý inou. Výsledný pohyb konca ramena závisí od oboch rýchlostí a zároveň od aktuálnej konfigurácie robota.

Presne tento vzťah opisuje Jacobian.

Jacobian je matica, ktorá prepája joint velocities s okamžitou rýchlosťou end-effectora. Je to jeden z najdôležitejších objektov celej robotiky.

Pomocou Jacobianu dokážeme napríklad zistiť:
- ako sa bude end-effector pohybovať pri daných joint velocities
- ktoré smery pohybu sú pre robot jednoduché alebo náročné
- kde vznikajú singularity
- aké joint torques sú potrebné na vytvorenie určitej sily na end-effectore

Jacobian teda spája kinematiku pohybu s neskoršou analýzou síl.

---

## 21. Singularities – keď robot dočasne stratí možnosť pohybu určitým smerom

Nie všetky konfigurácie robota sú rovnako dobré.

Predstav si jednoduché dvojlinkové rameno, ktoré úplne vystrieš do jednej priamky. V tejto konfigurácii môže byť veľmi ťažké alebo dokonca okamžite nemožné pohybovať end-effectorom určitým smerom.

Robot síce má stále rovnaké joints, ale ich konkrétne geometrické usporiadanie spôsobilo, že sa niektoré možnosti okamžitého pohybu stratili.

Takúto konfiguráciu nazývame kinematic singularity.

Matematicky sa singularity prejavujú v Jacobiane.

Prakticky sú veľmi dôležité. Robot pracujúci blízko singularity môže potrebovať extrémne vysoké joint velocities na vytvorenie malého pohybu end-effectora alebo môže úplne stratiť schopnosť pohybu určitým smerom.

Preto sa singularities často snažíme pri plánovaní pohybu obchádzať.

---

## 22. Inverse Kinematics – keď poznáme cieľ a hľadáme kĺby

Forward kinematics rieši otázku: Poznám joints. Kde bude end-effector?

Inverse kinematics rieši opačný problém: Viem, kde chcem mať end-effector. Aké joint values potrebujem?

Toto je inverse kinematics. A práve tento problém je zvyčajne komplikovanejší.

Ak poznáme hodnoty všetkých joints, end-effector má pri open-chain robotovi spravidla jedno konkrétne umiestnenie.

Ak však zadáme požadovanú polohu end-effectora, môže existovať viacero konfigurácií robota, ktoré ju dosiahnu.

Predstav si vlastnú ruku. Ruku môžeš položiť na rovnaké miesto viacerými spôsobmi, pričom lakeť bude v odlišnej polohe.

Inverse kinematics preto môže mať:
- jedno riešenie
- viacero riešení
- alebo žiadne riešenie

Žiadne riešenie vznikne napríklad vtedy, keď požadujeme bod mimo dosahu robota.

---

## 23. Redundantné roboty

Robot je kinematicky redundantný, ak má viac stupňov voľnosti, než potrebuje jeho aktuálna úloha.

Predstav si robotické rameno so siedmimi joints, ktoré vykonáva úlohu vyžadujúcu iba šesť nezávislých parametrov end-effectora.

Robot má jednu „voľnosť navyše".

To je v skutočnosti veľká výhoda. Môže napríklad držať gripper na rovnakom mieste a zároveň meniť polohu svojho lakťa. Takto sa môže vyhnúť prekážke, vzdialiť sa od singularity alebo zvoliť pohodlnejšiu konfiguráciu.

Ľudská ruka je podobne redundantná. Mnoho polôh dlane dokážeme dosiahnuť rôznymi konfiguráciami celej ruky.

Pri výpočtoch redundantných robotov sa často používa pseudoinverse Jacobianu.

---

## 24. Kinematics of Closed Chains

Closed-chain roboty prinášajú ďalšiu komplikáciu.

Pri open-chain robotovi môže mať každý joint svoju hodnotu a forward kinematics nám z nej určí výslednú polohu end-effectora.

Pri closed chain však musia všetky linky zároveň spĺňať podmienku, že mechanická slučka zostáva uzavretá. Vznikajú loop-closure constraints.

To znamená, že hodnoty jednotlivých joints nie je možné voliť úplne nezávisle.

Closed-chain mechanizmy navyše môžu mať viacero forward kinematics solutions. Rovnaké hodnoty actuated joints môžu byť kompatibilné s viacerými konfiguráciami mechanizmu.

Preto dostávajú vlastnú samostatnú kapitolu.

---

## 25. Dynamics – čo pohyb robota spôsobuje

Doteraz sme riešili najmä kinematiku. Kinematics sa pýta: Ako sa robot pohybuje?

Nevysvetľuje však ešte: Prečo sa tak pohybuje a aké sily sú na to potrebné?

To je úloha dynamics.

Dynamics berie do úvahy hmotnosť linkov, ich zotrvačnosť, gravitáciu, forces a torques.

Základnú myšlienku poznáš z fyziky: sila spôsobuje zrýchlenie.

Pri robotickom ramene však už nejde o jeden jednoduchý bod. Máme mnoho navzájom prepojených tuhých telies, ktoré sa súčasne otáčajú a posúvajú.

Preto sú dynamické rovnice robotov omnoho komplexnejšie.

---

## 26. Forward Dynamics a Inverse Dynamics

Rovnako ako pri kinematics máme aj pri dynamics dva opačné problémy.

Pri forward dynamics poznáme sily alebo krútiace momenty, ktoré vytvárajú actuators, a chceme zistiť, aké zrýchlenie robota z nich vznikne. Teda približne: **torques → accelerations**

Pri inverse dynamics robíme opak. Máme požadovaný pohyb robota a chceme vypočítať, aké joint forces alebo torques musia actuators vytvoriť. Teda: **desired motion → required torques**

Inverse dynamics je mimoriadne dôležitá pri robotickom control. Ak chceme, aby rameno vykonalo určitý pohyb, controller potrebuje vedieť, aké momenty má prikázať motorom.

---

## 27. Lagrangian a Newton–Euler pohľad na dynamiku

Dynamiku robota môžeme odvodiť viacerými spôsobmi.

**Lagrangian approach** sa pozerá na celý systém cez energiu. Vypočítame kinetickú energiu pohybujúcich sa linkov a potenciálnu energiu, napríklad v gravitačnom poli. Z nich pomocou Euler–Lagrangeových rovníc získame rovnice pohybu.

Je to veľmi elegantný matematický prístup a dobre funguje pri systematickom odvodzovaní dynamických rovníc.

**Newton–Euler approach** ide na problém viac „silovým" spôsobom. Vychádza z Newtonových zákonov a rotačného ekvivalentu vzťahu sila–zrýchlenie.

Pri open-chain robotovi môžeme najprv postupovať od základne smerom ku koncu a vypočítať rýchlosti a zrýchlenia jednotlivých linkov. Potom sa vraciame späť a počítame forces a torques, ktoré sú potrebné na vytvorenie tohto pohybu.

Oba prístupy opisujú tú istú fyziku. Rozdiel je v spôsobe, akým sa k výsledným rovniciam dostaneme.

---

## 28. Trajectory Generation – nestačí povedať iba „choď tam"

Predstav si robotické rameno a dve konfigurácie: začiatočnú a cieľovú.

Ak robotovi povieme iba: Presuň sa zo štartovacej konfigurácie do cieľovej, stále sme mu nepovedali, ako presne sa má medzi nimi pohybovať.

Práve to rieši trajectory generation.

Je dôležité rozlišovať medzi path a trajectory.

**Path** je geometrická cesta. Hovorí, cez aké konfigurácie robot prejde.

**Trajectory** pridáva aj čas. Hovorí nielen kadiaľ robot pôjde, ale aj kedy má byť v jednotlivých bodoch cesty.

Môžeme teda povedať: **trajectory = path + time information**.

Robot môže mať tú istú path, ale absolvovať ju pomaly alebo rýchlo. V oboch prípadoch je geometrická cesta rovnaká, ale trajectory je iná.

Trajectory generation rieši napríklad plynulé presuny medzi bodmi, pohyb cez niekoľko zadaných medzibodov alebo časovo optimálne pohyby rešpektujúce limity robota.

---

## 29. Motion Planning – ako sa dostať do cieľa bez kolízie

Trajectory generation ešte automaticky nerieši prekážky.

Predstav si, že medzi robotom a cieľom stojí stĺp. Najkratšia cesta môže viesť priamo cez stĺp, čo je fyzicky nemožné.

Robot preto potrebuje motion planning.

Motion planning rieši otázku: Ako nájsť pohyb zo štartovacej konfigurácie do cieľovej konfigurácie tak, aby robot nekolaboval s prostredím a zároveň rešpektoval svoje fyzické obmedzenia?

Jednoduchšou podúlohou je path planning, ktorý hľadá geometricky prípustnú cestu, často bez riešenia času a dynamiky.

Motion planning môže navyše zohľadňovať joint limits, actuator limits, dynamiku alebo ďalšie fyzikálne constraints.

V knihe sa stretneme s viacerými skupinami metód, napríklad s grid-based metódami, sampling-based plánovaním a potential fields.

---

## 30. Robot Control – plán nestačí, robot ho musí vykonať

Predstav si, že už máme dokonale vypočítanú trajectory.

Robot však stále potrebuje controller, ktorý zabezpečí, aby sa podľa tejto trajectory skutočne pohyboval.

V reálnom svete pôsobí gravitácia, trenie, nepresnosť motorov, vôľa v prevodoch a vonkajšie sily.

Ak by sme motorom iba poslali vopred vypočítané príkazy bez merania výsledku, aj malá chyba by sa mohla postupne zväčšovať.

Preto sa v robotike používa feedback control.

Controller neustále porovnáva **desired state** so **actual measured state** a podľa rozdielu upravuje forces alebo torques actuatorov.

To umožňuje robotovi korigovať chyby.

---

## 31. Motion control, force control a impedance control

Nie každá robotická úloha vyžaduje rovnaký typ riadenia.

Ak robot prenáša predmet z jedného miesta na druhé vo voľnom priestore, hlavnou úlohou môže byť presne riadiť jeho pohyb. To je **motion alebo position control**.

Ak robot leští povrch, dôležitá môže byť sila, ktorou tlačí na materiál. Vtedy používame **force control**.

Pri niektorých úlohách potrebujeme kombinovať oboje. Napríklad pri písaní kriedou na tabuľu chceme riadiť pohyb kriedy v rovine tabule, ale zároveň kontrolovať silu, ktorou krieda tlačí na tabuľu. To vedie k **hybrid motion–force control**.

Ďalším veľmi zaujímavým prístupom je **impedance control**. Pri ňom nechceme robotovi iba povedať presnú polohu alebo presnú silu. Chceme, aby sa pri kontakte správal určitým mechanickým spôsobom, napríklad ako pružina alebo tlmič.

Taký robot môže byť poddajnejší a bezpečnejší pri kontakte s človekom alebo nepresne známym prostredím.

---

## 32. Robot nemôže nezávisle určovať pohyb aj silu v tom istom smere

Toto je veľmi dôležitý fyzikálny princíp.

Predstav si, že robot tlačí end-effectorom do pevnej steny. Nemôže zároveň úplne nezávisle prikázať: „moja poloha bude presne o 5 centimetrov ďalej" a zároveň: „budem tlačiť presne silou 20 newtonov" v tom istom smere, ak mu stena taký pohyb neumožňuje.

Ak robot jednoznačne určí pohyb, výslednú kontaktnú silu ovplyvní prostredie. Ak jednoznačne reguluje silu voči pevnému povrchu, výsledná poloha závisí od kontaktu a poddajnosti systému.

Preto je pri robot control veľmi dôležité premýšľať nad tým, ktoré smery riadime ako pohyb a ktoré ako silu.

---

## 33. Prečo feedback nestačí vždy sám

Jednoduchý feedback controller môže robot korigovať na základe chyby. Pri pomalom a jednoduchom systéme to môže fungovať veľmi dobre.

Pri rýchlom robotickom ramene však môže byť dynamika systému natoľko výrazná, že samotná reakcia na chybu nestačí.

Preto sa používajú metódy kombinujúce dynamický model robota a spätnú väzbu.

Jednou z nich je **computed torque control**.

Myšlienka je približne takáto: pomocou modelu robota najskôr odhadneme, aké torques by mali byť potrebné na požadovaný pohyb, a feedback potom opravuje chyby vznikajúce tým, že model nie je dokonale presný.

Je to veľmi všeobecný princíp: **model poskytne predikciu a feedback opraví realitu**.

---

## 34. Grasping and Manipulation

Doteraz sme sa väčšinou zaoberali tým, ako pohybovať samotným robotom.

Robot však zvyčajne staviame preto, aby robil niečo so svojím okolím.

Preto sa neskôr dostaneme ku grasping and manipulation.

Tu už nestačí vedieť, kde sa nachádza gripper. Potrebujeme pochopiť kontakt medzi robotom a objektom.

Ak robot drží pohár dvoma prstami, musíme riešiť otázky ako:
- aké sily dokážu prsty prenášať
- či vznikne dostatočné trenie
- či sa predmet môže vyšmyknúť
- či môže rotovať
- či ho kontakt úplne znehybní

Kniha zavádza koncepty ako **form closure** a **force closure**.

Form closure znamená, že geometria kontaktov sama zabraňuje pohybu objektu. Force closure znamená, že vhodne zvolené kontaktné sily dokážu objekt stabilne udržať proti všetkým potrebným smerom pohybu.

Rovnaké modely kontaktu sa používajú aj pri tlačení predmetov, dynamickom prenášaní alebo analyzovaní stability.

---

## 35. Wheeled Mobile Robots

Posledná časť knihy sa presúva od robotických ramien k robotom pohybujúcim sa na kolesách.

Nie všetky kolesové roboty sa môžu pohybovať rovnakým spôsobom.

Robot s omniwheels alebo mecanum wheels môže byť prakticky omnidirectional. Dokáže sa pohybovať dopredu, do strán alebo rotovať na mieste.

Klasické auto sa však nedokáže okamžite posunúť bokom. Jeho kolesá sa majú odvaľovať v smere jazdy a nemali by sa bočne šmýkať.

To vytvára špeciálny typ pohybového obmedzenia.

---

## 36. Holonomic a nonholonomic constraints

Pri closed-chain mechanizmoch sme videli constraints vyplývajúce z geometrie uzavretej slučky. Tie obmedzujú samotné možné konfigurácie systému. Takéto constraints nazývame **holonomic constraints**.

Pri aute je situácia iná. Auto môže byť teoreticky na takmer ľubovoľnom mieste a s ľubovoľnou orientáciou na rovine. Nemôže sa však v danom okamihu pohybovať ľubovoľným smerom. Napríklad klasické auto sa nedokáže okamžite posunúť priamo doľava bez toho, aby najskôr zmenilo svoju orientáciu.

Jeho obmedzenie sa teda týka okamžitej rýchlosti, nie priamo množiny možných konfigurácií. Takéto obmedzenie nazývame **nonholonomic constraint**.

Tento rozdiel je veľmi dôležitý pri mobilnej robotike.

Auto sa môže dostať na parkovacie miesto bokom, ale musí vykonať sériu pohybov dopredu, dozadu a otáčania. Nemôže sa jednoducho presunúť bokom jedným priamym pohybom.

---

## 37. Odometry

Mobilný robot potrebuje vedieť, kde sa nachádza.

Jedným zo základných spôsobov odhadu polohy je odometry.

Robot sleduje, ako sa otáčali jeho kolesá, a z encoder údajov odhaduje, ako ďaleko sa posunul a ako sa otočil.

Ak napríklad obe kolesá differential-drive robota vykonajú rovnaký pohyb, robot sa približne posunie dopredu. Ak sa jedno koleso pohybuje rýchlejšie než druhé, robot začne zatáčať.

Integráciou týchto malých pohybov môžeme odhadovať jeho celkovú configuration.

Odometry však postupne akumuluje chybu. Aj malé prešmyknutie kolies alebo chyba encoderov spôsobí, že odhad sa začne od skutočnej polohy odchyľovať.

Preto sa v reálnych systémoch často kombinuje s kamerami, LiDARom, GPS alebo ďalšími senzormi.

---

## 38. Mobile Manipulation

Veľmi zaujímavým prípadom je robot, ktorý kombinuje mobilnú základňu s robotickým ramenom. Taký systém nazývame mobile manipulator.

Predstav si robota v sklade. Základňa ho dovezie k polici a robotické rameno potom uchopí produkt.

Teraz máme dva zdroje pohybu: kolesá mobilnej základne a joints robotického ramena. Oboje však nakoniec ovplyvňuje pohyb toho istého end-effectora.

Modern Robotics ukazuje, že aj tento systém môžeme elegantne opísať pomocou Jacobianu. Jacobian mapuje rýchlosti kolies a joint velocities na výsledný twist end-effectora.

To je pekný príklad toho, ako sa koncepty z predchádzajúcich kapitol znovu spájajú.

---

## 39. Ako na seba všetky kapitoly nadväzujú

Celú Modern Robotics si môžeš predstaviť ako jeden logický reťazec:

- **V akom stave robot je?** → Configuration Space
- **Ako opíšeme polohu a orientáciu?** → Rigid-Body Motions
- **Poznám joints, kde bude end-effector?** → Forward Kinematics
- **Ako súvisia joint velocities s rýchlosťou end-effectora?** → Velocity Kinematics a Jacobian
- **Poznám cieľ, aké joints potrebujem?** → Inverse Kinematics
- **Uzavreté mechanizmy** → Kinematics of Closed Chains
- **Aké forces a torques spôsobujú pohyb?** → Dynamics
- **Akú trajectory má robot nasledovať?** → Trajectory Generation
- **Ako nájsť bezpečný pohyb?** → Motion Planning
- **Ako zabezpečiť vykonanie pohybu?** → Robot Control
- **Ako modelovať kontakt a uchopenie?** → Grasping and Manipulation
- **Ako riadiť mobilného robota?** → Wheeled Mobile Robotics

---

## 40. Najdôležitejšia myšlienka tejto úvodnej lekcie

Na začiatku sa robot môže javiť ako veľmi komplikovaný systém, v ktorom sa mieša mechanika, fyzika, matematika, elektronika a software.

Modern Robotics však tento problém rozdelí na sériu veľmi konkrétnych otázok.

Najskôr musíme vedieť reprezentovať stav robota. Potom musíme vedieť opísať jeho pohyb. Následne môžeme vypočítať, kde sa nachádza end-effector, a opačne, aké joints potrebujeme pre požadovaný cieľ.

Potom pridáme rýchlosti, sily, torques a dynamiku. Až keď tomu rozumieme, môžeme systematicky riešiť trajektórie, plánovanie pohybu a control.

Nakoniec tieto princípy použijeme pri fyzickej interakcii s predmetmi a pri mobilných robotoch.

Takto je postavená celá logika Modern Robotics:

**configuration → motion → kinematics → velocities → forces → dynamics → planning → control → manipulation**

A práve preto je Configuration Space jednou z prvých tém kurzu. Predtým, než môžeme robotu povedať, kam sa má pohnúť, musíme byť schopní presne povedať, čo znamená, že robot je v určitom stave.`;
