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
		'event-technology-service': {
			slug: 'iluminacao-e-palco-para-eventos',
			keyword: 'iluminação e palco para eventos Málaga',
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
		}
	}
} satisfies LocaleContentMap;
