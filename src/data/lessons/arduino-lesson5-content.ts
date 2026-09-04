// Arduino - Lesson 5: LEDs
// Full lesson content - DO NOT SHORTEN

export const arduinoLesson5Content = `# LED uplne od zaciatku - co je, preco svieti a ako ju spravne zapojit

LED patri medzi tie elektronicke suciastky, ktore pozna prakticky kazdy. Najdes ju v telefone, monitore, aute, nabijacke, televizore, routeri, dialkovom ovladaci, inteligentnom osvetleni aj na vyvojovych doskach.

LED nie je iba "mala ziarovka". Je to **Light-Emitting Diode (svetlo emitujuca dioda)**, teda specialny typ diode. To znamena, ze vsetko, co uz vieme o diode, sa nam teraz velmi hodi: LED ma **anode** a **cathode**, zalezi na jej polarity, current cez nu prechadza spravnym smerom a pri tomto vedeni vznika urcity **forward voltage drop**.

**LED nesvieti preto, ze na nu jednoducho "dame napatie". LED svieti preto, ze cez nu v spravnom smere tecie vhodne obmedzeny prud.**

![Uvod do LED](/book/arduino/lesson5/introduction.jpg)

![LED v praxi](/book/arduino/lesson5/introduction-b.png)

---

## 1. LED je v prvom rade diode

LED funguje podla rovnakeho principu ako obycajna diode. Ma dva vyvody: **anode (anoda)** a **cathode (katoda)**.

Pri spravnom zapojeni moze conventional current tiect: **anode → cathode** a LED je vtedy **forward biased**.

Ak ju otocime opacne, dostane sa do **reverse bias** a current vacsinou neprejde. LED teda nebude svietit.

![Ako LED pouzivat](/book/arduino/lesson5/1-how-to-use-them.gif)

---

## 2. Ako rozoznat anode a cathode na skutocnej LED

Pri typickej through-hole LED:

**Dlhsia nozicka = anode**

**Kratsia nozicka = cathode**

Velmi casto ma LED aj jednu stranu plastickeho puzdra mierne splocenu. Tato plocha hrana zvycajne oznacuje **cathode**.

![Polarita LED - dlhsia nozicka je anode](/book/arduino/lesson5/2-polarity-matters.jpg)

---

## 3. Co sa vo vnutri LED deje, ked svieti

LED obsahuje velmi maly **semiconductor chip**. Vo vnutri je vytvoreny **p-n junction**. Ked LED zapojime vo forward direction a zacne cez nu tiect current, charge carriers sa pohybuju cez tento p-n junction. Electrons a holes sa mozu recombine a pri tom sa uvolni energia vo forme **photons (fotonov)** - teda svetla.

Preto sa LED nazyva Light-Emitting Diode - je to doslova diode, ktora pri spravnom vedeni vyzaruje svetlo.

---

## 4. Preco rozne LEDs svietia roznymi farbami

Farba LED nevznika iba tym, ze pred svetlo dame farebny plast. Samotny **semiconductor material** urcuje energiu emitted photons.

Rozne materialy maju odlisnu **band gap energy**. Energia photon suvisi s jeho wavelength. A wavelength urcuje farbu.

Preto moze jedna LED emitovat red light, ina green, blue, infrared alebo ultraviolet.

---

## 5. Forward voltage - preco LED potrebuje urcite napatie

Kazda LED ma charakteristicky parameter: **forward voltage - V_F**.

Napriklad bezna red LED moze mat forward voltage priblizne okolo 2 V, zatial co blue LED moze mat priblizne 3 V alebo viac.

LED nie je komponent, ktoremu jednoducho nastavis voltage. Jej **current-voltage relationship je nelinearny**. Ked sa dostane do forward conduction oblasti, mala zmena voltage moze sposobit velmi velku zmenu current.

**Prave current je to, co musime kontrolovat.**

![LED napatie](/book/arduino/lesson5/8led-voltage.jpg)

---

## 6. Preco LED nesmieme bezne pripojit priamo na 5 V

Ak LED pripojime priamo na 5 V bez resistora, moze cez nu zacat tiect velmi velky current. LED moze na chvilu svietit velmi jasne, ale zaroven sa zacne prehriavat a moze sa poskodit.

Preto sa v beznom LED circuit pouziva **current-limiting resistor**:

**5 V → resistor → LED → GND**

Resistor zabezpeci, ze current nebude nekontrolovane velky.

![LED bez matematiky - zakladne zapojenie](/book/arduino/lesson5/3-leds-without-math.png)

![330 ohm resistor pri LED](/book/arduino/lesson5/4-330-ohm-resistor.jpg)

---

## 7. Preco je resistor pri LED taky dolezity

Ak LED ma V_F = 2 V a supply je 5 V:

Zostavajuce voltage pre resistor: **5 V - 2 V = 3 V**

Ak chceme current 10 mA = 0.01 A: **R = 3 / 0.01 = 300 Ω**

V praxi pouzijeme blizku standardnu hodnotu, napriklad **330 Ω**.

Preto sa 330 Ω tak casto pouziva pri jednoduchych 5 V LED experiments. Nie preto, ze je to "magicka hodnota", ale preto, ze pri mnohych beznych kombinaciach poskytne rozumny current.

![Skusanie roznych resistorov](/book/arduino/lesson5/5-trial-and-error.png)

---

## 8. Co sa stane ked resistor zvacsime alebo zmensime

**Vacsi resistor** → vyssia resistance → mensi current → LED svieti slabsie

**Mensi resistor** → nizsia resistance → vacsi current → LED svieti jasnejsie

Ale iba do urcitej hranice. Ak resistor zmensime prilis, current moze prekrocit bezpecny limit LED.

---

## 9. Brightness LED zavisi najma od currentu

V ramci bezpecneho operating range rastie brightness s forward current.

**Maximum current nie je cielova hodnota.** Ak datasheet povie maximum continuous current = 20 mA, neznamena to, ze LED by sme mali vzdy prevadzkovat na 20 mA.

![LED current a brightness](/book/arduino/lesson5/7-led-current.jpg)

---

## 10. LED s coin cell battery

Mozno si videla jednoduchy experiment: CR2032 coin cell + LED. LED svieti bez external resistoru.

Preco sa neznict? Coin cell ma obmedzenú schopnost dodavat velky current a urcitu internal resistance, ktora current prirodzene obmedzuje.

**Ale z toho nesmieme vytvorit vseobecne pravidlo.** AA cell, Li-ion battery alebo bench power supply sa mozu spravat uplne inak.

![LED s coin cell battery](/book/arduino/lesson5/6-throwies-with-a-coin-cell-battery.png)

---

## 11. Datasheet - co o LED potrebujeme vediet

V datasheete najdes: forward current, peak current, forward voltage, reverse voltage, power dissipation, **wavelength**, **luminous intensity**, **viewing angle** a mechanical dimensions.

Najdolezitejsie pre prve zapojenie byvaju **V_F** a **recommended/maximum forward current**.

---

## 12. Viewing angle - kam LED vlastne svieti

LED nemusi vyzarovat svetlo rovnomerne do vsetkych smerov. Niektore LEDs maju uzky **viewing angle** - svetlo je koncentrovane dopredu. Ine maju wide viewing angle a svetlo rozptyluju do vacsieho priestoru.

Preto nie je "jasnejsia LED" vzdy automaticky lepsia. Niekedy ma iba uzsi beam.

![Viewing angle LED](/book/arduino/lesson5/9-viewing-angle.jpg)

---

## 13. Mechanical drawing

Datasheet obsahuje aj **mechanical drawing** s fyzickymi rozmermi LED.

![Rozmery LED](/book/arduino/lesson5/10-dimensions.jpg)

---

## 14. Typy LED

Existuje mnozstvo typov LED pre rozne pouzitia.

![Prehlad typov LED](/book/arduino/lesson5/11.-types-of-leds.jpg)

---

## 15. RGB LED - tri farby v jednom puzdre

**RGB LED** znamena Red, Green, Blue. Vo vnutri jedneho package su tri samostatne emitters. Ich brightness mozeme menit nezavisle a tym miesat vyslednu farbu.

Pri svetle pouzivame **additive color mixing**: Red + Green = Yellow, Green + Blue = Cyan, Red + Blue = Magenta, Red + Green + Blue = priblizne White.

RGB LED ma zvycajne **4 pins** - tri pre farby a jeden common. Existuju dva typy: **common cathode** a **common anode**.

![RGB LED](/book/arduino/lesson5/12-rgb-leds.jpg)

---

## 16. Cycling LED

Niektore LEDs maju vo vnutri okrem emitters aj **integrated circuit**. Cycling LED moze automaticky menit farby, blikat alebo robit fade transitions bez microcontrolleru.

![Cycling LED](/book/arduino/lesson5/12-cycling.jpg)

---

## 17. Addressable LED

Este pokrocilejsie su **addressable LEDs** (napriklad WS2812, APA102). Kazda LED obsahuje RGB emitters a control electronics. Microcontroller jej posiela digital data - kazda LED moze dostat vlastnu farbu a brightness.

Pri addressable strip putuju data z jednej LED k dalsej. Kazda si vezme svoj udaj a posunie zvysok dalej.

![Addressable LEDs](/book/arduino/lesson5/13-addressable-leds.jpg)

![WS2812B package](/book/arduino/lesson5/17-ws2812b-5050-package.jpg)

![APA102 package](/book/arduino/lesson5/17-apa102-2020-package.jpg)

![Addressable LED strip](/book/arduino/lesson5/18-5m-addressable-(apa102-5050)-led-strip-powered.jpg)

![Addressable LED matrix](/book/arduino/lesson5/18-close-up-of-8x32-addressable-(ws2812-5050)-led-matrix.jpg)

---

## 18. LED s built-in resistor

Existuju aj LEDs, ktore uz obsahuju **built-in current-limiting resistor**. Taky component moze byt navrhnuty napriklad priamo pre 5 V operation.

**Ale built-in resistor neznamena universal voltage input.** Aj takato LED ma maximum ratings.

![LED s built-in resistor](/book/arduino/lesson5/14-built-in-resistor.jpg)

![Built-in resistor LED svietiaca](/book/arduino/lesson5/15-super-bright-green-led-with-built-in-resistor-powered.jpg)

---

## 19. SMD LED

**SMD = Surface-Mount Device**. SMD LED ma male contact pads a montuje sa priamo na PCB. Take LEDs mozu byt velmi male a su idealne pre moderne compact electronics.

![SMD LED packages](/book/arduino/lesson5/16-surface-mount-(smd)-packages.jpg)

---

## 20. High-power LED

Indicator LED moze pracovat s niekolkymi miliampermi. Ale existuju aj **high-power LEDs** s electrical power 1 W, 3 W, 10 W alebo viac.

Spolu s tym prichadza problem: **heat**. High-power LED sa preto casto montuje na **heatsink (chladic)**.

Pri high-power LED sa casto pouziva **constant-current driver** namiesto obycajneho resistora.

![High power RGB LED](/book/arduino/lesson5/19-high-power-rgb-led.jpg)

![Hlinikovy chladic pre LED](/book/arduino/lesson5/19-aluminum-back-for-some-heat-dissipation.jpg)

---

## 21. Infrared LED

**IR LED (Infrared LED)** vyzaruje infracervene svetlo, ktore ludske oko nevidi. Pouziva sa napriklad v dialkovych ovladacoch - microcontroller v ovladaci moduluje IR LED rychlymi pulses a televizor ich IR receiver zachyti.

![IR LED](/book/arduino/lesson5/20-ir-led.jpg)

---

## 22. UV LED

**UV LED (Ultraviolet LED)** vyzaruje ultrafialove ziarenie. Pouziva sa pri fluorescence, inspection, counterfeit detection a niektorych curing processes.

UV moze poskodit oci a kozu - pri silnych UV LEDs sa musi pouzivat vhodna ochrana.

![UV LED](/book/arduino/lesson5/21-uv-led-inspecting-a-us-bill.jpg)

---

## 23. Kirchhoff's Voltage Law a LED circuits

V uzavretej loop sa vsetky voltage drops musia spolu rovnat supply voltage.

**5 V = V_F(LED) + V(resistor)**

Ak V_F = 2 V: resistor ma 3 V. Z toho pocitame current.

**Dve LEDs in series:** V_F1 + V_F2 = 4 V. Pre resistor zostava 1 V.

**Styri 2V LEDs in series na 5V** - nefunguje, pretoze by potrebovali 8 V ale mame len 5 V.

![Vypocet current-limiting resistora](/book/arduino/lesson5/23-calculating-current-limiting-resistors.png)

![Hlbsie do temy](/book/arduino/lesson5/22-delving-deeper.jpg)

---

## 24. Najdolezitejsi vzorec pre obycajnu LED

**R = (V_S - V_F) / I**

kde: V_S = supply voltage, V_F = forward voltage LED, I = desired LED current, R = potrebny resistor.

Priklad: V_S = 5 V, V_F = 2 V, I = 10 mA = 0.01 A

**R = (5 - 2) / 0.01 = 300 Ω** → pouzijeme napriklad **330 Ω**

---

## 25. PWM - riadenie brightness

Pri microcontrolleroch sa na riadenie brightness casto pouziva **PWM - Pulse Width Modulation**. LED sa velmi rychlo zapina a vypina.

**100% duty cycle** → stale zapnuta (max brightness)

**50%** → zapnuta polovicu casu (stredna brightness)

**10%** → zapnuta iba kratko (slaba brightness)

Prepinanie je take rychle, ze oko ho vacsinou nevnima ako blikanie.

---

## Na co pamatat

**LED je Light-Emitting Diode** - specialny typ diody, ktory pri forward current vytvara svetlo.

**Ma anode a cathode** - zalezi na polarity. Dlhsia nozicka = anode, kratsia = cathode, plocha hrana = cathode.

**Current cez LED musi byt obmedzeny.** V jednoduchom circuit sa na to pouziva series resistor: **R = (V_S - V_F) / I**

**Forward voltage zavisi od farby:** red ≈ 2 V, blue ≈ 3 V. Datasheet je najlepsi zdroj informacii.

**RGB LED** ma tri farebne kanaly v jednom puzdre. **Addressable LED** (WS2812, APA102) obsahuje aj control electronics.

**SMD LED** je sposob packagingu. **High-power LED** potrebuje heatsink a constant-current driver.

**IR LED** vyzaruje neviditelne infracervene svetlo. **UV LED** vyzaruje ultrafialove ziarenie.

**PWM** umoznuje riadit brightness bez zmeny current-limiting obvodu.

**LED nesvieti kvoli napatiu. Svieti kvoli kontrolovanemu prudu spravnym smerom.**

![Outro](/book/arduino/lesson5/24-outro.gif)`;
