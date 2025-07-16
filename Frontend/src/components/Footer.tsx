import imgLogo from "../assets/Logo.png"
import imgFacebook from "../assets/facebook.png"
import imgInstagram from "../assets/instagram.png"
import imgLinkedin from "../assets/linkedin.png"
import imgEmail from "../assets/email.png"
import imgPhone from "../assets/phone.png"
import imgClock from "../assets/clock.png"
export const Footer = () => {
    return (
        <div className="w-full h-[350px] bg-[#DBDBD0] flex flex-col items-center">
            <div className="w-full h-[50px] flex flex-row items-center justify-between p-5 mt-15 border-short-b pt-0.5">
                <div className="w-[50%] h-[50px] flex flex-row items-center justify-start ml-2">
                    <img src={imgLogo} alt="Logo" className="w-[37.33px] h-[50px]"/>
                    <h1 className="text-[#393939] text-[20px] font-semibold">Renta<span className="text-[#EB8369] text-[20px] font-semibold">Smart</span></h1>
                </div>
                <div className=" md:w-[20%] w-[50%] h-[50px] flex flex-row items-center justify-center ml-2 gap-2">
                    <h1 className="text-[#393939] text-[14px] font-semibold">Redes Sociales</h1>
                    <img src={imgInstagram} alt="Logo" className="w-[20px] h-[20px]"/>
                    <img src={imgFacebook} alt="Logo" className="w-[20px] h-[20px]"/>
                    <img src={imgLinkedin} alt="Logo" className="w-[20px] h-[20px]"/>
                </div>

            </div>
            <div className="flex flex-row items-center justify-between w-full h-full">
                <div className="w-[50%] flex flex-col items-center justify-center">
                    <h1 className="text-[#393939] text-[20px] font-semibold">Contactanos</h1>
                    <br />
                    <div className="flex flex-col items-start justify-center gap-1">
                        <div className="flex flex-row items-center justify-center gap-2">
                            <img src={imgEmail} alt="" className="w-[20px] h-[20px]"/>
                            <p className="text-[#393939] text-[12px] font-bold">rentasmart@gmail.com</p>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-2">
                            <img src={imgPhone} alt="" className="w-[20px] h-[20px]"/>
                            <p className="text-[#393939] text-[12px] font-bold">+57 300 123 4567</p>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-2">
                            <img src={imgClock} alt="" className="w-[20px] h-[20px]"/>
                            <p className="text-[#393939] text-[12px] font-bold">Lunes a Viernes: 9:00 - 18:00</p>
                        </div>
                    </div>
                </div>
                <div className="w-[50%] flex flex-col items-center justify-center">
                    <h1 className="text-[#393939] text-[20px] font-semibold">Acerca de Nosotros</h1>
                    <br />
                    <div className="flex flex-col items-start justify-center gap-1">
                        <p className="text-[#393939] text-[12px] font-bold">Terminos y Condiciones</p>
                        <p className="text-[#393939] text-[12px] font-bold">Política de Privacidad</p>
                        <p className="text-[#393939] text-[12px] font-bold">Política de Cookies</p>
                        <p className="text-[#393939] text-[12px] font-bold">Política de Tratamiento de Datos</p>
                    </div>
                </div>
            </div>
            <span className="text-[#393939] text-[12px] font-bold">© 2025 RentaSmart. Todos los derechos reservados.</span>    
        </div>
    )
}