import browsImage from "@/assets/course-brows.jpg";
import lipsImage from "@/assets/course-lips.jpg";
import eyesImage from "@/assets/course-eyes.jpg";
import businessImage from "@/assets/course-business.jpg";
import heroImage from "@/assets/hero-academy.jpg";

/**
 * Conteúdo da Marli Teixeira Academy.
 *
 * Fiel ao documento de arquitetura: núcleos, módulos, entregáveis, desafios,
 * Desbloqueios Pro, gamificação (pontos / níveis / medalhas) e rotas.
 *
 * `status` reflete a ordem de produção recomendada:
 *  - "disponivel"  -> primeira versão (primeiro entregável)
 *  - "producao"    -> gravado depois das primeiras alunas
 */

export const heroCover = heroImage;

export type NucleoId = "comece-aqui" | "base" | "trilhas" | "negocio" | "escala";
export type ModuleStatus = "disponivel" | "producao";

export interface ProUnlock {
  readonly id: string;
  readonly title: string;
  readonly priceLabel: string;
  readonly priceFrom: number;
  readonly items: readonly string[];
}

export interface AcademyModule {
  readonly slug: string;
  readonly number: number;
  readonly nucleo: NucleoId;
  readonly title: string;
  readonly summary: string;
  readonly cover: string;
  readonly status: ModuleStatus;
  readonly lessons: readonly string[];
  readonly deliverables: readonly string[];
  readonly challenge?: string;
  readonly pro?: ProUnlock;
}

export interface Nucleo {
  readonly id: NucleoId;
  readonly label: string;
  readonly description: string;
}

export const nucleos: readonly Nucleo[] = [
  {
    id: "comece-aqui",
    label: "Comece por aqui",
    description: "Onboarding, diagnóstico e definição da sua rota de estudo.",
  },
  {
    id: "base",
    label: "Núcleo 1 · Base técnica obrigatória",
    description: "Fundamentos, pele, pigmentos, biossegurança e materiais.",
  },
  {
    id: "trilhas",
    label: "Núcleo 2 · Trilhas técnicas",
    description:
      "Cada trilha segue o mesmo padrão: fundamentos, avaliação, demonstração completa, cicatrização, retoque, erros comuns e desafio prático seguro.",
  },
  {
    id: "negocio",
    label: "Núcleo 3 · Construção do negócio",
    description: "Posicionamento, conteúdo, vendas, precificação e operação.",
  },
  {
    id: "escala",
    label: "Módulo final · Crescimento e escala",
    description: "Como crescer sem depender apenas do próprio tempo.",
  },
];

