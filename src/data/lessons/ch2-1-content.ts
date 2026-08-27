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

Skutočné predmety nie sú dokonale pevné. Kovový link robotického ramena sa môže pri veľkom zaťažení nepatrne ohnúť, plast sa môže deformovať a dokonca aj oceľ pri pôsobení sily veľmi mierne zmení svoj tvar. Ak by sme však pri každom pohybe robota museli sledovať aj všetky tieto deformácie, aj jednoduchý výpočet by sa stal zbytočne komplikovaným.

Pri základnej kinematike preto používame zjednodušenie a pevné časti robota považujeme za **rigid bodies — tuhé telesá**. Rigid body je idealizované teleso, ktorého tvar a rozmery sa počas pohybu nemenia. Môže sa presúvať alebo otáčať, ale v našom modeli sa nenaťahuje, neskracuje ani neohýba.

Predstav si napríklad kovový segment robotického ramena a vyber na ňom dva body A a B. Keď sa rameno pohne, oba body môžu skončiť na úplne inom mieste v priestore. Vzdialenosť medzi nimi sa však nezmení. Ak sú od seba vzdialené 20 cm, zostanú od seba 20 cm pri každom pohybe telesa.

Práve táto pevná geometria je kľúčová. Jednotlivé body rigid body sa nemôžu pohybovať úplne nezávisle. Ak sa pohne celé teleso, všetky jeho body sa musia pohnúť tak, aby zostali zachované ich vzájomné vzdialenosti. Vďaka tomu nemusíme sledovať každý bod zvlášť. Stačí nám poznať polohu a orientáciu celého telesa a z nich vieme odvodiť polohu ktoréhokoľvek bodu na ňom.

---

## 02. Čo presne znamená degree of freedom

**Degree of freedom — stupeň voľnosti** predstavuje jednu nezávislú hodnotu, ktorú potrebujeme na úplné určenie configuration systému. Najdôležitejšie je tu slovo **nezávislú**.

Predstav si kabínu výťahu. Pohybuje sa po jednej zvislej dráhe hore alebo dole. Na určenie jej polohy nám stačí jediná hodnota, napríklad výška h. Výťah preto môžeme považovať za systém s **1 DOF**. Pohyb hore a pohyb dole pritom nepredstavujú dva rôzne stupne voľnosti. Ide iba o dva smery zmeny jednej a tej istej súradnice.

Ak sa naopak bod môže voľne pohybovať po stole, potrebujeme dve hodnoty — napríklad x a y. Hodnotu x môžeme meniť bez toho, aby sme museli meniť y, a naopak. Takýto bod má preto **2 DOF**.

Počet stupňov voľnosti môžeme teda presnejšie definovať ako **najmenší počet nezávislých reálnych hodnôt potrebných na jednoznačné určenie konfigurácie systému**. Ak je jedna hodnota automaticky určená ostatnými, nepridáva ďalší DOF.

---

## 03. Pri tuhom telese potrebujeme position aj orientation

Pri samotnom geometrickom bode nám stačí vedieť, kde sa nachádza. Pri tuhom telese je to iné, pretože má tvar a môže byť rôzne natočené.

Predstav si telefón položený v strede stola. Jeho stred môže zostať na rovnakom mieste, ale telefón môže byť otočený smerom k tebe, otočený o 90° alebo položený šikmo. Position jeho stredu sa nezmenila, ale configuration telefónu áno.

Preto v robotike rozlišujeme **position — polohu** a **orientation — orientáciu**. Position opisuje, kde sa teleso nachádza. Orientation opisuje, ako je natočené.

Pri rigid body tvoria tieto dve informácie jeden celok. Ak chceme vedieť úplnú configuration telesa, musíme poznať obe. To je dôležité aj pri robotoch. Gripper môže byť presne na správnom mieste, ale ak je nesprávne natočený, nemusí vedieť predmet uchopiť. Pri skrutkovaní musí byť nástroj správne zarovnaný s osou skrutky a pri zváraní musí byť vhodne orientovaný voči povrchu.

## 04. Planar rigid body má 3 DOF

