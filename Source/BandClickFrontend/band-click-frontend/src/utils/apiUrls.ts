// Base URLs
// const SERVER_HTTP = "http://localhost:5000";
const SERVER_HTTPS = "https://localhost:5001";
const SERVER_HTTP = "http://localhost:5000";
// const SERVER_HTTPS = "https://bandclickbackendapi20220126205316.azurewebsites.net";
export const API_HTTP_BASE_URL = `${SERVER_HTTP}/api`;
export const API_HTTPS_BASE_URL = `${SERVER_HTTPS}/api`;
// Auth
export const AUTH_CONTROLLER = `${API_HTTPS_BASE_URL}/Auth`
export const AUTH_LOGIN = `${AUTH_CONTROLLER}/login`;
export const AUTH_REGISTER = `${AUTH_CONTROLLER}/register`;
// Metronome Sound Provider
export const METRONOME_SOUND_PROVIDER_HTTP = `${SERVER_HTTP}/MetronomeSoundProvider`;
export const METRONOME_SOUND_PROVIDER_HTTPS = `${SERVER_HTTPS}/MetronomeSoundProvider`;
export const METRONOME_SOUND_ACCENT = `${METRONOME_SOUND_PROVIDER_HTTPS}/accent`;
export const METRONOME_SOUND_REGULAR = `${METRONOME_SOUND_PROVIDER_HTTPS}/regular`;
// User
export const USER_CONTROLLER = `${API_HTTPS_BASE_URL}/User`
// Metronome Settings
export const METRONOME_SETTINGS_CONTROLLER = `${API_HTTPS_BASE_URL}/MetronomeSettings`;
export const METRONOME_SETTINGS_COMMENTS = `${METRONOME_SETTINGS_CONTROLLER}/comments`;
// Playlists
export const PLAYLISTS_CONTROLLER = `${API_HTTPS_BASE_URL}/Playlists`
// Bands
export const BANDS_CONTROLLER = `${API_HTTPS_BASE_URL}/Bands`;
// Metre
export const METRE_CONTROLLER = `${API_HTTPS_BASE_URL}/Metre`;