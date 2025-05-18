function doGet(e) {
  // Set CORS headers
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/json',
  }
  try {
    // Get the active spreadsheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    var sheet = spreadsheet.getSheetByName('Forms') || spreadsheet.insertSheet('Forms')

    // Get parameters from the request
    var params = e.parameter

    // Append data to sheet
    sheet.appendRow([
      params.timestamp || new Date().toLocaleString(),
      params.name || '',
      params.phone || '',
      params.notes || '',
      params.preferredProducts || '',
      params.madeOrder || 'No',
      params.orderGMV || '0',
      params.lat || '',
      params.lng || '',
      params.locationstamp || '',
    ])

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: 'Data added successfully',
      }),
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers)
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      }),
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers)
  }
}

function doPost(e) {
  // Redirect POST requests to GET
  return doGet(e)
}
