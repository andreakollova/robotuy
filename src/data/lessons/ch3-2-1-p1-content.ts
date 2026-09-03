// Chapter 3.2.1 – Rotation Matrices (Part 1 of 2)
// Full lesson content - DO NOT SHORTEN

export const ch321p1Content = `# Chapter 3.2.1 – Rotation Matrices

## Part 1 of 2

V úvodnej časti Chapter 3 sme si vytvorili základnú predstavu, že configuration rigid body v trojrozmernom priestore pozostáva z dvoch častí: z jeho **position** a **orientation**. Position vieme pomerne prirodzene opísať tromi coordinates. Ak sa napríklad origin body frame nachádza dva metre v smere x, jeden meter v smere y a tri metre v smere z, môžeme jeho position zapísať vectorom.

Pri orientation však vzniká zaujímavejší problém. Nestačí povedať, kde sa teleso nachádza. Potrebujeme presne vedieť, **ako je natočené**. A práve na systematickú reprezentáciu orientation budeme používať **rotation matrices**.

Rotation matrix bude jeden z najdôležitejších objektov celej Modern Robotics. Neskôr ju použijeme pri homogeneous transformation matrices, angular velocities, twists aj forward kinematics. Preto je dôležité nevnímať ju iba ako tabuľku deviatich čísel, ale rozumieť tomu, **odkiaľ tieto čísla pochádzajú a čo geometricky znamenajú**.

---

## 1. Aký problém vlastne rotation matrix rieši

Predstav si robotický gripper vo vzduchu. Jeho origin sa momentálne vôbec nehýbe. Nachádza sa stále na rovnakom mieste, ale gripper môžeš otáčať.

Môže smerovať prstami dopredu, potom ho otočíš doprava, nakloníš nahor alebo prevrátiš. Position originu zostáva rovnaká, ale configuration sa mení, pretože sa mení **orientation**.

V 2D sa orientation opisuje veľmi jednoducho. Ak sa objekt pohybuje iba v rovine, stačí jeden angle **θ**. Napríklad auto nakreslené na papieri môže byť otočené o 30°, 90° alebo 180°.

V 3D je situácia komplikovanejšia. Rigid body môže meniť orientation okolo troch smerov a jeden jednoduchý angle už nestačí. Mohli by sme síce použiť tri angles, ale okamžite vzniká otázka: ktoré tri? V akom poradí máme rotations vykonať? A ako potom jednoducho kombinovať rotations alebo meniť reference frames?

Modern Robotics preto používa iný prístup. Namiesto toho, aby sme priamo opisovali rotation tromi angles, budeme sledovať, **kam smerujú osi body frame**.

---

## 2. Orientation si predstav ako tri šípky pripevnené k telesu

Predstav si dron a pripevni k nemu tri farebné šípky. Jedna predstavuje jeho body x-axis, druhá y-axis a tretia z-axis.

Keď je dron zarovnaný so space frame, jeho body axes smerujú presne rovnakým smerom ako axes miestnosti. Ak však dron otočíme, jeho vlastné axes sa otočia spolu s ním.

Orientation dronu preto môžeme určiť tak, že sa opýtame:

**Ako vyzerá body x-axis v coordinates space frame?**

**Ako vyzerá body y-axis v coordinates space frame?**

**Ako vyzerá body z-axis v coordinates space frame?**

Ak poznáme odpovede na tieto tri otázky, orientation telesa je úplne určená.

To je základ rotation matrix.

---

## 3. Najprv jednoduchší príklad v rovine

Predstav si dve súradnicové sústavy. Prvá je pevná a označíme ju **{s}** (*space frame*). Má os **x̂ₛ**, ktorá smeruje doprava, a os **ŷₛ**, ktorá smeruje nahor.

Druhá súradnicová sústava je **{b}** (*body frame*). Môže byť napríklad pripevnená k robotovi. Keď sa robot otočí, spolu s ním sa otočí aj body frame.

Najskôr si predstavme, že body frame ešte nie je otočený. Obe súradnicové sústavy sú teda presne zarovnané.

Os **x̂ᵦ** smeruje rovnakým smerom ako **x̂ₛ** a os **ŷᵦ** smeruje rovnakým smerom ako **ŷₛ**.

Preto v tomto konkrétnom prípade môžeme napísať:

**x̂ᵦ = x̂ₛ**

**ŷᵦ = ŷₛ**

Teraz však body frame **{b}** otočíme proti smeru hodinových ručičiek o uhol **θ**. Space frame **{s}** zostáva na mieste.

Po otočení už **x̂ᵦ** nesmeruje rovnakým smerom ako **x̂ₛ**. Smeruje šikmo doprava a nahor.

Napríklad:


        ŷₛ
        |
        |       / x̂ᵦ
        |      /
        |     /
        |    / θ
        |   /
        └────────────→ x̂ₛ


Teraz chceme zistiť, **ako opísať smer x̂ᵦ pomocou pevných osí x̂ₛ a ŷₛ**.

Otočená os **x̂ᵦ** smeruje čiastočne doprava a čiastočne nahor.

Časť smerujúcu doprava určuje:

**cos θ**

a časť smerujúcu nahor:

**sin θ**

Preto môžeme zapísať:

**x̂ᵦ = cos θ · x̂ₛ + sin θ · ŷₛ**

Táto rovnica iba hovorí:

**„Os x̂ᵦ smeruje trochu v smere x̂ₛ a trochu v smere ŷₛ."**

Koľko presne pripadá na každý smer, určujú **cos θ** a **sin θ**.

### Keď θ = 0°

Ak body frame neotočíme, potom:

**θ = 0°**

Vieme, že:

**cos 0° = 1**

**sin 0° = 0**

Preto:

**x̂ᵦ = 1 · x̂ₛ + 0 · ŷₛ**

čiže:

**x̂ᵦ = x̂ₛ**

Os x body frame teda smeruje presne rovnakým smerom ako os x space frame.

### Keď θ = 90°

Ak body frame otočíme o 90° proti smeru hodinových ručičiek:

**θ = 90°**

potom:

**cos 90° = 0**

**sin 90° = 1**

Preto:

**x̂ᵦ = 0 · x̂ₛ + 1 · ŷₛ**

čiže:

**x̂ᵦ = ŷₛ**

Os x body frame teraz smeruje nahor, teda presne tým smerom, ktorým smeruje os y space frame.

---

## 4. Čo sa stane s druhou osou

Os y body frame musí zostať kolmá na os x body frame. Keďže celý frame otáčame ako tuhú súradnicovú sústavu, osi sa nemôžu deformovať ani meniť svoj vzájomný uhol.

Preto platí:

**ŷᵦ = -sin θ · x̂ₛ + cos θ · ŷₛ**

Záporné znamienko pri **-sin θ** nie je náhodné.

Predstav si θ = 90°. Os y body frame, ktorá pôvodne smerovala nahor, sa po otočení o 90° proti smeru hodinových ručičiek dostane doľava.

Pre θ = 90° máme:

**-sin 90° = -1**

a

**cos 90° = 0**

takže:

**ŷᵦ = -x̂ₛ**

čo presne zodpovedá obrázku otočeného frame.

Takto vieme orientation celého rovinného frame vyjadriť pomocou smerov jeho dvoch osí.

---

## 5. Z dvoch vektorov vytvoríme rotation matrix

V predchádzajúcej časti sme zistili, ako po otočení smerujú obe osi body frame.

Pre os **x̂ᵦ** sme dostali:

**x̂ᵦ = cos θ · x̂ₛ + sin θ · ŷₛ**

To znamená, že smer osi **x̂ᵦ** môžeme zapísať pomocou dvoch čísel:

**(cos θ, sin θ)**

Prvé číslo hovorí, koľko os **x̂ᵦ** smeruje v smere **x̂ₛ** a druhé číslo hovorí, koľko smeruje v smere **ŷₛ**.

Pre os **ŷᵦ** sme podobne dostali:

**ŷᵦ = −sin θ · x̂ₛ + cos θ · ŷₛ**

Jej smer teda môžeme zapísať pomocou dvojice:

**(−sin θ, cos θ)**

Teraz teda máme dve dôležité informácie:

**smer osi x̂ᵦ → (cos θ, sin θ)**

**smer osi ŷᵦ → (−sin θ, cos θ)**

Tieto dva smery spolu opisujú, ako je celý body frame otočený. Ak totiž vieme, kam smeruje jeho os x a kam smeruje jeho os y, poznáme jeho orientáciu.

Namiesto toho, aby sme tieto dva vektory stále zapisovali samostatne, môžeme ich uložiť vedľa seba do jednej matice.

Dostaneme:


      x̂ᵦ        ŷᵦ
       ↓          ↓

P = [ cos θ    −sin θ ]
    [ sin θ     cos θ ]


Toto je **2 × 2 rotation matrix**.

Prečo má dva stĺpce?

Pretože body frame má v rovine dve osi.

**Prvý stĺpec opisuje os x̂ᵦ.**

**Druhý stĺpec opisuje os ŷᵦ.**

Pozrime sa na prvý stĺpec:


[ cos θ ]
[ sin θ ]


To je presne náš smer osi **x̂ᵦ**.

Horné číslo hovorí, koľko táto os smeruje v smere **x̂ₛ**.

Dolné číslo hovorí, koľko smeruje v smere **ŷₛ**.

Druhý stĺpec:


[ −sin θ ]
[  cos θ ]


rovnakým spôsobom opisuje smer osi **ŷᵦ**.

Rotation matrix teda nie je nová informácia. **Iba sme informácie, ktoré už máme o dvoch osiach, usporiadali do jednej matice.**

To je veľmi dôležité.

Keď uvidíš:


P = [ cos θ    −sin θ ]
    [ sin θ     cos θ ]


nesnaž sa ju zatiaľ vnímať ako štyri čísla, ktoré sa musíš naučiť naspamäť.

Predstav si ju skôr takto:


P = [ smer x̂ᵦ | smer ŷᵦ ]


Prvý stĺpec hovorí:

**„Takto smeruje x-os body frame."**

Druhý stĺpec hovorí:

**„Takto smeruje y-os body frame."**

A keď poznáme smer oboch osí, poznáme **orientáciu celého body frame vzhľadom na space frame**.

---

## 6. Konkrétny príklad: otočenie o 60°

Teraz si to ukážme na konkrétnych číslach.

Predstav si, že body frame otočíme proti smeru hodinových ručičiek o:

**θ = 60°**

Vyzeralo by to približne takto:


        ŷₛ
        |
        |     \ ŷᵦ
        |    /
        |   /
        |  /      / x̂ᵦ
        | /      /
        |       / 60°
        └────────────────→ x̂ₛ


Pre 60° platí:

**cos 60° = 0,5**

a:

**sin 60° ≈ 0,866**

Najskôr sa pozrime iba na os **x̂ᵦ**.

Vieme, že jej smer zapisujeme ako:

**(cos θ, sin θ)**

Po dosadení 60° dostaneme:

**(0,5, 0,866)**

Čo tieto čísla znamenajú?

Hodnota **0,5** hovorí, aká veľká časť osi **x̂ᵦ** smeruje doprava, teda v smere **x̂ₛ**.

Hodnota **0,866** hovorí, aká veľká časť smeruje nahor, teda v smere **ŷₛ**.

Preto os **x̂ᵦ** smeruje šikmo doprava a nahor.

Teraz sa pozrime na druhú os **ŷᵦ**.

Jej smer zapisujeme ako:

**(−sin θ, cos θ)**

Po dosadení dostaneme:

**(−0,866, 0,5)**

Záporná hodnota **−0,866** znamená, že os smeruje výrazne doľava.

Hodnota **0,5** znamená, že zároveň smeruje trochu nahor.

Preto **ŷᵦ** smeruje šikmo doľava a nahor.

Máme teda:

**x̂ᵦ → (0,5, 0,866)**

**ŷᵦ → (−0,866, 0,5)**

Teraz tieto dva vektory vložíme ako stĺpce jednej matice:


P = [ 0,5      −0,866 ]
    [ 0,866     0,5   ]


A toto je rotation matrix pre otočenie o 60°.

![Body frame {b} rotated by θ = 60 degrees relative to fixed frame {s} in the plane](/book/ch3/fig3-3.png)

### Ako túto maticu čítať?

Keď uvidíš:


P = [ 0,5      −0,866 ]
    [ 0,866     0,5   ]


vezmi si najskôr iba **prvý stĺpec**:


[ 0,5   ]
[ 0,866 ]


Ten hovorí:

**x̂ᵦ smeruje doprava a nahor.**

Potom si vezmi **druhý stĺpec**:


[ −0,866 ]
[  0,5   ]


Ten hovorí:

**ŷᵦ smeruje doľava a nahor.**

Takže z jednej rotation matrix dokážeme zistiť, **kam smerujú obe osi body frame**.

A preto dokážeme zistiť, ako je celý body frame otočený.

---

## 7. Čo si z toho zapamätať

Najdôležitejšie je pochopiť postup.

Najprv máme body frame s dvoma osami:

**x̂ᵦ a ŷᵦ**

Body frame otočíme o uhol **θ**.

Potom zistíme, kam smeruje jeho os x:

**x̂ᵦ → (cos θ, sin θ)**

a kam smeruje jeho os y:

**ŷᵦ → (−sin θ, cos θ)**

Nakoniec tieto dva vektory vložíme vedľa seba:


      smer x̂ᵦ   smer ŷᵦ
          ↓          ↓

P = [ cos θ     −sin θ ]
    [ sin θ      cos θ ]


A dostaneme **rotation matrix**.

Takže keď sa nabudúce pozrieš na rotation matrix, skús si povedať:

**„Prvý stĺpec mi hovorí, kam smeruje x-os. Druhý stĺpec mi hovorí, kam smeruje y-os."**

To je hlavná myšlienka.

Rotation matrix je jednoducho spôsob, ako **uložiť orientáciu súradnicovej sústavy pomocou smerov jej osí**.

---

## 8. Prečo to robíme komplikovanejšie, keď v 2D stačí θ

Pri planar orientation by skutočne stačil jediný angle θ. Rotation matrix obsahuje štyri numbers, takže sa môže zdať zbytočne komplikovaná.

Dôvod sa ukáže pri prechode do 3D.

V 3D už jeden angle orientation neopíše. Potrebovali by sme tri parameters a museli by sme presne definovať, čo znamenajú. Navyše kombinovanie rotations pomocou angles môže byť menej priamočiare.

Prístup cez directions jednotlivých axes sa však rozšíri z 2D do 3D úplne prirodzene.

V 2D sme mali dve axes a vytvorili sme 2 x 2 matrix.

V 3D máme tri axes, preto vytvoríme **3 x 3 rotation matrix**.

---

## 9. Rotation matrix v trojrozmernom priestore

Doteraz sme pracovali iba v rovine, teda v 2D. Mali sme pevnú súradnicovú sústavu **{s}** (*space frame*) s osami **x̂ₛ** a **ŷₛ** a otočenú súradnicovú sústavu **{b}** (*body frame*) s osami **x̂ᵦ** a **ŷᵦ**. Keď sme chceli opísať orientáciu body frame, zisťovali sme, kam jeho dve osi smerujú vzhľadom na osi space frame. Smer každej osi sme opísali dvomi číslami a tieto dva vektory sme potom vložili ako stĺpce do rotation matrix.

V trojrozmernom priestore budeme robiť **presne to isté**. Jediný zásadný rozdiel je, že už nemáme dve osi, ale tri.

Space frame **{s}** má teraz osi:

**x̂ₛ, ŷₛ, ẑₛ**

a body frame **{b}** má svoje osi:

**x̂ᵦ, ŷᵦ, ẑᵦ**

Predstav si napríklad robotické rameno a na jeho konci uchopovač. Space frame môže byť pevne umiestnený pri základni robota a body frame môže byť pripevnený k uchopovaču. Keď robot pohybuje uchopovačom a otáča ho v priestore, spolu s uchopovačom sa otáčajú aj osi **x̂ᵦ, ŷᵦ a ẑᵦ**. Osi space frame sa pritom nehýbu.

Našou úlohou je zistiť, **ako je body frame otočený vzhľadom na space frame**. Rovnako ako v 2D to urobíme tak, že sa postupne pozrieme na jeho jednotlivé osi.

---

## 10. Ako opíšeme jednu os v 3D

Začnime iba osou **x̂ᵦ**. Predstav si ju ako šípku, ktorá smeruje niekam šikmo do priestoru. V 2D mohla šípka smerovať iba určitou kombináciou smerov x a y, napríklad doprava a nahor. Preto nám na opis jej smeru stačili dve čísla.

V 3D však môže šípka smerovať aj v treťom smere. Na opis jej smeru preto potrebujeme povedať, akú má zložku v smere **x̂ₛ**, akú v smere **ŷₛ** a akú v smere **ẑₛ**.

Predstav si napríklad, že os **x̂ᵦ** môžeme opísať takto:

**x̂ᵦ = 0,8 · x̂ₛ + 0,6 · ŷₛ + 0 · ẑₛ**

Tento zápis hovorí, že os **x̂ᵦ** má zložku **0,8** v smere osi x space frame, zložku **0,6** v smere osi y space frame a žiadnu zložku v smere osi z space frame.

Ten istý smer môžeme oveľa stručnejšie zapísať trojicou:

**x̂ᵦ → (0,8, 0,6, 0)**

Tieto tri čísla teda nie sú tri rôzne osi ani tri rôzne vektory. Sú to **tri zložky jedného vektora x̂ᵦ**, ktoré nám spoločne hovoria, kam táto jedna os smeruje v trojrozmernom priestore.

Je to rovnaká myšlienka ako v 2D. Ak sme tam mali napríklad:

**x̂ᵦ → (0,5, 0,866)**

prvé číslo opisovalo zložku v smere x a druhé zložku v smere y. V 3D jednoducho pridáme ešte tretie číslo pre smer z:

**x̂ᵦ → (x-zložka, y-zložka, z-zložka)**

---

## 11. Rovnakým spôsobom musíme opísať všetky tri osi

Ak chceme poznať orientáciu celého body frame, nestačí nám vedieť iba to, kam smeruje jeho os **x̂ᵦ**. Body frame má tri osi, takže potrebujeme poznať smer **x̂ᵦ**, smer **ŷᵦ** aj smer **ẑᵦ**.

Pre každú z nich potrebujeme tri čísla. Aby sme nemuseli zakaždým používať konkrétne hodnoty ako 0,8 alebo 0,6, označíme tieto čísla všeobecne pomocou písmena **r**.

Pre os **x̂ᵦ** použijeme:

**x̂ᵦ = r₁₁ · x̂ₛ + r₂₁ · ŷₛ + r₃₁ · ẑₛ**

Táto rovnica iba hovorí, že os **x̂ᵦ** má určitú zložku v smere x, určitú zložku v smere y a určitú zložku v smere z. Hodnoty **r₁₁, r₂₁ a r₃₁** sú jednoducho tieto tri zložky.

Rovnakým spôsobom opíšeme os **ŷᵦ**:

**ŷᵦ = r₁₂ · x̂ₛ + r₂₂ · ŷₛ + r₃₂ · ẑₛ**

A nakoniec os **ẑᵦ**:

**ẑᵦ = r₁₃ · x̂ₛ + r₂₃ · ŷₛ + r₃₃ · ẑₛ**

Na prvý pohľad môže deväť rôznych symbolov pôsobiť komplikovane, ale nepribudol nám žiadny nový princíp. Stále robíme iba jednu vec: **pri každej osi body frame zisťujeme, ako veľmi smeruje pozdĺž jednotlivých osí space frame**.

---

## 12. Čo vlastne znamenajú r₁₁, r₂₁, r₃₁?

Pozrime sa ešte raz iba na prvú rovnicu:

**x̂ᵦ = r₁₁ · x̂ₛ + r₂₁ · ŷₛ + r₃₁ · ẑₛ**

Predstav si, že namiesto písmen dosadíme náš predchádzajúci príklad:

**x̂ᵦ = 0,8 · x̂ₛ + 0,6 · ŷₛ + 0 · ẑₛ**

Potom jednoducho platí:

**r₁₁ = 0,8**

**r₂₁ = 0,6**

**r₃₁ = 0**

Symbol **r₁₁** teda v tomto prípade hovorí, akú zložku má os **x̂ᵦ** v smere **x̂ₛ**. Symbol **r₂₁** hovorí, akú zložku má tá istá os **x̂ᵦ** v smere **ŷₛ** a **r₃₁** hovorí, akú zložku má v smere **ẑₛ**.

Preto tieto tri hodnoty spolu patria:


x̂ᵦ → (r₁₁, r₂₁, r₃₁)


A neskôr ich uvidíme spolu v **prvom stĺpci rotation matrix**.

To isté platí pre druhú os:


ŷᵦ → (r₁₂, r₂₂, r₃₂)


a tretiu:


ẑᵦ → (r₁₃, r₂₃, r₃₃)


Nemusíš sa teda učiť deväť symbolov samostatne. Oveľa jednoduchšie je rozdeliť si ich do troch skupín: **tri čísla opisujú x-os, ďalšie tri y-os a posledné tri z-os body frame**.

---

## 13. Prečo z toho vznikne matica 3 × 3?

Teraz už máme všetko potrebné na vytvorenie rotation matrix. Máme tri vektory, pričom každý opisuje smer jednej osi body frame.

Prvý vektor opisuje **x̂ᵦ**:


[ r₁₁ ]
[ r₂₁ ]
[ r₃₁ ]


Druhý opisuje **ŷᵦ**:


[ r₁₂ ]
[ r₂₂ ]
[ r₃₂ ]


A tretí opisuje **ẑᵦ**:


[ r₁₃ ]
[ r₂₃ ]
[ r₃₃ ]


Rovnako ako v 2D ich teraz jednoducho položíme vedľa seba ako stĺpce jednej matice:


          x̂ᵦ       ŷᵦ       ẑᵦ
           ↓         ↓         ↓

R = [    r₁₁       r₁₂       r₁₃    ]
    [    r₂₁       r₂₂       r₂₃    ]
    [    r₃₁       r₃₂       r₃₃    ]


Preto má rotation matrix v 3D veľkosť **3 × 3**. Má tri stĺpce, pretože body frame má tri osi, a každý stĺpec obsahuje tri čísla, pretože na opis smeru jednej osi v trojrozmernom priestore potrebujeme tri zložky.

Toto je veľmi dôležité pochopiť. Rotation matrix nemá deväť čísel preto, že by sme si náhodne zvolili maticu 3 × 3. Jej veľkosť prirodzene vznikne z geometrie trojrozmerného priestoru.

---

## 14. Ako rotation matrix čítať

Keď teraz uvidíš rotation matrix:


R = [ r₁₁   r₁₂   r₁₃ ]
    [ r₂₁   r₂₂   r₂₃ ]
    [ r₃₁   r₃₂   r₃₃ ]


nesnaž sa pozerať na všetkých deväť čísel naraz. Rozdeľ si ju na **tri stĺpce**:


R = [   x̂ᵦ   |   ŷᵦ   |   ẑᵦ   ]


Prvý stĺpec:


[ r₁₁ ]
[ r₂₁ ]
[ r₃₁ ]


hovorí, **kam smeruje x-os body frame vzhľadom na space frame**.

Druhý stĺpec:


[ r₁₂ ]
[ r₂₂ ]
[ r₃₂ ]


hovorí, **kam smeruje y-os body frame**.

A tretí stĺpec:


[ r₁₃ ]
[ r₂₃ ]
[ r₃₃ ]


hovorí, **kam smeruje z-os body frame**.

Keď poznáme smery všetkých troch osí, poznáme orientáciu celého body frame. A presne túto informáciu rotation matrix uchováva.

---

## 15. Konkrétny príklad prvého stĺpca

Vráťme sa ešte raz k nášmu príkladu:

**x̂ᵦ = 0,8 · x̂ₛ + 0,6 · ŷₛ + 0 · ẑₛ**

To znamená:

**x̂ᵦ → (0,8, 0,6, 0)**

Tieto tri čísla vložíme do prvého stĺpca rotation matrix:


             x̂ᵦ
              ↓

R = [       0,8       ...       ... ]
    [       0,6       ...       ... ]
    [       0         ...       ... ]


Bodky zatiaľ znamenajú, že ešte nepoznáme smery osí **ŷᵦ** a **ẑᵦ**. Keby sme rovnakým spôsobom zistili ich tri zložky, vložili by sme ich do druhého a tretieho stĺpca a mali by sme kompletnú rotation matrix.

Takže ak by si z celej tejto časti mala pochopiť iba jednu vec, je to táto myšlienka:

**V 3D rotation matrix obsahuje tri stĺpce. Prvý opisuje smer x-osi body frame, druhý smer y-osi a tretí smer z-osi. Každý stĺpec potrebuje tri čísla, pretože každú os opisujeme pomocou troch smerov space frame: x, y a z.**

Rotation matrix preto môžeme v hlave čítať jednoducho ako:


R = [ smer x̂ᵦ | smer ŷᵦ | smer ẑᵦ ]


A to je presne rovnaký princíp, aký sme používali v 2D. Iba sme k nemu pridali tretí rozmer.

---

## 16. Prečo columns rotation matrix nemôžu byť ľubovoľné vectors

Tu sa dostávame k jednej z najdôležitejších častí celej témy.

Rotation matrix má deväť entries. Mohlo by teda vyzerať, že si môžeme vybrať deväť ľubovoľných numbers.

Nemôžeme.

Prečo?

Pretože columns rotation matrix majú predstavovať axes skutočného reference frame. A coordinate axes majú špecifické geometrické vlastnosti.

Predstav si tri pevné tyčky pripevnené v jednom bode. Majú predstavovať x, y a z axes body frame.

Každá musí mať unit length.

Každé dve musia byť perpendicular.

A spolu musia vytvárať správne orientovaný, right-handed frame.

Ak by sme do matrix vložili tri náhodné vectors, pravdepodobne by tieto podmienky nespĺňali. Taká matrix by nereprezentovala platnú rotation.

---

## 17. Prvá podmienka: každá axis musí byť unit vector

Reference frame používa **unit coordinate axes**. To znamená, že každý axis vector má length:

**1**.

Ak prvý column rotation matrix predstavuje:

**x̂b = (r11, r21, r31)**

potom jeho length musí spĺňať:

**r11² + r21² + r31² = 1**

Prečo?

Length vectora (a, b, c) je:

**sqrt(a² + b² + c²)**.

Ak má byť length rovná 1, potom:

**sqrt(r11² + r21² + r31²) = 1**

Po umocnení oboch strán:

**r11² + r21² + r31² = 1.**

Presne rovnaké pravidlo musí platiť pre druhý a tretí column:

**r12² + r22² + r32² = 1**

**r13² + r23² + r33² = 1**

Máme teda prvé tri constraints.

---

## 18. Čo by sa stalo, keby columns nemali unit length

Predstav si frame nakreslený na pružnom materiáli.

Ak by jeho x-axis mala length 2 a y-axis length 1, taká transformation by už nepredstavovala čistú rotation. Pri použití na objekt by sme ho v jednom smere zároveň **naťahovali**.

Rotation však nesmie meniť shape alebo scale rigid body.

Ak otočíme kocku, hrana dlhá 10 cm musí mať po rotation stále 10 cm.

Preto musí rotation zachovávať lengths a axes frame musia zostať unit vectors.

Táto matematická podmienka má teda veľmi konkrétny fyzikálny význam: **rotation nesmie objekt zväčšovať ani zmenšovať.**

---

## 19. Druhá podmienka: axes musia zostať perpendicular

Unit length ešte nestačí.

Mohli by sme mať tri vectors, z ktorých každý má length 1, ale nie sú navzájom kolmé.

Také vectors by netvorili správny Cartesian reference frame.

Preto potrebujeme ďalšiu podmienku:

**x̂b . ŷb = 0**

**x̂b . ẑb = 0**

**ŷb . ẑb = 0**

Symbol **.** označuje dot product.

Pre dva vectors platí, že ak je ich dot product nulový, vectors sú perpendicular.

Tak dostávame ďalšie tri constraints.

---

## 20. Prečo dot product nula znamená kolmosť

Pre dva vectors a a b platí:

**a . b = ||a|| ||b|| cos alpha**

kde **alpha** je angle medzi nimi.

Naše coordinate axes sú unit vectors, takže:

**||a|| = 1**

a

**||b|| = 1**.

Potom:

**a . b = cos alpha**

Ak majú byť axes perpendicular:

**alpha = 90°**

a:

**cos 90° = 0.**

Preto:

**a . b = 0.**

Keď teda požadujeme nulový dot product medzi jednotlivými columns rotation matrix, matematicky tým hovoríme:

**„Tieto axes musia zostať navzájom kolmé."**

---

## 21. Šesť constraints a iba tri nezávislé DOF

Rotation matrix má:

**9 entries.**

Máme však:

**3 unit-length constraints**

a

**3 orthogonality constraints.**

Celkovo teda:

**6 constraints.**

Z deviatich numbers preto zostávajú:

**9 - 6 = 3 independent continuous quantities.**

A to presne súhlasí s tým, čo poznáme z Chapter 2:

**spatial orientation má 3 DOF.**

Toto je krásny príklad **implicit representation**.

Rotation matrix používa deväť numbers na reprezentáciu orientation, ktorá má iba tri DOF. Šesť constraints zabezpečuje, že týchto deväť numbers nemôžeme vyberať ľubovoľne.

---

## 22. Všetkých šesť constraints zapíšeme jednou rovnicou

Písať šesť samostatných equations by bolo nepraktické.

Rotation matrix má však veľmi elegantnú vlastnosť:

**RT R = I**

kde:

**RT** je transpose matrix R

a

**I** je identity matrix.

Identity matrix v 3D je:

$$[ 1  0  0 ]$$
$$[ 0  1  0 ]$$
$$[ 0  0  1 ]$$

Táto jediná matrix equation v sebe obsahuje všetky unit-length aj orthogonality conditions.

Aby sme pochopili prečo, musíme sa pozrieť na to, čo multiplication **RT R** skutočne robí.

---

## 23. Prečo RT R obsahuje dot products columns

Predstavme si, že rotation matrix zapíšeme ako:

**R = [r1 r2 r3]**

kde r1, r2 a r3 sú jej columns - teda tri coordinate axes.

Po transpose dostaneme matrix, v ktorej sa pôvodné columns stanú rows.

Pri multiplication **RT R** preto vznikajú combinations typu:

**r1 . r1**

**r1 . r2**

**r1 . r3**

a tak ďalej.

Výsledok vyzerá schematicky takto:

$$[ r1.r1  r1.r2  r1.r3 ]$$
$$[ r2.r1  r2.r2  r2.r3 ]$$
$$[ r3.r1  r3.r2  r3.r3 ]$$

Teraz použijeme vlastnosti správneho reference frame.

Každý axis je unit vector, takže:

**r1.r1 = 1**

**r2.r2 = 1**

**r3.r3 = 1.**

Rôzne axes sú perpendicular, takže:

**r1.r2 = 0**

**r1.r3 = 0**

**r2.r3 = 0.**

Výsledkom je:

$$[ 1  0  0 ]$$
$$[ 0  1  0 ]$$
$$[ 0  0  1 ]$$

čiže:

**RT R = I.**

Táto equation teda nie je nejaké abstraktné pravidlo vytvorené bez dôvodu. Je to kompaktný spôsob, ako povedať:

> Columns rotation matrix sú unit vectors a sú navzájom perpendicular.

---

## 24. Orthogonal matrix ešte nemusí byť správna rotation matrix

Tu vzniká ďalší jemný problém.

Podmienka:

**RT R = I**

zabezpečí, že columns sú unit vectors a navzájom perpendicular.

Stále však existujú dva spôsoby, ako môžeme vytvoriť trojicu kolmých unit axes.

Môžu tvoriť:

**right-handed frame**

alebo

**left-handed frame**.

Modern Robotics používa iba right-handed frames.

Potrebujeme teda ešte jednu podmienku, ktorá tieto dve možnosti rozlíši.

---

## 25. Determinant rozlíši right-handed a left-handed frame

Na to použijeme **determinant** matrix.

Pre správnu 3D rotation matrix požadujeme:

**det R = 1.**

Ak by frame bol left-handed, dostali by sme:

**det R = -1.**

Prečo determinant dokáže tento rozdiel zachytiť?

Pre 3 x 3 matrix s columns **a, b, c** možno determinant zapísať ako:

**det R = c . (a x b)**

pričom **x** je cross product.

Pri right-handed frame platí:

**a x b = c.**

Preto:

**det R = c . c.**

Keďže c je unit vector:

**c . c = 1.**

Teda:

**det R = 1.**

---

## 26. Čo by sa stalo pri left-handed frame

Pri left-handed frame by platilo:

**a x b = -c.**

Potom:

**det R = c . (-c)**

a teda:

**det R = -1.**

To je dôvod, prečo samotné:

**RT R = I**

ešte nestačí.

Táto podmienka pripúšťa determinant:

**+1 alebo -1.**

Ak však chceme skutočnú rotation matrix v Modern Robotics, pridáme:

**det R = 1.**

Tým odstránime left-handed possibilities.

---

## 27. Prečo det R = -1 nepredstavuje obyčajnú rotation

Predstav si svoju pravú ruku pred zrkadlom.

Zrkadlový obraz vyzerá ako ľavá ruka.

Môžeš pravú ruku akokoľvek otáčať v 3D priestore, ale bez zrkadlenia z nej nevytvoríš ľavú ruku.

Presne podobný problém vzniká pri matrices s determinant -1.

Môžu zachovávať lengths a perpendicularity, ale obsahujú **reflection** - zmenu handedness.

Čistá rotation nič nezrkadlí. Iba objekt otáča.

Preto platná rotation matrix musí mať:

**det R = +1.**

---

## 28. Formálna definícia SO(3)

Teraz už máme všetky ingredients potrebné na formálnu definíciu.

Množina všetkých 3 x 3 real matrices R, ktoré spĺňajú:

**RT R = I**

a

**det R = 1**

sa nazýva:

**special orthogonal group SO(3).**

Zápis:

**R ∈ SO(3)**

teda znamená:

> R je platná 3D rotation matrix.

Názov sa dá pochopiť po častiach. „Orthogonal" súvisí s podmienkou **RT R = I** a zachovaním orthogonality. „Special" označuje dodatočnú požiadavku **det R = +1**, ktorá vylučuje reflections.

Číslo **3** znamená, že ide o rotations v 3-dimensional priestore.

---

## 29. SO(2) ako planar verzia

Pre 2D rotations používame podobnú množinu:

**SO(2).**

Obsahuje všetky 2 x 2 rotation matrices, ktoré spĺňajú rovnaké základné podmienky:

**RT R = I**

a

**det R = 1.**

Každú matrix v SO(2) môžeme zapísať ako:

$$[ cos θ  -sin θ ]$$
$$[ sin θ  cos θ ]$$

kde θ môže reprezentovať ľubovoľnú planar orientation.

SO(2) teda reprezentuje planar orientations, zatiaľ čo SO(3) reprezentuje spatial orientations.

---

## 30. SO(2) má jeden DOF, SO(3) tri

Toto pekne súvisí s Chapter 2.

Planar rigid body má iba jeden orientation DOF. Stačí angle θ. Preto orientation časť jeho C-space súvisí s **SO(2)**.

Spatial rigid body má tri orientation DOF. Jeho orientations reprezentujeme pomocou **SO(3)**.

Rotation matrix v SO(3) má síce deväť entries, ale constraints spôsobia, že stále reprezentuje iba tri independent continuous DOF.

To je presne dôvod, prečo by sme nemali zamieňať:

**počet numbers v reprezentácii**

s

**počtom degrees of freedom systému.**

---

## 31. Prečo sa SO(3) nazýva group

Označenie **group** tu nie je iba všeobecné slovo. Ide o presný matematický pojem.

Intuitívne môžeme group chápať ako množinu operations, ktoré sa dajú medzi sebou skladať a stále zostávame v rovnakej množine.

Pri rotations je to veľmi prirodzené.

Predstav si robotický gripper. Najprv ho otočíš o jednu rotation a potom o druhú. Výsledkom je stále nejaká platná rotation.

Ak máš rotation a chceš ju „zrušiť", existuje inverse rotation, ktorá vráti gripper do pôvodnej orientation.

A existuje aj rotation, ktorá neurobí vôbec nič - **identity rotation**.

Práve tieto vlastnosti vedú k group structure.

---

## 32. Closure: dve rotations za sebou sú stále rotation

Ak máme:

**R1 ∈ SO(3)**

a:

**R2 ∈ SO(3),**

potom ich product:

**R1 R2**

je opäť rotation matrix.

Tomuto hovoríme **closure**.

Fyzicky je to úplne prirodzené.

Ak robotický gripper najprv otočíš o jednu platnú rotation a potom o druhú, výsledok nemôže prestať byť platnou orientation. Jednoducho skončí v tretej orientation.

Matematicky sa dá overiť, že product stále spĺňa:

**(R1 R2)T (R1 R2) = I**

a:

**det(R1 R2) = 1.**

Preto:

**R1 R2 ∈ SO(3).**

---

## 33. Identity rotation

Každá group musí obsahovať **identity element**.

Pri rotation matrices je to identity matrix:

$$I =$$
$$[ 1  0  0 ]$$
$$[ 0  1  0 ]$$
$$[ 0  0  1 ]$$

Čo táto matrix fyzicky znamená?

Žiadnu rotation.

Ak vector vynásobíme identity matrix, zostane rovnaký. Ak orientation skombinujeme s identity rotation, orientation sa nezmení.

Pre ľubovoľnú rotation matrix R preto platí:

**R I = I R = R.**

Predstav si príkaz:

„Otoč gripper o 0°."

To je fyzická interpretácia identity rotation.

---

## 34. Každá rotation má inverse

Predstav si, že robotický gripper otočíme o 40° určitým smerom.

Musí existovať motion, ktorý túto rotation zruší a vráti ho presne späť.

To je **inverse rotation**.

Pre rotation matrix R označíme inverse:

**R-1.**

Platí:

**R R-1 = R-1 R = I.**

Rotation matrices majú pritom mimoriadne praktickú vlastnosť:

**R-1 = RT.**

Inverse teda nemusíme počítať všeobecným matrix-inverse algoritmom. Stačí matrix transponovať.

---

## 35. Prečo platí R-1 = RT

Už sme si ukázali základnú vlastnosť rotation matrix:

**RT R = I.**

Definícia inverse matrix hovorí, že inverse matrix R-1 musí spĺňať:

**R-1 R = I.**

Porovnaj obe equations:

**RT R = I**

**R-1 R = I.**

Z toho priamo vyplýva:

**R-1 = RT.**

Toto nie je náhoda. Vzniká to práve preto, že columns rotation matrix tvoria orthonormal axes.

---

## 36. Fyzický význam transpose ako inverse rotation

Predstav si, že rotation matrix R otočí frame z orientation A do orientation B.

Ak chceme ísť opačným smerom, z B späť do A, potrebujeme inverse rotation.

A tú dostaneme jednoducho:

**RT.**

Toto bude mimoriadne dôležité pri changes of reference frame. Ak poznáme orientation frame {b} vzhľadom na {a}, inverse nám prirodzene dá orientation {a} vzhľadom na {b}.

Neskôr to zapíšeme napríklad:

**Rab-1 = Rba**

a zároveň:

**RabT = Rba.**

---

## 37. Associativity: záleží na zoskupení?

Ďalšou group property je **associativity**.

Pre tri rotations platí:

**(R1 R2) R3 = R1 (R2 R3).**

To znamená, že keď máme tri matrix multiplications, môžeme zmeniť spôsob ich zoskupenia bez zmeny výsledku.

Dôležité je však všimnúť si, čo associativity **nehovorí**.

Nehovorí, že môžeme meniť poradie rotations.

Poradie factors zostáva:

**R1, R2, R3.**

Meníme iba parentheses.

---

## 38. Rotation matrices v 3D vo všeobecnosti nekomutujú

Toto je jedna z najdôležitejších vlastností rotations:

**R1 R2 ≠ R2 R1**

vo všeobecnosti.

Matrix multiplication rotation matrices teda nie je **commutative**.

Fyzicky to znamená, že pri 3D rotations záleží na poradí.

Predstav si mobilný telefón položený obrazovkou hore. Najprv ho otočíš o 90° okolo jednej osi a potom o 90° okolo druhej.

Potom začni znova z pôvodnej orientation, ale vykonaj tie isté dve rotations v opačnom poradí.

Telefón vo všeobecnosti skončí otočený inak.

Preto:

**rotation A - rotation B**

nie je všeobecne rovnaká ako:

**rotation B - rotation A.**

---

## 39. Associative neznamená commutative

Tieto dva pojmy sa veľmi ľahko zamieňajú.

**Associativity** hovorí:

**(R1 R2) R3 = R1 (R2 R3).**

Poradie sa nemení.

**Commutativity** by znamenala:

**R1 R2 = R2 R1.**

Tu sa poradie mení.

Rotation matrices v SO(3) sú associative, pretože matrix multiplication je associative.

Vo všeobecnosti však **nie sú commutative**.

Pri 3D rotations teda na poradí transformations veľmi záleží.

---

## 40. Zaujímavá výnimka: planar rotations komutujú

Pri SO(2) je situácia jednoduchšia.

Planar rotation sa môže diať iba okolo jednej osi kolmej na rovinu. Ak najprv otočíme objekt o angle alpha a potom o beta, výsledná rotation je:

**alpha + beta.**

Ak poradie otočíme:

**beta + alpha**

dostaneme rovnaký výsledok, pretože obyčajné sčítanie angles komutuje.

Preto pri SO(2):

**R1 R2 = R2 R1.**

V SO(3) však máme rôzne possible rotation axes, takže táto vlastnosť vo všeobecnosti prestáva platiť.

---

## 41. Rotation musí zachovávať length vectora

Ďalšia veľmi dôležitá vlastnosť rotation matrix je, že **nemení length vectora**.

Ak máme vector x a otočíme ho:

**y = Rx,**

potom:

**||y|| = ||x||.**

Fyzicky je to samozrejmé.

Predstav si šípku dlhú jeden meter. Ak ju iba otočíš, stále má jeden meter. Rotation môže zmeniť jej direction, ale nie jej length.

Ak by matrix length zmenila, nešlo by o čistú rotation. Obsahovala by scaling alebo inú deformáciu.

---

## 42. Prečo rotation zachováva length

Length vectora x môžeme zapísať cez dot product:

**||x||² = xT x.**

Po rotation máme:

**y = Rx.**

Preto:

**||y||² = yT y.**

Dosadíme y = Rx:

**||y||² = (Rx)T (Rx).**

Transpose productu dá:

**(Rx)T = xT RT.**

Takže:

**||y||² = xT RT R x.**

A teraz využijeme základnú vlastnosť rotation matrix:

**RT R = I.**

Dostaneme:

**||y||² = xT I x**

a identity matrix nič nemení:

**||y||² = xT x = ||x||².**

Teda:

**||y|| = ||x||.**

Takto priamo z podmienky **RT R = I** vyplýva, že rotation nemení length.

---

## 43. Čo zachovanie length znamená pre rigid body

Táto vlastnosť je presne to, čo od rigid-body rotation fyzicky očakávame.

Predstav si tri points na kovovej platni. Keď platňu otočíš, distances medzi týmito points sa nezmenia.

Ak je distance medzi dvoma dierami 20 cm pred rotation, musí byť 20 cm aj po nej.

Rotation matrix preto nepredstavuje stretching, shrinking ani shear.

Predstavuje iba zmenu orientation.

A to je dôvod, prečo je tak vhodná na opis rigid bodies.

---

## 44. Rotation matrix nie je „matrix s angles"

Častá chyba začiatočníka je pozerať sa na jednotlivé entries rotation matrix ako na angles.

To nie sú angles.

Entries ako:

**r11, r21, r31**

sú **components unit axes**.

Napríklad prvý column hovorí, aké components má body x-axis v coordinates druhého frame.

Angles sú v matrix ukryté nepriamo cez geometry. V planar prípade sa objavia ako cos θ a sin θ, ale jednotlivá hodnota v matrix sama osebe nie je „angle".

Toto rozlíšenie bude neskôr veľmi dôležité pri čítaní 3D rotation matrices.

---

## 45. Deväť entries neznamená deväť nezávislých rozhodnutí

Predstav si, že chceš zostaviť frame ručne.

Vyberieš direction prvej axis. Už tým obmedzíš possibilities pre ostatné dve.

Druhá axis musí byť perpendicular na prvú. Keď vyberieš aj ju, tretia axis je pri right-handed convention prakticky určená cross productom prvých dvoch.

Preto deväť entries rotation matrix nevytvára deväť DOF.

Mnohé z týchto numbers sú dôsledkom ostatných.

Presne toto je podstata constraints v implicit representation.

---

## 46. Rotation matrices prepájajú Chapter 2 a Chapter 3

V Chapter 2 sme sa učili pozerať na configuration cez degrees of freedom a constraints.

Rotation matrix je prvý veľký konkrétny príklad toho, ako sa tieto myšlienky používajú v praxi.

Spatial orientation má:

**3 DOF.**

My ju však reprezentujeme:

**9 numbers.**

Tieto numbers podliehajú constraints:

**RT R = I**

a požiadavke:

**det R = 1.**

Tak získame praktickú, redundantnú, ale veľmi užitočnú representation orientation.

To je presne dôvod, prečo sme v Chapter 2 rozlišovali medzi dimension samotného C-space a počtom numbers použitých na jeho reprezentáciu.

---

## Rekapitulácia najdôležitejších pojmov

**Orientation** opisuje, ako je rigid body natočené. V 3D má tri degrees of freedom a nestačí naň jeden angle ako pri planar motion.

**Rotation matrix R** je 3 x 3 matrix reprezentujúca spatial orientation. Jej tri columns predstavujú directions troch axes jedného reference frame vyjadrené v coordinates druhého frame.

**SO(2)** je množina platných planar rotation matrices. Každú planar orientation možno reprezentovať 2 x 2 matrix odvodenou od jediného angle θ.

**SO(3)** je množina všetkých platných 3 x 3 spatial rotation matrices.

**Unit norm constraint** znamená, že každý column rotation matrix musí mať length 1, pretože reprezentuje unit coordinate axis.

**Orthogonality constraint** znamená, že rôzne columns musia mať dot product 0. Tým zabezpečíme, že coordinate axes sú navzájom perpendicular.

**RT R = I** je kompaktný zápis unit-length a orthogonality conditions. Diagonal values výsledku sú 1 a off-diagonal values sú 0.

**det R = 1** zabezpečuje, že rotation matrix predstavuje right-handed frame. Matrix s det R = -1 by obsahovala zmenu handedness, napríklad reflection.

**Implicit representation** používa viac numbers než je počet DOF, ale tieto numbers podliehajú constraints. Rotation matrix používa deväť entries na reprezentáciu orientation s tromi DOF.

**Closure** znamená, že product dvoch rotation matrices je opäť rotation matrix.

**Identity rotation I** predstavuje nulovú rotation. Kombinácia ľubovoľnej rotation R s I nechá R nezmenenú.

**Inverse rotation** zruší pôvodnú rotation. Pre rotation matrices platí mimoriadne užitočný vzťah **R-1 = RT**.

**Associativity** znamená, že pri troch rotations môžeme meniť grouping: **(R1 R2) R3 = R1 (R2 R3)**.

**Noncommutativity** znamená, že v 3D vo všeobecnosti záleží na poradí rotations: **R1 R2 ≠ R2 R1**. Planar rotations v SO(2) sú v tomto špeciálne, pretože komutujú.

**Length preservation** znamená, že rotation nemení length vectora. Ak **y = Rx**, potom **||y|| = ||x||**.

---

## Čo si z tejto lekcie odniesť

Rotation matrix vzniká z veľmi jednoduchej geometrickej myšlienky. Ak chceme poznať orientation rigid body, môžeme sledovať, kam smerujú jeho tri body axes. Každú axis vyjadríme pomocou coordinates zvoleného reference frame a tieto tri vectors uložíme ako columns jednej 3 x 3 matrix.

Nie každá 3 x 3 matrix však môže predstavovať rotation. Columns musia byť unit vectors, pretože coordinate axes majú jednotkovú dĺžku, a musia byť navzájom perpendicular. Tieto podmienky sa elegantne spoja do vzťahu **RT R = I**. Aby sme navyše zabezpečili right-handed orientation a vylúčili reflections, požadujeme **det R = 1**. Množinu všetkých matrices spĺňajúcich tieto podmienky nazývame **SO(3)**.

Tu sa priamo prepája Chapter 3 s tým, čo sme sa naučili o C-space v Chapter 2. Orientation má iba tri DOF, ale rotation matrix obsahuje deväť entries. Rozdiel je spôsobený tým, že entries nie sú nezávislé. Rotation matrix je teda implicit representation: používa viac numbers, no constraints zabezpečujú, že stále opisuje iba trojrozmerný priestor orientations.

Rotation matrices majú navyše vlastnosti, vďaka ktorým sú mimoriadne praktické. Dve rotations môžeme skladať matrix multiplication, existuje identity rotation, každá rotation má inverse a tento inverse je jednoducho transpose matrix. Rotation tiež zachováva lengths, čo presne zodpovedá fyzikálnemu významu rigid-body motion - teleso sa otáča, ale nedeformuje.

Veľmi dôležitá je aj skutočnosť, že spatial rotations vo všeobecnosti **nekomutujú**. Poradie dvoch rotations môže zmeniť výslednú orientation. To sa stane zásadné v ďalšej časti, pretože rotation matrix nebudeme používať iba ako pasívny opis orientation. Budeme ju používať aj ako operator na zmenu reference frame a na samotné otáčanie vectors a frames.

Práve tým pokračuje **Chapter 3.2.1 - Rotation Matrices, Part 2 of 2**: z otázky „Ako matrix reprezentuje orientation?" prejdeme k otázkam **„Ako pomocou nej zmením reference frame?"** a **„Ako pomocou nej skutočne otočím vector alebo frame?"**`;
