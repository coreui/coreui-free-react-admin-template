function doGet(e) {
  try {
    // Get the active spreadsheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    var sheet = spreadsheet.getSheetByName('Forms')

    // If Forms sheet doesn't exist, create it with headers
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Forms')
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Phone',
        'Notes',
        'Preferred Products',
        'Made Order',
        'Order GMV',
        'Latitude',
        'Longitude',
        'Location Stamp',
      ])
    }

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

    // Create response
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Data added successfully' }),
    )
      .setMimeType(ContentService.MimeType.JSON)
      .addHeader('Access-Control-Allow-Origin', '*')
  } catch (error) {
    // Handle errors
    var errorResponse = ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      }),
    )

    errorResponse.setMimeType(ContentService.MimeType.JSON)
    errorResponse.setHeader('Access-Control-Allow-Origin', '*')
    errorResponse.setHeader('Access-Control-Allow-Methods', 'GET')

    return errorResponse
  }
}

// Handle POST requests by redirecting to GET
function doPost(e) {
  return doGet(e)
}
