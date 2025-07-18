import imgUser from "../assets/user.png"
import imgCalend from "../assets/calendar.png"
import { Rating } from '@mui/material';

export const CardReview = () => {
    return (
        <div className="w-full h-[150px]  rounded-[10px] border-[1px] border-[#C7C7C7] p-5 flex flex-col items-start gap-2 bg-[#FEFEFE]">
            <div className="flex flex-row items-start gap-2 w-full justify-between">
                <div className="flex flex-row items-center gap-2">
                    <img src={imgUser} alt="calendar" className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col items-start">
                        <h2 className="text-[#393939] text-sm md:text-lg font-bold">Juan Perez</h2>
                        <span className="text-[#A6A6A6] text-[12px] md:text-[12px] font-bold">Apartamento 2B - El Prado, Santa Marta</span>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <img src={imgCalend} alt="calendar" className="w-5 h-5" />
                    <span className="text-[#A6A6A6] text-[12px] md:text-[12px] font-bold">14 de enero de 2024</span>
                </div>
            </div>
            <Rating name="read-only" value={5} readOnly />
            <p className="text-[#A6A6A6] text-[12px] md:text-[12px] font-normal">Excelente ubicación, excelente servicio y excelente precio. Me encantó la casa.</p>
        </div>
    )
}