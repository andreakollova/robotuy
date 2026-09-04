// 12-month Robotics Learning Schedule
// Each program has code, name, university, hours, logo, color

export interface Program {
  code: string;
  name: string;
  university: string;
  hours: string;
  logo: string;
  color: string;
  link?: string;
}

export const programs: Program[] = [
  { code: 'MR',  name: 'Modern Robotics: Mechanics, Planning, and Control', university: 'Northwestern University', hours: '~120 h', logo: '/logos/northwestern.png', color: '#4E2A84', link: 'https://www.coursera.org/specializations/modernrobotics' },
  { code: 'EL',  name: 'Introduction to Electronics', university: 'Georgia Tech', hours: '~50 h', logo: '/logos/gatech.png', color: '#B3A369', link: 'https://www.coursera.org/learn/electronics' },
  { code: 'IOT', name: 'An Introduction to Programming the Internet of Things (IOT)', university: 'UC Irvine', hours: '~80 h', logo: '/logos/uci.png', color: '#0064A4', link: 'https://www.coursera.org/specializations/iot' },
  { code: 'CAD', name: '3D Modeling for 3D Printing and Laser Cutting on Fusion 360', university: 'Packt', hours: '~6 h', logo: '/logos/packt-ros.png', color: '#E74C3C', link: 'https://www.coursera.org/learn/3d-modeling-fusion-360' },
  { code: 'CPP', name: 'Coding for Everyone: C and C++', university: 'UC Santa Cruz', hours: '~80 h', logo: '/logos/ucsc.png', color: '#003C6C', link: 'https://www.coursera.org/specializations/coding-for-everyone' },
  { code: 'EMB', name: 'Introduction to Embedded Systems Software and Development Environments', university: 'CU Boulder', hours: '~9 h', logo: '/logos/cuboulder.png', color: '#CFB87C', link: 'https://www.coursera.org/learn/introduction-embedded-systems' },
  { code: 'PE',  name: 'Introduction to Power Electronics', university: 'CU Boulder', hours: '~10 h', logo: '/logos/cuboulder.png', color: '#CFB87C', link: 'https://www.coursera.org/learn/power-electronics' },
  { code: 'ROS', name: 'Mastering ROS 2 for Robotics Programming', university: 'Packt', hours: '~4 h', logo: '/logos/packt-ros.png', color: '#E74C3C', link: 'https://www.coursera.org/specializations/packt-mastering-ros-2-for-robotics-programming' },
  { code: 'CV',  name: 'Introduction to Computer Vision and Image Processing', university: 'IBM', hours: '~20 h', logo: '/logos/ibm.png', color: '#0530AD', link: 'https://www.coursera.org/learn/introduction-computer-vision-watson-opencv' },
  { code: 'ARD', name: 'Interfacing with the Arduino', university: 'UC Irvine', hours: '~10 h', logo: '/logos/uci-arduino.png', color: '#0064A4', link: 'https://www.coursera.org/learn/interface-with-arduino' },
];

export interface WeekDay {
  day: string;       // PO, UT, ST, ST, PI
  dayEN: string;     // MON, TUE, WED, THU, FRI
  hours: number;
  subject: string;   // e.g. 'MR', 'EL', 'LAB'
  label: string;     // e.g. 'Modern Robotics'
  labelSK: string;
}

export interface Week {
  weekNum: number;
  focus: string;
  focusSK: string;
  days: WeekDay[];
  lab?: string;
  labSK?: string;
  project?: string;
  projectSK?: string;
}

export interface Month {
  month: number;
  title: string;
  titleSK: string;
  subtitle: string;
  subtitleSK: string;
  activeCourses: string[]; // program codes
  weeks: Week[];
  milestone?: string;
  milestoneSK?: string;
}

