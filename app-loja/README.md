# Meu Bolso — versão para App Store e Google Play

App de controle de gastos com assinatura (7 dias grátis → R$ 14,90/mês ou R$ 119,90/ano).

- `www/` — o app (HTML/JS). `www/config.js` liga/desliga a cobrança e guarda as chaves públicas da RevenueCat.
- `src/native.js` — ponte com o celular: assinatura (RevenueCat), Face ID, lembrete, armazenamento e compartilhar.
- `android/`, `ios/` — projetos nativos gerados pelo Capacitor.
- `legal/` — política de privacidade e termos de uso (publicados no GitHub Pages).
- `loja/` — textos da loja e o guia passo a passo (`loja/GUIA.md`).

A versão de site que já está em uso (`../MeuBolso-app/`) não é alterada por esta pasta.
