import SARCurrancy from "./SARCurrancy"

const SAR = ({ price, width = 16, height = 16, color = "black", textSize = 16 }) => {

    return <span className="flex gap-1 flex-row items-center ">
        <div className="flex items-center ">
            <SARCurrancy width={width} height={height} fill={color} />
        </div>

        <span className={`text-[${textSize}px]`}>{price}</span>
    </span>

}
export default SAR