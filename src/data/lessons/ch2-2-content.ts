// Chapter 2.2 – Degrees of Freedom of a Robot
// Full lesson content - DO NOT SHORTEN

export const ch22Content = `# Chapter 2.2 – Degrees of Freedom of a Robot

## Ako zistíme, koľko nezávislých pohybov má celý robot

V predchádzajúcej lekcii sme sa pozerali na jedno samostatné rigid body, teda tuhé teleso. Zistili sme, že teleso, ktoré sa môže voľne pohybovať v rovine, má 3 degrees of freedom (DOF): môže sa posúvať v dvoch smeroch a otáčať. Voľné teleso v trojrozmernom priestore má 6 DOF: tri možnosti posunutia a tri možnosti otáčania.

Robot je však zaujímavejší. Väčšinou sa neskladá z jedného telesa, ale z viacerých pevných častí, ktoré nazývame links. Tie sú medzi sebou spojené pomocou joints, teda kĺbov alebo mechanických spojení. Joint dovolí dvom susedným links určitý pohyb, ale zároveň im množstvo iných pohybov zakáže.

Práve tu sa dostávame k hlavnej otázke tejto lekcie: **Ako zistíme počet stupňov voľnosti celého robota?**

Základná myšlienka je prekvapivo jednoduchá. Predstavíme si všetky links ako samostatné telesá, spočítame, koľko voľnosti by mali, a potom zohľadníme constraints, ktoré medzi nimi vytvárajú joints. To, čo po týchto obmedzeniach zostane, predstavuje skutočné degrees of freedom mechanizmu.

---

## 01. Joint pohyb umožňuje, ale zároveň ho obmedzuje

Najjednoduchší spôsob, ako tomu porozumieť, sú obyčajné dvere.

Predstav si, že dvere ešte nie sú namontované a voľne ich držíš vo vzduchu. Z pohľadu mechaniky sú jednoducho spatial rigid body. Môžeš ich posunúť doprava alebo doľava, dopredu alebo dozadu a hore alebo dole. Okrem toho ich môžeš otáčať tromi nezávislými spôsobmi.

Takéto voľné dvere majú **6 DOF**.

Teraz ich pomocou pántov pripevníme k stene. Zrazu už nemôžeme dvere ľubovoľne premiestniť. Nemôžeme ich odniesť doprava, zdvihnúť nahor ani posunúť dopredu. Nemôžeme ich ani ľubovoľne nakláňať. Zostane iba jeden pohyb: otáčanie okolo osi pántu.

Dvere teda po pripevnení majú iba **1 DOF**.

Čo sa stalo s ostatnými piatimi? Pánt ich mechanicky znemožnil. Inými slovami, vytvoril päť constraints.

Pre spatial rigid body teda môžeme situáciu chápať ako: **6 pôvodných možností pohybu - 5 constraints = 1 DOF**

Toto je jedna z najdôležitejších myšlienok celej lekcie. Joint sa dá chápať dvoma rovnocennými spôsobmi. Môžeme sa pýtať, koľko pohybov joint povoľuje, alebo sa môžeme pýtať, koľko pohybov joint zakazuje.

Pri pánte je odpoveď buď „povoľuje jeden pohyb", alebo „zakazuje päť pohybov". Obe tvrdenia hovoria o tom istom.

---

## 02. Rovnaký mechanizmus môžeme niekedy analyzovať jednoduchšie

Dvere sú trojrozmerný objekt, ale pri ich bežnom otváraní nás nemusí zaujímať celý trojrozmerný priestor. Ak sa na dvere pozrieme zhora, ich pohyb môžeme chápať ako pohyb v rovine.

Voľné planar rigid body má, ako už vieme, 3 DOF. Môže sa posúvať v dvoch smeroch a môže sa otáčať.

Pánt však dverám zabráni v oboch posunutiach. Zostane iba rotácia.

V tomto prípade teda dostaneme: **3 pôvodné DOF - 2 constraints = 1 DOF**

Výsledok je opäť rovnaký.

Toto je užitočné, pretože nie každý robot musíme automaticky analyzovať ako plnohodnotný 3D mechanizmus. Ak je celý jeho pohyb obmedzený na jednu rovinu, môžeme použiť planar model. Pri všeobecnom pohybe v priestore používame spatial model.

Pre planar mechanism budeme vychádzať z toho, že jedno voľné rigid body má **3 DOF**. Pre spatial mechanism budeme vychádzať zo **6 DOF**.

---

## 03. Robot je systém links a joints

Predstav si jednoduché robotické rameno. Má základňu, prvý pevný segment, ďalší segment a možno gripper. Pevné segmenty nazývame links a miesta, kde je medzi nimi umožnený relatívny pohyb, nazývame joints.

Link teda nemusí byť „rameno" v bežnom zmysle slova. Je to jednoducho časť mechanizmu, ktorú v našom modeli považujeme za rigid body.

Joint naopak určuje, ako sa jeden link môže pohybovať vzhľadom na druhý.

To je dôležitý rozdiel. Samotný link by mal určitý počet možností pohybu. Keď ho však spojíme s ďalším linkom pomocou jointu, jeho pohyb už nie je ľubovoľný.

Robot teda nie je len zbierka voľných telies. Je to systém telies, ktorých pohyby sú navzájom previazané.

A práve preto nemôžeme počet DOF robota určiť iba tým, že spočítame počet jeho links.

---

## 04. Jeden joint vždy spája presne dva links

Pri počítaní mechanizmov budeme používať jedno dôležité pravidlo:

**Jeden joint spája presne dva links.**

Na prvý pohľad to môže znieť ako nepodstatný detail, ale pri zložitejších mechanizmoch je to veľmi dôležité.

Predstav si, že sa na jednom mieste stretávajú tri links a všetky sa môžu okolo toho istého bodu otáčať. Fyzicky to môže vyzerať ako jeden veľký spoločný kĺb. Z pohľadu nášho mechanického modelu to však nemôžeme jednoducho zapísať ako jeden joint spájajúci tri links.

Musíme spojenie rozdeliť na joints medzi dvojicami links.

Prečo na tom záleží? Pretože neskôr budeme pri Grüblerovej formule počítať počet links aj počet joints. Ak niektoré spojenie započítame nesprávne, nesprávny bude aj výsledný počet DOF.

> **Poznámka:** Dva joints môžu byť fyzicky na rovnakom mieste. Na obrázku teda môžu vyzerať ako jeden joint, ale matematický model ich stále môže počítať ako dve samostatné spojenia.

---

## 05. Revolute joint – rotačný kĺb

Najbežnejším jointom je **revolute joint**, označovaný písmenom **R**.

Najjednoduchším príkladom je pánt na dverách. Dve telesá sú spojené tak, že medzi nimi zostáva možná rotácia okolo jednej konkrétnej osi.

Podobne môže fungovať joint robotického ramena. Jeden link sa môže voči predchádzajúcemu linku otočiť o určitý uhol. Na opis konfigurácie takéhoto jointu nám stačí jedna hodnota: uhol natočenia.

Revolute joint má preto: **1 DOF.**

Ak ide o spatial mechanism, medzi dvoma voľnými rigid bodies by mohlo existovať šesť relatívnych možností pohybu. Revolute joint ponechá iba jednu. Preto vytvára: **5 constraints.**

Dôležité je uvedomiť si, že 1 DOF neznamená iba jeden smer pohybu. Joint sa môže otáčať napríklad v smere aj proti smeru hodinových ručičiek. Stále je to jeden DOF, pretože na určenie jeho konfigurácie potrebujeme iba jednu nezávislú hodnotu – uhol.

---

## 06. Prismatic joint – posuvný kĺb

Druhým veľmi častým typom je **prismatic joint**, označovaný písmenom **P**.

Predstav si zásuvku. Môžeš ju vysunúť alebo zasunúť, ale nemôžeš ju v skrinke ľubovoľne otáčať, zdvihnúť ani posunúť do strany.

Prismatic joint funguje podobne. Umožňuje transláciu pozdĺž jednej určenej osi.

Jeho konfiguráciu môžeme opísať jedinou hodnotou, napríklad tým, o koľko centimetrov je vysunutý. Preto má: **1 DOF.**

Aj tu platí, že dva opačné smery neznamenajú dva DOF. Vysunutie a zasunutie sú dve zmeny tej istej nezávislej premennej.

V spatial mechanism teda prismatic joint, rovnako ako revolute joint, ponecháva jeden relatívny DOF a vytvára **5 constraints**.

Rozdiel medzi R a P jointom nie je v počte DOF. Rozdiel je v type povoleného pohybu. Revolute joint povoľuje rotáciu, zatiaľ čo prismatic joint povoľuje transláciu.

---

## 07. Helical joint – rotácia a posun môžu stále znamenať iba 1 DOF

**Helical joint**, označovaný **H**, je veľmi dobrý príklad toho, prečo nemáme DOF počítať iba podľa toho, koľko rôznych pohybov vidíme.

Predstav si skrutku, ktorú zaskrutkovávaš do závitu. Keď ju otáčaš, zároveň sa posúva dopredu. Vidíme teda dva druhy pohybu: rotáciu aj transláciu.

Mohlo by sa zdať, že ide o 2 DOF.

Nie je to tak.

Pri normálnej skrutke nemôžeš nezávisle rozhodnúť: „Otočím ju o túto hodnotu, ale posuniem ju o úplne inú hodnotu." Posun je pevne daný tým, o koľko si skrutku otočila, a vlastnosťami závitu.

Rotácia a translácia teda nie sú nezávislé. Preto má helical joint: **1 DOF.**

Toto je veľmi dôležitá lekcia o samotnom význame degrees of freedom:

**DOF nepočíta počet viditeľných druhov pohybu. Počíta počet nezávislých hodnôt potrebných na opis konfigurácie.**

---

## 08. Cylindrical joint – tentoraz už máme 2 DOF

**Cylindrical joint**, označovaný **C**, na prvý pohľad pripomína helical joint. Aj tu môže teleso vykonávať transláciu pozdĺž osi a zároveň sa môže okolo tej istej osi otáčať.

Rozdiel je však zásadný. Pri cylindrical jointe sú tieto dva pohyby **nezávislé**.

Môžeme teleso posunúť bez toho, aby sme ho otočili. Môžeme ho otočiť bez toho, aby sme ho posunuli. A môžeme samozrejme robiť oboje naraz.

Na úplný opis konfigurácie preto potrebujeme dve nezávislé hodnoty: jednu pre posun a jednu pre rotáciu.

Cylindrical joint má: **2 DOF.** V spatial mechanism tak zo šiestich možných relatívnych DOF ponecháva dva a ostatné štyri zakazuje. Má teda: **4 constraints.**

Porovnanie s helical jointom je veľmi užitočné. Oba môžu vykonávať rotáciu aj transláciu. Helical joint ich však mechanicky viaže dohromady, takže má 1 DOF. Cylindrical joint ich necháva nezávislé, takže má 2 DOF.

---

## 09. Universal joint – dve nezávislé rotácie

Ďalším dvojstupňovým jointom je **universal joint**, označovaný **U**.

Môžeme si ho predstaviť ako dve rotačné spojenia usporiadané tak, že ich osi sú navzájom kolmé. Výsledkom je joint, ktorý umožňuje dve nezávislé rotácie.

Na opis jeho konfigurácie teda potrebujeme dva uhly. Universal joint má: **2 DOF.**

Na rozdiel od cylindrical jointu tu nemáme jednu transláciu a jednu rotáciu. Máme dve rotácie.

To nám ukazuje ďalšiu dôležitú vec: rovnaký počet DOF neznamená rovnaký mechanický pohyb. Cylindrical aj universal joint majú 2 DOF, ale umožňujú úplne iné typy pohybu.

V spatial mechanism universal joint ponecháva dva zo šiestich relatívnych DOF, takže vytvára **4 constraints**.

---

## 10. Spherical joint – tri rotačné DOF

**Spherical joint**, označovaný **S**, sa označuje aj ako **ball-and-socket joint**.

Dobrou intuitívnou predstavou je ľudské rameno. Hlavica kosti je uložená v kĺbovej jamke a môže sa orientovať rôznymi smermi.

Spherical joint umožňuje tri nezávislé rotačné pohyby, ale nepovoľuje nezávislé posúvanie jedného telesa voči druhému.

Má teda: **3 DOF.** Keďže spatial rigid body má šesť relatívnych DOF, spherical joint polovicu z nich ponecháva a polovicu zakazuje. Má preto: **3 constraints.**

Aj tu je dôležité nepliesť si „3 DOF" s tým, že joint sa jednoducho „môže veľa otáčať". Podstatné je, že na úplné určenie jeho orientácie potrebujeme tri nezávislé rotačné informácie.

---

## 11. Freedoms a constraints sú dve strany tej istej veci

Teraz už môžeme jednotlivé joints spojiť do jedného pravidla.

Pre spatial mechanism máme medzi dvoma voľnými rigid bodies 6 možných relatívnych DOF.

Ak joint povoľuje určitý počet z nich, zvyšok musí obmedziť.

Preto platí: **freedoms jointu + constraints jointu = 6**

Napríklad:
- Revolute joint má 1 DOF, takže poskytuje 5 constraints.
- Prismatic joint má 1 DOF, takže tiež poskytuje 5 constraints.
- Cylindrical a universal joint majú po 2 DOF, takže každý poskytuje 4 constraints.
- Spherical joint má 3 DOF, takže poskytuje 3 constraints.
- Helical joint má 1 DOF, takže poskytuje 5 constraints.

Pri planar mechanism je základné číslo namiesto šestky 3, pretože voľné planar rigid body má iba 3 DOF.

Všeobecne teda môžeme povedať: **počet freedoms jointu + počet constraints jointu = počet DOF voľného rigid body v danom priestore**

Toto pravidlo je základom Grüblerovej formule.

---

## 12. Ground sa pri počítaní považuje za link

Pred samotnou formulou potrebujeme ešte jednu dôležitú konvenciu.

**Pri počítaní links sa ground považuje za jeden z links.**

Ground nemusí doslova znamenať zem alebo podlahu. Znamená pevnú časť mechanizmu, voči ktorej opisujeme pohyb ostatných častí.

Predstav si jednoduché robotické rameno pripevnené k stolu. Stôl alebo pevná základňa predstavuje ground. Samotné pohyblivé časti ramena sú ďalšie links.

Prečo ground počítame, keď sa nepohybuje? Pretože joints spájajú vždy dve telesá. Aj prvý pohyblivý link robota musí byť pripojený k niečomu. Tým druhým telesom je práve ground.

Ground však sám nepridáva voľnosť mechanizmu, pretože sme ho definovali ako nepohyblivý. Preto sa vo formule objaví výraz: **N - 1**, kde N je celkový počet links vrátane ground.

---

## 13. Grüblerova formula – systematický spôsob počítania DOF

Pri jednoduchom robotickom ramene často vieme DOF určiť pohľadom. Pri zložitejšom mechanizme s množstvom links a uzavretými slučkami to však môže byť oveľa ťažšie.

Na systematické počítanie používame **Grüblerovu formulu**.

Označme:
- **N** – počet links vrátane ground
- **J** – počet joints
- **m** – počet DOF jedného voľného rigid body
- **fi** – počet DOF, ktoré povoľuje konkrétny joint i

Hodnota m závisí od toho, aký mechanizmus analyzujeme:
- **m = 3** pre planar mechanism
- **m = 6** pre spatial mechanism

Grüblerova formula má tvar:

**DOF = m(N - 1 - J) + suma DOF všetkých joints**

To môže na prvý pohľad pôsobiť komplikovane. Dôležitejšie než naučiť sa ju naspamäť je však pochopiť, odkiaľ pochádza.

---

## 14. Odkiaľ Grüblerova formula vzniká

Predstavme si, že máme N links vrátane ground. Ground je pevný, takže zostáva: **N - 1 pohyblivých links.**

Ak by tieto links neboli medzi sebou nijako spojené, každý z nich by mal m DOF. Spolu by teda mali: **m(N - 1) DOF.**

Teraz medzi ne začneme pridávať joints.

Každý joint určité pohyby zakáže. Ak joint povoľuje fi stupňov voľnosti, potom zakazuje: **m - fi** možností.

Od pôvodnej voľnosti všetkých telies teda odpočítame constraints vytvorené všetkými joints.

Z toho dostaneme základnú predstavu: **DOF mechanizmu = voľnosť samostatných links - constraints vytvorené joints**

Po matematickej úprave dostaneme Grüblerovu formulu:

**DOF = m(N - 1 - J) + suma fi**

Takto je už oveľa ľahšie pochopiť, čo formula vlastne robí. Nie je to náhodná rovnica. Je to presne rovnaký princíp, ktorý sme používali už pri rigid body: **Začni so všetkými možnosťami pohybu a odober nezávislé constraints.**

---

## 15. Open-chain robot – jednoduchý prípad

Robotické mechanizmy môžeme rozdeliť na dve dôležité skupiny. Prvou sú **open-chain mechanisms**, nazývané aj serial mechanisms.

Predstav si klasické priemyselné robotické rameno. Začína na pevnej základni. Z nej ide prvý joint, potom link, ďalší joint, ďalší link a tak ďalej až po end-effector. Nevytvára sa žiadna uzavretá mechanická slučka.

Veľkou výhodou open chain je, že počet DOF býva veľmi intuitívny. Ak sú všetky joints nezávislé, jednoducho spočítame ich freedoms.

Ak máme napríklad planar robotické rameno s tromi revolute joints, každý joint má 1 DOF. Robot teda má: **1 + 1 + 1 = 3 DOF.**

Ak má serial robot šesť jedno-DOF joints, má typicky **6 DOF**.

Práve preto sa pri mnohých priemyselných manipulátoroch stretneš so šiestimi joints. Šesť nezávislých DOF môže za vhodných podmienok umožniť end-effectoru ovládať všetkých šesť freedoms rigid body v 3D: tri pre position a tri pre orientation.

---

## 16. kR serial robot

V knihe sa používa všeobecný príklad k-link planar serial chain of revolute joints, označovaný ako **kR robot**.

Písmeno R znamená revolute joint a k nám hovorí, koľko takýchto joints máme.

Ak máme k revolute joints, každý z nich poskytuje 1 DOF. Takýto robot má: **k DOF.**

Grüblerova formula nám dá rovnaký výsledok. Máme k pohyblivých links plus ground, takže: N = k + 1, J = k, m = 3, f = 1

Po dosadení formula dá: **DOF = k**

Toto je dôležitá kontrola. Formula nám pri jednoduchom serial robotovi dá presne to, čo by sme intuitívne očakávali.

---

## 17. Closed-chain mechanism – keď robot vytvorí slučku

Druhou skupinou sú **closed-chain mechanisms**.

Closed chain obsahuje aspoň jednu uzavretú mechanickú slučku.

Predstav si napríklad mechanizmus, v ktorom môžeš začať na ground, postupovať cez niekoľko links a joints a nakoniec sa inou cestou vrátiť späť na ground.

Takéto mechanizmy sú zaujímavé preto, že jednotlivé joints už často nie sú nezávislé. Pohyb jedného jointu môže určovať, čo sa musí stať s ďalšími joints, aby zostala slučka fyzicky uzavretá.

Veľmi dobrým príkladom z ľudského tela je človek stojaci oboma nohami na zemi. Môžeme sledovať cestu od ground cez jednu nohu, panvu, druhú nohu a späť na ground. Tým vzniká uzavretá slučka.

Ak však zdvihneš jednu nohu zo zeme, táto konkrétna slučka sa otvorí a systém sa začne viac podobať open chain.

Closed chains preto často vyžadujú dôkladnejšie počítanie DOF a Grüblerova formula je pri nich mimoriadne užitočná.

---

## 18. Four-bar linkage – štyri joints, ale iba jeden DOF

Klasickým príkladom closed-chain mechanism je **four-bar linkage**.

Ide o planárny mechanizmus zo štyroch links, pričom jeden z nich je ground. Links sú spojené štyrmi revolute joints a vytvárajú uzavretú slučku.

Máme: N = 4, J = 4, m = 3, každý joint má 1 DOF

Po dosadení do Grüblerovej formule dostaneme: **DOF = 1**

To je veľmi zaujímavý výsledok. Mechanizmus obsahuje štyri joints, ale nemá 4 DOF.

Prečo? Pretože joints v uzavretej slučke sa nemôžu pohybovať nezávisle. Keď zmeníme jeden uhol, ostatné časti mechanizmu sa musia prispôsobiť tak, aby sa slučka nerozpojila.

Celú konfiguráciu mechanizmu tak za normálnych podmienok môžeme riadiť jedinou nezávislou hodnotou.

---

## 19. Slider-crank mechanism

Ďalším klasickým closed-chain mechanism je **slider-crank**.

Je to mechanizmus, ktorý dokáže premieňať rotačný pohyb na lineárny pohyb alebo naopak. S podobným princípom sa stretávame napríklad pri pieste v spaľovacom motore.

Mechanizmus obsahuje revolute aj prismatic joints.

V jednej interpretácii môžeme počítať štyri links vrátane ground a štyri jedno-DOF joints: tri revolute a jeden prismatic.

Grüblerova formula opäť dá: **1 DOF.**

To znamená, že keď poznáme jednu nezávislú polohu mechanizmu – napríklad uhol cranku – poloha slidera už nie je nezávislá. Je určená geometriou mechanizmu.

To je presne dôsledok closed chain.

---

## 20. Five-bar linkage a ďalšie planárne mechanizmy

Pri planar **five-bar linkage** máme päť links vrátane ground a päť revolute joints.

Teda: N = 5, J = 5, m = 3, každý joint má 1 DOF

Grüblerova formula dá: **2 DOF.** Mechanizmus teda potrebuje dve nezávislé hodnoty na určenie svojej konfigurácie.

Pri zložitejších klasických mechanizmoch, ako sú **Stephenson six-bar linkage** alebo **Watt six-bar linkage**, máme šesť links a sedem revolute joints. V oboch prípadoch Grüblerova formula dá: **1 DOF.**

Tieto príklady ukazujú, prečo nemôžeme počet DOF jednoducho odhadovať podľa počtu links alebo joints.

Mechanizmus môže mať veľa pohyblivých častí, ale constraints ich môžu natoľko previazať, že celý systém má iba jeden nezávislý stupeň voľnosti.

---

## 21. Viac joints môže byť uložených na rovnakom mieste

Pri zložitejších mechanizmoch si musíme dať pozor na situáciu, keď sa na jednom fyzickom mieste stretávajú tri alebo viac links.

Ako sme si povedali, jeden joint podľa našej definície spája iba dve telesá.

Ak sa teda na rovnakom čape stretávajú tri links, nemusí ísť o jeden revolute joint. Matematicky to môžu byť dva revolute joints umiestnené na tom istom mieste.

Toto je pri používaní Grüblerovej formule veľmi dôležité. Formula nevie, ako mechanizmus vyzerá. Dostane iba naše hodnoty N, J a freedoms jednotlivých joints. Ak mechanizmus nesprávne rozdelíme na links a joints, formula síce niečo vypočíta, ale nebude to opisovať skutočný mechanizmus.

Preto je pred každým výpočtom dôležité najprv správne vytvoriť mechanický model.

---

## 22. Grüblerova formula má dôležitú podmienku

Mohlo by sa zdať, že teraz máme univerzálnu rovnicu: spočítame links, spočítame joints, dosadíme čísla a vždy dostaneme správny DOF.

Nie je to úplne tak.

Grüblerova formula v tejto forme **predpokladá, že constraints vytvorené joints sú nezávislé**.

To znamená, že každý constraint, ktorý pri počítaní odoberáme, musí skutočne odoberať novú možnosť pohybu.

Niekedy však mechanizmus obsahuje **redundant constraints**. Určitý constraint potom už nepridáva nové obmedzenie, pretože rovnaký pohyb je zakázaný inými časťami mechanizmu.

Vtedy jednoduché počítanie constraints odoberie priveľa DOF.

Grüblerova formula potom môže dať číslo, ktoré je **nižšie** než skutočný počet DOF. V takýchto prípadoch poskytuje iba **dolnú hranicu**.

---

## 23. Parallelogram linkage – príklad, keď formula môže zavádzať

Kniha ukazuje veľmi pekný príklad **parallelogram linkage**.

Pri mechanickom spočítaní všetkých links a joints môže Grüblerova formula vyjsť: **0 DOF.**

Nula DOF by znamenala rigid structure – mechanizmus, ktorý sa vôbec nemôže pohybovať.

Keď sa však na skutočný mechanizmus pozrieme, vidíme, že sa pohybovať môže a má: **1 DOF.**

Čo sa pokazilo?

Nie formula samotná, ale jeden z jej predpokladov.

Niektoré constraints v tomto mechanizme sú redundantné. Pri výpočte sme ich počítali, akoby každý odoberal novú voľnosť, ale v skutočnosti niektoré iba opakujú obmedzenia, ktoré už mechanizmus má.

Toto je veľmi dôležitá lekcia: **Grüblerova formula nie je náhradou za pochopenie mechanizmu.** Je to veľmi užitočný nástroj, ale musíme vedieť, aké predpoklady používa.

---

## 24. Singular configuration – mechanizmus sa môže v špeciálnej polohe správať inak

S redundantnými constraints súvisí ďalší dôležitý jav: **singular configuration**.

Predstav si mechanizmus, ktorý má vo väčšine svojich polôh určitý počet možných pohybov. V jednej špeciálnej geometrickej polohe sa však niektoré links dokonale zarovnajú alebo prekryjú.

Vtedy môžu constraints, ktoré sú za normálnych okolností nezávislé, dočasne prestať byť nezávislé. Mechanizmus môže v tejto konkrétnej konfigurácii získať možnosť pohybu, ktorú v bežných konfiguráciách nemá.

Kniha to ukazuje na five-bar linkage. V špeciálnej polohe, keď sa určité links vhodne prekryjú, sa systém môže správať inak než v bežnej konfigurácii.

Takýmto špeciálnym polohám hovoríme **singularities**.

Neskôr budú singularities v robotike veľmi dôležité. Nejde iba o matematickú zvláštnosť. Môžu meniť možnosti pohybu robota, jeho schopnosť vytvárať sily a spôsob, akým ho môžeme riadiť.

---

## 25. Delta robot – DOF celého mechanizmu nemusí byť to isté ako viditeľný pohyb platformy

Teraz prichádza veľmi zaujímavý príklad: **Delta robot**.

Delta robot má pevnú hornú platformu a pohyblivú spodnú platformu, ktoré sú spojené tromi nohami. Každá noha obsahuje parallelogram mechanism.

Pri započítaní všetkých links a joints dá Grüblerova formula pre celý mechanizmus: **15 DOF.**

To môže pôsobiť zvláštne, pretože keď sledujeme pracovnú platformu Delta robota, vidíme najmä jej pohyb v troch smeroch: x, y a z. Teda tri viditeľné freedoms end-effectora.

Kam sa stratilo ďalších dvanásť?

Nestratili sa. Ide o **internal degrees of freedom** mechanizmu. Súvisia s možnosťou určitých links v parallelogramoch rotovať okolo svojich dlhých osí. Tieto pohyby existujú v mechanickom modeli, ale nemenia požadovanú polohu pracovnej platformy.

Toto nás učí veľmi dôležité rozlíšenie: **DOF celého mechanizmu nemusí byť rovnaký ako počet DOF, ktoré vidíme na end-effectore.**

Neskôr práve toto rozlíšenie povedie k pojmom configuration space a task space.

---

## 26. Stewart-Gough platform – šesť DOF vďaka paralelnému mechanizmu

Ďalším významným closed-chain robotom je **Stewart-Gough platform**.

Má dve platformy. Spodná je pevná a horná je pohyblivá. Medzi nimi sa nachádza šesť nôh.

Každá noha používa kombináciu: **universal joint - prismatic joint - spherical joint**, teda UPS.

Po správnom spočítaní links a joints a použití spatial Grüblerovej formule dostaneme: **6 DOF.**

Pohyblivá platforma teda môže vykonávať všeobecný pohyb rigid body v trojrozmernom priestore: meniť svoju polohu aj orientáciu.

Práve preto sa Stewart-Gough platformy používajú napríklad v automobilových a leteckých simulátoroch. Platforma môže človeka nakláňať, zdvíhať a posúvať tak, aby simulovala pohyb vozidla alebo lietadla.

Parallel structure má zároveň praktickú výhodu: zaťaženie platformy sa môže rozdeliť medzi viacero nôh. Nevýhodou však býva obmedzenejší rozsah pohybu v porovnaní s niektorými open-chain manipulátormi.

---

## 27. Zmena typu jointu môže pridať DOF, ktorý end-effector vôbec nevyužije

Pri Stewart-Gough platforme kniha ukazuje ešte jednu zaujímavú situáciu.

Ak niektoré universal joints nahradíme spherical joints, každá takáto noha dostane jeden dodatočný rotačný DOF. Pri šiestich nohách tak môže Grüblerova formula ukázať celkovo až: **12 DOF.**

To však neznamená, že horná platforma zrazu získala 12 nezávislých spôsobov pohybu.

Dodatočné freedoms umožňujú jednotlivým nohám vykonávať torsional rotation, teda otáčať sa okolo vlastnej pozdĺžnej osi. Takáto rotácia nemusí meniť konfiguráciu samotnej pracovnej platformy.

Opäť teda vidíme rozdiel medzi: **degrees of freedom celého mechanizmu** a **degrees of freedom jeho end-effectora**.

Toto rozlíšenie bude v robotike čoraz dôležitejšie.

---

## 28. Open chain a closed chain sa správajú zásadne odlišne

Teraz už môžeme lepšie pochopiť rozdiel medzi dvoma hlavnými typmi robotických mechanizmov.

Pri **open-chain robotovi** máme sériu links a joints bez uzavretej slučky. Ak sú joints nezávislé, počet DOF je jednoducho súčet ich freedoms.

Ak má napríklad robot šesť nezávislých revolute joints, každý s 1 DOF, robot má: **6 DOF.**

Pri **closed-chain robotovi** však geometria slučky vytvára ďalšie constraints. Joints už nemusia byť nezávislé. Preto nemôžeme jednoducho spočítať ich freedoms.

Four-bar linkage má štyri jedno-DOF joints, ale celý mechanizmus má iba 1 DOF.

Five-bar linkage má päť jedno-DOF joints, ale celý mechanizmus môže mať iba 2 DOF.

To je jeden z hlavných dôvodov, prečo je analýza parallel a closed-chain robotov zložitejšia.

---

## 29. DOF nie je to isté ako počet motorov

Tu je veľmi dôležité oddeliť dva pojmy, ktoré sa ľahko zamieňajú.

**Degree of freedom** opisuje mechanickú možnosť konfigurácie.

**Actuator** je zariadenie, ktoré vytvára silu alebo torque a mechanizmus poháňa.

Preto počet DOF nemusí byť vždy rovnaký ako počet motorov.

Pri jednoduchom serial robotovi býva často každý joint actuated, takže napríklad šesť jedno-DOF joints môže mať šesť motorov. To však nie je univerzálne pravidlo.

Pri closed-chain mechanisms môžu byť niektoré joints passive. Pohybujú sa preto, že ich k pohybu prinútia ostatné časti mechanizmu, nie preto, že majú vlastný actuator.

Keď teda počítame DOF, pýtame sa: **Koľko nezávislých hodnôt potrebujeme na opis konfigurácie mechanizmu?**

Nie: **Koľko motorov robot obsahuje?**

---

## 30. Najdôležitejšia myšlienka celej lekcie

Na začiatku môže počítanie DOF vyzerať ako učenie sa množstva joints a jednej komplikovanej formule. V skutočnosti je za celou lekciou jedna veľmi jednoduchá myšlienka.

Predstav si mechanizmus ešte predtým, než sú jeho časti navzájom obmedzené.

Každé voľné planar rigid body má 3 DOF. Každé voľné spatial rigid body má 6 DOF.

Potom pridávame joints. Každý joint niektoré relatívne pohyby povoľuje a ostatné zakazuje. Tým vytvára constraints. Po započítaní všetkých nezávislých constraints zostane počet nezávislých možností konfigurácie celého mechanizmu.

To je jeho degree of freedom.

Preto je Grüblerova formula iba matematickou verziou intuitívnej myšlienky:

**DOF = pôvodné možnosti pohybu - nezávislé obmedzenia**

A keď si z tejto lekcie zapamätáš práve toto, ďalšie časti Chapter 2 budú dávať oveľa väčší zmysel.

---

## Čo si z Chapter 2.2 odniesť

Robot sa skladá z rigid links spojených joints. Joint neurčuje iba to, ako sa link môže pohybovať – zároveň určuje všetky pohyby, ktoré vykonať nemôže.

Najčastejšie joints sú **revolute (R)** a **prismatic (P)**, oba s 1 DOF. **Helical (H)** má tiež 1 DOF, pretože jeho rotácia a translácia sú previazané. **Cylindrical (C)** a **universal (U)** majú po 2 DOF a **spherical (S)** má 3 DOF.

Pri planar mechanism má voľné rigid body 3 DOF. Pri spatial mechanism ich má 6. Ak joint povoľuje určitý počet freedoms, zvyšok predstavujú jeho constraints.

Pri počítaní links nezabúdame, že **ground sa počíta ako link**, hoci je nepohyblivý.

Pre všeobecný mechanizmus môžeme použiť **Grüblerovu formulu**:

**DOF = m(N - 1 - J) + suma fi**

kde m = 3 pre planar mechanism a m = 6 pre spatial mechanism, N je počet links vrátane ground, J je počet joints a fi je počet freedoms jednotlivých joints.

Pri jednoduchom open-chain robotovi sa DOF typicky rovná súčtu freedoms jeho joints. Pri closed-chain mechanism vznikajú ďalšie constraints zo zatvorených slučiek, takže počet joints sám o sebe o DOF nič nehovorí.

A napokon, Grüblerovu formulu treba používať s rozumom. Predpokladá nezávislé constraints. Ak sú niektoré constraints redundantné alebo sa robot nachádza v špeciálnej singular configuration, jednoduché počítanie môže dať nižší počet DOF, než mechanizmus v skutočnosti má.

Keď toto chápeš, už sa na robota nepozeráš iba ako na „rameno s niekoľkými kĺbmi". Začínaš ho vidieť ako systém rigid bodies, freedoms a constraints – a presne tento spôsob uvažovania budeme potrebovať pri ďalších témach robotiky.`;
