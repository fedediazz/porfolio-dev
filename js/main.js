/* SCROLL-ACTIVE + ANIMACIÓN */
<script>
  // Espera a que el DOM esté completamente cargado
  document.addEventListener("DOMContentLoaded", () => {
    // Selecciona todas las secciones que tienen un ID (para detectar el scroll)
    const sections = document.querySelectorAll("section[id]");
    // Selecciona todos los enlaces del navbar
    const navLinks = document.querySelectorAll(".nav-links a");

    // Crea un IntersectionObserver para observar qué sección está visible en el viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Si la sección está al menos parcialmente visible
          if (entry.isIntersecting) {
            // Recorre los enlaces del navbar
            navLinks.forEach((link) => {
              // Si el data-label del link coincide con el ID de la sección visible, se activa
              if (link.dataset.label === entry.target.id) {
                link.classList.add("active");
              } else {
                link.classList.remove("active");
              }
            });
          }
        });
      },
      {
        threshold: 0.3, // Cuando el 30% de la sección está visible se activa
      }
    );

    // Inicia la observación de cada sección
    sections.forEach((section) => observer.observe(section));

    // Maneja el caso cuando el usuario cambia de pestaña (oculta/activa)
    document.onvisibilitychange = () => {
      if (document.visibilityState === "hidden") {
        // Deja de observar si la pestaña está oculta (mejora el rendimiento)
        observer.disconnect();
      } else {
        // Vuelve a observar las secciones al volver a la pestaña
        sections.forEach((section) => observer.observe(section));
      }
    };
  });
</script>
