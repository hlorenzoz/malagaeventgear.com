import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'GDPR: Conformidade e Proteção de Dados | MEG',
		description:
			'Entenda como a Malaga Event Gear protege seus dados pessoais sob o Regulamento Geral de Proteção de Dados (GDPR) nos aluguéis audiovisuais.'
	},
	hero: {
		badge: 'Regulamento Europeu',
		title: 'Conformidade com o GDPR',
		effectiveDateLine: 'Malaga Event Gear (MEG) | Data de Vigência: 16 de outubro de 2025'
	},
	commitment: {
		title: 'Compromisso com o GDPR',
		body: 'Como a Malaga Event Gear (MEG) está sediada em Málaga, na Espanha, seguimos rigorosamente o Regulamento Geral de Proteção de Dados (GDPR) (Regulamento (UE) 2016/679) quanto à coleta, ao processamento e à retenção de dados pessoais.'
	},
	processing: {
		title: 'Detalhes do Processamento de Dados Pessoais',
		headers: {
			category: 'Categoria de Dados',
			legalBasis: 'Base Legal',
			purpose: 'Finalidade de Uso'
		},
		rows: [
			{
				category: 'Identidade e Contato',
				legalBasis: 'Execução do Contrato',
				purpose:
					'Para nos comunicarmos, finalizar as especificações da reserva e enviar detalhes do orçamento por e-mail, telefone ou WhatsApp em inglês.'
			},
			{
				category: 'Local e Horário do Evento',
				legalBasis: 'Execução do Contrato',
				purpose: 'Essencial para coordenar a entrega, a montagem personalizada do equipamento e a desmontagem.'
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
		title: 'Direitos do Titular dos Dados sob o GDPR',
		intro: 'Sob o GDPR, você tem os seguintes direitos em relação aos dados pessoais que processamos:',
		items: [
			{
				label: 'Direito de Acesso:',
				body: 'Você pode solicitar confirmação e cópia de todos os registros pessoais que mantemos.'
			},
			{
				label: 'Direito de Retificação:',
				body: 'Você pode solicitar a atualização de dados incompletos ou incorretos.'
			},
			{
				label: 'Direito ao Apagamento:',
				body: 'Você pode solicitar a exclusão dos seus registros pessoais.'
			},
			{
				label: 'Direito à Limitação:',
				body: 'Você pode solicitar que restrinjamos o processamento em determinadas condições.'
			}
		]
	},
	rightsPortal: {
		title: 'Exerça Seus Direitos sob o GDPR',
		body: 'Selecione uma ação abaixo para acionar automaticamente sua solicitação de privacidade para nossa equipe de conformidade de dados.',
		buttons: {
			access: 'Solicitar Acesso aos Dados',
			rectification: 'Solicitar Retificação de Dados',
			erasure: 'Solicitar Apagamento de Dados'
		},
		status: {
			prefix: 'Sua solicitação de ',
			middle: ' foi iniciada. Envie um e-mail para ',
			suffix: ' para finalizar a verificação.'
		}
	}
} satisfies Copy;
