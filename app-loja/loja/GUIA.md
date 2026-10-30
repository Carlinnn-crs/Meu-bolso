# Guia — levar o Meu Bolso para as lojas (com assinatura)

> O Claude te acompanha em cada passo com prints. Aqui fica o mapa completo.
> ✅ = já pronto · 👤 = você faz · 🤖 = o Claude faz

## Fase 1 — App pronto ✅
- 🤖 App para iPhone e Android (pasta `app-loja`), com seu logo, ícones e tela de abertura
- 🤖 Tela de assinatura: 7 dias grátis → R$ 14,90/mês ou R$ 119,90/ano, "Restaurar compras"
- 🤖 Bloqueio com Face ID/digital, lembrete diário, dados guardados no celular + backup
- 🤖 Política de privacidade e termos (publicados no seu GitHub Pages)
- 🤖 Textos da loja: `loja/textos-da-loja.md`
- 🤖 Montagem automática: Android (GitHub Actions) e iPhone (Codemagic)

Enquanto `MODO_TESTE: true` (em `www/config.js`), o app fica todo liberado, sem cobrança — ideal para os testes.

## Fase 2 — Contas 👤
1. **Google Play Console** — play.google.com/console — taxa única de US$ 25, verificação de identidade (alguns dias).
2. **Apple Developer** — developer.apple.com/programs — US$ 99/ano, como pessoa física (24–48 h).
3. **RevenueCat** — app.revenuecat.com — grátis no começo.
4. **Codemagic** — codemagic.io — entre com o GitHub (plano grátis).
5. **Chave do Android**: 🤖 o Claude gera e 👤 você cola 4 "Secrets" no GitHub
   (repositório → Settings → Secrets and variables → Actions):
   `MB_KEYSTORE_BASE64`, `MB_KEYSTORE_PASSWORD`, `MB_KEY_ALIAS`, `MB_KEY_PASSWORD`.
   ⚠️ Guarde essa chave e as senhas em lugar seguro — sem elas não dá para atualizar o app.
6. Trocar **[SEU NOME COMPLETO]** e **[SEU E-MAIL DE CONTATO]** nas páginas legais (🤖 o Claude faz se você mandar).

## Fase 3 — Testes
### Google (obrigatório para conta pessoal nova)
1. 👤 Criar o app na Play Console (nome, idioma pt-BR, gratuito com compras no app).
2. 👤 GitHub → aba **Actions** → "App Android" → baixar `MeuBolso-google-play-aab`.
3. 👤 Play Console → Testar → **Teste fechado** → criar versão → enviar o `.aab`.
4. 👤 Adicionar os **12 testadores** (e-mails do Google deles) e mandar o link de teste.
5. Esperar **14 dias seguidos** com os 12 usando o app → pedir **acesso à produção**.

### Apple
1. 👤 App Store Connect → Meus apps → **+ Novo app** (Bundle ID `io.github.carlinnncrs.meubolso`).
2. 👤 Codemagic: adicionar o repositório, ligar a integração App Store Connect (chave de API) com o nome **MeuBolsoASC**, assinatura automática.
3. 👤 Codemagic → **Start new build** → o app vai sozinho para o **TestFlight**.
4. 👤 Testar no seu iPhone pelo app TestFlight.

## Fase 4 — Ligar a cobrança e lançar 🚀
1. 👤 Criar as assinaturas nas lojas com os códigos de `loja/textos-da-loja.md` (seção 6).
2. 👤 RevenueCat: conectar as duas lojas, criar entitlement `pro` e offering `default`.
3. 🤖 Colocar as chaves da RevenueCat em `www/config.js` e mudar `MODO_TESTE` para `false`.
4. 👤 Montar de novo (Actions / Codemagic), preencher fichas da loja, prints e formulários de privacidade.
5. 👤 Enviar para revisão. Aprovado → **publicado!**

## Comandos (para quem programa)
```bash
cd app-loja
npm ci
npm run build        # gera www/native.js
npx cap sync         # copia o app para android/ e ios/
npx cap open android # Android Studio
npx cap open ios     # Xcode (precisa de Mac)
```
