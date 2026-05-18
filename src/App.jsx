import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { GlassCard, SectionHeader } from './components/SectionHeader.jsx';
import { usePointerGlow, useScrollEffects } from './hooks/useScrollEffects.js';
import {
  aboutCards,
  aiCapabilities,
  insights,
  navItems,
  processSteps,
  projects,
  skillGroups,
  testimonials,
} from './data/portfolioData.js';

const ProjectModal = lazy(() => import('./components/ProjectModal.jsx'));

function App() {
  const { activeSection, scrollProgress } = useScrollEffects();
  const pointer = usePointerGlow();
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroStats = useMemo(
    () => [
      { value: '5+', label: 'Product Cases' },
      { value: '58%', label: 'Faster Prototypes' },
      { value: 'AI', label: 'Native Workflow' },
    ],
    [],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target?.classList.add('is-visible');
    target?.nextElementSibling?.classList.add('is-visible');
    setMenuOpen(false);
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="progress-bar" style={{ transform: `scaleX(${scrollProgress / 100})` }} />
      <div className="custom-cursor" style={{ left: pointer.x, top: pointer.y }} />
      <div className="mouse-glow" />
      <BackgroundLayer />

      <header className={scrolled ? 'navbar is-scrolled' : 'navbar'}>
        <button className="brand" type="button" onClick={() => scrollToSection('home')}>
          <span className="brand-mark">AI</span>
          <span>
            Digital
            <strong>Maker</strong>
          </span>
        </button>
        <button
          className={menuOpen ? 'menu-button is-open' : 'menu-button'}
          type="button"
          aria-label="메뉴 열기"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="주요 섹션">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={activeSection === item.id ? 'active' : ''}
              type="button"
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <ActiveSectionIndicator activeSection={activeSection} onMove={scrollToSection} />

      <main>
        <HeroSection heroStats={heroStats} onMove={scrollToSection} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection onSelect={setSelectedProject} />
        <ProcessSection />
        <AICapabilitySection />
        <InsightsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer onTop={() => scrollToSection('home')} />
      {selectedProject && (
        <Suspense fallback={<div className="modal-backdrop" aria-label="프로젝트 상세 로딩 중" />}>
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </Suspense>
      )}
    </>
  );
}

function LoadingScreen() {
  return (
    <div className="loader" aria-label="페이지 로딩 중">
      <div className="loader-orbit">
        <span />
        <span />
      </div>
      <p>Crafting premium product experience</p>
    </div>
  );
}

function BackgroundLayer() {
  return (
    <div className="site-bg">
      <span className="bg-grid" />
      <span className="bg-noise" />
      <span className="bg-aurora bg-aurora-one" />
      <span className="bg-aurora bg-aurora-two" />
      <span className="bg-aurora bg-aurora-three" />
      <span className="bg-aurora bg-aurora-four" />
    </div>
  );
}

function ActiveSectionIndicator({ activeSection, onMove }) {
  return (
    <aside className="section-indicator" aria-label="현재 섹션">
      {navItems.slice(0, 8).map((item) => (
        <button
          key={item.id}
          className={activeSection === item.id ? 'active' : ''}
          type="button"
          aria-label={`${item.label} 섹션으로 이동`}
          onClick={() => onMove(item.id)}
        />
      ))}
    </aside>
  );
}

function HeroSection({ heroStats, onMove }) {
  return (
    <section className="hero reveal" id="home">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">Premium Portfolio / AI Product Maker</p>
        <h1>
          사용자 경험을 설계하고
          <span>AI 기반 제품</span>
          <em>으로 구현합니다.</em>
        </h1>
        <p className="hero-lead">
          웹 개발, UI/UX 기획, 생성형 AI, 영상과 마케팅을 연결해 아이디어가 실제로 작동하는 디지털 경험이 되도록 만듭니다.
        </p>
        <div className="hero-actions">
          <button type="button" className="primary-button magnetic-button" onClick={() => onMove('projects')}>
            프로젝트 보기
          </button>
          <button type="button" className="secondary-button magnetic-button" onClick={() => onMove('contact')}>
            연락하기
          </button>
        </div>
        <div className="hero-stats">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-visual parallax-card" aria-label="대표 프로젝트 목업">
        <div className="mockup-window">
          <div className="mockup-topbar">
            <span />
            <span />
            <span />
            <em>Product OS</em>
          </div>
          <img src="https://picsum.photos/seed/neon-product-premium/1100/780" alt="대표 프로젝트 목업" />
          <div className="mockup-panel glass-card">
            <span>AI Product Sprint</span>
            <strong>UX Strategy / Frontend / Video / Growth</strong>
          </div>
          <div className="mockup-float-card glass-card">
            <strong>+58%</strong>
            <span>prototype speed</span>
          </div>
        </div>
      </div>

      <button className="scroll-cue" type="button" onClick={() => onMove('about')} aria-label="아래로 스크롤">
        <span />
      </button>
    </section>
  );
}

