// === DADOS DA ÁRVORE DE DECISÃO ===
const decisionTree = {
    start: {
        question: "Qual material você deseja descartar?",
        options: [
            { text: "Papel / Papelão 📦", next: "papel_inicio", icon: "fa-box" },
            { text: "Plástico 💧", next: "plastico_inicio", icon: "fa-bottle-water" },
            { text: "Vidro 🍾", next: "vidro_inicio", icon: "fa-wine-bottle" },
            { text: "Metal 🥫", next: "metal_inicio", icon: "fa-gears" },
            { text: "Eletrônicos 💻", next: "eletronico_inicio", icon: "fa-laptop" },
            { text: "Pilhas / Baterias 🔋", next: "res_bateria", icon: "fa-battery-full" },
            { text: "Orgânico / Óleo 🥬", next: "organico_inicio", icon: "fa-leaf" },
            { text: "Tecido / Pano 👕", next: "tecido_inicio", icon: "fa-shirt" },
            { text: "Casa / Diversos 🏠", next: "casa_inicio", icon: "fa-house" },
            { text: "Remédios/Hospitalar 💊", next: "hospitalar_inicio", icon: "fa-notes-medical" },
            { text: "Cosméticos 💄", next: "cosmetico_inicio", icon: "fa-spray-can-sparkles" },
            { text: "Construção/Obra 🧱", next: "construcao_inicio", icon: "fa-trowel-bricks" },
            { text: "Automotivo 🚗", next: "automotivo_inicio", icon: "fa-car" },
            { text: "Pets / Animais 🐶", next: "pet_inicio", icon: "fa-paw" },
            { text: "Químicos / Tóxicos ☢️", next: "perigoso_inicio", icon: "fa-skull-crossbones" }
        ]
    },
    // --- PAPEL ---
    papel_inicio: {
        question: "Qual o tipo ou estado do papel?",
        options: [
            { text: "Limpo e Seco (Caixas, sulfite)", next: "res_papel_reciclavel", icon: "fa-file-lines" },
            { text: "Engordurado (Caixa de pizza)", next: "res_papel_sujo", icon: "fa-pizza-slice" },
            { text: "Papel Térmico (Extrato, cupom)", next: "res_papel_termico", icon: "fa-receipt" },
            { text: "Caixa Longa Vida (Tetra Pak)", next: "res_tetrapak", icon: "fa-box-archive" }
        ]
    },
    // --- PLÁSTICO ---
    plastico_inicio: {
        question: "Qual o formato do plástico?",
        options: [
            { text: "Rígido (Garrafas, potes de margarina)", next: "res_plastico_rigido", icon: "fa-bottle-water" },
            { text: "Flexível (Sacolas de mercado, filme)", next: "res_plastico_flexivel", icon: "fa-bag-shopping" },
            { text: "Isopor (Bandejas, copos térmicos)", next: "res_isopor", icon: "fa-cube" },
            { text: "Metalizado (Salgadinho, café, biscoito)", next: "res_plastico_metalizado", icon: "fa-cookie-bite" }
        ]
    },
    // --- VIDRO ---
    vidro_inicio: {
        question: "Como está o vidro ou de que tipo ele é?",
        options: [
            { text: "Garrafas / Potes de conserva inteiros", next: "res_vidro_inteiro", icon: "fa-wine-glass" },
            { text: "Vidro Quebrado (Qualquer tipo)", next: "res_vidro_quebrado", icon: "fa-burst" },
            { text: "Lâmpadas (Fluorescente ou LED)", next: "res_lampada", icon: "fa-lightbulb" },
            { text: "Espelhos, Vidro de Janela, Pirex, Cristal", next: "res_vidro_especial", icon: "fa-border-all" }
        ]
    },
    // --- METAL ---
    metal_inicio: {
        question: "Que tipo de metal é este?",
        options: [
            { text: "Latas de Alumínio (Cerveja, refri)", next: "res_metal_aluminio", icon: "fa-beer-mug-empty" },
            { text: "Latas de Aço (Conservas, leite em pó)", next: "res_metal_aco", icon: "fa-cube" },
            { text: "Ferramentas, panelas, fios, pregos", next: "res_metal_sucata", icon: "fa-wrench" }
        ]
    },
    // --- ELETRÔNICOS ---
    eletronico_inicio: {
        question: "Qual o tamanho do equipamento?",
        options: [
            { text: "Pequenos (Celular, cabos, mouse, pen-drive)", next: "res_eletronico_pequeno", icon: "fa-mobile-screen" },
            { text: "Médios (TV, Computador, Liquidificador)", next: "res_eletronico_medio", icon: "fa-desktop" },
            { text: "Grandes (Geladeira, Fogão, Máquina de Lavar)", next: "res_linha_branca", icon: "fa-icicles" }
        ]
    },
    // --- ORGÂNICO ---
    organico_inicio: {
        question: "O que é exatamente?",
        options: [
            { text: "Restos de Comida (Cascas, talos, borra de café)", next: "res_organico_comida", icon: "fa-carrot" },
            { text: "Óleo de Cozinha Usado", next: "res_oleo", icon: "fa-jug-detergent" },
            { text: "Poda de Árvores, Grama, Folhas Secas", next: "res_poda", icon: "fa-tree" }
        ]
    },
    // --- TECIDOS ---
    tecido_inicio: {
        question: "Qual o estado do tecido/roupa?",
        options: [
            { text: "Em bom estado (Dá para usar)", next: "res_roupa_doacao", icon: "fa-hand-holding-heart" },
            { text: "Rasgados, manchados, retalhos velhos", next: "res_tecido_reciclagem", icon: "fa-scissors" },
            { text: "Panos sujos com graxa ou produtos químicos", next: "res_pano_contaminado", icon: "fa-triangle-exclamation" }
        ]
    },
    // --- CASA / DIVERSOS ---
    casa_inicio: {
        question: "Qual item de casa você quer descartar?",
        options: [
            { text: "Esponja de Pia (amarela/verde)", next: "res_esponja", icon: "fa-soap" },
            { text: "Cápsulas de Café", next: "res_capsula", icon: "fa-mug-hot" },
            { text: "Filtro de Água / Velas de barro", next: "res_lixo_comum", icon: "fa-faucet-drip" },
            { text: "CDs, DVDs, Disquetes", next: "res_cds", icon: "fa-compact-disc" },
            { text: "Chapas de Raio-X", next: "res_raiox", icon: "fa-x-ray" },
            { text: "Móveis Velhos (Sofá, guarda-roupa)", next: "res_volumoso", icon: "fa-couch" }
        ]
    },
    // --- COSMÉTICOS ---
    cosmetico_inicio: {
        question: "Qual produto cosmético?",
        options: [
            { text: "Esmalte (Frasco com resto ou seco)", next: "res_esmalte", icon: "fa-brush" },
            { text: "Embalagem Vazia de Maquiagem/Shampoo", next: "res_plastico_rigido", icon: "fa-pump-soap" },
            { text: "Frasco de Perfume de Vidro", next: "res_vidro_inteiro", icon: "fa-spray-can" }
        ]
    },
    // --- CONSTRUÇÃO ---
    construcao_inicio: {
        question: "Qual resíduo de obra?",
        options: [
            { text: "Entulho, Tijolo, Concreto, Areia", next: "res_entulho", icon: "fa-trowel-bricks" },
            { text: "Madeira, Pallets", next: "res_madeira", icon: "fa-tree-city" },
            { text: "Resto de Tintas, Solventes, Pincéis sujos", next: "res_quimico", icon: "fa-paint-roller" },
            { text: "Gesso", next: "res_gesso", icon: "fa-cubes" },
            { text: "Telha de Amianto / Fibrocimento antiga", next: "res_amianto", icon: "fa-house-chimney-crack" }
        ]
    },
    // --- AUTOMOTIVO ---
    automotivo_inicio: {
        question: "Qual item automotivo?",
        options: [
            { text: "Pneus Usados", next: "res_pneu", icon: "fa-car" },
            { text: "Bateria de Carro / Moto", next: "res_bateria_carro", icon: "fa-car-battery" },
            { text: "Óleo Lubrificante Motor / Frasco vazio", next: "res_oleo_motor", icon: "fa-oil-can" }
        ]
    },
    // --- PETS ---
    pet_inicio: {
        question: "Qual resíduo do seu pet?",
        options: [
            { text: "Fezes de Cachorro / Saquinhos", next: "res_lixo_banheiro", icon: "fa-poop" },
            { text: "Areia de Gato (Sílica ou Argila)", next: "res_lixo_banheiro", icon: "fa-cat" },
            { text: "Brinquedos roídos (Borracha, plástico)", next: "res_lixo_comum", icon: "fa-bone" }
        ]
    },
    // --- HOSPITALAR / REMÉDIOS ---
    hospitalar_inicio: {
        question: "Qual tipo de material de saúde?",
        options: [
            { text: "Medicamentos vencidos / Sobras / Cartelas vazias", next: "res_remedio", icon: "fa-pills" },
            { text: "Seringas, agulhas (Perfurocortantes)", next: "res_hospitalar", icon: "fa-syringe" },
            { text: "Gaze, algodão, curativos, máscaras", next: "res_lixo_banheiro", icon: "fa-mask-face" }
        ]
    },
    // --- PERIGOSOS ---
    perigoso_inicio: {
        question: "Qual o resíduo tóxico?",
        options: [
            { text: "Agrotóxicos / Defensivos Agrícolas", next: "res_agrotoxico", icon: "fa-skull" },
            { text: "Venenos para rato/inseto, água sanitária", next: "res_quimico", icon: "fa-bottle-droplet" },
            { text: "Cilindros de Gás / Extintores", next: "res_gas", icon: "fa-fire-extinguisher" }
        ]
    }
};

