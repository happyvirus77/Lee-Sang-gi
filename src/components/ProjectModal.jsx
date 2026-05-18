import { useState } from 'react';

function ProjectModal({ project, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <article
        className="project-modal glass-card"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} 상세`}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" aria-label="상세 닫기" onClick={onClose}>
          x
        </button>
        <ModalVideo project={project} />
        <div className="modal-body">
          <p className="eyebrow">Video Case Study / Problem / Solution / Result</p>
          <h2>{project.title}</h2>
          <p className="modal-summary">{project.summary}</p>
          <div className="modal-metric">
            <strong>{project.metric}</strong>
            <span>{project.result}</span>
            <span>{project.role}</span>
          </div>
          <div className="modal-grid">
            <DetailBlock title="프로젝트 목적" text={project.purpose} />
            <DetailBlock title="문제 정의" text={project.problem} />
            <DetailBlock title="해결 과정" text={project.solution} />
            <DetailBlock title="주요 기능" text={project.features.join(', ')} />
            <DetailBlock title="사용 기술" text={project.tech.join(', ')} />
            <DetailBlock title="UI 설계 과정" text={project.design} />
            <DetailBlock title="성과 수치" text={`${project.metric} / ${project.result}`} />
            <DetailBlock title="회고" text={project.review} />
          </div>
        </div>
      </article>
    </div>
  );
}

export default ProjectModal;

function ModalVideo({ project }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="modal-video-frame">
      <div className={loaded ? 'video-skeleton is-hidden' : 'video-skeleton'}>
        <img src={project.image} alt="" aria-hidden="true" />
      </div>
      <video
        className={loaded ? 'project-video modal-video is-loaded' : 'project-video modal-video'}
        src={project.video}
        poster={project.image}
        aria-label={`${project.title} 영상 쇼케이스`}
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
        onCanPlay={() => setLoaded(true)}
      />
      <div className="video-gradient" />
    </div>
  );
}

function DetailBlock({ title, text }) {
  return (
    <div className="detail-block">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
