/**
 * EcoGuia Rural - Base de Dados Técnicos Especializados
 * Baseado em dados da Embrapa, ZARC (Zoneamento Agrícola de Risco Climático - MAPA),
 * CONAB, CEASAs, inPEV e SENAR.
 */

// 1. DADOS DE CULTURAS AGRÍCOLAS (ECOPLANTIO)
const ruralCropsData = {
    milho: {
        id: "milho",
        name: "Milho (Zea mays)",
        category: "Grãos e Cereais",
        icon: "fa-wheat-awn",
        cycleDays: "90 a 120 dias (dependendo da variedade: precoce ou tradicional)",
        idealTemp: "24°C a 30°C (mínima de 15°C e máxima de 35°C)",
        waterNeed: "400 a 600 mm bem distribuídos ao longo do ciclo",
        soilType: "Franco-arenoso a franco-argiloso, bem drenado, fértil e rico em matéria orgânica",
        soilPh: "5.5 a 6.8",
        spacing: "80 a 90 cm entre linhas | 20 a 25 cm entre plantas (50.000 a 65.000 plantas/ha)",
        seedDepth: "3 a 5 cm",
        plantingSeasons: {
            semiarido: "Início da estação chuvosa regional (geralmente dezembro a março) ou ano todo com irrigação",
            cerrado: "Outubro a dezembro (safra) e janeiro a março (safrinha)",
            sul_sudeste: "Setembro a dezembro (safra) e janeiro a março (safrinha)",
            geral: "Início do período chuvoso da região"
        },
        irrigationTips: "Fases mais críticas para água: florescimento (emissão do pendão e da espiga) e enchimento de grãos. O déficit hídrico nestas fases causa abortamento de grãos. Frequência recomendada em gotejamento: 3 a 4 vezes por semana nas fases iniciais e diária no florescimento em dias quentes.",
        management: [
            "Realizar dessecação ou capina de limpeza 20 a 30 dias antes do plantio.",
            "Adubação de base com esterco curtido (5 a 10 t/ha) ou adubo orgânico fosfatado no sulco.",
            "Adubação de cobertura nitrogenada quando a planta tiver de 4 a 6 folhas (cerca de 20 a 30 dias após emergência).",
            "Consórcio tradicional recomendado no semiárido: Milho + Feijão-de-corda (Caupi) + Abóbora (favorece o solo e reduz pragas)."
        ],
        pestsAndDiseases: [
            {
                name: "Lagarta-do-cartucho (Spodoptera frugiperda)",
                symptoms: "Folhas furadas e presença de fezes no cartucho do milho.",
                control: "Aplicação de bioinseticida à base de Bacillus thuringiensis (Bt), óleo de nim a 1%, ou polvilhamento leve de cinza de fogão com areia fina no cartucho no início da infestação."
            },
            {
                name: "Cigarrinha-do-milho (Dalbulus maidis)",
                symptoms: "Transmite enfezamentos (folhas avermelhadas/amareladas e espigas atrofiadas).",
                control: "Evitar plantios escalonados contínuos ('milho sobre milho'), eliminar milho tiguera e usar variedades mais tolerantes."
            },
            {
                name: "Ferrugem polissora e Mancha-branca",
                symptoms: "Pústulas alaranjadas e manchas necróticas nas folhas.",
                control: "Rotação de culturas, bom espaçamento para ventilação e pulverização preventiva com calda bordalesa ou biofertilizante aeróbico."
            }
        ],
        climateRisks: "Veranicos durante o pendoamento reduzem a produtividade em até 70%. Em áreas de sequeiro no semiárido, consultar o calendário ZARC e utilizar cultivares precoces com alta tolerância à seca (como variedades BRS da Embrapa)."
    },

    feijao_caupi: {
        id: "feijao_caupi",
        name: "Feijão-Caupi / Macassar / De Corda (Vigna unguiculata)",
        category: "Leguminosas",
        icon: "fa-seedling",
        cycleDays: "60 a 85 dias (colheita verde aos 55-60 dias)",
        idealTemp: "25°C a 32°C (altamente adaptado ao calor e semiárido)",
        waterNeed: "300 a 450 mm durante o ciclo (alta eficiência no uso da água)",
        soilType: "Adapta-se a solos arenosos e de média fertilidade; não tolera encharcamento",
        soilPh: "5.5 a 6.5",
        spacing: "50 a 80 cm entre linhas | 15 a 20 cm entre covas (2 a 3 sementes/cova)",
        seedDepth: "3 a 4 cm",
        plantingSeasons: {
            semiarido: "Janeiro a abril (período das águas) ou o ano todo irrigado",
            cerrado: "Fevereiro a abril (safrinha) ou pós-chuvas",
            sul_sudeste: "Janeiro a março",
            geral: "Épocas quentes com chuvas moderadas"
        },
        irrigationTips: "Tolera estresse hídrico moderado, mas não deve faltar água durante a floração e formação das vagens. Na irrigação por gotejamento, regas leves a cada 2 dias são suficientes.",
        management: [
            "Excelente fixador biológico de nitrogênio atmosférico: dispensa adubação química nitrogenada pesada.",
            "Inoculação com estirpes de Rhizobium recomendadas pela Embrapa aumenta produtividade.",
            "Excelente cobertura vegetal e proteção do solo contra a erosão solar.",
            "Desponte das pontas em variedades ramificadas estimula a frutificação."
        ],
        pestsAndDiseases: [
            {
                name: "Pulgão-preto (Aphis craccivora)",
                symptoms: "Colônias de insetos pretos nas brotações e vagens novas, folhas encarquilhadas.",
                control: "Calda de sabão de coco com óleo vegetal (1 colher de sabão neutro + 1 de óleo em 1 litro d'água) ou extrato alcoólico de alho e pimenta."
            },
            {
                name: "Caruncho-do-feijão (Callosobruchus maculatus)",
                symptoms: "Ataca as vagens no campo e destrói os grãos no armazém.",
                control: "Colheita imediata ao secar a vagem e armazenamento em recipientes herméticos com cinza de fogão."
            }
        ],
        climateRisks: "Excesso de chuvas na colheita provoca apodrecimento de vagens e mancha dos grãos. Em caso de previsão de chuva na fase final, colher prontamente as vagens secas."
    },

    feijao_comum: {
        id: "feijao_comum",
        name: "Feijão Comum (Carioca, Preto, Fradinho) (Phaseolus vulgaris)",
        category: "Leguminosas",
        icon: "fa-seedling",
        cycleDays: "70 a 90 dias",
        idealTemp: "18°C a 28°C (sensível a temperaturas superiores a 35°C no florescimento)",
        waterNeed: "350 a 500 mm bem distribuídos",
        soilType: "Solos francos, férteis, bem aerados e sem compactação",
        soilPh: "5.8 a 6.5",
        spacing: "45 a 50 cm entre linhas | 10 a 12 plantas por metro linear",
        seedDepth: "3 a 4 cm",
        plantingSeasons: {
            semiarido: "Período das chuvas amenas ou inverno irrigado",
            cerrado: "Safra das águas (outubro-novembro) e safra de inverno irrigada (maio-julho)",
            sul_sudeste: "Agosto a outubro (águas) e janeiro a março (seca)",
            geral: "Primavera e outono"
        },
        irrigationTips: "Requer umidade uniforme. Evitar rega por aspersão nas horas mais quentes do dia e molhar as folhas para diminuir proliferação de fungos.",
        management: [
            "Sensível a solos ácidos: fazer calagem com antecedência mínima de 60 dias do plantio.",
            "Adubação com fósforo e matéria orgânica curtida no sulco.",
            "Manter a lavoura no limpo durante os primeiros 30 dias para evitar competição por nutrientes."
        ],
        pestsAndDiseases: [
            {
                name: "Mosca-branca (Bemisia tabaci)",
                symptoms: "Transmite o vírus do Mosaico Dourado; folhas amarelas e deformadas.",
                control: "Barreiras vegetais (sorgo ou milho ao redor), armadilhas adesivas amarelas e extrato de nim."
            },
            {
                name: "Antracnose (Colletotrichum lindemuthianum)",
                symptoms: "Lesões necróticas escuras nas nervuras inferiores das folhas e vagens.",
                control: "Sementes sadias certificadas, rotação de cultura por 2 anos e calda bordalesa a 0,5%."
            }
        ],
        climateRisks: "Geada destrói a cultura; temperaturas acima de 30°C no florescimento provocam queda das flores."
    },

    mandioca: {
        id: "mandioca",
        name: "Mandioca / Macaxeira / Aipim (Manihot esculenta)",
        category: "Raízes e Tubérculos",
        icon: "fa-carrot",
        cycleDays: "8 a 12 meses (mesa/macaxeira) e 12 a 18 meses (indústria/farinha)",
        idealTemp: "22°C a 30°C (planta rústica e tropical)",
        waterNeed: "600 a 1.000 mm/ano (alta tolerância a secas prolongadas após enraizamento)",
        soilType: "Arenoso a franco-arenoso, solto, profundo e livre de pedras que deformem as raízes",
        soilPh: "5.0 a 6.5 (tolera solos de acidez moderada)",
        spacing: "1,0 m x 0,8 m a 1,0 m x 1,0 m em covas ou camalhões",
        seedDepth: "Manivas de 15 a 20 cm enterradas a 10 cm na horizontal ou levemente inclinadas",
        plantingSeasons: {
            semiarido: "Início do período chuvoso para garantir brotação e enraizamento inicial",
            cerrado: "Outubro a dezembro",
            sul_sudeste: "Agosto a novembro",
            geral: "Início das chuvas quentes"
        },
        irrigationTips: "Crítica apenas nos primeiros 90 dias após o plantio das manivas para estabelecimento radicular. Depois deste período, a mandioca suporta meses sem água entrando em dormência.",
        management: [
            "Seleção rigorosa de manivas sadias, retiradas do terço médio de plantas vigorosas de 10 a 12 meses.",
            "Plantio em leirões ou camalhões facilita muito a colheita manual e melhora o tamanho das raízes.",
            "Desponte e limpeza nos primeiros 120 dias; após fechamento da copa, a própria sombra controla as ervas.",
            "Aproveitamento da parte aérea (ramas e folhas desidratadas) para feno de alta proteína para animais."
        ],
        pestsAndDiseases: [
            {
                name: "Mandarová-da-mandioca (Erinnyis ello)",
                symptoms: "Lagartas grandes que devoram rapidamente todas as folhas da roça.",
                control: "Aplicação do Baculovirus erinnyis (extrato caseiro macerado de lagartas doentes em água) ou coleta manual em pequenas áreas."
            },
            {
                name: "Podridão-radicular (Phytophthora / Fusarium)",
                symptoms: "Amarelecimento da folhagem e apodrecimento das raízes no solo com cheiro fétido.",
                control: "Evitar solos úmidos e baixios encharcados; rotação de culturas e plantio em camalhões."
            }
        ],
        climateRisks: "Encharcamento do solo apodrece todas as raízes em poucos dias. Em solos rasos e pedregosos, a raiz fica deformada e fibrosa."
    },

    palma_forrageira: {
        id: "palma_forrageira",
        name: "Palma Forrageira (Orelha de Elefante, Miúda, Gigante)",
        category: "Cactáceas Forrageiras",
        icon: "fa-leaf",
        cycleDays: "Primeiro corte aos 18 a 24 meses; cortes subsequentes a cada 12 meses",
        idealTemp: "25°C a 35°C com noites frescas (metabolismo CAM)",
        waterNeed: "200 a 400 mm/ano (a cultura mais eficiente em conversão hídrica do mundo)",
        soilType: "Bem drenado, arenoso ou cascalhento; apodrece em solos encharcados",
        soilPh: "6.0 a 7.5",
        spacing: "Adensada: 1,5 m a 2,0 m entre linhas x 0,20 a 0,50 m entre plantas (10.000 a 30.000 plantas/ha)",
        seedDepth: "Enterrar 1/3 do artículo (raquete) no solo, com a face cortada para baixo",
        plantingSeasons: {
            semiarido: "Final do período seco até início das chuvas (setembro a dezembro)",
            geral: "Qualquer época seca, curando as raquetes à sombra por 7 a 15 dias antes de plantar"
        },
        irrigationTips: "Cultivada prioritariamente em sequeiro. Com irrigação de salvamento (ex: 10 a 15 mm mensais ou água cinza tratada), a produtividade quadruplica.",
        management: [
            "Deixar as raquetes-semente cicatrizarem na sombra por 10 a 15 dias antes do plantio para evitar infecções fúngicas.",
            "Adubação orgânica pesada: responde extraordinariamente a esterco de curral curtido (20 a 40 t/ha).",
            "Manejo do corte: sempre preservar o artículo-mãe (da base) e os artigos secundários para rebrota rápida.",
            "Imprescindível alimentar o gado associada a fonte de fibra seca (feno de capim, palha de milho) para evitar diarreia."
        ],
        pestsAndDiseases: [
            {
                name: "Cochonilha-do-carmim (Dactylopius opuntiae)",
                symptoms: "Gotículas brancas parecendo algodão nas raquetes; sucção de seiva seca e mata a planta.",
                control: "Utilizar variedades resistentes desenvolvidas pela Embrapa e IPA (Orelha de Elefante Mexicana, Palma Miúda/Doce e Baiana); evitar plantar Palma Gigante tradicional em áreas endêmicas."
            }
        ],
        climateRisks: "Geadas severas ou encharcamento prolongado. Resistência máxima à seca do semiárido."
    },

    tomate: {
        id: "tomate",
        name: "Tomateiro (Solanum lycopersicum)",
        category: "Hortaliças e Frutos",
        icon: "fa-apple-whole",
        cycleDays: "90 a 120 dias",
        idealTemp: "20°C a 26°C durante o dia e 15°C a 18°C à noite",
        waterNeed: "400 a 600 mm bem dosados",
        soilType: "Franco-arenoso, fértil, profundo, com excelente drenagem e alto teor de matéria orgânica",
        soilPh: "6.0 a 6.8",
        spacing: "1,0 m a 1,2 m entre fileiras | 0,5 m a 0,6 m entre plantas (tutorado)",
        seedDepth: "0,5 a 1 cm em sementeiras/bandejas, transplantando com 4 a 5 folhas",
        plantingSeasons: {
            semiarido: "Março a julho (período mais seco e ameno para evitar doenças fúngicas)",
            sul_sudeste: "Agosto a dezembro",
            geral: "Meses de menor umidade do ar e temperaturas amenas"
        },
        irrigationTips: "Irrigação obrigatoriamente por gotejamento rente ao solo. NUNCA molhar as folhas e frutos, pois a água na folhagem desencadeia requeima e podridão imediatamente.",
        management: [
            "Tutoramento com varas de bambu ou fitilho e desbrota semanal das brotações axilares (olho-de-chumbo).",
            "Cobertura morta espessa no solo (palhada seca) evita respingos de terra na planta e conserva água.",
            "Adubação balanceada com cálcio e boro para prevenir podridão apical ('fundo preto').",
            "Adubação foliar preventiva com biofertilizante fermentado semanalmente."
        ],
        pestsAndDiseases: [
            {
                name: "Requeima / Míldio (Phytophthora infestans)",
                symptoms: "Manchas escuras de aspecto aquoso nas folhas e caules; queima rápida da planta toda.",
                control: "Calda bordalesa a 1% preventivamente a cada 7-10 dias; eliminar folhas velhas da base."
            },
            {
                name: "Broca-pequena e Traça-do-tomateiro (Tuta absoluta)",
                symptoms: "Lagartas perfuram folhas e entram nos frutos pequenos causando apodrecimento.",
                control: "Extrato de nim, bioinseticida de Bacillus thuringiensis e armadilhas com água e sabão."
            }
        ],
        climateRisks: "Altíssima suscetibilidade a chuvas contínuas no florescimento. Exige cultivo em estufa ou época seca irrigada."
    },

    melancia: {
        id: "melancia",
        name: "Melancia (Citrullus lanatus)",
        category: "Olerícolas / Frutas",
        icon: "fa-lemon",
        cycleDays: "75 a 85 dias",
        idealTemp: "25°C a 35°C (adora calor e alta insolação)",
        waterNeed: "400 a 500 mm com redução no final da maturação",
        soilType: "Arenoso a franco-arenoso, leve, profundo e muito bem drenado",
        soilPh: "5.5 a 6.8",
        spacing: "2,5 m a 3,0 m entre linhas | 1,0 m a 1,5 m entre covas (1 a 2 plantas por cova)",
        seedDepth: "2 a 3 cm",
        plantingSeasons: {
            semiarido: "Ano todo com irrigação (pólo de Juazeiro/Petrolina e Mossoró)",
            cerrado: "Fevereiro a junho",
            sul_sudeste: "Setembro a janeiro",
            geral: "Meses de calor e sol pleno"
        },
        irrigationTips: "Irrigação por gotejamento. Suspender ou reduzir em 60% a água 7 a 10 dias antes da colheita para concentrar os açúcares (Brix) e evitar que o fruto rache no transporte.",
        management: [
            "Abertura de covas adubadas com 2 a 3 kg de esterco de curral bem curtido + cinzas de madeira.",
            "Raleio de frutos: manter apenas 2 a 3 frutos bem formados por planta para obter melancias graúdas.",
            "Proteger os frutos com palha seca embaixo para não terem contato direto com a terra úmida.",
            "Preservar abelhas e polinizadores: indispensáveis para o pegamento dos frutos."
        ],
        pestsAndDiseases: [
            {
                name: "Oídio (Sphaerotheca fuliginea)",
                symptoms: "Pó branco tipo cinza cobrindo a superfície das folhas.",
                control: "Pulverização de leite cru a 5% em água (50 ml de leite em 1 litro d'água) uma vez por semana ao sol."
            },
            {
                name: "Broca-das-cucurbitáceas (Diaphania spp.)",
                symptoms: "Broca fura os frutos novos e brotações.",
                control: "Catação manual, cobertura morta, extrato de nim e proteção dos frutos."
            }
        ],
        climateRisks: "Chuvas pesadas na colheita diminuem a doçura e causam podridão do fruto."
    },

    banana: {
        id: "banana",
        name: "Bananeira (Musa spp. - Prata, Pacovan, Nanica)",
        category: "Frutas Tropicais",
        icon: "fa-tree",
        cycleDays: "10 a 12 meses para primeira colheita; colheita contínua por touceira",
        idealTemp: "24°C a 30°C",
        waterNeed: "1.200 a 1.800 mm/ano bem distribuídos (alta demanda hídrica)",
        soilType: "Profundo (> 1 metro), fértil, rico em matéria orgânica e potássio, permeável",
        soilPh: "5.8 a 6.5",
        spacing: "2,5 m x 2,5 m ou 3,0 m x 2,0 m (fileiras simples ou duplas)",
        seedDepth: "Mudas tipo 'chifre' ou 'chifrinho' em covas de 40 x 40 x 40 cm",
        plantingSeasons: {
            semiarido: "Ano todo com irrigação (gotejamento ou microaspersão)",
            geral: "Início da estação chuvosa quente"
        },
        irrigationTips: "Alta exigência hídrica contínua. Qualquer déficit prolongado retarda o lançamento dos cachos e afina os frutos.",
        management: [
            "Desbaste de perfilhos: manter a família estruturada 'Mãe, Filha e Neta' por touceira.",
            "Corte do 'coração' (mangará) cerca de 15 dias após a abertura da última penca para aumentar o peso dos frutos.",
            "Escoramento dos pés pesados com varas de bambu para evitar tombamento pelo vento.",
            "Cobertura pesada do solo com os restos de folhas e pseudocaules picados na própria roça."
        ],
        pestsAndDiseases: [
            {
                name: "Sigatoka-negra e Sigatoka-amarela",
                symptoms: "Estrias e manchas necróticas que secam as folhas e derrubam o cacho antes do tempo.",
                control: "Desfolha sanitária quinzenal cortando folhas doentes, espaçamento arejado e uso de cultivares resistentes da Embrapa (BRS Platina, BRS Princesa)."
            },
            {
                name: "Moleque-da-bananeira (Cosmopolites sordidus)",
                symptoms: "Besouro cuja larva abre galerias no rizoma enfraquecendo o pé.",
                control: "Armadilhas tipo 'queijo' feitas com pedaços do tronco da bananeira cortados ao meio no chão."
            }
        ],
        climateRisks: "Ventos fortes tombam as plantas carregadas; geadas queimam toda a área foliar."
    },

    alho_cebola: {
        id: "alho_cebola",
        name: "Alho e Cebola (Allium sativum / Allium cepa)",
        category: "Hortaliças e Condimentos",
        icon: "fa-seedling",
        cycleDays: "Alho: 130 a 160 dias | Cebola: 120 a 150 dias",
        idealTemp: "Fase vegetativa: 13°C a 24°C | Bulbiﬁcação e maturação: 20°C a 30°C com dias longos",
        waterNeed: "350 a 500 mm com suspensão total antes da colheita",
        soilType: "Franco-arenoso a leve, solto, sem pedras, rico em matéria orgânica",
        soilPh: "6.0 a 6.8",
        spacing: "Alho: 20 a 25 cm entre linhas x 10 cm entre dentes | Cebola: 25 cm x 10 a 15 cm",
        seedDepth: "Alho: dente enterrado a 3 cm com o ápice para cima | Cebola: transplante de mudas a 2 cm",
        plantingSeasons: {
            semiarido: "Abril a junho (período de noites mais frescas e pouca chuva no sertão/agreste)",
            sul_sudeste: "Março a maio",
            geral: "Outono / Início de inverno"
        },
        irrigationTips: "Irrigação frequente e superficial na fase inicial. Parar totalmente a irrigação 15 a 20 dias antes da colheita para 'curar' os bulbos e evitar podridão pós-colheita.",
        management: [
            "Uso de alho-semente sadio, preferencialmente alho-semente livre de vírus (tecnologia Embrapa).",
            "Plantio em canteiros elevados (15 a 20 cm de altura) para drenagem e facilidade de aeração.",
            "Cura pós-colheita obrigatória: 3 a 7 dias ao sol no campo e 20 a 30 dias em galpão sombreado e ventilado.",
            "Alto retorno econômico por metro quadrado para a agricultura familiar."
        ],
        pestsAndDiseases: [
            {
                name: "Tripes (Thrips tabaci)",
                symptoms: "Pequenos insetos raspadores que deixam as folhas prateadas e secam as pontas.",
                control: "Calda de fumo ou óleo de nim aplicado no final da tarde; irrigação por aspersão leve ajuda a desalojar a praga."
            },
            {
                name: "Ferrugem do alho (Puccinia porri)",
                symptoms: "Pústulas amarelo-alaranjadas nas folhas.",
                control: "Calda bordalesa a 0,5% e evitar excesso de nitrogênio."
            }
        ],
        climateRisks: "Altas temperaturas e chuvas no início do ciclo impedem a formação do bulbo ('alho chocho')."
    },

    batata_doce: {
        id: "batata_doce",
        name: "Batata-Doce (Ipomoea batatas)",
        category: "Raízes e Tubérculos",
        icon: "fa-carrot",
        cycleDays: "100 a 140 dias",
        idealTemp: "20°C a 30°C",
        waterNeed: "450 a 600 mm",
        soilType: "Franco-arenoso, solto, fértil, não compactado",
        soilPh: "5.5 a 6.5",
        spacing: "80 a 90 cm entre leirões | 30 a 40 cm entre ramas",
        seedDepth: "Ramas-guia de 30 a 40 cm enterradas a 10 cm na curvatura média",
        plantingSeasons: {
            semiarido: "Período chuvoso ou ano todo irrigada",
            geral: "Primavera e verão"
        },
        irrigationTips: "Irrigação regular nas primeiras 6 semanas. Suspender a água 10 dias antes da colheita para evitar apodrecimento na armazenagem.",
        management: [
            "Plantio obrigatório em camalhões ou leirões altos (30 a 40 cm) para que as raízes engrossem uniformemente.",
            "Uso de ramas jovens e desinfetadas retiradas de lavouras sadias.",
            "Excelente cultura de cobertura e supressão de ervas espontâneas.",
            "Folhas e pontas de ramas podem ser aproveitadas na culinária ou alimentação animal."
        ],
        pestsAndDiseases: [
            {
                name: "Broca-da-batata-doce (Euscepes postfasciatus)",
                symptoms: "Larvas abrem galerias nas raízes deixando cheiro amargo e tornando imprópria para consumo.",
                control: "Plantio em camalhões bem cobertos de terra (evita rachaduras no solo onde o besouro entra), rotação de culturas e uso de ramas sadias."
            }
        ],
        climateRisks: "Solos argilosos pesados prendem a raiz e provocam deformidades ou apodrecimento."
    }
};

