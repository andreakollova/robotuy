// Chapter 2.3.1 – Lekcia 5: Topológia konfiguračného priestoru
// Full lesson content - DO NOT SHORTEN

export const ch231Content = `# Lekcia 5: Topológia konfiguračného priestoru

V predchádzajúcich lekciách sme si vysvetlili, že **degrees of freedom — stupne voľnosti** hovoria, koľko nezávislých hodnôt potrebujeme na úplné určenie configuration systému. Bod pohybujúci sa po rovine má napríklad 2 DOF, planar rigid body má 3 DOF a voľné rigid body pohybujúce sa v trojrozmernom priestore má 6 DOF.

Počet DOF nám zároveň určuje dimenziu **configuration space — konfiguračného priestoru**. Ak má robot 2 DOF, jeho C-space je dvojrozmerný. Robot s 5 DOF má päťrozmerný C-space a robot so 7 DOF sedemrozmerný C-space.

Samotná dimenzia nám však ešte nepovie všetko.

Dva rôzne systémy môžu mať rovnaký počet stupňov voľnosti, a teda rovnaký počet dimenzií, ale ich configuration spaces sa môžu správať úplne odlišne. Jeden môže pokračovať do nekonečna, druhý môže mať hranice, ďalší sa môže cyklicky uzatvárať do kruhu a iný môže mať ešte zložitejšiu štruktúru.

Práve touto vlastnosťou configuration space sa zaoberá **topology — topológia**.

Topológia nám pomáha pochopiť základnú štruktúru priestoru všetkých možných configurations. Nezaujíma nás iba to, koľko má priestor dimenzií, ale aj to, **ako sú jeho body navzájom prepojené, či má hranice, či pokračuje do nekonečna alebo či sa niektoré jeho smery uzatvárajú späť do seba**.

Táto myšlienka bude neskôr veľmi dôležitá. Ovplyvní spôsob, akým budeme configuration space matematicky reprezentovať, ako budeme určovať blízkosť dvoch configurations a ako budeme plánovať pohyb robota.

---

## 01. Rovnaký počet DOF ešte neznamená rovnaký configuration space

Predstav si bod, ktorý sa môže voľne pohybovať po nekonečnej rovnej ploche. Na úplné určenie jeho position potrebujeme dve nezávislé hodnoty, napríklad x a y. Bod preto má 2 DOF a jeho configuration space je dvojrozmerný.

Teraz si predstav iný bod, ktorý sa nemôže pohybovať po rovine, ale iba po povrchu gule. Aj v tomto prípade potrebujeme na určenie jeho position dve nezávislé hodnoty. Pri Zemi by sme mohli použiť napríklad zemepisnú šírku a zemepisnú dĺžku.

Aj tento systém má teda 2 DOF a jeho configuration space má dve dimenzie.

Napriek tomu tieto dva priestory nie sú rovnaké.

Rovina pokračuje do nekonečna. Ak sa po nej vydáme stále rovnakým smerom, môžeme pokračovať ďalej a ďalej bez toho, aby sme sa automaticky vrátili na miesto, z ktorého sme vyšli.

Povrch gule sa správa inak. Nemá klasický okraj a uzatvára sa sám do seba. Ak by sme sa po povrchu Zeme pohybovali správnym smerom dostatočne dlho, mohli by sme obísť celú Zem a nakoniec sa vrátiť na miesto, z ktorého sme začali.

Oba priestory sú dvojrozmerné, ale majú **odlišnú topológiu**.

To je hlavná myšlienka celej lekcie:

**DOF nám hovorí, koľko nezávislých hodnôt potrebujeme. Topológia nám hovorí, ako je priestor všetkých týchto možností usporiadaný.**

---

## 02. Čo vlastne znamená topológia

Topológia je samostatná oblasť matematiky a jej formálna definícia môže byť pomerne abstraktná. Pre naše potreby však zatiaľ stačí intuitívne vysvetlenie.

Dva priestory môžeme považovať za **topologicky ekvivalentné**, ak dokážeme jeden plynulo zdeformovať na druhý bez toho, aby sme ho museli rozrezať alebo zlepiť časti, ktoré predtým spojené neboli.

Môžeme ho teda naťahovať, stláčať, ohýbať alebo meniť jeho rozmery. Z pohľadu topológie nám neprekáža, že sa zmení presný tvar. Podstatné je, aby sme nezmenili základný spôsob, akým je priestor pospájaný.

Predstav si napríklad povrch gumenej lopty. Môžeme ju nafúknuť a vytvoriť väčšiu guľu. Môžeme ju stlačiť a vytvoriť oválnejší tvar. Môžeme ju mierne natiahnuť alebo zdeformovať.

Geometricky sa pritom veľa vecí zmení. Zmenia sa vzdialenosti medzi bodmi, zakrivenie aj presný tvar povrchu. Z topologického pohľadu sa však nestalo nič zásadné, pretože sme povrch nikde nerozrezali ani sme v ňom nevytvorili nový otvor.

Práve tu vidíme rozdiel medzi **geometry — geometriou** a **topology — topológiou**.

Geometria sa zaujíma o presné vzdialenosti, uhly, veľkosti a tvary. Topológia sa pozerá na základnejšiu otázku: **ako je priestor ako celok prepojený**.

---

## 03. Prečo rovina a povrch gule nie sú topologicky rovnaké

Skúsme túto myšlienku použiť na rovinu a povrch gule.

Guľu môžeme naťahovať alebo meniť jej veľkosť, ale stále zostáva uzavretým povrchom. Ak by sme z nej chceli vytvoriť nekonečnú rovinu, museli by sme ju niekde otvoriť.

Dobrou intuitívnou predstavou je mapa Zeme. Zem má približne guľový povrch, ale mapu chceme vytlačiť na rovný papier. Celý povrch Zeme nedokážeme bez problémov jednoducho „rozložiť" na rovinu.

Musíme ho určitým spôsobom rozdeliť alebo geometricky deformovať.

Práve preto existujú rôzne mapové projekcie. Jedna lepšie zachováva smery, iná plochy a ďalšia vzdialenosti, ale žiadna nedokáže dokonale preniesť celý guľový povrch do roviny bez skreslenia.

Pre robotiku z toho vyplýva dôležitá vec. Ak povieme:

**„Robot má 2 DOF."**

stále sme o jeho configuration space nepovedali všetko.

Vieme, že je dvojrozmerný. Nevieme však, či má štruktúru roviny, sféry, torusu alebo úplne iného priestoru.

Dimenzia je teda iba jedna vlastnosť configuration space. **Topológia nám hovorí, akú základnú štruktúru tento priestor má.**

---

## 04. Rozdiel v topológii vidíme už pri jednom DOF

Na pochopenie tejto myšlienky nepotrebujeme začínať viacrozmernými priestormi. Úplne stačia systémy s jedným stupňom voľnosti.

Predstavme si tri priestory: nekonečnú priamku, kružnicu a konečný úsek.

V každom prípade potrebujeme na určenie konkrétneho bodu iba jednu hodnotu. Všetky tri priestory preto majú jednu dimenziu a môžu predstavovať configuration space systému s 1 DOF.

Ich štruktúra je však rozdielna.

Nekonečná priamka nemá konce. Kružnica sa po jednej celej otočke uzatvára späť do seba. Konečný úsek má naopak dva skutočné konce.

To znamená, že tri systémy môžu mať rovnaký počet DOF a pritom úplne inú topológiu configuration space.

A práve tieto tri prípady sa v robotike objavujú veľmi prirodzene.

---

## 05. Nekonečná priamka a priestor R

Predstav si objekt, ktorý sa môže pohybovať iba po jednej osi.

Na jeho configuration nám stačí jedno číslo, napríklad x. Ak pohyb nemá žiadne obmedzenie rozsahu, x môže byť ľubovoľné reálne číslo — napríklad -5, 0, 2,7 alebo 1000.

Takýto configuration space označujeme:

**R**

Presnejšie môžeme písať aj **R1**, ale pri jednorozmernom prípade sa často používa jednoducho R.

R predstavuje všetky reálne čísla, teda nekonečnú číselnú os. Nemá ľavý ani pravý koniec. Z ľubovoľného bodu môžeme pokračovať ďalej oboma smermi.

V robotike si takýto configuration space môžeme predstaviť napríklad pri idealizovanom **prismatic jointe bez joint limits**. Jeho position by mohla teoreticky nadobúdať ľubovoľnú reálnu hodnotu.

Reálny prismatic joint samozrejme nekonečný rozsah nemá. Matematický model R je však veľmi užitočný, pretože nám umožňuje oddeliť samotnú topológiu od fyzických limitov konkrétneho mechanizmu.

---

## 06. Revolute joint má namiesto priamky kružnicu S1

Teraz si predstav **revolute joint**, ktorý sa môže voľne otáčať bez joint limits.

Aj on má iba 1 DOF, pretože na jeho configuration potrebujeme jednu hodnotu — uhol θ.

Mohlo by sa preto zdať, že jeho configuration space je rovnaký ako pri prismatic jointe. Veď v oboch prípadoch zapisujeme jednu hodnotu.

Rozdiel si však všimneme po jednej celej otáčke.

Ak začneme na 0° a joint otočíme na 90°, dostaneme inú configuration. Pri 180° ďalšiu. Keď však pokračujeme až na 360°, dostaneme sa späť do rovnakého fyzického stavu ako pri 0°.

Preto:

**0° a 360° predstavujú tú istú configuration.**

Rovnako 10° a 370° predstavujú rovnakú orientation.

Uhol teda nie je obyčajná nekonečná lineárna súradnica. Po jednej celej otáčke sa configuration opakuje.

Configuration space neobmedzeného revolute jointu má preto topológiu **kružnice**, ktorú označujeme:

**S1**

Prismatic joint bez limitov má teda configuration space R, zatiaľ čo revolute joint bez limitov má S1.

Oba majú 1 DOF, ale ich topológia je úplne iná.

---

## 07. Prečo sú 359° a 1° v skutočnosti blízko

Kruhová topológia revolute jointu má veľmi praktický dôsledok.

Predstav si dve configurations:

**θ = 359°**

a

**θ = 1°**

Ak by sme sa pozerali iba na čísla na obyčajnej číselnej osi, rozdiel medzi nimi by bol 358°. Mohlo by sa preto zdať, že sú od seba veľmi ďaleko.

Fyzicky je to však nesprávna predstava.

Z 359° sa môžeme otočiť o 1° na 360°, čo je tá istá orientation ako 0°, a potom ešte o 1° na 1°.

Najkratší pohyb je teda iba:

**2°**

Práve kružnica S1 túto situáciu správne zachytáva. Na kružnici totiž miesto, ktoré v číselnom zápise označujeme ako „začiatok", a miesto označené ako „koniec" nie sú dve odlišné hranice. Sú navzájom spojené.

Toto bude veľmi dôležité pri **motion planning**. Ak má robot otočiť joint z 359° na 1°, správny planner by mal rozumieť tomu, že najkratšia cesta nemusí viesť cez takmer celú otáčku.

Topológia teda ovplyvňuje aj to, **ktoré configurations sú si blízke a aká cesta medzi nimi je prirodzená alebo najkratšia**.

---

## 08. Closed interval — jednorozmerný priestor s hranicami

Teraz si predstav prismatic joint s reálnym fyzickým rozsahom.

Povedzme, že sa môže vysunúť od 0 cm do 30 cm. Jeho configuration space potom nie je celé R, ale iba:

**[0, 30]**

Takýto priestor nazývame **closed interval — uzavretý interval**.

Hranaté zátvorky znamenajú, že obe hraničné hodnoty do priestoru patria. Joint môže byť presne na 0 cm aj presne na 30 cm.

Tento configuration space má stále jednu dimenziu. Na jeho configuration nám stále stačí jedna hodnota.

Topologicky však nie je rovnaký ako R ani ako S1.

Na rozdiel od R má dva konce. Ak sme na 30 cm, nemôžeme pokračovať na 31 cm.

Na rozdiel od S1 sa dva konce nespájajú. Ak sa dostaneme na maximálne vysunutie, ďalší pohyb tým istým smerom nás nevráti na minimálnu hodnotu.

Máme teda tri priestory s jednou dimenziou:

**R — nekonečná priamka bez koncov**

**S1 — kružnica, ktorá sa uzatvára sama do seba**

**[a, b] — uzavretý interval s dvoma hranicami**

Všetky zodpovedajú 1 DOF, ale ich topológia je odlišná.

---

## 09. Open interval a closed interval

Pri intervaloch ešte rozlišujeme **open interval — otvorený interval** a **closed interval — uzavretý interval**.

Closed interval zapisujeme:

**[a, b]**

a body a aj b sú jeho súčasťou.

Open interval zapisujeme:

**(a, b)**

a koncové body a a b doň nepatria. Môžeme sa k nim ľubovoľne približovať, ale nikdy ich priamo nedosiahneme.

Zaujímavé je, že z topologického pohľadu je open interval ekvivalentný nekonečnej priamke R.

Na prvý pohľad to vyzerá zvláštne. Interval (a, b) predsa pôsobí konečne, zatiaľ čo R pokračuje do nekonečna.

Topológia však nerieši presnú dĺžku.

Predstav si open interval ako dokonale pružný materiál. Čím viac sa približujeme k ľavému koncu, tým viac ho môžeme naťahovať smerom doľava. Rovnako môžeme pravú časť naťahovať doprava.

Keďže samotné koncové body do priestoru nepatria, nič nám nebráni v tom, aby sme ich obraz „odsunuli" až do nekonečna.

Pri closed intervale to už nejde. Body a a b sú skutočnou súčasťou priestoru a predstavujú jeho hranice.

Preto open interval a closed interval nie sú topologicky rovnaké.

---

## 10. Euclidean spaces Rn

Priestor R môžeme prirodzene rozšíriť do viacerých dimenzií.

**R1** je nekonečná priamka. **R2** je nekonečná rovina a **R3** je bežný trojrozmerný priestor, v ktorom opisujeme polohy pomocou x, y a z.

Všeobecne označujeme:

**Rn**

ako **n-dimensional Euclidean space — n-rozmerný euklidovský priestor**.

Každý bod v Rn môžeme opísať n nezávislými reálnymi číslami.

Bod v R2 potrebuje dvojicu (x, y). Bod v R3 potrebuje (x, y, z). A bod v R6 by potreboval šesť nezávislých hodnôt.

R6 si už nevieme priamo predstaviť alebo nakresliť, ale matematicky s ním môžeme pracovať úplne rovnako ako s R2 alebo R3.

To je v robotike bežné, pretože configuration spaces môžu mať mnoho dimenzií.

Musíme si však stále pamätať jednu dôležitú vec:

**n-rozmerný configuration space nemusí byť automaticky Rn.**

Počet DOF určuje dimenziu. Neurčuje topológiu.

---

## 11. Priestory Sn — kružnice a sféry

Druhou dôležitou rodinou priestorov je **Sn**.

Najjednoduchším príkladom je:

**S1 — kružnica**

Kružnica má jednu dimenziu, pretože na určenie jedného bodu na nej nám stačí jedna nezávislá hodnota.

Ďalším dôležitým príkladom je:

**S2 — povrch gule**

Je dôležité zdôrazniť slovo **povrch**. S2 nepredstavuje celý objem gule. Predstavuje iba body na jej povrchu.

Povrch Zeme môžeme približne chápať ako S2. Na určenie bodu na ňom nám stačia dve nezávislé hodnoty, napríklad latitude a longitude.

Preto má S2 dve dimenzie, aj keď samotný povrch existuje v trojrozmernom priestore.

Rovnako S1 má jednu dimenziu, hoci kružnicu bežne kreslíme v dvojrozmernej rovine.

To ukazuje ďalší dôležitý rozdiel: **dimenzia priestoru nie je to isté ako dimenzia okolitého priestoru, do ktorého je vložený**.

---

## 12. Configuration space nie je to isté ako jeho súradnice

Teraz prichádza jedna z najdôležitejších myšlienok celej lekcie.

**Configuration space existuje nezávisle od toho, aké súradnice si zvolíme na jeho opis.**

Vráťme sa ku kružnici S1.

Jeden bod na kružnici môžeme opísať pomocou jediného uhla θ. V takom prípade používame jedno číslo.

Rovnaký bod však môžeme opísať aj pomocou dvojice súradníc (x, y), ak je kružnica vložená v rovine.

Používame teda dve čísla namiesto jedného.

To však neznamená, že kružnica má zrazu 2 DOF.

Hodnoty x a y totiž nie sú nezávislé. Ak má kružnica polomer r, musia spĺňať:

**x2 + y2 = r2**

Stále teda opisujeme jednorozmerný priestor S1. Iba sme si vybrali inú reprezentáciu.

To znamená, že **topológia je vlastnosť samotného configuration space**, zatiaľ čo súradnice predstavujú iba matematický nástroj, ktorým sa rozhodneme jeho body zapisovať.

Tento rozdiel bude veľmi dôležitý v ďalšej lekcii o **Configuration Space Representation**.

---

## 13. Cartesian product — skladanie väčšieho configuration space

Configuration space robota často pozostáva z viacerých nezávislých častí.

Predstav si, že prvá časť configuration môže nadobúdať hodnoty z priestoru A a druhá z priestoru B.

Na úplné určenie configuration potrebujeme obe informácie naraz.

Celkový priestor potom zapisujeme pomocou **Cartesian product — kartézskeho súčinu**:

**A × B**

Najjednoduchším príkladom je obyčajná rovina.

Súradnica x patrí do R a súradnica y tiež do R. Ich kombinácia preto vytvára:

**R × R = R2**

Každý bod v R2 môžeme chápať ako dvojicu (x, y).

V robotike však nemusíme kombinovať iba Euclidean spaces. Môžeme napríklad spojiť lineárny priestor R a kruhový priestor S1.

Vďaka Cartesian product tak dokážeme zostaviť configuration space komplikovanejšieho robota z jednoduchších častí.

---

## 14. Configuration space planar rigid body

Predstav si mobilného robota, ktorý sa môže voľne pohybovať po nekonečnej rovnej podlahe.

Na úplný opis jeho configuration potrebujeme tri hodnoty: (x, y, θ)

Súradnice x a y určujú jeho position v rovine. Táto časť configuration patrí do:

**R2**

Uhol θ určuje orientation robota.

Orientation sa však správa cyklicky. Po jednej celej otáčke sa robot vráti do rovnakej orientation.

Preto táto časť patrí do:

**S1**

Configuration space planar rigid body je teda:

**R2 × S1**

Tento zápis obsahuje viac informácií než jednoduché tvrdenie:

**„Robot má 3 DOF."**

Počet DOF nám povedal, že C-space má tri dimenzie. Zápis R2 × S1 nám navyše hovorí, že dve dimenzie sú lineárne a jedna je cyklická.

Práve toto je sila topologického opisu.

---

## 15. PR robot — 2 DOF, ale nie R2

Predstav si robot s dvoma joints.

Prvý je **prismatic joint P** a druhý **revolute joint R**.

Ak ignorujeme joint limits, configuration space prismatic jointu je:

**R**

Configuration space revolute jointu je:

**S1**

Celý robot má teda:

**R × S1**

Robot má 2 DOF, takže jeho C-space je dvojrozmerný.

Nie je však topologicky rovnaký ako obyčajná rovina R2.

Priestor R × S1 si môžeme intuitívne predstaviť ako **povrch nekonečne dlhého valca**. Pozdĺž osi valca môžeme pokračovať stále ďalej — to zodpovedá R. Okolo valca sa však môžeme otočiť a vrátiť na to isté miesto — to zodpovedá S1.

PR robot a bod voľne sa pohybujúci po rovine teda majú oba 2 DOF, ale configuration spaces majú odlišnú topológiu.

---

## 16. Joint limits môžu topológiu zmeniť

Predchádzajúci opis predpokladal, že joints nemajú limits.

Reálne joints ich však takmer vždy majú.

Predstav si prismatic joint, ktorý sa môže vysunúť iba od 0 cm do 20 cm. Jeho configuration space už nie je R, ale:

**[0, 20]**

Teraz si predstav revolute joint, ktorý sa namiesto celej rotácie môže pohybovať iba od -90° do +90°.

Jeho configuration space už nie je celá kružnica S1, ale iba interval:

**[-90°, 90°]**

Ak má robot tieto dva joints, jeho configuration space je Cartesian product dvoch intervalov.

Geometricky si ho môžeme predstaviť ako obdĺžnikovú oblasť. Jeden smer predstavuje možné positions prismatic jointu a druhý možné angles revolute jointu.

To znamená, že pri určovaní topológie configuration space nestačí poznať iba typ jointu. Musíme poznať aj jeho **joint limits**.

Tie totiž určujú, ktoré configurations sú skutočne dostupné.

---

## 17. 2R robot — dva rotačné joints vytvoria torus

Predstav si teraz planar robotické rameno s dvoma revolute joints — **2R robot**.

Ak sa oba joints môžu otáčať o celých 360° bez joint limits, configuration space prvého jointu je S1 a druhého tiež S1.

Celý configuration space je preto:

**S1 × S1**

Tento priestor označujeme:

**T2**

a nazývame ho **two-dimensional torus — dvojrozmerný torus**.

Torus si môžeš predstaviť ako povrch nafukovacieho kruhu alebo klasickej šišky s otvorom uprostred.

Dôležité je pochopiť, že torus nemá nič spoločné s fyzickým tvarom robotického ramena. Robot nemusí vôbec vyzerať ako šiška.

Torus predstavuje **abstraktný priestor všetkých možných kombinácií dvoch joint angles**.

Každý bod na toruse predstavuje jednu konkrétnu dvojicu (θ1, θ2) a teda jednu konkrétnu configuration robota.

---

## 18. Prečo práve torus

Vznik torusu sa dá pochopiť veľmi intuitívne.

Predstav si štvorec, kde horizontálna os predstavuje uhol prvého jointu od 0° do 360° a vertikálna os uhol druhého jointu od 0° do 360°.

Každý bod v tomto štvorci predstavuje jednu kombináciu dvoch uhlov.

Lenže pri prvom jointe sú 0° a 360° rovnaká configuration. Ľavý a pravý okraj štvorca preto v skutočnosti predstavujú tie isté stavy.

Ak tieto dva okraje spojíme, štvorec sa zvinie do valca.

Teraz zostávajú dva kruhové konce valca. Tie predstavujú 0° a 360° druhého jointu.

Aj tie sú rovnakými configurations, takže ich musíme spojiť.

Keď spojíme oba konce valca, vznikne torus.

Preto platí:

**S1 × S1 = T2**

Tento príklad nádherne ukazuje, ako topológia configuration space prirodzene vzniká z fyzickej periodicity rotačných joints.

---

## 19. Tn — viac revolute joints

Myšlienku torusu môžeme rozšíriť na ľubovoľný počet neobmedzených revolute joints.

Jeden revolute joint má:

**S1**

Dva majú:

**S1 × S1 = T2**

Tri nezávislé revolute joints vytvárajú:

**S1 × S1 × S1 = T3**

A všeobecne Cartesian product n kružníc označujeme:

**Tn**

Nazýva sa **n-dimensional torus**.

Je pritom dôležité nezamieňať podobné zápisy.

**S1 × S1 nie je S2.**

S2 je povrch gule, zatiaľ čo S1 × S1 je torus T2.

Oba priestory sú dvojrozmerné, ale ich topológia je rozdielna.

A práve toto je ďalší dôkaz toho, že samotná dimension ešte configuration space úplne neopisuje.

---

## 20. Mobilný robot s 2R ramenom

Teraz môžeme spojiť viac predchádzajúcich príkladov.

Predstav si mobilnú základňu, ktorá sa môže pohybovať po rovine a meniť orientation. Jej C-space je:

**R2 × S1**

Na základňu teraz pripevníme 2R rameno.

Každý z jeho dvoch revolute joints pridáva ďalšie S1.

Celý configuration space robota preto je:

**R2 × S1 × S1 × S1**

Tri kruhové časti môžeme skrátene zapísať ako:

**T3**

takže:

**R2 × T3**

Robot má spolu 5 DOF.

Dve hodnoty určujú position mobilnej základne, jedna jej orientation a ďalšie dve joint angles ramena.

Keby sme povedali iba:

**„Robot má 5 DOF."**

poznali by sme dimension.

Zápis R2 × T3 nám však navyše hovorí, **akého typu jednotlivé dimensions sú**.

To je oveľa presnejší opis jeho configuration space.

---

## 21. Configuration space spatial rigid body

Z predchádzajúcej lekcie vieme, že voľné spatial rigid body má:

**6 DOF**

Tri potrebujeme na position.

Position môžeme reprezentovať pomocou (x, y, z) a patrí teda do:

**R3**

Pri odvodení pomocou bodov A, B a C sme zároveň videli, že po určení bodu A môžeme smer k bodu B vyberať na povrchu sféry.

Táto časť zodpovedá:

**S2**

Po určení A a B zostáva ešte jedna rotačná freedom pre bod C, ktorá sa správa cyklicky ako:

**S1**

V topologickom opise použitého v tejto časti preto dostávame:

**R3 × S2 × S1**

Dimenzie si môžeme skontrolovať. R3 má tri, S2 dve a S1 jednu.

Spolu:

**3 + 2 + 1 = 6**

čo sú presne degrees of freedom spatial rigid body.

Tento zápis nám však opäť hovorí viac než číslo šesť. Ukazuje, že translational a rotational časti configuration space majú odlišnú štruktúru.

---

## 22. Dimension a topology odpovedajú na dve rôzne otázky

Po tejto lekcii môžeme vetu:

**„Robot má 2 DOF."**

čítať presnejšie.

Vieme, že jeho configuration space má dve dimenzie. Stále však nevieme, ako sú configurations v tomto priestore usporiadané.

Môže ísť o R2, napríklad pri bode na rovine.

Môže ísť o R × S1 pri PR robotovi.

Môže ísť o T2 pri 2R robotovi.

Alebo môže ísť o S2 pri bode pohybujúcom sa po povrchu gule.

Všetky tieto priestory sú dvojrozmerné. Napriek tomu sa správajú úplne inak.

Preto si môžeme zapamätať dve oddelené otázky.

**Dimension** sa pýta:

**Koľko nezávislých hodnôt potrebujem na configuration?**

**Topology** sa pýta:

**Ako je priestor všetkých možných configurations prepojený a usporiadaný?**

Na pochopenie configuration space potrebujeme obe odpovede.

---

## 23. Prečo bude topológia dôležitá pri representation

Topológia môže zatiaľ pôsobiť abstraktne, ale jej význam sa ukáže hneď pri ďalšej téme.

Počítač potrebuje configurations reprezentovať pomocou čísel.

Pri R2 je to jednoduché. Použijeme x a y.

Pri R3 použijeme x, y a z.

Pri kružnici S1 môžeme použiť jeden uhol θ, ale okamžite sa objaví zvláštnosť medzi 359° a 0°. Číselne vyzerajú ďaleko, hoci v configuration space sú vedľa seba.

Povrch gule S2 môžeme opísať pomocou latitude a longitude. V určitých miestach, napríklad pri póloch, sa však táto reprezentácia začne správať problematicky.

Alternatívou môže byť používanie väčšieho počtu čísel spolu s constraints.

Topológia configuration space teda ovplyvňuje, **aké súradnice môžeme zvoliť a či jeden systém súradníc dokáže celý priestor reprezentovať bez problémov**.

Práve tým sa budeme zaoberať v ďalšej lekcii o **Configuration Space Representation**.

---

## Zhrnutie lekcie

Configuration space predstavuje množinu všetkých možných configurations systému a jeho dimension sa rovná počtu degrees of freedom. Samotný počet DOF však nestačí na úplné pochopenie C-space, pretože priestory s rovnakou dimenziou môžu mať úplne rozdielnu štruktúru.

Túto základnú štruktúru opisuje **topology — topológia**.

Topológia sa nezaujíma o presné rozmery alebo vzdialenosti. Dôležité je, ako je priestor prepojený, či má hranice a či sa niektoré jeho smery uzatvárajú späť do seba.

Aj systémy s jediným DOF môžu mať rôzne configuration spaces. Neobmedzený prismatic joint môžeme modelovať priestorom R. Neobmedzený revolute joint má configuration space S1. Joint s konečným rozsahom môže mať configuration space v tvare closed interval [a, b].

Priestor Rn označuje n-dimensional Euclidean space. S1 je kružnica a S2 je povrch gule. Dimenzia pritom opisuje samotný priestor, nie dimenziu okolitého sveta, v ktorom si ho vizualizujeme.

Dôležité je tiež rozlišovať medzi samotným configuration space a jeho súradnicovou reprezentáciou. Kružnica S1 môže byť opísaná jedným uhlom θ alebo dvojicou x a y spojenou constraintom x2 + y2 = r2. Configuration space je v oboch prípadoch rovnaký; mení sa iba reprezentácia.

Zložitejšie spaces môžeme skladať pomocou **Cartesian product**. Planar rigid body má C-space R2 × S1. PR robot bez joint limits má R × S1. 2R robot má S1 × S1 = T2, teda torus. Mobilná základňa s 2R ramenom môže mať configuration space R2 × T3.

Najdôležitejšia myšlienka celej lekcie je preto veľmi jednoduchá:

**DOF nám hovorí, koľko dimenzií configuration space má. Topológia nám hovorí, akú štruktúru tento priestor má.**

Dva roboty preto môžu mať rovnaký počet DOF a pritom úplne odlišný configuration space. A práve táto štruktúra neskôr ovplyvní spôsob, akým budeme robotické configurations reprezentovať, porovnávať a používať pri plánovaní pohybu.`;
