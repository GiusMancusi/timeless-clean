
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const users = [
  {name:'Giulia', skill:'Inglese', wants:'Yoga', price:'25 Θ', match:'96%', premium:'+2 Θ premium'},
  {name:'Luca', skill:'Web Design', wants:'Fotografia', price:'30 Θ', match:'91%', premium:'1h ↔ 1h'},
  {name:'Sara', skill:'Yoga', wants:'Finance', price:'20 Θ', match:'88%', premium:'+1 Θ premium'}
]

function TimelessMark({size=92}) {
  return (
    <svg viewBox="0 0 120 120" style={{width:size, height:size}} aria-label="Timeless logo">
      <defs>
        <linearGradient id="tl-grad" x1="24" y1="10" x2="96" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ff5a1f"/>
          <stop offset="45%" stopColor="#e91e76"/>
          <stop offset="100%" stopColor="#1057f5"/>
        </linearGradient>
      </defs>
      <path d="M60 10 A50 50 0 1 1 95 95" fill="none" stroke="url(#tl-grad)" strokeWidth="6.5" strokeLinecap="round"/>
      <path d="M41 31 H79" fill="none" stroke="url(#tl-grad)" strokeWidth="7" strokeLinecap="round"/>
      <path d="M50 34 C50 48 67 51 67 60 C67 69 50 72 50 87" fill="none" stroke="url(#tl-grad)" strokeWidth="7" strokeLinecap="round"/>
      <path d="M70 34 C70 48 53 51 53 60 C53 69 70 72 70 87 C70 93 64 96 60 96" fill="none" stroke="url(#tl-grad)" strokeWidth="7" strokeLinecap="round"/>
    </svg>
  )
}

function ThetaMark({size=92}) {
  return (
    <svg viewBox="0 0 120 120" style={{width:size, height:size}} aria-label="Theta logo">
      <defs>
        <linearGradient id="theta-gold" x1="20" y1="10" x2="100" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f6b72b"/>
          <stop offset="55%" stopColor="#d49300"/>
          <stop offset="100%" stopColor="#b97500"/>
        </linearGradient>
      </defs>
      <path d="M60 10 A50 50 0 1 1 95 95" fill="none" stroke="url(#theta-gold)" strokeWidth="6.5" strokeLinecap="round"/>
      <path d="M41 31 H79" fill="none" stroke="url(#theta-gold)" strokeWidth="7" strokeLinecap="round"/>
      <path d="M50 34 C50 48 67 51 67 60 C67 69 50 72 50 87" fill="none" stroke="url(#theta-gold)" strokeWidth="7" strokeLinecap="round"/>
      <path d="M70 34 C70 48 53 51 53 60 C53 69 70 72 70 87 C70 93 64 96 60 96" fill="none" stroke="url(#theta-gold)" strokeWidth="7" strokeLinecap="round"/>
    </svg>
  )
}

function TimelessWordmark({small=false}) {
  return (
    <div className="leading-none">
      <div className={`${small ? 'text-[17px]' : 'text-[34px]'} tracking-[0.34em] font-light text-[#071733]`}>
        TIMELESS
      </div>
      <div className={`${small ? 'text-[7px]' : 'text-[11px]'} mt-2 tracking-[0.28em] font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-blue-600 bg-clip-text text-transparent`}>
        IL TUO TEMPO, IL TUO VALORE
      </div>
    </div>
  )
}

function BrandLockup({small=false, light=false}) {
  return (
    <div className="flex items-center gap-3">
      <TimelessMark size={small ? 38 : 95}/>
      <div>
        <div className={`${small ? 'text-[17px]' : 'text-[34px]'} tracking-[0.34em] font-light ${light ? 'text-white' : 'text-[#071733]'}`}>
          TIMELESS
        </div>
        <div className={`${small ? 'text-[7px]' : 'text-[11px]'} mt-2 tracking-[0.28em] font-bold ${light ? 'text-white/80' : 'bg-gradient-to-r from-orange-500 via-pink-500 to-blue-600 bg-clip-text text-transparent'}`}>
          IL TUO TEMPO, IL TUO VALORE
        </div>
      </div>
    </div>
  )
}