Najskôr si pohyb telesa zjednodušíme a obmedzíme ho na jednu rovinu. Predstav si mincu položenú naplocho na stole. Môže sa po stole posúvať a otáčať, ale nesmie sa zdvihnúť, prevrátiť ani nakloniť mimo roviny.

Na určenie jej position potrebujeme dve hodnoty, napríklad x a y. Tie určujú polohu jej stredu na stole. Samotné x a y však ešte nehovoria, ako je minca natočená. Preto potrebujeme ešte uhol θ, ktorý opisuje orientation.

Configuration môžeme zapísať ako:

**q = (x, y, θ)**

Minca teda môže nezávisle meniť svoju polohu v dvoch smeroch a zároveň sa môže otáčať. Má preto:

**2 translačné DOF + 1 rotačný DOF = 3 DOF**

Takéto teleso nazývame **planar rigid body**.

Dôležité je, že slovo planar neznamená, že objekt je fyzicky dvojrozmerný. Telefón alebo mobilný robot sú stále trojrozmerné objekty. Planar znamená iba to, že ich pohyb je obmedzený na jednu rovinu.

:::

---

## 05. Prečo nemusíme opisovať každý bod telesa samostatne

Predstav si obyčajnú pevnú kartičku položenú na stole. Keď ju posunieš doprava, neposunie sa iba jej stred alebo jeden roh. Presunie sa každý bod kartičky. To isté platí pri otočení — všetky jej body zmenia svoju polohu naraz.

Teoreticky by sme mohli každému bodu priradiť vlastné súradnice. Jednému rohu by sme zapísali jeho x a y, druhému ďalšie x a y a rovnakým spôsobom by sme pokračovali pre všetky ostatné body. Takýto opis by však bol zbytočný, pretože polohy týchto bodov nie sú nezávislé.

Dôvodom je práve to, že kartičku považujeme za **rigid body** — tuhé teleso. Ak sú dva jej rohy od seba vzdialené 10 cm, zostanú od seba vzdialené 10 cm bez ohľadu na to, kam kartičku posunieme alebo ako ju otočíme. Nemôžeme jeden roh presunúť doprava a ostatné nechať na mieste. Kartička by sa tým musela natiahnuť alebo zdeformovať a už by sa nesprávala ako rigid body.

Môžeme si to ukázať na troch bodoch A, B a C. Keby išlo o tri samostatné bodky nakreslené na stole, každá by sa mohla pohybovať nezávisle od ostatných. Bod A by potreboval svoje x a y, bod B svoje x a y a bod C tiež svoje x a y. Na úplný opis troch nezávislých bodov by sme teda potrebovali šesť hodnôt, čiže by spolu mali **6 DOF**.

![Tri body na minci a ich constraints](/book/ch2/fig2-2.png)

Ak však tieto tri body označíme na jednej pevnej kartičke, situácia je úplne iná. Vzdialenosti medzi A, B a C sa nesmú meniť. Pohyb jedného bodu je preto previazaný s pohybom ostatných.

Takéto pravidlá nazývame **constraints — obmedzenia**. Constraint nám hovorí, že niečo už nemôžeme meniť ľubovoľne. V tomto prípade sú obmedzením pevné vzdialenosti medzi bodmi.

Práve preto celé rigid body nepotrebuje samostatné súradnice pre každý svoj bod. Ak dokážeme určiť, kde sa celé teleso nachádza a ako je natočené, polohy všetkých jeho bodov už z toho vyplývajú.

---

## 06. Čo potrebujeme vedieť, aby sme určili polohu celej kartičky

Zostaňme pri kartičke na stole a skúsme zistiť, koľko informácií potrebujeme na presný opis jej configuration.

Najskôr si na nej vyberieme jeden konkrétny bod A, napríklad ľavý dolný roh. Povedzme, že súradnice tohto bodu sú:

**x = 4, y = 2**

Týmito dvoma hodnotami sme presne určili, kde sa bod A nachádza. Vieme teda, kde sa nachádza jeden roh kartičky.

Lenže stále nepoznáme celú configuration kartičky.

Predstav si, že tento roh pridržíš prstom na jednom mieste. Kartičku môžeš okolo neho stále otáčať. Raz môže smerovať doprava, potom nahor, potom šikmo. Bod A zostáva celý čas presne na tom istom mieste, ale kartička očividne mení svoju configuration.

