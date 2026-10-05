# Sweet Café e Confeitaria — Site

Site institucional com cardápio completo, carrinho de pedidos e envio por WhatsApp.
Rua Catumbi, 159 · Jardim Bela Vista · Campo Grande - MS.

## Como funciona
- Site estático (HTML, CSS e JavaScript puros), sem servidor nem banco de dados.
- O carrinho monta o pedido e abre o WhatsApp com a mensagem pronta.
  - **Balcão** (reservas e delivery do cardápio): (67) 3349-4441
  - **Encomendas** (cestas, bolos, doces e eventos): (67) 99675-0606

## Arquivos
| Arquivo | Para que serve |
|---|---|
| `index.html` | Página principal |
| `style.css` | Visual (cores, fontes, responsivo) |
| `script.js` | Menu, status "aberto agora", formulário e números de WhatsApp |
| `menu.js` | **Cardápio, preços e descrições** (é aqui que se altera um preço) |
| `cart.js` | Carrinho de pedidos |
| `modal.js` | Janela de detalhes do produto |
| `img/` | Fotos e logo |

## Como alterar um preço
Abra `menu.js`, procure o nome do item e troque o valor entre aspas, por exemplo `"68,00"`.

## Como mudar um número de WhatsApp
Abra `script.js` e edite `WHATSAPP_NUMBERS` (DDI + DDD + número, só dígitos).

## Publicação
Pode ser publicado no GitHub Pages, Netlify ou em qualquer hospedagem de site estático:
envie todos os arquivos e a pasta `img` juntos.
