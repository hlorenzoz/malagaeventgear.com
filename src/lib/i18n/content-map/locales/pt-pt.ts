import type { LocaleContentMap } from '../schema.ts';

export default {
	pages: {
		'/': { path: '/', keyword: 'aluguer de equipamento audiovisual em Málaga', status: 'propuesta' },
		'/about-us/': {
			path: '/sobre-nos/',
			keyword: 'empresa de aluguer de equipamento audiovisual em Málaga',
			status: 'propuesta'
		},
		'/contact/': { path: '/contacto/', keyword: 'contacto aluguer de equipamento audiovisual Málaga', status: 'propuesta' },
		'/equipment/': { path: '/equipamento/', keyword: 'aluguer de equipamento de som e luz Málaga', status: 'propuesta' },
		'/packages/': {
			path: '/pacotes/',
			keyword: 'pacotes de aluguer de equipamento para eventos Málaga',
			status: 'propuesta'
		},
		'/faq/': {
			path: '/perguntas-frequentes/',
			keyword: 'perguntas frequentes aluguer de equipamento Málaga',
			status: 'propuesta'
		},
		'/meet-the-team/': { path: '/a-nossa-equipa/', keyword: 'técnicos de som e luz Málaga', status: 'propuesta' },
		'/blog/': { path: '/blog/', keyword: 'blog sobre aluguer de equipamento audiovisual Málaga', status: 'propuesta' },
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
			path: '/termos-e-condicoes/',
			keyword: 'termos e condições aluguer de equipamento',
			status: 'propuesta'
		},
		'/gdpr/': { path: '/rgpd/', keyword: 'RGPD proteção de dados Malaga Event Gear', status: 'propuesta' },
		'/cookie-policy/': {
			path: '/politica-de-cookies/',
			keyword: 'política de cookies Malaga Event Gear',
			status: 'propuesta'
		},
		'/thank-you/': { path: '/obrigado/' }
	},
	segments: { category: 'categoria', author: 'autor' },
	packages: {
		eco: { slug: 'pacote-eco', keyword: 'aluguer de som e luz para festas pequenas Málaga', status: 'propuesta' },
		wedding: {
			slug: 'pacote-casamento',
			keyword: 'aluguer de equipamento de som para casamentos Málaga',
			status: 'propuesta'
		},
		'product-presentation': {
			slug: 'pacote-apresentacao-de-produto',
			keyword: 'aluguer de projetor para lançamento de produto Málaga',
			status: 'propuesta'
		},
		'basic-mice': {
			slug: 'pacote-mice-basico',
			keyword: 'equipamento audiovisual para pequenas reuniões de empresa Málaga',
			status: 'propuesta'
		},
		mice: {
			slug: 'pacote-mice',
			keyword: 'equipamento audiovisual para conferências e congressos Málaga',
			status: 'propuesta'
		}
	},
	categories: {
		'audio-visual-rental': { slug: 'aluguer-de-equipamento-audiovisual', name: 'Aluguer de equipamento audiovisual' },
		'corporate-enterprise': { slug: 'empresas-corporativo', name: 'Empresas' },
		events: { slug: 'eventos', name: 'Eventos' },
		gadgets: { slug: 'gadgets', name: 'Gadgets' },
		news: { slug: 'noticias', name: 'Notícias' },
		weddings: { slug: 'casamentos', name: 'Casamentos' }
	},
	posts: {
		'audio-visual-rental': {
			slug: 'aluguer-de-audiovisuais-para-eventos',
			keyword: 'aluguer de audiovisuais para eventos em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-conferences': {
			slug: 'audiovisual-necessario-conferencia',
			keyword: 'o que é preciso de audiovisual numa conferência em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-events': {
			slug: 'aluguer-de-audiovisuais-para-eventos-corporativos',
			keyword: 'aluguer de audiovisuais para eventos corporativos em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-product-launches': {
			slug: 'audiovisual-necessario-lancamento-produto',
			keyword: 'o que é preciso de audiovisual num lançamento de produto em Málaga',
			status: 'propuesta'
		},
		'event-technology-service': {
			slug: 'servicos-tecnicos-para-eventos',
			keyword: 'serviços técnicos para eventos Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-corporate-meetings': {
			slug: 'audiovisual-necessario-reuniao-empresa',
			keyword: 'o que é preciso de audiovisual numa reunião de empresa em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-press-conferences': {
			slug: 'aluguer-de-audiovisuais-para-conferencias-de-imprensa',
			keyword: 'aluguer de audiovisuais para conferências de imprensa em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-seminars': {
			slug: 'aluguer-de-audiovisuais-para-seminarios',
			keyword: 'aluguer de audiovisuais para seminários em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-trade-shows': {
			slug: 'aluguer-de-audiovisuais-para-feiras',
			keyword: 'aluguer de audiovisuais para feiras em Málaga',
			status: 'propuesta'
		},
		'audiovisual-equipment-rental-service': {
			slug: 'aluguer-de-material-audiovisual',
			keyword: 'aluguer de material audiovisual em Málaga',
			status: 'propuesta'
		},
		'headset-lavalier-microphone-rental': {
			slug: 'aluguer-microfones-lapela-cabeca',
			keyword: 'aluguer de microfones de lapela e de cabeça em Málaga',
			status: 'propuesta'
		},
		'stage-lighting-rental': {
			slug: 'aluguer-de-iluminacao-de-palco',
			keyword: 'aluguer de iluminação de palco em Málaga',
			status: 'propuesta'
		},
		'stage-uplighting': {
			slug: 'aluguer-de-uplighting',
			keyword: 'aluguer de uplighting em Málaga',
			status: 'propuesta'
		},
		'stage-lighting-for-weddings': {
			slug: 'iluminacao-de-palco-para-casamentos',
			keyword: 'iluminação de palco para casamentos em Málaga',
			status: 'propuesta'
		},
		'lighting-ideas-for-wedding-rentals': {
			slug: 'ideias-iluminacao-casamentos',
			keyword: 'ideias de iluminação para casamentos em Málaga',
			status: 'propuesta'
		},
		'smoke-machine-rental': {
			slug: 'aluguer-de-maquina-de-fumo',
			keyword: 'aluguer de máquina de fumo em Málaga',
			status: 'propuesta'
		},
		'wedding-rentals': {
			slug: 'aluguer-para-casamentos',
			keyword: 'aluguer para casamentos em Málaga',
			status: 'propuesta'
		},
		'unique-wedding-ceremony-rentals': {
			slug: 'som-para-cerimonia-de-casamento',
			keyword: 'som para cerimónia de casamento em Málaga',
			status: 'propuesta'
		},
		'outdoor-wedding-rental-considerations': {
			slug: 'aluguer-casamento-ar-livre',
			keyword: 'aluguer para casamentos ao ar livre em Málaga',
			status: 'propuesta'
		},
		'indoor-wedding-rental-essentials': {
			slug: 'aluguer-casamento-interior',
			keyword: 'aluguer para casamentos de interior em Málaga',
			status: 'propuesta'
		},
		'making-the-most-of-wedding-rentals': {
			slug: 'tirar-o-maximo-partido-do-aluguer-para-casamentos',
			keyword: 'tirar o máximo partido do aluguer para casamentos',
			status: 'propuesta'
		},
		'wedding-rentals-online': {
			slug: 'aluguer-casamento-online',
			keyword: 'aluguer para casamentos online em Málaga',
			status: 'propuesta'
		},
		'wedding-rentals-near-me': {
			slug: 'aluguer-casamentos-perto-de-mim',
			keyword: 'aluguer para casamentos perto de mim',
			status: 'propuesta'
		},
		'tips-for-reducing-wedding-rental-costs': {
			slug: 'poupar-no-aluguer-para-casamentos',
			keyword: 'poupar no aluguer para casamentos',
			status: 'propuesta'
		},
		'questions-to-ask-wedding-rental-companies': {
			slug: 'perguntas-a-fazer-no-aluguer-para-casamentos',
			keyword: 'perguntas a fazer no aluguer para casamentos',
			status: 'propuesta'
		},
		'pros-and-cons-of-wedding-rentals': {
			slug: 'pros-e-contras-aluguer-para-casamentos',
			keyword: 'prós e contras do aluguer para casamentos',
			status: 'propuesta'
		},
		'audio-visual-rental-for-training-sessions': {
			slug: 'aluguer-de-audiovisuais-para-formacoes',
			keyword: 'aluguer de audiovisuais para formações em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-gala-dinners': {
			slug: 'aluguer-de-audiovisuais-para-jantares-de-gala',
			keyword: 'aluguer de audiovisuais para jantares de gala em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-remote-presentations': {
			slug: 'aluguer-de-audiovisuais-para-apresentacoes-remotas',
			keyword: 'aluguer de audiovisuais para apresentações remotas em Málaga',
			status: 'propuesta'
		},
		'audio-visual-rental-for-virtual-events': {
			slug: 'aluguer-de-audiovisuais-para-eventos-virtuais',
			keyword: 'aluguer de audiovisuais para eventos virtuais em Málaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-at-progold-summit-2026-in-torremolinos': {
			slug: 'producao-audiovisual-progold-summit-2026-torremolinos',
			keyword: 'produção audiovisual do PROGOLD SUMMIT 2026 em Torremolinos',
			status: 'propuesta'
		},
		'news-malaga-event-gear-supplies-display-screens-for-exhibitor-stands-at-ecoc-2026-in-malaga': {
			slug: 'ecras-de-stand-ecoc-2026-malaga',
			keyword: 'ecrãs de stand da ECOC 2026 em Málaga',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-flawless-audiovisual-production-for-bmotion-in-benahavis': {
			slug: 'producao-audiovisual-bmotion-benahavis',
			keyword: 'produção audiovisual Bmotion em Benahavís',
			status: 'propuesta'
		},
		'news-malaga-event-gear-delivers-premium-technical-support-for-bmotions-high-profile-corporate-project-in-marbella': {
			slug: 'apoio-tecnico-bmotion-marbella',
			keyword: 'apoio técnico Bmotion em Marbella',
			status: 'propuesta'
		}
	}
} satisfies LocaleContentMap;
