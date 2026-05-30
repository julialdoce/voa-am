// js/data/enem2025_mat.js — Questões de Matemática ENEM 2025 (Q136–Q180)
// ============================================================
//  TEMPLATE — Preencha cada questão conforme o modelo abaixo
// ============================================================
//
//  ESTRUTURA DE UMA QUESTÃO:
//  {
//    "num": 136,                         ← número da questão na prova (inteiro)
//    "enunciado": "Texto da questão...", ← texto completo do enunciado
//    "img": "assets/enem2025/q136.jpeg",
//                                        ← caminho da imagem (ou null se não houver)
//    "alt": {
//      "A": "Texto da alternativa A",
//      "B": "Texto da alternativa B",
//      "C": "Texto da alternativa C",
//      "D": "Texto da alternativa D",
//      "E": "Texto da alternativa E"
//    }
//  },
//
//  GABARITO: preencha o objeto "gabarito" com a letra correta de cada questão.
//  ASSUNTOS: preencha o objeto "assuntos" com o tópico de cada questão.
//
//  IMAGENS:
//    - Salve os arquivos em: public/assets/documents/ENEM/2025/questions/
//    - Nomeie como: q<num>.png  (ex: q136.png, q142.png)
//    - Se a questão não tiver imagem, use: "img": null
//    - Se a questão tiver mais de uma imagem, use a principal em "img"
//      e mencione as demais no enunciado ou crie q142.2.png, q142.3.png etc.
//
// ============================================================

