
import config from '../configuration/AppConfig';
const homePage = config.HOMEPAGE ? config.HOMEPAGE: '/';

export function logOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('recentlyViewedBatteries');
    localStorage.removeItem('recentlyViewedSignals');
    window.location.href = `${homePage}signin-page`;
}