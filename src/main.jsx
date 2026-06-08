import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const users = [
  {
    name:'Giulia', surname:'Bianchi', skill:'Inglese', wants:'Yoga', price:'25 Θ', match:'96%', premium:'+2 Θ premium',
    rating:'4.9', reviews:187, trust:94, badge:'Expert', verified:['Email','Telefono','Documento','LinkedIn'],
    completed:312, given:'620 Θ', received:'580 Θ', completion:'99.2%', response:'1h',
    skills:['Business English','Public Speaking','CV Review'],
    reviewsText:['Molto preparata e precisa.', 'Sessione utile e concreta.']
  },
  {
    name:'Luca', surname:'Ferrari', skill:'Web Design', wants:'Fotografia', price:'30 Θ', match:'91%', premium:'1h ↔ 1h',
    rating:'4.8', reviews:121, trust:91, badge:'Trusted', verified:['Email','Telefono','LinkedIn'],
    completed:198, given:'430 Θ', received:'410 Θ', completion:'97.8%', response:'2h',
    skills:['Figma','Landing Page','No-code'],
    reviewsText:['Ottimo approccio pratico.', 'Molto chiaro nelle spiegazioni.']
  },
  {
    name:'Sara', surname:'Conti', skill:'Yoga', wants:'Finance', price:'20 Θ', match:'88%', premium:'+1 Θ premium',
    rating:'4.7', reviews:86, trust:88, badge:'Trusted', verified:['Email','Telefono'],
    completed:144, given:'310 Θ', received:'295 Θ', completion:'96.4%', response:'3h',
    skills:['Hatha Yoga','Respiro','Postura'],
    reviewsText:['Lezione rilassante e ben guidata.', 'Grande empatia.']
  }
]

const me = {
  name:'Giuseppe', trust:92, rating:'4.9', reviews:74, badge:'Expert Member', verified:true,
  completed:128, given:'275 Θ', received:'248 Θ', completion:'98.6%', response:'1h',
  breakdown:[['Rating utenti','38/40'],['Storico scambi','24/25'],['Affidabilità','23/25'],['Verifiche','7/10']]
}

