import Image from "next/image";
import StoreButtons from "@/app/components/StoreButtons";

// The body of /download, also shown by /r/<CODE> when the code isn't valid.
export default function DownloadContent() {
  return (
    <>
      <h1 className="mt-6 font-display text-[40px] leading-tight text-white sm:text-[44px]">Get Directive</h1>
      <p className="mt-3 max-w-[56ch] text-[14.5px] leading-relaxed text-white/70">
        Directive Fitness, by Directive LLC, for iPhone and Android.
      </p>
      <div className="mt-8">
        <StoreButtons />
      </div>
      <div className="mt-10 hidden items-center gap-5 sm:flex">
        <div className="rounded-md bg-white p-2">
          <Image src="/brand/download-qr.svg" alt="QR code for directivefitness.com/download" width={112} height={112} unoptimized />
        </div>
        <p className="max-w-[32ch] text-[13px] leading-relaxed text-white/55">
          On a computer? Scan this with your phone&apos;s camera to open the right store.
        </p>
      </div>
    </>
  );
}
