import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Integritetspolicy | Malaga Event Gear (MEG)',
		description:
			'Läs den officiella integritetspolicyn för Malaga Event Gear. Lär dig hur vi samlar in, behandlar och skyddar din personliga information.'
	},
	hero: {
		badge: 'Information om integritet',
		title: 'Integritetspolicy',
		effectiveDate: 'Gäller från: 16 oktober 2025'
	},
	whoWeAre: {
		title: 'Vilka vi är',
		body: 'Vår webbplatsadress är https://malagaeventgear.com. På Malaga Event Gear (MEG) är vi engagerade i att skydda din personliga information och ge transparent information om dataanvändning.'
	},
	infoCollected: {
		title: 'Information vi samlar in och syftet med den',
		intro:
			'Vi samlar in och behandlar personuppgifter när du interagerar med vårt etablerade arbetsflöde (till exempel när du begär en offert via vårt förfrågningsformulär):',
		table: {
			headers: {
				category: 'Datakategori',
				purpose: 'Behandlingssyfte'
			},
			rows: [
				{
					category: 'Kontaktuppgifter',
					purpose:
						'Namn, e-post, telefon eller WhatsApp-id för att fastställa detaljer, samordna logistik och bekräfta din bokning. Genomförs på engelska eller spanska.'
				},
				{
					category: 'Evenemangslogistik',
					purpose:
						'Exakt plats och tid för evenemanget för att samordna leverans, skräddarsydd utrustningsinstallation och hämtning.'
				},
				{
					category: 'Finansiella uppgifter',
					purpose:
						'Betalningsinformation som behandlas vid bokningar. Vi garanterar att alla betalningstransaktioner är 100 % säkra.'
				}
			]
		}
	},
	reviews: {
		title: 'Recensioner och socialt bevis',
		body: 'Vi visar ett UTMÄRKT betyg baserat på verifierade Google My Business-recensioner. Recensionsverifieringen hanteras dynamiskt via Trustindex, vilket säkerställer att den ursprungliga källan för alla kundrecensioner är äkta och oförändrad.'
	},
	retention: {
		title: 'Datalagring och rättigheter',
		body: 'Vi lagrar dina personuppgifter endast så länge det är nödvändigt för att slutföra dina avtalade ljud- och bildtjänster eller för att uppfylla lagkrav. Du har fulla rättigheter enligt GDPR att när som helst få tillgång till, rätta, invända mot eller begära radering av dina personuppgifter genom att kontakta vår personuppgiftsansvarige.'
	}
} satisfies Copy;
