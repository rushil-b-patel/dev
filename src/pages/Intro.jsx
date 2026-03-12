import SocialMedia from "../components/SocialMedia";

export default function Intro() {
    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">Rushil Bhaveshkumar Patel</h1>
                <SocialMedia />
            </div>
            <p className="mt-6">
                Software Developer Engineer at <b>Odoo</b>, Currently optimizing website builder.
                Skilled in <b>Vite.js</b>, <b>Next.js</b>, <b>JavaScript</b>, and <u>modern web technologies</u>.
                Passionate about servers, cloud infrastructure, and scalable software architecture.
                Continuously <u>learning</u>, <u>improving</u>, and <u>building</u> life one step at a time.
            </p>
        </div>
    )
}
