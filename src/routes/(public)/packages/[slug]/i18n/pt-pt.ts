import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	benefits: {
		delivery: 'Montagem e entrega gratuitas (Málaga e Costa del Sol)',
		brands: 'Marcas premium (HK Audio, Audix, Midas)',
		support: 'Apoio técnico no local disponível'
	},
	faqs: {
		delivery: {
			q: 'A entrega e a montagem estão incluídas no preço do pacote?',
			a: 'Sim, nos pacotes premium (como o {wedding} e o {mice}), estão incluídas a entrega profissional completa, a instalação da cablagem e a desmontagem em Málaga e nos arredores imediatos. Nos pacotes normais, pode aplicar-se uma pequena taxa logística consoante a localização exata do seu evento.'
		},
		areas: {
			q: 'Que zonas cobrem na Andaluzia?',
			a: 'Servimos diariamente a cidade de Málaga, Marbella e toda a Costa del Sol. Também servimos Sevilha e Granada (para pedidos superiores a {price:outOfProvinceMinimum}). Atualmente não oferecemos a opção de levantamento, uma vez que trabalhamos exclusivamente com entrega.'
		},
		rain: {
			q: 'O que acontece se chover num evento ao ar livre?',
			a: 'Se o seu evento for ao ar livre, exigimos uma área coberta (tendas, pérgolas) para proteger o equipamento elétrico. Em caso de chuva sem cobertura, trabalharemos consigo para deslocar o equipamento para o interior. A segurança dos convidados e a proteção do equipamento de alta tensão são a nossa prioridade máxima.'
		},
		technician: {
			q: 'O que acontece se eu precisar de um técnico durante o meu evento?',
			a: 'Os nossos pacotes premium (como o {wedding} e o {mice}) já incluem monitorização técnica no local. Para os restantes pacotes, pode solicitar um engenheiro de som/luz dedicado que permaneça no local do seu evento, para uma experiência sem complicações.'
		}
	},
	popularBadge: 'Mais popular',
	itemsIncludedSuffix: 'itens incluídos',
	faqSectionTitle: 'Perguntas frequentes',
	stickyBarAriaLabel: 'Barra de ação fixa'
} satisfies Copy;
