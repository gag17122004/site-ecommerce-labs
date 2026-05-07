import { motion, AnimatePresence } from "motion/react";
import {
  Calculator, Package, Type, Video, ShieldAlert,
  ChevronDown, CheckCircle2, Menu, X,
  ArrowRight, Lock, TrendingUp, Zap, Star,
} from "lucide-react";
import { useState } from "react";

const PAYMENT_LINK = "https://pay.kiwify.com.br/X7e9Nln";
const PRICE_FULL = "97";
const PRICE_PROMO = "47";

// ═══════════════════════════════════════════════════
//  LOGO SVG — Esmeralda Ecommerce Labs
// ═══════════════════════════════════════════════════
function EmeraldLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,4 100,22 116,62 100,98 60,116 20,98 4,62 20,22" fill="#0F6E56" stroke="#1D9E75" strokeWidth="2"/>
      <polygon points="60,12 94,28 108,62 94,92 60,108 26,92 12,62 26,28" fill="#1D9E75" stroke="#00e5a0" strokeWidth="1"/>
      <polygon points="60,24 86,36 96,62 86,84 60,96 34,84 24,62 34,36" fill="#0F6E56" opacity="0.7"/>
      <line x1="36" y1="78" x2="60" y2="42" stroke="#00e5a0" strokeWidth="3" strokeLinecap="round"/>
      <line x1="60" y1="42" x2="84" y2="56" stroke="#00e5a0" strokeWidth="3" strokeLinecap="round"/>
      <line x1="84" y1="56" x2="96" y2="40" stroke="#00e5a0" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="36" cy="78" r="4" fill="#00e5a0"/>
      <polygon points="92,36 100,40 92,44 88,36" fill="#00e5a0"/>
    </svg>
  );
}

