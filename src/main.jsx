
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const users = [
  {name:'Giulia', skill:'Inglese', wants:'Yoga', price:'25 Θ', match:'96%', premium:'+2 Θ premium'},
  {name:'Luca', skill:'Web Design', wants:'Fotografia', price:'30 Θ', match:'91%', premium:'1h ↔ 1h'},
  {name:'Sara', skill:'Yoga', wants:'Finance', price:'20 Θ', match:'88%', premium:'+1 Θ premium'}
]

function Logo({gold=false, small=false}) {
  const stroke = gold ? '#d49300' : 'url(#g)'
  return <svg viewBox="0 0 100 100" className={small ? 'w-9 h-9' : 'w-24 h-24'}>
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff5a1f"/><stop offset="48%" stopColor="#e91e76"/><stop offset="100%" stopColor="#1057f5"/></linearGradient></defs>
    <path d="M50 8 A42 42 0 1 1 80 79" fill="none" stroke={stroke} strokeWidth="5.5" strokeLinecap="round"/>
    <path d="M34 25 H66" fill="none" stroke={stroke} strokeWidth="5.5" strokeLinecap="round"/>
    <path d="M42 27 C42 39 56 42 56 50 C56 58 42 61 42 72" fill="none" stroke={stroke} strokeWidth="5.5" strokeLinecap="round"/>
    <path d="M58 27 C58 39 44 42 44 50 C44 58 58 61 58 72 C58 76 54 79 50 79" fill="none" stroke={stroke} strokeWidth="5.5" strokeLinecap="round"/>
  </svg>
}

function Shell({children, screen, setScreen}) {
  const hideNav = screen === 'splash' || screen === 'detail' || screen === 'schedule'
  return <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
    <div className="w-[390px] h-[820px] max-w-[96vw] max-h-[94vh] bg-black rounded-[48px] p-[10px] shadow-2xl">
      <div className="h-full bg-[#fbfbfd] rounded-[40px] overflow-hidden flex flex-col">
        <div className="h-8 px-7 flex items-center justify-between text-[11px] font-semibold"><span>9:41</span><span>5G 🔋</span></div>
        <div className="flex-1 overflow-y-auto">{children}</div>
        {!hideNav && <div className="h-[72px] bg-white border-t grid grid-cols-5 text-[10px]">
          {[['home','⌂','Home'],['explore','◉','Esplora'],['bookings','□','Prenota'],['chat','✉','Chat'],['profile','♙','Profilo']].map(([id,icon,label]) => <button key={id} onClick={() => setScreen(id)} className={screen===id ? 'text-violet-600' : 'text-slate-500'}><div className="text-lg">{icon}</div>{label}</button>)}
        </div>}
      </div>
    </div>
  </div>
}

function Header({setScreen}) {
  return <div className="px-5 py-3 flex items-center justify-between">
    <button onClick={() => setScreen('home')} className="flex items-center gap-2">
      <Logo small/><div className="text-left"><div className="tracking-[0.3em] text-lg font-light">TIMELESS</div><div className="text-[7px] tracking-[0.2em] text-violet-600">IL TUO TEMPO, IL TUO VALORE</div></div>
    </button>
    <button onClick={() => setScreen('profile')} className="w-9 h-9 rounded-full bg-slate-900 text-white text-xs">GM</button>
  </div>
}

function Back({title,setScreen}) {
  return <div className="px-5 py-3 flex items-center justify-between"><button onClick={() => setScreen('home')} className="w-10 h-10 rounded-2xl bg-white border">←</button><b>{title}</b><span>⋮</span></div>
}

