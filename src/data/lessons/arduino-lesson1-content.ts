// Arduino - Lesson 1: How to Read Electronic Schematics
// Full lesson content - DO NOT SHORTEN

export const arduinoLesson1Content = `# Lekcia: Ako citat elektronicke schemy uplne od zaciatku

Napatie = tlak. Voltage (napatie) hovori, aky velky je elektricky „tlak" medzi dvoma bodmi. Meria sa vo voltoch - V. Cim vacsi tlak, tym vacsia schopnost tlacat elektrony vodicom. Elektricky: 5 V = urcity elektricky „tlak", 12 V = vacsi, 230 V = ovela vacsi. Dolezite: napatie je vzdy rozdiel medzi dvoma bodmi. Napriklad Arduino: medzi 5 V a GND je napatie 5 V.

Prud = kolko toho skutocne tecie. Current (prud) hovori, kolko elektrickeho naboja preteka vodicom za urcity cas. Meria sa v amperoch - A. Prud je ako mnozstvo vody pretekajucej potrubim. Maly prud = malo vody, velky prud = vela vody. V elektronike napriklad: 0,01 A = 10 mA, 0,1 A = 100 mA, 1 A = 1000 mA.

Preto spolu suvisia: vacsie napatie → za rovnakych podmienok vacsi prud. Ale: vacsi odpor → za rovnakych podmienok mensi prud. To je presne zaklad Ohmovho zakona.

---

Ak elektronicku schemu vidis prvykrat, je uplne normalne, ze vyzera ako zmes ciar, cikcakov, sipok, pismen a zvlastnych znaciek. Netreba sa ju snazit naucit ako jeden obrovsky obrazok. Ovela jednoduchsie je pochopit, co jednotlive znacky predstavuju a preco ich vobec pouzivame.

Najlepsie je predstavit si elektronicku schemu ako mapu mesta. Mapa mesta ti nekreslí kazdy strom, okno a tehlu. Ukazuje iba to, co potrebujes na orientaciu: cesty, krizovatky, budovy a ich vzajomne spojenie. Elektronicka schema robi presne to iste s elektrickym obvodom. Ukazuje komponenty a to, ako su medzi sebou elektricky prepojene.

---

## 1. Co je schematic (elektronicka schema)?

Predstav si, ze chces postavit uplne jednoduche svetlo. Mas bateriu, LED, resistor (rezistor) a zopar vodicov. V skutocnosti bude kazdy z tychto komponentov vyzerat uplne inak. Bateria bude valcek alebo hranol, resistor bude maly farebny valcek, LED bude plastova "ziarovka" a vodice budu kabliky.

Keby sme vsak kazdy komponent kreslili tak, ako naozaj vyzera, jednoduchy obvod by sa dal este zvladnut, ale pri robotovi, pocitaci alebo riadiacej doske by vznikol uplny chaos. Preto ma elektronika vlastny jazyk znaciek. Resistor ma jednu znacku, capacitor (kondenzator) inu, switch (spinac) inu a transistor (tranzistor) zase inu.

**Schematic (elektronicka schema)** teda nie je obrazok toho, ako zariadenie fyzicky vyzera. Je to plan, ktory hovori: **Ake komponenty sa v obvode nachadzaju a ako su elektricky prepojene.**

![Prehlad zakladnych elektronickych symbolov](/book/arduino/lesson1/1.png)

---

## 2. Tri veci, ktore budes na scheme vidiet stale

Predtym nez zacneme jednotlive komponenty, potrebujeme tri jednoduche pojmy:

**Component (komponent)** je samotna elektronicka suciastka, napriklad resistor, LED alebo transistor.

**Terminal / Pin (vyvod / pin)** je miesto, cez ktore sa komponent pripaja k zvysku obvodu.

**Wire (vodic)** je elektricke spojenie medzi komponentmi.

Predstav si obycajnu lampu zapojenu do zasuvky. Lampa je komponent. Kovove kontakty na zastrcke su terminals. Kabel medzi zasuvkou a lampou je wire.

---

## 3. Resistor (rezistor): prekazka pre elektricky prud

Zacneme jednym z najbeznejsich komponentov.

**Resistor (rezistor)** kladie elektrickemu prudu odpor. Velmi zjednodusene si ho mozes predstavit ako zuzenie na ceste.

Predstav si dialanicu so styrmi pruhmi, ktora sa zrazu zuzi na jeden. Auta stale mozu prechadzat, ale ich pohyb je viac obmedzeny. Resistor robi nieco podobne elektrickemu prudu.

Rezistor sa pouziva hlavne preto, aby obmedzil elektricky prud v obvode. Da sa nan pozerat ako na zuzenie potrubia, ktorym tecie voda.

Predstav si jednoduchy Arduino obvod s LED:

Arduino 5 V → LED → rezistor → GND

LED sama o sebe nevie povedat: „vezmem si iba 15 mA". Ked ju pripojis priamo na zdroj, moze nou tiect prilis velky prud a LED sa moze poskodit. Navyse mozes nadmerne zatazit aj vystupny pin Arduina. Ale rezistor nerobi iba toto.

Rezistory sa v elektronike pouzivaju aj na delenie napatia, nastavovanie hodnot v obvodoch alebo ako pull-up/pull-down rezistory pri tlacidlach a digitalnych vstupoch. A este jedna dolezita vec: rezistor tu „prebytocnu" elektricku energiu neznici. Premeni cast elektrickej energie najma na teplo.

Kolko rezistorov moze byt v obvode? Prakticky kolkolvek. Jeden obvod moze mat 1 rezistor, 10 rezistorov, 100 rezistorov, v zlozitej elektronike pokojne tisice. Rezistor ma vzdy dva vyvody, takze elektricky je vzdy pripojeny medzi dva body obvodu. Ale nie vzdy to vyzera ako jednoduche „Arduino → rezistor → komponent".

Co vsetko moze byt spojene s rezistorom? Takmer vsetko. Rezistor mozes najst pri LED, tlacidle, tranzistore, senzore, mikrokontroleri, displeji, kondenzatore, fotorezistore a mnozstve dalsich komponentov. Ale pozor: neznamena to, ze kazdy komponent potrebuje rezistor. Napriklad hotovy senzorovy modul pre Arduino uz moze mat potrebne rezistory zabudovane priamo na doske.

Moze mat jeden komponent viac rezistorov? Ano. Napriklad pri jednej LED vacsinou potrebujes jeden rezistor na obmedzenie prudu. Ale pri tranzistore moze byt pokojne viac rezistorov: Arduino → rezistor → tranzistor → motor - viac kusov rezistorov.

Takze JA vybieram, kolko prudu chcem? Ano. Toto je podstatne. Ty ako clovek navrhujuci obvod povies napriklad: „Mam LED a nechcem, aby cez nu tieklo viac nez priblizne 10 mA." Pozries sa na napatie, vlastnosti LED a vypocitas vhodnu hodnotu rezistora. Potom fyzicky vlozis napriklad 330 Ω rezistor. Rezistor uz nic neprogramuje. Jeho odpor je jednoducho 330 Ω. Ak ho vymenis za 1 kΩ, prud bude mensi. Ak ho vymenis za 100 Ω, prud bude vacsi.

Arduino moze ovladat prud, ale to je ina vec. Tu moze vzniknut zmatok, pretoze pri Arduine pises napriklad: analogWrite(ledPin, 100); a LED svieti slabsie. Ale Arduino tym nemeni hodnotu rezistora. Rezistor je stale napriklad 220 Ω.

A este dolezita vec: jeden rezistor moze ovplyvnovat viac komponentov. Predstav si: 5 V → rezistor → LED → LED → GND. Tu mas jeden rezistor a dve LED v serii. Rezistor ovplyvnuje prud celou touto vetvou. Ale mozes mat aj zapojenie, kde kazda vetva ma vlastny rezistor: 5 V sa rozdeli na dve vetvy, kazda s vlastnym rezistorom a LED. To je casto lepsie, pretoze kazdu vetvu vies navrhnut samostatne. Pri rezistoroch v serii sa ich odpory scitaju.

Jeho vlastnost sa nazyva **resistance (elektricky odpor)** a meriame ju v **ohms (ohmoch), Ω**.

![Symboly resistora - americky a medzinarodny](/book/arduino/lesson1/2-resistors.png)

Ak vidis: **R1 1 kΩ** znamena to: R = resistor, 1 = prvy resistor v scheme, 1 kΩ = jeho odpor. Predpona kilo znamena tisic: **1 kΩ = 1000 Ω**.

---

## 4. Preco mame R1, R2, R3...?

Predstav si elektronicku dosku, na ktorej je 50 resistorov. Ak ti niekto povie: "Skontroluj resistor," nepomaze ti to. Ak vsak povie: "Skontroluj R17," presne vies, o ktorom komponente hovori.

Preto dostava kazdy komponent na scheme svoje oznacenie, ktore sa nazyva **reference designator (referencne oznacenie)**.

Resistory byvaju: **R1, R2, R3...**
Capacitors: **C1, C2, C3...**
Diodes: **D1, D2, D3...**
Transistors: **Q1, Q2, Q3...**

---

## 5. Variable resistor (premenný rezistor) a Potentiometer (potenciometer)

Porovnanie:

**1. Normalny rezistor - ked chceme STALY odpor.** Povedzme, ze vies: „Tato LED potrebuje 220 Ω rezistor." Tak jednoducho pouzijes fyzicky 220 Ω rezistor: Arduino ──[ 220 Ω ]── LED ── GND. Jeho hodnota sa pocas pouzivania nemeni. Typicky pripad: ochrana LED, nastavenie prudu, pull-up/pull-down atd.

**2. Variable resistor - ked chceme odpor RUCNE MENIT.** Predstav si, ze nechces mat stale 220 Ω, ale chces si odpor nastavovat. Mas napriklad variable resistor 0-10 kΩ. Otocis/nastavis ho: 100 Ω, 2 kΩ, 5 kΩ, 10 kΩ. Tym priamo menis odpor, a teda ovplyvnujes napriklad kolko prudu tecie. Historicky/intuitivny priklad je regulacia jasu: 5 V ── VARIABLE RESISTOR ── ziarovka ── GND. Vacsi odpor → mensi prud → slabsie svietenie. Tu variable resistor pouzivame ako 2-terminal device - zaujima nas jednoducho nastavitelny odpor medzi dvoma bodmi.

**3. Potentiometer - ked chceme nastavitelny signal/napatie.** Potenciometer ma 3 vyvody a toto je velmi caste pri Arduine. Predstav si otocny gombik: dva krajne vyvody das napriklad na 5 V a GND, a prostredny wiper ide do Arduina (napr. A0). Ked otacas gombikom, wiper sa pohybuje po odporovej drahe. Arduino potom moze dostat napriklad: gombik vlavo → 0 V, gombik v strede → ~2,5 V, gombik vpravo → 5 V. Arduino teda dokaze zistit: „Aha, pouzivatel otocil gombik priblizne do polovice." A ty potom naprogramujes, co to ma znamenat.

Normalny resistor ma pevnu hodnotu. Niekedy vsak potrebujeme odpor menit. Na to existuje **variable resistor (premenný rezistor)**. Na jeho symbole vidis klasicky resistor a cez neho sipku. Ta sipka ti jednoducho hovori: **Tuto hodnotu vieme nastavovat.**

**Potentiometer (potenciometer)** vyzera podobne ako variable resistor, ale ma **tri terminals**. Dva vyvody su na koncoch odporovej drahy a treti sa nazyva **wiper (jazdec)**.

![Potenciometre a premenne rezistory](/book/arduino/lesson1/3l-potentiometers-and-variable-resistors.png)

---

## 6. Capacitor (kondenzator): maly zasobnik elektrickeho naboja

**Capacitor (kondenzator)** si predstav ako malu nadrz, ktora dokaze na urcity cas ulozit elektricky naboj.

Predstav si, ze kondenzator (capacitor) je malicka docasna zasobaren elektriny. Nieco ako mini bateria, ale s velkym rozdielom: kondenzator sa vie velmi rychlo nabit a velmi rychlo vybit.

Predstav si Arduino s motorom. Mas zdroj, ktory napaja Arduino: ZDROJ → ARDUINO. Vsetko funguje. Teraz ale zapnes motor. Motor pri rozbehu moze na kratky okamih potrebovat vela prudu. Predstav si, ze zdroj v tej chvili nestiha dostatocne rychlo reagovat. Napatie moze na okamih poklasnut a elektronika moze mat problem.

A prave sem mozeme pridat kondenzator - pripojeny medzi napajanie a GND, vedla Arduina. Kym je vsetko v pohode, kondenzator sa nabije. Potom pride kratky moment, ked obvod potrebuje viac energie. Kondenzator moze cast svojho ulozeneho naboja rychlo odovzdat. A potom sa zase dobije. Ale je tu jedna dolezita vec: kondenzator nemozes len tak zapojit „o hocico". Musis vediet kam ho zapajas, ake je tam napatie, aku ma kapacitu a pri polarized capacitor aj spravnu polaritu. Kondenzator sa neprogramuje. Ked ho spravne pripojis k zdroju (5 V → capacitor → GND), automaticky sa zacne nabijat. Ked sa podmienky v obvode zmenia tak, ze ma kam odovzdat naboj, automaticky sa zacne vybijat. Robi to fyzika, nie Arduino program.

Jeho vlastnost sa nazyva **capacitance (kapacita)** a jej jednotkou je **farad, F**. Jeden farad je vsak v beznej elektronike casto velmi velka hodnota, preto uvidis mensie jednotky: **μF** = microfarad, **nF** = nanofarad, **pF** = picofarad.

Na symbole capacitore vidis dve ciary oproti sebe - dve vodive casti oddelene izolacnou vrstvou.

**Non-polarized capacitor** - nezalezi na orientacii.

**Polarized capacitor** - ma presne urcene, ktory terminal ma byt na pozitivnej strane (+) a ktory na negativnej.

![Typy kondenzatorov](/book/arduino/lesson1/4-capacitors.png)

Arduino + motor: non-polarized capacitor. DC motor pri otacani moze vytvarat elektricke rusenie. Preto mozes vidiet maly keramicky kondenzator, napriklad 100 nF, priamo cez svorky motora. Tento byva non-polarized. To znamena: nema urcene + a -. Mozes teda jeho dva vyvody otocit, je mu to jedno. V tomto pripade je jeho hlavna uloha potlacat kratke vysokofrekvencne rusenie vytvarane motorom.

Arduino + motor: polarized capacitor. Teraz mozes mat pri napajani motora vacsi kondenzator, napriklad elektrolyticky 470 uF. Tento moze byt polarized. Ma + vyvod a - vyvod a musis respektovat polaritu: + capacitor → vyssi potencial, napr. +5 V, - capacitor → GND. Nie opacne. Pri elektrolytickom kondenzatore moze nespravna polarita viest k jeho poskodeniu a v nevhodnych podmienkach aj k prasknutiu/ventilovaniu.

Preco by som pri motore pouzila OBA? Pretoze mozu riesit dva rozdielne problemy. Maly 100 nF ceramic, non-polarized je velmi rychly a vyborny na kratke rusenie. Vacsi napr. 470 uF electrolytic, polarized ma ovela vacsiu kapacitu a moze pomoct pri vyraznejsich zmenach napajania, napriklad ked sa motor rozbiaha. Nie je teda pravidlo: polarized = pre motor, non-polarized = pre Arduino. Nie. Typ vybieras podla ulohy, ktoru ma kondenzator v obvode plnit.

A mozes ho zapojit „o hocico"? Nie. Kondenzator ma okrem kapacity aj maximalne dovolene napatie. Napriklad na kondenzatore moze byt: 470 uF 16 V.

---

## 7. Inductor (cievka)

Dalsia znacka vyzera ako navinuty drot. To je **inductor (cievka)**. Symbol dokonca trochu pripomina realny komponent, pretoze cievka naozaj moze byt vytvorena navinutym vodicom.

Predstav si to takto: Capacitor: „Nechcem, aby sa mi napatie prudko menilo." Cievka: „Nechcem, aby sa mi prud prudko menil."

Co teda robi cievka? Predstav si, ze chces motoru dodavat prud, ale prud je velmi „roztraseny" - prudko skace hore a dole. Cievka sa snazi tieto rychle zmeny prudu spomalit a vyhladi ich. Nie je to tak, ze by cievka „vyrabala spravny prud". Len brani tomu, aby sa prud zmenil okamzite.

Preco? Ked cievkou tecie prud, vytvori sa okolo nej magneticke pole. Ked prud rastie, cievka si cast energie ulozi do magnetickeho pola. Ked sa potom prud snazi prudko klesnut, cievka ulozenu energiu odovzda a snazi sa udrzat prud v pohybe.

O co ju mozes pripojit? Cievka ma dva vyvody, rovnako ako rezistor.

Jej vlastnost sa nazyva **inductance (indukcnost)** a meriame ju v **henry, H**. Oznacenie cievok byva: **L1, L2, L3...**

Preco nie I? Pismeno I sa v elektronike bezne pouziva pre electric current (elektricky prud), preto sa pre inductors pouziva L.

![Symboly induktorov](/book/arduino/lesson1/5-inductors.png)

---

## 8. Switch (spinac): elektricke dvere

**Switch (spinac)** patri k najjednoduchsim znackam na pochopenie. Predstav si obycajny vypinac svetla. Ked je zapnuty, elektricka cesta je spojena. Ked je vypnuty, elektricka cesta je prerusena.

![Zakladne typy spinacov](/book/arduino/lesson1/6-switches.png)

**SPST** = Single Pole Single Throw = jednoduchy ON/OFF switch.

**SPDT** = Single Pole Double Throw = jedna cesta, ktora sa moze pripojit k jednemu z dvoch kontaktov.

![SPDT a SP3T switches](/book/arduino/lesson1/6-switches-b.png)

**DPDT** = Double Pole Double Throw = ovladaju sa dve elektricke cesty naraz. Prerusovana ciara medzi nimi znamena: su mechanicky spojene.

![DPDT switch](/book/arduino/lesson1/6-switches-c.png)

Kedy pouzivame ktory switch? Najjednoduchsi je SPST (Single Pole Single Throw). Ten vie iba jednu vec: elektricku cestu spojit alebo prerusit. Predstav si napriklad LED: bateria → switch → LED → GND. Ked switch zapnes, cesta sa uzavrie a LED svieti. Ked ho vypnes, cesta sa prerusi a LED zhasne. SPST teda pouzijes vzdy, ked chces nieco jednoducho ON/OFF: zapnut alebo vypnut LED, zapnut napajanie zariadenia, spustit motor, povedat Arduinu „tlacidlo je stlacene".

SPDT (Single Pole Double Throw) je trochu iny. Nehovori iba ON/OFF, ale skor: „Kam mam tuto jednu cestu pripojit?" Ma jeden spolocny kontakt a dve mozne cesty. Switch teda moze spolocny kontakt prepojit bud s A, alebo s B. To je uzitocne napriklad vtedy, ked chces prepinat medzi dvoma rezimami zariadenia. Napriklad robot moze mat: switch → AUTO mode alebo MANUAL mode. Alebo mozes prepinat, ktory z dvoch obvodov dostane signal. SPDT sa pouziva aj pri klasickom schodiskovom vypinaci, ked chces jedno svetlo ovladat z dvoch miest.

A naco je potom DPDT? DPDT (Double Pole Double Throw) si mozes predstavit ako dva SPDT switche mechanicky spojene dokopy. Ked prepnes packu, obe cesty sa prepnu sucasne. To je velmi uzitocne napriklad pri DC motore. DC motor sa moze otacat jednym smerom: + → MOTOR → -. Ak vsak polaritu otocis: - → MOTOR → +, motor sa zacne otacat opacnym smerom. A prave DPDT switch dokaze byt zapojeny tak, ze jednym prepnutim naraz prehodi oba vodice motora. Takze mozes mat: poloha 1 → motor doprava, poloha 2 → motor dolava. To je pekny prakticky priklad toho, preco potrebujeme ovladat dve elektricke cesty naraz.

Co vlastne znamena Pole a Throw? Toto ti velmi pomoze pri citani nazvov. Pole hovori, kolko nezavislych elektrickych ciest switch sucasne ovlada. Throw hovori, medzi kolkymi kontaktmi moze kazda cesta prepinat. Preto: SPST = 1 cesta, 1 moznost = ON/OFF. SPDT = 1 cesta, 2 moznosti = A alebo B. DPST = 2 cesty, 1 moznost = dve cesty ON/OFF naraz. DPDT = 2 cesty, 2 moznosti = dve cesty prepnes medzi A/B naraz.

A preto ked na scheme pri DPDT vidis medzi dvoma castami switcha prerusovanu ciaru, nie je to elektricky vodic. Znamena: „Tieto dva switche su mechanicky spojene." Pohnes jednou packou → prepnu sa oba naraz.

Este jedna zaujimava vec: switch nemusi zapinat priamo motor alebo LED. Pri Arduine sa velmi casto pouziva iba ako vstupny signal. Arduino zisti, ci je switch v urcitej polohe, a az program rozhodne, co sa ma stat. Takze maly switch moze napriklad prepinat cely robot medzi manual mode, autonomous mode alebo menit jeho spravanie.

---

## 9. Power source (zdroj napajania)

Preco elektronicky obvod potrebuje energiu? Predstav si jednoduchy obvod: bateria → LED → spat do baterie. Samotne spojenie LED a vodicov nestaci. Potrebujeme nieco, co vytvori napatie, teda rozdiel elektrickeho potencialu, ktory moze sposobit pohyb elektrickeho naboja obvodom. Tym „niecim" je zdroj elektrickej energie.

Velmi zjednodusene si to mozes predstavit ako vodu v potrubi. Nestaci mat potrubie a vodne koleso. Potrebujes rozdiel tlaku, ktory prinuti vodu tiect. V elektrickom obvode podobnu ulohu zohrava napatie. Bateria napriklad vytvori medzi svojimi polmi rozdiel napatia. Ked je obvod uzavrety, moze nim tiect elektricky prud a LED dostava energiu, ktoru premena najma na svetlo a teplo.

Preco potom existuje DC a AC? Rozdiel je v tom, ako sa elektricky prud v case sprava.

**DC = Direct Current = jednosmerny prud.** Pri DC ma prud staly smer. Typickym prikladom je bateria. Ma oznaceny kladny + a zaporny - pol a polarita sa sama od seba neprehadzuje. Preto sa DC velmi casto pouziva v elektronike: Arduino, senzory, LED, mikrokontrolery, telefony, notebooky, roboty... Napriklad Arduino Uno typicky pracuje interne s nizkym DC napatim, nie priamo s 230 V AC zo zasuvky.

**AC = Alternating Current = striedavy prud.** Pri AC sa smer prudu periodicky meni. Namiesto stale rovnakeho smeru sa strieda: → → → ← ← ← → → → ← ← ←. A presne takyto typ elektrickej energie dostavame zo zasuvky. Na Slovensku je elektricka siet priblizne: 230 V AC, 50 Hz. 50 Hz znamena, ze elektricka velicina prechadza 50 uplnymi periodami za sekundu. Pri beznom sietovom AC sa napatie plynulo meni zo zapornej hodnoty cez nulu do kladnej a zase spat.

Preco mame v zasuvkach AC a nie jednoducho DC? Jednym z hlavnych historickych a technickych dovodov je prenos elektrickej energie na velke vzdialenosti. Pri prenose chceme pouzivat velmi vysoke napatie, pretoze pre rovnaky prenasany vykon potom moze byt prud mensi a straty vo vedeni su nizsie. AC ma velku prakticku vyhodu: pomocou transformatorov sa jeho napatie da velmi efektivne zvysovat a znizovat. Elektraren teda moze energiu posielat vedenim pri velmi vysokom napati a transformatory ho postupne znzia na uroven pouzivanu domacnostami.

Ale telefon predsa zapajame do AC zasuvky... Ano - ale telefon samotny nepouziva 230 V AC priamo. Medzi zasuvkou a telefonom mas nabijacku: ZASUVKA 230 V AC → nabijacka → nizke DC napatie → TELEFON. Nabijacka teda okrem ineho zabezpecuje premenu elektrickej energie zo sietoveho AC na DC vhodne pre elektroniku. Podobne je to s notebookom, routerom ci mnozstvom dalsich zariadeni.

Preto si na zaciatok mozes zapamatat velmi uzitocny obraz: AC → elektricka siet a distribucia energie. DC → baterie a vacsina elektronickych obvodov. Nie je to absolutne pravidlo - existuju aj vysokonapatiove DC prenosove siete a mnozstvo dalsich vynimiek - ale pre zaciatok v elektronike a pri Arduine je to velmi dobry mentalny model.

A este jedna vec: „naboj" ≠ „prud". Tieto pojmy sa ti mozno teraz trochu miesaju: Elektricky naboj → vlastnost castice. Elektron ma zaporny naboj. Elektricky prud → kolko naboja prejde urcitym miestom za urcity cas. Napatie → rozdiel elektrickeho potencialu, ktory moze „pohanat" naboj. Takze pri AC sa nevyraba kazdu chvilu novy naboj. Meni sa napatie a elektricke pole → preto sa meni smer usporiadaneho pohybu nabojov → preto mame striedavy prud. A prave toto je aj dovod, preco obrazok AC ako vlnovky neznamena, ze elektrony fyzicky lietaju po sinusoide. Ta vlnovka zobrazuje, ako sa napriklad napatie alebo prud meni v case.

Elektronicky obvod potrebuje energiu. **DC = Direct Current (jednosmerny prud)** - typicky bateria. **AC = Alternating Current (striedavy prud)** - typicky elektricka zasuvka.

![DC a AC zdroje napatia](/book/arduino/lesson1/7dc-or-ac-voltage-sources.png)

Zacnime DC - bateriou. Predstav si obycajnu bateriu. Ma dva poly: (-) BATERIA (+). Chemicke reakcie vo vnutri baterie udrzuju medzi polmi elektricke napatie a pevnu polaritu. Jeden pol zostava + a druhy -. Ked vytvoris uzavrety obvod (+ → LED → - → BATERIA → +), zdroj stale vytvara elektricke pole s rovnakou orientaciou. Preto ma konvencny elektricky prud stale rovnaky smer. A odtial nazov: Direct Current → jednosmerny prud → DC. Maly detail: elektrony sa v kovovom vodici pohybuju opacne nez smer, ktory konvencne oznacujeme ako smer elektrickeho prudu. V elektronike vsak standardne pracujeme s konvencnym smerom prudu od + k -.

A teraz AC - preco sa smer meni? Pretoze zdroj AC napatia pravidelne meni svoju polaritu. Predstav si hypoteticky zdroj, ktoreho svorky sa spravaju takto: chvilu je + vlavo a - vpravo, prud tecie doprava. Potom sa polarita obrati: - vlavo a + vpravo, prud tecie dolava. Potom sa polarita obrati znova. A znova. A znova. Takze AC nie je „zvlastny prud, ktory sa sam rozhodne otocit". Zdroj meni polaritu → elektricke pole meni smer → prud meni smer.

Ale PRECO elektraren vytvara striedave napatie? V elektrarniach sa elektricka energia casto vyraba pomocou generatora. Generator vyuziva elektromagneticku indukciu: relativny pohyb magnetickeho pola a cievok sposobuje vznik elektrickeho napatia. Ako sa rotor generatora otaca, meni sa magneticky tok cez cievky. Pocas jednej casti otocenia vznikne napatie s jednou polaritou. Po dalsej polovici otocenia sa indukovana polarita obrati. A pri dalsom otacani znova. Preto generator prirodzene dokaze vytvarat striedave napatie.

Predstav si to ako tlacenie vody. DC je ako pumpa, ktora tlaci vodu stale jednym smerom. AC je ako pumpa, ktora ju tlaci chvilu doprava a chvilu dolava. Pri AC teda naboj vo vodici nemusi cestovat „zo Slovenska az do elektrarne a spat". Lokalne sa jeho pohyb v dosledku meniaceho sa elektrickeho pola periodicky meni.

A co znamena nasich 50 Hz? V slovenskej elektrickej sieti mame 50 Hz AC. To znamena 50 celych period za sekundu. Horna cast vlny je jedna polarita, dolna cast je opacna polarita. A cely tento cyklus sa zopakuje 50x za sekundu.

💡 Zaujimavost
V Europe vratane Slovenska je standard 50 Hz. V USA, Kanade a casti dalsich krajin je standard 60 Hz. Nie je to preto, ze by 50 Hz bolo jednoznacne lepsie nez 60 Hz. Je to do velkej miery vysledok historickeho vyvoja elektrickych sieti a standardizacie. Pri 60 Hz sa teda napatie a elektricke pole menia o nieco rychlejsie nez pri 50 Hz. Preco jednoducho nepouzivame napriklad 1000 Hz? Pretoze neexistuje jedna frekvencia, pri ktorej je vsetko najlepsie. Je to technicky kompromis. Vyssia frekvencia moze napriklad umoznit mensie transformatory a niektore motory mozu byt pri nej navrhnute kompaktnejsie. Zaroven vsak so zvysujucou sa frekvenciou rastu niektore straty a komplickacie pri prenose a v elektrickych zariadeniach. Pri velmi nizkej frekvencii by zase transformatory a motory museli byt spravidla vacsie a mohli by byt menej prakticke. Preto sa 50 a 60 Hz ukazali ako prakticke sietove frekvencie a historicky sa okolo nich vybudovala obrovska infrastruktura. Takze: 50 Hz nie je „slabsie" nez 60 Hz. 60 Hz nie je automaticky „lepsie" nez 50 Hz. Su to jednoducho dva hlavne standardy. A je tu este zaujimava vec: frekvencia nemusi byt vzdy 50 alebo 60 Hz. Napriklad v letectve sa tradicne pouziva aj 400 Hz AC, pretoze vyssia frekvencia umoznuje zmensit hmotnost niektorych transformatorov, motorov a dalsich elektrickych komponentov - a v lietadle je hmotnost velmi dolezita. Ciaze otazka „aka frekvencia je najlepsia?" ma odpoved: zalezi na tom, na co elektrinu pouzivame. Pre celostatnu elektricku siet je v Europe standardom 50 Hz a vsetky pripojene zdroje a zariadenia su navrhnute tak, aby s touto sietou fungovali.

Najdolezitejsie je teda toto: DC bateria - chemicka reakcia udrzuje poly + a - na rovnakych stranach → smer sa nemeni. AC generator - otacanie a elektromagneticka indukcia vytvaraju napatie, ktoreho polarita sa periodicky obracia → smer prudu sa periodicky meni.

---

## 10. Battery (bateria)

Battery je zdroj elektrickej energie, ktory v elektrickom obvode vytvara napatie (voltage). Prave toto napatie umoznuje, aby po uzavreti obvodu zacal tiect elektricky prud (current). Bateria ma dva vyvody - positive terminal (+) a negative terminal (-). V jednoduchom DC obvode sa konvencny smer prudu oznacuje od + polu cez obvod spat k - polu.

Symbol baterie tvori dvojica rozne dlhych ciar. Dlhsia ciara = positive terminal (+), kratsia ciara = negative terminal (-).

![Symboly baterii](/book/arduino/lesson1/8-batteries.png)

Na co sa bateria typicky pripaja? Bateria napaja ostatne komponenty obvodu. Moze byt napriklad pripojena k resistoru (rezistoru), LED, ziarovke, motoru, senzoru alebo celemu elektronickemu obvodu.

Bateria vytvori medzi svojimi polmi potential difference - rozdiel elektrickych potencialov, teda napatie. Ked vytvorime uzavretu cestu medzi polmi cez nejaku zataz, moze obvodom tiect prud. Dolezite je preto mysliet na polaritu. Pri niektorych komponentoch, napriklad rezistore, nezalezi na tom, ktorym smerom ho pripojime. Pri LED, diode, elektrolytickom kondenzatore alebo mnohych elektronickych zariadeniach vsak polarita dolezita je a opacne zapojenie moze sposobit, ze obvod nebude fungovat alebo sa komponent poskodi.

Tiez sa nesmu + a - poly baterie jednoducho spojit vodicom s velmi malym odporom. To je short circuit - skrat. Moze vzniknut velmi velky prud, ktory sposobuje prehrievanie vodicov alebo baterie a pri niektorych typoch baterii predstavuje bezpecnostne riziko.

Cell (clanok) je jedna zakladna elektrochemicka jednotka. Battery moze pozostavat z jedneho alebo viacerych clankov.

---

## 11. VCC, 5V, V+ a GND

Ked sa pozeras na vacsiu schematic (schemu), vela komponentov potrebuje rovnake napajanie. Napriklad mikrokontroler, senzory a dalsie cipy mozu vsetky potrebovat 5 V. Technicky by sme mohli nakreslit vodic od kladneho polu zdroja ku kazdemu komponentu. Pri velkej scheme by vsak vzniklo obrovske mnozstvo ciar. Preto pouzivame **power symbols / voltage nodes (napaetove uzly)**, ktore hovoria: tieto body su elektricky spojene, aj ked medzi nimi nie je nakresleny vodic.

Co znamena **VCC**? VCC oznacuje jednu z kladnych napajacich vetiev obvodu. Ak je v konkretnom obvode definovane VCC = 5 V, potom kazdy bod oznaceny VCC patri na tu istu 5 V napajaciu siet. Takze ak na troch roznych miestach schemy vidis VCC pri Sensor, Chip a Motor driver, nemusi medzi nimi byt nakreslena ciara. Vsetky tri VCC symboly reprezentuju tu istu elektricku siet (net).

A co oznacenie **5V**? 5V funguje velmi podobne, ale rovno ti hovori hodnotu napatia. Tu vieme, ze dany bod ma byt 5 V vzhladom na GND. Rozdiel je teda hlavne v informacii: VCC → „toto je kladna napajacia vetva". 5V → „tato napajacia vetva ma 5 voltov". Preto mozes mat na jednej doske napriklad 12V, 5V a 3.3V - tieto nazvy uz predstavuju tri rozne voltage rails (napajacie vetvy).

Co je **V+**? V+ je vseobecnejsie oznacenie pre positive supply - kladne napajanie. V+ samo osebe nehovori, ci ide o 3.3 V, 5 V, 12 V alebo inu hodnotu. To musi byt uvedene inde v scheme alebo datasheete. Pre zaciatok si teda mozes predstavit: VCC, 5V a V+ su rozne sposoby oznacovania kladneho napajania, ale nie su automaticky navzajom to iste. To je velmi dolezite. Ak mas v scheme 5V a 3.3V, urcite ich nemozes automaticky spojit len preto, ze obe predstavuju kladne napajanie.

**GND = Ground (zem)** je referencny bod, voci ktoremu v obvode zvycajne meriame ostatne napatia. Priradime mu 0 V. Ked teda povieme VCC = 5 V, v skutocnosti tym myslime: VCC ma potencial o 5 V vyssi ako GND. Napatie totiz vzdy predstavuje rozdiel potencialov medzi dvoma bodmi. Samotne tvrdenie „tento bod ma 5 V" je skratka pre „tento bod ma 5 V vzhladom na nas referencny bod GND".

5V / VCC dodava komponentom kladne napajanie a GND predstavuje spolocnu 0 V referenciu a typicky aj navratovu cestu prudu k zdroju. A jedna vec, na ktoru treba davat velky pozor: VCC ≠ vzdy 5 V. V jednom zariadeni moze byt VCC = 5 V, v inom VCC = 3.3 V. Pred zapojenim preto vzdy treba vediet, ake konkretne napatie dany komponent vyzaduje.

VCC je jednoducho nazov napajacej vetvy (power rail/net). Nezalezi na tom, ci napaja jeden komponent alebo 50 komponentov. 5V je tiez nazov napajacej vetvy, ale zaroven nam priamo hovori jej napatie.

Kedy teda pouzit VCC, V+ alebo 5V? Predstav si, ze navrhujes vlastnu schemu. Ak chces, aby bolo okamzite jasne konkretne napatie, najprehladnejsie je: 5V, 3.3V, 12V. Ak chces vseobecne pomenovat hlavnu kladnu napajaciu vetvu digitalneho obvodu, casto uvidis: VCC. A V+ sa casto pouziva ako vseobecne oznacenie kladneho napajania, napriklad na konektore alebo pri obvode, kde existuje kladne a zaporne napajanie (V+ a V-).

![Napaetove uzly - VCC, GND, AGND](/book/arduino/lesson1/9-voltage-nodes.png)

GND (Ground) je vseobecna 0 V referencia obvodu. Vacsina beznych digitalnych komponentov sa voci nej napaja a meria napatie.

AGND (Analog Ground) znamena Analog Ground - zem urcenu pre analogovu cast obvodu, napriklad senzory, ADC, operacne zosilnovace alebo citlive meracie obvody. Preco vobec AGND existuje? Digitalne obvody velmi rychlo prepinaju medzi 0 a 1. Tym mozu vytvarat noise (elektricky sum) v napajacich a zemnych cestach. Analogova elektronika pritom moze merat velmi male zmeny napatia, napriklad 1.201 V, 1.203 V, 1.205 V. Ak by sa do tejto referencie dostaval sum z digitalnej casti, meranie moze byt menej presne. Preto moze navrhar oznacit: GND / DGND → digital ground, AGND → analog ground, a navrhnut PCB tak, aby sa prudy z hlucnej digitalnej casti zbytocne nemiesali s citlivou analogovou castou.

Ale pozor - AGND neznamena - napatie. Toto je podstatne: AGND aj GND mozu predstavovat rovnaku 0 V referenciu, len su v navrhu rozlisene kvoli tomu, kadekolvek tecu navratove prudy a ako je PCB navrhnute. To, ci a kde sa AGND a GND fyzicky spajaju, zavisi od konkretneho navrhu a odporucani vyrobcu cipu.

Takze si zatial zapamataj: GND = vseobecna zem / 0 V referencia. AGND = Analog Ground - 0 V referencia pre citlivu analogovu cast. DGND = Digital Ground - zem digitalnej casti. V- ≠ GND - V- moze byt napr. -12 V.

---

## 12. Diode (dioda): elektricka jednosmerka

**Diode (diodu)** si mozes predstavit ako jednosmernu ulicu pre elektricky prud. Ma dva terminals: **anode (anoda)** a **cathode (katoda)**. Pri diode zalezi na orientacii!

![Typy diod - standardna, LED, photodiode](/book/arduino/lesson1/10-diodes.png)

**D1 - 1N4148: klasicka signal diode.** 1N4148 je velmi bezna mala silicon switching/signal diode. Pouziva sa napriklad na rychle spinanie, ochranu signalov alebo usmernenie malych signalov. Jej symbol je ten zakladny, ktory sa oplati naucit ako prvy: A ───>|─── K. Ciarka = cathode.

**D4 - 1N5819: Schottky diode.** Schottky diode funguje podobne - stale preferuje vedenie jednym smerom -, ale ma inu vnutornu konstrukciu. Jej velkou vyhodou byva nizsi forward voltage drop. Kym klasicka silicon diode moze mat napriklad priblizne 0.7 V, Schottky moze mat pri vhodnych podmienkach napriklad 0.2-0.4 V. Preto sa casto pouziva tam, kde nechceme na diode zbytocne stracat vela napatia a vykonu, napriklad v power circuits.

**D2 - Blue LED.** LED = Light Emitting Diode. Je to stale dioda, takze ma anodu, katodu a spravny smer zapojenia, ale ked cez nu tecie vhodny prud, vyzaruje svetlo. Preto ma symbol navyse male sipky smerujuce von. Sipky hovoria: energia vo forme svetla ide z diody von. LED ma zvycajne vyssi forward voltage nez obycajna silicon diode a zavisi aj od farby. Modra LED moze mat typicky radovo okolo 3 V, ale konkretnu hodnotu treba pozriet v datasheete. A hlavne: LED sa typicky nepripaja priamo na zdroj napatia bez obmedzenia prudu. V jednoduchom obvode sa preto casto pouziva series resistor: +5 V → resistor → LED → GND. Rezistor obmedzuje prud, aby sa LED neposkodila.

**D3 - BPW34 Photodiode.** Photodiode (fotodioda) robi v urcitom zmysle opak LED. LED: elektricky prud → svetlo. Photodiode: svetlo → elektricka odozva. Preto sipky na symbole smeruju k diode. Dopadajuce svetlo v nej vytvara photocurrent, ktory elektronika moze merat. Pouziva sa preto v light sensors, optical communication, detektoroch svetla a podobne. Fotodiody sa casto prevadzkuju v reverse bias, hoci existuju aj ine rezimy zapojenia. Dobra pomocka: LED → sipky OUT → svetlo vychadza. Photodiode → sipky IN → svetlo prichadza.

![Schottky a Zener diody](/book/arduino/lesson1/10-diodes-b.png)

**D5 - 1N4733A: Zener diode.** Zener diode je specialna, pretoze je navrhnuta tak, aby sa cielene vyuzivala aj v reverse direction. Pri beznej diode hovorime: Reverse direction → nechceme, aby viedla. Pri Zener diode: po dosiahnutí urciteho reverse voltage ju mozeme zamerne nechat viest v breakdown oblasti. Napriklad 1N4733A je nominalne priblizne 5.1 V Zener diode. To umoznuje Zener diody pouzivat napriklad na voltage regulation, voltage reference alebo ochranu pred prilis vysokym napatim. Preto ma na obrazku aj trochu odlisnu „zalomenu" katodovu ciaru.

![Dalsie typy diod](/book/arduino/lesson1/10-diodes-c.png)

Najdolezitejsie, co si z toho odniest: pri diode sa ako prve vzdy pozri na orientaciu - A = Anode, K = Cathode. Ciarka na symbole = cathode (K). Pre obycajnu diodu potom zakladna predstava je: Anode →|→ Cathode (forward current). Na obrazkoch su potom rozne specializovane verzie toho isteho zakladneho komponentu: 1N4148 je bezna signal/switching diode, Schottky ma typicky mensi voltage drop, LED produkuje svetlo, photodiode svetlo deteguje a Zener diode vyuziva definovane spravanie v reverse breakdown oblasti.

---

## 13. Transistor (tranzistor): elektricky ovladany spinac

Na uplne zakladnej urovni si transistor mozes predstavit ako **switch (spinac), ktory neovladas rukou, ale elektrickym signalom**. Pri obycajnom vypinaci: stlacim vypinac → zacne tiect prud. Pri tranzistore: privediem elektricky signal na riadiaci terminal → tranzistor umozni alebo obmedzi tok prudu cez inu cast obvodu.

To je velmi uzitocne, pretoze malym riadiacim signalom mozeme ovladat vacsiu zataz - napriklad motor, LED pas, rele alebo inu elektroniku. Napriklad Arduino pin nedokaze bezpecne napajat velky motor priamo. Moze vsak ovladat tranzistor: +12 V → MOTOR → TRANSISTOR → GND, pricom Arduino signal ide do riadiaceho terminalu tranzistora. Arduino teda nenapaja motor. Arduino iba povie tranzistoru, kedy ma motorovy obvod zapnut alebo vypnut.

Switch (mechanicky spinac) a transistor sice dokaazu „zapnut/vypnut prud", ale pouzivaju sa na trochu ine situacie. Najjednoduchsie: switch ovlada clovek, transistor ovlada elektronika. Ked chces, aby lampicku zapol pouzivatel tlacidlom, obycajny switch je perfektny. Je jednoduchy, nepotrebuje riadiacu elektroniku a po zopnuti moze mat velmi maly odpor. Ale ked chces, aby lampu automaticky zaplo Arduino o 20:00, potrebujes tranzistor - Arduino posle signal a tranzistor zapne obvod s lampou.

### BJT - Bipolar Junction Transistor

BJT ma tri terminals: **B = Base (baza)** - riadenie, **C = Collector (kolektor)**, **E = Emitter (emitor)**. Pre zakladnu predstavu: Base riadi, ci moze medzi Collector a Emitter tiect vacsi prud.

**NPN transistor.** Velmi casto sa stretnes s NPN tranzistorom. Typicke jednoduche pouzitie: +5 V → LED → resistor → C → NPN → E → GND, pricom Arduino → resistor → B. Ked Arduino posle vhodny signal do Base, tranzistor sa moze dostat do stavu, v ktorom umozni prudu tiect cez LED. LED sa rozsvieti. Ked Base nie je spravne aktivovana, tranzistor prud prakticky nepusti a LED zhasne.

Preco je pred Base rezistor? Pretoze BJT Base odoberá prud. Nemali by sme ju preto v takomto zapojeni jednoducho pripojit na vystup mikrokontrolera bez vhodneho obmedzenia prudu.

Sipka na symbole smeruje von. Pomocka: **NPN = Not Pointing iN.**

**PNP transistor.** Sipka smeruje dovnutra. Rozdiel je v polaritach a v tom, akym sposobom sa tranzistor ovlada a ako nim tecie konvencny prud.

![BJT tranzistory - NPN a PNP](/book/arduino/lesson1/11-bjts.png)

Preco vobec mame NPN aj PNP? Pretoze nam umoznuju pohodlne spinat zataz z roznych stran napajania. Velmi zjednodusene sa NPN casto pouziva ako low-side switch: +5V → LOAD → NPN → GND. Tranzistor je teda medzi zatazou a GND. PNP sa moze pouzivat ako high-side switch: +5V → PNP → LOAD → GND. Tranzistor je na strane kladneho napajania. Nie je to jediny sposob pouzitia NPN/PNP, ale ako prva predstava je to velmi uzitocne.

### MOSFET

MOSFET je iny druh tranzistora, ale na zakladnej urovni moze robit velmi podobnu vec: elektrickym signalom zapinam alebo vypinam cestu pre prud. Ma tri hlavne terminals: **G = Gate (hradlo)** - riadenie, **D = Drain**, **S = Source**. Najdolezitejsi je teraz Gate. Gate je riadiaci terminal podobne, ako bola Base pri BJT. Ale sposob ovladania je odlisny.

**Base vs. Gate - velmi dolezity rozdiel.** Pri BJT ovladame tranzistor predovsetkym prudom do Base. Pri MOSFETe rozhoduje predovsetkym napatie medzi Gate a Source (VGS). Preto sa zvykne hovorit: BJT je current-controlled, MOSFET je voltage-controlled. Je to zjednodusenie, ale na tejto urovni velmi uzitocne. Gate MOSFETu v ustalenom stave idealne neodobera kontinualny DC prud ako Base BJT, hoci pri prepinaní treba nabit/vybit jeho gate capacitance.

**N-channel MOSFET.** Pri N-channel MOSFETe sa casto stretnes s podobnym zapojenim ako pri NPN: +12 V → MOTOR → D → N-MOSFET → S → GND, pricom Arduino → G. Ked vytvoris dostatocne VGS, MOSFET sa zapne a motorovy prud moze tiect. Preto su N-channel MOSFETy velmi bezne pri ovladani motorov, LED pasov a dalsich vacsich zatazi mikrokontrolerom. Pozor vsak: nestaci sa pozriet iba na parameter VGS(th). Pri realnom navrhu treba overit v datasheete, pri akom gate voltage ma MOSFET dostatocne nizky odpor RDS(on). Pri 3.3 V mikrokontroleri sa preto casto vybera vhodny logic-level MOSFET.

**P-channel MOSFET.** Existuje aj P-channel MOSFET. Ten sa casto pouziva na high-side switching: +12V → S → P-MOSFET → D → LOAD → GND.

Moze byt **N-channel** alebo **P-channel**.

![MOSFET tranzistory](/book/arduino/lesson1/12-mosfets.png)

**BJT vs. MOSFET - co si z toho zatial odniest:** BJT ma riadiaci terminal Base, dalsie terminals Collector a Emitter, ovlada sa base current, typy NPN/PNP. MOSFET ma riadiaci terminal Gate, dalsie terminals Drain a Source, ovlada sa gate-source voltage, typy N-channel/P-channel. Oba sa daju pouzit ako switch.

Najlepsia mentalna predstava je: maly elektricky riadiaci signal → TRANSISTOR ON/OFF → vacsia zataz. Ciže tranzistor nie je zdroj energie. Motoru alebo LED „nevyraba" elektrinu. Energia pochadza zo zdroja, napriklad z 12 V supply. Tranzistor iba elektronicky riadi, ci a ako moze prud cez danu cestu tiect.

---

## 14. Digital logic gates (digitalne logicke hradla)

Digital logic gates (digitalne logicke hradla) su zakladne stavebne prvky digitalnej elektroniky. Dostanu jeden alebo viac inputs (vstupov), vykonaju nad nimi jednoduchu logicku operaciu a vytvoria output (vystup).

Digitalne systemy pracuju s dvoma logickymi stavmi: **0** = LOW = false, **1** = HIGH = true. V realnom obvode samozrejme vodicom netecie „nula alebo jednotka". Tieto hodnoty reprezentujeme pomocou rozsahov elektrickeho napatia. Napriklad v urcitom 5 V systeme nizke napatie reprezentuje 0 a vyssie napatie 1; presne hranice LOW/HIGH vsak zavisia od konkretnej logickej rodiny a cipu.

Na co logic gates potrebujeme? Umoznuju elektronike robit rozhodnutia podla vstupov. Predstav si napriklad bezpecnostny system stroja. Motor sa moze zapnut iba vtedy, ked: A - ochranne dvere su zatvorene, B - pouzivatel stlacil START. Potrebujeme teda: Door closed (A) a START (B) → AND → Motor enable. Motor dostane 1 iba vtedy, ked A = 1 AND B = 1. Prave toto robi AND gate.

**AND** = vysledok 1 iba ked platia oba vstupy.

**OR** = vysledok 1 ak plati aspon jeden vstup. Napriklad alarm sa ma aktivovat, ked sa otvori okno ALEBO dvere: Door sensor a Window sensor → OR → Alarm. Staci jeden z nich.

**XOR** = vysledok 1 ked su vstupy rozdielne.

**NOT** = otoci logicku hodnotu.

![Logicke hradla - AND, OR, XOR](/book/arduino/lesson1/13-digital-logic-gates.png)

**NAND** = AND + NOT, **NOR** = OR + NOT, **XNOR** = XOR + NOT. Preto maju tieto symboly na vystupe maly kruzok.

![NAND, NOR, XNOR hradla](/book/arduino/lesson1/13-digital-logic-gates-b.png)

---

## 15. Integrated Circuit - IC (integrovany obvod)

Integrated Circuit (IC), po slovensky integrovany obvod, je maly elektronicky cip, v ktorom je na jednom kusku polovodica integrovane velke mnozstvo elektronickych prvkov. Vo vnutri mozu byt transistors, diodes, resistors a dalsie struktury prepojene tak, aby cip vykonaval urcitu funkciu. Namiesto toho, aby sme napriklad z tisicov tranzistorov stavali komplikovany obvod rucne, vyrobca ich moze integrovat do jedneho cipu.

IC moze robit prakticky cokolvek. IC neoznacuje jednu konkretnu funkciu. Je to kategoria elektronickych suciastok. Existuju napriklad IC, ktore funguju ako: microcontroller - napr. ATmega328P pouzivany na klasickom Arduino Uno, operational amplifier (op-amp) - zosilnuje a spracuva analogove signaly, voltage regulator - vytvara/stabilizuje pozadovane napatie, memory - uchovava data, logic IC - vykonava logicke operacie, motor driver - riadi motor.

Na scheme sa IC casto kresli ako **obdlznik s vela pinmi**. Predstav si IC ako hotel. Zvonku nemusis vidiet kazdy stol a postel. Staci vediet kde su vchody a vystupy.

![Integrovane obvody - ATmega328P a dalsie](/book/arduino/lesson1/14-integrated-circuits.png)

IC ma pins (piny). Cip komunikuje s okolitym obvodom pomocou pins - pinov/vyvodov. Kazdy pin ma urcitu funkciu. Niektore mozu byt: VCC / VDD → napajanie cipu, GND → ground, INPUT → cip prijima signal, OUTPUT → cip posiela signal, GPIO → programovatelny input/output, RESET → reset cipu, CLK → clock signal. Presny vyznam kazdeho pinu zavisi od konkretneho IC.

Co znamena U1, U2, U3? V schemach ma kazda suciastka reference designator, aby sme vedeli jednoznacne povedat, o ktorom komponente hovorime. Pri integrovanych obvodoch sa bezne pouziva pismeno U: U1 → prvy IC, U2 → druhy IC, U3 → treti IC. Preco prave U? Nie je to preto, ze by U bolo skratkou slova Integrated Circuit. Historicky sa U zauzivalo pre integrovane obvody ako jeden kompletny celok, pricom presny povod pismena nie je uplne jednoznacny. Casto sa spaja s vyrazmi ako unit, ale netreba si z toho robit pravidlo typu „U = unit".

---

## 16. Op-amp a Voltage regulator

Tieto dva komponenty mozu byt oba realizovane ako IC (integrated circuits), ale robia uplne odlisne veci. Op-amp pracuje so signalmi, zatial co voltage regulator sa stara o napajacie napatie.

**Op-amp - Operational Amplifier (operacny zosilnovac)** je elektronicky obvod urceny predovsetkym na spracovanie a zosilnovanie analogovych signalov. Na scheme sa typicky kresli ako trojuholnik s + a - na vstupoch.

Kedy v projekte pouzijes op-amp? Op-amp pouzijes najma vtedy, ked mas analogovy signal zo senzora, ktory potrebujes nejako upravit predtym, nez ho spracuje napriklad Arduino. Predstav si senzor, ktory meria tlak a jeho vystup sa meni iba velmi malo, napr. 0.10 - 0.30 V. Op-amp moze signal zosilnit napriklad na 0.5 - 4.5 V, co je vhodnejsie pre Arduino ADC. Arduino sice dokaze merat analogove napatie, ale keby senzor vyuzival iba malicku cast jeho meracieho rozsahu, meranie by malo horsie vyuzitie dostupneho rozlisenia. Op-amp moze signal zosilnit a pripadne posunut alebo filtrovat, aby bol vhodnejsi pre ADC.

Dalsi priklad je mikrofon. Elektricky signal z mikrofonu moze byt velmi maly. Op-amp ho zosilni na uroven vhodnu pre ADC alebo dalsi circuit. Op-amp sa vsak nepouziva iba na zosilnenie. Vie fungovat aj ako buffer, byt sucastou filtera, spracovat signal zo svetelneho ci teplotneho senzora alebo napriklad prevadzat maly prud z photodiode na meratelne napatie.

Takze ked budes robit Arduino projekt, op-amp nepotrebujes automaticky. Ak mas digitalny senzor, ktory komunikuje priamo cez I2C, SPI alebo UART, casto ho vobec nepotrebujes. Objavi sa najma pri analog electronics a signal conditioning.

**Voltage regulator (regulator napatia)** ma uplne inu ulohu. Jeho cielom je vytvorit stabilne pozadovane napatie pre dalsiu elektroniku. Ma typicky: IN (vstup), OUT (vystup), GND.

![Op-amp a voltage regulator](/book/arduino/lesson1/15-unique-ics-op-amps,-voltage-regulators.png)

![Dalsie varianty](/book/arduino/lesson1/15-unique-icsop-amps,-voltage-regulators-b.png)

---

## 17. Crystal a Resonator - casovanie mikrokontrolera

Microcontroller potrebuje casovu referenciu, podla ktorej vie, ako rychlo ma vykonavat jednotlive operacie. Tuto pravidelnu casovu referenciu nazyvame **clock (hodiny)**. Predstav si ju ako metronom: tick tick tick tick - microcontroller vykonava operacie v tomto rytme. Bez nej by elektronika nemala presnu informaciu o tom, kedy ma vykonat dalsi krok.

Co znamena napriklad 16 MHz? Napriklad klasicky ATmega328P na Arduino Uno sa bezne pouziva s clockom 16 MHz. Hz znamena pocet cyklov za sekundu, takze 16 MHz = 16 000 000 clock cycles/s. To neznamena, ze Arduino automaticky vykona 16 milionov celych prikazov programu za sekundu - jednotlive instrukcie a operacie mozu vyzadovat rozny pocet clock cycles. Clock vsak poskytuje zakladny rytmus celemu procesoru a jeho periferiam.

Na co to realne potrebujes v projekte? Predstav si, ze naprogramujes: digitalWrite(LED, HIGH); delay(1000); digitalWrite(LED, LOW); Arduino musi nejako vediet: ako dlho je 1000 ms? Na to potrebuje stabilnu casovu zakladnu. Rovnako ju potrebuje pri mnohych dalsich cinnostiach: vykonavanie programu, timers, delays, PWM, UART / serial communication, SPI a dalsie casovo zavisle periferie. Napriklad pri UART communication musia dve zariadenia priblizne suhlasit s tym, ako dlho trva jeden prenasany bit. Ak by bol clock vyrazne nepresny, komunikacia moze zacat zlyhavat.

Odkial teda clock pochadza? Microcontroller moze ziskavat clock roznymi sposobmi. Dve moznosti su crystal a resonator.

**Crystal (krystal).** Crystal oscillator circuit vyuziva piezoelektricky krystal, typicky quartz, ktory ma velmi stabilnu rezonancnu frekvenciu. Samotny crystal je pasivny rezonancny prvok; spolu s oscilatorovym obvodom mikrokontrolera a typicky vhodnymi kondenzatormi vytvori clock. Na scheme preto mozes vidiet crystal pripojeny na XTAL1 a XTAL2 piny MCU. Presne zapojenie sa vzdy riadi datasheetom daneho mikrokontrolera a krystalu.

**Resonator (rezonator).** Resonator plni velmi podobnu ulohu - poskytuje frekvencnu referenciu pre oscillator. Casto ide o ceramic resonator. Zjednodusene plati: Crystal → typicky presnejsi a stabilnejsi. Ceramic resonator → typicky lacnejsi/jednoduchsi, ale menej presny. Niektore rezonatory maju navyse potrebne capacitors integrovane priamo v jednom puzdre, takze zapojenie moze byt jednoduchsie.

Potrebujem teda crystal v kazdom Arduino projekte? Nie. Toto je velmi dolezite. Ak pouzijes hotove Arduino Uno, jeho clock source uz je sucastou dosky.

![Krystaly a rezonatory](/book/arduino/lesson1/16-crystals-and-resonators.png)

---

## 18. Headers a Connectors

Elektronicka doska malokedy funguje uplne sama. Potrebujes k nej pripojit napajanie, senzory, motory, displeje, USB kabel, programator alebo inu elektronicku dosku. Na to sluzia **connectors (konektory)** a **headers (pinove listy)**. Ich uloha je jednoducha: umoznit elektricke a casto aj mechanicke spojenie PCB s niecim mimo dosky bez toho, aby sme museli vodice zakazdym priamo spajkovat.

**Connector (konektor)** je vseobecny nazov pre komponent urceny na pripajanie kablov alebo inych zariadeni. Namiesto toho, aby bola battery napevno prispajkovana k PCB, pouzijes vhodny connector a mozes ju jednoducho pripojit alebo odpojit. Connector moze byt napriklad: USB connector, JST connector (casto baterie a male senzory), barrel jack (napajaci adapter), screw terminal (vodice sa upevnia skrutkou), board-to-board connector (spojenie dvoch PCB). Connector teda nie je jeden konkretny komponent. Je to cela kategoria sposobov pripojenia.

**Header (pinova lista)** je jeden konkretny typ konektora. Poznas ho napriklad z Arduina - rada pinov, kde kazdy pin predstavuje samostatne elektricke spojenie. Na Arduino moze byt napriklad: GND, 5V, 3.3V, A0, A1, A2. Do headera potom pripojis jumper wires, shield alebo inu dosku.

**Male a Female Header.** Male header ma kovove piny, ktore vycnievaju. Female header ma otvory, do ktorych sa piny zasuvaju. Napriklad Arduino Uno ma na okrajoch typicky female headers, takze do nich mozes zasuvat jumper wires alebo Arduino shield.

Co cez connector vlastne prechadza? Connector moze prenasat power aj signals. Napriklad senzor moze mat styri vodice: VCC (napajanie senzora), GND (ground), SDA (datovy signal), SCL (clock signal I2C komunikacie). Jeden connector teda moze sucasne prenasat napajanie aj informacie.

Na co ich pouzijes vo vlastnom projekte? Predstav si, ze navrhujes vlastnu PCB pre robota. Kazde zariadenie (battery, motor, sensor, USB, programmer) moze mat vhodny connector alebo header. To je velmi prakticke aj pri servise. Ak sa pokazi senzor: bez connectora musis odpajkovat, s connectorom jednoducho vytiahnes a vymenis.

Headers sa casto pouzivaju aj na programovanie. Mozes mat na doske maly programming header (VCC, GND, DATA). Pocas vyroby alebo vyvoja nan pripojis programator, nahras firmware do mikrokontrolera. Potom programator odpojis a zariadenie normalne funguje dalej.

Ako sa oznacuju v schematic? Velmi casto sa stretnes s: **J1, J2, J3...** → connectors / jacks. Niekedy sa podla konkretneho standardu alebo firemnej konvencie pouzivaju aj ine oznacenia, napriklad P, CN ci dalsie. J sa tradicne spaja s jack - teda miestom, kde sa vytvara rozpojitelne elektricke spojenie. Na zapamatanie: J = Jack → nieco sem pripajam.

**Header vs. Connector** - najjednoduchsie: Connector je vseobecna kategoria. Header je jeden typ connectora tvoreny pinmi. Ciaze kazdy header mozes povazovat za connector, ale nie kazdy connector je header. A samotny connector zvycajne nic „nespracuvava". Na rozdiel od tranzistora alebo IC je jeho hlavnou ulohou jednoducho dostat power alebo signals z bodu A do bodu B a umoznit prakticke pripojenie/odpojenie zariadenia.

**Co je PCB?** PCB = Printed Circuit Board = doska plosnych spojov. Je to fyzicka doska, na ktorej su vytvorene vodive cesty (traces) a na ktoru sa osadzuju elektronicke komponenty. Napriklad Arduino Uno je PCB s mikrokontolerom, konektormi a dalsimi suciastkami.

![Konektory a pinove listy](/book/arduino/lesson1/17-headers-and-connectors.png)

---

## 19. Motors, Transformers, Speakers a Relays

**Motor** - kruh s pismenom M. Meni elektricku energiu na pohyb.

**Transformer** - dve cievky vedla seba.

**Relay** - kombinacia cievky a spinaca. Elektricky ovladany switch.

![Motory, transformatory, reproduktory a rele](/book/arduino/lesson1/18-motors,-transformers,-speakers,-and-relays.png)

![Relay - cievka + spinac](/book/arduino/lesson1/19-relays-usually-pair-a-coil-with-a-switch.png)

![Reproduktory a bzuciaky](/book/arduino/lesson1/20-speakers-and-buzzers-usually-take-a-form-similar.png)

![Symbol motora](/book/arduino/lesson1/21-and-motors-generally-involve-an-encircled-m.png)

---

## 20. Fuse (poistka) a PTC

**Fuse (poistka)** je ochranny komponent. Ak sa v obvode objavi nebezpecne velky prud, poistka moze obvod prerusit.

**Thermistor** je resistor, ktoreho odpor sa meni podla teploty.

![Poistky a PTC](/book/arduino/lesson1/22-fuses-and-ptcs.png)

---

## 21. Nets, Nodes a Labels - ako zistime co je s cim spojene

**Net** predstavuje skupinu miest, ktore su elektricky prepojene. Na scheme ho vidis ako ciaru.

**Node (uzol)** - ak sa vodice spajaju, spojenie sa oznaci malou bodkou.

Ak sa dve ciary iba krizia bez bodky, nemusia byt spojene!

![Siete, uzly a oznacenia](/book/arduino/lesson1/23-nets,-nodes-and-labels.png)

![Spoje a uzly - detail](/book/arduino/lesson1/24-junctions-and-nodes.png)

![Junctions - varianty](/book/arduino/lesson1/24-junctions-and-nodes-b.png)

---

## 22. Net labels: spojenie bez nakreslenej dlhej ciary

Ak na jednom mieste je vodic oznaceny **SDA** a o pol strany dalej dalsi vodic **SDA**, patria k rovnakemu netu aj ked medzi nimi nevidis ciaru.

Preto nemusis medzi vsetkymi GND symbolmi kreslit ciaru. Rovnaky nazov = rovnaka elektricka siet.

![Pomenovane siete](/book/arduino/lesson1/25-net-names.png)

---

## 23. Ako sa velka schema vobec cita?

Najprv sa na celu schemu pozri ako na mapu. Hladaj **functional blocks (funkcne bloky)**: Power supply, Microcontroller, Sensors, Motor control, Connectors.

![Identifikacia funkcnych blokov](/book/arduino/lesson1/26-identify-blocks.png)

Najprv najdi zdroj napajania a GND. Potom najdi hlavny IC. Skus rozpoznat, ktore casti patria k power, ktore k sensorom, ktore k riadeniu a ktore k vystupom.

![Rozpoznanie napaetovych uzlov](/book/arduino/lesson1/27-recognize-voltage-nodes.png)

---

## 24. Zakladne pismena komponentov

| Oznacenie | Znamena |
|-----------|---------|
| R | Resistor (rezistor) |
| C | Capacitor (kondenzator) |
| L | Inductor (cievka) |
| S | Switch (spinac) |
| D | Diode (dioda) |
| Q | Transistor (tranzistor) |
| U | Integrated Circuit (integrovany obvod) |
| Y | Crystal / Oscillator (krystal / oscilator) |

---

## Na co pamatat

Elektronicka schema nie je nieco, co mas naslepo memorovat. Je to jazyk.

Najskor sa ucis zakladne "slova": resistor, capacitor, diode, transistor...

Potom sa ucis "gramatiku": wires, nets, nodes, labels...

A nakoniec dokazes precitat celu "vetu": Battery napaja circuit, sensor posiela signal microcontrolleru a microcontroller cez transistor ovlada motor.

**Symbol ti povie typ komponentu.** Reference designator (R1, C2, Q3) ti povie, ktory konkretny. Value (1 kΩ, 10 μF) ti povie jeho vlastnost.

**Bodka na spojeni = vodice patria k sebe.** Rovnaky net label = rovnaka elektricka siet.

**Zacni vzdy od napajania a hlavneho IC.** Potom sleduj spojenia. A ked nieco nepoznas - **datasheet**.`;
