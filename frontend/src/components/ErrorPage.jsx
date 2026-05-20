import { useNavigate } from "react-router-dom";
import {
  WifiOff,
  Lock,
  ServerCrash,
  FileQuestion,
  Clock,
  Wrench,
  RotateCcw,
  Home,
  LogIn,
  ChevronLeft,
  Headphones,
  Activity,
  Flag,
} from "lucide-react";

// ─── Configurazioni ───────────────────────────────────────────────────────────

const ERROR_CONFIGS = {
  "404": {
    code: "404",
    label: "404",
    badge: "Pagina non trovata",
    theme: "warning",
    Icon: FileQuestion,
    defaultTitle: "Questa pagina non esiste",
    defaultDesc: "La pagina che cerchi potrebbe essere stata spostata o eliminata. Controlla l'URL o torna alla home.",
    actions: ["home", "report"],
  },
  "403": {
    code: "403",
    label: "403",
    badge: "Accesso negato",
    theme: "error",
    Icon: Lock,
    defaultTitle: "Non hai i permessi necessari",
    defaultDesc: "Non sei autorizzato ad accedere a questa risorsa. Contatta il tuo amministratore se pensi sia un errore.",
    actions: ["login", "back"],
  },
  "500": {
    code: "500",
    label: "500",
    badge: "Errore del server",
    theme: "error",
    Icon: ServerCrash,
    defaultTitle: "Qualcosa è andato storto",
    defaultDesc: "Si è verificato un errore imprevisto. Il team è stato notificato. Riprova tra qualche minuto.",
    actions: ["retry", "home", "support"],
  },
  network: {
    code: null,
    label: null,
    badge: "Nessuna connessione",
    theme: "warning",
    Icon: WifiOff,
    defaultTitle: "Sei offline",
    defaultDesc: "Impossibile connettersi alla rete. Verifica la tua connessione e riprova.",
    actions: ["retry", "home"],
  },
  timeout: {
    code: null,
    label: null,
    badge: "Timeout",
    theme: "warning",
    Icon: Clock,
    defaultTitle: "La richiesta ha impiegato troppo tempo",
    defaultDesc: "Il server non ha risposto in tempo. Potrebbe essere temporaneamente sovraccarico.",
    actions: ["retry", "home"],
    meta: "Timeout dopo: 30s",
  },
  maintenance: {
    code: null,
    label: null,
    badge: "In manutenzione",
    theme: "info",
    Icon: Wrench,
    defaultTitle: "Stiamo lavorando al servizio",
    defaultDesc: "Il sistema è temporaneamente offline per manutenzione programmata. Torneremo presto.",
    actions: ["status"],
  },
};

// Mappa theme → classi DaisyUI
const THEME_CLASSES = {
  error:   { alert: "alert-error",   badge: "badge-error",   btn: "btn-error",   text: "text-error"   },
  warning: { alert: "alert-warning", badge: "badge-warning", btn: "btn-warning", text: "text-warning" },
  info:    { alert: "alert-info",    badge: "badge-info",    btn: "btn-info",    text: "text-info"    },
};

// ─── Componente principale ────────────────────────────────────────────────────

export default function ErrorPage({
  type = "500",
  title,
  description,
  errorId,
  estimatedTime,
  onRetry,
  onHome,
  onLogin,
  onBack,
  onSupport,
  onStatus,
  onReport,
}) {
  const navigate = useNavigate();

  const config = ERROR_CONFIGS[type] ?? ERROR_CONFIGS["500"];
  const tc = THEME_CLASSES[config.theme] ?? THEME_CLASSES.error;
  const displayTitle = title ?? config.defaultTitle;
  const displayDesc  = description ?? config.defaultDesc;
  const { Icon } = config;
  const handleHome = onHome ?? (() => navigate("/"));

  const actionMap = {
    retry:   { label: "Riprova",                  Icon: RotateCcw,   primary: true,  handler: onRetry },
    home:    { label: "Torna alla home",          Icon: Home,        primary: true,  handler: handleHome },
    login:   { label: "Effettua login",           Icon: LogIn,       primary: true,  handler: onLogin ?? (() => navigate("/login")) },
    back:    { label: "Torna indietro",           Icon: ChevronLeft, primary: false, handler: onBack  ?? (() => navigate(-1)) },
    support: { label: "Contatta supporto",        Icon: Headphones,  primary: false, handler: onSupport },
    status:  { label: "Stato del servizio",       Icon: Activity,    primary: true,  handler: onStatus },
    report:  { label: "Segnala il problema",      Icon: Flag,        primary: false, handler: onReport },
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col items-center gap-6 text-center">

        {/* Icona principale */}
        <div className={`alert ${tc.alert} w-fit rounded-2xl p-4 shadow-lg`}>
          <Icon size={36} strokeWidth={1.5} />
        </div>

        {/* Codice + Badge */}
        <div className="flex flex-col items-center gap-2">
          {config.code && (
            <p className={`text-7xl font-black tracking-tighter ${tc.text} opacity-90`}>
              {config.code}
            </p>
          )}
          <div className={`badge ${tc.badge} badge-outline badge-md font-semibold gap-1`}>
            {config.badge}
          </div>
        </div>

        {/* Titolo e descrizione */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-base-content">
            {displayTitle}
          </h1>
          <p className="text-sm text-base-content/60 leading-relaxed">
            {displayDesc}
          </p>
        </div>

        {/* ID errore */}
        {errorId && (
          <div className="w-full text-left">
            <p className="text-xs text-base-content/40 uppercase tracking-widest mb-1.5 font-semibold">
              ID errore
            </p>
            <div className="mockup-code text-xs">
              <pre><code>{errorId}</code></pre>
            </div>
          </div>
        )}

        {/* Orario stimato (maintenance) */}
        {estimatedTime && (
          <div className={`alert ${tc.alert} w-full text-sm`}>
            <Clock size={15} />
            <span><strong>Ripresa stimata:</strong> {estimatedTime}</span>
          </div>
        )}

        {/* Meta (timeout) */}
        {config.meta && (
          <p className="text-xs text-base-content/30">{config.meta}</p>
        )}

        {/* Azioni */}
        <div className="flex flex-wrap gap-2 justify-center w-full">
          {config.actions.map((key) => {
            const action = actionMap[key];
            if (!action) return null;
            const ActionIcon = action.Icon;
            return action.primary ? (
              <button
                key={key}
                onClick={action.handler}
                className={`btn ${tc.btn} btn-sm gap-1.5 flex-1 min-w-fit`}
              >
                <ActionIcon size={14} />
                {action.label}
              </button>
            ) : (
              <button
                key={key}
                onClick={action.handler}
                className="btn btn-ghost btn-sm gap-1.5"
              >
                <ActionIcon size={14} />
                {action.label}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}