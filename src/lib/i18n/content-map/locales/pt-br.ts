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
		'unique-wedding-ceremony-rentals': {
			slug: 'som-para-cerimonia-de-casamento',
			keyword: 'som para cerimônia de casamento em Málaga',
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
		}
	}
} satisfies LocaleContentMap;
