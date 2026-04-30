import { motion } from "motion/react";
import { 
  Calculator, 
  Package, 
  Type, 
  Video, 
  ShieldAlert, 
  Search, 
  ChevronDown, 
  CheckCircle2, 
  ExternalLink,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const CTA_TEXT = "QUERO O ECOMMERCE LABS AGORA";
const PRICE = "197,00"; 
const CHECKOUT_URL = "https://pay.kiwify.com.br/X7e9Nln";

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
            <a href="#author" className="hover:text-emerald-500 transition-colors">Operador</a>
            <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded font-bold transition-all glow-emerald">ACESSO AGORA</a>
          </div>

          <button className="md:hidden text-zinc-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 py-8 space-y-4"
          >
            <a href="#problem" className="block text-zinc-100 font-bold" onClick={() => setIsMenuOpen(false)}>O Desafio</a>
            <a href="#modules" className="block text-zinc-100 font-bold" onClick={() => setIsMenuOpen(false)}>Ferramentas</a>
            <a href="#author" className="block text-zinc-100 font-bold" onClick={() => setIsMenuOpen(false)}>Operador</a>
            <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-emerald-600 text-white py-4 rounded font-bold" onClick={() => setIsMenuOpen(false)}>ACESSAR LABS</a>
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
              href={CHECKOUT_URL}
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

      {/* Problem Section (The Pain) */}
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

      {/* Presentation (Ecommerce Labs) */}
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

      {/* Módulos (Bento Box Grid) */}
      <section id="modules" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-12 uppercase text-zinc-100 border-l-4 border-emerald-500 pl-6">
            O que você leva:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-full">
            {/* Módulo 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-3 md:row-span-1 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 flex flex-col justify-between group"
            >
              <div>
                <div className="p-3 bg-emerald-600/10 rounded-lg w-fit mb-6 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Calculator size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 uppercase">MÓDULO 1 — Calculadora de Margem Real</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Chega de chute. Coloque o custo, as taxas e descubra na hora se o anúncio está dando lucro ou te afundando. Funciona para ML, Shopee e outros.
                </p>
              </div>
            </motion.div>

            {/* Módulo 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-3 md:row-span-1 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 flex flex-col justify-between group"
            >
              <div>
                <div className="p-3 bg-emerald-600/10 rounded-lg w-fit mb-6 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Package size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 uppercase">MÓDULO 2 — Calculadora de Peso Cúbico</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Entenda como as transportadoras e marketplaces calculam o peso cúbico e precifique seu frete sem amargura.
                </p>
              </div>
            </motion.div>

            {/* Módulo 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 md:row-span-1 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 flex flex-col justify-between group"
            >
              <div>
                <div className="p-3 bg-emerald-600/10 rounded-lg w-fit mb-6 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Type size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 uppercase italic">MÓDULO 3 — Títulos Magnéticos</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Framework passo a passo para montar títulos que aparecem na busca e fazem o cliente clicar.
                </p>
              </div>
            </motion.div>

            {/* Módulo 4 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 md:row-span-1 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 flex flex-col justify-between group"
            >
              <div>
                <div className="p-3 bg-emerald-600/10 rounded-lg w-fit mb-6 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Video size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 uppercase italic">MÓDULO 4 — Prompts para Vídeos</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Prompts certos para usar com IA e criar vídeos para clips sem saber editar e sem contratar ninguém.
                </p>
              </div>
            </motion.div>

            {/* Módulo 5 & 6 Combine or separate */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 md:row-span-1 bg-zinc-900 p-8 rounded-2xl border border-emerald-500/30 flex flex-col justify-between group"
            >
              <div>
                <div className="p-3 bg-emerald-600/10 rounded-lg w-fit mb-6 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <ShieldAlert size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 uppercase italic tracking-tighter">MÓDULO 5 — Disputa Shopee</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Responda de igual para igual. Scripts baseados na lógica de análise da Shopee para vencer devoluções.
                </p>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-8 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 group hover:border-emerald-500/30 transition-all">
             <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="p-3 bg-zinc-950 rounded-lg text-emerald-500"><Search size={24} /></div>
                <div>
                  <h3 className="font-display text-2xl font-bold mb-2 uppercase">MÓDULO 6 — Artigos para Google</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Conteúdo pronto para publicar, ganhar autoridade e atrair tráfego orgânico para os seus anúncios sem pagar por clique.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-zinc-900 h-full relative">
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
              <li className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="text-emerald-500" size={20} /> Acesso completo a todos os 6 módulos</li>
              <li className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="text-emerald-500" size={20} /> Sem mensalidade — Pagamento Único</li>
              <li className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="text-emerald-500" size={20} /> Atualizações futuras inclusas</li>
              <li className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="text-emerald-500" size={20} /> Kit 100% operacional pronto para uso</li>
            </ul>

            <a 
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white py-6 rounded-xl font-display text-2xl md:text-3xl font-bold transition-all glow-emerald-strong hover:scale-[1.02] active:scale-95 mb-6 uppercase"
            >
              {CTA_TEXT}
            </a>
            
            <p className="text-zinc-500 text-sm">
              Uma venda certa paga o investimento.
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
                q: "Tenho acesso a atualizações futuras?",
                a: "Sim. Quando novos módulos forem adicionados ao Ecommerce Labs, você que já comprou recebe sem pagar nada a mais."
              },
              {
                q: "E se eu não gostar?",
                a: "Oferecemos 7 dias de garantia incondicional. Se não servir para sua operação, devolvemos seu dinheiro."
              },
              {
                q: "Como recebo o acesso?",
                a: "Imediatamente após a confirmação do pagamento. Você recebe o link direto na sua caixa de entrada."
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
            href={CHECKOUT_URL}
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
            <div>© 2024 Ecommerce Labs. Todos os direitos reservados.</div>
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
