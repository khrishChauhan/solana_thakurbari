# Google Apps Script Deployment Instructions

Here is the complete process to deploy the listener and attach it to your React form hosted anywhere (including Vercel).

## 1. Setup in Google Sheets
1. Open your target Google Sheet.
2. Ensure you have the exact column headers from your request in the first row. 
3. Click on **Extensions > Apps Script** in the menu.

## 2. The Apps Script Code
Delete any code in the script editor and paste the following snippet:

```javascript
// Change this to match your sheet name (e.g. 'Form Responses 1')
const TARGET_SHEET_NAME = 'Sheet1'; 

function doPost(e) {
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(TARGET_SHEET_NAME) || doc.getSheets()[0];
    
    // We parse the payload from text/plain to avoid CORS preflight options
    if (!e.postData || !e.postData.contents) {
       throw new Error('No data received');
    }

    const data = JSON.parse(e.postData.contents);
    
    // Headers must precisely match the names you specified
    const headers = [
      "Timestamp", "Full Name", "Date of Birth", "Gender", "Email Address", 
      "Phone Number (WhatsApp)", "Aadhaar / Gov ID Number", "Full Residential Address", 
      "Instagram", "YouTube Social", "Facebook", "Other Social Media", 
      "Participation Type", "Team / Project Name", "Team Leader Name", 
      "Total Number of Members", "Leader Aadhaar / Gov ID", "Team Members with Roles", 
      "YouTube Video Link", "Video Title", "Video Description", "Video Tags", 
      "Thumbnail Image Link", "Total Duration", "Language Used", "Specify Language", 
      "Cast & Crew with Roles", "Camera Used", "Specify Camera", "Editing Software Used", 
      "Shot in 4K or Higher", "Is Color-Graded", "Signature"
    ];

    // Automatically generate real ISO timestamp 
    const timestamp = new Date().toISOString();
    
    const row = headers.map(header => {
      if (header === "Timestamp") return timestamp;
      return data[header] || "";
    });

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ "status": "success", "message": "Row added successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3. Deployment
1. Click the blue **Deploy** button at the top right, then **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill out the configuration:
   - **Description**: (Optional) e.g., "Vercel Form Listener"
   - **Execute as**: Me (Your Google Account)
   - **Who has access**: Anyone *(CRITICAL: This ensures your public site can submit data without authentication)*
4. Click **Deploy**.
5. Google will ask for Authorization. Click **Authorize access** -> select your account -> click **Advanced** -> click "Go to Untitled project (unsafe)" -> click **Allow**.
6. At the end, you will receive a **Web app URL**. Copy this URL.

## 4. Hooking the URL into Vercel
1. Go to your frontend project in Vercel.
2. Navigate to your project **Settings > Environment Variables**.
3. Add a new variable: 
   - Key: `VITE_APPS_SCRIPT_URL`
   - Value: `[PASTE THE WEB APP URL]`
4. Redeploy your app for the variable to apply.

_Note: The frontend code has already been updated to format the submission as `text/plain` holding JSON. This natively solves the notorious Google Apps Script CORS issue for JavaScript-based fetch requests!_
