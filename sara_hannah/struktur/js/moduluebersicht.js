
  window.addEventListener('load', () => {
    const modules = Array.from(document.querySelectorAll('.module-box'));
    const activeLine = document.getElementById('activeLine');
    const scrollWrapper = document.getElementById('scrollWrapper');
    const scrollContent = document.getElementById('scrollContent');

    // Lade letztes abgeschlossenes Modul aus localStorage (Zahl 1-12)
    let lastCompleted = parseInt(localStorage.getItem('lastCompletedModule'));
    if (isNaN(lastCompleted) || lastCompleted < 0 || lastCompleted >= modules.length) {
    lastCompleted = 0; // Standard auf Modul 1 aktiv
    }


    // Bestimme das nächste Modul, das aktiv sein soll
    let nextModuleIndex = lastCompleted + 1;

    if(nextModuleIndex > modules.length) {
      nextModuleIndex = modules.length; // wenn alles fertig
    }

    // Klassen setzen & Links vergeben
    modules.forEach(mod => {
      const idx = parseInt(mod.dataset.modulindex);

      if(idx <= lastCompleted) {
        // Fertige Module blau, nicht klickbar
        mod.classList.add('finished');
        mod.classList.remove('active');
        mod.classList.remove('disabled');
        mod.style.pointerEvents = 'none';
      }
      else if(idx === nextModuleIndex) {
        // Aktives Modul orange, klickbar
        mod.classList.add('active');
        mod.classList.remove('finished');
        mod.classList.remove('disabled');
        mod.style.pointerEvents = 'auto';
        mod.title = `Modul ${idx} starten`;

        // Klick öffnet Modulordner, z.B. modul1/inhalt1.html, modul2/index.html usw.
        mod.addEventListener('click', () => {
        window.location.href = `modul${idx}/inhalt1.html`;
        });


      }
      else {
        // Noch nicht freigegebene Module grau, nicht klickbar
        mod.classList.add('disabled');
        mod.classList.remove('active');
        mod.classList.remove('finished');
        mod.style.pointerEvents = 'none';
      }
    });

    // Linie von Modul 1 bis aktives Modul animieren
    const scrollContentRect = scrollContent.getBoundingClientRect();
    const firstMod = modules[0].getBoundingClientRect();
    const firstCenter = firstMod.left - scrollContentRect.left + firstMod.width / 2;

    const activeMod = modules.find(m => m.classList.contains('active'));
    if(!activeMod) return;

    const activeRect = activeMod.getBoundingClientRect();
    const activeCenter = activeRect.left - scrollContentRect.left + activeRect.width / 2;

    activeLine.style.width = '0px';

    let startTime = null;
    const duration = 1000;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentWidth = firstCenter + (activeCenter - firstCenter) * progress;
      activeLine.style.width = currentWidth + 'px';

      if(progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Nach Animation zum aktiven Modul scrollen
        const wrapperRect = scrollWrapper.getBoundingClientRect();
        const activeCenterViewport = activeRect.left + activeRect.width / 2;
        const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;
        const scrollDiff = activeCenterViewport - wrapperCenter;
        scrollWrapper.scrollLeft += scrollDiff;
      }
    }
    requestAnimationFrame(animate);
  });