export const modules: readonly AcademyModule[] = [
  {
    slug: "comece-por-aqui",
    number: 0,
    nucleo: "comece-aqui",
    title: "Comece por aqui",
    summary: "Boas-vindas, uso da plataforma, escolha da rota e organização dos estudos.",
    cover: heroImage,
    status: "disponivel",
    lessons: [
      "Boas-vindas",
      "Como utilizar a plataforma",
      "Como escolher sua rota",
      "Diferença entre aprender e dominar uma técnica",
      "Como organizar os estudos",
      "Como praticar com responsabilidade",
      "Como funcionam os certificados",
      "Como participar da comunidade",
    ],
    deliverables: [
      "Mapa completo da formação",
      "Cronograma de estudos",
      "Checklist da aluna",
      "Diagnóstico de nível",
      "Plano de estudo de 30, 60 ou 90 dias",
    ],
    challenge: "Definir objetivo, rota e técnica inicial.",
    pro: {
      id: "planejador-estudos",
      title: "Planejador Profissional de Estudos",
      priceLabel: "R$27 a R$47",
      priceFrom: 27,
      items: [
        "Planner digital",
        "Agenda de prática",
        "Controle de evolução",
        "Diário de erros e aprendizados",
        "Quadro de metas",
      ],
    },
  },
  {
    slug: "fundamentos",
    number: 1,
    nucleo: "base",
    title: "Fundamentos da micropigmentação",
    summary: "Áreas de atuação, ética, limites e expectativas realistas de resultado.",
    cover: businessImage,
    status: "disponivel",
    lessons: [
      "O que é micropigmentação",
      "Áreas de atuação",
      "Procedimentos estéticos, corretivos e restauradores",
      "Perfil e postura profissional",
      "Ética",
      "Limites de atuação",
      "Expectativas realistas de resultado",
      "Principais erros de quem começa",
    ],
    deliverables: [
      "Glossário técnico",
      "Mapa das áreas de atuação",
      "Checklist de postura profissional",
      "Guia de expectativas para clientes",
      "Questionário de revisão",
    ],
    challenge: "Escolher quais serviços farão parte do portfólio inicial.",
    pro: {
      id: "mapa-carreira",
      title: "Mapa de Carreira Multitécnica",
      priceLabel: "R$47",
      priceFrom: 47,
      items: [
        "Plano para iniciantes",
        "Plano para profissionais",
        "Sequência recomendada de especialização",
        "Simulação de portfólio",
        "Escolha estratégica dos primeiros serviços",
      ],
    },
  },
  {
    slug: "pele-e-pigmentologia",
    number: 2,
    nucleo: "base",
    title: "Pele, pigmentologia e cicatrização",
    summary: "Colorimetria, pigmentos, cicatrização e identificação de casos inadequados.",
    cover: lipsImage,
    status: "disponivel",
    lessons: [
      "Estrutura da pele",
      "Tipos e condições de pele",
      "Colorimetria",
      "Pigmentologia",
      "Cicatrização",
      "Alterações de tonalidade",
      "Fatores que interferem no resultado",
      "Identificação de casos inadequados",
      "Erros de cor",
      "Cuidados e acompanhamento",
    ],
    deliverables: [
      "Mapa de colorimetria",
      "Tabela de pigmentos",
      "Ficha de avaliação de pele",
      "Guia de cicatrização",
      "Estudos de caso",
      "Questionário",
    ],
    challenge: "Analisar casos simulados e justificar a decisão técnica.",
    pro: {
      id: "biblioteca-colorimetria",
      title: "Biblioteca Avançada de Colorimetria",
      priceLabel: "R$97 a R$147",
      priceFrom: 97,
      items: [
        "Casos complexos",
        "Correções comentadas",
        "Alterações de pigmento",
        "Combinações de cores",
        "Análise de resultados cicatrizados",
        "Aulas de erros reais",
      ],
    },
  },
  {
    slug: "biosseguranca",
    number: 3,
    nucleo: "base",
    title: "Biossegurança e atendimento seguro",
    summary: "Ambiente, anamnese, consentimento, registro e conduta diante de reações.",
    cover: businessImage,
    status: "disponivel",
    lessons: [
      "Preparação do ambiente",
      "Higienização",
      "Equipamentos de proteção",
      "Materiais descartáveis",
      "Prevenção de contaminação",
      "Anamnese",
      "Contraindicações",
      "Termo de consentimento",
      "Registro fotográfico",
      "Orientação pré e pós-procedimento",
      "Conduta diante de reações",
      "Organização documental",
    ],
    deliverables: [
      "Checklist de biossegurança",
      "Modelo de anamnese",
      "Modelo de consentimento",
      "Ficha de acompanhamento",
      "Guia pré e pós-procedimento",
      "Checklist de preparação da bancada",
    ],
    challenge: "Montar uma bancada simulada seguindo o checklist.",
    pro: {
      id: "kit-documentos",
      title: "Kit Documentos Profissionais",
      priceLabel: "R$47 a R$97",
      priceFrom: 47,
      items: [
        "Documentos editáveis",
        "Políticas de agendamento",
        "Termos de uso de imagem",
        "Ficha de retorno",
        "Controle de materiais",
        "Registro de lote e validade",
        "Modelos de mensagens de orientação",
      ],
    },
  },
  {
    slug: "materiais-e-equipamentos",
    number: 4,
    nucleo: "base",
    title: "Materiais e equipamentos",
    summary: "Dermógrafos, agulhas, pigmentos, kit inicial e custos.",
    cover: businessImage,
    status: "disponivel",
    lessons: [
      "Equipamentos",
      "Dermógrafos e máquinas",
      "Agulhas",
      "Pigmentos",
      "Materiais descartáveis",
      "Como montar o kit inicial",
      "Como evitar compras desnecessárias",
      "Organização e conservação",
      "Critérios para escolher fornecedores",
      "Custos iniciais",
    ],
    deliverables: [
      "Lista de materiais",
      "Kit essencial",
      "Kit intermediário",
      "Kit avançado",
      "Comparativo de equipamentos",
      "Planilha de investimento inicial",
    ],
    challenge: "Montar seu próprio orçamento de equipamentos.",
    pro: {
      id: "montagem-espaco",
      title: "Guia de Montagem do Espaço Profissional",
      priceLabel: "R$67 a R$127",
      priceFrom: 67,
      items: [
        "Lista completa de estrutura",
        "Organização da sala",
        "Iluminação para fotos",
        "Controle de estoque",
        "Fornecedores sugeridos pela expert",
        "Checklist de abertura do espaço",
      ],
    },
  },
  {
    slug: "camuflagem-de-cicatrizes",
    number: 5,
    nucleo: "trilhas",
    title: "Camuflagem de cicatrizes e estrias",
    summary: "Avaliação de tonalidade, seleção de casos, demonstrações e retoque.",
    cover: browsImage,
    status: "disponivel",
    lessons: [
      "Tipos de cicatrizes",
      "Casos indicados",
      "Casos não indicados",
      "Avaliação de tonalidade",
      "Escolha dos pigmentos",
      "Preparação",
      "Demonstrações em modelos",
      "Cuidados",
      "Cicatrização",
      "Retoque",
      "Registro fotográfico",
    ],
    deliverables: [
      "Ficha específica de avaliação",
      "Checklist de materiais",
      "Guia de cores",
      "Roteiro de atendimento",
      "Orientações pré e pós",
      "Estudos de casos",
    ],
    challenge: "Montar o planejamento completo de um caso apresentado na plataforma.",
    pro: {
      id: "lab-cicatrizes",
      title: "Laboratório Avançado de Cicatrizes",
      priceLabel: "R$147 a R$297",
      priceFrom: 147,
      items: [
        "Casos complexos",
        "Diferentes tonalidades de pele",
        "Cicatrizes cirúrgicas",
        "Correções",
        "Resultados cicatrizados",
        "Análise técnica da Marli",
        "Biblioteca atualizada de casos",
      ],
    },
  },
  {
    slug: "camuflagem-de-olheiras",
    number: 6,
    nucleo: "trilhas",
    title: "Camuflagem de olheiras",
    summary: "Tipos de olheiras, seleção segura, limites da técnica e cicatrização.",
    cover: eyesImage,
    status: "disponivel",
    lessons: [
      "Tipos de olheiras",
      "Avaliação da pele",
      "Seleção segura",
      "Pigmentos",
      "Preparação",
      "Demonstração completa",
      "Limites da técnica",
      "Cicatrização",
      "Retoque",
      "Erros comuns",
    ],
    deliverables: [
      "Ficha de avaliação",
      "Guia de seleção de casos",
      "Mapa de tonalidades",
      "Checklist",
      "Guia de fotografias",
      "Perguntas frequentes de clientes",
    ],
    pro: {
      id: "casos-olheiras",
      title: "Casos Avançados de Olheiras",
      priceLabel: "R$127 a R$247",
      priceFrom: 127,
      items: [
        "Casos difíceis",
        "Correções",
        "Diferenças entre tonalidades",
        "Resultados cicatrizados",
        "Comunicação de expectativas",
        "Como evitar promessas irreais",
      ],
    },
  },
  {
    slug: "micropigmentacao-capilar",
    number: 7,
    nucleo: "trilhas",
    title: "Micropigmentação capilar",
    summary: "Linha frontal, densidade, efeito natural e atendimento masculino.",
    cover: heroImage,
    status: "disponivel",
    lessons: [
      "Avaliação do couro cabeludo",
      "Tipos de queda",
      "Indicações",
      "Contraindicações",
      "Construção da linha frontal",
      "Densidade",
      "Distribuição",
      "Efeito natural",
      "Demonstrações",
      "Atendimento ao público masculino",
      "Fotografia",
      "Cicatrização e retoque",
    ],
    deliverables: [
      "Ficha de avaliação capilar",
      "Modelos de linha frontal",
      "Checklist de materiais",
      "Guia fotográfico",
      "Roteiro de atendimento masculino",
      "Tabela de sessões",
    ],
    pro: {
      id: "metodo-capilar",
      title: "Método Capilar Avançado",
      priceLabel: "R$197 a R$397",
      priceFrom: 197,
      items: [
        "Linhas frontais complexas",
        "Técnicas de densidade",
        "Diferentes graus de queda",
        "Casos comentados",
        "Como vender planos de sessões",
        "Como criar parcerias com clínicas e barbeiros",
      ],
    },
  },
  {
    slug: "reconstrucao-de-areolas",
    number: 8,
    nucleo: "trilhas",
    title: "Reconstrução de aréolas",
    summary: "Acolhimento, simetria, efeito tridimensional e comunicação sensível.",
    cover: lipsImage,
    status: "disponivel",
    lessons: [
      "Avaliação do caso",
      "Acolhimento e comunicação",
      "Desenho",
      "Simetria",
      "Construção de efeito tridimensional",
      "Pigmentos",
      "Demonstrações",
      "Cuidados com peles sensibilizadas",
      "Cicatrização",
      "Contraindicações",
      "Relacionamento responsável com profissionais da saúde",
    ],
    deliverables: [
      "Ficha de avaliação",
      "Guia de desenho e simetria",
      "Mapa de cores",
      "Checklist de atendimento",
      "Guia de comunicação sensível",
      "Orientações de acompanhamento",
    ],
    pro: {
      id: "masterclass-areola",
      title: "Masterclass Aréola Realista",
      priceLabel: "R$197 a R$397",
      priceFrom: 197,
      items: [
        "Casos unilaterais e bilaterais",
        "Efeito tridimensional avançado",
        "Correções",
        "Diferentes tons de pele",
        "Casos cicatrizados",
        "Fotografia",
        "Construção de parcerias com clínicas",
      ],
    },
  },
  {
    slug: "sobrancelhas",
    number: 9,
    nucleo: "trilhas",
    title: "Sobrancelhas como bônus",
    summary: "Design, simetria, correções e sobrancelha como serviço de entrada.",
    cover: browsImage,
    status: "disponivel",
    lessons: [
      "Design",
      "Simetria",
      "Fundamentos técnicos",
      "Demonstração",
      "Correções",
      "Cicatrização",
      "Sobrancelha como serviço de entrada",
      "Como transformar cliente de sobrancelha em cliente de outros serviços",
    ],
    deliverables: [
      "Mapa de design",
      "Checklist",
      "Ficha",
      "Guia de simetria",
      "Scripts de oferta complementar",
    ],
    pro: {
      id: "correcoes-neutralizacoes",
      title: "Correções e Neutralizações",
      priceLabel: "R$97 a R$197",
      priceFrom: 97,
      items: [
        "Casos antigos",
        "Correção de cor",
        "Correção de desenho",
        "Planejamento de sessões",
        "Casos comentados",
      ],
    },
  },
  {
    slug: "posicionamento",
    number: 10,
    nucleo: "negocio",
    title: "Posicionamento e imagem profissional",
    summary: "Instagram, bio, destaques, portfólio, provas e parcerias.",
    cover: businessImage,
    status: "disponivel",
    lessons: [
      "Como escolher um posicionamento",
      "Como construir uma imagem profissional",
      "Como definir os serviços principais",
      "Como organizar o Instagram",
      "Bio e destaques",
      "Identidade visual básica",
      "Como demonstrar autoridade",
      "Como produzir provas",
      "Como pedir depoimentos",
      "Como contar histórias de clientes",
      "Como construir um portfólio",
      "Como se diferenciar",
      "Como criar parcerias",
      "Como ser percebida como especialista",
    ],
    deliverables: [
      "Checklist de posicionamento",
      "Modelo de bio",
      "Estrutura de destaques",
      "Guia de portfólio",
      "Roteiros para apresentação",
      "Banco de provas sociais",
      "Calendário de conteúdo",
      "Modelo de proposta para parcerias",
    ],
    challenge: "Reestruturar perfil, bio, destaques e portfólio.",
    pro: {
      id: "aceleracao-autoridade",
      title: "Aceleração de Autoridade",
      priceLabel: "R$197 a R$397",
      priceFrom: 197,
      items: [
        "Plano de autoridade de 30 dias",
        "Roteiros de vídeos",
        "Hooks",
        "Calendário completo",
        "Posicionamento por técnica",
        "Estratégia de parcerias",
        "Como conseguir convites, eventos e palestras",
        "Como criar uma aula ou workshop local",
      ],
    },
  },
  {
    slug: "conteudo-e-clientes",
    number: 11,
    nucleo: "negocio",
    title: "Conteúdo e aquisição de clientes",
    summary: "Reels, hooks, produção em lote, indicações e tráfego local.",
    cover: eyesImage,
    status: "disponivel",
    lessons: [
      "Tipos de conteúdo",
      "Conteúdo de autoridade",
      "Conteúdo de prova",
      "Conteúdo de objeção",
      "Conteúdo de desejo",
      "Como gravar Reels",
      "Hooks",
      "Chamadas para ação",
      "Conteúdo para cada procedimento",
      "Como produzir em lote",
      "Indicações",
      "Parcerias locais",
      "WhatsApp",
      "Tráfego pago básico",
      "Como avaliar se uma campanha trouxe clientes",
    ],
    deliverables: [
      "Calendário de 30 dias",
      "Banco de 100 ideias",
      "Modelos de hooks",
      "Roteiros",
      "Chamadas para ação",
      "Planejamento de conteúdo em lote",
      "Planilha de acompanhamento",
    ],
    pro: {
      id: "maquina-conteudo",
      title: "Máquina de Conteúdo e Clientes",
      priceLabel: "R$197 a R$397",
      priceFrom: 197,
      items: [
        "Calendário de 90 dias",
        "Biblioteca de anúncios",
        "Roteiros por técnica",
        "Campanhas sazonais",
        "Estratégia de indicação",
        "Plano de parcerias",
        "Estrutura de uma campanha local",
      ],
    },
  },
  {
    slug: "atendimento-e-vendas",
    number: 12,
    nucleo: "negocio",
    title: "Atendimento e vendas",
    summary: "WhatsApp, objeções, follow-up, confirmação e pós-venda.",
    cover: businessImage,
    status: "disponivel",
    lessons: [
      "Atendimento pelo WhatsApp",
      "Qualificação",
      "Apresentação do procedimento",
      "Como falar de preço",
      "Objeções",
      "Follow-up",
      "Sinal de reserva",
      "Confirmação",
      "Redução de faltas",
      "Pós-venda",
      "Indicação",
      "Reativação de clientes antigas",
      "Oferta de procedimentos complementares",
    ],
    deliverables: [
      "Scripts de WhatsApp",
      "Respostas para objeções",
      "Mensagens de follow-up",
      "Sequência de confirmação",
      "Pós-venda",
      "Pedido de indicação",
      "Campanha de reativação",
    ],
    pro: {
      id: "funil-whatsapp",
      title: "Funil de WhatsApp Pronto",
      priceLabel: "R$147 a R$297",
      priceFrom: 147,
      items: [
        "Mensagens editáveis",
        "Sequências automáticas",
        "Qualificação",
        "Recuperação",
        "Confirmação",
        "Pós-venda",
        "Reativação",
        "Scripts por procedimento",
      ],
    },
  },
  {
    slug: "precificacao-agenda-10k",
    number: 13,
    nucleo: "negocio",
    title: "Precificação e Agenda 10K",
    summary: "Custos, margem, ticket médio, pacotes e plano de faturamento.",
    cover: businessImage,
    status: "disponivel",
    lessons: [
      "Custos",
      "Preço mínimo",
      "Margem",
      "Ticket médio",
      "Retoques",
      "Pacotes",
      "Metas",
      "Número de atendimentos",
      "Combinação de procedimentos",
      "Organização financeira",
      "Reinvestimento",
      "Construção de um plano para buscar R$10 mil mensais",
    ],
    deliverables: [
      "Calculadora de preço",
      "Planilha de custos",
      "Simulador de agenda",
      "Meta mensal",
      "Controle financeiro",
      "Plano de faturamento",
    ],
    pro: {
      id: "desafio-agenda-10k",
      title: "Desafio Agenda 10K",
      priceLabel: "R$197 a R$397",
      priceFrom: 197,
      items: [
        "Plano de 30 dias",
        "Metas semanais",
        "Campanhas",
        "Conteúdo",
        "Scripts",
        "Indicadores",
        "Acompanhamento coletivo opcional",
      ],
    },
  },
  {
    slug: "estruturacao-da-operacao",
    number: 14,
    nucleo: "negocio",
    title: "Estruturação da operação",
    summary: "Jornada da cliente, processos, políticas, indicadores e delegação.",
    cover: businessImage,
    status: "disponivel",
    lessons: [
      "Jornada da cliente",
      "Organização da agenda",
      "Cadastro",
      "Pagamentos",
      "Estoque",
      "Processos",
      "Políticas",
      "Indicadores",
      "Organização da semana",
      "Separação entre atendimento, conteúdo e gestão",
      "Primeiras contratações",
      "Como delegar atividades administrativas",
    ],
    deliverables: [
      "Fluxograma operacional",
      "Planilha de clientes",
      "Controle de estoque",
      "Agenda semanal",
      "Manual de atendimento",
      "Política de cancelamento",
      "Painel de métricas",
    ],
    pro: {
      id: "operacao-profissional",
      title: "Operação Profissional",
      priceLabel: "R$197 a R$397",
      priceFrom: 197,
      items: [
        "Procedimentos operacionais",
        "Manual de equipe",
        "Checklist de contratação",
        "Treinamento de assistente",
        "Controle de produtividade",
        "Estrutura de gestão",
      ],
    },
  },
  {
    slug: "crescimento-e-escala",
    number: 15,
    nucleo: "escala",
    title: "Como crescer sem depender apenas do próprio tempo",
    summary: "Ticket, capacidade, recorrência, processos e plano de 90 dias.",
    cover: heroImage,
    status: "disponivel",
    lessons: [
      "O que significa escalar uma operação",
      "Quando a profissional está pronta para crescer",
      "Como aumentar o ticket",
      "Como ampliar a capacidade",
      "Como organizar horários",
      "Como escolher os serviços mais lucrativos",
      "Como criar pacotes",
      "Como gerar recorrência e indicação",
      "Como contratar apoio",
      "Como documentar processos",
      "Como criar workshops",
      "Como transformar conhecimento em uma nova fonte de receita",
      "Como criar metas de crescimento",
      "Plano de 90 dias",
    ],
    deliverables: [
      "Diagnóstico de maturidade",
      "Plano de crescimento",
      "Simulador de capacidade",
      "Plano de contratação",
      "Mapa de processos",
      "Planejamento de 90 dias",
    ],
    challenge: "Montar o plano de implementação de 90 dias.",
  },
];

