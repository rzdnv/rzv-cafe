import { Button } from "../../../components/ui/button";
import { Star, ChevronRight } from "lucide-react";
import { CoffeLogo } from "../../../assets/logo";

export default function Hero() {
  return (
    <section id="home" className=" p-12">
      <div className="flex flex-col gap-8 max-w-full  md:px-14 rounded-3xl ">
        <div className="flex flex-col gap-4 md:flex-row ">
          {/* Left */}
          <div className="flex flex-1 w-full  justify-center">
            <img src={CoffeLogo} className="aspect-square w-3/4 object-cover" />
          </div>
          <div className="flex-1 flex flex-col gap-4 w-full   justify-center ">
            <h1 className="text-6xl font-bold">
              Good Coffee. <br /> Good Mood.
            </h1>
            <p className="font-medium italic">
              "Sit back, sip your coffee, and enjoy a cozy moment that feels
              just right."
            </p>
            <Button
              size="lg"
              className="w-1/4 bg-aqua-deep-900 hover:bg-aqua-deep-600"
            >
              Order Now
            </Button>
          </div>
          {/* Right */}
        </div>
        <div className="flex justify-center md:justify-between p-4 md:p-2 md:mx-10  bg-gray-200  items-center rounded-full">
          <div className="flex gap-1 ml-2">
            <Star color="#1E293B" fill="#1E293B" />
            <Star color="#1E293B" fill="#1E293B" />
            <Star color="#1E293B" fill="#1E293B" />
            <Star color="#1E293B" fill="#1E293B" />
            <Star color="#1E293B" />
            <h2>
              Trusted by <span className="font-semibold">1000+</span> happy
              customers
            </h2>
          </div>
          <div className="gap-2 items-center hidden md:flex">
            <h2 className="font-medium">
              add your rating and be part of the community!
            </h2>
            <Button
              size={"icon-xl"}
              className="rounded-full p-4 bg-aqua-deep-900 hover:bg-aqua-deep-600"
            >
              <ChevronRight color="white" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
