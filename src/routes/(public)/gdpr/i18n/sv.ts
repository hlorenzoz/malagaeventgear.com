import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'GDPR-efterlevnad | Malaga Event Gear (MEG)',
		description:
			'Förstå hur Malaga Event Gear skyddar dina personuppgifter enligt EU:s dataskyddsförordning (GDPR) vid ljud- och bilduthyrning.'
	},
	hero: {
		badge: 'EU-reglering',
		title: 'GDPR-efterlevnad',
		effectiveDateLine: 'Malaga Event Gear (MEG) | Gäller från: 16 oktober 2025'
	},
	commitment: {
		title: 'Vårt GDPR-åtagande',
		body: 'Eftersom Malaga Event Gear (MEG) är baserat i Malaga, Spanien, följer vi strikt EU:s dataskyddsförordning (GDPR) (förordning (EU) 2016/679) vad gäller insamling, behandling och lagring av personuppgifter.'
	},
	processing: {
		title: 'Behandling av personuppgifter',
		headers: {
			category: 'Datakategori',
			legalBasis: 'Rättslig grund',
			purpose: 'Användningssyfte'
		},
		rows: [
			{
				category: 'Identitet och kontakt',
				legalBasis: 'Fullgörande av avtal',
				purpose:
					'För att kommunicera, fastställa bokningsspecifikationer och skicka offertdetaljer via e-post, telefon eller WhatsApp på engelska eller spanska.'
			},
			{
				category: 'Evenemangsplats och schema',
				legalBasis: 'Fullgörande av avtal',
				purpose: 'Nödvändigt för att samordna leverans, skräddarsydd professionell installation och nedmontering.'
			},
			{
				category: 'Betalningsuppgifter',
				legalBasis: 'Fullgörande av avtal och säkerhet',
				purpose:
					'För att slutföra säkra transaktioner. Vi garanterar att alla betalningar i kassan är 100 % säkra.'
			}
		]
	},
	rights: {
		title: 'Dina rättigheter enligt GDPR',
		intro: 'Enligt GDPR har du följande rättigheter gällande de personuppgifter vi behandlar:',
		items: [
			{
				label: 'Rätt till tillgång:',
				body: 'Du kan begära bekräftelse och kopia av alla personuppgifter vi lagrar om dig.'
			},
			{
				label: 'Rätt till rättelse:',
				body: 'Du kan begära uppdatering av ofullständiga eller felaktiga uppgifter.'
			},
			{
				label: 'Rätt till radering:',
				body: 'Du kan begära att dina personuppgifter raderas.'
			},
			{
				label: 'Rätt till begränsning:',
				body: 'Du kan begära att vi begränsar behandlingen under vissa förutsättningar.'
			}
		]
	},
	rightsPortal: {
		title: 'Utöva dina GDPR-rättigheter',
		body: 'Välj en åtgärd nedan för att automatiskt skicka din integritetsförfrågan till vårt dataefterlevnadsteam.',
		buttons: {
			access: 'Begär tillgång till data',
			rectification: 'Begär rättelse av data',
			erasure: 'Begär radering av data'
		},
		actions: {
			access: 'tillgång till uppgifter',
			rectification: 'rättelse av uppgifter',
			erasure: 'radering av uppgifter'
		},
		status: {
			prefix: 'Din förfrågan om ',
			middle: ' har initierats. Vänligen mejla oss på ',
			suffix: ' för att slutföra verifieringen.'
		}
	}
} satisfies Copy;
