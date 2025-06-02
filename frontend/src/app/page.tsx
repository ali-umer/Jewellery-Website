import TopBar from "@/components/TopBar"
import Card from "@/components/Card"
export default function Home() {


  return (
    <div className="flex-col">
      <TopBar />
      <div className="flex justify-center gap-10 mt-10">
        <Card />
        <Card />
      </div>
    </div>
  );
}