To nám ukazuje dôležitú vec: dve súradnice jedného bodu určia polohu, ale **neurčia natočenie** celého telesa.

Potrebujeme preto ešte jednu informáciu, ktorá nám povie, ako je kartička otočená.

---

## 07. Druhý bod nám pomôže určiť natočenie

Na kartičke si teraz označme druhý bod B, napríklad pravý dolný roh. Predstavme si, že spodná strana kartičky má dĺžku 10 cm. Vzdialenosť medzi A a B je teda vždy presne 10 cm.

Toto je veľmi dôležité. Keď už poznáme polohu A, nemôžeme B položiť kamkoľvek na stôl. Musí zostať presne 10 cm od A, pretože oba body patria k tej istej pevnej kartičke.

Predstav si, že bod A zostane na mieste a kartičku začneš okolo neho otáčať. Bod B bude opisovať kružnicu okolo A. Môže sa dostať nad A, napravo od neho, pod neho alebo kamkoľvek medzi tým, ale jeho vzdialenosť od A zostane stále 10 cm.

Preto už na určenie B nepotrebujeme ďalšie dve úplne nezávislé súradnice. Vzdialenosť od A totiž poznáme. Potrebujeme už iba povedať, ktorým smerom od A sa B nachádza. Tento smer môžeme opísať jedným uhlom, napríklad θ.

Teraz už máme všetko potrebné:

- **x** nám hovorí, kde je kartička vo vodorovnom smere.
- **y** nám hovorí, kde je kartička vo zvislom smere.
- **θ** nám hovorí, ako je kartička natočená.

Configuration planar rigid body preto môžeme zapísať:

**q = (x, y, θ)**

Potrebujeme teda tri nezávislé hodnoty, a preto má planar rigid body **3 DOF**.

Nie je však potrebné pamätať si argument ako „A má 2 DOF a B pridá 1 DOF". Oveľa dôležitejšia je predstava za ním: celú kartičku môžeme na stole posúvať v dvoch nezávislých smeroch a môžeme ju otáčať. To sú tri nezávislé možnosti pohybu.

---

## 08. Prečo potom nepotrebujeme súradnice bodu C?

Teraz si na kartičke označme tretí bod C, napríklad jej ľavý horný roh. Mohlo by sa zdať, že keď sme pridali nový bod, budeme potrebovať ďalšie súradnice. Lenže práve tu sa ukazuje význam rigid body.

Predstav si, že už poznáme x, y a θ. Vieme teda, kde sa kartička nachádza a ako je otočená. Môžeme si teraz ľubovoľne vybrať, kde bude C?

Nemôžeme.

Ak je kartička vysoká 6 cm, C musí byť vždy presne 6 cm od A v smere, ktorý zodpovedá tvaru kartičky. Nemôžeme ho posunúť o centimeter doľava alebo doprava bez toho, aby sme kartičku zdeformovali.

To znamená, že C sa samozrejme pri pohybe kartičky hýbe, ale **nemá vlastný nezávislý pohyb**. Jeho poloha je určená tým, kde sa nachádza a ako je natočená celá kartička.

A to isté platí pre štvrtý roh, stred kartičky aj ktorýkoľvek ďalší bod.

Predstav si napríklad malé logo vytlačené presne v strede kartičky. Keď kartičku posunieš, logo sa posunie s ňou. Keď ju otočíš, logo sa otočí s ňou. Nemusíš samostatne určovať, kam sa má logo presunúť. Jeho pohyb automaticky vyplýva z pohybu kartičky.

Preto môže rigid body obsahovať tisíce alebo milióny bodov a napriek tomu mať iba **3 DOF**, ak je jeho pohyb obmedzený na rovinu.

---

## 09. Odkiaľ sa berú dve možné polohy bodu C

Pri geometrickom odvodzovaní DOF sa často používa trochu iný príklad. Namiesto celej kartičky si predstavíme iba tri body A, B a C a poznáme vzdialenosti medzi nimi.

Povedzme, že polohy A a B už poznáme. Zároveň vieme, že C musí byť 6 cm od A.

