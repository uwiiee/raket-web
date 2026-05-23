import React, { useMemo, useState } from "react";
import {
  Menu,
  Search,
  Bell,
  MessageCircle,
  PlusCircle,
  Home,
  User,
  Briefcase,
  Settings,
  MapPin,
  Send,
  Clock,
  X,
  ChevronRight,
} from "lucide-react";
import "./RaketWebVersion.css";

const posts = [
  {
    id: 1,
    user: "Richie Pelares",
    initials: "R",
    location: "Silay",
    age: "6d ago",
    mode: "Applying",
    status: "Available",
    description: "Gardener",
    skill: "Gardener",
    when: "May 15, 2026, Friday (AM)",
    payLabel: "Rate",
    pay: "₱100",
    action: "Hire",
  },
  {
    id: 2,
    user: "Richie Pelares",
    initials: "R",
    location: "Silay",
    age: "6d ago",
    mode: "Hiring",
    status: "Open",
    description: "Manug gunting",
    skill: "Barber",
    when: "May 14, 2026, Thursday (AM)",
    payLabel: "Pay",
    pay: "₱100",
    notes: "Bring own equipments",
    action: "Apply",
  },
  {
    id: 3,
    user: "Vince Barruga",
    initials: "V",
    location: "Silay City",
    age: "6d ago",
    mode: "Hiring",
    status: "Open",
    description: "Computer expert",
    skill: "I.T.",
    when: "May 14, 2026, Thursday (AM)",
    payLabel: "Pay",
    pay: "₱160",
    notes: "with free Puto if late",
    action: "Apply",
  },
];

const recentSearches = ["Barber", "Welder", "Vince", "Abnoy", "cooking", "Tubero"];
const trends = ["barber", "vince", "welder", "tubero"];

function Sidebar({ activePage, setActivePage }) {
  const items = [
    [Home, "Home"],
    [Search, "Search"],
    [MessageCircle, "Messages"],
    [User, "My Profile"],
    [Briefcase, "My Jobs"],
    [Bell, "Notifications"],
    [Settings, "Settings"],
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="brandRow">
          <Menu size={28} />
          <h1>Rakèt</h1>
        </div>

        <nav className="sideNav">
          {items.map(([Icon, label]) => (
            <button
              key={label}
              onClick={() => setActivePage(label)}
              className={activePage === label ? "sideItem sideActive" : "sideItem"}
            >
              <Icon size={21} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebarCard">
        <h3>Find work<br />or hire people<br />near you.</h3>
        <button onClick={() => setActivePage("Create")}>Create Post</button>
      </div>
    </aside>
  );
}

function Topbar({ query, setQuery, setActivePage }) {
  return (
    <header className="topbar">

      <div className="topSearch">
        <Search size={21} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search people, hiring, applying..."
        />
      </div>

      <div className="topIcons">
        <button onClick={() => setActivePage("Create")}><PlusCircle size={28} /></button>
        <button onClick={() => alert("Notifications page coming soon")}><Bell size={27} /></button>
        <button onClick={() => setActivePage("Messages")}><MessageCircle size={28} /></button>
        <div className="miniProfile"><span>R</span><b>Richie Pelares</b></div>
      </div>
    </header>
  );
}

function FeedCard({ post }) {
  return (
    <article className="feedCard">
      <div className="postHeader">
        <div className="postUser">
          <div className="avatarSmall">{post.initials}</div>
          <div>
            <h3>{post.user}</h3>
            <p><MapPin size={15} /> {post.location} · {post.age} · {post.mode}</p>
          </div>
        </div>
        <span className="statusPill">{post.status}</span>
      </div>

      <div className="postDetails">
        <span>Description</span><strong>{post.description}</strong>
        <span>Skills</span><strong><em>{post.skill}</em></strong>
        <span>When</span><strong>{post.when}</strong>
        <span>{post.payLabel}</span><strong className="money">{post.pay}</strong>
        {post.notes && <><span>Notes</span><strong>{post.notes}</strong></>}
      </div>

      <div className="postActions">
        <button onClick={() => alert("Opening negotiation chat...")}><MessageCircle size={20} /> Negotiate</button>
        <button onClick={() => alert("Opening comments...")}><MessageCircle size={20} /> Comment</button>
        <button onClick={() => alert(`${post.action} request sent!`)}><Send size={21} /> {post.action}</button>
      </div>
    </article>
  );
}

function HomePage({ query }) {
  const [tab, setTab] = useState("Hiring");

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchQuery = `${post.user} ${post.mode} ${post.description} ${post.skill}`.toLowerCase().includes(query.toLowerCase());
      const matchTab = tab === "Hiring" ? true : post.mode === tab;
      return matchQuery && matchTab;
    });
  }, [query, tab]);

  return (
    <div className="centerFeed">
      <div className="feedTabs">
        {["Hiring", "Applying", "Available"].map((item) => (
          <button key={item} onClick={() => setTab(item)} className={tab === item ? "tabActive" : ""}>{item}</button>
        ))}
      </div>

      {filtered.map((post) => <FeedCard key={post.id} post={post} />)}
    </div>
  );
}

