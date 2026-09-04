// Arduino - Lesson 3: Resistors
// Full lesson content - DO NOT SHORTEN

export const arduinoLesson3Content = `# Resistor od uplneho zaciatku - co je, ako funguje a preco ho najdes takmer v kazdom obvode

Resistor (rezistor) je jedna z najzakladnejsich elektronickych suciastok. Na prvy pohlad vyzera mozno trochu nudne: maly valcek s farebnymi pasikmi alebo drobny obdlznik na PCB. Nesvieti ako LED, nepohybuje sa ako motor a nevykonava program ako microcontroller. Napriek tomu je resistor takmer vsade, pretoze pomaha riadit, kolko current (prudu) moze v urcitej casti circuit (obvodu) tiect, delit voltage (napatie) a nastavovat spravne elektricke podmienky pre ine komponenty.

Predstav si vodovodni potrubie. Voda v nom tecie a ty do potrubia vlozis uzsiu cast. Voda sa nezastavi uplne, ale zuzenie jej kladie odpor. Resistor robi v elektrickom obvode nieco podobne: kladie odpor pohybu elektrickeho naboja. Prave preto sa tato jeho vlastnost vola **resistance (elektricky odpor)**.

![Uvod do resistorov](/book/arduino/lesson3/intro.png)

---

## 1. Co resistor v skutocnosti robi?

Resistor ma urcitu hodnotu resistance a tato hodnota urcuje, ako silno bude pri danom voltage obmedzovat current.

Predstav si dva resistors. Jeden ma **100 ohm** a druhy **10 000 ohm, teda 10 kohm**. Obidva su resistors, ale ich spravanie nie je rovnake. Pri rovnakom napati bude cez 10 kohm resistor tiect omnoho mensi current nez cez 100 ohm resistor.

Typickym prikladom je LED. Ak ju pripojis k zdroju nevhodnym sposobom bez obmedzenia prudu, moze sa poskodit. Preto sa s nou velmi casto zapaja resistor, ktory current obmedzi na vhodnu hodnotu.

**Resistor teda nie je "prekazka, ktora elektrinu vypina". Elektricka cesta cez resistor stale existuje. Resistor iba ovplyvnuje, kolko prudu bude za danych podmienok tiect.**

---

## 2. Resistance meriame v ohmoch

Hodnotu resistance meriame v jednotke **ohm** so symbolom **ohm**.

Ked su hodnoty vacsie, pouzivaju sa bezne predpony:

**kilo = 1000** a **mega = 1 000 000**

Napriklad: **4700 ohm = 4.7 kohm** a **5 600 000 ohm = 5.6 Mohm**

![Schematicky symbol resistora](/book/arduino/lesson3/2-schematic-symbol.png)

---

## 3. Preco spolu suvisia voltage, current a resistance?

Resistor je velmi uzko spojeny s jednym zo zakladnych vztahov elektroniky: **Ohm's Law (Ohmov zakon)**.

Ten spaja tri veliciny: **voltage (napatie)**, **current (prud)** a **resistance (odpor)**.

**I = V / R**

To znamena, ze current zavisi od voltage a resistance.

Priklad: Na resistor privedieme 5 V a resistor ma 100 ohm. Potom: **I = 5 / 100 = 0.05 A = 50 mA**.

Ak necham rovnakych 5 V, ale resistor zmenim na 1000 ohm: **I = 5 / 1000 = 0.005 A = 5 mA**.

Resistance sme desatnasobne zvysili a current sa desatnasobne zmensil.

![Resistor v obvode - nastavenie frekvencie](/book/arduino/lesson3/3-in-this-circuit,-resistors-play-a-key-role-in-setting-the-frequency-.png)

---

## 4. Resistor je passive component

Resistor patri medzi **passive components (pasivne suciastky)**. To znamena, ze sam nevyraba energiu. V obvode energiu spotrebuva a cast elektrickej energie premena predovsetkym na **heat (teplo)**.

---

## 5. Ako resistor vyzera na schematic?

Kazdy obycajny resistor ma **dva terminals (dva vyvody)**. Na schematic moze byt zakresleny dvoma veľmi beznymi sposobmi.

**Americky symbol** vyzera ako cikcak. **Medzinarodny symbol** pouziva obdlznik. Obidva znamenaju to iste: resistor.

---

## 6. Through-hole resistor

Through-hole resistor ma dlhe kovove vyvody. Prave tento typ bude velmi prakticky pri praci s breadboardom.

Velmi caste je **axial package (axialne puzdro)**. Telo je uprostred a vyvody smeruju na dve opacne strany.

![Through-hole resistory](/book/arduino/lesson3/4-through-hole-resistors-.png)

---

## 7. SMD resistor

Moderne elektronicke zariadenia potrebuju byt male. Preto sa velmi casto pouzivaju **SMD - Surface-Mount Device (suciastky montovane na povrch)**.

SMD resistor je velmi maly obdlznik s vodivym kontaktom na oboch koncoch. Bezne standardizovane rozmery zahrnuju napriklad: **0805, 0603, 0402**.

![SMD resistory](/book/arduino/lesson3/5-surface-mount-resistors-.jpg)

---

## 8. Z coho je resistor vyrobeny?

Material spomina napriklad: **carbon film (uhlikovu vrstvu)**, **metal film (kovovu vrstvu)** a **metal-oxide film**. Existuju aj **wirewound resistors (drotove rezistory)**.

![Zlozenie resistora](/book/arduino/lesson3/6-resistor-composition.jpg)

---

## 9. Resistor array: viac resistorov v jednom package

Niekedy v circuit potrebujeme napriklad pat rovnakych resistorov. Existuju **resistor arrays (rezistorove polia)** - jedno package moze obsahovat niekolko resistorov naraz.

![Specialne puzdra resistorov](/book/arduino/lesson3/7-special-resistor-packages.png)

---

## 10. Variable resistors a Potentiometer

Bezny resistor ma stabilnu hodnotu. Existuju vsak **variable resistors (premenne rezistory)**.

**Potentiometer** ma typicky tri terminals. Vo vnutri ma odporovu drahu a pohyblivy kontakt nazvany **wiper (jazdec)**.

![Premenne rezistory](/book/arduino/lesson3/8-variable-resistors-.png)

---

## 11. Ako zistime hodnotu klasickeho resistora? Color bands

Na vacsine klasickych through-hole resistorov nenajdes jednoducho napisane 4700 ohm. Namiesto toho maju na tele **color bands (farebne pasiky)**.

Pri stvorpasmikovom resistore:

| Pasik | Co znamena |
|-------|------------|
| 1. | prva cislica |
| 2. | druha cislica |
| 3. | multiplier (nasobitel) |
| 4. | tolerance (tolerancia) |

![Dekodovanie farebnych pasikov](/book/arduino/lesson3/9-decoding-the-color-bands.png)

![Dekodovanie - priklad](/book/arduino/lesson3/10-decoding-resistor-color-bands.jpg)

---

## 12. Farby a ich cisla

| Farba | Cislo |
|-------|-------|
| Black (cierna) | 0 |
| Brown (hneda) | 1 |
| Red (cervena) | 2 |
| Orange (oranzova) | 3 |
| Yellow (zlta) | 4 |
| Green (zelena) | 5 |
| Blue (modra) | 6 |
| Violet (fialova) | 7 |
| Gray (siva) | 8 |
| White (biela) | 9 |

![Tabulka farebnych kodov](/book/arduino/lesson3/11-resistor-color-code-table.png)

---

## 13. Priklad: Yellow - Violet - Red - Gold

Prvy pasik: Yellow = 4. Druhy: Violet = 7. Prve dve cislice su teda **47**.

Treti pasik: Red. Ako multiplier znamena x100. Preto: **47 x 100 = 4700 ohm = 4.7 kohm**.

Posledny pasik: Gold = **+-5 % tolerance**.

---

## 14. Co je tolerance?

Ak mame 1 kohm +-5 %, potom 5 % z 1000 ohm = 50 ohm. Realny resistor teda moze mat priblizne **950 ohm az 1050 ohm** a stale je to spravny 1 kohm +-5 % resistor.

---

## 15. SMD resistor oznacenia

Na malickom SMD resistore sa pouzivaju cisla. Napriklad **104** znamena: 10 x 10000 = **100 000 ohm = 100 kohm**.

![Dekodovanie SMD oznaceni](/book/arduino/lesson3/12-decoding-surface-mount-markings.jpg)

![E96 system](/book/arduino/lesson3/13-so-a-01c-resistor-is-our-good-friend.jpg)

---

## 16. Power rating: resistor sa moze zahriavat

Ked resistorom preteka current, cast elektrickej energie premena na **heat (teplo)**. Preto ma kazdy resistor urcity maximalny **power rating** merany vo **watts (W)**.

Bezne resistors mozu mat napriklad: 1/8 W, 1/4 W, 1/2 W alebo 1 W.

![Power rating resistora](/book/arduino/lesson3/14-finding-a-resistor's-power-rating.jpg)

Zakladny vztah: **P = V x I**

Dalsi uzitocne vzorce: **P = I squared x R** a **P = V squared / R**

![Meranie power na resistore](/book/arduino/lesson3/15-measuring-power-across-a-resistor-.png)

![Power - dalsie priklady](/book/arduino/lesson3/15-measuring-power-across-a-resistor-b.png)

---

## 17. Series resistors - zapojenie za sebou

Pri series connection sa resistance scita: **Rtotal = R1 + R2 + R3 + ...**

Ak mame 100 ohm + 200 ohm, vysledok je **300 ohm**.

![Series resistors](/book/arduino/lesson3/16-series-resistors-a.png)

![Series resistors - priklad](/book/arduino/lesson3/16-series-resistors-b.png)

---

## 18. Parallel resistors - zapojenie vedla seba

Pri parallel connection: **1/Rtotal = 1/R1 + 1/R2 + ...**

Total resistance parallel combination je **mensia nez resistance kazdej jednotlivej vetvy**.

Dva rovnake resistors paralelne vytvoria polovicu hodnoty jedneho: **100 ohm || 100 ohm = 50 ohm**

Pre dva rozne: **Rtotal = (R1 x R2) / (R1 + R2)**

![Parallel resistors](/book/arduino/lesson3/17-parallel-resistors.png)

![Parallel resistors - vzorec](/book/arduino/lesson3/17-parallel-resistors-b.png)

![Dva resistory paralelne](/book/arduino/lesson3/18-just-two-resistors-in-parallel.png)

---

## 19. Resistor networks

V realnom circuit mozes mat kombinaciu mnozstva series a parallel resistors. Riesenim je postupne zjednodusovanie - najdi jednoduche casti, nahrad ich jednou hodnotou, opakuj.

![Resistorove siete](/book/arduino/lesson3/19-resistor-networks.png)

![Resistorove siete - krok 2](/book/arduino/lesson3/19-resistor-networks-b.png)

![Resistorove siete - vysledok](/book/arduino/lesson3/19-resistor-networks-c.png)

---

## 20. Prakticke pouzitie: resistor pri LED

Velmi caste zapojenie: **VCC - resistor - LED - GND**

Ulohou resistora je nastavit current do bezpecnej hodnoty pre LED.

**R = (Vs - Vf) / If**

kde Vs = source voltage, Vf = LED forward voltage, If = pozadovany current.

![LED current limiting](/book/arduino/lesson3/20-led-current-limiting.png)

![Current-limiting resistor](/book/arduino/lesson3/21-current-limiting-resistor.png)

Priklad: 9 V bateria, LED s forward voltage 1.8 V, chceme 10 mA:

**R = (9 - 1.8) / 0.010 = 720 ohm**

![9V bateria a LED](/book/arduino/lesson3/22--9v-battery-to-power-an-led.png)

---

## 21. Prakticke pouzitie: Voltage divider

Dve resistors mozu vytvorit **voltage divider (delic napatia)**:

**Vout = Vin x R2 / (R1 + R2)**

Priklad: R1 = 1.7 kohm, R2 = 3.3 kohm, Vin = 5 V. Vout = 5 x 3.3 / 5 = **3.3 V**

![Voltage divider](/book/arduino/lesson3/23-voltage-dividers.png)

![Voltage divider - vzorec](/book/arduino/lesson3/23-voltage-dividers-b.png)

![Voltage divider - senzory](/book/arduino/lesson3/23-voltage-dividers-c.png)

---

## 22. Prakticke pouzitie: Pull-up resistor

**Pull-up resistor** zabranuje tomu, aby input pin microcontrollera zostal **floating (plavajuci)**.

Typicke zapojenie: 5V - 10 kohm - MCU input - button - GND.

Ked button nie je stlaceny: input je HIGH (cez resistor spojeny s 5V).

Ked button stlacis: input je LOW (pripojeny na GND).

Bez resistora by stlacenie button vytvorilo **short circuit (skrat)**.

![Pull-up resistory](/book/arduino/lesson3/24-pull-up-resistors.jpg)

---

## Na co pamatat

**Resistance** hovori, ako silno resistor ovplyvni current pri danom voltage. Meriame ju v **ohm**.

**Ohm's Law: I = V / R** - vyssia resistance pri rovnakom voltage znamena nizsi current.

**Through-hole** resistory maju farebne pasiky, **SMD** maju ciselne kody.

**Tolerance** hovori, aka odchylka od nominalnej hodnoty je prisplatna.

**Power rating** urcuje, kolko tepla resistor bezpecne zvladne.

**Series:** Rtotal = R1 + R2 + R3

**Parallel:** 1/Rtotal = 1/R1 + 1/R2 (vysledok je vzdy mensi nez najmensi)

**Prakticke pouzitia:** LED current limiting, voltage divider, pull-up resistor.

Resistor nie je iba "suciastka, ktora brzdi prud." Je to jednoduchy nastroj, ktorym vieme vytvarat pozadovane elektricke podmienky v obvode.`;
