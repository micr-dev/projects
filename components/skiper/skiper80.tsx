"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, CircleArrowOutUpRight, Lock } from "lucide-react";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  getRepoDisplayTitle,
  getRepoSlugPath,
  normalizeRepoSlugPath,
} from "../../app/repo-paths";
import { getRepoImage } from "../../app/repo-images";
import type { RepoDescription } from "../../app/repo-description-types";
import type { RepoMetadata } from "../../app/repo-metadata";
import type { RepoSection } from "../../app/repo-sections";
import ProgressiveBlur from "./progressive-blur";
import { TextShimmer } from "./text-shimmer";

interface Skiper80Props {
  initialSlug: string | null;
  sections: RepoSection[];
}

interface RepoItem {
  key: string;
  description: RepoDescription;
  heading: string;
  metadata: RepoMetadata;
  title: string;
  index: number;
  image: string;
  slug: string;
}

interface TitleSnapshot {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  height: number;
  left: number;
  letterSpacing: string;
  lineHeight: string;
  top: number;
  width: number;
}

interface BoxSnapshot {
  borderRadius: string;
  height: number;
  left: number;
  top: number;
  width: number;
}

const sharedSpring = {
  type: "spring" as const,
  stiffness: 170,
  damping: 24,
  mass: 0.95,
};

function snapshotTitle(element: HTMLElement): TitleSnapshot {
  const rect = element.getBoundingClientRect();
  const styles = window.getComputedStyle(element);

  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    fontFamily: styles.fontFamily,
    fontSize: styles.fontSize,
    fontWeight: styles.fontWeight,
    letterSpacing: styles.letterSpacing,
    lineHeight: styles.lineHeight === "normal" ? styles.fontSize : styles.lineHeight,
  };
}

function snapshotBox(element: HTMLElement): BoxSnapshot {
  const rect = element.getBoundingClientRect();
  const styles = window.getComputedStyle(element);

  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    borderRadius: styles.borderRadius,
  };
}

function getInitialItemIndex(
  sections: RepoSection[],
  initialSlug: string | null,
): number | null {
  if (!initialSlug) {
    return null;
  }

  const normalizedSlug = normalizeRepoSlugPath(initialSlug);

  if (!normalizedSlug) {
    return null;
  }

  let index = 0;

  for (const section of sections) {
    for (const item of section.items) {
      if (getRepoSlugPath(item.title) === normalizedSlug) {
        return index;
      }

      index += 1;
    }
  }

  return null;
}

