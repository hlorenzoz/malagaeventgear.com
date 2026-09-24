import type { Messages } from './en';

const t = {
	// Navigation
	nav: {
		equipment: 'Equipamentos',
		packages: 'Pacotes',
		blog: 'Blog',
		contact: 'Contato',
		bookNow: 'Reserve agora',
		blogInEnglish: 'Blog (em inglês)',
		language: 'Idioma',
		breadcrumbs: 'Trilha de navegação',
		brand: 'Malaga Event Gear',
		toggleTheme: 'Alternar o tema de cores',
		openMenu: 'Abrir o menu de navegação'
	},
	// Language notices (CLAUDE.md, "Idiomas soportados")
	notices: {
		serviceLanguages: 'Respondemos em inglês ou espanhol.',
		legalTranslation:
			'Esta é uma tradução. Se houver diferenças em relação à versão em inglês, a versão em inglês prevalece.',
		readEnglish: 'Ler a versão em inglês'
	},
	// Breadcrumb names, keyed by English path segment (see i18n/breadcrumbs.ts)
	crumbs: {
		home: 'Início',
		packages: 'Pacotes',
		blog: 'Blog',
		categories: 'Categorias',
		category: 'Categoria',
		author: 'Autor',
		contact: 'Contato',
		'about-us': 'Sobre nós',
		faq: 'Perguntas frequentes',
		'privacy-policy': 'Política de privacidade',
		'terms-of-service': 'Termos de uso',
		'cookie-policy': 'Política de cookies',
		gdpr: 'GDPR',
		'meet-the-team': 'Nossa equipe',
		equipment: 'Equipamentos',
		sitemap: 'Mapa do site',
		'thank-you': 'Obrigado'
	},
	// Hero
	hero: {
		span: 'Para todos os tipos de eventos',
		titlePart1: 'Aluguel de equipamento',
		titleGradient: 'audiovisual',
		titlePart2: 'em Málaga',
		subtitle:
			'Viva um som cristalino e uma iluminação deslumbrante com nosso equipamento premium. Perfeito para casamentos, eventos corporativos e festas exclusivas na Costa del Sol.',
		viewPricing: 'Ver preços',
		contactUs: 'Fale conosco'
	},
	// Bento Info Cards
	bento: {
		card1Title: '#1 Montagem impecável',
		card1Text:
			'Suporte técnico dedicado para garantir que seu evento aconteça sem contratempos, do início ao fim.',
		card2Title: '#2 Pacotes sob medida',
		card2Text:
			'Pacotes de aluguel flexíveis, criados para se ajustar perfeitamente a qualquer tamanho de evento, local e orçamento.',
		card3Title: '#3 Tecnologia de ponta',
		card3Text:
			'Aproveite equipamentos audiovisuais de última geração que elevam a qualidade visual e sonora da sua produção.'
	},
	// Overview (At a Glance, answer-engine optimization)
	overview: {
		badge: 'Resumo rápido',
		sellQ: 'O que vendemos?',
		sellA:
			'Alugamos equipamento audiovisual premium (sistemas de som profissionais, iluminação de palco, projetores e telas) para eventos em Málaga e na Costa del Sol, com entrega, montagem e suporte técnico no local incluídos.',
		whoQ: 'Para quem é?',
		whoA:
			'Casais planejando o casamento, empresas organizando conferências e eventos corporativos, e qualquer pessoa que vá dar uma festa ou celebração particular e queira som e iluminação impecáveis sem precisar comprar o equipamento.',
		costQ: 'Quanto custa?',
		costA:
			'pacotes com preço fixo e sem taxas escondidas, ajustados ao tamanho do seu evento, além de orçamentos personalizados para produções maiores.',
		costFrom: 'A partir de',
		howQ: 'Como funciona?',
		howA:
			'Quatro passos simples: escolha seu pacote, peça um orçamento, nós confirmamos e preparamos seu equipamento, e nossa equipe faz a entrega e a montagem completa no dia do seu evento.'
	},
	// Impact
	impact: {
		title: 'Nosso impacto em números',
		years: 'Anos de experiência',
		clients: 'Clientes satisfeitos',
		satisfaction: 'Taxa de satisfação'
	},
	// Categories
	categories: {
		badge: 'Equipamento premium',
		title: 'Categorias disponíveis',
		soundTitle: 'Sistemas de som',
		soundText:
			'Som cristalino de alta fidelidade, ideal para casamentos íntimos ou grandes conferências corporativas. Trabalhamos com marcas líderes para garantir a mais alta fidelidade acústica.',
		lightTitle: 'Iluminação',
		lightText: 'Soluções de iluminação dinâmica para criar a atmosfera perfeita no seu local de evento.',
		visualTitle: 'Projetores e telas',
		visualText: 'Imagens nítidas em alta definição para apresentações com alto impacto visual.',
		fxTitle: 'Efeitos especiais e máquinas de fumaça',
		fxText:
			'Crie uma atmosfera impressionante no seu evento com nossos efeitos especiais e máquinas de fumaça de nível profissional.',
		bookEquipment: 'Reservar pacotes'
	},
	// Pricing
	pricing: {
		badge: 'Preços transparentes',
		title: 'Pacotes sob medida para cada evento',
		subtitle:
			'Escolha entre nossos pacotes de aluguel flexíveis, criados para se ajustar perfeitamente a qualquer tamanho de evento e orçamento. Facilitamos o planejamento!',
		includes: 'Inclui:',
		includedServices: 'Serviços incluídos:',
		optional: 'Opcional:',
		check: 'Verificar disponibilidade',
		mostPopular: 'Mais popular',
		from: 'A partir de',
		plusVat: '(+21% IVA)',
		plusVatShort: '(+IVA)',
		bookPack: 'Reservar'
	},
	// Packages filters (e-commerce)
	filters: {
		title: 'Filtros',
		clearAll: 'Limpar tudo',
		resetFilters: 'Redefinir filtros',
		showingResults: 'Mostrando {visible} de {total} pacotes',
		noResults: 'Nenhum pacote corresponde aos seus filtros. Tente remover algumas seleções!',
		openFilters: 'Filtros',
		done: 'Mostrar resultados',
		purpose: 'Tipo de evento',
		capacity: 'Porte do evento',
		price: 'Orçamento',
		equipment: 'Equipamento incluído',
		extras: 'Adicionais opcionais',
		sortBy: 'Ordenar por',
		party: 'Festas',
		wedding: 'Casamentos',
		corporate: 'Corporativo',
		presentation: 'Apresentações',
		meeting: 'Reuniões',
		small: 'Pequeno (até 50 convidados)',
		medium: 'Médio (51 a 80 convidados)',
		large: 'Grande (mais de 80 convidados)',
		priceLow: 'Até {price:budgetLow}',
		priceMid: '{price:budgetLow} a {price:budgetHigh}',
		priceHigh: '{price:budgetHigh} ou mais',
		transport: 'Transporte e montagem',
		screen: 'Tela / projeção',
		sound: 'Sistema de som',
		microphone: 'Microfones',
		lighting: 'Iluminação ambiente',
		technician: 'Técnico ao vivo',
		projector: 'Projetor',
		smokeMachine: 'Máquina de fumaça',
		technicalAssistant: 'Assistente técnico',
		lectern: 'Púlpito',
		staging: 'Palco',
		recommended: 'Recomendado',
		priceAsc: 'Preço: do menor para o maior',
		priceDesc: 'Preço: do maior para o menor'
	},
	// Contact
	contact: {
		badge: 'Resposta imediata 24/7',
		title: 'Entre em contato',
		subtitle:
			'Pronto para elevar o nível do seu evento? Fale com nossa equipe técnica para receber orçamentos personalizados, verificar a disponibilidade do equipamento e obter orientação especializada.',
		detailsTitle: 'Dados de contato',
		phone: 'Telefone',
		whatsapp: 'WhatsApp',
		email: 'E-mail',
		location: 'Localização',
		hours: 'Horário de funcionamento',
		hoursText: 'Suporte técnico e logística 24 horas por dia, 7 dias por semana.',
		reqTitle: 'Solicitar um orçamento',
		formName: 'Nome completo *',
		formEmail: 'Endereço de e-mail *',
		formPhone: 'Telefone de contato',
		formDate: 'Data do evento',
		formType: 'Tipo de evento',
		formTypeWedding: 'Casamento / celebração',
		formTypeCorporate: 'Evento corporativo',
		formTypeParty: 'Festa particular',
		formTypeMice: 'Conferência / MICE',
		formTypeOther: 'Outro tipo de evento',
		formMessage: 'Detalhes do evento e requisitos técnicos *',
		formSubmit: 'Enviar solicitação',
		formSubmitting: 'Enviando...',
		formRequiredError: 'Por favor, preencha todos os campos obrigatórios.',
		formErrorSubmit:
			'Algo deu errado ao enviar sua solicitação. Tente novamente ou envie um e-mail diretamente para nós.',
		formErrorTurnstile: 'Falha na verificação de segurança. Tente novamente.',
		formErrorRateLimited: 'Muitas solicitações. Aguarde alguns minutos e tente novamente.',
		lockedFieldNote: 'Gerado automaticamente a partir de um erro. Este campo não pode ser editado.',
		errorPrefillMessage:
			'Olá, enviei uma solicitação de pacote no site de vocês, mas o e-mail de confirmação não chegou. Vocês poderiam confirmar o recebimento da minha solicitação? Referência: {ref}',
		errorDetailsHeader: 'Detalhes enviados:',
		errorDetailSource: 'URL do formulário',
		errorDetailName: 'Nome',
		errorDetailEmail: 'E-mail',
		errorDetailPhone: 'Telefone',
		errorDetailDate: 'Data do evento',
		errorDetailPackage: 'Pacote',
		errorDetailComments: 'Comentários',
		successTitle: 'Orçamento solicitado!',
		successText1: 'Olá',
		successText2:
			'recebemos sua solicitação com sucesso. Nossa equipe técnica em Málaga vai avaliá-la e entrar em contato por e-mail (',
		successText3: ') o mais rápido possível.',
		successButton: 'Enviar outra solicitação',
		faqTitle: 'Perguntas frequentes'
	},
	// Packages Showcase
	packages: {
		badge: 'Pacotes em destaque',
		title: 'Escolha o pacote perfeito',
		subtitle:
			'Feitos sob medida para cada ocasião. Todos os pacotes incluem transporte, montagem e suporte técnico no local.',
		enquire: 'Solicitar orçamento'
	},
	// How It Works
	process: {
		badge: 'Como funciona',
		title: 'Seu evento em 4 passos simples',
		s1Title: 'Escolha seu pacote',
		s1Desc: 'Explore nossos pacotes e escolha o que combina com o tamanho e o estilo do seu evento.',
		s2Title: 'Peça um orçamento',
		s2Desc: 'Preencha nosso formulário rápido. Respondemos o mais rápido possível com a disponibilidade completa.',
		s3Title: 'Confirme e planeje',
		s3Desc: 'Nossa equipe confirma a logística, o acesso ao local e cada detalhe técnico.',
		s4Title: 'Aproveite seu evento',
		s4Desc: 'Cuidamos da montagem, operamos tudo durante o evento e desmontamos no final. Zero estresse para você.'
	},
	// Pricing Preview
	pricingPreview: {
		badge: 'Preços transparentes',
		title: 'Preços simples e com tudo incluído',
		subtitle: 'Sem taxas escondidas. Transporte, montagem e suporte técnico sempre incluídos.',
		viewAll: 'Ver todos os pacotes'
	},
	// FAQ
	faq: {
		badge: 'Perguntas frequentes',
		title: 'Dúvidas comuns'
	},
	// Testimonials (Google reviews)
	testimonials: {
		badge: 'Avaliações de clientes',
		title: 'Histórias reais de eventos reais',
		subtitle: 'Avaliações verificadas do Google de clientes em toda a Costa del Sol.',
		ratingLabel: 'EXCELENTE',
		basedOn: 'Com base em {n} avaliações',
		poweredBy: 'Mostrando nossas avaliações mais recentes',
		readMore: 'Ler mais',
		readLess: 'Ler menos',
		seeAll: 'Ver todas as avaliações',
		prevAria: 'Avaliação anterior',
		nextAria: 'Próxima avaliação',
		outOfFiveStars: 'de 5 estrelas'
	},
	// Lead capture form
	leadForm: {
		title: 'Garanta a data do seu evento',
		subtitle: 'Preencha o formulário e entraremos em contato o mais rápido possível.',
		nameLabelInput: 'Nome completo *',
		emailLabelInput: 'Endereço de e-mail *',
		phoneLabelInput: 'Telefone / WhatsApp *',
		eventDateLabel: 'Data do evento *',
		commentsLabel: 'Perguntas ou comentários',
		commentsPlaceholder:
			'Conte-nos sobre o seu evento: local, número de convidados, requisitos especiais...',
		submitBtn: 'Verificar disponibilidade da data',
		submitting: 'Enviando...',
		errorRequired: 'Este campo é obrigatório.',
		errorEmail: 'Digite um endereço de e-mail válido.',
		errorPhone: 'Digite um número de telefone válido.',
		errorDateFuture: 'A data do evento deve ser no futuro.',
		errorMinLength: 'Deve ter pelo menos 2 caracteres.',
		errorMaxLength: 'Máximo de 1000 caracteres permitidos.',
		errorHoneypot: 'Spam detectado.',
		noCardRequired: 'Não é necessário cartão de crédito para verificar a disponibilidade',
		quickResponseNote: 'Resposta o mais rápido possível',
		errorSubmit: 'Algo deu errado. Tente novamente ou fale conosco diretamente.',
		errorTurnstile: 'Falha na verificação de segurança. Tente novamente.',
		errorRateLimited: 'Muitas solicitações. Aguarde alguns minutos e tente novamente.',
		emailFailTitle: 'Não foi possível enviar sua confirmação',
		emailFailBody:
			'Sua solicitação foi salva, mas nosso sistema de e-mail não conseguiu enviá-la. Entre em contato diretamente com nossa equipe para não perdermos sua solicitação.',
		emailFailAction: 'Fale com a equipe',
		emailFailDismiss: 'Fechar',
		countryCode: 'Código do país',
		responseTime: 'Respondemos o mais rápido possível',
		trustBadge: 'A escolha de mais de 500 eventos em Málaga'
	},
	// Thank-you page
	thankYou: {
		headline: 'Obrigado! Sua solicitação está a caminho.',
		subheadline: 'Recebemos sua solicitação e entraremos em contato o mais rápido possível.',
		responseTime: 'Resposta esperada: o mais rápido possível',
		backToPackages: 'Ver todos os pacotes',
		whatsappCta: 'Ou fale conosco agora pelo WhatsApp',
		leadLabel: 'Referência'
	},
	// Gallery
	gallery: {
		titleHome: 'Nossos eventos em ação',
		titlePackage: 'Eventos anteriores com o {pack}'
	},
	// Google Map / Profile
	googleMap: {
		badge: 'Localização e perfil no Google',
		title: 'Encontre-nos no Google',
		subtitle: 'Visite nosso perfil oficial no Google Business ou veja nossa localização em Málaga.',
		viewOnGoogle: 'Ver no Google Maps',
		mapTitle: 'Malaga Event Gear - Perfil no Google Business'
	},
	// Footer
	footer: {
		brandSubtitle:
			'Aluguel de som, iluminação e telas premium para eventos exclusivos em Málaga e na Costa del Sol. Equipamento de última geração e suporte técnico sob medida.',
		usefulLinks: 'Links úteis',
		home: 'Início',
		packages: 'Pacotes',
		blog: 'Blog',
		news: 'Notícias',
		categories: 'Categorias',
		aboutUs: 'Sobre nós',
		meetTheTeam: 'Nossa equipe',
		contactUs: 'Fale conosco',
		termsOfService: 'Termos de uso',
		privacyPolicy: 'Política de privacidade',
		cookiePolicy: 'Política de cookies',
		gdpr: 'GDPR',
		faq: 'Perguntas frequentes',
		sitemap: 'Mapa do site',
		servicePackages: 'Pacotes de serviço',
		localAddress: 'Endereço local',
		listings: 'Diretórios',
		onlinePresence: 'Presença online',
		moreInformation: 'Mais informações',
		moreInfoText:
			'Precisa de mais detalhes? Fale conosco para saber sobre o aluguel de equipamentos para eventos, preços e disponibilidade.',
		tel: 'Tel',
		clickToChat: 'Clique para conversar',
		emails: 'E-mails',
		forHire: 'Para aluguel',
		forContact: 'Para contato',
		forLegal: 'Para questões legais',
		allRightsReserved: 'Todos os direitos reservados.',
		developedBy: 'Desenvolvido por',
		lorenzozTitle: 'Lorenzoz Agency: agência de desenvolvimento web e soluções empresariais',
		mailAriaLabel: 'Enviar e-mail',
		callAriaLabel: 'Ligar para a Malaga Event Gear: {phone}'
	},
	// Blog (post card, article layout, share widgets, click-to-tweet)
	blog: {
		newsBadge: 'Notícias',
		byAuthor: 'Por',
		updated: 'Atualizado',
		shareInlineLabel: 'Compartilhar:',
		shareSidebarLabel: 'COMPARTILHAR',
		shareDrawerTitle: 'Compartilhar este post',
		copiedShort: 'Copiado!',
		copiedExclaim: 'Copiado!',
		copyShort: 'Copiar link',
		copyLink: 'Copiar link',
		shareOnAria: 'Compartilhar no {network}',
		copyLinkAria: 'Copiar link para a área de transferência',
		openSharingAria: 'Abrir opções de compartilhamento',
		closeSharingAria: 'Fechar opções de compartilhamento',
		tweetLabel: 'Tweet',
		tweetAria: 'Tuitar esta seleção',
		packagesSidebarAria: 'Barra lateral de pacotes de eventos',
		tocSidebarAria: 'Barra lateral do sumário'
	},
	// WhatsApp floating widget
	whatsapp: {
		chatWithUs: 'Fale conosco'
	},
	// Error page (404 / 500)
	errorPage: {
		notFoundHeading: 'Página não encontrada',
		genericHeading: 'Algo deu errado',
		notFoundBody: 'A página que você procura não existe ou foi movida. Volte para a página inicial ou fale conosco.',
		genericBody:
			'Tivemos um problema ao processar sua solicitação. Volte para a página inicial ou fale conosco e resolveremos isso.',
		contactUs: 'Fale conosco',
		backHome: 'Voltar ao início'
	}
} satisfies Messages;

export default t;
