// Cardápio Sweet - Setembro/2026. Item: [nome, descrição, preço]
const MENU = [
  { id: "cafe", label: "Café da manhã", groups: [
    { t: "Combos", note: "Servidos todos os dias, das 8h às 11h.", items: [
      ["Combo 1 pessoa", "Ovos mexidos, 2 fatias de pão artesanal, manteiga e geleia, suco de laranja e salada de frutas com coalhada e granola, café expresso.", "68,00"],
      ["Combo 2 pessoas", "Ovos mexidos, cesta de pães, 1 croissant, manteiga e geleia, 1 prensadinho, 2 cafés, 2 sucos de laranja e 2 saladas de frutas com coalhada e granola.", "132,00"],
      ["Combo Light", "Ovos mexidos, pão integral, suco verde, salada de frutas com coalhada e granola, e café.", "64,00"],
      ["Combo Vegano", "Cesta de pães, geleia, cogumelos salteados, abacate, salada de frutas com granola, suco verde e café.", "68,00"],
    ]},
    { t: "Ovos", items: [
      ["Ovos mexidos ou estrelados", "Panelinha de 3 ovos com azeite de ervas e pão da casa.", "28,00"],
      ["Ovos mexidos com bacon", "Panelinha de 3 ovos com azeite de ervas, bacon e pão da casa.", "36,00"],
      ["Ovos com cogumelos", "Panelinha de 3 ovos mexidos com cogumelos e pão da casa.", "42,00"],
      ["Ovos com brie e tomate", "Panelinha de 3 ovos mexidos com brie, tomates e pão da casa.", "46,00"],
      ["Prato especial", "Ovos estrelados cúrcuma, abacate fatiado, bacon crocante, cogumelos salteados e pão na chapa.", "46,00"],
      ["Prato especial salmão", "Ovos mexidos com azeite de ervas, salmão defumado, cogumelos salteados, sour cream e pão na chapa.", "56,00"],
    ]},
    { t: "Pães e croissants", items: [
      ["Cestinha de pães", "4 fatias de pães do dia com geleia da casa e manteiga.", "32,00"],
      ["Pão na chapa", "Preço por fatia. Use o contador para pedir mais de uma.", "6,00"],
      ["Queijo quente", "Brioche ou pão de forma da casa, manteiga e muito queijo mussarela.", "22,00"],
      ["Prensadinho tradicional", "Brioche ou pão de forma da casa, presunto, queijo e requeijão.", "22,00"],
      ["Bauru", "Brioche, presunto, queijo, requeijão e tomate assado.", "24,00"],
      ["Prensadinho light", "Pão de forma integral da casa prensado, mussarela de búfala e tomate.", "28,00"],
      ["Croque monsieur", "Pão de forma da casa, queijo brie, peito de peru, gratinado em molho bechamel.", "37,00"],
      ["Croque madame", "Croque monsieur com ovo frito.", "39,00"],
      ["Porção de pão de queijo", "6 unidades, porção coquetel.", "14,00"],
      ["Croissant presunto e queijo", "", "19,50"],
      ["Croissant ovo frito", "", "19,50"],
      ["Croissant geleia e manteiga", "", "22,50"],
      ["Croissant com frango desfiado", "", "32,00"],
      ["Croissant especial", "Com salmão defumado, cream cheese, abacate e ovo.", "48,00"],
      ["Croissant madame", "Com brie, peito de peru, requeijão, gratinado com bechamel e ovo.", "46,00"],
      ["Croissant caprese", "Com mussarela de búfala, tomates assados, parma, pesto e rúcula.", "46,00"],
    ]},
    { t: "Doces do café", items: [
      ["Panquecas americanas", "3 panquecas com frutas, calda, acompanha ganache ou doce de leite e chantilly.", "39,00"],
      ["Waffle belga", "Acompanha porção de doce de leite ou ganache de chocolate e geleia da casa, frutas e chantilly.", "38,00"],
      ["French toast", "Fatia de brioche embebida, chapada e salpicada com açúcar, creme Anglaise e frutas vermelhas.", "38,00"],
      ["Salada de frutas da época", "", "28,00"],
      ["Salada de frutas com coalhada e granola", "", "32,00"],
      ["Bowl de yogurte grego", "Frutas vermelhas e granola da casa.", "36,00"],
    ]},
  ]},

  { id: "almoco", label: "Almoço", groups: [
    { t: "Cardápio do dia · R$ 65,00", note: "Almoço todos os dias, das 11h30 às 14h30. De segunda a sexta: escolha seu prato e a entrada e a sobremesa do dia são cortesia da casa.", items: [
      ["Segunda · Leve", "Entrada: salada fresca com molho da casa. Prato quente: frango grelhado com molho de limão siciliano e arroz de amêndoas. Sobremesa: salada de frutas Sweet com chantilly de yogurte.", ""],
      ["Terça · Comfort", "Entrada: pão artesanal tostado, dip de queijo e geleia da casa. Prato quente: milanesa crocante com tagliarine na fonduta de parmesão e molho de salsa. Sobremesa: pudim de baunilha ou chocolate.", ""],
      ["Quarta · Itália", "Entrada: bruschettas de focaccia com pomodoro e manjericão. Prato quente: gnocchi ao ragu de ossobuco. Sobremesa: fatia de tiramisù.", ""],
      ["Quinta · França", "Entrada: mini quiches e mini tartelettes Sweet. Prato quente: entrecôte grelhado ao molho poivre com purê de batatas. Sobremesa: mini crème brûlée.", ""],
      ["Sexta · Internacional", "Entrada: fatia de pão da casa com antepasto do dia. Prato quente: fish & chips Sweet, linguado empanado crocante, batatas rústicas, molho tártaro da casa e coleslaw. Sobremesa: fatia de cheesecake de banana.", ""],
    ]},
    { t: "Pratos principais", items: [
      ["Bife à parmegiana", "Straciatella, tagliarine e pomodoro.", "68,00"],
      ["Strogonoff de filet", "Arroz branco e batatas rústicas.", "78,00"],
      ["Frango prensado", "Com tagliarine, molho branco e sálvia.", "65,00"],
      ["Tortelli de queijo de búfala", "Ao molho pomodoro, straciatella e manjericão fresco ou fonduta trufada. Informe sua escolha nas observações do pedido.", "72,00"],
      ["Lasagna à bolognesa", "Com molho bechamel e pomodoro e azeite trufado.", "72,00"],
      ["Nhoque na fonduta", "Com cogumelo paris e crocante de parma.", "72,00"],
      ["Tagliarine à carbonara", "Molho à base de gemas, bacon e parmesão.", "68,00"],
      ["Filet ao molho de mostarda", "Com batatinhas rústicas.", "84,00"],
      ["Filet ao molho de cogumelos", "Com risoto de parmesão.", "88,00"],
      ["Filet à griset", "Ao molho roti com lascas de alho, arroz de brócolis e batatas rústicas.", "84,00"],
      ["Denver com tortelli trufado", "Denver grelhado, tortelli de búfala, fonduta de parmesão e salsa trufada.", "82,00"],
      ["Risoto de cogumelos", "Risoto cremoso com mix de cogumelos.", "58,00"],
      ["Risoto caprese", "Risoto cremoso com tomates assados, mussarela de búfala e pesto.", "64,00"],
      ["Risoto brie, parma e mel", "Risoto cremoso com brie, parma crocante e mel.", "72,00"],
    ]},
    { t: "Proteínas grelhadas", items: [
      ["Frango prensado com legumes", "Jardineira de legumes e farofa de pesto.", "62,00"],
      ["Denver steak", "Jardineira de legumes e molho chimichurri.", "78,00"],
      ["Linguado", "Na manteiga e sálvia com jardineira de legumes.", "78,00"],
    ]},
    { t: "Adicionais de proteínas", items: [
      ["Filet 90 g", "", "35,00"], ["Filet 180 g", "", "70,00"], ["Denver 200 g", "", "45,00"], ["Frango prensado 180 g", "", "18,00"],
    ]},
    { t: "Do mar", items: [
      ["Risoto de camarão e alho poró", "Risoto cremoso de camarões rosa com alho poró.", "88,00"],
      ["Tagliarine à la vodka e camarões", "Massa fresca com molho rose à la vodka e camarões salteados.", "88,00"],
      ["Haddock defumado", "Peixe defumado grelhado com risoto de limão Siciliano.", "84,00"],
    ]},
  ]},

  { id: "lanches", label: "Lanches e quiches", groups: [
    { t: "Toasts ou crostines", items: [
      ["Caprese", "Pão rústico com mussarela de búfala, tomate assado, manjericão fresco e pesto.", "42,00"],
      ["Cogumelos e parmesão", "Pão rústico com fina camada de cream cheese, cogumelos salteados e parmesão.", "46,00"],
      ["Abacate e ovo estrelado", "Pão rústico com abacate e 2 ovos estrelados ao ponto. Opção vegana: abacate com cogumelos.", "38,00"],
      ["Brie, parma e figo", "Pão rústico com queijo brie gratinado e crocante de parma.", "48,00"],
    ]},
    { t: "Sanduíches", items: [
      ["Ciabatta com entrecot", "Entrecot (ancho) cozido em baixa temperatura, cebolas caramelizadas, queijo provolone, molho de cozimento e maionese de chimichurri.", "58,00"],
      ["Filet na baguete", "Baguete com rosbife de filet, folhas do dia, tomates, queijo e molho bernaise.", "58,00"],
      ["Sweet burguer salada", "Pão da casa com hambúrguer 150 g, queijo mussarela, salada e batatas fritas.", "48,00"],
      ["Sweet burguer bacon", "Pão da casa com hambúrguer de 150 g, queijo cheddar, bacon e batatas fritas.", "48,00"],
      ["Filet no brioche", "Brioche com rosbife de filet, queijo e molho de alho da casa.", "58,00"],
      ["Ciabatta com carne desfiada", "Ciabatta com carne desfiada, queijo, cebola roxa, folhas do dia e molho de páprica da casa.", "48,00"],
      ["Italiano", "Pão italiano ou ciabatta, presunto cru, mussarela de búfala, rúcula e tomate e pesto.", "52,00"],
      ["Ciabatta com prime rib suíno", "Ciabatta com pernil suíno ao Dry hub, queijo, picles de cebola roxa e pepino, folhas e molho agridoce.", "46,00"],
      ["Salada de frango no pão integral", "Pão integral com salada de peito de frango, picles, tapenade de azeitona e folhas do dia.", "45,00"],
    ]},
    { t: "Quiches", note: "As quiches vêm acompanhadas de salada e molho da casa.", items: [
      ["Quiche Lorraine", "Queijo e bacon.", "32,00"],
      ["Quiche carne seca", "Carne seca cremosa e pimenta biquinho.", "32,00"],
      ["Quiche de bacalhau", "Bacalhau desfiado cremoso.", "36,00"],
      ["Quiche de cogumelos", "Mix de cogumelos cremoso.", "34,00"],
    ]},
  ]},

  { id: "compartilhar", label: "Para compartilhar", groups: [
    { t: "Para compartilhar", note: "Disponíveis todos os dias, o dia todo.", items: [] },
    { t: "Porções · 6 unidades, com geleia da casa", items: [
      ["Coxinha de galinha", "", "28,00"], ["Croquete de carne", "", "28,00"], ["Bolinha de queijo", "", "26,00"],
      ["Croquete de camarão", "", "38,00"], ["Bolinha de carne seca", "", "32,00"], ["Croquetas de jamón", "Com compota de figo.", "38,00"],
    ]},
    { t: "Entradas", items: [
      ["Bruschettas de focaccia", "Com pasta de tomate e manjericão.", "56,00"],
      ["Degustação mini crostines", "8 mini crostines sabores variados.", "56,00"],
      ["Burrata Sweet especial", "Com figos caramelizados e parma, acompanha pão da casa.", "96,00"],
      ["Burrata Sweet", "Com molho pomodoro, tomates assados e molho pesto e pães da casa.", "88,00"],
      ["Carpaccio Sweet", "Carpaccio de rosbife, molho de mostarda, pipoca de alcaparras e rúcula.", "64,00"],
      ["Brie Sweet", "Fatia de queijo brie gratinado com geleia de damascos e amêndoas e pão da casa.", "68,00"],
    ]},
    { t: "Saladas", items: [
      ["De rosbife", "Folhas, rosbife ao ponto, tomate assados, parmesão e molho de mostarda.", "68,00"],
      ["Caesar", "Alface Romana, frango prensado, croutons da casa, parmesão e molho Caesar.", "46,00"],
      ["Caprese", "Folhas do dia, mussarela de búfala, tomates e molho pesto.", "48,00"],
      ["De salmão", "Folhas, salmão defumado (ou camarão), cubos de manga, picles e molho de mostarda.", "68,00"],
    ]},
    { t: "Batatas", items: [
      ["Tradicional palito", "", "28,00"], ["Trufada com parmesão", "", "38,00"], ["Rústica com alecrim", "", "42,00"],
    ]},
    { t: "Para 2 pessoas", note: "Uma pausa para dividir sabores e momentos.", items: [
      ["Parmegiana da Casa", "Dois bifes à milanesa com mussarela, molho pomodoro artesanal gratinado, arroz e fritas.", "128,00"],
      ["Milanesa ao molho 4 queijos", "Dois suculentos filés à milanesa com molho 4 queijos gratinado, arroz e fritas.", "128,00"],
      ["Risoto & Medalhões", "Risoto de queijo brie com amêndoas e presunto parma crocante, finalizado com mel, servido com três medalhões de filé ao roti.", "165,00"],
      ["Denver para Dois", "Grelhado de Denver (500 g) com gateau de batatas gratinadas ao molho branco e bacon, farofa de pesto e molho vinagrete da casa.", "138,00"],
    ]},
    { t: "Prato Kids", note: "Escolha a carne e o acompanhamento (tagliarine molho branco, pomodoro ou na manteiga; arroz e fritas). Acompanha suco de laranja ou de laranja com morango. Informe o acompanhamento e o suco nas observações do pedido.", items: [
      ["Bifinho de filet (90 g)", "", "48,00"], ["Bifino de frango (100 g)", "", "42,00"],
    ]},
  ]},

  { id: "sobremesas", label: "Sobremesas", groups: [
    { t: "Sobremesas", items: [
      ["Sweet banana split", "Bananas caramelizadas, sorvete de baunilha, chantilly e farofa crocante.", "46,00"],
      ["Taça de Nutella", "Sorvete de baunilha, chantilly, Nutella, farofa de cookie e canudo de bijou.", "48,00"],
      ["Taça morango split", "Sorvete de baunilha, suspiros, chantilly, morangos e ganache de chocolate.", "46,00"],
      ["Sundae de chocolate", "Sorvete de baunilha, ganache chocolate, chantilly, cookie de chocolate e canudo de bijou.", "42,00"],
      ["Crème brûlée tradicional", "Creme de baunilha com casquinha crocante de caramelo.", "42,00"],
      ["Profiterolis", "Massa choux, recheada com sorvete e acompanha ganache de chocolate.", "46,00"],
    ]},
  ]},

  { id: "bolos", label: "Bolos e tortas", img: "img/eventos.jpg", cta: "Olá! Gostaria de encomendar um bolo/torta do catálogo 2026.", groups: [
    { t: "Bolos e tortas · Catálogo 2026", note: "Sob encomenda. Bolos vendidos por kg, tortas por unidade.", items: [] },
    { t: "Bolos com merengue · preço por kg", items: [
      ["Cipriani Cake", "Pão de ló com mousseline de baunilha.", "125,00"],
      ["Bolo de morangos", "Com pão de ló e creme patisserie.", "110,00"],
      ["Bolo de frutas vermelhas", "Com pão de ló e creme patisserie.", "125,00"],
      ["Bolo de limão", "Com pão de ló e creme patisserie.", "115,00"],
      ["Bolo de pistache", "Com pão de ló de pistache, recheio de pistache e chocolate.", "155,00"],
      ["Bolo de nozes com baba de moça", "", "135,00"],
      ["Bolo de nozes com baba de moça e damasco", "", "135,00"],
      ["Bolo de abacaxi com coco", "Pão de ló branco com cocada e compota de abacaxi.", "105,00"],
      ["Bolo Martha Rocha", "Com baba de moça, suspiro e creme de chocolate ou ameixa.", "125,00"],
    ]},
    { t: "Pavlovas · preço por kg", items: [
      ["Pavlova recheada", "Com creme de limão ou baba de moça, chantilly e frutas vermelhas.", "145,00"],
      ["Pavlova camadas", "Com chantilly e frutas vermelhas.", "145,00"],
    ]},
    { t: "Bolos de chocolate · preço por kg", items: [
      ["Bolo de brigadeiro", "Com pão de ló de chocolate e brigadeiro.", "115,00"],
      ["Bolo de chocolate 1/2 amargo", "Com pão de ló de chocolate e ganache de chocolate 1/2 amargo.", "115,00"],
      ["Bolo de chocolate com frutas", "Com pão de ló de chocolate, ganache, brigadeiro e frutas.", "125,00"],
      ["Bolo de chocolate e caramelo", "Com pão de ló de chocolate, caramelo e crocante.", "115,00"],
      ["Bolo de mousse de chocolate e morangos", "", "95,00"],
      ["Bolo de Carolinas", "Pão de ló de chocolate, recheio de doce de leite.", "95,00"],
      ["Bolo Red Velvet", "Massa cacau red com recheio de cream cheese com frutas.", "115,00"],
    ]},
    { t: "Variados · preço por kg", items: [
      ["Bolo de frutas vermelhas com cheesecake", "Pão de ló, frutas vermelhas e cheesecake.", "115,00"],
      ["Bolo de ninho", "Com beijinho ou com Nutella.", "95,00"],
      ["Bolo de maracujá", "Pão de ló com brigadeiro branco, ganache de maracujá e chantilly.", "95,00"],
      ["Bolo de morango", "Pão de ló com creme de baunilha, morangos e chantilly.", "95,00"],
      ["Frasier", "Pão de ló, creme patisserie e chantilly.", "125,00"],
      ["Espatulado com frutas", "Bolo casadinho ou de bem casado com chantilly e frutas.", "135,00"],
      ["Saint Honorè", "Massa folhada, mousseline de baunilha, carolinas de creme e caramelo.", "135,00"],
    ]},
    { t: "Cheesecakes · escolha o tamanho", note: "Preço por kg. Escolha o tamanho: 15 cm (cerca de 700 g) ou 20 cm (cerca de 1 kg). Ambos servem de 10 a 15 fatias. O valor final do pedido é confirmado pela Sweet pelo WhatsApp.", items: [
      ["Frutas vermelhas", "", "155,00", 1], ["Damasco e amêndoas", "", "155,00", 1], ["Goiabada", "", "115,00", 1], ["Banana caramelada", "", "125,00", 1],
      ["Nozes e doce de leite", "", "165,00", 1], ["Tiramissu", "", "145,00", 1], ["Caramelo salgado", "", "125,00", 1], ["Pistache", "", "165,00", 1],
    ]},
    { t: "Pudins · preço por kg", note: "Tamanho único, cerca de 1 kg.", items: [
      ["Pudim de baunilha", "", "125,00"], ["Pudim de chocolate", "", "145,00"], ["Pudim de pistache", "", "160,00"],
    ]},
    { t: "Tortas · preço por unidade", note: "Tamanho único.", items: [
      ["Torta de limão com merengue", "", "155,00"],
      ["Torta de creme patisserie com frutas", "", "175,00"],
      ["Torta de noz pecan", "", "175,00"],
      ["Torta de maçã", "", "155,00"],
      ["Torta de chocolate com caramelo", "", "150,00"],
      ["Torta chocolate com frutas", "", "175,00"],
    ]},
  ]},

  { id: "cestas", label: "Cestas e presentes", img: "img/cestas.jpg", cta: "Olá! Gostaria de encomendar uma cesta/presente do catálogo 2026.", groups: [
    { t: "Cestas e presentes · Catálogo 2026", note: "Encomendas exclusivamente on-line pelo WhatsApp. Pagamento por Pix ou link de cartão de crédito.", items: [] },
    { t: "Caixas de café da manhã", items: [
      ["Caixa Café da Manhã Sweet · 2 pessoas", "Fatias de pão artesanal, geleia e manteiga, 1 croissant e 1 prensadinho, 6 mini pães de queijo, 2 sucos de laranja natural ou morango 300 ml, cappuccino suíço, 2 saladas de frutas com coalhada e granola, ovos mexidos com azeite de ervas e porção de panquecas ou waffle belga. Informe nas observações do pedido se prefere panquecas ou waffle e suco de laranja ou morango.", "", [["Na caixa Sweet", 255], ["Na caixa acartonada", 295]]],
      ["Caixa de Café da Manhã Master · 2 a 4 pessoas", "Fatias de pão de fermentação natural e manteiga, croissant, pão brioche, 6 mini pães de queijo, geleia Sweet, granola artesanal, bandeja de frios, 2 sucos de laranja, 2 cappuccinos, salada de frutas com coalhada, ovos mexidos, bolo caseiro do dia, caixa de 4 docinhos e porção de panquecas ou waffle belga com frutas e calda. Na caixa de junco sintético. Informe nas observações do pedido se prefere panquecas ou waffle.", "525,00"],
    ]},
    { t: "Chá, doces e happy hour", items: [
      ["Caixa de Chá da Tarde", "Pão brioche, bolo caseiro do dia, geleia Sweet, biscoitos Sweet, 1 quiche e 1 tortinha (escolher sabor), 2 drips Orfeu e 2 chás Twinings. Os sabores da quiche e da tortinha dependem da disponibilidade do dia: consulte os sabores do dia pelo WhatsApp.", "", [["Na caixa Sweet", 255], ["Na caixa acartonada redonda ou retangular", 295]]],
      ["Caixa de Degustação", "Seleção de 15 doces finos. Os sabores dependem da disponibilidade do dia: consulte os sabores do dia pelo WhatsApp.", "120,00"],
      ["Caixa Seleção 4 tortinhas", "4 opções do nosso balcão. Os sabores dependem da disponibilidade do dia: consulte os sabores do dia pelo WhatsApp.", "120,00"],
      ["Caixa Happy Hour", "Pão rústico do dia, burrata, tomatinhos e pesto, geleia Sweet, caixa degustação de 15 doces e, na versão com vinho, vinho branco, tinto, rosé ou frisante 750 ml (consulte rótulos). Nas versões com vinho, informe sua preferência nas observações do pedido.", "", [["Caixa Sweet · sem vinho", 265], ["Caixa Sweet · com vinho", 375], ["Bandeja acartonada · sem vinho", 305], ["Bandeja acartonada · com vinho", 425]]],
      ["Sweet Happy Mini", "Pão rústico do dia, croissant, geleia Sweet, antepasto Sweet e vinho branco, tinto, rosé ou frisante 750 ml (consulte rótulos). Na bandeja acartonada. Informe sua preferência de vinho nas observações do pedido.", "285,00"],
    ]},
    { t: "Cestas especiais de presente", items: [
      ["Cesta Especial Presente P", "2 croissants, 1 geleia Sweet, 1 bomboniere de biscoitos, 1 blister de drageados, 1 blister de suspiros, 1 caneca, 2 drips, 2 chás e mini buquê de flores.", "362,00"],
      ["Cesta Especial Presente G", "2 croissants, 1 geleia Sweet, 1 bomboniere de biscoitos, 1 blister de drageados, 1 caneca, 2 drips, 2 chás, 1 mini buquê de flores, 1 vinho rosé, 1 pão de fermentação natural e 1 granola.", "525,00"],
      ["Bolsa cor caramelo de couro vegetal", "Vinho rosé espanhol, caixa de degustação de 15 doces finos e mini buquê de flores.", "440,00"],
    ]},
    { t: "Bolos artesanais decorados", note: "Sabores de laranja e chocolate: informe o sabor nas observações do pedido. As peças de vidro estão incluídas no preço do bolo.", items: [
      ["Bolo G", "", "225,00"], ["Bolo M", "", "115,00"], ["Bolo P", "", "65,00"],
    ]},
    { t: "Opções de caixas", items: [
      ["Caixa Sweet", "Incluída no preço da cesta.", ""],
      ["Caixa acartonada", "Incluída no valor de algumas cestas.", ""],
      ["Caixa junco sintético", "Valor adicional.", "+115,00"],
      ["Caixa acartonada especial", "Consultar opções e valores adicionais.", ""],
    ]},
    { t: "Entregas, retiradas e regras gerais", noAdd: true, items: [
      ["Encomendas", "Devem ser feitas exclusivamente on-line no WhatsApp (67) 99675-0606, de segunda a sábado, das 8h às 16h.", ""],
      ["Pagamento", "Por Pix ou link de cartão de crédito.", ""],
      ["Entrega ou retirada", "As caixas podem ser retiradas na Sweet no horário normal de funcionamento (Rua Catumbi, 159) ou entregues no endereço informado.", ""],
      ["Taxa de entrega", "Entregas entre 8h e 18h.", "25,00"],
      ["Tolerância de horário", "O horário de chegada pode variar conforme as encomendas e a disponibilidade do dia: pedimos tolerância de 50 minutos a mais ou a menos. Para casos urgentes podemos enviar um Uber ou a cesta pode ser retirada na Sweet (Rua Catumbi, 159). A ordem é estabelecida de acordo com o cronograma do dia.", ""],
    ]},
  ]},

  { id: "bebidas", label: "Bebidas", groups: [
    { t: "Quentes", items: [
      ["Espresso", "", "9,50"], ["Espresso duplo", "", "14,00"], ["Carioca", "2/3 café, 1/3 água.", "11,00"], ["Carioca duplo", "", "14,00"],
      ["Coado drip", "", "16,00"], ["Café com leite", "", "16,00"], ["Cappuccino italiano", "1/3 café, 1/3 leite, 1/3 espuma.", "16,00"],
      ["Cappuccino suíço", "Mistura achocolatada com leite vaporizado.", "24,00"], ["Cappuccino c/ canela", "Cappuccino suíço com canela.", "24,00"],
      ["Machiatto tradicional", "1/3 café, 2/3 espuma cremosa.", "16,00"], ["Adicional doce de leite", "", "+8,00"], ["Adicional Nutella", "", "+12,00"],
      ["Chocolate quente cremoso", "", "26,00"], ["Chocolate quente simples", "", "22,00"], ["Chá importado Twinings", "Consultar opções.", "14,00"],
    ]},
    { t: "Sucos", items: [
      ["Suco de laranja", "", "16,00"], ["Suco verde", "", "18,00"], ["Suco laranja c/ morango", "", "18,00"], ["Suco abacaxi c/ hortelã", "", "18,00"],
    ]},
    { t: "Chá gelado", note: "Os chás flavorizados contêm açúcar.", items: [
      ["Chá tradicional", "", "12,00"], ["Chá de limão", "", "16,00"], ["Chá de cramberry", "", "17,00"], ["Chá de frutas vermelhas", "", "17,00"],
    ]},
    { t: "Gelados", items: [
      ["Soda italiana", "Consulte opções.", "18,00"], ["Cappuccino gelado", "", "26,00"], ["Expresso tônica", "Café, gelo, tônica e limão.", "24,00"],
      ["Crema café", "Espresso, cookie, sorvete de baunilha e chantilly.", "26,00"], ["Affogato", "Café com sorvete de baunilha.", "28,00"],
    ]},
    { t: "Shakes", items: [
      ["Frapê de doce de leite", "Espresso, doce de leite, sorvete de baunilha, chantilly e farofa crocante.", "34,00"],
      ["Frapê de chocolate", "Espresso, chocolate em pó, sorvete de baunilha, chantilly e farofa crocante.", "34,00"],
      ["Milk shake brigadeiro", "Sorvete de baunilha batido com brigadeiro, chantilly, calda de chocolate e canudo de bijou coberto com chocolate.", "34,00"],
      ["Frapê de baunilha", "Sorvete de baunilha, espresso, leite, chantilly e calda de chocolate.", "34,00"],
    ]},
    { t: "Águas, refrigerantes e cervejas", note: "Copo completo +R$ 2,00.", items: [
      ["Água com e sem gás (vidro)", "", "10,50"], ["Água com e sem gás (plástico)", "", "8,50"],
      ["Refrigerante 220 ml", "Coca ou Zero.", "7,50"], ["Refrigerante 269 ml", "Guaraná.", "8,00"], ["Refrigerante 350 ml", "Coca e Guaraná normal ou zero.", "10,00"],
      ["Long neck", "Corona ou Heineken.", "18,00"], ["Stella Artois sem glúten", "", "19,50"],
    ]},
    { t: "Drinks", items: [
      ["Negroni", "Gin, vermute e Campari. Clássico italiano, intenso e elegante, com notas amargas e aromáticas.", "42,00"],
      ["Gin tônica", "Gin e água tônica. Refrescante e aromático. Consulte os complementos disponíveis.", "42,00"],
      ["Mimosa", "Espumante e suco de laranja. Leve, cítrico e delicado, perfeito para começar o dia.", "34,00"],
      ["Aperol spritz", "Aperol, espumante e água tônica. Refrescante, levemente amargo e com toque cítrico. Um clássico vibrante.", "42,00"],
      ["Lillet spritz", "Vinho aromatizado francês, morangos, hortelã e água tônica. Elegante, fresco e aromático, com notas frutadas e herbais.", "44,00"],
      ["Limoncello spritz", "Limoncello, espumante e água tônica. Cítrico, refrescante e levemente doce. Perfeito para dias quentes.", "42,00"],
      ["Clericot (jarra 750 ml)", "Frutas frescas, grenadine, espumante e água com gás. Perfeito para compartilhar.", "145,00"],
      ["Ginger soda (sem álcool)", "Xarope artesanal de gengibre, mel e limão siciliano com água tônica. Refrescante, levemente picante e equilibrado.", "28,00"],
      ["Drink Lucia (sem álcool)", "Famoso drink sem álcool composto de suco de maçã e ervas aromáticas.", "38,00"],
    ]},
  ]},

  { id: "vinhos", label: "Vinhos", groups: [
    { t: "Vinhos tintos", items: [
      ["Le Casine Sangiovese (Itália)", "Uva: Sangiovese. Tinto leve a médio corpo, com notas de frutas vermelhas e leve acidez. Perfeito para massas e pratos italianos.", "206,00"],
      ["Le Casine Chianti (Itália)", "Uva: Sangiovese. Tinto de médio corpo, com frutas vermelhas, leve acidez e toque especiado. Ideal para carnes e massas.", "224,00"],
      ["C'est la vie tinto (França)", "Uvas: Pinot Noir e Syrah. Tinto jovem e macio, com frutas vermelhas e leve especiaria. Perfeito para tábuas e pratos leves.", "186,00"],
    ]},
    { t: "Vinhos rosé", items: [
      ["Esmeralda rosé (Espanha)", "Uva: Garnacha. Rosé leve, aromático e extremamente refrescante, com notas de frutas vermelhas e toque floral. Perfeito para dias leves e momentos descontraídos.", "189,00"],
      ["Ceressou rosé (Languedoc, França)", "Uvas: Cinsault, Grenache Noir e Syrah. Rosé leve e vibrante, com boa acidez e frescor. Perfeito para saladas e carnes brancas.", "186,00"],
    ]},
    { t: "Vinhos brancos", items: [
      ["Chateu de la Bouyere (França)", "Uvas: Semillon e Sauvignon Blanc. Branco com aromas intensos e toques de verde. Perfeito para saladas, peixes e entradas.", "189,00"],
      ["Ceressou branco (França)", "Uvas: Colombard, Grenache Blanc e Viognier. Branco leve e refrescante, com toque floral e mineral. Equilibrado e fácil de beber. Perfeito para peixes e queijos.", "149,00"],
    ]},
    { t: "Espumantes", note: "Às sextas e sábados, a Sweet oferece rolha livre. Sinta-se à vontade para trazer seu vinho favorito. Consulte também nossas opções disponíveis em taça a partir de R$ 38,00.", items: [
      ["Salton Prosecco Brut (Brasil)", "Uva: Glera. Espumante leve e refrescante, com notas cítricas e toque floral. Fino, equilibrado e muito agradável. Disponível nas versões branco e rosé: informe a versão nas observações do pedido.", "136,00"],
      ["Espumante premium", "Método tradicional, seleção especial da casa. Perfeito para celebrar momentos especiais. Consulte disponibilidade e preço.", ""],
    ]},
  ]},
];

