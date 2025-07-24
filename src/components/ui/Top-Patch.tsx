
export default function YellowPatch({Display}) {
  return (
    <div className="absolute top-22.5 left-0 w-[300px] h-[280px] bg-[var(--gold)] rounded-br-[300px] z-10 p-6 shadow-md">
      <div className="text-black text-[clamp(3rem,6vw,4.5rem)] pt-14 pl-6  pr-2 items-center">
        <h1 className="text-3xl font-bold">{Display}</h1>
      
      </div>
    </div>
  );
}