// 2. DADOS DE ARMAZENAMENTO E CONSERVAÇÃO (ECOARMAZÉM)
const ruralStorageData = {
    milho_grao: {
        id: "milho_grao",
        name: "Milho em Grão ou em Espiga",
        category: "Grãos e Cereais",
        icon: "fa-wheat-awn",
        purposes: ["sementes", "consumo", "venda", "beneficiamento"],
        temp: "15°C a 22°C (local fresco e ventilado)",
        humidity: "Umidade do grão abaixo de 13% | Umidade do ar entre 50% e 65%",
        packaging: {
            sementes: "Garrafas PET limpas e secas com tampa hermética, tambores plásticos vedados com anel de borracha ou latões de ferro.",
            consumo: "Potes de vidro escuro, latas de metal ou bombonas atóxicas vedadas.",
            venda: "Sacos de ráfia novos e limpos, empilhados sobre estrados de madeira (pallets) a 30 cm da parede e 20 cm do chão.",
            beneficiamento: "Tulhas ou silos metálicos secadores com aeração forçada."
        },
        shelfLife: {
            sementes: "12 a 24 meses mantendo taxa de germinação acima de 85%",
            consumo: "6 a 12 meses sem perda nutricional",
            venda: "3 a 6 meses em galpão adequado",
            beneficiamento: "Farinha/Fubá: 3 a 4 meses em local seco"
        },
        pestsProtection: "Principal praga: Caruncho/Gorgulho (Sitophilus zeamais) e Traça-dos-cereais (Sitotroga cerealella). Proteção natural comprovada pela Embrapa: misturar cinza de fogão a lenha bem peneirada na proporção de 1% a 2% (1 kg de cinza para cada 100 kg de milho) ou pimenta-do-reino moída. Para garrafa PET: colocar algodão com álcool 70% na tampa, atear fogo e fechar imediatamente para consumir todo o oxigênio interno (método do vácuo térmico caseiro).",
        deteriorationSigns: "Pó fino amarelado no fundo do saco, grãos com furos circulares característicos, cheiro de mofo ou azedo, aquecimento no meio da saca (indica infestação ativa de fungos ou carunchos).",
        hygieneTips: "Secar os grãos ao sol até que, ao morder, o grão quebre com estalo seco em vez de amassar (teste prático da umidade < 13%). Limpar e caiar as paredes do armazém antes de estocar.",
        commonMistakes: "Guardar o milho ainda quente do sol na garrafa PET (causa condensação interna e mofo); empilhar sacos encostados diretamente no piso de cimento ou parede úmida."
    },

    feijao: {
        id: "feijao",
        name: "Feijão (Carioca, Caupi/Macassar, Preto)",
        category: "Grãos e Leguminosas",
        icon: "fa-seedling",
        purposes: ["sementes", "consumo", "venda"],
        temp: "15°C a 20°C (local sombreado e ventilado)",
        humidity: "Umidade do grão entre 11% e 12%",
        packaging: {
            sementes: "Garrafas PET reutilizadas de refrigerante/água (lavadas com sabão e 100% secas ao sol) vedadas com fita crepe ou parafina na tampa.",
            consumo: "Tambores plásticos herméticos ou sacos de papel kraft reforçado.",
            venda: "Sacaria de polipropileno trançado (ráfia) de 60 kg, etiquetada com data e variedade."
        },
        shelfLife: {
            sementes: "Até 18 meses com alta taxa de emergência",
            consumo: "12 meses (feijão velho endurece o caldo e demora mais para cozinhar)",
            venda: "4 a 6 meses para preservar a cor clara do feijão carioca"
        },
        pestsProtection: "Caruncho do feijão (Callosobruchus maculatus e Acanthoscelides obtectus). As larvas nascem dentro do grão. O método da garrafa PET com dente de alho ou cinza de madeira impede a reprodução porque esgota o oxigênio. Para consumo próprio, congelar o feijão já seco no congelador por 48 horas mata ovos e larvas do caruncho sem afetar o grão.",
        deteriorationSigns: "Grãos perfurados, escurecimento excessivo (feijão carioca amarronzado/avermelhado), endurecimento do grão (não absorve água de remolho), teias de traça.",
        hygieneTips: "Bater o feijão sobre lona limpa e não diretamente na terra batida para evitar contaminação por coliformes e pedriscos. Peneirar para retirar impurezas e restos de vagens antes de envasilhar.",
        commonMistakes: "Não testar a vedação da garrafa PET; estocar feijão com umidade acima de 13% (produz fungos perigosos como Aspergillus flavus que geram aflatoxinas cancerígenas)."
    },

    mandioca_macaxeira: {
        id: "mandioca_macaxeira",
        name: "Mandioca / Macaxeira / Aipim",
        category: "Raízes e Tubérculos",
        icon: "fa-carrot",
        purposes: ["consumo", "venda", "beneficiamento"],
        temp: "In natura: 2°C a 8°C refrigerada ou ambiente fresco por pouquíssimos dias | Farinha: ambiente seco",
        humidity: "Raiz fresca tem 65% de água; perde qualidade em 48h se exposta ao ar livre",
        packaging: {
            consumo: "Raízes descascadas, lavadas e congeladas em sacos plásticos herméticos; ou imersão em água limpa na geladeira trocada diariamente (até 5 dias).",
            venda: "Caixas plásticas vazadas higienizadas ou sacos telados; parafeira livre, técnica de parafinagem (imersão rápida em parafina alimentar) estende a vida para 15 a 20 dias.",
            beneficiamento: "Farinha torrada: sacos de polietileno selados ou barricas de madeira forradas com plástico."
        },
        shelfLife: {
            consumo: "Congelada crua: até 6 meses mantendo sabor e textura macia",
            venda: "In natura sem tratamento: 2 a 3 dias | Parafinada: até 20 dias",
            beneficiamento: "Farinha torrada bem seca: 6 a 12 meses"
        },
        pestsProtection: "Deterioração Fisiológica Pós-Colheita (DFP): oxidação rápida que forma estrias escuras nos vasos da raiz em até 48h após o arranque. Manter as raízes com toco de caule de 3 a 5 cm atrasa a deterioração em comparação com raízes quebradas rente.",
        deteriorationSigns: "Estrias azuis/escuras no miolo da polpa, cheiro fermentado ou alcoólico, raiz mole ou viscosa ao toque.",
        hygieneTips: "Ao colher, evitar ferir as raízes. Para farinheiras, processar as raízes no máximo até 48 horas após a colheita para garantir farinha de primeira qualidade e baixo teor de acidez.",
        commonMistakes: "Deixar raízes de macaxeira expostas ao sol direto na roça após o arranque; guardar farinha em sacos de algodão em chão de terra batida (absorve umidade e rança)."
    },

    alho_cebola_conserva: {
        id: "alho_cebola_conserva",
        name: "Alho e Cebola (Cura e Armazenamento)",
        category: "Hortaliças e Bulbos",
        icon: "fa-seedling",
        purposes: ["sementes", "consumo", "venda"],
        temp: "15°C a 20°C (ambiente seco, arejado e sem luz solar direta)",
        humidity: "Umidade relativa baixa (50% a 65%) - ambiente úmido provoca mofo e brotação imediata",
        packaging: {
            sementes: "Bulbilhos selecionados em caixas de madeira furadas em galpão ventilado.",
            consumo: "Tranças tradicionais penduradas no teto ou sacos de rede de nylon suspensos.",
            venda: "Sacos de tela (anéis) de 20 kg empilhados sobre estrados de madeira com circulação de ar."
        },
        shelfLife: {
            sementes: "4 a 6 meses",
            consumo: "Tranças de alho curado: 6 a 8 meses | Cebola curada: 3 a 5 meses",
            venda: "2 a 4 meses em tulha bem ventilada"
        },
        pestsProtection: "Ácaros e mofo-preto (Aspergillus niger). A 'cura' completa é o segredo do armazenamento: as folhas e a casca externa devem secar totalmente até ficarem quebradiças como papel.",
        deteriorationSigns: "Bulbos moles ou esponjosos, emissão de broto verde (indica que o alho/cebola está usando as reservas), pó preto de fungos sob a casca, cheiro pungente de podridão.",
        hygieneTips: "Nunca lavar com água antes de guardar; a terra superficial deve ser retirada com escovação leve após a casca estar bem seca. Descartar cabeças machucadas antes de fazer as tranças.",
        commonMistakes: "Guardar em sacos plásticos fechados (a umidade transpira e apodrece o produto em poucos dias); guardar na geladeira alho/cebola inteiros (a umidade estimula a brotação)."
    },

    tomate_frutas: {
        id: "tomate_frutas",
        name: "Tomate, Melancia e Frutas Tropicais (Banana e Manga)",
        category: "Frutas e Hortaliças Frescas",
        icon: "fa-apple-whole",
        purposes: ["consumo", "venda", "beneficiamento"],
        temp: "Tomate maduro: 10°C a 13°C | Banana: 13°C a 15°C (nunca abaixo de 12°C - sofre injúria pelo frio) | Melancia: 12°C a 15°C",
        humidity: "85% a 90% (para evitar murchamento e perda de peso)",
        packaging: {
            consumo: "Fruteiras ventiladas; polpa despolpada e congelada em sacos de grau alimentício a -18°C.",
            venda: "Caixas plásticas tipo monobloco higienizadas com papel ondulado no fundo para amortecer impacto.",
            beneficiamento: "Polpas pasteurizadas e congeladas, doces em calda esterilizados em potes de vidro herméticos."
        },
        shelfLife: {
            consumo: "In natura: 5 a 10 dias | Polpa congelada: 6 a 12 meses | Doce em compota: até 1 ano",
            venda: "3 a 7 dias conforme grau de maturação na colheita",
            beneficiamento: "Extrato artesanal de tomate: 6 meses pasteurizado"
        },
        pestsProtection: "Mosca-das-frutas (Ceratitis capitata e Anastrepha spp.) e fungos pós-colheita (Colletotrichum / antracnose). Colheita cuidadosa sem arranhões e higienização rápida com solução de água clorada (1 colher de sopa de água sanitária para 10 litros d'água por 10 minutos).",
        deteriorationSigns: "Manchas moles e escuras deprimidas na casca, vazamento de líquido, mofo branco ou verde, odor de vinagre.",
        hygieneTips: "Colher nas primeiras horas da manhã antes que o sol esquente os frutos no campo; usar caixas plásticas laváveis no lugar de caixas de madeira ásperas que machucam a casca.",
        commonMistakes: "Colocar banana na geladeira comum abaixo de 10°C (a casca escurece e fica preta por choque térmico sem amadurecer a polpa); misturar frutos doentes na mesma caixa."
    },

    leite_derivados: {
        id: "leite_derivados",
        name: "Leite Cru e Queijo Coalho / Artesanal",
        category: "Produtos de Origem Animal",
        icon: "fa-glass-water",
        purposes: ["consumo", "venda", "beneficiamento"],
        temp: "Leite cru: refrigerar imediatamente a menos de 4°C em até 2 horas após a ordenha | Queijo em cura: 10°C a 16°C",
        humidity: "Queijaria: 80% a 85% para maturação controlada",
        packaging: {
            consumo: "Ferver o leite cru antes do consumo humano; armazenar em garrafas de vidro ou jarras higienizadas sob refrigeração.",
            venda: "Tanques de resfriamento de expansão comunitários ou latões de inox/alumínio com tampa higienizada.",
            beneficiamento: "Queijo coalho embalado a vácuo ou protegido em caixas arejadas com tela mosqueteira durante a cura."
        },
        shelfLife: {
            consumo: "Leite fervido: 2 a 3 dias na geladeira | Queijo coalho fresco: 10 a 15 dias refrigerado",
            venda: "Leite resfriado a 4°C no tanque: até 48 horas para coleta do laticínio",
            beneficiamento: "Queijo coalho curado/maturado: 30 a 90 dias"
        },
        pestsProtection: "Contaminação bacteriana (bactérias láticas, coliformes e patógenos como Staphylococcus aureus e Salmonella). A higiene na ordenha é a única proteção real: teto limpo, seco e pré-dipping.",
        deteriorationSigns: "Leite talhado espontaneamente, sabor azedo, cheiro de choco, queijo com estufamento precoce e furos irregulares (indica contaminação por coliformes da água ou mão suja).",
        hygieneTips: "Linha de ordenha: ordenhar vacas sadias primeiro e vacas com mastite por último; coar o leite em filtro descartável; lavar todos os baldes e ordenhadeiras com detergente alcalino e sanitizante clorado.",
        commonMistakes: "Demorar mais de 2 horas para resfriar o leite após a ordenha; usar água de poço não tratada para lavar utensílios de leite; queijo coalho feito com leite de vaca tratada recentemente com antibiótico (o antibiótico impede a ação do coalho e contamina quem come)."
    }
};

