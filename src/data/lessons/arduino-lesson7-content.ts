// Arduino - Lesson 7: PWM (Pulse Width Modulation)
// Full lesson content - DO NOT SHORTEN

export const arduinoLesson7Content = `# PWM (Pulse Width Modulation) - od uplneho zaciatku

PWM je jedna z veci, ktore na prvy pohlad posobaju komplikovanejsie, nez v skutocnosti su. Ked vsak pochopis jednu zakladnu myslienku, vsetky pojmy ako pulse width, duty cycle, period ci frequency do seba zacnu prirodzene zapadat.

Predstav si, ze mas Arduino a obycajnu LED. Arduino dokaze pomocou digitalneho vystupu LED jednoducho zapnut alebo vypnut. Ty vsak nechces iba dva stavy. Chces vediet nastavit jej jas.

Prave na taketo riadenie sa pouziva **PWM - Pulse Width Modulation (pulzno-sirkova modulacia)**. Namiesto toho, aby Arduino vytvaralo vela roznych urovni napatia, velmi rychlo prepina digitalny vystup medzi zapnutym a vypnutym stavom. Zmenou toho, ako dlho zostava vystup zapnuty, mozeme menit vysledny ucinok na LED, motor alebo ine zariadenie.

![PWM animacia - rozne duty cycles](/book/arduino/lesson7/pwm.gif)

---

## 1. Co dokaze digitalny vystup

Pri digitalnom vystupe pracujeme s dvoma logickymi stavmi: **LOW** a **HIGH**.

Na doske s 5 V logikou: **LOW = priblizne 0 V**, **HIGH = priblizne 5 V**

Pri LED: **HIGH → LED svieti**, **LOW → LED nesvieti**

Problem nastane, ked nechceme LED iba zapnut alebo vypnut, ale chceme regulovat jej jas. Digitalny vystup nam ponuka iba dva stavy. Nemozeme jednoducho povedat: "Teraz nastav tento digitalny pin na 37 % HIGH."

**PWM tento problem obchadza velmi sikovnym sposobom.**

---

## 2. Zakladna myslienka PWM: velmi rychle zapinanie a vypinanie

Predstav si LED, ktoru zapnes na jednu sekundu a potom na jednu sekundu vypnes. Taketo prepinanie je pomale - LED jednoducho blika.

Teraz zacni prepinat ovela rychlejsie. Namiesto jednej sekundy nechaj LED zapnutu iba jednu milisekundu (0.001 sekundy), potom jednu milisekundu vypnutu.

Prepinanie je teraz take rychle, ze ho uz nemusiyme vnimat ako obycajne pomale blikanie. LED moze na pohlad posobit, akoby svietila suvisle.

**A teraz prichadza hlavny trik:** Nemusime ju mat zapnutu a vypnutu rovnako dlho. Mozeme ju pocas kazdeho kratkeho cyklu nechat zapnutu iba malu cast casu. Alebo naopak vacsinu casu.

Tym menime mnozstvo energie dodavanej LED v case a vysledkom je zmena vnimaneho jasu.

---

## 3. PWM nevytvara "slabsie HIGH"

Toto je velmi dolezite pochopit spravne.

Pri PWM sa digitalny vystup **neprepina** napriklad medzi 0 V a 2.5 V pre polovicny vykon.

Stale sa prepina priblizne medzi **0 V a 5 V**. Rozdiel je iba v case.

Keby sme PWM signal sledovali osciloskopom, nevideli by sme hladku ciaru na 2.5 V. Videli by sme **obdlznikovy signal**, ktory neustale skace medzi LOW a HIGH.

**PWM teda nemeni primarné vysku impulzu. Meni jeho sirku v case.** Odtial pochadza nazov **Pulse Width Modulation**.

---

## 4. Period (perioda) - jeden uplny cyklus

PWM signal sa stale opakuje. Jeden uplny usek nazyvame **period (perioda)**.

Napriklad jedna perioda trva 2 ms. Pocas tychto 2 ms moze byt signal urcity cas HIGH a zvysny cas LOW.

Perioda zahrna HIGH aj LOW cas dohromady:

- HIGH = 0.5 ms, LOW = 1.5 ms → perioda = **2 ms**
- HIGH = 1 ms, LOW = 1 ms → perioda = **2 ms**
- HIGH = 1.8 ms, LOW = 0.2 ms → perioda = **2 ms**

**Perioda moze zostat rovnaka, zatial co menime pomer casu HIGH a LOW.** A prave toto robime pri PWM.

---

## 5. Pulse width (sirka impulzu)

**Pulse (impulz)** je cast signalu, pocas ktorej je vystup HIGH.

Ak je pocas jednej 2 ms periody vystup HIGH 0.5 ms, potom ma HIGH impulz sirku **0.5 ms**.

Ak ho predlzim a necham HIGH 1 ms, jeho sirka je **1 ms**.

Tuto dlzku HIGH impulzu nazyvame **pulse width (sirka impulzu)**.

Co robime pri Pulse Width Modulation? **Menime prave tuto sirku.**

---

## 6. Duty cycle (strieda) - kolko percent casu sme zapnuti

V praxi sa vacsinou nechceme stale rozpravat o tom, ze HIGH trva napriklad 0.6 ms z 2 ms. Ovela pohodlnejsie je povedat: **Vystup je zapnuty 30 % casu.**

Tomuto pomeru hovorime **duty cycle (strieda)**.

**Duty Cycle = (T_ON / T_period) x 100%**

Priklad: perioda 2 ms, HIGH trva 1 ms → **1/2 x 100 = 50 %**

---

## 7. Co znamenaju rozne hodnoty duty cycle

| Duty cycle | Cas HIGH | Cas LOW | LED |
|---|---|---|---|
| 0 % | 0 % | 100 % | vypnuta |
| 25 % | 25 % | 75 % | slabsia |
| 50 % | 50 % | 50 % | stredny jas |
| 75 % | 75 % | 25 % | jasnejsia |
| 100 % | 100 % | 0 % | stale zapnuta |

---

## 8. Konkretny priklad s periodou 2 ms

Pri 25 % duty cycle: **2 ms x 0.25 = 0.5 ms HIGH + 1.5 ms LOW**

Pri 50 %: **2 ms x 0.5 = 1 ms HIGH + 1 ms LOW**

Pri 75 %: **2 ms x 0.75 = 1.5 ms HIGH + 0.5 ms LOW**

Perioda sa v kazdom pripade rovna 2 ms. Meni sa iba rozdelenie tejto periody medzi HIGH a LOW.

---

## 9. Frequency (frekvencia) - ako rychlo sa cely cyklus opakuje

**Frequency (frekvencia)** nam hovori: **Kolkokrat sa cely PWM cyklus zopakuje za jednu sekundu?**

Jednotkou frekvencie je **hertz (Hz)**. 1 Hz = 1 cyklus za sekundu.

Perioda a frekvencia su navzajom prevratene: **f = 1/T** a **T = 1/f**

Priklad: **500 Hz** = 500 period za sekundu. Jedna perioda: **1000 ms / 500 = 2 ms**

---

## 10. Frequency a duty cycle nie su to iste

**Frequency** urcuje, ako rychlo sa cele ON/OFF cykly opakuju.

**Duty cycle** urcuje, aku cast kazdeho cyklu stravime v stave HIGH.

Mozeme mat: 500 Hz s 25 % duty cycle alebo 500 Hz so 75 % duty cycle. Frekvencia zostala rovnaka - zmenili sme iba dlzku HIGH casti kazdej periody.

---

## 11. Preco LED nevidime neustale blikat

PWM moze pracovat stovky alebo tisice cyklov za sekundu. Pri takom rychlom prepinanai nase videnie sposobuje, ze jednotlive impulzy za beznych okolnosti nevnimame ako samostatne zapnutia a vypnutia.

LED sa vsak fyzicky naozaj zapina a vypina. PWM ju nepremeni na LED napajanu stabilnym "polovicnym napatim".

---

## 12. Priemerna hodnota PWM

Predstavme si idealny PWM signal medzi 0 V a 5 V.

Pri 50 % duty cycle: **V_avg = 5 V x 0.5 = 2.5 V**

Pri 25 %: **V_avg = 5 V x 0.25 = 1.25 V**

Pri 75 %: **V_avg = 5 V x 0.75 = 3.75 V**

**Ale pri 50 % PWM nie je pin neustale na 2.5 V.** Pin je stale 5 V → 0 V → 5 V → 0 V... Hodnota 2.5 V je jeho **casovy priemer**.

---

## 13. analogWrite() na Arduine

Na klasickych Arduino doskach sa s PWM casto stretnes prostrednictvom funkcie:

**analogWrite(pin, value);**

Hodnota 0 az 255 urcuje duty cycle:

| analogWrite() | Priblizny duty cycle |
|---|---|
| 0 | 0 % |
| 64 | 25 % |
| 127-128 | 50 % |
| 191 | 75 % |
| 255 | 100 % |

Rozsah 0-255 obsahuje **256 roznych hodnot** (8-bitovy rozsah, 2 na 8 = 256).

---

## 14. Preco prave 0 az 255

8 bitov dokaze reprezentovat 256 roznych kombinacii, od 0 po 255.

Arduino mapuje tieto hodnoty na duty cycle od 0 % do 100 %.

Mala hodnota → maly duty cycle. Vacsia hodnota → vacsi duty cycle. 255 → 100 %.

---

## 15. Priklad: regulacia jasu LED

LED pripojena cez vhodny rezistor k PWM pinu:

**analogWrite(ledPin, 0)** → LED vypnuta

**analogWrite(ledPin, 64)** → priblizne 25 % duty cycle

**analogWrite(ledPin, 127)** → priblizne 50 %

**analogWrite(ledPin, 255)** → 100 %, stale zapnuta

LED sa medzi jednotlivymi pripadmi nemeni. Menime iba cas, pocas ktoreho je v kazdej periode zapnuta.

---

## 16. Fading - plynule rozsvietenie a zhasnutie LED

Zaciname: analogWrite(ledPin, 0). Potom postupne zvysujeme: 0, 1, 2, 3... 253, 254, 255.

Duty cycle sa postupne zvacsuje. LED preto postupne travi vacsiu cast kazdeho PWM cyklu zapnuta a vnimame ju ako coraz jasnejsiu.

Potom ideme opacne: 255, 254, 253... 2, 1, 0. Tak vznika efekt **fade in → fade out**.

---

## 17. PWM nie je dostupne na kazdom pine

Na niektorych Arduino doskach nie je hardverove PWM dostupne na kazdom digitalnom pine.

PWM-capable pins byvaju oznacene symbolom **~** (napriklad ~3, ~5, ~6).

Presne piny zavisia od konkretneho mikrokontrolera a dosky - pozri si pinout diagram.

---

## 18. PWM sa nepouziva iba na LED

**DC motors** - ak motor dostava energiu pocas vacsej casti casu, jeho vysledne spravanie moze zodpovedat vyssiemu vykonu.

V realnom robotickom zapojeni vsak motor nepripajame priamo na Arduino pin. PWM signal riadi **transistor, MOSFET alebo motor driver**, ktory nasledne spina prud do motora.

**Arduino PWM pin poskytuje riadiaci signal. Nemusi priamo poskytovat vykon potrebny pre zariadenie.**

---

## 19. PWM a motor

Pri 100 % duty cycle dostava motor napajanie prakticky neustale.

Pri 50 % duty cycle ho driver velmi rychlo pripaja a odpaja od napajania. Motor sa vsak mechanicky nedokaze okamzite rozbehnut a zastavit pri kazdom kratkom impulze - jeho vlastnosti sposobuju, ze vysledny pohyb moze byt ovela plynulejsi.

**Nie je vsak presne povedat, ze 50 % PWM = vzdy presne 50 % rychlosti motora.** Rychlost zavisi aj od zataze, vlastnosti motora a dalsich faktorov.

---

## 20. analogWrite() vs skutocne analogove napatie

Nazov analogWrite() moze byt zavadzajuci. Pri klasickom PWM vystupe tato funkcia **nevytvara skutocne plynule analogove napatie**. Nastavuje PWM.

Rozdiel medzi **PWM output** a **DAC (Digital-to-Analog Converter)**: DAC dokaze vytvarat skutocnu analogovu uroven napatia. PWM vytvara rychlo prepinany digitalny signal.

---

## 21. Preco multimeter moze pri PWM ukazat medzihodnotu

Pri 5 V PWM s 50 % duty cycle osciloskop ukaze: 0 V → 5 V → 0 V → 5 V...

Multimeter vsak moze zobrazit hodnotu priblizne okolo **2.5 V** - pretoze rychlo sa meniaci signal spriemeruje.

Osciloskop je na pozorovanie PWM ovela vhodnejsi.

---

## Na co pamatat

**PWM = Pulse Width Modulation.** Rychle prepinanie digitalneho vystupu medzi HIGH a LOW.

**Nemeni vysku impulzu, meni jeho sirku v case.**

**Period (perioda)** = cas jedneho celeho cyklu. **Frequency (frekvencia)** = pocet cyklov za sekundu. **f = 1/T**

**Pulse width** = dlzka HIGH casti. **Duty cycle** = percento periody stravene v HIGH.

**0 % duty cycle** = stale LOW. **100 %** = stale HIGH. **50 %** = polovicu casu HIGH, polovicu LOW.

**analogWrite(pin, 0-255)** na Arduine nastavuje duty cycle. 0 = 0 %, 127 = cca 50 %, 255 = 100 %.

**PWM nie je skutocne analogove napatie.** Je to digitalny signal ktoreho priemerny ucinok sa moze spravat ako plynule nastavitelna hodnota.

**Pouzitie:** regulacia jasu LED, riadenie rychlosti motorov (cez driver), fading efekty, servo riadenie.

**PWM piny** na Arduine byvaju oznacene symbolom ~ (vlnka).`;