Kde môže C byť?

Ak poznáme iba túto jednu podmienku, existuje veľa možností. Všetky body vzdialené presne 6 cm od A vytvárajú kružnicu. C teda môže byť kdekoľvek na tejto kružnici.

Teraz však pridáme druhú informáciu: C musí byť zároveň napríklad 8 cm od B. Okolo B si preto môžeme predstaviť druhú kružnicu s polomerom 8 cm.

C musí spĺňať obe podmienky naraz. Musí ležať na prvej aj na druhej kružnici. Preto sa môže nachádzať iba tam, kde sa tieto kružnice pretínajú.

Za bežných okolností dostaneme dva body — jeden na jednej strane úsečky A–B a druhý na opačnej. Ide o dve zrkadlové verzie rovnakého trojuholníka.

Prečo je tento príklad užitočný? Ukazuje nám, ako **constraints postupne zmenšujú počet možností**. Bez akéhokoľvek constraintu by C mohol byť kdekoľvek na stole. Po zadaní vzdialenosti od A môže byť iba na kružnici. Po pridaní vzdialenosti od B zostanú už iba dve konkrétne možnosti.

Čím viac nezávislých constraints pridáme, tým menej nezávislej voľnosti systému zostáva.

---

## 10. Prečo dve možné polohy nie sú ďalší DOF

Tu je potrebné rozlíšiť dve odlišné veci: možnosť plynulého pohybu a výber medzi niekoľkými oddelenými stavmi.

Predstav si otočný gombík na rádiu. Môžeš ho plynulo otáčať. Medzi uhlom 20° a 21° môže byť 20,5°, 20,25° a nekonečne veľa ďalších hodnôt. Uhol je teda **spojitá** veličina.

Teraz si predstav obyčajný vypínač. Má dve polohy — zapnuté a vypnuté. To, že existujú dve možnosti, však nie je to isté ako plynulý pohyb po jednej nezávislej súradnici.

Presne to sa deje pri dvoch možných polohách bodu C. C nemôžeme pri zachovaní všetkých vzdialeností jednoducho posúvať z jednej polohy do druhej po nejakej novej trase v rovine. Máme dve oddelené geometrické možnosti.

Takúto voľbu nazývame **discrete — diskrétna**.

Degrees of freedom, ktoré tu počítame, opisujú **nezávislé spojité možnosti pohybu**. Preto dve zrkadlové konfigurácie nepridávajú ďalší DOF.

---

## 11. Constraints nám odoberajú voľnosť

Teraz už môžeme lepšie pochopiť, čo constraint vlastne robí.

Predstav si samostatný bod C na stole. Bez akéhokoľvek obmedzenia ho môžeš položiť kamkoľvek. Potrebuješ x a y, takže má 2 DOF.

Potom pridáme pravidlo: C musí byť vždy presne 6 cm od A. Už ho nemôžeš položiť kamkoľvek. Môže sa pohybovať iba po kružnici okolo A. Z pôvodných dvoch nezávislých možností mu zostala jedna.

Pridáme ďalšie pravidlo: C musí byť zároveň 8 cm od B. Teraz už nemôže voľne cestovať ani po celej kružnici. Zostanú iba jej prieniky s druhou kružnicou.

**Constraint** teda môžeme chápať ako pravidlo, ktoré systému zakáže časť pôvodne možného pohybu.

Toto je veľmi dôležitá predstava pre robotiku. Keď neskôr spojíme dve rigid bodies pomocou jointu, joint urobí presne niečo podobné. Určité pohyby medzi nimi dovolí a ostatné zakáže.

---

## 12. Nie každý constraint odoberá ďalší DOF

Pri počítaní DOF však musíme byť opatrní. Nestačí spočítať všetky podmienky, ktoré dokážeme napísať. Niektoré totiž môžu iba opakovať informáciu, ktorú už poznáme.

Predstav si napríklad číslo x. Najskôr dostaneš podmienku:

**x = 5**

Tým je hodnota x úplne určená. Ak potom dostaneš ďalšiu podmienku:

**x < 10**

nová podmienka ti už neodobrala ďalšiu možnosť. Keďže x = 5, automaticky platí aj x < 10.

