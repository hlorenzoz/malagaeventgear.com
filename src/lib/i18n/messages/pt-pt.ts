import type { Messages } from './en';

const t = {
	// Navigation
	nav: {
		equipment: 'Equipamento',
		packages: 'Pacotes',
		blog: 'Blog',
		contact: 'Contacto',
		bookNow: 'Reservar agora',
		blogInEnglish: 'Blog (em inglês)',
		language: 'Idioma',
		breadcrumbs: 'Trilho de navegação',
		brand: 'Malaga Event Gear',
		toggleTheme: 'Alternar o tema de cores',
		openMenu: 'Abrir o menu de navegação'
	},
	// Language notices (CLAUDE.md, "Idiomas soportados")
	notices: {
		serviceLanguages: 'Respondemos em inglês ou espanhol.',
		legalTranslation: 'Esta é uma tradução. Se diferir da versão em inglês, prevalece a versão em inglês.',
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
		contact: 'Contacto',
		'about-us': 'Sobre nós',
		faq: 'Perguntas frequentes',
		'privacy-policy': 'Política de privacidade',
		'terms-of-service': 'Termos e condições',
		'cookie-policy': 'Política de cookies',
		gdpr: 'RGPD',
		'meet-the-team': 'A nossa equipa',
		equipment: 'Equipamento',
		sitemap: 'Mapa do site',
		'thank-you': 'Obrigado'
	},
	// Hero
	hero: {
		span: 'Para todo o tipo de eventos',
		titlePart1: 'Aluguer de equipamento',
		titleGradient: 'audiovisual',
		titlePart2: 'em Málaga',
		subtitle: 'Desfrute de som cristalino e iluminação deslumbrante com o nosso equipamento premium. Perfeito para casamentos, eventos corporativos e festas exclusivas na Costa del Sol.',
		viewPricing: 'Ver preços',
		contactUs: 'Contacte-nos'
	},
	// Bento Info Cards
	bento: {
		card1Title: '#1 Montagem impecável',
		card1Text: 'Apoio técnico dedicado para garantir que o seu evento decorre sem percalços do início ao fim, sem preocupações.',
		card2Title: '#2 Pacotes personalizados',
		card2Text: 'Pacotes de aluguer flexíveis, concebidos para se adaptarem na perfeição a qualquer dimensão de evento, local e orçamento.',
		card3Title: '#3 Tecnologia de ponta',
		card3Text: 'Desfrute de equipamento audiovisual de última geração que eleva a qualidade visual e sonora da sua produção.'
	},
	// Overview (At a Glance: answer-engine optimization)
	overview: {
		badge: 'Num relance',
		sellQ: 'O que vendemos?',
		sellA: 'Alugamos equipamento audiovisual premium (sistemas de som profissionais, iluminação de palco, projetores e ecrãs) para eventos em Málaga e na Costa del Sol, com entrega, montagem e apoio técnico no local incluídos.',
		whoQ: 'Para quem é?',
		whoA: 'Casais a planear o casamento, empresas que organizam conferências e eventos corporativos, e qualquer pessoa que organize uma festa ou celebração privada e queira som e iluminação impecáveis sem ter de comprar o equipamento.',
		costQ: 'Quanto custa?',
		costA: 'Pacotes com preço fixo e sem custos ocultos, adaptados à dimensão do seu evento, além de orçamentos personalizados para produções de maior escala.',
		costFrom: 'A partir de',
		howQ: 'Como funciona?',
		howA: 'Quatro passos simples: escolha o seu pacote, peça um orçamento, confirmamos e preparamos o seu equipamento, e a nossa equipa entrega e monta tudo no dia do seu evento.'
	},
	// Impact
	impact: {
		title: 'O nosso impacto em números',
		years: 'Anos de experiência',
		clients: 'Clientes satisfeitos',
		satisfaction: 'Taxa de satisfação'
	},
	// Categories
	categories: {
		badge: 'Equipamento premium',
		title: 'Categorias disponíveis',
		soundTitle: 'Sistemas de som',
		soundText: 'Som cristalino de alta fidelidade, ideal para casamentos intimistas ou grandes conferências corporativas. Trabalhamos com marcas líderes para garantir a máxima fidelidade acústica.',
		lightTitle: 'Iluminação',
		lightText: 'Soluções de iluminação dinâmica para criar o ambiente perfeito no seu espaço.',
		visualTitle: 'Projetores e ecrãs',
		visualText: 'Imagens nítidas e de alta definição para apresentações com elevado impacto visual.',
		fxTitle: 'Efeitos especiais e máquinas de fumo',
		fxText: 'Crie uma atmosfera deslumbrante no seu evento com os nossos efeitos especiais e máquinas de fumo de nível profissional.',
		bookEquipment: 'Reservar pacotes'
	},
	// Pricing
	pricing: {
		badge: 'Preços transparentes',
		title: 'Pacotes personalizados para cada evento',
		subtitle: 'Escolha entre os nossos pacotes de aluguer flexíveis, concebidos para se adaptarem na perfeição a qualquer dimensão de evento e orçamento. Facilitamos o planeamento!',
		includes: 'Inclui:',
		includedServices: 'Serviços incluídos:',
		optional: 'Opcional:',
		check: 'Verificar disponibilidade',
		mostPopular: 'Mais popular',
		from: 'A partir de',
		plusVat: '(+{vat} IVA)',
		plusVatShort: '(+IVA)',
		bookPack: 'Reservar'
	},
	// Packages filters (e-commerce)
	filters: {
		title: 'Filtros',
		clearAll: 'Limpar tudo',
		resetFilters: 'Repor filtros',
		showingResults: 'A mostrar {visible} de {total} pacotes',
		noResults: 'Nenhum pacote corresponde aos seus filtros. Experimente limpar algumas seleções!',
		openFilters: 'Filtros',
		done: 'Ver resultados',
		purpose: 'Tipo de evento',
		capacity: 'Dimensão do evento',
		price: 'Orçamento',
		equipment: 'Equipamento incluído',
		extras: 'Extras opcionais',
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
		screen: 'Ecrã / visualização',
		sound: 'Sistema de som',
		microphone: 'Microfones',
		lighting: 'Iluminação ambiente',
		technician: 'Técnico ao vivo',
		projector: 'Projetor',
		smokeMachine: 'Máquina de fumo',
		technicalAssistant: 'Assistente técnico',
		lectern: 'Púlpito',
		staging: 'Palco',
		recommended: 'Recomendado',
		priceAsc: 'Preço: do mais baixo ao mais alto',
		priceDesc: 'Preço: do mais alto ao mais baixo'
	},
	// Contact
	contact: {
		badge: 'Resposta imediata 24/7',
		title: 'Entre em contacto',
		subtitle: 'Pronto para elevar o seu evento? Contacte a nossa equipa técnica para receber orçamentos personalizados, verificar a disponibilidade de equipamento e obter aconselhamento especializado.',
		detailsTitle: 'Dados de contacto',
		phone: 'Telefone',
		whatsapp: 'WhatsApp',
		email: 'Email',
		location: 'Localização',
		hours: 'Horário de funcionamento',
		hoursText: 'Apoio técnico e logística 24 horas por dia, 7 dias por semana.',
		reqTitle: 'Pedir um orçamento',
		formName: 'Nome completo *',
		formEmail: 'Endereço de email *',
		formPhone: 'Telefone de contacto',
		formDate: 'Data do evento',
		formType: 'Tipo de evento',
		formTypeWedding: 'Casamento / celebração',
		formTypeCorporate: 'Evento corporativo',
		formTypeParty: 'Festa privada',
		formTypeMice: 'Conferência / MICE',
		formTypeOther: 'Outro tipo de evento',
		formMessage: 'Detalhes do evento e requisitos técnicos *',
		formSubmit: 'Enviar pedido',
		formSubmitting: 'A enviar...',
		formRequiredError: 'Por favor, preencha todos os campos obrigatórios.',
		formErrorSubmit: 'Ocorreu um problema ao enviar o seu pedido. Tente novamente ou contacte-nos diretamente por email.',
		formErrorTurnstile: 'A verificação de segurança falhou. Tente novamente.',
		formErrorRateLimited: 'Demasiados pedidos. Aguarde alguns minutos e tente novamente.',
		lockedFieldNote: 'Gerado automaticamente a partir de um erro. Este campo não pode ser editado.',
		errorPrefillMessage:
			'Olá, submeti um pedido de pacote no vosso site, mas o email de confirmação não foi enviado. Podem confirmar que receberam o meu pedido? Referência: {ref}',
		errorDetailsHeader: 'Detalhes submetidos:',
		errorDetailSource: 'URL do formulário',
		errorDetailName: 'Nome',
		errorDetailEmail: 'Email',
		errorDetailPhone: 'Telefone',
		errorDetailDate: 'Data do evento',
		errorDetailPackage: 'Pacote',
		errorDetailComments: 'Comentários',
		successTitle: 'Orçamento pedido!',
		successText1: 'Olá',
		successText2: 'recebemos o seu pedido com sucesso. A nossa equipa técnica em Málaga irá avaliá-lo e entrar em contacto consigo por email (',
		successText3: ') o mais brevemente possível.',
		successButton: 'Enviar outro pedido',
		faqTitle: 'Perguntas frequentes'
	},
	// Packages Showcase
	packages: {
		badge: 'Pacotes em destaque',
		title: 'Escolha o seu pacote perfeito',
		subtitle: 'Adaptados a cada ocasião. Todos os pacotes incluem transporte, montagem e apoio técnico no local.',
		enquire: 'Pedir um orçamento'
	},
	// How It Works
	process: {
		badge: 'Como funciona',
		title: 'O seu evento em 4 passos simples',
		s1Title: 'Escolha o seu pacote',
		s1Desc: 'Explore os nossos pacotes e escolha o que melhor se adapta à dimensão e ao estilo do seu evento.',
		s2Title: 'Peça um orçamento',
		s2Desc: 'Preencha o nosso formulário rápido. Respondemos o mais brevemente possível com a disponibilidade completa.',
		s3Title: 'Confirme e planeie',
		s3Desc: 'A nossa equipa confirma a logística, o acesso ao local e todos os detalhes técnicos.',
		s4Title: 'Desfrute do seu evento',
		s4Desc: 'Tratamos da montagem, da produção e da desmontagem. Zero stress para si.'
	},
	// Pricing Preview
	pricingPreview: {
		badge: 'Preços transparentes',
		title: 'Preços simples e com tudo incluído',
		subtitle: 'Sem custos ocultos. Transporte, montagem e apoio técnico sempre incluídos.',
		viewAll: 'Ver todos os pacotes'
	},
	// FAQ
	faq: {
		badge: 'Perguntas frequentes',
		title: 'Perguntas comuns'
	},
	// Testimonials (Google reviews)
	testimonials: {
		badge: 'Avaliações de clientes',
		title: 'Histórias reais de eventos reais',
		subtitle: 'Avaliações verificadas do Google de clientes em toda a Costa del Sol.',
		ratingLabel: 'EXCELENTE',
		basedOn: 'Com base em {n} avaliações',
		poweredBy: 'A mostrar as nossas avaliações mais recentes',
		readMore: 'Ler mais',
		readLess: 'Ler menos',
		seeAll: 'Ver todas as avaliações',
		prevAria: 'Avaliação anterior',
		nextAria: 'Avaliação seguinte',
		outOfFiveStars: 'de 5 estrelas'
	},
	// Lead capture form
	leadForm: {
		title: 'Garanta a data do seu evento',
		subtitle: 'Preencha o formulário e entraremos em contacto consigo o mais brevemente possível.',
		nameLabelInput: 'Nome completo *',
		emailLabelInput: 'Endereço de email *',
		phoneLabelInput: 'Telefone / WhatsApp *',
		eventDateLabel: 'Data do evento *',
		commentsLabel: 'Perguntas ou comentários',
		commentsPlaceholder: 'Fale-nos do seu evento: local, número de convidados, requisitos especiais...',
		submitBtn: 'Verificar disponibilidade da data',
		submitting: 'A enviar...',
		errorRequired: 'Este campo é obrigatório.',
		errorEmail: 'Introduza um endereço de email válido.',
		errorPhone: 'Introduza um número de telefone válido.',
		errorDateFuture: 'A data do evento deve ser no futuro.',
		errorMinLength: 'Deve ter pelo menos 2 caracteres.',
		errorMaxLength: 'Máximo de 1000 caracteres permitidos.',
		errorHoneypot: 'Spam detetado.',
		noCardRequired: 'Não é necessário cartão de crédito para verificar a disponibilidade',
		quickResponseNote: 'Resposta o mais brevemente possível',
		errorSubmit: 'Ocorreu um problema. Tente novamente ou contacte-nos diretamente.',
		errorTurnstile: 'A verificação de segurança falhou. Tente novamente.',
		errorRateLimited: 'Demasiados pedidos. Aguarde alguns minutos e tente novamente.',
		emailFailTitle: 'Não foi possível enviar a sua confirmação',
		emailFailBody: 'O seu pedido foi guardado, mas o nosso sistema de email não o conseguiu enviar. Contacte a nossa equipa diretamente para não perdermos o seu pedido.',
		emailFailAction: 'Contactar a equipa',
		emailFailDismiss: 'Fechar',
		countryCode: 'Indicativo do país',
		responseTime: 'Respondemos o mais brevemente possível',
		trustBadge: 'A escolha de {clients} clientes'
	},
	// Thank-you page
	thankYou: {
		headline: 'Obrigado! O seu pedido está a caminho.',
		subheadline: 'Recebemos o seu pedido e entraremos em contacto consigo o mais brevemente possível.',
		responseTime: 'Resposta prevista: o mais brevemente possível',
		backToPackages: 'Ver todos os pacotes',
		whatsappCta: 'Ou contacte-nos já pelo WhatsApp',
		leadLabel: 'Referência'
	},
	// Gallery
	gallery: {
		titleHome: 'Os nossos eventos em ação',
		titlePackage: 'Eventos anteriores com o {pack}'
	},
	// Google Map / Profile
	googleMap: {
		badge: 'Localização e perfil do Google',
		title: 'Encontre-nos no Google',
		subtitle: 'Visite o nosso perfil oficial do Google Business ou veja a nossa localização em Málaga.',
		viewOnGoogle: 'Ver no Google Maps',
		mapTitle: 'Malaga Event Gear - Perfil do Google Business'
	},
	// Footer
	footer: {
		brandSubtitle:
			'Aluguer premium de som, iluminação e ecrãs para eventos exclusivos em Málaga e na Costa del Sol. Equipamento de última geração e apoio técnico personalizado.',
		usefulLinks: 'Links úteis',
		home: 'Início',
		packages: 'Pacotes',
		blog: 'Blog',
		news: 'Notícias',
		categories: 'Categorias',
		aboutUs: 'Sobre nós',
		meetTheTeam: 'A nossa equipa',
		contactUs: 'Contacte-nos',
		termsOfService: 'Termos e condições',
		privacyPolicy: 'Política de privacidade',
		cookiePolicy: 'Política de cookies',
		gdpr: 'RGPD',
		faq: 'Perguntas frequentes',
		sitemap: 'Mapa do site',
		servicePackages: 'Pacotes de serviço',
		localAddress: 'Morada local',
		listings: 'Diretórios',
		onlinePresence: 'Presença online',
		moreInformation: 'Mais informação',
		moreInfoText: 'Precisa de mais detalhes? Contacte-nos para obter informações sobre os nossos alugueres de equipamento para eventos, preços e disponibilidade.',
		tel: 'Tel',
		clickToChat: 'Clique para conversar',
		emails: 'Emails',
		forHire: 'Para aluguer',
		forContact: 'Para contacto',
		forLegal: 'Para questões legais',
		allRightsReserved: 'Todos os direitos reservados.',
		developedBy: 'Desenvolvido por',
		lorenzozTitle: 'Lorenzoz Agency: agência de desenvolvimento web e soluções empresariais',
		mailAriaLabel: 'Enviar email',
		callAriaLabel: 'Ligar para a Malaga Event Gear: {phone}'
	},
	// Blog (post card, article layout, share widgets, click-to-tweet)
	blog: {
		newsBadge: 'Notícias',
		byAuthor: 'Por',
		updated: 'Atualizado',
		shareInlineLabel: 'Partilhar:',
		shareSidebarLabel: 'PARTILHAR',
		shareDrawerTitle: 'Partilhar esta publicação',
		copiedShort: 'Copiado!',
		copiedExclaim: 'Copiado!',
		copyShort: 'Copiar link',
		copyLink: 'Copiar link',
		shareOnAria: 'Partilhar no {network}',
		copyLinkAria: 'Copiar link para a área de transferência',
		openSharingAria: 'Abrir opções de partilha',
		closeSharingAria: 'Fechar opções de partilha',
		tweetLabel: 'Tweet',
		tweetAria: 'Tweetar esta seleção',
		packagesSidebarAria: 'Barra lateral de pacotes de eventos',
		tocSidebarAria: 'Barra lateral do índice'
	},
	blogStructure: {
		faqHeadings: ['Perguntas frequentes'],
		overviewHeadings: ['Resumo'],
		highlightsHeadings: ['Pontos principais'],
		testimonialsHeadings: ['Testemunhos'],
		tocHeadings: ['Índice'],
		inThisArticle: 'Neste artigo',
		tocAria: 'Índice',
		faqAria: 'Perguntas frequentes'
	},
	postCta: {
		aria: 'Sugestão de pacote para o seu evento',
		headline: {
			wedding: 'Está a planear um casamento em Málaga?',
			'basic-mice': 'Está a organizar um evento corporativo?',
			mice: 'Precisa de apoio audiovisual MICE de topo?',
			'product-presentation': 'Vai lançar um produto ou fazer uma apresentação?',
			eco: 'Está a planear um evento privado?'
		},
		subline: {
			wedding: 'Conheça o {name}: som profissional e iluminação romântica para o seu grande dia.',
			'basic-mice': 'Conheça o {name}: audiovisual nítido para reuniões de direção e conferências.',
			mice: 'Conheça o {name}: ecrã LED de topo, som e um técnico no local.',
			'product-presentation': 'Conheça o {name}: projetor de alta luminosidade, ecrã e som para apresentações de grande impacto.',
			eco: 'Conheça o {name}: som sólido e iluminação ambiente para até {guests} convidados.'
		},
		priceFrom: 'A partir de {price}',
		viewPackage: 'Ver o {name}',
		freeQuote: 'Pedir um orçamento gratuito'
	},
	packagesRail: {
		title: 'Os nossos pacotes',
		aria: 'Pacotes para eventos',
		priceFrom: 'desde {price}'
	},
	// WhatsApp floating widget
	whatsapp: {
		chatWithUs: 'Fale connosco'
	},
	// Error page (404 / 500)
	errorPage: {
		notFoundHeading: 'Página não encontrada',
		genericHeading: 'Ocorreu um problema',
		notFoundBody: 'A página que procura não existe ou foi movida. Volte à página inicial ou entre em contacto connosco.',
		genericBody: 'Ocorreu um problema ao processar o seu pedido. Volte à página inicial ou contacte-nos e resolveremos a situação.',
		contactUs: 'Contacte-nos',
		backHome: 'Voltar ao início'
	}
} satisfies Messages;

export default t;
