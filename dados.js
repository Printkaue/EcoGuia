const ecoDados = {
    plastico: {
        title: "Plásticos em Geral (PET, Embalagens, Copos)",
        icon: "fa-bottle-water",
        badge: "Reciclável - Lixeira Vermelha",
        guide: "Lave levemente para retirar excessos de alimento. Amasse garrafas PET para economizar espaço. Descarte na lixeira vermelha."
    },
    vidro: {
        title: "Vidros (Garrafas, Potes, Copos)",
        icon: "fa-wine-bottle",
        badge: "Reciclável - Lixeira Verde",
        guide: "Lave para remover resíduos. Se estiver quebrado, embrulhe em jornal ou papelão. Descarte na lixeira verde."
    },
  cobre: {
        title: "Fios de Cobre e Cabos Elétricos",
        icon: "fa-plug",
        badge: "Reciclável / E-Lixo - Ponto de Coleta",
        guide: "Não descarte no lixo comum. Fios e cabos contêm cobre e plástico, materiais com alto valor de reciclagem. Leve a ecopontos da prefeitura, cooperativas de reciclagem, ferros-velhos ou caixas de coleta de lixo eletrônico em lojas."
    },
    plastico: {
        title: "Plásticos Comuns (Garrafa PET, Copo descartável, Embalagens, Pote, Sacola, Canudo, Lacre)",
        icon: "fa-bottle-water",
        badge: "Reciclável - Lixeira Vermelha",
        guide: "Lave levemente para retirar excessos de alimento. Amasse garrafas para economizar espaço. Descarte na lixeira vermelha."
    },
    vidro: {
        title: "Vidros e Louças (Copo, Prato, Xícara, Caneca, Tigela, Jarra, Travessa, Espelho, Pote de conserva)",
        icon: "fa-wine-bottle",
        badge: "Reciclável - Lixeira Verde",
        guide: "Vidros de embalagens vão na lixeira verde. Louças (cerâmica/porcelana) e espelhos NÃO são recicláveis, descarte no lixo comum embalados em jornal para evitar cortes."
    },
    papel: {
        title: "Papel e Papelão (Caderno, Livro, Revista, Jornal, Agenda, Apostila, Caixa, Envelope, Cartolina)",
        icon: "fa-box",
        badge: "Reciclável - Lixeira Azul",
        guide: "Mantenha seco e limpo. Papéis sujos de gordura ou restos orgânicos vão no lixo comum. Se os livros estiverem em bom estado, considere doar para bibliotecas."
    },
    metal: {
        title: "Metais (Panela, Frigideira, Talher, Abridor, Ralador, Lata, Prego, Parafuso, Fechadura, Ferramentas)",
        icon: "fa-can-food",
        badge: "Reciclável - Lixeira Amarela",
        guide: "Lave latas de alimento. Ferramentas, panelas e peças metálicas podem ser levadas a ferros-velhos ou cooperativas. Itens pequenos vão na lixeira amarela."
    },

    // 2. ELETRÔNICOS E ELETRODOMÉSTICOS
    eletrodomesticos: {
        title: "Eletrodomésticos Brancos (Geladeira, Fogão, Micro-ondas, Freezer, Máquina de lavar, Ar-condicionado)",
        icon: "fa-temperature-snow",
        badge: "E-Lixo Grande - Ponto de Coleta",
        guide: "Não abandone em calçadas. Procure o serviço de cata-treco da sua prefeitura ou lojas que fazem logística reversa na compra de um novo."
    },
    eletroportateis: {
        title: "Eletroportáteis (Liquidificador, Batedeira, Torradeira, Ventilador, Aspirador, Ferro, Secador, Chapinha)",
        icon: "fa-plug",
        badge: "E-Lixo - Ponto de Coleta",
        guide: "Contêm plásticos e metais valiosos. Leve a ecopontos da prefeitura ou coletores de lixo eletrônico em grandes supermercados."
    },
    eletronicos_info: {
        title: "Eletrônicos e Informática (Computador, Notebook, Celular, TV, Tablet, Teclado, Mouse, Impressora, Monitor, Videogame)",
        icon: "fa-computer",
        badge: "E-Lixo - Logística Reversa",
        guide: "Possuem metais pesados altamente poluentes. NUNCA jogue no lixo comum. Entregue em caixas de coleta de lojas de telefonia ou ecopontos."
    },
    acessorios_eletronicos: {
        title: "Acessórios e Cabos (Fio de cobre, Carregador, Fone de ouvido, Cabo USB, Pendrive, Cartão de memória, Roteador, Controle)",
        icon: "fa-network-wired",
        badge: "E-Lixo - Ponto de Coleta",
        guide: "Fios contêm cobre (muito reciclável). Enrole-os e descarte junto com o lixo eletrônico em coletores específicos de lojas ou cooperativas."
    },
    pilhas: {
        title: "Pilhas e Baterias (Pilha comum, Bateria automotiva, Bateria de celular, Nobreak)",
        icon: "fa-battery-full",
        badge: "Lixo Tóxico - Logística Reversa",
        guide: "Risco altíssimo de contaminação do solo. Entregue em urnas de supermercados, farmácias, bancos ou lojas de eletrônicos."
    },

    // 3. USO PESSOAL, HIGIENE E LIMPEZA
    roupas_tecidos: {
        title: "Roupas e Têxteis (Calça, Camisa, Casaco, Vestido, Lençol, Toalha, Bolsa, Mala, Mochila, Tapete, Cortina, Cobertor)",
        icon: "fa-shirt",
        badge: "Doação / Lixo Comum",
        guide: "Se estiver em bom estado, DOE. Se estiver rasgado ou manchado sem conserto, pode ser usado como pano de chão ou descartado no lixo comum (marrom/preto)."
    },
    calcados: {
        title: "Calçados (Sapato, Tênis, Sandália, Chinelo, Bota)",
        icon: "fa-shoe-prints",
        badge: "Doação / Lixo Comum",
        guide: "Calçados em bom estado devem ser doados. Sapatos totalmente destruídos vão para o lixo comum (rejeitos)."
    },
    higiene_rejeito: {
        title: "Higiene e Rejeitos (Fralda, Absorvente, Cotonete, Algodão, Fio dental, Escova de dente, Esponja, Máscara, Aparelho de barbear)",
        icon: "fa-trash-can",
        badge: "Lixo Comum - Banheiro",
        guide: "São rejeitos biológicos ou materiais de difícil reciclagem. Descarte EXCLUSIVAMENTE no lixo comum (lixeira de banheiro)."
    },
    utilidades_plastico: {
        title: "Utilidades Domésticas (Balde, Bacia, Lixeira, Vassoura, Rodo, Cabide, Pote, Escova de cabelo, Pente, Mangueira)",
        icon: "fa-bucket",
        badge: "Reciclável - Lixeira Vermelha",
        guide: "Sendo feitos majoritariamente de plástico duro, podem ser reciclados. Limpe-os e descarte na coleta seletiva (plástico)."
    },

    // 4. LAZER, CONSTRUÇÃO E OUTROS
    brinquedos_esportes: {
        title: "Brinquedos e Esportes (Boneca, Carrinho, Bola, Quebra-cabeça, Skate, Patins, Bicicleta, Capacete, Raquete, Pelúcia)",
        icon: "fa-gamepad",
        badge: "Doação / Misto",
        guide: "Se funcionar, DOE. Se estiver quebrado, tente separar as partes de metal das de plástico para a coleta seletiva. Pelúcias velhas vão para o lixo comum."
    },
    construcao: {
        title: "Material de Construção (Tijolo, Telha, Cimento, Cano PVC, Madeira, Azulejo, Tinta, Pia, Vaso sanitário)",
        icon: "fa-trowel-bricks",
        badge: "Entulho - Ecoponto",
        guide: "Restos de obra NÃO vão no lixo comum nem na reciclagem de papel/plástico. Contrate uma caçamba regularizada ou leve pequenas quantidades aos Ecopontos da prefeitura."
    },
    automotivo: {
        title: "Automotivo (Pneu, Calota, Retrovisor, Volante, Para-choque, Filtro de óleo, Amortecedor)",
        icon: "fa-car",
        badge: "Logística Reversa / Oficina",
        guide: "Pneus devem ser devolvidos em lojas que vendem pneus ou ecopontos. Peças sujas de óleo são lixo perigoso e devem ser tratadas por oficinas mecânicas especializadas."
    },
    medicamentos: {
        title: "Medicamentos (Remédios vencidos, Cartelas, Pomadas, Xaropes)",
        icon: "fa-pills",
        badge: "Lixo Químico - Farmácias",
        guide: "NUNCA jogue no vaso sanitário ou pia. Leve as cartelas e restos de remédios para as urnas de coleta em farmácias ou postos de saúde."
    },
    organico: {
        title: "Lixo Orgânico (Restos de comida, Cascas, Borra de café)",
        icon: "fa-apple-whole",
        badge: "Orgânico - Lixeira Marrom",
        guide: "Use para compostagem ou descarte no lixo comum (marrom) para envio ao aterro sanitário."
    },
    // 5. MÓVEIS, ILUMINAÇÃO E PRODUTOS ESPECIAIS
    moveis_estofados: {
        title: "Móveis e Estofados (Sofá, Cadeira, Mesa, Guarda-roupa, Colchão, Poltrona, Estante, Rack)",
        icon: "fa-couch",
        badge: "Ecoponto / Cata-treco",
        guide: "Móveis inteiros podem ser doados ou vendidos. Se estiverem inutilizáveis, devem ser recolhidos pelo serviço de cata-treco da prefeitura ou levados aos Ecopontos. Não abandone em vias públicas."
    },
    iluminacao: {
        title: "Iluminação (Lâmpada fluorescente, Lâmpada LED, Lâmpada incandescente, Reator, Abajur, Luminária)",
        icon: "fa-lightbulb",
        badge: "Lixo Tóxico - Logística Reversa",
        guide: "Lâmpadas fluorescentes contêm mercúrio e são altamente tóxicas se quebrarem. Embale-as na caixa original e devolva em supermercados ou lojas de material de construção que possuam urnas de coleta."
    },
    oleo_cozinha: {
        title: "Óleos e Gorduras (Óleo de cozinha, Gordura vegetal, Azeite usado, Banha)",
        icon: "fa-flask",
        badge: "Reciclável - Ponto de Coleta",
        guide: "NUNCA jogue na pia, vaso sanitário ou ralo (1 litro de óleo polui 20 mil litros de água). Espere esfriar, armazene em uma garrafa PET com tampa e leve a pontos de coleta ou ONGs que transformam o óleo em sabão."
    },
    quimicos_toxicos: {
        title: "Químicos e Tóxicos (Tinta, Solvente, Verniz, Inseticida, Veneno, Lata de spray, Embalagem de agrotóxico)",
        icon: "fa-skull-crossbones",
        badge: "Lixo Perigoso - Logística Reversa",
        guide: "Embalagens contaminadas com produtos tóxicos inflamáveis não podem ir para a reciclagem comum de metal/plástico. Devem ser devolvidas ao local de compra ou levadas a postos de coleta específicos da prefeitura."
    },
    papel_rejeito: {
        title: "Papéis Não Recicláveis (Papel higiênico, Guardanapo sujo, Papel toalha, Papel engordurado, Fita crepe, Papel alumínio sujo)",
        icon: "fa-toilet-paper",
        badge: "Rejeito - Lixo Comum",
        guide: "Papéis com fluidos corporais, excesso de gordura ou restos de comida perdem a fibra e não podem ser reciclados. Descarte-os sempre no lixo comum (lixeira de banheiro ou lixo orgânico)."
    },
    jardinagem: {
        title: "Resíduos Verdes (Galho, Folha seca, Grama cortada, Terra, Raiz, Planta morta, Casca de árvore)",
        icon: "fa-leaf",
        badge: "Compostagem / Coleta Verde",
        guide: "Pequenas quantidades podem ir no lixo comum ou serem usadas em composteiras. Grandes volumes de podas de árvores devem ser recolhidos por serviço específico da prefeitura ou levados a Ecopontos."
    },
    vidros_especiais: {
        title: "Vidros Especiais (Box de banheiro, Vidro temperado, Pirex, Refratário, Lente de óculos, Para-brisa, Cristais)",
        icon: "fa-glasses",
        badge: "Rejeito / Coleta Específica",
        guide: "Estes vidros passam por processos químicos e não derretem na temperatura da reciclagem do vidro comum (garrafas). Embale-os bem (em jornais ou caixas) e descarte no lixo comum, ou consulte Ecopontos."
    },
    isopor: {
    title: "Isopor / EPS (Marmitex, Bandejas de Carne, Proteção de Eletrônicos, Copos)",
    icon: "fa-box-open",
    badge: "Reciclável - Lixeira Vermelha / Ponto Específico",
    guide: "O isopor é um tipo de plástico e PODE ser reciclado. Lave levemente para remover gordura e alimentos. Se estiver muito impregnado de molho/gordura, descarte no lixo comum."
},
tetra_pak: {
    title: "Embalagens Longa Vida / Tetra Pak (Caixa de Leite, Suco, Molho de Tomate, Creme de Leite)",
    icon: "fa-box-tissue",
    badge: "Reciclável - Lixeira Azul / Amarela",
    guide: "Compostas por papel, plástico e alumínio. Enxágue para remover o excesso de líquido, dobre a caixa para economizar espaço e descarte na coleta seletiva."
},
capsulas_cafe: {
    title: "Cápsulas de Café (Alumínio e Plástico)",
    icon: "fa-mug-hot",
    badge: "Logística Reversa / Ponto de Coleta",
    guide: "Abra a cápsula e retire a borra de café para compostagem ou lixo orgânico. A estrutura metálica/plástica deve ser levada a postos de coleta dos fabricantes ou ecopontos."
},
raio_x: {
    title: "Chapas de Raio-X e Exames de Imagem",
    icon: "fa-x-ray",
    badge: "Lixo Químico - Ponto de Coleta",
    guide: "Contêm acetato e metais pesados como a prata, altamente poluentes. NUNCA jogue no lixo comum. Entregue em hospitais, clínicas de diagnóstico ou farmácias credenciadas."
},

// 7. SAÚDE DOMÉSTICA E SEGURANÇA
perfurocortantes: {
    title: "Agulhas, Seringas e Perfurocortantes (Insulina, Lancetas, Lâminas de Barbear)",
    icon: "fa-syringe",
    badge: "Resíduo Biológico - Posto de Saúde",
    guide: "Risco alto de infecção e acidentes para garis e catadores. Armazene em garrafa PET rígida ou recipiente de plástico duro bem vedado. Leve à Unidade Básica de Saúde (UBS) mais próxima."
},
cosmeticos_esmaltes: {
    title: "Cosméticos e Maquiagem (Esmaltes, Batons, Cremes, Frascos de Perfume)",
    icon: "fa-pump-soap",
    badge: "Logística Reversa / Lixo Comum",
    guide: "Embalagens plásticas limpas vão no plástico. Potes de esmalte com resíduo seco e maquiagens vencidas contêm químicos; descarte em coletores de logística reversa de perfumarias ou no lixo comum."
},

// 8. MÍDIA, IMPRESSÃO E ELETRÔNICOS MENORES
cds_dvds: {
    title: "CDs, DVDs, Fitas VHS e Disquetes",
    icon: "fa-compact-disc",
    badge: "E-Lixo - Ponto de Coleta",
    guide: "São feitos de policarbonato e metais, materiais que não entram na reciclagem de plásticos comuns. Entregue em ecopontos ou caixas de coleta de lixo eletrônico."
},
cartuchos_toner: {
    title: "Cartuchos de Impressora e Toners",
    icon: "fa-print",
    badge: "Logística Reversa - Fabricante",
    guide: "Possuem resíduos de tinta e pigmentos tóxicos. Devolva às lojas de suprimentos de informática, papelarias ou utilize o programa de devolução do próprio fabricante."
},
cigarros_eletronicos: {
    title: "Vapes e Cigarros Eletrônicos (Pods, Essências, Juul)",
    icon: "fa-smoking",
    badge: "E-Lixo / Lixo Perigoso",
    guide: "Combinam baterias de íon de lítio, circuitos elétricos e resíduos químicos de nicotina. NUNCA jogue no lixo comum ou no banheiro. Descarte exclusivamente em coletores de e-lixo e pilhas."
},
bijuterias_acessorios: {
    title: "Bijuterias, Chaves e Pequenos Objetos Metálicos",
    icon: "fa-key",
    badge: "Reciclável - Lixeira Amarela",
    guide: "Chaves antigas, bijuterias quebradas e moedas fora de circulação são feitas de metal e podem ser recicladas na lixeira amarela ou entregues em cooperativas de reciclagem."
},
};