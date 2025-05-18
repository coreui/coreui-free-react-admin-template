// googleSheets.js
import Papa from 'papaparse';

const SHEET_BASE_URL = 'https://docs.google.com/spreadsheets/d/1c0-6pkvhvFntApsvgjCrLJrs0oU9e-L1wjfpsG80Ftk/export?format=csv';

async function getSheetData(_, sheetName) {
  try {
    const gid = sheetName === 'Current Active Customers' ? '0' : '364360587';
    const url = `${SHEET_BASE_URL}&gid=${gid}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csv = await response.text();
    
    return new Promise((resolve) => {
      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          resolve(results.data);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return [];
  }
}

export default { getSheetData };
