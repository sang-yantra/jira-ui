const TEAMS_URL =
  "https://bhnrieohgidkilckoyyi.supabase.co/storage/v1/object/public/jira/teams";

export const TEAMS_ASSETS = {
  RELATIVE_IMG_PATH: (relativePath) => `${TEAMS_URL}${relativePath}`,
};
