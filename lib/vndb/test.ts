export async function vndbTest() {
  try {
    // const res = await fetch("https://api.vndb.org/kana/authinfo", {
    //   headers: { Authorization: `token ${process.env.VNDB_TOKEN}` },
    // });

    const res = await fetch("https://api.vndb.org/kana/schema");

    const data = await res.json();

    return data;
  } catch (e) {
    console.error("Test VNDB failed: ", e);
  }
}
