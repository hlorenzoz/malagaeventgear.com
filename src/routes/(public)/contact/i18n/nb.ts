import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Kontakt for utleie av AV-utstyr i Malaga | MEG',
		description:
			'Ta kontakt med Malaga Event Gear for tilbud på utleie av lyd, lys og skjermer. Teknisk support hele døgnet, alle ukens dager.'
	},
	schema: {
		name: 'Kontakt oss - Malaga Event Gear',
		description:
			'Kontakt det tekniske teamet hos Malaga Event Gear for å be om skreddersydde tilbud på utleie av lyd, lys og skjermer.'
	},
	whatsappLinkText: 'Send oss en melding',
	messages: {
		packIntro: 'Hei, jeg er interessert i å bestille pakken: {pack}. Gi meg gjerne beskjed om tilgjengelighet og detaljer.',
		categoryIntro:
			'Hei, jeg er interessert i å bestille utstyr fra kategorien: {category}. Jeg ser frem til tilbudet deres.'
	},
	errors: {
		pastDate: 'Velg en arrangementsdato etter i dag.'
	},
	form: {
		namePlaceholder: 'Fullt navn',
		emailPlaceholder: 'E-postadresse',
		phonePlaceholder: 'Telefon',
		messagePlaceholder: 'Melding'
	}
} satisfies Copy;
