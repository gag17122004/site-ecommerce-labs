import { motion, AnimatePresence } from "motion/react";
import {
  Calculator, Package, Type, Video, ShieldAlert,
  ChevronDown, CheckCircle2, ExternalLink, Menu, X,
  Copy, Check, RefreshCw, ArrowRight, Lock, TrendingUp,
} from "lucide-react";
import { useState, useCallback } from "react";

const PAYMENT_LINK = "https://pay.kiwify.com.br/X7e9Nln";
const PRICE_FULL = "197";
const PRICE_PROMO = "97";

// ═══════════════════════════════════════════════════
//  TOOL 1 — Calculadora de Margem de Lucro Real
// ═══════════════════════════════════════════════════
function ToolMargem() {
  const [f, setF] = useState({ preco: "", custo: "", taxa: "12", frete: "", embalagem: "", outros: "" });
  const [res, setRes] = useState<null | { lucro: number; margem: number; receita: number; custoTotal: number }>(null);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF(p => ({ ...p, [k]: e.target.value }));

  const calc = () => {
    const preco = parseFloat(f.preco) || 0;
    const custo = parseFloat(f.custo) || 0;
    const taxa = (parseFloat(f.taxa) || 0) / 100;
    const frete = parseFloat(f.frete) || 0;
    const emb = parseFloat(f.embalagem) || 0;
    const outros = parseFloat(f.outros) || 0;
    const taxaVal = preco * taxa;
    const custoTotal = custo + taxaVal + frete + emb + outros;
    const lucro = preco - custoTotal;
    const margem = preco > 0 ? (lucro / preco) * 100 : 0;
    setRes({ lucro, margem, receita: preco, custoTotal });
  };

  const status = res ? (res.margem >= 20 ? "ok" : res.margem >= 10 ? "warn" : "bad") : null;
  const statusColor = status === "ok" ? "text-emerald-400" : status === "warn" ? "text-yellow-400" : "text-red-400";
  const statusMsg =
    status === "ok" ? "✅ Margem saudável — siga em frente" :
    status === "warn" ? "⚠️ Margem no limite — revise o custo ou o preço" :
    "🚨 Prejuízo — não publique esse anúncio assim";

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Preço de venda (R$)", k: "preco", ph: "0,00" },
          { label: "Custo do produto (R$)", k: "custo", ph: "0,00" },
          { label: "Custo do frete (R$)", k: "frete", ph: "0,00" },
          { label: "Embalagem (R$)", k: "embalagem", ph: "0,00" },
          { label: "Outros custos (R$)", k: "outros", ph: "impostos..." },
        ].map(i => (
          <div key={i.k}>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">{i.label}</label>
            <input type="number" placeholder={i.ph} value={(f as any)[i.k]} onChange={set(i.k)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors" />
          </div>
        ))}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Taxa do marketplace (%)</label>
          <input type="number" placeholder="12" value={f.taxa} onChange={set("taxa")}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors" />
          <p className="text-xs text-zinc-600 mt-1">ML: ~12–16% · Shopee: ~14%</p>
        </div>
      </div>
      <button onClick={calc}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-colors text-sm uppercase tracking-wide">
        Calcular margem real
      </button>
      {res && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Preço de venda", val: `R$ ${res.receita.toFixed(2)}`, c: "text-zinc-200" },
              { label: "Custo total", val: `R$ ${res.custoTotal.toFixed(2)}`, c: "text-red-400" },
              { label: "Lucro real", val: `R$ ${res.lucro.toFixed(2)}`, c: res.lucro >= 0 ? "text-emerald-400" : "text-red-400" },
              { label: "Margem real", val: `${res.margem.toFixed(1)}%`, c: statusColor },
            ].map(i => (
              <div key={i.label} className="bg-zinc-900 rounded-lg p-3">
                <p className="text-xs text-zinc-500 mb-1">{i.label}</p>
                <p className={`text-lg font-bold ${i.c}`}>{i.val}</p>
              </div>
            ))}
          </div>
          <div className={`text-sm font-semibold text-center py-2 px-4 rounded-lg ${
            status === "ok" ? "bg-emerald-500/10 text-emerald-400" :
            status === "warn" ? "bg-yellow-500/10 text-yellow-400" :
            "bg-red-500/10 text-red-400"}`}>
            {statusMsg}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  TOOL 2 — Calculadora de Peso Cúbico
