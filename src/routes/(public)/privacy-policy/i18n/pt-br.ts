import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Política de privacidade - Malaga Event Gear (MEG)',
		description:
			'Leia a Política de Privacidade oficial da Malaga Event Gear. Saiba como coletamos, tratamos e protegemos suas informações pessoais.'
	},
	hero: {
		badge: 'Informações de privacidade',
		title: 'Política de privacidade',
		effectiveDate: 'Data de vigência: 16 de outubro de 2025'
	},
	whoWeAre: {
		title: 'Quem somos',
		body: 'O endereço do nosso site é https://malagaeventgear.com. Na Malaga Event Gear (MEG), estamos comprometidos em proteger suas informações pessoais e em informar com transparência sobre o uso dos dados.'
	},
	infoCollected: {
		title: 'Informações que coletamos e sua finalidade',
		intro:
			'Coletamos e tratamos dados pessoais quando você interage com nosso processo comercial (por exemplo, ao solicitar seu orçamento pelo nosso formulário de contato):',
		table: {
			headers: {
				category: 'Categoria de dados',
				purpose: 'Finalidade do tratamento'
			},
			rows: [
				{
					category: 'Dados de contato',
					purpose:
						'Nome, e-mail, telefone ou identificação do WhatsApp para finalizar detalhes, coordenar a logística e confirmar sua reserva. A comunicação é feita em inglês ou espanhol.'
				},
				{
					category: 'Logística do evento',
					purpose:
						'Local e horário precisos do evento para coordenar a entrega, a montagem personalizada do equipamento e a retirada.'
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
		body: 'Exibimos uma classificação EXCELENTE com base em avaliações verificadas do Google My Business. A verificação das avaliações é feita dinamicamente pelo Trustindex, garantindo que a fonte original de todos os depoimentos de clientes seja genuína e não alterada.'
	},
	retention: {
		title: 'Retenção de dados e direitos',
		body: 'Mantemos seus dados pessoais apenas pelo tempo necessário para concluir os serviços audiovisuais contratados ou cumprir obrigações legais. De acordo com o GDPR, você tem o direito de acessar, retificar ou solicitar a exclusão dos seus registros pessoais, e de se opor ao tratamento deles, a qualquer momento, entrando em contato com nosso controlador de dados.'
	}
} satisfies Copy;
