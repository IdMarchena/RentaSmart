import { PieChart } from '@mui/x-charts/PieChart';


export const CardChart2 = () => {
    return (
        <div className="w-[40%] h-[400px] flex flex-col items-center justify-center bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] max-[890px]:w-full">
            <h1 className="text-[#393939] text-[14px] font-bold mt-10">Rendimiento</h1>
            <PieChart
                series={[
                    {
                    data: [
                        { id: 0, value: 10, label: 'series A' },
                        { id: 1, value: 15, label: 'series B' },
                        { id: 2, value: 20, label: 'series C' },
                    ],
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    },
                ]}
                width={200}
                height={200}
                colors={['#EB8369', '#A9ADB6', '#393939']}
            />
        </div>
    )
}