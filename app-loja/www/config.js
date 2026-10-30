// ============================================================
//  Meu Bolso — CONFIGURAÇÕES (é aqui que se liga a cobrança)
// ============================================================
window.MB_CONFIG = {
  // true  = tudo liberado, sem cobrança (use para os testes e até configurar a RevenueCat)
  // false = cobra a assinatura pelas lojas
  MODO_TESTE: true,

  // Chaves públicas da RevenueCat (painel RevenueCat → Project settings → API keys)
  REVENUECAT_IOS: "",      // começa com "appl_"
  REVENUECAT_ANDROID: "",  // começa com "goog_"

  // Nome do "entitlement" criado na RevenueCat
  ENTITLEMENT: "pro",

  // Usados só se a loja não responder (o preço real vem sempre da loja)
  TRIAL_DIAS: 7,
  PRECO_MENSAL: "R$ 14,90",
  PRECO_ANUAL: "R$ 119,90",

  // Páginas legais (já publicadas no GitHub Pages)
  TERMOS_URL: "https://carlinnn-crs.github.io/Meu-bolso/app-loja/legal/termos.html",
  PRIVACIDADE_URL: "https://carlinnn-crs.github.io/Meu-bolso/app-loja/legal/privacidade.html",

  // Links das lojas (preencher depois do lançamento) — usados no botão "Indicar o app"
  LINK_APP_STORE: "",
  LINK_GOOGLE_PLAY: "",

  // E-mail de suporte (aparece em Ajustes)
  EMAIL_SUPORTE: ""
};