Podobná situácia môže vzniknúť pri mechanických systémoch. Môžeme zapísať viacero geometrických vzťahov, ale niektoré z nich už môžu vyplývať z ostatných.

Takýto constraint nazývame **redundant constraint — redundantné obmedzenie**. Naopak **independent constraint — nezávislé obmedzenie** prináša novú informáciu a skutočne znižuje voľnosť systému.

Preto pri jednoduchých systémoch môžeme používať predstavu:

**DOF = pôvodná voľnosť - nezávislé constraints**

Dôležité je práve slovo **nezávislé**.

---

## 13. Teraz teleso zdvihnime zo stola

Doteraz bola naša kartička stále položená na stole. Preto sme jej dovolili iba tri nezávislé pohyby: dva posuny v rovine a jedno otočenie.

Teraz ju vezmi do ruky a zdvihni ju do vzduchu. Zrazu dokáže robiť veci, ktoré na stole neboli možné.

Najskôr sa pozrime iba na jej **position — polohu**. Vo vzduchu ju môžeš posunúť doľava alebo doprava, dopredu alebo dozadu a hore alebo dole. Na presné určenie jej polohy preto potrebujeme tri súradnice:

**x, y, z**

To sú **3 translačné DOF**.

Predstav si, že x, y a z určujú polohu stredu kartičky. Ak tieto tri hodnoty poznáme, vieme presne, kde sa jej stred nachádza.

Stále však nepoznáme celú configuration kartičky. Aj keď jej stred necháme na rovnakom mieste, kartičku môžeme rôzne natáčať.

---

## 14. V 3D nestačí poznať iba polohu

Drž kartičku pred sebou a snaž sa jej stred ponechať približne na jednom mieste. Napriek tomu s ňou môžeš robiť niekoľko rôznych pohybov.

Môžeš ju otočiť doľava alebo doprava, akoby si menila smer, ktorým „pozerá". Môžeš ju nakloniť dopredu alebo dozadu. A môžeš ju nakloniť aj do strán.

Ide o tri nezávislé spôsoby, ktorými môžeme meniť orientation telesa bez toho, aby sme museli meniť jeho position.

Pre úplnú orientation v 3D preto potrebujeme ďalšie **3 rotačné DOF**.

Spolu dostávame:

**3 translačné DOF + 3 rotačné DOF = 6 DOF**

Voľné rigid body v trojrozmernom priestore má teda **6 DOF**.

Veľmi dobrá pomôcka je rozdeliť si ich na dve otázky:

**Kde sa teleso nachádza?** Na to potrebujeme 3 hodnoty.

**Ako je teleso natočené?** Na to potrebujeme ďalšie 3 hodnoty.

Kombináciu position a orientation nazývame **pose**. Pose teda opisuje úplné umiestnenie rigid body v priestore.

---

## 15. Prečo v 3D vyjde 6 DOF aj pomocou bodov

Šesť DOF môžeme odvodiť aj rovnakou geometrickou logikou ako predtým. Tentoraz však pracujeme v trojrozmernom priestore.

Začneme bodom A. Ten môžeme umiestniť kamkoľvek v priestore. Na jeho polohu potrebujeme x, y a z, takže má **3 DOF**.

Teraz pridáme B a povieme, že musí zostať napríklad 10 cm od A.

V rovine by všetky body vzdialené 10 cm od A vytvorili kružnicu. V 3D priestore však vytvoria povrch gule. B teda môže byť nad A, pod ním, pred ním, za ním alebo kdekoľvek medzi tým, pokiaľ zostáva presne 10 cm ďaleko.

Na určenie konkrétneho miesta na povrchu gule potrebujeme dve nezávislé hodnoty. Dobrou analógiou je Zem. Ak chceš určiť miesto na jej povrchu, potrebuješ napríklad zemepisnú šírku a zemepisnú dĺžku.

B preto pridáva ďalšie **2 DOF**.

Zatiaľ máme: **3 + 2 = 5 DOF**

Nakoniec pridáme C. Jeho vzdialenosť od A je pevná a jeho vzdialenosť od B je tiež pevná. Prvá podmienka vytvorí jednu guľovú plochu, druhá ďalšiu. C musí ležať na oboch súčasne.

