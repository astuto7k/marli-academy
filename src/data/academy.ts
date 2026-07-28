import heroImage from "@/assets/hero-academy.jpg";
import browsImage from "@/assets/course-brows.jpg";
import lipsImage from "@/assets/course-lips.jpg";
import eyesImage from "@/assets/course-eyes.jpg";
import businessImage from "@/assets/course-business.jpg";

/**
 * Static catalog for the members area.
 * Kept in a single module so the UI stays presentational and the data
 * can later be swapped for a backend query without touching components.
 */

export interface Lesson {
  readonly id: string;
  readonly title: string;
  readonly duration: string;
  readonly completed: boolean;
}

export interface Module {
  readonly id: string;
  readonly title: string;
  readonly lessons: readonly Lesson[];
}

export interface Course {
  readonly slug: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly cover: string;
  readonly level: "Iniciante" | "Intermediário" | "Avançado";
  readonly totalLessons: number;
  readonly completedLessons: number;
  readonly hours: number;
  readonly modules: readonly Module[];
}

function progressOf(course: Course): number {
  if (course.totalLessons <= 0) return 0;
  return Math.round((course.completedLessons / course.totalLessons) * 100);
}

export const heroCover = heroImage;

export const courses: readonly Course[] = [
  {
    slug: "sobrancelhas-fio-a-fio",
    title: "Sobrancelhas Fio a Fio",
    tagline: "O traço que define uma carreira",
    description:
      "Do visagismo ao traço final: desenho, mapeamento, escolha de pigmento, profundidade de pele e cicatrização perfeita.",
    cover: browsImage,
    level: "Intermediário",
    totalLessons: 24,
    completedLessons: 17,
    hours: 9,
    modules: [
      {
        id: "m1",
        title: "Fundamentos e Visagismo",
        lessons: [
          { id: "l1", title: "Boas-vindas à Academy", duration: "06:12", completed: true },
          { id: "l2", title: "Anatomia do rosto e simetria", duration: "18:40", completed: true },
          { id: "l3", title: "Mapeamento com paquímetro", duration: "22:05", completed: true },
          { id: "l4", title: "Escolha de pigmento por subtom", duration: "15:33", completed: true },
        ],
      },
      {
        id: "m2",
        title: "Técnica na Pele",
        lessons: [
          { id: "l5", title: "Ângulo, pressão e profundidade", duration: "27:18", completed: true },
          { id: "l6", title: "Fios em pele oleosa", duration: "19:44", completed: false },
          { id: "l7", title: "Correção de falhas", duration: "24:01", completed: false },
        ],
      },
      {
        id: "m3",
        title: "Pós e Retoque",
        lessons: [
          { id: "l8", title: "Protocolo de cicatrização", duration: "12:50", completed: false },
          { id: "l9", title: "Retoque em 30 dias", duration: "16:27", completed: false },
        ],
      },
    ],
  },
  {
    slug: "lip-blush",
    title: "Lip Blush Premium",
    tagline: "Lábios com cor viva e natural",
    description:
      "Neutralização, contorno e esfumado de lábios com técnica indolor e resultado editorial.",
    cover: lipsImage,
    level: "Avançado",
    totalLessons: 18,
    completedLessons: 4,
    hours: 7,
    modules: [
      {
        id: "m1",
        title: "Colorimetria Labial",
        lessons: [
          { id: "l1", title: "Neutralizando melanina", duration: "20:10", completed: true },
          { id: "l2", title: "Montagem da cor ideal", duration: "17:22", completed: true },
        ],
      },
      {
        id: "m2",
        title: "Execução",
        lessons: [
          { id: "l3", title: "Contorno sem borda dura", duration: "25:40", completed: true },
          { id: "l4", title: "Esfumado em camadas", duration: "31:02", completed: true },
          { id: "l5", title: "Anestesia e conforto", duration: "13:15", completed: false },
        ],
      },
    ],
  },
  {
    slug: "delineado-olhos",
    title: "Delineado & Olhos",
    tagline: "Precisão milimétrica no olhar",
    description:
      "Delineado clássico, esfumado e preenchimento de cílios com segurança total na área ocular.",
    cover: eyesImage,
    level: "Avançado",
    totalLessons: 14,
    completedLessons: 0,
    hours: 5,
    modules: [
      {
        id: "m1",
        title: "Segurança na Área Ocular",
        lessons: [
          { id: "l1", title: "Assepsia e biossegurança", duration: "14:00", completed: false },
          { id: "l2", title: "Posicionamento e apoio", duration: "11:35", completed: false },
        ],
      },
      {
        id: "m2",
        title: "Traços",
        lessons: [
          { id: "l3", title: "Delineado clássico", duration: "23:48", completed: false },
          { id: "l4", title: "Esfumado smokey", duration: "26:19", completed: false },
        ],
      },
    ],
  },
  {
    slug: "negocio-de-alto-valor",
    title: "Negócio de Alto Valor",
    tagline: "Da agenda vazia à lista de espera",
    description:
      "Precificação, posicionamento, captação no Instagram e atendimento premium para lotar sua agenda.",
    cover: businessImage,
    level: "Iniciante",
    totalLessons: 21,
    completedLessons: 21,
    hours: 6,
    modules: [
      {
        id: "m1",
        title: "Posicionamento",
        lessons: [
          { id: "l1", title: "Definindo sua cliente ideal", duration: "15:00", completed: true },
          { id: "l2", title: "Identidade visual do estúdio", duration: "18:12", completed: true },
        ],
      },
      {
        id: "m2",
        title: "Vendas",
        lessons: [
          { id: "l3", title: "Precificação sem medo", duration: "21:30", completed: true },
          { id: "l4", title: "Fechando pelo direct", duration: "19:05", completed: true },
        ],
      },
    ],
  },
];

export const coursesWithProgress = courses.map((course) => ({
  ...course,
  progress: progressOf(course),
}));

export type CourseWithProgress = (typeof coursesWithProgress)[number];

export function getCourse(slug: string): CourseWithProgress | undefined {
  return coursesWithProgress.find((course) => course.slug === slug);
}

export interface LiveSession {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly time: string;
  readonly status: "Ao vivo" | "Agendada";
}

export const liveSessions: readonly LiveSession[] = [
  {
    id: "s1",
    title: "Mentoria coletiva: correção de trabalhos",
    date: "Toda terça",
    time: "20h00",
    status: "Agendada",
  },
  {
    id: "s2",
    title: "Plantão de dúvidas com Marli",
    date: "Quinta, 14/08",
    time: "19h30",
    status: "Ao vivo",
  },
];
