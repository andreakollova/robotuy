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

Velocity constraints sa často zapisujú všeobecne ako:

**A(q)·q̇ = 0**

Takémuto zápisu hovoríme **Pfaffian form**.

Najskôr si vysvetlime jednotlivé časti.

**q** je aktuálna configuration.

**q̇** je aktuálna velocity configuration variables.

**A(q)** je matrix, ktorá závisí od toho, kde sa systém práve nachádza, a určuje, ktoré velocity combinations sú povolené.

Celý vzťah teda hovorí:

**„Pri tejto konkrétnej configuration nemôže byť velocity ľubovoľná; musí spĺňať tieto rovnice."**

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

Keď uvidíš:

**A(q)·q̇ = 0**

ešte nemôžeš povedať:

**„Aha, nonholonomic constraint."**

Prečo?

Pretože aj náš úplne obyčajný bod na kružnici má velocity constraint tohto tvaru.

Lenže pri kružnici vieme, že tento velocity constraint vznikol derivovaním:

**x² + y² = r²**

Čiže za velocity constraintom existuje configuration constraint.

Pri inom systéme môže vyzerať velocity equation veľmi podobne, ale žiadny ekvivalentný configuration constraint za ňou nemusí existovať.

A práve tu sa objavuje **integrability**.

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

## 25. Rolling without slipping

![Minca kotúľajúca sa po rovine bez šmyku](/book/ch2/fig2-11.png)

Veľmi typický zdroj nonholonomic constraints je:

**rolling without slipping — kotúľanie bez šmyku.**

Predstav si vertikálne stojacu mincu kotúľajúcu sa po podlahe.

Jej configuration môžeme v modeli opísať napríklad:

**q = (x, y, φ, θ)**

kde:

**x, y** určujú position kontaktu alebo mince v rovine,

**φ** určuje smer, ktorým je minca orientovaná,

**θ** opisuje jej rotáciu pri kotúľaní.

Teraz máme fyzikálnu podmienku:

Minca sa **kotúľa**, ale **nešmýka**.

To znamená, že jej translational motion musí byť konzistentný s tým, ako sa otáča.

Ak má radius r a angular velocity θ̇, prejdená vzdialenosť súvisí s rotáciou.

Pre forward velocity preto dostávame vzťah typu:

**speed = r·θ̇**

Ak je minca otočená smerom φ, forward direction má zložky:

**cos φ**

a

**sin φ**

Preto dostaneme napríklad:

**ẋ = r·θ̇·cos φ**

**ẏ = r·θ̇·sin φ**

Tieto rovnice nám hovoria:

x-ová a y-ová velocity nie sú ľubovoľné.

Závisia od orientation mince aj od jej rotational velocity.

---

## 26. Prečo rolling constraint neznižuje automaticky DOF?

Tu vzniká jedna z najčastejších nejasností.

Povieš si:

„Ak minca nemôže mať ľubovoľnú velocity, tak jej constraints predsa museli znížiť DOF."

Nie nevyhnutne.

V Modern Robotics definujeme **degrees of freedom ako dimension configuration space**.

Teda sa pýtame:

**Koľko nezávislých parameters potrebujeme na určenie configuration systému?**

Nie:

**Koľkými nezávislými smermi sa systém dokáže pohnúť práve teraz?**

To sú dve rozdielne otázky.

Pri minci môže byť configuration space štvorrozmerný:

**(x, y, φ, θ)**

ale v jednom konkrétnom stave nemusia byť všetky štyri velocity directions nezávisle dostupné.

Prečo napriek tomu môžeme časom dosiahnuť veľa configurations?

Pretože dostupné velocity directions sa **menia spolu s configuration**.

Keď minca zmení orientation, zmení sa aj smer, ktorým sa môže následne kotúľať.

Sériou takýchto povolených pohybov dokáže vytvoriť celkovú zmenu, ktorú nedokázala vykonať ako jeden okamžitý pohyb.

Presne ako auto pri parkovaní.

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

Toto je ďalší spôsob, ako pochopiť nonholonomic správanie.

Pri bode na kružnici sa na jeho aktuálne x a y pozrieme a okamžite vieme, či constraint spĺňa:

**x² + y² = r²**

Nezaujíma nás, ako sa tam dostal.

Pri aute alebo rolling coin však výsledný pohyb veľmi závisí od **trajectory**.

Auto môže:

najskôr zatočiť doľava,

potom ísť dopredu,

potom zatočiť doprava,

potom cúvnuť.