const results = {
    // Papel
    res_papel_reciclavel: { title: "Papel Limpo", icon: "fa-box-open", color: "text-blue-600", badge: "Lixeira Azul", guide: "Desmonte as caixas e coloque na lixeira AZUL. Não amasse folhas de papel se possível (rasgar é melhor que amassar, pois preserva as fibras).", lifecycle: "Enviado para aparistas, vira pasta de celulose e é transformado em caixas, papel toalha e papel higiênico novos.", decomposition: "3 a 6 meses", ecoExchange: "Para anotações rápidas, prefira lousas brancas, aplicativos no celular, ou imprima sempre usando os dois lados da folha." },
    res_papel_sujo: { title: "Papel Engordurado", icon: "fa-trash-can", color: "text-gray-700", badge: "Lixo Comum (Rejeito)", guide: "Guardanapos e caixas de pizza muito engorduradas perdem a utilidade para reciclagem normal. Jogue na lixeira CINZA (lixo comum).", lifecycle: "Vai para o aterro sanitário, onde é comprimido junto com outros rejeitos, gerando gás metano.", decomposition: "2 a 6 meses", ecoExchange: "As partes limpas da caixa de pizza (geralmente a tampa) PODEM ser rasgadas e recicladas! Corte a tampa limpa e recicle-a." },
    res_papel_termico: { title: "Papel Térmico (Cupons)", icon: "fa-receipt", color: "text-gray-700", badge: "Lixo Comum", guide: "Cupons fiscais possuem uma química (Bisfenol-A) que impede a reciclagem normal de papel. Descarte no lixo comum.", lifecycle: "Aterro sanitário. Não pode ser reciclado, pois contamina lotes inteiros de papel de boa qualidade nas usinas.", decomposition: "Cerca de 6 meses", ecoExchange: "A melhor troca: Sempre que o caixa perguntar, peça para NÃO imprimir sua via ou escolha o envio por e-mail/SMS." },
    res_tetrapak: { title: "Embalagem Tetra Pak", icon: "fa-box-archive", color: "text-blue-600", badge: "Lixeira Azul", guide: "Esvazie todo o líquido, levante as abas, amasse para ficar plana e jogue no lixo RECICLÁVEL (Azul).", lifecycle: "Nas usinas especializadas, um liquidificador gigante separa o papel. O plástico e alumínio restantes viram telhas ecológicas super resistentes.", decomposition: "Mais de 100 anos", ecoExchange: "Considere fazer sucos naturais em casa usando frutas, evitando comprar embalagens prontas." },
    // Plástico
    res_plastico_rigido: { title: "Plástico Rígido", icon: "fa-bottle-water", color: "text-red-600", badge: "Lixeira Vermelha", guide: "Potes e garrafas (PET, PEAD). Dê uma enxaguada rápida para tirar restos, amasse e tampe. Lixeira VERMELHA.", lifecycle: "Separados por tipo e cor, são triturados, lavados, derretidos e transformados em pellets (grãos de plástico) para fazer novas embalagens ou tecidos.", decomposition: "Até 400 anos", ecoExchange: "Troque garrafas de água descartáveis por uma garrafa térmica reutilizável (inox). Use sabão em barra em vez de líquido." },
    res_plastico_flexivel: { title: "Plástico Flexível", icon: "fa-bag-shopping", color: "text-red-600", badge: "Lixeira Vermelha", guide: "Sacolas, filme plástico. O truque é colocar vários plásticos flexíveis *dentro* de um único saco, formando uma 'bola', para não voar nas esteiras de triagem.", lifecycle: "São derretidos para formar tubos, conduítes de construção civil, e sacos de lixo pretos resistentes.", decomposition: "Mais de 400 anos", ecoExchange: "Ecobags (sacolas de pano) nas compras de mercado reduzem drasticamente o uso dessas sacolinhas." },
    res_isopor: { title: "Isopor (EPS)", icon: "fa-cube", color: "text-red-500", badge: "Lixeira Vermelha", guide: "Sim, isopor é plástico reciclável! Limpe os restos de comida (se for marmita) e jogue junto aos recicláveis secos.", lifecycle: "Usinas retiram 98% de ar do isopor através de máquinas de calor. A resina pura que sobra vira rodapés, molduras e materiais de escritório.", decomposition: "Tempo indeterminado (centenas de anos)", ecoExchange: "Leve seus próprios potes retornáveis (vidro ou inox) se for buscar comida no restaurante (take-out)." },
    res_plastico_metalizado: { title: "Plástico Metalizado", icon: "fa-cookie-bite", color: "text-gray-700", badge: "Difícil Reciclagem", guide: "BOPP (salgadinhos, biscoitos, café). Pouquíssimas cooperativas aceitam. Geralmente vai para o lixo comum.", lifecycle: "Por misturar plástico flexível com uma película finíssima de alumínio, é caríssimo separá-los. Acaba em aterros.", decomposition: "Mais de 100 anos", ecoExchange: "Compre alimentos a granel, levando seus próprios potes de vidro ao mercado, e faça snacks caseiros (ex: pipoca na panela)." },
    // Vidro
    res_vidro_inteiro: { title: "Vidro Comum", icon: "fa-wine-bottle", color: "text-green-600", badge: "Lixeira Verde", guide: "Garrafas e potes. Esvazie e jogue na lixeira VERDE. Não precisa tirar o rótulo de papel.", lifecycle: "É infinitamente reciclável sem perda de qualidade. É quebrado em cacos, derretido a altíssimas temperaturas e moldado em embalagens novinhas.", decomposition: "Mais de 4.000 anos", ecoExchange: "Sempre dê preferência para embalagens de vidro retornáveis na hora de comprar bebidas no supermercado." },
    res_vidro_quebrado: { title: "Vidro Quebrado", icon: "fa-burst", color: "text-green-600", badge: "Lixeira Verde (CUIDADO)", guide: "Corte uma garrafa PET ao meio, coloque os cacos dentro, feche a outra metade por cima e passe fita. Escreva 'VIDRO QUEBRADO' e jogue no reciclável.", lifecycle: "Irá ser fundido nas vidrarias assim como o vidro inteiro, retornando ao mercado.", decomposition: "Mais de 4.000 anos", ecoExchange: "Reaproveite vidros quebrados (se não estiverem pontiagudos) no fundo de grandes vasos de plantas para fazer a drenagem de água." },
    res_vidro_especial: { title: "Vidro Especial", icon: "fa-border-all", color: "text-green-800", badge: "Ecoponto", guide: "Pirex, espelhos, cristais e janelas TÊM um ponto de derretimento diferente do vidro de garrafa. NÃO misture na lixeira verde. Leve ao ecoponto.", lifecycle: "Geralmente não podem voltar a ser vasilhames, mas são triturados para compor massas asfálticas, fibra de vidro ou abrasivos industriais.", decomposition: "Mais de 4.000 anos", ecoExchange: "Doação! Se o espelho está apenas com manchas velhas, existe um mercado enorme em brechós de decoração vintage que o compraria." },
    res_lampada: { title: "Lâmpadas", icon: "fa-lightbulb", color: "text-orange-500", badge: "Logística Reversa", guide: "Fluorescentes contêm pó de MERCÚRIO (altamente tóxico). Nunca quebre. Leve a supermercados, home-centers ou prefeituras.", lifecycle: "Em ambientes lacrados a vácuo, retira-se o pó tóxico para descontaminação. O vidro e alumínio restantes são vendidos para a indústria.", decomposition: "Indeterminado (Metais pesados e vidro)", ecoExchange: "Substitua toda a iluminação de casa por painéis e lâmpadas de LED, que duram anos a mais e não contêm metais altamente tóxicos." },
    // Metal
    res_metal_aluminio: { title: "Alumínio", icon: "fa-beer-mug-empty", color: "text-yellow-500", badge: "Lixeira Amarela", guide: "Esvazie e amasse para reduzir o volume. Jogue na lixeira AMARELA. O Brasil é campeão mundial de reciclagem de latinhas!", lifecycle: "A lata é derretida, vira enormes bobinas de metal novo e em menos de 60 dias já pode estar de volta na prateleira do mercado como uma nova lata.", decomposition: "200 a 500 anos", ecoExchange: "Em eventos, use copos retráteis de silicone ou copos duráveis (tipo eco-copo) em vez de consumir dezenas de latinhas individuais." },
    res_metal_aco: { title: "Aço (Latas Conserva)", icon: "fa-cube", color: "text-yellow-600", badge: "Lixeira Amarela", guide: "Latas de sardinha, milho, leite em pó. Passe uma água rápida e empurre a tampa para DENTRO da lata para não cortar os coletores. Lixeira AMARELA.", lifecycle: "Nas siderúrgicas, o aço é derretido e transformado em ferramentas, autopeças, ou novas embalagens alimentícias.", decomposition: "Cerca de 10 anos (enferruja)", ecoExchange: "Tente comprar grãos secos (como milho e ervilha) a granel e hidratá-los em casa, em vez de comprá-los enlatados na água/sódio." },
    res_metal_sucata: { title: "Sucata Metálica", icon: "fa-wrench", color: "text-gray-600", badge: "Ferro-Velho / Ecoponto", guide: "Parafusos, fios, panelas pifadas, talheres antigos. Junte em uma caixa e doe a um catador de rua ou leve a um ecoponto/ferro-velho.", lifecycle: "A sucata é triturada, separada magneticamente por tipo (cobre, ferro, aço) e vendida para indústrias metalúrgicas pesadas.", decomposition: "Dezenas a centenas de anos", ecoExchange: "Prefira sempre consertar. Panelas perdem o cabo, mas cabos novos custam poucos reais em lojas de ferragens." },
    // Eletrônicos
    res_eletronico_pequeno: { title: "Lixo Eletrônico Pequeno", icon: "fa-mobile-screen", color: "text-slate-800", badge: "Urna de E-Lixo", guide: "Celulares, cabos, pendrives. Procure urnas da 'Green Eletron' em lojas de telefonia, shoppings ou supermercados grandes.", lifecycle: "O aparelho é desmontado à mão. Placas de circuito vão para fornos onde se recupera ouro, prata, cobre e platina (Mineração Urbana).", decomposition: "Centenas de anos", ecoExchange: "Proteja seus cabos novos com molas nas pontas para que não quebrem e mantenha seu celular por no mínimo 3 a 4 anos." },
    res_eletronico_medio: { title: "Lixo Eletrônico Médio", icon: "fa-desktop", color: "text-slate-800", badge: "Ecoponto / Cata-Treco", guide: "PCs, TVs, Microondas. Leve a um ecoponto municipal ou chame serviços de agendamento de coleta de ONGs como a Coopermiti.", lifecycle: "Equipamentos são triados. Os que funcionam são consertados e doados. O resto é desmontado e os plásticos ABS pesados viram novos produtos duráveis.", decomposition: "Séculos", ecoExchange: "Um computador antigo pode se tornar super rápido apenas trocando o HD interno por um SSD novo, em vez de comprar outro PC." },
    res_linha_branca: { title: "Eletrodoméstico Grande", icon: "fa-icicles", color: "text-slate-500", badge: "Logística Reversa / Coleta", guide: "Geladeiras e Máquinas. Ao comprar uma nova, a lei exige que a loja aceite recolher a sua velha. Ou contrate remoção municipal autorizada.", lifecycle: "O gás freon da geladeira (que destrói a camada de ozônio) é aspirado e filtrado com segurança. O metal da carcaça é 100% reciclado.", decomposition: "Centenas de anos (Libera gás CFC)", ecoExchange: "Sempre faça a limpeza da borracha de vedação da porta da geladeira. Ela evita vazamentos de ar frio, aumentando a vida útil do motor." },
    // Orgânico
    res_organico_comida: { title: "Resíduos Orgânicos", icon: "fa-carrot", color: "text-eco-earth", badge: "Compostagem / Rejeito", guide: "Restos de frutas, legumes, borra de café. A prioridade é a composteira doméstica (húmus). Caso não tenha, lixo comum.", lifecycle: "Se compostado: em 60 dias vira um adubo espetacular. No lixo comum: vai pro aterro, fica sem oxigênio e gera Gás Metano (super poluente).", decomposition: "2 a 12 meses", ecoExchange: "Compre ou faça uma composteira caseira com minhocas californianas em potes no apartamento. Não gera cheiro e reduz seu lixo em 50%!" },
    res_oleo: { title: "Óleo de Cozinha", icon: "fa-jug-detergent", color: "text-yellow-700", badge: "Ponto de Coleta", guide: "NUNCA jogue na pia! Deixe esfriar, passe por um coador de café para uma garrafa PET. Entregue em supermercados ou igrejas.", lifecycle: "Nas indústrias, o óleo é filtrado quimicamente e transformado em Biodiesel (combustível para caminhões) ou Sabão e Detergente em pedra.", decomposition: "1 Litro contamina 25.000 Litros de água", ecoExchange: "Invista em uma panela Airfryer (fritadeira sem óleo). Reduz drasticamente a geração desse resíduo e é melhor para a saúde." },
    res_poda: { title: "Poda e Folhas", icon: "fa-tree", color: "text-green-700", badge: "Resíduo Verde", guide: "Não queime folhas secas! Junte em sacos e coloque para coleta municipal específica, ou use em coberturas de horta.", lifecycle: "As prefeituras possuem grandes picadores de galhos que transformam esse resíduo em 'mulch', protegendo canteiros e parques da cidade.", decomposition: "Semanas a meses", ecoExchange: "Folhas secas caídas devem ser apenas varridas para debaixo das próprias árvores, devolvendo os nutrientes naturally ao solo." },
    // Diversos e Casa
    res_lixo_comum: { title: "Lixo Comum (Rejeito)", icon: "fa-trash-can", color: "text-gray-700", badge: "Lixeira Cinza", guide: "Itens mistos de borracha, plástico complexo ou cerâmica (brinquedos de pets roídos, filtros de água de barro, fitas adesivas). Como não têm reciclagem viável, jogue na lixeira CINZA.", lifecycle: "Vai diretamente para os aterros sanitários. Por serem inertes, não geram tanto gás metano, mas vão ocupar espaço no solo pelas próximas gerações.", decomposition: "De dezenas a centenas de anos", ecoExchange: "Para pets, tente brinquedos de corda de algodão natural ou faça brinquedos trançando roupas e tecidos velhos (upcycling). Eles causam bem menos impacto ambiental." },
    res_esmalte: { title: "Frasco de Esmalte", icon: "fa-brush", color: "text-pink-600", badge: "Pontos Específicos", guide: "O frasco de esmalte NUNCA deve ir para a lixeira verde reciclável, pois o resto de produto dentro é tóxico. Leve a caixas coletoras em grandes perfumarias e farmácias.", lifecycle: "Apenas usinas especializadas podem triturar esses frascos, separando a tinta tóxica (queimada com segurança em fornos) do vidro, que pode voltar limpo à indústria.", decomposition: "Indeterminado (Vidro + Químicos Tóxicos)", ecoExchange: "Procure marcas de cosméticos com selos '5-Free' ou '9-Free', que eliminam formaldeído e outros solventes altamente perigosos para a saúde e meio ambiente de suas fórmulas." },
    res_lixo_banheiro: { title: "Lixo Sanitário / Pet", icon: "fa-toilet-paper", color: "text-gray-700", badge: "Lixo Comum (Rejeito)", guide: "Papel higiênico, fraldas, absorventes, areia de gato, fezes de cachorro. TUDO no lixo do banheiro (lixeira cinza).", lifecycle: "São enviados diretamente para aterros sanitários controlados, cobertos por terra para evitar doenças.", decomposition: "De semanas a 450 anos (fraldas)", ecoExchange: "Coletores menstruais de silicone hospitalar ou calcinhas absorventes laváveis substituem milhares de absorventes plásticos na vida." },
    res_esponja: { title: "Esponja de Pia", icon: "fa-soap", color: "text-yellow-600", badge: "Logística Reversa Especial", guide: "Esponjas de poliuretano (amarelas) são recicladas apenas pelo programa Scotch-Brite (TerraCycle). Se não tiver caixa de coleta perto, é lixo comum.", lifecycle: "Na TerraCycle, elas são derretidas e viram um plástico duro usado na construção de bancos de praça e lixeiras.", decomposition: "Tempo Indeterminado (Microplásticos)", ecoExchange: "Bucha Vegetal! Custa 3x menos, você corta no tamanho ideal, limpa melhor e quando fica velha, vai para a composteira sem poluir." },
    res_capsula: { title: "Cápsula de Café", icon: "fa-mug-hot", color: "text-slate-700", badge: "Coleta da Marca", guide: "Junte as cápsulas usadas em um saco e entregue nas lojas (Nespresso, DolceGusto, Três Corações). Se for no lixo reciclável, esvazie o pó antes.", lifecycle: "As empresas têm robôs que separam o pó (vira adubo para cafezais), o alumínio (volta a ser cápsula) e o plástico (vira mobília).", decomposition: "Mais de 150 anos", ecoExchange: "Existem cápsulas reutilizáveis de Inox onde você coloca seu próprio pó de café, ou troque por uma Prensa Francesa (zero lixo)." },
    res_cds: { title: "CDs / DVDs", icon: "fa-compact-disc", color: "text-slate-500", badge: "Lixo Eletrônico", guide: "O plástico policarbonato do CD é reciclável, mas difícil de processar. Entregue em pontos de coleta de Lixo Eletrônico (Cooperativas).", lifecycle: "O alumínio espelhado é removido. O plástico de alta resistência é moído para fabricar painéis automotivos e carcaças de eletrodomésticos.", decomposition: "Mais de 400 anos", ecoExchange: "Digitalize suas mídias. Serviços de streaming de áudio e vídeo praticamente zeraram o impacto deste resíduo no mundo moderno." },
    res_raiox: { title: "Chapas de Raio-X", icon: "fa-x-ray", color: "text-slate-800", badge: "Farmácias / Hospitais", guide: "Possuem Prata (metal pesado) altamente tóxica. Nunca jogue no lixo comum. Entregue em hospitais ou grandes farmácias.", lifecycle: "Fornos químicos recuperam a prata metálica, que é purificada e vendida para joalherias. O plástico acetato vira embalagens transparentes.", decomposition: "Anos liberando metais no solo", ecoExchange: "Atualmente, a maioria das clínicas médicas envia os resultados dos exames de imagem via Portal/App digital. Recuse a chapa física." },
    res_volumoso: { title: "Móveis e Colchões", icon: "fa-couch", color: "text-amber-800", badge: "Cata-Bagulho", guide: "Agende a coleta pela subprefeitura (Cata-Bagulho) e deixe na calçada apenas no dia marcado. Jogar em terrenos dá multa pesada e causa enchente.", lifecycle: "Móveis bons são doados a entidades sociais. O restante é esmagado por tratores e a madeira velha serve como biomassa para caldeiras industriais.", decomposition: "Centenas de anos (Colas e vernizes)", ecoExchange: "Reforma! Colchões velhos não tem jeito, mas móveis de madeira podem ser lixados e pintados, ganhando cara de item de design moderno." },
    // Tecidos
    res_roupa_doacao: { title: "Roupa para Doação", icon: "fa-hand-holding-heart", color: "text-pink-500", badge: "Economia Circular", guide: "Peças em bom estado. Lave e entregue a ONGs, orfanatos, Exército de Salvação ou revenda em brechós locais.", lifecycle: "Evita que a peça vá para o lixo prematuramente, estendendo a vida útil do tecido e promovendo solidariedade social.", decomposition: "Anos a décadas", ecoExchange: "Compre em Brechós! A indústria da moda ('Fast Fashion') é a segunda mais poluente do planeta. Roupas de segunda mão são exclusivas e ecológicas." },
    res_tecido_reciclagem: { title: "Retalhos / Roupas Velhas", icon: "fa-scissors", color: "text-purple-500", badge: "Reciclagem Têxtil", guide: "Peças furadas e rasgadas. Leve a caixas de coleta em lojas como C&A e Renner, que têm programas de recolhimento têxtil.", lifecycle: "As máquinas cortam os panos velhos, desfiam todas as fibras e criam o 'fio reciclado', usado para encher estofados e bancos de carros.", decomposition: "Até 200 anos (Poliéster/Nylon)", ecoExchange: "Transforme camisetas velhas de algodão nos melhores panos de limpeza de casa que você já teve, economizando na compra de panos sintéticos." },
    res_pano_contaminado: { title: "Pano Contaminado", icon: "fa-triangle-exclamation", color: "text-red-800", badge: "Lixo Tóxico", guide: "Panos sujos de óleo de motor, solvente ou tinta de construção são lixo perigoso. Entregue onde comprou o produto (oficinas/lojas) ou lixo comum dependendo da lei local.", lifecycle: "Geralmente enviados para aterros industriais especializados ou para incineração controlada (coprocessamento) devido ao alto risco.", decomposition: "Tempo indeterminado + Contaminação", ecoExchange: "Para pequenas pinturas caseiras ou manutenção mecânica, forre com jornais velhos ao invés de manchar panos de forma irreversível." },
    // Construção e Outros
    res_entulho: { title: "Entulho de Obra", icon: "fa-trowel-bricks", color: "text-slate-500", badge: "Caçamba / Ecoponto", guide: "Pequenos volumes (porta-malas) -> Ecoponto da prefeitura. Grandes volumes -> Contrate caçamba registrada na prefeitura.", lifecycle: "Trituradores gigantes esmagam o concreto e tijolo. Eles viram rachão (pedra brita) usada para base de estradas e novas calçadas.", decomposition: "Rocha dura milênios (e entope córregos)", ecoExchange: "Aproveite tijolos inteiros que sobraram de demolições menores. Limpos, eles viram limitadores charmosos para canteiros de jardim." },
    res_madeira: { title: "Madeira Limpa", icon: "fa-tree-city", color: "text-amber-900", badge: "Ecoponto", guide: "Tábuas e pallets de construção sem verniz tóxico ou pintura. Ecopontos da prefeitura recebem esse material sem custo.", lifecycle: "É fragmentada em 'cavacos' e queimada em fornos industriais para gerar energia térmica (biomassa), substituindo combustíveis fósseis.", decomposition: "Décadas", ecoExchange: "A internet está cheia de tutoriais incríveis de como pegar um pallet lixado e transformá-lo numa cama rústica moderna e barata." },
    res_gesso: { title: "Gesso / Drywall", icon: "fa-cubes", color: "text-gray-400", badge: "Aterro Especial", guide: "O gesso NUNCA deve ir para caçambas comuns de entulho, pois contamina tudo. Empresas de caçamba têm coleta especial para ele.", lifecycle: "Se molhar no aterro comum, libera gás sulfídrico (cheiro de ovo podre e tóxico). Usinas especializadas moem o gesso e ele volta a ser pó para a construção.", decomposition: "Séculos", ecoExchange: "O pó de gesso recuperado também é excelente para neutralizar a acidez do solo na agricultura. Procure recicladores autorizados!" },
    res_amianto: { title: "Telha de Amianto", icon: "fa-house-chimney-crack", color: "text-red-900", badge: "Altamente Cancerígeno", guide: "EXTREMO CUIDADO. O pó de amianto é cancerígeno. Não quebre! Isole, use máscara e contate serviços especializados de resíduo classe 1.", lifecycle: "Não há reciclagem segura no Brasil. O material é encapsulado (enterrado) em células concretadas de aterros industriais de alta segurança.", decomposition: "Indeterminado", ecoExchange: "Se for reformar tetos, troque telhas de amianto (já proibidas de venda) por telhas ecológicas de fibra de celulose/plástico Tetra Pak." },
    // Automotivo, Químico e Hospitalar
    res_pneu: { title: "Pneus Usados", icon: "fa-car", color: "text-gray-900", badge: "Borracharia / Ecoponto", guide: "A lei obriga: se comprar pneu novo, a loja deve ficar com o velho. Nunca jogue em terrenos (acumula água e dá Dengue).", lifecycle: "Moídos, viram asfalto-borracha de altíssima qualidade (estradas mais seguras) ou grama sintética preta para campos de futebol soçaite.", decomposition: "Mais de 600 anos", ecoExchange: "Faça o balanceamento e alinhamento do carro a cada 10.000km, mantendo a pressão correta, e seus pneus durarão milhares de km a mais." },
    res_bateria_carro: { title: "Baterias Automotivas", icon: "fa-car-battery", color: "text-orange-700", badge: "Logística Reversa", guide: "Baterias de chumbo-ácido são perigosíssimas. Entregue na oficina mecânica ou loja onde comprou. Eles enviam ao fabricante (Lei).", lifecycle: "Nas fábricas, 99% do chumbo e do ácido sulfúrico são purificados e usados em baterias novinhas, num ciclo perfeito e seguro.", decomposition: "Metal pesado altamente tóxico ao solo", ecoExchange: "Não deixe componentes elétricos do carro (som, farol) ligados com o motor desligado, prolongando muito a vida da bateria." },
    res_oleo_motor: { title: "Óleo Lubrificante", icon: "fa-oil-can", color: "text-slate-800", badge: "Postos de Gasolina", guide: "Óleo de motor e seus frascos contaminados vazios. Entregue em postos de combustível (sistema LUB). NUNCA jogue na terra/esgoto.", lifecycle: "Através do refino (rerrefino), ele volta a ter as propriedades originais de lubrificação, tornando-se novo óleo base para a indústria.", decomposition: "Anos poluindo lençóis freáticos", ecoExchange: "Verifique o nível de óleo com a vareta com frequência. Um motor bem lubrificado evita a queima de combustível excessiva e poluição do ar." },
    res_remedio: { title: "Medicamentos", icon: "fa-pills", color: "text-red-600", badge: "Urna Laranja (Farmácias)", guide: "Vencidos, sobras ou cartelas vazias de alumínio. Leve na caixa original e despeje em urnas coletoras em farmácias ou Posto de Saúde.", lifecycle: "Esterilizados em altíssima temperatura em fornos hospitalares, evitando que os princípios ativos alterem os peixes nos rios.", decomposition: "Contaminação irreversível na água", ecoExchange: "Não faça automedicação e compre apenas a quantidade prescrita pelo médico para o tratamento, evitando sobras que vencem." },
    res_hospitalar: { title: "Perfurocortantes", icon: "fa-syringe", color: "text-red-700", badge: "Posto de Saúde", guide: "Agulhas de insulina, bisturis. Guarde dentro de garrafa PET dura ou pote de sorvete, feche e entregue em um Posto de Saúde (UBS).", lifecycle: "Esterilizados em autoclaves para matar patógenos e depois moídos, ou incinerados dependendo do risco biológico.", decomposition: "Séculos (plástico/metal) + Risco de HIV/Hepatite", ecoExchange: "Não tente reencapar agulhas após o uso (causa acidentes). Apenas jogue direto no recipiente rígido seguro que você separou em casa." },
    res_quimico: { title: "Produtos Químicos / Tóxicos", icon: "fa-bottle-droplet", color: "text-purple-800", badge: "Logística Reversa", guide: "Solventes, água sanitária, soda cáustica. Esgote o uso. Entregue a embalagem em ecopontos especiais da prefeitura (Lixo Tóxico).", lifecycle: "Seus restos e embalagens passam por tratamento químico para neutralizar o pH e os metais antes de irem para um aterro industrial blindado.", decomposition: "Décadas de toxidade ativa", ecoExchange: "Vinagre de álcool branco e bicarbonato de sódio limpam a casa inteira e desengorduram sem risco de intoxicar sua família." },
    res_agrotoxico: { title: "Agrotóxicos", icon: "fa-skull", color: "text-red-800", badge: "Devolução Obrigatória", guide: "Descarte comum é CRIME AMBIENTAL. Faça a 'tríplice lavagem' e devolva a embalagem perfurada no exato local onde comprou (Lei inPEV).", lifecycle: "Após descontaminação brutal, o plástico de alta densidade é usado EXCLUSIVAMENTE para fabricar tubos de esgoto e novas embalagens de agrotóxico.", decomposition: "Poluição permanente e morte de abelhas", ecoExchange: "Apoie a agricultura familiar consumindo alimentos orgânicos, que não utilizam defensivos químicos perigosos na produção." },
    res_gas: { title: "Botijões e Extintores", icon: "fa-fire-extinguisher", color: "text-orange-800", badge: "Devolução", guide: "Botijões (P13), cilindros e extintores velhos. Devolva nos distribuidores e revendas oficiais para requalificação. Não podem ser cortados/reciclados em casa.", lifecycle: "Passam por testes de pressão. Se aprovados, recebem válvulas novas e nova pintura. Se condenados por ferrugem, o metal é seguromente derretido.", decomposition: "Anos enferrujando (risco de explosão residual)", ecoExchange: "Faça manutenção nos fogões (chama deve ser azul). Chama amarela/laranja gasta muito mais gás para cozinhar o mesmo alimento." },
    res_bateria: { title: "Pilhas e Baterias Menores", icon: "fa-battery-full", color: "text-orange-600", badge: "Papa-Pilhas", guide: "Pilhas AA/AAA e baterias botões (relógio). Vazam ácido, cádmio e lítio. Colete num pote e leve a supermercados ou bancos (Programa Papa-Pilhas).", lifecycle: "Processos físico-químicos separam o pó preto interno. Dele saem sais metálicos industriais, e zinco metálico que vira peças de banheiro e torneiras.", decomposition: "100 a 500 anos vazando química", ecoExchange: "Ação mais inteligente: Compre um bom carregador e invista em um conjunto de Pilhas Recarregáveis. Elas duram anos e economizam dinheiro." },
    res_madeira: { 
        title: "Madeira Limpa", 
        icon: "fa-tree-city", 
        color: "text-amber-900", 
        badge: "Lixeira Preta / Ecoponto", 
        guide: "Tábuas e pallets de construção sem verniz tóxico ou pintura. Podem ser descartados na lixeira PRETA ou entregues nos Ecopontos da prefeitura.", 
        lifecycle: "É fragmentada em 'cavacos' e queimada em fornos industriais para gerar energia térmica (biomassa), substituindo combustíveis fósseis.", 
        decomposition: "Décadas", 
        ecoExchange: "A internet está cheia de tutoriais incríveis de como pegar um pallet lixado e transformá-lo numa cama rústica moderna e barata." 
    },
};

