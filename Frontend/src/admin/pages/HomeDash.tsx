import { Aside } from "../components/Aside"

export const HomeDash = () => {
    return (
        <div className="w-full h-screen flex flex-row">
            <Aside />
            <div className="w-[85%] h-full flex flex-col items-center justify-center">
                <h1>HomeDash</h1>
            </div>
        </div>
    )
}