// 3. DADOS DE VÍDEOS EDUCATIVOS RURAIS (ECOVIDA RURAL)
// Vídeos reais, educativos e com incorporação oficial do YouTube
const ruralVideosData = [
    {
        id: "vid-1",
        youtubeId: "BvO35m6066Y",
        title: "Técnicas de Plantio de Milho e Feijão no Semiárido",
        category: "plantio",
        categoryLabel: "Técnicas de plantio",
        institution: "Embrapa",
        duration: "14:20",
        description: "Recomendações técnicas da Embrapa para seleção de sementes, espaçamento e preparo do solo para milho e feijão com alta produtividade na agricultura familiar."
    },
    {
        id: "vid-2",
        youtubeId: "651qV88x0k4",
        title: "Como Fazer Compostagem Rural e Esterco Curtido",
        category: "compostagem",
        categoryLabel: "Compostagem e adubação",
        institution: "SENAR",
        duration: "18:45",
        description: "Aprenda o passo a passo da montagem de leiras de compostagem usando restos de culturas e esterco de gado ou caprinos para obter adubo de alta qualidade em 60 dias."
    },
    {
        id: "vid-3",
        youtubeId: "c_l5vE7z-Y4",
        title: "Armazenamento Seguro de Grãos em Garrafa PET sem Caruncho",
        category: "armazem",
        categoryLabel: "Armazenamento de alimentos",
        institution: "Embrapa Milho e Sorgo",
        duration: "09:30",
        description: "Método de baixo custo validado pela Embrapa para guardar milho e feijão por anos em garrafas PET com cinza ou vácuo caseiro, sem gastar com inseticidas tóxicos."
    },
    {
        id: "vid-4",
        youtubeId: "81qGvjLwZkY",
        title: "Irrigação por Gotejamento Econômica e Caseira",
        category: "irrigacao",
        categoryLabel: "Irrigação e economia de água",
        institution: "EMATER",
        duration: "12:15",
        description: "Como montar um sistema de irrigação por gotejamento de baixo custo na horta e roça familiar aproveitando água de cisterna ou poço com economia de até 60%."
    },
    {
        id: "vid-5",
        youtubeId: "tV91wP0m1xk",
        title: "Palma Forrageira Adensada: Ouro Verde do Sertão",
        category: "semiarido",
        categoryLabel: "Tecnologias para o semiárido",
        institution: "Embrapa Semiárido",
        duration: "16:10",
        description: "Manejo da palma forrageira resistente à cochonilha-do-carmim, preparo do solo, adubação com esterco e fornecimento estratégico para o gado na época da seca."
    },
    {
        id: "vid-6",
        youtubeId: "XQx918W3pA8",
        title: "Criação de Galinhas Caipiras: Instalações e Alimentação Alternativa",
        category: "animais",
        categoryLabel: "Criação de animais",
        institution: "SENAR",
        duration: "21:05",
        description: "Orientações práticas para galinheiros móveis, piquetes de pastoreio, vacinação e ração caseira feita com milho, folhas de mandioca e farelos locais."
    },
    {
        id: "vid-7",
        youtubeId: "Jk0-L9s8vP0",
        title: "Receita e Aplicação da Calda Bordalesa Orgânica",
        category: "pragas",
        categoryLabel: "Controle sustentável de pragas",
        institution: "Embrapa Hortaliças",
        duration: "11:40",
        description: "Como preparar corretamente a calda bordalesa com sulfato de cobre e cal virgem, fazer o teste da faca para regular o pH e aplicar contra fungos em fruteiras e hortaliças."
    },
    {
        id: "vid-8",
        youtubeId: "Y6vXm12_zL8",
        title: "Conservação do Solo com Curvas de Nível e Barraginhas",
        category: "solo",
        categoryLabel: "Manejo do solo",
        institution: "Embrapa Solos",
        duration: "15:50",
        description: "Técnicas simples com mangueira de nível para implantar curvas de nível e pequenas bacias de retenção de enxurrada que recarregam o lençol freático e evitam erosão."
    },
    {
        id: "vid-9",
        youtubeId: "vL71wM2xKp4",
        title: "Tríplice Lavagem e Devolução de Embalagens de Defensivos",
        category: "sustentabilidade",
        categoryLabel: "Sustentabilidade no campo",
        institution: "inPEV / Sistema Campo Limpo",
        duration: "08:20",
        description: "Passo a passo legal e seguro da tríplice lavagem e lavagem sob pressão de embalagens agrícolas, perfuração do fundo e entrega nos postos de recolhimento."
    },
    {
        id: "vid-10",
        youtubeId: "R5b3k7m9wL1",
        title: "Silagem de Capim e Milho para Alimentação Animal na Seca",
        category: "animais",
        categoryLabel: "Criação de animais",
        institution: "Embrapa Gado de Leite",
        duration: "17:35",
        description: "Como fazer silagem de trincheira ou em sacos de ração usados: ponto de corte, compactação correta e vedação para garantir alimento nutritivo no período da estiagem."
    },
    {
        id: "vid-11",
        youtubeId: "M3xK8v1P9z0",
        title: "Construção de Ferramentas Manuais de Baixo Custo para o Campo",
        category: "ferramentas",
        categoryLabel: "Construção de ferramentas e utensílios",
        institution: "Instituto Federal / Extensão",
        duration: "13:40",
        description: "Como reaproveitar molas de carro velhas, canos galvanizados e madeira de poda para construir capinadeiras manuais, plantadeiras de matracas e enxadas reforçadas."
    },
    {
        id: "vid-12",
        youtubeId: "P7k0v9L2wX1",
        title: "Cisternas de Placas e Captação de Água de Chuva",
        category: "semiarido",
        categoryLabel: "Tecnologias para o semiárido",
        institution: "Articulação Semiárido Brasileiro (ASA)",
        duration: "14:15",
        description: "Como funciona a tecnologia social da cisterna de placas de 16 mil litros: cuidados com o telhado, descarte das primeiras chuvas e tratamento com cloro."
    }
];

