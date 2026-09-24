import type { Messages } from './en';

const t = {
	// Navigation
	nav: {
		equipment: 'Equipamentos',
		packages: 'Pacotes',
		blog: 'Blog',
		contact: 'Contato',
		bookNow: 'Reserve Agora',
		blogInEnglish: 'Blog (em inglês)',
		language: 'Idioma',
		breadcrumbs: 'Trilha de navegação',
		brand: 'Malaga Event Gear'
	},
	// Language notices (CLAUDE.md, "Idiomas soportados")
	notices: {
		serviceLanguages: 'Respondemos em inglês ou espanhol.',
		legalTranslation:
			'Esta é uma tradução. Se houver diferenças em relação à versão em inglês, a versão em inglês prevalece.',
		readEnglish: 'Ler a versão em inglês',
		translatedFrom: 'Traduzido de {language}',
		showOriginal: 'Mostrar original'
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
		'about-us': 'Sobre Nós',
		faq: 'Perguntas Frequentes',
		'privacy-policy': 'Política de Privacidade',
		'terms-of-service': 'Termos de Uso',
		'cookie-policy': 'Política de Cookies',
		gdpr: 'GDPR',
		'meet-the-team': 'Nossa Equipe',
		equipment: 'Equipamentos',
		sitemap: 'Mapa do Site',
		'thank-you': 'Obrigado'
	},
	// Hero
	hero: {
		span: 'Para Todos os Tipos de Eventos',
		titlePart1: 'Aluguel de Equipamento',
		titleGradient: 'Audiovisual',
		titlePart2: 'em Málaga',
		subtitle:
			'Viva um som cristalino e uma iluminação deslumbrante com nosso equipamento premium. Perfeito para casamentos, eventos corporativos e festas exclusivas na Costa del Sol.',
		viewPricing: 'Ver Preços',
		contactUs: 'Fale Conosco'
	},
	// Bento Info Cards
	bento: {
		card1Title: '#1 Montagem Impecável',
		card1Text:
			'Suporte técnico dedicado para garantir que seu evento aconteça sem contratempos, do início ao fim.',
		card2Title: '#2 Pacotes Sob Medida',
		card2Text:
			'Pacotes de aluguel flexíveis, criados para se ajustar perfeitamente a qualquer tamanho de evento, local e orçamento.',
		card3Title: '#3 Tecnologia de Ponta',
		card3Text:
			'Aproveite equipamentos audiovisuais de última geração que elevam a qualidade visual e sonora da sua produção.'
	},
	// Overview (At a Glance, answer-engine optimization)
	overview: {
		badge: 'Resumo Rápido',
		sellQ: 'O que vendemos?',
		sellA:
			'Alugamos equipamento audiovisual premium (sistemas de som profissionais, iluminação de palco, projetores e telas) para eventos em Málaga e na Costa del Sol, com entrega, montagem e suporte técnico no local incluídos.',
		whoQ: 'Para quem é?',
		whoA:
			'Casais planejando casamentos, empresas organizando conferências e eventos corporativos, e qualquer pessoa promovendo uma festa ou celebração particular que queira som e iluminação impecáveis sem precisar comprar o equipamento.',
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
		title: 'Nosso Impacto em Números',
		years: 'Anos de Experiência',
		clients: 'Clientes Satisfeitos',
		satisfaction: 'Taxa de Satisfação'
	},
	// Categories
	categories: {
		badge: 'Equipamento Premium',
		title: 'Categorias Disponíveis',
		soundTitle: 'Sistemas de Som',
		soundText:
			'Som de alta fidelidade e cristalino, ideal para casamentos íntimos ou grandes conferências corporativas. Trabalhamos com marcas líderes para garantir a mais alta fidelidade acústica.',
		lightTitle: 'Iluminação',
		lightText: 'Soluções de iluminação dinâmica para criar a atmosfera perfeita no seu local de evento.',
		visualTitle: 'Projetores e Telas',
		visualText: 'Imagens nítidas em alta definição para apresentações com alto impacto visual.',
		fxTitle: 'Efeitos Especiais e Máquinas de Fumaça',
		fxText:
			'Crie uma atmosfera impressionante no seu evento com nossos efeitos especiais e máquinas de fumaça de nível profissional.',
		bookEquipment: 'Reservar Pacotes'
	},
	// Pricing
	pricing: {
		badge: 'Preços Transparentes',
		title: 'Pacotes Sob Medida para Cada Evento',
		subtitle:
			'Escolha entre nossos pacotes de aluguel flexíveis, criados para se ajustar perfeitamente a qualquer tamanho de evento e orçamento. Facilitamos o planejamento!',
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
		resetFilters: 'Redefinir Filtros',
		showingResults: 'Mostrando {visible} de {total} pacotes',
		noResults: 'Nenhum pacote corresponde aos seus filtros. Tente remover algumas seleções!',
		openFilters: 'Filtros',
		done: 'Mostrar resultados',
		purpose: 'Tipo de Evento',
		capacity: 'Porte do Evento',
		price: 'Orçamento',
		equipment: 'Equipamento Incluído',
		extras: 'Adicionais Opcionais',
		sortBy: 'Ordenar Por',
		party: 'Festas',
		wedding: 'Casamentos',
		corporate: 'Corporativo',
		presentation: 'Apresentações',
		meeting: 'Reuniões',
		small: 'Pequeno (até 50 convidados)',
		medium: 'Médio (51 a 80 convidados)',
		large: 'Grande (mais de 80 convidados)',
		priceLow: 'Até 300€',
		priceMid: '300€ a 500€',
		priceHigh: '500€ ou mais',
		transport: 'Transporte e Montagem',
		screen: 'Tela / Projeção',
		sound: 'Sistema de Som',
		microphone: 'Microfones',
		lighting: 'Iluminação Ambiente',
		technician: 'Técnico ao Vivo',
		projector: 'Projetor',
		smokeMachine: 'Máquina de Fumaça',
		technicalAssistant: 'Assistente Técnico',
		lectern: 'Púlpito',
		staging: 'Palco',
		recommended: 'Recomendado',
		priceAsc: 'Preço: Menor para Maior',
		priceDesc: 'Preço: Maior para Menor'
	},
	// Contact
	contact: {
		badge: 'Resposta Imediata 24/7',
		title: 'Entre em Contato',
		subtitle:
			'Pronto para elevar o nível do seu evento? Fale com nossa equipe técnica para receber orçamentos personalizados, verificar a disponibilidade do equipamento e obter orientação especializada.',
		detailsTitle: 'Dados de Contato',
		phone: 'Telefone',
		whatsapp: 'WhatsApp',
		email: 'E-mail',
		location: 'Localização',
		hours: 'Horário de Funcionamento',
		hoursText: 'Suporte técnico e logística 24 horas por dia, 7 dias por semana.',
		reqTitle: 'Solicitar um Orçamento',
		formName: 'Nome Completo *',
		formEmail: 'Endereço de E-mail *',
		formPhone: 'Telefone de Contato',
		formDate: 'Data do Evento',
		formType: 'Tipo de Evento',
		formTypeWedding: 'Casamento / Celebração',
		formTypeCorporate: 'Evento Corporativo',
		formTypeParty: 'Festa Particular',
		formTypeMice: 'Conferência / MICE',
		formTypeOther: 'Outro tipo de evento',
		formMessage: 'Detalhes do Evento e Requisitos Técnicos *',
		formSubmit: 'Enviar Solicitação',
		formSubmitting: 'Enviando...',
		formRequiredError: 'Por favor, preencha todos os campos obrigatórios.',
		formErrorSubmit:
			'Algo deu errado ao enviar sua solicitação. Tente novamente ou envie um e-mail diretamente.',
		formErrorTurnstile: 'Falha na verificação de segurança. Tente novamente.',
		formErrorRateLimited: 'Muitas solicitações. Aguarde alguns minutos e tente novamente.',
		lockedFieldNote: 'Gerado automaticamente a partir de um erro. Este campo não pode ser editado.',
		errorPrefillMessage:
			'Olá, enviei uma solicitação de pacote no seu site, mas o e-mail de confirmação não chegou. Poderia confirmar o recebimento da minha solicitação? Referência: {ref}',
		errorDetailsHeader: 'Detalhes enviados:',
		errorDetailSource: 'URL do formulário',
		errorDetailName: 'Nome',
		errorDetailEmail: 'E-mail',
		errorDetailPhone: 'Telefone',
		errorDetailDate: 'Data do evento',
		errorDetailPackage: 'Pacote',
		errorDetailComments: 'Comentários',
		successTitle: 'Orçamento Solicitado!',
		successText1: 'Olá',
		successText2:
			'recebemos sua solicitação com sucesso. Nossa equipe técnica em Málaga vai avaliá-la e entrar em contato por e-mail (',
		successText3: ') o mais rápido possível.',
		successButton: 'Enviar outra solicitação',
		faqTitle: 'Perguntas Frequentes'
	},
	// Packages Showcase
	packages: {
		badge: 'Pacotes em Destaque',
		title: 'Escolha o Pacote Perfeito',
		subtitle:
			'Feito sob medida para cada ocasião. Todos os pacotes incluem transporte, montagem e suporte técnico no local.',
		enquire: 'Solicitar Orçamento'
	},
	// How It Works
	process: {
		badge: 'Como Funciona',
		title: 'Seu Evento em 4 Passos Simples',
		s1Title: 'Escolha Seu Pacote',
		s1Desc: 'Explore nossos pacotes e escolha o que combina com o tamanho e o estilo do seu evento.',
		s2Title: 'Peça um Orçamento',
		s2Desc: 'Preencha nosso formulário rápido. Respondemos o mais rápido possível com a disponibilidade completa.',
		s3Title: 'Confirme e Planeje',
		s3Desc: 'Nossa equipe confirma a logística, o acesso ao local e cada detalhe técnico.',
		s4Title: 'Aproveite Seu Evento',
		s4Desc: 'Cuidamos da montagem, tocamos o evento e desmontamos tudo depois. Zero estresse para você.'
	},
	// Pricing Preview
	pricingPreview: {
		badge: 'Preços Transparentes',
		title: 'Preços Simples e Tudo Incluído',
		subtitle: 'Sem taxas escondidas. Transporte, montagem e suporte técnico sempre incluídos.',
		viewAll: 'Ver Todos os Pacotes'
	},
	// FAQ
	faq: {
		badge: 'Perguntas Frequentes',
		title: 'Dúvidas Comuns'
	},
	// Testimonials (Google reviews)
	testimonials: {
		badge: 'Avaliações de Clientes',
		title: 'Histórias Reais de Eventos Reais',
		subtitle: 'Avaliações verificadas do Google de clientes em toda a Costa del Sol.',
		ratingLabel: 'EXCELENTE',
		basedOn: 'Baseado em {n} avaliações',
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
		title: 'Garanta a Data do Seu Evento',
		subtitle: 'Preencha o formulário e entraremos em contato o mais rápido possível.',
		nameLabelInput: 'Nome Completo *',
		emailLabelInput: 'Endereço de E-mail *',
		phoneLabelInput: 'Telefone / WhatsApp *',
		eventDateLabel: 'Data do Evento *',
		commentsLabel: 'Perguntas ou Comentários',
		commentsPlaceholder:
			'Nos diga sobre seu evento: local, número de convidados, requisitos especiais...',
		submitBtn: 'Verificar Disponibilidade da Data',
		submitting: 'Enviando...',
		errorRequired: 'Este campo é obrigatório.',
		errorEmail: 'Digite um endereço de e-mail válido.',
		errorPhone: 'Digite um número de telefone válido.',
		errorDateFuture: 'A data do evento deve ser no futuro.',
		errorMinLength: 'Deve ter pelo menos 2 caracteres.',
		errorMaxLength: 'Máximo de 1000 caracteres permitido.',
		errorHoneypot: 'Spam detectado.',
		noCardRequired: 'Não é necessário cartão de crédito para verificar disponibilidade',
		quickResponseNote: 'Resposta o mais rápido possível',
		errorSubmit: 'Algo deu errado. Tente novamente ou fale conosco diretamente.',
		errorTurnstile: 'Falha na verificação de segurança. Tente novamente.',
		errorRateLimited: 'Muitas solicitações. Aguarde alguns minutos e tente novamente.',
		emailFailTitle: 'Não foi possível enviar sua confirmação',
		emailFailBody:
			'Sua solicitação foi salva, mas nosso sistema de e-mail falhou ao enviá-la. Entre em contato diretamente com nossa equipe para não perdermos sua solicitação.',
		emailFailAction: 'Fale com a equipe',
		emailFailDismiss: 'Fechar',
		countryCode: 'Código do País',
		responseTime: 'Respondemos o mais rápido possível',
		trustBadge: 'Confiado por mais de 500 eventos em Málaga'
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
		titleHome: 'Nossos Eventos em Ação',
		titlePackage: 'Eventos Anteriores do {pack}'
	},
	// Google Map / Profile
	googleMap: {
		badge: 'Localização e Perfil no Google',
		title: 'Encontre-nos no Google',
		subtitle: 'Visite nosso perfil oficial no Google Business ou veja nossa localização em Málaga.',
		viewOnGoogle: 'Ver no Google Maps',
		mapTitle: 'Malaga Event Gear - Perfil no Google Business'
	},
	// Footer
	footer: {
		brandSubtitle:
			'Aluguel de som, iluminação e telas premium para eventos exclusivos em Málaga e na Costa del Sol. Equipamento de última geração e suporte técnico sob medida.',
		usefulLinks: 'Links Úteis',
		home: 'Início',
		packages: 'Pacotes',
		blog: 'Blog',
		news: 'Notícias',
		categories: 'Categorias',
		aboutUs: 'Sobre Nós',
		meetTheTeam: 'Nossa Equipe',
		contactUs: 'Fale Conosco',
		termsOfService: 'Termos de Uso',
		privacyPolicy: 'Política de Privacidade',
		cookiePolicy: 'Política de Cookies',
		gdpr: 'GDPR',
		faq: 'Perguntas Frequentes',
		sitemap: 'Mapa do Site',
		servicePackages: 'Pacotes de Serviço',
		localAddress: 'Endereço Local',
		listings: 'Diretórios',
		onlinePresence: 'Presença Online',
		moreInformation: 'Mais Informações',
		moreInfoText:
			'Precisa de mais detalhes? Fale conosco para saber sobre o aluguel de equipamentos, preços e disponibilidade.',
		tel: 'Tel',
		clickToChat: 'Clique para Conversar',
		emails: 'E-mails',
		forHire: 'Para aluguel',
		forContact: 'Para contato',
		forLegal: 'Para questões legais',
		allRightsReserved: 'Todos os direitos reservados.',
		developedBy: 'Desenvolvido por',
		lorenzozTitle: 'Lorenzoz Agency: agência de desenvolvimento web e soluções empresariais',
		mailAriaLabel: 'Enviar e-mail',
		callAriaLabel: 'Ligar para Malaga Event Gear: {phone}'
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
