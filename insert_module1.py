#!/usr/bin/env python3
"""Insert Module 1 (lessons 1-6) into Robotuy Supabase."""
import json, urllib.request, ssl

ssl._create_default_https_context = ssl._create_unverified_context

SB_URL = "https://gmsqrjnytthxefsnqmmb.supabase.co/rest/v1"
SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdtc3Fyam55dHRoeGVmc25xbW1iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTUxMTY4NywiZXhwIjoyMTAxMDg3Njg3fQ.LNZvaPWmHllpi8bGJZ1xSFU50Kt0947gmWmSCDWi5jw"
HEADERS = {
    "apikey": SB_KEY,
    "Authorization": f"Bearer {SB_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation",
}

def post(table, data):
    payload = json.dumps(data).encode()
    req = urllib.request.Request(f"{SB_URL}/{table}", data=payload, headers=HEADERS, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read())
            print(f"  ✓ {table}: {result[0].get('id', '?') if isinstance(result, list) else '?'}")
            return result[0] if isinstance(result, list) else result
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"  ✗ {table}: {e.code} - {body}")
        return None

def insert_question(lesson_id, qnum, text, qtype, correct, options=None, explanation=None):
    q = post("cb_quiz_questions", {
        "lesson_id": lesson_id,
        "question_number": qnum,
        "question_text": text,
        "question_type": qtype,
        "correct_answer": correct,
        "explanation": explanation,
    })
    if q and options:
        for label, opt_text, is_correct in options:
            post("cb_quiz_options", {
                "question_id": q["id"],
                "option_label": label,
                "option_text": opt_text,
                "is_correct": is_correct,
            })
    return q

# ============================================================
# MODULE 1: Zaciname s robotikou
# ============================================================
print("\n=== Creating Module 1 ===")
mod = post("cb_modules", {
    "module_number": 1,
    "title": "Getting Started with Robotics",
    "title_sk": "Zaciname s robotikou",
})
if not mod:
    print("Module 1 may already exist. Trying to fetch...")
    req = urllib.request.Request(
        f"{SB_URL}/cb_modules?module_number=eq.1&select=id",
        headers={**HEADERS, "Content-Type": "application/json"},
        method="GET"
    )
    with urllib.request.urlopen(req) as resp:
        mods = json.loads(resp.read())
        if mods:
            mod = mods[0]
            print(f"  Found existing module id={mod['id']}")
        else:
            print("  ERROR: Could not create or find module 1")
            exit(1)

MODULE_ID = mod["id"]

