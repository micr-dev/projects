"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";

interface Skiper10Props {
  children: React.ReactNode;
  onComplete?: () => void;
  preloadTiers?: readonly (readonly string[])[];
}

const PRELOAD_CONCURRENCY = 8;
const EMPTY_PRELOAD_TIERS: readonly (readonly string[])[] = [];

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
}

async function preloadTier(
  urls: readonly string[],
  isCancelled: () => boolean,
) {
  let nextIndex = 0;

  const worker = async () => {
    while (!isCancelled()) {
      const index = nextIndex;
      nextIndex += 1;

      if (index >= urls.length) {
        return;
      }

      await preloadImage(urls[index]);
    }
  };

  await Promise.all(
    Array.from(
      { length: Math.min(PRELOAD_CONCURRENCY, urls.length) },
      worker,
    ),
  );
}

const Skiper10 = ({
  children,
  onComplete,
  preloadTiers = EMPTY_PRELOAD_TIERS,
}: Skiper10Props) => {
  const [showPreloader, setShowPreloader] = useState(true);
  const finishIntro = useCallback(() => setShowPreloader(false), []);

  useEffect(() => {
    if (showPreloader) return;
    let cancelled = false;
    const preloadAllTiers = async () => {
      for (const tier of preloadTiers) {
        await preloadTier(tier, () => cancelled);
        if (cancelled) return;
      }
    };
    // Keep image decoding out of the signature animation window.
    void preloadAllTiers();
    return () => { cancelled = true; };
  }, [preloadTiers, showPreloader]);

  useEffect(() => {
    if (!showPreloader) onComplete?.();
  }, [onComplete, showPreloader]);

  useEffect(() => {
    if (!showPreloader) return;
    const { body, documentElement } = document;
    const bodyOverflow = body.style.overflow;
    const documentOverflow = documentElement.style.overflow;
    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    return () => {
      body.style.overflow = bodyOverflow;
      documentElement.style.overflow = documentOverflow;
    };
  }, [showPreloader]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen bg-[#121212]">
        {showPreloader ? <SignaturePreloader onComplete={finishIntro} /> : children}
      </main>
    </MotionConfig>
  );
};

// Blog signature outlines, preserved in font units to avoid a runtime font request.
const SIGNATURE_PATHS = [
  { offset: 0, d: "M3818 -2985Q3796 -2985 3766 -2973Q3682 -2939 3631 -2833Q3608 -2791 3597.5 -2740.0Q3587 -2689 3578 -2581Q3569 -2480 3569 -2427Q3569 -2384 3573 -2329Q3612 -1599 3957 -224Q4068 219 4173.0 578.5Q4278 938 4418 1353Q4592 1876 4804.0 2427.0Q5016 2978 5362 3808Q5461 4045 5523.5 4215.0Q5586 4385 5586 4412Q5586 4416 5583 4416Q5572 4416 5506 4356Q5428 4284 5322 4171Q4677 3483 3624 2023Q3267 1528 3069 1268Q2666 736 2456 576Q2338 487 2245 487Q2119 487 2069 640Q2057 678 2051.0 742.5Q2045 807 2045 849Q2052 1127 2194 1650Q2203 1682 2203 1694Q2203 1697 2203 1697Q2199 1697 2105 1530Q1738 896 1227 113Q962 -293 848 -466Q515 -965 375.5 -1183.0Q236 -1401 190 -1494Q151 -1573 125.0 -1599.5Q99 -1626 71 -1626Q53 -1626 33 -1611Q8 -1593 8 -1565Q8 -1541 28.0 -1511.5Q48 -1482 86 -1409Q172 -1238 723 -413Q1487 722 2026 1659Q2370 2257 2418 2365Q2441 2427 2493 2571Q2579 2814 2651.5 2991.5Q2724 3169 2812 3352Q2890 3518 2924 3557Q2951 3588 2983 3588Q3059 3588 3059 3499Q3059 3463 3033 3374Q2949 3102 2632 2484Q2553 2334 2526 2264Q2511 2223 2489 2157Q2230 1390 2180 911Q2177 885 2177 857Q2177 817 2182 773Q2191 649 2224 627Q2235 620 2250 620Q2364 620 2685 998Q2818 1153 2996.5 1390.0Q3175 1627 3502 2080Q3814 2513 4020.5 2787.5Q4227 3062 4459 3355Q5437 4586 5632 4586Q5652 4586 5668 4578Q5701 4565 5717 4527Q5722 4515 5724 4463Q5724 4414 5701 4331Q5676 4238 5599.0 4043.0Q5522 3848 5373 3490Q4873 2289 4576 1409Q4416 938 4298.0 535.0Q4180 132 4062 -352Q3703 -1813 3703 -2443Q3703 -2657 3741 -2755Q3765 -2819 3812.5 -2847.0Q3860 -2875 3870.5 -2891.5Q3881 -2908 3881 -2921Q3881 -2933 3876 -2946Q3859 -2985 3818 -2985Z" },
  { offset: 5363, d: "M101 -254Q2 -254 -73 -192Q-157 -123 -157 0Q-157 55 -135 148Q-119 219 -95 289Q-56 394 1 515Q87 700 126 722Q140 731 155 731Q217 731 237 669Q241 655 241 642Q241 613 216.0 598.0Q191 583 120 431Q-21 132 -21 -32Q-21 -78 3.5 -98.5Q28 -119 47.5 -120.0Q67 -121 71 -121Q104 -121 157 -106Q246 -84 353.5 -31.0Q461 22 698 161Q874 263 1138 431Q1199 469 1295 527Q1316 538 1335 538Q1362 538 1385 517Q1400 489 1400 464Q1400 424 1369 403Q1325 381 1069 216Q984 162 844 80Q579 -74 481 -127Q227 -254 101 -254ZM260 1126Q237 1126 216 1144Q187 1167 187 1208Q187 1223 204 1258Q222 1297 239.0 1310.0Q256 1323 281 1323Q317 1323 351 1293Q380 1266 380 1240Q380 1228 375 1217Q366 1192 343 1186Q329 1183 318 1163Q301 1126 260 1126Z" },
  { offset: 6664, d: "M116 -130H56Q1 -130 -29 -124Q-151 -95 -173.0 -30.5Q-195 34 -195 74Q-195 149 -155 247Q-96 397 56 545Q317 804 501 804Q573 804 633 765Q653 750 669 726Q689 693 689 660Q689 634 675 615Q657 592 626 592Q585 592 564 636Q553 659 537.5 665.5Q522 672 501 672Q453 672 382 635Q281 581 161 465Q59 365 -1.0 260.5Q-61 156 -61 77Q-61 54 -58.5 45.5Q-56 37 -46 28Q-32 13 -6.0 7.0Q20 1 82 1Q206 1 437 74Q681 151 1181 352Q1687 554 1748 554Q1771 554 1788 534Q1807 516 1807 493Q1807 458 1778 439Q1756 425 1706 409Q1593 375 1237 232Q460 -82 219 -119Q162 -129 116 -130Z" },
  { offset: 8378, d: "M949 -965Q906 -965 874 -958Q754 -928 687 -835Q633 -763 633 -645Q633 -568 656 -471Q727 -144 1103 493Q1172 609 1239 767Q1282 865 1298.0 927.5Q1314 990 1314 1057Q1314 1162 1272.0 1219.0Q1230 1276 1134 1302Q1095 1313 972 1313Q804 1313 624.5 1223.0Q445 1133 307.5 995.0Q170 857 126 725Q111 678 111 637Q111 610 117 586Q130 532 130 509Q130 494 113 477Q94 454 64 454Q23 454 0 497Q-25 545 -25 636Q-25 816 129 1002Q304 1215 565 1346Q779 1453 1004 1453Q1113 1453 1205 1423Q1452 1340 1452 1053Q1452 963 1426 876Q1363 663 1174 342Q928 -77 826 -371Q771 -545 771 -648Q771 -685 778 -713Q788 -743 813.0 -770.5Q838 -798 867 -812Q906 -827 964 -827Q1007 -827 1049 -817Q1286 -756 1571 -538Q1678 -454 1840.5 -310.0Q2003 -166 2149 -27Q2712 503 2766 518Q2777 520 2787 520Q2818 520 2839 496Q2855 477 2855 454Q2855 414 2814 388Q2779 365 2653 250Q2399 22 2226 -142Q1903 -448 1693 -615Q1253 -965 949 -965Z" },
  { offset: 11121, d: "M-103 -316Q-123 -316 -141 -310Q-259 -268 -259 -71Q-259 146 -28 447Q64 567 118 599Q148 613 174 613Q194 613 212 605Q253 586 255 537Q255 505 236.5 486.0Q218 467 191 467H182Q165 467 144 445Q130 429 104 397Q-125 108 -125 -87Q-125 -141 -104 -170L-94 -182L-66 -167Q-10 -137 47.0 -75.5Q104 -14 141.0 54.5Q178 123 178 185Q178 233 155.5 279.5Q133 326 133 342Q133 355 140 371Q157 412 201 412Q227 412 268 375Q400 265 738 265Q983 265 1190 314Q1330 349 1522 413Q1609 442 1644 456Q1842 541 1857 541Q1871 541 1889.5 529.5Q1908 518 1916 503Q1921 494 1921 477Q1921 453 1915 442Q1905 423 1815 383Q1764 360 1674 322Q1620 299 1394 231Q1303 203 1245 188Q1131 158 1016.0 145.5Q901 133 718 133Q608 133 544 140Q464 148 373 175Q328 187 321 187Q315 187 313.0 184.0Q311 181 311 170Q312 166 312 161Q312 84 251.0 -24.5Q190 -133 105 -210Q-18 -316 -103 -316Z" },
  { offset: 12942, d: "M116 -130H56Q1 -130 -29 -124Q-151 -95 -173.0 -30.5Q-195 34 -195 74Q-195 149 -155 247Q-96 397 56 545Q317 804 501 804Q573 804 633 765Q653 750 669 726Q689 693 689 660Q689 634 675 615Q657 592 626 592Q585 592 564 636Q553 659 537.5 665.5Q522 672 501 672Q453 672 382 635Q281 581 161 465Q59 365 -1.0 260.5Q-61 156 -61 77Q-61 54 -58.5 45.5Q-56 37 -46 28Q-32 13 -6.0 7.0Q20 1 82 1Q206 1 437 74Q681 151 1181 352Q1687 554 1748 554Q1771 554 1788 534Q1807 516 1807 493Q1807 458 1778 439Q1756 425 1706 409Q1593 375 1237 232Q460 -82 219 -119Q162 -129 116 -130Z" },
  { offset: 14656, d: "M1224 -741Q981 -741 858 -545Q790 -437 683 -199Q590 11 545 81Q490 81 463.0 84.5Q436 88 352 107Q341 104 296 43Q96 -226 -12 -414Q-29 -443 -29 -473V-483Q-29 -503 -35.5 -510.5Q-42 -518 -54 -529Q-78 -551 -92 -580Q-120 -637 -160 -637Q-175 -637 -191 -630Q-229 -612 -229 -570Q-229 -542 -213.0 -502.5Q-197 -463 -197.0 -453.0Q-197 -443 -111 -4Q-74 192 19 569Q87 845 170 1092Q335 1599 544 2004Q888 2680 1234 3041Q1495 3316 1673 3399Q1753 3440 1816 3440Q1861 3440 1898 3420Q2015 3363 2015 3163Q2015 3102 2005 3018Q1991 2903 1968 2821Q1937 2719 1874.0 2581.0Q1811 2443 1744 2331Q1630 2142 1463.5 1913.5Q1297 1685 1130 1488Q1073 1422 944 1267Q752 1039 531 827L358 660Q256 560 196 514Q142 471 134 458Q120 416 63 159Q7 -93 7 -117Q13 -117 59 -51Q102 10 167 98Q225 178 225 181Q225 187 211.0 212.0Q197 237 197 274Q197 312 211.5 341.5Q226 371 255.0 386.0Q284 401 311 401Q337 401 397 386Q580 592 738 734Q866 849 1002 937Q1315 1140 1549 1147Q1701 1147 1763 1046Q1779 1019 1779 987Q1779 950 1776 934Q1769 897 1714 814Q1682 767 1647 727Q1616 692 1553 636Q1368 471 1084 307Q887 193 735 131Q690 113 690 109Q717 57 814 -156Q914 -381 974 -474Q1054 -602 1221 -602H1242Q1352 -602 1526 -531Q1633 -489 1699.5 -441.5Q1766 -394 1863 -325Q1997 -230 2131.0 -112.0Q2265 6 2556 298Q2779 521 2791 529Q2799 534 2820 534Q2847 534 2859 526Q2886 504 2886 475Q2886 452 2870 425Q2856 405 2767.0 314.5Q2678 224 2527.5 74.0Q2377 -76 2318 -130Q1889 -524 1587 -654Q1377 -741 1224 -741ZM609 231Q643 242 662.0 249.5Q681 257 702 265Q804 308 954 392Q1260 562 1437 716Q1575 836 1626 933Q1642 964 1642 976Q1642 981 1634 988Q1611 1007 1552 1007Q1493 1007 1441 994Q1116 902 782 588Q674 483 580 384Q528 329 528 324Q528 319 536.0 308.0Q544 297 609 231ZM193 696Q202 695 478 970Q729 1219 796 1302Q878 1402 963 1502Q1198 1778 1394.0 2051.0Q1590 2324 1691 2515Q1723 2576 1762.5 2666.5Q1802 2757 1823 2818Q1874 2962 1875 3148Q1875 3231 1866 3256Q1846 3303 1813 3303Q1782 3303 1712.0 3264.5Q1642 3226 1570 3170Q1507 3119 1398.0 3010.0Q1289 2901 1227 2828Q1064 2633 909 2377Q542 1786 312 1087Q285 1006 258.0 919.0Q231 832 212.0 767.5Q193 703 193 696Z" },
];

function SignaturePreloader({ onComplete }: { onComplete: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const maskId = useId();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }
    const svg = svgRef.current;
    if (!svg) return;
    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("mask path"));
    const lengths = paths.map((path) => path.getTotalLength());
    const totalLength = lengths.reduce((sum, length) => sum + length, 0);
    let consumedLength = 0;
    // Precompute the reference's cubic pen timing once. The browser owns playback.
    const penAnimations = paths.map((path, index) => {
      const length = lengths[index];
      const startLength = consumedLength;
      consumedLength += length;
      const keyframes = Array.from({ length: 33 }, (_, step) => {
        const time = step / 32;
        const progress = Math.max(0, Math.min(1, (time * 0.88 - 0.06) / 0.82));
        const drawn = totalLength * (1 - (1 - progress) ** 3);
        const localProgress = Math.max(0, Math.min(1, (drawn - startLength) / length));
        return { strokeDashoffset: String(1 - localProgress), offset: time };
      });
      return path.animate(keyframes, { duration: 880, fill: "forwards" });
    });
    // One small composited HTML surface replaces seven oversized SVG filter surfaces.
    const reveal = svg.parentElement!.animate([
      { opacity: 0, filter: "blur(9px)", offset: 0 },
      { opacity: 1, filter: "blur(0.15px)", offset: 0.42 },
      { opacity: 1, filter: "blur(0.15px)", offset: 0.76 },
      { opacity: 0, filter: "blur(9px)", offset: 1 },
    ], { duration: 1780, fill: "forwards" });
    void reveal.finished.then(onComplete, () => {});
    return () => {
      reveal.cancel();
      penAnimations.forEach((animation) => animation.cancel());
    };
  }, [onComplete, reducedMotion]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black px-6" role="status" aria-label="Microck">
      <div className="w-[min(72vw,280px)] text-[#f5f5f5] opacity-0 will-change-[filter,opacity]">
      <svg ref={svgRef} viewBox="-300 -4786 18017 7971" className="w-full overflow-visible" aria-hidden="true">
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="-300" y="-3200" width="18017" height="8000">
            {SIGNATURE_PATHS.map(({ d, offset }) => (
              <path key={offset} d={d} data-offset={offset} transform={`translate(${offset},0)`} fill="none" stroke="white" strokeWidth="450" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1 1" strokeDashoffset="1" />
            ))}
          </mask>
        </defs>
        <g transform="scale(1,-1)">
          <g mask={`url(#${maskId})`} fill="currentColor" stroke="currentColor" strokeWidth="100" strokeLinecap="round" strokeLinejoin="round">
            {SIGNATURE_PATHS.map(({ d, offset }) => (
              <path key={offset} d={d} data-glyph={offset} transform={`translate(${offset},0)`} />
            ))}
          </g>
        </g>
      </svg>
      </div>
    </div>
  );
}

export default Skiper10;
