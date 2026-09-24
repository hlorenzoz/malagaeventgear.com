import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Contacto: aluguer de equipamento audiovisual em Málaga | MEG',
		description:
			'Contacte a Malaga Event Gear para pedir orçamentos de aluguer de som, iluminação e ecrãs. Apoio técnico 24 horas por dia, 7 dias por semana.'
	},
	schema: {
		name: 'Contacto - Malaga Event Gear',
		description:
			'Contacte a equipa técnica da Malaga Event Gear para pedir orçamentos personalizados de aluguer de som, iluminação e ecrãs.'
	},
	whatsappLinkText: 'Envie-nos uma mensagem',
	messages: {
		packIntro: 'Olá, tenho interesse em reservar o pacote: {pack}. Podem informar-me sobre a disponibilidade e os detalhes?',
		categoryIntro:
			'Olá, tenho interesse em reservar equipamento da categoria: {category}. Aguardo o vosso orçamento.'
	},
	errors: {
		pastDate: 'Por favor, escolha uma data de evento posterior a hoje.'
	},
	form: {
		namePlaceholder: 'Nome completo',
		emailPlaceholder: 'Endereço de email',
		phonePlaceholder: 'Telefone',
		messagePlaceholder: 'Mensagem'
	}
} satisfies Copy;
