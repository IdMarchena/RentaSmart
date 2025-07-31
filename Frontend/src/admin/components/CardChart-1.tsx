import { BarChart } from '@mui/x-charts/BarChart';


export const CardChart1 = () => {
    return (
        <div className="w-full h-[400px] flex items-center justify-center bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px]">
            <BarChart
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'], categoryGapRatio: 0.3}]} 
                colors={['#EB8369', '#A9ADB6', '#393939']}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                height={400}
                borderRadius={10}
            />
        </div>
    )
}