// Selos do cardápio impresso (Vegano, Low sugar, Proteico, Novidade)
const SELO_INFO = {
  vegano: ["Vegano", "sel-vegano"],
  lowsugar: ["Low sugar", "sel-lowsugar"],
  proteico: ["Proteico", "sel-proteico"],
  novidade: ["Novidade", "sel-novidade"],
};
const ITEM_SELOS = {
  "Combo Light": ["lowsugar"],
  "Combo Vegano": ["vegano"],
  "Abacate e ovo estrelado": ["vegano"],
  "French toast": ["novidade"],
  "Ciabatta com entrecot": ["novidade"],
  "Drink Lucia (sem álcool)": ["novidade"],
};
const GROUP_SELOS = {
  "Ovos": ["proteico"],
  "Saladas": ["proteico"],
  "Proteínas grelhadas": ["proteico"],
  "Adicionais de proteínas": ["proteico"],
  "Prato Kids": ["novidade"],
};
function selosHTML(keys) {
  return (keys || []).map(k => `<span class="sel ${SELO_INFO[k][1]}">${SELO_INFO[k][0]}</span>`).join("");
}

// Itens vendidos por tamanho (cheesecakes): cada tamanho vira uma opção com valor estimado pelo peso.
const SIZE_OPTIONS = [["15 cm", "cerca de 700 g", 0.7], ["20 cm", "cerca de 1 kg", 1]];
function sizeOptions(baseId, name, perKg) {
  return SIZE_OPTIONS.map(([label, peso, w], k) => ({
    id: `${baseId}-s${k}`, name: `Cheesecake ${name} (${label})`, label, peso,
    price: 0, ref: perKg, kg: false, img: "img/cheesecake.jpg", // sem preço fixo: valor confirmado pela Sweet
  }));
}