Prienikom dvoch guľových plôch je za bežných okolností kružnica. C sa preto môže pohybovať už iba po tejto kružnici. Na určenie konkrétneho miesta na kružnici nám stačí jedna hodnota.

C teda pridáva **1 DOF**.

A dostávame:

**3 + 2 + 1 = 6 DOF**

Nie je to iný druh šiestich DOF. Je to iba druhý spôsob, ako geometricky ukázať ten istý výsledok: voľné rigid body v 3D priestore potrebuje šesť nezávislých hodnôt na úplné určenie svojej configuration.

---

## 16. Prečo potrebujeme tri body, ktoré neležia na jednej priamke

Pri predchádzajúcom argumente je ešte jedna dôležitá podmienka. Body A, B a C nesmú všetky ležať na jednej priamke.

Predstav si dlhú ceruzku a označ tri body presne pozdĺž jej stredovej osi. Teraz ceruzku chyť a otoč ju okolo jej vlastnej dlhej osi.

Ceruzka sa otočila, takže jej orientation sa zmenila. Polohy troch bodov na osi však zostali rovnaké. Z ich súradníc by sme preto nedokázali zistiť, že k otočeniu vôbec došlo.

Ak však tretí bod C umiestnime mimo tejto osi, situácia sa zmení. Pri otočení telesa okolo osi A–B sa C začne pohybovať okolo nej. Jeho poloha nám teda prezradí, ako je teleso otočené.

Preto na jednoznačné určenie pose rigid body používame tri **non-collinear points — nekolineárne body**, teda tri body, ktoré neležia na jednej priamke.

---

## 17. Planar a spatial rigid body sú rovnaký objekt s inou voľnosťou

Je dôležité nepredstavovať si planar rigid body ako „2D predmet" a spatial rigid body ako „3D predmet". V oboch prípadoch môže ísť o rovnaký fyzický objekt. Rozdiel je v tom, aké pohyby mu dovolíme.

Predstav si telefón položený naplocho na stole. Ak predpokladáme, že sa nemôže zdvihnúť ani nakloniť, môže sa posúvať iba v dvoch smeroch a otáčať v rovine. V takom modeli má **3 DOF**.

Teraz vezmi ten istý telefón do ruky. Môže sa navyše pohybovať hore a dole a môže sa nakláňať ďalšími spôsobmi. Ako voľné rigid body v priestore má **6 DOF**.

Teleso sa nezmenilo. Zmenili sa iba constraints.

Preto môžeme povedať:

**planar rigid body → 3 DOF**

**spatial rigid body → 6 DOF**

A práve constraints rozhodujú o tom, koľko z možnej voľnosti telesu zostane.

---

## 18. Prečo je 6 DOF také dôležité pre robotické rameno

Teraz sa konečne môžeme vrátiť k robotike.

Predstav si robotické rameno, ktorého úlohou je zobrať pohár zo stola. Nestačí povedať gripperu iba: „Dostaň sa na x = 40 cm, y = 20 cm, z = 10 cm."

Tieto tri hodnoty určia, kde má gripper byť, ale nie ako má byť natočený.

Gripper môže prísť na presne rovnaké miesto zhora, zboku alebo pod rôznym uhlom. Pri niektorých orientations pohár uchopí správne, pri iných doň narazí alebo ho vôbec nedokáže chytiť.

Robot preto často potrebuje riadiť celú **pose** end-effectora: jeho position aj orientation.

To znamená:

**3 DOF určujú position + 3 DOF určujú orientation = 6 DOF**

Aj preto majú mnohé priemyselné robotické ramená šesť riadených osí. Takáto konštrukcia im umožňuje meniť position aj orientation end-effectora v trojrozmernom priestore.

Samotný počet šiestich joints však ešte neznamená, že robot dokáže dosiahnuť úplne každú pose. Stále ho obmedzuje geometria ramena, dĺžka jednotlivých links, rozsahy joints, možné kolízie či singularities. DOF nám hovoria o počte nezávislých možností pohybu, nie o tom, že robot má neobmedzený dosah.

---

## 19. Čo ak má robot viac ako 6 DOF?

