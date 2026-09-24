import type { Copy } from './en';

export const updated = '2026-09-24';

export default {
	seo: {
		title: 'Termos de uso: aluguel de equipamento | MEG',
		description:
			'Leia os Termos de Uso oficiais dos aluguéis da Malaga Event Gear. Entenda nossas políticas sobre reservas, pagamentos e serviço seguro.'
	},
	hero: {
		badge: 'Marco legal',
		title: 'Termos de uso',
		effectiveDate: 'Data de vigência: 16 de outubro de 2025'
	},
	intro: {
		title: 'Introdução e aceitação dos termos',
		body: 'Ao acessar ou usar os serviços prestados pela Malaga Event Gear (MEG), você concorda em se vincular a estes Termos de Uso. A Malaga Event Gear oferece aluguel profissional de equipamento de som, iluminação e eventos para diversas ocasiões, incluindo casamentos, festas particulares, eventos corporativos, reuniões e conferências MICE.'
	},
	scope: {
		title: 'Escopo dos serviços e ofertas',
		p1: 'Somos especializados em sistemas acústicos PA ativos de alta fidelidade, soluções profissionais de iluminação (barras de LED, um refletor Fresnel com zoom e um kit de uplighting sem fio), unidades de projeção de alto brilho, microfones (com fio, sem fio e gooseneck), máquinas de fumaça e plataformas de palco.',
		p2: 'Muitos dos nossos pacotes, como o Wedding Pack e o MICE Pack, incluem transporte, instalação profissional, suporte técnico ao vivo no local e desmontagem após o evento, para uma experiência completamente sem estresse.'
	},
	limits: {
		title: 'Limites geográficos e operacionais',
		p1: 'Nossos serviços estão concentrados principalmente na província de Málaga e na Costa del Sol (incluindo a cidade de Málaga, Marbella, Fuengirola, Torremolinos, Estepona, Sevilha e áreas adjacentes). O atendimento a Granada está disponível apenas para pacotes acima de {price:outOfProvinceMinimum} devido ao custo adicional de deslocamento de um dia fora da província.',
		p2: 'A Malaga Event Gear opera 7 dias por semana, das 8h às 20h, para solicitações comerciais, e 24 horas por dia, 7 dias por semana, para logística técnica e suporte de montagem.',
		p3: 'Para garantir precisão técnica absoluta ao nosso público internacional, toda a comunicação, a documentação e as reservas pela interface são feitas em inglês ou espanhol.'
	},
	booking: {
		title: 'Reservas, preços e segurança',
		p1: 'Todos os serviços devem ser contratados com no mínimo 24 horas de antecedência. Para finalizar uma reserva, o cliente deve informar a localização e o horário precisos do evento.',
		p2: 'Todos os preços listados no nosso site não incluem o IVA (+{vat}). Garantimos que todas as transações de pagamento são 100% seguras e processadas por meio de gateways de pagamento confiáveis.'
	},
	obligations: {
		title: 'Obrigações do cliente e responsabilidade pelo equipamento',
		body: 'O cliente é responsável por garantir o acesso ao local e a disponibilidade das tomadas elétricas necessárias na localização e no horário agendados. O cliente reconhece que está alugando equipamento profissional de alta qualidade e deve garantir a segurança e a integridade física do equipamento durante o período de aluguel acordado.'
	}
} satisfies Copy;
