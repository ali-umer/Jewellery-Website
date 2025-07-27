import {Star} from "lucide-react" ;

export default function ReviewCard({ name, rating, text }:{name:string, rating:number, text:string})
{
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <div className="flex text-yellow-400 mb-3">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
        ))}
      </div>
      <p className="text-gray-600 text-sm">
        {text.split(" ").slice(0, 60).join(" ")}{/* trims to 60 words */}
      </p>
    </div>
  );
};