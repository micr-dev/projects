import test from "node:test";
import assert from "node:assert/strict";
import { createHoverFrameScheduler } from "../components/skiper/hover-frame-scheduler.ts";

function createHarness(advanceQueue = () => false) {
  const frames = new Map();
  const hits = [];
  let nextFrameId = 1;
  const scheduler = createHoverFrameScheduler({
    requestFrame: (callback) => {
      frames.set(nextFrameId, callback);
      return nextFrameId++;
    },
    cancelFrame: (frameId) => frames.delete(frameId),
    hitTest: (x, y) => hits.push([x, y]),
    advanceQueue,
  });
  const flushFrame = () => {
    const callbacks = [...frames.values()];
    frames.clear();
    for (const callback of callbacks) callback();
  };
  return { frames, hits, scheduler, flushFrame };
}

test("an idle pointer stops scheduling frames after one hit test of its latest position", () => {
  const { frames, hits, scheduler, flushFrame } = createHarness();

  scheduler.pointerMoved(10, 20);
  scheduler.pointerMoved(30, 40);
  assert.equal(frames.size, 1);

  flushFrame();
  assert.deepEqual(hits, [[30, 40]]);
  assert.equal(frames.size, 0);
});

test("scrolling re-hit-tests a stationary pointer but not an absent one", () => {
  const { frames, hits, scheduler, flushFrame } = createHarness();

  scheduler.contentMoved();
  assert.equal(frames.size, 0);

  scheduler.pointerMoved(5, 6);
  flushFrame();
  scheduler.contentMoved();
  flushFrame();
  assert.deepEqual(hits, [[5, 6], [5, 6]]);

  scheduler.pointerLeft();
  scheduler.contentMoved();
  assert.equal(frames.size, 0);
});

test("the queue advances one project per frame, parks on an undecoded preview, and resumes when woken", () => {
  const queue = [1, 2, 3];
  const decoded = new Set([1, 2]);
  const advanced = [];
  const { frames, scheduler, flushFrame } = createHarness(() => {
    if (queue.length === 0 || !decoded.has(queue[0])) return false;
    advanced.push(queue.shift());
    return queue.length > 0;
  });

  scheduler.queueChanged();
  flushFrame();
  assert.deepEqual(advanced, [1]);
  flushFrame();
  assert.deepEqual(advanced, [1, 2]);
  flushFrame();
  assert.deepEqual(advanced, [1, 2]);
  assert.equal(frames.size, 0);

  decoded.add(3);
  scheduler.queueChanged();
  flushFrame();
  assert.deepEqual(advanced, [1, 2, 3]);
  assert.equal(frames.size, 0);
});

test("dispose cancels pending work and forgets the pointer", () => {
  const { frames, scheduler } = createHarness();

  scheduler.pointerMoved(1, 1);
  scheduler.dispose();
  assert.equal(frames.size, 0);

  scheduler.contentMoved();
  assert.equal(frames.size, 0);
});
