import SearchBar from "@/components/SearchBar";
import CartButton from "@/components/CartButton";

export default function Home() {
  const handleSearch = (query: string) => {

  };

  return (
    <div className="flex pt-10 absolute w-screen">

      <SearchBar />

      <h1 className="text-4xl font-bold whitespace-nowrap text-center flex-1">
        Pasha Jewellery
      </h1>

      <div className="flex-1 flex justify-end mr-10">
        <CartButton count={3} />
      </div>
    </div>
  );
}
