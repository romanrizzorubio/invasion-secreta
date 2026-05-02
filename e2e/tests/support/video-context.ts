import { rm } from 'node:fs/promises';

import type { Browser, BrowserContext, TestInfo } from '@playwright/test';

const keepAllVideos = process.env.PLAYWRIGHT_VIDEO === 'on';

export async function newRecordedContext(
  browser: Browser,
  testInfo: TestInfo,
  contexts: BrowserContext[],
) {
  const context = await browser.newContext({
    recordVideo: {
      dir: testInfo.outputPath('videos'),
    },
  });

  contexts.push(context);

  return context;
}

export async function closeContextsAndHandleVideos(
  contexts: BrowserContext[],
  testInfo: TestInfo,
  keepVideos: boolean,
) {
  const pages = contexts.flatMap((context) => context.pages());

  await Promise.allSettled(contexts.map((context) => context.close()));

  const videoPaths = (
    await Promise.all(
      pages.map(async (page) => {
        const video = page.video();
        if (!video) return undefined;

        return video.path().catch(() => undefined);
      }),
    )
  ).filter((path): path is string => Boolean(path));

  if (keepAllVideos || keepVideos) {
    await Promise.all(
      videoPaths.map((path, index) =>
        testInfo.attach(`video-${index + 1}`, {
          path,
          contentType: 'video/webm',
        }),
      ),
    );

    await Promise.all(videoPaths.map((path) => rm(path, { force: true })));
    return;
  }

  await Promise.all(videoPaths.map((path) => rm(path, { force: true })));
}
