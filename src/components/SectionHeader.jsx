export function SectionHeader({ id, eyebrow, kicker, title, description }) {
  return (
    <section className="section-heading reveal" id={id}>
      <div className="section-label">
        <span>{eyebrow}</span>
        {kicker && <small>{kicker}</small>}
      </div>
      <h2 id={`${id}-title`}>{title}</h2>
      <p>{description}</p>
    </section>
  );
}

export function GlassCard({ as: Component = 'article', className = '', children, style }) {
  return (
    <Component className={`glass-card premium-card ${className}`} style={style}>
      {children}
    </Component>
  );
}
