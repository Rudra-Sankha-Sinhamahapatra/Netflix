import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PropsType {
  button: string;
  tag: string;
  mode: string;
}

const InputBox = ({ button, tag, mode }: PropsType) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');


  useEffect(() => {
    if (button === 'Signup') {
      setName(''); // Clear name field on button change
    }
  }, [button]);

  return (
    <>
      <label htmlFor="email" className="text-white">Email</label>
      <input id="email" type="text" placeholder="ryan@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2" />
      <label htmlFor="password" className="text-white">Password</label>
      <input id="password" type="password" placeholder="alex12345#" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2" />

      {button === 'Signup' &&
        <>
          <label htmlFor="name" className="text-white">Name</label>
          <input id="name" type="text" placeholder="ryan" value={name} onChange={(e) => setName(e.target.value)} className="p-2" />
        </>
      }

      <button type="button" className="bg-red-500 text-white py-3 px-1 font-semibold mt-1 hover:bg-black hover:border hover:border-white"
        onClick={()=>{

        }}
      >
        {button}
      </button>

      <p className="text-white">{tag} <span className="underline hover:text-blue-400 cursor-pointer" onClick={() => router.push(`/${mode.toLocaleLowerCase()}`)}>{mode}</span></p>

      <p className="text-white">Or Continue with <span className="underline cursor-pointer hover:text-[#a855f7]" onClick={() => router.push('/api/auth/signin')}>Google or Github</span></p>

      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}

export default InputBox;
