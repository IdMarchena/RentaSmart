import { BarChart } from '@mui/x-charts/BarChart';


export const CardChart3 = () => {
    return (
        <div className="w-full h-[400px] flex flex-col items-center justify-center bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] p-4">
            <h1 className="text-[#393939] text-[14px] font-bold mt-10">Rendimiento Estadístico</h1>
            <div className="w-full">
                <BarChart
                    xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'], categoryGapRatio: 0.5 }]}
                    colors={['#EB8369', '#A9ADB6', '#393939']}
                    series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                    height={380}
                    borderRadius={10}
                />
            </div>
        </div>
    )
}