// Foto de cada produto (usada na janela de detalhes e no carrinho)
const IMG_BY_NAME = {
  "cipriani cake": "img/cipriani.jpg",
  "bolo de pistache": "img/pistache.jpg",
  "pavlova recheada": "img/pavlova.jpg",
  "torta de limão com merengue": "img/torta-limao.jpg",
  "caixa seleção 4 tortinhas": "img/tortinhas.jpg",
  "caixa café da manhã sweet · 2 pessoas": "img/cafe.jpg",
  "caixa de chá da tarde": "img/cha.jpg",
  "caixa de café da manhã master · 2 a 4 pessoas": "img/cafe-master.jpg",
  "caixa de degustação": "img/degustacao.jpg",
  "caixa happy hour": "img/happy-hour.jpg",
  "sweet happy mini": "img/happy-mini.jpg",
  "cesta especial presente p": "img/cesta-p.jpg",
  "cesta especial presente g": "img/cesta-g.jpg",
  "bolsa cor caramelo de couro vegetal": "img/bolsa.jpg",
};
const IMG_BY_GROUP = [[/^cheesecakes/i, "img/cheesecake.jpg"], [/^pudins/i, "img/pudim.jpg"], [/^bolos artesanais/i, "img/bolo-decorado.jpg"]];
function imgForItem(name, group) {
  const byName = IMG_BY_NAME[String(name).toLowerCase()];
  if (byName) return byName;
  const hit = IMG_BY_GROUP.find(([re]) => re.test(group || ""));
  return hit ? hit[1] : "";
}
// Itens com opções de preço fixo (ex.: tipo de caixa): cada opção é um item próprio do pedido.
function optionList(baseId, name, arr) {
  return arr.map(([label, price], k) => ({
    id: `${baseId}-o${k}`, name: `${name} (${label})`, label, peso: "", price, ref: 0, kg: false, img: imgForItem(name, ""),
  }));
}
const brNum = p => parseFloat(String(p).replace("+", "").replace(/\./g, "").replace(",", "."));
// sz = 1 → cheesecake por tamanho (valor a confirmar); sz = [[rótulo, preço], ...] → opções com preço fixo
function buildOptions(id, name, p, sz) {
  if (!sz) return null;
  return sz === 1 ? sizeOptions(id, name, brNum(p)) : optionList(id, name, sz);
}
function sizeRowsHTML(opts) {
  const e = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const money = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return opts.map(s => `
    <div class="size${s.price > 0 ? " priced" : ""}"><span>${e(s.label)}${s.peso ? ` <small>${e(s.peso)}</small>` : ""}</span>${s.price > 0 ? `<b>${money(s.price)}</b>` : ""}
    <button type="button" class="add-btn" data-id="${e(s.id)}" data-name="${e(s.name)}" data-price="${s.price}" data-ref="${s.ref || 0}" data-kg="0" data-img="${e(s.img || "")}" aria-label="Adicionar ${e(s.name)} ao pedido">+ Adicionar</button></div>`).join("");
}

