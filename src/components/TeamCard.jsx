export default function TeamCard({ Name, Description, Teams_Photo }) {
  return (
    <div
      className="card h-[400px] w-[300px] rounded-md p-0 text-white transition-transform duration-500 ease-in-out hover:scale-105"
      style={{ backgroundImage: `url(${Teams_Photo})` }}
    >
      <div
        className="card-content relative top-[60%] h-[40%] w-full 
      rounded-md bg-gradient-to-t from-black/100 via-black/60 to-black/0 p-2"
      >
        <h2 className="card-title text-2xl font-extrabold">{Name}</h2>
        <hr className=" relative right-2 scale-0 border-t-4 border-t-fuchsia-400 transition-transform duration-500 ease-in-out hover:scale-100" />
        <p className="card-body mt-1">{Description}</p>
        <a
          href="#"
          className="card-btn-team relative top-1 inline-block cursor-pointer rounded-sm bg-fuchsia-200 p-1 pl-2 pr-2 font-bold
         text-black no-underline hover:bg-white focus:bg-white"
        >
          Learn more
        </a>
      </div>
    </div>
  );
}
