// Chapter 2.5 – Lekcia 8: Task Space and Workspace
// Full lesson content - DO NOT SHORTEN

export const ch25Content = `# Lekcia 8: Task Space and Workspace

Doteraz sme sa v Chapter 2 pozerali najmä na **configuration space (C-space)**. Ten opisuje celý robot — teda všetky možné konfigurácie všetkých jeho pohyblivých častí. Ak má napríklad robotické rameno sedem rotačných kĺbov, jeho konfiguráciu môžeme opísať siedmimi uhlami kĺbov. Jeden bod v jeho C-space teda hovorí, ako je nastavený celý robot.

Pri reálnej úlohe nás však často nezaujíma každý jeden kĺb.

Ak má robot uchopiť pohár, nemusí nás primárne zaujímať, či je jeho druhý kĺb otočený o 30° alebo 50°. Zaujíma nás najmä to, kde sa nachádza gripper a ako je natočený. Ak robot píše perom na papier, zaujíma nás poloha špičky pera. Ak strieka farbu na karosériu, zaujíma nás poloha trysky a smer, ktorým strieka.

Práve preto zavádzame dva nové pojmy:

**task space** — priestor, v ktorom prirodzene opisujeme úlohu robota,

a

**workspace** — priestor konfigurácií end-effectora, ktoré konkrétny robot skutočne dokáže dosiahnuť.

Znejú podobne, ale opisujú dve rozdielne veci.

---

:::recap

## 01. Od celého robota k tomu, čo nás pri úlohe skutočne zaujíma

Predstav si robotické rameno s gripperom na konci.

Jeho configuration space opisuje celý mechanizmus. Ak má rameno napríklad šesť rotačných kĺbov, potrebujeme poznať:

**θ1, θ2, θ3, θ4, θ5, θ6**

aby sme vedeli, v akej konfigurácii sa robot nachádza.

Lenže teraz robotovi zadáme jednoduchú úlohu:

**„Presuň gripper na toto miesto."**

V tej chvíli nás nemusí zaujímať konkrétne nastavenie každého kĺbu. Úlohu môžeme vyjadriť jednoducho pomocou polohy grippera:

**x, y, z**

Ak navyše záleží aj na tom, ako je gripper natočený, pridáme jeho orientáciu.

Tým sme sa prestali pýtať:

**„Ako je nastavený celý robot?"**

a začali sme sa pýtať:

**„Kde má byť jeho end-effector a ako má byť orientovaný?"**

A práve tento rozdiel je základom pre pochopenie task space.

:::

---

## 02. Čo je Task Space?

**Task space** je priestor, v ktorom môžeme prirodzene opísať úlohu, ktorú má robot vykonať.

Dôležité je slovo **úloha**.

Task space teda neurčujeme podľa toho, koľko má robot kĺbov. Určujeme ho podľa toho, aké informácie sú potrebné na opis výsledku, ktorý od robota chceme.

Predstav si napríklad robotické rameno, ktoré drží pero a kreslí na papier položený na stole.

Ak nás zaujíma iba to, kde sa špička pera nachádza na papieri, potrebujeme dve hodnoty:

- x — poloha doľava/doprava
- y — poloha dopredu/dozadu

Task space je preto dvojrozmerný priestor, ktorý môžeme zapísať ako:

**R2**

V tomto prípade nepotrebujeme opisovať všetky uhly robotických kĺbov. Dokonca nás nemusí zaujímať ani kompletná orientácia pera. Pre samotnú úlohu kreslenia môže byť podstatné iba to, kde sa špička pera nachádza na ploche papiera.

To je základná myšlienka task space:

**Task space obsahuje tie informácie, ktoré potrebujeme na opis úlohy — nie nevyhnutne všetky informácie o robotovi.**

---

## 03. Task space závisí od úlohy, nie od konštrukcie robota

Toto je jeden z najdôležitejších bodov celej sekcie.

Predstav si, že máme stále toho istého robota, ale zmeníme jeho úlohu.

Najskôr má robot iba ukázať laserom na určitý bod na stene. V takom prípade nás môže zaujímať hlavne smer, ktorým laser ukazuje.

Potom tomu istému robotovi dáme do ruky predmet a chceme, aby ho presne položil do krabice. Teraz už potrebujeme poznať nielen polohu predmetu, ale aj jeho orientáciu.

Robot sa nezmenil.

Jeho joints sa nezmenili.

Jeho C-space sa nezmenil.

Ale zmenila sa úloha — a preto sa môže zmeniť task space.

Preto kniha zdôrazňuje, že definícia task space je **driven by the task**. Rozhodujeme sa podľa toho, čo je pre danú úlohu podstatné.

---

## 04. Keď robot manipuluje predmetom

Veľmi častou úlohou robota je manipulácia s predmetmi.

Predstav si priemyselné rameno, ktoré uchopí súčiastku. Ak ju má správne vložiť do stroja, nestačí vedieť iba to, kde sa súčiastka nachádza. Musíme vedieť aj to, ako je natočená.

Rigid body vo voľnom trojrozmernom priestore má šesť stupňov voľnosti:

- tri opisujú jeho polohu: **x, y, z**
- a ďalšie tri opisujú jeho orientáciu.

Preto je pri všeobecnej manipulácii prirodzené definovať task space ako priestor všetkých možných polôh a orientácií end-effectora.

V praxi si môžeme predstaviť, že na gripper robota pripevníme malý coordinate frame. Task space potom opisuje configuration tohto frame — kde sa nachádza a ako je natočený.

Toto je v Modern Robotics považované za **štandardný alebo defaultný pohľad na task space**.

---

## 05. Nie vždy potrebujeme všetkých šesť stupňov voľnosti

To, že end-effector môže mať šesť stupňov voľnosti, ešte neznamená, že ich musí obsahovať každá úloha.

Predstav si robot, ktorý strieka farbu na karosériu auta.

Potrebujeme vedieť, kde je tryska: **x, y, z**

Potrebujeme tiež vedieť, ktorým smerom tryska mieri.

Ale je dôležité, ako je tryska otočená okolo svojej vlastnej osi?

Vo väčšine prípadov nie.

Ak tryska stále mieri rovnakým smerom na karosériu, jej otočenie okolo osi striekania nemusí zmeniť výsledok.

Pre túto úlohu teda nepotrebujeme všetkých šesť parametrov rigid body. Stačí nám:

**3 DOF pre position + 2 DOF pre direction = 5 DOF.**

Task space spray-painting robota preto môžeme opísať ako:

**R3 x S2**

R3 predstavuje všetky možné polohy trysky v priestore a S2 všetky možné smery, ktorými môže tryska mieriť.

**Zaujímavosť: robot môže mať 6 DOF, ale úloha iba 5 DOF**

Toto je pekný príklad toho, prečo nemáme zamieňať C-space s task space. Robot môže mať šesť nezávislých joint variables, ale samotná úloha nemusí potrebovať všetkých šesť.

---

## 06. Laser pointer — ešte jednoduchší príklad

Predstav si robotické rameno, ktoré drží laser pointer.

Úlohou nie je dostať laser na konkrétnu position v priestore. Predpokladajme, že nás zaujíma iba:

**Kam laser ukazuje?**

Smer v trojrozmernom priestore môžeme reprezentovať bodom na povrchu jednotkovej gule. Preto je prirodzeným task space:

**S2**

Prečo iba dva stupne voľnosti?

Pretože smer môžeme určiť napríklad dvomi uhlami. Tretia rotácia — otočenie laserového ukazovadla okolo vlastnej osi — nemení smer lúča.

A opäť vidíme:

**task space obsahuje iba to, čo je relevantné pre task.**

---

## 07. Čo je Workspace?

Teraz prichádza druhý pojem.

Task space hovorí, ako prirodzene opisujeme úlohu.

**Workspace** hovorí:

**Kam sa end-effector konkrétneho robota dokáže reálne dostať?**

Workspace je teda množina configurations end-effectora, ktoré existujú pre aspoň jednu configuration celého robota.

Predstav si robotické rameno pripevnené k stolu. Jeho links majú určitú dĺžku a joints majú určitý rozsah pohybu. Rameno preto nedosiahne na ľubovoľné miesto v miestnosti.

Miesta, ktoré dosiahnuť môže, tvoria jeho **workspace**.

---

## 08. Jednoduchý príklad — 2R robotické rameno

![Workspaces rôznych robotov](/book/ch2/fig2-12.png)

Predstav si planar robot s dvoma rotačnými joints:

- R — revolute joint
- R — revolute joint

Preto ho označujeme ako **2R robot**.

Obidva links sa pohybujú v rovine.

Ak nás zaujíma iba poloha špičky druhého linku, end-effector môžeme opísať dvomi hodnotami:

**x, y**

Robot však nemôže dosiahnuť ľubovoľný bod roviny. Dosah závisí od dĺžok jeho links.

Ak má napríklad každý link dĺžku 3, maximálna vzdialenosť špičky od base je:

**3 + 3 = 6**

Pri plnom rozsahu kĺbov môže špička dosahovať body v oblasti určenej geometriou týchto dvoch links.

Táto dosiahnuteľná oblasť je jeho **workspace**.

Dôležité teda je:

- **R2** opisuje celú rovinu.
- **Workspace** obsahuje iba tú časť roviny, ktorú end-effector skutočne dosiahne.

---

## 09. Task space a workspace teda nie sú to isté

Predstav si robota, ktorý má kresliť na veľkú tabuľu.

Úloha môže byť prirodzene definovaná pomocou polohy:

**x, y**

Task space teda predstavuje plochu, na ktorej by sme chceli vedieť zadávať body.

Robot však môže mať krátke rameno.

Niektoré body tabule dosiahne a iné nie.

Preto môže existovať bod v task space, ktorý sa nachádza mimo workspace robota.

To je veľmi dôležitý rozdiel:

**Task space = čo požaduje úloha.**

**Workspace = čo dokáže robot.**

Kniha preto hovorí, že task space je primárne určený **taskom**, zatiaľ čo workspace je primárne určený **štruktúrou robota**.

---

## 10. Každý bod workspace musí byť dosiahnuteľný

Z definície workspace vyplýva jednoduché pravidlo:

**Ak niečo nazývame workspace robota, každý bod v tomto priestore musí byť dosiahnuteľný aspoň jednou configuration robota.**

V task space to neplatí.

Task space môže obsahovať configurations end-effectora, ktoré by boli pre danú úlohu zmysluplné, ale konkrétny robot ich nedokáže dosiahnuť.

Predstav si opäť tabuľu.

Task space môže zahŕňať celú tabuľu.

Robot však možno dosiahne iba jej ľavú polovicu.

Ľavá polovica sa nachádza v jeho **workspace**.

Pravá polovica patrí do priestoru, v ktorom vieme úlohu definovať, ale konkrétny robot ju tam nedokáže vykonať.

---

## 11. C-space a workspace sú úplne odlišné pohľady na robota

Toto je ďalší rozdiel, ktorý sa veľmi ľahko pomýli.

**C-space** opisuje configuration celého robota.

**Workspace** opisuje dosiahnuteľné configurations jeho end-effectora.

Predstav si 7-joint robotické rameno.

Jeho configuration môže byť:

**θ1, θ2, θ3, θ4, θ5, θ6, θ7**

Takže robot má **7-dimensional C-space**.

End-effector vo fyzickom 3D priestore však môže mať maximálne šesť nezávislých parametrov:

**3 pre position + 3 pre orientation.**

Ak ti teda poviem presnú position a orientation grippera, stále nemusím vedieť, ako je nastavených všetkých sedem joints.

Robot môže mať viacero rôznych configurations, ktoré umiestnia gripper na presne rovnaké miesto a s rovnakou orientáciou.

---

## 12. Jeden bod workspace môže zodpovedať viacerým configurations robota

Predstav si svoju ruku.

Polož dlaň na jedno konkrétne miesto na stole.

Aj keď dlaň zostáva na rovnakom mieste, často dokážeš meniť polohu lakťa. Celá ruka teda mení svoju configuration, ale end-effector — v tomto prípade dlaň — môže zostať na rovnakom mieste.

V robotike môže nastať presne to isté.

Môžeme mať:

- **configuration A** → rovnaká poloha end-effectora
- **configuration B** → rovnaká poloha end-effectora
- **configuration C** → rovnaká poloha end-effectora

Preto jeden bod workspace nemusí jednoznačne určovať configuration robota.

A toto bude neskôr veľmi dôležité pri **inverse kinematics** — keď poznáme požadovanú configuration end-effectora a hľadáme joint values, ktoré ju vytvoria.

---

## 13. Dva roboty môžu mať rozdielny C-space, ale rovnaký workspace

V podklade je veľmi dobrý príklad.

Máme **planar 2R robot** s dvoma links, pričom každý má dĺžku 3.

A potom **planar 3R robot** s tromi links, pričom každý má dĺžku 2.

Prvý robot má dva revolute joints, takže jeho C-space má **2 DOF**.

Druhý má tri revolute joints, takže jeho C-space má **3 DOF**.

Ich C-spaces sú teda rozdielne.

Ak však sledujeme iba Cartesian position špičky a ignorujeme orientation, oba roboty môžu mať **rovnaký workspace**.

Prečo?

Pretože maximálny dosah oboch je:

- 2R robot: 3 + 3 = **6**
- 3R robot: 2 + 2 + 2 = **6**

Pri konfiguráciách uvedených v podklade dokážu ich špičky pokryť rovnakú planar oblasť.

To znamená:

**Rozdielna vnútorná konštrukcia robota nemusí znamenať rozdielny workspace.**

Roboty môžu mať úplne iný počet joints a iný C-space, ale ich end-effectory môžu dosahovať rovnakú oblasť.

---

## 14. A naopak — rovnaký C-space neznamená rovnaký workspace

Teraz obrátime situáciu.

Môžeme mať dva 2R roboty.

Oba majú dva revolute joints.

Ak ignorujeme joint limits, ich C-space má rovnakú topológiu:

**S1 x S1 = T2**

Napriek tomu môžu mať úplne rozdielny workspace.

Jeden 2R robot sa môže pohybovať v rovine. Jeho špička teda vytvára **planar workspace**.

Druhý môže mať osi joints usporiadané tak, že jeho špička sa pohybuje po povrchu gule.

C-space môže byť rovnaký — stále nastavujeme dva angles.

Ale fyzický pohyb end-effectora je iný.

Preto:

**C-space nám sám o sebe nepovie, aký tvar bude mať workspace.**

Workspace závisí aj od geometrie a konštrukcie robota.

---

## 15. Robot môže meniť orientation bez zmeny position

Zaujímavým príkladom z knihy je **3R wrist mechanism**.

Má tri revolute joints a ich osi sa pretínajú v jednom spoločnom bode — v špičke mechanizmu.

Keď joints otáčame, end-effector môže meniť svoju **orientation**.

Jeho **position** však zostáva stále rovnaká.

Predstav si guľový kĺb zápästia. Ruku môžeš rôzne natáčať, pričom určitý bod v strede kĺbu zostáva na rovnakom mieste.

Pre tento robot by preto nedávalo veľký zmysel definovať workspace iba ako množinu Cartesian positions. Výsledkom by bol prakticky jediný bod.

Oveľa užitočnejšie je definovať workspace pomocou **orientations**, ktoré dokáže end-effector dosiahnuť.

V podklade je tento orientation workspace opísaný ako:

**S2 x S1**

Zatiaľ čo C-space samotného 3R mechanizmu je:

**T3**

Opäť teda vidíme, že C-space a workspace nie sú tá istá vec.

---

## 16. Workspace nemusí vždy znamenať iba „oblasť v priestore"

Keď sa povie workspace, ľahko si predstavíme iba fyzickú oblasť okolo robota:

**„Sem robot dosiahne a sem už nie."**

To je síce veľmi časté použitie, ale definícia môže byť širšia.

Workspace môže opisovať napríklad:

- reachable positions,
- reachable orientations,
- alebo kombináciu position a orientation.

Záleží na tom, čo sa používateľ rozhodne sledovať.

Aj samotný podklad upozorňuje, že pri task space aj workspace môžeme niektoré freedoms end-effectora zámerne ignorovať, ak pre nás nie sú dôležité.

---

## 17. SCARA robot — veľmi praktický príklad

![SCARA robot](/book/ch2/fig2-13.png)

**SCARA** je typ robota často používaný pri pick-and-place úlohách — napríklad keď treba zobrať súčiastku z dopravníka a položiť ju na iné miesto.

Robot v podklade má štruktúru:

**R — R — R — P**

teda tri revolute joints a jeden prismatic joint.

Preto ide o **RRRP open chain**.

Configuration jeho end-effectora môžeme opísať pomocou štyroch parametrov:

- x, y, z — Cartesian position,
- φ — orientation end-effectora v x-y rovine.

Typický task space preto môžeme zapísať:

**R3 x S1**

R3 reprezentuje position v priestore a S1 jednu rotačnú freedom.

Pri SCARA však môžeme workspace definovať jednoduchšie — iba ako množinu reachable Cartesian positions:

**x, y, z**

Prečo môžeme orientation vynechať?

Pretože podľa príkladu z podkladu môže SCARA v každom reachable bode dosiahnuť všetky potrebné hodnoty φ. Ak teda chceme hlavne vizualizovať, kam robot fyzicky dosiahne, stačí nám jeho priestor polôh.

---

## 18. Spray-painting robot — prečo task space nemusí mať 6 DOF

![Spray-painting robot](/book/ch2/fig2-14.png)

V podklade máme ešte jeden veľmi dobrý príklad: klasický **6R industrial manipulator**, na ktorého koniec pripevníme paint spray nozzle.

Robot má šesť revolute joints.

Pri spray paintingu však nepotrebujeme úplnú 6-DOF configuration trysky.

Potrebujeme vedieť:

- kde sa tryska nachádza
- a ktorým smerom strieka farbu.

Position vyžaduje tri coordinates: **x, y, z**

Smer môžeme opísať dvomi angles: **θ, φ**

Dohromady teda task potrebuje **5 DOF**.

Rotácia trysky okolo vlastnej osi nie je pre túto úlohu dôležitá, preto ju do task space nemusíme zahrnúť.

Task space teda môžeme zapísať:

**R3 x S2**

Workspace potom môžeme definovať dvoma spôsobmi.

Môžeme sledovať všetky reachable kombinácie position + direction, teda časť priestoru R3 x S2.

Ale ak chceme jednoduchšiu vizualizáciu, môžeme workspace definovať iba ako množinu reachable Cartesian positions v R3.

Obidve definície môžu byť užitočné — záleží na tom, čo práve potrebujeme analyzovať.

---

## 19. C-space, Task Space a Workspace vedľa seba

Teraz už môžeme tieto tri pojmy jasne oddeliť.

**Configuration Space — C-space**

Opisuje celý robot.

Pýtame sa: **„V akej konfigurácii je celý mechanizmus?"**

Pri robotickom ramene sú to typicky hodnoty všetkých joint variables.

**Task Space**

Opisuje to, čo je dôležité pre úlohu.

Pýtame sa: **„Aké informácie potrebujem na opis toho, čo má robot urobiť?"**

- Pri kreslení to môže byť x, y.
- Pri manipulácii predmetu position + orientation.
- Pri laser pointeri iba direction.
- Pri spray paintingu position + direction.

**Workspace**

Opisuje to, čo end-effector konkrétneho robota dokáže dosiahnuť.

Pýtame sa: **„Ktoré z týchto polôh alebo orientácií sú pre tento robot reálne reachable?"**

Workspace teda závisí hlavne od geometrie robota, dĺžky links, usporiadania joints a ich rozsahov.

---

## 20. Jednoduchý spôsob, ako si tieto pojmy nepomýliť

Predstav si, že robot má namaľovať bod na stene.

**C-space:** Ako musia byť nastavené všetky joints robota?

**Task space:** Ako prirodzene opíšeme požadovaný výsledok? Napríklad bod na stene pomocou x a y.

**Workspace:** Na ktoré body steny robot skutočne dosiahne?

Takže veľmi zjednodušene:

- **C-space = robot**
- **Task space = úloha**
- **Workspace = dosah robota**

Toto nie sú presné matematické definície, ale ako mentálna pomôcka fungujú veľmi dobre.

---

## 21. Prečo je tento rozdiel v robotike taký dôležitý?

Pretože pri programovaní robota často rozmýšľame v task space, zatiaľ čo samotný robot sa musí pohybovať vo svojom C-space.

Operátor môže povedať:

**„Chcem gripper sem."**

To je požiadavka v task space.

Robot však potrebuje zistiť:

**„Aké joint angles ma tam dostanú?"**

To znamená nájsť vhodný bod v C-space.

A ešte predtým musí byť splnená jedna zásadná podmienka:

**požadovaná configuration end-effectora musí ležať vo workspace robota.**

Ak neleží, neexistuje žiadne nastavenie joints, ktoré by ju dosiahlo.

Práve na tomto rozdiele neskôr stoja témy ako **forward kinematics**, **inverse kinematics**, **motion planning** či **robot control**.

---

## 22. Najdôležitejšia myšlienka celej lekcie

Robot má svoj configuration space, ktorý opisuje všetky možné konfigurácie celého mechanizmu.

Keď však robotovi zadávame úlohu, väčšinou nepotrebujeme opisovať celý robot. Potrebujeme opísať výsledok, ktorý chceme dosiahnuť. Na to používame **task space**.

A konkrétny robot nedokáže dosiahnuť všetko, čo by sme teoreticky mohli v task space požadovať. Množina toho, čo jeho end-effector skutočne dokáže dosiahnuť, tvorí **workspace**.

Preto si zapamätaj hlavne tento rozdiel:

**Task space** hovorí, čo potrebujeme opísať pre danú úlohu.

**Workspace** hovorí, čo konkrétny robot dokáže dosiahnuť.

**C-space** hovorí, ako môže byť nakonfigurovaný celý robot.

A medzi nimi nemusí existovať vzťah jedna ku jednej. Viacero rôznych configurations robota môže vytvoriť rovnakú configuration end-effectora a niektoré body task space nemusia byť pre daný robot dosiahnuteľné vôbec.

---

:::summary

**Configuration space (C-space)** opisuje celý robot — všetky možné konfigurácie všetkých jeho pohyblivých častí. **Task space** opisuje to, čo je dôležité pre úlohu — napríklad position a orientation end-effectora. **Workspace** je množina konfigurácií end-effectora, ktoré konkrétny robot skutočne dokáže dosiahnuť.

Task space závisí od úlohy, nie od konštrukcie robota. Ten istý robot môže mať rôzny task space pri rôznych úlohách. Pri kreslení na papier stačí **R2**. Pri manipulácii predmetom potrebujeme position + orientation. Pri spray paintingu stačí position + direction, teda **R3 x S2**.

Workspace závisí od konštrukcie robota — od dĺžky links, usporiadania joints a ich rozsahov. Dva roboty s rozdielnym C-space môžu mať rovnaký workspace a naopak.

Jeden bod workspace môže zodpovedať viacerým configurations robota. To bude neskôr dôležité pri **inverse kinematics**.

Najdôležitejší rozdiel:

- **C-space = celý robot**
- **Task space = čo požaduje úloha**
- **Workspace = čo robot skutočne dosiahne**

A medzi nimi nemusí existovať vzťah jedna ku jednej.

:::`;
