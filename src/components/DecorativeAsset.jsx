export default function DecorativeAsset({ name, className = "" }) {
  return (
    <img
      className={`decorative-asset decorative-asset-${name} ${className}`.trim()}
      src={`/decorative-icons/${name}.png`}
      alt=""
      aria-hidden="true"
    />
  );
}
