import { IoClose } from "react-icons/io5"

function ConsumptionDetail({setIsDetailOpen}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center p-4 bg-black/90 text-white">
       <div className="w-full flex justify-end">
              <IoClose
                onClick={() => setIsDetailOpen(false)} 
                className="w-7 h-7 cursor-pointer" 
              />
            </div>
    </div>
  )
}

export default ConsumptionDetail