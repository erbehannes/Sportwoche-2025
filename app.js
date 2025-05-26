const events = {
  "Dienstag, 15.07.2025": [
    { time: "19:00", title: "Herrenspiele höhere Klassen" },
    { time: "20:15", title: "Finale" }
  ],
  "Mittwoch, 16.07.2025": [
    { time: "15:00–17:00", title: "Spiel- und Sportnachmittag (Grundschule 1–4)" },
    { time: "19:30", title: "SV Langen I – BW Papenburg I" }
  ],
  "Donnerstag, 17.07.2025": [
    { time: "15:30–17:30", title: "Sportnachmittag bis 6 Jahre" },
    { time: "18:30", title: "SV Langen II Turnier" },
    { time: "19:30", title: "Damenspiel" },
    { time: "20:15", title: "Finale Herrenturnier" }
  ],
  "Freitag, 18.07.2025": [
    { time: "16:00", title: "Mini-Kicker Turnier" },
    { time: "17:00", title: "Sportmania" },
    { time: "18:00", title: "Alte Herren Turnier" },
    { time: "20:00", title: "Aufstiegsmannschaftsspiel 2015" },
    { time: "21:00", title: "Große Tagestombola" }
  ],
  "Samstag, 19.07.2025": [
    { time: "10:00", title: "TTVN-Race Tischtennis" },
    { time: "10:00", title: "LK-Tennisturnier" },
    { time: "14:30", title: "Langen läuft Rund" }
  ],
  "Sonntag, 20.07.2025": [
    { time: "10:30", title: "Familienmesse" },
    { time: "14:30", title: "Dorfpokalturnier" },
    { time: "15:00", title: "Kinderolympiade + Kaffee & Kuchen" },
    { time: "17:00", title: "Große Tombola" }
  ]
};

function formatTime(ts) {
  const d = new Date(ts);
  return `${d.toLocaleDateString('de-DE')} – ${d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`;
}

function renderPlan() {
  const container = document.getElementById('week-plan');
  container.innerHTML = '';

  Object.entries(events).forEach(([day, list]) => {
    const dayCard = document.createElement('div');
    dayCard.className = 'day-card';

    const dayHeader = document.createElement('div');
    dayHeader.className = 'day-header';
    dayHeader.textContent = day;
    dayCard.appendChild(dayHeader);

    list.forEach((item, i) => {
      const key = `${day}-${i}`;
      const store = JSON.parse(localStorage.getItem(key)) || { person: "", notes: [] };

      const eventEl = document.createElement('div');
      eventEl.className = 'event';

      const title = document.createElement('div');
      title.className = 'event-title';
      title.textContent = `🕒 ${item.time} – ${item.title}`;

      const grid = document.createElement('div');
      grid.className = 'input-grid';

      const responsible = document.createElement('input');
      responsible.type = 'text';
      responsible.placeholder = 'Verantwortlich';
      responsible.value = store.person || '';

      const note = document.createElement('textarea');
      note.placeholder = 'Neue Notiz';

      const saveBtn = document.createElement('button');
      saveBtn.textContent = '💾';

      const notes = document.createElement('div');
      notes.className = 'notes';
      store.notes.forEach(n => {
        const p = document.createElement('div');
        p.className = 'note-entry';
        p.innerHTML = `<strong>${formatTime(n.timestamp)}:</strong> ${n.text}`;
        notes.appendChild(p);
      });

      saveBtn.onclick = () => {
        const text = note.value.trim();
        if (text) {
          store.notes.push({ text, timestamp: Date.now() });
        }
        store.person = responsible.value;
        localStorage.setItem(key, JSON.stringify(store));
        renderPlan(); // neu laden
      };

      grid.appendChild(responsible);
      grid.appendChild(note);
      grid.appendChild(saveBtn);

      eventEl.appendChild(title);
      eventEl.appendChild(grid);
      eventEl.appendChild(notes);

      dayCard.appendChild(eventEl);
    });

    container.appendChild(dayCard);
  });
}

document.addEventListener('DOMContentLoaded', renderPlan);
