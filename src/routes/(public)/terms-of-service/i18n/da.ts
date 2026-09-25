import type { Copy } from './en';

export const updated = '2026-09-25';

const copy = {
	seo: {
		title: 'Vilkår og betingelser | Malaga Event Gear (MEG)',
		description:
			'Læs de officielle vilkår og betingelser for udlejning hos Malaga Event Gear. Forstå vores politikker for booking, betaling og sikker service.'
	},
	hero: {
		badge: 'Juridisk ramme',
		title: 'Vilkår og betingelser',
		effectiveDate: 'Ikrafttrædelsesdato: 16. oktober 2025'
	},
	intro: {
		title: 'Introduktion og accept af vilkår',
		body: 'Ved at få adgang til eller bruge de services, som Malaga Event Gear (MEG) leverer, accepterer du at være bundet af disse vilkår og betingelser. Malaga Event Gear tilbyder professionel udlejning af lyd-, lys- og eventudstyr til forskellige lejligheder, herunder bryllupper, private fester, virksomhedsevents, møder og MICE-konferencer.'
	},
	scope: {
		title: 'Omfang af services og tilbud',
		p1: 'Vi er specialister i at tilbyde aktive PA-lydanlæg i topklasse, professionelle belysningsløsninger (LED-lysbjælker, en Fresnel-spot med zoom og et trådløst sæt til uplighting), projektorer med høj lysstyrke, mikrofoner (kablede, trådløse, svanehals), en røgmaskine og scenepodier.',
		p2: 'Mange af vores pakker, som Wedding Pack og MICE Pack, inkluderer transport, professionel installation, teknisk support på stedet og nedtagning efter eventet for en helt stressfri oplevelse.'
	},
	limits: {
		title: 'Geografiske og driftsmæssige begrænsninger',
		p1: 'Vores services er primært koncentreret i Malaga-provinsen og på Costa del Sol (herunder Malaga by, Marbella, Fuengirola, Torremolinos, Estepona, Sevilla og tilstødende områder). Service til Granada er kun tilgængelig for pakker over {price:outOfProvinceMinimum} på grund af de ekstra omkostninger ved en endagstur uden for provinsen.',
		p2: 'Malaga Event Gear har åbent 7 dage om ugen fra kl. 8.00 til 20.00 for kommercielle henvendelser, og 24/7 for teknisk logistik og opsætningssupport.',
		p3: 'For at garantere fuldstændig teknisk præcision for vores internationale kunder foregår al kommunikation, dokumentation og bookinger på engelsk eller spansk.'
	},
	booking: {
		title: 'Booking, priser og sikkerhed',
		p1: 'Alle services skal bestilles med mindst 24 timers varsel. For at gennemføre en booking skal kunden oplyse det præcise sted og tidspunkt for eventet.',
		p2: 'Alle priser på vores hjemmeside er angivet uden moms (+{vat}). Vi garanterer, at alle betalingstransaktioner er 100% sikre og behandles via pålidelige finansielle gateways.'
	},
	obligations: {
		title: 'Kundens forpligtelser og ansvar for udstyret',
		body: 'Kunden er ansvarlig for at sikre adgang til lokalet og de nødvendige stikkontakter på det aftalte sted og tidspunkt. Kunden er indforstået med, at det lejede udstyr er af høj professionel kvalitet, og skal sikre udstyrets sikkerhed og fysiske integritet under den aftalte lejeperiode.'
	}
} satisfies Copy;

export default copy;
