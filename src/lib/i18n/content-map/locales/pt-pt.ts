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
	posts: {}
} satisfies LocaleContentMap;