const ENEM2025_MAT = {
  prova: 'ENEM 2025',
  area: 'Matemática e suas Tecnologias',
  caderno: 'Caderno Amarelo · 2º Dia',
  totalQuestoes: 45,
  tempoMinutos: 300,

  // ── GABARITO ────────────────────────────────────────────────
  // Preencha a letra correta para cada número de questão (136 a 180)
  gabarito: {
    "136": "C",  "137": "E",  "138": "C",  "139": "C",  "140": "A",
    "141": "D",  "142": "D",  "143": "B",  "144": "E",  "145": "B",
    "146": "C",  "147": "A",  "148": "C",  "149": "E",  "150": "C",
    "151": "B",  "152": "D",  "153": "D",  "154": "D",  "155": "B",
    "156": "A",  "157": "D",  "158": "E",  "159": "E",  "160": "A",
    "161": "B",  "162": "B",  "163": "E",  "164": "C",  "165": "C",
    "166": "D",  "167": "A",  "168": "B",  "169": "E",  "170": "A",
    "171": "D",  "172": "D",  "173": "E",  "174": "B",  "175": "E",
    "176": "A",  "177": "A",  "178": "A",  "179": "C",  "180": "C"
  },

  // ── ASSUNTOS ────────────────────────────────────────────────
  // Preencha o tópico/assunto de cada questão
  assuntos: {
    "136": "Geometria – Comprimento de Arco",
    "137": "Porcentagem e Proporcionalidade",
    "138": "Grandezas e Medidas – Problemas Práticos",
    "139": "Estatística – Mediana",
    "140": "Estatística – Tabela e Comparação",
    "141": "Geometria Espacial – Poliedros",
    "142": "Funções – Análise de Gráfico",
    "143": "Aritmética – Diferença de Decimais",
    "144": "Geometria Analítica – Projeção Ortogonal",
    "145": "Probabilidade",
    "146": "Grandezas Proporcionais – Consumo",
    "147": "Geometria Analítica – Mediatriz",
    "148": "Estatística – Gráfico de Barras",
    "149": "Porcentagem – Distribuição Percentual",
    "150": "Escalas",
    "151": "Geometria Espacial – Poliedros de Johnson",
    "152": "Grandezas Proporcionais – Produção",
    "153": "Combinatória – Contagem e Codificação",
    "154": "Probabilidade – Permutação",
    "155": "Estatística – Gráfico e Porcentagem",
    "156": "Trigonometria – Lei dos Cossenos",
    "157": "Estatística – Medidas de Posição",
    "158": "Aritmética – Média",
    "159": "Funções Trigonométricas – Tangente",
    "160": "Geometria – Orientação Espacial",
    "161": "Álgebra – Inequação e Custos",
    "162": "Combinatória – Arranjo com Restrição",
    "163": "Escalas – Ampliação",
    "164": "Álgebra – Proporcionalidade Direta",
    "165": "Álgebra – Equação do 1º Grau",
    "166": "Grandezas – Volume e Conversão",
    "167": "Estatística – Gráfico de Linhas",
    "168": "Geometria Espacial – Volume (Cilindro e Prisma)",
    "169": "Probabilidade – Dados",
    "170": "Análise Dimensional",
    "171": "Álgebra – Sequências (PA)",
    "172": "Funções – Gráfico e Aplicação",
    "173": "Aritmética – Comparação de Custos",
    "174": "Grandezas – Volume (Paralelepípedo)",
    "175": "Geometria Espacial – Embalagens",
    "176": "Funções Logarítmicas",
    "177": "Geometria Espacial – Área de Seção Transversal",
    "178": "Álgebra – Equação do 2º Grau",
    "179": "Combinatória – Contagem com Restrição",
    "180": "Grandezas – Velocidade Média"
  },

  // ── QUESTÕES ────────────────────────────────────────────────
  // Adicione as questões abaixo, uma a uma, seguindo o modelo.
  // Copie e cole o bloco do template para cada questão (136 a 180).
  questoes: [

    // ── QUESTÃO 136 ──
    {
      "num": 136,
      "enunciado": "No entorno de uma lagoa circular, cujo raio mede 1 km, há um uma ciclovia. Devido aosfrequentesroubos de bicicleta, a prefeitura planeja alocar policiais em posições estratégicas para patrulhar essa ciclovia, de forma a torná-la totalmente protegida. Um ponto da ciclovia é considerado protegido se houver pelo menos um policial a, no máximo, 200 m de distância daquele ponto, posicionado sobre a ciclovia. A figura ilustra um ponto P sobre a ciclovia, que estará protegido se houver pelo menos um policial posicionado sobre a região de cor cinza escuro.\nDesconsidere a largura da pista da ciclovia e utilize 3 como aproximação para pi.\nNessas condições, a quantidade mínima necessária de policiais a serem alocados ao longo dessa ciclovia para torná-la protegida é",
      "img": "assets/documents/ENEM/2025/questions/q136.png",
      "alt": {
        "A": "4",
        "B": "8",
        "C": "15",
        "D": "30",
        "E": "60"
      }
    },

    // ── QUESTÃO 137 ──
    {
      "num": 137,
      "enunciado": "Em um laboratório, um recipiente contém 10 litros de uma solução composta apenas pelas substâncias S1 e S2. Dessa solução, 99,95% é de S1. Uma quantidade de S1 será retirada dessa solução, mantendo a quantidade inicial de S2, de modo que 99,90% da nova solução seja de S1.\nQual é a quantidade de S1, em litro, que será retirada?",
      "img": null,
      "alt": {
        "A": "0,0050",
        "B": "0,0100",
        "C": "0,5000",
        "D": "4,9775",
        "E": "5,0000"
      }
    },

    // ── QUESTÃO 138 ──
    {
      "num": 138,
      "enunciado": "Uma distribuidora de combustível possui caminhões-tanque com capacidade de 30 000 litros cada. Em qualquer transporte realizado por esses caminhões, um mesmo volume de combustível é descartado, pois fica com muitas impurezas. Esse volume descartado independe da quantidade transportada.\nUm posto de combustível encomendou 10 000 litros de gasolina dessa distribuidora, que enviou 10 200 litros, considerando o volume descartado no transporte. Mesmo assim, a quantidade de gasolina entregue ao posto foi de 9 900 litros.\nEm um novo pedido, esse posto solicitou que fosse entregue exatamente o dobro do volume de gasolina encomendado no pedido anterior.\nUtilizando o mesmo caminhão da entrega anterior, qual é o volume mínimo de gasolina, em litro, que a distribuidora deverá enviar para garantir a entrega da quantidade encomendada nesse novo pedido?",
      "img": null,
      "alt": {
        "A": "20 100",
        "B": "20 200",
        "C": "20 300",
        "D": "20 400",
        "E": "20 600"
      }
    },

    // ── QUESTÃO 139 ──
    {
      "num": 139,
      "enunciado": "Uma empresa de tecnologia vai padronizar a velocidade de conexão de internet que oferece a seus clientes em dez cidades. A direção da empresa decide que seu novo padrão de velocidade de referência será a mediana dos valores das velocidades de referência de conexões nessas dez cidades. Esses valores, em megabyte por segundo (MB/s), são apresentados no quadro.\nA velocidade de referência, em megabyte por segundo, a ser adotada por essa empresa é",
      "img": null,
      "alt": {
        "A": "360",
        "B": "370",
        "C": "380",
        "D": "390",
        "E": "400"
      }
    },

    // ── QUESTÃO 140 ──
    {
      "num": 140,
      "enunciado": "Na cantina de uma escola, há cinco alimentos vendidos em pacotes com diferentes quantidades de porções.\nAs informações nutricionais contidas nos rótulos desses produtos estão indicadas nas imagens.\nUma estudante opta sempre pelo alimento com a menor quantidade total de sódio por pacote.\nQual desses produtos deve ser o escolhido pela estudante?",
      "img": null,
      "alt": {
        "A": "Batat chips",
        "B": "Palitos salgados",
        "C": "Biscoito multigrãos",
        "D": "Biscoito de polvilho",
        "E": "Biscoito de água e sal"
      }
    },

    // ── QUESTÃO 141 ──
    {
      "num": 141,
      "enunciado": "Uma fábrica utilizou uma impressora 3D para produzir o protótipo de uma peça. O protótipo tem forma de um poliedro convexo, obtido pela justaposição de dois sólidos distintos, um com a forma de um prisma hexagonal regular reto e o outro com a forma de um tronco de pirâmide hexagonal reta. A base maior do tronco de pirâmide coincide com uma das bases do prisma.\nApós a impressão do protótipo, ele foi encaminhado ao setor de customização para realização da pintura de sua superfície. O critério definido para realização da pintura considera que faces congruentes entre si devem ser pintadas com uma mesma cor, e faces não congruentes entre si devem apresentar cores distintas.\nQual é a quantidade de cores utilizadas para pintar o protótipo?",
      "img": null,
      "alt": {
        "A": "9",
        "B": "8",
        "C": "6",
        "D": "4",
        "E": "3"
      }
    },

    // ── QUESTÃO 142 ──
    {
      "num": 142,
      "enunciado": "Pesquisas na área de neurobiologia confirmam que a prática meditativa é responsável por diminuir consideravelmente a frequência respiratória para praticantes avançados, que, após iniciarem a meditação, têm suas frequências respiratórias reduzidas até se estabilizarem em um nível mais baixo. O gráfico apresenta a relação da frequência respiratória, em incursões de respirações por minuto (rpm), em relação ao tempo, em minuto, de um praticante avançado, em que (f1) representa a frequência no instante t1, no qual se inicia a prática meditativa; e (f2), a frequência no instante t2, a partir do qual esta se estabiliza durante a meditação.\nA partir do instante t1, em que se inicia a prática meditativa, o comportamento da frequência respiratória, em relação ao tempo,",
      "img": "assets/documents/ENEM/2025/questions/q142.png",
      "alt": {
        "A": "mantém-se constante",
        "B": "é diretamente proporcional ao tempo",
        "C": "é inversamente proporcional ao tempo",
        "D": "diminui até o instante t2, apartir do qual se torna constante",
        "E": "diminui de forma proporcional ao tempo, tanto entre t1 e t2 quanto após t2"
      }
    },

    // ── QUESTÃO 143 ──
    {
      "num": 143,
      "enunciado": "No atletismo, um grande desafio da prova de 100 metros rasos é a sua conclusão num tempo abaixo da marca de referência dos 10,00 segundos. Vários atletas já alcançaram esse feito. Em 2009, o jamaicano Usain Bolt estabeleceu o recorde mundial masculino dessa prova, com o tempo de 9,58 segundos.\nQual é a diferença, em segundo, entre a marca de referência e a marca estabelecida por Usain Bolt em 2009?",
      "img": null,
      "alt": {
        "A": "0,02",
        "B": "0,42",
        "C": "0,52",
        "D": "1,02",
        "E": "1,42"
      }
    },

    // ── QUESTÃO 144 ──
    {
      "num": 144,
      "enunciado": "Em um jogo de computador, um cubo se encontra inicialmente posicionado conforme indicado na figura.\nCada deslocamento efetuado por esse cubo se dá sempre em uma das direções definidas pelos três eixos coordenados. Ao se movimentar a partir da posição inicial, esse cubo se aproximou 3 unidades do plano yz, se afastou 5 unidades do plano xz e se aproximou 4 unidades do plano xy.\nA figura que apresenta as projeções ortogonais desse cubo sobre os três planos coordenados, após efetuar as movimentações descritas, é",
      "img": "assets/documents/ENEM/2025/questions/q144.png",
      "alt": {
        "A": "A",
        "B": "B",
        "C": "C",
        "D": "D",
        "E": "E"
      }
    },

    // ── QUESTÃO 145 ──
    {
      "num": 145,
      "enunciado": "A reportagem de uma revista abordou o uso de redes sociais pelos internautas brasileiros. Alguns dos dados apurados pela reportagem estão apresentados no infográfico.\nSegundo os dados do infográfico, ao se escolher aleatoriamente um internauta brasileiro no período ao qual se refere a reportagem, a probabilidade de ele ser um homem que acessa alguma rede social é",
      "img": "assets/documents/ENEM/2025/questions/q145.png",
      "alt": {
        "A": "30/90",
        "B": "36/100",
        "C": "40/100",
        "D": "40/90",
        "E": "45/90"
      }
    },

    // ── QUESTÃO 146 ──
    {
      "num": 146,
      "enunciado": "Uma pessoa pretende instalar um kit de gás natural veicular (GNV) em seu carro. Na loja que escolheu para realizar a compra e instalação desse kit, havia cinco modelos de cilindro para armazenamento do gás, cujas capacidades, em metro cúbico, eram, respectivamente: 10, 14, 17, 21 e 25. O preço do cilindro é proporcional à sua capacidade. Esse carro rodará 30 km diariamente, 7 dias por semana, e o consumo do GNV é de 1 m3 a cada 13 km rodados. A pessoa escolherá o modelo de cilindro de menor preço e que garanta apenas um abastecimento semanal.\nNessas condições, qual será a capacidade, em metro cúbico, do cilindro escolhido por essa pessoa?",
      "img": null,
      "alt": {
        "A": "10",
        "B": "14",
        "C": "17",
        "D": "21",
        "E": "25"
      }
    },

    // ── QUESTÃO 147 ──
    {
      "num": 147,
      "enunciado": "Em um jogo digital, há três personagens: um herói e dois vilões. A programação é feita de tal forma que o herói sempre será atacado pelo vilão que estiver mais próximo dele. Uma das maneiras de “confundir” os vilões é movimentar o herói por trajetórias que o mantenha equidistante dos vilões, gerando indefinição entre eles e, com isso, não sendo atacado.\nPara a programação de uma das etapas desse jogo, o programador considerou, no plano cartesiano, o quadrado STUV como a região de movimentação dos personagens, onde V e T representam as posições fixas dos vilões, e S, a posição inicial do herói, como apresentado na figura.\nQual é a equação da trajetória em que o herói poderá se movimentar sem ser atacado?",
      "img": "assets/documents/ENEM/2025/questions/q147.png",
      "alt": {
        "A": "y = −3x + 20",
        "B": "y = −3x + 16",
        "C": "y = −3x − 20",
        "D": "y = 3x + 16",
        "E": "y = 3x − 16"
      }
    },

    // ── QUESTÃO 148 ──
    {
      "num": 148,
      "enunciado": "Uma livraria comercializa livros dos seguintes gêneros literários: ficção científica, autoajuda, romance e biografia. O gráfico apresenta o estoque dos livros que essa livraria tem, por gênero literário e por nacionalidade do autor, bem como a demanda por gênero literário, obtida por meio de uma enquete feita com seus clientes habituais.\nO gerente da livraria fará a encomenda de novos exemplares somente do gênero cuja quantidade em estoque seja insuficiente para atender a demanda constatada pela enquete.\nO gênero de livro do qual o gerente deverá encomendar mais exemplares é",
      "img": "assets/documents/ENEM/2025/questions/q148.png",
      "alt": {
        "A": "ficção, pois é o que apresenta maior demanda.",
        "B": "biografia, pois é o gênero que tem a menor demanda",
        "C": "autoajuda, pois a quantidade em estoque é inferior à demanda.",
        "D": "biografia, pois é o gênero que tem a menor quantidade de livros em estoque",
        "E": "romance, pois é o que apresenta o menor estoque de livros de autores brasileiros"
      }
    },

    // ── QUESTÃO 149 ──
    {
      "num": 149,
      "enunciado": "Uma escola de idiomas oferece cursos de inglês, espanhol, francês e alemão. Os gráficos apresentam a distribuição percentual das matrículas, por idioma, em 2023, e a distribuição da quantidade de matrículas, por idioma, em 2024.\nPara planejar as atividades de 2025, o gerente da escola estimou que o total de matrículas será o mesmo de 2024, e a distribuição percentual das matrículas, por idioma, será igual à registrada em 2023.\nSegundo essa estimativa, o número de matrículas no curso de francês para o ano de 2025 será",
      "img": "assets/documents/ENEM/2025/questions/q149.png",
      "alt": {
        "A": "2",
        "B": "12",
        "C": "20",
        "D": "22",
        "E": "40"
      }
    },

    // ── QUESTÃO 150 ──
    {
      "num": 150,
      "enunciado": "O controle remoto de um carrinho de brinquedo vem equipado com uma tela que ajusta automaticamente a escala empregada na exibição de cada deslocamento. A tela apresenta a imagem do deslocamento, a escala utilizada na geração dessa imagem e o comprimento desse deslocamento, em centímetro, em conformidade com a escala empregada. As figuras representam a tela do controle remoto exibindo os dados de cinco deslocamentos realizados por esse carrinho.\nA opção que indica o deslocamento de maior comprimento realizado pelo carrinho de brinquedo é",
      "img": null,
      "alt": {
        "A": "I",
        "B": "II",
        "C": "III",
        "D": "IV",
        "E": "V"
      }
    },

    // ── QUESTÃO 151 ──
    {
      "num": 151,
      "enunciado": "A cúpula pentagonal giralongada é um poliedro de Johnson, cujas faces são polígonos regulares, mas que não é um poliedro de Platão, de Arquimedes, prisma ou antiprisma.\nAs figuras apresentam esse poliedro em duas posições e uma de suas planificações.\nQuantos vértices tem esse poliedro?",
      "img": "assets/documents/ENEM/2025/questions/q151.png",
      "alt": {
        "A": "21",
        "B": "25",
        "C": "55",
        "D": "80",
        "E": "110"
      }
    },

    // ── QUESTÃO 152 ──
    {
      "num": 152,
      "enunciado": "Uma fábrica de tijolos ecológicos com 3 funcionários, cada um trabalhando 6 horas diárias, produz 720 unidades por dia. Para atender ao crescimento da demanda por esse tipo de tijolo, essa fábrica passou a ter 5 funcionários, cada um trabalhando 9 horas por dia, aumentando, assim, sua capacidade de produção. Todos os funcionários produzem igual quantidade de tijolos a cada hora, independentemente de trabalharem 6 ou 9 horas diárias.\nO número de tijolos fabricados diariamente após o aumento da capacidade de produção é",
      "img": null,
      "alt": {
        "A": "800",
        "B": "1080",
        "C": "1200",
        "D": "1800",
        "E": "2520"
      }
    },

    // ── QUESTÃO 153 ──
    {
      "num": 153,
      "enunciado": "Para acompanhar o fluxo de visitantes em seu prédio, uma empresa estabeleceu um código de identificação para a visitação. De acordo com a regra estabelecida, cada visitante será identificado com um código sequencial numérico com 7 dígitos, determinado, da esquerda para a direita, da seguinte forma:\nUm visitante chegou à empresa às 10 horas da manhã para se reunir com o funcionário identificado pelo número 109, que trabalha no setor 08 da empresa, localizado no 2º andar.\nO código de identificação desse visitante é",
      "img": null,
      "alt": {
        "A": "0109082",
        "B": "0281090",
        "C": "1010982",
        "D": "2081090",
        "E": "2810910"
      }
    },

    // ── QUESTÃO 154 ──
    {
      "num": 154,
      "enunciado": "Quatro candidatos se apresentaram para realizar a prova de um concurso. Antes de iniciar a prova, os celulares dos quatro candidatos foram recolhidos pelo aplicador, que os guardou, cada um, dentro de um envelope preto. Ao término da prova, o aplicador devolveu os quatro envelopes com os celulares aos quatro candidatos, de maneira aleatória, já que não havia feito a identificação dos envelopes.\nA probabilidade de que todos os candidatos tenham recebido de volta os envelopes com os seus respectivos celulares é",
      "img": null,
      "alt": {
        "A": "1/2",
        "B": "1/10",
        "C": "1/16",
        "D": "1/24",
        "E": "1/256"
      }
    },

    // ── QUESTÃO 155 ──
    {
      "num": 155,
      "enunciado": "Em uma escola, todos os estudantes do ensino médio praticam uma das três modalidades esportivas oferecidas como atividade física, e cada um deles pratica somente uma dessas atividades. Os gráficos trazem alguns dados relativos aos quantitativos de estudantes que praticam essas modalidades esportivas nessa escola, apesar de algumas quantidades não terem sido informadas.\nQual é a quantidade de estudantes no ensino médio dessa escola?",
      "img": "assets/documents/ENEM/2025/questions/q155.png",
      "alt": {
        "A": "720",
        "B": "360",
        "C": "320",
        "D": "288",
        "E": "240"
      }
    },

    // ── QUESTÃO 156 ──
    {
      "num": 156,
      "enunciado": "O dono de uma embarcação deve partir do ponto P e chegar ao ponto R por meio de dois deslocamentos lineares e navegando a uma velocidade constante. Essa viagem será feita durante a noite, e como ele dispõe somente de uma bússola e de um relógio, planejou sua rota da seguinte forma:\n1º – partir do ponto P na direção 110 e navegar por 4 horas, alcançando um ponto Q;\n2º – partir do ponto Q na direção 90 e navegar por 2 horas, alcançando o ponto de destino R.\nNo entanto, ao direcionar o barco para o primeiro deslocamento, o fez na direção 340, em vez de 110. Com isso, realizou os seguintes deslocamentos:\n1º – partiu do ponto P na direção 340 e navegou por 4 horas, alcançando um ponto S;\n2º – partiu do ponto S na direção 90 e navegou por 2 horas, alcançando o ponto T.\nA figura apresenta a bússola, a rota planejada e a rota executada.\nO dono da embarcação só percebeu o equívoco ao chegar ao ponto T. Com isso, agora ele precisa definir a direção e o tempo de navegação que lhe permita, partindo do ponto T, chegar ao ponto de destino R por meio de uma rota retilínea.\nConsidere 0,64 como aproximação para cos 50°.\nA direção e o tempo aproximado de navegação que o dono da embarcação deve utilizar são, respectivamente,",
      "img": "assets/documents/ENEM/2025/questions/q156.png",
      "alt": {
        "A": "135 e 7 horas e 15 minutos",
        "B": "45 e 7 horas e 15 minutos",
        "C": "135 e 12 horas",
        "D": "135 e 6 horas",
        "E": "45 e 6 horas"
      }
    },

    // ── QUESTÃO 157 ──
    {
      "num": 157,
      "enunciado": "Em um estudo clínico, 55 mulheres foram distribuídas, aleatoriamente, em 5 grupos de 11 pessoas. Para testar uma nova medicação, será escolhido um grupo no qual a maioria das mulheres tenham idades entre 20 e 30 anos. Os demais grupos tomarão placebo ou medicações já existentes no mercado. O quadro, parcialmente preenchido, informa alguns dados relativos às idades das mulheres desses grupos.\nMesmo com o quadro incompleto, foi possível selecionar um desses grupos porque, apenas com os dados apresentados no quadro, foi identificado um grupo que, certamente, atendia ao critério de escolha.\nO grupo escolhido foi o",
      "img": null,
      "alt": {
        "A": "1",
        "B": "2",
        "C": "3",
        "D": "4",
        "E": "5"
      }
    },

    // ── QUESTÃO 158 ──
    {
      "num": 158,
      "enunciado": "Pace é um termo usado por um corredor para denominar o seu ritmo médio em uma corrida. Representa o tempo médio, em segundo, que esse corredor leva para percorrer 1 km.\nO esquema apresenta o tempo, em segundo, que um corredor levou para cruzar as marcas que definem os quatro primeiros trechos de 1 km, em uma corrida de 5 km, e o tempo gasto para percorrer cada trecho de 1 km.\nO melhor pace que esse corredor alcançou em corridas de 5 km foi 281 s/km.\nPara que consiga repetir nessa corrida seu melhor pace em corridas de 5 km, seu tempo, no 5º trecho, deve ser quantos segundos menor do que o que ele gastou para percorrer o 4º trecho?",
      "img": "assets/documents/ENEM/2025/questions/q158.png",
      "alt": {
        "A": "1",
        "B": "2",
        "C": "8",
        "D": "9",
        "E": "15"
      }
    },

    // ── QUESTÃO 159 ──
    {
      "num": 159,
      "enunciado": "Um recipiente tem um formato que faz com que, ao ser enchido de água com uma vazão constante, a distância D da lâmina de água ao tampo da mesa, em centímetro, aumente em relação ao tempo T, em minuto, de acordo com uma função do tipo\nD = k + tg[p(T + m)],\nsendo os parâmetros k, p e m números reais, para T variando entre 0 e 4 minutos, conforme ilustrado na figura, na qual estão apresentadas assíntotas verticais da função tangente utilizada na definição de D.\nA expressão algébrica que representa a relação entre D e T é",
      "img": "assets/documents/ENEM/2025/questions/q159.png",
      "alt": {
        "A": "D = 2,5 + tg[30(T - 5-2pi/2)]",
        "B": "D = 4 + tg[30(T + 5/2)]",
        "C": "D = 4 + tg[2,5(T + 5+2pi/2)]",
        "D": "D = 30 + tg[1/2(T - 5)]",
        "E": "D = 30 + tg[1/2(T - 5/2)]"
      }
    },

    // ── QUESTÃO 160 ──
    {
      "num": 160,
      "enunciado": "Os quadrados em cinza na figura representam os quarteirões de uma parte do bairro onde moram João e seu amigo. O quadrado pequeno (A), pintado em preto e localizado no canto superior esquerdo de um quadrado maior, indica a casa do amigo de João. João também mora em uma casa de esquina, mas na extremidade nordeste de um quarteirão. Para chegar à casa de seu amigo, ao sair de casa, João deve caminhar pelo quarteirão onde mora na direção oeste, dobrar à direita, caminhar por três quarteirões na direção norte e dobrar à esquerda. A casa de seu amigo fica no segundo quarteirão a oeste.\nO quarteirão onde se encontra a casa de João é representado pelo quadrado com a letra",
      "img": "assets/documents/ENEM/2025/questions/q160.png",
      "alt": {
        "A": "P",
        "B": "Q",
        "C": "R",
        "D": "S",
        "E": "T"
      }
    },

    // ── QUESTÃO 161 ──
    {
      "num": 161,
      "enunciado": "Uma empresa produziu, em um determinado mês, 110 toneladas de plástico a partir de derivados de petróleo e 80 toneladas a partir de plásticos reciclados. O custo para reciclar uma tonelada de plástico é de R$ 500,00, que equivale a 5% do custo para produzir a mesma quantidade de plástico a partir de derivados de petróleo. Para o mês seguinte, a meta dessa empresa é produzir a mesma quantidade de plástico que foi produzida nesse mês, mas com redução de, pelo menos, 50% no custo de produção.\nPara que no mês seguinte a empresa atinja a meta, a quantidade mínima de toneladas de plástico que devem ser produzidas a partir de reciclagem deverá ser",
      "img": null,
      "alt": {
        "A": "135",
        "B": "140",
        "C": "155",
        "D": "160",
        "E": "175"
      }
    },

    // ── QUESTÃO 162 ──
    {
      "num": 162,
      "enunciado": "Dez casais fundaram um grupo de dança e decidiram constituir uma diretoria com três cargos: presidente, secretário e tesoureiro. Para maior representatividade, decidiu-se que no máximo uma pessoa por casal poderá ocupar um cargo nessa diretoria.\nQuantas diretorias diferentes podem ser constituídas por esses 10 casais?",
      "img": null,
      "alt": {
        "A": "10 × 9 × 8",
        "B": "20 × 18 × 16",
        "C": "20 × 19 × 18",
        "D": "10 × 9 × 8 × 2",
        "E": "20 × 18 × 16 × 2"
      }
    },

    // ── QUESTÃO 163 ──
    {
      "num": 163,
      "enunciado": "Um artista, que costuma fazer desenhos com areia na praia, pediu a um banhista que fizesse um pequeno desenho, que serviria de esboço para uma grande obra de arte a ser feita na areia. Esse desenho está representado na figura.\nApós a conclusão, a obra de arte obtida manteve as mesmas proporções do desenho feito pelo banhista, sendo que as medidas indicadas na figura foram ampliadas para 30 m.\nEm qual escala esse desenho representa a obra de arte?",
      "img": "assets/documents/ENEM/2025/questions/q163.png",
      "alt": {
        "A": "1 : 1,5",
        "B": "1 : 2,25",
        "C": "1 : 10",
        "D": "1 : 100",
        "E": "1 : 150"
      }
    },

    // ── QUESTÃO 164 ──
    {
      "num": 164,
      "enunciado": "O cortisol é um hormônio produzido pelas glândulas adrenais e pode ser considerado um importante marcador do estresse fisiológico. Em um estudo desenvolvido com enfermeiros, foi verificado que a concentração de cortisol salivar em um dia de trabalho, denotada por T, era, em média, 1,59 vezes a concentração de cortisol salivar em um dia de folga, denotada por F.\nNesse estudo, a relação obtida entre T e F foi",
      "img": null,
      "alt": {
        "A": "T = 1,59 + F",
        "B": "F = 1,59 + T",
        "C": "T/F = 1 59",
        "D": "F/T = 1 59",
        "E": "F ⋅ T = 1,59"
      }
    },

    // ── QUESTÃO 165 ──
    {
      "num": 165,
      "enunciado": "Um estacionamento possui 120 vagas para veículos, e todas essas vagas estão ocupadas. Cada cliente paga uma mensalidade para utilizar uma vaga, que é calculada com base nas despesas mensais do estacionamento e no lucro pretendido. As despesas mensais do estacionamento são: R$ 14 240,00 com manutenção mais R$ 36,00 de seguro por veículo. O lucro do estacionamento é determinado pela diferença do valor arrecadado com as mensalidades pelas despesas efetuadas. A partir do mês seguinte, o valor do seguro por veículo aumentará em 20%, e as despesas com manutenção permanecerão sem alterações. Com isso, o dono do estacionamento reajustará as mensalidades para obter um lucro mensal de R$ 10 000,00. Apesar desse reajuste, todas as vagas continuarão ocupadas.\nO valor, em real, da mensalidade reajustada será",
      "img": null,
      "alt": {
        "A": "185,60",
        "B": "226,09",
        "C": "245,20",
        "D": "268,93",
        "E": "285,60"
      }
    },

    // ── QUESTÃO 166 ──
    {
      "num": 166,
      "enunciado": "O dono de uma sorveteria armazena sorvete em potes de 20 000 cm3 . Ele serve o sorvete em taças, em porções de 250 mL.\nA quantidade de taças que ele consegue servir a partir de um pote cheio de sorvete é",
      "img": null,
      "alt": {
        "A": "5",
        "B": "8",
        "C": "50",
        "D": "80",
        "E": "800"
      }
    },

    // ── QUESTÃO 167 ──
    {
      "num": 167,
      "enunciado": "A produtividade de soja em uma área cultivada é a média da quantidade de sacas de 50 quilogramas que são produzidas por hectare. O quadro apresenta a área cultivada e a produtividade de soja em certa propriedade, ao longo de cinco safras, com períodos de um ano, de 2011 a 2016.\nO gráfico de linhas que representa a produção de soja dessa propriedade, em tonelada, nessas cinco safras é",
      "img": "assets/documents/ENEM/2025/questions/q167.png",
      "alt": {
        "A": "A",
        "B": "B",
        "C": "C",
        "D": "D",
        "E": "E"
      }
    },

    // ── QUESTÃO 168 ──
    {
      "num": 168,
      "enunciado": "A figura ilustra o projeto visual para confecção de uma medalha comemorativa, com a forma de um cilindro circular reto, de diâmetro 6 cm e espessura 3 mm.\nA figura ABCD tem a forma de um quadrado e é a base de um prisma que atravessa toda a medalha. A região da medalha externa a esse prisma será cunhada em ouro. Pretende-se cunhar 100 dessas medalhas.\nConsidere 3,1 como valor aproximado para pi.\nQual é o volume de ouro, em centímetro cúbico, necessário para a confecção dessas medalhas?",
      "img": "assets/documents/ENEM/2025/questions/q168.png",
      "alt": {
        "A": "288",
        "B": "297",
        "C": "567",
        "D": "990",
        "E": "1 134"
      }
    },

    // ── QUESTÃO 169 ──
    {
      "num": 169,
      "enunciado": "Três dados cúbicos, com faces numeradas de 1 a 6, foram utilizados em um jogo. Artur escolheu dois dados, e João ficou com o terceiro. O jogo consiste em ambos lançarem seus dados, observarem os números nas faces voltadas para cima e compararem o maior número obtido por Artur com o número obtido por João. Vence o jogador que obtiver o maior número. Em caso de empate, a vitória é de João.\nO jogador que tem a maior probabilidade de vitória é",
      "img": null,
      "alt": {
        "A": "Artur, com probabilidade de 2/3",
        "B": "João, com probabilidade de 4/9",
        "C": "Artur, com probabilidade de 91/216",
        "D": "João, com probabilidade de 91/216",
        "E": "Artur, com probabilidade de 125/216"
      }
    },

    // ── QUESTÃO 170 ──
    {
      "num": 170,
      "enunciado": "A luminância de um objeto é a grandeza que descreve a quantidade de luz produzida ou refletida por sua superfície. Ela está definida como a razão entre a intensidade luminosa, medida em candela (cd), e o quadrado da distância do objeto até o foco de luz, medida em metro (m).\nA unidade de medida da luminância de um objeto é",
      "img": null,
      "alt": {
        "A": "cd/m2",
        "B": "m2/cd",
        "C": "cd/m",
        "D": "m/cd",
        "E": "m/cd2"
      }
    },

    // ── QUESTÃO 171 ──
    {
      "num": 171,
      "enunciado": "Quatro amigos, cada um com 100 moedas, criaram um jogo, no qual cada um assume uma das quatro posições, 1, 2, 3 ou 4, indicadas na figura, e nela permanece até o final.\nO desenvolvimento do jogo se dá em rodadas e, em todas elas, cada jogador transfere e recebe uma quantidade de moedas, da seguinte maneira:\n• o jogador na posição 1 transfere 1 moeda para o jogador na posição 2;\n• o jogador na posição 2 transfere 2 moedas para o jogador na posição 3;\n• o jogador na posição 3 transfere 3 moedas para o jogador na posição 4;\n• o jogador na posição 4 transfere 4 moedas para o jogador na posição 1, completando a rodada.\nAo final da rodada n, qual é a expressão algébrica que representa o número de moedas do jogador na posição 1?",
      "img": "assets/documents/ENEM/2025/questions/q171.png",
      "alt": {
        "A": "103 + 4n",
        "B": "103 + 3n",
        "C": "100 + 4n",
        "D": "100 + 3n",
        "E": "99 + 4n"
      }
    },

    // ── QUESTÃO 172 ──
    {
      "num": 172,
      "enunciado": "Uma pessoa tem um carro bicombustível, que funciona a gás natural veicular (GNV) e a gasolina. O rendimento do carro, medido em km/m³, no caso do gás, ou medido em km/L, no caso da gasolina, depende, entre outros fatores, da velocidade, em km/h, em que o carro trafega. Essa relação está em conformidade com estes gráficos.\nDurante um feriado, essa pessoa realizou uma viagem de 240 km. Para obter uma estimativa de gasto de combustível, assuma que em todo o trajeto se manteve uma velocidade constante de 60 km/h. Considere que, durante metade do caminho, foi utilizado apenas GNV e, na outra metade, apenas gasolina. O que foi pago pelo metro cúbico de GNV e pelo litro de gasolina correspondeu, respectivamente, a R$ 2,00 e a R$ 3,00.\nQual foi a diferença, em real, entre os gastos totais com gasolina e com GNV?",
      "img": "assets/documents/ENEM/2025/questions/q172.png",
      "alt": {
        "A": "4",
        "B": "8",
        "C": "14",
        "D": "21",
        "E": "30"
      }
    },

    // ── QUESTÃO 173 ──
    {
      "num": 173,
      "enunciado": "Em um país, a primeira etapa para obtenção da carteira de motorista é a contratação de três produtos:\n• pacote com 20 aulas teóricas;\n•pacote com 10 aulas práticas;\n• aluguel do veículo para realização das aulas práticas.\nUma pessoa que pretende obter a carteira de motorista pesquisou o valor do aluguel do veículo e os valores de cada aula teórica e de cada aula prática em três autoescolas. O quadro apresenta esses valores.\nEla contratará os três produtos numa mesma autoescola de modo que o custo total nessa primeira etapa seja o menor possível.\nA autoescola que será contratada é a",
      "img": null,
      "alt": {
        "A": "I, com o custo total de R$ 1 400,00",
        "B": "II, com o custo total de R$ 280,00",
        "C": "II, com o custo total de R$ 1 300,00",
        "D": "III, com o custo total de R$ 460,00",
        "E": "III, com o custo total de R$ 1 200,00"
      }
    },

    // ── QUESTÃO 174 ──
    {
      "num": 174,
      "enunciado": "Uma caixa de descarga, acoplada a um vaso sanitário, tem a forma de paralelepípedo reto retângulo cujas dimensões internas da base são 2,5 dm e 1,5 dm. Nessa caixa há uma boia que interrompe o abastecimento quando a altura da coluna de água atinge 2 dm, conforme a figura.\nA cada acionamento da descarga, todo o volume de água contida na caixa é despejado no vaso. Para reduzir o volume de água despejado a cada acionamento, uma pessoa colocará, no interior dessa caixa, garrafas de 300 mL, cheias de areia e tampadas, de modo a ficarem submersas quando o abastecimento for interrompido.\nPara garantir o funcionamento eficiente, o mínimo de água despejada a cada acionamento deve ser de 5 L.\nA quantidade máxima de garrafas que serão colocadas nessa caixa, garantindo um funcionamento eficiente, é igual a",
      "img": "assets/documents/ENEM/2025/questions/q174.png",
      "alt": {
        "A": "10",
        "B": "8",
        "C": "4",
        "D": "3",
        "E": "2"
      }
    },

    // ── QUESTÃO 175 ──
    {
      "num": 175,
      "enunciado": "Um confeiteiro passou a produzir tortas em formato de cilindro circular reto, com raio da base variando entre 12 cm e 16 cm e altura de 6 cm. Essas tortas deverão ser embaladas em caixas com formato de prisma reto de base quadrada, de modo que seja possível acomodar a torta em seu interior e ainda restar pelo menos 1 cm de distância entre a torta e as superfícies internas da caixa, lateral e superior. Ele dispõe, originalmente, de caixas no formato pretendido, cujas dimensões internas são 14 cm de comprimento do lado da base e 7 cm de altura, que não atendem às suas necessidades. Portanto, ele comprará novas caixas, com o mesmo formato das caixas originais, mas com comprimento do lado da base maior, que sejam adequadas para embalar todos os tipos de torta que produz.\nA aresta da base das novas caixas deve ser, no mínimo, quantos centímetros maior do que a das caixas originais?",
      "img": null,
      "alt": {
        "A": "4",
        "B": "12",
        "C": "16",
        "D": "18",
        "E": "20"
      }
    },

    // ── QUESTÃO 176 ──
    {
      "num": 176,
      "enunciado": "Um empresário utiliza máquinas cuja pressão interna P, em atmosfera, depende do tempo contínuo de utilização t, em hora, e de um parâmetro positivo K, que define o modelo da máquina, segundo a expressão:\nP = 4 ⋅ log[−K ⋅ (t + 1) ⋅ (t − 19)]\nO fabricante dessas máquinas recomenda ao usuário que a pressão interna desse tipo de máquina não ultrapasse 10 atmosferas durante seu funcionamento.\nO empresário pretende comprar novas máquinas desse tipo que deverão funcionar, diariamente, por um período contínuo de 10 horas. Para isso, precisa definir o modelo de máquina a ser adquirida escolhendo o maior valor possível do parâmetro K, atendendo à recomendação do fabricante.\nO maior valor a ser escolhido para K é",
      "img": null,
      "alt": {
        "A": "10^0,5",
        "B": "10^8",
        "C": "10^2,5/84",
        "D": "10^2,5/99",
        "E": "25x10^-2"
      }
    },

    // ── QUESTÃO 177 ──
    {
      "num": 177,
      "enunciado": "Em uma cidade, será construído um túnel que atravessa uma montanha para facilitar o trânsito de automóveis e bicicletas. Dois projetos foram elaborados e os esquemas com as vistas frontais desses projetos são apresentados na figura.\nO Projeto 1 conta com dois túneis, um exclusivo para bicicletas e o outro, para automóveis. O Projeto 2 conta com um único túnel, com espaços reservados para o trânsito exclusivo de bicicletas e automóveis. Nos dois projetos, os túneis têm o formato de semicilindro reto de mesma extensão, com vias de ida e volta para os dois tipos de veículos, separados por muretas.\nO projeto a ser aprovado será aquele que apresentar a menor área da seção transversal, pois implicará menor volume de material retirado da montanha.\nConsidere 3 como aproximação para p e desconsidere as espessuras das muretas.\nO projeto a ser aprovado é",
      "img": "assets/documents/ENEM/2025/questions/q177.png",
      "alt": {
        "A": "o 1, pois apresenta área de seção transversal medindo 67,5 m2",
        "B": "o 2, pois apresenta área de seção transversal medindo 121,5 m2",
        "C": "o 1, pois apresenta área de seção transversal medindo 135 m2",
        "D": "o 2, pois apresenta área de seção transversal medindo 243 m2",
        "E": "qualquer um dos dois, pois apresentam áreas de suas seções transversais com medidas iguais"
      }
    },

    // ── QUESTÃO 178 ──
    {
      "num": 178,
      "enunciado": "Um carro que custa 60 mil reais é comercializado por uma revendedora que oferece duas opções de pagamento, todas sem entrada e sem juros:\n• opção 1: pagamento em n parcelas iguais;\n• opção 2: pagamento em 6 parcelas a mais do que na opção 1 e, com isso, o valor de cada parcela se torna R$ 500,00 menor do que o valor da parcela na opção 1.\nNas duas opções de pagamento, o valor total a ser pago pelo carro é o mesmo.\nQual é a quantidade n de parcelas contidas na opção 1 de pagamento?",
      "img": null,
      "alt": {
        "A": "18",
        "B": "24",
        "C": "30",
        "D": "42",
        "E": "48"
      }
    },

    // ── QUESTÃO 179 ──
    {
      "num": 179,
      "enunciado": "Um pai comprou oito presentes diferentes (dentre os quais, uma bicicleta e um celular) para dar a seus três filhos. Ele pretende distribuir os presentes de modo que o filho mais velho e o mais novo recebam três presentes cada um, e o do meio receba os dois presentes restantes. O mais velho ganhará, entre seus presentes, ou uma bicicleta ou um celular, mas não ambos.\nDe quantas maneiras distintas a distribuição dos presentes pode ser feita?",
      "img": null,
      "alt": {
        "A": "36",
        "B": "53",
        "C": "300",
        "D": "360",
        "E": "560"
      }
    },

    // ── QUESTÃO 180 ──
    {
      "num": 180,
      "enunciado": "A final de um campeonato de futebol foi disputada em 2tempos regulamentares, de 45 minutos cada, sem acréscimos, com uma prorrogação de 30minutos, também sem acréscimos. Um jogador entrou no início do segundo tempo, com um equipamento para medir a distância percorrida durante sua participação no jogo. Ao final do segundo tempo regulamentar, esse jogador havia percorrido 4,5km. Ele manteve na prorrogação a mesma velocidade média que havia mantido no segundo tempo regulamentar.\nA distância percorrida por esse jogador durante sua participação na partida, em quilômetro, foi",
      "img": null,
      "alt": {
        "A": "4,5",
        "B": "6,0",
        "C": "7,5",
        "D": "9,0",
        "E": "12,0"
      }
    }

  ] // fim de questoes
};
