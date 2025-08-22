
import StarryComponent from "@/components/ui/StarryComponent";
import SignIn from "@/components/signIn";

export default function LoginPage() {
 
  return (
    <div className="w-full min-h-screen">
          <canvas id="stars" className="fixed inset-0 z-[-1]"></canvas>
              <StarryComponent />
              <SignIn />
   </div>
   
  );
}

