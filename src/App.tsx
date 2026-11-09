import { useEffect, useState } from "react";
// @ts-expect-error CSS is handled by the app's bundler.
import "./App.css";

type Announcement = {
  date: string;
  category: string;
  title: string;
  description: string;
  source: string;
  url: string;
};

const announcements: Announcement[] = [
  {
  date: "November 9, 2026",
  category: "Pre-load",
  title: "Digital pre-loading begins November 10",
  description:
    "Digital pre-loading is scheduled for eligible pre-orders on PlayStation 5 and Xbox Series X|S. Rockstar lists up to 212 GB of required storage; the exact amount may vary by platform.",
  source: "Rockstar Newswire",
  url: "https://www.rockstargames.com/newswire/article/k4ak9okk485712/grand-theft-auto-vi-pre-load-begins-on-november-10",
  },
{
  date: "November 9, 2026",
  category: "Release date",
  title: "Grand Theft Auto VI launches November 19",
  description:
    "Grand Theft Auto VI is scheduled to launch on PlayStation 5 and Xbox Series X|S on November 19, 2026.",
  source: "Rockstar Games",
  url: "https://www.rockstargames.com/VI",
},
];

const trailers = [
  {
    title: "Trailer 1",
    date: "December 4, 2023",
    url: "https://www.rockstargames.com/newswire/article/8978kok9385a82/grand-theft-auto-vi-watch-trailer-1-now",
    thumbnail: "https://img.youtube.com/vi/QdBZY2fkU-0/hqdefault.jpg",
  },
  {
    title: "Trailer 2",
    date: "May 6, 2025",
    url: "https://www.rockstargames.com/VI",
    thumbnail: "https://img.youtube.com/vi/VQRLujxTm3c/hqdefault.jpg",
  },
];



function getCountdown(targetDate: string) {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (!Number.isFinite(difference) || difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function App() {
  // Update this date only when you have verified the current official date.
  const releaseDate = "2026-11-19T00:00:00";
  const [countdown, setCountdown] = useState(() =>
    getCountdown(releaseDate),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown(releaseDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [releaseDate]);

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Vice City Watch home">
          <span className="brand-mark">VC</span>
          <span>VICE CITY WATCH</span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#timeline">Timeline</a>
          <a href="#trailers">Videos</a>
          <a href="#about">About</a>
        </nav>

        <a
          className="source-button"
          href="https://www.rockstargames.com/"
          target="_blank"
          rel="noreferrer"
        >
          Official source <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="eyebrow">
            <span className="status-dot" />
            FAN-MADE TRACKER · NOT AFFILIATED WITH ROCKSTAR GAMES
          </p>

          <h1>
            The road to
            <br />
            <span>Vice City.</span>
          </h1>

          <p className="hero-copy">
            A fan-made dashboard for following official announcements,
            trailers, and release information.
          </p>

          <a className="primary-button" href="#timeline">
            Explore the timeline <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="hero-stamp" aria-hidden="true">
          <span>VICE CITY</span>
          <span className="stamp-line" />
          <span>WATCHING THE SIGNAL</span>
        </div>

        <div className="hero-orb orb-one" aria-hidden="true" />
        <div className="hero-orb orb-two" aria-hidden="true" />
      </section>

      <section className="countdown-section" aria-labelledby="countdown-title">
        <div>
          <p className="eyebrow">THE COUNTDOWN</p>
          <h2 id="countdown-title">Until release</h2>
          <p className="muted-copy">
            Countdown uses the release date configured in <code>App.tsx</code>.
            Verify it against an official source.
          </p>
        </div>

        {countdown ? (
          <div className="countdown" aria-label="Time remaining">
            <CountdownUnit value={countdown.days} label="Days" />
            <CountdownUnit value={countdown.hours} label="Hours" />
            <CountdownUnit value={countdown.minutes} label="Minutes" />
            <CountdownUnit value={countdown.seconds} label="Seconds" />
          </div>
        ) : (
          <p className="countdown-note">
            No future release date is configured. Check official sources for
            updates.
          </p>
        )}
      </section>

      <section className="content-section" id="timeline">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE LATEST</p>
            <h2>Announcement timeline</h2>
          </div>
          <span className="section-count">
            {announcements.length.toString().padStart(2, "0")} ENTRIES
          </span>
        </div>

        <div className="timeline">
          {announcements.map((announcement) => (
            <article className="timeline-card" key={announcement.title}>
              <div className="timeline-date">{announcement.date}</div>
              <div className="timeline-marker" aria-hidden="true" />
              <div className="announcement-body">
                <span className="tag">{announcement.category}</span>
                <h3>{announcement.title}</h3>
                <p>{announcement.description}</p>
                <a
                  className="text-link"
                  href={announcement.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {announcement.source} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section trailer-section" id="trailers">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WATCH AGAIN</p>
            <h2>Video archive</h2>
          </div>
          <span className="section-count">OFFICIAL LINKS</span>
        </div>

        <div className="trailer-grid">
          {trailers.map((trailer, index) => (
            <a
              className="trailer-card"
              href={trailer.url}
              target="_blank"
              rel="noreferrer"
              key={trailer.title}
            >
              <div className="trailer-art">
                <span className="play-button" aria-hidden="true">▶</span>
                <span className="trailer-number">{index + 1}</span>
              </div>
              <div className="trailer-info">
                <div>
                  <h3>{trailer.title}</h3>
                  <p>{trailer.date}</p>
                </div>
                <span className="arrow" aria-hidden="true">↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="about-panel" id="about">
        <div className="about-icon" aria-hidden="true">i</div>
        <div>
          <h2>Fan-made, source-first.</h2>
          <p>
            Vice City Watch is an independent fan project. It is not affiliated
            with or endorsed by Rockstar Games. Entries should link to official
            sources, and unverified rumors should not be presented as facts.
          </p>
        </div>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">VC</span>
          <span>VICE CITY WATCH</span>
        </a>
        <span>Independent fan project · Not affiliated with Rockstar Games</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </main>
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-unit">
      <span className="countdown-value">{value.toString().padStart(2, "0")}</span>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

export default App;