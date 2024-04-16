import { MdOutlineSmsFailed } from "react-icons/md";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className=" min-w-[30%] h-fit border-2 border-zinc-300 rounded-md p-5 flex flex-col items-center gap-2 m-2">
        <h1 className="text-5xl lg:text-9xl font-bold">404</h1>
        <p className="font-semibold mb-20  text-md">Page Not Found</p>
        <Link to="/" className="text-sm">
          <div className="px-3 py-2 bg-black text-white rounded-md font-semibold">
            Go To Home
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Error;