# ============================================================
# LESSON 1: Co je robot?
# ============================================================
print("\n--- Lesson 1: Co je robot? ---")
l1 = post("cb_lessons", {
    "module_id": MODULE_ID,
    "lesson_number": 1,
    "title": "What is a Robot?",
    "title_sk": "Co je robot?",
    "lesson_type": "theory",
    "introduction_sk": "Predstav si roboticky vysavac. Polozis ho na podlahu, stlacis tlacidlo a robot zacne upratovat. Pohybuje sa po miestnosti, rozpoznava prekazky, meni smer a niektore modely si dokonca vytvaraju mapu domacnosti. Roboticky vysavac vsak nie je iba stroj s kolieskami. Aby mohol fungovat, musi: vnimat svoje okolie, spracovat ziskane informacie, rozhodnut sa, vykonat urcitu akciu. Presne tieto schopnosti tvoria zaklad robotiky.",
    "learning_content_sk": "Robot je programovatelny stroj, ktory dokaze vykonavat ulohy vo fyzickom svete. Robot zvycajne dokaze: 1. prijimat informacie zo svojho okolia, 2. spracovat tieto informacie, 3. rozhodnut sa, co ma urobit, 4. vykonat pohyb alebo inu akciu. Robot teda prepaja: Senzory → Riadenie → Akcne cleny. Alebo jednoduchsie: Vnimanie → Rozhodovanie → Akcia.",
    "key_takeaways_sk": [
        "Robot je programovatelny stroj, ktory vykonava ulohy vo fyzickom svete.",
        "Robot zvycajne vnima prostredie, spracuje udaje a vykona akciu.",
        "Senzory poskytuju robotovi informacie.",
        "Riadiaca jednotka spracovava udaje a vykonava program.",
        "Akcne cleny umoznuju robotovi fyzicky konat.",
        "Robot potrebuje mechanicku konstrukciu a zdroj energie.",
        "Robot nemusi vyzerat ako clovek.",
        "Robot nemusi pouzivat umelu inteligenciu.",
        "Robotika spaja mechaniku, elektroniku, programovanie, senzoriku a riadenie."
    ],
})
if l1:
    L1_ID = l1["id"]
    # Quiz questions for lesson 1
    insert_question(L1_ID, 1,
        "Co najlepsie opisuje robota?",
        "mcq", "B",
        [("A", "Kazdy elektricky spotrebic.", False),
         ("B", "Programovatelny stroj, ktory dokaze vykonavat ulohy vo fyzickom svete.", True),
         ("C", "Pocitacova aplikacia bez fyzickych casti.", False),
         ("D", "Stroj, ktory musi vyzerat ako clovek.", False)],
        "Robot je programovatelny stroj vykonavajuci ulohy vo fyzickom svete."
    )
    insert_question(L1_ID, 2,
        "Na co sluzia senzory?",
        "mcq", "A",
        [("A", "Na ziskavanie informacii o robotovi a jeho okoli.", True),
         ("B", "Iba na napajanie motorov.", False),
         ("C", "Na vyrobu mechanickych dielov.", False),
         ("D", "Iba na ukladanie programu.", False)],
        "Senzory umoznuju robotovi ziskavat informacie o svete."
    )
    insert_question(L1_ID, 3,
        "Ktora cast robota spracovava udaje a rozhoduje, co ma robot urobit?",
        "mcq", "C",
        [("A", "Koleso.", False),
         ("B", "Bateria.", False),
         ("C", "Riadiaca jednotka.", True),
         ("D", "Mechanicky ram.", False)],
        "Riadiaca jednotka spracovava udaje a rozhoduje."
    )
    insert_question(L1_ID, 4,
        "Co je akcny clen?",
        "mcq", "A",
        [("A", "Zariadenie, ktore vykonava fyzicku akciu.", True),
         ("B", "Programovaci jazyk.", False),
         ("C", "Typ baterie.", False),
         ("D", "Subor udajov zo senzora.", False)],
        "Akcny clen (actuator) vykonava fyzicku akciu."
    )
    insert_question(L1_ID, 5,
        "Ktore poradie spravne opisuje zakladnu cinnost robota?",
        "mcq", "C",
        [("A", "Akcia → Vnimanie → Rozhodovanie.", False),
         ("B", "Rozhodovanie → Akcia → Vnimanie.", False),
         ("C", "Vnimanie → Rozhodovanie → Akcia.", True),
         ("D", "Napajanie → Programovanie → Vyroba.", False)],
        "Zakladny cyklus robota: Vnimanie → Rozhodovanie → Akcia."
    )
    # True/False
    insert_question(L1_ID, 6, "Robot musi mat ludsky tvar.", "true_false", "false", explanation="Tvar robota zavisi od ulohy, nie od ludskej podoby.")
    insert_question(L1_ID, 7, "Senzory umoznuju robotovi ziskavat informacie o okoli.", "true_false", "true")
    insert_question(L1_ID, 8, "Kazdy robot musi pouzivat umelu inteligenciu.", "true_false", "false", explanation="Mnohe roboty pouzivaju iba jednoduche podmienky a pravidla.")
    insert_question(L1_ID, 9, "Roboticky vysavac je priklad mobilneho robota.", "true_false", "true")
    insert_question(L1_ID, 10, "Robotika zahrna iba programovanie.", "true_false", "false", explanation="Robotika spaja mechaniku, elektroniku, programovanie, senzoriku a riadenie.")
    print(f"  Lesson 1 done (id={L1_ID})")

