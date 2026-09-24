import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Política de Privacidade - Malaga Event Gear (MEG)',
		description:
			'Leia a Política de Privacidade oficial da Malaga Event Gear. Saiba como coletamos, processamos e protegemos suas informações pessoais.'
	},
	hero: {
		badge: 'Divulgações de Privacidade',
		title: 'Política de Privacidade',
		effectiveDate: 'Data de Vigência: 16 de outubro de 2025'
	},
	whoWeAre: {
		title: 'Quem Somos',
		body: 'O endereço do nosso site é https://malagaeventgear.com. Na Malaga Event Gear (MEG), estamos comprometidos em proteger suas informações pessoais e fornecer divulgações transparentes sobre o uso de dados.'
	},
	infoCollected: {
		title: 'Informações que Coletamos e Sua Finalidade',
		intro:
			'Coletamos e processamos dados pessoais quando você interage com nosso fluxo de negócio estabelecido (por exemplo, ao Solicitar Seu Orçamento pelo nosso formulário de contato):',
		table: {
			headers: {
				category: 'Categoria de Dados',
				purpose: 'Finalidade do Processamento'
			},
			rows: [
				{
					category: 'Dados de Contato',
					purpose:
						'Nome, e-mail, telefone ou identificação do WhatsApp para finalizar detalhes, coordenar a logística e confirmar sua reserva. Conduzido exclusivamente em inglês.'
				},
				{
					category: 'Logística do Evento',
					purpose:
						'Localização precisa (local) e horário para coordenar a entrega, a montagem personalizada do equipamento e a retirada.'
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
		body: 'Exibimos uma classificação EXCELENTE com base em avaliações verificadas do Google My Business. A verificação das avaliações é feita dinamicamente pelo Trustindex, garantindo que a fonte original de todos os depoimentos de clientes seja genuína e não alterada.'
	},
	retention: {
		title: 'Retenção de Dados e Direitos',
		body: 'Mantemos seus dados pessoais apenas pelo tempo necessário para concluir os serviços audiovisuais contratados ou cumprir obrigações legais. Você tem todos os direitos garantidos pelo GDPR de acessar, retificar, se opor ou solicitar a exclusão dos seus registros pessoais a qualquer momento, entrando em contato com nosso Responsável pelo Tratamento de Dados.'
	}
} satisfies Copy;
