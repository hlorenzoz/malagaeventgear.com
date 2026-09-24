import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Kontakt os og få AV-tilbud | MEG',
		description:
			'Kontakt Malaga Event Gear for at anmode om tilbud på leje af lyd, lys og skærme. Teknisk support 24/7.'
	},
	schema: {
		name: 'Kontakt os - Malaga Event Gear',
		description:
			'Kontakt det tekniske team hos Malaga Event Gear for at anmode om skræddersyede tilbud på leje af lyd, lys og skærme.'
	},
	whatsappLinkText: 'Send os en besked',
	messages: {
		packIntro: 'Hej, jeg er interesseret i at booke pakken: {pack}. Fortæl mig venligst om ledighed og detaljer.',
		categoryIntro:
			'Hej, jeg er interesseret i at booke udstyr fra kategorien: {category}. Jeg ser frem til jeres tilbud.'
	},
	errors: {
		pastDate: 'Vælg venligst en eventdato efter i dag.'
	},
	form: {
		namePlaceholder: 'Fulde navn',
		emailPlaceholder: 'E-mailadresse',
		phonePlaceholder: 'Telefon',
		messagePlaceholder: 'Besked'
	}
} satisfies Copy;

export default copy;
