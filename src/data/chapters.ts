import { Chapter, QuizQuestion } from '../types';

export const chapters: Chapter[] = [
  {
    id: 'intro',
    number: 1,
    title: 'A ferrovia que venceu a Serra do Mar.',
    subtitle: 'Como a São Paulo Railway superou a Serra do Mar para integrar o interior paulista ao Porto de Santos.',
    image: '/assets/images/serra_mar_challenge_spr_1781707082900.jpg',
    imageCaption: 'Ilustração artística de época recriando a ousada engenharia na Serra do Mar: uma locomotiva a vapor com as marcas da SPR vencendo os aclives íngremes sob a densa névoa da floresta tropical.',
    readingTime: 6,
    content: [
      'Durante o Império de Dom Pedro II, o transporte de mercadorias entre o interior paulista e o litoral era lento e custoso. O café, motor da economia nacional no dezenove, dependia de tropas de mulas descendo caminhos íngremes e sinuosos na barreira da Serra do Mar, viagem constantemente interrompida por violentas tempestades tropicais que bloqueavam as trilhas.',
      'Com o avanço veloz dos cafezais rumo ao oeste da província, a infraestrutura tradicional de transporte tornou-se insustentável. Havia urgência em estabelecer uma conexão moderna e de alta capacidade até o Porto de Santos, mas a imponente muralha de granito e mata preservada continuava a impor severos obstáculos geográficos e técnicos à integração regional.',
      'Dentre as personalidades visionárias da época, Irineu Evangelista de Sousa, o emblemático Barão de Mauá, destacou-se pela defesa convicta da interiorização dos trilhos férreos. Ele liderou articulações diplomáticas importantes na Inglaterra e desenhou parcerias de grande vulto financeiro para impulsionar os primeiros projetos e concessões do Império.',
      'Nesse cenário, desenhou-se o traçado audacioso entre a produtiva Jundiaí e a costa santista, passando pelas matas virgens do planalto. O desafio de engenharia civil era monumental, visto que a região apresentava encostas escarpadas, altíssima umidade e solo sob risco constante de deslizamentos, exigindo técnicas ferroviárias que desafiavam os limites de época.',
      'Em 1856, o governo imperial outorgou a concessão para a primeira linha férrea paulista, unindo esforços de Mauá, do conselheiro Pimenta Bueno e do mestre da ferrovia Joseph Locke. Juntos, alinharam as garantias fiduciárias necessárias para atrair o capital britânico e consolidar, anos depois, a renomada corporação São Paulo Railway Company na City de Londres.',
      'Ao longo da década de 1860, as obras mobilizaram centenas de técnicos e trabalhadores submetidos a condições árduas em plena Serra do Mar. A transposição da barreira exigiu a genial implantação de um inovador dispositivo de planos inclinados funiculares com cabos de aço e máquinas fixas para operar a subida segura das cargas por mais de oitocentos metros.',
      'Inaugurado oficialmente em fevereiro de 1867 sob expressivos aplausos do comércio e do Império, o novo corredor redefiniria as relações espaciais e humanas do planalto. A São Paulo Railway reduziu de dias para poucas horas as viagens de passageiros e rompeu de vez o isolamento logístico paulista, abrindo as portas do cenário global para a produção nacional.',
      'Nos anos sequentes ao triunfo, a mítica ferrovia converteu-se em referência mundial de engenharia tropical e impulsionou outras linhas pelo interior cafeeiro do país. Unindo desenvolvimento econômico, imigração e urbanismo no cume da serra, a SPR moldou a grande industrialização nacional e assentou bases indeléveis para a posteridade de toda a região.'
    ]
  },
  {
    id: 'capital-ingles',
    number: 2,
    title: 'A engenharia por trás da serra.',
    subtitle: 'O planejamento técnico, a mobilização de capitais e os desafios de engenharia para transpor a barreira natural da serra.',
    image: '/assets/images/spr_engineering_blueprints_1781713020808.jpg',
    imageCaption: 'Ilustração técnica de época em sépia recriando os esboços de engenharia mecânica, plantas de maquinário a vapor e diagramas dos planos inclinados sob supervisão técnica de James Brunlees.',
    readingTime: 8,
    content: [
      'Em 1859, foi formalizada na capital inglesa a São Paulo Railway Company Limited, corporação encarregada da construção e subsequente exploração da inovadora linha férrea. O vultoso empreendimento associou investidores estrangeiros de prestígio a garantias substanciais de juros oferecidas formalmente pela administração governamental sob a autoridade direta de Dom Pedro II.',
      'Esta bem-sucedida captação de recursos no exterior visava conectar o pujante interior cafeeiro paulista com o escoamento global, visto o café despontar como o principal sustentáculo financeiro da economia imperial brasileira. O desenvolvimento de infraestrutura tornava-se essencial face às sérias limitações dos transportes de tração puramente animal.',
      'O trajeto de Jundiaí a Santos impunha, todavia, uma desafiadora e severa barreira natural: a escarpada e imensa cordilheira da Serra do Mar. Coberta por uma densa e úmida floresta tropical, com solo geologicamente instável e tempestades violentas recorrentes, a região exigia um nível de planejamento técnico inédito no continente.',
      'Para resolver tão complexo dilema estrutural, a prestigiosa companhia reuniu experientes engenheiros e técnicos britânicos para realizar minuciosas vistorias e levantamentos topográficos fundamentais. A meta das exaustivas expedições consistia em mapear cuidadosamente a declividade de cada garganta serrana antes de escolher o definitivo e ideal curso da estrada.',
      'A chefia tática de toda a coordenação esteve sob a responsabilidade direta de James Brunlees, engenheiro de grande prestígio internacional na Europa da Revolução Industrial. Suas detalhadas conclusões matemáticas sugeriram que os métodos de aderência de locomotivas a vapor tradicionais falhariam de modo incontestável diante de inclinações tão acentuadas.',
      'A solução encontrada consistiu na adoção do complexo sistema de planos inclinados funiculares, já testado com sucesso relativo em projetos de relevo acidentado na Grã-Bretanha. O método dividia a difícil descida em seções sequenciais amparadas por inovadoras máquinas termodinâmicas fixas estacionadas no topo de patamares construídos na montanha.',
      'Uma engenharia tão arrojada demandou a aquisição de equipamentos de altíssima precisão e a contratação de mão de obra altamente qualificada em solo brasileiro e internacional. O desnível vertical que superava a impressionante marca de oitocentos metros de altitude coroou o ousado projeto como uma das maiores façanhas técnicas de toda a engenharia global do século dezenove.',
      'Vencer tal declividade requereria ainda uma minuciosa coordenação entre as bases litorâneas e os escritórios centrais instalados tanto no planalto quanto na City de Londres. Com as garantias aprovadas, as primeiras frentes de trabalho iniciaram a abertura da densa floresta, inaugurando uma das etapas mais dramáticas e memoráveis dos transportes nacionais.'
    ]
  },
  {
    id: 'desafio-muralha',
    number: 3,
    title: 'Engenharia e trabalho na serra.',
    subtitle: 'O sistema que venceu a serra e os desafios da construção.',
    image: '/assets/images/funicular_engineering_spr_v2_1781707063737.jpg',
    imageCaption: 'Ilustração artística de época mostrando operários e engenheiros enfrentando a lama, relva e chuvas na Serra do Mar para instalar os grandiosos planos inclinados do Sistema Funicular, com a marca oficial da SPR estampada.',
    readingTime: 9,
    content: [
      'As céleres frentes de construção avançaram de forma persistente após 1860 sob o comando em campo do habilidoso engenheiro residente inglês Daniel Fox. Na encosta acidentada da serra paulista, centenas de homens uniram esforços obstinados para instalar as bases fundamentais do Sistema Funicular ao longo de quatro grandiosos planos inclinados estruturados e sucessivos.',
      'Este inteligente dispositivo mecânico era movimentado por potentes casas de força a vapor localizadas estrategicamente no ponto culminante de cada setor de subida. Por intermédio de robustos e esticados cabos de aço especiais, os vagões ferroviários eram puxados ou freados de forma coordenada graças ao inovador princípio físico de contrapeso mútuo.',
      'Nesse engenhoso sincronismo operacional de pesos, o trem carregado de grãos descendo ao litoral exercia papel fundamental ao tracionar o comboio que subia ao planalto com mantimentos diversos. O uso balanceado das cargas reduzia expressivamente o consumo das caldeiras e demonstrava a eficiência e vanguarda do projeto executado engenhosamente na serra.',
      'No entanto, as hostis condições ambientais da Mata Atlântica cobravam esforços descomunais das persistentes equipes de trabalho que atuavam dia e noite na encosta. Chuvas contínuas provocavam frequentes e perigosas avalanches de terra que soterravam caminhos abertos, destruíam pontilhões recém-construídos e causavam interrupções drásticas no andamento das obras físicas.',
      'A superação de tais dilemas exigia a participação laboriosa de trabalhadores dos mais distantes e diversos rincões habitados no Brasil e na Europa vitoriana. Mineradores experientes, operários braçais, engenheiros dedicados e pedreiros dedicavam-se conjuntamente a cortar pedras brutas nas escarpas, erguer viadutos monumentais e estabilizar solos sob chuvas e neblinas persistentes.',
      'Mais do que uma simples via de escoamento rápido de mercadorias paulistas, a implantação representava o triunfo absoluto da técnica mecânica moderna contra uma barreira outrora indomável. As inovações ali forjadas desafiavam a tudo o que já havia sido testado em solos frios europeus, exigindo adaptações constantes à ecologia tropical.',
      'Em dezesseis de fevereiro de 1867, a estrada completou sua longa trajetória de edificação e iniciou o tráfego regular de trens comerciais sob fortes aplausos imperiais. A majestosa e impecável infraestrutura reduziu drasticamente os fretes, estendeu os horizontes do planalto e coroou definitivamente a São Paulo Railway como o pilar logístico de maior eficiência nacional.',
      'A complexa manutenção preventiva das engrenagens ocorria sem descanso, pois os cabos de tração demandavam exaustivas vistorias ao longo de todo o percurso montanhoso. A operação eficiente e segura dos planos manteria sua importância intocada pelas décadas seguintes, consolidando o místico percurso ferroviário na memória viva do pujante desenvolvimento econômico do país.'
    ]
  },
  {
    id: 'paranapiacaba-fog',
    number: 4,
    title: 'Uma vila inglesa no topo da serra.',
    subtitle: 'A vida em Paranapiacaba e a chegada do futebol ao Brasil.',
    image: '/assets/images/paranapiacaba_clock_spr_1781707467393.jpg',
    imageCaption: 'Ilustração artística de época recriando a mítica neblina cobrindo a arquitetura vitoriana da estação ferroviária e o icônico relógio em Paranapiacaba.',
    readingTime: 6,
    content: [
      'No cume da encosta da Serra do Mar, onde a névoa perene envolve carinhosamente a paisagem da antiga Estação Alto da Serra, nasceu a bela vila de Paranapiacaba. O local assumiu imediata relevância estratégica dentro de toda a logística operacional da estrada, pois funcionava como o centro de transição dos trens do sistema funicular para o convencional.',
      'Face ao expressivo contingente de engenheiros, maquinistas e administradores vindos da Grã-Bretanha, o pequeno povoado paulista absorveu uma rica e única carga identitária. A arquitetura de pinho recortado e os marcantes hábitos cotidianos ditaram um rastro de elegância em meio ao clima úmido característico das serras tropicais brasileiras.',
      'Com foco no bom funcionamento da malha férrea, a corporação inglesa ergueu uma charmosa comunidade totalmente planejada para abrigar dignamente as famílias de funcionários e operários. O desenho das residências em madeira envernizada e o imponente relógio da estação mimetizavam com esmero o panorama das mais tradicionais vilas industriais inglesas.',
      'O imenso relógio centralizador, projetado nos moldes do icônico parlamento britânico, cumpria a nobre tarefa de sinalizar com extrema exatidão os turnos de trabalho e as saídas. A rotina operária vivia em total conformidade com a precisão dos ponteiros, transformando o Alto da Serra em uma referência singular de pontualidade no Império.',
      'A marcante influência dos imigrantes ingleses também semeou sementes fecundas que alteraram radicalmente a história social das futuras gerações de todo o país sul-americano. Nos gramados úmidos da vila ferroviária, registraram-se os pioneiros jogos amadores de futebol, trazidos à luz pelo lendário retorno de Charles Miller ao Brasil em 1894.',
      'O jovem desportista, cujo pai trabalhava ativamente no corpo principal de engenharia da São Paulo Railway, trouxe em sua bagagem regras e bolas oficiais de couro vitorianas. A empolgante prática logo se alastrou entre os dedicados funcionários, transformando Paranapiacaba no fértil e histórico berço diletante do futebol brasileiro organizado.',
      'Com a consolidação interna de sua próspera estrutura urbana, o povoado conquistou importantes melhorias em áreas como educação primária, atendimento médico e serviços de lazer comuns. Tais benefícios criaram um notável ambiente de coesão social para as famílias residentes sob a frequente cortina de névoa, elevando o padrão habitacional de época.',
      'Este inestimável e original acervo arquitetônico e mecânico encontra-se tombado pelas chancelas do patrimônio histórico e atrai visitantes de todas as origens até os dias atuais. Caminhar por suas ruas cobertas de pedras representa uma autêntica e emocionante viagem de volta ao apogeu do ferro, do carvão e da herança britânica cravada na serra.'
    ]
  },
  {
    id: 'legado-cafe',
    number: 5,
    title: 'A transformação de São Paulo.',
    subtitle: 'Como os lucros do café remodelaram o cenário urbano paulistano.',
    image: '/assets/images/estacao_da_luz_spr_1781708439536.jpg',
    imageCaption: 'Ilustração artística de época recriando a monumental Estação da Luz com sua icônica torre do relógio vitoriana e locomotivas a vapor ostentando a marca SPR.',
    readingTime: 8,
    content: [
      'Os formidáveis ganhos financeiros gerados pela São Paulo Railway receberam enorme e positivo impacto social logo nas primeiras etapas de vigência das transações de mercado. Como o elo fundamental de ligação entre os férteis cafezais paulistas e a costa santista, a estrada tornou-se o principal canal de tráfego de riquezas do território.',
      'Ao aproximar o dinâmico interior do polo aduaneiro internacional, a pioneira malha ferroviária gerou um imenso acúmulo de capitais que impulsionou o crescimento da capital. São Paulo abandonou rapidamente suas modestas feições coloniais do passado para assumir a prestigiosa condição de maior centro comercial e financeiro da nação soberana.',
      'A maciça injeção de lucros das exportações agrícolas financiou a pavimentação de ruas centrais, estimulou a rede de iluminação a gás e viabilizou bondes coletivos. A mítica cidade recebia diariamente uma formidável corrente de imigrantes de todas as pátrias do globo, ansiosos para trabalhar nos serviços urbanos emergentes.',
      'Este notável progresso demográfico e financeiro exigiu a edificação de novos e arejados bairros residenciais que expandiram com rapidez os antigos limites geográficos da capital paulista. Áreas antes cobertas por colinas e matas foram loteadas para abrigar indústrias nascentes e vivendas urbanas sob o ritmo frenético do comércio das ferrovias.',
      'O mais expressivo monumento desse fértil período de modernidade urbana foi a magnífica e suntuosa inauguração da Estação da Luz, no primeiro ano do século vinte. O grandioso projeto vitoriano foi inteiramente idealizado pelo arquiteto britânico Charles Driver e montado no centro da cidade com peças pré-fabricadas trazidas de navio.',
      'A imponente e altiva torre do relógio, inspirada nas grandes catedrais de ferro e vidro europeias, dominava soberana a dinâmica diária dos apressados passageiros e comerciantes paulistanos. A estação agia como a exuberante porta de entrada da riqueza do café paulista, despertando orgulho cívico e simbolizando a inserção nacional na modernidade.',
      'A extraordinária convergência sob o teto da Luz atraiu a fundação de bancos centrais, elegantes casas de exportação, seguradoras sólidas e sofisticados teatros públicos de prestígio. Ao fomentar a expansão cultural associada à universidade e à imprensa livre, os trilhos desenharam a pujante e moderna paulicéia industrial que emergiria do café.',
      'O controle vitoriano formal das concessões da ferrovia encerrou-se de modo pacífico no ano de 1946, após noventa anos de contínua e exemplar administração da SPR. Integrada ao patrimônio público sob o nome de Santos-Jundiaí, a lendária linha assentou as bases vitais e indeléveis sobre as quais se ergueria a maior metrópole da América do Sul.'
    ]
  },
  {
    id: 'escoamento-santos',
    number: 6,
    title: 'A ligação com o mercado mundial.',
    subtitle: 'O desenvolvimento do Porto de Santos e o comércio internacional.',
    image: '/assets/images/porto_de_santos_spr_vintage_1781709193710.jpg',
    imageCaption: 'Ilustração artística de época recriando a dinâmica do Porto de Santos no final do século XIX, com navios mercantes e trens da SPR operando em plena sintonia.',
    readingTime: 6,
    content: [
      'Se o interior do estado produzia café em escalas impressionantes de volume, o Porto de Santos funcionava como a ponte final rumo ao exigente mercado externo. Antes da inauguração dos trilhos, o translado até o cais dependia inteiramente de lentas caravanas de mulas que enfrentavam trilhas enlameadas e perigosas na encosta.',
      'A entrada em operação de toda a malha da São Paulo Railway transformou inteiramente aquela precária e tradicional dinâmica do comércio do açúcar e café imperiais. A rapidez e a fabulosa capacidade dos trens a vapor garantiram que as colheitas do planalto alcançassem os porões dos navios na exata correspondência dos contratos.',
      'Por dispor de prazos confiáveis e taxas de frete altamente competitivas, os exportadores paulistas ampliaram seu domínio de vendas nas principais capitais refinadas do mundo vitoriano. A eficiência gerada pela sinergia ferroviária contribuiu imensamente para que o PIB nacional atingisse patamares extremamente elevados e sadios ao final do século.',
      'O espetacular aumento no volume das exportações exigiu, igualmente, uma radical e profunda expansão em toda a orla portuária e suas antigas instalações de acostagem. Modernos cais de alvenaria e galpões de armazenamento gigantescos foram erguidos, sepultando o antigo e doentio porto de lama que limitava o avanço dos negócios comerciais.',
      'Estas robustas melhorias na infraestrutura marítima operaram uma formidável metamorfose também no urbanismo e na diversidade demográfica da próspera cidade litorânea de Santos. A foz tornou-se o destino de acolhimento de vigorosas correntes migratórias e estimulou um próspero intercâmbio de ideias, mercadorias raras e influências culturais com o exterior.',
      'As águas calmas da baía santista recebiam cotidianamente dezenas de imponentes vapores mercantes hasteando as mais variadas bandeiras das potências comerciais de diversas partes do mundo. O tráfego de cargas criava laços comerciais inquebráveis e contínuos entre as lavouras do planalto e os grandes centros produtivos da Europa e da América do Norte.',
      'Dessa união indissolúvel entre a ferrovia "Ingleza", o suor dos operários e as suntuosas embarcações estrangeiras, consolidou-se a época áurea do café no Brasil. O binômio trilho-porto deu sustentação econômica de longa duração à jovem República nascente e impulsionou as mais ousadas inovações tecnológicas e fabris de todo o território paulista.',
      'Nas dobras do tempo histórico, a herança destas pioneiras infraestruturas de ferro subsiste no orgulho dos municípios e na beleza das vilas e monumentos preservados pela posteridade brasileira. Os caminhos abertos pelo Barão de Mauá e Daniel Fox continuam a inspirar o reconhecimento de uma mítica e audaciosa jornada de progresso nacional.'
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Quem foi o pioneiro brasileiro responsável por obter a primeira concessão para a ferrovia ligando Jundiaí a Santos?',
    options: [
      'Duque de Caxias',
      'Irineu Evangelista de Sousa (Barão de Mauá)',
      'Dom Pedro II',
      'Charles Miller'
    ],
    correctIndex: 1,
    explanation: 'Irineu Evangelista de Sousa, o Barão e depois Visconde de Mauá, teve a visão e conquistou a concessão em 1855, iniciando as bases do projeto da ferrovia.'
  },
  {
    id: 2,
    question: 'Qual foi o revolucionário sistema mecânico utilizado para vencer o desnível de quase 800 metros da Serra do Mar?',
    options: [
      'Aderência puramente magnética',
      'Cremalheira simples',
      'Sistema Funicular (planos inclinados com cabos de aço e contrapesos)',
      'Locomotivas híbridas a diesel'
    ],
    correctIndex: 2,
    explanation: 'Devido à inclinação desafiadora de 10%, foi desenvolvido o Sistema Funicular, onde cabos de aço tracionados por caldeiras a vapor fixas ajudavam a puxar e frear os comboios.'
  },
  {
    id: 3,
    question: 'Como ficou conhecida a charmosa vila de estilo tipicamente vitoriano situada no topo da Serra do Mar?',
    options: [
      'Paranapiacaba (Estação Alto da Serra)',
      'Campos do Jordão',
      'Santo André',
      'São Vicente'
    ],
    correctIndex: 0,
    explanation: 'Paranapiacaba é a famosa vila ferroviária construída pela SPR que unia casas inglesas vitorianas com o Big Ben, mergulhados na neblina constante da floresta tropical.'
  },
  {
    id: 4,
    question: 'Importante elemento da cultura brasileira atual que foi introduzido via Paranapiacaba por intermédio dos britânicos:',
    options: [
      'A feijoada',
      'O futebol, trazido por Charles Miller',
      'A cerimônia do chá das cinco',
      'O carnaval de salão'
    ],
    correctIndex: 1,
    explanation: 'Charles Miller, filho de um engenheiro escocês da São Paulo Railway, viajou à Inglaterra e regressou em 1894 portando as regras e bolas de couro, inaugurando o esporte no país.'
  },
  {
    id: 5,
    question: 'Que famosa e suntuosa estação ferroviária no centro de São Paulo se tornou o maior símbolo monumental do apogeu do café e da engenharia vitoriana?',
    options: [
      'Estação Júlio Prestes',
      'Estação Roosevelt',
      'Estação da Luz',
      'Estação Brás'
    ],
    correctIndex: 2,
    explanation: 'A Estação da Luz, reinaugurada em 1901 com estruturas de ferro alemãs e design vitoriano britânico inteiramente projetados em Londres, representava a grande catedral paulista do café.'
  },
  {
    id: 6,
    question: 'Qual era a principal mercadoria vinda do interior do estado que motivou a construção da São Paulo Railway?',
    options: [
      'Cana-de-açúcar e etanol',
      'Ouro e diamantes',
      'O Café (conhecido como "ouro verde")',
      'Algodão e manufaturas'
    ],
    correctIndex: 2,
    explanation: 'O crescimento espetacular das lavouras de café no interior paulista exigia um sistema logístico moderno e de alta capacidade para transportar a colheita até o Porto de Santos.'
  },
  {
    id: 7,
    question: 'Por que a ferrovia São Paulo Railway ficou conhecida pelo apelido de "Ingleza" no jargão popular e de época?',
    options: [
      'Pelo fato de somente cidadãos ingleses terem permissão para viajar nela',
      'Pela total dominância de capital inglês, projetos de engenharia britânicos, materiais e administração do país europeu',
      'Porque o idioma oficial e placas de sinalização eram exclusivamente em inglês',
      'Pelo clima frio e neblina constante da região de São Paulo'
    ],
    correctIndex: 1,
    explanation: 'A ferrovia pertencia à empresa britânica "The San Paulo (Brazilian) Railway Company Limited", financiada por acionistas ingleses e projetada sob a rígida escola de engenharia vitoriana.'
  },
  {
    id: 8,
    question: 'Qual era a principal barreira geográfica que parecia intransponível e que a ferrovia precisou vencer?',
    options: [
      'O Rio Tietê com suas cheias constantes',
      'A escarpa íngreme e instável da Serra do Mar',
      'O vale profundo do Paraíba',
      'As montanhas de granito da Serra da Mantiqueira'
    ],
    correctIndex: 1,
    explanation: 'A descida abrupta da Serra do Mar, com quase 800 metros de desnível vertical coberto por densa mata atlântica úmbrea, representou o maior desafio técnico do projeto.'
  },
  {
    id: 9,
    question: 'Como eram alimentados e operavam os cabos de aço e caldeiras do sistema funicular da ferrovia na Serra do Mar?',
    options: [
      'Por energia elétrica gerada em usinas na represa Billings',
      'Por motores de popa acoplados nos eixos das rodas',
      'Por imensas caldeiras a vapor fixas instaladas em patamares ao longo da subida da serra',
      'Por tração animal de mulas de carga em carrosséis gigantes'
    ],
    correctIndex: 2,
    explanation: 'Grandes casas de máquinas a vapor fixas eram instaladas no topo de cada patamar ou plano inclinado para movimentar e sustentar as bobinas de cabos de aço que tracionavam as composições.'
  },
  {
    id: 10,
    question: 'Após expirado o prazo de concessão britânica de 90 anos, em 1946, o que ocorreu com a malha da ferrovia?',
    options: [
      'Foi abandonada e totalmente convertida em estradas de rodagem comuns',
      'Foi comprada por uma corporação ferroviária dos Estados Unidos',
      'Foi encampada pela União (governo federal do Brasil), mudando de nome para Estrada de Ferro Santos-Jundiaí',
      'Teve seus trilhos inteiramente arrancados e exportados para a Inglaterra'
    ],
    correctIndex: 2,
    explanation: 'Com o fim dos 90 anos de concessão da SPR em 1946, o patrimônio ferroviário reverteu ao governo federal brasileiro de forma pacífica, originando a Estrada de Ferro Santos-Jundiaí.'
  }
];
