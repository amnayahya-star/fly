"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Globe, Menu, X, Bell, User, LogOut, Headphones, Calendar, ShieldCheck, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { getServerSession, performLogout } from '@/app/actions';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'fa', name: 'فارسی' }
];

const localDict = {
  en: {
    supportTitle: "24/7 Premium Support",
    supportPhone: "Phone: +1 800 555 AERO",
    supportEmail: "Email: support@aero.travel",
    supportChat: "Live chat: Active now",
    notifTitle: "Notifications",
    notifEmpty: "No new notifications",
    notif1: "Special Deal: Dubai to London starting from $499!",
    notif2: "Tip: Make sure passport is valid for 6 months.",
    welcome: "Welcome",
    myBookings: "My Bookings",
    adminPanel: "Admin Panel",
    logout: "Log Out",
    profile: "Profile"
  },
  ar: {
    supportTitle: "دعم عملاء 24/7",
    supportPhone: "الهاتف: ٨٠٠ ٥٥٥ AERO",
    supportEmail: "البريد: support@aero.travel",
    supportChat: "المحادثة المباشرة: متصل الآن",
    notifTitle: "التنبيهات",
    notifEmpty: "لا توجد تنبيهات جديدة",
    notif1: "عرض مميز: دبي إلى لندن تبدأ من $499!",
    notif2: "نصيحة: تأكد من صلاحية جواز سفرك لـ 6 أشهر.",
    welcome: "أهلاً بك",
    myBookings: "حجوزاتي",
    adminPanel: "لوحة الإدارة",
    logout: "تسجيل الخروج",
    profile: "الملف الشخصي"
  },
  fa: {
    supportTitle: "پشتیبانی ۲۴/۷",
    supportPhone: "تلفن: ۸۰۰ ۵۵۵ AERO",
    supportEmail: "ایمیل: support@aero.travel",
    supportChat: "گفتگوی زنده: فعال است",
    notifTitle: "اعلان‌ها",
    notifEmpty: "اعلان جدیدی وجود ندارد",
    notif1: "پیشنهاد ویژه: دبی به لندن شروع از $499!",
    notif2: "نکته: از اعتبار ۶ ماهه پاسپورت خود مطمئن شوید.",
    welcome: "خوش آمدید",
    myBookings: "رزروهای من",
    adminPanel: "پنل مدیریت",
    logout: "خروج از حساب",
    profile: "پروفایل کاربری"
  }
};

const dropdownAnimation = {
  initial: { opacity: 0, y: -12, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.95 },
  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }
};

