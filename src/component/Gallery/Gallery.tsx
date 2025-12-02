import {
  Gallery2,
  Gallery3,
  Gallery5,
  Gallery6,
  Gallery8,
  GalleryL1,
  GalleryL2,
  GalleryL3,
} from "../../assets/gallery";

import { Coffe3, Coffe7 } from "../../assets/coffe";

export default function GallerySection() {
  return (
    <section id="gallery" className="p-12">
      <div className="font-mono grid grid-cols-2 gap-2 md:grid-cols-4 ">
        <div
          className=" text-xl font-semibold text-slate-900 
              col-start-1 row-start-1 flex md:col-start-1 md:row-start-1"
        >
          <h2 className="self-start md:self-center font-bold text-5xl">
            Our <br />
            Gallery
          </h2>
        </div>
        <div
          className=" text-xl font-semibold text-slate-900 
              flex md:col-start-2 md:row-start-2"
        >
          <h2 className="self-start md:self-center font-bold text-2xl">
            “Your cozy corner.”
          </h2>
        </div>
        <div
          className=" text-xl font-semibold text-slate-900 
              flex md:col-start-4 md:row-start-3 "
        >
          <h2 className="self-center font-bold text-2xl">
            “Gather, laugh, enjoy.”
          </h2>
        </div>
        <div
          className=" text-xl font-semibold text-slate-900 
              flex md:col-start-1 md:row-start-4"
        >
          <h2 className=" self-end font-bold text-2xl">
            “Life begins after coffee.”
          </h2>
        </div>
        <div
          className=" shadow-lg aspect-4/3 rounded-md col-start-2 row-start-1
              md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-2 md:row-start-1"
        >
          <img
            src={GalleryL3}
            alt="GalleryL3"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="  shadow-lg aspect-4/3 rounded-md col-start-1 row-start-2
              md:aspect-3/4 xl:aspect-4/3 overflow-hidden md:col-start-3 md:row-start-1"
        >
          <img
            src={Gallery2}
            alt="Gallery2"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="  shadow-lg aspect-4/3 rounded-md col-start-2 row-start-3
              md:aspect-3/4 xl:aspect-4/3 overflow-hidden md:col-start-4 md:row-start-4"
        >
          <img
            src={Gallery3}
            alt="Gallery3"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="  shadow-lg aspect-4/3 rounded-md hidden md:flex
              md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-1 md:row-start-2"
        >
          <img
            src={Coffe7}
            alt="Coffe7"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="  shadow-lg aspect-4/3 rounded-md hidden md:flex
              md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-3 md:row-start-2"
        >
          <img
            src={Gallery5}
            alt="Gallery5"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="  shadow-lg aspect-4/3 rounded-md hidden md:flex
              md:aspect-3/4 xl:aspect-4/3   overflow-hidden md:col-start-4 md:row-start-2"
        >
          <img
            src={Gallery6}
            alt="Gallery6"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="  shadow-lg aspect-4/3 rounded-md col-start-1 row-start-4
              md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-1 md:row-start-3"
        >
          <img
            src={Gallery8}
            alt="Gallery8"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="  shadow-lg aspect-4/3 rounded-md 
              md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-2 md:row-start-3"
        >
          <img
            src={GalleryL1}
            alt="GalleryL1"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="  shadow-lg aspect-4/3 rounded-md 
              md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-2 md:row-start-4"
        >
          <img
            src={Coffe3}
            alt="Coffe3"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="  shadow-lg aspect-4/3 rounded-md hidden md:flex
              md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-3 md:row-start-4"
        >
          <img
            src={GalleryL2}
            alt="GalleryL2"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