// 4. DADOS DE COTAÇÃO AGRÍCOLA (ECOCOTAÇÃO)
// Referências baseadas em levantamentos da CONAB e CEASAs estaduais
const ruralQuotationsData = [
    {
        id: "cot-1",
        product: "Milho em Grão",
        category: "Grãos",
        unit: "Saca 60 kg",
        price: 68.50,
        variation: 2.1, // %
        lastUpdate: "Hoje, às 08:30",
        state: "BA",
        stateName: "Bahia (Polo Luís Eduardo / Feira de Santana)",
        source: "CONAB / Levantamento Regional de Mercado",
        trend: "up",
        prevPrice: 67.10
    },
    {
        id: "cot-2",
        product: "Feijão Carioca (Tipo 1)",
        category: "Grãos",
        unit: "Saca 60 kg",
        price: 245.00,
        variation: -1.5,
        lastUpdate: "Hoje, às 08:30",
        state: "BA",
        stateName: "Bahia (Polo Irecê)",
        source: "CONAB / CEASA-BA",
        trend: "down",
        prevPrice: 248.70
    },
    {
        id: "cot-3",
        product: "Feijão Caupi / Macassar",
        category: "Grãos",
        unit: "Saca 60 kg",
        price: 180.00,
        variation: 0.0,
        lastUpdate: "Ontem, às 17:00",
        state: "PE",
        stateName: "Pernambuco (Agreste / Sertão)",
        source: "CEASA-PE (Caruaru / Recife)",
        trend: "stable",
        prevPrice: 180.00
    },
    {
        id: "cot-4",
        product: "Farinha de Mandioca Artesanal",
        category: "Raízes e Farinhas",
        unit: "Saca 50 kg",
        price: 195.00,
        variation: 3.2,
        lastUpdate: "Hoje, às 07:45",
        state: "BA",
        stateName: "Bahia (Recôncavo / Sudoeste)",
        source: "Levantamento CONAB / Feiras Regionais",
        trend: "up",
        prevPrice: 189.00
    },
    {
        id: "cot-5",
        product: "Mandioca / Macaxeira de Mesa",
        category: "Raízes e Farinhas",
        unit: "Caixa 20 kg",
        price: 48.00,
        variation: -2.0,
        lastUpdate: "Hoje, às 06:15",
        state: "CE",
        stateName: "Ceará (Maracanaú / Tianguá)",
        source: "CEASA-CE",
        trend: "down",
        prevPrice: 49.00
    },
    {
        id: "cot-6",
        product: "Tomate Longa Vida",
        category: "Hortaliças",
        unit: "Caixa 20 kg",
        price: 75.00,
        variation: 7.1,
        lastUpdate: "Hoje, às 06:00",
        state: "PE",
        stateName: "Pernambuco (Ceasa Recife)",
        source: "CEASA-PE",
        trend: "up",
        prevPrice: 70.00
    },
    {
        id: "cot-7",
        product: "Cebola Amarela Pêra",
        category: "Hortaliças",
        unit: "Saca 20 kg",
        price: 52.00,
        variation: -3.7,
        lastUpdate: "Hoje, às 08:00",
        state: "BA",
        stateName: "Bahia (Juazeiro / Vale do São Francisco)",
        source: "Mercado do Produtor de Juazeiro",
        trend: "down",
        prevPrice: 54.00
    },
    {
        id: "cot-8",
        product: "Alho Roxo Nacional",
        category: "Hortaliças",
        unit: "Caixa 10 kg",
        price: 185.00,
        variation: 1.1,
        lastUpdate: "Ontem, às 16:30",
        state: "MG",
        stateName: "Minas Gerais (CeasaMinas)",
        source: "CEASAMINAS",
        trend: "up",
        prevPrice: 183.00
    },
    {
        id: "cot-9",
        product: "Banana Prata (1ª Qualidade)",
        category: "Frutas",
        unit: "Cento / Caixa 20 kg",
        price: 55.00,
        variation: 0.0,
        lastUpdate: "Hoje, às 07:00",
        state: "BA",
        stateName: "Bahia (Bom Jesus da Lapa)",
        source: "CONAB / Associações de Produtores",
        trend: "stable",
        prevPrice: 55.00
    },
    {
        id: "cot-10",
        product: "Manga Tommy Atkins",
        category: "Frutas",
        unit: "Caixa 20 kg",
        price: 45.00,
        variation: 4.6,
        lastUpdate: "Hoje, às 08:15",
        state: "PE",
        stateName: "Pernambuco (Petrolina / Vale)",
        source: "Valexport / Mercado de Produtores",
        trend: "up",
        prevPrice: 43.00
    },
    {
        id: "cot-11",
        product: "Melancia Comum",
        category: "Frutas",
        unit: "Quilograma (kg)",
        price: 1.40,
        variation: -6.6,
        lastUpdate: "Hoje, às 06:45",
        state: "RN",
        stateName: "Rio Grande do Norte (Mossoró / Açu)",
        source: "CEASA-RN",
        trend: "down",
        prevPrice: 1.50
    },
    {
        id: "cot-12",
        product: "Leite Cru Resfriado (Posto na Fazenda)",
        category: "Pecuária e Laticínios",
        unit: "Litro",
        price: 2.38,
        variation: 1.7,
        lastUpdate: "Semana Atual",
        state: "AL",
        stateName: "Alagoas / Bacia Leiteira do Agreste",
        source: "CEPEA / Levantamento das Cooperativas",
        trend: "up",
        prevPrice: 2.34
    },
    {
        id: "cot-13",
        product: "Queijo de Coalho Artesanal",
        category: "Pecuária e Laticínios",
        unit: "Quilograma (kg)",
        price: 36.00,
        variation: 0.0,
        lastUpdate: "Ontem, às 18:00",
        state: "PB",
        stateName: "Paraíba (Sertão e Curimataú)",
        source: "Levantamento EMATER-PB / Feiras Locais",
        trend: "stable",
        prevPrice: 36.00
    },
    {
        id: "cot-14",
        product: "Arroz em Casca (Tipo 1)",
        category: "Grãos",
        unit: "Saca 50 kg",
        price: 112.00,
        variation: -0.8,
        lastUpdate: "Hoje, às 09:00",
        state: "MA",
        stateName: "Maranhão / Região Central",
        source: "CONAB",
        trend: "down",
        prevPrice: 113.00
    }
];

