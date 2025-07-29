import { Heart } from 'lucide-react';

export default function WishlistButton({ mobile = false }: { mobile?: boolean }) {
  return (
    <button className={`relative flex items-center gap-2 text-white ${mobile ?  'w-full' : ''}`}>
      <Heart className="w-5 h-5" />
      {mobile && <span className="text-sm">Wishlist</span>}
    </button>
  );
}