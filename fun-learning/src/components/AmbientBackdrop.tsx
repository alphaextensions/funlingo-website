// CSS-only ambient backdrop. The animation + reduced-motion gate live in
// src/styles/globals.css under ".ambient { ... }".
export function AmbientBackdrop() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="orb" />
      <div className="veil" />
    </div>
  );
}