// 5. CIDADES AGRÍCOLAS E COORDENADAS PARA O ECOCLIMA
const ruralMunicipalitiesData = [
    { name: "Juazeiro", state: "BA", lat: -9.41, lon: -40.50, region: "Semiárido / Vale do São Francisco", mainActivity: "Fruticultura irrigada (manga, uva, melão)" },
    { name: "Petrolina", state: "PE", lat: -9.39, lon: -40.50, region: "Semiárido / Vale do São Francisco", mainActivity: "Fruticultura tropical e vinhos" },
    { name: "Irecê", state: "BA", lat: -11.30, lon: -41.85, region: "Semiárido Baiano", mainActivity: "Feijão, milho, mamona e hortaliças" },
    { name: "Feira de Santana", state: "BA", lat: -12.26, lon: -38.96, region: "Agreste Baiano", mainActivity: "Pecuária, milho e entreposto regional" },
    { name: "Barreiras", state: "BA", lat: -12.15, lon: -44.99, region: "Oeste Baiano / Cerrado", mainActivity: "Soja, milho, algodão e pecuária de corte" },
    { name: "Quixadá", state: "CE", lat: -4.97, lon: -39.01, region: "Sertão Central Cearense", mainActivity: "Caprinocultura, ovinos, milho e feijão" },
    { name: "Mossoró", state: "RN", lat: -5.18, lon: -37.34, region: "Oeste Potiguar", mainActivity: "Melão, melancia, caju e caprinos" },
    { name: "Campina Grande", state: "PB", lat: -7.22, lon: -35.88, region: "Agreste Paraibano", mainActivity: "Algodão colorido, palma forrageira e horticultura" },
    { name: "Patos", state: "PB", lat: -7.02, lon: -37.28, region: "Sertão da Paraíba", mainActivity: "Caprinocultura leiteira, feijão caupi e palma" },
    { name: "Garanhuns", state: "PE", lat: -8.89, lon: -36.49, region: "Agreste Pernambucano", mainActivity: "Bacia leiteira, café e hortaliças" },
    { name: "Picos", state: "PI", lat: -7.07, lon: -41.46, region: "Semiárido Piauiense", mainActivity: "Apicultura (mel orgânico), caju e mandioca" },
    { name: "Balsas", state: "MA", lat: -7.53, lon: -46.03, region: "Sul do Maranhão", mainActivity: "Grãos (soja, milho e arroz)" },
    { name: "Arapiraca", state: "AL", lat: -9.75, lon: -36.66, region: "Agreste Alagoano", mainActivity: "Mandioca (farinha), fumo, milho e hortaliças" },
    { name: "Caicó", state: "RN", lat: -6.45, lon: -37.09, region: "Seridó Potiguar", mainActivity: "Queijo de coalho artesanal, carne de sol e palma" },
    { name: "Montes Claros", state: "MG", lat: -16.73, lon: -43.86, region: "Norte de Minas Gerais", mainActivity: "Pecuária mista, feijão, cana e eucalipto" },
    { name: "Ribeirão Preto", state: "SP", lat: -21.17, lon: -47.81, region: "Interior de SP", mainActivity: "Cana-de-açúcar, citros, soja e milho" },
    { name: "Chapecó", state: "SC", lat: -27.10, lon: -52.61, region: "Oeste Catarinense", mainActivity: "Agricultura familiar, suinocultura, aves e grãos" }
];

