import { FiMail, FiTwitter, FiLinkedin, FiGithub } from "react-icons/fi";

/* Feather has no Stack Overflow glyph - drawn to its voice: 24 viewBox, 2px stroke, round caps */
function FiStackOverflow(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" {...props}>
            <path d="M5 14v6h14v-6" />
            <path d="M9 17h6" />
            <path d="M9 13.2l6.2 1.1" />
            <path d="M10.2 9l5.8 2.4" />
            <path d="M12.5 5l4.6 3.8" />
        </svg>
    );
}

const links = [
    { href: "mailto:rushil13579@gmail.com", label: "Email", Icon: FiMail },
    { href: "https://www.x.com/rushil_b_patel", label: "X", Icon: FiTwitter },
    { href: "https://www.linkedin.com/in/rushil-b-patel", label: "LinkedIn", Icon: FiLinkedin },
    { href: "https://www.github.com/rushil-b-patel", label: "GitHub", Icon: FiGithub },
    { href: "https://stackoverflow.com/users/25128671/rushil-patel", label: "Stack Overflow", Icon: FiStackOverflow },
];

export default function SocialMedia() {
    return (
        <div className="flex items-center gap-4 text-app-muted">
            {links.map(({ href, label, Icon }) => (
                <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="transition-colors duration-200 hover:text-saffron"
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                    <Icon size={16} />
                </a>
            ))}
        </div>
    );
}
