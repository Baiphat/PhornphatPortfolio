const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About me" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "work", label: "Work" },
];
const p = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function InstagramIcon() {
  return (
    <g {...p}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
    </g>
  );
}

function FacebookIcon() {
  return <path {...p} d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />;
}

function GitHubIcon() {
  return <path {...p} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />;
}

const socials = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/nxbulapp_/", icon: <InstagramIcon /> },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/PhornphatLepkhut", icon: <FacebookIcon /> },
  { id: "github", label: "GitHub", href: "https://github.com/Baiphat", icon: <GitHubIcon /> },
] as const;

export function Footer() {
  return (
    <footer id="contact" className="foot">
      <img src="/assets/logo.png" alt="Phornphat" className="flogo" />
      <nav>{nav.map((item) => <a key={item.id} href={"#" + item.id}>{item.label}</a>)}</nav>
      <div className="social">
        {socials.map((item) => (
          <a key={item.id} href={item.href} aria-label={item.label} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" width="20" height="20">{item.icon}</svg></a>
        ))}
      </div>
      <a className="donate-btn" href="https://ezdn.app/baiphat" target="_blank" rel="noopener noreferrer" aria-label="Donate to Phornphat on EzyDonate">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 21s-8-4.7-8-11a4.5 4.5 0 0 1 8-2.9A4.5 4.5 0 0 1 20 10c0 6.3-8 11-8 11Z" /></svg>
        <span>Donate Me</span>
      </a>
      <p>© 2026 Phornphat Lepkhrut. All rights reserved.</p>
      <small>Designed &amp; Developed with Passion</small>
    </footer>
  );
}