// === DADOS DO QUIZ (TRIVIA) ===
const triviaQuestions = [
    {
        q: "Qual destes materiais demora mais tempo para se decompor na natureza?",
        options: ["Plástico comum (Sacola)", "Garrafa de Vidro", "Lata de Alumínio", "Pneu de borracha"],
        answer: 1,
        explanation: "O vidro pode demorar mais de 4.000 anos (ou até tempo indeterminado) para se decompor, enquanto as sacolas plásticas levam em média 400 anos."
    },
    {
        q: "Qual é o principal problema de jogar óleo de cozinha na pia?",
        options: ["Entope a rede de esgoto e contamina milhares de litros de água.", "Atrai insetos para dentro da cozinha.", "Derrete os canos de PVC com o tempo.", "Não há problema se usar detergente logo depois."],
        answer: 0,
        explanation: "1 litro de óleo pode contaminar até 25.000 litros de água, dificultando o tratamento e matando a vida aquática."
    },
    {
        q: "O que é 'Logística Reversa'?",
        options: ["Levar o lixo de madrugada para a rua.", "Reciclar papel em casa.", "Responsabilidade da empresa/loja de recolher de volta produtos perigosos.", "Apenas separar lixo seco do orgânico."],
        answer: 2,
        explanation: "É a obrigação legal de fabricantes de recolherem pilhas, eletrônicos, pneus e agrotóxicos após o fim da vida útil."
    },
    {
        q: "O Brasil é líder e referência mundial na reciclagem de qual material?",
        options: ["Plástico PET", "Papel Sulfite", "Bateria de Celular", "Lata de Alumínio"],
        answer: 3,
        explanation: "O Brasil recicla quase 100% das latas de alumínio vendidas, gerando renda para milhares de famílias."
    },
    {
        q: "Ao lavar uma embalagem de iogurte para reciclar, qual o objetivo principal?",
        options: ["Deixar ela cheirosa.", "Não atrair vetores (ratos/insetos) na lixeira e proteger quem trabalha com triagem.", "Fazer a água render mais na cozinha.", "Derreter os plásticos mais rápido nas usinas."],
        answer: 1,
        explanation: "Basta usar um 'fio de água' ou água de reuso. O objetivo não é deixar estéril, mas sim evitar podridão e insetos nos galpões dos catadores."
    },
    {
        q: "Como os restos de medicamentos vencidos devem ser descartados?",
        options: ["No lixo do banheiro.", "Na pia ou no vaso sanitário.", "Em urnas laranjas de farmácias ou postos de saúde.", "No lixo reciclável da lixeira vermelha."],
        answer: 2,
        explanation: "Medicamentos contêm princípios ativos que contaminam a água e o solo de forma irreversível e afetam a vida aquática. Devem ser incinerados corretamente."
    },
    {
        q: "O que é 'Upcycling' (Reutilização Criativa)?",
        options: ["Derreter um plástico para fazer outro igual.", "Jogar o lixo orgânico na horta.", "Transformar um material descartado em algo de maior valor ou utilidade.", "Acelerar a decomposição de materiais no aterro sanitário."],
        answer: 2,
        explanation: "Upcycling é dar uma nova função criativa e de maior valor a algo que iria para o lixo. Um exemplo clássico é fazer móveis rústicos com pallets de madeira velhos."
    },
    {
        q: "Por que não devemos descartar pilhas e baterias no lixo comum?",
        options: ["Porque elas podem explodir na lixeira.", "Porque seus metais pesados vazam e contaminam o solo e os lençóis freáticos.", "Porque elas valem muito dinheiro no ferro-velho.", "Porque deixam a sacola de lixo muito pesada."],
        answer: 1,
        explanation: "Pilhas contêm metais pesados altamente tóxicos (como chumbo e cádmio). Elas devem ser descartadas em coletores apropriados (Papa-Pilhas)."
    },
    {
        q: "Caixas de pizza engorduradas podem ir para a lixeira azul de reciclagem?",
        options: ["Sim, o papelão é sempre reciclável independentemente do estado.", "Não, a gordura contamina as fibras do papel e impede a reciclagem.", "Apenas se você lavar com água quente e sabão antes.", "Sim, as usinas têm máquinas que separam a gordura facilmente."],
        answer: 1,
        explanation: "A parte engordurada do papelão perde a utilidade para reciclagem e deve ir para o lixo comum (rejeito). A dica é rasgar e reciclar apenas a tampa limpa!"
    },
    {
        q: "O isopor (EPS) é um material reciclável?",
        options: ["Sim, ele é um tipo de plástico (98% ar) e é totalmente reciclável.", "Não, é feito de espumas tóxicas irreversíveis.", "Apenas se for derretido com fogo em casa.", "Não, ele deve sempre ser enterrado em aterros."],
        answer: 0,
        explanation: "O isopor é plástico! As cooperativas têm máquinas que retiram o ar dele, transformando-o em resina pura para fabricar rodapés, molduras e réguas."
    },
    {
        q: "Qual é a cor padrão da lixeira de coleta seletiva destinada ao VIDRO no Brasil?",
        options: ["Azul", "Vermelho", "Verde", "Amarelo"],
        answer: 2,
        explanation: "Segundo o padrão CONAMA no Brasil: Verde é para Vidro, Azul para Papel, Vermelho para Plástico e Amarelo para Metal."
    },
    {
        q: "Qual é a principal vantagem ambiental da compostagem doméstica do lixo orgânico?",
        options: ["Evitar o acúmulo de poeira nos móveis.", "Transformar restos de alimentos em adubo rico e evitar a geração do poluente gás metano nos aterros.", "Aumentar o volume de lixo coletado pelos caminhões.", "Permitir que o plástico se decomponha junto com as cascas."],
        answer: 1,
        explanation: "A compostagem transforma restos de comida em adubo natural (húmus), impedindo que o material apodreça sem oxigênio nos aterros sanitários e gere gás metano."
    },
    {
        q: "O que significa o termo 'Mineração Urbana' na reciclagem de eletrônicos?",
        options: ["Cavar buracos na cidade para procurar lixo enterrado.", "Extrair metais preciosos (ouro, prata e cobre) de placas e circuitos de aparelhos velhos.", "Usar tratores para limpar terrenos baldios cheios de lixo.", "Fabrica pilhas usando areia de construção."],
        answer: 1,
        explanation: "A mineração urbana recupera metais nobres e valiosos contidos dentro de placas de circuitos de computadores e celulares velhos, evitando novas minerações na natureza."
    },
    {
        q: "Nas garrafas de plástico PET, o símbolo triangular de reciclagem traz qual número dentro dele?",
        options: ["Número 1", "Número 3", "Número 5", "Número 7"],
        answer: 0,
        explanation: "O plástico PET (Polietileno Tereftalato), usado em garrafas de refrigerante e água, é identificado internacionalmente pelo número 1 no símbolo de reciclagem."
    },
    {
        q: "Qual o benefício ecológico de optar por comprar roupas em brechós ou praticar moda circular?",
        options: ["Aumentar a venda de tecidos sintéticos novos.", "Economizar milhares de litros de água e energia que seriam usados na fabricação de roupas novas.", "Garantir que as roupas durem exatamente uma semana.", "Incentivar o uso de embalagens plásticas descartáveis."],
        answer: 1,
        explanation: "A indústria da moda é uma das mais poluentes do planeta. Reaproveitar uma peça existente estende seu ciclo de vida e poupa os recursos naturais necessários para produzir uma peça do zero."
    }
];

