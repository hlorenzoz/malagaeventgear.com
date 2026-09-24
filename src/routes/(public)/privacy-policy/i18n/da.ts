import type { Copy } from './en';

export const updated = '2026-09-24';

const copy = {
	seo: {
		title: 'Privatlivspolitik | Malaga Event Gear (MEG)',
		description:
			'Læs den officielle privatlivspolitik for Malaga Event Gear. Se, hvordan vi indsamler, behandler og beskytter dine personoplysninger.'
	},
	hero: {
		badge: 'Oplysninger om privatliv',
		title: 'Privatlivspolitik',
		effectiveDate: 'Ikrafttrædelsesdato: 16. oktober 2025'
	},
	whoWeAre: {
		title: 'Hvem vi er',
		body: 'Vores hjemmesideadresse er https://malagaeventgear.com. Hos Malaga Event Gear (MEG) forpligter vi os til at beskytte dine personoplysninger og give gennemsigtige oplysninger om brugen af data.'
	},
	infoCollected: {
		title: 'Oplysninger vi indsamler og formålet',
		intro:
			'Vi indsamler og behandler personoplysninger, når du interagerer med vores etablerede forretningsgang (f.eks. når du anmoder om et tilbud via vores kontaktformular):',
		table: {
			headers: {
				category: 'Datakategori',
				purpose: 'Formål med behandlingen'
			},
			rows: [
				{
					category: 'Kontaktoplysninger',
					purpose:
						'Navn, e-mail, telefon eller WhatsApp-id til at afklare detaljer, koordinere logistik og bekræfte din booking. Foregår på engelsk eller spansk.'
				},
				{
					category: 'Eventlogistik',
					purpose: 'Præcist sted og tidspunkt for eventet til at koordinere levering, skræddersyet opsætning af udstyr og afhentning.'
				},
				{
					category: 'Finansielle data',
					purpose: 'Betalingsoplysninger behandlet under bookinger. Vi garanterer, at alle betalingstransaktioner er 100% sikre.'
				}
			]
		}
	},
	reviews: {
		title: 'Anmeldelser og social proof',
		body: 'Vi viser en FREMRAGENDE vurdering baseret på verificerede anmeldelser fra Google Virksomhedsprofil. Verificeringen af anmeldelserne håndteres dynamisk via Trustindex, hvilket sikrer, at den oprindelige kilde til alle kundeudtalelser er ægte og uændret.'
	},
	retention: {
		title: 'Opbevaring af data og rettigheder',
		body: 'Vi opbevarer kun dine personoplysninger, så længe det er nødvendigt for at gennemføre dine bestilte AV-services eller overholde lovkrav. Du har fulde rettigheder under GDPR til at få indsigt i, berigtige, gøre indsigelse mod eller anmode om sletning af dine personoplysninger til enhver tid ved at kontakte vores dataansvarlige.'
	}
} satisfies Copy;

export default copy;