(function renderMenu() {
  const tabs = document.getElementById("menuTabs");
  const body = document.getElementById("menuBody");
  if (!tabs || !body) return;
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const price = p => (p ? (p.startsWith("+") ? `+R$ ${p.slice(1)}` : `R$ ${p}`) : "");

  MENU.forEach((cat, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.role = "tab";
    b.textContent = cat.label;
    b.setAttribute("aria-selected", i === 0);
    b.addEventListener("click", () => show(i));
    tabs.appendChild(b);
  });

  function show(i) {
    [...tabs.children].forEach((b, j) => b.setAttribute("aria-selected", i === j));
    const cat = MENU[i];
    const banner = cat.img ? `<img class="menu-banner" src="${cat.img}" alt="${esc(cat.label)}" loading="lazy">` : "";
    const cta = cat.cta ? `<div class="menu-cta"><a class="btn" target="_blank" rel="noopener" href="${waLink(cat.cta)}">Encomendar pelo WhatsApp</a></div>` : "";
    body.innerHTML = banner + cat.groups.map((g, gi) => {
      const kg = /por kg|o kg/i.test(g.t);
      return `
      <div class="menu-group">
        <h3>${esc(g.t)}${selosHTML(GROUP_SELOS[g.t])}</h3>
        ${g.note ? `<p class="menu-note">${esc(g.note)}</p>` : ""}
        <ul class="menu-items">
          ${g.items.map(([n, d, p, sz], ii) => {
            const v = parseFloat(p.replace("+", "").replace(/\./g, "").replace(",", "."));
            if (sz) {
              const head = sz === 1 ? `<span class="mi-price">R$ ${p} o kg</span>` : "";
              return `
            <li data-c="${cat.id}" data-g="${gi}" data-i="${ii}" tabindex="0" title="Ver detalhes"><div class="mi-head"><span class="mi-name">${esc(n)}${selosHTML(ITEM_SELOS[n])}</span>${head}</div>
            ${d ? `<p>${esc(d)}</p>` : ""}${sizeRowsHTML(buildOptions(`${cat.id}-${gi}-${ii}`, n, p, sz))}</li>`;
            }
            const add = v > 0 && !g.noAdd
              ? `<button type="button" class="add-btn" data-id="${cat.id}-${gi}-${ii}" data-name="${esc(n)}" data-price="${v}" data-kg="${kg ? 1 : 0}" data-img="${imgForItem(n, g.t)}" aria-label="Adicionar ${esc(n)} ao pedido">+ Adicionar</button>`
              : "";
            return `
            <li data-c="${cat.id}" data-g="${gi}" data-i="${ii}" tabindex="0" title="Ver detalhes"><div class="mi-head"><span class="mi-name">${esc(n)}${selosHTML(ITEM_SELOS[n])}</span><span class="mi-price">${price(p)}</span></div>
            ${d ? `<p>${esc(d)}</p>` : ""}${add}</li>`;
          }).join("")}
        </ul>
      </div>`;
    }).join("") + cta;
    if (window.SweetCart) SweetCart.sync();
  }
  show(0);

  // Links que abrem uma aba específica do cardápio
  document.querySelectorAll("[data-tab]").forEach(a => {
    a.addEventListener("click", () => {
      const i = MENU.findIndex(c => c.id === a.dataset.tab);
      if (i >= 0) show(i);
    });
  });
})();
