import React, { useMemo, useState } from "react";
import {
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
  MoreHorizontal,
  Menu,
} from "lucide-react";
import "./RaketWebVersion.css";

const initialPosts = [
  {
    id: 1,
    user: "Richie Pelares",
    initials: "R",
    location: "Silay",
    age: "6d ago",
    mode: "Applying",
    status: "Available",
    description: "Barber",
    skill: "Barber",
    when: "May 15, 2026, Friday (AM)",
    payLabel: "Rate",
    pay: "₱100",
    action: "Hire",
    comments: ["Available pa ni?", "Nice offer."],
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
    skill: "Hair stylist",
    when: "May 14, 2026, Thursday (AM)",
    payLabel: "Pay",
    pay: "₱100",
    notes: "Bring own equipments",
    action: "Apply",
    comments: [],
  },
  {
    id: 3,
    user: "Vince Barruga",
    initials: "V",
    location: "Silay City",
    age: "6d ago",
    mode: "Hiring",
    status: "Open",
    description: "Manong gunting",
    skill: "Barber",
    when: "May 14, 2026, Thursday (AM)",
    payLabel: "Pay",
    pay: "₱160",
    notes: "with free Puto if late",
    action: "Apply",
    comments: ["Pwede afternoon?"],
  },
];

const recentSearches = ["Barber", "Welder", "Vince", "Abnoy", "cooking", "Tubero"];
const trends = ["barber", "abnoy", "vince", "welder", "tubero"];

function BottomNav({ activePage, setActivePage }) {
  const nav = [
    [Home, "Home"],
    [Search, "Search"],
    [PlusCircle, "Create"],
    [MessageCircle, "Messages"],
    [User, "My Profile"],
  ];

  return (
    <nav className="bottomNav">
      {nav.map(([Icon, label]) => (
        <button
          key={label}
          onClick={() => setActivePage(label)}
          className={activePage === label ? "bottomActive" : ""}
        >
          <Icon size={23} />
          <span>{label === "My Profile" ? "Profile" : label}</span>
        </button>
      ))}
    </nav>
  );
}

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

function Topbar({ query, setQuery, activePage, setActivePage }) {
  const icons = [
    [Home, "Home"],
    [PlusCircle, "Create"],
    [Bell, "Notifications"],
    [MessageCircle, "Messages"],
  ];

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
        {icons.map(([Icon, page]) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={activePage === page ? "topIconActive" : ""}
            title={page}
          >
            <Icon size={27} />
          </button>
        ))}
        <button
          className="miniProfile"
          onClick={() => setActivePage("My Profile")}
          title="My Profile"
        >
          <span>R</span>
          <b>Richie Pelares</b>
        </button>
      </div>
    </header>
  );
}

function Composer({ setActivePage }) {
  return (
    <div className="composer">
      <button className="composerAvatar" onClick={() => setActivePage("My Profile")}>R</button>
      <button className="composerInput" onClick={() => setActivePage("Create")}>What raket do you need today?</button>
      <button className="composerPost" onClick={() => setActivePage("Create")}><PlusCircle size={20} /> Post</button>
    </div>
  );
}

function FeedCard({ post, onComment, onMessage, onApplication, onProfile }) {
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  function submitComment(e) {
    e.preventDefault();
    if (!commentText.trim()) return;
    onComment(post.id, commentText.trim());
    setCommentText("");
    setShowComments(true);
  }

  return (
    <article className="feedCard socialCard">
      <div className="postHeader">
        <button className="postUser userButton" onClick={() => onProfile(post.user)}>
          <div className="avatarSmall">{post.initials}</div>
          <div>
            <h3>{post.user}</h3>
            <p><MapPin size={15} /> {post.location} · {post.age} · {post.mode}</p>
          </div>
        </button>
        <div className="postHeaderRight">
          <span className="statusPill">{post.status}</span>
          <button className="moreBtn"><MoreHorizontal size={22} /></button>
        </div>
      </div>

      <div className="postCaption">
        <p>{post.description}</p>
      </div>

      <div className="postDetails">
        <span>Skills</span><strong><em>{post.skill}</em></strong>
        <span>When</span><strong>{post.when}</strong>
        <span>{post.payLabel}</span><strong className="money">{post.pay}</strong>
        {post.notes && <><span>Notes</span><strong>{post.notes}</strong></>}
      </div>

      <div className="socialCounts">
        <span>{post.comments.length} comments</span>
        <span>{post.mode}</span>
      </div>

      <div className="postActions socialActions">
        <button onClick={() => onMessage(post)}><MessageCircle size={20} /> Negotiate</button>
        <button onClick={() => setShowComments(!showComments)}><MessageCircle size={20} /> Comment</button>
        <button onClick={() => onApplication(post)}><Send size={21} /> {post.action}</button>
      </div>

      {showComments && (
        <div className="commentsBox">
          {post.comments.length === 0 ? (
            <p className="noComment">No comments yet. Be the first one.</p>
          ) : (
            post.comments.map((comment, index) => (
              <div className="commentItem" key={index}>
                <div className="commentAvatar">R</div>
                <p><b>User</b><br />{comment}</p>
              </div>
            ))
          )}

          <form className="commentForm" onSubmit={submitComment}>
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            />
            <button>Post</button>
          </form>
        </div>
      )}
    </article>
  );
}

