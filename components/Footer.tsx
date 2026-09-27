import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0d0d0d] px-5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              width={32}
              height={32}
              priority
            />

            <span className="text-2xl font-black tracking-tight text-white">
              FITLOG
            </span>
          </Link>
        </div>

        <p className="text-sm text-white/40">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;