let triviaCurrentQ = 0;
let triviaScore = 0;
let currentTriviaSession = [];

let currentStep = 'start';
let history = []; 

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const btnBack = document.getElementById('btn-back');
const progressBar = document.getElementById('progress-bar');

// === NOVA FUNÇÃO DE NAVEGAÇÃO DE ABAS (INCLUI MAIS INFORMAÇÕES) ===
function switchTab(tab) {
    // 1. Ocultar todas as seções ativas
    document.getElementById('section-classifier').classList.add('hidden');
    document.getElementById('section-trivia').classList.add('hidden');
    document.getElementById('section-info').classList.add('hidden');
    
    const searchSection = document.getElementById('section-search');
    if(searchSection) searchSection.classList.add('hidden');
    
    const newsSection = document.getElementById('section-news');
    if(newsSection) newsSection.classList.add('hidden');
    
    // Resetar botões
    const baseClass = "px-3 md:px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 font-semibold transition flex items-center gap-2 border border-slate-700 text-white";
    document.getElementById('tab-classifier').className = baseClass;
    document.getElementById('tab-trivia').className = baseClass;
    document.getElementById('tab-info').className = baseClass;
    
    const tabSearch = document.getElementById('tab-search');
    if(tabSearch) tabSearch.className = baseClass;
    
    const tabNews = document.getElementById('tab-news');
    if(tabNews) tabNews.className = baseClass;

    // Ativar a aba correspondente
    if (tab === 'classifier') {
        document.getElementById('section-classifier').classList.remove('hidden');
        document.getElementById('tab-classifier').classList.add('bg-eco-primary');
        document.getElementById('tab-classifier').classList.remove('bg-slate-800', 'hover:bg-slate-700');
    } else if (tab === 'trivia') {
        document.getElementById('section-trivia').classList.remove('hidden');
        document.getElementById('tab-trivia').classList.add('bg-eco-blue');
        document.getElementById('tab-trivia').classList.remove('bg-slate-800', 'hover:bg-slate-700');
    } else if (tab === 'info') {
        document.getElementById('section-info').classList.remove('hidden');
        document.getElementById('tab-info').classList.add('bg-eco-earth'); 
        document.getElementById('tab-info').classList.remove('bg-slate-800', 'hover:bg-slate-700');
    } else if (tab === 'search') {
        if(searchSection) searchSection.classList.remove('hidden');
        if(tabSearch) {
            tabSearch.classList.add('bg-purple-600');
            tabSearch.classList.remove('bg-slate-800', 'hover:bg-slate-700');
        }
    } else if (tab === 'news') {
        if(newsSection) newsSection.classList.remove('hidden');
        if(tabNews) {
            tabNews.classList.add('bg-emerald-600');
            tabNews.classList.remove('bg-slate-800', 'hover:bg-slate-700');
        }
        // Chama a função para carregar as notícias assim que a aba for clicada
        fetchEcoNews();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// === FUNÇÕES DO CLASSIFICADOR ===
function renderStep(stepId) {
    currentStep = stepId;
    
    if (stepId.startsWith('res_')) {
        showResult(stepId);
        return;
    }

    const stepData = decisionTree[stepId];
    if (!stepData) return;

    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    
    if (history.length > 0) {
        btnBack.classList.remove('hidden');
    } else {
        btnBack.classList.add('hidden');
    }

    const progress = Math.min(10 + (history.length * 30), 85);
    progressBar.style.width = `${progress}%`;

    questionText.innerText = stepData.question;
    
    optionsContainer.innerHTML = '';
    stepData.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = "option-btn flex flex-col items-center justify-center p-6 bg-white border-2 border-slate-200 rounded-2xl text-slate-700 font-semibold hover:bg-eco-light hover:border-eco-primary";
        
        let iconHtml = '';
        if(option.icon) {
            iconHtml = `<i class="fa-solid ${option.icon} text-4xl mb-4 text-eco-primary"></i>`;
        }
        
        btn.innerHTML = `${iconHtml}<span class="text-center leading-snug">${option.text}</span>`;
        
        btn.onclick = () => {
            history.push(currentStep);
            renderStep(option.next);
        };
        optionsContainer.appendChild(btn);
    });
}