# ============================================================
# LESSON 2: Historia robotiky
# ============================================================
print("\n--- Lesson 2: Historia robotiky ---")
l2 = post("cb_lessons", {
    "module_id": MODULE_ID,
    "lesson_number": 2,
    "title": "History of Robotics",
    "title_sk": "Historia robotiky",
    "lesson_type": "theory",
    "introduction_sk": "Ludia sa uz tisice rokov pokusaju vytvarat stroje, ktore napodobnuju zive bytosti alebo vykonavaju pracu bez priameho ludskeho ovladania. Moderna robotika nevznikla v jednom laboratoriu ani v jednom okamihu. Zacala ludskou predstavou umeleho pomocnika.",
    "learning_content_sk": "Robotika nezacala modernymi robotmi. Starsie zariadenia boli mechanicke automaty. Slovo robot proslavila hra R.U.R. ceskeho spisovatela Karla Capka (1920-1921). Unimate sa vseobecne povazuje za prvy uspesny priemyselny robot (1961). Shakey bol jednym z prvych mobilnych robotov s planovanim a AI (1966-1972). Rover Sojourner sa v roku 1997 stal prvym kolesovym vozidlom na Marse.",
    "key_takeaways_sk": [
        "Historia robotiky sa zacala davno pred vznikom pocitacov.",
        "Mechanicke automaty boli predchodcami modernych robotov.",
        "Program moze byt ulozeny mechanicky alebo digitalne.",
        "Slovo robot proslavila hra R.U.R. Karla Capka.",
        "Unimate bol prvym uspesnym priemyselnym robotom.",
        "Shakey spojil mobilitu, senzory, planovanie a umelu inteligenciu.",
        "Moderna robotika vznikla spojenim mechaniky, elektroniky, programovania, senzorov a riadenia."
    ],
})
if l2:
    L2_ID = l2["id"]
    insert_question(L2_ID, 1, "Co boli mechanicke automaty?", "mcq", "B",
        [("A", "Moderne pocitace pouzivane na programovanie robotov.", False),
         ("B", "Mechanicke zariadenia vykonavajuce pripravene pohyby.", True),
         ("C", "Vylucne elektricke motory.", False),
         ("D", "Prve internetove zariadenia.", False)])
    insert_question(L2_ID, 2, "Ktore dielo proslavilo slovo robot?", "mcq", "B",
        [("A", "Frankenstein.", False),
         ("B", "R.U.R.", True),
         ("C", "Hamlet.", False),
         ("D", "Principia Mathematica.", False)])
    insert_question(L2_ID, 3, "Co bol Unimate?", "mcq", "A",
        [("A", "Prvy uspesny priemyselny robot.", True),
         ("B", "Mechanicka hracka.", False),
         ("C", "Martansky rover.", False),
         ("D", "Humanoidny robot s AI.", False)])
    insert_question(L2_ID, 4, "Historicky automat mohol mat svoj program ulozeny v mechanickych sucias tkach.", "true_false", "true")
    insert_question(L2_ID, 5, "Moderna robotika je iba historia umelej inteligencie.", "true_false", "false",
        explanation="Robotika zahrna aj mechaniku, motory, materialy, elektroniku, senzory, napajanie a riadenie.")
    print(f"  Lesson 2 done (id={L2_ID})")

# ============================================================
# LESSON 3: Typy robotov
# ============================================================
print("\n--- Lesson 3: Typy robotov ---")
l3 = post("cb_lessons", {
    "module_id": MODULE_ID,
    "lesson_number": 3,
    "title": "Types of Robots",
    "title_sk": "Typy robotov",
    "lesson_type": "theory",
    "introduction_sk": "Roboty sa nenavrhuju podla toho, ako by mali vyzerat. Navrhuju sa podla toho, co maju robit. Mozeme ich delit podla sposobu pohybu, mechanickej konstrukcie, prostredia, vykonavanej ulohy, urovne autonomie, sposobu ovladania, velkosti a spoluprace s clovekom.",
    "learning_content_sk": "Stacionarne roboty sa nepohybuju z miesta na miesto (priemyselne ramena). Kolesove roboty su jednoduche a energeticky efektivne. Pasove roboty su vhodne do narocnejsieho terenu. Kracajuce roboty dokazuju prekonavat schody. Lietajuce roboty (drony) sa pouzivaju na prieskum a monitoring. Podvodne roboty mozu byt dialkovo ovladane (ROV) alebo autonomne (AUV). AGV sleduje pripravenu trasu, AMR dokaze trasu samostatne planovat. Cobot je urceny na spolupracu s clovekom.",
    "key_takeaways_sk": [
        "Roboty mozeme rozdelit viacerymi sposobmi.",
        "Jeden robot moze patrit do viacerych skupin sucasne.",
        "Kolesove roboty su jednoduche a energeticky efektivne.",
        "Pasove roboty su vhodne do narocnejsieho terenu.",
        "Kracajuce roboty dokazuju prekonavat schody a nerovnosti.",
        "AGV sleduje pripravenu trasu, AMR dokaze trasu samostatne planovat.",
        "Cobot je urceny na spolupracu s clovekom, ale aplikacia musi byt bezpecne navrhnuta.",
        "Typ robota sa ma vybierat podla ulohy a prostredia."
    ],
})
if l3:
    L3_ID = l3["id"]
    insert_question(L3_ID, 1, "Ktory robot sa nepohybuje z jedneho pracoviska na druhe?", "mcq", "A",
        [("A", "Stacionarny robot.", True),
         ("B", "Mobilny robot.", False),
         ("C", "Dron.", False),
         ("D", "Podvodny robot.", False)])
    insert_question(L3_ID, 2, "Co oznacuje skratka ROV?", "mcq", "A",
        [("A", "Dialkovo ovladane podvodne vozidlo.", True),
         ("B", "Roboticke osobne vozidlo.", False),
         ("C", "Rotacny opticky vysielac.", False),
         ("D", "Robot urceny iba do vesmiru.", False)])
    insert_question(L3_ID, 3, "Co je cobot?", "mcq", "A",
        [("A", "Robot urceny na spolupracu s clovekom.", True),
         ("B", "Robot urceny iba do vody.", False),
         ("C", "Robot bez motorov.", False),
         ("D", "Typ programovacieho jazyka.", False)])
    insert_question(L3_ID, 4, "Jeden robot moze patrit do viacerych kategorii.", "true_false", "true")
    insert_question(L3_ID, 5, "Kazdy mobilny robot je autonomny.", "true_false", "false",
        explanation="Mobilny robot moze byt dialkovo ovladany.")
    print(f"  Lesson 3 done (id={L3_ID})")

