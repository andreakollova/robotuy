// Arduino - Lesson 4: Diodes
// Full lesson content - DO NOT SHORTEN

export const arduinoLesson4Content = `# Diodes od uplneho zaciatku - preco pustia prud jednym smerom

Doteraz sme sa stretavali najma s komponentmi ako je resistor. Pri resistore sme riesili hlavne to, ako velmi brani toku current (elektrickeho prudu). **Diode (dioda)** prinasa uplne novy typ spravania.

Je to jeden z prvych **semiconductor components (polovodicovych komponentov)**, pri ktorych zacne zalezat nielen na tom, ake voltage (napatie) na komponent privedieme, ale dokonca aj na tom, z ktorej strany ho pripojime.

**Diode je jednosmerna brana pre elektricky prud.** Spravnym smerom current pusti. Opacnym smerom sa ho snazi zablokovat.

![Uvod do diod](/book/arduino/lesson4/introduction.jpg)

---

## 1. Co je diode?

Predstav si obycajnu vodovodni ruru. V normalnej rure moze voda podla rozdielu tlakov tiect jednym alebo druhym smerom. Teraz do nej vlozime **one-way valve (jednosmerny ventil)**. Ventil je skonstruovany tak, aby sa pri tlaku spravnym smerom otvoril, ale pri tlaku opacnym smerom zatvoril.

Diode ma dva konce a nie su zamenitelne. Je teda **polarized component (polarizovany komponent)**.

Jeden terminal sa nazyva **anode (anoda)** a druhy **cathode (katoda)**.

Pri beznom forward conduction moze conventional current prechadzat: **anode → cathode**

Diode sa snazi blokovat current: **cathode → anode**

---

## 2. Ideal diode - zjednoduseny model

Predtym, nez sa pustime do realneho spravania, je ovela jednoduchsie predstavit si **ideal diode (idealnu diodu)**.

Ideal diode ma iba dva stavy:

**Forward biased (priepustna polarizacia)** = diode je ON = sprava sa ako short circuit

**Reverse biased (zaverna polarizacia)** = diode je OFF = sprava sa ako open circuit

![Idealna dioda - dva stavy](/book/arduino/lesson4/2.-ideal-diodes.png)

---

## 3. Symbol diode na schematic

Na schematic symbole diode je dolezite identifikovat **cathode line** - ciaru na cathode strane symbolu.

Pri fyzickej diode byva cathode casto oznacena **band (pasikom)**.

**Band na fyzickej diode → cathode**

**Line na schematic symbole → cathode**

![Symbol diody na scheme](/book/arduino/lesson4/3-circuit-symbol.png)

![Symbol diody - detail](/book/arduino/lesson4/3-circuit-symbol-b.png)

---

## 4. Real diode - tri dolezite oblasti spravania

Real diode nie je perfektna. Ma tri zakladne oblasti:

**Forward bias** - diode vedie vyznamny current dopredu, vzniká na nej forward voltage drop

**Reverse bias** - diode blokuje takmer vsetok current

**Breakdown** - velky reverse voltage sposobi vyrazny reverse current

![Charakteristika prudu a napatia diody](/book/arduino/lesson4/4-current-voltage-relationship.png)

---

## 5. Forward voltage drop

Real diode potrebuje urcite forward voltage. Tato charakteristicka hodnota sa oznacuje **V_F - forward voltage**.

Silicon diode ma typicky priblizne: **≈ 0.7 V forward voltage drop**

Ak mame 5 V zdroj a diode s V_F = 0.7 V: za diodou nam zostava priblizne **5 V - 0.7 V = 4.3 V**

Forward voltage zavisi aj od typu diode:
- Silicon diode: 0.6-1 V
- Germanium diode: ≈ 0.3 V
- Schottky diode: ≈ 0.15-0.45 V
- LED: 1.2-3 V+ podla typu a farby

![Forward voltage roznych typov diod](/book/arduino/lesson4/5-forward-voltage.jpg)

---

## 6. Datasheet - odkial zistime parametre?

Ked mas pred sebou konkretnu diode, napriklad **1N4148**, nemala by si hadat jej limity. Vyrobca poskytuje **datasheet (technicky list)**.

V nom najdes: forward voltage V_F, maximum forward current, maximum reverse voltage, power dissipation a dalsie parametre.

![Datasheet diody](/book/arduino/lesson4/6-diode-datasheets.png)

![Datasheet - dalsie parametre](/book/arduino/lesson4/6-diode-datasheets-b.png)

---

## 7. Signal diode - mala diode pre male signaly

Typickym prikladom je **1N4148**. Je to mala general-purpose diode pouzivana pri relativne malych signaloch a currents.

![Signal diody](/book/arduino/lesson4/7-signal-diodes.jpg)

![Signal diody - detail](/book/arduino/lesson4/7-signal-diodes-b.png)

---

## 8. Power / Rectifier diode

Ak potrebujeme zvladnut vacsi current, pouzijeme **power diode** alebo **rectifier diode (usmernovaciu diodu)**.

Priklad: **1N4001** s ratingom priblizne 1 A.

![Power diody](/book/arduino/lesson4/8-power-diodes.jpg)

![1N4001](/book/arduino/lesson4/9-the-1n4001.png)

![1N4001 - fyzicky komponent](/book/arduino/lesson4/9-the-1n4001-b.jpg)

---

## 9. LED - Light-Emitting Diode

**LED** znamena **Light-Emitting Diode (svetlo emitujuca dioda)**. Je to specialny typ diode, ktory pri forward current premena cast energie na **light (svetlo)**.

Rovnako ma anode a cathode. Rovnako ma forward voltage. Na symbole ma dve male sipky smerujuce **von** (svetlo ide z LED von).

Rozne farby LED maju rozne forward voltage: cervena ≈ 2.2 V, modra ≈ 3.3 V.

**Infrared LED (IR LED)** vyzaruje infracervene ziarenie - pouziva sa v dialkovych ovladacoch.

![LED diody](/book/arduino/lesson4/10-light-emitting-diodes-(leds!).jpg)

![LED - rozne typy a farby](/book/arduino/lesson4/10-light-emitting-diodes-(leds!)-b.png)

---

## 10. Schottky diode

**Schottky diode (Schottkyho dioda)** ma velku vyhodu: **low forward voltage drop** (priblizne 0.15-0.45 V).

Je velmi uzitocna tam, kde chceme minimalizovat voltage loss, napriklad v battery-powered circuits.

![Schottky diody](/book/arduino/lesson4/11-schottky-diodes.png)

![Schottky diody - detail](/book/arduino/lesson4/11-schottky-diodes-b.png)

---

## 11. Zener diode - breakdown ktory chceme

**Zener diode (Zenerova dioda)** je skonstruovana tak, aby mala definovane **Zener voltage V_Z**. V reverse direction sa po dosiahnutí tejto oblasti pouziva na vytvorenie priblizneho voltage reference.

Pouzitie: voltage references, jednoducha stabilizacia, voltage limiting / protection.

![Zener diody](/book/arduino/lesson4/12-zener-diodes.png)

![Zener diody - pouzitie](/book/arduino/lesson4/12-zener-diodes-b.png)

---

## 12. Photodiode

**Photodiode (fotodioda)** robi opacnu vec ako LED: **svetlo → electrical response**.

Photony dopadaju na semiconductor structure a photodiode moze vytvarat alebo menit electrical current podla dopadajuceho svetla.

Pouzitie: light detection, optical communication.

![Photodiody](/book/arduino/lesson4/13-photodiodes.jpg)

---

## 13. Rectification - premena AC na DC

Jedna z najdolezitejsich aplikacii diod.

**Half-wave rectifier (polvlnny usmernovac)** - jedna diode pusti iba jednu polovicu AC waveform.

![Half-wave rectifier](/book/arduino/lesson4/14-a-half-wave-rectifier.png)

**Full-wave bridge rectifier (celovlnny mostikovy usmernovac)** - pouziva 4 diody. Obe polarity AC sa objavia na vystupe so spravnou polaritou.

![Full-wave bridge rectifier](/book/arduino/lesson4/15-a-full-wave-bridge-rectifier-.png)

![Bridge rectifier v realnom zariadeni](/book/arduino/lesson4/15-can-you-spot-the-four-diodes-making-a-bridge-rectifier-in-this-wall-wart?.jpg)

---

## 14. Reverse polarity protection

Diode vlozime in series do napajacej cesty. Pri spravnom pripojeni je forward biased a current prejde. Pri opacnom pripojeni je reverse biased a current zablokuje.

Jednoduche a elegantne vyuzitie zakladnej vlastnosti diode.

Pre minimalizaciu voltage loss sa moze pouzit **Schottky diode** s nizsim forward voltage drop.

![Reverse current protection](/book/arduino/lesson4/16-reverse-current-protection.png)

---

## 15. Diode logic

Diodes mozu vytvorit jednoduche **logic gates**. Napriklad OR logic alebo AND structures.

![Diode logic gates](/book/arduino/lesson4/17-logic-gates.png)

![Diode logic - dalsie priklady](/book/arduino/lesson4/17-logic-gates-b.png)

---

## 16. Flyback diode - ochrana pri motoroch a relay

Pri vypnuti **inductive load** (motor, relay coil) moze vzniknut velky **voltage spike**. **Flyback diode** sa zapoji cez inductive load tak, aby pri normalnej prevadzke bola reverse biased.

Ked vypnutie vytvori voltage opacnej polarity, diode sa dostane do forward bias a poskytne currentu bezpecnu cestu.

**Pre robotiku je toto prakticky velmi dolezity koncept.**

![Flyback diody a voltage spike suppression](/book/arduino/lesson4/18-flyback-diodes-and-voltage-spike-suppression.png)

---

## Na co pamatat

**Diode je polarizovany semiconductor komponent** - zalezi na orientacii (anode → cathode).

**Ideal model:** forward bias = ON (short), reverse bias = OFF (open).

**Real diode:** forward bias = current + voltage drop (V_F), reverse bias = velmi maly leakage current, prilis velke reverse voltage = breakdown.

**Forward voltage zavisi od typu:** silicon ≈ 0.7 V, Schottky ≈ 0.3 V, LED ≈ 1.5-3.3 V.

**Cathode na fyzickej diode = band (pasik). Na scheme = ciara na symbole.**

**Typy diod a ich pouzitie:**
- Signal diode (1N4148) - male signaly
- Rectifier diode (1N4001) - vacsie prudy, usmernenie AC→DC
- LED - vytvara svetlo
- Schottky - nizky voltage drop
- Zener - voltage reference cez kontrolovany breakdown
- Photodiode - reaguje na svetlo

**Prakticke aplikacie:** rectification (AC→DC), reverse polarity protection, LED lighting, flyback protection pri motoroch, voltage reference, diode logic.

**Najdolezitejsi rozdiel oproti resistoru:** resistor je nepolarizovany (orientacia je jedno), diode je polarizovana (orientacia je zasadna).`;
