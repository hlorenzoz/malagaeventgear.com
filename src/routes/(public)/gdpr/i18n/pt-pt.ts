import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Conformidade com o RGPD - Malaga Event Gear (MEG)',
		description:
			'Compreenda como a Malaga Event Gear protege os seus dados pessoais ao abrigo do Regulamento Geral sobre a Proteção de Dados (RGPD) no aluguer de equipamento audiovisual.'
	},
	hero: {
		badge: 'Regulamento Europeu',
		title: 'Conformidade com o RGPD',
		effectiveDateLine: 'Malaga Event Gear (MEG) | Data de Entrada em Vigor: 16 de outubro de 2025'
	},
	commitment: {
		title: 'Compromisso com o RGPD',
		body: 'Estando sediada em Málaga, Espanha, a Malaga Event Gear (MEG) cumpre rigorosamente o Regulamento Geral sobre a Proteção de Dados (RGPD) (Regulamento (UE) 2016/679) no que respeita à recolha, ao tratamento e à conservação de dados pessoais.'
	},
	processing: {
		title: 'Detalhes do Tratamento de Dados Pessoais',
		headers: {
			category: 'Categoria de Dados',
			legalBasis: 'Base Legal',
			purpose: 'Finalidade de Utilização'
		},
		rows: [
			{
				category: 'Identidade e Contacto',
				legalBasis: 'Execução do Contrato',
				purpose:
					'Para comunicar, finalizar as especificações da reserva e enviar os detalhes do orçamento por email, telefone ou WhatsApp, em inglês ou espanhol.'
			},
			{
				category: 'Localização e Horário do Evento',
				legalBasis: 'Execução do Contrato',
				purpose: 'Essencial para coordenar a entrega, a montagem profissional personalizada e a logística de desmontagem.'
			},
			{
				category: 'Dados de Pagamento',
				legalBasis: 'Execução do Contrato e Segurança',
				purpose:
					'Para finalizar transações seguras. Garantimos que todos os pagamentos no checkout são 100% seguros.'
			}
		]
	},
	rights: {
		title: 'Direitos do Titular dos Dados ao Abrigo do RGPD',
		intro: 'Ao abrigo do RGPD, tem os seguintes direitos relativamente aos dados pessoais que tratamos:',
		items: [
			{
				label: 'Direito de Acesso:',
				body: 'Pode solicitar a confirmação e uma cópia de todos os registos pessoais que mantemos.'
			},
			{
				label: 'Direito de Retificação:',
				body: 'Pode solicitar a atualização de dados incompletos ou inexatos.'
			},
			{
				label: 'Direito ao Apagamento:',
				body: 'Pode solicitar a eliminação dos seus registos pessoais.'
			},
			{
				label: 'Direito à Limitação:',
				body: 'Pode solicitar que limitemos o tratamento em determinadas condições.'
			}
		]
	},
	rightsPortal: {
		title: 'Exerça os Seus Direitos ao Abrigo do RGPD',
		body: 'Selecione uma ação abaixo para enviar automaticamente o seu pedido de privacidade à nossa equipa de conformidade de dados.',
		buttons: {
			access: 'Pedir Acesso aos Dados',
			rectification: 'Pedir Retificação de Dados',
			erasure: 'Pedir Apagamento de Dados'
		},
		status: {
			prefix: 'O seu pedido de ',
			middle: ' foi iniciado. Envie-nos um email para ',
			suffix: ' para concluir a verificação.'
		}
	}
} satisfies Copy;
