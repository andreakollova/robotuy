// Chapter 3.2.1 – Rotation Matrices (Part 1 of 2)
// Full lesson content - DO NOT SHORTEN

export const ch321p1Content = `# Rotation Matrix - od úplného základu

## 1. Čo sa vlastne snažíme opísať?

Predtým, než sa dostaneme k samotnej rotation matrix (rotačná matica), je dôležité pochopiť problém, ktorý pomocou nej riešime. Predstav si robotické rameno stojace na stole. Miestnosť alebo pracovný priestor robota má svoj vlastný coordinate frame (súradnicová sústava), ktorý označíme **{s}** ako **space frame** (priestorový frame). Ma tri osi **x̂ₛ**, **ŷₛ** a **ẑₛ**. Môžeme si napríklad predstaviť, že x̂ₛ smeruje doprava po stole, ŷₛ smeruje dopredu a ẑₛ smeruje nahor.

Robot však môže mať ďalší coordinate frame pripevnený napríklad ku svojmu ramenu, kamere alebo gripperu. Ten označíme **{b}** ako **body frame** (teleso frame) a má svoje vlastné osi **x̂ᵦ**, **ŷᵦ** a **ẑᵦ**. Ked sa robotické rameno otočí, otočí sa spolu s ním aj celý jeho body frame. Osi x̂ᵦ, ŷᵦ, ẑᵦ preto už nemusia smerovať rovnakým smerom ako osi x̂ₛ, ŷₛ, ẑₛ.

Práve tu vzniká problém, ktorý potrebujeme matematicky vyriesit: **Ako presne opíšeme, ako je frame {b} natočený vzhľadom na frame {s}?** Odpoveďou je rotation matrix.

---

## 2. Prečo vôbec potrebujeme viac coordinate frames?

Coordinate frame si môžeš predstaviť ako vlastny pohľad určitého objektu na svet. Veľmi dobrým príkladom je auto. Keď sedíš za volantom, prirodzene používaš smery "dopredu", "dozadu", "dolava" a "doprava". Ak niekto povie, že prekážka je dva metre pred autom, tento opis dáva zmysel vzhľadom na auto. Lenže mapa mesta môže používať úplne iné smery, napriklad sever a vychod.

Predstav si, že auto práve smeruje na sever. "Dopredu" z pohľadu auta teda znamená "na sever" z pohľadu mapy. Ak sa auto otočí doprava a začne smerovať na vychod, jeho vlastný smer "dopredu" sa nezmenil - vodič má stále pred sebou prednú časť auta. Z pohľadu mapy však tento smer teraz znamená vychod.

Presne rovnaký problém má robot. Kamera môže povedať: "Objekt sa nachádza predo mnou." Robot však potrebuje vedieť, čo znamená "predo mnou" z pohladu svojho hlavného coordinate frame. Roboticke rameno môže mať dokonca desiatky rôznych frames: jeden na základni, ďalší na jednotlivých joints, ďalší na gripperi a ďalší na kamere. Preto musí existovať spôsob, ako medzi týmito pohľadmi matematicky prechádzať.

Rotation matrix je jeden zo základných nástrojov, ktorý toto umožňuje.

---

## 3. Čo je teda rotation matrix?

Rotation matrix je matica, ktorá opisuje **orientaciu** (orientation) jedneho coordinate frame vzhľadom na iný coordinate frame. To je veľmi dôležité odlíšiť od **polohy** (position). Ak položím telefón na stôl a otočím ho o 90°, jeho stred môže zostať presne na rovnakom mieste, ale jeho orientácia sa zmenila. Rotation matrix opisuje práve túto orientáciu.

Predstav si dva coordinate frames, **{s}** a **{b}**. Ak chcem vediet, ako je {b} orientovaný vzhľadom na {s}, stačí mi v podstate zodpovedať tri otázky: Kam z pohladu {s} smeruje os x̂ᵦ? Kam smeruje ŷᵦ? A kam smeruje ẑᵦ?

Keď poznám odpovede na tieto tri otázky, poznám orientáciu celého {b} frame. Nie je potrebné vedieť nič ďalšie. Ak totiž viem, kam smeruju všetky jeho tri osi, jednoznačne viem, ako je celý coordinate frame natočený.

A práve tieto tri odpovede uložíme do rotation matrix.

---

## 4. Co znamena Rₛᵦ?

Zapis **Rₛᵦ** má presný význam. Indexy **s** a **b** nie sú náhodné. Hovoria nam, ktory frame opisujeme a vzhľadom na ktory frame ho opisujeme. V pripade Rₛᵦ opisujeme orientáciu body frame {b} pomocou coordinate frame {s}.

Jednoduchy sposob, ako si to predstavovat:

**Rₛᵦ = ako vyzera orientácia {b} z pohladu {s}**

Predstav si, že stojíš v miestnosti a sledujes robota. Miestnost predstavuje {s} a robot predstavuje {b}. Rₛᵦ ti hovori, ako vidis robotove osi zo svojho pevneho pohladu v miestnosti.

Toto bude neskor velmi dôležité, pretoze môžeme mat aj Rᵦc, Rₛc, Rᵦₛ a podobne. Poradie indexov teda nesmieme ignorovat.

---

## 5. Čo presne vidíme na tomto obrázku?

![Dva coordinate frames - space frame {s} a body frame {b} s posunutím p a otočením o uhol θ](/book/ch3/fig3-3.png)

Na obrázku máme dva coordinate frames. Prvý je pevný space frame **{s}**, ktorý si môžeš predstaviť ako coordinate system celej miestnosti alebo sveta. Jeho začiatok je vľavo dole a vidíme jeho dve osi: **x̂ₛ** smeruje doprava a **ŷₛ** smeruje nahor. Keďže obrázok je nakreslený v 2D, os ẑₛ tu nevidíme - predstavovali by sme si ju ako smerujúcu kolmo von z obrázka.

Druhý coordinate frame je body frame **{b}**. Ten si môžeš predstaviť ako coordinate frame pevne pripevnený k nejakému objektu, napríklad k robotovi. Preto sa jeho osi pohybujú a otáčajú spolu s objektom. Na obrázku je {b} posunutý doprava a nahor oproti {s} a zároveň je aj otočený. Jeho **x̂ᵦ** preto už nesmeruje doprava ako x̂ₛ, ale šikmo doprava nahor. Jeho **ŷᵦ** zase smeruje šikmo doľava nahor.

Tu je veľmi dôležité oddeliť dve rôzne informácie: **kde sa {b} nachádza** a **ako je {b} otočený**. Obrázok nám ukazuje obe.

### Kde sa frame {b} nachádza? To opisuje p

Najprv sa pozri na dlhú tenkú šípku označenú **p**, ktorá ide zo začiatku {s} do začiatku {b}. Táto šípka nám hovorí, kde sa origin body frame {b} nachádza vzhľadom na origin space frame {s}.

Na mriežke vidíme, že z {s} musíme ísť približne dve jednotky doprava a jednu jednotku nahor, aby sme sa dostali do {b}. Preto je:

**p = (2, 1)**

Čítaj to jednoducho ako: "Origin {b} je 2 jednotky v smere x̂ₛ a 1 jednotku v smere ŷₛ od originu {s}."

Všimni si, že **p** nemá striešku. Nie je to unit vector, ktorým by sme chceli označiť iba smer. Je to vector, ktorý tu opisuje posunutie medzi dvoma origins, a preto môže mať ľubovoľnú dĺžku.

Predstav si napríklad robota stojaceho v sklade. {s} môže byť coordinate frame celého skladu a {b} coordinate frame robota. Vector p nám povie: "Kde v sklade sa robot nachádza?" Ale samotné p nám ešte vôbec nepovie, kam je robot otočený.

![Body frame {b} otočený o θ = 60° vzhľadom na space frame {s}](/book/ch3/fig3-3.png)

### Ako zistíme, ako je {b} otočený?

Teraz na chvíľu zabudnime na p a pozrime sa iba na hrubé šípky x̂ᵦ a ŷᵦ.

Položíme si presne rovnakú otázku ako predtým: **Kam smeruje x̂ᵦ, keď sa naň pozeráme z coordinate frame {s}?**

Na obrázku vidíme, že x̂ᵦ už nesmeruje presne po x̂ₛ. Je od x̂ₛ otočený proti smeru hodinových ručičiek o uhol **θ**. V tomto konkrétnom príklade je:

**θ = 60°**

To znamená, že x̂ᵦ má jednu časť v smere x̂ₛ a druhú časť v smere ŷₛ.

A práve tu prichádzajú **cos θ** a **sin θ**.

![Body frame {b} otočený o θ = 60° vzhľadom na space frame {s}](/book/ch3/fig3-3.png)

### Prečo je x̂ᵦ = (cos θ, sin θ)?

Predstav si šípku x̂ᵦ ako preponu pravouhlého trojuholníka. Keďže nad x̂ᵦ máme striešku, ide o unit vector, takže jeho dĺžka je presne **1**.

Jeho horizontálna časť - teda koľko z neho smeruje pozdĺž x̂ₛ - je **cos θ**.

Jeho vertikálna časť - teda koľko z neho smeruje pozdĺž ŷₛ - je **sin θ**.

Preto:

**x̂ᵦ = (cos θ, sin θ)** vyjadrené v {s}

Pri θ = 60° dostaneme cos 60° = 0,5 a sin 60° ≈ 0,866. Takže:

**x̂ᵦ = (0,5, 0,866)** vyjadrené v {s}

Čo to fyzicky znamená? Ak by si išla jednu jednotku v smere x̂ᵦ, z pohľadu pevnej mriežky {s} by si sa posunula približne 0,5 jednotky doprava a 0,866 jednotky nahor.

A stále ide o unit vector, pretože sqrt(0,5² + 0,866²) ≈ 1. Otočenie totiž zmenilo jeho smer, nie jeho dĺžku.

![Body frame {b} otočený o θ = 60° vzhľadom na space frame {s}](/book/ch3/fig3-3.png)

### A čo ŷᵦ?

Teraz položíme druhú otázku: **Kam smeruje ŷᵦ, keď sa naň pozeráme z {s}?**

Na obrázku smeruje šikmo doľava nahor. Preto bude jeho x̂ₛ zložka záporná, pretože smeruje proti kladnému smeru x̂ₛ. Jeho ŷₛ zložka bude kladná, pretože stále smeruje nahor.

Preto:

**ŷᵦ = (-sin θ, cos θ)** vyjadrené v {s}

Pri 60°:

**ŷᵦ = (-0,866, 0,5)** vyjadrené v {s}

Čítaj to veľmi konkrétne: "Ak prejdem jednu jednotku v kladnom smere ŷᵦ, z pohľadu {s} prejdem približne 0,866 jednotky doľava a 0,5 jednotky nahor." Preto je prvé číslo záporné a druhé kladné.

![Body frame {b} otočený o θ = 60° vzhľadom na space frame {s}](/book/ch3/fig3-3.png)

### Prečo je ŷᵦ práve takto otočené voči x̂ᵦ?

Pretože coordinate frame nemôžeme nakresliť tak, že jeho osi smerujú hocijako. Osi x̂ᵦ a ŷᵦ musia zostať na seba kolmé, teda zvierať 90°.

Ak je x̂ᵦ otočené o 60° od x̂ₛ, potom ŷᵦ musí byť ďalších 90° od x̂ᵦ: 60° + 90° = 150°. A smer 150° je presne smer šikmo doľava nahor, ktorý vidíš na obrázku.

Preto sa neotáča iba jedna os. Keď otočíš celý body frame, všetky jeho osi sa otočia spolu a ich vzájomný pravý uhol zostáva zachovaný.

Predstav si súradnice nakreslené fixkou na kuse kartónu. Keď kartón otočíš o 60°, nemôže sa otočiť iba nakreslené x a y zostať na mieste. Obe osi sú súčasťou jedného frame, takže sa otočia spolu.

![Body frame {b} otočený o θ = 60° vzhľadom na space frame {s}](/book/ch3/fig3-3.png)

### Čo teda celý obrázok hovorí?

Teraz už môžeme obrázok čítať ako veľmi jednoduchý príbeh.

Máme pevný world/space frame {s}. Niekde inde sa nachádza objekt s vlastným body frame {b}.

A na úplný opis {b} potrebujeme odpovedať na dve rozdielne otázky.

**Prvá otázka: Kde sa {b} nachádza?**

Odpoveď dáva vector **p = (2, 1)**. Origin {b} je dve jednotky doprava a jednu nahor od originu {s}.

**Druhá otázka: Ako je {b} otočený?**

Odpoveď dostaneme z jeho unit axes:

**x̂ᵦ = (cos θ, sin θ)** a **ŷᵦ = (-sin θ, cos θ)**, kde θ = 60°.

Čiže veľmi zjednodušene:

**p = kde je body frame**

**θ / smery x̂ᵦ, ŷᵦ = ako je body frame otočený**

### Prečo je toto dôležité pre robotiku?

Predstav si mobilného robota na podlahe skladu. Robot môže byť na súradniciach (2, 1), ale to ešte nestačí na to, aby sme vedeli jeho celý pose.

Robot môže na bode (2, 1) smerovať doprava, nahor, doľava alebo šikmo. Vo všetkých prípadoch by mal rovnaké p = (2, 1), ale inú orientation.

Preto potrebujeme dve informácie: **position + orientation**.

V tomto obrázku position reprezentuje p a orientation reprezentujú smery body axes, ktoré môžeme uložiť do rotation matrix.

Takže keby si sa pri tomto obrázku stratila, ignoruj na chvíľu všetku matematiku a polož si iba: **Kde je robot?** To ti povie p. A potom: **Kam má robot otočený svoj vlastný "predok" a svoju vlastnú "ľavú stranu"?** To ti povedia x̂ᵦ a ŷᵦ.

A presne tieto dve veci - kde objekt je a ako je otočený - spolu neskôr vytvoria základ pre opis jeho configuration/pose v priestore.

---

## 6. Prečo je x̂ᵦ = (0, 1, 0)?

Zacnime osou x̂ᵦ.

Aby sme pochopili, odkial sa čísla vzali, musime najprv pochopit význam samotneho vektora. Ked pracujeme v coordinate frame {s}, jeho tri zakladne smery môžeme zapisat ako:

**x̂ₛ = (1, 0, 0)**

**ŷₛ = (0, 1, 0)**

**ẑₛ = (0, 0, 1)**

Prve číslo vzdy hovori, koľko vektora smeruje pozdĺž x̂ₛ, druhe hovori, koľko smeruje pozdĺž ŷₛ, a tretie hovori, koľko smeruje pozdĺž ẑₛ.

Napriklad **(1, 0, 0)** znamena: "idem úplne v smere x̂ₛ, vobec nejdem v smere ŷₛ a vobec nejdem v smere ẑₛ." Preto je to jednoducho smer osi x̂ₛ.

Podobne **(0, 1, 0)** znamena: "nemam ziadnu cast v smere x̂ₛ, cela moja dlzka smeruje pozdĺž ŷₛ a nemam ziadnu cast v smere ẑₛ." Je to teda presne smer ŷₛ.

A teraz sa pozri na x̂ᵦ na obrazku. Šípka x̂ᵦ smeruje presne rovnakým smerom ako šípka ŷₛ. Preto môžeme povedat:

**x̂ᵦ = ŷₛ**

Kedze smer ŷₛ zapisujeme ako **(0, 1, 0)**, dostávame:

**x̂ᵦ = (0, 1, 0)**

Nie je za tym ziadny zvláštny výpočet. Jednoducho sme sa pozreli, kam smeruje x̂ᵦ z pohladu coordinate frame {s}.

---

## 7. Prečo je ŷᵦ = (-1, 0, 0)?

Teraz urobime presne to isté s druhou osou.

Pozri sa na šípku ŷᵦ. Ta smeruje presne opačne ako x̂ₛ. Ak x̂ₛ predstavuje jeden smer, potom opačný smer zapisujeme znamienkom minus:

**ŷᵦ = -x̂ₛ**

Kedze x̂ₛ = (1, 0, 0), potom -x̂ₛ = (-1, 0, 0).

Preto:

**ŷᵦ = (-1, 0, 0)**

Číslo **-1** teda neznamena nič komplikovane. Znamena jednoducho: smerujem presne opacnym smerom ako kladná os x̂ₛ.

Je to rovnaké ako pri ceste. Ak si povieme, že vychod je kladny smer, západ môžeme povazovat za záporný smer. +1 by znamenalo vychod a -1 zapad.

---

## 8. Prečo je ẑᵦ = (0, 0, 1)?

Pri tretej osi je situácia najjednoduchsia. Na obrazku vidis, že ẑᵦ a ẑₛ smeruju presne rovnakým smerom nahor. Preto:

**ẑᵦ = ẑₛ**

A kedze ẑₛ = (0, 0, 1), dostaneme:

**ẑᵦ = (0, 0, 1)**

To nam zároveň prezrádza nieco o samotnom otoceni. Kedze sa smer osi z vobec nezmenil, frame {b} bol v tomto priklade otočený okolo osi z. Predstav si ceruzku postavenu kolmo na stol a papier polozeny vodorovne okolo nej. Papier môžeš otáčať okolo ceruzky. Smery x a y na papieri sa menia, ale smer ceruzky - teda os z - zostáva rovnaky.

---

## 9. A z tychto troch vektorov vznikne rotation matrix

Teraz už poznáme všetky tri osi {b} vyjadrene pomocou {s}:

**x̂ᵦ = (0, 1, 0)**

**ŷᵦ = (-1, 0, 0)**

**ẑᵦ = (0, 0, 1)**

Rotation matrix vytvorime tak, že tieto tri vektory jednoducho vlozime vedla seba ako stlpce:

**Rₛᵦ = [ x̂ᵦ  ŷᵦ  ẑᵦ ]**

Keď ich tam dosadime, dostaneme:

$$[  0  -1   0 ]$$
$$[  1   0   0 ]$$
$$[  0   0   1 ]$$

A toto je presne rotation matrix z obrazku.

Toto je velmi dolezity moment: rotation matrix nie je devat nahodnych čísel opisujucich nejake abstraktné otocenie. Je to jednoducho miesto, kam sme vedla seba ulozili tri osi jedneho coordinate frame vyjadrene pomocou druheho coordinate frame.

---

## 10. Ako mas rotation matrix "citat"

Keď odteraz uvidis rotation matrix, nesnaz sa na nu pozerat ako na tabulku deviatich cisel. Mentalne si ju rozdel na tri stlpce.

Prvy stĺpec **(0, 1, 0)** je odpoveď na otázku: Kam smeruje x̂ᵦ, keď sa nan pozeram zo {s}?

Druhy stĺpec **(-1, 0, 0)** odpoveda: Kam smeruje ŷᵦ?

A treti stĺpec **(0, 0, 1)** odpoveda: Kam smeruje ẑᵦ?

Preto si môžeš zapamätať velmi uzitocny obraz:

**Rₛᵦ = [ x̂ᵦ  ŷᵦ  ẑᵦ ] vyjadrene v {s}**

Rotation matrix je teda v podstate fotografia troch osi {b} urobena z pohladu {s}, iba namiesto fotografie používame cisla.

---

## 11. Ale preco su tie vektory prave stlpce?

Tuto cast spravme uplne od nuly, pretoze predtym sme prilis rychlo zacali pouzivat zapisy ako vᵦ a vₛ bez toho, aby bolo jasne, co je vlastne v, odkial sa vzalo a co znamena male b alebo s.

Najskor teda zabudni na nasobenie matic. Predstav si iba robota stojaceho v miestnosti.

Miestnost ma svoj pevny space frame {s} s osami x̂ₛ, ŷₛ, ẑₛ. Robot ma svoj vlastny body frame {b} s osami x̂ᵦ, ŷᵦ, ẑᵦ.

Robot moze byt voci miestnosti otoceny. Preto jeho x̂ᵦ nemusi smerovat rovnako ako x̂ₛ, jeho ŷᵦ nemusi smerovat rovnako ako ŷₛ a podobne.

A teraz do tejto situacie pridame nejaku sipku. Tato sipka moze predstavovat cokolvek: smer pohybu robota, smer ku prekazke, rychlost robota, smer laseru alebo napriklad smer, ktorym ma robot posunut gripper.

Takuto vseobecnu sipku v matematike nazveme vektor a mozeme jej dat meno **v**.

Cizie:

**v = nejaky vektor, teda nejaka sipka so smerom a velkostou**

Pismeno v nie je nic specialne. Je to iba meno. Rovnako ako by sme cloveka mohli nazvat Peter, tuto sipku sme nazvali v.

### Co potom znamena vᵦ?

Teraz prichadza dolezita vec. Tu istu fyzicku sipku v mozeme opisat pomocou roznych coordinate frames.

Ak ju opiseme pomocou osi robota {b}, napiseme:

**vᵦ**

Male b dole znamena: "Vektor v je zapisany pomocou coordinate frame {b}."

Ak tu istu sipku opiseme pomocou osi miestnosti {s}, napiseme:

**vₛ**

Male s znamena: "Vektor v je zapisany pomocou coordinate frame {s}."

Takze vᵦ a vₛ nemusia byt dve rozne fyzicke sipky. Mozu to byt dva rozne ciselne opisy tej istej sipky.

### Konkretny priklad: robotovo "dopredu"

Predstav si, ze robot je otoceny takto: jeho x̂ᵦ smeruje tam, kam ŷₛ, jeho ŷᵦ smeruje opacne ako x̂ₛ, jeho ẑᵦ smeruje rovnako ako ẑₛ. To je presne nas predchadzajuci priklad.

Teraz vytvorime sipku v, ktora smeruje jeden meter priamo dopredu od robota.

Z pohladu robota je to uplne jednoduche. Robot povie: "Ta sipka ide 1 po mojom x̂ᵦ, 0 po mojom ŷᵦ a 0 po mojom ẑᵦ."

Preto:

**vᵦ = (1, 0, 0)**

Teraz uz presne vieme, co znamena kazdy symbol. v = nasa sipka. Male b = cisla su zapisane pomocou body frame {b}. A (1, 0, 0) znamena: 1 jednotka po x̂ᵦ, 0 po ŷᵦ, 0 po ẑᵦ.

### Ale miestnost tu istu sipku vidi inak

Robot je otoceny. Jeho "dopredu" smeruje z pohladu miestnosti po +ŷₛ.

Preto ked tu istu fyzicku sipku opiseme pomocou space frame {s}, dostaneme:

**vₛ = (0, 1, 0)**

Preco? Pretoze z pohladu miestnosti ide sipka: 0 po x̂ₛ, 1 po ŷₛ, 0 po ẑₛ.

Mame teda:

**vᵦ = (1, 0, 0)** a **vₛ = (0, 1, 0)**

Cisla su ine, ale fyzicka sipka je ta ista.

Predstav si auto smerujuce na sever. Vodic povie: "Brana je presne predo mnou." Clovek pozerajuci sa na mapu povie: "Brana je smerom na sever." Dva rozne opisy, ale jedna brana a jeden smer.

### Na co nam je potom Rₛᵦ?

Teraz mame problem. Robot nam moze dat vᵦ = (1, 0, 0), ale my potrebujeme vediet vₛ.

Potrebujeme teda akysi prekladac medzi coordinate frames. A tym je rotation matrix **Rₛᵦ**.

V tomto pouziti nam umoznuje prelozit coordinates zapisane pomocou {b} do coordinates zapisanych pomocou {s}:

**vₛ = Rₛᵦ · vᵦ**

Citaj tuto rovnicu slovami: "Vezmi vektor v zapisany pomocou body frame {b}, pouzi vztah medzi {b} a {s} a dostanes coordinates toho isteho vektora pomocou space frame {s}."

Az teraz ma zmysel pozriet sa na otazku, preco su axes v rotation matrix ulozene prave ako stlpce.

### Co musi rotation matrix vediet?

Zacnime najjednoduchsim moznym pripadom:

**vᵦ = (1, 0, 0)**

Uz vieme, co to znamena: "Vektor smeruje presne po x̂ᵦ."

Takze ked vypocitame Rₛᵦ · (1, 0, 0), v podstate sa pytame: "Dobre, viem, ze sipka smeruje po x̂ᵦ. Kam smeruje x̂ᵦ z pohladu {s}?"

Rotation matrix nam musi dat odpoved. V nasom priklade vieme, ze x̂ᵦ = (0, 1, 0) v {s}.

Preto ocakavame:

**Rₛᵦ · (1, 0, 0) = (0, 1, 0)**

A teraz sa pozrime, preco prave toto sposobi, ze x̂ᵦ musi byt v prvom stlpci.

### Ako funguje nasobenie matice vektorom?

Mame nasu konkretnu rotation matrix:

$$Rₛᵦ =$$
$$[  0  -1   0 ]$$
$$[  1   0   0 ]$$
$$[  0   0   1 ]$$

Rozdelme si ju mentalne na tri stlpce:

Prvy stlpec: **(0, 1, 0)**

Druhy stlpec: **(-1, 0, 0)**

Treti stlpec: **(0, 0, 1)**

Ked matrix nasobime vektorom, cisla vo vektore hovoria, kolko mame zobrat z jednotlivych stlpcov. To je velmi dolezita myslienka.

### Co spravi (1, 0, 0)?

Cisla 1, 0, 0 hovoria: vezmi 1-krat prvy stlpec, 0-krat druhy stlpec a 0-krat treti stlpec.

Teda:

**1 · (0, 1, 0) + 0 · (-1, 0, 0) + 0 · (0, 0, 1)**

Cokolvek krat nula je nula, takze druhy a treti stlpec zmiznu. Zostane:

**(0, 1, 0)**

Cizie:

**Rₛᵦ · (1, 0, 0) = prvy stlpec Rₛᵦ**

A teraz to spojme s fyzickym vyznamom. Vstup (1, 0, 0) v body frame znamenal: "Smerujem po x̂ᵦ." Preto vysledok musi povedat: "Takto vyzera x̂ᵦ z pohladu {s}." A nasobenie automaticky vybralo prvy stlpec.

Preto: **1. stlpec rotation matrix musi byt x̂ᵦ vyjadrene v {s}.**

To nie je nahodne pravidlo. Vyplyva to priamo z toho, ako funguje matrix multiplication.

### Preco je ŷᵦ v druhom stlpci?

Teraz vezmeme vᵦ = (0, 1, 0). Co to znamena? 0 po x̂ᵦ, 1 po ŷᵦ, 0 po ẑᵦ. Cizie tato sipka smeruje presne po ŷᵦ.

Ked ju chceme prelozit do {s}, vypocitame Rₛᵦ · (0, 1, 0). Cisla 0, 1, 0 povedia: 0-krat prvy stlpec + 1-krat druhy stlpec + 0-krat treti stlpec.

Preto zostane iba druhy stlpec: **(-1, 0, 0)**

A to presne sedi s nasim obrazkom: ŷᵦ = -x̂ₛ.

Preto: **2. stlpec rotation matrix je ŷᵦ vyjadrene v {s}.**

### A preco je ẑᵦ v tretom stlpci?

Teraz uz pravdepodobne vidis vzor. Mame vᵦ = (0, 0, 1). To znamena: smerujeme presne po ẑᵦ.

Nasobenie Rₛᵦ · (0, 0, 1) vezme: 0-krat prvy stlpec + 0-krat druhy stlpec + 1-krat treti stlpec. Zostane: **(0, 0, 1)**

Preto: **3. stlpec rotation matrix je ẑᵦ vyjadrene v {s}.**

### Preto rotation matrix vyzera prave takto

Mame teda:

**Rₛᵦ = [ x̂ᵦ  ŷᵦ  ẑᵦ ] vyjadrene v {s}**

Prvy stlpec odpoveda: Kam smeruje x̂ᵦ z pohladu {s}? Druhy: Kam smeruje ŷᵦ z pohladu {s}? Treti: Kam smeruje ẑᵦ z pohladu {s}?

### Co ak mame normalny vektor, ktory nesmeruje iba po jednej osi?

Teraz uz mozeme pochopit, preco to cele funguje aj pri komplikovanejsom vektore. Predstav si:

**vᵦ = (2, 3, 0)**

Co to znamena? Robot jednoducho hovori: "Tato sipka obsahuje 2 jednotky mojho smeru x̂ᵦ, 3 jednotky mojho smeru ŷᵦ a nic v smere ẑᵦ."

Ked vypocitame Rₛᵦ · (2, 3, 0), cisla 2, 3, 0 povedia matrix: vezmi 2-krat prvy stlpec, 3-krat druhy stlpec a 0-krat treti stlpec.

Teda: **2 · (0, 1, 0) + 3 · (-1, 0, 0) + 0 · (0, 0, 1)**

Dostaneme: **(0, 2, 0) + (-3, 0, 0) = (-3, 2, 0)**

Takze:

**vₛ = (-3, 2, 0)**

Robot povedal: "2 mojim smerom x̂ᵦ a 3 mojim smerom ŷᵦ." Space frame povedal: "Aha, z mojho pohladu je ta ista sipka -3 po x̂ₛ a +2 po ŷₛ."

Fyzicka sipka sa vobec nezmenila. Iba sme ju opisali pomocou inych osi.

### Predstav si to ako prekladac

Toto je asi najlepsi mentalny obraz celej sekcie.

Robot ma vlastny jazyk: x̂ᵦ, ŷᵦ, ẑᵦ. Miestnost ma vlastny jazyk: x̂ₛ, ŷₛ, ẑₛ. Rotation matrix Rₛᵦ je slovnik medzi tymito jazykmi.

Jej prvy stlpec hovori: "Takto sa v jazyku {s} povie x̂ᵦ." Druhy stlpec: "Takto sa v jazyku {s} povie ŷᵦ." Treti: "Takto sa v jazyku {s} povie ẑᵦ."

Ked robot potom povie vᵦ = (2, 3, 0), rotation matrix si to precita ako: "Potrebujem 2 kusy x̂ᵦ, 3 kusy ŷᵦ a 0 kusov ẑᵦ." Pozrie sa do svojich troch stlpcov, prelozi kazdy smer do {s} a vsetko spoji.

### Na co si zapamatat

Pismeno **v** je iba nazov pre nejaku sipku - nejaky vektor. Moze predstavovat smer pohybu, rychlost alebo cokolvek ine.

**vᵦ** znamena: vektor v opisany pomocou body frame {b}.

**vₛ** znamena: ten isty vektor v opisany pomocou space frame {s}.

A rovnica **vₛ = Rₛᵦ · vᵦ** v tejto situacii znamena: "Preloz coordinates vektora z jazyka {b} do jazyka {s}."

A teraz uz vieme aj to, preco rotation matrix obsahuje axes prave v stlpcoch. Vektor (1, 0, 0) v body frame znamena x̂ᵦ a pri nasobeni vyberie prvy stlpec. Preto prvy stlpec musi byt x̂ᵦ vyjadrene v {s}. Vektor (0, 1, 0) znamena ŷᵦ a vyberie druhy stlpec. A (0, 0, 1) znamena ẑᵦ a vyberie treti stlpec.

Preto si nemusis memorovat vetu "axes patria do stlpcov". Staci si zapamatat ovela prirodzenejsiu myslienku:

**1. stlpec = co znamena x̂ᵦ v jazyku {s}**

**2. stlpec = co znamena ŷᵦ v jazyku {s}**

**3. stlpec = co znamena ẑᵦ v jazyku {s}**

Rotation matrix ma tieto tri odpovede ulozene v stlpcoch preto, ze pri nasobeni cisla vo vektore hovoria, kolko z prveho, druheho a tretieho stlpca sa ma pouzit.

---

## 12. Co znamenaju jednotlive čísla r₁₁, r₂₁, r₃₁?

Vo vseobecnosti môžeme rotation matrix zapisat ako:

$$[ r₁₁  r₁₂  r₁₃ ]$$
$$[ r₂₁  r₂₂  r₂₃ ]$$
$$[ r₃₁  r₃₂  r₃₃ ]$$

Teraz už vieme, že jednotlive stĺpce predstavuju jednotlive osi body frame. Preto prvy stĺpec **(r₁₁, r₂₁, r₃₁)** hovori, ako je x̂ᵦ zlozene zo smerov x̂ₛ, ŷₛ, ẑₛ. Môžeme teda napisat:

**x̂ᵦ = r₁₁ · x̂ₛ + r₂₁ · ŷₛ + r₃₁ · ẑₛ**

Druhy stĺpec opisuje ŷᵦ:

**ŷᵦ = r₁₂ · x̂ₛ + r₂₂ · ŷₛ + r₃₂ · ẑₛ**

A treti opisuje ẑᵦ:

**ẑᵦ = r₁₃ · x̂ₛ + r₂₃ · ŷₛ + r₃₃ · ẑₛ**

Toto je velmi dôležité, pretoze v realnom svete osi vacsinou nebudu dokonale zarovnane tak, aby sme dostavali iba 0, 1 a -1.

---

## 13. Co ak robot nebude otočený presne o 90°?

Tu sa dostávame k tomu, prečo sa v rotation matrices objavuju **sin** a **cos**.

Predstav si 2D situaciu. Máme x̂ₛ smerujúce doprava a ŷₛ smerujúce nahor. Teraz otocime x̂ᵦ iba o uhol **θ**.

Jeho smer už nebude úplne x̂ₛ, ale nebude ani úplne ŷₛ. Bude zlozeny z časti smeru x̂ₛ a z časti smeru ŷₛ.

Geometricky dostaneme:

**x̂ᵦ = cos θ · x̂ₛ + sin θ · ŷₛ**

Preto jeho coordinates su:

**x̂ᵦ = (cos θ, sin θ, 0)**

A teraz velmi dôležité preco.

![Otocenie vektora o uhol θ - projekcie na osi](/book/ch3/fig3-3.png)

---

## 14. Prečo je horizontalna cast cos θ a vertikalna sin θ?

Predstav si šípku x̂ᵦ s dlzkou presne 1. Ked ju naklomine o uhol θ, môžeme z jej konca spustit kolmice a vytvorí sa pravouhly trojuholnik. Samotna šípka je prepona a má dlzku 1.

Z trigonometrie plati:

**cos θ = prilahlá odvesna / prepona**

Kedze prepona má dlzku 1:

**cos θ = x / 1 = x**

Preto horizontalna cast šípky má dlzku **x = cos θ**.

Podobne:

**sin θ = protilahla odvesna / prepona = y / 1**

takze **y = sin θ**.

Preto jednotkovy vektor natočený o θ môžeme zapisat ako:

**(cos θ, sin θ)**

Sinus a cosinus sa teda v rotation matrices neobjavili preto, že sa niekto rozhodol, že "rotacie sa pocitaju cez sin a cos". Objavuju sa tam preto, že opisujeme projekcie otoceneho unit vectora (jednotkovy vektor) na povodne coordinate axes.

---

## 15. Priklad s otocenim o 30°

Ak otocime x̂ᵦ o 30°, potom:

**cos 30° ≈ 0,866**

**sin 30° = 0,5**

Preto:

**x̂ᵦ = (0,866, 0,5)**

To môžeme citat velmi intuitvne: otocena os x̂ᵦ smeruje stale hlavne v smere x̂ₛ, preto má v tomto smere velku zložku 0,866, ale zároveň už smeruje trochu nahor, preto má zložku 0,5 v smere ŷₛ.

Keď uhol zvacsime na 90°:

**cos 90° = 0**

**sin 90° = 1**

Dostaneme:

**x̂ᵦ = (0, 1)**

A to je presne situácia z obrazku. Povodna os x̂ᵦ sa po otočení o 90° úplne zarovnala s ŷₛ. Preto na obrazku vidis x̂ᵦ = (0, 1, 0).

Takze čísla z obrazku nie sú zvláštny samostatny pripad. Su iba velmi jednoduchym pripadom vseobecneho pravidla so sinusom a cosinusom.

---

## 16. Prečo musi mat rotation matrix práve 3 x 3?

V 3D máme tri osi: x, y, z.

Kazdu os noveho frame potrebujeme opísať pomocou troch cisel, pretoze potrebujeme povedať jej zložku v smere x̂ₛ, ŷₛ a ẑₛ.

Máme teda tri čísla pre x̂ᵦ, tri pre ŷᵦ a tri pre ẑᵦ. Ked tieto tri trojrozmerné vektory vlozime vedla seba, prirodzene dostaneme **3 x 3** maticu.

Preto rotation matrix v trojrozmernom priestore vyzera ako:

$$[ r₁₁  r₁₂  r₁₃ ]$$
$$[ r₂₁  r₂₂  r₂₃ ]$$
$$[ r₃₁  r₃₂  r₃₃ ]$$

Ale pozor: tychto devat čísel nie je devat nezavislych informacii. Orientation rigid body (tuhe teleso) v 3D má iba **3 degrees of freedom (stupne volnosti)**. Čísla v rotation matrix preto musia splnat urcite pravidla.

---

## 17. Prečo nemozu byt v rotation matrix hociake cisla?

Coordinate frame musi mat normalne osi. Kazda jeho os je **unit vector** (jednotkovy vektor), teda má dlzku 1. Zaroven musia byt osi navzajom **kolme** (perpendicular).

Ak máme napriklad x̂ᵦ = (0, 1, 0), jeho dlzka je:

**sqrt(0² + 1² + 0²) = 1**

To je spravne.

Rovnako x̂ᵦ a ŷᵦ musia byt kolme. Ich **dot product** (skalarny sucin) musi byt:

**x̂ᵦᵀ · ŷᵦ = 0**

To vsetko sa da elegantne zapisat vlastnostou:

**Rᵀ R = I**

To znamena, že transpose rotation matrix vynasobena samotnou rotation matrix da identity matrix.

Z toho zároveň vyplyva krasna vlastnost:

**R⁻¹ = Rᵀ**

Pri obycajnej matici môže byt výpočet inverse neprijemny. Pri rotation matrix stačí prehodiť riadky a stlpce.

---

## 18. Prečo dava R⁻¹ = Rᵀ zmysel aj intuitvne?

Predstav si, že Rₛᵦ opisuje cestu medzi pohladmi {b} a {s}. Ak chceme ísť opacnym smerom, potrebujeme opacnu transformaciu.

Preto:

**Rᵦₛ = Rₛᵦ⁻¹**

Kedze rotation matrices sú orthogonal matrices:

**Rₛᵦ⁻¹ = Rₛᵦᵀ**

Teda:

**Rᵦₛ = Rₛᵦᵀ**

To je velmi prakticke. Ak viem, ako vyzera {b} z pohladu {s}, automaticky viem aj opačný vztah.

---

## 19. Rotation matrix môže menit coordinate description vektora

Predstav si, že robot drzi laser a z pohladu robota laser smeruje presne dopredu:

**vᵦ = (1, 0, 0)**

Robot je však otočený podľa rotation matrix:

$$Rₛᵦ =$$
$$[  0  -1   0 ]$$
$$[  1   0   0 ]$$
$$[  0   0   1 ]$$

Ak chceme vediet, kam laser smeruje z pohladu miestnosti, pouzijeme:

**vₛ = Rₛᵦ · vᵦ**

Dostaneme:

**vₛ = (0, 1, 0)**

Robot teda hovori: "Laser smeruje predo mnou."

Miestnost hovori: "Laser smeruje v smere +ŷₛ."

Fyzicky ide stale o ten istý laser a ten istý smer. Zmenili sme iba jazyk, ktorym ho opisujeme.

Toto je jeden z najdolezitejsich konceptov celej robotiky.

---

## 20. Priklad z realneho robota

Predstav si autonómneho robota s kamerou. Kamera zisti cloveka a povie:

**p_c = (0, 0, 3)**

To môže znamenat, že clovek je tri metre priamo pred kamerou podľa coordinate convention kamery.

Robot však potrebuje cloveka najst vo svojom vlastnom coordinate system. Kamera môže byt na robotovi otocena, takze jej "dopredu" nemusi byt rovnaké ako "dopredu" robota.

Robot preto potrebuje poznat orientáciu camera frame vzhľadom na robot frame. Tu môže opisovať rotation matrix.

A presne preto sa toto ucis. Nie preto, aby si vedela nasobit nejake abstraktné 3 x 3 tabulky, ale preto, že robot má množstvo senzorov a casti, ktoré vidia svet z rôznych coordinate frames, a všetky tieto informácie musi vedieť spojit.

![Priklad robota s kamerou a viacerymi coordinate frames](/book/ch3/fig3-6.png)

---

## 21. Najjednoduchsi mentálny model

Ak by si si z celej tejto časti mala zapamätať jediny obraz, predstav si robota stojaceho v miestnosti. Miestnost má tri šípky x̂ₛ, ŷₛ, ẑₛ. Robot má na sebe namaľované ďalšie tri šípky x̂ᵦ, ŷᵦ, ẑᵦ.

Potom sa postavis do coordinate frame {s} a polozis tri otázky:

**Kam smeruje robotovo x̂ᵦ?** Odpoved sa stane prvym stlpcom.

**Kam smeruje robotovo ŷᵦ?** Odpoved sa stane druhym stlpcom.

**Kam smeruje robotovo ẑᵦ?** Odpoved sa stane tretim stlpcom.

A dostanes:

**Rₛᵦ = [ x̂ᵦ  ŷᵦ  ẑᵦ ] vyjadrene v {s}**

Pre konkrétny obrazok:

**x̂ᵦ = ŷₛ, ŷᵦ = -x̂ₛ, ẑᵦ = ẑₛ**

Preto:

**x̂ᵦ = (0, 1, 0)**

**ŷᵦ = (-1, 0, 0)**

**ẑᵦ = (0, 0, 1)**

a teda:

$$Rₛᵦ =$$
$$[  0  -1   0 ]$$
$$[  1   0   0 ]$$
$$[  0   0   1 ]$$

Keď toto chapes ako tri osi ulozene vedla seba, rotation matrix prestava byt abstraktna matica. Je to jednoducho ciselny opis toho, kam smeruju tri šípky jedneho coordinate frame, keď sa na ne pozerame z iného coordinate frame.

---

## Na co pamatat

**Rotation matrix opisuje orientaciu**, nie polohu. Hovori, ako sú osi jedneho frame natocene vzhľadom na iny frame.

**Stlpce rotation matrix sú osi body frame** vyjadrene v space frame. Prvy stĺpec je x̂ᵦ, druhy ŷᵦ, treti ẑᵦ.

**Rₛᵦ** znamena "orientacia {b} z pohladu {s}".

**Čísla nie sú náhodné.** Su to zlozky unit vektorov. Preto sa objavuju sin θ a cos θ - opisuju projekcie otoceneho vektora na povodne osi.

**Rᵀ R = I** - stĺpce sú jednotkove a navzajom kolme.

**R⁻¹ = Rᵀ** - inverse rotation matrix je jednoducho jej transpose.

**vₛ = Rₛᵦ · vᵦ** - takto prepocitame vektor z body frame do space frame. Fyzicky sa nič nepohne, mení sa len opis.`;
