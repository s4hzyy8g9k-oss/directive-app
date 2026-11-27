import { stores } from "@/app/content";

// The two store buttons, shared by /download and /r/<CODE>. A store that isn't live yet shows "coming soon".
const btn =
  "flex w-full items-center justify-center gap-3 rounded border px-5 py-4 text-[14px] font-semibold tracking-[0.08em] sm:w-auto";

export default function StoreButtons() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {stores.appStore ? (
        <a href={stores.appStore} className={`${btn} border-gold bg-gold text-space hover:brightness-110`}>
          DOWNLOAD ON THE APP STORE
        </a>
      ) : (
        <span className={`${btn} border-white/15 text-white/50`}>APP STORE: COMING SOON</span>
      )}
      {stores.googlePlay ? (
        <a href={stores.googlePlay} className={`${btn} border-gold bg-gold text-space hover:brightness-110`}>
          GET IT ON GOOGLE PLAY
        </a>
      ) : (
        <span className={`${btn} border-white/15 text-white/50`}>GOOGLE PLAY: COMING SOON</span>
      )}
    </div>
  );
}

export function platform(ua: string): "ios" | "android" | "other" {
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  return "other";
}