// 6. BASE DE RESPOSTAS E INTELIGÊNCIA ESPECIALIZADA DA ECOIA RURAL
const ruralKnowledgeBase = [
    {
        keywords: ["epoca", "plantar", "milho", "quando plantar", "mes"],
        topic: "Época de plantio do milho",
        reply: `🌾 **Melhor época para plantar Milho segundo a Embrapa e ZARC:**

1. **No Semiárido / Nordeste:** A melhor janela de plantio em regime de **sequeiro** coincide com a chegada das chuvas consolidadas (geralmente entre **dezembro e março**, variando de acordo com o estado). Em áreas irrigadas, pode ser plantado durante o ano todo.
2. **No Cerrado e Centro-Sul:**
   - **Safra das Águas:** Outubro a dezembro.
   - **Safrinha:** Janeiro a março (após a colheita precoce).
3. **Dica Técnica de Ouro:** O milho não tolera falta d'água no pendoamento e enchimento de espiga. Se plantar no sequeiro, acompanhe a previsão climática no nosso módulo **EcoClima** e semeie após a terra ter acumulado pelo menos 50 a 60 mm de chuva inicial.
4. **Fonte:** Embrapa Milho e Sorgo / ZARC MAPA.`
    },
    {
        keywords: ["lagarta", "cartucho", "spodoptera", "praga do milho", "combater lagarta"],
        topic: "Controle da Lagarta-do-Cartucho",
        reply: `🐛 **Como combater a Lagarta-do-Cartucho de forma natural e agroecológica:**

1. **Cinza de Fogão com Areia:** Um método tradicional da roça validado por extensionistas é polvilhar uma pitada de mistura de cinza de fogão peneirada com areia fina (proporção 1:1) diretamente no miolo (cartucho) da planta de manhã cedo. A cinza irrita e desseca a lagarta.
2. **Bioinseticida Bacillus thuringiensis (Bt):** É uma bactéria natural que paralisa o intestino da lagarta e não é tóxica para pessoas, pássaros nem abelhas. Aplicar no final da tarde, quando as lagartas saem para se alimentar.
3. **Óleo de Nim (Neem) a 1%:** 10 ml de óleo puro de nim por litro de água com 2 gotas de detergente neutro para emulsionar. Pulverize no cartucho a cada 5 a 7 dias.
4. **Consórcio com Feijão:** O milho consorciado com feijão sofre até 40% menos ataque de lagartas devido ao aumento de predadores naturais (como tesourinhas e vespas).
5. **Fonte:** Embrapa Milho e Sorgo - Manejo Integrado de Pragas.`
    },
    {
        keywords: ["armazenar", "feijao", "caruncho", "garrafa pet", "guardar feijao", "gorgulho"],
        topic: "Armazenamento de Feijão sem Caruncho",
        reply: `🫙 **Passo a passo para guardar Feijão em Garrafa PET sem Caruncho por até 2 anos:**

1. **Secagem Correta:** O feijão deve estar com umidade abaixo de 12%. Faça o teste: morda o grão; se ele quebrar em pedaços com estalo, está seco. Se amassar, deixe mais tempo ao sol.
2. **Higienização das Garrafas:** Use garrafas PET de refrigerante/água bem lavadas com sabão e **completamente secas**. Qualquer umidade interna causa mofo.
3. **Enchimento Compactado:** Coloque o feijão com auxílio de um funil, batendo o fundo da garrafa em um pedaço de madeira no chão para assentar bem os grãos até não sobrar ar entre eles.
4. **Proteção com Cinza ou Dente de Alho:** No meio e no topo da garrafa, adicione 1 colher de cinza de fogão a lenha peneirada ou 2 dentes de alho com casca inteiros.
5. **Vácuo Térmico:** No topo da garrafa cheia, coloque um pedaço de algodão com 3 gotas de álcool sobre uma tampinha de metal, acenda o fogo e atarraxe a tampa da garrafa imediatamente. A chama consome todo o oxigênio restante e apaga em 2 segundos.
6. **Vedação:** Passe fita crepe ou fita isolante ao redor da tampa e guarde em local fresco e escuro.
7. **Fonte:** Circular Técnica da Embrapa Arroz e Feijão.`
    },
    {
        keywords: ["calda bordalesa", "fungo", "requeima", "mildio", "receita calda"],
        topic: "Preparo da Calda Bordalesa Caseira",
        reply: `🌿 **Receita e Preparo Seguro da Calda Bordalesa a 1% (Proporção 1:1:100):**

A Calda Bordalesa é o defensivo natural mais utilizado no mundo contra fungos e bactérias em tomate, fruteiras, alho e cebola.

**Ingredientes para 10 Litros:**
- 100 gramas de Sulfato de Cobre.
- 100 gramas de Cal Virgem (ou 130g de cal hidratada de boa qualidade).
- 10 litros de água (sem cloro).
- 2 baldes de plástico (nunca use balde de metal ou ferro!).

**Modo de Fazer:**
1. Na véspera, dissolva o sulfato de cobre em 2 litros de água morna em um balde plástico (fica azul).
2. No outro balde, queime a cal virgem adicionando 2 litros de água aos poucos até virar um leite de cal. Complete para 8 litros.
3. **Regra de Ouro:** Despeje sempre a solução azul de sulfato sobre o leite de cal, mexendo continuamente com um pedaço de pau.
4. **Teste da Faca (pH):** Mergulhe a lâmina de ferro de uma faca limpa na calda por 3 minutos. Se a faca sair avermelhada/enferrujada, a calda está ácida e queima as folhas; adicione mais leite de cal até que a faca saia limpa.
5. Coe em pano fino e aplique no mesmo dia, no final da tarde.
6. **Fonte:** Embrapa Hortaliças.`
    },
    {
        keywords: ["seca", "semiarido", "agua", "palma", "convivencia", "estiagem"],
        topic: "Dicas de Convivência com a Seca e Uso Eficiente da Água",
        reply: `🌵 **Estratégias Comprovadas de Convivência com a Seca no Semiárido:**

1. **Reserva Estratégica de Forragem:**
   - Plante **Palma Forrageira resistente** (Orelha de Elefante Mexicana ou Palma Doce). 1 hectare bem adubado produz até 150 toneladas de massa verde com 90% de água biológica para os animais.
   - Faça feno de capim e silagem nos meses de fartura de chuva para alimentar os animais nos 7 meses secos.
2. **Cobertura Morta (Mulching):** Nunca deixe o solo exposto ao sol direto. Cobrir a horta ou a base das fruteiras com 5 a 10 cm de palha seca reduz a evaporação da água do solo em até 70%.
3. **Cisternas e Captação:**
   - Cisterna de primeira água (16 mil litros) exclusiva para consumo humano e culinária.
   - Cisterna de calçadão ou enxurrada (52 mil litros) para horta e dessedentação de pequenos animais.
4. **Reuso de Água Cinza:** A água de lavagem de roupas e banho pode passar por um filtro biológico simples de brita, areia e minhocas para ser reutilizada com segurança em fruteiras e palma.
5. **Fonte:** Articulação Semiárido Brasileiro (ASA) e Embrapa Semiárido.`
    },
    {
        keywords: ["compostagem", "biofertilizante", "adubo", "esterco", "adubacao organica"],
        topic: "Compostagem Rural e Biofertilizante Líquido",
        reply: `🌱 **Como Fazer Adubo Orgânico e Biofertilizante na Propriedade Rural:**

**1. Pilha de Compostagem Rápida (60 a 90 dias):**
- Alterne camadas: 15 cm de matéria seca (palhada de milho, capim seco, folhas) + 5 cm de matéria úmida e nitrogenada (esterco de curral, caprino ou restos de horta).
- Umedeça cada camada (a pilha deve ficar úmida como uma esponja espremida, nunca encharcada).
- Revire a cada 15 dias para oxigenar e acelerar a fermentação. Quando o material tiver cheiro de terra de mata e cor escura homogênea, está pronto.

**2. Biofertilizante Líquido Anaeróbico (Agrobio Caipira):**
- Em uma bombona de 200 litros, coloque 50 kg de esterco fresco de gado + 100 litros de água + 2 litros de leite ou soro + 1 kg de rapadura moída ou melaço.
- Vede a bombona e coloque uma mangueirinha fina saindo da tampa com a outra ponta mergulhada em uma garrafa PET cheia d'água (válvula de alívio para sair o gás metano sem entrar oxigênio).
- Deixe fermentar por 30 a 40 dias. Dilua 5% a 10% em água (1 litro de biofertilizante para cada 10 a 20 litros d'água) e pulverize nas folhas como adubo foliar e repelente de insetos.
- **Fonte:** SENAR e Embrapa Agrobiologia.`
    },
    {
        keywords: ["embalagem", "veneno", "defensivo", "agrotoxico", "inpev", "triplice lavagem", "descarte"],
        topic: "Destinação Correta de Embalagens de Defensivos",
        reply: `♻️ **Regras Oficiais para Descarte de Embalagens de Defensivos (Lei 9.974/2000 - inPEV):**

1. **Tríplice Lavagem Obrigatória:**
   - Ao esvaziar o defensivo no pulverizador, mantenha a embalagem escorrendo por 30 segundos.
   - Encha 1/4 da embalagem com água limpa, tampe e chacoalhe fortemente por 30 segundos em todos os sentidos.
   - Despeje essa água de enxágue diretamente no tanque do pulverizador (essa calda tem princípio ativo e não se desperdiça!).
   - Repita esse procedimento mais **duas vezes** (totalizando 3 lavagens).
2. **Inutilização:** Perfure o fundo da embalagem plástica para torná-la inutilizável.
3. **NUNCA REUTILIZE:** É crime ambiental grave e risco de morte usar galões de defensivos para guardar água, alimentos ou combustível.
4. **Devolução:** Devolva a embalagem limpa com tampa separada no posto ou central de recolhimento do inPEV no prazo de até 1 ano após a compra e guarde o comprovante de devolução.
5. **Fonte:** inPEV - Sistema Campo Limpo.`
    }
];
