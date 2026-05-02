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
        Desbloqueie esse resultado e todas as ferramentas por apenas{" "}
        <span className="text-emerald-400 font-bold text-base">R$ {PRICE_PROMO}</span>.
        <br />
        <span className="text-zinc-600 text-xs">Pagamento único, sem mensalidade.</span>
      </p>
      <a
        href={PAYMENT_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/40"
      >
        <Zap size={16} /> QUERO ACESSO COMPLETO AGORA
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

  const handleCalc = () => {
    if (!preco || !custo) return;
    setLocked(true);
  };

  const p = parseFloat(preco) || 0;
  const c = parseFloat(custo) || 0;
  const fakeLucro = (p - c * 1.35).toFixed(2);
  const fakeMargem = p > 0 ? (((p - c * 1.35) / p) * 100).toFixed(0) : "0";

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-400 leading-relaxed">
        Muita gente acha que está lucrando — mas quando soma <span className="text-zinc-200 font-semibold">todas as taxas</span>, descobre que está no vermelho. Testa aqui 👇
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Preço que você vende (R$)</label>
          <input
            type="number" placeholder="Ex: 89,90"
            value={preco} onChange={e => { setPreco(e.target.value); setLocked(false); }}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Quanto você pagou no produto (R$)</label>
          <input
            type="number" placeholder="Ex: 42,00"
            value={custo} onChange={e => { setCusto(e.target.value); setLocked(false); }}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>
      <button
        onClick={handleCalc}
        disabled={!preco || !custo}
        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition-colors text-sm uppercase tracking-wide"
      >
        Calcular meu lucro real →
      </button>

      {locked && (
        <div className="relative rounded-xl overflow-hidden min-h-[160px]">
          {/* fake preview borrado */}
          <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-5 blur-[3px] select-none pointer-events-none">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-zinc-900 rounded-lg p-3 text-center">
                <p className="text-xs text-zinc-500 mb-1">Você recebe</p>
                <p className="text-lg font-bold text-zinc-200">R$ {p.toFixed(2)}</p>
              </div>
              <div className="bg-zinc-900 rounded-lg p-3 text-center">
                <p className="text-xs text-zinc-500 mb-1">Taxas e custos</p>
                <p className="text-lg font-bold text-red-400">- R$ ██,██</p>
              </div>
              <div className="bg-zinc-900 rounded-lg p-3 text-center">
                <p className="text-xs text-zinc-500 mb-1">Lucro real</p>
                <p className="text-lg font-bold text-emerald-400">R$ {fakeLucro}</p>
              </div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-center">
              <p className="text-sm font-bold text-yellow-400">⚠️ Sua margem real é de {fakeMargem}% — veja o diagnóstico completo</p>
            </div>
          </div>
          <PaywallOverlay label="Ver meu lucro real" />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  TOOL 2 — Calculadora de Peso Cúbico
// ═══════════════════════════════════════════════════
function ToolPesoCubico() {
  const [comp, setComp] = useState("");
  const [larg, setLarg] = useState("");
  const [alt, setAlt] = useState("");
  const [locked, setLocked] = useState(false);

  const handleCalc = () => {
    if (!comp || !larg || !alt) return;
    setLocked(true);
  };

  const fakeCubico = (
    ((parseFloat(comp) || 0) * (parseFloat(larg) || 0) * (parseFloat(alt) || 0)) / 6000
  ).toFixed(3);

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-400 leading-relaxed">
        Sabia que a transportadora pode cobrar por um peso <span className="text-zinc-200 font-semibold">3x maior</span> do que o real da sua caixa? Descobre agora se isso está acontecendo com você 👇
      </p>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Comprimento (cm)", val: comp, set: setComp, ph: "Ex: 30" },
          { label: "Largura (cm)", val: larg, set: setLarg, ph: "Ex: 20" },
          { label: "Altura (cm)", val: alt, set: setAlt, ph: "Ex: 15" },
        ].map(i => (
          <div key={i.label}>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">{i.label}</label>
            <input
              type="number" placeholder={i.ph} value={i.val}
              onChange={e => { i.set(e.target.value); setLocked(false); }}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleCalc}
        disabled={!comp || !larg || !alt}
        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition-colors text-sm uppercase tracking-wide"
      >
        Descobrir o peso que pagam →
      </button>

      {locked && (
        <div className="relative rounded-xl overflow-hidden min-h-[150px]">
          <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-5 blur-[3px] select-none pointer-events-none">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-zinc-900 rounded-lg p-3 text-center">
                <p className="text-xs text-zinc-500 mb-1">Peso real</p>
                <p className="text-lg font-bold text-zinc-200">? kg</p>
              </div>
              <div className="bg-zinc-900 rounded-lg p-3 text-center">
                <p className="text-xs text-zinc-500 mb-1">Peso cúbico</p>
                <p className="text-lg font-bold text-yellow-400">{fakeCubico} kg</p>
              </div>
              <div className="bg-zinc-900 rounded-lg p-3 text-center">
                <p className="text-xs text-zinc-500 mb-1">Será cobrado</p>
                <p className="text-lg font-bold text-emerald-400">█,███ kg</p>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
              <p className="text-sm font-bold text-red-400">🚨 Detectamos uma cobrança diferente do peso real!</p>
            </div>
          </div>
          <PaywallOverlay label="Ver quanto estou pagando a mais" />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  TOOL 3 — Criador de Títulos
// ═══════════════════════════════════════════════════
function ToolTitulos() {
  const [product, setProduct] = useState("");
  const [locked, setLocked] = useState(false);

  const preview1 = product
    ? `${product} Pronta Entrega Original Premium`
    : "Fone Bluetooth Pronta Entrega Original Premium";

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-400 leading-relaxed">
        O título certo faz seu produto aparecer para <span className="text-zinc-200 font-semibold">mais pessoas</span> — e faz elas clicarem. Testa com o seu produto 👇
      </p>
      <div>
        <label className="block text-xs font-semibold text-zinc-400 mb-1">Nome do seu produto</label>
        <input
          type="text" placeholder="Ex: Fone de Ouvido Bluetooth"
          value={product} onChange={e => { setProduct(e.target.value); setLocked(false); }}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>
      <button
        onClick={() => product.trim() && setLocked(true)}
        disabled={!product.trim()}
        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition-colors text-sm uppercase tracking-wide"
      >
        Gerar títulos que vendem →
      </button>

      {locked && (
        <div className="relative rounded-xl overflow-hidden min-h-[200px]">
          <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-5 space-y-3 blur-[3px] select-none pointer-events-none">
            <div className="bg-zinc-900 rounded-xl p-4">
              <p className="text-xs font-bold text-emerald-400 mb-1">🚀 Título 1 — aparece mais nas buscas</p>
              <p className="text-sm text-zinc-100">{preview1}</p>
              <div className="mt-2 flex gap-2">
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">{preview1.length} caracteres</span>
                <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full">✓ Otimizado</span>
              </div>
            </div>
            <div className="bg-zinc-900 rounded-xl p-4">
              <p className="text-xs font-bold text-blue-400 mb-1">🏆 Título 2 — mais cliques</p>
              <p className="text-sm text-zinc-600">████████████████ ██████ ████████████████████</p>
            </div>
            <div className="bg-zinc-900 rounded-xl p-4">
              <p className="text-xs font-bold text-yellow-400 mb-1">💰 Título 3 — foco em oferta</p>
              <p className="text-sm text-zinc-600">████████ ████████████ ██████████ ████</p>
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
    { icon: "🎬", label: "Mostrar o produto em uso" },
    { icon: "📦", label: "Abrir a caixa (unboxing)" },
    { icon: "⚡", label: "Antes e depois" },
    { icon: "✨", label: "Listar os benefícios" },
    { icon: "💬", label: "Simular depoimento" },
  ];

  const fakeStart = product
    ? `Crie um vídeo de 15 segundos mostrando ${product} em uso. Câmera próxima ao produto...`
    : "Crie um vídeo de 15 segundos mostrando [seu produto] em uso. Câmera próxima...";

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-400 leading-relaxed">
        Vídeos vendem <span className="text-zinc-200 font-semibold">até 3x mais</span> do que fotos. A IA faz por você — você só copia o texto e cola. Testa 👇
      </p>
      <div>
        <label className="block text-xs font-semibold text-zinc-400 mb-1">Seu produto</label>
        <input
          type="text" placeholder="Ex: Suporte para celular"
          value={product} onChange={e => { setProduct(e.target.value); setLocked(false); }}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>
      <div>
        <p className="text-xs font-semibold text-zinc-400 mb-2">Que tipo de vídeo você quer?</p>
        <div className="grid grid-cols-1 gap-2">
          {types.map((t, i) => (
            <button key={i} onClick={() => { setSelected(i); setLocked(false); }}
              className={`text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center gap-3 ${selected === i ? "bg-emerald-600/10 border-emerald-500 text-emerald-300" : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500"}`}>
              <span className="text-lg">{t.icon}</span>
              <span className="font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => product.trim() && selected !== null && setLocked(true)}
        disabled={!product.trim() || selected === null}
        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition-colors text-sm uppercase tracking-wide"
      >
        Gerar meu prompt de vídeo →
      </button>

      {locked && (
        <div className="relative rounded-xl overflow-hidden min-h-[160px]">
          <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-5 blur-[3px] select-none pointer-events-none">
            <p className="text-xs font-semibold text-emerald-400 mb-3">
              {selected !== null ? types[selected].icon : "🎬"} Prompt gerado — pronto para copiar e colar na IA
            </p>
            <div className="bg-zinc-900 rounded-xl p-4 text-sm text-zinc-300 leading-relaxed space-y-2">
              <p>{fakeStart}</p>
              <p className="text-zinc-600">████████████████ ████ ████████ ████████ ████████████. ████ ████████ ████ ████ ████████ ████████████████ ████.</p>
            </div>
            <div className="mt-3 flex gap-2 flex-wrap">
              {["Runway ML", "CapCut AI", "Pika Labs"].map(t => (
                <span key={t} className="text-xs bg-zinc-800 text-zinc-500 px-3 py-1 rounded-full border border-zinc-700">{t}</span>
              ))}
            </div>
          </div>
          <PaywallOverlay label="Ver o prompt completo" />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  TOOL 5 — Disputa Shopee
// ═══════════════════════════════════════════════════
const disputeReasons = [
  { label: "O cliente diz que não recebeu o produto", icon: "📦" },
  { label: "O cliente diz que faltou alguma peça", icon: "🔩" },
  { label: "O cliente diz que chegou quebrado", icon: "💔" },
  { label: "O cliente diz que quer devolver sem motivo", icon: "↩️" },
  { label: "O cliente diz que o produto veio errado", icon: "❌" },
];

function ToolDisputa() {
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);

  const fakeScript = selected !== null
    ? [
        "Informamos que o pedido foi devidamente postado dentro do prazo estabelecido pela plataforma...",
        "Nosso registro comprova que o produto saiu completo e em perfeito estado...",
      ][selected % 2]
    : "";

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-400 leading-relaxed">
        Não sabe o que responder quando um cliente abre disputa? O texto certo pode fazer a diferença entre <span className="text-zinc-200 font-semibold">ganhar ou perder o dinheiro</span>. Testa aqui 👇
      </p>
      <div>
        <p className="text-xs font-semibold text-zinc-400 mb-2">O que o cliente está reclamando?</p>
        <div className="grid grid-cols-1 gap-2">
          {disputeReasons.map((r, i) => (
            <button key={i} onClick={() => { setSelected(i); setLocked(false); }}
              className={`text-left px-4 py-3.5 rounded-xl border text-sm transition-all flex items-center gap-3 ${selected === i ? "bg-emerald-600/10 border-emerald-500 text-emerald-300" : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500"}`}>
              <span className="text-lg">{r.icon}</span>
              <span className="font-medium">{r.label}</span>
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => selected !== null && setLocked(true)}
        disabled={selected === null}
        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition-colors text-sm uppercase tracking-wide"
      >
        Gerar minha defesa →
      </button>

      {locked && (
        <div className="relative rounded-xl overflow-hidden min-h-[160px]">
          <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-5 blur-[3px] select-none pointer-events-none">
            <p className="text-xs font-bold text-emerald-400 mb-3">⚔️ Texto de defesa gerado — cole direto na Shopee</p>
            <div className="bg-zinc-900 rounded-xl p-4 text-sm text-zinc-300 leading-relaxed space-y-2 border border-emerald-500/10">
              <p>{fakeScript}</p>
              <p className="text-zinc-600">████████████████ ████ ████████ ████████ ████████████████. ████████ ████ ████████ ████████████ ████ ████ ████████.</p>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <p className="text-xs text-zinc-500">Argumentação técnica com linguagem da plataforma</p>
            </div>
          </div>
          <PaywallOverlay label="Ver minha defesa completa" />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  MODULES DATA
// ═══════════════════════════════════════════════════
const modules = [
  {
    id: 1, icon: <Calculator size={22} />, title: "Calculadora de Margem",
    tag: "Mais usado", tagColor: "bg-emerald-500/15 text-emerald-400",
    colSpan: "md:col-span-3",
    short: "Descubra se você está realmente lucrando — ou trabalhando de graça.",
    tool: <ToolMargem />,
    how: "Coloca o preço que você vende e quanto pagou no produto. A ferramenta calcula tudo que o marketplace desconta e mostra o que sobra de verdade no seu bolso.",
    why: "Muita gente começa vendendo empolgada, mas no fim do mês o dinheiro não aparece. Isso acontece porque as taxas do marketplace comem sua margem e você não vê. Essa ferramenta mostra isso de forma simples.",
    story: {
      name: "Carlos, 28 anos — começou na Shopee em 2023",
      text: "Eu achava que estava ganhando R$20 por venda. Quando calculei direito, vi que sobrava R$3. Quase desisti de vender online. Aí ajustei o preço e hoje lucro de verdade.",
      save: "Descobriu R$ 850 de prejuízo por mês",
    },
  },
  {
    id: 2, icon: <Package size={22} />, title: "Peso Cúbico do Frete",
    tag: "Evita prejuízo", tagColor: "bg-red-500/15 text-red-400",
    colSpan: "md:col-span-3",
    short: "Descubra por que o frete sai tão caro — mesmo em produtos leves.",
    tool: <ToolPesoCubico />,
    how: "Você mede a sua caixa (comprimento, largura e altura) e coloca aqui. A ferramenta calcula o peso que a transportadora usa para cobrar o frete — que pode ser bem diferente do peso real.",
    why: "Transportadoras cobram pelo espaço que a caixa ocupa no caminhão, não só pelo peso. Uma caixa de isopor com 3 peças dentro pode custar o frete de 2kg, mesmo pesando 400g. Sem saber isso, você está perdendo dinheiro em cada envio.",
    story: {
      name: "Fernanda, revendedora de produtos de decoração",
      text: "Minhas caixas eram grandes mas leves. Não fazia ideia que pagava frete como se fossem pesadas. Quando descobri, reduzi a caixa e economizei R$8 por pedido. Em 200 pedidos no mês, é R$1.600.",
      save: "R$ 1.600/mês economizados no frete",
    },
  },
  {
    id: 3, icon: <Type size={22} />, title: "Títulos que Aparecem",
    tag: "Mais vendas", tagColor: "bg-blue-500/15 text-blue-400",
    colSpan: "md:col-span-2",
    short: "Faça seu produto aparecer para mais pessoas e receber mais cliques.",
    tool: <ToolTitulos />,
    how: "Você escreve o nome do produto e a ferramenta cria 5 títulos diferentes — cada um pensado para aparecer mais na busca ou receber mais cliques. Você escolhe o que mais faz sentido.",
    why: "O título é a primeira coisa que o cliente vê — e o que o algoritmo usa para mostrar (ou esconder) o seu produto. Um título ruim faz você pagar por visibilidade que poderia ser de graça.",
    story: {
      name: "Rodrigo, revendedor de eletrônicos",
      text: "Meu produto ficava na página 5 das buscas. Mudei o título e em 3 dias aparecia na primeira página. Não mudei preço, não mudei foto — só o título. As vendas dobraram.",
      save: "+120% de cliques sem gastar nada",
    },
  },
  {
    id: 4, icon: <Video size={22} />, title: "Vídeos com Inteligência Artificial",
    tag: "Novidade", tagColor: "bg-purple-500/15 text-purple-400",
    colSpan: "md:col-span-2",
    short: "Crie vídeos profissionais para o seu anúncio — sem precisar filmar nada.",
    tool: <ToolPrompts />,
    how: "Você escolhe o tipo de vídeo que quer e coloca o nome do produto. A ferramenta gera um texto pronto para você colar em ferramentas gratuitas de IA que criam o vídeo automaticamente.",
    why: "Anúncios com vídeo aparecem mais no feed e vendem mais. Mas a maioria dos vendedores não tem câmera, não sabe editar e acha que precisa contratar alguém. Com IA, qualquer pessoa consegue.",
    story: {
      name: "Aline, vendedora iniciante na Shopee",
      text: "Nunca fiz um vídeo na vida. Copiei o texto da ferramenta, colei no CapCut AI, e em 10 minutos tinha um vídeo pronto para o meu anúncio. As vendas subiram 35% em duas semanas.",
      save: "+35% de vendas com o primeiro vídeo",
    },
  },
  {
    id: 5, icon: <ShieldAlert size={22} />, title: "Resposta para Disputas Shopee",
    tag: "Protege seu dinheiro", tagColor: "bg-orange-500/15 text-orange-400",
    colSpan: "md:col-span-2",
    short: "Não perca dinheiro por não saber como responder uma reclamação.",
    tool: <ToolDisputa />,
    how: "Você escolhe o motivo da reclamação do cliente. A ferramenta gera uma resposta profissional pronta para colar na Shopee — com os argumentos certos para defender o seu lado.",
    why: "Quando você não sabe responder uma disputa, a plataforma costuma decidir a favor do cliente. Com o texto certo, você tem muito mais chance de ganhar — e proteger o seu dinheiro.",
    story: {
      name: "Marcos, começou a vender há 8 meses",
      text: "Perdi quase R$800 em devoluções nos primeiros meses porque não sabia nem o que escrever. Descobri que a resposta certa faz toda a diferença. Hoje ganho a maioria das disputas.",
      save: "De 1 em 5 para 4 em 5 disputas ganhas",
    },
  },
];

// ═══════════════════════════════════════════════════
//  MODULE MODAL
// ═══════════════════════════════════════════════════
function ModuleModal({ mod, onClose }: { mod: typeof modules[0]; onClose: () => void }) {
  const [tab, setTab] = useState<"tool" | "guide">("tool");

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
        className="bg-zinc-950 border border-zinc-800 rounded-t-3xl md:rounded-2xl w-full md:max-w-xl max-h-[92vh] overflow-hidden flex flex-col"
      >
        {/* header */}
        <div className="flex items-start justify-between p-5 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600/10 rounded-xl text-emerald-500">{mod.icon}</div>
            <div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${mod.tagColor}`}>{mod.tag}</span>
              <h3 className="font-display text-lg font-black text-zinc-100 uppercase leading-tight mt-1">{mod.title}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        {/* tabs */}
        <div className="flex border-b border-zinc-800 shrink-0">
          {[{ key: "tool", label: "🔧 Experimentar" }, { key: "guide", label: "📖 Como funciona" }].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as any)}
              className={`flex-1 py-3 text-sm font-bold transition-colors ${tab === t.key ? "text-emerald-400 border-b-2 border-emerald-500" : "text-zinc-500 hover:text-zinc-300"}`}>
              {t.label}
            </button>
          ))}
        </div>
        {/* content */}
        <div className="overflow-y-auto flex-1 p-5">
          {tab === "tool" ? (
            <div>
              {mod.tool}
              <div className="mt-6 pt-5 border-t border-zinc-800 text-center">
                <p className="text-xs text-zinc-500 mb-3">Quer acesso completo a essa ferramenta e mais 4?</p>
                <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:scale-105">
                  <Zap size={15} /> Acesso completo por R$ {PRICE_PROMO}
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h4 className="text-sm font-bold text-zinc-100 mb-2 flex items-center gap-2">📋 Como usar</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">{mod.how}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h4 className="text-sm font-bold text-zinc-100 mb-2 flex items-center gap-2">💡 Por que isso importa</h4>
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
                className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl text-sm transition-all hover:scale-105">
                <Zap size={15} /> Quero acesso completo — R$ {PRICE_PROMO}
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
    {
      q: "Preciso entender muito de tecnologia para usar?",
      a: "Não. Tudo foi feito para ser simples. Se você sabe usar o celular e digitar um número, você consegue usar qualquer ferramenta do Ecommerce Labs sem dificuldade.",
    },
    {
      q: "Funciona para quem está começando do zero?",
      a: "Sim! Na verdade, quem está começando é quem mais se beneficia. Aprender a calcular margem e peso cúbico desde o início evita meses de prejuízo sem saber o motivo.",
    },
    {
      q: "Funciona para Mercado Livre e Shopee?",
      a: "Sim. As calculadoras funcionam para qualquer plataforma. A ferramenta de disputa tem foco na Shopee, que é onde o processo é mais complexo.",
    },
    {
      q: "É curso? Vou ter que assistir aulas?",
      a: "Não. São ferramentas — você abre, usa e já tem o resultado. Sem aula, sem vídeo, sem certificado. O objetivo é resolver o problema agora, não daqui a semanas.",
    },
    {
      q: "E se eu não gostar?",
      a: "Tem 7 dias de garantia. Se não gostar por qualquer motivo, é só pedir o reembolso. Simples assim.",
    },
    {
      q: "Como recebo o acesso depois que pagar?",
      a: "Na hora. Assim que o pagamento confirmar, você recebe um e-mail com o link de acesso. Não precisa esperar nada nem falar com ninguém.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 selection:bg-emerald-500/30">

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-40 bg-zinc-950/92 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-display font-black text-sm text-white">EL</div>
            <span className="font-display text-xl font-bold uppercase italic text-zinc-100 tracking-tight">Ecommerce Labs</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#ferramentas" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors font-medium">Ferramentas</a>
            <a href="#preco" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors font-medium">Preço</a>
            <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-5 py-2.5 rounded-lg font-bold transition-all">
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
              className="block w-full text-center bg-emerald-600 text-white py-4 rounded-xl font-bold text-base">
              Quero acesso — R$ {PRICE_PROMO}
            </a>
          </motion.div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 md:pt-52 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-600/7 blur-[130px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            {/* social proof pill */}
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2 mb-8">
              <div className="flex -space-x-1.5">
                {["bg-emerald-500","bg-blue-500","bg-purple-500","bg-yellow-500"].map((c,i) => (
                  <div key={i} className={`w-6 h-6 rounded-full ${c} border-2 border-zinc-900 flex items-center justify-center text-xs font-bold text-white`}>
                    {["C","F","R","A"][i]}
                  </div>
                ))}
              </div>
              <span className="text-xs text-zinc-400 font-medium">Mais de <span className="text-zinc-200 font-bold">300 vendedores</span> usando</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight text-zinc-100 leading-[0.95] mb-6 uppercase">
              Você trabalha,<br />
              mas o dinheiro<br />
              <span className="text-emerald-500 italic">some?</span>
            </h1>
            <p className="max-w-xl mx-auto text-lg text-zinc-400 mb-4 leading-relaxed">
              O problema não é você. É que ninguém te ensinou a calcular direito.
            </p>
            <p className="max-w-xl mx-auto text-base text-zinc-500 mb-10 leading-relaxed">
              O Ecommerce Labs tem 5 ferramentas simples para você descobrir onde o dinheiro está indo — e começar a lucrar de verdade.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-5 rounded-xl font-display text-xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-900/40 uppercase">
                Quero acesso agora
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
                  <ArrowRight size={20} />
                </motion.span>
              </a>
              <div className="text-center">
                <p className="text-2xl font-display font-black text-emerald-400">R$ {PRICE_PROMO}</p>
                <p className="text-xs text-zinc-600">pagamento único · sem mensalidade</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-600">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-600" /> Acesso imediato</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-600" /> 7 dias de garantia</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-600" /> Sem precisar entender de tecnologia</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DOR ── */}
      <section className="py-20 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-black text-zinc-100 uppercase leading-tight mb-4">
              Isso já aconteceu com você?
            </h2>
            <p className="text-zinc-500 max-w-lg mx-auto">Se você se identificar com qualquer um desses, o Ecommerce Labs foi feito para você.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: "😓", text: "Você vende bastante, mas no final do mês o dinheiro não aparece" },
              { icon: "😤", text: "Não sabe se está lucrando ou vendendo no prejuízo sem perceber" },
              { icon: "📦", text: "O frete sai mais caro do que você esperava e não sabe por quê" },
              { icon: "🔍", text: "Seu produto existe mas ninguém acha — ou ninguém clica" },
              { icon: "😰", text: "Um cliente abriu disputa e você não sabe o que responder" },
              { icon: "📹", text: "Sabe que vídeo vende mais, mas não tem como fazer um" },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <p className="text-sm text-zinc-300 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-emerald-400 font-bold text-lg italic">Se você disse sim para algum desses — continue lendo.</p>
          </div>
        </div>
      </section>

      {/* ── FERRAMENTAS ── */}
      <section id="ferramentas" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">5 ferramentas práticas</span>
            <h2 className="font-display text-4xl md:text-5xl font-black mt-2 uppercase text-zinc-100 leading-tight">
              Simples de usar.<br />
              <span className="text-emerald-500">Resultados reais.</span>
            </h2>
            <p className="mt-4 text-zinc-500 max-w-lg mx-auto text-sm leading-relaxed">
              Clique em qualquer ferramenta para experimentar — sem precisar comprar nada agora.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {modules.map(mod => (
              <motion.div key={mod.id}
                whileHover={{ y: -4, borderColor: "rgba(16,185,129,0.5)" }}
                onClick={() => setActiveModule(mod)}
                className={`${mod.colSpan} bg-zinc-900 border border-zinc-800 rounded-2xl p-6 cursor-pointer group transition-all`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 bg-emerald-600/10 rounded-xl text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    {mod.icon}
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${mod.tagColor}`}>{mod.tag}</span>
                </div>
                <h3 className="font-display text-lg font-black text-zinc-100 uppercase mb-2 leading-tight">{mod.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{mod.short}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-500 group-hover:gap-3 transition-all">
                  Experimentar grátis <ArrowRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROVA SOCIAL ── */}
      <section className="py-20 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-black text-zinc-100 uppercase">O que está mudando para quem usa</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Carlos, SP", role: "Vendedor Shopee — 8 meses", text: "Achava que estava ganhando R$20 por peça. Quando calculei, vi que sobrava R$3. Ajustei o preço e hoje lucro de verdade.", result: "Descobriu R$850 de prejuízo por mês" },
              { name: "Fernanda, PR", role: "Revendedora de decoração", text: "Aprendi sobre peso cúbico e descobri que estava pagando R$8 a mais por pedido. Com 200 pedidos, eram R$1.600 indo embora todo mês.", result: "R$1.600 economizados por mês" },
              { name: "Marcos, RJ", role: "Iniciante na Shopee", text: "Perdi quase R$800 em disputas porque não sabia o que responder. Com os textos prontos, comecei a ganhar a maioria.", result: "De 1 em 5 para 4 em 5 disputas ganhas" },
            ].map((t, i) => (
              <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                <div className="flex mb-3">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-sm text-zinc-300 italic leading-relaxed mb-4">"{t.text}"</p>
                <div className="border-t border-zinc-800 pt-4">
                  <p className="text-xs font-bold text-zinc-200">{t.name}</p>
                  <p className="text-xs text-zinc-600">{t.role}</p>
                  <div className="mt-2 inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
                    <TrendingUp size={11} className="text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400">{t.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTOR ── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
            <div className="w-36 h-36 shrink-0 bg-zinc-800 rounded-2xl border border-zinc-700 flex items-center justify-center rotate-2">
              <span className="font-display text-5xl font-black text-emerald-500/30">EL</span>
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Quem criou</span>
              <h2 className="font-display text-3xl font-black text-zinc-100 mt-2 mb-4 uppercase">Criado por quem vende, <span className="italic text-emerald-500">não por consultor.</span></h2>
              <p className="text-zinc-400 leading-relaxed text-sm mb-3">
                Sou vendedor Platinum no Mercado Livre e opero também na Shopee. Comecei sem entender nada de taxa, peso cúbico ou título de anúncio — e aprendi da forma mais cara: no prejuízo.
              </p>
              <p className="text-zinc-400 leading-relaxed text-sm">
                O Ecommerce Labs são as ferramentas que eu quis ter no começo. Feitas em linguagem simples, para quem está construindo agora.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Vendedor Platinum ML", "Operador Shopee", "Aprendi no campo"].map(b => (
                  <span key={b} className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1.5">
                    <CheckCircle2 size={11} className="text-emerald-500" /> {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="preco" className="py-20 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Investimento</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-zinc-100 mt-3 mb-3 uppercase leading-tight">
              Menos do que<br />um frete errado.
            </h2>
            <p className="text-zinc-500 mb-8 leading-relaxed max-w-md mx-auto">
              Um erro de cálculo pode te custar R$50, R$200, R$800 por mês. O Ecommerce Labs resolve isso por uma fração desse valor.
            </p>
            <div className="bg-zinc-950 border-2 border-emerald-600/50 rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-black px-4 py-2 rounded-bl-2xl uppercase tracking-wide">
                🔥 Lançamento
              </div>
              <p className="text-zinc-600 line-through text-lg mb-1">R$ {PRICE_FULL},00</p>
              <div className="flex items-end justify-center gap-2 mb-1">
                <span className="text-zinc-400 text-lg mb-2">por apenas</span>
                <span className="font-display text-7xl font-black text-emerald-400 leading-none">R$ {PRICE_PROMO}</span>
              </div>
              <p className="text-zinc-600 text-sm mb-8">pagamento único · acesso imediato · sem mensalidade</p>

              <ul className="text-left space-y-3 mb-8 max-w-xs mx-auto">
                {[
                  "Calculadora de Margem Real",
                  "Calculadora de Peso Cúbico",
                  "Criador de Títulos que Vendem",
                  "Gerador de Vídeos com IA",
                  "Respostas para Disputas Shopee",
                  "Atualizações futuras incluídas",
                ].map(i => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-zinc-300">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> {i}
                  </li>
                ))}
              </ul>

              <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
                className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-xl font-display text-2xl font-black transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-900/40 uppercase mb-4">
                Quero acesso agora →
              </a>
              <div className="flex items-center justify-center gap-2 text-sm text-zinc-600">
                <Lock size={13} className="text-emerald-700" />
                7 dias de garantia · Pagamento seguro via Kiwify
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 border-t border-zinc-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-black text-center mb-10 uppercase italic text-zinc-100">Perguntas frequentes</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <button className="w-full flex items-center justify-between p-5 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-zinc-200 text-sm">{faq.q}</span>
                  <ChevronDown size={18} className={`text-emerald-500 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800 pt-4">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <footer className="py-20 border-t border-zinc-800 text-center bg-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-4xl md:text-5xl font-black text-zinc-100 mb-4 uppercase leading-tight">
            Você merece saber<br /><span className="text-emerald-500 italic">quanto está ganhando</span>.
          </h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
            Não precisa ser expert. Não precisa ter experiência. Só precisa das ferramentas certas.
          </p>
          <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-xl font-display text-2xl font-black transition-all hover:scale-105 active:scale-95 uppercase">
            Começar agora — R$ {PRICE_PROMO}
          </a>
          <p className="mt-4 text-zinc-600 text-xs">✓ Acesso imediato &nbsp;·&nbsp; ✓ Sem mensalidade &nbsp;·&nbsp; ✓ 7 dias de garantia</p>
          <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between gap-3 text-zinc-700 text-xs uppercase font-bold tracking-widest">
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
