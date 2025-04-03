// Projekt Interface definieren
export interface Project {
	id: number;
	number: string;
	title: string;
	description: string;
	images: string[];
}

// Projektdaten
export const projects: Project[] = [
	{
		id: 1,
		number: '01',
		title: 'AnsichtsSachen',
		description:
			'Täglich sichtbar, meist wenig beachtet. Für manche schick, für andere überflüssig. Definierbar, aber doch zu subjektiv. Geliebt, verachtet oder gehasst: Kitsch ist kontrovers. Zwischen ihm und uns steht oftmals eine emotionale, persönliche Verbindung. Sie kann auf verschiedenen Gefühlen basieren und unterliegt meistens ganz unterschiedlichen Anlässen. „AnsichtsSachen“ ist eine fotografische Erkundung zu Kitsch und Empfinden, entstanden im Rahmen meiner Bachelorarbeit 2024.\n\nKonzept\nFotografie\nEditorial Design\nText\n\nFototextbuch\n170 Seiten\n17,5 x 24 x 2 cm',
		images: ['/images/01/01.jpg', '/images/01/02.jpg', '/images/01/03.jpg', '/images/01/04.jpg']
	},
	{
		id: 2,
		number: '02',
		title: 'Digitale Reizüberflutung',
		description: 'xx',
		images: [
			'/images/02/01.jpg',
			'/images/02/02.jpg',
			'/images/02/03.jpg',
			'/images/02/04.jpg',
			'/images/02/05.jpg',
			'/images/02/06.jpg'
		]
	},
	{
		id: 3,
		number: '03',
		title: 'zero % gin',
		description: 'xxx',
		images: ['/images/03/01.jpg', '/images/03/02.jpg', '/images/03/03.jpg']
	},
	{
		id: 4,
		number: '04',
		title: 'Zodiacs',
		description: 'xxx',
		images: [
			'/images/04/01.jpg',
			'/images/04/02.jpg',
			'/images/04/03.jpg',
			'/images/04/04.jpg',
			'/images/04/05.jpg',
			'/images/04/06.jpg'
		]
	},
	{
		id: 5,
		number: '05',
		title: 'Digital Design',
		description: 'View What’s Next ColorInsight 01/2025',
		images: ['/images/05/01.jpg', '/images/05/02.jpg', '/images/05/03.jpg', '/images/05/04.jpg']
	}
];
