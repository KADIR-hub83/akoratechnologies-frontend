"use client";

import Footer, { PageRevealWrapper } from "../../components/Footer";
import TechStackSlider from "../../components/TechSlider";
import ProcessSection from "./components/ProcessSection";
import AboutSection from "./home-page/fifth-sec/page";
import FirstSection from "./home-page/first-sec/page";
import RoboticsDroneSection from "./home-page/fouth-sec/page";
import ShowcaseSection from "./home-page/second-sec/page";
import MobileAppSection from "./home-page/third-sec/page";



export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <main className="relative z-20 bg-white ">
        <PageRevealWrapper>
         <FirstSection/>
         <TechStackSlider/>
    
         <ShowcaseSection/>
              <ProcessSection/>
              <MobileAppSection/>
              <RoboticsDroneSection/>
              <AboutSection/>
              </PageRevealWrapper>
            
      </main>
        <Footer/>
     
    </div>
  );
}
