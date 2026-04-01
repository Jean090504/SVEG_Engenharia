'use strict'

// 1. BANCO DE DADOS DETALHADO (Escopo Global)
const servicesData = {
    cabine: {
        title: "Cabines Primárias",
        image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=800",
        desc: "Gestão completa de entrada de energia em alta tensão. Garantimos que sua subestação opere dentro das normas de segurança e eficiência.",
        details: [
            "Manutenção preventiva e corretiva em transformadores",
            "Análise físico-química e cromatográfica do óleo isolante",
            "Limpeza técnica de isoladores e reaperto de barramentos",
            "Parametrização e teste de relés de proteção (Secundária)",
            "Tratamento de óleo isolante via processo de Termovácuo",
            "Substituição de muflas e terminações de média tensão"
        ]
    },
    solar: {
        title: "Energia Fotovoltaica",
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800",
        desc: "Sistemas de geração própria para indústrias e comércios, focando em redução drástica de custos operacionais e sustentabilidade.",
        details: [
            "Estudo de viabilidade técnica e financeira (ROI)",
            "Instalação de inversores e módulos de alta eficiência",
            "Homologação completa junto à concessionária de energia",
            "Sistemas On-Grid, Off-Grid e Hybrid",
            "Monitoramento remoto em tempo real via App",
            "Manutenção preventiva e limpeza de placas solares"
        ]
    },
    laudos: {
        title: "Diagramas e Laudos Elétricos",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
        desc: "Atualização de esquemas elétricos e emissão de documentação técnica para seguros, fiscalização e conformidade com o Ministério do Trabalho.",
        details: [
            "Elaboração de Diagramas Unifilares e Trifilares atualizados",
            "Prontuário das Instalações Elétricas (PIE) conforme NR-10",
            "Laudo de Aterramento e SPDA (Para-raios) com medições",
            "Estudo de Seletividade e Coordenação de Proteção",
            "Inspeção Termográfica com relatório de pontos de aquecimento",
            "Emissão de ART por engenheiros eletricistas credenciados"
        ]
    }
};

// 2. FUNÇÕES DO MODAL (Escopo Global)
function openModal(id) {
    const service = servicesData[id];
    if (!service) return;

    const modal = document.getElementById('service-modal');
    const content = document.getElementById('modal-content');

    content.innerHTML = `
        <img src="${service.image}" class="w-full h-56 object-cover rounded-2xl mb-6 shadow-lg">
        <h2 class="text-3xl font-bold text-yellow-500 mb-4">${service.title}</h2>
        <p class="text-gray-300 mb-6 leading-relaxed">${service.desc}</p>
        <h4 class="text-white font-bold mb-4 flex items-center">
            <i class="fas fa-tools mr-2 text-yellow-500"></i> Escopo Técnico:
        </h4>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 text-left">
            ${service.details.map(item => `
                <li class="flex items-start text-gray-400 text-sm italic">
                    <span class="text-yellow-500 mr-2">⚡</span> ${item}
                </li>
            `).join('')}
        </ul>
        <div class="flex justify-between items-center border-t border-white/10 pt-6">
            <button onclick="closeModal()" class="text-gray-400 hover:text-white font-medium transition">Voltar</button>
            <a href="#contato" onclick="closeModal()" class="bg-yellow-500 text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition">Solicitar Orçamento</a>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('service-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

// 3. LÓGICA PRINCIPAL (Ao carregar o DOM)
document.addEventListener('DOMContentLoaded', () => {
    
    // Inicialização AOS
    AOS.init({ duration: 800, once: false, mirror: true });

    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('section[id]');
    const allLinks = document.querySelectorAll('nav a[href^="#"]');

    // SCROLL: Navbar Glass + Ativar Link
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            nav.classList.add('py-2', 'bg-slate-900/95', 'backdrop-blur-md');
            nav.classList.remove('py-4');
        } else {
            nav.classList.remove('py-2', 'bg-slate-900/95', 'backdrop-blur-md');
            nav.classList.add('py-4');
        }

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`nav a[href="#${sectionId}"]:not(.bg-yellow-500)`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('text-yellow-500');
                } else {
                    targetLink.classList.remove('text-yellow-500');
                }
            }
        });
    });

    // CLICK: Scroll Suave (Smooth Scroll)
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const navHeight = nav.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - navHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Fecha o menu mobile ao clicar em um link
                    if (!navMenu.classList.contains('hidden')) {
                        toggleMobileMenu();
                    }
                }
            }
        });
    });

    // MENU MOBILE: Lógica simplificada
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    function toggleMobileMenu() {
        // Apenas alterna a classe hidden. 
        // As classes de alinhamento já estão fixas no HTML.
        navMenu.classList.toggle('hidden');
        navMenu.classList.toggle('flex');
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que o clique feche o menu na hora
            toggleMobileMenu();
        });
    }

    // Fecha o menu ao clicar em qualquer link (UX de celular)
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                navMenu.classList.add('hidden');
                navMenu.classList.remove('flex');
            }
        });
    });

    // CALCULADORA SOLAR
    const billRange = document.getElementById('bill-range');
    if (billRange) {
        billRange.addEventListener('input', function() {
            const val = parseInt(this.value);
            document.getElementById('bill-value').innerText = val.toLocaleString('pt-BR');
            const savings = (val * 0.90) * 12;
            document.getElementById('yearly-savings').innerText = `R$ ${savings.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        });
    }

    // FORMULÁRIO: Lógica de Assunto
    const subjectSelect = document.getElementById('subject');
    const workTypeContainer = document.getElementById('work-type-container');
    if (subjectSelect) {
        subjectSelect.addEventListener('change', function() {
            if (this.value === 'Orcamento' || this.value === 'Manutencao') {
                workTypeContainer.classList.remove('hidden');
            } else {
                workTypeContainer.classList.add('hidden');
            }
        });
    }
});