// ═══════════════════════════════════════════════════
function ToolPesoCubico() {
  const [f, setF] = useState({ comp: "", larg: "", alt: "", pesoReal: "", divisor: "6000" });
  const [res, setRes] = useState<null | { cubico: number; cobrado: number; pesoReal: number; qual: string }>(null);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF(p => ({ ...p, [k]: e.target.value }));

  const calc = () => {
    const c = parseFloat(f.comp) || 0;
    const l = parseFloat(f.larg) || 0;
    const a = parseFloat(f.alt) || 0;
    const pr = parseFloat(f.pesoReal) || 0;
    const div = parseFloat(f.divisor) || 6000;
    const cubico = (c * l * a) / div;
    const cobrado = Math.max(cubico, pr);
    const qual = cubico > pr ? "cúbico" : "real";
    setRes({ cubico, cobrado, pesoReal: pr, qual });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Comprimento (cm)", k: "comp" },
          { label: "Largura (cm)", k: "larg" },
          { label: "Altura (cm)", k: "alt" },
        ].map(i => (
          <div key={i.k}>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">{i.label}</label>
            <input type="number" placeholder="0" value={(f as any)[i.k]} onChange={set(i.k)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Peso real (kg)</label>
          <input type="number" placeholder="0,000" value={f.pesoReal} onChange={set("pesoReal")}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Transportadora</label>
          <select value={f.divisor} onChange={set("divisor")}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors">
            <option value="6000">Correios / Mercado Envios / Shopee (÷6000)</option>
            <option value="5000">Jadlog (÷5000)</option>
            <option value="4000">Transportadora privada (÷4000)</option>
          </select>
        </div>
      </div>
      <button onClick={calc}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-colors text-sm uppercase tracking-wide">
        Calcular peso cobrado
      </button>
      {res && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Peso real", val: `${res.pesoReal.toFixed(3)} kg`, c: "text-zinc-200" },
              { label: "Peso cúbico", val: `${res.cubico.toFixed(3)} kg`, c: "text-yellow-400" },
              { label: "Será cobrado", val: `${res.cobrado.toFixed(3)} kg`, c: "text-emerald-400" },
            ].map(i => (
              <div key={i.label} className="bg-zinc-900 rounded-lg p-3 text-center">
                <p className="text-xs text-zinc-500 mb-1">{i.label}</p>
                <p className={`text-base font-bold ${i.c}`}>{i.val}</p>
              </div>
            ))}
          </div>
          <div className={`text-sm font-semibold text-center py-2 px-4 rounded-lg ${
            res.qual === "cúbico" ? "bg-yellow-500/10 text-yellow-400" : "bg-emerald-500/10 text-emerald-400"}`}>
            {res.qual === "cúbico"
              ? "⚠️ Cobrado pelo peso CÚBICO — sua caixa é grande demais para o peso"
              : "✅ Cobrado pelo peso REAL — sua embalagem está eficiente"}
          </div>
          <p className="text-xs text-zinc-600 text-center">
            Fórmula: ({f.comp} × {f.larg} × {f.alt}) ÷ {f.divisor} = {res.cubico.toFixed(3)} kg
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  TOOL 3 — Gerador de Títulos SEO (sua ferramenta)
// ═══════════════════════════════════════════════════
const titleKeywords = {
  shippingTriggers: ["Pronta Entrega", "Envio Imediato", "Estoque Nacional", "Entrega Rápida", "Disponível Já"],
  qualityAdjectives: ["Original", "Certificado", "Durável", "Alta Qualidade", "Top"],
  premiumAdjectives: ["Premium", "Top de Linha", "Exclusivo", "Profissional", "Melhor Custo Benefício"],
  technicalSpecs: ["Bluetooth 5.0", "Wireless", "Recarregável", "USB-C", "Com Microfone", "À Prova D'Água"],
  priceTriggers: ["Oferta", "Promoção", "Desconto", "Queima de Estoque", "Liquidação"],
  usageBenefits: ["Para Casa", "Para Escritório", "Uso Diário", "Fácil Instalação", "Para Presente"],
  seoSynonyms: ["Acessório", "Eletrônico", "Kit Completo", "Conjunto", "Produto"],
};

function getRandom<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function toTitleCase(str: string) {
  return str.toLowerCase().split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function ToolTitulos() {
  const [product, setProduct] = useState("");
  const [checked, setChecked] = useState<string[]>([]);
  const [titles, setTitles] = useState<{ title: string; strategy: string }[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const toggleCheck = (v: string) => setChecked(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);

  const generate = () => {
    if (!product.trim()) return;
    const p = product.trim();
    const results = [
      { title: toTitleCase(`${p} ${getRandom(titleKeywords.shippingTriggers)} ${getRandom(titleKeywords.qualityAdjectives)}`).substring(0, 100), strategy: "🚀 Foco em Rapidez" },
      { title: toTitleCase(`${getRandom(titleKeywords.premiumAdjectives)} ${p} ${getRandom(titleKeywords.technicalSpecs)}${checked.includes("garantia") ? " Garantia" : ""}`).substring(0, 100), strategy: "🏆 Foco em Autoridade" },
      { title: toTitleCase(`${getRandom(titleKeywords.priceTriggers)} ${p} ${getRandom(titleKeywords.usageBenefits)}`).substring(0, 100), strategy: "💰 Foco em Oferta" },
      { title: toTitleCase(`${p} ${getRandom(titleKeywords.seoSynonyms)} ${getRandom(titleKeywords.technicalSpecs)}`).substring(0, 100), strategy: "🔍 Foco em SEO" },
    ];
    const mix = [...new Set([getRandom(titleKeywords.premiumAdjectives), p, getRandom(titleKeywords.shippingTriggers), getRandom(titleKeywords.priceTriggers)])].sort(() => Math.random() - 0.5).join(" ");
    results.push({ title: toTitleCase(mix).substring(0, 100), strategy: "⚡ Mix Completo" });
    setTitles(results);
  };

  const copy = (i: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-semibold text-zinc-400 mb-1">Nome base do produto</label>
        <input type="text" placeholder="Ex: Fone de Ouvido Bluetooth TWS"
          value={product} onChange={e => setProduct(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors" />
      </div>
      <div>
        <p className="text-xs font-semibold text-zinc-400 mb-2">Atributos do produto</p>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "premium", label: "Premium" },
            { value: "prontaEntrega", label: "Pronta Entrega" },
            { value: "garantia", label: "Garantia" },
            { value: "freteGratis", label: "Frete Grátis" },
            { value: "oferta", label: "Oferta" },
          ].map(a => (
            <button key={a.value} onClick={() => toggleCheck(a.value)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${checked.includes(a.value) ? "bg-emerald-600 border-emerald-600 text-white" : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500"}`}>
              {a.label}
            </button>
          ))}
        </div>
      </div>
      <button onClick={generate}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-colors text-sm uppercase tracking-wide">
        Gerar estratégia de dominação
      </button>
      {titles.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {titles.map((t, i) => (
            <div key={i} className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-4 flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-emerald-500 mb-1">{t.strategy}</p>
                <p className="text-sm text-zinc-100 leading-snug">{t.title}</p>
                <p className="text-xs text-zinc-600 mt-1">{t.title.length} caracteres</p>
              </div>
              <button onClick={() => copy(i, t.title)}
                className={`shrink-0 p-2 rounded-lg border transition-all ${copied === i ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-zinc-700 border-zinc-600 text-zinc-400 hover:text-zinc-100"}`}>
                {copied === i ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          ))}
          <button onClick={generate}
            className="w-full flex items-center justify-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 py-2 transition-colors">
            <RefreshCw size={12} /> Gerar novas variações
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  TOOL 4 — Prompts para Vídeos de Anúncio com IA
// ═══════════════════════════════════════════════════
const promptTemplates = [
  {
    type: "Demonstração do produto",
    icon: "🎬",
    prompt: (p: string) => `Crie um vídeo de 15 segundos mostrando ${p || "[seu produto]"} em uso. Câmera próxima ao produto. Fundo neutro branco ou cinza claro. Mostre o produto sendo usado com mãos visíveis. Iluminação suave e natural. Adicione texto na tela: "Qualidade garantida. Pronta entrega." Ritmo dinâmico, cortes a cada 3 segundos. Finalize com o nome do produto em destaque.`,
  },
  {
    type: "Comparação antes/depois",
    icon: "⚡",
    prompt: (p: string) => `Vídeo de 20 segundos com efeito split-screen. Lado esquerdo: problema sem ${p || "[seu produto]"} — caos, desorganização. Lado direito: solução com ${p || "[seu produto]"} — ordem, resultado. Música animada e motivadora. Texto sobreposto: "Simples assim. Mude hoje." Finalize com CTA: "Clique e compre agora."`,
  },
  {
    type: "Unboxing rápido",
    icon: "📦",
    prompt: (p: string) => `Grave um unboxing de 25 segundos de ${p || "[seu produto]"}. Câmera overhead (ângulo acima). Abra a caixa devagar, mostre cada item com pausa de 2 segundos. Adicione som de abertura. Texto: "Tudo isso em um kit. Entrega rápida." Fundo de mesa de madeira. Termine com o produto pronto para uso.`,
  },
  {
    type: "Clip de benefícios",
    icon: "✨",
    prompt: (p: string) => `Vídeo de 10 segundos estilo reel rápido para ${p || "[seu produto]"}. 3 benefícios em texto grande: 1) "Qualidade comprovada" 2) "Pronta entrega" 3) "Garantia incluída". Fundo escuro com brilhos. Fonte branca em negrito. Música eletrônica suave. Finaliza com logo da loja.`,
  },
  {
    type: "Depoimento animado",
    icon: "💬",
    prompt: (p: string) => `Crie vídeo de 18 segundos simulando depoimento de cliente sobre ${p || "[seu produto]"}. Avatar animado falando. Frase: "Recebi em 2 dias, produto idêntico ao anúncio. Super recomendo!" Nome fictício e 5 estrelas abaixo. Fundo claro. Badge "Compra verificada" no canto superior direito.`,
  },
];

function ToolPrompts() {
  const [product, setProduct] = useState("");
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentPrompt = promptTemplates[selected].prompt(product);

  const copy = () => {
    navigator.clipboard.writeText(currentPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-semibold text-zinc-400 mb-1">Nome do seu produto</label>
        <input type="text" placeholder="Ex: Organizador de cabos USB"
          value={product} onChange={e => setProduct(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors" />
      </div>
      <div>
        <p className="text-xs font-semibold text-zinc-400 mb-2">Tipo de vídeo</p>
        <div className="grid grid-cols-1 gap-2">
          {promptTemplates.map((t, i) => (
            <button key={i} onClick={() => setSelected(i)}
              className={`text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center gap-3 ${selected === i ? "bg-emerald-600/10 border-emerald-500 text-emerald-400" : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500"}`}>
              <span>{t.icon}</span>
              <span className="font-medium">{t.type}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-zinc-400">Prompt gerado</p>
          <button onClick={copy}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${copied ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-zinc-700 border-zinc-600 text-zinc-400 hover:text-zinc-100"}`}>
            {copied ? <><Check size={12} /> Copiado!</> : <><Copy size={12} /> Copiar prompt</>}
          </button>
        </div>
        <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-4 text-sm text-zinc-300 leading-relaxed">
          {currentPrompt}
        </div>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <p className="text-xs font-bold text-zinc-300 mb-2">🤖 Onde usar esse prompt:</p>
        <div className="grid grid-cols-2 gap-2">
          {["Runway ML", "Pika Labs", "CapCut AI", "Sora (OpenAI)"].map(tool => (
            <div key={tool} className="text-xs text-zinc-500 flex items-center gap-1.5">
              <ArrowRight size={10} className="text-emerald-500" /> {tool}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  TOOL 5 — Disputa Shopee (sua ferramenta original)
// ═══════════════════════════════════════════════════
const disputeScripts: Record<string, Record<string, string[]>> = {
  "Não recebimento do pedido: O pacote não foi entregue.": {
    "Não recebi o produto devolvido pelo Comprador, mas consta como entregue na Central do Vendedor": [
      "Verificamos que o prazo de devolução expirou e o item não retornou ao nosso centro de distribuição.",
      "Informamos que, até o presente momento, o rastreio reverso não consta como entregue em nossa unidade.",
      "Prezada equipe, o status de devolução permanece pendente; não houve a entrega física do produto pelo comprador.",
      "Constatamos que o fluxo logístico de retorno foi interrompido, resultando na não recepção da mercadoria.",
      "Solicitamos a mediação, pois o comprador não efetuou a postagem do item dentro do prazo regulamentar.",
      "Notificamos que o objeto de logística reversa não deu entrada em nossa expedição técnica.",
      "Conforme nosso controle de recebimento, o pacote referente a esta disputa nunca chegou ao destino final.",
      "Pedimos o encerramento da disputa a nosso favor, visto que o produto permanece em posse do comprador.",
      "Ressaltamos que o recebimento do item é condição essencial para o reembolso, o que não ocorreu neste caso.",
    ],
  },
  "Produto incompleto: Faltando itens ou componentes.": {
    "Pedido foi enviado com todos os seus componentes e na quantidade correta. Solicito a compensação pelo pedido": [
      "Reafirmamos que o pedido passou por conferência dupla e foi postado com todos os acessórios inclusos.",
      "Nosso registro de pesagem comprova que todos os componentes estavam presentes na caixa.",
      "O item foi lacrado em nossa expedição contendo o kit completo, conforme descrito no título do anúncio.",
      "Garantimos que o produto não possui partes faltando, seguindo o padrão de montagem industrial.",
      "O envio foi auditado por nossa equipe técnica e saiu 100% completo.",
      "Não há possibilidade de itens faltantes, visto que utilizamos embalagens padronizadas para o kit total.",
      "O peso final do volume postado atesta que nenhum item foi deixado para trás no momento da separação.",
      "O produto é vendido em embalagem selada de fábrica, o que garante a presença de todas as suas partes.",
    ],
    "O pacote chegou vazio ou estão faltando peças e/ou acessórios no pedido que foi devolvido pelo Comprador": [
      "Ao abrir o pacote de devolução, constatamos a ausência do produto principal, restando apenas a embalagem.",
      "Informamos que o kit retornou incompleto, faltando componentes essenciais que foram originalmente enviados.",
      "Identificamos uma divergência: o peso do pacote recebido é inferior ao peso da postagem inicial.",
      "O comprador devolveu apenas parte do pedido, retendo acessórios fundamentais do produto.",
      "Verificamos que a embalagem de retorno foi violada e o conteúdo interno não corresponde ao que foi vendido.",
      "A conferência técnica de entrada registrou que o pacote chegou vazio, configurando prejuízo total.",
    ],
  },
  "Produto incorreto: Cor, tamanho ou modelo diferente do anunciado.": {
    "O produto que recebi não é o mesmo que enviei ao Comprador": [
      "Identificamos que o item devolvido pertence a outro modelo, não sendo o produto originalmente enviado.",
      "O comprador efetuou a substituição do produto novo por um item usado e de procedência distinta.",
      "Verificamos que os números de série e etiquetas de identificação não coincidem com nossos registros.",
      "O produto retornado apresenta características físicas diferentes do anunciado e enviado originalmente.",
      "Houve tentativa de devolução de item similar, porém nitidamente inferior e já desgastado pelo uso.",
      "Constatamos que a mercadoria devolvida é produto antigo do cliente, em lugar do nosso item novo.",
      "Solicitamos mediação imediata, pois recebemos um objeto estranho ao pedido original do cliente.",
    ],
  },
  "Produto danificado: Avarias no transporte (quebrado, amassado).": {
    "Pedido foi danificado, apesar de ter sido enviado em embalagem adequada. Solicito a compensação pelo pedido": [
      "O item foi protegido com camadas de reforço, porém a força do impacto no transporte rompeu a embalagem.",
      "Utilizamos embalagens de alta resistência, mas o tratamento da transportadora causou o dano ao produto.",
      "O padrão de embalagem excede as normas, sendo o dano fruto de mau uso logístico.",
      "O produto sofreu pressão excessiva durante o empilhamento na carga, sem responsabilidade do vendedor.",
      "O pacote foi enviado com sinalização 'Frágil' e proteção interna, mas não resistiu à queda no trajeto.",
      "O dano ocorreu por falha externa, visto que a embalagem é testada para transporte longo.",
      "Mesmo com plástico bolha e reforço, o produto foi avariado por condições adversas no transporte.",
    ],
  },
  "Produto com defeito: Não funciona corretamente ou não liga.": {
    "Recebi produtos devolvidos amassado, arranhado ou quebrado/danos físicos.": [
      "O item foi enviado em bom estado; os danos visíveis na devolução ocorreram durante o transporte de retorno.",
      "A integridade física do produto foi comprometida no trajeto, com avarias que não existiam na postagem original.",
      "O item retornou quebrado devido ao manuseio inadequado da transportadora ou falta de zelo no reenvio.",
      "O produto foi enviado em perfeito estado de conservação, mas retornou com avarias estruturais do transporte.",
      "O dano apresentado na devolução é fruto direto do processo de movimentação da carga.",
      "A peça apresenta quebras decorrentes de choque mecânico sofrido após sair das mãos do comprador.",
    ],
  },
  "Mudança de ideia: Desistência da compra (deve ser em até 7 dias e o produto sem uso)": {
    "Não concordo com o desconto das taxas de devolução": [
      "Contestamos a taxa, pois a devolução foi motivada por erro de escolha do comprador, sem falha da loja.",
      "O vendedor cumpriu integralmente o prazo e as especificações; o custo logístico não deve ser repassado.",
      "Não concordamos com a cobrança, visto que o produto foi enviado conforme o anúncio.",
      "Solicitamos o estorno da taxa de frete reverso, pois não houve vício ou defeito na mercadoria enviada.",
      "A devolução por mudança de ideia deve isentar o vendedor dos custos operacionais, conforme política vigente.",
      "Reivindicamos a isenção das taxas, uma vez que o produto enviado está em plena conformidade com o pedido.",
    ],
  },
};

function ToolDisputa() {
  const [reason, setReason] = useState("");
  const [justification, setJustification] = useState("");
  const [script, setScript] = useState("");
  const [copied, setCopied] = useState(false);

  const reasons = Object.keys(disputeScripts);
  const justifications = reason ? Object.keys(disputeScripts[reason] || {}) : [];

  const pickRandom = useCallback((r: string, j: string) => {
    const arr = disputeScripts[r]?.[j];
    if (arr?.length) setScript(arr[Math.floor(Math.random() * arr.length)]);
  }, []);

  const handleJustification = (j: string) => {
    setJustification(j);
    pickRandom(reason, j);
  };

  const copy = () => {
    if (!script) return;
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-semibold text-zinc-400 mb-1">Motivo do cliente (na Shopee)</label>
        <select value={reason}
          onChange={e => { setReason(e.target.value); setJustification(""); setScript(""); }}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors">
          <option value="">Selecione o motivo da disputa...</option>
          {reasons.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      {justifications.length > 0 && (
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Sua situação real</label>
          <select value={justification} onChange={e => handleJustification(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors">
            <option value="">Selecione a justificativa...</option>
            {justifications.map(j => <option key={j} value={j}>{j}</option>)}
          </select>
        </div>
      )}
      {script && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-zinc-400">Script de defesa</p>
            <div className="flex gap-2">
              <button onClick={() => pickRandom(reason, justification)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border bg-zinc-700 border-zinc-600 text-zinc-400 hover:text-zinc-100 transition-all">
                <RefreshCw size={12} /> Nova variante
              </button>
              <button onClick={copy}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${copied ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-zinc-700 border-zinc-600 text-zinc-400 hover:text-zinc-100"}`}>
                {copied ? <><Check size={12} /> Copiado!</> : <><Copy size={12} /> Copiar</>}
              </button>
            </div>
          </div>
          <div className="bg-zinc-800/60 border border-emerald-500/20 rounded-xl p-4 text-sm text-zinc-200 leading-relaxed">
            {script}
          </div>
          <p className="text-xs text-zinc-600">💡 Cole esse texto na caixa de resposta da disputa na Shopee.</p>
        </motion.div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  MODULE DATA
// ═══════════════════════════════════════════════════
const modules = [
  {
    id: 1, icon: <Calculator size={22} />, title: "Calculadora de Margem Real",
    tag: "Precificação", colSpan: "md:col-span-3",
    short: "Descubra se o anúncio está te dando lucro ou te afundando — antes de publicar.",
    tool: <ToolMargem />,
    how: "Preencha o preço de venda, custo do produto e as taxas do marketplace. A calculadora mostra seu lucro real e a margem percentual — com alerta colorido se você estiver no limite ou no prejuízo.",
    why: "Sem calcular a margem real, você pode estar trabalhando meses para lucrar zero. Cada taxa ignorada é dinheiro que vai para o marketplace, não para o seu bolso.",
    story: {
      name: "Carlos M. — vendedor Shopee, São Paulo/SP",
      text: "Achava que estava lucrando R$18 por peça. Depois que calculei direito com a ferramenta, vi que sobrava R$4. Em 200 vendas no mês, eram R$2.800 que eu estava deixando na mesa.",
      save: "R$ 2.800/mês recuperados",
    },
  },
  {
    id: 2, icon: <Package size={22} />, title: "Calculadora de Peso Cúbico",
    tag: "Logística", colSpan: "md:col-span-3",
    short: "Entenda como as transportadoras cobram e pare de pagar frete a mais.",
    tool: <ToolPesoCubico />,
    how: "Informe as dimensões da embalagem (cm) e o peso real. A calculadora mostra o peso cúbico, compara com o real e informa qual será cobrado — e por qual motivo.",
    why: "O peso cúbico é o gato invisível do frete. Uma caixa que pesa 400g pode ser cobrada como 1,2kg. Quem não calcula isso antes de precificar está absorvendo o prejuízo silenciosamente.",
    story: {
      name: "Fernanda L. — vendedora ML, Curitiba/PR",
      text: "Vendia luminária decorativa. A caixa era grande mas leve. Não sabia que o Mercado Envios cobrava pelo cúbico. Calculei e vi que estava pagando R$12 a mais por venda. Em 150 pedidos no mês, eram R$1.800 de diferença.",
      save: "R$ 1.800/mês recuperados",
    },
  },
  {
    id: 3, icon: <Type size={22} />, title: "Criador de Títulos Magnéticos",
    tag: "Catálogo", colSpan: "md:col-span-2",
    short: "Títulos que aparecem na busca e que fazem o cliente clicar.",
    tool: <ToolTitulos />,
    how: "Digite o nome do produto, selecione os atributos relevantes e clique em gerar. A ferramenta cria 5 variações com estratégias diferentes — SEO, autoridade, urgência, oferta e mix completo.",
    why: "O título decide se o algoritmo vai mostrar ou esconder seu produto — e se o cliente vai clicar no seu ou no concorrente. É a primeira e mais importante otimização de qualquer anúncio.",
    story: {
      name: "Rodrigo T. — vendedor ML, Porto Alegre/RS",
      text: "Meu anúncio de suporte para monitor ficava na página 4. Mudei o título usando a ferramenta. Em 3 dias subiu para a página 1. As vendas mais que dobraram sem mudar nada no produto.",
      save: "+120% de cliques no anúncio",
    },
  },
  {
    id: 4, icon: <Video size={22} />, title: "Prompts para Vídeos de Anúncio",
    tag: "Conteúdo", colSpan: "md:col-span-2",
    short: "Crie clips profissionais com IA — sem editar, sem contratar ninguém.",
    tool: <ToolPrompts />,
    how: "Digite o nome do produto, escolha o tipo de vídeo e copie o prompt. Cole em qualquer ferramenta de IA para vídeo (Runway, Pika, CapCut AI) e publique no anúncio.",
    why: "Anúncios com vídeo têm até 40% mais conversão. Os clips no Mercado Livre e Shopee estão sendo priorizados pelo algoritmo. Quem ignora isso perde posição para quem usa.",
    story: {
      name: "Aline S. — vendedora Shopee, Belo Horizonte/MG",
      text: "Nunca soube fazer vídeo. Copiei um prompt da ferramenta, colei no Runway, gerei um clip de 15 segundos do meu produto e publiquei. Em 2 semanas o anúncio tinha 3x mais visualizações e as vendas subiram 35%.",
      save: "+35% de conversão com vídeo",
    },
  },
  {
    id: 5, icon: <ShieldAlert size={22} />, title: "Ferramenta de Disputa Shopee",
    tag: "Proteção", colSpan: "md:col-span-2",
    short: "Scripts prontos para ganhar disputas de devolução na Shopee.",
    tool: <ToolDisputa />,
    how: "Selecione o motivo que o cliente usou para abrir a disputa e sua situação real. A ferramenta gera um script técnico e profissional para você colar na caixa de resposta da Shopee.",
    why: "A Shopee usa análise algorítmica nas disputas. Resposta genérica ou emocional perde. Argumento técnico, objetivo e específico vence. Essa ferramenta coloca você no mesmo nível da plataforma.",
    story: {
      name: "Marcos P. — vendedor Shopee, Rio de Janeiro/RJ",
      text: "Perdi R$1.400 em disputas no meu primeiro semestre porque não sabia responder. Com os scripts certos, minha taxa de vitória em disputas foi de 20% para 71% em 60 dias.",
      save: "Taxa de vitória: 20% → 71%",
    },
  },
];

// ═══════════════════════════════════════════════════
//  MODAL DO MÓDULO
// ═══════════════════════════════════════════════════
function ModuleModal({ mod, onClose }: { mod: typeof modules[0]; onClose: () => void }) {
  const [tab, setTab] = useState<"tool" | "guide">("tool");

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div
        initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
        className="bg-zinc-950 border border-zinc-800 rounded-t-3xl md:rounded-2xl w-full md:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600/10 rounded-xl text-emerald-500">{mod.icon}</div>
            <div>
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">{mod.tag}</span>
              <h3 className="font-display text-lg font-bold text-zinc-100 leading-tight">{mod.title}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-800">
            <X size={20} />
          </button>
        </div>
        {/* Tabs */}
        <div className="flex border-b border-zinc-800 shrink-0">
          {[{ key: "tool", label: "🔧 Ferramenta" }, { key: "guide", label: "📖 Como usar" }].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as any)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${tab === t.key ? "text-emerald-400 border-b-2 border-emerald-500" : "text-zinc-500 hover:text-zinc-300"}`}>
              {t.label}
            </button>
          ))}
        </div>
        {/* Content */}
        <div className="overflow-y-auto flex-1 p-5">
          {tab === "tool" ? mod.tool : (
            <div className="space-y-5">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h4 className="text-sm font-bold text-zinc-100 mb-2">📋 Como usar</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">{mod.how}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h4 className="text-sm font-bold text-zinc-100 mb-2">💡 Por que isso importa</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">{mod.why}</p>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl shrink-0">💬</div>
                  <div>
                    <p className="text-sm text-zinc-300 italic leading-relaxed mb-3">"{mod.story.text}"</p>
                    <p className="text-xs text-zinc-500 font-semibold">{mod.story.name}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1">
                      <TrendingUp size={12} className="text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-400">{mod.story.save}</span>
                    </div>
                  </div>
                </div>
              </div>
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
    { q: "Preciso saber programar ou usar Excel avançado?", a: "Não. Tudo funciona no navegador, sem instalação nenhuma. Se você sabe digitar um número, você usa." },
    { q: "Funciona para quem vende só na Shopee?", a: "Sim. As calculadoras funcionam para qualquer plataforma. O módulo de disputa tem foco direto na Shopee." },
    { q: "É curso? Vou ter que assistir aulas?", a: "Não. São ferramentas interativas. Você abre, usa e já tem o resultado. Sem vídeo, sem certificado, sem enrolação." },
    { q: "Tenho acesso a atualizações futuras?", a: "Sim. Quando novos módulos forem adicionados, quem já comprou recebe sem pagar nada a mais." },
    { q: "E se eu não gostar?", a: "7 dias de garantia incondicional. Pede reembolso, devolvemos sem perguntas." },
    { q: "Como recebo o acesso após comprar?", a: "Imediatamente. Você recebe o link de acesso por e-mail assim que o pagamento confirmar. Sem esperar ninguém liberar manualmente." },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 selection:bg-emerald-500/30 selection:text-emerald-300">

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-display font-black text-sm text-white">EL</div>
            <span className="font-display text-xl font-bold tracking-tight uppercase italic text-zinc-100">Ecommerce Labs</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <a href="#modules" className="hover:text-emerald-400 transition-colors font-medium">Ferramentas</a>
            <a href="#author" className="hover:text-emerald-400 transition-colors font-medium">Quem criou</a>
            <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg font-bold transition-all">
              ACESSO AGORA
            </a>
          </div>
          <button className="md:hidden text-zinc-100 p-1" onClick={() => setMenuOpen(p => !p)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 py-6 space-y-4">
            <a href="#modules" className="block text-zinc-100 font-bold text-lg" onClick={() => setMenuOpen(false)}>Ferramentas</a>
            <a href="#author" className="block text-zinc-100 font-bold text-lg" onClick={() => setMenuOpen(false)}>Quem criou</a>
            <a href="#pricing" className="block text-zinc-100 font-bold text-lg" onClick={() => setMenuOpen(false)}>Preço</a>
            <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg">ACESSO AGORA</a>
          </motion.div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-24 md:pt-52 md:pb-36 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-600/8 blur-[150px] rounded-full" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 bg-zinc-900 border border-zinc-700 rounded-full text-emerald-500 text-xs font-bold tracking-widest uppercase mb-6">
              Kit operacional para marketplace
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-black tracking-tight text-zinc-100 leading-[0.92] mb-6 uppercase">
              Você vende muito.<br />Mas está{" "}
              <span className="text-emerald-500 italic">lucrando</span>{" "}
              de verdade?
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed">
              Descubra quanto dinheiro escapa em cada pedido — e use as ferramentas certas para proteger seu lucro de uma vez por todas.
            </p>
            <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-8 md:px-12 py-5 rounded-xl font-display text-xl md:text-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/40">
              QUERO O ECOMMERCE LABS AGORA
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ExternalLink size={22} />
              </motion.span>
            </a>
            <p className="mt-4 text-sm text-zinc-600">
              Acesso imediato · Pagamento único · 7 dias de garantia
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── DOR ── */}
      <section className="py-24 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-zinc-100 mb-6 uppercase leading-tight">
              O extrato não bate<br />com o esforço.
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>Você embala, etiqueta, despacha, responde cliente, abre disputa, atualiza estoque — e no final do mês o resultado é frustrante.</p>
              <p className="font-bold text-zinc-200">Por quê?</p>
              <p>Taxa do marketplace, frete, peso cúbico, embalagem, imposto, devolução — tudo isso come sua margem antes do dinheiro chegar.</p>
              <p className="text-emerald-400 font-bold italic">Não é falta de esforço. É falta de ferramenta.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 space-y-3">
            {[
              "Taxa do marketplace calculada errado — ou nem calculada",
              "Frete cobrado a mais por peso cúbico que você desconhece",
              "Anúncios invisíveis por título sem palavra-chave certa",
              "Concorrentes com vídeo ranqueando acima de você",
              "Disputas de devolução perdidas por falta de argumento técnico",
            ].map(i => (
              <div key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                <X className="text-red-500 shrink-0 mt-0.5" size={16} /> {i}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MÓDULOS ── */}
      <section id="modules" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">O kit completo</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-2 uppercase text-zinc-100 border-l-4 border-emerald-500 pl-5 leading-tight">
              5 ferramentas.<br />1 decisão.
            </h2>
            <p className="mt-4 text-zinc-400 max-w-xl text-sm">Clique em qualquer ferramenta para abrir e usar agora mesmo.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {modules.map(mod => (
              <motion.div key={mod.id} whileHover={{ y: -4 }} onClick={() => setActiveModule(mod)}
                className={`${mod.colSpan} bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl p-7 cursor-pointer group transition-all`}>
                <div className="p-3 bg-emerald-600/10 rounded-xl w-fit mb-5 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  {mod.icon}
                </div>
                <span className="text-xs font-bold text-emerald-500/60 uppercase tracking-wider">{mod.tag}</span>
                <h3 className="font-display text-xl font-bold mt-1 mb-3 text-zinc-100 uppercase leading-tight">{mod.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{mod.short}</p>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-emerald-500 group-hover:gap-3 transition-all">
                  Abrir ferramenta <ArrowRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTOR ── */}
      <section id="author" className="py-24 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-14 items-center">
            <div className="w-48 h-48 shrink-0 bg-zinc-950 rounded-3xl border border-zinc-800 rotate-2 flex items-center justify-center">
              <span className="font-display text-6xl font-black text-emerald-500/20">EL</span>
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Quem criou</span>
              <h2 className="font-display text-4xl font-bold text-zinc-100 mt-2 mb-5 uppercase italic">Feito por operador.<br />Para operador.</h2>
              <div className="space-y-3 text-zinc-400 leading-relaxed">
                <p>Sou <strong className="text-zinc-200">vendedor Platinum no Mercado Livre</strong> e opero também na Shopee. Trabalho com revenda de estoque.</p>
                <p>Não sou consultor de escritório. Cada problema que essas ferramentas resolvem, eu vivi na pele.</p>
                <p className="italic text-emerald-400">O Ecommerce Labs é o kit que eu quis ter quando comecei — refinado ao longo da operação real.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Platinum ML", "Operador Shopee", "Revenda de Estoque", "Sem teoria — só prática"].map(b => (
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
      <section id="pricing" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="bg-zinc-900 border-2 border-emerald-600/60 rounded-3xl p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-5 py-2 rounded-bl-2xl uppercase tracking-wide">
              Oferta de lançamento
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-zinc-100 mb-4 uppercase italic">Quanto custa?</h2>
            <p className="text-zinc-400 mb-2">Um consultor cobra entre R$ 500 e R$1.200/hora para revisar sua precificação.</p>
            <p className="text-zinc-400 mb-8">Continuar sem calcular é prejuízo silencioso todo mês.</p>
            <p className="text-zinc-600 line-through text-xl mb-1">R$ {PRICE_FULL},00</p>
            <div className="flex items-end justify-center gap-2 mb-2">
              <span className="text-zinc-400 text-xl mb-2">por apenas</span>
              <span className="font-display text-7xl md:text-8xl font-black text-emerald-400 leading-none">R$ {PRICE_PROMO}</span>
            </div>
            <p className="text-zinc-500 text-sm mb-10">Pagamento único · Acesso imediato · Sem mensalidade</p>
            <ul className="max-w-sm mx-auto text-left space-y-3 mb-10">
              {[
                "Calculadora de Margem de Lucro Real",
                "Calculadora de Peso Cúbico",
                "Criador de Títulos Magnéticos",
                "Prompts para Vídeos de Anúncio",
                "Ferramenta de Disputa Shopee",
                "Atualizações futuras incluídas",
              ].map(i => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-zinc-300">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> {i}
                </li>
              ))}
            </ul>
            <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
              className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-xl font-display text-2xl md:text-3xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-900/40 uppercase mb-4">
              QUERO ACESSO AGORA →
            </a>
            <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
              <Lock size={13} className="text-emerald-600" />
              7 dias de garantia incondicional · Pagamento seguro via Kiwify
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-zinc-900/50 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-4xl font-bold text-center mb-12 uppercase italic text-zinc-100">Dúvidas frequentes</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <button className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-zinc-200 text-sm pr-4">{faq.q}</span>
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

      {/* ── FOOTER ── */}
      <footer className="py-24 border-t border-zinc-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-zinc-100 mb-6 uppercase leading-tight">
            Chega de vender <span className="text-zinc-600 italic">no escuro</span>.
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
            A partir de hoje, você sabe exatamente quanto ganha em cada venda.
          </p>
          <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-zinc-100 hover:bg-emerald-500 text-zinc-950 hover:text-white px-10 py-6 rounded-xl font-display text-2xl font-bold transition-all hover:scale-105 active:scale-95">
            QUERO ACESSO — R$ {PRICE_PROMO}
          </a>
          <p className="mt-6 text-zinc-600 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <ShieldAlert size={12} className="text-emerald-600" />
            Oferta pode mudar conforme novos módulos forem incluídos
          </p>
          <div className="mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between gap-4 text-zinc-700 text-xs uppercase font-bold tracking-widest">
            <div>© 2025 Ecommerce Labs. Todos os direitos reservados.</div>
            <div>Feito por vendedor. Para vendedor.</div>
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
