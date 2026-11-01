import ContactSheet from "@/components/ContactSheet";
import { SITE_URL } from "@/config/site";
import frames from "../../../content/frames.json";

export const metadata = {
    title: "Frames",
    description: "Photographs by Rushil Patel.",
    alternates: { canonical: `${SITE_URL}/frames` },
};

export default function FramesPage() {
    return (
        <div className="relative left-1/2 w-[calc(100vw-2rem)] max-w-6xl -translate-x-1/2 sm:w-[calc(100vw-3rem)]">
            <ContactSheet frames={frames} />
        </div>
    );
}
