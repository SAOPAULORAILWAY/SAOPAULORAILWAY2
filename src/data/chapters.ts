import { Chapter, QuizQuestion } from '../types';

export const chapters: Chapter[] = [
  {
    id: 'intro',
    number: 1,
    title: 'O Sonho Imperial do Barão',
    subtitle: 'Irineu Evangelista de Sousa e o Despertar da Infraestrutura Nacional',
    image: '/assets/images/barao_de_maua_1781298320469.jpg',
    imageCaption: 'Irineu Evangelista de Sousa, o Barão de Mauá (1813–1889), pioneiro absoluto da industrialização e dos transportes ferroviários no Império do Brasil.',
    readingTime: 6,
    content: [
      'Em meados do século XIX, o Brasil vivia sob as rédeas de uma economia essencialmente agrária, onde a força física de homens escravizados e o lombo de mulas sustentavam o transporte da maior riqueza nacional: o café. O "ouro verde", cultivado no fértil Vale do Paraíba e em expansão para o Oeste Paulista, enfrentava gargalos logísticos intransponíveis. Descendo os acidentados caminhos coloniais da Serra do Mar em direção ao Porto de Santos, sacas de café apodreciam sob chuvas torrenciais, gastando dias de viagens perigosas e consumindo fortunas em frete.',
      'Foi sob essa atmosfera de estagnação logística que emergiu a figura colossal de Irineu Evangelista de Sousa, mais tarde agraciado com o título de Barão e depois Visconde de Mauá. Dotado de uma visão empreendedora incomum no ambiente aristocrático do Império, Mauá compreendeu que o progresso definitivo do Brasil dependia das estradas de ferro.',
      'Em 1855, Irineu obteve a concessão do governo imperial para construir a primeira via férrea interligando o planalto paulista ao litoral. Seu objetivo original era estabelecer uma ligação direta entre as ricas lavouras cafeeiras de Jundiaí e os navios mercantes ancorados em Santos. Uma ferrovia que desbravasse a implacável barreira da Serra do Mar seria o coração econômico de um novo Brasil.',
      'Contudo, o tamanho da ambição de Mauá esbarrava nos limites do capital nacional. O Império, dominado pelo pensamento senhorial e latifundiário, via com desconfiança gastos vultosos em maquinários modernos. Sem apoio suficiente dos cafeicultores da época e com as finanças sob pressão, Mauá compreendeu que para transpor a muralha de rochas e floresta da serra paulista, precisaria buscar socorro na meca financeira do capitalismo mundial: Londres.'
    ]
  },
  {
    id: 'capital-ingles',
    number: 2,
    title: 'O Enigma da Serra e o Capital Inglês',
    subtitle: 'A Aliança Financeira de Mauá e a Chegada dos Engenheiros Britânicos',
    image: '/assets/images/luz_paranapiacaba_1781298346748.jpg',
    imageCaption: 'A influência vitoriana se consolidou na serra paulista através da arquitetura de requinte industrial, marcada por relógios icônicos e estações de tijolos vermelhos importados.',
    readingTime: 7,
    content: [
      'Em busca de sócios e financiamento, Mauá viajou à Inglaterra. Na época, os britânicos lideravam a Revolução Industrial e detinham o monopólio da tecnologia ferroviária global. Em 1859, foi fundada a "São Paulo Railway Company Ltd" (SPR) em Londres, atraindo importantes capitalistas ingleses seduzidos pelas promessas de lucros fabulosos do café brasileiro.',
      'A engenharia da época, contudo, observava o projeto com ceticismo absoluto. Transpor a Serra do Mar, uma parede escarpada de quase 800 metros de desnível vertical coberta por uma floresta tropical fechada, era considerado por muitos renomados engenheiros europeus como um "delírio inexequível". Vários profissionais britânicos recusaram a empreitada.',
      'Tudo mudou quando Robert Stephenson, filho do criador da locomotiva a vapor moderna George Stephenson, indicou uma mente brilhante para o projeto: o experiente engenheiro civil James Brunlees. Por sua vez, Brunlees despachou ao Brasil o jovem e audacioso Daniel Fox, cuja missão principal consistia em demarcar o traçado final da estrada e provar a viabilidade matemática da descida da serra.',
      'Fox explorou a densa floresta a pé e a cavalo, enfrentando cobras peçonhentas, enxames de insetos, febres e despenhadeiros em condições climáticas severas. O genial engenheiro contornou as abordagens clássicas de aderência pura e projetou um arranjo revolucionário baseado em planos inclinados. O pacto entre a obstinação brasileira e a soberania técnica britânica estava firmado, criando a lendária ferrovia "Fronteiras de Neblina".'
    ]
  },
  {
    id: 'desafio-muralha',
    number: 3,
    title: 'O Desafio da Muralha',
    subtitle: 'O Milagre do Sistema Funicular e o Sangue nas Montanhas',
    image: '/assets/images/funicular_cable_1781298331429.jpg',
    imageCaption: 'O revolucionário sistema funicular: imensas caldeiras e cabos de aço permitiam que composições pesadas vencessem o monstruoso desnível de 800 metros da serra.',
    readingTime: 9,
    content: [
      'A construção começou oficialmente em 1860, dividindo-se entre o trecho plano do litoral ao pé da serra (Cubatão), o avanço sobre o planalto de Santos a Jundiaí e, por fim, o monumental pesadelo técnico do trecho serrano. James Brunlees desenhou o chamado "Sistema Funicular da Serra do Mar", um sistema espetacular de engenharia de plano inclinado.',
      'O percurso da serra foi dividido em quatro seções consecutivas (sistema conhecido historicamente como a Serra Velha). Cada plano inclinado tinha uma inclinação dramática de 10%, sustentado por máquinas a vapor posicionadas no topo de cada patamar. Estas imensas máquinas fixas operavam cabos de aço gigantescos que, agindo como contrabalanceadores, puxavam os trens carregados de café montanha acima enquanto ajudavam a frear e descer as composições vazias.',
      'As dificuldades físicas beiravam a escala épica. O solo da Serra do Mar, uma mistura instável de argila úmida, rochas soltas e vertentes de água subterrâneas, causava deslizamentos de terra devastadores que sepultavam meses de trabalho em minutos. As chuvas tropicais constantes encharcavam os trabalhadores, apodreciam dormentes e enferrujavam estruturas.',
      'Para além da geografia hostil, a força de trabalho, composta por operários locais, imigrantes europeus e técnicos britânicos, foi dizimada por surtos violentos de cólera, varíola e febre amarela. Sem acesso a saneamento, homens morriam no meio das matas. O custo humano da São Paulo Railway foi alto, mas a obstinação venceu: em 16 de fevereiro de 1867, com quase um ano de antecedência sobre o prazo acordado, o primeiro trem oficial de passageiros correu pelos trilhos de aço sob aplausos e lágrimas.'
    ]
  },
  {
    id: 'paranapiacaba-fog',
    number: 4,
    title: 'Névoa sobre Paranapiacaba',
    subtitle: 'A Comunidade Britânica no Topo do Mundo e as Origens do Futebol',
    image: '/assets/images/luz_paranapiacaba_1781298346748.jpg',
    imageCaption: 'A histórica vila de Paranapiacaba desenvolveu-se no topo do sistema funicular, vivenciando o singular choque cultural entre operários brasileiros e o modo de vida vitoriano inglês.',
    readingTime: 7,
    content: [
      'No topo da vertiginosa Serra do Mar, no início do sistema funicular, nasceu Paranapiacaba (originalmente denominada Estação Alto da Serra). O local era geologicamente estratégico: ali as composições eram desengatadas e preparadas para a perigosa descida pelos cabos ou para a suave viagem pelas terras planas do planalto paulistano.',
      'Para abrigar os funcionários ingleses, engenheiros-chefes e operários, a São Paulo Railway edificou uma vila operária de padrão estritamente vitoriano. Casas de madeira com arquitetura rústica inglesa, jardins milimetricamente podados, arruamentos simétricos e um imponente relógio de torre, inspirado fielmente no Big Ben de Londres, transformaram a serra úmida em um recanto do Reino Unido.',
      'A atmosfera de Paranapiacaba era única: coberta na maior parte do ano por uma névoa densa e fria (o típico "fog" londrino), a vila operava como uma ilha cultural isolada. Os engenheiros traziam de navio pianos, porcelanas finas, tecidos elegantes e hábitos exóticos. Entre esses hábitos, estava um jogo intrigante com uma bola de couro inflada.',
      'Foi nessa ferrovia e neste porto serrano que cresceu Charles Miller, filho de um engenheiro escocês da SPR. Miller retornaria da Inglaterra em 1894 trazendo consigo as primeiras regras oficiais, chuteiras e bolas de futebol ao país. O esporte que se tornaria a maior paixão nacional brasileira começou de forma despretensiosa nos quintais gramados e campos improvisados ocupados pelos ferroviários britânicos na neblina de Paranapiacaba.'
    ]
  },
  {
    id: 'legado-cafe',
    number: 5,
    title: 'O Legado do Café para São Paulo',
    subtitle: 'A Consolidação de uma Metrópole e o Nascimento da Estação da Luz',
    image: '/assets/images/ebook_cover_1781298306266.jpg',
    imageCaption: 'A São Paulo Railway impulsionou a transformação de São Paulo de vilarejo colonial para uma metrópole cosmopolita e capital industrial da América do Sul.',
    readingTime: 8,
    content: [
      'A operação da São Paulo Railway superou as previsões mais otimistas de faturamento. Sendo a única rota ferroviária operável que conectava o imenso planalto produtor ao Porto de Santos, a ferrovia gozava de um faturamento gigantesco e garantias imperiais. Em poucas décadas, o volume de café transportado multiplicou-se exponencialmente.',
      'O fluxo ininterrupto de divisas gerado pela ferrovia mudou radicalmente o destino da província de São Paulo. A cidade, antes um modesto vilarejo jesuítico de taipa de pilão, viu a chegada vertiginosa de capitais estrangeiros, bancos internacionais, iluminação a gás e lines de bonde. A riqueza drenada pela SPR financiou a transição para a mão de obra assalariada imigrante (italiana, japonesa, espanhola) e abasteceu as primeiras indústrias da capital.',
      'O monumento máximo dessa opulência ferroviária ergueu-se no centro da cidade: a magnífica Estação da Luz. Inaugurada em sua forma monumental em 1901, a Luz era uma obra clássica vitoriana inteiramente concebida e fabricada na Inglaterra, pré-montada e trazida de navio para montagem final no Brasil. Com sua imponente torre de relógio dominando o horizonte paulistano, ela personificava a hegemonia inglesa.',
      'Ao final do prazo da concessão britânica na década de 1940, a ferrovia foi encampada pelo governo federal, sob a denominação de Estrada de Ferro Santos-Jundiaí. A ferrovia construída sob os planos audaciosos de Mauá e operada pelo rigor técnico inglês de James Brunlees e Daniel Fox pavimentou os trilhos do progresso. Graças à ousada transição ferroviária da serra, São Paulo converteu-se de província isolada no motor industrial da América Latina, um legado imortal gravado sobre as montanhas escarpadas do vale paulista.'
    ]
  },
  {
    id: 'escoamento-santos',
    number: 6,
    title: 'A Artéria de Ouro para o Porto de Santos',
    subtitle: 'O Escoamento do Café e a Conexão Definitiva Paulista com o Mercado Mundial',
    image: '/assets/images/porto_de_santos_1781307571913.jpg',
    imageCaption: 'Ilustração histórica representando as docas do Porto de Santos no final do século XIX, recebendo os carregamentos de café transportados pela ferrovia da serra.',
    readingTime: 6,
    content: [
      'Se o solo fértil do Oeste Paulista era o grande celeiro produtor do café, o Porto de Santos funcionava como o pulmão exportador do país. Antes da ousada obra da São Paulo Railway, o escoamento logístico rastejava de forma ineficiente sobre o lombo de mulas, atravessando trilhas lamacentas e íngremes sob as intempéries tropicais constantes.',
      'A chegada do caminho de ferro revolucionou a escala da produção e da exportação do grão. O café paulista, outrora limitado pelas distâncias físicas e pela lentidão das caravanas, agora descia de Jundiaí e do interior à velocidade do vapor diretamente para as águas atlânticas. O tempo de trâmite foi drasticamente reduzido de dias para escassas horas, e as perdas de carga por umidade ou roubos caíram a níveis insignificantes.',
      'O Porto de Santos, em resposta imediata à fartura sem precedentes despejada pelos comboios da SPR, expandiu sua infraestrutura de forma explosiva. Longos metros de cais de alvenaria substituíram os antigos trapiches de madeira deteriorados, enquanto guindastes a vapor modernos foram montados para agilizar o embarque nos navios mercantes internacionais.',
      'Esta formidável sinergia entre a Estrada de Ferro de Mauá e o complexo portuário de Santos consolidou o Brasil como o soberano inquestionável do fornecimento global de café, chegando a responder por mais de 70% da produção consumida mundialmente. A ferrovia uniu firmemente a terra paulista ao mercado mundial, alimentando as indústrias, os navios transatlânticos e erguendo de vez o império comercial do país.'
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
    question: 'Como ficou conhecida a charmosa vila de estilo tipicamente vitoriano situada no topo da serra paulista?',
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
  }
];