# ============================================================
# LESSON 4: Stupne autonomie
# ============================================================
print("\n--- Lesson 4: Stupne autonomie ---")
l4 = post("cb_lessons", {
    "module_id": MODULE_ID,
    "lesson_number": 4,
    "title": "Levels of Autonomy",
    "title_sk": "Stupne autonomie",
    "lesson_type": "theory",
    "introduction_sk": "Autonomia oznacuje schopnost robota pracovat samostatne – bez toho, aby ho clovek musel neustale ovladat alebo mu davat pokyny pri kazdej jednej cinnosti. Existuje sest urovni autonomie (0 az 5).",
    "learning_content_sk": "Uroven 0: Clovek robi vsetko. Uroven 1: Robot pomaha (napr. stabilizacia dronu). Uroven 2: Robot vykonava viac uloh samostatne (napr. roboticky vysavac). Uroven 3: Robot rozhoduje vo vacsine situacii. Uroven 4: Robot je takmer uplne samostatny. Uroven 5: Robot nepotrebuje cloveka. Autonomia nie je to iste ako inteligencia ani automatizacia. Robot moze byt autonomny aj bez AI.",
    "key_takeaways_sk": [
        "Autonomia oznacuje schopnost robota pracovat samostatne.",
        "Autonomia nie je to iste ako inteligencia.",
        "Autonomia nie je to iste ako automatizacia.",
        "Robot moze byt autonomny aj bez umelej inteligencie.",
        "Vyssia autonomia znamena viac samostatnych rozhodnuti robota.",
        "Vacsina dnesnnych robotov pracuje na urovni 1 az 3.",
        "Uroven 5 predstavuje uplnu autonomiu a zatial nie je beznou sucastou zivota.",
        "Autonomia zavisi od prostredia, senzorov, softveru aj vypoctoveho vykonu."
    ],
})
if l4:
    L4_ID = l4["id"]
    insert_question(L4_ID, 1, "Co oznacuje autonomia robota?", "mcq", "C",
        [("A", "Jeho velkost.", False),
         ("B", "Jeho rychlost.", False),
         ("C", "Schopnost vykonavat ulohy samostatne.", True),
         ("D", "Typ baterie.", False)])
    insert_question(L4_ID, 2, "Ktory robot ma najnizsiu uroven autonomie?", "mcq", "C",
        [("A", "Roboticky vysavac.", False),
         ("B", "Autonomny traktor.", False),
         ("C", "Dialkovo ovladane auticko.", True),
         ("D", "Skladovy AMR.", False)])
    insert_question(L4_ID, 3, "Co predstavuje uroven 5?", "mcq", "D",
        [("A", "Robot caka na pokyny cloveka.", False),
         ("B", "Robot vie stabilizovat pohyb.", False),
         ("C", "Robot zvladne iba jednoduche situacie.", False),
         ("D", "Robot dokaze pracovat uplne samostatne.", True)])
    insert_question(L4_ID, 4, "Kazdy autonomny robot pouziva umelu inteligenciu.", "true_false", "false",
        explanation="Robot moze byt autonomny aj bez AI, napr. roboticka kosacka s jednoduchymi pravidlami.")
    insert_question(L4_ID, 5, "Autonomny robot moze pocas prace menit svoju trasu.", "true_false", "true")
    print(f"  Lesson 4 done (id={L4_ID})")

