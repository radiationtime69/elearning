let results = []; // globale Zwischenspeicherung

document.querySelectorAll('.scroll-page').forEach((page, index) => {
  const answerButtons = Array.from(page.querySelectorAll('button')).filter(btn =>
    btn.textContent.includes("RICHTIG") || btn.textContent.includes("FALSCH")
  );
  const nextBtn = page.querySelector('.next-button');

  if (!nextBtn || answerButtons.length === 0) return;

  answerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Auswahl visuell markieren
      answerButtons.forEach(b => b.classList.remove('button-active'));
      btn.classList.add('button-active');
      nextBtn.classList.add('visible');

      // Ergebnis speichern
      const isCorrect = btn.dataset.correct === "true";
      results[index] = isCorrect;

      // In localStorage speichern
      localStorage.setItem('quizResults', JSON.stringify(results));
    });
  });
});
