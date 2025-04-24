"use server";

import { mailAdmin } from "@/lib/email";
import { fc } from "@/lib/fetchClient";
import supabase from "@/lib/supabase";
import { MessageResponse } from "@/types";
import { getTimeDiffDays, getTimeDiffMins } from "@/utils";

// monitor backend online status
export async function apiGetBackendStatus(): Promise<MessageResponse | null> {
  try {
    const res = await fc.get<MessageResponse>("/health", {
      headers: {
        cache: "no-store",
      },
    });

    if (res.message !== "OK") {
      throw new Error("Server is down");
    }

    return res;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`getBackendStatus error: ${e}`);

    const mailBody = `
        <h2>Backend Service Alert</h2>
        <p>The backend service is currently unavailable.</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Error:</strong> ${e}</p>
        <p>This alert will not be repeated for the next 1 day.</p>`;

    // TODO: use cache to replace this
    if (!supabase) return null;

    try {
      const { data, status, statusText } = await supabase
        .from("status-cache")
        .select("*")
        .eq("id", 1)
        .single();

      if (status !== 200) {
        throw new Error(`fetch supabase error:${statusText}`);
      }

      // 3 mins
      if (getTimeDiffMins(data.last_modified_time) < 1) {
        return null;
      }

      // if error occurred 3 times, mail to website admin
      if (data.error_count === 3) {
        mailAdmin("Backend is down", mailBody);

        const new_row = {
          last_modified_time: new Date(),
          error_count: 4,
          alerted: true,
        };

        await supabase.from("status-cache").update(new_row).eq("id", 1);
      }

      if (getTimeDiffDays(data.last_modified_time) >= 1) {
        const new_row = {
          last_modified_time: new Date(),
          error_count: 1,
          alerted: false,
        };

        await supabase.from("status-cache").update(new_row).eq("id", 1);
      } else {
        const new_row = {
          last_modified_time: new Date(),
          error_count: data.error_count > 3 ? 4 : data.error_count + 1,
          alerted: false,
        };

        await supabase.from("status-cache").update(new_row).eq("id", 1);
      }
    } catch (mailError) {
      // eslint-disable-next-line no-console
      console.error("Failed to send alert email:", mailError);
    }

    return null;
  }
}
