import type { Messages } from './en';

const t = {
	// Navigation
	nav: {
		equipment: 'Equipamento',
		packages: 'Pacotes',
		blog: 'Blog',
		contact: 'Contacto',
		bookNow: 'Reservar Agora',
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
		'about-us': 'Sobre Nós',
		faq: 'Perguntas Frequentes',
		'privacy-policy': 'Política de Privacidade',
		'terms-of-service': 'Termos e Condições',
		'cookie-policy': 'Política de Cookies',
		gdpr: 'RGPD',
		'meet-the-team': 'A Nossa Equipa',
		equipment: 'Equipamento',
		sitemap: 'Mapa do Site',
		'thank-you': 'Obrigado'
	},
	// Hero
	hero: {
		span: 'Para Todo o Tipo de Eventos',
		titlePart1: 'Aluguer de Equipamento',
		titleGradient: 'Audiovisual',
		titlePart2: 'em Málaga',
		subtitle: 'Desfrute de som cristalino e iluminação deslumbrante com o nosso equipamento premium. Perfeito para casamentos, eventos corporativos e festas exclusivas na Costa del Sol.',
		viewPricing: 'Ver Preços',
		contactUs: 'Contacte-nos'
	},
	// Bento Info Cards
	bento: {
		card1Title: '#1 Configuração Impecável',
		card1Text: 'Apoio técnico dedicado para garantir que o seu evento decorre sem percalços do início ao fim, sem preocupações.',
		card2Title: '#2 Pacotes Personalizados',
		card2Text: 'Pacotes de aluguer flexíveis, concebidos para se adaptarem na perfeição a qualquer dimensão de evento, local e orçamento.',
		card3Title: '#3 Tecnologia de Ponta',
		card3Text: 'Desfrute de equipamento audiovisual de última geração que eleva a qualidade visual e sonora da sua produção.'
	},
	// Overview (At a Glance: answer-engine optimization)
	overview: {
		badge: 'Num Relance',
		sellQ: 'O que vendemos?',
		sellA: 'Alugamos equipamento audiovisual premium, sistemas de som profissionais, iluminação de palco, projetores e ecrãs, para eventos em Málaga e na Costa del Sol, incluindo entrega, montagem e apoio técnico no local.',
		whoQ: 'Para quem é?',
		whoA: 'Casais a planear casamentos, empresas que organizam conferências e eventos corporativos, e qualquer pessoa que organize uma festa ou celebração privada e queira som e iluminação impecáveis sem comprar o equipamento.',
		costQ: 'Quanto custa?',
		costA: 'pacotes com preço fixo e sem custos ocultos, adaptados à dimensão do seu evento, além de orçamentos personalizados para produções de maior escala.',
		costFrom: 'A partir de',
		howQ: 'Como funciona?',
		howA: 'Quatro passos simples: escolha o seu pacote, peça um orçamento, confirmamos e preparamos o seu equipamento, e a nossa equipa entrega e monta tudo no dia do seu evento.'
	},
	// Impact
	impact: {
		title: 'O Nosso Impacto em Números',
		years: 'Anos de Experiência',
		clients: 'Clientes Satisfeitos',
		satisfaction: 'Taxa de Satisfação'
	},
	// Categories
	categories: {
		badge: 'Equipamento Premium',
		title: 'Categorias Disponíveis',
		soundTitle: 'Sistemas de Som',
		soundText: 'Som cristalino de alta fidelidade, ideal para casamentos intimistas ou grandes conferências corporativas. Trabalhamos com marcas líderes para garantir a máxima fidelidade acústica.',
		lightTitle: 'Iluminação',
		lightText: 'Soluções de iluminação dinâmica para criar o ambiente perfeito no seu espaço.',
		visualTitle: 'Projetores e Ecrãs',
		visualText: 'Imagens nítidas e de alta definição para apresentações com elevado impacto visual.',
		fxTitle: 'Efeitos Especiais e Máquinas de Fumo',
		fxText: 'Crie uma atmosfera deslumbrante no seu evento com os nossos efeitos especiais e máquinas de fumo de nível profissional.',
		bookEquipment: 'Reservar Pacotes'
	},
	// Pricing
	pricing: {
		badge: 'Preços Transparentes',
		title: 'Pacotes Personalizados para Cada Evento',
		subtitle: 'Escolha entre os nossos pacotes de aluguer flexíveis, concebidos para se adaptarem na perfeição a qualquer dimensão de evento e orçamento. Facilitamos o planeamento!',
		includes: 'Inclui:',
		includedServices: 'Serviços Incluídos:',
		optional: 'Opcional:',
		check: 'Verificar Disponibilidade',
		mostPopular: 'Mais Popular',
		from: 'A partir de',
		plusVat: '(+21% IVA)',
		plusVatShort: '(+IVA)',
		bookPack: 'Reservar'
	},
	// Packages filters (e-commerce)
	filters: {
		title: 'Filtros',
		clearAll: 'Limpar tudo',
		resetFilters: 'Repor Filtros',
		showingResults: 'A mostrar {visible} de {total} pacotes',
		noResults: 'Nenhum pacote corresponde aos seus filtros. Experimente limpar algumas seleções!',
		openFilters: 'Filtros',
		done: 'Ver resultados',
		purpose: 'Tipo de Evento',
		capacity: 'Dimensão do Evento',
		price: 'Orçamento',
		equipment: 'Equipamento Incluído',
		extras: 'Extras Opcionais',
		sortBy: 'Ordenar Por',
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
		transport: 'Transporte e Montagem',
		screen: 'Ecrã / Visualização',
		sound: 'Sistema de Som',
		microphone: 'Microfones',
		lighting: 'Iluminação Ambiente',
		technician: 'Técnico ao Vivo',
		projector: 'Projetor',
		smokeMachine: 'Máquina de Fumo',
		technicalAssistant: 'Assistente Técnico',
		lectern: 'Púlpito',
		staging: 'Palco',
		recommended: 'Recomendado',
		priceAsc: 'Preço: do mais baixo ao mais alto',
		priceDesc: 'Preço: do mais alto ao mais baixo'
	},
	// Contact
	contact: {
		badge: 'Resposta Imediata 24/7',
		title: 'Entre em Contacto',
		subtitle: 'Pronto para elevar o seu evento? Contacte a nossa equipa técnica para receber orçamentos personalizados, verificar a disponibilidade de equipamento e obter aconselhamento especializado.',
		detailsTitle: 'Dados de Contacto',
		phone: 'Telefone',
		whatsapp: 'WhatsApp',
		email: 'Email',
		location: 'Localização',
		hours: 'Horário de Funcionamento',
		hoursText: 'Apoio técnico e logística 24 horas por dia, 7 dias por semana.',
		reqTitle: 'Pedir um Orçamento',
		formName: 'Nome Completo *',
		formEmail: 'Endereço de Email *',
		formPhone: 'Telefone de Contacto',
		formDate: 'Data do Evento',
		formType: 'Tipo de Evento',
		formTypeWedding: 'Casamento / Celebração',
		formTypeCorporate: 'Evento Corporativo',
		formTypeParty: 'Festa Privada',
		formTypeMice: 'Conferência / MICE',
		formTypeOther: 'Outro tipo de evento',
		formMessage: 'Detalhes do Evento e Requisitos Técnicos *',
		formSubmit: 'Enviar Pedido',
		formSubmitting: 'A enviar...',
		formRequiredError: 'Por favor, preencha todos os campos obrigatórios.',
		formErrorSubmit: 'Ocorreu um problema ao enviar o seu pedido. Tente novamente ou contacte-nos diretamente por email.',
		formErrorTurnstile: 'A verificação de segurança falhou. Tente novamente.',
		formErrorRateLimited: 'Demasiados pedidos. Aguarde alguns minutos e tente novamente.',
		lockedFieldNote: 'Gerado automaticamente a partir de um erro. Este campo não pode ser editado.',
		errorPrefillMessage:
			'Olá, submeti um pedido de pacote no vosso site mas o email de confirmação não foi enviado. Podem confirmar que receberam o meu pedido? Referência: {ref}',
		errorDetailsHeader: 'Detalhes submetidos:',
		errorDetailSource: 'URL do formulário',
		errorDetailName: 'Nome',
		errorDetailEmail: 'Email',
		errorDetailPhone: 'Telefone',
		errorDetailDate: 'Data do evento',
		errorDetailPackage: 'Pacote',
		errorDetailComments: 'Comentários',
		successTitle: 'Orçamento Pedido!',
		successText1: 'Olá',
		successText2: 'recebemos o seu pedido com sucesso. A nossa equipa técnica em Málaga irá avaliá-lo e entrar em contacto por email (',
		successText3: ') o mais brevemente possível.',
		successButton: 'Enviar outro pedido',
		faqTitle: 'Perguntas Frequentes'
	},
	// Packages Showcase
	packages: {
		badge: 'Pacotes em Destaque',
		title: 'Escolha o Seu Pacote Perfeito',
		subtitle: 'Adaptados a cada ocasião. Todos os pacotes incluem transporte, montagem e apoio técnico no local.',
		enquire: 'Pedir um Orçamento'
	},
	// How It Works
	process: {
		badge: 'Como Funciona',
		title: 'O Seu Evento em 4 Passos Simples',
		s1Title: 'Escolha o Seu Pacote',
		s1Desc: 'Explore os nossos pacotes e escolha o que melhor se adapta à dimensão e ao estilo do seu evento.',
		s2Title: 'Peça um Orçamento',
		s2Desc: 'Preencha o nosso formulário rápido. Respondemos o mais brevemente possível com toda a disponibilidade.',
		s3Title: 'Confirme e Planeie',
		s3Desc: 'A nossa equipa confirma a logística, o acesso ao local e todos os detalhes técnicos.',
		s4Title: 'Desfrute do Seu Evento',
		s4Desc: 'Tratamos da montagem, da produção e da desmontagem. Zero stress para si.'
	},
	// Pricing Preview
	pricingPreview: {
		badge: 'Preços Transparentes',
		title: 'Preços Simples e Tudo Incluído',
		subtitle: 'Sem custos ocultos. Transporte, montagem e apoio técnico sempre incluídos.',
		viewAll: 'Ver Todos os Pacotes'
	},
	// FAQ
	faq: {
		badge: 'Perguntas Frequentes',
		title: 'Perguntas Comuns'
	},
	// Testimonials (Google reviews)
	testimonials: {
		badge: 'Avaliações de Clientes',
		title: 'Histórias Reais de Eventos Reais',
		subtitle: 'Avaliações verificadas do Google de clientes em toda a Costa del Sol.',
		ratingLabel: 'EXCELENTE',
		basedOn: 'Com base em {n} avaliações',
		poweredBy: 'A mostrar as nossas avaliações mais recentes',
		readMore: 'Ler mais',
		readLess: 'Ler menos',
		seeAll: 'Ver todas as avaliações',
		prevAria: 'Avaliação anterior',
		nextAria: 'Avaliação seguinte',
		outOfFiveStars: 'em 5 estrelas'
	},
	// Lead capture form
	leadForm: {
		title: 'Garanta a Data do Seu Evento',
		subtitle: 'Preencha o formulário e entraremos em contacto o mais brevemente possível.',
		nameLabelInput: 'Nome Completo *',
		emailLabelInput: 'Endereço de Email *',
		phoneLabelInput: 'Telefone / WhatsApp *',
		eventDateLabel: 'Data do Evento *',
		commentsLabel: 'Perguntas ou Comentários',
		commentsPlaceholder: 'Conte-nos sobre o seu evento: local, número de convidados, requisitos especiais...',
		submitBtn: 'Verificar Disponibilidade da Data',
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
		emailFailBody: 'O seu pedido foi guardado, mas o nosso sistema de email falhou ao enviá-lo. Contacte a nossa equipa diretamente para não perdermos o seu pedido.',
		emailFailAction: 'Contactar a equipa',
		emailFailDismiss: 'Fechar',
		countryCode: 'Indicativo do País',
		responseTime: 'Respondemos o mais brevemente possível',
		trustBadge: 'A confiança de mais de 500 eventos em Málaga'
	},
	// Thank-you page
	thankYou: {
		headline: 'Obrigado! O seu pedido está a caminho.',
		subheadline: 'Recebemos o seu pedido e entraremos em contacto o mais brevemente possível.',
		responseTime: 'Resposta prevista: o mais brevemente possível',
		backToPackages: 'Ver todos os pacotes',
		whatsappCta: 'Ou contacte-nos agora pelo WhatsApp',
		leadLabel: 'Referência'
	},
	// Gallery
	gallery: {
		titleHome: 'Os Nossos Eventos em Ação',
		titlePackage: 'Eventos Anteriores {pack}'
	},
	// Google Map / Profile
	googleMap: {
		badge: 'Localização e Perfil do Google',
		title: 'Encontre-nos no Google',
		subtitle: 'Visite o nosso perfil oficial do Google Business ou veja a nossa localização em Málaga.',
		viewOnGoogle: 'Ver no Google Maps',
		mapTitle: 'Malaga Event Gear - Perfil do Google Business'
	},
	// Footer
	footer: {
		brandSubtitle:
			'Aluguer premium de som, iluminação e ecrãs para eventos exclusivos em Málaga e na Costa del Sol. Equipamento de última geração e apoio técnico personalizado.',
		usefulLinks: 'Links Úteis',
		home: 'Início',
		packages: 'Pacotes',
		blog: 'Blog',
		news: 'Notícias',
		categories: 'Categorias',
		aboutUs: 'Sobre Nós',
		meetTheTeam: 'A Nossa Equipa',
		contactUs: 'Contacte-nos',
		termsOfService: 'Termos e Condições',
		privacyPolicy: 'Política de Privacidade',
		cookiePolicy: 'Política de Cookies',
		gdpr: 'RGPD',
		faq: 'Perguntas Frequentes',
		sitemap: 'Mapa do Site',
		servicePackages: 'Pacotes de Serviço',
		localAddress: 'Morada Local',
		listings: 'Listagens',
		onlinePresence: 'Presença Online',
		moreInformation: 'Mais Informação',
		moreInfoText: 'Precisa de mais detalhes? Contacte-nos para informações sobre os nossos alugueres de equipamento para eventos, preços e disponibilidade.',
		tel: 'Tel',
		clickToChat: 'Clique para Conversar',
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
		shareOnAria: 'Partilhar em {network}',
		copyLinkAria: 'Copiar link para a área de transferência',
		openSharingAria: 'Abrir opções de partilha',
		closeSharingAria: 'Fechar opções de partilha',
		tweetLabel: 'Tweet',
		tweetAria: 'Tweetar esta seleção',
		packagesSidebarAria: 'Barra lateral de pacotes de eventos',
		tocSidebarAria: 'Barra lateral do índice'
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
