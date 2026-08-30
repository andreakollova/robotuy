// Chapter 2.4 – Lekcia 7: Configuration and Velocity Constraints
// Full lesson content - DO NOT SHORTEN

export const ch24Content = `# Lekcia 7: Configuration and Velocity Constraints

Keď sme doteraz hovorili o **configuration space (C-space)**, zaujímalo nás predovšetkým to, aké rôzne configurations môže robot alebo mechanizmus nadobudnúť. Configuration môžeme chápať ako úplný opis toho, **v akom stave sa systém práve nachádza**. Pri robotickom ramene ju môžu určovať uhly jednotlivých joints, pri mobilnom robotovi jeho poloha a natočenie a pri jednoduchom bode v rovine napríklad súradnice x a y.

Pri skutočných mechanizmoch však configuration variables väčšinou nemôžeme meniť úplne nezávisle. Jednotlivé časti robota sú fyzicky spojené, links majú pevnú dĺžku, niektoré body musia zostať v kontakte a pri kolesových robotoch môže napríklad platiť podmienka, že sa kolesá kotúľajú bez bočného šmyku.

Takéto podmienky nazývame **constraints — obmedzenia**.

Na začiatku je veľmi dôležité uvedomiť si, že constraint môže obmedzovať dve odlišné veci. Môže hovoriť, **v akých configurations systém vôbec môže byť**, alebo môže hovoriť, **akým spôsobom sa môže systém z aktuálnej configuration pohybovať**.

To nie je to isté.

Predstav si korálku navlečenú na kruhovom drôte. Korálka jednoducho nemôže byť desať centimetrov mimo drôtu. Taká configuration je zakázaná.

Teraz si predstav auto. Auto pokojne môže stáť o dva metre napravo od miesta, kde je teraz. Taká configuration teda nie je zakázaná. Napriek tomu sa auto zo svojho aktuálneho miesta nemôže jednoducho posunúť dva metre čisto bokom. Musí urobiť určitý manéver.

V prvom prípade je obmedzená **configuration**.

V druhom prípade je obmedzený **spôsob pohybu**.

Práve pochopenie tohto rozdielu je cieľom celej lekcie.

---

## 01. Configuration constraints: keď nie sú všetky konfigurácie možné

Začnime mechanizmom, ktorý už poznáme — **four-bar linkage**.

![Štvorkĺbový mechanizmus](/book/ch2/fig2-10.png)

Four-bar linkage pozostáva zo štyroch pevných links spojených rotačnými joints do uzavretej slučky. Predstav si ho jednoducho ako štyri pevné tyčky spojené koncami tak, že vytvárajú pohyblivý štvoruholníkový mechanizmus.

Jeho štyri joint angles môžeme označiť:

**θ1, θ2, θ3, θ4**

a configuration zapísať:

**θ = (θ1, θ2, θ3, θ4)**

Mohlo by sa zdať, že keď na opis používame štyri uhly, mechanizmus má automaticky 4 DOF.

Lenže počet configuration variables a počet degrees of freedom nie sú automaticky rovnaké.

**DOF nám nehovorí, koľko čísel používame na zápis systému. Hovorí, koľko z nich môžeme meniť nezávisle.**

Pri four-bar linkage nemôžeme štyri joint angles nastavovať úplne ľubovoľne.

Dôvodom je samotná konštrukcia mechanizmu.

---

## 02. Prečo vznikajú loop-closure constraints

Predstav si, že začneš v jednom jointe four-bar linkage a postupuješ po jednotlivých links.

Prejdeš prvý link, potom druhý, tretí a nakoniec štvrtý.

Keďže links tvoria uzavretú slučku, po prejdení posledného linku musíš skončiť **presne tam, kde si začala**.

Ak by si skončila napríklad tri centimetre napravo od pôvodného jointu, znamenalo by to, že posledný link sa s prvým vôbec nedokáže spojiť.

Taká kombinácia joint angles by síce matematicky pozostávala zo štyroch úplne normálnych čísel, ale nepredstavovala by fyzicky existujúcu configuration mechanizmu.

Preto musia joint angles spĺňať určité geometrické vzťahy. Nazývame ich **loop-closure constraints** alebo **loop-closure equations**, pretože zabezpečujú, aby uzavretá slučka mechanizmu zostala skutočne uzavretá.

Pri planar mechanizme musí po prejdení slučky správne sedieť poloha v smere x, poloha v smere y a výsledná orientation. Z toho vzniknú tri nezávislé podmienky.

Máme teda:

**4 configuration variables**

ale zároveň:

**3 independent constraints**

Preto zostáva:

**4 - 3 = 1 DOF**

Four-bar linkage má teda iba jeden degree of freedom.

---

## 03. Čo 1 DOF v tomto prípade skutočne znamená

Predstav si skutočný four-bar linkage položený pred sebou.

Chytíš jeden link a začneš ním otáčať.

Ostatné links sa začnú pohybovať spolu s ním.

Nemôžeš povedať:

„Prvý joint nastavím na 20°, druhý na 70°, tretí na 130° a štvrtý na 5°"

bez toho, aby si skontrolovala, či sa pri týchto hodnotách mechanizmus vôbec dokáže uzavrieť.

Keď zmeníš jeden nezávislý parameter, ostatné angles sa musia prispôsobiť tak, aby links zostali spojené.

Preto má mechanizmus 1 DOF.

Môžeme si to predstaviť aj tak, že síce zapisujeme štyri čísla, ale tri z nich už nemáme úplne vo vlastných rukách. Sú navzájom previazané geometrickými podmienkami.

Toto je jeden z dôvodov, prečo sme sa pri configuration space učili rozlišovať medzi **počtom coordinates použitých na reprezentáciu** a **skutočnou dimension C-space**.

---

## 04. Čo všeobecne znamená configuration constraint

Teraz túto myšlienku zovšeobecníme.

Predstav si systém s configuration variables:

**θ = (θ1, θ2, ..., θn)**

Ak by medzi nimi neexistovali žiadne vzťahy, mohli by sme každú variable meniť nezávisle.

Pri mechanickom systéme však často existuje podmienka, ktorú musia tieto variables spoločne spĺňať.

Matematicky ju môžeme zapísať:

**g(θ) = 0**

Tento zápis môže na prvý pohľad pôsobiť abstraktne, ale jeho význam je jednoduchý.

Funkcia **g** predstavuje určitú **kontrolu geometrickej alebo fyzikálnej podmienky**.

Do funkcie vložíme konkrétnu configuration θ a ona nám povie, či daná configuration spĺňa požadované pravidlo.

Ak:

**g(θ) = 0,**

constraint je splnený.

Ak:

**g(θ) ≠ 0,**

constraint splnený nie je.

Nula tu sama osebe nemá nejaký zvláštny fyzikálny význam. Constraint si jednoducho upravíme tak, aby všetko bolo na jednej strane rovnice a správna configuration dávala výsledok nula.

Najlepšie to uvidíme na jednoduchom príklade.

---

## 05. Korálka na kruhovom drôte

Predstav si malú korálku pohybujúcu sa v rovine.

Ak nie je k ničomu pripevnená, jej position môžeme opísať dvoma coordinates:

**q = (x, y)**

Hodnotu x môžeme meniť nezávisle od y a hodnotu y nezávisle od x.

Bod má preto:

**2 DOF**

Jeho configuration space je celá rovina.

Teraz však korálku navlečieme na pevný kruhový drôt s polomerom r.

Od tejto chvíle už nemôže byť kdekoľvek v rovine. Môže sa nachádzať iba na drôte.

Ak je stred kružnice v počiatku, vzdialenosť korálky od stredu musí byť vždy presne r.

Vzdialenosť bodu (x,y) od počiatku je:

**√(x² + y²)**

Preto musí platiť:

**√(x² + y²) = r**

Po umocnení:

**x² + y² = r²**

Toto je **configuration constraint**.

Hovorí nám, ktoré dvojice (x,y) predstavujú fyzicky možné configurations.

Napríklad pri r = 1:

**x = 1, y = 0**

je povolená configuration, pretože:

**1² + 0² = 1**

Ale:

**x = 2, y = 0**

povolená nie je, pretože:

**2² + 0² ≠ 1**

Korálka by sa nachádzala mimo svojho drôtu.

---

## 06. Prečo constraint znižuje počet DOF

Pred pridaním drôtu sme mohli x a y vyberať nezávisle.

Mohli sme povedať:

x = 3 a y = 8.

Alebo:

x = -2 a y = 100.

Bod mohol byť kdekoľvek v rovine.

Po pridaní kruhového drôtu to už neplatí.

Ak zvolíme x, hodnota y už nemôže byť ľubovoľná. Musí byť taká, aby zostalo splnené:

**x² + y² = r²**

Jedna rovnica teda vytvorila vzťah medzi dvoma variables a odstránila jednu nezávislú voľbu.

Preto:

**2 configuration variables - 1 independent constraint = 1 DOF**

Hoci stále používame dve coordinates x a y, skutočný configuration space korálky je jednorozmerný — je ním samotná kružnica.

Je to podobné, ako keď ide vlak po koľajnici. Na mape môžeme jeho position zapisovať pomocou x a y, ale vlak si nemôže nezávisle vyberať x a y. Jeho poloha je viazaná na trať.

---

## 07. Čo presne znamená holonomic constraint

Teraz máme všetko potrebné na to, aby sme pojem **holonomic constraint** pochopili, nie iba zapamätali.

Holonomic constraint je obmedzenie, ktoré vieme vyjadriť ako **vzťah medzi samotnými configuration variables**.

Typicky ho zapisujeme:

**g(q) = 0**

Čo znamená „medzi samotnými configuration variables"?

Znamená to, že na rozhodnutie, či daný stav systému constraint spĺňa, nám stačí poznať jeho **aktuálnu configuration q**.

Nepotrebujeme vedieť jeho velocity.

Nepotrebujeme vedieť, kadiaľ sa pohyboval.

Nepotrebujeme poznať jeho predchádzajúce configurations.

Pozrieme sa iba na to, **kde alebo v akom stave je teraz**, a z toho vieme rozhodnúť, či je daná configuration dovolená.

Pri korálke je:

**q = (x,y)**

a constraint:

**x² + y² = r²**

Ak nám niekto ukáže korálku v bode (x,y), okamžite vieme skontrolovať, či sa nachádza na drôte.

Ak rovnica platí, configuration je povolená.

Ak neplatí, configuration je zakázaná.

Preto holonomic constraint môžeme chápať ako pravidlo, ktoré z väčšieho priestoru možných coordinates **vyberie iba určitú množinu configurations, v ktorých systém fyzicky smie byť**.

Pri korálke začíname celou rovinou.

Constraint z nej vyberie iba kružnicu.

Pri four-bar linkage začíname väčším priestorom všetkých kombinácií joint angles.

Loop-closure constraints z neho vyberú iba tie kombinácie, pri ktorých sa mechanizmus skutočne uzavrie.

Toto je podstata holonomic constraintu:

**obmedzuje samotný súbor možných configurations systému.**

Preto tiež môže znižovať dimension configuration space a tým počet DOF.

Dôležité je, že constraint hovorí niečo o **stave systému**, nie iba o jeho okamžitom pohybe.

---

## 08. Configuration constraint ovplyvňuje aj spôsob pohybu

Holonomic constraint nám teda najskôr povedal, kde korálka môže byť.

Lenže ak musí zostať na kružnici počas celého pohybu, automaticky tým obmedzujeme aj jej velocity.

Predstav si korálku v pravom krajnom bode kružnice:

**x = r, y = 0**

V tejto chvíli sa nemôže začať pohybovať priamo doprava.

Prečo?

Pretože už o malý okamih by bolo:

**x > r**

a korálka by opustila kružnicu.

Nemôže sa začať pohybovať ani priamo doľava, pretože by sa dostala dovnútra kružnice.

Môže sa však pohybovať hore alebo dole po jej obvode.

Configuration constraint teda nepriamo vytvára aj obmedzenie velocity.

Otázka teraz znie:

**Ako z rovnice opisujúcej povolené configurations matematicky získame rovnicu opisujúcu povolené velocities?**

Na to použijeme deriváciu.

---

## 09. Prečo constraint derivujeme

Máme:

**x² + y² = r²**

Ak korálka stojí, x a y sú jednoducho dve konkrétne čísla.

Ak sa však pohybuje, x a y sa menia s časom:

**x = x(t), y = y(t)**

Presnejšie teda píšeme:

**x(t)² + y(t)² = r²**

Teraz si všimni veľmi dôležitú vec.

Hodnoty x a y sa môžu meniť.

Ale hodnota:

**x² + y²**

sa meniť nesmie.

Prečo?

Pretože musí byť stále rovná r².

Ak by sa x² + y² zväčšilo, korálka by sa vzdialila od stredu a opustila kružnicu smerom von.

Ak by sa zmenšilo, dostala by sa dovnútra kružnice.

Takže počas povoleného pohybu musí zostať:

**x² + y² = stále rovnaká hodnota**

A derivácia nám hovorí práve to, **ako rýchlo sa určitá veličina mení**.

Ak sa veličina vôbec nemení, jej časová derivácia je:

**0**

Preto constraint derivujeme podľa času.

Chceme totiž zistiť:

**Aké ẋ a ẏ môžeme mať, aby sa hodnota x² + y² nemenila?**

---

## 10. Derivovanie kruhového constraintu krok za krokom

Začneme:

**x² + y² = r²**

Derivujeme obe strany podľa času.

Keďže x závisí od času:

**d(x²)/dt = 2x * ẋ**

kde:

**ẋ = dx/dt**

je rýchlosť zmeny x.

Podobne:

**d(y²)/dt = 2y * ẏ**

Polomer r sa nemení, takže r² je konštanta.

Derivácia konštanty je nula:

**d(r²)/dt = 0**

Dostaneme:

**2x * ẋ + 2y * ẏ = 0**

Celú rovnicu môžeme vydeliť dvomi:

**x * ẋ + y * ẏ = 0**

A práve sme z configuration constraintu získali **velocity constraint**.

---

## 11. Čo je velocity constraint

Configuration constraint odpovedal na otázku:

**„Kde môže systém byť?"**

Velocity constraint odpovedá na inú otázku:

**„Ako sa môže systém z tejto configuration práve teraz pohybovať?"**

To slovné spojenie **práve teraz** je veľmi dôležité.

Velocity opisuje okamžitú zmenu configuration.

Pri našej korálke máme:

**x * ẋ + y * ẏ = 0**

Táto rovnica nehovorí, že určité x alebo y sú zakázané. Hovorí, ktoré kombinácie ẋ a ẏ sú povolené pri konkrétnych hodnotách x a y.

Pozrime sa znovu na pravý bod kružnice:

**x = r, y = 0**

Dosadíme:

**r * ẋ + 0 * ẏ = 0**

takže:

**ẋ = 0**

V tomto bode teda korálka nesmie mať velocity smerujúcu doľava alebo doprava.

Môže však mať:

**ẏ ≠ 0**

čiže sa môže pohybovať hore alebo dole po kružnici.

V hornom bode:

**x = 0, y = r**

dostaneme:

**ẏ = 0**

a povolený je naopak pohyb v smere x.

Velocity constraint teda v každom bode kružnice vyberá **smer dotyčnice**, pretože práve pohyb po dotyčnici udrží korálku na drôte.

---

## 12. Od konkrétneho príkladu k všeobecnému vzťahu

Pri korálke sme začali:

**x² + y² - r² = 0**

Všeobecne môžeme holonomic constraint zapísať:

**g(q) = 0**

Ak sa systém pohybuje:

**q = q(t)**

takže:

**g(q(t)) = 0**

Constraint musí zostať splnený v každom okamihu.

Preto sa hodnota g nesmie meniť:

**dg/dt = 0**

Ak g závisí od viacerých configuration variables, použijeme **chain rule — reťazové pravidlo**.

Napríklad ak:

**q = (q1, q2)**

potom:

**dg/dt = (dg/dq1) * q1_dot + (dg/dq2) * q2_dot**

Pre viac variables pokračujeme rovnakým spôsobom.

Kompaktne môžeme výsledok zapísať:

**(dg/dq) * q̇ = 0**

Tento zápis teda nie je nový constraint, ktorý by sa objavil odnikiaľ.

Je to jednoducho **velocity verzia pôvodného configuration constraintu**.

Hovorí:

**„Pohybuj sa takými okamžitými rýchlosťami, aby pôvodná podmienka g(q) = 0 zostala stále splnená."**

---

## 13. Čo znamená dg/dq

Výraz:

**dg/dq**

hovorí, ako sa hodnota constraintu zmení pri malých zmenách jednotlivých configuration variables.

Pri kružnici máme:

**g(x,y) = x² + y² - r²**

Derivatives sú:

**dg/dx = 2x**

**dg/dy = 2y**

Takže:

**dg/dq = [2x, 2y]**

Tento vector nám hovorí, ktorým smerom by sa hodnota g menila najvýraznejšie.

Pri kružnici smeruje radiálne — smerom od stredu alebo k stredu.

To dáva fyzikálny zmysel.

Ak sa korálka pohne radiálne, zmení svoju vzdialenosť od stredu a constraint poruší.

Povolená velocity preto musí smerovať kolmo na tento radiálny smer — po dotyčnici kružnice.

Matematicky to vyjadruje:

**[2x, 2y] * [ẋ, ẏ] = 0**

Skalárny súčin dvoch kolmých vectorov je nula.

Takže za rovnicou sa skrýva veľmi konkrétna geometrická predstava.

---

## 14. Jacobian constraintov

Ak máme iba jednu funkciu g a dve variables, derivatives vieme jednoducho vypísať.

Robot však môže mať veľa configuration variables a zároveň viac constraints:

**g1(q) = 0, g2(q) = 0, g3(q) = 0**

Každý constraint môže závisieť od viacerých configuration variables.

Potrebujeme teda sledovať, ako každý constraint reaguje na zmenu každej variable.

Všetky tieto partial derivatives usporiadame do matrix nazývanej **Jacobian**.

V tomto kontexte si Jacobian môžeš predstaviť ako tabuľku, ktorá hovorí:

**„Ak trochu zmením jednotlivé configuration variables, ako tým ovplyvním jednotlivé constraints?"**

Keď potom Jacobian vynásobíme velocity vectorom q̇, zistíme, ako sa constraints menia pri konkrétnom pohybe.

Ak dostaneme nulu, daná velocity ich v tomto okamihu neporušuje.

---

## 15. Pfaffian form

Velocity constraints sa často zapisujú všeobecne ako:

**A(q) * q̇ = 0**

Tomuto tvaru hovoríme **Pfaffian form**.

Rozoberme si ho.

**q** je configuration systému.

**q̇** opisuje, ako rýchlo sa jednotlivé configuration variables práve menia.

**A(q)** obsahuje vzťahy, ktoré určujú, ktoré kombinácie týchto velocities sú pri configuration q dovolené.

Celá equation teda znamená:

**„Pri aktuálnej configuration q nemôže mať systém ľubovoľnú velocity q̇. Povolené sú iba také velocities, ktoré spĺňajú túto podmienku."**

Pri kružnici máme napríklad:

**x * ẋ + y * ẏ = 0**

čo môžeme zapísať:

**[x, y] * [ẋ, ẏ] = 0**

To je tiež Pfaffian form.

A tu prichádza veľmi dôležitá vec:

**To, že constraint obsahuje velocities a má tvar A(q) * q̇ = 0, ešte neznamená, že je nonholonomic.**

Kružnica je toho dôkazom.

Jej velocity constraint obsahuje ẋ a ẏ, ale vieme, že vznikol z holonomic configuration constraintu:

**x² + y² = r²**

Aby sme vedeli tieto prípady rozlíšiť, potrebujeme pojem **integrability**.

---

## 16. Čo znamená integrable velocity constraint

Predstav si, že ti niekto nedá pôvodnú rovnicu kružnice.

Dá ti iba:

**x * ẋ + y * ẏ = 0**

Ty teda poznáš iba pravidlo pre velocity.

Teraz sa pýtaš:

**„Skrýva sa za týmto pravidlom nejaká podmienka na samotné x a y?"**

Inými slovami:

Dá sa velocity constraint spätne premeniť na vzťah medzi configuration variables?

Pri tomto príklade áno.

Všimneme si:

**d/dt(x² + y²) = 2x * ẋ + 2y * ẏ**

Náš velocity constraint je:

**x * ẋ + y * ẏ = 0**

Vynásobíme ho dvomi:

**2x * ẋ + 2y * ẏ = 0**

Teda:

**d/dt(x² + y²) = 0**

A čo znamená derivative rovná nule?

Znamená, že daná veličina zostáva počas pohybu konštantná.

Preto:

**x² + y² = C**

kde C je nejaká konštanta.

Takže z velocity constraintu sme sa dokázali dostať späť k podmienke na configuration.

Takýto velocity constraint nazývame **integrable**.

---

## 17. Prečo dostaneme konštantu

Je dobré zastaviť sa aj pri tomto kroku.

Ak:

**df/dt = 0**

znamená to:

**f sa nemení s časom.**

To však automaticky neznamená, že f musí byť nula.

Ak bola na začiatku hodnota f = 5, zostane 5.

Ak bola f = 20, zostane 20.

Preto z:

**d/dt(x² + y²) = 0**

dostávame:

**x² + y² = C**

Konkrétnu hodnotu C určí počiatočná configuration.

Ak korálka začala na kružnici s polomerom r, potom:

**C = r²**

a dostávame:

**x² + y² = r²**

Čiže sme sa vrátili k pôvodnému configuration constraintu.

Práve toto znamená, že velocity constraint je **integrable** — vieme ho spätne spojiť s podmienkou na configuration.

---

## 18. Vzťah medzi holonomic constraintom a integrability

Teraz už môžeme celý vzťah poskladať bez preskakovania krokov.

Začneme holonomic configuration constraintom:

**g(q) = 0**

Ten hovorí:

**„Systém musí zostať medzi configurations, ktoré spĺňajú túto podmienku."**

Keď sa systém pohybuje, q sa mení s časom:

**q = q(t)**

ale constraint musí zostať splnený:

**g(q(t)) = 0**

Preto sa jeho hodnota nesmie meniť:

**dg/dt = 0**

Pomocou chain rule dostaneme:

**(dg/dq) * q̇ = 0**

To je velocity constraint.

Hovorí:

**„Povolené sú iba také okamžité velocities, ktoré systém nevyvedú z množiny povolených configurations."**

A keďže vieme, že tento velocity constraint vznikol derivovaním funkcie g, dokážeme ho v princípe spätne integrovať a dostať:

**g(q) = C**

Preto je taký velocity constraint **integrable**.

Môžeme si teda zapamätať logiku:

**holonomic configuration constraint** → určuje povolené configurations → pri pohybe musí zostať splnený → preto jeho derivácia musí byť nulová → vznikne velocity constraint → ten je spätne spojený s pôvodným configuration constraintom → preto je integrable.

A teraz sa môžeme opýtať:

**Čo ak máme velocity constraint, ale nedokážeme za ním nájsť žiadny takýto configuration constraint?**

Tu sa dostávame k nonholonomic constraints.

---

## 19. Najprv jednoduchý príklad: auto

Predstav si auto stojace na veľkom prázdnom parkovisku.

Jeho configuration môžeme zjednodušene opísať:

**q = (x, y, φ)**

kde:

- **x a y** určujú jeho position v rovine,
- a **φ** určuje, ktorým smerom je auto natočené.

Predstav si, že auto stojí na jednom mieste a vedľa neho, dva metre napravo, si označíme druhé miesto.

Môže auto v tej druhej configuration existovať?

Samozrejme.

Môže tam pokojne stáť a byť otočené rovnakým smerom.

Takže táto configuration nie je zakázaná.

Teraz sa však spýtaj niečo iné:

**Dokáže sa auto zo svojej aktuálnej configuration okamžite pohnúť čisto doprava bez zmeny orientation?**

Bežné auto nie.

Jeho kolesá sú skonštruované tak, aby sa kotúľali predovšetkým v smere, ktorým sú natočené. Nemôžu sa jednoducho kotúľať bokom.

Máme teda zaujímavú situáciu:

**configuration napravo je možná, ale okamžitý bočný pohyb k nej nie je možný.**

To je zásadne odlišné od korálky na kružnici.

---

## 20. Rozdiel medzi „nemôžem tam byť" a „nemôžem sa tam pohnúť priamo"

Pri korálke existujú body mimo kružnice.

Môže sa v nich korálka nachádzať?

Nie.

Ak je pripútaná k drôtu, tieto configurations jednoducho nie sú súčasťou jej configuration space.

Nezáleží na tom, aký komplikovaný pohyb by sme vymysleli. Korálka nemôže opustiť drôt.

Holonomic constraint teda hovorí:

**„Tieto configurations sú dovolené a tieto nie."**

Pri aute je situácia iná.

Configuration o dva metre napravo môže byť úplne dovolená.

Auto sa tam iba nedokáže dostať jedným čistým bočným pohybom.

Môže však:

- ísť dopredu,
- zatočiť,
- cúvať,
- znovu zatočiť,
- vyrovnať sa

a nakoniec skončiť vedľa pôvodného miesta.

Presne toto robíme pri paralelnom parkovaní.

Takže:

**„Nemôžem sa týmto smerom pohnúť práve teraz"**

nie je to isté ako:

**„Nemôžem sa v tejto configuration nikdy nachádzať."**

Toto rozlíšenie je základom nonholonomic constraints.

---

## 21. Nonholonomic constraint

Teraz môžeme pojem definovať presnejšie.

Predstavme si velocity constraint:

**A(q) * q̇ = 0**

Tento constraint určuje, ktoré instantaneous velocities sú pri danej configuration povolené.

Pokúsime sa ho integrovať.

Ak by sme dokázali nájsť funkciu g(q), ktorá by nám dala ekvivalentnú podmienku:

**g(q) = C**

potom by bol velocity constraint integrable a v podstate by za ním stál holonomic configuration constraint.

Ale niekedy to nejde.

Máme skutočné obmedzenie velocity, ktoré nemožno jednoducho nahradiť podmienkou na samotnú configuration.

Takýto velocity constraint je **nonintegrable** a v kontexte tejto lekcie ho nazývame **nonholonomic constraint**.

Jeho podstata teda nie je:

**„Tieto configurations sú zakázané."**

Jeho podstata je:

**„V tejto configuration nie sú všetky okamžité smery pohybu možné."**

---

## 22. Rolling without slipping

![Minca kotúľajúca sa po rovine bez šmyku](/book/ch2/fig2-11.png)

Typickým príkladom je **rolling without slipping — kotúľanie bez šmyku**.

Predstav si mincu alebo tenké koleso, ktoré sa kotúľa po rovnej podlahe a zostáva pritom vzpriamené.

Jeho configuration môžeme v tomto zjednodušenom modeli opísať:

**q = (x, y, φ, θ)**

kde:

- **x, y** určujú jeho polohu v rovine,
- **φ** určuje smer, ktorým je koleso natočené,
- a **θ** určuje, o koľko sa koleso pretočilo okolo vlastnej osi.

Je dôležité povedať, že ide o model vzpriameného kotúľajúceho sa kolesa. Neopisujeme tu voľnú mincu, ktorá sa môže nakláňať všetkými smermi v priestore.

Teraz pridáme fyzikálnu podmienku:

**koleso sa kotúľa bez šmyku.**

Čo to znamená?

Ak sa koleso otočí o určitý uhol, musí tomu zodpovedať určitá prejdená vzdialenosť po podlahe.

Nemôžeme napríklad otočiť koleso, ale nechať jeho contact point kĺzať po podlahe úplne nezávisle. To by už bol šmyk.

Ak má koleso radius r, jeho forward speed súvisí s angular velocity:

**v = r * θ̇**

Ak je koleso natočené smerom φ, jeho forward motion rozdelíme na x-ovú a y-ovú zložku:

**ẋ = r * θ̇ * cos φ**

**ẏ = r * θ̇ * sin φ**

Tieto equations hovoria, že translational velocity kolesa nie je nezávislá od jeho orientation a rotation.

Ak poznáme φ a θ̇, nemôžeme si ẋ a ẏ zvoliť úplne ľubovoľne.

To je velocity constraint.

---

## 23. Prečo rolling constraint neznamená jednoducho menej configurations

Teraz príde jedna z najdôležitejších častí.

Mohlo by sa zdať:

„Ak constraints obmedzujú velocity, potom predsa musia automaticky znižovať DOF."

Lenže **DOF je dimension configuration space**.

Pýta sa:

**Koľko nezávislých parametrov potrebujeme na opis configuration systému?**

Velocity constraint sa pýta:

**Koľkými smermi sa z tejto configuration môžeme okamžite pohybovať?**

To nie je tá istá otázka.

Pri rolling wheel môže byť configuration opísaná štyrmi coordinates:

**(x, y, φ, θ)**

Hoci v jednom konkrétnom okamihu nemôžeme všetky štyri velocities voliť nezávisle, neznamená to automaticky, že existuje jednoduchá rovnosť medzi x, y, φ a θ, ktorá by odstránila časť configurations.

Prečo?

Pretože výsledná poloha závisí od toho, **akú cestu koleso vykonalo**.

---

## 24. Prečo na poradí pohybov záleží

Vráťme sa k autu.

Auto sa nevie posunúť priamo bokom.

Ale môže vykonať sériu povolených pohybov a nakoniec skončiť bokom od pôvodného miesta.

Najskôr sa pohne dopredu a zatočí.

Tým zmení svoju configuration.

Keď je natočené inak, zmení sa aj smer, ktorým sa teraz môže pohybovať.

Potom môže cúvnuť.

Znovu zmení configuration a tým aj svoje ďalšie možnosti pohybu.

Postupným kombinovaním povolených pohybov tak dokáže vytvoriť výsledný displacement, ktorý nebol dostupný ako jeden okamžitý pohyb.

Preto je pri nonholonomic systémoch dôležitá **trajectory — cesta, ktorou sa systém pohyboval**.

Nestačí iba pozrieť na počiatočnú a konečnú configuration a hľadať jednoduchú rovnosť medzi nimi.

---

## 25. Prečo rolling constraint nemožno jednoducho zapísať ako g(q) = 0

Pri korálke sme mali:

**x² + y² = r²**

Tento vzťah platil pre každú povolenú configuration bez ohľadu na to, ako sa korálka na dané miesto dostala.

Pri rolling wheel takýto jednoduchý vzťah medzi:

**x, y, φ, θ**

vo všeobecnosti nemáme.

Prečo?

Pretože rovnakú position a orientation môžeme dosiahnuť rôznymi trajectories a počas týchto trajectories sa môže koleso rôzne otáčať.

Rolling constraint teda prirodzene opisuje **vzťah medzi okamžitými velocities**, nie jednoduchú pevnú geometrickú množinu configurations.

A práve preto ide o typický nonholonomic constraint.

---

## 26. Holonomic a nonholonomic constraint vedľa seba

Teraz už ich môžeme porovnať bez toho, aby sme sa spoliehali iba na názvy.

### Holonomic constraint

Vieme ho vyjadriť ako podmienku na samotnú configuration:

**g(q) = 0**

To znamená, že už z aktuálnej configuration vieme rozhodnúť, či je povolená.

Takýto constraint priamo obmedzuje configuration space.

Príkladom je korálka na kružnici:

**x² + y² = r²**

Bod mimo kružnice je nepovolená configuration.

Keď holonomic constraint derivujeme, dostaneme velocity constraint. Ten je integrable, pretože ho vieme spätne spojiť s pôvodnou podmienkou na configuration.

### Nonholonomic constraint

Máme obmedzenie velocity, napríklad:

**A(q) * q̇ = 0**

ale nedokážeme ho nahradiť ekvivalentným configuration constraintom:

**g(q) = 0**

Constraint teda nehovorí jednoducho:

**„Tu systém smie byť a tu nesmie."**

Hovorí:

**„Z tejto configuration sa systém môže práve teraz pohybovať iba určitými smermi."**

Typickým príkladom je auto alebo koleso kotúľajúce sa bez šmyku.

---

## 27. Prečo samotný zápis A(q) * q̇ = 0 nestačí

Keď uvidíš rovnicu:

**A(q) * q̇ = 0**

nemôžeš iba podľa jej vzhľadu povedať:

„To je nonholonomic constraint."

Prečo?

Pretože aj korálka na kružnici má velocity constraint v takomto tvare.

Rozdiel nie je v tom, **či equation obsahuje velocity**.

Rozdiel je v tom, **či sa za touto velocity equation skrýva configuration constraint**.

Preto sa pýtame:

**Dá sa constraint integrovať na podmienku typu g(q) = C?**

Ak áno, je **integrable** a súvisí s holonomic constraintom.

Ak nie, ide o **nonintegrable**, teda nonholonomic velocity constraint.

---

## 28. Configuration space a okamžité možnosti pohybu sú dve rôzne veci

Toto je veľmi užitočný spôsob, ako si celú tému usporiadať.

Predstav si jeden bod v configuration space.

Tento bod reprezentuje:

**„Robot je práve v tejto configuration."**

Teraz sa môžeme opýtať:

**„Ktorými smermi môže z tohto bodu okamžite pokračovať?"**

Pri holonomic constrainte je samotný configuration space zúžený.

Korálka má ako C-space kružnicu. Môže sa pohybovať iba po jej dotyčnici, pretože iné directions by ju z C-space vyviedli.

Pri nonholonomic systéme však môže byť configuration space väčší, pričom z jedného konkrétneho bodu nie sú okamžite dostupné všetky directions.

Auto môže mať configuration:

**(x, y, φ)**

ale v jednom okamihu sa nevie pohybovať ľubovoľným smerom v tomto trojrozmernom C-space.

To však ešte neznamená, že ostatné configurations sú nedosiahnuteľné.

Môže ich dosiahnuť sériou povolených pohybov.

---

## 29. Prečo sú nonholonomic constraints dôležité v robotike

Tento rozdiel je veľmi dôležitý pri **wheeled mobile robots**.

Predstav si robota s klasickými kolesami, ktorý sa má dostať zo štartu A do cieľa B.

Nestačí nájsť geometrickú čiaru medzi A a B, ktorá neprechádza cez prekážku.

Cesta môže byť geometricky voľná, ale robot ju nemusí vedieť fyzicky vykonať.

Napríklad najkratšia cesta môže vyžadovať, aby sa robot posunul priamo bokom.

Ak jeho kolesá taký pohyb neumožňujú, trajectory nie je realizovateľná.

**Motion planning** preto musí rešpektovať nielen prekážky v prostredí, ale aj constraints samotného robota.

Pri nonholonomic robotovi teda nehľadáme iba:

**„Kadial existuje voľná cesta?"**

Musíme sa pýtať aj:

**„Dokáže sa robot po tejto ceste skutočne pohybovať vzhľadom na svoje kinematické obmedzenia?"**

---

## 30. Najdôležitejší rozdiel: configuration vs. velocity

Ak sa ti niekedy začnú holonomic a nonholonomic constraints pliesť, najskôr si polož dve samostatné otázky.

**Configuration:**

**V akom stave systém práve je?**

Pri bode: **(x, y)**

Pri aute: **(x, y, φ)**

Pri robotickom ramene: **joint angles**

Configuration teda opisuje stav systému v jednom okamihu.

**Velocity:**

**Ako sa tento stav práve teraz mení?**

Pri bode: **(ẋ, ẏ)**

Pri aute: ako sa mení x, ako sa mení y, ako sa mení orientation φ.

Pri robotickom ramene: ako rýchlo sa menia jednotlivé joint angles.

Preto configuration constraint a velocity constraint odpovedajú na dve rozdielne otázky.

---

## 31. Dva príklady, podľa ktorých si rozdiel ľahko vybavíš

Najlepšie je vrátiť sa ku korálke a autu.

**Korálka na kružnici**

Constraint:

**x² + y² = r²**

hovorí:

**„Korálka musí byť na kružnici."**

Bod mimo kružnice je zakázaná configuration.

Ide teda o **holonomic configuration constraint**.

Keď ho derivujeme:

**x * ẋ + y * ẏ = 0**

dostaneme velocity constraint, ktorý hovorí:

**„Keď už si na kružnici, pohybuj sa iba po jej dotyčnici, aby si ju neopustila."**

Tento velocity constraint vieme spätne integrovať na:

**x² + y² = C**

Preto je **integrable**.

**Auto**

Auto môže byť na množstve rôznych miest a orientations.

Miesto napravo od neho nie je zakázaná configuration.

Auto sa však nemôže v jednom okamihu posunúť čistým bočným smerom.

Musí vykonať určitú sequence pohybov.

Tu teda constraint nehovorí:

**„Na tomto mieste nesmieš byť."**

Hovorí:

**„Týmto smerom sa odtiaľto práve teraz nemôžeš pohybovať."**

To je typický **nonholonomic velocity constraint**.

---

## 32. Celá logika lekcie krok za krokom

Začneme configuration:

**q**

Tá opisuje aktuálny stav systému.

Ak mechanická alebo geometrická podmienka obmedzuje, ktoré configurations sú možné, môžeme dostať:

**g(q) = 0**

To je **holonomic configuration constraint**.

Pri n configuration variables a k nezávislých holonomic constraints má systém za bežných podmienok:

**n - k DOF**

Keď sa systém pohybuje:

**q = q(t)**

pôvodný constraint musí zostať splnený.

Preto:

**dg/dt = 0**

a pomocou chain rule:

**(dg/dq) * q̇ = 0**

Dostaneme **velocity constraint**.

Keď vieme velocity constraint spätne previesť na:

**g(q) = C,**

hovoríme, že je **integrable**.

Holonomic configuration constraints teda po derivovaní vedú k integrable velocity constraints.

Môžeme však mať velocity constraint:

**A(q) * q̇ = 0**

ktorý sa nedá previesť na ekvivalentnú podmienku iba medzi configuration variables.

Vtedy je **nonintegrable**, a teda v tomto kontexte **nonholonomic**.

Takýto constraint nemusí odstraňovať configurations zo samotného C-space. Namiesto toho obmedzuje, aké instantaneous motions môže systém v jednotlivých configurations vykonávať.

---

## 33. Rekapitulácia najdôležitejších pojmov

- **Configuration** — Úplný opis aktuálneho stavu systému. Pri robotickom ramene to môžu byť joint angles, pri aute position a orientation.
- **Configuration space (C-space)** — Množina všetkých configurations, ktoré môže systém nadobudnúť.
- **Configuration variables / coordinates** — Čísla, pomocou ktorých configuration zapisujeme.
- **Constraint** — Fyzikálna alebo geometrická podmienka, ktorú musí systém rešpektovať.
- **Configuration constraint** — Podmienka obmedzujúca samotné možné configurations.
- **Loop-closure constraint** — Geometrická podmienka closed-chain mechanizmu zabezpečujúca, že uzavretá slučka links zostáva spojená.
- **Holonomic constraint** — Constraint, ktorý môžeme vyjadriť priamo pomocou configuration variables, typicky ako: g(q) = 0. Určuje teda, ktoré configurations systému sú povolené.
- **Velocity** — Rýchlosť zmeny configuration.
- **Velocity constraint** — Podmienka určujúca, ktoré instantaneous velocities sú pri danej configuration povolené.
- **Jacobian constraintov** — Matrix derivatives, ktorá opisuje, ako malé zmeny configuration variables ovplyvňujú jednotlivé constraints.
- **Pfaffian form** — Všeobecný zápis velocity constraintu: A(q) * q̇ = 0
- **Integrable velocity constraint** — Velocity constraint, ktorý môžeme spätne previesť na podmienku medzi configuration variables: g(q) = C
- **Nonintegrable velocity constraint** — Velocity constraint, ktorý takto na configuration constraint previesť nemožno.
- **Nonholonomic constraint** — V tejto lekcii velocity constraint, ktorý je nonintegrable. Nezakazuje jednoducho určitú množinu configurations, ale obmedzuje okamžité smery pohybu systému.
- **Rolling without slipping** — Kotúľanie bez šmyku. Typický zdroj nonholonomic velocity constraints pri kolesách a mobilných robotoch.

---

## 34. Čo si z tejto lekcie odniesť

Najdôležitejšie nie je zapamätať si, že:

**holonomic = g(q) = 0**

a:

**nonholonomic = A(q) * q̇ = 0**

Takéto zapamätanie by bolo dokonca zavádzajúce, pretože aj holonomic constraint môže po derivovaní viesť k velocity equation tvaru A(q) * q̇ = 0.

Dôležité je pochopiť, **čo constraint v skutočnosti obmedzuje**.

Pri holonomic constrainte existuje podmienka na samotnú configuration.

Korálka musí zostať na kružnici. Configuration mimo kružnice jednoducho nie je dovolená.

Pri nonholonomic constrainte môže byť cieľová configuration úplne dovolená, ale systém sa k nej nemôže pohybovať ľubovoľným okamžitým smerom.

Auto sa nemôže posunúť priamo bokom, ale vhodným manévrom môže nakoniec skončiť vedľa svojho pôvodného miesta.

Preto si pri každom novom constrainte polož dve otázky:

**1. Zakazuje tento constraint určité configurations samotné?**

Ak áno a vieme ho vyjadriť pomocou configuration variables, ide o holonomic constraint.

**2. Alebo sú configurations možné, pričom constraint obmedzuje hlavne to, akým spôsobom sa medzi nimi môžeme pohybovať?**

Vtedy môžeme mať nonholonomic velocity constraint.

A práve rozdiel medzi **„kde systém môže byť"** a **„ako sa môže práve teraz pohybovať"** je hlavnou myšlienkou celej témy.

---

:::summary

Pri robotických systémoch musíme rozlišovať medzi **configuration constraints** a **velocity constraints**. Configuration constraint určuje, ktoré konfigurácie sú fyzicky možné. Velocity constraint určuje, akým spôsobom sa configuration môže v konkrétnom okamihu meniť.

Pri closed-chain mechanisms vznikajú **loop-closure equations**, pretože links musia zostať spojené do uzavretej slučky. Four-bar linkage môžeme napríklad reprezentovať štyrmi joint angles, ale tri nezávislé loop-closure constraints spôsobia, že mechanizmus má iba 1 DOF.

Všeobecný configuration constraint môžeme zapísať:

**g(θ) = 0**

Takýto constraint nazývame **holonomic constraint**. Pri n configuration variables a k nezávislých holonomic constraints má configuration space za bežných podmienok dimenziu:

**n - k**

Keď sa robot pohybuje, jeho configuration zapisujeme ako θ(t). Holonomic constraint musí platiť počas celého pohybu. Derivovaním podľa času dostaneme velocity constraint:

**(dg/dθ) * θ̇ = 0**

Všeobecnejšie môžeme velocity constraints zapisovať v Pfaffian form:

**A(θ) * θ̇ = 0**

Ak tento velocity constraint vznikol derivovaním configuration constraintu a môžeme ho spätne integrovať na vzťah typu g(θ) = konštanta, nazývame ho **integrable**. Práve s takýmito velocity constraints sú spojené holonomic constraints.

Nie každý velocity constraint je však integrable. Pri rolling without slipping môže byť okamžitý pohyb kolesa alebo mince obmedzený bez toho, aby existovala ekvivalentná configuration equation odstraňujúca časť reachable configuration space. Takýto constraint nazývame **nonholonomic** alebo **nonintegrable**.

Najdôležitejší rozdiel preto môžeme vyjadriť veľmi jednoducho:

**Holonomic constraint obmedzuje, kde systém môže byť.**

**Nonholonomic constraint môže namiesto toho obmedzovať, ako sa systém môže pohybovať a ako sa do určitej configuration dostane.**

Auto je najlepším intuitívnym príkladom. Nemôže sa okamžite posunúť bokom, ale vhodnou kombináciou jazdy a zatáčania sa môže dostať na miesto vedľa svojej pôvodnej polohy. Jeho okamžité velocity directions sú obmedzené, ale z toho automaticky nevyplýva zmenšenie dimension jeho reachable configuration space.

A práve toto rozlíšenie medzi configuration a velocity je základom pre ďalšie štúdium robotického pohybu, motion planningu a kinematiky wheeled mobile robots.

:::`;
