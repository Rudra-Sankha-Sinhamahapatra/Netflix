import { useRouter } from "next/navigation";

interface propsType{
    button:string;
    tag:string;
    mode:string
}

const InputBox=({button,tag,mode}:propsType)=>{
    const router=useRouter()
    return(
        <>
         <label htmlFor="" className="text-white">Email</label>
        <input type="text" placeholder="ryan@gmail.com" className="p-2"/>
        <label htmlFor="" className="text-white">Password</label>
        <input type="text" placeholder="alex12345#" className="p-2"/>
        <button type="button" className="bg-red-500 text-white py-3 px-1 font-semibold mt-1 hover:bg-black hover:border hover:border-white">{button}</button>
        <p className="text-white ">{tag} <span className="underline hover:text-blue-400 cursor-pointer" onClick={()=>{
       router.push(`/${mode.toLocaleLowerCase()}`)
        }}>{mode}</span></p>
        <p className="text-white">Or Continue with <span className="underline cursor-pointer hover:text-[#a855f7]"
        onClick={()=>{
            router.push('/api/auth/signin')
        }}> Google or Github</span></p>
        </>
    )
}

export default InputBox;