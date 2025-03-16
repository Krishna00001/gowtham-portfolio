"use client"; // Mark as client component (required for App Router if using hooks)

import { useEffect, useState } from "react";
import Image from "next/image";
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This runs only in the browser, setting isClient to true
    setIsClient(true);
  }, []);

  // Render components only when document is available (client-side)
  if (!isClient) {
    return null; // Or a loading placeholder: <div>Loading...</div>
  }

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <ContactSection />
    </div>
  );
}
