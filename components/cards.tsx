import { get } from "@/utils/apiUtils";
import { urlBase } from "@/utils/urlBase";
import { Car } from "@/components/carCard";
import { getCars } from "@/utils/carHelper";

interface CardProps {
  searchQuery: string;
}
type Car = {
  id:string,
  model: string,
  price: number,
  motorType: string,
  power: number,
  description:string,
  pics: string[]
  
}

const Cards = async ({ searchQuery }: CardProps) => {
const cars:Car[]=await getCars()
  

  return (
    <>
      <section className="container mx-auto w-full py-4">
        {/* Affichage de l'état de chargement */}
        {
         (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cars.length === 0 ? (
              <div className="text-center text-2xl">No cars found</div>
            ) : (
              cars.map((car, index) => (
                <Car
                  id={car.id}
                  model={car.model}
                  price={car.price}
                  motorType={car.motorType}
                  power={car.power}
                  pics={car.pics}
                  key={index}
                  description={car.description}
                />
              ))
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Cards;