function SearchPage({ query, setQuery }) {
  return (
    <section className="searchPage">
      <div className="bigSearch">
        <Search size={26} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search people, hiring, applying..." />
      </div>

      <div className="searchTabs">
        <button className="tabActive">People</button>
        <button>Apply</button>
        <button>Hire</button>
      </div>

      <div className="sectionLine">
        <h3>RECENT SEARCHES</h3>
        <button>Clear All</button>
      </div>

      <div className="recentList">
        {recentSearches.map((item) => (
          <div key={item}><Clock size={20} /> <span>{item}</span> <X size={18} /></div>
        ))}
      </div>

      <h3 className="sectionTitle">TRENDING SEARCHES</h3>
      <div className="trendRow">{trends.map((item) => <span key={item}>{item}</span>)}</div>
    </section>
  );
}

function ProfilePanel() {
  return (
    <aside className="rightPanel">
      <section className="profileBox">
        <button className="editBtn">Edit Profile</button>
        <div className="profileMain">
          <div className="profileAvatar">R</div>
          <div>
            <h2>Richie Pelares</h2>
            <p>Student</p>
            <p><MapPin size={16} /> Punay Street, Silay, Western Visayas</p>
          </div>
        </div>
        <div className="statsRow">
          <div><strong>1</strong><span>Jobs Done</span></div>
          <div><strong>0</strong><span>Rating</span></div>
          <div><strong>100%</strong><span>Job Completion</span></div>
        </div>
      </section>

      <section className="panelBox">
        <h3>Available Schedule</h3>
        <div className="scheduleDays">
          {[["M", "-"], ["T", "PM"], ["W", "AM"], ["T", "-"], ["F", "Full"], ["S", "-"], ["S", "Full"]].map(([d, v], i) => (
            <div key={i}><b>{d}</b><span className={v === "-" ? "offDay" : "onDay"}>{v}</span></div>
          ))}
        </div>
      </section>

      <section className="panelBox">
        <div className="panelTitle"><h3>Trending Searches</h3><ChevronRight size={22} /></div>
        <div className="trendRow">{trends.map((item) => <span key={item}>{item}</span>)}</div>
      </section>

      <section className="panelBox">
        <div className="panelTitle"><h3>Activity Feed</h3></div>
        <div className="activityItem"><div>R</div><p><b>Richie Pelares</b> is applying for <span>Barber</span><small>6d ago</small></p></div>
        <div className="activityItem"><div>V</div><p><b>Vince Barruga</b> posted a new job<small>6d ago</small></p></div>
        <div className="activityLink">View all activity <ChevronRight size={18} /></div>
      </section>
    </aside>
  );
}

function ProfilePage() {
  return (
    <section className="profilePage">
      <div className="profileHero">
        <span className="availableBadge">Available</span>
      </div>
      <div className="profileInfoLarge">
        <div className="profileAvatarLarge">R</div>
        <h1>Richie Pelares</h1>
        <p>Student</p>
        <p><MapPin size={18} /> Punay Street, Silay, Western Visayas</p>
        <button>Edit Profile</button>
      </div>
      <div className="profileSections">
        <section><h3>SKILLS</h3><div className="skillTags"><span>Barber ×</span><span>Tubero ×</span><span>Gardener ×</span></div></section>
        <section><h3>AVAILABLE SCHEDULE</h3><div className="scheduleDays wide">{[["M", "-"], ["T", "PM"], ["W", "AM"], ["T", "-"], ["F", "Full"], ["S", "-"], ["S", "Full"]].map(([d, v], i) => <div key={i}><b>{d}</b><span className={v === "-" ? "offDay" : "onDay"}>{v}</span></div>)}</div></section>
        <section><h3>REVIEWS</h3><p className="emptyText">No reviews yet</p></section>
      </div>
    </section>
  );
}

function CreatePage() {
  return (
    <section className="createPage">
      <h1>Create Form</h1>
      <div className="createTabs"><button className="tabActive">Hire</button><button>Apply</button></div>
      <form className="formCard" onSubmit={(e) => { e.preventDefault(); alert("Post Job clicked!"); }}>
        <label>DESCRIPTION</label>
        <textarea placeholder="Describe what you need..."></textarea>
        <label>SKILLS NEEDED</label>
        <input placeholder="e.g. Mechanic, computer expert, laundry" />
        <label>LOCATION</label>
        <input placeholder="e.g. Silay City" />
        <label>SCHEDULE</label>
        <div className="twoButtons"><button type="button" className="selectedBtn">AM</button><button type="button">PM</button></div>
        <button type="button" className="dateBtn">Add Date</button>
        <label>PAY (₱)</label>
        <input placeholder="e.g. 500" />
        <label>NOTES (OPTIONAL)</label>
        <textarea placeholder="Any additional info..."></textarea>
        <button className="submitBtn">Post Job</button>
      </form>
    </section>
  );
}

function PlaceholderPage({ title }) {
  return <section className="placeholderPage"><h1>{title}</h1><p></p></section>;
}

export default function RaketWebVersion() {
  const [activePage, setActivePage] = useState("Home");
  const [query, setQuery] = useState("");

  let content;
  if (activePage === "Home") content = <HomePage query={query} />;
  else if (activePage === "Search") content = <SearchPage query={query} setQuery={setQuery} />;
  else if (activePage === "My Profile") content = <ProfilePage />;
  else if (activePage === "Create") content = <CreatePage />;
  else content = <PlaceholderPage title={activePage} />;

  return (
    <div className="raketPage">
      <Topbar query={query} setQuery={setQuery} setActivePage={setActivePage} />
      <div className="layout">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="mainArea">{content}</main>
        {activePage === "Home" && <ProfilePanel />}
      </div>
    </div>
  );
}
