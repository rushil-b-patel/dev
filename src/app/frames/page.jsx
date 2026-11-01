import ContactSheet from "@/components/ContactSheet";
import { SITE_URL } from "@/config/site";
import { folders, looseFrames } from "@/lib/frames";

export const metadata = {
    title: "Frames",
    description: "Photographs by Rushil Patel.",
    alternates: { canonical: `${SITE_URL}/frames` },
};

export default function FramesPage() {
    const tiles = folders.map(({ frames, ...folder }) => ({ ...folder, cover: frames[0], count: frames.length }));
    return <ContactSheet frames={looseFrames} folders={tiles} />;
}
