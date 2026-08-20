const form = document.querySelector('#report');
const status = document.querySelector('#status');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) { form.reportValidity(); return; }
  const data = Object.fromEntries(new FormData(form).entries());
  const labels = {
    name: 'Name der verletzten Person', date: 'Datum', time: 'Uhrzeit', location: 'Unfallort',
    incident: 'Unfallhergang', injury: 'Art und Umfang der Verletzung', firstAid: 'Erste-Hilfe-Maßnahmen',
    firstAider: 'Name Ersthelfer/in', doctor: 'Arzt / Krankenhaus', witnesses: 'Zeugen'
  };
  const body = Object.entries(labels)
    .map(([key, label]) => `${label}:\n${data[key] || '–'}`)
    .join('\n\n');
  const subject = `Unfallmeldung: ${data.name} – ${data.date}`;
  const mailto = `mailto:carsten.trelle@manzl-heizung.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = 'Die E-Mail-App wird geöffnet. Bitte dort noch auf „Senden“ tippen.';
  status.className = 'success';
  window.location.href = mailto;
});
