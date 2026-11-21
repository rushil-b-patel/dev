import ContactSheet from "@/components/ContactSheet";
import { pageMetadata } from "@/config/site";
import { folders, looseFrames } from "@/lib/frames";

export const metadata = pageMetadata({ title: "Frames", description: "Photographs by Rushil Patel from Ahmedabad, Gandhinagar, Udaipur, Mumbai, Dubai and Abu Dhabi.", path: "/frames" });

export default function FramesPage() {
    const tiles = folders.map(({ frames, ...folder }) => ({ ...folder, cover: frames[0], count: frames.length }));
    return (
        <>
            <h1 className="mb-8 text-sm font-medium text-app-primary">Frames</h1>
            <ContactSheet frames={looseFrames} folders={tiles} />
        </>
    );
}
