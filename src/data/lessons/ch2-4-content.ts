// Chapter 2.4 – Lekcia 7: Configuration and Velocity Constraints
// Full lesson content - DO NOT SHORTEN

export const ch24Content = `# Lekcia 7: Configuration and Velocity Constraints

## Holonomic, Nonholonomic a Integrability — od úplného základu

---

## 01. Čo sa v tejto lekcii vlastne snažíme pochopiť?

V predchádzajúcich častiach sme sa naučili, že **configuration** opisuje stav robota. Ak má napríklad robotické rameno dva rotačné joints, jeho configuration môžeme opísať dvoma uhlami:

**θ = [θ₁, θ₂]**

Jedna konkrétna dvojica uhlov predstavuje jednu konkrétnu polohu celého mechanizmu.

Ak by boli oba joints úplne nezávislé, mohli by sme si θ₁ a θ₂ vyberať ľubovoľne. Napríklad θ₁ = 20° a θ₂ = 50°, potom θ₁ = 40° a θ₂ = 10° a podobne.

V skutočných robotických systémoch však veľmi často existujú fyzické pravidlá, ktoré hovoria, že **nie všetky kombinácie configuration variables sú možné** alebo že sa robot **nemôže pohybovať ľubovoľným spôsobom**.

Takýmto pravidlám hovoríme **constraints — obmedzenia**.

A celá táto lekcia je v skutočnosti o jednej otázke:

**Čo presne constraint obmedzuje?**

Môže totiž obmedzovať dve odlišné veci.

Prvá možnosť je:

**„V tejto configuration systém vôbec nemôže byť."**

Druhá možnosť je:

**„V tejto configuration systém byť môže, ale nemôže sa do nej alebo z nej pohybovať ľubovoľným spôsobom."**

Tieto dve situácie vyzerajú podobne, ale matematicky aj fyzikálne sú veľmi odlišné.

Prvý typ nás privedie k **holonomic constraints**.

Druhý typ nás privedie k **nonholonomic constraints**.

A aby sme medzi nimi pochopili rozdiel, najskôr potrebujeme veľmi dobre pochopiť, čo robí obyčajný configuration constraint.

---

## 02. Začnime four-bar linkage

![Štvorkĺbový mechanizmus](/book/ch2/fig2-10.png)

Predstav si klasický **four-bar linkage** — štyri pevné links spojené rotačnými joints tak, že vytvoria uzavretú slučku.

Dôležité je práve slovo **uzavretú**.

Ak by sme links od seba oddelili, každý by sme mohli položiť prakticky ľubovoľne. Lenže keď ich spojíme do jedného mechanizmu, koniec posledného linku musí stále presne sedieť na začiatku prvého.

Mechanizmus sa počas pohybu nemôže rozpojiť.

Predstav si, že začneš v jednom bode mechanizmu a postupuješ po jednotlivých links.

Prvý link ťa posunie určitú vzdialenosť určitým smerom.

Druhý link ťa posunie ďalej.

Potom tretí.

Potom štvrtý.

Keďže ide o uzavretú slučku, po prejdení všetkých štyroch links musíš skončiť **presne v tom istom bode, v ktorom si začala**.

Ak by si skončila napríklad 5 cm napravo od pôvodného bodu, mechanizmus by sa fyzicky nedal spojiť.

To je dôvod, prečo potrebujeme **loop-closure constraints**.

Nie sú to dodatočné matematické pravidlá, ktoré sme umelo prilepili na robota.

Sú iba matematickým zápisom fyzickej požiadavky:

**„Links tvoria uzavretý mechanizmus, takže ich geometria musí pri každej povolenej configuration sedieť."**

---

## 03. Prečo pri planar four-bar linkage vznikajú tri podmienky?

Toto je dobré pochopiť, nie iba sa naučiť, že „sú tri".

Keď sa pohybujeme v rovine, geometrické uzavretie mechanizmu musíme zabezpečiť v troch veciach.

Po prejdení celej slučky nesmie zostať žiadny výsledný posun v smere **x**.

Rovnako nesmie zostať žiadny výsledný posun v smere **y**.

A zároveň musí správne sedieť aj výsledná **orientation**.

Pre planar rigid-body motion totiž potrebujeme na opis relatívnej polohy tri veci:

**x-position, y-position a orientation.**

Keď obídeme uzavretú slučku a vrátime sa späť na začiatok, výsledná zmena všetkých troch musí zodpovedať návratu do pôvodného stavu.

Preto sa pri loop closure prirodzene objavujú tri nezávislé geometrické podmienky.

Nemusíš si zatiaľ pamätať konkrétny trigonometrický zápis. Dôležité je chápať dôvod:

**slučka sa musí uzavrieť v polohe aj v orientácii.**

---

## 04. Prečo štyri joint angles neznamenajú 4 DOF?

Four-bar linkage môžeme opísať napríklad štyrmi joint angles:

**θ = [θ₁, θ₂, θ₃, θ₄]**

Tu sa veľmi ľahko spraví chyba.

Vidíme štyri čísla a povieme si:

**„Takže mechanizmus má štyri degrees of freedom."**

Lenže **počet čísel použitých na opis systému nie je automaticky počet DOF**.

Degrees of freedom hovoria, koľko parametrov môžeme meniť **nezávisle**.

A práve slovo nezávisle je rozhodujúce.

Predstav si skutočný four-bar linkage. Chytíš jeden link a trochu ním otočíš.

Čo sa stane?

Ostatné links sa tiež pohnú.

Nie preto, že by sme ich elektronicky naprogramovali, ale preto, že sú mechanicky spojené.

Keď zmeníš θ₁, ostatné uhly sa musia prispôsobiť tak, aby sa slučka stále uzatvárala.

Nemôžeš teda povedať:

„θ₁ nastavím na 20°, θ₂ na 73°, θ₃ na 5° a θ₄ na 160°"

bez toho, aby si skontrolovala, či sa links pri týchto hodnotách vôbec dokážu spojiť.

Veľká časť náhodných kombinácií štyroch uhlov by znamenala, že sa konce links jednoducho nestretnú.

Máme teda štyri variables, ale zároveň tri nezávislé podmienky, ktoré musia spĺňať.

Preto za bežných podmienok:

**4 variables − 3 independent constraints = 1 DOF**

To znamená, že v skutočnosti máme iba **jednu nezávislú voľbu**.

Ak zvolíme napríklad θ₁, ostatné joint angles už musia dostať také hodnoty, aby zostal mechanizmus uzavretý.

Preto má four-bar linkage **1 DOF**.

---

## 05. Constraints si môžeme predstaviť ako filter

Toto je veľmi užitočný spôsob rozmýšľania o configuration space.

Predstavme si, že úplne ignorujeme fyzické spojenie links a dovolíme každému zo štyroch uhlov nadobudnúť ľubovoľnú hodnotu.

Dostali by sme obrovské množstvo kombinácií:

**[θ₁, θ₂, θ₃, θ₄]**

Každá takáto štvorica predstavuje jeden bod vo väčšom matematickom priestore joint coordinates.

Lenže väčšina týchto bodov nepredstavuje skutočný four-bar linkage.

Predstav si napríklad, že podľa zvolených uhlov skončí posledný link desať centimetrov od jointu, ku ktorému má byť pripojený.

Matematicky sme síce napísali štyri úplne platné čísla, ale fyzicky taká configuration neexistuje.

Constraints preto fungujú ako **filter**.

Začneme veľkým priestorom všetkých možných čísel.

Potom povieme:

**„Ponechaj iba tie kombinácie, pri ktorých sa mechanizmus skutočne uzavrie."**

A práve množina, ktorá po tomto filtrovaní zostane, predstavuje skutočný **configuration space mechanizmu**.

Preto môže byť configuration space napríklad jednorozmerný, hoci na jeho zápis používame štyri čísla.

---

## 06. Prečo píšeme g(θ) = 0?

Pri jednoduchom mechanizme môžeme každú podmienku vypísať samostatne.

Pri komplikovanom robotovi by to však bolo nepraktické. Robot môže mať desať, dvadsať alebo sto configuration variables a množstvo constraints.

Preto si všetky configuration variables spojíme do vectora:

**θ = [θ₁, θ₂, ..., θₙ]**

A constraints zabalíme do funkcie **g**.

Napíšeme:

**g(θ) = 0**

Čo tým vlastne hovoríme?

Funkciu g si môžeš predstaviť ako **kontrolu porušenia constraintu**.

Vložíme do nej configuration θ.

Ak configuration presne spĺňa požadované geometrické podmienky, výsledok je nula.

Ak ich nespĺňa, výsledok nie je nula.

Napríklad pri bode na kružnici by sme mohli definovať:

**g(x,y) = x² + y² − r²**

Ak je bod presne na kružnici:

**x² + y² = r²**

takže:

**g(x,y) = 0**

Ak sa bod nachádza mimo kružnice, rovnosť už neplatí a g nebude nula.

Preto zápis:

**g(θ) = 0**

v skratke znamená:

**„Povolené sú iba také configurations θ, ktoré spĺňajú naše fyzické alebo geometrické podmienky."**

---

## 07. Čo znamená holonomic constraint?

Teraz môžeme pojem **holonomic constraint** zaviesť prirodzene.

Ak dokážeme constraint vyjadriť priamo pomocou aktuálnej configuration, napríklad:

**g(θ) = 0**

ide o **holonomic configuration constraint**.

Kľúčové je slovo **configuration**.

Na rozhodnutie, či systém constraint spĺňa, nám stačí poznať jeho aktuálnu configuration.

Nemusíme vedieť, ako sa tam dostal.

Nemusíme poznať jeho predchádzajúci pohyb.

Stačí sa pozrieť na aktuálny stav.

Napríklad pri bode na kružnici poznáme x a y a skontrolujeme:

**x² + y² = r² ?**

Ak áno, bod je na kružnici.

Ak nie, nie je.

To je presne charakter holonomic constraintu.

Constraint rozdeľuje configurations na:

**povolené**

a

**nepovolené.**

---

## 08. Bod na kružnici — najjednoduchší príklad

Predstav si malú korálku navlečenú na pevnom kruhovom drôte.

Bez drôtu by sa bod v rovine mohol pohybovať dvoma nezávislými smermi:

**x**

a

**y**

Jeho configuration by sme teda mohli zapísať:

**q = (x,y)**

a mal by 2 DOF.

Teraz ho však pripevníme na kruhovú obruč s polomerom r.

Bod musí stále spĺňať:

**x² + y² = r²**

Prečo práve túto rovnicu?

Pretože podľa Pytagorovej vety je vzdialenosť bodu (x,y) od stredu:

**√(x² + y²)**

A ak má byť bod stále na kružnici s polomerom r, táto vzdialenosť musí byť stále r.

Teda:

**√(x² + y²) = r**

Po umocnení:

**x² + y² = r²**

To je náš configuration constraint.

Máme dve configuration variables x a y, ale jednu nezávislú podmienku.

Takže zostáva:

**2 − 1 = 1 DOF**

A to sedí aj intuitívne.

Ak poznáme miesto bodu na kružnici pomocou jedného uhla, jeho x aj y už z toho vieme určiť.

---

## 09. Configuration constraint nehovorí iba „kde"

Teraz sa dostávame k veľmi dôležitému kroku.

Máme bod na kružnici:

**x² + y² = r²**

Táto rovnica nám hovorí, kde sa bod môže nachádzať.

Lenže ak sa bod začne pohybovať, constraint automaticky obmedzí aj to, **akým smerom sa môže pohybovať**.

Prečo?

Predstav si bod úplne napravo od kružnice.

Jeho position je:

**x = r**

**y = 0**

Teraz by si mu chcela dať velocity smerujúcu priamo doprava.

Čo by sa stalo o malý okamih neskôr?

Jeho x by bolo väčšie než r.

Napríklad:

**x = r + malá hodnota**

Potom by:

**x² + y² > r²**

a bod by už nebol na kružnici.

Takže pravostranná velocity nie je povolená.

To isté platí pre velocity priamo doľava. Bod by sa dostal dovnútra kružnice.

Jediný okamžitý smer, ktorý ho udrží na kružnici, je smer **po dotyčnici ku kružnici**.

Takže position constraint automaticky vytvoril pravidlo pre velocity.

To nie je náhoda.

Ak musí byť určitá podmienka splnená **stále**, potom pri pohybe nesmieme túto podmienku začať meniť.

A presne toto matematicky zachytáva derivácia.

---

## 10. Prečo sa tu objaví derivácia?

Derivácia nám hovorí:

**„Ako rýchlo sa nejaká hodnota práve teraz mení?"**

Ak máme napríklad position x(t), potom:

**ẋ**

hovorí, ako rýchlo sa x mení v čase.

Ak sa x zväčšuje, ẋ je kladné.

Ak sa zmenšuje, ẋ je záporné.

Ak sa práve nemení, ẋ = 0.

Teraz sa pozrime na náš constraint:

**x² + y² = r²**

Ľavá strana predstavuje niečo, čo musí počas celého pohybu zostať rovnaké.

Pre bod na jednej konkrétnej kružnici musí byť hodnota:

**x² + y²**

stále rovná:

**r²**

Čiže sa nesmie meniť.

A ak sa nejaká hodnota s časom nemení, jej časová derivácia musí byť:

**0**

Preto derivujeme obe strany.

---

## 11. Derivácia kruhového constraintu úplne krok za krokom

Začneme:

**x² + y² = r²**

Treba si uvedomiť, že pri pohybe sú v skutočnosti x a y funkcie času:

**x = x(t)**

**y = y(t)**

Takže presnejšie máme:

**x(t)² + y(t)² = r²**

Teraz chceme zistiť, ako sa ľavá strana mení v čase.

Pri derivovaní x² podľa času dostaneme:

**2x·ẋ**

Prečo nie iba 2x?

Pretože x samotné sa mení s časom.

Najskôr derivujeme „štvorec" a dostaneme 2x, ale potom musíme zohľadniť, ako rýchlo sa mení samotné x. Preto násobíme ẋ.

Rovnako:

**d/dt(y²) = 2y·ẏ**

Pravá strana r² je konštanta. Polomer kružnice sa nemení.

Derivácia konštanty je nula.

Dostaneme:

**2x·ẋ + 2y·ẏ = 0**

Vydelíme dvomi:

**x·ẋ + y·ẏ = 0**

Toto už nie je constraint na position.

Je v ňom ẋ a ẏ, teda velocities.

Je to **velocity constraint**.

---

## 12. Čo x·ẋ + y·ẏ = 0 fyzicky znamená?

Namiesto memorovania rovnice si ju poďme skontrolovať na konkrétnych miestach.

Najskôr pravý bod kružnice:

**x = r**

**y = 0**

Dosadíme:

**r·ẋ + 0·ẏ = 0**

čiže:

**r·ẋ = 0**

Keďže r nie je nula:

**ẋ = 0**

V tomto bode teda bod nesmie mať x-ovú velocity.

Môže však mať ẏ.

Čiže môže ísť hore alebo dole.

Presne to je smer dotyčnice ku kružnici.

Teraz horný bod:

**x = 0**

**y = r**

Dostaneme:

**0·ẋ + r·ẏ = 0**

takže:

**ẏ = 0**

V hornom bode sa bod môže okamžite pohybovať doľava alebo doprava, ale nie hore alebo dole.

Znovu presne po dotyčnici.

Takže velocity equation nie je abstraktný vedľajší výsledok.

Veľmi konkrétne opisuje:

**„Aké okamžité velocities udržia systém medzi povolenými configurations?"**

---

## 13. Prečo holonomic constraint vždy vytvorí velocity constraint?

Teraz sa môžeme vrátiť k všeobecnému prípadu.

Máme:

**g(θ) = 0**

To znamená:

„Robot sa musí stále nachádzať medzi configurations, pre ktoré je g nulové."

Keď sa robot pohybuje:

**θ = θ(t)**

takže:

**g(θ(t)) = 0**

Čo musí platiť o hodnote g počas pohybu?

Musí zostať stále nulová.

Na začiatku 0.

O sekundu 0.

O ďalšiu sekundu 0.

Stále 0.

Jej časová zmena preto musí byť nulová:

**d/dt g(θ(t)) = 0**

A práve toto je dôvod, prečo holonomic configuration constraint automaticky vedie k velocity constraintu.

Nie preto, že „to tak hovorí vzorec".

Ale preto, že ak chceš zostať na množine povolených configurations, nemôžeš sa pohybovať smerom, ktorý začne porušovať constraint.

---

## 14. Odkiaľ sa vezme (dg/dθ)·θ̇?

Toto je len všeobecná verzia toho, čo sme už urobili pri kružnici.

Predstav si najskôr, že g závisí od dvoch variables:

**g(θ₁, θ₂)**

Keď sa robot pohybuje, mení sa θ₁ aj θ₂.

Hodnota g sa preto môže meniť z dvoch dôvodov:

pretože sa mení θ₁,

a pretože sa mení θ₂.

Celková rýchlosť zmeny g je preto kombináciou oboch účinkov.

Pýtame sa:

**Ako veľmi sa g zmení, ak trochu zmením θ₁?**

To opisuje:

**∂g/∂θ₁**

A:

**Ako rýchlo sa θ₁ práve mení?**

To je:

**θ̇₁**

Ich súčin teda opisuje príspevok pohybu θ₁ k zmene g.

Rovnako pre θ₂.

Takže:

**dg/dt = (∂g/∂θ₁)θ̇₁ + (∂g/∂θ₂)θ̇₂**

Pri n variables dostaneme:

**dg/dt = (∂g/∂θ₁)θ̇₁ + ... + (∂g/∂θₙ)θ̇ₙ**

A v kompaktnom matrix/vector zápise:

**(dg/dθ) · θ̇**

Preto z požiadavky:

**dg/dt = 0**

dostaneme:

**(dg/dθ) · θ̇ = 0**

Nie je to nový fyzikálny zákon.

Je to iba matematický spôsob vyjadrenia:

**„Pohybuj jointmi tak, aby sa hodnota constraintu nezačala meniť."**

---

## 15. Čo presne predstavuje dg/dθ?

Výraz:

**dg/dθ**

môže pôsobiť abstraktne, ale jeho význam je veľmi praktický.

Hovorí nám, **ktorými smermi je constraint citlivý na pohyb**.

Vráťme sa ku kružnici.

Definujeme:

**g(x,y) = x² + y² − r²**

Potom:

**∂g/∂x = 2x**

a:

**∂g/∂y = 2y**

Takže:

**dg/dq = [2x, 2y]**

Tento vector smeruje radiálne od stredu kružnice von.

To je veľmi zaujímavé.

Constraint nám vlastne hovorí:

„Nesmieš sa pohybovať v smere, ktorý mení tvoju vzdialenosť od stredu."

Radiálny smer by vzdialenosť zmenil.

Dotyčnicový smer ju v prvom okamihu nemení.

Preto povolená velocity musí byť kolmá na vector:

**[2x, 2y]**

A condition:

**[2x, 2y] · [ẋ, ẏ] = 0**

práve vyjadruje kolmosť.

Takže aj geometricky dáva celý vzorec zmysel.

---

## 16. Čo je Jacobian v tomto kontexte?

Ak máme jeden constraint, dg/dθ môžeme chápať ako jeden riadok derivatives.

Ak však máme viac constraints naraz, napríklad:

**g₁(θ) = 0**

**g₂(θ) = 0**

**g₃(θ) = 0**

potrebujeme sledovať, ako sa každý z nich mení vzhľadom na každú configuration variable.

Všetky tieto derivatives usporiadame do jednej matrix.

Táto matrix je **Jacobian constraintov**.

Nemusíš si zatiaľ pamätať jej presnú štruktúru. Dôležitá je intuícia:

**Jacobian nám lokálne hovorí, ako malé pohyby jednotlivých variables ovplyvnia constraints.**

A keď požadujeme:

**Jacobian × velocity = 0**

hovoríme:

**„Nájdi také velocities, ktoré momentálne nemenia žiadny z constraints."**

---

## 17. Čo je Pfaffian velocity constraint?

Aby sme velocity constraints lepšie pochopili, predstav si výťah v 100-poschodovom mrakodrape.

Kabína výťahu sa nachádza napríklad na 50. poschodí. Je mechanicky vedená v pevných vertikálnych koľajniciach. Jej aktuálna configuration q nám hovorí, kde sa práve nachádza.

Teraz sa však nepýtame, kam sa má dostať. Pýtame sa:

**„Akú velocity môže mať práve TERAZ?"**

Výťah môže mať velocity 3 m/s nahor — v poriadku. Môže mať 2 m/s nadol — v poriadku. Môže mať 0 m/s, teda stojí — tiež v poriadku.

Ale teraz mu dajme absurdný príkaz:

**„Maj práve teraz velocity 5 m/s smerom doprava."**

Nie „choď na miesto napravo". Doslova požadujeme, aby vektor jeho okamžitej velocity smeroval cez stenu výťahovej šachty.

A tu nastáva problém. Kabína je stále na úplne normálnom, povolenom mieste. Jej configuration nie je problém. Problémom je jej požadovaná velocity.

Koľajnice jej hovoria:

**„V tejto configuration sa môžeš pohybovať hore alebo dole. Nemôžeš mať velocity smerujúcu bokom."**

Ak by sme bočný velocity constraint ignorovali a fyzicky sa pokúsili vytvoriť takú velocity, výťah sa zázračne nezačne pohybovať cez betónovú stenu. Mechanické vedenie mu v tom zabráni. Namiesto požadovaného pohybu by vznikli obrovské sily medzi kabínou a koľajnicami, konštrukcia by sa namáhala a pri dostatočne extrémnom pôsobení by sa niečo deformovalo alebo poškodilo.

Toto je význam velocity constraintu. Neurčuje primárne:

**„Kde môžeš byť?"**

Určuje:

**„Keď si práve TU, akú okamžitú velocity môžeš fyzicky mať?"**

Teraz z toho spravme matematický zápis. Predstav si, že systém má viac možných smerov pohybu a jeho velocity zapíšeme do vectora:

**q̇**

Potrebujeme matematický spôsob, ktorý povie:

**„Z množstva všetkých velocity vectorov povoľ iba tie, ktoré rešpektujú mechanické obmedzenia systému."**

Na to môžeme použiť:

**A(q) · q̇ = 0**

Takémuto zápisu hovoríme **Pfaffian form**.

**q** je aktuálna configuration.

**q̇** je velocity, ktorú chceme systému dať.

**A(q)** obsahuje informáciu o tom, ktoré zložky velocity sú pri aktuálnej configuration zakázané alebo musia byť navzájom previazané.

Ak:

**A(q) · q̇ = 0,**

velocity constraint rešpektujeme.

Ak:

**A(q) · q̇ ≠ 0,**

požadujeme velocity, ktorá constraint porušuje.

Napríklad pri bode na kružnici sme mali:

**x·ẋ + y·ẏ = 0**

Aj toto je Pfaffian velocity constraint.

Mohli by sme ho zapísať:

**[x, y] · [ẋ, ẏ] = 0**

Tu teda:

**A(q) = [x,y]**

---

## 18. Pfaffian ešte automaticky neznamená nonholonomic

Toto je veľmi dôležitý detail.

Pfaffian neznamená „nonholonomic".

Pfaffian znamená iba:

**„Velocity constraint som zapísala týmto matematickým spôsobom: A(q)·q̇ = 0."**

A potom ešte musíme zistiť, aký constraint sa za tým skrýva.

Výťah: Nemôžeš mať velocity doprava, pretože tam vôbec nemôžeš byť. → **holonomic**

Auto: Nemôžeš mať velocity priamo doprava, ale doprava sa nakoniec dostať môžeš. → **nonholonomic**

Takže si to skús zapamätať cez jednu otázku:

**„Je zakázané MIESTO, alebo iba SPÔSOB POHYBU?"**

Zakázané miesto/configuration → holonomic.

Miesto je možné, ale určitý okamžitý spôsob pohybu nie → nonholonomic.

A oba tieto prípady môžu mať velocity constraint zapísaný ako:

**A(q)·q̇ = 0**

Preto samotné slovo Pfaffian ešte nehovorí, či je constraint holonomic alebo nonholonomic.

Keď teda uvidíš:

**A(q)·q̇ = 0**

ešte nemôžeš povedať:

**„Aha, nonholonomic constraint."**

Pretože aj náš úplne obyčajný bod na kružnici má velocity constraint tohto tvaru.

Lenže pri kružnici vieme, že tento velocity constraint vznikol derivovaním:

**x² + y² = r²**

Čiže za velocity constraintom existuje configuration constraint.

Pri inom systéme môže vyzerať velocity equation veľmi podobne, ale žiadny ekvivalentný configuration constraint za ňou nemusí existovať.

A práve tu sa objavuje **integrability**.

> **DOF hovorí, aké nezávislé configurations môže systém mať. Velocity constraint hovorí, akými okamžitými smermi sa môže configuration práve teraz meniť.**

**INTEGRABLE — výťah**

Nemôže ísť doprava. A zároveň: nikdy sa ani nemôže dostať doprava. Velocity zákaz teda vytvára skutočný zákaz určitých configurations.

**NON-INTEGRABLE — auto**

Nemôže sa práve teraz pohnúť bokom. Ale: manévrovaním sa môže dostať bokom. Velocity zákaz teda neznamená zákaz danej configuration.

---

## 19. Čo slovo integrable skutočne znamená?

Toto býva vysvetlené príliš rýchlo, tak poďme pomaly.

Máme velocity constraint.

Napríklad:

**x·ẋ + y·ẏ = 0**

Predstav si, že sme nikdy nevideli pôvodnú rovnicu kružnice.

Máme iba túto velocity equation.

Teraz sa pýtame:

**„Je toto okamžité pravidlo pohybu iba derivovanou verziou nejakej trvalej podmienky na configuration?"**

Inými slovami:

Existuje nejaká funkcia:

**g(x,y)**

ktorej hodnota musí zostať počas pohybu konštantná?

Pri našom príklade áno.

Všimneme si totiž:

**d/dt(x² + y²) = 2x·ẋ + 2y·ẏ**

Ak:

**x·ẋ + y·ẏ = 0**

potom po vynásobení dvomi:

**2x·ẋ + 2y·ẏ = 0**

Takže:

**d/dt(x² + y²) = 0**

A teraz prichádza kľúčová otázka:

**Čo znamená, že derivácia nejakej veličiny je nula?**

Znamená to, že sa táto veličina s časom nemení.

Ak napríklad:

**df/dt = 0**

potom:

**f = konštanta**

Preto:

**x² + y² = konštanta**

Takže sme z velocity constraintu dokázali zistiť, že počas pohybu zostáva určitá funkcia configuration konštantná.

To je význam slova **integrable**.

Velocity constraint sa dá „poskladať späť" do constraintu na samotnú configuration.

---

## 20. Prečo dostávame g(q) = konštanta a nie vždy g(q) = 0?

Toto je ďalší detail, ktorý sa často preskočí.

Predstav si velocity constraint:

**d/dt g(q(t)) = 0**

Táto equation nehovorí:

**g = 0**

Hovorí:

**g sa nemení.**

Ak mala g na začiatku hodnotu 5, zostane 5.

Ak mala hodnotu 100, zostane 100.

Ak mala hodnotu 0, zostane 0.

Preto integráciou prirodzene dostaneme:

**g(q) = C**

kde C je konštanta určená počiatočnou configuration.

Pri našej kružnici:

**x² + y² = C**

Ak bod začal na kružnici s polomerom r, potom na začiatku:

**C = r²**

a preto počas celého pohybu:

**x² + y² = r²**

Takže velocity constraint sám o sebe môže opisovať celú rodinu kružníc rôznych polomerov.

Konkrétna počiatočná configuration určí, na ktorej z nich zostaneme.

---

## 21. Teraz môžeme konečne pochopiť vzťah holonomic → integrable

Máme holonomic configuration constraint:

**g(q) = 0**

Čo znamená?

Systém musí zostať na množine configurations, kde je g nulové.

Ak sa systém pohybuje, potom musí byť:

**g(q(t)) = 0**

po celý čas.

Keďže g zostáva nulové, jeho časová zmena musí byť nulová:

**dg/dt = 0**

Použitím chain rule získame velocity constraint:

**(dg/dq)·q̇ = 0**

Tento velocity constraint je teda iba **lokálnym pohybovým dôsledkom pôvodného configuration constraintu**.

Hovorí:

**„Keď už si na povolenej množine configurations, pohybuj sa iba takými okamžitými smermi, ktoré ťa z nej nevyhodia."**

A keďže presne vieme, že vznikol z g(q), vieme ho spätne spojiť s:

**g(q) = konštanta**

Preto je **integrable**.

Takže reťazec:

**holonomic configuration constraint**

→ deriváciou dostaneme

**velocity constraint**

→ ktorý je spätne spojený s configuration constraintom

→ preto je

**integrable**

nie je iba séria definícií.

Každá šípka má fyzikálny význam.

---

## 22. Čo by teda bol neintegrable velocity constraint?

Teraz si predstav opačný prípad.

Máme pravidlo:

**A(q)·q̇ = 0**

ktoré presne určuje, ktoré instantaneous velocities sú povolené.

Pokúsime sa však nájsť nejakú funkciu:

**g(q)**

takú, aby constraint v skutočnosti iba hovoril:

**g(q) = konštanta**

A zistíme, že to nejde.

To znamená, že velocity rule nie je iba dôsledkom toho, že systém musí zostať na nejakej nižšie dimenzionálnej množine configurations.

Namiesto toho ide o skutočné obmedzenie **spôsobu pohybu**.

Taký constraint nazývame:

**nonintegrable**

a v tomto kontexte:

**nonholonomic.**

Najlepší príklad je obyčajné auto.

---

## 23. Auto — prečo je také dobré na pochopenie nonholonomic constraintov?

Predstav si auto na obrovskom prázdnom parkovisku.

Jeho jednoduchú configuration môžeme opísať:

**q = (x, y, φ)**

kde:

**x, y** určujú position auta,

a **φ** jeho orientation.

Teraz si predstav configuration, pri ktorej auto stojí o dva metre napravo od súčasného miesta, ale je otočené rovnako.

Je táto configuration fyzicky možná?

Áno.

Auto tam pokojne môže stáť.

Takže neexistuje jednoduchý configuration constraint, ktorý by povedal:

**„Position napravo od auta je zakázaná."**

Ale môže sa auto z aktuálneho miesta **v tomto okamihu** začať pohybovať presne doprava bez toho, aby zmenilo orientation?

Pri normálnych kolesách nie.

Kolesá sa kotúľajú dopredu a dozadu.

Nevykonávajú čisté bočné kotúľanie.

To znamená:

**configuration napravo je povolená, ale okamžitá velocity priamo napravo nie je povolená.**

A toto je úplne iná situácia než korálka na kružnici.

---

## 24. „Nemôžem tam ísť teraz" vs. „nemôžem tam nikdy byť"

Toto je asi najdôležitejší rozdiel celej lekcie.

Pri korálke na kružnici existuje miesto dva metre mimo kružnice.

Korálka tam nemôže byť.

Nie teraz.

Nie o päť sekúnd.

Nie po komplikovanej trajectory.

Ak má zostať na drôte, daná configuration jednoducho nepatrí do jej C-space.

To je holonomic obmedzenie.

Pri aute však miesto napravo nie je zakázané.

Auto sa tam iba nemôže presunúť jedným čistým bočným pohybom.

Môže:

ísť dopredu,

zatočiť,

cúvať,

znovu zatočiť,

vyrovnať sa

a nakoniec skončiť presne vedľa svojho pôvodného miesta.

Paralelné parkovanie je krásny praktický príklad.

Takže pri aute platí:

**„Tento okamžitý smer pohybu nie je dovolený."**

Ale neplatí:

**„Configuration ležiaca týmto smerom je nedosiahnuteľná."**

A práve toto je podstata nonholonomic constraintu.

---

## 25. Čo znamená „rolling without slipping"?

![Minca kotúľajúca sa po rovine bez šmyku](/book/ch2/fig2-11.png)

Doslova:

**rolling** = kotúľanie

**without slipping** = bez šmýkania

Predstav si pneumatiku auta na suchej ceste. Koleso sa otáča a zároveň posúva dopredu.

Keď sa koleso otočí o určitý kus, musí sa zároveň o presne zodpovedajúci kus posunúť dopredu.

Napríklad máš koleso s obvodom 2 metre.

Ak spraví presne jednu celú otočku:

**1 otočka → auto sa posunie 2 metre**

To je rolling without slipping.

Teraz si predstav ľad.

Dupneš na plyn, koleso sa točí, ale auto stojí skoro na mieste.

Koleso teda urobilo napríklad jednu otočku, ale auto sa neposunulo o jeden obvod kolesa.

To je **slipping**.

Opačný príklad je prudké brzdenie. Koleso sa prestane otáčať, ale auto sa stále šmýka po ceste.

Aj to je **slipping**.

**A teraz prečo nás to zaujíma v robotike**

Pri rolling without slipping existuje spojenie medzi rýchlosťou otáčania kolesa a rýchlosťou pohybu robota.

Ak má koleso polomer r a otáča sa angular velocity θ̇, potom:

**v = r · θ̇**

Čiže nemôžeš ľubovoľne povedať:

„Koleso sa bude točiť takto rýchlo, ale robot sa bude pohybovať úplne inou rýchlosťou."

Nie. Ak sa koleso nešmýka, tieto dve velocity musia spolu sedieť.

Ak je koleso alebo minca otočená smerom φ, jej pohyb rozdelíme na x-ovú a y-ovú zložku:

**ẋ = r·θ̇·cos φ**

**ẏ = r·θ̇·sin φ**

Tieto rovnice hovoria, že x-ová a y-ová velocity nie sú ľubovoľné.

Závisia od orientation kolesa aj od jeho rotational velocity.

A to je typický **nonholonomic velocity constraint**.

---

## 26. Prečo rolling constraint automaticky neznižuje DOF?

Pri rolling without slipping je veľmi dôležité rozlišovať medzi tým, aké configurations môže systém mať, a tým, akým spôsobom sa medzi nimi môže pohybovať. Práve preto rolling constraint automaticky neznamená, že systém má menej degrees of freedom (DOF).

Predstavme si obyčajné auto pohybujúce sa po rovnom parkovisku. Jeho configuration môžeme opísať tromi hodnotami **q = (x, y, θ)**. Hodnota x určuje, kde sa auto nachádza v jednom smere, y určuje jeho polohu v druhom smere a θ určuje jeho orientáciu, teda kam je auto natočené. Na opis ľubovoľnej configuration auta teda potrebujeme tri nezávislé hodnoty, a preto hovoríme, že jeho configuration space má **3 DOF**.

Teraz však pridajme podmienku rolling without slipping, teda kotúľanie kolies bez šmýkania. Normálne koleso sa môže ľahko kotúľať dopredu alebo dozadu, ale nemôže sa jednoducho posúvať do boku. Ak auto smeruje dopredu, nemôžeme ho v jednom okamihu posunúť priamo doprava bez toho, aby sa pneumatiky začali šmýkať po ceste. Rolling without slipping teda vytvára velocity constraint — obmedzuje, akú okamžitú velocity môže auto mať.

Na prvý pohľad by sa preto mohlo zdať, že ak sa auto nemôže pohybovať priamo do boku, stratilo jeden DOF. To však nie je správne. Auto sa síce nemôže v jednom okamihu pohybovať priamo bokom, ale stále sa môže dostať na miesto, ktoré leží vedľa neho. Stačí zatočiť, pohnúť sa dopredu alebo dozadu, zmeniť orientáciu a postupne vykonať sériu manévrov. Presne to robíme napríklad pri paralelnom parkovaní. Auto sa nakoniec môže nachádzať o niekoľko metrov viac vpravo alebo vľavo, hoci nikdy neurobilo čistý okamžitý pohyb bokom.

To znamená, že hodnota y stále zostáva súčasťou možných configurations auta. Auto môže skončiť na rôznych hodnotách x, rôznych hodnotách y a s rôznymi hodnotami θ. Rolling constraint teda nehovorí, že určitá configuration je zakázaná. Hovorí iba, že niektoré okamžité smery pohybu sú zakázané.

To je zásadný rozdiel oproti holonomic constraint. Predstavme si napríklad vozík upevnený na rovnej koľajnici. Ak koľajnica leží na y = 0, vozík musí počas celého pohybu spĺňať podmienku y = 0. Nemôžeme žiadnym manévrovaním dosiahnuť configuration, v ktorej bude vozík na y = 5 m. Takýto constraint skutočne odstránil časť možných configurations, a preto môže znížiť počet DOF.

Pri aute s rolling constraintom je situácia iná. Constraint nehovorí „na tomto y nesmieš byť", ale skôr „pri tomto natočení sa týmto smerom nesmieš práve teraz pohybovať". Keď auto zmení svoju orientáciu θ, zmení sa zároveň smer, ktorým sa môže kotúľať. Kombináciou týchto povolených pohybov sa preto dokáže dostať aj do configurations, ktoré nedokáže dosiahnuť jedným priamym pohybom.

Práve preto je rolling constraint typickým príkladom **nonholonomic constraint**. Je to obmedzenie velocity, ktoré vo všeobecnosti nemožno jednoducho integrovať na configuration constraint typu f(q) = 0. Neodstraňuje teda automaticky jednu súradnicu z configuration space.

Najjednoduchšie si rozdiel môžeme zapamätať takto: **holonomic constraint obmedzuje, kde systém môže byť**, zatiaľ čo **nonholonomic rolling constraint obmedzuje, ako sa systém môže pohybovať**. Preto môže mať auto stále 3 DOF — x, y a θ, aj keď v jednom konkrétnom okamihu nemôže mať ľubovoľnú velocity vo všetkých troch smeroch.

---

## 27. Toto je zásadný rozdiel medzi C-space a tangent directions

Predstav si jeden konkrétny bod v configuration space.

Tento bod hovorí:

**„Tu sa robot práve nachádza."**

Pri tomto bode môžeme skúmať možné **instantaneous velocities**.

Tie predstavujú smery, ktorými môže robot z tohto bodu okamžite vyraziť.

Pri holonomic systéme je configuration space už samotný zúžený na povolenú množinu. Povolené velocity directions sú tangent directions tejto množiny.

Pri nonholonomic systéme však môže byť configuration space väčší, ale robot v jednom bode nemá povolené všetky jeho directions.

To ešte neznamená, že ostatné configurations nie sú reachable.

Robot môže najskôr použiť jeden povolený smer, tým zmeniť svoju configuration, čím sa zmenia aj ďalšie povolené directions, potom použiť ďalší atď.

Preto:

**instantaneously unavailable direction**

nemusí znamenať:

**globally unreachable configuration.**

---

## 28. Prečo rolling constraint závisí od cesty?

Pri rolling constraint je dôležité pochopiť, že výsledná configuration systému nezávisí iba od toho, kde sa systém práve nachádza, ale aj od toho, akú trajectory — cestu pohybu — vykonal. Toto je jedna z hlavných vlastností nonholonomic constraints.

Najskôr si to porovnajme s jednoduchým holonomic constraintom. Predstavme si bod, ktorý sa môže pohybovať iba po kružnici s polomerom r. Jeho poloha musí vždy spĺňať rovnicu **x² + y² = r²**. Ak nám niekto ukáže aktuálne hodnoty x a y, okamžite vieme skontrolovať, či je bod na kružnici. Vôbec nás nemusí zaujímať, ako sa na dané miesto dostal. Mohol sa pohybovať po kružnici zľava, sprava alebo ju obísť desaťkrát. Constraint závisí iba od aktuálnej configuration q.

Pri aute s rolling without slipping je situácia iná. Rolling constraint neurčuje jednoduchú geometrickú plochu, na ktorej auto musí zostať. Namiesto toho určuje, aké pohyby sú povolené v každom okamihu. Auto sa napríklad nemôže pohybovať priamo bokom, pretože by sa jeho kolesá museli šmýkať. Môže však ísť dopredu alebo dozadu a zároveň meniť svoju orientáciu.

Preto veľmi záleží na tom, v akom poradí jednotlivé pohyby vykonáme. Predstav si auto na parkovisku. Najskôr zatočíš doľava a ideš dopredu, potom zatočíš doprava a cúvneš. Auto skončí na určitom mieste a s určitou orientáciou. Ak však tie isté typy pohybov vykonáš v inom poradí — napríklad najskôr cúvneš so zatočením a až potom ideš dopredu — môžeš skončiť na úplne inom mieste. Každý jednotlivý pohyb pritom stále rešpektuje rolling without slipping.

To je dôležité, pretože pri nonholonomic systéme sa môžu malé povolené pohyby postupne skombinovať do výsledného pohybu, ktorý priamo vykonať nevieme. Auto sa napríklad nevie jednoducho posunúť o meter doprava ako figúrka na šachovnici. Sériou pohybov dopredu, dozadu a zatáčania sa však nakoniec môže dostať na miesto napravo. Typickým príkladom je paralelné parkovanie — auto sa do parkovacieho miesta dostane konkrétnou trajectory, nie priamym bočným pohybom.

Preto hovoríme, že rolling constraint je **path-dependent**, teda závisí od cesty. Nejde iba o otázku „kde som?", ale aj o to, akú postupnosť povolených pohybov vykonávam. Takýto velocity constraint vo všeobecnosti nedokážeme integrovať na jednu jednoduchú configuration rovnicu **g(q) = konštanta**. Preto je **non-integrable**, a teda **nonholonomic**.

Najjednoduchšie si to môžeš zapamätať takto: **holonomic constraint určuje, KDE môže systém byť; nonholonomic rolling constraint určuje, AKO sa môže pohybovať.** Pri rolling constrainte preto cesta a poradie pohybov skutočne záležia.

---

## 29. Prečo sú nonholonomic constraints dôležité v motion planning?

Motion planning znamená plánovanie pohybu robota z počiatočnej configuration do cieľovej configuration. Nestačí pritom nájsť iba geometrickú cestu, ktorá neprechádza cez prekážky. Robot musí byť zároveň fyzicky schopný túto cestu vykonať. A práve tu sú veľmi dôležité nonholonomic constraints.

Predstavme si mobilného robota s klasickými kolesami alebo obyčajné auto. Robot sa nachádza na parkovisku a chceme ho dostať na voľné miesto napravo. Ak by motion planner ignoroval nonholonomic constraints, mohol by vytvoriť veľmi jednoduchý plán: „posuň sa priamo doprava o dva metre." Z geometrického pohľadu je táto cesta úplne v poriadku. Nie je tam žiadna prekážka a cieľová configuration je dostupná. Problém je, že klasické kolesá sa nemôžu pohybovať priamo bokom bez šmýkania.

Motion planner preto musí vedieť, že robot nemôže vykonať ľubovoľný pohyb v ľubovoľnom smere. Pri rolling without slipping má v každom okamihu povolené iba určité velocities. Ak sa chce dostať doprava, musí napríklad zatočiť, ísť dopredu, zmeniť smer, cúvnuť a následne sa vyrovnať. Výsledkom môže byť presne tá istá cieľová configuration, ale cesta k nej musí rešpektovať možnosti pohybu robota.

Najjednoduchšie si to môžeš zapamätať takto:

**Motion planning sa nepýta iba „Kadial vedie voľná cesta do cieľa?", ale aj „Dokáže sa môj konkrétny robot po tejto ceste skutočne pohybovať?"**

A pri autách, wheeled robots a ďalších nonholonomic systémoch je práve druhá otázka rozhodujúca.

---

## 30. Configuration a velocity nesmieme zamieňať

Pri holonomic a nonholonomic constraints je veľmi dôležité nezamieňať si configuration a velocity. Sú to dve rozdielne veci. Configuration q hovorí, v akom stave alebo polohe sa systém práve nachádza, zatiaľ čo velocity q̇ hovorí, ako sa táto configuration práve mení.

Predstavme si auto pohybujúce sa po rovine. Jeho configuration môžeme zapísať ako **q = (x, y, θ)**. Hodnoty x a y hovoria, kde sa auto nachádza, a θ hovorí, kam je natočené. Jedna konkrétna configuration teda môže byť napríklad: „auto stojí na tomto mieste a je otočené smerom na sever." Configuration sama osebe nehovorí nič o tom, či sa auto práve pohybuje ani akým smerom.

Velocity opisuje niečo iné. Pre rovnaké auto môžeme uvažovať **q̇ = (ẋ, ẏ, θ̇)**. Hodnoty ẋ a ẏ hovoria, ako rýchlo sa mení poloha auta, a θ̇ hovorí, ako rýchlo sa mení jeho orientácia. Dve autá teda môžu mať presne rovnakú configuration (x, y, θ), ale úplne inú velocity. Jedno môže stáť, druhé môže ísť dopredu a tretie môže práve zatáčať.

Tento rozdiel je zásadný pri constraints. Configuration constraint obmedzuje, aké configurations sú vôbec dovolené. Predstav si napríklad bod, ktorý musí zostať na kružnici. Jeho poloha musí vždy spĺňať **x² + y² = r²**. Bod sa teda nemôže nachádzať hocikde v rovine. Constraint priamo odstránil časť možných configurations.

Velocity constraint naopak nemusí zakazovať samotnú configuration. Zakazuje iba určitý okamžitý spôsob pohybu z tejto configuration. Typickým príkladom je opäť auto s podmienkou rolling without slipping. Auto sa môže nachádzať na rôznych miestach x, y a môže mať rôznu orientáciu θ, ale keď je v konkrétnej configuration, jeho kolesá mu nedovoľujú mať ľubovoľnú velocity. Nemôže sa napríklad jednoducho začať šmýkať priamo do boku.

Tu vzniká častý omyl. Ak povieme, že auto nemôže mať velocity doprava, neznamená to, že nemôže byť napravo. To sú dve úplne rozdielne tvrdenia. Auto sa na miesto napravo môže dostať tak, že zatočí, pohne sa dopredu alebo dozadu a vykoná sériu ďalších pohybov. Zakázaná je určitá okamžitá velocity, nie výsledná configuration.

---

## 31. Najlepší mentálny obraz: kružnica vs. auto

Ak si máš zapamätať iba dva príklady, použi tieto.

### Korálka na kružnici

Existuje configuration constraint:

**x² + y² = r²**

Bod mimo kružnice jednoducho nie je povolená configuration.

Constraint teda hovorí:

**„TU môžeš byť a TAM nemôžeš byť."**

Keď ho derivujeme, dostaneme velocity constraint:

**x·ẋ + y·ẏ = 0**

Ten iba zabezpečuje, aby bod pri pohybe zostal na kružnici.

Je integrable, pretože sa vieme vrátiť k:

**x² + y² = konštanta**

Toto je **holonomic** prípad.

---

### Auto

Configuration vedľa auta môže byť úplne povolená.

Auto sa však nemôže okamžite pohnúť čistým bočným smerom.

Musí vykonať sériu forward/backward a turning motions.

Constraint teda nehovorí:

**„Tam nesmieš byť."**

Hovorí:

**„Takýmto spôsobom sa práve teraz nemôžeš pohybovať."**

Toto je typický **nonholonomic** prípad.

---

## 32. Celá logika lekcie bez preskakovania krokov

Začneme configuration variables:

**q**

Tie opisujú configuration robota.

Niekedy nemôžu byť ľubovoľné, pretože mechanika systému vyžaduje:

**g(q) = 0**

Takýto constraint priamo vyberá povolené configurations.

Preto ide o **holonomic configuration constraint**.

Keď sa robot pohybuje:

**q = q(t)**

constraint musí zostať splnený:

**g(q(t)) = 0**

Preto sa hodnota g počas pohybu nesmie meniť:

**dg/dt = 0**

Pomocou chain rule:

**(dg/dq)·q̇ = 0**

Tým vznikne **velocity constraint**.

Tento velocity constraint nám hovorí, ktorými okamžitými smermi sa môžeme pohybovať bez porušenia pôvodného configuration constraintu.

Pretože vieme, že vznikol z g(q), môžeme ho spätne spojiť s:

**g(q) = konštanta**

Je teda **integrable**.

Ale môžeme mať aj velocity constraint:

**A(q)·q̇ = 0**

pri ktorom žiadny ekvivalentný configuration constraint typu:

**g(q) = konštanta**

neexistuje.

Vtedy constraint neobmedzuje configuration space rovnakým spôsobom. Obmedzuje hlavne dostupné instantaneous velocities.

Taký constraint je **nonintegrable**, teda **nonholonomic**.

---

## 33. Rekapitulácia pojmov

- **Configuration** — Aktuálny stav alebo poloha systému.
- **Configuration space (C-space)** — Množina všetkých možných configurations systému.
- **Configuration variables / coordinates** — Čísla používané na opis configuration.
- **Constraint** — Podmienka obmedzujúca configuration alebo motion systému.
- **Loop-closure constraint** — Constraint closed-chain mechanizmu vznikajúci preto, že links musia zostať geometricky spojené.
- **Holonomic constraint** — Constraint, ktorý môžeme vyjadriť priamo pomocou configuration variables, typicky: g(q) = 0. Pri takomto constrainte sú určité configurations priamo nepovolené.
- **q̇** — Velocity configuration coordinates.
- **Velocity constraint** — Constraint určujúci, ktoré instantaneous velocities sú povolené.
- **Jacobian constraintu** — Matrix derivatives, ktorá hovorí, ako malé zmeny configuration variables ovplyvňujú hodnoty constraints.
- **Pfaffian form** — Všeobecný zápis velocity constraintu: A(q)·q̇ = 0
- **Integrable velocity constraint** — Velocity constraint, ktorý možno spätne spojiť s trvalou podmienkou na configuration: g(q) = konštanta
- **Nonintegrable constraint** — Velocity constraint, ktorý takto na configuration constraint previesť nemožno.
- **Nonholonomic constraint** — V tomto kontexte nonintegrable velocity constraint, ktorý obmedzuje spôsob okamžitého pohybu systému bez toho, aby jednoducho odstránil zodpovedajúcu časť configuration space.
- **Rolling without slipping** — Typický zdroj nonholonomic constraints pri kolesových systémoch.

---

## 34. Úplne posledná intuícia

Najväčšia chyba by bola zapamätať si iba:

**holonomic = g(q) = 0**

a:

**nonholonomic = A(q)q̇ = 0**

Pretože to nevysvetľuje podstatu.

Lepšie je rozmýšľať takto.

### Holonomic:

Existuje trvalé geometrické pravidlo hovoriace:

**„Tvoje configurations musia ležať tu."**

Preto sa pri pohybe musíš pohybovať po tejto množine a nesmieš ju opustiť.

Velocity constraint vzniká ako dôsledok tejto geometrickej podmienky.

---

### Nonholonomic:

Configuration nemusí byť zakázaná.

Systém však má mechanické pravidlá hovoriace:

**„Z tejto configuration sa práve teraz môžeš pohnúť iba určitými smermi."**

Keď však vykonáš jeden povolený pohyb, dostaneš sa do novej configuration. Tam sa môžu povolené smery zmeniť. Ich postupným kombinovaním sa tak môžeš dostať aj tam, kam si sa na začiatku nemohla pohnúť priamo.

Preto je auto taký dobrý príklad:

**nemôže sa okamžite posunúť bokom, ale dokáže bokom zmeniť svoju výslednú polohu pomocou manévru.**

A práve v tom spočíva zásadný rozdiel medzi:

**obmedzením configuration**

a

**obmedzením instantaneous motion.**

---

:::summary

Pri robotických systémoch musíme rozlišovať medzi **configuration constraints** a **velocity constraints**. Configuration constraint určuje, ktoré konfigurácie sú fyzicky možné. Velocity constraint určuje, akým spôsobom sa configuration môže v konkrétnom okamihu meniť.

Pri closed-chain mechanisms vznikajú **loop-closure equations**, pretože links musia zostať spojené do uzavretej slučky. Four-bar linkage môžeme napríklad reprezentovať štyrmi joint angles, ale tri nezávislé loop-closure constraints spôsobia, že mechanizmus má iba 1 DOF.

Všeobecný configuration constraint môžeme zapísať:

**g(θ) = 0**

Takýto constraint nazývame **holonomic constraint**. Pri n configuration variables a k nezávislých holonomic constraints má configuration space za bežných podmienok dimenziu:

**n - k**

Keď sa robot pohybuje, jeho configuration zapisujeme ako θ(t). Holonomic constraint musí platiť počas celého pohybu. Derivovaním podľa času dostaneme velocity constraint:

**(dg/dθ) · θ̇ = 0**

Všeobecnejšie môžeme velocity constraints zapisovať v Pfaffian form:

**A(θ) · θ̇ = 0**

Ak tento velocity constraint vznikol derivovaním configuration constraintu a môžeme ho spätne integrovať na vzťah typu g(θ) = konštanta, nazývame ho **integrable**. Práve s takýmito velocity constraints sú spojené holonomic constraints.

Nie každý velocity constraint je však integrable. Pri rolling without slipping môže byť okamžitý pohyb kolesa alebo mince obmedzený bez toho, aby existovala ekvivalentná configuration equation odstraňujúca časť reachable configuration space. Takýto constraint nazývame **nonholonomic** alebo **nonintegrable**.

Najdôležitejší rozdiel preto môžeme vyjadriť veľmi jednoducho:

**Holonomic constraint obmedzuje, kde systém môže byť.**

**Nonholonomic constraint môže namiesto toho obmedzovať, ako sa systém môže pohybovať a ako sa do určitej configuration dostane.**

Auto je najlepším intuitívnym príkladom. Nemôže sa okamžite posunúť bokom, ale vhodnou kombináciou jazdy a zatáčania sa môže dostať na miesto vedľa svojej pôvodnej polohy. Jeho okamžité velocity directions sú obmedzené, ale z toho automaticky nevyplýva zmenšenie dimension jeho reachable configuration space.

A práve toto rozlíšenie medzi configuration a velocity je základom pre ďalšie štúdium robotického pohybu, motion planningu a kinematiky wheeled mobile robots.

:::`;
