// Arduino - Lesson 1: How to Read Electronic Schematics
// Full lesson content - DO NOT SHORTEN

export const arduinoLesson1Content = `# Lekcia: Ako citat elektronicke schemy uplne od zaciatku

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

Normalny resistor ma pevnu hodnotu. Niekedy vsak potrebujeme odpor menit. Na to existuje **variable resistor (premenný rezistor)**. Na jeho symbole vidis klasicky resistor a cez neho sipku. Ta sipka ti jednoducho hovori: **Tuto hodnotu vieme nastavovat.**

**Potentiometer (potenciometer)** vyzera podobne ako variable resistor, ale ma **tri terminals**. Dva vyvody su na koncoch odporovej drahy a treti sa nazyva **wiper (jazdec)**.

![Potenciometre a premenne rezistory](/book/arduino/lesson1/3l-potentiometers-and-variable-resistors.png)

---

## 6. Capacitor (kondenzator): maly zasobnik elektrickeho naboja

**Capacitor (kondenzator)** si predstav ako malu nadrz, ktora dokaze na urcity cas ulozit elektricky naboj.

Jeho vlastnost sa nazyva **capacitance (kapacita)** a jej jednotkou je **farad, F**. Jeden farad je vsak v beznej elektronike casto velmi velka hodnota, preto uvidis mensie jednotky: **μF** = microfarad, **nF** = nanofarad, **pF** = picofarad.

Na symbole capacitore vidis dve ciary oproti sebe - dve vodive casti oddelene izolacnou vrstvou.

**Non-polarized capacitor** - nezalezi na orientacii.

**Polarized capacitor** - ma presne urcene, ktory terminal ma byt na pozitivnej strane (+) a ktory na negativnej.

![Typy kondenzatorov](/book/arduino/lesson1/4-capacitors.png)

---

## 7. Inductor (cievka)

Dalsia znacka vyzera ako navinuty drot. To je **inductor (cievka)**. Symbol dokonca trochu pripomina realny komponent, pretoze cievka naozaj moze byt vytvorena navinutym vodicom.

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

---

## 9. Power source (zdroj napajania)

Elektronicky obvod potrebuje energiu. **DC = Direct Current (jednosmerny prud)** - typicky bateria. **AC = Alternating Current (striedavy prud)** - typicky elektricka zasuvka.

![DC a AC zdroje napatia](/book/arduino/lesson1/7dc-or-ac-voltage-sources.png)

---

## 10. Battery (bateria)

Symbol baterie tvori dvojica rozne dlhych ciar. Dlhsia ciara = positive terminal (+), kratsia ciara = negative terminal (-).

![Symboly baterii](/book/arduino/lesson1/8-batteries.png)

---

## 11. VCC, 5V, V+ a GND

Predstav si velku elektronicku dosku, na ktorej je 50 komponentov a 30 z nich potrebuje pripojenie na rovnake napajanie. Mohli by sme od zdroja kreslit 30 dlhych ciar. Preto pouzivame **voltage nodes (napaetove uzly)**.

**VCC** = kladne napajanie obvodu.

**GND = Ground (zem)** = referencny bod obvodu, typicky 0 V.

![Napaetove uzly - VCC, GND, AGND](/book/arduino/lesson1/9-voltage-nodes.png)

---

## 12. Diode (dioda): elektricka jednosmerka

**Diode (diodu)** si mozes predstavit ako jednosmernu ulicu pre elektricky prud. Ma dva terminals: **anode (anoda)** a **cathode (katoda)**. Pri diode zalezi na orientacii!

![Typy diod - standardna, LED, photodiode](/book/arduino/lesson1/10-diodes.png)

**LED = Light-Emitting Diode** - vyžaruje svetlo. Sipky na symbole smeruju von.

**Photodiode** - reaguje na svetlo. Sipky smeruju dovnutra.

![Schottky a Zener diody](/book/arduino/lesson1/10-diodes-b.png)

![Dalsie typy diod](/book/arduino/lesson1/10-diodes-c.png)

---

## 13. Transistor (tranzistor): elektricky ovladany spinac

Na uplne zakladnej urovni si ho mozes predstavit ako **switch, ktory neovladas rukou, ale elektrickym signalom**.

### BJT - Bipolar Junction Transistor

Ma tri terminals: **B = Base (baza)**, **C = Collector (kolektor)**, **E = Emitter (emitor)**.

**NPN** - sipka smeruje von. Pomocka: **NPN = Not Pointing iN.**

**PNP** - sipka smeruje dovnutra.

![BJT tranzistory - NPN a PNP](/book/arduino/lesson1/11.-bipolar-junction-transistors-(bjts).png)

### MOSFET

Ma tri terminals: **G = Gate (hradlo)**, **D = Drain**, **S = Source**. Gate je riadiaci terminal.

Moze byt **N-channel** alebo **P-channel**.

![MOSFET tranzistory](/book/arduino/lesson1/12-metal-oxide-field-effect-transistors-(mosfets).png)

---

## 14. Digital logic gates (digitalne logicke hradla)

Digitalne systemy pracuju s dvomi logickymi stavmi: **0** a **1**.

**AND** = vysledok 1 iba ked platia oba vstupy.

**OR** = vysledok 1 ak plati aspon jeden vstup.

**XOR** = vysledok 1 ked su vstupy rozdielne.

**NOT** = otoci logicku hodnotu.

![Logicke hradla - AND, OR, XOR](/book/arduino/lesson1/13-digital-logic-gates.png)

**NAND** = AND + NOT, **NOR** = OR + NOT, **XNOR** = XOR + NOT. Preto maju tieto symboly na vystupe maly kruzok.

![NAND, NOR, XNOR hradla](/book/arduino/lesson1/13-digital-logic-gates-b.png)

---

## 15. Integrated Circuit - IC (integrovany obvod)

**IC** je cip. V jednom malom cipe moze byt mnozstvo vnutornych elektronickych prvkov. Na scheme sa IC casto kresli ako **obdlznik s vela pinmi**.

Predstav si IC ako hotel. Zvonku nemusis vidiet kazdy stol a postel. Staci vediet kde su vchody a vystupy.

![Integrovane obvody - ATmega328P a dalsie](/book/arduino/lesson1/14-integrated-circuits.png)

IC byvaju oznacene: **U1, U2, U3...**

---

## 16. Op-amp a Voltage regulator

**Op-amp (operacny zosilnovac)** vyzera ako trojuholnik s + a - na vstupoch.

**Voltage regulator (regulator napatia)** ma typicky: IN (vstup), OUT (vystup), GND.

![Op-amp a voltage regulator](/book/arduino/lesson1/15-unique-ics-op-amps,-voltage-regulators.png)

![Dalsie varianty](/book/arduino/lesson1/15-unique-icsop-amps,-voltage-regulators-b.png)

---

## 17. Crystal a Resonator

Microcontroller potrebuje casovu referenciu - nieco ako metronom. **Crystal (krystal)** alebo **resonator (rezonator)** poskytuju **clock signal (hodinovy signal)**.

![Krystaly a rezonatory](/book/arduino/lesson1/16-crystals-and-resonators.png)

---

## 18. Headers a Connectors

Elektronicka doska malokedy existuje sama. Connectors a headers sluzia na pripojenie baterií, senzorov, motorov, displeja, USB, programatora a dalsich zariadení.

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
