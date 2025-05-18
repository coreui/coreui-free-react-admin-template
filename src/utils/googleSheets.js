// Utility to fetch and parse Google Sheets CSV as array of objects
import Papa from 'papaparse'

export async function fetchGoogleSheetData(sheetCsvUrl, tabGid) {
  let url = sheetCsvUrl
  if (tabGid) {
    url += `&gid=${tabGid}`
  }
  const res = await fetch(url)
  const csv = await res.text()
  const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true })
  return parsed.data
}
