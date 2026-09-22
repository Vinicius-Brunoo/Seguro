# Projeto: Chatbot de Seguros - Torrezan Seguros

## Objetivo

Desenvolver um chatbot no WhatsApp utilizando:

- n8n
- WhatsApp Cloud API (Meta)
- Supabase
- Site institucional
- Painel administrativo

O chatbot coleta todos os dados necessários para uma cotação de seguro automóvel.

Após finalizar:

1. salva tudo no Supabase
2. gera um resumo da cotação
3. envia esse resumo para o corretor (Léo)
4. envia uma confirmação para o cliente

---

# Arquitetura

Cliente
↓

WhatsApp Cloud API

↓

Webhook n8n

↓

Fluxo do chatbot

↓

Supabase

↓

Envio WhatsApp
├── Cliente
└── Léo

---

# Tecnologias

- n8n
- Supabase
- WhatsApp Cloud API Oficial (Meta)
- Graph API
- Vercel (site)
- PostgreSQL (Supabase)

---

# Banco de dados

Tabela principal:

quotes

Campos principais:

id
phone
status
step

tipo_cliente
nome
sobrenome
cpf
estado_civil
data_nascimento
genero

placa
cep
codigo_fipe
ano_modelo

under_24
is_insured
previous_bonus

response

leo_message

enviado_leo

status_atendimento

---

# Fluxo da cotação

Cliente envia mensagem

↓

Caso não exista cotação em andamento

↓

Cria registro

↓

Perguntas

Tipo cliente

Nome

Sobrenome

CPF

Estado civil

Nascimento

Sexo

Placa

CEP

Código FIPE

Ano modelo

Menor de 24

Possui seguro

Classe bônus

↓

Finalização

↓

Resumo

↓

Enviar para Léo

↓

Enviar confirmação ao cliente

↓

Atualizar status

---

# Melhorias realizadas

## Google Sheets → Supabase

O projeto inicialmente utilizava Google Sheets.

Foi migrado completamente para Supabase.

Motivos:

- histórico
- velocidade
- confiabilidade
- múltiplas cotações

---

## Múltiplas cotações

Antes:

telefone era chave.

Problema:

novo orçamento sobrescrevia o anterior.

Agora:

cada cotação possui um ID próprio.

Foi criado também:

status

em_andamento

finalizado

nova_cotacao

---

## Fluxo reiniciado

Foi criada lógica para:

"NOVA COTAÇÃO"

sem apagar histórico.

---

## Normalização

Foram adicionadas validações:

acentos

maiúsculas

minúsculas

espaços

normalização unicode

---

## Pergunta inicial

Alterada para botões.

Antes:

"eu"

"outra pessoa"

Agora:

1️⃣ Para mim

2️⃣ Outra pessoa

---

## Upload de apólices

O chatbot consegue encaminhar para o Léo:

PDF

Imagem

Áudio (estrutura preparada)

---

# Meta Cloud API

Integração oficial.

Sem Evolution API.

Mensagens enviadas via:

graph.facebook.com

Token Bearer

Phone Number ID

---

Foi resolvido:

Webhook

Assinatura messages

Verificação Meta

Domínio

HTTPS

---

# Site

Site hospedado.

Painel administrativo funcionando.

Domínio:

torrezanseguros.com.br

---

# Problemas resolvidos

✅ Webhook não registrado

✅ Fluxo reiniciando sozinho

✅ Dados sobrescrevendo

✅ Salvar histórico

✅ Upload de PDF

✅ Upload de imagem

✅ Resumo da cotação

✅ Mensagem final para cliente

✅ Token temporário Meta

✅ Token permanente Meta

---

# Problema atual

O resumo da cotação é criado corretamente.

Também é salvo corretamente.

O cliente recebe a mensagem final.

Porém:

O resumo NÃO está sendo enviado para o Léo.

---

# O que já foi verificado

A mensagem existe.

leo_message é criada.

Resumo aparece corretamente.

Fluxo chega na finalização.

HTTP Request existe.

Número do Léo está configurado.

Mesmo assim o Léo não recebe.

---

# Pontos que precisam ser analisados

Verificar:

- o fluxo realmente passa pelo HTTP Request do Léo

- se leo_message chega até esse nó

- se o JSON enviado está correto

- se enviado_leo está sendo atualizado antes da hora

- se algum IF está desviando o fluxo

- se existe erro silencioso no HTTP Request

- verificar Expressões

Exemplo:

$json.leo_message

ou

$node["Code"].json.leo_message

---

# Próximos passos

Analisar o workflow completo.

Encontrar exatamente onde o fluxo deixa de enviar ao Léo.

Depois disso:

- testes finais

- produção

- monitoramento

- melhorias futuras

---

# Objetivo final

Fluxo esperado:

Cliente

↓

Responde perguntas

↓

Supabase salva

↓

Resumo gerado

↓

Resumo enviado para Léo

↓

Cliente recebe confirmação

↓

Status atualizado

↓

Léo entra em contato manualmente com o cliente.