function Shell({children, screen, setScreen}) {
  const hideNav = screen === 'splash' || screen === 'detail' || screen === 'schedule'
  return <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
    <div className="w-[390px] h-[820px] max-w-[96vw] max-h-[94vh] bg-black rounded-[48px] p-[10px] shadow-2xl">
      <div className="h-full bg-[#fbfbfd] rounded-[40px] overflow-hidden flex flex-col">
        <div className="h-8 px-7 flex items-center justify-between text-[11px] font-semibold">
          <span>9:41</span><span>5G 🔋</span>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
        {!hideNav && <div className="h-[72px] bg-white border-t grid grid-cols-5 text-[10px]">
          {[['home','⌂','Home'],['explore','♡','Match'],['bookings','□','Prenota'],['chat','●','Chat'],['profile','♙','Profilo']].map(([id,icon,label]) => <button key={id} onClick={() => setScreen(id)} className={screen===id ? 'text-violet-600' : 'text-slate-500'}><div className="text-lg">{icon}</div>{label}</button>)}
        </div>}
      </div>
    </div>
  </div>
}

function Header({setScreen}) {
  return <div className="px-5 py-3 flex items-center justify-between">
    <button onClick={() => setScreen('home')} className="flex items-center gap-2">
      <BrandLockup small/>
    </button>
    <button onClick={() => setScreen('profile')} className="w-9 h-9 rounded-full bg-slate-900 text-white text-xs">GM</button>
  </div>
}

function Back({title,setScreen}) {
  return <div className="px-5 py-3 flex items-center justify-between">
    <button onClick={() => setScreen('home')} className="w-10 h-10 rounded-2xl bg-white border">←</button>
    <b>{title}</b>
    <span>⋮</span>
  </div>
}

function Home({setScreen,setUser}) {
  return <>
    <Header setScreen={setScreen}/>
    <div className="px-5 pb-5">
      <div className="rounded-3xl bg-gradient-to-br from-[#061743] via-[#5b207e] to-[#ff5a1f] p-5 text-white shadow-xl">
        <BrandLockup small light/>
        <h1 className="text-xl font-semibold mt-5">Ciao Giuseppe! 👋</h1>
        <p className="text-sm text-white/85 mt-2">Connetti, organizza, scambia, cresci.</p>
        <button onClick={() => setScreen('explore')} className="mt-4 bg-white text-slate-900 rounded-2xl px-4 py-3 text-sm font-semibold">Esplora servizi →</button>
      </div>

      <h3 className="mt-6 mb-3 font-semibold">Cosa vuoi fare oggi?</h3>
      <div className="grid grid-cols-4 gap-3">
        {[
          ['explore','♡','Match'],['offer','+','Offri'],['matches','⇄','Scambia'],['wallet','Θ','Wallet']
        ].map(([s,i,l]) => <button key={s} onClick={() => setScreen(s)} className="bg-white rounded-2xl p-3 h-[82px] shadow-sm">
          <div className="text-2xl text-violet-600">{i}</div><span className="text-[11px]">{l}</span>
        </button>)}
      </div>

      <h3 className="mt-6 mb-3 font-semibold">Consigliati per te</h3>
      <div className="flex gap-3 overflow-x-auto">
        {users.map(u => <button key={u.name} onClick={() => {setUser(u);setScreen('detail')}} className="min-w-[145px] bg-white rounded-2xl p-4 shadow-sm text-left">
          <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center font-bold">{u.name[0]}</div>
          <b className="block mt-3">{u.name}</b>
          <p className="text-xs text-slate-500">{u.skill}</p>
          <p className="text-xs text-amber-700 mt-2">{u.price}</p>
        </button>)}
      </div>
    </div>
  </>
}

function Explore({setScreen,setUser}) {
  return <><Back title="Smart Match" setScreen={setScreen}/><div className="px-5 grid grid-cols-1 gap-3">
    {users.map(u => <button key={u.name} onClick={() => {setUser(u);setScreen('detail')}} className="bg-white rounded-3xl p-4 shadow-sm text-left">
      <div className="flex justify-between"><b>{u.name}</b><span className="text-emerald-600">{u.match}</span></div>
      <p className="text-sm text-slate-500 mt-1">Offre {u.skill} • Cerca {u.wants}</p>
      <p className="text-xs text-amber-700 mt-2">{u.price}</p>
    </button>)}
  </div></>
}

function Detail({user,setScreen}) {
  return <><Back title="Dettaglio servizio" setScreen={setScreen}/><div className="px-5 pb-5">
    <div className="bg-white rounded-3xl p-5 shadow-sm">
      <div className="w-24 h-24 rounded-3xl bg-violet-100 flex items-center justify-center text-3xl font-bold">{user.name[0]}</div>
      <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
      <p className="text-slate-500">{user.skill}</p>
      <p className="text-amber-700 font-bold mt-2">{user.price}</p>
      <p className="text-sm mt-4">Servizio selezionato tramite Timeless con disponibilità intelligente e trust score.</p>
      <button onClick={() => setScreen('schedule')} className="w-full mt-6 py-4 rounded-2xl bg-violet-600 text-white font-semibold">Prenota una sessione</button>
    </div>
  </div></>
}

