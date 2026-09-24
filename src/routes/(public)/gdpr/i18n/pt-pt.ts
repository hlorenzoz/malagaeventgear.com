import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Conformidade com o RGPD - Malaga Event Gear (MEG)',
		description:
			'Compreenda como a Malaga Event Gear protege os seus dados pessoais ao abrigo do Regulamento Geral sobre a Proteção de Dados (RGPD) no aluguer de equipamento audiovisual.'
	},
	hero: {
		badge: 'Regulamento europeu',
		title: 'Conformidade com o RGPD',
		effectiveDateLine: 'Malaga Event Gear (MEG) | Data de entrada em vigor: 16 de outubro de 2025'
	},
	commitment: {
		title: 'Compromisso com o RGPD',
		body: 'Estando sediada em Málaga, Espanha, a Malaga Event Gear (MEG) cumpre rigorosamente o Regulamento Geral sobre a Proteção de Dados (RGPD) (Regulamento (UE) 2016/679) no que respeita à recolha, ao tratamento e à conservação de dados pessoais.'
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
				category: 'Identidade e contacto',
				legalBasis: 'Execução do contrato',
				purpose:
					'Para comunicar consigo, finalizar as especificações da reserva e enviar os detalhes do orçamento por email, telefone ou WhatsApp, em inglês ou espanhol.'
			},
			{
				category: 'Localização e horário do evento',
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
		title: 'Direitos do titular dos dados ao abrigo do RGPD',
		intro: 'Ao abrigo do RGPD, tem os seguintes direitos relativamente aos dados pessoais que tratamos:',
		items: [
			{
				label: 'Direito de acesso:',
				body: 'Pode solicitar a confirmação e uma cópia de todos os registos pessoais que mantemos.'
			},
			{
				label: 'Direito de retificação:',
				body: 'Pode solicitar a atualização de dados incompletos ou inexatos.'
			},
			{
				label: 'Direito ao apagamento:',
				body: 'Pode solicitar o apagamento dos seus registos pessoais.'
			},
			{
				label: 'Direito à limitação do tratamento:',
				body: 'Pode solicitar que limitemos o tratamento em determinadas condições.'
			}
		]
	},
	rightsPortal: {
		title: 'Exerça os seus direitos ao abrigo do RGPD',
		body: 'Selecione uma ação abaixo para enviar automaticamente o seu pedido de privacidade à nossa equipa de conformidade de dados.',
		buttons: {
			access: 'Pedir acesso aos dados',
			rectification: 'Pedir retificação dos dados',
			erasure: 'Pedir apagamento dos dados'
		},
		actions: {
			access: 'acesso aos dados',
			rectification: 'retificação dos dados',
			erasure: 'apagamento dos dados'
		},
		status: {
			prefix: 'O seu pedido de ',
			middle: ' foi iniciado. Envie-nos um email para ',
			suffix: ' para concluir a verificação.'
		}
	}
} satisfies Copy;
