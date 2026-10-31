# Textos e configurações para as lojas — Meu Bolso

Tudo pronto para copiar e colar na App Store Connect (Apple) e na Google Play Console.

---

## 1. Informações básicas (as duas lojas)

| Campo | Valor |
|---|---|
| Nome do app | **Meu Bolso: Controle de Gastos** |
| Subtítulo (Apple, até 30 caracteres) | **Para onde vai seu dinheiro** |
| Categoria | **Finanças** |
| Classificação etária | **Livre / 4+** (sem conteúdo sensível) |
| Idioma principal | Português (Brasil) |
| Identificador do app (Bundle ID / Package) | `io.github.carlinnncrs.meubolso` |
| Política de privacidade | https://carlinnn-crs.github.io/Meu-bolso/app-loja/legal/privacidade.html |
| Termos de uso | https://carlinnn-crs.github.io/Meu-bolso/app-loja/legal/termos.html |
| Site de suporte (Apple pede) | https://carlinnn-crs.github.io/Meu-bolso/app-loja/legal/privacidade.html (troque depois por um site seu, se quiser) |
| E-mail de contato | carlinhosgavioes84@gmail.com |

> ✅ Nome e e-mail já preenchidos na política de privacidade e nos termos de uso.

---

## 2. Descrição curta (Google Play, até 80 caracteres)

Descubra para onde vai seu dinheiro: gastos, metas e limites num só lugar.

## 3. Palavras-chave (Apple, até 100 caracteres, separadas por vírgula)

gastos,finanças,orçamento,controle financeiro,despesas,economia,salário,cartão,planilha,dinheiro

## 4. Descrição completa (as duas lojas)

Chega o fim do mês e você não sabe para onde foi o dinheiro? O Meu Bolso mostra, de um jeito simples, quanto você ganhou, quanto gastou e quanto sobrou — no mês e no ano.

LANCE EM SEGUNDOS
• Toque no +, digite o valor e escolha a categoria. Pronto.
• Botões rápidos com os gastos que você mais repete.
• Pix, débito, crédito ou dinheiro — e compras parceladas no cartão, cada parcela no seu mês.

ENTENDA PARA ONDE VAI O DINHEIRO
• Quanto sobrou no mês e no ano, com gráfico mês a mês.
• Ranking das categorias que mais pesam no seu bolso.
• Comparação com o mês anterior e previsão de como o mês vai fechar.
• Busca: “quanto gastei com iFood este ano?”.

AUTOMÁTICO
• Salário e contas fixas (aluguel, internet, streaming) entram sozinhos todo mês.
• Recebeu aumento? O histórico do salário fica guardado.
• Importe o extrato do banco (OFX ou CSV) e revise antes de salvar.

METAS QUE FUNCIONAM
• Defina quanto quer guardar por mês e veja quanto ainda pode gastar por dia.
• Limites por categoria, com aviso quando chegar perto.

SEUS DADOS SÃO SEUS
• Tudo fica no seu celular. Sem cadastro, sem anúncios.
• Bloqueio com Face ID ou digital.
• Cópia de segurança e exportação para planilha.

MEU BOLSO PRO
Experimente grátis por 7 dias. Depois, R$ 14,90 por mês ou R$ 119,90 por ano (economize 33%). A assinatura renova automaticamente, a menos que seja cancelada pelo menos 24 horas antes do fim do período. Cancele quando quiser nos ajustes de assinaturas da sua conta da loja.

Termos de uso: https://carlinnn-crs.github.io/Meu-bolso/app-loja/legal/termos.html
Política de privacidade: https://carlinnn-crs.github.io/Meu-bolso/app-loja/legal/privacidade.html

## 5. Novidades desta versão

Primeira versão do Meu Bolso! 🎉

---

## 6. Assinaturas — criar EXATAMENTE com estes códigos

### Apple (App Store Connect → seu app → Assinaturas)
- Grupo de assinaturas: **Meu Bolso Pro**
- Assinatura 1 — ID do produto: `meubolso_pro_mensal` — duração: 1 mês — preço: **R$ 14,90**
- Assinatura 2 — ID do produto: `meubolso_pro_anual` — duração: 1 ano — preço: **R$ 119,90**
- Em cada uma: **Oferta introdutória → Gratuita → 1 semana** (7 dias), para novos assinantes.

### Google (Play Console → Monetizar → Assinaturas)
- ID da assinatura: `meubolso_pro`
- Plano base 1: ID `mensal` — renovação automática mensal — **R$ 14,90**
- Plano base 2: ID `anual` — renovação automática anual — **R$ 119,90**
- Em cada plano: **Oferta → Teste sem custo financeiro → 7 dias**, qualificação “Novos clientes”.

### RevenueCat (o painel que liga as lojas ao app)
- Entitlement: `pro`
- Offering: `default` (marcar como “current”)
  - Pacote **Monthly** (`$rc_monthly`) → `meubolso_pro_mensal` (Apple) e `meubolso_pro:mensal` (Google)
  - Pacote **Annual** (`$rc_annual`) → `meubolso_pro_anual` (Apple) e `meubolso_pro:anual` (Google)
- Copie as chaves públicas (Apple começa com `appl_`, Google com `goog_`) para `app-loja/www/config.js` e mude `MODO_TESTE` para `false`.

---

## 7. Formulários de privacidade

### Apple — “Privacidade do app”
- Coleta dados? **Sim** (só por causa da RevenueCat, que confere a assinatura)
- **Compras → Histórico de compras** — finalidade: *Funcionalidade do app* — vinculado à identidade: **Não** — rastreamento: **Não**
- **Identificadores → ID do usuário** (ID anônimo do app) — finalidade: *Funcionalidade do app* — vinculado: **Não** — rastreamento: **Não**
- Nada mais (os lançamentos ficam só no aparelho).

### Google — “Segurança dos dados”
- O app coleta ou compartilha dados? **Sim**
- **Atividade no app → Compras no app** (histórico de compras): coletado, não compartilhado, finalidade *Funcionalidade do app*
- **IDs do dispositivo ou outros → ID do usuário (anônimo)**: coletado, finalidade *Funcionalidade do app*
- Dados criptografados em trânsito: **Sim**
- O usuário pode pedir exclusão: **Sim** (pelo e-mail de contato; os lançamentos são apagados ao desinstalar)
- Anúncios: **Não**

---

## 8. Prints da loja (screenshots)

Tamanhos pedidos:
- **iPhone 6,9"**: 1320 × 2868 (ou 1290 × 2796)
- **Android (celular)**: mínimo 1080 × 1920
Sugestão de 5 telas: 1) Mês com “Sobrou no mês” · 2) “Para onde foi o dinheiro” · 3) Gráfico do ano · 4) Lançar gasto com botões rápidos · 5) Meta de economia.
Peça ao Claude para gerar os prints com dados de exemplo.

## 9. Observação para o revisor da Apple (App Review Information → Notes)

O Meu Bolso não tem login: todos os dados ficam no aparelho. A assinatura (Meu Bolso Pro, mensal ou anual, com 7 dias grátis) é oferecida na tela de assinatura que aparece na primeira abertura. Use uma conta Sandbox para testar a compra. “Restaurar compras” fica na tela de assinatura e em Ajustes → Assinatura.
