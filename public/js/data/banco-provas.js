// js/data/banco-provas.js
// Configuração centralizada dos PDFs do Banco de Provas
// ─────────────────────────────────────────────────────────────────────────────
//
// Todos os caminhos apontam para a pasta já existente:
//   public/assets/documents/{VESTIBULAR}/{ANO}/...
//
// Padrão de nomes encontrado nos arquivos reais:
//   ENEM  → PROVA-ENEM-{ANO}.pdf            / GABARITO-ENEM-{ANO}.pdf
//   MACRO → PROVACG-MACRO-{ANO}.pdf         / GABARITOCG-MACRO-{ANO}.pdf       (Conhecimentos Gerais)
//           PROVACE-MACRO-{ANO}.pdf         / GABARITOCE-MACRO-{ANO}.pdf       (Conhecimentos Específicos)
//   PSC   → PROVA-PSC-{N}-ETAPA-{ANO}.pdf  / GABARITO-PSC-{N}-ETAPA-{ANO}.pdf
//   SIS   → PROVA-SIS-{N}-ETAPA-{ANO}.pdf  / GABARITO-SIS-{N}-ETAPA-{ANO}.pdf

const BASE = 'assets/documents'; // caminho relativo a partir de public/

const bancoProvasPDFs = {

  // ── ENEM ──────────────────────────────────────────────────────────────────
  enem: {
    2025: {
      prova:    `${BASE}/ENEM/2025/PROVA-ENEM-2025.pdf`,
      gabarito: `${BASE}/ENEM/2025/GABARITO-ENEM-2025.pdf`,
    },
    2024: {
      prova:    `${BASE}/ENEM/2024/PROVA-ENEM-2024.pdf`,
      gabarito: `${BASE}/ENEM/2024/GABARITO-ENEM-2024.pdf`,
    },
    2023: {
      prova:    `${BASE}/ENEM/2023/PROVA-ENEM-2023.pdf`,
      gabarito: `${BASE}/ENEM/2023/GABARITO-ENEM-2023.pdf`,
    },
    2022: {
      prova:    `${BASE}/ENEM/2022/PROVA-ENEM-2022.pdf`,
      gabarito: `${BASE}/ENEM/2022/GABARITO-ENEM-2022.pdf`,
    },
    2021: {
      prova:    `${BASE}/ENEM/2021/PROVA-ENEM-2021.pdf`,
      gabarito: `${BASE}/ENEM/2021/GABARITO-ENEM-2021.pdf`,
    },
    2020: {
      prova:    `${BASE}/ENEM/2020/PROVA-ENEM-2020.pdf`,
      gabarito: `${BASE}/ENEM/2020/GABARITO-ENEM-2020.pdf`,
    },
    2019: {
      prova:    `${BASE}/ENEM/2019/PROVA-ENEM-2019.pdf`,
      gabarito: `${BASE}/ENEM/2019/GABARITO-ENEM-2019.pdf`,
    },
    2018: {
      prova:    `${BASE}/ENEM/2018/PROVA-ENEM-2018.pdf`,
      gabarito: `${BASE}/ENEM/2018/GABARITO-ENEM-2018.pdf`,
    },
    2017: {
      prova:    `${BASE}/ENEM/2017/PROVA-ENEM-2017.pdf`,
      gabarito: `${BASE}/ENEM/2017/GABARITO-ENEM-2017.pdf`,
    },
    2016: {
      prova:    `${BASE}/ENEM/2016/PROVA-ENEM-2016.pdf`,
      gabarito: `${BASE}/ENEM/2016/GABARITO-ENEM-2016.pdf`,
    },
  },

  // ── MACRO ─────────────────────────────────────────────────────────────────
  // Subpastas: CONHECIMENTOS-GERAIS/ e CONHECIMENTOS-ESPECIFICOS/
  // Prefixos:  PROVACG / GABARITOCG  (gerais)
  //            PROVACE / GABARITOCE  (específicos)
  macro: {
    2025: {
      gerais: {
        prova:    `${BASE}/MACRO/2025/CONHECIMENTOS-GERAIS/PROVACG-MACRO-2025.pdf`,
        gabarito: `${BASE}/MACRO/2025/CONHECIMENTOS-GERAIS/GABARITOCG-MACRO-2025.pdf`,
      },
      especificos: {
        prova:    `${BASE}/MACRO/2025/CONHECIMENTOS-ESPECIFICOS/PROVACE-MACRO-2025.pdf`,
        gabarito: `${BASE}/MACRO/2025/CONHECIMENTOS-ESPECIFICOS/GABARITOCE-MACRO-2025.pdf`,
      },
    },
    2024: {
      gerais:      { prova: `${BASE}/MACRO/2024/CONHECIMENTOS-GERAIS/PROVACG-MACRO-2024.pdf`,      gabarito: `${BASE}/MACRO/2024/CONHECIMENTOS-GERAIS/GABARITOCG-MACRO-2024.pdf` },
      especificos: { prova: `${BASE}/MACRO/2024/CONHECIMENTOS-ESPECIFICOS/PROVACE-MACRO-2024.pdf`, gabarito: `${BASE}/MACRO/2024/CONHECIMENTOS-ESPECIFICOS/GABARITOCE-MACRO-2024.pdf` },
    },
    2023: {
      gerais:      { prova: `${BASE}/MACRO/2023/CONHECIMENTOS-GERAIS/PROVACG-MACRO-2023.pdf`,      gabarito: `${BASE}/MACRO/2023/CONHECIMENTOS-GERAIS/GABARITOCG-MACRO-2023.pdf` },
      especificos: { prova: `${BASE}/MACRO/2023/CONHECIMENTOS-ESPECIFICOS/PROVACE-MACRO-2023.pdf`, gabarito: `${BASE}/MACRO/2023/CONHECIMENTOS-ESPECIFICOS/GABARITOCE-MACRO-2023.pdf` },
    },
    2022: {
      gerais:      { prova: `${BASE}/MACRO/2022/CONHECIMENTOS-GERAIS/PROVACG-MACRO-2022.pdf`,      gabarito: `${BASE}/MACRO/2022/CONHECIMENTOS-GERAIS/GABARITOCG-MACRO-2022.pdf` },
      especificos: { prova: `${BASE}/MACRO/2022/CONHECIMENTOS-ESPECIFICOS/PROVACE-MACRO-2022.pdf`, gabarito: `${BASE}/MACRO/2022/CONHECIMENTOS-ESPECIFICOS/GABARITOCE-MACRO-2022.pdf` },
    },
    2021: {
      gerais:      { prova: `${BASE}/MACRO/2021/CONHECIMENTOS-GERAIS/PROVACG-MACRO-2021.pdf`,      gabarito: `${BASE}/MACRO/2021/CONHECIMENTOS-GERAIS/GABARITOCG-MACRO-2021.pdf` },
      especificos: { prova: `${BASE}/MACRO/2021/CONHECIMENTOS-ESPECIFICOS/PROVACE-MACRO-2021.pdf`, gabarito: `${BASE}/MACRO/2021/CONHECIMENTOS-ESPECIFICOS/GABARITOCE-MACRO-2021.pdf` },
    },
    2020: {
      gerais:      { prova: `${BASE}/MACRO/2020/CONHECIMENTOS-GERAIS/PROVACG-MACRO-2020.pdf`,      gabarito: `${BASE}/MACRO/2020/CONHECIMENTOS-GERAIS/GABARITOCG-MACRO-2020.pdf` },
      especificos: { prova: `${BASE}/MACRO/2020/CONHECIMENTOS-ESPECIFICOS/PROVACE-MACRO-2020.pdf`, gabarito: `${BASE}/MACRO/2020/CONHECIMENTOS-ESPECIFICOS/GABARITOCE-MACRO-2020.pdf` },
    },
    2019: {
      gerais:      { prova: `${BASE}/MACRO/2019/CONHECIMENTOS-GERAIS/PROVACG-MACRO-2019.pdf`,      gabarito: `${BASE}/MACRO/2019/CONHECIMENTOS-GERAIS/GABARITOCG-MACRO-2019.pdf` },
      especificos: { prova: `${BASE}/MACRO/2019/CONHECIMENTOS-ESPECIFICOS/PROVACE-MACRO-2019.pdf`, gabarito: `${BASE}/MACRO/2019/CONHECIMENTOS-ESPECIFICOS/GABARITOCE-MACRO-2019.pdf` },
    },
    2018: {
      gerais:      { prova: `${BASE}/MACRO/2018/CONHECIMENTOS-GERAIS/PROVACG-MACRO-2018.pdf`,      gabarito: `${BASE}/MACRO/2018/CONHECIMENTOS-GERAIS/GABARITOCG-MACRO-2018.pdf` },
      especificos: { prova: `${BASE}/MACRO/2018/CONHECIMENTOS-ESPECIFICOS/PROVACE-MACRO-2018.pdf`, gabarito: `${BASE}/MACRO/2018/CONHECIMENTOS-ESPECIFICOS/GABARITOCE-MACRO-2018.pdf` },
    },
    2017: {
      gerais:      { prova: `${BASE}/MACRO/2017/CONHECIMENTOS-GERAIS/PROVACG-MACRO-2017.pdf`,      gabarito: `${BASE}/MACRO/2017/CONHECIMENTOS-GERAIS/GABARITOCG-MACRO-2017.pdf` },
      especificos: { prova: `${BASE}/MACRO/2017/CONHECIMENTOS-ESPECIFICOS/PROVACE-MACRO-2017.pdf`, gabarito: `${BASE}/MACRO/2017/CONHECIMENTOS-ESPECIFICOS/GABARITOCE-MACRO-2017.pdf` },
    },
    2016: {
      gerais:      { prova: `${BASE}/MACRO/2016/CONHECIMENTOS-GERAIS/PROVACG-MACRO-2016.pdf`,      gabarito: `${BASE}/MACRO/2016/CONHECIMENTOS-GERAIS/GABARITOCG-MACRO-2016.pdf` },
      especificos: { prova: `${BASE}/MACRO/2016/CONHECIMENTOS-ESPECIFICOS/PROVACE-MACRO-2016.pdf`, gabarito: `${BASE}/MACRO/2016/CONHECIMENTOS-ESPECIFICOS/GABARITOCE-MACRO-2016.pdf` },
    },
  },

  // ── PSC ───────────────────────────────────────────────────────────────────
  // Subpastas: 1-ETAPA/ 2-ETAPA/ 3-ETAPA/
  psc: {
    2025: {
      etapa1: { prova: `${BASE}/PSC/2025/1-ETAPA/PROVA-PSC-1-ETAPA-2025.pdf`,    gabarito: `${BASE}/PSC/2025/1-ETAPA/GABARITO-PSC-1-ETAPA-2025.pdf` },
      etapa2: { prova: `${BASE}/PSC/2025/2-ETAPA/PROVA-PSC-2-ETAPA-2025.pdf`,    gabarito: `${BASE}/PSC/2025/2-ETAPA/GABARITO-PSC-2-ETAPA-2025.pdf` },
      etapa3: { prova: `${BASE}/PSC/2025/3-ETAPA/PROVA-PSC-3-ETAPA-2025.pdf`,    gabarito: `${BASE}/PSC/2025/3-ETAPA/GABARITO-PSC-3-ETAPA-2025.pdf` },
    },
    2024: {
      etapa1: { prova: `${BASE}/PSC/2024/1-ETAPA/PROVA-PSC-1-ETAPA-2024.pdf`,    gabarito: `${BASE}/PSC/2024/1-ETAPA/GABARITO-PSC-1-ETAPA-2024.pdf` },
      etapa2: { prova: `${BASE}/PSC/2024/2-ETAPA/PROVA-PSC-2-ETAPA-2024.pdf`,    gabarito: `${BASE}/PSC/2024/2-ETAPA/GABARITO-PSC-2-ETAPA-2024.pdf` },
      etapa3: { prova: `${BASE}/PSC/2024/3-ETAPA/PROVA-PSC-3-ETAPA-2024.pdf`,    gabarito: `${BASE}/PSC/2024/3-ETAPA/GABARITO-PSC-3-ETAPA-2024.pdf` },
    },
    2023: {
      etapa1: { prova: `${BASE}/PSC/2023/1-ETAPA/PROVA-PSC-1-ETAPA-2023.pdf`,    gabarito: `${BASE}/PSC/2023/1-ETAPA/GABARITO-PSC-1-ETAPA-2023.pdf` },
      etapa2: { prova: `${BASE}/PSC/2023/2-ETAPA/PROVA-PSC-2-ETAPA-2023.pdf`,    gabarito: `${BASE}/PSC/2023/2-ETAPA/GABARITO-PSC-2-ETAPA-2023.pdf` },
      etapa3: { prova: `${BASE}/PSC/2023/3-ETAPA/PROVA-PSC-3-ETAPA-2023.pdf`,    gabarito: `${BASE}/PSC/2023/3-ETAPA/GABARITO-PSC-3-ETAPA-2023.pdf` },
    },
    2022: {
      etapa1: { prova: `${BASE}/PSC/2022/1-ETAPA/PROVA-PSC-1-ETAPA-2022.pdf`,    gabarito: `${BASE}/PSC/2022/1-ETAPA/GABARITO-PSC-1-ETAPA-2022.pdf` },
      etapa2: { prova: `${BASE}/PSC/2022/2-ETAPA/PROVA-PSC-2-ETAPA-2022.pdf`,    gabarito: `${BASE}/PSC/2022/2-ETAPA/GABARITO-PSC-2-ETAPA-2022.pdf` },
      etapa3: { prova: `${BASE}/PSC/2022/3-ETAPA/PROVA-PSC-3-ETAPA-2022.pdf`,    gabarito: `${BASE}/PSC/2022/3-ETAPA/GABARITO-PSC-3-ETAPA-2022.pdf` },
    },
    2021: {
      etapa1: { prova: `${BASE}/PSC/2021/1-ETAPA/PROVA-PSC-1-ETAPA-2021.pdf`,    gabarito: `${BASE}/PSC/2021/1-ETAPA/GABARITO-PSC-1-ETAPA-2021.pdf` },
      etapa2: { prova: `${BASE}/PSC/2021/2-ETAPA/PROVA-PSC-2-ETAPA-2021.pdf`,    gabarito: `${BASE}/PSC/2021/2-ETAPA/GABARITO-PSC-2-ETAPA-2021.pdf` },
      etapa3: { prova: `${BASE}/PSC/2021/3-ETAPA/PROVA-PSC-3-ETAPA-2021.pdf`,    gabarito: `${BASE}/PSC/2021/3-ETAPA/GABARITO-PSC-3-ETAPA-2021.pdf` },
    },
    2020: {
      etapa1: { prova: `${BASE}/PSC/2020/1-ETAPA/PROVA-PSC-1-ETAPA-2020.pdf`,    gabarito: `${BASE}/PSC/2020/1-ETAPA/GABARITO-PSC-1-ETAPA-2020.pdf` },
      etapa2: { prova: `${BASE}/PSC/2020/2-ETAPA/PROVA-PSC-2-ETAPA-2020.pdf`,    gabarito: `${BASE}/PSC/2020/2-ETAPA/GABARITO-PSC-2-ETAPA-2020.pdf` },
      etapa3: { prova: `${BASE}/PSC/2020/3-ETAPA/PROVA-PSC-3-ETAPA-2020.pdf`,    gabarito: `${BASE}/PSC/2020/3-ETAPA/GABARITO-PSC-3-ETAPA-2020.pdf` },
    },
    2019: {
      etapa1: { prova: `${BASE}/PSC/2019/1-ETAPA/PROVA-PSC-1-ETAPA-2019.pdf`,    gabarito: `${BASE}/PSC/2019/1-ETAPA/GABARITO-PSC-1-ETAPA-2019.pdf` },
      etapa2: { prova: `${BASE}/PSC/2019/2-ETAPA/PROVA-PSC-2-ETAPA-2019.pdf`,    gabarito: `${BASE}/PSC/2019/2-ETAPA/GABARITO-PSC-2-ETAPA-2019.pdf` },
      etapa3: { prova: `${BASE}/PSC/2019/3-ETAPA/PROVA-PSC-3-ETAPA-2019.pdf`,    gabarito: `${BASE}/PSC/2019/3-ETAPA/GABARITO-PSC-3-ETAPA-2019.pdf` },
    },
    2018: {
      etapa1: { prova: `${BASE}/PSC/2018/1-ETAPA/PROVA-PSC-1-ETAPA-2018.pdf`,    gabarito: `${BASE}/PSC/2018/1-ETAPA/GABARITO-PSC-1-ETAPA-2018.pdf` },
      etapa2: { prova: `${BASE}/PSC/2018/2-ETAPA/PROVA-PSC-2-ETAPA-2018.pdf`,    gabarito: `${BASE}/PSC/2018/2-ETAPA/GABARITO-PSC-2-ETAPA-2018.pdf` },
      etapa3: { prova: `${BASE}/PSC/2018/3-ETAPA/PROVA-PSC-3-ETAPA-2018.pdf`,    gabarito: `${BASE}/PSC/2018/3-ETAPA/GABARITO-PSC-3-ETAPA-2018.pdf` },
    },
    2017: {
      etapa1: { prova: `${BASE}/PSC/2017/1-ETAPA/PROVA-PSC-1-ETAPA-2017.pdf`,    gabarito: `${BASE}/PSC/2017/1-ETAPA/GABARITO-PSC-1-ETAPA-2017.pdf` },
      etapa2: { prova: `${BASE}/PSC/2017/2-ETAPA/PROVA-PSC-2-ETAPA-2017.pdf`,    gabarito: `${BASE}/PSC/2017/2-ETAPA/GABARITO-PSC-2-ETAPA-2017.pdf` },
      etapa3: { prova: `${BASE}/PSC/2017/3-ETAPA/PROVA-PSC-3-ETAPA-2017.pdf`,    gabarito: `${BASE}/PSC/2017/3-ETAPA/GABARITO-PSC-3-ETAPA-2017.pdf` },
    },
    2016: {
      etapa1: { prova: `${BASE}/PSC/2016/1-ETAPA/PROVA-PSC-1-ETAPA-2016.pdf`,    gabarito: `${BASE}/PSC/2016/1-ETAPA/GABARITO-PSC-1-ETAPA-2016.pdf` },
      etapa2: { prova: `${BASE}/PSC/2016/2-ETAPA/PROVA-PSC-2-ETAPA-2016.pdf`,    gabarito: `${BASE}/PSC/2016/2-ETAPA/GABARITO-PSC-2-ETAPA-2016.pdf` },
      etapa3: { prova: `${BASE}/PSC/2016/3-ETAPA/PROVA-PSC-3-ETAPA-2016.pdf`,    gabarito: `${BASE}/PSC/2016/3-ETAPA/GABARITO-PSC-3-ETAPA-2016.pdf` },
    },
  },

  // ── SIS ───────────────────────────────────────────────────────────────────
  // Subpastas: 1-ETAPA/ 2-ETAPA/ 3-ETAPA/
  sis: {
    2025: {
      etapa1: { prova: `${BASE}/SIS/2025/1-ETAPA/PROVA-SIS-1-ETAPA-2025.pdf`,    gabarito: `${BASE}/SIS/2025/1-ETAPA/GABARITO-SIS-1-ETAPA-2025.pdf` },
      etapa2: { prova: `${BASE}/SIS/2025/2-ETAPA/PROVA-SIS-2-ETAPA-2025.pdf`,    gabarito: `${BASE}/SIS/2025/2-ETAPA/GABARITO-SIS-2-ETAPA-2025.pdf` },
      etapa3: { prova: `${BASE}/SIS/2025/3-ETAPA/PROVA-SIS-3-ETAPA-2025.pdf`,    gabarito: `${BASE}/SIS/2025/3-ETAPA/GABARITO-SIS-3-ETAPA-2025.pdf` },
    },
    2024: {
      etapa1: { prova: `${BASE}/SIS/2024/1-ETAPA/PROVA-SIS-1-ETAPA-2024.pdf`,    gabarito: `${BASE}/SIS/2024/1-ETAPA/GABARITO-SIS-1-ETAPA-2024.pdf` },
      etapa2: { prova: `${BASE}/SIS/2024/2-ETAPA/PROVA-SIS-2-ETAPA-2024.pdf`,    gabarito: `${BASE}/SIS/2024/2-ETAPA/GABARITO-SIS-2-ETAPA-2024.pdf` },
      etapa3: { prova: `${BASE}/SIS/2024/3-ETAPA/PROVA-SIS-3-ETAPA-2024.pdf`,    gabarito: `${BASE}/SIS/2024/3-ETAPA/GABARITO-SIS-3-ETAPA-2024.pdf` },
    },
    2023: {
      etapa1: { prova: `${BASE}/SIS/2023/1-ETAPA/PROVA-SIS-1-ETAPA-2023.pdf`,    gabarito: `${BASE}/SIS/2023/1-ETAPA/GABARITO-SIS-1-ETAPA-2023.pdf` },
      etapa2: { prova: `${BASE}/SIS/2023/2-ETAPA/PROVA-SIS-2-ETAPA-2023.pdf`,    gabarito: `${BASE}/SIS/2023/2-ETAPA/GABARITO-SIS-2-ETAPA-2023.pdf` },
      etapa3: { prova: `${BASE}/SIS/2023/3-ETAPA/PROVA-SIS-3-ETAPA-2023.pdf`,    gabarito: `${BASE}/SIS/2023/3-ETAPA/GABARITO-SIS-3-ETAPA-2023.pdf` },
    },
    2022: {
      etapa1: { prova: `${BASE}/SIS/2022/1-ETAPA/PROVA-SIS-1-ETAPA-2022.pdf`,    gabarito: `${BASE}/SIS/2022/1-ETAPA/GABARITO-SIS-1-ETAPA-2022.pdf` },
      etapa2: { prova: `${BASE}/SIS/2022/2-ETAPA/PROVA-SIS-2-ETAPA-2022.pdf`,    gabarito: `${BASE}/SIS/2022/2-ETAPA/GABARITO-SIS-2-ETAPA-2022.pdf` },
      etapa3: { prova: `${BASE}/SIS/2022/3-ETAPA/PROVA-SIS-3-ETAPA-2022.pdf`,    gabarito: `${BASE}/SIS/2022/3-ETAPA/GABARITO-SIS-3-ETAPA-2022.pdf` },
    },
    2021: {
      etapa1: { prova: `${BASE}/SIS/2021/1-ETAPA/PROVA-SIS-1-ETAPA-2021.pdf`,    gabarito: `${BASE}/SIS/2021/1-ETAPA/GABARITO-SIS-1-ETAPA-2021.pdf` },
      etapa2: { prova: `${BASE}/SIS/2021/2-ETAPA/PROVA-SIS-2-ETAPA-2021.pdf`,    gabarito: `${BASE}/SIS/2021/2-ETAPA/GABARITO-SIS-2-ETAPA-2021.pdf` },
      etapa3: { prova: `${BASE}/SIS/2021/3-ETAPA/PROVA-SIS-3-ETAPA-2021.pdf`,    gabarito: `${BASE}/SIS/2021/3-ETAPA/GABARITO-SIS-3-ETAPA-2021.pdf` },
    },
    2020: {
      etapa1: { prova: `${BASE}/SIS/2020/1-ETAPA/PROVA-SIS-1-ETAPA-2020.pdf`,    gabarito: `${BASE}/SIS/2020/1-ETAPA/GABARITO-SIS-1-ETAPA-2020.pdf` },
      etapa2: { prova: `${BASE}/SIS/2020/2-ETAPA/PROVA-SIS-2-ETAPA-2020.pdf`,    gabarito: `${BASE}/SIS/2020/2-ETAPA/GABARITO-SIS-2-ETAPA-2020.pdf` },
      etapa3: { prova: `${BASE}/SIS/2020/3-ETAPA/PROVA-SIS-3-ETAPA-2020.pdf`,    gabarito: `${BASE}/SIS/2020/3-ETAPA/GABARITO-SIS-3-ETAPA-2020.pdf` },
    },
    2019: {
      etapa1: { prova: `${BASE}/SIS/2019/1-ETAPA/PROVA-SIS-1-ETAPA-2019.pdf`,    gabarito: `${BASE}/SIS/2019/1-ETAPA/GABARITO-SIS-1-ETAPA-2019.pdf` },
      etapa2: { prova: `${BASE}/SIS/2019/2-ETAPA/PROVA-SIS-2-ETAPA-2019.pdf`,    gabarito: `${BASE}/SIS/2019/2-ETAPA/GABARITO-SIS-2-ETAPA-2019.pdf` },
      etapa3: { prova: `${BASE}/SIS/2019/3-ETAPA/PROVA-SIS-3-ETAPA-2019.pdf`,    gabarito: `${BASE}/SIS/2019/3-ETAPA/GABARITO-SIS-3-ETAPA-2019.pdf` },
    },
    2018: {
      etapa1: { prova: `${BASE}/SIS/2018/1-ETAPA/PROVA-SIS-1-ETAPA-2018.pdf`,    gabarito: `${BASE}/SIS/2018/1-ETAPA/GABARITO-SIS-1-ETAPA-2018.pdf` },
      etapa2: { prova: `${BASE}/SIS/2018/2-ETAPA/PROVA-SIS-2-ETAPA-2018.pdf`,    gabarito: `${BASE}/SIS/2018/2-ETAPA/GABARITO-SIS-2-ETAPA-2018.pdf` },
      etapa3: { prova: `${BASE}/SIS/2018/3-ETAPA/PROVA-SIS-3-ETAPA-2018.pdf`,    gabarito: `${BASE}/SIS/2018/3-ETAPA/GABARITO-SIS-3-ETAPA-2018.pdf` },
    },
    2017: {
      etapa1: { prova: `${BASE}/SIS/2017/1-ETAPA/PROVA-SIS-1-ETAPA-2017.pdf`,    gabarito: `${BASE}/SIS/2017/1-ETAPA/GABARITO-SIS-1-ETAPA-2017.pdf` },
      etapa2: { prova: `${BASE}/SIS/2017/2-ETAPA/PROVA-SIS-2-ETAPA-2017.pdf`,    gabarito: `${BASE}/SIS/2017/2-ETAPA/GABARITO-SIS-2-ETAPA-2017.pdf` },
      etapa3: { prova: `${BASE}/SIS/2017/3-ETAPA/PROVA-SIS-3-ETAPA-2017.pdf`,    gabarito: `${BASE}/SIS/2017/3-ETAPA/GABARITO-SIS-3-ETAPA-2017.pdf` },
    },
    2016: {
      etapa1: { prova: `${BASE}/SIS/2016/1-ETAPA/PROVA-SIS-1-ETAPA-2016.pdf`,    gabarito: `${BASE}/SIS/2016/1-ETAPA/GABARITO-SIS-1-ETAPA-2016.pdf` },
      etapa2: { prova: `${BASE}/SIS/2016/2-ETAPA/PROVA-SIS-2-ETAPA-2016.pdf`,    gabarito: `${BASE}/SIS/2016/2-ETAPA/GABARITO-SIS-2-ETAPA-2016.pdf` },
      etapa3: { prova: `${BASE}/SIS/2016/3-ETAPA/PROVA-SIS-3-ETAPA-2016.pdf`,    gabarito: `${BASE}/SIS/2016/3-ETAPA/GABARITO-SIS-3-ETAPA-2016.pdf` },
    },
  },

}; // fim bancoProvasPDFs
