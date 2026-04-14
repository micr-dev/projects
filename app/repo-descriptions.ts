import type { RepoDescription } from "./repo-description-types";
import { hardwareBatch } from "./repo-copy-batches/hardware";
import { mcpsSkillsBatch } from "./repo-copy-batches/mcps-skills";
import { micrMs26Batch } from "./repo-copy-batches/micr-ms26";
import { softwareBatchA } from "./repo-copy-batches/software-a";
import { softwareBatchB } from "./repo-copy-batches/software-b";
import { softwareBatchC } from "./repo-copy-batches/software-c";

export const repoDescriptions: Record<string, RepoDescription> = {
  ...softwareBatchA,
  ...softwareBatchB,
  ...softwareBatchC,
  ...micrMs26Batch,
  ...hardwareBatch,
  ...mcpsSkillsBatch,
};
