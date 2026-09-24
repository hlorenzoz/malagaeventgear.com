import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'GDPR: conformidade e proteção de dados | MEG',
		description:
			'Entenda como a Malaga Event Gear protege seus dados pessoais de acordo com o Regulamento Geral de Proteção de Dados (GDPR) nos aluguéis audiovisuais.'
	},
	hero: {
		badge: 'Regulamento europeu',
		title: 'Conformidade com o GDPR',
		effectiveDateLine: 'Malaga Event Gear (MEG) | Data de vigência: 16 de outubro de 2025'
	},
	commitment: {
		title: 'Compromisso com o GDPR',
		body: 'Como a Malaga Event Gear (MEG) está sediada em Málaga, na Espanha, seguimos rigorosamente o Regulamento Geral de Proteção de Dados (GDPR) (Regulamento (UE) 2016/679) quanto à coleta, ao tratamento e à retenção de dados pessoais.'
	},
	processing: {
		title: 'Detalhes do tratamento de dados pessoais',
		headers: {
			category: 'Categoria de dados',
			legalBasis: 'Base legal',
			purpose: 'Finalidade'
		},
		rows: [
			{
				category: 'Identidade e contato',
				legalBasis: 'Execução do contrato',
				purpose:
					'Para nos comunicarmos com você, finalizar as especificações da reserva e enviar os detalhes do orçamento por e-mail, telefone ou WhatsApp em inglês ou espanhol.'
			},
			{
				category: 'Local e horário do evento',
				legalBasis: 'Execução do contrato',
				purpose: 'Essencial para coordenar a entrega, a montagem profissional personalizada e a logística de desmontagem.'
			},
			{
				category: 'Dados de pagamento',
				legalBasis: 'Execução do contrato e segurança',
				purpose:
					'Para finalizar transações seguras. Garantimos que todos os pagamentos no checkout são 100% seguros.'
			}
		]
	},
	rights: {
		title: 'Direitos do titular dos dados segundo o GDPR',
		intro: 'De acordo com o GDPR, você tem os seguintes direitos em relação aos dados pessoais que tratamos:',
		items: [
			{
				label: 'Direito de acesso:',
				body: 'Você pode solicitar a confirmação e uma cópia de todos os registros pessoais que mantemos.'
			},
			{
				label: 'Direito de retificação:',
				body: 'Você pode solicitar a atualização de dados incompletos ou incorretos.'
			},
			{
				label: 'Direito à exclusão:',
				body: 'Você pode solicitar a exclusão dos seus registros pessoais.'
			},
			{
				label: 'Direito à limitação do tratamento:',
				body: 'Você pode solicitar que limitemos o tratamento em determinadas condições.'
			}
		]
	},
	rightsPortal: {
		title: 'Exerça seus direitos previstos no GDPR',
		body: 'Selecione uma ação abaixo para enviar automaticamente sua solicitação de privacidade à nossa equipe de conformidade de dados.',
		buttons: {
			access: 'Solicitar acesso aos dados',
			rectification: 'Solicitar retificação dos dados',
			erasure: 'Solicitar exclusão dos dados'
		},
		actions: {
			access: 'acesso aos dados',
			rectification: 'retificação dos dados',
			erasure: 'exclusão dos dados'
		},
		status: {
			prefix: 'Sua solicitação de ',
			middle: ' foi iniciada. Envie um e-mail para ',
			suffix: ' para concluir a verificação.'
		}
	}
} satisfies Copy;