export default function Navbar({ dict, lang }: { dict: any, lang: string }) {
  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const langRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  
  const pathname = usePathname();
  const t = localDict[lang as 'en' | 'ar' | 'fa'] || localDict.en;

  const navLinks = [
    { name: dict.flights, href: `/${lang}/flights` },
    { name: dict.hotels, href: `/${lang}/hotels` },
    { name: dict.deals, href: `/${lang}/deals` },
    { name: dict.manageBooking, href: `/${lang}/manage-booking` },
    { name: dict.checkIn, href: `/${lang}/check-in` },
  ];

  useEffect(() => {
    // Load session info on mount
    async function fetchSession() {
      const sess = await getServerSession();
      setSession(sess);
    }
    fetchSession();

    // Load theme setting
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (langRef.current && !langRef.current.contains(target)) {
        setLangOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(target)) {
        setNotifOpen(false);
      }
      if (supportRef.current && !supportRef.current.contains(target)) {
        setSupportOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await performLogout();
    window.location.reload();
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setTheme(nextTheme);
  };

  const isLinkActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/');
  };

  const isGoldTheme = lang === 'ar' || lang === 'fa';

  return (
    <nav className={clsx(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 flex items-center justify-between",
      scrolled 
        ? "py-3.5 px-6 md:px-12 bg-background/85 backdrop-blur-xl border-b border-foreground/10 shadow-[0_4px_30px_rgba(0,0,0,0.15)] text-foreground" 
        : "py-6 px-8 bg-transparent border-b border-transparent text-white"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer group">
        <Link href={`/${lang}`}>
          <svg className={clsx("w-14 h-auto transform group-hover:scale-105 transition-transform duration-300", scrolled ? "text-foreground" : "text-white")} viewBox="0 0 100 45" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 25 Q 30 5 95 0 Q 50 15 12 23 Z" />
            <path d="M 6 31 Q 35 15 88 14 Q 45 25 18 29 Z" />
            <path d="M 12 37 Q 40 25 82 28 Q 40 35 24 35 Z" />
          </svg>
        </Link>
        <Link href={`/${lang}`} className="flex flex-col justify-center pt-1">
          <span className={clsx("text-xl md:text-2xl font-bold tracking-tight md:tracking-wide leading-none font-sans drop-shadow-sm", scrolled ? "text-foreground" : "text-white")}>
            {(lang === 'ar' || lang === 'fa') ? "شاطئ الهندية" : "Shati Alhindia"}
          </span>
          <span className={clsx("text-[0.6rem] tracking-[0.2em] uppercase mt-1.5 ml-0.5 font-semibold", scrolled ? "text-foreground/80" : "text-white/80")}>
            {(lang === 'ar' || lang === 'fa') ? "حلق بعيداً" : "Fly Beyond"}
          </span>
        </Link>
      </div>

      {/* Center Links */}
      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => {
          const active = isLinkActive(link.href);
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={clsx(
                "text-sm font-semibold transition-all duration-300 relative py-1.5 group whitespace-nowrap",
                active 
                  ? (scrolled ? "text-foreground" : "text-white") 
                  : (scrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white")
              )}
            >
              <span>{link.name}</span>
              {active ? (
                <span className={clsx(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]",
                  isGoldTheme ? "bg-[#D4AF37] text-[#D4AF37]" : "bg-[#4CA1FF] text-[#4CA1FF]"
                )} />
              ) : (
                <span className={clsx(
                  "absolute bottom-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full",
                  isGoldTheme ? "bg-[#D4AF37]/80" : "bg-[#4CA1FF]/80"
                )} />
              )}
            </Link>
          );
        })}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3.5 md:gap-5">
        
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className={clsx(
            "p-2 rounded-full transition-colors cursor-pointer",
            scrolled ? "text-foreground/70 hover:text-foreground hover:bg-foreground/5" : "text-white/70 hover:text-white hover:bg-white/5"
          )}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>

        {/* Support Dropdown */}
        <div className="relative" ref={supportRef}>
          <button 
            onClick={() => {
              setSupportOpen(!supportOpen);
              setLangOpen(false);
              setNotifOpen(false);
              setProfileOpen(false);
            }}
            className={clsx(
              "flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer py-2 px-1",
              scrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"
            )}
          >
            <Headphones className={clsx("w-4.5 h-4.5", scrolled ? "text-foreground/60" : "text-white/60")} />
            <span className="hidden md:inline">{dict.support}</span>
          </button>

          <AnimatePresence>
            {supportOpen && (
              <motion.div 
                {...dropdownAnimation}
                className="absolute top-full end-0 mt-3 w-64 bg-background/95 backdrop-blur-2xl border border-foreground/10 rounded-2xl overflow-hidden shadow-2xl p-4 z-50 text-foreground flex flex-col gap-3.5"
              >
                <div className="flex items-center gap-2 border-b border-foreground/10 pb-2">
                  <Headphones className={clsx("w-5 h-5", isGoldTheme ? "text-[#D4AF37]" : "text-[#4CA1FF]")} />
                  <span className="font-bold text-sm">{t.supportTitle}</span>
                </div>
                <div className="flex flex-col gap-2.5 text-xs text-foreground/80 font-medium">
                  <p className="hover:text-foreground transition-colors">{t.supportPhone}</p>
                  <p className="hover:text-foreground transition-colors">{t.supportEmail}</p>
                </div>
                <div className="mt-1 flex items-center gap-2 bg-foreground/5 border border-foreground/10 rounded-xl p-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-foreground/90">{t.supportChat}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications Bell */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => {
              setNotifOpen(!notifOpen);
              setLangOpen(false);
              setSupportOpen(false);
              setProfileOpen(false);
            }}
            className={clsx(
              "p-2 rounded-full transition-colors cursor-pointer relative",
              scrolled ? "text-foreground/70 hover:text-foreground hover:bg-foreground/5" : "text-white/70 hover:text-white hover:bg-white/5"
            )}
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div 
                {...dropdownAnimation}
                className="absolute top-full end-0 mt-3 w-80 bg-background/95 backdrop-blur-2xl border border-foreground/10 rounded-2xl overflow-hidden shadow-2xl p-4 z-50 text-foreground flex flex-col gap-3.5"
              >
                <div className="flex items-center justify-between border-b border-foreground/10 pb-2">
                  <span className="font-bold text-sm flex items-center gap-2">
                    <Bell className={clsx("w-4 h-4", isGoldTheme ? "text-[#D4AF37]" : "text-[#4CA1FF]")} />
                    {t.notifTitle}
                  </span>
                  <span className="text-[10px] bg-red-500/10 text-red-400 font-bold px-2 py-0.5 rounded-full">2 New</span>
                </div>
                <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
                  <div className="flex gap-2.5 items-start p-2.5 rounded-xl bg-foreground/5 border border-foreground/5 hover:border-foreground/15 transition-all">
                    <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground/80 leading-relaxed font-medium">{t.notif1}</p>
                  </div>
                  <div className="flex gap-2.5 items-start p-2.5 rounded-xl bg-foreground/5 border border-foreground/5 hover:border-foreground/15 transition-all">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground/80 leading-relaxed font-medium">{t.notif2}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Languages Selector */}
        <div className="relative" ref={langRef}>
          <button 
            onClick={() => {
              setLangOpen(!langOpen);
              setNotifOpen(false);
              setSupportOpen(false);
              setProfileOpen(false);
            }}
            className={clsx(
              "flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer py-2 px-1",
              scrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"
            )}
          >
            <Globe className={clsx("w-4 h-4", scrolled ? "text-foreground/60" : "text-white/60")} />
            <span>{lang}</span>
            <svg className={clsx("w-3 h-3 transition-transform duration-300", scrolled ? "text-foreground/50" : "text-white/50", langOpen && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <AnimatePresence>
            {langOpen && (
              <motion.div 
                {...dropdownAnimation}
                className="absolute top-full end-0 mt-3 w-36 bg-background/95 backdrop-blur-2xl border border-foreground/10 rounded-2xl overflow-hidden shadow-2xl py-2.5 z-50"
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      const currentPath = window.location.pathname;
                      const newPath = currentPath.replace(`/${lang}`, `/${l.code}`);
                      window.location.href = newPath || `/${l.code}`;
                    }}
                    className={clsx(
                      "w-full text-start px-4 py-2.5 text-sm transition-colors flex items-center justify-between cursor-pointer",
                      lang === l.code 
                        ? 'bg-foreground/10 text-foreground font-bold' 
                        : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
                    )}
                  >
                    <span>{l.name}</span>
                    {lang === l.code && (
                      <div className={clsx(
                        "w-2 h-2 rounded-full",
                        isGoldTheme ? 'bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'bg-[#4CA1FF] shadow-[0_0_8px_rgba(76,161,255,0.8)]'
                      )}></div>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Session / Authentication Buttons */}
        {session && session.user ? (
          /* Logged In State: User Dropdown */
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => {
                setProfileOpen(!profileOpen);
                setLangOpen(false);
                setNotifOpen(false);
                setSupportOpen(false);
              }}
              className="flex items-center justify-center p-0.5 rounded-full border border-foreground/15 hover:border-foreground/35 transition-all cursor-pointer relative z-10 hover:scale-105 active:scale-95 duration-200"
            >
              <div className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-[#060b19]",
                isGoldTheme 
                  ? "bg-gradient-to-r from-[#b89020] to-[#e6c250] shadow-[0_0_8px_rgba(212,175,55,0.4)]" 
                  : "bg-gradient-to-r from-[#4CA1FF] to-[#0052CC] shadow-[0_0_8px_rgba(76,161,255,0.4)]"
              )}>
                {session.user.email.charAt(0).toUpperCase()}
              </div>
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div 
                  {...dropdownAnimation}
                  className="absolute top-full end-0 mt-3 w-56 bg-background/95 backdrop-blur-2xl border border-foreground/10 rounded-2xl overflow-hidden shadow-2xl p-2.5 z-50 text-foreground flex flex-col gap-1"
                >
                  <div className="px-3.5 py-2.5 border-b border-foreground/5 flex flex-col gap-0.5">
                    <span className="text-[10px] text-foreground/45 uppercase font-bold tracking-wider leading-none">{t.profile}</span>
                    <span className="text-sm font-bold text-foreground truncate max-w-full">{session.user.name || session.user.email.split('@')[0]}</span>
                    <span className="text-[11px] text-foreground/40 truncate max-w-full font-medium">{session.user.email}</span>
                  </div>
                  
                  <Link 
                    href={`/${lang}/manage-booking`}
                    className="w-full text-start px-3.5 py-2.5 text-sm rounded-xl text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-colors flex items-center gap-2.5 font-semibold"
                  >
                    <Calendar className="w-4 h-4 text-foreground/40" />
                    <span>{t.myBookings}</span>
                  </Link>

                  {session.user.role === 'ADMIN' && (
                    <Link 
                      href={`/${lang}/admin`}
                      className="w-full text-start px-3.5 py-2.5 text-sm rounded-xl text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-colors flex items-center gap-2.5 font-semibold"
                    >
                      <User className="w-4 h-4 text-foreground/40" />
                      <span>{t.adminPanel}</span>
                    </Link>
                  )}

                  <button 
                    onClick={handleLogout}
                    className="w-full text-start px-3.5 py-2.5 text-sm rounded-xl text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2.5 font-bold border-t border-foreground/5 mt-1 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t.logout}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Guest State: Sign In / Sign Up */
          <>
            <Link 
              href={`/${lang}/signin`} 
              className={clsx(
                "text-sm font-semibold transition-colors hidden sm:block",
                scrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"
              )}
            >
              {dict.signIn}
            </Link>
            <Link 
              href={`/${lang}/signup`} 
              className={clsx(
                "px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-md flex items-center justify-center cursor-pointer",
                isGoldTheme
                  ? 'bg-gradient-to-r from-[#b89020] to-[#e6c250] text-[#060b19] hover:from-[#a07a16] hover:to-[#d4b037] shadow-[0_4px_15px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.45)]'
                  : 'bg-gradient-to-r from-[#0052CC] to-[#4CA1FF] text-white hover:from-[#003d99] hover:to-[#0052CC] shadow-[0_4px_15px_rgba(76,161,255,0.25)] hover:shadow-[0_4px_25px_rgba(76,161,255,0.45)]'
              )}
            >
              {dict.signUp}
            </Link>
          </>
        )}

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={clsx(
            "lg:hidden p-2 transition-colors cursor-pointer rounded-lg border",
            scrolled 
              ? "text-foreground/80 hover:text-foreground border-foreground/10 bg-foreground/5" 
              : "text-white/80 hover:text-white border-white/10 bg-white/5"
          )}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] md:top-[72px] bottom-0 bg-background/95 backdrop-blur-3xl z-40 border-t border-foreground/10 p-6 flex flex-col justify-between overflow-y-auto animate-fade-in text-foreground">
          
          {/* Main Links */}
          <div className="flex flex-col gap-6 mt-4">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    "text-lg font-bold pb-2 border-b border-foreground/5 transition-all flex items-center justify-between",
                    active 
                      ? (isGoldTheme ? 'text-[#D4AF37]' : 'text-[#4CA1FF]') 
                      : 'text-foreground/80 hover:text-foreground'
                  )}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span className={clsx(
                      "w-1.5 h-1.5 rounded-full",
                      isGoldTheme ? 'bg-[#D4AF37]' : 'bg-[#4CA1FF]'
                    )} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Info (Support & Notifications on Mobile) */}
          <div className="flex flex-col gap-4 bg-foreground/5 border border-foreground/5 rounded-2xl p-4 my-6 text-xs">
            <div className="flex flex-col gap-2">
              <span className="font-bold flex items-center gap-1.5 text-foreground/45 text-[10px] uppercase tracking-wider">{t.supportTitle}</span>
              <p className="font-medium text-foreground/80">{t.supportPhone}</p>
              <p className="font-medium text-foreground/80">{t.supportEmail}</p>
            </div>
            <div className="border-t border-foreground/5 pt-3 flex flex-col gap-2.5">
              <span className="font-bold flex items-center gap-1.5 text-foreground/45 text-[10px] uppercase tracking-wider">{t.notifTitle}</span>
              <div className="flex items-start gap-2 text-foreground/85">
                <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{t.notif1}</p>
              </div>
            </div>
          </div>

          {/* Bottom Actions inside Mobile Drawer */}
          <div className="flex flex-col gap-5 border-t border-foreground/10 pt-6 pb-8">
            <div className="flex items-center justify-between">
              
              {/* Theme Toggle & Live Chat */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-colors cursor-pointer"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <span className="text-xs font-semibold text-foreground/75">
                  {t.supportChat}
                </span>
              </div>

              {/* Language Selector in Mobile Menu */}
              <div className="flex items-center gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      const currentPath = window.location.pathname;
                      const newPath = currentPath.replace(`/${lang}`, `/${l.code}`);
                      window.location.href = newPath || `/${l.code}`;
                    }}
                    className={clsx(
                      "text-xs px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer font-bold",
                      lang === l.code 
                        ? (isGoldTheme 
                            ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10' 
                            : 'border-[#4CA1FF] text-[#4CA1FF] bg-[#4CA1FF]/10')
                        : 'border-foreground/10 text-foreground/60 hover:text-foreground hover:border-foreground/30'
                    )}
                  >
                    {l.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {session && session.user ? (
              /* Mobile Logged In Buttons */
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 bg-foreground/5 border border-foreground/5 p-3 rounded-2xl">
                  <div className={clsx(
                    "w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-[#060b19]",
                    isGoldTheme ? "bg-gradient-to-r from-[#b89020] to-[#e6c250]" : "bg-gradient-to-r from-[#4CA1FF] to-[#0052CC]"
                  )}>
                    {session.user.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm font-bold truncate text-foreground">{session.user.name || session.user.email.split('@')[0]}</span>
                    <span className="text-[11px] text-foreground/40 truncate font-semibold">{session.user.email}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {session.user.role === 'ADMIN' && (
                    <Link
                      href={`/${lang}/admin`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-xl border border-foreground/10 text-center text-xs font-bold text-foreground/80 hover:text-foreground transition-all flex items-center justify-center"
                    >
                      {t.adminPanel}
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className={clsx(
                      "px-4 py-3 rounded-xl text-center text-xs font-bold text-red-400 border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 transition-all flex items-center justify-center cursor-pointer",
                      session.user.role !== 'ADMIN' && "col-span-2"
                    )}
                  >
                    <LogOut className="w-3.5 h-3.5 me-1.5" />
                    {t.logout}
                  </button>
                </div>
              </div>
            ) : (
              /* Mobile Guest Buttons */
              <div className="grid grid-cols-2 gap-4 mt-2">
                <Link
                  href={`/${lang}/signin`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl border border-foreground/10 text-center text-sm font-bold text-foreground/85 hover:text-foreground hover:bg-foreground/5 transition-all"
                >
                  {dict.signIn}
                </Link>
                <Link
                  href={`/${lang}/signup`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    "px-4 py-3 rounded-xl text-center text-sm font-extrabold transition-all flex items-center justify-center",
                    isGoldTheme
                      ? 'bg-gradient-to-r from-[#b89020] to-[#e6c250] text-[#060b19]'
                      : 'bg-gradient-to-r from-[#0052CC] to-[#4CA1FF] text-white'
                  )}
                >
                  {dict.signUp}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
