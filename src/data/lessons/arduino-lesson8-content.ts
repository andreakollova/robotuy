// Arduino - Lesson 8: analogWrite()
// Full lesson content - DO NOT SHORTEN

export const arduinoLesson8Content = `# analogWrite() na Arduine - od uplneho zaciatku

V predchadzajucej lekcii sme si vysvetlili, co je PWM. Uz teda vieme, ze mikrokontroler moze velmi rychlo prepinat digitalny vystup medzi stavmi HIGH a LOW a tym menit, aku cast casu je zariadenie zapnute.

Teraz sa pozrieme na to, ako PWM skutocne pouzivame v Arduino programe. Na to sluzi funkcia **analogWrite()**.

Jej nazov moze byt pre zaciatocnika trochu matuci, pretoze pri vacsine klasickych Arduino dosiek nejde o "zapisanie skutocneho analogoveho napatia". Vo vacsine pripadov funkcia nastavi na vybranom pine PWM signal s urcitym **duty cycle (striedou)**.

---

## 1. Co vlastne robi analogWrite()

Jednoduchy priklad: **analogWrite(9, 127);**

Tato jedna veta hovori Arduinu dve veci:

**Prva hodnota (9)** = na ktorom pine chceme vytvorit vystup

**Druha hodnota (127)** = aky duty cycle ma PWM signal priblizne mat

Pri klasickom rozsahu pouzivame hodnoty **0 az 255**:

- **analogWrite(9, 0)** = priblizne 0 % duty cycle (stale LOW)
- **analogWrite(9, 127)** = priblizne 50 % duty cycle
- **analogWrite(9, 255)** = 100 % duty cycle (stale HIGH)

---

## 2. Syntax: analogWrite(pin, value)

Prvy parameter **pin** urcuje fyzicky pin Arduina.

Druhy parameter **value** urcuje intenzitu PWM (striedu).

Cislo 200 neznamena 200 voltov, 200 hertzov ani 200 percent. Je to iba hodnota v rozsahu 0 az 255.

---

## 3. Ako hodnota 0-255 suvisi s percentami

**Duty Cycle = (value / 255) x 100%**

Priklad: analogWrite(9, 64) = 64/255 x 100 = priblizne **25 %**

| analogWrite() | Priblizny duty cycle |
|---|---|
| 0 | 0 % |
| 64 | 25 % |
| 127-128 | 50 % |
| 191 | 75 % |
| 255 | 100 % |

---

## 4. Co sa deje na pine po zavolani analogWrite()

Ked napisem analogWrite(9, 127), Arduino **nezacne a neprestane**. Zacne na pine vytvarat opakujuci sa PWM signal s nastavenym duty cycle.

**Tento signal pokracuje aj pocas vykonavania dalsich riadkov programu.** Nemusis pisat analogWrite() znova a znova.

Funkcia v podstate nastavi hardver mikrokontrolera: "Odteraz generuj na tomto pine PWM s takymto duty cycle." A hardver to dalej robi automaticky pomocou internych **timers (casovacov)**.

---

## 5. Prakticky priklad: jas LED

LED pripojena cez vhodny rezistor na PWM pin 9:

**analogWrite(9, 0)** → LED vypnuta

**analogWrite(9, 50)** → maly duty cycle, LED svieti slabo

**analogWrite(9, 127)** → priblizne 50 % duty cycle

**analogWrite(9, 255)** → stale HIGH, LED svieti naplno

---

## 6. Plynule rozsvecovanie LED (fading)

Postupne zvysujeme hodnotu od 0 po 255. Duty cycle sa pomaly zvacsuje a LED postupne zesilnuje:

$$int ledPin = 9;$$

$$void setup() {$$
$$}$$

$$void loop() {$$
$$  for (int brightness = 0; brightness <= 255; brightness++) {$$
$$    analogWrite(ledPin, brightness);$$
$$    delay(10);$$
$$  }$$
$$}$$

Premenna brightness rastie od 0 do 255. Kazda nova hodnota sa odesle do analogWrite(). delay(10) sposobi, ze zmena nebude okamzita.

---

## 7. Spojenie senzora a PWM

Potenciometer pripojeny na analogovy vstup A3. LED na PWM pine 9.

Otocenim potenciometra sa zmeni napatie → analogRead() ho zmeria → hodnota sa pouzije na analogWrite() → zmeni sa jas LED.

**otocenie potenciometra → zmena napatia → analogRead() → cislo → analogWrite() → zmena PWM → zmena jasu LED**

---

## 8. analogRead() a analogWrite() nerobia tu istu vec

**analogRead()** = zmeraj analogovy vstup (elektricky svet → program)

**analogWrite()** = nastav PWM vystup (program → elektricky vystup)

Jedna funkcia ziskava informaciu zo vstupu. Druha nastavuje vystup.

---

## 9. Preco musime hodnotu z analogRead() upravit

analogRead() moze vracat hodnotu **0 az 1023**. Ale analogWrite() ocakava **0 az 255**.

Riesenie z dokumentacie: **analogWrite(ledPin, val / 4);**

Preco delenie styrmi? Pretoze **1023 / 4 = priblizne 255**.

---

## 10. Cely priklad s potenciometrom

$$int ledPin = 9;      // LED connected to digital pin 9$$
$$int analogPin = A3;   // potentiometer connected to analog pin 3$$
$$int val = 0;         // variable to store the read value$$

$$void setup() {$$
$$  pinMode(ledPin, OUTPUT);  // sets the pin as output$$
$$}$$

$$void loop() {$$
$$  val = analogRead(analogPin);  // read the input pin$$
$$  analogWrite(ledPin, val / 4); // analogRead 0-1023, analogWrite 0-255$$
$$}$$

**Co robi kazdy riadok:**

**int ledPin = 9** - premenna s cislom pinu LED

**int analogPin = A3** - potenciometer citame z A3

**int val = 0** - premenna na ulozenie nameranej hodnoty

**val = analogRead(analogPin)** - zmeria napatie na A3

**analogWrite(ledPin, val / 4)** - nastavi PWM podla nameranej hodnoty

Ked potenciometer otocis jednym smerom, hodnota z analogRead() rastie a LED zacne svietit jasnejsie.

---

## 11. Cely system: vstup → meranie → spracovanie → vystup

Tento kratky program je pekny priklad zakladneho systemu riadenia:

**input (vstup)** - potenciometer vytvara urcite napatie

**measurement (meranie)** - analogRead() zisti jeho hodnotu

**processing (spracovanie)** - hodnotu vydelime styrmi

**output (vystup)** - analogWrite() nastavi PWM LED

**vstup → meranie → vypocet → vystup**

Presne tento princip budes neskor v robotike pouzivat neustale. Sensor nieco zmeria, mikrokontroler ziska cislo, program ho spracuje a podla vysledku ovlada motor, svetlo, servo alebo iny aktuator.

---

## 12. analogWrite() nepotrebuje vzdy predchadzajuci pinMode()

Dokumentacia upozornuje, ze pred analogWrite() nie je nevyhnutne zavolat pinMode(pin, OUTPUT). Funkcia dokaze potrebne vystupne spravanie nastavit.

Pre zaciatocnika vsak nie je chyba pouzivat pinMode(). Casto robi program zrozumitelnejsim.

---

## 13. PWM nefunguje automaticky na kazdom pine

Na mnohych Arduino doskach nie je hardverove PWM dostupne na kazdom digitalnom pine. PWM piny byvaju oznacene symbolom **~ (vlnka)**.

**Pred pouzitim PWM si skontroluj pinout svojej dosky.**

---

## 14. PWM suvisi s internymi casovacmi (timers)

Mikrokontroler pouziva hardverove **timers (casovace)** na vytváranie pravidelnych PWM signalov.

Niektore funkcie mikrokontrolera mozu pouzivat rovnake casovace. Dokumentacia upozornuje na situaciu s pinmi 5 a 6, kde moze byt PWM ovplyvnene funkciami millis() a delay().

---

## 15. analogWrite() nemusí vzdy znamenat PWM

Niektore Arduino dosky obsahuju **DAC - Digital-to-Analog Converter**. Na podporovanom DAC pine moze analogWrite() vytvarat **skutocny analogovy vystup** namiesto PWM.

**PWM** = rychle prepinanie HIGH/LOW (obdlznikovy signal)

**DAC** = skutocna analyogova uroven napatia (hladky signal)

Nie je spravne povazovat PWM a DAC za tu istu vec.

---

## 16. analogWrite() vracia nic

Ked zavolas analogWrite(9, 127), funkcia iba nastavi vystup. **Nevrati ti vysledne cislo.** Nie je urcena na ziskavanie informacie, ale na vykonanie akcie.

---

## 17. Pri motore PWM signal riadi driver, nie motor priamo

Arduino pin ma obmedzenú schopnost dodavat prud. Motor moze potrebovat omnoho vacsi prud.

Preto pri skutocnom motore PWM z Arduina zvycajne neposiela vykon priamo do motora. Namiesto toho ovlada **transistor, MOSFET alebo motor driver**.

Arduino vytvara **riadiaci PWM signal** a driver podla neho spina energiu dodavanu motoru.

---

## Na co pamatat

**analogWrite(pin, value)** nastavi PWM vystup na podporovanom pine.

**value: 0-255.** 0 = stale OFF, 255 = stale ON, medzi nimi rozne duty cycles.

**Po zavolani PWM pokracuje automaticky** - hardverove timers sa postaraju.

**analogRead() ≠ analogWrite().** Read = meria vstup (0-1023). Write = nastavuje vystup (0-255).

**Prepocet:** analogRead hodnotu delime 4 aby sme ju prisposobili pre analogWrite.

**PWM piny** su oznacene ~ na pinoute. Nie kazdy pin podporuje PWM.

**Na niektorych doskach** moze analogWrite() na DAC pine vytvarat skutocny analogovy vystup namiesto PWM.

**Pri motoroch** PWM signal riadi driver - Arduino nedodava vykon priamo.

**Cely tok informacie:** senzor → analogRead() → cislo → spracovanie → analogWrite() → PWM → vystupne zariadenie`;