function goBack() {
    if (history.length > 0) {
        const previousStep = history.pop();
        renderStep(previousStep);
    }
}

function resetApp() {
    history = [];
    currentStep = 'start';
    progressBar.style.width = '5%';
    renderStep('start');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showResult(resultId) {
    const data = results[resultId];
    if (!data) return;

    progressBar.style.width = '100%';
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    const iconElement = document.getElementById('result-icon');
    iconElement.className = `fa-solid ${data.icon} ${data.color || 'text-eco-primary'} text-5xl`;
    
    document.getElementById('result-title').innerText = data.title;
    document.getElementById('result-category-badge').innerText = data.badge;
    document.getElementById('result-guide').innerHTML = `<p>${data.guide}</p>`;
    document.getElementById('result-decomposition').innerText = data.decomposition;
    
    document.getElementById('result-lifecycle').innerText = data.lifecycle;
    document.getElementById('result-eco-exchange').innerText = data.ecoExchange;

    window.scrollTo({ top: document.getElementById('hero').offsetHeight, behavior: 'smooth' });
}

// === FUNÇÕES DO ECO-QUIZ ===
function startTrivia() {
    let shuffled = [...triviaQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    currentTriviaSession = shuffled.slice(0, 5);
    triviaCurrentQ = 0;
    triviaScore = 0;
    document.getElementById('trivia-intro').classList.add('hidden');
    document.getElementById('trivia-result').classList.add('hidden');
    document.getElementById('trivia-play').classList.remove('hidden');
    renderTriviaQuestion();
}

function renderTriviaQuestion() {
    const qData = currentTriviaSession[triviaCurrentQ];
    document.getElementById('trivia-counter').innerText = `Pergunta ${triviaCurrentQ + 1} de ${currentTriviaSession.length}`;
    document.getElementById('trivia-score-display').innerText = `Pontos: ${triviaScore}`;
    document.getElementById('trivia-question').innerText = qData.q;
    
    const optionsDiv = document.getElementById('trivia-options');
    optionsDiv.innerHTML = '';
    
    qData.options.forEach((optText, index) => {
        const btn = document.createElement('button');
        btn.className = "quiz-btn text-left p-4 bg-white border-2 border-slate-200 rounded-xl text-slate-700 font-semibold transition w-full";
        btn.innerText = optText;
        btn.onclick = () => checkTriviaAnswer(index, btn, qData);
        optionsDiv.appendChild(btn);
    });

    document.getElementById('trivia-feedback').classList.add('hidden');
    document.getElementById('btn-next-trivia').classList.add('hidden');
}

function checkTriviaAnswer(selectedIndex, btnElement, qData) {
    const optionsDiv = document.getElementById('trivia-options');
    const buttons = optionsDiv.querySelectorAll('button');
    buttons.forEach(b => { b.disabled = true; b.classList.remove('quiz-btn'); });

    const feedback = document.getElementById('trivia-feedback');
    feedback.classList.remove('hidden');

    if (selectedIndex === qData.answer) {
        btnElement.classList.add('correct-answer');
        feedback.className = "mt-6 p-4 rounded-xl font-medium text-center bg-green-50 text-green-800 border border-green-200";
        feedback.innerHTML = `<i class="fa-solid fa-circle-check mr-2"></i> <strong>Exato!</strong> ${qData.explanation}`;
        triviaScore++;
        document.getElementById('trivia-score-display').innerText = `Pontos: ${triviaScore}`;
    } else {
        btnElement.classList.add('wrong-answer');
        buttons[qData.answer].classList.add('correct-answer');
        feedback.className = "mt-6 p-4 rounded-xl font-medium text-center bg-red-50 text-red-800 border border-red-200";
        feedback.innerHTML = `<i class="fa-solid fa-circle-xmark mr-2"></i> <strong>Incorreto.</strong> ${qData.explanation}`;
    }
    document.getElementById('btn-next-trivia').classList.remove('hidden');
}

function nextTriviaQuestion() {
    triviaCurrentQ++;
    if (triviaCurrentQ >= currentTriviaSession.length) {
        endTrivia();
    } else {
        renderTriviaQuestion();
    }
}

function endTrivia() {
    document.getElementById('trivia-play').classList.add('hidden');
    document.getElementById('trivia-result').classList.remove('hidden');
    document.getElementById('trivia-final-score').innerText = `Você acertou ${triviaScore} de ${currentTriviaSession.length} perguntas.`;
    
    let msg = "";
    if (triviaScore === currentTriviaSession.length) msg = "Incrível! Você tem um nível altíssimo de consciência ambiental.";
    else if (triviaScore >= 3) msg = "Muito bom! Você está no caminho certo para a sustentabilidade.";
    else msg = "Obrigado por tentar! Volte ao Classificador para continuar aprendendo.";
    
    document.getElementById('trivia-final-msg').innerText = msg;
}

// === NOVO: ÁREA INTERATIVA "VOCÊ SABIA?" (MAIS INFORMAÇÕES) ===
const curiositiesList = [
    "A reciclagem permite que determinados materiais retornem ao ciclo produtivo, reduzindo a necessidade de utilizar novas matérias-primas.",
    "O alumínio pode ser reciclado e voltar ao processo produtivo infinitamente, sendo um dos materiais com maior potencial de reaproveitamento.",
    "Separar os resíduos corretamente em casa facilita imensamente as etapas de triagem nas cooperativas.",
    "A compostagem é uma excelente alternativa para o aproveitamento de resíduos orgânicos, devolvendo nutrientes ao solo.",
    "Pilhas, baterias e alguns equipamentos eletrônicos contêm metais pesados e precisam de formas específicas de gerenciamento.",
    "A reciclagem faz parte de um conjunto maior de ações que envolvem o consumo responsável e a redução da geração de lixo diário.",
    "O vidro é 100% reciclável. Cada quilo de vidro quebrado ou derretido pode produzir exatamente um quilo de vidro novo."
];

let currentCuriosityIndex = 0;

function nextCuriosity() {
    const textElement = document.getElementById('curiosity-text');
    
    // Remove a classe de animação e força o navegador a refazer o cálculo para reiniciar a animação
    textElement.classList.remove('fade-in');
    void textElement.offsetWidth;
    
    // Atualiza o texto sequencialmente
    currentCuriosityIndex = (currentCuriosityIndex + 1) % curiositiesList.length;
    textElement.innerText = curiositiesList[currentCuriosityIndex];
    
    // Adiciona a animação novamente
    textElement.classList.add('fade-in');
}

window.onload = () => {
    renderStep('start');
};
function handleSearchEnter(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

async function performSearch() {
    const inputEl = document.getElementById('search-input');
    const term = inputEl.value.trim();
    if (!term) return;

    const loadingArea = document.getElementById('search-loading');
    const resultsArea = document.getElementById('search-results-area');
    const errorArea = document.getElementById('search-error');
    const wikiExtract = document.getElementById('wiki-extract');
    const wikiLink = document.getElementById('wiki-link');
    const localCard = document.getElementById('local-guide-card');
    const googleCard = document.getElementById('google-fallback-card');

    resultsArea.classList.add('hidden');
    resultsArea.classList.remove('flex'); 
    errorArea.classList.add('hidden');
    loadingArea.classList.remove('hidden');

    try {
        const wikiApiUrl = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`;
        const wikiResponse = await fetch(wikiApiUrl);
        
        if (wikiResponse.ok) {
            const wikiData = await wikiResponse.json();
            wikiExtract.innerText = wikiData.extract || "Artigo sem resumo disponível na Wikipedia.";
            if (wikiData.content_urls && wikiData.content_urls.desktop) {
                wikiLink.href = wikiData.content_urls.desktop.page;
                wikiLink.classList.remove('hidden');
            } else {
                wikiLink.classList.add('hidden');
            }
        } else {
            wikiExtract.innerText = `Não encontramos uma definição exata para "${term}" na Wikipedia. Tente usar termos mais genéricos.`;
            wikiLink.classList.add('hidden');
        }

   // --- 2. BUSCA LOCAL: VARRER OBJETO `ecoDados` ---
        let foundLocalMatch = null;
        const searchLower = term.toLowerCase();
        
        // Agora o código varre o ecoDados (que está no dados.js)
        for (const key in ecoDados) {
            if (Object.prototype.hasOwnProperty.call(ecoDados, key)) {
                const item = ecoDados[key];
                if (item.title.toLowerCase().includes(searchLower) || searchLower.includes(item.title.toLowerCase())) {
                    foundLocalMatch = item;
                    break;
                }
            }
        }

        if (foundLocalMatch) {
            document.getElementById('local-title').innerText = foundLocalMatch.title;
            document.getElementById('local-icon').className = `fa-solid ${foundLocalMatch.icon}`;
            document.getElementById('local-badge').innerText = foundLocalMatch.badge;
            document.getElementById('local-guide').innerHTML = foundLocalMatch.guide;
            localCard.classList.remove('hidden');
            googleCard.classList.add('hidden');
        } else {
            localCard.classList.add('hidden');
            googleCard.classList.remove('hidden');
            document.getElementById('google-link').href = `https://www.google.com/search?q=como+descartar+${encodeURIComponent(term)}`;
        }

        loadingArea.classList.add('hidden');
        resultsArea.classList.remove('hidden');
        resultsArea.classList.add('flex');

    } catch (error) {
        loadingArea.classList.add('hidden');
        errorArea.classList.remove('hidden');
        document.getElementById('error-msg').innerText = "Ocorreu um erro de conexão com a Wikipedia.";
    }
}
// === FUNÇÃO PARA BUSCAR NOTÍCIAS (ECONOTÍCIAS) ===
async function fetchEcoNews() {
    const container = document.getElementById('news-container');
    
    // Mostra um ícone de carregamento enquanto busca
    container.innerHTML = `
        <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10">
            <i class="fa-solid fa-circle-notch fa-spin text-5xl text-emerald-500 mb-4"></i>
            <p class="text-slate-600 font-medium text-lg">Buscando as últimas atualizações pelo mundo...</p>
        </div>
    `;

    try {
        // Usa o Google News RSS (Filtrado por "reciclagem" ou "meio ambiente" do último dia "when:1d")
        // Como o JS precisa de JSON, usamos a API pública do rss2json para converter
const rssQuery = encodeURIComponent('https://news.google.com/rss/search?q=reciclagem+OR+"meio+ambiente"+when:1d&hl=pt-BR&gl=BR&ceid=BR:pt-419');
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssQuery}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        container.innerHTML = ''; // Limpa o carregamento

        if (data.status === 'ok' && data.items.length > 0) {
            // Pega apenas as 6 notícias mais relevantes
            const noticias = data.items.slice(0, 12);

            noticias.forEach(item => {
                // Formata a data e hora para o padrão do Brasil
                const dataPublicacao = new Date(item.pubDate).toLocaleDateString('pt-BR', {
                    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                });

                // Cria o card de cada notícia, contendo o título, data, referência (fonte) e link
                const card = `
                    <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 flex flex-col h-full hover:-translate-y-1 transition duration-300 hover:border-emerald-500">
                        <div class="flex items-center gap-2 text-xs font-bold text-emerald-600 mb-3 uppercase tracking-wide">
                            <i class="fa-regular fa-clock"></i> ${dataPublicacao}
                        </div>
                        <h3 class="text-lg font-bold text-slate-800 mb-3 leading-snug">${item.title}</h3>
                        
                        <div class="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-3">
                            <p class="text-sm text-slate-500 italic"><i class="fa-solid fa-quote-left mr-1"></i> Referência via Google News</p>
                            
                            <a href="${item.link}" target="_blank" class="block text-center w-full bg-emerald-50 hover:bg-emerald-500 text-emerald-700 hover:text-white border border-emerald-200 font-bold py-3 px-4 rounded-xl transition">
                                Ler notícia na íntegra <i class="fa-solid fa-arrow-up-right-from-square ml-1"></i>
                            </a>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });
        } else {
            container.innerHTML = `<p class="col-span-full text-center text-slate-500">Nenhuma notícia encontrada nas últimas 24 horas.</p>`;
        }
    } catch (error) {
        container.innerHTML = `
            <div class="col-span-full text-center py-8">
                <i class="fa-solid fa-triangle-exclamation text-4xl text-red-500 mb-4"></i>
                <p class="text-red-500 font-medium">Erro ao tentar carregar as notícias de hoje. Verifique sua conexão com a internet.</p>
            </div>
        `;
    }
}