function HomePage({ query, posts, setPosts, setActivePage, startChat, sendApplication }) {
  const [tab, setTab] = useState("Hiring");

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchQuery = `${post.user} ${post.mode} ${post.description} ${post.skill}`.toLowerCase().includes(query.toLowerCase());
      const matchTab = tab === "Hiring" ? true : post.mode === tab;
      return matchQuery && matchTab;
    });
  }, [query, tab, posts]);

  function addComment(postId, comment) {
    setPosts((prev) => prev.map((post) => post.id === postId ? { ...post, comments: [...post.comments, comment] } : post));
  }

  return (
    <div className="centerFeed">
      <Composer setActivePage={setActivePage} />

      <div className="feedTabs">
        {["Hiring", "Applying", "Available"].map((item) => (
          <button key={item} onClick={() => setTab(item)} className={tab === item ? "tabActive" : ""}>{item}</button>
        ))}
      </div>

      {filtered.map((post) => (
        <FeedCard
          key={post.id}
          post={post}
          onComment={addComment}
          onMessage={startChat}
          onApplication={sendApplication}
          onProfile={() => setActivePage("My Profile")}
        />
      ))}
    </div>
  );
}

function SearchPage({ query, setQuery, setActivePage }) {
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
          <button key={item} onClick={() => setQuery(item)}><Clock size={20} /> <span>{item}</span> <X size={18} /></button>
        ))}
      </div>

      <h3 className="sectionTitle">TRENDING SEARCHES</h3>
      <div className="trendRow">{trends.map((item) => <button key={item} onClick={() => setQuery(item)}>{item}</button>)}</div>
    </section>
  );
}

function MessagesPage({ messages, setActivePage }) {
  return (
    <section className="messagesPage">
      <div className="chatList">
        <h2>Messages</h2>
        <button className="chatPerson activeChat"><span>R</span><div><b>Richie Pelares</b><small>Negotiation / Application</small></div></button>
        <button className="chatPerson"><span>V</span><div><b>Vince Barruga</b><small>Job inquiry</small></div></button>
      </div>

      <div className="chatWindow">
        <div className="chatHeader">
          <button className="chatBack" onClick={() => setActivePage("Home")}>←</button>
          <div className="avatarSmall">R</div>
          <div><h3>Richie Pelares</h3><p>Active now</p></div>
        </div>

        <div className="chatBody">
          {messages.length === 0 ? (
            <p className="emptyChat">No messages yet. Click Negotiate, Apply, or Hire from a post.</p>
          ) : messages.map((msg) => (
            <div key={msg.id} className={msg.type === "card" ? "applicationCard" : "chatBubble sentBubble"}>
              {msg.type === "card" ? (
                <>
                  <h4>{msg.title}</h4>
                  <p><b>Post:</b> {msg.post.description}</p>
                  <p><b>Skill:</b> {msg.post.skill}</p>
                  <p><b>Schedule:</b> {msg.post.when}</p>
                  <p><b>{msg.post.payLabel}:</b> {msg.post.pay}</p>
                  <button>View Details</button>
                </>
              ) : msg.text}
            </div>
          ))}
        </div>

        <form className="chatInput" onSubmit={(e) => e.preventDefault()}>
          <input placeholder="Type a message..." />
          <button><Send size={20} /></button>
        </form>
      </div>
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
      <form className="formCard" onSubmit={(e) => { e.preventDefault(); alert("Post created!"); }}>
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
  return <section className="placeholderPage"><h1>{title}</h1></section>;
}

export default function RaketWebVersion() {
  const [activePage, setActivePage] = useState("Home");
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState(initialPosts);
  const [messages, setMessages] = useState([]);

  function startChat(post) {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "text", text: `Hi, I want to negotiate about: ${post.description}.` },
    ]);
    setActivePage("Messages");
  }

  function sendApplication(post) {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "card", title: `${post.action} Request Card`, post },
    ]);
    setActivePage("Messages");
  }

  let content;
  if (activePage === "Home") content = <HomePage query={query} posts={posts} setPosts={setPosts} setActivePage={setActivePage} startChat={startChat} sendApplication={sendApplication} />;
  else if (activePage === "Search") content = <SearchPage query={query} setQuery={setQuery} setActivePage={setActivePage} />;
  else if (activePage === "Messages") content = <MessagesPage messages={messages} setActivePage={setActivePage} />;
  else if (activePage === "My Profile") content = <ProfilePage />;
  else if (activePage === "Create") content = <CreatePage />;
  else content = <PlaceholderPage title={activePage} />;

  return (
    <div className="raketPage">
      <Topbar query={query} setQuery={setQuery} activePage={activePage} setActivePage={setActivePage} />
      <div className="layout">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="mainArea">{content}</main>
        {activePage === "Home" && <ProfilePanel />}
      </div>
      <BottomNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}
