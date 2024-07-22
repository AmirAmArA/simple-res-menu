import Logo from "../components/Logo";
import Starters from "@/components/ui/Starters";
import Side from "@/components/ui/Side";
import Drinks from "@/components/ui/Drinks";
import Main from "@/components/ui/Main";

function Home() {
  // addMeal("tiger roll", [
  //   "جزر",
  //   "خيار",
  //   "افوكادو",
  //   "جبنة صفرا",
  //   "قريدس",
  //   "بطاطا حلوة",
  // ]);

  // fetchAndExpandMeals();
  return (
    <div>
      {/* Header */}
      <div className="flex justify-center items-center bg-green-500  py-6 ">
        {/* <h1 className="text-4xl font-bold text-white">El Restaurante</h1> */}
        <Logo />
      </div>

      {/* Banner */}
      <div className="flex justify-center items-center bg-blue-500 bg-opacity-50 h-[20vh] text-center py-4">
        <h3 className="text-2xl font-semibold text-white">Banners</h3>
      </div>

      {/* Menu */}
      <Starters />

      {/* Main */}
      <Main />

      {/* Side */}
      <Side />

      {/* drinks */}
      <Drinks />
    </div>
  );
}

export default Home;