/** Desbloqueio premium final — vendido separadamente do curso principal. */
export const sistema20k = {
  id: "sistema-operacao-20k",
  title: "Sistema Operação 20K",
  priceLabel: "Produto premium",
  positioning:
    "Estruture uma operação de aquisição, atendimento e acompanhamento preparada para buscar faturamentos acima de R$20 mil mensais, sem depender exclusivamente de mensagens manuais e indicações.",
  disclaimer:
    "Os resultados dependem de preço, demanda, execução, localização, investimento e conversão. É um sistema de estruturação, não uma garantia de faturamento.",
  parts: [
    { title: "Parte 1 · Matemática da meta", items: ["Ticket médio", "Capacidade semanal", "Margem", "Meta de leads", "Taxas de agendamento, comparecimento e recompra"] },
    { title: "Parte 2 · Oferta", items: ["Serviço principal", "Oferta de entrada", "Serviços complementares", "Pacotes", "Aumento de ticket", "Campanhas sazonais"] },
    { title: "Parte 3 · Aquisição previsível", items: ["Conteúdo", "Anúncios locais", "Indicação", "Parcerias", "Reativação"] },
    { title: "Parte 4 · Automação", items: ["Captura", "Qualificação", "Follow-up", "Confirmação", "Lembrete", "Pós-venda", "Reativação", "Pedido de indicação"] },
    { title: "Parte 5 · Operação", items: ["Agenda", "Capacidade", "Processos", "Assistente", "Métricas", "Rotina semanal"] },
    { title: "Parte 6 · Escala", items: ["Quando aumentar anúncios", "Quando contratar", "Quando aumentar preço", "Quando abrir segunda agenda", "Quando lançar workshop", "Como sair do operacional"] },
  ],
} as const;

