import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	benefits: {
		delivery: 'Entrega e montagem gratuitas (Málaga e Costa del Sol)',
		brands: 'Marcas premium (HK Audio, Audix, Midas)',
		support: 'Suporte técnico no local disponível'
	},
	faqs: {
		delivery: {
			q: 'A entrega e a montagem estão incluídas no preço do pacote?',
			a: 'Sim, para pacotes premium (como o {wedding} e o {mice}), a entrega profissional completa, a instalação do cabeamento e a desmontagem em Málaga e arredores imediatos estão incluídas. Para pacotes padrão, pode ser cobrada uma pequena taxa logística dependendo da localização exata do seu evento.'
		},
		areas: {
			q: 'Quais regiões vocês atendem na Andaluzia?',
			a: 'Atendemos diariamente a cidade de Málaga, Marbella e toda a Costa del Sol. Também atendemos Sevilha e Granada (para pedidos acima de {price:outOfProvinceMinimum}). No momento não oferecemos a opção de retirada, já que trabalhamos exclusivamente com entrega.'
		},
		rain: {
			q: 'O que acontece se chover em um evento ao ar livre?',
			a: 'Se o seu evento for ao ar livre, exigimos uma área coberta (tendas, pérgolas) para proteger o equipamento elétrico. Em caso de chuva sem cobertura, trabalharemos com você para levar o equipamento para um espaço interno. A segurança dos convidados e a proteção do equipamento de alta tensão são nossa prioridade máxima.'
		},
		technician: {
			q: 'O que acontece se eu precisar de um técnico durante o meu evento?',
			a: 'Nossos pacotes premium (como o {wedding} e o {mice}) já incluem monitoramento técnico no local. Para os demais pacotes, você pode solicitar um engenheiro de som/luz dedicado para ficar no seu local de evento, garantindo uma experiência sem estresse.'
		}
	},
	popularBadge: 'Mais popular',
	itemsIncludedSuffix: 'itens incluídos',
	faqSectionTitle: 'Perguntas frequentes',
	stickyBarAriaLabel: 'Barra fixa de chamada para ação'
} satisfies Copy;
