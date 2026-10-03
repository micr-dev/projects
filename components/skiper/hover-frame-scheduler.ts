export interface HoverFrameSchedulerOptions {
  requestFrame: (callback: () => void) => number;
  cancelFrame: (frameId: number) => void;
  /** Hit-tests the latest pointer position. Runs at most once per frame. */
  hitTest: (x: number, y: number) => void;
  /** Advances the hover queue by one project; returns whether more frame work is ready. */
  advanceQueue: () => boolean;
}

export interface HoverFrameScheduler {
  pointerMoved: (x: number, y: number) => void;
  /** Content moved under a stationary pointer, e.g. scrolling. */
  contentMoved: () => void;
  pointerLeft: () => void;
  /** A project was enqueued or a queued preview finished decoding. */
  queueChanged: () => void;
  dispose: () => void;
}

/**
 * Schedules hover work only when input or queue state requires it, so an idle
 * pointer costs no frames and no hit tests.
 */
export function createHoverFrameScheduler({
  requestFrame,
  cancelFrame,
  hitTest,
  advanceQueue,
}: HoverFrameSchedulerOptions): HoverFrameScheduler {
  let pointer: { x: number; y: number } | null = null;
  let needsHitTest = false;
  let frameId: number | null = null;

  const runFrame = () => {
    frameId = null;

    if (needsHitTest && pointer) {
      hitTest(pointer.x, pointer.y);
    }
    needsHitTest = false;

    if (advanceQueue()) {
      schedule();
    }
  };

  const schedule = () => {
    if (frameId == null) {
      frameId = requestFrame(runFrame);
    }
  };

  return {
    pointerMoved(x, y) {
      pointer = { x, y };
      needsHitTest = true;
      schedule();
    },
    contentMoved() {
      if (!pointer) {
        return;
      }
      needsHitTest = true;
      schedule();
    },
    pointerLeft() {
      pointer = null;
      needsHitTest = false;
    },
    queueChanged: schedule,
    dispose() {
      if (frameId != null) {
        cancelFrame(frameId);
        frameId = null;
      }
      pointer = null;
      needsHitTest = false;
    },
  };
}