export const passePro = {
  title: "Passe Pro",
  description:
    "Libera todos os Desbloqueios Pro da plataforma por um único valor: bibliotecas avançadas, kits de documentos, guias, funis, planners, desafios e o Sistema Operação 20K gravado.",
  priceWithCourse: "R$397 na compra junto ao curso",
  priceInside: "R$497 a R$697 dentro da plataforma",
  note: "Laboratórios ao vivo e o presencial continuam separados.",
} as const;

/* ------------------------------ Gamificação ------------------------------ */

export interface Level {
  readonly level: number;
  readonly name: string;
  readonly criteria: string;
  readonly minPoints: number;
}

export const levels: readonly Level[] = [
  { level: 1, name: "Exploradora", criteria: "Entrou na formação e definiu sua rota.", minPoints: 0 },
  { level: 2, name: "Base Profissional", criteria: "Concluiu fundamentos, pele e biossegurança.", minPoints: 300 },
  { level: 3, name: "Técnica em Desenvolvimento", criteria: "Concluiu uma trilha técnica.", minPoints: 700 },
  { level: 4, name: "Multitécnica", criteria: "Concluiu pelo menos três trilhas.", minPoints: 1200 },
  { level: 5, name: "Profissional de Autoridade", criteria: "Concluiu posicionamento, conteúdo e vendas.", minPoints: 1800 },
  { level: 6, name: "Operação em Crescimento", criteria: "Concluiu organização, precificação e escala.", minPoints: 2500 },
  { level: 7, name: "Elite Marli", criteria: "Concluiu toda a formação, avaliações e plano de 90 dias.", minPoints: 3200 },
];

