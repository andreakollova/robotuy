// Chapter 3.2.3 – Exponential Coordinates of Rotation (Part 2 of 2)
// Full lesson content - DO NOT SHORTEN

export const ch323p2Content = `# Chapter 3.2.3 – Exponential Coordinates of Rotation

## Part 2 of 2

V prvej časti sme riešili situáciu, v ktorej sme rotation už poznali v pomerne intuitívnej podobe. Mali sme **rotation axis omega-hat** a **rotation angle θ**. Napríklad sme mohli povedať: „otoč teleso o 60° okolo tejto osi." Z týchto údajov sme vytvorili exponential coordinates **omega-hat θ** a pomocou matrix exponential, respektíve Rodrigues' formula, sme vypočítali rotation matrix R.

Teraz sa dostávame k opačnému problému, ktorý je v robotike rovnako dôležitý. Predstav si robotické rameno, ktorého gripper sa už nachádza v určitej orientation. Z forward kinematics alebo zo senzora dostaneme rotation matrix R. Deväť čísel v tejto matrix presne opisuje orientation grippera, ale na prvý pohľad z nich nemusí byť jasné, **aká jednoduchá rotation tejto orientation zodpovedá**. Chceli by sme teda zistiť: okolo akej osi by sme teleso otočili a o aký angle, aby sme dostali práve túto orientation?

Matematicky chceme obrátiť proces z prvej časti. Predtým sme poznali **omega-hat a θ** a hľadali R. Teraz poznáme **R a hľadáme omega-hat a θ**. Operácia, ktorá nám umožňuje ísť týmto opačným smerom, sa nazýva **matrix logarithm**.

---

## 1. Matrix exponential a matrix logarithm riešia opačné problémy

Najjednoduchšie je predstaviť si celý proces ako dve cesty medzi dvoma rôznymi spôsobmi opisu tej istej rotation.

Na jednej strane máme **rotation matrix R**. Tá je veľmi praktická pri výpočtoch, skladaní rotations a transformovaní vectors medzi reference frames. Na druhej strane máme **axis-angle representation**: unit vector omega-hat určujúci rotation axis a angle θ určujúci veľkosť rotation.

Ak poznáme axis a angle, používame matrix exponential:

**[omega-hat]θ - matrix exponential - R**

čo zapisujeme:

**R = e^[omega-hat]θ**

Matrix **[omega-hat]** je skew-symmetric matrix vytvorená z vectora omega-hat. Súčin **[omega-hat]θ** teda obsahuje rovnakú informáciu ako exponential coordinate vector **omega-hat θ**, iba zapísanú v matrix forme.

V tejto lekcii chceme vykonať opačný proces:

**R - matrix logarithm - [omega-hat]θ**

čiže:

**[omega-hat]θ = log(R)**

Predstav si napríklad gripper robotického ramena. Controller pozná jeho aktuálnu orientation a požadovanú orientation. Z týchto orientations môžeme vytvoriť relative rotation matrix, ktorá hovorí, ako sa musí gripper natočiť. Matrix logarithm potom umožní túto relative rotation preložiť do omnoho intuitívnejšej informácie: **otoč sa okolo určitej osi o určitý angle**.

Nejde teda iba o matematickú operáciu navyše. Matrix logarithm nám umožňuje prejsť od reprezentácie orientation k reprezentácii rotation, ktorá túto orientation vytvára.

---

## 2. Čo presne sa snažíme z R zistiť

Máme rotation matrix:

**R ∈ SO(3)**

a hľadáme takú unit axis omega-hat a angle θ, aby platilo:

**R = e^[omega-hat]θ**

Z prvej časti už vieme, že matrix exponential môžeme pre rotations vypočítať pomocou Rodrigues' formula:

**R = I + sin θ [omega-hat] + (1 - cos θ)[omega-hat]²**

Tento vzorec je teraz veľmi dôležitý, pretože v ňom vidíme, **kde sú v rotation matrix ukryté informácie o θ a omega-hat**.

Máme v ňom identity matrix I, člen obsahujúci **sin θ [omega-hat]** a člen obsahujúci **(1 - cos θ)[omega-hat]²**. Naším cieľom je tieto informácie z R postupne oddeliť. Najprv zistíme angle θ a až potom axis omega-hat.

Prečo začíname angle? Pretože existuje veľmi jednoduchá vlastnosť rotation matrix, z ktorej vieme θ získať bez toho, aby sme už poznali axis. Tou vlastnosťou je **trace matrix**.

---

## 3. Trace matrix a prečo nás zaujíma

Trace matrix je jednoduchá operácia. Vezmeme entries ležiace na hlavnej diagonále a spočítame ich.

Ak máme všeobecnú matrix:

$$R =$$
$$[ r11  r12  r13 ]$$
$$[ r21  r22  r23 ]$$
$$[ r31  r32  r33 ]$$

potom:

**tr(R) = r11 + r22 + r33**

Samotný trace nie je rotation angle. Je to iba jedno číslo získané z matrix. Pri rotation matrices má však veľmi užitočnú vlastnosť: závisí od rotation angle θ, ale nie od konkrétneho smeru rotation axis.

Platí:

**tr(R) = 1 + 2 cos θ**

To je presne to, čo potrebujeme. Ak trace závisí iba od θ, môžeme najprv z R zistiť angle bez toho, aby sme už poznali omega-hat.

Aby však tento vzťah nevyzeral ako ďalší vzorec, ktorý treba iba prijať, odvodíme si ho z Rodrigues' formula.

---

## 4. Prečo platí tr(R) = 1 + 2 cos θ

Začneme tým, čo už poznáme:

**R = I + sin θ [omega-hat] + (1 - cos θ)[omega-hat]²**

Teraz chceme vypočítať trace celej pravej strany. Môžeme sa preto pozrieť na každý z troch členov samostatne.

Prvý člen je identity matrix I:

$$[ 1  0  0 ]$$
$$[ 0  1  0 ]$$
$$[ 0  0  1 ]$$

Na diagonále sú tri jednotky, takže:

**tr(I) = 3**

Druhý člen obsahuje skew-symmetric matrix [omega-hat]. Každá 3 x 3 skew-symmetric matrix má na hlavnej diagonále zeros. Preto:

**tr([omega-hat]) = 0**

To znamená, že celý člen **sin θ [omega-hat]** nepridá do trace nič.

Zostáva posledný člen obsahujúci **[omega-hat]²**. Z vlastností skew-symmetric representation vieme, že pre unit vector omega-hat platí:

**[omega-hat]² = omega-hat omega-hatT - I**

Teraz sa pozrime na trace tejto matrix. Keďže omega-hat je unit vector, teda má length 1, matrix **omega-hat omega-hatT** má trace 1. Identity matrix má trace 3. Preto:

**tr([omega-hat]²) = 1 - 3 = -2**

Teraz môžeme tieto výsledky vložiť späť do Rodrigues' formula. Dostávame:

**tr(R) = 3 + sin θ . 0 + (1 - cos θ)(-2)**

Prostredný člen zmizne:

**tr(R) = 3 - 2(1 - cos θ)**

Po roznásobení:

**tr(R) = 3 - 2 + 2 cos θ**

a teda:

**tr(R) = 1 + 2 cos θ**

Práve preto je trace rotation matrix taký užitočný. Zložité informácie o direction rotation axis sa pri tejto operácii stratia a zostane nám jednoduchý vzťah závislý iba od angle θ.

---

## 5. Ako z trace získame rotation angle

Teraz už máme:

**tr(R) = 1 + 2 cos θ**

a chceme z tejto rovnice dostať θ.

Najprv odčítame jednotku:

**tr(R) - 1 = 2 cos θ**

Potom obe strany vydelíme dvoma:

**cos θ = (tr(R) - 1) / 2**

Nakoniec použijeme inverse cosine:

**θ = acos((tr(R) - 1) / 2)**

Takto dokážeme z rotation matrix vypočítať angle rotation.

V Modern Robotics sa pri matrix logarithm štandardne vyberá:

**0 ≤ θ ≤ pi**

teda angle od 0° do 180°. Toto obmedzenie nie je náhodné. Jednu rotation totiž môžeme opísať rôznymi kombináciami axis a angle. Napríklad rotation o +60° okolo jednej osi môžeme opísať aj ako rotation o -60° okolo opačne orientovanej osi. Ak chceme, aby bol výsledok matrix logarithm čo najjednoznačnejší, potrebujeme si zvoliť konvenciu. Interval od 0 do pi nám takúto konvenciu poskytuje.

---

## 6. Príklad: z rotation matrix zistíme angle

Predstav si, že robotický gripper má relative orientation opísanú matrix:

$$[ 0  -1  0 ]$$
$$[ 1  0  0 ]$$
$$[ 0  0  1 ]$$

My teraz nechceme matrix iba rozpoznať ako známu z-axis rotation. Predstavme si, že ju dostal controller ako výsledok výpočtu a musí z nej rotation systematicky odvodiť.

Najprv vypočítame trace. Na diagonále máme 0, 0 a 1:

**tr(R) = 0 + 0 + 1 = 1**

Dosadíme do vzťahu:

**cos θ = (tr(R) - 1) / 2**

čiže:

**cos θ = (1 - 1) / 2 = 0**

Angle, ktorého cosine je 0 a ktorý leží v intervale od 0 do pi, je:

**θ = pi/2 = 90°**

Z deviatich entries rotation matrix sme teda zatiaľ získali jednu veľmi dôležitú informáciu: ide o rotation o 90°. Stále však nevieme, okolo ktorej osi. Na to potrebujeme z R dostať omega-hat.

---

## 7. Ako z R získame rotation axis

Opäť sa vrátime k Rodrigues' formula:

**R = I + sin θ [omega-hat] + (1 - cos θ)[omega-hat]²**

Teraz chceme nejakým spôsobom izolovať člen obsahujúci **[omega-hat]**. Pomôže nám transpose rotation matrix.

Keď transponujeme R, dostaneme:

**RT = I - sin θ [omega-hat] + (1 - cos θ)[omega-hat]²**

Prečo sa znamienko zmenilo práve pri prostrednom člene?

Pretože [omega-hat] je skew-symmetric:

**[omega-hat]T = -[omega-hat]**

Naopak [omega-hat]² je symmetric. Pri jeho transpose sa teda nič nezmení.

Teraz máme dve veľmi podobné rovnice. Jedna obsahuje **+sin θ [omega-hat]**, druhá **-sin θ [omega-hat]**. To nám dáva jednoduchý spôsob, ako túto časť izolovať: od R odčítame RT.

Dostaneme:

**R - RT = 2 sin θ [omega-hat]**

Identity matrices sa odčítaním zrušia. Členy obsahujúce [omega-hat]² sú v oboch matrices rovnaké, takže sa tiež zrušia. Prostredné členy sa naopak sčítajú:

**sin θ [omega-hat] - (-sin θ [omega-hat]) = 2 sin θ [omega-hat]**

Teraz už stačí vydeliť obe strany hodnotou 2 sin θ:

**[omega-hat] = (R - RT) / (2 sin θ)**

Takto získame skew-symmetric matrix rotation axis. Z nej potom pomocou operácie **so3ToVec** alebo jednoducho prečítaním príslušných entries dostaneme vector omega-hat.

---

## 8. Čo geometricky robí rozdiel R - RT

Tento krok stojí za hlbšie pochopenie, pretože na prvý pohľad môže pôsobiť ako matematický trik.

Rodrigues' formula obsahuje dve odlišné časti súvisiace s axis. Člen [omega-hat]² je symmetric, zatiaľ čo [omega-hat] je skew-symmetric. Keď vypočítame **R - RT**, symmetric časť sa odstráni, pretože v R aj RT je rovnaká. Skew-symmetric časť naopak prežije, pretože transpose jej zmení znamienko.

Rozdiel **R - RT** teda funguje ako spôsob, ktorým z rotation matrix vytiahneme práve tú časť, ktorá obsahuje direction rotation axis.

Je to podobné, ako keby si mala dve fotografie toho istého obrazu, pričom jedna zložka je na oboch rovnaká a druhá má opačné znamienko. Ak fotografie od seba odčítaš, spoločná časť zmizne a zostane iba tá, ktorá sa medzi nimi líšila.

---

## 9. Dokončíme príklad s rotation o 90°

Vráťme sa k našej matrix:

$$[ 0  -1  0 ]$$
$$[ 1  0  0 ]$$
$$[ 0  0  1 ]$$

Už sme zistili:

**θ = 90° = pi/2**

Pre tento angle platí:

**sin θ = 1**

Transpose matrix je:

$$[ 0  1  0 ]$$
$$[ -1  0  0 ]$$
$$[ 0  0  1 ]$$

Teraz vypočítame rozdiel:

$$R - RT =$$
$$[ 0  -2  0 ]$$
$$[ 2  0  0 ]$$
$$[ 0  0  0 ]$$

Podľa vzorca:

**[omega-hat] = (R - RT) / (2 sin θ)**

a keďže sin θ = 1, delíme matrix dvoma:

$$[omega-hat] =$$
$$[ 0  -1  0 ]$$
$$[ 1  0  0 ]$$
$$[ 0  0  0 ]$$

Teraz si spomeňme, ako vyzerá všeobecná skew-symmetric matrix vectora:

$$[ 0  -omega3  omega2 ]$$
$$[ omega3  0  -omega1 ]$$
$$[ -omega2  omega1  0 ]$$

Porovnaním vidíme:

**omega1 = 0**

**omega2 = 0**

**omega3 = 1**

teda:

**omega-hat = (0, 0, 1)**

Teraz máme celý axis-angle opis. Rotation prebieha okolo z-axis a angle je pi/2.

Exponential coordinate vector preto dostaneme vynásobením axis angle:

**omega-hat θ = (0, 0, 1) . pi/2**

čiže:

**omega-hat θ = (0, 0, pi/2)**

A matrix logarithm je zodpovedajúca skew-symmetric matrix:

**log(R) = [omega-hat]θ**

Vidíme teda celý opačný proces k Part 1. Z rotation matrix sme najprv pomocou trace našli angle, potom pomocou R - RT našli axis a nakoniec sme z nich zostavili exponential coordinates.

---

## 10. Všeobecný postup pri bežnej rotation

Ak rotation nie je jedným zo špeciálnych prípadov, celý matrix logarithm môžeme chápať ako dvojkrokový proces.

Najprv zistíme **koľko sa teleso otočilo**:

**θ = acos((tr(R) - 1) / 2)**

Potom zistíme **okolo čoho sa otočilo**:

**[omega-hat] = (R - RT) / (2 sin θ)**

Nakoniec vytvoríme:

**[omega-hat]θ = log(R)**

alebo, ak chceme exponential coordinate vector:

**omega-hat θ**

Tento postup funguje veľmi dobre, pokiaľ sin θ ≠ 0.

A práve táto podmienka nás privádza k dôležitej časti matrix logarithm. Existujú dva angles, pre ktoré je sin θ = 0:

**θ = 0**

a:

**θ = pi**

Tieto dve situácie musíme riešiť osobitne. Zaujímavé je, že hoci v oboch prípadoch zlyhá rovnaký vzorec, geometrický dôvod je pri každom úplne iný.

---

## 11. Špeciálny prípad θ = 0: žiadna rotation

Predstav si knihu položenú na stole. Jej počiatočná orientation je určitá R. Teraz od nej požadujeme cieľovú orientation, ktorá je presne rovnaká. Relative rotation medzi týmito dvoma orientations je identity:

**R = I**

Identity rotation matrix znamená, že sa orientation vôbec nezmenila.

Jej trace je:

**tr(I) = 3**

Ak použijeme náš vzorec:

**cos θ = (tr(R) - 1) / 2**

dostaneme:

**cos θ = (3 - 1) / 2 = 1**

a teda:

**θ = 0**

To je presne výsledok, ktorý očakávame: medzi orientations nie je potrebná žiadna rotation.

Teraz by sme však mohli skúsiť použiť vzorec na axis:

**[omega-hat] = (R - RT) / (2 sin θ)**

Lenže:

**sin 0 = 0**

a delili by sme nulou.

Dôležité je pochopiť, že nejde o chybu metódy. Matematika nás upozorňuje na skutočný geometrický problém: **pri nulovej rotation nemá rotation axis jednoznačný význam.**

---

## 12. Prečo pri nulovej rotation neexistuje jediná správna axis

Vráťme sa ku knihe na stole. Povedzme, že ju máš otočiť o presne 0°.

Môžeme tvrdiť, že rotation prebehla okolo z-axis. Výsledok bude rovnaký.

Mohli by sme však rovnako povedať, že prebehla okolo x-axis. Stále sa nič nezmení. Rovnako dobre môžeme vybrať y-axis alebo ľubovoľnú šikmú axis prechádzajúcu priestorom.

Ak je:

**θ = 0**

potom každá axis vedie k tej istej identity rotation.

Preto z R = I jednoducho **nie je možné zistiť omega-hat**, pretože R túto informáciu neobsahuje. Axis nie je iba numericky problematická. Je skutočne neurčitá.

Exponential coordinates však problém nemajú. Súčin je:

**omega-hat θ**

a keďže θ = 0, dostaneme bez ohľadu na omega-hat:

**omega-hat θ = (0, 0, 0)**

Preto môžeme identity rotation jednoznačne reprezentovať zero exponential coordinate vectorom.

---

## 13. Špeciálny prípad θ = pi: rotation o 180°

Druhý špeciálny prípad je geometricky oveľa zaujímavejší. Predstav si knihu položenú pred sebou a otoč ju presne o 180° okolo vertikálnej osi. Tentoraz rozhodne nejde o nulový motion. Orientation sa výrazne zmenila.

Ak θ = pi, potom:

**sin pi = 0**

a náš bežný vzorec:

**[omega-hat] = (R - RT) / (2 sin θ)**

opäť nemožno použiť.

Ale tentoraz axis existuje. Problém teda musí byť iný.

Pozrime sa najprv na trace. Pretože:

**cos pi = -1**

dostaneme:

**tr(R) = 1 + 2(-1) = -1**

Takže ak pri matrix logarithm narazíme na:

**tr(R) = -1**

vieme, že rotation angle je:

**θ = pi**

čiže 180°.

---

## 14. Prečo je rotation o 180° zvláštna

Predstav si obyčajné pravítko ležiace na stole. Chceš ho otočiť o 180° okolo osi smerujúcej nahor.

Axis označme omega-hat.

Teraz tú istú axis otočíme ako vector opačným smerom a označíme ju -omega-hat. Pri väčšine angles by zmena direction axis zmenila význam positive rotation. Ale pri presných 180° skončíme v rovnakej orientation.

Inými slovami:

**rotation o pi okolo omega-hat**

a:

**rotation o pi okolo -omega-hat**

vedú k rovnakej rotation matrix.

To znamená, že pri θ = pi dokážeme z R určiť geometrickú **os**, ale jej orientácia ako vectora má dve rovnocenné možnosti. V tomto prípade sú omega-hat a -omega-hat dve reprezentácie tej istej finite rotation.

To je úplne iný problém než pri θ = 0. Pri θ = 0 môže byť axis ľubovoľná. Pri θ = pi je geometrická axis určená, ale jej dva opačné directions predstavujú tú istú rotation.

---

## 15. Prečo pri 180° nefunguje R - RT

Pozrime sa na to ešte z druhej strany.

Vieme:

**R - RT = 2 sin θ [omega-hat]**

Pri θ = pi máme:

**sin pi = 0**

takže:

**R - RT = 0**

To znamená:

**R = RT**

Rotation matrix pre 180° rotation je teda symmetric.

A práve tu vidíme, prečo metóda založená na skew-symmetric časti R prestane fungovať. Pri 180° rotation je táto skew-symmetric časť nulová. Rozdiel R - RT nám preto už nedokáže prezradiť direction axis.

Musíme použiť inú časť rotation matrix.

---

## 16. Ako nájdeme axis pri rotation o 180°

Začneme znovu Rodrigues' formula:

**R = I + sin θ [omega-hat] + (1 - cos θ)[omega-hat]²**

Pre θ = pi vieme:

**sin pi = 0**

a:

**cos pi = -1**

takže:

**1 - cos pi = 2**

Rodrigues' formula sa zjednoduší na:

**R = I + 2[omega-hat]²**

Z Part 1 poznáme:

**[omega-hat]² = omega-hat omega-hatT - I**

Dosadíme:

**R = I + 2(omega-hat omega-hatT - I)**

Roznásobíme:

**R = I + 2 omega-hat omega-hatT - 2I**

a po zjednodušení:

**R = 2 omega-hat omega-hatT - I**

Teraz pripočítame I na obe strany:

**R + I = 2 omega-hat omega-hatT**

Tento vzťah je pre nás veľmi užitočný, pretože matrix na pravej strane priamo obsahuje components rotation axis.

---

## 17. Čo sa skrýva v matrix omega-hat omega-hatT

Predstavme si:

**omega-hat = (omega1, omega2, omega3)**

Potom:

$$omega-hat omega-hatT =$$
$$[ omega1²  omega1 omega2  omega1 omega3 ]$$
$$[ omega2 omega1  omega2²  omega2 omega3 ]$$
$$[ omega3 omega1  omega3 omega2  omega3² ]$$

A keďže:

**R + I = 2 omega-hat omega-hatT**

entries rotation matrix nám umožňujú získať squares components axis a následne aj ich znamienka z off-diagonal terms.

Modern Robotics používa pre θ = pi praktický postup, pri ktorom vyberieme vhodný diagonal element R a z neho zostrojíme unit axis. Cieľ je stále rovnaký: nájsť vector omega-hat, ktorý leží pozdĺž rotation axis.

Dôležitejšie než zapamätať si mechanicky jednotlivé varianty vzorca je pochopiť, prečo potrebujeme osobitný postup. Bežný vzorec používal **skew-symmetric časť R**, ktorá pri 180° zmizne. Preto musíme axis získať zo **symmetric časti R**, ktorá v sebe stále informáciu o osi obsahuje.

---

## 18. Jednoduchý príklad rotation o 180° okolo x-axis

Predstavme si rotation matrix:

$$[ 1  0  0 ]$$
$$[ 0  -1  0 ]$$
$$[ 0  0  -1 ]$$

Najprv vypočítame trace:

**tr(R) = 1 - 1 - 1 = -1**

Okamžite teda vieme:

**θ = pi**

Teraz sa pozrime na fyzický význam matrix. x-axis zostala nezmenená, zatiaľ čo y-axis a z-axis zmenili direction. Presne to očakávame pri rotation o 180° okolo x-axis.

Rotation axis teda môžeme zvoliť:

**omega-hat = (1, 0, 0)**

Ale rovnako platná je:

**omega-hat = (-1, 0, 0)**

Prečo? Pretože rotation o 180° okolo +x a rotation o 180° okolo -x vedú k tej istej orientation.

Exponential coordinates preto môžeme zapísať napríklad:

**omega-hat θ = (pi, 0, 0)**

pričom opačná axis poskytuje alternatívnu reprezentáciu tej istej hraničnej rotation.

---

## 19. Ešte intuitívnejší spôsob, ako chápať axis pri 180°

Pri 180° rotation existuje veľmi pekná geometrická vlastnosť.

**Vector ležiaci pozdĺž rotation axis sa rotation vôbec nezmení.**

Ak otáčaš knihu okolo z-axis, vector smerujúci pozdĺž z-axis zostáva smerovať presne tým istým smerom. Menia sa vectors perpendicular na axis.

Pre rotation axis teda platí:

**R omega-hat = omega-hat**

Rotation matrix necháva tento vector nezmenený.

To znamená, že omega-hat je **eigenvector R s eigenvalue 1**.

Táto vlastnosť neplatí iba pri 180°. Každá 3D rotation má axis, ktorá zostáva rotation nezmenená. Pri problematickom prípade θ = pi nám to poskytuje veľmi intuitívny spôsob, ako pochopiť, kde je axis v rotation matrix ukrytá.

Ak si teda niekedy nebudeš pamätať technický postup, geometrická otázka znie:

**„Ktorý direction zostane pri tejto rotation nezmenený?"**

Práve ten direction je rotation axis.

---

## 20. Tri prípady matrix logarithm, ktoré musíme rozlišovať

Teraz môžeme celý problém rozdeliť podľa hodnoty θ.

Pri **bežnej rotation**, kde:

**0 < θ < pi**

vieme z trace vypočítať θ a potom použiť:

**[omega-hat] = (R - RT) / (2 sin θ)**

Pri **identity rotation**:

**θ = 0**

je R = I. Axis je ľubovoľná, pretože rotation o zero degrees okolo akejkoľvek osi vedie k rovnakému výsledku. Exponential coordinates sú jednoducho zero vector.

Pri **rotation o 180°**:

**θ = pi**

je trace R rovný -1. Axis existuje, ale omega-hat a -omega-hat predstavujú tú istú finite rotation. Bežný vzorec založený na R - RT nefunguje, pretože sin pi = 0, takže axis získavame iným spôsobom zo symmetric časti R.

Tieto prípady nie sú iba technické výnimky vo vzorci. Každý z nich odráža skutočnú geometriu rotations.

---

## 21. Matrix logarithm ako opačná cesta k matrix exponential

Teraz už môžeme presne vidieť vzťah medzi oboma časťami tejto lekcie.

V Part 1 sme začali exponential coordinates:

**omega-hat θ**

Z nich sme vytvorili:

**[omega-hat]θ**

a pomocou matrix exponential sme dostali:

**R = e^[omega-hat]θ**

V Part 2 začíname na opačnom konci. Máme R, pomocou trace získame θ, pomocou vhodnej časti R získame omega-hat a vytvoríme:

**log(R) = [omega-hat]θ**

Tieto dve operácie teda spájajú dva pohľady na rotation:

**so(3) - exp - SO(3)**

a:

**SO(3) - log - so(3)**

SO(3) obsahuje rotation matrices, teda samotné orientations. so(3) obsahuje skew-symmetric matrices, ktoré používame na opis rotational motion a exponential coordinates.

Toto spojenie bude v Modern Robotics veľmi dôležité aj neskôr. Rovnaká myšlienka sa totiž rozšíri z čistej rotation na celý rigid-body motion.

---

## 22. Ako si predstaviť exponential coordinates ako obyčajný 3D vector

Exponential coordinate vector má tvar:

**omega-hat θ**

Jeho direction je omega-hat, takže ukazuje pozdĺž rotation axis. Jeho length je θ, takže hovorí, aký veľký rotation angle máme.

To znamená, že každú rotation môžeme znázorniť ako bod v obyčajnom trojrozmernom priestore exponential coordinates.

Napríklad:

**(0, 0, pi/2)**

znamená rotation o 90° okolo +z-axis.

Vector:

**(pi/2, 0, 0)**

znamená rotation o 90° okolo +x-axis.

A vector:

**(0, pi, 0)**

predstavuje rotation o 180° okolo y-axis.

Čím ďalej je bod od originu, tým väčší je rotation angle. Origin:

**(0,0,0)**

predstavuje identity rotation.

Toto nám umožňuje vytvoriť veľmi zaujímavý geometrický obraz celého SO(3).

---

## 23. SO(3) ako solid ball s radius pi

Keďže pri štandardnom matrix logarithm používame angles:

**0 ≤ θ ≤ pi**

length exponential coordinate vectora nikdy nemusí byť väčšia než pi.

Všetky exponential coordinate vectors preto môžeme nakresliť ako body vo vnútri **solid ball s radius pi**.

Origin ballu predstavuje:

**θ = 0**

teda identity orientation.

Body blízko originu predstavujú malé rotations.

Čím bližšie sa dostávame k povrchu ballu, tým bližšie je rotation angle k 180°.

Samotný povrch má radius:

**pi**

a preto každý point na povrchu reprezentuje rotation o 180° okolo axis určenej direction vectora od stredu ballu k danému pointu.

Na prvý pohľad by sa mohlo zdať, že sme tým našli pekný obyčajný 3D ball, ktorý je presne SO(3). Je tu však jedna veľmi dôležitá zvláštnosť.

![SO(3) visualized as a solid ball with radius pi, with antipodal surface points identified](/book/ch3/fig3-13.png)

---

## 24. Prečo musíme na povrchu ballu spájať antipodal points

Predstav si point na povrchu ballu v direction +x:

**(pi, 0, 0)**

Predstavuje rotation o 180° okolo +x-axis.

Na opačnej strane ballu je:

**(-pi, 0, 0)**

Ten zodpovedá rotation o 180° okolo -x-axis.

V predchádzajúcich sekciách sme však zistili, že tieto dve rotations vytvoria **presne tú istú orientation**.

Preto tieto dva body nemôžeme považovať za dve rôzne configurations.

Musíme ich **identify**, teda chápať ich ako ten istý point SO(3).

A to platí pre každý point na povrchu ballu. Point na jednej strane sphere a jeho presný antipodal point na opačnej strane reprezentujú rovnakú 180° rotation.

Preto môžeme SO(3) vizualizovať ako:

**solid ball s radius pi, kde sú antipodal points na povrchu považované za totožné.**

Toto je veľmi dôležitá geometrická vlastnosť rotation space.

---

## 25. Prečo SO(3) napriek exponential coordinates nie je obyčajné R3

Možno sa teraz zdá, že keď dokážeme rotation reprezentovať trojicou numbers omega-hat θ, orientation space by jednoducho mohol byť R3.

Nie je to tak.

Exponential coordinates síce používajú tri numbers, pretože orientation má 3 DOF, ale ich globálna geometria nie je rovnaká ako obyčajný Euclidean 3D priestor.

V R3 môžeš ísť od originu ľubovoľne ďaleko. Pri našej reprezentácii však po dosiahnutí angle pi narazíme na hranicu, na ktorej sa antipodal points spájajú. Navyše rôzne axis-angle descriptions môžu reprezentovať tú istú orientation.

Toto presne nadväzuje na Chapter 2 o configuration spaces. Počet DOF nám hovorí **dimension priestoru**, ale nehovorí, akú má tento priestor topology alebo geometry.

SO(3) má 3 DOF, ale nie je to R3.

Je to ďalší príklad toho, prečo v robotike musíme rozlišovať medzi počtom independent parameters a globálnym tvarom configuration space.

---

## 26. Prečo je matrix logarithm prakticky užitočný v robotike

Predstav si robotic arm, ktorého gripper má current orientation:

**R_current**

a požadovanú orientation:

**R_goal**

Najprv môžeme vypočítať relative rotation medzi nimi. Dostaneme rotation matrix, ktorá opisuje, ako sa musí current orientation zmeniť, aby sa zhodovala s goal orientation.

Samotná relative rotation matrix je užitočná, ale controller často potrebuje vedieť **rotation error** v kompaktnejšej forme. Matrix logarithm umožní túto relative rotation premeniť na exponential coordinates.

Výsledok nám povie dve veľmi prirodzené veci: direction vectora určuje axis, okolo ktorej treba gripper natočiť, a length vectora určuje veľkosť rotation.

Podobný princíp sa používa pri riadení orientations robotických ramien, drones, cameras, mobile robots alebo pri interpolácii medzi orientations. Matrix logarithm teda nie je iba spôsob, ako spätne vyrátať omega-hat a θ. Je to praktický most medzi **orientation error** a informáciou o rotational motion, ktorú môžeme ďalej použiť pri plánovaní a riadení.

---

## 27. Najčastejšia zámena: angular velocity a exponential coordinates

Na tomto mieste je veľmi dôležité nezameniť dve veci, ktoré môžu vyzerať podobne.

Angular velocity:

**omega**

opisuje **instantaneous motion**. Hovorí, ako sa orientation práve teraz mení, a jej units sú napríklad rad/s.

Exponential coordinates:

**omega-hat θ**

opisujú **finite rotation**. Direction určuje rotation axis a magnitude určuje celkový rotation angle. Ich angle component teda meriame v radians, nie radians per second.

Predstav si dvere. Ak povieš, že sa práve otáčajú rýchlosťou 1 rad/s, opisuješ angular velocity. Ak povieš, že ich z aktuálnej orientation treba otočiť ešte o 0,5 rad okolo axis hinges, opisuješ finite rotation.

Obe representations používajú 3D vectors a obe súvisia s rotation axis. Fyzikálny význam je však odlišný.

Práve v nasledujúcich témach sa ukáže, prečo je spojenie medzi nimi také užitočné.

---

## 28. Ako Part 1 a Part 2 vytvárajú jeden celok

Celá téma exponential coordinates of rotation stojí na veľmi elegantnom spojení.

Začneme unit rotation axis:

**omega-hat**

a angle:

**θ**

Ich súčin:

**omega-hat θ**

sú exponential coordinates.

Vector omega-hat prevedieme na skew-symmetric matrix [omega-hat]. Potom pomocou matrix exponential:

**R = e^[omega-hat]θ**

získame finite rotation matrix.

Rodrigues' formula nám dá praktický spôsob, ako exponential vypočítať:

**R = I + sin θ [omega-hat] + (1 - cos θ)[omega-hat]²**

Ak máme naopak R, použijeme matrix logarithm. Z trace R získame θ a z vhodných entries R získame omega-hat. Tým sa vrátime späť k:

**[omega-hat]θ**

Celý vzťah teda môžeme chápať ako:

**exponential coordinates <-> rotation matrix**

alebo presnejšie:

**so(3) <-> SO(3)**

Matrix exponential nás vedie jedným smerom a matrix logarithm druhým.

---

## Rekapitulácia najdôležitejších pojmov

**Matrix exponential** prevádza axis-angle alebo exponential-coordinate representation na rotation matrix. Pre rotation platí R = e^[omega-hat]θ.

**Matrix logarithm** rieši opačný problém. Z rotation matrix R získava matrix [omega-hat]θ, z ktorej vieme určiť rotation axis a angle.

**Rotation axis omega-hat** je unit vector určujúci axis rotation. Jeho length je 1; informáciu o veľkosti rotation nesie θ.

**Rotation angle θ** určuje veľkosť finite rotation. Pri štandardnom matrix logarithm volíme 0 ≤ θ ≤ pi.

**Exponential coordinates omega-hat θ** sú 3D vector, ktorého direction určuje rotation axis a magnitude rotation angle.

**Trace tr(R)** je súčet diagonal entries rotation matrix. Pre rotation matrix platí tr(R) = 1 + 2 cos θ, takže z neho vieme získať rotation angle.

**Bežný matrix logarithm** - pre 0 < θ < pi najprv vypočítame θ = acos((tr(R) - 1)/2) a potom [omega-hat] = (R - RT)/(2 sin θ).

**Identity rotation** - ak R = I, potom θ = 0. Rotation axis nie je jednoznačná, pretože zero rotation môžeme opísať pomocou ľubovoľnej osi. Exponential coordinates sú (0,0,0).

**Rotation o 180°** - ak tr(R) = -1, potom θ = pi. Bežný vzorec pre axis nefunguje, pretože sin pi = 0. Axis získavame zo symmetric časti R; directions omega-hat a -omega-hat reprezentujú rovnakú finite rotation.

**SO(3)** je configuration space všetkých 3D orientations reprezentovaných rotation matrices.

**so(3)** je priestor 3 x 3 skew-symmetric matrices. Matrix exponential spája so(3) s SO(3).

**Solid-ball representation SO(3)** - exponential coordinates umožňujú predstaviť SO(3) ako solid ball s radius pi. Antipodal points na povrchu musíme považovať za totožné, pretože predstavujú rovnaké rotations o 180°.

---

## Čo si z tejto lekcie odniesť

V Part 1 sme sa naučili ísť od jednoduchého fyzického opisu rotation k rotation matrix. Ak poznáme axis omega-hat a angle θ, exponential coordinates **omega-hat θ** nám povedia, akú finite rotation chceme vykonať, a matrix exponential túto informáciu prevedie na R.

V Part 2 sme sa naučili cestu opačným smerom. Ak poznáme iba rotation matrix, najprv z jej trace zistíme, **koľko sa teleso otočilo**. Potom z rozdielu R - RT pri bežnom prípade zistíme, **okolo akej osi sa otočilo**. Tým získame späť axis-angle representation a exponential coordinates.

Špeciálne prípady θ = 0 a θ = pi zároveň ukazujú, že rotation space má zaujímavejšiu geometriu než obyčajné R3. Pri nulovej rotation nezáleží na axis vôbec. Pri rotation o 180° zase opačné directions tej istej geometrickej osi vedú k rovnakej orientation. Preto sa pri predstave SO(3) ako solid ball musia antipodal points na jeho povrchu spojiť.

Najdôležitejšie spojenie celej témy je preto:

**[omega-hat]θ  - matrix exponential -  R**

a opačne:

**R  - matrix logarithm -  [omega-hat]θ**

Matrix exponential a matrix logarithm nám umožňujú prechádzať medzi dvoma pohľadmi na rotation: medzi **orientation reprezentovanou pomocou R v SO(3)** a **axis-angle/exponential-coordinate opisom rotation spojeným so so(3)**.

Práve tento spôsob uvažovania sa čoskoro rozšíri z čistej rotation na celý spatial rigid-body motion. Namiesto samotného SO(3) budeme pracovať s **SE(3)**, namiesto čistej angular velocity sa objaví **twist** a namiesto obyčajnej rotation axis budeme používať **screw axis**. Myšlienka však zostane veľmi podobná: hľadať systematický spôsob, ako prechádzať medzi configuration rigid body a geometrickým opisom motion, ktorý túto configuration vytvára.`;
