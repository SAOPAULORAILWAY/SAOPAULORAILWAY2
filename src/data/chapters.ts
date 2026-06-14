import { Chapter, QuizQuestion } from '../types';

export const chapters: Chapter[] = [
  {
    id: 'intro',
    number: 1,
    title: 'O Sonho Imperial da Estrada de Ferro',
    subtitle: 'Irineu Evangelista de Sousa e o início da modernização nacional',
    image: '/assets/images/barao_de_maua_1781298320469.jpg',
    imageCaption: 'Irineu Evangelista de Sousa, o Barão de Mauá (1813 a 1889), pioneiro absoluto da industrialização e dos transportes ferroviários no Império do Brasil.',
    readingTime: 7,
    content: [
      'Durante o Império de Dom Pedro II, a vastidão do território brasileiro seguia um ritmo lento e colonial. Tropas de mulas subiam e desciam as encostas de pedras do Caminho do Mar, enquanto trabalhadores carregavam pesadas sacas nas costas. A Serra do Mar, uma imensa muralha de granito, representava o maior desafio de transporte do país, onde o café — o principal motor da economia nacional — demorava muito para chegar aos navios de Santos.',
      'Nesse cenário difícil, o empresário Irineu Evangelista de Sousa, futuro Barão de Mauá, apresentou um plano inovador. Inspirado pelo forte progresso industrial que conheceu em suas viagens de negócios a Londres, ele sabia que os trilhos ditavam o ritmo do desenvolvimento mundial. Mauá via as ferrovias não apenas como rotas de comércio, mas como o caminho para modernizar a economia de um país ainda muito preso ao passado agrícola.',
      'Em 1855, ao obter o direito de planejar a ferrovia que ligaria Jundiaí ao litoral paulista, ele enfrentou a desconfiança dos políticos e grandes proprietários da época. Muitos consideravam o projeto impossível ou inútil de ser realizado. Sem apoio financeiro no Brasil, o pioneiro gaúcho viajou para a Inglaterra em busca de investidores e recursos técnicos para vencer o abismo da serra.',
      'Apesar de não contar com a confiança imediata dos cafeicultores tradicionais, as negociações que ele realizou nos bancos britânicos renderam uma importante parceria de cooperação técnica e financeira. Seria o início de uma das maiores obras de engenharia do século XIX.',
      'Além de todas as dificuldades técnicas, o projeto de Mauá também sofria uma forte oposição política no Rio de Janeiro. Muitos parlamentares conservadores defendiam que investir em estradas de ferro era um luxo desnecessário para um país de vocação essencialmente agrária, preferindo a manutenção dos antigos caminhos terrestres. Apesar dessas críticas e da falta de incentivos estatais diretos, Irineu de Sousa perseverou, convencido de que o futuro do desenvolvimento nacional dependia diretamente da velocidade e da capacidade de transporte que só os trilhos de metal podiam oferecer.'
    ]
  },
  {
    id: 'capital-ingles',
    number: 2,
    title: 'A Parceria com Londres e o Desafio da Serra',
    subtitle: 'O engenheiro Daniel Fox e a busca por um caminho na Mata Atlântica',
    image: '/assets/images/luz_paranapiacaba_1781298346748.jpg',
    imageCaption: 'A influência vitoriana se consolidou na serra paulista através da arquitetura de requinte industrial, marcada por relógios icônicos e estações de tijolos vermelhos importados.',
    readingTime: 8,
    content: [
      'Em 1859, foi fundada em Londres a "São Paulo Railway Company Limited", empresa britânica criada para erguer e operar a estrada de ferro paulista. O projeto contava com garantias financeiras do governo imperial brasileiro e unia a riqueza dos produtores de café do país com o capital e as máquinas dos investidores ingleses.',
      'Mesmo com os recursos assegurados, a engenharia técnica enfrentava um verdadeiro desafio geográfico: como subir a cordilheira íngreme da serra paulista sob o clima úmido da densa floresta tropical. Para encontrar uma saída viável, a empresa enviou ao Brasil o engenheiro Daniel Fox, um jovem profissional reconhecido por sua perseverança e rigor técnico.',
      'Daniel Fox explorou a região da serra a pé, coletando medições geográficas detalhadas. Ao compreender que os modelos de trilhos comuns não funcionariam em subidas tão íngremes de quase 800 metros de altura, propôs uma solução inovadora: a divisão do trecho em rampas seguidas por meio de planos inclinados de tração. Essa ideia aliou a determinação pioneira de Irineu de Sousa (Barão de Mauá) com o método prático da engenharia vitoriana.',
      'Ao chegar a São Paulo, Daniel Fox encontrou uma topografia extremamente hostil e pouco mapeada. A densa vegetação da Mata Atlântica e as constantes neblinas dificultavam a visibilidade, exigindo semanas de exploração cansativa para encontrar qualquer passagem viável. O engenheiro britânico teve de desenhar dezenas de esboços e testar caminhos alternativos antes de se convencer de que a subida direta por meio de cabos de aço era o único meio tecnicamente seguro para garantir o tráfego contínuo de cargas pesadas.'
    ]
  },
  {
    id: 'desafio-muralha',
    number: 3,
    title: 'Trabalho Duro e Engenharia Extrema',
    subtitle: 'O funcionamento do sistema funicular e o desafio humano da obra',
    image: '/assets/images/funicular_cable_1781298331429.jpg',
    imageCaption: 'O revolucionário sistema funicular: imensas caldeiras e cabos de aço permitiam que composições pesadas vencessem o monstruoso desnível de 800 metros da serra.',
    readingTime: 10,
    content: [
      'As obras começaram efetivamente em 1860 sob a supervisão do experiente engenheiro-chefe James Brunlees. Os trabalhadores enfrentaram a tarefa monumental de moldar as encostas de pedra da Serra do Mar, criando quatro planos inclinados seguidos com uma inclinação média de 10%. Para puxar as composições carregadas de café por esse trecho íngreme, Brunlees planejou o engenhoso e prático Sistema Funicular original.',
      'O mecanismo funcionava impulsionado por grandes máquinas a vapor fixadas no topo de cada uma das rampas. Utilizando cabos de aço extremamente resistentes, as caldeiras puxavam os trens que subiam carregados com café e também ajudavam a frear os vagões que faziam a descida vazios. No entanto, o canteiro de obras enfrentava o rigor do clima local: as fortes chuvas de verão causavam deslizamentos de terra constantes que cobriam parte do percurso.',
      'A construção exigiu um imenso sacrifício físico, e muitos trabalhadores adoeceram no percurso. Operários brasileiros, imigrantes alemães e italianos, e engenheiros vindos de Londres dividiam o espaço nas montanhas lutando contra surtos de cólera e febres tropicais. Com esforço extraordinário de toda a equipe, a estrada de ferro foi aberta ao tráfego em fevereiro de 1867, coroando de sucesso o ousado projeto do Barão de Mauá.',
      'Toda a logística de manutenção do sistema funicular era monitorada com precisão absoluta pelas equipes britânicas. As imensas caldeiras a carvão exigiam um abastecimento constante de combustível, que era transportado serra acima pelos próprios vagões. Nos períodos de pico da colheita do café, o sistema funcionava ininterruptamente de sol a sol, exigindo revisões diárias nos cabos de aço para evitar acidentes fatais e garantir que a preciosa carga paulista descesse a montanha com segurança e sem interrupções.'
    ]
  },
  {
    id: 'paranapiacaba-fog',
    number: 4,
    title: 'Uma Vila Inglesa no Topo da Serra',
    subtitle: 'A vida em Paranapiacaba e a chegada do futebol ao Brasil',
    image: '/assets/images/luz_paranapiacaba_1781298346748.jpg',
    imageCaption: 'A histórica vila de Paranapiacaba desenvolveu-se no topo do sistema funicular, vivenciando o singular choque cultural entre operários brasileiros e o modo de vida vitoriano inglês.',
    readingTime: 8,
    content: [
      'No topo mais alto da serra, onde a neblina frequente costuma envolver toda a paisagem, a parada ferroviária de Irineu de Sousa deu origem ao povoado do Alto da Serra, conhecido hoje como Paranapiacaba. Sendo o ponto ideal de transição onde os trens deixavam os cabos funiculares para seguir nas locomotivas comuns, o local desenvolveu costumes e visual tipicamente britânicos.',
      'A empresa construiu na vila uma colônia residencial planejada com simpáticas moradias de madeira para operários e engenheiros, baseadas nas vilas operárias da Grã-Bretanha. No topo do morro, um belo relógio instalado na estação comandava os horários das partidas e chegadas dos trens com total pontualidade britânica.',
      'Foi nessa atmosfera cercada de névoa constante que nasceram algumas das tradições esportivas mais famosas do país. Charles Miller, de pai britânico funcionário ferroviário, viajou para realizar seus estudos em Londres e retornou em 1894 portando duas bolas de couro e o regulamento de um novo jogo pedestre. Assim, o futebol dava seus primeiros passos em terras paulistas por influência direta dos trabalhadores e engenheiros da ferrovia.',
      'Com o passar dos anos, Paranapiacaba deixou de ser apenas um acampamento técnico de operários para se transformar em uma comunidade vibrante e autossuficiente. A vila ganhou sua própria escola primária, um clube recreativo para as famílias e até mesmo um hospital equipado com materiais vindos diretamente de Londres. Essa organização social exemplar não só criava um forte sentimento de pertencimento entre os moradores, mas também servvia de referência urbana para as outras cidades que cresciam ao longo do ramal ferroviário.'
    ]
  },
  {
    id: 'legado-cafe',
    number: 5,
    title: 'A Transformação de São Paulo',
    subtitle: 'Como os lucros do café remodelaram o cenário urbano paulistano',
    image: '/assets/images/ebook_cover_realistic_clean_1781404957659.jpg',
    imageCaption: 'A São Paulo Railway impulsionou a transformação de São Paulo de vilarejo colonial para uma metrópole cosmopolita e capital industrial da América do Sul.',
    readingTime: 9,
    content: [
      'O sucesso financeiro da São Paulo Railway superou as previsões mais animadoras de seus organizadores em Londres. Como única via que ligava a imensa produção cafeeira do interior paulista com o escoamento no litoral, a ferrovia projetada por Irineu Evangelista de Sousa converteu-se na principal via econômica da região, alterando completamente a dinâmica urbana da cidade de São Paulo.',
      'A antiga vila colonial e isolada iniciou um crescimento acelerado com a pavimentação de avenidas largas, redes de iluminação pública a gás e a introdução de bondes de transporte urbano. Os lucros das vendas de café ajudaram a financiar o surgimento de indústrias e atraíram correntes migratórias de várias partes do mundo. Com isso, São Paulo deixou de ser uma cidade periférica para liderar a economia nacional.',
      'O principal marco monumental desse progresso foi a inauguração da nova Estação da Luz em 1901. Desenhada no exterior por engenheiros formados na arquitetura de ferro e vidro europeia, a enorme estrutura de ferro foi manufaturada em Glasgow, transportada em navios e montada como um grande quebra-cabeça tecnológico no coração da capital. Sua charmosa torre com relógio virou o principal portal de recebimento de passageiros rumo à modernização.',
      'O impacto financeiro foi tão avassalador que novos bancos, seguradoras e escritórios de negócios surgiram no centro paulistano quase da noite para o dia. A riqueza gerada pela ferrovia impulsionou também o setor cultural, financiando a construção do imponente Teatro Municipal e o surgimento de jornais diários que debatiam o futuro do país. São Paulo transformou-se no principal polo de atração profissional e intelectual, ditando as tendências econômicas brasileiras a partir de seus escritórios decorados com madeira nobre.'
    ]
  },
  {
    id: 'escoamento-santos',
    number: 6,
    title: 'A Ligação com o Mercado Mundial',
    subtitle: 'O desenvolvimento do Porto de Santos e o comércio internacional',
    image: '/assets/images/porto_de_santos_1781307571913.jpg',
    imageCaption: 'Ilustração histórica representando as docas do Porto de Santos no final do século XIX, recebendo os carregamentos de café transportados pela ferrovia da serra.',
    readingTime: 8,
    content: [
      'Se o interior paulista produzia o café em escala expressiva, o estuário de Santos garantia o escoamento comercial de toda a produção. Antes de a linha de trem transpor a encosta íngreme da serra paulista, o café viajava em lombos de mulas exaustas, numa jornada lenta por caminhos precários de terra batida que ficavam intransitáveis nos dias de chuva intensa.',
      'A ligação ferroviária mudou profundamente essa dinâmica mercantil. Com os trens descendo e subindo a serra diariamente, o frete da carga de café passou a durar poucas horas em vez de dias ou semanas. A perda de mercadorias no caminho reduziu-se bastante e a eficiência logística barateou o preço final, tornando o grão paulista altamente competitivo no exterior.',
      'Para atender à exportação ágil gerada pelos trens funiculares, a estrutura do Porto de Santos foi modernizada com cais de alvenaria definitiva e modernos guindastes para acelerar o processo de embarque nos cargueiros internacionais. Essa integração eficiente entre a ferrovia original de Irineu de Sousa (o Barão de Mauá) e um porto bem equipado consolidou o café brasileiro na liderança absoluta de vendas para as capitais da Europa e América do Norte.',
      'Essa impressionante infraestrutura portuária mudou também o perfil demográfico e social de Santos. O porto transformou-se em um imenso caldeirão multicultural, onde marinheiros, comerciantes e imigrantes de dezenas de nacionalidades se encontravam diariamente nas docas. O vai e vem constante de sacas de café alimentava uma engrenagem financeira global de altíssima velocidade, conectando de forma definitiva a produção do interior de São Paulo aos hábitos diários de consumo nas grandes cafeterias europeias.'
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
    explanation: 'A Estação da Luz, reinaugurada in 1901 com estruturas de ferro alemãs e design vitoriano britânico inteiramente projetados em Londres, representava a grande catedral paulista do café.'
  }
];
