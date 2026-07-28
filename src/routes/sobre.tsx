import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  Crown,
  Globe2,
  GraduationCap,
  Heart,
  Instagram,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import { AcademyShell } from "@/components/academy/AcademyShell";
import { Button } from "@/components/ui/button";
import heroCover from "@/assets/hero-academy.jpg";

interface Marco {
  readonly year: string;
  readonly title: string;
  readonly description: string;
}

interface Certificado {
  readonly title: string;
  readonly issuer: string;
  readonly detail: string;
}

interface Pais {
  readonly flag: string;
  readonly name: string;
  readonly context: string;
}

const NUMEROS: readonly { readonly value: string; readonly label: string }[] = [
  { value: "+15", label: "anos na área da beleza" },
  { value: "+3.000", label: "procedimentos realizados" },
  { value: "+800", label: "alunas formadas" },
  { value: "7", label: "países entre cursos e congressos" },
];

const TIMELINE: readonly Marco[] = [
  {
    year: "Início",
    title: "A primeira agulha",
    description:
      "Marli começou como esteticista, atendendo em casa, com um cliente por dia e a certeza de que técnica sem constância não constrói carreira.",
  },
  {
    year: "Especialização",
    title: "Da técnica à precisão",
    description:
      "Migrou para a micropigmentação e passou anos estudando visagismo, colorimetria e pele — entendendo que cada rosto pede um desenho diferente.",
  },
  {
    year: "Reconhecimento",
    title: "Estúdio próprio e autoridade",
    description:
      "Abriu o próprio estúdio, criou uma assinatura de trabalho reconhecida pelo acabamento natural e passou a ter agenda fechada com meses de antecedência.",
  },
  {
    year: "Formação",
    title: "Da cadeira para a sala de aula",
    description:
      "Começou a formar profissionais e descobriu que o maior impacto não estava em um rosto por vez, mas em cada aluna que passa a viver da profissão.",
  },
  {
    year: "Hoje",
    title: "Marli Teixeira Academy",
    description:
      "Transformou 15 anos de bancada em um método completo, gamificado e passo a passo — técnica, negócio e escala no mesmo lugar.",
  },
];

const CERTIFICADOS: readonly Certificado[] = [
  {
    title: "Micropigmentação de Sobrancelhas — Fio a Fio",
    issuer: "Formação técnica avançada",
    detail: "Desenho, visagismo aplicado e simetria facial.",
  },
  {
    title: "Shadow, Powder e Nanoblading",
    issuer: "Aperfeiçoamento técnico",
    detail: "Técnicas de esfumado e efeito maquiado de longa duração.",
  },
  {
    title: "Lip Blush e Micropigmentação Labial",
    issuer: "Especialização",
    detail: "Colorimetria labial, neutralização e cicatrização.",
  },
  {
    title: "Delineado e Micropigmentação de Olhos",
    issuer: "Especialização",
    detail: "Protocolos de segurança na área periocular.",
  },
  {
    title: "Colorimetria e Undertone da Pele",
    issuer: "Formação complementar",
    detail: "Leitura de subtom, correção e previsão de cicatrização.",
  },
  {
    title: "Remoção e Correção de Pigmentos",
    issuer: "Formação avançada",
    detail: "Trabalhos de correção em pigmentações mal executadas.",
  },
  {
    title: "Biossegurança e Boas Práticas",
    issuer: "Certificação sanitária",
    detail: "Esterilização, descarte e protocolos de atendimento.",
  },
  {
    title: "Formação de Formadores",
    issuer: "Didática técnica",
    detail: "Metodologia de ensino aplicada à área da beleza.",
  },
];

const PAISES: readonly Pais[] = [
  { flag: "🇧🇷", name: "Brasil", context: "Base do estúdio e das formações presenciais." },
  { flag: "🇵🇹", name: "Portugal", context: "Cursos e imersões com profissionais lusófonas." },
  { flag: "🇪🇸", name: "Espanha", context: "Atualização técnica e intercâmbio de método." },
  { flag: "🇮🇹", name: "Itália", context: "Congressos europeus de micropigmentação." },
  { flag: "🇺🇸", name: "Estados Unidos", context: "Feiras internacionais de beleza e PMU." },
  { flag: "🇦🇷", name: "Argentina", context: "Workshops e trocas técnicas na América Latina." },
  { flag: "🇵🇾", name: "Paraguai", context: "Formações e mentorias para profissionais da região." },
];

