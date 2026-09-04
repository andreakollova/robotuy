// Arduino - Lesson 6: Sensor Interfacing
// Full lesson content - DO NOT SHORTEN

export const arduinoLesson6Content = `# Ako pripojit senzor k pocitacu alebo mikrokontroleru

Senzory su jednym zo zakladnych sposobov, ako moze elektronicke zariadenie ziskavat informacie o svojom okoli. Robot moze pomocou senzora zistovat vzdialenost od prekazky, inteligentny termostat moze merat teplotu a automaticke osvetlenie moze reagovat na mnozstvo svetla v miestnosti.

Samotny pocitac alebo mikrokontroler vsak fyzikalne veliciny, ako su teplota, tlak ci intenzita svetla, priamo merat nevie. Potrebuje, aby sa najprv premenili na elektricky signal, s ktorym dokaze pracovat.

Prave tym sa zaobera **sensor interfacing** - pripojenie senzora k elektronickemu systemu a uprava jeho vystupu do vhodnej formy:

**fyzikalna velicina → senzor → elektricky signal → uprava signalu → ADC → cislo v programe**

---

## 1. Dva zakladne typy senzorov

Bezne senzory mozeme rozdelit podla ich elektrickeho spravania na dve hlavne skupiny:

**Resistive sensors (odporove senzory)** - menia svoj elektricky odpor podla meranej veliciny. Spravania sa podobne ako premenlivy rezistor.

**Voltage-producing sensors (senzory vytvarajuce napatie)** - ich vystupom je priamo urcite napatie, ktore sa meni podla meranej veliciny.

Pri navrhu zapojenia preto vzdy potrebujeme vediet, aky typ vystupu senzor poskytuje a aky rozsah hodnot moze dosiahnut. Tieto informacie byvaju uvedene v **datasheete**.

---

## 2. Preco signal zo senzora casto nemozeme pouzit priamo

Ked senzor nieco zmeria, jeho vystup este nemusi byt vhodny pre pocitac alebo mikrokontroler. Vstup typicky prijima napatiovy signal v rozsahu priblizne **0 az 5 V**.

Ak mame odporovy senzor, nemame este napatie vobec - iba meniaci sa odpor.

Ak mame senzor ktory vytvara 0 az 40 V, je jeho napatie prilis velke.

Ak vytvara iba niekolko milivoltov, je napatie prilis male.

Ak vytvara napriklad -2 V az +2 V, cast jeho vystupu je zaporna.

Preto medzi senzor a vstup casto vlozime **signal conditioning circuit** - obvod na upravu signalu. Jeho ulohou je zmenit vystup senzora tak, aby mal vhodnu formu a rozsah.

Styri zakladne operacie: **premena odporu na napatie, zmensenie prilis velkeho napatia, zosilnenie prilis maleho napatia a posunutie napatia do vhodneho rozsahu.**

---

## 3. Ako premenit odpor senzora na napatie

Odporovy senzor neposkytuje priamo napatie. Preto potrebujeme jeho meniaci sa odpor previest na meniace sa napatie. Na tento ucel sa pouziva **voltage divider (delic napatia)**.

Delic napatia sa sklada z dvoch rezistorov zapojenych seriovo. Medzi nimi sa nachadza bod, z ktoreho odoberame vystupne napatie.

![Premena odporu na napatie - voltage divider](/book/arduino/lesson6/1-converting-a-resistance-to-a-voltage.png)

Jeho zakladny vzorec je:

**Vout = Vin x R2 / (R1 + R2)**

![Voltage divider vzorec](/book/arduino/lesson6/voltage_divider_formula2.png)

Predstavme si napajanie 5 V a dva rovnake rezistory s hodnotou 10 kohm:

**Vout = 5 x 10 / (10 + 10) = 2.5 V**

Teraz jeden z rezistorov nahradime odporovym senzorom. Ked sa odpor senzora zmeni, zmeni sa pomer oboch odporov a tym sa zmeni aj vystupne napatie.

![Senzor v deliči napatia](/book/arduino/lesson6/1-converting-a-resistance-to-a-voltage-b.jpg)

![Priklad vypoctu](/book/arduino/lesson6/voltage_divider_formula3.png)

---

## 4. Preco zalezi na hodnote druheho rezistora

Pri odporovom senzore nestaci zvolit lubovolny pevny rezistor. Jeho hodnota ovplyvnuje, aky rozsah vystupneho napatia dostaneme.

Ak by sme zvolili velmi nevhodnu hodnotu, mohlo by sa stat, ze sa vystupne napatie pri celej zmene senzora pohne iba velmi malo. Elektronika by sice tuto zmenu teoreticky mohla merat, ale vyuzili by sme iba malu cast dostupneho rozsahu.

Lepsie je zvolit rezistor tak, aby zmena odporu senzora sposobovala co najpraktickejsiu zmenu napatia.

![Vplyv hodnoty rezistora](/book/arduino/lesson6/voltage_divider_formula4.png)

---

## 5. Senzor ktory uz vytvara napatie

Druhy typ senzora vytvara na svojom vystupe priamo napatie. Nemusime odpor prevadat na napatie.

Stale vsak musime skontrolovat rozsah. Ak senzor vytvara 0 az 4 V a vstup dokaze spracovat 0 az 5 V, jeho signal moze byt vhodny. Ak vsak vytvara 0 az 40 V, priamym pripojenim by sme prekrocili povoleny rozsah vstupu.

---

## 6. Ako zmensit napatie pomocou delica

Predstavme si senzor s rozsahom **0 az 40 V** a vstup ktory dokaze spracovat **0 az 5 V**.

Potrebujeme vytvori obvod, ktory kazde vstupne napatie zmensi na jednu osminu povodnej hodnoty: **5/40 = 1/8**

Zvolime napriklad: **R1 = 70 kohm** a **R2 = 10 kohm**

**10 / (70 + 10) = 1/8**

Pri 40 V na vstupe dostaneme 5 V na vystupe. Pri 20 V dostaneme 2.5 V. Pri 8 V dostaneme 1 V.

![Delenie napatia](/book/arduino/lesson6/2.-dividing-a-voltage-voltage_divider_formula6.png)

![Priklad delenia](/book/arduino/lesson6/voltage_divider_formula7.png)

---

## 7. Co je analogovo-digitalny prevodnik

**ADC (Analog-to-Digital Converter)** zoberie analogove napatie a premeni ho na digitalne cislo.

Predstavme si ADC ktory meria rozsah 0 az 5 V a vytvara cisla od 0 do 1023:

**0 V → 0**

**2.5 V → priblizne 512**

**5 V → 1023**

V tejto chvili sa uz dostavame z elektroniky do programu. Ak ADC zmeri napatie a vytvori cislo 512, software s tymto cislom moze dalej pracovat.

Cela cesta: **teplota → senzor → 2.5 V → ADC → 512 → program**

---

## 8. Preco niekedy potrebujeme male napatie zosilnit

Nie kazdy senzor vytvara velky signal. Niektore mozu vytvarat iba niekolko milivoltov.

Predstavme si senzor s vystupom **0 az 0.2 V** a ADC s rozsahom **0 az 5 V**.

Senzor vyuziva iba 4 % z dostupneho rozsahu. Ak by sme vsak signal zosilnili dvadsatkrat, rozsah by sa zmenil na **0 az 4 V**.

Na taketo zosilnenie mozeme pouzit **operational amplifier (operacny zosilnovac, op-amp)**.

![Zosilnenie napatia](/book/arduino/lesson6/3.-amplifying-a-voltage.png)

---

## 9. Operacny zosilnovac a zosilnenie signalu

Pri zapojeni op-ampu ako zosilnovaca zavisi zosilnenie od dvoch rezistorov:

**A = 1 + R2/R1**

kde A je **gain (zosilnenie)**.

![Op-amp zosilnovac obvod](/book/arduino/lesson6/voltage_amplifier_circuit.jpg)

Ak chceme zosilnenie 20: **20 = 1 + R2/R1**, teda **R2 = 19 x R1**

Ak R1 = 10 kohm, potom R2 = 190 kohm.

![Vzorec zosilnenia](/book/arduino/lesson6/voltage_amplifier_formula2.png)

![Priklad zosilnenia](/book/arduino/lesson6/voltage_amplifier_formula3.png)

Ak senzor vytvori 0.1 V, pri dvadsatnasobnom zosilneni dostaneme priblizne 2 V. Ak vytvori 0.2 V, dostaneme priblizne 4 V.

---

## 10. Preco nemozeme zosilnovat neobmedzene

Realny signal nie je dokonale cisty. Moze obsahovat male rusenie, sum alebo nepresnosti. Ak cely signal zosilnime, mozeme spolu s uzitocnou informaciou zosilnit aj tieto nezelane casti.

Zosilnenie 1000x moze byt z tohto pohladu problematickejsie nez zosilnenie 2x.

Signal chceme upravit dostatocne na to, aby sa dal dobre merat, ale nechceme ho zbytocne prehanat.

---

## 11. Co ak senzor vytvara aj zaporne napatie

Niektore senzory mozu vytvarat signal rozlozeny okolo 0 V, napriklad **-2 V az +2 V**.

Ak vsak ADC prijima iba napatie od 0 V vyssie, zapornu cast nemozeme priamo pouzit.

Riesenim je **voltage shifting** - posunutie napatia. Namiesto toho, aby sme zapornu cast odstranili, cely signal posunieme smerom nahor.

Ak mame -2 V az +2 V a ku kazdemu bodu pridame +2 V, dostaneme **0 V az 4 V**.

![Posunutie napatia](/book/arduino/lesson6/4.-shifting-voltages.jpg)

![Voltage shifter vzorec](/book/arduino/lesson6/voltage_shifter_formula.png)

Konkretne: -2 V → 0 V, -1 V → 1 V, 0 V → 2 V, +1 V → 3 V, +2 V → 4 V.

Vyznam signalu zostal zachovany. Zmenila sa iba jeho poloha na napativej osi.

---

## 12. Preco je posunutie lepsie nez odstranenie zapornych hodnot

Ak by sme vsetky zaporne hodnoty jednoducho zmenili na 0 V, stratili by sme informaciu. Povodne -0.5 V, -1 V aj -2 V by vsetky skoncili ako 0 V.

Pri posunutí vsak zostava medzi hodnotami zachovany rozdiel. Kazda povodna hodnota stale zodpoveda jednej konkretnej novej hodnote.

---

## 13. Kombinovanie viacerych uprav

Priklad senzora ktory vytvara **-20 V az +20 V** a ADC potrebuje **0 az 5 V**.

**Krok 1:** Posunieme o +20 V → dostaneme 0 V az 40 V.

**Krok 2:** Zmensime osemkrat → dostaneme 0 V az 5 V.

| Povodny signal | Po posunuti o +20 V | Po zmenseni 8x |
|---|---|---|
| -20 V | 0 V | 0 V |
| -10 V | 10 V | 1.25 V |
| 0 V | 20 V | 2.5 V |
| +10 V | 30 V | 3.75 V |
| +20 V | 40 V | 5 V |

Informacia zostala zachovana. Ak ADC zmeria 2.5 V, vieme ze to zodpoveda povodnemu 0 V zo senzora.

---

## 14. Co teda znamena signal conditioning

**Signal conditioning** znamena upravu elektrickeho vystupu senzora tak, aby ho dalsie zariadenie dokazalo spravne a bezpecne spracovat.

- Ak senzor meni odpor → **voltage divider** (odpor na napatie)
- Ak je napatie prilis velke → **zmensime ho** (delic napatia)
- Ak je prilis male → **zosilnime ho** (op-amp)
- Ak je ciastocne zaporne → **posunieme ho** (voltage shifting)
- Ak ma viac problemov → **kombinujeme** operacie

---

## 15. Cely proces na priklade svetelneho senzora

Automaticke osvetlenie miestnosti:

1. Odporovy senzor svetla meni resistance podla mnozstva svetla
2. Voltage divider premeni zmenu odporu na zmenu napatia
3. Pri svetle dostaneme napriklad 3.8 V, v tme 1.2 V
4. ADC prevede napatie na digitalne cisla
5. Program: ak hodnota klesne pod urcitu hranicu, zapni lampu

**mnozstvo svetla → zmena odporu → zmena napatia → ADC → cislo → rozhodnutie programu**

---

## 16. Cely proces na priklade senzora s napatovym vystupom

Senzor vytvara priamo 0 az 10 V, ale ADC prijima iba 0 az 5 V.

Pouzijeme voltage divider ktory signal zmensi na polovicu.

Ak sensor vytvori 2 V, ADC dostane 1 V. Ak 8 V, ADC dostane 4 V.

Program vie ze measured voltage je polovicne oproti povodnemu signalu, takze si ho moze spatne prepocitat.

---

## 17. Preco je datasheet pri senzore taky dolezity

Pri navrhu interface nestaci vediet nazov senzora. Potrebujeme konkretne cisla:

- Pri odporovom senzore: **minimalny a maximalny odpor**
- Pri senzore s napatovym vystupom: **minimalne a maximalne output voltage**
- **Povoleny rozsah vstupu** do ktoreho sensor pripajame

Bez tychto hodnot nevieme spravne navrhnut divider, zosilnenie ani voltage shift.

**Datasheet nie je nieco, co sa cita az vtedy, ked mame problem. Je to zakladny dokument, podla ktoreho interface circuit navrhujeme.**

---

## Na co pamatat

**Senzor meria fyzikalny svet, ale pocitac potrebuje elektricky signal v spravnom rozsahu.**

**Dva typy senzorov:** resistive (menia odpor) a voltage-producing (vytvaraju napatie).

**Signal conditioning** = uprava signalu:
- Odpor → napatie: **voltage divider**
- Prilis velke napatie: **zmensit** (delic napatia)
- Prilis male napatie: **zosilnit** (op-amp, gain = 1 + R2/R1)
- Zaporne napatie: **posunut** (voltage shifting)

**ADC** premeni analogove napatie na digitalne cislo.

**Cely proces:** fyzikalny svet → senzor → elektricky signal → signal conditioning → ADC → digitalna hodnota → program

**Datasheet** je zakladny dokument pri navrhu - obsahuje minimalne a maximalne hodnoty senzora.

**Toto je most medzi elektronikou a softwarom, ktory budes v robotike pouzivat neustale.**`;
