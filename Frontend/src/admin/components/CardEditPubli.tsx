import imgMaps from "@//assets/maps.jpg";
import imgUpload from "@/assets/upload.png"

interface CardEditPublicProps {
    onClose?: () => void;
}

export const CardEditPubli = ({ onClose }: CardEditPublicProps) => {
    return (
        <div className="relative w-[550px] h-[700px] flex flex-col justify-center items-center rounded-[20px] p-6 shadow-[0px_10px_10px_rgba(0,0,0,0.2)] bg-[#FEFCEC] overflow-hidden overflow-y-scroll custom-scrollbar-2">
            {/* Botón de cerrar */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#393939] bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                >
                    <span className="text-[#f1f1f1] text-xl font-bold">×</span>
                </button>
            )}

            <div className="w-full h-auto flex flex-col items-center justify-center gap-5 z-10 mt-220">
                <h1 className="text-[#393939] font-bold text-3xl">Edita Tu Propiedad</h1>
                <span className="text-[#393939] font-semibold text-sm">Completa todos los campos requeridos</span>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">Que quieres arrendar?</label>
                    <select
                        className="w-full px-3 py-2 rounded-md border border-[#BCBBB0] bg-transparent text-[#393939] placeholder-gray-400 focus:outline-none focus:border-[#EB8369]"
                    >
                        <option className="bg-[#FEFCEC] text-[#393939]">Apartamento</option>
                        <option className="bg-[#FEFCEC] text-[#393939]">Casa</option>
                        <option className="bg-[#FEFCEC] text-[#393939]">Habitacion</option>
                    </select>
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">Donde queda ubicado?</label>
                    <input
                        type="text"
                        placeholder="Ej: El Prado, Santa Marta"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>
                <span className="text-[#393939] font-semibold text-sm">Verifica que la Dirección ingresada se vea reflejada correctamente en el mapa, caso contrario marque la ubicacion en el mapa</span>
                <div className="w-full h-auto">
                    <img src={imgMaps} alt="maps" className="w-full h-[150px] object-cover rounded-[10px]" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">Cuantas habitaciones tiene ?</label>
                    <input
                        type="number"
                        placeholder="Ej: 2"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">Cuantos baños tiene ?</label>
                    <input
                        type="number"
                        placeholder="Ej: 2"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">Esta amoblado ?</label>
                    <select
                        className="w-full px-3 py-2 rounded-md border border-[#BCBBB0] bg-transparent text-[#393939] placeholder-gray-400 focus:outline-none focus:border-[#EB8369]"
                    >
                        <option className="bg-[#FEFCEC] text-[#393939]">Si</option>
                        <option className="bg-[#FEFCEC] text-[#393939]">No</option>
                    </select>
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">Capacidad de personas ?</label>
                    <input
                        type="number"
                        placeholder="Ej: 3"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">Cual es su estracto ?</label>
                    <input
                        type="number"
                        placeholder="Ej: 4"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">Numero de contacto</label>
                    <input
                        type="number"
                        placeholder="Ej: 300 4568784310"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">Precio</label>
                    <input
                        type="number"
                        placeholder="Ej: 4.000.00"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">Descripcion</label>

                    <textarea
                        placeholder="Ej: Moderno apartamento de 2 habitaciones ubicado en una zona tranquila y de fácil acceso. Cuenta con excelente iluminación natural, cocina equipada, balcón con vista panorámica y parqueadero privado."
                        className="w-full h-[90px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">Añade Imagenes Para Tu Publicacion</label>
                    <div className="w-full max-w-lg">
                        <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-[#FEFCEC] hover:bg-gray-100 transition"
                        >
                            <img src={imgUpload} alt="img" className="w-10 h-10 text-gray-600 mb-2" />
                            <p className="text-sm font-semibold text-gray-700">Carga Imágenes</p>
                            <input id="file-upload" type="file" className="hidden" />
                        </label>
                    </div>
                </div>


                <button className="w-[60%] h-[40px] rounded-[10px] bg-[#EB8369] shadow-[0px_5px_10px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-[#d67359] transition-colors duration-200">
                    <span className="font-semibold text-sm text-white">Publicar</span>
                </button>
            </div>
        </div>
    );
};
