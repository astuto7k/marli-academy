import { createFileRoute, notFound } from "@tanstack/react-router";

import { AcademyShell } from "@/components/academy/AcademyShell";
import { ModuleCard } from "@/components/academy/ModuleCard";
import { useProgress } from "@/hooks/use-progress";
import { modules, nucleos, type NucleoId } from "@/data/academy";

export const Route = createFileRoute("/nucleo/$id")({
  loader: ({ params }) => {
    const found = nucleos.find((item) => item.id === params.id);
    if (!found) throw notFound();
    return { id: found.id };
  },
  head: ({ loaderData }) => {
    const found = nucleos.find((item) => item.id === loaderData?.id);
    const title = found
      ? `${found.label} | Marli Teixeira Academy`
      : "Núcleo | Marli Teixeira Academy";
    const description =
      found?.description ?? "Núcleo de conteúdo da Marli Teixeira Academy.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: NucleoPage,
});

function NucleoPage() {
  const { id } = Route.useLoaderData() as { id: NucleoId };
  const nucleo = nucleos.find((item) => item.id === id)!;
  const { hydrated, progressOf } = useProgress();
  const items = modules.filter((item) => item.nucleo === id);

  return (
    <AcademyShell>
      <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-12 sm:px-6">
        <header className="space-y-3">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">Núcleo</p>
          <h1 className="text-4xl font-semibold text-foreground">{nucleo.label}</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">{nucleo.description}</p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ModuleCard
              key={item.slug}
              module={item}
              percent={hydrated ? progressOf(item.slug).percent : 0}
            />
          ))}
        </div>
      </div>
    </AcademyShell>
  );
}
