"use server";

import { cacheGet, cacheSet } from "@/lib/cache";
import { mailAdmin } from "@/lib/email";
import { fc } from "@/lib/fetchClient";
import { MessageResponse } from "@/types";
import { getTimeDiffMins } from "@/utils";
import { withLock } from "@/utils/lock";

// monitor backend online status
export async function apiGetBackendStatus(): Promise<MessageResponse | null> {
  try {
    const res = await fc.get<MessageResponse>("health/", {
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
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        <p><strong>Error:</strong> ${e}</p>
        <p>This alert will not be repeated for the next 1 day.</p>`;

    // use cache to replace this
    // if (!supabase) return null;

    // try {
    //   const { data, status, statusText } = await supabase
    //     .from("status-cache")
    //     .select("*")
    //     .eq("id", 1)
    //     .single();

    //   if (status !== 200) {
    //     throw new Error(`fetch supabase error:${statusText}`);
    //   }

    //   // once a minute
    //   if (getTimeDiffMins(data.last_modified_time) < 1) {
    //     return null;
    //   }

    //   // if error occurred 3 times, mail to website admin
    //   if (data.error_count === 3) {
    //     mailAdmin("Backend is down", mailBody);

    //     const new_row = {
    //       last_modified_time: new Date(),
    //       error_count: 4,
    //       alerted: true,
    //     };

    //     await supabase.from("status-cache").update(new_row).eq("id", 1);
    //   }

    //   if (getTimeDiffDays(data.last_modified_time) >= 1) {
    //     const new_row = {
    //       last_modified_time: new Date(),
    //       error_count: 1,
    //       alerted: false,
    //     };

    //     await supabase.from("status-cache").update(new_row).eq("id", 1);
    //   } else {
    //     const new_row = {
    //       last_modified_time: new Date(),
    //       error_count: data.error_count > 3 ? 4 : data.error_count + 1,
    //       alerted: false,
    //     };

    //     await supabase.from("status-cache").update(new_row).eq("id", 1);
    //   }
    // } catch (mailError) {
    //   // eslint-disable-next-line no-console
    //   console.error("Failed to send alert email:", mailError);
    // }

    if (!process.env.MOMENTO_API_KEY) return null;

    // avoid short-duration case repeated alert
    await withLock(
      "alert-process",
      async () => {
        try {
          // If already send a mail
          const status = await cacheGet<number>("mail_status");

          if (status === 1) {
            return null;
          }

          // 1 min interval
          const last = await cacheGet<string>("mail_last");

          if (last && getTimeDiffMins(last) < 1) {
            return null;
          }

          await cacheSet<string>("mail_last", new Date().toISOString()); // to avoid time zone problem

          // 3 times
          const count = (await cacheGet<number>("mail_count")) ?? 0;

          await cacheSet("mail_count", count + 1);

          if (count >= 3) {
            await mailAdmin("Backend is down", mailBody);
            await cacheSet("mail_status", 1);
          }
        } catch (mailError) {
          // eslint-disable-next-line no-console
          console.error("Failed to send alert email:", mailError);
        }
      },
      60,
    );

    return null;
  }
}
