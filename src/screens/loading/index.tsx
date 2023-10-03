import { loading } from "../../assets";

export default function Loading() {
  
  return (
    <div className="bg-[#1c273a] h-screen flex justify-center items-center">
      <div className="w-[300px] bg-[rgb(28, 39, 58)] p-10 rounded-lg">
        <img src={loading} />
      </div>
    </div>
  )
}
