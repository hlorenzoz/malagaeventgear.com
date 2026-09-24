import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	benefits: {
		delivery: 'Gratis installation och leverans (Malaga och Costa del Sol)',
		brands: 'Förstklassiga varumärken (HK Audio, Audix, Midas)',
		support: 'Möjlighet till teknisk support på plats'
	},
	faqs: {
		delivery: {
			q: 'Ingår leverans och installation i paketpriset?',
			a: 'Ja, för premiumpaket (som {wedding} och {mice}) ingår komplett professionell leverans, kabeldragning och nedmontering i Malaga och dess närmaste förorter. För standardpaket kan en mindre logistisk avgift tillkomma beroende på evenemangets exakta plats.'
		},
		areas: {
			q: 'Vilka områden täcker ni i Andalusien?',
			a: 'Vi betjänar Malaga stad, Marbella och hela Costa del Sol dagligen. Vi betjänar även Sevilla och Granada (för beställningar över {price:outOfProvinceMinimum}). Vi erbjuder för närvarande inget alternativ för självhämtning eftersom vi enbart arbetar med leverans.'
		},
		rain: {
			q: 'Vad händer om det regnar vid ett utomhusevenemang?',
			a: 'Om ditt evenemang är utomhus kräver vi ett övertäckt område (tält, pergola) för att skydda elutrustningen. Vid regn utan skydd hjälper vi dig att flytta utrustningen inomhus. Gästernas säkerhet och skyddet av högspänningsutrustning är vår högsta prioritet.'
		},
		technician: {
			q: 'Vad händer om jag behöver en tekniker under mitt evenemang?',
			a: 'Våra premiumpaket (som {wedding} och {mice}) inkluderar redan teknisk övervakning på plats. För övriga paket kan du begära en dedikerad ljud-/ljustekniker som stannar kvar i lokalen, för en stressfri upplevelse.'
		}
	},
	popularBadge: 'Mest populär',
	itemsIncludedSuffix: 'delar ingår',
	faqSectionTitle: 'Vanliga frågor',
	stickyBarAriaLabel: 'Fast bokningsfält'
} satisfies Copy;