const Skiper80 = ({ sections, initialSlug }: Skiper80Props) => {
  const initialItemIndex = getInitialItemIndex(sections, initialSlug);
  const [isHoveredIndex, setIsHoveredIndex] = useState(initialItemIndex ?? 0);
  const [isItemActive, setIsItemActive] = useState<number | null>(initialItemIndex);
  const [isClosing, setIsClosing] = useState(false);
  const [sourceTitleSnapshot, setSourceTitleSnapshot] =
    useState<TitleSnapshot | null>(null);
  const [targetTitleSnapshot, setTargetTitleSnapshot] =
    useState<TitleSnapshot | null>(null);
  const [sourceImageSnapshot, setSourceImageSnapshot] =
    useState<BoxSnapshot | null>(null);
  const [targetImageSnapshot, setTargetImageSnapshot] =
    useState<BoxSnapshot | null>(null);
  const [closingTitleSource, setClosingTitleSource] =
    useState<TitleSnapshot | null>(null);
  const [closingTitleTarget, setClosingTitleTarget] =
    useState<TitleSnapshot | null>(null);
  const [closingImageSource, setClosingImageSource] =
    useState<BoxSnapshot | null>(null);
  const [closingImageTarget, setClosingImageTarget] =
    useState<BoxSnapshot | null>(null);
  const [titleCloseDone, setTitleCloseDone] = useState(false);
  const [imageCloseDone, setImageCloseDone] = useState(false);
  const [closingTitleScrollOffset, setClosingTitleScrollOffset] = useState(0);
  const [, setLoadedImageVersion] = useState(0);
  const previewImageRef = useRef<HTMLImageElement | null>(null);
  const detailTitleMeasureRef = useRef<HTMLDivElement | null>(null);
  const detailTitleRef = useRef<HTMLHeadingElement | null>(null);
  const detailImageRef = useRef<HTMLImageElement | null>(null);
  const enterAnimationTokenRef = useRef(0);
  const closingAnimationTokenRef = useRef(0);
  const itemTitleRefs = useRef(new Map<number, HTMLLIElement | null>());
  const warmedImagesRef = useRef(new Set<string>());
  const loadedImagesRef = useRef(new Set<string>());
  const closingTitleScrollOriginRef = useRef(0);

  const items = useMemo<RepoItem[]>(
    () =>
      sections
        .flatMap((section) =>
          section.items.map(({ description, metadata, title }) => ({
            key: `${section.heading}::${title}`,
            description,
            heading: section.heading,
            metadata,
            title,
            slug: getRepoSlugPath(title),
          })),
        )
        .map((item, index) => ({
          ...item,
          index,
          image: getRepoImage(item.title, index),
        })),
    [sections],
  );

  const activeIndex = isItemActive ?? isHoveredIndex;
  const activeItem = items[activeIndex];
  const activeCopy = activeItem?.description ?? null;
  const activeDisplayTitle = activeItem ? getRepoDisplayTitle(activeItem.title) : "";
  const isMicrosoftHackathonProject = activeItem?.title.startsWith("ms26/") ?? false;
  const isActiveImageLoaded = activeItem
    ? loadedImagesRef.current.has(activeItem.image)
    : false;

  const markImageLoaded = useCallback((src: string) => {
    if (loadedImagesRef.current.has(src)) {
      return;
    }

    loadedImagesRef.current.add(src);
    setLoadedImageVersion((version) => version + 1);
  }, []);

  const preloadImage = useCallback((src: string, priority: "high" | "low" = "low") => {
    if (
      typeof window === "undefined" ||
      warmedImagesRef.current.has(src) ||
      loadedImagesRef.current.has(src)
    ) {
      return;
    }

    warmedImagesRef.current.add(src);
    const image = new window.Image();
    image.decoding = "async";
    image.fetchPriority = priority;
    image.onload = () => markImageLoaded(src);
    image.onerror = () => markImageLoaded(src);
    image.src = src;

    if (image.complete) {
      markImageLoaded(src);
      return;
    }

    image.decode?.().then(() => markImageLoaded(src)).catch(() => {});
  }, [markImageLoaded]);

  const resetOpeningSnapshots = useCallback(() => {
    setSourceTitleSnapshot(null);
    setTargetTitleSnapshot(null);
    setSourceImageSnapshot(null);
    setTargetImageSnapshot(null);
  }, []);

  const resetClosingAnimationState = useCallback(() => {
    closingAnimationTokenRef.current += 1;
    setIsClosing(false);
    setClosingTitleSource(null);
    setClosingTitleTarget(null);
    setClosingImageSource(null);
    setClosingImageTarget(null);
    setTitleCloseDone(false);
    setImageCloseDone(false);
    setClosingTitleScrollOffset(0);
  }, []);

  const syncRoute = useCallback(
    (itemIndex: number | null, mode: "push" | "replace" = "replace") => {
      if (typeof window === "undefined") {
        return;
      }

      const nextPath = itemIndex == null ? "/" : `/${items[itemIndex].slug}`;
      const currentPath = normalizeRepoSlugPath(window.location.pathname);
      const targetPath = normalizeRepoSlugPath(nextPath);

      if (currentPath === targetPath) {
        return;
      }

      if (mode === "push") {
        window.history.pushState({ repoSlug: targetPath }, "", nextPath);
        return;
      }

      window.history.replaceState({ repoSlug: targetPath }, "", nextPath);
    },
    [items],
  );

  const syncStateFromPath = useCallback(
    (pathname: string) => {
      const normalizedPath = normalizeRepoSlugPath(pathname);
      const matchedIndex =
        normalizedPath == null
          ? null
          : items.findIndex((item) => item.slug === normalizedPath);

      resetClosingAnimationState();
      resetOpeningSnapshots();

      if (matchedIndex == null || matchedIndex < 0) {
        setIsItemActive(null);
        return;
      }

      preloadImage(items[matchedIndex].image, "high");
      setIsHoveredIndex(matchedIndex);
      setIsItemActive(matchedIndex);
    },
    [items, preloadImage, resetClosingAnimationState, resetOpeningSnapshots],
  );

  const openItem = useCallback(
    (itemIndex: number, titleElement: HTMLElement) => {
      if (isClosing) {
        resetClosingAnimationState();
      }

      enterAnimationTokenRef.current += 1;
      setSourceTitleSnapshot(snapshotTitle(titleElement));
      setTargetTitleSnapshot(null);

      if (previewImageRef.current) {
        setSourceImageSnapshot(snapshotBox(previewImageRef.current));
      }

      setTargetImageSnapshot(null);
      setIsHoveredIndex(itemIndex);
      setIsItemActive(itemIndex);
      syncRoute(itemIndex, "push");
    },
    [isClosing, resetClosingAnimationState, syncRoute],
  );

  useEffect(() => {
    if (!activeItem) {
      return;
    }

    preloadImage(activeItem.image, "high");
  }, [activeItem, preloadImage]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const queue = [...new Set(items.map((item) => item.image))].filter(
      (src) =>
        !warmedImagesRef.current.has(src) && !loadedImagesRef.current.has(src),
    );

    if (!queue.length) {
      return;
    }

    let cancelled = false;
    let queueIndex = 0;
    let idleHandle: number | null = null;
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;
    const requestIdle = window.requestIdleCallback?.bind(window);
    const cancelIdle = window.cancelIdleCallback?.bind(window);

    const pumpQueue = (deadline?: IdleDeadline) => {
      if (cancelled) {
        return;
      }

      while (queueIndex < queue.length) {
        preloadImage(queue[queueIndex]);
        queueIndex += 1;

        if (!deadline || deadline.timeRemaining() <= 4) {
          break;
        }
      }

      if (queueIndex < queue.length) {
        scheduleQueue();
      }
    };

    const scheduleQueue = () => {
      if (requestIdle) {
        idleHandle = requestIdle(pumpQueue, { timeout: 1200 });
        return;
      }

      timeoutHandle = globalThis.setTimeout(() => pumpQueue(), 120);
    };

    scheduleQueue();

    return () => {
      cancelled = true;

      if (idleHandle != null && cancelIdle) {
        cancelIdle(idleHandle);
      }

      if (timeoutHandle != null) {
        globalThis.clearTimeout(timeoutHandle);
      }
    };
  }, [items, preloadImage]);

  useLayoutEffect(() => {
    if (isItemActive == null) {
      setTargetTitleSnapshot(null);
      setTargetImageSnapshot(null);
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      if (!detailTitleMeasureRef.current) {
        return;
      }

      setTargetTitleSnapshot(snapshotTitle(detailTitleMeasureRef.current));
      if (detailImageRef.current) {
        setTargetImageSnapshot(snapshotBox(detailImageRef.current));
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isItemActive, activeItem?.title, activeItem?.image]);

  useLayoutEffect(() => {
    if (!isClosing || isItemActive == null) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      const titleTarget = itemTitleRefs.current.get(isItemActive);

      if (titleTarget) {
        setClosingTitleTarget(snapshotTitle(titleTarget));
      }

      if (previewImageRef.current) {
        setClosingImageTarget(snapshotBox(previewImageRef.current));
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isClosing, isItemActive, activeItem?.title, activeItem?.image]);

  useLayoutEffect(() => {
    if (!isClosing) {
      return;
    }

    const titleReady = closingTitleSource == null || titleCloseDone;
    const imageReady = closingImageSource == null || imageCloseDone;

    if (!titleReady || !imageReady) {
      return;
    }

    resetClosingAnimationState();
    setIsItemActive(null);
    resetOpeningSnapshots();
  }, [
    closingImageTarget,
    closingImageSource,
    closingTitleSource,
    imageCloseDone,
    isClosing,
    resetClosingAnimationState,
    resetOpeningSnapshots,
    titleCloseDone,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!isClosing) {
      closingTitleScrollOriginRef.current = window.scrollY;
      setClosingTitleScrollOffset(0);
      return;
    }

    closingTitleScrollOriginRef.current = window.scrollY;

    let frameId: number | null = null;

    const syncScrollOffset = () => {
      frameId = null;
      setClosingTitleScrollOffset(
        window.scrollY - closingTitleScrollOriginRef.current,
      );
    };

    const handleScroll = () => {
      if (frameId != null) {
        return;
      }

      frameId = window.requestAnimationFrame(syncScrollOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frameId != null) {
        window.cancelAnimationFrame(frameId);
      }

      setClosingTitleScrollOffset(0);
    };
  }, [isClosing]);

  useEffect(() => {
    const handlePopState = () => {
      syncStateFromPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [syncStateFromPath]);

  const closeActiveItem = useCallback(() => {
    if (isItemActive == null || isClosing) {
      return;
    }

    setIsHoveredIndex(isItemActive);

    const currentTitleSource = detailTitleRef.current
      ? snapshotTitle(detailTitleRef.current)
      : null;
    const currentImageSource = detailImageRef.current
      ? snapshotBox(detailImageRef.current)
      : null;

    if (!currentTitleSource && !currentImageSource) {
      syncRoute(null);
      setIsItemActive(null);
      resetOpeningSnapshots();
      return;
    }

    closingAnimationTokenRef.current += 1;
    setClosingTitleSource(currentTitleSource);
    setClosingTitleTarget(null);
    setClosingImageSource(currentImageSource);
    setClosingImageTarget(null);
    setTitleCloseDone(currentTitleSource == null);
    setImageCloseDone(currentImageSource == null);
    setIsClosing(true);
    syncRoute(null);
  }, [isClosing, isItemActive, resetOpeningSnapshots, syncRoute]);

  const navigateActiveItem = useCallback(
    (direction: -1 | 1) => {
      if (
        isItemActive == null ||
        isClosing ||
        sourceTitleSnapshot != null ||
        sourceImageSnapshot != null
      ) {
        return;
      }

      const nextIndex = Math.min(
        Math.max(isItemActive + direction, 0),
        items.length - 1,
      );

      if (nextIndex === isItemActive) {
        return;
      }

      const nextItem = items[nextIndex];
      preloadImage(nextItem.image, "high");
      setIsHoveredIndex(nextIndex);
      setIsItemActive(nextIndex);
      syncRoute(nextIndex);
    },
    [
      isClosing,
      isItemActive,
      items,
      preloadImage,
      sourceImageSnapshot,
      sourceTitleSnapshot,
      syncRoute,
    ],
  );

  useEffect(() => {
    if (isItemActive == null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        navigateActiveItem(-1);
        return;
      }

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        navigateActiveItem(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isItemActive, navigateActiveItem]);

  if (!activeItem || !activeCopy) {
    return null;
  }

  const hasPendingTitleAnimation =
    isItemActive != null && sourceTitleSnapshot != null;
  const shouldAnimateTitle =
    hasPendingTitleAnimation && targetTitleSnapshot != null;
  const hasPendingImageAnimation =
    isItemActive != null && sourceImageSnapshot != null;
  const shouldAnimateImage =
    hasPendingImageAnimation && targetImageSnapshot != null;
  const shouldAnimateClosingTitle =
    isClosing && closingTitleSource != null && closingTitleTarget != null;
  const shouldAnimateClosingImage =
    isClosing && closingImageSource != null && closingImageTarget != null;
  const shouldShowPreviewThumbnail = isItemActive == null;
  const currentEnterAnimationToken = enterAnimationTokenRef.current;
  const currentClosingAnimationToken = closingAnimationTokenRef.current;

  return (
    <div className="relative flex min-h-screen w-screen justify-center py-32">
      <ProgressiveBlur
        position="top"
        positioning="fixed"
        backgroundColor="#121212"
        className="-top-16 z-10"
        style={{
          left: "calc(15% + 12rem)",
          width: "calc(85% - 12rem)",
        }}
      />
      <ProgressiveBlur
        position="bottom"
        positioning="fixed"
        backgroundColor="#121212"
        className="z-10"
      />
      {isItemActive != null ? (
        <motion.div
          className="pointer-events-none fixed inset-y-0 right-0 z-[15] bg-[#121212]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosing ? 0 : 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          style={{ width: "calc(85% - 12rem)" }}
        />
      ) : null}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key="repo-list"
          className="w-full"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
            {!isActiveImageLoaded && !isClosing && shouldShowPreviewThumbnail ? (
              <div
                aria-hidden="true"
                className="bg-foreground/5 fixed left-[15%] top-[10%] z-20 h-50 aspect-video -translate-x-1/2 animate-pulse rounded-[25px]"
              />
            ) : null}

          <motion.img
            ref={previewImageRef}
            drag
            loading="eager"
            decoding="async"
            fetchPriority="high"
            transition={sharedSpring}
            style={{
              borderRadius: "25px",
              visibility: shouldShowPreviewThumbnail ? "visible" : "hidden",
              opacity: isActiveImageLoaded && shouldShowPreviewThumbnail ? 1 : 0,
            }}
            className="fixed left-[15%] top-[10%] z-20 h-50 aspect-video -translate-x-1/2 border border-foreground/10 object-cover"
            src={activeItem.image}
            alt=""
            onLoad={() => markImageLoaded(activeItem.image)}
            onError={() => markImageLoaded(activeItem.image)}
          />

          <ul className="ml-auto mr-[10%] flex w-fit flex-col gap-2 pb-[20vh] pt-[42vh]">
            {(() => {
              let itemCursor = 0;

              return sections.map((section) => (
              <React.Fragment key={section.heading}>
                <li className="mt-8 flex w-full items-center gap-3 text-sm uppercase opacity-50 first:mt-0">
                  {section.heading}
                  <span className="bg-foreground h-px flex-1"></span>
                </li>
                {section.items.map(({ title }) => {
                  const item = items[itemCursor++];
                  const displayTitle = getRepoDisplayTitle(title);

                  return (
                    <motion.li
                      ref={(element) => {
                        itemTitleRefs.current.set(item.index, element);
                      }}
                      transition={sharedSpring}
                      key={item.key}
                      style={{
                        opacity:
                          isClosing && isItemActive === item.index
                            ? 0
                            : isHoveredIndex === item.index
                              ? 1
                              : 0.5,
                      }}
                      className="relative flex w-fit cursor-pointer items-center text-4xl tracking-tighter"
                      onMouseEnter={() => {
                        preloadImage(item.image, "high");
                        setIsHoveredIndex(item.index);
                      }}
                      onClick={(event) => {
                        openItem(item.index, event.currentTarget);
                      }}
                    >
                      {displayTitle}
                      {isHoveredIndex === item.index && (
                        <motion.div
                          initial={{ x: 10, width: "15px", height: "0px" }}
                          animate={{ x: 10, width: "4px", height: "4px" }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="bg-foreground absolute left-full rounded-full"
                        />
                      )}
                    </motion.li>
                  );
                })}
              </React.Fragment>
              ));
            })()}
          </ul>
        </motion.div>

        {isItemActive != null ? (
          <motion.div
            key="repo-detail"
            className={`overlay-scrollbar-none inset-0 z-20 ${isClosing ? "fixed overflow-hidden" : "fixed overflow-y-auto"}`}
            style={{ pointerEvents: isClosing ? "none" : "auto" }}
            onClick={closeActiveItem}
          >
            {hasPendingTitleAnimation ? (
              <motion.div
                className="pointer-events-none fixed z-30 whitespace-nowrap"
                initial={{
                  top: sourceTitleSnapshot.top,
                  left: sourceTitleSnapshot.left,
                  width: sourceTitleSnapshot.width,
                  height: sourceTitleSnapshot.height,
                  fontFamily: sourceTitleSnapshot.fontFamily,
                  fontSize: sourceTitleSnapshot.fontSize,
                  fontWeight: sourceTitleSnapshot.fontWeight,
                  letterSpacing: sourceTitleSnapshot.letterSpacing,
                  lineHeight: sourceTitleSnapshot.lineHeight,
                  opacity: 1,
                }}
                animate={{
                  top: shouldAnimateTitle
                    ? targetTitleSnapshot.top
                    : sourceTitleSnapshot.top,
                  left: shouldAnimateTitle
                    ? targetTitleSnapshot.left
                    : sourceTitleSnapshot.left,
                  width: shouldAnimateTitle
                    ? targetTitleSnapshot.width
                    : sourceTitleSnapshot.width,
                  height: shouldAnimateTitle
                    ? targetTitleSnapshot.height
                    : sourceTitleSnapshot.height,
                  fontFamily: shouldAnimateTitle
                    ? targetTitleSnapshot.fontFamily
                    : sourceTitleSnapshot.fontFamily,
                  fontSize: shouldAnimateTitle
                    ? targetTitleSnapshot.fontSize
                    : sourceTitleSnapshot.fontSize,
                  fontWeight: shouldAnimateTitle
                    ? targetTitleSnapshot.fontWeight
                    : sourceTitleSnapshot.fontWeight,
                  letterSpacing: shouldAnimateTitle
                    ? targetTitleSnapshot.letterSpacing
                    : sourceTitleSnapshot.letterSpacing,
                  lineHeight: shouldAnimateTitle
                    ? targetTitleSnapshot.lineHeight
                    : sourceTitleSnapshot.lineHeight,
                  opacity: 1,
                }}
                transition={sharedSpring}
                style={{ transformOrigin: "top left" }}
                onAnimationComplete={() => {
                  if (
                    !shouldAnimateTitle ||
                    enterAnimationTokenRef.current !== currentEnterAnimationToken
                  ) {
                    return;
                  }
                  setSourceTitleSnapshot(null);
                }}
              >
                {activeDisplayTitle}
              </motion.div>
            ) : null}

            {hasPendingImageAnimation ? (
              <motion.img
                className="pointer-events-none fixed z-30 border border-foreground/10 object-cover"
                src={activeItem.image}
                alt=""
                width={1280}
                height={720}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                initial={{
                  top: sourceImageSnapshot.top,
                  left: sourceImageSnapshot.left,
                  width: sourceImageSnapshot.width,
                  height: sourceImageSnapshot.height,
                  borderRadius: sourceImageSnapshot.borderRadius,
                  opacity: 1,
                }}
                animate={{
                  top: shouldAnimateImage
                    ? targetImageSnapshot.top
                    : sourceImageSnapshot.top,
                  left: shouldAnimateImage
                    ? targetImageSnapshot.left
                    : sourceImageSnapshot.left,
                  width: shouldAnimateImage
                    ? targetImageSnapshot.width
                    : sourceImageSnapshot.width,
                  height: shouldAnimateImage
                    ? targetImageSnapshot.height
                    : sourceImageSnapshot.height,
                  borderRadius: shouldAnimateImage
                    ? targetImageSnapshot.borderRadius
                    : sourceImageSnapshot.borderRadius,
                  opacity: 1,
                }}
                transition={sharedSpring}
                style={{ transformOrigin: "top left" }}
                onAnimationComplete={() => {
                  if (
                    !shouldAnimateImage ||
                    enterAnimationTokenRef.current !== currentEnterAnimationToken
                  ) {
                    return;
                  }
                  setSourceImageSnapshot(null);
                }}
              />
            ) : null}

            {closingTitleSource ? (
              <motion.div
                className="pointer-events-none fixed z-30 whitespace-nowrap"
                initial={{
                  top: closingTitleSource.top,
                  left: closingTitleSource.left,
                  width: closingTitleSource.width,
                  height: closingTitleSource.height,
                  fontFamily: closingTitleSource.fontFamily,
                  fontSize: closingTitleSource.fontSize,
                  fontWeight: closingTitleSource.fontWeight,
                  letterSpacing: closingTitleSource.letterSpacing,
                  lineHeight: closingTitleSource.lineHeight,
                  opacity: 1,
                }}
                animate={{
                  top: shouldAnimateClosingTitle
                    ? closingTitleTarget.top
                    : closingTitleSource.top,
                  left: shouldAnimateClosingTitle
                    ? closingTitleTarget.left
                    : closingTitleSource.left,
                  width: shouldAnimateClosingTitle
                    ? closingTitleTarget.width
                    : closingTitleSource.width,
                  height: shouldAnimateClosingTitle
                    ? closingTitleTarget.height
                    : closingTitleSource.height,
                  fontFamily: shouldAnimateClosingTitle
                    ? closingTitleTarget.fontFamily
                    : closingTitleSource.fontFamily,
                  fontSize: shouldAnimateClosingTitle
                    ? closingTitleTarget.fontSize
                    : closingTitleSource.fontSize,
                  fontWeight: shouldAnimateClosingTitle
                    ? closingTitleTarget.fontWeight
                    : closingTitleSource.fontWeight,
                  letterSpacing: shouldAnimateClosingTitle
                    ? closingTitleTarget.letterSpacing
                    : closingTitleSource.letterSpacing,
                  lineHeight: shouldAnimateClosingTitle
                    ? closingTitleTarget.lineHeight
                    : closingTitleSource.lineHeight,
                  opacity: 1,
                }}
                transition={sharedSpring}
                style={{ transformOrigin: "top left", y: -closingTitleScrollOffset }}
                onAnimationComplete={() => {
                  if (
                    !shouldAnimateClosingTitle ||
                    closingAnimationTokenRef.current !== currentClosingAnimationToken
                  ) {
                    return;
                  }
                  setTitleCloseDone(true);
                }}
              >
                {activeDisplayTitle}
              </motion.div>
            ) : null}

            {closingImageSource ? (
              <motion.img
                className="pointer-events-none fixed z-30 border border-foreground/10 object-cover"
                src={activeItem.image}
                alt=""
                width={1280}
                height={720}
                loading="eager"
                decoding="async"
                initial={{
                  top: closingImageSource.top,
                  left: closingImageSource.left,
                  width: closingImageSource.width,
                  height: closingImageSource.height,
                  borderRadius: closingImageSource.borderRadius,
                  opacity: 1,
                }}
                animate={{
                  top: shouldAnimateClosingImage
                    ? closingImageTarget.top
                    : closingImageSource.top,
                  left: shouldAnimateClosingImage
                    ? closingImageTarget.left
                    : closingImageSource.left,
                  width: shouldAnimateClosingImage
                    ? closingImageTarget.width
                    : closingImageSource.width,
                  height: shouldAnimateClosingImage
                    ? closingImageTarget.height
                    : closingImageSource.height,
                  borderRadius: shouldAnimateClosingImage
                    ? closingImageTarget.borderRadius
                    : closingImageSource.borderRadius,
                  opacity: 1,
                }}
                transition={sharedSpring}
                style={{ transformOrigin: "top left" }}
                onAnimationComplete={() => {
                  if (
                    !shouldAnimateClosingImage ||
                    closingAnimationTokenRef.current !== currentClosingAnimationToken
                  ) {
                    return;
                  }
                  setImageCloseDone(true);
                }}
              />
            ) : null}

            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-6 pt-[78px] pb-32">
              <div className="w-full max-w-xl space-y-12">
                <div className="font-cal-sans relative text-7xl font-medium">
                  <div
                    ref={detailTitleMeasureRef}
                    aria-hidden="true"
                    className="invisible inline-block whitespace-nowrap"
                  >
                    {activeDisplayTitle}
                  </div>
                  <motion.h1
                    ref={detailTitleRef}
                    className="absolute inset-0 inline-block whitespace-nowrap"
                    style={{
                      opacity:
                        hasPendingTitleAnimation || isClosing ? 0 : 1,
                    }}
                  >
                    {activeDisplayTitle}
                  </motion.h1>
                </div>

                <div className="relative h-84 w-full">
                  {!isActiveImageLoaded && !hasPendingImageAnimation && !isClosing ? (
                    <div
                      aria-hidden="true"
                      className="bg-foreground/5 absolute inset-0 animate-pulse rounded-[25px]"
                    />
                  ) : null}

                  <motion.img
                    ref={detailImageRef}
                    width={1280}
                    height={720}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    transition={sharedSpring}
                    style={{
                      borderRadius: "25px",
                      visibility:
                        hasPendingImageAnimation || isClosing ? "hidden" : "visible",
                      opacity: isActiveImageLoaded ? 1 : 0,
                    }}
                    src={activeItem.image}
                    alt=""
                    className="h-full w-full object-cover"
                    onLoad={() => markImageLoaded(activeItem.image)}
                    onError={() => markImageLoaded(activeItem.image)}
                  />
                </div>
              </div>

              <motion.div
                initial="hidden"
                animate={isClosing ? "hidden" : "visible"}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.25,
                    },
                  },
                }}
                className="mx-auto w-full max-w-xl"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  transition={{ type: "spring", stiffness: 50, damping: 10 }}
                >
                  <section className="w-full">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                        className="bg-foreground h-0.5 flex-1 origin-left rounded-full"
                      />
                    </div>
                  </section>

                  <div className="text-foreground/50 mt-4 flex flex-col gap-2">
                    {activeCopy.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-sm">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {isMicrosoftHackathonProject ? (
                    <p className="text-foreground/40 mt-4 inline-flex items-center gap-2 text-xs">
                      <span className="inline-flex h-3.5 w-3.5 overflow-hidden rounded-[2px]">
                        <svg viewBox="0 0 16 16" className="h-full w-full" aria-hidden="true">
                          <rect x="0" y="0" width="7" height="7" fill="#f25022" />
                          <rect x="9" y="0" width="7" height="7" fill="#7fba00" />
                          <rect x="0" y="9" width="7" height="7" fill="#00a4ef" />
                          <rect x="9" y="9" width="7" height="7" fill="#ffb900" />
                        </svg>
                      </span>
                      Built for the Microsoft AI Dev Days Hackathon 2026.
                    </p>
                  ) : null}

                  <p className="text-foreground/40 mt-4 text-xs">
                    Languages:{" "}
                    {activeCopy.languages.map((language, index) => (
                      <React.Fragment key={language}>
                        {index > 0 ? ", " : null}
                        {index === 0 ? (
                          <TextShimmer
                            duration={1.05}
                            repeatDelay={3.2}
                            spread={1.75}
                            className="inline-block font-semibold [--base-color:rgba(255,255,255,0.42)] [--base-gradient-color:rgba(255,255,255,0.62)]"
                          >
                            {language}
                          </TextShimmer>
                        ) : (
                          <span>{language}</span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>

                  <div className="mt-10 flex items-center gap-2.5">
                    {activeItem.metadata.livePreviewUrl ? (
                      <a
                        href={activeItem.metadata.livePreviewUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="bg-foreground text-background flex h-9 items-center gap-2 rounded-xl px-3 text-sm"
                      >
                        Live Preview <CircleArrowOutUpRight className="size-3.5" />
                      </a>
                    ) : null}
                    {activeItem.metadata.isPrivate ? (
                      <span
                        onClick={(event) => event.stopPropagation()}
                        className="bg-background flex h-9 items-center gap-2 rounded-xl px-3 text-sm font-medium opacity-80"
                      >
                        Closed Source <Lock className="size-3.5" />
                      </span>
                    ) : (
                      <a
                        href={activeItem.metadata.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="bg-background flex h-9 items-center gap-2 rounded-xl px-3 text-sm font-medium"
                      >
                        See Source Code <BookOpen className="size-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Skiper80;
