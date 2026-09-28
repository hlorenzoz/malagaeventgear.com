import type { LocaleContentMap } from '../schema.ts';

export default {
	pages: {
		'/': { path: '/', keyword: 'aluguel de equipamento audiovisual em Málaga', status: 'propuesta' },
		'/about-us/': {
			path: '/sobre-nos/',
			keyword: 'empresa de aluguel de equipamento audiovisual em Málaga',
			status: 'propuesta'
		},
		'/contact/': { path: '/contato/', keyword: 'contato aluguel de equipamento audiovisual Málaga', status: 'propuesta' },
		'/equipment/': { path: '/equipamentos/', keyword: 'aluguel de equipamento de som e luz Málaga', status: 'propuesta' },
		'/packages/': {
			path: '/pacotes/',
			keyword: 'pacotes de aluguel de equipamento para eventos Málaga',
			status: 'propuesta'
		},
		'/faq/': {
			path: '/perguntas-frequentes/',
			keyword: 'perguntas frequentes aluguel de equipamento Málaga',
			status: 'propuesta'
		},
		'/meet-the-team/': { path: '/nossa-equipe/', keyword: 'técnicos de som e luz Málaga', status: 'propuesta' },
		'/blog/': { path: '/blog/', keyword: 'blog sobre aluguel de equipamento audiovisual Málaga', status: 'propuesta' },
		'/blog/categories/': {
			path: '/blog/categorias/',
			keyword: 'categorias do blog Malaga Event Gear',
			status: 'propuesta'
		},
		'/sitemap/': { path: '/mapa-do-site/', keyword: 'mapa do site Malaga Event Gear', status: 'propuesta' },
		'/privacy-policy/': {
			path: '/politica-de-privacidade/',
			keyword: 'política de privacidade Malaga Event Gear',
			status: 'propuesta'
		},
		'/terms-of-service/': {
			path: '/termos-de-uso/',
			keyword: 'termos de uso aluguel de equipamento',
			status: 'propuesta'
		},
		'/gdpr/': { path: '/gdpr/', keyword: 'GDPR conformidade e proteção de dados Malaga Event Gear', status: 'propuesta' },
		'/cookie-policy/': {
			path: '/politica-de-cookies/',
			keyword: 'política de cookies Malaga Event Gear',
			status: 'propuesta'
		},
		'/thank-you/': { path: '/obrigado/' }
	},
	segments: { category: 'categoria', author: 'autor' },
	packages: {
		eco: { slug: 'pacote-eco', keyword: 'aluguel de som e luz para festas pequenas Málaga', status: 'propuesta' },
		wedding: {
			slug: 'pacote-casamento',
			keyword: 'aluguel de equipamento de som para casamento Málaga',
			status: 'propuesta'
		},
		'product-presentation': {
			slug: 'pacote-lancamento-de-produto',
			keyword: 'aluguel de projetor para lançamento de produto Málaga',
			status: 'propuesta'
		},
		'basic-mice': {
			slug: 'pacote-mice-basico',
			keyword: 'equipamento audiovisual para pequenas reuniões corporativas Málaga',
			status: 'propuesta'
		},
		mice: {
			slug: 'pacote-mice',
			keyword: 'equipamento audiovisual para conferências e congressos Málaga',
			status: 'propuesta'
		}
	},
	categories: {
		'audio-visual-rental': { slug: 'aluguel-de-equipamento-audiovisual', name: 'Aluguel de equipamento audiovisual' },
		'corporate-enterprise': { slug: 'empresas-corporativo', name: 'Empresas' },
		events: { slug: 'eventos', name: 'Eventos' },
		gadgets: { slug: 'gadgets', name: 'Gadgets' },
		news: { slug: 'noticias', name: 'Notícias' },
		weddings: { slug: 'casamentos', name: 'Casamentos' }
	},
	posts: {
		'audio-visual-rental': {
			slug: 'aluguel-de-audiovisual-para-eventos',
			keyword: 'aluguel de audiovisual para eventos em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-conferences': {
			slug: 'material-audiovisual-conferencia',
			keyword: 'material audiovisual para conferência em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-events': {
			slug: 'aluguel-de-audiovisual-para-eventos-corporativos',
			keyword: 'aluguel de audiovisual para eventos corporativos em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-product-launches': {
			slug: 'audiovisual-necessario-lancamento-produto',
			keyword: 'o que é preciso de audiovisual em um lançamento de produto em Málaga',
			status: 'propuesta'
		},
		'event-technology-service': {
			slug: 'iluminacao-e-palco-para-eventos',
			keyword: 'iluminação e palco para eventos Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-meetings': {
			slug: 'material-audiovisual-reuniao-corporativa',
			keyword: 'material audiovisual para reunião corporativa em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-press-conferences': {
			slug: 'material-audiovisual-coletiva-imprensa',
			keyword: 'material audiovisual para coletiva de imprensa em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-seminars': {
			slug: 'material-audiovisual-seminario',
			keyword: 'material audiovisual para seminário em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-trade-shows': {
			slug: 'material-audiovisual-feira',
			keyword: 'material audiovisual para feira em Málaga',
			status: 'propuesta'
		},
		'audiovisual-equipment-rental-service': {
			slug: 'locacao-de-equipamentos-audiovisuais',
			keyword: 'locação de equipamentos audiovisuais em Málaga',
			status: 'propuesta'
		},
		'headset-lavalier-microphone-rental': {
			slug: 'aluguel-microfone-lapela-headset',
			keyword: 'aluguel de microfone de lapela e headset em Málaga',
			status: 'propuesta'
		},
		'stage-lighting-rental': {
			slug: 'aluguel-de-iluminacao-de-palco',
			keyword: 'aluguel de iluminação de palco em Málaga',
			status: 'propuesta'
		},
		'stage-uplighting': {
			slug: 'aluguel-de-uplighting',
			keyword: 'aluguel de uplighting em Málaga',
			status: 'propuesta'
		},
		'stage-lighting-for-weddings': {
			slug: 'iluminacao-de-palco-para-casamento',
			keyword: 'iluminação de palco para casamento em Málaga',
			status: 'propuesta'
		},
		'lighting-ideas-for-wedding-rentals': {
			slug: 'ideias-iluminacao-casamento',
			keyword: 'ideias de iluminação para casamento em Málaga',
			status: 'propuesta'
		},
		'smoke-machine-rental': {
			slug: 'aluguel-de-maquina-de-fumaca',
			keyword: 'aluguel de máquina de fumaça em Málaga',
			status: 'propuesta'
		},
		'wedding-rentals': {
			slug: 'locacao-para-casamento',
			keyword: 'locação para casamento em Málaga',
			status: 'propuesta'
		},
		'how-to-choose-wedding-rentals': {
			slug: 'como-escolher-a-locacao-para-casamento',
			keyword: 'como escolher a locação para casamento em Málaga',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: 'som-para-cerimonia-de-casamento',
			keyword: 'som para cerimônia de casamento em Málaga',
			status: 'propuesta'
		},
		'outdoor-wedding-rental-considerations': {
			slug: 'locacao-casamento-ar-livre',
			keyword: 'locação para casamento ao ar livre em Málaga',
			status: 'propuesta'
		},
		'indoor-wedding-rental-essentials': {
			slug: 'locacao-casamento-ambiente-interno',
			keyword: 'locação para casamento em ambiente interno em Málaga',
			status: 'propuesta'
		},
		'essential-items-for-wedding-rentals': {
			slug: 'itens-essenciais-locacao-casamento',
			keyword: 'itens essenciais na locação para casamento em Málaga',
			status: 'propuesta'
		},
		'making-the-most-of-wedding-rentals': {
			slug: 'aproveitar-ao-maximo-a-locacao-para-casamento',
			keyword: 'aproveitar ao máximo a locação para casamento',
			status: 'propuesta'
		},
		'wedding-rentals-online': {
			slug: 'locacao-casamento-online',
			keyword: 'locação para casamento online em Málaga',
			status: 'propuesta'
		},
		'wedding-rentals-near-me': {
			slug: 'locacao-casamento-perto-de-mim',
			keyword: 'locação para casamento perto de mim',
			status: 'propuesta'
		},
		'eco-friendly-wedding-rental-options': {
			slug: 'locacao-sustentavel-casamento-malaga',
			keyword: 'locação sustentável para casamento em Málaga',
			status: 'propuesta'
		},
		'tips-for-reducing-wedding-rental-costs': {
			slug: 'economizar-na-locacao-para-casamento',
			keyword: 'economizar na locação para casamento',
			status: 'propuesta'
		},
		'questions-to-ask-wedding-rental-companies': {
			slug: 'perguntas-para-fazer-na-locacao-para-casamento',
			keyword: 'perguntas para fazer na locação para casamento',
			status: 'propuesta'
		},
		'pros-and-cons-of-wedding-rentals': {
			slug: 'pros-e-contras-locacao-para-casamento',
			keyword: 'prós e contras da locação para casamento',
			status: 'propuesta'
		},
		'all-in-one-wedding-rental-packages': {
			slug: 'pacotes-completos-locacao-para-casamento',
			keyword: 'pacotes completos de locação para casamento em Málaga',
			status: 'propuesta'
		},
		'how-to-compare-wedding-rental-quotes': {
			slug: 'comparar-orcamentos-locacao-para-casamento',
			keyword: 'comparar orçamentos de locação para casamento em Málaga',
			status: 'propuesta'
		},
		'latest-trends-in-wedding-rentals': {
			slug: 'tendencias-locacao-para-casamento',
			keyword: 'tendências na locação para casamento em Málaga',
			status: 'propuesta'
		},
		'managing-last-minute-wedding-rental-changes': {
			slug: 'mudancas-ultima-hora-locacao-para-casamento',
			keyword: 'mudanças de última hora na locação para casamento em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-training-sessions': {
			slug: 'material-audiovisual-treinamento',
			keyword: 'material audiovisual para treinamento em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-gala-dinners': {
			slug: 'material-audiovisual-jantar-gala',
			keyword: 'material audiovisual para jantar de gala em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-remote-presentations': {
			slug: 'aluguel-de-audiovisual-para-apresentacoes-remotas',
			keyword: 'aluguel de audiovisual para apresentações remotas em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-virtual-events': {
			slug: 'aluguel-de-audiovisual-para-eventos-virtuais',
			keyword: 'aluguel de audiovisual para eventos virtuais em Málaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-at-progold-summit-2026-in-torremolinos': {
			slug: 'producao-audiovisual-progold-summit-2026-torremolinos',
			keyword: 'produção audiovisual do PROGOLD SUMMIT 2026 em Torremolinos',
			status: 'propuesta'
		},
		'news-malaga-event-gear-supplies-display-screens-for-exhibitor-stands-at-ecoc-2026-in-malaga': {
			slug: 'telas-de-estande-ecoc-2026-malaga',
			keyword: 'telas de estande da ECOC 2026 em Málaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-for-bmotion-in-benahavis': {
			slug: 'producao-audiovisual-bmotion-benahavis',
			keyword: 'produção audiovisual Bmotion em Benahavís',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-premium-technical-support-for-bmotions-high-profile-corporate-project-in-marbella': {
			slug: 'suporte-tecnico-bmotion-marbella',
			keyword: 'suporte técnico Bmotion em Marbella',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
