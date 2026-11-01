export default function FramesLayout({ children }) {
    return <div className="relative left-1/2 w-[calc(100vw-2rem)] max-w-6xl -translate-x-1/2 sm:w-[calc(100vw-3rem)]">{children}</div>;
}
