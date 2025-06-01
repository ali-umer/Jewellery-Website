import SearchBar from "@/components/SearchBar"
import CartButton from "@/components/CartButton"
import Wishlist from "@/components/Wishlist"
export default function TopBar() {
    const handleSearch = (query: string) => {

    };

    return (
        <div className="flex pt-7 pb-7 w-screen bg-[#121212] border-b-1" style={{ borderColor: 'var(--gold)' }}>
            <SearchBar />

            <div className="flex-1 text-center pt-1">
                <h1 className="text-4xl tracking-widest font-semibold text-[var(--gold)] uppercase font-serif">
                    Pasha <span className="text-white">Jewellery</span>
                </h1>
            </div>

            <div className="flex-1 flex justify-end mr-10">
                <Wishlist />
                <CartButton count={3} />
            </div>
        </div>

    );
}