export interface Medal {
  readonly id: string;
  readonly name: string;
  readonly moduleSlug?: string;
  readonly hint: string;
}

export const medals: readonly Medal[] = [
  { id: "base-solida", name: "Base Sólida", moduleSlug: "fundamentos", hint: "Conclua os Fundamentos" },
  { id: "seguranca-primeiro", name: "Segurança Primeiro", moduleSlug: "biosseguranca", hint: "Conclua Biossegurança" },
  { id: "esp-cicatrizes", name: "Especialista em Cicatrizes", moduleSlug: "camuflagem-de-cicatrizes", hint: "Conclua a trilha de cicatrizes" },
  { id: "esp-olheiras", name: "Especialista em Olheiras", moduleSlug: "camuflagem-de-olheiras", hint: "Conclua a trilha de olheiras" },
  { id: "esp-capilar", name: "Especialista Capilar", moduleSlug: "micropigmentacao-capilar", hint: "Conclua a trilha capilar" },
  { id: "esp-areolas", name: "Especialista em Aréolas", moduleSlug: "reconstrucao-de-areolas", hint: "Conclua a trilha de aréolas" },
  { id: "portfolio", name: "Portfólio Profissional", moduleSlug: "posicionamento", hint: "Conclua Posicionamento" },
  { id: "primeira-venda", name: "Primeira Venda", moduleSlug: "atendimento-e-vendas", hint: "Conclua Atendimento e vendas" },
  { id: "agenda-organizada", name: "Agenda Organizada", moduleSlug: "estruturacao-da-operacao", hint: "Conclua Estruturação da operação" },
  { id: "autoridade", name: "Autoridade em Construção", moduleSlug: "conteudo-e-clientes", hint: "Conclua Conteúdo e clientes" },
  { id: "operacao-10k", name: "Operação 10K", moduleSlug: "precificacao-agenda-10k", hint: "Conclua Precificação e Agenda 10K" },
  { id: "operacao-20k", name: "Operação 20K", moduleSlug: "crescimento-e-escala", hint: "Conclua Crescimento e escala" },
];

