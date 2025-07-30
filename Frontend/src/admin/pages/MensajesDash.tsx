

import { Aside } from "../components/Aside"

export const MensajesDash = () => {
    return (
        <div className="w-full h-screen flex flex-row">
            <Aside />
            <div className="w-[85%] h-full flex flex-col items-center justify-center">
                <h1>MensajesDash</h1>
            </div>
        </div>
    )
}