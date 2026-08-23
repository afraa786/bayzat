export default function RibbonCta({ children = "Join Our Team", as = "button", className = "", ...props }) {
  const Tag = as;
  return (
    <Tag className={`ribbon-btn ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}