export const MEDALS_DISCLAIMER =
  "As medalhas representam progresso dentro da plataforma e não devem ser apresentadas como certificação profissional oficial.";

/* ------------------------------ Rotas / diagnóstico ------------------------------ */

export type RotaId = "iniciante" | "beleza" | "micro" | "negocio";

export interface Rota {
  readonly id: RotaId;
  readonly name: string;
  readonly description: string;
  readonly order: readonly string[];
}

export const rotas: readonly Rota[] = [
  {
    id: "iniciante",
    name: "Rota Iniciante",
    description: "Começando do zero: base técnica completa antes de qualquer trilha.",
    order: ["comece-por-aqui", "fundamentos", "pele-e-pigmentologia", "biosseguranca", "materiais-e-equipamentos", "sobrancelhas", "posicionamento"],
  },
  {
    id: "beleza",
    name: "Rota Profissional da Beleza",
    description: "Já atua na beleza: base rápida, técnica de entrada e captação de clientes.",
    order: ["comece-por-aqui", "fundamentos", "pele-e-pigmentologia", "biosseguranca", "sobrancelhas", "posicionamento", "atendimento-e-vendas"],
  },
  {
    id: "micro",
    name: "Rota Micropigmentadora",
    description: "Já é micropigmentadora: foco em trilhas técnicas e ampliação de serviços.",
    order: ["comece-por-aqui", "pele-e-pigmentologia", "camuflagem-de-cicatrizes", "sobrancelhas", "posicionamento", "precificacao-agenda-10k"],
  },
  {
    id: "negocio",
    name: "Rota Negócio e Escala",
    description: "Tem técnica, falta operação: posicionamento, vendas, preço e escala.",
    order: ["comece-por-aqui", "posicionamento", "atendimento-e-vendas", "precificacao-agenda-10k", "crescimento-e-escala"],
  },
];

