import React from "react"
const Sk = ({ className = "" }) => (
  <div className={`rounded-md animate-pulse bg-[#D8DCE8] ${className}`} />
)
export default function RateLimitSkeleton() {
  return (
    <div className="bg-[#EEF1F7] mx-5 my-4 flex flex-col gap-4 font-sans">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <Sk className="w-36 h-5" />
          <Sk className="w-20 h-3" />
        </div>
        <Sk className="w-32 h-10 rounded-md" />
      </div>
      <div className="bg-white rounded-lg p-5 border border-[#D8DCE8]">
        <div className="flex items-center gap-4">
          <Sk className="w-[72px] h-[72px] rounded-full shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <Sk className="w-2/5 h-4" />
            <Sk className="w-3/5 h-3" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-5 flex flex-col border border-[#D8DCE8]">
            <div className="flex justify-between items-start">
              <Sk className="w-2/5 h-4" />
              <Sk className="w-16 h-5 rounded-full" />
            </div>
            <div className="flex flex-col gap-1.5 mt-2 flex-1 min-h-[36px]">
              <Sk className="w-full h-3" />
              <Sk className="w-4/5 h-3" />
            </div>
            <div className="mt-3 bg-[#EEF1F7] rounded-md px-3 py-2.5 flex justify-between items-center">
              <Sk className="w-12 h-5 rounded-full" />
              <Sk className="w-12 h-3 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}