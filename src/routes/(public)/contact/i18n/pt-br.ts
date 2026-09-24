import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Contato: aluguel de equipamento audiovisual em Málaga | MEG',
		description:
			'Fale com a Malaga Event Gear e solicite orçamentos para aluguel de som, iluminação e telas. Suporte técnico 24 horas por dia, 7 dias por semana.'
	},
	schema: {
		name: 'Contato - Malaga Event Gear',
		description:
			'Fale com a equipe técnica da Malaga Event Gear para solicitar orçamentos personalizados de aluguel de som, iluminação e telas.'
	},
	whatsappLinkText: 'Envie uma mensagem para nós',
	messages: {
		packIntro: 'Olá, tenho interesse em reservar o pacote: {pack}. Vocês poderiam me informar a disponibilidade e os detalhes?',
		categoryIntro:
			'Olá, tenho interesse em reservar equipamento da categoria: {category}. Aguardo o orçamento de vocês.'
	},
	errors: {
		pastDate: 'Escolha uma data de evento posterior a hoje.'
	},
	form: {
		namePlaceholder: 'Nome completo',
		emailPlaceholder: 'Endereço de e-mail',
		phonePlaceholder: 'Telefone',
		messagePlaceholder: 'Mensagem'
	}
} satisfies Copy;
