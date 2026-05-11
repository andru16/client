/**
 * MAX_FILES_PER_BATCH y CLIENT_UPLOAD_CHUNK deben alinearse con GET /photos/quota (maxPerBatch)
 * y con MAX_FILES_PER_UPLOAD del servidor (por defecto 50).
 * MAX_GUEST_SELECTION: cuántos archivos puede acumular en un solo envío la UI (tandas HTTP por debajo).
 */
export const MAX_FILES_PER_BATCH = 50
export const CLIENT_UPLOAD_CHUNK = 50
export const MAX_GUEST_SELECTION = 3000