function Stars() { return <span className="text-amber-400 tracking-[-1px]">★★★★★</span> }
function Pill({children, tone='violet'}) {
  const cls = tone === 'green' ? 'bg-emerald-50 text-emerald-700' : tone === 'amber' ? 'bg-amber-50 text-amber-700' : 'bg-violet-50 text-violet-700'
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${cls}`}>{children}</span>
}
function TrustBadge({score, badge}) {
  return <div className="flex items-center gap-2"><Pill tone="green">Trust {score}/100</Pill><Pill tone="amber">🏆 {badge}</Pill></div>
}

function TimelessLogo({small=false}) {
  return <img src="/timeless-logo-definitive.png" alt="Timeless" className={small ? "w-[170px] h-auto object-contain" : "w-[285px] h-auto object-contain mx-auto"} />
}
function ThetaLogo() { return <img src="/theta-logo-definitive.png" alt="Theta" className="w-36 h-auto object-contain mx-auto" /> }

function Shell({children, screen, setScreen}) {
  const hideNav = screen === 'splash' || screen === 'detail' || screen === 'schedule' || screen === 'review'
  return <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
    <div className="w-[390px] h-[820px] max-w-[96vw] max-h-[94vh] bg-black rounded-[48px] p-[10px] shadow-2xl">
      <div className="h-full bg-[#fbfbfd] rounded-[40px] overflow-hidden flex flex-col">
        <div className="h-8 px-7 flex items-center justify-between text-[11px] font-semibold"><span>9:41</span><span>5G 🔋</span></div>
        <div className="flex-1 overflow-y-auto">{children}</div>
        {!hideNav && <div className="h-[72px] bg-white border-t grid grid-cols-6 text-[10px]">
          {[
            ['home','⌂','Home'],['explore','♡','Match'],['bookings','□','Prenota'],['messages','💬','Chat'],['reputation','★','Trust'],['profile','♙','Profilo']
          ].map(([id,icon,label]) => <button key={id} onClick={() => setScreen(id)} className={screen===id ? 'text-violet-600' : 'text-slate-500'}><div className="text-lg">{icon}</div>{label}</button>)}
        </div>}
      </div>
    </div>
  </div>
}

function Header({setScreen}) {
  return <div className="px-5 py-3 flex items-center justify-between">
    <button onClick={() => setScreen('home')} className="flex items-center"><TimelessLogo small /></button>
    <button onClick={() => setScreen('profile')} className="w-9 h-9 rounded-full bg-slate-900 text-white text-xs">GM</button>
  </div>
}
function Back({title,setScreen}) { return <div className="px-5 py-3 flex items-center justify-between"><button onClick={() => setScreen('home')} className="w-10 h-10 rounded-2xl bg-white border">←</button><b>{title}</b><span>⋮</span></div> }

function UserCard({u, onClick, compact=false}) {
  return <button onClick={onClick} className="w-full bg-white rounded-3xl p-4 shadow-sm text-left">
    <div className="flex gap-3">
      <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center font-bold text-violet-800">{u.name[0]}</div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2"><b>{u.name} {compact ? '' : u.surname}</b><span className="text-emerald-600 text-sm font-semibold">{u.match}</span></div>
        <p className="text-sm text-slate-500 mt-1">Offre {u.skill} • Cerca {u.wants}</p>
        <div className="mt-2 flex items-center gap-2 text-xs"><Stars/><span>{u.rating} ({u.reviews})</span></div>
        <div className="mt-2"><TrustBadge score={u.trust} badge={u.badge}/></div>
        <p className="text-xs text-amber-700 mt-2 font-semibold">{u.price}</p>
      </div>
    </div>
  </button>
}

function Home({setScreen,setUser}) {
  return <><Header setScreen={setScreen}/><div className="px-5 pb-5">
    <div className="rounded-3xl bg-gradient-to-br from-[#061743] via-[#5b207e] to-[#ff5a1f] p-5 text-white shadow-xl">
      <div className="bg-white/95 rounded-2xl px-3 py-3 inline-block"><TimelessLogo small /></div>
      <h1 className="text-xl font-semibold mt-5">Ciao Giuseppe! 👋</h1>
      <p className="text-sm text-white/85 mt-2">Connetti, organizza, scambia, cresci.</p>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="rounded-2xl bg-white/12 p-3"><p className="text-[11px] text-white/70">Saldo</p><b className="text-2xl">120.5 Θ</b></div>
        <button onClick={() => setScreen('reputation')} className="rounded-2xl bg-white/12 p-3 text-left"><p className="text-[11px] text-white/70">Trust Score</p><b className="text-2xl">{me.trust}/100</b><div className="text-xs"><Stars/> {me.rating}</div></button>
      </div>
      <button onClick={() => setScreen('explore')} className="mt-4 bg-white text-slate-900 rounded-2xl px-4 py-3 text-sm font-semibold">Esplora servizi →</button>
    </div>
    <h3 className="mt-6 mb-3 font-semibold">Cosa vuoi fare oggi?</h3>
    <div className="grid grid-cols-4 gap-3">{[['explore','♡','Match'],['offer','+','Offri'],['matches','⇄','Scambia'],['wallet','Θ','Wallet']].map(([s,i,l]) => <button key={s} onClick={() => setScreen(s)} className="bg-white rounded-2xl p-3 h-[82px] shadow-sm"><div className="text-2xl text-violet-600">{i}</div><span className="text-[11px]">{l}</span></button>)}</div>
    <h3 className="mt-6 mb-3 font-semibold">Consigliati per te</h3>
    <div className="space-y-3">{users.map(u => <UserCard key={u.name} u={u} compact onClick={() => {setUser(u);setScreen('detail')}} />)}</div>
  </div></>
}

function Explore({setScreen,setUser}) { return <><Back title="Smart Match" setScreen={setScreen}/><div className="px-5 grid grid-cols-1 gap-3">{users.map(u => <UserCard key={u.name} u={u} onClick={() => {setUser(u);setScreen('detail')}} />)}</div></> }

function Detail({user,setScreen}) {
  return <><Back title="Profilo servizio" setScreen={setScreen}/><div className="px-5 pb-5 space-y-4">
    <div className="bg-white rounded-3xl p-5 shadow-sm">
      <div className="flex gap-4"><div className="w-24 h-24 rounded-3xl bg-violet-100 flex items-center justify-center text-3xl font-bold text-violet-800">{user.name[0]}</div><div className="flex-1"><h2 className="text-2xl font-semibold">{user.name} {user.surname}</h2><p className="text-slate-500">{user.skill}</p><div className="mt-2"><TrustBadge score={user.trust} badge={user.badge}/></div><div className="mt-2 text-sm"><Stars/> {user.rating} ({user.reviews} recensioni)</div></div></div>
      <p className="text-amber-700 font-bold mt-4">{user.price}</p><p className="text-sm mt-3">Servizio selezionato tramite Timeless con disponibilità intelligente, matching e reputazione verificata.</p>
    </div>
    <div className="bg-white rounded-3xl p-5 shadow-sm"><b>Verifiche</b><div className="grid grid-cols-2 gap-2 mt-3">{user.verified.map(v => <Pill key={v} tone="green">✓ {v}</Pill>)}</div></div>
    <div className="bg-white rounded-3xl p-5 shadow-sm"><b>Statistiche reputazionali</b><div className="grid grid-cols-2 gap-3 mt-3 text-sm">{[['Scambi',user.completed],['Erogati',user.given],['Ricevuti',user.received],['Completion',user.completion],['Risposta',user.response],['Match',user.match]].map(([a,b]) => <div key={a} className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">{a}</p><b>{b}</b></div>)}</div></div>
    <div className="bg-white rounded-3xl p-5 shadow-sm"><b>Competenze</b><div className="flex flex-wrap gap-2 mt-3">{user.skills.map(s => <Pill key={s}>{s}</Pill>)}</div></div>
    <div className="bg-white rounded-3xl p-5 shadow-sm"><b>Recensioni recenti</b>{user.reviewsText.map(r => <div key={r} className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm"><Stars/><p>{r}</p></div>)}</div>
    <button onClick={() => setScreen('schedule')} className="w-full py-4 rounded-2xl bg-violet-600 text-white font-semibold">Prenota una sessione</button>
  </div></>
}

function Matches({setScreen,setUser}) { return <><Back title="Scambia tempo" setScreen={setScreen}/><div className="px-5 space-y-3"><div className="bg-violet-50 rounded-3xl p-4 text-sm">Match generati da agenda + skill + Trust Score. Anche negli scambi 1h ↔ 1h Timeless trattiene una fee θ da entrambe le controparti.</div>{users.map(u => <UserCard key={u.name} u={u} onClick={() => {setUser(u);setScreen('schedule')}} />)}</div></> }

function Schedule({user,setScreen,setBooking}) {
  return <><Back title="Nuova prenotazione" setScreen={setScreen}/><div className="px-5 pb-5">
    <div className="bg-white rounded-3xl p-4 shadow-sm"><div className="flex justify-between"><div><b>{user.name} {user.surname}</b><p className="text-sm text-slate-500">{user.skill}</p></div><Pill tone="green">Trust {user.trust}</Pill></div><div className="mt-2 text-sm"><Stars/> {user.rating} • {user.completed} scambi • Completion {user.completion}</div></div>
    <h3 className="font-semibold mt-5 mb-3">Orari disponibili</h3><div className="grid grid-cols-4 gap-2">{['09:00','10:00','14:00','15:00','16:00','18:00'].map(t => <button key={t} className="py-3 bg-white rounded-xl border text-sm">{t}</button>)}</div>
    <div className="mt-4 rounded-3xl bg-amber-50 p-4 text-sm text-amber-800"><b>Fee Timeless</b><br/>La piattaforma trattiene una percentuale in θ anche se lo scambio è perfettamente bilanciato 1h ↔ 1h.</div>
    <button onClick={() => {setBooking(true);setScreen('chat')}} className="w-full mt-5 py-4 rounded-2xl bg-violet-600 text-white font-semibold">Prenota e paga 25 Θ</button>
  </div></>
}

function Chat({setScreen,booking}) { return <><Back title="Chat" setScreen={setScreen}/><div className="px-5"><div className="bg-white rounded-3xl p-5 shadow-sm">{booking ? <><p className="rounded-3xl bg-slate-100 p-3 text-sm">Sessione confermata. Chat sbloccata.</p><p className="rounded-3xl bg-violet-600 text-white p-3 text-sm mt-3 ml-12">Perfetto, grazie!</p><button onClick={() => setScreen('review')} className="w-full mt-5 py-4 rounded-2xl bg-amber-500 text-white font-semibold">Simula fine sessione e lascia review</button></> : <div className="rounded-3xl bg-violet-50 p-5 text-sm"><div className="text-2xl">🔒</div><b>Chat bloccata</b><p className="mt-2">Prima della conferma puoi proporre solo orari alternativi e Theta premium.</p><button className="w-full bg-white rounded-2xl p-3 text-left mt-4">Proponi martedì 19:30</button></div>}</div></div></> }

function Review({setScreen}) { return <><Back title="Valuta esperienza" setScreen={setScreen}/><div className="px-5 pb-5"><div className="bg-white rounded-3xl p-5 shadow-sm"><h2 className="text-xl font-semibold">Come è andata?</h2><p className="text-sm text-slate-500 mt-1">Il feedback aggiorna rating e Timeless Trust Score.</p>{['Qualità','Puntualità','Comunicazione','Professionalità'].map(x => <div key={x} className="flex justify-between items-center mt-5"><span className="font-medium">{x}</span><Stars/></div>)}<textarea className="w-full mt-5 rounded-2xl border p-3 text-sm" rows="4" placeholder="Scrivi una recensione..."/><button onClick={() => setScreen('reputation')} className="w-full mt-4 py-4 rounded-2xl bg-violet-600 text-white font-semibold">Invia recensione</button></div></div></> }

function Reputation({setScreen}) { return <><Back title="Reputation" setScreen={setScreen}/><div className="px-5 pb-5 space-y-4"><div className="rounded-3xl bg-gradient-to-br from-[#061743] via-[#3f1c8b] to-[#28145e] p-6 text-white text-center"><p className="text-sm text-white/70">Timeless Trust Score</p><div className="mx-auto mt-4 w-36 h-36 rounded-full border-[12px] border-white/20 flex items-center justify-center"><span className="text-4xl font-bold text-amber-400">{me.trust}</span></div><p className="mt-3"><Stars/> {me.rating} ({me.reviews} recensioni)</p><Pill tone="amber">🏆 {me.badge}</Pill></div><div className="bg-white rounded-3xl p-5 shadow-sm"><b>Breakdown</b>{me.breakdown.map(([a,b]) => <div key={a} className="flex justify-between border-b last:border-b-0 py-3 text-sm"><span>{a}</span><b>{b}</b></div>)}</div><div className="bg-white rounded-3xl p-5 shadow-sm"><b>Obiettivo</b><p className="text-sm text-slate-500 mt-2">Mancano 6 punti per diventare Master Member.</p><div className="h-3 bg-slate-100 rounded-full mt-3"><div className="h-3 bg-violet-600 rounded-full w-[76%]"/></div></div></div></> }

function Wallet({setScreen}) { return <><Back title="Wallet Theta" setScreen={setScreen}/><div className="px-5"><div className="rounded-3xl bg-gradient-to-br from-[#061743] via-[#3f1c8b] to-[#28145e] p-6 text-white text-center"><div className="bg-white rounded-3xl px-3 py-2 inline-block"><ThetaLogo /></div><p className="text-sm text-white/70 mt-4">Saldo disponibile</p><h1 className="text-4xl font-bold text-amber-400">120.5 Θ</h1><p className="text-xs text-white/60 mt-2">Il credito del tempo</p></div></div></> }
function Simple({title,setScreen,children}) { return <><Back title={title} setScreen={setScreen}/><div className="px-5">{children}</div></> }

function App() {
  const [screen,setScreen]=useState('splash')
  const [user,setUser]=useState(users[0])
  const [booking,setBooking]=useState(false)
  let page
  if(screen==='splash') page = <div className="flex-1 flex flex-col items-center justify-between px-8 py-10 text-center"><div/><div><div className="mt-4"><TimelessLogo/></div><p className="mt-10 text-lg font-semibold text-slate-900">L’app che valorizza<br/>il tuo tempo.</p><p className="mt-3 text-sm text-slate-500">Connetti. Organizza. Scambia. Cresci.</p></div><button onClick={() => setScreen('home')} className="w-full py-4 rounded-2xl bg-violet-600 text-white font-semibold">Inizia ora</button></div>
  else if(screen==='home') page=<Home setScreen={setScreen} setUser={setUser}/>
  else if(screen==='explore') page=<Explore setScreen={setScreen} setUser={setUser}/>
  else if(screen==='detail') page=<Detail user={user} setScreen={setScreen}/>
  else if(screen==='matches') page=<Matches setScreen={setScreen} setUser={setUser}/>
  else if(screen==='schedule') page=<Schedule user={user} setScreen={setScreen} setBooking={setBooking}/>
  else if(screen==='chat') page=<Chat setScreen={setScreen} booking={booking}/>
  else if(screen==='wallet') page=<Wallet setScreen={setScreen}/>
  else if(screen==='reputation') page=<Reputation setScreen={setScreen}/>
  else if(screen==='review') page=<Review setScreen={setScreen}/>
  else if(screen==='bookings') page=<Simple title="Prenotazioni" setScreen={setScreen}><div className="bg-white rounded-3xl p-4 shadow-sm">Lezione Inglese con Giulia<br/><span className="text-sm text-slate-500">15 Mag, 15:00</span><div className="mt-2"><Stars/> 4.9 • Trust 94</div></div></Simple>
  else if(screen==='offer') page=<Simple title="Offri servizio" setScreen={setScreen}><div className="bg-white rounded-3xl p-5 shadow-sm"><b>Nuova offerta</b><p className="text-sm text-slate-500 mt-2">Pubblica una competenza e aumenta il tuo Trust Score completando scambi verificati.</p></div></Simple>
  else page=<Simple title="Profilo" setScreen={setScreen}><div className="bg-white rounded-3xl p-5 text-center shadow-sm"><div className="w-20 h-20 mx-auto rounded-full bg-violet-100 flex items-center justify-center font-bold">GM</div><h3 className="text-xl font-semibold mt-4">Giuseppe</h3><p className="text-sm text-slate-500">Finance • Mentoring • Markets</p><div className="mt-3 flex justify-center"><TrustBadge score={me.trust} badge={me.badge}/></div><p className="mt-3 text-sm"><Stars/> {me.rating} ({me.reviews})</p></div></Simple>
  return <Shell screen={screen} setScreen={setScreen}>{page}</Shell>
}

createRoot(document.getElementById('root')).render(<App />)