function Home({setScreen,setUser}) {
  return <>
    <Header setScreen={setScreen}/>
    <div className="px-5 pb-5">
      <div className="rounded-3xl bg-gradient-to-br from-[#061743] via-[#5b207e] to-[#ff5a1f] p-5 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4"><Logo small/><div><div className="text-2xl tracking-[0.32em] font-light">TIMELESS</div><div className="text-[9px]">IL TUO TEMPO, IL TUO VALORE</div></div></div>
        <h1 className="text-xl font-semibold">Ciao Giuseppe! 👋</h1>
        <p className="text-sm text-white/85 mt-2">Connetti, organizza, scambia, cresci.</p>
        <button onClick={() => setScreen('explore')} className="mt-4 bg-white text-slate-900 rounded-2xl px-4 py-3 text-sm font-semibold">Esplora servizi →</button>
      </div>
      <h3 className="mt-6 mb-3 font-semibold">Cosa vuoi fare oggi?</h3>
      <div className="grid grid-cols-4 gap-3">{[['explore','◉','Esplora'],['offer','+','Offri'],['matches','⇄','Scambia'],['wallet','Θ','Wallet']].map(([s,i,l]) => <button key={s} onClick={() => setScreen(s)} className="bg-white rounded-2xl p-3 h-[82px] shadow-sm"><div className="text-2xl text-violet-600">{i}</div><span className="text-[11px]">{l}</span></button>)}</div>
      <h3 className="mt-6 mb-3 font-semibold">Consigliati per te</h3>
      <div className="flex gap-3 overflow-x-auto">{users.map(u => <button key={u.name} onClick={() => {setUser(u);setScreen('detail')}} className="min-w-[145px] bg-white rounded-2xl p-4 shadow-sm text-left"><div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center font-bold">{u.name[0]}</div><b className="block mt-3">{u.name}</b><p className="text-xs text-slate-500">{u.skill}</p><p className="text-xs text-amber-700 mt-2">{u.price}</p></button>)}</div>
    </div>
  </>
}

function Explore({setScreen,setUser}) {
  return <><Back title="Esplora servizi" setScreen={setScreen}/><div className="px-5 grid grid-cols-2 gap-3">{users.map(u => <button key={u.name} onClick={() => {setUser(u);setScreen('detail')}} className="bg-white rounded-2xl p-4 shadow-sm text-left"><div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center font-bold">{u.name[0]}</div><b className="block mt-3">{u.name}</b><p className="text-xs text-slate-500">{u.skill}</p><p className="text-xs text-amber-700 mt-2">{u.price}</p></button>)}</div></>
}

function Detail({user,setScreen}) {
  return <><Back title="Dettaglio servizio" setScreen={setScreen}/><div className="px-5 pb-5"><div className="bg-white rounded-3xl p-5 shadow-sm"><div className="w-24 h-24 rounded-3xl bg-violet-100 flex items-center justify-center text-3xl font-bold">{user.name[0]}</div><h2 className="text-2xl font-semibold mt-4">{user.name}</h2><p className="text-slate-500">{user.skill}</p><p className="text-amber-700 font-bold mt-2">{user.price}</p><p className="text-sm mt-4">Servizio selezionato tramite Timeless con disponibilità intelligente e trust score.</p><button onClick={() => setScreen('schedule')} className="w-full mt-6 py-4 rounded-2xl bg-violet-600 text-white font-semibold">Prenota una sessione</button></div></div></>
}

function Matches({setScreen,setUser}) {
  return <><Back title="Smart Match" setScreen={setScreen}/><div className="px-5 space-y-3"><div className="bg-violet-50 rounded-3xl p-4 text-sm">Match generati da agenda + skill. Prima della conferma puoi proporre solo orari e Theta premium.</div>{users.map(u => <button key={u.name} onClick={() => {setUser(u);setScreen('schedule')}} className="w-full bg-white rounded-3xl p-4 text-left shadow-sm"><div className="flex justify-between"><b>{u.name}</b><span className="text-emerald-600">{u.match}</span></div><p className="text-xs text-slate-500">Offre {u.skill} • Cerca {u.wants}</p><p className="text-xs text-amber-700 mt-1">{u.premium}</p></button>)}</div></>
}

function Schedule({user,setScreen,setBooking}) {
  return <><Back title="Scegli data e ora" setScreen={setScreen}/><div className="px-5"><div className="bg-white rounded-3xl p-4 shadow-sm"><b>{user.name}</b><p className="text-sm text-slate-500">{user.skill}</p></div><h3 className="font-semibold mt-5 mb-3">Orari disponibili</h3><div className="grid grid-cols-4 gap-2">{['09:00','10:00','14:00','15:00','16:00','18:00'].map(t => <button key={t} className="py-3 bg-white rounded-xl border text-sm">{t}</button>)}</div><button onClick={() => {setBooking(true);setScreen('chat')}} className="w-full mt-5 py-4 rounded-2xl bg-violet-600 text-white font-semibold">Conferma prenotazione</button></div></>
}

function Chat({setScreen,booking}) {
  return <><Back title="Messaggi" setScreen={setScreen}/><div className="px-5"><div className="bg-white rounded-3xl p-5 shadow-sm">{booking ? <><p className="rounded-3xl bg-slate-100 p-3 text-sm">Sessione confermata. Chat sbloccata.</p><p className="rounded-3xl bg-violet-600 text-white p-3 text-sm mt-3 ml-12">Perfetto, grazie!</p></> : <div className="rounded-3xl bg-violet-50 p-5 text-sm"><div className="text-2xl">🔒</div><b>Chat bloccata</b><p className="mt-2">Prima della conferma puoi proporre solo orari alternativi e Theta premium.</p><button className="w-full bg-white rounded-2xl p-3 text-left mt-4">Proponi martedì 19:30</button></div>}</div></div></>
}

function Wallet({setScreen}) {
  return <><Back title="Wallet Theta" setScreen={setScreen}/><div className="px-5"><div className="rounded-3xl bg-gradient-to-br from-[#061743] via-[#3f1c8b] to-[#28145e] p-6 text-white text-center"><div className="flex justify-center"><Logo gold/></div><p className="text-sm text-white/70">Saldo disponibile</p><h1 className="text-4xl font-bold text-amber-400">120.5 Θ</h1></div></div></>
}

function Simple({title,setScreen,children}) {
  return <><Back title={title} setScreen={setScreen}/><div className="px-5">{children}</div></>
}

function App() {
  const [screen,setScreen]=useState('splash')
  const [user,setUser]=useState(users[0])
  const [booking,setBooking]=useState(false)
  let page
  if(screen==='splash') page = <div className="flex-1 flex flex-col items-center justify-between px-8 py-10 text-center"><div/><div><Logo/><div className="mt-5 text-[34px] tracking-[0.34em] font-light">TIMELESS</div><div className="mt-3 text-[11px] tracking-[0.28em] font-bold text-violet-600">IL TUO TEMPO,<br/>IL TUO VALORE</div><p className="mt-16 text-sm font-semibold">Connetti. Organizza.<br/>Scambia. Cresci.</p></div><button onClick={() => setScreen('home')} className="w-full py-4 rounded-2xl bg-violet-600 text-white font-semibold">Inizia ora</button></div>
  else if(screen==='home') page=<Home setScreen={setScreen} setUser={setUser}/>
  else if(screen==='explore') page=<Explore setScreen={setScreen} setUser={setUser}/>
  else if(screen==='detail') page=<Detail user={user} setScreen={setScreen}/>
  else if(screen==='matches') page=<Matches setScreen={setScreen} setUser={setUser}/>
  else if(screen==='schedule') page=<Schedule user={user} setScreen={setScreen} setBooking={setBooking}/>
  else if(screen==='chat') page=<Chat setScreen={setScreen} booking={booking}/>
  else if(screen==='wallet') page=<Wallet setScreen={setScreen}/>
  else if(screen==='bookings') page=<Simple title="Prenotazioni" setScreen={setScreen}><div className="bg-white rounded-3xl p-4 shadow-sm">Lezione Inglese con Giulia<br/><span className="text-sm text-slate-500">15 Mag, 15:00</span></div></Simple>
  else page=<Simple title="Profilo" setScreen={setScreen}><div className="bg-white rounded-3xl p-5 text-center shadow-sm"><div className="w-20 h-20 mx-auto rounded-full bg-violet-100 flex items-center justify-center font-bold">GM</div><h3 className="text-xl font-semibold mt-4">Giuseppe</h3><p className="text-sm text-slate-500">Finance • Mentoring • Markets</p></div></Simple>
  return <Shell screen={screen} setScreen={setScreen}>{page}</Shell>
}

createRoot(document.getElementById('root')).render(<App />)
