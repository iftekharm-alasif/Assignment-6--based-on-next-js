import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-[#111111] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        
        {/* Left Content */}
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            Workout Library
          </p>

          <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
            Train With Intent. Log Every Set.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/60 md:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* center */}
          <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-3 bg-[#ccff00] px-6 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:bg-white"
          >
            Browse Workouts
            <span className="text-lg">→</span>
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative">
          <Image
            src="/assets/banner.png"
            alt="FitLog workout banner"
            width={800}
            height={600}
            priority
            className="h-auto w-full object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;