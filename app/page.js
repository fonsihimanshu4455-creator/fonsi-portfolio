import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Trusted from "@/components/Trusted";
import Services from "@/components/Services";
import Work from "@/components/Work";
import MoreWork from "@/components/MoreWork";
import Process from "@/components/Process";
import Achievements from "@/components/Achievements";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Trusted />
        <Services />
        <Work />
        <MoreWork />
        <Process />
        <Achievements />
        <Skills />
        <Testimonials />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
