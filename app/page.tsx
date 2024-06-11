import SwiperComp from "@/components/SwiperComp";

export default function Home() {
  return (
    <div>
      {/* Header */}
      <div className="bg-green-400 text-center py-6">
        <h1 className="text-4xl font-bold text-white">El Restaurante</h1>
      </div>

      {/* Banner */}

      <div className="flex justify-center items-center bg-blue-500 bg-opacity-50 h-[20vh] text-center py-4">
        <h3 className="text-2xl font-semibold text-white">Banners</h3>
      </div>


      {/* Menu */}

      <div className="bg-gray-100 py-4  bg-opacity-5 shadow-md">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-white-800">Starters</h2>
        </div>
        <div>
          <SwiperComp />
        </div>
      </div>

      {/* Main */}

      <div className="bg-gray-100 py-4 bg-opacity-5 shadow-md">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-white-800">Main</h2>
        </div>
        <div>
          <SwiperComp />
        </div>
      </div>

      {/* drinks */}

      <div className="bg-gray-100 py-4 bg-opacity-5 shadow-md">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-white-800">Drinks</h2>
        </div>
        <div>
          <SwiperComp />
        </div>
      </div>
    </div>


  );
}