function AboutSection() {
  return (
    <>
      <SectionHeader
        id="about"
        eyebrow="PORTFOLIO"
        kicker="01"
        title="아이디어를 서비스 경험으로 바꾸는 프로덕트 메이커"
        description="사용자 문제 정의부터 인터페이스 설계, React 구현, AI 제작 워크플로우까지 하나의 제품 경험으로 연결합니다."
      />
      <section className="about-grid reveal" aria-labelledby="about-title">
        <GlassCard className="about-intro">
          <span className="card-kicker">Career Summary</span>
          <h3>기획과 구현 사이의 간격을 줄입니다.</h3>
          <p>
            웹 기반 서비스 기획과 프론트엔드 구현을 중심으로, 생성형 AI와 영상 제작 도구를 활용해 브랜드 경험까지 확장해 왔습니다.
          </p>
          <div className="career-strip">
            <span>UX Planning</span>
            <span>Frontend</span>
            <span>AI Creative</span>
          </div>
        </GlassCard>
        {aboutCards.map((card, index) => (
          <GlassCard className="info-card stagger-item" key={card.title} style={{ '--delay': `${index * 70}ms` }}>
            <span className="card-kicker">{card.label}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </GlassCard>
        ))}
      </section>
    </>
  );
}

function SkillsSection() {
  return (
    <>
      <SectionHeader
        id="skills"
        eyebrow="STACK"
        kicker="02"
        title="기획부터 출시까지 이어지는 멀티 스택"
        description="개발, 디자인, AI 제작 도구를 분리된 역량이 아니라 하나의 제작 시스템으로 사용합니다."
      />
      <section className="skill-section reveal">
        {skillGroups.map((group) => (
          <GlassCard className="skill-group" key={group.title}>
            <span className="card-kicker">{group.subtitle}</span>
            <h3>{group.title}</h3>
            <div className="skill-list">
              {group.items.map((skill) => (
                <div className="skill-chip" key={skill.name}>
                  <span>{skill.name.slice(0, 2).toUpperCase()}</span>
                  <div>
                    <p>{skill.name}</p>
                    <small>{skill.level}</small>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </section>
    </>
  );
}

function ProjectsSection({ onSelect }) {
  return (
    <>
      <SectionHeader
        id="projects"
        eyebrow="CASE STUDY"
        kicker="03"
        title="문제, 해결, 성과가 보이는 프로젝트"
        description="프로젝트마다 역할, 기술, 성과 수치를 명확히 보여 실제 제품 제작 역량이 드러나도록 구성했습니다."
      />
      <section className="project-grid reveal">
        {projects.map((project, index) => (
          <GlassCard className="project-card stagger-item" key={project.title} style={{ '--delay': `${index * 80}ms` }}>
            <div className="project-media">
              <ProjectVideo project={project} />
              <div className="video-gradient" />
              <div className="video-glow" />
              <span>{project.metric}</span>
            </div>
            <div className="project-content">
              <div className="project-title-row">
                <h3>{project.title}</h3>
                <em>{project.role}</em>
              </div>
              <p>{project.summary}</p>
              <div className="tag-row">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="project-meta">
                <div>
                  <span>기간</span>
                  <strong>{project.period}</strong>
                </div>
                <div>
                  <span>성과</span>
                  <strong>{project.result}</strong>
                </div>
              </div>
              <button type="button" className="text-button case-button" onClick={() => onSelect(project)}>
                Case study
              </button>
            </div>
          </GlassCard>
        ))}
      </section>
    </>
  );
}

function ProjectVideo({ project }) {
  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const frameRef = useRef(null);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '320px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="project-video-frame" ref={frameRef}>
      <div className={loaded ? 'video-skeleton is-hidden' : 'video-skeleton'}>
        <img src={project.image} alt="" aria-hidden="true" />
      </div>
      {shouldLoad && (
        <video
          className={loaded ? 'project-video is-loaded' : 'project-video'}
          src={project.video}
          poster={project.image}
          aria-label={project.videoLabel}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setLoaded(true)}
        />
      )}
    </div>
  );
}

function ProcessSection() {
  return (
    <>
      <SectionHeader
        id="process"
        eyebrow="PROCESS"
        kicker="04"
        title="리서치에서 최적화까지 이어지는 제작 흐름"
        description="단순히 화면을 만드는 것이 아니라, 문제를 정의하고 검증하며 제품의 완성도를 단계적으로 끌어올립니다."
      />
      <section className="process-timeline reveal">
        <div className="timeline-line" />
        {processSteps.map((step, index) => (
          <div className="process-step stagger-item" key={step.title} style={{ '--delay': `${index * 80}ms` }}>
            <div className="process-icon">{step.icon}</div>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <strong>{step.label}</strong>
            <p>{step.text}</p>
          </div>
        ))}
      </section>
    </>
  );
}

function AICapabilitySection() {
  return (
    <>
      <SectionHeader
        id="ai"
        eyebrow="AI CREATIVE"
        kicker="05"
        title="AI를 제작 속도와 표현력의 엔진으로 사용합니다"
        description="프롬프트 엔지니어링, 영상 생성, 비주얼 디렉션, 자동화까지 실제 산출물로 이어지는 AI 활용 역량을 보여줍니다."
      />
      <section className="ai-showcase reveal">
        <GlassCard className="ai-command">
          <span className="card-kicker">Live Prompt System</span>
          <h3>Prompt engineering for product outcomes</h3>
          <div className="prompt-window">
            <code>Define user pain → Generate concept → Validate flow → Ship prototype</code>
          </div>
          <div className="keyword-marquee" aria-hidden="true">
            <span>strategy</span>
            <span>wireframe</span>
            <span>copywriting</span>
            <span>automation</span>
            <span>video</span>
          </div>
        </GlassCard>
        <div className="ai-grid">
          {aiCapabilities.map((item, index) => (
            <GlassCard className="ai-card hologram-card stagger-item" key={item.title} style={{ '--delay': `${index * 70}ms` }}>
              <div className="tool-logo">{item.tool.slice(0, 2).toUpperCase()}</div>
              <span>{item.tool}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </>
  );
}

function InsightsSection() {
  return (
    <>
      <SectionHeader
        id="insights"
        eyebrow="INSIGHT"
        kicker="06"
        title="제작 과정에서 얻은 실무 인사이트"
        description="React, AI, UI/UX, 마케팅 관점에서 프로젝트를 더 잘 만들기 위한 기록을 정리했습니다."
      />
      <section className="insight-grid reveal">
        {insights.map((post) => (
          <GlassCard className="insight-card" key={post.title}>
            <div className="insight-media">
              <img src={post.image} alt={`${post.title} 썸네일`} />
            </div>
            <div>
              <div className="insight-meta">
                <span>{post.category}</span>
                <small>{post.time}</small>
              </div>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <button type="button" className="text-button">
                읽기
              </button>
            </div>
          </GlassCard>
        ))}
      </section>
    </>
  );
}

function TestimonialsSection() {
  return (
    <section className="testimonials reveal" id="testimonials">
      <div className="section-heading compact">
        <div className="section-label">
          <span>TESTIMONIALS</span>
          <small>07</small>
        </div>
        <h2>협업자가 기억하는 일하는 방식</h2>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <GlassCard className="testimonial-card" key={item.name}>
            <div className="testimonial-top">
              <img src={item.avatar} alt={`${item.name} 프로필`} />
              <div className="stars" aria-label="5점 만점 후기">
                <span>★★★★★</span>
              </div>
            </div>
            <p>{item.text}</p>
            <div className="profile">
              <div>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = 'email@portfolio.dev';
  const links = [
    { icon: '@', label: 'Email', value: email },
    { icon: 'GH', label: 'GitHub', value: 'github.com/digital-maker' },
    { icon: 'NT', label: 'Notion', value: 'notion.so/digital-maker' },
    { icon: 'BE', label: 'Behance', value: 'behance.net/digital-maker' },
    { icon: 'VG', label: 'Velog', value: 'velog.io/@digital-maker' },
  ];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <SectionHeader
        id="contact"
        eyebrow="CONTACT"
        kicker="08"
        title="새로운 디지털 경험을 함께 만들 준비가 되어 있습니다."
        description="프로젝트, 협업, 포트폴리오 피드백, AI 제작 워크플로우에 대해 편하게 연락해주세요."
      />
      <section className="contact-section reveal">
        <GlassCard className="contact-links" as="div">
          <h3>Start a conversation</h3>
          <button className="copy-email" type="button" onClick={copyEmail}>
            {copied ? '이메일 복사됨' : '이메일 복사하기'}
          </button>
          {links.map((link) => (
            <a href="/" onClick={(event) => event.preventDefault()} key={link.value}>
              <i>{link.icon}</i>
              <span>{link.label}</span>
              <strong>{link.value}</strong>
            </a>
          ))}
        </GlassCard>
        <form className="contact-form glass-card">
          <label>
            이름
            <input type="text" placeholder="성함을 입력해주세요" />
          </label>
          <label>
            이메일
            <input type="email" placeholder="reply@email.com" />
          </label>
          <label>
            메시지
            <textarea rows="5" placeholder="어떤 프로젝트를 함께 만들까요?" />
          </label>
          <button className="primary-button contact-submit magnetic-button" type="submit" onClick={(event) => event.preventDefault()}>
            메시지 보내기
          </button>
        </form>
      </section>
    </>
  );
}

function Footer({ onTop }) {
  return (
    <footer className="footer">
      <div className="footer-line" />
      <div className="footer-main">
        <div>
          <strong>AI Digital Product Maker</strong>
          <p>AI와 인터랙션으로 사용자의 다음 행동을 설계하는 프리미엄 디지털 프로덕트 포트폴리오</p>
        </div>
        <nav aria-label="SNS 링크">
          <a href="/" onClick={(event) => event.preventDefault()}>
            GitHub
          </a>
          <a href="/" onClick={(event) => event.preventDefault()}>
            Notion
          </a>
          <a href="/" onClick={(event) => event.preventDefault()}>
            Behance
          </a>
          <button className="back-to-top" type="button" onClick={onTop}>
            Top
          </button>
        </nav>
      </div>
      <span>Copyright 2026 Digital Maker Portfolio. All rights reserved.</span>
    </footer>
  );
}

export default App;
