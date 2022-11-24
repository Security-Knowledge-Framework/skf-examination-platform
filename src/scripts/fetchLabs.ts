import { writeFile } from "fs/promises";
import { getApiKey } from "../utils/consts";

async function fetchLabs() {
  const apiKey = await getApiKey();
  if (!apiKey) return console.log("Error getting API key");
  const url = "https://ccsgfooankckfqpmcfyb.supabase.co/rest/v1/labs?select=*";
  const headers = {
    apikey: apiKey,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { headers });

  const data = await response.json();

  if (response.ok) return data;
  return false;
}

// save the labs to the json file
async function saveLabs() {
  const labs = await fetchLabs();
  if (!labs) return console.log("Error fetching labs");

  const json = JSON.stringify(labs, null, 2);

  await writeFile("./src/data/labs.json", json, "utf8");
}

saveLabs();