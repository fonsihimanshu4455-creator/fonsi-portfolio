import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Trusted from "@/components/Trusted";
import Services from "@/components/Services";
import Work from "@/components/Work";
import MoreWork from "@/components/MoreWork";
import WebsiteFeatures from "@/components/WebsiteFeatures";
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
  getWebsiteFeatures,
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
    websiteFeatures,
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
    getWebsiteFeatures(),
    getJourneySteps(),
    getAchievements(),
    getSkills(),
    getTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Nav settings={settings} />
      <main>
        <Hero data={hero} />
        <Stats data={stats} />
        <Trusted />
        <Services data={services} />
        <Work data={projects} />
        <MoreWork data={futureProjects} />
        <WebsiteFeatures data={websiteFeatures} />
        <Process
          data={journey}
          characterUrl={settings.process_character_url}
          characterSettings={settings.character_settings?.process}
        />
        <Achievements
          headline={achievements.headline}
          wins={achievements.wins}
          characterUrl={settings.achievements_character_url}
          characterSettings={settings.character_settings?.achievements}
        />
        <Skills
          data={skills}
          characterUrl={settings.skills_character_url}
          characterSettings={settings.character_settings?.skills}
        />
        <Testimonials data={testimonials} />
        <Faq />
        <CtaBanner settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