# ============================================================
# LESSON 5: Komponenty robota
# ============================================================
print("\n--- Lesson 5: Komponenty robota ---")
l5 = post("cb_lessons", {
    "module_id": MODULE_ID,
    "lesson_number": 5,
    "title": "Robot Components",
    "title_sk": "Komponenty robota",
    "lesson_type": "theory",
    "introduction_sk": "Kazdy robot je zlozeny z mnozstva roznych casti, ktore musia dokonale spolupracovat. Robot nie je jedna suciastka. Je to komplexny system, v ktorom ma kazdy komponent svoju presne urcenu ulohu.",
    "learning_content_sk": "Hlavne skupiny komponentov: 1. Mechanicka konstrukcia - tvori telo robota (ram, sasi, kryty). 2. Aktuatory - umoznuju pohyb (DC motory, servomotory, krokove motory, linearne aktuatory, pneumatika, hydraulika). 3. Senzory - zbieraju informacie (kamera, LiDAR, radar, ultrazvuk, GPS, IMU, enkoder). 4. Riadiaca jednotka - spracovava udaje a rozhoduje (mikrokontroler, jednodoskovy pocitac, PLC). 5. Softver - urcuje spravanie robota (program, algoritmus, firmware, OS, ROS). 6. Napajanie - dodava energiu (baterie Li-ion, Li-Po, LiFePO4, siet, solar). 7. Komunikacne komponenty - umoznuju vymenu informacii (Wi-Fi, Bluetooth, Ethernet, 4G/5G).",
    "key_takeaways_sk": [
        "Robot je komplexny system s viacerymi spolupracujucimi komponentmi.",
        "Mechanicka konstrukcia tvori telo robota.",
        "Aktuatory umoznuju robotovi pohyb.",
        "Senzory zbieraju informacie z okolia a z robota.",
        "Riadiaca jednotka spracovava udaje a rozhoduje.",
        "Softver urcuje spravanie robota.",
        "Napajanie dodava energiu vsetkym komponentom.",
        "Komunikacne komponenty umoznuju vymenu informacii.",
        "Ak jeden komponent zlyha, moze prestat fungovat cely robot."
    ],
})
if l5:
    L5_ID = l5["id"]
    insert_question(L5_ID, 1, "Ktora cast robota tvori jeho fyzicke telo?", "mcq", "A",
        [("A", "Mechanicka konstrukcia.", True),
         ("B", "Softver.", False),
         ("C", "Wi-Fi modul.", False),
         ("D", "Bateria.", False)])
    insert_question(L5_ID, 2, "Co je aktuator?", "mcq", "B",
        [("A", "Senzor na meranie teploty.", False),
         ("B", "Zariadenie, ktore premenuje energiu na pohyb.", True),
         ("C", "Typ operacneho systemu.", False),
         ("D", "Komunikacny protokol.", False)])
    insert_question(L5_ID, 3, "Ktory senzor vyuziva laserove svetlo na vytvorenie presnej mapy okolia?", "mcq", "C",
        [("A", "Ultrazvuk.", False),
         ("B", "GPS.", False),
         ("C", "LiDAR.", True),
         ("D", "Mikrofon.", False)])
    insert_question(L5_ID, 4, "Co je IMU?", "mcq", "A",
        [("A", "Senzor meriaci pohyb, naklonenie a otacanie robota.", True),
         ("B", "Typ baterie.", False),
         ("C", "Programovaci jazyk.", False),
         ("D", "Komunikacny modul.", False)])
    insert_question(L5_ID, 5, "Spajanie udajov z viacerych senzorov sa nazyva fuzia senzorov (Sensor Fusion).", "true_false", "true")
    insert_question(L5_ID, 6, "Robot moze fungovat bez napajania.", "true_false", "false",
        explanation="Bez energie nedokaze fungovat ani ten najdokonalejsi robot.")
    insert_question(L5_ID, 7, "ROS je klasicky operacny system ako Windows.", "true_false", "false",
        explanation="ROS je roboticky softverovy ramec a subor nastrojov, nie klasicky OS.")
    insert_question(L5_ID, 8, "Softver moderneho autonomneho vozidla moze obsahovat miliony riadkov kodu.", "true_false", "true")
    print(f"  Lesson 5 done (id={L5_ID})")

print("\n=== ALL DONE ===")
print("Module 1 with 5 lessons and quiz questions inserted successfully!")