const VALORES: readonly { readonly icon: typeof Heart; readonly title: string; readonly text: string }[] =
  [
    {
      icon: Heart,
      title: "Naturalidade acima de tudo",
      text: "Nada de marca artificial. O resultado precisa parecer parte do rosto, não um enfeite nele.",
    },
    {
      icon: BadgeCheck,
      title: "Segurança inegociável",
      text: "Biossegurança, anamnese e protocolo antes de qualquer estética. Sem atalho.",
    },
    {
      icon: Target,
      title: "Técnica com negócio",
      text: "Saber pigmentar não paga as contas sozinho. Precificação, imagem e agenda fazem parte da formação.",
    },
    {
      icon: Users,
      title: "Aluna acompanhada",
      text: "Formação não termina no certificado. Termina quando a aluna está atendendo com confiança.",
    },
  ];

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Quem é Marli Teixeira | Trajetória, Certificações e Propósito" },
      {
        name: "description",
        content:
          "Conheça a trajetória de Marli Teixeira: mais de 15 anos em micropigmentação, certificações técnicas, formações em 7 países e o propósito por trás da Academy.",
      },
      { property: "og:title", content: "Quem é Marli Teixeira | Marli Teixeira Academy" },
      {
        property: "og:description",
        content:
          "História, certificações, países onde se formou e o propósito do projeto que já formou centenas de micropigmentadoras.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <AcademyShell>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroCover}
          alt="Marli Teixeira em atendimento de micropigmentação no estúdio"
          width={1600}
          height={912}
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "var(--gradient-veil)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-transparent" />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/50 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.3em] text-gold backdrop-blur">
            <Sparkles className="size-3" aria-hidden="true" />
            Quem está por trás
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-semibold text-foreground sm:text-5xl">
            Quem é <span className="text-gradient-gold">Marli Teixeira</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Micropigmentadora, formadora e empreendedora. Mais de 15 anos entre a bancada e a sala
            de aula, com uma obsessão só: resultado natural, seguro e que sustenta a carreira de
            quem executa.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="bg-gradient-gold text-primary-foreground hover:opacity-90">
              <Link to="/minha-rota">Começar minha formação</Link>
            </Button>
            <Button asChild variant="outline">
              <a
                href="https://www.instagram.com/marlitteixeiramicro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="size-4" aria-hidden="true" />
                @marlitteixeiramicro
              </a>
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl space-y-16 px-4 py-14 sm:px-6">
        {/* Números */}
        <section aria-label="Números da carreira">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {NUMEROS.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border/60 bg-card p-5 text-center shadow-luxe"
              >
                <p className="text-3xl font-semibold text-gradient-gold">{item.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* História */}
        <section className="space-y-6">
          <header className="max-w-2xl">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">A história</p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">
              De um atendimento por dia a uma escola de profissionais
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              A trajetória da Marli não começou com estrutura, nem com público. Começou com estudo
              obsessivo, muita repetição e a decisão de nunca entregar um trabalho do qual ela não
              se orgulhasse.
            </p>
          </header>

          <ol className="relative space-y-6 border-l border-gold/25 pl-6">
            {TIMELINE.map((marco) => (
              <li key={marco.title} className="relative">
                <span
                  className="absolute -left-[1.9rem] top-1.5 size-3 rounded-full bg-gradient-gold"
                  aria-hidden="true"
                />
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">{marco.year}</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{marco.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{marco.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Certificados */}
        <section className="space-y-6">
          <header className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold">
              <Award className="size-3.5" aria-hidden="true" />
              Formação e certificações
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">
              Cada técnica ensinada aqui foi antes estudada e executada
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Formações técnicas, especializações e atualizações que sustentam o método aplicado na
              Academy.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CERTIFICADOS.map((cert) => (
              <article
                key={cert.title}
                className="flex gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-luxe"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <GraduationCap className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">{cert.title}</h3>
                  <p className="mt-0.5 text-[0.7rem] uppercase tracking-[0.15em] text-gold">
                    {cert.issuer}
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground">{cert.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Países */}
        <section className="space-y-6">
          <header className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold">
              <Globe2 className="size-3.5" aria-hidden="true" />
              Presença internacional
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">
              Países onde estudou, ensinou e trocou método
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Congressos, imersões e formações fora do país mantêm o conteúdo da Academy alinhado
              com o que há de mais atual em PMU no mundo.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PAISES.map((pais) => (
              <article
                key={pais.name}
                className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-luxe"
              >
                <span className="text-2xl leading-none" aria-hidden="true">
                  {pais.flag}
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">{pais.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{pais.context}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Propósito */}
        <section className="space-y-6">
          <header className="max-w-2xl">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">O projeto</p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">
              Por que a Marli Teixeira Academy existe
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-gold/30 bg-card p-8 shadow-luxe lg:col-span-2">
              <p className="text-sm leading-relaxed text-muted-foreground">
                O mercado de micropigmentação está cheio de cursos de fim de semana que entregam um
                certificado e abandonam a aluna no dia seguinte. O resultado é sempre o mesmo:
                profissionais tecnicamente inseguras, cobrando barato, competindo por preço e
                desistindo em menos de um ano.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A Academy nasceu para quebrar esse ciclo. A proposta é organizar toda a formação em
                uma jornada gamificada — dos fundamentos e biossegurança às trilhas técnicas, e daí
                para construção de imagem, precificação e escala do negócio — para que a aluna
                evolua com clareza do que vem antes e do que vem depois.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground">
                O objetivo final não é formar mais uma micropigmentadora. É formar uma profissional
                que domina a técnica, tem confiança para cobrar o que vale e constrói uma carreira
                que se sustenta.
              </p>
            </div>

            <div className="space-y-4">
              {VALORES.map((valor) => (
                <article
                  key={valor.title}
                  className="rounded-2xl border border-border/60 bg-card p-5 shadow-luxe"
                >
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    <valor.icon className="size-4 text-gold" aria-hidden="true" />
                    {valor.title}
                  </span>
                  <p className="mt-2 text-xs text-muted-foreground">{valor.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="overflow-hidden rounded-3xl border border-gold/30 bg-card p-8 text-center shadow-luxe sm:p-12">
          <p className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold">
            <Crown className="size-3.5" aria-hidden="true" />
            Sua vez
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold text-foreground">
            A mesma trajetória, organizada em uma rota que você pode seguir
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Responda o diagnóstico inicial e a plataforma monta a ordem ideal dos módulos para o seu
            momento.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-gradient-gold text-primary-foreground hover:opacity-90">
              <Link to="/minha-rota">Descobrir minha rota</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Ver os módulos</Link>
            </Button>
          </div>
        </section>
      </div>
    </AcademyShell>
  );
}
