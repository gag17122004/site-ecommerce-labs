import { motion, AnimatePresence } from "motion/react";
import { 
  Calculator, 
  Package, 
  Type, 
  Video, 
  ShieldAlert, 
  ChevronDown, 
  CheckCircle2, 
  ExternalLink,
  Menu,
  X,
  Star,
  Zap,
  TrendingUp,
  FileText,
  MessageSquare,
  BarChart2,
  Tag,
  Repeat,
  Clock,
  DollarSign,
  Lock,
  Unlock,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

const KIWIFY_LINK = "https://pay.kiwify.com.br/X7e9Nln";
const CTA_TEXT = "QUERO O ECOMMERCE LABS AGORA";
const PRICE = "197,00";

// ─── MÓDULOS DATA ───────────────────────────────────────────────────────────
const modules = [
  {
    id: 1,
    icon: <Calculator size={28} />,
    tag: "MÓDULO 1",
    title: "Calculadora de Margem Real",
    short: "Chega de chute. Coloque o custo, as taxas e descubra na hora se o anúncio está dando lucro ou te afundando.",
    tools: [
      { icon: <Calculator size={16} />, name: "Calculadora de Margem ML & Shopee" },
      { icon: <TrendingUp size={16} />, name: "Simulador de Preço Ideal" },
      { icon: <BarChart2 size={16} />, name: "Comparador de Cenários (lucro/break-even/prejuízo)" },
    ],
    howWorks: "Você recebe uma planilha/ferramenta interativa. Insere o custo do produto, percentual de taxa da plataforma, frete estimado e impostos. Em segundos ela te mostra lucro líquido, margem percentual, preço mínimo de venda e o quanto você perde por venda se continuar no preço atual.",
    whyUse: "A maioria dos vendedores precifica no olho — e descobre que está no prejuízo só no final do mês. Com essa ferramenta você sabe antes de publicar o anúncio se vale a pena ou não.",
    where: "Disponível direto no Drive como planilha Google Sheets + versão HTML offline. Abre no celular e no computador.",
    testimonial: {
      name: "Rodrigo M., vendedor Shopee",
      text: "Eu achava que estava lucrando R$12 por unidade. Com a calculadora descobri que estava perdendo R$3,40. Reajustei o preço e em 3 semanas minha margem saiu de negativa para 18%. Pagou o Labs inteiro na primeira semana.",
    },
  },
  {
    id: 2,
    icon: <Package size={28} />,
    tag: "MÓDULO 2",
    title: "Calculadora de Peso Cúbico",
    short: "Entenda como as transportadoras e marketplaces calculam o frete e pare de ser surpreendido na cobrança.",
    tools: [
      { icon: <Package size={16} />, name: "Calculadora de Peso Cúbico (ML, Shopee, Correios)" },
      { icon: <Tag size={16} />, name: "Tabela de Divisores por Transportadora" },
      { icon: <DollarSign size={16} />, name: "Estimador de Custo Real de Frete por Produto" },
    ],
    howWorks: "Você insere as dimensões da embalagem (C × L × A) e o peso real. A ferramenta aplica o divisor correto de cada transportadora, compara peso real vs peso cúbico e te diz qual será cobrado — antes de você publicar o anúncio.",
    whyUse: "Frete é um dos maiores sugadores de margem no e-commerce. Um produto que pesa 500g mas tem embalagem grande pode ser cobrado como se pesasse 2kg. Você descobre isso antes de vender.",
    where: "Planilha Google Sheets + calculadora HTML interativa no Drive. Funciona offline.",
    testimonial: {
      name: "Carla S., revendedora Mercado Livre",
      text: "Eu vendia travesseiros e não entendia por que o frete saía tão caro. Com a calculadora vi que estava pagando pelo peso cúbico de 3,8kg num produto de 1,2kg. Só mudando a embalagem economizei R$8 por pedido. Com 200 pedidos/mês, foram R$1.600 a mais de margem.",
    },
  },
  {
    id: 3,
    icon: <Type size={28} />,
    tag: "MÓDULO 3",
    title: "Títulos Magnéticos",
    short: "Framework para montar títulos que aparecem na busca e fazem o cliente clicar — inclui ferramenta IA integrada.",
    tools: [
      { icon: <Type size={16} />, name: "Gerador de Títulos SEO com IA (ferramenta HTML)" },
      { icon: <FileText size={16} />, name: "Framework de Estrutura de Título por Categoria" },
      { icon: <Tag size={16} />, name: "Banco de Palavras-Chave por Nicho" },
    ],
    howWorks: "A ferramenta de Títulos (HTML interativo já incluso no módulo) usa IA para gerar opções de título com base no produto, categoria e palavras-chave. O framework te ensina a estrutura PRODUTO + ATRIBUTO + BENEFÍCIO + URGÊNCIA. O banco de palavras cobre os 30 nichos mais vendidos do ML e Shopee.",
    whyUse: "Um bom título pode dobrar seus cliques orgânicos. O algoritmo do ML e Shopee prioriza anúncios com palavras-chave na posição certa do título. Essa ferramenta faz isso automaticamente.",
    where: "Ferramenta HTML que roda no navegador (sem instalar nada) + Google Sheets com framework e banco de keywords.",
    testimonial: {
      name: "Thiago A., vendedor nicho pet",
      text: "Meu anúncio de comedouro estava na página 4. Usei o gerador de títulos, ajustei com o framework do módulo. Em 11 dias subiu para a página 1. As vendas daquele produto triplicaram — sem mexer no preço.",
    },
  },
  {
    id: 4,
    icon: <Video size={28} />,
    tag: "MÓDULO 4",
    title: "Prompts para Vídeos de Produto",
    short: "Prompts prontos para criar vídeos de produto com IA — sem saber editar, sem contratar ninguém.",
    tools: [
      { icon: <Video size={16} />, name: "Pack de 50 Prompts para Vídeos de Produto" },
      { icon: <MessageSquare size={16} />, name: "Scripts de Narração por Categoria" },
      { icon: <Repeat size={16} />, name: "Fluxo de Produção de Vídeo em 20 min" },
    ],
    howWorks: "Você recebe 50 prompts categorizados por tipo de produto e objetivo (demonstração, unboxing, comparativo, depoimento). Cada prompt é plug-and-play: você copia, cola na ferramenta de IA (Runway, CapCut AI, Pika), ajusta o nome do produto e gera. O fluxo de produção te mostra como fazer do prompt ao upload em menos de 20 minutos.",
    whyUse: "Anúncios com vídeo têm até 3× mais conversão no Shopee e aparecem primeiro no ML. Com IA, qualquer vendedor consegue produzir sem câmera, sem edição e sem estúdio.",
    where: "Documento Google Docs com todos os prompts + Notion com o fluxo de produção (opcional PDF para imprimir).",
    testimonial: {
      name: "Fernanda L., vendedora Shopee Fashion",
      text: "Achei que vídeo era só para quem tinha estrutura. Usei o prompt de demonstração no CapCut AI, postei como clip no Shopee. Em 4 dias o produto virou destaque. Vendi 3× mais do que a semana anterior — e o vídeo inteiro levou 18 minutos pra fazer.",
    },
  },
  {
    id: 5,
    icon: <ShieldAlert size={28} />,
    tag: "MÓDULO 5",
    title: "Ferramenta de Disputa Shopee",
    short: "Scripts e ferramenta interativa para responder devoluções com a lógica de análise da própria Shopee.",
    tools: [
      { icon: <ShieldAlert size={16} />, name: "Ferramenta de Disputa Shopee (HTML interativo)" },
      { icon: <MessageSquare size={16} />, name: "15 Scripts de Resposta por Tipo de Reclamação" },
      { icon: <Clock size={16} />, name: "Checklist de Evidências para Ganhar Disputas" },
    ],
    howWorks: "A ferramenta interativa (HTML inclusa) te guia pelo processo de disputa: você seleciona o tipo de reclamação, o motivo alegado pelo comprador, e ela gera a resposta ideal baseada na política da Shopee. Os 15 scripts cobrem: 'produto não chegou', 'produto diferente', 'arrependimento', 'defeito após uso' e mais. O checklist te diz quais evidências juntar antes de responder.",
    whyUse: "A maioria dos vendedores perde disputas não porque estão errados, mas porque respondem errado. A Shopee analisa o texto e as evidências — essa ferramenta te ensina a linguagem certa.",
    where: "Ferramenta HTML offline no Drive + PDF com scripts para imprimir e ter na mesa.",
    testimonial: {
      name: "Paulo R., vendedor eletrônicos ML/Shopee",
      text: "Eu estava perdendo em média 4 disputas por mês — cada uma com produto devolvido inutilizável. Usei os scripts do módulo. No mês seguinte ganhei 3 das 5 disputas que abriram. Economizei mais de R$900 só nesse mês.",
    },
  },
];

// ─── COMPONENT: MODULE CARD ────────────────────────────────────────────────
function ModuleCard({ mod, isLarge }: { mod: (typeof modules)[0]; isLarge?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-emerald-500/40 transition-colors flex flex-col ${isLarge ? "p-10" : "p-8"}`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 bg-emerald-600/10 rounded-lg text-emerald-500">{mod.icon}</div>
          <span className="text-xs font-bold text-zinc-500 tracking-widest uppercase">{mod.tag}</span>
        </div>
        <h3 className="font-display text-2xl font-bold mb-3 uppercase tracking-tight">{mod.title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">{mod.short}</p>
      </div>

      {/* Ferramentas */}
      <ul className="space-y-2 mb-6">
        {mod.tools.map((t, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
            <span className="text-emerald-500">{t.icon}</span>
            {t.name}
          </li>
        ))}
      </ul>

      {/* Toggle details */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-emerald-500 text-sm font-bold hover:text-emerald-400 transition-colors mt-auto"
      >
        {open ? "Fechar detalhes" : "Ver como funciona"}
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 space-y-4 border-t border-zinc-800 mt-4">
              <div>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Como funciona</span>
                <p className="text-zinc-400 text-sm leading-relaxed mt-1">{mod.howWorks}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Por que usar</span>
                <p className="text-zinc-400 text-sm leading-relaxed mt-1">{mod.whyUse}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Onde acessar</span>
                <p className="text-zinc-400 text-sm leading-relaxed mt-1">{mod.where}</p>
              </div>
              {/* Testimonial */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-emerald-500 fill-emerald-500" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm italic leading-relaxed mb-3">"{mod.testimonial.text}"</p>
                <span className="text-xs font-bold text-zinc-500">— {mod.testimonial.name}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── COMPONENT: POST-PURCHASE FLOW ────────────────────────────────────────
function PostPurchaseSection() {
  const steps = [
    {
      icon: <CheckCircle2 size={24} />,
      title: "1. Pagamento confirmado",
      desc: "Assim que o pagamento é aprovado pela Kiwify, você recebe um e-mail automático com o link de acesso.",
    },
    {
      icon: <Unlock size={24} />,
      title: "2. Acesso ao Google Drive",
      desc: "O link leva para uma pasta do Google Drive organizada por módulo. Você salva uma cópia em 2 cliques — e acessa para sempre, no celular ou no PC.",
    },
    {
      icon: <Zap size={24} />,
      title: "3. Use hoje mesmo",
      desc: "Cada módulo tem um arquivo pronto para usar. Sem cadastro extra, sem login, sem plataforma nova. Abre, preenche, usa.",
    },
    {
      icon: <ArrowRight size={24} />,
      title: "4. Atualizações inclusas",
      desc: "Quando um novo módulo ou versão for adicionado à pasta, você já tem acesso automaticamente — sem pagar nada a mais.",
    },
  ];

  return (
    <section className="py-24 bg-zinc-900/60 border-y border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-emerald-500 text-xs font-bold tracking-widest uppercase mb-6">
            Depois da Compra
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-zinc-100 mb-4">
            Como você acessa tudo?
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Sem plataforma complicada. Acesso direto, simples e permanente via Google Drive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex gap-5"
            >
              <div className="text-emerald-500 shrink-0 mt-1">{s.icon}</div>
              <div>
                <h3 className="font-bold text-zinc-100 mb-2">{s.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 bg-zinc-950 border border-emerald-500/30 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="p-4 bg-emerald-600/10 rounded-xl text-emerald-500 shrink-0">
            <Lock size={32} />
          </div>
          <div>
            <h3 className="font-bold text-zinc-100 mb-1">Por que Google Drive?</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Drive é gratuito, todo mundo já tem e funciona em qualquer dispositivo. Você faz uma cópia da pasta uma vez e ela fica no seu Drive para sempre — mesmo que você troque de e-mail, o arquivo continua com você. Sem risco de plataforma sumir, sem senha para lembrar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 selection:bg-emerald-500/30 selection:text-emerald-500">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded flex items-center justify-center font-display font-bold text-xl">EL</div>
            <span className="font-display text-2xl font-bold tracking-tighter uppercase italic">Ecommerce Labs</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-zinc-400">
            <a href="#problem" className="hover:text-emerald-500 transition-colors">O Desafio</a>
            <a href="#modules" className="hover:text-emerald-500 transition-colors">Ferramentas</a>
            <a href="#after" className="hover:text-emerald-500 transition-colors">Acesso</a>
            <a href="#author" className="hover:text-emerald-500 transition-colors">Operador</a>
            <a
              href={KIWIFY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded font-bold transition-all glow-emerald"
            >
              ACESSO AGORA
            </a>
          </div>

          <button className="md:hidden text-zinc-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 py-8 space-y-4"
          >
            <a href="#problem" className="block text-zinc-100 font-bold" onClick={() => setIsMenuOpen(false)}>O Desafio</a>
            <a href="#modules" className="block text-zinc-100 font-bold" onClick={() => setIsMenuOpen(false)}>Ferramentas</a>
            <a href="#after" className="block text-zinc-100 font-bold" onClick={() => setIsMenuOpen(false)}>Acesso</a>
            <a href="#author" className="block text-zinc-100 font-bold" onClick={() => setIsMenuOpen(false)}>Operador</a>
            <a
              href={KIWIFY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-emerald-600 text-white py-4 rounded font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              ACESSAR LABS
            </a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-emerald-500 text-xs font-bold tracking-widest uppercase mb-6">
              Operação de Alto Impacto
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-black tracking-tight text-zinc-100 leading-[0.95] mb-8 uppercase text-balance">
              Você vende muito — mas será que está <span className="text-emerald-500 italic uppercase">lucrando</span> de verdade?
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-12 text-balance leading-relaxed">
              Descubra quanto dinheiro está escorregando pelos dedos toda vez que você fecha um pedido no Mercado Livre ou Shopee.
            </p>
            
            <a 
              href={KIWIFY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-8 md:px-12 py-5 md:py-6 rounded-lg font-display text-xl md:text-2xl font-bold transition-all glow-emerald-strong hover:scale-105 active:scale-95 group"
            >
              {CTA_TEXT}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ExternalLink className="w-6 h-6" />
              </motion.span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl font-bold text-zinc-100 mb-6 uppercase leading-tight">
                O extrato não bate com o esforço.
              </h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  Você fica de olho nos pedidos, embala, etiqueta, despacha, responde cliente, abre disputa, atualiza estoque — e no final do mês o resultado é frustrante.
                </p>
                <p className="font-bold text-zinc-200">Por quê?</p>
                <p>
                  Porque ninguém te ensinou a calcular direito. Taxa do marketplace, frete, peso cúbico, embalagem, imposto, devolução... Tudo isso come a sua margem.
                </p>
                <p className="text-emerald-500 font-bold italic">Não é falta de esforço. É falta de ferramenta.</p>
              </div>
            </motion.div>
            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldAlert size={120} />
               </div>
               <ul className="space-y-4 relative z-10">
                  <li className="flex gap-3 text-sm border-b border-zinc-900 pb-3"><X className="text-red-500 shrink-0" size={18} /> Taxa de Marketplace Oculta</li>
                  <li className="flex gap-3 text-sm border-b border-zinc-900 pb-3"><X className="text-red-500 shrink-0" size={18} /> Frete cobrado a mais (Peso Cúbico)</li>
                  <li className="flex gap-3 text-sm border-b border-zinc-900 pb-3"><X className="text-red-500 shrink-0" size={18} /> Devoluções sem disputa correta</li>
                  <li className="flex gap-3 text-sm"><X className="text-red-500 shrink-0" size={18} /> Preço de venda no chute</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What is Ecommerce Labs */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-7xl font-bold text-zinc-100 mb-6 uppercase tracking-tight">
              Ecommerce Labs
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-zinc-400">
              Um kit de ferramentas práticas e operacionais criado por quem vende de verdade — para quem vende de verdade.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Sem Teoria", text: "Não é um curso. São ferramentas prontas para aplicar na sua operação hoje." },
              { title: "Foco no Lucro", text: "Cada função foi desenhada para estancar a perda de dinheiro silenciosa." },
              { title: "Agilidade", text: "Você abre, preenche e já tem o resultado. Otimizado para rotinas pesadas." }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-emerald-500/50 transition-colors">
                <h3 className="font-display text-2xl font-bold text-emerald-500 uppercase mb-4 italic">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section id="modules" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 uppercase text-zinc-100 border-l-4 border-emerald-500 pl-6">
            O que você leva:
          </h2>
          <p className="text-zinc-400 pl-6 mb-12">Clique em qualquer módulo para ver como funciona, onde acessar e casos reais de economia.</p>

          {/* 2 colunas */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {modules.slice(0, 2).map((mod) => (
              <ModuleCard key={mod.id} mod={mod} />
            ))}
          </div>

          {/* 3 colunas */}
          <div className="grid md:grid-cols-3 gap-6">
            {modules.slice(2).map((mod) => (
              <ModuleCard key={mod.id} mod={mod} />
            ))}
          </div>
        </div>
      </section>

      {/* Post-purchase flow */}
      <div id="after">
        <PostPurchaseSection />
      </div>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-zinc-900 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-950 border-2 border-emerald-600 rounded-3xl p-10 md:p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-emerald-600 text-white px-6 py-2 rounded-bl-2xl font-bold text-sm">
              OFERTA EXCLUSIVA
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl font-bold text-zinc-100 mb-8 uppercase italic">Quanto custa tudo isso?</h2>
            
            <p className="text-zinc-400 mb-4 line-through">De R$ 497,00</p>
            <div className="flex items-center justify-center gap-2 mb-10">
              <span className="text-zinc-400 text-2xl font-medium mt-4">12x de</span>
              <span className="font-display text-7xl md:text-8xl font-black text-emerald-500">R$ {PRICE}</span>
            </div>
            
            <ul className="max-w-md mx-auto text-left space-y-4 mb-12">
              <li className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="text-emerald-500" size={20} /> 5 módulos com ferramentas prontas</li>
              <li className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="text-emerald-500" size={20} /> Sem mensalidade — Pagamento Único</li>
              <li className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="text-emerald-500" size={20} /> Acesso via Google Drive para sempre</li>
              <li className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="text-emerald-500" size={20} /> Atualizações futuras inclusas</li>
              <li className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="text-emerald-500" size={20} /> 7 dias de garantia incondicional</li>
            </ul>

            <a
              href={KIWIFY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white py-6 rounded-xl font-display text-2xl md:text-3xl font-bold transition-all glow-emerald-strong hover:scale-[1.02] active:scale-95 mb-6 uppercase text-center"
            >
              {CTA_TEXT}
            </a>
            
            <p className="text-zinc-500 text-sm">
              Uma venda certa paga o investimento. 🔒 Compra 100% segura via Kiwify.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Author Section */}
      <section id="author" className="py-24 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-64 h-64 shrink-0 bg-zinc-900 rounded-3xl border border-zinc-800 rotate-3 overflow-hidden">
               <div className="w-full h-full bg-emerald-600/20 flex items-center justify-center font-display text-8xl font-black text-emerald-500/30 tracking-tighter">
                OPS
               </div>
            </div>
            <div>
              <h2 className="font-display text-4xl font-bold text-zinc-100 mb-6 uppercase italic">Quem criou isso?</h2>
              <p className="text-xl text-zinc-300 font-bold mb-4">Sou vendedor Platinum no Mercado Livre e opero também na Shopee.</p>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  Trabalho com revenda de estoque e já vivi na pele cada problema que essas ferramentas resolvem.
                </p>
                <p>
                  Não sou consultor de escritório. Sou operador — igual a você.
                </p>
                <p className="italic text-emerald-500">
                  O Ecommerce Labs é o conjunto de ferramentas que eu quis ter quando comecei, e que refinei ao longo da operação real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-zinc-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold text-center mb-16 uppercase italic">Perguntas Frequentes</h2>
          
          <div className="space-y-4">
            {[
              {
                q: "Preciso saber programar ou usar Excel avançado?",
                a: "Não. Tudo foi feito para usar sem nenhum conhecimento técnico. Se você sabe abrir um arquivo e digitar número, você consegue usar."
              },
              {
                q: "Funciona para quem vende só na Shopee?",
                a: "Sim. As calculadoras e os frameworks funcionam independente de plataforma. Os módulos de disputa e de precificação têm foco direto na Shopee."
              },
              {
                q: "É curso? Vou ter que assistir aula?",
                a: "Não. É kit operacional. Você baixa, abre e usa. Sem aula, sem certificado, sem enrolação."
              },
              {
                q: "Como recebo o acesso?",
                a: "Imediatamente após a confirmação do pagamento. Você recebe o link do Google Drive direto no seu e-mail."
              },
              {
                q: "Tenho acesso a atualizações futuras?",
                a: "Sim. A pasta do Drive é atualizada automaticamente. Quando novos módulos forem adicionados, você que já comprou já tem acesso."
              },
              {
                q: "E se eu não gostar?",
                a: "7 dias de garantia incondicional. Se não servir para sua operação, devolvemos seu dinheiro sem perguntas."
              }
            ].map((faq, i) => (
              <details key={i} className="group bg-zinc-900 border border-zinc-800 rounded-xl">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-bold text-lg text-zinc-200">{faq.q}</span>
                  <ChevronDown className="text-emerald-500 transition-transform group-open:rotate-180" size={20} />
                </summary>
                <div className="px-6 pb-6 text-zinc-400 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Footer */}
      <footer className="py-24 border-t border-zinc-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-zinc-100 mb-8 uppercase text-balance leading-none">
            Você pode continuar vendendo <span className="text-zinc-500 uppercase italic">no escuro</span>.
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
            Ou pode, a partir de hoje, saber exatamente quanto ganha em cada venda — e usar isso a seu favor.
          </p>
          
          <a 
            href={KIWIFY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-zinc-100 hover:bg-emerald-500 text-zinc-950 hover:text-white px-10 py-6 rounded-lg font-display text-2xl font-bold transition-all glow-emerald group"
          >
            QUERO ACESSO AGORA — R$ {PRICE}
          </a>
          
          <p className="mt-8 text-zinc-600 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <ShieldAlert size={14} className="text-emerald-600" />
            Essa oferta pode mudar a qualquer momento conforme novos módulos forem incluídos.
          </p>
          
          <div className="mt-24 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between gap-6 text-zinc-600 text-xs uppercase font-bold tracking-widest">
            <div>© 2025 Ecommerce Labs. Todos os direitos reservados.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-emerald-500">Termos</a>
              <a href="#" className="hover:text-emerald-500">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
