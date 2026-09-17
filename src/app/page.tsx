import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { Marquee } from "@/components/marketing/marquee";
import { About } from "@/components/marketing/about";
import { Services } from "@/components/marketing/services";
import { Packages } from "@/components/marketing/packages";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Testimonials } from "@/components/marketing/testimonials";
import { FitnessExperience } from "@/components/marketing/fitness-experience";
import { Faq } from "@/components/marketing/faq";
import { Contact } from "@/components/marketing/contact";
import { Footer } from "@/components/marketing/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Packages />
        <HowItWorks />
        <Testimonials />
        <FitnessExperience />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
