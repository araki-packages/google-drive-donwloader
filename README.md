# google-drive-donwloader

スプレッドシートを全権取得する
https://console.developers.google.com/apis/api/drive.googleapis.com/overview?project=653523273911

## Example

```typescript
import createGetAllSheet from "@araki-packages/fetch-all-spread-sheet";
import credential from "./google-generated-creds.json";
const getSheet = createGetAllSheet("SpreadSheetID", credential);
interface ISheetName {
  record: string;
  record2: string;
}
const sheetData = getSheet<ISheetName>("sheet_name");
console.log(JSON.stringify(sheetData));
/**
 *
 * {
 *   key: '219391239',
 *   title: 'sheet_name
 *   value: [
 *     {
 *       record: 'foo',
 *       record2: 'bar',
 *     },
 *     //...
 *   ]
 * }
 */
```
# google-drive-donwloader