export const scheduleMonths: Month[] = [
  // MONTH 1
  {
    month: 1,
    title: 'Electronics I',
    titleSK: 'Elektronika I',
    subtitle: 'Circuit theory, Kirchhoff, op-amps',
    subtitleSK: 'Teória obvodov, Kirchhoff, op-ampy',
    activeCourses: ['MR', 'EL'],
    weeks: [
      {
        weekNum: 1, focus: 'Circuit elements + Kirchhoff', focusSK: 'Prvky obvodu + Kirchhoff',
        days: [
          { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
          { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'EL', label: 'Electronics', labelSK: 'Elektronika' },
          { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
          { day: 'ST', dayEN: 'THU', hours: 3, subject: 'EL', label: 'Electronics', labelSK: 'Elektronika' },
          { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Robotics Lab', labelSK: 'Robotics Lab' },
        ],
        lab: 'Breadboard fundamentals. Build LED + resistor circuit. Measure voltage and current with multimeter.',
        labSK: 'Základy breadboardu. Postav LED + resistor obvod. Multimetrom zmeraj napätie a prúd.',
      },
      {
        weekNum: 2, focus: 'Op-amps', focusSK: 'Op-ampy',
        days: [
          { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
          { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'EL', label: 'Electronics', labelSK: 'Elektronika' },
          { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
          { day: 'ST', dayEN: 'THU', hours: 3, subject: 'EL', label: 'Electronics', labelSK: 'Elektronika' },
          { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Robotics Lab', labelSK: 'Robotics Lab' },
        ],
        lab: 'Potentiometer voltage divider. Adjustable voltage measured with multimeter.',
        labSK: 'Potenciometer voltage divider. Nastaviteľné napätie merané multimetrom.',
      },
      {
        weekNum: 3, focus: 'Op-amps / Filters', focusSK: 'Op-ampy / Filtre',
        days: [
          { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
          { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'EL', label: 'Electronics', labelSK: 'Elektronika' },
          { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
          { day: 'ST', dayEN: 'THU', hours: 3, subject: 'EL', label: 'Electronics', labelSK: 'Elektronika' },
          { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Robotics Lab', labelSK: 'Robotics Lab' },
        ],
        lab: 'Light sensor. LDR + resistor voltage divider. Monitor voltage change by light.',
        labSK: 'Svetelný senzor. LDR + resistor voltage divider. Sleduj zmenu napatia podľa svetla.',
      },
      {
        weekNum: 4, focus: 'Diodes', focusSK: 'Diody',
        days: [
          { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
          { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'EL', label: 'Electronics', labelSK: 'Elektronika' },
          { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
          { day: 'ST', dayEN: 'THU', hours: 3, subject: 'EL', label: 'Electronics', labelSK: 'Elektronika' },
          { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Robotics Lab', labelSK: 'Robotics Lab' },
        ],
        lab: 'Diode experiments. LED polarity + diode protection.',
        labSK: 'Experimenty s diódami. LED polarita + diódová ochrana.',
      },
    ],
    milestone: 'First real understanding of simple circuits.',
    milestoneSK: 'Prvykrat realne rozumies jednoduchemu obvodu.',
  },
  // MONTH 2
  {
    month: 2,
    title: 'Electronics II + First Hardware',
    titleSK: 'Elektronika II + Prvý Hardware',
    subtitle: 'Rectifiers, MOSFET, BJT, Arduino',
    subtitleSK: 'Usmerňovače, MOSFET, BJT, Arduino',
    activeCourses: ['MR', 'EL'],
    weeks: [
      { weekNum: 5, focus: 'Diodes/Rectifiers', focusSK: 'Diody/Usmerňovače', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'EL', label: 'Electronics', labelSK: 'Elektronika' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'EL', label: 'Electronics', labelSK: 'Elektronika' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Robotics Lab', labelSK: 'Robotics Lab' },
      ], lab: 'Rectifier simulation in LTspice.', labSK: 'Simulácia usmerňovača v LTspice.' },
      { weekNum: 6, focus: 'Voltage regulators / MOSFET', focusSK: 'Regulátory napätia / MOSFET', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'EL', label: 'Electronics', labelSK: 'Elektronika' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'EL', label: 'Electronics', labelSK: 'Elektronika' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Robotics Lab', labelSK: 'Robotics Lab' },
      ], lab: 'MOSFET as switch. Low-voltage DC load.', labSK: 'MOSFET ako spínač. Nízkonapäťová DC záťaž.' },
      { weekNum: 7, focus: 'MOSFET continued', focusSK: 'MOSFET pokračovanie', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'EL', label: 'Electronics', labelSK: 'Elektronika' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'EL', label: 'Electronics', labelSK: 'Elektronika' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Robotics Lab', labelSK: 'Robotics Lab' },
      ], lab: 'Arduino -> MOSFET -> DC motor. First motor control!', labSK: 'Arduino -> MOSFET -> DC motor. Prvy motor control!' },
      { weekNum: 8, focus: 'BJT + Course finish', focusSK: 'BJT + Dokončenie kurzu', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'EL', label: 'Electronics', labelSK: 'Elektronika' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'EL', label: 'Electronics', labelSK: 'Elektronika' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Robotics Lab', labelSK: 'Robotics Lab' },
      ], project: 'PROJECT #1 - Automatic light. LDR -> Arduino -> threshold -> LED.', projectSK: 'PROJEKT #1 - Automatické svetlo. LDR -> Arduino -> threshold -> LED.' },
    ],
    milestone: 'Electronics course complete.',
    milestoneSK: 'Kurz elektroniky dokončený.',
  },
  // MONTH 3
  {
    month: 3, title: 'IoT + Arduino', titleSK: 'IoT + Arduino',
    subtitle: 'Embedded systems, IoT architecture, Arduino C', subtitleSK: 'Embedded systémy, IoT architektúra, Arduino C',
    activeCourses: ['MR', 'IOT'],
    weeks: [
      { weekNum: 9, focus: 'IoT Course 1: embedded / IoT architecture', focusSK: 'IoT Kurz 1: embedded / IoT architektúra', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Arduino Lab', labelSK: 'Arduino Lab' },
      ], lab: 'Arduino digital I/O. Button -> Arduino -> LED.', labSK: 'Arduino digitálny I/O. Tlačidlo -> Arduino -> LED.' },
      { weekNum: 10, focus: 'IoT Course 1 continued', focusSK: 'IoT Kurz 1 pokračovanie', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Arduino Lab', labelSK: 'Arduino Lab' },
      ], lab: 'Temperature/light monitoring. Sensor -> Arduino -> Serial Monitor.', labSK: 'Monitorovanie teploty/svetla. Senzor -> Arduino -> Serial Monitor.' },
      { weekNum: 11, focus: 'IoT Course 2: Arduino + C', focusSK: 'IoT Kurz 2: Arduino + C', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Arduino Lab', labelSK: 'Arduino Lab' },
      ], lab: 'PWM LED dimmer. Potentiometer -> ADC -> Arduino -> PWM -> LED.', labSK: 'PWM LED stmievač. Potenciometer -> ADC -> Arduino -> PWM -> LED.' },
      { weekNum: 12, focus: 'Arduino + C continued', focusSK: 'Arduino + C pokračovanie', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Arduino Lab', labelSK: 'Arduino Lab' },
      ], project: 'PROJECT #2 - Servo distance scanner. Servo + ultrasonic sensor, scan 0-180 degrees.', projectSK: 'PROJEKT #2 - Servo distance scanner. Servo + ultrazvukovy senzor, scan 0-180 stupňov.' },
    ],
    milestone: 'First mechatronics project complete.',
    milestoneSK: 'Prvý mechatronický projekt hotový.',
  },
  // MONTH 4
  {
    month: 4, title: 'IoT + Fusion 360', titleSK: 'IoT + Fusion 360',
    subtitle: 'Mechanical design, 3D printing, CAD', subtitleSK: 'Mechanický dizajn, 3D tlač, CAD',
    activeCourses: ['MR', 'IOT', 'CAD'],
    weeks: [
      { weekNum: 13, focus: 'Fusion: UI + sketches + modeling', focusSK: 'Fusion: UI + sketche + modelovanie', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'CAD', label: 'Fusion 360', labelSK: 'Fusion 360' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'CAD Lab', labelSK: 'CAD Lab' },
      ], lab: 'Design first sensor mount.', labSK: 'Navrhni prvý sensor mount.' },
      { weekNum: 14, focus: 'Fusion: constraints + drawings', focusSK: 'Fusion: constraints + výkresy', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'CAD', label: 'Fusion 360', labelSK: 'Fusion 360' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'CAD Lab', labelSK: 'CAD Lab' },
      ], lab: 'Design servo bracket.', labSK: 'Navrhni servo bracket.' },
      { weekNum: 15, focus: 'Fusion: 3D printing + tolerances', focusSK: 'Fusion: 3D tlač + tolerancie', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'CAD', label: 'Fusion 360', labelSK: 'Fusion 360' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'CAD Lab', labelSK: 'CAD Lab' },
      ], lab: 'Join servo bracket + sensor mount assembly.', labSK: 'Spoj servo bracket + sensor mount zostavu.' },
      { weekNum: 16, focus: 'Fusion: parametric modeling', focusSK: 'Fusion: parametrické modelovanie', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'CAD', label: 'Fusion 360', labelSK: 'Fusion 360' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Project Lab', labelSK: 'Projektový Lab' },
      ], project: 'PROJECT #3 - 3D-designed distance scanner. Custom Fusion CAD mount + servo + sensor + Arduino.', projectSK: 'PROJEKT #3 - 3D-designovany distance scanner. Vlastny Fusion CAD mount + servo + senzor + Arduino.' },
    ],
    milestone: 'First CAD-designed hardware project.',
    milestoneSK: 'Prvy CAD-designovany hardverovy projekt.',
  },
  // MONTH 5
  {
    month: 5, title: 'IoT + C', titleSK: 'IoT + C',
    subtitle: 'Variables, control flow, functions, arrays', subtitleSK: 'Premenné, riadenie toku, funkcie, poľa',
    activeCourses: ['MR', 'IOT', 'CPP'],
    weeks: [
      { weekNum: 17, focus: 'C: variables, types, operators', focusSK: 'C: premenné, typy, operátory', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Programming Lab', labelSK: 'Programovací Lab' },
      ], lab: 'Rewrite Arduino logic into cleaner functions.', labSK: 'Prepíš Arduino logiku do čistejších funkcií.' },
      { weekNum: 18, focus: 'C: control flow', focusSK: 'C: riadenie toku', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Programming Lab', labelSK: 'Programovací Lab' },
      ], lab: 'Finite-state traffic light.', labSK: 'Stavový automat semaforu.' },
      { weekNum: 19, focus: 'C: functions + arrays', focusSK: 'C: funkcie + poľa', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Programming Lab', labelSK: 'Programovací Lab' },
      ], lab: 'Store last N sensor measurements, compute average.', labSK: 'Uloź posledných N meraní, vypočítaj priemer.' },
      { weekNum: 20, focus: 'C continued', focusSK: 'C pokračovanie', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Project Lab', labelSK: 'Projektový Lab' },
      ], project: 'PROJECT #4 - Parking sensor. Distance -> LED blink -> buzzer.', projectSK: 'PROJEKT #4 - Parkovací senzor. Vzdialenosť -> LED blikanie -> bzučiak.' },
    ],
  },
  // MONTH 6
  {
    month: 6, title: 'C + IoT Capstone + MR Finish', titleSK: 'C + IoT Capstone + MR Finish',
    subtitle: 'Motor driver, encoder, MR completion', subtitleSK: 'Motor driver, enkoder, dokončenie MR',
    activeCourses: ['MR', 'IOT', 'CPP'],
    weeks: [
      { weekNum: 21, focus: 'MR + C + IoT', focusSK: 'MR + C + IoT', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'IOT', label: 'IoT Course', labelSK: 'IoT Kurz' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Motor Lab', labelSK: 'Motor Lab' },
      ], lab: 'Motor driver + DC motor.', labSK: 'Motor driver + DC motor.' },
      { weekNum: 22, focus: 'MR + C', focusSK: 'MR + C', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Motor Lab', labelSK: 'Motor Lab' },
      ], lab: 'PWM motor speed control.', labSK: 'PWM riadenie rýchlosti motora.' },
      { weekNum: 23, focus: 'MR + C', focusSK: 'MR + C', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Motor Lab', labelSK: 'Motor Lab' },
      ], lab: 'Encoder reading.', labSK: 'Čítanie enkóderu.' },
      { weekNum: 24, focus: 'Smart motor module', focusSK: 'Smart motor modul', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'MR', label: 'Modern Robotics', labelSK: 'Modern Robotics' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Project Lab', labelSK: 'Projektový Lab' },
      ], project: 'PROJECT #5 - Smart motor module. Arduino -> PWM -> driver -> motor -> encoder -> RPM.', projectSK: 'PROJEKT #5 - Smart motor modul. Arduino -> PWM -> driver -> motor -> enkoder -> RPM.' },
    ],
    milestone: 'Modern Robotics + IoT complete.',
    milestoneSK: 'Modern Robotics + IoT dokončené.',
  },
  // MONTH 7
  {
    month: 7, title: 'C/C++ + Embedded', titleSK: 'C/C++ + Embedded',
    subtitle: 'GCC, Make, memory, modular firmware', subtitleSK: 'GCC, Make, pamat, modulárny firmware',
    activeCourses: ['CPP', 'EMB'],
    weeks: [
      { weekNum: 25, focus: 'Embedded Module 1', focusSK: 'Embedded Modul 1', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'EMB', label: 'Embedded Systems', labelSK: 'Embedded Systemy' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'EMB', label: 'Embedded Systems', labelSK: 'Embedded Systemy' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Embedded Lab', labelSK: 'Embedded Lab' },
      ], lab: 'GCC compile workflow.', labSK: 'GCC kompilačný workflow.' },
      { weekNum: 26, focus: 'GCC + Make', focusSK: 'GCC + Make', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'EMB', label: 'Embedded Systems', labelSK: 'Embedded Systemy' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'EMB', label: 'Embedded Systems', labelSK: 'Embedded Systemy' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Embedded Lab', labelSK: 'Embedded Lab' },
      ], lab: 'Multi-file embedded-style C project.', labSK: 'Viac-súborový embedded C projekt.' },
      { weekNum: 27, focus: 'Memory', focusSK: 'Pamäť', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'EMB', label: 'Embedded Systems', labelSK: 'Embedded Systemy' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'EMB', label: 'Embedded Systems', labelSK: 'Embedded Systemy' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Embedded Lab', labelSK: 'Embedded Lab' },
      ], lab: 'Stack vs heap + pointers experiment.', labSK: 'Stack vs heap + experimenty s pointermi.' },
      { weekNum: 28, focus: 'Embedded finish', focusSK: 'Embedded dokončenie', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'EMB', label: 'Embedded Systems', labelSK: 'Embedded Systemy' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'CPP', label: 'C/C++', labelSK: 'C/C++' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'EMB', label: 'Embedded Systems', labelSK: 'Embedded Systemy' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Project Lab', labelSK: 'Projektový Lab' },
      ], project: 'PROJECT #6 - Modular motor controller. motor.c + sensor.c + controller.c + main.c', projectSK: 'PROJEKT #6 - Modulárny motor controller. motor.c + sensor.c + controller.c + main.c' },
    ],
  },
  // MONTH 8
  {
    month: 8, title: 'C++ + Power Electronics + Robot Build', titleSK: 'C++ + Výkonová Elektronika + Stavba Robota',
    subtitle: 'Buck/boost converters, robot chassis', subtitleSK: 'Buck/boost meniče, podvozok robota',
    activeCourses: ['CPP', 'PE', 'CAD'],
    weeks: [
      { weekNum: 29, focus: 'Switched converters + buck', focusSK: 'Spínané meniče + buck', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'CPP', label: 'C++', labelSK: 'C++' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'PE', label: 'Power Electronics', labelSK: 'Výkonová Elektronika' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'CPP', label: 'C++', labelSK: 'C++' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'CAD', label: 'CAD/Project', labelSK: 'CAD/Projekt' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
      ], lab: 'LTspice buck converter simulation.', labSK: 'LTspice simulacia buck menicom.' },
      { weekNum: 30, focus: 'Boost/inverting converter', focusSK: 'Boost/invertujuci menic', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'CPP', label: 'C++', labelSK: 'C++' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'PE', label: 'Power Electronics', labelSK: 'Výkonová Elektronika' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'CPP', label: 'C++', labelSK: 'C++' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'CAD', label: 'CAD/Project', labelSK: 'CAD/Projekt' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
      ], lab: 'Power budget for future robot.', labSK: 'Power budget pre budúceho robota.' },
      { weekNum: 31, focus: 'PE finish + Chassis design', focusSK: 'PE dokončenie + Dizajn podvozku', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'CPP', label: 'C++', labelSK: 'C++' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'PE', label: 'Power Electronics', labelSK: 'Výkonová Elektronika' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'CPP', label: 'C++', labelSK: 'C++' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'CAD', label: 'Fusion 360', labelSK: 'Fusion 360' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
      ], lab: 'Design differential-drive chassis in Fusion 360.', labSK: 'Navrhni differential-drive podvozok vo Fusion 360.' },
      { weekNum: 32, focus: 'Robot #1 build', focusSK: 'Stavba Robota #1', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'CPP', label: 'C++', labelSK: 'C++' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'LAB', label: 'Build', labelSK: 'Stavba' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'CPP', label: 'C++', labelSK: 'C++' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'LAB', label: 'Build', labelSK: 'Stavba' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
      ], project: 'PROJECT #7 - ROBOT #1. 2x DC motor, encoders, driver, MCU, battery, wheels, CAD chassis.', projectSK: 'PROJEKT #7 - ROBOT #1. 2x DC motor, enkodery, driver, MCU, bateria, kolesa, CAD podvozok.' },
    ],
    milestone: 'First mobile robot built.',
    milestoneSK: 'Prvý mobilný robot postavený.',
  },
  // MONTH 9
  {
    month: 9, title: 'Robot Control + C++', titleSK: 'Riadenie Robota + C++',
    subtitle: 'Odometry, PID control, closed-loop', subtitleSK: 'Odometria, PID regulácia, uzavretá slučka',
    activeCourses: ['CPP'],
    weeks: [
      { weekNum: 33, focus: 'Independent motor control', focusSK: 'Nezávislé riadenie motorov', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'CPP', label: 'C++', labelSK: 'C++' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'CPP', label: 'C++', labelSK: 'C++' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
      ], lab: 'Independent left/right motor control.', labSK: 'Nezávislé riadenie ľavého/pravého motora.' },
      { weekNum: 34, focus: 'Encoders', focusSK: 'Enkodery', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'CPP', label: 'C++', labelSK: 'C++' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'CPP', label: 'C++', labelSK: 'C++' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
      ], lab: 'Compute wheel RPM from encoders.', labSK: 'Vypočítaj RPM kolies z enkoderov.' },
      { weekNum: 35, focus: 'Odometry basics', focusSK: 'Základy odometrie', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'CPP', label: 'C++', labelSK: 'C++' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'CPP', label: 'C++', labelSK: 'C++' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
      ], lab: 'Estimate distance traveled from wheel rotations.', labSK: 'Odhadni prejdenú vzdialenosť z rotácií kolies.' },
      { weekNum: 36, focus: 'PID speed control', focusSK: 'PID regulácia rýchlosti', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'CPP', label: 'C++', labelSK: 'C++' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'CPP', label: 'C++', labelSK: 'C++' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Project Lab', labelSK: 'Projektový Lab' },
      ], project: 'PROJECT #8 - Closed-loop mobile robot. PID speed control at 0.2 m/s.', projectSK: 'PROJEKT #8 - Uzavretá slučka mobilného robota. PID regulácia rýchlosti na 0.2 m/s.' },
    ],
    milestone: 'Robot has closed-loop control.',
    milestoneSK: 'Robot ma uzavretu regulacnu slucku.',
  },
  // MONTH 10
  {
    month: 10, title: 'ROS 2', titleSK: 'ROS 2',
    subtitle: 'Nodes, topics, services, actions, C++ ROS', subtitleSK: 'Nody, topiky, servisy, akcie, C++ ROS',
    activeCourses: ['ROS'],
    weeks: [
      { weekNum: 37, focus: 'ROS 2 course + setup', focusSK: 'ROS 2 kurz + setup', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'LAB', label: 'ROS Lab', labelSK: 'ROS Lab' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'ROS Lab', labelSK: 'ROS Lab' },
      ], lab: 'turtlesim -> nodes -> topics -> CLI.', labSK: 'turtlesim -> nody -> topiky -> CLI.' },
      { weekNum: 38, focus: 'Publishers/Subscribers', focusSK: 'Publishery/Subscribery', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'LAB', label: 'ROS Lab', labelSK: 'ROS Lab' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'LAB', label: 'ROS Lab', labelSK: 'ROS Lab' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'ROS Lab', labelSK: 'ROS Lab' },
      ], lab: 'Custom C++ publisher + subscriber nodes.', labSK: 'Vlastne C++ publisher + subscriber nody.' },
      { weekNum: 39, focus: 'Services + Actions + Params', focusSK: 'Servisy + Akcie + Parametre', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'LAB', label: 'ROS Lab', labelSK: 'ROS Lab' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'LAB', label: 'ROS Lab', labelSK: 'ROS Lab' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'ROS Lab', labelSK: 'ROS Lab' },
      ], lab: 'Simulated motor-control service.', labSK: 'Simulovaný motor-control servis.' },
      { weekNum: 40, focus: 'ROS Robot integration', focusSK: 'ROS Robot integracia', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'LAB', label: 'Robot Lab', labelSK: 'Robot Lab' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Project Lab', labelSK: 'Projektový Lab' },
      ], project: 'PROJECT #9 - ROS Robot. cmd_vel -> motor controller -> encoders -> odometry topic -> ROS 2.', projectSK: 'PROJEKT #9 - ROS Robot. cmd_vel -> motor controller -> enkodery -> odometry topik -> ROS 2.' },
    ],
    milestone: 'Embedded project becomes a ROS 2 robotics system.',
    milestoneSK: 'Z embedded projektu sa stava ROS 2 roboticky system.',
  },
  // MONTH 11
  {
    month: 11, title: 'Computer Vision + ROS', titleSK: 'Počítačové Videnie + ROS',
    subtitle: 'OpenCV, CNN, object detection, robot vision', subtitleSK: 'OpenCV, CNN, detekcia objektov, videnie robota',
    activeCourses: ['CV', 'ROS'],
    weeks: [
      { weekNum: 41, focus: 'CV fundamentals', focusSK: 'Základy CV', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'CV', label: 'Computer Vision', labelSK: 'Počítačové Videnie' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'CV', label: 'Computer Vision', labelSK: 'Počítačové Videnie' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Vision Lab', labelSK: 'Vision Lab' },
      ], lab: 'Webcam -> OpenCV -> live video.', labSK: 'Webcam -> OpenCV -> živé video.' },
      { weekNum: 42, focus: 'Image processing', focusSK: 'Spracovanie obrazu', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'CV', label: 'Computer Vision', labelSK: 'Počítačové Videnie' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'CV', label: 'Computer Vision', labelSK: 'Počítačové Videnie' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Vision Lab', labelSK: 'Vision Lab' },
      ], lab: 'Color segmentation. Detect red object.', labSK: 'Farebná segmentácia. Deteguj červený objekt.' },
      { weekNum: 43, focus: 'Classification/features', focusSK: 'Klasifikácia/features', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'CV', label: 'Computer Vision', labelSK: 'Počítačové Videnie' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'CV', label: 'Computer Vision', labelSK: 'Počítačové Videnie' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Vision Lab', labelSK: 'Vision Lab' },
      ], lab: 'Robot tracks colored object in image.', labSK: 'Robot sleduje farebný objekt v obraze.' },
      { weekNum: 44, focus: 'Object detection', focusSK: 'Detekcia objektov', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'CV', label: 'Computer Vision', labelSK: 'Počítačové Videnie' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'CV', label: 'Computer Vision', labelSK: 'Počítačové Videnie' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'ROS', label: 'ROS 2', labelSK: 'ROS 2' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Project Lab', labelSK: 'Projektový Lab' },
      ], project: 'PROJECT #10 - Vision follower. Camera -> OpenCV -> object position -> robot turns/follows.', projectSK: 'PROJEKT #10 - Vision follower. Kamera -> OpenCV -> pozícia objektu -> robot otáča/sleduje.' },
    ],
    milestone: 'Robot can see.',
    milestoneSK: 'Robot vidi.',
  },
  // MONTH 12
  {
    month: 12, title: 'Final Robotics Capstone', titleSK: 'Finálny Robotics Capstone',
    subtitle: 'Architecture, build, integration, testing, portfolio', subtitleSK: 'Architektúra, stavba, integrácia, testovanie, portfólio',
    activeCourses: [],
    weeks: [
      { weekNum: 45, focus: 'Architecture', focusSK: 'Architektúra', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'LAB', label: 'Design', labelSK: 'Dizajn' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'LAB', label: 'Design', labelSK: 'Dizajn' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'LAB', label: 'Design', labelSK: 'Dizajn' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'LAB', label: 'Build', labelSK: 'Stavba' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Build', labelSK: 'Stavba' },
      ], lab: 'Define final robot: MCU, motors, encoders, IMU, sensors, camera, ROS 2. Draw system architecture.', labSK: 'Definuj finálneho robota: MCU, motory, enkodery, IMU, senzory, kamera, ROS 2. Nakresli systémovú architektúru.' },
      { weekNum: 46, focus: 'Mechanical + Electronics', focusSK: 'Mechanika + Elektronika', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'LAB', label: 'CAD', labelSK: 'CAD' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'LAB', label: 'Electronics', labelSK: 'Elektronika' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'LAB', label: 'CAD', labelSK: 'CAD' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'LAB', label: 'Electronics', labelSK: 'Elektronika' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Build', labelSK: 'Stavba' },
      ], lab: 'Final chassis/mounts in Fusion. Power distribution + wiring.', labSK: 'Finálne chassis/mounty vo Fusion. Distribúcia napájania + kabeláž.' },
      { weekNum: 47, focus: 'Embedded + Control', focusSK: 'Embedded + Regulácia', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'LAB', label: 'Firmware', labelSK: 'Firmware' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'LAB', label: 'Firmware', labelSK: 'Firmware' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'LAB', label: 'Control', labelSK: 'Regulácia' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'LAB', label: 'Control', labelSK: 'Regulácia' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Integration', labelSK: 'Integrácia' },
      ], lab: 'Motor control, encoder feedback, odometry, safety states.', labSK: 'Riadenie motorov, enkoder feedback, odometria, bezpečnostné stavy.' },
      { weekNum: 48, focus: 'ROS + Perception + Autonomy', focusSK: 'ROS + Vnimanie + Autonómia', days: [
        { day: 'PO', dayEN: 'MON', hours: 3, subject: 'LAB', label: 'ROS Integration', labelSK: 'ROS Integrácia' },
        { day: 'UT', dayEN: 'TUE', hours: 3, subject: 'LAB', label: 'Vision', labelSK: 'Videnie' },
        { day: 'ST', dayEN: 'WED', hours: 3, subject: 'LAB', label: 'Autonomy', labelSK: 'Autonómia' },
        { day: 'ST', dayEN: 'THU', hours: 3, subject: 'LAB', label: 'Testing', labelSK: 'Testovanie' },
        { day: 'PI', dayEN: 'FRI', hours: 3, subject: 'LAB', label: 'Portfólio', labelSK: 'Portfólio' },
      ], project: 'FINAL PROJECT - Autonomous Mobile Robot. CAD + electronics + C/C++ + ROS 2 + OpenCV + demo video.', projectSK: 'FINALNY PROJEKT - Autonómny Mobilný Robot. CAD + elektronika + C/C++ + ROS 2 + OpenCV + demo video.' },
    ],
    milestone: 'Autonomous mobile robot complete. Full portfolio ready.',
    milestoneSK: 'Autonómny mobilný robot hotový. Kompletné portfólio pripravené.',
  },
];

// Color map for subject codes
export const subjectColors: Record<string, string> = {
  MR:  '#4E2A84',
  EL:  '#B3A369',
  IOT: '#0064A4',
  CAD: '#0056D2',
  CPP: '#003C6C',
  EMB: '#CFB87C',
  PE:  '#CFB87C',
  ROS: '#E74C3C',
  CV:  '#0530AD',
  LAB: '#22c55e',
};