function Matches({setScreen,setUser}) {
  return <><Back title="Scambia tempo" setScreen={setScreen}/><div className="px-5 space-y-3">
    <div className="bg-violet-50 rounded-3xl p-4 text-sm">Match generati da agenda + skill. Prima della conferma puoi proporre solo orari e Theta premium.</div>
    {users.map(u => <button key={u.name} onClick={() => {setUser(u);setScreen('schedule')}} className="w-full bg-white rounded-3xl p-4 text-left shadow-sm">
      <div className="flex justify-between"><b>{u.name}</b><span className="text-emerald-600">{u.match}</span></div>
      <p className="text-xs text-slate-500">Offre {u.skill} • Cerca {u.wants}</p>
      <p className="text-xs text-amber-700 mt-1">{u.premium}</p>
    </button>)}
  </div></>
}

function Schedule({user,setScreen,setBooking}) {
  return <><Back title="Nuova prenotazione" setScreen={setScreen}/><div className="px-5">
    <div className="bg-white rounded-3xl p-4 shadow-sm"><b>{user.name}</b><p className="text-sm text-slate-500">{user.skill}</p></div>
    <h3 className="font-semibold mt-5 mb-3">Orari disponibili</h3>
    <div className="grid grid-cols-4 gap-2">{['09:00','10:00','14:00','15:00','16:00','18:00'].map(t => <button key={t} className="py-3 bg-white rounded-xl border text-sm">{t}</button>)}</div>
    <button onClick={() => {setBooking(true);setScreen('chat')}} className="w-full mt-5 py-4 rounded-2xl bg-violet-600 text-white font-semibold">Prenota e paga 25 Θ</button>
  </div></>
}

function Chat({setScreen,booking}) {
  return <><Back title="Chat" setScreen={setScreen}/><div className="px-5">
    <div className="bg-white rounded-3xl p-5 shadow-sm">{booking ? <>
      <p className="rounded-3xl bg-slate-100 p-3 text-sm">Sessione confermata. Chat sbloccata.</p>
      <p className="rounded-3xl bg-violet-600 text-white p-3 text-sm mt-3 ml-12">Perfetto, grazie!</p>
    </> : <div className="rounded-3xl bg-violet-50 p-5 text-sm">
      <div className="text-2xl">🔒</div><b>Chat bloccata</b>
      <p className="mt-2">Prima della conferma puoi proporre solo orari alternativi e Theta premium.</p>
      <button className="w-full bg-white rounded-2xl p-3 text-left mt-4">Proponi martedì 19:30</button>
    </div>}</div>
  </div></>
}

function Wallet({setScreen}) {
  return <><Back title="Wallet Theta" setScreen={setScreen}/><div className="px-5">
    <div className="rounded-3xl bg-gradient-to-br from-[#061743] via-[#3f1c8b] to-[#28145e] p-6 text-white text-center">
      <div className="flex justify-center"><ThetaMark size={96}/></div>
      <p className="text-sm text-white/70 mt-2">Saldo disponibile</p>
      <h1 className="text-4xl font-bold text-amber-400">120.5 Θ</h1>
      <p className="text-xs text-white/60 mt-2">Il credito del tempo</p>
    </div>
  </div></>
}

function Simple({title,setScreen,children}) {
  return <><Back title={title} setScreen={setScreen}/><div className="px-5">{children}</div></>
}

function App() {
  const [screen,setScreen]=useState('splash')
  const [user,setUser]=useState(users[0])
  const [booking,setBooking]=useState(false)
  let page
  if(screen==='splash') page = <div className="flex-1 flex flex-col items-center justify-between px-8 py-10 text-center">
    <div/>
    <div>
      <TimelessMark size={155}/>
      <div className="mt-6"><TimelessWordmark/></div>
      <p className="mt-14 text-lg font-semibold text-slate-900">L’app che valorizza<br/>il tuo tempo.</p>
      <p className="mt-3 text-sm text-slate-500">Connetti. Organizza. Scambia. Cresci.</p>
    </div>
    <button onClick={() => setScreen('home')} className="w-full py-4 rounded-2xl bg-violet-600 text-white font-semibold">Inizia ora</button>
  </div>
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
