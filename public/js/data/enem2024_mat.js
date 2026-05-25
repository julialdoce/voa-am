// js/data/enem2024_mat.js — Questões de Matemática ENEM 2024 (Q136–Q180)
// ============================================================
//  TEMPLATE — Preencha cada questão conforme o modelo abaixo
// ============================================================
//
//  ESTRUTURA DE UMA QUESTÃO:
//  {
//    "num": 136,                         ← número da questão na prova (inteiro)
//    "enunciado": "Texto da questão...", ← texto completo do enunciado
//    "img": "assets/documents/ENEM/2024/questions/q136.png",
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
//    - Salve os arquivos em: public/assets/documents/ENEM/2024/questions/
//    - Nomeie como: q<num>.png  (ex: q136.png, q142.png)
//    - Se a questão não tiver imagem, use: "img": null
//    - Se a questão tiver mais de uma imagem, use a principal em "img"
//      e mencione as demais no enunciado ou crie q142.2.png, q142.3.png etc.
//
// ============================================================

const ENEM2024_MAT = {
  prova: 'ENEM 2024',
  area: 'Matemática e suas Tecnologias',
  caderno: 'Caderno Amarelo · 2º Dia',
  totalQuestoes: 45,
  tempoMinutos: 300,

  // ── GABARITO ────────────────────────────────────────────────
  // Preencha a letra correta para cada número de questão (136 a 180)
  gabarito: {
    "136": "C",  "137": "E",  "138": "C",  "139": "E",  "140": "B",
    "141": "E",  "142": "D",  "143": "A",  "144": "D",  "145": "C",
    "146": "A",  "147": "A",  "148": "D",  "149": "E",  "150": "C",
    "151": "D",  "152": "B",  "153": "B",  "154": "C",  "155": "E",
    "156": "B",  "157": "D",  "158": "C",  "159": "C",  "160": "C",
    "161": "A",  "162": "C",  "163": "A",  "164": "B",  "165": "B",
    "166": "A",  "167": "B",  "168": "B",  "169": "A",  "170": "D",
    "171": "D",  "172": "D",  "173": "C",  "174": "E",  "175": "A",
    "176": "D",  "177": "B",  "178": "B",  "179": "C",  "180": "E"
  },

  // ── ASSUNTOS ────────────────────────────────────────────────
  // Preencha o tópico/assunto de cada questão
  assuntos: {
    "136": "",  "137": "",  "138": "",  "139": "",  "140": "",
    "141": "",  "142": "",  "143": "",  "144": "",  "145": "",
    "146": "",  "147": "",  "148": "",  "149": "",  "150": "",
    "151": "",  "152": "",  "153": "",  "154": "",  "155": "",
    "156": "",  "157": "",  "158": "",  "159": "",  "160": "",
    "161": "",  "162": "",  "163": "",  "164": "",  "165": "",
    "166": "",  "167": "",  "168": "",  "169": "",  "170": "",
    "171": "",  "172": "",  "173": "",  "174": "",  "175": "",
    "176": "",  "177": "",  "178": "",  "179": "",  "180": ""
  },

  // ── QUESTÕES ────────────────────────────────────────────────
  // Adicione as questões abaixo, uma a uma, seguindo o modelo.
  // Copie e cole o bloco do template para cada questão (136 a 180).
  questoes: [

    // ── QUESTÃO 136 ──
    {
      "num": 136,
      "enunciado": "Uma empresa produz mochilas escolares sob encomenda. Essa empresa tem um custo total de produção, composto por um custo fixo, que não depende do número de mochilas, mais um custo variável, que é proporcional ao número de mochilas produzidas. O custo total cresce de forma linear, e a tabela apresenta esse custo para três quantidades de mochilas produzidas.\nO custo total, em real, para a produção de 80 mochilas será",
      "img": "assets/documents/ENEM/2024/questions/q136.png",
      "alt": {
        "A": "2400,00",
        "B": "2520,00",
        "C": "2550,00",
        "D": "2700,00",
        "E": "2800,00"
      }
    },

    // ── QUESTÃO 137 ──
    {
      "num": 137,
      "enunciado": "A umidade relativa do ar é um dos indicadores utilizados na meteorologia para fazer previsões sobre o clima. O quadro apresenta as médias mensais, em porcentagem, da umidade relativa do ar em um período de seis meses consecutivos em uma cidade.\nNessa cidade, a mediana desses dados, em porcentagem, da umidade relativa do ar no período considerado foi",
      "img": "assets/documents/ENEM/2024/questions/q137.png",
      "alt": {
        "A": "56",
        "B": "58",
        "C": "59",
        "D": "60",
        "E": "62"
      }
    },

    // ── QUESTÃO 138 ──
    {
      "num": 138,
      "enunciado": "Uma empresa de engenharia foi contratada para realizar um serviço no valor de R$ 71250,00. Os sócios da empresa decidiram que 40% desse valor seria destinado ao pagamento de três engenheiros que gerenciaram o serviço. O pagamento para cada um deles será feito de forma diretamente proporcional ao total de horas trabalhadas. O número de dias e o número de horas diárias trabalhadas pelos engenheiros foram, respectivamente:\n• engenheiro I: 4 dias, numa jornada de 5 horas e meia por dia;\n• engenheiro II: 5 dias, numa jornada de 4 horas por dia;\n• engenheiro III: 6 dias, numa jornada de 2 horas e meia por dia\nQual a maior diferença, em real, entre os valores recebidos por esse serviço entre dois desses engenheiros?",
      "img": null,
      "alt": {
        "A": "1000",
        "B": "1500",
        "C": "3500",
        "D": "3800",
        "E": "5250"
      }
    },

    // ── QUESTÃO 139 ──
    {
      "num": 139,
      "enunciado": "Um hospital tem 7 médicos cardiologistas e 6 médicos neurologistas em seu quadro de funcionários. Para executar determinada atividade, a direção desse hospital formará uma equipe com 5 médicos, sendo, pelo menos, 3 cardiologistas.\nA expressão numérica que representa o número máximo de maneiras distintas de formar essa equipe é",
      "img": null,
      "alt": {
        "A": "7!/4! x 6!/4!",
        "B": "7!/3! x 4! x 6!/2! x 4!",
        "C": "7!/3! x 4! + 6!/2! x 4! + 5!/1! x 4!",
        "D": "(7!/3! x 4! + 6!/2!)x(7!/4! x 3! + 6!/1! x 5!)x(7!/5! x 2! + 6!/0! x 6!)",
        "E": "(7!/3! x 4! + 6!/2!)+(7!/4! x 3! + 6!/1! x 5!)+(7!/5! x 2! + 6!/0! x 6!)"
      }
    },

    // ── QUESTÃO 140 ──
    {
      "num": 140,
      "enunciado": "Para melhorar o fluxo de ônibus em uma avenida que tem dois semáforos, a prefeitura reduzirá o tempo em que cada sinal ficará vermelho, que atualmente é de 15 segundos a cada 60 segundos. Admita que o instante de chegada de um ônibus a cada semáforo é aleatório.\nO engenheiro de tráfego da prefeitura calculou a probabilidade de um ônibus encontrar cada um deles vermelho, obtendo 15/60 . A partir daí, estabeleceu uma mesma redução na quantidade do tempo, em segundo, em que cada sinal ficará vermelho, de maneira que a probabilidade de um ônibus encontrar ambos os sinais vermelhos numa mesma viagem seja igual a 4/100 , considerando os eventos independentes.\nPara isso, a redução do tempo em que o sinal ficará vermelho, em segundo, estabelecida pelo engenheiro foi de",
      "img": null,
      "alt": {
        "A": "1,35",
        "B": "3,00",
        "C": "9,00",
        "D": "12,60",
        "E": "13,80"
      }
    },

    // ── QUESTÃO 141 ──
    {
      "num": 141,
      "enunciado": "A densidade demográfica de uma região é definida como sendo a razão entre o número de habitantes dessa região e sua área, expressa na unidade habitantes por quilômetro quadrado.\nUma região R é subdividida em várias outras, sendo uma delas a região Q. A área de Q é igual a três quartos da área de R, e o número de habitantes de Q é igual à metade do número de habitantes de R. As densidades demográficas correspondentes a essas regiões são denotadas por d(Q) e d(R).\nA expressão que relaciona d(Q) e d(R) é",
      "img": null,
      "alt": {
        "A": "d(Q) = 1/4 d(R)",
        "B": "d(Q) = 1/2 d(R)",
        "C": "d(Q) = 3/4 d(R)",
        "D": "d(Q) = 3/2 d(R)",
        "E": "d(Q) = 2/3 d(R)"
      }
    },

    // ── QUESTÃO 142 ──
    {
      "num": 142,
      "enunciado": "Atualmente, há telefones celulares com telas de diversos tamanhos e em formatos retangulares. Alguns deles apresentam telas medindo 3 1/2 polegadas, com determinadas especificações técnicas. Além disso, em muitos modelos, com a inclusão de novas funções no celular, suas telas ficaram maiores, sendo muito comum encontrarmos atualmente telas medindo 4 5/6 polegadas, conforme a figura.\nA diferença de tamanho, em valor absoluto, entre as medidas, em polegada, das telas do celular 2 e do celular 1, representada apenas com uma casa decimal, é",
      "img": "assets/documents/ENEM/2024/questions/q142.png",
      "alt": {
        "A": "0,1",
        "B": "0,5",
        "C": "1,0",
        "D": "1,3",
        "E": "1,8"
      }
    },

    // ── QUESTÃO 143 ──
    {
      "num": 143,
      "enunciado": "Uma imobiliária iniciou uma campanha de divulgação para promover a venda de apartamentos que podem ser pagos em 100 parcelas mensais. O valor da primeira delas é fixado no momento da compra, com o pagamento dessa primeira parcela. A partir da segunda parcela, o valor é determinado pela aplicação de um acréscimo percentual fixo ao valor da parcela anterior. Como atrativo, a imobiliária fará o pagamento de todas as parcelas correspondentes ao mês de aniversário do comprador.\nUm cliente, que faz aniversário no mês de maio, decidiu comprar um desses apartamentos por meio do financiamento oferecido pela imobiliária, e pretende escolher o mês mais adequado para realizar essa compra, de modo que o valor total dos pagamentos seja o menor possível.\nQual é o mês que esse cliente deverá escolher para realizar a compra do apartamento?",
      "img": null,
      "alt": {
        "A": "Fevereiro",
        "B": "Abril",
        "C": "Maio",
        "D": "Junho",
        "E": "Agosto"
      }
    },

    // ── QUESTÃO 144 ──
    {
      "num": 144,
      "enunciado": "Um sistema de polias circulares e correias é um dos mecanismos responsáveis pela transmissão de movimento em máquinas rotativas. O manual de um motor traz uma figura representando um sistema composto por duas polias e uma correia de transmissão, tensionada e perfeitamente ajustada sobre as polias, de modo a não apresentar folgas nos contatos com as polias. Considere que as partes dessa correia que não ficam em contato com as polias são representadas por segmentos de reta tangentes às polias.\nPara substituição dessa correia, é necessária a especificação de seu comprimento.\nConsidere 3 como valor aproximado para π.\nA medida do comprimento dessa correia, em centímetro, é",
      "img": "assets/documents/ENEM/2024/questions/q144.png",
      "alt": {
        "A": "54",
        "B": "60",
        "C": "66",
        "D": "68",
        "E": "72"
      }
    },

    // ── QUESTÃO 145 ──
    {
      "num": 145,
      "enunciado": "A prefeitura de uma cidade planeja construir três postos de saúde. Esses postos devem ser construídos em locais equidistantes entre si e de forma que as distâncias desses três postos ao hospital dessa cidade sejam iguais. Foram conseguidos três locais para a construção dos postos de saúde que apresentam as características desejadas, e que distam 10 km entre si, conforme o esquema, no qual o ponto H representa o local onde está construído o hospital; os pontos P1, P2 e P3, os postos de saúde; e esses quatro pontos estão em um mesmo plano.A distância, em quilômetro, entre o hospital e cada um dos postos de saúde, é um valor entre",
      "img": "assets/documents/ENEM/2024/questions/q145.png",
      "alt": {
        "A": "2 e 3",
        "B": "4 e 5",
        "C": "5 e 6",
        "D": "7 e 8",
        "E": "8 e 9"
      }
    },

    // ── QUESTÃO 146 ──
    {
      "num": 146,
      "enunciado": "Projetistas de uma fábrica de amortecedores realizaram uma série de experimentos que produziram oscilações semelhantes ao comportamento do gráfico de uma senoide, para qualquer tipo de estrada. Cada experimento teve duração de 20 minutos, sendo os 9 primeiros minutos em superfície que simula uma rodovia asfaltada, e os 11 minutos restantes em superfície que simula uma estrada de chão.\nPara os amortecedores serem aprovados no experimento, exige-se que as amplitudes das ondas oscilatórias, em cada tipo de superfície, sejam constantes e, ainda, que a amplitude da oscilação do amortecedor no asfalto seja menor do que sua amplitude da oscilação na estrada de chão.\nO tipo de gráfico que descreve o comportamento oscilatório de um amortecedor aprovado nesse experimento é",
      "img": "assets/documents/ENEM/2024/questions/q146.png",
      "alt": {
        "A": "A",
        "B": "B",
        "C": "C",
        "D": "D",
        "E": "E"
      }
    },

    // ── QUESTÃO 147 ──
    {
      "num": 147,
      "enunciado": "Um jardineiro dispõe de k metros lineares de cerca baixa para fazer um jardim ornamental. O jardim, delimitado por essa cerca, deve ter a forma de um triângulo equilátero, um quadrado ou um hexágono regular. A escolha será pela forma que resulte na maior área.\nO jardineiro escolherá a forma de",
      "img": null,
      "alt": {
        "A": "hexágono regular, pois a área do jardim, em metro quadrado, será k^2 [3]/24",
        "B": "hexágono regular, pois a área do jardim, em metro quadrado, será 3k^2 [3]/2",
        "C": "quadrado, pois a área do jardim, em metro quadrado, será k^2/16",
        "D": "triângulo equilátero, pois a área do jardim, em metro quadrado, será k^2 [3]/36",
        "E": "triângulo equilátero, pois a área do jardim, em metro quadrado, será k^2[3]/4"
      }
    },

    // ── QUESTÃO 148 ──
    {
      "num": 148,
      "enunciado": "Um aeroporto disponibiliza o serviço de transporte gratuito entre seus dois terminais utilizando os ônibus A e B, que partem simultaneamente, de hora em hora, de terminais diferentes. A distância entre os terminais é de 9000 metros, e o percurso total dos ônibus, de um terminal ao outro, é monitorado por um sistema de cinco câmeras que cobrem diferentes partes do trecho, conforme o esquema.\nO alcance de cada uma das cinco câmeras é:\n• câmera I: 1/5 do percurso;\n• câmera II: 3/10 do percurso;\n• câmera III: 1/10 do percurso;\n• câmera IV: 1/10 do percurso;\n• câmera V: 3/10 do percurso.\nEm determinado horário, o ônibus A parte do terminal 1 e realiza o percurso total com velocidade constante de 250 m/min; enquanto o ônibus B, que parte do terminal 2, realiza o percurso total com velocidade constante de 150 m/min.\nQual câmera registra o momento em que os ônibus A e B se encontram?",
      "img": "assets/documents/ENEM/2024/questions/q148.png",
      "alt": {
        "A": "I",
        "B": "II",
        "C": "III",
        "D": "IV",
        "E": "V"
      }
    },

    // ── QUESTÃO 149 ──
    {
      "num": 149,
      "enunciado": "A criptografia refere-se à construção e análise de protocolos que impedem terceiros de lerem mensagens privadas. Júlio César, imperador romano, utilizava um código para proteger as mensagens enviadas a seus generais. Assim, se a mensagem caísse em mãos inimigas, a informação não poderia ser compreendida. Nesse código, cada letra do alfabeto era substituída pela letra três posições à frente, ou seja, o “A” era substituído pelo “D”, o “B” pelo “E”, o “C” pelo “F”, e assim sucessivamente.\nQualquer código que tenha um padrão de substituição de letras como o descrito é considerado uma Cifra de César ou um Código de César. Note que, para decifrar uma Cifra de César, basta descobrir por qual letra o “A” foi substituído, pois isso define todas as demais substituições a serem feitas.\nUma mensagem, em um alfabeto de 26 letras, foi codificada usando uma Cifra de César. Considere a probabilidade de se descobrir, aleatoriamente, o padrão utilizado nessa codificação, e que uma tentativa frustrada deverá ser eliminada nas tentativas seguintes.\nA probabilidade de se descobrir o padrão dessa Cifra de César apenas na terceira tentativa é dada por",
      "img": "assets/documents/ENEM/2024/questions/q149.png",
      "alt": {
        "A": "1/25+1/25+1/25",
        "B": "24/25+23/24+1/23",
        "C": "1/25x1/24x1/23",
        "D": "24/25x23/25x1/25",
        "E": "24/25x23/24x1/23"
      }
    },

    // ── QUESTÃO 150 ──
    {
      "num": 150,
      "enunciado": "Em uma região com grande incidência de terremotos, observou-se que dois terremotos ocorridos apresentaram magnitudes M1 e M2, medidos segundo a escala Richter, e liberaram energias iguais a E1 e E2, respectivamente. Entre os estudiosos do assunto, é conhecida uma expressão algébrica relacionando esses valores dada por\nM2 - M1 = 2/3log(E2/E1)\nEstudos mais abrangentes observaram que o primeiro terremoto apresentou a magnitude M1 = 6,9 e a energia liberada foi um décimo da observada no segundo terremoto.\nO valor aproximado da magnitude M2 do segundo terremoto, expresso com uma casa decimal, é igual a",
      "img": null,
      "alt": {
        "A": "5,4",
        "B": "6,2",
        "C": "7,6",
        "D": "8,2",
        "E": "8,4"
      }
    },

    // ── QUESTÃO 151 ──
    {
      "num": 151,
      "enunciado": "Uma indústria faz uma parceria com uma distribuidora de sucos para lançar no mercado dois tipos de embalagens. Para a fabricação dessas embalagens, a indústria dispõe de folhas de alumínio retangulares, de dimensões 10 cm por 20 cm. Cada uma dessas folhas é utilizada para formar a superfície lateral da embalagem, em formato de cilindro circular reto, que posteriormente recebe fundo e tampa circulares. A figura ilustra, dependendo de qual das duas extensões será utilizada como altura, as duas opções para formar a possível embalagem.\nDentre essas duas embalagens, a de maior capacidade apresentará volume, em centímetro cúbico, igual a",
      "img": "assets/documents/ENEM/2024/questions/q151.png",
      "alt": {
        "A": "4000 π",
        "B": "2000 π",
        "C": "4000/π",
        "D": "1000/π",
        "E": "500/π"
      }
    },

    // ── QUESTÃO 152 ──
    {
      "num": 152,
      "enunciado": "As receitas anuais obtidas por uma indústria no período de 2014 a 2021, em milhão de reais, foram registradas, por pontos, em um gráfico. Nele, também está representada a reta que descreve a tendência de evolução das receitas. Essa reta pode ser utilizada para estimar as receitas dos anos seguintes.\nA estimativa da receita, em milhão de reais, dessa indústria, para o ano de 2026, obtida a partir dessa reta de tendência, é",
      "img": "assets/documents/ENEM/2024/questions/q152.png",
      "alt": {
        "A": "7",
        "B": "8",
        "C": "9",
        "D": "10",
        "E": "11"
      }
    },

    // ── QUESTÃO 153 ──
    {
      "num": 153,
      "enunciado": "Um tanque, em formato de paralelepípedo reto retângulo, tem em seu interior dois anteparos verticais, fixados na sua base e em duas paredes opostas, sendo perpendiculares a elas, conforme a figura.\nEsses anteparos, de espessuras desprezíveis, estão instalados de maneira a dividir a base do tanque em três retângulos congruentes, tendo suas alturas iguais à metade e a um quarto da altura do tanque. O tanque é abastecido por uma entrada situada no teto, através de um duto que despeja água a uma vazão constante, sendo necessárias 12 horas para finalizar o seu enchimento.\nO gráfico que descreve, em cada instante, a maior altura de coluna de água, dentre aquelas que vão sendo formadas ao longo do enchimento do tanque, é",
      "img": "assets/documents/ENEM/2024/questions/q153.png",
      "alt": {
        "A": "A",
        "B": "B",
        "C": "C",
        "D": "D",
        "E": "E"
      }
    },

    // ── QUESTÃO 154 ──
    {
      "num": 154,
      "enunciado": "Contratos de vários serviços disponíveis na internet apresentam uma quantidade excessiva de informações. Isso faz com que o tempo necessário para a leitura desses contratos possa ser longo.\nO quadro apresenta uma amostra do tempo considerado necessário para a leitura completa do contrato de alguns serviços digitais.\nO tempo médio, em minuto, necessário para a leitura completa de um contrato de serviço dentre os listados no quadro é, com uma casa decimal, aproximadamente,",
      "img": "assets/documents/ENEM/2024/questions/q154.png",
      "alt": {
        "A": "",
        "B": "",
        "C": "",
        "D": "",
        "E": ""
      }
    },

    // ── QUESTÃO 155 ──
    {
      "num": 155,
      "enunciado": "Um proprietário pretende instalar um sensor de presença para a proteção de seu imóvel. O sensor deverá detectar movimentos de objetos e pessoas numa determinada região plana. A figura ilustra a vista superior da área de cobertura (setor circular em azul) de um sensor colocado no ponto S. Essa área depende da medida do ângulo α, em grau, e do raio R, em metro.\nAo aumentar o ângulo α ou o raio R aumenta-se a área de cobertura do sensor. Entretanto, quanto maior essa área, maior o preço do sensor\nPara esse fim, há cinco tipos de sensores disponíveis no mercado, cada um com as seguintes características:\n• tipo I: α = 15° e R = 20 m;\n• tipo II: α = 30° e R = 22 m;\n• tipo III: α = 40° e R = 12 m;\n• tipo IV: α = 60° e R = 16 m;\n• tipo V: α = 90° e R = 10 m.\nEsse proprietário pretende adquirir um desses sensores que seja capaz de cobrir, no mínimo, uma área de medida 70 m2, com o menor preço possível.\nUse 3 como valor aproximado para π.\nO proprietário do imóvel deverá adquirir o sensor do tipo",
      "img": "assets/documents/ENEM/2024/questions/q155.png",
      "alt": {
        "A": "I",
        "B": "II",
        "C": "III",
        "D": "IV",
        "E": "V"
      }
    },

    // ── QUESTÃO 156 ──
    {
      "num": 156,
      "enunciado": "O uso de aplicativos de transporte tem sido uma alternativa à população que busca preços mais competitivos para se locomover, principalmente nas grandes cidades. As formas usadas para determinar o valor cobrado por cada viagem variam de um aplicativo para outro, mas, em geral, o valor V a ser pago, em real, varia em função de:\n• tarifa base F: valor fixo, em real, cobrado no início da viagem;\n• tempo T: tempo, em minuto, de duração da viagem;\n• distância D: distância percorrida, em quilômetro.\nUm desses aplicativos cobra R$ 2,00 de valor fixo, acrescido de R$ 0,26 por minuto de viagem e de R$ 1,40 por quilômetro rodado.\nNessas condições, a expressão que fornece o valor V a ser pago por uma viagem desse aplicativo é",
      "img": null,
      "alt": {
        "A": "2,00F + 0,26T + 1,40D",
        "B": "2,00 + 0,26T + 1,40D",
        "C": "2,00 + 0,26T + D",
        "D": "0,26T + 1,40D",
        "E": "F + T + D"
      }
    },

    // ── QUESTÃO 157 ──
    {
      "num": 157,
      "enunciado": "Uma piscina tem capacidade de 2 500 000 litros. Seu sistema de abastecimento foi regulado para ter uma vazão constante de 6 000 litros de água por minuto.\nO mesmo sistema foi instalado em uma segunda piscina, com capacidade de 2750000 litros, e regulado para ter uma vazão, também constante, capaz de enchê-la em um tempo 20% maior que o gasto para encher a primeira piscina.\nA vazão do sistema de abastecimento da segunda piscina, em litro por minuto, é",
      "img": null,
      "alt": {
        "A": "8250",
        "B": "7920",
        "C": "6545",
        "D": "5500",
        "E": "5280"
      }
    },

    // ── QUESTÃO 158 ──
    {
      "num": 158,
      "enunciado": "Uma tubulação despeja sempre o mesmo volume de água por unidade de tempo em uma caixa-d’água, o que significa dizer que a vazão de água nessa tubulação é constante. Na junção dessa tubulação com a caixa-d’água, está instalada uma membrana de filtragem cujo objetivo é filtrar eventuais impurezas presentes na água, combinado a um bom fluxo de água. O fluxo (φ) de água através da superfície da membrana é diretamente proporcional à vazão de água na tubulação, medida em mililitro por segundo, e inversamente proporcional à área da superfície da membrana, medida em centímetro quadrado.\nA unidade de medida adequada para descrever o fluxo (φ) de água que atravessa a superfície da membrana é",
      "img": null,
      "alt": {
        "A": "mL ⋅ s ⋅ cm^2",
        "B": "mL/s ⋅ cm^2",
        "C": "mL/cm^2 ⋅ s",
        "D": "cm^2 ⋅ s/mL",
        "E": "cm^2/mL ⋅ s"
      }
    },

    // ── QUESTÃO 159 ──
    {
      "num": 159,
      "enunciado": "Em uma loja de defensivos agrícolas, os preços de alguns produtos foram divulgados em um cartaz.\nSabe-se que 1 litro de defensivo do Tipo A é suficiente para aplicação em 0,5 hectare (ha), enquanto que 1 litro de defensivo do Tipo B é suficiente para aplicação em 0,4 ha. Um agricultor precisa comprar, nessa loja, uma quantidade de litros de defensivo suficiente para aplicar em uma área de 20 ha, além de levar uma máscara para aplicação.\nO valor mínimo, em real, a ser gasto pelo agricultor é",
      "img": "assets/documents/ENEM/2024/questions/q159.png",
      "alt": {
        "A": "147,00",
        "B": "150,00",
        "C": "162,50",
        "D": "165,75",
        "E": "168,00"
      }
    },

    // ── QUESTÃO 160 ──
    {
      "num": 160,
      "enunciado": "Uma doceira vende e entrega, em seu bairro, porções de 100 g de docinhos de aniversário. Atualmente, a taxa única de entrega é R$ 10,00, e o valor cobrado por uma porção é R$ 25,00. Por uma estratégia de vendas, a partir da próxima semana, a taxa única de entrega será R$ 15,00, e um novo valor será cobrado por uma porção, de maneira que o valor total a ser pago por um cliente na compra de 5 porções permaneça o mesmo.\nA partir da próxima semana, qual será o novo valor cobrado, em real, por uma porção?",
      "img": null,
      "alt": {
        "A": "12,50",
        "B": "20,00",
        "C": "24,00",
        "D": "30,00",
        "E": "37,50"
      }
    },

    // ── QUESTÃO 161 ──
    {
      "num": 161,
      "enunciado": "Uma empresa tem 400 funcionários, distribuídos em três setores: administrativo, logística e produção. O gráfico apresenta a distribuição quantitativa desses funcionários, por setor e por faixa etária.\nUma viagem de férias será sorteada entre esses funcionários, de forma que todos terão igual probabilidade de serem sorteados.\nA maior probabilidade é que o funcionário sorteado esteja na faixa etária",
      "img": "assets/documents/ENEM/2024/questions/q161.png",
      "alt": {
        "A": "entre 25 e 45 anos, pois é a faixa etária com maior quantidade de funcionários.",
        "B": "entre 25 e 45 anos, pois é a única faixa etária cujas porcentagens são maiores do que as porcentagens mínimas de cada setor.",
        "C": "até 25 anos, pois é a única faixa etária cujos percentuais associados aos setores aumentam com o aumento da quantidade de funcionários por setor.",
        "D": "até 25 anos, pois é a faixa etária que apresenta maior quantidade de funcionários no setor de produção, que é o setor que emprega metade dos funcionários dessa empresa.",
        "E": "a partir de 45 anos, pois a soma das porcentagens associadas a essa faixa etária é 110%, que é maior do que as respectivas somas associadas às outras faixas etárias, que são 105% e 85%."
      }
    },

    // ── QUESTÃO 162 ──
    {
      "num": 162,
      "enunciado": "Em um jogo virtual para celular, um personagem pode percorrer trajetórias retilíneas voando ou se deslocando ao longo de paredes. Considere que o personagem descreve a trajetória ABCDEF, em que os pontos A, D e E estão em um plano paralelo ao que contém os pontos B e C, sendo esses dois planos ortogonais ao plano da base que contém o ponto F, conforme a figura.\nA projeção ortogonal, sobre o plano da base, da trajetória ABCDEF descrita pelo personagem é",
      "img": "assets/documents/ENEM/2024/questions/q162.png",
      "alt": {
        "A": "A",
        "B": "B",
        "C": "C",
        "D": "D",
        "E": "E"
      }
    },

    // ── QUESTÃO 163 ──
    {
      "num": 163,
      "enunciado": "O tamanho mínimo que a visão humana é capaz de visualizar sem o uso de equipamento auxiliar é equivalente a 100 micrômetros (1 micrômetro = 10-3 milímetros). Uma estudante pretende visualizar e analisar hemácias do sangue humano, que medem 0,007 mm de diâmetro. Ela adquiriu um microscópio óptico que tem uma lente ocular que amplia em 10 vezes a imagem do objeto em observação, e um conjunto de lentes objetivas com estas capacidades de ampliação:\n• lente I: 2 vezes;\n• lente II: 10 vezes;\n• lente III: 15 vezes;\n• lente IV: 1,1 vez;\n• lente V: 1,4 vez.\nO funcionamento desse microscópio permite o uso dalente ocular sozinha ou a combinação dela com uma de suas lentes objetivas, proporcionando, nesse caso, um aumento de sua capacidade de ampliação final, que é dada pelo produto entre as capacidades de ampliação da ocular e da objetiva.\nEssa estudante pretende selecionar a lente objetiva de menor capacidade de ampliação que permita, na combinação com a ocular, visualizar hemácias do sangue humano.\nA lente objetiva a ser selecionada pela estudante é a",
      "img": "assets/documents/ENEM/2024/questions/q163.png",
      "alt": {
        "A": "I",
        "B": "II",
        "C": "III",
        "D": "IV",
        "E": "V"
      }
    },

    // ── QUESTÃO 164 ──
    {
      "num": 164,
      "enunciado": "Ao calcular a média de suas notas em 4 provas, um estudante dividiu, por engano, a soma das notas por 5. Com isso, a média obtida foi 1 unidade menor do que deveria ser, caso fosse calculada corretamente.\nO valor correto da média das notas desse estudante é",
      "img": null,
      "alt": {
        "A": "4",
        "B": "5",
        "C": "6",
        "D": "19",
        "E": "21"
      }
    },

    // ── QUESTÃO 165 ──
    {
      "num": 165,
      "enunciado": "Para abrir a porta de uma empresa, cada funcionário deve cadastrar uma senha utilizando um teclado alfanumérico como o representado na figura.\nPor exemplo: a tecla que contém o número 2 traz as letras correlacionadas A, B e C. Cada toque nessa tecla mostra, sequencialmente, os seguintes caracteres: 2, A, B e C. Para os próximos toques, essa sequência se repete. As demais teclas funcionam da mesma maneira.\nAs senhas a serem cadastradas pelos funcionários devem conter 5 caracteres, sendo 2 algarismos distintos seguidos de 3 letras diferentes, nessa ordem. Um funcionário irá cadastrar a sua primeira senha, podendo escolher entre as teclas que apresentam os números 1, 2, 5, 7 e 0 e as respectivas letras correlacionadas, quando houver.\nO número de possibilidades diferentes que esse funcionário tem para cadastrar sua senha é",
      "img": "assets/documents/ENEM/2024/questions/q165.png",
      "alt": {
        "A": "11520",
        "B": "14400",
        "C": "18000",
        "D": "312000",
        "E": "390000"
      }
    },

    // ── QUESTÃO 166 ──
    {
      "num": 166,
      "enunciado": "Um artesão utiliza dois tipos de componentes, X e Y, nos enfeites que produz. Ele sempre compra todos os componentes em uma mesma loja. O quadro apresenta os preços dos dois tipos de componentes nas lojas I e II.\nEle confeccionará enfeites formados por duas unidades do componente X e uma unidade do componente Y e efetuará a compra na loja que oferecer o menor valor total para a confecção de um enfeite.\nO artesão efetuará a compra na loja",
      "img": "assets/documents/ENEM/2024/questions/q166.png",
      "alt": {
        "A": "I, pois o valor é R$ 7,00",
        "B": "I, pois o valor é R$ 4,00",
        "C": "II, pois o valor é R$ 6,00",
        "D": "I, pois anuncia o componente com o menor preço",
        "E": "II, pois o componente X, que é o mais utilizado, tem menor preço"
      }
    },

    // ── QUESTÃO 167 ──
    {
      "num": 167,
      "enunciado": "João e Felipe participaram, na escola, de uma maratona de matemática na qual, durante uma semana, resolveram 200 questões cada. Nessa maratona, a porcentagem P de acertos de cada participante é convertida em um conceito:\n• insatisfatório: se 0 ≤ P < 50;\n• regular: se 50 ≤ P < 60;\n• bom: se 60 ≤ P < 75;\n• muito bom: se 75 ≤ P < 90;\n• excelente: se 90 ≤ P ≤ 100.\nJoão acertou 75% das questões da maratona e Felipe acertou 30% a menos que a quantidade de questões que João acertou.\nOs conceitos de João e Felipe foram, respectivamente,",
      "img": null,
      "alt": {
        "A": "muito bom e bom",
        "B": "muito bom e regular",
        "C": "muito bom e insatisfatório",
        "D": "bom e regular",
        "E": "bom e insatisfatório"
      }
    },

    // ── QUESTÃO 168 ──
    {
      "num": 168,
      "enunciado": "Três grandezas (I, II e III) se relacionam entre si. Os gráficos a seguir, formados por segmentos de reta, descrevem as relações de dependência existentes entre as grandezas I e II, e entre as grandezas II e III.\nO valor máximo assumido pela grandeza III, quando a grandeza I varia de 1 a 3, é",
      "img": "assets/documents/ENEM/2024/questions/q168.png",
      "alt": {
        "A": "1,0",
        "B": "2,5",
        "C": "3,0",
        "D": "3,5",
        "E": "4,0"
      }
    },

    // ── QUESTÃO 169 ──
    {
      "num": 169,
      "enunciado": "Uma criança, utilizando um aplicativo, escreveu uma mensagem para enviar a um amigo. Essa mensagem foi escrita seguindo estas etapas:\nA criança seguiu copiando e colando, em cada etapa, o que tinha no visor na etapa imediatamente anterior, até concluir a 20ª etapa. Em seguida, enviou a mensagem.\nQual foi o total de figuras contidas na mensagem enviada?",
      "img": "assets/documents/ENEM/2024/questions/q169.png",
      "alt": {
        "A": "3 × 2^19",
        "B": "3 × 2^20",
        "C": "3 × 2^21",
        "D": "3 × 2^20 − 1",
        "E": "3 × 2^20 − 3"
      }
    },

    // ── QUESTÃO 170 ──
    {
      "num": 170,
      "enunciado": "Uma casa de shows terá um evento cujo custo total de produção é de R$ 34 350,00, sendo que comporta 500 pessoas. O preço do ingresso será de R$ 130,00 e, normalmente, 60% das pessoas adquirem meia-entrada, pagando R$ 65,00 pelo ingresso. Além do faturamento proveniente da venda de ingressos, a casa de shows vende, com 60% de lucro, bebidas e petiscos ao público no dia do evento.\nApós ter vendido todos os 500 ingressos, constatou-se que a quantidade de meias-entradas vendidas superou em 50% o que estava previsto, impactando o faturamento estimado com a venda de ingressos.\nNo dia do evento, decidiu-se manter o percentual de 60% de lucro sobre as bebidas e petiscos, pois todo o público que comprou ingresso compareceu ao show. Com isso, espera-se ter lucro de R$ 17 000,00 nesse evento.\nPara que se alcance o lucro esperado, o gasto médio por pessoa com bebidas e petiscos, em real, deverá ser de",
      "img": null,
      "alt": {
        "A": "19,50",
        "B": "28,80",
        "C": "34,00",
        "D": "52,00",
        "E": "68,70"
      }
    },

    // ── QUESTÃO 171 ──
    {
      "num": 171,
      "enunciado": "Para obter um sólido de revolução (rotação de 360°em torno de um eixo fixo), uma professora realizou as seguintes etapas:\n• recortou o trapézio retângulo PQRS de um material rígido;\n• afixou o lado PS do trapézio em uma vareta fixa retilínea (eixo de rotação);\n• girou o trapézio 360° em torno da vareta e obteve um sólido de revolução.\nObserve a figura que apresenta o trapézio afixado na vareta e o sentido de giro.\nO sólido obtido foi um(a)",
      "img": "assets/documents/ENEM/2024/questions/q171.png",
      "alt": {
        "A": "cone",
        "B": "cilindro",
        "C": "pirâmide",
        "D": "tronco de cone",
        "E": "tronco de pirâmide"
      }
    },

    // ── QUESTÃO 172 ──
    {
      "num": 172,
      "enunciado": "O estádio do Maracanã passou por algumas modificações estruturais para a realização da Copa do Mundo de 2014, como, por exemplo, as dimensões do campo retangular. Para se adaptar aos padrões da Fifa, as dimensões do campo foram reduzidas de 110 m × 75 m para 105 m × 68 m.\nEm quantos metros quadrados a área do campo do Maracanã foi reduzida?",
      "img": "assets/documents/ENEM/2024/questions/q172.png",
      "alt": {
        "A": "24",
        "B": "35",
        "C": "555",
        "D": "1110",
        "E": "1145"
      }
    },

    // ── QUESTÃO 173 ──
    {
      "num": 173,
      "enunciado": "Uma sala com piso no formato retangular, com lados de medidas 3 m e 6 m, será dividida em dois ambientes. Para isso, serão utilizadas colunas em formato cilíndrico, dispostas perpendicularmente ao piso e representadas na figura pelos círculos de cor azul. Os centros desses círculos estarão sobre uma reta paralela aos lados de menor medida do piso da sala. Os vãos entre duas colunas e entre uma coluna e a parede não poderão ser superiores a 15 cm.\nPara efetuar a compra dessas colunas, foram feitos orçamentos com base em dados fornecidos por cinco lojas.\nA compra será realizada na loja cujo orçamento resulte no menor valor total possível.\nA compra será realizada na loja",
      "img": "assets/documents/ENEM/2024/questions/q173.png",
      "alt": {
        "A": "I",
        "B": "II",
        "C": "III",
        "D": "IV",
        "E": "V"
      }
    },

    // ── QUESTÃO 174 ──
    {
      "num": 174,
      "enunciado": "O arquiteto Renzo Piano exibiu a maquete da nova assimétrico que tem um vão aberto para a galeria principal, cuja medida da área é 1672 m^2.\nA medida da área do vão aberto nessa maquete, em centímetro quadrado, é",
      "img": null,
      "alt": {
        "A": "4,18",
        "B": "8,36",
        "C": "41,80",
        "D": "83,60",
        "E": "418,00"
      }
    },

    // ── QUESTÃO 175 ──
    {
      "num": 175,
      "enunciado": "O gráfico apresenta o valor total de exportações e o valor total de importações, ao longo de um período, em bilhão de dólares. O saldo da balança comercial brasileira é dado pelo valor total de exportações menos o valor total de importações num mesmo período.\nConsidere que os saldos da balança comercial brasileira, nos três meses destacados no gráfico, sejam representados por:\n• S1: saldo em junho de 2009;\n• S2: saldo em janeiro de 2010;\n• S3: saldo em junho de 2010.\nA ordenação dos saldos S1, S2 e S3, do maior para o menor, é",
      "img": "assets/documents/ENEM/2024/questions/q175.png",
      "alt": {
        "A": "S1, S3 e S2",
        "B": "S2, S1 e S3",
        "C": "S2, S3 e S1",
        "D": "S3, S1 e S2",
        "E": "S3, S2 e S1"
      }
    },

    // ── QUESTÃO 176 ──
    {
      "num": 176,
      "enunciado": "Um instituto de pesquisa constatou que, nos últimos dez anos, o crescimento populacional de uma cidade foi de 135,25%.\nQual é a representação decimal da taxa percentual desse crescimento populacional?",
      "img": null,
      "alt": {
        "A": "13525,0",
        "B": "135,25",
        "C": "13,525",
        "D": "1,3525",
        "E": "0,13525"
      }
    },

    // ── QUESTÃO 177 ──
    {
      "num": 177,
      "enunciado": "Um fazendeiro pretende construir um galinheiro ocupando uma região plana de formato retangular, com lados de comprimentos L metro e C metro. Os lados serão cercados por telas de tipos diferentes. Nos lados de comprimento L metro, será utilizada uma tela cujo metro linear custa R$ 20,00, enquanto, nos outros dois lados, uma que custa R$ 15,00. O fazendeiro quer gastar, no máximo, R$ 6000,00 na compra de toda a tela necessária para o galinheiro, e deseja que o galinheiro tenha a maior área possível.\nQual será a medida, em metro, do maior lado do galinheiro?",
      "img": null,
      "alt": {
        "A": "85",
        "B": "100",
        "C": "175",
        "D": "200",
        "E": "350"
      }
    },

    // ── QUESTÃO 178 ──
    {
      "num": 178,
      "enunciado": "Uma professora de matemática utiliza em suas aulas uma “máquina caça-números” para verificar os conhecimentos de seus estudantes sobre representações de números racionais. Essa máquina tem um visor dividido em seis compartimentos e, na lateral, uma alavanca. Cada estudante puxa a alavanca e espera que os compartimentos parem de girar. A partir daí, precisa responder para a professora em quais posições se encontram os números que representam a mesma quantidade.\nUm estudante puxou a alavanca, aguardou que os compartimentos parassem de girar e observou os números apresentados no visor. A configuração da máquina naquele instante está apresentada na imagem.\nEsse estudante respondeu corretamente à pergunta da professora.\nAs posições indicadas pelo estudante foram",
      "img": "assets/documents/ENEM/2024/questions/q178.png",
      "alt": {
        "A": "I, II e IV",
        "B": "II, IV e V",
        "C": "II, III e V",
        "D": "III, V e VI",
        "E": "III, IV e VI"
      }
    },

    // ── QUESTÃO 179 ──
    {
      "num": 179,
      "enunciado": "Uma caneca com água fervendo é retirada de um forno de micro-ondas. A temperatura T, em grau Celsius, da caneca, em função do tempo t, em minuto, pode ser modelada pela função T(t) = a + 80 bt, representada no gráfico a seguir.\nOs valores das constantes a e b são",
      "img": "assets/documents/ENEM/2024/questions/q179.png",
      "alt": {
        "A": "a = 20; b = log(0,5)",
        "B": "a = 100; b = 0,5",
        "C": "a = 20; b = (0,5)^1/10",
        "D": "a = 20; b = (40)^1/10/80",
        "E": "a = 20; b = 40"
      }
    },

    // ── QUESTÃO 180 ──
    {
      "num": 180,
      "enunciado": "Em uma empresa é comercializado um produto em embalagens em formato de cilindro circular reto, com raio medindo 3 cm, e altura medindo 15 cm. Essa empresa planeja comercializar o mesmo produto em embalagens em formato de cubo, com capacidade igual a 80% da capacidade da embalagem cilíndrica utilizada atualmente.\nUse 3 como valor aproximado para π.\nA medida da aresta da nova embalagem, em centímetro, deve ser",
      "img": null,
      "alt": {
        "A": "6",
        "B": "18",
        "C": "6 [6]",
        "D": "6^3[6]",
        "E": "3^3[12]"
      }
    }

  ] // fim de questoes
};
