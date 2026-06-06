"use client";
import React, { useState, useEffect, useRef } from 'react';
import * as motion from 'framer-motion/client';
import Link from 'next/link';
import { MapPin, Calendar, User, Users, ArrowRightLeft, Route, Plane, ChevronDown, RotateCw, Sparkles } from 'lucide-react';
import clsx from 'clsx';

const tripTypes = [
  { id: 'round', label: 'Round Trip', icon: RotateCw },
  { id: 'oneway', label: 'One Way', icon: Plane },
  { id: 'multicity', label: 'Multi City', icon: Route },
];

const airports = [
  "DXB (Dubai)", 
  "LHR (London)", 
  "JFK (New York)", 
  "CDG (Paris)",
  "HND (Tokyo)", 
  "ICN (Seoul)", 
  "SYD (Sydney)", 
  "AKL (Auckland)",
  "DOH (Doha)", 
  "FRA (Frankfurt)", 
  "MXP (Milan)", 
  "MUC (Munich)", 
  "MAD (Madrid)"
];

const flightClasses = [
  "Economy",
  "Premium Economy",
  "Business",
  "First"
];

export default function BookingEngine({ lang, dict }: { lang?: string, dict?: any }) {
  const [activeTrip, setActiveTrip] = useState('round');
  const [takeoffKey, setTakeoffKey] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const departureInputRef = useRef<HTMLInputElement>(null);
  const returnInputRef = useRef<HTMLInputElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Search Fields State
  const [fromAirport, setFromAirport] = useState("DXB (Dubai)");
  const [toAirport, setToAirport] = useState("LHR (London)");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [searchFromQuery, setSearchFromQuery] = useState("");
  const [searchToQuery, setSearchToQuery] = useState("");

  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  const [selectedClass, setSelectedClass] = useState("Economy");
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const classDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Measure container size
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
      setIsDesktop(window.innerWidth >= 768);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Trigger initial animation after 1 second to grab attention
    const initialTimer = setTimeout(() => {
      setTakeoffKey(1);
    }, 1000);

    // Trigger periodically every 10 seconds so the user cannot miss it
    const intervalTimer = setInterval(() => {
      setTakeoffKey(prev => (prev === 0 ? 1 : prev + 1));
    }, 10000);

    // Click outside listener to close dropdowns
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowFromDropdown(false);
        setShowToDropdown(false);
        setShowPassengerDropdown(false);
      }
      if (classDropdownRef.current && !classDropdownRef.current.contains(e.target as Node)) {
        setShowClassDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener('resize', updateSize);
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  const triggerAnimation = () => {
    setTakeoffKey(prev => (prev === 0 ? 1 : prev + 1));
  };

  const handleSwap = (e: React.MouseEvent) => {
    e.stopPropagation();
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
    triggerAnimation();
  };

  const isRtl = lang === 'ar' || lang === 'fa';
  const startX = isRtl ? containerWidth * 0.75 : containerWidth * 0.25;
  const endX = isRtl ? containerWidth * 0.25 : containerWidth * 0.75;
  const controlX = (startX + endX) / 2;
  const startY = 35;
  const endY = 35;
  const controlY = -90;

  const filteredFromAirports = airports.filter(airport => {
    const translated = dict?.airports?.[airport] || airport;
    const matchesQuery = airport.toLowerCase().includes(searchFromQuery.toLowerCase()) || 
                         translated.toLowerCase().includes(searchFromQuery.toLowerCase());
    return matchesQuery && airport !== toAirport;
  });

  const filteredToAirports = airports.filter(airport => {
    const translated = dict?.airports?.[airport] || airport;
    const matchesQuery = airport.toLowerCase().includes(searchToQuery.toLowerCase()) || 
                         translated.toLowerCase().includes(searchToQuery.toLowerCase());
    return matchesQuery && airport !== fromAirport;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="relative z-30 w-full px-4 sm:px-8 md:px-12 xl:px-24 mt-12 md:mt-24 animate-fade-in flex flex-col gap-0"
    >
      {/* Top Raised Selectors Row */}
      <div className="flex items-end justify-between w-full relative z-20 -mb-[1px]">
        
        {/* Trip Type Selector raised tab */}
        <div className="relative bg-[#0B1021]/90 backdrop-blur-[40px] border-t border-l border-white/20 rounded-tl-2xl px-4 py-3 flex items-center gap-2.5 w-fit min-h-[62px]">
          {tripTypes.map((type) => {
            const isActive = activeTrip === type.id;
            const displayLabel = type.id === 'round' 
              ? (dict?.roundTrip || type.label)
              : type.id === 'oneway'
                ? (dict?.oneWay || type.label)
                : (dict?.multiCity || type.label);
            return (
              <button
                key={type.id}
                onClick={() => {
                  setActiveTrip(type.id);
                  if (type.id === 'oneway') {
                    setReturnDate("");
                  }
                }}
                className={clsx(
                  "flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[14px] md:text-[15px] font-bold transition-all cursor-pointer whitespace-nowrap",
                  isActive 
                    ? "bg-[#0B162C] text-white border border-blue-500/80 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <type.icon className={clsx("w-4 h-4", isActive ? "text-blue-400" : "text-white/40")} />
                <span>{displayLabel}</span>
              </button>
            );
          })}

          {/* Slant Transition SVG */}
          <svg 
            className="absolute top-0 bottom-0 left-full w-6 text-white/20 backdrop-blur-[40px] pointer-events-none" 
            viewBox="0 0 24 62" 
            preserveAspectRatio="none"
          >
            <polygon points="0,0 0,62 24,62" fill="rgba(11, 16, 33, 0.9)" />
            <line x1="0" y1="0" x2="24" y2="62" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Right side alignment line with Class dropdown button hovering over it */}
        <div className="flex-1 flex justify-end items-center border-b border-white/35 pb-2.5 min-h-[62px]">
          {/* Class Select Dropdown Button */}
          <div ref={classDropdownRef} className="relative">
            <button 
              onClick={() => {
                setShowClassDropdown(prev => !prev);
                setShowFromDropdown(false);
                setShowToDropdown(false);
                setShowPassengerDropdown(false);
              }}
              className="bg-[#0B1021]/90 border border-white/20 hover:border-white/30 text-white/80 hover:text-white text-[13px] md:text-[14px] font-bold px-5 py-3 rounded-full flex items-center gap-2 transition-all cursor-pointer w-fit"
            >
              <Sparkles className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
              <span>{dict?.classes?.[selectedClass] || selectedClass}</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/45" />
            </button>

            {showClassDropdown && (
              <div 
                className="absolute start-0 sm:start-auto sm:end-0 mt-2 w-56 bg-[#0B1021]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl z-50 p-2.5 flex flex-col gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                {flightClasses.map((cls) => {
                  const isSelected = selectedClass === cls;
                  return (
                    <button
                      key={cls}
                      onClick={() => {
                        setSelectedClass(cls);
                        setShowClassDropdown(false);
                      }}
                      className={clsx(
                        "text-start w-full px-4 py-3 rounded-xl text-[14px] font-semibold transition-all cursor-pointer",
                        isSelected 
                          ? "text-blue-400 font-bold bg-white/5" 
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {dict?.classes?.[cls] || cls}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Main card containing Search fields */}
      <div className="relative w-full bg-white/35 backdrop-blur-[60px] border-x border-b border-white/35 rounded-b-[2.25rem] rounded-tr-[2.25rem] rounded-tl-none shadow-[0_25px_60px_-10px_rgba(0,0,0,0.7)] p-6 sm:p-8">
        
        {/* Search Fields Row */}
        <div className="flex flex-col md:grid md:grid-cols-2 xl:flex xl:flex-row xl:items-stretch items-center w-full gap-4 xl:gap-0 bg-black/20 border border-white/20 rounded-[2rem] p-3 sm:p-4.5 relative">
          
          {/* From & To Wrapper */}
          <div 
            ref={containerRef}
            className="flex flex-col md:flex-row relative items-stretch gap-0 md:col-span-2 xl:flex-[2.2] min-w-0 w-full bg-white/12 xl:bg-transparent border border-white/15 xl:border-0 rounded-2xl xl:rounded-none shadow-lg xl:shadow-none"
          >
            {/* From */}
            <div 
              className="flex-1 w-full min-w-0 px-8 py-5.5 border-b md:border-b-0 md:border-r border-white/10 flex flex-col items-start justify-center gap-1.5 cursor-pointer hover:bg-white/20 xl:hover:bg-white/12 transition-all rounded-t-2xl rounded-b-none md:rounded-l-2xl md:rounded-r-none xl:rounded-none relative"
            >
              <span className="block text-[13px] text-blue-400/95 font-bold tracking-wider uppercase">{dict?.from || "FROM"}</span>
              <div 
                onClick={() => {
                  setShowFromDropdown(true);
                  setShowToDropdown(false);
                  setShowPassengerDropdown(false);
                }}
                className="flex items-center gap-2 text-white/90 w-full min-w-0"
              >
                <MapPin className="w-4.5 h-4.5 text-blue-400 shrink-0" />
                {showFromDropdown ? (
                  <input
                    type="text"
                    placeholder={dict?.searchAirportPlaceholder || "Search airport..."}
                    value={searchFromQuery}
                    onChange={(e) => setSearchFromQuery(e.target.value)}
                    autoFocus
                    className="text-lg md:text-base font-bold text-white bg-transparent outline-none border-b border-blue-500/50 w-full min-w-0 placeholder:text-sm placeholder:font-normal placeholder:text-white/40"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span className="text-lg md:text-base font-bold text-white whitespace-nowrap truncate">
                    {dict?.airports?.[fromAirport] || fromAirport}
                  </span>
                )}
              </div>

              {/* From Dropdown */}
              {showFromDropdown && (
                <div 
                  className="absolute start-0 top-full mt-2 w-72 bg-[#0B1021]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl z-50 p-2 py-3 flex flex-col gap-1 max-h-60 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-[11px] font-semibold text-white/40 px-3 pb-1 border-b border-white/5 uppercase tracking-wider">{dict?.airportsTitle || "Airports"}</div>
                  {filteredFromAirports.length === 0 ? (
                    <div className="text-sm text-white/40 p-3">{dict?.noAirportsFound || "No airports found"}</div>
                  ) : (
                    filteredFromAirports.map((airport) => (
                      <button
                        key={airport}
                        onClick={() => {
                          setFromAirport(airport);
                          setSearchFromQuery("");
                          setShowFromDropdown(false);
                          triggerAnimation();
                        }}
                        className="text-start w-full text-white/80 hover:bg-white/5 hover:text-white px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
                      >
                        <Plane className="w-4 h-4 text-white/40 shrink-0" />
                        <span>{dict?.airports?.[airport] || airport}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Swap Button */}
            <button 
              onClick={handleSwap}
              className="relative z-10 w-9 h-9 rounded-full bg-[#0B1021] border border-white/15 flex items-center justify-center text-white hover:bg-slate-900 hover:border-white/30 shadow-sm transition-all cursor-pointer -my-2.5 md:-my-0 md:-mx-4.5 shrink-0"
            >
              <ArrowRightLeft className="w-4 h-4 rotate-90 md:rotate-0" />
            </button>

            {/* To */}
            <div 
              className="flex-1 w-full min-w-0 px-8 py-5.5 border-r-0 xl:border-r border-white/10 flex flex-col items-start justify-center gap-1.5 cursor-pointer hover:bg-white/20 xl:hover:bg-white/12 transition-all rounded-b-2xl rounded-t-none md:rounded-r-2xl md:rounded-l-none xl:rounded-none relative"
            >
              <span className="block text-[13px] text-blue-400/95 font-bold tracking-wider uppercase">{dict?.to || "TO"}</span>
              <div 
                onClick={() => {
                  setShowToDropdown(true);
                  setShowFromDropdown(false);
                  setShowPassengerDropdown(false);
                }}
                className="flex items-center gap-2 text-white/90 relative z-10 w-full min-w-0"
              >
                <MapPin className="w-4.5 h-4.5 text-blue-400 shrink-0" />
                {showToDropdown ? (
                  <input
                    type="text"
                    placeholder={dict?.searchAirportPlaceholder || "Search airport..."}
                    value={searchToQuery}
                    onChange={(e) => setSearchToQuery(e.target.value)}
                    autoFocus
                    className="text-lg md:text-base font-bold text-white bg-transparent outline-none border-b border-blue-500/50 w-full min-w-0 placeholder:text-sm placeholder:font-normal placeholder:text-white/40"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span className="text-lg md:text-base font-bold text-white whitespace-nowrap truncate">
                    {dict?.airports?.[toAirport] || toAirport}
                  </span>
                )}
              </div>

              {/* To Dropdown */}
              {showToDropdown && (
                <div 
                  className="absolute start-0 md:start-auto md:end-0 top-full mt-2 w-72 bg-[#0B1021]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl z-50 p-2 py-3 flex flex-col gap-1 max-h-60 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-[11px] font-semibold text-white/40 px-3 pb-1 border-b border-white/5 uppercase tracking-wider">{dict?.airportsTitle || "Airports"}</div>
                  {filteredToAirports.length === 0 ? (
                    <div className="text-sm text-white/40 p-3">{dict?.noAirportsFound || "No airports found"}</div>
                  ) : (
                    filteredToAirports.map((airport) => (
                      <button
                        key={airport}
                        onClick={() => {
                          setToAirport(airport);
                          setSearchToQuery("");
                          setShowToDropdown(false);
                          triggerAnimation();
                        }}
                        className="text-start w-full text-white/80 hover:bg-white/5 hover:text-white px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
                      >
                        <Plane className="w-4 h-4 text-white/40 shrink-0" />
                        <span>{dict?.airports?.[airport] || airport}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Airplane Flight Path Animation Overlay */}
            {isDesktop && takeoffKey > 0 && containerWidth > 0 && (
              <div 
                key={takeoffKey}
                className="absolute inset-0 pointer-events-none z-30 overflow-visible"
              >
                {/* SVG Path */}
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                  <motion.path
                    d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: [0, 1, 1], 
                      opacity: [0, 0.7, 0] 
                    }}
                    transition={{
                      duration: 2.6,
                      ease: "easeInOut",
                      times: [0, 0.7, 1]
                    }}
                  />
                </svg>

                {/* Smoke Puffs (Particles trailing the plane) */}
                {[0.06, 0.12, 0.18, 0.24, 0.30].map((delay, index) => (
                  <motion.div
                    key={`smoke-${index}`}
                    initial={{ 
                      x: startX, 
                      y: startY, 
                      scale: 0.2, 
                      opacity: 0 
                    }}
                    animate={{
                      x: [startX, controlX, endX],
                      y: [startY, controlY, endY],
                      scale: [0.2, 1.2, 2.0, 0.5],
                      opacity: [0, 0.8, 0.4, 0],
                    }}
                    transition={{
                      duration: 2.6,
                      delay: delay,
                      ease: "easeInOut",
                    }}
                    className="absolute rounded-full bg-slate-200/50 blur-[3px]"
                    style={{
                      left: 0,
                      top: 0,
                      width: '12px',
                      height: '12px',
                      marginLeft: '-6px',
                      marginTop: '-6px',
                    }}
                  />
                ))}

                {/* Plane Icon */}
                <motion.div
                  initial={{ 
                    x: startX, 
                    y: startY, 
                    scale: 0.6, 
                    opacity: 0, 
                    rotate: 0 
                  }}
                  animate={{
                    x: [startX, controlX, endX],
                    y: [startY, controlY, endY],
                    rotate: [0, 45, 90],
                    scale: [0.6, 1.1, 0.6],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.6,
                    ease: "easeInOut",
                  }}
                  className="absolute"
                  style={{
                    left: 0,
                    top: 0,
                    marginLeft: '-10px',
                    marginTop: '-10px',
                    scaleX: isRtl ? -1 : 1, // Flip horizontally for RTL
                    transformOrigin: 'center center'
                  }}
                >
                  <Plane className="w-5 h-5 text-blue-500 fill-blue-500/20" />
                </motion.div>
              </div>
            )}
          </div>

          {/* Departure */}
          <div 
            onClick={() => {
              departureInputRef.current?.showPicker();
            }}
            className="w-full xl:w-auto xl:min-w-0 xl:flex-1 px-8 py-5.5 flex items-center gap-4 cursor-pointer transition-all bg-white/12 border border-white/15 shadow-lg rounded-2xl hover:bg-white/20 xl:bg-transparent xl:border-0 xl:border-r xl:shadow-none xl:rounded-none xl:hover:bg-white/12 relative"
          >
            <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <Calendar className="w-6 h-6 text-blue-400" />
              <span className="absolute -top-1 -right-1 text-[13px] select-none">🚀</span>
            </div>
            <div className="flex flex-col items-start min-w-0">
              <span className="block text-[13px] text-blue-400/95 font-bold tracking-wider uppercase">{dict?.takeOffDate || "TAKE OFF DATE"}</span>
              <span className={clsx("tracking-tight transition-all", departureDate ? "text-lg md:text-base font-extrabold text-white" : "text-sm font-normal text-white/50")}>
                {departureDate ? new Date(departureDate).toLocaleDateString(lang || 'en', { month: 'short', day: 'numeric', year: 'numeric' }) : (dict?.datePlaceholder || "dd/mm/yyyy")}
              </span>
              <span className="text-[11px] text-white/40 font-medium whitespace-nowrap">{dict?.flyOutDesc || "When do you fly out?"}</span>
            </div>
            <input 
              ref={departureInputRef}
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
            />
          </div>

          {/* Return */}
          <div 
            onClick={() => {
              if (activeTrip !== 'oneway') {
                returnInputRef.current?.showPicker();
              }
            }}
            className={clsx(
              "w-full xl:w-auto xl:min-w-0 xl:flex-1 px-8 py-5.5 flex items-center gap-4 transition-all relative",
              "bg-white/12 border border-white/15 shadow-lg rounded-2xl",
              "xl:bg-transparent xl:border-0 xl:border-r xl:shadow-none xl:rounded-none",
              activeTrip === 'oneway' 
                ? "cursor-not-allowed opacity-50" 
                : "cursor-pointer hover:bg-white/20 xl:hover:bg-white/12"
            )}
          >
            <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center bg-purple-500/10 rounded-2xl border border-purple-500/20">
              <Calendar className="w-6 h-6 text-purple-400" />
              <span className="absolute -top-1 -right-1 text-[13px] select-none">🧭</span>
            </div>
            <div className="flex flex-col items-start min-w-0">
              <span className="block text-[13px] text-blue-400/95 font-bold tracking-wider uppercase">{dict?.landingDate || "LANDING DATE"}</span>
              <span className={clsx("tracking-tight transition-all", activeTrip === 'oneway' ? "text-lg md:text-base font-extrabold text-white/20" : (returnDate ? "text-lg md:text-base font-extrabold text-white" : "text-sm font-normal text-white/50"))}>
                {activeTrip === 'oneway' 
                  ? "—" 
                  : (returnDate ? new Date(returnDate).toLocaleDateString(lang || 'en', { month: 'short', day: 'numeric', year: 'numeric' }) : (dict?.datePlaceholder || "dd/mm/yyyy"))}
              </span>
              <span className="text-[11px] text-white/40 font-medium whitespace-nowrap">{dict?.returnDesc || "When do you return?"}</span>
            </div>
            <input 
              ref={returnInputRef}
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              disabled={activeTrip === 'oneway'}
              className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
            />
          </div>

          {/* Passengers */}
          <div 
            onClick={() => {
              setShowPassengerDropdown(prev => !prev);
              setShowFromDropdown(false);
              setShowToDropdown(false);
            }}
            className="w-full xl:w-auto xl:min-w-0 xl:flex-1 px-8 py-5.5 flex items-center gap-4 cursor-pointer transition-all bg-white/12 border border-white/15 shadow-lg rounded-2xl hover:bg-white/20 xl:bg-transparent xl:border-0 xl:shadow-none xl:rounded-none xl:hover:bg-white/12 relative"
          >
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex flex-col items-start min-w-0 w-full">
              <span className="block text-[13px] text-blue-400/95 font-bold tracking-wider uppercase">{dict?.peopleOnBoard || "PEOPLE ON BOARD"}</span>
              <div className="flex items-center gap-1.5 text-white w-full">
                <span className="text-lg md:text-base font-extrabold tracking-tight">
                  {adults + children + infants} {dict?.pax || "Pax"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-white/40" />
              </div>
              <span className="text-[11px] text-white/40 font-medium whitespace-nowrap">{dict?.howManyDesc || "How many flying?"}</span>
            </div>

            {/* Passengers Dropdown */}
            {showPassengerDropdown && (
              <div 
                className="absolute start-0 xl:start-auto xl:end-0 top-full mt-2 w-64 bg-[#0B1021]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl z-50 p-4 flex flex-col gap-4 text-white"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white/95">{dict?.adults || "Adults"}</p>
                    <p className="text-xs text-white/40">{dict?.adultsAge || "Age 12+"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setAdults(prev => Math.max(1, prev - 1))}
                      className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center font-bold text-white/80 hover:bg-white/5 hover:border-white/40"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-white w-4 text-center">{adults}</span>
                    <button
                      onClick={() => setAdults(prev => Math.min(9, prev + 1))}
                      className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center font-bold text-white/80 hover:bg-white/5 hover:border-white/40"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white/95">{dict?.children || "Children"}</p>
                    <p className="text-xs text-white/40">{dict?.childrenAge || "Age 2-11"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setChildren(prev => Math.max(0, prev - 1))}
                      className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center font-bold text-white/80 hover:bg-white/5 hover:border-white/40"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-white w-4 text-center">{children}</span>
                    <button
                      onClick={() => setChildren(prev => Math.min(9, prev + 1))}
                      className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center font-bold text-white/80 hover:bg-white/5 hover:border-white/40"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white/95">{dict?.infants || "Infants"}</p>
                    <p className="text-xs text-white/40">{dict?.infantsAge || "Under 2"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setInfants(prev => Math.max(0, prev - 1))}
                      className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center font-bold text-white/80 hover:bg-white/5 hover:border-white/40"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-white w-4 text-center">{infants}</span>
                    <button
                      onClick={() => setInfants(prev => Math.min(adults, prev + 1))}
                      className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center font-bold text-white/80 hover:bg-white/5 hover:border-white/40"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <Link 
            href={`/${lang || 'en'}/flights?from=${encodeURIComponent(fromAirport.split(' ')[0])}&to=${encodeURIComponent(toAirport.split(' ')[0])}`}
            className="xl:w-auto w-full bg-blue-600 hover:bg-blue-700 text-white px-10 py-[20px] rounded-3xl font-bold flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap text-[17px] cursor-pointer shadow-lg shadow-blue-500/25 ml-0 xl:ml-4"
          >
            <Plane className="w-4.5 h-4.5 rotate-45" />
            {dict?.searchFlights || "Search Flights"}
          </Link>

        </div>
      </div>
    </motion.div>
  );
}
