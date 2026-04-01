'use strict'

document.addEventListener('DOMContentLoaded', () => {
    // 1. ANIMAÇÕES AOS
    AOS.init({ duration: 800, once: false, mirror: true });

    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('section[id]');
    
    // 2. LÓGICA DE SCROLL (NAVBAR + LINK ATIVO)
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Navbar Glass
        if (scrollY > 50) {
            nav.classList.add('py-2', 'bg-slate-900/90', 'backdrop-blur-md');
            nav.classList.remove('py-4');
        } else {
            nav.classList.remove('py-2', 'bg-slate-900/90', 'backdrop-blur-md');
            nav.classList.add('py-4');
        }

        // Link Ativo (CORRIGIDO: Ignora o botão amarelo para não sumir a letra)
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            
            // Seleciona apenas os links de texto (que não têm a classe do botão)
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

    // 3. SCROLL SUAVE (FORÇADO - RESOLVE O CORTE SECO)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = nav.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 20;

                // Força o comportamento suave ignorando configurações do navegador
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                })
            }
        })
    })

    // 4. CALCULADORA SOLAR
    const billRange = document.getElementById('bill-range')
    if (billRange) {
        billRange.addEventListener('input', function() {
            const val = parseInt(this.value)
            document.getElementById('bill-value').innerText = val.toLocaleString('pt-BR')
            const savings = (val * 0.90) * 12
            document.getElementById('yearly-savings').innerText = `R$ ${savings.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`
        })
    }

    // 5. FORMULÁRIO (ASSUNTO)
    const subjectSelect = document.getElementById('subject');
    const workTypeContainer = document.getElementById('work-type-container')
    if (subjectSelect) {
        subjectSelect.addEventListener('change', function() {
            if (this.value === 'Orcamento' || this.value === 'Manutencao') {
                workTypeContainer.classList.remove('hidden')
            } else {
                workTypeContainer.classList.add('hidden')
            }
        })
    }
})

// 6. MODAL (FORA DO DOMCONTENTLOADED)
function openModal(id) {
    const service = servicesData[id]
    if (!service) return
    const modal = document.getElementById('service-modal')
    document.getElementById('modal-content').innerHTML = `
        <img src="${service.image}" class="w-full h-48 object-cover rounded-2xl mb-6">
        <h2 class="text-3xl font-bold text-yellow-500 mb-4">${service.title}</h2>
        <p class="text-gray-300 mb-6 leading-relaxed">${service.desc}</p>
        <button onclick="closeModal()" class="bg-yellow-500 text-slate-900 px-6 py-2 rounded-xl font-bold hover:bg-yellow-400 transition">Fechar</button>
    `
    modal.classList.remove('hidden')
    document.body.style.overflow = 'hidden'
}

function closeModal() {
    document.getElementById('service-modal').classList.add('hidden')
    document.body.style.overflow = 'auto'
}