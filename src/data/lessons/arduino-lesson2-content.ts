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

![Preco pouzivat breadboard](/book/arduino/lesson2/4-why-use-breadboards?.jpg)

---

## 2. Preco sa elektronicka doska vola "breadboard"?

Nazov je zvlastny, pretoze breadboard doslova znamena doska na krajanie chleba. A tento nazov skutocne pochadza od chleba.

V casoch, ked boli elektronicke suciastky omnoho vacsie nez dnes, ludia potrebovali nejaku plochu, na ktorej mohli experimentalne obvody zostavovat. Jednym z rieseni bolo vziat obycajnu drevenu dosku na chlieb, zatlct do nej klince alebo pripinaciky a medzi nimi upevnovat vodice a elektronicke komponenty.

![Historia breadboardu](/book/arduino/lesson2/2-history.jpg)

Neskor vznikli omnoho praktickejsie sposoby prototypovania. Pred rozsirenim modernych breadboardov sa pouzivala napriklad technika wire-wrap.

![Wire-wrap a nazov breadboard](/book/arduino/lesson2/3-what's-in-a-name.jpg)

![Solderless breadboard](/book/arduino/lesson2/3-what's-in-a-name-b.jpg)

Moderny breadboard je ovela pohodlnejsi, ale historicky nazov zostal. Presnejsi nazov je: **solderless breadboard (nepajive kontaktne pole)**.

---

## 3. Najdolezitejsia vec: breadboard nie je iba plasticka doska s dierkami

Ked sa na breadboard pozries zhora, vidis predovsetkym velke mnozstvo otvorov. Mohlo by sa preto zdat, ze kazdy otvor je samostatny.

**Nie je.**

Pod plastom sa nachadzaju kovove vodive pasiky s pruznymi kontaktmi. Ked do otvoru vlozis vyvod resistora alebo jumper wire (prepojovaci vodic), kovovy kontakt ho zachyti.

A teraz prichadza najdolezitejsia myslienka celej lekcie:

**Niektore otvory su pod plastom spojene tym istym kovovym pasikom.**

To znamena, ze su elektricky spojene, aj ked zhora medzi nimi nevidis ziaden vodic.

![Anatomia breadboardu - vnutorne spojenia](/book/arduino/lesson2/5-anatomy-of-a-breadboard.jpg)

---

## 4. Terminal strips: skupiny piatich spojenych otvorov

Pozrime sa najprv na hlavnu pracovnu cast breadboardu.

Na typickom breadboarde su otvory usporiadane do skupin. V jednej skupine byva **pat otvorov elektricky prepojenych spolocnym kovovym pasikom**.

Ak vlozis jeden vyvod komponentu do A10 a vodic do D10, tieto dva vyvody su elektricky spojene. Nemusis medzi nimi pridavat dalsi vodic. Pretoze spojenie uz existuje pod plastom breadboardu.

![Terminal strips - skupiny spojenych otvorov](/book/arduino/lesson2/6-terminal-strips.jpg)

![Terminal strips - detail](/book/arduino/lesson2/6-terminal-strips-a.jpg)

---

## 5. Co sa stane, ked do jednej skupiny vlozis viac komponentov?

Predstav si, ze do jednej patotvorovej skupiny vlozis: vyvod resistora, vyvod LED a jeden jumper wire.

Ak su vsetky tri vlozene do otvorov patriacich tomu istemu kovovemu pasiku, vsetky tri vyvody sa nachadzaju na rovnakom elektrickom bode.

Je to rovnake, ako keby si ich spojila vodicmi.

A toto je presne sposob, akym na breadboarde realizujes spojenia zo schematic.

---

## 6. Preco je uprostred breadboardu medzera?

Typicky breadboard ma v strede dlhu medzeru, ktora ho opticky rozdeluje na dve polovice. Tato medzera sa casto oznacuje ako **center gap** alebo **ravine (stredova medzera)**.

Elektricky teda plati:

**A10-B10-C10-D10-E10** su SPOJENE

**F10-G10-H10-I10-J10** su SPOJENE

**Medzi E10 a F10 spojenie NIE JE**

Toto je extremne dolezite. Pat otvorov na jednej strane moze byt spojenych, ale pat otvorov na druhej strane patri k inemu kovovemu pasiku.

---

## 7. Stredova medzera a LED

Predstav si LED. LED ma dve nozicky: **anode (anodu)** a **cathode (katodu)**. Tieto dve nozicky nemaju byt jednoducho spojene do jedneho elektrickeho bodu.

Preto mozes LED umiestnit tak, aby boli jej dve nozicky v roznych elektrickych skupinach. Jednym zo sposobov je umiestnit ich cez stredovu medzeru.

![LED vlozena do breadboardu cez stredovu medzeru](/book/arduino/lesson2/7-an-led-inserted-into-a-breadboard.-.jpg)

---

## 8. Stredova medzera a DIP chips

Stredova medzera je mimoriadne uzitocna pri **Integrated Circuits - ICs (integrovanych obvodoch)**.

Mnohe klasicke cipy sa vyrabaju v puzdre nazvanom **DIP - Dual In-line Package (dvojradove puzdro)**. Taky cip ma dve rady noziciek - jednu na lavej a jednu na pravej strane.

Urcite nechceme, aby sa protilahle nozicky automaticky elektricky spojili. Preto sa DIP chip umiestuje cez stredovu medzeru breadboardu.

![DIP chip na breadboarde](/book/arduino/lesson2/10-dip-support.jpg)

---

## 9. Power rails: elektricke "dialnice" po bokoch breadboardu

Okrem hlavnej pracovnej plochy ma vacsi breadboard po stranach casto dalsie dlhe rady otvorov. Nazyvaju sa **power rails (napajacie listy)**.

Obvykle pri nich uvidis **+** a **-** casto spolu s cervenou a modrou alebo ciernou ciarou.

Power rail funguje ako hlavny rozvod elektriny. Do + rail privedies napriklad 5 V a potom mas toto napatie pohodlne dostupne na mnohych miestach pozdlz breadboardu. Do - rail privedies GND.

![Power rails na breadboarde](/book/arduino/lesson2/8-power-rails.jpg)

![Prepojenie power rails jumper vodicmi](/book/arduino/lesson2/9-two-jumper-wires-used-to-connect-t.jpg)

---

## 10. Znacky + a - samy o sebe nevytvaraju napatie

Toto je velmi dolezite. Ked vidis na breadboarde cervenu ciaru a znak +, neznamena to, ze sa tam zazracne nachadza elektricke napatie.

**Breadboard sam nevyraba elektrinu.**

Znacky + a - su iba orientacne oznacenia. Ak chces pouzivat + rail ako 5 V, musis ho skutocne pripojit k 5 V zdroju. Ak chces pouzivat - rail ako GND, musis ho pripojit ku GND zdroja.

---

## 11. Nie vsetky power rails su automaticky spojene

Ak ma breadboard power rails na lavej aj pravej strane, nemusi medzi nimi existovat elektricke spojenie.

Ak chces mat rovnake napajanie na oboch stranach, mozes ich prepojit pomocou jumper wires.

![Niektore vacsie breadboardy maju prerusene power rails](/book/arduino/lesson2/14-note-some-larger-breadboards-will-often-isolate.jpg)

---

## 12. Na co su cisla a pismena?

Na breadboarde casto najdes: A, B, C, D, E... a 1, 2, 3, 4, 5...

Tieto oznacenia nemaju ziadnu elektricku funkciu. Su to jednoducho **adresy otvorov**. Predstav si sachovnicu. Ked niekto povie "E4", presne vies, o ktore policko ide.

![Riadky a stlpce na breadboarde](/book/arduino/lesson2/11-rows-and-columns.jpg)

---

## 13. Dalsie vlastnosti breadboardu

Niektore breadboardy maju na bokoch male vystupky a drazky, vdaka ktorym mozes spojit viac breadboardov vedla seba. Niektore maju tiez na spodnej strane adhesive backing (samolepiacu vrstvu).

![Dalsie vlastnosti breadboardu](/book/arduino/lesson2/13-other-features.jpg)

---

## 14. Ako dostaneme do breadboardu elektrinu?

Breadboard sam nie je zdroj energie. Aby obvod fungoval, musime k nemu pripojit **power source (zdroj napajania)**.

Jednou z najjednoduchsich moznosti je pouzit development board, napriklad **Arduino**. Arduino moze byt napajane cez USB a jeho power pins potom mozes prepojit s breadboardom.

![Pozicavanie napajania z inych zdrojov](/book/arduino/lesson2/15-borrowing-from-other-power-sources.jpg)

---

## 15. Binding posts

Niektore vacsie breadboards su upevnene na podlozke a maju farebne svorky nazvane **binding posts (pripojovacie svorky)**.

Dolezity detail vsak je, ze samotny binding post nemusi byt automaticky elektricky spojeny s otvormi breadboardu. Najprv teda potrebujes vodicom prepojit binding post s prislusnym power railom.

![Binding posts](/book/arduino/lesson2/12-a-binding-posts.jpg)

![Binding posts - detail](/book/arduino/lesson2/12-binding-posts-b.jpg)

![Binding posts - pripojenie](/book/arduino/lesson2/16-binding-posts.jpg)

---

## 16. Benchtop power supply

V elektronickych laboratoriach sa casto pouziva **benchtop power supply (laboratorny napajaci zdroj)**. Je to zariadenie, na ktorom mozes nastavit pozadovane napatie.

![Laboratorny napajaci zdroj](/book/arduino/lesson2/17-benchtop-power-supplies.jpg)

![Barrel jack pripojenie](/book/arduino/lesson2/18-the-barrel-jack-is-soldered-to-two-wires-that-.jpg)

---

## 17. Breadboard power supply

Dalsiou moznostou je **breadboard power supply (napajaci modul pre breadboard)**. Ide o malu elektronicku dosku navrhntu tak, aby sa dala pripojit priamo k breadboardu.

Tu je velmi dolezite spravne zapojenie polarity. GND musi ist na - rail a VCC na + rail.

![Breadboard power supply modul](/book/arduino/lesson2/19-breadboard-power-supplies.jpg)

---

## 18. Podme konecne postavit jednoduchy obvod

Teraz spojime vsetko, co uz pozname. Chceme vytvorit obvod, v ktorom po stlaceni tlacidla zasvieti LED.

Budeme potrebovat: power source, LED, 330 ohm resistor, button (tlacidlo), jumper wires, breadboard.

Elektricky ma byt obvod zapojeny takto:

**VCC → LED → 330 ohm resistor → button → GND**

![Jednoduchy obvod - dve rozne zapojenia toho isteho obvodu](/book/arduino/lesson2/20-a-simple-circuit,-involving-a-button,-an-led,-and-a-resistor,-built-two-different-ways..jpg)

---

## 19. Ako obvod funguje krok po kroku

**Prvy krok:** Zo + power rail vedie vodic k **anode (anode) LED**. Anode je pozitivna strana LED.

**Druhy krok:** Z cathode (katody) LED pokracujeme do **330 ohm resistoru**. Resistor v obvode pomaha obmedzit elektricky prud prechadzajuci LED.

**Treti krok:** Za resistorom sa nachadza **button (tlacidlo)**. Button je v tomto pripade switch. Ked tlacidlo nie je stlacene, elektricka cesta je prerusena.

**Stvrty krok:** Druha strana button je pripojena ku **GND**.

Ked button nie je stlaceny, cesta je prerusena - LED nesvieti. Ked button stlacis, cesta sa uzavrie: **VCC → LED → resistor → button → GND** a LED sa rozsvieti.

---

## 20. Co znamena "complete the circuit"?

Nestaci mat bateriu + LED + resistor. Musi existovat vhodna uzavrena elektricka cesta.

Ked button rozpoji cestu, mame: **open circuit (otvoreny/preruseny obvod)**.

Ked button cestu spoji, mame: **closed circuit (uzavreny obvod)**.

![Schema obvodu](/book/arduino/lesson2/21-circuit-schematics.jpg)

---

## 21. Ako dostaneme schematic na breadboard?

Toto je mozno najdolezitejsia prakticka schopnost celej lekcie.

Tvojou ulohou nie je nakreslit rovnaky tvar na breadboarde. Tvojou ulohou je **zachovat rovnake elektricke spojenia**.

Ked zacnes rozmyslat takto, breadboard prestane byt hlavolam.

Dve rozne breadboard zapojenia mozu vyzerat uplne inak, ale ak zachovavaju rovnake elektricke spojenia, predstavuju rovnaky circuit.

---

## 22. Fritzing: virtualny breadboard

Ked este nemas fyzicke komponenty alebo si chces zapojenie najprv naplanovat, existuju programy na tvorbu elektronickych obvodov. Material spomina napriklad **Fritzing**.

![Prakticke cvicenie](/book/arduino/lesson2/22-practice-makes-perfect.jpg)

---

## 23. Co si kupit?

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
