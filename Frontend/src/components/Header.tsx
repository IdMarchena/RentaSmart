import imgLogo from "../assets/Logo.png"


export const Header = () => {
    return (
        <div className="w-full h-[50px] bg-[#FEFCEC] flex felx-row justify-between p-5">
            <div className="w-full h-[50px] bg-[#FEFCEC] flex flex-row items-center ml-2">
                <img src={imgLogo} alt="Logo" className="w-[37.33px] h-[50px]"/>
                <h1 className="text-[#393939] text-[20px] font-semibold">Renta<span className="text-[#EB8369] text-[20px] font-semibold">Smart</span></h1>
            </div>
            <div className="w-full h-[50px] bg-[#FEFCEC] flex flex-row items-center gap-10 justify-end mr-3">
                <h1 className="text-[#393939] text-[18px] font-semibold">Inicio</h1>
                <h1 className="text-[#393939] text-[18px] font-semibold">Apartmentos</h1>
                <button className="text-[#EB8369] text-[16px] font-semibold border-[1px] border-[#EB8369] rounded-[10px] w-[180px] h-[28px]">Iniciar Sesión</button>
            </div>
        </div>
    )
}