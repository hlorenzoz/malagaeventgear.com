import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'AVG-naleving | Malaga Event Gear (MEG)',
		description:
			'Lees hoe Malaga Event Gear je persoonsgegevens beveiligt volgens de Algemene Verordening Gegevensbescherming (AVG) bij audiovisuele verhuur.'
	},
	hero: {
		badge: 'Europese regelgeving',
		title: 'AVG-naleving',
		effectiveDateLine: 'Malaga Event Gear (MEG) | Ingangsdatum: 16 oktober 2025'
	},
	commitment: {
		title: 'AVG-verbintenis',
		body: 'Omdat Malaga Event Gear (MEG) gevestigd is in Málaga, Spanje, houden we ons strikt aan de Algemene Verordening Gegevensbescherming (AVG) (Verordening (EU) 2016/679) met betrekking tot het verzamelen, verwerken en bewaren van persoonsgegevens.'
	},
	processing: {
		title: 'Details verwerking persoonsgegevens',
		headers: {
			category: 'Gegevenscategorie',
			legalBasis: 'Rechtsgrond',
			purpose: 'Gebruiksdoel'
		},
		rows: [
			{
				category: 'Identiteit & contact',
				legalBasis: 'Uitvoering van de overeenkomst',
				purpose:
					'Om te communiceren, boekingsdetails vast te leggen en offertedetails te versturen via e-mail, telefoon of WhatsApp, in het Engels of het Spaans.'
			},
			{
				category: 'Locatie & planning evenement',
				legalBasis: 'Uitvoering van de overeenkomst',
				purpose: 'Essentieel om levering, opbouw op maat en afbraaklogistiek te coördineren.'
			},
			{
				category: 'Betalingsgegevens',
				legalBasis: 'Uitvoering van de overeenkomst & beveiliging',
				purpose:
					'Om transacties veilig af te ronden. We garanderen dat alle betalingen bij het afrekenen 100% beveiligd zijn.'
			}
		]
	},
	rights: {
		title: 'Rechten van betrokkenen onder de AVG',
		intro: 'Onder de AVG heb je de volgende rechten met betrekking tot de persoonsgegevens die wij verwerken:',
		items: [
			{
				label: 'Recht op inzage:',
				body: 'Je kunt een bevestiging en kopie opvragen van alle persoonsgegevens die we van je bewaren.'
			},
			{
				label: 'Recht op rectificatie:',
				body: 'Je kunt vragen om onvolledige of onjuiste gegevens te laten corrigeren.'
			},
			{
				label: 'Recht op wissing:',
				body: 'Je kunt vragen om je persoonsgegevens te laten verwijderen.'
			},
			{
				label: 'Recht op beperking:',
				body: 'Je kunt vragen om de verwerking onder bepaalde voorwaarden te laten beperken.'
			}
		]
	},
	rightsPortal: {
		title: 'Oefen je AVG-rechten uit',
		body: 'Kies hieronder een actie om je privacyverzoek automatisch naar ons team voor gegevensbescherming te sturen.',
		buttons: {
			access: 'Verzoek om inzage',
			rectification: 'Verzoek om rectificatie',
			erasure: 'Verzoek om wissing'
		},
		status: {
			prefix: 'Je verzoek om ',
			middle: ' is in behandeling genomen. Mail ons op ',
			suffix: ' om de verificatie af te ronden.'
		}
	}
} satisfies Copy;

export default copy;
