import React, { useEffect, useState } from 'react'

const highlights = [
  {
    title: 'Worship Together',
    text: 'Join a welcoming community for prayer, teaching, and worship every week.',
  },
  {
    title: 'Grow In Faith',
    text: 'Discover Bible study groups, youth gatherings, and opportunities to serve.',
  },
  {
    title: 'Care For Others',
    text: 'Support local outreach programs that bring hope and help to the neighborhood.',
  },
]

const ministries = [
  {
    title: 'Children',
    text: 'Safe, joyful learning spaces for kids to grow in faith and friendship.',
  },
  {
    title: 'Youth',
    text: 'Gatherings that blend worship, mentoring, and honest conversations for teens.',
  },
  {
    title: 'Families',
    text: 'Practical support, prayer, and shared life for parents and households.',
  },
  {
    title: 'Outreach',
    text: 'Service projects, food support, and neighborhood care that meets real needs.',
  },
]

const events = [
  { day: 'Sun', title: 'Morning Worship', time: '10:00 AM' },
  { day: 'Wed', title: 'Bible Study', time: '7:00 PM' },
  { day: 'Fri', title: 'Youth Fellowship', time: '6:00 PM' },
]

const promises = [
  'Warm welcome for first-time visitors',
  'Prayer support and pastoral care',
  'Bible-centered teaching and worship',
]

export default function App() {
  const [members, setMembers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    async function loadMembers() {
      try {
        const response = await fetch('/api/members')

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()

        if (isMounted) {
          setMembers(Array.isArray(data) ? data : [])
          setStatus('success')
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error')
        }
      }
    }

    loadMembers()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="page-shell">
      <header className="hero">
        <nav className="topbar">
          <div className="brand">
            <span className="brand-mark">C</span>
            <span>Church Community</span>
          </div>
          <div className="topbar-links">
            <a href="#about">About</a>
            <a href="#ministries">Ministries</a>
            <a href="#members">Members</a>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Welcome Home</p>
            <h1>A church website that feels like a real front page, not just a database list.</h1>
            <p className="hero-text">
              We gather to worship, grow in faith, and serve our community with compassion.
              Explore ministries, connect with people, and see who is part of the church family.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#members">View Members</a>
              <a className="button button-secondary" href="#about">Learn More</a>
            </div>
          </div>

          <div className="hero-card">
            <p className="card-label">This Week</p>
            <h2>Sunday Worship</h2>
            <p>9:00 AM Prayer Gathering</p>
            <p>10:00 AM Main Service</p>
            <p>6:00 PM Youth Fellowship</p>
          </div>
        </div>
      </header>

      <main>
        <section className="section" id="about">
          <div className="section-heading">
            <p className="eyebrow">About Us</p>
            <h2>Built to welcome visitors and support your church community.</h2>
          </div>

          <div className="feature-grid">
            {highlights.map((item) => (
              <article className="feature-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-split">
          <div className="section-heading">
            <p className="eyebrow">What To Expect</p>
            <h2>A simple, clear front page your visitors can actually use.</h2>
          </div>

          <div className="split-layout">
            <div className="info-panel">
              <h3>New here?</h3>
              <p>
                This homepage now gives your site structure beyond the members list, with clear
                sections for welcome messaging, ministries, weekly events, and community info.
              </p>
              <ul className="promise-list">
                {promises.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="schedule-panel">
              <p className="card-label">Weekly Rhythm</p>
              {events.map((event) => (
                <div className="schedule-row" key={event.title}>
                  <strong>{event.day}</strong>
                  <span>{event.title}</span>
                  <time>{event.time}</time>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-contrast" id="ministries">
          <div className="section-heading">
            <p className="eyebrow">Ministries</p>
            <h2>Ways people can connect, learn, and serve.</h2>
          </div>

          <div className="ministry-list">
            {ministries.map((ministry) => (
              <div className="ministry-item" key={ministry.title}>
                <h3>{ministry.title}</h3>
                <p>{ministry.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="members">
          <div className="section-heading">
            <p className="eyebrow">Church Family</p>
            <h2>Members</h2>
          </div>

          {status === 'loading' && <p className="status-message">Loading members...</p>}

          {status === 'error' && (
            <p className="status-message">
              The page layout is working, but the members list could not be loaded right now.
            </p>
          )}

          {status === 'success' && members.length === 0 && (
            <p className="status-message">No members were returned from the database yet.</p>
          )}

          {members.length > 0 && (
            <div className="member-grid">
              {members.map((member) => (
                <article className="member-card" key={member.id}>
                  <div className="member-avatar">
                    {(member.name || '?').trim().charAt(0).toUpperCase()}
                  </div>
                  <h3>{member.name}</h3>
                  <p>Community Member</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="section contact-strip">
          <div>
            <p className="eyebrow">Plan A Visit</p>
            <h2>Ready to turn this into your real church website?</h2>
          </div>
          <div className="contact-copy">
            <p>
              The layout is in place. You can now swap in your church name, address, ministry
              descriptions, service times, and photos without changing the structure again.
            </p>
            <a className="button button-primary" href="#about">Update Content Next</a>
          </div>
        </section>
      </main>
    </div>
  )
}
