// Projekt Interface definieren
export interface Project {
    id: number;
    number: string;
    title: string;
    subtitle?: string;
    description: string;
    details?: string[];
    images: string[];
}

// Projektdaten
export const projects: Project[] = [
    {
        id: 1,
        number: '01',
        title: 'AnsichtsSachen',
        subtitle: 'Kitsch und Empfinden – Eine Selbsterkundung',
        description:
            '„Täglich sichtbar, meist wenig beachtet. Für manche schick, für andere überflüssig. Definierbar, aber doch zu subjektiv. Geliebt, verachtet oder gehasst: Kitsch ist kontrovers. Zwischen ihm und uns steht oftmals eine emotionale, persönliche Verbindung. Sie kann auf verschiedenen Gefühlen basieren und unterliegt meistens ganz unterschiedlichen Anlässen."\n\n„AnsichtsSachen" ist eine fotografische Erkundung zu Kitsch und Empfinden, entstanden im Rahmen meiner Bachelorarbeit 2024.',
        details: [
            'Konzept',
            'Fotografie',
            'Editorial Design',
            'Text',
            'Fototextbuch',
            '170 Seiten',
            '17,5 x 24 x 2 cm',
            '2024'
        ],
        images: [
            '/images/project1/01_AnsichtsSachen.webp',
            '/images/project1/02_AnsichtsSachen.webp',
            '/images/project1/03_AnsichtsSachen.webp',
            '/images/project1/04_AnsichtsSachen.webp',
            '/images/project1/05_AnsichtsSachen.webp',
            '/images/project1/06_AnsichtsSachen.webp',
            '/images/project1/07_AnsichtsSachen.webp'
        ]
    },
    {
        id: 2,
        number: '02',
        title: 'Digitale Reizüberflutung',
        subtitle: 'Zine',
        description:
            'Was macht der Überfluss an digitalen Eindrücken mit uns? Wie resultiert er in Gefühlen und Bildern? Ein Zine, das reaktive Emotionen der digitalen Reizüberflutung analog festhält.',
        details: [
            'Konzept',
            'Illustration',
            'Grafikdesign',
            'Fotografie',
            'Editorial Design',
            'Zine',
            '29 Seiten',
            '27,5 x 21 cm',
            '2023'
        ],
        images: [
            '/images/project2/01_DigitaleReizberflutung.webp',
            '/images/project2/02_DigitaleReizberflutung.webp',
            '/images/project2/03_DigitaleReizberflutung.webp',
            '/images/project2/04_DigitaleReizberflutung.webp',
            '/images/project2/05_DigitaleReizberflutung.webp',
            '/images/project2/06_DigitaleReizberflutung.webp',
            '/images/project2/07_DigitaleReizberflutung.webp',
            '/images/project2/08_DigitaleReizberflutung.webp'
        ]
    },
    {
        id: 3,
        number: '03',
        title: 'Analog Zodiacs',
        subtitle: 'Illustrationen',
        description: '12 Collagen der Tierkreiszeichen in analoger Ausführung.',
        details: ['Konzept', 'Illustration', 'Fotografie', 'Editorial Design', '2021/2022'],
        images: [
            '/images/project3/01_Zodiacs.webp',
            '/images/project3/02_Zodiacs.webp',
            '/images/project3/03_Zodiacs.webp',
            '/images/project3/04_Zodiacs.webp',
            '/images/project3/05_Zodiacs.webp',
            '/images/project3/06_Zodiacs.webp',
            '/images/project3/07_Zodiacs.webp'
        ]
    },
    {
        id: 4,
        number: '04',
        title: "VIEW WHAT'S NEXT Color Insight 01/24",
        subtitle: 'Trendfarben-Fächer',
        description:
            'Neukonzeption des Color InSight Trendfarben-Fächers. Der "VIEW WHAT\'S NEXT ColorInsight"-Fächer erscheint quartalsweise. Erstellt im Auftrag von LEONHARD KURZ Stiftung & Co. KG.',
        details: ['Konzept', 'Editorial Design', '9 Seiten', '10 x 10,5 cm', '2024'],
        images: [
            '/images/project4/image1.webp',
            '/images/project4/image2.webp',
            '/images/project4/image3.webp'
        ]
    },
    {
        id: 5,
        number: '05',
        title: 'Zero % Gin',
        subtitle: 'Etikettendesign',
        description:
            'Konzept und Design eines fiktiven alkoholfreien Gins in zwei Varianten (Heiß- und Kaltprägeverfahren).\nErstellt im Auftrag von LEONHARD KURZ Stiftung & Co. KG.',
        details: ['Konzept', 'Grafikdesign', 'Fotografien: Thomas Riese', '2023'],
        images: [
            '/images/project5/image1.webp',
            '/images/project5/image2.webp',
            '/images/project5/image3.webp',
            '/images/project5/image4.webp',
            '/images/project5/image5.webp'
        ]
    },
    {
        id: 6,
        number: '06',
        title: '(((Echoes of my Mind)))',
        subtitle: 'Publikation',
        description:
            'Wie lässt sich Flüchtigkeit empfinden und visuell darstellen? Ein experimenteller Ansatz, der Flüchtigkeit im Alltag einfängt und grafisch visualisiert – durch Fotografie, Grafik und Poesie. Basierend auf Momentaufnahmen aus meiner Handy-Galerie 2023.',
        details: [
            'Konzept',
            'Illustration/Grafik',
            'Fotografie',
            'Editorial Design',
            'Fototextbuch',
            '120 Seiten',
            '12 x 15 cm',
            '2023/2024'
        ],
        images: [
            '/images/project6/image1.webp',
            '/images/project6/image2.webp',
            '/images/project6/image3.webp',
            '/images/project6/image4.webp',
            '/images/project6/image5.webp',
            '/images/project6/image6.webp',
            '/images/project6/image7.webp',
            '/images/project6/image8.webp',
            '/images/project6/image9.webp'
        ]
    },
    {
        id: 7,
        number: '07',
        title: 'Pentawards & LEONHARD KURZ',
        subtitle: 'Kooperations-Logo',
        description:
            'Konzept und Design eines Kooperationslogos zwischen Pentawards und LEONHARD KURZ Stiftung & Co. KG für die Pentawards Veranstaltung 2023.\nErstellt im Auftrag von LEONHARD KURZ Stiftung & Co. KG.',
        details: ['Konzept', 'Grafikdesign', '2023'],
        images: ['/images/project7/image1.webp']
    }
];
