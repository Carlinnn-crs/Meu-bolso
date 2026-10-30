// Meu Bolso — ponte entre o app (www/index.html) e os recursos do celular.
// Este arquivo é empacotado em www/native.js pelo comando `npm run build`.
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Share } from '@capacitor/share';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { Purchases, LOG_LEVEL } from '@revenuecat/purchases-capacitor';
import { BiometricAuth } from '@aparajita/capacitor-biometric-auth';

const CFG = window.MB_CONFIG || {};
const isNative = Capacitor.isNativePlatform();
const platform = Capacitor.getPlatform(); // 'ios' | 'android' | 'web'

/* ---------- Armazenamento (fica no celular e entra no backup do iCloud / Google) ---------- */
let writeChain = Promise.resolve();
const storage = {
  async get(key) {
    if (!isNative) { try { return localStorage.getItem(key); } catch (e) { return null; } }
    const { value } = await Preferences.get({ key });
    return value;
  },
  set(key, value) {
    if (!isNative) { try { localStorage.setItem(key, value); } catch (e) {} return Promise.resolve(); }
    writeChain = writeChain.then(() => Preferences.set({ key, value })).catch(() => {});
    return writeChain;
  },
};

/* ---------- Assinatura (RevenueCat → App Store / Google Play) ---------- */
const rcKey = platform === 'ios' ? CFG.REVENUECAT_IOS : platform === 'android' ? CFG.REVENUECAT_ANDROID : '';
const isActive = (ci) => !!(ci && ci.entitlements && ci.entitlements.active && ci.entitlements.active[CFG.ENTITLEMENT || 'pro']);
let configured = false;
const subs = {
  // Cobrança ligada só no celular, com a chave configurada e fora do modo de teste
  enabled: isNative && !CFG.MODO_TESTE && !!rcKey,
  async init() {
    if (configured) return;
    try { await Purchases.setLogLevel({ level: LOG_LEVEL.WARN }); } catch (e) {}
    await Purchases.configure({ apiKey: rcKey });
    configured = true;
  },
  async status() {
    const { customerInfo } = await Purchases.getCustomerInfo();
    return { active: isActive(customerInfo), manageUrl: customerInfo && customerInfo.managementURL, info: customerInfo };
  },
  async plans() {
    const o = await Purchases.getOfferings();
    const cur = o && o.current;
    if (!cur) return null;
    const pick = (t) => cur.availablePackages.find((p) => p.packageType === t);
    return { monthly: cur.monthly || pick('MONTHLY'), annual: cur.annual || pick('ANNUAL') };
  },
  async buy(pkg) {
    try {
      const r = await Purchases.purchasePackage({ aPackage: pkg });
      return { ok: isActive(r.customerInfo) };
    } catch (e) {
      if (e && (e.userCancelled || e.code === '1' || e.code === 1)) return { ok: false, cancelled: true };
      return { ok: false, error: (e && e.message) || 'Erro na compra' };
    }
  },
  async restore() {
    const { customerInfo } = await Purchases.restorePurchases();
    return isActive(customerInfo);
  },
  onChange(cb) {
    Purchases.addCustomerInfoUpdateListener((ci) => cb(isActive(ci), ci && ci.managementURL)).catch(() => {});
  },
};

/* ---------- Lembrete diário ---------- */
const REMINDER_ID = 1001;
const reminders = {
  async enable(hour, minute) {
    if (!isNative) return false;
    let p = await LocalNotifications.checkPermissions();
    if (p.display !== 'granted') p = await LocalNotifications.requestPermissions();
    if (p.display !== 'granted') return false;
    await LocalNotifications.cancel({ notifications: [{ id: REMINDER_ID }] }).catch(() => {});
    await LocalNotifications.schedule({
      notifications: [{
        id: REMINDER_ID,
        title: 'Meu Bolso',
        body: 'Já lançou seus gastos de hoje? Leva só 10 segundos 😉',
        schedule: { on: { hour, minute }, allowWhileIdle: true },
        smallIcon: 'ic_stat_icon',
        iconColor: '#0058C4',
      }],
    });
    return true;
  },
  async disable() {
    if (!isNative) return;
    await LocalNotifications.cancel({ notifications: [{ id: REMINDER_ID }] }).catch(() => {});
  },
};

/* ---------- Face ID / digital ---------- */
const lock = {
  async available() {
    if (!isNative) return { ok: false, label: 'Face ID' };
    try {
      const r = await BiometricAuth.checkBiometry();
      const label = platform === 'ios' ? (r.biometryType === 2 ? 'Face ID' : r.biometryType === 1 ? 'Touch ID' : 'código do iPhone') : 'digital ou rosto';
      return { ok: !!(r.isAvailable || r.deviceIsSecure), label };
    } catch (e) { return { ok: false, label: 'Face ID' }; }
  },
  async unlock() {
    try {
      await BiometricAuth.authenticate({
        reason: 'Desbloquear o Meu Bolso',
        cancelTitle: 'Cancelar',
        allowDeviceCredential: true,
        iosFallbackTitle: 'Usar código',
        androidTitle: 'Meu Bolso',
        androidSubtitle: 'Desbloquear',
      });
      return true;
    } catch (e) { return false; }
  },
};

/* ---------- Arquivos (cópia de segurança) ---------- */
async function shareFile(name, text) {
  if (!isNative) return false;
  const r = await Filesystem.writeFile({ path: name, data: text, directory: Directory.Cache, encoding: Encoding.UTF8 });
  await Share.share({ title: name, files: [r.uri], dialogTitle: 'Salvar cópia do Meu Bolso' }).catch(async () => {
    await Share.share({ title: name, url: r.uri });
  });
  return true;
}
async function shareText(text, url) {
  if (!isNative) return false;
  await Share.share({ title: 'Meu Bolso', text, url, dialogTitle: 'Enviar o Meu Bolso' });
  return true;
}

function onResume(cb) { if (isNative) App.addListener('appStateChange', ({ isActive }) => { if (isActive) cb(); }); }
function onPause(cb) { if (isNative) App.addListener('appStateChange', ({ isActive }) => { if (!isActive) cb(); }); }
function hideSplash() { if (isNative) SplashScreen.hide().catch(() => {}); }

window.MBNative = { isNative, platform, storage, subs, reminders, lock, shareFile, shareText, onResume, onPause, hideSplash };
