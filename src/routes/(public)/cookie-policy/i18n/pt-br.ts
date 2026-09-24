import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Política de Cookies - Malaga Event Gear (MEG)',
		description:
			'Entenda como a Malaga Event Gear usa cookies e tecnologias de rastreamento para otimizar a usabilidade do site e analisar o desempenho.'
	},
	hero: {
		badge: 'Rastreamento e Usabilidade',
		title: 'Política de Cookies',
		effectiveDate: 'Data de Vigência: 16 de outubro de 2025'
	},
	whatAreCookies: {
		title: 'O que são Cookies?',
		body: 'Cookies são pequenos arquivos de texto colocados no seu dispositivo quando você visita nosso site. Eles ajudam o site a funcionar com mais eficiência, permitem manter suas preferências de idioma (por exemplo, EN/ES) e fornecem dados analíticos anônimos à nossa equipe.'
	},
	categories: {
		title: 'Categorias de Cookies que Usamos',
		items: [
			{
				title: 'Cookies Essenciais e Técnicos',
				body: 'Altamente essenciais para a navegação básica, a segurança e a manutenção das preferências de idioma selecionadas. Não podem ser desativados.'
			},
			{
				title: 'Cookies Analíticos e de Desempenho',
				body: 'Usamos o Google Analytics e o Google Search Console para monitorar o tráfego, diagnosticar gargalos, analisar parâmetros de busca e a velocidade do site. Todos os dados coletados são estritamente agregados e pseudonimizados.'
			},
			{
				title: 'Cookies de Verificação de Terceiros',
				body: 'Para exibir avaliações autênticas de clientes verificadas diretamente pelo Google My Business, integramos o Trustindex. O Trustindex pode colocar cookies para rastrear e validar os widgets de avaliações dinamicamente.'
			}
		]
	},
	managing: {
		title: 'Gerenciando Suas Preferências',
		body: 'Você pode facilmente recusar ou bloquear cookies pelas configurações do seu navegador. No entanto, observe que restringir todos os cookies pode afetar o acesso a funcionalidades avançadas, como o preenchimento automático de formulários ou a manutenção da preferência de idioma.'
	}
} satisfies Copy;
