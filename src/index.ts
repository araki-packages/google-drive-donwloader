import { google } from "googleapis";
const JWT = google.auth.JWT;
export type HandleFetchFileMedia = (fileId: string) => Promise<any>;
export type HandleAuthorization = (
  cred: unknown
) => Promise<HandleFetchFileMedia>;

const googleDriveDownloader: HandleAuthorization = async (cred: any) => {
  return new Promise((resolve) => {
    const jwtClient = new JWT(cred.client_email, undefined, cred.private_key, [
      "https://www.googleapis.com/auth/drive",
    ]);
    jwtClient.authorize((err) => {
      if (err != null) throw err;

      const drive = google.drive({ version: "v3", auth: jwtClient });

      resolve(async (fileId: string) => {
        const res = await drive.files.get(
          {
            fileId: fileId,
            alt: "media",
          },
          { responseType: "stream" }
        );
        const data = await new Promise((resolve: (data: Buffer) => void) => {
          const bufs: any[] = [];
          res.data.on("data", (buf) => {
            bufs.push(buf);
          });
          res.data.on("end", () => {
            resolve(Buffer.concat(bufs));
          });
        });
        return data;
      });
    });
  });
};

export default googleDriveDownloader;