Ak na opis všeobecnej pose end-effectora potrebujeme šesť hodnôt, možno sa natíska otázka: Načo potom existujú robotické ramená so siedmimi DOF?

Pretože ďalší stupeň voľnosti môže robotovi poskytnúť viac možností, ako dosiahnuť rovnakú pose.

Najlepšou analógiou je ľudská ruka. Polož dlaň na stôl a snaž sa ju držať na rovnakom mieste. V mnohých polohách stále dokážeš trochu meniť polohu lakťa bez toho, aby si výrazne zmenila polohu dlane.

Dlaň teda môže zostať v rovnakej pose, zatiaľ čo configuration zvyšku ruky sa zmení.

Podobne môže 7-DOF robot dosiahnuť rovnakú pose end-effectora viacerými rôznymi configurations svojich joints. Túto vlastnosť nazývame **kinematic redundancy — kinematická redundancia**.

Takáto dodatočná voľnosť môže byť veľmi užitočná. Robot môže napríklad držať nástroj na rovnakom mieste, ale pritom presunúť „lakeť" tak, aby obišiel prekážku. Môže si tiež vybrať pohodlnejšiu configuration alebo sa vyhnúť joint limits.

Viac DOF teda nemusí znamenať, že end-effector potrebuje viac než šesť hodnôt na opis svojej pose. Znamená to, že robot má viac vnútorných možností, ako túto pose dosiahnuť.

---

## 20. Hlavná myšlienka

Pri degrees of freedom sa nesnažíme spočítať všetky smery, ktorými sa niečo „nejako môže pohnúť". Hľadáme najmenší počet nezávislých hodnôt, ktoré potrebujeme na úplný opis configuration systému.

Pri kartičke pohybujúcej sa po stole potrebujeme x a y na určenie jej position a θ na určenie orientation. Preto má planar rigid body **3 DOF**.

Keď kartičku zdvihneme do priestoru, na position potrebujeme x, y a z a ďalšie tri nezávislé hodnoty potrebujeme na orientation. Spatial rigid body preto má **6 DOF**.

Rigidita pritom vysvetľuje, prečo nepotrebujeme ďalšie súradnice pre každý bod telesa. Body rigid body sa nepohybujú nezávisle. Ich vzájomné vzdialenosti sú pevné, takže keď poznáme pose celého telesa, poznáme tým aj polohu všetkých jeho bodov.

**Constraints** túto voľnosť ďalej obmedzujú. Ak telesu zakážeme určitý pohyb, počet jeho DOF sa môže zmenšiť. A presne na tomto princípe fungujú aj robotické joints: niektoré relatívne pohyby medzi links dovolia a ostatné znemožnia.

To nás privádza k ďalšiemu kroku. Už vieme, koľko DOF má jedno voľné rigid body. Teraz môžeme začať skúmať, čo sa stane, keď viac rigid bodies spojíme joints do jedného robotického mechanizmu.

---

## Planar vs. spatial rigid body

**Planar rigid body** (tuhé teleso pohybujúce sa v rovine) je teleso, ktorého pohyb je obmedzený na jednu rovinu. Môže sa posúvať v dvoch smeroch a otáčať v rámci tejto roviny, preto má **3 DOF**. Typickým príkladom je telefón alebo minca položená na stole, ak predpokladáme, že sa nemôže zdvihnúť ani nakloniť.

Jeho configuration môžeme zapísať ako:

**q = (x, y, θ)**

**Spatial rigid body** (tuhé teleso pohybujúce sa v priestore) sa môže voľne pohybovať v trojrozmernom priestore. Môže meniť svoju polohu v troch smeroch a zároveň svoju orientation tromi nezávislými spôsobmi, preto má **6 DOF**. Príkladom je ten istý telefón, keď ho zdvihneme zo stola a voľne držíme vo vzduchu.

Pre spatial rigid body platí:

**3 DOF pre position + 3 DOF pre orientation = 6 DOF**

Najjednoduchšie si rozdiel zapamätáš takto: v rovine má voľné tuhé teleso 3 DOF, v priestore 6 DOF. Rozdiel nie je v samotnom telese, ale v tom, aký pohyb mu dovolíme.`;
