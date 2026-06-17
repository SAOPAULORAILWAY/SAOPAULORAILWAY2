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
      'Durante o Império de Dom Pedro II, o transporte de mercadorias entre o interior paulista e o litoral era lento e caro. O café, principal produto da economia brasileira no século XIX, era transportado por tropas de mulas que percorriam caminhos íngremes e sinuosos na Serra do Mar. Em períodos de chuva, as condições das trilhas tornavam a viagem ainda mais difícil, provocando atrasos e aumentando os custos do transporte.',
      'Com a expansão das lavouras de café pelo interior paulista, cresceu a necessidade de melhorar o transporte entre as áreas produtoras e o Porto de Santos. O aumento da produção exigia uma solução mais eficiente para o escoamento da safra, mas a Serra do Mar continuava sendo um dos principais obstáculos à ligação entre o planalto e o litoral.',
      'Nesse contexto, avançaram os projetos para a construção de uma ferrovia ligando Jundiaí ao Porto de Santos. A proposta representava um dos maiores desafios de engenharia do período, já que a Serra do Mar apresentava encostas íngremes, elevada umidade e condições de terreno que dificultavam a implantação da linha férrea.',
      'Em 1856, o governo imperial autorizou a construção da ferrovia. Entre os nomes ligados ao empreendimento estavam Irineu Evangelista de Sousa, o Barão de Mauá, José Antônio Pimenta Bueno e o engenheiro britânico Joseph Locke. A participação desses personagens foi importante para viabilizar as articulações políticas e financeiras que permitiram a formação da São Paulo Railway Company nos anos seguintes.',
      'Ao longo da década de 1860, as obras mobilizaram engenheiros, técnicos e operários que enfrentaram as dificuldades impostas pela Serra do Mar. Para vencer o desnível entre o litoral e o planalto, foi adotado um sistema de planos inclinados movimentados por cabos de aço, solução que permitiu superar aproximadamente 800 metros de altitude.',
      'A ferrovia foi inaugurada em 16 de fevereiro de 1867. A nova ligação reduziu significativamente o tempo de transporte entre o interior paulista e o Porto de Santos, ampliando a capacidade de escoamento da produção agrícola e fortalecendo as atividades comerciais da província.',
      'Nas décadas seguintes, a São Paulo Railway desempenhou papel importante na expansão da economia cafeeira e no desenvolvimento de cidades ao longo de seu percurso. A ferrovia também serviu de referência para novos empreendimentos ferroviários, contribuindo para a integração econômica de diferentes regiões e para a modernização dos sistemas de transporte no Brasil.'
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
      'Em 1859, foi constituída em Londres a São Paulo Railway Company Limited, empresa responsável pela construção e operação da ferrovia entre Santos e Jundiaí. O empreendimento reuniu capitais britânicos e contou com a garantia de juros oferecida pelo governo imperial brasileiro, mecanismo utilizado na época para atrair investimentos destinados a obras de infraestrutura.',
      'O objetivo da nova companhia era criar uma ligação mais eficiente entre as regiões produtoras de café do interior paulista e o Porto de Santos, principal ponto de escoamento das exportações brasileiras. Com o crescimento da produção cafeeira, tornava-se cada vez mais necessário um sistema de transporte capaz de atender às demandas de uma economia em expansão.',
      'A principal dificuldade encontrava-se na travessia da Serra do Mar. Entre o litoral e o planalto paulista, a ferrovia precisaria vencer encostas íngremes, áreas de mata densa e um relevo que representava um dos maiores desafios da engenharia ferroviária no Brasil do século XIX.',
      'Para viabilizar a obra, a companhia mobilizou engenheiros britânicos especializados em ferrovias, responsáveis pelos levantamentos topográficos e pelos estudos necessários para definir o traçado da linha. As equipes percorreram diferentes trechos da serra, realizando medições e avaliações técnicas que permitiram identificar a solução mais adequada para a implantação da ferrovia.',
      'Entre os profissionais envolvidos nos estudos esteve o engenheiro Daniel Mackinson Fox, que participou dos levantamentos realizados na Serra do Mar. O comando técnico do projeto ficou sob responsabilidade do engenheiro-chefe James Brunlees, responsável por coordenar as soluções adotadas para a construção da linha.',
      'Os estudos demonstraram que a inclinação da serra era incompatível com a operação de locomotivas convencionais ao longo de todo o percurso. Diante dessa realidade, os engenheiros optaram pela adoção de um sistema de planos inclinados movimentados por cabos de aço e máquinas estacionárias a vapor, tecnologia já utilizada em outras ferrovias para superar grandes desníveis.',
      'A solução permitia transportar locomotivas e vagões por diferentes trechos da serra, vencendo um desnível aproximado de 800 metros entre o litoral e o planalto. Para isso, foram necessárias casas de máquinas, estruturas de apoio e equipamentos especialmente projétados para operar em uma região marcada pela elevada umidade e pelas condições desafiadoras do terreno.',
      'A definição desse sistema representou um passo decisivo para a construção da São Paulo Railway. Com os estudos concluídos e o modelo técnico estabelecido, a companhia pôde avançar para a execução das obras que transformariam a ligação entre o interior paulista e o Porto de Santos.',
      'O início da construção marcou uma nova etapa na história dos transportes brasileiros. Mais do que uma ferrovia, a São Paulo Railway tornou-se um empreendimento que ajudaria a integrar áreas produtoras, ampliar o comércio e fortalecer a importância econômica de São Paulo nas décadas seguintes.'
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
      'As obras da São Paulo Railway avançaram de forma decisiva a partir de 1860. Sob a coordenação dos engenheiros responsáveis pelo projeto, centenas de trabalhadores passaram a atuar em diferentes frentes de serviço ao longo da Serra do Mar, onde seriam implantados os planos inclinados que permitiriam a ligação ferroviária entre o litoral e o planalto paulista.',
      'A solução adotada para vencer a serra foi baseada em um sistema funicular composto por quatro planos inclinados sucessivos. Em cada trecho, máquinas estacionárias a vapor instaladas em pontos estratégicos movimentavam os trens por meio de cabos de aço, permitindo superar um desnível aproximado de 800 metros.',
      'O funcionamento do sistema baseava-se em um princípio de equilíbrio de cargas. As composições que desciam a serra auxiliavam o deslocamento os trens que subiam, reduzindo o esforço necessário das máquinas de tração e aumentando a eficiência da operação ferroviária.',
      'As condições de trabalho eram desafiadoras. O relevo acidentado, a elevada umidade e as chuvas frequentes dificultavam o avanço das obras e exigiam constantes adaptações por parte das equipes responsáveis pela construção da linha.',
      'A execução do projeto mobilizou trabalhadores de diferentes origens, incluindo brasileiros, imigrantes europeus e técnicos britânicos. Além da abertura de caminhos e da movimentação de materiais, as equipes participaram da construção de pontes, aterros, cortes em rocha e estruturas necessárias ao funcionamento da ferrovia.',
      'A implantação da linha exigiu soluções técnicas pouco comuns para os padrões brasileiros da época. Muitos dos métodos empregados precisaram ser adaptados às condições específicas da Serra do Mar, onde o clima e o terreno apresentavam características diferentes das encontradas em grande parte das ferrovias europeias.',
      'Após anos de trabalho, a ferrovia foi inaugurada em 16 de fevereiro de 1867. A nova ligação reduziu significativamente o tempo de transporte entre o interior paulista e o Porto de Santos, ampliando a capacidade de escoamento da produção agrícola e fortalecendo as atividades comerciais da província.',
      'A operação do sistema funicular exigia manutenção permanente. Cabos de aço, máquinas a vapor e demais equipamentos passavam por inspeções regulares para garantir a segurança e a continuidade do transporte ferroviário. Esse cuidado operacional foi fundamental para o funcionamento da São Paulo Railway durante décadas e para sua importância na história dos transportes brasileiros.'
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
      'No alto da Serra do Mar, em uma região frequentemente coberta pela neblina, a Estação Alto da Serra deu origem ao povoado que mais tarde ficaria conhecido como Paranapiacaba. O local desempenhava uma função estratégica na operação da São Paulo Railway, pois era ali que ocorria a transição entre o sistema funicular utilizado na serra e o trecho percorrido por locomotivas convencionais no planalto paulista.',
      'A presença de engenheiros, administradores e técnicos britânicos influenciou profundamente o desenvolvimento da localidade. Com o passar dos anos, a vila incorporou características arquitetônicas e costumes inspirados nas comunidades ferroviárias da Grã-Bretanha, formando uma paisagem bastante distinta das demais localidades da região.',
      'Para atender às necessidades da ferrovia, a companhia construiu uma vila planejada destinada aos trabalhadores e suas famílias. As residências, os edifícios administrativos e a organização das ruas seguiam modelos adotados em centros ferroviários britânicos do século XIX. Entre os principais símbolos da localidade estava o relógio instalado na estação, utilizado como referência para a rotina operacional e para o controle dos horários de chegada e partida dos trens.',
      'A influência britânica também esteve presente nas atividades esportivas. Embora as primeiras partidas organizadas de futebol em São Paulo estejam associadas à atuação de Charles Miller a partir de 1895, Paranapiacaba tornou-se um dos primeiros locais do país a registrar a prática regular do esporte entre funcionários e trabalhadores ligados à ferrovia.',
      'Filho de um funcionário da São Paulo Railway, Charles Miller retornou ao Brasil após seus estudos na Inglaterra trazendo conhecimentos sobre o futebol e os equipamentos utilizados na modalidade. A partir daquele período, o esporte passou a se difundir gradualmente entre trabalhadores, estudantes e clubes, tornando-se uma das manifestações esportivas mais populares do país.',
      'Com o crescimento da comunidade, Paranapiacaba passou a contar com escola, serviços médicos, espaços de convivência e estruturas voltadas ao atendimento dos moradores. Essas iniciativas contribuíram para a formação de uma comunidade estável e organizada, diretamente vinculada ao funcionamento da ferrovia.',
      'Mais do que um centro operacional da São Paulo Railway, Paranapiacaba tornou-se um dos mais importantes símbolos da presença britânica na história ferroviária brasileira. Grande parte de seu patrimônio arquitetônico e ferroviário permanece preservada, permitindo que a vila mantenha características que remetem ao período de maior atividade da ferrovia.',
      'Atualmente, Paranapiacaba é reconhecida por seu valor histórico e cultural, atraindo visitantes interessados em conhecer um dos conjuntos ferroviários mais representativos da história dos transportes no Brasil.'
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
      'Os resultados obtidos pela São Paulo Railway foram expressivos desde as primeiras décadas de operação. Como principal ligação entre as regiões produtoras de café do interior paulista e o Porto de Santos, a ferrovia desempenhou papel fundamental no escoamento da produção e contribuiu para importantes transformações econômicas e urbanas em São Paulo.',
      'Ao longo da segunda metade do século XIX e das primeiras décadas do século XX, a capital paulista passou por um período de crescimento acelerado. A expansão da economia cafeeira estimulou investimentos em infraestrutura, favoreceu a instalação de indústrias e atraiu imigrantes de diferentes partes do mundo.',
      'O aumento da circulação de mercadorias e capitais contribuiu para a modernização da cidade. Ruas foram pavimentadas, os serviços urbanos foram ampliados e novas formas de transporte passaram a integrar o cotidiano da população. Nesse contexto, São Paulo consolidou gradualmente sua posição como um dos principais centros econômicos do país.',
      'Um dos símbolos desse período foi a inauguração da nova Estação da Luz, em 1901. Projetada pelo arquiteto britânico Charles Driver e inspirada na arquitetura ferroviária vitoriana, a estrutura foi fabricada na Grã-Bretanha, transportada por navio para o Brasil e posteriormente montada na capital paulista.',
      'Sua torre do relógio tornou-se uma das referências visuais mais conhecidas da cidade. A estação passou a desempenhar papel central na circulação de passageiros e mercadorias, acompanhando o crescimento da malha ferroviária e da atividade econômica paulista.',
      'O dinamismo gerado pela economia do café favoreceu a expansão de bancos, companhias de seguros, escritórios comerciais e outros serviços voltados às atividades financeiras e empresariais. Ao mesmo tempo, o crescimento urbano estimulou o desenvolvimento de instituições culturais, da imprensa e de novos espaços públicos.',
      'Ao longo desse processo, São Paulo consolidou-se como um importante centro econômico, financeiro e cultural do Brasil. A ferrovia teve papel relevante nessa transformação ao facilitar a integração entre as áreas produtoras do interior e o principal porto exportador do país.',
      'O controle britânico sobre a São Paulo Railway chegou ao fim em 1946, quando se encerrou a concessão de 80 anos que permitia à companhia administrar a ferrovia. A linha passou então para o controle do governo federal brasileiro e posteriormente recebeu o nome de Estrada de Ferro Santos–Jundiaí (EFSJ), encerrando um longo período de administração britânica na principal ligação ferroviária entre o interior paulista e o litoral.'
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
      'Se o interior paulista produzia café em grande escala, o Porto de Santos era responsável por encaminhar essa produção aos mercados internacionais. Antes da construção da ferrovia, o transporte entre o planalto e o litoral era realizado principalmente por tropas de mulas que percorriam caminhos estreitos e sujeitos às condições climáticas da Serra do Mar. As viagens eram demoradas e frequentemente dificultadas pelas chuvas e pelas condições precárias das estradas.',
      'A chegada da São Paulo Railway transformou essa dinâmica. A ligação ferroviária reduziu significativamente o tempo de transporte entre as regiões produtoras e o porto, além de aumentar a capacidade de escoamento da safra. Com maior regularidade e eficiência logística, o café paulista passou a alcançar os mercados consumidores com mais rapidez e previsibilidade, fortalecendo sua competitividade no comércio internacional.',
      'O crescimento das exportações também impulsionou a modernização do Porto de Santos. Novos cais, armazéns e equipamentos de carga e descarga foram incorporados à estrutura portuária ao longo do tempo, ampliando sua capacidade operacional. A integração entre ferrovia e porto tornou-se um dos principais fatores para a expansão das exportações brasileiras de café durante o final do século XIX e as primeiras décadas do século XX.',
      'As transformações econômicas refletiram-se igualmente na cidade de Santos. O porto atraiu trabalhadores, comerciantes, empresarios e imigrantes de diversas origens, contribuindo para o crescimento da cidade e para a diversidade cultural da região.',
      'Diariamente, navios transportavam mercadorias e passageiros entre Santos e diferentes partes do mundo, reforçando os laços comerciais que ligavam a economia cafeeira paulista aos principais mercados consumidores internacionais.',
      'Ao consolidar a ligação entre as áreas produtoras do interior e os mercados externos, a ferrovia e o porto desempenharam papel fundamental na inserção do Brasil no comércio mundial do café. Essa integração contribuiu para o fortalecimento da economia paulista e ampliou a importância estratégica do Porto de Santos no cenário internacional.',
      'Mais de um século depois, a história da São Paulo Railway e do Porto de Santos continua presente na memória ferroviária brasileira. Os vestígios desse período ajudam a compreender como a combinação entre infraestrutura de transporte, atividade portuária e expansão econômica contribuiu para transformar São Paulo em um dos principais centros econômicos do país.'
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
