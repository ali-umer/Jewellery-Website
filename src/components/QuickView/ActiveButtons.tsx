type ActionButtonsProps = {
  handleCart: () => void;
  ViewDetails?: boolean;
};

export default function ActionButtons({ handleCart, ViewDetails = true }: ActionButtonsProps){
  return (
    <div className="space-y-2">
        <button className="w-full hover:bg-[var(--gold)] hover:text-black text-[var(--gold)] py-2 rounded-2xl border-[var(--gold)] border-1"
             onClick={()=>handleCart()}>
            Add to cart
        </button>
        {ViewDetails && 
          <button className="text-sm text-[var(--gold)] underline mt-2 w-full text-left">
              View details &rarr;
          </button>  }
    </div>
  );
}