export interface DiagnosticOption {
  readonly label: string;
  readonly rota: RotaId;
}

export interface DiagnosticQuestion {
  readonly id: string;
  readonly question: string;
  readonly options: readonly DiagnosticOption[];
}

export const diagnostic: readonly DiagnosticQuestion[] = [
  {
    id: "q1",
    question: "Qual frase descreve melhor o seu momento hoje?",
    options: [
      { label: "Estou começando do zero", rota: "iniciante" },
      { label: "Já trabalho na área da beleza", rota: "beleza" },
      { label: "Já trabalho com micropigmentação", rota: "micro" },
      { label: "Já atendo e quero crescer o faturamento", rota: "negocio" },
    ],
  },
  {
    id: "q2",
    question: "Qual é o seu principal objetivo agora?",
    options: [
      { label: "Aprender a técnica com segurança", rota: "iniciante" },
      { label: "Adicionar micropigmentação aos meus serviços", rota: "beleza" },
      { label: "Dominar novas técnicas", rota: "micro" },
      { label: "Conseguir mais clientes e aumentar o faturamento", rota: "negocio" },
    ],
  },
  {
    id: "q3",
    question: "Como está sua estrutura?",
    options: [
      { label: "Ainda não tenho equipamentos", rota: "iniciante" },
      { label: "Tenho espaço, mas não os equipamentos", rota: "beleza" },
      { label: "Tenho equipamentos e atendo eventualmente", rota: "micro" },
      { label: "Atendo com agenda ativa", rota: "negocio" },
    ],
  },
  {
    id: "q4",
    question: "Qual sua meta para os próximos seis meses?",
    options: [
      { label: "Fazer meus primeiros procedimentos", rota: "iniciante" },
      { label: "Formar minha primeira carteira de clientes", rota: "beleza" },
      { label: "Me especializar em mais de uma técnica", rota: "micro" },
      { label: "Estruturar uma operação de R$10K+", rota: "negocio" },
    ],
  },
];

/* ------------------------------ Helpers ------------------------------ */

export const POINTS = {
  lesson: 10,
  module: 60,
  challenge: 40,
} as const;

export function getModule(slug: string): AcademyModule | undefined {
  return modules.find((item) => item.slug === slug);
}

export function getRota(id: RotaId): Rota {
  return rotas.find((rota) => rota.id === id) ?? rotas[0];
}

export const proUnlocks: readonly (ProUnlock & { moduleSlug: string; moduleTitle: string })[] =
  modules
    .filter((item): item is AcademyModule & { pro: ProUnlock } => Boolean(item.pro))
    .map((item) => ({ ...item.pro, moduleSlug: item.slug, moduleTitle: item.title }));

export function levelForPoints(points: number): Level {
  return [...levels].reverse().find((level) => points >= level.minPoints) ?? levels[0];
}

export function nextLevelForPoints(points: number): Level | undefined {
  return levels.find((level) => level.minPoints > points);
}
