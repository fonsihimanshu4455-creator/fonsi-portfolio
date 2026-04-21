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

import {
  getHero,
  getStats,
  getServices,
  getProjects,
  getFutureProjects,
  getJourneySteps,
  getAchievements,
  getSkills,
  getTestimonials,
  getSiteSettings,
} from "@/lib/queries/public";

export const revalidate = 60;

export default async function Page() {
  const [
    hero,
    stats,
    services,
    projects,
    futureProjects,
    journey,
    achievements,
    skills,
    testimonials,
    settings,
  ] = await Promise.all([
    getHero(),
    getStats(),
    getServices(),
    getProjects(),
    getFutureProjects(),
    getJourneySteps(),
    getAchievements(),
    getSkills(),
    getTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Nav />
      <main>
        <Hero data={hero} />
        <Stats data={stats} />
        <Trusted />
        <Services data={services} />
        <Work data={projects} />
        <MoreWork data={futureProjects} />
        <Process data={journey} />
        <Achievements headline={achievements.headline} wins={achievements.wins} />
        <Skills data={skills} />
        <Testimonials data={testimonials} />
        <Faq />
        <CtaBanner settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
