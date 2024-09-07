
import Image from 'next/image';
import Link from 'next/link';
import {revalidatePath} from 'next/cache'

//This is a SSR Component 
export default async function Registration() {

  //This is done on server-side logic after performing mutations
  // to ensure that stale data is not served from the cache.
  revalidatePath('/registration'); 


  return (
    <div className="bg-teal-custom min-h-screen flex flex-col justify-center items-center p-4 text-center">
       <Image
        src="/stethescope.png"
        width={400} // Adjust width for better mobile visibility
        height={400} // Adjust height for better mobile visibility
        className="mb-20" // Adjust margin-bottom if needed
        alt="Stethoscope"
      />
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-4 mt-[-2rem]">Doctor's Helpline</h1>
      <p className="text-white font-normal mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.
      </p>


      
      <div className="flex flex-col gap-2 mt-20">
      <Link 
      className="bg-white text-teal-custom w-[20rem]  py-3 rounded-[40px] text-lg font-semibold text-center" 
      href="/registration/"
      >
            Next
        </Link>
        <Link 
        className="bg-transparent text-white border border-white w-[20rem] py-3 mt-2 rounded-[40px] text-lg font-semibold text-center" 
        href="/registration/signin">
            Skip
        </Link>
      </div>

    </div>
  );
}
