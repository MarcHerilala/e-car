"use server"
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import Link from "next/link";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { NewApointmentForm } from "@/components/newAppointmentForm";
import { fetchCarById } from "@/utils/carHelper";

type Car = {
    id: string,
    model: string,
    price: number,
    motorType: string,
    power: number,
    color: string,
    placeNumber: number,
    description: string,
    pics: string[]
}

type CarPageProps = {
  params: {
    id: string;
  };
};

const page = async ({params}: CarPageProps) => {
  const car: Car = await fetchCarById(params.id) || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Nav />
      <main className="container mx-auto px-4 py-12">
        <nav className="flex items-center space-x-3 text-sm mb-12">
          <Link 
            href="/" 
            className="text-gray-600 hover:text-primary transition-colors duration-200"
          >
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link 
            href="/cars" 
            className="text-gray-600 hover:text-primary transition-colors duration-200"
          >
            Cars
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-primary font-medium">{car.model}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <Carousel className="w-full">
                <CarouselContent>
                  {car.pics?.map((pic, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img 
                          src={pic} 
                          alt={`${car.model} - View ${index + 1}`}
                          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-3 h-12 w-12 opacity-70 hover:opacity-100 transition-opacity" />
                <CarouselNext className="-right-3 h-12 w-12 opacity-70 hover:opacity-100 transition-opacity" />
              </Carousel>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-10 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{car.model}</h1>
                  <p className="text-lg text-primary font-semibold">
                    Starting from ${car.price?.toLocaleString()}
                  </p>
                </div>
                <div className="px-6 py-3 bg-primary/10 rounded-full">
                  <span className="text-primary font-semibold">
                    Available Now
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="p-6 bg-gray-50 rounded-2xl text-center hover:bg-gray-100 transition-colors duration-200">
                  <div className="text-3xl font-bold text-primary mb-2">{car.power}</div>
                  <div className="text-sm text-gray-600">Horsepower</div>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl text-center hover:bg-gray-100 transition-colors duration-200">
                  <div className="text-3xl font-bold text-primary mb-2">{car.motorType}</div>
                  <div className="text-sm text-gray-600">Engine Type</div>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl text-center hover:bg-gray-100 transition-colors duration-200">
                  <div className="text-3xl font-bold text-primary mb-2">{car.placeNumber}</div>
                  <div className="text-sm text-gray-600">Seats</div>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl text-center hover:bg-gray-100 transition-colors duration-200">
                  <div className="text-3xl font-bold text-primary mb-2">{car.color}</div>
                  <div className="text-sm text-gray-600">Color</div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {car.description}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Schedule Test Drive</h2>
                  <p className="text-gray-600 mt-2">Experience the power and luxury firsthand</p>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full text-lg py-6 bg-primary hover:bg-primary/90 transition-colors duration-200" 
                      size="lg"
                    >
                      Book Your Test Drive
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Schedule Your Test Drive</DialogTitle>
                      <DialogDescription>
                        Experience the {car.model} firsthand. Fill out the form below to schedule your test drive.
                      </DialogDescription>
                    </DialogHeader>
                    <NewApointmentForm idCar={car.id} />
                  </DialogContent>
                </Dialog>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <p className="text-gray-700">Free cancellation</p>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <p className="text-gray-700">Expert consultation included</p>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <p className="text-gray-700">No purchase obligation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default page;