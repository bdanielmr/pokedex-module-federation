import React, { useState, useEffect, useRef } from "react";
import TypeSection from "./TypeSection";
import { PlaceholderCard } from "../styles/homeStyles";

export default function LazyTypeSection({ typeName, onOpenPokemon }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.01,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? (
        <TypeSection typeName={typeName} onOpenPokemon={onOpenPokemon} />
      ) : (
        <PlaceholderCard>Cargando {typeName}...</PlaceholderCard>
      )}
    </div>
  );
}
