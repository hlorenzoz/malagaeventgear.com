import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Política de privacidade - Malaga Event Gear (MEG)',
		description:
			'Leia a Política de Privacidade oficial da Malaga Event Gear. Saiba como recolhemos, tratamos e protegemos as suas informações pessoais.'
	},
	hero: {
		badge: 'Informação sobre privacidade',
		title: 'Política de privacidade',
		effectiveDate: 'Data de entrada em vigor: 16 de outubro de 2025'
	},
	whoWeAre: {
		title: 'Quem somos',
		body: 'O endereço do nosso site é https://malagaeventgear.com. Na Malaga Event Gear (MEG), estamos empenhados em proteger as suas informações pessoais e em informar de forma transparente sobre a utilização dos dados.'
	},
	infoCollected: {
		title: 'Informação que recolhemos e finalidade',
		intro:
			'Recolhemos e tratamos dados pessoais quando interage com o nosso processo comercial (por exemplo, quando pede o seu orçamento através do nosso formulário de contacto):',
		table: {
			headers: {
				category: 'Categoria de dados',
				purpose: 'Finalidade do tratamento'
			},
			rows: [
				{
					category: 'Dados de contacto',
					purpose:
						'Nome, email, telefone ou identificação de WhatsApp para finalizar os detalhes, coordenar a logística e confirmar a sua reserva. A comunicação é feita em inglês ou espanhol.'
				},
				{
					category: 'Logística do evento',
					purpose:
						'Localização e horário precisos do evento para coordenar a entrega, a montagem personalizada do equipamento e a recolha.'
				},
				{
					category: 'Dados financeiros',
					purpose:
						'Informações de pagamento tratadas durante as reservas. Garantimos que todas as transações de pagamento são 100% seguras.'
				}
			]
		}
	},
	reviews: {
		title: 'Avaliações e prova social',
		body: 'Apresentamos uma classificação EXCELENTE com base em avaliações verificadas do Google My Business. A verificação das avaliações é feita dinamicamente através do Trustindex, garantindo que a fonte original de todos os testemunhos de clientes é genuína e inalterada.'
	},
	retention: {
		title: 'Conservação de dados e direitos',
		body: 'Conservamos os seus dados pessoais apenas durante o tempo necessário para concluir os serviços audiovisuais contratados ou para cumprir obrigações legais. Ao abrigo do RGPD, tem o direito de aceder aos seus registos pessoais, de os retificar, de se opor ao seu tratamento ou de pedir a sua eliminação a qualquer momento, contactando o nosso responsável pelo tratamento de dados.'
	}
} satisfies Copy;
