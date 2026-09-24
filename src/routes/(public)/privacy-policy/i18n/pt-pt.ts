import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Política de Privacidade - Malaga Event Gear (MEG)',
		description:
			'Leia a Política de Privacidade oficial da Malaga Event Gear. Saiba como recolhemos, tratamos e protegemos as suas informações pessoais.'
	},
	hero: {
		badge: 'Divulgações de Privacidade',
		title: 'Política de Privacidade',
		effectiveDate: 'Data de Entrada em Vigor: 16 de outubro de 2025'
	},
	whoWeAre: {
		title: 'Quem Somos',
		body: 'O endereço do nosso site é https://malagaeventgear.com. Na Malaga Event Gear (MEG), estamos empenhados em proteger as suas informações pessoais e em fornecer divulgações transparentes sobre a utilização dos dados.'
	},
	infoCollected: {
		title: 'Informação que Recolhemos e Finalidade',
		intro:
			'Recolhemos e tratamos dados pessoais quando interage com o nosso fluxo de trabalho comercial estabelecido (por exemplo, quando pede o seu orçamento através do nosso formulário de contacto):',
		table: {
			headers: {
				category: 'Categoria de Dados',
				purpose: 'Finalidade do Tratamento'
			},
			rows: [
				{
					category: 'Dados de Contacto',
					purpose:
						'Nome, email, telefone ou identificação de WhatsApp para finalizar os detalhes, coordenar a logística e confirmar a sua reserva. Realizado em inglês ou espanhol.'
				},
				{
					category: 'Logística do Evento',
					purpose:
						'Localização e horário precisos do evento para coordenar a entrega, a montagem personalizada do equipamento e a recolha.'
				},
				{
					category: 'Dados Financeiros',
					purpose:
						'Informações de pagamento processadas durante as reservas. Garantimos que todas as transações de pagamento são 100% seguras.'
				}
			]
		}
	},
	reviews: {
		title: 'Avaliações e Prova Social',
		body: 'Apresentamos uma classificação EXCELENTE com base em avaliações verificadas do Google My Business. A verificação das avaliações é feita dinamicamente através do Trustindex, garantindo que a fonte original de todos os testemunhos de clientes é genuína e inalterada.'
	},
	retention: {
		title: 'Conservação de Dados e Direitos',
		body: 'Conservamos os seus dados pessoais apenas durante o tempo necessário para concluir os serviços audiovisuais contratados ou para cumprir obrigações legais. Tem pleno direito, ao abrigo do RGPD, de aceder, retificar, opor-se ou solicitar a eliminação dos seus registos pessoais a qualquer momento, contactando o nosso Responsável pelo Tratamento de Dados.'
	}
} satisfies Copy;