// ═══════════════════════════════════════════════════
//  PAYWALL OVERLAY
// ═══════════════════════════════════════════════════
function PaywallOverlay({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-zinc-950/95 backdrop-blur-md border border-emerald-500/30 px-6 py-8 text-center"
    >
      <div className="w-14 h-14 rounded-full bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center mb-4">
        <Lock size={24} className="text-emerald-400" />
      </div>
      <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Resultado pronto!</p>
      <h3 className="text-xl font-display font-black text-zinc-100 uppercase mb-3 leading-tight">{label}</h3>
      <p className="text-sm text-zinc-400 mb-6 leading-relaxed max-w-xs">
        Desbloqueie todas as ferramentas por apenas{" "}
        <span className="text-emerald-400 font-bold text-base">R$ {PRICE_PROMO}</span>.
        <br />
        <span className="text-zinc-600 text-xs">Pagamento único, sem mensalidade.</span>
      </p>
      <a
        href={PAYMENT_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/40"
      >
        <Zap size={16} /> LIBERAR ACESSO
      </a>
      <p className="text-xs text-zinc-600 mt-3">✓ Acesso imediato &nbsp;·&nbsp; ✓ 7 dias de garantia</p>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
//  TOOL 1 — Calculadora de Margem
// ═══════════════════════════════════════════════════
function ToolMargem() {
  const [preco, setPreco] = useState("");
  const [custo, setCusto] = useState("");
  const [locked, setLocked] = useState(false);
  const p = parseFloat(preco) || 0;
  const c = parseFloat(custo) || 0;
  const fakeLucro = (p - c * 1.35).toFixed(2);
  const fakeMargem = p > 0 ? (((p - c * 1.35) / p) * 100).toFixed(0) : "0";

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-zinc-400 mb-1">Preço de venda (R$)</label>
          <input type="number" placeholder="89,90" value={preco}
            onChange={e => { setPreco(e.target.value); setLocked(false); }}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors" />
        </div>
        <div>
          <label className="block text-xs text-zinc-400 mb-1">Custo do produto (R$)</label>
          <input type="number" placeholder="42,00" value={custo}
            onChange={e => { setCusto(e.target.value); setLocked(false); }}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors" />
        </div>
      </div>
      <button onClick={() => preco && custo && setLocked(true)} disabled={!preco || !custo}
        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wide transition-colors">
        Calcular lucro real →
      </button>
      {locked && (
        <div className="relative rounded-xl overflow-hidden min-h-[120px]">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 blur-[3px] select-none pointer-events-none">
            <div className="flex items-center justify-between mb-2 text-xs text-zinc-400">
              <span>Venda</span><span className="text-zinc-200">R$ {p.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-2 text-xs text-zinc-400">
              <span>Taxas + frete</span><span className="text-red-400">- R$ {(c * 0.35).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-2 text-xs text-zinc-400">
              <span>Custo produto</span><span className="text-red-400">- R$ {c.toFixed(2)}</span>
            </div>
            <div className="h-px bg-zinc-700 my-2" />
            <div className="flex items-center justify-between text-sm font-bold">
              <span className="text-zinc-200">Lucro real</span>
              <span className="text-emerald-400">R$ {fakeLucro}</span>
            </div>
            <div className="mt-2 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.max(0, Math.min(100, parseFloat(fakeMargem)))}%` }} />
            </div>
          </div>
          <PaywallOverlay label="Ver diagnóstico completo" />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  TOOL 2 — Peso Cúbico
// ═══════════════════════════════════════════════════
function ToolPesoCubico() {
  const [comp, setComp] = useState("");
  const [larg, setLarg] = useState("");
  const [alt, setAlt] = useState("");
  const [locked, setLocked] = useState(false);
  const fakeCubico = (((parseFloat(comp) || 0) * (parseFloat(larg) || 0) * (parseFloat(alt) || 0)) / 6000).toFixed(3);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[{ label: "L", val: comp, set: setComp, ph: "30cm" },
          { label: "A", val: larg, set: setLarg, ph: "25cm" },
          { label: "P", val: alt, set: setAlt, ph: "20cm" }].map(i => (
          <div key={i.label}>
            <label className="block text-xs text-zinc-400 mb-1">{i.label}</label>
            <input type="number" placeholder={i.ph} value={i.val}
              onChange={e => { i.set(e.target.value); setLocked(false); }}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors" />
          </div>
        ))}
      </div>
      <button onClick={() => comp && larg && alt && setLocked(true)} disabled={!comp || !larg || !alt}
        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wide transition-colors">
        Calcular peso cobrado →
      </button>
      {locked && (
        <div className="relative rounded-xl overflow-hidden min-h-[100px]">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 blur-[3px] select-none pointer-events-none">
            <div className="flex items-center justify-between mb-3">
              <div className="text-center">
                <p className="text-xs text-zinc-500">Peso cúbico</p>
                <p className="text-lg font-bold text-yellow-400">{fakeCubico} kg</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500">Peso cobrado</p>
                <p className="text-lg font-bold text-emerald-400">█,███ kg</p>
              </div>
            </div>
            <p className="text-xs text-zinc-500 text-center">Diferença: R$ █,██ por envio</p>
          </div>
          <PaywallOverlay label="Ver quanto pago a mais" />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  TOOL 3 — Títulos
// ═══════════════════════════════════════════════════
function ToolTitulos() {
  const [product, setProduct] = useState("");
  const [locked, setLocked] = useState(false);
  const preview1 = product ? `${product} Pronta Entrega Original Premium` : "Produto-bom-bonito-preto";

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-zinc-400 mb-1">Nome do produto</label>
        <input type="text" placeholder="Ex: Fone de Ouvido Bluetooth"
          value={product} onChange={e => { setProduct(e.target.value); setLocked(false); }}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors" />
      </div>
      <button onClick={() => product.trim() && setLocked(true)} disabled={!product.trim()}
        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wide transition-colors">
        Gerar títulos →
      </button>
      {locked && (
        <div className="relative rounded-xl overflow-hidden min-h-[140px]">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 space-y-2 blur-[3px] select-none pointer-events-none">
            <div className="bg-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-500 line-through">{preview1}</div>
            <div className="text-xs text-zinc-400 text-center">↓ IA</div>
            <div className="bg-emerald-900/30 border border-emerald-500/20 rounded-lg px-3 py-2 text-xs text-zinc-200">
              Fone Bluetooth Sem Fio TWS Bateria 30h Original
            </div>
          </div>
          <PaywallOverlay label="Ver os 5 títulos otimizados" />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  TOOL 4 — Prompts para Vídeos
// ═══════════════════════════════════════════════════
function ToolPrompts() {
  const [product, setProduct] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const types = [
    { icon: "🎬", label: "Demonstração" },
    { icon: "📦", label: "Unboxing" },
    { icon: "⚡", label: "Antes e depois" },
  ];

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-zinc-400 mb-1">Seu produto</label>
        <input type="text" placeholder="Ex: Suporte para celular"
          value={product} onChange={e => { setProduct(e.target.value); setLocked(false); }}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {types.map((t, i) => (
          <button key={i} onClick={() => { setSelected(i); setLocked(false); }}
            className={`py-2 rounded-lg border text-xs font-medium transition-all ${selected === i ? "bg-emerald-600/10 border-emerald-500 text-emerald-300" : "bg-zinc-900 border-zinc-700 text-zinc-400"}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      <button onClick={() => product.trim() && selected !== null && setLocked(true)}
        disabled={!product.trim() || selected === null}
        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wide transition-colors">
        Gerar prompt de vídeo →
      </button>
      {locked && (
        <div className="relative rounded-xl overflow-hidden min-h-[120px]">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 blur-[3px] select-none pointer-events-none">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-video bg-zinc-800 rounded-lg border border-zinc-700 flex items-end p-1.5">
                  <div className="w-full h-1 bg-emerald-500/40 rounded-full" style={{ width: `${60 + i * 10}%` }} />
                </div>
              ))}
            </div>
          </div>
          <PaywallOverlay label="Ver prompt completo" />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  TOOL 5 — Disputa Shopee
// ═══════════════════════════════════════════════════
const disputeReasons = [
  { label: "Não recebi meu produto", icon: "📦" },
  { label: "Produto chegou errado", icon: "❌" },
  { label: "Quero devolver", icon: "↩️" },
];

function ToolDisputa() {
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const fakeScript = selected !== null
    ? ["Informamos que o pedido foi devidamente postado dentro do prazo estabelecido pela plataforma...",
       "Nosso registro comprova que o produto saiu completo e em perfeito estado..."][selected % 2]
    : "";

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {disputeReasons.map((r, i) => (
          <button key={i} onClick={() => { setSelected(i); setLocked(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs transition-all flex items-center gap-2 ${selected === i ? "bg-emerald-600/10 border-emerald-500 text-emerald-300" : "bg-zinc-900 border-zinc-700 text-zinc-400"}`}>
            <span>{r.icon}</span> {r.label}
          </button>
        ))}
      </div>
      <button onClick={() => selected !== null && setLocked(true)} disabled={selected === null}
        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wide transition-colors">
        Gerar defesa →
      </button>
      {locked && (
        <div className="relative rounded-xl overflow-hidden min-h-[120px]">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 blur-[3px] select-none pointer-events-none">
            <div className="bg-zinc-800 rounded-lg px-3 py-2 text-xs text-red-300 mb-2">{disputeReasons[selected!]?.label}</div>
            <div className="bg-zinc-800 border border-emerald-500/20 rounded-lg px-3 py-2 text-xs text-zinc-300">{fakeScript}</div>
            <div className="flex items-center justify-between mt-2 text-xs text-zinc-500">
              <span>Disputa</span><span className="text-emerald-400">Ganha ✓</span>
            </div>
          </div>
          <PaywallOverlay label="Ver defesa completa" />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  MODULE CONFIG
// ═══════════════════════════════════════════════════
const modules = [
  {
    id: 1,
    icon: <Calculator size={18} />,
    title: "Calculadora de Margem",
    tag: "Mais usado",
    tagColor: "text-emerald-400",
    footer: "Proteja seu dinheiro",
    tool: <ToolMargem />,
    how: "Coloca o preço que você vende e quanto pagou no produto. A ferramenta calcula tudo que o marketplace desconta e mostra o que sobra de verdade no seu bolso.",
    why: "Muita gente começa vendendo empolgada, mas no fim do mês o dinheiro não aparece. Isso acontece porque as taxas do marketplace comem sua margem e você não vê.",
    story: { name: "Carlos, Shopee — SP", text: "Achava que ganhava R$20 por venda. Calculei direito e vi que sobrava R$3. Ajustei o preço e hoje lucro de verdade.", save: "Descobriu R$850 de prejuízo/mês" },
    short: "Descubra se você está realmente lucrando — ou trabalhando de graça.",
  },
  {
    id: 2,
    icon: <Package size={18} />,
    title: "Peso Cúbico do Frete",
    tag: "Evita prejuízo",
    tagColor: "text-yellow-400",
    footer: "Evite prejuízo",
    tool: <ToolPesoCubico />,
    how: "Informe as dimensões da embalagem. A ferramenta calcula o peso cúbico e mostra qual será cobrado pela transportadora — antes de precificar errado.",
    why: "Transportadoras cobram pelo espaço que a caixa ocupa, não só pelo peso real. Uma caixa leve pode ser cobrada como produto pesado.",
    story: { name: "Fernanda, ML — PR", text: "Minhas caixas eram grandes mas leves. Descobri que pagava frete 3x maior. Reduzi a caixa e economizei R$8 por pedido.", save: "R$1.600/mês economizados" },
    short: "Descubra por que o frete sai tão caro — mesmo em produtos leves.",
  },
  {
    id: 3,
    icon: <Type size={18} />,
    title: "Títulos que Aparecem",
    tag: "Mais vendas",
    tagColor: "text-blue-400",
    footer: "Mais visibilidade",
    tool: <ToolTitulos />,
    how: "Escreva o nome do produto e a ferramenta cria 5 títulos otimizados — cada um pensado para aparecer mais na busca ou receber mais cliques.",
    why: "O título é o que o algoritmo usa para mostrar ou esconder o produto. Um título ruim faz você pagar por visibilidade que poderia ser de graça.",
    story: { name: "Rodrigo, ML — RS", text: "Meu produto ficava na página 5. Mudei o título e em 3 dias estava na primeira página. As vendas dobraram.", save: "+120% de cliques" },
    short: "Faça seu produto aparecer para mais pessoas e receber mais cliques.",
  },
  {
    id: 4,
    icon: <Video size={18} />,
    title: "Vídeos com IA",
    tag: "Novidade",
    tagColor: "text-purple-400",
    footer: "Vende mais rápido",
    tool: <ToolPrompts />,
    how: "Escolha o tipo de vídeo e o nome do produto. A ferramenta gera prompts prontos para IA criar seus vídeos de clips automaticamente.",
    why: "Anúncios com vídeo têm até 40% mais conversão. A maioria dos vendedores não tem câmera nem sabe editar — com IA qualquer pessoa consegue.",
    story: { name: "Aline, Shopee — MG", text: "Nunca fiz vídeo na vida. Copiei o prompt, colei no CapCut AI e em 10 min tinha um clip pronto. Vendas subiram 35%.", save: "+35% de conversão" },
    short: "Crie vídeos profissionais para o seu anúncio — sem precisar filmar nada.",
  },
  {
    id: 5,
    icon: <ShieldAlert size={18} />,
    title: "Resposta para Disputas Shopee",
    tag: "Protege seu dinheiro",
    tagColor: "text-orange-400",
    footer: "Ganhe disputas",
    tool: <ToolDisputa />,
    how: "Escolha o motivo da reclamação e a ferramenta gera o script de defesa com os argumentos certos para colar na Shopee.",
    why: "Sem o texto certo, a plataforma decide a favor do cliente automaticamente. O argumento técnico correto muda o resultado.",
    story: { name: "Marcos, Shopee — RJ", text: "Perdi R$800 em disputas porque não sabia o que escrever. Com os scripts certos, minha taxa de vitória foi de 20% para 71%.", save: "De 20% para 71% de vitórias" },
    short: "Não perca dinheiro por não saber como responder uma reclamação.",
  },
];

// ═══════════════════════════════════════════════════
//  MODULE MODAL
// ═══════════════════════════════════════════════════
function ModuleModal({ mod, onClose }: { mod: typeof modules[0]; onClose: () => void }) {
  const [tab, setTab] = useState<"tool" | "guide">("tool");
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
        className="bg-zinc-950 border border-zinc-800 rounded-t-3xl md:rounded-2xl w-full md:max-w-xl max-h-[92vh] overflow-hidden flex flex-col">
        <div className="flex items-start justify-between p-5 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600/10 rounded-xl text-emerald-500">{mod.icon}</div>
            <div>
              <span className={`text-xs font-bold ${mod.tagColor}`}>{mod.tag}</span>
              <h3 className="font-display text-lg font-black text-zinc-100 uppercase leading-tight">{mod.title}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"><X size={20} /></button>
        </div>
        <div className="flex border-b border-zinc-800 shrink-0">
          {[{ key: "tool", label: "🔧 Experimentar" }, { key: "guide", label: "📖 Como funciona" }].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as any)}
              className={`flex-1 py-3 text-sm font-bold transition-colors ${tab === t.key ? "text-emerald-400 border-b-2 border-emerald-500" : "text-zinc-500 hover:text-zinc-300"}`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="overflow-y-auto flex-1 p-5">
          {tab === "tool" ? (
            <div>
              {mod.tool}
              <div className="mt-5 pt-4 border-t border-zinc-800 text-center">
                <p className="text-xs text-zinc-500 mb-3">Acesso completo a essa e mais 4 ferramentas</p>
                <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl text-sm transition-all hover:scale-105">
                  <Zap size={15} /> Liberar acesso — R$ {PRICE_PROMO}
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h4 className="text-sm font-bold text-zinc-100 mb-2">📋 Como usar</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">{mod.how}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h4 className="text-sm font-bold text-zinc-100 mb-2">💡 Por que importa</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">{mod.why}</p>
              </div>
              <div className="bg-emerald-900/15 border border-emerald-500/20 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">💬</span>
                  <div>
                    <p className="text-sm text-zinc-300 italic leading-relaxed mb-3">"{mod.story.text}"</p>
                    <p className="text-xs text-zinc-500 font-semibold">{mod.story.name}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-3 py-1">
                      <TrendingUp size={11} className="text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-400">{mod.story.save}</span>
                    </div>
                  </div>
                </div>
              </div>
              <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl text-sm transition-all hover:scale-105">
                <Zap size={15} /> Liberar acesso — R$ {PRICE_PROMO}
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState<typeof modules[0] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "Preciso entender de tecnologia para usar?", a: "Não. Se você sabe digitar um número, você usa. Tudo funciona no navegador, sem instalar nada." },
    { q: "Funciona para quem vende só na Shopee?", a: "Sim. As calculadoras funcionam para qualquer plataforma. O módulo de disputa tem foco direto na Shopee." },
    { q: "É curso? Preciso assistir aulas?", a: "Não. São ferramentas — você abre, usa e já tem o resultado. Sem vídeo, sem certificado." },
    { q: "Tenho acesso a atualizações futuras?", a: "Sim. Novos módulos adicionados no futuro são entregues para quem já comprou sem custo extra." },
    { q: "E se eu não gostar?", a: "7 dias de garantia incondicional. Pede reembolso, devolvemos sem perguntas." },
    { q: "Como recebo o acesso?", a: "Imediatamente após o pagamento confirmar. Você recebe o link por e-mail na hora." },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 selection:bg-emerald-500/30">

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <EmeraldLogo size={34} />
            <span className="font-display text-lg font-black uppercase italic text-zinc-100 tracking-tight">Ecommerce Labs</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#ferramentas" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Ferramentas</a>
            <a href="#preco" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">Preço</a>
            <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-black text-sm px-5 py-2.5 rounded-lg font-bold transition-all">
              Quero acesso — R$ {PRICE_PROMO}
            </a>
          </div>
          <button className="md:hidden text-zinc-100 p-1" onClick={() => setMenuOpen(p => !p)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 py-5 space-y-3">
            <a href="#ferramentas" className="block text-zinc-100 font-bold py-2" onClick={() => setMenuOpen(false)}>Ferramentas</a>
            <a href="#preco" className="block text-zinc-100 font-bold py-2" onClick={() => setMenuOpen(false)}>Preço</a>
            <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center bg-emerald-500 text-black py-4 rounded-xl font-bold">
              Quero acesso — R$ {PRICE_PROMO}
            </a>
          </motion.div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-8 md:pt-48 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-600/6 blur-[130px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900 border border-zinc-700 rounded-full text-emerald-500 text-xs font-bold tracking-widest uppercase mb-6">
              <EmeraldLogo size={16} /> 5 módulos de inteligência
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight text-zinc-100 leading-[0.95] mb-4 uppercase">
              Simples de usar.<br />
              <span className="text-emerald-500 italic">Resultados reais.</span>
            </h1>
            <p className="text-zinc-500 text-base mb-8">Passe o mouse em qualquer módulo para ver como funciona.</p>
          </motion.div>
        </div>
      </section>

      {/* ── GRID DE MÓDULOS + CARD DE PREÇO ── */}
      <section id="ferramentas" className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* MÓDULOS 1 a 5 */}
            {modules.map((mod, idx) => (
              <motion.div key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => setActiveModule(mod)}
                className="group bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 rounded-2xl p-5 cursor-pointer transition-all flex flex-col"
              >
                {/* Header do card */}
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-zinc-800 rounded-xl text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    {mod.icon}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wide ${mod.tagColor}`}>{mod.tag}</span>
                </div>

                {/* Título */}
                <h3 className="font-display text-base font-black text-zinc-100 uppercase mb-1 leading-tight">{mod.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed mb-4">{mod.short}</p>

                {/* Preview mini da ferramenta */}
                <div className="flex-1 rounded-xl bg-zinc-950 border border-zinc-800 p-3 mb-4 pointer-events-none select-none">
                  {idx === 0 && (
                    <div className="space-y-1.5">
                      {[["Venda", "R$ 89,90", "text-zinc-200"], ["Taxas + frete", "- R$ 18,49", "text-red-400"], ["Custo produto", "- R$ 28,00", "text-red-400"]].map(([l, v, c]) => (
                        <div key={l} className="flex items-center justify-between text-xs">
                          <span className="text-zinc-500">{l}</span><span className={c}>{v}</span>
                        </div>
                      ))}
                      <div className="h-px bg-zinc-800 my-1" />
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-zinc-300">Lucro real</span><span className="text-emerald-400">R$ 23,50</span>
                      </div>
                      <div className="h-1 bg-zinc-800 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full w-[26%] bg-emerald-500 rounded-full" />
                      </div>
                    </div>
                  )}
                  {idx === 1 && (
                    <div className="space-y-2">
                      <div className="flex items-end justify-center gap-4 text-xs text-zinc-400">
                        <div className="text-center"><div className="text-zinc-300 font-bold">30cm</div><div>L</div></div>
                        <div className="text-center"><div className="text-zinc-300 font-bold">25cm</div><div>A</div></div>
                        <div className="text-center"><div className="text-zinc-300 font-bold">20cm</div><div>P</div></div>
                      </div>
                      <div className="text-center">
                        <span className="text-yellow-400 font-bold text-lg">3,75 kg</span>
                        <p className="text-xs text-zinc-500">Peso cobrado</p>
                      </div>
                      <p className="text-xs text-zinc-600 text-center">vs R$ 6,70 no peso real</p>
                    </div>
                  )}
                  {idx === 2 && (
                    <div className="space-y-2">
                      <div className="bg-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-500 line-through">Produto-bom-bonito-preto</div>
                      <div className="text-xs text-zinc-600 text-center">↓ IA</div>
                      <div className="bg-emerald-900/30 border border-emerald-500/20 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200">
                        Fone Bluetooth Sem Fio TWS Bateria 30h Original
                      </div>
                    </div>
                  )}
                  {idx === 3 && (
                    <div className="grid grid-cols-3 gap-1.5">
                      {[["#1a1a2e", "#16213e"], ["#0f3460", "#533483"], ["#e94560", "#0f3460"]].map(([from, to], i) => (
                        <div key={i} className="aspect-video rounded-md border border-zinc-700 overflow-hidden" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
                          <div className="h-full flex items-end p-1">
                            <div className="w-full h-0.5 bg-emerald-400/50 rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {idx === 4 && (
                    <div className="space-y-2">
                      <div className="bg-red-900/20 border border-red-500/20 rounded-lg px-2.5 py-1.5 text-xs text-red-300">
                        Não recebi meu produto
                      </div>
                      <div className="bg-zinc-800 border border-emerald-500/20 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300">
                        Olá! Conforme rastreio AR1236... entregue em 03/05.
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-500">Disputa</span>
                        <span className="text-emerald-400 font-bold">Ganha ✓</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-600">{mod.footer}</span>
                  <ArrowRight size={14} className="text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                </div>
              </motion.div>
            ))}

            {/* CARD DE PREÇO — 6º card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              id="preco"
              className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-emerald-500/10 rounded-xl">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-black text-zinc-100 uppercase mb-1">
                  Tudo isso por R$ {PRICE_PROMO}
                </h3>
                <p className="text-zinc-400 text-sm mb-5">Pagamento único. 7 dias de garantia. Acesso imediato.</p>
                <ul className="space-y-2 mb-6">
                  {modules.map(m => (
                    <li key={m.id} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 size={12} className="text-emerald-500 shrink-0" /> {m.title}
                    </li>
                  ))}
                  <li className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 size={12} className="text-emerald-500 shrink-0" /> Atualizações futuras incluídas
                  </li>
                </ul>
              </div>
              <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-emerald-900/40">
                Liberar acesso <ArrowRight size={16} />
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── PROVA SOCIAL ── */}
      <section className="py-16 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl md:text-3xl font-black text-zinc-100 uppercase text-center mb-8">O que está mudando para quem usa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modules.slice(0, 3).map((mod, i) => (
              <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-sm text-zinc-300 italic leading-relaxed mb-4">"{mod.story.text}"</p>
                <div className="border-t border-zinc-800 pt-3">
                  <p className="text-xs font-bold text-zinc-200">{mod.story.name}</p>
                  <div className="mt-1.5 inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.5">
                    <TrendingUp size={10} className="text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400">{mod.story.save}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTOR ── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="shrink-0">
              <EmeraldLogo size={80} />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Quem criou</span>
              <h2 className="font-display text-2xl font-black text-zinc-100 mt-1 mb-4 uppercase">Feito por operador. <span className="italic text-emerald-500">Para operador.</span></h2>
              <p className="text-zinc-400 leading-relaxed text-sm mb-3">Sou <strong className="text-zinc-200">vendedor Platinum no Mercado Livre</strong> e opero também na Shopee. Comecei sem entender nada de taxa, peso cúbico ou título — e aprendi da forma mais cara: no prejuízo.</p>
              <p className="text-zinc-400 leading-relaxed text-sm italic text-emerald-400">O Ecommerce Labs é o kit que eu quis ter quando comecei.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Platinum ML", "Operador Shopee", "Revenda de Estoque"].map(b => (
                  <span key={b} className="flex items-center gap-1 text-xs font-semibold text-zinc-300 bg-zinc-800 border border-zinc-700 rounded-full px-2.5 py-1">
                    <CheckCircle2 size={10} className="text-emerald-500" /> {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-black text-center mb-8 uppercase italic text-zinc-100">Dúvidas frequentes</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
                <button className="w-full flex items-center justify-between p-4 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-zinc-200 text-sm">{faq.q}</span>
                  <ChevronDown size={16} className={`text-emerald-500 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-4 pb-4 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800 pt-3">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 border-t border-zinc-800 text-center bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <EmeraldLogo size={40} />
            <span className="font-display text-2xl font-black uppercase italic text-zinc-100">Ecommerce Labs</span>
          </div>
          <p className="text-zinc-500 mb-6 text-sm">Pare de vender no escuro. Comece a lucrar de verdade.</p>
          <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-4 rounded-xl font-display text-lg font-black transition-all hover:scale-105">
            COMEÇAR AGORA — R$ {PRICE_PROMO}
          </a>
          <p className="mt-4 text-zinc-700 text-xs">✓ Acesso imediato &nbsp;·&nbsp; ✓ Sem mensalidade &nbsp;·&nbsp; ✓ 7 dias de garantia</p>
          <div className="mt-12 pt-6 border-t border-zinc-900 text-zinc-700 text-xs flex flex-col md:flex-row justify-between gap-2">
            <span>© 2025 Ecommerce Labs</span>
            <span>Feito por vendedor. Para vendedor.</span>
          </div>
        </div>
      </footer>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {activeModule && <ModuleModal mod={activeModule} onClose={() => setActiveModule(null)} />}
      </AnimatePresence>
    </div>
  );
}
