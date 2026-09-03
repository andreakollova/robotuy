// Chapter 3.2.1 – Rotation Matrices (Part 1 of 2)
// Full lesson content - DO NOT SHORTEN

export const ch321p1Content = `# Rotation Matrix - od uplneho zakladu

## 1. Co sa vlastne snazime opisat?

Predtym, nez sa dostaneme k samotnej rotation matrix (rotacna matica), je dolezite pochopit problem, ktory pomocou nej riesime. Predstav si roboticke rameno stojace na stole. Miestnost alebo pracovny priestor robota ma svoj vlastny coordinate frame (suradnicova sustava), ktory oznacime **{s}** ako **space frame** (priestorovy frame). Ma tri osi **x̂ₛ**, **ŷₛ** a **ẑₛ**. Mozeme si napriklad predstavit, ze x̂ₛ smeruje doprava po stole, ŷₛ smeruje dopredu a ẑₛ smeruje nahor.

Robot vsak moze mat dalsi coordinate frame pripevneny napriklad ku svojmu ramenu, kamere alebo gripperu. Ten oznacime **{b}** ako **body frame** (teleso frame) a ma svoje vlastne osi **x̂ᵦ**, **ŷᵦ** a **ẑᵦ**. Ked sa roboticke rameno otoci, otoci sa spolu s nim aj cely jeho body frame. Osi x̂ᵦ, ŷᵦ, ẑᵦ preto uz nemusia smerovat rovnakym smerom ako osi x̂ₛ, ŷₛ, ẑₛ.

Prave tu vznika problem, ktory potrebujeme matematicky vyriesit: **Ako presne opiseme, ako je frame {b} natoceny vzhladom na frame {s}?** Odpovedou je rotation matrix.

---

## 2. Preco vobec potrebujeme viac coordinate frames?

Coordinate frame si mozes predstavit ako vlastny pohlad urciteho objektu na svet. Velmi dobrym prikladom je auto. Ked sedis za volantom, prirodzene pouzivavas smery "dopredu", "dozadu", "dolava" a "doprava". Ak niekto povie, ze prekazka je dva metre pred autom, tento opis dava zmysel vzhladom na auto. Lenze mapa mesta moze pouzivat uplne ine smery, napriklad sever a vychod.

Predstav si, ze auto prave smeruje na sever. "Dopredu" z pohladu auta teda znamena "na sever" z pohladu mapy. Ak sa auto otoci doprava a zacne smerovat na vychod, jeho vlastny smer "dopredu" sa nezmenil - vodic ma stale pred sebou prednu cast auta. Z pohladu mapy vsak tento smer teraz znamena vychod.

Presne rovnaky problem ma robot. Kamera moze povedat: "Objekt sa nachadza predo mnou." Robot vsak potrebuje vediet, co znamena "predo mnou" z pohladu svojho hlavneho coordinate frame. Roboticke rameno moze mat dokonca desiatky roznych frames: jeden na zakladni, dalsi na jednotlivych joints, dalsi na gripperi a dalsi na kamere. Preto musi existovat sposob, ako medzi tymito pohladmi matematicky prechadzat.

Rotation matrix je jeden zo zakladnych nastrojov, ktory toto umoznuje.

---

## 3. Co je teda rotation matrix?

Rotation matrix je matica, ktora opisuje **orientaciu** (orientation) jedneho coordinate frame vzhladom na iny coordinate frame. To je velmi dolezite odlisit od **polohy** (position). Ak polozim telefon na stol a otocim ho o 90°, jeho stred moze zostat presne na rovnakom mieste, ale jeho orientacia sa zmenila. Rotation matrix opisuje prave tuto orientaciu.

Predstav si dva coordinate frames, **{s}** a **{b}**. Ak chcem vediet, ako je {b} orientovany vzhladom na {s}, staci mi v podstate zodpovedat tri otazky: Kam z pohladu {s} smeruje os x̂ᵦ? Kam smeruje ŷᵦ? A kam smeruje ẑᵦ?

Ked poznam odpovede na tieto tri otazky, poznam orientaciu celeho {b} frame. Nie je potrebne vediet nic dalsie. Ak totiz viem, kam smeruju vsetky jeho tri osi, jednoznacne viem, ako je cely coordinate frame natoceny.

A prave tieto tri odpovede ulozime do rotation matrix.

---

## 4. Co znamena Rₛᵦ?

Zapis **Rₛᵦ** ma presny vyznam. Indexy **s** a **b** nie su nahodne. Hovoria nam, ktory frame opisujeme a vzhladom na ktory frame ho opisujeme. V pripade Rₛᵦ opisujeme orientaciu body frame {b} pomocou coordinate frame {s}.

Jednoduchy sposob, ako si to predstavovat:

**Rₛᵦ = ako vyzera orientacia {b} z pohladu {s}**

Predstav si, ze stojis v miestnosti a sledujes robota. Miestnost predstavuje {s} a robot predstavuje {b}. Rₛᵦ ti hovori, ako vidis robotove osi zo svojho pevneho pohladu v miestnosti.

Toto bude neskor velmi dolezite, pretoze mozeme mat aj Rᵦc, Rₛc, Rᵦₛ a podobne. Poradie indexov teda nesmieme ignorovat.

---

## 5. Co presne vidime na obrazku?

![Dva coordinate frames - space frame {s} a body frame {b} otoceny o 90° okolo z-osi](/book/ch3/fig3-3.png)

Na obrazku mame hore coordinate frame **{s}**. Jeho osi su x̂ₛ, ŷₛ, ẑₛ. Pod nim mame body frame **{b}** s osami x̂ᵦ, ŷᵦ, ẑᵦ. Body frame je oproti space frame otoceny, ale vsimni si, ze os **z** zostala rovnaka. Frame {b} sa teda v tomto priklade v podstate otocil okolo osi z.

Teraz sa na obrazok nemusime pozerat ako na komplikovanu geometriu. Staci porovnavat jednotlive sipky. Najprv vezmeme x̂ᵦ a spytame sa: Kam tato sipka smeruje z pohladu coordinate frame {s}? Potom urobime to iste pre ŷᵦ a nakoniec pre ẑᵦ.

Ked odpovieme na tieto tri otazky, rotation matrix mame hotovu.

---

## 6. Preco je x̂ᵦ = (0, 1, 0)?

Zacnime osou x̂ᵦ.

Aby sme pochopili, odkial sa cisla vzali, musime najprv pochopit vyznam samotneho vektora. Ked pracujeme v coordinate frame {s}, jeho tri zakladne smery mozeme zapisat ako:

**x̂ₛ = (1, 0, 0)**

**ŷₛ = (0, 1, 0)**

**ẑₛ = (0, 0, 1)**

Prve cislo vzdy hovori, kolko vektora smeruje pozdlz x̂ₛ, druhe hovori, kolko smeruje pozdlz ŷₛ, a tretie hovori, kolko smeruje pozdlz ẑₛ.

Napriklad **(1, 0, 0)** znamena: "idem uplne v smere x̂ₛ, vobec nejdem v smere ŷₛ a vobec nejdem v smere ẑₛ." Preto je to jednoducho smer osi x̂ₛ.

Podobne **(0, 1, 0)** znamena: "nemam ziadnu cast v smere x̂ₛ, cela moja dlzka smeruje pozdlz ŷₛ a nemam ziadnu cast v smere ẑₛ." Je to teda presne smer ŷₛ.

A teraz sa pozri na x̂ᵦ na obrazku. Sipka x̂ᵦ smeruje presne rovnakym smerom ako sipka ŷₛ. Preto mozeme povedat:

**x̂ᵦ = ŷₛ**

Kedze smer ŷₛ zapisujeme ako **(0, 1, 0)**, dostavame:

**x̂ᵦ = (0, 1, 0)**

Nie je za tym ziadny zvlastny vypocet. Jednoducho sme sa pozreli, kam smeruje x̂ᵦ z pohladu coordinate frame {s}.

---

## 7. Preco je ŷᵦ = (-1, 0, 0)?

Teraz urobime presne to iste s druhou osou.

Pozri sa na sipku ŷᵦ. Ta smeruje presne opacne ako x̂ₛ. Ak x̂ₛ predstavuje jeden smer, potom opacny smer zapisujeme znamienkom minus:

**ŷᵦ = -x̂ₛ**

Kedze x̂ₛ = (1, 0, 0), potom -x̂ₛ = (-1, 0, 0).

Preto:

**ŷᵦ = (-1, 0, 0)**

Cislo **-1** teda neznamena nic komplikovane. Znamena jednoducho: smerujem presne opacnym smerom ako kladna os x̂ₛ.

Je to rovnake ako pri ceste. Ak si povieme, ze vychod je kladny smer, zapad mozeme povazovat za zaporny smer. +1 by znamenalo vychod a -1 zapad.

---

## 8. Preco je ẑᵦ = (0, 0, 1)?

Pri tretej osi je situacia najjednoduchsia. Na obrazku vidis, ze ẑᵦ a ẑₛ smeruju presne rovnakym smerom nahor. Preto:

**ẑᵦ = ẑₛ**

A kedze ẑₛ = (0, 0, 1), dostaneme:

**ẑᵦ = (0, 0, 1)**

To nam zaroven prezradza nieco o samotnom otoceni. Kedze sa smer osi z vobec nezmenil, frame {b} bol v tomto priklade otoceny okolo osi z. Predstav si ceruzku postavenu kolmo na stol a papier polozeny vodorovne okolo nej. Papier mozes otacat okolo ceruzky. Smery x a y na papieri sa menia, ale smer ceruzky - teda os z - zostava rovnaky.

---

## 9. A z tychto troch vektorov vznikne rotation matrix

Teraz uz pozname vsetky tri osi {b} vyjadrene pomocou {s}:

**x̂ᵦ = (0, 1, 0)**

**ŷᵦ = (-1, 0, 0)**

**ẑᵦ = (0, 0, 1)**

Rotation matrix vytvorime tak, ze tieto tri vektory jednoducho vlozime vedla seba ako stlpce:

**Rₛᵦ = [ x̂ᵦ  ŷᵦ  ẑᵦ ]**

Ked ich tam dosadime, dostaneme:

$$[  0  -1   0 ]$$
$$[  1   0   0 ]$$
$$[  0   0   1 ]$$

A toto je presne rotation matrix z obrazku.

Toto je velmi dolezity moment: rotation matrix nie je devat nahodnych cisel opisujucich nejake abstraktne otocenie. Je to jednoducho miesto, kam sme vedla seba ulozili tri osi jedneho coordinate frame vyjadrene pomocou druheho coordinate frame.

---

## 10. Ako mas rotation matrix "citat"

Ked odteraz uvidis rotation matrix, nesnaz sa na nu pozerat ako na tabulku deviatich cisel. Mentalne si ju rozdel na tri stlpce.

Prvy stlpec **(0, 1, 0)** je odpoved na otazku: Kam smeruje x̂ᵦ, ked sa nan pozeram zo {s}?

Druhy stlpec **(-1, 0, 0)** odpoveda: Kam smeruje ŷᵦ?

A treti stlpec **(0, 0, 1)** odpoveda: Kam smeruje ẑᵦ?

Preto si mozes zapamatat velmi uzitocny obraz:

**Rₛᵦ = [ x̂ᵦ  ŷᵦ  ẑᵦ ] vyjadrene v {s}**

Rotation matrix je teda v podstate fotografia troch osi {b} urobena z pohladu {s}, iba namiesto fotografie pouzivame cisla.

---

## 11. Ale preco su tie vektory prave stlpce?

Toto je dobre pochopit, pretoze neskor nebudes musiet pravidlo "osi davame do stlpcov" slepo memorovat.

Predstav si jednoduchy vektor v body frame:

**vᵦ = (1, 0, 0)**

Co tento vektor znamena? Znamena jednoducho "jeden krok v smere x̂ᵦ".

Ak ho vynasobime rotation matrix:

**Rₛᵦ · (1, 0, 0) = (0, 1, 0)**

Pri nasobeni matice vektorom sa vyberie prave prvy stlpec matice. A to je presne x̂ᵦ vyjadrene v {s}.

Podobne:

**Rₛᵦ · (0, 1, 0) = (-1, 0, 0)**

pretože tym vyberieme druhy stlpec. A ten musi byt ŷᵦ.

Nakoniec:

**Rₛᵦ · (0, 0, 1) = (0, 0, 1)**

cim vyberieme treti stlpec, teda ẑᵦ.

Preto su osi ulozene prave v stlpcoch. Nie je to svojvolna konvencia bez vyznamu. Vychadza to priamo z toho, ako funguje nasobenie matice vektorom.

---

## 12. Co znamenaju jednotlive cisla r₁₁, r₂₁, r₃₁?

Vo vseobecnosti mozeme rotation matrix zapisat ako:

$$[ r₁₁  r₁₂  r₁₃ ]$$
$$[ r₂₁  r₂₂  r₂₃ ]$$
$$[ r₃₁  r₃₂  r₃₃ ]$$

Teraz uz vieme, ze jednotlive stlpce predstavuju jednotlive osi body frame. Preto prvy stlpec **(r₁₁, r₂₁, r₃₁)** hovori, ako je x̂ᵦ zlozene zo smerov x̂ₛ, ŷₛ, ẑₛ. Mozeme teda napisat:

**x̂ᵦ = r₁₁ · x̂ₛ + r₂₁ · ŷₛ + r₃₁ · ẑₛ**

Druhy stlpec opisuje ŷᵦ:

**ŷᵦ = r₁₂ · x̂ₛ + r₂₂ · ŷₛ + r₃₂ · ẑₛ**

A treti opisuje ẑᵦ:

**ẑᵦ = r₁₃ · x̂ₛ + r₂₃ · ŷₛ + r₃₃ · ẑₛ**

Toto je velmi dolezite, pretoze v realnom svete osi vacsinou nebudu dokonale zarovnane tak, aby sme dostavali iba 0, 1 a -1.

---

## 13. Co ak robot nebude otoceny presne o 90°?

Tu sa dostavame k tomu, preco sa v rotation matrices objavuju **sin** a **cos**.

Predstav si 2D situaciu. Mame x̂ₛ smerujuce doprava a ŷₛ smerujuce nahor. Teraz otocime x̂ᵦ iba o uhol **θ**.

Jeho smer uz nebude uplne x̂ₛ, ale nebude ani uplne ŷₛ. Bude zlozeny z casti smeru x̂ₛ a z casti smeru ŷₛ.

Geometricky dostaneme:

**x̂ᵦ = cos θ · x̂ₛ + sin θ · ŷₛ**

Preto jeho coordinates su:

**x̂ᵦ = (cos θ, sin θ, 0)**

A teraz velmi dolezite preco.

![Otocenie vektora o uhol θ - projekcie na osi](/book/ch3/fig3-3.png)

---

## 14. Preco je horizontalna cast cos θ a vertikalna sin θ?

Predstav si sipku x̂ᵦ s dlzkou presne 1. Ked ju naklomine o uhol θ, mozeme z jej konca spustit kolmice a vytvori sa pravouhly trojuholnik. Samotna sipka je prepona a ma dlzku 1.

Z trigonometrie plati:

**cos θ = prilahlá odvesna / prepona**

Kedze prepona ma dlzku 1:

**cos θ = x / 1 = x**

Preto horizontalna cast sipky ma dlzku **x = cos θ**.

Podobne:

**sin θ = protilahla odvesna / prepona = y / 1**

takze **y = sin θ**.

Preto jednotkovy vektor natoceny o θ mozeme zapisat ako:

**(cos θ, sin θ)**

Sinus a cosinus sa teda v rotation matrices neobjavili preto, ze sa niekto rozhodol, ze "rotacie sa pocitaju cez sin a cos". Objavuju sa tam preto, ze opisujeme projekcie otoceneho unit vectora (jednotkovy vektor) na povodne coordinate axes.

---

## 15. Priklad s otocenim o 30°

Ak otocime x̂ᵦ o 30°, potom:

**cos 30° ≈ 0,866**

**sin 30° = 0,5**

Preto:

**x̂ᵦ = (0,866, 0,5)**

To mozeme citat velmi intuitvne: otocena os x̂ᵦ smeruje stale hlavne v smere x̂ₛ, preto ma v tomto smere velku zlozku 0,866, ale zaroven uz smeruje trochu nahor, preto ma zlozku 0,5 v smere ŷₛ.

Ked uhol zvacsime na 90°:

**cos 90° = 0**

**sin 90° = 1**

Dostaneme:

**x̂ᵦ = (0, 1)**

A to je presne situacia z obrazku. Povodna os x̂ᵦ sa po otoceni o 90° uplne zarovnala s ŷₛ. Preto na obrazku vidis x̂ᵦ = (0, 1, 0).

Takze cisla z obrazku nie su zvlastny samostatny pripad. Su iba velmi jednoduchym pripadom vseobecneho pravidla so sinusom a cosinusom.

---

## 16. Preco musi mat rotation matrix prave 3 x 3?

V 3D mame tri osi: x, y, z.

Kazdu os noveho frame potrebujeme opisat pomocou troch cisel, pretoze potrebujeme povedat jej zlozku v smere x̂ₛ, ŷₛ a ẑₛ.

Mame teda tri cisla pre x̂ᵦ, tri pre ŷᵦ a tri pre ẑᵦ. Ked tieto tri trojrozmerne vektory vlozime vedla seba, prirodzene dostaneme **3 x 3** maticu.

Preto rotation matrix v trojrozmernom priestore vyzera ako:

$$[ r₁₁  r₁₂  r₁₃ ]$$
$$[ r₂₁  r₂₂  r₂₃ ]$$
$$[ r₃₁  r₃₂  r₃₃ ]$$

Ale pozor: tychto devat cisel nie je devat nezavislych informacii. Orientation rigid body (tuhe teleso) v 3D ma iba **3 degrees of freedom (stupne volnosti)**. Cisla v rotation matrix preto musia splnat urcite pravidla.

---

## 17. Preco nemozu byt v rotation matrix hociake cisla?

Coordinate frame musi mat normalne osi. Kazda jeho os je **unit vector** (jednotkovy vektor), teda ma dlzku 1. Zaroven musia byt osi navzajom **kolme** (perpendicular).

Ak mame napriklad x̂ᵦ = (0, 1, 0), jeho dlzka je:

**sqrt(0² + 1² + 0²) = 1**

To je spravne.

Rovnako x̂ᵦ a ŷᵦ musia byt kolme. Ich **dot product** (skalarny sucin) musi byt:

**x̂ᵦᵀ · ŷᵦ = 0**

To vsetko sa da elegantne zapisat vlastnostou:

**Rᵀ R = I**

To znamena, ze transpose rotation matrix vynasobena samotnou rotation matrix da identity matrix.

Z toho zaroven vyplyva krasna vlastnost:

**R⁻¹ = Rᵀ**

Pri obycajnej matici moze byt vypocet inverse neprijemny. Pri rotation matrix staci prehodit riadky a stlpce.

---

## 18. Preco dava R⁻¹ = Rᵀ zmysel aj intuitvne?

Predstav si, ze Rₛᵦ opisuje cestu medzi pohladmi {b} a {s}. Ak chceme ist opacnym smerom, potrebujeme opacnu transformaciu.

Preto:

**Rᵦₛ = Rₛᵦ⁻¹**

Kedze rotation matrices su orthogonal matrices:

**Rₛᵦ⁻¹ = Rₛᵦᵀ**

Teda:

**Rᵦₛ = Rₛᵦᵀ**

To je velmi prakticke. Ak viem, ako vyzera {b} z pohladu {s}, automaticky viem aj opacny vztah.

---

## 19. Rotation matrix moze menit coordinate description vektora

Predstav si, ze robot drzi laser a z pohladu robota laser smeruje presne dopredu:

**vᵦ = (1, 0, 0)**

Robot je vsak otoceny podla rotation matrix:

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

Fyzicky ide stale o ten isty laser a ten isty smer. Zmenili sme iba jazyk, ktorym ho opisujeme.

Toto je jeden z najdolezitejsich konceptov celej robotiky.

---

## 20. Priklad z realneho robota

Predstav si autonomneho robota s kamerou. Kamera zisti cloveka a povie:

**p_c = (0, 0, 3)**

To moze znamenat, ze clovek je tri metre priamo pred kamerou podla coordinate convention kamery.

Robot vsak potrebuje cloveka najst vo svojom vlastnom coordinate system. Kamera moze byt na robotovi otocena, takze jej "dopredu" nemusi byt rovnake ako "dopredu" robota.

Robot preto potrebuje poznat orientaciu camera frame vzhladom na robot frame. Tu moze opisovat rotation matrix.

A presne preto sa toto ucis. Nie preto, aby si vedela nasobit nejake abstraktne 3 x 3 tabulky, ale preto, ze robot ma mnozstvo senzorov a casti, ktore vidia svet z roznych coordinate frames, a vsetky tieto informacie musi vediet spojit.

![Priklad robota s kamerou a viacerymi coordinate frames](/book/ch3/fig3-6.png)

---

## 21. Najjednoduchsi mentalny model

Ak by si si z celej tejto casti mala zapamatat jediny obraz, predstav si robota stojaceho v miestnosti. Miestnost ma tri sipky x̂ₛ, ŷₛ, ẑₛ. Robot ma na sebe namalovane dalsie tri sipky x̂ᵦ, ŷᵦ, ẑᵦ.

Potom sa postavis do coordinate frame {s} a polozis tri otazky:

**Kam smeruje robotovo x̂ᵦ?** Odpoved sa stane prvym stlpcom.

**Kam smeruje robotovo ŷᵦ?** Odpoved sa stane druhym stlpcom.

**Kam smeruje robotovo ẑᵦ?** Odpoved sa stane tretim stlpcom.

A dostanes:

**Rₛᵦ = [ x̂ᵦ  ŷᵦ  ẑᵦ ] vyjadrene v {s}**

Pre konkretny obrazok:

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

Ked toto chapes ako tri osi ulozene vedla seba, rotation matrix prestava byt abstraktna matica. Je to jednoducho ciselny opis toho, kam smeruju tri sipky jedneho coordinate frame, ked sa na ne pozerame z ineho coordinate frame.

---

## Na co pamatat

**Rotation matrix opisuje orientaciu**, nie polohu. Hovori, ako su osi jedneho frame natocene vzhladom na iny frame.

**Stlpce rotation matrix su osi body frame** vyjadrene v space frame. Prvy stlpec je x̂ᵦ, druhy ŷᵦ, treti ẑᵦ.

**Rₛᵦ** znamena "orientacia {b} z pohladu {s}".

**Cisla nie su nahodne.** Su to zlozky unit vektorov. Preto sa objavuju sin θ a cos θ - opisuju projekcie otoceneho vektora na povodne osi.

**Rᵀ R = I** - stlpce su jednotkove a navzajom kolme.

**R⁻¹ = Rᵀ** - inverse rotation matrix je jednoducho jej transpose.

**vₛ = Rₛᵦ · vᵦ** - takto prepocitame vektor z body frame do space frame. Fyzicky sa nic nepohne, meni sa len opis.`;
