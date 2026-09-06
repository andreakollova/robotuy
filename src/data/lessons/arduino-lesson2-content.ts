// Arduino - Lesson 2: Breadboard
// Full lesson content - DO NOT SHORTEN

export const arduinoLesson2Content = `# Breadboard: ako postavit svoj prvy elektronicky obvod bez spajkovania

Predstav si, ze mas LED, rezistor, tlacidlo a zdroj napajania a chces z nich vytvorit svoj prvy elektricky obvod. Mohla by si jednotlive suciastky spojit vodicmi a vsetko prispajkovat. Lenze co ak sa pomylis? Alebo chces rezistor vymenit za iny? Pripadne chces cele zapojenie o pat minut rozobrat a vyskusat nieco uplne ine?

Prave na toto existuje **breadboard (nepajive kontaktne pole)**. Je to doska s mnozstvom malych otvorov, do ktorych jednoducho zasuvas vodice a vyvody elektronickych suciastok. Pod plastovym povrchom su ukryte kovove kontakty, ktore niektore z tychto otvorov elektricky spajaju. Vdaka tomu mozes zostavit funkcny obvod bez jedineho spajkovaneho spoja.

![Uvod do breadboardu](/book/arduino/lesson2/1-introduction.jpg)

---

## 1. Na co vlastne breadboard potrebujeme?

V predchadzajucej lekcii sme sa pozerali na schematic (elektronicku schemu). Schema nam napriklad moze povedat, ze mame spojit zdroj napajania, LED, rezistor a tlacidlo urcitym sposobom.

Schema je vsak iba plan.

Ak chceme z planu vytvorit skutocny obvod, musime realne elektronicke suciastky nejako elektricky prepojit.

Jednou moznostou je **soldering (spajkovanie)**. Pomocou spajkovacky vytvoris medzi komponentmi pevne vodive spoje. To je uzitocne pri hotovom zariadeni, ale pri experimentovani by to bolo neprakticke.

**Breadboard** tento problem riesi. Suciastku jednoducho zasunies do spravnych otvorov. Ak ju chces presunut, vytiahnes ju a zasunies inde.

Preto sa breadboard pouziva najma na **prototyping (prototypovanie)** - teda na vytvorenie docasnej verzie obvodu, na ktorej si mozes overit, ci tvoj napad funguje.

Je to podobne ako LEGO. Ked skusas novy navrh robota, nechces vsetky kocky okamzite zlepit lepidlom. Najprv ich poskladas, pozries sa, ci konstrukcia funguje, nieco premiestnis a az neskor moze vzniknut finalna verzia.

**Breadboard je v podstate LEGO pre elektronicke obvody.**

![Preco pouzivat breadboard](/book/arduino/lesson2/4-why-use-breadboards.jpg)

---

## 2. Preco sa elektronicka doska vola "breadboard"?

Nazov je zvlastny, pretoze breadboard doslova znamena doska na krajanie chleba. A tento nazov skutocne pochadza od chleba.

V casoch, ked boli elektronicke suciastky omnoho vacsie nez dnes, ludia potrebovali nejaku plochu, na ktorej mohli experimentalne obvody zostavovat. Jednym z rieseni bolo vziat obycajnu drevenu dosku na chlieb, zatlct do nej klince alebo pripinaciky a medzi nimi upevnovat vodice a elektronicke komponenty.

![Historia breadboardu](/book/arduino/lesson2/2-history.jpg)

Neskor vznikli omnoho praktickejsie sposoby prototypovania. Pred rozsirenim modernych breadboardov sa pouzivala napriklad technika wire-wrap.

![Wire-wrap a nazov breadboard](/book/arduino/lesson2/3-whats-in-a-name.jpg)

![Solderless breadboard](/book/arduino/lesson2/3-whats-in-a-name-b.jpg)

Moderny breadboard je ovela pohodlnejsi, ale historicky nazov zostal. Presnejsi nazov je: **solderless breadboard (nepajive kontaktne pole)**.

---

## 3. Najdolezitejsia vec: breadboard nie je iba plasticka doska s dierkami

Breadboard je doska, ktora ti umoznuje vytvarat a testovat elektronicke obvody bez spajkovania. Je idealna napriklad na prve Arduino projekty - zapojis resistor, LED, sensor alebo jumper wires, otestujes obvod a potom ho mozes jednoducho rozobrat a zapojit inak.

Na prvy pohlad breadboard vyzera ako obycajna plastova doska s mnozstvom otvorov. Mohlo by sa preto zdat, ze kazdy otvor je samostatny.

**Nie je.**

Pod plastom sa nachadzaju kovove vodive pasiky s pruznymi kontaktmi. Ked do otvoru zasunies nozicku resistora, LED alebo jumper wire (prepojovaci vodic), kovovy kontakt ju zachyti.

Najdolezitejsie vsak je: **niektore otvory su pod plastom navzajom elektricky spojene.** To znamena, ze nemusis medzi kazdymi dvoma komponentmi vidiet kabel, aby boli elektricky prepojene.

![Anatomia breadboardu - vnutorne spojenia](/book/arduino/lesson2/5-anatomy-of-a-breadboard.jpg)

---

## 4. Ako su dierky prepojene?

Na klasickom breadboarde mas v hlavnej pracovnej casti skupiny po 5 otvorov. Tychto pat otvorov je elektricky ten isty node (uzol). Ak teda urobis: a10 → resistor, c10 → jumper wire, e10 → LED, vsetky tri vyvody su na tejto strane breadboardu navzajom elektricky spojene. Je to prakticky rovnake, ako keby si ich spojila vodicom: resistor - wire - LED. Breadboard vsak tento „wire" skryva pod plastom.

![Terminal strips - skupiny spojenych otvorov](/book/arduino/lesson2/6-terminal-strips.jpg)

![Terminal strips - detail](/book/arduino/lesson2/6-terminal-strips-a.jpg)

---

## 5. Stredova medzera ich oddeluje

Breadboard ma uprostred typicku medzeru. Takze napriklad: a10, b10, c10, d10, e10 su SPOJENE. f10, g10, h10, i10, j10 su SPOJENE. Ale e10 a f10 SPOJENE NIE SU. Toto je jedna z najdolezitejsich veci, ktore musis pri breadboarde vediet.

Preco je tam ta medzera? Najma preto, aby si cez nu mohla umiestnit DIP integrated circuit. Nozicky na jednej strane IC su tak v jednej polovici breadboardu a nozicky na druhej strane v druhej polovici. Keby stredova medzera neexistovala a protilahle strany boli elektricky prepojene, mohli by sme nechtiac spajat piny IC, ktore spolu spojene byt nemaju.

![LED vlozena do breadboardu cez stredovu medzeru](/book/arduino/lesson2/7-an-led-inserted-into-a-breadboard.-.jpg)

![DIP chip na breadboarde](/book/arduino/lesson2/10-dip-support.jpg)

---

## 6. Power Rails - napajacie listy

Na obrazku vidis po okrajoch dlhe linie oznacene cervenou a modrou farbou. To su **power rails (napajacie listy)**. Typicky ich pouzivame na: cervena → +V / 5V / 3.3V, modra → GND.

Napriklad Arduino: Arduino 5V → + power rail, Arduino GND → - power rail. A nasledne mozes z tychto rails napajat viac komponentov. Nemusis teda viest kazdy komponent samostatnym kablom az k Arduinu.

![Power rails na breadboarde](/book/arduino/lesson2/8-power-rails.jpg)

![Prepojenie power rails jumper vodicmi](/book/arduino/lesson2/9-two-jumper-wires-used-to-connect-t.jpg)

Pozor vsak: ked vidis na breadboarde cervenu ciaru a znak +, neznamena to, ze sa tam zazracne nachadza elektricke napatie. **Breadboard sam nevyraba elektrinu.** Znacky + a - su iba orientacne oznacenia. Ak chces pouzivat + rail ako 5 V, musis ho skutocne pripojit k 5 V zdroju.

Nie na kazdom breadboarde su power rails prepojene po celej dlzke. Niekedy su v strede prerusene. Preto je dobre konkretny breadboard skontrolovat alebo premerat multimetrom. Ak ma breadboard power rails na lavej aj pravej strane, nemusi medzi nimi existovat elektricke spojenie. Ak chces mat rovnake napajanie na oboch stranach, mozes ich prepojit pomocou jumper wires.

![Niektore vacsie breadboardy maju prerusene power rails](/book/arduino/lesson2/14-note-some-larger-breadboards-will-often-isolate.jpg)

---

## 7. Terminal Strips - hlavna pracovna cast

Terminal strips su tie velke skupiny dierok v strede breadboardu. Prave tu budes vacsinou skladat samotny circuit. Na breadboarde by si jednotlive vyvody komponentov vlozila do spravnych skupin otvorov tak, aby vytvorili pozadovane nodes.

Na breadboarde casto najdes: A, B, C, D, E... a 1, 2, 3, 4, 5... Tieto oznacenia nemaju ziadnu elektricku funkciu. Su to jednoducho **adresy otvorov**. Predstav si sachovnicu. Ked niekto povie "E4", presne vies, o ktore policko ide.

![Riadky a stlpce na breadboarde](/book/arduino/lesson2/11-rows-and-columns.jpg)

---

## 8. Binding Posts

Na konkretnom breadboarde z obrazka su hore este binding posts - cerveny, zeleny a cierny konektor. Tie umoznuju pohodlne priviest na breadboard napriklad napajanie z externeho power supply. Dolezite vsak je, ze binding post nemusi byt automaticky elektricky spojeny s power rail iba preto, ze sa nachadza vedla neho. Casto ho musis s pozadovanym railom prepojit vodicom.

---

## 9. Konkretny priklad - LED

Povedzme, ze chces vytvorit: 5V → resistor → LED → GND. Na breadboarde mozes vyuzit jeho vnutorne spojenia: + rail = 5V, jumper wire do riadku kde je resistor, druhy koniec resistora v dalsom riadku kde je aj LED, druhy koniec LED v dalsom riadku s jumper wire do - rail = GND. Ked das dva vyvody do otvorov patriacich k tej istej kovovej liste, breadboard ich uz spoji za teba.

---

## 10. Zapamataj si

Dierka sama o sebe nie je podstatna. Podstatne je, s ktorymi dalsimi dierkami je pod plastom elektricky spojena. Preto pri breadboarde vzdy rozmyslaj v nodes (uzloch). Dva komponenty v rovnakom node = ich vyvody su elektricky spojene. Dva komponenty v roznych nodes = spojene nie su, pokial medzi nimi nevytvoras dalsie spojenie. A prave pochopenie tohto principu je moment, po ktorom zacne breadboard davat ovela vacsi zmysel.

---

## 11. Best practices pri breadboarde

Pri breadboarde existuju best practices, a vo vseobecnosti plati: komponenty, ktore spolu priamo suvisia, davaj skor blizko seba. Nie vsak tak natlacene, ze sa v zapojeni nebudes vediet orientovat.

**Suvisiace komponenty davaj blizko seba.** Ak mas napriklad LED a jej resistor, kratsie prepojenia znamenaju prehladnejsi obvod a pri rychlych/citlivych signaloch aj mensiu nachylnost na rusenie.

**IC davaj cez stredovu medzeru.** Tak ma kazdy pin vlastny node a mas priestor pripajat dalsie komponenty.

**Power ved cez power rails.** Napriklad cerveny rail → 5 V, modry rail → GND. Potom si 5 V a GND beries tam, kde ich prave potrebujes.

**Decoupling capacitor davaj velmi blizko IC.** Toto je jeden z pripadov, kde vzdialenost naozaj zalezi. Napriklad 100 nF capacitor medzi VCC a GND, co najblizsi k napajacim pinom IC. Pomaha stabilizovat lokalne napajanie a potlacat vysokofrekvencny noise.

**Pouzivaj kratke a logicke jumper wires.** Namiesto kabla cez pol dosky radsej kratke priame spojenie. Ale nemusis nahanat kazdy milimeter. Pri obycajnom Arduino prototype je dolezitejsie, aby bolo zapojenie prehladne a spravne.

**Pouzivaj konzistentne farby vodicov.** Velmi dobry zvyk je napriklad: cervena → +V, cierna → GND, ine farby → signals. Pri vacsom projekte ti to vyrazne ulahci debugging.

**Nedavaj vsetko co najblizisie len preto, ze mozes.** Natlacene komponenty mozu byt horsie nez trochu vacsie, ale logicky usporiadane zapojenie. Idealne je rozmyslat v functional blocks (funkcnych blokoch).

Kedy je vzdialenost naozaj dolezita? Pri jednoduchom Arduino → button alebo Arduino → LED rozdiel par centimetrov vacsinou neriesis. Ale cim mas vyssiu frekvenciu, citlivejsi analog signal alebo vacsi prud, tym viac zalezi na fyzickom usporiadani. Napriklad: decoupling capacitor a IC → co najblizisie, crystal a microcontroller → velmi blizko, sensor a op-amp → kratka citliva signal path, motor / velky prud → pozor na rusenie. Motor by si napriklad nechcela viest chaoticky cez oblast, kde merias velmi slaby analog signal zo senzora.

Pre tvoje prve breadboard projekty: najprv spravnost → potom prehladnost → az potom minimalizovanie vzdialenosti. Ciaze komponenty, ktore spolu suvisia, relativne blizko, kratke jumper wires, jasne power rails a nechaj si medzi funkcnymi castami trochu priestoru.

---

## 12. Dalsie vlastnosti breadboardu

Niektore breadboardy maju na bokoch male vystupky a drazky, vdaka ktorym mozes spojit viac breadboardov vedla seba. Niektore maju tiez na spodnej strane adhesive backing (samolepiacu vrstvu).

![Dalsie vlastnosti breadboardu](/book/arduino/lesson2/13-other-features.jpg)

---

## 13. Ako dostaneme do breadboardu elektrinu?

Breadboard sam nevyraba ani neposkytuje elektricku energiu. Je to iba pomocka, ktora nam umoznuje elektricky prepajat komponenty bez spajkovania. Aby teda obvod na breadboarde fungoval, potrebujeme k nemu pripojit **power source (zdroj napajania)**.

Jednou z najjednoduchsich moznosti pri prvych projektoch je pouzit development board, napriklad **Arduino**.

![Pozicavanie napajania z inych zdrojov](/book/arduino/lesson2/15-borrowing-from-other-power-sources.jpg)

**Arduino ako zdroj napajania pre breadboard.** Predstav si, ze Arduino pripojis USB kablom k pocitacu. Arduino je napajane a na jeho power pins mas k dispozicii napriklad: 5V - priblizne 5 V napajacia vetva, 3.3V - 3,3 V vetva na doskach, ktore ju poskytuju, GND - referencny bod 0 V. Pomocou jumper wires ich mozes priviest na breadboard.

Preco pripajame 5V aj GND? Nestaci pripojit iba Arduino 5V → breadboard. Elektricky obvod potrebuje uzavretu cestu pre prud. Napriklad: 5V → + power rail → resistor → LED → - power rail → GND. Tak vznikne kompletna cesta a prud moze pretekat cez obvod.

**Na co su power rails?** Namiesto toho, aby si kazdy komponent pripajala samostatne k Arduinu, privedies napajanie raz na breadboard: Arduino 5V → + POWER RAIL, Arduino GND → - POWER RAIL. A nasledne si viac casti obvodu moze zobrat 5V alebo GND z power railu. Power rail teda funguje ako spolocna napajacia cesta.

**Pozor: cervena ciara sama nevytvara 5 V.** Toto je velmi dolezite. Ked na breadboarde vidis cervenu a modru ciaru, neznamena to, ze tam automaticky je elektrina. Su to iba farebne oznacenia. Kym neurobis: Arduino 5V → cerveny rail, Arduino GND → modry rail, breadboard nie je napajany. Dokonca technicky mozes modry rail pouzit na 5V a cerveny na GND - elektricky tomu breadboard nezabrani. Nerobime to vsak, pretoze by to bolo extremne matuce. Preto sa drz: cervena = +V, modra/cierna = GND.

**A mozem namiesto Arduina pouzit battery?** Ano. Breadboardu je v principe jedno, odkial napajanie pochadza. Ale musis davat pozor na voltage. Ak ma komponent povolene napriklad maximalne 5 V, nemozes mu priviest 9 V battery priamo. Vtedy sa dostavame k tomu, co sme uz riesili pri voltage regulatoroch: Battery 9 V → Voltage regulator → 5 V → Breadboard.

**Arduino teda nie je vzdy „zdroj" v pravom zmysle.** Ked mas USB → Arduino → 5V pin → breadboard, energia v skutocnosti povodne pochadza z USB zdroja. Arduino ti len poskytuje vhodny bod, z ktoreho mozes napajat mensie externe obvody v ramci limitov dosky a zdroja.

**Pozor na motory a dalsie vykonnejsie zariadenia.** To, ze ma Arduino 5V pin, neznamena ze z neho mozes napajat cokolvek. Mala LED alebo jednoduchy sensor potrebuje relativne maly prud. Motor moze potrebovat podstatne viac. Pri motoroch a vykonnejsich zariadeniach preto casto pouzivame samostatne napajanie + transistor/MOSFET alebo motor driver.

---

## 14. Binding posts

Niektore vacsie breadboards su upevnene na podlozke a maju farebne svorky nazvane **binding posts (pripojovacie svorky)**.

Dolezity detail vsak je, ze samotny binding post nemusi byt automaticky elektricky spojeny s otvormi breadboardu. Najprv teda potrebujes vodicom prepojit binding post s prislusnym power railom.

![Binding posts](/book/arduino/lesson2/12-a-binding-posts.jpg)

![Binding posts - detail](/book/arduino/lesson2/12-binding-posts-b.jpg)

![Binding posts - pripojenie](/book/arduino/lesson2/16-binding-posts.jpg)

---

## 15. Benchtop power supply

V elektronickych laboratoriach sa casto pouziva **benchtop power supply (laboratorny napajaci zdroj)**. Je to zariadenie, na ktorom mozes nastavit pozadovane napatie.

![Laboratorny napajaci zdroj](/book/arduino/lesson2/17-benchtop-power-supplies.jpg)

![Barrel jack pripojenie](/book/arduino/lesson2/18-the-barrel-jack-is-soldered-to-two-wires-that-.jpg)

---

## 16. Breadboard power supply

Dalsiou moznostou je **breadboard power supply (napajaci modul pre breadboard)**. Ide o malu elektronicku dosku navrhntu tak, aby sa dala pripojit priamo k breadboardu.

Tu je velmi dolezite spravne zapojenie polarity. GND musi ist na - rail a VCC na + rail.

![Breadboard power supply modul](/book/arduino/lesson2/19-breadboard-power-supplies.jpg)

---

## 17. Podme konecne postavit jednoduchy obvod

Teraz spojime vsetko, co uz pozname. Chceme vytvorit obvod, v ktorom po stlaceni tlacidla zasvieti LED.

Budeme potrebovat: power source, LED, 330 ohm resistor, button (tlacidlo), jumper wires, breadboard.

Elektricky ma byt obvod zapojeny takto:

**VCC → LED → 330 ohm resistor → button → GND**

![Jednoduchy obvod - dve rozne zapojenia toho isteho obvodu](/book/arduino/lesson2/20-a-simple-circuit,-involving-a-button,-an-led,-and-a-resistor,-built-two-different-ways..jpg)

---

## 18. Ako obvod funguje krok po kroku

**Prvy krok:** Zo + power rail vedie vodic k **anode (anode) LED**. Anode je pozitivna strana LED.

**Druhy krok:** Z cathode (katody) LED pokracujeme do **330 ohm resistoru**. Resistor v obvode pomaha obmedzit elektricky prud prechadzajuci LED.

**Treti krok:** Za resistorom sa nachadza **button (tlacidlo)**. Button je v tomto pripade switch. Ked tlacidlo nie je stlacene, elektricka cesta je prerusena.

**Stvrty krok:** Druha strana button je pripojena ku **GND**.

Ked button nie je stlaceny, cesta je prerusena - LED nesvieti. Ked button stlacis, cesta sa uzavrie: **VCC → LED → resistor → button → GND** a LED sa rozsvieti.

---

## 19. Co znamena "complete the circuit"?

Nestaci mat bateriu + LED + resistor. Musi existovat vhodna uzavrena elektricka cesta.

Ked button rozpoji cestu, mame: **open circuit (otvoreny/preruseny obvod)**.

Ked button cestu spoji, mame: **closed circuit (uzavreny obvod)**.

![Schema obvodu](/book/arduino/lesson2/21-circuit-schematics.jpg)

---

## 20. Ako dostaneme schematic na breadboard?

Toto je mozno najdolezitejsia prakticka schopnost celej lekcie.

Tvojou ulohou nie je nakreslit rovnaky tvar na breadboarde. Tvojou ulohou je **zachovat rovnake elektricke spojenia**.

Ked zacnes rozmyslat takto, breadboard prestane byt hlavolam.

Dve rozne breadboard zapojenia mozu vyzerat uplne inak, ale ak zachovavaju rovnake elektricke spojenia, predstavuju rovnaky circuit.

---

## 21. Fritzing: virtualny breadboard

Ked este nemas fyzicke komponenty alebo si chces zapojenie najprv naplanovat, existuju programy na tvorbu elektronickych obvodov. Material spomina napriklad **Fritzing**.

![Prakticke cvicenie](/book/arduino/lesson2/22-practice-makes-perfect.jpg)

---

## 22. Co si kupit?

Na zaver material spomina, co si mozes kupit pre zaciatok:

**Breadboard** - zakladny nastroj na prototypovanie.

![Typy breadboardov](/book/arduino/lesson2/23-breadboards.jpg)

![Nakup breadboardu](/book/arduino/lesson2/23-purchasing-a-breadboard.jpg)

**Jumper wires** - prepojovacie vodice.

![Jumper wires](/book/arduino/lesson2/24-jumper-wires.jpg)

**Solderable breadboards a protoboards** - pre finalne verzie obvodov.

![Solderable breadboards](/book/arduino/lesson2/25-solderable-breadboards-and-protoboards.jpg)

---

## Na co pamatat

**Breadboard je system skrytych kovovych spojeni pod plastom.** Dierky samy osebe nie su to najdolezitejsie. Dolezite je, co sa nachadza pod nimi.

**Hlavna pracovna cast** obsahuje male skupiny piatich spojenych otvorov.

**Stredova medzera** oddeluje lavu a pravu stranu - otvory na opacnych stranach NIE SU spojene.

**Power rails** vytvaraju dlhsie rozvody pre VCC a GND, ale samy o sebe neobsahuju napatie.

**Jumper wires** ti umoznuju vytvarat spojenia medzi miestami, ktore breadboard sam neprepaja.

**Elektronicky obvod nezaujima fyzicke rozlozenie** komponentov na breadboarde. Zaujima ho, co je s cim elektricky spojene.

**Schematic hovori CO ma byt spojene. Breadboard hovori AKO to fyzicky spojit.**

Najcastejsie chyby:
- Obe nozicky komponentu v tom istom elektrickom bode
- Power rail nie je pripojeny k zdroju
- Predpoklad, ze cely power rail je spojeny (moze byt preruseny)
- Pozeranie sa na vzdialenost namiesto na skutocne elektricke spojenie`;