Iná postupnosť rovnakých typov pohybov môže viesť do úplne inej konečnej configuration.

To je veľmi odlišné od situácie:

**g(q) = konštanta**

kde máme jednu trvalú geometrickú podmienku platnú vo všetkých okamihoch.

Nonholonomic constraint preto nemôžeme jednoducho nahradiť rovnicou, ktorá by iba rozdelila configuration space na „povolenú plochu" a zvyšok.

Sú nonintegrable, a preto ich označujeme ako nonholonomic.

---

## 29. Holonomic a nonholonomic constraints vedľa seba

Teraz ich môžeme porovnať naozaj presne.

### Holonomic constraint

Existuje constraint na samotnú configuration:

**g(q) = 0**

Stačí sa pozrieť na aktuálne q a vieme, či je configuration povolená.

Constraint odstráni určité configurations z C-space.

Príklady:

bod pripútaný ku kružnici,

closed-chain linkage,

konštantná vzdialenosť medzi bodmi rigid body.

Jeho časovou deriváciou vznikne velocity constraint.

Tento velocity constraint je spätne spojený s configuration constraintom, preto je integrable.

---

### Nonholonomic constraint

Máme obmedzenie velocity:

**A(q)·q̇ = 0**

ale nemožno ho vo všeobecnosti nahradiť ekvivalentným constraintom:

**g(q) = 0**

na samotnú configuration.

Constraint teda predovšetkým obmedzuje, aké instantaneous motions môže systém vykonať.

Príklady:

rolling without slipping,

car-like robot,

mnohé wheeled mobile robots.

Systém môže vhodnou sekvenciou povolených pohybov dosiahnuť configurations, ku ktorým nemá priamu instantaneous velocity.

---

## 30. Prečo samotné A(q)·q̇ = 0 nestačí na rozhodnutie?

Predstav si, že ti niekto ukáže iba:

**A(q)·q̇ = 0**

A opýta sa:

„Je to holonomic alebo nonholonomic?"

Z tvaru samotného to nevieme.

Prečo?

Pretože rovnaký typ velocity equation môžeme dostať v oboch prípadoch.

Pri kružnici je velocity constraint dôsledkom configuration constraintu.

Pri rolling wheel môže byť velocity constraint nonintegrable.

Musíme teda skúmať jeho pôvod alebo integrability.

Pýtame sa:

**Existuje taká funkcia g(q), že tento velocity constraint vyjadruje zachovanie g(q) = konštanta?**

Ak áno, je integrable.

Ak nie, je nonintegrable.

Toto je matematická podstata rozdielu.

---

## 31. Prečo sú nonholonomic constraints dôležité v motion planning?

Predstav si dve bodky na mape:

štart A,

cieľ B.

Ak máme robot, ktorý sa dokáže ľubovoľne posúvať v x aj y, môžeme nájsť collision-free path a robot ju môže približne sledovať.

Pri aute to nestačí.

Môže existovať nádherná krátka geometrická cesta, ktorá vedie priamo bokom.

Lenže auto ju fyzicky nedokáže vykonať.

Motion planner preto nemôže riešiť iba:

**„Kde nie sú prekážky?"**

Musí riešiť aj:

**„Aké trajectories dokáže tento konkrétny systém vykonať vzhľadom na svoje kinematické constraints?"**

Preto je plánovanie pohybu auta zásadne iné než plánovanie pohybu všesmerového robota.

Nonholonomic constraints teda nie sú iba teoretická matematická zaujímavosť.

Pri mobilnej robotike priamo určujú, aké trajectories sú realizovateľné.

---

## 32. Configuration a velocity nesmieme zamieňať

Ak sa v celej lekcii stratíš, vráť sa k týmto dvom otázkam.

### Configuration

**„Kde alebo v akom stave sa systém nachádza?"**

Pri aute napríklad:

**x, y, orientation**

Pri robotickom ramene:

**joint angles**

---

### Velocity

**„Ako sa táto configuration práve teraz mení?"**

Pri aute:

ako rýchlo sa mení x,

ako rýchlo y,

ako rýchlo orientation.

Pri ramene:

ako rýchlo sa jednotlivé joints otáčajú.

---

Constraint môže obmedzovať configuration.

Alebo môže obmedzovať velocity.

A to nie je to isté.

---

## 33. Najlepší mentálny obraz: kružnica vs. auto

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

## 34. Celá logika lekcie bez preskakovania krokov

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

## 35. Rekapitulácia pojmov

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

## 36. Úplne posledná intuícia

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
