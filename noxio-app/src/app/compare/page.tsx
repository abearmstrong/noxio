import { Check, X, ArrowLeft, Zap } from "lucide-react";

const rows = [
  { feature: "Custom domain", noxio: true, polsia: false },
  { feature: "Existing codebase", noxio: true, polsia: false },
  { feature: "GitHub integration", noxio: true, polsia: false },
  { feature: "Niche expertise", noxio: true, polsia: false },
  { feature: "Private dashboard", noxio: true, polsia: false },
  { feature: "Price", noxio: "$49/mo", polsia: "$49/mo" },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-4">
          <a
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </a>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-white" />
            <span className="text-lg font-bold tracking-tight">noxio</span>
          </div>
        </div>
      </header>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Noxio vs. the competition
          </h1>
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="grid grid-cols-3 bg-secondary/80 px-6 py-4 font-medium text-sm">
              <span>Feature</span>
              <span className="text-center">Noxio</span>
              <span className="text-center text-muted-foreground">Polsia</span>
            </div>
            {rows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-3 px-6 py-4 border-t border-border/50 text-sm"
              >
                <span className="text-muted-foreground">{row.feature}</span>
                <span className="text-center">
                  {typeof row.noxio === "boolean" ? (
                    row.noxio ? (
                      <Check className="h-5 w-5 text-green-400 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-400 mx-auto" />
                    )
                  ) : (
                    row.noxio
                  )}
                </span>
                <span className="text-center">
                  {typeof row.polsia === "boolean" ? (
                    row.polsia ? (
                      <Check className="h-5 w-5 text-green-400 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-400 mx-auto" />
                    )
                  ) : (
                    <span className="text-muted-foreground">{row.polsia}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
