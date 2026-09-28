// ==========================================================================
// Tech Stack — ícones oficiais do Devicon (https://github.com/devicons/devicon)
// Arquivos SVG salvos localmente em assets/icons/tech/ (sem dependência externa)
// ==========================================================================
const techStack = [
    { name: "HTML5", icon: "assets/icons/tech/html5.svg" },
    { name: "CSS3", icon: "assets/icons/tech/css3.svg" },
    { name: "JavaScript", icon: "assets/icons/tech/javascript.svg" },
    { name: "React", icon: "assets/icons/tech/react.svg" },
    { name: "TypeScript", icon: "assets/icons/tech/typescript.svg" },
    { name: "Python", icon: "assets/icons/tech/python.svg" },
    { name: "PostgreSQL", icon: "assets/icons/tech/postgresql.svg" },
    { name: "Docker", icon: "assets/icons/tech/docker.svg" },
    { name: "Git", icon: "assets/icons/tech/git.svg" },
    { name: "GitHub", icon: "assets/icons/tech/github.svg" },
    { name: "Terminal / Bash", icon: "assets/icons/tech/bash.svg" },
    { name: "VS Code", icon: "assets/icons/tech/vscode.svg" }
];

// ==========================================================================
// Projetos — organizados por categoria: academico | profissional | pessoal
// Preencha cada campo com as informações reais do seu projeto.
// Projetos Integradores (ABP) devem indicar o semestre. Ex: "1DSM – 1º Sem. 2026"
// ==========================================================================
const projectsList = [
    {
        title: "TeamStacked — PortalScrum",
        category: "academico",
        semester: "1DSM – 1º Sem. 2026",
        desc: "Plataforma interativa voltada à prática de questões de certificação e simulados sobre a metodologia ágil Scrum, desenvolvida como Projeto Integrador (ABP).",
        contribution: "Atuei na prototipação das telas no Figma, na organização das tarefas da equipe e no desenvolvimento de partes do front-end, do back-end e da camada de segurança da aplicação.",
        tags: ["HTML5", "CSS", "JavaScript", "Node.js", "PostgreSQL"],
        label: "PROJETO 01",
        image: "assets/img/projects/demo-project-abp-1.png",
        githubUrl: "https://github.com/TeamStacked/PortalScrum",
        demoUrl: "https://portal-scrum.vercel.app"
    },
    {
        title: "Gerenciador de Tarefas (Kanban)",
        category: "pessoal",
        semester: "Projeto Pessoal — 2026",
        desc: "Aplicação simples estilo Trello, com colunas interativas, persistência no LocalStorage e cálculo de progresso.",
        contribution: "Projeto desenvolvido de forma independente, contemplando toda a lógica de front-end, interatividade e persistência de dados no navegador.",
        tags: ["JavaScript", "DOM API", "LocalStorage", "CSS3 Grid"],
        label: "PROJETO 02",
        image: "assets/img/projects/demo-project-kanban.png",
        githubUrl: "https://github.com/ViniciusGuin/Kanban-1",
        demoUrl: "https://viniciusguin.github.io/Kanban-1/"
    }
];

const categoryLabels = {
    academico: "Acadêmico",
    profissional: "Profissional",
    pessoal: "Pessoal"
};

let currentFilter = "todos";

document.addEventListener('DOMContentLoaded', () => {
    initGeometricCanvas();
    renderSkills();
    renderProjects();
    initProjectFilters();
    initScrollSpy();

    const prevBtn = document.getElementById('journeyPrevBtn');
    const nextBtn = document.getElementById('journeyNextBtn');
    if (prevBtn) prevBtn.addEventListener('click', () => scrollJourney(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollJourney(1));

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('light');
        });
    }
});

function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    techStack.forEach(tech => {
        const box = document.createElement('div');
        box.className = 'skill-box';
        box.innerHTML = `
            <div class="skill-icon-badge">
                <img src="${tech.icon}" alt="${tech.name}" width="28" height="28" loading="lazy">
            </div>
            <span>${tech.name}</span>
        `;
        grid.appendChild(box);
    });
}

function renderProjects() {
    const container = document.getElementById('projectsContainer');
    const emptyMsg = document.getElementById('projectsEmpty');
    if (!container) return;

    container.innerHTML = '';

    const codeIconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
    const externalIconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;

    const visibleProjects = currentFilter === 'todos'
        ? projectsList
        : projectsList.filter(p => p.category === currentFilter);

    if (visibleProjects.length === 0) {
        if (emptyMsg) emptyMsg.style.display = 'block';
        return;
    }
    if (emptyMsg) emptyMsg.style.display = 'none';

    visibleProjects.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';

        const demoLink = p.demoUrl
            ? `<a href="${p.demoUrl}" target="_blank" class="project-link">${externalIconSvg} Abrir Projeto</a>`
            : '';

        card.innerHTML = `
            <div class="project-preview">
                ${p.image
                    ? `<img src="${p.image}" alt="Prévia do projeto ${p.title}" class="project-preview-img" loading="lazy">`
                    : p.label}
                <span class="project-category-badge cat-${p.category}">${categoryLabels[p.category] || p.category}</span>
            </div>
            <div class="project-body">
                <h3 class="project-title">${p.title}</h3>
                <p class="project-desc">${p.desc}</p>

                <div class="project-contribution">
                    <strong>Contribuição pessoal:</strong> ${p.contribution}
                </div>

                <div class="project-tags">
                    ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>

                <div class="project-semester">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    ${p.semester}
                </div>

                <div class="project-links">
                    <a href="${p.githubUrl}" target="_blank" class="project-link">${codeIconSvg} Código</a>
                    ${demoLink}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function initProjectFilters() {
    const filters = document.getElementById('projectFilters');
    if (!filters) return;

    filters.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentFilter = btn.getAttribute('data-filter');
        renderProjects();
    });
}

function scrollJourney(direction) {
    const container = document.getElementById('journeyScrollContainer');
    if (!container) return;
    const scrollAmount = 280;
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.sidebar-item');

    function onScroll() {
        let currentSectionId = 'hero';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach((item) => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === currentSectionId) {
                item.classList.add('active');
                updateBallPosition(item);
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
    onScroll();
}

function updateBallPosition(targetItem) {
    const ball = document.getElementById('ballIndicator');
    if (!targetItem || !ball) return;

    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        const itemRect = targetItem.getBoundingClientRect();
        const parentRect = targetItem.parentElement.getBoundingClientRect();
        const centerLeft = (itemRect.left - parentRect.left) + (itemRect.width / 2);

        ball.style.top = '50%';
        ball.style.left = `${centerLeft}px`;
    } else {
        const offsetTop = targetItem.offsetTop;
        ball.style.left = '50%';
        ball.style.top = `${offsetTop}px`;
    }
}

function initGeometricCanvas() {
    const canvas = document.getElementById('geometric-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const gridSize = 60;
    let time = 0;

    function animate() {
        ctx.clearRect(0, 0, w, h);
        time += 0.01;

        for (let x = 0; x < w; x += gridSize) {
            for (let y = 0; y < h; y += gridSize) {
                const isEven = (Math.floor(x / gridSize) + Math.floor(y / gridSize)) % 2 === 0;
                if (isEven) {
                    const opacity = Math.sin(time + (x + y) * 0.002) * 0.02 + 0.03;
                    ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`;
                    ctx.fillRect(x, y, gridSize, gridSize);
                }
            }
        }

        requestAnimationFrame(animate);
    }
    animate();
}
