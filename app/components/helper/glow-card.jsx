"use client";

import { useEffect, useState } from "react";

const GlowCard = ({ children, identifier }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Only run this effect on the client side
    if (typeof window === "undefined") return;

    const container = document.querySelector(`.glow-container-${identifier}`);
    const cards = document.querySelectorAll(`.glow-card-${identifier}`);

    const config = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    const updateGlowEffect = (event) => {
      cards.forEach((card) => {
        const bounds = card.getBoundingClientRect();
        const isActive =
          event?.x > bounds.left - config.proximity &&
          event?.x < bounds.right + config.proximity &&
          event?.y > bounds.top - config.proximity &&
          event?.y < bounds.bottom + config.proximity;

        card.style.setProperty("--active", isActive ? 1 : config.opacity);

        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        let angle =
          (Math.atan2(event?.y - centerY, event?.x - centerX) * 180) / Math.PI;
        angle = angle < 0 ? angle + 360 : angle;

        card.style.setProperty("--start", angle + 90);
      });
    };

    document.body.addEventListener("pointermove", updateGlowEffect);

    if (container) {
      container.style.setProperty("--gap", config.gap);
      container.style.setProperty("--blur", config.blur);
      container.style.setProperty("--spread", config.spread);
      container.style.setProperty(
        "--direction",
        config.vertical ? "column" : "row"
      );
    }

    updateGlowEffect();

    return () => {
      document.body.removeEventListener("pointermove", updateGlowEffect);
    };
  }, [identifier, isMounted]);

  return (
    <div className={`glow-container-${identifier} glow-container`}>
      <article
        className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}
      >
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;
