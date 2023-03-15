// import { Client } from '@notionhq/client';
import PocketBase from "pocketbase";

// export const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const db = new PocketBase("https://safe-sets.fly.dev");
export const baseUrl = "https://safe-sets.fly.dev/api/";
